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
  HiOutlineUpload,
  HiOutlineChatAlt2,
  HiOutlineChevronRight,
  HiOutlineFilter,
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

const getAssignmentTitle = (
  assignment
) =>
  pick(
    assignment?.title,
    assignment?.assignment_title,
    "Assignment"
  );

const getClassName = (
  assignment
) =>
  pick(
    assignment?.class_name,
    assignment?.class_title,
    assignment?.class?.title,
    assignment?.class?.name,
    "Course"
  );

const getDescription = (
  assignment
) =>
  pick(
    assignment?.description,
    "Complete the assigned practice and submit your work."
  );

const getDueDate = (
  assignment
) =>
  pick(
    assignment?.due_date,
    assignment?.deadline
  );

const getAssignedDate = (
  assignment
) =>
  pick(
    assignment?.assigned_at,
    assignment?.created_at
  );

const getMarks = (
  assignment
) =>
  pick(
    assignment?.submission?.marks,
    assignment?.marks,
    null
  );

const getMaxMarks = (
  assignment
) =>
  Number(
    pick(
      assignment?.max_marks,
      0
    ) || 0
  );

const getStatus = (
  assignment
) => {
  const status =
    String(
      pick(
        assignment?.status,
        assignment?.submission?.status,
        "PENDING"
      )
    ).toUpperCase();

  if (
    status === "REVIEWED" ||
    status === "GRADED"
  ) {
    return "GRADED";
  }

  if (
    status === "SUBMITTED"
  ) {
    return "SUBMITTED";
  }

  return "PENDING";
};

const formatDate = value => {
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
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
};

const formatDateShort = value => {
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
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
};

const getAssignmentImage = (
  assignment,
  index
) => {
  const image =
    pick(
      assignment?.image,
      assignment?.image_url,
      assignment?.class_image,
      assignment?.class?.image,
      assignment?.thumbnail,
      assignment?.thumbnail_url
    );

  if (image) {
    return image;
  }

  /*
   * Fallback visual backgrounds.
   * Real class/assignment images are used whenever
   * the backend provides them.
   */

  const backgrounds = [
    "from-orange-700 via-orange-500 to-yellow-500",
    "from-purple-900 via-purple-700 to-blue-600",
    "from-orange-700 via-red-600 to-yellow-500",
    "from-orange-400 via-pink-500 to-purple-700",
    "from-blue-900 via-blue-600 to-purple-700",
  ];

  return backgrounds[
    index %
      backgrounds.length
  ];
};

const getDaysUntilDue = (
  dueDate
) => {
  if (!dueDate) {
    return null;
  }

  const due =
    new Date(
      dueDate
    );

  if (
    Number.isNaN(
      due.getTime()
    )
  ) {
    return null;
  }

  const now =
    new Date();

  const diff =
    due.getTime() -
    now.getTime();

  return Math.ceil(
    diff /
      (1000 *
        60 *
        60 *
        24)
  );
};

const isOverdue = (
  assignment
) => {
  if (
    getStatus(
      assignment
    ) !== "PENDING"
  ) {
    return false;
  }

  const days =
    getDaysUntilDue(
      getDueDate(
        assignment
      )
    );

  return (
    days !== null &&
    days < 0
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
  const menu = [
    {
      label: "Dashboard",
      icon:
        <HiOutlineHome />,
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

        {/* NAVIGATION */}

        <nav className="flex-1 overflow-y-auto px-4 py-6">

          <div className="space-y-2">

            {menu.map(item => {

              const active =
                item.label ===
                "Assignments";

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

        {/* MOBILE */}

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
            placeholder="Search assignments, courses or trainers..."
            className="h-12 w-full rounded-xl border border-blue-500/20 bg-[#061426] pl-12 pr-4 text-sm text-white outline-none placeholder:text-white/50 focus:border-blue-500/50"
          />

        </div>

        <div className="ml-auto flex h-full items-center">

          {/* NOTIFICATIONS */}

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
  if (
    status ===
    "GRADED"
  ) {
    return (
      <span className="rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-5 py-2 text-xs font-bold text-white">
        Graded
      </span>
    );
  }

  if (
    status ===
    "SUBMITTED"
  ) {
    return (
      <span className="rounded-full bg-emerald-500 px-5 py-2 text-xs font-bold text-white">
        Submitted
      </span>
    );
  }

  return (
    <span className="rounded-full bg-pink-500 px-5 py-2 text-xs font-bold text-white">
      Pending
    </span>
  );
}

/* =========================================================
   ASSIGNMENT IMAGE
========================================================= */

function AssignmentImage({
  assignment,
  index,
}) {
  const image =
    pick(
      assignment?.image,
      assignment?.image_url,
      assignment?.class_image,
      assignment?.class?.image,
      assignment?.thumbnail,
      assignment?.thumbnail_url
    );

  if (image) {
    return (
      <img
        src={
          image
        }
        alt=""
        className="h-full w-full object-cover"
      />
    );
  }

  const backgrounds = [
    "from-orange-700 via-orange-500 to-yellow-500",
    "from-purple-900 via-purple-700 to-blue-600",
    "from-orange-700 via-red-600 to-yellow-500",
    "from-orange-400 via-pink-500 to-purple-700",
    "from-blue-900 via-blue-600 to-purple-700",
  ];

  return (
    <div
      className={`
        flex h-full w-full
        items-center justify-center
        bg-gradient-to-br
        ${backgrounds[
          index %
            backgrounds.length
        ]}
      `}
    >
      <HiOutlineDocumentText
        size={54}
        className="text-white/50"
      />
    </div>
  );
}

/* =========================================================
   ASSIGNMENT CARD
========================================================= */

function AssignmentCard({
  assignment,
  index,
  navigate,
  onSubmit,
}) {
  const status =
    getStatus(
      assignment
    );

  const overdue =
    isOverdue(
      assignment
    );

  const title =
    getAssignmentTitle(
      assignment
    );

  const className =
    getClassName(
      assignment
    );

  const description =
    getDescription(
      assignment
    );

  const assignedDate =
    getAssignedDate(
      assignment
    );

  const dueDate =
    getDueDate(
      assignment
    );

  const marks =
    getMarks(
      assignment
    );

  const maxMarks =
    getMaxMarks(
      assignment
    );

  const assignmentId =
    pick(
      assignment?.id,
      assignment?.assignment_id
    );

  const openDetails =
    () => {
      if (
        assignmentId
      ) {
        navigate(
          `/institute/website/preview/lms/assignments/${assignmentId}`
        );
      }
    };

  const action =
    () => {
      if (
        status ===
        "PENDING"
      ) {
        onSubmit(
          assignment
        );
        return;
      }

      openDetails();
    };

  return (
    <div className="group relative overflow-hidden rounded-xl border border-blue-500/20 bg-[#020D1A] transition-all duration-300 hover:border-blue-500/45 hover:bg-[#031426]">

      <div className="absolute left-0 top-0 h-[1px] w-full bg-gradient-to-r from-blue-500/50 via-blue-400/20 to-transparent" />

      <div className="flex flex-col gap-4 p-3 sm:p-4 lg:flex-row lg:items-center">

        {/* IMAGE */}

        <div className="h-[135px] w-full shrink-0 overflow-hidden rounded-lg sm:h-[125px] sm:w-[205px]">

          <AssignmentImage
            assignment={
              assignment
            }
            index={
              index
            }
          />

        </div>

        {/* CONTENT */}

        <div className="min-w-0 flex-1">

          <h2 className="truncate text-[17px] font-bold text-white sm:text-[18px]">
            {
              title
            }
          </h2>

          <p className="mt-1 truncate text-[15px] font-medium text-blue-400">
            {
              className
            }
          </p>

          <div className="mt-2 flex items-start gap-3">

            <HiOutlineDocumentText
              size={21}
              className="mt-0.5 shrink-0 text-white"
            />

            <p className="line-clamp-2 text-sm leading-5 text-white/85">
              {
                description
              }
            </p>

          </div>

          <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">

            <div className="flex items-center gap-2 text-white/75">

              <HiOutlineCalendar
                size={18}
              />

              <span>
                Assigned:{" "}
                <span className="text-white">
                  {
                    formatDate(
                      assignedDate
                    )
                  }
                </span>
              </span>

            </div>

            <div className={`flex items-center gap-2 ${
              overdue
                ? "text-red-400"
                : "text-white/75"
            }`}>

              <HiOutlineClock
                size={18}
              />

              <span>
                Due:{" "}
                <span className="text-white">
                  {
                    formatDate(
                      dueDate
                    )
                  }
                </span>
              </span>

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="flex shrink-0 flex-col items-stretch gap-3 lg:w-[195px]">

          <div className="flex items-center justify-between gap-3 lg:justify-end">

            <StatusBadge
              status={
                status
              }
            />

            {status ===
              "GRADED" &&
              marks !==
                null && (
                <div className="flex items-center gap-1 text-sm font-semibold">

                  <span className="text-yellow-400">
                    ★
                  </span>

                  <span>
                    {
                      marks
                    }
                    {maxMarks
                      ? ` / ${maxMarks}`
                      : ""}
                  </span>

                </div>
              )}

          </div>

          {status ===
            "PENDING" && (
            <button
              onClick={
                action
              }
              className="flex h-[44px] items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-sm font-semibold text-white shadow-[0_8px_25px_rgba(0,100,255,.25)] transition hover:from-blue-500 hover:to-blue-400"
            >

              <HiOutlineUpload
                size={19}
              />

              Upload Assignment

            </button>
          )}

          {status ===
            "SUBMITTED" && (
            <button
              onClick={
                action
              }
              className="flex h-[44px] items-center justify-center gap-2 rounded-lg border border-blue-500/70 text-sm font-semibold text-blue-400 transition hover:bg-blue-500/10"
            >

              <HiOutlineEye
                size={19}
              />

              View Submission

            </button>
          )}

          {status ===
            "GRADED" && (
            <button
              onClick={
                action
              }
              className="flex h-[44px] items-center justify-center gap-2 rounded-lg border border-blue-500/70 text-sm font-semibold text-blue-400 transition hover:bg-blue-500/10"
            >

              <HiOutlineChatAlt2
                size={19}
              />

              View Feedback

            </button>
          )}

        </div>

      </div>
    </div>
  );
}

/* =========================================================
   SUMMARY CARD
========================================================= */

function AssignmentSummary({
  assignments,
}) {
  const counts =
    useMemo(() => {

      const result = {
        pending: 0,
        submitted: 0,
        graded: 0,
        overdue: 0,
      };

      assignments.forEach(
        assignment => {

          const status =
            getStatus(
              assignment
            );

          if (
            status ===
            "PENDING"
          ) {
            result.pending +=
              1;
          }

          if (
            status ===
            "SUBMITTED"
          ) {
            result.submitted +=
              1;
          }

          if (
            status ===
            "GRADED"
          ) {
            result.graded +=
              1;
          }

          if (
            isOverdue(
              assignment
            )
          ) {
            result.overdue +=
              1;
          }
        }
      );

      return result;
    }, [
      assignments,
    ]);

  const total =
    assignments.length;

  const radius =
    44;

  const circumference =
    2 *
    Math.PI *
    radius;

  const pendingLength =
    total
      ? (counts.pending /
          total) *
        circumference
      : 0;

  const submittedLength =
    total
      ? (counts.submitted /
          total) *
        circumference
      : 0;

  const gradedLength =
    total
      ? (counts.graded /
          total) *
        circumference
      : 0;

  return (
    <div className="rounded-xl border border-blue-500/20 bg-[#020D1A] p-5">

      <h2 className="text-[16px] font-bold">
        Assignment Summary
      </h2>

      <div className="mt-5 flex items-center gap-5">

        {/* DONUT */}

        <div className="relative h-[125px] w-[125px] shrink-0">

          <svg
            width="125"
            height="125"
            viewBox="0 0 125 125"
            className="-rotate-90"
          >

            <circle
              cx="62.5"
              cy="62.5"
              r={radius}
              fill="none"
              stroke="#14243A"
              strokeWidth="12"
            />

            {total > 0 && (
              <>
                <circle
                  cx="62.5"
                  cy="62.5"
                  r={radius}
                  fill="none"
                  stroke="#F72563"
                  strokeWidth="12"
                  strokeDasharray={`${pendingLength} ${circumference}`}
                  strokeLinecap="butt"
                />

                <circle
                  cx="62.5"
                  cy="62.5"
                  r={radius}
                  fill="none"
                  stroke="#008CFF"
                  strokeWidth="12"
                  strokeDasharray={`${submittedLength} ${circumference}`}
                  strokeDashoffset={
                    -pendingLength
                  }
                  strokeLinecap="butt"
                />

                <circle
                  cx="62.5"
                  cy="62.5"
                  r={radius}
                  fill="none"
                  stroke="#7625FF"
                  strokeWidth="12"
                  strokeDasharray={`${gradedLength} ${circumference}`}
                  strokeDashoffset={
                    -(
                      pendingLength +
                      submittedLength
                    )
                  }
                  strokeLinecap="butt"
                />
              </>
            )}

          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">

            <span className="text-2xl font-bold">
              {
                total
              }
            </span>

            <span className="text-xs text-white/70">
              Total
            </span>

          </div>

        </div>

        {/* LEGEND */}

        <div className="space-y-3 text-sm">

          <SummaryLegend
            color="bg-pink-500"
            label="Pending"
            value={
              counts.pending
            }
          />

          <SummaryLegend
            color="bg-blue-500"
            label="Submitted"
            value={
              counts.submitted
            }
          />

          <SummaryLegend
            color="bg-purple-500"
            label="Graded"
            value={
              counts.graded
            }
          />

          <SummaryLegend
            color="bg-slate-500"
            label="Overdue"
            value={
              counts.overdue
            }
          />

        </div>

      </div>

    </div>
  );
}

function SummaryLegend({
  color,
  label,
  value,
}) {
  return (
    <div className="flex items-center gap-3">

      <span
        className={`h-3 w-3 rounded-full ${color}`}
      />

      <span className="w-[65px] text-white/85">
        {
          label
        }
      </span>

      <span className="font-semibold">
        {
          value
        }
      </span>

    </div>
  );
}

/* =========================================================
   DUE SOON
========================================================= */

function DueSoon({
  assignments,
  navigate,
}) {
  const list =
    useMemo(() => {

      return [...assignments]
        .filter(
          assignment =>
            getStatus(
              assignment
            ) === "PENDING"
        )
        .sort(
          (a, b) => {

            const dateA =
              new Date(
                getDueDate(
                  a
                ) || 0
              ).getTime();

            const dateB =
              new Date(
                getDueDate(
                  b
                ) || 0
              ).getTime();

            return (
              dateA -
              dateB
            );
          }
        )
        .slice(
          0,
          3
        );
    }, [
      assignments,
    ]);

  return (
    <div className="rounded-xl border border-blue-500/20 bg-[#020D1A]">

      <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">

        <h2 className="text-[16px] font-bold">
          Due Soon
        </h2>

        <button
          onClick={() =>
            navigate(
              "#"
            )
          }
          className="text-sm text-blue-400 hover:text-blue-300"
        >
          View All
        </button>

      </div>

      <div className="p-3">

        {list.length ===
          0 && (
          <div className="px-2 py-6 text-center text-sm text-white/45">
            No pending assignments.
          </div>
        )}

        {list.map(
          (
            assignment,
            index
          ) => {

            const title =
              getAssignmentTitle(
                assignment
              );

            const shortTitle =
              title
                .replace(
                  /^Assignment\s*\d+\s*[–-]\s*/i,
                  ""
                );

            const image =
              pick(
                assignment?.image,
                assignment?.image_url,
                assignment?.class_image,
                assignment?.class?.image,
                assignment?.thumbnail,
                assignment?.thumbnail_url
              );

            const id =
              pick(
                assignment?.id,
                assignment?.assignment_id
              );

            return (
              <button
                key={
                  id ||
                  index
                }
                onClick={() => {
                  if (
                    id
                  ) {
                    navigate(
                      `/institute/website/preview/lms/assignments/${id}`
                    );
                  }
                }}
                className="flex w-full items-center gap-3 rounded-lg p-2 text-left transition hover:bg-white/[0.04]"
              >

                <div className="h-[54px] w-[58px] shrink-0 overflow-hidden rounded-md">

                  {image ? (
                    <img
                      src={
                        image
                      }
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-900 to-purple-700">
                      <HiOutlineDocumentText
                        size={22}
                        className="text-white/60"
                      />
                    </div>
                  )}

                </div>

                <div className="min-w-0 flex-1">

                  <p className="truncate text-sm font-semibold">
                    {
                      shortTitle
                    }
                  </p>

                  <p className="mt-1 text-xs text-white/65">
                    Due:{" "}
                    {
                      formatDateShort(
                        getDueDate(
                          assignment
                        )
                      )
                    }
                  </p>

                </div>

                <HiOutlineChevronRight
                  size={18}
                  className="shrink-0 text-white/70"
                />

              </button>
            );
          }
        )}

      </div>

    </div>
  );
}

/* =========================================================
   FILTERS
========================================================= */

function FilterCard({
  assignments,
  courseFilter,
  setCourseFilter,
  statusFilter,
  setStatusFilter,
  dueFilter,
  setDueFilter,
}) {
  const courses =
    useMemo(() => {

      const set =
        new Set();

      assignments.forEach(
        assignment => {

          const course =
            getClassName(
              assignment
            );

          if (
            course
          ) {
            set.add(
              course
            );
          }
        }
      );

      return [
        ...set,
      ];
    }, [
      assignments,
    ]);

  return (
    <div className="rounded-xl border border-blue-500/20 bg-[#020D1A] p-5">

      <div className="flex items-center gap-2">

        <HiOutlineFilter
          size={18}
          className="text-blue-400"
        />

        <h2 className="text-[16px] font-bold">
          Filters
        </h2>

      </div>

      {/* COURSE */}

      <label className="mt-5 block text-sm text-white/80">
        Course
      </label>

      <select
        value={
          courseFilter
        }
        onChange={event =>
          setCourseFilter(
            event.target
              .value
          )
        }
        className="mt-2 h-[43px] w-full rounded-lg border border-blue-500/40 bg-[#061426] px-3 text-sm text-white outline-none"
      >

        <option
          value="ALL"
          className="bg-[#061426]"
        >
          All Courses
        </option>

        {courses.map(
          course => (
            <option
              key={
                course
              }
              value={
                course
              }
              className="bg-[#061426]"
            >
              {
                course
              }
            </option>
          )
        )}

      </select>

      {/* STATUS */}

      <label className="mt-4 block text-sm text-white/80">
        Status
      </label>

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
        className="mt-2 h-[43px] w-full rounded-lg border border-blue-500/40 bg-[#061426] px-3 text-sm text-white outline-none"
      >

        <option
          value="ALL"
          className="bg-[#061426]"
        >
          All Status
        </option>

        <option
          value="PENDING"
          className="bg-[#061426]"
        >
          Pending
        </option>

        <option
          value="SUBMITTED"
          className="bg-[#061426]"
        >
          Submitted
        </option>

        <option
          value="GRADED"
          className="bg-[#061426]"
        >
          Graded
        </option>

      </select>

      {/* DUE DATE */}

      <label className="mt-4 block text-sm text-white/80">
        Due Date
      </label>

      <select
        value={
          dueFilter
        }
        onChange={event =>
          setDueFilter(
            event.target
              .value
          )
        }
        className="mt-2 h-[43px] w-full rounded-lg border border-blue-500/40 bg-[#061426] px-3 text-sm text-white outline-none"
      >

        <option
          value="ALL"
          className="bg-[#061426]"
        >
          All Dates
        </option>

        <option
          value="TODAY"
          className="bg-[#061426]"
        >
          Due Today
        </option>

        <option
          value="WEEK"
          className="bg-[#061426]"
        >
          Due This Week
        </option>

        <option
          value="OVERDUE"
          className="bg-[#061426]"
        >
          Overdue
        </option>

      </select>

    </div>
  );
}

/* =========================================================
   SUBMIT MODAL
========================================================= */

function SubmitModal({
  assignment,
  onClose,
  onSubmit,
  submitting,
}) {
  const [
    text,
    setText,
  ] = useState("");

  const [
    url,
    setUrl,
  ] = useState("");

  if (!assignment) {
    return null;
  }

  const title =
    getAssignmentTitle(
      assignment
    );

  const submit =
    () => {

      onSubmit(
        assignment,
        {
          submission_text:
            text.trim() ||
            null,

          submission_url:
            url.trim() ||
            null,
        }
      );
    };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">

      <div className="w-full max-w-[560px] overflow-hidden rounded-2xl border border-blue-500/25 bg-[#061426] shadow-[0_25px_80px_rgba(0,0,0,.6)]">

        <div className="flex items-center justify-between border-b border-white/[0.08] px-6 py-5">

          <div>
            <h2 className="text-xl font-bold">
              Upload Assignment
            </h2>

            <p className="mt-1 text-sm text-white/50">
              {
                title
              }
            </p>
          </div>

          <button
            onClick={
              onClose
            }
            className="rounded-lg p-2 text-white/60 hover:bg-white/[0.05]"
          >
            <HiOutlineX
              size={22}
            />
          </button>

        </div>

        <div className="space-y-5 p-6">

          <div>

            <label className="text-sm font-medium text-white/80">
              Your Answer
            </label>

            <textarea
              value={
                text
              }
              onChange={event =>
                setText(
                  event.target
                    .value
                )
              }
              rows={6}
              placeholder="Write your answer here..."
              className="mt-2 w-full resize-none rounded-xl border border-blue-500/25 bg-[#020D1A] p-4 text-sm text-white outline-none placeholder:text-white/35 focus:border-blue-500/60"
            />

          </div>

          <div>

            <label className="text-sm font-medium text-white/80">
              Submission File URL
            </label>

            <input
              value={
                url
              }
              onChange={event =>
                setUrl(
                  event.target
                    .value
                )
              }
              placeholder="https://..."
              className="mt-2 h-12 w-full rounded-xl border border-blue-500/25 bg-[#020D1A] px-4 text-sm text-white outline-none placeholder:text-white/35 focus:border-blue-500/60"
            />

            <p className="mt-2 text-xs text-white/40">
              You can provide a file URL if your
              submission is stored online.
            </p>

          </div>

        </div>

        <div className="flex justify-end gap-3 border-t border-white/[0.08] px-6 py-4">

          <button
            onClick={
              onClose
            }
            className="rounded-lg border border-white/10 px-5 py-2.5 text-sm font-semibold text-white/75 hover:bg-white/[0.05]"
          >
            Cancel
          </button>

          <button
            disabled={
              submitting
            }
            onClick={
              submit
            }
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-2.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50"
          >

            <HiOutlineUpload
              size={18}
            />

            {submitting
              ? "Submitting..."
              : "Submit Assignment"}

          </button>

        </div>

      </div>
    </div>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function WebsiteAssignments() {

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
    assignments,
    setAssignments,
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
    sortOrder,
    setSortOrder,
  ] = useState(
    "NEWEST"
  );

  const [
    courseFilter,
    setCourseFilter,
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
    dueFilter,
    setDueFilter,
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

  const [
    submitAssignment,
    setSubmitAssignment,
  ] = useState(null);

  const [
    submitting,
    setSubmitting,
  ] = useState(false);

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
     FETCH ASSIGNMENTS
  ======================================================= */

  const fetchAssignments =
    async () => {

      try {

        setLoading(
          true
        );

        setError("");

        /*
         * API base URL already contains /api.
         *
         * GET:
         * /api/assignments/my-assignments
         */

        const response =
          await API.get(
            "/assignments/my-assignments"
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
            data?.data?.assignments
          )
        ) {
          list =
            data.data.assignments;
        } else if (
          Array.isArray(
            data?.assignments
          )
        ) {
          list =
            data.assignments;
        } else if (
          Array.isArray(
            data?.data
          )
        ) {
          list =
            data.data;
        }

        setAssignments(
          list
        );

      } catch (err) {

        console.error(
          "STUDENT ASSIGNMENTS ERROR:",
          err
        );

        setError(
          err?.response
            ?.data?.message ||
          err?.response
            ?.data?.error ||
          "Unable to load assignments."
        );

        setAssignments([]);

      } finally {

        setLoading(
          false
        );

      }
    };

  useEffect(() => {
    fetchAssignments();
  }, []);

  /* =======================================================
     COUNTS
  ======================================================= */

  const counts =
    useMemo(() => {

      const result = {
        ALL: assignments.length,
        PENDING: 0,
        SUBMITTED: 0,
        GRADED: 0,
      };

      assignments.forEach(
        assignment => {

          const status =
            getStatus(
              assignment
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
      assignments,
    ]);

  /* =======================================================
     FILTERED ASSIGNMENTS
  ======================================================= */

  const filteredAssignments =
    useMemo(() => {

      let list =
        assignments.filter(
          assignment => {

            const status =
              getStatus(
                assignment
              );

            /* TAB */

            if (
              activeTab !==
                "ALL" &&
              status !==
                activeTab
            ) {
              return false;
            }

            /* STATUS FILTER */

            if (
              statusFilter !==
                "ALL" &&
              status !==
                statusFilter
            ) {
              return false;
            }

            /* COURSE */

            if (
              courseFilter !==
                "ALL" &&
              getClassName(
                assignment
              ) !==
                courseFilter
            ) {
              return false;
            }

            /* DUE DATE */

            if (
              dueFilter !==
              "ALL"
            ) {

              const days =
                getDaysUntilDue(
                  getDueDate(
                    assignment
                  )
                );

              if (
                dueFilter ===
                  "TODAY" &&
                days !==
                  0
              ) {
                return false;
              }

              if (
                dueFilter ===
                  "WEEK" &&
                (
                  days ===
                    null ||
                  days < 0 ||
                  days > 7
                )
              ) {
                return false;
              }

              if (
                dueFilter ===
                  "OVERDUE" &&
                !isOverdue(
                  assignment
                )
              ) {
                return false;
              }
            }

            /* SEARCH */

            const keyword =
              search
                .trim()
                .toLowerCase();

            if (
              keyword
            ) {

              const title =
                getAssignmentTitle(
                  assignment
                ).toLowerCase();

              const course =
                getClassName(
                  assignment
                ).toLowerCase();

              const description =
                getDescription(
                  assignment
                ).toLowerCase();

              if (
                !title.includes(
                  keyword
                ) &&
                !course.includes(
                  keyword
                ) &&
                !description.includes(
                  keyword
                )
              ) {
                return false;
              }
            }

            return true;
          }
        );

      list = [
        ...list,
      ];

      list.sort(
        (a, b) => {

          const dateA =
            new Date(
              getDueDate(
                a
              ) ||
              getAssignedDate(
                a
              ) ||
              0
            ).getTime();

          const dateB =
            new Date(
              getDueDate(
                b
              ) ||
              getAssignedDate(
                b
              ) ||
              0
            ).getTime();

          return sortOrder ===
            "NEWEST"
            ? dateB - dateA
            : dateA - dateB;
        }
      );

      return list;

    }, [
      assignments,
      activeTab,
      statusFilter,
      courseFilter,
      dueFilter,
      search,
      sortOrder,
    ]);

  /* =======================================================
     SUBMIT
  ======================================================= */

  const handleSubmit =
    async (
      assignment,
      payload
    ) => {

      const id =
        pick(
          assignment?.id,
          assignment?.assignment_id
        );

      if (!id) {
        return;
      }

      try {

        setSubmitting(
          true
        );

        await API.post(
          `/assignments/${id}/submit`,
          payload
        );

        setSubmitAssignment(
          null
        );

        await fetchAssignments();

      } catch (err) {

        console.error(
          "SUBMIT ASSIGNMENT ERROR:",
          err
        );

        alert(
          err?.response
            ?.data?.message ||
          err?.response
            ?.data?.error ||
          "Failed to submit assignment."
        );

      } finally {

        setSubmitting(
          false
        );

      }
    };

  /* =======================================================
     TABS
  ======================================================= */

  const tabs = [
    {
      key: "ALL",
      label: "All",
      count:
        counts.ALL,
    },

    {
      key: "PENDING",
      label: "Pending",
      count:
        counts.PENDING,
    },

    {
      key: "SUBMITTED",
      label: "Submitted",
      count:
        counts.SUBMITTED,
    },

    {
      key: "GRADED",
      label: "Graded",
      count:
        counts.GRADED,
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
                  Assign
                  <span className="text-blue-500">
                    ments
                  </span>
                </h1>

                <p className="mt-1 text-base text-white/90">
                  Complete your assignments to practice,
                  get feedback and track your progress.
                </p>

              </div>

              {/* BANNER */}

              <div className="relative flex min-h-[102px] w-full max-w-[460px] items-center overflow-hidden rounded-xl bg-gradient-to-r from-[#3825FF] via-[#2616F3] to-[#6D00F5] px-6">

                <div className="mr-5 flex h-14 w-14 shrink-0 items-center justify-center">

                  <HiOutlineDocumentText
                    size={49}
                    className="text-white"
                  />

                </div>

                <div className="relative z-10">

                  <h2 className="text-lg font-bold">
                    Practice Today,
                    <br />
                    Perform Tomorrow!
                  </h2>

                  <p className="mt-1 max-w-[260px] text-xs leading-4 text-white/85">
                    Submit your assignments on time
                    and get expert feedback.
                  </p>

                </div>

                <div className="absolute -bottom-9 -right-2 text-[120px] leading-none text-white/10">
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

                {tabs.map(
                  tab => {

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
                          px-7
                          text-sm
                          font-medium
                          transition-all
                          ${
                            active
                              ? "border-transparent bg-gradient-to-r from-[#4923FF] to-[#007BFF] text-white shadow-[0_0_22px_rgba(30,100,255,.28)]"
                              : "border-blue-500/20 bg-transparent text-white/85 hover:border-blue-500/50 hover:bg-blue-500/5"
                          }
                        `}
                      >
                        {
                          tab.label
                        }

                        <span className="text-white/80">
                          (
                          {
                            tab.count
                          }
                          )
                        </span>

                      </button>
                    );
                  }
                )}

              </div>

              {/* SEARCH */}

              <div className="relative w-full xl:w-[298px]">

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
                  placeholder="Search assignments..."
                  className="h-[43px] w-full rounded-lg border border-blue-500/30 bg-[#061426] pl-10 pr-3 text-sm outline-none placeholder:text-white/50 focus:border-blue-500/60"
                />

              </div>

              {/* SORT */}

              <div className="relative w-full xl:w-[180px]">

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
                  className="h-[43px] w-full appearance-none rounded-lg border border-blue-500/30 bg-[#061426] pl-10 pr-8 text-sm text-white outline-none"
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

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                  ⌄
                </span>

              </div>

            </div>

          </section>

          {/* =================================================
              CONTENT
          ================================================= */}

          <section className="mt-3 grid gap-4 xl:grid-cols-[minmax(0,1fr)_312px]">

            {/* LEFT */}

            <div className="min-w-0">

              {loading && (
                <div className="flex min-h-[450px] items-center justify-center rounded-xl border border-blue-500/20 bg-[#020D1A]">

                  <div className="text-center">

                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-500/20 border-t-blue-500" />

                    <p className="mt-4 text-sm text-white/50">
                      Loading assignments...
                    </p>

                  </div>

                </div>
              )}

              {!loading &&
                error && (
                  <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-10 text-center">

                    <HiOutlineDocumentText
                      size={45}
                      className="mx-auto text-red-400/60"
                    />

                    <h3 className="mt-4 text-lg font-semibold">
                      Unable to load assignments
                    </h3>

                    <p className="mt-2 text-sm text-white/50">
                      {
                        error
                      }
                    </p>

                    <button
                      onClick={
                        fetchAssignments
                      }
                      className="mt-5 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold"
                    >
                      Try Again
                    </button>

                  </div>
                )}

              {!loading &&
                !error &&
                filteredAssignments.length >
                  0 && (
                  <div className="space-y-2">

                    {filteredAssignments.map(
                      (
                        assignment,
                        index
                      ) => (
                        <AssignmentCard
                          key={
                            pick(
                              assignment?.id,
                              assignment?.assignment_id
                            ) ||
                            index
                          }
                          assignment={
                            assignment
                          }
                          index={
                            index
                          }
                          navigate={
                            navigate
                          }
                          onSubmit={
                            setSubmitAssignment
                          }
                        />
                      )
                    )}

                  </div>
                )}

              {!loading &&
                !error &&
                filteredAssignments.length ===
                  0 && (
                  <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border border-dashed border-blue-500/20 bg-[#020D1A]">

                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-500/10">

                      <HiOutlineDocumentText
                        size={40}
                        className="text-blue-400/60"
                      />

                    </div>

                    <h3 className="mt-5 text-xl font-semibold">
                      No assignments found
                    </h3>

                    <p className="mt-2 text-center text-sm text-white/45">
                      Try changing your search
                      or filters.
                    </p>

                    <button
                      onClick={() => {

                        setSearch(
                          ""
                        );

                        setActiveTab(
                          "ALL"
                        );

                        setStatusFilter(
                          "ALL"
                        );

                        setCourseFilter(
                          "ALL"
                        );

                        setDueFilter(
                          "ALL"
                        );

                      }}
                      className="mt-5 rounded-lg border border-blue-500/60 px-5 py-2.5 text-sm font-semibold text-blue-400 hover:bg-blue-500/10"
                    >
                      Clear Filters
                    </button>

                  </div>
                )}

            </div>

            {/* RIGHT SIDEBAR */}

            <aside className="space-y-3">

              <AssignmentSummary
                assignments={
                  assignments
                }
              />

              <DueSoon
                assignments={
                  assignments
                }
                navigate={
                  navigate
                }
              />

              <FilterCard
                assignments={
                  assignments
                }
                courseFilter={
                  courseFilter
                }
                setCourseFilter={
                  setCourseFilter
                }
                statusFilter={
                  statusFilter
                }
                setStatusFilter={
                  setStatusFilter
                }
                dueFilter={
                  dueFilter
                }
                setDueFilter={
                  setDueFilter
                }
              />

            </aside>

          </section>

        </main>

      </div>

      {/* SUBMIT MODAL */}

      {submitAssignment && (
        <SubmitModal
          assignment={
            submitAssignment
          }
          onClose={() =>
            setSubmitAssignment(
              null
            )
          }
          onSubmit={
            handleSubmit
          }
          submitting={
            submitting
          }
        />
      )}

    </div>
  );
}

