
// import React from "react";

// import { useEffect, useMemo, useState } from "react";

// import axios from "axios";

// import toast from "react-hot-toast";

// import { FaTrash } from "react-icons/fa";

// import { getAuth } from "firebase/auth";

// import {

// Plus,

// Search,

// Clock,



//   Video,



//   Edit,



//   Trash2,



//   CheckCircle,



//   Loader2,



//   Copy,



//   RefreshCcw,



//   BookOpen,



//   X,



//   CalendarClock,



// } from "lucide-react";



// import { useTimezone, getTimezone } from "../utils/timezone";




// const API_URL =
//   import.meta.env.VITE_API_URL ||
//   "https://finearts-backend.onrender.com/api";



// const TIME_OPTIONS = Array.from({ length: 96 }, (_, index) => {

//   const hour24 = Math.floor(index / 4);

//   const minute = (index % 4) * 15;

//   const ampm = hour24 >= 12 ? "PM" : "AM";

//   const hour12 = hour24 % 12 || 12;

//   const time = `${String(hour12).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;

//   return {

//     value: `${time}|${ampm}`,

//     label: `${time} ${ampm}`,

//   };

// });

// // Convert class times (HH:mm[:ss] or 12-hour values) to minutes after midnight.
// const parseClassTimeMinutes = (rawTime) => {
//   if (rawTime === null || rawTime === undefined || rawTime === "") return null;
//   const raw = String(rawTime).trim();
//   const ampmMatch = raw.match(/(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM)/i);
//   if (ampmMatch) {
//     let hour = Number(ampmMatch[1]) % 12;
//     if (ampmMatch[4].toUpperCase() === "PM") hour += 12;
//     const minute = Number(ampmMatch[2]);
//     if (minute > 59) return null;
//     return hour * 60 + minute;
//   }
//   const match = raw.match(/^(\d{1,2}):(\d{2})(?::\d{2})?/);
//   if (!match) return null;
//   const hour = Number(match[1]);
//   const minute = Number(match[2]);
//   if (hour > 23 || minute > 59) return null;
//   return hour * 60 + minute;
// };

// const getOptionMinutes = (option) => {
//   const [time, ampm] = option.value.split("|");
//   const [hourText, minuteText] = time.split(":");
//   let hour = Number(hourText) % 12;
//   if (ampm === "PM") hour += 12;
//   return hour * 60 + Number(minuteText);
// };

// // Restrict schedule time choices to the selected class's own start/end window.
// // If end_time is unavailable, use the class duration as a fallback.
// const getTimeOptionsForClass = (selectedClass) => {
//   if (!selectedClass) return [];
//   const startMinutes = parseClassTimeMinutes(
//     selectedClass.start_time ?? selectedClass.startTime ?? selectedClass.class_start_time
//   );
//   let endMinutes = parseClassTimeMinutes(
//     selectedClass.end_time ?? selectedClass.endTime ?? selectedClass.finish_time ?? selectedClass.class_end_time
//   );
//   if (endMinutes === null && startMinutes !== null) {
//     const duration = Number(selectedClass.duration ?? selectedClass.duration_minutes ?? selectedClass.class_duration);
//     if (Number.isFinite(duration) && duration > 0) endMinutes = startMinutes + duration;
//   }
//   if (startMinutes === null || endMinutes === null) return [];
//   const wrapsMidnight = endMinutes < startMinutes;
//   if (endMinutes >= 1440) endMinutes %= 1440;
//   return TIME_OPTIONS.filter((option) => {
//     const minutes = getOptionMinutes(option);
//     return wrapsMidnight
//       ? minutes >= startMinutes || minutes <= endMinutes
//       : minutes >= startMinutes && minutes <= endMinutes;
//   });
// };



// /* =========================================================



//    AUTH



// ========================================================= */



// const authHeader = async () => {



//   const auth = getAuth();



//   let token = null;



//   if (auth.currentUser) {



//     token = await auth.currentUser.getIdToken(true);



//   } else {



//     token = localStorage.getItem("token");



//   }



//   if (!token) {



//     throw new Error("Authentication token not available. Please sign in again.");



//   }



//   return {



//     headers: {



//       Authorization: `Bearer ${token}`,



//       "X-Timezone": getTimezone(),



//     },



//   };



// };



// /* =========================================================



//    TIME HELPERS



//    UI: 12-hour format



//    API: 24-hour format



// ========================================================= */



// const sanitize12HourTime = (value = "") => {



//   let raw = String(value).replace(/[^0-9:]/g, "");



//   if (!raw.includes(":") && raw.length > 2) {



//     raw = `${raw.slice(0, -2)}:${raw.slice(-2)}`;



//   }



//   let [hours = "", minutes = ""] = raw.split(":");



//   hours = hours.replace(/\D/g, "").slice(0, 2);



//   minutes = minutes.replace(/\D/g, "").slice(0, 2);



//   if (!raw.includes(":")) return hours;



//   return `${hours}${minutes !== "" ? `:${minutes}` : ":"}`;



// };



// const isValid12HourTime = (time) => {



//   if (!/^\d{1,2}:\d{2}$/.test(String(time || ""))) return false;



//   const [hours, minutes] = String(time).split(":").map(Number);



//   return (



//     Number.isInteger(hours) &&



//     Number.isInteger(minutes) &&



//     hours >= 1 &&



//     hours <= 12 &&



//     minutes >= 0 &&



//     minutes <= 59



//   );



// };



// /*



//  * The sessions API expects start_time as a UTC ISO timestamp, not HH:mm.



//  * The UI works in Asia/Calcutta (IST, UTC+05:30).



//  *



//  * Example:



//  *   05:00 PM IST -> 1970-01-01T11:30:00.000Z



//  *



//  * A fixed date is intentional because this module stores a recurring TIME.



//  * The date is only used to satisfy the API's ISO timestamp validation.



//  */



// const convertToUtcIso = (time, ampm, timezone = "Asia/Calcutta") => {



//   if (!isValid12HourTime(time)) return null;



//   let [hour, minute] = String(time).split(":").map(Number);



//   const period = String(ampm || "AM").toUpperCase();



//   if (period === "PM" && hour !== 12) hour += 12;



//   if (period === "AM" && hour === 12) hour = 0;



//   // India has no DST and is UTC+05:30. Keep a generic Intl fallback for the



//   // configured timezone so the conversion is explicit rather than relying on



//   // the browser's local timezone.



//   if (timezone === "Asia/Calcutta" || timezone === "Asia/Kolkata") {



//     const utcMillis = Date.UTC(1970, 0, 1, hour, minute) - (5 * 60 + 30) * 60 * 1000;



//     return new Date(utcMillis).toISOString();



//   }



//   // Generic timezone conversion for any future timezone setting.



//   // Start with the intended wall-clock UTC value and calculate the timezone



//   // offset at that instant using Intl.



//   const wallClock = new Date(Date.UTC(1970, 0, 1, hour, minute));



//   const parts = new Intl.DateTimeFormat("en-US", {



//     timeZone: timezone,



//     hour12: false,



//     year: "numeric",



//     month: "2-digit",



//     day: "2-digit",



//     hour: "2-digit",



//     minute: "2-digit",



//     second: "2-digit",



//   }).formatToParts(wallClock);



//   const values = Object.fromEntries(



//     parts.map((part) => [part.type, part.value])



//   );



//   const timezoneWall = Date.UTC(



//     Number(values.year),



//     Number(values.month) - 1,



//     Number(values.day),



//     Number(values.hour) === 24 ? 0 : Number(values.hour),



//     Number(values.minute),



//     Number(values.second)



//   );



//   const offset = timezoneWall - wallClock.getTime();



//   return new Date(wallClock.getTime() - offset).toISOString();



// };



// const extractTimeFromApiValue = (value, timezone = "Asia/Calcutta") => {



//   if (value === null || value === undefined || value === "") return null;



//   const raw = String(value).trim();



//   // API may return a database TIME value such as 17:00 or 17:00:00.



//   const timeMatch = raw.match(/^(\d{1,2}):(\d{2})(?::\d{2})?$/);



//   if (timeMatch) {



//     return {



//       hour: Number(timeMatch[1]),



//       minute: Number(timeMatch[2]),



//     };



//   }



//   // API may return the ISO value we send. Convert it to the configured



//   // timezone before showing it in the 12-hour edit field.



//   const date = new Date(raw);



//   if (Number.isNaN(date.getTime())) return null;



//   const parts = new Intl.DateTimeFormat("en-US", {



//     timeZone: timezone,



//     hour12: false,



//     hour: "2-digit",



//     minute: "2-digit",



//   }).formatToParts(date);



//   const values = Object.fromEntries(



//     parts.map((part) => [part.type, part.value])



//   );



//   let hour = Number(values.hour);



//   if (hour === 24) hour = 0;



//   return {



//     hour,



//     minute: Number(values.minute),



//   };



// };



// const convertTo12Hour = (time24, timezone = "Asia/Calcutta") => {



//   if (time24 === null || time24 === undefined || time24 === "") {



//     return { time: "", ampm: "AM" };



//   }



//   const parsed = extractTimeFromApiValue(time24, timezone);



//   if (!parsed) return { time: "", ampm: "AM" };



//   let hour = parsed.hour;



//   const minute = parsed.minute;



//   if (



//     !Number.isInteger(hour) ||



//     !Number.isInteger(minute) ||



//     hour < 0 ||



//     hour > 23 ||



//     minute < 0 ||



//     minute > 59



//   ) {



//     return { time: "", ampm: "AM" };



//   }



//   const ampm = hour >= 12 ? "PM" : "AM";



//   hour = hour % 12 || 12;



//   return {



//     time: `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`,



//     ampm,



//   };



// };



// const formatDisplayTime = (time24) => {



//   const value = convertTo12Hour(time24);



//   return value.time ? `${value.time} ${value.ampm}` : "Invalid time";



// };



// const formatDisplayDate = (value) => {



//   if (!value) return "-";



//   const raw = String(value).trim();



//   const date = new Date(raw.includes("T") ? raw : `${raw}T00:00:00`);



//   if (Number.isNaN(date.getTime())) return raw;



//   return new Intl.DateTimeFormat("en-IN", {



//     day: "2-digit",



//     month: "short",



//     year: "numeric",



//   }).format(date);



// };



// const getClassType = (item) => {
//   const raw =
//     item?.class_type ??
//     item?.classType ??
//     item?.type ??
//     item?.class?.class_type ??
//     item?.class?.classType ??
//     "";

//   const normalized = String(raw).trim().toUpperCase();

//   // Current system values
//   if (
//     normalized === "RECORDING" ||
//     normalized === "RECORDING CLASS" ||
//     normalized === "RECORDED" ||
//     normalized === "RECORDED CLASS"
//   ) {
//     return "RECORDING";
//   }

//   if (
//     normalized === "LIVE" ||
//     normalized === "LIVE CLASS"
//   ) {
//     return "LIVE";
//   }

//   // Unknown/empty type must NOT be treated as LIVE.
//   return "";
// };



// const getClassMode = (item) =>



//   String(



//     item?.mode ||



//       item?.class_mode ||



//       item?.classMode ||



//       item?.class?.mode ||



//       ""



//   ).toUpperCase();



// /* =========================================================



//    STATUS



// ========================================================= */



// const getTemplateStatus = (session) =>

//   String(session?.status || "").toUpperCase();



// const getLiveStatus = (session) =>

//   String(session?.live_status || "").toUpperCase();



// const getDisplayStatus = (session) => {

//   const liveStatus = getLiveStatus(session);



//   if (["UPCOMING", "LIVE", "COMPLETED"].includes(liveStatus)) {

//     return liveStatus;

//   }



//   return getTemplateStatus(session) || "ACTIVE";

// };



// /* =========================================================

//    TIME-BASED SESSION STATUS

// ========================================================= */

// const getTimeBasedStatus = (session, nowMs = Date.now()) => {

//   const timezone =

//     session?.session_timezone ||

//     session?.timezone ||

//     session?.class_session_timezone ||

//     "Asia/Kolkata";



//   const startDate =

//     session?.start_date ||

//     session?.class_start_date ||

//     session?.class?.start_date;



//   const endDate =

//     session?.end_date ||

//     session?.class_end_date ||

//     session?.class?.end_date;



//   const startTime = session?.start_time;



//   if (!startDate || !startTime) return "UPCOMING";



//   const parsedTime = extractTimeFromApiValue(startTime, timezone);

//   if (!parsedTime) return "UPCOMING";



//   const buildZonedDate = (dateString, hour, minute) => {

//     const rawDate = String(dateString || "").trim().slice(0, 10);

//     const match = rawDate.match(/^(\d{4})-(\d{2})-(\d{2})$/);

//     if (!match) return null;



//     const year = Number(match[1]);

//     const month = Number(match[2]);

//     const day = Number(match[3]);



//     if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) {

//       return null;

//     }



//     const utcGuess = new Date(Date.UTC(year, month - 1, day, hour, minute, 0));



//     const parts = new Intl.DateTimeFormat("en-US", {

//       timeZone: timezone,

//       year: "numeric",

//       month: "2-digit",

//       day: "2-digit",

//       hour: "2-digit",

//       minute: "2-digit",

//       second: "2-digit",

//       hour12: false,

//     }).formatToParts(utcGuess);



//     const values = Object.fromEntries(

//       parts.map((part) => [part.type, part.value])

//     );



//     const timezoneWall = Date.UTC(

//       Number(values.year),

//       Number(values.month) - 1,

//       Number(values.day),

//       Number(values.hour) === 24 ? 0 : Number(values.hour),

//       Number(values.minute),

//       Number(values.second)

//     );



//     const offset = timezoneWall - utcGuess.getTime();

//     return new Date(utcGuess.getTime() - offset);

//   };



//   const sessionStart = buildZonedDate(

//     startDate,

//     parsedTime.hour,

//     parsedTime.minute

//   );



//   if (!sessionStart) return "UPCOMING";



//   const durationMinutes = Math.max(

//     Number(session?.duration) ||

//       Number(session?.class_duration) ||

//       Number(session?.class?.duration) ||

//       60,

//     1

//   );



//   const sessionEnd = new Date(

//     sessionStart.getTime() + durationMinutes * 60 * 1000

//   );



//   const now = new Date(nowMs);



//   if (endDate) {

//     const classEndDate = buildZonedDate(endDate, 23, 59);

//     if (classEndDate && now > classEndDate) return "COMPLETED";

//   }



//   if (now < sessionStart) return "UPCOMING";

//   if (now >= sessionStart && now < sessionEnd) return "LIVE";

//   return "COMPLETED";

// };



// const statusClass = (status) => {

//   switch (status) {

//     case "LIVE":

//       return "bg-red-500/15 text-red-300 border-red-500/20";

//     case "COMPLETED":

//       return "bg-blue-500/15 text-blue-300 border-blue-500/20";

//     case "UPCOMING":

//     case "SCHEDULED":

//       return "bg-amber-500/15 text-amber-300 border-amber-500/20";

//     case "ACTIVE":

//       return "bg-purple-500/15 text-purple-300 border-purple-500/20";

//     default:

//       return "bg-white/5 text-gray-300 border-white/10";

//   }

// };



// /* =========================================================



//    SMALL UI COMPONENTS



// ========================================================= */



// const FieldLabel = ({ children, required = false }) => (



//   <label className="block text-sm font-semibold text-gray-200 mb-2">



//     {children}



//     {required && <span className="text-pink-400 ml-1">*</span>}



//   </label>



// );



// const ModalShell = ({



//   children,



//   title,



//   subtitle,



//   icon: Icon,



//   onClose,



//   maxWidth = "max-w-2xl",



//   footer,



// }) => (



//   <div



//     className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-md p-4"



//     onMouseDown={(e) => {



//       if (e.target === e.currentTarget) onClose();



//     }}



//   >



//     <div



//       className={`w-full ${maxWidth} max-h-[calc(100vh-32px)] overflow-hidden rounded-3xl border border-purple-500/20 bg-[#17151f] shadow-[0_25px_90px_rgba(0,0,0,0.7)] flex flex-col`}



//     >



//       <div className="relative shrink-0 px-6 sm:px-7 py-5 border-b border-white/10 bg-gradient-to-r from-[#241739] via-[#1d1928] to-[#17151f]">



//         <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-pink-500" />



//         <div className="flex items-start justify-between gap-4">



//           <div className="flex items-start gap-3.5">



//             <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-purple-500/25 to-pink-500/20 border border-purple-400/20 flex items-center justify-center shrink-0">



//               <Icon size={20} className="text-purple-300" />



//             </div>



//             <div>



//               <h2 className="text-xl sm:text-2xl font-bold text-white">



//                 {title}



//               </h2>



//               {subtitle && (



//                 <p className="text-sm text-gray-400 mt-1.5 leading-5">



//                   {subtitle}



//                 </p>



//               )}



//             </div>



//           </div>



//           <button



//             type="button"



//             onClick={onClose}



//             className="w-9 h-9 rounded-xl border border-white/10 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center shrink-0"



//             aria-label="Close"



//           >



//             <X size={18} />



//           </button>



//         </div>



//       </div>



//       <div className="min-h-0 flex-1 overflow-y-auto px-6 sm:px-7 py-6">



//         {children}



//       </div>



//       <div className="shrink-0 px-6 sm:px-7 py-4 border-t border-white/10 bg-[#14131b]">



//         {footer}



//       </div>



//     </div>



//   </div>



// );



// const TimeInput = ({ value, ampm, onTimeChange, onAmPmChange }) => (



//   <div className="flex gap-2">



//     <div className="relative flex-1">



//       <Clock



//         size={16}



//         className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"



//       />



//       <input



//         type="text"



//         inputMode="numeric"



//         autoComplete="off"



//         maxLength={5}



//         placeholder="01:00"



//         value={value}



//         onChange={(e) => onTimeChange(sanitize12HourTime(e.target.value))}



//         className="w-full pl-10 pr-3 py-3.5 rounded-xl bg-[#191722] border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/70 focus:ring-2 focus:ring-purple-500/10 transition-all"



//       />



//     </div>



//     <select



//       value={ampm}



//       onChange={(e) => onAmPmChange(e.target.value)}



//       className="w-[92px] px-3 py-3.5 rounded-xl bg-[#191722] border border-white/10 text-white focus:outline-none focus:border-purple-500/70 focus:ring-2 focus:ring-purple-500/10 transition-all"



//     >



//       <option value="AM">AM</option>



//       <option value="PM">PM</option>



//     </select>



//   </div>



// );



// /* =========================================================



//    PAGE



// ========================================================= */



// export default function InstituteSessions() {



//   const tz = useTimezone();



//   const [sessions, setSessions] = useState([]);



//   const [classes, setClasses] = useState([]);



//   const [loading, setLoading] = useState(true);



//   const [creating, setCreating] = useState(false);



//   const [editing, setEditing] = useState(false);



//   const [deleting, setDeleting] = useState(false);



//   const [generatingZoom, setGeneratingZoom] = useState(false);



//   const [search, setSearch] = useState("");



//   const [statusFilter, setStatusFilter] = useState("ALL");



//   const [page, setPage] = useState(1);



//   // Recalculate LIVE/UPCOMING/COMPLETED automatically.

//   const [currentTime, setCurrentTime] = useState(Date.now());



//   const PAGE_SIZE = 10;



//   const [showCreateModal, setShowCreateModal] = useState(false);



//   const [showEditModal, setShowEditModal] = useState(false);



//   const [showDeleteModal, setShowDeleteModal] = useState(false);



//   const [showZoomModal, setShowZoomModal] = useState(false);



//   const [form, setForm] = useState({



//     class_id: "",



//   });



//   const createEmptySlot = () => ({



//     id: `${Date.now()}-${Math.random()}`,



//     title: "",



//     start_time: "",



//     start_ampm: "AM",



//   });



//   const [slots, setSlots] = useState([createEmptySlot()]);



//   const [editForm, setEditForm] = useState({



//     session_id: "",



//     class_id: "",



//     title: "",



//     start_time: "",



//     start_ampm: "AM",



//   });



//   const [selectedSession, setSelectedSession] = useState(null);



//   /* =======================================================



//      FORM HELPERS



//   ======================================================= */



//   const resetCreateForm = () => {



//     setForm({ class_id: "" });



//     setSlots([createEmptySlot()]);



//   };



//   const addSlot = () => {



//     setSlots((prev) => [...prev, createEmptySlot()]);



//   };



//   const removeSlot = (slotId) => {



//     if (slots.length <= 1) {



//       toast.error("At least one time slot is required");



//       return;



//     }



//     setSlots((prev) => prev.filter((slot) => slot.id !== slotId));



//   };



//   const updateSlot = (slotId, field, value) => {



//     setSlots((prev) =>



//       prev.map((slot) =>



//         slot.id === slotId ? { ...slot, [field]: value } : slot



//       )



//     );



//   };



//   /* =======================================================



//      FETCH



//   ======================================================= */



//   useEffect(() => {

//     const timer = setInterval(() => {

//       setCurrentTime(Date.now());

//     }, 30000);



//     return () => clearInterval(timer);

//   }, []);



//   const fetchClasses = async () => {



//     try {



//       const config = await authHeader();



//       const res = await axios.get(



//         `${API_URL}/classes/institute/my-classes`,



//         config



//       );



//       const root = res.data?.data ?? res.data ?? [];



//       const allClasses =



//         Array.isArray(root)



//           ? root



//           : Array.isArray(root?.classes)



//             ? root.classes



//             : Array.isArray(root?.data)



//               ? root.data



//               : Array.isArray(root?.rows)



//                 ? root.rows



//                 : [];



//       console.log("INSTITUTE CLASSES API RESPONSE:", res.data);



//       console.log("ALL INSTITUTE CLASSES:", allClasses);



//       // Sessions are created only for LIVE classes.



//       const liveClasses = allClasses.filter(



//         (cls) => getClassType(cls) === "LIVE"



//       );



//       console.log("LIVE CLASSES FOR SCHEDULES:", liveClasses);



//       setClasses(liveClasses);



//       return liveClasses;



//     } catch (err) {



//       console.error("Fetch live classes error:", err);



//       toast.error(



//         err.response?.data?.message || "Failed to load live classes"



//       );



//       setClasses([]);



//       return [];



//     }



//   };



//   const fetchSessions = async (liveClasses = classes) => {



//     try {



//       setLoading(true);



//       const config = await authHeader();



//       const res = await axios.get(



//         `${API_URL}/sessions/institute/my-sessions`,



//         config



//       );



//       let data = [];



//       if (Array.isArray(res.data)) {



//         data = res.data;



//       } else if (Array.isArray(res.data?.data)) {



//         data = res.data.data;



//       } else if (Array.isArray(res.data?.sessions)) {



//         data = res.data.sessions;



//       }



//       const liveClassMap = new Map(



//         (Array.isArray(liveClasses) ? liveClasses : []).map((cls) => [



//           String(cls.id),



//           cls,



//         ])



//       );



//       // Keep only sessions belonging to the institute's LIVE classes.



//       const normalized = data



//         .map((session) => {



//           const classId =



//             session.class_id ??



//             session.classId ??



//             session.class?.id;



//           const matchedClass = liveClassMap.get(String(classId));



//           if (!matchedClass || getClassType(matchedClass) !== "LIVE") {



//             return null;



//           }



//           return {



//             ...session,



//             id: session.id ?? session.session_id,



//             class_id: classId,



//             class_title:



//               session.class_title ||



//               session.class_name ||



//               session.class?.title ||



//               session.class?.name ||



//               matchedClass.title ||



//               matchedClass.name ||



//               "-",



//             start_date:



//               session.start_date ||



//               session.class_start_date ||



//               session.class?.start_date ||



//               matchedClass.start_date ||



//               null,



//             end_date:

//               session.end_date ||

//               session.class_end_date ||

//               session.class?.end_date ||

//               matchedClass.end_date ||

//               null,



//             duration:

//               session.duration ||

//               session.class_duration ||

//               session.class?.duration ||

//               matchedClass.duration ||

//               60,



//             session_timezone:

//               session.session_timezone ||

//               session.timezone ||

//               session.class_session_timezone ||

//               matchedClass.timezone ||

//               "Asia/Kolkata",



//             class_type: getClassType(matchedClass),



//             mode: getClassMode(matchedClass),



//             // Keep one authoritative schedule time from the LIVE class.

//             start_time:

//               session.start_time ||

//               session.class_start_time ||

//               session.class?.start_time ||

//               matchedClass.start_time ||

//               null,



//             // API returns the slot/template name as session_title.

//             // Normalize it so the table, edit modal, and search

//             // all use the same field.

//             title:

//               session.session_title ||

//               session.title ||

//               session.slot_name ||

//               "",



//             slot_name:

//               session.session_title ||

//               session.title ||

//               session.slot_name ||

//               "",



//             status: session.status



//               ? String(session.status).toUpperCase()



//               : "ACTIVE",



//             live_status: session.live_status



//               ? String(session.live_status).toUpperCase()



//               : undefined,



//           };



//         })



//         .filter(Boolean);



//       setSessions(normalized);



//     } catch (err) {



//       console.error("Fetch sessions error:", err);



//       toast.error(



//         err.response?.data?.message || "Failed to load sessions"



//       );



//       setSessions([]);



//     } finally {



//       setLoading(false);



//     }



//   };



//   useEffect(() => {



//     let mounted = true;



//     const loadPage = async () => {



//       const liveClasses = await fetchClasses();



//       if (mounted) {



//         await fetchSessions(liveClasses);



//       }



//     };



//     loadPage();



//     return () => {



//       mounted = false;



//     };



//   }, []);



//   const filteredSessions = useMemo(() => {



//     let data = Array.isArray(sessions) ? [...sessions] : [];



//     if (statusFilter !== "ALL") {



//       data = data.filter((session) => {

//         return getTimeBasedStatus(session, currentTime) === statusFilter;



//       });



//     }



//     const keyword = search.trim().toLowerCase();



//     if (keyword) {



//       data = data.filter((session) => {



//         const classTitle = String(



//           session.class_title ||



//             session.class_name ||



//             ""



//         ).toLowerCase();



//         const slotName = String(



//           session.session_title ||



//             session.title ||



//             session.slot_name ||



//             ""



//         ).toLowerCase();



//         const startTime = formatDisplayTime(



//           session.start_time



//         ).toLowerCase();



//         return (



//           classTitle.includes(keyword) ||



//           slotName.includes(keyword) ||



//           startTime.includes(keyword)



//         );



//       });



//     }



//     return data;



//   }, [sessions, search, statusFilter, currentTime]);



//   const totalPages = Math.ceil(



//     filteredSessions.length / PAGE_SIZE



//   );



//   const paginatedSessions = useMemo(() => {



//     const start = (page - 1) * PAGE_SIZE;



//     return filteredSessions.slice(start, start + PAGE_SIZE);



//   }, [filteredSessions, page]);



//   useEffect(() => {



//     if (page > totalPages && totalPages > 0) {



//       setPage(1);



//     }



//     if (totalPages === 0 && page !== 1) {



//       setPage(1);



//     }



//   }, [page, totalPages]);



//   useEffect(() => {



//     setPage(1);



//   }, [search, statusFilter]);



//   const stats = useMemo(() => {

//     const list = Array.isArray(sessions) ? sessions : [];



//     return {

//       total: list.length,

//       upcoming: list.filter(

//         (session) => getTimeBasedStatus(session, currentTime) === "UPCOMING"

//       ).length,

//       live: list.filter(

//         (session) => getTimeBasedStatus(session, currentTime) === "LIVE"

//       ).length,

//       completed: list.filter(

//         (session) => getTimeBasedStatus(session, currentTime) === "COMPLETED"

//       ).length,

//     };

//   }, [sessions, currentTime]);



//   /* =======================================================



//      CREATE



//   ======================================================= */



//   const createSession = async () => {
//     if (creating) return;

//     try {
//       if (!form.class_id) {
//         toast.error("Please select a class");
//         return;
//       }

//       const selectedClass = classes.find(
//         (cls) => String(cls.id) === String(form.class_id)
//       );
//       if (!selectedClass) {
//         toast.error("Selected class was not found");
//         return;
//       }
//       if (!Array.isArray(slots) || slots.length === 0) {
//         toast.error("Add at least one schedule slot");
//         return;
//       }

//       const allowedTimes = getTimeOptionsForClass(selectedClass);
//       const payloads = [];
//       const seenTimes = new Set();

//       for (let index = 0; index < slots.length; index += 1) {
//         const slot = slots[index];
//         const slotNumber = index + 1;
//         if (!slot.title?.trim()) {
//           toast.error(`Please enter a name for slot ${slotNumber}`);
//           return;
//         }
//         if (!slot.start_time) {
//           toast.error(`Please select a start time for slot ${slotNumber}`);
//           return;
//         }
//         const timeValue = `${slot.start_time}|${slot.start_ampm}`;
//         if (!allowedTimes.some((option) => option.value === timeValue)) {
//           toast.error(`Slot ${slotNumber}: choose a time within the selected class start and end time`);
//           return;
//         }
//         if (seenTimes.has(timeValue)) {
//           toast.error(`Slot ${slotNumber} uses a start time already selected for another slot`);
//           return;
//         }
//         seenTimes.add(timeValue);

//         const startTime = convertToUtcIso(
//           slot.start_time,
//           slot.start_ampm,
//           tz.timezone
//         );
//         if (!startTime) {
//           toast.error(`Unable to read the start time for slot ${slotNumber}`);
//           return;
//         }
//         payloads.push({
//           class_id: form.class_id,
//           title: slot.title.trim(),
//           start_time: startTime,
//           timezone: tz.timezone,
//         });
//       }

//       setCreating(true);
//       const config = await authHeader();
//       await axios.post(
//         `${API_URL}/sessions/institute/create`,
//         { sessions: payloads },
//         config
//       );

//       toast.success(`${payloads.length} class schedule${payloads.length === 1 ? "" : "s"} created`);
//       setShowCreateModal(false);
//       resetCreateForm();
//       await fetchSessions();
//     } catch (err) {
//       console.error("Create session error:", err);
//       toast.error(
//         err.response?.data?.message || err.message || "Unable to create session"
//       );
//     } finally {
//       setCreating(false);
//     }
//   };

//   const openEditModal = (session) => {

//     // Edit the saved session values; do not pull the time from the class.
//     const sessionStart = convertTo12Hour(

//       session.start_time,

//       tz.timezone

//     );



//     setSelectedSession(session);

//     setEditForm({

//       session_id: session.id,

//       class_id: session.class_id,

//       title:

//         session.session_title ||

//         session.title ||

//         session.slot_name ||

//         "",

//       start_time: sessionStart.time,

//       start_ampm: sessionStart.ampm,

//     });



//     setShowEditModal(true);

//   };



//   const handleEditClassChange = (classId) => {

//     // Changing the class does not overwrite the manually chosen schedule time.
//     setEditForm((prev) => ({

//       ...prev,

//       class_id: classId,

//     }));

//   };



//   const handleCreateClassChange = (classId) => {

//     // Selecting a class should not populate the slot name or start time.
//     // The user enters both values manually in the schedule form.
//     setForm({ class_id: classId });

//   };



//   const updateSession = async () => {

//     if (editing) return;



//     try {

//       if (!editForm.class_id) {

//         toast.error("Please select a class");

//         return;

//       }



//       if (!editForm.title.trim()) {

//         toast.error("Please enter a slot name");

//         return;

//       }



//       if (!editForm.start_time) {

//         toast.error("Please select a start time");

//         return;

//       }

//       const selectedClassForEdit = classes.find(
//         (cls) => String(cls.id) === String(editForm.class_id)
//       );
//       const allowedEditTimes = getTimeOptionsForClass(selectedClassForEdit);
//       if (!allowedEditTimes.some((option) => option.value === `${editForm.start_time}|${editForm.start_ampm}`)) {
//         toast.error("Choose a start time within the selected class start and end time");
//         return;
//       }



//       const startTime = convertToUtcIso(

//         editForm.start_time,

//         editForm.start_ampm,

//         tz.timezone

//       );



//       if (!startTime) {

//         toast.error("Invalid class start time");

//         return;

//       }



//       setEditing(true);

//       const config = await authHeader();



//       await axios.put(

//         `${API_URL}/sessions/${editForm.session_id}`,

//         {

//           class_id: editForm.class_id,

//           title: editForm.title.trim(),

//           start_time: startTime,

//           timezone: tz.timezone,

//         },

//         config

//       );



//       toast.success("Class schedule updated");

//       setShowEditModal(false);

//       setSelectedSession(null);

//       await fetchSessions();

//     } catch (err) {

//       console.error("Update session error:", err);

//       toast.error(

//         err.response?.data?.message ||

//           "Unable to update session"

//       );

//     } finally {

//       setEditing(false);

//     }

//   };



//   /* =======================================================



//      DELETE



//   ======================================================= */



//   const openDeleteModal = (session) => {



//     setSelectedSession(session);



//     setShowDeleteModal(true);



//   };



//   const deleteSession = async () => {



//     if (!selectedSession || deleting) return;



//     try {



//       setDeleting(true);



//       const config = await authHeader();



//       await axios.delete(



//         `${API_URL}/sessions/${selectedSession.id}`,



//         config



//       );



//       toast.success("Class schedule deleted");



//       setShowDeleteModal(false);



//       setSelectedSession(null);



//       await fetchSessions();



//     } catch (err) {



//       console.error("Delete session error:", err);



//       toast.error(



//         err.response?.data?.message ||



//           "Unable to delete session"



//       );



//     } finally {



//       setDeleting(false);



//     }



//   };



//   /* =======================================================



//      ZOOM



//   ======================================================= */



//   const openZoomModal = (session) => {



//     setSelectedSession(session);



//     setShowZoomModal(true);



//   };



//   const generateZoomMeeting = async () => {



//     if (!selectedSession || generatingZoom) return;



//     try {



//       setGeneratingZoom(true);



//       const config = await authHeader();



//       await axios.post(



//         `${API_URL}/sessions/${selectedSession.id}/generate-zoom`,



//         {},



//         config



//       );



//       toast.success("Zoom meeting generated");



//       await fetchSessions();



//       const refreshed = sessions.find(



//         (item) => item.id === selectedSession.id



//       );



//       if (refreshed) {



//         setSelectedSession(refreshed);



//       }



//       setShowZoomModal(false);



//     } catch (err) {



//       console.error("Generate Zoom error:", err);



//       toast.error(



//         err.response?.data?.message ||



//           "Unable to generate Zoom meeting"



//       );



//     } finally {



//       setGeneratingZoom(false);



//     }



//   };



//   const copyZoomLink = async (link) => {



//     if (!link) {



//       toast.error("Zoom link not available");



//       return;



//     }



//     try {



//       await navigator.clipboard.writeText(link);



//       toast.success("Zoom link copied");



//     } catch {



//       try {



//         const textArea = document.createElement("textarea");



//         textArea.value = link;



//         document.body.appendChild(textArea);



//         textArea.select();



//         document.execCommand("copy");



//         document.body.removeChild(textArea);



//         toast.success("Zoom link copied");



//       } catch {



//         toast.error("Unable to copy Zoom link");



//       }



//     }



//   };



//   /* =======================================================



//      RENDER



//   ======================================================= */



//   return (



//     <div className="min-h-full p-4 sm:p-6 lg:p-8 text-white">



//       {/* HEADER */}



//       <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5 mb-7">



//         <div>



//           <div className="flex items-center gap-2 text-purple-300 text-xs font-semibold tracking-[0.25em] uppercase mb-2">



//             <CalendarClock size={15} />



//             Class Schedules



//           </div>



//           <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-300 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">



//             Class Schedules



//           </h1>



//           <p className="text-gray-400 mt-2">



//             Manage schedules and time slots for your LIVE classes.



//           </p>



//         </div>



//         <button



//           type="button"



//           onClick={() => {



//             resetCreateForm();



//             setShowCreateModal(true);



//           }}



//           className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 hover:brightness-110 transition-all flex items-center justify-center gap-2"



//         >



//           <Plus size={18} />



//           Create Schedule



//         </button>



//       </div>



//       {/* STATS */}



//       <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 mb-5 justify-center">



//         {[



//           {



//             label: "Total Schedules",



//             value: stats.total,



//             icon: CalendarClock,



//           },



//           {



//             label: "Upcoming",



//             value: stats.upcoming,



//             icon: Clock,



//           },



//           {



//             label: "Live",



//             value: stats.live,



//             icon: Video,



//           },



//           {



//             label: "Completed",



//             value: stats.completed,



//             icon: CheckCircle,



//           },



//         ].map((item) => {



//           const Icon = item.icon;



//           return (



//             <div



//               key={item.label}



//               className="w-full max-w-[205px] min-h-[105px] rounded-2xl border border-white/10 bg-[#151519] p-4 hover:border-purple-500/20 transition-colors mx-auto"



//             >



//               <div className="flex items-center justify-between">



//                 <p className="text-[13px] text-gray-400">{item.label}</p>



//                 <div className="w-7 h-7 rounded-xl bg-purple-500/10 border border-purple-500/10 flex items-center justify-center">



//                   <Icon size={15} className="text-purple-300" />



//                 </div>



//               </div>



//               <h2 className="text-xl font-bold mt-1.5">



//                 {item.value}



//               </h2>



//             </div>



//           );



//         })}



//       </div>



//       {/* FILTERS */}



//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">



//         <div className="relative">



//           <Search



//             size={18}



//             className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"



//           />



//           <input



//             type="text"



//             placeholder="Search classes or slot names..."



//             value={search}



//             onChange={(e) => setSearch(e.target.value)}



//             className="w-full pl-11 pr-11 py-3.5 rounded-xl bg-[#151519] border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/60 transition-all"



//           />



//           {search && (



//             <button



//               type="button"



//               onClick={() => setSearch("")}



//               className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"



//             >



//               <X size={15} />



//             </button>



//           )}



//         </div>



//         <select



//           value={statusFilter}



//           onChange={(e) => setStatusFilter(e.target.value)}



//           className="w-full py-3.5 px-4 rounded-xl bg-[#151519] border border-white/10 text-white focus:outline-none focus:border-purple-500/60 transition-all"



//         >



//           <option value="ALL">All Status</option>

// <option value="UPCOMING">Upcoming</option>



//           <option value="LIVE">Live</option>



//           <option value="COMPLETED">Completed</option>



//         </select>



//       </div>



//       {/* TABLE */}



//       <div className="rounded-2xl border border-white/10 bg-[#151519] overflow-hidden">



//         {loading ? (



//           <div className="min-h-[360px] flex flex-col items-center justify-center">



//             <Loader2



//               size={32}



//               className="text-purple-400 animate-spin"



//             />



//             <p className="mt-4 text-gray-500">



//               Loading sessions...



//             </p>



//           </div>



//         ) : paginatedSessions.length === 0 ? (



//           <div className="min-h-[360px] flex flex-col items-center justify-center text-center px-6">



//             <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/10 flex items-center justify-center">



//               <BookOpen size={30} className="text-purple-400" />



//             </div>



//             <h3 className="text-lg font-semibold mt-5">



//               {search



//                 ? "No sessions found"



//                 : statusFilter !== "ALL"



//                 ? `No ${statusFilter.toLowerCase()} sessions found`



//                 : "No class schedules yet"}



//             </h3>



//             <p className="text-gray-500 text-sm mt-2 max-w-md">



//               Create a recurring time slot for one of your LIVE classes.



//             </p>



//           </div>



//         ) : (



//           <div className="overflow-x-auto">



//             <table className="w-full min-w-[1200px]">



//               <thead className="bg-[#202027]">



//                 <tr className="text-left">



//                   <th className="px-5 py-4 text-sm font-semibold text-gray-300">Class Name</th>



//                   <th className="px-5 py-4 text-sm font-semibold text-gray-300">Start Date</th>



//                   <th className="px-5 py-4 text-sm font-semibold text-gray-300">Start Time</th>

//                   <th className="px-5 py-4 text-sm font-semibold text-gray-300">Status</th>

//                   <th className="px-5 py-4 text-sm font-semibold text-gray-300">Class Type</th>



//                   <th className="px-5 py-4 text-sm font-semibold text-gray-300">Mode</th>



//                   <th className="px-5 py-4 text-sm font-semibold text-gray-300">Slot Name</th>



//                   <th className="px-5 py-4 text-sm font-semibold text-gray-300 text-right">Actions</th>



//                 </tr>



//               </thead>



//               <tbody>



//                 {paginatedSessions.map((session) => {



//                     const start12 = convertTo12Hour(



//                     session.start_time



//                   );



//                     const timeStatus = getTimeBasedStatus(

//                       session,

//                       currentTime

//                     );



//                     return (



//                       <tr



//                         key={session.id}



//                         className="border-t border-white/5 hover:bg-white/[0.025] transition-colors"



//                       >



//                         <td className="px-5 py-4">



//                           <div className="flex items-center gap-3 min-w-[240px]">



//                             <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/10 flex items-center justify-center shrink-0">



//                               <BookOpen size={17} className="text-purple-300" />



//                             </div>



//                             <p className="font-semibold text-white truncate max-w-[280px]">



//                               {session.class_title || session.class_name || "-"}



//                             </p>



//                           </div>



//                         </td>



//                         <td className="px-5 py-4 text-gray-200 whitespace-nowrap">



//                           {formatDisplayDate(session.start_date)}



//                         </td>



//                         <td className="px-5 py-4 whitespace-nowrap">



//                           <div className="flex items-center gap-2 text-gray-200">



//                             <Clock size={15} className="text-purple-400" />



//                             <span>{start12.time ? `${start12.time} ${start12.ampm}` : "Invalid time"}</span>



//                           </div>



//                         </td>



//                         <td className="px-5 py-4">

//                           <span

//                             className={`inline-flex px-3 py-1.5 rounded-full text-xs font-semibold border ${statusClass(

//                               timeStatus

//                             )}`}

//                           >

//                             {timeStatus}

//                           </span>

//                         </td>



//                         <td className="px-5 py-4">



//                           <span className="inline-flex px-3 py-1.5 rounded-full text-xs font-semibold border bg-red-500/10 text-red-300 border-red-500/20">



//                             {session.class_type || "LIVE"}



//                           </span>



//                         </td>



//                         <td className="px-5 py-4">



//                           <span className="inline-flex px-3 py-1.5 rounded-full text-xs font-semibold border bg-blue-500/10 text-blue-300 border-blue-500/20">



//                             {session.mode || "-"}



//                           </span>



//                         </td>



//                         <td className="px-5 py-4">



//                           <span className="font-medium text-gray-200">



//                             {session.session_title || session.title || session.slot_name || "-"}



//                           </span>



//                         </td>



//                         <td className="px-5 py-4">



//                           <div className="flex items-center justify-end gap-1.5">



//                             <button type="button" onClick={() => openZoomModal(session)} className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-purple-500/10 text-gray-400 hover:text-purple-300 transition-all" title={session.zoom_link ? "Manage Zoom" : "Generate Zoom"}>



//                               {session.zoom_link ? <Copy size={16} /> : <Video size={16} />}



//                             </button>



//                             <button type="button" onClick={() => openEditModal(session)} className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-purple-500/10 text-gray-400 hover:text-purple-300 transition-all" title="Edit">



//                               <Edit size={16} />



//                             </button>



//                             <button type="button" onClick={() => openDeleteModal(session)} className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-red-500/10 text-gray-500 hover:text-red-400 transition-all" title="Delete">



//                               <Trash2 size={16} />



//                             </button>



//                           </div>



//                         </td>



//                       </tr>                  );



//                 })}



//               </tbody>



//             </table>



//           </div>



//         )}



//       </div>



//       {/* PAGINATION */}



//       {totalPages > 1 && (



//         <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-5">



//           <p className="text-sm text-gray-500">



//             Showing {(page - 1) * PAGE_SIZE + 1}–



//             {Math.min(



//               page * PAGE_SIZE,



//               filteredSessions.length



//             )}{" "}



//             of {filteredSessions.length}



//           </p>



//           <div className="flex gap-2">



//             <button



//               type="button"



//               onClick={() =>



//                 setPage((p) => Math.max(1, p - 1))



//               }



//               disabled={page === 1}



//               className="px-4 py-2 rounded-xl bg-[#151519] border border-white/10 text-gray-300 hover:bg-white/5 disabled:opacity-40 transition-all"



//             >



//               Previous



//             </button>



//             <div className="px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/10 text-purple-300 text-sm">



//               {page} / {totalPages}



//             </div>



//             <button



//               type="button"



//               onClick={() =>



//                 setPage((p) =>



//                   Math.min(totalPages, p + 1)



//                 )



//               }



//               disabled={page === totalPages}



//               className="px-4 py-2 rounded-xl bg-[#151519] border border-white/10 text-gray-300 hover:bg-white/5 disabled:opacity-40 transition-all"



//             >



//               Next



//             </button>



//           </div>



//         </div>



//       )}



//       {/* =====================================================



//           CREATE MODAL



//           IMPORTANT:



//           - Footer is always visible.



//           - Only the content area scrolls.



//           - No Notes field.



//       ===================================================== */}



//       {showCreateModal && (

//         <ModalShell

//           title="Create Class Schedule"

//           subtitle="Choose a LIVE class, then enter a slot name and start time."

//           icon={Clock}

//           onClose={() => setShowCreateModal(false)}

//           maxWidth="max-w-xl"

//           footer={

//             <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">

//               <button type="button" onClick={() => setShowCreateModal(false)} className="px-5 py-3 rounded-xl border border-white/10 bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 transition-all font-medium">Cancel</button>

//               <button type="button" onClick={createSession} disabled={creating} className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg shadow-purple-500/20 hover:brightness-110 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">

//                 {creating ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} />}

//                 {creating ? "Creating..." : "Create Schedule"}

//               </button>

//             </div>

//           }

//         >

//           <div className="space-y-5">

//             <div>

//               <FieldLabel required>Class</FieldLabel>

//               <div className="relative">

//                 <BookOpen size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300 pointer-events-none" />

//                 <select value={form.class_id} onChange={(e) => handleCreateClassChange(e.target.value)} className="w-full appearance-none pl-11 pr-10 py-3.5 rounded-xl bg-[#191722] border border-white/10 text-white focus:outline-none focus:border-purple-500/70 focus:ring-2 focus:ring-purple-500/10 transition-all">

//                   <option value="">Choose a class</option>

//                   {classes.map((cls) => (

//                     <option key={cls.id} value={cls.id}>{cls.title || cls.name || `Class #${cls.id}`}</option>

//                   ))}

//                 </select>

//                 <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">⌄</span>

//               </div>

//             </div>



//             <div className="space-y-4">
//               <div className="flex items-center justify-between gap-3">
//                 <div>
//                   <h3 className="text-sm font-semibold text-white">Schedule Slots</h3>
//                   <p className="text-xs text-gray-400 mt-1">Add multiple slots for this class. Each slot must have a unique start time within the class time window.</p>
//                 </div>
//                 <button type="button" onClick={addSlot} className="shrink-0 inline-flex items-center gap-2 rounded-xl border border-purple-400/30 bg-purple-500/10 px-3 py-2 text-sm font-semibold text-purple-200 hover:bg-purple-500/20">
//                   <Plus size={16} /> Add Slot
//                 </button>
//               </div>

//               {slots.map((slot, index) => (
//                 <div key={slot.id} className="rounded-xl border border-white/10 bg-[#100f15] p-4 space-y-4">
//                   <div className="flex items-center justify-between">
//                     <h4 className="font-semibold text-white">Slot {index + 1}</h4>
//                     {slots.length > 1 && (
//                       <button type="button" onClick={() => removeSlot(slot.id)} className="rounded-lg px-3 py-1.5 text-sm text-rose-300 hover:bg-rose-500/10">Remove</button>
//                     )}
//                   </div>

//                   <div>
//                     <FieldLabel required>Slot Name</FieldLabel>
//                     <input type="text" value={slot.title || ""} onChange={(e) => updateSlot(slot.id, "title", e.target.value)} placeholder={`e.g. ${index === 0 ? "Morning Slot" : `Slot ${index + 1}`}`} className="w-full px-4 py-3.5 rounded-xl bg-[#191722] border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/70 focus:ring-2 focus:ring-purple-500/10 transition-all" />
//                   </div>

//                   <div>
//                     <FieldLabel required>Start Time</FieldLabel>
//                     <p className="text-xs text-gray-400 mb-2">Choose a time between this class’s start and end time.</p>
//                     <div className="relative">
//                       <Clock size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 pointer-events-none" />
//                       <select
//                         value={slot.start_time ? `${slot.start_time}|${slot.start_ampm}` : ""}
//                         onChange={(e) => {
//                           const [time, ampm] = e.target.value.split("|");
//                           updateSlot(slot.id, "start_time", time || "");
//                           updateSlot(slot.id, "start_ampm", ampm || "AM");
//                         }}
//                         className="w-full appearance-none pl-11 pr-10 py-3.5 rounded-xl bg-[#191722] border border-white/10 text-white focus:outline-none focus:border-purple-500/70 transition-all"
//                       >
//                         <option value="">Select start time</option>
//                         {getTimeOptionsForClass(classes.find((cls) => String(cls.id) === String(form.class_id))).map((item) => (
//                           <option key={item.value} value={item.value}>{item.label}</option>
//                         ))}
//                       </select>
//                       <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">⌄</span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//         </ModalShell>

//       )}



//       {showEditModal && (

//         <ModalShell

//           title="Edit Class Schedule"

//           subtitle="Update the LIVE class and slot name. Choose a schedule time within the selected class time window."

//           icon={Edit}

//           onClose={() => setShowEditModal(false)}

//           maxWidth="max-w-xl"

//           footer={

//             <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">

//               <button type="button" onClick={() => setShowEditModal(false)} className="px-5 py-3 rounded-xl border border-white/10 bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 transition-all font-medium">Cancel</button>

//               <button type="button" onClick={updateSession} disabled={editing} className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg shadow-purple-500/20 hover:brightness-110 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">

//                 {editing ? <Loader2 size={18} className="animate-spin" /> : <CheckCircle size={18} />}

//                 {editing ? "Saving..." : "Save Changes"}

//               </button>

//             </div>

//           }

//         >

//           <div className="space-y-5">

//             <div>

//               <FieldLabel required>Class</FieldLabel>

//               <div className="relative">

//                 <BookOpen size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300 pointer-events-none" />

//                 <select value={editForm.class_id} onChange={(e) => handleEditClassChange(e.target.value)} className="w-full appearance-none pl-11 pr-10 py-3.5 rounded-xl bg-[#191722] border border-white/10 text-white focus:outline-none focus:border-purple-500/70 focus:ring-2 focus:ring-purple-500/10 transition-all">

//                   {classes.map((cls) => (

//                     <option key={cls.id} value={cls.id}>{cls.title || cls.name || `Class #${cls.id}`}</option>

//                   ))}

//                 </select>

//                 <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">⌄</span>

//               </div>

//             </div>



//             <div>

//               <FieldLabel required>Slot Name</FieldLabel>

//               <input type="text" value={editForm.title} onChange={(e) => setEditForm((prev) => ({ ...prev, title: e.target.value }))} placeholder="e.g. Evening Slot" className="w-full px-4 py-3.5 rounded-xl bg-[#191722] border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/70 focus:ring-2 focus:ring-purple-500/10 transition-all" />

//             </div>



//             <div className="rounded-xl border border-white/10 bg-[#100f15] p-4">

//               <div className="flex items-center justify-between mb-3">

//                 <div>

//                   <FieldLabel required>Start Time</FieldLabel>

//                   <p className="text-xs text-gray-600 mt-[-4px]">Choose a time between this class’s start and end time</p>

//                 </div>

//               </div>

//               <div className="relative">

//                 <Clock size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 pointer-events-none" />

//                 <select

//                   value={editForm.start_time ? `${editForm.start_time}|${editForm.start_ampm}` : ""}

//                   onChange={(e) => {

//                     const [time, ampm] = e.target.value.split("|");

//                     setEditForm((prev) => ({

//                       ...prev,

//                       start_time: time || "",

//                       start_ampm: ampm || "AM",

//                     }));

//                   }}

//                   className="w-full appearance-none pl-11 pr-10 py-3.5 rounded-xl bg-[#191722] border border-white/10 text-white focus:outline-none focus:border-purple-500/70 transition-all"

//                 >

//                   <option value="">Select start time</option>

//                   {getTimeOptionsForClass(classes.find((cls) => String(cls.id) === String(editForm.class_id))).map((item) => (

//                     <option key={item.value} value={item.value}>

//                       {item.label}

//                     </option>

//                   ))}

//                 </select>

//                 <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">⌄</span>

//               </div>

//             </div>

//           </div>

//         </ModalShell>

//       )}



//       {showDeleteModal && (



//         <div



//           className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-md p-4"



//           onMouseDown={(e) => {



//             if (e.target === e.currentTarget) {



//               setShowDeleteModal(false);



//             }



//           }}



//         >



//           <div className="w-full max-w-md rounded-3xl border border-red-500/15 bg-[#1b1824] shadow-[0_25px_90px_rgba(0,0,0,0.7)] overflow-hidden">



//             <div className="p-7">



//               <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/10 flex items-center justify-center mb-5">



//                 <FaTrash className="text-red-400 text-lg" />



//               </div>



//               <h2 className="text-xl font-bold text-white">



//                 Delete Class Schedule?



//               </h2>



//               <p className="text-gray-400 text-sm leading-6 mt-2">



//                 This will permanently remove this recurring



//                 time slot.



//               </p>



//               {selectedSession && (



//                 <div className="mt-5 rounded-2xl bg-[#111016] border border-white/10 p-4 space-y-4">



//                   <div>



//                     <p className="text-xs text-gray-500">



//                       Class



//                     </p>



//                     <p className="font-semibold text-white mt-1">



//                       {selectedSession.class_title ||



//                         "-"}



//                     </p>



//                   </div>



//                   <div>



//                     <p className="text-xs text-gray-500">



//                       Start Time



//                     </p>



//                     <p className="font-semibold text-gray-200 mt-1">



//                       {formatDisplayTime(



//                         selectedSession.start_time



//                       )}



//                     </p>



//                   </div>



//                 </div>



//               )}



//               <div className="flex gap-3 mt-6">



//                 <button



//                   type="button"



//                   onClick={() =>



//                     setShowDeleteModal(false)



//                   }



//                   className="flex-1 px-5 py-3 rounded-xl border border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 transition-all"



//                 >



//                   Cancel



//                 </button>



//                 <button



//                   type="button"



//                   onClick={deleteSession}



//                   disabled={deleting}



//                   className="flex-1 px-5 py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold disabled:opacity-60 flex items-center justify-center gap-2"



//                 >



//                   {deleting ? (



//                     <Loader2



//                       size={17}



//                       className="animate-spin"



//                     />



//                   ) : (



//                     <Trash2 size={17} />



//                   )}



//                   {deleting ? "Deleting..." : "Delete"}



//                 </button>



//               </div>



//             </div>



//           </div>



//         </div>



//       )}



//       {/* ZOOM MODAL */}



//       {showZoomModal && (



//         <ModalShell



//           title="Zoom Meeting"



//           subtitle="Manage the recurring Zoom link for this session template."



//           icon={Video}



//           onClose={() => setShowZoomModal(false)}



//           maxWidth="max-w-xl"



//           footer={



//             <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">



//               <button



//                 type="button"



//                 onClick={() => setShowZoomModal(false)}



//                 className="px-5 py-3 rounded-xl border border-white/10 bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 transition-all font-medium"



//               >



//                 Close



//               </button>



//               <button



//                 type="button"



//                 onClick={generateZoomMeeting}



//                 disabled={generatingZoom}



//                 className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold disabled:opacity-60 flex items-center justify-center gap-2"



//               >



//                 {generatingZoom ? (



//                   <Loader2



//                     size={17}



//                     className="animate-spin"



//                   />



//                 ) : (



//                   <RefreshCcw size={17} />



//                 )}



//                 {generatingZoom



//                   ? "Generating..."



//                   : selectedSession?.zoom_link



//                   ? "Regenerate Zoom"



//                   : "Generate Zoom"}



//               </button>



//             </div>



//           }



//         >



//           {selectedSession?.zoom_link ? (



//             <div className="space-y-5">



//               <div className="rounded-2xl bg-[#100f15] border border-white/10 p-5">



//                 <p className="text-xs text-gray-500">



//                   Meeting ID



//                 </p>



//                 <p className="text-white font-semibold mt-1">



//                   {selectedSession.zoom_meeting_id ||



//                     "-"}



//                 </p>



//               </div>



//               <div className="rounded-2xl bg-[#100f15] border border-white/10 p-5">



//                 <p className="text-xs text-gray-500">



//                   Password



//                 </p>



//                 <p className="text-white font-semibold mt-1">



//                   {selectedSession.zoom_password ||



//                     "-"}



//                 </p>



//               </div>



//               <div>



//                 <p className="text-sm font-semibold text-gray-200 mb-2">



//                   Join URL



//                 </p>



//                 <div className="flex gap-2">



//                   <input



//                     readOnly



//                     value={selectedSession.zoom_link}



//                     className="flex-1 min-w-0 px-4 py-3 rounded-xl bg-[#191722] border border-white/10 text-white"



//                   />



//                   <button



//                     type="button"



//                     onClick={() =>



//                       copyZoomLink(



//                         selectedSession.zoom_link



//                       )



//                     }



//                     className="w-12 rounded-xl bg-purple-500/10 border border-purple-500/10 text-purple-300 hover:bg-purple-500/20 flex items-center justify-center"



//                     title="Copy Zoom link"



//                   >



//                     <Copy size={17} />



//                   </button>



//                 </div>



//               </div>



//             </div>



//           ) : (



//             <div className="text-center py-10">



//               <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/10 flex items-center justify-center mx-auto">



//                 <Video



//                   size={30}



//                   className="text-purple-300"



//                 />



//               </div>



//               <h3 className="text-xl font-bold mt-5">



//                 No Zoom Meeting



//               </h3>



//               <p className="text-gray-500 text-sm mt-2">



//                 Generate a recurring Zoom link for this



//                 session template.



//               </p>



//             </div>



//           )}



//         </ModalShell>



//       )}



//     </div>



//   );



// }





import React from "react";

import { useEffect, useMemo, useState } from "react";

import axios from "axios";

import toast from "react-hot-toast";

import { FaTrash } from "react-icons/fa";

import { getAuth } from "firebase/auth";

import {

Plus,

Search,

Clock,



  Video,



  Edit,



  Trash2,



  CheckCircle,



  Loader2,



  Copy,



  RefreshCcw,



  BookOpen,



  X,



  CalendarClock,



} from "lucide-react";



import { useTimezone, getTimezone } from "../utils/timezone";




const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://finearts-backend.onrender.com/api";



const TIME_OPTIONS = Array.from({ length: 96 }, (_, index) => {

  const hour24 = Math.floor(index / 4);

  const minute = (index % 4) * 15;

  const ampm = hour24 >= 12 ? "PM" : "AM";

  const hour12 = hour24 % 12 || 12;

  const time = `${String(hour12).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;

  return {

    value: `${time}|${ampm}`,

    label: `${time} ${ampm}`,

  };

});

// Convert class times (HH:mm[:ss] or 12-hour values) to minutes after midnight.
const parseClassTimeMinutes = (rawTime) => {
  if (rawTime === null || rawTime === undefined || rawTime === "") return null;
  const raw = String(rawTime).trim();
  const ampmMatch = raw.match(/(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM)/i);
  if (ampmMatch) {
    let hour = Number(ampmMatch[1]) % 12;
    if (ampmMatch[4].toUpperCase() === "PM") hour += 12;
    const minute = Number(ampmMatch[2]);
    if (minute > 59) return null;
    return hour * 60 + minute;
  }
  const match = raw.match(/^(\d{1,2}):(\d{2})(?::\d{2})?/);
  if (!match) return null;
  const hour = Number(match[1]);
  const minute = Number(match[2]);
  if (hour > 23 || minute > 59) return null;
  return hour * 60 + minute;
};

const getOptionMinutes = (option) => {
  const [time, ampm] = option.value.split("|");
  const [hourText, minuteText] = time.split(":");
  let hour = Number(hourText) % 12;
  if (ampm === "PM") hour += 12;
  return hour * 60 + Number(minuteText);
};

// Restrict schedule time choices to the selected class's own start/end window.
// If end_time is unavailable, use the class duration as a fallback.
const getTimeOptionsForClass = (selectedClass) => {
  if (!selectedClass) return [];
  const startMinutes = parseClassTimeMinutes(
    selectedClass.start_time ?? selectedClass.startTime ?? selectedClass.class_start_time
  );
  let endMinutes = parseClassTimeMinutes(
    selectedClass.end_time ?? selectedClass.endTime ?? selectedClass.finish_time ?? selectedClass.class_end_time
  );
  if (endMinutes === null && startMinutes !== null) {
    const duration = Number(selectedClass.duration ?? selectedClass.duration_minutes ?? selectedClass.class_duration);
    if (Number.isFinite(duration) && duration > 0) endMinutes = startMinutes + duration;
  }
  if (startMinutes === null || endMinutes === null) return [];
  const wrapsMidnight = endMinutes < startMinutes;
  if (endMinutes >= 1440) endMinutes %= 1440;
  return TIME_OPTIONS.filter((option) => {
    const minutes = getOptionMinutes(option);
    return wrapsMidnight
      ? minutes >= startMinutes || minutes <= endMinutes
      : minutes >= startMinutes && minutes <= endMinutes;
  });
};



/* =========================================================



   AUTH



========================================================= */



const authHeader = async () => {



  const auth = getAuth();



  let token = null;



  if (auth.currentUser) {



    token = await auth.currentUser.getIdToken(true);



  } else {



    token = localStorage.getItem("token");



  }



  if (!token) {



    throw new Error("Authentication token not available. Please sign in again.");



  }



  return {



    headers: {



      Authorization: `Bearer ${token}`,



      "X-Timezone": getTimezone(),



    },



  };



};



/* =========================================================



   TIME HELPERS



   UI: 12-hour format



   API: 24-hour format



========================================================= */



const sanitize12HourTime = (value = "") => {



  let raw = String(value).replace(/[^0-9:]/g, "");



  if (!raw.includes(":") && raw.length > 2) {



    raw = `${raw.slice(0, -2)}:${raw.slice(-2)}`;



  }



  let [hours = "", minutes = ""] = raw.split(":");



  hours = hours.replace(/\D/g, "").slice(0, 2);



  minutes = minutes.replace(/\D/g, "").slice(0, 2);



  if (!raw.includes(":")) return hours;



  return `${hours}${minutes !== "" ? `:${minutes}` : ":"}`;



};



const isValid12HourTime = (time) => {



  if (!/^\d{1,2}:\d{2}$/.test(String(time || ""))) return false;



  const [hours, minutes] = String(time).split(":").map(Number);



  return (



    Number.isInteger(hours) &&



    Number.isInteger(minutes) &&



    hours >= 1 &&



    hours <= 12 &&



    minutes >= 0 &&



    minutes <= 59



  );



};



/*



 * The sessions API expects start_time as a UTC ISO timestamp, not HH:mm.



 * The UI works in Asia/Calcutta (IST, UTC+05:30).



 *



 * Example:



 *   05:00 PM IST -> 1970-01-01T11:30:00.000Z



 *



 * A fixed date is intentional because this module stores a recurring TIME.



 * The date is only used to satisfy the API's ISO timestamp validation.



 */



const convertToUtcIso = (time, ampm, timezone = "Asia/Calcutta") => {



  if (!isValid12HourTime(time)) return null;



  let [hour, minute] = String(time).split(":").map(Number);



  const period = String(ampm || "AM").toUpperCase();



  if (period === "PM" && hour !== 12) hour += 12;



  if (period === "AM" && hour === 12) hour = 0;



  // India has no DST and is UTC+05:30. Keep a generic Intl fallback for the



  // configured timezone so the conversion is explicit rather than relying on



  // the browser's local timezone.



  if (timezone === "Asia/Calcutta" || timezone === "Asia/Kolkata") {



    const utcMillis = Date.UTC(1970, 0, 1, hour, minute) - (5 * 60 + 30) * 60 * 1000;



    return new Date(utcMillis).toISOString();



  }



  // Generic timezone conversion for any future timezone setting.



  // Start with the intended wall-clock UTC value and calculate the timezone



  // offset at that instant using Intl.



  const wallClock = new Date(Date.UTC(1970, 0, 1, hour, minute));



  const parts = new Intl.DateTimeFormat("en-US", {



    timeZone: timezone,



    hour12: false,



    year: "numeric",



    month: "2-digit",



    day: "2-digit",



    hour: "2-digit",



    minute: "2-digit",



    second: "2-digit",



  }).formatToParts(wallClock);



  const values = Object.fromEntries(



    parts.map((part) => [part.type, part.value])



  );



  const timezoneWall = Date.UTC(



    Number(values.year),



    Number(values.month) - 1,



    Number(values.day),



    Number(values.hour) === 24 ? 0 : Number(values.hour),



    Number(values.minute),



    Number(values.second)



  );



  const offset = timezoneWall - wallClock.getTime();



  return new Date(wallClock.getTime() - offset).toISOString();



};



const extractTimeFromApiValue = (value, timezone = "Asia/Calcutta") => {



  if (value === null || value === undefined || value === "") return null;



  const raw = String(value).trim();



  // API may return a database TIME value such as 17:00 or 17:00:00.



  const timeMatch = raw.match(/^(\d{1,2}):(\d{2})(?::\d{2})?$/);



  if (timeMatch) {



    return {



      hour: Number(timeMatch[1]),



      minute: Number(timeMatch[2]),



    };



  }



  // API may return the ISO value we send. Convert it to the configured



  // timezone before showing it in the 12-hour edit field.



  const date = new Date(raw);



  if (Number.isNaN(date.getTime())) return null;



  const parts = new Intl.DateTimeFormat("en-US", {



    timeZone: timezone,



    hour12: false,



    hour: "2-digit",



    minute: "2-digit",



  }).formatToParts(date);



  const values = Object.fromEntries(



    parts.map((part) => [part.type, part.value])



  );



  let hour = Number(values.hour);



  if (hour === 24) hour = 0;



  return {



    hour,



    minute: Number(values.minute),



  };



};



const convertTo12Hour = (time24, timezone = "Asia/Calcutta") => {



  if (time24 === null || time24 === undefined || time24 === "") {



    return { time: "", ampm: "AM" };



  }



  const parsed = extractTimeFromApiValue(time24, timezone);



  if (!parsed) return { time: "", ampm: "AM" };



  let hour = parsed.hour;



  const minute = parsed.minute;



  if (



    !Number.isInteger(hour) ||



    !Number.isInteger(minute) ||



    hour < 0 ||



    hour > 23 ||



    minute < 0 ||



    minute > 59



  ) {



    return { time: "", ampm: "AM" };



  }



  const ampm = hour >= 12 ? "PM" : "AM";



  hour = hour % 12 || 12;



  return {



    time: `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`,



    ampm,



  };



};



const formatDisplayTime = (time24) => {



  const value = convertTo12Hour(time24);



  return value.time ? `${value.time} ${value.ampm}` : "Invalid time";



};



const formatDisplayDate = (value) => {



  if (!value) return "-";



  const raw = String(value).trim();



  const date = new Date(raw.includes("T") ? raw : `${raw}T00:00:00`);



  if (Number.isNaN(date.getTime())) return raw;



  return new Intl.DateTimeFormat("en-IN", {



    day: "2-digit",



    month: "short",



    year: "numeric",



  }).format(date);



};



const getClassType = (item) => {
  const raw =
    item?.class_type ??
    item?.classType ??
    item?.type ??
    item?.class?.class_type ??
    item?.class?.classType ??
    "";

  const normalized = String(raw).trim().toUpperCase();

  // Current system values
  if (
    normalized === "RECORDING" ||
    normalized === "RECORDING CLASS" ||
    normalized === "RECORDED" ||
    normalized === "RECORDED CLASS"
  ) {
    return "RECORDING";
  }

  if (
    normalized === "LIVE" ||
    normalized === "LIVE CLASS"
  ) {
    return "LIVE";
  }

  // Unknown/empty type must NOT be treated as LIVE.
  return "";
};



const getClassMode = (item) =>



  String(



    item?.mode ||



      item?.class_mode ||



      item?.classMode ||



      item?.class?.mode ||



      ""



  ).toUpperCase();


// Resolve the trainer assigned to a class. Institute sessions inherit this
// value from the selected class rather than asking the institute to choose it.
const getClassTrainerName = (item) => {
  const trainer = item?.trainer || item?.assigned_trainer || item?.assignedTrainer;
  const raw =
    item?.trainer_name ||
    item?.trainerName ||
    item?.trainer_full_name ||
    item?.trainerFullName ||
    item?.trainer?.name ||
    item?.trainer?.full_name ||
    item?.trainer?.fullName ||
    item?.trainer?.display_name ||
    item?.trainer?.displayName ||
    item?.assigned_trainer_name ||
    item?.assignedTrainerName ||
    trainer?.name ||
    trainer?.full_name ||
    trainer?.fullName ||
    item?.instructor_name ||
    item?.instructor?.name ||
    "";
  return String(raw || "").trim() || "-";
};



/* =========================================================



   STATUS



========================================================= */



const getTemplateStatus = (session) =>

  String(session?.status || "").toUpperCase();



const getLiveStatus = (session) =>

  String(session?.live_status || "").toUpperCase();



const getDisplayStatus = (session) => {

  const liveStatus = getLiveStatus(session);



  if (["UPCOMING", "LIVE", "COMPLETED"].includes(liveStatus)) {

    return liveStatus;

  }



  return getTemplateStatus(session) || "ACTIVE";

};



/* =========================================================

   TIME-BASED SESSION STATUS

========================================================= */

const getTimeBasedStatus = (session, nowMs = Date.now()) => {

  const timezone =

    session?.session_timezone ||

    session?.timezone ||

    session?.class_session_timezone ||

    "Asia/Kolkata";



  const startDate =

    session?.start_date ||

    session?.class_start_date ||

    session?.class?.start_date;



  const endDate =

    session?.end_date ||

    session?.class_end_date ||

    session?.class?.end_date;



  const startTime = session?.start_time;



  if (!startDate || !startTime) return "UPCOMING";



  const parsedTime = extractTimeFromApiValue(startTime, timezone);

  if (!parsedTime) return "UPCOMING";



  const buildZonedDate = (dateString, hour, minute) => {

    const rawDate = String(dateString || "").trim().slice(0, 10);

    const match = rawDate.match(/^(\d{4})-(\d{2})-(\d{2})$/);

    if (!match) return null;



    const year = Number(match[1]);

    const month = Number(match[2]);

    const day = Number(match[3]);



    if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) {

      return null;

    }



    const utcGuess = new Date(Date.UTC(year, month - 1, day, hour, minute, 0));



    const parts = new Intl.DateTimeFormat("en-US", {

      timeZone: timezone,

      year: "numeric",

      month: "2-digit",

      day: "2-digit",

      hour: "2-digit",

      minute: "2-digit",

      second: "2-digit",

      hour12: false,

    }).formatToParts(utcGuess);



    const values = Object.fromEntries(

      parts.map((part) => [part.type, part.value])

    );



    const timezoneWall = Date.UTC(

      Number(values.year),

      Number(values.month) - 1,

      Number(values.day),

      Number(values.hour) === 24 ? 0 : Number(values.hour),

      Number(values.minute),

      Number(values.second)

    );



    const offset = timezoneWall - utcGuess.getTime();

    return new Date(utcGuess.getTime() - offset);

  };



  const sessionStart = buildZonedDate(

    startDate,

    parsedTime.hour,

    parsedTime.minute

  );



  if (!sessionStart) return "UPCOMING";



  const durationMinutes = Math.max(

    Number(session?.duration) ||

      Number(session?.class_duration) ||

      Number(session?.class?.duration) ||

      60,

    1

  );



  const sessionEnd = new Date(

    sessionStart.getTime() + durationMinutes * 60 * 1000

  );



  const now = new Date(nowMs);



  if (endDate) {

    const classEndDate = buildZonedDate(endDate, 23, 59);

    if (classEndDate && now > classEndDate) return "COMPLETED";

  }



  if (now < sessionStart) return "UPCOMING";

  if (now >= sessionStart && now < sessionEnd) return "LIVE";

  return "COMPLETED";

};



const statusClass = (status) => {

  switch (status) {

    case "LIVE":

      return "bg-red-500/15 text-red-300 border-red-500/20";

    case "COMPLETED":

      return "bg-blue-500/15 text-blue-300 border-blue-500/20";

    case "UPCOMING":

    case "SCHEDULED":

      return "bg-amber-500/15 text-amber-300 border-amber-500/20";

    case "ACTIVE":

      return "bg-purple-500/15 text-purple-300 border-purple-500/20";

    default:

      return "bg-white/5 text-gray-300 border-white/10";

  }

};



/* =========================================================



   SMALL UI COMPONENTS



========================================================= */



const FieldLabel = ({ children, required = false }) => (



  <label className="block text-sm font-semibold text-gray-200 mb-2">



    {children}



    {required && <span className="text-pink-400 ml-1">*</span>}



  </label>



);



const ModalShell = ({



  children,



  title,



  subtitle,



  icon: Icon,



  onClose,



  maxWidth = "max-w-2xl",



  footer,



}) => (



  <div



    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-md p-4"



    onMouseDown={(e) => {



      if (e.target === e.currentTarget) onClose();



    }}



  >



    <div



      className={`w-full ${maxWidth} max-h-[calc(100vh-32px)] overflow-hidden rounded-3xl border border-purple-500/20 bg-[#17151f] shadow-[0_25px_90px_rgba(0,0,0,0.7)] flex flex-col`}



    >



      <div className="relative shrink-0 px-6 sm:px-7 py-5 border-b border-white/10 bg-gradient-to-r from-[#241739] via-[#1d1928] to-[#17151f]">



        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-pink-500" />



        <div className="flex items-start justify-between gap-4">



          <div className="flex items-start gap-3.5">



            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-purple-500/25 to-pink-500/20 border border-purple-400/20 flex items-center justify-center shrink-0">



              <Icon size={20} className="text-purple-300" />



            </div>



            <div>



              <h2 className="text-xl sm:text-2xl font-bold text-white">



                {title}



              </h2>



              {subtitle && (



                <p className="text-sm text-gray-400 mt-1.5 leading-5">



                  {subtitle}



                </p>



              )}



            </div>



          </div>



          <button



            type="button"



            onClick={onClose}



            className="w-9 h-9 rounded-xl border border-white/10 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center shrink-0"



            aria-label="Close"



          >



            <X size={18} />



          </button>



        </div>



      </div>



      <div className="min-h-0 flex-1 overflow-y-auto px-6 sm:px-7 py-6">



        {children}



      </div>



      <div className="shrink-0 px-6 sm:px-7 py-4 border-t border-white/10 bg-[#14131b]">



        {footer}



      </div>



    </div>



  </div>



);



const TimeInput = ({ value, ampm, onTimeChange, onAmPmChange }) => (



  <div className="flex gap-2">



    <div className="relative flex-1">



      <Clock



        size={16}



        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"



      />



      <input



        type="text"



        inputMode="numeric"



        autoComplete="off"



        maxLength={5}



        placeholder="01:00"



        value={value}



        onChange={(e) => onTimeChange(sanitize12HourTime(e.target.value))}



        className="w-full pl-10 pr-3 py-3.5 rounded-xl bg-[#191722] border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/70 focus:ring-2 focus:ring-purple-500/10 transition-all"



      />



    </div>



    <select



      value={ampm}



      onChange={(e) => onAmPmChange(e.target.value)}



      className="w-[92px] px-3 py-3.5 rounded-xl bg-[#191722] border border-white/10 text-white focus:outline-none focus:border-purple-500/70 focus:ring-2 focus:ring-purple-500/10 transition-all"



    >



      <option value="AM">AM</option>



      <option value="PM">PM</option>



    </select>



  </div>



);



/* =========================================================



   PAGE



========================================================= */



export default function InstituteSessions() {



  const tz = useTimezone();



  const [sessions, setSessions] = useState([]);



  const [classes, setClasses] = useState([]);



  const [loading, setLoading] = useState(true);



  const [creating, setCreating] = useState(false);



  const [editing, setEditing] = useState(false);



  const [deleting, setDeleting] = useState(false);



  const [generatingZoom, setGeneratingZoom] = useState(false);



  const [search, setSearch] = useState("");



  const [statusFilter, setStatusFilter] = useState("ALL");



  const [page, setPage] = useState(1);



  // Recalculate LIVE/UPCOMING/COMPLETED automatically.

  const [currentTime, setCurrentTime] = useState(Date.now());



  const PAGE_SIZE = 10;



  const [showCreateModal, setShowCreateModal] = useState(false);



  const [showEditModal, setShowEditModal] = useState(false);



  const [showDeleteModal, setShowDeleteModal] = useState(false);



  const [showZoomModal, setShowZoomModal] = useState(false);



  const [form, setForm] = useState({



    class_id: "",



  });



  const createEmptySlot = () => ({



    id: `${Date.now()}-${Math.random()}`,



    title: "",



    start_time: "",



    start_ampm: "AM",



  });



  const [slots, setSlots] = useState([createEmptySlot()]);



  const [editForm, setEditForm] = useState({



    session_id: "",



    class_id: "",



    title: "",



    start_time: "",



    start_ampm: "AM",



  });



  const [selectedSession, setSelectedSession] = useState(null);



  /* =======================================================



     FORM HELPERS



  ======================================================= */



  const resetCreateForm = () => {



    setForm({ class_id: "" });



    setSlots([createEmptySlot()]);



  };



  const addSlot = () => {



    setSlots((prev) => [...prev, createEmptySlot()]);



  };



  const removeSlot = (slotId) => {



    if (slots.length <= 1) {



      toast.error("At least one time slot is required");



      return;



    }



    setSlots((prev) => prev.filter((slot) => slot.id !== slotId));



  };



  const updateSlot = (slotId, field, value) => {



    setSlots((prev) =>



      prev.map((slot) =>



        slot.id === slotId ? { ...slot, [field]: value } : slot



      )



    );



  };



  /* =======================================================



     FETCH



  ======================================================= */



  useEffect(() => {

    const timer = setInterval(() => {

      setCurrentTime(Date.now());

    }, 30000);



    return () => clearInterval(timer);

  }, []);



  const fetchClasses = async () => {



    try {



      const config = await authHeader();



      const res = await axios.get(



        `${API_URL}/classes/institute/my-classes`,



        config



      );



      const root = res.data?.data ?? res.data ?? [];



      const allClasses =



        Array.isArray(root)



          ? root



          : Array.isArray(root?.classes)



            ? root.classes



            : Array.isArray(root?.data)



              ? root.data



              : Array.isArray(root?.rows)



                ? root.rows



                : [];



      console.log("INSTITUTE CLASSES API RESPONSE:", res.data);



      console.log("ALL INSTITUTE CLASSES:", allClasses);



      // Sessions are created only for LIVE classes.



      const liveClasses = allClasses.filter(



        (cls) => getClassType(cls) === "LIVE"



      );



      console.log("LIVE CLASSES FOR SCHEDULES:", liveClasses);



      setClasses(liveClasses);



      return liveClasses;



    } catch (err) {



      console.error("Fetch live classes error:", err);



      toast.error(



        err.response?.data?.message || "Failed to load live classes"



      );



      setClasses([]);



      return [];



    }



  };



  const fetchSessions = async (liveClasses = classes) => {



    try {



      setLoading(true);



      const config = await authHeader();



      const res = await axios.get(



        `${API_URL}/sessions/institute/my-sessions`,



        config



      );



      let data = [];



      if (Array.isArray(res.data)) {



        data = res.data;



      } else if (Array.isArray(res.data?.data)) {



        data = res.data.data;



      } else if (Array.isArray(res.data?.sessions)) {



        data = res.data.sessions;



      }



      const liveClassMap = new Map(



        (Array.isArray(liveClasses) ? liveClasses : []).map((cls) => [



          String(cls.id),



          cls,



        ])



      );



      // Keep only sessions belonging to the institute's LIVE classes.



      const normalized = data



        .map((session) => {



          const classId =



            session.class_id ??



            session.classId ??



            session.class?.id;



          const matchedClass = liveClassMap.get(String(classId));



          if (!matchedClass || getClassType(matchedClass) !== "LIVE") {



            return null;



          }



          return {



            ...session,



            id: session.id ?? session.session_id,



            class_id: classId,



            class_title:



              session.class_title ||



              session.class_name ||



              session.class?.title ||



              session.class?.name ||



              matchedClass.title ||



              matchedClass.name ||



              "-",



            // Trainer is always resolved from the class linked to this session.
            trainer_name: getClassTrainerName(matchedClass),



            start_date:



              session.start_date ||



              session.class_start_date ||



              session.class?.start_date ||



              matchedClass.start_date ||



              null,



            end_date:

              session.end_date ||

              session.class_end_date ||

              session.class?.end_date ||

              matchedClass.end_date ||

              null,



            duration:

              session.duration ||

              session.class_duration ||

              session.class?.duration ||

              matchedClass.duration ||

              60,



            session_timezone:

              session.session_timezone ||

              session.timezone ||

              session.class_session_timezone ||

              matchedClass.timezone ||

              "Asia/Kolkata",



            class_type: getClassType(matchedClass),



            mode: getClassMode(matchedClass),



            // Keep one authoritative schedule time from the LIVE class.

            start_time:

              session.start_time ||

              session.class_start_time ||

              session.class?.start_time ||

              matchedClass.start_time ||

              null,



            // API returns the slot/template name as session_title.

            // Normalize it so the table, edit modal, and search

            // all use the same field.

            title:

              session.session_title ||

              session.title ||

              session.slot_name ||

              "",



            slot_name:

              session.session_title ||

              session.title ||

              session.slot_name ||

              "",



            status: session.status



              ? String(session.status).toUpperCase()



              : "ACTIVE",



            live_status: session.live_status



              ? String(session.live_status).toUpperCase()



              : undefined,



          };



        })



        .filter(Boolean);



      setSessions(normalized);



    } catch (err) {



      console.error("Fetch sessions error:", err);



      toast.error(



        err.response?.data?.message || "Failed to load sessions"



      );



      setSessions([]);



    } finally {



      setLoading(false);



    }



  };



  useEffect(() => {



    let mounted = true;



    const loadPage = async () => {



      const liveClasses = await fetchClasses();



      if (mounted) {



        await fetchSessions(liveClasses);



      }



    };



    loadPage();



    return () => {



      mounted = false;



    };



  }, []);



  const filteredSessions = useMemo(() => {



    let data = Array.isArray(sessions) ? [...sessions] : [];



    if (statusFilter !== "ALL") {



      data = data.filter((session) => {

        return getTimeBasedStatus(session, currentTime) === statusFilter;



      });



    }



    const keyword = search.trim().toLowerCase();



    if (keyword) {



      data = data.filter((session) => {



        const classTitle = String(



          session.class_title ||



            session.class_name ||



            ""



        ).toLowerCase();



        const trainerName = String(session.trainer_name || getClassTrainerName(session) || "").toLowerCase();

        const slotName = String(



          session.session_title ||



            session.title ||



            session.slot_name ||



            ""



        ).toLowerCase();



        const startTime = formatDisplayTime(



          session.start_time



        ).toLowerCase();



        return (



          classTitle.includes(keyword) ||



          trainerName.includes(keyword) ||



          slotName.includes(keyword) ||



          startTime.includes(keyword)



        );



      });



    }



    return data;



  }, [sessions, search, statusFilter, currentTime]);



  const totalPages = Math.ceil(



    filteredSessions.length / PAGE_SIZE



  );



  const paginatedSessions = useMemo(() => {



    const start = (page - 1) * PAGE_SIZE;



    return filteredSessions.slice(start, start + PAGE_SIZE);



  }, [filteredSessions, page]);



  useEffect(() => {



    if (page > totalPages && totalPages > 0) {



      setPage(1);



    }



    if (totalPages === 0 && page !== 1) {



      setPage(1);



    }



  }, [page, totalPages]);



  useEffect(() => {



    setPage(1);



  }, [search, statusFilter]);



  const stats = useMemo(() => {

    const list = Array.isArray(sessions) ? sessions : [];



    return {

      total: list.length,

      upcoming: list.filter(

        (session) => getTimeBasedStatus(session, currentTime) === "UPCOMING"

      ).length,

      live: list.filter(

        (session) => getTimeBasedStatus(session, currentTime) === "LIVE"

      ).length,

      completed: list.filter(

        (session) => getTimeBasedStatus(session, currentTime) === "COMPLETED"

      ).length,

    };

  }, [sessions, currentTime]);



  /* =======================================================



     CREATE



  ======================================================= */



  const createSession = async () => {
    if (creating) return;

    try {
      if (!form.class_id) {
        toast.error("Please select a class");
        return;
      }

      const selectedClass = classes.find(
        (cls) => String(cls.id) === String(form.class_id)
      );
      if (!selectedClass) {
        toast.error("Selected class was not found");
        return;
      }
      if (!Array.isArray(slots) || slots.length === 0) {
        toast.error("Add at least one schedule slot");
        return;
      }

      const allowedTimes = getTimeOptionsForClass(selectedClass);
      const payloads = [];
      const seenTimes = new Set();

      for (let index = 0; index < slots.length; index += 1) {
        const slot = slots[index];
        const slotNumber = index + 1;
        if (!slot.title?.trim()) {
          toast.error(`Please enter a name for slot ${slotNumber}`);
          return;
        }
        if (!slot.start_time) {
          toast.error(`Please select a start time for slot ${slotNumber}`);
          return;
        }
        const timeValue = `${slot.start_time}|${slot.start_ampm}`;
        if (!allowedTimes.some((option) => option.value === timeValue)) {
          toast.error(`Slot ${slotNumber}: choose a time within the selected class start and end time`);
          return;
        }
        if (seenTimes.has(timeValue)) {
          toast.error(`Slot ${slotNumber} uses a start time already selected for another slot`);
          return;
        }
        seenTimes.add(timeValue);

        const startTime = convertToUtcIso(
          slot.start_time,
          slot.start_ampm,
          tz.timezone
        );
        if (!startTime) {
          toast.error(`Unable to read the start time for slot ${slotNumber}`);
          return;
        }
        payloads.push({
          class_id: form.class_id,
          title: slot.title.trim(),
          start_time: startTime,
          timezone: tz.timezone,
        });
      }

      setCreating(true);
      const config = await authHeader();
      await axios.post(
        `${API_URL}/sessions/institute/create`,
        { sessions: payloads },
        config
      );

      toast.success(`${payloads.length} class schedule${payloads.length === 1 ? "" : "s"} created`);
      setShowCreateModal(false);
      resetCreateForm();
      await fetchSessions();
    } catch (err) {
      console.error("Create session error:", err);
      toast.error(
        err.response?.data?.message || err.message || "Unable to create session"
      );
    } finally {
      setCreating(false);
    }
  };

  const openEditModal = (session) => {

    // Edit the saved session values; do not pull the time from the class.
    const sessionStart = convertTo12Hour(

      session.start_time,

      tz.timezone

    );



    setSelectedSession(session);

    setEditForm({

      session_id: session.id,

      class_id: session.class_id,

      title:

        session.session_title ||

        session.title ||

        session.slot_name ||

        "",

      start_time: sessionStart.time,

      start_ampm: sessionStart.ampm,

    });



    setShowEditModal(true);

  };



  const handleEditClassChange = (classId) => {

    // Changing the class does not overwrite the manually chosen schedule time.
    setEditForm((prev) => ({

      ...prev,

      class_id: classId,

    }));

  };



  const handleCreateClassChange = (classId) => {

    // Selecting a class should not populate the slot name or start time.
    // The user enters both values manually in the schedule form.
    setForm({ class_id: classId });

  };



  const updateSession = async () => {

    if (editing) return;



    try {

      if (!editForm.class_id) {

        toast.error("Please select a class");

        return;

      }



      if (!editForm.title.trim()) {

        toast.error("Please enter a slot name");

        return;

      }



      if (!editForm.start_time) {

        toast.error("Please select a start time");

        return;

      }

      const selectedClassForEdit = classes.find(
        (cls) => String(cls.id) === String(editForm.class_id)
      );
      const allowedEditTimes = getTimeOptionsForClass(selectedClassForEdit);
      if (!allowedEditTimes.some((option) => option.value === `${editForm.start_time}|${editForm.start_ampm}`)) {
        toast.error("Choose a start time within the selected class start and end time");
        return;
      }



      const startTime = convertToUtcIso(

        editForm.start_time,

        editForm.start_ampm,

        tz.timezone

      );



      if (!startTime) {

        toast.error("Invalid class start time");

        return;

      }



      setEditing(true);

      const config = await authHeader();



      await axios.put(

        `${API_URL}/sessions/${editForm.session_id}`,

        {

          class_id: editForm.class_id,

          title: editForm.title.trim(),

          start_time: startTime,

          timezone: tz.timezone,

        },

        config

      );



      toast.success("Class schedule updated");

      setShowEditModal(false);

      setSelectedSession(null);

      await fetchSessions();

    } catch (err) {

      console.error("Update session error:", err);

      toast.error(

        err.response?.data?.message ||

          "Unable to update session"

      );

    } finally {

      setEditing(false);

    }

  };



  /* =======================================================



     DELETE



  ======================================================= */



  const openDeleteModal = (session) => {



    setSelectedSession(session);



    setShowDeleteModal(true);



  };



  const deleteSession = async () => {



    if (!selectedSession || deleting) return;



    try {



      setDeleting(true);



      const config = await authHeader();



      await axios.delete(



        `${API_URL}/sessions/${selectedSession.id}`,



        config



      );



      toast.success("Class schedule deleted");



      setShowDeleteModal(false);



      setSelectedSession(null);



      await fetchSessions();



    } catch (err) {



      console.error("Delete session error:", err);



      toast.error(



        err.response?.data?.message ||



          "Unable to delete session"



      );



    } finally {



      setDeleting(false);



    }



  };



  /* =======================================================



     ZOOM



  ======================================================= */



  const openZoomModal = (session) => {



    setSelectedSession(session);



    setShowZoomModal(true);



  };



  const generateZoomMeeting = async () => {



    if (!selectedSession || generatingZoom) return;



    try {



      setGeneratingZoom(true);



      const config = await authHeader();



      await axios.post(



        `${API_URL}/sessions/${selectedSession.id}/generate-zoom`,



        {},



        config



      );



      toast.success("Zoom meeting generated");



      await fetchSessions();



      const refreshed = sessions.find(



        (item) => item.id === selectedSession.id



      );



      if (refreshed) {



        setSelectedSession(refreshed);



      }



      setShowZoomModal(false);



    } catch (err) {



      console.error("Generate Zoom error:", err);



      toast.error(



        err.response?.data?.message ||



          "Unable to generate Zoom meeting"



      );



    } finally {



      setGeneratingZoom(false);



    }



  };



  const copyZoomLink = async (link) => {



    if (!link) {



      toast.error("Zoom link not available");



      return;



    }



    try {



      await navigator.clipboard.writeText(link);



      toast.success("Zoom link copied");



    } catch {



      try {



        const textArea = document.createElement("textarea");



        textArea.value = link;



        document.body.appendChild(textArea);



        textArea.select();



        document.execCommand("copy");



        document.body.removeChild(textArea);



        toast.success("Zoom link copied");



      } catch {



        toast.error("Unable to copy Zoom link");



      }



    }



  };



  /* =======================================================



     RENDER



  ======================================================= */



  return (



    <div className="min-h-full p-4 sm:p-6 lg:p-8 text-white">



      {/* HEADER */}



      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5 mb-7">



        <div>



          <div className="flex items-center gap-2 text-purple-300 text-xs font-semibold tracking-[0.25em] uppercase mb-2">



            <CalendarClock size={15} />



            Class Schedules



          </div>



          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-300 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">



            Class Schedules



          </h1>



          <p className="text-gray-400 mt-2">



            Manage schedules and time slots for your LIVE classes.



          </p>



        </div>



        <button



          type="button"



          onClick={() => {



            resetCreateForm();



            setShowCreateModal(true);



          }}



          className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 hover:brightness-110 transition-all flex items-center justify-center gap-2"



        >



          <Plus size={18} />



          Create Schedule



        </button>



      </div>



      {/* STATS */}



      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5 w-full">



        {[



          {



            label: "Total Schedules",



            value: stats.total,



            icon: CalendarClock,



          },



          {



            label: "Upcoming",



            value: stats.upcoming,



            icon: Clock,



          },



          {



            label: "Live",



            value: stats.live,



            icon: Video,



          },



          {



            label: "Completed",



            value: stats.completed,



            icon: CheckCircle,



          },



        ].map((item) => {



          const Icon = item.icon;



          return (



            <div



              key={item.label}



              className="w-full min-w-0 min-h-[105px] rounded-2xl border border-white/10 bg-[#151519] p-4 hover:border-purple-500/20 transition-colors"



            >



              <div className="flex items-center justify-between">



                <p className="text-[13px] text-gray-400">{item.label}</p>



                <div className="w-7 h-7 rounded-xl bg-purple-500/10 border border-purple-500/10 flex items-center justify-center">



                  <Icon size={15} className="text-purple-300" />



                </div>



              </div>



              <h2 className="text-xl font-bold mt-1.5">



                {item.value}



              </h2>



            </div>



          );



        })}



      </div>



      {/* FILTERS */}



      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">



        <div className="relative">



          <Search



            size={18}



            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"



          />



          <input



            type="text"



            placeholder="Search classes or slot names..."



            value={search}



            onChange={(e) => setSearch(e.target.value)}



            className="w-full pl-11 pr-11 py-3.5 rounded-xl bg-[#151519] border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/60 transition-all"



          />



          {search && (



            <button



              type="button"



              onClick={() => setSearch("")}



              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"



            >



              <X size={15} />



            </button>



          )}



        </div>



        <select



          value={statusFilter}



          onChange={(e) => setStatusFilter(e.target.value)}



          className="w-full py-3.5 px-4 rounded-xl bg-[#151519] border border-white/10 text-white focus:outline-none focus:border-purple-500/60 transition-all"



        >



          <option value="ALL">All Status</option>

<option value="UPCOMING">Upcoming</option>



          <option value="LIVE">Live</option>



          <option value="COMPLETED">Completed</option>



        </select>



      </div>



      {/* TABLE */}



      <div className="rounded-2xl border border-white/10 bg-[#151519] overflow-hidden">



        {loading ? (



          <div className="min-h-[360px] flex flex-col items-center justify-center">



            <Loader2



              size={32}



              className="text-purple-400 animate-spin"



            />



            <p className="mt-4 text-gray-500">



              Loading sessions...



            </p>



          </div>



        ) : paginatedSessions.length === 0 ? (



          <div className="min-h-[360px] flex flex-col items-center justify-center text-center px-6">



            <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/10 flex items-center justify-center">



              <BookOpen size={30} className="text-purple-400" />



            </div>



            <h3 className="text-lg font-semibold mt-5">



              {search



                ? "No sessions found"



                : statusFilter !== "ALL"



                ? `No ${statusFilter.toLowerCase()} sessions found`



                : "No class schedules yet"}



            </h3>



            <p className="text-gray-500 text-sm mt-2 max-w-md">



              Create a recurring time slot for one of your LIVE classes.



            </p>



          </div>



        ) : (



          <div className="overflow-x-auto">



            <table className="w-full min-w-[1300px]">



              <thead className="bg-[#202027]">



                <tr className="text-left">



                  <th className="px-5 py-4 text-sm font-semibold text-gray-300">Class Name</th>

                  <th className="px-5 py-4 text-sm font-semibold text-gray-300">Trainer</th>



                  <th className="px-5 py-4 text-sm font-semibold text-gray-300">Start Date</th>



                  <th className="px-5 py-4 text-sm font-semibold text-gray-300">Start Time</th>

                  <th className="px-5 py-4 text-sm font-semibold text-gray-300">Status</th>

                  <th className="px-5 py-4 text-sm font-semibold text-gray-300">Class Type</th>



                  <th className="px-5 py-4 text-sm font-semibold text-gray-300">Mode</th>



                  <th className="px-5 py-4 text-sm font-semibold text-gray-300">Slot Name</th>



                  <th className="px-5 py-4 text-sm font-semibold text-gray-300 text-right">Actions</th>



                </tr>



              </thead>



              <tbody>



                {paginatedSessions.map((session) => {



                    const start12 = convertTo12Hour(



                    session.start_time



                  );



                    const timeStatus = getTimeBasedStatus(

                      session,

                      currentTime

                    );



                    return (



                      <tr



                        key={session.id}



                        className="border-t border-white/5 hover:bg-white/[0.025] transition-colors"



                      >



                        <td className="px-5 py-4">



                          <div className="flex items-center gap-3 min-w-[240px]">



                            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/10 flex items-center justify-center shrink-0">



                              <BookOpen size={17} className="text-purple-300" />



                            </div>



                            <p className="font-semibold text-white truncate max-w-[280px]">



                              {session.class_title || session.class_name || "-"}



                            </p>



                          </div>



                        </td>

                        <td className="px-5 py-4 text-gray-200 whitespace-nowrap">
                          {session.trainer_name || getClassTrainerName(classes.find((cls) => String(cls.id) === String(session.class_id)))}
                        </td>



                        <td className="px-5 py-4 text-gray-200 whitespace-nowrap">



                          {formatDisplayDate(session.start_date)}



                        </td>



                        <td className="px-5 py-4 whitespace-nowrap">



                          <div className="flex items-center gap-2 text-gray-200">



                            <Clock size={15} className="text-purple-400" />



                            <span>{start12.time ? `${start12.time} ${start12.ampm}` : "Invalid time"}</span>



                          </div>



                        </td>



                        <td className="px-5 py-4">

                          <span

                            className={`inline-flex px-3 py-1.5 rounded-full text-xs font-semibold border ${statusClass(

                              timeStatus

                            )}`}

                          >

                            {timeStatus}

                          </span>

                        </td>



                        <td className="px-5 py-4">



                          <span className="inline-flex px-3 py-1.5 rounded-full text-xs font-semibold border bg-red-500/10 text-red-300 border-red-500/20">



                            {session.class_type || "LIVE"}



                          </span>



                        </td>



                        <td className="px-5 py-4">



                          <span className="inline-flex px-3 py-1.5 rounded-full text-xs font-semibold border bg-blue-500/10 text-blue-300 border-blue-500/20">



                            {session.mode || "-"}



                          </span>



                        </td>



                        <td className="px-5 py-4">



                          <span className="font-medium text-gray-200">



                            {session.session_title || session.title || session.slot_name || "-"}



                          </span>



                        </td>



                        <td className="px-5 py-4">



                          <div className="flex items-center justify-end gap-1.5">



                            <button type="button" onClick={() => openZoomModal(session)} className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-purple-500/10 text-gray-400 hover:text-purple-300 transition-all" title={session.zoom_link ? "Manage Zoom" : "Generate Zoom"}>



                              {session.zoom_link ? <Copy size={16} /> : <Video size={16} />}



                            </button>



                            <button type="button" onClick={() => openEditModal(session)} className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-purple-500/10 text-gray-400 hover:text-purple-300 transition-all" title="Edit">



                              <Edit size={16} />



                            </button>



                            <button type="button" onClick={() => openDeleteModal(session)} className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-red-500/10 text-gray-500 hover:text-red-400 transition-all" title="Delete">



                              <Trash2 size={16} />



                            </button>



                          </div>



                        </td>



                      </tr>                  );



                })}



              </tbody>



            </table>



          </div>



        )}



      </div>



      {/* PAGINATION */}



      {totalPages > 1 && (



        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-5">



          <p className="text-sm text-gray-500">



            Showing {(page - 1) * PAGE_SIZE + 1}–



            {Math.min(



              page * PAGE_SIZE,



              filteredSessions.length



            )}{" "}



            of {filteredSessions.length}



          </p>



          <div className="flex gap-2">



            <button



              type="button"



              onClick={() =>



                setPage((p) => Math.max(1, p - 1))



              }



              disabled={page === 1}



              className="px-4 py-2 rounded-xl bg-[#151519] border border-white/10 text-gray-300 hover:bg-white/5 disabled:opacity-40 transition-all"



            >



              Previous



            </button>



            <div className="px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/10 text-purple-300 text-sm">



              {page} / {totalPages}



            </div>



            <button



              type="button"



              onClick={() =>



                setPage((p) =>



                  Math.min(totalPages, p + 1)



                )



              }



              disabled={page === totalPages}



              className="px-4 py-2 rounded-xl bg-[#151519] border border-white/10 text-gray-300 hover:bg-white/5 disabled:opacity-40 transition-all"



            >



              Next



            </button>



          </div>



        </div>



      )}



      {/* =====================================================



          CREATE MODAL



          IMPORTANT:



          - Footer is always visible.



          - Only the content area scrolls.



          - No Notes field.



      ===================================================== */}



      {showCreateModal && (

        <ModalShell

          title="Create Class Schedule"

          subtitle="Choose a LIVE class, then enter a slot name and start time."

          icon={Clock}

          onClose={() => setShowCreateModal(false)}

          maxWidth="max-w-xl"

          footer={

            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">

              <button type="button" onClick={() => setShowCreateModal(false)} className="px-5 py-3 rounded-xl border border-white/10 bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 transition-all font-medium">Cancel</button>

              <button type="button" onClick={createSession} disabled={creating} className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg shadow-purple-500/20 hover:brightness-110 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">

                {creating ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} />}

                {creating ? "Creating..." : "Create Schedule"}

              </button>

            </div>

          }

        >

          <div className="space-y-5">

            <div>

              <FieldLabel required>Class</FieldLabel>

              <div className="relative">

                <BookOpen size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300 pointer-events-none" />

                <select value={form.class_id} onChange={(e) => handleCreateClassChange(e.target.value)} className="w-full appearance-none pl-11 pr-10 py-3.5 rounded-xl bg-[#191722] border border-white/10 text-white focus:outline-none focus:border-purple-500/70 focus:ring-2 focus:ring-purple-500/10 transition-all">

                  <option value="">Choose a class</option>

                  {classes.map((cls) => (

                    <option key={cls.id} value={cls.id}>{cls.title || cls.name || `Class #${cls.id}`}</option>

                  ))}

                </select>

                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">⌄</span>

              </div>

            </div>



            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-semibold text-white">Schedule Slots</h3>
                  <p className="text-xs text-gray-400 mt-1">Add multiple slots for this class. Each slot must have a unique start time within the class time window.</p>
                </div>
                <button type="button" onClick={addSlot} className="shrink-0 inline-flex items-center gap-2 rounded-xl border border-purple-400/30 bg-purple-500/10 px-3 py-2 text-sm font-semibold text-purple-200 hover:bg-purple-500/20">
                  <Plus size={16} /> Add Slot
                </button>
              </div>

              {slots.map((slot, index) => (
                <div key={slot.id} className="rounded-xl border border-white/10 bg-[#100f15] p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-white">Slot {index + 1}</h4>
                    {slots.length > 1 && (
                      <button type="button" onClick={() => removeSlot(slot.id)} className="rounded-lg px-3 py-1.5 text-sm text-rose-300 hover:bg-rose-500/10">Remove</button>
                    )}
                  </div>

                  <div>
                    <FieldLabel required>Slot Name</FieldLabel>
                    <input type="text" value={slot.title || ""} onChange={(e) => updateSlot(slot.id, "title", e.target.value)} placeholder={`e.g. ${index === 0 ? "Morning Slot" : `Slot ${index + 1}`}`} className="w-full px-4 py-3.5 rounded-xl bg-[#191722] border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/70 focus:ring-2 focus:ring-purple-500/10 transition-all" />
                  </div>

                  <div>
                    <FieldLabel required>Start Time</FieldLabel>
                    <p className="text-xs text-gray-400 mb-2">Choose a time between this class’s start and end time.</p>
                    <div className="relative">
                      <Clock size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 pointer-events-none" />
                      <select
                        value={slot.start_time ? `${slot.start_time}|${slot.start_ampm}` : ""}
                        onChange={(e) => {
                          const [time, ampm] = e.target.value.split("|");
                          updateSlot(slot.id, "start_time", time || "");
                          updateSlot(slot.id, "start_ampm", ampm || "AM");
                        }}
                        className="w-full appearance-none pl-11 pr-10 py-3.5 rounded-xl bg-[#191722] border border-white/10 text-white focus:outline-none focus:border-purple-500/70 transition-all"
                      >
                        <option value="">Select start time</option>
                        {getTimeOptionsForClass(classes.find((cls) => String(cls.id) === String(form.class_id))).map((item) => (
                          <option key={item.value} value={item.value}>{item.label}</option>
                        ))}
                      </select>
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">⌄</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </ModalShell>

      )}



      {showEditModal && (

        <ModalShell

          title="Edit Class Schedule"

          subtitle="Update the LIVE class and slot name. Choose a schedule time within the selected class time window."

          icon={Edit}

          onClose={() => setShowEditModal(false)}

          maxWidth="max-w-xl"

          footer={

            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">

              <button type="button" onClick={() => setShowEditModal(false)} className="px-5 py-3 rounded-xl border border-white/10 bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 transition-all font-medium">Cancel</button>

              <button type="button" onClick={updateSession} disabled={editing} className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg shadow-purple-500/20 hover:brightness-110 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">

                {editing ? <Loader2 size={18} className="animate-spin" /> : <CheckCircle size={18} />}

                {editing ? "Saving..." : "Save Changes"}

              </button>

            </div>

          }

        >

          <div className="space-y-5">

            <div>

              <FieldLabel required>Class</FieldLabel>

              <div className="relative">

                <BookOpen size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300 pointer-events-none" />

                <select value={editForm.class_id} onChange={(e) => handleEditClassChange(e.target.value)} className="w-full appearance-none pl-11 pr-10 py-3.5 rounded-xl bg-[#191722] border border-white/10 text-white focus:outline-none focus:border-purple-500/70 focus:ring-2 focus:ring-purple-500/10 transition-all">

                  {classes.map((cls) => (

                    <option key={cls.id} value={cls.id}>{cls.title || cls.name || `Class #${cls.id}`}</option>

                  ))}

                </select>

                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">⌄</span>

              </div>

            </div>



            <div>

              <FieldLabel required>Slot Name</FieldLabel>

              <input type="text" value={editForm.title} onChange={(e) => setEditForm((prev) => ({ ...prev, title: e.target.value }))} placeholder="e.g. Evening Slot" className="w-full px-4 py-3.5 rounded-xl bg-[#191722] border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/70 focus:ring-2 focus:ring-purple-500/10 transition-all" />

            </div>



            <div className="rounded-xl border border-white/10 bg-[#100f15] p-4">

              <div className="flex items-center justify-between mb-3">

                <div>

                  <FieldLabel required>Start Time</FieldLabel>

                  <p className="text-xs text-gray-600 mt-[-4px]">Choose a time between this class’s start and end time</p>

                </div>

              </div>

              <div className="relative">

                <Clock size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 pointer-events-none" />

                <select

                  value={editForm.start_time ? `${editForm.start_time}|${editForm.start_ampm}` : ""}

                  onChange={(e) => {

                    const [time, ampm] = e.target.value.split("|");

                    setEditForm((prev) => ({

                      ...prev,

                      start_time: time || "",

                      start_ampm: ampm || "AM",

                    }));

                  }}

                  className="w-full appearance-none pl-11 pr-10 py-3.5 rounded-xl bg-[#191722] border border-white/10 text-white focus:outline-none focus:border-purple-500/70 transition-all"

                >

                  <option value="">Select start time</option>

                  {getTimeOptionsForClass(classes.find((cls) => String(cls.id) === String(editForm.class_id))).map((item) => (

                    <option key={item.value} value={item.value}>

                      {item.label}

                    </option>

                  ))}

                </select>

                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">⌄</span>

              </div>

            </div>

          </div>

        </ModalShell>

      )}



      {showDeleteModal && (



        <div



          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-md p-4"



          onMouseDown={(e) => {



            if (e.target === e.currentTarget) {



              setShowDeleteModal(false);



            }



          }}



        >



          <div className="w-full max-w-md rounded-3xl border border-red-500/15 bg-[#1b1824] shadow-[0_25px_90px_rgba(0,0,0,0.7)] overflow-hidden">



            <div className="p-7">



              <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/10 flex items-center justify-center mb-5">



                <FaTrash className="text-red-400 text-lg" />



              </div>



              <h2 className="text-xl font-bold text-white">



                Delete Class Schedule?



              </h2>



              <p className="text-gray-400 text-sm leading-6 mt-2">



                This will permanently remove this recurring



                time slot.



              </p>



              {selectedSession && (



                <div className="mt-5 rounded-2xl bg-[#111016] border border-white/10 p-4 space-y-4">



                  <div>



                    <p className="text-xs text-gray-500">



                      Class



                    </p>



                    <p className="font-semibold text-white mt-1">



                      {selectedSession.class_title ||



                        "-"}



                    </p>



                  </div>



                  <div>



                    <p className="text-xs text-gray-500">



                      Start Time



                    </p>



                    <p className="font-semibold text-gray-200 mt-1">



                      {formatDisplayTime(



                        selectedSession.start_time



                      )}



                    </p>



                  </div>



                </div>



              )}



              <div className="flex gap-3 mt-6">



                <button



                  type="button"



                  onClick={() =>



                    setShowDeleteModal(false)



                  }



                  className="flex-1 px-5 py-3 rounded-xl border border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 transition-all"



                >



                  Cancel



                </button>



                <button



                  type="button"



                  onClick={deleteSession}



                  disabled={deleting}



                  className="flex-1 px-5 py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold disabled:opacity-60 flex items-center justify-center gap-2"



                >



                  {deleting ? (



                    <Loader2



                      size={17}



                      className="animate-spin"



                    />



                  ) : (



                    <Trash2 size={17} />



                  )}



                  {deleting ? "Deleting..." : "Delete"}



                </button>



              </div>



            </div>



          </div>



        </div>



      )}



      {/* ZOOM MODAL */}



      {showZoomModal && (



        <ModalShell



          title="Zoom Meeting"



          subtitle="Manage the recurring Zoom link for this session template."



          icon={Video}



          onClose={() => setShowZoomModal(false)}



          maxWidth="max-w-xl"



          footer={



            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">



              <button



                type="button"



                onClick={() => setShowZoomModal(false)}



                className="px-5 py-3 rounded-xl border border-white/10 bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 transition-all font-medium"



              >



                Close



              </button>



              <button



                type="button"



                onClick={generateZoomMeeting}



                disabled={generatingZoom}



                className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold disabled:opacity-60 flex items-center justify-center gap-2"



              >



                {generatingZoom ? (



                  <Loader2



                    size={17}



                    className="animate-spin"



                  />



                ) : (



                  <RefreshCcw size={17} />



                )}



                {generatingZoom



                  ? "Generating..."



                  : selectedSession?.zoom_link



                  ? "Regenerate Zoom"



                  : "Generate Zoom"}



              </button>



            </div>



          }



        >



          {selectedSession?.zoom_link ? (



            <div className="space-y-5">



              <div className="rounded-2xl bg-[#100f15] border border-white/10 p-5">



                <p className="text-xs text-gray-500">



                  Meeting ID



                </p>



                <p className="text-white font-semibold mt-1">



                  {selectedSession.zoom_meeting_id ||



                    "-"}



                </p>



              </div>



              <div className="rounded-2xl bg-[#100f15] border border-white/10 p-5">



                <p className="text-xs text-gray-500">



                  Password



                </p>



                <p className="text-white font-semibold mt-1">



                  {selectedSession.zoom_password ||



                    "-"}



                </p>



              </div>



              <div>



                <p className="text-sm font-semibold text-gray-200 mb-2">



                  Join URL



                </p>



                <div className="flex gap-2">



                  <input



                    readOnly



                    value={selectedSession.zoom_link}



                    className="flex-1 min-w-0 px-4 py-3 rounded-xl bg-[#191722] border border-white/10 text-white"



                  />



                  <button



                    type="button"



                    onClick={() =>



                      copyZoomLink(



                        selectedSession.zoom_link



                      )



                    }



                    className="w-12 rounded-xl bg-purple-500/10 border border-purple-500/10 text-purple-300 hover:bg-purple-500/20 flex items-center justify-center"



                    title="Copy Zoom link"



                  >



                    <Copy size={17} />



                  </button>



                </div>



              </div>



            </div>



          ) : (



            <div className="text-center py-10">



              <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/10 flex items-center justify-center mx-auto">



                <Video



                  size={30}



                  className="text-purple-300"



                />



              </div>



              <h3 className="text-xl font-bold mt-5">



                No Zoom Meeting



              </h3>



              <p className="text-gray-500 text-sm mt-2">



                Generate a recurring Zoom link for this



                session template.



              </p>



            </div>



          )}



        </ModalShell>



      )}



    </div>



  );



}