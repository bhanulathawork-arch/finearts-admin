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
  HiOutlineCheck,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineFilter,
} from "react-icons/hi";

import { useNavigate } from "react-router-dom";

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

const brandingValue = (
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
    brandingValue(
      branding,
      "pageBackgroundColor",
      "page_background_color",
      DEFAULT_BRANDING.pageBackgroundColor
    ),

  navbarColor:
    brandingValue(
      branding,
      "navbarColor",
      "navbar_color",
      DEFAULT_BRANDING.navbarColor
    ),

  cardBackgroundColor:
    brandingValue(
      branding,
      "cardBackgroundColor",
      "card_background_color",
      DEFAULT_BRANDING.cardBackgroundColor
    ),

  headingColor:
    brandingValue(
      branding,
      "headingColor",
      "heading_color",
      DEFAULT_BRANDING.headingColor
    ),

  textColor:
    brandingValue(
      branding,
      "textColor",
      "text_color",
      DEFAULT_BRANDING.textColor
    ),

  iconColor:
    brandingValue(
      branding,
      "iconColor",
      "icon_color",
      DEFAULT_BRANDING.iconColor
    ),

  buttonColor:
    brandingValue(
      branding,
      "buttonColor",
      "button_color",
      DEFAULT_BRANDING.buttonColor
    ),

  buttonTextColor:
    brandingValue(
      branding,
      "buttonTextColor",
      "button_text_color",
      DEFAULT_BRANDING.buttonTextColor
    ),

  fontHeading:
    brandingValue(
      branding,
      "fontHeading",
      "font_heading",
      DEFAULT_BRANDING.fontHeading
    ),

  fontBody:
    brandingValue(
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

const getStatus = (
  record
) =>
  String(
    pick(
      record?.attendance_status,
      record?.status,
      "ABSENT"
    )
  ).toUpperCase();

const getClassName = (
  record
) =>
  pick(
    record?.class?.title,
    record?.class_title,
    record?.class_name,
    "Class"
  );

const getSessionTitle = (
  record
) =>
  pick(
    record?.session?.title,
    record?.session_title,
    "Class Session"
  );

const getDate = (
  record
) =>
  pick(
    record?.session?.date,
    record?.session_date
  );

const getStartTime = (
  record
) =>
  pick(
    record?.session?.start_time,
    record?.start_time
  );

const getEndTime = (
  record
) =>
  pick(
    record?.session?.end_time,
    record?.end_time
  );

const getTrainer = (
  record
) =>
  pick(
    record?.trainer?.name,
    record?.trainer_name,
    "Trainer"
  );

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

const formatTime = (
  value
) => {
  if (!value) {
    return "--";
  }

  const text =
    String(value);

  if (
    /^\d{2}:\d{2}/.test(
      text
    )
  ) {
    const [
      hourString,
      minuteString,
    ] =
      text.split(":");

    let hour =
      Number(hourString);

    const minute =
      minuteString?.slice(
        0,
        2
      );

    const suffix =
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
    )}:${minute} ${suffix}`;
  }

  const date =
    new Date(value);

  if (
    !Number.isNaN(
      date.getTime()
    )
  ) {
    return date.toLocaleTimeString(
      "en-IN",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  }

  return text;
};

const formatTimeRange = (
  record
) => {
  const start =
    formatTime(
      getStartTime(
        record
      )
    );

  const end =
    formatTime(
      getEndTime(
        record
      )
    );

  if (
    start === "--" &&
    end === "--"
  ) {
    return "--";
  }

  if (
    end === "--"
  ) {
    return start;
  }

  return `${start} – ${end}`;
};

const toDateKey = (
  value
) => {
  if (!value) {
    return null;
  }

  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return null;
  }

  return [
    date.getFullYear(),
    String(
      date.getMonth() + 1
    ).padStart(
      2,
      "0"
    ),
    String(
      date.getDate()
    ).padStart(
      2,
      "0"
    ),
  ].join("-");
};

const getMonthKey = (
  value
) => {
  if (!value) {
    return null;
  }

  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return null;
  }

  return `${date.getFullYear()}-${String(
    date.getMonth() + 1
  ).padStart(
    2,
    "0"
  )}`;
};

const getImage = (
  record
) =>
  pick(
    record?.class?.image,
    record?.class_image,
    record?.image,
    record?.image_url,
    record?.thumbnail,
    record?.thumbnail_url
  );

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
      icon:
        <HiOutlineBookOpen />,
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
            setMobileOpen(
              false
            )
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

            <div className="flex h-12 w-12 items-center justify-center text-4xl text-blue-400">
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
              setMobileOpen(
                false
              )
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

            {menu.map(
              item => {

                const active =
                  item.label ===
                  "Attendance";

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
              }
            )}

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
   TOP HEADER
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
            placeholder="Search classes, trainers or topics..."
            className="h-12 w-full rounded-xl border border-blue-500/20 bg-[#061426] pl-12 pr-4 text-sm text-white outline-none placeholder:text-white/50 focus:border-blue-500/50"
          />

        </div>

        <div className="ml-auto flex h-full items-center">

          {/* NOTIFICATION */}

          <button className="relative flex h-full w-[70px] items-center justify-center border-l border-white/[0.07]">

            <HiOutlineBell
              size={27}
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
   STATUS BADGE
========================================================= */

function StatusBadge({
  status,
}) {
  const normalized =
    String(
      status
    ).toUpperCase();

  if (
    normalized ===
    "PRESENT"
  ) {
    return (
      <span className="rounded-full bg-emerald-500 px-5 py-2 text-xs font-bold text-white shadow-[0_0_15px_rgba(16,185,129,.25)]">
        Present
      </span>
    );
  }

  if (
    normalized ===
    "LATE"
  ) {
    return (
      <span className="rounded-full bg-amber-500 px-5 py-2 text-xs font-bold text-white shadow-[0_0_15px_rgba(245,158,11,.25)]">
        Late
      </span>
    );
  }

  return (
    <span className="rounded-full bg-rose-500 px-5 py-2 text-xs font-bold text-white shadow-[0_0_15px_rgba(244,63,94,.25)]">
      Absent
    </span>
  );
}

/* =========================================================
   SUMMARY CARD
========================================================= */

function SummaryCard({
  icon,
  number,
  label,
  percentage,
  type,
}) {
  const styles = {
    total: {
      circle:
        "border-8 border-emerald-500",
      icon:
        "bg-emerald-500/10 text-emerald-400",
    },

    present: {
      circle:
        "bg-emerald-500",
      icon:
        "bg-emerald-500 text-white",
    },

    absent: {
      circle:
        "bg-rose-500",
      icon:
        "bg-rose-500 text-white",
    },

    late: {
      circle:
        "bg-amber-500",
      icon:
        "bg-amber-500 text-white",
    },
  };

  const style =
    styles[type] ||
    styles.total;

  return (
    <div className="flex min-h-[88px] items-center gap-4 rounded-xl border border-blue-500/15 bg-[#031120] px-5 py-4">

      {/* ICON */}

      <div
        className={`
          flex h-[62px] w-[62px]
          shrink-0 items-center
          justify-center
          rounded-full
          ${
            type ===
            "total"
              ? style.circle
              : ""
          }
          ${style.icon}
        `}
      >
        {type ===
        "total" ? (
          <span className="text-[21px] font-bold text-white">
            {
              number
            }
          </span>
        ) : (
          React.cloneElement(
            icon,
            {
              size: 28,
            }
          )
        )}
      </div>

      <div>

        <p className="text-2xl font-bold">
          {
            number
          }
        </p>

        <p className="text-sm font-medium text-white/90">
          {
            label
          }
        </p>

        {percentage !==
          undefined && (
          <p className="mt-0.5 text-xs text-white/60">
            {
              percentage
            }
          </p>
        )}

      </div>

    </div>
  );
}

/* =========================================================
   MONTH CALENDAR
========================================================= */

function AttendanceCalendar({
  currentMonth,
  setCurrentMonth,
  records,
}) {
  const year =
    currentMonth.getFullYear();

  const month =
    currentMonth.getMonth();

  const monthName =
    currentMonth.toLocaleDateString(
      "en-IN",
      {
        month: "long",
        year: "numeric",
      }
    );

  const firstDay =
    new Date(
      year,
      month,
      1
    ).getDay();

  const daysInMonth =
    new Date(
      year,
      month + 1,
      0
    ).getDate();

  const previousMonthDays =
    new Date(
      year,
      month,
      0
    ).getDate();

  const calendarDays =
    [];

  for (
    let i = firstDay - 1;
    i >= 0;
    i--
  ) {
    calendarDays.push({
      day:
        previousMonthDays -
        i,
      current: false,
    });
  }

  for (
    let day = 1;
    day <=
    daysInMonth;
    day++
  ) {
    calendarDays.push({
      day,
      current: true,
    });
  }

  while (
    calendarDays.length <
    42
  ) {
    calendarDays.push({
      day:
        calendarDays.length -
        daysInMonth -
        firstDay +
        1,
      current: false,
    });
  }

  const statusByDate =
    {};

  records.forEach(
    record => {

      const dateKey =
        toDateKey(
          getDate(
            record
          )
        );

      if (!dateKey) {
        return;
      }

      const status =
        getStatus(
          record
        );

      /*
       * If multiple sessions exist on
       * the same day, retain a useful
       * representation.
       */

      if (
        !statusByDate[
          dateKey
        ]
      ) {
        statusByDate[
          dateKey
        ] = status;
      } else if (
        status ===
        "ABSENT"
      ) {
        statusByDate[
          dateKey
        ] = "ABSENT";
      } else if (
        status ===
        "LATE" &&
        statusByDate[
          dateKey
        ] !== "ABSENT"
      ) {
        statusByDate[
          dateKey
        ] = "LATE";
      }
    }
  );

  const today =
    new Date();

  const todayKey =
    toDateKey(
      today
    );

  const previousMonth =
    () => {
      setCurrentMonth(
        new Date(
          year,
          month - 1,
          1
        )
      );
    };

  const nextMonth =
    () => {
      setCurrentMonth(
        new Date(
          year,
          month + 1,
          1
        )
      );
    };

  return (
    <div className="rounded-xl border border-blue-500/20 bg-[#020D1A] p-4">

      {/* HEADER */}

      <div className="flex items-center justify-between">

        <button
          onClick={
            previousMonth
          }
          className="flex h-9 w-9 items-center justify-center rounded-lg text-white/80 hover:bg-white/[0.05]"
        >
          <HiOutlineChevronLeft
            size={22}
          />
        </button>

        <h2 className="text-lg font-bold">
          {
            monthName
          }
        </h2>

        <button
          onClick={
            nextMonth
          }
          className="flex h-9 w-9 items-center justify-center rounded-lg text-white/80 hover:bg-white/[0.05]"
        >
          <HiOutlineChevronRight
            size={22}
          />
        </button>

      </div>

      {/* DAYS */}

      <div className="mt-5 grid grid-cols-7 text-center">

        {[
          "Sun",
          "Mon",
          "Tue",
          "Wed",
          "Thu",
          "Fri",
          "Sat",
        ].map(
          day => (
            <div
              key={
                day
              }
              className="pb-3 text-xs font-medium text-white/70"
            >
              {
                day
              }
            </div>
          )
        )}

      </div>

      {/* CALENDAR */}

      <div className="grid grid-cols-7 gap-y-1">

        {calendarDays.map(
          (
            item,
            index
          ) => {

            const date =
              item.current
                ? new Date(
                    year,
                    month,
                    item.day
                  )
                : null;

            const key =
              date
                ? toDateKey(
                    date
                  )
                : null;

            const status =
              key
                ? statusByDate[
                    key
                  ]
                : null;

            const isToday =
              key ===
              todayKey;

            return (
              <div
                key={
                  index
                }
                className="flex h-[45px] items-center justify-center"
              >

                <div
                  className={`
                    relative flex
                    h-9 w-9
                    items-center
                    justify-center
                    rounded-full
                    text-sm
                    ${
                      item.current
                        ? "text-white"
                        : "text-white/25"
                    }
                    ${
                      isToday
                        ? "bg-blue-600 font-bold shadow-[0_0_20px_rgba(0,110,255,.55)]"
                        : ""
                    }
                  `}
                >

                  {
                    item.day
                  }

                  {status && (
                    <span
                      className={`
                        absolute
                        bottom-[-1px]
                        left-1/2
                        h-1.5
                        w-1.5
                        -translate-x-1/2
                        rounded-full
                        ${
                          status ===
                          "PRESENT"
                            ? "bg-emerald-400"
                            : status ===
                              "ABSENT"
                            ? "bg-rose-400"
                            : "bg-amber-400"
                        }
                      `}
                    />
                  )}

                </div>

              </div>
            );
          }
        )}

      </div>

      {/* LEGEND */}

      <div className="mt-4 flex flex-wrap items-center justify-center gap-4 border-t border-white/[0.06] pt-4 text-xs">

        <Legend
          color="bg-emerald-400"
          label="Present"
        />

        <Legend
          color="bg-rose-400"
          label="Absent"
        />

        <Legend
          color="bg-amber-400"
          label="Late"
        />

        <Legend
          color="bg-slate-500"
          label="No Class"
        />

      </div>

    </div>
  );
}

function Legend({
  color,
  label,
}) {
  return (
    <div className="flex items-center gap-2">

      <span
        className={`h-2.5 w-2.5 rounded-full ${color}`}
      />

      <span className="text-white/80">
        {
          label
        }
      </span>

    </div>
  );
}

/* =========================================================
   CLASS-WISE ATTENDANCE
========================================================= */

function ClassWiseAttendance({
  records,
}) {
  return (
    <div className="rounded-xl border border-blue-500/20 bg-[#020D1A]">

      <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">

        <h2 className="text-lg font-bold">
          Class-wise Attendance
        </h2>

        <button className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300">
          View All
          <HiOutlineChevronRight
            size={17}
          />
        </button>

      </div>

      <div className="divide-y divide-white/[0.06]">

        {records.length ===
          0 && (
          <div className="px-5 py-10 text-center text-sm text-white/45">
            No attendance records found.
          </div>
        )}

        {records
          .slice(
            0,
            7
          )
          .map(
            (
              record,
              index
            ) => {

              const image =
                getImage(
                  record
                );

              return (
                <div
                  key={
                    record?.id ||
                    record?.session_id ||
                    index
                  }
                  className="flex items-center gap-3 px-4 py-2.5 transition hover:bg-white/[0.02]"
                >

                  {/* IMAGE */}

                  <div className="h-[58px] w-[104px] shrink-0 overflow-hidden rounded-md">

                    {image ? (
                      <img
                        src={
                          image
                        }
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-900 via-blue-700 to-purple-800">
                        <HiOutlineBookOpen
                          size={25}
                          className="text-white/60"
                        />
                      </div>
                    )}

                  </div>

                  {/* DETAILS */}

                  <div className="min-w-0 flex-1">

                    <h3 className="truncate text-sm font-bold">
                      {
                        getSessionTitle(
                          record
                        )
                      }
                    </h3>

                    <p className="mt-1 truncate text-xs text-white/80">
                      {
                        getClassName(
                          record
                        )
                      }
                    </p>

                    <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-white/60">

                      <span className="flex items-center gap-1">

                        <HiOutlineCalendar
                          size={14}
                        />

                        {
                          formatDate(
                            getDate(
                              record
                            )
                          )
                        }

                      </span>

                      <span className="flex items-center gap-1">

                        <HiOutlineClock
                          size={14}
                        />

                        {
                          formatTimeRange(
                            record
                          )
                        }

                      </span>

                    </div>

                  </div>

                  {/* STATUS */}

                  <div className="hidden shrink-0 sm:block">

                    <StatusBadge
                      status={
                        getStatus(
                          record
                        )
                      }
                    />

                  </div>

                  {/* MOBILE */}

                  <div className="sm:hidden">

                    <StatusBadge
                      status={
                        getStatus(
                          record
                        )
                      }
                    />

                  </div>

                  <button className="hidden h-8 w-8 items-center justify-center text-white/70 hover:text-white md:flex">
                    ⋮
                  </button>

                </div>
              );
            }
          )}

      </div>

    </div>
  );
}

/* =========================================================
   ATTENDANCE INSIGHTS
========================================================= */

function AttendanceInsights({
  records,
}) {
  const monthly =
    useMemo(() => {

      const result =
        {};

      records.forEach(
        record => {

          const date =
            getDate(
              record
            );

          const monthKey =
            getMonthKey(
              date
            );

          if (
            !monthKey
          ) {
            return;
          }

          if (
            !result[
              monthKey
            ]
          ) {
            result[
              monthKey
            ] = {
              total: 0,
              attended: 0,
            };
          }

          result[
            monthKey
          ].total += 1;

          const status =
            getStatus(
              record
            );

          if (
            status ===
              "PRESENT" ||
            status ===
              "LATE"
          ) {
            result[
              monthKey
            ].attended +=
              1;
          }
        }
      );

      return Object.entries(
        result
      )
        .map(
          ([
            key,
            value,
          ]) => {

            const [
              year,
              month,
            ] =
              key.split(
                "-"
              );

            const date =
              new Date(
                Number(
                  year
                ),
                Number(
                  month
                ) -
                  1,
                1
              );

            return {
              key,
              label:
                date.toLocaleDateString(
                  "en-IN",
                  {
                    month:
                      "short",
                  }
                ),
              percentage:
                value.total
                  ? Math.round(
                      (value.attended /
                        value.total) *
                        100
                    )
                  : 0,
            };
          }
        )
        .sort(
          (a, b) =>
            a.key.localeCompare(
              b.key
            )
        )
        .slice(
          -6
        );
    }, [
      records,
    ]);

  const chartData =
    monthly.length
      ? monthly
      : [
          {
            key: "1",
            label: "Apr",
            percentage: 0,
          },
          {
            key: "2",
            label: "May",
            percentage: 0,
          },
          {
            key: "3",
            label: "Jun",
            percentage: 0,
          },
          {
            key: "4",
            label: "Jul",
            percentage: 0,
          },
          {
            key: "5",
            label: "Aug",
            percentage: 0,
          },
          {
            key: "6",
            label: "Sep",
            percentage: 0,
          },
        ];

  return (
    <div className="rounded-xl border border-blue-500/20 bg-[#020D1A] p-4">

      <div className="flex items-center justify-between">

        <h2 className="text-lg font-bold">
          Attendance Insights
        </h2>

        <select className="rounded-lg border border-blue-500/40 bg-[#061426] px-3 py-1.5 text-xs text-white outline-none">

          <option className="bg-[#061426]">
            Monthly
          </option>

          <option className="bg-[#061426]">
            Weekly
          </option>

        </select>

      </div>

      {/* CHART */}

      <div className="mt-5 flex h-[145px] gap-3">

        {/* Y AXIS */}

        <div className="flex flex-col justify-between pb-5 text-[10px] text-white/60">

          <span>
            100%
          </span>

          <span>
            75%
          </span>

          <span>
            50%
          </span>

          <span>
            25%
          </span>

          <span>
            0%
          </span>

        </div>

        {/* GRAPH */}

        <div className="relative flex flex-1 items-end justify-between gap-3 border-b border-white/[0.08]">

          {/* GRID */}

          <div className="pointer-events-none absolute inset-0 flex flex-col justify-between">

            {[0, 1, 2, 3].map(
              item => (
                <div
                  key={
                    item
                  }
                  className="border-t border-white/[0.05]"
                />
              )
            )}

          </div>

          {chartData.map(
            item => {

              const height =
                Math.max(
                  2,
                  Math.min(
                    100,
                    item.percentage
                  )
                );

              return (
                <div
                  key={
                    item.key
                  }
                  className="relative z-10 flex h-full flex-1 flex-col items-center justify-end"
                >

                  <span className="mb-1 text-xs font-medium">
                    {
                      item.percentage
                    }%
                  </span>

                  <div
                    className="w-[28px] max-w-full rounded-t-md bg-gradient-to-t from-blue-600 via-blue-500 to-indigo-400 shadow-[0_0_14px_rgba(30,90,255,.25)]"
                    style={{
                      height: `${height}%`,
                    }}
                  />

                  <span className="mt-2 text-xs text-white/70">
                    {
                      item.label
                    }
                  </span>

                </div>
              );
            }
          )}

        </div>

      </div>

    </div>
  );
}

/* =========================================================
   GUIDELINES
========================================================= */

function AttendanceGuidelines() {
  return (
    <div className="rounded-xl border border-blue-500/20 bg-[#020D1A] p-4">

      <div className="flex gap-4">

        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-600/20 text-blue-400">

          <HiOutlineBookOpen
            size={28}
          />

        </div>

        <div>

          <h2 className="text-base font-bold">
            Attendance Guidelines
          </h2>

          <div className="mt-2 space-y-1.5 text-xs text-white/85">

            <Guideline>
              Try to attend all scheduled classes
              for better learning outcomes.
            </Guideline>

            <Guideline>
              In case you miss a class, you can
              watch the recording.
            </Guideline>

            <Guideline>
              Maintain at least 75% attendance
              to complete the course.
            </Guideline>

            <Guideline>
              Contact your trainer for any
              attendance related queries.
            </Guideline>

          </div>

        </div>

      </div>

    </div>
  );
}

function Guideline({
  children,
}) {
  return (
    <div className="flex items-start gap-2">

      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500" />

      <span>
        {
          children
        }
      </span>

    </div>
  );
}

/* =========================================================
   MAIN
========================================================= */

export default function WebsiteAttendance() {

  const navigate =
    useNavigate();

  const [
    branding,
    setBranding,
  ] = useState(
    DEFAULT_BRANDING
  );

  const [
    student,
    setStudent,
  ] = useState(null);

  const [
    records,
    setRecords,
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
    mobileOpen,
    setMobileOpen,
  ] = useState(false);

  const [
    classFilter,
    setClassFilter,
  ] = useState(
    "ALL"
  );

  const [
    statusFilter,
    setStatusFilter,
  ] = useState(
    "ALL"
  );

  const [
    currentMonth,
    setCurrentMonth,
  ] = useState(
    new Date()
  );

  /* =======================================================
     LOAD LOCAL STUDENT
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
     LOAD BRANDING
  ======================================================= */

  useEffect(() => {

    try {

      const stored =
        localStorage.getItem(
          "websiteBranding"
        );

      if (stored) {

        setBranding(
          normalizeBranding(
            JSON.parse(
              stored
            )
          )
        );

      }

    } catch {
      setBranding(
        DEFAULT_BRANDING
      );
    }

  }, []);

  /* =======================================================
     FETCH ATTENDANCE
  ======================================================= */

  const fetchAttendance =
    async () => {

      try {

        setLoading(
          true
        );

        setError("");

        /*
         * Existing backend service:
         *
         * getStudentAttendanceService(studentId)
         *
         * The frontend sends the logged-in
         * account through the existing API
         * authentication interceptor.
         */

        const response =
          await API.get(
            "/attendance/student"
          );

        const payload =
          response?.data;

        let data =
          null;

        if (
          Array.isArray(
            payload
          )
        ) {
          data =
            payload;
        } else if (
          Array.isArray(
            payload?.data
              ?.attendances
          )
        ) {
          data =
            payload.data
              .attendances;
        } else if (
          Array.isArray(
            payload?.data
              ?.records
          )
        ) {
          data =
            payload.data
              .records;
        } else if (
          Array.isArray(
            payload?.attendances
          )
        ) {
          data =
            payload.attendances;
        } else if (
          Array.isArray(
            payload?.records
          )
        ) {
          data =
            payload.records;
        } else if (
          Array.isArray(
            payload?.data
          )
        ) {
          data =
            payload.data;
        }

        setRecords(
          data || []
        );

      } catch (err) {

        console.error(
          "WEBSITE ATTENDANCE ERROR:",
          err
        );

        setError(
          err?.response
            ?.data?.message ||
          err?.response
            ?.data?.error ||
          "Unable to load attendance."
        );

        setRecords([]);

      } finally {

        setLoading(
          false
        );

      }
    };

  useEffect(() => {
    fetchAttendance();
  }, []);

  /* =======================================================
     CLASS LIST
  ======================================================= */

  const classes =
    useMemo(() => {

      const map =
        new Map();

      records.forEach(
        record => {

          const id =
            pick(
              record?.class?.id,
              record?.class_id,
              getClassName(
                record
              )
            );

          const name =
            getClassName(
              record
            );

          if (
            !map.has(
              String(id)
            )
          ) {
            map.set(
              String(id),
              {
                id,
                name,
              }
            );
          }

        }
      );

      return [
        ...map.values(),
      ];

    }, [
      records,
    ]);

  /* =======================================================
     FILTERED RECORDS
  ======================================================= */

  const filteredRecords =
    useMemo(() => {

      return records.filter(
        record => {

          const classId =
            String(
              pick(
                record?.class?.id,
                record?.class_id,
                getClassName(
                  record
                )
              )
            );

          if (
            classFilter !==
              "ALL" &&
            classId !==
              String(
                classFilter
              )
          ) {
            return false;
          }

          if (
            statusFilter !==
              "ALL" &&
            getStatus(
              record
            ) !==
              statusFilter
          ) {
            return false;
          }

          return true;
        }
      );

    }, [
      records,
      classFilter,
      statusFilter,
    ]);

  /* =======================================================
     SUMMARY
  ======================================================= */

  const summary =
    useMemo(() => {

      const total =
        filteredRecords.length;

      const present =
        filteredRecords.filter(
          record =>
            getStatus(
              record
            ) ===
            "PRESENT"
        ).length;

      const absent =
        filteredRecords.filter(
          record =>
            getStatus(
              record
            ) ===
            "ABSENT"
        ).length;

      const late =
        filteredRecords.filter(
          record =>
            getStatus(
              record
            ) ===
            "LATE"
        ).length;

      const percentage =
        total
          ? Math.round(
              ((present +
                late) /
                total) *
                100
            )
          : 0;

      return {
        total,
        present,
        absent,
        late,
        percentage,
      };

    }, [
      filteredRecords,
    ]);

  /* =======================================================
     CURRENT MONTH RECORDS
  ======================================================= */

  const currentMonthRecords =
    useMemo(() => {

      const monthKey =
        `${currentMonth.getFullYear()}-${String(
          currentMonth.getMonth() +
            1
        ).padStart(
          2,
          "0"
        )}`;

      return filteredRecords.filter(
        record =>
          getMonthKey(
            getDate(
              record
            )
          ) ===
          monthKey
      );

    }, [
      filteredRecords,
      currentMonth,
    ]);

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

        <main className="px-4 py-5 sm:px-6 lg:px-7">

          {/* =================================================
              PAGE HEADER
          ================================================= */}

          <section className="border-b border-white/[0.06] pb-4">

            <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">

              <div>

                <h1
                  className="text-4xl font-bold tracking-tight sm:text-[42px]"
                  style={{
                    fontFamily:
                      `'${branding.fontHeading}', sans-serif`,
                  }}
                >
                  Atten
                  <span className="text-blue-500">
                    dance
                  </span>
                </h1>

                <p className="mt-1 text-base text-white/90">
                  Track your class attendance and
                  maintain your learning consistency.
                </p>

              </div>

              {/* BANNER */}

              <div className="relative flex min-h-[100px] w-full max-w-[465px] items-center overflow-hidden rounded-xl bg-gradient-to-r from-[#3825FF] via-[#2616F3] to-[#6D00F5] px-6">

                <div className="mr-5 flex h-14 w-14 shrink-0 items-center justify-center">

                  <HiOutlineCalendar
                    size={48}
                    className="text-white"
                  />

                </div>

                <div className="relative z-10">

                  <h2 className="text-lg font-bold">
                    Show Up, Grow Up!
                  </h2>

                  <p className="mt-1 max-w-[260px] text-xs leading-4 text-white/85">
                    Regular practice brings progress
                    in every performance.
                  </p>

                </div>

                <div className="absolute -bottom-8 -right-3 text-[120px] leading-none text-white/10">
                  ♫
                </div>

              </div>

            </div>

          </section>

          {/* =================================================
              FILTERS
          ================================================= */}

          <section className="mt-3">

            <div className="flex flex-col gap-3 xl:flex-row xl:items-center">

              {/* CLASS TABS */}

              <div className="flex min-w-0 flex-1 gap-2 overflow-x-auto pb-1">

                <button
                  onClick={() =>
                    setClassFilter(
                      "ALL"
                    )
                  }
                  className={`
                    flex h-[43px]
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    px-7
                    text-sm
                    font-medium
                    transition-all
                    ${
                      classFilter ===
                      "ALL"
                        ? "border-transparent bg-gradient-to-r from-[#4923FF] to-[#007BFF] shadow-[0_0_22px_rgba(30,100,255,.28)]"
                        : "border-blue-500/20 bg-transparent text-white/85"
                    }
                  `}
                >
                  All Classes
                </button>

                {classes.map(
                  item => {

                    const active =
                      String(
                        classFilter
                      ) ===
                      String(
                        item.id
                      );

                    return (
                      <button
                        key={
                          item.id
                        }
                        onClick={() =>
                          setClassFilter(
                            item.id
                          )
                        }
                        className={`
                          flex h-[43px]
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          border
                          px-7
                          text-sm
                          font-medium
                          transition-all
                          ${
                            active
                              ? "border-transparent bg-gradient-to-r from-[#4923FF] to-[#007BFF]"
                              : "border-blue-500/20 bg-transparent text-white/85 hover:border-blue-500/50"
                          }
                        `}
                      >
                        {
                          item.name
                        }
                      </button>
                    );
                  }
                )}

              </div>

              {/* MONTH */}

              <div className="relative w-full xl:w-[270px]">

                <HiOutlineCalendar
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/75"
                  size={20}
                />

                <select
                  value={`${currentMonth.getFullYear()}-${currentMonth.getMonth()}`}
                  onChange={event => {

                    const [
                      year,
                      month,
                    ] =
                      event.target.value
                        .split(
                          "-"
                        )
                        .map(
                          Number
                        );

                    setCurrentMonth(
                      new Date(
                        year,
                        month,
                        1
                      )
                    );
                  }}
                  className="h-[43px] w-full appearance-none rounded-lg border border-purple-400/50 bg-[#061426] pl-10 pr-8 text-sm text-white outline-none"
                >

                  {Array.from(
                    {
                      length: 12,
                    },
                    (
                      _,
                      index
                    ) => {

                      const date =
                        new Date();

                      date.setMonth(
                        date.getMonth() -
                          index
                      );

                      const year =
                        date.getFullYear();

                      const month =
                        date.getMonth();

                      return (
                        <option
                          key={`${year}-${month}`}
                          value={`${year}-${month}`}
                          className="bg-[#061426]"
                        >
                          {date.toLocaleDateString(
                            "en-IN",
                            {
                              month:
                                "long",
                              year:
                                "numeric",
                            }
                          )}
                        </option>
                      );
                    }
                  )}

                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                  ⌄
                </span>

              </div>

              {/* STATUS */}

              <div className="relative w-full xl:w-[215px]">

                <HiOutlineAdjustments
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/75"
                  size={19}
                />

                <select
                  value={
                    statusFilter
                  }
                  onChange={event =>
                    setStatusFilter(
                      event.target
                        .value
                    )
                  }
                  className="h-[43px] w-full appearance-none rounded-lg border border-purple-400/50 bg-[#061426] pl-10 pr-8 text-sm text-white outline-none"
                >

                  <option
                    value="ALL"
                    className="bg-[#061426]"
                  >
                    All Status
                  </option>

                  <option
                    value="PRESENT"
                    className="bg-[#061426]"
                  >
                    Present
                  </option>

                  <option
                    value="ABSENT"
                    className="bg-[#061426]"
                  >
                    Absent
                  </option>

                  <option
                    value="LATE"
                    className="bg-[#061426]"
                  >
                    Late
                  </option>

                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                  ⌄
                </span>

              </div>

            </div>

          </section>

          {/* =================================================
              SUMMARY
          ================================================= */}

          <section className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">

            <SummaryCard
              type="total"
              number={
                currentMonthRecords.length
              }
              label="Total Classes"
              percentage="This Month"
            />

            <SummaryCard
              type="present"
              number={
                summary.present
              }
              label="Present"
              percentage={
                `${summary.percentage}%`
              }
              icon={
                <HiOutlineCheck />
              }
            />

            <SummaryCard
              type="absent"
              number={
                summary.absent
              }
              label="Absent"
              percentage={
                summary.total
                  ? `${Math.round(
                      (summary.absent /
                        summary.total) *
                        100
                    )}%`
                  : "0%"
              }
              icon={
                <span className="text-[27px] font-bold">
                  ×
                </span>
              }
            />

            <SummaryCard
              type="late"
              number={
                summary.late
              }
              label="Late"
              percentage={
                summary.total
                  ? `${Math.round(
                      (summary.late /
                        summary.total) *
                        100
                    )}%`
                  : "0%"
              }
              icon={
                <HiOutlineClock />
              }
            />

          </section>

          {/* =================================================
              MAIN GRID
          ================================================= */}

          <section className="mt-3 grid gap-4 xl:grid-cols-[425px_minmax(0,1fr)]">

            {/* LEFT */}

            <div className="space-y-3">

              <AttendanceCalendar
                currentMonth={
                  currentMonth
                }
                setCurrentMonth={
                  setCurrentMonth
                }
                records={
                  filteredRecords
                }
              />

              <AttendanceInsights
                records={
                  filteredRecords
                }
              />

            </div>

            {/* RIGHT */}

            <div className="space-y-3">

              <ClassWiseAttendance
                records={
                  filteredRecords
                }
              />

              <AttendanceGuidelines />

            </div>

          </section>

          {/* =================================================
              LOADING
          ================================================= */}

          {loading && (
            <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/40 backdrop-blur-[2px]">

              <div className="rounded-xl border border-blue-500/20 bg-[#061426] px-8 py-7 text-center shadow-2xl">

                <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-500/20 border-t-blue-500" />

                <p className="mt-4 text-sm text-white/65">
                  Loading attendance...
                </p>

              </div>

            </div>
          )}

          {/* =================================================
              ERROR
          ================================================= */}

          {!loading &&
            error && (
              <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/5 p-6 text-center">

                <p className="text-sm text-red-300">
                  {
                    error
                  }
                </p>

                <button
                  onClick={
                    fetchAttendance
                  }
                  className="mt-4 rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold"
                >
                  Try Again
                </button>

              </div>
            )}

        </main>

      </div>

    </div>
  );
}