// import { useEffect, useState } from "react";
// import { useNavigate, useOutletContext } from "react-router-dom";
// import { onAuthStateChanged } from "firebase/auth";

// import {
//   FaBook,
//   FaRupeeSign,
//   FaArrowRight,
//   FaGraduationCap,
//   FaClock,
//   FaCalendarWeek,
//   FaCheck,
//   FaPencilAlt,
//   FaUserTie,
//   FaExclamationTriangle,
//   FaUniversity,
//   FaMoneyBillWave,
// } from "react-icons/fa";

// import { auth } from "../../config/firebase";

// const API =
//   import.meta.env.VITE_API_URL ||
//   "http://localhost:5000/api";

// const STUDENT_ROLE = "STUDENT";

// /* =========================================================
//    STORAGE HELPERS
// ========================================================= */

// const getStoredStudent = () => {
//   try {
//     const raw = localStorage.getItem("studentUser");

//     if (!raw) {
//       return null;
//     }

//     const parsed = JSON.parse(raw);

//     return parsed && typeof parsed === "object"
//       ? parsed
//       : null;
//   } catch (error) {
//     console.error("STUDENT STORAGE PARSE ERROR:", error);

//     localStorage.removeItem("studentUser");

//     return null;
//   }
// };

// const getStoredStudentRole = () =>
//   String(
//     localStorage.getItem("studentRole") || ""
//   )
//     .trim()
//     .toUpperCase();

// const isStudentLoggedIn = () =>
//   localStorage.getItem("studentLoggedIn") === "true";

// const getStudentToken = () =>
//   localStorage.getItem("studentToken") || null;

// const getStoredInstituteId = () => {
//   const possibleKeys = [
//     "instituteId",
//     "institute_id",
//     "websiteInstituteId",
//     "website_institute_id",
//     "selectedInstituteId",
//     "selected_institute_id",
//   ];

//   for (const key of possibleKeys) {
//     const value = localStorage.getItem(key);

//     if (value) {
//       const numberValue = Number(value);

//       if (Number.isInteger(numberValue) && numberValue > 0) {
//         return numberValue;
//       }
//     }
//   }

//   return null;
// };

// /* =========================================================
//    EXTRACT INSTITUTE ID
// ========================================================= */

// const resolveInstituteId = (
//   context,
//   student = null
// ) => {
//   const candidates = [
//     context?.instituteId,
//     context?.institute_id,
//     context?.website?.institute_id,
//     context?.website?.instituteId,
//     context?.websiteData?.institute_id,
//     context?.websiteData?.instituteId,
//     context?.publicWebsite?.institute_id,
//     context?.publicWebsite?.instituteId,
//     student?.institute_id,
//     student?.instituteId,
//     student?.institute?.id,
//     getStoredInstituteId(),
//   ];

//   for (const value of candidates) {
//     const numberValue = Number(value);

//     if (
//       Number.isInteger(numberValue) &&
//       numberValue > 0
//     ) {
//       return numberValue;
//     }
//   }

//   /*
//    * Your current website preview URL is:
//    *
//    * /institute/website/preview
//    *
//    * and your current institute is 14.
//    *
//    * Normally the parent website context should provide
//    * this value. This fallback prevents /students/me from
//    * being called with institute_id = null during preview.
//    */

//   if (
//     window.location.pathname.startsWith(
//       "/institute/website/preview"
//     )
//   ) {
//     const urlInstituteId =
//       new URLSearchParams(
//         window.location.search
//       ).get("institute_id");

//     if (urlInstituteId) {
//       const numberValue = Number(
//         urlInstituteId
//       );

//       if (
//         Number.isInteger(numberValue) &&
//         numberValue > 0
//       ) {
//         return numberValue;
//       }
//     }
//   }

//   return null;
// };

// /* =========================================================
//    SAVE STUDENT SESSION
// ========================================================= */

// const saveStudent = (
//   student,
//   token = null,
//   instituteId = null
// ) => {
//   if (!student) {
//     return;
//   }

//   try {
//     localStorage.setItem(
//       "studentUser",
//       JSON.stringify(student)
//     );

//     localStorage.setItem(
//       "studentRole",
//       STUDENT_ROLE
//     );

//     localStorage.setItem(
//       "studentLoggedIn",
//       "true"
//     );

//     if (token) {
//       localStorage.setItem(
//         "studentToken",
//         token
//       );
//     }

//     if (instituteId) {
//       localStorage.setItem(
//         "instituteId",
//         String(instituteId)
//       );

//       localStorage.setItem(
//         "institute_id",
//         String(instituteId)
//       );
//     }
//   } catch (error) {
//     console.error(
//       "SAVE STUDENT SESSION ERROR:",
//       error
//     );
//   }
// };

// /* =========================================================
//    CLEAR STUDENT SESSION
// ========================================================= */

// const clearStudentSession = () => {
//   localStorage.removeItem(
//     "studentUser"
//   );

//   localStorage.removeItem(
//     "studentToken"
//   );

//   localStorage.removeItem(
//     "studentRole"
//   );

//   localStorage.removeItem(
//     "studentLoggedIn"
//   );
// };

// /* =========================================================
//    STUDENT SESSION
// ========================================================= */

// const hasStudentSession = () => {
//   const role =
//     getStoredStudentRole();

//   const loggedIn =
//     isStudentLoggedIn();

//   const student =
//     getStoredStudent();

//   if (
//     role === STUDENT_ROLE &&
//     loggedIn
//   ) {
//     return true;
//   }

//   if (
//     student &&
//     (
//       student.student_id ||
//       student.studentId ||
//       String(
//         student.role || ""
//       ).toUpperCase() ===
//         STUDENT_ROLE ||
//       String(
//         student.user_type || ""
//       ).toUpperCase() ===
//         STUDENT_ROLE
//     )
//   ) {
//     return true;
//   }

//   return false;
// };

// /* =========================================================
//    NORMALIZE STUDENT
// ========================================================= */

// const normalizeStudent = (
//   responseData,
//   firebaseUser = null,
//   existingStudent = null
// ) => {
//   const backendData =
//     responseData?.data ||
//     responseData?.student ||
//     responseData ||
//     {};

//   const backendStudent =
//     backendData?.student ||
//     {};

//   const backendUser =
//     backendData?.user ||
//     {};

//   const backendAccount =
//     backendData?.account ||
//     {};

//   return {
//     ...(existingStudent || {}),
//     ...backendData,
//     ...backendStudent,

//     uid:
//       backendData?.uid ||
//       backendData?.firebase_uid ||
//       existingStudent?.uid ||
//       firebaseUser?.uid ||
//       null,

//     firebase_uid:
//       backendData?.firebase_uid ||
//       existingStudent?.firebase_uid ||
//       firebaseUser?.uid ||
//       null,

//     student_id:
//       backendData?.student_id ||
//       backendStudent?.student_id ||
//       backendStudent?.id ||
//       existingStudent?.student_id ||
//       null,

//     institute_id:
//       backendData?.institute_id ||
//       backendStudent?.institute_id ||
//       existingStudent?.institute_id ||
//       null,

//     name:
//       backendData?.name ||
//       backendData?.full_name ||
//       backendStudent?.name ||
//       backendUser?.full_name ||
//       existingStudent?.name ||
//       existingStudent?.full_name ||
//       firebaseUser?.displayName ||
//       "",

//     full_name:
//       backendData?.full_name ||
//       backendData?.name ||
//       backendStudent?.name ||
//       backendUser?.full_name ||
//       existingStudent?.full_name ||
//       existingStudent?.name ||
//       firebaseUser?.displayName ||
//       "",

//     email:
//       backendData?.email ||
//       backendAccount?.email ||
//       backendUser?.email ||
//       existingStudent?.email ||
//       firebaseUser?.email ||
//       "",

//     phone:
//       backendData?.phone ||
//       backendData?.phone_number ||
//       backendAccount?.phone_number ||
//       backendUser?.phone_number ||
//       existingStudent?.phone ||
//       existingStudent?.phone_number ||
//       firebaseUser?.phoneNumber ||
//       "",

//     phone_number:
//       backendData?.phone_number ||
//       backendData?.phone ||
//       backendAccount?.phone_number ||
//       backendUser?.phone_number ||
//       existingStudent?.phone_number ||
//       existingStudent?.phone ||
//       firebaseUser?.phoneNumber ||
//       "",

//     profile_image:
//       backendData?.profile_image ||
//       backendData?.student_photo ||
//       backendStudent?.profile_image ||
//       backendUser?.profile_image ||
//       existingStudent?.profile_image ||
//       firebaseUser?.photoURL ||
//       "",

//     photoURL:
//       backendData?.photoURL ||
//       existingStudent?.photoURL ||
//       firebaseUser?.photoURL ||
//       backendData?.profile_image ||
//       "",

//     displayName:
//       backendData?.displayName ||
//       backendData?.name ||
//       backendData?.full_name ||
//       existingStudent?.displayName ||
//       firebaseUser?.displayName ||
//       "",
//   };
// };

// /* =========================================================
//    FETCH CURRENT STUDENT
// ========================================================= */

// const fetchCurrentStudent = async (
//   firebaseUser,
//   existingStudent,
//   instituteId
// ) => {
//   if (!firebaseUser?.uid) {
//     throw new Error(
//       "Student is not authenticated."
//     );
//   }

//   if (!instituteId) {
//     throw new Error(
//       "Institute ID is required to load student profile."
//     );
//   }

//   const token =
//     await firebaseUser.getIdToken();

//   localStorage.setItem(
//     "studentToken",
//     token
//   );

//   const url =
//     `${API}/students/me?institute_id=${encodeURIComponent(
//       instituteId
//     )}`;

//   console.log(
//     "GET STUDENT PROFILE:",
//     {
//       url,
//       instituteId,
//       firebaseUid:
//         firebaseUser.uid,
//       email:
//         firebaseUser.email || null,
//     }
//   );

//   const response =
//     await fetch(
//       url,
//       {
//         method: "GET",

//         headers: {
//           Accept:
//             "application/json",

//           Authorization:
//             `Bearer ${token}`,
//         },
//       }
//     );

//   const result =
//     await response
//       .json()
//       .catch(() => ({}));

//   console.log(
//     "STUDENT /me RESPONSE:",
//     {
//       status:
//         response.status,
//       result,
//     }
//   );

//   if (!response.ok) {
//     const error =
//       new Error(
//         result?.message ||
//         result?.error ||
//         "Unable to fetch student profile."
//       );

//     error.status =
//       response.status;

//     throw error;
//   }

//   const student =
//     normalizeStudent(
//       result,
//       firebaseUser,
//       existingStudent
//     );

//   student.institute_id =
//     student.institute_id ||
//     instituteId;

//   saveStudent(
//     student,
//     token,
//     instituteId
//   );

//   return {
//     student,
//     token,
//   };
// };

// /* =========================================================
//    DASHBOARD
// ========================================================= */

// const WebsitePreviewDashboard = () => {
//   const navigate =
//     useNavigate();

//   const context =
//     useOutletContext() || {};

//   const branding =
//     context.branding || {};

//   const instituteId =
//     resolveInstituteId(
//       context,
//       getStoredStudent()
//     );

//   const primaryColor =
//     branding.primaryColor ||
//     branding.primary_color ||
//     "#7C3AED";

//   const secondaryColor =
//     branding.secondaryColor ||
//     branding.secondary_color ||
//     "#111827";

//   const accentColor =
//     branding.accentColor ||
//     branding.accent_color ||
//     "#EC4899";

//   const [
//     student,
//     setStudent,
//   ] = useState(
//     () =>
//       context.studentUser ||
//       getStoredStudent()
//   );

//   const [
//     firebaseUser,
//     setFirebaseUser,
//   ] = useState(
//     auth.currentUser
//   );

//   const [
//     token,
//     setToken,
//   ] = useState(
//     getStudentToken()
//   );

//   const [
//     loading,
//     setLoading,
//   ] = useState(true);

//   const [
//     profileError,
//     setProfileError,
//   ] = useState(null);

//   const [
//     bookings,
//     setBookings,
//   ] = useState([]);

//   const [
//     bookingLoading,
//     setBookingLoading,
//   ] = useState(false);

//   /* =====================================================
//      SAVE CONTEXT STUDENT
//   ===================================================== */

//   useEffect(() => {
//     if (
//       context.studentUser &&
//       typeof context.studentUser ===
//         "object"
//     ) {
//       setStudent(
//         previous => ({
//           ...(previous || {}),
//           ...context.studentUser,
//         })
//       );

//       saveStudent(
//         context.studentUser,
//         getStudentToken(),
//         resolveInstituteId(
//           context,
//           context.studentUser
//         )
//       );
//     }
//   }, [
//     context.studentUser,
//     context.instituteId,
//     context.institute_id,
//   ]);

//   /* =====================================================
//      FIREBASE AUTH
//   ===================================================== */

//   useEffect(() => {
//     let mounted = true;

//     const unsubscribe =
//       onAuthStateChanged(
//         auth,
//         async user => {
//           if (!mounted) {
//             return;
//           }

//           console.log(
//             "WEBSITE DASHBOARD AUTH:",
//             {
//               firebaseUid:
//                 user?.uid || null,

//               firebaseEmail:
//                 user?.email || null,

//               studentRole:
//                 getStoredStudentRole(),

//               studentLoggedIn:
//                 isStudentLoggedIn(),

//               student:
//                 getStoredStudent(),

//               instituteId:
//                 resolveInstituteId(
//                   context,
//                   getStoredStudent()
//                 ),
//             }
//           );

//           if (!user) {
//             setFirebaseUser(null);

//             /*
//              * Student login has already succeeded through
//              * /students/login. Do not redirect to login just
//              * because Firebase's observer temporarily has no
//              * current user.
//              *
//              * Keep the stored student session. Also do not call
//              * /students/me without a Firebase user/token.
//              */
//             const storedStudent = getStoredStudent();

//             if (storedStudent && hasStudentSession()) {
//               setStudent(storedStudent);
//               setToken(getStudentToken());
//               setProfileError(null);
//             } else {
//               setStudent(null);
//               setProfileError(
//                 "Student login session not found. Please log in again."
//               );
//             }

//             setLoading(false);
//             return;
//           }

//           setFirebaseUser(
//             user
//           );

//           const storedStudent =
//             getStoredStudent();

//           const currentInstituteId =
//             resolveInstituteId(
//               context,
//               storedStudent
//             );

//           /*
//            * A Firebase login alone does not mean
//            * student login.
//            *
//            * However, after our student login endpoint
//            * returned 200, studentUser/studentLoggedIn
//            * should already exist.
//            */

//           try {
//             setProfileError(
//               null
//             );

//             /*
//              * If the student session is already valid
//              * and we have a stored student, use it
//              * immediately.
//              */

//             if (
//               hasStudentSession() &&
//               storedStudent
//             ) {
//               setStudent(
//                 storedStudent
//               );

//               const storedToken =
//                 getStudentToken();

//               if (
//                 storedToken
//               ) {
//                 setToken(
//                   storedToken
//                 );
//               }
//             }

//             /*
//              * If institute ID is available, verify the
//              * current Firebase account with backend.
//              */

//             if (
//               currentInstituteId
//             ) {
//               const result =
//                 await fetchCurrentStudent(
//                   user,
//                   storedStudent,
//                   currentInstituteId
//                 );

//               if (!mounted) {
//                 return;
//               }

//               setStudent(
//                 result.student
//               );

//               setToken(
//                 result.token
//               );
//             } else {
//               /*
//                * Do not make:
//                *
//                * GET /students/me
//                *
//                * with institute_id = null.
//                *
//                * This was the 400 error shown in your logs.
//                */

//               console.warn(
//                 "INSTITUTE ID NOT AVAILABLE. USING STORED STUDENT SESSION."
//               );

//               if (
//                 storedStudent
//               ) {
//                 setStudent(
//                   storedStudent
//                 );
//               }

//               setProfileError(
//                 null
//               );
//             }
//           } catch (error) {
//             console.error(
//               "STUDENT PROFILE LOAD FAILED:",
//               error
//             );

//             if (!mounted) {
//               return;
//             }

//             /*
//              * VERY IMPORTANT:
//              *
//              * Never clear the successful student login
//              * merely because /students/me failed.
//              *
//              * Your Google login already returned:
//              *
//              * Student ID: 9
//              * Account ID: 11
//              *
//              * Therefore keep that session.
//              */

//             if (
//               storedStudent
//             ) {
//               setStudent(
//                 storedStudent
//               );
//             }

//             setToken(
//               getStudentToken()
//             );

//             /*
//              * Only show the error.
//              * Do NOT navigate to login.
//              */

//             setProfileError(
//               error?.message ||
//                 "Unable to refresh student profile."
//             );
//           } finally {
//             if (mounted) {
//               setLoading(false);
//             }
//           }
//         }
//       );

//     return () => {
//       mounted = false;
//       unsubscribe();
//     };
//   }, []);

//   /* =====================================================
//      BOOKINGS
//   ===================================================== */

//   useEffect(() => {
//     if (
//       !token ||
//       !student
//     ) {
//       return;
//     }

//     fetchBookings(
//       token
//     );
//   }, [
//     token,
//     student,
//   ]);

//   const fetchBookings =
//     async firebaseToken => {
//       if (!firebaseToken) {
//         return;
//       }

//       try {
//         setBookingLoading(
//           true
//         );

//         const response =
//           await fetch(
//             `${API}/bookings/my`,
//             {
//               method: "GET",

//               headers: {
//                 Accept:
//                   "application/json",

//                 Authorization:
//                   `Bearer ${firebaseToken}`,
//               },
//             }
//           );

//         const data =
//           await response
//             .json()
//             .catch(
//               () => ({})
//             );

//         console.log(
//           "MY BOOKINGS:",
//           response.status,
//           data
//         );

//         if (
//           response.status ===
//             401 &&
//           auth.currentUser
//         ) {
//           const freshToken =
//             await auth.currentUser.getIdToken();

//           localStorage.setItem(
//             "studentToken",
//             freshToken
//           );

//           setToken(
//             freshToken
//           );

//           return;
//         }

//         if (!response.ok) {
//           throw new Error(
//             data?.message ||
//             data?.error ||
//             `Booking request failed (${response.status})`
//           );
//         }

//         let list = [];

//         if (
//           Array.isArray(data)
//         ) {
//           list = data;
//         } else if (
//           Array.isArray(
//             data?.data?.bookings
//           )
//         ) {
//           list =
//             data.data.bookings;
//         } else if (
//           Array.isArray(
//             data?.bookings
//           )
//         ) {
//           list =
//             data.bookings;
//         } else if (
//           Array.isArray(
//             data?.data
//           )
//         ) {
//           list =
//             data.data;
//         }

//         setBookings(
//           list
//         );
//       } catch (error) {
//         console.error(
//           "STUDENT BOOKINGS ERROR:",
//           error
//         );

//         setBookings([]);
//       } finally {
//         setBookingLoading(
//           false
//         );
//       }
//     };

//   /* =====================================================
//      LOGIN
//   ===================================================== */

//   const handleLogin =
//     () => {
//       navigate(
//         "/institute/website/preview/login"
//       );
//     };

//   /* =====================================================
//      LOGOUT
//   ===================================================== */

//   const handleLogout =
//     async () => {
//       try {
//         await auth.signOut();
//       } catch (error) {
//         console.error(
//           "STUDENT LOGOUT ERROR:",
//           error
//         );
//       }

//       clearStudentSession();

//       setStudent(null);
//       setFirebaseUser(null);
//       setToken(null);
//       setBookings([]);

//       navigate(
//         "/institute/website/preview/login",
//         {
//           replace: true,
//         }
//       );
//     };

//   /* =====================================================
//      LOADING
//   ===================================================== */

//   if (loading) {
//     return (
//       <LoadingState
//         primaryColor={
//           primaryColor
//         }
//         accentColor={
//           accentColor
//         }
//       />
//     );
//   }

//   /* =====================================================
//      STUDENT SESSION MISSING
//   ===================================================== */

//   if (
//     !student
//   ) {
//     return (
//       <LoginRequired
//         primaryColor={
//           primaryColor
//         }
//         accentColor={
//           accentColor
//         }
//         onLogin={
//           handleLogin
//         }
//         error={
//           profileError
//         }
//       />
//     );
//   }

//   /* =====================================================
//      SAFE BOOKINGS
//   ===================================================== */

//   const safeBookings =
//     Array.isArray(
//       bookings
//     )
//       ? bookings
//       : [];

//   /* =====================================================
//      TOTAL PAYMENTS
//   ===================================================== */

//   const totalPayments =
//     safeBookings
//       .filter(
//         booking =>
//           String(
//             booking?.payment
//               ?.status || ""
//           ).toUpperCase() ===
//           "PAID"
//       )
//       .reduce(
//         (
//           sum,
//           booking
//         ) =>
//           sum +
//           Number(
//             booking?.payment
//               ?.amount || 0
//           ),
//         0
//       );

//   /* =====================================================
//      DISPLAY NAME
//   ===================================================== */

//   const displayName =
//     student?.name ||
//     student?.full_name ||
//     student?.displayName ||
//     "Student";

//   /* =====================================================
//      STAT CARDS
//   ===================================================== */

//   const statCards = [
//     {
//       label:
//         "Bookings",

//       value:
//         safeBookings.length,

//       icon:
//         <FaBook />,
//     },

//     {
//       label:
//         "Payments",

//       value:
//         `₹${totalPayments.toLocaleString(
//           "en-IN"
//         )}`,

//       icon:
//         <FaRupeeSign />,
//     },
//   ];

//   /* =====================================================
//      RENDER
//   ===================================================== */

//   return (
//     <div
//       className="min-h-screen text-white"
//       style={{
//         background:
//           branding.pageBackgroundColor ||
//           branding.page_background_color ||
//           "#0a0a12",
//       }}
//     >
//       {/* BACKGROUND */}

//       <div className="pointer-events-none fixed inset-0 overflow-hidden">
//         <div
//           className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full blur-[120px]"
//           style={{
//             backgroundColor:
//               `${primaryColor}0A`,
//           }}
//         />

//         <div
//           className="absolute -bottom-40 -right-40 h-[400px] w-[400px] rounded-full blur-[100px]"
//           style={{
//             backgroundColor:
//               `${accentColor}08`,
//           }}
//         />
//       </div>

//       {/* CONTENT */}

//       <div className="relative z-10 mx-auto w-full max-w-[1500px] px-4 py-8 sm:px-6 lg:px-10 lg:py-14">

//         {/* WELCOME */}

//         <div className="mb-10 flex flex-col items-center text-center lg:mb-12">

//           <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
//             Welcome back,{" "}

//             <span
//               className="bg-clip-text text-transparent"
//               style={{
//                 backgroundImage:
//                   `linear-gradient(90deg, ${primaryColor}, ${accentColor})`,
//               }}
//             >
//               {
//                 displayName.split(
//                   " "
//                 )[0]
//               }
//             </span>
//           </h1>

//           <p className="mt-3 text-sm text-gray-300 sm:text-base">
//             Track your learning
//             journey & manage
//             sessions
//           </p>

//         </div>

//         {/* PROFILE + STATS */}

//         <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">

//           <div className="lg:col-span-5">

//             <ProfileCard
//               user={student}
//               setUser={
//                 setStudent
//               }
//               primaryColor={
//                 primaryColor
//               }
//               accentColor={
//                 accentColor
//               }
//               secondaryColor={
//                 secondaryColor
//               }
//             />

//           </div>

//           <div className="flex flex-col justify-center gap-6 lg:col-span-7 lg:pl-8">

//             {statCards.map(
//               item => (
//                 <StatCard
//                   key={
//                     item.label
//                   }
//                   item={
//                     item
//                   }
//                   primaryColor={
//                     primaryColor
//                   }
//                 />
//               )
//             )}

//           </div>

//         </div>

//         {/* PROFILE ERROR */}

//         {profileError && (
//           <div className="mt-6 rounded-xl border border-yellow-500/20 bg-yellow-500/10 px-4 py-3 text-sm text-yellow-300">

//             <div className="flex items-center gap-2">

//               <FaExclamationTriangle />

//               <span>
//                 {profileError}
//               </span>

//             </div>

//           </div>
//         )}

//         {/* BOOKINGS */}

//         <div className="mt-12">

//           <div className="mb-6 flex items-center gap-3">

//             <div
//               className="h-7 w-1.5 rounded-full"
//               style={{
//                 background:
//                   `linear-gradient(to bottom, ${primaryColor}, ${accentColor})`,
//               }}
//             />

//             <h2 className="text-xl font-bold tracking-tight">
//               My Bookings
//             </h2>

//           </div>

//           {bookingLoading ? (
//             <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] py-14 text-center">

//               <div
//                 className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-transparent"
//                 style={{
//                   borderTopColor:
//                     primaryColor,

//                   borderRightColor:
//                     accentColor,
//                 }}
//               />

//               <p className="text-sm text-gray-400">
//                 Loading
//                 bookings...
//               </p>

//             </div>
//           ) : safeBookings.length ===
//             0 ? (
//             <EmptyState
//               icon={
//                 <FaGraduationCap className="text-5xl" />
//               }
//               title="No bookings yet"
//               subtitle="Browse classes and book your first session!"
//               primaryColor={
//                 primaryColor
//               }
//               onBrowse={() =>
//                 navigate(
//                   "/institute/website/preview/classes"
//                 )
//               }
//             />
//           ) : (
//             <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

//               {safeBookings.map(
//                 (
//                   booking,
//                   index
//                 ) => (
//                   <BookingCard
//                     key={
//                       booking.id ||
//                       booking.booking_id ||
//                       index
//                     }
//                     booking={
//                       booking
//                     }
//                     primaryColor={
//                       primaryColor
//                     }
//                     accentColor={
//                       accentColor
//                     }
//                     onViewDetails={() =>
//                       navigate(
//                         "/institute/website/preview/sessions"
//                       )
//                     }
//                   />
//                 )
//               )}

//             </div>
//           )}

//         </div>
//       </div>
//     </div>
//   );
// };

// /* =========================================================
//    LOADING STATE
// ========================================================= */

// const LoadingState = ({
//   primaryColor,
//   accentColor,
// }) => (
//   <div className="flex min-h-[70vh] items-center justify-center bg-[#0a0a12]">

//     <div className="text-center">

//       <div className="relative mx-auto mb-6 h-16 w-16">

//         <div
//           className="absolute inset-0 rounded-full border-[3px]"
//           style={{
//             borderColor:
//               `${primaryColor}20`,
//           }}
//         />

//         <div
//           className="absolute inset-0 animate-spin rounded-full border-[3px] border-transparent"
//           style={{
//             borderTopColor:
//               primaryColor,
//           }}
//         />

//         <div
//           className="absolute inset-2 animate-spin rounded-full border-[3px] border-transparent"
//           style={{
//             borderBottomColor:
//               accentColor,

//             animationDirection:
//               "reverse",

//             animationDuration:
//               "1.5s",
//           }}
//         />

//       </div>

//       <p className="text-sm font-medium tracking-wide text-white">
//         Loading your
//         dashboard...
//       </p>

//     </div>
//   </div>
// );

// /* =========================================================
//    LOGIN REQUIRED
// ========================================================= */

// const LoginRequired = ({
//   primaryColor,
//   accentColor,
//   onLogin,
//   error,
// }) => (
//   <div className="flex min-h-[70vh] items-center justify-center bg-[#0a0a12] px-4 text-white">

//     <div className="w-full max-w-md rounded-3xl border border-white/[0.08] bg-white/[0.04] p-8 text-center shadow-2xl">

//       <div
//         className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl text-2xl"
//         style={{
//           backgroundColor:
//             `${primaryColor}20`,

//           color:
//             primaryColor,
//         }}
//       >
//         <FaGraduationCap />
//       </div>

//       <h1 className="text-2xl font-bold">
//         Student Dashboard
//       </h1>

//       <p className="mt-3 text-sm leading-6 text-gray-400">
//         {error ||
//           "Please log in as a student to view your dashboard."}
//       </p>

//       <button
//         type="button"
//         onClick={
//           onLogin
//         }
//         className="mt-7 w-full rounded-xl py-3 font-semibold text-white transition hover:opacity-90"
//         style={{
//           background:
//             `linear-gradient(90deg, ${primaryColor}, ${accentColor})`,
//         }}
//       >
//         Student Login
//       </button>

//     </div>
//   </div>
// );

// /* =========================================================
//    STAT CARD
// ========================================================= */

// const StatCard = ({
//   item,
//   primaryColor,
// }) => (
//   <div
//     className="group relative min-h-36 w-full max-w-xl overflow-hidden rounded-3xl border px-6 py-6 transition-all duration-300"
//     style={{
//       background:
//         "linear-gradient(135deg, rgba(255,255,255,.06), rgba(255,255,255,.02))",

//       borderColor:
//         "rgba(255,255,255,.08)",
//     }}
//   >

//     <div
//       className="absolute right-0 top-0 h-32 w-32 rounded-full blur-3xl"
//       style={{
//         backgroundColor:
//           `${primaryColor}12`,
//       }}
//     />

//     <div className="relative flex items-center gap-5">

//       <div
//         className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl text-xl"
//         style={{
//           backgroundColor:
//             `${primaryColor}15`,

//           color:
//             primaryColor,
//         }}
//       >
//         {item.icon}
//       </div>

//       <div>

//         <p className="text-sm font-semibold uppercase tracking-wider text-gray-300">
//           {item.label}
//         </p>

//         <h2 className="mt-1 text-4xl font-black text-white">
//           {item.value}
//         </h2>

//       </div>

//     </div>
//   </div>
// );

// /* =========================================================
//    PROFILE CARD
// ========================================================= */

// const ProfileCard = ({
//   user,
//   setUser,
//   primaryColor,
//   accentColor,
//   secondaryColor,
// }) => {
//   const [
//     isEditing,
//     setIsEditing,
//   ] = useState(false);

//   const [
//     saving,
//     setSaving,
//   ] = useState(false);

//   const [
//     toast,
//     setToast,
//   ] = useState(null);

//   const createForm = (
//     value = user
//   ) => ({
//     name:
//       value?.name ||
//       value?.full_name ||
//       value?.displayName ||
//       "",

//     email:
//       value?.email ||
//       "",

//     phone:
//       value?.phone ||
//       value?.phone_number ||
//       value?.phoneNumber ||
//       "",

//     profile_image:
//       value?.profile_image ||
//       value?.photoURL ||
//       "",
//   });

//   const [
//     formData,
//     setFormData,
//   ] = useState(
//     createForm()
//   );

//   useEffect(() => {
//     setFormData(
//       createForm(user)
//     );
//   }, [user]);

//   const showToast = (
//     message,
//     type = "success"
//   ) => {
//     setToast({
//       message,
//       type,
//     });

//     setTimeout(
//       () =>
//         setToast(null),
//       3000
//     );
//   };

//   const handleImageChange =
//     event => {
//       const file =
//         event.target.files?.[0];

//       if (!file) {
//         return;
//       }

//       setFormData(
//         previous => ({
//           ...previous,
//           profile_image:
//             file,
//         })
//       );
//     };

//   const resolveImage = (
//     value
//   ) => {
//     if (
//       value instanceof File
//     ) {
//       return URL.createObjectURL(
//         value
//       );
//     }

//     return value;
//   };

//   const handleSave =
//     async () => {
//       setSaving(true);

//       try {
//         let studentToken =
//           localStorage.getItem(
//             "studentToken"
//           );

//         if (
//           auth.currentUser
//         ) {
//           studentToken =
//             await auth.currentUser.getIdToken();

//           localStorage.setItem(
//             "studentToken",
//             studentToken
//           );
//         }

//         if (!studentToken) {
//           throw new Error(
//             "Student authentication token not found."
//           );
//         }

//         const form =
//           new FormData();

//         form.append(
//           "name",
//           formData.name
//         );

//         form.append(
//           "email",
//           formData.email
//         );

//         form.append(
//           "phone",
//           formData.phone
//         );

//         if (
//           formData.profile_image
//             instanceof File
//         ) {
//           form.append(
//             "profileImage",
//             formData.profile_image
//           );
//         }

//         const response =
//           await fetch(
//             `${API}/users/profile`,
//             {
//               method:
//                 "POST",

//               headers: {
//                 Authorization:
//                   `Bearer ${studentToken}`,
//               },

//               body:
//                 form,
//             }
//           );

//         const result =
//           await response
//             .json()
//             .catch(
//               () => ({})
//             );

//         if (!response.ok) {
//           throw new Error(
//             result?.message ||
//               "Profile update failed."
//           );
//         }

//         const returnedData =
//           result?.data ||
//           {};

//         const updated = {
//           ...(user || {}),

//           name:
//             returnedData?.full_name ||
//             returnedData?.name ||
//             formData.name,

//           full_name:
//             returnedData?.full_name ||
//             returnedData?.name ||
//             formData.name,

//           email:
//             returnedData?.email ||
//             formData.email,

//           phone:
//             returnedData?.phone_number ||
//             returnedData?.phone ||
//             formData.phone,

//           phone_number:
//             returnedData?.phone_number ||
//             returnedData?.phone ||
//             formData.phone,

//           profile_image:
//             returnedData?.profile_image ||
//             resolveImage(
//               formData.profile_image
//             ),
//         };

//         setUser(
//           updated
//         );

//         saveStudent(
//           updated,
//           studentToken,
//           updated?.institute_id
//         );

//         setIsEditing(
//           false
//         );

//         showToast(
//           "Profile updated successfully!",
//           "success"
//         );
//       } catch (error) {
//         console.error(
//           "PROFILE UPDATE ERROR:",
//           error
//         );

//         showToast(
//           error?.message ||
//             "Failed to update profile.",
//           "error"
//         );
//       } finally {
//         setSaving(false);
//       }
//     };

//   const image =
//     resolveImage(
//       formData.profile_image
//     ) ||
//     user?.photoURL ||
//     `https://ui-avatars.com/api/?name=${encodeURIComponent(
//       formData.name ||
//         "Student"
//     )}&background=7c3aed&color=fff&bold=true&size=200`;

//   const inputClass =
//     "w-full rounded-lg border border-white/[0.08] bg-white/[0.05] px-3 py-2.5 text-sm text-white outline-none transition-all placeholder:text-white/25 focus:border-violet-500/30 focus:ring-2 focus:ring-violet-500/50";

//   return (
//     <div className="group relative h-full">

//       <div
//         className="absolute -inset-0.5 rounded-3xl blur-sm opacity-0 transition-opacity duration-700 group-hover:opacity-100"
//         style={{
//           background:
//             `linear-gradient(135deg, ${primaryColor}30, ${accentColor}20)`,
//         }}
//       />

//       <div
//         className="relative flex h-full flex-col items-center rounded-3xl border p-6 text-center"
//         style={{
//           background:
//             "linear-gradient(135deg, rgba(255,255,255,.06), rgba(255,255,255,.02))",

//           borderColor:
//             "rgba(255,255,255,.08)",
//         }}
//       >

//         {toast && (
//           <div
//             className={`absolute left-4 right-4 top-4 z-20 flex items-center gap-2 rounded-xl border px-4 py-2.5 backdrop-blur-xl ${
//               toast.type ===
//               "success"
//                 ? "border-emerald-500/30 bg-emerald-500/20 text-emerald-400"
//                 : "border-red-500/30 bg-red-500/20 text-red-400"
//             }`}
//           >
//             {toast.type ===
//             "success" ? (
//               <FaCheck className="text-sm" />
//             ) : (
//               <FaExclamationTriangle className="text-sm" />
//             )}

//             <span className="text-sm font-medium">
//               {toast.message}
//             </span>
//           </div>
//         )}

//         <div
//           className="absolute right-0 top-0 h-32 w-32 rounded-full blur-[40px]"
//           style={{
//             backgroundColor:
//               `${primaryColor}10`,
//           }}
//         />

//         <div className="relative flex w-full flex-col items-center">

//           <div className="relative mb-5">

//             <div
//               className="absolute -inset-1.5 rounded-full opacity-60 blur-sm"
//               style={{
//                 background:
//                   `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
//               }}
//             />

//             <div
//               className="relative h-28 w-28 overflow-hidden rounded-full border-[3px] bg-[#1a1a2e]"
//               style={{
//                 borderColor:
//                   secondaryColor ||
//                   "#0a0a12",
//               }}
//             >

//               <img
//                 src={image}
//                 alt={
//                   formData.name ||
//                   "Student"
//                 }
//                 className="h-full w-full object-cover"
//                 onError={
//                   event => {
//                     event.currentTarget.src =
//                       `https://ui-avatars.com/api/?name=${encodeURIComponent(
//                         formData.name ||
//                           "Student"
//                       )}&background=7c3aed&color=fff&bold=true&size=200`;
//                   }
//                 }
//               />

//               {isEditing && (
//                 <label className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity hover:opacity-100">

//                   <div className="mb-1 flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
//                     <FaPencilAlt className="text-sm text-white" />
//                   </div>

//                   <span className="text-xs font-semibold text-white">
//                     Change Photo
//                   </span>

//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={
//                       handleImageChange
//                     }
//                     className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
//                   />

//                 </label>
//               )}

//             </div>

//             <div
//               className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-[3px]"
//               style={{
//                 backgroundColor:
//                   "#10B981",

//                 borderColor:
//                   secondaryColor ||
//                   "#0a0a12",
//               }}
//             >
//               <FaCheck className="text-[9px] text-white" />
//             </div>

//           </div>

//           <div className="mb-3 w-full text-left">

//             {isEditing ? (
//               <input
//                 type="text"
//                 value={
//                   formData.name
//                 }
//                 onChange={
//                   event =>
//                     setFormData(
//                       previous => ({
//                         ...previous,

//                         name:
//                           event
//                             .target
//                             .value,
//                       })
//                     )
//                 }
//                 placeholder="Enter full name"
//                 className={
//                   inputClass
//                 }
//               />
//             ) : (
//               <h2 className="text-xl font-bold tracking-tight text-white">
//                 {formData.name ||
//                   "Student"}
//               </h2>
//             )}

//           </div>

//           <div className="mb-3 w-full text-left">

//             {isEditing ? (
//               <input
//                 type="email"
//                 value={
//                   formData.email
//                 }
//                 onChange={
//                   event =>
//                     setFormData(
//                       previous => ({
//                         ...previous,

//                         email:
//                           event
//                             .target
//                             .value,
//                       })
//                     )
//                 }
//                 placeholder="Enter email address"
//                 className={
//                   inputClass
//                 }
//               />
//             ) : (
//               <p className="w-full truncate rounded-xl border border-white/[0.05] bg-white/[0.03] px-3 py-2.5 text-xs text-gray-300">
//                 {formData.email ||
//                   "email@example.com"}
//               </p>
//             )}

//           </div>

//           <div className="mb-6 w-full text-left">

//             {isEditing ? (
//               <input
//                 type="tel"
//                 value={
//                   formData.phone
//                 }
//                 onChange={
//                   event =>
//                     setFormData(
//                       previous => ({
//                         ...previous,

//                         phone:
//                           event
//                             .target
//                             .value,
//                       })
//                     )
//                 }
//                 placeholder="Enter phone number"
//                 className={
//                   inputClass
//                 }
//               />
//             ) : (
//               <p className="w-full truncate rounded-xl border border-white/[0.05] bg-white/[0.03] px-3 py-2.5 text-xs text-gray-300">
//                 {formData.phone ||
//                   "+91 0000000000"}
//               </p>
//             )}

//           </div>

//           {!isEditing ? (
//             <button
//               type="button"
//               onClick={() => {
//                 setFormData(
//                   createForm(
//                     user
//                   )
//                 );

//                 setIsEditing(
//                   true
//                 );
//               }}
//               className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.05] py-2.5 text-sm font-medium text-white transition hover:bg-white/[0.1]"
//             >
//               <FaPencilAlt className="text-xs" />
//               Edit Profile
//             </button>
//           ) : (
//             <div className="flex w-full items-center gap-2">

//               <button
//                 type="button"
//                 onClick={() => {
//                   setFormData(
//                     createForm(
//                       user
//                     )
//                   );

//                   setIsEditing(
//                     false
//                   );
//                 }}
//                 className="flex-1 rounded-xl border border-white/[0.08] bg-white/[0.05] py-2.5 text-sm font-medium text-white transition hover:bg-white/[0.1]"
//               >
//                 Cancel
//               </button>

//               <button
//                 type="button"
//                 onClick={
//                   handleSave
//                 }
//                 disabled={
//                   saving
//                 }
//                 className="flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
//                 style={{
//                   background:
//                     `linear-gradient(90deg, ${primaryColor}, ${accentColor})`,
//                 }}
//               >
//                 {saving ? (
//                   <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
//                 ) : (
//                   <>
//                     <FaCheck className="text-xs" />
//                     Save
//                   </>
//                 )}
//               </button>

//             </div>
//           )}

//         </div>
//       </div>
//     </div>
//   );
// };

// /* =========================================================
//    BOOKING CARD
// ========================================================= */

// const BookingCard = ({
//   booking,
//   primaryColor,
//   accentColor,
//   onViewDetails,
// }) => {
//   const InfoRow = ({
//     icon,
//     label,
//     value,
//     valueClass =
//       "text-white",
//   }) => (
//     <div className="grid grid-cols-[120px_1fr] items-center border-b border-white/5 py-3 last:border-0 sm:grid-cols-[140px_1fr]">

//       <div className="flex items-center gap-3 text-gray-400">

//         {icon}

//         <span className="text-sm font-medium">
//           {label}
//         </span>

//       </div>

//       <div
//         className={`truncate text-right text-sm font-semibold ${valueClass}`}
//       >
//         {value || "--"}
//       </div>

//     </div>
//   );

//   const classTitle =
//     booking?.class?.title ||
//     booking?.class?.name ||
//     booking?.class_name ||
//     booking?.title ||
//     "Class";

//   const trainerName =
//     booking?.trainer?.name ||
//     booking?.trainer?.full_name ||
//     booking?.trainer_name ||
//     "--";

//   const instituteName =
//     booking?.institute?.name ||
//     booking?.institute_name ||
//     "--";

//   const days =
//     booking?.session_template?.days ||
//     booking?.days ||
//     booking?.available_days;

//   const startTime =
//     booking?.session_template?.start_time ||
//     booking?.start_time;

//   const paymentAmount =
//     booking?.payment?.amount ||
//     booking?.amount ||
//     0;

//   return (
//     <div
//       className="group relative rounded-2xl border bg-[#14141D] p-6 transition-all duration-300 hover:shadow-2xl"
//       style={{
//         borderColor:
//           "rgba(255,255,255,.10)",
//       }}
//     >

//       <div
//         className="absolute left-0 top-0 h-1 w-full rounded-t-2xl"
//         style={{
//           background:
//             `linear-gradient(90deg, ${primaryColor}, ${accentColor})`,
//         }}
//       />

//       <h2 className="mb-6 truncate text-xl font-bold text-white">
//         {classTitle}
//       </h2>

//       <div className="space-y-1">

//         <InfoRow
//           icon={
//             <FaUserTie
//               style={{
//                 color:
//                   primaryColor,
//               }}
//             />
//           }
//           label="Trainer"
//           value={
//             trainerName
//           }
//         />

//         <InfoRow
//           icon={
//             <FaCalendarWeek
//               style={{
//                 color:
//                   primaryColor,
//               }}
//             />
//           }
//           label="Days"
//           value={
//             Array.isArray(
//               days
//             )
//               ? days.join(
//                   ", "
//                 )
//               : days
//           }
//         />

//         <InfoRow
//           icon={
//             <FaClock
//               style={{
//                 color:
//                   primaryColor,
//               }}
//             />
//           }
//           label="Time"
//           value={
//             startTime
//           }
//         />

//         <InfoRow
//           icon={
//             <FaUniversity
//               style={{
//                 color:
//                   primaryColor,
//               }}
//             />
//           }
//           label="Institute"
//           value={
//             instituteName
//           }
//         />

//         <InfoRow
//           icon={
//             <FaMoneyBillWave className="text-green-400" />
//           }
//           label="Payment"
//           value={
//             `₹${paymentAmount}`
//           }
//           valueClass="text-green-400"
//         />

//       </div>

//       <button
//         type="button"
//         onClick={
//           onViewDetails
//         }
//         className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl py-3 font-semibold text-white transition hover:scale-[1.02] hover:opacity-90"
//         style={{
//           background:
//             `linear-gradient(90deg, ${primaryColor}, ${accentColor})`,
//         }}
//       >
//         View Details
//         <FaArrowRight />
//       </button>

//     </div>
//   );
// };

// /* =========================================================
//    EMPTY STATE
// ========================================================= */

// const EmptyState = ({
//   icon,
//   title,
//   subtitle,
//   primaryColor,
//   onBrowse,
// }) => (
//   <div className="rounded-2xl border border-dashed border-white/[0.08] bg-white/[0.015] py-16 text-center">

//     <div
//       className="mb-5 flex justify-center"
//       style={{
//         color:
//           `${primaryColor}40`,
//       }}
//     >
//       {icon}
//     </div>

//     <p className="text-lg font-semibold text-white">
//       {title}
//     </p>

//     <p className="mx-auto mt-2 max-w-xs text-sm text-gray-400">
//       {subtitle}
//     </p>

//     {onBrowse && (
//       <button
//         type="button"
//         onClick={
//           onBrowse
//         }
//         className="mt-6 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
//         style={{
//           backgroundColor:
//             primaryColor,
//         }}
//       >
//         Browse Classes
//       </button>
//     )}

//   </div>
// );

// export default WebsitePreviewDashboard;


import { useEffect, useMemo, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

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
  FaBell,
  FaSearch,
  FaArrowRight,
  FaBars,
  FaTimes,
  FaChevronRight,
  FaClock,
  FaCheckCircle,
  FaSignOutAlt,
  FaGraduationCap,
} from "react-icons/fa";

import { auth } from "../../config/firebase";

// const API =
//   import.meta.env.VITE_API_URL ||
//   "http://localhost:5000/api";

const API =
  import.meta.env.VITE_API_URL ||
  "https://finearts-backend.onrender.com/api";

/* =========================================================
   HELPERS
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
    console.error("STUDENT STORAGE ERROR:", error);

    localStorage.removeItem("studentUser");

    return null;
  }
};

const getStudentToken = () => {
  return localStorage.getItem("studentToken") || null;
};

const getStoredInstituteId = () => {
  const keys = [
    "instituteId",
    "institute_id",
    "websiteInstituteId",
    "website_institute_id",
    "selectedInstituteId",
    "selected_institute_id",
  ];

  for (const key of keys) {
    const value = localStorage.getItem(key);

    if (!value) {
      continue;
    }

    const id = Number(value);

    if (Number.isInteger(id) && id > 0) {
      return id;
    }
  }

  return null;
};

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
    const id = Number(value);

    if (Number.isInteger(id) && id > 0) {
      return id;
    }
  }

  try {
    const params = new URLSearchParams(
      window.location.search
    );

    const queryInstituteId =
      params.get("institute_id");

    const id = Number(queryInstituteId);

    if (Number.isInteger(id) && id > 0) {
      return id;
    }
  } catch (_) {}

  return null;
};

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
      "STUDENT"
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
      "SAVE STUDENT ERROR:",
      error
    );
  }
};

const normalizeStudent = (
  result,
  firebaseUser,
  existingStudent
) => {
  const data =
    result?.data ||
    result?.student ||
    result ||
    {};

  const student =
    data?.student || {};

  const account =
    data?.account || {};

  const user =
    data?.user || {};

  return {
    ...(existingStudent || {}),
    ...data,
    ...student,

    uid:
      data?.uid ||
      data?.firebase_uid ||
      existingStudent?.uid ||
      firebaseUser?.uid ||
      null,

    firebase_uid:
      data?.firebase_uid ||
      existingStudent?.firebase_uid ||
      firebaseUser?.uid ||
      null,

    student_id:
      data?.student_id ||
      student?.student_id ||
      student?.id ||
      existingStudent?.student_id ||
      null,

    institute_id:
      data?.institute_id ||
      student?.institute_id ||
      existingStudent?.institute_id ||
      null,

    name:
      data?.name ||
      data?.full_name ||
      student?.name ||
      user?.full_name ||
      existingStudent?.name ||
      existingStudent?.full_name ||
      firebaseUser?.displayName ||
      "Student",

    full_name:
      data?.full_name ||
      data?.name ||
      student?.name ||
      user?.full_name ||
      existingStudent?.full_name ||
      existingStudent?.name ||
      firebaseUser?.displayName ||
      "Student",

    email:
      data?.email ||
      account?.email ||
      user?.email ||
      existingStudent?.email ||
      firebaseUser?.email ||
      "",

    phone:
      data?.phone ||
      data?.phone_number ||
      account?.phone_number ||
      user?.phone_number ||
      existingStudent?.phone ||
      existingStudent?.phone_number ||
      firebaseUser?.phoneNumber ||
      "",

    profile_image:
      data?.profile_image ||
      data?.student_photo ||
      student?.profile_image ||
      user?.profile_image ||
      existingStudent?.profile_image ||
      firebaseUser?.photoURL ||
      "",

    photoURL:
      data?.photoURL ||
      existingStudent?.photoURL ||
      firebaseUser?.photoURL ||
      data?.profile_image ||
      "",
  };
};

const extractArray = (result, keys = []) => {
  if (Array.isArray(result)) {
    return result;
  }

  for (const key of keys) {
    if (Array.isArray(result?.[key])) {
      return result[key];
    }

    if (
      Array.isArray(
        result?.data?.[key]
      )
    ) {
      return result.data[key];
    }
  }

  if (Array.isArray(result?.data)) {
    return result.data;
  }

  return [];
};

const getImage = (
  value,
  fallbackName = "Course"
) => {
  if (value) {
    return value;
  }

  return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    fallbackName
  )}&background=07152A&color=ffffff&bold=true&size=600`;
};

const formatDate = value => {
  if (!value) {
    return "Date unavailable";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return date.toLocaleDateString(
    "en-IN",
    {
      weekday: "short",
      day: "2-digit",
      month: "short",
    }
  );
};

const formatTime = value => {
  if (!value) {
    return "Time unavailable";
  }

  const date = new Date(value);

  if (!Number.isNaN(date.getTime())) {
    return date.toLocaleTimeString(
      "en-IN",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  }

  return String(value);
};

/* =========================================================
   DASHBOARD
========================================================= */

const WebsitePreviewDashboard = () => {
  const navigate = useNavigate();

  const context =
    useOutletContext() || {};

  const branding =
    context.branding || {};

  const primaryColor =
    branding.primaryColor ||
    branding.primary_color ||
    "#087CFF";

  const accentColor =
    branding.accentColor ||
    branding.accent_color ||
    "#6D2BFF";

  const pageBackground =
    branding.pageBackgroundColor ||
    branding.page_background_color ||
    "#020914";

  const [student, setStudent] =
    useState(() =>
      context.studentUser ||
      getStoredStudent()
    );

  const [firebaseUser, setFirebaseUser] =
    useState(auth.currentUser);

  const [token, setToken] =
    useState(getStudentToken());

  const [courses, setCourses] =
    useState([]);

  const [sessions, setSessions] =
    useState([]);

  const [bookings, setBookings] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [dataLoading, setDataLoading] =
    useState(false);

  const [mobileMenu, setMobileMenu] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [error, setError] =
    useState("");

  const instituteId =
    resolveInstituteId(
      context,
      student
    );

  /* =======================================================
     FIREBASE / STUDENT SESSION
  ======================================================= */

  useEffect(() => {
    let mounted = true;

    const unsubscribe =
      onAuthStateChanged(
        auth,
        async user => {
          if (!mounted) {
            return;
          }

          setFirebaseUser(user);

          const storedStudent =
            getStoredStudent();

          if (storedStudent) {
            setStudent(
              previous => ({
                ...(previous || {}),
                ...storedStudent,
              })
            );
          }

          if (user) {
            try {
              const freshToken =
                await user.getIdToken();

              if (mounted) {
                setToken(freshToken);

                localStorage.setItem(
                  "studentToken",
                  freshToken
                );
              }
            } catch (authError) {
              console.error(
                "TOKEN ERROR:",
                authError
              );
            }
          }

          if (mounted) {
            setLoading(false);
          }
        }
      );

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  /* =======================================================
     CONTEXT STUDENT
  ======================================================= */

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

  /* =======================================================
     FETCH STUDENT PROFILE
  ======================================================= */

  const fetchStudentProfile =
    async firebaseUser => {
      if (!firebaseUser?.uid) {
        return;
      }

      const currentInstituteId =
        resolveInstituteId(
          context,
          student
        );

      if (!currentInstituteId) {
        return;
      }

      try {
        const freshToken =
          await firebaseUser.getIdToken();

        localStorage.setItem(
          "studentToken",
          freshToken
        );

        const response =
          await fetch(
            `${API}/students/me?institute_id=${encodeURIComponent(
              currentInstituteId
            )}`,
            {
              method: "GET",
              headers: {
                Accept:
                  "application/json",
                Authorization:
                  `Bearer ${freshToken}`,
              },
            }
          );

        const result =
          await response
            .json()
            .catch(() => ({}));

        if (!response.ok) {
          throw new Error(
            result?.message ||
              result?.error ||
              "Unable to load student profile."
          );
        }

        const normalized =
          normalizeStudent(
            result,
            firebaseUser,
            getStoredStudent()
          );

        normalized.institute_id =
          normalized.institute_id ||
          currentInstituteId;

        saveStudent(
          normalized,
          freshToken,
          currentInstituteId
        );

        setStudent(normalized);
        setToken(freshToken);
      } catch (profileError) {
        console.warn(
          "STUDENT PROFILE REFRESH:",
          profileError
        );
      }
    };

  /* =======================================================
     FETCH DASHBOARD DATA
  ======================================================= */

  useEffect(() => {
    if (!token) {
      return;
    }

    let mounted = true;

    const loadDashboard =
      async () => {
        setDataLoading(true);
        setError("");

        try {
          const headers = {
            Accept:
              "application/json",
            Authorization:
              `Bearer ${token}`,
          };

          const [
            coursesResponse,
            sessionsResponse,
            bookingsResponse,
          ] = await Promise.allSettled([
            fetch(
              `${API}/lms/courses`,
              {
                headers,
              }
            ),

            fetch(
              `${API}/sessions/user/upcoming`,
              {
                headers,
              }
            ),

            fetch(
              `${API}/bookings/my`,
              {
                headers,
              }
            ),
          ]);

          if (!mounted) {
            return;
          }

          /* -------------------------------------------------
             COURSES
          ------------------------------------------------- */

          if (
            coursesResponse.status ===
              "fulfilled" &&
            coursesResponse.value.ok
          ) {
            const result =
              await coursesResponse.value
                .json()
                .catch(() => ({}));

            setCourses(
              extractArray(result, [
                "courses",
                "items",
                "results",
              ])
            );
          } else {
            setCourses([]);
          }

          /* -------------------------------------------------
             SESSIONS
          ------------------------------------------------- */

          if (
            sessionsResponse.status ===
              "fulfilled" &&
            sessionsResponse.value.ok
          ) {
            const result =
              await sessionsResponse.value
                .json()
                .catch(() => ({}));

            setSessions(
              extractArray(result, [
                "sessions",
                "upcoming",
                "items",
              ])
            );
          } else {
            setSessions([]);
          }

          /* -------------------------------------------------
             BOOKINGS
          ------------------------------------------------- */

          if (
            bookingsResponse.status ===
              "fulfilled" &&
            bookingsResponse.value.ok
          ) {
            const result =
              await bookingsResponse.value
                .json()
                .catch(() => ({}));

            setBookings(
              extractArray(result, [
                "bookings",
                "items",
                "results",
              ])
            );
          } else {
            setBookings([]);
          }
        } catch (dashboardError) {
          console.error(
            "DASHBOARD DATA ERROR:",
            dashboardError
          );

          if (mounted) {
            setError(
              dashboardError?.message ||
                "Unable to load dashboard data."
            );
          }
        } finally {
          if (mounted) {
            setDataLoading(false);
          }
        }
      };

    loadDashboard();

    return () => {
      mounted = false;
    };
  }, [token]);

  /* =======================================================
     REFRESH PROFILE
  ======================================================= */

  useEffect(() => {
    if (firebaseUser) {
      fetchStudentProfile(
        firebaseUser
      );
    }
  }, [firebaseUser]);

  /* =======================================================
     DERIVED DATA
  ======================================================= */

  const displayName =
    student?.name ||
    student?.full_name ||
    student?.displayName ||
    firebaseUser?.displayName ||
    "Student";

  const firstName =
    displayName
      .trim()
      .split(" ")[0] ||
    "Student";

  const profileImage =
    student?.profile_image ||
    student?.photoURL ||
    firebaseUser?.photoURL ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      displayName
    )}&background=087CFF&color=fff&bold=true&size=200`;

  const totalPayments = useMemo(() => {
    return bookings
      .filter(booking => {
        const status =
          booking?.payment?.status ||
          booking?.payment_status ||
          booking?.status;

        return (
          String(status || "")
            .toUpperCase() === "PAID"
        );
      })
      .reduce((sum, booking) => {
        const amount =
          booking?.payment?.amount ??
          booking?.amount ??
          booking?.price ??
          booking?.total_amount ??
          0;

        return (
          sum + Number(amount || 0)
        );
      }, 0);
  }, [bookings]);

  const filteredCourses =
    useMemo(() => {
      const value =
        search.trim().toLowerCase();

      if (!value) {
        return courses.slice(0, 4);
      }

      return courses
        .filter(course => {
          return (
            String(
              course?.title || ""
            )
              .toLowerCase()
              .includes(value) ||
            String(
              course?.trainer_name || ""
            )
              .toLowerCase()
              .includes(value) ||
            String(
              course?.level || ""
            )
              .toLowerCase()
              .includes(value)
          );
        })
        .slice(0, 4);
    }, [courses, search]);

  const upcomingSessions =
    useMemo(() => {
      return [...sessions]
        .sort((a, b) => {
          const aDate = new Date(
            a?.start_time ||
              a?.start_at ||
              a?.session_date ||
              a?.date ||
              0
          ).getTime();

          const bDate = new Date(
            b?.start_time ||
              b?.start_at ||
              b?.session_date ||
              b?.date ||
              0
          ).getTime();

          return aDate - bDate;
        })
        .slice(0, 3);
    }, [sessions]);

  /* =======================================================
     NAVIGATION
  ======================================================= */

  const go = path => {
    setMobileMenu(false);
    navigate(path);
  };

  const menuItems = [
    {
      label: "Dashboard",
      icon: <FaHome />,
      path:
        "/institute/website/preview/dashboard",
    },

    {
      label: "My Learning",
      icon: <FaBookOpen />,
      path:
        "/institute/website/preview/my-learning",
    },

    {
      label: "Live Sessions",
      icon: <FaVideo />,
      path:
        "/institute/website/preview/sessions",
    },

    {
      label: "Recordings",
      icon: <FaPlayCircle />,
      path:
        "/institute/website/preview/recordings",
    },

    {
      label: "My Bookings",
      icon: <FaCalendarAlt />,
      path:
        "/institute/website/preview/my-bookings",
    },

    {
      label: "Assignments",
      icon: <FaFileAlt />,
      path:
        "/institute/website/preview/assignments",
    },

    {
      label: "Attendance",
      icon: <FaClipboardCheck />,
      path:
        "/institute/website/preview/attendance",
    },

    {
      label: "Payment Details",
      icon: <FaCreditCard />,
      path:
        "/institute/website/preview/payments",
    },

    {
      label: "Profile",
      icon: <FaUser />,
      path:
        "/institute/website/preview/profile",
    },
  ];

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <div
        className="flex min-h-screen items-center justify-center text-white"
        style={{
          background: pageBackground,
        }}
      >
        <div className="text-center">
          <div
            className="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-4 border-white/10"
            style={{
              borderTopColor:
                primaryColor,
              borderRightColor:
                accentColor,
            }}
          />

          <p className="text-sm text-white/60">
            Loading student dashboard...
          </p>
        </div>
      </div>
    );
  }

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div
      className="min-h-screen overflow-x-hidden text-white"
      style={{
        background: pageBackground,
      }}
    >
      {/* ===================================================
          BACKGROUND GLOW
      =================================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full blur-[150px]"
          style={{
            background:
              `${primaryColor}12`,
          }}
        />

        <div
          className="absolute -bottom-40 right-0 h-[500px] w-[500px] rounded-full blur-[150px]"
          style={{
            background:
              `${accentColor}10`,
          }}
        />
      </div>

      {/* ===================================================
          MOBILE SIDEBAR OVERLAY
      =================================================== */}

      {mobileMenu && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={() =>
            setMobileMenu(false)
          }
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
          bg-[#020B18]/95
          backdrop-blur-2xl
          transition-transform duration-300
          ${
            mobileMenu
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* LOGO */}

        <div className="flex h-[82px] items-center border-b border-white/[0.06] px-7">
          <div className="flex items-center gap-3">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-xl text-xl shadow-lg"
              style={{
                background:
                  `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                boxShadow:
                  `0 0 30px ${primaryColor}35`,
              }}
            >
              <FaGraduationCap />
            </div>

            <div>
              <h1 className="text-xl font-black tracking-tight">
                Fine<span
                  style={{
                    color: primaryColor,
                  }}
                >
                  Arts
                </span>
              </h1>

              <p className="text-[11px] text-white/50">
                Student LMS
              </p>
            </div>
          </div>

          <button
            type="button"
            className="ml-auto text-white/60 lg:hidden"
            onClick={() =>
              setMobileMenu(false)
            }
          >
            <FaTimes />
          </button>
        </div>

        {/* NAVIGATION */}

        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <div className="space-y-1.5">
            {menuItems.map(item => {
              const active =
                item.label ===
                "Dashboard";

              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() =>
                    go(item.path)
                  }
                  className={`
                    group flex w-full items-center
                    gap-4 rounded-xl px-4 py-3.5
                    text-left transition-all
                    ${
                      active
                        ? "text-white"
                        : "text-white/70 hover:bg-white/[0.05] hover:text-white"
                    }
                  `}
                  style={
                    active
                      ? {
                          background:
                            `linear-gradient(90deg, ${primaryColor}28, ${primaryColor}0A)`,
                          boxShadow:
                            `inset 3px 0 0 ${primaryColor}, 0 0 25px ${primaryColor}10`,
                        }
                      : {}
                  }
                >
                  <span
                    className="flex w-6 justify-center text-lg"
                    style={
                      active
                        ? {
                            color:
                              primaryColor,
                          }
                        : {}
                    }
                  >
                    {item.icon}
                  </span>

                  <span className="text-sm font-medium">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* BOTTOM BRANDING */}

        <div className="border-t border-white/[0.06] p-5">
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4">
            <p
              className="font-serif text-sm italic leading-6"
              style={{
                color:
                  `${primaryColor}CC`,
              }}
            >
              "Art Builds
              <br />
              A Better
              <br />
              You"
            </p>

            <div
              className="mt-3 h-1 w-8 rounded-full"
              style={{
                background:
                  `linear-gradient(90deg, ${primaryColor}, ${accentColor})`,
              }}
            />
          </div>
        </div>
      </aside>

      {/* ===================================================
          MAIN
      =================================================== */}

      <div className="relative lg:pl-[270px]">
        {/* =================================================
            TOP BAR
        ================================================= */}

        <header className="sticky top-0 z-30 h-[82px] border-b border-white/[0.07] bg-[#020914]/85 backdrop-blur-2xl">
          <div className="flex h-full items-center gap-4 px-4 sm:px-6 lg:px-8">
            {/* MOBILE BUTTON */}

            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-white lg:hidden"
              onClick={() =>
                setMobileMenu(true)
              }
            >
              <FaBars />
            </button>

            {/* SEARCH */}

            <div className="relative max-w-[560px] flex-1">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />

              <input
                value={search}
                onChange={event =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Search courses, classes, recordings or topics..."
                className="h-12 w-full rounded-xl border border-white/[0.09] bg-white/[0.035] pl-11 pr-4 text-sm text-white outline-none placeholder:text-white/35 focus:border-white/20"
              />
            </div>

            {/* RIGHT */}

            <div className="ml-auto flex items-center gap-3">
              {/* NOTIFICATION */}

              <button
                type="button"
                className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.025] text-lg text-white/80 transition hover:bg-white/[0.06]"
              >
                <FaBell />

                {upcomingSessions.length >
                  0 && (
                  <span
                    className="absolute right-2 top-2 h-2 w-2 rounded-full"
                    style={{
                      background:
                        primaryColor,
                    }}
                  />
                )}
              </button>

              {/* PROFILE */}

              <button
                type="button"
                onClick={() =>
                  go(
                    "/institute/website/preview/profile"
                  )
                }
                className="flex items-center gap-3 border-l border-white/[0.08] pl-4"
              >
                <img
                  src={profileImage}
                  alt={displayName}
                  className="h-10 w-10 rounded-full border border-white/10 object-cover"
                />

                <div className="hidden text-left sm:block">
                  <p className="max-w-[130px] truncate text-sm font-semibold">
                    {displayName}
                  </p>

                  <p className="text-xs text-white/45">
                    Student
                  </p>
                </div>

                <FaChevronRight className="hidden rotate-90 text-xs text-white/50 sm:block" />
              </button>
            </div>
          </div>
        </header>

        {/* =================================================
            CONTENT
        ================================================= */}

        <main className="mx-auto w-full max-w-[1500px] px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
          {/* =================================================
              ERROR
          ================================================= */}

          {error && (
            <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          {/* =================================================
              TOP GRID
          ================================================= */}

          <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_390px]">
            {/* HERO */}

            <section
              className="relative min-h-[270px] overflow-hidden rounded-2xl border border-white/[0.09]"
              style={{
                background:
                  `radial-gradient(circle at 75% 50%, ${primaryColor}30, transparent 30%), linear-gradient(135deg, #031024 0%, #020914 65%, #050B18 100%)`,
              }}
            >
              {/* GLOW */}

              <div
                className="absolute right-[-100px] top-[-100px] h-[420px] w-[420px] rounded-full blur-[90px]"
                style={{
                  background:
                    `${primaryColor}25`,
                }}
              />

              <div
                className="absolute bottom-[-130px] right-[100px] h-[300px] w-[300px] rounded-full blur-[80px]"
                style={{
                  background:
                    `${accentColor}25`,
                }}
              />

              {/* ABSTRACT ART */}

              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div
                  className="absolute right-[15%] top-[15%] h-44 w-44 rounded-full border-[35px] border-white/[0.025]"
                  style={{
                    boxShadow:
                      `0 0 80px ${primaryColor}20`,
                  }}
                />

                <div
                  className="absolute -right-10 bottom-[-80px] h-64 w-[500px] rotate-[-18deg] rounded-[50%] border-[3px] opacity-60"
                  style={{
                    borderColor:
                      `${primaryColor}50`,
                  }}
                />

                <div
                  className="absolute right-20 bottom-[-40px] h-40 w-[400px] rotate-[-12deg] rounded-[50%] border-[2px] opacity-40"
                  style={{
                    borderColor:
                      `${accentColor}60`,
                  }}
                />
              </div>

              <div className="relative z-10 flex h-full min-h-[270px] flex-col justify-center px-6 py-8 sm:px-8 lg:px-10">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/75">
                  Welcome back,
                </p>

                <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                  {firstName}
                  <span className="ml-2">
                    👋
                  </span>
                </h1>

                <p className="mt-3 max-w-[560px] text-sm leading-6 text-white/65 sm:text-base">
                  Keep learning, keep creating.
                  Every session brings you
                  closer to your goals.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      go(
                        "/institute/website/preview/my-learning"
                      )
                    }
                    className="flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:scale-[1.02]"
                    style={{
                      background:
                        `linear-gradient(90deg, ${primaryColor}, ${accentColor})`,
                      boxShadow:
                        `0 10px 30px ${primaryColor}25`,
                    }}
                  >
                    Continue Learning
                    <FaArrowRight />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      go(
                        "/institute/website/preview/classes"
                      )
                    }
                    className="rounded-xl border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.08]"
                  >
                    Explore Courses
                  </button>
                </div>
              </div>
            </section>

            {/* UPCOMING SESSIONS */}

            <section className="rounded-2xl border border-white/[0.08] bg-[#041020]/80 p-4 shadow-2xl">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-bold">
                  Upcoming Live Sessions
                </h2>

                <button
                  type="button"
                  onClick={() =>
                    go(
                      "/institute/website/preview/sessions"
                    )
                  }
                  className="text-xs font-semibold"
                  style={{
                    color: primaryColor,
                  }}
                >
                  View All
                </button>
              </div>

              {dataLoading ? (
                <SessionSkeleton />
              ) : upcomingSessions.length ===
                0 ? (
                <div className="flex min-h-[170px] flex-col items-center justify-center rounded-xl border border-dashed border-white/[0.08] text-center">
                  <FaVideo className="mb-3 text-2xl text-white/25" />

                  <p className="text-sm font-semibold text-white/70">
                    No upcoming sessions
                  </p>

                  <p className="mt-1 text-xs text-white/35">
                    Your upcoming live classes will
                    appear here.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {upcomingSessions.map(
                    (session, index) => (
                      <LiveSessionCard
                        key={
                          session?.id ||
                          session?.session_id ||
                          index
                        }
                        session={session}
                        primaryColor={
                          primaryColor
                        }
                        onJoin={() =>
                          handleJoinSession(
                            session
                          )
                        }
                      />
                    )
                  )}
                </div>
              )}
            </section>
          </div>

          {/* =================================================
              QUICK ACTIONS
          ================================================= */}

          <section className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <QuickAction
              icon={<FaBookOpen />}
              title="My Learning"
              subtitle="Continue Courses"
              primaryColor={primaryColor}
              accentColor={accentColor}
              onClick={() =>
                go(
                  "/institute/website/preview/my-learning"
                )
              }
            />

            <QuickAction
              icon={<FaVideo />}
              title="Live Sessions"
              subtitle="Join Upcoming"
              primaryColor={accentColor}
              accentColor={primaryColor}
              onClick={() =>
                go(
                  "/institute/website/preview/sessions"
                )
              }
            />

            <QuickAction
              icon={<FaPlayCircle />}
              title="Recordings"
              subtitle="Watch Anytime"
              primaryColor={primaryColor}
              accentColor={accentColor}
              onClick={() =>
                go(
                  "/institute/website/preview/recordings"
                )
              }
            />

            <QuickAction
              icon={<FaCalendarAlt />}
              title="My Bookings"
              subtitle={
                bookings.length
                  ? `${bookings.length} Booked Classes`
                  : "View Booked Classes"
              }
              primaryColor={accentColor}
              accentColor={primaryColor}
              onClick={() =>
                go(
                  "/institute/website/preview/my-bookings"
                )
              }
            />

            <QuickAction
              icon={<FaFileAlt />}
              title="Assignments"
              subtitle="View & Submit"
              primaryColor={primaryColor}
              accentColor={accentColor}
              onClick={() =>
                go(
                  "/institute/website/preview/assignments"
                )
              }
            />

            <QuickAction
              icon={<FaClipboardCheck />}
              title="Attendance"
              subtitle="Track Your Classes"
              primaryColor={accentColor}
              accentColor={primaryColor}
              onClick={() =>
                go(
                  "/institute/website/preview/attendance"
                )
              }
            />

            <QuickAction
              icon={<FaCreditCard />}
              title="Payment Details"
              subtitle={
                totalPayments > 0
                  ? `₹${totalPayments.toLocaleString(
                      "en-IN"
                    )} Paid`
                  : "View Transactions"
              }
              primaryColor={primaryColor}
              accentColor={accentColor}
              onClick={() =>
                go(
                  "/institute/website/preview/payments"
                )
              }
            />

            <QuickAction
              icon={<FaUser />}
              title="Profile"
              subtitle="Manage Your Account"
              primaryColor={accentColor}
              accentColor={primaryColor}
              onClick={() =>
                go(
                  "/institute/website/preview/profile"
                )
              }
            />
          </section>

          {/* =================================================
              MY LEARNING
          ================================================= */}

          <section className="mt-8">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black">
                  My Learning
                </h2>

                <p className="mt-1 text-xs text-white/40">
                  Continue where you left off
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  go(
                    "/institute/website/preview/my-learning"
                  )
                }
                className="flex items-center gap-2 text-sm font-semibold"
                style={{
                  color: primaryColor,
                }}
              >
                View All Courses
                <FaArrowRight className="text-xs" />
              </button>
            </div>

            {dataLoading ? (
              <CourseSkeleton />
            ) : filteredCourses.length ===
              0 ? (
              <EmptyCourses
                onBrowse={() =>
                  go(
                    "/institute/website/preview/classes"
                  )
                }
              />
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                {filteredCourses.map(
                  (course, index) => (
                    <CourseCard
                      key={
                        course?.id ||
                        course?.class_id ||
                        index
                      }
                      course={course}
                      primaryColor={
                        primaryColor
                      }
                      accentColor={
                        accentColor
                      }
                      onContinue={() =>
                        go(
                          `/institute/website/preview/my-learning/${course.id}`
                        )
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
};

/* =========================================================
   SESSION JOIN
========================================================= */

const handleJoinSession = session => {
  const meetingUrl =
    session?.meeting_url ||
    session?.meetingUrl ||
    session?.join_url ||
    session?.joinUrl ||
    session?.zoom_link ||
    session?.google_meet_link;

  if (meetingUrl) {
    window.open(
      meetingUrl,
      "_blank",
      "noopener,noreferrer"
    );

    return;
  }

  console.warn(
    "No meeting URL available for session:",
    session
  );
};

/* =========================================================
   QUICK ACTION
========================================================= */

const QuickAction = ({
  icon,
  title,
  subtitle,
  primaryColor,
  accentColor,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex min-h-[100px] items-center gap-4 rounded-2xl border border-white/[0.07] bg-[#041020]/75 px-5 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-white/[0.14] hover:bg-white/[0.05]"
    >
      <div
        className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl text-xl text-white transition-transform group-hover:scale-105"
        style={{
          background:
            `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
          boxShadow:
            `0 8px 30px ${primaryColor}25`,
        }}
      >
        {icon}
      </div>

      <div className="min-w-0">
        <h3 className="text-sm font-bold text-white">
          {title}
        </h3>

        <p className="mt-1 text-xs text-white/45">
          {subtitle}
        </p>
      </div>

      <FaChevronRight className="ml-auto text-xs text-white/25 transition-transform group-hover:translate-x-1" />
    </button>
  );
};

/* =========================================================
   LIVE SESSION CARD
========================================================= */

const LiveSessionCard = ({
  session,
  primaryColor,
  onJoin,
}) => {
  const title =
    session?.title ||
    session?.session_title ||
    session?.class_name ||
    session?.class_title ||
    "Live Session";

  const image =
    session?.image ||
    session?.class_image ||
    session?.thumbnail ||
    session?.cover_image;

  const dateValue =
    session?.start_time ||
    session?.start_at ||
    session?.session_date ||
    session?.date;

  const timeValue =
    session?.start_time ||
    session?.start_at ||
    session?.date;

  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.025] p-2.5">
      <div className="h-[62px] w-[76px] flex-shrink-0 overflow-hidden rounded-lg bg-white/5">
        <img
          src={getImage(
            image,
            title
          )}
          alt={title}
          className="h-full w-full object-cover"
          onError={event => {
            event.currentTarget.src =
              getImage(
                null,
                title
              );
          }}
        />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-bold">
          {title}
        </h3>

        <div className="mt-1 flex items-center gap-2 text-[11px] text-white/45">
          <FaCalendarAlt />

          <span>
            {formatDate(dateValue)}
          </span>

          <span>•</span>

          <FaClock />

          <span>
            {formatTime(timeValue)}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={onJoin}
        className="flex-shrink-0 rounded-lg px-3 py-2 text-xs font-bold text-white"
        style={{
          background:
            `linear-gradient(135deg, ${primaryColor}, #0057FF)`,
        }}
      >
        Join
      </button>
    </div>
  );
};

/* =========================================================
   COURSE CARD
========================================================= */

const CourseCard = ({
  course,
  primaryColor,
  accentColor,
  onContinue,
}) => {
  const title =
    course?.title ||
    course?.name ||
    "Course";

  const image =
    course?.image ||
    course?.class_image ||
    course?.thumbnail;

  const level =
    course?.level ||
    "Beginner";

  const totalLessons =
    Number(
      course?.totalLessons ??
        course?.total_lessons ??
        course?.lesson_count ??
        course?.lessons_count ??
        0
    );

  const progress =
    Math.max(
      0,
      Math.min(
        100,
        Number(
          course?.progressPercentage ??
            course?.progress_percentage ??
            0
        )
      )
    );

  const completedLessons =
    Number(
      course?.completedLessons ??
        course?.completed_lessons ??
        0
    );

  const isInProgress =
    progress > 0 &&
    progress < 100;

  const isCompleted =
    progress >= 100;

  return (
    <article className="group overflow-hidden rounded-2xl border border-white/[0.08] bg-[#041020]/85 transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.16]">
      {/* IMAGE */}

      <div className="relative h-[145px] overflow-hidden">
        <img
          src={getImage(
            image,
            title
          )}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={event => {
            event.currentTarget.src =
              getImage(
                null,
                title
              );
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#041020] via-transparent to-transparent" />

        <span
          className="absolute right-3 top-3 rounded-full px-3 py-1 text-[10px] font-bold text-white backdrop-blur-md"
          style={{
            background:
              isCompleted
                ? "#10B981CC"
                : isInProgress
                ? `${primaryColor}DD`
                : `${accentColor}DD`,
          }}
        >
          {isCompleted
            ? "Completed"
            : isInProgress
            ? "In Progress"
            : "Start Course"}
        </span>
      </div>

      {/* BODY */}

      <div className="p-4">
        <h3 className="line-clamp-2 min-h-[42px] text-base font-bold leading-5">
          {title}
        </h3>

        <div className="mt-3 flex items-center gap-4 text-xs text-white/50">
          <span className="flex items-center gap-1.5">
            <FaBookOpen />

            {totalLessons} Lessons
          </span>

          <span className="flex items-center gap-1.5">
            <FaGraduationCap />

            {level}
          </span>
        </div>

        {/* PROGRESS */}

        <div className="mt-4">
          <div className="mb-1.5 flex items-center justify-between text-[10px] text-white/40">
            <span>
              {completedLessons} /{" "}
              {totalLessons} completed
            </span>

            <span>
              {progress}%
            </span>
          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${progress}%`,
                background:
                  `linear-gradient(90deg, ${primaryColor}, ${accentColor})`,
              }}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={onContinue}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-white/[0.12] bg-white/[0.02] py-2.5 text-sm font-semibold transition hover:bg-white/[0.06]"
        >
          {isInProgress ||
          isCompleted
            ? "Continue"
            : "Start Course"}

          <FaArrowRight className="text-xs" />
        </button>
      </div>
    </article>
  );
};

/* =========================================================
   SESSION SKELETON
========================================================= */

const SessionSkeleton = () => {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map(item => (
        <div
          key={item}
          className="flex animate-pulse gap-3 rounded-xl border border-white/[0.06] bg-white/[0.025] p-2.5"
        >
          <div className="h-[62px] w-[76px] rounded-lg bg-white/[0.07]" />

          <div className="flex-1">
            <div className="mt-2 h-3 w-32 rounded bg-white/[0.07]" />

            <div className="mt-3 h-2 w-44 rounded bg-white/[0.05]" />
          </div>

          <div className="h-8 w-12 rounded-lg bg-white/[0.07]" />
        </div>
      ))}
    </div>
  );
};

/* =========================================================
   COURSE SKELETON
========================================================= */

const CourseSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {[1, 2, 3, 4].map(item => (
        <div
          key={item}
          className="animate-pulse overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025]"
        >
          <div className="h-[145px] bg-white/[0.05]" />

          <div className="space-y-3 p-4">
            <div className="h-4 w-4/5 rounded bg-white/[0.07]" />

            <div className="h-3 w-3/5 rounded bg-white/[0.05]" />

            <div className="h-2 w-full rounded bg-white/[0.05]" />

            <div className="h-9 w-full rounded-lg bg-white/[0.06]" />
          </div>
        </div>
      ))}
    </div>
  );
};

/* =========================================================
   EMPTY COURSES
========================================================= */

const EmptyCourses = ({
  onBrowse,
}) => {
  return (
    <div className="flex min-h-[250px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/[0.1] bg-white/[0.02] text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/[0.05] text-2xl text-white/40">
        <FaBookOpen />
      </div>

      <h3 className="text-lg font-bold">
        No enrolled courses yet
      </h3>

      <p className="mt-1 max-w-sm text-sm text-white/40">
        Once you book a class, your learning
        courses will appear here.
      </p>

      <button
        type="button"
        onClick={onBrowse}
        className="mt-5 flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold"
      >
        Browse Courses
        <FaArrowRight />
      </button>
    </div>
  );
};

export default WebsitePreviewDashboard;