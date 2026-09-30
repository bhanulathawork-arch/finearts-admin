import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Bell,
  BookOpen,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock3,
  Download,
  FileText,
  Home,
  Menu,
  MessageSquare,
  Play,
  PlayCircle,
  Upload,
  User,
  Video,
  X,
  PenLine,
  ClipboardList,
  CreditCard,
  UserRound,
  LogOut,
  File,
  ExternalLink,
  Loader2,
} from "lucide-react";

import API from "../../services/api";

/* =========================================================
   CONSTANTS
========================================================= */

const LMS_BASE =
  "/institute/website/preview/lms";

const DEFAULT_PRIMARY =
  "#087CFF";

const DEFAULT_SECONDARY =
  "#5427FF";

/* =========================================================
   HELPERS
========================================================= */

const firstValue = (...values) => {
  return values.find(
    value =>
      value !== undefined &&
      value !== null &&
      String(value).trim() !== ""
  );
};

const getLmsPayload = response => {
  const body = response?.data;

  if (
    body?.data &&
    typeof body.data === "object"
  ) {
    return body.data;
  }

  return body || {};
};

const getApiError = error => {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    "Unable to load course data."
  );
};

const getImage = item => {
  return firstValue(
    item?.image,
    item?.image_url,
    item?.class_image,
    item?.course_image,
    item?.thumbnail,
    item?.thumbnail_url,
    ""
  );
};

const getTrainerImage = trainer => {
  return firstValue(
    trainer?.profile_image,
    trainer?.image,
    trainer?.photoURL,
    trainer?.avatar,
    ""
  );
};

const getTrainerName = course => {
  if (
    course?.trainer &&
    typeof course.trainer ===
      "object"
  ) {
    return firstValue(
      course.trainer?.name,
      course.trainer?.full_name,
      "Trainer"
    );
  }

  return firstValue(
    course?.trainer_name,
    course?.trainer_full_name,
    course?.instructor_name,
    course?.teacher_name,
    "Trainer"
  );
};

const getCourseDuration = course => {
  const days = firstValue(
    course?.duration_days,
    course?.durationDays
  );

  if (days) {
    return `${days} Days`;
  }

  const weeks = firstValue(
    course?.duration_weeks,
    course?.weeks
  );

  if (weeks) {
    return `${weeks} Weeks`;
  }

  const duration = firstValue(
    course?.duration,
    course?.course_duration
  );

  if (duration) {
    return String(duration);
  }

  return "Flexible";
};

const formatDate = value => {
  if (!value) {
    return "Not available";
  }

  const date = new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return String(value);
  }

  return date.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
};

const formatMinutes = value => {
  const minutes =
    Number(value);

  if (
    !Number.isFinite(
      minutes
    ) ||
    minutes <= 0
  ) {
    return "";
  }

  const hours =
    Math.floor(minutes / 60);

  const mins =
    minutes % 60;

  if (hours > 0) {
    return `${hours}h ${
      mins > 0 ? `${mins}m` : ""
    }`;
  }

  return `${mins}m`;
};

const getLessonType = lesson => {
  return String(
    firstValue(
      lesson?.lesson_type,
      lesson?.lessonType,
      lesson?.type,
      "VIDEO"
    )
  ).toUpperCase();
};

const getLessonTitle = lesson => {
  return firstValue(
    lesson?.title,
    lesson?.name,
    "Untitled Lesson"
  );
};

const getLessonDescription = lesson => {
  return firstValue(
    lesson?.description,
    lesson?.content,
    "No lesson description available."
  );
};

const getLessonDuration = lesson => {
  return formatMinutes(
    firstValue(
      lesson?.duration_minutes,
      lesson?.durationMinutes,
      lesson?.duration
    )
  );
};

const getLessonResource = lesson => {
  return firstValue(
    lesson?.resource_url,
    lesson?.resourceUrl,
    ""
  );
};

const getLessonYoutube = lesson => {
  return firstValue(
    lesson?.youtube_url,
    lesson?.youtubeUrl,
    ""
  );
};

const getLessonContent = lesson => {
  return firstValue(
    lesson?.content,
    ""
  );
};

const getLessonProgress = lesson => {
  return Number(
    firstValue(
      lesson?.progress?.percentage,
      lesson?.progress_percentage,
      0
    )
  ) || 0;
};

const isLessonCompleted = lesson => {
  const status = String(
    firstValue(
      lesson?.progress?.status,
      lesson?.progress_status,
      ""
    )
  ).toUpperCase();

  return (
    status === "COMPLETED" ||
    getLessonProgress(
      lesson
    ) >= 100
  );
};

const getAllLessons = sections => {
  return sections.flatMap(
    section =>
      Array.isArray(
        section?.lessons
      )
        ? section.lessons
        : []
  );
};

const getYoutubeEmbedUrl = url => {
  if (!url) {
    return "";
  }

  try {
    const parsed =
      new URL(url);

    if (
      parsed.hostname.includes(
        "youtube.com"
      )
    ) {
      const videoId =
        parsed.searchParams.get(
          "v"
        );

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }

      if (
        parsed.pathname.includes(
          "/embed/"
        )
      ) {
        return url;
      }
    }

    if (
      parsed.hostname ===
      "youtu.be"
    ) {
      const id =
        parsed.pathname.replace(
          "/",
          ""
        );

      if (id) {
        return `https://www.youtube.com/embed/${id}`;
      }
    }
  } catch {
    return "";
  }

  return "";
};

const getFileName = url => {
  if (!url) {
    return "Resource";
  }

  try {
    const parsed =
      new URL(url);

    const parts =
      parsed.pathname.split(
        "/"
      );

    return decodeURIComponent(
      parts[parts.length - 1] ||
        "Resource"
    );
  } catch {
    return "Resource";
  }
};

/* =========================================================
   NAV ITEM
========================================================= */

function SidebarItem({
  icon,
  label,
  active,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex w-full items-center
        gap-4 rounded-xl px-4 py-3.5
        text-left transition-all
        ${
          active
            ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-[0_0_25px_rgba(0,110,255,.28)]"
            : "text-white/75 hover:bg-white/[0.04] hover:text-white"
        }
      `}
    >
      <span
        className={`
          flex w-6 justify-center
          text-lg
          ${
            active
              ? "text-white"
              : "text-white/80"
          }
        `}
      >
        {icon}
      </span>

      <span className="text-sm font-medium">
        {label}
      </span>
    </button>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function WebsiteLearningCourse() {
  const navigate =
    useNavigate();

  const { classId } =
    useParams();

  const [course, setCourse] =
    useState(null);

  const [sections, setSections] =
    useState([]);

  const [overallProgress, setOverallProgress] =
    useState({
      totalLessons: 0,
      completedLessons: 0,
      percentage: 0,
    });

  const [activeLesson, setActiveLesson] =
    useState(null);

  const [openSections, setOpenSections] =
    useState({});

  const [activeTab, setActiveTab] =
    useState("overview");

  const [notes, setNotes] =
    useState("");

  const [comments, setComments] =
    useState("");

  const [savedNotes, setSavedNotes] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [savingProgress, setSavingProgress] =
    useState(false);

  const [mobileSidebar, setMobileSidebar] =
    useState(false);

  const [selectedFile, setSelectedFile] =
    useState(null);

  /* =======================================================
     STUDENT
  ======================================================= */

  const [student, setStudent] =
    useState(null);

  useEffect(() => {
    try {
      const raw =
        localStorage.getItem(
          "studentUser"
        );

      if (raw) {
        setStudent(
          JSON.parse(raw)
        );
      }
    } catch {
      setStudent(null);
    }
  }, []);

  const studentName =
    firstValue(
      student?.name,
      student?.full_name,
      student?.displayName,
      "Student"
    );

  const studentImage =
    firstValue(
      student?.profile_image,
      student?.photoURL,
      student?.student_photo,
      ""
    );

  /* =======================================================
     LOAD NOTES
  ======================================================= */

  useEffect(() => {
    if (!classId) {
      return;
    }

    try {
      const raw =
        localStorage.getItem(
          `finearts-course-notes-${classId}`
        );

      if (raw) {
        setSavedNotes(
          JSON.parse(raw)
        );
      }
    } catch {
      setSavedNotes([]);
    }
  }, [classId]);

  /* =======================================================
     LOAD COURSE
  ======================================================= */

  const loadCourse =
    async () => {
      if (!classId) {
        setError(
          "Class ID is missing."
        );

        setLoading(false);

        return;
      }

      setLoading(true);
      setError("");

      try {
        /*
         * Existing FineArts LMS endpoint:
         *
         * GET /api/lms/student/courses/:classId
         */

        const response =
          await API.get(
            `/lms/student/courses/${classId}`
          );

        const payload =
          getLmsPayload(
            response
          );

        const backendCourse =
          payload?.course ||
          payload?.class ||
          null;

        const backendSections =
          Array.isArray(
            payload?.sections
          )
            ? payload.sections
            : [];

        const backendProgress =
          payload?.progress ||
          {};

        if (!backendCourse) {
          throw new Error(
            "Course data was not returned by the backend."
          );
        }

        setCourse(
          backendCourse
        );

        setSections(
          backendSections
        );

        setOverallProgress({
          totalLessons:
            Number(
              backendProgress?.totalLessons ||
                0
            ),
          completedLessons:
            Number(
              backendProgress?.completedLessons ||
                0
            ),
          percentage:
            Number(
              backendProgress?.percentage ||
                0
            ),
        });

        /*
         * Open first section.
         */

        if (
          backendSections.length
        ) {
          const firstSection =
            backendSections[0];

          setOpenSections({
            [firstSection.id]:
              true,
          });
        }

        /*
         * Select first incomplete
         * lesson.
         */

        const allLessons =
          getAllLessons(
            backendSections
          );

        const firstIncomplete =
          allLessons.find(
            lesson =>
              !isLessonCompleted(
                lesson
              )
          );

        setActiveLesson(
          firstIncomplete ||
            allLessons[0] ||
            null
        );
      } catch (err) {
        console.error(
          "Learning course error:",
          err
        );

        setError(
          getApiError(err)
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    loadCourse();
  }, [classId]);

  /* =======================================================
     CURRENT LESSON INDEX
  ======================================================= */

  const allLessons = useMemo(
    () =>
      getAllLessons(
        sections
      ),
    [sections]
  );

  const activeLessonIndex =
    useMemo(() => {
      if (!activeLesson) {
        return -1;
      }

      return allLessons.findIndex(
        lesson =>
          Number(
            lesson.id
          ) ===
          Number(
            activeLesson.id
          )
      );
    }, [
      allLessons,
      activeLesson,
    ]);

  const previousLesson =
    activeLessonIndex > 0
      ? allLessons[
          activeLessonIndex - 1
        ]
      : null;

  const nextLesson =
    activeLessonIndex >= 0 &&
    activeLessonIndex <
      allLessons.length - 1
      ? allLessons[
          activeLessonIndex + 1
        ]
      : null;

  /* =======================================================
     SECTION PROGRESS
  ======================================================= */

  const getSectionProgress =
    section => {
      const lessons =
        Array.isArray(
          section?.lessons
        )
          ? section.lessons
          : [];

      const completed =
        lessons.filter(
          isLessonCompleted
        ).length;

      return {
        total:
          lessons.length,
        completed,
      };
    };

  /* =======================================================
     SELECT LESSON
  ======================================================= */

  const selectLesson =
    lesson => {
      if (!lesson) {
        return;
      }

      setActiveLesson(
        lesson
      );

      setActiveTab(
        "overview"
      );

      const section =
        sections.find(
          item =>
            Array.isArray(
              item?.lessons
            ) &&
            item.lessons.some(
              current =>
                Number(
                  current.id
                ) ===
                Number(
                  lesson.id
                )
            )
        );

      if (section) {
        setOpenSections(
          previous => ({
            ...previous,
            [section.id]:
              true,
          })
        );
      }

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

  /* =======================================================
     UPDATE PROGRESS
  ======================================================= */

  const markLessonComplete =
    async () => {
      if (
        !activeLesson?.id
      ) {
        return;
      }

      setSavingProgress(
        true
      );

      try {
        /*
         * Existing backend endpoint:
         *
         * PATCH
         * /api/lms/student/lessons/:lessonId/progress
         */

        await API.patch(
          `/lms/student/lessons/${activeLesson.id}/progress`,
          {
            status:
              "COMPLETED",
            progress_percentage:
              100,
          }
        );

        /*
         * Refresh from backend so
         * course progress and all
         * lesson statuses remain
         * synchronized.
         */

        await loadCourse();
      } catch (err) {
        console.error(
          "Progress update error:",
          err
        );

        setError(
          getApiError(err)
        );
      } finally {
        setSavingProgress(
          false
        );
      }
    };

  /* =======================================================
     SAVE VIDEO PROGRESS
  ======================================================= */

  const updateLessonProgress =
    async percentage => {
      if (
        !activeLesson?.id
      ) {
        return;
      }

      try {
        await API.patch(
          `/lms/student/lessons/${activeLesson.id}/progress`,
          {
            status:
              percentage >= 100
                ? "COMPLETED"
                : "IN_PROGRESS",
            progress_percentage:
              Math.min(
                100,
                Math.max(
                  0,
                  Math.round(
                    percentage
                  )
                )
              ),
          }
        );
      } catch (err) {
        console.error(
          "Lesson progress error:",
          err
        );
      }
    };

  /* =======================================================
     SAVE NOTES
  ======================================================= */

  const saveNote =
    () => {
      const value =
        notes.trim();

      if (!value) {
        return;
      }

      const item = {
        id:
          Date.now(),
        lessonId:
          activeLesson?.id,
        lessonTitle:
          getLessonTitle(
            activeLesson
          ),
        text: value,
        createdAt:
          new Date().toISOString(),
      };

      const updated = [
        ...savedNotes,
        item,
      ];

      setSavedNotes(
        updated
      );

      setNotes("");

      try {
        localStorage.setItem(
          `finearts-course-notes-${classId}`,
          JSON.stringify(
            updated
          )
        );
      } catch {
        // Ignore localStorage errors.
      }
    };

  /* =======================================================
     SAVE COMMENT
  ======================================================= */

  const submitComment =
    () => {
      const value =
        comments.trim();

      if (!value) {
        return;
      }

      /*
       * There is currently no
       * comments API in the supplied
       * LMS service, so comments are
       * kept as local UI data here.
       */

      setComments("");
    };

  /* =======================================================
     FILE SELECTION
  ======================================================= */

  const handleAssignmentFile =
    event => {
      const file =
        event.target.files?.[0];

      if (file) {
        setSelectedFile(
          file
        );
      }
    };

  /* =======================================================
     NAVIGATION
  ======================================================= */

  const goToLesson =
    lesson => {
      if (!lesson) {
        return;
      }

      selectLesson(
        lesson
      );
    };

  const goBack =
    () => {
      navigate(
        `${LMS_BASE}/my-learning`
      );
    };

  /* =======================================================
     SIDEBAR NAVIGATION
  ======================================================= */

  const go =
    path => {
      setMobileSidebar(
        false
      );

      navigate(path);
    };

  /* =======================================================
     COURSE DATA
  ======================================================= */

  const trainerName =
    getTrainerName(
      course || {}
    );

  const trainer =
    course?.trainer &&
    typeof course.trainer ===
      "object"
      ? course.trainer
      : {
          name:
            trainerName,
          profile_image:
            course?.trainer_image,
        };

  const courseImage =
    getImage(
      course || {}
    );

  const courseTitle =
    firstValue(
      course?.title,
      course?.class_title,
      course?.name,
      course?.class_name,
      "Course"
    );

  const level =
    firstValue(
      course?.level,
      course?.difficulty,
      course?.class_level,
      "Beginner"
    );

  const duration =
    getCourseDuration(
      course || {}
    );

  const enrolledOn =
    firstValue(
      course?.enrolled_on,
      course?.enrolled_at,
      course?.booking_created_at
    );

  const activeLessonType =
    getLessonType(
      activeLesson || {}
    );

  const activeLessonDuration =
    getLessonDuration(
      activeLesson || {}
    );

  /* =======================================================
     RENDER LOADING
  ======================================================= */

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#020914] text-white">
        <div className="text-center">
          <Loader2
            size={42}
            className="mx-auto animate-spin text-blue-500"
          />

          <p className="mt-4 text-sm text-white/60">
            Loading your course...
          </p>
        </div>
      </div>
    );
  }

  /* =======================================================
     RENDER ERROR
  ======================================================= */

  if (error && !course) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#020914] px-6 text-white">
        <div className="max-w-md rounded-2xl border border-red-500/20 bg-red-500/[0.05] p-8 text-center">
          <h2 className="text-xl font-bold">
            Unable to load course
          </h2>

          <p className="mt-3 text-sm text-red-300">
            {error}
          </p>

          <div className="mt-5 flex justify-center gap-3">
            <button
              type="button"
              onClick={
                loadCourse
              }
              className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold"
            >
              Try Again
            </button>

            <button
              type="button"
              onClick={
                goBack
              }
              className="rounded-xl border border-white/10 px-5 py-2.5 text-sm font-semibold"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* =======================================================
     MAIN UI
  ======================================================= */

  return (
    <div className="min-h-screen bg-[#020914] text-white">
      {/* =================================================
          MOBILE OVERLAY
      ================================================= */}

      {mobileSidebar && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={() =>
            setMobileSidebar(
              false
            )
          }
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* =================================================
          SIDEBAR
      ================================================= */}

      <aside
        className={`
          fixed left-0 top-0 z-50
          flex h-screen w-[270px]
          flex-col
          border-r border-white/[0.07]
          bg-[#020B18]
          transition-transform duration-300
          ${
            mobileSidebar
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* LOGO */}

        <div className="flex h-[92px] items-center border-b border-white/[0.06] px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-blue-400/40 bg-blue-500/10 text-lg font-black text-blue-400">
              FA
            </div>

            <div>
              <h1 className="text-[25px] font-bold">
                Fine
                <span className="text-blue-400">
                  Arts
                </span>
              </h1>

              <p className="text-xs text-white/50">
                Student LMS
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              setMobileSidebar(
                false
              )
            }
            className="ml-auto lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* NAV */}

        <nav className="flex-1 overflow-y-auto px-4 py-5">
          <div className="space-y-1.5">
            <SidebarItem
              icon={<Home size={20} />}
              label="Dashboard"
              onClick={() =>
                go(
                  `${LMS_BASE}/dashboard`
                )
              }
            />

            <SidebarItem
              icon={
                <BookOpen
                  size={20}
                />
              }
              label="My Learning"
              active
              onClick={() =>
                go(
                  `${LMS_BASE}/my-learning`
                )
              }
            />

            <SidebarItem
              icon={
                <Video size={20} />
              }
              label="Live Sessions"
              onClick={() =>
                go(
                  `${LMS_BASE}/live-sessions`
                )
              }
            />

            <SidebarItem
              icon={
                <PlayCircle
                  size={20}
                />
              }
              label="Recordings"
              onClick={() =>
                go(
                  `${LMS_BASE}/recordings`
                )
              }
            />

            <SidebarItem
              icon={
                <CalendarDays
                  size={20}
                />
              }
              label="My Bookings"
              onClick={() =>
                go(
                  `${LMS_BASE}/my-bookings`
                )
              }
            />

            <SidebarItem
              icon={
                <FileText
                  size={20}
                />
              }
              label="Assignments"
              onClick={() =>
                go(
                  `${LMS_BASE}/assignments`
                )
              }
            />

            <SidebarItem
              icon={
                <CalendarDays
                  size={20}
                />
              }
              label="Attendance"
              onClick={() =>
                go(
                  `${LMS_BASE}/attendance`
                )
              }
            />

            <SidebarItem
              icon={
                <CreditCard
                  size={20}
                />
              }
              label="Payment Details"
              onClick={() =>
                go(
                  `${LMS_BASE}/payment-details`
                )
              }
            />

            <SidebarItem
              icon={
                <User
                  size={20}
                />
              }
              label="Profile"
              onClick={() =>
                go(
                  `${LMS_BASE}/profile`
                )
              }
            />
          </div>
        </nav>

        {/* BOTTOM BRANDING */}

        <div className="border-t border-white/[0.05] px-7 py-7">
          <div className="font-serif text-xl italic leading-8 text-blue-300/90">
            <div>Art</div>
            <div>Builds</div>
            <div>A Better</div>
            <div>You”</div>
          </div>

          <div className="mt-4 h-1 w-9 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
        </div>
      </aside>

      {/* =================================================
          MAIN
      ================================================= */}

      <div className="lg:pl-[270px]">
        {/* =================================================
            TOP HEADER
        ================================================= */}

        <header className="sticky top-0 z-30 h-[82px] border-b border-white/[0.07] bg-[#020914]/90 backdrop-blur-xl">
          <div className="flex h-full items-center gap-4 px-4 sm:px-6 lg:px-8">
            <button
              type="button"
              onClick={() =>
                setMobileSidebar(
                  true
                )
              }
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] lg:hidden"
            >
              <Menu size={20} />
            </button>

            {/* SEARCH */}

            <div className="relative max-w-[520px] flex-1">
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <BookOpen
                  size={19}
                  className="text-white/50"
                />
              </div>

              <input
                type="text"
                placeholder="Search courses, classes, recordings or topics..."
                className="h-12 w-full rounded-xl border border-blue-500/20 bg-[#061426] pl-11 pr-4 text-sm text-white outline-none placeholder:text-white/35 focus:border-blue-500/50"
              />
            </div>

            {/* RIGHT */}

            <div className="ml-auto flex items-center gap-3">
              <button
                type="button"
                className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.025]"
              >
                <Bell
                  size={20}
                />

                <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold">
                  3
                </span>
              </button>

              <button
                type="button"
                onClick={() =>
                  go(
                    `${LMS_BASE}/profile`
                  )
                }
                className="flex items-center gap-3 border-l border-white/[0.08] pl-4"
              >
                <div className="h-10 w-10 overflow-hidden rounded-full border border-white/10 bg-blue-500/10">
                  {studentImage ? (
                    <img
                      src={
                        studentImage
                      }
                      alt={
                        studentName
                      }
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <UserRound
                        size={19}
                        className="text-blue-400"
                      />
                    </div>
                  )}
                </div>

                <div className="hidden text-left sm:block">
                  <p className="max-w-[140px] truncate text-sm font-semibold">
                    {
                      studentName
                    }
                  </p>

                  <p className="text-xs text-white/45">
                    Student
                  </p>
                </div>

                <ChevronDown
                  size={17}
                  className="hidden text-white/60 sm:block"
                />
              </button>
            </div>
          </div>
        </header>

        {/* =================================================
            PAGE
        ================================================= */}

        <main className="mx-auto w-full max-w-[1500px] px-4 py-5 sm:px-6 lg:px-8">
          {/* =================================================
              BREADCRUMB
          ================================================= */}

          <div className="mb-3 flex items-center gap-2 text-sm">
            <button
              type="button"
              onClick={
                goBack
              }
              className="text-blue-300 hover:text-blue-200"
            >
              My Learning
            </button>

            <ChevronRight
              size={15}
              className="text-white/35"
            />

            <span className="line-clamp-1 text-white/70">
              {
                courseTitle
              }
            </span>
          </div>

          {/* =================================================
              COURSE HEADER
          ================================================= */}

          <section className="rounded-2xl border border-blue-500/20 bg-[#031120] p-4 sm:p-5">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-center">
              {/* IMAGE */}

              <div className="h-[110px] w-full flex-shrink-0 overflow-hidden rounded-xl border border-blue-500/20 bg-[#061426] sm:w-[230px]">
                {courseImage ? (
                  <img
                    src={
                      courseImage
                    }
                    alt={
                      courseTitle
                    }
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <BookOpen
                      size={48}
                      className="text-blue-400/60"
                    />
                  </div>
                )}
              </div>

              {/* INFO */}

              <div className="min-w-0 flex-1">
                <h1 className="text-2xl font-black leading-tight sm:text-3xl">
                  {
                    courseTitle
                  }
                </h1>

                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-white/75">
                  {/* TRAINER */}

                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 overflow-hidden rounded-full bg-blue-500/10">
                      {getTrainerImage(
                        trainer
                      ) ? (
                        <img
                          src={getTrainerImage(
                            trainer
                          )}
                          alt={
                            trainerName
                          }
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <UserRound
                            size={16}
                            className="text-blue-400"
                          />
                        </div>
                      )}
                    </div>

                    <span>
                      Trainer:{" "}
                      <strong className="text-white">
                        {
                          trainerName
                        }
                      </strong>
                    </span>
                  </div>

                  {/* LEVEL */}

                  <div className="flex items-center gap-2">
                    <BarChart3
                      size={19}
                      className="text-blue-400"
                    />

                    <span>
                      Level:{" "}
                      <strong className="text-white">
                        {
                          level
                        }
                      </strong>
                    </span>
                  </div>

                  {/* DURATION */}

                  <div className="flex items-center gap-2">
                    <CalendarDays
                      size={18}
                      className="text-blue-400"
                    />

                    <span>
                      Duration:{" "}
                      <strong className="text-white">
                        {
                          duration
                        }
                      </strong>
                    </span>
                  </div>

                  {/* ENROLLED */}

                  <div className="flex items-center gap-2">
                    <CalendarDays
                      size={18}
                      className="text-blue-400"
                    />

                    <span>
                      Enrolled on:{" "}
                      <strong className="text-white">
                        {formatDate(
                          enrolledOn
                        )}
                      </strong>
                    </span>
                  </div>
                </div>
              </div>

              {/* OVERALL PROGRESS */}

              <div className="w-full xl:w-[245px]">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-semibold text-white/80">
                    Overall Course Progress
                  </span>

                  <span className="text-lg font-bold text-white">
                    {
                      overallProgress.percentage
                    }%
                  </span>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-white/[0.08]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-600 to-purple-500 transition-all duration-700"
                    style={{
                      width: `${Math.min(
                        100,
                        overallProgress.percentage ||
                          0
                      )}%`,
                    }}
                  />
                </div>

                <p className="mt-2 text-right text-xs text-white/45">
                  {
                    overallProgress.completedLessons
                  }{" "}
                  of{" "}
                  {
                    overallProgress.totalLessons
                  }{" "}
                  lessons completed
                </p>
              </div>
            </div>
          </section>

          {/* =================================================
              MAIN LMS GRID
          ================================================= */}

          <div className="mt-4 grid grid-cols-1 gap-5 xl:grid-cols-[365px_minmax(0,1fr)]">
            {/* =================================================
                COURSE CONTENT
            ================================================= */}

            <aside className="h-fit overflow-hidden rounded-2xl border border-blue-500/20 bg-[#031120] xl:sticky xl:top-[100px]">
              <div className="flex items-center justify-between border-b border-white/[0.08] px-4 py-4">
                <h2 className="text-xl font-bold">
                  Course Content
                </h2>

                <span className="text-sm font-semibold text-blue-400">
                  {
                    overallProgress.totalLessons
                  }{" "}
                  Lessons
                </span>
              </div>

              <div className="max-h-[650px] overflow-y-auto">
                {sections.length ===
                0 ? (
                  <div className="p-6 text-center text-sm text-white/45">
                    No course content
                    available.
                  </div>
                ) : (
                  sections.map(
                    (
                      section,
                      sectionIndex
                    ) => {
                      const progress =
                        getSectionProgress(
                          section
                        );

                      const isOpen =
                        Boolean(
                          openSections[
                            section.id
                          ]
                        );

                      return (
                        <div
                          key={
                            section.id ||
                            sectionIndex
                          }
                          className="border-b border-white/[0.07]"
                        >
                          {/* SECTION HEADER */}

                          <button
                            type="button"
                            onClick={() =>
                              setOpenSections(
                                previous => ({
                                  ...previous,
                                  [section.id]:
                                    !previous[
                                      section.id
                                    ],
                                })
                              )
                            }
                            className="flex w-full items-center gap-3 px-4 py-4 text-left transition hover:bg-white/[0.025]"
                          >
                            {isOpen ? (
                              <ChevronDown
                                size={
                                  17
                                }
                                className="text-blue-400"
                              />
                            ) : (
                              <ChevronRight
                                size={
                                  17
                                }
                                className="text-white/55"
                              />
                            )}

                            <span className="min-w-0 flex-1 text-sm font-bold">
                              {`${
                                sectionIndex +
                                1
                              }. ${
                                firstValue(
                                  section?.title,
                                  section?.name,
                                  "Section"
                                )
                              }`}
                            </span>

                            <span className="text-xs text-white/55">
                              {
                                progress.completed
                              }
                              /
                              {
                                progress.total
                              }
                            </span>
                          </button>

                          {/* LESSONS */}

                          {isOpen &&
                            Array.isArray(
                              section?.lessons
                            ) && (
                              <div className="pb-2">
                                {section.lessons.map(
                                  (
                                    lesson,
                                    lessonIndex
                                  ) => {
                                    const selected =
                                      Number(
                                        activeLesson?.id
                                      ) ===
                                      Number(
                                        lesson.id
                                      );

                                    const completed =
                                      isLessonCompleted(
                                        lesson
                                      );

                                    const type =
                                      getLessonType(
                                        lesson
                                      );

                                    const duration =
                                      getLessonDuration(
                                        lesson
                                      );

                                    return (
                                      <button
                                        type="button"
                                        key={
                                          lesson.id ||
                                          lessonIndex
                                        }
                                        onClick={() =>
                                          selectLesson(
                                            lesson
                                          )
                                        }
                                        className={`
                                          flex w-full
                                          items-start
                                          gap-3
                                          px-4 py-3
                                          text-left
                                          transition
                                          ${
                                            selected
                                              ? "bg-gradient-to-r from-blue-600/30 to-purple-600/20 shadow-[inset_3px_0_0_#087CFF]"
                                              : "hover:bg-white/[0.025]"
                                          }
                                        `}
                                      >
                                        {/* ICON */}

                                        <div
                                          className={`
                                            mt-0.5
                                            flex h-7
                                            w-7
                                            flex-shrink-0
                                            items-center
                                            justify-center
                                            rounded-full
                                            ${
                                              completed
                                                ? "bg-emerald-400 text-[#02110b]"
                                                : selected
                                                ? "border-2 border-blue-400 text-blue-400"
                                                : "border border-white/15 text-white/40"
                                            }
                                          `}
                                        >
                                          {completed ? (
                                            <Check
                                              size={
                                                15
                                              }
                                            />
                                          ) : selected ? (
                                            <Play
                                              size={
                                                12
                                              }
                                              fill="currentColor"
                                            />
                                          ) : (
                                            <span className="text-[10px]">
                                              {lessonIndex +
                                                1}
                                            </span>
                                          )}
                                        </div>

                                        {/* INFO */}

                                        <div className="min-w-0 flex-1">
                                          <p
                                            className={`
                                              text-sm
                                              font-medium
                                              ${
                                                selected
                                                  ? "text-white"
                                                  : "text-white/85"
                                              }
                                            `}
                                          >
                                            {`${sectionIndex + 1}.${lessonIndex + 1} ${getLessonTitle(
                                              lesson
                                            )}`}
                                          </p>

                                          <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-white/45">
                                            <span>
                                              {type ===
                                              "VIDEO"
                                                ? "Video"
                                                : type ===
                                                  "YOUTUBE"
                                                ? "YouTube"
                                                : type ===
                                                  "PDF"
                                                ? "PDF"
                                                : type ===
                                                  "LIVE"
                                                ? "Live"
                                                : type}
                                            </span>

                                            {duration && (
                                              <>
                                                <span>
                                                  •
                                                </span>

                                                <span>
                                                  {
                                                    duration
                                                  }
                                                </span>
                                              </>
                                            )}
                                          </div>
                                        </div>

                                        {selected && (
                                          <ChevronRight
                                            size={
                                              16
                                            }
                                            className="mt-1 text-blue-400"
                                          />
                                        )}
                                      </button>
                                    );
                                  }
                                )}
                              </div>
                            )}
                        </div>
                      );
                    }
                  )
                )}
              </div>
            </aside>

            {/* =================================================
                RIGHT SIDE
            ================================================= */}

            <section className="min-w-0">
              {/* =================================================
                  VIDEO / CONTENT PLAYER
              ================================================= */}

              <div className="overflow-hidden rounded-2xl border border-blue-500/25 bg-[#031120]">
                <LessonViewer
                  lesson={
                    activeLesson
                  }
                  courseTitle={
                    courseTitle
                  }
                  onComplete={
                    markLessonComplete
                  }
                  onProgress={
                    updateLessonProgress
                  }
                />
              </div>

              {/* =================================================
                  TABS
              ================================================= */}

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <LessonTab
                  active={
                    activeTab ===
                    "overview"
                  }
                  icon={
                    <BookOpen
                      size={
                        17
                      }
                    />
                  }
                  label="Overview"
                  onClick={() =>
                    setActiveTab(
                      "overview"
                    )
                  }
                />

                <LessonTab
                  active={
                    activeTab ===
                    "notes"
                  }
                  icon={
                    <FileText
                      size={
                        17
                      }
                    />
                  }
                  label="Notes"
                  onClick={() =>
                    setActiveTab(
                      "notes"
                    )
                  }
                />

                <LessonTab
                  active={
                    activeTab ===
                    "comments"
                  }
                  icon={
                    <MessageSquare
                      size={
                        17
                      }
                    />
                  }
                  label="Comments"
                  onClick={() =>
                    setActiveTab(
                      "comments"
                    )
                  }
                />

                <button
                  type="button"
                  onClick={() =>
                    setActiveTab(
                      "notes"
                    )
                  }
                  className="ml-auto flex items-center gap-2 rounded-xl border border-blue-500/20 bg-[#031120] px-4 py-3 text-sm font-semibold text-white/80 transition hover:border-blue-500/40 hover:text-white"
                >
                  <PenLine
                    size={
                      17
                    }
                    className="text-blue-400"
                  />

                  Take Notes
                </button>
              </div>

              {/* =================================================
                  TAB CONTENT
              ================================================= */}

              {activeTab ===
                "overview" && (
                <OverviewPanel
                  lesson={
                    activeLesson
                  }
                  level={
                    level
                  }
                  duration={
                    activeLessonDuration
                  }
                  lessonType={
                    activeLessonType
                  }
                  selectedFile={
                    selectedFile
                  }
                  onFileSelect={
                    handleAssignmentFile
                  }
                />
              )}

              {activeTab ===
                "notes" && (
                <NotesPanel
                  notes={
                    notes
                  }
                  setNotes={
                    setNotes
                  }
                  saveNote={
                    saveNote
                  }
                  savedNotes={
                    savedNotes.filter(
                      note =>
                        Number(
                          note.lessonId
                        ) ===
                        Number(
                          activeLesson?.id
                        )
                    )
                  }
                />
              )}

              {activeTab ===
                "comments" && (
                <CommentsPanel
                  comments={
                    comments
                  }
                  setComments={
                    setComments
                  }
                  submitComment={
                    submitComment
                  }
                />
              )}

              {/* =================================================
                  BOTTOM CONTROLS
              ================================================= */}

              <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
                <button
                  type="button"
                  disabled={
                    !previousLesson
                  }
                  onClick={() =>
                    goToLesson(
                      previousLesson
                    )
                  }
                  className="flex items-center justify-center gap-2 rounded-xl border border-blue-500/50 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-500/10 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <ArrowLeft
                    size={
                      17
                    }
                  />

                  Previous Lesson
                </button>

                <button
                  type="button"
                  disabled={
                    savingProgress ||
                    isLessonCompleted(
                      activeLesson ||
                        {}
                    )
                  }
                  onClick={
                    markLessonComplete
                  }
                  className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-400 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {savingProgress ? (
                    <Loader2
                      size={
                        17
                      }
                      className="animate-spin"
                    />
                  ) : (
                    <Check
                      size={
                        17
                      }
                    />
                  )}

                  {isLessonCompleted(
                    activeLesson ||
                      {}
                  )
                    ? "Completed"
                    : "Mark as Complete"}
                </button>

                <button
                  type="button"
                  disabled={
                    !nextLesson
                  }
                  onClick={() =>
                    goToLesson(
                      nextLesson
                    )
                  }
                  className="flex items-center justify-center gap-2 rounded-xl border border-blue-500/50 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-500/10 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  Next Lesson

                  <ArrowRight
                    size={
                      17
                    }
                  />
                </button>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

/* =========================================================
   LESSON VIEWER
========================================================= */

function LessonViewer({
  lesson,
  courseTitle,
  onComplete,
  onProgress,
}) {
  const [playing, setPlaying] =
    useState(false);

  if (!lesson) {
    return (
      <div className="flex min-h-[390px] items-center justify-center">
        <div className="text-center text-white/45">
          <BookOpen
            size={50}
            className="mx-auto mb-4 text-blue-400/50"
          />

          <p>
            Select a lesson
            to begin learning.
          </p>
        </div>
      </div>
    );
  }

  const type =
    getLessonType(
      lesson
    );

  const resource =
    getLessonResource(
      lesson
    );

  const youtube =
    getLessonYoutube(
      lesson
    );

  const youtubeEmbed =
    getYoutubeEmbedUrl(
      youtube
    );

  const title =
    getLessonTitle(
      lesson
    );

  const image =
    getImage(
      lesson
    ) ||
    getImage(
      {
        image:
          lesson?.thumbnail,
      }
    );

  /* =======================================================
     VIDEO
  ======================================================= */

  if (
    type ===
    "VIDEO"
  ) {
    return (
      <div className="bg-black">
        <div className="relative aspect-video overflow-hidden">
          {resource ? (
            <video
              key={
                lesson.id
              }
              controls
              className="h-full w-full bg-black object-contain"
              poster={
                image ||
                undefined
              }
              onTimeUpdate={event => {
                const video =
                  event.currentTarget;

                if (
                  video.duration &&
                  Number.isFinite(
                    video.duration
                  )
                ) {
                  const percentage =
                    (video.currentTime /
                      video.duration) *
                    100;

                  /*
                   * Avoid sending API
                   * request on every
                   * video frame.
                   */
                  if (
                    Math.floor(
                      percentage
                    ) % 10 ===
                    0
                  ) {
                    onProgress(
                      percentage
                    );
                  }
                }
              }}
              onEnded={() =>
                onComplete()
              }
            >
              <source
                src={
                  resource
                }
                type="video/mp4"
              />

              Your browser does
              not support video.
            </video>
          ) : (
            <FallbackPlayer
              title={
                title
              }
              image={
                image
              }
              playing={
                playing
              }
              setPlaying={
                setPlaying
              }
            />
          )}
        </div>
      </div>
    );
  }

  /* =======================================================
     YOUTUBE
  ======================================================= */

  if (
    type ===
    "YOUTUBE"
  ) {
    return (
      <div className="bg-black">
        <div className="relative aspect-video">
          {youtubeEmbed ? (
            <iframe
              key={
                lesson.id
              }
              src={
                youtubeEmbed
              }
              title={
                title
              }
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <FallbackPlayer
              title={
                title
              }
              image={
                image
              }
              playing={
                playing
              }
              setPlaying={
                setPlaying
              }
            />
          )}
        </div>
      </div>
    );
  }

  /* =======================================================
     PDF
  ======================================================= */

  if (
    type ===
    "PDF"
  ) {
    return (
      <div className="bg-[#02070D]">
        <div className="flex min-h-[420px] items-center justify-center p-6">
          {resource ? (
            <iframe
              src={
                resource
              }
              title={
                title
              }
              className="h-[520px] w-full rounded-xl border border-white/10 bg-white"
            />
          ) : (
            <FallbackDocument
              title={
                title
              }
            />
          )}
        </div>
      </div>
    );
  }

  /* =======================================================
     TEXT
  ======================================================= */

  if (
    type ===
    "TEXT"
  ) {
    return (
      <div className="min-h-[420px] bg-[#031120] p-7">
        <div className="mx-auto max-w-4xl">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
              <FileText
                size={
                  22
                }
              />
            </div>

            <h2 className="text-xl font-bold">
              {title}
            </h2>
          </div>

          <div className="whitespace-pre-wrap leading-7 text-white/75">
            {
              getLessonContent(
                lesson
              )
            }
          </div>
        </div>
      </div>
    );
  }

  /* =======================================================
     LIVE / EXTERNAL
  ======================================================= */

  return (
    <div className="flex min-h-[420px] items-center justify-center bg-[#02070D] p-6">
      <div className="max-w-lg text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
          {type ===
          "LIVE" ? (
            <Video
              size={
                34
              }
            />
          ) : (
            <ExternalLink
              size={
                34
              }
            />
          )}
        </div>

        <h2 className="mt-5 text-2xl font-bold">
          {title}
        </h2>

        <p className="mt-3 text-sm leading-6 text-white/50">
          {getLessonDescription(
            lesson
          )}
        </p>

        {resource && (
          <a
            href={
              resource
            }
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-400 px-6 py-3 text-sm font-bold"
          >
            Open Resource

            <ExternalLink
              size={
                16
              }
            />
          </a>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   FALLBACK PLAYER
========================================================= */

function FallbackPlayer({
  title,
  image,
  playing,
  setPlaying,
}) {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#050B13]">
      {image && (
        <img
          src={
            image
          }
          alt={
            title
          }
          className={`
            absolute inset-0
            h-full w-full
            object-cover
            ${
              playing
                ? "scale-105"
                : "scale-100"
            }
            opacity-70
          `}
        />
      )}

      <div className="absolute inset-0 bg-black/45" />

      <button
        type="button"
        onClick={() =>
          setPlaying(
            !playing
          )
        }
        className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border border-white/30 bg-black/45 text-white backdrop-blur-md transition hover:scale-105"
      >
        {playing ? (
          <span className="text-2xl">
            ❚❚
          </span>
        ) : (
          <Play
            size={
              34
            }
            fill="white"
          />
        )}
      </button>
    </div>
  );
}

/* =========================================================
   FALLBACK DOCUMENT
========================================================= */

function FallbackDocument({
  title,
}) {
  return (
    <div className="text-center">
      <FileText
        size={55}
        className="mx-auto text-blue-400/60"
      />

      <h3 className="mt-4 text-lg font-bold">
        {title}
      </h3>

      <p className="mt-2 text-sm text-white/45">
        No PDF resource is
        available for this
        lesson.
      </p>
    </div>
  );
}

/* =========================================================
   LESSON TAB
========================================================= */

function LessonTab({
  active,
  icon,
  label,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex items-center
        gap-2 rounded-xl
        px-5 py-3
        text-sm font-semibold
        transition
        ${
          active
            ? "bg-gradient-to-r from-blue-600 to-cyan-400 text-white shadow-lg shadow-blue-500/20"
            : "border border-white/[0.08] bg-[#031120] text-white/70 hover:text-white"
        }
      `}
    >
      {icon}

      {label}
    </button>
  );
}

/* =========================================================
   OVERVIEW
========================================================= */

function OverviewPanel({
  lesson,
  level,
  duration,
  lessonType,
  selectedFile,
  onFileSelect,
}) {
  if (!lesson) {
    return null;
  }

  const resource =
    getLessonResource(
      lesson
    );

  const title =
    getLessonTitle(
      lesson
    );

  const description =
    getLessonDescription(
      lesson
    );

  return (
    <div className="mt-3 grid grid-cols-1 gap-3 2xl:grid-cols-[minmax(0,1fr)_325px]">
      {/* =================================================
          DESCRIPTION
      ================================================= */}

      <div className="rounded-2xl border border-blue-500/15 bg-[#031120] p-5">
        <h2 className="text-xl font-bold">
          {title}
        </h2>

        <p className="mt-2 text-sm leading-6 text-white/70">
          {description}
        </p>

        {/* META */}

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <InfoBox
            icon={
              <Clock3
                size={21}
              />
            }
            label="Duration"
            value={
              duration ||
              "Not available"
            }
          />

          <InfoBox
            icon={
              <BarChart3
                size={21}
              />
            }
            label="Level"
            value={
              level
            }
          />

          <InfoBox
            icon={
              <FileText
                size={21}
              />
            }
            label="Type"
            value={
              lessonType
            }
          />
        </div>
      </div>

      {/* =================================================
          RESOURCES
      ================================================= */}

      <div className="rounded-2xl border border-blue-500/15 bg-[#031120] p-5">
        <h3 className="font-bold">
          Lesson Resources
        </h3>

        {resource ? (
          <a
            href={
              resource
            }
            target="_blank"
            rel="noreferrer"
            className="mt-4 flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] p-3 transition hover:border-blue-500/30"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pink-500/10 text-pink-400">
              <File
                size={
                  20
                }
              />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">
                {getFileName(
                  resource
                )}
              </p>

              <p className="mt-0.5 text-xs text-white/40">
                Lesson Resource
              </p>
            </div>

            <Download
              size={
                18
              }
              className="text-blue-400"
            />
          </a>
        ) : (
          <p className="mt-4 text-sm text-white/40">
            No resources attached
            to this lesson.
          </p>
        )}

        {/* ASSIGNMENT */}

        <div className="mt-5 border-t border-white/[0.07] pt-5">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
              <ClipboardList
                size={
                  20
                }
              />
            </div>

            <div className="min-w-0 flex-1">
              <h4 className="font-bold">
                Assignment
              </h4>

              <p className="mt-1 text-xs leading-5 text-white/45">
                Upload your
                assignment for this
                lesson.
              </p>
            </div>
          </div>

          <label className="mt-4 flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-400 px-4 py-3 text-sm font-bold">
            <Upload
              size={
                17
              }
            />

            {selectedFile
              ? "Change File"
              : "Upload Assignment"}

            <input
              type="file"
              className="hidden"
              onChange={
                onFileSelect
              }
            />
          </label>

          {selectedFile && (
            <p className="mt-2 truncate text-xs text-emerald-300">
              Selected:{" "}
              {
                selectedFile.name
              }
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   INFO BOX
========================================================= */

function InfoBox({
  icon,
  label,
  value,
}) {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-[#061426] p-4">
      <div className="flex items-center gap-2 text-blue-400">
        {icon}

        <span className="text-xs text-white/45">
          {label}
        </span>
      </div>

      <p className="mt-2 text-sm font-bold text-white">
        {value}
      </p>
    </div>
  );
}

/* =========================================================
   NOTES
========================================================= */

function NotesPanel({
  notes,
  setNotes,
  saveNote,
  savedNotes,
}) {
  return (
    <div className="mt-3 rounded-2xl border border-blue-500/15 bg-[#031120] p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">
          My Notes
        </h2>

        <FileText
          size={
            20
          }
          className="text-blue-400"
        />
      </div>

      <textarea
        value={
          notes
        }
        onChange={event =>
          setNotes(
            event.target
              .value
          )
        }
        placeholder="Write your notes for this lesson..."
        className="mt-4 min-h-[150px] w-full resize-y rounded-xl border border-white/[0.08] bg-[#061426] p-4 text-sm text-white outline-none placeholder:text-white/30 focus:border-blue-500/40"
      />

      <div className="mt-3 flex justify-end">
        <button
          type="button"
          onClick={
            saveNote
          }
          className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-400 px-5 py-2.5 text-sm font-bold"
        >
          Save Note
        </button>
      </div>

      {savedNotes.length >
        0 && (
        <div className="mt-6 space-y-3">
          {savedNotes.map(
            note => (
              <div
                key={
                  note.id
                }
                className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4"
              >
                <p className="whitespace-pre-wrap text-sm leading-6 text-white/75">
                  {
                    note.text
                  }
                </p>

                <p className="mt-2 text-xs text-white/30">
                  {new Date(
                    note.createdAt
                  ).toLocaleString(
                    "en-IN"
                  )}
                </p>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

/* =========================================================
   COMMENTS
========================================================= */

function CommentsPanel({
  comments,
  setComments,
  submitComment,
}) {
  return (
    <div className="mt-3 rounded-2xl border border-blue-500/15 bg-[#031120] p-5">
      <h2 className="text-xl font-bold">
        Comments
      </h2>

      <p className="mt-2 text-sm text-white/45">
        Share your thoughts
        about this lesson.
      </p>

      <textarea
        value={
          comments
        }
        onChange={event =>
          setComments(
            event.target
              .value
          )
        }
        placeholder="Write a comment..."
        className="mt-5 min-h-[130px] w-full rounded-xl border border-white/[0.08] bg-[#061426] p-4 text-sm text-white outline-none placeholder:text-white/30 focus:border-blue-500/40"
      />

      <div className="mt-3 flex justify-end">
        <button
          type="button"
          onClick={
            submitComment
          }
          className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-400 px-5 py-2.5 text-sm font-bold"
        >
          Post Comment
        </button>
      </div>
    </div>
  );
}