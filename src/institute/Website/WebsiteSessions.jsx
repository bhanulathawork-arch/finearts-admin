// // src/institute/Website/WebsiteSessions.jsx

// import { useEffect, useMemo, useState } from "react";

// import {
//   HiCalendar,
//   HiClock,
//   HiExternalLink,
//   HiVideoCamera,
//   HiShieldCheck,
//   HiCheckCircle,
//   HiGlobe,
//   HiArrowRight,
//   HiArrowLeft,
// } from "react-icons/hi";

// import {
//   useNavigate,
//   useOutletContext,
// } from "react-router-dom";

// import { getTimezone } from "../../utils/timezone";


// /* =========================================================
//    DEFAULT BRANDING
// ========================================================= */

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
// ========================================================= */

// const getBrandingValue = (
//   branding,
//   camelKey,
//   snakeKey,
//   fallback
// ) => {
//   const value =
//     branding?.[camelKey] ??
//     branding?.[snakeKey];

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
//   branding
// ) =>
//   branding.roundedButtons
//     ? "9999px"
//     : "10px";


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
//    CONTRAST HELPERS
// ========================================================= */

// const getReadableTextColor = (
//   background
// ) => {
//   if (
//     typeof background !== "string"
//   ) {
//     return "#FFFFFF";
//   }

//   const hex =
//     background.replace("#", "");

//   if (
//     !/^[0-9A-Fa-f]{6}$/.test(hex)
//   ) {
//     return "#FFFFFF";
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

//   const brightness =
//     (r * 299 +
//       g * 587 +
//       b * 114) /
//     1000;

//   return brightness > 150
//     ? "#111827"
//     : "#FFFFFF";
// };


// /* =========================================================
//    TIME FORMAT
// ========================================================= */

// const formatTime = (
//   time
// ) => {
//   if (!time) {
//     return "--";
//   }

//   const value =
//     String(time).trim();

//   if (
//     value
//       .toLowerCase()
//       .includes("am") ||
//     value
//       .toLowerCase()
//       .includes("pm")
//   ) {
//     return value;
//   }

//   const parts =
//     value.split(":");

//   if (parts.length < 2) {
//     return value;
//   }

//   let hour =
//     Number(parts[0]);

//   const minute =
//     String(parts[1]).padStart(
//       2,
//       "0"
//     );

//   if (
//     Number.isNaN(hour)
//   ) {
//     return value;
//   }

//   const period =
//     hour >= 12
//       ? "PM"
//       : "AM";

//   hour =
//     hour % 12 || 12;

//   return `${hour}:${minute} ${period}`;
// };


// /* =========================================================
//    DATE FORMAT
// ========================================================= */

// const formatDate = (
//   date
// ) => {
//   if (!date) {
//     return "";
//   }

//   try {
//     const parsed =
//       new Date(date);

//     if (
//       Number.isNaN(
//         parsed.getTime()
//       )
//     ) {
//       return String(date);
//     }

//     return parsed.toLocaleDateString(
//       "en-IN",
//       {
//         day: "2-digit",
//         month: "short",
//         year: "numeric",
//       }
//     );
//   } catch {
//     return String(date);
//   }
// };


// /* =========================================================
//    DAYS
// ========================================================= */

// const formatDaysCompact = (
//   days
// ) => {
//   if (
//     !Array.isArray(days) ||
//     days.length === 0
//   ) {
//     return "No days";
//   }

//   return days
//     .map((day) =>
//       String(day).substring(
//         0,
//         3
//       )
//     )
//     .join(" • ");
// };


// const normalizeDays = (
//   days
// ) => {

//   if (
//     Array.isArray(days)
//   ) {
//     return days
//       .map((day) =>
//         String(day).trim()
//       )
//       .filter(Boolean);
//   }


//   if (
//     typeof days === "string"
//   ) {

//     const value =
//       days.trim();

//     if (!value) {
//       return [];
//     }


//     if (
//       value.startsWith("[") &&
//       value.endsWith("]")
//     ) {

//       try {

//         const parsed =
//           JSON.parse(value);

//         if (
//           Array.isArray(
//             parsed
//           )
//         ) {
//           return parsed
//             .map((day) =>
//               String(day).trim()
//             )
//             .filter(Boolean);
//         }

//       } catch {
//         // Continue below
//       }
//     }


//     return value
//       .split(",")
//       .map((day) =>
//         day.trim()
//       )
//       .filter(Boolean);
//   }

//   return [];
// };


// /* =========================================================
//    TIMEZONE
// ========================================================= */

// const getNowInTimezone = (
//   timezone
// ) => {

//   const tz =
//     timezone ||
//     "Asia/Kolkata";

//   try {

//     const parts =
//       new Intl.DateTimeFormat(
//         "en-US",
//         {
//           timeZone: tz,
//           hour: "numeric",
//           minute: "numeric",
//           second: "numeric",
//           hour12: false,
//         }
//       ).formatToParts(
//         new Date()
//       );


//     let hour =
//       Number(
//         parts.find(
//           (part) =>
//             part.type ===
//             "hour"
//         )?.value || 0
//       );


//     if (hour === 24) {
//       hour = 0;
//     }


//     const minute =
//       parts.find(
//         (part) =>
//           part.type ===
//           "minute"
//       )?.value ||
//       "00";


//     const second =
//       parts.find(
//         (part) =>
//           part.type ===
//           "second"
//       )?.value ||
//       "00";


//     return `${String(
//       hour
//     ).padStart(
//       2,
//       "0"
//     )}:${String(
//       minute
//     ).padStart(
//       2,
//       "0"
//     )}:${String(
//       second
//     ).padStart(
//       2,
//       "0"
//     )}`;

//   } catch {
//     return "00:00:00";
//   }
// };


// /* =========================================================
//    TODAY
// ========================================================= */

// const getTodayName = (
//   timezone
// ) => {

//   try {

//     return new Intl.DateTimeFormat(
//       "en-US",
//       {
//         timeZone:
//           timezone ||
//           "Asia/Kolkata",

//         weekday:
//           "long",
//       }
//     ).format(
//       new Date()
//     );

//   } catch {

//     return new Date()
//       .toLocaleDateString(
//         "en-US",
//         {
//           weekday:
//             "long",
//         }
//       );

//   }
// };


// /* =========================================================
//    LIVE STATUS
// ========================================================= */

// const getLiveStatus = (
//   session,
//   viewerTimezone
// ) => {

//   if (!session) {
//     return "SCHEDULED";
//   }


//   const startTime =
//     session.start_time ||
//     session.startTime ||
//     session.local_start_time;


//   const endTime =
//     session.end_time ||
//     session.endTime;


//   const days =
//     normalizeDays(
//       session.days ||
//         session.available_days ||
//         session.availableDays
//     );


//   if (
//     !startTime ||
//     !endTime ||
//     !days.length
//   ) {
//     return "SCHEDULED";
//   }


//   const today =
//     getTodayName(
//       viewerTimezone
//     );


//   const isToday =
//     days.some(
//       (day) =>
//         String(day)
//           .toLowerCase() ===
//         String(today)
//           .toLowerCase()
//     );


//   if (!isToday) {
//     return "SCHEDULED";
//   }


//   const sessionTimezone =
//     session.class_timezone ||
//     session.class_session_timezone ||
//     session.session_timezone ||
//     session.timezone ||
//     viewerTimezone ||
//     "Asia/Kolkata";


//   const current =
//     getNowInTimezone(
//       sessionTimezone
//     );


//   const normalizedStart =
//     String(startTime)
//       .substring(0, 8);


//   const normalizedEnd =
//     String(endTime)
//       .substring(0, 8);


//   if (
//     current >=
//       normalizedStart &&
//     current <=
//       normalizedEnd
//   ) {
//     return "LIVE";
//   }


//   if (
//     current >
//     normalizedEnd
//   ) {
//     return "COMPLETED";
//   }


//   return "UPCOMING";
// };


// /* =========================================================
//    STATUS CONFIG
// ========================================================= */

// const STATUS_CONFIG = {
//   LIVE: {
//     title: "Live Now",
//   },

//   UPCOMING: {
//     title: "Starting Soon",
//   },

//   SCHEDULED: {
//     title: "Scheduled",
//   },

//   COMPLETED: {
//     title: "Completed",
//   },
// };


// /* =========================================================
//    MAIN COMPONENT
// ========================================================= */

// export default function WebsiteSessions() {

//   const navigate =
//     useNavigate();


//   const outletContext =
//     useOutletContext() || {};


//   const {
//     sessions:
//       outletSessions = [],

//     website = {},

//     branding:
//       outletBranding = {},

//     banners:
//       outletBanners = [],
//   } = outletContext;


//   /* =======================================================
//      BRANDING
//   ======================================================= */

//   const branding =
//     useMemo(
//       () =>
//         normalizeBranding(
//           outletBranding
//         ),
//       [outletBranding]
//     );


//   /* =======================================================
//      SESSIONS
//   ======================================================= */

//   const sessions =
//     useMemo(() => {

//       if (
//         Array.isArray(
//           outletSessions
//         )
//       ) {
//         return outletSessions;
//       }


//       if (
//         Array.isArray(
//           website?.sessions
//         )
//       ) {
//         return website.sessions;
//       }


//       return [];

//     }, [
//       outletSessions,
//       website,
//     ]);


//   /* =======================================================
//      BANNERS
//   ======================================================= */

//   const banners =
//     useMemo(() => {

//       if (
//         Array.isArray(
//           outletBanners
//         )
//       ) {
//         return outletBanners;
//       }

//       if (
//         Array.isArray(
//           website?.banners
//         )
//       ) {
//         return website.banners;
//       }

//       return [];

//     }, [
//       outletBanners,
//       website,
//     ]);


//   /* =======================================================
//      TIMEZONE
//   ======================================================= */

//   const [
//     timezone,
//     setTimezone,
//   ] = useState(
//     "Asia/Kolkata"
//   );


//   const [
//     timezoneLabel,
//     setTimezoneLabel,
//   ] = useState(
//     "Asia/Kolkata"
//   );


//   const [
//     timezoneAbbr,
//     setTimezoneAbbr,
//   ] = useState("IST");


//   const [
//     currentTime,
//     setCurrentTime,
//   ] = useState("");


//   /* =======================================================
//      GET USER TIMEZONE
//   ======================================================= */

//   useEffect(() => {

//     try {

//       const tz =
//         getTimezone();

//       if (!tz) {
//         return;
//       }


//       if (
//         typeof tz ===
//         "string"
//       ) {

//         setTimezone(tz);

//         setTimezoneLabel(
//           tz
//         );

//         setTimezoneAbbr(
//           tz ===
//           "Asia/Kolkata"
//             ? "IST"
//             : tz
//         );

//         return;
//       }


//       setTimezone(
//         tz.timezone ||
//           "Asia/Kolkata"
//       );


//       setTimezoneLabel(
//         tz.label ||
//           tz.timezone ||
//           "Asia/Kolkata"
//       );


//       setTimezoneAbbr(
//         tz.abbr ||
//           "IST"
//       );

//     } catch (error) {

//       console.error(
//         "Timezone error:",
//         error
//       );

//     }

//   }, []);


//   /* =======================================================
//      LIVE CLOCK
//   ======================================================= */

//   useEffect(() => {

//     const updateClock =
//       () => {

//         setCurrentTime(
//           getNowInTimezone(
//             timezone
//           )
//         );

//       };


//     updateClock();


//     const timer =
//       setInterval(
//         updateClock,
//         1000
//       );


//     return () =>
//       clearInterval(
//         timer
//       );

//   }, [timezone]);


//   /* =======================================================
//      STATUS GROUPS
//   ======================================================= */

//   const liveSessions =
//     useMemo(
//       () =>
//         sessions.filter(
//           (session) =>
//             getLiveStatus(
//               session,
//               timezone
//             ) === "LIVE"
//         ),
//       [
//         sessions,
//         timezone,
//         currentTime,
//       ]
//     );


//   const upcomingSessions =
//     useMemo(
//       () =>
//         sessions.filter(
//           (session) =>
//             getLiveStatus(
//               session,
//               timezone
//             ) ===
//             "UPCOMING"
//         ),
//       [
//         sessions,
//         timezone,
//         currentTime,
//       ]
//     );


//   const scheduledSessions =
//     useMemo(
//       () =>
//         sessions.filter(
//           (session) =>
//             getLiveStatus(
//               session,
//               timezone
//             ) ===
//             "SCHEDULED"
//         ),
//       [
//         sessions,
//         timezone,
//         currentTime,
//       ]
//     );


//   const completedSessions =
//     useMemo(
//       () =>
//         sessions.filter(
//           (session) =>
//             getLiveStatus(
//               session,
//               timezone
//             ) ===
//             "COMPLETED"
//         ),
//       [
//         sessions,
//         timezone,
//         currentTime,
//       ]
//     );


//   /* =======================================================
//      BACK
//   ======================================================= */

//   const goBack = () => {

//     navigate(
//       "/institute/website/preview"
//     );

//   };


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


//   const subheadingStyle = {
//     color:
//       branding.subheadingColor,

//     fontFamily:
//       fontFamily(
//         branding.fontSubheading
//       ),

//     fontWeight:
//       branding.subheadingWeight,

//     lineHeight:
//       branding.subheadingLineHeight,
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


//   /* =======================================================
//      EMPTY STATE
//   ======================================================= */

//   if (
//     sessions.length === 0
//   ) {

//     return (
//       <div
//         className="
//           min-h-screen
//         "
//         style={{
//           backgroundColor:
//             branding.pageBackgroundColor,

//           fontFamily:
//             fontFamily(
//               branding.fontBody
//             ),
//         }}
//       >

//         <SessionsHero
//           branding={
//             branding
//           }
//           onBack={
//             goBack
//           }
//           banners={
//             banners
//           }
//           empty
//         />


//         <div
//           className="
//             mx-auto
//             max-w-7xl
//             px-5
//             py-24
//             text-center
//             sm:px-6
//             lg:px-8
//           "
//         >

//           <div
//             className="
//               mx-auto
//               flex
//               h-20
//               w-20
//               items-center
//               justify-center
//               rounded-full
//             "
//             style={{
//               backgroundColor:
//                 hexToRgba(
//                   branding.buttonColor,
//                   0.10
//                 ),

//               color:
//                 branding.buttonColor,
//             }}
//           >
//             <HiCalendar
//               size={38}
//             />
//           </div>


//           <h2
//             className="
//               mt-6
//               text-2xl
//             "
//             style={headingStyle}
//           >
//             No Sessions Available
//           </h2>


//           <p
//             className="
//               mx-auto
//               mt-2
//               max-w-md
//             "
//             style={{
//               ...bodyStyle,
//               opacity: 0.60,
//             }}
//           >
//             There are currently
//             no active sessions
//             available for this
//             institute.
//           </p>


//           <button
//             type="button"
//             onClick={() =>
//               navigate(
//                 "/institute/website/preview/classes"
//               )
//             }
//             className="
//               mt-7
//               inline-flex
//               items-center
//               gap-2
//               px-6
//               py-3
//               transition
//               hover:opacity-90
//             "
//             style={{
//               backgroundColor:
//                 branding.buttonColor,

//               color:
//                 branding.buttonTextColor,

//               borderRadius:
//                 getButtonRadius(
//                   branding
//                 ),

//               fontFamily:
//                 fontFamily(
//                   branding.fontBody
//                 ),

//               fontWeight:
//                 branding.subheadingWeight,
//             }}
//           >
//             Browse Classes

//             <HiArrowRight />

//           </button>

//         </div>

//       </div>
//     );
//   }


//   /* =======================================================
//      MAIN PAGE
//   ======================================================= */

//   return (
//     <div
//       className="
//         min-h-screen
//       "
//       style={{
//         backgroundColor:
//           branding.pageBackgroundColor,

//         color:
//           branding.textColor,

//         fontFamily:
//           fontFamily(
//             branding.fontBody
//           ),
//       }}
//     >

//       {/* =================================================
//           HERO
//       ================================================= */}

//       <SessionsHero
//         branding={
//           branding
//         }
//         onBack={
//           goBack
//         }
//         timezoneLabel={
//           timezoneLabel
//         }
//         timezoneAbbr={
//           timezoneAbbr
//         }
//         banners={
//           banners
//         }
//       />


//       {/* =================================================
//           CONTENT
//       ================================================= */}

//       <main
//         className="
//           mx-auto
//           max-w-7xl
//           px-5
//           py-12
//           sm:px-6
//           lg:px-8
//         "
//       >

//         {/* ===============================================
//             STATS
//         =============================================== */}

//         <div
//           className="
//             mb-12
//             grid
//             grid-cols-2
//             gap-4
//             md:grid-cols-4
//           "
//         >

//           <StatCard
//             label="Total Sessions"
//             value={
//               sessions.length
//             }
//             branding={
//               branding
//             }
//           />


//           <StatCard
//             label="Live Now"
//             value={
//               liveSessions.length
//             }
//             branding={
//               branding
//             }
//             accent={
//               branding.iconColor
//             }
//           />


//           <StatCard
//             label="Starting Soon"
//             value={
//               upcomingSessions.length
//             }
//             branding={
//               branding
//             }
//             accent={
//               branding.buttonColor
//             }
//           />


//           <StatCard
//             label="Scheduled"
//             value={
//               scheduledSessions.length
//             }
//             branding={
//               branding
//             }
//             accent={
//               branding.subheadingColor
//             }
//           />

//         </div>


//         {/* ===============================================
//             LIVE
//         =============================================== */}

//         {liveSessions.length >
//           0 && (

//           <SessionSection
//             title="Live Now"
//             subtitle="Sessions currently in progress."
//             sessions={
//               liveSessions
//             }
//             timezone={
//               timezone
//             }
//             timezoneAbbr={
//               timezoneAbbr
//             }
//             branding={
//               branding
//             }
//             status="LIVE"
//           />

//         )}


//         {/* ===============================================
//             UPCOMING
//         =============================================== */}

//         {upcomingSessions.length >
//           0 && (

//           <SessionSection
//             title="Starting Soon"
//             subtitle="Sessions scheduled for today."
//             sessions={
//               upcomingSessions
//             }
//             timezone={
//               timezone
//             }
//             timezoneAbbr={
//               timezoneAbbr
//             }
//             branding={
//               branding
//             }
//             status="UPCOMING"
//           />

//         )}


//         {/* ===============================================
//             SCHEDULED
//         =============================================== */}

//         {scheduledSessions.length >
//           0 && (

//           <SessionSection
//             title="Scheduled"
//             subtitle="Sessions scheduled for upcoming days."
//             sessions={
//               scheduledSessions
//             }
//             timezone={
//               timezone
//             }
//             timezoneAbbr={
//               timezoneAbbr
//             }
//             branding={
//               branding
//             }
//             status="SCHEDULED"
//           />

//         )}


//         {/* ===============================================
//             COMPLETED
//         =============================================== */}

//         {completedSessions.length >
//           0 && (

//           <SessionSection
//             title="Completed"
//             subtitle="Sessions that have already finished today."
//             sessions={
//               completedSessions
//             }
//             timezone={
//               timezone
//             }
//             timezoneAbbr={
//               timezoneAbbr
//             }
//             branding={
//               branding
//             }
//             status="COMPLETED"
//           />

//         )}

//       </main>

//     </div>
//   );
// }


// /* =========================================================
//    HERO
//    Banner is fetched from the Institute Dashboard.
// ========================================================= */

// const SessionsHero = ({
//   branding,
//   onBack,
//   timezoneLabel,
//   timezoneAbbr,
//   banners = [],
//   empty = false,
// }) => {

//   /* =======================================================
//      FIND BANNER
//      Priority:
//      1. Sessions-specific banner
//      2. Active Institute Dashboard banner
//      3. First banner returned by API
//   ======================================================= */

//   const sessionBanner = useMemo(() => {
//     if (!Array.isArray(banners) || banners.length === 0) {
//       return null;
//     }

//     const specificBanner = banners.find((banner) => {
//       const type = String(
//         banner?.banner_type ||
//         banner?.bannerType ||
//         banner?.page ||
//         banner?.page_name ||
//         ""
//       )
//         .trim()
//         .toLowerCase();

//       return type === "session" || type === "sessions";
//     });

//     if (specificBanner) {
//       return specificBanner;
//     }

//     const activeBanner = banners.find(
//       (banner) =>
//         banner?.is_active === 1 ||
//         banner?.is_active === true ||
//         banner?.isActive === true
//     );

//     if (activeBanner) {
//       return activeBanner;
//     }

//     return banners[0] || null;
//   }, [banners]);

//   /* =======================================================
//      BANNER IMAGE
//   ======================================================= */

//   const bannerImage =
//     sessionBanner?.image_url ||
//     sessionBanner?.imageUrl ||
//     sessionBanner?.image ||
//     sessionBanner?.banner_image ||
//     sessionBanner?.bannerImage ||
//     sessionBanner?.file_url ||
//     sessionBanner?.fileUrl ||
//     null;

//   /*
//     IMPORTANT:
//     Banner title, description and button are intentionally
//     NOT displayed over the banner image.

//     The Sessions page title and description are displayed
//     BELOW the banner image.
//   */

//   const bannerStyle = bannerImage
//     ? {
//         backgroundImage: `url("${bannerImage}")`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//         backgroundColor: "#E5E7EB",
//       }
//     : {
//         backgroundColor: branding.buttonColor,
//       };

//   return (
//     <section
//       style={{
//         backgroundColor: branding.pageBackgroundColor,
//       }}
//     >
//       {/* =================================================
//           BANNER IMAGE ONLY
//       ================================================= */}

//       <div
//         className="
//           w-full
//           overflow-hidden
//         "
//         style={bannerStyle}
//       >
//         <div
//           className="
//             min-h-[260px]
//             w-full
//             sm:min-h-[320px]
//             lg:min-h-[390px]
//           "
//         />
//       </div>

//       {/* =================================================
//           CONTENT BELOW IMAGE
//       ================================================= */}

//       <div
//         className="
//           mx-auto
//           max-w-7xl
//           px-5
//           py-10
//           sm:px-6
//           lg:px-8
//         "
//       >
//         {/* =================================================
//             BACK
//         ================================================= */}

//         <button
//           type="button"
//           onClick={onBack}
//           className="
//             mb-6
//             flex
//             items-center
//             gap-2
//             text-sm
//             transition
//             hover:opacity-80
//           "
//           style={{
//             color: branding.textColor,
//             fontFamily: fontFamily(branding.fontBody),
//             fontWeight: branding.bodyWeight,
//           }}
//         >
//           <HiArrowLeft />
//           Back to Home
//         </button>

//         {/* =================================================
//             BREADCRUMB
//         ================================================= */}

//         {!empty && (
//           <div
//             className="
//               mb-5
//               flex
//               items-center
//               gap-2
//               text-sm
//             "
//             style={{
//               color: branding.textColor,
//               opacity: 0.65,
//               fontFamily: fontFamily(branding.fontBody),
//             }}
//           >
//             <button
//               type="button"
//               onClick={onBack}
//               className="transition hover:opacity-80"
//             >
//               Home
//             </button>

//             <span>›</span>

//             <span
//               style={{
//                 color: branding.subheadingColor,
//                 fontWeight: branding.subheadingWeight,
//               }}
//             >
//               Sessions
//             </span>
//           </div>
//         )}

//         {/* =================================================
//             SESSION PAGE TITLE
//             THIS IS BELOW THE IMAGE
//         ================================================= */}

//         <div
//           className="
//             flex
//             flex-col
//             justify-between
//             gap-6
//             lg:flex-row
//             lg:items-end
//           "
//         >
//           <div>
//             <p
//               className="
//                 text-sm
//                 uppercase
//                 tracking-widest
//               "
//               style={{
//                 color: branding.subheadingColor,
//                 fontFamily: fontFamily(branding.fontSubheading),
//                 fontWeight: branding.subheadingWeight,
//               }}
//             >
//               Learning Schedule
//             </p>

//             <h1
//               className="
//                 mt-2
//                 text-4xl
//                 sm:text-5xl
//               "
//               style={{
//                 color: branding.headingColor,
//                 fontFamily: fontFamily(branding.fontHeading),
//                 fontWeight: branding.headingWeight,
//                 lineHeight: branding.headingLineHeight,
//                 letterSpacing: branding.headingLetterSpacing,
//               }}
//             >
//               Upcoming Sessions
//             </h1>

//             <p
//               className="
//                 mt-4
//                 max-w-2xl
//                 text-base
//               "
//               style={{
//                 color: branding.textColor,
//                 fontFamily: fontFamily(branding.fontBody),
//                 fontWeight: branding.bodyWeight,
//                 lineHeight: branding.bodyLineHeight,
//                 opacity: 0.70,
//               }}
//             >
//               View our upcoming class sessions and join your scheduled
//               live classes.
//             </p>
//           </div>

//           {/* =================================================
//               TIMEZONE
//           ================================================= */}

//           {!empty && timezoneLabel && (
//             <div
//               className="
//                 flex
//                 items-center
//                 gap-3
//                 px-4
//                 py-3
//               "
//               style={{
//                 backgroundColor: hexToRgba(
//                   branding.buttonColor,
//                   0.06
//                 ),
//                 border: `1px solid ${hexToRgba(
//                   branding.buttonColor,
//                   0.16
//                 )}`,
//                 borderRadius: getButtonRadius(branding),
//                 color: branding.textColor,
//               }}
//             >
//               <HiGlobe
//                 size={22}
//                 style={{
//                   color: branding.buttonColor,
//                 }}
//               />

//               <div>
//                 <p
//                   className="text-xs"
//                   style={{
//                     opacity: 0.60,
//                     fontFamily: fontFamily(branding.fontBody),
//                   }}
//                 >
//                   Your timezone
//                 </p>

//                 <p
//                   className="text-sm"
//                   style={{
//                     fontFamily: fontFamily(branding.fontBody),
//                     fontWeight: branding.subheadingWeight,
//                   }}
//                 >
//                   {timezoneLabel}
//                   {timezoneAbbr ? ` (${timezoneAbbr})` : ""}
//                 </p>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };


// /* =========================================================
//    STAT CARD
// ========================================================= */


// const StatCard = ({
//   label,
//   value,
//   branding,
//   accent,
// }) => {

//   return (
//     <div
//       className="
//         p-5
//         shadow-sm
//         transition
//         hover:-translate-y-0.5
//       "
//       style={{
//         backgroundColor:
//           branding.cardBackgroundColor,

//         border:
//           `1px solid ${hexToRgba(
//             branding.textColor,
//             0.10
//           )}`,

//         borderRadius:
//           "16px",
//       }}
//     >

//       <p
//         className="
//           text-sm
//         "
//         style={{
//           color:
//             accent ||
//             branding.subheadingColor,

//           fontFamily:
//             fontFamily(
//               branding.fontSubheading
//             ),

//           fontWeight:
//             branding.subheadingWeight,
//         }}
//       >
//         {label}
//       </p>


//       <p
//         className="
//           mt-2
//           text-3xl
//         "
//         style={{
//           ...{
//             color:
//               branding.headingColor,

//             fontFamily:
//               fontFamily(
//                 branding.fontHeading
//               ),

//             fontWeight:
//               branding.headingWeight,

//             lineHeight:
//               branding.headingLineHeight,
//           },
//         }}
//       >
//         {value}
//       </p>

//     </div>
//   );
// };


// /* =========================================================
//    SESSION SECTION
// ========================================================= */

// const SessionSection = ({
//   title,
//   subtitle,
//   sessions,
//   timezone,
//   timezoneAbbr,
//   branding,
//   status,
// }) => {

//   const statusColor =
//     status === "LIVE"
//       ? branding.iconColor
//       : status ===
//           "UPCOMING"
//         ? branding.buttonColor
//         : status ===
//             "COMPLETED"
//           ? branding.textColor
//           : branding.subheadingColor;


//   return (
//     <section
//       className="
//         mb-12
//       "
//     >

//       {/* SECTION HEADER */}

//       <div
//         className="
//           mb-6
//           flex
//           items-start
//           gap-3
//         "
//       >

//         <div
//           className="
//             mt-2
//             h-3
//             w-3
//             flex-shrink-0
//             rounded-full
//           "
//           style={{
//             backgroundColor:
//               statusColor,

//             boxShadow:
//               status ===
//               "LIVE"
//                 ? `0 0 0 5px ${hexToRgba(
//                     statusColor,
//                     0.10
//                   )}`
//                 : "none",
//           }}
//         />


//         <div>

//           <h2
//             className="
//               text-2xl
//             "
//             style={{
//               color:
//                 statusColor,

//               fontFamily:
//                 fontFamily(
//                   branding.fontHeading
//                 ),

//               fontWeight:
//                 branding.headingWeight,

//               lineHeight:
//                 branding.headingLineHeight,
//             }}
//           >
//             {title}
//           </h2>


//           <p
//             className="
//               mt-1
//               text-sm
//             "
//             style={{
//               ...{
//                 color:
//                   branding.textColor,

//                 fontFamily:
//                   fontFamily(
//                     branding.fontBody
//                   ),
//               },

//               opacity: 0.55,
//             }}
//           >
//             {subtitle}
//           </p>

//         </div>

//       </div>


//       {/* CARDS */}

//       <div
//         className="
//           grid
//           gap-6
//           lg:grid-cols-2
//         "
//       >

//         {sessions.map(
//           (
//             session,
//             index
//           ) => (

//             <SessionCard
//               key={
//                 session?.session_id ||
//                 session?.id ||
//                 session?.booking_id ||
//                 index
//               }
//               session={
//                 session
//               }
//               viewerTimezone={
//                 timezone
//               }
//               viewerAbbr={
//                 timezoneAbbr
//               }
//               branding={
//                 branding
//               }
//             />

//           )
//         )}

//       </div>

//     </section>
//   );
// };


// /* =========================================================
//    SESSION CARD
// ========================================================= */

// const SessionCard = ({
//   session,
//   viewerTimezone,
//   viewerAbbr,
//   branding,
// }) => {

//   const status =
//     getLiveStatus(
//       session,
//       viewerTimezone
//     );


//   const config =
//     STATUS_CONFIG[
//       status
//     ] ||
//     STATUS_CONFIG.SCHEDULED;


//   /* =======================================================
//      DATA
//   ======================================================= */

//   const classTitle =
//     session?.class_title ||
//     session?.class_name ||
//     session?.class?.title ||
//     session?.title ||
//     "Class";


//   const sessionTitle =
//     session?.session_title ||
//     session?.session_name ||
//     session?.title ||
//     "Class Session";


//   const trainerName =
//     session?.trainer_name ||
//     session?.trainer?.name ||
//     session?.trainer?.full_name ||
//     "Not Assigned";


//   const days =
//     normalizeDays(
//       session?.days ||
//         session?.available_days ||
//         session?.availableDays
//     );


//   const startTime =
//     session?.local_start_time ||
//     session?.start_time ||
//     session?.startTime;


//   const endTime =
//     session?.end_time ||
//     session?.endTime;


//   const sessionTimezone =
//     session?.class_timezone ||
//     session?.class_session_timezone ||
//     session?.session_timezone ||
//     session?.timezone ||
//     viewerTimezone;


//   const date =
//     session?.session_date ||
//     session?.date ||
//     session?.start_date;


//   const zoomUrl =
//     session?.zoom?.join_url ||
//     session?.zoom?.joinUrl ||
//     session?.zoom_link ||
//     session?.zoomLink ||
//     session?.meeting_url ||
//     session?.meetingUrl ||
//     null;


//   const canJoin =
//     session?.can_join === true ||
//     session?.canJoin === true;


//   const image =
//     session?.trainer_image ||
//     session?.trainer_profile_image ||
//     session?.trainer?.profile_image ||
//     session?.trainer?.image ||
//     null;


//   /* =======================================================
//      STATUS COLOR
//   ======================================================= */

//   const statusColor =
//     status === "LIVE"
//       ? branding.iconColor
//       : status ===
//           "UPCOMING"
//         ? branding.buttonColor
//         : status ===
//             "COMPLETED"
//           ? branding.textColor
//           : branding.subheadingColor;


//   const statusBackground =
//     hexToRgba(
//       statusColor,
//       0.08
//     );


//   const statusBorder =
//     hexToRgba(
//       statusColor,
//       0.20
//     );


//   return (
//     <article
//       className="
//         overflow-hidden
//         p-6
//         shadow-sm
//         transition-all
//         duration-300
//         hover:-translate-y-1
//         hover:shadow-lg
//       "
//       style={{
//         backgroundColor:
//           branding.cardBackgroundColor,

//         border:
//           `1px solid ${hexToRgba(
//             branding.textColor,
//             0.10
//           )}`,

//         borderRadius:
//           "18px",

//         boxShadow:
//           status ===
//           "LIVE"
//             ? `0 0 0 2px ${hexToRgba(
//                 branding.iconColor,
//                 0.12
//               )}`
//             : undefined,
//       }}
//     >

//       {/* =================================================
//           HEADER
//       ================================================= */}

//       <div
//         className="
//           mb-6
//           flex
//           items-start
//           justify-between
//           gap-4
//         "
//       >

//         <div className="min-w-0">

//           <h3
//             className="
//               truncate
//               text-xl
//             "
//             style={{
//               color:
//                 branding.headingColor,

//               fontFamily:
//                 fontFamily(
//                   branding.fontHeading
//                 ),

//               fontWeight:
//                 branding.headingWeight,

//               lineHeight:
//                 branding.headingLineHeight,
//             }}
//           >
//             {classTitle}
//           </h3>


//           <p
//             className="
//               mt-1
//               truncate
//               text-sm
//               uppercase
//               tracking-wide
//             "
//             style={{
//               color:
//                 branding.subheadingColor,

//               fontFamily:
//                 fontFamily(
//                   branding.fontSubheading
//                 ),

//               fontWeight:
//                 branding.subheadingWeight,
//             }}
//           >
//             {sessionTitle}
//           </p>

//         </div>


//         <span
//           className="
//             flex
//             shrink-0
//             items-center
//             gap-1.5
//             px-3
//             py-1.5
//             text-xs
//           "
//           style={{
//             color:
//               statusColor,

//             backgroundColor:
//               statusBackground,

//             border:
//               `1px solid ${statusBorder}`,

//             borderRadius:
//               getButtonRadius(
//                 branding
//               ),

//             fontFamily:
//               fontFamily(
//                 branding.fontBody
//               ),

//             fontWeight:
//               branding.subheadingWeight,
//           }}
//         >

//           {status ===
//             "LIVE" && (
//             <span
//               className="
//                 h-2
//                 w-2
//                 animate-pulse
//                 rounded-full
//               "
//               style={{
//                 backgroundColor:
//                   statusColor,
//               }}
//             />
//           )}

//           {config.title}

//         </span>

//       </div>


//       {/* =================================================
//           TIME / DAYS
//       ================================================= */}

//       <div
//         className="
//           mb-5
//           grid
//           gap-4
//           md:grid-cols-2
//         "
//       >

//         <InfoBox
//           branding={
//             branding
//           }
//           icon={
//             <HiClock
//               size={18}
//             />
//           }
//           label="Time"
//         >

//           <p
//             className="
//               mt-2
//               text-lg
//             "
//             style={{
//               color:
//                 branding.headingColor,

//               fontFamily:
//                 fontFamily(
//                   branding.fontHeading
//                 ),

//               fontWeight:
//                 branding.subheadingWeight,
//             }}
//           >

//             {viewerAbbr
//               ? `${viewerAbbr} `
//               : ""}

//             {formatTime(
//               startTime
//             )}

//             {endTime
//               ? ` - ${formatTime(
//                   endTime
//                 )}`
//               : ""}

//           </p>


//           <p
//             className="
//               mt-1
//               text-xs
//             "
//             style={{
//               ...{
//                 color:
//                   branding.textColor,

//                 fontFamily:
//                   fontFamily(
//                     branding.fontBody
//                   ),
//               },

//               opacity: 0.50,
//             }}
//           >
//             {sessionTimezone}
//           </p>

//         </InfoBox>


//         <InfoBox
//           branding={
//             branding
//           }
//           icon={
//             <HiCalendar
//               size={18}
//             />
//           }
//           label="Days"
//         >

//           <p
//             className="
//               mt-2
//               text-lg
//             "
//             style={{
//               color:
//                 branding.headingColor,

//               fontFamily:
//                 fontFamily(
//                   branding.fontHeading
//                 ),

//               fontWeight:
//                 branding.subheadingWeight,
//             }}
//           >
//             {formatDaysCompact(
//               days
//             )}
//           </p>


//           {date && (
//             <p
//               className="
//                 mt-1
//                 text-xs
//               "
//               style={{
//                 ...{
//                   color:
//                     branding.textColor,

//                   fontFamily:
//                     fontFamily(
//                       branding.fontBody
//                     ),
//                 },

//                 opacity: 0.50,
//               }}
//             >
//               {formatDate(
//                 date
//               )}
//             </p>
//           )}

//         </InfoBox>

//       </div>


//       {/* =================================================
//           TODAY
//       ================================================= */}

//       {status !==
//         "SCHEDULED" &&
//         days.length >
//           0 && (

//           <div
//             className="
//               mb-5
//               flex
//               items-center
//               gap-2
//               px-4
//               py-3
//             "
//             style={{
//               backgroundColor:
//                 hexToRgba(
//                   branding.iconColor,
//                   0.08
//                 ),

//               border:
//                 `1px solid ${hexToRgba(
//                   branding.iconColor,
//                   0.20
//                 )}`,

//               color:
//                 branding.iconColor,

//               borderRadius:
//                 "12px",
//             }}
//           >

//             <HiCheckCircle
//               size={18}
//             />

//             <span
//               className="text-sm"
//               style={{
//                 fontFamily:
//                   fontFamily(
//                     branding.fontBody
//                   ),

//                 fontWeight:
//                   branding.subheadingWeight,
//               }}
//             >
//               Today's class
//             </span>

//           </div>

//         )}


//       {/* =================================================
//           TRAINER
//       ================================================= */}

//       <div
//         className="
//           mb-6
//           p-4
//         "
//         style={{
//           backgroundColor:
//             hexToRgba(
//               branding.textColor,
//               0.025
//             ),

//           border:
//             `1px solid ${hexToRgba(
//               branding.textColor,
//               0.08
//             )}`,

//           borderRadius:
//             "12px",
//         }}
//       >

//         <div
//           className="
//             flex
//             items-center
//             gap-3
//           "
//         >

//           {image ? (

//             <img
//               src={image}
//               alt={
//                 trainerName
//               }
//               className="
//                 h-11
//                 w-11
//                 rounded-full
//                 object-cover
//               "
//             />

//           ) : (

//             <div
//               className="
//                 flex
//                 h-11
//                 w-11
//                 items-center
//                 justify-center
//                 rounded-full
//                 text-sm
//               "
//               style={{
//                 backgroundColor:
//                   branding.buttonColor,

//                 color:
//                   branding.buttonTextColor,

//                 fontFamily:
//                   fontFamily(
//                     branding.fontHeading
//                   ),

//                 fontWeight:
//                   branding.headingWeight,
//               }}
//             >
//               {String(
//                 trainerName
//               )
//                 .charAt(0)
//                 .toUpperCase()}
//             </div>

//           )}


//           <div>

//             <div
//               className="
//                 flex
//                 items-center
//                 gap-2
//               "
//               style={{
//                 color:
//                   branding.subheadingColor,
//               }}
//             >

//               <HiShieldCheck
//                 size={16}
//               />

//               <span
//                 className="
//                   text-xs
//                   uppercase
//                   tracking-wide
//                 "
//                 style={{
//                   fontFamily:
//                     fontFamily(
//                       branding.fontSubheading
//                     ),

//                   fontWeight:
//                     branding.subheadingWeight,
//                 }}
//               >
//                 Trainer
//               </span>

//             </div>


//             <p
//               className="
//                 mt-1
//                 text-sm
//               "
//               style={{
//                 color:
//                   branding.headingColor,

//                 fontFamily:
//                   fontFamily(
//                     branding.fontBody
//                   ),

//                 fontWeight:
//                   branding.subheadingWeight,
//               }}
//             >
//               {trainerName}
//             </p>

//           </div>

//         </div>

//       </div>


//       {/* =================================================
//           ACTION
//       ================================================= */}

//       {status ===
//         "LIVE" ? (

//         canJoin &&
//         zoomUrl ? (

//           <a
//             href={
//               zoomUrl
//             }
//             target="_blank"
//             rel="noreferrer"
//             className="
//               flex
//               w-full
//               items-center
//               justify-center
//               gap-2
//               px-4
//               py-3.5
//               text-sm
//               transition
//               hover:opacity-90
//             "
//             style={{
//               backgroundColor:
//                 branding.buttonColor,

//               color:
//                 branding.buttonTextColor,

//               borderRadius:
//                 getButtonRadius(
//                   branding
//                 ),

//               fontFamily:
//                 fontFamily(
//                   branding.fontBody
//                 ),

//               fontWeight:
//                 branding.subheadingWeight,

//               boxShadow:
//                 `0 8px 20px ${hexToRgba(
//                   branding.buttonColor,
//                   0.18
//                 )}`,
//             }}
//           >

//             <HiVideoCamera
//               size={19}
//             />

//             Join Now

//             <HiExternalLink
//               size={16}
//             />

//           </a>

//         ) : (

//           <button
//             type="button"
//             disabled
//             className="
//               w-full
//               cursor-not-allowed
//               px-4
//               py-3.5
//               text-sm
//             "
//             style={{
//               color:
//                 branding.iconColor,

//               backgroundColor:
//                 hexToRgba(
//                   branding.iconColor,
//                   0.08
//                 ),

//               border:
//                 `1px solid ${hexToRgba(
//                   branding.iconColor,
//                   0.20
//                 )}`,

//               borderRadius:
//                 getButtonRadius(
//                   branding
//                 ),

//               fontFamily:
//                 fontFamily(
//                   branding.fontBody
//                 ),

//               fontWeight:
//                 branding.subheadingWeight,
//             }}
//           >
//             {zoomUrl
//               ? "Waiting for Trainer Link"
//               : "Link Not Available"}
//           </button>

//         )

//       ) : status ===
//         "UPCOMING" ? (

//         <button
//           type="button"
//           disabled
//           className="
//             w-full
//             cursor-not-allowed
//             px-4
//             py-3.5
//             text-sm
//           "
//           style={{
//             color:
//               branding.buttonColor,

//             backgroundColor:
//               hexToRgba(
//                 branding.buttonColor,
//                 0.08
//               ),

//             border:
//               `1px solid ${hexToRgba(
//                 branding.buttonColor,
//                 0.20
//               )}`,

//             borderRadius:
//               getButtonRadius(
//                 branding
//               ),

//             fontFamily:
//               fontFamily(
//                 branding.fontBody
//               ),

//             fontWeight:
//               branding.subheadingWeight,
//           }}
//         >

//           <HiClock
//             className="
//               mr-1
//               inline
//             "
//           />

//           Starts at{" "}

//           {formatTime(
//             startTime
//           )}

//         </button>

//       ) : status ===
//         "SCHEDULED" ? (

//         <button
//           type="button"
//           disabled
//           className="
//             w-full
//             cursor-not-allowed
//             px-4
//             py-3.5
//             text-sm
//           "
//           style={{
//             color:
//               branding.subheadingColor,

//             backgroundColor:
//               hexToRgba(
//                 branding.subheadingColor,
//                 0.08
//               ),

//             border:
//               `1px solid ${hexToRgba(
//                 branding.subheadingColor,
//                 0.20
//               )}`,

//             borderRadius:
//               getButtonRadius(
//                 branding
//               ),

//             fontFamily:
//               fontFamily(
//                 branding.fontBody
//               ),

//             fontWeight:
//               branding.subheadingWeight,
//           }}
//         >

//           <HiCalendar
//             className="
//               mr-1
//               inline
//             "
//           />

//           Next class:{" "}

//           {days[0] ||
//             "TBD"}

//         </button>

//       ) : (

//         <button
//           type="button"
//           disabled
//           className="
//             w-full
//             cursor-not-allowed
//             px-4
//             py-3.5
//             text-sm
//           "
//           style={{
//             color:
//               branding.textColor,

//             backgroundColor:
//               hexToRgba(
//                 branding.textColor,
//                 0.05
//               ),

//             border:
//               `1px solid ${hexToRgba(
//                 branding.textColor,
//                 0.12
//               )}`,

//             borderRadius:
//               getButtonRadius(
//                 branding
//               ),

//             fontFamily:
//               fontFamily(
//                 branding.fontBody
//               ),

//             fontWeight:
//               branding.subheadingWeight,

//             opacity: 0.65,
//           }}
//         >

//           <HiCheckCircle
//             className="
//               mr-1
//               inline
//             "
//           />

//           Session Completed

//         </button>

//       )}

//     </article>
//   );
// };


// /* =========================================================
//    INFO BOX
// ========================================================= */

// const InfoBox = ({
//   branding,
//   icon,
//   label,
//   children,
// }) => {

//   return (
//     <div
//       className="
//         p-4
//       "
//       style={{
//         backgroundColor:
//           hexToRgba(
//             branding.buttonColor,
//             0.035
//           ),

//         border:
//           `1px solid ${hexToRgba(
//             branding.buttonColor,
//             0.10
//           )}`,

//         borderRadius:
//           "12px",
//       }}
//     >

//       <div
//         className="
//           flex
//           items-center
//           gap-2
//           text-xs
//           uppercase
//           tracking-wide
//         "
//         style={{
//           color:
//             branding.buttonColor,

//           fontFamily:
//             fontFamily(
//               branding.fontSubheading
//             ),

//           fontWeight:
//             branding.subheadingWeight,
//         }}
//       >

//         {icon}

//         <span>
//           {label}
//         </span>

//       </div>


//       {children}

//     </div>
//   );
// };



// src/institute/Website/WebsiteSessions.jsx



// import { useEffect, useMemo, useState } from "react";

// import {
//   HiCalendar,
//   HiClock,
//   HiExternalLink,
//   HiVideoCamera,
//   HiShieldCheck,
//   HiCheckCircle,
//   HiArrowRight,
//   HiArrowLeft,
// } from "react-icons/hi";

// import {
//   useNavigate,
//   useOutletContext,
// } from "react-router-dom";

// import { getTimezone } from "../../utils/timezone";


// /* =========================================================
//    DEFAULT BRANDING
// ========================================================= */

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
//    DEFAULT CONTENT
// ========================================================= */

// const DEFAULT_CONTENT = {
//   sessions: {

//     heading: "Upcoming Sessions",

//     subheading:
//       "View our upcoming class sessions and join your scheduled live classes.",
//   },
// };


// /* =========================================================
//    DEFAULT SECTIONS
// ========================================================= */

// const DEFAULT_SECTIONS = {
//   sessions: {
//     visible: true,
//   },
// };


// /* =========================================================
//    GENERIC VALUE HELPER
// ========================================================= */

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


// /* =========================================================
//    BRANDING HELPERS
// ========================================================= */

// const getBrandingValue = (
//   branding,
//   camelKey,
//   snakeKey,
//   fallback
// ) => {
//   const value =
//     branding?.[camelKey] ??
//     branding?.[snakeKey];

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


// /* =========================================================
//    CONTENT NORMALIZER
// ========================================================= */

// const normalizeContent = (
//   content = {}
// ) => {

//   const source =
//     content?.sessions ||
//     content?.session ||
//     content?.Sessions ||
//     {};

//   return {
//     sessions: {
//       eyebrow:
//         getValue(
//           source?.eyebrow,
//           source?.eyebrow_text,
//           source?.label,
//           DEFAULT_CONTENT.sessions.eyebrow
//         ),

//       heading:
//         getValue(
//           source?.heading,
//           source?.title,
//           source?.page_heading,
//           DEFAULT_CONTENT.sessions.heading
//         ),

//       subheading:
//         getValue(
//           source?.subheading,
//           source?.subtitle,
//           source?.page_subheading,
//           DEFAULT_CONTENT.sessions.subheading
//         ),
//     },
//   };
// };


// /* =========================================================
//    SECTIONS NORMALIZER
// ========================================================= */

// const normalizeSections = (
//   sections = {}
// ) => {

//   const source =
//     sections?.sessions ||
//     sections?.session ||
//     sections?.Sessions ||
//     {};

//   const value =
//     source?.visible ??
//     source?.is_visible ??
//     source?.isVisible ??
//     sections?.sessions_visible ??
//     sections?.session_visible;


//   if (
//     typeof value === "boolean"
//   ) {
//     return {
//       sessions: {
//         visible: value,
//       },
//     };
//   }


//   if (
//     value === 0 ||
//     value === "0" ||
//     value === "false"
//   ) {
//     return {
//       sessions: {
//         visible: false,
//       },
//     };
//   }


//   return DEFAULT_SECTIONS;
// };


// /* =========================================================
//    FONT
// ========================================================= */

// const fontFamily = (
//   font
// ) =>
//   font
//     ? `'${font}', sans-serif`
//     : "Inter, sans-serif";


// /* =========================================================
//    BUTTON RADIUS
// ========================================================= */

// const getButtonRadius = (
//   branding
// ) =>
//   branding.roundedButtons
//     ? "9999px"
//     : "10px";


// /* =========================================================
//    HEX TO RGBA
// ========================================================= */

// const hexToRgba = (
//   color,
//   alpha
// ) => {

//   if (
//     typeof color !==
//     "string"
//   ) {
//     return color;
//   }


//   const hex =
//     color.replace(
//       "#",
//       ""
//     );


//   if (
//     !/^[0-9A-Fa-f]{6}$/.test(
//       hex
//     )
//   ) {
//     return color;
//   }


//   const r =
//     parseInt(
//       hex.substring(
//         0,
//         2
//       ),
//       16
//     );


//   const g =
//     parseInt(
//       hex.substring(
//         2,
//         4
//       ),
//       16
//     );


//   const b =
//     parseInt(
//       hex.substring(
//         4,
//         6
//       ),
//       16
//     );


//   return `rgba(${r}, ${g}, ${b}, ${alpha})`;
// };


// /* =========================================================
//    FORMAT TIME
// ========================================================= */

// const formatTime = (
//   time
// ) => {

//   if (!time) {
//     return "--";
//   }


//   const value =
//     String(time).trim();


//   if (
//     value
//       .toLowerCase()
//       .includes("am") ||
//     value
//       .toLowerCase()
//       .includes("pm")
//   ) {
//     return value;
//   }


//   const parts =
//     value.split(":");


//   if (
//     parts.length < 2
//   ) {
//     return value;
//   }


//   let hour =
//     Number(parts[0]);


//   const minute =
//     String(
//       parts[1]
//     ).padStart(
//       2,
//       "0"
//     );


//   if (
//     Number.isNaN(
//       hour
//     )
//   ) {
//     return value;
//   }


//   const period =
//     hour >= 12
//       ? "PM"
//       : "AM";


//   hour =
//     hour % 12 || 12;


//   return `${hour}:${minute} ${period}`;
// };


// /* =========================================================
//    FORMAT DATE
// ========================================================= */

// const formatDate = (
//   date
// ) => {

//   if (!date) {
//     return "";
//   }


//   try {

//     const parsed =
//       new Date(date);


//     if (
//       Number.isNaN(
//         parsed.getTime()
//       )
//     ) {
//       return String(date);
//     }


//     return parsed.toLocaleDateString(
//       "en-IN",
//       {
//         day: "2-digit",
//         month: "short",
//         year: "numeric",
//       }
//     );

//   } catch {

//     return String(date);

//   }
// };


// /* =========================================================
//    DAYS
// ========================================================= */

// const normalizeDays = (
//   days
// ) => {

//   if (
//     Array.isArray(
//       days
//     )
//   ) {
//     return days
//       .map(
//         (day) =>
//           String(
//             day
//           ).trim()
//       )
//       .filter(
//         Boolean
//       );
//   }


//   if (
//     typeof days ===
//     "string"
//   ) {

//     const value =
//       days.trim();


//     if (!value) {
//       return [];
//     }


//     if (
//       value.startsWith("[") &&
//       value.endsWith("]")
//     ) {

//       try {

//         const parsed =
//           JSON.parse(
//             value
//           );


//         if (
//           Array.isArray(
//             parsed
//           )
//         ) {

//           return parsed
//             .map(
//               (day) =>
//                 String(
//                   day
//                 ).trim()
//             )
//             .filter(
//               Boolean
//             );
//         }

//       } catch {
//         // Continue below
//       }
//     }


//     return value
//       .split(",")
//       .map(
//         (day) =>
//           day.trim()
//       )
//       .filter(
//         Boolean
//       );
//   }


//   return [];
// };


// const formatDaysCompact = (
//   days
// ) => {

//   const normalized =
//     normalizeDays(
//       days
//     );


//   if (
//     normalized.length === 0
//   ) {
//     return "No days";
//   }


//   return normalized
//     .map(
//       (day) =>
//         String(day)
//           .substring(
//             0,
//             3
//           )
//     )
//     .join(" • ");
// };


// /* =========================================================
//    TIMEZONE
// ========================================================= */

// const getNowInTimezone = (
//   timezone
// ) => {

//   const tz =
//     timezone ||
//     "Asia/Kolkata";


//   try {

//     const parts =
//       new Intl.DateTimeFormat(
//         "en-US",
//         {
//           timeZone:
//             tz,

//           hour:
//             "numeric",

//           minute:
//             "numeric",

//           second:
//             "numeric",

//           hour12:
//             false,
//         }
//       ).formatToParts(
//         new Date()
//       );


//     let hour =
//       Number(
//         parts.find(
//           (part) =>
//             part.type ===
//             "hour"
//         )?.value || 0
//       );


//     if (
//       hour === 24
//     ) {
//       hour = 0;
//     }


//     const minute =
//       parts.find(
//         (part) =>
//           part.type ===
//           "minute"
//       )?.value ||
//       "00";


//     const second =
//       parts.find(
//         (part) =>
//           part.type ===
//           "second"
//       )?.value ||
//       "00";


//     return `${String(
//       hour
//     ).padStart(
//       2,
//       "0"
//     )}:${String(
//       minute
//     ).padStart(
//       2,
//       "0"
//     )}:${String(
//       second
//     ).padStart(
//       2,
//       "0"
//     )}`;

//   } catch {

//     return "00:00:00";

//   }
// };



// /* =========================================================
//    TIMEZONE ABBREVIATION
//    Always return a short display label such as IST,
//    never the raw IANA timezone name.
// ========================================================= */

// const getTimezoneAbbreviation = (timezone) => {
//   const tz = String(timezone || "Asia/Kolkata").trim();

//   const aliases = {
//     "Asia/Kolkata": "IST",
//     "Asia/Calcutta": "IST",
//     "Asia/Colombo": "IST",
//   };

//   if (aliases[tz]) {
//     return aliases[tz];
//   }

//   try {
//     const value = new Intl.DateTimeFormat("en-US", {
//       timeZone: tz,
//       timeZoneName: "short",
//     })
//       .formatToParts(new Date())
//       .find((part) => part.type === "timeZoneName")?.value;

//     return value || "IST";
//   } catch {
//     return "IST";
//   }
// };


// /* =========================================================
//    TODAY
// ========================================================= */

// const getTodayName = (
//   timezone
// ) => {

//   try {

//     return new Intl.DateTimeFormat(
//       "en-US",
//       {
//         timeZone:
//           timezone ||
//           "Asia/Kolkata",

//         weekday:
//           "long",
//       }
//     ).format(
//       new Date()
//     );

//   } catch {

//     return new Date()
//       .toLocaleDateString(
//         "en-US",
//         {
//           weekday:
//             "long",
//         }
//       );

//   }
// };


// /* =========================================================
//    LIVE STATUS
// ========================================================= */

// const getLiveStatus = (
//   session,
//   viewerTimezone
// ) => {

//   if (!session) {
//     return "SCHEDULED";
//   }


//   const startTime =
//     session.start_time ||
//     session.startTime ||
//     session.local_start_time;


//   const endTime =
//     session.end_time ||
//     session.endTime;


//   const days =
//     normalizeDays(
//       session.days ||
//         session.available_days ||
//         session.availableDays
//     );


//   if (
//     !startTime ||
//     !endTime ||
//     !days.length
//   ) {
//     return "SCHEDULED";
//   }


//   const today =
//     getTodayName(
//       viewerTimezone
//     );


//   const isToday =
//     days.some(
//       (day) =>
//         String(day)
//           .toLowerCase() ===
//         String(today)
//           .toLowerCase()
//     );


//   if (!isToday) {
//     return "SCHEDULED";
//   }


//   const sessionTimezone =
//     session.class_timezone ||
//     session.class_session_timezone ||
//     session.session_timezone ||
//     session.timezone ||
//     viewerTimezone ||
//     "Asia/Kolkata";


//   const current =
//     getNowInTimezone(
//       sessionTimezone
//     );


//   const normalizedStart =
//     String(
//       startTime
//     ).substring(
//       0,
//       8
//     );


//   const normalizedEnd =
//     String(
//       endTime
//     ).substring(
//       0,
//       8
//     );


//   if (
//     current >=
//       normalizedStart &&
//     current <=
//       normalizedEnd
//   ) {
//     return "LIVE";
//   }


//   if (
//     current >
//     normalizedEnd
//   ) {
//     return "COMPLETED";
//   }


//   return "UPCOMING";
// };


// /* =========================================================
//    STATUS CONFIG
// ========================================================= */

// const STATUS_CONFIG = {
//   LIVE: {
//     title: "Live Now",
//   },

//   UPCOMING: {
//     title: "Starting Soon",
//   },

//   SCHEDULED: {
//     title: "Scheduled",
//   },

//   COMPLETED: {
//     title: "Completed",
//   },
// };


// /* =========================================================
//    MAIN COMPONENT
// ========================================================= */

// export default function WebsiteSessions() {

//   const navigate =
//     useNavigate();


//   const outletContext =
//     useOutletContext() ||
//     {};


//   const {
//     sessions:
//       outletSessions = [],

//     website = {},

//     branding:
//       outletBranding = {},

//     content:
//       outletContent = {},

//     sections:
//       outletSections = {},

//     banners:
//       outletBanners = [],
//   } = outletContext;


//   /* =======================================================
//      BRANDING
//   ======================================================= */

//   const branding =
//     useMemo(
//       () =>
//         normalizeBranding(
//           outletBranding
//         ),
//       [
//         outletBranding,
//       ]
//     );


//   /* =======================================================
//      CONTENT
//   ======================================================= */

//   const content =
//     useMemo(
//       () =>
//         normalizeContent(
//           outletContent
//         ),
//       [
//         outletContent,
//       ]
//     );


//   /* =======================================================
//      SECTIONS
//   ======================================================= */

//   const sections =
//     useMemo(
//       () =>
//         normalizeSections(
//           outletSections
//         ),
//       [
//         outletSections,
//       ]
//     );


//   /* =======================================================
//      SESSION VISIBILITY
//   ======================================================= */

//   const sessionsVisible =
//     sections
//       ?.sessions
//       ?.visible !== false;


//   /* =======================================================
//      SESSIONS
//   ======================================================= */

//   const sessions =
//     useMemo(() => {

//       if (
//         Array.isArray(
//           outletSessions
//         )
//       ) {
//         return outletSessions;
//       }


//       if (
//         Array.isArray(
//           website?.sessions
//         )
//       ) {
//         return website.sessions;
//       }


//       return [];

//     }, [
//       outletSessions,
//       website,
//     ]);


//   /* =======================================================
//      BANNERS
//   ======================================================= */

//   const banners =
//     useMemo(() => {

//       if (
//         Array.isArray(
//           outletBanners
//         )
//       ) {
//         return outletBanners;
//       }


//       if (
//         Array.isArray(
//           website?.banners
//         )
//       ) {
//         return website.banners;
//       }


//       return [];

//     }, [
//       outletBanners,
//       website,
//     ]);


//   /* =======================================================
//      TIMEZONE
//   ======================================================= */

//   const [
//     timezone,
//     setTimezone,
//   ] = useState(
//     "Asia/Kolkata"
//   );


//   const [
//     timezoneLabel,
//     setTimezoneLabel,
//   ] = useState(
//     "Asia/Kolkata"
//   );


//   const [
//     timezoneAbbr,
//     setTimezoneAbbr,
//   ] = useState(
//     "IST"
//   );


//   const [
//     currentTime,
//     setCurrentTime,
//   ] = useState(
//     ""
//   );


//   /* =======================================================
//      GET USER TIMEZONE
//   ======================================================= */

//   useEffect(() => {

//     try {

//       const tz =
//         getTimezone();


//       if (!tz) {
//         return;
//       }


//       if (
//         typeof tz ===
//         "string"
//       ) {

//         setTimezone(
//           tz
//         );

//         setTimezoneLabel(
//           tz
//         );

//         const shortTimezone =
//           tz === "Asia/Kolkata" ||
//           tz === "Asia/Calcutta"
//             ? "IST"
//             : new Intl.DateTimeFormat("en-US", {
//                 timeZone: tz,
//                 timeZoneName: "short",
//               })
//                 .formatToParts(new Date())
//                 .find(
//                   (part) => part.type === "timeZoneName"
//                 )?.value || "IST";

//         setTimezoneAbbr(
//           shortTimezone
//         );

//         return;
//       }


//       setTimezone(
//         tz.timezone ||
//           "Asia/Kolkata"
//       );


//       setTimezoneLabel(
//         tz.label ||
//           tz.timezone ||
//           "Asia/Kolkata"
//       );


//       const objectTimezone =
//         tz.timezone ||
//         "Asia/Kolkata";

//       const objectAbbr =
//         tz.abbr ||
//         (
//           objectTimezone === "Asia/Kolkata" ||
//           objectTimezone === "Asia/Calcutta"
//             ? "IST"
//             : new Intl.DateTimeFormat("en-US", {
//                 timeZone: objectTimezone,
//                 timeZoneName: "short",
//               })
//                 .formatToParts(new Date())
//                 .find(
//                   (part) => part.type === "timeZoneName"
//                 )?.value || "IST"
//         );

//       setTimezoneAbbr(
//         objectAbbr
//       );

//     } catch (
//       error
//     ) {

//       console.error(
//         "Timezone error:",
//         error
//       );

//     }

//   }, []);


//   /* =======================================================
//      LIVE CLOCK
//   ======================================================= */

//   useEffect(() => {

//     const updateClock =
//       () => {

//         setCurrentTime(
//           getNowInTimezone(
//             timezone
//           )
//         );

//       };


//     updateClock();


//     const timer =
//       setInterval(
//         updateClock,
//         1000
//       );


//     return () =>
//       clearInterval(
//         timer
//       );

//   }, [
//     timezone,
//   ]);


//   /* =======================================================
//      STATUS GROUPS
//   ======================================================= */

//   const liveSessions =
//     useMemo(
//       () =>
//         sessions.filter(
//           (
//             session
//           ) =>
//             getLiveStatus(
//               session,
//               timezone
//             ) ===
//             "LIVE"
//         ),
//       [
//         sessions,
//         timezone,
//         currentTime,
//       ]
//     );


//   const upcomingSessions =
//     useMemo(
//       () =>
//         sessions.filter(
//           (
//             session
//           ) =>
//             getLiveStatus(
//               session,
//               timezone
//             ) ===
//             "UPCOMING"
//         ),
//       [
//         sessions,
//         timezone,
//         currentTime,
//       ]
//     );


//   const scheduledSessions =
//     useMemo(
//       () =>
//         sessions.filter(
//           (
//             session
//           ) =>
//             getLiveStatus(
//               session,
//               timezone
//             ) ===
//             "SCHEDULED"
//         ),
//       [
//         sessions,
//         timezone,
//         currentTime,
//       ]
//     );


//   const completedSessions =
//     useMemo(
//       () =>
//         sessions.filter(
//           (
//             session
//           ) =>
//             getLiveStatus(
//               session,
//               timezone
//             ) ===
//             "COMPLETED"
//         ),
//       [
//         sessions,
//         timezone,
//         currentTime,
//       ]
//     );


//   /* =======================================================
//      BACK
//   ======================================================= */

//   const goBack = () => {

//     navigate(
//       "/institute/website/preview"
//     );

//   };


//   /* =======================================================
//      SECTION HIDDEN
//   ======================================================= */

//   if (
//     !sessionsVisible
//   ) {

//     return null;

//   }


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


//   /* =======================================================
//      EMPTY STATE
//   ======================================================= */

//   if (
//     sessions.length === 0
//   ) {

//     return (
//       <div
//         className="
//           min-h-screen
//         "
//         style={{
//           backgroundColor:
//             branding.pageBackgroundColor,

//           fontFamily:
//             fontFamily(
//               branding.fontBody
//             ),
//         }}
//       >

//         <SessionsHero
//           branding={
//             branding
//           }
//           content={
//             content
//           }
//           onBack={
//             goBack
//           }
//           banners={
//             banners
//           }
//           empty
//         />


//         <div
//           className="
//             mx-auto
//             max-w-7xl
//             px-5
//             py-24
//             text-center
//             sm:px-6
//             lg:px-8
//           "
//         >

//           <div
//             className="
//               mx-auto
//               flex
//               h-20
//               w-20
//               items-center
//               justify-center
//               rounded-full
//             "
//             style={{
//               backgroundColor:
//                 hexToRgba(
//                   branding.buttonColor,
//                   0.10
//                 ),

//               color:
//                 branding.buttonColor,
//             }}
//           >

//             <HiCalendar
//               size={38}
//             />

//           </div>


//           <h2
//             className="
//               mt-6
//               text-2xl
//             "
//             style={
//               headingStyle
//             }
//           >
//             No Sessions Available
//           </h2>


//           <p
//             className="
//               mx-auto
//               mt-2
//               max-w-md
//             "
//             style={{
//               ...bodyStyle,
//               opacity: 0.60,
//             }}
//           >
//             There are currently
//             no active sessions
//             available for this
//             institute.
//           </p>


//           <button
//             type="button"
//             onClick={() =>
//               navigate(
//                 "/institute/website/preview/classes"
//               )
//             }
//             className="
//               mt-7
//               inline-flex
//               items-center
//               gap-2
//               px-6
//               py-3
//               transition
//               hover:opacity-90
//             "
//             style={{
//               backgroundColor:
//                 branding.buttonColor,

//               color:
//                 branding.buttonTextColor,

//               borderRadius:
//                 getButtonRadius(
//                   branding
//                 ),

//               fontFamily:
//                 fontFamily(
//                   branding.fontBody
//                 ),

//               fontWeight:
//                 branding.subheadingWeight,
//             }}
//           >

//             Browse Classes

//             <HiArrowRight />

//           </button>

//         </div>

//       </div>
//     );
//   }


//   /* =======================================================
//      MAIN PAGE
//   ======================================================= */

//   return (
//     <div
//       className="
//         min-h-screen
//       "
//       style={{
//         backgroundColor:
//           branding.pageBackgroundColor,

//         color:
//           branding.textColor,

//         fontFamily:
//           fontFamily(
//             branding.fontBody
//           ),
//       }}
//     >

//       {/* =================================================
//           HERO
//       ================================================= */}

//       <SessionsHero
//         branding={
//           branding
//         }
//         content={
//           content
//         }
//         onBack={
//           goBack
//         }
//         timezoneLabel={
//           timezoneLabel
//         }
//         timezoneAbbr={
//           timezoneAbbr
//         }
//         banners={
//           banners
//         }
//       />


//       {/* =================================================
//           CONTENT
//       ================================================= */}

//       <main
//         className="
//           mx-auto
//           max-w-7xl
//           px-5
//           py-12
//           sm:px-6
//           lg:px-8
//         "
//       >

//         {/* ===============================================
//             STATS
//         =============================================== */}

//         <div
//           className="
//             mb-12
//             grid
//             grid-cols-2
//             gap-4
//             md:grid-cols-4
//           "
//         >

//           <StatCard
//             label="Total Sessions"
//             value={
//               sessions.length
//             }
//             branding={
//               branding
//             }
//           />


//           <StatCard
//             label="Live Now"
//             value={
//               liveSessions.length
//             }
//             branding={
//               branding
//             }
//             accent={
//               branding.iconColor
//             }
//           />


//           <StatCard
//             label="Starting Soon"
//             value={
//               upcomingSessions.length
//             }
//             branding={
//               branding
//             }
//             accent={
//               branding.buttonColor
//             }
//           />


//           <StatCard
//             label="Scheduled"
//             value={
//               scheduledSessions.length
//             }
//             branding={
//               branding
//             }
//             accent={
//               branding.subheadingColor
//             }
//           />

//         </div>


//         {/* ===============================================
//             LIVE
//         =============================================== */}

//         {liveSessions.length >
//           0 && (

//           <SessionSection
//             title="Live Now"
//             subtitle="Sessions currently in progress."
//             sessions={
//               liveSessions
//             }
//             timezone={
//               timezone
//             }
//             timezoneAbbr={
//               timezoneAbbr
//             }
//             branding={
//               branding
//             }
//             status="LIVE"
//           />

//         )}


//         {/* ===============================================
//             UPCOMING
//         =============================================== */}

//         {upcomingSessions.length >
//           0 && (

//           <SessionSection
//             title="Starting Soon"
//             subtitle="Sessions scheduled for today."
//             sessions={
//               upcomingSessions
//             }
//             timezone={
//               timezone
//             }
//             timezoneAbbr={
//               timezoneAbbr
//             }
//             branding={
//               branding
//             }
//             status="UPCOMING"
//           />

//         )}


//         {/* ===============================================
//             SCHEDULED
//         =============================================== */}

//         {scheduledSessions.length >
//           0 && (

//           <SessionSection
//             title=""
//             subtitle=""
//             sessions={
//               scheduledSessions
//             }
//             timezone={
//               timezone
//             }
//             timezoneAbbr={
//               timezoneAbbr
//             }
//             branding={
//               branding
//             }
//             status="SCHEDULED"
//           />

//         )}


//         {/* ===============================================
//             COMPLETED
//         =============================================== */}

//         {completedSessions.length >
//           0 && (

//           <SessionSection
//             title="Completed"
//             subtitle="Sessions that have already finished today."
//             sessions={
//               completedSessions
//             }
//             timezone={
//               timezone
//             }
//             timezoneAbbr={
//               timezoneAbbr
//             }
//             branding={
//               branding
//             }
//             status="COMPLETED"
//           />

//         )}

//       </main>

//     </div>
//   );
// }


// /* =========================================================
//    HERO
// ========================================================= */

// const SessionsHero = ({
//   branding,
//   content,
//   onBack,
//   timezoneLabel,
//   timezoneAbbr,
//   banners = [],
//   empty = false,
// }) => {

//   const sessionBanner =
//     useMemo(() => {

//       if (
//         !Array.isArray(
//           banners
//         ) ||
//         banners.length === 0
//       ) {
//         return null;
//       }


//       const specificBanner =
//         banners.find(
//           (
//             banner
//           ) => {

//             const type =
//               String(
//                 banner?.banner_type ||
//                 banner?.bannerType ||
//                 banner?.page ||
//                 banner?.page_name ||
//                 ""
//               )
//                 .trim()
//                 .toLowerCase();


//             return (
//               type ===
//                 "session" ||
//               type ===
//                 "sessions"
//             );

//           }
//         );


//       if (
//         specificBanner
//       ) {
//         return specificBanner;
//       }


//       const activeBanner =
//         banners.find(
//           (
//             banner
//           ) =>
//             banner?.is_active ===
//               1 ||
//             banner?.is_active ===
//               true ||
//             banner?.isActive ===
//               true
//         );


//       if (
//         activeBanner
//       ) {
//         return activeBanner;
//       }


//       return (
//         banners[0] ||
//         null
//       );

//     }, [
//       banners,
//     ]);


//   const bannerImage =
//     sessionBanner?.image_url ||
//     sessionBanner?.imageUrl ||
//     sessionBanner?.image ||
//     sessionBanner?.banner_image ||
//     sessionBanner?.bannerImage ||
//     sessionBanner?.file_url ||
//     sessionBanner?.fileUrl ||
//     null;


//   const bannerStyle =
//     bannerImage
//       ? {
//           backgroundImage:
//             `url("${bannerImage}")`,

//           backgroundSize:
//             "cover",

//           backgroundPosition:
//             "center",

//           backgroundRepeat:
//             "no-repeat",

//           backgroundColor:
//             "#E5E7EB",
//         }
//       : {
//           background:
//             `linear-gradient(
//             135deg,
//             ${branding.buttonColor},
//             ${branding.subheadingColor}
//           )`,
//         };


//   return (
//     <section
//       style={{
//         backgroundColor:
//           branding.pageBackgroundColor,
//       }}
//     >

//       {/* =================================================
//           BANNER IMAGE
//       ================================================= */}

//       <div
//         className="
//           w-full
//           overflow-hidden
//         "
//         style={
//           bannerStyle
//         }
//       >

//         <div
//           className="
//             min-h-[430px]
//             w-full
//             sm:min-h-[430px]
//             lg:min-h-[430px]
//           "
//         />

//       </div>


//       {/* =================================================
//           CONTENT BELOW IMAGE
//       ================================================= */}

//       <div
//         className="
//           mx-auto
//           max-w-7xl
//           px-5
//           py-10
//           sm:px-6
//           lg:px-8
//         "
//       >

//         {/* BACK */}


//         {/* PAGE CONTENT */}

//         <div
//           className="
//             flex
//             flex-col
//             justify-between
//             gap-6
//             lg:flex-row
//             lg:items-end
//           "
//         >

//           <div>

//             {/* EYEBROW */}

//             {content
//               ?.sessions
//               ?.eyebrow && (
//               <p
//                 className="
//                   text-sm
//                   uppercase
//                   tracking-widest
//                 "
//                 style={{
//                   color:
//                     branding.subheadingColor,

//                   fontFamily:
//                     fontFamily(
//                       branding.fontSubheading
//                     ),

//                   fontWeight:
//                     branding.subheadingWeight,
//                 }}
//               >
//                 {
//                   content
//                     .sessions
//                     .eyebrow
//                 }
//               </p>
//             )}


//             {/* HEADING */}

//             <h1
//               className="
//                 mt-2
//                 text-4xl
//                 sm:text-5xl
//               "
//               style={{
//                 color:
//                   branding.headingColor,

//                 fontFamily:
//                   fontFamily(
//                     branding.fontHeading
//                   ),

//                 fontWeight:
//                   branding.headingWeight,

//                 lineHeight:
//                   branding.headingLineHeight,

//                 letterSpacing:
//                   branding.headingLetterSpacing,
//               }}
//             >
//               {
//                 content
//                   .sessions
//                   .heading
//               }
//             </h1>


//             {/* SUBHEADING */}

//             {content
//               ?.sessions
//               ?.subheading && (
//               <p
//                 className="
//                   mt-4
//                   max-w-2xl
//                   text-base
//                 "
//                 style={{
//                   color:
//                     branding.textColor,

//                   fontFamily:
//                     fontFamily(
//                       branding.fontBody
//                     ),

//                   fontWeight:
//                     branding.bodyWeight,

//                   lineHeight:
//                     branding.bodyLineHeight,

//                   opacity: 0.70,
//                 }}
//               >
//                 {
//                   content
//                     .sessions
//                     .subheading
//                 }
//               </p>
//             )}

//           </div>



//         </div>

//       </div>

//     </section>
//   );
// };


// /* =========================================================
//    STAT CARD
// ========================================================= */

// const StatCard = ({
//   label,
//   value,
//   branding,
//   accent,
// }) => {

//   return (
//     <div
//       className="
//         p-5
//         shadow-sm
//         transition
//         hover:-translate-y-0.5
//       "
//       style={{
//         backgroundColor:
//           branding.cardBackgroundColor,

//         border:
//           `1px solid ${hexToRgba(
//             branding.textColor,
//             0.10
//           )}`,

//         borderRadius:
//           "16px",
//       }}
//     >

//       <p
//         className="
//           text-sm
//         "
//         style={{
//           color:
//             accent ||
//             branding.subheadingColor,

//           fontFamily:
//             fontFamily(
//               branding.fontSubheading
//             ),

//           fontWeight:
//             branding.subheadingWeight,
//         }}
//       >
//         {label}
//       </p>


//       <p
//         className="
//           mt-2
//           text-3xl
//         "
//         style={{
//           color:
//             branding.headingColor,

//           fontFamily:
//             fontFamily(
//               branding.fontHeading
//             ),

//           fontWeight:
//             branding.headingWeight,

//           lineHeight:
//             branding.headingLineHeight,
//         }}
//       >
//         {value}
//       </p>

//     </div>
//   );
// };


// /* =========================================================
//    SESSION SECTION
// ========================================================= */

// const SessionSection = ({
//   title,
//   subtitle,
//   sessions,
//   timezone,
//   timezoneAbbr,
//   branding,
//   status,
// }) => {

//   const statusColor =
//     status ===
//     "LIVE"
//       ? branding.iconColor
//       : status ===
//           "UPCOMING"
//         ? branding.buttonColor
//         : status ===
//             "COMPLETED"
//           ? branding.textColor
//           : branding.subheadingColor;


//   return (
//     <section
//       className="
//         mb-12
//       "
//     >

//       {/* SECTION HEADER */}

//       {(title || subtitle) && (
//       <div
//         className="
//           mb-6
//           flex
//           items-start
//           gap-3
//         "
//       >

//         <div
//           className="
//             mt-2
//             h-3
//             w-3
//             flex-shrink-0
//             rounded-full
//           "
//           style={{
//             backgroundColor:
//               statusColor,

//             boxShadow:
//               status ===
//               "LIVE"
//                 ? `0 0 0 5px ${hexToRgba(
//                     statusColor,
//                     0.10
//                   )}`
//                 : "none",
//           }}
//         />


//         <div>

//           <h2
//             className="
//               text-2xl
//             "
//             style={{
//               color:
//                 statusColor,

//               fontFamily:
//                 fontFamily(
//                   branding.fontHeading
//                 ),

//               fontWeight:
//                 branding.headingWeight,

//               lineHeight:
//                 branding.headingLineHeight,
//             }}
//           >
//             {title}
//           </h2>


//           <p
//             className="
//               mt-1
//               text-sm
//             "
//             style={{
//               color:
//                 branding.textColor,

//               fontFamily:
//                 fontFamily(
//                   branding.fontBody
//                 ),

//               opacity: 0.55,
//             }}
//           >
//             {subtitle}
//           </p>

//         </div>

//       </div>


//       )}

//       {/* CARDS */}

//       <div
//         className="
//           grid
//           gap-6
//           lg:grid-cols-2
//         "
//       >

//         {sessions.map(
//           (
//             session,
//             index
//           ) => (

//             <SessionCard
//               key={
//                 session?.session_id ||
//                 session?.id ||
//                 session?.booking_id ||
//                 index
//               }
//               session={
//                 session
//               }
//               viewerTimezone={
//                 timezone
//               }
//               viewerAbbr={
//                 timezoneAbbr
//               }
//               branding={
//                 branding
//               }
//             />

//           )
//         )}

//       </div>

//     </section>
//   );
// };


// /* =========================================================
//    SESSION CARD
// ========================================================= */

// const SessionCard = ({
//   session,
//   viewerTimezone,
//   viewerAbbr,
//   branding,
// }) => {

//   const status =
//     getLiveStatus(
//       session,
//       viewerTimezone
//     );


//   const config =
//     STATUS_CONFIG[
//       status
//     ] ||
//     STATUS_CONFIG.SCHEDULED;


//   const classTitle =
//     session?.class_title ||
//     session?.class_name ||
//     session?.class?.title ||
//     session?.title ||
//     "Class";


//   const sessionTitle =
//     session?.session_title ||
//     session?.session_name ||
//     session?.title ||
//     "Class Session";


//   const trainerName =
//     session?.trainer_name ||
//     session?.trainer?.name ||
//     session?.trainer?.full_name ||
//     "Not Assigned";


//   const days =
//     normalizeDays(
//       session?.days ||
//         session?.available_days ||
//         session?.availableDays
//     );


//   const startTime =
//     session?.local_start_time ||
//     session?.start_time ||
//     session?.startTime;


//   const endTime =
//     session?.end_time ||
//     session?.endTime;


//   const sessionTimezone =
//     session?.class_timezone ||
//     session?.class_session_timezone ||
//     session?.session_timezone ||
//     session?.timezone ||
//     viewerTimezone;


//   const date =
//     session?.session_date ||
//     session?.date ||
//     session?.start_date;


//   const zoomUrl =
//     session?.zoom?.join_url ||
//     session?.zoom?.joinUrl ||
//     session?.zoom_link ||
//     session?.zoomLink ||
//     session?.meeting_url ||
//     session?.meetingUrl ||
//     null;


//   const canJoin =
//     session?.can_join ===
//       true ||
//     session?.canJoin ===
//       true;


//   const image =
//     session?.trainer_image ||
//     session?.trainer_profile_image ||
//     session?.trainer?.profile_image ||
//     session?.trainer?.image ||
//     null;


//   const statusColor =
//     status ===
//     "LIVE"
//       ? branding.iconColor
//       : status ===
//           "UPCOMING"
//         ? branding.buttonColor
//         : status ===
//             "COMPLETED"
//           ? branding.textColor
//           : branding.subheadingColor;


//   const statusBackground =
//     hexToRgba(
//       statusColor,
//       0.08
//     );


//   const statusBorder =
//     hexToRgba(
//       statusColor,
//       0.20
//     );


//   return (
//     <article
//       className="
//         overflow-hidden
//         p-6
//         shadow-sm
//         transition-all
//         duration-300
//         hover:-translate-y-1
//         hover:shadow-lg
//       "
//       style={{
//         backgroundColor:
//           branding.cardBackgroundColor,

//         border:
//           `1px solid ${hexToRgba(
//             branding.textColor,
//             0.10
//           )}`,

//         borderRadius:
//           "18px",

//         boxShadow:
//           status ===
//           "LIVE"
//             ? `0 0 0 2px ${hexToRgba(
//                 branding.iconColor,
//                 0.12
//               )}`
//             : undefined,
//       }}
//     >

//       {/* HEADER */}

//       <div
//         className="
//           mb-6
//           flex
//           items-start
//           justify-between
//           gap-4
//         "
//       >

//         <div
//           className="
//             min-w-0
//           "
//         >

//           <h3
//             className="
//               truncate
//               text-xl
//             "
//             style={{
//               color:
//                 branding.headingColor,

//               fontFamily:
//                 fontFamily(
//                   branding.fontHeading
//                 ),

//               fontWeight:
//                 branding.headingWeight,

//               lineHeight:
//                 branding.headingLineHeight,
//             }}
//           >
//             {classTitle}
//           </h3>


//           <p
//             className="
//               mt-1
//               truncate
//               text-sm
//               uppercase
//               tracking-wide
//             "
//             style={{
//               color:
//                 branding.subheadingColor,

//               fontFamily:
//                 fontFamily(
//                   branding.fontSubheading
//                 ),

//               fontWeight:
//                 branding.subheadingWeight,
//             }}
//           >
//             {sessionTitle}
//           </p>

//         </div>


//         <span
//           className="
//             flex
//             shrink-0
//             items-center
//             gap-1.5
//             px-3
//             py-1.5
//             text-xs
//           "
//           style={{
//             color:
//               statusColor,

//             backgroundColor:
//               statusBackground,

//             border:
//               `1px solid ${statusBorder}`,

//             borderRadius:
//               getButtonRadius(
//                 branding
//               ),

//             fontFamily:
//               fontFamily(
//                 branding.fontBody
//               ),

//             fontWeight:
//               branding.subheadingWeight,
//           }}
//         >

//           {status ===
//             "LIVE" && (
//             <span
//               className="
//                 h-2
//                 w-2
//                 animate-pulse
//                 rounded-full
//               "
//               style={{
//                 backgroundColor:
//                   statusColor,
//               }}
//             />
//           )}

//           {config.title}

//         </span>

//       </div>


//       {/* TIME / DAYS */}

//       <div
//         className="
//           mb-5
//           grid
//           gap-4
//           md:grid-cols-2
//         "
//       >

//         <InfoBox
//           branding={
//             branding
//           }
//           icon={
//             <HiClock
//               size={18}
//             />
//           }
//           label="Time"
//         >

//           <p
//             className="
//               mt-2
//               text-lg
//             "
//             style={{
//               color:
//                 branding.headingColor,

//               fontFamily:
//                 fontFamily(
//                   branding.fontHeading
//                 ),

//               fontWeight:
//                 branding.subheadingWeight,
//             }}
//           >

//             {getTimezoneAbbreviation(
//               viewerTimezone
//             )}{" "}

//             {formatTime(
//               startTime
//             )}

//             {endTime
//               ? ` - ${formatTime(
//                   endTime
//                 )}`
//               : ""}

//           </p>


//         </InfoBox>


//         <InfoBox
//           branding={
//             branding
//           }
//           icon={
//             <HiCalendar
//               size={18}
//             />
//           }
//           label="Days"
//         >

//           <p
//             className="
//               mt-2
//               text-lg
//             "
//             style={{
//               color:
//                 branding.headingColor,

//               fontFamily:
//                 fontFamily(
//                   branding.fontHeading
//                 ),

//               fontWeight:
//                 branding.subheadingWeight,
//             }}
//           >
//             {formatDaysCompact(
//               days
//             )}
//           </p>


//           {date && (
//             <p
//               className="
//                 mt-1
//                 text-xs
//               "
//               style={{
//                 color:
//                   branding.textColor,

//                 fontFamily:
//                   fontFamily(
//                     branding.fontBody
//                   ),

//                 opacity: 0.50,
//               }}
//             >
//               {formatDate(
//                 date
//               )}
//             </p>
//           )}

//         </InfoBox>

//       </div>


//       {/* TODAY */}

//       {status !==
//         "SCHEDULED" &&
//         days.length >
//           0 && (

//           <div
//             className="
//               mb-5
//               flex
//               items-center
//               gap-2
//               px-4
//               py-3
//             "
//             style={{
//               backgroundColor:
//                 hexToRgba(
//                   branding.iconColor,
//                   0.08
//                 ),

//               border:
//                 `1px solid ${hexToRgba(
//                   branding.iconColor,
//                   0.20
//                 )}`,

//               color:
//                 branding.iconColor,

//               borderRadius:
//                 "12px",
//             }}
//           >

//             <HiCheckCircle
//               size={18}
//             />

//             <span
//               className="
//                 text-sm
//               "
//               style={{
//                 fontFamily:
//                   fontFamily(
//                     branding.fontBody
//                   ),

//                 fontWeight:
//                   branding.subheadingWeight,
//               }}
//             >
//               Today's class
//             </span>

//           </div>

//         )}


//       {/* TRAINER */}

//       <div
//         className="
//           mb-6
//           p-4
//         "
//         style={{
//           backgroundColor:
//             hexToRgba(
//               branding.textColor,
//               0.025
//             ),

//           border:
//             `1px solid ${hexToRgba(
//               branding.textColor,
//               0.08
//             )}`,

//           borderRadius:
//             "12px",
//         }}
//       >

//         <div
//           className="
//             flex
//             items-center
//             gap-3
//           "
//         >

//           {image ? (

//             <img
//               src={
//                 image
//               }
//               alt={
//                 trainerName
//               }
//               className="
//                 h-11
//                 w-11
//                 rounded-full
//                 object-cover
//               "
//             />

//           ) : (

//             <div
//               className="
//                 flex
//                 h-11
//                 w-11
//                 items-center
//                 justify-center
//                 rounded-full
//                 text-sm
//               "
//               style={{
//                 backgroundColor:
//                   branding.buttonColor,

//                 color:
//                   branding.buttonTextColor,

//                 fontFamily:
//                   fontFamily(
//                     branding.fontHeading
//                   ),

//                 fontWeight:
//                   branding.headingWeight,
//               }}
//             >
//               {String(
//                 trainerName
//               )
//                 .charAt(
//                   0
//                 )
//                 .toUpperCase()}
//             </div>

//           )}


//           <div>

//             <div
//               className="
//                 flex
//                 items-center
//                 gap-2
//               "
//               style={{
//                 color:
//                   branding.subheadingColor,
//               }}
//             >

//               <HiShieldCheck
//                 size={16}
//               />

//               <span
//                 className="
//                   text-xs
//                   uppercase
//                   tracking-wide
//                 "
//                 style={{
//                   fontFamily:
//                     fontFamily(
//                       branding.fontSubheading
//                     ),

//                   fontWeight:
//                     branding.subheadingWeight,
//                 }}
//               >
//                 Trainer
//               </span>

//             </div>


//             <p
//               className="
//                 mt-1
//                 text-sm
//               "
//               style={{
//                 color:
//                   branding.headingColor,

//                 fontFamily:
//                   fontFamily(
//                     branding.fontBody
//                   ),

//                 fontWeight:
//                   branding.subheadingWeight,
//               }}
//             >
//               {trainerName}
//             </p>

//           </div>

//         </div>

//       </div>


//       {/* ACTION */}

//       {status ===
//         "LIVE" ? (

//         canJoin &&
//         zoomUrl ? (

//           <a
//             href={
//               zoomUrl
//             }
//             target="_blank"
//             rel="noreferrer"
//             className="
//               flex
//               w-full
//               items-center
//               justify-center
//               gap-2
//               px-4
//               py-3.5
//               text-sm
//               transition
//               hover:opacity-90
//             "
//             style={{
//               backgroundColor:
//                 branding.buttonColor,

//               color:
//                 branding.buttonTextColor,

//               borderRadius:
//                 getButtonRadius(
//                   branding
//                 ),

//               fontFamily:
//                 fontFamily(
//                   branding.fontBody
//                 ),

//               fontWeight:
//                 branding.subheadingWeight,

//               boxShadow:
//                 `0 8px 20px ${hexToRgba(
//                   branding.buttonColor,
//                   0.18
//                 )}`,
//             }}
//           >

//             <HiVideoCamera
//               size={19}
//             />

//             Join Now

//             <HiExternalLink
//               size={16}
//             />

//           </a>

//         ) : (

//           <button
//             type="button"
//             disabled
//             className="
//               w-full
//               cursor-not-allowed
//               px-4
//               py-3.5
//               text-sm
//             "
//             style={{
//               color:
//                 branding.iconColor,

//               backgroundColor:
//                 hexToRgba(
//                   branding.iconColor,
//                   0.08
//                 ),

//               border:
//                 `1px solid ${hexToRgba(
//                   branding.iconColor,
//                   0.20
//                 )}`,

//               borderRadius:
//                 getButtonRadius(
//                   branding
//                 ),

//               fontFamily:
//                 fontFamily(
//                   branding.fontBody
//                 ),

//               fontWeight:
//                 branding.subheadingWeight,
//             }}
//           >
//             {zoomUrl
//               ? "Waiting for Trainer Link"
//               : "Link Not Available"}
//           </button>

//         )

//       ) : status ===
//         "UPCOMING" ? (

//         <button
//           type="button"
//           disabled
//           className="
//             w-full
//             cursor-not-allowed
//             px-4
//             py-3.5
//             text-sm
//           "
//           style={{
//             color:
//               branding.buttonColor,

//             backgroundColor:
//               hexToRgba(
//                 branding.buttonColor,
//                 0.08
//               ),

//             border:
//               `1px solid ${hexToRgba(
//                 branding.buttonColor,
//                 0.20
//               )}`,

//             borderRadius:
//               getButtonRadius(
//                 branding
//               ),

//             fontFamily:
//               fontFamily(
//                 branding.fontBody
//               ),

//             fontWeight:
//               branding.subheadingWeight,
//           }}
//         >

//           <HiClock
//             className="
//               mr-1
//               inline
//             "
//           />

//           Starts at{" "}

//           {formatTime(
//             startTime
//           )}

//         </button>

//       ) : status ===
//         "SCHEDULED" ? (

//         <button
//           type="button"
//           disabled
//           className="
//             w-full
//             cursor-not-allowed
//             px-4
//             py-3.5
//             text-sm
//           "
//           style={{
//             color:
//               branding.subheadingColor,

//             backgroundColor:
//               hexToRgba(
//                 branding.subheadingColor,
//                 0.08
//               ),

//             border:
//               `1px solid ${hexToRgba(
//                 branding.subheadingColor,
//                 0.20
//               )}`,

//             borderRadius:
//               getButtonRadius(
//                 branding
//               ),

//             fontFamily:
//               fontFamily(
//                 branding.fontBody
//               ),

//             fontWeight:
//               branding.subheadingWeight,
//           }}
//         >

//           <HiCalendar
//             className="
//               mr-1
//               inline
//             "
//           />

//           Next class:{" "}

//           {days[0] ||
//             "TBD"}

//         </button>

//       ) : (

//         <button
//           type="button"
//           disabled
//           className="
//             w-full
//             cursor-not-allowed
//             px-4
//             py-3.5
//             text-sm
//           "
//           style={{
//             color:
//               branding.textColor,

//             backgroundColor:
//               hexToRgba(
//                 branding.textColor,
//                 0.05
//               ),

//             border:
//               `1px solid ${hexToRgba(
//                 branding.textColor,
//                 0.12
//               )}`,

//             borderRadius:
//               getButtonRadius(
//                 branding
//               ),

//             fontFamily:
//               fontFamily(
//                 branding.fontBody
//               ),

//             fontWeight:
//               branding.subheadingWeight,

//             opacity: 0.65,
//           }}
//         >

//           <HiCheckCircle
//             className="
//               mr-1
//               inline
//             "
//           />

//           Session Completed

//         </button>

//       )}

//     </article>
//   );
// };


// /* =========================================================
//    INFO BOX
// ========================================================= */

// const InfoBox = ({
//   branding,
//   icon,
//   label,
//   children,
// }) => {

//   return (
//     <div
//       className="
//         p-4
//       "
//       style={{
//         backgroundColor:
//           hexToRgba(
//             branding.buttonColor,
//             0.035
//           ),

//         border:
//           `1px solid ${hexToRgba(
//             branding.buttonColor,
//             0.10
//           )}`,

//         borderRadius:
//           "12px",
//       }}
//     >

//       <div
//         className="
//           flex
//           items-center
//           gap-2
//           text-xs
//           uppercase
//           tracking-wide
//         "
//         style={{
//           color:
//             branding.buttonColor,

//           fontFamily:
//             fontFamily(
//               branding.fontSubheading
//             ),

//           fontWeight:
//             branding.subheadingWeight,
//         }}
//       >

//         {icon}

//         <span>
//           {label}
//         </span>

//       </div>


//       {children}

//     </div>
//   );
// };


import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  HiOutlineBell,
  HiOutlineBookOpen,
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineVideoCamera,
  HiOutlinePlay,
  HiOutlineUser,
  HiOutlineDocumentText,
  HiOutlineCreditCard,
  HiOutlineSearch,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineHome,
  HiOutlineMenu,
  HiOutlineX,
  HiOutlineBookmark,
  HiOutlineExternalLink,
} from "react-icons/hi";

import {
  useNavigate,
  useOutletContext,
} from "react-router-dom";

import { getTimezone } from "../../utils/timezone";

/* =========================================================
   DEFAULT BRANDING
========================================================= */

const DEFAULT_BRANDING = {
  pageBackgroundColor: "#020914",
  navbarColor: "#031120",
  cardBackgroundColor: "#031120",

  headingColor: "#FFFFFF",
  subheadingColor: "#7DB7FF",
  textColor: "#FFFFFF",

  iconColor: "#1687FF",
  buttonColor: "#087CFF",
  buttonTextColor: "#FFFFFF",

  fontHeading: "Inter",
  fontSubheading: "Inter",
  fontBody: "Inter",

  headingWeight: 700,
  headingLineHeight: 1.15,
  headingLetterSpacing: 0,

  subheadingWeight: 500,
  subheadingLineHeight: 1.4,

  bodyWeight: 400,
  bodyLineHeight: 1.5,
  bodyLetterSpacing: 0,

  roundedButtons: true,
};

/* =========================================================
   GENERIC HELPERS
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

const getBrandingValue = (
  branding,
  camelKey,
  snakeKey,
  fallback
) => {
  const value =
    branding?.[camelKey] ??
    branding?.[snakeKey];

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

  subheadingColor:
    getBrandingValue(
      branding,
      "subheadingColor",
      "subheading_color",
      DEFAULT_BRANDING.subheadingColor
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
});

/* =========================================================
   DATE / TIME HELPERS
========================================================= */

const getSessionDate = (session) => {
  return getValue(
    session?.date,
    session?.session_date,
    session?.start_date,
    session?.sessionDate,
    session?.scheduled_date
  );
};

const getStartTime = (session) => {
  return getValue(
    session?.start_time,
    session?.startTime,
    session?.local_start_time,
    "10:00:00"
  );
};

const getEndTime = (session) => {
  return getValue(
    session?.end_time,
    session?.endTime,
    "11:00:00"
  );
};

const parseTimeToMinutes = (time) => {
  if (!time) return 0;

  const value = String(time)
    .trim()
    .toUpperCase();

  const ampmMatch =
    value.match(
      /^(\d{1,2}):?(\d{2})?\s*(AM|PM)$/
    );

  if (ampmMatch) {
    let hour =
      Number(ampmMatch[1]);

    const minute =
      Number(
        ampmMatch[2] || 0
      );

    const period =
      ampmMatch[3];

    if (
      period === "PM" &&
      hour !== 12
    ) {
      hour += 12;
    }

    if (
      period === "AM" &&
      hour === 12
    ) {
      hour = 0;
    }

    return (
      hour * 60 +
      minute
    );
  }

  const parts =
    value.split(":");

  const hour =
    Number(parts[0]) || 0;

  const minute =
    Number(parts[1]) || 0;

  return (
    hour * 60 +
    minute
  );
};

const formatTime = (
  time
) => {
  if (!time) return "--";

  const minutes =
    parseTimeToMinutes(
      time
    );

  const hour24 =
    Math.floor(
      minutes / 60
    );

  const minute =
    minutes % 60;

  const period =
    hour24 >= 12
      ? "PM"
      : "AM";

  const hour12 =
    hour24 % 12 || 12;

  return `${String(
    hour12
  ).padStart(
    2,
    "0"
  )}:${String(
    minute
  ).padStart(
    2,
    "0"
  )} ${period}`;
};

const formatTimeRange = (
  session
) => {
  return `${formatTime(
    getStartTime(session)
  )} – ${formatTime(
    getEndTime(session)
  )}`;
};

const getDateObject = (
  session
) => {
  const raw =
    getSessionDate(
      session
    );

  if (!raw) {
    return new Date();
  }

  const date =
    new Date(raw);

  return Number.isNaN(
    date.getTime()
  )
    ? new Date()
    : date;
};

const formatSessionDate = (
  session
) => {
  const date =
    getDateObject(
      session
    );

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

const getDayNumber = (
  session
) => {
  return getDateObject(
    session
  ).getDate();
};

/* =========================================================
   SESSION STATUS
========================================================= */

const getStatus = (
  session
) => {
  const backendStatus =
    String(
      getValue(
        session?.live_status,
        session?.status,
        ""
      )
    ).toUpperCase();

  if (
    [
      "LIVE",
      "UPCOMING",
      "SCHEDULED",
      "COMPLETED",
    ].includes(
      backendStatus
    )
  ) {
    return backendStatus;
  }

  const now =
    new Date();

  const date =
    getDateObject(
      session
    );

  const startMinutes =
    parseTimeToMinutes(
      getStartTime(session)
    );

  const endMinutes =
    parseTimeToMinutes(
      getEndTime(session)
    );

  const start =
    new Date(date);

  start.setHours(
    Math.floor(
      startMinutes / 60
    ),
    startMinutes % 60,
    0,
    0
  );

  const end =
    new Date(date);

  end.setHours(
    Math.floor(
      endMinutes / 60
    ),
    endMinutes % 60,
    0,
    0
  );

  if (
    now >= start &&
    now <= end
  ) {
    return "LIVE";
  }

  if (
    now < start
  ) {
    return "UPCOMING";
  }

  return "COMPLETED";
};

/* =========================================================
   SESSION DATA HELPERS
========================================================= */

const getSessionTitle = (
  session
) => {
  return getValue(
    session?.title,
    session?.session_title,
    session?.class_title,
    session?.class_name,
    "Live Session"
  );
};

const getCourseName = (
  session
) => {
  return getValue(
    session?.class_title,
    session?.class_name,
    session?.course_title,
    "Course"
  );
};

const getTrainerName = (
  session
) => {
  return getValue(
    session?.trainer_name,
    session?.trainer_full_name,
    session?.instructor_name,
    session?.teacher_name,
    "Trainer"
  );
};

const getTrainerImage = (
  session
) => {
  return getValue(
    session?.trainer_image,
    session?.trainer_profile_image,
    session?.trainer_photo,
    session?.profile_image,
    ""
  );
};

const getSessionImage = (
  session
) => {
  return getValue(
    session?.image,
    session?.image_url,
    session?.session_image,
    session?.class_image,
    session?.course_image,
    session?.thumbnail,
    session?.thumbnail_url,
    ""
  );
};

const getJoinUrl = (
  session
) => {
  return getValue(
    session?.join_url,
    session?.meeting_url,
    session?.meeting_link,
    session?.zoom_link,
    session?.google_meet_link,
    session?.live_url,
    ""
  );
};

/* =========================================================
   SIDEBAR
========================================================= */

function Sidebar({
  activePage,
  navigate,
  mobileOpen,
  setMobileOpen,
}) {
  const items = [
    {
      label: "Dashboard",
      icon: (
        <HiOutlineHome />
      ),
      path: "/institute/website/preview",
    },
    {
      label: "My Learning",
      icon: (
        <HiOutlineBookOpen />
      ),
      path: "/institute/website/preview/lms/my-learning",
    },
    {
      label: "Live Sessions",
      icon: (
        <HiOutlineVideoCamera />
      ),
      path: "/institute/website/preview/lms/live-sessions",
    },
    {
      label: "Recordings",
      icon: (
        <HiOutlinePlay />
      ),
      path: "/institute/website/preview/lms/recordings",
    },
    {
      label: "My Bookings",
      icon: (
        <HiOutlineCalendar />
      ),
      path: "/institute/website/preview/lms/my-bookings",
    },
    {
      label: "Assignments",
      icon: (
        <HiOutlineDocumentText />
      ),
      path: "/institute/website/preview/lms/assignments",
    },
    {
      label: "Attendance",
      icon: (
        <HiOutlineCalendar />
      ),
      path: "/institute/website/preview/lms/attendance",
    },
    {
      label: "Payment Details",
      icon: (
        <HiOutlineCreditCard />
      ),
      path: "/institute/website/preview/lms/payment-details",
    },
    {
      label: "Profile",
      icon: (
        <HiOutlineUser />
      ),
      path: "/institute/website/preview/lms/profile",
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
            <div className="relative flex h-12 w-12 items-center justify-center text-3xl text-blue-400">
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
            className="ml-auto text-white/60 lg:hidden"
            onClick={() =>
              setMobileOpen(
                false
              )
            }
          >
            <HiOutlineX size={22} />
          </button>
        </div>

        {/* NAV */}

        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <div className="space-y-2">
            {items.map(
              item => {
                const active =
                  item.label ===
                  activePage;

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
                      items-center
                      gap-4
                      rounded-xl
                      px-4 py-3.5
                      text-left
                      transition-all
                      ${
                        active
                          ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-[0_0_25px_rgba(0,110,255,.35)]"
                          : "text-white/75 hover:bg-white/[0.04] hover:text-white"
                      }
                    `}
                  >
                    <span className="flex w-6 justify-center text-[21px]">
                      {item.icon}
                    </span>

                    <span className="text-sm font-medium">
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

        {/* BRANDING */}

        <div className="border-t border-white/[0.05] px-8 py-7">
          <div className="font-serif text-xl italic leading-8 text-blue-300">
            <div>Art</div>
            <div>Builds</div>
            <div>A Better</div>
            <div>You”</div>
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
  navigate,
  student,
  setMobileOpen,
}) {
  const studentName =
    getValue(
      student?.name,
      student?.full_name,
      student?.displayName,
      "Priya Sharma"
    );

  const studentImage =
    getValue(
      student?.profile_image,
      student?.photoURL,
      student?.avatar,
      ""
    );

  return (
    <header className="sticky top-0 z-30 h-[82px] border-b border-white/[0.07] bg-[#020914]/90 backdrop-blur-xl">
      <div className="flex h-full items-center gap-4 px-4 sm:px-6 lg:px-8">
        <button
          onClick={() =>
            setMobileOpen(
              true
            )
          }
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] lg:hidden"
        >
          <HiOutlineMenu size={22} />
        </button>

        {/* SEARCH */}

        <div className="relative w-full max-w-[515px]">
          <HiOutlineSearch
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50"
            size={21}
          />

          <input
            type="text"
            placeholder="Search classes, sessions, recordings or topics..."
            className="h-12 w-full rounded-xl border border-blue-500/20 bg-[#061426] pl-11 pr-4 text-sm text-white outline-none placeholder:text-white/35 focus:border-blue-500/50"
          />
        </div>

        <div className="ml-auto flex items-center">
          {/* NOTIFICATION */}

          <button className="relative flex h-[58px] w-[58px] items-center justify-center border-l border-white/[0.06] text-white/90">
            <HiOutlineBell
              size={25}
            />

            <span className="absolute right-1 top-2 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold">
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
            className="flex items-center gap-3 border-l border-white/[0.06] px-4"
          >
            <div className="h-11 w-11 overflow-hidden rounded-full border border-white/10 bg-blue-500/10">
              {studentImage ? (
                <img
                  src={
                    studentImage
                  }
                  alt={
                    studentName
                  }
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <HiOutlineUser
                    size={21}
                    className="text-blue-400"
                  />
                </div>
              )}
            </div>

            <div className="hidden text-left sm:block">
              <p className="text-sm font-semibold">
                {
                  studentName
                }
              </p>

              <p className="text-xs text-white/45">
                Student
              </p>
            </div>

            <HiOutlineChevronRight
              size={17}
              className="hidden rotate-90 text-white/60 sm:block"
            />
          </button>
        </div>
      </div>
    </header>
  );
}

/* =========================================================
   HERO
========================================================= */

function LiveSessionsHero({
  branding,
}) {
  return (
    <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
      <div>
        <h1
          className="text-4xl font-bold tracking-tight sm:text-5xl"
          style={{
            color:
              branding.headingColor,
          }}
        >
          Live{" "}
          <span className="text-blue-500">
            Sessions
          </span>
        </h1>

        <p className="mt-2 text-base text-white/75">
          Join your scheduled live classes,
          interact with your trainer in real-time
          and enhance your skills.
        </p>
      </div>

      {/* HERO BANNER */}

      <div className="relative flex min-h-[90px] min-w-[310px] items-center overflow-hidden rounded-xl bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-800 px-6">
        <div className="absolute -right-8 -top-10 h-32 w-32 rounded-full bg-purple-300/10 blur-2xl" />

        <HiOutlineCalendar
          size={38}
          className="mr-5 text-white"
        />

        <div>
          <h3 className="text-lg font-bold">
            Be Present, Be Better
          </h3>

          <p className="text-sm text-white/75">
            Live. Learn. Practice. Grow!
          </p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   TABS
========================================================= */

function SessionTabs({
  activeTab,
  setActiveTab,
  counts,
}) {
  const tabs = [
    {
      key: "UPCOMING",
      label: "Upcoming",
      count:
        counts.upcoming,
    },
    {
      key: "LIVE",
      label: "Live Now",
      count:
        counts.live,
    },
    {
      key: "COMPLETED",
      label: "Completed",
      count:
        counts.completed,
    },
  ];

  return (
    <div className="mt-7 flex gap-2 overflow-x-auto">
      {tabs.map(
        tab => (
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
              flex min-w-[155px]
              items-center
              justify-center
              gap-2
              rounded-full
              border
              px-5 py-3
              text-sm
              font-semibold
              transition
              ${
                activeTab ===
                tab.key
                  ? "border-blue-500 bg-blue-600 text-white shadow-[0_0_25px_rgba(0,110,255,.25)]"
                  : "border-blue-500/20 bg-[#031120] text-white/70 hover:text-white"
              }
            `}
          >
            {tab.label}

            <span
              className={
                activeTab ===
                tab.key
                  ? "text-white/80"
                  : "text-blue-400"
              }
            >
              (
              {
                tab.count
              }
              )
            </span>
          </button>
        )
      )}
    </div>
  );
}

/* =========================================================
   SESSION CARD
========================================================= */

function SessionCard({
  session,
  navigate,
  onReminder,
  onCalendar,
}) {
  const status =
    getStatus(
      session
    );

  const image =
    getSessionImage(
      session
    );

  const trainerImage =
    getTrainerImage(
      session
    );

  const title =
    getSessionTitle(
      session
    );

  const trainer =
    getTrainerName(
      session
    );

  const joinUrl =
    getJoinUrl(
      session
    );

  const isLive =
    status === "LIVE";

  const isUpcoming =
    status === "UPCOMING" ||
    status === "SCHEDULED";

  return (
    <div className="overflow-hidden rounded-xl border border-blue-500/20 bg-[#031120] shadow-[0_8px_30px_rgba(0,0,0,.15)]">
      {/* IMAGE */}

      <div className="relative h-[145px] overflow-hidden bg-[#061426]">
        {image ? (
          <img
            src={
              image
            }
            alt={
              title
            }
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-950 to-purple-950">
            <HiOutlineVideoCamera
              size={55}
              className="text-blue-400/60"
            />
          </div>
        )}

        {/* STATUS */}

        {isLive && (
          <span className="absolute left-3 top-3 rounded-full bg-rose-500 px-3 py-1 text-xs font-bold text-white shadow-lg">
            ● LIVE NOW
          </span>
        )}

        {status ===
          "UPCOMING" && (
          <span className="absolute left-3 top-3 rounded-full bg-slate-600/95 px-3 py-1 text-xs font-bold">
            Starts Soon
          </span>
        )}

        {status ===
          "SCHEDULED" && (
          <span className="absolute left-3 top-3 rounded-full bg-blue-700/95 px-3 py-1 text-xs font-bold">
            Scheduled
          </span>
        )}

        {status ===
          "COMPLETED" && (
          <span className="absolute left-3 top-3 rounded-full bg-purple-700/90 px-3 py-1 text-xs font-bold">
            Completed
          </span>
        )}

        <span className="absolute right-3 top-3 rounded-full bg-blue-700 px-3 py-1 text-xs font-bold">
          {formatSessionDate(
            session
          ).split(" ")[0]}
        </span>
      </div>

      {/* CONTENT */}

      <div className="p-4">
        <h3 className="truncate text-lg font-bold">
          {
            title
          }
        </h3>

        <div className="mt-3 space-y-2 text-sm text-white/70">
          <div className="flex items-center gap-2">
            <HiOutlineCalendar
              size={18}
              className="text-white"
            />

            <span>
              {
                formatSessionDate(
                  session
                )
              }
            </span>
          </div>

          <div className="flex items-center gap-2">
            <HiOutlineClock
              size={18}
              className="text-white"
            />

            <span>
              {
                formatTimeRange(
                  session
                )
              }
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="h-7 w-7 overflow-hidden rounded-full bg-blue-500/10">
              {trainerImage ? (
                <img
                  src={
                    trainerImage
                  }
                  alt={
                    trainer
                  }
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <HiOutlineUser
                    size={15}
                    className="text-blue-400"
                  />
                </div>
              )}
            </div>

            <span>
              {
                trainer
              }
            </span>
          </div>
        </div>

        {/* ACTION */}

        <div className="mt-4">
          {isLive && (
            <button
              onClick={() => {
                if (
                  joinUrl
                ) {
                  window.open(
                    joinUrl,
                    "_blank",
                    "noopener,noreferrer"
                  );
                } else {
                  navigate(
                    `/institute/website/preview/lms/live-sessions/${session.id}`
                  );
                }
              }}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 py-3 text-sm font-bold shadow-lg shadow-blue-500/20"
            >
              <HiOutlineVideoCamera
                size={19}
              />

              Join Live Session
            </button>
          )}

          {isUpcoming && (
            <button
              onClick={() =>
                onReminder(
                  session
                )
              }
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-blue-500 px-4 py-3 text-sm font-semibold text-blue-300 transition hover:bg-blue-500/10"
            >
              <HiOutlineBell
                size={18}
              />

              Set Reminder
            </button>
          )}

          {status ===
            "COMPLETED" && (
            <button
              onClick={() =>
                navigate(
                  "/institute/website/preview/lms/recordings"
                )
              }
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-purple-500/50 px-4 py-3 text-sm font-semibold text-purple-300"
            >
              <HiOutlinePlay
                size={18}
              />

              View Recording
            </button>
          )}

          {status ===
            "SCHEDULED" && (
            <button
              onClick={() =>
                onCalendar(
                  session
                )
              }
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-blue-500 px-4 py-3 text-sm font-semibold text-blue-300 transition hover:bg-blue-500/10"
            >
              <HiOutlineCalendar
                size={18}
              />

              Add to Calendar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MY SESSIONS TABLE
========================================================= */

function SessionsTable({
  sessions,
  navigate,
  onReminder,
  onCalendar,
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-blue-500/20 bg-[#031120]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px]">
          <thead>
            <tr className="bg-[#061A30] text-left text-xs uppercase tracking-wide text-white/60">
              <th className="px-5 py-4">
                Date & Time
              </th>

              <th className="px-5 py-4">
                Course
              </th>

              <th className="px-5 py-4">
                Trainer
              </th>

              <th className="px-5 py-4">
                Status
              </th>

              <th className="px-5 py-4 text-right">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {sessions.map(
              session => {
                const status =
                  getStatus(
                    session
                  );

                const trainer =
                  getTrainerName(
                    session
                  );

                const trainerImage =
                  getTrainerImage(
                    session
                  );

                return (
                  <tr
                    key={
                      session.id ||
                      `${getSessionTitle(
                        session
                      )}-${getStartTime(
                        session
                      )}`
                    }
                    className="border-t border-white/[0.06] text-sm"
                  >
                    {/* DATE */}

                    <td className="px-5 py-4">
                      <div className="font-medium text-white">
                        {
                          formatSessionDate(
                            session
                          )
                        }
                      </div>

                      <div className="mt-1 text-xs text-white/45">
                        {
                          formatTimeRange(
                            session
                          )
                        }
                      </div>
                    </td>

                    {/* COURSE */}

                    <td className="px-5 py-4">
                      <div className="font-medium">
                        {
                          getCourseName(
                            session
                          )
                        }
                      </div>

                      <div className="mt-1 text-xs text-white/45">
                        {
                          getSessionTitle(
                            session
                          )
                        }
                      </div>
                    </td>

                    {/* TRAINER */}

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 overflow-hidden rounded-full bg-blue-500/10">
                          {trainerImage ? (
                            <img
                              src={
                                trainerImage
                              }
                              alt={
                                trainer
                              }
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center">
                              <HiOutlineUser
                                size={
                                  16
                                }
                                className="text-blue-400"
                              />
                            </div>
                          )}
                        </div>

                        <span>
                          {
                            trainer
                          }
                        </span>
                      </div>
                    </td>

                    {/* STATUS */}

                    <td className="px-5 py-4">
                      <StatusBadge
                        status={
                          status
                        }
                      />
                    </td>

                    {/* ACTION */}

                    <td className="px-5 py-4 text-right">
                      {status ===
                        "LIVE" && (
                        <button
                          onClick={() => {
                            const url =
                              getJoinUrl(
                                session
                              );

                            if (
                              url
                            ) {
                              window.open(
                                url,
                                "_blank",
                                "noopener,noreferrer"
                              );
                            }
                          }}
                          className="rounded-lg bg-blue-600 px-5 py-2.5 text-xs font-bold"
                        >
                          Join
                        </button>
                      )}

                      {status ===
                        "UPCOMING" && (
                        <button
                          onClick={() =>
                            onReminder(
                              session
                            )
                          }
                          className="rounded-lg border border-blue-500 px-4 py-2 text-xs font-semibold text-blue-300"
                        >
                          Set Reminder
                        </button>
                      )}

                      {status ===
                        "SCHEDULED" && (
                        <button
                          onClick={() =>
                            onCalendar(
                              session
                            )
                          }
                          className="rounded-lg border border-blue-500 px-4 py-2 text-xs font-semibold text-blue-300"
                        >
                          Add to Calendar
                        </button>
                      )}

                      {status ===
                        "COMPLETED" && (
                        <button
                          onClick={() =>
                            navigate(
                              "/institute/website/preview/lms/recordings"
                            )
                          }
                          className="rounded-lg border border-purple-500/50 px-4 py-2 text-xs font-semibold text-purple-300"
                        >
                          Recording
                        </button>
                      )}
                    </td>
                  </tr>
                );
              }
            )}

            {sessions.length ===
              0 && (
              <tr>
                <td
                  colSpan={
                    5
                  }
                  className="px-5 py-12 text-center text-sm text-white/40"
                >
                  No live sessions
                  found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* =========================================================
   STATUS BADGE
========================================================= */

function StatusBadge({
  status,
}) {
  const config = {
    LIVE: {
      label:
        "Live Now",
      className:
        "bg-rose-500/20 text-rose-300",
      dot:
        "bg-rose-500",
    },

    UPCOMING: {
      label:
        "Upcoming",
      className:
        "bg-blue-500/20 text-blue-300",
      dot:
        "bg-blue-500",
    },

    SCHEDULED: {
      label:
        "Upcoming",
      className:
        "bg-blue-500/20 text-blue-300",
      dot:
        "bg-blue-500",
    },

    COMPLETED: {
      label:
        "Completed",
      className:
        "bg-purple-500/20 text-purple-300",
      dot:
        "bg-purple-500",
    },
  };

  const item =
    config[
      status
    ] ||
    config.SCHEDULED;

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-2
        rounded-full
        px-3 py-1.5
        text-xs
        font-semibold
        ${item.className}
      `}
    >
      <span
        className={`h-2 w-2 rounded-full ${item.dot}`}
      />

      {
        item.label
      }
    </span>
  );
}

/* =========================================================
   CALENDAR
========================================================= */

function SessionCalendar({
  sessions,
  month,
  setMonth,
}) {
  const year =
    month.getFullYear();

  const monthIndex =
    month.getMonth();

  const firstDay =
    new Date(
      year,
      monthIndex,
      1
    ).getDay();

  const daysInMonth =
    new Date(
      year,
      monthIndex + 1,
      0
    ).getDate();

  const cells = [];

  for (
    let i = 0;
    i < firstDay;
    i++
  ) {
    cells.push(
      null
    );
  }

  for (
    let day = 1;
    day <=
    daysInMonth;
    day++
  ) {
    cells.push(
      day
    );
  }

  const sessionDays =
    sessions.map(
      session =>
        getDayNumber(
          session
        )
    );

  const today =
    new Date();

  const isToday = day =>
    today.getFullYear() ===
      year &&
    today.getMonth() ===
      monthIndex &&
    today.getDate() ===
      day;

  return (
    <div className="rounded-xl border border-blue-500/20 bg-[#031120] p-5">
      <div className="mb-5 flex items-center justify-between">
        <button
          onClick={() =>
            setMonth(
              new Date(
                year,
                monthIndex -
                  1,
                1
              )
            )
          }
          className="text-white/60 hover:text-white"
        >
          <HiOutlineChevronLeft
            size={20}
          />
        </button>

        <h3 className="font-semibold">
          {month.toLocaleDateString(
            "en-US",
            {
              month:
                "long",
              year:
                "numeric",
            }
          )}
        </h3>

        <button
          onClick={() =>
            setMonth(
              new Date(
                year,
                monthIndex +
                  1,
                1
              )
            )
          }
          className="text-white/60 hover:text-white"
        >
          <HiOutlineChevronRight
            size={20}
          />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-y-3 text-center text-xs">
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
              className="text-white/45"
            >
              {day}
            </div>
          )
        )}

        {cells.map(
          (
            day,
            index
          ) => {
            const hasSession =
              day &&
              sessionDays.includes(
                day
              );

            return (
              <div
                key={
                  index
                }
                className="relative flex h-8 items-center justify-center"
              >
                {day && (
                  <span
                    className={`
                      flex h-7 w-7
                      items-center
                      justify-center
                      rounded-full
                      ${
                        isToday(
                          day
                        )
                          ? "bg-blue-600 text-white"
                          : "text-white/75"
                      }
                    `}
                  >
                    {
                      day
                    }
                  </span>
                )}

                {hasSession &&
                  !isToday(
                    day
                  ) && (
                    <span className="absolute bottom-0 h-1 w-1 rounded-full bg-blue-500" />
                  )}

                {hasSession &&
                  isToday(
                    day
                  ) && (
                    <span className="absolute bottom-0 h-1 w-1 rounded-full bg-red-400" />
                  )}
              </div>
            );
          }
        )}
      </div>

      <div className="mt-5 space-y-2 border-t border-white/[0.06] pt-4 text-xs text-white/60">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
          Upcoming
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
          Live Now
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-purple-500" />
          Completed
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function WebsiteSessions() {
  const navigate =
    useNavigate();

  const outletContext =
    useOutletContext() ||
    {};

  const {
    sessions:
      outletSessions = [],

    website = {},

    branding:
      outletBranding = {},

    sections:
      outletSections = {},
  } = outletContext;

  const branding =
    useMemo(
      () =>
        normalizeBranding(
          outletBranding
        ),
      [
        outletBranding,
      ]
    );

  /* =======================================================
     SESSION VISIBILITY
  ======================================================= */

  const sessionsVisible =
    outletSections
      ?.sessions
      ?.visible !==
      false;

  /* =======================================================
     SESSIONS
  ======================================================= */

  const sessions =
    useMemo(() => {
      if (
        Array.isArray(
          outletSessions
        )
      ) {
        return outletSessions;
      }

      if (
        Array.isArray(
          website?.sessions
        )
      ) {
        return website.sessions;
      }

      return [];
    }, [
      outletSessions,
      website,
    ]);

  /* =======================================================
     STUDENT
  ======================================================= */

  const [student, setStudent] =
    useState(null);

  useEffect(() => {
    try {
      const saved =
        localStorage.getItem(
          "studentUser"
        );

      if (saved) {
        setStudent(
          JSON.parse(
            saved
          )
        );
      }
    } catch {
      setStudent(null);
    }
  }, []);

  /* =======================================================
     MOBILE
  ======================================================= */

  const [
    mobileOpen,
    setMobileOpen,
  ] = useState(false);

  /* =======================================================
     LIVE CLOCK
  ======================================================= */

  const [
    currentTime,
    setCurrentTime,
  ] = useState(
    new Date()
  );

  useEffect(() => {
    const timer =
      setInterval(
        () =>
          setCurrentTime(
            new Date()
          ),
        1000
      );

    return () =>
      clearInterval(
        timer
      );
  }, []);

  /* =======================================================
     TIMEZONE
  ======================================================= */

  const [
    timezone,
    setTimezone,
  ] = useState(
    "Asia/Kolkata"
  );

  useEffect(() => {
    try {
      const tz =
        getTimezone();

      if (!tz) {
        return;
      }

      if (
        typeof tz ===
        "string"
      ) {
        setTimezone(
          tz
        );
      } else if (
        tz.timezone
      ) {
        setTimezone(
          tz.timezone
        );
      }
    } catch (error) {
      console.error(
        "Timezone error:",
        error
      );
    }
  }, []);

  /* =======================================================
     STATUS
  ======================================================= */

  const liveSessions =
    useMemo(
      () =>
        sessions.filter(
          session =>
            getStatus(
              session
            ) ===
            "LIVE"
        ),
      [
        sessions,
        currentTime,
        timezone,
      ]
    );

  const upcomingSessions =
    useMemo(
      () =>
        sessions.filter(
          session => {
            const status =
              getStatus(
                session
              );

            return (
              status ===
                "UPCOMING" ||
              status ===
                "SCHEDULED"
            );
          }
        ),
      [
        sessions,
        currentTime,
        timezone,
      ]
    );

  const completedSessions =
    useMemo(
      () =>
        sessions.filter(
          session =>
            getStatus(
              session
            ) ===
            "COMPLETED"
        ),
      [
        sessions,
        currentTime,
        timezone,
      ]
    );

  /* =======================================================
     TAB
  ======================================================= */

  const [
    activeTab,
    setActiveTab,
  ] = useState(
    "UPCOMING"
  );

  const visibleSessions =
    useMemo(() => {
      if (
        activeTab ===
        "LIVE"
      ) {
        return liveSessions;
      }

      if (
        activeTab ===
        "COMPLETED"
      ) {
        return completedSessions;
      }

      return upcomingSessions;
    }, [
      activeTab,
      liveSessions,
      upcomingSessions,
      completedSessions,
    ]);

  /* =======================================================
     SEARCH
  ======================================================= */

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    courseFilter,
    setCourseFilter,
  ] = useState(
    "ALL"
  );

  const courseOptions =
    useMemo(() => {
      const names =
        sessions.map(
          session =>
            getCourseName(
              session
            )
        );

      return [
        "ALL",
        ...Array.from(
          new Set(
            names
          )
        ),
      ];
    }, [
      sessions,
    ]);

  const filteredSessions =
    useMemo(() => {
      let result = [
        ...visibleSessions,
      ];

      if (
        search.trim()
      ) {
        const keyword =
          search
            .trim()
            .toLowerCase();

        result =
          result.filter(
            session =>
              getSessionTitle(
                session
              )
                .toLowerCase()
                .includes(
                  keyword
                ) ||
              getCourseName(
                session
              )
                .toLowerCase()
                .includes(
                  keyword
                ) ||
              getTrainerName(
                session
              )
                .toLowerCase()
                .includes(
                  keyword
                )
            );
      }

      if (
        courseFilter !==
        "ALL"
      ) {
        result =
          result.filter(
            session =>
              getCourseName(
                session
              ) ===
              courseFilter
          );
      }

      return result;
    }, [
      visibleSessions,
      search,
      courseFilter,
    ]);

  /* =======================================================
     CALENDAR
  ======================================================= */

  const [
    calendarMonth,
    setCalendarMonth,
  ] = useState(
    new Date()
  );

  /* =======================================================
     REMINDER
  ======================================================= */

  const setReminder =
    session => {
      const title =
        getSessionTitle(
          session
        );

      try {
        const date =
          getDateObject(
            session
          );

        const start =
          parseTimeToMinutes(
            getStartTime(
              session
            )
          );

        date.setHours(
          Math.floor(
            start / 60
          ),
          start % 60,
          0,
          0
        );

        const reminder =
          {
            id:
              session.id ||
              Date.now(),
            title,
            date:
              date.toISOString(),
          };

        const existing =
          JSON.parse(
            localStorage.getItem(
              "finearts_session_reminders"
            ) ||
              "[]"
          );

        localStorage.setItem(
          "finearts_session_reminders",
          JSON.stringify([
            ...existing,
            reminder,
          ])
        );

        window.alert(
          `Reminder set for ${title}`
        );
      } catch {
        window.alert(
          `Reminder set for ${title}`
        );
      }
    };

  /* =======================================================
     CALENDAR EVENT
  ======================================================= */

  const addToCalendar =
    session => {
      const title =
        getSessionTitle(
          session
        );

      const date =
        getDateObject(
          session
        );

      const start =
        parseTimeToMinutes(
          getStartTime(
            session
          )
        );

      const end =
        parseTimeToMinutes(
          getEndTime(
            session
          )
        );

      date.setHours(
        Math.floor(
          start / 60
        ),
        start % 60,
        0,
        0
      );

      const endDate =
        new Date(
          date
        );

      endDate.setHours(
        Math.floor(
          end / 60
        ),
        end % 60,
        0,
        0
      );

      const pad =
        number =>
          String(
            number
          ).padStart(
            2,
            "0"
          );

      const formatICSDate =
        value => {
          return (
            value
              .toISOString()
              .replace(
                /[-:]/g,
                ""
              )
              .replace(
                /\.\d{3}Z$/,
                "Z"
              )
          );
        };

      const ics = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//FineArts//Student LMS//EN",
        "BEGIN:VEVENT",
        `DTSTART:${formatICSDate(
          date
        )}`,
        `DTEND:${formatICSDate(
          endDate
        )}`,
        `SUMMARY:${title}`,
        `DESCRIPTION:FineArts live session`,
        "END:VEVENT",
        "END:VCALENDAR",
      ].join(
        "\r\n"
      );

      const blob =
        new Blob(
          [ics],
          {
            type: "text/calendar",
          }
        );

      const url =
        URL.createObjectURL(
          blob
        );

      const link =
        document.createElement(
          "a"
        );

      link.href =
        url;

      link.download =
        `${title.replace(
          /\s+/g,
          "-"
        )}.ics`;

      document.body.appendChild(
        link
      );

      link.click();

      link.remove();

      URL.revokeObjectURL(
        url
      );
    };

  /* =======================================================
     EMPTY / HIDDEN
  ======================================================= */

  if (
    !sessionsVisible
  ) {
    return null;
  }

  /* =======================================================
     STATS
  ======================================================= */

  const counts = {
    upcoming:
      upcomingSessions.length,
    live:
      liveSessions.length,
    completed:
      completedSessions.length,
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div
      className="min-h-screen bg-[#020914] text-white"
      style={{
        fontFamily: `'${branding.fontBody}', sans-serif`,
      }}
    >
      {/* SIDEBAR */}

      <Sidebar
        activePage="Live Sessions"
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

        <main className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 lg:px-7">
          {/* HERO */}

          <LiveSessionsHero
            branding={
              branding
            }
          />

          {/* TABS */}

          <SessionTabs
            activeTab={
              activeTab
            }
            setActiveTab={
              setActiveTab
            }
            counts={
              counts
            }
          />

          {/* UPCOMING / LIVE / COMPLETED */}

          <section className="mt-4 rounded-xl border border-blue-500/20 bg-[#020D1B] p-3 sm:p-4">
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold">
                  {activeTab ===
                  "LIVE"
                    ? "Live Now"
                    : activeTab ===
                      "COMPLETED"
                    ? "Completed Live Sessions"
                    : "Upcoming Live Sessions"}
                </h2>

                <p className="mt-1 text-sm text-white/60">
                  {activeTab ===
                  "LIVE"
                    ? "Sessions currently in progress."
                    : activeTab ===
                      "COMPLETED"
                    ? "Sessions that have already finished."
                    : "Join your upcoming classes. Click the action when the session is ready."}
                </p>
              </div>

              <button
                onClick={() =>
                  setCalendarMonth(
                    new Date()
                  )
                }
                className="flex items-center gap-2 self-start text-sm font-semibold text-blue-400"
              >
                <HiOutlineCalendar
                  size={20}
                />

                View Calendar
              </button>
            </div>

            {/* CARDS */}

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {visibleSessions
                .slice(
                  0,
                  3
                )
                .map(
                  session => (
                    <SessionCard
                      key={
                        session.id
                      }
                      session={
                        session
                      }
                      navigate={
                        navigate
                      }
                      onReminder={
                        setReminder
                      }
                      onCalendar={
                        addToCalendar
                      }
                    />
                  )
                )}
            </div>

            {visibleSessions.length ===
              0 && (
              <div className="rounded-xl border border-dashed border-white/10 py-14 text-center">
                <HiOutlineVideoCamera
                  size={42}
                  className="mx-auto text-blue-400/50"
                />

                <p className="mt-4 text-sm text-white/45">
                  No sessions available
                  in this category.
                </p>
              </div>
            )}
          </section>

          {/* =================================================
              LOWER AREA
          ================================================= */}

          <section className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_315px]">
            {/* TABLE */}

            <div>
              <div className="mb-3 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-2xl font-bold">
                    My Live Sessions
                  </h2>

                  <p className="mt-1 text-sm text-blue-400">
                    View your upcoming and past
                    live sessions.
                  </p>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row">
                  {/* SEARCH */}

                  <div className="relative">
                    <HiOutlineSearch
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-white/45"
                      size={18}
                    />

                    <input
                      value={
                        search
                      }
                      onChange={event =>
                        setSearch(
                          event
                            .target
                            .value
                        )
                      }
                      placeholder="Search live sessions..."
                      className="h-11 w-full rounded-xl border border-blue-500/25 bg-[#061426] pl-10 pr-4 text-sm outline-none placeholder:text-white/35 focus:border-blue-500/50 sm:w-[235px]"
                    />
                  </div>

                  {/* COURSE FILTER */}

                  <select
                    value={
                      courseFilter
                    }
                    onChange={event =>
                      setCourseFilter(
                        event
                          .target
                          .value
                      )
                    }
                    className="h-11 rounded-xl border border-blue-500/25 bg-[#061426] px-4 text-sm text-white outline-none"
                  >
                    {courseOptions.map(
                      option => (
                        <option
                          key={
                            option
                          }
                          value={
                            option
                          }
                          className="bg-[#061426]"
                        >
                          {option ===
                          "ALL"
                            ? "All Courses"
                            : option}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>

              <SessionsTable
                sessions={
                  filteredSessions
                }
                navigate={
                  navigate
                }
                onReminder={
                  setReminder
                }
                onCalendar={
                  addToCalendar
                }
              />
            </div>

            {/* CALENDAR */}

            <SessionCalendar
              sessions={
                sessions
              }
              month={
                calendarMonth
              }
              setMonth={
                setCalendarMonth
              }
            />
          </section>
        </main>
      </div>
    </div>
  );
}