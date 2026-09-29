import React, { useEffect, useState } from "react";

import {
  ArrowLeft,
  FileText,
  Link as LinkIcon,
  Send,
  CheckCircle2,
  AlertCircle,
  Home,
  BookOpen,
  Video,
  PlayCircle,
  CalendarDays,
  ClipboardList,
  CreditCard,
  User,
  Bell,
  Search,
  Menu,
  X,
  Upload,
} from "lucide-react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import API from "../../services/api";

/* =========================================================
   HELPERS
========================================================= */

const getAssignment = (location) => {
  return (
    location?.state?.assignment ||
    null
  );
};

const getTitle = (assignment) => {
  return (
    assignment?.title ||
    assignment?.assignment_title ||
    "Assignment"
  );
};

const getClassName = (assignment) => {
  return (
    assignment?.class_name ||
    assignment?.class_title ||
    assignment?.class?.name ||
    assignment?.class?.title ||
    assignment?.course_name ||
    "Class"
  );
};

const getDescription = (assignment) => {
  return (
    assignment?.description ||
    assignment?.instructions ||
    assignment?.details ||
    ""
  );
};

const getDueDate = (assignment) => {
  const value =
    assignment?.due_date ||
    assignment?.dueDate ||
    assignment?.deadline;

  if (!value) {
    return "No deadline";
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

  return date.toLocaleString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );
};

const getStudent = () => {
  try {
    const stored =
      localStorage.getItem(
        "studentUser"
      );

    return stored
      ? JSON.parse(stored)
      : null;
  } catch {
    return null;
  }
};

const getStudentName = (
  student
) => {
  return (
    student?.name ||
    student?.full_name ||
    student?.displayName ||
    "Student"
  );
};

const getStudentImage = (
  student
) => {
  return (
    student?.profile_image ||
    student?.profileImage ||
    student?.photoURL ||
    student?.avatar ||
    ""
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
      icon: <Home size={22} />,
      path:
        "/institute/website/preview",
    },

    {
      label: "My Learning",
      icon: <BookOpen size={22} />,
      path:
        "/institute/website/preview/lms/my-learning",
    },

    {
      label: "Live Sessions",
      icon: <Video size={22} />,
      path:
        "/institute/website/preview/lms/live-sessions",
    },

    {
      label: "Recordings",
      icon: <PlayCircle size={22} />,
      path:
        "/institute/website/preview/lms/recordings",
    },

    {
      label: "My Bookings",
      icon: <CalendarDays size={22} />,
      path:
        "/institute/website/preview/lms/my-bookings",
    },

    {
      label: "Assignments",
      icon: <ClipboardList size={22} />,
      path:
        "/institute/website/preview/lms/assignments",
    },

    {
      label: "Attendance",
      icon: <CalendarDays size={22} />,
      path:
        "/institute/website/preview/lms/attendance",
    },

    {
      label: "Payment Details",
      icon: <CreditCard size={22} />,
      path:
        "/institute/website/preview/lms/payment-details",
    },

    {
      label: "Profile",
      icon: <User size={22} />,
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
              setMobileOpen(false)
            }
            className="ml-auto text-white/60 lg:hidden"
          >
            <X size={22} />
          </button>

        </div>

        {/* MENU */}

        <nav className="flex-1 overflow-y-auto px-4 py-6">

          <div className="space-y-2">

            {menu.map(
              (item) => {

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

                    <span className="flex w-6 justify-center">
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

        {/* BOTTOM QUOTE */}

        <div className="relative overflow-hidden border-t border-white/[0.05] px-8 py-7">

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
              You
            </div>
          </div>

          <div className="mt-4 h-1 w-9 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />

        </div>

      </aside>
    </>
  );
}

/* =========================================================
   TOP HEADER
========================================================= */

function TopHeader({
  student,
  setMobileOpen,
}) {
  const name =
    getStudentName(
      student
    );

  const image =
    getStudentImage(
      student
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
          <Menu size={22} />
        </button>

        {/* SEARCH */}

        <div className="relative w-full max-w-[515px]">

          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70"
            size={22}
          />

          <input
            placeholder="Search assignments, courses or trainers..."
            className="h-12 w-full rounded-xl border border-blue-500/20 bg-[#061426] pl-12 pr-4 text-sm text-white outline-none placeholder:text-white/50 focus:border-blue-500/50"
          />

        </div>

        <div className="ml-auto flex h-full items-center">

          {/* NOTIFICATION */}

          <button className="relative flex h-full w-[70px] items-center justify-center border-l border-white/[0.07]">

            <Bell size={26} />

            <span className="absolute right-[15px] top-[15px] flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold">
              3
            </span>

          </button>

          {/* PROFILE */}

          <div className="flex h-full items-center gap-3 border-l border-white/[0.07] px-5">

            <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-white/10 bg-blue-500/10">

              {image ? (
                <img
                  src={image}
                  alt={name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <User
                    size={23}
                    className="text-blue-400"
                  />
                </div>
              )}

            </div>

            <div className="hidden text-left md:block">

              <p className="text-[15px] font-semibold">
                {name}
              </p>

              <p className="mt-1 text-xs text-white/55">
                Student
              </p>

            </div>

            <span className="ml-3 hidden text-xl text-white/80 md:block">
              ⌄
            </span>

          </div>

        </div>

      </div>

    </header>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function WebsiteAssignmentSubmit() {

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const assignment =
    getAssignment(
      location
    );

  const [
    student,
    setStudent,
  ] = useState(null);

  const [
    submissionText,
    setSubmissionText,
  ] = useState("");

  const [
    submissionUrl,
    setSubmissionUrl,
  ] = useState("");

  const [
    submitting,
    setSubmitting,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  const [
    success,
    setSuccess,
  ] = useState(false);

  const [
    branding,
    setBranding,
  ] = useState(null);

  /* =======================================================
     LOAD STUDENT
  ======================================================= */

  useEffect(() => {

    setStudent(
      getStudent()
    );

    try {

      const stored =
        localStorage.getItem(
          "websiteBranding"
        );

      if (stored) {

        setBranding(
          JSON.parse(
            stored
          )
        );

      }

    } catch {
      setBranding(null);
    }

  }, []);

  /* =======================================================
     NO ASSIGNMENT
  ======================================================= */

  if (!assignment) {

    return (
      <div className="min-h-screen bg-[#020914] text-white">

        <div className="flex min-h-screen items-center justify-center px-6">

          <div className="w-full max-w-lg rounded-2xl border border-blue-500/20 bg-[#061426] p-8 text-center shadow-[0_0_50px_rgba(0,90,255,.08)]">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 text-red-400">

              <AlertCircle
                size={30}
              />

            </div>

            <h1 className="mt-5 text-2xl font-bold">
              Assignment not selected
            </h1>

            <p className="mt-2 text-sm leading-6 text-white/50">
              Please open an assignment first and then
              click Submit Assignment.
            </p>

            <button
              type="button"
              onClick={() =>
                navigate(
                  "/institute/website/preview/lms/assignments"
                )
              }
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#3825FF] to-[#087CFF] px-6 py-3 text-sm font-bold shadow-[0_0_25px_rgba(0,100,255,.25)]"
            >

              <ArrowLeft
                size={17}
              />

              Back to Assignments

            </button>

          </div>

        </div>

      </div>
    );
  }

  /* =======================================================
     ASSIGNMENT ID
  ======================================================= */

  const assignmentId =
    assignment?.id ??
    assignment?.assignment_id ??
    assignment?.assignmentId;

  /* =======================================================
     SUBMIT
  ======================================================= */

  const submit =
    async (event) => {

      event.preventDefault();

      setError("");

      setSuccess(false);

      if (!assignmentId) {

        setError(
          "Assignment ID is missing."
        );

        return;
      }

      if (
        !submissionText.trim() &&
        !submissionUrl.trim()
      ) {

        setError(
          "Please enter your answer or provide a submission URL."
        );

        return;
      }

      setSubmitting(
        true
      );

      try {

        const payload = {
          submission_text:
            submissionText.trim() ||
            null,

          submission_url:
            submissionUrl.trim() ||
            null,
        };

        /*
         * SAME BACKEND ENDPOINT
         * AS USER ASSIGNMENT SUBMISSION.
         */

        await API.post(
          `/assignments/${assignmentId}/submit`,
          payload
        );

        setSuccess(
          true
        );

        /*
         * Return to Website Assignments.
         */

        setTimeout(() => {

          navigate(
            "/institute/website/preview/lms/assignments"
          );

        }, 1200);

      } catch (
        error
      ) {

        console.error(
          "Website assignment submission error:",
          error
        );

        setError(
          error?.response
            ?.data?.message ||
          error?.response
            ?.data?.error ||
          error?.message ||
          "Unable to submit assignment."
        );

      } finally {

        setSubmitting(
          false
        );

      }
    };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="min-h-screen bg-[#020914] text-white">

      {/* SIDEBAR */}

      <Sidebar
        navigate={
          navigate
        }
        mobileOpen={
          false
        }
        setMobileOpen={
          () => {}
        }
      />

      {/* MAIN */}

      <div className="lg:pl-[270px]">

        {/* HEADER */}

        <TopHeader
          student={
            student
          }
          setMobileOpen={
            () => {}
          }
        />

        {/* MOBILE SIDEBAR STATE */}

        {/* CONTENT */}

        <main className="px-4 py-6 sm:px-6 lg:px-8">

          <div className="mx-auto max-w-[1100px]">

            {/* =================================================
                BREADCRUMB / BACK
            ================================================= */}

            <button
              type="button"
              onClick={() =>
                navigate(
                  "/institute/website/preview/lms/assignments"
                )
              }
              className="mb-6 flex items-center gap-2 text-sm font-medium text-white/55 transition hover:text-blue-400"
            >

              <ArrowLeft
                size={18}
              />

              Back to Assignments

            </button>

            {/* =================================================
                PAGE TITLE
            ================================================= */}

            <div className="mb-7">

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400">
                Submit Assignment
              </p>

              <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">

                {getTitle(
                  assignment
                )}

              </h1>

              <p className="mt-2 text-sm text-white/50">
                {getClassName(
                  assignment
                )}
              </p>

            </div>

            {/* =================================================
                ASSIGNMENT DETAILS
            ================================================= */}

            <section className="mb-5 rounded-2xl border border-blue-500/20 bg-[#031120] p-5 sm:p-6">

              <div className="flex items-start gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">

                  <FileText
                    size={23}
                  />

                </div>

                <div className="min-w-0 flex-1">

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">

                    <div>

                      <h2 className="text-lg font-bold">
                        Assignment Details
                      </h2>

                      <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-white/65">
                        {getDescription(
                          assignment
                        ) ||
                          "No additional instructions provided."}
                      </p>

                    </div>

                    <div className="shrink-0 rounded-lg border border-blue-500/15 bg-blue-500/5 px-4 py-2 text-xs text-white/60">

                      Due:

                      <span className="ml-1 font-semibold text-white/90">
                        {getDueDate(
                          assignment
                        )}
                      </span>

                    </div>

                  </div>

                </div>

              </div>

            </section>

            {/* =================================================
                SUCCESS
            ================================================= */}

            {success && (
              <div className="mb-5 flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-emerald-300">

                <CheckCircle2
                  size={21}
                />

                <div>

                  <p className="font-semibold">
                    Assignment submitted successfully.
                  </p>

                  <p className="mt-1 text-xs text-emerald-300/70">
                    Redirecting to assignments...
                  </p>

                </div>

              </div>
            )}

            {/* =================================================
                ERROR
            ================================================= */}

            {error && (
              <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-300">

                <AlertCircle
                  size={20}
                  className="mt-0.5 shrink-0"
                />

                <p className="text-sm">
                  {error}
                </p>

              </div>
            )}

            {/* =================================================
                SUBMISSION FORM
            ================================================= */}

            <form
              onSubmit={
                submit
              }
              className="rounded-2xl border border-blue-500/20 bg-[#031120] p-5 sm:p-6"
            >

              {/* FORM HEADER */}

              <div className="mb-6 flex items-center gap-4">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600">

                  <Upload
                    size={22}
                  />

                </div>

                <div>

                  <h2 className="text-lg font-bold">
                    Your Submission
                  </h2>

                  <p className="mt-1 text-xs text-white/45">
                    Submit your answer or share your work.
                  </p>

                </div>

              </div>

              {/* =================================================
                  ANSWER
              ================================================= */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-white/85">
                  Your Answer
                </label>

                <textarea
                  value={
                    submissionText
                  }
                  onChange={(
                    event
                  ) =>
                    setSubmissionText(
                      event
                        .target
                        .value
                    )
                  }
                  rows={10}
                  placeholder="Write your answer or describe your work..."
                  className="w-full resize-y rounded-xl border border-white/10 bg-[#061426] px-4 py-4 text-sm leading-6 text-white outline-none placeholder:text-white/30 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
                />

                <p className="mt-2 text-xs text-white/35">
                  You can enter your answer here.
                </p>

              </div>

              {/* =================================================
                  URL
              ================================================= */}

              <div className="mt-6">

                <label className="mb-2 block text-sm font-semibold text-white/85">

                  Submission File / Link

                  <span className="ml-2 font-normal text-white/35">
                    Optional
                  </span>

                </label>

                <div className="relative">

                  <LinkIcon
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35"
                  />

                  <input
                    type="url"
                    value={
                      submissionUrl
                    }
                    onChange={(
                      event
                    ) =>
                      setSubmissionUrl(
                        event
                          .target
                          .value
                      )
                    }
                    placeholder="https://drive.google.com/..."
                    className="h-[52px] w-full rounded-xl border border-white/10 bg-[#061426] pl-11 pr-4 text-sm text-white outline-none placeholder:text-white/30 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
                  />

                </div>

                <p className="mt-2 text-xs text-white/35">
                  Add a Google Drive, OneDrive, Dropbox or
                  other publicly accessible submission link.
                </p>

              </div>

              {/* =================================================
                  ACTIONS
              ================================================= */}

              <div className="mt-8 flex flex-col-reverse gap-3 border-t border-white/10 pt-6 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      "/institute/website/preview/lms/assignments"
                    )
                  }
                  disabled={
                    submitting
                  }
                  className="rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-white/70 transition hover:bg-white/[0.06] hover:text-white disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={
                    submitting ||
                    success
                  }
                  className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#3825FF] via-[#155CFF] to-[#008CFF] px-7 py-3 text-sm font-bold shadow-[0_0_25px_rgba(0,100,255,.25)] transition hover:shadow-[0_0_35px_rgba(0,100,255,.35)] disabled:cursor-not-allowed disabled:opacity-50"
                >

                  {submitting ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send
                        size={17}
                      />

                      Submit Assignment
                    </>
                  )}

                </button>

              </div>

            </form>

            {/* =================================================
                NOTE
            ================================================= */}

            <div className="mt-5 rounded-xl border border-blue-500/10 bg-blue-500/[0.03] px-5 py-4">

              <div className="flex gap-3">

                <FileText
                  size={18}
                  className="mt-0.5 shrink-0 text-blue-400"
                />

                <p className="text-xs leading-5 text-white/45">
                  Make sure your answer and submission link
                  are correct before submitting. Once submitted,
                  your trainer can review your work and provide
                  feedback.
                </p>

              </div>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}