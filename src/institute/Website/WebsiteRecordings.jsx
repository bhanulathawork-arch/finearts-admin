import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  HiOutlineBell,
  HiOutlineBookOpen,
  HiOutlineCalendar,
  HiOutlineVideoCamera,
  HiOutlinePlay,
  HiOutlineUser,
  HiOutlineDocumentText,
  HiOutlineCreditCard,
  HiOutlineSearch,
  HiOutlineMenu,
  HiOutlineX,
  HiOutlineDownload,
  HiOutlineClock,
  HiOutlineExternalLink,
  HiOutlineHome,
} from "react-icons/hi";

import {
  useNavigate,
  useOutletContext,
} from "react-router-dom";

import API from "../../services/api";

/* =========================================================
   DEFAULT BRANDING
========================================================= */

const DEFAULT_BRANDING = {
  pageBackgroundColor: "#020914",
  navbarColor: "#020B18",
  cardBackgroundColor: "#031120",

  headingColor: "#FFFFFF",
  subheadingColor: "#7DB7FF",
  textColor: "#FFFFFF",

  iconColor: "#1687FF",
  buttonColor: "#087CFF",
  buttonTextColor: "#FFFFFF",

  fontHeading: "Inter",
  fontSubheading: "Inter",
  fontBody: "Inter",
};

/* =========================================================
   BRANDING
========================================================= */

const getBrandingValue = (
  branding,
  camelKey,
  snakeKey,
  fallback
) => {
  const value =
    branding?.[camelKey] ??
    branding?.[snakeKey];

  return value !== undefined &&
    value !== null &&
    value !== ""
    ? value
    : fallback;
};

const normalizeBranding = (
  branding = {}
) => ({
  pageBackgroundColor:
    getBrandingValue(
      branding,
      "pageBackgroundColor",
      "page_background_color",
      DEFAULT_BRANDING.pageBackgroundColor
    ),

  navbarColor:
    getBrandingValue(
      branding,
      "navbarColor",
      "navbar_color",
      DEFAULT_BRANDING.navbarColor
    ),

  cardBackgroundColor:
    getBrandingValue(
      branding,
      "cardBackgroundColor",
      "card_background_color",
      DEFAULT_BRANDING.cardBackgroundColor
    ),

  headingColor:
    getBrandingValue(
      branding,
      "headingColor",
      "heading_color",
      DEFAULT_BRANDING.headingColor
    ),

  subheadingColor:
    getBrandingValue(
      branding,
      "subheadingColor",
      "subheading_color",
      DEFAULT_BRANDING.subheadingColor
    ),

  textColor:
    getBrandingValue(
      branding,
      "textColor",
      "text_color",
      DEFAULT_BRANDING.textColor
    ),

  iconColor:
    getBrandingValue(
      branding,
      "iconColor",
      "icon_color",
      DEFAULT_BRANDING.iconColor
    ),

  buttonColor:
    getBrandingValue(
      branding,
      "buttonColor",
      "button_color",
      DEFAULT_BRANDING.buttonColor
    ),

  buttonTextColor:
    getBrandingValue(
      branding,
      "buttonTextColor",
      "button_text_color",
      DEFAULT_BRANDING.buttonTextColor
    ),

  fontHeading:
    getBrandingValue(
      branding,
      "fontHeading",
      "font_heading",
      DEFAULT_BRANDING.fontHeading
    ),

  fontBody:
    getBrandingValue(
      branding,
      "fontBody",
      "font_body",
      DEFAULT_BRANDING.fontBody
    ),
});

/* =========================================================
   HELPERS
========================================================= */

const getValue = (...values) => {
  for (const value of values) {
    if (
      value !== undefined &&
      value !== null &&
      value !== ""
    ) {
      return value;
    }
  }

  return null;
};

const getRecordingTitle = (
  recording
) => {
  return getValue(
    recording?.title,
    recording?.recording_title,
    recording?.session_title,
    recording?.class_title,
    "Class Recording"
  );
};

const getCourseName = (
  recording
) => {
  return getValue(
    recording?.class_title,
    recording?.course_title,
    recording?.class_name,
    "Course"
  );
};

const getSessionName = (
  recording
) => {
  return getValue(
    recording?.session_title,
    recording?.session_name,
    recording?.title,
    "Live Session"
  );
};

const getTrainerName = (
  recording
) => {
  return getValue(
    recording?.trainer_name,
    recording?.trainer_full_name,
    recording?.instructor_name,
    "Trainer"
  );
};

const getTrainerImage = (
  recording
) => {
  return getValue(
    recording?.trainer_image,
    recording?.trainer_profile_image,
    recording?.profile_image,
    ""
  );
};

const getRecordingUrl = (
  recording
) => {
  return getValue(
    recording?.recording_url,
    recording?.play_url,
    recording?.video_url,
    recording?.external_storage_url,
    ""
  );
};

const getDownloadUrl = (
  recording
) => {
  return getValue(
    recording?.download_url,
    recording?.recording_url,
    ""
  );
};

const getThumbnail = (
  recording
) => {
  return getValue(
    recording?.thumbnail,
    recording?.thumbnail_url,
    recording?.image,
    recording?.image_url,
    recording?.class_image,
    recording?.course_image,
    ""
  );
};

const formatDuration = (
  seconds
) => {
  const total =
    Number(seconds) || 0;

  if (!total) {
    return "--";
  }

  const hours =
    Math.floor(
      total / 3600
    );

  const minutes =
    Math.floor(
      (total % 3600) / 60
    );

  const secs =
    total % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }

  if (minutes > 0) {
    return `${minutes}m`;
  }

  return `${secs}s`;
};

const formatDate = (
  value
) => {
  if (!value) {
    return "--";
  }

  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "--";
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

const formatTime = (
  value
) => {
  if (!value) {
    return "";
  }

  const match =
    String(value).match(
      /(\d{1,2}):(\d{2})/
    );

  if (!match) {
    return "";
  }

  let hour =
    Number(match[1]);

  const minute =
    Number(match[2]);

  const period =
    hour >= 12
      ? "PM"
      : "AM";

  hour =
    hour % 12 || 12;

  return `${String(
    hour
  ).padStart(
    2,
    "0"
  )}:${String(
    minute
  ).padStart(
    2,
    "0"
  )} ${period}`;
};

const getRecordingDate =
  recording =>
    getValue(
      recording?.recorded_at,
      recording?.recording_start,
      recording?.created_at,
      recording?.session_date
    );

const getResponseData = (
  response
) => {
  return (
    response?.data?.data ??
    response?.data?.recordings ??
    response?.data ??
    []
  );
};

/* =========================================================
   SIDEBAR
========================================================= */

function Sidebar({
  navigate,
  mobileOpen,
  setMobileOpen,
}) {
  const items = [
    {
      label: "Dashboard",
      icon: <HiOutlineHome />,
      path:
        "/institute/website/preview",
    },

    {
      label: "My Learning",
      icon: <HiOutlineBookOpen />,
      path:
        "/institute/website/preview/lms/my-learning",
    },

    {
      label: "Live Sessions",
      icon:
        <HiOutlineVideoCamera />,
      path:
        "/institute/website/preview/lms/live-sessions",
    },

    {
      label: "Recordings",
      icon:
        <HiOutlinePlay />,
      path:
        "/institute/website/preview/lms/recordings",
    },

    {
      label: "My Bookings",
      icon:
        <HiOutlineCalendar />,
      path:
        "/institute/website/preview/lms/my-bookings",
    },

    {
      label: "Assignments",
      icon:
        <HiOutlineDocumentText />,
      path:
        "/institute/website/preview/lms/assignments",
    },

    {
      label: "Attendance",
      icon:
        <HiOutlineCalendar />,
      path:
        "/institute/website/preview/lms/attendance",
    },

    {
      label: "Payment Details",
      icon:
        <HiOutlineCreditCard />,
      path:
        "/institute/website/preview/lms/payment-details",
    },

    {
      label: "Profile",
      icon:
        <HiOutlineUser />,
      path:
        "/institute/website/preview/lms/profile",
    },
  ];

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 lg:hidden"
          onClick={() =>
            setMobileOpen(false)
          }
        />
      )}

      <aside
        className={`
          fixed left-0 top-0 z-50
          flex h-screen w-[270px]
          flex-col
          border-r border-white/[0.07]
          bg-[#020B18]
          transition-transform duration-300
          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* LOGO */}

        <div className="flex h-[90px] items-center border-b border-white/[0.06] px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center text-3xl text-blue-400">
              ♫
            </div>

            <div>
              <h1 className="text-[25px] font-bold leading-none">
                Fine
                <span className="text-blue-400">
                  Arts
                </span>
              </h1>

              <p className="mt-1 text-xs text-white/50">
                Student LMS
              </p>
            </div>
          </div>

          <button
            className="ml-auto text-white/60 lg:hidden"
            onClick={() =>
              setMobileOpen(false)
            }
          >
            <HiOutlineX
              size={22}
            />
          </button>
        </div>

        {/* NAV */}

        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <div className="space-y-2">
            {items.map(
              item => {
                const active =
                  item.label ===
                  "Recordings";

                return (
                  <button
                    key={
                      item.label
                    }
                    onClick={() => {
                      setMobileOpen(
                        false
                      );

                      navigate(
                        item.path
                      );
                    }}
                    className={`
                      flex w-full
                      items-center gap-4
                      rounded-xl
                      px-4 py-3.5
                      text-left
                      transition
                      ${
                        active
                          ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-[0_0_25px_rgba(0,110,255,.35)]"
                          : "text-white/75 hover:bg-white/[0.04] hover:text-white"
                      }
                    `}
                  >
                    <span className="flex w-6 justify-center text-[21px]">
                      {
                        item.icon
                      }
                    </span>

                    <span className="text-sm font-medium">
                      {
                        item.label
                      }
                    </span>
                  </button>
                );
              }
            )}
          </div>
        </nav>

        {/* FOOTER */}

        <div className="border-t border-white/[0.05] px-8 py-7">
          <div className="font-serif text-xl italic leading-8 text-blue-300">
            <div>
              Art
            </div>
            <div>
              Builds
            </div>
            <div>
              A Better
            </div>
            <div>
              You”
            </div>
          </div>

          <div className="mt-4 h-1 w-9 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
        </div>
      </aside>
    </>
  );
}

/* =========================================================
   HEADER
========================================================= */

function TopHeader({
  navigate,
  student,
  setMobileOpen,
}) {
  const studentName =
    getValue(
      student?.name,
      student?.full_name,
      student?.displayName,
      "Priya Sharma"
    );

  const studentImage =
    getValue(
      student?.profile_image,
      student?.photoURL,
      student?.avatar,
      ""
    );

  return (
    <header className="sticky top-0 z-30 h-[82px] border-b border-white/[0.07] bg-[#020914]/90 backdrop-blur-xl">
      <div className="flex h-full items-center gap-4 px-4 sm:px-6 lg:px-8">

        <button
          onClick={() =>
            setMobileOpen(
              true
            )
          }
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] lg:hidden"
        >
          <HiOutlineMenu
            size={22}
          />
        </button>

        {/* SEARCH */}

        <div className="relative w-full max-w-[515px]">
          <HiOutlineSearch
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50"
            size={21}
          />

          <input
            placeholder="Search classes, sessions, recordings or topics..."
            className="h-12 w-full rounded-xl border border-blue-500/20 bg-[#061426] pl-11 pr-4 text-sm text-white outline-none placeholder:text-white/35"
          />
        </div>

        <div className="ml-auto flex items-center">

          {/* NOTIFICATION */}

          <button className="relative flex h-[58px] w-[58px] items-center justify-center border-l border-white/[0.06]">
            <HiOutlineBell
              size={25}
            />

            <span className="absolute right-1 top-2 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold">
              3
            </span>
          </button>

          {/* PROFILE */}

          <button
            onClick={() =>
              navigate(
                "/institute/website/preview/lms/profile"
              )
            }
            className="flex items-center gap-3 border-l border-white/[0.06] px-4"
          >
            <div className="h-11 w-11 overflow-hidden rounded-full bg-blue-500/10">
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
                  <HiOutlineUser
                    size={21}
                    className="text-blue-400"
                  />
                </div>
              )}
            </div>

            <div className="hidden text-left sm:block">
              <p className="text-sm font-semibold">
                {
                  studentName
                }
              </p>

              <p className="text-xs text-white/45">
                Student
              </p>
            </div>

            <span className="hidden text-white/50 sm:block">
             ⌄
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

/* =========================================================
   RECORDING CARD
========================================================= */

function RecordingCard({
  recording,
}) {
  const title =
    getRecordingTitle(
      recording
    );

  const course =
    getCourseName(
      recording
    );

  const trainer =
    getTrainerName(
      recording
    );

  const trainerImage =
    getTrainerImage(
      recording
    );

  const thumbnail =
    getThumbnail(
      recording
    );

  const recordingUrl =
    getRecordingUrl(
      recording
    );

  const downloadUrl =
    getDownloadUrl(
      recording
    );

  return (
    <div className="group overflow-hidden rounded-xl border border-blue-500/20 bg-[#031120] transition hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-[0_10px_35px_rgba(0,100,255,.15)]">

      {/* THUMBNAIL */}

      <div className="relative h-[185px] overflow-hidden bg-gradient-to-br from-blue-950 to-purple-950">

        {thumbnail ? (
          <img
            src={
              thumbnail
            }
            alt={
              title
            }
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <HiOutlinePlay
              size={65}
              className="text-blue-400/60"
            />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* PLAY */}

        <a
          href={
            recordingUrl ||
            "#"
          }
          target="_blank"
          rel="noopener noreferrer"
          className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-blue-600 text-white opacity-90 shadow-[0_0_30px_rgba(0,110,255,.5)] transition hover:scale-110"
        >
          <HiOutlinePlay
            size={26}
          />
        </a>

        {/* DURATION */}

        <span className="absolute bottom-3 right-3 rounded-md bg-black/80 px-2 py-1 text-xs font-semibold">
          {formatDuration(
            recording?.duration_seconds
          )}
        </span>

        {/* TYPE */}

        <span className="absolute left-3 top-3 rounded-full bg-blue-600/90 px-3 py-1 text-[11px] font-bold">
          {String(
            recording?.recording_type ||
              "VIDEO"
          ).toUpperCase()}
        </span>
      </div>

      {/* CONTENT */}

      <div className="p-5">

        <h3 className="line-clamp-2 min-h-[48px] text-lg font-bold">
          {
            title
          }
        </h3>

        <p className="mt-2 truncate text-sm text-blue-400">
          {
            course
          }
        </p>

        <div className="mt-4 flex items-center gap-3">

          <div className="h-9 w-9 overflow-hidden rounded-full bg-blue-500/10">
            {trainerImage ? (
              <img
                src={
                  trainerImage
                }
                alt={
                  trainer
                }
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <HiOutlineUser
                  size={17}
                  className="text-blue-400"
                />
              </div>
            )}
          </div>

          <div>
            <p className="text-sm font-medium">
              {
                trainer
              }
            </p>

            <p className="text-xs text-white/40">
              {
                formatDate(
                  getRecordingDate(
                    recording
                  )
                )
              }
            </p>
          </div>
        </div>

        {/* ACTIONS */}

        <div className="mt-5 flex gap-2">

          <a
            href={
              recordingUrl ||
              "#"
            }
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 text-sm font-bold transition hover:bg-blue-500"
          >
            <HiOutlinePlay
              size={18}
            />

            Watch
          </a>

          {downloadUrl && (
            <a
              href={
                downloadUrl
              }
              target="_blank"
              rel="noopener noreferrer"
              download
              className="flex h-[46px] w-[48px] items-center justify-center rounded-lg border border-blue-500/50 text-blue-300 transition hover:bg-blue-500/10"
              title="Download"
            >
              <HiOutlineDownload
                size={19}
              />
            </a>
          )}

          {recordingUrl && (
            <a
              href={
                recordingUrl
              }
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-[46px] w-[48px] items-center justify-center rounded-lg border border-blue-500/50 text-blue-300 transition hover:bg-blue-500/10"
              title="Open recording"
            >
              <HiOutlineExternalLink
                size={18}
              />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MAIN
========================================================= */

export default function WebsiteRecordings() {
  const navigate =
    useNavigate();

  const outletContext =
    useOutletContext() ||
    {};

  const {
    branding:
      outletBranding = {},
  } = outletContext;

  const branding =
    useMemo(
      () =>
        normalizeBranding(
          outletBranding
        ),
      [
        outletBranding,
      ]
    );

  /* =======================================================
     STATE
  ======================================================= */

  const [
    recordings,
    setRecordings,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    classFilter,
    setClassFilter,
  ] = useState(
    "ALL"
  );

  const [
    trainerFilter,
    setTrainerFilter,
  ] = useState(
    "ALL"
  );

  const [
    mobileOpen,
    setMobileOpen,
  ] = useState(false);

  const [
    student,
    setStudent,
  ] = useState(null);

  /* =======================================================
     STUDENT
  ======================================================= */

  useEffect(() => {
    try {
      const saved =
        localStorage.getItem(
          "studentUser"
        );

      if (saved) {
        setStudent(
          JSON.parse(
            saved
          )
        );
      }
    } catch {
      setStudent(null);
    }
  }, []);

  /* =======================================================
     FETCH RECORDINGS
  ======================================================= */

  const fetchRecordings =
    async () => {
      try {
        setLoading(
          true
        );

        setError("");

        const params = {};

        if (
          search.trim()
        ) {
          params.search =
            search.trim();
        }

        if (
          classFilter !==
          "ALL"
        ) {
          params.class_id =
            classFilter;
        }

        if (
          trainerFilter !==
          "ALL"
        ) {
          params.trainer_id =
            trainerFilter;
        }

        /*
         * Student recordings endpoint.
         *
         * The backend service already filters
         * recordings using the logged-in account
         * and confirmed/paid bookings.
         */

        const response =
          await API.get(
            "/recordings/student",
            {
              params,
            }
          );

        const data =
          getResponseData(
            response
          );

        setRecordings(
          Array.isArray(
            data
          )
            ? data
            : []
        );
      } catch (err) {
        console.error(
          "Failed to load recordings:",
          err
        );

        setError(
          err?.response
            ?.data?.message ||
            "Unable to load recordings."
        );

        setRecordings(
          []
        );
      } finally {
        setLoading(
          false
        );
      }
    };

  useEffect(() => {
    fetchRecordings();
  }, [
    search,
    classFilter,
    trainerFilter,
  ]);

  /* =======================================================
     FILTER OPTIONS
  ======================================================= */

  const classOptions =
    useMemo(() => {
      const values =
        recordings
          .map(
            recording =>
              getCourseName(
                recording
              )
          )
          .filter(
            Boolean
          );

      return [
        "ALL",
        ...Array.from(
          new Set(
            values
          )
        ),
      ];
    }, [
      recordings,
    ]);

  const trainerOptions =
    useMemo(() => {
      const values =
        recordings
          .map(
            recording =>
              getTrainerName(
                recording
              )
          )
          .filter(
            Boolean
          );

      return [
        "ALL",
        ...Array.from(
          new Set(
            values
          )
        ),
      ];
    }, [
      recordings,
    ]);

  /* =======================================================
     LOCAL FILTER
  ======================================================= */

  const filteredRecordings =
    useMemo(() => {
      return recordings.filter(
        recording => {
          const title =
            getRecordingTitle(
              recording
            ).toLowerCase();

          const course =
            getCourseName(
              recording
            ).toLowerCase();

          const trainer =
            getTrainerName(
              recording
            ).toLowerCase();

          const keyword =
            search
              .toLowerCase()
              .trim();

          const matchesSearch =
            !keyword ||
            title.includes(
              keyword
            ) ||
            course.includes(
              keyword
            ) ||
            trainer.includes(
              keyword
            );

          const matchesClass =
            classFilter ===
              "ALL" ||
            course ===
              String(
                classFilter
              ).toLowerCase();

          const matchesTrainer =
            trainerFilter ===
              "ALL" ||
            trainer ===
              String(
                trainerFilter
              ).toLowerCase();

          return (
            matchesSearch &&
            matchesClass &&
            matchesTrainer
          );
        }
      );
    }, [
      recordings,
      search,
      classFilter,
      trainerFilter,
    ]);

  /* =======================================================
     STATS
  ======================================================= */

  const totalRecordings =
    recordings.length;

  const totalDuration =
    recordings.reduce(
      (sum, recording) =>
        sum +
        Number(
          recording?.duration_seconds ||
            0
        ),
      0
    );

  const totalHours =
    (
      totalDuration /
      3600
    ).toFixed(1);

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div
      className="min-h-screen bg-[#020914] text-white"
      style={{
        fontFamily: `'${branding.fontBody}', sans-serif`,
      }}
    >

      {/* SIDEBAR */}

      <Sidebar
        navigate={
          navigate
        }
        mobileOpen={
          mobileOpen
        }
        setMobileOpen={
          setMobileOpen
        }
      />

      {/* MAIN */}

      <div className="lg:pl-[270px]">

        {/* HEADER */}

        <TopHeader
          navigate={
            navigate
          }
          student={
            student
          }
          setMobileOpen={
            setMobileOpen
          }
        />

        <main className="mx-auto max-w-[1500px] px-4 py-7 sm:px-6 lg:px-8">

          {/* =================================================
              PAGE HEADER
          ================================================= */}

          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">

            <div>
              <h1
                className="text-4xl font-bold tracking-tight sm:text-5xl"
                style={{
                  color:
                    branding.headingColor,
                }}
              >
                My{" "}
                <span className="text-blue-500">
                  Recordings
                </span>
              </h1>

              <p className="mt-2 text-base text-white/70">
                Rewatch your completed live
                classes, practice at your own
                pace and continue learning.
              </p>
            </div>

            {/* BANNER */}

            <div className="relative flex min-h-[90px] min-w-[310px] items-center overflow-hidden rounded-xl bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-800 px-6">

              <div className="absolute -right-8 -top-10 h-32 w-32 rounded-full bg-purple-300/10 blur-2xl" />

              <HiOutlinePlay
                size={40}
                className="mr-5"
              />

              <div>
                <h3 className="text-lg font-bold">
                  Learn Anytime
                </h3>

                <p className="text-sm text-white/75">
                  Watch. Practice. Improve!
                </p>
              </div>
            </div>
          </div>

          {/* =================================================
              STATS
          ================================================= */}

          <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

            <div className="rounded-xl border border-blue-500/20 bg-[#031120] p-5">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                  <HiOutlinePlay
                    size={24}
                  />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-white/45">
                    Total Recordings
                  </p>

                  <p className="mt-1 text-2xl font-bold">
                    {
                      totalRecordings
                    }
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-blue-500/20 bg-[#031120] p-5">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                  <HiOutlineClock
                    size={24}
                  />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-white/45">
                    Learning Hours
                  </p>

                  <p className="mt-1 text-2xl font-bold">
                    {
                      totalHours
                    }
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-blue-500/20 bg-[#031120] p-5">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10 text-green-400">
                  <HiOutlineVideoCamera
                    size={24}
                  />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-white/45">
                    Available Videos
                  </p>

                  <p className="mt-1 text-2xl font-bold">
                    {
                      totalRecordings
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              FILTER BAR
          ================================================= */}

          <div className="mt-7 rounded-xl border border-blue-500/20 bg-[#031120] p-4">

            <div className="flex flex-col gap-3 lg:flex-row">

              {/* SEARCH */}

              <div className="relative flex-1">
                <HiOutlineSearch
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
                  size={20}
                />

                <input
                  value={
                    search
                  }
                  onChange={event =>
                    setSearch(
                      event
                        .target
                        .value
                    )
                  }
                  placeholder="Search recordings, classes or trainers..."
                  className="h-12 w-full rounded-xl border border-blue-500/20 bg-[#061426] pl-11 pr-4 text-sm outline-none placeholder:text-white/35 focus:border-blue-500/50"
                />
              </div>

              {/* COURSE */}

              <select
                value={
                  classFilter
                }
                onChange={event =>
                  setClassFilter(
                    event
                      .target
                      .value
                  )
                }
                className="h-12 rounded-xl border border-blue-500/20 bg-[#061426] px-4 text-sm outline-none lg:w-[210px]"
              >
                {classOptions.map(
                  option => (
                    <option
                      key={
                        option
                      }
                      value={
                        option
                      }
                      className="bg-[#061426]"
                    >
                      {option ===
                      "ALL"
                        ? "All Courses"
                        : option}
                    </option>
                  )
                )}
              </select>

              {/* TRAINER */}

              <select
                value={
                  trainerFilter
                }
                onChange={event =>
                  setTrainerFilter(
                    event
                      .target
                      .value
                  )
                }
                className="h-12 rounded-xl border border-blue-500/20 bg-[#061426] px-4 text-sm outline-none lg:w-[210px]"
              >
                {trainerOptions.map(
                  option => (
                    <option
                      key={
                        option
                      }
                      value={
                        option
                      }
                      className="bg-[#061426]"
                    >
                      {option ===
                      "ALL"
                        ? "All Trainers"
                        : option}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>

          {/* =================================================
              RECORDINGS
          ================================================= */}

          <div className="mt-7">

            <div className="mb-5 flex items-center justify-between">

              <div>
                <h2 className="text-2xl font-bold">
                  Recorded Classes
                </h2>

                <p className="mt-1 text-sm text-blue-400">
                  Watch your previous live sessions
                  anytime.
                </p>
              </div>

              <span className="text-sm text-white/40">
                {
                  filteredRecordings.length
                }{" "}
                recordings
              </span>
            </div>

            {/* LOADING */}

            {loading && (
              <div className="flex min-h-[300px] items-center justify-center rounded-xl border border-blue-500/20 bg-[#031120]">
                <div className="text-center">
                  <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-500/20 border-t-blue-500" />

                  <p className="mt-4 text-sm text-white/50">
                    Loading recordings...
                  </p>
                </div>
              </div>
            )}

            {/* ERROR */}

            {!loading &&
              error && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-8 text-center">
                  <HiOutlineVideoCamera
                    size={45}
                    className="mx-auto text-red-400/60"
                  />

                  <h3 className="mt-4 text-lg font-semibold">
                    Unable to load recordings
                  </h3>

                  <p className="mt-2 text-sm text-white/50">
                    {
                      error
                    }
                  </p>

                  <button
                    onClick={
                      fetchRecordings
                    }
                    className="mt-5 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold"
                  >
                    Try Again
                  </button>
                </div>
              )}

            {/* GRID */}

            {!loading &&
              !error &&
              filteredRecordings.length >
                0 && (
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {filteredRecordings.map(
                    recording => (
                      <RecordingCard
                        key={
                          recording.id
                        }
                        recording={
                          recording
                        }
                      />
                    )
                  )}
                </div>
              )}

            {/* EMPTY */}

            {!loading &&
              !error &&
              filteredRecordings.length ===
                0 && (
                <div className="rounded-xl border border-dashed border-white/10 bg-[#031120] py-20 text-center">

                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-500/10">
                    <HiOutlinePlay
                      size={38}
                      className="text-blue-400/60"
                    />
                  </div>

                  <h3 className="mt-5 text-xl font-semibold">
                    No recordings found
                  </h3>

                  <p className="mx-auto mt-2 max-w-md text-sm text-white/45">
                    Completed live sessions will
                    appear here once recordings are
                    available for your enrolled
                    classes.
                  </p>

                  <button
                    onClick={() => {
                      setSearch(
                        ""
                      );
                      setClassFilter(
                        "ALL"
                      );
                      setTrainerFilter(
                        "ALL"
                      );
                    }}
                    className="mt-5 rounded-lg border border-blue-500 px-5 py-2.5 text-sm font-semibold text-blue-300"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
          </div>
        </main>
      </div>
    </div>
  );
}