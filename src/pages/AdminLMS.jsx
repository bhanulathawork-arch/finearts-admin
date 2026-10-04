  


import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

import {
  ClipboardList,
  Edit3,
  Plus,
  Search,
  Trash2,
  UploadCloud,
  X,
  CalendarDays,
  Clock3,
  BookOpen,
  Award,
  FileText,
  RefreshCw,
  Loader2,
  ChevronRight,
   ArrowLeft,
} from "lucide-react";
/* =========================================================
   COLORS
========================================================= */

const COLORS = {
  bg: "#07080D",
  panel: "#10121A",
  panel2: "#15121F",
  border: "rgba(255,255,255,.10)",
  borderStrong: "rgba(180,70,255,.35)",

  purple: "#9B2CFF",
  pink: "#FF2AAE",
  purpleLight: "#C58BFF",

  text: "#FFFFFF",
  muted: "#AAA5B8",

  success: "#18D89D",
  successBg: "rgba(24,216,157,.12)",

  blue: "#4CA8FF",
  blueBg: "rgba(76,168,255,.13)",

  orange: "#FFB84D",
  orangeBg: "rgba(255,184,77,.13)",

  red: "#FF5C6C",
  redBg: "rgba(255,92,108,.12)",
};

/* =========================================================
   FORMS
========================================================= */

const EMPTY_DAY = {
  title: "",
  description: "",
  content: "",
  sort_order: 0,
  is_published: 0,
};

const EMPTY_LESSON = {
  title: "",
  description: "",
  lesson_type: "YOUTUBE",

  youtube_url: "",
  resource_url: "",
  content: "",

  duration_minutes: "",
  sort_order: 0,

  is_published: 0,
  is_preview: 0,
  is_locked: 0,
};

/* =========================================================
   HELPERS
========================================================= */

const getAdminConfig = () => {
  const token = localStorage.getItem("adminToken");

  return {
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {},
  };
};

const normalizeArray = (value) => {
  if (Array.isArray(value)) return value;

  if (Array.isArray(value?.data)) {
    return value.data;
  }

  if (Array.isArray(value?.rows)) {
    return value.rows;
  }

  return [];
};

const normalizeClasses = (payload) => {
  const root = payload?.data ?? payload ?? {};

  return normalizeArray(
    root?.classes ??
      root?.data?.classes ??
      root?.rows ??
      root?.data ??
      root
  );
};

const normalizeCurriculum = (payload) => {
  const root = payload?.data ?? payload ?? {};

  const course =
    root?.course ??
    root?.class ??
    root?.data?.course ??
    root?.data?.class ??
    null;

  const sections = normalizeArray(
    root?.sections ??
      root?.curriculum ??
      root?.data?.sections ??
      root?.data?.curriculum
  );

  return {
    course,
    sections: sections.map((day) => ({
      ...day,

      lessons: normalizeArray(
        day?.lessons ??
          day?.course_lessons ??
          day?.lms_lessons
      ),
    })),
  };
};

const normalizeLessonType = (value) => {
  const type = String(value || "").toUpperCase();

  if (
    type === "VIDEO" ||
    type === "DIRECT_VIDEO" ||
    type === "VID"
  ) {
    return "VIDEO";
  }

  if (type === "RECORDING") return "RECORDING";
  if (type === "YOUTUBE") return "YOUTUBE";
  if (type === "PDF") return "PDF";
  if (type === "TEXT") return "TEXT";
  if (type === "LIVE") return "LIVE";
  if (type === "EXTERNAL") return "EXTERNAL";

  return "YOUTUBE";
};

const isTrue = (value) => {
  return (
    Number(value) === 1 ||
    value === true ||
    String(value).toLowerCase() === "true"
  );
};

const isLessonLocked = (lesson) =>
  isTrue(
    lesson?.is_locked ??
      lesson?.locked ??
      lesson?.isLock ??
      lesson?.is_locked_for_students
  );

const getLessonDuration = (lesson) => {
  const value =
    lesson?.duration_minutes ??
    lesson?.duration ??
    lesson?.minutes;

  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return "-";
  }

  return `${value} min`;
};

const getLessonIcon = (type) => {
  switch (normalizeLessonType(type)) {
    case "VIDEO":
    case "RECORDING":
    case "YOUTUBE":
      return <Video size={16} />;

    case "PDF":
    case "TEXT":
      return <FileText size={16} />;

    case "LIVE":
      return <Radio size={16} />;

    case "EXTERNAL":
      return <ExternalLink size={16} />;

    default:
      return <BookOpen size={16} />;
  }
};

const getLessonStyle = (type) => {
  switch (normalizeLessonType(type)) {
    case "VIDEO":
    case "RECORDING":
    case "YOUTUBE":
      return {
        background: "rgba(255,55,90,.12)",
        color: "#FF5570",
      };

    case "PDF":
      return {
        background: "rgba(155,44,255,.14)",
        color: "#C27BFF",
      };

    case "TEXT":
      return {
        background: "rgba(67,145,255,.13)",
        color: "#65A9FF",
      };

    case "LIVE":
      return {
        background: "rgba(155,44,255,.16)",
        color: "#C27BFF",
      };

    case "EXTERNAL":
      return {
        background: "rgba(40,150,255,.12)",
        color: "#63B2FF",
      };

    default:
      return {
        background: "rgba(255,255,255,.08)",
        color: COLORS.muted,
      };
  }
};

const getLessonTypeName = (type) => {
  switch (normalizeLessonType(type)) {
    case "VIDEO":
      return "Video";
    case "RECORDING":
      return "Recording";
    case "YOUTUBE":
      return "YouTube";
    case "PDF":
      return "PDF";
    case "TEXT":
      return "Text";
    case "LIVE":
      return "Live";
    case "EXTERNAL":
      return "External";
    default:
      return "Lesson";
  }
};

const getClassTitle = (item) =>
  item?.title ||
  item?.name ||
  item?.class_name ||
  "Untitled Class";

/* =========================================================
   UI
========================================================= */

function Badge({ children, type = "success" }) {
  const styles =
    type === "success"
      ? {
          background: COLORS.successBg,
          color: COLORS.success,
        }
      : type === "blue"
      ? {
          background: COLORS.blueBg,
          color: COLORS.blue,
        }
      : type === "orange"
      ? {
          background: COLORS.orangeBg,
          color: COLORS.orange,
        }
      : {
          background: "rgba(255,255,255,.07)",
          color: COLORS.muted,
        };

  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold"
      style={styles}
    >
      {children}
    </span>
  );
}

function LessonTypeBadge({ type }) {
  const style = getLessonStyle(type);

  return (
    <span
      className="inline-flex min-w-[90px] items-center justify-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-semibold"
      style={style}
    >
      {getLessonIcon(type)}
      {getLessonTypeName(type)}
    </span>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div
      className="rounded-2xl border p-5"
      style={{
        borderColor: COLORS.border,
        background:
          "linear-gradient(145deg,rgba(155,44,255,.08),rgba(255,255,255,.015))",
      }}
    >
      <div
        className="text-xs font-semibold uppercase tracking-[.14em]"
        style={{ color: COLORS.muted }}
      >
        {label}
      </div>

      <div className="mt-3 flex items-end justify-between">
        <div className="text-3xl font-bold">
          {value}
        </div>

        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl"
          style={{
            background: "rgba(155,44,255,.14)",
            color: COLORS.purpleLight,
          }}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  required = false,
  optional = false,
  children,
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-gray-200">
        {label}

        {required && (
          <span className="ml-1 text-pink-400">
            *
          </span>
        )}

        {optional && (
          <span className="ml-1 text-xs font-normal text-gray-500">
            (Optional)
          </span>
        )}
      </span>

      {children}
    </label>
  );
}

function Toggle({
  label,
  helper,
  checked,
  onChange,
}) {
  return (
    <div
      className="flex min-h-[65px] items-center justify-between gap-4 rounded-xl border px-4 py-3"
      style={{
        borderColor: checked
          ? COLORS.borderStrong
          : COLORS.border,
        background: checked
          ? "rgba(155,44,255,.07)"
          : "#181820",
      }}
    >
      <div>
        <div className="text-sm font-semibold">
          {label}
        </div>

        {helper && (
          <div
            className="mt-1 text-xs"
            style={{ color: COLORS.muted }}
          >
            {helper}
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={() => onChange(!checked)}
        className="relative h-6 w-11 rounded-full"
        style={{
          background: checked
            ? COLORS.purple
            : "rgba(255,255,255,.14)",
        }}
      >
        <span
          className="absolute top-1 h-4 w-4 rounded-full bg-white transition-all"
          style={{
            left: checked ? 24 : 4,
          }}
        />
      </button>
    </div>
  );
}

function Modal({
  title,
  subtitle,
  children,
  onClose,
  wide = false,
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
      <div
        className={`w-full ${
          wide ? "max-w-3xl" : "max-w-xl"
        } max-h-[92vh] overflow-hidden rounded-3xl border`}
        style={{
          borderColor: COLORS.borderStrong,
          background: COLORS.panel,
        }}
      >
        <div
          className="flex items-center justify-between border-b px-6 py-5"
          style={{
            borderColor: COLORS.border,
          }}
        >
          <div>
            <h2 className="text-xl font-bold">
              {title}
            </h2>

            {subtitle && (
              <p
                className="mt-1 text-sm"
                style={{
                  color: COLORS.muted,
                }}
              >
                {subtitle}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-white/10"
          >
            <X size={19} />
          </button>
        </div>

        <div className="max-h-[calc(92vh-90px)] overflow-y-auto p-6">
          {children}
        </div>
      </div>
    </div>
  );
}

function Actions({
  saving,
  onCancel,
  label,
}) {
  return (
    <div
      className="flex justify-end gap-3 border-t pt-5"
      style={{
        borderColor: COLORS.border,
      }}
    >
      <button
        type="button"
        disabled={saving}
        onClick={onCancel}
        className="rounded-xl border px-5 py-2.5 text-sm font-semibold hover:bg-white/10 disabled:opacity-50"
        style={{
          borderColor: COLORS.border,
        }}
      >
        Cancel
      </button>

      <button
        type="submit"
        disabled={saving}
        className="inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-bold text-white disabled:opacity-50"
        style={{
          background: `linear-gradient(135deg,${COLORS.purple},${COLORS.pink})`,
        }}
      >
        {saving ? (
          <Loader2
            size={16}
            className="animate-spin"
          />
        ) : (
          <Save size={16} />
        )}

        {saving ? "Saving..." : label}
      </button>
    </div>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function AdminLMS() {
  const { classId } = useParams();
  const navigate = useNavigate();

  const [classes, setClasses] = useState([]);
  const [course, setCourse] = useState(null);
  const [days, setDays] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [openDays, setOpenDays] = useState({});

  const [dayModal, setDayModal] = useState(null);
  const [dayForm, setDayForm] = useState(
    EMPTY_DAY
  );

  const [lessonModal, setLessonModal] =
    useState(null);

  const [lessonForm, setLessonForm] = useState(
    EMPTY_LESSON
  );

  const [deleteModal, setDeleteModal] =
    useState(null);

  const [previewLesson, setPreviewLesson] =
    useState(null);

  /* =======================================================
     LOAD CLASSES
  ======================================================= */

  const loadClasses = async () => {
    setLoading(true);

    try {
      const response = await API.get(
        "/lms/admin/classes",
        getAdminConfig()
      );

      setClasses(
        normalizeClasses(response?.data)
      );
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to load classes"
      );

      setClasses([]);
    } finally {
      setLoading(false);
    }
  };

  /* =======================================================
     LOAD DAY-WISE CURRICULUM
  ======================================================= */

  const loadCurriculum = async () => {
    if (!classId) {
      await loadClasses();
      return;
    }

    setLoading(true);

    try {
      const response = await API.get(
        `/lms/admin/classes/${classId}/curriculum`,
        getAdminConfig()
      );

      const result = normalizeCurriculum(
        response?.data
      );

      setCourse(result.course);
      setDays(result.sections);

      setOpenDays((previous) => {
        const next = { ...previous };

        result.sections.forEach(
          (day, index) => {
            if (
              next[day.id] ===
              undefined
            ) {
              next[day.id] = index === 0;
            }
          }
        );

        return next;
      });
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to load LMS curriculum"
      );

      setCourse(null);
      setDays([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCurriculum();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classId]);

  /* =======================================================
     STATS
  ======================================================= */

  const totalLessons = useMemo(
    () =>
      days.reduce(
        (total, day) =>
          total +
          (day?.lessons?.length || 0),
        0
      ),
    [days]
  );

  const publishedLessons = useMemo(
    () =>
      days.reduce(
        (total, day) =>
          total +
          (day?.lessons || []).filter(
            (lesson) =>
              isTrue(lesson?.is_published)
          ).length,
        0
      ),
    [days]
  );

  const publishedDays = useMemo(
    () =>
      days.filter((day) =>
        isTrue(day?.is_published)
      ).length,
    [days]
  );

  const studentCount =
    course?.students_count ??
    course?.students ??
    course?.enrolled_students ??
    0;

  /* =======================================================
     DAY CRUD
  ======================================================= */

  const createDay = () => {
    setDayForm({
      ...EMPTY_DAY,

      title: `Day ${days.length + 1}`,

      sort_order: days.length,

      is_published: 0,
    });

    setDayModal({
      mode: "create",
    });
  };

  const editDay = (day) => {
    const index = days.findIndex(
      (item) => item.id === day.id
    );

    setDayForm({
      title: day?.title || "",
      description:
        day?.description || "",
      content:
        day?.content || "",
      sort_order:
        day?.sort_order ?? index,
      is_published: isTrue(
        day?.is_published
      )
        ? 1
        : 0,
    });

    setDayModal({
      mode: "edit",
      id: day.id,
    });
  };

  const saveDay = async (event) => {
    event.preventDefault();

    if (!dayForm.title.trim()) {
      toast.error("Day title is required");
      return;
    }

    setSaving(true);

    try {
      const payload = {
        title: dayForm.title.trim(),

        description:
          dayForm.description?.trim() ||
          null,

        content:
          dayForm.content?.trim() ||
          null,

        sort_order:
          Number(dayForm.sort_order) || 0,

        is_published:
          Number(dayForm.is_published)
            ? 1
            : 0,
      };

      if (dayModal.mode === "create") {
        await API.post(
          `/lms/admin/classes/${classId}/sections`,
          payload,
          getAdminConfig()
        );

        toast.success("Day created successfully");
      } else {
        await API.put(
          `/lms/admin/sections/${dayModal.id}`,
          payload,
          getAdminConfig()
        );

        toast.success("Day updated successfully");
      }

      setDayModal(null);

      await loadCurriculum();
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          "Unable to save day"
      );
    } finally {
      setSaving(false);
    }
  };

  /* =======================================================
     LESSON CREATE
  ======================================================= */

  const createLesson = (day) => {
    const dayIndex = days.findIndex(
      (item) => item.id === day.id
    );

    setLessonForm({
      ...EMPTY_LESSON,

      title: "",

      sort_order:
        day?.lessons?.length || 0,
    });

    setLessonModal({
      mode: "create",

      dayId: day.id,

      dayNumber: dayIndex + 1,

      dayTitle:
        day?.title ||
        `Day ${dayIndex + 1}`,
    });
  };

  /* =======================================================
     LESSON EDIT
  ======================================================= */

  const editLesson = (day, lesson) => {
    const dayIndex = days.findIndex(
      (item) => item.id === day.id
    );

    setLessonForm({
      title: lesson?.title || "",

      description:
        lesson?.description || "",

      lesson_type: normalizeLessonType(
        lesson?.lesson_type ||
          lesson?.type
      ),

      youtube_url:
        lesson?.youtube_url ||
        lesson?.Video_url ||
        lesson?.video_url ||
        "",

      resource_url:
        lesson?.resource_url ||
        lesson?.url ||
        "",

      content:
        lesson?.content || "",

      duration_minutes:
        lesson?.duration_minutes ??
        lesson?.duration ??
        "",

      sort_order:
        lesson?.sort_order ?? 0,

      is_published: isTrue(
        lesson?.is_published
      )
        ? 1
        : 0,

      is_preview: isTrue(
        lesson?.is_preview
      )
        ? 1
        : 0,

      is_locked: isLessonLocked(lesson)
        ? 1
        : 0,
    });

    setLessonModal({
      mode: "edit",

      id: lesson.id,

      dayId: day.id,

      dayNumber: dayIndex + 1,

      dayTitle:
        day?.title ||
        `Day ${dayIndex + 1}`,
    });
  };

  /* =======================================================
     LESSON SAVE
  ======================================================= */

  const saveLesson = async (event) => {
    event.preventDefault();

    if (!lessonForm.title.trim()) {
      toast.error("Lesson title is required");
      return;
    }

    const type = normalizeLessonType(
      lessonForm.lesson_type
    );

    const youtubeUrl =
      lessonForm.youtube_url?.trim() || "";

    const resourceUrl =
      lessonForm.resource_url?.trim() || "";

    const content =
      lessonForm.content?.trim() || "";

    if (
      type === "YOUTUBE" &&
      !youtubeUrl
    ) {
      toast.error(
        "YouTube URL is required"
      );
      return;
    }

    if (
      ["VIDEO", "PDF", "LIVE", "EXTERNAL"].includes(
        type
      ) &&
      !resourceUrl
    ) {
      toast.error(
        `${getLessonTypeName(
          type
        )} URL is required`
      );
      return;
    }

    if (
      type === "TEXT" &&
      !content
    ) {
      toast.error(
        "Lesson content is required"
      );
      return;
    }

    setSaving(true);

    try {
      const payload = {
        title: lessonForm.title.trim(),

        description:
          lessonForm.description?.trim() ||
          null,

        lesson_type: type,

        youtube_url:
          type === "YOUTUBE"
            ? youtubeUrl
            : null,

        resource_url: [
          "VIDEO",
          "PDF",
          "LIVE",
          "EXTERNAL",
        ].includes(type)
          ? resourceUrl
          : null,

        content:
          type === "TEXT"
            ? content
            : null,

        duration_minutes:
          lessonForm.duration_minutes ===
          ""
            ? null
            : Number(
                lessonForm.duration_minutes
              ),

        sort_order:
          Number(
            lessonForm.sort_order
          ) || 0,

        is_published:
          Number(
            lessonForm.is_published
          )
            ? 1
            : 0,

        is_preview:
          Number(
            lessonForm.is_preview
          )
            ? 1
            : 0,

        is_locked:
          Number(
            lessonForm.is_locked
          )
            ? 1
            : 0,
      };

      if (
        lessonModal.mode === "create"
      ) {
        await API.post(
          `/lms/admin/sections/${lessonModal.dayId}/lessons`,
          payload,
          getAdminConfig()
        );

        toast.success(
          `Lesson added to Day ${lessonModal.dayNumber}`
        );
      } else {
        await API.put(
          `/lms/admin/lessons/${lessonModal.id}`,
          payload,
          getAdminConfig()
        );

        toast.success(
          "Lesson updated successfully"
        );
      }

      setLessonModal(null);

      await loadCurriculum();
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          "Unable to save lesson"
      );
    } finally {
      setSaving(false);
    }
  };

  /* =======================================================
     LOCK / UNLOCK LESSON
  ======================================================= */

  const toggleLessonLock = async (lesson) => {
    if (!lesson?.id) return;

    const currentlyLocked = isLessonLocked(lesson);
    const nextLocked = !currentlyLocked;

    try {
      await API.put(
        `/lms/admin/lessons/${lesson.id}`,
        {
          is_locked: nextLocked ? 1 : 0,
        },
        getAdminConfig()
      );

      toast.success(
        nextLocked
          ? "Lesson locked successfully"
          : "Lesson unlocked successfully"
      );

      await loadCurriculum();
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message ||
          `Unable to ${nextLocked ? "lock" : "unlock"} lesson`
      );
    }
  };

  /* =======================================================
     DELETE DAY
  ======================================================= */

  const deleteDay = async () => {
    if (!deleteModal?.id) return;

    setDeleting(true);

    try {
      await API.delete(
        `/lms/admin/sections/${deleteModal.id}`,
        getAdminConfig()
      );

      toast.success(
        "Day deleted successfully"
      );

      setDeleteModal(null);

      await loadCurriculum();
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          "Unable to delete day"
      );
    } finally {
      setDeleting(false);
    }
  };

  /* =======================================================
     DELETE LESSON
  ======================================================= */

  const deleteLesson = async () => {
    if (!deleteModal?.id) return;

    setDeleting(true);

    try {
      await API.delete(
        `/lms/admin/lessons/${deleteModal.id}`,
        getAdminConfig()
      );

      toast.success(
        "Lesson deleted successfully"
      );

      setDeleteModal(null);

      await loadCurriculum();
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          "Unable to delete lesson"
      );
    } finally {
      setDeleting(false);
    }
  };

  /* =======================================================
     TOGGLE DAY
  ======================================================= */

  const toggleDay = (id) => {
    setOpenDays((previous) => ({
      ...previous,
      [id]: !previous[id],
    }));
  };

  /* =======================================================
     CLASS LIST
  ======================================================= */

  if (!classId) {
    return (
      <div
        className="min-h-screen p-6 text-white lg:p-8"
        style={{
          background: COLORS.bg,
        }}
      >
        <div className="mx-auto max-w-[1450px]">
          <div className="mb-8">
            <div
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.25em]"
              style={{
                color: COLORS.purpleLight,
              }}
            >
              <CalendarDays size={16} />
              Admin LMS
            </div>

            <h1 className="mt-3 text-4xl font-bold">
              Day-wise LMS
            </h1>

            <p
              className="mt-2 max-w-2xl text-sm leading-6"
              style={{
                color: COLORS.muted,
              }}
            >
              Select a class and create your
              LMS day by day. Each day can
              contain multiple lessons.
            </p>
          </div>

          {loading ? (
            <div className="rounded-3xl border p-20 text-center">
              <Loader2
                className="mx-auto animate-spin"
                size={40}
                color={COLORS.purpleLight}
              />

              <p
                className="mt-4 text-sm"
                style={{
                  color: COLORS.muted,
                }}
              >
                Loading classes...
              </p>
            </div>
          ) : classes.length === 0 ? (
            <div className="rounded-3xl border p-20 text-center">
              <BookOpen
                className="mx-auto"
                size={55}
                color={COLORS.purpleLight}
              />

              <h2 className="mt-5 text-xl font-bold">
                No classes found
              </h2>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {classes.map((item) => {
                const id =
                  item?.id ??
                  item?.class_id;

                const title =
                  getClassTitle(item);

                const image =
                  item?.image ||
                  item?.thumbnail ||
                  item?.banner_image ||
                  item?.class_image;

                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() =>
                      navigate(
                        `/admin/lms/${id}`
                      )
                    }
                    className="overflow-hidden rounded-2xl border text-left transition hover:-translate-y-1"
                    style={{
                      borderColor:
                        COLORS.border,
                      background:
                        COLORS.panel,
                    }}
                  >
                    <div
                      className="h-52 overflow-hidden"
                      style={{
                        background:
                          "linear-gradient(135deg,#241132,#10121A)",
                      }}
                    >
                      {image ? (
                        <img
                          src={image}
                          alt={title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <BookOpen
                            size={55}
                            color={
                              COLORS.purpleLight
                            }
                          />
                        </div>
                      )}
                    </div>

                    <div className="p-5">
                      <div className="flex items-center justify-between gap-3">
                        <h2 className="text-lg font-bold">
                          {title}
                        </h2>

                        <ChevronRight
                          color={
                            COLORS.purpleLight
                          }
                        />
                      </div>

                      <div
                        className="mt-4 grid grid-cols-3 border-t pt-4"
                        style={{
                          borderColor:
                            COLORS.border,
                        }}
                      >
                        <div>
                          <div
                            className="text-xs"
                            style={{
                              color:
                                COLORS.muted,
                            }}
                          >
                            Days
                          </div>

                          <div className="mt-1 font-bold">
                            {item?.sections ??
                              item?.section_count ??
                              0}
                          </div>
                        </div>

                        <div>
                          <div
                            className="text-xs"
                            style={{
                              color:
                                COLORS.muted,
                            }}
                          >
                            Lessons
                          </div>

                          <div className="mt-1 font-bold">
                            {item?.lessons ??
                              item?.lesson_count ??
                              0}
                          </div>
                        </div>

                        <div>
                          <div
                            className="text-xs"
                            style={{
                              color:
                                COLORS.muted,
                            }}
                          >
                            Students
                          </div>

                          <div className="mt-1 font-bold">
                            {item?.students ??
                              item?.students_count ??
                              0}
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  /* =======================================================
     DETAIL PAGE
  ======================================================= */

  return (
    <div
      className="min-h-screen p-5 text-white lg:p-7"
      style={{
        background: COLORS.bg,
      }}
    >
      <div className="mx-auto max-w-[1450px]">
        {/* HEADER */}

        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <button
              type="button"
              onClick={() =>
                navigate("/admin/lms")
              }
              className="mt-1 flex h-11 w-11 items-center justify-center rounded-xl border hover:bg-white/10"
              style={{
                borderColor:
                  COLORS.border,
              }}
            >
              <ArrowLeft size={19} />
            </button>

            <div>
              <div
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.25em]"
                style={{
                  color:
                    COLORS.purpleLight,
                }}
              >
                <CalendarDays
                  size={15}
                />
                Day-wise LMS
              </div>

              <h1 className="mt-2 text-3xl font-bold lg:text-4xl">
                {getClassTitle(course)}
              </h1>

              <p
                className="mt-2 text-sm"
                style={{
                  color: COLORS.muted,
                }}
              >
                Create and manage lessons
                day by day.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={createDay}
            className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white"
            style={{
              background: `linear-gradient(135deg,${COLORS.purple},${COLORS.pink})`,
            }}
          >
            <Plus size={18} />
            Add Day
          </button>
        </div>

        {/* SUMMARY */}

        <div
          className="mb-6 rounded-3xl border p-6"
          style={{
            borderColor:
              "rgba(155,44,255,.25)",
            background:
              "linear-gradient(135deg,rgba(35,14,51,.85),rgba(15,17,25,.95))",
          }}
        >
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <div>
              <span
                className="text-xs"
                style={{
                  color: COLORS.muted,
                }}
              >
                Days
              </span>

              <div className="mt-1 text-2xl font-bold">
                {days.length}
              </div>
            </div>

            <div>
              <span
                className="text-xs"
                style={{
                  color: COLORS.muted,
                }}
              >
                Lessons
              </span>

              <div className="mt-1 text-2xl font-bold">
                {totalLessons}
              </div>
            </div>

            <div>
              <span
                className="text-xs"
                style={{
                  color: COLORS.muted,
                }}
              >
                Published
              </span>

              <div className="mt-1 text-2xl font-bold">
                {publishedLessons}
              </div>
            </div>

            <div>
              <span
                className="text-xs"
                style={{
                  color: COLORS.muted,
                }}
              >
                Students
              </span>

              <div className="mt-1 text-2xl font-bold">
                {studentCount}
              </div>
            </div>
          </div>
        </div>

        {/* STATS */}

        <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard
            icon={<CalendarDays size={19} />}
            label="Total Days"
            value={days.length}
          />

          <StatCard
            icon={<BookOpen size={19} />}
            label="Total Lessons"
            value={totalLessons}
          />

          <StatCard
            icon={<CheckCircle2 size={19} />}
            label="Published Lessons"
            value={publishedLessons}
          />

          <StatCard
            icon={<Users size={19} />}
            label="Students"
            value={studentCount}
          />
        </div>

        {/* CONTENT */}

        {loading ? (
          <div className="rounded-3xl border p-20 text-center">
            <Loader2
              className="mx-auto animate-spin"
              size={40}
              color={COLORS.purpleLight}
            />

            <p
              className="mt-4 text-sm"
              style={{
                color: COLORS.muted,
              }}
            >
              Loading day-wise curriculum...
            </p>
          </div>
        ) : days.length === 0 ? (
          <div className="rounded-3xl border p-20 text-center">
            <CalendarDays
              className="mx-auto"
              size={55}
              color={COLORS.purpleLight}
            />

            <h2 className="mt-5 text-2xl font-bold">
              No days created yet
            </h2>

            <p
              className="mx-auto mt-2 max-w-xl text-sm leading-6"
              style={{
                color: COLORS.muted,
              }}
            >
              Start with Day 1. After
              creating a day, you can add
              unlimited lessons inside it.
            </p>

            <button
              type="button"
              onClick={createDay}
              className="mt-6 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white"
              style={{
                background: `linear-gradient(135deg,${COLORS.purple},${COLORS.pink})`,
              }}
            >
              <Plus size={17} />
              Create Day 1
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            {days.map((day, dayIndex) => {
              const dayNumber =
                dayIndex + 1;

              const dayId = day.id;

              const isOpen =
                openDays[dayId] !== false;

              const lessons =
                day.lessons || [];

              return (
                <div
                  key={dayId}
                  className="overflow-hidden rounded-2xl border"
                  style={{
                    borderColor:
                      COLORS.border,
                    background:
                      COLORS.panel,
                  }}
                >
                  {/* DAY HEADER */}

                  <div
                    className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between"
                    style={{
                      background:
                        "linear-gradient(90deg,rgba(155,44,255,.08),rgba(255,42,174,.03))",
                    }}
                  >
                    <div className="flex min-w-0 items-center gap-4">
                      <button
                        type="button"
                        onClick={() =>
                          toggleDay(dayId)
                        }
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl hover:bg-white/10"
                      >
                        {isOpen ? (
                          <ChevronDown
                            size={20}
                          />
                        ) : (
                          <ChevronRight
                            size={20}
                          />
                        )}
                      </button>

                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-500/15 text-purple-300">
                        <CalendarDays
                          size={22}
                        />
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-3">
                          <h2 className="text-xl font-bold">
                            Day {dayNumber}
                          </h2>

                          <Badge
                            type={
                              isTrue(
                                day.is_published
                              )
                                ? "success"
                                : "neutral"
                            }
                          >
                            {isTrue(
                              day.is_published
                            )
                              ? "Published"
                              : "Draft"}
                          </Badge>
                        </div>

                        <p
                          className="mt-1 truncate text-sm"
                          style={{
                            color:
                              COLORS.muted,
                          }}
                        >
                          {day.title ||
                            `Day ${dayNumber}`}
                        </p>

                        <div
                          className="mt-1 text-xs"
                          style={{
                            color:
                              COLORS.muted,
                          }}
                        >
                          {lessons.length}{" "}
                          {lessons.length === 1
                            ? "lesson"
                            : "lessons"}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end lg:self-auto">
                      <button
                        type="button"
                        onClick={() =>
                          editDay(day)
                        }
                        className="flex h-10 w-10 items-center justify-center rounded-xl hover:bg-white/10"
                      >
                        <Pencil
                          size={17}
                        />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setDeleteModal({
                            type: "day",
                            id: day.id,
                            title:
                              day.title ||
                              `Day ${dayNumber}`,
                            message:
                              "Deleting this day will also delete all lessons inside it.",
                          })
                        }
                        className="flex h-10 w-10 items-center justify-center rounded-xl hover:bg-red-500/10"
                        style={{
                          color: COLORS.red,
                        }}
                      >
                        <Trash2
                          size={17}
                        />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          createLesson(day)
                        }
                        className="ml-2 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-white"
                        style={{
                          background: `linear-gradient(135deg,${COLORS.purple},${COLORS.pink})`,
                        }}
                      >
                        <Plus size={16} />
                        Add Lesson
                      </button>
                    </div>
                  </div>

                  {/* LESSONS */}

                  {isOpen && (
                    <div
                      className="border-t"
                      style={{
                        borderColor:
                          COLORS.border,
                      }}
                    >
                      {lessons.length === 0 ? (
                        <div className="p-12 text-center">
                          <FileText
                            className="mx-auto"
                            size={35}
                            color={
                              COLORS.purpleLight
                            }
                          />

                          <p
                            className="mt-3 text-sm"
                            style={{
                              color:
                                COLORS.muted,
                            }}
                          >
                            No lessons added to
                            Day {dayNumber}.
                          </p>

                          <button
                            type="button"
                            onClick={() =>
                              createLesson(day)
                            }
                            className="mt-4 text-sm font-bold text-purple-300"
                          >
                            + Add first lesson
                          </button>
                        </div>
                      ) : (
                        <div>
                          {lessons.map(
                            (
                              lesson,
                              lessonIndex
                            ) => {
                              const published =
                                isTrue(
                                  lesson?.is_published
                                );

                              const preview =
                                isTrue(
                                  lesson?.is_preview
                                );

                              return (
                                <div
                                  key={
                                    lesson.id ??
                                    `${dayId}-${lessonIndex}`
                                  }
                                  className="grid items-center gap-4 border-b px-5 py-4 last:border-b-0 lg:grid-cols-[35px_minmax(260px,1fr)_120px_90px_150px]"
                                  style={{
                                    borderColor:
                                      COLORS.border,
                                  }}
                                >
                                  <div
                                    className="hidden justify-center lg:flex"
                                    style={{
                                      color:
                                        "#777281",
                                    }}
                                  >
                                    <GripVertical
                                      size={18}
                                    />
                                  </div>

                                  {/* LESSON INFO */}

                                  <div className="flex min-w-0 items-center gap-3">
                                    <div
                                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                                      style={{
                                        background:
                                          "rgba(155,44,255,.10)",
                                        color:
                                          COLORS.purpleLight,
                                      }}
                                    >
                                      {getLessonIcon(
                                        lesson?.lesson_type ||
                                          lesson?.type
                                      )}
                                    </div>

                                    <div className="min-w-0">
                                      <div className="flex flex-wrap items-center gap-2">
                                        <h3 className="truncate font-semibold">
                                          {lessonIndex +
                                            1}
                                          .{" "}
                                          {lesson?.title ||
                                            lesson?.name ||
                                            "Untitled Lesson"}
                                        </h3>

                                        {preview && (
                                          <Badge type="blue">
                                            <Eye
                                              size={11}
                                            />
                                            Preview
                                          </Badge>
                                        )}

                                        {isLessonLocked(lesson) && (
                                          <Badge type="orange">
                                            <Lock size={11} />
                                            Locked
                                          </Badge>
                                        )}
                                      </div>

                                      {lesson?.description && (
                                        <p
                                          className="mt-1 truncate text-xs"
                                          style={{
                                            color:
                                              COLORS.muted,
                                          }}
                                        >
                                          {
                                            lesson.description
                                          }
                                        </p>
                                      )}

                                      <div className="mt-2 flex flex-wrap gap-2 lg:hidden">
                                        <LessonTypeBadge
                                          type={
                                            lesson?.lesson_type ||
                                            lesson?.type
                                          }
                                        />

                                        <Badge
                                          type={
                                            published
                                              ? "success"
                                              : "neutral"
                                          }
                                        >
                                          {published
                                            ? "Published"
                                            : "Draft"}
                                        </Badge>
                                      </div>
                                    </div>
                                  </div>

                                  {/* TYPE */}

                                  <div className="hidden lg:block">
                                    <LessonTypeBadge
                                      type={
                                        lesson?.lesson_type ||
                                        lesson?.type
                                      }
                                    />
                                  </div>

                                  {/* DURATION */}

                                  <div
                                    className="hidden items-center gap-1 text-sm lg:flex"
                                    style={{
                                      color:
                                        COLORS.muted,
                                    }}
                                  >
                                    <Clock3
                                      size={14}
                                    />

                                    {getLessonDuration(
                                      lesson
                                    )}
                                  </div>

                                  {/* STATUS */}

                                  <div className="hidden items-center gap-2 lg:flex">
                                    <Badge
                                      type={
                                        published
                                          ? "success"
                                          : "neutral"
                                      }
                                    >
                                      {published
                                        ? "Published"
                                        : "Draft"}
                                    </Badge>

                                    {preview && (
                                      <Badge type="blue">
                                        Preview
                                      </Badge>
                                    )}

                                    {isLessonLocked(lesson) && (
                                      <Badge type="orange">
                                        <Lock size={11} />
                                        Locked
                                      </Badge>
                                    )}
                                  </div>

                                  {/* ACTIONS */}

                                  <div className="flex items-center justify-end gap-1">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setDeleteModal(
                                          {
                                            type: "lesson",
                                            id: lesson.id,
                                            title:
                                              lesson?.title ||
                                              "Lesson",
                                            message:
                                              "This lesson will be permanently deleted.",
                                          }
                                        )
                                      }
                                      className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-red-500/10"
                                      style={{
                                        color:
                                          COLORS.red,
                                      }}
                                    >
                                      <Trash2
                                        size={16}
                                      />
                                    </button>

                                    <button
                                      type="button"
                                      onClick={() =>
                                        toggleLessonLock(lesson)
                                      }
                                      className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-white/10"
                                      style={{
                                        color: isLessonLocked(lesson)
                                          ? COLORS.orange
                                          : COLORS.success,
                                      }}
                                      title={
                                        isLessonLocked(lesson)
                                          ? "Unlock lesson"
                                          : "Lock lesson"
                                      }
                                    >
                                      {isLessonLocked(lesson) ? (
                                        <LockOpen size={16} />
                                      ) : (
                                        <Lock size={16} />
                                      )}
                                    </button>

                                    <button
                                      type="button"
                                      onClick={() =>
                                        editLesson(
                                          day,
                                          lesson
                                        )
                                      }
                                      className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-white/10"
                                    >
                                      <Pencil
                                        size={16}
                                      />
                                    </button>

                                    <button
                                      type="button"
                                      onClick={() =>
                                        setPreviewLesson(
                                          lesson
                                        )
                                      }
                                      className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-white/10"
                                    >
                                      <Eye
                                        size={16}
                                      />
                                    </button>
                                  </div>
                                </div>
                              );
                            }
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* =====================================================
          CREATE / EDIT DAY
      ===================================================== */}

      {dayModal && (
        <Modal
          title={
            dayModal.mode === "create"
              ? "Create Day"
              : "Edit Day"
          }
          subtitle="Create one day and add multiple lessons inside it."
          onClose={() =>
            !saving && setDayModal(null)
          }
        >
          <form
            onSubmit={saveDay}
            className="space-y-5"
          >
            <Field
              label="Day title"
              required
            >
              <input
                autoFocus
                value={dayForm.title}
                onChange={(e) =>
                  setDayForm({
                    ...dayForm,
                    title:
                      e.target.value,
                  })
                }
                className="w-full rounded-xl border bg-[#181820] px-4 py-3 text-sm text-white outline-none"
                style={{
                  borderColor:
                    COLORS.border,
                }}
                placeholder="Day 1 - Introduction"
              />
            </Field>

            <Field
              label="Description"
              optional
            >
              <textarea
                value={
                  dayForm.description
                }
                onChange={(e) =>
                  setDayForm({
                    ...dayForm,
                    description:
                      e.target.value,
                  })
                }
                rows={4}
                className="w-full resize-none rounded-xl border bg-[#181820] px-4 py-3 text-sm text-white outline-none"
                style={{
                  borderColor:
                    COLORS.border,
                }}
                placeholder="What will students learn on this day?"
              />
            </Field>

            <Field
              label="Day Content"
              optional
            >
              <textarea
                value={dayForm.content}
                onChange={(e) =>
                  setDayForm({
                    ...dayForm,
                    content: e.target.value,
                  })
                }
                rows={6}
                className="w-full resize-none rounded-xl border bg-[#181820] px-4 py-3 text-sm text-white outline-none"
                style={{
                  borderColor: COLORS.border,
                }}
                placeholder="Add the content or learning material for this day..."
              />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Day order">
                <input
                  type="number"
                  min="0"
                  value={
                    dayForm.sort_order
                  }
                  onChange={(e) =>
                    setDayForm({
                      ...dayForm,
                      sort_order:
                        e.target.value,
                    })
                  }
                  className="w-full rounded-xl border bg-[#181820] px-4 py-3 text-sm text-white outline-none"
                  style={{
                    borderColor:
                      COLORS.border,
                  }}
                />
              </Field>

              <Toggle
                label="Published"
                helper="Visible to enrolled students"
                checked={
                  Number(
                    dayForm.is_published
                  ) === 1
                }
                onChange={(value) =>
                  setDayForm({
                    ...dayForm,
                    is_published:
                      value ? 1 : 0,
                  })
                }
              />
            </div>

            <Actions
              saving={saving}
              onCancel={() =>
                setDayModal(null)
              }
              label={
                dayModal.mode === "create"
                  ? "Save Day"
                  : "Update Day"
              }
            />
          </form>
        </Modal>
      )}

      {/* =====================================================
          CREATE / EDIT LESSON
      ===================================================== */}

      {lessonModal && (
        <Modal
          wide
          title={
            lessonModal.mode === "create"
              ? `Add Lesson — Day ${lessonModal.dayNumber}`
              : `Edit Lesson — Day ${lessonModal.dayNumber}`
          }
          subtitle={
            lessonModal.dayTitle
          }
          onClose={() =>
            !saving &&
            setLessonModal(null)
          }
        >
          <form
            onSubmit={saveLesson}
            className="space-y-5"
          >
            {/* DAY INDICATOR */}

            <div
              className="flex items-center gap-3 rounded-xl border p-4"
              style={{
                borderColor:
                  COLORS.borderStrong,
                background:
                  "rgba(155,44,255,.07)",
              }}
            >
              <CalendarDays
                size={20}
                color={
                  COLORS.purpleLight
                }
              />

              <div>
                <div className="text-xs uppercase tracking-wider text-purple-300">
                  Current Day
                </div>

                <div className="mt-1 font-bold">
                  Day{" "}
                  {lessonModal.dayNumber}
                  {" — "}
                  {lessonModal.dayTitle}
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Field
                label="Lesson title"
                required
              >
                <input
                  autoFocus
                  value={
                    lessonForm.title
                  }
                  onChange={(e) =>
                    setLessonForm({
                      ...lessonForm,
                      title:
                        e.target.value,
                    })
                  }
                  className="w-full rounded-xl border bg-[#181820] px-4 py-3 text-sm text-white outline-none"
                  style={{
                    borderColor:
                      COLORS.border,
                  }}
                  placeholder="Lesson 1 - Introduction"
                />
              </Field>

              <Field label="Lesson type">
                <select
                  value={
                    lessonForm.lesson_type
                  }
                  onChange={(e) =>
                    setLessonForm({
                      ...lessonForm,
                      lesson_type:
                        e.target.value,
                    })
                  }
                  className="w-full rounded-xl border bg-[#181820] px-4 py-3 text-sm text-white outline-none"
                  style={{
                    borderColor:
                      COLORS.border,
                  }}
                >
                  <option value="YOUTUBE">
                    YouTube
                  </option>

                  <option value="VIDEO">
                    Video
                  </option>

                  <option value="RECORDING">
                    Recording
                  </option>

                  <option value="PDF">
                    PDF
                  </option>

                  <option value="TEXT">
                    Text
                  </option>

                  <option value="LIVE">
                    Live
                  </option>

                  <option value="EXTERNAL">
                    External
                  </option>
                </select>
              </Field>
            </div>

            <Field
              label="Description"
              optional
            >
              <textarea
                value={
                  lessonForm.description
                }
                onChange={(e) =>
                  setLessonForm({
                    ...lessonForm,
                    description:
                      e.target.value,
                  })
                }
                rows={3}
                className="w-full resize-none rounded-xl border bg-[#181820] px-4 py-3 text-sm text-white outline-none"
                style={{
                  borderColor:
                    COLORS.border,
                }}
                placeholder="What will students learn in this lesson?"
              />
            </Field>

            {/* YOUTUBE */}

            {lessonForm.lesson_type ===
              "YOUTUBE" && (
              <Field
                label="YouTube URL"
                required
              >
                <input
                  type="url"
                  value={
                    lessonForm.youtube_url
                  }
                  onChange={(e) =>
                    setLessonForm({
                      ...lessonForm,
                      youtube_url:
                        e.target.value,
                    })
                  }
                  className="w-full rounded-xl border bg-[#181820] px-4 py-3 text-sm text-white outline-none"
                  style={{
                    borderColor:
                      COLORS.border,
                  }}
                  placeholder="https://www.youtube.com/watch?v=..."
                />
              </Field>
            )}

            {/* VIDEO / RECORDING */}

            {[
              "VIDEO",
              "RECORDING",
            ].includes(
              lessonForm.lesson_type
            ) && (
              <Field
                label={
                  lessonForm.lesson_type ===
                  "RECORDING"
                    ? "Recording URL"
                    : "Video URL"
                }
                required
              >
                <input
                  type="url"
                  value={
                    lessonForm.resource_url
                  }
                  onChange={(e) =>
                    setLessonForm({
                      ...lessonForm,
                      resource_url:
                        e.target.value,
                    })
                  }
                  className="w-full rounded-xl border bg-[#181820] px-4 py-3 text-sm text-white outline-none"
                  style={{
                    borderColor:
                      COLORS.border,
                  }}
                  placeholder="https://..."
                />
              </Field>
            )}

            {/* PDF */}

            {lessonForm.lesson_type ===
              "PDF" && (
              <Field
                label="PDF URL"
                required
              >
                <input
                  type="url"
                  value={
                    lessonForm.resource_url
                  }
                  onChange={(e) =>
                    setLessonForm({
                      ...lessonForm,
                      resource_url:
                        e.target.value,
                    })
                  }
                  className="w-full rounded-xl border bg-[#181820] px-4 py-3 text-sm text-white outline-none"
                  style={{
                    borderColor:
                      COLORS.border,
                  }}
                  placeholder="https://..."
                />
              </Field>
            )}

            {/* TEXT */}

            {lessonForm.lesson_type ===
              "TEXT" && (
              <Field
                label="Lesson content"
                required
              >
                <textarea
                  value={
                    lessonForm.content
                  }
                  onChange={(e) =>
                    setLessonForm({
                      ...lessonForm,
                      content:
                        e.target.value,
                    })
                  }
                  rows={9}
                  className="w-full resize-y rounded-xl border bg-[#181820] px-4 py-3 text-sm leading-6 text-white outline-none"
                  style={{
                    borderColor:
                      COLORS.border,
                  }}
                  placeholder="Write the lesson content..."
                />
              </Field>
            )}

            {/* LIVE */}

            {lessonForm.lesson_type ===
              "LIVE" && (
              <Field
                label="Live meeting URL"
                required
              >
                <input
                  type="url"
                  value={
                    lessonForm.resource_url
                  }
                  onChange={(e) =>
                    setLessonForm({
                      ...lessonForm,
                      resource_url:
                        e.target.value,
                    })
                  }
                  className="w-full rounded-xl border bg-[#181820] px-4 py-3 text-sm text-white outline-none"
                  style={{
                    borderColor:
                      COLORS.border,
                  }}
                  placeholder="Zoom / Google Meet URL"
                />
              </Field>
            )}

            {/* EXTERNAL */}

            {lessonForm.lesson_type ===
              "EXTERNAL" && (
              <Field
                label="External URL"
                required
              >
                <input
                  type="url"
                  value={
                    lessonForm.resource_url
                  }
                  onChange={(e) =>
                    setLessonForm({
                      ...lessonForm,
                      resource_url:
                        e.target.value,
                    })
                  }
                  className="w-full rounded-xl border bg-[#181820] px-4 py-3 text-sm text-white outline-none"
                  style={{
                    borderColor:
                      COLORS.border,
                  }}
                  placeholder="https://..."
                />
              </Field>
            )}

            <div className="grid gap-4 md:grid-cols-3">
              <Field label="Duration (minutes)">
                <input
                  type="number"
                  min="0"
                  value={
                    lessonForm.duration_minutes
                  }
                  onChange={(e) =>
                    setLessonForm({
                      ...lessonForm,
                      duration_minutes:
                        e.target.value,
                    })
                  }
                  className="w-full rounded-xl border bg-[#181820] px-4 py-3 text-sm text-white outline-none"
                  style={{
                    borderColor:
                      COLORS.border,
                  }}
                  placeholder="Optional"
                />
              </Field>

              <Field label="Lesson order">
                <input
                  type="number"
                  min="0"
                  value={
                    lessonForm.sort_order
                  }
                  onChange={(e) =>
                    setLessonForm({
                      ...lessonForm,
                      sort_order:
                        e.target.value,
                    })
                  }
                  className="w-full rounded-xl border bg-[#181820] px-4 py-3 text-sm text-white outline-none"
                  style={{
                    borderColor:
                      COLORS.border,
                  }}
                />
              </Field>

              <div className="space-y-3">
                <Toggle
                  label="Published"
                  helper="Visible to enrolled students"
                  checked={
                    Number(
                      lessonForm.is_published
                    ) === 1
                  }
                  onChange={(value) =>
                    setLessonForm({
                      ...lessonForm,
                      is_published:
                        value ? 1 : 0,
                    })
                  }
                />

                <Toggle
                  label="Student Preview"
                  helper="Available before enrollment"
                  checked={
                    Number(
                      lessonForm.is_preview
                    ) === 1
                  }
                  onChange={(value) =>
                    setLessonForm({
                      ...lessonForm,
                      is_preview:
                        value ? 1 : 0,
                    })
                  }
                />

                <Toggle
                  label="Lock Lesson"
                  helper="Locked lessons cannot be opened by students"
                  checked={
                    Number(
                      lessonForm.is_locked
                    ) === 1
                  }
                  onChange={(value) =>
                    setLessonForm({
                      ...lessonForm,
                      is_locked:
                        value ? 1 : 0,
                    })
                  }
                />
              </div>
            </div>

            <Actions
              saving={saving}
              onCancel={() =>
                setLessonModal(null)
              }
              label={
                lessonModal.mode === "create"
                  ? "Save Lesson"
                  : "Update Lesson"
              }
            />
          </form>
        </Modal>
      )}

      {/* =====================================================
          DELETE CONFIRM
      ===================================================== */}

      {deleteModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <div
            className="w-full max-w-md rounded-2xl border p-6"
            style={{
              borderColor: COLORS.border,
              background: COLORS.panel,
            }}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-400">
              <Trash2 size={22} />
            </div>

            <h2 className="mt-5 text-xl font-bold">
              Delete{" "}
              {deleteModal.type ===
              "day"
                ? "Day"
                : "Lesson"}
              ?
            </h2>

            <p
              className="mt-2 text-sm leading-6"
              style={{
                color: COLORS.muted,
              }}
            >
              {deleteModal.message}
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                disabled={deleting}
                onClick={() =>
                  setDeleteModal(null)
                }
                className="rounded-xl border px-5 py-2.5 text-sm font-semibold hover:bg-white/10"
                style={{
                  borderColor:
                    COLORS.border,
                }}
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={deleting}
                onClick={
                  deleteModal.type ===
                  "day"
                    ? deleteDay
                    : deleteLesson
                }
                className="inline-flex items-center gap-2 rounded-xl bg-red-500 px-5 py-2.5 text-sm font-bold text-white disabled:opacity-50"
              >
                {deleting && (
                  <Loader2
                    size={16}
                    className="animate-spin"
                  />
                )}

                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          PREVIEW
      ===================================================== */}

      {typeof previewLesson !==
        "undefined" &&
        previewLesson && (
          <LessonPreview
            lesson={previewLesson}
            onClose={() =>
              setPreviewLesson(null)
            }
          />
        )}
    </div>
  );
}

/* =========================================================
   LESSON PREVIEW
========================================================= */

function LessonPreview({
  lesson,
  onClose,
}) {
  const type = normalizeLessonType(
    lesson?.lesson_type ||
      lesson?.type
  );

  const youtube =
    lesson?.youtube_url ||
    lesson?.video_url ||
    "";

  const resource =
    lesson?.resource_url ||
    lesson?.url ||
    "";

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div
        className="w-full max-w-4xl overflow-hidden rounded-3xl border"
        style={{
          borderColor:
            COLORS.borderStrong,
          background: COLORS.panel,
        }}
      >
        <div className="flex items-center justify-between border-b p-5">
          <div>
            <h2 className="text-xl font-bold">
              {lesson?.title ||
                "Lesson Preview"}
            </h2>

            <p
              className="mt-1 text-sm"
              style={{
                color: COLORS.muted,
              }}
            >
              {getLessonTypeName(type)}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-white/10"
          >
            <X size={19} />
          </button>
        </div>

        <div className="p-6">
          {type === "YOUTUBE" &&
          youtube ? (
            <iframe
              src={convertYoutubeUrl(
                youtube
              )}
              title={
                lesson?.title ||
                "YouTube lesson"
              }
              className="aspect-video w-full rounded-2xl"
              allowFullScreen
            />
          ) : type === "VIDEO" ||
            type === "RECORDING" ? (
            resource ? (
              <video
                controls
                src={resource}
                className="max-h-[65vh] w-full rounded-2xl bg-black"
              />
            ) : (
              <EmptyPreview />
            )
          ) : type === "TEXT" ? (
            <div
              className="whitespace-pre-wrap rounded-2xl p-6 text-sm leading-7"
              style={{
                background:
                  COLORS.panel2,
              }}
            >
              {lesson?.content ||
                "No content"}
            </div>
          ) : resource ? (
            <div className="text-center">
              <ExternalLink
                className="mx-auto"
                size={42}
                color={
                  COLORS.purpleLight
                }
              />

              <a
                href={resource}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-xl px-5 py-3 font-bold text-white"
                style={{
                  background: `linear-gradient(135deg,${COLORS.purple},${COLORS.pink})`,
                }}
              >
                Open Resource
              </a>
            </div>
          ) : (
            <EmptyPreview />
          )}
        </div>
      </div>
    </div>
  );
}

function EmptyPreview() {
  return (
    <div className="rounded-2xl border p-12 text-center">
      <PlayCircle
        className="mx-auto"
        size={45}
        color={COLORS.purpleLight}
      />

      <p
        className="mt-4 text-sm"
        style={{
          color: COLORS.muted,
        }}
      >
        No preview content available.
      </p>
    </div>
  );
}

function convertYoutubeUrl(url) {
  try {
    const parsed = new URL(url);

    if (
      parsed.hostname.includes(
        "youtu.be"
      )
    ) {
      const id =
        parsed.pathname.replace(
          "/",
          ""
        );

      return `https://www.youtube.com/embed/${id}`;
    }

    if (
      parsed.hostname.includes(
        "youtube.com"
      )
    ) {
      const id =
        parsed.searchParams.get("v");

      if (id) {
        return `https://www.youtube.com/embed/${id}`;
      }
    }

    return url;
  } catch {
    return url;
  }
}



