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

import { useEffect, useMemo, useState } from "react";

import {
  HiCalendar,
  HiClock,
  HiExternalLink,
  HiVideoCamera,
  HiShieldCheck,
  HiCheckCircle,
  HiArrowRight,
  HiArrowLeft,
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
  sessions: {

    heading: "Upcoming Sessions",

    subheading:
      "View our upcoming class sessions and join your scheduled live classes.",
  },
};


/* =========================================================
   DEFAULT SECTIONS
========================================================= */

const DEFAULT_SECTIONS = {
  sessions: {
    visible: true,
  },
};


/* =========================================================
   GENERIC VALUE HELPER
========================================================= */

const getValue = (
  ...values
) => {
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
  camelKey,
  snakeKey,
  fallback
) => {
  const value =
    branding?.[camelKey] ??
    branding?.[snakeKey];

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

  pageBackgroundColor: getBrandingValue(
    branding,
    "pageBackgroundColor",
    "page_background_color",
    DEFAULT_BRANDING.pageBackgroundColor
  ),

  cardBackgroundColor: getBrandingValue(
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

  fontHeading: getBrandingValue(
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

  fontBody: getBrandingValue(
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


/* =========================================================
   CONTENT NORMALIZER
========================================================= */

const normalizeContent = (
  content = {}
) => {

  const source =
    content?.sessions ||
    content?.session ||
    content?.Sessions ||
    {};

  return {
    sessions: {
      eyebrow:
        getValue(
          source?.eyebrow,
          source?.eyebrow_text,
          source?.label,
          DEFAULT_CONTENT.sessions.eyebrow
        ),

      heading:
        getValue(
          source?.heading,
          source?.title,
          source?.page_heading,
          DEFAULT_CONTENT.sessions.heading
        ),

      subheading:
        getValue(
          source?.subheading,
          source?.subtitle,
          source?.page_subheading,
          DEFAULT_CONTENT.sessions.subheading
        ),
    },
  };
};


/* =========================================================
   SECTIONS NORMALIZER
========================================================= */

const normalizeSections = (
  sections = {}
) => {

  const source =
    sections?.sessions ||
    sections?.session ||
    sections?.Sessions ||
    {};

  const value =
    source?.visible ??
    source?.is_visible ??
    source?.isVisible ??
    sections?.sessions_visible ??
    sections?.session_visible;


  if (
    typeof value === "boolean"
  ) {
    return {
      sessions: {
        visible: value,
      },
    };
  }


  if (
    value === 0 ||
    value === "0" ||
    value === "false"
  ) {
    return {
      sessions: {
        visible: false,
      },
    };
  }


  return DEFAULT_SECTIONS;
};


/* =========================================================
   FONT
========================================================= */

const fontFamily = (
  font
) =>
  font
    ? `'${font}', sans-serif`
    : "Inter, sans-serif";


/* =========================================================
   BUTTON RADIUS
========================================================= */

const getButtonRadius = (
  branding
) =>
  branding.roundedButtons
    ? "9999px"
    : "10px";


/* =========================================================
   HEX TO RGBA
========================================================= */

const hexToRgba = (
  color,
  alpha
) => {

  if (
    typeof color !==
    "string"
  ) {
    return color;
  }


  const hex =
    color.replace(
      "#",
      ""
    );


  if (
    !/^[0-9A-Fa-f]{6}$/.test(
      hex
    )
  ) {
    return color;
  }


  const r =
    parseInt(
      hex.substring(
        0,
        2
      ),
      16
    );


  const g =
    parseInt(
      hex.substring(
        2,
        4
      ),
      16
    );


  const b =
    parseInt(
      hex.substring(
        4,
        6
      ),
      16
    );


  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};


/* =========================================================
   FORMAT TIME
========================================================= */

const formatTime = (
  time
) => {

  if (!time) {
    return "--";
  }


  const value =
    String(time).trim();


  if (
    value
      .toLowerCase()
      .includes("am") ||
    value
      .toLowerCase()
      .includes("pm")
  ) {
    return value;
  }


  const parts =
    value.split(":");


  if (
    parts.length < 2
  ) {
    return value;
  }


  let hour =
    Number(parts[0]);


  const minute =
    String(
      parts[1]
    ).padStart(
      2,
      "0"
    );


  if (
    Number.isNaN(
      hour
    )
  ) {
    return value;
  }


  const period =
    hour >= 12
      ? "PM"
      : "AM";


  hour =
    hour % 12 || 12;


  return `${hour}:${minute} ${period}`;
};


/* =========================================================
   FORMAT DATE
========================================================= */

const formatDate = (
  date
) => {

  if (!date) {
    return "";
  }


  try {

    const parsed =
      new Date(date);


    if (
      Number.isNaN(
        parsed.getTime()
      )
    ) {
      return String(date);
    }


    return parsed.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );

  } catch {

    return String(date);

  }
};


/* =========================================================
   DAYS
========================================================= */

const normalizeDays = (
  days
) => {

  if (
    Array.isArray(
      days
    )
  ) {
    return days
      .map(
        (day) =>
          String(
            day
          ).trim()
      )
      .filter(
        Boolean
      );
  }


  if (
    typeof days ===
    "string"
  ) {

    const value =
      days.trim();


    if (!value) {
      return [];
    }


    if (
      value.startsWith("[") &&
      value.endsWith("]")
    ) {

      try {

        const parsed =
          JSON.parse(
            value
          );


        if (
          Array.isArray(
            parsed
          )
        ) {

          return parsed
            .map(
              (day) =>
                String(
                  day
                ).trim()
            )
            .filter(
              Boolean
            );
        }

      } catch {
        // Continue below
      }
    }


    return value
      .split(",")
      .map(
        (day) =>
          day.trim()
      )
      .filter(
        Boolean
      );
  }


  return [];
};


const formatDaysCompact = (
  days
) => {

  const normalized =
    normalizeDays(
      days
    );


  if (
    normalized.length === 0
  ) {
    return "No days";
  }


  return normalized
    .map(
      (day) =>
        String(day)
          .substring(
            0,
            3
          )
    )
    .join(" • ");
};


/* =========================================================
   TIMEZONE
========================================================= */

const getNowInTimezone = (
  timezone
) => {

  const tz =
    timezone ||
    "Asia/Kolkata";


  try {

    const parts =
      new Intl.DateTimeFormat(
        "en-US",
        {
          timeZone:
            tz,

          hour:
            "numeric",

          minute:
            "numeric",

          second:
            "numeric",

          hour12:
            false,
        }
      ).formatToParts(
        new Date()
      );


    let hour =
      Number(
        parts.find(
          (part) =>
            part.type ===
            "hour"
        )?.value || 0
      );


    if (
      hour === 24
    ) {
      hour = 0;
    }


    const minute =
      parts.find(
        (part) =>
          part.type ===
          "minute"
      )?.value ||
      "00";


    const second =
      parts.find(
        (part) =>
          part.type ===
          "second"
      )?.value ||
      "00";


    return `${String(
      hour
    ).padStart(
      2,
      "0"
    )}:${String(
      minute
    ).padStart(
      2,
      "0"
    )}:${String(
      second
    ).padStart(
      2,
      "0"
    )}`;

  } catch {

    return "00:00:00";

  }
};



/* =========================================================
   TIMEZONE ABBREVIATION
   Always return a short display label such as IST,
   never the raw IANA timezone name.
========================================================= */

const getTimezoneAbbreviation = (timezone) => {
  const tz = String(timezone || "Asia/Kolkata").trim();

  const aliases = {
    "Asia/Kolkata": "IST",
    "Asia/Calcutta": "IST",
    "Asia/Colombo": "IST",
  };

  if (aliases[tz]) {
    return aliases[tz];
  }

  try {
    const value = new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      timeZoneName: "short",
    })
      .formatToParts(new Date())
      .find((part) => part.type === "timeZoneName")?.value;

    return value || "IST";
  } catch {
    return "IST";
  }
};


/* =========================================================
   TODAY
========================================================= */

const getTodayName = (
  timezone
) => {

  try {

    return new Intl.DateTimeFormat(
      "en-US",
      {
        timeZone:
          timezone ||
          "Asia/Kolkata",

        weekday:
          "long",
      }
    ).format(
      new Date()
    );

  } catch {

    return new Date()
      .toLocaleDateString(
        "en-US",
        {
          weekday:
            "long",
        }
      );

  }
};


/* =========================================================
   LIVE STATUS
========================================================= */

const getLiveStatus = (
  session,
  viewerTimezone
) => {

  if (!session) {
    return "SCHEDULED";
  }


  const startTime =
    session.start_time ||
    session.startTime ||
    session.local_start_time;


  const endTime =
    session.end_time ||
    session.endTime;


  const days =
    normalizeDays(
      session.days ||
        session.available_days ||
        session.availableDays
    );


  if (
    !startTime ||
    !endTime ||
    !days.length
  ) {
    return "SCHEDULED";
  }


  const today =
    getTodayName(
      viewerTimezone
    );


  const isToday =
    days.some(
      (day) =>
        String(day)
          .toLowerCase() ===
        String(today)
          .toLowerCase()
    );


  if (!isToday) {
    return "SCHEDULED";
  }


  const sessionTimezone =
    session.class_timezone ||
    session.class_session_timezone ||
    session.session_timezone ||
    session.timezone ||
    viewerTimezone ||
    "Asia/Kolkata";


  const current =
    getNowInTimezone(
      sessionTimezone
    );


  const normalizedStart =
    String(
      startTime
    ).substring(
      0,
      8
    );


  const normalizedEnd =
    String(
      endTime
    ).substring(
      0,
      8
    );


  if (
    current >=
      normalizedStart &&
    current <=
      normalizedEnd
  ) {
    return "LIVE";
  }


  if (
    current >
    normalizedEnd
  ) {
    return "COMPLETED";
  }


  return "UPCOMING";
};


/* =========================================================
   STATUS CONFIG
========================================================= */

const STATUS_CONFIG = {
  LIVE: {
    title: "Live Now",
  },

  UPCOMING: {
    title: "Starting Soon",
  },

  SCHEDULED: {
    title: "Scheduled",
  },

  COMPLETED: {
    title: "Completed",
  },
};


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

    content:
      outletContent = {},

    sections:
      outletSections = {},

    banners:
      outletBanners = [],
  } = outletContext;


  /* =======================================================
     BRANDING
  ======================================================= */

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
     CONTENT
  ======================================================= */

  const content =
    useMemo(
      () =>
        normalizeContent(
          outletContent
        ),
      [
        outletContent,
      ]
    );


  /* =======================================================
     SECTIONS
  ======================================================= */

  const sections =
    useMemo(
      () =>
        normalizeSections(
          outletSections
        ),
      [
        outletSections,
      ]
    );


  /* =======================================================
     SESSION VISIBILITY
  ======================================================= */

  const sessionsVisible =
    sections
      ?.sessions
      ?.visible !== false;


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
     BANNERS
  ======================================================= */

  const banners =
    useMemo(() => {

      if (
        Array.isArray(
          outletBanners
        )
      ) {
        return outletBanners;
      }


      if (
        Array.isArray(
          website?.banners
        )
      ) {
        return website.banners;
      }


      return [];

    }, [
      outletBanners,
      website,
    ]);


  /* =======================================================
     TIMEZONE
  ======================================================= */

  const [
    timezone,
    setTimezone,
  ] = useState(
    "Asia/Kolkata"
  );


  const [
    timezoneLabel,
    setTimezoneLabel,
  ] = useState(
    "Asia/Kolkata"
  );


  const [
    timezoneAbbr,
    setTimezoneAbbr,
  ] = useState(
    "IST"
  );


  const [
    currentTime,
    setCurrentTime,
  ] = useState(
    ""
  );


  /* =======================================================
     GET USER TIMEZONE
  ======================================================= */

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

        setTimezoneLabel(
          tz
        );

        const shortTimezone =
          tz === "Asia/Kolkata" ||
          tz === "Asia/Calcutta"
            ? "IST"
            : new Intl.DateTimeFormat("en-US", {
                timeZone: tz,
                timeZoneName: "short",
              })
                .formatToParts(new Date())
                .find(
                  (part) => part.type === "timeZoneName"
                )?.value || "IST";

        setTimezoneAbbr(
          shortTimezone
        );

        return;
      }


      setTimezone(
        tz.timezone ||
          "Asia/Kolkata"
      );


      setTimezoneLabel(
        tz.label ||
          tz.timezone ||
          "Asia/Kolkata"
      );


      const objectTimezone =
        tz.timezone ||
        "Asia/Kolkata";

      const objectAbbr =
        tz.abbr ||
        (
          objectTimezone === "Asia/Kolkata" ||
          objectTimezone === "Asia/Calcutta"
            ? "IST"
            : new Intl.DateTimeFormat("en-US", {
                timeZone: objectTimezone,
                timeZoneName: "short",
              })
                .formatToParts(new Date())
                .find(
                  (part) => part.type === "timeZoneName"
                )?.value || "IST"
        );

      setTimezoneAbbr(
        objectAbbr
      );

    } catch (
      error
    ) {

      console.error(
        "Timezone error:",
        error
      );

    }

  }, []);


  /* =======================================================
     LIVE CLOCK
  ======================================================= */

  useEffect(() => {

    const updateClock =
      () => {

        setCurrentTime(
          getNowInTimezone(
            timezone
          )
        );

      };


    updateClock();


    const timer =
      setInterval(
        updateClock,
        1000
      );


    return () =>
      clearInterval(
        timer
      );

  }, [
    timezone,
  ]);


  /* =======================================================
     STATUS GROUPS
  ======================================================= */

  const liveSessions =
    useMemo(
      () =>
        sessions.filter(
          (
            session
          ) =>
            getLiveStatus(
              session,
              timezone
            ) ===
            "LIVE"
        ),
      [
        sessions,
        timezone,
        currentTime,
      ]
    );


  const upcomingSessions =
    useMemo(
      () =>
        sessions.filter(
          (
            session
          ) =>
            getLiveStatus(
              session,
              timezone
            ) ===
            "UPCOMING"
        ),
      [
        sessions,
        timezone,
        currentTime,
      ]
    );


  const scheduledSessions =
    useMemo(
      () =>
        sessions.filter(
          (
            session
          ) =>
            getLiveStatus(
              session,
              timezone
            ) ===
            "SCHEDULED"
        ),
      [
        sessions,
        timezone,
        currentTime,
      ]
    );


  const completedSessions =
    useMemo(
      () =>
        sessions.filter(
          (
            session
          ) =>
            getLiveStatus(
              session,
              timezone
            ) ===
            "COMPLETED"
        ),
      [
        sessions,
        timezone,
        currentTime,
      ]
    );


  /* =======================================================
     BACK
  ======================================================= */

  const goBack = () => {

    navigate(
      "/institute/website/preview"
    );

  };


  /* =======================================================
     SECTION HIDDEN
  ======================================================= */

  if (
    !sessionsVisible
  ) {

    return null;

  }


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


  /* =======================================================
     EMPTY STATE
  ======================================================= */

  if (
    sessions.length === 0
  ) {

    return (
      <div
        className="
          min-h-screen
        "
        style={{
          backgroundColor:
            branding.pageBackgroundColor,

          fontFamily:
            fontFamily(
              branding.fontBody
            ),
        }}
      >

        <SessionsHero
          branding={
            branding
          }
          content={
            content
          }
          onBack={
            goBack
          }
          banners={
            banners
          }
          empty
        />


        <div
          className="
            mx-auto
            max-w-7xl
            px-5
            py-24
            text-center
            sm:px-6
            lg:px-8
          "
        >

          <div
            className="
              mx-auto
              flex
              h-20
              w-20
              items-center
              justify-center
              rounded-full
            "
            style={{
              backgroundColor:
                hexToRgba(
                  branding.buttonColor,
                  0.10
                ),

              color:
                branding.buttonColor,
            }}
          >

            <HiCalendar
              size={38}
            />

          </div>


          <h2
            className="
              mt-6
              text-2xl
            "
            style={
              headingStyle
            }
          >
            No Sessions Available
          </h2>


          <p
            className="
              mx-auto
              mt-2
              max-w-md
            "
            style={{
              ...bodyStyle,
              opacity: 0.60,
            }}
          >
            There are currently
            no active sessions
            available for this
            institute.
          </p>


          <button
            type="button"
            onClick={() =>
              navigate(
                "/institute/website/preview/classes"
              )
            }
            className="
              mt-7
              inline-flex
              items-center
              gap-2
              px-6
              py-3
              transition
              hover:opacity-90
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
                branding.subheadingWeight,
            }}
          >

            Browse Classes

            <HiArrowRight />

          </button>

        </div>

      </div>
    );
  }


  /* =======================================================
     MAIN PAGE
  ======================================================= */

  return (
    <div
      className="
        min-h-screen
      "
      style={{
        backgroundColor:
          branding.pageBackgroundColor,

        color:
          branding.textColor,

        fontFamily:
          fontFamily(
            branding.fontBody
          ),
      }}
    >

      {/* =================================================
          HERO
      ================================================= */}

      <SessionsHero
        branding={
          branding
        }
        content={
          content
        }
        onBack={
          goBack
        }
        timezoneLabel={
          timezoneLabel
        }
        timezoneAbbr={
          timezoneAbbr
        }
        banners={
          banners
        }
      />


      {/* =================================================
          CONTENT
      ================================================= */}

      <main
        className="
          mx-auto
          max-w-7xl
          px-5
          py-12
          sm:px-6
          lg:px-8
        "
      >

        {/* ===============================================
            STATS
        =============================================== */}

        <div
          className="
            mb-12
            grid
            grid-cols-2
            gap-4
            md:grid-cols-4
          "
        >

          <StatCard
            label="Total Sessions"
            value={
              sessions.length
            }
            branding={
              branding
            }
          />


          <StatCard
            label="Live Now"
            value={
              liveSessions.length
            }
            branding={
              branding
            }
            accent={
              branding.iconColor
            }
          />


          <StatCard
            label="Starting Soon"
            value={
              upcomingSessions.length
            }
            branding={
              branding
            }
            accent={
              branding.buttonColor
            }
          />


          <StatCard
            label="Scheduled"
            value={
              scheduledSessions.length
            }
            branding={
              branding
            }
            accent={
              branding.subheadingColor
            }
          />

        </div>


        {/* ===============================================
            LIVE
        =============================================== */}

        {liveSessions.length >
          0 && (

          <SessionSection
            title="Live Now"
            subtitle="Sessions currently in progress."
            sessions={
              liveSessions
            }
            timezone={
              timezone
            }
            timezoneAbbr={
              timezoneAbbr
            }
            branding={
              branding
            }
            status="LIVE"
          />

        )}


        {/* ===============================================
            UPCOMING
        =============================================== */}

        {upcomingSessions.length >
          0 && (

          <SessionSection
            title="Starting Soon"
            subtitle="Sessions scheduled for today."
            sessions={
              upcomingSessions
            }
            timezone={
              timezone
            }
            timezoneAbbr={
              timezoneAbbr
            }
            branding={
              branding
            }
            status="UPCOMING"
          />

        )}


        {/* ===============================================
            SCHEDULED
        =============================================== */}

        {scheduledSessions.length >
          0 && (

          <SessionSection
            title=""
            subtitle=""
            sessions={
              scheduledSessions
            }
            timezone={
              timezone
            }
            timezoneAbbr={
              timezoneAbbr
            }
            branding={
              branding
            }
            status="SCHEDULED"
          />

        )}


        {/* ===============================================
            COMPLETED
        =============================================== */}

        {completedSessions.length >
          0 && (

          <SessionSection
            title="Completed"
            subtitle="Sessions that have already finished today."
            sessions={
              completedSessions
            }
            timezone={
              timezone
            }
            timezoneAbbr={
              timezoneAbbr
            }
            branding={
              branding
            }
            status="COMPLETED"
          />

        )}

      </main>

    </div>
  );
}


/* =========================================================
   HERO
========================================================= */

const SessionsHero = ({
  branding,
  content,
  onBack,
  timezoneLabel,
  timezoneAbbr,
  banners = [],
  empty = false,
}) => {

  const sessionBanner =
    useMemo(() => {

      if (
        !Array.isArray(
          banners
        ) ||
        banners.length === 0
      ) {
        return null;
      }


      const specificBanner =
        banners.find(
          (
            banner
          ) => {

            const type =
              String(
                banner?.banner_type ||
                banner?.bannerType ||
                banner?.page ||
                banner?.page_name ||
                ""
              )
                .trim()
                .toLowerCase();


            return (
              type ===
                "session" ||
              type ===
                "sessions"
            );

          }
        );


      if (
        specificBanner
      ) {
        return specificBanner;
      }


      const activeBanner =
        banners.find(
          (
            banner
          ) =>
            banner?.is_active ===
              1 ||
            banner?.is_active ===
              true ||
            banner?.isActive ===
              true
        );


      if (
        activeBanner
      ) {
        return activeBanner;
      }


      return (
        banners[0] ||
        null
      );

    }, [
      banners,
    ]);


  const bannerImage =
    sessionBanner?.image_url ||
    sessionBanner?.imageUrl ||
    sessionBanner?.image ||
    sessionBanner?.banner_image ||
    sessionBanner?.bannerImage ||
    sessionBanner?.file_url ||
    sessionBanner?.fileUrl ||
    null;


  const bannerStyle =
    bannerImage
      ? {
          backgroundImage:
            `url("${bannerImage}")`,

          backgroundSize:
            "cover",

          backgroundPosition:
            "center",

          backgroundRepeat:
            "no-repeat",

          backgroundColor:
            "#E5E7EB",
        }
      : {
          background:
            `linear-gradient(
            135deg,
            ${branding.buttonColor},
            ${branding.subheadingColor}
          )`,
        };


  return (
    <section
      style={{
        backgroundColor:
          branding.pageBackgroundColor,
      }}
    >

      {/* =================================================
          BANNER IMAGE
      ================================================= */}

      <div
        className="
          w-full
          overflow-hidden
        "
        style={
          bannerStyle
        }
      >

        <div
          className="
            min-h-[430px]
            w-full
            sm:min-h-[430px]
            lg:min-h-[430px]
          "
        />

      </div>


      {/* =================================================
          CONTENT BELOW IMAGE
      ================================================= */}

      <div
        className="
          mx-auto
          max-w-7xl
          px-5
          py-10
          sm:px-6
          lg:px-8
        "
      >

        {/* BACK */}


        {/* PAGE CONTENT */}

        <div
          className="
            flex
            flex-col
            justify-between
            gap-6
            lg:flex-row
            lg:items-end
          "
        >

          <div>

            {/* EYEBROW */}

            {content
              ?.sessions
              ?.eyebrow && (
              <p
                className="
                  text-sm
                  uppercase
                  tracking-widest
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
                {
                  content
                    .sessions
                    .eyebrow
                }
              </p>
            )}


            {/* HEADING */}

            <h1
              className="
                mt-2
                text-4xl
                sm:text-5xl
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
              {
                content
                  .sessions
                  .heading
              }
            </h1>


            {/* SUBHEADING */}

            {content
              ?.sessions
              ?.subheading && (
              <p
                className="
                  mt-4
                  max-w-2xl
                  text-base
                "
                style={{
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

                  opacity: 0.70,
                }}
              >
                {
                  content
                    .sessions
                    .subheading
                }
              </p>
            )}

          </div>



        </div>

      </div>

    </section>
  );
};


/* =========================================================
   STAT CARD
========================================================= */

const StatCard = ({
  label,
  value,
  branding,
  accent,
}) => {

  return (
    <div
      className="
        p-5
        shadow-sm
        transition
        hover:-translate-y-0.5
      "
      style={{
        backgroundColor:
          branding.cardBackgroundColor,

        border:
          `1px solid ${hexToRgba(
            branding.textColor,
            0.10
          )}`,

        borderRadius:
          "16px",
      }}
    >

      <p
        className="
          text-sm
        "
        style={{
          color:
            accent ||
            branding.subheadingColor,

          fontFamily:
            fontFamily(
              branding.fontSubheading
            ),

          fontWeight:
            branding.subheadingWeight,
        }}
      >
        {label}
      </p>


      <p
        className="
          mt-2
          text-3xl
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
        }}
      >
        {value}
      </p>

    </div>
  );
};


/* =========================================================
   SESSION SECTION
========================================================= */

const SessionSection = ({
  title,
  subtitle,
  sessions,
  timezone,
  timezoneAbbr,
  branding,
  status,
}) => {

  const statusColor =
    status ===
    "LIVE"
      ? branding.iconColor
      : status ===
          "UPCOMING"
        ? branding.buttonColor
        : status ===
            "COMPLETED"
          ? branding.textColor
          : branding.subheadingColor;


  return (
    <section
      className="
        mb-12
      "
    >

      {/* SECTION HEADER */}

      {(title || subtitle) && (
      <div
        className="
          mb-6
          flex
          items-start
          gap-3
        "
      >

        <div
          className="
            mt-2
            h-3
            w-3
            flex-shrink-0
            rounded-full
          "
          style={{
            backgroundColor:
              statusColor,

            boxShadow:
              status ===
              "LIVE"
                ? `0 0 0 5px ${hexToRgba(
                    statusColor,
                    0.10
                  )}`
                : "none",
          }}
        />


        <div>

          <h2
            className="
              text-2xl
            "
            style={{
              color:
                statusColor,

              fontFamily:
                fontFamily(
                  branding.fontHeading
                ),

              fontWeight:
                branding.headingWeight,

              lineHeight:
                branding.headingLineHeight,
            }}
          >
            {title}
          </h2>


          <p
            className="
              mt-1
              text-sm
            "
            style={{
              color:
                branding.textColor,

              fontFamily:
                fontFamily(
                  branding.fontBody
                ),

              opacity: 0.55,
            }}
          >
            {subtitle}
          </p>

        </div>

      </div>


      )}

      {/* CARDS */}

      <div
        className="
          grid
          gap-6
          lg:grid-cols-2
        "
      >

        {sessions.map(
          (
            session,
            index
          ) => (

            <SessionCard
              key={
                session?.session_id ||
                session?.id ||
                session?.booking_id ||
                index
              }
              session={
                session
              }
              viewerTimezone={
                timezone
              }
              viewerAbbr={
                timezoneAbbr
              }
              branding={
                branding
              }
            />

          )
        )}

      </div>

    </section>
  );
};


/* =========================================================
   SESSION CARD
========================================================= */

const SessionCard = ({
  session,
  viewerTimezone,
  viewerAbbr,
  branding,
}) => {

  const status =
    getLiveStatus(
      session,
      viewerTimezone
    );


  const config =
    STATUS_CONFIG[
      status
    ] ||
    STATUS_CONFIG.SCHEDULED;


  const classTitle =
    session?.class_title ||
    session?.class_name ||
    session?.class?.title ||
    session?.title ||
    "Class";


  const sessionTitle =
    session?.session_title ||
    session?.session_name ||
    session?.title ||
    "Class Session";


  const trainerName =
    session?.trainer_name ||
    session?.trainer?.name ||
    session?.trainer?.full_name ||
    "Not Assigned";


  const days =
    normalizeDays(
      session?.days ||
        session?.available_days ||
        session?.availableDays
    );


  const startTime =
    session?.local_start_time ||
    session?.start_time ||
    session?.startTime;


  const endTime =
    session?.end_time ||
    session?.endTime;


  const sessionTimezone =
    session?.class_timezone ||
    session?.class_session_timezone ||
    session?.session_timezone ||
    session?.timezone ||
    viewerTimezone;


  const date =
    session?.session_date ||
    session?.date ||
    session?.start_date;


  const zoomUrl =
    session?.zoom?.join_url ||
    session?.zoom?.joinUrl ||
    session?.zoom_link ||
    session?.zoomLink ||
    session?.meeting_url ||
    session?.meetingUrl ||
    null;


  const canJoin =
    session?.can_join ===
      true ||
    session?.canJoin ===
      true;


  const image =
    session?.trainer_image ||
    session?.trainer_profile_image ||
    session?.trainer?.profile_image ||
    session?.trainer?.image ||
    null;


  const statusColor =
    status ===
    "LIVE"
      ? branding.iconColor
      : status ===
          "UPCOMING"
        ? branding.buttonColor
        : status ===
            "COMPLETED"
          ? branding.textColor
          : branding.subheadingColor;


  const statusBackground =
    hexToRgba(
      statusColor,
      0.08
    );


  const statusBorder =
    hexToRgba(
      statusColor,
      0.20
    );


  return (
    <article
      className="
        overflow-hidden
        p-6
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-lg
      "
      style={{
        backgroundColor:
          branding.cardBackgroundColor,

        border:
          `1px solid ${hexToRgba(
            branding.textColor,
            0.10
          )}`,

        borderRadius:
          "18px",

        boxShadow:
          status ===
          "LIVE"
            ? `0 0 0 2px ${hexToRgba(
                branding.iconColor,
                0.12
              )}`
            : undefined,
      }}
    >

      {/* HEADER */}

      <div
        className="
          mb-6
          flex
          items-start
          justify-between
          gap-4
        "
      >

        <div
          className="
            min-w-0
          "
        >

          <h3
            className="
              truncate
              text-xl
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
            }}
          >
            {classTitle}
          </h3>


          <p
            className="
              mt-1
              truncate
              text-sm
              uppercase
              tracking-wide
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
            {sessionTitle}
          </p>

        </div>


        <span
          className="
            flex
            shrink-0
            items-center
            gap-1.5
            px-3
            py-1.5
            text-xs
          "
          style={{
            color:
              statusColor,

            backgroundColor:
              statusBackground,

            border:
              `1px solid ${statusBorder}`,

            borderRadius:
              getButtonRadius(
                branding
              ),

            fontFamily:
              fontFamily(
                branding.fontBody
              ),

            fontWeight:
              branding.subheadingWeight,
          }}
        >

          {status ===
            "LIVE" && (
            <span
              className="
                h-2
                w-2
                animate-pulse
                rounded-full
              "
              style={{
                backgroundColor:
                  statusColor,
              }}
            />
          )}

          {config.title}

        </span>

      </div>


      {/* TIME / DAYS */}

      <div
        className="
          mb-5
          grid
          gap-4
          md:grid-cols-2
        "
      >

        <InfoBox
          branding={
            branding
          }
          icon={
            <HiClock
              size={18}
            />
          }
          label="Time"
        >

          <p
            className="
              mt-2
              text-lg
            "
            style={{
              color:
                branding.headingColor,

              fontFamily:
                fontFamily(
                  branding.fontHeading
                ),

              fontWeight:
                branding.subheadingWeight,
            }}
          >

            {getTimezoneAbbreviation(
              viewerTimezone
            )}{" "}

            {formatTime(
              startTime
            )}

            {endTime
              ? ` - ${formatTime(
                  endTime
                )}`
              : ""}

          </p>


        </InfoBox>


        <InfoBox
          branding={
            branding
          }
          icon={
            <HiCalendar
              size={18}
            />
          }
          label="Days"
        >

          <p
            className="
              mt-2
              text-lg
            "
            style={{
              color:
                branding.headingColor,

              fontFamily:
                fontFamily(
                  branding.fontHeading
                ),

              fontWeight:
                branding.subheadingWeight,
            }}
          >
            {formatDaysCompact(
              days
            )}
          </p>


          {date && (
            <p
              className="
                mt-1
                text-xs
              "
              style={{
                color:
                  branding.textColor,

                fontFamily:
                  fontFamily(
                    branding.fontBody
                  ),

                opacity: 0.50,
              }}
            >
              {formatDate(
                date
              )}
            </p>
          )}

        </InfoBox>

      </div>


      {/* TODAY */}

      {status !==
        "SCHEDULED" &&
        days.length >
          0 && (

          <div
            className="
              mb-5
              flex
              items-center
              gap-2
              px-4
              py-3
            "
            style={{
              backgroundColor:
                hexToRgba(
                  branding.iconColor,
                  0.08
                ),

              border:
                `1px solid ${hexToRgba(
                  branding.iconColor,
                  0.20
                )}`,

              color:
                branding.iconColor,

              borderRadius:
                "12px",
            }}
          >

            <HiCheckCircle
              size={18}
            />

            <span
              className="
                text-sm
              "
              style={{
                fontFamily:
                  fontFamily(
                    branding.fontBody
                  ),

                fontWeight:
                  branding.subheadingWeight,
              }}
            >
              Today's class
            </span>

          </div>

        )}


      {/* TRAINER */}

      <div
        className="
          mb-6
          p-4
        "
        style={{
          backgroundColor:
            hexToRgba(
              branding.textColor,
              0.025
            ),

          border:
            `1px solid ${hexToRgba(
              branding.textColor,
              0.08
            )}`,

          borderRadius:
            "12px",
        }}
      >

        <div
          className="
            flex
            items-center
            gap-3
          "
        >

          {image ? (

            <img
              src={
                image
              }
              alt={
                trainerName
              }
              className="
                h-11
                w-11
                rounded-full
                object-cover
              "
            />

          ) : (

            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                text-sm
              "
              style={{
                backgroundColor:
                  branding.buttonColor,

                color:
                  branding.buttonTextColor,

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


          <div>

            <div
              className="
                flex
                items-center
                gap-2
              "
              style={{
                color:
                  branding.subheadingColor,
              }}
            >

              <HiShieldCheck
                size={16}
              />

              <span
                className="
                  text-xs
                  uppercase
                  tracking-wide
                "
                style={{
                  fontFamily:
                    fontFamily(
                      branding.fontSubheading
                    ),

                  fontWeight:
                    branding.subheadingWeight,
                }}
              >
                Trainer
              </span>

            </div>


            <p
              className="
                mt-1
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
                  branding.subheadingWeight,
              }}
            >
              {trainerName}
            </p>

          </div>

        </div>

      </div>


      {/* ACTION */}

      {status ===
        "LIVE" ? (

        canJoin &&
        zoomUrl ? (

          <a
            href={
              zoomUrl
            }
            target="_blank"
            rel="noreferrer"
            className="
              flex
              w-full
              items-center
              justify-center
              gap-2
              px-4
              py-3.5
              text-sm
              transition
              hover:opacity-90
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
                branding.subheadingWeight,

              boxShadow:
                `0 8px 20px ${hexToRgba(
                  branding.buttonColor,
                  0.18
                )}`,
            }}
          >

            <HiVideoCamera
              size={19}
            />

            Join Now

            <HiExternalLink
              size={16}
            />

          </a>

        ) : (

          <button
            type="button"
            disabled
            className="
              w-full
              cursor-not-allowed
              px-4
              py-3.5
              text-sm
            "
            style={{
              color:
                branding.iconColor,

              backgroundColor:
                hexToRgba(
                  branding.iconColor,
                  0.08
                ),

              border:
                `1px solid ${hexToRgba(
                  branding.iconColor,
                  0.20
                )}`,

              borderRadius:
                getButtonRadius(
                  branding
                ),

              fontFamily:
                fontFamily(
                  branding.fontBody
                ),

              fontWeight:
                branding.subheadingWeight,
            }}
          >
            {zoomUrl
              ? "Waiting for Trainer Link"
              : "Link Not Available"}
          </button>

        )

      ) : status ===
        "UPCOMING" ? (

        <button
          type="button"
          disabled
          className="
            w-full
            cursor-not-allowed
            px-4
            py-3.5
            text-sm
          "
          style={{
            color:
              branding.buttonColor,

            backgroundColor:
              hexToRgba(
                branding.buttonColor,
                0.08
              ),

            border:
              `1px solid ${hexToRgba(
                branding.buttonColor,
                0.20
              )}`,

            borderRadius:
              getButtonRadius(
                branding
              ),

            fontFamily:
              fontFamily(
                branding.fontBody
              ),

            fontWeight:
              branding.subheadingWeight,
          }}
        >

          <HiClock
            className="
              mr-1
              inline
            "
          />

          Starts at{" "}

          {formatTime(
            startTime
          )}

        </button>

      ) : status ===
        "SCHEDULED" ? (

        <button
          type="button"
          disabled
          className="
            w-full
            cursor-not-allowed
            px-4
            py-3.5
            text-sm
          "
          style={{
            color:
              branding.subheadingColor,

            backgroundColor:
              hexToRgba(
                branding.subheadingColor,
                0.08
              ),

            border:
              `1px solid ${hexToRgba(
                branding.subheadingColor,
                0.20
              )}`,

            borderRadius:
              getButtonRadius(
                branding
              ),

            fontFamily:
              fontFamily(
                branding.fontBody
              ),

            fontWeight:
              branding.subheadingWeight,
          }}
        >

          <HiCalendar
            className="
              mr-1
              inline
            "
          />

          Next class:{" "}

          {days[0] ||
            "TBD"}

        </button>

      ) : (

        <button
          type="button"
          disabled
          className="
            w-full
            cursor-not-allowed
            px-4
            py-3.5
            text-sm
          "
          style={{
            color:
              branding.textColor,

            backgroundColor:
              hexToRgba(
                branding.textColor,
                0.05
              ),

            border:
              `1px solid ${hexToRgba(
                branding.textColor,
                0.12
              )}`,

            borderRadius:
              getButtonRadius(
                branding
              ),

            fontFamily:
              fontFamily(
                branding.fontBody
              ),

            fontWeight:
              branding.subheadingWeight,

            opacity: 0.65,
          }}
        >

          <HiCheckCircle
            className="
              mr-1
              inline
            "
          />

          Session Completed

        </button>

      )}

    </article>
  );
};


/* =========================================================
   INFO BOX
========================================================= */

const InfoBox = ({
  branding,
  icon,
  label,
  children,
}) => {

  return (
    <div
      className="
        p-4
      "
      style={{
        backgroundColor:
          hexToRgba(
            branding.buttonColor,
            0.035
          ),

        border:
          `1px solid ${hexToRgba(
            branding.buttonColor,
            0.10
          )}`,

        borderRadius:
          "12px",
      }}
    >

      <div
        className="
          flex
          items-center
          gap-2
          text-xs
          uppercase
          tracking-wide
        "
        style={{
          color:
            branding.buttonColor,

          fontFamily:
            fontFamily(
              branding.fontSubheading
            ),

          fontWeight:
            branding.subheadingWeight,
        }}
      >

        {icon}

        <span>
          {label}
        </span>

      </div>


      {children}

    </div>
  );
};