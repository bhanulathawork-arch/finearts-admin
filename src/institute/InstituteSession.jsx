
import { useEffect, useMemo, useState } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
  FaClock,
  FaGraduationCap,
  FaSyncAlt,
} from "react-icons/fa";
import API from "../services/api";

/*
|--------------------------------------------------------------------------
| Institute Sessions
|--------------------------------------------------------------------------
| Removed:
| - Session Title
| - Notes
| - Templates
|
| Session now contains only:
| - Class
| - Start Time
|
| Important:
| Backend expects start_time as UTC ISO:
| 2026-09-28T16:34:00.000Z
|
| UI works in IST.
|--------------------------------------------------------------------------
*/

const Sessions = () => {
  const [sessions, setSessions] = useState([]);
  const [classes, setClasses] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [editingSession, setEditingSession] = useState(null);

  const [form, setForm] = useState({
    class_id: "",
    start_time: "",
  });

  const [search, setSearch] = useState("");

  /*
  |--------------------------------------------------------------------------
  | Load Sessions
  |--------------------------------------------------------------------------
  */

  const fetchSessions = async () => {
    try {
      setLoading(true);

      const response = await API.get(
        "/sessions/institute/my-sessions"
      );

      console.log("SESSIONS RESPONSE:", response.data);

      const data = response?.data;

      if (Array.isArray(data)) {
        setSessions(data);
      } else if (Array.isArray(data?.sessions)) {
        setSessions(data.sessions);
      } else if (Array.isArray(data?.data)) {
        setSessions(data.data);
      } else {
        setSessions([]);
      }
    } catch (error) {
      console.error(
        "Fetch Institute Sessions Error:",
        error
      );

      setSessions([]);
    } finally {
      setLoading(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Load Institute Classes
  |--------------------------------------------------------------------------
  */

  const fetchClasses = async () => {
    try {
      const response = await API.get(
        "/classes/institute/my-classes"
      );

      console.log("INSTITUTE CLASSES RESPONSE:", response.data);

      const data = response?.data;

      if (Array.isArray(data)) {
        setClasses(data);
      } else if (Array.isArray(data?.classes)) {
        setClasses(data.classes);
      } else if (Array.isArray(data?.data)) {
        setClasses(data.data);
      } else {
        setClasses([]);
      }
    } catch (error) {
      console.error(
        "Fetch Institute Classes Error:",
        error
      );

      /*
       * Some backend versions use:
       * /classes/institute/:instituteId
       *
       * If the first endpoint doesn't exist, don't break
       * the sessions page.
       */
      setClasses([]);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Initial Load
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    fetchSessions();
    fetchClasses();
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Refresh
  |--------------------------------------------------------------------------
  */

  const handleRefresh = async () => {
    await Promise.all([
      fetchSessions(),
      fetchClasses(),
    ]);
  };

  /*
  |--------------------------------------------------------------------------
  | Convert Backend UTC Date/Time -> IST HH:mm
  |--------------------------------------------------------------------------
  */

  const getISTTime = (value) => {
    if (!value) return "";

    try {
      const date = new Date(value);

      if (Number.isNaN(date.getTime())) {
        /*
         * Backend may already return HH:mm
         */
        if (/^\d{2}:\d{2}$/.test(value)) {
          return value;
        }

        return "";
      }

      return new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(date);
    } catch {
      return "";
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Convert HH:mm IST -> UTC ISO
  |--------------------------------------------------------------------------
  |
  | Backend requires:
  |
  | 2026-09-28T16:34:00.000Z
  |
  | NOT:
  |
  | 22:04
  |--------------------------------------------------------------------------
  */

  const convertISTTimeToUTC = (
    time,
    existingStartTime = null
  ) => {
    if (!time) return null;

    const match = time.match(/^(\d{1,2}):(\d{2})$/);

    if (!match) return null;

    const hours = Number(match[1]);
    const minutes = Number(match[2]);

    if (
      Number.isNaN(hours) ||
      Number.isNaN(minutes) ||
      hours < 0 ||
      hours > 23 ||
      minutes < 0 ||
      minutes > 59
    ) {
      return null;
    }

    /*
     * Preserve the existing date when editing.
     *
     * If editing:
     * use the date already stored in start_time.
     *
     * If creating:
     * use today's date in IST.
     */

    let year;
    let month;
    let day;

    if (existingStartTime) {
      const existingDate = new Date(existingStartTime);

      if (!Number.isNaN(existingDate.getTime())) {
        const parts = new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Kolkata",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }).formatToParts(existingDate);

        year = Number(
          parts.find((p) => p.type === "year")?.value
        );

        month = Number(
          parts.find((p) => p.type === "month")?.value
        );

        day = Number(
          parts.find((p) => p.type === "day")?.value
        );
      }
    }

    /*
     * If no existing date was available,
     * use today's IST date.
     */

    if (!year || !month || !day) {
      const now = new Date();

      const parts = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).formatToParts(now);

      year = Number(
        parts.find((p) => p.type === "year")?.value
      );

      month = Number(
        parts.find((p) => p.type === "month")?.value
      );

      day = Number(
        parts.find((p) => p.type === "day")?.value
      );
    }

    /*
     * IST = UTC + 5:30
     *
     * Create a UTC date by subtracting 5:30.
     */

    const utcDate = new Date(
      Date.UTC(
        year,
        month - 1,
        day,
        hours - 5,
        minutes - 30,
        0,
        0
      )
    );

    return utcDate.toISOString();
  };

  /*
  |--------------------------------------------------------------------------
  | Find Class Name
  |--------------------------------------------------------------------------
  */

  const getClassName = (session) => {
    return (
      session?.class_name ||
      session?.className ||
      session?.class?.name ||
      session?.class?.class_name ||
      classes.find(
        (item) =>
          String(item?.id) ===
          String(
            session?.class_id ||
              session?.classId
          )
      )?.name ||
      classes.find(
        (item) =>
          String(item?.id) ===
          String(
            session?.class_id ||
              session?.classId
          )
      )?.class_name ||
      "Unknown Class"
    );
  };

  /*
  |--------------------------------------------------------------------------
  | Get Session ID
  |--------------------------------------------------------------------------
  */

  const getSessionId = (session) => {
    return (
      session?.id ||
      session?.session_id ||
      session?.sessionId
    );
  };

  /*
  |--------------------------------------------------------------------------
  | Open Create Modal
  |--------------------------------------------------------------------------
  */

  const openCreateModal = () => {
    setEditingSession(null);

    setForm({
      class_id:
        classes.length > 0
          ? String(classes[0]?.id || "")
          : "",
      start_time: "",
    });

    setShowModal(true);
  };

  /*
  |--------------------------------------------------------------------------
  | Open Edit Modal
  |--------------------------------------------------------------------------
  */

  const openEditModal = (session) => {
    setEditingSession(session);

    const classId =
      session?.class_id ||
      session?.classId ||
      session?.class?.id ||
      "";

    const time = getISTTime(
      session?.start_time ||
        session?.startTime
    );

    setForm({
      class_id: String(classId || ""),
      start_time: time,
    });

    setShowModal(true);
  };

  /*
  |--------------------------------------------------------------------------
  | Close Modal
  |--------------------------------------------------------------------------
  */

  const closeModal = () => {
    if (saving) return;

    setShowModal(false);
    setEditingSession(null);

    setForm({
      class_id: "",
      start_time: "",
    });
  };

  /*
  |--------------------------------------------------------------------------
  | Input Change
  |--------------------------------------------------------------------------
  */

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /*
  |--------------------------------------------------------------------------
  | Save / Update Session
  |--------------------------------------------------------------------------
  */

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.class_id) {
      alert("Please select a class.");
      return;
    }

    if (!form.start_time) {
      alert("Please select a start time.");
      return;
    }

    const sessionId = editingSession
      ? getSessionId(editingSession)
      : null;

    /*
     * Convert IST HH:mm to UTC ISO
     */

    const utcStartTime = convertISTTimeToUTC(
      form.start_time,
      editingSession?.start_time ||
        editingSession?.startTime ||
        null
    );

    if (!utcStartTime) {
      alert("Invalid start time.");
      return;
    }

    /*
     * IMPORTANT:
     *
     * Do NOT send:
     *
     * start_time: "22:04"
     *
     * Send:
     *
     * start_time: "2026-09-28T16:34:00.000Z"
     */

    const payload = {
      class_id: Number(form.class_id),
      start_time: utcStartTime,
    };

    console.log(
      "SESSION PAYLOAD:",
      payload
    );

    try {
      setSaving(true);

      if (sessionId) {
        /*
         * UPDATE
         */

        const response = await API.put(
          `/sessions/${sessionId}`,
          payload
        );

        console.log(
          "SESSION UPDATE RESPONSE:",
          response.data
        );
      } else {
        /*
         * CREATE
         */

        const response = await API.post(
          "/sessions/institute",
          payload
        );

        console.log(
          "SESSION CREATE RESPONSE:",
          response.data
        );
      }

      closeModal();

      await fetchSessions();
    } catch (error) {
      console.error(
        "Save Session Error:",
        error
      );

      console.error(
        "Backend Response:",
        error?.response?.data
      );

      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Unable to save session.";

      alert(message);
    } finally {
      setSaving(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Delete Session
  |--------------------------------------------------------------------------
  */

  const handleDelete = async (session) => {
    const sessionId = getSessionId(session);

    if (!sessionId) {
      alert("Session ID not found.");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this session?"
    );

    if (!confirmed) return;

    try {
      await API.delete(
        `/sessions/${sessionId}`
      );

      await fetchSessions();
    } catch (error) {
      console.error(
        "Delete Session Error:",
        error
      );

      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Unable to delete session.";

      alert(message);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Search
  |--------------------------------------------------------------------------
  */

  const filteredSessions = useMemo(() => {
    const keyword =
      search.trim().toLowerCase();

    if (!keyword) return sessions;

    return sessions.filter((session) => {
      const className =
        getClassName(session).toLowerCase();

      const time = getISTTime(
        session?.start_time ||
          session?.startTime
      ).toLowerCase();

      return (
        className.includes(keyword) ||
        time.includes(keyword)
      );
    });
  }, [sessions, search, classes]);

  /*
  |--------------------------------------------------------------------------
  | Format Time
  |--------------------------------------------------------------------------
  */

  const formatTime = (session) => {
    const time = getISTTime(
      session?.start_time ||
        session?.startTime
    );

    if (!time) return "--:--";

    const [hourString, minute] =
      time.split(":");

    let hour = Number(hourString);

    const period =
      hour >= 12 ? "PM" : "AM";

    hour = hour % 12 || 12;

    return `${String(hour).padStart(
      2,
      "0"
    )}:${minute} ${period}`;
  };

  /*
  |--------------------------------------------------------------------------
  | Loading
  |--------------------------------------------------------------------------
  */

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09080D] text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-[#A842DF] border-t-transparent animate-spin" />

          <p className="text-gray-400">
            Loading sessions...
          </p>
        </div>
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | UI
  |--------------------------------------------------------------------------
  */

  return (
    <div className="min-h-screen bg-[#09080D] text-white p-6 md:p-8">

      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">

        <div>
          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-[#A842DF] to-[#EE68E0] bg-clip-text text-transparent">
            Institute Sessions
          </h1>

          <p className="text-gray-400 mt-2 text-lg">
            Manage sessions for your institute classes.
          </p>
        </div>

        <div className="flex items-center gap-3">

          <button
            type="button"
            onClick={handleRefresh}
            className="px-5 py-3 rounded-xl bg-[#17151D] border border-white/10 hover:border-[#A842DF]/50 transition-all flex items-center gap-2"
          >
            <FaSyncAlt />

            Refresh
          </button>

          <button
            type="button"
            onClick={openCreateModal}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#A842DF] to-[#EE68E0] font-bold flex items-center gap-2 hover:scale-[1.02] transition-all shadow-lg shadow-purple-900/30"
          >
            <FaPlus />

            Add Session
          </button>

        </div>
      </div>

      {/* ======================================================
          SEARCH
      ====================================================== */}

      <div className="mb-6">

        <input
          type="text"
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
          placeholder="Search by class or time..."
          className="w-full bg-[#17151D] border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-500 outline-none focus:border-[#A842DF]"
        />

      </div>

      {/* ======================================================
          SESSIONS TABLE
      ====================================================== */}

      <div className="bg-[#15141B] border border-white/10 rounded-2xl overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[750px]">

            <thead className="bg-[#201E28]">

              <tr>

                <th className="text-left px-6 py-5 text-sm font-bold text-gray-300">
                  Class
                </th>

                <th className="text-left px-6 py-5 text-sm font-bold text-gray-300">
                  Start Time
                </th>

                <th className="text-left px-6 py-5 text-sm font-bold text-gray-300">
                  Date
                </th>

                <th className="text-right px-6 py-5 text-sm font-bold text-gray-300">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredSessions.length === 0 ? (

                <tr>

                  <td
                    colSpan="4"
                    className="px-6 py-16 text-center"
                  >

                    <FaGraduationCap className="mx-auto text-5xl text-[#A842DF] mb-4" />

                    <p className="text-xl font-bold text-white">
                      No sessions found
                    </p>

                    <p className="text-gray-500 mt-2">
                      Create a session for one of your classes.
                    </p>

                  </td>

                </tr>

              ) : (

                filteredSessions.map(
                  (session, index) => {

                    const startDate =
                      session?.start_time ||
                      session?.startTime;

                    let formattedDate = "--";

                    if (startDate) {
                      const date =
                        new Date(startDate);

                      if (
                        !Number.isNaN(
                          date.getTime()
                        )
                      ) {
                        formattedDate =
                          new Intl.DateTimeFormat(
                            "en-IN",
                            {
                              timeZone:
                                "Asia/Kolkata",
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          ).format(date);
                      }
                    }

                    return (
                      <tr
                        key={
                          getSessionId(
                            session
                          ) ||
                          `session-${index}`
                        }
                        className="border-t border-white/10 hover:bg-white/[0.025] transition-colors"
                      >

                        {/* CLASS */}

                        <td className="px-6 py-5">

                          <div className="flex items-center gap-3">

                            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#A842DF] to-[#EE68E0] flex items-center justify-center">

                              <FaGraduationCap />

                            </div>

                            <div>

                              <p className="font-bold text-white">
                                {getClassName(
                                  session
                                )}
                              </p>

                            </div>

                          </div>

                        </td>

                        {/* TIME */}

                        <td className="px-6 py-5">

                          <div className="flex items-center gap-2 text-white">

                            <FaClock className="text-[#A842DF]" />

                            <span>
                              {formatTime(
                                session
                              )}
                            </span>

                          </div>

                        </td>

                        {/* DATE */}

                        <td className="px-6 py-5 text-gray-300">

                          {formattedDate}

                        </td>

                        {/* ACTIONS */}

                        <td className="px-6 py-5">

                          <div className="flex justify-end items-center gap-3">

                            <button
                              type="button"
                              onClick={() =>
                                openEditModal(
                                  session
                                )
                              }
                              title="Edit Session"
                              className="w-10 h-10 rounded-lg bg-white/5 hover:bg-[#A842DF]/20 text-gray-300 hover:text-[#D878FF] flex items-center justify-center transition-all"
                            >
                              <FaEdit />
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                handleDelete(
                                  session
                                )
                              }
                              title="Delete Session"
                              className="w-10 h-10 rounded-lg bg-white/5 hover:bg-red-500/20 text-gray-300 hover:text-red-400 flex items-center justify-center transition-all"
                            >
                              <FaTrash />
                            </button>

                          </div>

                        </td>

                      </tr>
                    );
                  }
                )

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* ======================================================
          MODAL
      ====================================================== */}

      {showModal && (

        <div className="fixed inset-0 z-[9999] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">

          <div className="w-full max-w-2xl bg-[#211D32] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">

            {/* ==================================================
                MODAL HEADER
            ================================================== */}

            <div className="px-7 py-6 border-b border-white/10 flex items-center justify-between">

              <div>

                <h2 className="text-2xl md:text-3xl font-black text-white">

                  {editingSession
                    ? "Edit Session"
                    : "Add Session"}

                </h2>

                <p className="text-gray-400 mt-1">
                  {editingSession
                    ? "Update session information."
                    : "Create a new session for your class."}
                </p>

              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
                className="w-10 h-10 rounded-lg hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all"
              >
                <FaTimes size={20} />
              </button>

            </div>

            {/* ==================================================
                FORM
            ================================================== */}

            <form
              onSubmit={handleSubmit}
              className="p-7"
            >

              {/* CLASS */}

              <div className="mb-7">

                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Class
                </label>

                <select
                  name="class_id"
                  value={form.class_id}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#302B40] border border-white/10 rounded-xl px-4 py-4 text-white outline-none focus:border-[#A842DF]"
                >

                  <option value="">
                    Select Class
                  </option>

                  {classes.map((item) => (

                    <option
                      key={item?.id}
                      value={item?.id}
                    >
                      {item?.name ||
                        item?.class_name ||
                        `Class ${item?.id}`}
                    </option>

                  ))}

                </select>

                {classes.length === 0 && (

                  <p className="text-sm text-yellow-400 mt-2">
                    No institute classes found.
                  </p>

                )}

              </div>

              {/* START TIME */}

              <div className="mb-8">

                <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-2">

                  <FaClock className="text-[#A842DF]" />

                  Start Time
                  <span className="text-gray-500 font-normal">
                    (IST)
                  </span>

                </label>

                <input
                  type="time"
                  name="start_time"
                  value={form.start_time}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#302B40] border border-white/10 rounded-xl px-4 py-4 text-white outline-none focus:border-[#A842DF]"
                />

                <p className="text-xs text-gray-500 mt-2">
                  Time is entered in IST. It will automatically
                  be converted to UTC before being sent to the
                  backend.
                </p>

              </div>

              {/* ==================================================
                  BUTTONS
              ================================================== */}

              <div className="flex justify-end gap-3 pt-5 border-t border-white/10">

                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="px-6 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="px-7 py-3 rounded-xl bg-gradient-to-r from-[#A842DF] to-[#EE68E0] font-bold text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >

                  {saving && (
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  )}

                  {saving
                    ? "Saving..."
                    : editingSession
                    ? "Update Session"
                    : "Create Session"}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
};

export default Sessions;