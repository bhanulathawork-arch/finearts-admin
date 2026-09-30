
import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  ChevronDown,
  Download,
  Film,
  MoreVertical,
  Play,
  RefreshCw,
  Search,
  UploadCloud,
  Users,
  X,
} from "lucide-react";

import API from "../services/api";

/* =========================================================
   HELPERS
========================================================= */

const getRows = (response) => {
  const body = response?.data ?? response;

  if (Array.isArray(body)) return body;

  if (Array.isArray(body?.data)) return body.data;
  if (Array.isArray(body?.recordings)) return body.recordings;
  if (Array.isArray(body?.rows)) return body.rows;
  if (Array.isArray(body?.items)) return body.items;

  return [];
};

const getId = (row) =>
  row?.id ??
  row?.recording_id ??
  row?.recordingId;

const getTitle = (row) =>
  row?.title ||
  row?.recording_title ||
  row?.name ||
  "Session Recording";

const getClassId = (row) =>
  row?.class_id ??
  row?.classId ??
  "";

const getSessionId = (row) =>
  row?.session_id ??
  row?.sessionId ??
  "";

const getClassName = (row) =>
  row?.class_title ||
  row?.class_name ||
  row?.className ||
  row?.course_title ||
  row?.course_name ||
  "Class";

const getSessionName = (row) =>
  row?.session_title ||
  row?.session_name ||
  row?.sessionTitle ||
  "Session";

const getStatus = (row) =>
  String(
    row?.status ||
      row?.recording_status ||
      "READY"
  ).toUpperCase();

const getUrl = (row) =>
  row?.recording_url ||
  row?.video_url ||
  row?.videoUrl ||
  row?.download_url ||
  row?.play_url ||
  "";

const getDuration = (row) =>
  Number(
    row?.duration_seconds ??
      row?.duration ??
      0
  );

const getDate = (row) =>
  row?.recorded_at ||
  row?.recording_date ||
  row?.session_date ||
  row?.start_time ||
  row?.created_at ||
  null;

const formatDuration = (seconds) => {
  const value = Number(seconds);

  if (!value || value <= 0) {
    return "--:--";
  }

  const hours = Math.floor(value / 3600);
  const minutes = Math.floor(
    (value % 3600) / 60
  );
  const secs = Math.floor(value % 60);

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(secs).padStart(2, "0")}`;
  }

  return `${minutes}:${String(secs).padStart(
    2,
    "0"
  )}`;
};

const formatDate = (value) => {
  if (!value) {
    return "Date not available";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

/* =========================================================
   STATUS BADGE
========================================================= */

function StatusBadge({ status }) {
  const normalized = String(
    status || "READY"
  ).toUpperCase();

  let classes =
    "bg-white/5 text-white/50 border-white/10";

  if (
    normalized === "READY" ||
    normalized === "PUBLISHED"
  ) {
    classes =
      "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
  }

  if (
    normalized === "DRAFT" ||
    normalized === "UNLISTED"
  ) {
    classes =
      "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
  }

  if (
    normalized === "PROCESSING" ||
    normalized === "UPLOADING"
  ) {
    classes =
      "bg-purple-500/10 text-purple-300 border-purple-500/20";
  }

  if (
    normalized === "FAILED" ||
    normalized === "ERROR"
  ) {
    classes =
      "bg-red-500/10 text-red-400 border-red-500/20";
  }

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium ${classes}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {normalized}
    </span>
  );
}

/* =========================================================
   RECORDING CARD
========================================================= */

function RecordingCard({
  recording,
  onDelete,
}) {
  const [menuOpen, setMenuOpen] =
    useState(false);

  const title = getTitle(recording);
  const className = getClassName(recording);
  const sessionName = getSessionName(recording);
  const classId = getClassId(recording);
  const sessionId = getSessionId(recording);
  const status = getStatus(recording);
  const url = getUrl(recording);

  const duration = formatDuration(
    getDuration(recording)
  );

  const date = formatDate(
    getDate(recording)
  );

  const watchRecording = () => {
    if (!url) {
      alert(
        "Recording URL is not available."
      );
      return;
    }

    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const downloadRecording = () => {
    if (!url) {
      alert(
        "Recording URL is not available."
      );
      return;
    }

    const link =
      document.createElement("a");

    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.download = title;

    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const deleteThisRecording = async () => {
    const id = getId(recording);

    if (!id) {
      alert("Recording ID is missing.");
      return;
    }

    const confirmed = window.confirm(
      `Delete "${title}"?`
    );

    if (!confirmed) {
      return;
    }

    await onDelete(id);
  };

  return (
    <article className="rounded-2xl border border-white/10 bg-[#111117] hover:bg-[#15151d] transition overflow-visible">
      <div className="flex flex-col lg:flex-row gap-5 p-4">

        {/* THUMBNAIL */}
        <div className="w-full lg:w-[210px] shrink-0">
          <div className="relative aspect-video rounded-xl overflow-hidden bg-[#09090d] border border-white/5">

            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-950/60 via-[#17131e] to-black">
              <Film
                size={42}
                className="text-purple-400/70"
              />
            </div>

            <button
              type="button"
              onClick={watchRecording}
              className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/35 transition group"
            >
              <span className="w-12 h-12 rounded-full bg-black/70 border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <Play
                  size={19}
                  fill="white"
                  className="ml-0.5"
                />
              </span>
            </button>

            <span className="absolute bottom-2 right-2 px-2 py-1 rounded-md bg-black/80 text-white text-xs">
              {duration}
            </span>
          </div>
        </div>

        {/* DETAILS */}
        <div className="flex-1 min-w-0 flex flex-col justify-center">

          <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-3">

            <div className="min-w-0">

              <h3 className="text-lg font-semibold text-white truncate">
                {title}
              </h3>

              <div className="flex flex-wrap gap-x-5 gap-y-2 mt-2 text-sm text-white/45">

                <span className="inline-flex items-center gap-2">
                  <Users size={15} />
                  {className}
                </span>

                <span className="inline-flex items-center gap-2">
                  <CalendarDays size={15} />
                  {sessionName}
                </span>

              </div>

              {/* IMPORTANT IDs */}
              <div className="flex flex-wrap gap-3 mt-3">

                <span className="px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs">
                  Class ID: {classId || "-"}
                </span>

                <span className="px-2.5 py-1 rounded-lg bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs">
                  Session ID: {sessionId || "-"}
                </span>

              </div>

            </div>

            <StatusBadge status={status} />

          </div>

          {/* BOTTOM */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-4">

            <div className="text-sm text-white/40">
              {date}
            </div>

            <div className="flex items-center gap-2">

              <button
                type="button"
                onClick={watchRecording}
                className="h-10 px-4 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-purple-500/15 hover:border-purple-500/30 transition flex items-center gap-2 text-sm"
              >
                <Play size={16} />
                Watch
              </button>

              {url && (
                <button
                  type="button"
                  onClick={downloadRecording}
                  className="w-10 h-10 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] flex items-center justify-center"
                  title="Download"
                >
                  <Download size={16} />
                </button>
              )}

              <div className="relative">

                <button
                  type="button"
                  onClick={() =>
                    setMenuOpen(
                      (value) => !value
                    )
                  }
                  className="w-10 h-10 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] flex items-center justify-center"
                >
                  <MoreVertical size={17} />
                </button>

                {menuOpen && (
                  <>
                    <button
                      type="button"
                      aria-label="Close menu"
                      className="fixed inset-0 z-10 cursor-default"
                      onClick={() =>
                        setMenuOpen(false)
                      }
                    />

                    <div className="absolute right-0 bottom-12 z-20 w-48 rounded-xl border border-white/10 bg-[#18171f] shadow-2xl overflow-hidden">

                      {url && (
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard?.writeText(
                              url
                            );

                            setMenuOpen(false);

                            alert(
                              "Recording URL copied."
                            );
                          }}
                          className="w-full text-left px-4 py-3 text-sm text-white/75 hover:bg-white/5"
                        >
                          Copy Recording URL
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          setMenuOpen(false);
                          watchRecording();
                        }}
                        className="w-full text-left px-4 py-3 text-sm text-white/75 hover:bg-white/5"
                      >
                        Open Recording
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setMenuOpen(false);
                          deleteThisRecording();
                        }}
                        className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-red-500/10"
                      >
                        Delete Recording
                      </button>

                    </div>
                  </>
                )}

              </div>

            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   MAIN
========================================================= */

export default function InstituteRecordings() {

  const [rows, setRows] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [uploadOpen, setUploadOpen] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [classFilter, setClassFilter] =
    useState("ALL");

  const [sessionFilter, setSessionFilter] =
    useState("ALL");

  const [statusFilter, setStatusFilter] =
    useState("ALL");

  const [form, setForm] = useState({
    title: "",
    class_id: "",
    session_id: "",
    recording_url: "",
    duration_seconds: "3600",
    status: "PUBLISHED",
  });

  /* =========================================================
     LOAD
  ========================================================= */

  const loadRecordings = async () => {

    setLoading(true);

    try {

      // IMPORTANT:
      // Backend route is GET /recordings/institute
      const response = await API.get(
        "/recordings/institute"
      );

      const data = getRows(response);

      setRows(data);

    } catch (error) {

      console.error(
        "Load recordings error:",
        error
      );

      setRows([]);

      alert(
        error?.response?.data?.message ||
          "Unable to load recordings."
      );

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    loadRecordings();
  }, []);

  /* =========================================================
     FILTER OPTIONS
  ========================================================= */

  const classOptions = useMemo(() => {

    const values = rows
      .map((row) =>
        getClassName(row)
      )
      .filter(Boolean);

    return [
      ...new Set(values),
    ];

  }, [rows]);

  const sessionOptions = useMemo(() => {

    const values = rows
      .map((row) =>
        getSessionName(row)
      )
      .filter(Boolean);

    return [
      ...new Set(values),
    ];

  }, [rows]);

  /* =========================================================
     FILTER
  ========================================================= */

  const filteredRows = useMemo(() => {

    const keyword =
      search.trim().toLowerCase();

    return rows.filter((row) => {

      const title =
        getTitle(row).toLowerCase();

      const className =
        getClassName(row).toLowerCase();

      const sessionName =
        getSessionName(row).toLowerCase();

      const status =
        getStatus(row);

      const matchesSearch =
        !keyword ||
        title.includes(keyword) ||
        className.includes(keyword) ||
        sessionName.includes(keyword);

      const matchesClass =
        classFilter === "ALL" ||
        getClassName(row) ===
          classFilter;

      const matchesSession =
        sessionFilter === "ALL" ||
        getSessionName(row) ===
          sessionFilter;

      const matchesStatus =
        statusFilter === "ALL" ||
        status === statusFilter;

      return (
        matchesSearch &&
        matchesClass &&
        matchesSession &&
        matchesStatus
      );

    });

  }, [
    rows,
    search,
    classFilter,
    sessionFilter,
    statusFilter,
  ]);

  /* =========================================================
     FORM
  ========================================================= */

  const resetForm = () => {

    setForm({
      title: "",
      class_id: "",
      session_id: "",
      recording_url: "",
      duration_seconds: "3600",
      status: "PUBLISHED",
    });

  };

  const closeModal = () => {

    if (saving) return;

    setUploadOpen(false);
    resetForm();

  };

  const updateForm = (field, value) => {

    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

  };

  /* =========================================================
     SAVE
  ========================================================= */

  const saveRecording = async (event) => {

    event.preventDefault();

    if (!form.title.trim()) {
      alert(
        "Recording title is required."
      );
      return;
    }

    if (!form.class_id.trim()) {
      alert(
        "Class ID is required."
      );
      return;
    }

    if (!form.session_id.trim()) {
      alert(
        "Session ID is required."
      );
      return;
    }

    if (!form.recording_url.trim()) {
      alert(
        "Recording URL is required."
      );
      return;
    }

    setSaving(true);

    try {

      const payload = {
        title: form.title.trim(),

        class_id: Number(
          form.class_id
        ),

        session_id: Number(
          form.session_id
        ),

        recording_url:
          form.recording_url.trim(),

        duration_seconds:
          form.duration_seconds
            ? Number(
                form.duration_seconds
              )
            : 0,

        status: form.status,
      };

      /*
       * IMPORTANT:
       * This endpoint must exist in backend:
       *
       * POST /api/recordings/institute
       */

      await API.post(
        "/recordings/institute",
        payload
      );

      alert(
        "Recording added successfully."
      );

      setUploadOpen(false);
      resetForm();

      await loadRecordings();

    } catch (error) {

      console.error(
        "Save recording error:",
        error
      );

      alert(
        error?.response?.data?.message ||
          "Unable to save recording."
      );

    } finally {

      setSaving(false);

    }
  };

  /* =========================================================
     DELETE
  ========================================================= */

  const deleteRecording = async (
    recordingId
  ) => {

    try {

      await API.delete(
        `/recordings/institute/${recordingId}`
      );

      alert(
        "Recording deleted successfully."
      );

      await loadRecordings();

    } catch (error) {

      console.error(
        "Delete recording error:",
        error
      );

      alert(
        error?.response?.data?.message ||
          "Unable to delete recording."
      );
    }
  };

  /* =========================================================
     STATS
  ========================================================= */

  const total =
    rows.length;

  const published =
    rows.filter((row) => {
      const status = getStatus(row);

      return (
        status === "PUBLISHED" ||
        status === "READY"
      );
    }).length;

  const drafts =
    rows.filter(
      (row) =>
        getStatus(row) === "DRAFT"
    ).length;

  const completed =
    rows.filter(
      (row) =>
        Number(
          getDuration(row)
        ) > 0
    ).length;

  const hasFilters =
    search ||
    classFilter !== "ALL" ||
    sessionFilter !== "ALL" ||
    statusFilter !== "ALL";

  const clearFilters = () => {

    setSearch("");
    setClassFilter("ALL");
    setSessionFilter("ALL");
    setStatusFilter("ALL");

  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="min-h-full text-white space-y-6 pb-10">

      {/* HEADER */}

      <header className="flex flex-col md:flex-row md:items-center justify-between gap-5">

        <div>

          <h1 className="text-3xl md:text-4xl font-bold">
            Recordings
          </h1>

          <p className="text-white/45 mt-1.5">
            Manage recordings linked to
            your classes and sessions.
          </p>

        </div>

        <div className="flex items-center gap-3">

          <button
            type="button"
            onClick={loadRecordings}
            disabled={loading}
            className="px-4 py-3 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] flex items-center gap-2 disabled:opacity-50"
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

          <button
            type="button"
            onClick={() =>
              setUploadOpen(true)
            }
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 flex items-center gap-2 font-medium"
          >
            <UploadCloud size={18} />

            Upload Recording
          </button>

        </div>

      </header>

      {/* STATS */}

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        <StatCard
          title="Total Recordings"
          value={total}
        />

        <StatCard
          title="Published"
          value={published}
          valueClass="text-emerald-400"
        />

        <StatCard
          title="Drafts"
          value={drafts}
        />

        <StatCard
          title="Completed Sessions"
          value={completed}
          valueClass="text-purple-400"
        />

      </section>

      {/* FILTERS */}

      <section className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(280px,1fr)_180px_180px_180px] gap-3">

          {/* SEARCH */}

          <div className="relative">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search recordings by title, class or session..."
              className="w-full h-12 pl-11 pr-4 rounded-xl bg-black/20 border border-white/10 outline-none text-sm placeholder:text-white/25 focus:border-purple-500/40"
            />

          </div>

          <FilterSelect
            value={classFilter}
            onChange={setClassFilter}
            options={classOptions}
            allLabel="All Classes"
          />

          <FilterSelect
            value={sessionFilter}
            onChange={setSessionFilter}
            options={sessionOptions}
            allLabel="All Sessions"
          />

          <FilterSelect
            value={statusFilter}
            onChange={setStatusFilter}
            options={[
              "READY",
              "PUBLISHED",
              "DRAFT",
              "UNLISTED",
              "PROCESSING",
              "FAILED",
            ]}
            allLabel="All Status"
          />

        </div>

        {hasFilters && (
          <div className="flex justify-end mt-3">

            <button
              type="button"
              onClick={clearFilters}
              className="text-xs text-purple-300 hover:text-purple-200 flex items-center gap-1"
            >
              <X size={13} />

              Clear filters
            </button>

          </div>
        )}

      </section>

      {/* RESULTS */}

      {loading ? (

        <LoadingState />

      ) : filteredRows.length === 0 ? (

        <EmptyState
          hasFilters={Boolean(
            hasFilters
          )}
          onClear={clearFilters}
          onUpload={() =>
            setUploadOpen(true)
          }
        />

      ) : (

        <div className="space-y-3">

          {filteredRows.map(
            (recording, index) => (

              <RecordingCard
                key={
                  getId(recording) ??
                  `recording-${index}`
                }
                recording={recording}
                onDelete={
                  deleteRecording
                }
              />

            )
          )}

        </div>

      )}

      {/* =====================================================
          UPLOAD MODAL
      ===================================================== */}

      {uploadOpen && (

        <div className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">

          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#121119] shadow-2xl">

            {/* HEADER */}

            <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">

              <div className="flex items-center gap-4">

                <div className="w-11 h-11 rounded-xl bg-purple-500/15 flex items-center justify-center">

                  <UploadCloud
                    size={21}
                    className="text-purple-400"
                  />

                </div>

                <div>

                  <h2 className="text-xl font-semibold">
                    Upload Recording
                  </h2>

                  <p className="text-sm text-white/40 mt-1">
                    Add a recorded class or
                    session to your LMS.
                  </p>

                </div>

              </div>

              <button
                type="button"
                onClick={closeModal}
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center"
              >
                <X size={19} />
              </button>

            </div>

            {/* FORM */}

            <form
              onSubmit={saveRecording}
              className="p-6 space-y-5"
            >

              {/* TITLE */}

              <div>

                <label className="block text-sm font-medium text-white/75 mb-2">
                  Recording Title *
                </label>

                <input
                  value={form.title}
                  onChange={(e) =>
                    updateForm(
                      "title",
                      e.target.value
                    )
                  }
                  placeholder="Example: Introduction to Watercolor Techniques"
                  required
                  className="w-full h-12 px-4 rounded-xl bg-black/25 border border-white/10 outline-none focus:border-purple-500/50"
                />

              </div>

              {/* CLASS + SESSION */}

              <div className="grid md:grid-cols-2 gap-4">

                <div>

                  <label className="block text-sm font-medium text-white/75 mb-2">
                    Class ID *
                  </label>

                  <input
                    type="number"
                    min="1"
                    value={form.class_id}
                    onChange={(e) =>
                      updateForm(
                        "class_id",
                        e.target.value
                      )
                    }
                    placeholder="Example: 29"
                    required
                    className="w-full h-12 px-4 rounded-xl bg-black/25 border border-purple-500/20 outline-none focus:border-purple-500/60"
                  />

                  <p className="text-xs text-purple-300/60 mt-2">
                    Required to link the
                    recording to the class.
                  </p>

                </div>

                <div>

                  <label className="block text-sm font-medium text-white/75 mb-2">
                    Session ID *
                  </label>

                  <input
                    type="number"
                    min="1"
                    value={form.session_id}
                    onChange={(e) =>
                      updateForm(
                        "session_id",
                        e.target.value
                      )
                    }
                    placeholder="Example: 25"
                    required
                    className="w-full h-12 px-4 rounded-xl bg-black/25 border border-pink-500/20 outline-none focus:border-pink-500/60"
                  />

                  <p className="text-xs text-pink-300/60 mt-2">
                    Required to link the
                    recording to the session.
                  </p>

                </div>

              </div>

              {/* URL */}

              <div>

                <label className="block text-sm font-medium text-white/75 mb-2">
                  Recording URL *
                </label>

                <input
                  type="url"
                  value={form.recording_url}
                  onChange={(e) =>
                    updateForm(
                      "recording_url",
                      e.target.value
                    )
                  }
                  placeholder="https://www.youtube.com/watch?v=..."
                  required
                  className="w-full h-12 px-4 rounded-xl bg-black/25 border border-white/10 outline-none focus:border-purple-500/50"
                />

                <p className="text-xs text-white/30 mt-2">
                  YouTube, Vimeo, Cloudinary,
                  or another accessible recording URL.
                </p>

              </div>

              {/* DURATION + STATUS */}

              <div className="grid md:grid-cols-2 gap-4">

                <div>

                  <label className="block text-sm font-medium text-white/75 mb-2">
                    Duration (seconds)
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={
                      form.duration_seconds
                    }
                    onChange={(e) =>
                      updateForm(
                        "duration_seconds",
                        e.target.value
                      )
                    }
                    placeholder="3600"
                    className="w-full h-12 px-4 rounded-xl bg-black/25 border border-white/10 outline-none focus:border-purple-500/50"
                  />

                </div>

                <div>

                  <label className="block text-sm font-medium text-white/75 mb-2">
                    Status
                  </label>

                  <select
                    value={form.status}
                    onChange={(e) =>
                      updateForm(
                        "status",
                        e.target.value
                      )
                    }
                    className="w-full h-12 px-4 rounded-xl bg-black/25 border border-white/10 outline-none focus:border-purple-500/50"
                  >
                    <option value="DRAFT">
                      Draft
                    </option>

                    <option value="PUBLISHED">
                      Published
                    </option>

                    <option value="UNLISTED">
                      Unlisted
                    </option>
                  </select>

                </div>

              </div>

              {/* FOOTER */}

              <div className="pt-4 border-t border-white/10 flex justify-end gap-3">

                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="px-5 py-3 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 font-medium disabled:opacity-50 flex items-center gap-2"
                >

                  <UploadCloud size={17} />

                  {saving
                    ? "Saving..."
                    : "Save Recording"}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  title,
  value,
  valueClass = "",
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">

      <p className="text-sm text-white/40">
        {title}
      </p>

      <p
        className={`text-3xl font-bold mt-2 ${valueClass}`}
      >
        {value}
      </p>

    </div>
  );
}

/* =========================================================
   FILTER SELECT
========================================================= */

function FilterSelect({
  value,
  onChange,
  options,
  allLabel,
}) {
  return (
    <div className="relative">

      <select
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="appearance-none w-full h-12 pl-4 pr-10 rounded-xl bg-black/20 border border-white/10 outline-none text-sm text-white/80 focus:border-purple-500/40"
      >

        <option value="ALL">
          {allLabel}
        </option>

        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}

      </select>

      <ChevronDown
        size={16}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/30"
      />

    </div>
  );
}

/* =========================================================
   LOADING
========================================================= */

function LoadingState() {
  return (
    <div className="space-y-3">

      {[1, 2, 3].map(
        (item) => (
          <div
            key={item}
            className="h-[150px] rounded-2xl border border-white/10 bg-white/[0.025] animate-pulse"
          />
        )
      )}

    </div>
  );
}

/* =========================================================
   EMPTY
========================================================= */

function EmptyState({
  hasFilters,
  onClear,
  onUpload,
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.025] py-20 px-6 text-center">

      <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-500/10 flex items-center justify-center">

        <Film
          size={32}
          className="text-purple-400/70"
        />

      </div>

      <h3 className="mt-5 text-lg font-semibold">
        {hasFilters
          ? "No recordings found"
          : "No recordings available"}
      </h3>

      <p className="text-sm text-white/35 mt-2">
        {hasFilters
          ? "Try changing your search or filters."
          : "Upload a recording or sync recordings from a Zoom session."}
      </p>

      <div className="flex justify-center gap-3 mt-6">

        {hasFilters && (
          <button
            type="button"
            onClick={onClear}
            className="px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm"
          >
            Clear Filters
          </button>
        )}

        <button
          type="button"
          onClick={onUpload}
          className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-sm flex items-center gap-2"
        >
          <UploadCloud size={16} />
          Upload Recording
        </button>

      </div>

    </div>
  );
}