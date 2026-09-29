import React, {
  useEffect,
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
  HiOutlineHome,
  HiOutlineMenu,
  HiOutlineX,
  HiOutlineSearch,
  HiOutlinePencil,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
  HiOutlineAcademicCap,
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlineLockClosed,
  HiOutlineSave,
  HiOutlineRefresh,
} from "react-icons/hi";

import {
  FaRupeeSign,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import API from "../../services/api";

/* =========================================================
   DEFAULT BRANDING
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
                  "Profile";

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
              You
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
      student?.displayName,
      "Student"
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
   INFO ITEM
========================================================= */

function InfoItem({
  icon,
  label,
  value,
}) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-[#061426] p-4">

      <div className="flex items-start gap-3">

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
          {icon}
        </div>

        <div className="min-w-0">

          <p className="text-[11px] uppercase tracking-wide text-white/40">
            {label}
          </p>

          <p className="mt-1 truncate text-sm font-medium text-white/90">
            {value || "--"}
          </p>

        </div>

      </div>

    </div>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  icon,
  value,
  label,
  subtitle,
}) {
  return (
    <div className="rounded-xl border border-blue-500/15 bg-[#031120] p-5">

      <div className="flex items-center gap-4">

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
          {icon}
        </div>

        <div>

          <p className="text-2xl font-bold">
            {value}
          </p>

          <p className="text-sm font-medium text-white/85">
            {label}
          </p>

          {subtitle && (
            <p className="mt-0.5 text-xs text-white/45">
              {subtitle}
            </p>
          )}

        </div>

      </div>

    </div>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function WebsiteProfile() {

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
    profile,
    setProfile,
  ] = useState(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    saving,
    setSaving,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  const [
    success,
    setSuccess,
  ] = useState("");

  const [
    mobileOpen,
    setMobileOpen,
  ] = useState(false);

  const [
    editOpen,
    setEditOpen,
  ] = useState(false);

  const [
    form,
    setForm,
  ] = useState({
    full_name: "",
    email: "",
    phone: "",
    date_of_birth: "",
    gender: "",
    city: "",
    state: "",
    country: "",
    bio: "",
  });

  /* =======================================================
     LOAD STUDENT FROM LOCAL STORAGE
  ======================================================= */

  useEffect(() => {

    try {

      const stored =
        localStorage.getItem(
          "studentUser"
        );

      if (stored) {

        const parsed =
          JSON.parse(
            stored
          );

        setStudent(
          parsed
        );

        setProfile(
          parsed
        );

      }

    } catch (error) {

      console.error(
        "STUDENT STORAGE ERROR:",
        error
      );

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
     FETCH PROFILE
  ======================================================= */

  const fetchProfile =
    async () => {

      try {

        setLoading(
          true
        );

        setError("");

        /*
         * The website/student profile
         * endpoint may already exist in
         * your account/user API.
         *
         * First try /students/profile.
         */

        let response;

        try {

          response =
            await API.get(
              "/students/profile"
            );

        } catch {

          /*
           * Fallback to account profile
           */

          response =
            await API.get(
              "/users/profile"
            );
        }

        const payload =
          response?.data;

        const data =
          payload?.data ||
          payload?.student ||
          payload?.profile ||
          payload;

        if (
          data &&
          typeof data ===
            "object"
        ) {

          setProfile(
            data
          );

          setStudent(
            previous => ({
              ...(previous ||
                {}),
              ...data,
            })
          );

          setForm(
            previous => ({
              ...previous,

              full_name:
                pick(
                  data?.full_name,
                  data?.name,
                  previous.full_name,
                  ""
                ),

              email:
                pick(
                  data?.email,
                  previous.email,
                  ""
                ),

              phone:
                pick(
                  data?.phone,
                  data?.mobile,
                  data?.phone_number,
                  previous.phone,
                  ""
                ),

              date_of_birth:
                pick(
                  data?.date_of_birth,
                  data?.dob,
                  previous.date_of_birth,
                  ""
                ),

              gender:
                pick(
                  data?.gender,
                  previous.gender,
                  ""
                ),

              city:
                pick(
                  data?.city,
                  previous.city,
                  ""
                ),

              state:
                pick(
                  data?.state,
                  previous.state,
                  ""
                ),

              country:
                pick(
                  data?.country,
                  previous.country,
                  "India"
                ),

              bio:
                pick(
                  data?.bio,
                  previous.bio,
                  ""
                ),
            })
          );

        }

      } catch (error) {

        console.error(
          "WEBSITE PROFILE ERROR:",
          error
        );

        /*
         * If API is unavailable,
         * continue using local
         * student information.
         */

        if (
          !student
        ) {

          setError(
            error?.response
              ?.data?.message ||
            "Unable to load profile."
          );

        }

      } finally {

        setLoading(
          false
        );

      }

    };

  useEffect(() => {

    fetchProfile();

  }, []);

  /* =======================================================
     FORM
  ======================================================= */

  useEffect(() => {

    if (!profile) {
      return;
    }

    setForm(
      previous => ({
        ...previous,

        full_name:
          pick(
            profile?.full_name,
            profile?.name,
            previous.full_name,
            ""
          ),

        email:
          pick(
            profile?.email,
            previous.email,
            ""
          ),

        phone:
          pick(
            profile?.phone,
            profile?.mobile,
            profile?.phone_number,
            previous.phone,
            ""
          ),

        date_of_birth:
          pick(
            profile?.date_of_birth,
            profile?.dob,
            previous.date_of_birth,
            ""
          ),

        gender:
          pick(
            profile?.gender,
            previous.gender,
            ""
          ),

        city:
          pick(
            profile?.city,
            previous.city,
            ""
          ),

        state:
          pick(
            profile?.state,
            previous.state,
            ""
          ),

        country:
          pick(
            profile?.country,
            previous.country,
            "India"
          ),

        bio:
          pick(
            profile?.bio,
            previous.bio,
            ""
          ),
      })
    );

  }, [
    profile,
  ]);

  /* =======================================================
     SAVE PROFILE
  ======================================================= */

  const handleSave =
    async event => {

      event.preventDefault();

      try {

        setSaving(
          true
        );

        setError("");

        setSuccess("");

        let response;

        try {

          response =
            await API.put(
              "/students/profile",
              form
            );

        } catch {

          response =
            await API.put(
              "/users/profile",
              form
            );

        }

        const payload =
          response?.data;

        const updated =
          payload?.data ||
          payload?.student ||
          payload?.profile ||
          form;

        setProfile(
          updated
        );

        setStudent(
          previous => ({
            ...(previous ||
              {}),
            ...updated,
          })
        );

        /*
         * Keep local session
         * synchronized.
         */

        try {

          const current =
            JSON.parse(
              localStorage.getItem(
                "studentUser"
              ) || "{}"
            );

          localStorage.setItem(
            "studentUser",
            JSON.stringify({
              ...current,
              ...updated,
            })
          );

        } catch {
          // ignore
        }

        setSuccess(
          "Profile updated successfully."
        );

        setEditOpen(
          false
        );

        setTimeout(() => {
          setSuccess("");
        }, 4000);

      } catch (error) {

        console.error(
          "UPDATE PROFILE ERROR:",
          error
        );

        setError(
          error?.response
            ?.data?.message ||
          "Unable to update profile."
        );

      } finally {

        setSaving(
          false
        );

      }

    };

  /* =======================================================
     VALUES
  ======================================================= */

  const displayName =
    pick(
      profile?.full_name,
      profile?.name,
      student?.full_name,
      student?.name,
      "Student"
    );

  const email =
    pick(
      profile?.email,
      student?.email,
      "Not provided"
    );

  const phone =
    pick(
      profile?.phone,
      profile?.mobile,
      profile?.phone_number,
      student?.phone,
      student?.mobile,
      "Not provided"
    );

  const image =
    pick(
      profile?.profile_image,
      profile?.profileImage,
      profile?.photoURL,
      profile?.avatar,
      student?.profile_image,
      student?.profileImage,
      student?.photoURL,
      student?.avatar,
      ""
    );

  const gender =
    pick(
      profile?.gender,
      student?.gender,
      "Not specified"
    );

  const dob =
    pick(
      profile?.date_of_birth,
      profile?.dob,
      student?.date_of_birth,
      student?.dob,
      "Not provided"
    );

  const city =
    pick(
      profile?.city,
      student?.city,
      "Not provided"
    );

  const state =
    pick(
      profile?.state,
      student?.state,
      "Not provided"
    );

  const country =
    pick(
      profile?.country,
      student?.country,
      "India"
    );

  const studentId =
    pick(
      profile?.student_id,
      profile?.studentId,
      profile?.id,
      student?.student_id,
      student?.id,
      "--"
    );

  const joinedDate =
    pick(
      profile?.created_at,
      profile?.joined_at,
      student?.created_at,
      student?.joined_at,
      null
    );

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
            profile ||
            student
          }
          setMobileOpen={
            setMobileOpen
          }
        />

        <main className="px-4 py-5 sm:px-6 lg:px-7">

          {/* =================================================
              PAGE TITLE
          ================================================= */}

          <section className="border-b border-white/[0.06] pb-5">

            <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">

              <div>

                <h1
                  className="text-4xl font-bold tracking-tight sm:text-[42px]"
                  style={{
                    fontFamily:
                      `'${branding.fontHeading}', sans-serif`,
                  }}
                >
                  My
                  <span className="text-blue-500">
                    Profile
                  </span>
                </h1>

                <p className="mt-1 text-base text-white/90">
                  Manage your personal information and
                  learning account.
                </p>

              </div>

              {/* EDIT BUTTON */}

              <button
                onClick={() =>
                  setEditOpen(
                    true
                  )
                }
                className="flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#3825FF] to-[#087CFF] px-6 text-sm font-semibold shadow-[0_0_25px_rgba(0,100,255,.25)] transition hover:scale-[1.01]"
              >

                <HiOutlinePencil
                  size={18}
                />

                Edit Profile

              </button>

            </div>

          </section>

          {/* =================================================
              PROFILE HERO
          ================================================= */}

          <section className="relative mt-4 overflow-hidden rounded-xl border border-blue-500/20 bg-gradient-to-r from-[#031426] via-[#06172A] to-[#071025]">

            {/* GLOW */}

            <div className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-blue-600/10 blur-[90px]" />

            <div className="pointer-events-none absolute -bottom-20 right-0 h-60 w-60 rounded-full bg-purple-600/10 blur-[90px]" />

            <div className="relative flex flex-col gap-6 p-6 sm:p-7 lg:flex-row lg:items-center">

              {/* PROFILE IMAGE */}

              <div className="relative shrink-0">

                <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-blue-500/30 bg-[#061426] shadow-[0_0_35px_rgba(0,100,255,.25)] sm:h-36 sm:w-36">

                  {image ? (
                    <img
                      src={
                        image
                      }
                      alt={
                        displayName
                      }
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-blue-500/10">

                      <HiOutlineUser
                        size={65}
                        className="text-blue-400"
                      />

                    </div>
                  )}

                </div>

                <button
                  onClick={() =>
                    setEditOpen(
                      true
                    )
                  }
                  className="absolute bottom-1 right-1 flex h-10 w-10 items-center justify-center rounded-full border-4 border-[#061426] bg-blue-600 text-white shadow-lg"
                >
                  <HiOutlinePencil
                    size={17}
                  />
                </button>

              </div>

              {/* DETAILS */}

              <div className="flex-1">

                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">

                  <div>

                    <h2 className="text-3xl font-bold">
                      {
                        displayName
                      }
                    </h2>

                    <p className="mt-1 text-sm text-white/55">
                      Student
                      {studentId !==
                        "--" &&
                        ` • ID: ${studentId}`}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">

                      <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-400">
                        Active Student
                      </span>

                      <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold text-blue-400">
                        FineArts LMS
                      </span>

                    </div>

                  </div>

                  {joinedDate && (
                    <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] px-4 py-3">

                      <p className="text-[10px] uppercase tracking-wider text-white/40">
                        Member Since
                      </p>

                      <p className="mt-1 text-sm font-semibold">
                        {new Date(
                          joinedDate
                        ).toLocaleDateString(
                          "en-IN",
                          {
                            month:
                              "short",
                            year:
                              "numeric",
                          }
                        )}
                      </p>

                    </div>
                  )}

                </div>

              </div>

            </div>

          </section>

          {/* =================================================
              STAT CARDS
          ================================================= */}

          <section className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">

            <StatCard
              icon={
                <HiOutlineBookOpen
                  size={25}
                />
              }
              value={
                profile?.total_courses ??
                profile?.courses_count ??
                0
              }
              label="My Courses"
              subtitle="Enrolled courses"
            />

            <StatCard
              icon={
                <HiOutlineCheckCircle
                  size={25}
                />
              }
              value={
                profile?.completed_courses ??
                profile?.completedCourses ??
                0
              }
              label="Completed"
              subtitle="Courses completed"
            />

            <StatCard
              icon={
                <HiOutlineClock
                  size={25}
                />
              }
              value={
                profile?.learning_hours ??
                profile?.learningHours ??
                0
              }
              label="Learning Hours"
              subtitle="Total learning time"
            />

            <StatCard
              icon={
                <HiOutlineAcademicCap
                  size={25}
                />
              }
              value={
                profile?.certificates ??
                profile?.certificate_count ??
                0
              }
              label="Certificates"
              subtitle="Certificates earned"
            />

          </section>

          {/* =================================================
              PROFILE INFORMATION
          ================================================= */}

          <section className="mt-4 grid gap-4 xl:grid-cols-2">

            {/* PERSONAL INFORMATION */}

            <div className="rounded-xl border border-blue-500/20 bg-[#020D1A] p-5">

              <div className="mb-5 flex items-center justify-between">

                <div>

                  <h2 className="text-lg font-bold">
                    Personal Information
                  </h2>

                  <p className="mt-1 text-xs text-white/45">
                    Your basic personal details
                  </p>

                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">

                  <HiOutlineUser
                    size={22}
                  />

                </div>

              </div>

              <div className="grid gap-3 sm:grid-cols-2">

                <InfoItem
                  icon={
                    <HiOutlineUser
                      size={19}
                    />
                  }
                  label="Full Name"
                  value={
                    displayName
                  }
                />

                <InfoItem
                  icon={
                    <HiOutlineCalendar
                      size={19}
                    />
                  }
                  label="Date of Birth"
                  value={
                    dob
                  }
                />

                <InfoItem
                  icon={
                    <HiOutlineUser
                      size={19}
                    />
                  }
                  label="Gender"
                  value={
                    gender
                  }
                />

                <InfoItem
                  icon={
                    <HiOutlineAcademicCap
                      size={19}
                    />
                  }
                  label="Student ID"
                  value={
                    studentId
                  }
                />

              </div>

            </div>

            {/* CONTACT INFORMATION */}

            <div className="rounded-xl border border-blue-500/20 bg-[#020D1A] p-5">

              <div className="mb-5 flex items-center justify-between">

                <div>

                  <h2 className="text-lg font-bold">
                    Contact Information
                  </h2>

                  <p className="mt-1 text-xs text-white/45">
                    Your contact and location details
                  </p>

                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">

                  <HiOutlineMail
                    size={22}
                  />

                </div>

              </div>

              <div className="grid gap-3 sm:grid-cols-2">

                <InfoItem
                  icon={
                    <HiOutlineMail
                      size={19}
                    />
                  }
                  label="Email"
                  value={
                    email
                  }
                />

                <InfoItem
                  icon={
                    <HiOutlinePhone
                      size={19}
                    />
                  }
                  label="Phone"
                  value={
                    phone
                  }
                />

                <InfoItem
                  icon={
                    <HiOutlineLocationMarker
                      size={19}
                    />
                  }
                  label="City"
                  value={
                    city
                  }
                />

                <InfoItem
                  icon={
                    <HiOutlineLocationMarker
                      size={19}
                    />
                  }
                  label="State / Country"
                  value={`${state}, ${country}`}
                />

              </div>

            </div>

          </section>

          {/* =================================================
              BIO
          ================================================= */}

          <section className="mt-4 rounded-xl border border-blue-500/20 bg-[#020D1A] p-5">

            <div className="flex items-start gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">

                <HiOutlineDocumentText
                  size={25}
                />

              </div>

              <div className="min-w-0 flex-1">

                <div className="flex items-center justify-between gap-3">

                  <div>

                    <h2 className="text-lg font-bold">
                      About Me
                    </h2>

                    <p className="mt-1 text-xs text-white/45">
                      Your profile description
                    </p>

                  </div>

                  <button
                    onClick={() =>
                      setEditOpen(
                        true
                      )
                    }
                    className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs text-white/65 transition hover:border-blue-500/40 hover:text-white"
                  >
                    <HiOutlinePencil
                      size={15}
                    />
                    Edit
                  </button>

                </div>

                <p className="mt-4 max-w-4xl text-sm leading-6 text-white/65">

                  {pick(
                    profile?.bio,
                    student?.bio,
                    "Add a short description about yourself, your learning interests and your goals."
                  )}

                </p>

              </div>

            </div>

          </section>

          {/* =================================================
              ACCOUNT INFORMATION
          ================================================= */}

          <section className="mt-4 rounded-xl border border-blue-500/20 bg-[#020D1A] p-5">

            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">

                  <HiOutlineLockClosed
                    size={25}
                  />

                </div>

                <div>

                  <h2 className="font-bold">
                    Account Security
                  </h2>

                  <p className="mt-1 text-xs text-white/45">
                    Your account is protected through FineArts authentication.
                  </p>

                </div>

              </div>

              <button
                onClick={() =>
                  navigate(
                    "/institute/website/preview/lms/profile/change-password"
                  )
                }
                className="flex items-center justify-center gap-2 rounded-lg border border-blue-500/25 bg-blue-500/5 px-5 py-2.5 text-sm font-medium text-blue-400 transition hover:bg-blue-500/10"
              >
                <HiOutlineLockClosed
                  size={17}
                />
                Change Password
              </button>

            </div>

          </section>

          {/* =================================================
              SUCCESS
          ================================================= */}

          {success && (
            <div className="mt-4 flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-5 py-4 text-sm text-emerald-400">

              <HiOutlineCheckCircle
                size={21}
              />

              {
                success
              }

            </div>
          )}

          {/* =================================================
              ERROR
          ================================================= */}

          {error && (
            <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/5 px-5 py-4 text-sm text-red-300">

              {
                error
              }

            </div>
          )}

        </main>

      </div>

      {/* =====================================================
          EDIT PROFILE MODAL
      ===================================================== */}

      {editOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">

          <div className="max-h-[90vh] w-full max-w-[720px] overflow-y-auto rounded-2xl border border-blue-500/20 bg-[#061426] shadow-2xl">

            {/* MODAL HEADER */}

            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/[0.07] bg-[#061426] px-6 py-5">

              <div>

                <h2 className="text-xl font-bold">
                  Edit Profile
                </h2>

                <p className="mt-1 text-xs text-white/45">
                  Update your personal information
                </p>

              </div>

              <button
                onClick={() =>
                  setEditOpen(
                    false
                  )
                }
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.04] text-white/60 transition hover:text-white"
              >
                <HiOutlineX
                  size={21}
                />
              </button>

            </div>

            {/* FORM */}

            <form
              onSubmit={
                handleSave
              }
              className="space-y-5 p-6"
            >

              {/* FULL NAME */}

              <div>

                <label className="mb-2 block text-xs font-semibold text-white/65">
                  Full Name
                </label>

                <div className="relative">

                  <HiOutlineUser
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
                    size={18}
                  />

                  <input
                    value={
                      form.full_name
                    }
                    onChange={event =>
                      setForm(
                        previous => ({
                          ...previous,
                          full_name:
                            event
                              .target
                              .value,
                        })
                      )
                    }
                    className="h-11 w-full rounded-lg border border-white/10 bg-[#020D1A] pl-10 pr-4 text-sm text-white outline-none focus:border-blue-500/50"
                  />

                </div>

              </div>

              {/* EMAIL + PHONE */}

              <div className="grid gap-4 sm:grid-cols-2">

                <div>

                  <label className="mb-2 block text-xs font-semibold text-white/65">
                    Email
                  </label>

                  <div className="relative">

                    <HiOutlineMail
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
                      size={18}
                    />

                    <input
                      type="email"
                      value={
                        form.email
                      }
                      onChange={event =>
                        setForm(
                          previous => ({
                            ...previous,
                            email:
                              event
                                .target
                                .value,
                          })
                        )
                      }
                      className="h-11 w-full rounded-lg border border-white/10 bg-[#020D1A] pl-10 pr-4 text-sm text-white outline-none focus:border-blue-500/50"
                    />

                  </div>

                </div>

                <div>

                  <label className="mb-2 block text-xs font-semibold text-white/65">
                    Phone
                  </label>

                  <div className="relative">

                    <HiOutlinePhone
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
                      size={18}
                    />

                    <input
                      value={
                        form.phone
                      }
                      onChange={event =>
                        setForm(
                          previous => ({
                            ...previous,
                            phone:
                              event
                                .target
                                .value,
                          })
                        )
                      }
                      className="h-11 w-full rounded-lg border border-white/10 bg-[#020D1A] pl-10 pr-4 text-sm text-white outline-none focus:border-blue-500/50"
                    />

                  </div>

                </div>

              </div>

              {/* DOB + GENDER */}

              <div className="grid gap-4 sm:grid-cols-2">

                <div>

                  <label className="mb-2 block text-xs font-semibold text-white/65">
                    Date of Birth
                  </label>

                  <input
                    type="date"
                    value={
                      form.date_of_birth
                    }
                    onChange={event =>
                      setForm(
                        previous => ({
                          ...previous,
                          date_of_birth:
                            event
                              .target
                              .value,
                        })
                      )
                    }
                    className="h-11 w-full rounded-lg border border-white/10 bg-[#020D1A] px-4 text-sm text-white outline-none focus:border-blue-500/50"
                  />

                </div>

                <div>

                  <label className="mb-2 block text-xs font-semibold text-white/65">
                    Gender
                  </label>

                  <select
                    value={
                      form.gender
                    }
                    onChange={event =>
                      setForm(
                        previous => ({
                          ...previous,
                          gender:
                            event
                              .target
                              .value,
                        })
                      )
                    }
                    className="h-11 w-full rounded-lg border border-white/10 bg-[#020D1A] px-4 text-sm text-white outline-none focus:border-blue-500/50"
                  >

                    <option
                      value=""
                      className="bg-[#020D1A]"
                    >
                      Select Gender
                    </option>

                    <option
                      value="Male"
                      className="bg-[#020D1A]"
                    >
                      Male
                    </option>

                    <option
                      value="Female"
                      className="bg-[#020D1A]"
                    >
                      Female
                    </option>

                    <option
                      value="Other"
                      className="bg-[#020D1A]"
                    >
                      Other
                    </option>

                  </select>

                </div>

              </div>

              {/* LOCATION */}

              <div className="grid gap-4 sm:grid-cols-3">

                <div>

                  <label className="mb-2 block text-xs font-semibold text-white/65">
                    City
                  </label>

                  <input
                    value={
                      form.city
                    }
                    onChange={event =>
                      setForm(
                        previous => ({
                          ...previous,
                          city:
                            event
                              .target
                              .value,
                        })
                      )
                    }
                    className="h-11 w-full rounded-lg border border-white/10 bg-[#020D1A] px-4 text-sm text-white outline-none focus:border-blue-500/50"
                  />

                </div>

                <div>

                  <label className="mb-2 block text-xs font-semibold text-white/65">
                    State
                  </label>

                  <input
                    value={
                      form.state
                    }
                    onChange={event =>
                      setForm(
                        previous => ({
                          ...previous,
                          state:
                            event
                              .target
                              .value,
                        })
                      )
                    }
                    className="h-11 w-full rounded-lg border border-white/10 bg-[#020D1A] px-4 text-sm text-white outline-none focus:border-blue-500/50"
                  />

                </div>

                <div>

                  <label className="mb-2 block text-xs font-semibold text-white/65">
                    Country
                  </label>

                  <input
                    value={
                      form.country
                    }
                    onChange={event =>
                      setForm(
                        previous => ({
                          ...previous,
                          country:
                            event
                              .target
                              .value,
                        })
                      )
                    }
                    className="h-11 w-full rounded-lg border border-white/10 bg-[#020D1A] px-4 text-sm text-white outline-none focus:border-blue-500/50"
                  />

                </div>

              </div>

              {/* BIO */}

              <div>

                <label className="mb-2 block text-xs font-semibold text-white/65">
                  About Me
                </label>

                <textarea
                  rows={4}
                  value={
                    form.bio
                  }
                  onChange={event =>
                    setForm(
                      previous => ({
                        ...previous,
                        bio:
                          event
                            .target
                            .value,
                      })
                    )
                  }
                  placeholder="Tell us a little about yourself..."
                  className="w-full resize-none rounded-lg border border-white/10 bg-[#020D1A] px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-blue-500/50"
                />

              </div>

              {/* BUTTONS */}

              <div className="flex flex-col-reverse gap-3 border-t border-white/[0.07] pt-5 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={() =>
                    setEditOpen(
                      false
                    )
                  }
                  className="h-11 rounded-lg border border-white/10 px-6 text-sm font-medium text-white/70 transition hover:bg-white/[0.04] hover:text-white"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={
                    saving
                  }
                  className="flex h-11 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#3825FF] to-[#087CFF] px-7 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60"
                >

                  {saving ? (
                    <>
                      <HiOutlineRefresh
                        size={18}
                        className="animate-spin"
                      />

                      Saving...
                    </>
                  ) : (
                    <>
                      <HiOutlineSave
                        size={18}
                      />

                      Save Changes
                    </>
                  )}

                </button>

              </div>

            </form>

          </div>

        </div>
      )}

      {/* =====================================================
          PAGE LOADING
      ===================================================== */}

      {loading && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/40 backdrop-blur-sm">

          <div className="rounded-xl border border-blue-500/20 bg-[#061426] px-8 py-7 text-center shadow-2xl">

            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-500/20 border-t-blue-500" />

            <p className="mt-4 text-sm text-white/65">
              Loading profile...
            </p>

          </div>

        </div>
      )}

    </div>
  );
}