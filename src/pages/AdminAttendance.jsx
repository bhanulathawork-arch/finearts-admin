// import { useEffect, useMemo, useState } from "react";
// import { CalendarCheck, Check, Clock3, Search, Users, X } from "lucide-react";
// import API from "../services/api";

// const pick = (obj, keys, fallback = "") => {
//   for (const key of keys) if (obj?.[key] !== undefined && obj?.[key] !== null) return obj[key];
//   return fallback;
// };

// const listFrom = (payload) => {
//   const d = payload?.data ?? payload;
//   if (Array.isArray(d)) return d;
//   return d?.data || d?.students || d?.attendance || d?.sessions || [];
// };

// export default function AdminAttendance() {
//   const [sessions, setSessions] = useState([]);
//   const [selected, setSelected] = useState(null);
//   const [students, setStudents] = useState([]);
//   const [attendance, setAttendance] = useState({});
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);

//   const loadSessions = async () => {
//     setLoading(true);
//     try {
//       const res = await API.get("/sessions/trainer/my-sessions");
//       setSessions(listFrom(res.data));
//     } catch (e) {
//       setSessions([]);
//     } finally { setLoading(false); }
//   };

//   useEffect(() => { loadSessions(); }, []);

//   const loadSession = async (session) => {
//     setSelected(session);
//     setStudents([]);
//     setAttendance({});
//     try {
//       const res = await API.get(`/attendance/session/${pick(session,["id","session_id"])}`);
//       const rows = listFrom(res.data);
//       setStudents(rows.map(r => ({
//         ...r,
//         student_id: pick(r,["student_id","user_id","account_id","id"]),
//         student_name: pick(r,["student_name","name","full_name","student_email"], "Student"),
//       })));
//       const map = {};
//       rows.forEach(r => { map[pick(r,["student_id","user_id","account_id","id"])] = String(pick(r,["status"],"ABSENT")).toUpperCase(); });
//       setAttendance(map);
//     } catch (e) {
//       try {
//         const res = await API.get(`/bookings/trainer/my-bookings?session_id=${pick(session,["id","session_id"])}`);
//         const rows = listFrom(res.data);
//         setStudents(rows.map(r => ({
//           ...r,
//           student_id: pick(r,["student_id","user_id","account_id"]),
//           student_name: pick(r,["student_name","name","full_name","student_email"], "Student"),
//         })));
//       } catch (_) { setStudents([]); }
//     }
//   };

//   const filtered = useMemo(() => students.filter(s =>
//     String(s.student_name || "").toLowerCase().includes(search.toLowerCase()) ||
//     String(pick(s,["student_email","email"])).toLowerCase().includes(search.toLowerCase())
//   ), [students, search]);

//   const setStatus = (id, status) => setAttendance(a => ({ ...a, [id]: status }));

//   const save = async () => {
//     if (!selected) return;
//     setSaving(true);
//     const sessionId = pick(selected,["id","session_id"]);
//     try {
//       await API.post(`/attendance/session/${sessionId}`, {
//         attendance: students.map(s => ({ student_id: s.student_id, status: attendance[s.student_id] || "ABSENT" }))
//       });
//       alert("Attendance saved successfully.");
//     } catch (e) {
//       alert(e?.response?.data?.message || "Attendance API is not connected yet.");
//     } finally { setSaving(false); }
//   };

//   return <div className="min-h-full text-white space-y-6">
//     <header><h1 className="text-3xl font-bold">Attendance</h1><p className="text-white/45 mt-1">Mark and manage attendance for your sessions.</p></header>
//     <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6">
//       <section className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
//         <div className="p-4 border-b border-white/10 flex items-center gap-2"><CalendarCheck size={18}/><span className="font-semibold">Sessions</span></div>
//         <div className="max-h-[650px] overflow-y-auto">
//           {loading ? <div className="p-6 text-white/40">Loading sessions...</div> : sessions.length === 0 ? <div className="p-6 text-white/40">No sessions found.</div> : sessions.map(s => {
//             const id = pick(s,["id","session_id"]); const active = pick(selected,["id","session_id"]) === id;
//             return <button key={id} onClick={()=>loadSession(s)} className={`w-full text-left p-4 border-b border-white/5 transition ${active?"bg-purple-500/15":"hover:bg-white/5"}`}>
//               <p className="font-medium">{pick(s,["class_title","class_name","title"],"Session")}</p>
//               <p className="text-xs text-white/45 mt-1">{pick(s,["title"],"")}</p>
//               <p className="text-xs text-white/45 mt-2">{pick(s,["start_time","date_time","session_date"],"Time not set")}</p>
//             </button>
//           })}
//         </div>
//       </section>
//       <section className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
//         {!selected ? <div className="h-[500px] flex items-center justify-center text-white/35"><div className="text-center"><CalendarCheck className="mx-auto mb-3" size={38}/><p>Select a session to mark attendance.</p></div></div> : <>
//           <div className="p-5 border-b border-white/10 flex flex-wrap gap-3 justify-between items-center"><div><h2 className="font-semibold text-lg">{pick(selected,["class_title","class_name","title"],"Session")}</h2><p className="text-sm text-white/45">{pick(selected,["start_time","date_time","session_date"],"")}</p></div><button onClick={save} disabled={saving} className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50">{saving?"Saving...":"Save Attendance"}</button></div>
//           <div className="p-5"><div className="flex gap-3 mb-4"><div className="relative flex-1"><Search className="absolute left-3 top-3 text-white/30" size={17}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search students" className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/20 border border-white/10 outline-none"/></div><div className="px-4 py-2.5 rounded-xl border border-white/10 text-sm text-white/60">{filtered.length} students</div></div>
//             <div className="space-y-2">{filtered.length===0 ? <div className="py-12 text-center text-white/35"><Users className="mx-auto mb-2"/>No students found.</div> : filtered.map(s=>{const id=s.student_id; const st=attendance[id]||"ABSENT"; return <div key={id} className="p-3 rounded-xl bg-black/20 border border-white/5 flex flex-wrap items-center justify-between gap-3"><div><p className="font-medium">{s.student_name}</p><p className="text-xs text-white/40">{pick(s,["student_email","email"],"")}</p></div><div className="flex gap-1">{[["PRESENT",Check],["LATE",Clock3],["ABSENT",X]].map(([label,Icon])=><button key={label} onClick={()=>setStatus(id,label)} className={`px-3 py-2 rounded-lg text-xs flex items-center gap-1 ${st===label?"bg-purple-600 text-white":"bg-white/5 text-white/50"}`}><Icon size={14}/>{label}</button>)}</div></div>})}</div>
//           </div>
//         </>}
//       </section>
//     </div>
//   </div>;
// }


import { useEffect, useMemo, useState } from "react";
import {
  Calendar,
  CalendarCheck,
  Check,
  ChevronRight,
  Clock3,
  Image as ImageIcon,
  RefreshCw,
  Search,
  Users,
  X,
} from "lucide-react";

import API from "../services/api";

/* =========================================================
   HELPERS
========================================================= */

const pick = (obj, keys, fallback = "") => {
  for (const key of keys) {
    if (
      obj?.[key] !== undefined &&
      obj?.[key] !== null &&
      obj?.[key] !== ""
    ) {
      return obj[key];
    }
  }

  return fallback;
};

const listFrom = (payload) => {
  const d = payload?.data ?? payload;

  if (Array.isArray(d)) {
    return d;
  }

  if (Array.isArray(d?.data)) {
    return d.data;
  }

  if (Array.isArray(d?.students)) {
    return d.students;
  }

  if (Array.isArray(d?.attendance)) {
    return d.attendance;
  }

  if (Array.isArray(d?.sessions)) {
    return d.sessions;
  }

  return [];
};

const getSessionId = (session) => {
  return pick(session, ["id", "session_id"]);
};

const getStudentId = (student) => {
  return pick(student, [
    "student_id",
    "user_id",
    "account_id",
    "id",
  ]);
};

const getStudentName = (student) => {
  return pick(
    student,
    [
      "student_name",
      "name",
      "full_name",
      "student_full_name",
      "student_email",
    ],
    "Student"
  );
};

const getStudentEmail = (student) => {
  return pick(
    student,
    ["student_email", "email"],
    ""
  );
};

const getSessionTitle = (session) => {
  return pick(
    session,
    [
      "class_title",
      "class_name",
      "classTitle",
      "title",
      "session_title",
      "session_name",
    ],
    "Session"
  );
};

const getSessionSubtitle = (session) => {
  return pick(
    session,
    [
      "title",
      "session_title",
      "session_name",
      "description",
    ],
    ""
  );
};

const getSessionDate = (session) => {
  return pick(
    session,
    [
      "session_date",
      "date",
      "scheduled_date",
      "start_date",
      "date_time",
      "start_time",
    ],
    ""
  );
};

const getSessionTime = (session) => {
  return pick(
    session,
    [
      "time",
      "start_time",
      "session_time",
      "date_time",
    ],
    ""
  );
};

const getSessionEndTime = (session) => {
  return pick(
    session,
    [
      "end_time",
      "session_end_time",
    ],
    ""
  );
};

const getSessionImage = (session) => {
  return pick(
    session,
    [
      "image",
      "image_url",
      "thumbnail",
      "thumbnail_url",
      "class_image",
      "class_image_url",
      "cover_image",
      "cover_image_url",
    ],
    ""
  );
};

const getEnrollmentCount = (session, fallback = 0) => {
  const value = pick(
    session,
    [
      "enrolled_count",
      "enrollment_count",
      "students_count",
      "student_count",
      "total_students",
      "bookings_count",
      "booked_students",
    ],
    fallback
  );

  const number = Number(value);

  return Number.isFinite(number) ? number : fallback;
};

const getInitials = (name) => {
  if (!name) return "ST";

  const parts = String(name)
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
};

const normalizeStatus = (status) => {
  const value = String(status || "ABSENT").toUpperCase();

  if (value === "PRESENT") return "PRESENT";
  if (value === "LATE") return "LATE";

  return "ABSENT";
};

const formatDate = (value) => {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return date.toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatTime = (value) => {
  if (!value) return "";

  const stringValue = String(value);

  /*
   * If backend already gives a readable time,
   * don't unnecessarily convert it.
   */
  if (
    stringValue.includes("AM") ||
    stringValue.includes("PM")
  ) {
    return stringValue;
  }

  const date = new Date(value);

  if (!Number.isNaN(date.getTime())) {
    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return stringValue;
};

/* =========================================================
   SESSION IMAGE
========================================================= */

function SessionImage({
  session,
  className = "",
}) {
  const image = getSessionImage(session);

  if (image) {
    return (
      <img
        src={image}
        alt={getSessionTitle(session)}
        className={`object-cover ${className}`}
        onError={(e) => {
          e.currentTarget.style.display = "none";
          e.currentTarget.parentElement?.classList.add(
            "session-image-fallback"
          );
        }}
      />
    );
  }

  return (
    <div
      className={`flex items-center justify-center bg-gradient-to-br from-purple-500/30 via-fuchsia-500/20 to-black ${className}`}
    >
      <ImageIcon
        size={28}
        className="text-white/40"
      />
    </div>
  );
}

/* =========================================================
   STUDENT AVATAR
========================================================= */

function StudentAvatar({ student }) {
  const image = pick(student, [
    "student_image",
    "student_image_url",
    "profile_image",
    "profile_image_url",
    "avatar",
    "avatar_url",
    "image",
    "image_url",
  ]);

  const name = getStudentName(student);

  if (image) {
    return (
      <img
        src={image}
        alt={name}
        className="w-10 h-10 rounded-full object-cover border border-white/10"
        onError={(e) => {
          e.currentTarget.style.display = "none";
          e.currentTarget.parentElement?.classList.add(
            "student-avatar-fallback"
          );
        }}
      />
    );
  }

  return (
    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center text-sm font-semibold text-white">
      {getInitials(name)}
    </div>
  );
}

/* =========================================================
   STATUS BUTTON
========================================================= */

function StatusButton({
  label,
  icon: Icon,
  active,
  type,
  onClick,
}) {
  let activeClass = "";

  if (active && type === "PRESENT") {
    activeClass =
      "border-emerald-400/70 bg-emerald-500/15 text-emerald-400";
  }

  if (active && type === "LATE") {
    activeClass =
      "border-yellow-400/70 bg-yellow-500/15 text-yellow-400";
  }

  if (active && type === "ABSENT") {
    activeClass =
      "border-red-400/70 bg-red-500/15 text-red-400";
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        min-w-[92px]
        px-3
        py-2
        rounded-xl
        border
        text-xs
        font-medium
        flex
        items-center
        justify-center
        gap-1.5
        transition
        ${
          active
            ? activeClass
            : "border-white/10 bg-white/[0.025] text-white/55 hover:bg-white/[0.06] hover:text-white"
        }
      `}
    >
      <Icon size={14} />
      {active && type === "PRESENT" ? "Present" : null}
      {active && type === "LATE" ? "Late" : null}
      {active && type === "ABSENT" ? "Absent" : null}

      {!active ? label : null}
    </button>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function AdminAttendance() {
  const [sessions, setSessions] = useState([]);
  const [selected, setSelected] = useState(null);

  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});

  const [sessionSearch, setSessionSearch] =
    useState("");

  const [studentSearch, setStudentSearch] =
    useState("");

  const [loading, setLoading] = useState(true);
  const [loadingStudents, setLoadingStudents] =
    useState(false);

  const [saving, setSaving] = useState(false);

  /* =======================================================
     LOAD SESSIONS
  ======================================================= */

  const loadSessions = async () => {
    setLoading(true);

    try {
      const res = await API.get(
        "/sessions/trainer/my-sessions"
      );

      const rows = listFrom(res.data);

      setSessions(rows);

      /*
       * Automatically select first session
       * so page looks like the provided template.
       */
      if (rows.length > 0) {
        setSelected((current) => {
          if (current) {
            const currentId =
              getSessionId(current);

            const stillExists = rows.find(
              (item) =>
                String(getSessionId(item)) ===
                String(currentId)
            );

            if (stillExists) {
              return stillExists;
            }
          }

          return rows[0];
        });
      } else {
        setSelected(null);
      }
    } catch (error) {
      console.error(
        "Load trainer sessions error:",
        error
      );

      setSessions([]);
      setSelected(null);
    } finally {
      setLoading(false);
    }
  };

  /* =======================================================
     INITIAL LOAD
  ======================================================= */

  useEffect(() => {
    loadSessions();
  }, []);

  /* =======================================================
     LOAD SELECTED SESSION
  ======================================================= */

  const loadSession = async (session) => {
    const sessionId = getSessionId(session);

    if (!sessionId) {
      return;
    }

    setSelected(session);
    setStudents([]);
    setAttendance({});
    setStudentSearch("");
    setLoadingStudents(true);

    try {
      /*
       * Primary attendance API
       */
      const res = await API.get(
        `/attendance/session/${sessionId}`
      );

      const rows = listFrom(res.data);

      const normalizedStudents = rows.map(
        (row) => ({
          ...row,
          student_id:
            getStudentId(row),
          student_name:
            getStudentName(row),
          student_email:
            getStudentEmail(row),
        })
      );

      setStudents(normalizedStudents);

      const statusMap = {};

      rows.forEach((row) => {
        const studentId =
          getStudentId(row);

        if (!studentId) return;

        statusMap[studentId] =
          normalizeStatus(
            pick(row, ["status"], "ABSENT")
          );
      });

      setAttendance(statusMap);
    } catch (error) {
      console.error(
        "Load attendance error:",
        error
      );

      /*
       * Fallback:
       * Get enrolled students from bookings.
       */
      try {
        const res = await API.get(
          `/bookings/trainer/my-bookings?session_id=${sessionId}`
        );

        const rows = listFrom(res.data);

        const normalizedStudents =
          rows.map((row) => ({
            ...row,
            student_id:
              getStudentId(row),
            student_name:
              getStudentName(row),
            student_email:
              getStudentEmail(row),
          }));

        setStudents(normalizedStudents);

        /*
         * Default all students to ABSENT
         * until trainer marks them.
         */
        const statusMap = {};

        normalizedStudents.forEach(
          (student) => {
            if (student.student_id) {
              statusMap[
                student.student_id
              ] = "ABSENT";
            }
          }
        );

        setAttendance(statusMap);
      } catch (fallbackError) {
        console.error(
          "Load booking students error:",
          fallbackError
        );

        setStudents([]);
        setAttendance({});
      }
    } finally {
      setLoadingStudents(false);
    }
  };

  /* =======================================================
     FILTER SESSIONS
  ======================================================= */

  const filteredSessions = useMemo(() => {
    const query =
      sessionSearch.trim().toLowerCase();

    if (!query) {
      return sessions;
    }

    return sessions.filter((session) => {
      const text = [
        getSessionTitle(session),
        getSessionSubtitle(session),
        getSessionDate(session),
        getSessionTime(session),
      ]
        .join(" ")
        .toLowerCase();

      return text.includes(query);
    });
  }, [sessions, sessionSearch]);

  /* =======================================================
     FILTER STUDENTS
  ======================================================= */

  const filteredStudents = useMemo(() => {
    const query =
      studentSearch.trim().toLowerCase();

    if (!query) {
      return students;
    }

    return students.filter((student) => {
      const name =
        getStudentName(student).toLowerCase();

      const email =
        getStudentEmail(student).toLowerCase();

      return (
        name.includes(query) ||
        email.includes(query)
      );
    });
  }, [students, studentSearch]);

  /* =======================================================
     CHANGE STATUS
  ======================================================= */

  const setStatus = (
    studentId,
    status
  ) => {
    if (!studentId) return;

    setAttendance((current) => ({
      ...current,
      [studentId]: status,
    }));
  };

  /* =======================================================
     SAVE ATTENDANCE
  ======================================================= */

  const save = async () => {
    if (!selected) {
      alert("Please select a session.");
      return;
    }

    const sessionId =
      getSessionId(selected);

    if (!sessionId) {
      alert("Session ID is missing.");
      return;
    }

    setSaving(true);

    try {
      const payload = {
        attendance: students
          .filter(
            (student) =>
              student.student_id !== undefined &&
              student.student_id !== null
          )
          .map((student) => ({
            student_id:
              student.student_id,
            status:
              attendance[
                student.student_id
              ] || "ABSENT",
          })),
      };

      await API.post(
        `/attendance/session/${sessionId}`,
        payload
      );

      alert(
        "Attendance saved successfully."
      );
    } catch (error) {
      console.error(
        "Save attendance error:",
        error
      );

      alert(
        error?.response?.data?.message ||
          "Unable to save attendance."
      );
    } finally {
      setSaving(false);
    }
  };

  /* =======================================================
     SELECT SESSION
  ======================================================= */

  const handleSelectSession = (
    session
  ) => {
    loadSession(session);
  };

  /* =======================================================
     SESSION DATA
  ======================================================= */

  const selectedTitle = selected
    ? getSessionTitle(selected)
    : "Session";

  const selectedSubtitle = selected
    ? getSessionSubtitle(selected)
    : "";

  const selectedDate = selected
    ? getSessionDate(selected)
    : "";

  const selectedTime = selected
    ? getSessionTime(selected)
    : "";

  const selectedEndTime = selected
    ? getSessionEndTime(selected)
    : "";

  const enrolledCount = selected
    ? getEnrollmentCount(
        selected,
        students.length
      )
    : 0;

  /* =======================================================
     COUNTS
  ======================================================= */

  const presentCount = students.filter(
    (student) =>
      attendance[
        student.student_id
      ] === "PRESENT"
  ).length;

  const lateCount = students.filter(
    (student) =>
      attendance[
        student.student_id
      ] === "LATE"
  ).length;

  const absentCount = students.filter(
    (student) =>
      attendance[
        student.student_id
      ] === "ABSENT"
  ).length;

  /* =======================================================
     UI
  ======================================================= */

  return (
    <div className="min-h-full text-white space-y-6 pb-8">

      {/* =================================================
          HEADER
      ================================================= */}

      <header className="flex flex-wrap items-start justify-between gap-4">

        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Attendance
          </h1>

          <p className="text-white/45 mt-1 text-sm md:text-base">
            Mark and manage attendance for your sessions.
          </p>
        </div>

        <button
          type="button"
          onClick={loadSessions}
          disabled={loading}
          className="
            px-5
            py-3
            rounded-xl
            border
            border-white/10
            bg-white/[0.03]
            hover:bg-white/[0.07]
            transition
            flex
            items-center
            gap-2
            text-sm
            font-medium
            disabled:opacity-50
          "
        >
          <RefreshCw
            size={17}
            className={
              loading
                ? "animate-spin"
                : ""
            }
          />

          Refresh
        </button>
      </header>

      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <div
        className="
          grid
          grid-cols-1
          lg:grid-cols-[390px_minmax(0,1fr)]
          gap-5
        "
      >

        {/* =================================================
            LEFT - SESSIONS
        ================================================= */}

        <section
          className="
            rounded-2xl
            border
            border-white/10
            bg-white/[0.025]
            overflow-hidden
          "
        >

          {/* Sessions Header */}

          <div
            className="
              p-5
              border-b
              border-white/10
            "
          >

            <div className="flex items-center justify-between gap-3">

              <div className="flex items-center gap-3">

                <div
                  className="
                    w-10
                    h-10
                    rounded-xl
                    bg-white/[0.05]
                    flex
                    items-center
                    justify-center
                  "
                >
                  <Calendar
                    size={20}
                    className="text-white/80"
                  />
                </div>

                <div>
                  <h2 className="font-semibold text-lg">
                    Sessions
                  </h2>

                  <p className="text-xs text-white/35">
                    Select a session
                  </p>
                </div>

              </div>

              <span
                className="
                  px-3
                  py-1.5
                  rounded-full
                  bg-white/[0.05]
                  text-white/70
                  text-xs
                  font-medium
                "
              >
                {sessions.length}
              </span>

            </div>

            {/* Session Search */}

            <div className="relative mt-4">

              <Search
                size={17}
                className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-white/30
                "
              />

              <input
                type="text"
                value={sessionSearch}
                onChange={(e) =>
                  setSessionSearch(
                    e.target.value
                  )
                }
                placeholder="Search sessions..."
                className="
                  w-full
                  pl-10
                  pr-4
                  py-3
                  rounded-xl
                  bg-black/20
                  border
                  border-white/10
                  outline-none
                  text-sm
                  placeholder:text-white/25
                  focus:border-purple-500/50
                "
              />

            </div>

          </div>

          {/* Session List */}

          <div
            className="
              max-h-[700px]
              overflow-y-auto
            "
          >

            {loading ? (

              <div className="p-8 text-center text-white/40">
                <RefreshCw
                  size={22}
                  className="mx-auto mb-3 animate-spin"
                />

                Loading sessions...
              </div>

            ) : filteredSessions.length === 0 ? (

              <div className="p-8 text-center text-white/35">

                <CalendarCheck
                  size={34}
                  className="mx-auto mb-3"
                />

                <p>
                  No sessions found.
                </p>

              </div>

            ) : (

              filteredSessions.map(
                (session) => {

                  const id =
                    getSessionId(
                      session
                    );

                  const selectedId =
                    selected
                      ? getSessionId(
                          selected
                        )
                      : null;

                  const active =
                    String(id) ===
                    String(selectedId);

                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() =>
                        handleSelectSession(
                          session
                        )
                      }
                      className={`
                        w-full
                        text-left
                        p-4
                        border-b
                        border-white/5
                        transition
                        ${
                          active
                            ? "bg-purple-500/[0.13]"
                            : "hover:bg-white/[0.04]"
                        }
                      `}
                    >

                      <div className="flex gap-3">

                        {/* Thumbnail */}

                        <div
                          className={`
                            w-20
                            h-20
                            shrink-0
                            rounded-xl
                            overflow-hidden
                            ${
                              active
                                ? "ring-2 ring-purple-500"
                                : ""
                            }
                          `}
                        >
                          <SessionImage
                            session={session}
                            className="w-full h-full"
                          />
                        </div>

                        {/* Details */}

                        <div className="min-w-0 flex-1">

                          <div className="flex items-start justify-between gap-2">

                            <h3
                              className="
                                font-semibold
                                text-sm
                                truncate
                              "
                            >
                              {getSessionTitle(
                                session
                              )}
                            </h3>

                            <ChevronRight
                              size={17}
                              className={`
                                shrink-0
                                mt-0.5
                                ${
                                  active
                                    ? "text-purple-400"
                                    : "text-white/25"
                                }
                              `}
                            />

                          </div>

                          <p
                            className="
                              text-xs
                              text-white/45
                              mt-1
                              line-clamp-1
                            "
                          >
                            {getSessionSubtitle(
                              session
                            )}
                          </p>

                          <div
                            className="
                              flex
                              flex-wrap
                              gap-x-3
                              gap-y-1
                              mt-3
                              text-xs
                              text-white/40
                            "
                          >

                            {getSessionDate(
                              session
                            ) && (
                              <span className="flex items-center gap-1">
                                <Calendar
                                  size={12}
                                />

                                {formatDate(
                                  getSessionDate(
                                    session
                                  )
                                )}
                              </span>
                            )}

                            {getSessionTime(
                              session
                            ) && (
                              <span className="flex items-center gap-1">
                                <Clock3
                                  size={12}
                                />

                                {formatTime(
                                  getSessionTime(
                                    session
                                  )
                                )}
                              </span>
                            )}

                          </div>

                        </div>

                      </div>

                    </button>
                  );
                }
              )

            )}

          </div>

        </section>

        {/* =================================================
            RIGHT - ATTENDANCE
        ================================================= */}

        <section
          className="
            rounded-2xl
            border
            border-white/10
            bg-white/[0.025]
            overflow-hidden
            min-w-0
          "
        >

          {!selected ? (

            /* =================================================
               NO SESSION
            ================================================= */

            <div
              className="
                min-h-[650px]
                flex
                items-center
                justify-center
                text-white/35
                p-8
              "
            >

              <div className="text-center">

                <CalendarCheck
                  size={48}
                  className="mx-auto mb-4"
                />

                <h3 className="font-semibold text-lg text-white/60">
                  Select a session
                </h3>

                <p className="text-sm mt-1">
                  Choose a session to mark attendance.
                </p>

              </div>

            </div>

          ) : (

            <>
              {/* =============================================
                  SELECTED SESSION HEADER
              ============================================= */}

              <div
                className="
                  p-5
                  md:p-6
                  border-b
                  border-white/10
                "
              >

                <div
                  className="
                    flex
                    flex-wrap
                    items-center
                    justify-between
                    gap-5
                  "
                >

                  <div className="flex gap-4 min-w-0">

                    {/* Large Session Image */}

                    <div
                      className="
                        w-20
                        h-20
                        md:w-24
                        md:h-24
                        rounded-xl
                        overflow-hidden
                        shrink-0
                      "
                    >
                      <SessionImage
                        session={selected}
                        className="w-full h-full"
                      />
                    </div>

                    {/* Session Info */}

                    <div className="min-w-0">

                      <h2
                        className="
                          text-xl
                          md:text-2xl
                          font-bold
                          truncate
                        "
                      >
                        {selectedTitle}
                      </h2>

                      {selectedSubtitle && (
                        <p
                          className="
                            text-white/50
                            mt-1
                            text-sm
                            truncate
                          "
                        >
                          {selectedSubtitle}
                        </p>
                      )}

                      <div
                        className="
                          flex
                          flex-wrap
                          gap-x-5
                          gap-y-2
                          mt-4
                          text-sm
                          text-white/50
                        "
                      >

                        {selectedDate && (
                          <span className="flex items-center gap-2">
                            <Calendar
                              size={16}
                            />

                            {formatDate(
                              selectedDate
                            )}
                          </span>
                        )}

                        {selectedTime && (
                          <span className="flex items-center gap-2">
                            <Clock3
                              size={16}
                            />

                            {formatTime(
                              selectedTime
                            )}

                            {selectedEndTime
                              ? ` - ${formatTime(
                                  selectedEndTime
                                )}`
                              : ""}
                          </span>
                        )}

                        <span className="flex items-center gap-2">
                          <Users
                            size={16}
                          />

                          {enrolledCount ||
                            students.length}{" "}
                          enrolled
                        </span>

                      </div>

                    </div>

                  </div>

                  {/* Save */}

                  <button
                    type="button"
                    onClick={save}
                    disabled={
                      saving ||
                      loadingStudents
                    }
                    className="
                      px-5
                      py-3
                      rounded-xl
                      bg-gradient-to-r
                      from-purple-600
                      to-fuchsia-500
                      hover:from-purple-500
                      hover:to-fuchsia-400
                      transition
                      flex
                      items-center
                      justify-center
                      gap-2
                      font-medium
                      text-sm
                      shadow-lg
                      shadow-purple-500/20
                      disabled:opacity-50
                      disabled:cursor-not-allowed
                    "
                  >

                    <CalendarCheck
                      size={17}
                    />

                    {saving
                      ? "Saving..."
                      : "Save Attendance"}

                  </button>

                </div>

                {/* =========================================
                    ATTENDANCE SUMMARY
                ========================================= */}

                <div
                  className="
                    grid
                    grid-cols-3
                    gap-2
                    mt-5
                  "
                >

                  <div
                    className="
                      rounded-xl
                      border
                      border-emerald-500/20
                      bg-emerald-500/[0.06]
                      px-4
                      py-3
                    "
                  >

                    <p className="text-xs text-white/40">
                      Present
                    </p>

                    <p className="text-lg font-semibold text-emerald-400 mt-0.5">
                      {presentCount}
                    </p>

                  </div>

                  <div
                    className="
                      rounded-xl
                      border
                      border-yellow-500/20
                      bg-yellow-500/[0.06]
                      px-4
                      py-3
                    "
                  >

                    <p className="text-xs text-white/40">
                      Late
                    </p>

                    <p className="text-lg font-semibold text-yellow-400 mt-0.5">
                      {lateCount}
                    </p>

                  </div>

                  <div
                    className="
                      rounded-xl
                      border
                      border-red-500/20
                      bg-red-500/[0.06]
                      px-4
                      py-3
                    "
                  >

                    <p className="text-xs text-white/40">
                      Absent
                    </p>

                    <p className="text-lg font-semibold text-red-400 mt-0.5">
                      {absentCount}
                    </p>

                  </div>

                </div>

              </div>

              {/* =============================================
                  STUDENTS
              ============================================= */}

              <div className="p-5 md:p-6">

                {/* Search */}

                <div
                  className="
                    flex
                    flex-wrap
                    gap-3
                    mb-5
                  "
                >

                  <div className="relative flex-1 min-w-[220px]">

                    <Search
                      size={18}
                      className="
                        absolute
                        left-3
                        top-1/2
                        -translate-y-1/2
                        text-white/30
                      "
                    />

                    <input
                      type="text"
                      value={studentSearch}
                      onChange={(e) =>
                        setStudentSearch(
                          e.target.value
                        )
                      }
                      placeholder="Search students by name or email..."
                      className="
                        w-full
                        pl-10
                        pr-4
                        py-3
                        rounded-xl
                        bg-black/20
                        border
                        border-white/10
                        outline-none
                        text-sm
                        placeholder:text-white/25
                        focus:border-purple-500/50
                      "
                    />

                  </div>

                  <div
                    className="
                      px-5
                      py-3
                      rounded-xl
                      border
                      border-white/10
                      bg-white/[0.025]
                      text-sm
                      text-white/65
                      flex
                      items-center
                      gap-2
                    "
                  >

                    <Users size={16} />

                    {filteredStudents.length}{" "}
                    students

                  </div>

                </div>

                {/* =========================================
                    TABLE HEADER
                ========================================= */}

                <div
                  className="
                    hidden
                    lg:grid
                    lg:grid-cols-[50px_minmax(180px,1fr)_minmax(160px,1fr)_330px]
                    items-center
                    gap-4
                    px-4
                    py-3
                    rounded-t-xl
                    bg-white/[0.045]
                    border
                    border-white/5
                    text-xs
                    text-white/50
                    font-medium
                  "
                >

                  <span>#</span>
                  <span>Student</span>
                  <span>Email</span>
                  <span>Status</span>

                </div>

                {/* =========================================
                    STUDENT LIST
                ========================================= */}

                <div className="space-y-2 lg:space-y-0">

                  {loadingStudents ? (

                    <div className="py-16 text-center text-white/35">

                      <RefreshCw
                        size={28}
                        className="mx-auto mb-3 animate-spin"
                      />

                      Loading students...

                    </div>

                  ) : filteredStudents.length ===
                    0 ? (

                    <div className="py-16 text-center text-white/35">

                      <Users
                        size={40}
                        className="mx-auto mb-3"
                      />

                      <p className="font-medium">
                        No students found
                      </p>

                      <p className="text-xs mt-1">
                        No enrolled students are available for this session.
                      </p>

                    </div>

                  ) : (

                    filteredStudents.map(
                      (student, index) => {

                        const studentId =
                          student.student_id;

                        const status =
                          attendance[
                            studentId
                          ] || "ABSENT";

                        return (
                          <div
                            key={
                              studentId ??
                              `${index}-${getStudentName(
                                student
                              )}`
                            }
                            className="
                              lg:grid
                              lg:grid-cols-[50px_minmax(180px,1fr)_minmax(160px,1fr)_330px]
                              lg:items-center
                              lg:gap-4
                              p-4
                              lg:px-4
                              lg:py-4
                              rounded-xl
                              lg:rounded-none
                              border
                              border-white/5
                              lg:border-x
                              lg:border-t-0
                              bg-black/[0.15]
                              lg:bg-transparent
                              hover:bg-white/[0.025]
                              transition
                            "
                          >

                            {/* Number */}

                            <div className="hidden lg:block text-sm text-white/45">
                              {index + 1}
                            </div>

                            {/* Student */}

                            <div
                              className="
                                flex
                                items-center
                                gap-3
                                min-w-0
                              "
                            >

                              <StudentAvatar
                                student={student}
                              />

                              <div className="min-w-0">

                                <p className="font-medium truncate">
                                  {getStudentName(
                                    student
                                  )}
                                </p>

                                <p className="text-xs text-white/35 lg:hidden truncate mt-0.5">
                                  {getStudentEmail(
                                    student
                                  )}
                                </p>

                              </div>

                            </div>

                            {/* Email */}

                            <div
                              className="
                                hidden
                                lg:block
                                text-sm
                                text-white/45
                                truncate
                              "
                            >
                              {getStudentEmail(
                                student
                              ) || "—"}
                            </div>

                            {/* Status */}

                            <div
                              className="
                                flex
                                flex-wrap
                                gap-2
                                mt-4
                                lg:mt-0
                                justify-start
                                lg:justify-end
                              "
                            >

                              <StatusButton
                                label="Present"
                                icon={Check}
                                type="PRESENT"
                                active={
                                  status ===
                                  "PRESENT"
                                }
                                onClick={() =>
                                  setStatus(
                                    studentId,
                                    "PRESENT"
                                  )
                                }
                              />

                              <StatusButton
                                label="Late"
                                icon={Clock3}
                                type="LATE"
                                active={
                                  status ===
                                  "LATE"
                                }
                                onClick={() =>
                                  setStatus(
                                    studentId,
                                    "LATE"
                                  )
                                }
                              />

                              <StatusButton
                                label="Absent"
                                icon={X}
                                type="ABSENT"
                                active={
                                  status ===
                                  "ABSENT"
                                }
                                onClick={() =>
                                  setStatus(
                                    studentId,
                                    "ABSENT"
                                  )
                                }
                              />

                            </div>

                          </div>
                        );
                      }
                    )

                  )}

                </div>

              </div>
            </>
          )}

        </section>

      </div>
    </div>
  );
}