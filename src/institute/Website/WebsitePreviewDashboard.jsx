

// import { useEffect, useMemo, useState } from "react";
// import { useNavigate, useOutletContext } from "react-router-dom";
// import { onAuthStateChanged } from "firebase/auth";

// import {
//   FaHome,
//   FaBookOpen,
//   FaVideo,
//   FaPlayCircle,
//   FaCalendarAlt,
//   FaFileAlt,
//   FaClipboardCheck,
//   FaCreditCard,
//   FaUser,
//   FaBell,
//   FaSearch,
//   FaArrowRight,
//   FaBars,
//   FaTimes,
//   FaChevronRight,
//   FaClock,
//   FaGraduationCap,
//   FaPlay,
// } from "react-icons/fa";

// import { auth } from "../../config/firebase";

// /* =========================================================
//    API
// ========================================================= */

// const API =
//   import.meta.env.VITE_API_URL ||
//   "https://finearts-backend.onrender.com/api";

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
//     console.error("STUDENT STORAGE ERROR:", error);
//     localStorage.removeItem("studentUser");
//     return null;
//   }
// };

// const getStudentToken = () => {
//   return localStorage.getItem("studentToken") || null;
// };

// const getStoredInstituteId = () => {
//   const keys = [
//     "instituteId",
//     "institute_id",
//     "websiteInstituteId",
//     "website_institute_id",
//     "selectedInstituteId",
//     "selected_institute_id",
//   ];

//   for (const key of keys) {
//     const value = localStorage.getItem(key);

//     if (!value) {
//       continue;
//     }

//     const id = Number(value);

//     if (Number.isInteger(id) && id > 0) {
//       return id;
//     }
//   }

//   return null;
// };

// const resolveInstituteId = (context, student = null) => {
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
//     const id = Number(value);

//     if (Number.isInteger(id) && id > 0) {
//       return id;
//     }
//   }

//   try {
//     const params = new URLSearchParams(
//       window.location.search
//     );

//     const queryInstituteId =
//       params.get("institute_id");

//     const id = Number(queryInstituteId);

//     if (Number.isInteger(id) && id > 0) {
//       return id;
//     }
//   } catch (_) {}

//   return null;
// };

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
//       "STUDENT"
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
//       "SAVE STUDENT ERROR:",
//       error
//     );
//   }
// };

// /* =========================================================
//    NORMALIZE STUDENT
// ========================================================= */

// const normalizeStudent = (
//   result,
//   firebaseUser,
//   existingStudent
// ) => {
//   const data =
//     result?.data ||
//     result?.student ||
//     result ||
//     {};

//   const student =
//     data?.student || {};

//   const account =
//     data?.account || {};

//   const user =
//     data?.user || {};

//   return {
//     ...(existingStudent || {}),
//     ...data,
//     ...student,

//     uid:
//       data?.uid ||
//       data?.firebase_uid ||
//       existingStudent?.uid ||
//       firebaseUser?.uid ||
//       null,

//     firebase_uid:
//       data?.firebase_uid ||
//       existingStudent?.firebase_uid ||
//       firebaseUser?.uid ||
//       null,

//     student_id:
//       data?.student_id ||
//       student?.student_id ||
//       student?.id ||
//       existingStudent?.student_id ||
//       null,

//     institute_id:
//       data?.institute_id ||
//       student?.institute_id ||
//       existingStudent?.institute_id ||
//       null,

//     name:
//       data?.name ||
//       data?.full_name ||
//       student?.name ||
//       user?.full_name ||
//       existingStudent?.name ||
//       existingStudent?.full_name ||
//       firebaseUser?.displayName ||
//       "Student",

//     full_name:
//       data?.full_name ||
//       data?.name ||
//       student?.name ||
//       user?.full_name ||
//       existingStudent?.full_name ||
//       existingStudent?.name ||
//       firebaseUser?.displayName ||
//       "Student",

//     email:
//       data?.email ||
//       account?.email ||
//       user?.email ||
//       existingStudent?.email ||
//       firebaseUser?.email ||
//       "",

//     phone:
//       data?.phone ||
//       data?.phone_number ||
//       account?.phone_number ||
//       user?.phone_number ||
//       existingStudent?.phone ||
//       existingStudent?.phone_number ||
//       firebaseUser?.phoneNumber ||
//       "",

//     profile_image:
//       data?.profile_image ||
//       data?.student_photo ||
//       student?.profile_image ||
//       user?.profile_image ||
//       existingStudent?.profile_image ||
//       firebaseUser?.photoURL ||
//       "",

//     photoURL:
//       data?.photoURL ||
//       existingStudent?.photoURL ||
//       firebaseUser?.photoURL ||
//       data?.profile_image ||
//       "",
//   };
// };

// /* =========================================================
//    RESPONSE HELPERS
// ========================================================= */

// const extractArray = (
//   result,
//   keys = []
// ) => {
//   if (Array.isArray(result)) {
//     return result;
//   }

//   for (const key of keys) {
//     if (Array.isArray(result?.[key])) {
//       return result[key];
//     }

//     if (
//       Array.isArray(
//         result?.data?.[key]
//       )
//     ) {
//       return result.data[key];
//     }
//   }

//   if (Array.isArray(result?.data)) {
//     return result.data;
//   }

//   return [];
// };

// const getImage = (
//   value,
//   fallbackName = "Course"
// ) => {
//   if (value) {
//     return value;
//   }

//   return `https://ui-avatars.com/api/?name=${encodeURIComponent(
//     fallbackName
//   )}&background=07152A&color=ffffff&bold=true&size=600`;
// };

// const formatDate = value => {
//   if (!value) {
//     return "Date unavailable";
//   }

//   const date = new Date(value);

//   if (Number.isNaN(date.getTime())) {
//     return String(value);
//   }

//   return date.toLocaleDateString(
//     "en-IN",
//     {
//       weekday: "short",
//       day: "2-digit",
//       month: "short",
//     }
//   );
// };

// const formatTime = value => {
//   if (!value) {
//     return "Time unavailable";
//   }

//   const date = new Date(value);

//   if (!Number.isNaN(date.getTime())) {
//     return date.toLocaleTimeString(
//       "en-IN",
//       {
//         hour: "2-digit",
//         minute: "2-digit",
//       }
//     );
//   }

//   return String(value);
// };

// /* =========================================================
//    DASHBOARD
// ========================================================= */

// const WebsitePreviewDashboard = () => {
//   const navigate = useNavigate();

//   const context =
//     useOutletContext() || {};

//   const branding =
//     context.branding || {};

//   const primaryColor =
//     branding.primaryColor ||
//     branding.primary_color ||
//     "#087CFF";

//   const accentColor =
//     branding.accentColor ||
//     branding.accent_color ||
//     "#6D2BFF";

//   const pageBackground =
//     branding.pageBackgroundColor ||
//     branding.page_background_color ||
//     "#020914";

//   const instituteId =
//     resolveInstituteId(
//       context,
//       getStoredStudent()
//     );

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
//     courses,
//     setCourses,
//   ] = useState([]);

//   const [
//     sessions,
//     setSessions,
//   ] = useState([]);

//   const [
//     bookings,
//     setBookings,
//   ] = useState([]);

//   const [
//     loading,
//     setLoading,
//   ] = useState(true);

//   const [
//     dataLoading,
//     setDataLoading,
//   ] = useState(false);

//   const [
//     mobileMenu,
//     setMobileMenu,
//   ] = useState(false);

//   const [
//     search,
//     setSearch,
//   ] = useState("");

//   const [
//     error,
//     setError,
//   ] = useState("");

//   /* =======================================================
//      FIREBASE AUTH
//   ======================================================= */

//   useEffect(() => {
//     let mounted = true;

//     const unsubscribe =
//       onAuthStateChanged(
//         auth,
//         async user => {
//           if (!mounted) {
//             return;
//           }

//           setFirebaseUser(user);

//           const storedStudent =
//             getStoredStudent();

//           if (storedStudent) {
//             setStudent(previous => ({
//               ...(previous || {}),
//               ...storedStudent,
//             }));
//           }

//           if (user) {
//             try {
//               const freshToken =
//                 await user.getIdToken();

//               if (mounted) {
//                 setToken(freshToken);

//                 localStorage.setItem(
//                   "studentToken",
//                   freshToken
//                 );
//               }
//             } catch (authError) {
//               console.error(
//                 "TOKEN ERROR:",
//                 authError
//               );
//             }
//           }

//           if (mounted) {
//             setLoading(false);
//           }
//         }
//       );

//     return () => {
//       mounted = false;
//       unsubscribe();
//     };
//   }, []);

//   /* =======================================================
//      CONTEXT STUDENT
//   ======================================================= */

//   useEffect(() => {
//     if (
//       context.studentUser &&
//       typeof context.studentUser ===
//         "object"
//     ) {
//       setStudent(previous => ({
//         ...(previous || {}),
//         ...context.studentUser,
//       }));

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

//   /* =======================================================
//      FETCH PROFILE
//   ======================================================= */

//   const fetchStudentProfile =
//     async firebaseUser => {
//       if (!firebaseUser?.uid) {
//         return;
//       }

//       const currentInstituteId =
//         resolveInstituteId(
//           context,
//           student
//         );

//       if (!currentInstituteId) {
//         return;
//       }

//       try {
//         const freshToken =
//           await firebaseUser.getIdToken();

//         localStorage.setItem(
//           "studentToken",
//           freshToken
//         );

//         const response =
//           await fetch(
//             `${API}/students/me?institute_id=${encodeURIComponent(
//               currentInstituteId
//             )}`,
//             {
//               method: "GET",
//               headers: {
//                 Accept:
//                   "application/json",
//                 Authorization:
//                   `Bearer ${freshToken}`,
//               },
//             }
//           );

//         const result =
//           await response
//             .json()
//             .catch(() => ({}));

//         if (!response.ok) {
//           throw new Error(
//             result?.message ||
//               result?.error ||
//               "Unable to load student profile."
//           );
//         }

//         const normalized =
//           normalizeStudent(
//             result,
//             firebaseUser,
//             getStoredStudent()
//           );

//         normalized.institute_id =
//           normalized.institute_id ||
//           currentInstituteId;

//         saveStudent(
//           normalized,
//           freshToken,
//           currentInstituteId
//         );

//         setStudent(normalized);
//         setToken(freshToken);
//       } catch (profileError) {
//         console.warn(
//           "STUDENT PROFILE REFRESH:",
//           profileError
//         );
//       }
//     };

//   /* =======================================================
//      PROFILE REFRESH
//   ======================================================= */

//   useEffect(() => {
//     if (firebaseUser) {
//       fetchStudentProfile(
//         firebaseUser
//       );
//     }
//   }, [firebaseUser]);

//   /* =======================================================
//      LOAD DASHBOARD DATA
//   ======================================================= */

//   useEffect(() => {
//     if (!token) {
//       return;
//     }

//     let mounted = true;

//     const loadDashboard =
//       async () => {
//         setDataLoading(true);
//         setError("");

//         try {
//           const headers = {
//             Accept:
//               "application/json",
//             Authorization:
//               `Bearer ${token}`,
//           };

//           const [
//             coursesResponse,
//             sessionsResponse,
//             bookingsResponse,
//           ] =
//             await Promise.allSettled([
//               fetch(
//                 `${API}/lms/courses`,
//                 {
//                   headers,
//                 }
//               ),

//               fetch(
//                 `${API}/sessions/user/upcoming`,
//                 {
//                   headers,
//                 }
//               ),

//               fetch(
//                 `${API}/bookings/my`,
//                 {
//                   headers,
//                 }
//               ),
//             ]);

//           if (!mounted) {
//             return;
//           }

//           /* -------------------------------------------------
//              COURSES
//           ------------------------------------------------- */

//           if (
//             coursesResponse.status ===
//               "fulfilled" &&
//             coursesResponse.value.ok
//           ) {
//             const result =
//               await coursesResponse.value
//                 .json()
//                 .catch(() => ({}));

//             setCourses(
//               extractArray(result, [
//                 "courses",
//                 "items",
//                 "results",
//               ])
//             );
//           } else {
//             setCourses([]);
//           }

//           /* -------------------------------------------------
//              SESSIONS
//           ------------------------------------------------- */

//           if (
//             sessionsResponse.status ===
//               "fulfilled" &&
//             sessionsResponse.value.ok
//           ) {
//             const result =
//               await sessionsResponse.value
//                 .json()
//                 .catch(() => ({}));

//             setSessions(
//               extractArray(result, [
//                 "sessions",
//                 "upcoming",
//                 "items",
//               ])
//             );
//           } else {
//             setSessions([]);
//           }

//           /* -------------------------------------------------
//              BOOKINGS
//           ------------------------------------------------- */

//           if (
//             bookingsResponse.status ===
//               "fulfilled" &&
//             bookingsResponse.value.ok
//           ) {
//             const result =
//               await bookingsResponse.value
//                 .json()
//                 .catch(() => ({}));

//             setBookings(
//               extractArray(result, [
//                 "bookings",
//                 "items",
//                 "results",
//               ])
//             );
//           } else {
//             setBookings([]);
//           }
//         } catch (dashboardError) {
//           console.error(
//             "DASHBOARD DATA ERROR:",
//             dashboardError
//           );

//           if (mounted) {
//             setError(
//               dashboardError?.message ||
//                 "Unable to load dashboard data."
//             );
//           }
//         } finally {
//           if (mounted) {
//             setDataLoading(false);
//           }
//         }
//       };

//     loadDashboard();

//     return () => {
//       mounted = false;
//     };
//   }, [token]);

//   /* =======================================================
//      DERIVED DATA
//   ======================================================= */

//   const displayName =
//     student?.name ||
//     student?.full_name ||
//     student?.displayName ||
//     firebaseUser?.displayName ||
//     "Student";

//   const firstName =
//     displayName
//       .trim()
//       .split(" ")[0] ||
//     "Student";

//   const profileImage =
//     student?.profile_image ||
//     student?.photoURL ||
//     firebaseUser?.photoURL ||
//     `https://ui-avatars.com/api/?name=${encodeURIComponent(
//       displayName
//     )}&background=087CFF&color=fff&bold=true&size=200`;

//   const totalPayments = useMemo(() => {
//     return bookings
//       .filter(booking => {
//         const status =
//           booking?.payment?.status ||
//           booking?.payment_status ||
//           booking?.status;

//         return (
//           String(status || "")
//             .toUpperCase() ===
//           "PAID"
//         );
//       })
//       .reduce((sum, booking) => {
//         const amount =
//           booking?.payment?.amount ??
//           booking?.amount ??
//           booking?.price ??
//           booking?.total_amount ??
//           0;

//         return (
//           sum + Number(amount || 0)
//         );
//       }, 0);
//   }, [bookings]);

//   const filteredCourses =
//     useMemo(() => {
//       const value =
//         search.trim().toLowerCase();

//       if (!value) {
//         return courses.slice(0, 4);
//       }

//       return courses
//         .filter(course => {
//           return (
//             String(
//               course?.title || ""
//             )
//               .toLowerCase()
//               .includes(value) ||
//             String(
//               course?.name || ""
//             )
//               .toLowerCase()
//               .includes(value) ||
//             String(
//               course?.trainer_name || ""
//             )
//               .toLowerCase()
//               .includes(value) ||
//             String(
//               course?.level || ""
//             )
//               .toLowerCase()
//               .includes(value)
//           );
//         })
//         .slice(0, 4);
//     }, [courses, search]);

//   const upcomingSessions =
//     useMemo(() => {
//       return [...sessions]
//         .sort((a, b) => {
//           const aDate =
//             new Date(
//               a?.start_time ||
//                 a?.start_at ||
//                 a?.session_date ||
//                 a?.date ||
//                 0
//             ).getTime();

//           const bDate =
//             new Date(
//               b?.start_time ||
//                 b?.start_at ||
//                 b?.session_date ||
//                 b?.date ||
//                 0
//             ).getTime();

//           return aDate - bDate;
//         })
//         .slice(0, 3);
//     }, [sessions]);

//   /* =======================================================
//      NAVIGATION
//   ======================================================= */

//   const go = path => {
//     setMobileMenu(false);
//     navigate(path);
//   };

//   const menuItems = [
//     {
//       label: "Dashboard",
//       icon: <FaHome />,
//       path:
//         "/institute/website/preview/dashboard",
//     },
//     {
//       label: "My Learning",
//       icon: <FaBookOpen />,
//       path:
//         "/institute/website/preview/my-learning",
//     },
//     {
//       label: "Live Sessions",
//       icon: <FaVideo />,
//       path:
//         "/institute/website/preview/sessions",
//     },
//     {
//       label: "Recordings",
//       icon: <FaPlayCircle />,
//       path:
//         "/institute/website/preview/recordings",
//     },
//     {
//       label: "My Bookings",
//       icon: <FaCalendarAlt />,
//       path:
//         "/institute/website/preview/my-bookings",
//     },
//     {
//       label: "Assignments",
//       icon: <FaFileAlt />,
//       path:
//         "/institute/website/preview/assignments",
//     },
//     {
//       label: "Attendance",
//       icon: <FaClipboardCheck />,
//       path:
//         "/institute/website/preview/attendance",
//     },
//     {
//       label: "Payment Details",
//       icon: <FaCreditCard />,
//       path:
//         "/institute/website/preview/payments",
//     },
//     {
//       label: "Profile",
//       icon: <FaUser />,
//       path:
//         "/institute/website/preview/profile",
//     },
//   ];

//   /* =======================================================
//      JOIN SESSION
//   ======================================================= */

//   const handleJoinSession =
//     session => {
//       const meetingUrl =
//         session?.meeting_url ||
//         session?.meetingUrl ||
//         session?.join_url ||
//         session?.joinUrl ||
//         session?.zoom_link ||
//         session?.google_meet_link;

//       if (meetingUrl) {
//         window.open(
//           meetingUrl,
//           "_blank",
//           "noopener,noreferrer"
//         );

//         return;
//       }

//       console.warn(
//         "No meeting URL available:",
//         session
//       );
//     };

//   /* =======================================================
//      LOADING
//   ======================================================= */

//   if (loading) {
//     return (
//       <div
//         className="flex min-h-screen items-center justify-center text-white"
//         style={{
//           background:
//             pageBackground,
//         }}
//       >
//         <div className="text-center">
//           <div
//             className="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-4 border-white/10"
//             style={{
//               borderTopColor:
//                 primaryColor,
//               borderRightColor:
//                 accentColor,
//             }}
//           />

//           <p className="text-sm text-white/60">
//             Loading student dashboard...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   /* =======================================================
//      RENDER
//   ======================================================= */

//   return (
//     <div
//       className="min-h-screen overflow-x-hidden text-white"
//       style={{
//         background:
//           pageBackground,
//       }}
//     >
//       {/* =================================================
//           BACKGROUND GLOW
//       ================================================= */}

//       <div className="pointer-events-none fixed inset-0 overflow-hidden">
//         <div
//           className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full blur-[150px]"
//           style={{
//             background:
//               `${primaryColor}12`,
//           }}
//         />

//         <div
//           className="absolute -bottom-40 right-0 h-[500px] w-[500px] rounded-full blur-[150px]"
//           style={{
//             background:
//               `${accentColor}10`,
//           }}
//         />
//       </div>

//       {/* =================================================
//           MOBILE OVERLAY
//       ================================================= */}

//       {mobileMenu && (
//         <div
//           className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
//           onClick={() =>
//             setMobileMenu(false)
//           }
//         />
//       )}

//       {/* =================================================
//           SIDEBAR
//       ================================================= */}

//       <aside
//         className={`
//           fixed left-0 top-0 z-50
//           flex h-screen w-[270px]
//           flex-col
//           border-r border-white/[0.07]
//           bg-[#020B18]/95
//           backdrop-blur-2xl
//           transition-transform duration-300
//           ${
//             mobileMenu
//               ? "translate-x-0"
//               : "-translate-x-full lg:translate-x-0"
//           }
//         `}
//       >
//         {/* LOGO */}

//         <div className="flex h-[82px] items-center border-b border-white/[0.06] px-7">
//           <div className="flex items-center gap-3">
//             <div
//               className="flex h-11 w-11 items-center justify-center rounded-xl text-xl shadow-lg"
//               style={{
//                 background:
//                   `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
//                 boxShadow:
//                   `0 0 30px ${primaryColor}35`,
//               }}
//             >
//               <FaGraduationCap />
//             </div>

//             <div>
//               <h1 className="text-xl font-black tracking-tight">
//                 Fine
//                 <span
//                   style={{
//                     color: primaryColor,
//                   }}
//                 >
//                   Arts
//                 </span>
//               </h1>

//               <p className="text-[11px] text-white/50">
//                 Student LMS
//               </p>
//             </div>
//           </div>

//           <button
//             type="button"
//             className="ml-auto text-white/60 lg:hidden"
//             onClick={() =>
//               setMobileMenu(false)
//             }
//           >
//             <FaTimes />
//           </button>
//         </div>

//         {/* NAVIGATION */}

//         <nav className="flex-1 overflow-y-auto px-4 py-6">
//           <div className="space-y-1.5">
//             {menuItems.map(item => {
//               const active =
//                 item.label ===
//                 "Dashboard";

//               return (
//                 <button
//                   key={item.label}
//                   type="button"
//                   onClick={() =>
//                     go(item.path)
//                   }
//                   className={`
//                     group flex w-full
//                     items-center gap-4
//                     rounded-xl px-4 py-3.5
//                     text-left transition-all
//                     ${
//                       active
//                         ? "text-white"
//                         : "text-white/70 hover:bg-white/[0.05] hover:text-white"
//                     }
//                   `}
//                   style={
//                     active
//                       ? {
//                           background:
//                             `linear-gradient(90deg, ${primaryColor}28, ${primaryColor}0A)`,
//                           boxShadow:
//                             `inset 3px 0 0 ${primaryColor}, 0 0 25px ${primaryColor}10`,
//                         }
//                       : {}
//                   }
//                 >
//                   <span
//                     className="flex w-6 justify-center text-lg"
//                     style={
//                       active
//                         ? {
//                             color:
//                               primaryColor,
//                           }
//                         : {}
//                     }
//                   >
//                     {item.icon}
//                   </span>

//                   <span className="text-sm font-medium">
//                     {item.label}
//                   </span>
//                 </button>
//               );
//             })}
//           </div>
//         </nav>

//         {/* BOTTOM BRANDING */}

//         <div className="border-t border-white/[0.06] p-5">
//           <div className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4">
//             <p
//               className="font-serif text-sm italic leading-6"
//               style={{
//                 color:
//                   `${primaryColor}CC`,
//               }}
//             >
//               "Art Builds
//               <br />
//               A Better
//               <br />
//               You"
//             </p>

//             <div
//               className="mt-3 h-1 w-8 rounded-full"
//               style={{
//                 background:
//                   `linear-gradient(90deg, ${primaryColor}, ${accentColor})`,
//               }}
//             />
//           </div>
//         </div>
//       </aside>

//       {/* =================================================
//           MAIN
//       ================================================= */}

//       <div className="relative lg:pl-[270px]">
//         {/* =================================================
//             TOP BAR
//         ================================================= */}

//         <header className="sticky top-0 z-30 h-[82px] border-b border-white/[0.07] bg-[#020914]/85 backdrop-blur-2xl">
//           <div className="flex h-full items-center gap-4 px-4 sm:px-6 lg:px-8">
//             {/* MOBILE BUTTON */}

//             <button
//               type="button"
//               className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-white lg:hidden"
//               onClick={() =>
//                 setMobileMenu(true)
//               }
//             >
//               <FaBars />
//             </button>

//             {/* SEARCH */}

//             <div className="relative max-w-[560px] flex-1">
//               <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />

//               <input
//                 value={search}
//                 onChange={event =>
//                   setSearch(
//                     event.target.value
//                   )
//                 }
//                 placeholder="Search courses, classes, recordings or topics..."
//                 className="h-12 w-full rounded-xl border border-white/[0.09] bg-white/[0.035] pl-11 pr-4 text-sm text-white outline-none placeholder:text-white/35 focus:border-white/20"
//               />
//             </div>

//             {/* RIGHT */}

//             <div className="ml-auto flex items-center gap-3">
//               {/* NOTIFICATION */}

//               <button
//                 type="button"
//                 className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.025] text-lg text-white/80 transition hover:bg-white/[0.06]"
//               >
//                 <FaBell />

//                 {upcomingSessions.length >
//                   0 && (
//                   <span
//                     className="absolute right-2 top-2 h-2 w-2 rounded-full"
//                     style={{
//                       background:
//                         primaryColor,
//                     }}
//                   />
//                 )}
//               </button>

//               {/* PROFILE */}

//               <button
//                 type="button"
//                 onClick={() =>
//                   go(
//                     "/institute/website/preview/profile"
//                   )
//                 }
//                 className="flex items-center gap-3 border-l border-white/[0.08] pl-4"
//               >
//                 <img
//                   src={profileImage}
//                   alt={displayName}
//                   className="h-10 w-10 rounded-full border border-white/10 object-cover"
//                 />

//                 <div className="hidden text-left sm:block">
//                   <p className="max-w-[130px] truncate text-sm font-semibold">
//                     {displayName}
//                   </p>

//                   <p className="text-xs text-white/45">
//                     Student
//                   </p>
//                 </div>

//                 <FaChevronRight className="hidden rotate-90 text-xs text-white/50 sm:block" />
//               </button>
//             </div>
//           </div>
//         </header>

//         {/* =================================================
//             CONTENT
//         ================================================= */}

//         <main className="mx-auto w-full max-w-[1500px] px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
//           {/* ERROR */}

//           {error && (
//             <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
//               {error}
//             </div>
//           )}

//           {/* =================================================
//               TOP GRID
//           ================================================= */}

//           <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_390px]">
//             {/* HERO */}

//             <section
//               className="relative min-h-[270px] overflow-hidden rounded-2xl border border-white/[0.09]"
//               style={{
//                 background:
//                   `radial-gradient(circle at 75% 50%, ${primaryColor}30, transparent 30%), linear-gradient(135deg, #031024 0%, #020914 65%, #050B18 100%)`,
//               }}
//             >
//               {/* GLOW */}

//               <div
//                 className="absolute right-[-100px] top-[-100px] h-[420px] w-[420px] rounded-full blur-[90px]"
//                 style={{
//                   background:
//                     `${primaryColor}25`,
//                 }}
//               />

//               <div
//                 className="absolute bottom-[-130px] right-[100px] h-[300px] w-[300px] rounded-full blur-[80px]"
//                 style={{
//                   background:
//                     `${accentColor}25`,
//                 }}
//               />

//               {/* ABSTRACT ART */}

//               <div className="pointer-events-none absolute inset-0 overflow-hidden">
//                 <div
//                   className="absolute right-[15%] top-[15%] h-44 w-44 rounded-full border-[35px] border-white/[0.025]"
//                   style={{
//                     boxShadow:
//                       `0 0 80px ${primaryColor}20`,
//                   }}
//                 />

//                 <div
//                   className="absolute -right-10 bottom-[-80px] h-64 w-[500px] rotate-[-18deg] rounded-[50%] border-[3px] opacity-60"
//                   style={{
//                     borderColor:
//                       `${primaryColor}50`,
//                   }}
//                 />

//                 <div
//                   className="absolute right-20 bottom-[-40px] h-40 w-[400px] rotate-[-12deg] rounded-[50%] border-[2px] opacity-40"
//                   style={{
//                     borderColor:
//                       `${accentColor}60`,
//                   }}
//                 />
//               </div>

//               {/* HERO CONTENT */}

//               <div className="relative z-10 flex h-full min-h-[270px] flex-col justify-center px-6 py-8 sm:px-8 lg:px-10">
//                 <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/75">
//                   Welcome back,
//                 </p>

//                 <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
//                   {firstName}
//                   <span className="ml-2">
//                     👋
//                   </span>
//                 </h1>

//                 <p className="mt-3 max-w-[560px] text-sm leading-6 text-white/65 sm:text-base">
//                   Keep learning, keep creating.
//                   Every session brings you
//                   closer to your goals.
//                 </p>

//                 <div className="mt-6 flex flex-wrap gap-3">
//                   <button
//                     type="button"
//                     onClick={() =>
//                       go(
//                         "/institute/website/preview/my-learning"
//                       )
//                     }
//                     className="flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:scale-[1.02]"
//                     style={{
//                       background:
//                         `linear-gradient(90deg, ${primaryColor}, ${accentColor})`,
//                       boxShadow:
//                         `0 10px 30px ${primaryColor}25`,
//                     }}
//                   >
//                     Continue Learning
//                     <FaArrowRight />
//                   </button>

//                   <button
//                     type="button"
//                     onClick={() =>
//                       go(
//                         "/institute/website/preview/classes"
//                       )
//                     }
//                     className="rounded-xl border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.08]"
//                   >
//                     Explore Courses
//                   </button>
//                 </div>
//               </div>
//             </section>

//             {/* UPCOMING SESSIONS */}

//             <section className="rounded-2xl border border-white/[0.08] bg-[#041020]/80 p-4 shadow-2xl">
//               <div className="mb-4 flex items-center justify-between">
//                 <h2 className="text-lg font-bold">
//                   Upcoming Live Sessions
//                 </h2>

//                 <button
//                   type="button"
//                   onClick={() =>
//                     go(
//                       "/institute/website/preview/sessions"
//                     )
//                   }
//                   className="text-xs font-semibold"
//                   style={{
//                     color: primaryColor,
//                   }}
//                 >
//                   View All
//                 </button>
//               </div>

//               {dataLoading ? (
//                 <div className="space-y-3">
//                   {[1, 2, 3].map(
//                     item => (
//                       <div
//                         key={item}
//                         className="h-[78px] animate-pulse rounded-xl bg-white/[0.04]"
//                       />
//                     )
//                   )}
//                 </div>
//               ) : upcomingSessions.length ===
//                 0 ? (
//                 <div className="flex min-h-[170px] flex-col items-center justify-center rounded-xl border border-dashed border-white/[0.08] text-center">
//                   <FaVideo className="mb-3 text-2xl text-white/25" />

//                   <p className="text-sm font-semibold text-white/70">
//                     No upcoming sessions
//                   </p>

//                   <p className="mt-1 text-xs text-white/35">
//                     Your upcoming live classes
//                     will appear here.
//                   </p>
//                 </div>
//               ) : (
//                 <div className="space-y-3">
//                   {upcomingSessions.map(
//                     (session, index) => (
//                       <LiveSessionCard
//                         key={
//                           session?.id ||
//                           session?.session_id ||
//                           index
//                         }
//                         session={session}
//                         primaryColor={
//                           primaryColor
//                         }
//                         onJoin={() =>
//                           handleJoinSession(
//                             session
//                           )
//                         }
//                       />
//                     )
//                   )}
//                 </div>
//               )}
//             </section>
//           </div>

//           {/* =================================================
//               QUICK ACTIONS
//           ================================================= */}

//           <section className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
//             <QuickAction
//               icon={<FaBookOpen />}
//               title="My Learning"
//               subtitle="Continue Courses"
//               primaryColor={
//                 primaryColor
//               }
//               accentColor={
//                 accentColor
//               }
//               onClick={() =>
//                 go(
//                   "/institute/website/preview/my-learning"
//                 )
//               }
//             />

//             <QuickAction
//               icon={<FaVideo />}
//               title="Live Sessions"
//               subtitle="Join Upcoming"
//               primaryColor={
//                 accentColor
//               }
//               accentColor={
//                 primaryColor
//               }
//               onClick={() =>
//                 go(
//                   "/institute/website/preview/sessions"
//                 )
//               }
//             />

//             <QuickAction
//               icon={<FaPlayCircle />}
//               title="Recordings"
//               subtitle="Watch Anytime"
//               primaryColor={
//                 primaryColor
//               }
//               accentColor={
//                 accentColor
//               }
//               onClick={() =>
//                 go(
//                   "/institute/website/preview/recordings"
//                 )
//               }
//             />

//             <QuickAction
//               icon={<FaCalendarAlt />}
//               title="My Bookings"
//               subtitle={
//                 bookings.length
//                   ? `${bookings.length} Booked Classes`
//                   : "View Booked Classes"
//               }
//               primaryColor={
//                 accentColor
//               }
//               accentColor={
//                 primaryColor
//               }
//               onClick={() =>
//                 go(
//                   "/institute/website/preview/my-bookings"
//                 )
//               }
//             />

//             <QuickAction
//               icon={<FaFileAlt />}
//               title="Assignments"
//               subtitle="View & Submit"
//               primaryColor={
//                 primaryColor
//               }
//               accentColor={
//                 accentColor
//               }
//               onClick={() =>
//                 go(
//                   "/institute/website/preview/assignments"
//                 )
//               }
//             />

//             <QuickAction
//               icon={<FaClipboardCheck />}
//               title="Attendance"
//               subtitle="Track Your Classes"
//               primaryColor={
//                 accentColor
//               }
//               accentColor={
//                 primaryColor
//               }
//               onClick={() =>
//                 go(
//                   "/institute/website/preview/attendance"
//                 )
//               }
//             />

//             <QuickAction
//               icon={<FaCreditCard />}
//               title="Payment Details"
//               subtitle={
//                 totalPayments > 0
//                   ? `₹${totalPayments.toLocaleString(
//                       "en-IN"
//                     )} Paid`
//                   : "View Transactions"
//               }
//               primaryColor={
//                 primaryColor
//               }
//               accentColor={
//                 accentColor
//               }
//               onClick={() =>
//                 go(
//                   "/institute/website/preview/payments"
//                 )
//               }
//             />

//             <QuickAction
//               icon={<FaUser />}
//               title="Profile"
//               subtitle="Manage Your Account"
//               primaryColor={
//                 accentColor
//               }
//               accentColor={
//                 primaryColor
//               }
//               onClick={() =>
//                 go(
//                   "/institute/website/preview/profile"
//                 )
//               }
//             />
//           </section>

//           {/* =================================================
//               MY LEARNING
//           ================================================= */}

//           <section className="mt-8">
//             <div className="mb-5 flex items-center justify-between">
//               <div>
//                 <h2 className="text-2xl font-black">
//                   My Learning
//                 </h2>

//                 <p className="mt-1 text-xs text-white/40">
//                   Continue where you left off
//                 </p>
//               </div>

//               <button
//                 type="button"
//                 onClick={() =>
//                   go(
//                     "/institute/website/preview/my-learning"
//                   )
//                 }
//                 className="flex items-center gap-2 text-sm font-semibold"
//                 style={{
//                   color: primaryColor,
//                 }}
//               >
//                 View All Courses
//                 <FaArrowRight className="text-xs" />
//               </button>
//             </div>

//             {dataLoading ? (
//               <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
//                 {[1, 2, 3, 4].map(
//                   item => (
//                     <div
//                       key={item}
//                       className="h-[280px] animate-pulse rounded-2xl bg-white/[0.04]"
//                     />
//                   )
//                 )}
//               </div>
//             ) : filteredCourses.length ===
//               0 ? (
//               <EmptyCourses
//                 primaryColor={
//                   primaryColor
//                 }
//                 onBrowse={() =>
//                   go(
//                     "/institute/website/preview/classes"
//                   )
//                 }
//               />
//             ) : (
//               <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
//                 {filteredCourses.map(
//                   (course, index) => (
//                     <CourseCard
//                       key={
//                         course?.id ||
//                         course?.class_id ||
//                         index
//                       }
//                       course={course}
//                       primaryColor={
//                         primaryColor
//                       }
//                       accentColor={
//                         accentColor
//                       }
//                       onContinue={() =>
//                         go(
//                           `/institute/website/preview/my-learning/${
//                             course?.id ||
//                             course?.class_id
//                           }`
//                         )
//                       }
//                     />
//                   )
//                 )}
//               </div>
//             )}
//           </section>
//         </main>
//       </div>
//     </div>
//   );
// };

// /* =========================================================
//    QUICK ACTION
// ========================================================= */

// const QuickAction = ({
//   icon,
//   title,
//   subtitle,
//   primaryColor,
//   accentColor,
//   onClick,
// }) => {
//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       className="group flex min-h-[100px] items-center gap-4 rounded-2xl border border-white/[0.07] bg-[#041020]/75 px-5 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-white/[0.14] hover:bg-white/[0.05]"
//     >
//       <div
//         className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl text-xl text-white transition-transform group-hover:scale-105"
//         style={{
//           background:
//             `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
//           boxShadow:
//             `0 8px 30px ${primaryColor}25`,
//         }}
//       >
//         {icon}
//       </div>

//       <div className="min-w-0">
//         <h3 className="text-sm font-bold text-white">
//           {title}
//         </h3>

//         <p className="mt-1 text-xs text-white/45">
//           {subtitle}
//         </p>
//       </div>

//       <FaChevronRight className="ml-auto text-xs text-white/25 transition-transform group-hover:translate-x-1" />
//     </button>
//   );
// };

// /* =========================================================
//    LIVE SESSION CARD
// ========================================================= */

// const LiveSessionCard = ({
//   session,
//   primaryColor,
//   onJoin,
// }) => {
//   const title =
//     session?.title ||
//     session?.session_title ||
//     session?.class_name ||
//     session?.class_title ||
//     "Live Session";

//   const image =
//     session?.image ||
//     session?.class_image ||
//     session?.thumbnail ||
//     session?.cover_image;

//   const dateValue =
//     session?.start_time ||
//     session?.start_at ||
//     session?.session_date ||
//     session?.date;

//   const timeValue =
//     session?.start_time ||
//     session?.start_at ||
//     session?.date;

//   return (
//     <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.025] p-2.5">
//       <div className="h-[62px] w-[76px] flex-shrink-0 overflow-hidden rounded-lg bg-white/5">
//         <img
//           src={getImage(
//             image,
//             title
//           )}
//           alt={title}
//           className="h-full w-full object-cover"
//           onError={event => {
//             event.currentTarget.src =
//               getImage(
//                 null,
//                 title
//               );
//           }}
//         />
//       </div>

//       <div className="min-w-0 flex-1">
//         <h3 className="truncate text-sm font-bold">
//           {title}
//         </h3>

//         <div className="mt-1 flex items-center gap-2 text-[11px] text-white/45">
//           <FaCalendarAlt />

//           <span>
//             {formatDate(
//               dateValue
//             )}
//           </span>

//           <span>•</span>

//           <FaClock />

//           <span>
//             {formatTime(
//               timeValue
//             )}
//           </span>
//         </div>
//       </div>

//       <button
//         type="button"
//         onClick={onJoin}
//         className="flex-shrink-0 rounded-lg px-3 py-2 text-xs font-bold text-white"
//         style={{
//           background:
//             `linear-gradient(135deg, ${primaryColor}, #0057FF)`,
//         }}
//       >
//         Join
//       </button>
//     </div>
//   );
// };

// /* =========================================================
//    COURSE CARD
// ========================================================= */

// const CourseCard = ({
//   course,
//   primaryColor,
//   accentColor,
//   onContinue,
// }) => {
//   const title =
//     course?.title ||
//     course?.name ||
//     "Course";

//   const image =
//     course?.image ||
//     course?.class_image ||
//     course?.thumbnail ||
//     course?.cover_image;

//   const level =
//     course?.level ||
//     "Beginner";

//   const totalLessons =
//     Number(
//       course?.totalLessons ??
//         course?.total_lessons ??
//         course?.lesson_count ??
//         course?.lessons ??
//         0
//     ) || 0;

//   const progress =
//     Number(
//       course?.progress ??
//         course?.progress_percentage ??
//         course?.completion_percentage ??
//         0
//     ) || 0;

//   const status =
//     course?.status ||
//     course?.learning_status ||
//     (progress > 0
//       ? "In Progress"
//       : "Start Course");

//   const isInProgress =
//     progress > 0 ||
//     String(status)
//       .toLowerCase()
//       .includes("progress");

//   return (
//     <div className="group overflow-hidden rounded-2xl border border-white/[0.08] bg-[#041020]/80 transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.14] hover:shadow-2xl">
//       {/* IMAGE */}

//       <div className="relative h-[165px] overflow-hidden">
//         <img
//           src={getImage(
//             image,
//             title
//           )}
//           alt={title}
//           className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
//           onError={event => {
//             event.currentTarget.src =
//               getImage(
//                 null,
//                 title
//               );
//           }}
//         />

//         <div className="absolute inset-0 bg-gradient-to-t from-[#041020] via-transparent to-transparent" />

//         {/* STATUS */}

//         <div
//           className="absolute right-3 top-3 rounded-full px-3 py-1 text-[11px] font-bold text-white backdrop-blur-md"
//           style={{
//             background:
//               isInProgress
//                 ? `${primaryColor}DD`
//                 : `${accentColor}DD`,
//           }}
//         >
//           {isInProgress
//             ? "In Progress"
//             : level}
//         </div>

//         {/* PLAY */}

//         <div
//           className="absolute bottom-3 left-3 flex h-9 w-9 items-center justify-center rounded-full text-white opacity-0 shadow-lg transition group-hover:opacity-100"
//           style={{
//             background:
//               `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
//           }}
//         >
//           <FaPlay className="ml-0.5 text-xs" />
//         </div>
//       </div>

//       {/* CONTENT */}

//       <div className="p-4">
//         <h3 className="min-h-[48px] text-base font-bold leading-6 text-white">
//           {title}
//         </h3>

//         <div className="mt-3 flex items-center gap-4 text-xs text-white/50">
//           <span className="flex items-center gap-1.5">
//             <FaCalendarAlt />
//             {totalLessons || 0} Lessons
//           </span>

//           <span className="flex items-center gap-1.5">
//             <FaUser />
//             {level}
//           </span>
//         </div>

//         {/* PROGRESS */}

//         {isInProgress && (
//           <div className="mt-4">
//             <div className="mb-1.5 flex items-center justify-between text-[10px] text-white/40">
//               <span>
//                 Progress
//               </span>

//               <span>
//                 {Math.min(
//                   100,
//                   Math.max(
//                     0,
//                     progress
//                   )
//                 )}
//                 %
//               </span>
//             </div>

//             <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
//               <div
//                 className="h-full rounded-full transition-all"
//                 style={{
//                   width: `${Math.min(
//                     100,
//                     Math.max(
//                       0,
//                       progress
//                     )
//                   )}%`,
//                   background:
//                     `linear-gradient(90deg, ${primaryColor}, ${accentColor})`,
//                 }}
//               />
//             </div>
//           </div>
//         )}

//         {/* BUTTON */}

//         <button
//           type="button"
//           onClick={onContinue}
//           className="mt-4 flex h-11 w-full items-center justify-center rounded-xl border text-sm font-bold transition hover:text-white"
//           style={{
//             borderColor:
//               `${primaryColor}80`,
//             color: primaryColor,
//           }}
//         >
//           {isInProgress
//             ? "Continue"
//             : "Start Course"}
//         </button>
//       </div>
//     </div>
//   );
// };

// /* =========================================================
//    EMPTY COURSES
// ========================================================= */

// const EmptyCourses = ({
//   primaryColor,
//   onBrowse,
// }) => {
//   return (
//     <div className="rounded-2xl border border-dashed border-white/[0.08] bg-white/[0.015] py-16 text-center">
//       <div
//         className="mb-5 flex justify-center text-4xl"
//         style={{
//           color:
//             `${primaryColor}55`,
//         }}
//       >
//         <FaBookOpen />
//       </div>

//       <p className="text-lg font-semibold text-white">
//         No courses yet
//       </p>

//       <p className="mx-auto mt-2 max-w-sm text-sm text-white/40">
//         Your enrolled courses will appear
//         here once you start learning.
//       </p>

//       {onBrowse && (
//         <button
//           type="button"
//           onClick={onBrowse}
//           className="mt-6 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
//           style={{
//             background:
//               primaryColor,
//           }}
//         >
//           Browse Classes
//         </button>
//       )}
//     </div>
//   );
// };

// export default WebsitePreviewDashboard;




import { useEffect, useMemo, useState } from "react";
import {
  useNavigate,
  useOutletContext,
} from "react-router-dom";
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
  FaGraduationCap,
  FaPlay,
} from "react-icons/fa";

import { auth } from "../../config/firebase";

/* =========================================================
   API
========================================================= */

const API =
  import.meta.env.VITE_API_URL ||
  "https://finearts-backend.onrender.com/api";

/* =========================================================
   STORAGE HELPERS
========================================================= */

const getStoredStudent = () => {
  try {
    const raw =
      localStorage.getItem("studentUser");

    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw);

    return parsed &&
      typeof parsed === "object"
      ? parsed
      : null;
  } catch (error) {
    console.error(
      "STUDENT STORAGE ERROR:",
      error
    );

    localStorage.removeItem(
      "studentUser"
    );

    return null;
  }
};

const getStudentToken = () => {
  const token =
    localStorage.getItem(
      "studentToken"
    );

  if (
    !token ||
    token === "null" ||
    token === "undefined"
  ) {
    return null;
  }

  return token;
};

/* =========================================================
   SAFE FIREBASE TOKEN
========================================================= */

const getSafeStudentToken = async (
  firebaseUser,
  forceRefresh = false
) => {
  /*
    Normal request:
    Use stored token first.

    This prevents unnecessary Firebase
    token requests and helps avoid
    auth/quota-exceeded.
  */

  if (!forceRefresh) {
    const storedToken =
      getStudentToken();

    if (storedToken) {
      console.log(
        "STUDENT TOKEN: USING STORED TOKEN"
      );

      return storedToken;
    }
  }

  if (!firebaseUser) {
    return null;
  }

  try {
    const token =
      await firebaseUser.getIdToken(
        forceRefresh
      );

    if (token) {
      localStorage.setItem(
        "studentToken",
        token
      );

      console.log(
        "STUDENT TOKEN: FIREBASE TOKEN AVAILABLE"
      );

      return token;
    }

    return null;
  } catch (error) {
    console.error(
      "STUDENT TOKEN ERROR:",
      error
    );

    /*
      If Firebase fails but an existing
      token exists, continue using it.
    */

    const fallbackToken =
      getStudentToken();

    if (fallbackToken) {
      console.warn(
        "STUDENT TOKEN: USING FALLBACK TOKEN"
      );

      return fallbackToken;
    }

    return null;
  }
};

/* =========================================================
   INSTITUTE ID
========================================================= */

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
    const value =
      localStorage.getItem(key);

    if (!value) {
      continue;
    }

    const id = Number(value);

    if (
      Number.isInteger(id) &&
      id > 0
    ) {
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

    if (
      Number.isInteger(id) &&
      id > 0
    ) {
      return id;
    }
  }

  try {
    const params =
      new URLSearchParams(
        window.location.search
      );

    const queryInstituteId =
      params.get("institute_id");

    const id =
      Number(queryInstituteId);

    if (
      Number.isInteger(id) &&
      id > 0
    ) {
      return id;
    }
  } catch (error) {
    console.warn(
      "INSTITUTE ID URL ERROR:",
      error
    );
  }

  return null;
};

/* =========================================================
   SAVE STUDENT
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

/* =========================================================
   NORMALIZE STUDENT
========================================================= */

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

/* =========================================================
   RESPONSE HELPERS
========================================================= */

const extractArray = (
  result,
  keys = []
) => {
  if (Array.isArray(result)) {
    return result;
  }

  for (const key of keys) {
    if (
      Array.isArray(
        result?.[key]
      )
    ) {
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

  if (
    Array.isArray(
      result?.data
    )
  ) {
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
    }
  );
};

const formatTime = value => {
  if (!value) {
    return "Time unavailable";
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

  return String(value);
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

  const [
    student,
    setStudent,
  ] = useState(() =>
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
    courses,
    setCourses,
  ] = useState([]);

  const [
    sessions,
    setSessions,
  ] = useState([]);

  const [
    bookings,
    setBookings,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    dataLoading,
    setDataLoading,
  ] = useState(false);

  const [
    mobileMenu,
    setMobileMenu,
  ] = useState(false);

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    error,
    setError,
  ] = useState("");

  /* =======================================================
     FIREBASE AUTH
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
                await getSafeStudentToken(
                  user
                );

              if (
                mounted &&
                freshToken
              ) {
                setToken(
                  freshToken
                );

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
     FETCH PROFILE
  ======================================================= */

  useEffect(() => {
    let mounted = true;

    const fetchStudentProfile =
      async firebaseUser => {
        if (!firebaseUser?.uid) {
          return;
        }

        const currentInstituteId =
          resolveInstituteId(
            context,
            getStoredStudent()
          );

        if (!currentInstituteId) {
          console.warn(
            "STUDENT PROFILE: Institute ID missing"
          );

          return;
        }

        try {
          const freshToken =
            await getSafeStudentToken(
              firebaseUser
            );

          if (!freshToken) {
            throw new Error(
              "Student authentication token is unavailable."
            );
          }

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

          if (mounted) {
            setStudent(
              normalized
            );

            setToken(
              freshToken
            );
          }
        } catch (profileError) {
          console.warn(
            "STUDENT PROFILE REFRESH:",
            profileError
          );
        }
      };

    if (firebaseUser) {
      fetchStudentProfile(
        firebaseUser
      );
    }

    return () => {
      mounted = false;
    };
  }, [
    firebaseUser,
    context,
  ]);

  /* =======================================================
     DASHBOARD API REQUEST
  ======================================================= */

  useEffect(() => {
    if (!token) {
      console.warn(
        "STUDENT DASHBOARD: No token available"
      );

      return;
    }

    let mounted = true;

    const requestJson =
      async (
        url,
        requestName
      ) => {
        try {
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
            `${requestName} STATUS:`,
            response.status
          );

          if (!response.ok) {
            throw new Error(
              result?.message ||
              result?.error ||
              `${requestName} failed with status ${response.status}`
            );
          }

          return result;
        } catch (error) {
          console.error(
            `${requestName} ERROR:`,
            error
          );

          throw error;
        }
      };

    const loadDashboard =
      async () => {
        setDataLoading(true);
        setError("");

        /* ================================================
           COURSES
        ================================================ */

        try {
          const result =
            await requestJson(
              `${API}/lms/courses`,
              "STUDENT COURSES"
            );

          if (mounted) {
            setCourses(
              extractArray(
                result,
                [
                  "courses",
                  "items",
                  "results",
                ]
              )
            );
          }
        } catch (error) {
          if (mounted) {
            setCourses([]);
          }
        }

        /* ================================================
           SESSIONS
        ================================================ */

        try {
          const result =
            await requestJson(
              `${API}/sessions/user/upcoming`,
              "STUDENT SESSIONS"
            );

          if (mounted) {
            setSessions(
              extractArray(
                result,
                [
                  "sessions",
                  "upcoming",
                  "items",
                ]
              )
            );
          }
        } catch (error) {
          if (mounted) {
            setSessions([]);
          }
        }

        /* ================================================
           BOOKINGS
        ================================================ */

        try {
          console.log(
            "=========================================="
          );

          console.log(
            "FETCHING STUDENT BOOKINGS"
          );

          console.log(
            "BOOKINGS URL:",
            `${API}/bookings/my`
          );

          console.log(
            "STUDENT TOKEN:",
            token
              ? "YES"
              : "NO"
          );

          console.log(
            "=========================================="
          );

          const result =
            await requestJson(
              `${API}/bookings/my`,
              "STUDENT BOOKINGS"
            );

          const bookingList =
            extractArray(
              result,
              [
                "bookings",
                "items",
                "results",
              ]
            );

          console.log(
            "STUDENT BOOKINGS COUNT:",
            bookingList.length
          );

          if (mounted) {
            setBookings(
              bookingList
            );
          }
        } catch (bookingError) {
          console.error(
            "STUDENT BOOKINGS ERROR:",
            bookingError
          );

          if (mounted) {
            setBookings([]);
          }
        }

        if (mounted) {
          setDataLoading(false);
        }
      };

    loadDashboard();

    return () => {
      mounted = false;
    };
  }, [token]);

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

  const totalPayments =
    useMemo(() => {
      return bookings
        .filter(booking => {
          const status =
            booking?.payment?.status ||
            booking?.payment_status ||
            booking?.status;

          return (
            String(
              status || ""
            ).toUpperCase() ===
            "PAID"
          );
        })
        .reduce(
          (
            sum,
            booking
          ) => {
            const amount =
              booking?.payment
                ?.amount ??
              booking?.amount ??
              booking?.price ??
              booking?.total_amount ??
              0;

            return (
              sum +
              Number(
                amount || 0
              )
            );
          },
          0
        );
    }, [bookings]);

  const filteredCourses =
    useMemo(() => {
      const value =
        search
          .trim()
          .toLowerCase();

      if (!value) {
        return courses.slice(
          0,
          4
        );
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
              course?.name || ""
            )
              .toLowerCase()
              .includes(value) ||

            String(
              course?.trainer_name ||
                ""
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
    }, [
      courses,
      search,
    ]);

  const upcomingSessions =
    useMemo(() => {
      return [...sessions]
        .sort((a, b) => {
          const aDate =
            new Date(
              a?.start_time ||
              a?.start_at ||
              a?.session_date ||
              a?.date ||
              0
            ).getTime();

          const bDate =
            new Date(
              b?.start_time ||
              b?.start_at ||
              b?.session_date ||
              b?.date ||
              0
            ).getTime();

          return (
            aDate -
            bDate
          );
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
     JOIN SESSION
  ======================================================= */

  const handleJoinSession =
    session => {
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
        "No meeting URL available:",
        session
      );
    };

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <div
        className="flex min-h-screen items-center justify-center text-white"
        style={{
          background:
            pageBackground,
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
        background:
          pageBackground,
      }}
    >
      {/* =================================================
          BACKGROUND GLOW
      ================================================= */}

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

      {/* =================================================
          MOBILE OVERLAY
      ================================================= */}

      {mobileMenu && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={() =>
            setMobileMenu(false)
          }
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

              <p className="text-[11px] text-white/50">
                Student LMS
              </p>
            </div>

            <button
              type="button"
              className="ml-auto text-white/60 lg:hidden"
              onClick={() =>
                setMobileMenu(
                  false
                )
              }
            >
              <FaTimes />
            </button>
          </div>
        </div>

        {/* NAVIGATION */}

        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <div className="space-y-1.5">
            {menuItems.map(
              item => {
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
                      group flex w-full
                      items-center gap-4
                      rounded-xl px-4 py-3.5
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
              }
            )}
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

      {/* =================================================
          MAIN
      ================================================= */}

      <div className="relative lg:pl-[270px]">
        {/* TOP BAR */}

        <header className="sticky top-0 z-30 h-[82px] border-b border-white/[0.07] bg-[#020914]/85 backdrop-blur-2xl">
          <div className="flex h-full items-center gap-4 px-4 sm:px-6 lg:px-8">
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-white lg:hidden"
              onClick={() =>
                setMobileMenu(true)
              }
            >
              <FaBars />
            </button>

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

            <div className="ml-auto flex items-center gap-3">
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

        {/* CONTENT */}

        <main className="mx-auto w-full max-w-[1500px] px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
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
                    color:
                      primaryColor,
                  }}
                >
                  View All
                </button>
              </div>

              {dataLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map(
                    item => (
                      <div
                        key={item}
                        className="h-[78px] animate-pulse rounded-xl bg-white/[0.04]"
                      />
                    )
                  )}
                </div>
              ) : upcomingSessions.length ===
                0 ? (
                <div className="flex min-h-[170px] flex-col items-center justify-center rounded-xl border border-dashed border-white/[0.08] text-center">
                  <FaVideo className="mb-3 text-2xl text-white/25" />

                  <p className="text-sm font-semibold text-white/70">
                    No upcoming sessions
                  </p>

                  <p className="mt-1 text-xs text-white/35">
                    Your upcoming live classes
                    will appear here.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {upcomingSessions.map(
                    (
                      session,
                      index
                    ) => (
                      <LiveSessionCard
                        key={
                          session?.id ||
                          session?.session_id ||
                          index
                        }
                        session={
                          session
                        }
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
              primaryColor={
                primaryColor
              }
              accentColor={
                accentColor
              }
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
              primaryColor={
                accentColor
              }
              accentColor={
                primaryColor
              }
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
              primaryColor={
                primaryColor
              }
              accentColor={
                accentColor
              }
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
              primaryColor={
                accentColor
              }
              accentColor={
                primaryColor
              }
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
              primaryColor={
                primaryColor
              }
              accentColor={
                accentColor
              }
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
              primaryColor={
                accentColor
              }
              accentColor={
                primaryColor
              }
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
              primaryColor={
                primaryColor
              }
              accentColor={
                accentColor
              }
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
              primaryColor={
                accentColor
              }
              accentColor={
                primaryColor
              }
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
                  color:
                    primaryColor,
                }}
              >
                View All Courses
                <FaArrowRight className="text-xs" />
              </button>
            </div>

            {dataLoading ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                {[1, 2, 3, 4].map(
                  item => (
                    <div
                      key={item}
                      className="h-[280px] animate-pulse rounded-2xl bg-white/[0.04]"
                    />
                  )
                )}
              </div>
            ) : filteredCourses.length ===
              0 ? (
              <EmptyCourses
                primaryColor={
                  primaryColor
                }
                onBrowse={() =>
                  go(
                    "/institute/website/preview/classes"
                  )
                }
              />
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                {filteredCourses.map(
                  (
                    course,
                    index
                  ) => (
                    <CourseCard
                      key={
                        course?.id ||
                        course?.class_id ||
                        index
                      }
                      course={
                        course
                      }
                      primaryColor={
                        primaryColor
                      }
                      accentColor={
                        accentColor
                      }
                      onContinue={() =>
                        go(
                          `/institute/website/preview/my-learning/${
                            course?.id ||
                            course?.class_id
                          }`
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
            {formatDate(
              dateValue
            )}
          </span>

          <span>•</span>

          <FaClock />

          <span>
            {formatTime(
              timeValue
            )}
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
    course?.thumbnail ||
    course?.cover_image;

  const level =
    course?.level ||
    "Beginner";

  const totalLessons =
    Number(
      course?.totalLessons ??
      course?.total_lessons ??
      course?.lesson_count ??
      course?.lessons ??
      0
    ) || 0;

  const progress =
    Number(
      course?.progress ??
      course?.progress_percentage ??
      course?.completion_percentage ??
      0
    ) || 0;

  const status =
    course?.status ||
    course?.learning_status ||
    (progress > 0
      ? "In Progress"
      : "Start Course");

  const isInProgress =
    progress > 0 ||
    String(status)
      .toLowerCase()
      .includes("progress");

  return (
    <div className="group overflow-hidden rounded-2xl border border-white/[0.08] bg-[#041020]/80 transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.14] hover:shadow-2xl">
      {/* IMAGE */}

      <div className="relative h-[165px] overflow-hidden">
        <img
          src={getImage(
            image,
            title
          )}
          alt={title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          onError={event => {
            event.currentTarget.src =
              getImage(
                null,
                title
              );
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#041020] via-transparent to-transparent" />

        {/* STATUS */}

        <div
          className="absolute right-3 top-3 rounded-full px-3 py-1 text-[11px] font-bold text-white backdrop-blur-md"
          style={{
            background:
              isInProgress
                ? `${primaryColor}DD`
                : `${accentColor}DD`,
          }}
        >
          {isInProgress
            ? "In Progress"
            : level}
        </div>

        {/* PLAY */}

        <div
          className="absolute bottom-3 left-3 flex h-9 w-9 items-center justify-center rounded-full text-white opacity-0 shadow-lg transition group-hover:opacity-100"
          style={{
            background:
              `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
          }}
        >
          <FaPlay className="ml-0.5 text-xs" />
        </div>
      </div>

      {/* CONTENT */}

      <div className="p-4">
        <h3 className="min-h-[48px] text-base font-bold leading-6 text-white">
          {title}
        </h3>

        <div className="mt-3 flex items-center gap-4 text-xs text-white/50">
          <span className="flex items-center gap-1.5">
            <FaCalendarAlt />
            {totalLessons} Lessons
          </span>

          <span className="flex items-center gap-1.5">
            <FaUser />
            {level}
          </span>
        </div>

        {/* PROGRESS */}

        {isInProgress && (
          <div className="mt-4">
            <div className="mb-1.5 flex items-center justify-between text-[10px] text-white/40">
              <span>
                Progress
              </span>

              <span>
                {Math.min(
                  100,
                  Math.max(
                    0,
                    progress
                  )
                )}
                %
              </span>
            </div>

            <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width:
                    `${Math.min(
                      100,
                      Math.max(
                        0,
                        progress
                      )
                    )}%`,

                  background:
                    `linear-gradient(90deg, ${primaryColor}, ${accentColor})`,
                }}
              />
            </div>
          </div>
        )}

        {/* BUTTON */}

        <button
          type="button"
          onClick={onContinue}
          className="mt-4 flex h-11 w-full items-center justify-center rounded-xl border text-sm font-bold transition hover:text-white"
          style={{
            borderColor:
              `${primaryColor}80`,

            color:
              primaryColor,
          }}
        >
          {isInProgress
            ? "Continue"
            : "Start Course"}
        </button>
      </div>
    </div>
  );
};

/* =========================================================
   EMPTY COURSES
========================================================= */

const EmptyCourses = ({
  primaryColor,
  onBrowse,
}) => {
  return (
    <div className="rounded-2xl border border-dashed border-white/[0.08] bg-white/[0.015] py-16 text-center">
      <div
        className="mb-5 flex justify-center text-4xl"
        style={{
          color:
            `${primaryColor}55`,
        }}
      >
        <FaBookOpen />
      </div>

      <p className="text-lg font-semibold text-white">
        No courses yet
      </p>

      <p className="mx-auto mt-2 max-w-sm text-sm text-white/40">
        Your enrolled courses will appear
        here once you start learning.
      </p>

      {onBrowse && (
        <button
          type="button"
          onClick={onBrowse}
          className="mt-6 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
          style={{
            background:
              primaryColor,
          }}
        >
          Browse Classes
        </button>
      )}
    </div>
  );
};

export default WebsitePreviewDashboard;