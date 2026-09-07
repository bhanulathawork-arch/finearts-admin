import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import {
  FaBook,
  FaRupeeSign,
  FaArrowRight,
  FaGraduationCap,
  FaClock,
  FaCalendarWeek,
  FaCheck,
  FaPencilAlt,
  FaUserTie,
  FaExclamationTriangle,
  FaUniversity,
  FaMoneyBillWave,
} from "react-icons/fa";

import { auth } from "../../config/firebase";

const API =
  import.meta.env.VITE_API_URL ||
  "https://finearts-backend.onrender.com/api";

const STUDENT_ROLE = "STUDENT";

/* =========================================================
   STORAGE HELPERS
========================================================= */

const getStoredStudent = () => {
  try {
    const raw = localStorage.getItem("studentUser");

    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw);

    return parsed && typeof parsed === "object"
      ? parsed
      : null;
  } catch (error) {
    console.error("STUDENT STORAGE PARSE ERROR:", error);

    localStorage.removeItem("studentUser");

    return null;
  }
};

const getStoredStudentRole = () =>
  String(
    localStorage.getItem("studentRole") || ""
  )
    .trim()
    .toUpperCase();

const isStudentLoggedIn = () =>
  localStorage.getItem("studentLoggedIn") === "true";

const getStudentToken = () =>
  localStorage.getItem("studentToken") || null;

const getStoredInstituteId = () => {
  const possibleKeys = [
    "instituteId",
    "institute_id",
    "websiteInstituteId",
    "website_institute_id",
    "selectedInstituteId",
    "selected_institute_id",
  ];

  for (const key of possibleKeys) {
    const value = localStorage.getItem(key);

    if (value) {
      const numberValue = Number(value);

      if (Number.isInteger(numberValue) && numberValue > 0) {
        return numberValue;
      }
    }
  }

  return null;
};

/* =========================================================
   EXTRACT INSTITUTE ID
========================================================= */

const resolveInstituteId = (
  context,
  student = null
) => {
  const candidates = [
    context?.instituteId,
    context?.institute_id,
    context?.website?.institute_id,
    context?.website?.instituteId,
    context?.websiteData?.institute_id,
    context?.websiteData?.instituteId,
    context?.publicWebsite?.institute_id,
    context?.publicWebsite?.instituteId,
    student?.institute_id,
    student?.instituteId,
    student?.institute?.id,
    getStoredInstituteId(),
  ];

  for (const value of candidates) {
    const numberValue = Number(value);

    if (
      Number.isInteger(numberValue) &&
      numberValue > 0
    ) {
      return numberValue;
    }
  }

  /*
   * Your current website preview URL is:
   *
   * /institute/website/preview
   *
   * and your current institute is 14.
   *
   * Normally the parent website context should provide
   * this value. This fallback prevents /students/me from
   * being called with institute_id = null during preview.
   */

  if (
    window.location.pathname.startsWith(
      "/institute/website/preview"
    )
  ) {
    const urlInstituteId =
      new URLSearchParams(
        window.location.search
      ).get("institute_id");

    if (urlInstituteId) {
      const numberValue = Number(
        urlInstituteId
      );

      if (
        Number.isInteger(numberValue) &&
        numberValue > 0
      ) {
        return numberValue;
      }
    }
  }

  return null;
};

/* =========================================================
   SAVE STUDENT SESSION
========================================================= */

const saveStudent = (
  student,
  token = null,
  instituteId = null
) => {
  if (!student) {
    return;
  }

  try {
    localStorage.setItem(
      "studentUser",
      JSON.stringify(student)
    );

    localStorage.setItem(
      "studentRole",
      STUDENT_ROLE
    );

    localStorage.setItem(
      "studentLoggedIn",
      "true"
    );

    if (token) {
      localStorage.setItem(
        "studentToken",
        token
      );
    }

    if (instituteId) {
      localStorage.setItem(
        "instituteId",
        String(instituteId)
      );

      localStorage.setItem(
        "institute_id",
        String(instituteId)
      );
    }
  } catch (error) {
    console.error(
      "SAVE STUDENT SESSION ERROR:",
      error
    );
  }
};

/* =========================================================
   CLEAR STUDENT SESSION
========================================================= */

const clearStudentSession = () => {
  localStorage.removeItem(
    "studentUser"
  );

  localStorage.removeItem(
    "studentToken"
  );

  localStorage.removeItem(
    "studentRole"
  );

  localStorage.removeItem(
    "studentLoggedIn"
  );
};

/* =========================================================
   STUDENT SESSION
========================================================= */

const hasStudentSession = () => {
  const role =
    getStoredStudentRole();

  const loggedIn =
    isStudentLoggedIn();

  const student =
    getStoredStudent();

  if (
    role === STUDENT_ROLE &&
    loggedIn
  ) {
    return true;
  }

  if (
    student &&
    (
      student.student_id ||
      student.studentId ||
      String(
        student.role || ""
      ).toUpperCase() ===
        STUDENT_ROLE ||
      String(
        student.user_type || ""
      ).toUpperCase() ===
        STUDENT_ROLE
    )
  ) {
    return true;
  }

  return false;
};

/* =========================================================
   NORMALIZE STUDENT
========================================================= */

const normalizeStudent = (
  responseData,
  firebaseUser = null,
  existingStudent = null
) => {
  const backendData =
    responseData?.data ||
    responseData?.student ||
    responseData ||
    {};

  const backendStudent =
    backendData?.student ||
    {};

  const backendUser =
    backendData?.user ||
    {};

  const backendAccount =
    backendData?.account ||
    {};

  return {
    ...(existingStudent || {}),
    ...backendData,
    ...backendStudent,

    uid:
      backendData?.uid ||
      backendData?.firebase_uid ||
      existingStudent?.uid ||
      firebaseUser?.uid ||
      null,

    firebase_uid:
      backendData?.firebase_uid ||
      existingStudent?.firebase_uid ||
      firebaseUser?.uid ||
      null,

    student_id:
      backendData?.student_id ||
      backendStudent?.student_id ||
      backendStudent?.id ||
      existingStudent?.student_id ||
      null,

    institute_id:
      backendData?.institute_id ||
      backendStudent?.institute_id ||
      existingStudent?.institute_id ||
      null,

    name:
      backendData?.name ||
      backendData?.full_name ||
      backendStudent?.name ||
      backendUser?.full_name ||
      existingStudent?.name ||
      existingStudent?.full_name ||
      firebaseUser?.displayName ||
      "",

    full_name:
      backendData?.full_name ||
      backendData?.name ||
      backendStudent?.name ||
      backendUser?.full_name ||
      existingStudent?.full_name ||
      existingStudent?.name ||
      firebaseUser?.displayName ||
      "",

    email:
      backendData?.email ||
      backendAccount?.email ||
      backendUser?.email ||
      existingStudent?.email ||
      firebaseUser?.email ||
      "",

    phone:
      backendData?.phone ||
      backendData?.phone_number ||
      backendAccount?.phone_number ||
      backendUser?.phone_number ||
      existingStudent?.phone ||
      existingStudent?.phone_number ||
      firebaseUser?.phoneNumber ||
      "",

    phone_number:
      backendData?.phone_number ||
      backendData?.phone ||
      backendAccount?.phone_number ||
      backendUser?.phone_number ||
      existingStudent?.phone_number ||
      existingStudent?.phone ||
      firebaseUser?.phoneNumber ||
      "",

    profile_image:
      backendData?.profile_image ||
      backendData?.student_photo ||
      backendStudent?.profile_image ||
      backendUser?.profile_image ||
      existingStudent?.profile_image ||
      firebaseUser?.photoURL ||
      "",

    photoURL:
      backendData?.photoURL ||
      existingStudent?.photoURL ||
      firebaseUser?.photoURL ||
      backendData?.profile_image ||
      "",

    displayName:
      backendData?.displayName ||
      backendData?.name ||
      backendData?.full_name ||
      existingStudent?.displayName ||
      firebaseUser?.displayName ||
      "",
  };
};

/* =========================================================
   FETCH CURRENT STUDENT
========================================================= */

const fetchCurrentStudent = async (
  firebaseUser,
  existingStudent,
  instituteId
) => {
  if (!firebaseUser?.uid) {
    throw new Error(
      "Student is not authenticated."
    );
  }

  if (!instituteId) {
    throw new Error(
      "Institute ID is required to load student profile."
    );
  }

  const token =
    await firebaseUser.getIdToken();

  localStorage.setItem(
    "studentToken",
    token
  );

  const url =
    `${API}/students/me?institute_id=${encodeURIComponent(
      instituteId
    )}`;

  console.log(
    "GET STUDENT PROFILE:",
    {
      url,
      instituteId,
      firebaseUid:
        firebaseUser.uid,
      email:
        firebaseUser.email || null,
    }
  );

  const response =
    await fetch(
      url,
      {
        method: "GET",

        headers: {
          Accept:
            "application/json",

          Authorization:
            `Bearer ${token}`,
        },
      }
    );

  const result =
    await response
      .json()
      .catch(() => ({}));

  console.log(
    "STUDENT /me RESPONSE:",
    {
      status:
        response.status,
      result,
    }
  );

  if (!response.ok) {
    const error =
      new Error(
        result?.message ||
        result?.error ||
        "Unable to fetch student profile."
      );

    error.status =
      response.status;

    throw error;
  }

  const student =
    normalizeStudent(
      result,
      firebaseUser,
      existingStudent
    );

  student.institute_id =
    student.institute_id ||
    instituteId;

  saveStudent(
    student,
    token,
    instituteId
  );

  return {
    student,
    token,
  };
};

/* =========================================================
   DASHBOARD
========================================================= */

const WebsitePreviewDashboard = () => {
  const navigate =
    useNavigate();

  const context =
    useOutletContext() || {};

  const branding =
    context.branding || {};

  const instituteId =
    resolveInstituteId(
      context,
      getStoredStudent()
    );

  const primaryColor =
    branding.primaryColor ||
    branding.primary_color ||
    "#7C3AED";

  const secondaryColor =
    branding.secondaryColor ||
    branding.secondary_color ||
    "#111827";

  const accentColor =
    branding.accentColor ||
    branding.accent_color ||
    "#EC4899";

  const [
    student,
    setStudent,
  ] = useState(
    () =>
      context.studentUser ||
      getStoredStudent()
  );

  const [
    firebaseUser,
    setFirebaseUser,
  ] = useState(
    auth.currentUser
  );

  const [
    token,
    setToken,
  ] = useState(
    getStudentToken()
  );

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    profileError,
    setProfileError,
  ] = useState(null);

  const [
    bookings,
    setBookings,
  ] = useState([]);

  const [
    bookingLoading,
    setBookingLoading,
  ] = useState(false);

  /* =====================================================
     SAVE CONTEXT STUDENT
  ===================================================== */

  useEffect(() => {
    if (
      context.studentUser &&
      typeof context.studentUser ===
        "object"
    ) {
      setStudent(
        previous => ({
          ...(previous || {}),
          ...context.studentUser,
        })
      );

      saveStudent(
        context.studentUser,
        getStudentToken(),
        resolveInstituteId(
          context,
          context.studentUser
        )
      );
    }
  }, [
    context.studentUser,
    context.instituteId,
    context.institute_id,
  ]);

  /* =====================================================
     FIREBASE AUTH
  ===================================================== */

  useEffect(() => {
    let mounted = true;

    const unsubscribe =
      onAuthStateChanged(
        auth,
        async user => {
          if (!mounted) {
            return;
          }

          console.log(
            "WEBSITE DASHBOARD AUTH:",
            {
              firebaseUid:
                user?.uid || null,

              firebaseEmail:
                user?.email || null,

              studentRole:
                getStoredStudentRole(),

              studentLoggedIn:
                isStudentLoggedIn(),

              student:
                getStoredStudent(),

              instituteId:
                resolveInstituteId(
                  context,
                  getStoredStudent()
                ),
            }
          );

          if (!user) {
            setFirebaseUser(null);

            /*
             * Student login has already succeeded through
             * /students/login. Do not redirect to login just
             * because Firebase's observer temporarily has no
             * current user.
             *
             * Keep the stored student session. Also do not call
             * /students/me without a Firebase user/token.
             */
            const storedStudent = getStoredStudent();

            if (storedStudent && hasStudentSession()) {
              setStudent(storedStudent);
              setToken(getStudentToken());
              setProfileError(null);
            } else {
              setStudent(null);
              setProfileError(
                "Student login session not found. Please log in again."
              );
            }

            setLoading(false);
            return;
          }

          setFirebaseUser(
            user
          );

          const storedStudent =
            getStoredStudent();

          const currentInstituteId =
            resolveInstituteId(
              context,
              storedStudent
            );

          /*
           * A Firebase login alone does not mean
           * student login.
           *
           * However, after our student login endpoint
           * returned 200, studentUser/studentLoggedIn
           * should already exist.
           */

          try {
            setProfileError(
              null
            );

            /*
             * If the student session is already valid
             * and we have a stored student, use it
             * immediately.
             */

            if (
              hasStudentSession() &&
              storedStudent
            ) {
              setStudent(
                storedStudent
              );

              const storedToken =
                getStudentToken();

              if (
                storedToken
              ) {
                setToken(
                  storedToken
                );
              }
            }

            /*
             * If institute ID is available, verify the
             * current Firebase account with backend.
             */

            if (
              currentInstituteId
            ) {
              const result =
                await fetchCurrentStudent(
                  user,
                  storedStudent,
                  currentInstituteId
                );

              if (!mounted) {
                return;
              }

              setStudent(
                result.student
              );

              setToken(
                result.token
              );
            } else {
              /*
               * Do not make:
               *
               * GET /students/me
               *
               * with institute_id = null.
               *
               * This was the 400 error shown in your logs.
               */

              console.warn(
                "INSTITUTE ID NOT AVAILABLE. USING STORED STUDENT SESSION."
              );

              if (
                storedStudent
              ) {
                setStudent(
                  storedStudent
                );
              }

              setProfileError(
                null
              );
            }
          } catch (error) {
            console.error(
              "STUDENT PROFILE LOAD FAILED:",
              error
            );

            if (!mounted) {
              return;
            }

            /*
             * VERY IMPORTANT:
             *
             * Never clear the successful student login
             * merely because /students/me failed.
             *
             * Your Google login already returned:
             *
             * Student ID: 9
             * Account ID: 11
             *
             * Therefore keep that session.
             */

            if (
              storedStudent
            ) {
              setStudent(
                storedStudent
              );
            }

            setToken(
              getStudentToken()
            );

            /*
             * Only show the error.
             * Do NOT navigate to login.
             */

            setProfileError(
              error?.message ||
                "Unable to refresh student profile."
            );
          } finally {
            if (mounted) {
              setLoading(false);
            }
          }
        }
      );

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  /* =====================================================
     BOOKINGS
  ===================================================== */

  useEffect(() => {
    if (
      !token ||
      !student
    ) {
      return;
    }

    fetchBookings(
      token
    );
  }, [
    token,
    student,
  ]);

  const fetchBookings =
    async firebaseToken => {
      if (!firebaseToken) {
        return;
      }

      try {
        setBookingLoading(
          true
        );

        const response =
          await fetch(
            `${API}/bookings/my`,
            {
              method: "GET",

              headers: {
                Accept:
                  "application/json",

                Authorization:
                  `Bearer ${firebaseToken}`,
              },
            }
          );

        const data =
          await response
            .json()
            .catch(
              () => ({})
            );

        console.log(
          "MY BOOKINGS:",
          response.status,
          data
        );

        if (
          response.status ===
            401 &&
          auth.currentUser
        ) {
          const freshToken =
            await auth.currentUser.getIdToken();

          localStorage.setItem(
            "studentToken",
            freshToken
          );

          setToken(
            freshToken
          );

          return;
        }

        if (!response.ok) {
          throw new Error(
            data?.message ||
            data?.error ||
            `Booking request failed (${response.status})`
          );
        }

        let list = [];

        if (
          Array.isArray(data)
        ) {
          list = data;
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
      } catch (error) {
        console.error(
          "STUDENT BOOKINGS ERROR:",
          error
        );

        setBookings([]);
      } finally {
        setBookingLoading(
          false
        );
      }
    };

  /* =====================================================
     LOGIN
  ===================================================== */

  const handleLogin =
    () => {
      navigate(
        "/institute/website/preview/login"
      );
    };

  /* =====================================================
     LOGOUT
  ===================================================== */

  const handleLogout =
    async () => {
      try {
        await auth.signOut();
      } catch (error) {
        console.error(
          "STUDENT LOGOUT ERROR:",
          error
        );
      }

      clearStudentSession();

      setStudent(null);
      setFirebaseUser(null);
      setToken(null);
      setBookings([]);

      navigate(
        "/institute/website/preview/login",
        {
          replace: true,
        }
      );
    };

  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {
    return (
      <LoadingState
        primaryColor={
          primaryColor
        }
        accentColor={
          accentColor
        }
      />
    );
  }

  /* =====================================================
     STUDENT SESSION MISSING
  ===================================================== */

  if (
    !student
  ) {
    return (
      <LoginRequired
        primaryColor={
          primaryColor
        }
        accentColor={
          accentColor
        }
        onLogin={
          handleLogin
        }
        error={
          profileError
        }
      />
    );
  }

  /* =====================================================
     SAFE BOOKINGS
  ===================================================== */

  const safeBookings =
    Array.isArray(
      bookings
    )
      ? bookings
      : [];

  /* =====================================================
     TOTAL PAYMENTS
  ===================================================== */

  const totalPayments =
    safeBookings
      .filter(
        booking =>
          String(
            booking?.payment
              ?.status || ""
          ).toUpperCase() ===
          "PAID"
      )
      .reduce(
        (
          sum,
          booking
        ) =>
          sum +
          Number(
            booking?.payment
              ?.amount || 0
          ),
        0
      );

  /* =====================================================
     DISPLAY NAME
  ===================================================== */

  const displayName =
    student?.name ||
    student?.full_name ||
    student?.displayName ||
    "Student";

  /* =====================================================
     STAT CARDS
  ===================================================== */

  const statCards = [
    {
      label:
        "Bookings",

      value:
        safeBookings.length,

      icon:
        <FaBook />,
    },

    {
      label:
        "Payments",

      value:
        `₹${totalPayments.toLocaleString(
          "en-IN"
        )}`,

      icon:
        <FaRupeeSign />,
    },
  ];

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <div
      className="min-h-screen text-white"
      style={{
        background:
          branding.pageBackgroundColor ||
          branding.page_background_color ||
          "#0a0a12",
      }}
    >
      {/* BACKGROUND */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full blur-[120px]"
          style={{
            backgroundColor:
              `${primaryColor}0A`,
          }}
        />

        <div
          className="absolute -bottom-40 -right-40 h-[400px] w-[400px] rounded-full blur-[100px]"
          style={{
            backgroundColor:
              `${accentColor}08`,
          }}
        />
      </div>

      {/* CONTENT */}

      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-4 py-8 sm:px-6 lg:px-10 lg:py-14">

        {/* WELCOME */}

        <div className="mb-10 flex flex-col items-center text-center lg:mb-12">

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Welcome back,{" "}

            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  `linear-gradient(90deg, ${primaryColor}, ${accentColor})`,
              }}
            >
              {
                displayName.split(
                  " "
                )[0]
              }
            </span>
          </h1>

          <p className="mt-3 text-sm text-gray-300 sm:text-base">
            Track your learning
            journey & manage
            sessions
          </p>

        </div>

        {/* PROFILE + STATS */}

        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">

          <div className="lg:col-span-5">

            <ProfileCard
              user={student}
              setUser={
                setStudent
              }
              primaryColor={
                primaryColor
              }
              accentColor={
                accentColor
              }
              secondaryColor={
                secondaryColor
              }
            />

          </div>

          <div className="flex flex-col justify-center gap-6 lg:col-span-7 lg:pl-8">

            {statCards.map(
              item => (
                <StatCard
                  key={
                    item.label
                  }
                  item={
                    item
                  }
                  primaryColor={
                    primaryColor
                  }
                />
              )
            )}

          </div>

        </div>

        {/* PROFILE ERROR */}

        {profileError && (
          <div className="mt-6 rounded-xl border border-yellow-500/20 bg-yellow-500/10 px-4 py-3 text-sm text-yellow-300">

            <div className="flex items-center gap-2">

              <FaExclamationTriangle />

              <span>
                {profileError}
              </span>

            </div>

          </div>
        )}

        {/* BOOKINGS */}

        <div className="mt-12">

          <div className="mb-6 flex items-center gap-3">

            <div
              className="h-7 w-1.5 rounded-full"
              style={{
                background:
                  `linear-gradient(to bottom, ${primaryColor}, ${accentColor})`,
              }}
            />

            <h2 className="text-xl font-bold tracking-tight">
              My Bookings
            </h2>

          </div>

          {bookingLoading ? (
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] py-14 text-center">

              <div
                className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-transparent"
                style={{
                  borderTopColor:
                    primaryColor,

                  borderRightColor:
                    accentColor,
                }}
              />

              <p className="text-sm text-gray-400">
                Loading
                bookings...
              </p>

            </div>
          ) : safeBookings.length ===
            0 ? (
            <EmptyState
              icon={
                <FaGraduationCap className="text-5xl" />
              }
              title="No bookings yet"
              subtitle="Browse classes and book your first session!"
              primaryColor={
                primaryColor
              }
              onBrowse={() =>
                navigate(
                  "/institute/website/preview/classes"
                )
              }
            />
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

              {safeBookings.map(
                (
                  booking,
                  index
                ) => (
                  <BookingCard
                    key={
                      booking.id ||
                      booking.booking_id ||
                      index
                    }
                    booking={
                      booking
                    }
                    primaryColor={
                      primaryColor
                    }
                    accentColor={
                      accentColor
                    }
                    onViewDetails={() =>
                      navigate(
                        "/institute/website/preview/sessions"
                      )
                    }
                  />
                )
              )}

            </div>
          )}

        </div>
      </div>
    </div>
  );
};

/* =========================================================
   LOADING STATE
========================================================= */

const LoadingState = ({
  primaryColor,
  accentColor,
}) => (
  <div className="flex min-h-[70vh] items-center justify-center bg-[#0a0a12]">

    <div className="text-center">

      <div className="relative mx-auto mb-6 h-16 w-16">

        <div
          className="absolute inset-0 rounded-full border-[3px]"
          style={{
            borderColor:
              `${primaryColor}20`,
          }}
        />

        <div
          className="absolute inset-0 animate-spin rounded-full border-[3px] border-transparent"
          style={{
            borderTopColor:
              primaryColor,
          }}
        />

        <div
          className="absolute inset-2 animate-spin rounded-full border-[3px] border-transparent"
          style={{
            borderBottomColor:
              accentColor,

            animationDirection:
              "reverse",

            animationDuration:
              "1.5s",
          }}
        />

      </div>

      <p className="text-sm font-medium tracking-wide text-white">
        Loading your
        dashboard...
      </p>

    </div>
  </div>
);

/* =========================================================
   LOGIN REQUIRED
========================================================= */

const LoginRequired = ({
  primaryColor,
  accentColor,
  onLogin,
  error,
}) => (
  <div className="flex min-h-[70vh] items-center justify-center bg-[#0a0a12] px-4 text-white">

    <div className="w-full max-w-md rounded-3xl border border-white/[0.08] bg-white/[0.04] p-8 text-center shadow-2xl">

      <div
        className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl text-2xl"
        style={{
          backgroundColor:
            `${primaryColor}20`,

          color:
            primaryColor,
        }}
      >
        <FaGraduationCap />
      </div>

      <h1 className="text-2xl font-bold">
        Student Dashboard
      </h1>

      <p className="mt-3 text-sm leading-6 text-gray-400">
        {error ||
          "Please log in as a student to view your dashboard."}
      </p>

      <button
        type="button"
        onClick={
          onLogin
        }
        className="mt-7 w-full rounded-xl py-3 font-semibold text-white transition hover:opacity-90"
        style={{
          background:
            `linear-gradient(90deg, ${primaryColor}, ${accentColor})`,
        }}
      >
        Student Login
      </button>

    </div>
  </div>
);

/* =========================================================
   STAT CARD
========================================================= */

const StatCard = ({
  item,
  primaryColor,
}) => (
  <div
    className="group relative min-h-36 w-full max-w-xl overflow-hidden rounded-3xl border px-6 py-6 transition-all duration-300"
    style={{
      background:
        "linear-gradient(135deg, rgba(255,255,255,.06), rgba(255,255,255,.02))",

      borderColor:
        "rgba(255,255,255,.08)",
    }}
  >

    <div
      className="absolute right-0 top-0 h-32 w-32 rounded-full blur-3xl"
      style={{
        backgroundColor:
          `${primaryColor}12`,
      }}
    />

    <div className="relative flex items-center gap-5">

      <div
        className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl text-xl"
        style={{
          backgroundColor:
            `${primaryColor}15`,

          color:
            primaryColor,
        }}
      >
        {item.icon}
      </div>

      <div>

        <p className="text-sm font-semibold uppercase tracking-wider text-gray-300">
          {item.label}
        </p>

        <h2 className="mt-1 text-4xl font-black text-white">
          {item.value}
        </h2>

      </div>

    </div>
  </div>
);

/* =========================================================
   PROFILE CARD
========================================================= */

const ProfileCard = ({
  user,
  setUser,
  primaryColor,
  accentColor,
  secondaryColor,
}) => {
  const [
    isEditing,
    setIsEditing,
  ] = useState(false);

  const [
    saving,
    setSaving,
  ] = useState(false);

  const [
    toast,
    setToast,
  ] = useState(null);

  const createForm = (
    value = user
  ) => ({
    name:
      value?.name ||
      value?.full_name ||
      value?.displayName ||
      "",

    email:
      value?.email ||
      "",

    phone:
      value?.phone ||
      value?.phone_number ||
      value?.phoneNumber ||
      "",

    profile_image:
      value?.profile_image ||
      value?.photoURL ||
      "",
  });

  const [
    formData,
    setFormData,
  ] = useState(
    createForm()
  );

  useEffect(() => {
    setFormData(
      createForm(user)
    );
  }, [user]);

  const showToast = (
    message,
    type = "success"
  ) => {
    setToast({
      message,
      type,
    });

    setTimeout(
      () =>
        setToast(null),
      3000
    );
  };

  const handleImageChange =
    event => {
      const file =
        event.target.files?.[0];

      if (!file) {
        return;
      }

      setFormData(
        previous => ({
          ...previous,
          profile_image:
            file,
        })
      );
    };

  const resolveImage = (
    value
  ) => {
    if (
      value instanceof File
    ) {
      return URL.createObjectURL(
        value
      );
    }

    return value;
  };

  const handleSave =
    async () => {
      setSaving(true);

      try {
        let studentToken =
          localStorage.getItem(
            "studentToken"
          );

        if (
          auth.currentUser
        ) {
          studentToken =
            await auth.currentUser.getIdToken();

          localStorage.setItem(
            "studentToken",
            studentToken
          );
        }

        if (!studentToken) {
          throw new Error(
            "Student authentication token not found."
          );
        }

        const form =
          new FormData();

        form.append(
          "name",
          formData.name
        );

        form.append(
          "email",
          formData.email
        );

        form.append(
          "phone",
          formData.phone
        );

        if (
          formData.profile_image
            instanceof File
        ) {
          form.append(
            "profileImage",
            formData.profile_image
          );
        }

        const response =
          await fetch(
            `${API}/users/profile`,
            {
              method:
                "POST",

              headers: {
                Authorization:
                  `Bearer ${studentToken}`,
              },

              body:
                form,
            }
          );

        const result =
          await response
            .json()
            .catch(
              () => ({})
            );

        if (!response.ok) {
          throw new Error(
            result?.message ||
              "Profile update failed."
          );
        }

        const returnedData =
          result?.data ||
          {};

        const updated = {
          ...(user || {}),

          name:
            returnedData?.full_name ||
            returnedData?.name ||
            formData.name,

          full_name:
            returnedData?.full_name ||
            returnedData?.name ||
            formData.name,

          email:
            returnedData?.email ||
            formData.email,

          phone:
            returnedData?.phone_number ||
            returnedData?.phone ||
            formData.phone,

          phone_number:
            returnedData?.phone_number ||
            returnedData?.phone ||
            formData.phone,

          profile_image:
            returnedData?.profile_image ||
            resolveImage(
              formData.profile_image
            ),
        };

        setUser(
          updated
        );

        saveStudent(
          updated,
          studentToken,
          updated?.institute_id
        );

        setIsEditing(
          false
        );

        showToast(
          "Profile updated successfully!",
          "success"
        );
      } catch (error) {
        console.error(
          "PROFILE UPDATE ERROR:",
          error
        );

        showToast(
          error?.message ||
            "Failed to update profile.",
          "error"
        );
      } finally {
        setSaving(false);
      }
    };

  const image =
    resolveImage(
      formData.profile_image
    ) ||
    user?.photoURL ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      formData.name ||
        "Student"
    )}&background=7c3aed&color=fff&bold=true&size=200`;

  const inputClass =
    "w-full rounded-lg border border-white/[0.08] bg-white/[0.05] px-3 py-2.5 text-sm text-white outline-none transition-all placeholder:text-white/25 focus:border-violet-500/30 focus:ring-2 focus:ring-violet-500/50";

  return (
    <div className="group relative h-full">

      <div
        className="absolute -inset-0.5 rounded-3xl blur-sm opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background:
            `linear-gradient(135deg, ${primaryColor}30, ${accentColor}20)`,
        }}
      />

      <div
        className="relative flex h-full flex-col items-center rounded-3xl border p-6 text-center"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,.06), rgba(255,255,255,.02))",

          borderColor:
            "rgba(255,255,255,.08)",
        }}
      >

        {toast && (
          <div
            className={`absolute left-4 right-4 top-4 z-20 flex items-center gap-2 rounded-xl border px-4 py-2.5 backdrop-blur-xl ${
              toast.type ===
              "success"
                ? "border-emerald-500/30 bg-emerald-500/20 text-emerald-400"
                : "border-red-500/30 bg-red-500/20 text-red-400"
            }`}
          >
            {toast.type ===
            "success" ? (
              <FaCheck className="text-sm" />
            ) : (
              <FaExclamationTriangle className="text-sm" />
            )}

            <span className="text-sm font-medium">
              {toast.message}
            </span>
          </div>
        )}

        <div
          className="absolute right-0 top-0 h-32 w-32 rounded-full blur-[40px]"
          style={{
            backgroundColor:
              `${primaryColor}10`,
          }}
        />

        <div className="relative flex w-full flex-col items-center">

          <div className="relative mb-5">

            <div
              className="absolute -inset-1.5 rounded-full opacity-60 blur-sm"
              style={{
                background:
                  `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
              }}
            />

            <div
              className="relative h-28 w-28 overflow-hidden rounded-full border-[3px] bg-[#1a1a2e]"
              style={{
                borderColor:
                  secondaryColor ||
                  "#0a0a12",
              }}
            >

              <img
                src={image}
                alt={
                  formData.name ||
                  "Student"
                }
                className="h-full w-full object-cover"
                onError={
                  event => {
                    event.currentTarget.src =
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        formData.name ||
                          "Student"
                      )}&background=7c3aed&color=fff&bold=true&size=200`;
                  }
                }
              />

              {isEditing && (
                <label className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity hover:opacity-100">

                  <div className="mb-1 flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                    <FaPencilAlt className="text-sm text-white" />
                  </div>

                  <span className="text-xs font-semibold text-white">
                    Change Photo
                  </span>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={
                      handleImageChange
                    }
                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                  />

                </label>
              )}

            </div>

            <div
              className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-[3px]"
              style={{
                backgroundColor:
                  "#10B981",

                borderColor:
                  secondaryColor ||
                  "#0a0a12",
              }}
            >
              <FaCheck className="text-[9px] text-white" />
            </div>

          </div>

          <div className="mb-3 w-full text-left">

            {isEditing ? (
              <input
                type="text"
                value={
                  formData.name
                }
                onChange={
                  event =>
                    setFormData(
                      previous => ({
                        ...previous,

                        name:
                          event
                            .target
                            .value,
                      })
                    )
                }
                placeholder="Enter full name"
                className={
                  inputClass
                }
              />
            ) : (
              <h2 className="text-xl font-bold tracking-tight text-white">
                {formData.name ||
                  "Student"}
              </h2>
            )}

          </div>

          <div className="mb-3 w-full text-left">

            {isEditing ? (
              <input
                type="email"
                value={
                  formData.email
                }
                onChange={
                  event =>
                    setFormData(
                      previous => ({
                        ...previous,

                        email:
                          event
                            .target
                            .value,
                      })
                    )
                }
                placeholder="Enter email address"
                className={
                  inputClass
                }
              />
            ) : (
              <p className="w-full truncate rounded-xl border border-white/[0.05] bg-white/[0.03] px-3 py-2.5 text-xs text-gray-300">
                {formData.email ||
                  "email@example.com"}
              </p>
            )}

          </div>

          <div className="mb-6 w-full text-left">

            {isEditing ? (
              <input
                type="tel"
                value={
                  formData.phone
                }
                onChange={
                  event =>
                    setFormData(
                      previous => ({
                        ...previous,

                        phone:
                          event
                            .target
                            .value,
                      })
                    )
                }
                placeholder="Enter phone number"
                className={
                  inputClass
                }
              />
            ) : (
              <p className="w-full truncate rounded-xl border border-white/[0.05] bg-white/[0.03] px-3 py-2.5 text-xs text-gray-300">
                {formData.phone ||
                  "+91 0000000000"}
              </p>
            )}

          </div>

          {!isEditing ? (
            <button
              type="button"
              onClick={() => {
                setFormData(
                  createForm(
                    user
                  )
                );

                setIsEditing(
                  true
                );
              }}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.05] py-2.5 text-sm font-medium text-white transition hover:bg-white/[0.1]"
            >
              <FaPencilAlt className="text-xs" />
              Edit Profile
            </button>
          ) : (
            <div className="flex w-full items-center gap-2">

              <button
                type="button"
                onClick={() => {
                  setFormData(
                    createForm(
                      user
                    )
                  );

                  setIsEditing(
                    false
                  );
                }}
                className="flex-1 rounded-xl border border-white/[0.08] bg-white/[0.05] py-2.5 text-sm font-medium text-white transition hover:bg-white/[0.1]"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={
                  handleSave
                }
                disabled={
                  saving
                }
                className="flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                style={{
                  background:
                    `linear-gradient(90deg, ${primaryColor}, ${accentColor})`,
                }}
              >
                {saving ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                ) : (
                  <>
                    <FaCheck className="text-xs" />
                    Save
                  </>
                )}
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};

/* =========================================================
   BOOKING CARD
========================================================= */

const BookingCard = ({
  booking,
  primaryColor,
  accentColor,
  onViewDetails,
}) => {
  const InfoRow = ({
    icon,
    label,
    value,
    valueClass =
      "text-white",
  }) => (
    <div className="grid grid-cols-[120px_1fr] items-center border-b border-white/5 py-3 last:border-0 sm:grid-cols-[140px_1fr]">

      <div className="flex items-center gap-3 text-gray-400">

        {icon}

        <span className="text-sm font-medium">
          {label}
        </span>

      </div>

      <div
        className={`truncate text-right text-sm font-semibold ${valueClass}`}
      >
        {value || "--"}
      </div>

    </div>
  );

  const classTitle =
    booking?.class?.title ||
    booking?.class?.name ||
    booking?.class_name ||
    booking?.title ||
    "Class";

  const trainerName =
    booking?.trainer?.name ||
    booking?.trainer?.full_name ||
    booking?.trainer_name ||
    "--";

  const instituteName =
    booking?.institute?.name ||
    booking?.institute_name ||
    "--";

  const days =
    booking?.session_template?.days ||
    booking?.days ||
    booking?.available_days;

  const startTime =
    booking?.session_template?.start_time ||
    booking?.start_time;

  const paymentAmount =
    booking?.payment?.amount ||
    booking?.amount ||
    0;

  return (
    <div
      className="group relative rounded-2xl border bg-[#14141D] p-6 transition-all duration-300 hover:shadow-2xl"
      style={{
        borderColor:
          "rgba(255,255,255,.10)",
      }}
    >

      <div
        className="absolute left-0 top-0 h-1 w-full rounded-t-2xl"
        style={{
          background:
            `linear-gradient(90deg, ${primaryColor}, ${accentColor})`,
        }}
      />

      <h2 className="mb-6 truncate text-xl font-bold text-white">
        {classTitle}
      </h2>

      <div className="space-y-1">

        <InfoRow
          icon={
            <FaUserTie
              style={{
                color:
                  primaryColor,
              }}
            />
          }
          label="Trainer"
          value={
            trainerName
          }
        />

        <InfoRow
          icon={
            <FaCalendarWeek
              style={{
                color:
                  primaryColor,
              }}
            />
          }
          label="Days"
          value={
            Array.isArray(
              days
            )
              ? days.join(
                  ", "
                )
              : days
          }
        />

        <InfoRow
          icon={
            <FaClock
              style={{
                color:
                  primaryColor,
              }}
            />
          }
          label="Time"
          value={
            startTime
          }
        />

        <InfoRow
          icon={
            <FaUniversity
              style={{
                color:
                  primaryColor,
              }}
            />
          }
          label="Institute"
          value={
            instituteName
          }
        />

        <InfoRow
          icon={
            <FaMoneyBillWave className="text-green-400" />
          }
          label="Payment"
          value={
            `₹${paymentAmount}`
          }
          valueClass="text-green-400"
        />

      </div>

      <button
        type="button"
        onClick={
          onViewDetails
        }
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl py-3 font-semibold text-white transition hover:scale-[1.02] hover:opacity-90"
        style={{
          background:
            `linear-gradient(90deg, ${primaryColor}, ${accentColor})`,
        }}
      >
        View Details
        <FaArrowRight />
      </button>

    </div>
  );
};

/* =========================================================
   EMPTY STATE
========================================================= */

const EmptyState = ({
  icon,
  title,
  subtitle,
  primaryColor,
  onBrowse,
}) => (
  <div className="rounded-2xl border border-dashed border-white/[0.08] bg-white/[0.015] py-16 text-center">

    <div
      className="mb-5 flex justify-center"
      style={{
        color:
          `${primaryColor}40`,
      }}
    >
      {icon}
    </div>

    <p className="text-lg font-semibold text-white">
      {title}
    </p>

    <p className="mx-auto mt-2 max-w-xs text-sm text-gray-400">
      {subtitle}
    </p>

    {onBrowse && (
      <button
        type="button"
        onClick={
          onBrowse
        }
        className="mt-6 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
        style={{
          backgroundColor:
            primaryColor,
        }}
      >
        Browse Classes
      </button>
    )}

  </div>
);

export default WebsitePreviewDashboard;