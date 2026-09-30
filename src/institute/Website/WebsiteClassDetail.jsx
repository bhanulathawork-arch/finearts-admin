
// import { useNavigate, useOutletContext, useParams } from "react-router-dom";
// import {
//   FaArrowLeft,
//   FaCalendarAlt,
//   FaCalendarWeek,
//   FaClock,
//   FaUser,
//   FaUsers,
//   FaChartBar,
// } from "react-icons/fa";

// import { getClassById } from "../../services/Classes.js";
// import WebsiteBooking from "./WebsiteBooking";

// /* =========================================================
//    BLACK + RADIANT BLUE CLASS DETAIL PAGE
//    Layout:
//    Row 1 = 50%  -> image / class information
//    Row 2 = 25%  -> class name / price / book
//    Row 3 = 25%  -> available days / trainer
// ========================================================= */

// const DEFAULT_BRANDING = {
//   fontHeading: "Inter",
//   fontBody: "Inter",
//   headingWeight: 700,
//   bodyWeight: 400,
//   roundedButtons: true,
// };

// const getValue = (...values) => {
//   for (const value of values) {
//     if (value !== undefined && value !== null && value !== "") return value;
//   }
//   return null;
// };

// const fontFamily = (font) => (font ? `'${font}', sans-serif` : "Inter, sans-serif");

// const normalizeBranding = (branding = {}) => ({
//   ...DEFAULT_BRANDING,
//   ...branding,
//   fontHeading: getValue(branding?.fontHeading, branding?.font_heading, DEFAULT_BRANDING.fontHeading),
//   fontBody: getValue(branding?.fontBody, branding?.font_body, DEFAULT_BRANDING.fontBody),
//   headingWeight: getValue(branding?.headingWeight, branding?.heading_weight, DEFAULT_BRANDING.headingWeight),
//   bodyWeight: getValue(branding?.bodyWeight, branding?.body_weight, DEFAULT_BRANDING.bodyWeight),
// });

// const getClassTitle = (data) =>
//   getValue(data?.title, data?.class_title, data?.className, data?.name, "Class");

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

// const getDuration = (data) =>
//   getValue(data?.duration, data?.class_duration, data?.duration_minutes, "--");

// const getLevel = (data) =>
//   getValue(data?.level, data?.class_level, data?.difficulty, "All Levels");

// const getStudents = (data) =>
//   Number(getValue(data?.students, data?.students_count, data?.total_students, 0)) || 0;

// const getPrice = (data) =>
//   Number(getValue(data?.price, data?.class_price, data?.monthly_price, 0)) || 0;

// const getTrainerId = (data) =>
//   getValue(
//     data?.trainer_id,
//     data?.trainerId,
//     data?.trainer?.id,
//     data?.trainer?.trainer_id,
//     null
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

// const getTrainerRating = (data) =>
//   Number(
//     getValue(
//       data?.trainer_rating,
//       data?.trainerRating,
//       data?.trainer?.rating,
//       data?.rating,
//       0
//     )
//   ) || 0;

// const getAvailableDays = (data) => {
//   const days = getValue(
//     data?.available_days,
//     data?.availableDays,
//     data?.days,
//     data?.schedule_days
//   );

//   if (Array.isArray(days)) return days;

//   if (typeof days === "string") {
//     return days.split(",").map((day) => day.trim()).filter(Boolean);
//   }

//   return [];
// };

// const formatDate = (value) => {
//   if (!value) return "--";
//   const date = new Date(value);
//   if (Number.isNaN(date.getTime())) return String(value);

//   return date.toLocaleDateString("en-IN", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });
// };

// const formatTime = (value) => {
//   if (!value) return "--";

//   const text = String(value);
//   if (/am|pm/i.test(text)) return text;

//   const [hoursRaw, minutesRaw] = text.split(":");
//   const hours = Number(hoursRaw);
//   const minutes = Number(minutesRaw);

//   if (Number.isNaN(hours) || Number.isNaN(minutes)) return text;

//   const period = hours >= 12 ? "PM" : "AM";
//   const hour = hours % 12 || 12;

//   return `${hour}:${String(minutes).padStart(2, "0")} ${period}`;
// };

// const hexToRgba = (hex, alpha = 1) => {
//   if (typeof hex !== "string") return hex;
//   const clean = hex.replace("#", "");
//   if (!/^[0-9a-fA-F]{6}$/.test(clean)) return hex;

//   const r = parseInt(clean.slice(0, 2), 16);
//   const g = parseInt(clean.slice(2, 4), 16);
//   const b = parseInt(clean.slice(4, 6), 16);

//   return `rgba(${r}, ${g}, ${b}, ${alpha})`;
// };

// const StarRating = ({ rating }) => {
//   const value = Math.max(0, Math.min(5, Number(rating) || 0));

//   return (
//     <div className="flex items-center gap-2">
//       <div className="text-xl tracking-[2px]" aria-label={`Rating ${value.toFixed(1)} out of 5`}>
//         {[1, 2, 3, 4, 5].map((star) => (
//           <span
//             key={star}
//             className={star <= Math.round(value) ? "text-yellow-400" : "text-white/20"}
//           >
//             ★
//           </span>
//         ))}
//       </div>

//       <span className="text-lg font-bold text-white">
//         {value.toFixed(1)}
//       </span>
//     </div>
//   );
// };

// const DetailItem = ({ icon: Icon, label, value }) => (
//   <div className="flex items-center gap-4 rounded-2xl border border-blue-500/30 bg-black/30 px-5 py-4 shadow-[0_0_18px_rgba(0,110,255,0.08)]">
//     <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
//       <Icon size={22} />
//     </div>

//     <div className="min-w-0">
//       <p className="text-sm text-slate-400">{label}</p>
//       <p className="mt-1 truncate text-lg font-bold text-white">{value || "--"}</p>
//     </div>
//   </div>
// );

// const WebsiteClassDetail = () => {
//   const { classId } = useParams();
//   const navigate = useNavigate();
//   const outletContext = useOutletContext() || {};

//   const branding = useMemo(
//     () =>
//       normalizeBranding(
//         outletContext?.branding ||
//           outletContext?.websiteBranding ||
//           outletContext?.brand ||
//           {}
//       ),
//     [
//       outletContext?.branding,
//       outletContext?.websiteBranding,
//       outletContext?.brand,
//     ]
//   );

//   const [classData, setClassData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [showBooking, setShowBooking] = useState(false);

//   useEffect(() => {
//     let mounted = true;

//     const fetchClass = async () => {
//       if (!classId) {
//         setError("Class ID is missing.");
//         setLoading(false);
//         return;
//       }

//       try {
//         setLoading(true);
//         setError("");

//         const response = await getClassById(classId);

//         let data =
//           response?.data?.data ??
//           response?.data?.class ??
//           response?.data ??
//           response?.class ??
//           response;

//         if (data?.data && typeof data.data === "object") {
//           data = data.data;
//         }

//         if (!data || typeof data !== "object") {
//           throw new Error("Class data was not returned by the server.");
//         }

//         if (mounted) setClassData(data);
//       } catch (err) {
//         console.error("CLASS DETAIL ERROR:", err);

//         if (mounted) {
//           setError(
//             err?.response?.data?.message ||
//               err?.response?.data?.error ||
//               err?.message ||
//               "Failed to load class details."
//           );
//         }
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     };

//     fetchClass();

//     return () => {
//       mounted = false;
//     };
//   }, [classId]);

//   const title = getClassTitle(classData);
//   const image = getClassImage(classData);
//   const duration = getDuration(classData);
//   const level = getLevel(classData);
//   const students = getStudents(classData);
//   const price = getPrice(classData);
//   const trainerId = getTrainerId(classData);
//   const trainerName = getTrainerName(classData);
//   const trainerImage = getTrainerImage(classData);
//   const trainerRating = getTrainerRating(classData);
//   const availableDays = getAvailableDays(classData);

//   const startDate = getValue(classData?.start_date, classData?.startDate);
//   const startTime = getValue(classData?.start_time, classData?.startTime);

//   const formattedDays =
//     availableDays.length > 0
//       ? availableDays.map((day) => String(day).substring(0, 3)).join(" • ")
//       : "--";

//   const handleBook = () => {
//     if (!classData) return;
//     setShowBooking(true);
//   };

//   const handleTrainerProfile = () => {
//     if (!trainerId) return;

//     navigate(`/institute/website/preview/trainers/${trainerId}`);
//   };

//   const pageStyle = {
//     fontFamily: fontFamily(branding.fontBody),
//     background:
//       "radial-gradient(circle at 15% 15%, rgba(0,112,255,0.16), transparent 30%), radial-gradient(circle at 90% 80%, rgba(0,78,255,0.14), transparent 32%), #020812",
//     color: "#FFFFFF",
//   };

//   if (loading) {
//     return (
//       <main className="flex min-h-screen items-center justify-center" style={pageStyle}>
//         <div className="text-center">
//           <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-500/20 border-t-blue-500" />
//           <p className="mt-5 text-slate-300">Loading class details...</p>
//         </div>
//       </main>
//     );
//   }

//   if (error || !classData) {
//     return (
//       <main className="flex min-h-screen items-center justify-center px-6" style={pageStyle}>
//         <div className="rounded-3xl border border-blue-500/30 bg-slate-950/80 p-8 text-center shadow-[0_0_35px_rgba(0,112,255,0.12)]">
//           <h1 className="text-2xl font-bold text-white">
//             {error ? "Unable to Load Class" : "Class Not Found"}
//           </h1>
//           {error && <p className="mt-3 text-sm text-slate-400">{error}</p>}

//           <button
//             type="button"
//             onClick={() => navigate("/institute/website/preview/classes")}
//             className="mt-6 inline-flex items-center gap-2 rounded-full bg-blue-500 px-6 py-3 font-semibold text-white shadow-[0_0_25px_rgba(0,112,255,0.25)]"
//           >
//             <FaArrowLeft size={13} />
//             Back To Classes
//           </button>
//         </div>
//       </main>
//     );
//   }

//   return (
//     <main className="min-h-screen" style={pageStyle}>
//       <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">

//         {/* BACK */}
//         <button
//           type="button"
//           onClick={() => navigate("/institute/website/preview/classes")}
//           className="mb-5 inline-flex items-center gap-2 text-sm text-slate-300 transition hover:text-blue-400"
//         >
//           <FaArrowLeft size={13} />
//           Back To Classes
//         </button>

//         {/* =====================================================
//             ROW 1 — 50%
//             LEFT: SINGLE IMAGE
//             RIGHT: DURATION / LEVEL / START TIME / START DATE / STUDENTS
//         ===================================================== */}
//         <section className="grid min-h-[50vh] grid-cols-1 gap-5 lg:grid-cols-2">

//           {/* SINGLE CLASS IMAGE */}
//           <div
//             className="relative min-h-[420px] overflow-hidden rounded-3xl border border-blue-500/50 bg-slate-950 shadow-[0_0_35px_rgba(0,112,255,0.18)]"
//           >
//             {image ? (
//               <img
//                 src={image}
//                 alt={title}
//                 className="h-full min-h-[420px] w-full object-cover"
//               />
//             ) : (
//               <div className="flex h-full min-h-[420px] items-center justify-center text-slate-500">
//                 No Class Image
//               </div>
//             )}

//             <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-blue-500/10" />

//             <div className="absolute bottom-5 left-5 right-5">
//               <div className="inline-flex rounded-full border border-blue-400/50 bg-black/60 px-4 py-2 text-sm font-semibold text-blue-300 backdrop-blur">
//                 Class
//               </div>
//             </div>
//           </div>

//           {/* CLASS INFORMATION */}
//           <div className="grid content-center gap-4 rounded-3xl border border-blue-500/40 bg-slate-950/75 p-4 shadow-[0_0_35px_rgba(0,112,255,0.12)] sm:p-6">
//             <DetailItem icon={FaClock} label="Duration" value={duration} />
//             <DetailItem icon={FaChartBar} label="Level" value={level} />
//             <DetailItem icon={FaClock} label="Start Time" value={formatTime(startTime)} />
//             <DetailItem icon={FaCalendarAlt} label="Start Date" value={formatDate(startDate)} />
//             <DetailItem icon={FaUsers} label="Students" value={`${students} Students`} />
//           </div>
//         </section>

//         {/* =====================================================
//             ROW 2 — 25%
//             CLASS NAME / PRICE ONCE / BOOK
//         ===================================================== */}
//         <section className="mt-5 min-h-[25vh] rounded-3xl border border-blue-500/40 bg-slate-950/80 p-6 shadow-[0_0_35px_rgba(0,112,255,0.12)] sm:p-8">
//           <div className="grid h-full items-center gap-8 lg:grid-cols-[1fr_300px]">

//             {/* CLASS NAME */}
//             <div>
//               <h1
//                 className="text-3xl leading-tight text-white sm:text-4xl lg:text-5xl"
//                 style={{
//                   fontFamily: fontFamily(branding.fontHeading),
//                   fontWeight: branding.headingWeight,
//                 }}
//               >
//                 {title}
//               </h1>
//             </div>

//             {/* PRICE + BOOK */}
//             <div className="border-l-0 border-blue-500/30 lg:border-l lg:pl-8">
//               <p className="text-sm text-slate-400">Price</p>
//               <p className="mt-1 text-4xl font-extrabold text-blue-400">
//                 ₹{price.toLocaleString("en-IN")}
//               </p>

//               <button
//                 type="button"
//                 onClick={handleBook}
//                 className="mt-5 flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-blue-400 px-6 py-3.5 font-bold text-white shadow-[0_0_25px_rgba(0,112,255,0.28)] transition hover:scale-[1.01]"
//               >
//                 Book Now
//               </button>
//             </div>
//           </div>
//         </section>

//         {/* =====================================================
//             ROW 3 — 25%
//             LEFT: AVAILABLE DAYS
//             RIGHT: TRAINER
//         ===================================================== */}
//         <section className="mt-5 grid min-h-[25vh] grid-cols-1 gap-5 lg:grid-cols-2">

//           {/* AVAILABLE DAYS */}
//           <div className="rounded-3xl border border-blue-500/40 bg-slate-950/80 p-6 shadow-[0_0_35px_rgba(0,112,255,0.12)] sm:p-8">
//             <div className="flex items-center gap-3">
//               <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
//                 <FaCalendarWeek size={22} />
//               </div>

//               <div>
//                 <p className="text-sm text-slate-400">Available Days</p>
//                 <h2 className="text-2xl font-bold text-white">Class Schedule</h2>
//               </div>
//             </div>

//             <div className="mt-6 flex flex-wrap gap-3">
//               {availableDays.length > 0 ? (
//                 availableDays.map((day, index) => (
//                   <span
//                     key={`${day}-${index}`}
//                     className="rounded-xl border border-blue-500/50 bg-blue-500/10 px-5 py-3 font-semibold text-blue-300"
//                   >
//                     {String(day).substring(0, 3)}
//                   </span>
//                 ))
//               ) : (
//                 <span className="rounded-xl border border-blue-500/30 px-5 py-3 text-slate-400">
//                   {formattedDays}
//                 </span>
//               )}
//             </div>
//           </div>

//           {/* TRAINER */}
//           <div className="rounded-3xl border border-blue-500/40 bg-slate-950/80 p-6 shadow-[0_0_35px_rgba(0,112,255,0.12)] sm:p-8">
//             <div className="flex h-full flex-col justify-center gap-5 sm:flex-row sm:items-center">

//               {trainerImage ? (
//                 <img
//                   src={trainerImage}
//                   alt={trainerName}
//                   className="h-28 w-28 shrink-0 rounded-full border-2 border-blue-500 object-cover shadow-[0_0_25px_rgba(0,112,255,0.25)]"
//                 />
//               ) : (
//                 <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full border-2 border-blue-500 bg-blue-500/10 text-3xl font-bold text-blue-400">
//                   {String(trainerName).charAt(0).toUpperCase()}
//                 </div>
//               )}

//               <div className="min-w-0 flex-1">
//                 <p className="text-sm text-slate-400">Trainer</p>
//                 <h2 className="mt-1 truncate text-2xl font-bold text-white">
//                   {trainerName}
//                 </h2>

//                 <div className="mt-2">
//                   <StarRating rating={trainerRating} />
//                 </div>

//                 <button
//                   type="button"
//                   onClick={handleTrainerProfile}
//                   disabled={!trainerId}
//                   className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl border border-blue-500 px-5 py-3 font-semibold text-blue-300 transition hover:bg-blue-500/10 disabled:cursor-not-allowed disabled:opacity-50"
//                 >
//                   <FaUser size={15} />
//                   View Trainer Profile
//                 </button>
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>

//       {/* EXISTING BOOKING FLOW */}
//       <WebsiteBooking
//         isOpen={showBooking}
//         selectedClass={classData}
//         onClose={() => setShowBooking(false)}
//       />
//     </main>
//   );
// };

// export default WebsiteClassDetail;


import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";

import {
  FaArrowLeft,
  FaArrowRight,
  FaCalendarAlt,
  FaCalendarWeek,
  FaClock,
  FaUser,
  FaUsers,
  FaChartBar,
} from "react-icons/fa";

import { getClassById } from "../../services/Classes.js";

import WebsiteBooking from "./WebsiteBooking";

/* =========================================================
   BLACK + RADIANT BLUE
   CLASS DETAIL PAGE

   ROW 1
   LEFT  = CLASS IMAGE
   RIGHT = CLASS INFORMATION

   ROW 2
   CLASS NAME + PRICE + BOOK NOW

   ROW 3
   LEFT  = AVAILABLE DAYS
   RIGHT = TRAINER
========================================================= */


/* =========================================================
   DEFAULT BRANDING
========================================================= */

const DEFAULT_BRANDING = {
  fontHeading: "Inter",
  fontBody: "Inter",

  headingWeight: 700,
  bodyWeight: 400,

  roundedButtons: true,
};


/* =========================================================
   GENERAL HELPERS
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


const fontFamily = (font) =>
  font
    ? `'${font}', sans-serif`
    : "Inter, sans-serif";


/* =========================================================
   BRANDING
========================================================= */

const normalizeBranding = (
  branding = {}
) => ({
  ...DEFAULT_BRANDING,

  ...branding,

  fontHeading: getValue(
    branding?.fontHeading,
    branding?.font_heading,
    DEFAULT_BRANDING.fontHeading
  ),

  fontBody: getValue(
    branding?.fontBody,
    branding?.font_body,
    DEFAULT_BRANDING.fontBody
  ),

  headingWeight: getValue(
    branding?.headingWeight,
    branding?.heading_weight,
    DEFAULT_BRANDING.headingWeight
  ),

  bodyWeight: getValue(
    branding?.bodyWeight,
    branding?.body_weight,
    DEFAULT_BRANDING.bodyWeight
  ),
});


/* =========================================================
   CLASS HELPERS
========================================================= */

const getClassTitle = (data) =>
  getValue(
    data?.title,
    data?.class_title,
    data?.className,
    data?.name,
    "Class"
  );


const getClassImage = (data) =>
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


const getDuration = (data) =>
  getValue(
    data?.duration,
    data?.class_duration,
    data?.duration_minutes,
    "--"
  );


const getLevel = (data) =>
  getValue(
    data?.level,
    data?.class_level,
    data?.difficulty,
    "All Levels"
  );


const getStudents = (data) =>
  Number(
    getValue(
      data?.students,
      data?.students_count,
      data?.total_students,
      0
    )
  ) || 0;


const getPrice = (data) =>
  Number(
    getValue(
      data?.price,
      data?.class_price,
      data?.monthly_price,
      0
    )
  ) || 0;


/* =========================================================
   TRAINER HELPERS
========================================================= */

const getTrainerId = (data) =>
  getValue(
    data?.trainer_id,
    data?.trainerId,
    data?.trainer?.id,
    data?.trainer?.trainer_id,
    null
  );


const getTrainerName = (data) =>
  getValue(
    data?.trainer_name,
    data?.trainerName,
    data?.trainer?.full_name,
    data?.trainer?.name,
    "Trainer"
  );


const getTrainerImage = (data) =>
  getValue(
    data?.trainer_image,
    data?.trainerImage,
    data?.trainer?.profile_image,
    data?.trainer?.image,
    data?.trainer?.image_url,
    ""
  );


const getTrainerRating = (data) =>
  Number(
    getValue(
      data?.trainer_rating,
      data?.trainerRating,
      data?.trainer?.rating,
      data?.rating,
      0
    )
  ) || 0;


/* =========================================================
   AVAILABLE DAYS
========================================================= */

const getAvailableDays = (data) => {
  const days = getValue(
    data?.available_days,
    data?.availableDays,
    data?.days,
    data?.schedule_days
  );

  if (Array.isArray(days)) {
    return days;
  }

  if (typeof days === "string") {
    return days
      .split(",")
      .map((day) => day.trim())
      .filter(Boolean);
  }

  return [];
};


/* =========================================================
   DATE FORMAT
========================================================= */

const formatDate = (value) => {
  if (!value) {
    return "--";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
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


/* =========================================================
   TIME FORMAT
========================================================= */

const formatTime = (value) => {
  if (!value) {
    return "--";
  }

  const text = String(value);

  if (/am|pm/i.test(text)) {
    return text;
  }

  const [
    hoursRaw,
    minutesRaw,
  ] = text.split(":");

  const hours = Number(hoursRaw);
  const minutes = Number(minutesRaw);

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


/* =========================================================
   HEX → RGBA
========================================================= */

const hexToRgba = (
  hex,
  alpha = 1
) => {
  if (
    typeof hex !== "string"
  ) {
    return hex;
  }

  const clean =
    hex.replace("#", "");

  if (
    !/^[0-9a-fA-F]{6}$/.test(
      clean
    )
  ) {
    return hex;
  }

  const r = parseInt(
    clean.slice(0, 2),
    16
  );

  const g = parseInt(
    clean.slice(2, 4),
    16
  );

  const b = parseInt(
    clean.slice(4, 6),
    16
  );

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};


/* =========================================================
   STAR RATING
========================================================= */

const StarRating = ({
  rating,
}) => {
  const value = Math.max(
    0,
    Math.min(
      5,
      Number(rating) || 0
    )
  );

  return (
    <div className="flex items-center gap-3">

      <div
        className="text-xl tracking-[2px]"
        aria-label={`Rating ${value.toFixed(
          1
        )} out of 5`}
      >
        {[1, 2, 3, 4, 5].map(
          (star) => (
            <span
              key={star}
              className={
                star <=
                Math.round(value)
                  ? "text-yellow-400"
                  : "text-white/20"
              }
              style={{
                textShadow:
                  star <=
                  Math.round(
                    value
                  )
                    ? "0 0 10px rgba(250,204,21,0.35)"
                    : "none",
              }}
            >
              ★
            </span>
          )
        )}
      </div>

      <span className="text-lg font-bold text-white">
        {value.toFixed(1)}
      </span>

    </div>
  );
};


/* =========================================================
   DETAIL ITEM
========================================================= */

const DetailItem = ({
  icon: Icon,
  label,
  value,
}) => (
  <div
    className="
      group
      flex
      items-center
      gap-4
      rounded-2xl
      border
      px-5
      py-4
      transition-all
      duration-300
      hover:-translate-y-0.5
    "
    style={{
      borderColor:
        "rgba(0,140,255,0.28)",

      background:
        "linear-gradient(145deg,rgba(0,140,255,0.055),rgba(0,0,0,0.30))",

      boxShadow:
        "0 0 18px rgba(0,110,255,0.06)",
    }}
  >

    <div
      className="
        flex
        h-12
        w-12
        shrink-0
        items-center
        justify-center
        rounded-xl
      "
      style={{
        background:
          "linear-gradient(135deg,rgba(0,140,255,0.16),rgba(0,198,255,0.05))",

        color:
          "#38BDF8",

        boxShadow:
          "0 0 18px rgba(0,140,255,0.10)",
      }}
    >
      <Icon size={22} />
    </div>

    <div className="min-w-0">

      <p
        className="text-sm"
        style={{
          color:
            "#94A3B8",
        }}
      >
        {label}
      </p>

      <p
        className="
          mt-1
          truncate
          text-lg
          font-bold
        "
        style={{
          color:
            "#F8FAFC",
        }}
      >
        {value || "--"}
      </p>

    </div>

  </div>
);


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
     STATE
  ======================================================= */

  const [
    classData,
    setClassData,
  ] = useState(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

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
          setError(
            "Class ID is missing."
          );

          setLoading(false);

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
            setClassData(data);
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
     CLASS DATA
  ======================================================= */

  const title =
    getClassTitle(
      classData
    );

  const image =
    getClassImage(
      classData
    );

  const duration =
    getDuration(
      classData
    );

  const level =
    getLevel(
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


  /* =======================================================
     TRAINER DATA
  ======================================================= */

  const trainerId =
    getTrainerId(
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

  const trainerRating =
    getTrainerRating(
      classData
    );


  /* =======================================================
     SCHEDULE
  ======================================================= */

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

  const formattedDays =
    availableDays.length > 0
      ? availableDays
          .map((day) =>
            String(day).substring(
              0,
              3
            )
          )
          .join(" • ")
      : "--";


  /* =======================================================
     BOOKING
  ======================================================= */

  const handleBook =
    () => {

      if (!classData) {
        return;
      }

      setShowBooking(true);
    };


  /* =======================================================
     TRAINER PROFILE
  ======================================================= */

  const handleTrainerProfile =
    () => {

      if (!trainerId) {
        return;
      }

      navigate(
        `/institute/website/preview/trainers/${trainerId}`
      );
    };


  /* =======================================================
     BACK TO CLASSES
  ======================================================= */

  const handleBack =
    () => {
      navigate(
        "/institute/website/preview/classes"
      );
    };


  /* =======================================================
     PAGE STYLE
  ======================================================= */

  const pageStyle = {
    fontFamily:
      fontFamily(
        branding.fontBody
      ),

    background:
      `
      radial-gradient(
        circle at 10% 10%,
        rgba(0,140,255,0.18),
        transparent 28%
      ),
      radial-gradient(
        circle at 90% 20%,
        rgba(0,198,255,0.12),
        transparent 25%
      ),
      radial-gradient(
        circle at 50% 100%,
        rgba(0,76,255,0.14),
        transparent 35%
      ),
      #02050A
      `,

    color:
      "#FFFFFF",

    minHeight:
      "100vh",
  };


  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {

    return (
      <main
        className="
          flex
          min-h-screen
          items-center
          justify-center
          px-6
        "
        style={
          pageStyle
        }
      >

        {/* Background Glow */}

        <div
          className="
            pointer-events-none
            fixed
            left-1/2
            top-1/2
            h-72
            w-72
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            blur-[120px]
          "
          style={{
            background:
              "rgba(0,140,255,0.12)",
          }}
        />

        <div className="relative z-10 text-center">

          <div
            className="
              mx-auto
              h-14
              w-14
              animate-spin
              rounded-full
              border-4
            "
            style={{
              borderColor:
                "rgba(0,140,255,0.16)",

              borderTopColor:
                "#00B7FF",

              boxShadow:
                "0 0 25px rgba(0,140,255,0.25)",
            }}
          />

          <p
            className="mt-5 text-sm"
            style={{
              color:
                "#CBD5E1",
            }}
          >
            Loading class details...
          </p>

        </div>

      </main>
    );
  }


  /* =======================================================
     ERROR
  ======================================================= */

  if (
    error ||
    !classData
  ) {

    return (
      <main
        className="
          flex
          min-h-screen
          items-center
          justify-center
          px-6
        "
        style={
          pageStyle
        }
      >

        <div
          className="
            relative
            w-full
            max-w-lg
            overflow-hidden
            rounded-[28px]
            border
            p-8
            text-center
          "
          style={{
            borderColor:
              "rgba(0,140,255,0.35)",

            background:
              "linear-gradient(145deg,rgba(5,13,24,0.97),rgba(2,7,14,0.97))",

            boxShadow:
              "0 0 45px rgba(0,140,255,0.12)",
          }}
        >

          {/* Glow */}

          <div
            className="
              pointer-events-none
              absolute
              -right-20
              -top-20
              h-40
              w-40
              rounded-full
              blur-3xl
            "
            style={{
              background:
                "rgba(0,140,255,0.12)",
            }}
          />

          <div className="relative">

            <div
              className="
                mx-auto
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-full
              "
              style={{
                background:
                  "rgba(0,140,255,0.10)",

                color:
                  "#38BDF8",

                boxShadow:
                  "0 0 25px rgba(0,140,255,0.15)",
              }}
            >
              <FaChartBar
                size={24}
              />
            </div>

            <h1
              className="
                mt-6
                text-2xl
                font-bold
              "
              style={{
                color:
                  "#FFFFFF",
              }}
            >
              {error
                ? "Unable to Load Class"
                : "Class Not Found"}
            </h1>

            {error && (
              <p
                className="
                  mt-3
                  text-sm
                  leading-6
                "
                style={{
                  color:
                    "#94A3B8",
                }}
              >
                {error}
              </p>
            )}

            <button
              type="button"
              onClick={
                handleBack
              }
              className="
                mt-7
                inline-flex
                items-center
                gap-2
                rounded-full
                px-6
                py-3
                font-semibold
                text-white
                transition-all
                duration-300
                hover:-translate-x-1
              "
              style={{
                background:
                  "linear-gradient(90deg,#0066FF,#00B7FF)",

                boxShadow:
                  "0 0 25px rgba(0,140,255,0.25)",
              }}
            >
              <FaArrowLeft
                size={13}
              />

              Back To Classes
            </button>

          </div>

        </div>

      </main>
    );
  }


  /* =======================================================
     MAIN PAGE
  ======================================================= */

  return (
    <>
      <main
        className="
          min-h-screen
          w-full
          overflow-x-hidden
        "
        style={
          pageStyle
        }
      >

        {/* =================================================
            GLOBAL BACKGROUND GLOW
        ================================================= */}

        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">

          <div
            className="
              absolute
              -left-40
              top-20
              h-96
              w-96
              rounded-full
              blur-[120px]
            "
            style={{
              background:
                "rgba(0,140,255,0.10)",
            }}
          />

          <div
            className="
              absolute
              -right-40
              top-[40%]
              h-[500px]
              w-[500px]
              rounded-full
              blur-[140px]
            "
            style={{
              background:
                "rgba(0,198,255,0.08)",
            }}
          />

          <div
            className="
              absolute
              bottom-0
              left-[35%]
              h-80
              w-80
              rounded-full
              blur-[120px]
            "
            style={{
              background:
                "rgba(0,76,255,0.08)",
            }}
          />

        </div>


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

          {/* =================================================
              BACK BUTTON
          ================================================= */}

          <button
            type="button"
            onClick={
              handleBack
            }
            className="
              group
              mb-7
              inline-flex
              items-center
              gap-3
              rounded-full
              border
              px-5
              py-2.5
              text-sm
              font-semibold
              transition-all
              duration-300
              hover:-translate-x-1
            "
            style={{
              color:
                "#CBD5E1",

              borderColor:
                "rgba(0,140,255,0.35)",

              background:
                "rgba(2,8,18,0.75)",

              boxShadow:
                "0 0 20px rgba(0,140,255,0.06)",
            }}
          >
            <FaArrowLeft
              size={13}
            />

            <span>
              Back To Classes
            </span>
          </button>


          {/* =================================================
              ROW 1
              IMAGE + CLASS INFORMATION
          ================================================= */}

          <section
            className="
              grid
              min-h-[50vh]
              grid-cols-1
              gap-6
              lg:grid-cols-2
            "
          >

            {/* ===============================================
                CLASS IMAGE
            =============================================== */}

            <div
              className="
                group
                relative
                min-h-[420px]
                overflow-hidden
                rounded-[28px]
                border
              "
              style={{
                borderColor:
                  "rgba(0,140,255,0.55)",

                background:
                  "linear-gradient(145deg,#03070D,#061426)",

                boxShadow:
                  `
                  0 0 0 1px rgba(0,140,255,0.08),
                  0 0 40px rgba(0,140,255,0.14),
                  inset 0 0 50px rgba(0,140,255,0.04)
                  `,
              }}
            >

              {image ? (
                <img
                  src={image}
                  alt={title}
                  className="
                    h-full
                    min-h-[420px]
                    w-full
                    object-cover
                    transition-transform
                    duration-700
                    group-hover:scale-105
                  "
                  onError={(
                    event
                  ) => {
                    event.currentTarget.onerror =
                      null;

                    event.currentTarget.style.display =
                      "none";
                  }}
                />
              ) : (
                <div
                  className="
                    flex
                    h-full
                    min-h-[420px]
                    items-center
                    justify-center
                  "
                  style={{
                    background:
                      "radial-gradient(circle at center,rgba(0,140,255,0.16),#02050A)",

                    color:
                      "#64748B",
                  }}
                >
                  No Class Image
                </div>
              )}


              {/* IMAGE OVERLAY */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                "
                style={{
                  background:
                    `
                    linear-gradient(
                      to top,
                      rgba(0,0,0,0.82),
                      rgba(0,0,0,0.10) 55%,
                      rgba(0,140,255,0.08)
                    )
                    `,
                }}
              />


              {/* BLUE GLOW */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -right-20
                  -top-20
                  h-60
                  w-60
                  rounded-full
                  blur-3xl
                "
                style={{
                  background:
                    "rgba(0,140,255,0.15)",
                }}
              />


              {/* IMAGE LABEL */}

              <div
                className="
                  absolute
                  bottom-6
                  left-6
                "
              >

                <div
                  className="
                    inline-flex
                    items-center
                    rounded-full
                    border
                    px-4
                    py-2
                    text-xs
                    font-bold
                    uppercase
                    tracking-[0.18em]
                    backdrop-blur-md
                  "
                  style={{
                    color:
                      "#60A5FA",

                    borderColor:
                      "rgba(56,189,248,0.55)",

                    background:
                      "rgba(0,8,18,0.70)",

                    boxShadow:
                      "0 0 20px rgba(0,140,255,0.12)",
                  }}
                >
                  Fine Arts Class
                </div>

              </div>

            </div>


            {/* ===============================================
                CLASS INFORMATION
            =============================================== */}

            <div
              className="
                grid
                content-center
                gap-4
                rounded-[28px]
                border
                p-5
                sm:p-7
              "
              style={{
                background:
                  "linear-gradient(145deg,rgba(5,13,24,0.96),rgba(2,8,16,0.96))",

                borderColor:
                  "rgba(0,140,255,0.38)",

                boxShadow:
                  `
                  0 0 35px rgba(0,140,255,0.10),
                  inset 0 0 35px rgba(0,140,255,0.025)
                  `,
              }}
            >

              <DetailItem
                icon={FaClock}
                label="Duration"
                value={
                  duration
                }
              />

              <DetailItem
                icon={FaChartBar}
                label="Level"
                value={
                  level
                }
              />

              <DetailItem
                icon={FaClock}
                label="Start Time"
                value={
                  formatTime(
                    startTime
                  )
                }
              />

              <DetailItem
                icon={FaCalendarAlt}
                label="Start Date"
                value={
                  formatDate(
                    startDate
                  )
                }
              />

              <DetailItem
                icon={FaUsers}
                label="Students"
                value={`${students} Students`}
              />

            </div>

          </section>


          {/* =================================================
              ROW 2
              CLASS NAME + PRICE + BOOK
          ================================================= */}

          <section
            className="
              mt-6
              rounded-[28px]
              border
              p-6
              sm:p-8
            "
            style={{
              background:
                "linear-gradient(145deg,rgba(5,13,24,0.97),rgba(2,7,14,0.97))",

              borderColor:
                "rgba(0,140,255,0.40)",

              boxShadow:
                `
                0 0 40px rgba(0,140,255,0.10),
                inset 0 0 30px rgba(0,140,255,0.025)
                `,
            }}
          >

            <div
              className="
                grid
                items-center
                gap-8
                lg:grid-cols-[1fr_320px]
              "
            >

              {/* CLASS NAME */}

              <div>

                <p
                  className="
                    mb-3
                    text-xs
                    font-bold
                    uppercase
                    tracking-[0.25em]
                  "
                  style={{
                    color:
                      "#38BDF8",
                  }}
                >
                  Class Details
                </p>

                <h1
                  className="
                    text-3xl
                    leading-tight
                    sm:text-4xl
                    lg:text-5xl
                  "
                  style={{
                    color:
                      "#F8FAFC",

                    fontFamily:
                      fontFamily(
                        branding.fontHeading
                      ),

                    fontWeight:
                      branding.headingWeight,

                    textShadow:
                      "0 0 35px rgba(0,140,255,0.16)",
                  }}
                >
                  {title}
                </h1>

              </div>


              {/* PRICE + BOOK */}

              <div
                className="
                  border-l-0
                  lg:border-l
                  lg:pl-8
                "
                style={{
                  borderColor:
                    "rgba(0,140,255,0.30)",
                }}
              >

                <p
                  className="text-sm"
                  style={{
                    color:
                      "#94A3B8",
                  }}
                >
                  Course Price
                </p>

                <p
                  className="
                    mt-1
                    text-4xl
                    font-extrabold
                  "
                  style={{
                    color:
                      "#38BDF8",

                    textShadow:
                      "0 0 25px rgba(0,140,255,0.35)",
                  }}
                >
                  ₹
                  {price.toLocaleString(
                    "en-IN"
                  )}
                </p>


                <button
                  type="button"
                  onClick={
                    handleBook
                  }
                  className="
                    mt-5
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    px-6
                    py-3.5
                    font-bold
                    text-white
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:brightness-110
                  "
                  style={{
                    background:
                      "linear-gradient(90deg,#0066FF,#00B7FF,#008CFF)",

                    boxShadow:
                      `
                      0 0 25px rgba(0,140,255,0.32),
                      0 8px 30px rgba(0,0,0,0.30)
                      `,
                  }}
                >
                  Book Now

                  <FaArrowRight
                    size={13}
                  />
                </button>

              </div>

            </div>

          </section>


          {/* =================================================
              ROW 3
              AVAILABLE DAYS + TRAINER
          ================================================= */}

          <section
            className="
              mt-6
              grid
              min-h-[25vh]
              grid-cols-1
              gap-6
              lg:grid-cols-2
            "
          >

            {/* ===============================================
                AVAILABLE DAYS
            =============================================== */}

            <div
              className="
                rounded-[28px]
                border
                p-6
                sm:p-8
              "
              style={{
                background:
                  "linear-gradient(145deg,rgba(5,13,24,0.97),rgba(2,7,14,0.97))",

                borderColor:
                  "rgba(0,140,255,0.40)",

                boxShadow:
                  "0 0 35px rgba(0,140,255,0.09)",
              }}
            >

              <div
                className="
                  flex
                  items-center
                  gap-4
                "
              >

                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-xl
                  "
                  style={{
                    background:
                      "rgba(0,140,255,0.10)",

                    color:
                      "#38BDF8",

                    boxShadow:
                      "0 0 20px rgba(0,140,255,0.10)",
                  }}
                >
                  <FaCalendarWeek
                    size={22}
                  />
                </div>


                <div>

                  <p
                    className="text-sm"
                    style={{
                      color:
                        "#94A3B8",
                    }}
                  >
                    Available Days
                  </p>

                  <h2
                    className="
                      text-2xl
                      font-bold
                    "
                    style={{
                      color:
                        "#FFFFFF",
                    }}
                  >
                    Class Schedule
                  </h2>

                </div>

              </div>


              <div
                className="
                  mt-6
                  flex
                  flex-wrap
                  gap-3
                "
              >

                {availableDays.length >
                0 ? (
                  availableDays.map(
                    (
                      day,
                      index
                    ) => (
                      <span
                        key={`${day}-${index}`}
                        className="
                          rounded-xl
                          border
                          px-5
                          py-3
                          font-semibold
                        "
                        style={{
                          color:
                            "#60A5FA",

                          borderColor:
                            "rgba(0,140,255,0.50)",

                          background:
                            "linear-gradient(135deg,rgba(0,140,255,0.13),rgba(0,198,255,0.05))",

                          boxShadow:
                            "0 0 15px rgba(0,140,255,0.08)",
                        }}
                      >
                        {String(
                          day
                        ).substring(
                          0,
                          3
                        )}
                      </span>
                    )
                  )
                ) : (
                  <span
                    className="
                      rounded-xl
                      border
                      px-5
                      py-3
                    "
                    style={{
                      color:
                        "#64748B",

                      borderColor:
                        "rgba(0,140,255,0.25)",
                    }}
                  >
                    {formattedDays}
                  </span>
                )}

              </div>

            </div>


            {/* ===============================================
                TRAINER
            =============================================== */}

            <div
              className="
                rounded-[28px]
                border
                p-6
                sm:p-8
              "
              style={{
                background:
                  "linear-gradient(145deg,rgba(5,13,24,0.97),rgba(2,7,14,0.97))",

                borderColor:
                  "rgba(0,140,255,0.40)",

                boxShadow:
                  "0 0 35px rgba(0,140,255,0.09)",
              }}
            >

              <div
                className="
                  flex
                  h-full
                  flex-col
                  justify-center
                  gap-5
                  sm:flex-row
                  sm:items-center
                "
              >

                {/* TRAINER IMAGE */}

                {trainerImage ? (
                  <img
                    src={
                      trainerImage
                    }
                    alt={
                      trainerName
                    }
                    className="
                      h-28
                      w-28
                      shrink-0
                      rounded-full
                      object-cover
                    "
                    style={{
                      border:
                        "2px solid #008CFF",

                      boxShadow:
                        `
                        0 0 0 5px rgba(0,140,255,0.06),
                        0 0 30px rgba(0,140,255,0.30)
                        `,
                    }}
                    onError={(
                      event
                    ) => {
                      event.currentTarget.onerror =
                        null;

                      event.currentTarget.style.display =
                        "none";
                    }}
                  />
                ) : (
                  <div
                    className="
                      flex
                      h-28
                      w-28
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      text-3xl
                      font-bold
                    "
                    style={{
                      border:
                        "2px solid #008CFF",

                      background:
                        "radial-gradient(circle,#0B2A4A,#020817)",

                      color:
                        "#38BDF8",

                      boxShadow:
                        "0 0 30px rgba(0,140,255,0.25)",
                    }}
                  >
                    {String(
                      trainerName
                    )
                      .charAt(0)
                      .toUpperCase()}
                  </div>
                )}


                {/* TRAINER DETAILS */}

                <div
                  className="
                    min-w-0
                    flex-1
                  "
                >

                  <p
                    className="text-sm"
                    style={{
                      color:
                        "#94A3B8",
                    }}
                  >
                    Trainer
                  </p>

                  <h2
                    className="
                      mt-1
                      truncate
                      text-2xl
                      font-bold
                    "
                    style={{
                      color:
                        "#FFFFFF",
                    }}
                  >
                    {trainerName}
                  </h2>


                  <div className="mt-2">

                    <StarRating
                      rating={
                        trainerRating
                      }
                    />

                  </div>


                  <button
                    type="button"
                    onClick={
                      handleTrainerProfile
                    }
                    disabled={
                      !trainerId
                    }
                    className="
                      mt-4
                      inline-flex
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      border
                      px-5
                      py-3
                      font-semibold
                      transition-all
                      duration-300
                      hover:-translate-y-0.5
                      hover:bg-blue-500/10
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                    style={{
                      color:
                        "#60A5FA",

                      borderColor:
                        "rgba(0,140,255,0.60)",

                      background:
                        "rgba(0,140,255,0.04)",

                      boxShadow:
                        "0 0 18px rgba(0,140,255,0.08)",
                    }}
                  >
                    <FaUser
                      size={15}
                    />

                    View Trainer Profile
                  </button>

                </div>

              </div>

            </div>

          </section>

        </div>


        {/* =================================================
            BOOKING MODAL
        ================================================= */}

        <WebsiteBooking
          isOpen={
            showBooking
          }
          selectedClass={
            classData
          }
          onClose={() =>
            setShowBooking(
              false
            )
          }
        />

      </main>
    </>
  );
};


export default WebsiteClassDetail;