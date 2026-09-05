// import React, {
//   useEffect,
//   useMemo,
//   useState,
// } from "react";

// import {
//   Link,
//   useNavigate,
//   useParams,
// } from "react-router-dom";

// import {
//   FaArrowLeft,
//   FaArrowRight,
//   FaCalendarAlt,
//   FaCalendarWeek,
//   FaCheck,
//   FaChevronDown,
//   FaChevronUp,
//   FaClock,
//   FaGlobe,
//   FaHourglassHalf,
//   FaUsers,
// } from "react-icons/fa";

// import { getClassById } from "../../services/classes.js";
// import { getClassSessions } from "../../services/session.service";

// import WebsiteBooking from "./WebsiteBooking";


// /* =========================================================
//    HELPERS
// ========================================================= */

// const getValue = (...values) => {
//   for (const value of values) {
//     if (
//       value !== undefined &&
//       value !== null &&
//       value !== ""
//     ) {
//       return value;
//     }
//   }

//   return null;
// };


// const getClassTitle = (data) =>
//   getValue(
//     data?.title,
//     data?.class_title,
//     data?.className,
//     data?.name,
//     "Class"
//   );


// const getClassDescription = (data) =>
//   getValue(
//     data?.description,
//     data?.class_description,
//     data?.about,
//     data?.overview,
//     "No description available."
//   );


// const getClassImage = (data) =>
//   getValue(
//     data?.image,
//     data?.image_url,
//     data?.class_image,
//     data?.class_image_url,
//     data?.thumbnail,
//     data?.thumbnail_url,
//     data?.banner_image,
//     ""
//   );


// const getTrainerName = (data) =>
//   getValue(
//     data?.trainer_name,
//     data?.trainerName,
//     data?.trainer?.full_name,
//     data?.trainer?.name,
//     "Trainer"
//   );


// const getTrainerImage = (data) =>
//   getValue(
//     data?.trainer_image,
//     data?.trainerImage,
//     data?.trainer?.profile_image,
//     data?.trainer?.image,
//     data?.trainer?.image_url,
//     ""
//   );


// const getInstituteName = (data) =>
//   getValue(
//     data?.institute_name,
//     data?.instituteName,
//     data?.institute?.name,
//     "Institute"
//   );


// const getLevel = (data) =>
//   getValue(
//     data?.level,
//     data?.class_level,
//     data?.difficulty,
//     "All Levels"
//   );


// const getDuration = (data) =>
//   getValue(
//     data?.duration,
//     data?.class_duration,
//     data?.duration_minutes,
//     "--"
//   );


// const getPrice = (data) =>
//   Number(
//     getValue(
//       data?.price,
//       data?.class_price,
//       data?.monthly_price,
//       0
//     )
//   );


// const getRating = (data) =>
//   Number(
//     getValue(
//       data?.rating,
//       data?.trainer_rating,
//       0
//     )
//   );


// const getStudents = (data) =>
//   Number(
//     getValue(
//       data?.students,
//       data?.students_count,
//       data?.total_students,
//       0
//     )
//   );


// const getAvailableDays = (data) => {
//   const days = getValue(
//     data?.available_days,
//     data?.days,
//     data?.schedule_days
//   );

//   if (Array.isArray(days)) {
//     return days;
//   }

//   if (typeof days === "string") {
//     return days
//       .split(",")
//       .map((item) => item.trim())
//       .filter(Boolean);
//   }

//   return [];
// };


// const formatDate = (value) => {
//   if (!value) return "--";

//   const date = new Date(value);

//   if (Number.isNaN(date.getTime())) {
//     return String(value);
//   }

//   return date.toLocaleDateString(
//     "en-IN",
//     {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     }
//   );
// };


// const formatTime = (value) => {
//   if (!value) return "--";

//   const text = String(value);

//   if (
//     text.toLowerCase().includes("am") ||
//     text.toLowerCase().includes("pm")
//   ) {
//     return text;
//   }

//   const parts = text.split(":");

//   if (parts.length < 2) {
//     return text;
//   }

//   const hours = Number(parts[0]);
//   const minutes = Number(parts[1]);

//   if (
//     Number.isNaN(hours) ||
//     Number.isNaN(minutes)
//   ) {
//     return text;
//   }

//   const period =
//     hours >= 12 ? "PM" : "AM";

//   const hour =
//     hours % 12 || 12;

//   return `${hour}:${String(minutes).padStart(
//     2,
//     "0"
//   )} ${period}`;
// };


// const getTimezone = (data) =>
//   getValue(
//     data?.timezone,
//     data?.class_timezone,
//     data?.time_zone,
//     "Asia/Kolkata"
//   );


// const getCategoryName = (data) =>
//   getValue(
//     data?.category_name,
//     data?.category?.name,
//     data?.categoryName,
//     "General"
//   );


// const getSubcategoryName = (data) =>
//   getValue(
//     data?.subcategory_name,
//     data?.subcategory?.name,
//     data?.subcategoryName,
//     ""
//   );


// /* =========================================================
//    STAR RATING
// ========================================================= */

// const StarRating = ({
//   rating = 0,
// }) => {
//   const value = Math.max(
//     0,
//     Math.min(5, Number(rating) || 0)
//   );

//   return (
//     <div className="flex items-center gap-1">
//       <div className="text-sm tracking-[2px]">
//         {[1, 2, 3, 4, 5].map(
//           (star) => (
//             <span
//               key={star}
//               className={
//                 star <= Math.round(value)
//                   ? "text-[#F4B16A]"
//                   : "text-gray-300"
//               }
//             >
//               ★
//             </span>
//           )
//         )}
//       </div>

//       <span className="ml-1 text-sm font-semibold text-gray-600">
//         {value.toFixed(1)}
//       </span>
//     </div>
//   );
// };


// /* =========================================================
//    INFO ITEM
// ========================================================= */

// const InfoItem = ({
//   icon: Icon,
//   label,
//   value,
// }) => {
//   return (
//     <div className="flex items-start gap-3">

//       <div
//         className="
//           mt-0.5
//           flex
//           h-9
//           w-9
//           shrink-0
//           items-center
//           justify-center
//           rounded-lg
//           bg-[#F3EEFF]
//           text-[#5426B8]
//         "
//       >
//         <Icon size={15} />
//       </div>

//       <div className="min-w-0">

//         <p className="text-xs text-gray-500">
//           {label}
//         </p>

//         <p className="mt-0.5 break-words text-sm font-semibold text-gray-900">
//           {value || "--"}
//         </p>

//       </div>

//     </div>
//   );
// };


// /* =========================================================
//    SESSION ITEM
// ========================================================= */

// const SessionItem = ({
//   session,
// }) => {
//   const sessionDate =
//     getValue(
//       session?.session_date,
//       session?.date,
//       session?.start_date
//     );

//   const startTime =
//     getValue(
//       session?.start_time,
//       session?.startTime
//     );

//   const endTime =
//     getValue(
//       session?.end_time,
//       session?.endTime
//     );

//   const timezone =
//     getValue(
//       session?.timezone,
//       session?.time_zone,
//       "Asia/Kolkata"
//     );

//   return (
//     <div
//       className="
//         rounded-xl
//         border
//         border-gray-200
//         bg-white
//         p-4
//         transition
//         hover:border-[#5426B8]/30
//         hover:shadow-sm
//       "
//     >

//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

//         <div className="flex items-start gap-3">

//           <div
//             className="
//               flex
//               h-11
//               w-11
//               shrink-0
//               items-center
//               justify-center
//               rounded-lg
//               bg-[#F3EEFF]
//               text-[#5426B8]
//             "
//           >
//             <FaCalendarAlt />
//           </div>

//           <div>

//             <p className="text-sm font-bold text-gray-900">
//               {formatDate(sessionDate)}
//             </p>

//             <p className="mt-1 text-xs text-gray-500">
//               {startTime
//                 ? formatTime(startTime)
//                 : "--"}

//               {endTime
//                 ? ` - ${formatTime(endTime)}`
//                 : ""}

//             </p>

//           </div>

//         </div>

//         <div
//           className="
//             flex
//             items-center
//             gap-2
//             text-xs
//             text-gray-500
//           "
//         >
//           <FaGlobe className="text-[#5426B8]" />
//           {timezone}
//         </div>

//       </div>

//     </div>
//   );
// };


// /* =========================================================
//    MAIN COMPONENT
// ========================================================= */

// const WebsiteClassDetail = () => {

//   const {
//     classId,
//   } = useParams();

//   const navigate =
//     useNavigate();


//   /* =======================================================
//      STATE
//   ======================================================= */

//   const [
//     classData,
//     setClassData,
//   ] = useState(null);

//   const [
//     sessions,
//     setSessions,
//   ] = useState([]);

//   const [
//     loading,
//     setLoading,
//   ] = useState(true);

//   const [
//     sessionsLoading,
//     setSessionsLoading,
//   ] = useState(false);

//   const [
//     error,
//     setError,
//   ] = useState("");

//   const [
//     sessionError,
//     setSessionError,
//   ] = useState("");

//   const [
//     showAllSessions,
//     setShowAllSessions,
//   ] = useState(false);

//   const [
//     showBooking,
//     setShowBooking,
//   ] = useState(false);


//   /* =======================================================
//      DEBUG
//   ======================================================= */

//   useEffect(() => {
//     console.log(
//       "================================"
//     );

//     console.log(
//       "WEBSITE CLASS DETAIL"
//     );

//     console.log(
//       "classId:",
//       classId
//     );

//     console.log(
//       "================================"
//     );
//   }, [classId]);


//   /* =======================================================
//      FETCH CLASS
//   ======================================================= */

//   useEffect(() => {

//     let mounted = true;

//     const fetchClass = async () => {

//       if (!classId) {

//         if (mounted) {
//           setError(
//             "Class ID is missing."
//           );

//           setLoading(false);
//         }

//         return;
//       }

//       try {

//         setLoading(true);
//         setError("");

//         console.log(
//           "Fetching class:",
//           classId
//         );

//         const response =
//           await getClassById(
//             classId
//           );

//         console.log(
//           "GET CLASS BY ID RESPONSE:",
//           response
//         );

//         /*
//           Supports all common response structures:

//           response.data
//           response.data.data
//           response.data.class
//           response.class
//           response
//         */

//         let data =
//           response?.data?.data ??
//           response?.data?.class ??
//           response?.data ??
//           response?.class ??
//           response;

//         /*
//           Sometimes APIs return:

//           {
//             success: true,
//             data: {
//               ...
//             }
//           }
//         */

//         if (
//           data?.data &&
//           typeof data.data === "object"
//         ) {
//           data = data.data;
//         }

//         console.log(
//           "FINAL CLASS DATA:",
//           data
//         );

//         if (
//           !data ||
//           typeof data !== "object"
//         ) {
//           throw new Error(
//             "Class data was not returned by the server."
//           );
//         }

//         if (mounted) {
//           setClassData(data);
//         }

//       } catch (err) {

//         console.error(
//           "CLASS DETAIL ERROR:",
//           err
//         );

//         const message =
//           err?.response?.data?.message ||
//           err?.response?.data?.error ||
//           err?.message ||
//           "Failed to load class details.";

//         if (mounted) {
//           setError(message);
//         }

//       } finally {

//         if (mounted) {
//           setLoading(false);
//         }

//       }
//     };

//     fetchClass();

//     return () => {
//       mounted = false;
//     };

//   }, [classId]);


//   /* =======================================================
//      FETCH SESSIONS
//   ======================================================= */

//   useEffect(() => {

//     let mounted = true;

//     const fetchSessions = async () => {

//       if (!classId) {
//         return;
//       }

//       try {

//         setSessionsLoading(true);
//         setSessionError("");

//         console.log(
//           "Fetching sessions for class:",
//           classId
//         );

//         const response =
//           await getClassSessions(
//             classId
//           );

//         console.log(
//           "CLASS SESSIONS RESPONSE:",
//           response
//         );

//         let data =
//           response?.data?.data ??
//           response?.data?.sessions ??
//           response?.data ??
//           response?.sessions ??
//           response;

//         if (
//           !Array.isArray(data)
//         ) {
//           data = [];
//         }

//         if (mounted) {
//           setSessions(data);
//         }

//       } catch (err) {

//         console.error(
//           "SESSION FETCH ERROR:",
//           err
//         );

//         if (mounted) {

//           setSessions([]);

//           setSessionError(
//             err?.response?.data?.message ||
//             err?.message ||
//             "Unable to load sessions."
//           );
//         }

//       } finally {

//         if (mounted) {
//           setSessionsLoading(false);
//         }

//       }
//     };

//     fetchSessions();

//     return () => {
//       mounted = false;
//     };

//   }, [classId]);


//   /* =======================================================
//      DERIVED DATA
//   ======================================================= */

//   const title =
//     useMemo(
//       () =>
//         getClassTitle(
//           classData
//         ),
//       [classData]
//     );


//   const description =
//     useMemo(
//       () =>
//         getClassDescription(
//           classData
//         ),
//       [classData]
//     );


//   const image =
//     useMemo(
//       () =>
//         getClassImage(
//           classData
//         ),
//       [classData]
//     );


//   const trainerName =
//     useMemo(
//       () =>
//         getTrainerName(
//           classData
//         ),
//       [classData]
//     );


//   const trainerImage =
//     useMemo(
//       () =>
//         getTrainerImage(
//           classData
//         ),
//       [classData]
//     );


//   const instituteName =
//     useMemo(
//       () =>
//         getInstituteName(
//           classData
//         ),
//       [classData]
//     );


//   const categoryName =
//     useMemo(
//       () =>
//         getCategoryName(
//           classData
//         ),
//       [classData]
//     );


//   const subcategoryName =
//     useMemo(
//       () =>
//         getSubcategoryName(
//           classData
//         ),
//       [classData]
//     );


//   const level =
//     useMemo(
//       () =>
//         getLevel(
//           classData
//         ),
//       [classData]
//     );


//   const duration =
//     useMemo(
//       () =>
//         getDuration(
//           classData
//         ),
//       [classData]
//     );


//   const rating =
//     useMemo(
//       () =>
//         getRating(
//           classData
//         ),
//       [classData]
//     );


//   const students =
//     useMemo(
//       () =>
//         getStudents(
//           classData
//         ),
//       [classData]
//     );


//   const price =
//     useMemo(
//       () =>
//         getPrice(
//           classData
//         ),
//       [classData]
//     );


//   const availableDays =
//     useMemo(
//       () =>
//         getAvailableDays(
//           classData
//         ),
//       [classData]
//     );


//   const startDate =
//     getValue(
//       classData?.start_date,
//       classData?.startDate
//     );


//   const startTime =
//     getValue(
//       classData?.start_time,
//       classData?.startTime
//     );


//   const timezone =
//     getTimezone(
//       classData
//     );


//   const visibleSessions =
//     showAllSessions
//       ? sessions
//       : sessions.slice(0, 5);


//   /* =======================================================
//      LOADING
//   ======================================================= */

//   if (loading) {

//     return (
//       <div
//         className="
//           flex
//           min-h-[550px]
//           items-center
//           justify-center
//           bg-white
//         "
//       >

//         <div className="text-center">

//           <div
//             className="
//               mx-auto
//               mb-5
//               h-12
//               w-12
//               animate-spin
//               rounded-full
//               border-4
//               border-[#5426B8]/20
//               border-t-[#5426B8]
//             "
//           />

//           <p className="text-gray-600">
//             Loading class details...
//           </p>

//         </div>

//       </div>
//     );
//   }


//   /* =======================================================
//      ERROR
//   ======================================================= */

//   if (error) {

//     return (
//       <div
//         className="
//           flex
//           min-h-[550px]
//           items-center
//           justify-center
//           bg-white
//           px-6
//         "
//       >

//         <div className="max-w-lg text-center">

//           <div
//             className="
//               mx-auto
//               flex
//               h-16
//               w-16
//               items-center
//               justify-center
//               rounded-full
//               bg-red-50
//               text-2xl
//               text-red-500
//             "
//           >
//             !
//           </div>

//           <h1
//             className="
//               mt-5
//               text-2xl
//               font-bold
//               text-gray-900
//             "
//           >
//             Unable to Load Class
//           </h1>

//           <p
//             className="
//               mt-3
//               text-sm
//               leading-6
//               text-gray-500
//             "
//           >
//             {error}
//           </p>

//           <p
//             className="
//               mt-2
//               text-xs
//               text-gray-400
//             "
//           >
//             Class ID: {classId}
//           </p>

//           <button
//             type="button"
//             onClick={() =>
//               navigate(
//                 "/institute/website/preview/classes"
//               )
//             }
//             className="
//               mt-6
//               inline-flex
//               items-center
//               gap-2
//               rounded-lg
//               bg-[#5426B8]
//               px-6
//               py-3
//               text-sm
//               font-semibold
//               text-white
//               transition
//               hover:bg-[#45209D]
//             "
//           >
//             <FaArrowLeft />
//             Back To Classes
//           </button>

//         </div>

//       </div>
//     );
//   }


//   /* =======================================================
//      NOT FOUND
//   ======================================================= */

//   if (!classData) {

//     return (
//       <div
//         className="
//           flex
//           min-h-[550px]
//           items-center
//           justify-center
//           bg-white
//         "
//       >

//         <div className="text-center">

//           <h1
//             className="
//               text-3xl
//               font-bold
//               text-gray-900
//             "
//           >
//             Class Not Found
//           </h1>

//           <button
//             type="button"
//             onClick={() =>
//               navigate(
//                 "/institute/website/preview/classes"
//               )
//             }
//             className="
//               mt-6
//               rounded-lg
//               bg-[#5426B8]
//               px-6
//               py-3
//               font-semibold
//               text-white
//             "
//           >
//             Back To Classes
//           </button>

//         </div>

//       </div>
//     );
//   }


//   /* =======================================================
//      MAIN UI
//   ======================================================= */

//   return (
//     <div
//       className="
//         min-h-screen
//         bg-[#F7F5FF]
//         text-gray-900
//       "
//     >

//       {/* ===================================================
//           TOP IMAGE / HERO
//       =================================================== */}

//       <section className="bg-white">

//         <div
//           className="
//             mx-auto
//             max-w-7xl
//             px-4
//             py-6
//             sm:px-6
//             lg:px-8
//           "
//         >

//           {/* Back */}

//           <button
//             type="button"
//             onClick={() =>
//               navigate(
//                 "/institute/website/preview/classes"
//               )
//             }
//             className="
//               mb-5
//               inline-flex
//               items-center
//               gap-2
//               text-sm
//               font-semibold
//               text-[#5426B8]
//               transition
//               hover:text-[#45209D]
//             "
//           >
//             <FaArrowLeft />
//             Back To Classes
//           </button>


//           <div
//             className="
//               overflow-hidden
//               rounded-2xl
//               border
//               border-gray-200
//               bg-white
//               shadow-sm
//             "
//           >

//             <div
//               className="
//                 relative
//                 aspect-[16/7]
//                 min-h-[260px]
//                 overflow-hidden
//                 bg-[#27115C]
//               "
//             >

//               {image ? (

//                 <img
//                   src={image}
//                   alt={title}
//                   className="
//                     h-full
//                     w-full
//                     object-cover
//                   "
//                 />

//               ) : (

//                 <div
//                   className="
//                     flex
//                     h-full
//                     w-full
//                     items-center
//                     justify-center
//                     text-white/60
//                   "
//                 >
//                   No Class Image
//                 </div>

//               )}

//               <div
//                 className="
//                   absolute
//                   inset-0
//                   bg-gradient-to-t
//                   from-black/75
//                   via-black/20
//                   to-transparent
//                 "
//               />


//               <div
//                 className="
//                   absolute
//                   bottom-6
//                   left-5
//                   right-5
//                   sm:left-8
//                   sm:right-8
//                 "
//               >

//                 <div
//                   className="
//                     mb-3
//                     flex
//                     flex-wrap
//                     gap-2
//                   "
//                 >

//                   <span
//                     className="
//                       rounded-full
//                       bg-[#5426B8]
//                       px-3
//                       py-1
//                       text-xs
//                       font-semibold
//                       text-white
//                     "
//                   >
//                     {categoryName}
//                   </span>

//                   {subcategoryName && (
//                     <span
//                       className="
//                         rounded-full
//                         bg-white/90
//                         px-3
//                         py-1
//                         text-xs
//                         font-semibold
//                         text-[#5426B8]
//                       "
//                     >
//                       {subcategoryName}
//                     </span>
//                   )}

//                   <span
//                     className="
//                       rounded-full
//                       bg-black/60
//                       px-3
//                       py-1
//                       text-xs
//                       font-semibold
//                       text-white
//                     "
//                   >
//                     {level}
//                   </span>

//                 </div>


//                 <h1
//                   className="
//                     max-w-4xl
//                     text-3xl
//                     font-extrabold
//                     text-white
//                     sm:text-4xl
//                     lg:text-5xl
//                   "
//                 >
//                   {title}
//                 </h1>

//               </div>

//             </div>

//           </div>

//         </div>

//       </section>


//       {/* ===================================================
//           MAIN CONTENT
//       =================================================== */}

//       <section
//         className="
//           mx-auto
//           max-w-7xl
//           px-4
//           py-8
//           sm:px-6
//           lg:px-8
//         "
//       >

//         <div
//           className="
//             grid
//             grid-cols-1
//             gap-8
//             lg:grid-cols-[1fr_360px]
//           "
//         >

//           {/* =================================================
//               LEFT
//           ================================================= */}

//           <div className="space-y-8">

//             {/* ABOUT */}

//             <div
//               className="
//                 rounded-2xl
//                 border
//                 border-gray-200
//                 bg-white
//                 p-6
//                 shadow-sm
//                 sm:p-8
//               "
//             >

//               <h2
//                 className="
//                   text-2xl
//                   font-extrabold
//                   text-gray-900
//                 "
//               >
//                 About This Class
//               </h2>

//               <div
//                 className="
//                   mt-5
//                   whitespace-pre-line
//                   text-sm
//                   leading-7
//                   text-gray-600
//                 "
//               >
//                 {description}
//               </div>

//             </div>


//             {/* CLASS INFORMATION */}

//             <div
//               className="
//                 rounded-2xl
//                 border
//                 border-gray-200
//                 bg-white
//                 p-6
//                 shadow-sm
//                 sm:p-8
//               "
//             >

//               <h2
//                 className="
//                   text-2xl
//                   font-extrabold
//                   text-gray-900
//                 "
//               >
//                 Class Information
//               </h2>


//               <div
//                 className="
//                   mt-6
//                   grid
//                   grid-cols-1
//                   gap-5
//                   sm:grid-cols-2
//                 "
//               >

//                 <InfoItem
//                   icon={FaHourglassHalf}
//                   label="Level"
//                   value={level}
//                 />

//                 <InfoItem
//                   icon={FaClock}
//                   label="Duration"
//                   value={duration}
//                 />

//                 <InfoItem
//                   icon={FaUsers}
//                   label="Students"
//                   value={students}
//                 />

//                 <InfoItem
//                   icon={FaGlobe}
//                   label="Timezone"
//                   value={timezone}
//                 />

//               </div>

//             </div>


//             {/* SCHEDULE */}

//             <div
//               className="
//                 rounded-2xl
//                 border
//                 border-gray-200
//                 bg-white
//                 p-6
//                 shadow-sm
//                 sm:p-8
//               "
//             >

//               <h2
//                 className="
//                   text-2xl
//                   font-extrabold
//                   text-gray-900
//                 "
//               >
//                 Schedule
//               </h2>


//               <div
//                 className="
//                   mt-6
//                   grid
//                   grid-cols-1
//                   gap-4
//                   sm:grid-cols-2
//                 "
//               >

//                 <InfoItem
//                   icon={FaCalendarWeek}
//                   label="Available Days"
//                   value={
//                     availableDays.length
//                       ? availableDays
//                           .map(
//                             (day) =>
//                               String(day)
//                                 .substring(
//                                   0,
//                                   3
//                                 )
//                           )
//                           .join(" • ")
//                       : "--"
//                   }
//                 />


//                 <InfoItem
//                   icon={FaCalendarAlt}
//                   label="Start Date"
//                   value={formatDate(
//                     startDate
//                   )}
//                 />


//                 <InfoItem
//                   icon={FaClock}
//                   label="Start Time"
//                   value={
//                     startTime
//                       ? `${formatTime(
//                           startTime
//                         )} ${timezone}`
//                       : "--"
//                   }
//                 />

//               </div>

//             </div>


//             {/* =================================================
//                 SESSIONS
//             ================================================= */}

//             <div
//               className="
//                 rounded-2xl
//                 border
//                 border-gray-200
//                 bg-white
//                 p-6
//                 shadow-sm
//                 sm:p-8
//               "
//             >

//               <div
//                 className="
//                   flex
//                   flex-col
//                   gap-2
//                   sm:flex-row
//                   sm:items-center
//                   sm:justify-between
//                 "
//               >

//                 <div>

//                   <h2
//                     className="
//                       text-2xl
//                       font-extrabold
//                       text-gray-900
//                     "
//                   >
//                     Upcoming Sessions
//                   </h2>

//                   <p
//                     className="
//                       mt-1
//                       text-sm
//                       text-gray-500
//                     "
//                   >
//                     Scheduled sessions for this class
//                   </p>

//                 </div>

//                 {sessions.length > 0 && (
//                   <span
//                     className="
//                       w-fit
//                       rounded-full
//                       bg-[#F3EEFF]
//                       px-3
//                       py-1
//                       text-xs
//                       font-bold
//                       text-[#5426B8]
//                     "
//                   >
//                     {sessions.length} Sessions
//                   </span>
//                 )}

//               </div>


//               {sessionsLoading ? (

//                 <div
//                   className="
//                     flex
//                     items-center
//                     justify-center
//                     py-12
//                   "
//                 >

//                   <div
//                     className="
//                       h-8
//                       w-8
//                       animate-spin
//                       rounded-full
//                       border-4
//                       border-[#5426B8]/20
//                       border-t-[#5426B8]
//                     "
//                   />

//                 </div>

//               ) : sessionError ? (

//                 <div
//                   className="
//                     mt-6
//                     rounded-xl
//                     bg-gray-50
//                     p-5
//                     text-center
//                     text-sm
//                     text-gray-500
//                   "
//                 >
//                   {sessionError}
//                 </div>

//               ) : sessions.length === 0 ? (

//                 <div
//                   className="
//                     mt-6
//                     rounded-xl
//                     border
//                     border-dashed
//                     border-gray-200
//                     p-8
//                     text-center
//                     text-sm
//                     text-gray-500
//                   "
//                 >
//                   No upcoming sessions available.
//                 </div>

//               ) : (

//                 <div className="mt-6 space-y-3">

//                   {visibleSessions.map(
//                     (session, index) => (
//                       <SessionItem
//                         key={
//                           session?.id ||
//                           session?.session_id ||
//                           index
//                         }
//                         session={session}
//                       />
//                     )
//                   )}

//                   {sessions.length > 5 && (
//                     <button
//                       type="button"
//                       onClick={() =>
//                         setShowAllSessions(
//                           (value) =>
//                             !value
//                         )
//                       }
//                       className="
//                         mx-auto
//                         mt-4
//                         flex
//                         items-center
//                         gap-2
//                         text-sm
//                         font-semibold
//                         text-[#5426B8]
//                       "
//                     >

//                       {showAllSessions
//                         ? "Show Less"
//                         : "View All Sessions"}

//                       {showAllSessions ? (
//                         <FaChevronUp />
//                       ) : (
//                         <FaChevronDown />
//                       )}

//                     </button>
//                   )}

//                 </div>

//               )}

//             </div>


//             {/* =================================================
//                 WHAT YOU WILL LEARN
//             ================================================= */}

//             {Array.isArray(
//               classData?.skills
//             ) &&
//               classData.skills.length > 0 && (

//                 <div
//                   className="
//                     rounded-2xl
//                     border
//                     border-gray-200
//                     bg-white
//                     p-6
//                     shadow-sm
//                     sm:p-8
//                   "
//                 >

//                   <h2
//                     className="
//                       text-2xl
//                       font-extrabold
//                       text-gray-900
//                     "
//                   >
//                     What You Will Learn
//                   </h2>

//                   <div
//                     className="
//                       mt-6
//                       grid
//                       grid-cols-1
//                       gap-4
//                       sm:grid-cols-2
//                     "
//                   >

//                     {classData.skills.map(
//                       (skill, index) => (

//                         <div
//                           key={index}
//                           className="
//                             flex
//                             items-start
//                             gap-3
//                           "
//                         >

//                           <div
//                             className="
//                               mt-0.5
//                               flex
//                               h-6
//                               w-6
//                               shrink-0
//                               items-center
//                               justify-center
//                               rounded-full
//                               bg-[#F3EEFF]
//                               text-[#5426B8]
//                             "
//                           >
//                             <FaCheck
//                               size={11}
//                             />
//                           </div>

//                           <span
//                             className="
//                               text-sm
//                               leading-6
//                               text-gray-700
//                             "
//                           >
//                             {typeof skill ===
//                             "string"
//                               ? skill
//                               : skill?.name ||
//                                 skill?.title ||
//                                 "Skill"}
//                           </span>

//                         </div>

//                       )
//                     )}

//                   </div>

//                 </div>
//               )}

//           </div>


//           {/* =================================================
//               RIGHT SIDEBAR
//           ================================================= */}

//           <aside
//             className="
//               h-fit
//               lg:sticky
//               lg:top-6
//             "
//           >

//             <div
//               className="
//                 overflow-hidden
//                 rounded-2xl
//                 border
//                 border-gray-200
//                 bg-white
//                 shadow-sm
//               "
//             >

//               {/* PRICE */}

//               <div
//                 className="
//                   border-b
//                   border-gray-100
//                   bg-[#F7F5FF]
//                   p-6
//                 "
//               >

//                 <p
//                   className="
//                     text-xs
//                     font-semibold
//                     uppercase
//                     tracking-wider
//                     text-gray-500
//                   "
//                 >
//                   Course Fee
//                 </p>

//                 <div className="mt-2">

//                   <span
//                     className="
//                       text-3xl
//                       font-extrabold
//                       text-[#5426B8]
//                     "
//                   >
//                     ₹
//                     {price.toLocaleString(
//                       "en-IN"
//                     )}
//                   </span>

//                   <span
//                     className="
//                       ml-1
//                       text-sm
//                       text-gray-500
//                     "
//                   >
//                     /month
//                   </span>

//                 </div>

//               </div>


//               {/* TRAINER */}

//               <div className="p-6">

//                 <p
//                   className="
//                     text-xs
//                     font-semibold
//                     uppercase
//                     tracking-wider
//                     text-gray-500
//                   "
//                 >
//                   Your Trainer
//                 </p>


//                 <div
//                   className="
//                     mt-4
//                     flex
//                     items-center
//                     gap-3
//                   "
//                 >

//                   {trainerImage ? (

//                     <img
//                       src={trainerImage}
//                       alt={trainerName}
//                       className="
//                         h-14
//                         w-14
//                         rounded-full
//                         object-cover
//                         ring-2
//                         ring-[#5426B8]/20
//                       "
//                     />

//                   ) : (

//                     <div
//                       className="
//                         flex
//                         h-14
//                         w-14
//                         items-center
//                         justify-center
//                         rounded-full
//                         bg-[#F3EEFF]
//                         text-lg
//                         font-bold
//                         text-[#5426B8]
//                       "
//                     >
//                       {String(
//                         trainerName
//                       )
//                         .charAt(0)
//                         .toUpperCase()}
//                     </div>

//                   )}


//                   <div className="min-w-0">

//                     <p
//                       className="
//                         truncate
//                         text-base
//                         font-bold
//                         text-gray-900
//                       "
//                     >
//                       {trainerName}
//                     </p>

//                     <p
//                       className="
//                         mt-1
//                         text-xs
//                         text-gray-500
//                       "
//                     >
//                       {instituteName}
//                     </p>

//                     <div className="mt-1">
//                       <StarRating
//                         rating={
//                           rating
//                         }
//                       />
//                     </div>

//                   </div>

//                 </div>


//                 {/* DETAILS */}

//                 <div
//                   className="
//                     mt-6
//                     space-y-4
//                     border-t
//                     border-gray-100
//                     pt-5
//                   "
//                 >

//                   <InfoItem
//                     icon={FaClock}
//                     label="Duration"
//                     value={duration}
//                   />

//                   <InfoItem
//                     icon={FaUsers}
//                     label="Students"
//                     value={`${students} Students`}
//                   />

//                   <InfoItem
//                     icon={FaCalendarAlt}
//                     label="Start Date"
//                     value={formatDate(
//                       startDate
//                     )}
//                   />

//                 </div>


//                 {/* BOOK BUTTON */}

//                 <button
//                   type="button"
//                   onClick={() =>
//                     setShowBooking(
//                       true
//                     )
//                   }
//                   className="
//                     mt-7
//                     flex
//                     w-full
//                     items-center
//                     justify-center
//                     gap-2
//                     rounded-xl
//                     bg-[#5426B8]
//                     px-6
//                     py-3.5
//                     text-sm
//                     font-bold
//                     text-white
//                     transition
//                     hover:bg-[#45209D]
//                   "
//                 >
//                   Book This Class
//                   <FaArrowRight
//                     size={13}
//                   />
//                 </button>


//                 {/* BACK */}

//                 <Link
//                   to="/institute/website/preview/classes"
//                   className="
//                     mt-3
//                     flex
//                     w-full
//                     items-center
//                     justify-center
//                     gap-2
//                     rounded-xl
//                     border
//                     border-gray-200
//                     px-6
//                     py-3.5
//                     text-sm
//                     font-semibold
//                     text-gray-700
//                     transition
//                     hover:border-[#5426B8]
//                     hover:text-[#5426B8]
//                   "
//                 >
//                   <FaArrowLeft
//                     size={12}
//                   />
//                   Back To Classes
//                 </Link>

//               </div>

//             </div>

//           </aside>

//         </div>

//       </section>


//       {/* ===================================================
//           BOOKING MODAL
//       =================================================== */}

//       {showBooking && (
//         <WebsiteBooking
//           classId={classId}
//           classData={classData}
//           sessions={sessions}
//           onClose={() =>
//             setShowBooking(false)
//           }
//         />
//       )}

//     </div>
//   );
// };


// export default WebsiteClassDetail;


// import React, {
//   useEffect,
//   useMemo,
//   useState,
// } from "react";

// import {
//   Link,
//   useNavigate,
//   useParams,
//   useOutletContext,
// } from "react-router-dom";

// import {
//   FaArrowLeft,
//   FaArrowRight,
//   FaCalendarAlt,
//   FaCalendarWeek,
//   FaCheck,
//   FaChevronDown,
//   FaChevronUp,
//   FaClock,
//   FaGlobe,
//   FaHourglassHalf,
//   FaUsers,
// } from "react-icons/fa";

// import { getClassById } from "../../services/classes.js";
// import { getClassSessions } from "../../services/session.service";

// import WebsiteBooking from "./WebsiteBooking";


// /* =========================================================
//    BRANDING
//    ========================================================= */

// const DEFAULT_BRANDING = {
//   navbarColor: "#1F2937",
//   headingColor: "#111827",
//   subheadingColor: "#5B21B6",
//   textColor: "#111827",
//   iconColor: "#F59E0B",
//   buttonColor: "#7C3AED",
//   buttonTextColor: "#FFFFFF",

//   pageBackgroundColor: "#FAFAF9",
//   cardBackgroundColor: "#FFFFFF",

//   footerBackgroundColor: "#1F2937",
//   footerHeadingColor: "#FFFFFF",
//   footerTextColor: "#FAFAF9",

//   fontHeading: "Inter",
//   fontSubheading: "Inter",
//   fontBody: "Inter",

//   headingWeight: 700,
//   headingLineHeight: 1.15,
//   headingLetterSpacing: 0,

//   subheadingWeight: 600,
//   subheadingLineHeight: 1.4,

//   bodyWeight: 400,
//   bodyLineHeight: 1.6,
//   bodyLetterSpacing: 0,

//   roundedButtons: true,
// };


// /* =========================================================
//    BRANDING HELPERS
//    ========================================================= */

// const getBrandingValue = (
//   branding,
//   camelCaseKey,
//   snakeCaseKey,
//   fallback
// ) => {
//   const value =
//     branding?.[camelCaseKey] ??
//     branding?.[snakeCaseKey];

//   return (
//     value !== undefined &&
//     value !== null &&
//     value !== ""
//   )
//     ? value
//     : fallback;
// };


// const normalizeBranding = (
//   branding = {}
// ) => ({
//   navbarColor: getBrandingValue(
//     branding,
//     "navbarColor",
//     "navbar_color",
//     DEFAULT_BRANDING.navbarColor
//   ),

//   headingColor: getBrandingValue(
//     branding,
//     "headingColor",
//     "heading_color",
//     DEFAULT_BRANDING.headingColor
//   ),

//   subheadingColor: getBrandingValue(
//     branding,
//     "subheadingColor",
//     "subheading_color",
//     DEFAULT_BRANDING.subheadingColor
//   ),

//   textColor: getBrandingValue(
//     branding,
//     "textColor",
//     "text_color",
//     DEFAULT_BRANDING.textColor
//   ),

//   iconColor: getBrandingValue(
//     branding,
//     "iconColor",
//     "icon_color",
//     DEFAULT_BRANDING.iconColor
//   ),

//   buttonColor: getBrandingValue(
//     branding,
//     "buttonColor",
//     "button_color",
//     DEFAULT_BRANDING.buttonColor
//   ),

//   buttonTextColor: getBrandingValue(
//     branding,
//     "buttonTextColor",
//     "button_text_color",
//     DEFAULT_BRANDING.buttonTextColor
//   ),

//   pageBackgroundColor: getBrandingValue(
//     branding,
//     "pageBackgroundColor",
//     "page_background_color",
//     DEFAULT_BRANDING.pageBackgroundColor
//   ),

//   cardBackgroundColor: getBrandingValue(
//     branding,
//     "cardBackgroundColor",
//     "card_background_color",
//     DEFAULT_BRANDING.cardBackgroundColor
//   ),

//   footerBackgroundColor:
//     getBrandingValue(
//       branding,
//       "footerBackgroundColor",
//       "footer_background_color",
//       DEFAULT_BRANDING.footerBackgroundColor
//     ),

//   footerHeadingColor:
//     getBrandingValue(
//       branding,
//       "footerHeadingColor",
//       "footer_heading_color",
//       DEFAULT_BRANDING.footerHeadingColor
//     ),

//   footerTextColor:
//     getBrandingValue(
//       branding,
//       "footerTextColor",
//       "footer_text_color",
//       DEFAULT_BRANDING.footerTextColor
//     ),

//   fontHeading: getBrandingValue(
//     branding,
//     "fontHeading",
//     "font_heading",
//     DEFAULT_BRANDING.fontHeading
//   ),

//   fontSubheading:
//     getBrandingValue(
//       branding,
//       "fontSubheading",
//       "font_subheading",
//       DEFAULT_BRANDING.fontSubheading
//     ),

//   fontBody: getBrandingValue(
//     branding,
//     "fontBody",
//     "font_body",
//     DEFAULT_BRANDING.fontBody
//   ),

//   headingWeight:
//     getBrandingValue(
//       branding,
//       "headingWeight",
//       "heading_weight",
//       DEFAULT_BRANDING.headingWeight
//     ),

//   headingLineHeight:
//     getBrandingValue(
//       branding,
//       "headingLineHeight",
//       "heading_line_height",
//       DEFAULT_BRANDING.headingLineHeight
//     ),

//   headingLetterSpacing:
//     getBrandingValue(
//       branding,
//       "headingLetterSpacing",
//       "heading_letter_spacing",
//       DEFAULT_BRANDING.headingLetterSpacing
//     ),

//   subheadingWeight:
//     getBrandingValue(
//       branding,
//       "subheadingWeight",
//       "subheading_weight",
//       DEFAULT_BRANDING.subheadingWeight
//     ),

//   subheadingLineHeight:
//     getBrandingValue(
//       branding,
//       "subheadingLineHeight",
//       "subheading_line_height",
//       DEFAULT_BRANDING.subheadingLineHeight
//     ),

//   bodyWeight:
//     getBrandingValue(
//       branding,
//       "bodyWeight",
//       "body_weight",
//       DEFAULT_BRANDING.bodyWeight
//     ),

//   bodyLineHeight:
//     getBrandingValue(
//       branding,
//       "bodyLineHeight",
//       "body_line_height",
//       DEFAULT_BRANDING.bodyLineHeight
//     ),

//   bodyLetterSpacing:
//     getBrandingValue(
//       branding,
//       "bodyLetterSpacing",
//       "body_letter_spacing",
//       DEFAULT_BRANDING.bodyLetterSpacing
//     ),

//   roundedButtons:
//     getBrandingValue(
//       branding,
//       "roundedButtons",
//       "rounded_buttons",
//       DEFAULT_BRANDING.roundedButtons
//     ),
// });


// const fontFamily = (
//   font
// ) =>
//   font
//     ? `'${font}', sans-serif`
//     : "Inter, sans-serif";


// const getButtonRadius = (
//   branding,
//   large = false
// ) => {
//   if (branding.roundedButtons) {
//     return "9999px";
//   }

//   return large
//     ? "12px"
//     : "8px";
// };


// const hexToRgba = (
//   color,
//   alpha
// ) => {
//   if (
//     typeof color !== "string"
//   ) {
//     return color;
//   }

//   const hex =
//     color.replace("#", "");

//   if (
//     !/^[0-9A-Fa-f]{6}$/.test(hex)
//   ) {
//     return color;
//   }

//   const r = parseInt(
//     hex.substring(0, 2),
//     16
//   );

//   const g = parseInt(
//     hex.substring(2, 4),
//     16
//   );

//   const b = parseInt(
//     hex.substring(4, 6),
//     16
//   );

//   return `rgba(${r}, ${g}, ${b}, ${alpha})`;
// };


// /* =========================================================
//    GENERIC HELPERS
//    ========================================================= */

// const getValue = (
//   ...values
// ) => {
//   for (const value of values) {
//     if (
//       value !== undefined &&
//       value !== null &&
//       value !== ""
//     ) {
//       return value;
//     }
//   }

//   return null;
// };


// const getClassTitle = (
//   data
// ) =>
//   getValue(
//     data?.title,
//     data?.class_title,
//     data?.className,
//     data?.name,
//     "Class"
//   );


// const getClassDescription = (
//   data
// ) =>
//   getValue(
//     data?.description,
//     data?.class_description,
//     data?.about,
//     data?.overview,
//     "No description available."
//   );


// const getClassImage = (
//   data
// ) =>
//   getValue(
//     data?.image,
//     data?.image_url,
//     data?.class_image,
//     data?.class_image_url,
//     data?.thumbnail,
//     data?.thumbnail_url,
//     data?.banner_image,
//     ""
//   );


// const getTrainerName = (
//   data
// ) =>
//   getValue(
//     data?.trainer_name,
//     data?.trainerName,
//     data?.trainer?.full_name,
//     data?.trainer?.name,
//     "Trainer"
//   );


// const getTrainerImage = (
//   data
// ) =>
//   getValue(
//     data?.trainer_image,
//     data?.trainerImage,
//     data?.trainer?.profile_image,
//     data?.trainer?.image,
//     data?.trainer?.image_url,
//     ""
//   );


// const getInstituteName = (
//   data
// ) =>
//   getValue(
//     data?.institute_name,
//     data?.instituteName,
//     data?.institute?.name,
//     "Institute"
//   );


// const getLevel = (
//   data
// ) =>
//   getValue(
//     data?.level,
//     data?.class_level,
//     data?.difficulty,
//     "All Levels"
//   );


// const getDuration = (
//   data
// ) =>
//   getValue(
//     data?.duration,
//     data?.class_duration,
//     data?.duration_minutes,
//     "--"
//   );


// const getPrice = (
//   data
// ) =>
//   Number(
//     getValue(
//       data?.price,
//       data?.class_price,
//       data?.monthly_price,
//       0
//     )
//   );


// const getRating = (
//   data
// ) =>
//   Number(
//     getValue(
//       data?.rating,
//       data?.trainer_rating,
//       0
//     )
//   );


// const getStudents = (
//   data
// ) =>
//   Number(
//     getValue(
//       data?.students,
//       data?.students_count,
//       data?.total_students,
//       0
//     )
//   );


// const getAvailableDays = (
//   data
// ) => {
//   const days =
//     getValue(
//       data?.available_days,
//       data?.days,
//       data?.schedule_days
//     );

//   if (Array.isArray(days)) {
//     return days;
//   }

//   if (
//     typeof days === "string"
//   ) {
//     return days
//       .split(",")
//       .map((item) =>
//         item.trim()
//       )
//       .filter(Boolean);
//   }

//   return [];
// };


// const formatDate = (
//   value
// ) => {
//   if (!value) return "--";

//   const date = new Date(value);

//   if (
//     Number.isNaN(
//       date.getTime()
//     )
//   ) {
//     return String(value);
//   }

//   return date.toLocaleDateString(
//     "en-IN",
//     {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     }
//   );
// };


// const formatTime = (
//   value
// ) => {
//   if (!value) return "--";

//   const text = String(value);

//   if (
//     text
//       .toLowerCase()
//       .includes("am") ||
//     text
//       .toLowerCase()
//       .includes("pm")
//   ) {
//     return text;
//   }

//   const parts =
//     text.split(":");

//   if (parts.length < 2) {
//     return text;
//   }

//   const hours =
//     Number(parts[0]);

//   const minutes =
//     Number(parts[1]);

//   if (
//     Number.isNaN(hours) ||
//     Number.isNaN(minutes)
//   ) {
//     return text;
//   }

//   const period =
//     hours >= 12
//       ? "PM"
//       : "AM";

//   const hour =
//     hours % 12 || 12;

//   return `${hour}:${String(
//     minutes
//   ).padStart(2, "0")} ${period}`;
// };


// const getTimezone = (
//   data
// ) =>
//   getValue(
//     data?.timezone,
//     data?.class_timezone,
//     data?.time_zone,
//     "Asia/Kolkata"
//   );


// const getCategoryName = (
//   data
// ) =>
//   getValue(
//     data?.category_name,
//     data?.category?.name,
//     data?.categoryName,
//     "General"
//   );


// const getSubcategoryName = (
//   data
// ) =>
//   getValue(
//     data?.subcategory_name,
//     data?.subcategory?.name,
//     data?.subcategoryName,
//     ""
//   );


// /* =========================================================
//    STAR RATING
//    ========================================================= */

// const StarRating = ({
//   rating = 0,
//   branding,
// }) => {
//   const value =
//     Math.max(
//       0,
//       Math.min(
//         5,
//         Number(rating) || 0
//       )
//     );

//   return (
//     <div className="flex items-center gap-1">

//       <div
//         className="text-sm tracking-[2px]"
//         aria-label={`Rating ${value.toFixed(
//           1
//         )} out of 5`}
//       >
//         {[1, 2, 3, 4, 5].map(
//           (star) => (
//             <span
//               key={star}
//               style={{
//                 color:
//                   star <=
//                   Math.round(value)
//                     ? branding.iconColor
//                     : hexToRgba(
//                         branding.textColor,
//                         0.18
//                       ),
//               }}
//             >
//               ★
//             </span>
//           )
//         )}
//       </div>

//       <span
//         className="ml-1 text-sm"
//         style={{
//           color:
//             branding.textColor,

//           fontFamily:
//             fontFamily(
//               branding.fontBody
//             ),

//           fontWeight:
//             branding.bodyWeight,
//         }}
//       >
//         {value.toFixed(1)}
//       </span>

//     </div>
//   );
// };


// /* =========================================================
//    INFO ITEM
//    ========================================================= */

// const InfoItem = ({
//   icon: Icon,
//   label,
//   value,
//   branding,
// }) => {
//   return (
//     <div className="flex items-start gap-3">

//       <div
//         className="
//           mt-0.5
//           flex
//           h-9
//           w-9
//           shrink-0
//           items-center
//           justify-center
//         "
//         style={{
//           backgroundColor:
//             hexToRgba(
//               branding.buttonColor,
//               0.1
//             ),

//           color:
//             branding.iconColor,

//           borderRadius:
//             "10px",
//         }}
//       >
//         <Icon size={15} />
//       </div>

//       <div className="min-w-0">

//         <p
//           className="text-xs"
//           style={{
//             color:
//               branding.textColor,

//             opacity: 0.65,

//             fontFamily:
//               fontFamily(
//                 branding.fontBody
//               ),

//             fontWeight:
//               branding.bodyWeight,
//           }}
//         >
//           {label}
//         </p>

//         <p
//           className="
//             mt-0.5
//             break-words
//             text-sm
//           "
//           style={{
//             color:
//               branding.headingColor,

//             fontFamily:
//               fontFamily(
//                 branding.fontBody
//               ),

//             fontWeight:
//               branding.headingWeight,
//           }}
//         >
//           {value || "--"}
//         </p>

//       </div>

//     </div>
//   );
// };


// /* =========================================================
//    SESSION ITEM
//    ========================================================= */

// const SessionItem = ({
//   session,
//   branding,
// }) => {

//   const sessionDate =
//     getValue(
//       session?.session_date,
//       session?.date,
//       session?.start_date
//     );

//   const startTime =
//     getValue(
//       session?.start_time,
//       session?.startTime
//     );

//   const endTime =
//     getValue(
//       session?.end_time,
//       session?.endTime
//     );

//   const timezone =
//     getValue(
//       session?.timezone,
//       session?.time_zone,
//       "Asia/Kolkata"
//     );


//   return (
//     <div
//       className="
//         border
//         p-4
//         transition
//         hover:shadow-sm
//       "
//       style={{
//         backgroundColor:
//           branding.cardBackgroundColor,

//         borderColor:
//           hexToRgba(
//             branding.textColor,
//             0.12
//           ),

//         borderRadius:
//           "12px",
//       }}
//     >

//       <div
//         className="
//           flex
//           flex-col
//           gap-4
//           sm:flex-row
//           sm:items-center
//           sm:justify-between
//         "
//       >

//         <div className="flex items-start gap-3">

//           <div
//             className="
//               flex
//               h-11
//               w-11
//               shrink-0
//               items-center
//               justify-center
//             "
//             style={{
//               backgroundColor:
//                 hexToRgba(
//                   branding.buttonColor,
//                   0.1
//                 ),

//               color:
//                 branding.iconColor,

//               borderRadius:
//                 "10px",
//             }}
//           >
//             <FaCalendarAlt />
//           </div>

//           <div>

//             <p
//               className="text-sm"
//               style={{
//                 color:
//                   branding.headingColor,

//                 fontFamily:
//                   fontFamily(
//                     branding.fontHeading
//                   ),

//                 fontWeight:
//                   branding.headingWeight,
//               }}
//             >
//               {formatDate(
//                 sessionDate
//               )}
//             </p>

//             <p
//               className="mt-1 text-xs"
//               style={{
//                 color:
//                   branding.textColor,

//                 opacity: 0.7,

//                 fontFamily:
//                   fontFamily(
//                     branding.fontBody
//                   ),
//               }}
//             >
//               {startTime
//                 ? formatTime(
//                     startTime
//                   )
//                 : "--"}

//               {endTime
//                 ? ` - ${formatTime(
//                     endTime
//                   )}`
//                 : ""}
//             </p>

//           </div>

//         </div>

//         <div
//           className="
//             flex
//             items-center
//             gap-2
//             text-xs
//           "
//           style={{
//             color:
//               branding.textColor,

//             fontFamily:
//               fontFamily(
//                 branding.fontBody
//               ),
//           }}
//         >
//           <FaGlobe
//             style={{
//               color:
//                 branding.iconColor,
//             }}
//           />

//           {timezone}
//         </div>

//       </div>

//     </div>
//   );
// };


// /* =========================================================
//    MAIN COMPONENT
//    ========================================================= */

// const WebsiteClassDetail = () => {

//   const {
//     classId,
//   } = useParams();

//   const navigate =
//     useNavigate();

//   const outletContext =
//     useOutletContext() || {};

//   /*
//     Branding is expected to come from the
//     Website Preview / Branding provider.
//   */
//   const branding =
//     useMemo(
//       () =>
//         normalizeBranding(
//           outletContext?.branding ||
//             outletContext?.websiteBranding ||
//             outletContext?.brand ||
//             {}
//         ),
//       [
//         outletContext?.branding,
//         outletContext?.websiteBranding,
//         outletContext?.brand,
//       ]
//     );


//   /* =======================================================
//      STATE
//   ======================================================= */

//   const [
//     classData,
//     setClassData,
//   ] = useState(null);

//   const [
//     sessions,
//     setSessions,
//   ] = useState([]);

//   const [
//     loading,
//     setLoading,
//   ] = useState(true);

//   const [
//     sessionsLoading,
//     setSessionsLoading,
//   ] = useState(false);

//   const [
//     error,
//     setError,
//   ] = useState("");

//   const [
//     sessionError,
//     setSessionError,
//   ] = useState("");

//   const [
//     showAllSessions,
//     setShowAllSessions,
//   ] = useState(false);

//   const [
//     showBooking,
//     setShowBooking,
//   ] = useState(false);


//   /* =======================================================
//      DEBUG
//   ======================================================= */

//   useEffect(() => {
//     console.log(
//       "================================"
//     );

//     console.log(
//       "WEBSITE CLASS DETAIL"
//     );

//     console.log(
//       "classId:",
//       classId
//     );

//     console.log(
//       "branding:",
//       branding
//     );

//     console.log(
//       "================================"
//     );
//   }, [
//     classId,
//     branding,
//   ]);


//   /* =======================================================
//      FETCH CLASS
//   ======================================================= */

//   useEffect(() => {

//     let mounted = true;

//     const fetchClass =
//       async () => {

//         if (!classId) {

//           if (mounted) {
//             setError(
//               "Class ID is missing."
//             );

//             setLoading(false);
//           }

//           return;
//         }

//         try {

//           setLoading(true);
//           setError("");

//           console.log(
//             "Fetching class:",
//             classId
//           );

//           const response =
//             await getClassById(
//               classId
//             );

//           console.log(
//             "GET CLASS BY ID RESPONSE:",
//             response
//           );

//           let data =
//             response?.data?.data ??
//             response?.data?.class ??
//             response?.data ??
//             response?.class ??
//             response;

//           if (
//             data?.data &&
//             typeof data.data ===
//               "object"
//           ) {
//             data =
//               data.data;
//           }

//           console.log(
//             "FINAL CLASS DATA:",
//             data
//           );

//           if (
//             !data ||
//             typeof data !==
//               "object"
//           ) {
//             throw new Error(
//               "Class data was not returned by the server."
//             );
//           }

//           if (mounted) {
//             setClassData(
//               data
//             );
//           }

//         } catch (err) {

//           console.error(
//             "CLASS DETAIL ERROR:",
//             err
//           );

//           const message =
//             err?.response
//               ?.data?.message ||
//             err?.response
//               ?.data?.error ||
//             err?.message ||
//             "Failed to load class details.";

//           if (mounted) {
//             setError(
//               message
//             );
//           }

//         } finally {

//           if (mounted) {
//             setLoading(false);
//           }

//         }
//       };

//     fetchClass();

//     return () => {
//       mounted = false;
//     };

//   }, [classId]);


//   /* =======================================================
//      FETCH SESSIONS
//   ======================================================= */

//   useEffect(() => {

//     let mounted = true;

//     const fetchSessions =
//       async () => {

//         if (!classId) {
//           return;
//         }

//         try {

//           setSessionsLoading(
//             true
//           );

//           setSessionError("");

//           console.log(
//             "Fetching sessions for class:",
//             classId
//           );

//           const response =
//             await getClassSessions(
//               classId
//             );

//           console.log(
//             "CLASS SESSIONS RESPONSE:",
//             response
//           );

//           let data =
//             response?.data?.data ??
//             response?.data?.sessions ??
//             response?.data ??
//             response?.sessions ??
//             response;

//           if (
//             !Array.isArray(data)
//           ) {
//             data = [];
//           }

//           if (mounted) {
//             setSessions(
//               data
//             );
//           }

//         } catch (err) {

//           console.error(
//             "SESSION FETCH ERROR:",
//             err
//           );

//           if (mounted) {

//             setSessions([]);

//             setSessionError(
//               err?.response
//                 ?.data?.message ||
//               err?.message ||
//               "Unable to load sessions."
//             );
//           }

//         } finally {

//           if (mounted) {
//             setSessionsLoading(
//               false
//             );
//           }

//         }
//       };

//     fetchSessions();

//     return () => {
//       mounted = false;
//     };

//   }, [classId]);


//   /* =======================================================
//      DERIVED DATA
//   ======================================================= */

//   const title =
//     useMemo(
//       () =>
//         getClassTitle(
//           classData
//         ),
//       [classData]
//     );


//   const description =
//     useMemo(
//       () =>
//         getClassDescription(
//           classData
//         ),
//       [classData]
//     );


//   const image =
//     useMemo(
//       () =>
//         getClassImage(
//           classData
//         ),
//       [classData]
//     );


//   const trainerName =
//     useMemo(
//       () =>
//         getTrainerName(
//           classData
//         ),
//       [classData]
//     );


//   const trainerImage =
//     useMemo(
//       () =>
//         getTrainerImage(
//           classData
//         ),
//       [classData]
//     );


//   const instituteName =
//     useMemo(
//       () =>
//         getInstituteName(
//           classData
//         ),
//       [classData]
//     );


//   const categoryName =
//     useMemo(
//       () =>
//         getCategoryName(
//           classData
//         ),
//       [classData]
//     );


//   const subcategoryName =
//     useMemo(
//       () =>
//         getSubcategoryName(
//           classData
//         ),
//       [classData]
//     );


//   const level =
//     useMemo(
//       () =>
//         getLevel(
//           classData
//         ),
//       [classData]
//     );


//   const duration =
//     useMemo(
//       () =>
//         getDuration(
//           classData
//         ),
//       [classData]
//     );


//   const rating =
//     useMemo(
//       () =>
//         getRating(
//           classData
//         ),
//       [classData]
//     );


//   const students =
//     useMemo(
//       () =>
//         getStudents(
//           classData
//         ),
//       [classData]
//     );


//   const price =
//     useMemo(
//       () =>
//         getPrice(
//           classData
//         ),
//       [classData]
//     );


//   const availableDays =
//     useMemo(
//       () =>
//         getAvailableDays(
//           classData
//         ),
//       [classData]
//     );


//   const startDate =
//     getValue(
//       classData?.start_date,
//       classData?.startDate
//     );


//   const startTime =
//     getValue(
//       classData?.start_time,
//       classData?.startTime
//     );


//   const timezone =
//     getTimezone(
//       classData
//     );


//   const visibleSessions =
//     showAllSessions
//       ? sessions
//       : sessions.slice(
//           0,
//           5
//         );


//   /* =======================================================
//      SHARED STYLES
//   ======================================================= */

//   const headingStyle = {
//     color:
//       branding.headingColor,

//     fontFamily:
//       fontFamily(
//         branding.fontHeading
//       ),

//     fontWeight:
//       branding.headingWeight,

//     lineHeight:
//       branding.headingLineHeight,

//     letterSpacing:
//       branding.headingLetterSpacing,
//   };


//   const bodyStyle = {
//     color:
//       branding.textColor,

//     fontFamily:
//       fontFamily(
//         branding.fontBody
//       ),

//     fontWeight:
//       branding.bodyWeight,

//     lineHeight:
//       branding.bodyLineHeight,

//     letterSpacing:
//       branding.bodyLetterSpacing,
//   };


//   const buttonStyle = {
//     backgroundColor:
//       branding.buttonColor,

//     color:
//       branding.buttonTextColor,

//     borderRadius:
//       getButtonRadius(
//         branding,
//         true
//       ),

//     fontFamily:
//       fontFamily(
//         branding.fontBody
//       ),

//     fontWeight:
//       branding.bodyWeight,
//   };


//   /* =======================================================
//      LOADING
//   ======================================================= */

//   if (loading) {

//     return (
//       <div
//         className="
//           flex
//           min-h-[550px]
//           items-center
//           justify-center
//         "
//         style={{
//           backgroundColor:
//             branding.pageBackgroundColor,
//         }}
//       >

//         <div className="text-center">

//           <div
//             className="
//               mx-auto
//               mb-5
//               h-12
//               w-12
//               animate-spin
//               rounded-full
//               border-4
//             "
//             style={{
//               borderColor:
//                 hexToRgba(
//                   branding.buttonColor,
//                   0.2
//                 ),

//               borderTopColor:
//                 branding.buttonColor,
//             }}
//           />

//           <p style={bodyStyle}>
//             Loading class details...
//           </p>

//         </div>

//       </div>
//     );
//   }


//   /* =======================================================
//      ERROR
//   ======================================================= */

//   if (error) {

//     return (
//       <div
//         className="
//           flex
//           min-h-[550px]
//           items-center
//           justify-center
//           px-6
//         "
//         style={{
//           backgroundColor:
//             branding.pageBackgroundColor,
//         }}
//       >

//         <div className="max-w-lg text-center">

//           <div
//             className="
//               mx-auto
//               flex
//               h-16
//               w-16
//               items-center
//               justify-center
//               text-2xl
//             "
//             style={{
//               backgroundColor:
//                 "rgba(239,68,68,0.08)",

//               color:
//                 "#EF4444",

//               borderRadius:
//                 "50%",
//             }}
//           >
//             !
//           </div>

//           <h1
//             className="
//               mt-5
//               text-2xl
//             "
//             style={headingStyle}
//           >
//             Unable to Load Class
//           </h1>

//           <p
//             className="
//               mt-3
//               text-sm
//             "
//             style={{
//               ...bodyStyle,
//               opacity: 0.7,
//             }}
//           >
//             {error}
//           </p>

//           <p
//             className="
//               mt-2
//               text-xs
//             "
//             style={{
//               ...bodyStyle,
//               opacity: 0.5,
//             }}
//           >
//             Class ID: {classId}
//           </p>

//           <button
//             type="button"
//             onClick={() =>
//               navigate(
//                 "/institute/website/preview/classes"
//               )
//             }
//             className="
//               mt-6
//               inline-flex
//               items-center
//               gap-2
//               px-6
//               py-3
//             "
//             style={buttonStyle}
//           >
//             <FaArrowLeft />
//             Back To Classes
//           </button>

//         </div>

//       </div>
//     );
//   }


//   /* =======================================================
//      NOT FOUND
//   ======================================================= */

//   if (!classData) {

//     return (
//       <div
//         className="
//           flex
//           min-h-[550px]
//           items-center
//           justify-center
//         "
//         style={{
//           backgroundColor:
//             branding.pageBackgroundColor,
//         }}
//       >

//         <div className="text-center">

//           <h1
//             className="text-3xl"
//             style={headingStyle}
//           >
//             Class Not Found
//           </h1>

//           <button
//             type="button"
//             onClick={() =>
//               navigate(
//                 "/institute/website/preview/classes"
//               )
//             }
//             className="
//               mt-6
//               px-6
//               py-3
//             "
//             style={buttonStyle}
//           >
//             Back To Classes
//           </button>

//         </div>

//       </div>
//     );
//   }


//   /* =======================================================
//      MAIN UI
//   ======================================================= */

//   return (
//     <div
//       className="min-h-screen"
//       style={{
//         backgroundColor:
//           branding.pageBackgroundColor,

//         ...bodyStyle,
//       }}
//     >

//       {/* ===================================================
//           HERO
//       =================================================== */}

//       <section
//         style={{
//           backgroundColor:
//             branding.navbarColor,
//         }}
//       >

//         <div
//           className="
//             mx-auto
//             max-w-7xl
//             px-4
//             py-6
//             sm:px-6
//             lg:px-8
//           "
//         >

//           {/* BACK */}

//           <button
//             type="button"
//             onClick={() =>
//               navigate(
//                 "/institute/website/preview/classes"
//               )
//             }
//             className="
//               mb-5
//               inline-flex
//               items-center
//               gap-2
//               text-sm
//             "
//             style={{
//               color:
//                 branding.buttonTextColor,

//               fontFamily:
//                 fontFamily(
//                   branding.fontBody
//                 ),

//               fontWeight:
//                 branding.bodyWeight,
//             }}
//           >
//             <FaArrowLeft />
//             Back To Classes
//           </button>


//           <div
//             className="
//               overflow-hidden
//               border
//               shadow-sm
//             "
//             style={{
//               backgroundColor:
//                 branding.cardBackgroundColor,

//               borderColor:
//                 hexToRgba(
//                   branding.buttonTextColor,
//                   0.12
//                 ),

//               borderRadius:
//                 "18px",
//             }}
//           >

//             <div
//               className="
//                 relative
//                 aspect-[16/7]
//                 min-h-[260px]
//                 overflow-hidden
//               "
//               style={{
//                 backgroundColor:
//                   branding.navbarColor,
//               }}
//             >

//               {image ? (

//                 <img
//                   src={image}
//                   alt={title}
//                   className="
//                     h-full
//                     w-full
//                     object-cover
//                   "
//                 />

//               ) : (

//                 <div
//                   className="
//                     flex
//                     h-full
//                     w-full
//                     items-center
//                     justify-center
//                   "
//                   style={{
//                     color:
//                       branding.buttonTextColor,
//                   }}
//                 >
//                   No Class Image
//                 </div>

//               )}


//               <div
//                 className="
//                   absolute
//                   inset-0
//                 "
//                 style={{
//                   background: `linear-gradient(
//                     to top,
//                     rgba(0,0,0,0.78),
//                     rgba(0,0,0,0.18),
//                     transparent
//                   )`,
//                 }}
//               />


//               <div
//                 className="
//                   absolute
//                   bottom-6
//                   left-5
//                   right-5
//                   sm:left-8
//                   sm:right-8
//                 "
//               >

//                 <div
//                   className="
//                     mb-3
//                     flex
//                     flex-wrap
//                     gap-2
//                   "
//                 >

//                   <span
//                     className="
//                       px-3
//                       py-1
//                       text-xs
//                     "
//                     style={{
//                       backgroundColor:
//                         branding.buttonColor,

//                       color:
//                         branding.buttonTextColor,

//                       borderRadius:
//                         getButtonRadius(
//                           branding
//                         ),

//                       fontFamily:
//                         fontFamily(
//                           branding.fontBody
//                         ),

//                       fontWeight:
//                         branding.bodyWeight,
//                     }}
//                   >
//                     {categoryName}
//                   </span>


//                   {subcategoryName && (
//                     <span
//                       className="
//                         px-3
//                         py-1
//                         text-xs
//                       "
//                       style={{
//                         backgroundColor:
//                           branding.cardBackgroundColor,

//                         color:
//                           branding.buttonColor,

//                         borderRadius:
//                           getButtonRadius(
//                             branding
//                           ),

//                         fontFamily:
//                           fontFamily(
//                             branding.fontBody
//                           ),

//                         fontWeight:
//                           branding.bodyWeight,
//                       }}
//                     >
//                       {subcategoryName}
//                     </span>
//                   )}


//                   <span
//                     className="
//                       px-3
//                       py-1
//                       text-xs
//                     "
//                     style={{
//                       backgroundColor:
//                         "rgba(0,0,0,0.6)",

//                       color:
//                         "#FFFFFF",

//                       borderRadius:
//                         getButtonRadius(
//                           branding
//                         ),

//                       fontFamily:
//                         fontFamily(
//                           branding.fontBody
//                         ),

//                       fontWeight:
//                         branding.bodyWeight,
//                     }}
//                   >
//                     {level}
//                   </span>

//                 </div>


//                 <h1
//                   className="
//                     max-w-4xl
//                     text-3xl
//                     sm:text-4xl
//                     lg:text-5xl
//                   "
//                   style={{
//                     color:
//                       branding.buttonTextColor,

//                     fontFamily:
//                       fontFamily(
//                         branding.fontHeading
//                       ),

//                     fontWeight:
//                       branding.headingWeight,

//                     lineHeight:
//                       branding.headingLineHeight,

//                     letterSpacing:
//                       branding.headingLetterSpacing,
//                   }}
//                 >
//                   {title}
//                 </h1>

//               </div>

//             </div>

//           </div>

//         </div>

//       </section>


//       {/* ===================================================
//           MAIN CONTENT
//       =================================================== */}

//       <section
//         className="
//           mx-auto
//           max-w-7xl
//           px-4
//           py-8
//           sm:px-6
//           lg:px-8
//         "
//       >

//         <div
//           className="
//             grid
//             grid-cols-1
//             gap-8
//             lg:grid-cols-[1fr_360px]
//           "
//         >

//           {/* =================================================
//               LEFT
//           ================================================= */}

//           <div className="space-y-8">

//             {/* ABOUT */}

//             <div
//               className="
//                 border
//                 p-6
//                 shadow-sm
//                 sm:p-8
//               "
//               style={{
//                 backgroundColor:
//                   branding.cardBackgroundColor,

//                 borderColor:
//                   hexToRgba(
//                     branding.textColor,
//                     0.12
//                   ),

//                 borderRadius:
//                   "18px",
//               }}
//             >

//               <h2
//                 className="
//                   text-2xl
//                 "
//                 style={headingStyle}
//               >
//                 About This Class
//               </h2>

//               <div
//                 className="
//                   mt-5
//                   whitespace-pre-line
//                   text-sm
//                 "
//                 style={{
//                   ...bodyStyle,
//                   opacity: 0.72,
//                 }}
//               >
//                 {description}
//               </div>

//             </div>


//             {/* CLASS INFORMATION */}

//             <div
//               className="
//                 border
//                 p-6
//                 shadow-sm
//                 sm:p-8
//               "
//               style={{
//                 backgroundColor:
//                   branding.cardBackgroundColor,

//                 borderColor:
//                   hexToRgba(
//                     branding.textColor,
//                     0.12
//                   ),

//                 borderRadius:
//                   "18px",
//               }}
//             >

//               <h2
//                 className="text-2xl"
//                 style={headingStyle}
//               >
//                 Class Information
//               </h2>


//               <div
//                 className="
//                   mt-6
//                   grid
//                   grid-cols-1
//                   gap-5
//                   sm:grid-cols-2
//                 "
//               >

//                 <InfoItem
//                   icon={
//                     FaHourglassHalf
//                   }
//                   label="Level"
//                   value={level}
//                   branding={
//                     branding
//                   }
//                 />

//                 <InfoItem
//                   icon={FaClock}
//                   label="Duration"
//                   value={duration}
//                   branding={
//                     branding
//                   }
//                 />

//                 <InfoItem
//                   icon={FaUsers}
//                   label="Students"
//                   value={students}
//                   branding={
//                     branding
//                   }
//                 />

//                 <InfoItem
//                   icon={FaGlobe}
//                   label="Timezone"
//                   value={timezone}
//                   branding={
//                     branding
//                   }
//                 />

//               </div>

//             </div>


//             {/* SCHEDULE */}

//             <div
//               className="
//                 border
//                 p-6
//                 shadow-sm
//                 sm:p-8
//               "
//               style={{
//                 backgroundColor:
//                   branding.cardBackgroundColor,

//                 borderColor:
//                   hexToRgba(
//                     branding.textColor,
//                     0.12
//                   ),

//                 borderRadius:
//                   "18px",
//               }}
//             >

//               <h2
//                 className="text-2xl"
//                 style={headingStyle}
//               >
//                 Schedule
//               </h2>


//               <div
//                 className="
//                   mt-6
//                   grid
//                   grid-cols-1
//                   gap-4
//                   sm:grid-cols-2
//                 "
//               >

//                 <InfoItem
//                   icon={
//                     FaCalendarWeek
//                   }
//                   label="Available Days"
//                   value={
//                     availableDays.length
//                       ? availableDays
//                           .map(
//                             (day) =>
//                               String(
//                                 day
//                               ).substring(
//                                 0,
//                                 3
//                               )
//                           )
//                           .join(
//                             " • "
//                           )
//                       : "--"
//                   }
//                   branding={
//                     branding
//                   }
//                 />


//                 <InfoItem
//                   icon={
//                     FaCalendarAlt
//                   }
//                   label="Start Date"
//                   value={formatDate(
//                     startDate
//                   )}
//                   branding={
//                     branding
//                   }
//                 />


//                 <InfoItem
//                   icon={FaClock}
//                   label="Start Time"
//                   value={
//                     startTime
//                       ? `${formatTime(
//                           startTime
//                         )} ${timezone}`
//                       : "--"
//                   }
//                   branding={
//                     branding
//                   }
//                 />

//               </div>

//             </div>


//             {/* =================================================
//                 SESSIONS
//             ================================================= */}

//             <div
//               className="
//                 border
//                 p-6
//                 shadow-sm
//                 sm:p-8
//               "
//               style={{
//                 backgroundColor:
//                   branding.cardBackgroundColor,

//                 borderColor:
//                   hexToRgba(
//                     branding.textColor,
//                     0.12
//                   ),

//                 borderRadius:
//                   "18px",
//               }}
//             >

//               <div
//                 className="
//                   flex
//                   flex-col
//                   gap-2
//                   sm:flex-row
//                   sm:items-center
//                   sm:justify-between
//                 "
//               >

//                 <div>

//                   <h2
//                     className="text-2xl"
//                     style={headingStyle}
//                   >
//                     Upcoming Sessions
//                   </h2>

//                   <p
//                     className="
//                       mt-1
//                       text-sm
//                     "
//                     style={{
//                       ...bodyStyle,
//                       opacity: 0.65,
//                     }}
//                   >
//                     Scheduled sessions
//                     for this class
//                   </p>

//                 </div>


//                 {sessions.length >
//                   0 && (
//                   <span
//                     className="
//                       w-fit
//                       px-3
//                       py-1
//                       text-xs
//                     "
//                     style={{
//                       backgroundColor:
//                         hexToRgba(
//                           branding.buttonColor,
//                           0.1
//                         ),

//                       color:
//                         branding.buttonColor,

//                       borderRadius:
//                         getButtonRadius(
//                           branding
//                         ),

//                       fontFamily:
//                         fontFamily(
//                           branding.fontBody
//                         ),

//                       fontWeight:
//                         branding.headingWeight,
//                     }}
//                   >
//                     {sessions.length}{" "}
//                     Sessions
//                   </span>
//                 )}

//               </div>


//               {sessionsLoading ? (

//                 <div
//                   className="
//                     flex
//                     items-center
//                     justify-center
//                     py-12
//                   "
//                 >

//                   <div
//                     className="
//                       h-8
//                       w-8
//                       animate-spin
//                       rounded-full
//                       border-4
//                     "
//                     style={{
//                       borderColor:
//                         hexToRgba(
//                           branding.buttonColor,
//                           0.2
//                         ),

//                       borderTopColor:
//                         branding.buttonColor,
//                     }}
//                   />

//                 </div>

//               ) : sessionError ? (

//                 <div
//                   className="
//                     mt-6
//                     p-5
//                     text-center
//                     text-sm
//                   "
//                   style={{
//                     backgroundColor:
//                       hexToRgba(
//                         branding.textColor,
//                         0.05
//                       ),

//                     color:
//                       branding.textColor,

//                     borderRadius:
//                       "12px",

//                     fontFamily:
//                       fontFamily(
//                         branding.fontBody
//                       ),
//                   }}
//                 >
//                   {sessionError}
//                 </div>

//               ) : sessions.length ===
//                 0 ? (

//                 <div
//                   className="
//                     mt-6
//                     border
//                     border-dashed
//                     p-8
//                     text-center
//                     text-sm
//                   "
//                   style={{
//                     borderColor:
//                       hexToRgba(
//                         branding.textColor,
//                         0.18
//                       ),

//                     color:
//                       branding.textColor,

//                     opacity: 0.7,

//                     borderRadius:
//                       "12px",

//                     fontFamily:
//                       fontFamily(
//                         branding.fontBody
//                       ),
//                   }}
//                 >
//                   No upcoming
//                   sessions available.
//                 </div>

//               ) : (

//                 <div className="mt-6 space-y-3">

//                   {visibleSessions.map(
//                     (
//                       session,
//                       index
//                     ) => (
//                       <SessionItem
//                         key={
//                           session?.id ||
//                           session?.session_id ||
//                           index
//                         }
//                         session={
//                           session
//                         }
//                         branding={
//                           branding
//                         }
//                       />
//                     )
//                   )}


//                   {sessions.length >
//                     5 && (
//                     <button
//                       type="button"
//                       onClick={() =>
//                         setShowAllSessions(
//                           (value) =>
//                             !value
//                         )
//                       }
//                       className="
//                         mx-auto
//                         mt-4
//                         flex
//                         items-center
//                         gap-2
//                         text-sm
//                       "
//                       style={{
//                         color:
//                           branding.buttonColor,

//                         fontFamily:
//                           fontFamily(
//                             branding.fontBody
//                           ),

//                         fontWeight:
//                           branding.headingWeight,
//                       }}
//                     >

//                       {showAllSessions
//                         ? "Show Less"
//                         : "View All Sessions"}

//                       {showAllSessions ? (
//                         <FaChevronUp />
//                       ) : (
//                         <FaChevronDown />
//                       )}

//                     </button>
//                   )}

//                 </div>

//               )}

//             </div>


//             {/* =================================================
//                 WHAT YOU WILL LEARN
//             ================================================= */}

//             {Array.isArray(
//               classData?.skills
//             ) &&
//               classData.skills.length >
//                 0 && (

//                 <div
//                   className="
//                     border
//                     p-6
//                     shadow-sm
//                     sm:p-8
//                   "
//                   style={{
//                     backgroundColor:
//                       branding.cardBackgroundColor,

//                     borderColor:
//                       hexToRgba(
//                         branding.textColor,
//                         0.12
//                       ),

//                     borderRadius:
//                       "18px",
//                   }}
//                 >

//                   <h2
//                     className="text-2xl"
//                     style={headingStyle}
//                   >
//                     What You Will Learn
//                   </h2>


//                   <div
//                     className="
//                       mt-6
//                       grid
//                       grid-cols-1
//                       gap-4
//                       sm:grid-cols-2
//                     "
//                   >

//                     {classData.skills.map(
//                       (
//                         skill,
//                         index
//                       ) => (

//                         <div
//                           key={index}
//                           className="
//                             flex
//                             items-start
//                             gap-3
//                           "
//                         >

//                           <div
//                             className="
//                               mt-0.5
//                               flex
//                               h-6
//                               w-6
//                               shrink-0
//                               items-center
//                               justify-center
//                             "
//                             style={{
//                               backgroundColor:
//                                 hexToRgba(
//                                   branding.buttonColor,
//                                   0.1
//                                 ),

//                               color:
//                                 branding.iconColor,

//                               borderRadius:
//                                 "50%",
//                             }}
//                           >
//                             <FaCheck
//                               size={11}
//                             />
//                           </div>


//                           <span
//                             className="
//                               text-sm
//                             "
//                             style={{
//                               ...bodyStyle,
//                               opacity: 0.8,
//                             }}
//                           >
//                             {typeof skill ===
//                             "string"
//                               ? skill
//                               : skill?.name ||
//                                 skill?.title ||
//                                 "Skill"}
//                           </span>

//                         </div>

//                       )
//                     )}

//                   </div>

//                 </div>
//               )}

//           </div>


//           {/* =================================================
//               RIGHT SIDEBAR
//           ================================================= */}

//           <aside
//             className="
//               h-fit
//               lg:sticky
//               lg:top-6
//             "
//           >

//             <div
//               className="
//                 overflow-hidden
//                 border
//                 shadow-sm
//               "
//               style={{
//                 backgroundColor:
//                   branding.cardBackgroundColor,

//                 borderColor:
//                   hexToRgba(
//                     branding.textColor,
//                     0.12
//                   ),

//                 borderRadius:
//                   "18px",
//               }}
//             >

//               {/* PRICE */}

//               <div
//                 className="
//                   border-b
//                   p-6
//                 "
//                 style={{
//                   backgroundColor:
//                     hexToRgba(
//                       branding.buttonColor,
//                       0.05
//                     ),

//                   borderColor:
//                     hexToRgba(
//                       branding.textColor,
//                       0.08
//                     ),
//                 }}
//               >

//                 <p
//                   className="
//                     text-xs
//                     uppercase
//                     tracking-wider
//                   "
//                   style={{
//                     color:
//                       branding.subheadingColor,

//                     fontFamily:
//                       fontFamily(
//                         branding.fontSubheading
//                       ),

//                     fontWeight:
//                       branding.subheadingWeight,
//                   }}
//                 >
//                   Course Fee
//                 </p>


//                 <div className="mt-2">

//                   <span
//                     className="
//                       text-3xl
//                     "
//                     style={{
//                       color:
//                         branding.buttonColor,

//                       fontFamily:
//                         fontFamily(
//                           branding.fontHeading
//                         ),

//                       fontWeight:
//                         branding.headingWeight,
//                     }}
//                   >
//                     ₹
//                     {price.toLocaleString(
//                       "en-IN"
//                     )}
//                   </span>

//                   <span
//                     className="
//                       ml-1
//                       text-sm
//                     "
//                     style={{
//                       ...bodyStyle,
//                       opacity: 0.65,
//                     }}
//                   >
//                     /month
//                   </span>

//                 </div>

//               </div>


//               {/* TRAINER */}

//               <div className="p-6">

//                 <p
//                   className="
//                     text-xs
//                     uppercase
//                     tracking-wider
//                   "
//                   style={{
//                     color:
//                       branding.subheadingColor,

//                     fontFamily:
//                       fontFamily(
//                         branding.fontSubheading
//                       ),

//                     fontWeight:
//                       branding.subheadingWeight,
//                   }}
//                 >
//                   Your Trainer
//                 </p>


//                 <div
//                   className="
//                     mt-4
//                     flex
//                     items-center
//                     gap-3
//                   "
//                 >

//                   {trainerImage ? (

//                     <img
//                       src={
//                         trainerImage
//                       }
//                       alt={
//                         trainerName
//                       }
//                       className="
//                         h-14
//                         w-14
//                         rounded-full
//                         object-cover
//                       "
//                       style={{
//                         boxShadow:
//                           `0 0 0 2px ${hexToRgba(
//                             branding.iconColor,
//                             0.3
//                           )}`,
//                       }}
//                     />

//                   ) : (

//                     <div
//                       className="
//                         flex
//                         h-14
//                         w-14
//                         items-center
//                         justify-center
//                         rounded-full
//                         text-lg
//                       "
//                       style={{
//                         backgroundColor:
//                           hexToRgba(
//                             branding.buttonColor,
//                             0.1
//                           ),

//                         color:
//                           branding.buttonColor,

//                         fontFamily:
//                           fontFamily(
//                             branding.fontHeading
//                           ),

//                         fontWeight:
//                           branding.headingWeight,
//                       }}
//                     >
//                       {String(
//                         trainerName
//                       )
//                         .charAt(
//                           0
//                         )
//                         .toUpperCase()}
//                     </div>

//                   )}


//                   <div className="min-w-0">

//                     <p
//                       className="
//                         truncate
//                         text-base
//                       "
//                       style={{
//                         color:
//                           branding.headingColor,

//                         fontFamily:
//                           fontFamily(
//                             branding.fontHeading
//                           ),

//                         fontWeight:
//                           branding.headingWeight,
//                       }}
//                     >
//                       {trainerName}
//                     </p>


//                     <p
//                       className="
//                         mt-1
//                         text-xs
//                       "
//                       style={{
//                         ...bodyStyle,
//                         opacity: 0.65,
//                       }}
//                     >
//                       {instituteName}
//                     </p>


//                     <div className="mt-1">
//                       <StarRating
//                         rating={
//                           rating
//                         }
//                         branding={
//                           branding
//                         }
//                       />
//                     </div>

//                   </div>

//                 </div>


//                 {/* DETAILS */}

//                 <div
//                   className="
//                     mt-6
//                     space-y-4
//                     border-t
//                     pt-5
//                   "
//                   style={{
//                     borderColor:
//                       hexToRgba(
//                         branding.textColor,
//                         0.1
//                       ),
//                   }}
//                 >

//                   <InfoItem
//                     icon={FaClock}
//                     label="Duration"
//                     value={
//                       duration
//                     }
//                     branding={
//                       branding
//                     }
//                   />

//                   <InfoItem
//                     icon={FaUsers}
//                     label="Students"
//                     value={`${students} Students`}
//                     branding={
//                       branding
//                     }
//                   />

//                   <InfoItem
//                     icon={
//                       FaCalendarAlt
//                     }
//                     label="Start Date"
//                     value={formatDate(
//                       startDate
//                     )}
//                     branding={
//                       branding
//                     }
//                   />

//                 </div>


//                 {/* BOOK BUTTON */}

//                 <button
//                   type="button"
//                   onClick={() =>
//                     setShowBooking(
//                       true
//                     )
//                   }
//                   className="
//                     mt-7
//                     flex
//                     w-full
//                     items-center
//                     justify-center
//                     gap-2
//                     px-6
//                     py-3.5
//                     transition
//                   "
//                   style={buttonStyle}
//                 >
//                   Book This Class
//                   <FaArrowRight
//                     size={13}
//                   />
//                 </button>


//                 {/* BACK BUTTON */}

//                 <Link
//                   to="/institute/website/preview/classes"
//                   className="
//                     mt-3
//                     flex
//                     w-full
//                     items-center
//                     justify-center
//                     gap-2
//                     border
//                     px-6
//                     py-3.5
//                     text-sm
//                     transition
//                   "
//                   style={{
//                     backgroundColor:
//                       branding.cardBackgroundColor,

//                     color:
//                       branding.buttonColor,

//                     borderColor:
//                       branding.buttonColor,

//                     borderRadius:
//                       getButtonRadius(
//                         branding,
//                         true
//                       ),

//                     fontFamily:
//                       fontFamily(
//                         branding.fontBody
//                       ),

//                     fontWeight:
//                       branding.bodyWeight,
//                   }}
//                 >
//                   <FaArrowLeft
//                     size={12}
//                   />
//                   Back To Classes
//                 </Link>

//               </div>

//             </div>

//           </aside>

//         </div>

//       </section>


//       {/* ===================================================
//           BOOKING MODAL
//       =================================================== */}

//       {showBooking && (
//         <WebsiteBooking
//           classId={classId}
//           classData={classData}
//           sessions={sessions}
//           onClose={() =>
//             setShowBooking(
//               false
//             )
//           }
//         />
//       )}

//     </div>
//   );
// };


// export default WebsiteClassDetail;


import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Link,
  useNavigate,
  useParams,
  useOutletContext,
} from "react-router-dom";

import {
  FaArrowLeft,
  FaArrowRight,
  FaCalendarAlt,
  FaCalendarWeek,
  FaCheck,
  FaChevronDown,
  FaChevronUp,
  FaClock,
  FaGlobe,
  FaHourglassHalf,
  FaUsers,
} from "react-icons/fa";

import { getClassById } from "../../services/classes.js";
import { getClassSessions } from "../../services/session.service";

import WebsiteBooking from "./WebsiteBooking";


/* =========================================================
   DEFAULT BRANDING
========================================================= */

const DEFAULT_BRANDING = {
  navbarColor: "#1F2937",

  headingColor: "#111827",
  subheadingColor: "#5B21B6",
  textColor: "#111827",
  iconColor: "#F59E0B",

  buttonColor: "#7C3AED",
  buttonTextColor: "#FFFFFF",

  pageBackgroundColor: "#FAFAF9",
  cardBackgroundColor: "#FFFFFF",

  footerBackgroundColor: "#1F2937",
  footerHeadingColor: "#FFFFFF",
  footerTextColor: "#FAFAF9",

  fontHeading: "Inter",
  fontSubheading: "Inter",
  fontBody: "Inter",

  headingWeight: 700,
  headingLineHeight: 1.15,
  headingLetterSpacing: 0,

  subheadingWeight: 600,
  subheadingLineHeight: 1.4,

  bodyWeight: 400,
  bodyLineHeight: 1.6,
  bodyLetterSpacing: 0,

  roundedButtons: true,
};


/* =========================================================
   DEFAULT CONTENT
========================================================= */

const DEFAULT_CONTENT = {
  classDetail: {
    eyebrow: "CLASS DETAILS",
    heading: "Class Details",
    subheading:
      "Explore this class, its schedule, trainer and available sessions.",

    about: {
      heading: "About This Class",
      subheading:
        "Learn more about this class and what you can expect.",
    },

    information: {
      heading: "Class Information",
      subheading:
        "Everything you need to know about this class.",
    },

    schedule: {
      heading: "Schedule",
      subheading:
        "Check the class schedule and timings.",
    },

    sessions: {
      heading: "Upcoming Sessions",
      subheading:
        "Scheduled sessions for this class.",
    },

    skills: {
      heading: "What You Will Learn",
      subheading:
        "Key skills and topics covered in this class.",
    },

    trainer: {
      eyebrow: "YOUR TRAINER",
      heading: "Your Trainer",
      subheading:
        "Learn with an experienced trainer.",
    },

    fee: {
      eyebrow: "COURSE FEE",
      heading: "Course Fee",
      subheading: "",
    },

    booking: {
      buttonText: "Book This Class",
      backButtonText: "Back To Classes",
    },

    navigation: {
      backText: "Back To Classes",
    },
  },
};


/* =========================================================
   GENERIC VALUE HELPERS
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


/* =========================================================
   BRANDING HELPERS
========================================================= */

const getBrandingValue = (
  branding,
  camelCaseKey,
  snakeCaseKey,
  fallback
) => {
  const value =
    branding?.[camelCaseKey] ??
    branding?.[snakeCaseKey];

  return (
    value !== undefined &&
    value !== null &&
    value !== ""
  )
    ? value
    : fallback;
};


const normalizeBranding = (
  branding = {}
) => ({
  navbarColor: getBrandingValue(
    branding,
    "navbarColor",
    "navbar_color",
    DEFAULT_BRANDING.navbarColor
  ),

  headingColor: getBrandingValue(
    branding,
    "headingColor",
    "heading_color",
    DEFAULT_BRANDING.headingColor
  ),

  subheadingColor: getBrandingValue(
    branding,
    "subheadingColor",
    "subheading_color",
    DEFAULT_BRANDING.subheadingColor
  ),

  textColor: getBrandingValue(
    branding,
    "textColor",
    "text_color",
    DEFAULT_BRANDING.textColor
  ),

  iconColor: getBrandingValue(
    branding,
    "iconColor",
    "icon_color",
    DEFAULT_BRANDING.iconColor
  ),

  buttonColor: getBrandingValue(
    branding,
    "buttonColor",
    "button_color",
    DEFAULT_BRANDING.buttonColor
  ),

  buttonTextColor: getBrandingValue(
    branding,
    "buttonTextColor",
    "button_text_color",
    DEFAULT_BRANDING.buttonTextColor
  ),

  pageBackgroundColor:
    getBrandingValue(
      branding,
      "pageBackgroundColor",
      "page_background_color",
      DEFAULT_BRANDING.pageBackgroundColor
    ),

  cardBackgroundColor:
    getBrandingValue(
      branding,
      "cardBackgroundColor",
      "card_background_color",
      DEFAULT_BRANDING.cardBackgroundColor
    ),

  footerBackgroundColor:
    getBrandingValue(
      branding,
      "footerBackgroundColor",
      "footer_background_color",
      DEFAULT_BRANDING.footerBackgroundColor
    ),

  footerHeadingColor:
    getBrandingValue(
      branding,
      "footerHeadingColor",
      "footer_heading_color",
      DEFAULT_BRANDING.footerHeadingColor
    ),

  footerTextColor:
    getBrandingValue(
      branding,
      "footerTextColor",
      "footer_text_color",
      DEFAULT_BRANDING.footerTextColor
    ),

  fontHeading:
    getBrandingValue(
      branding,
      "fontHeading",
      "font_heading",
      DEFAULT_BRANDING.fontHeading
    ),

  fontSubheading:
    getBrandingValue(
      branding,
      "fontSubheading",
      "font_subheading",
      DEFAULT_BRANDING.fontSubheading
    ),

  fontBody:
    getBrandingValue(
      branding,
      "fontBody",
      "font_body",
      DEFAULT_BRANDING.fontBody
    ),

  headingWeight:
    getBrandingValue(
      branding,
      "headingWeight",
      "heading_weight",
      DEFAULT_BRANDING.headingWeight
    ),

  headingLineHeight:
    getBrandingValue(
      branding,
      "headingLineHeight",
      "heading_line_height",
      DEFAULT_BRANDING.headingLineHeight
    ),

  headingLetterSpacing:
    getBrandingValue(
      branding,
      "headingLetterSpacing",
      "heading_letter_spacing",
      DEFAULT_BRANDING.headingLetterSpacing
    ),

  subheadingWeight:
    getBrandingValue(
      branding,
      "subheadingWeight",
      "subheading_weight",
      DEFAULT_BRANDING.subheadingWeight
    ),

  subheadingLineHeight:
    getBrandingValue(
      branding,
      "subheadingLineHeight",
      "subheading_line_height",
      DEFAULT_BRANDING.subheadingLineHeight
    ),

  bodyWeight:
    getBrandingValue(
      branding,
      "bodyWeight",
      "body_weight",
      DEFAULT_BRANDING.bodyWeight
    ),

  bodyLineHeight:
    getBrandingValue(
      branding,
      "bodyLineHeight",
      "body_line_height",
      DEFAULT_BRANDING.bodyLineHeight
    ),

  bodyLetterSpacing:
    getBrandingValue(
      branding,
      "bodyLetterSpacing",
      "body_letter_spacing",
      DEFAULT_BRANDING.bodyLetterSpacing
    ),

  roundedButtons:
    getBrandingValue(
      branding,
      "roundedButtons",
      "rounded_buttons",
      DEFAULT_BRANDING.roundedButtons
    ),
});


const fontFamily = (font) =>
  font
    ? `'${font}', sans-serif`
    : "Inter, sans-serif";


const getButtonRadius = (
  branding,
  large = false
) => {
  if (branding.roundedButtons) {
    return "9999px";
  }

  return large ? "12px" : "8px";
};


const hexToRgba = (
  color,
  alpha
) => {
  if (
    typeof color !== "string"
  ) {
    return color;
  }

  const hex =
    color.replace("#", "");

  if (
    !/^[0-9A-Fa-f]{6}$/.test(hex)
  ) {
    return color;
  }

  const r = parseInt(
    hex.substring(0, 2),
    16
  );

  const g = parseInt(
    hex.substring(2, 4),
    16
  );

  const b = parseInt(
    hex.substring(4, 6),
    16
  );

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};


/* =========================================================
   CONTENT NORMALIZER
========================================================= */

const normalizeContent = (
  content = {}
) => {
  const source =
    content?.classDetail ||
    content?.class_detail ||
    content ||
    {};

  return {
    classDetail: {
      eyebrow:
        getValue(
          source?.eyebrow,
          source?.eyebrow_text,
          DEFAULT_CONTENT.classDetail.eyebrow
        ),

      heading:
        getValue(
          source?.heading,
          source?.title,
          DEFAULT_CONTENT.classDetail.heading
        ),

      subheading:
        getValue(
          source?.subheading,
          source?.subtitle,
          DEFAULT_CONTENT.classDetail.subheading
        ),

      about: {
        heading:
          getValue(
            source?.about?.heading,
            source?.about_heading,
            DEFAULT_CONTENT.classDetail.about.heading
          ),

        subheading:
          getValue(
            source?.about?.subheading,
            source?.about_subheading,
            DEFAULT_CONTENT.classDetail.about.subheading
          ),
      },

      information: {
        heading:
          getValue(
            source?.information?.heading,
            source?.information_heading,
            DEFAULT_CONTENT.classDetail.information.heading
          ),

        subheading:
          getValue(
            source?.information?.subheading,
            source?.information_subheading,
            DEFAULT_CONTENT.classDetail.information.subheading
          ),
      },

      schedule: {
        heading:
          getValue(
            source?.schedule?.heading,
            source?.schedule_heading,
            DEFAULT_CONTENT.classDetail.schedule.heading
          ),

        subheading:
          getValue(
            source?.schedule?.subheading,
            source?.schedule_subheading,
            DEFAULT_CONTENT.classDetail.schedule.subheading
          ),
      },

      sessions: {
        heading:
          getValue(
            source?.sessions?.heading,
            source?.sessions_heading,
            DEFAULT_CONTENT.classDetail.sessions.heading
          ),

        subheading:
          getValue(
            source?.sessions?.subheading,
            source?.sessions_subheading,
            DEFAULT_CONTENT.classDetail.sessions.subheading
          ),
      },

      skills: {
        heading:
          getValue(
            source?.skills?.heading,
            source?.skills_heading,
            DEFAULT_CONTENT.classDetail.skills.heading
          ),

        subheading:
          getValue(
            source?.skills?.subheading,
            source?.skills_subheading,
            DEFAULT_CONTENT.classDetail.skills.subheading
          ),
      },

      trainer: {
        eyebrow:
          getValue(
            source?.trainer?.eyebrow,
            source?.trainer_eyebrow,
            DEFAULT_CONTENT.classDetail.trainer.eyebrow
          ),

        heading:
          getValue(
            source?.trainer?.heading,
            source?.trainer_heading,
            DEFAULT_CONTENT.classDetail.trainer.heading
          ),

        subheading:
          getValue(
            source?.trainer?.subheading,
            source?.trainer_subheading,
            DEFAULT_CONTENT.classDetail.trainer.subheading
          ),
      },

      fee: {
        eyebrow:
          getValue(
            source?.fee?.eyebrow,
            source?.fee_eyebrow,
            DEFAULT_CONTENT.classDetail.fee.eyebrow
          ),

        heading:
          getValue(
            source?.fee?.heading,
            source?.fee_heading,
            DEFAULT_CONTENT.classDetail.fee.heading
          ),

        subheading:
          getValue(
            source?.fee?.subheading,
            source?.fee_subheading,
            DEFAULT_CONTENT.classDetail.fee.subheading
          ),
      },

      booking: {
        buttonText:
          getValue(
            source?.booking?.buttonText,
            source?.booking?.button_text,
            source?.booking_button_text,
            DEFAULT_CONTENT.classDetail.booking.buttonText
          ),

        backButtonText:
          getValue(
            source?.booking?.backButtonText,
            source?.booking?.back_button_text,
            source?.back_button_text,
            DEFAULT_CONTENT.classDetail.booking.backButtonText
          ),
      },

      navigation: {
        backText:
          getValue(
            source?.navigation?.backText,
            source?.navigation?.back_text,
            source?.back_text,
            DEFAULT_CONTENT.classDetail.navigation.backText
          ),
      },
    },
  };
};


/* =========================================================
   SECTION NORMALIZER
========================================================= */

const normalizeSections = (
  sections = {}
) => {
  const source =
    sections?.classDetail ||
    sections?.class_detail ||
    sections ||
    {};

  const getSection = (
    key,
    aliases = []
  ) => {
    const values = [
      source?.[key],
      ...aliases.map(
        (alias) =>
          source?.[alias]
      ),
    ];

    for (
      const value of values
    ) {
      if (
        typeof value ===
        "boolean"
      ) {
        return value;
      }

      if (
        typeof value ===
        "object" &&
        value !== null &&
        typeof value.visible ===
          "boolean"
      ) {
        return value.visible;
      }

      if (
        typeof value ===
        "object" &&
        value !== null &&
        typeof value.is_visible ===
          "boolean"
      ) {
        return value.is_visible;
      }
    }

    return true;
  };

  return {
    hero: getSection(
      "hero",
      ["banner"]
    ),

    about: getSection(
      "about",
      ["aboutClass"]
    ),

    information: getSection(
      "information",
      [
        "classInformation",
        "class_information",
      ]
    ),

    schedule: getSection(
      "schedule"
    ),

    sessions: getSection(
      "sessions",
      ["upcomingSessions"]
    ),

    skills: getSection(
      "skills",
      ["whatYouWillLearn"]
    ),

    trainer: getSection(
      "trainer",
      ["sidebar"]
    ),

    booking: getSection(
      "booking",
      ["cta"]
    ),
  };
};


/* =========================================================
   CLASS HELPERS
========================================================= */

const getClassTitle = (
  data
) =>
  getValue(
    data?.title,
    data?.class_title,
    data?.className,
    data?.name,
    "Class"
  );


const getClassDescription = (
  data
) =>
  getValue(
    data?.description,
    data?.class_description,
    data?.about,
    data?.overview,
    "No description available."
  );


const getClassImage = (
  data
) =>
  getValue(
    data?.image,
    data?.image_url,
    data?.class_image,
    data?.class_image_url,
    data?.thumbnail,
    data?.thumbnail_url,
    data?.banner_image,
    ""
  );


const getTrainerName = (
  data
) =>
  getValue(
    data?.trainer_name,
    data?.trainerName,
    data?.trainer?.full_name,
    data?.trainer?.name,
    "Trainer"
  );


const getTrainerImage = (
  data
) =>
  getValue(
    data?.trainer_image,
    data?.trainerImage,
    data?.trainer?.profile_image,
    data?.trainer?.image,
    data?.trainer?.image_url,
    ""
  );


const getInstituteName = (
  data
) =>
  getValue(
    data?.institute_name,
    data?.instituteName,
    data?.institute?.name,
    "Institute"
  );


const getLevel = (
  data
) =>
  getValue(
    data?.level,
    data?.class_level,
    data?.difficulty,
    "All Levels"
  );


const getDuration = (
  data
) =>
  getValue(
    data?.duration,
    data?.class_duration,
    data?.duration_minutes,
    "--"
  );


const getPrice = (
  data
) =>
  Number(
    getValue(
      data?.price,
      data?.class_price,
      data?.monthly_price,
      0
    )
  );


const getRating = (
  data
) =>
  Number(
    getValue(
      data?.rating,
      data?.trainer_rating,
      0
    )
  );


const getStudents = (
  data
) =>
  Number(
    getValue(
      data?.students,
      data?.students_count,
      data?.total_students,
      0
    )
  );


const getAvailableDays = (
  data
) => {
  const days =
    getValue(
      data?.available_days,
      data?.days,
      data?.schedule_days
    );

  if (Array.isArray(days)) {
    return days;
  }

  if (
    typeof days ===
    "string"
  ) {
    return days
      .split(",")
      .map(
        (item) =>
          item.trim()
      )
      .filter(Boolean);
  }

  return [];
};


const formatDate = (
  value
) => {
  if (!value) return "--";

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


const formatTime = (
  value
) => {
  if (!value) return "--";

  const text =
    String(value);

  if (
    text
      .toLowerCase()
      .includes("am") ||
    text
      .toLowerCase()
      .includes("pm")
  ) {
    return text;
  }

  const parts =
    text.split(":");

  if (
    parts.length < 2
  ) {
    return text;
  }

  const hours =
    Number(parts[0]);

  const minutes =
    Number(parts[1]);

  if (
    Number.isNaN(hours) ||
    Number.isNaN(minutes)
  ) {
    return text;
  }

  const period =
    hours >= 12
      ? "PM"
      : "AM";

  const hour =
    hours % 12 || 12;

  return `${hour}:${String(
    minutes
  ).padStart(2, "0")} ${period}`;
};


const getTimezone = (
  data
) =>
  getValue(
    data?.timezone,
    data?.class_timezone,
    data?.time_zone,
    "Asia/Kolkata"
  );


const getCategoryName = (
  data
) =>
  getValue(
    data?.category_name,
    data?.category?.name,
    data?.categoryName,
    "General"
  );


const getSubcategoryName = (
  data
) =>
  getValue(
    data?.subcategory_name,
    data?.subcategory?.name,
    data?.subcategoryName,
    ""
  );


/* =========================================================
   STAR RATING
========================================================= */

const StarRating = ({
  rating = 0,
  branding,
}) => {
  const value =
    Math.max(
      0,
      Math.min(
        5,
        Number(rating) || 0
      )
    );

  return (
    <div className="flex items-center gap-1">
      <div
        className="text-sm tracking-[2px]"
        aria-label={`Rating ${value.toFixed(
          1
        )} out of 5`}
      >
        {[1, 2, 3, 4, 5].map(
          (star) => (
            <span
              key={star}
              style={{
                color:
                  star <=
                  Math.round(value)
                    ? branding.iconColor
                    : hexToRgba(
                        branding.textColor,
                        0.18
                      ),
              }}
            >
              ★
            </span>
          )
        )}
      </div>

      <span
        className="ml-1 text-sm"
        style={{
          color:
            branding.textColor,
          fontFamily:
            fontFamily(
              branding.fontBody
            ),
          fontWeight:
            branding.bodyWeight,
        }}
      >
        {value.toFixed(1)}
      </span>
    </div>
  );
};


/* =========================================================
   INFO ITEM
========================================================= */

const InfoItem = ({
  icon: Icon,
  label,
  value,
  branding,
}) => (
  <div className="flex items-start gap-3">
    <div
      className="
        mt-0.5
        flex
        h-9
        w-9
        shrink-0
        items-center
        justify-center
      "
      style={{
        backgroundColor:
          hexToRgba(
            branding.buttonColor,
            0.1
          ),
        color:
          branding.iconColor,
        borderRadius: "10px",
      }}
    >
      <Icon size={15} />
    </div>

    <div className="min-w-0">
      <p
        className="text-xs"
        style={{
          color:
            branding.textColor,
          opacity: 0.65,
          fontFamily:
            fontFamily(
              branding.fontBody
            ),
          fontWeight:
            branding.bodyWeight,
        }}
      >
        {label}
      </p>

      <p
        className="
          mt-0.5
          break-words
          text-sm
        "
        style={{
          color:
            branding.headingColor,
          fontFamily:
            fontFamily(
              branding.fontBody
            ),
          fontWeight:
            branding.headingWeight,
        }}
      >
        {value || "--"}
      </p>
    </div>
  </div>
);


/* =========================================================
   SECTION HEADER
========================================================= */

const SectionHeader = ({
  eyebrow,
  heading,
  subheading,
  branding,
  centered = false,
}) => (
  <div
    className={
      centered
        ? "text-center"
        : ""
    }
  >
    {eyebrow && (
      <p
        className="
          text-xs
          uppercase
          tracking-[0.18em]
        "
        style={{
          color:
            branding.subheadingColor,
          fontFamily:
            fontFamily(
              branding.fontSubheading
            ),
          fontWeight:
            branding.subheadingWeight,
        }}
      >
        {eyebrow}
      </p>
    )}

    {heading && (
      <h2
        className="
          mt-1
          text-2xl
          sm:text-3xl
        "
        style={{
          color:
            branding.headingColor,
          fontFamily:
            fontFamily(
              branding.fontHeading
            ),
          fontWeight:
            branding.headingWeight,
          lineHeight:
            branding.headingLineHeight,
          letterSpacing:
            branding.headingLetterSpacing,
        }}
      >
        {heading}
      </h2>
    )}

    {subheading && (
      <p
        className="
          mt-2
          max-w-2xl
          text-sm
        "
        style={{
          color:
            branding.textColor,
          opacity: 0.68,
          fontFamily:
            fontFamily(
              branding.fontBody
            ),
          fontWeight:
            branding.bodyWeight,
          lineHeight:
            branding.bodyLineHeight,
        }}
      >
        {subheading}
      </p>
    )}
  </div>
);


/* =========================================================
   SESSION ITEM
========================================================= */

const SessionItem = ({
  session,
  branding,
}) => {
  const sessionDate =
    getValue(
      session?.session_date,
      session?.date,
      session?.start_date
    );

  const startTime =
    getValue(
      session?.start_time,
      session?.startTime
    );

  const endTime =
    getValue(
      session?.end_time,
      session?.endTime
    );

  const timezone =
    getValue(
      session?.timezone,
      session?.time_zone,
      "Asia/Kolkata"
    );

  return (
    <div
      className="
        border
        p-4
        transition
        hover:shadow-sm
      "
      style={{
        backgroundColor:
          branding.cardBackgroundColor,
        borderColor:
          hexToRgba(
            branding.textColor,
            0.12
          ),
        borderRadius:
          "12px",
      }}
    >
      <div
        className="
          flex
          flex-col
          gap-4
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div className="flex items-start gap-3">
          <div
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
            "
            style={{
              backgroundColor:
                hexToRgba(
                  branding.buttonColor,
                  0.1
                ),
              color:
                branding.iconColor,
              borderRadius:
                "10px",
            }}
          >
            <FaCalendarAlt />
          </div>

          <div>
            <p
              className="text-sm"
              style={{
                color:
                  branding.headingColor,
                fontFamily:
                  fontFamily(
                    branding.fontHeading
                  ),
                fontWeight:
                  branding.headingWeight,
              }}
            >
              {formatDate(
                sessionDate
              )}
            </p>

            <p
              className="
                mt-1
                text-xs
              "
              style={{
                color:
                  branding.textColor,
                opacity: 0.7,
                fontFamily:
                  fontFamily(
                    branding.fontBody
                  ),
              }}
            >
              {startTime
                ? formatTime(
                    startTime
                  )
                : "--"}

              {endTime
                ? ` - ${formatTime(
                    endTime
                  )}`
                : ""}
            </p>
          </div>
        </div>

        <div
          className="
            flex
            items-center
            gap-2
            text-xs
          "
          style={{
            color:
              branding.textColor,
            fontFamily:
              fontFamily(
                branding.fontBody
              ),
          }}
        >
          <FaGlobe
            style={{
              color:
                branding.iconColor,
            }}
          />

          {timezone}
        </div>
      </div>
    </div>
  );
};


/* =========================================================
   MAIN COMPONENT
========================================================= */

const WebsiteClassDetail = () => {
  const {
    classId,
  } = useParams();

  const navigate =
    useNavigate();

  const outletContext =
    useOutletContext() || {};

  /* =======================================================
     BRANDING
  ======================================================= */

  const branding =
    useMemo(
      () =>
        normalizeBranding(
          outletContext?.branding ||
            outletContext?.websiteBranding ||
            outletContext?.brand ||
            {}
        ),
      [
        outletContext?.branding,
        outletContext?.websiteBranding,
        outletContext?.brand,
      ]
    );


  /* =======================================================
     CONTENT
  ======================================================= */

  const content =
    useMemo(
      () =>
        normalizeContent(
          outletContext?.content ||
            outletContext?.websiteContent ||
            outletContext?.contents ||
            {}
        ),
      [
        outletContext?.content,
        outletContext?.websiteContent,
        outletContext?.contents,
      ]
    );


  /* =======================================================
     SECTIONS
  ======================================================= */

  const sections =
    useMemo(
      () =>
        normalizeSections(
          outletContext?.sections ||
            outletContext?.websiteSections ||
            {}
        ),
      [
        outletContext?.sections,
        outletContext?.websiteSections,
      ]
    );


  /* =======================================================
     STATE
  ======================================================= */

  const [
    classData,
    setClassData,
  ] = useState(null);

  const [
    sessions,
    setSessions,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    sessionsLoading,
    setSessionsLoading,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  const [
    sessionError,
    setSessionError,
  ] = useState("");

  const [
    showAllSessions,
    setShowAllSessions,
  ] = useState(false);

  const [
    showBooking,
    setShowBooking,
  ] = useState(false);


  /* =======================================================
     FETCH CLASS
  ======================================================= */

  useEffect(() => {
    let mounted = true;

    const fetchClass =
      async () => {
        if (!classId) {
          if (mounted) {
            setError(
              "Class ID is missing."
            );
            setLoading(false);
          }

          return;
        }

        try {
          setLoading(true);
          setError("");

          const response =
            await getClassById(
              classId
            );

          let data =
            response?.data?.data ??
            response?.data?.class ??
            response?.data ??
            response?.class ??
            response;

          if (
            data?.data &&
            typeof data.data ===
              "object"
          ) {
            data =
              data.data;
          }

          if (
            !data ||
            typeof data !==
              "object"
          ) {
            throw new Error(
              "Class data was not returned by the server."
            );
          }

          if (mounted) {
            setClassData(
              data
            );
          }
        } catch (err) {
          console.error(
            "CLASS DETAIL ERROR:",
            err
          );

          if (mounted) {
            setError(
              err?.response
                ?.data?.message ||
                err?.response
                  ?.data?.error ||
                err?.message ||
                "Failed to load class details."
            );
          }
        } finally {
          if (mounted) {
            setLoading(false);
          }
        }
      };

    fetchClass();

    return () => {
      mounted = false;
    };
  }, [classId]);


  /* =======================================================
     FETCH SESSIONS
  ======================================================= */

  useEffect(() => {
    let mounted = true;

    const fetchSessions =
      async () => {
        if (!classId) {
          return;
        }

        try {
          setSessionsLoading(
            true
          );

          setSessionError("");

          const response =
            await getClassSessions(
              classId
            );

          let data =
            response?.data?.data ??
            response?.data?.sessions ??
            response?.data ??
            response?.sessions ??
            response;

          if (
            !Array.isArray(data)
          ) {
            data = [];
          }

          if (mounted) {
            setSessions(
              data
            );
          }
        } catch (err) {
          console.error(
            "SESSION FETCH ERROR:",
            err
          );

          if (mounted) {
            setSessions([]);

            setSessionError(
              err?.response
                ?.data?.message ||
                err?.message ||
                "Unable to load sessions."
            );
          }
        } finally {
          if (mounted) {
            setSessionsLoading(
              false
            );
          }
        }
      };

    fetchSessions();

    return () => {
      mounted = false;
    };
  }, [classId]);


  /* =======================================================
     DERIVED DATA
  ======================================================= */

  const title =
    getClassTitle(
      classData
    );

  const description =
    getClassDescription(
      classData
    );

  const image =
    getClassImage(
      classData
    );

  const trainerName =
    getTrainerName(
      classData
    );

  const trainerImage =
    getTrainerImage(
      classData
    );

  const instituteName =
    getInstituteName(
      classData
    );

  const categoryName =
    getCategoryName(
      classData
    );

  const subcategoryName =
    getSubcategoryName(
      classData
    );

  const level =
    getLevel(
      classData
    );

  const duration =
    getDuration(
      classData
    );

  const rating =
    getRating(
      classData
    );

  const students =
    getStudents(
      classData
    );

  const price =
    getPrice(
      classData
    );

  const availableDays =
    getAvailableDays(
      classData
    );

  const startDate =
    getValue(
      classData?.start_date,
      classData?.startDate
    );

  const startTime =
    getValue(
      classData?.start_time,
      classData?.startTime
    );

  const timezone =
    getTimezone(
      classData
    );

  const visibleSessions =
    showAllSessions
      ? sessions
      : sessions.slice(
          0,
          5
        );


  /* =======================================================
     SHARED STYLES
  ======================================================= */

  const headingStyle = {
    color:
      branding.headingColor,

    fontFamily:
      fontFamily(
        branding.fontHeading
      ),

    fontWeight:
      branding.headingWeight,

    lineHeight:
      branding.headingLineHeight,

    letterSpacing:
      branding.headingLetterSpacing,
  };


  const bodyStyle = {
    color:
      branding.textColor,

    fontFamily:
      fontFamily(
        branding.fontBody
      ),

    fontWeight:
      branding.bodyWeight,

    lineHeight:
      branding.bodyLineHeight,

    letterSpacing:
      branding.bodyLetterSpacing,
  };


  const buttonStyle = {
    backgroundColor:
      branding.buttonColor,

    color:
      branding.buttonTextColor,

    borderRadius:
      getButtonRadius(
        branding,
        true
      ),

    fontFamily:
      fontFamily(
        branding.fontBody
      ),

    fontWeight:
      branding.bodyWeight,
  };


  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <div
        className="
          flex
          min-h-[550px]
          items-center
          justify-center
        "
        style={{
          backgroundColor:
            branding.pageBackgroundColor,
        }}
      >
        <div className="text-center">
          <div
            className="
              mx-auto
              mb-5
              h-12
              w-12
              animate-spin
              rounded-full
              border-4
            "
            style={{
              borderColor:
                hexToRgba(
                  branding.buttonColor,
                  0.2
                ),
              borderTopColor:
                branding.buttonColor,
            }}
          />

          <p style={bodyStyle}>
            Loading class details...
          </p>
        </div>
      </div>
    );
  }


  /* =======================================================
     ERROR
  ======================================================= */

  if (error) {
    return (
      <div
        className="
          flex
          min-h-[550px]
          items-center
          justify-center
          px-6
        "
        style={{
          backgroundColor:
            branding.pageBackgroundColor,
        }}
      >
        <div className="max-w-lg text-center">
          <div
            className="
              mx-auto
              flex
              h-16
              w-16
              items-center
              justify-center
              text-2xl
            "
            style={{
              backgroundColor:
                "rgba(239,68,68,0.08)",
              color:
                "#EF4444",
              borderRadius:
                "50%",
            }}
          >
            !
          </div>

          <h1
            className="
              mt-5
              text-2xl
            "
            style={headingStyle}
          >
            Unable to Load Class
          </h1>

          <p
            className="
              mt-3
              text-sm
            "
            style={{
              ...bodyStyle,
              opacity: 0.7,
            }}
          >
            {error}
          </p>

          <p
            className="
              mt-2
              text-xs
            "
            style={{
              ...bodyStyle,
              opacity: 0.5,
            }}
          >
            Class ID: {classId}
          </p>

          <button
            type="button"
            onClick={() =>
              navigate(
                "/institute/website/preview/classes"
              )
            }
            className="
              mt-6
              inline-flex
              items-center
              gap-2
              px-6
              py-3
            "
            style={buttonStyle}
          >
            <FaArrowLeft />
            {content.classDetail.navigation.backText}
          </button>
        </div>
      </div>
    );
  }


  /* =======================================================
     NOT FOUND
  ======================================================= */

  if (!classData) {
    return (
      <div
        className="
          flex
          min-h-[550px]
          items-center
          justify-center
        "
        style={{
          backgroundColor:
            branding.pageBackgroundColor,
        }}
      >
        <div className="text-center">
          <h1
            className="text-3xl"
            style={headingStyle}
          >
            Class Not Found
          </h1>

          <button
            type="button"
            onClick={() =>
              navigate(
                "/institute/website/preview/classes"
              )
            }
            className="
              mt-6
              px-6
              py-3
            "
            style={buttonStyle}
          >
            {content.classDetail.booking.backButtonText}
          </button>
        </div>
      </div>
    );
  }


  /* =======================================================
     MAIN
  ======================================================= */

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor:
          branding.pageBackgroundColor,
        ...bodyStyle,
      }}
    >

      {/* ===================================================
          HERO
      =================================================== */}

      {sections.hero && (
        <section
          style={{
            backgroundColor:
              branding.navbarColor,
          }}
        >
          <div
            className="
              mx-auto
              max-w-7xl
              px-4
              py-6
              sm:px-6
              lg:px-8
            "
          >

            <button
              type="button"
              onClick={() =>
                navigate(
                  "/institute/website/preview/classes"
                )
              }
              className="
                mb-5
                inline-flex
                items-center
                gap-2
                text-sm
              "
              style={{
                color:
                  branding.buttonTextColor,
                fontFamily:
                  fontFamily(
                    branding.fontBody
                  ),
                fontWeight:
                  branding.bodyWeight,
              }}
            >
              <FaArrowLeft />
              {content.classDetail.navigation.backText}
            </button>


            <div
              className="
                overflow-hidden
                border
                shadow-sm
              "
              style={{
                backgroundColor:
                  branding.cardBackgroundColor,
                borderColor:
                  hexToRgba(
                    branding.buttonTextColor,
                    0.12
                  ),
                borderRadius:
                  "18px",
              }}
            >

              <div
                className="
                  relative
                  aspect-[16/7]
                  min-h-[260px]
                  overflow-hidden
                "
                style={{
                  backgroundColor:
                    branding.navbarColor,
                }}
              >

                {image ? (
                  <img
                    src={image}
                    alt={title}
                    className="
                      h-full
                      w-full
                      object-cover
                    "
                  />
                ) : (
                  <div
                    className="
                      flex
                      h-full
                      w-full
                      items-center
                      justify-center
                    "
                    style={{
                      color:
                        branding.buttonTextColor,
                    }}
                  >
                    No Class Image
                  </div>
                )}


                <div
                  className="
                    absolute
                    inset-0
                  "
                  style={{
                    background:
                      `linear-gradient(
                        to top,
                        rgba(0,0,0,0.78),
                        rgba(0,0,0,0.18),
                        transparent
                      )`,
                  }}
                />


                <div
                  className="
                    absolute
                    bottom-6
                    left-5
                    right-5
                    sm:left-8
                    sm:right-8
                  "
                >

                  <div
                    className="
                      mb-3
                      flex
                      flex-wrap
                      gap-2
                    "
                  >
                    <span
                      className="
                        px-3
                        py-1
                        text-xs
                      "
                      style={{
                        backgroundColor:
                          branding.buttonColor,
                        color:
                          branding.buttonTextColor,
                        borderRadius:
                          getButtonRadius(
                            branding
                          ),
                        fontFamily:
                          fontFamily(
                            branding.fontBody
                          ),
                        fontWeight:
                          branding.bodyWeight,
                      }}
                    >
                      {categoryName}
                    </span>

                    {subcategoryName && (
                      <span
                        className="
                          px-3
                          py-1
                          text-xs
                        "
                        style={{
                          backgroundColor:
                            branding.cardBackgroundColor,
                          color:
                            branding.buttonColor,
                          borderRadius:
                            getButtonRadius(
                              branding
                            ),
                          fontFamily:
                            fontFamily(
                              branding.fontBody
                            ),
                          fontWeight:
                            branding.bodyWeight,
                        }}
                      >
                        {subcategoryName}
                      </span>
                    )}

                    <span
                      className="
                        px-3
                        py-1
                        text-xs
                      "
                      style={{
                        backgroundColor:
                          "rgba(0,0,0,0.6)",
                        color:
                          "#FFFFFF",
                        borderRadius:
                          getButtonRadius(
                            branding
                          ),
                        fontFamily:
                          fontFamily(
                            branding.fontBody
                          ),
                        fontWeight:
                          branding.bodyWeight,
                      }}
                    >
                      {level}
                    </span>
                  </div>


                  {content.classDetail.eyebrow && (
                    <p
                      className="
                        mb-2
                        text-xs
                        uppercase
                        tracking-[0.18em]
                      "
                      style={{
                        color:
                          branding.buttonTextColor,
                        fontFamily:
                          fontFamily(
                            branding.fontSubheading
                          ),
                        fontWeight:
                          branding.subheadingWeight,
                        opacity: 0.85,
                      }}
                    >
                      {content.classDetail.eyebrow}
                    </p>
                  )}


                  <h1
                    className="
                      max-w-4xl
                      text-3xl
                      sm:text-4xl
                      lg:text-5xl
                    "
                    style={{
                      color:
                        branding.buttonTextColor,
                      fontFamily:
                        fontFamily(
                          branding.fontHeading
                        ),
                      fontWeight:
                        branding.headingWeight,
                      lineHeight:
                        branding.headingLineHeight,
                      letterSpacing:
                        branding.headingLetterSpacing,
                    }}
                  >
                    {title ||
                      content.classDetail.heading}
                  </h1>


                  {content.classDetail.subheading && (
                    <p
                      className="
                        mt-3
                        max-w-2xl
                        text-sm
                        sm:text-base
                      "
                      style={{
                        color:
                          branding.buttonTextColor,
                        fontFamily:
                          fontFamily(
                            branding.fontBody
                          ),
                        fontWeight:
                          branding.bodyWeight,
                        lineHeight:
                          branding.bodyLineHeight,
                        opacity: 0.88,
                      }}
                    >
                      {content.classDetail.subheading}
                    </p>
                  )}

                </div>

              </div>
            </div>
          </div>
        </section>
      )}


      {/* ===================================================
          MAIN CONTENT
      =================================================== */}

      <section
        className="
          mx-auto
          max-w-7xl
          px-4
          py-8
          sm:px-6
          lg:px-8
        "
      >

        <div
          className="
            grid
            grid-cols-1
            gap-8
            lg:grid-cols-[1fr_360px]
          "
        >

          {/* =================================================
              LEFT
          ================================================= */}

          <div className="space-y-8">

            {/* ABOUT */}

            {sections.about && (
              <div
                className="
                  border
                  p-6
                  shadow-sm
                  sm:p-8
                "
                style={{
                  backgroundColor:
                    branding.cardBackgroundColor,
                  borderColor:
                    hexToRgba(
                      branding.textColor,
                      0.12
                    ),
                  borderRadius:
                    "18px",
                }}
              >

                <SectionHeader
                  heading={
                    content.classDetail.about.heading
                  }
                  subheading={
                    content.classDetail.about.subheading
                  }
                  branding={
                    branding
                  }
                />

                <div
                  className="
                    mt-5
                    whitespace-pre-line
                    text-sm
                  "
                  style={{
                    ...bodyStyle,
                    opacity: 0.72,
                  }}
                >
                  {description}
                </div>

              </div>
            )}


            {/* CLASS INFORMATION */}

            {sections.information && (
              <div
                className="
                  border
                  p-6
                  shadow-sm
                  sm:p-8
                "
                style={{
                  backgroundColor:
                    branding.cardBackgroundColor,
                  borderColor:
                    hexToRgba(
                      branding.textColor,
                      0.12
                    ),
                  borderRadius:
                    "18px",
                }}
              >

                <SectionHeader
                  heading={
                    content.classDetail.information.heading
                  }
                  subheading={
                    content.classDetail.information.subheading
                  }
                  branding={
                    branding
                  }
                />


                <div
                  className="
                    mt-6
                    grid
                    grid-cols-1
                    gap-5
                    sm:grid-cols-2
                  "
                >

                  <InfoItem
                    icon={
                      FaHourglassHalf
                    }
                    label="Level"
                    value={
                      level
                    }
                    branding={
                      branding
                    }
                  />

                  <InfoItem
                    icon={
                      FaClock
                    }
                    label="Duration"
                    value={
                      duration
                    }
                    branding={
                      branding
                    }
                  />

                  <InfoItem
                    icon={
                      FaUsers
                    }
                    label="Students"
                    value={
                      students
                    }
                    branding={
                      branding
                    }
                  />

                  <InfoItem
                    icon={
                      FaGlobe
                    }
                    label="Timezone"
                    value={
                      timezone
                    }
                    branding={
                      branding
                    }
                  />

                </div>
              </div>
            )}


            {/* SCHEDULE */}

            {sections.schedule && (
              <div
                className="
                  border
                  p-6
                  shadow-sm
                  sm:p-8
                "
                style={{
                  backgroundColor:
                    branding.cardBackgroundColor,
                  borderColor:
                    hexToRgba(
                      branding.textColor,
                      0.12
                    ),
                  borderRadius:
                    "18px",
                }}
              >

                <SectionHeader
                  heading={
                    content.classDetail.schedule.heading
                  }
                  subheading={
                    content.classDetail.schedule.subheading
                  }
                  branding={
                    branding
                  }
                />


                <div
                  className="
                    mt-6
                    grid
                    grid-cols-1
                    gap-4
                    sm:grid-cols-2
                  "
                >

                  <InfoItem
                    icon={
                      FaCalendarWeek
                    }
                    label="Available Days"
                    value={
                      availableDays.length
                        ? availableDays
                            .map(
                              (
                                day
                              ) =>
                                String(
                                  day
                                ).substring(
                                  0,
                                  3
                                )
                            )
                            .join(
                              " • "
                            )
                        : "--"
                    }
                    branding={
                      branding
                    }
                  />


                  <InfoItem
                    icon={
                      FaCalendarAlt
                    }
                    label="Start Date"
                    value={formatDate(
                      startDate
                    )}
                    branding={
                      branding
                    }
                  />


                  <InfoItem
                    icon={
                      FaClock
                    }
                    label="Start Time"
                    value={
                      startTime
                        ? `${formatTime(
                            startTime
                          )} ${timezone}`
                        : "--"
                    }
                    branding={
                      branding
                    }
                  />

                </div>
              </div>
            )}


            {/* SESSIONS */}

            {sections.sessions && (
              <div
                className="
                  border
                  p-6
                  shadow-sm
                  sm:p-8
                "
                style={{
                  backgroundColor:
                    branding.cardBackgroundColor,
                  borderColor:
                    hexToRgba(
                      branding.textColor,
                      0.12
                    ),
                  borderRadius:
                    "18px",
                }}
              >

                <SectionHeader
                  heading={
                    content.classDetail.sessions.heading
                  }
                  subheading={
                    content.classDetail.sessions.subheading
                  }
                  branding={
                    branding
                  }
                />


                {sessions.length >
                  0 && (
                  <div className="mt-3">
                    <span
                      className="
                        inline-flex
                        px-3
                        py-1
                        text-xs
                      "
                      style={{
                        backgroundColor:
                          hexToRgba(
                            branding.buttonColor,
                            0.1
                          ),
                        color:
                          branding.buttonColor,
                        borderRadius:
                          getButtonRadius(
                            branding
                          ),
                        fontFamily:
                          fontFamily(
                            branding.fontBody
                          ),
                        fontWeight:
                          branding.headingWeight,
                      }}
                    >
                      {sessions.length}{" "}
                      Sessions
                    </span>
                  </div>
                )}


                {sessionsLoading ? (
                  <div
                    className="
                      flex
                      items-center
                      justify-center
                      py-12
                    "
                  >
                    <div
                      className="
                        h-8
                        w-8
                        animate-spin
                        rounded-full
                        border-4
                      "
                      style={{
                        borderColor:
                          hexToRgba(
                            branding.buttonColor,
                            0.2
                          ),
                        borderTopColor:
                          branding.buttonColor,
                      }}
                    />
                  </div>
                ) : sessionError ? (
                  <div
                    className="
                      mt-6
                      p-5
                      text-center
                      text-sm
                    "
                    style={{
                      backgroundColor:
                        hexToRgba(
                          branding.textColor,
                          0.05
                        ),
                      color:
                        branding.textColor,
                      borderRadius:
                        "12px",
                      fontFamily:
                        fontFamily(
                          branding.fontBody
                        ),
                    }}
                  >
                    {sessionError}
                  </div>
                ) : sessions.length ===
                  0 ? (
                  <div
                    className="
                      mt-6
                      border
                      border-dashed
                      p-8
                      text-center
                      text-sm
                    "
                    style={{
                      borderColor:
                        hexToRgba(
                          branding.textColor,
                          0.18
                        ),
                      color:
                        branding.textColor,
                      opacity: 0.7,
                      borderRadius:
                        "12px",
                      fontFamily:
                        fontFamily(
                          branding.fontBody
                        ),
                    }}
                  >
                    No upcoming
                    sessions available.
                  </div>
                ) : (
                  <div className="mt-6 space-y-3">

                    {visibleSessions.map(
                      (
                        session,
                        index
                      ) => (
                        <SessionItem
                          key={
                            session?.id ||
                            session?.session_id ||
                            index
                          }
                          session={
                            session
                          }
                          branding={
                            branding
                          }
                        />
                      )
                    )}


                    {sessions.length >
                      5 && (
                      <button
                        type="button"
                        onClick={() =>
                          setShowAllSessions(
                            (
                              value
                            ) =>
                              !value
                          )
                        }
                        className="
                          mx-auto
                          mt-4
                          flex
                          items-center
                          gap-2
                          text-sm
                        "
                        style={{
                          color:
                            branding.buttonColor,
                          fontFamily:
                            fontFamily(
                              branding.fontBody
                            ),
                          fontWeight:
                            branding.headingWeight,
                        }}
                      >
                        {showAllSessions
                          ? "Show Less"
                          : "View All Sessions"}

                        {showAllSessions ? (
                          <FaChevronUp />
                        ) : (
                          <FaChevronDown />
                        )}
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}


            {/* SKILLS */}

            {sections.skills &&
              Array.isArray(
                classData?.skills
              ) &&
              classData.skills.length >
                0 && (
                <div
                  className="
                    border
                    p-6
                    shadow-sm
                    sm:p-8
                  "
                  style={{
                    backgroundColor:
                      branding.cardBackgroundColor,
                    borderColor:
                      hexToRgba(
                        branding.textColor,
                        0.12
                      ),
                    borderRadius:
                      "18px",
                  }}
                >

                  <SectionHeader
                    heading={
                      content.classDetail.skills.heading
                    }
                    subheading={
                      content.classDetail.skills.subheading
                    }
                    branding={
                      branding
                    }
                  />


                  <div
                    className="
                      mt-6
                      grid
                      grid-cols-1
                      gap-4
                      sm:grid-cols-2
                    "
                  >

                    {classData.skills.map(
                      (
                        skill,
                        index
                      ) => (
                        <div
                          key={index}
                          className="
                            flex
                            items-start
                            gap-3
                          "
                        >
                          <div
                            className="
                              mt-0.5
                              flex
                              h-6
                              w-6
                              shrink-0
                              items-center
                              justify-center
                            "
                            style={{
                              backgroundColor:
                                hexToRgba(
                                  branding.buttonColor,
                                  0.1
                                ),
                              color:
                                branding.iconColor,
                              borderRadius:
                                "50%",
                            }}
                          >
                            <FaCheck
                              size={11}
                            />
                          </div>

                          <span
                            className="
                              text-sm
                            "
                            style={{
                              ...bodyStyle,
                              opacity: 0.8,
                            }}
                          >
                            {typeof skill ===
                            "string"
                              ? skill
                              : skill?.name ||
                                skill?.title ||
                                "Skill"}
                          </span>
                        </div>
                      )
                    )}

                  </div>
                </div>
              )}

          </div>


          {/* =================================================
              RIGHT SIDEBAR
          ================================================= */}

          {sections.trainer && (
            <aside
              className="
                h-fit
                lg:sticky
                lg:top-6
              "
            >

              <div
                className="
                  overflow-hidden
                  border
                  shadow-sm
                "
                style={{
                  backgroundColor:
                    branding.cardBackgroundColor,
                  borderColor:
                    hexToRgba(
                      branding.textColor,
                      0.12
                    ),
                  borderRadius:
                    "18px",
                }}
              >

                {/* FEE */}

                <div
                  className="
                    border-b
                    p-6
                  "
                  style={{
                    backgroundColor:
                      hexToRgba(
                        branding.buttonColor,
                        0.05
                      ),
                    borderColor:
                      hexToRgba(
                        branding.textColor,
                        0.08
                      ),
                  }}
                >

                  <p
                    className="
                      text-xs
                      uppercase
                      tracking-wider
                    "
                    style={{
                      color:
                        branding.subheadingColor,
                      fontFamily:
                        fontFamily(
                          branding.fontSubheading
                        ),
                      fontWeight:
                        branding.subheadingWeight,
                    }}
                  >
                    {content.classDetail.fee.eyebrow}
                  </p>


                  <div className="mt-2">
                    <span
                      className="text-3xl"
                      style={{
                        color:
                          branding.buttonColor,
                        fontFamily:
                          fontFamily(
                            branding.fontHeading
                          ),
                        fontWeight:
                          branding.headingWeight,
                      }}
                    >
                      ₹
                      {price.toLocaleString(
                        "en-IN"
                      )}
                    </span>

                    <span
                      className="
                        ml-1
                        text-sm
                      "
                      style={{
                        ...bodyStyle,
                        opacity: 0.65,
                      }}
                    >
                      /month
                    </span>
                  </div>

                </div>


                {/* TRAINER */}

                <div className="p-6">

                  <p
                    className="
                      text-xs
                      uppercase
                      tracking-wider
                    "
                    style={{
                      color:
                        branding.subheadingColor,
                      fontFamily:
                        fontFamily(
                          branding.fontSubheading
                        ),
                      fontWeight:
                        branding.subheadingWeight,
                    }}
                  >
                    {content.classDetail.trainer.eyebrow}
                  </p>


                  <div
                    className="
                      mt-4
                      flex
                      items-center
                      gap-3
                    "
                  >

                    {trainerImage ? (
                      <img
                        src={
                          trainerImage
                        }
                        alt={
                          trainerName
                        }
                        className="
                          h-14
                          w-14
                          rounded-full
                          object-cover
                        "
                        style={{
                          boxShadow:
                            `0 0 0 2px ${hexToRgba(
                              branding.iconColor,
                              0.3
                            )}`,
                        }}
                      />
                    ) : (
                      <div
                        className="
                          flex
                          h-14
                          w-14
                          items-center
                          justify-center
                          rounded-full
                          text-lg
                        "
                        style={{
                          backgroundColor:
                            hexToRgba(
                              branding.buttonColor,
                              0.1
                            ),
                          color:
                            branding.buttonColor,
                          fontFamily:
                            fontFamily(
                              branding.fontHeading
                            ),
                          fontWeight:
                            branding.headingWeight,
                        }}
                      >
                        {String(
                          trainerName
                        )
                          .charAt(
                            0
                          )
                          .toUpperCase()}
                      </div>
                    )}


                    <div className="min-w-0">

                      <p
                        className="
                          truncate
                          text-base
                        "
                        style={{
                          color:
                            branding.headingColor,
                          fontFamily:
                            fontFamily(
                              branding.fontHeading
                            ),
                          fontWeight:
                            branding.headingWeight,
                        }}
                      >
                        {trainerName}
                      </p>


                      <p
                        className="
                          mt-1
                          text-xs
                        "
                        style={{
                          ...bodyStyle,
                          opacity: 0.65,
                        }}
                      >
                        {instituteName}
                      </p>


                      <div className="mt-1">
                        <StarRating
                          rating={
                            rating
                          }
                          branding={
                            branding
                          }
                        />
                      </div>

                    </div>

                  </div>


                  {/* TRAINER DETAILS */}

                  <div
                    className="
                      mt-6
                      space-y-4
                      border-t
                      pt-5
                    "
                    style={{
                      borderColor:
                        hexToRgba(
                          branding.textColor,
                          0.1
                        ),
                    }}
                  >

                    <InfoItem
                      icon={
                        FaClock
                      }
                      label="Duration"
                      value={
                        duration
                      }
                      branding={
                        branding
                      }
                    />

                    <InfoItem
                      icon={
                        FaUsers
                      }
                      label="Students"
                      value={`${students} Students`}
                      branding={
                        branding
                      }
                    />

                    <InfoItem
                      icon={
                        FaCalendarAlt
                      }
                      label="Start Date"
                      value={formatDate(
                        startDate
                      )}
                      branding={
                        branding
                      }
                    />

                  </div>


                  {/* BOOK BUTTON */}

                  {sections.booking && (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          setShowBooking(
                            true
                          )
                        }
                        className="
                          mt-7
                          flex
                          w-full
                          items-center
                          justify-center
                          gap-2
                          px-6
                          py-3.5
                          transition
                        "
                        style={
                          buttonStyle
                        }
                      >
                        {
                          content
                            .classDetail
                            .booking
                            .buttonText
                        }

                        <FaArrowRight
                          size={13}
                        />
                      </button>


                      <Link
                        to="/institute/website/preview/classes"
                        className="
                          mt-3
                          flex
                          w-full
                          items-center
                          justify-center
                          gap-2
                          border
                          px-6
                          py-3.5
                          text-sm
                          transition
                        "
                        style={{
                          backgroundColor:
                            branding.cardBackgroundColor,
                          color:
                            branding.buttonColor,
                          borderColor:
                            branding.buttonColor,
                          borderRadius:
                            getButtonRadius(
                              branding,
                              true
                            ),
                          fontFamily:
                            fontFamily(
                              branding.fontBody
                            ),
                          fontWeight:
                            branding.bodyWeight,
                        }}
                      >
                        <FaArrowLeft
                          size={12}
                        />

                        {
                          content
                            .classDetail
                            .booking
                            .backButtonText
                        }
                      </Link>
                    </>
                  )}

                </div>
              </div>
            </aside>
          )}

        </div>
      </section>


      {/* ===================================================
          BOOKING MODAL
      =================================================== */}

      {showBooking && (
        <WebsiteBooking
          classId={classId}
          classData={classData}
          sessions={sessions}
          onClose={() =>
            setShowBooking(
              false
            )
          }
        />
      )}

    </div>
  );
};


export default WebsiteClassDetail;