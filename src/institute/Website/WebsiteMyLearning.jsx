import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useLocation,
  useNavigate,
  useOutletContext,
} from "react-router-dom";

import {
  FaHome,
  FaBookOpen,
  FaVideo,
  FaPlayCircle,
  FaCalendarAlt,
  FaFileAlt,
  FaClipboardCheck,
  FaCreditCard,
  FaUser,
  FaSearch,
  FaBell,
  FaArrowRight,
  FaChevronDown,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaCheckCircle,
  FaSpinner,
  FaChartBar,
} from "react-icons/fa";

import { auth } from "../../config/firebase";

import API from "../../services/api";

/* =========================================================
   CONSTANTS
========================================================= */

const LMS_BASE =
  "/institute/website/preview";

const API_ORIGIN = (
  import.meta.env.VITE_API_URL ||
  "https://finearts-backend.onrender.com/api"
).replace(/\/api\/?$/, "");

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

const responseData = payload => {
  return payload?.data ?? payload ?? {};
};

const listFrom = payload => {
  const data = responseData(payload);

  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data?.data)) {
    return data.data;
  }

  if (Array.isArray(data?.courses)) {
    return data.courses;
  }

  if (Array.isArray(data?.classes)) {
    return data.classes;
  }

  if (Array.isArray(data?.enrollments)) {
    return data.enrollments;
  }

  if (Array.isArray(data?.items)) {
    return data.items;
  }

  return [];
};

/* =========================================================
   IMAGE URL
========================================================= */

const getImageUrl = image => {
  if (!image) {
    return "";
  }

  if (
    typeof image === "string" &&
    (
      image.startsWith("http://") ||
      image.startsWith("https://") ||
      image.startsWith("data:")
    )
  ) {
    return image;
  }

  if (
    typeof image === "string" &&
    image.startsWith("/")
  ) {
    return `${API_ORIGIN}${image}`;
  }

  return image;
};

/* =========================================================
   STUDENT
========================================================= */

const getStoredStudent = () => {
  try {
    const raw =
      localStorage.getItem("studentUser");

    if (!raw) {
      return null;
    }

    return JSON.parse(raw);
  } catch (error) {
    console.error(
      "STUDENT STORAGE ERROR:",
      error
    );

    return null;
  }
};

const getStudentName = student => {
  return firstValue(
    student?.name,
    student?.full_name,
    student?.displayName,
    student?.student?.name,
    student?.student?.full_name,
    "Student"
  );
};

const getStudentAvatar = student => {
  return getImageUrl(
    firstValue(
      student?.profile_image,
      student?.student_photo,
      student?.photoURL,
      student?.student?.profile_image,
      student?.user?.profile_image
    )
  );
};

/* =========================================================
   COURSE HELPERS
========================================================= */

const getCourseId = course => {
  const id = firstValue(
    course?.id,
    course?.class_id,
    course?.classId,
    course?.course_id,
    course?.courseId
  );

  const numericId = Number(id);

  return Number.isInteger(numericId) &&
    numericId > 0
    ? numericId
    : null;
};

const getCourseTitle = course => {
  return firstValue(
    course?.title,
    course?.class_title,
    course?.course_title,
    course?.name,
    course?.class_name,
    "Untitled Course"
  );
};

const getCourseImage = course => {
  return getImageUrl(
    firstValue(
      course?.image,
      course?.class_image,
      course?.image_url,
      course?.thumbnail,
      course?.thumbnail_url,
      course?.course_image
    )
  );
};

const getTrainerName = course => {
  if (
    typeof course?.trainer === "object" &&
    course?.trainer
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
    typeof course?.trainer === "string"
      ? course.trainer
      : null,
    "Trainer"
  );
};

const getTrainerImage = course => {
  if (
    typeof course?.trainer === "object" &&
    course?.trainer
  ) {
    return getImageUrl(
      firstValue(
        course.trainer?.image,
        course.trainer?.profile_image,
        course.trainer?.photoURL
      )
    );
  }

  return getImageUrl(
    firstValue(
      course?.trainer_image,
      course?.trainer_image_url,
      course?.trainer_avatar,
      course?.instructor_image
    )
  );
};

const getLessons = course => {
  return Number(
    firstValue(
      course?.totalLessons,
      course?.total_lessons,
      course?.lesson_count,
      course?.lessons_count,
      course?.lessons,
      0
    )
  ) || 0;
};

const getCompletedLessons = course => {
  return Number(
    firstValue(
      course?.completedLessons,
      course?.completed_lessons,
      0
    )
  ) || 0;
};

const getLevel = course => {
  return firstValue(
    course?.level,
    course?.difficulty,
    course?.class_level,
    "Beginner"
  );
};

const getProgress = course => {
  const totalLessons =
    getLessons(course);

  const completedLessons =
    getCompletedLessons(course);

  const backendProgress =
    Number(
      firstValue(
        course?.progressPercentage,
        course?.progress_percentage,
        course?.completion_percentage,
        course?.completed_percentage
      )
    );

  if (
    Number.isFinite(
      backendProgress
    )
  ) {
    return Math.max(
      0,
      Math.min(
        100,
        Math.round(
          backendProgress
        )
      )
    );
  }

  if (totalLessons <= 0) {
    return 0;
  }

  return Math.max(
    0,
    Math.min(
      100,
      Math.round(
        (completedLessons /
          totalLessons) *
          100
      )
    )
  );
};

const getCategory = course => {
  return firstValue(
    course?.category_name,
    course?.category,
    course?.class_category,
    course?.categoryName,
    ""
  );
};

const getCreatedDate = course => {
  return firstValue(
    course?.created_at,
    course?.enrolled_on,
    course?.booking_created_at,
    course?.updated_at,
    null
  );
};

/* =========================================================
   STATUS
========================================================= */

const getCourseStatus = course => {
  const progress =
    getProgress(course);

  const rawStatus = String(
    firstValue(
      course?.learning_status,
      course?.course_status,
      course?.status,
      ""
    )
  ).toUpperCase();

  if (
    progress >= 100 ||
    rawStatus.includes("COMPLETED") ||
    rawStatus === "COMPLETE"
  ) {
    return "COMPLETED";
  }

  if (
    progress > 0 ||
    rawStatus.includes("PROGRESS") ||
    rawStatus.includes("STARTED") ||
    rawStatus === "ACTIVE"
  ) {
    return "IN_PROGRESS";
  }

  return "NOT_STARTED";
};

/* =========================================================
   FALLBACK IMAGE
========================================================= */

const fallbackCourseImage = title => {
  return (
    "https://ui-avatars.com/api/" +
    `?name=${encodeURIComponent(
      title
    )}` +
    "&background=07152A" +
    "&color=ffffff" +
    "&bold=true" +
    "&size=900"
  );
};

const fallbackTrainerImage = name => {
  return (
    "https://ui-avatars.com/api/" +
    `?name=${encodeURIComponent(
      name
    )}` +
    "&background=087CFF" +
    "&color=ffffff" +
    "&bold=true" +
    "&size=120"
  );
};

/* =========================================================
   FORMAT DATE
========================================================= */

const formatDate = value => {
  if (!value) {
    return null;
  }

  const date = new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return null;
  }

  return date;
};

/* =========================================================
   STATUS BADGE
========================================================= */

const StatusBadge = ({
  status,
}) => {
  if (status === "COMPLETED") {
    return (
      <span className="absolute left-4 top-4 z-10 flex items-center gap-1.5 rounded-full bg-emerald-500 px-3 py-1.5 text-xs font-bold text-white shadow-lg shadow-emerald-500/20">
        <FaCheckCircle />

        Completed
      </span>
    );
  }

  if (
    status === "IN_PROGRESS"
  ) {
    return (
      <span className="absolute left-4 top-4 z-10 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 px-3 py-1.5 text-xs font-bold text-white shadow-lg shadow-blue-500/20">
        In Progress
      </span>
    );
  }

  return (
    <span className="absolute left-4 top-4 z-10 rounded-full border border-white/10 bg-[#071426]/90 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md">
      Not Started
    </span>
  );
};

/* =========================================================
   COURSE CARD
========================================================= */

const CourseCard = ({
  course,
  onOpen,
}) => {
  const title =
    getCourseTitle(course);

  const rawImage =
    getCourseImage(course);

  const trainer =
    getTrainerName(course);

  const rawTrainerImage =
    getTrainerImage(course);

  const lessons =
    getLessons(course);

  const level =
    getLevel(course);

  const progress =
    getProgress(course);

  const status =
    getCourseStatus(course);

  const image =
    rawImage ||
    fallbackCourseImage(title);

  const trainerImage =
    rawTrainerImage ||
    fallbackTrainerImage(
      trainer
    );

  let actionText =
    "Start Course";

  if (
    status === "IN_PROGRESS"
  ) {
    actionText =
      "Continue Learning";
  }

  if (
    status === "COMPLETED"
  ) {
    actionText =
      "Review Course";
  }

  return (
    <article
      className="
        group overflow-hidden rounded-2xl
        border border-white/[0.08]
        bg-[#031120]
        transition-all duration-300
        hover:-translate-y-1
        hover:border-blue-500/40
        hover:shadow-[0_18px_50px_rgba(0,100,255,0.12)]
      "
    >
      {/* =================================================
          IMAGE
      ================================================= */}

      <div className="relative h-[170px] overflow-hidden bg-[#071426]">
        <img
          src={image}
          alt={title}
          className="
            h-full w-full object-cover
            transition-transform duration-500
            group-hover:scale-105
          "
          onError={event => {
            event.currentTarget.src =
              fallbackCourseImage(
                title
              );
          }}
        />

        {/* Image overlay */}

        <div className="absolute inset-0 bg-gradient-to-t from-[#031120] via-transparent to-black/10" />

        {/* Status */}

        <StatusBadge
          status={status}
        />
      </div>

      {/* =================================================
          CONTENT
      ================================================= */}

      <div className="p-4">
        {/* TITLE */}

        <h3 className="line-clamp-1 text-[18px] font-bold text-white">
          {title}
        </h3>

        {/* PROGRESS */}

        <div className="mt-3 flex items-center gap-3">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/[0.09]">
            <div
              className={`
                h-full rounded-full
                transition-all duration-700
                ${
                  status ===
                  "COMPLETED"
                    ? "bg-emerald-400"
                    : "bg-gradient-to-r from-blue-600 to-cyan-400"
                }
              `}
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          <span className="min-w-[38px] text-right text-sm font-semibold text-white">
            {progress}%
          </span>
        </div>

        {/* =================================================
            COURSE META
        ================================================= */}

        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/75">
          <span className="flex items-center gap-2">
            <FaBookOpen className="text-white/70" />

            {lessons} Lessons
          </span>

          <span className="flex items-center gap-2">
            <FaChartBar className="text-white/70" />

            {level}
          </span>
        </div>

        {/* =================================================
            TRAINER
        ================================================= */}

        <div className="mt-4 flex items-center gap-2.5">
          <div className="h-8 w-8 overflow-hidden rounded-full border border-white/10 bg-[#071426]">
            <img
              src={trainerImage}
              alt={trainer}
              className="h-full w-full object-cover"
              onError={event => {
                event.currentTarget.src =
                  fallbackTrainerImage(
                    trainer
                  );
              }}
            />
          </div>

          <span className="text-sm text-white/70">
            Trainer:{" "}
            <span className="font-medium text-white">
              {trainer}
            </span>
          </span>
        </div>

        {/* =================================================
            BUTTON
        ================================================= */}

        <button
          type="button"
          onClick={() =>
            onOpen(course)
          }
          className={`
            mt-4 flex w-full
            items-center justify-center
            gap-2 rounded-xl px-4 py-3
            text-sm font-bold
            transition-all duration-200
            ${
              status ===
              "IN_PROGRESS"
                ? "bg-gradient-to-r from-blue-600 to-cyan-400 text-white shadow-lg shadow-blue-500/20 hover:brightness-110"
                : status ===
                  "COMPLETED"
                ? "border border-blue-500 bg-transparent text-blue-400 hover:bg-blue-500/10"
                : "border border-blue-500 bg-transparent text-blue-400 hover:bg-blue-500/10"
            }
          `}
        >
          {actionText}

          <FaArrowRight className="text-xs" />
        </button>
      </div>
    </article>
  );
};

/* =========================================================
   NAV ITEM
========================================================= */

const SidebarItem = ({
  icon,
  label,
  path,
  active,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex w-full items-center gap-4
        rounded-xl px-4 py-3.5
        text-left transition-all
        ${
          active
            ? "text-white"
            : "text-white/75 hover:bg-white/[0.04] hover:text-white"
        }
      `}
      style={
        active
          ? {
              background:
                "linear-gradient(90deg, rgba(0,110,255,.40), rgba(0,70,255,.15))",
              boxShadow:
                "0 0 25px rgba(0,110,255,.18), inset 3px 0 0 #087CFF",
            }
          : undefined
      }
    >
      <span
        className={`
          flex w-6 justify-center
          text-lg
          ${
            active
              ? "text-blue-400"
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
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function WebsiteMyLearning() {
  const navigate =
    useNavigate();

  const location =
    useLocation();

  const context =
    useOutletContext() || {};

  const [student, setStudent] =
    useState(
      () =>
        context?.studentUser ||
        getStoredStudent()
    );

  const [courses, setCourses] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [sortBy, setSortBy] =
    useState("NEWEST");

  const [activeTab, setActiveTab] =
    useState("ALL");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  /* =======================================================
     BRANDING
  ======================================================= */

  const branding =
    context?.branding || {};

  const primaryColor =
    branding?.primaryColor ||
    branding?.primary_color ||
    "#087CFF";

  const accentColor =
    branding?.accentColor ||
    branding?.accent_color ||
    "#5427FF";

  /* =======================================================
     STUDENT CONTEXT
  ======================================================= */

  useEffect(() => {
    if (
      context?.studentUser &&
      typeof context.studentUser ===
        "object"
    ) {
      setStudent(
        previous => ({
          ...(previous || {}),
          ...context.studentUser,
        })
      );
    }
  }, [
    context?.studentUser,
  ]);

  /* =======================================================
     AUTH STATE
  ======================================================= */

  useEffect(() => {
    const unsubscribe =
      auth.onAuthStateChanged(
        firebaseUser => {
          if (
            firebaseUser &&
            !student
          ) {
            const stored =
              getStoredStudent();

            if (stored) {
              setStudent(stored);
            }
          }
        }
      );

    return () => {
      unsubscribe();
    };
  }, []);

  /* =======================================================
     LOAD COURSES
  ======================================================= */

  const loadCourses =
    async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await API.get(
            "/lms/student/courses"
          );

        console.log(
          "MY LEARNING RESPONSE:",
          response.data
        );

        const rows =
          listFrom(
            response.data
          );

        setCourses(
          Array.isArray(rows)
            ? rows
            : []
        );
      } catch (err) {
        console.error(
          "MY LEARNING ERROR:",
          err
        );

        setCourses([]);

        setError(
          err?.response?.data
            ?.message ||
            err?.message ||
            "Unable to load your enrolled courses."
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    loadCourses();
  }, []);

  /* =======================================================
     COUNTS
  ======================================================= */

  const counts =
    useMemo(() => {
      let inProgress = 0;
      let completed = 0;
      let notStarted = 0;

      courses.forEach(
        course => {
          const status =
            getCourseStatus(
              course
            );

          if (
            status ===
            "IN_PROGRESS"
          ) {
            inProgress++;
          }

          if (
            status ===
            "COMPLETED"
          ) {
            completed++;
          }

          if (
            status ===
            "NOT_STARTED"
          ) {
            notStarted++;
          }
        }
      );

      return {
        all: courses.length,
        inProgress,
        completed,
        notStarted,
      };
    }, [courses]);

  /* =======================================================
     FILTER + SEARCH + SORT
  ======================================================= */

  const filteredCourses =
    useMemo(() => {
      const keyword =
        search
          .trim()
          .toLowerCase();

      const result =
        courses.filter(
          course => {
            const title =
              getCourseTitle(
                course
              ).toLowerCase();

            const trainer =
              getTrainerName(
                course
              ).toLowerCase();

            const level =
              String(
                getLevel(course)
              ).toLowerCase();

            const category =
              getCategory(
                course
              ).toLowerCase();

            const status =
              getCourseStatus(
                course
              );

            const matchesSearch =
              !keyword ||
              title.includes(
                keyword
              ) ||
              trainer.includes(
                keyword
              ) ||
              level.includes(
                keyword
              ) ||
              category.includes(
                keyword
              );

            let matchesTab = true;

            if (
              activeTab ===
              "IN_PROGRESS"
            ) {
              matchesTab =
                status ===
                "IN_PROGRESS";
            }

            if (
              activeTab ===
              "COMPLETED"
            ) {
              matchesTab =
                status ===
                "COMPLETED";
            }

            if (
              activeTab ===
              "NOT_STARTED"
            ) {
              matchesTab =
                status ===
                "NOT_STARTED";
            }

            return (
              matchesSearch &&
              matchesTab
            );
          }
        );

      result.sort(
        (a, b) => {
          if (
            sortBy ===
            "NEWEST"
          ) {
            const aDate =
              formatDate(
                getCreatedDate(
                  a
                )
              );

            const bDate =
              formatDate(
                getCreatedDate(
                  b
                )
              );

            return (
              (bDate?.getTime() ||
                0) -
              (aDate?.getTime() ||
                0)
            );
          }

          if (
            sortBy ===
            "OLDEST"
          ) {
            const aDate =
              formatDate(
                getCreatedDate(
                  a
                )
              );

            const bDate =
              formatDate(
                getCreatedDate(
                  b
                )
              );

            return (
              (aDate?.getTime() ||
                0) -
              (bDate?.getTime() ||
                0)
            );
          }

          if (
            sortBy ===
            "NAME_ASC"
          ) {
            return getCourseTitle(
              a
            ).localeCompare(
              getCourseTitle(
                b
              )
            );
          }

          if (
            sortBy ===
            "PROGRESS"
          ) {
            return (
              getProgress(b) -
              getProgress(a)
            );
          }

          return 0;
        }
      );

      return result;
    }, [
      courses,
      search,
      activeTab,
      sortBy,
    ]);

  /* =======================================================
     OPEN COURSE
  ======================================================= */

  const openCourse =
    course => {
      const id =
        getCourseId(course);

      if (!id) {
        console.error(
          "COURSE ID MISSING:",
          course
        );

        return;
      }

      navigate(
        `${LMS_BASE}/my-learning/${id}`
      );

      setSidebarOpen(false);
    };

  /* =======================================================
     NAVIGATION
  ======================================================= */

  const go = path => {
    setSidebarOpen(false);
    navigate(path);
  };

  /* =======================================================
     LOGOUT
  ======================================================= */

  const handleLogout =
    async () => {
      try {
        await auth.signOut();
      } catch (error) {
        console.error(
          "LOGOUT ERROR:",
          error
        );
      }

      [
        "studentUser",
        "studentToken",
        "studentRole",
        "studentLoggedIn",
      ].forEach(key =>
        localStorage.removeItem(
          key
        )
      );

      navigate(
        "/institute/website/preview/login",
        {
          replace: true,
        }
      );
    };

  /* =======================================================
     ACTIVE SIDEBAR PATH
  ======================================================= */

  const isActive =
    path => {
      if (
        path.endsWith(
          "/my-learning"
        )
      ) {
        return location.pathname.includes(
          "/my-learning"
        );
      }

      return (
        location.pathname ===
        path
      );
    };

  const navItems = [
    {
      label: "Dashboard",
      icon: <FaHome />,
      path:
        `${LMS_BASE}/dashboard`,
    },
    {
      label: "My Learning",
      icon: <FaBookOpen />,
      path:
        `${LMS_BASE}/my-learning`,
    },
    {
      label: "Live Sessions",
      icon: <FaVideo />,
      path:
        `${LMS_BASE}/live-sessions`,
    },
    {
      label: "Recordings",
      icon: <FaPlayCircle />,
      path:
        `${LMS_BASE}/recordings`,
    },
    {
      label: "My Bookings",
      icon: <FaCalendarAlt />,
      path:
        `${LMS_BASE}/my-bookings`,
    },
    {
      label: "Assignments",
      icon: <FaFileAlt />,
      path:
        `${LMS_BASE}/assignments`,
    },
    {
      label: "Attendance",
      icon: <FaClipboardCheck />,
      path:
        `${LMS_BASE}/attendance`,
    },
    {
      label: "Payment Details",
      icon: <FaCreditCard />,
      path:
        `${LMS_BASE}/payment-details`,
    },
    {
      label: "Profile",
      icon: <FaUser />,
      path:
        `${LMS_BASE}/profile`,
    },
  ];

  /* =======================================================
     STUDENT DISPLAY
  ======================================================= */

  const studentName =
    getStudentName(
      student
    );

  const studentAvatar =
    getStudentAvatar(
      student
    );

  const avatar =
    studentAvatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      studentName
    )}&background=087CFF&color=ffffff&bold=true&size=150`;

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="min-h-screen bg-[#020914] text-white">
      {/* ===================================================
          MOBILE OVERLAY
      =================================================== */}

      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() =>
            setSidebarOpen(false)
          }
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* ===================================================
          SIDEBAR
      =================================================== */}

      <aside
        className={`
          fixed left-0 top-0 z-50
          flex h-screen w-[270px]
          flex-col
          border-r border-white/[0.07]
          bg-[#020B18]
          transition-transform duration-300
          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* LOGO */}

        <div className="flex h-[92px] items-center border-b border-white/[0.06] px-6">
          <div className="flex items-center gap-3">
            {/* Dancer-style logo */}

            <div
              className="relative flex h-12 w-12 items-center justify-center"
              style={{
                color:
                  primaryColor,
              }}
            >
              <div className="absolute h-9 w-9 rounded-full border-2 border-current opacity-70" />

              <span className="relative text-xl font-black">
                FA
              </span>
            </div>

            <div>
              <h1 className="text-[25px] font-bold tracking-tight">
                Fine
                <span
                  style={{
                    color:
                      primaryColor,
                  }}
                >
                  Arts
                </span>
              </h1>

              <p className="text-xs text-white/55">
                Student LMS
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              setSidebarOpen(false)
            }
            className="ml-auto text-white/60 lg:hidden"
          >
            <FaTimes />
          </button>
        </div>

        {/* NAVIGATION */}

        <nav className="flex-1 overflow-y-auto px-4 py-5">
          <div className="space-y-1.5">
            {navItems.map(
              item => (
                <SidebarItem
                  key={
                    item.label
                  }
                  icon={item.icon}
                  label={
                    item.label
                  }
                  path={
                    item.path
                  }
                  active={isActive(
                    item.path
                  )}
                  onClick={() =>
                    go(
                      item.path
                    )
                  }
                />
              )
            )}
          </div>
        </nav>

        {/* SIDEBAR ART */}

        <div className="relative overflow-hidden border-t border-white/[0.05] px-7 py-7">
          <div
            className="pointer-events-none absolute bottom-[-90px] left-[-30px] h-52 w-52 rounded-full blur-[70px]"
            style={{
              background:
                `${primaryColor}30`,
            }}
          />

          <div className="relative font-serif text-xl italic leading-8 text-blue-300/90">
            <div>Art</div>
            <div>Builds</div>
            <div>A Better</div>
            <div>You”</div>
          </div>

          <div
            className="mt-4 h-1 w-9 rounded-full"
            style={{
              background:
                `linear-gradient(90deg, ${primaryColor}, ${accentColor})`,
            }}
          />
        </div>

        {/* LOGOUT */}

        <button
          type="button"
          onClick={
            handleLogout
          }
          className="mx-4 mb-4 flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-white/55 transition hover:bg-white/[0.04] hover:text-white"
        >
          <FaSignOutAlt />

          Logout
        </button>
      </aside>

      {/* ===================================================
          MAIN
      =================================================== */}

      <div className="lg:pl-[270px]">
        {/* =================================================
            TOP BAR
        ================================================= */}

        <header className="sticky top-0 z-30 h-[82px] border-b border-white/[0.07] bg-[#020914]/90 backdrop-blur-xl">
          <div className="flex h-full items-center gap-4 px-4 sm:px-6 lg:px-8">
            {/* MOBILE MENU */}

            <button
              type="button"
              onClick={() =>
                setSidebarOpen(
                  true
                )
              }
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] lg:hidden"
            >
              <FaBars />
            </button>

            {/* GLOBAL SEARCH */}

            <div className="relative max-w-[520px] flex-1">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/55" />

              <input
                type="text"
                placeholder="Search courses, classes, recordings or topics..."
                className="h-12 w-full rounded-xl border border-blue-500/20 bg-[#061426] pl-11 pr-4 text-sm text-white outline-none placeholder:text-white/40 focus:border-blue-500/50"
              />
            </div>

            {/* RIGHT */}

            <div className="ml-auto flex items-center gap-3">
              <button
                type="button"
                className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.025] text-lg"
              >
                <FaBell />

                {counts.inProgress >
                  0 && (
                  <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold">
                    {Math.min(
                      counts.inProgress,
                      9
                    )}
                  </span>
                )}
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
                <img
                  src={avatar}
                  alt={
                    studentName
                  }
                  className="h-10 w-10 rounded-full border border-white/10 object-cover"
                />

                <div className="hidden text-left sm:block">
                  <p className="max-w-[130px] truncate text-sm font-semibold">
                    {
                      studentName
                    }
                  </p>

                  <p className="text-xs text-white/45">
                    Student
                  </p>
                </div>

                <FaChevronDown className="hidden text-xs text-white/60 sm:block" />
              </button>
            </div>
          </div>
        </header>

        {/* =================================================
            CONTENT
        ================================================= */}

        <main className="mx-auto w-full max-w-[1500px] px-4 py-7 sm:px-6 lg:px-8">
          {/* =================================================
              PAGE HEADER
          ================================================= */}

          <section className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
                My{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      `linear-gradient(90deg, ${primaryColor}, #32A8FF)`,
                  }}
                >
                  Learning
                </span>
              </h1>

              <p className="mt-2 text-base text-white/75">
                Continue your enrolled
                courses and track your
                learning journey.
              </p>
            </div>

            {/* PAGE SEARCH + SORT */}

            <div className="flex w-full flex-col gap-3 sm:flex-row xl:w-auto">
              <div className="relative min-w-0 flex-1 sm:w-[330px]">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />

                <input
                  type="text"
                  value={search}
                  onChange={event =>
                    setSearch(
                      event.target
                        .value
                    )
                  }
                  placeholder="Search my courses..."
                  className="h-12 w-full rounded-xl border border-white/[0.09] bg-[#061426] pl-11 pr-4 text-sm text-white outline-none placeholder:text-white/35 focus:border-blue-500/50"
                />
              </div>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={event =>
                    setSortBy(
                      event.target
                        .value
                    )
                  }
                  className="h-12 min-w-[180px] appearance-none rounded-xl border border-blue-500/30 bg-[#061426] px-5 pr-10 text-sm font-medium text-white outline-none focus:border-blue-500/60"
                >
                  <option value="NEWEST">
                    Newest First
                  </option>

                  <option value="OLDEST">
                    Oldest First
                  </option>

                  <option value="NAME_ASC">
                    Name A-Z
                  </option>

                  <option value="PROGRESS">
                    Highest Progress
                  </option>
                </select>

                <FaChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/60" />
              </div>
            </div>
          </section>

          {/* =================================================
              STATUS TABS
          ================================================= */}

          <section className="mt-7">
            <div className="flex gap-3 overflow-x-auto pb-1">
              <StatusTab
                active={
                  activeTab ===
                  "ALL"
                }
                onClick={() =>
                  setActiveTab(
                    "ALL"
                  )
                }
                label="All Courses"
                count={
                  counts.all
                }
                primaryColor={
                  primaryColor
                }
                accentColor={
                  accentColor
                }
              />

              <StatusTab
                active={
                  activeTab ===
                  "IN_PROGRESS"
                }
                onClick={() =>
                  setActiveTab(
                    "IN_PROGRESS"
                  )
                }
                label="In Progress"
                count={
                  counts.inProgress
                }
                primaryColor={
                  primaryColor
                }
                accentColor={
                  accentColor
                }
              />

              <StatusTab
                active={
                  activeTab ===
                  "COMPLETED"
                }
                onClick={() =>
                  setActiveTab(
                    "COMPLETED"
                  )
                }
                label="Completed"
                count={
                  counts.completed
                }
                primaryColor={
                  primaryColor
                }
                accentColor={
                  accentColor
                }
              />

              <StatusTab
                active={
                  activeTab ===
                  "NOT_STARTED"
                }
                onClick={() =>
                  setActiveTab(
                    "NOT_STARTED"
                  )
                }
                label="Not Started"
                count={
                  counts.notStarted
                }
                primaryColor={
                  primaryColor
                }
                accentColor={
                  accentColor
                }
              />
            </div>
          </section>

          {/* =================================================
              ERROR
          ================================================= */}

          {error && (
            <div className="mt-6 flex items-center justify-between gap-4 rounded-xl border border-red-500/20 bg-red-500/[0.06] px-5 py-4">
              <p className="text-sm text-red-300">
                {error}
              </p>

              <button
                type="button"
                onClick={
                  loadCourses
                }
                className="rounded-lg bg-red-500/15 px-4 py-2 text-xs font-bold text-red-300"
              >
                Retry
              </button>
            </div>
          )}

          {/* =================================================
              COURSE GRID
          ================================================= */}

          <section className="mt-6">
            {loading ? (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map(
                  item => (
                    <CourseSkeleton
                      key={
                        item
                      }
                    />
                  )
                )}
              </div>
            ) : filteredCourses.length ===
              0 ? (
              <EmptyCourses
                activeTab={
                  activeTab
                }
                search={
                  search
                }
                onClear={() => {
                  setSearch(
                    ""
                  );
                  setActiveTab(
                    "ALL"
                  );
                }}
                onBrowse={() =>
                  go(
                    `${LMS_BASE}/classes`
                  )
                }
              />
            ) : (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {filteredCourses.map(
                  (
                    course,
                    index
                  ) => (
                    <CourseCard
                      key={
                        getCourseId(
                          course
                        ) ||
                        index
                      }
                      course={
                        course
                      }
                      onOpen={
                        openCourse
                      }
                    />
                  )
                )}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

/* =========================================================
   STATUS TAB
========================================================= */

const StatusTab = ({
  active,
  onClick,
  label,
  count,
  primaryColor,
  accentColor,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex h-12 flex-shrink-0
        items-center justify-center
        gap-2 rounded-full
        border px-6
        text-sm font-semibold
        transition-all
        ${
          active
            ? "border-transparent text-white shadow-lg"
            : "border-white/[0.10] bg-transparent text-white/75 hover:border-white/20 hover:text-white"
        }
      `}
      style={
        active
          ? {
              background:
                `linear-gradient(90deg, ${primaryColor}, ${accentColor})`,
              boxShadow:
                `0 8px 25px ${primaryColor}25`,
            }
          : undefined
      }
    >
      {label}

      <span
        className={`
          rounded-full px-2 py-0.5
          text-[11px]
          ${
            active
              ? "bg-white/15"
              : "bg-white/[0.07]"
          }
        `}
      >
        {count}
      </span>
    </button>
  );
};

/* =========================================================
   SKELETON
========================================================= */

const CourseSkeleton =
  () => {
    return (
      <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#031120]">
        <div className="h-[170px] animate-pulse bg-white/[0.05]" />

        <div className="space-y-4 p-4">
          <div className="h-5 w-3/4 animate-pulse rounded bg-white/[0.07]" />

          <div className="h-2 w-full animate-pulse rounded bg-white/[0.06]" />

          <div className="flex gap-4">
            <div className="h-3 w-24 animate-pulse rounded bg-white/[0.05]" />

            <div className="h-3 w-20 animate-pulse rounded bg-white/[0.05]" />
          </div>

          <div className="h-8 w-32 animate-pulse rounded-full bg-white/[0.05]" />

          <div className="h-11 w-full animate-pulse rounded-xl bg-white/[0.06]" />
        </div>
      </div>
    );
  };

/* =========================================================
   EMPTY
========================================================= */

const EmptyCourses = ({
  activeTab,
  search,
  onClear,
  onBrowse,
}) => {
  let message =
    "You don't have any enrolled courses yet.";

  if (
    activeTab ===
    "IN_PROGRESS"
  ) {
    message =
      "You don't have any courses in progress.";
  }

  if (
    activeTab ===
    "COMPLETED"
  ) {
    message =
      "You don't have any completed courses yet.";
  }

  if (
    activeTab ===
    "NOT_STARTED"
  ) {
    message =
      "You don't have any courses waiting to be started.";
  }

  if (search) {
    message =
      "No courses match your search.";
  }

  return (
    <div className="flex min-h-[380px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/[0.10] bg-white/[0.015] px-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 text-2xl text-blue-400">
        <FaBookOpen />
      </div>

      <h3 className="mt-5 text-xl font-bold">
        No courses found
      </h3>

      <p className="mt-2 max-w-md text-sm text-white/45">
        {message}
      </p>

      <div className="mt-5 flex flex-wrap justify-center gap-3">
        {(search ||
          activeTab !==
            "ALL") && (
          <button
            type="button"
            onClick={
              onClear
            }
            className="rounded-xl border border-white/10 px-5 py-2.5 text-sm font-semibold text-white/75 transition hover:bg-white/[0.05] hover:text-white"
          >
            Clear Filters
          </button>
        )}

        {activeTab ===
          "ALL" &&
          !search && (
            <button
              type="button"
              onClick={
                onBrowse
              }
              className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-400 px-5 py-2.5 text-sm font-bold text-white"
            >
              Explore Courses
            </button>
          )}
      </div>
    </div>
  );
};