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
  HiOutlineHome,
  HiOutlineAdjustments,
  HiOutlineClock,
  HiOutlineEye,
  HiOutlinePlus,
} from "react-icons/hi";

import {
  useNavigate,
  useOutletContext,
} from "react-router-dom";

import API from "../../services/api";

/* =========================================================
   BRANDING
========================================================= */

const DEFAULT_BRANDING = {
  pageBackgroundColor: "#020914",
  navbarColor: "#020B18",
  cardBackgroundColor: "#031120",
  headingColor: "#FFFFFF",
  textColor: "#FFFFFF",
  iconColor: "#1687FF",
  buttonColor: "#087CFF",
  buttonTextColor: "#FFFFFF",
  fontHeading: "Inter",
  fontBody: "Inter",
};

const getBrandingValue = (
  branding,
  camel,
  snake,
  fallback
) => {
  const value =
    branding?.[camel] ??
    branding?.[snake];

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

const pick = (...values) => {
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

const getClassTitle = booking =>
  pick(
    booking?.class?.title,
    booking?.class?.name,
    booking?.class_title,
    booking?.class_name,
    booking?.title,
    "Class"
  );

const getTrainerName = booking =>
  pick(
    booking?.trainer?.name,
    booking?.trainer?.full_name,
    booking?.trainer_name,
    "Trainer"
  );

const getTrainerImage = booking =>
  pick(
    booking?.trainer?.profile_image,
    booking?.trainer?.image,
    booking?.trainer_image,
    booking?.trainer_profile_image,
    ""
  );

const getClassImage = booking =>
  pick(
    booking?.class?.image,
    booking?.class?.image_url,
    booking?.class_image,
    booking?.image,
    booking?.image_url,
    ""
  );

const getRating = booking =>
  pick(
    booking?.trainer?.rating,
    booking?.trainer_rating,
    booking?.rating,
    null
  );

const getReviews = booking =>
  pick(
    booking?.trainer?.reviews,
    booking?.trainer_reviews,
    booking?.review_count,
    null
  );

const getSessionTitle = booking =>
  pick(
    booking?.session?.title,
    booking?.session_title,
    booking?.session_name,
    "Live Session"
  );

const getSessionId = booking =>
  pick(
    booking?.session?.id,
    booking?.session_id,
    booking?.class_session_id
  );

const getBookingId = booking =>
  pick(
    booking?.id,
    booking?.booking_id
  );

const getSessionDate = booking =>
  pick(
    booking?.session?.session_date,
    booking?.session_date,
    booking?.date,
    booking?.booking_date
  );

const getStartTime = booking =>
  pick(
    booking?.session?.start_time,
    booking?.start_time,
    booking?.session_template?.start_time
  );

const getEndTime = booking =>
  pick(
    booking?.session?.end_time,
    booking?.end_time
  );

const getMode = booking =>
  pick(
    booking?.session?.mode,
    booking?.mode,
    booking?.class?.mode,
    "LIVE"
  );

const getRecordingUrl = booking =>
  pick(
    booking?.recording_url,
    booking?.recording?.recording_url,
    booking?.recording?.play_url,
    booking?.recording?.url,
    ""
  );

const formatDate = value => {
  if (!value) {
    return "--";
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
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
};

const formatTime = value => {
  if (!value) {
    return "--";
  }

  const match = String(
    value
  ).match(
    /(\d{1,2}):(\d{2})/
  );

  if (!match) {
    return String(value);
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

const getTimeRange = booking => {
  const start =
    formatTime(
      getStartTime(
        booking
      )
    );

  const end =
    formatTime(
      getEndTime(
        booking
      )
    );

  if (
    start === "--" &&
    end === "--"
  ) {
    return "--";
  }

  if (end === "--") {
    return start;
  }

  return `${start} – ${end}`;
};

/* =========================================================
   STATUS
========================================================= */

const normalizeStatus = status =>
  String(
    status || ""
  )
    .trim()
    .toUpperCase();

const getBookingStatus = booking => {
  const explicit =
    normalizeStatus(
      pick(
        booking?.booking_status,
        booking?.live_status,
        booking?.status
      )
    );

  if (
    [
      "CANCELLED",
      "CANCELED",
      "REJECTED",
    ].includes(explicit)
  ) {
    return "CANCELLED";
  }

  if (
    [
      "COMPLETED",
      "COMPLETE",
      "FINISHED",
    ].includes(explicit)
  ) {
    return "COMPLETED";
  }

  if (
    [
      "ONGOING",
      "LIVE",
      "IN_PROGRESS",
    ].includes(explicit)
  ) {
    return "ONGOING";
  }

  const dateValue =
    getSessionDate(
      booking
    );

  const startValue =
    getStartTime(
      booking
    );

  const endValue =
    getEndTime(
      booking
    );

  if (!dateValue) {
    return "UPCOMING";
  }

  try {
    const dateString =
      String(
        dateValue
      ).split("T")[0];

    const start =
      startValue
        ? String(
            startValue
          ).slice(0, 5)
        : "00:00";

    const end =
      endValue
        ? String(
            endValue
          ).slice(0, 5)
        : "23:59";

    const now =
      new Date();

    const startDate =
      new Date(
        `${dateString}T${start}:00`
      );

    const endDate =
      new Date(
        `${dateString}T${end}:00`
      );

    if (
      now >= startDate &&
      now <= endDate
    ) {
      return "ONGOING";
    }

    if (
      now > endDate
    ) {
      return "COMPLETED";
    }

    return "UPCOMING";
  } catch {
    return "UPCOMING";
  }
};

/* =========================================================
   STATUS STYLE
========================================================= */

const STATUS_CONFIG = {
  UPCOMING: {
    label: "Upcoming",
    className:
      "bg-emerald-500 text-white",
  },

  ONGOING: {
    label: "Ongoing",
    className:
      "bg-blue-600 text-white",
  },

  COMPLETED: {
    label: "Completed",
    className:
      "bg-purple-600 text-white",
  },

  CANCELLED: {
    label: "Cancelled",
    className:
      "bg-red-500 text-white",
  },
};

/* =========================================================
   SIDEBAR
========================================================= */

function Sidebar({
  navigate,
  mobileOpen,
  setMobileOpen,
}) {
  const menu = [
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
          transition-transform
          duration-300
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

            <div className="relative flex h-12 w-12 items-center justify-center text-4xl text-blue-400">
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
            onClick={() =>
              setMobileOpen(false)
            }
            className="ml-auto text-white/60 lg:hidden"
          >
            <HiOutlineX
              size={22}
            />
          </button>
        </div>

        {/* MENU */}

        <nav className="flex-1 overflow-y-auto px-4 py-6">

          <div className="space-y-2">

            {menu.map(item => {

              const active =
                item.label ===
                "My Bookings";

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
                    transition-all
                    ${
                      active
                        ? "bg-gradient-to-r from-[#3825FF] via-[#155CFF] to-[#008CFF] text-white shadow-[0_0_28px_rgba(0,100,255,.45)]"
                        : "text-white/75 hover:bg-white/[0.04] hover:text-white"
                    }
                  `}
                >

                  <span className="flex w-6 justify-center text-[22px]">
                    {
                      item.icon
                    }
                  </span>

                  <span className="text-[15px] font-medium">
                    {
                      item.label
                    }
                  </span>

                </button>
              );
            })}
          </div>
        </nav>

        {/* QUOTE */}

        <div className="relative overflow-hidden border-t border-white/[0.05] px-8 py-7">

          <div className="pointer-events-none absolute -bottom-10 right-[-35px] text-[130px] text-blue-600/10">
            ♫
          </div>

          <div className="relative font-serif text-xl italic leading-8 text-blue-300">
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

          <div className="relative mt-4 h-1 w-9 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />

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
  const name =
    pick(
      student?.name,
      student?.full_name,
      student?.username,
      student?.displayName,
      "Priya Sharma"
    );

  const image =
    pick(
      student?.profile_image,
      student?.profileImage,
      student?.photoURL,
      student?.avatar,
      ""
    );

  return (
    <header className="sticky top-0 z-30 h-[84px] border-b border-white/[0.07] bg-[#020914]/90 backdrop-blur-xl">

      <div className="flex h-full items-center gap-4 px-4 sm:px-6 lg:px-7">

        {/* MOBILE MENU */}

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
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70"
            size={23}
          />

          <input
            placeholder="Search classes, trainers or bookings..."
            className="h-12 w-full rounded-xl border border-blue-500/20 bg-[#061426] pl-12 pr-4 text-sm text-white outline-none placeholder:text-white/50 focus:border-blue-500/50"
          />

        </div>

        <div className="ml-auto flex h-full items-center">

          {/* NOTIFICATION */}

          <button className="relative flex h-full w-[70px] items-center justify-center border-l border-white/[0.07]">

            <HiOutlineBell
              size={27}
              className="text-white"
            />

            <span className="absolute right-[15px] top-[15px] flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold">
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
            className="flex h-full items-center gap-3 border-l border-white/[0.07] px-5"
          >

            <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-white/10 bg-blue-500/10">

              {image ? (
                <img
                  src={
                    image
                  }
                  alt={
                    name
                  }
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <HiOutlineUser
                    size={23}
                    className="text-blue-400"
                  />
                </div>
              )}

            </div>

            <div className="hidden text-left md:block">

              <p className="text-[15px] font-semibold">
                {
                  name
                }
              </p>

              <p className="mt-1 text-xs text-white/55">
                Student
              </p>

            </div>

            <span className="ml-3 hidden text-xl text-white/80 md:block">
              ⌄
            </span>

          </button>
        </div>

      </div>
    </header>
  );
}

/* =========================================================
   BOOKING ROW
========================================================= */

function BookingRow({
  booking,
  navigate,
}) {
  const status =
    getBookingStatus(
      booking
    );

  const config =
    STATUS_CONFIG[
      status
    ] ||
    STATUS_CONFIG.UPCOMING;

  const classTitle =
    getClassTitle(
      booking
    );

  const trainerName =
    getTrainerName(
      booking
    );

  const trainerImage =
    getTrainerImage(
      booking
    );

  const classImage =
    getClassImage(
      booking
    );

  const rating =
    getRating(
      booking
    );

  const reviews =
    getReviews(
      booking
    );

  const date =
    getSessionDate(
      booking
    );

  const time =
    getTimeRange(
      booking
    );

  const mode =
    getMode(
      booking
    );

  const sessionTitle =
    getSessionTitle(
      booking
    );

  const bookingId =
    getBookingId(
      booking
    );

  const sessionId =
    getSessionId(
      booking
    );

  const recordingUrl =
    getRecordingUrl(
      booking
    );

  const handleDetails =
    () => {
      if (
        bookingId
      ) {
        navigate(
          `/institute/website/preview/lms/my-bookings/${bookingId}`
        );
      }
    };

  const handleJoin =
    () => {
      const joinUrl =
        pick(
          booking?.join_url,
          booking?.meeting_url,
          booking?.zoom_join_url,
          booking?.session?.join_url
        );

      if (joinUrl) {
        window.open(
          joinUrl,
          "_blank",
          "noopener,noreferrer"
        );

        return;
      }

      if (
        sessionId
      ) {
        navigate(
          `/institute/website/preview/lms/live-sessions/${sessionId}`
        );
      }
    };

  const handleRecording =
    () => {
      if (
        recordingUrl
      ) {
        window.open(
          recordingUrl,
          "_blank",
          "noopener,noreferrer"
        );

        return;
      }

      if (
        sessionId
      ) {
        navigate(
          `/institute/website/preview/lms/recordings?session_id=${sessionId}`
        );
      }
    };

  return (
    <div className="group relative overflow-hidden rounded-xl border border-blue-500/20 bg-[#020D1A] transition-all duration-300 hover:border-blue-500/45 hover:bg-[#031426]">

      {/* BLUE TOP LINE */}

      <div className="absolute left-0 top-0 h-[1px] w-full bg-gradient-to-r from-blue-500/50 via-blue-400/20 to-transparent" />

      <div className="flex min-h-[120px] flex-col gap-4 p-3 sm:p-4 lg:flex-row lg:items-center">

        {/* IMAGE */}

        <div className="relative h-[110px] w-full shrink-0 overflow-hidden rounded-lg bg-[#07182A] sm:w-[205px] lg:h-[108px] lg:w-[205px]">

          {classImage ? (
            <img
              src={
                classImage
              }
              alt={
                classTitle
              }
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-950 via-purple-950 to-blue-900">
              <HiOutlineBookOpen
                size={42}
                className="text-blue-400/60"
              />
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />

        </div>

        {/* DETAILS */}

        <div className="min-w-0 flex-1">

          <h2 className="truncate text-[18px] font-bold text-white sm:text-[19px]">
            {
              classTitle
            }
          </h2>

          {/* TRAINER */}

          <div className="mt-2 flex items-center gap-3">

            <HiOutlineUser
              size={19}
              className="shrink-0 text-white"
            />

            <div className="flex items-center gap-2">

              <div className="h-8 w-8 overflow-hidden rounded-full bg-blue-500/10">

                {trainerImage ? (
                  <img
                    src={
                      trainerImage
                    }
                    alt={
                      trainerName
                    }
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <HiOutlineUser
                      size={15}
                      className="text-blue-400"
                    />
                  </div>
                )}

              </div>

              <span className="text-sm text-white/80">
                {
                  trainerName
                }
              </span>

              {rating !==
                null && (
                <>
                  <span className="text-yellow-400">
                    ★
                  </span>

                  <span className="text-sm text-white/80">
                    {
                      rating
                    }
                  </span>

                  {reviews !==
                    null && (
                    <span className="text-sm text-white/45">
                      (
                      {
                        reviews
                      }
                      )
                    </span>
                  )}
                </>
              )}
            </div>
          </div>

          {/* DATE / TIME / MODE */}

          <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2">

            <div className="flex items-center gap-2 text-sm text-white/80">

              <HiOutlineCalendar
                size={19}
                className="text-white"
              />

              <span>
                {
                  formatDate(
                    date
                  )
                }
              </span>

            </div>

            <div className="flex items-center gap-2 text-sm text-white/80">

              <HiOutlineClock
                size={19}
                className="text-white"
              />

              <span>
                {
                  time
                }
              </span>

            </div>

            <div className="flex items-center gap-2 text-sm text-white/75">

              <HiOutlineVideoCamera
                size={19}
                className="text-white"
              />

              <span>
                {
                  sessionTitle
                }
              </span>

            </div>

          </div>

        </div>

        {/* STATUS */}

        <div className="flex shrink-0 items-center lg:self-start lg:pt-1">

          <span
            className={`
              rounded-full
              px-5 py-2
              text-xs
              font-bold
              shadow-lg
              ${config.className}
            `}
          >
            {
              config.label
            }
          </span>

        </div>

        {/* ACTIONS */}

        <div className="flex w-full shrink-0 flex-col gap-2 sm:flex-row lg:w-[212px] lg:flex-col">

          {status ===
            "UPCOMING" && (
            <button
              onClick={
                handleJoin
              }
              className="flex h-[34px] items-center justify-center gap-2 rounded-md bg-gradient-to-r from-blue-600 to-blue-500 text-xs font-semibold text-white shadow-[0_5px_20px_rgba(0,100,255,.25)] transition hover:from-blue-500 hover:to-blue-400"
            >
              <HiOutlineVideoCamera
                size={17}
              />

              Join Session
            </button>
          )}

          {status ===
            "ONGOING" && (
            <button
              onClick={
                handleJoin
              }
              className="flex h-[34px] items-center justify-center gap-2 rounded-md bg-gradient-to-r from-blue-600 to-blue-500 text-xs font-semibold text-white shadow-[0_5px_20px_rgba(0,100,255,.25)] transition hover:from-blue-500 hover:to-blue-400"
            >
              <HiOutlineVideoCamera
                size={17}
              />

              Join Session
            </button>
          )}

          {status ===
            "COMPLETED" && (
            <button
              onClick={
                handleRecording
              }
              className="flex h-[34px] items-center justify-center gap-2 rounded-md border border-blue-500/70 text-xs font-semibold text-blue-400 transition hover:bg-blue-500/10"
            >
              <HiOutlinePlay
                size={17}
              />

              Watch Recording
            </button>
          )}

          {status ===
            "CANCELLED" && (
            <div className="flex h-[34px] items-center justify-center rounded-md border border-red-500/30 text-xs font-semibold text-red-400">
              Booking Cancelled
            </div>
          )}

          <button
            onClick={
              handleDetails
            }
            className="flex h-[34px] items-center justify-center gap-2 rounded-md border border-blue-500/70 text-xs font-semibold text-white transition hover:bg-blue-500/10"
          >
            <HiOutlineEye
              size={17}
            />

            View Details
          </button>

          {(status ===
            "UPCOMING" ||
            status ===
              "ONGOING") && (
            <button
              onClick={() => {
                // Browser calendar support can
                // be connected later to the booking.
                const title =
                  encodeURIComponent(
                    classTitle
                  );

                const dateString =
                  getSessionDate(
                    booking
                  );

                const start =
                  getStartTime(
                    booking
                  );

                const end =
                  getEndTime(
                    booking
                  );

                if (
                  dateString &&
                  start
                ) {
                  const day =
                    String(
                      dateString
                    ).split(
                      "T"
                    )[0];

                  const startTime =
                    String(
                      start
                    ).slice(
                      0,
                      5
                    );

                  const endTime =
                    end
                      ? String(
                          end
                        ).slice(
                          0,
                          5
                        )
                      : startTime;

                  const startDate =
                    `${day}T${startTime}:00`;

                  const endDate =
                    `${day}T${endTime}:00`;

                  const googleUrl =
                    `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate.replace(/[-:]/g,"")}00/${endDate.replace(/[-:]/g,"")}00`;

                  window.open(
                    googleUrl,
                    "_blank",
                    "noopener,noreferrer"
                  );
                }
              }}
              className="flex h-[34px] items-center justify-center gap-2 rounded-md border border-blue-500/70 text-xs font-semibold text-blue-400 transition hover:bg-blue-500/10"
            >
              <HiOutlineCalendar
                size={17}
              />

              Add to Calendar
            </button>
          )}

        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function WebsiteMyBookings() {

  const navigate =
    useNavigate();

  const outletContext =
    useOutletContext() ||
    {};

  const branding =
    useMemo(
      () =>
        normalizeBranding(
          outletContext?.branding ||
            {}
        ),
      [
        outletContext?.branding,
      ]
    );

  /* =======================================================
     STATE
  ======================================================= */

  const [
    bookings,
    setBookings,
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
    activeTab,
    setActiveTab,
  ] = useState(
    "ALL"
  );

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    mobileOpen,
    setMobileOpen,
  ] = useState(false);

  const [
    student,
    setStudent,
  ] = useState(null);

  const [
    sortOrder,
    setSortOrder,
  ] = useState(
    "NEWEST"
  );

  /* =======================================================
     LOAD STUDENT
  ======================================================= */

  useEffect(() => {
    try {
      const stored =
        localStorage.getItem(
          "studentUser"
        );

      if (stored) {
        setStudent(
          JSON.parse(
            stored
          )
        );
      }
    } catch {
      setStudent(null);
    }
  }, []);

  /* =======================================================
     FETCH BOOKINGS
  ======================================================= */

  const fetchBookings =
    async () => {
      try {
        setLoading(
          true
        );

        setError("");

        /*
         * API file already contains:
         * /api as baseURL.
         *
         * Therefore:
         * GET /bookings/my
         * becomes:
         * GET /api/bookings/my
         */

        const response =
          await API.get(
            "/bookings/my"
          );

        const data =
          response?.data;

        let list = [];

        if (
          Array.isArray(
            data
          )
        ) {
          list =
            data;
        } else if (
          Array.isArray(
            data?.data?.bookings
          )
        ) {
          list =
            data.data.bookings;
        } else if (
          Array.isArray(
            data?.bookings
          )
        ) {
          list =
            data.bookings;
        } else if (
          Array.isArray(
            data?.data
          )
        ) {
          list =
            data.data;
        }

        setBookings(
          list
        );
      } catch (err) {
        console.error(
          "MY BOOKINGS ERROR:",
          err
        );

        setError(
          err?.response
            ?.data?.message ||
          err?.response
            ?.data?.error ||
          "Unable to load your bookings."
        );

        setBookings([]);
      } finally {
        setLoading(
          false
        );
      }
    };

  useEffect(() => {
    fetchBookings();
  }, []);

  /* =======================================================
     COUNTS
  ======================================================= */

  const counts =
    useMemo(() => {

      const result = {
        ALL: bookings.length,
        UPCOMING: 0,
        ONGOING: 0,
        COMPLETED: 0,
        CANCELLED: 0,
      };

      bookings.forEach(
        booking => {
          const status =
            getBookingStatus(
              booking
            );

          if (
            result[
              status
            ] !== undefined
          ) {
            result[
              status
            ] += 1;
          }
        }
      );

      return result;
    }, [
      bookings,
    ]);

  /* =======================================================
     FILTER
  ======================================================= */

  const filteredBookings =
    useMemo(() => {

      let list =
        bookings.filter(
          booking => {

            const status =
              getBookingStatus(
                booking
              );

            const matchesTab =
              activeTab ===
                "ALL" ||
              status ===
                activeTab;

            const keyword =
              search
                .trim()
                .toLowerCase();

            if (!keyword) {
              return matchesTab;
            }

            const title =
              getClassTitle(
                booking
              ).toLowerCase();

            const trainer =
              getTrainerName(
                booking
              ).toLowerCase();

            const session =
              getSessionTitle(
                booking
              ).toLowerCase();

            return (
              matchesTab &&
              (
                title.includes(
                  keyword
                ) ||
                trainer.includes(
                  keyword
                ) ||
                session.includes(
                  keyword
                )
              )
            );
          }
        );

      list = [
        ...list,
      ];

      list.sort(
        (a, b) => {

          const dateA =
            new Date(
              getSessionDate(
                a
              ) || 0
            ).getTime();

          const dateB =
            new Date(
              getSessionDate(
                b
              ) || 0
            ).getTime();

          return sortOrder ===
            "NEWEST"
            ? dateB - dateA
            : dateA - dateB;
        }
      );

      return list;
    }, [
      bookings,
      activeTab,
      search,
      sortOrder,
    ]);

  /* =======================================================
     TABS
  ======================================================= */

  const tabs = [
    {
      key: "ALL",
      label: "All Bookings",
      count:
        counts.ALL,
    },

    {
      key: "UPCOMING",
      label: "Upcoming",
      count:
        counts.UPCOMING,
    },

    {
      key: "ONGOING",
      label: "Ongoing",
      count:
        counts.ONGOING,
    },

    {
      key: "COMPLETED",
      label: "Completed",
      count:
        counts.COMPLETED,
    },

    {
      key: "CANCELLED",
      label: "Cancelled",
      count:
        counts.CANCELLED,
    },
  ];

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div
      className="min-h-screen text-white"
      style={{
        backgroundColor:
          branding.pageBackgroundColor,

        fontFamily:
          `'${branding.fontBody}', sans-serif`,
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

        <main className="px-4 py-6 sm:px-6 lg:px-7">

          {/* =================================================
              PAGE HEADER
          ================================================= */}

          <section className="border-b border-white/[0.06] pb-5">

            <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">

              <div>

                <h1
                  className="text-4xl font-bold tracking-tight sm:text-[43px]"
                  style={{
                    fontFamily:
                      `'${branding.fontHeading}', sans-serif`,
                    color:
                      branding.headingColor,
                  }}
                >
                  My{" "}
                  <span className="text-blue-500">
                    Bookings
                  </span>
                </h1>

                <p className="mt-1 text-base text-white/90">
                  View and manage all your booked
                  classes and sessions.
                </p>

              </div>

              {/* BANNER */}

              <div className="relative flex min-h-[82px] w-full max-w-[490px] items-center overflow-hidden rounded-xl bg-gradient-to-r from-[#2924FF] via-[#1835F5] to-[#6D00F5] px-6 shadow-[0_10px_35px_rgba(50,30,255,.20)]">

                <div className="mr-5 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border-2 border-white/80">
                  <HiOutlineCalendar
                    size={30}
                  />
                </div>

                <div className="relative z-10">

                  <h2 className="text-lg font-bold">
                    Your Learning Journey Continues!
                  </h2>

                  <p className="mt-1 text-sm text-white/85">
                    Stay consistent and make the most
                    of your bookings.
                  </p>

                </div>

                <div className="absolute -right-2 -bottom-8 text-[110px] leading-none text-white/10">
                  ♫
                </div>

              </div>

            </div>
          </section>

          {/* =================================================
              FILTER BAR
          ================================================= */}

          <section className="mt-3">

            <div className="flex flex-col gap-3 xl:flex-row xl:items-center">

              {/* TABS */}

              <div className="flex min-w-0 flex-1 gap-2 overflow-x-auto pb-1">

                {tabs.map(tab => {

                  const active =
                    activeTab ===
                    tab.key;

                  return (
                    <button
                      key={
                        tab.key
                      }
                      onClick={() =>
                        setActiveTab(
                          tab.key
                        )
                      }
                      className={`
                        flex h-[43px]
                        shrink-0
                        items-center
                        gap-1.5
                        rounded-full
                        border
                        px-5
                        text-sm
                        font-medium
                        transition-all
                        ${
                          active
                            ? "border-transparent bg-gradient-to-r from-[#4923FF] to-[#007BFF] text-white shadow-[0_0_22px_rgba(30,100,255,.28)]"
                            : "border-blue-500/25 bg-transparent text-white/85 hover:border-blue-500/50 hover:bg-blue-500/5"
                        }
                      `}
                    >
                      {
                        tab.label
                      }

                      <span
                        className={
                          active
                            ? "text-white/90"
                            : "text-white/60"
                        }
                      >
                        (
                        {
                          tab.count
                        }
                        )
                      </span>
                    </button>
                  );
                })}

              </div>

              {/* SEARCH */}

              <div className="relative w-full xl:w-[216px]">

                <HiOutlineSearch
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/65"
                  size={20}
                />

                <input
                  value={
                    search
                  }
                  onChange={event =>
                    setSearch(
                      event.target
                        .value
                    )
                  }
                  placeholder="Search bookings..."
                  className="h-[43px] w-full rounded-lg border border-blue-500/25 bg-[#061426] pl-10 pr-3 text-sm outline-none placeholder:text-white/50 focus:border-blue-500/60"
                />

              </div>

              {/* SORT */}

              <div className="relative w-full xl:w-[185px]">

                <HiOutlineAdjustments
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/75"
                  size={19}
                />

                <select
                  value={
                    sortOrder
                  }
                  onChange={event =>
                    setSortOrder(
                      event.target
                        .value
                    )
                  }
                  className="h-[43px] w-full appearance-none rounded-lg border border-blue-500/25 bg-[#061426] pl-10 pr-9 text-sm text-white outline-none focus:border-blue-500/60"
                >
                  <option
                    value="NEWEST"
                    className="bg-[#061426]"
                  >
                    Newest First
                  </option>

                  <option
                    value="OLDEST"
                    className="bg-[#061426]"
                  >
                    Oldest First
                  </option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/70">
                  ⌄
                </span>

              </div>

            </div>
          </section>

          {/* =================================================
              BOOKINGS LIST
          ================================================= */}

          <section className="mt-3">

            {loading && (
              <div className="flex min-h-[350px] items-center justify-center rounded-xl border border-blue-500/20 bg-[#020D1A]">

                <div className="text-center">

                  <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-500/20 border-t-blue-500" />

                  <p className="mt-4 text-sm text-white/50">
                    Loading your bookings...
                  </p>

                </div>
              </div>
            )}

            {!loading &&
              error && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-10 text-center">

                  <HiOutlineCalendar
                    size={45}
                    className="mx-auto text-red-400/60"
                  />

                  <h3 className="mt-4 text-lg font-semibold">
                    Unable to load bookings
                  </h3>

                  <p className="mt-2 text-sm text-white/50">
                    {
                      error
                    }
                  </p>

                  <button
                    onClick={
                      fetchBookings
                    }
                    className="mt-5 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold"
                  >
                    Try Again
                  </button>

                </div>
              )}

            {!loading &&
              !error &&
              filteredBookings.length >
                0 && (
                <div className="space-y-2.5">

                  {filteredBookings.map(
                    (
                      booking,
                      index
                    ) => (
                      <BookingRow
                        key={
                          getBookingId(
                            booking
                          ) ||
                          index
                        }
                        booking={
                          booking
                        }
                        navigate={
                          navigate
                        }
                      />
                    )
                  )}

                </div>
              )}

            {!loading &&
              !error &&
              filteredBookings.length ===
                0 && (
                <div className="flex min-h-[350px] flex-col items-center justify-center rounded-xl border border-dashed border-blue-500/20 bg-[#020D1A]">

                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-500/10">
                    <HiOutlineCalendar
                      size={38}
                      className="text-blue-400/60"
                    />
                  </div>

                  <h3 className="mt-5 text-xl font-semibold">
                    No bookings found
                  </h3>

                  <p className="mt-2 text-sm text-white/45">
                    {search
                      ? "Try changing your search or filters."
                      : activeTab !==
                        "ALL"
                      ? `You don't have any ${activeTab.toLowerCase()} bookings.`
                      : "Your booked classes and sessions will appear here."}
                  </p>

                  {(search ||
                    activeTab !==
                      "ALL") && (
                    <button
                      onClick={() => {
                        setSearch(
                          ""
                        );

                        setActiveTab(
                          "ALL"
                        );
                      }}
                      className="mt-5 rounded-lg border border-blue-500/60 px-5 py-2.5 text-sm font-semibold text-blue-400 hover:bg-blue-500/10"
                    >
                      Clear Filters
                    </button>
                  )}

                </div>
              )}

          </section>

        </main>
      </div>
    </div>
  );
}