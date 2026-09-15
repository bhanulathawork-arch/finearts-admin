// export default WebsiteClasses;



// import { useEffect, useMemo, useState } from "react";
// import {
//   Link,
//   useNavigate,
//   useOutletContext,
// } from "react-router-dom";

// import {
//   FaArrowRight,
//   FaCalendarAlt,
//   FaCalendarWeek,
//   FaChevronDown,
//   FaClock,
//   FaFilter,
//   FaSearch,
//   FaUsers,
//   FaTimes,
// } from "react-icons/fa";

// import WebsiteBooking from "./WebsiteBooking";


// /* =========================================================
//    DEFAULT BRANDING
// ========================================================= */

// const DEFAULT_BRANDING = {
//   navbarColor: "#1F2937",

//   navbarTextColor: "#FFFFFF",

//   navbarButtonColor: "#7C3AED",

//   navbarButtonTextColor: "#FFFFFF",

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

//   footerIconColor: "#FFFFFF",

//   fontHeading: "Inter",

//   fontSubheading: "Inter",

//   fontBody: "Inter",

//   headingWeight: 700,

//   headingLineHeight: 1.15,

//   headingLetterSpacing: "0px",

//   subheadingWeight: 600,

//   subheadingLineHeight: 1.4,

//   bodyWeight: 400,

//   bodyLineHeight: 1.6,

//   bodyLetterSpacing: "0px",

//   roundedButtons: true,
// };


// /* =========================================================
//    BRANDING
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


// const getBranding = (
//   branding = {}
// ) => ({
//   navbarColor:
//     getBrandingValue(
//       branding,
//       "navbarColor",
//       "navbar_color",
//       DEFAULT_BRANDING.navbarColor
//     ),

//   navbarTextColor:
//     getBrandingValue(
//       branding,
//       "navbarTextColor",
//       "navbar_text_color",
//       DEFAULT_BRANDING.navbarTextColor
//     ),

//   navbarButtonColor:
//     getBrandingValue(
//       branding,
//       "navbarButtonColor",
//       "navbar_button_color",
//       DEFAULT_BRANDING.navbarButtonColor
//     ),

//   navbarButtonTextColor:
//     getBrandingValue(
//       branding,
//       "navbarButtonTextColor",
//       "navbar_button_text_color",
//       DEFAULT_BRANDING.navbarButtonTextColor
//     ),

//   headingColor:
//     getBrandingValue(
//       branding,
//       "headingColor",
//       "heading_color",
//       DEFAULT_BRANDING.headingColor
//     ),

//   subheadingColor:
//     getBrandingValue(
//       branding,
//       "subheadingColor",
//       "subheading_color",
//       DEFAULT_BRANDING.subheadingColor
//     ),

//   textColor:
//     getBrandingValue(
//       branding,
//       "textColor",
//       "text_color",
//       DEFAULT_BRANDING.textColor
//     ),

//   iconColor:
//     getBrandingValue(
//       branding,
//       "iconColor",
//       "icon_color",
//       DEFAULT_BRANDING.iconColor
//     ),

//   buttonColor:
//     getBrandingValue(
//       branding,
//       "buttonColor",
//       "button_color",
//       DEFAULT_BRANDING.buttonColor
//     ),

//   buttonTextColor:
//     getBrandingValue(
//       branding,
//       "buttonTextColor",
//       "button_text_color",
//       DEFAULT_BRANDING.buttonTextColor
//     ),

//   pageBackgroundColor:
//     getBrandingValue(
//       branding,
//       "pageBackgroundColor",
//       "page_background_color",
//       DEFAULT_BRANDING.pageBackgroundColor
//     ),

//   cardBackgroundColor:
//     getBrandingValue(
//       branding,
//       "cardBackgroundColor",
//       "card_background_color",
//       DEFAULT_BRANDING.cardBackgroundColor
//     ),

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

//   footerIconColor:
//     getBrandingValue(
//       branding,
//       "footerIconColor",
//       "footer_icon_color",
//       DEFAULT_BRANDING.footerIconColor
//     ),

//   fontHeading:
//     getBrandingValue(
//       branding,
//       "fontHeading",
//       "font_heading",
//       DEFAULT_BRANDING.fontHeading
//     ),

//   fontSubheading:
//     getBrandingValue(
//       branding,
//       "fontSubheading",
//       "font_subheading",
//       DEFAULT_BRANDING.fontSubheading
//     ),

//   fontBody:
//     getBrandingValue(
//       branding,
//       "fontBody",
//       "font_body",
//       DEFAULT_BRANDING.fontBody
//     ),

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
//    HELPERS
// ========================================================= */

// const fontFamily = (font) =>
//   font
//     ? `'${font}', sans-serif`
//     : "Inter, sans-serif";


// const buttonRadius = (
//   branding
// ) =>
//   branding.roundedButtons
//     ? "999px"
//     : "6px";


// const withOpacity = (
//   color,
//   opacity = "12"
// ) => {
//   if (
//     typeof color === "string" &&
//     /^#[0-9a-fA-F]{6}$/.test(
//       color
//     )
//   ) {
//     return `${color}${opacity}`;
//   }

//   return color;
// };


// const getValue = (
//   ...values
// ) =>
//   values.find(
//     (value) =>
//       value !== undefined &&
//       value !== null &&
//       String(value).trim() !== ""
//   );


// const getArray = (
//   ...values
// ) =>
//   values.find(
//     (value) =>
//       Array.isArray(value)
//   ) || [];


// const isEnabled = (
//   value,
//   defaultValue = true
// ) => {
//   if (
//     value === undefined ||
//     value === null
//   ) {
//     return defaultValue;
//   }

//   if (
//     value === true ||
//     value === 1 ||
//     value === "1" ||
//     value === "true" ||
//     value === "TRUE"
//   ) {
//     return true;
//   }

//   if (
//     value === false ||
//     value === 0 ||
//     value === "0" ||
//     value === "false" ||
//     value === "FALSE"
//   ) {
//     return false;
//   }

//   return defaultValue;
// };


// /* =========================================================
//    SECTION FINDER
// ========================================================= */

// const findSection = (
//   sections,
//   ...keys
// ) => {
//   if (
//     !Array.isArray(sections)
//   ) {
//     return null;
//   }

//   const normalizedKeys =
//     keys.map((key) =>
//       String(key)
//         .trim()
//         .toLowerCase()
//         .replace(
//           /[\s-]+/g,
//           "_"
//         )
//     );

//   return (
//     sections.find(
//       (section) => {
//         const candidates = [
//           section?.section_key,
//           section?.sectionKey,
//           section?.section_name,
//           section?.sectionName,
//           section?.key,
//           section?.name,
//           section?.slug,
//           section?.page_section,
//           section?.pageSection,
//         ];

//         return candidates.some(
//           (candidate) => {
//             if (
//               candidate ===
//                 undefined ||
//               candidate === null
//             ) {
//               return false;
//             }

//             const normalized =
//               String(candidate)
//                 .trim()
//                 .toLowerCase()
//                 .replace(
//                   /[\s-]+/g,
//                   "_"
//                 );

//             return normalizedKeys.includes(
//               normalized
//             );
//           }
//         );
//       }
//     ) || null
//   );
// };


// /* =========================================================
//    CONTENT FINDER
// ========================================================= */

// const findContent = (
//   content,
//   keys
// ) => {
//   if (
//     !content ||
//     typeof content !== "object"
//   ) {
//     return "";
//   }

//   for (const key of keys) {
//     const value =
//       content?.[key];

//     if (
//       value !== undefined &&
//       value !== null &&
//       String(value).trim() !== ""
//     ) {
//       return value;
//     }
//   }

//   return "";
// };


// /* =========================================================
//    GET CLASS HELPERS
// ========================================================= */

// const getClassId = (item) =>
//   item?.id ||
//   item?.class_id;


// const getClassTitle = (item) =>
//   item?.title ||
//   item?.class_title ||
//   item?.name ||
//   "Class";


// const getClassImage = (item) =>
//   item?.image ||
//   item?.class_image ||
//   item?.image_url ||
//   item?.thumbnail ||
//   item?.thumbnail_url ||
//   "";


// const getInstituteName = (item) =>
//   item?.institute_name ||
//   item?.institute?.name ||
//   item?.instituteName ||
//   "Institute";


// const getSubcategoryName = (
//   item
// ) =>
//   item?.subcategory_name ||
//   item?.subcategory?.name ||
//   item?.subcategoryName ||
//   "General";


// const getTrainerName = (
//   item
// ) =>
//   item?.trainer_name ||
//   item?.trainerName ||
//   item?.trainer?.name ||
//   "Expert Trainer";


// const getTrainerImage = (
//   item
// ) =>
//   item?.trainer_image ||
//   item?.trainerImage ||
//   item?.trainer?.image ||
//   "";


// const getLevel = (item) =>
//   item?.level ||
//   item?.class_level ||
//   item?.difficulty ||
//   "All Levels";


// const getDuration = (item) =>
//   item?.duration ||
//   item?.class_duration ||
//   item?.duration_minutes ||
//   "--";


// const getStudents = (item) =>
//   item?.students ??
//   item?.students_count ??
//   item?.studentsCount ??
//   0;


// const getAvailableDays = (
//   item
// ) => {
//   if (
//     Array.isArray(
//       item?.available_days
//     )
//   ) {
//     return item.available_days;
//   }

//   if (
//     Array.isArray(
//       item?.days
//     )
//   ) {
//     return item.days;
//   }

//   if (
//     Array.isArray(
//       item?.schedule_days
//     )
//   ) {
//     return item.schedule_days;
//   }

//   return [];
// };


// /* =========================================================
//    DATE
// ========================================================= */

// const formatDate = (
//   dateValue
// ) => {
//   if (!dateValue) {
//     return "--";
//   }

//   const date =
//     new Date(dateValue);

//   if (
//     Number.isNaN(
//       date.getTime()
//     )
//   ) {
//     return String(
//       dateValue
//     );
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


// /* =========================================================
//    TIME
// ========================================================= */

// const formatTime = (
//   timeValue
// ) => {
//   if (!timeValue) {
//     return "--";
//   }

//   const value =
//     String(timeValue);

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

//   const hours =
//     Number(parts[0]);

//   const minutes =
//     Number(parts[1]);

//   if (
//     Number.isNaN(hours) ||
//     Number.isNaN(minutes)
//   ) {
//     return value;
//   }

//   const period =
//     hours >= 12
//       ? "PM"
//       : "AM";

//   const hour12 =
//     hours % 12 || 12;

//   return `${hour12}:${String(
//     minutes
//   ).padStart(2, "0")} ${period}`;
// };


// /* =========================================================
//    TIMEZONE
// ========================================================= */

// const formatTimeWithTimezone = (
//   date,
//   time,
//   timezone
// ) => {
//   if (
//     !date ||
//     !time
//   ) {
//     return "--";
//   }

//   try {
//     const dateTime =
//       new Date(
//         `${date}T${time}`
//       );

//     if (
//       Number.isNaN(
//         dateTime.getTime()
//       )
//     ) {
//       return `${formatTime(
//         time
//       )} ${timezone || ""}`;
//     }

//     const formatted =
//       dateTime.toLocaleTimeString(
//         "en-IN",
//         {
//           hour: "numeric",
//           minute: "2-digit",
//           hour12: true,
//           timeZone:
//             timezone ||
//             "Asia/Kolkata",
//           timeZoneName:
//             "short",
//         }
//       );

//     const match =
//       formatted.match(
//         /^(\d{1,2}:\d{2})\s*(AM|PM)\s*(.+)$/i
//       );

//     if (match) {
//       const [
//         ,
//         timePart,
//         period,
//         zone,
//       ] = match;

//       return `${zone} ${timePart} ${period.toUpperCase()}`;
//     }

//     return formatted;
//   } catch {
//     return `${formatTime(
//       time
//     )} ${timezone || ""}`;
//   }
// };


// /* =========================================================
//    BUTTON
// ========================================================= */

// const Button = ({
//   children,
//   variant = "solid",
//   size = "md",
//   icon: Icon,
//   iconPosition = "left",
//   className = "",
//   type = "button",
//   branding,
//   ...props
// }) => {
//   const sizes = {
//     sm: "px-4 py-2 text-sm",
//     md: "px-5 py-3 text-sm",
//     lg: "px-6 py-3.5 text-base",
//   };

//   const styles = {
//     solid: {
//       backgroundColor:
//         branding.buttonColor,

//       color:
//         branding.buttonTextColor,

//       borderColor:
//         branding.buttonColor,
//     },

//     outline: {
//       backgroundColor:
//         branding.cardBackgroundColor,

//       color:
//         branding.buttonColor,

//       borderColor:
//         branding.buttonColor,
//     },

//     white: {
//       backgroundColor:
//         branding.cardBackgroundColor,

//       color:
//         branding.buttonColor,

//       borderColor:
//         branding.cardBackgroundColor,
//     },
//   };

//   const style =
//     styles[variant] ||
//     styles.solid;

//   return (
//     <button
//       type={type}
//       className={[
//         "inline-flex items-center justify-center gap-2 border font-semibold transition-all duration-200 active:scale-[0.98]",
//         sizes[size] ||
//           sizes.md,
//         className,
//       ].join(" ")}
//       style={{
//         ...style,

//         borderRadius:
//           buttonRadius(
//             branding
//           ),

//         fontFamily:
//           fontFamily(
//             branding.fontBody
//           ),

//         fontWeight:
//           branding.bodyWeight,
//       }}
//       {...props}
//     >
//       {Icon &&
//         iconPosition ===
//           "left" && (
//           <Icon size={14} />
//         )}

//       <span>
//         {children}
//       </span>

//       {Icon &&
//         iconPosition ===
//           "right" && (
//           <Icon size={14} />
//         )}
//     </button>
//   );
// };


// /* =========================================================
//    STAR RATING
// ========================================================= */

// const StarRating = ({
//   rating = 0,
//   showValue = false,
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

//       <div className="text-xs tracking-[1px]">

//         {[1, 2, 3, 4, 5].map(
//           (star) => (
//             <span
//               key={star}
//               style={{
//                 color:
//                   star <=
//                   Math.round(value)
//                     ? branding.iconColor
//                     : withOpacity(
//                         branding.textColor,
//                         "35"
//                       ),
//               }}
//             >
//               ★
//             </span>
//           )
//         )}

//       </div>


//       {showValue && (
//         <span
//           className="text-xs"
//           style={{
//             color:
//               branding.textColor,

//             fontFamily:
//               fontFamily(
//                 branding.fontBody
//               ),

//             fontWeight:
//               branding.bodyWeight,
//           }}
//         >
//           {value.toFixed(1)}
//         </span>
//       )}

//     </div>
//   );
// };

// /* =========================================================
//    CLASS CARD
// ========================================================= */

// const ClassCard = ({
//   item,
//   onBook,
//   branding,
// }) => {
//   const navigate = useNavigate();

//   /* =======================================================
//      DATA
//   ======================================================= */

//   const classId = getClassId(item);

//   const image =
//     getClassImage(item) ||
//     "https://via.placeholder.com/500x300";

//   const title =
//     getClassTitle(item) || "Class";

//   const instituteName =
//     getInstituteName(item) || "Institute";

//   const subcategory =
//     getSubcategoryName(item) || "GENERAL";

//   const trainerName =
//     getTrainerName(item) || "Expert Trainer";

//   const trainerImage =
//     getTrainerImage(item) ||
//     "https://via.placeholder.com/100";

//   const level =
//     getLevel(item) || "BEGINNER";

//   const duration =
//     getDuration(item) || "--";

//   const rating =
//     Number(item?.rating || 0);

//   const availableDays =
//     getAvailableDays(item);

//   const startDate =
//     item?.start_date ||
//     item?.startDate;

//   const startTime =
//     item?.start_time ||
//     item?.startTime;

//   const timezone =
//     item?.timezone ||
//     item?.class_timezone ||
//     "Asia/Kolkata";

//   const price =
//     Number(item?.price || 0);

//   const students =
//     getStudents(item);


//   /* =======================================================
//      DETAILS
//   ======================================================= */

//   const handleDetails = () => {
//     if (!classId) {
//       console.error(
//         "Class ID missing:",
//         item
//       );
//       return;
//     }

//     navigate(
//       `/institute/website/preview/classes/${classId}`
//     );
//   };


//   /* =======================================================
//      BOOK
//   ======================================================= */

//   const handleBook = (event) => {
//     event.preventDefault();
//     event.stopPropagation();

//     if (!classId) {
//       console.error(
//         "Cannot book class. Class ID missing:",
//         item
//       );
//       return;
//     }

//     if (typeof onBook === "function") {
//       onBook(item);
//     }
//   };


//   /* =======================================================
//      FORMAT TIME
//   ======================================================= */

//   const formattedTime =
//     startDate && startTime
//       ? formatTimeWithTimezone(
//           startDate,
//           startTime,
//           timezone
//         )
//       : "--";


//   /* =======================================================
//      DAYS
//   ======================================================= */

//   const formattedDays =
//     Array.isArray(availableDays) &&
//     availableDays.length
//       ? availableDays
//           .map((day) =>
//             String(day).substring(0, 3).toUpperCase()
//           )
//           .join(" • ")
//       : "--";


//   /* =======================================================
//      CARD
//   ======================================================= */

//   return (
//     <article
//       className="
//         group
//         relative
//         w-full
//         max-w-[360px]
//         h-[650px]
//         min-w-0
//         overflow-hidden
//         flex
//         flex-col
//         border
//         transition-all
//         duration-300
//         hover:-translate-y-1
//         hover:shadow-[0_20px_45px_rgba(0,0,0,0.25)]
//       "
//       style={{
//         backgroundColor:
//           branding.cardBackgroundColor,

//         borderColor:
//           withOpacity(
//             branding.textColor,
//             "18"
//           ),

//         borderRadius:
//           "18px",

//         boxSizing:
//           "border-box",
//       }}
//     >

//       {/* =====================================================
//           IMAGE
//       ===================================================== */}

//       <Link
//         to={`/institute/website/preview/classes/${classId}`}
//         onClick={(event) =>
//           event.stopPropagation()
//         }
//         className="
//           relative
//           block
//           w-full
//           h-[210px]
//           shrink-0
//           overflow-hidden
//         "
//       >

//         <img
//           src={image}
//           alt={title}
//           className="
//             block
//             h-full
//             w-full
//             object-cover
//             transition-transform
//             duration-500
//             group-hover:scale-105
//           "
//           loading="lazy"
//         />

//         {/* Image Gradient */}

//         <div
//           className="
//             pointer-events-none
//             absolute
//             inset-0
//             bg-gradient-to-t
//             from-black/80
//             via-black/20
//             to-transparent
//           "
//         />


//         {/* =================================================
//             INSTITUTE
//         ================================================= */}

//         <div
//           className="
//             absolute
//             left-3
//             top-3
//             z-20
//             max-w-[65%]
//           "
//         >

//           <div
//             className="
//               flex
//               max-w-full
//               items-center
//               gap-2
//               border
//               px-3
//               py-1.5
//               backdrop-blur-md
//             "
//             style={{
//               backgroundColor:
//                 "rgba(0,0,0,0.72)",

//               borderColor:
//                 withOpacity(
//                   branding.buttonColor,
//                   "55"
//                 ),

//               borderRadius:
//                 "9px",
//             }}
//           >

//             <span className="text-[10px]">
//               🏛
//             </span>

//             <span
//               className="
//                 max-w-[150px]
//                 truncate
//                 text-[11px]
//               "
//               style={{
//                 color:
//                   branding.buttonColor,

//                 fontFamily:
//                   fontFamily(
//                     branding.fontBody
//                   ),

//                 fontWeight:
//                   branding.bodyWeight,
//               }}
//             >
//               {instituteName}
//             </span>

//           </div>

//         </div>


//         {/* =================================================
//             LEVEL
//         ================================================= */}

//         <span
//           className="
//             absolute
//             bottom-3
//             left-3
//             z-20
//             max-w-[50%]
//             truncate
//             px-3
//             py-1.5
//             text-[11px]
//             font-semibold
//           "
//           style={{
//             backgroundColor:
//               branding.buttonColor,

//             color:
//               branding.buttonTextColor,

//             borderRadius:
//               "999px",

//             fontFamily:
//               fontFamily(
//                 branding.fontBody
//               ),
//           }}
//         >
//           {level}
//         </span>


//         {/* =================================================
//             DURATION
//         ================================================= */}

//         <div
//           className="
//             absolute
//             bottom-3
//             right-3
//             z-20
//             flex
//             items-center
//             gap-1.5
//             px-3
//             py-1.5
//             backdrop-blur-md
//           "
//           style={{
//             backgroundColor:
//               "rgba(0,0,0,0.72)",

//             borderRadius:
//               "999px",
//           }}
//         >

//           <FaClock
//             className="text-[10px]"
//             style={{
//               color:
//                 branding.iconColor,
//             }}
//           />

//           <span
//             className="
//               max-w-[80px]
//               truncate
//               text-[11px]
//             "
//             style={{
//               color:
//                 "#FFFFFF",

//               fontFamily:
//                 fontFamily(
//                   branding.fontBody
//                 ),
//             }}
//           >
//             {duration}
//           </span>

//         </div>

//       </Link>


//       {/* =====================================================
//           CONTENT
//       ===================================================== */}

//       <div
//         className="
//           flex
//           min-h-0
//           flex-1
//           flex-col
//           p-5
//         "
//       >

//         {/* =================================================
//             CATEGORY
//         ================================================= */}

//         <p
//           className="
//             mb-1
//             shrink-0
//             truncate
//             text-[11px]
//             uppercase
//             tracking-[0.12em]
//           "
//           style={{
//             color:
//               branding.subheadingColor,

//             fontFamily:
//               fontFamily(
//                 branding.fontSubheading
//               ),

//             fontWeight:
//               branding.subheadingWeight,
//           }}
//         >
//           {subcategory}
//         </p>


//         {/* =================================================
//             TITLE
//         ================================================= */}

//         <Link
//           to={`/institute/website/preview/classes/${classId}`}
//           onClick={(event) =>
//             event.stopPropagation()
//           }
//           className="
//             block
//             shrink-0
//           "
//         >

//           <h3
//             className="
//               mb-4
//               min-h-[48px]
//               max-h-[48px]
//               overflow-hidden
//               text-[21px]
//               leading-[24px]
//               line-clamp-2
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

//               letterSpacing:
//                 branding.headingLetterSpacing,
//             }}
//           >
//             {title}
//           </h3>

//         </Link>


//         {/* =================================================
//             TRAINER
//         ================================================= */}

//         <div
//           className="
//             mb-5
//             flex
//             min-h-[48px]
//             shrink-0
//             items-center
//             gap-3
//           "
//         >

//           {/* Trainer Image */}

//           <img
//             src={trainerImage}
//             alt={trainerName}
//             className="
//               h-11
//               w-11
//               shrink-0
//               rounded-full
//               object-cover
//             "
//             style={{
//               border:
//                 `2px solid ${branding.buttonColor}`,
//             }}
//           />


//           {/* Trainer Details */}

//           <div
//             className="
//               min-w-0
//               flex-1
//             "
//           >

//             <p
//               className="
//                 truncate
//                 text-[13px]
//                 leading-[17px]
//               "
//               style={{
//                 color:
//                   branding.headingColor,

//                 fontFamily:
//                   fontFamily(
//                     branding.fontBody
//                   ),

//                 fontWeight:
//                   branding.bodyWeight,
//               }}
//             >
//               {trainerName}
//             </p>


//             <div
//               className="
//                 mt-1
//                 flex
//                 items-center
//                 gap-2
//               "
//             >

//               <StarRating
//                 rating={rating}
//                 showValue={false}
//                 branding={branding}
//               />

//               <span
//                 className="
//                   text-[11px]
//                   font-semibold
//                 "
//                 style={{
//                   color:
//                     branding.iconColor,
//                 }}
//               >
//                 {rating.toFixed(1)}
//               </span>

//             </div>

//           </div>

//         </div>


//         {/* =================================================
//             DIVIDER
//         ================================================= */}

//         <div
//           className="
//             mb-4
//             border-t
//           "
//           style={{
//             borderColor:
//               withOpacity(
//                 branding.textColor,
//                 "18"
//               ),
//           }}
//         />


//         {/* =================================================
//             SCHEDULE
//         ================================================= */}

//         <div
//           className="
//             shrink-0
//             space-y-3
//           "
//         >

//           {/* DAYS */}

//           <div
//             className="
//               flex
//               min-h-[22px]
//               items-center
//               justify-between
//               gap-3
//             "
//           >

//             <div
//               className="
//                 flex
//                 shrink-0
//                 items-center
//                 gap-2
//                 text-[12px]
//               "
//               style={{
//                 color:
//                   branding.textColor,
//               }}
//             >

//               <FaCalendarWeek
//                 className="text-[12px]"
//                 style={{
//                   color:
//                     branding.subheadingColor,
//                 }}
//               />

//               <span>
//                 Days
//               </span>

//             </div>


//             <span
//               className="
//                 max-w-[60%]
//                 truncate
//                 text-right
//                 text-[12px]
//               "
//               style={{
//                 color:
//                   branding.headingColor,

//                 fontWeight:
//                   branding.bodyWeight,
//               }}
//             >
//               {formattedDays}
//             </span>

//           </div>


//           {/* START DATE */}

//           <div
//             className="
//               flex
//               min-h-[22px]
//               items-center
//               justify-between
//               gap-3
//             "
//           >

//             <div
//               className="
//                 flex
//                 shrink-0
//                 items-center
//                 gap-2
//                 text-[12px]
//               "
//               style={{
//                 color:
//                   branding.textColor,
//               }}
//             >

//               <FaCalendarAlt
//                 className="text-[12px]"
//                 style={{
//                   color:
//                     branding.buttonColor,
//                 }}
//               />

//               <span>
//                 Start Date
//               </span>

//             </div>


//             <span
//               className="
//                 max-w-[60%]
//                 truncate
//                 text-right
//                 text-[12px]
//               "
//               style={{
//                 color:
//                   branding.headingColor,

//                 fontWeight:
//                   branding.bodyWeight,
//               }}
//             >
//               {formatDate(
//                 startDate
//               )}
//             </span>

//           </div>


//           {/* START TIME */}

//           <div
//             className="
//               flex
//               min-h-[22px]
//               items-center
//               justify-between
//               gap-3
//             "
//           >

//             <div
//               className="
//                 flex
//                 shrink-0
//                 items-center
//                 gap-2
//                 text-[12px]
//               "
//               style={{
//                 color:
//                   branding.textColor,
//               }}
//             >

//               <FaClock
//                 className="text-[12px]"
//                 style={{
//                   color:
//                     branding.iconColor,
//                 }}
//               />

//               <span>
//                 Start Time
//               </span>

//             </div>


//             <span
//               className="
//                 max-w-[60%]
//                 truncate
//                 text-right
//                 text-[12px]
//               "
//               style={{
//                 color:
//                   branding.headingColor,

//                 fontWeight:
//                   branding.bodyWeight,
//               }}
//             >
//               {formattedTime}
//             </span>

//           </div>

//         </div>


//         {/* =================================================
//             PRICE + STUDENTS
//         ================================================= */}

//         <div
//           className="
//             mt-5
//             flex
//             min-h-[38px]
//             shrink-0
//             items-end
//             justify-between
//             gap-3
//           "
//         >

//           {/* PRICE */}

//           <div
//             className="
//               flex
//               min-w-0
//               items-baseline
//               gap-1
//             "
//           >

//             <span
//               className="
//                 text-[25px]
//                 leading-none
//               "
//               style={{
//                 color:
//                   branding.iconColor,

//                 fontFamily:
//                   fontFamily(
//                     branding.fontHeading
//                   ),

//                 fontWeight:
//                   branding.headingWeight,
//               }}
//             >
//               ₹
//               {price.toLocaleString(
//                 "en-IN"
//               )}
//             </span>

//             <span
//               className="
//                 text-[11px]
//               "
//               style={{
//                 color:
//                   branding.textColor,
//               }}
//             >
//               /month
//             </span>

//           </div>


//           {/* STUDENTS */}

//           <div
//             className="
//               flex
//               min-w-0
//               items-center
//               gap-2
//             "
//             style={{
//               color:
//                 branding.textColor,
//             }}
//           >

//             <FaUsers
//               className="
//                 shrink-0
//                 text-[12px]
//               "
//               style={{
//                 color:
//                   branding.buttonColor,
//               }}
//             />

//             <span
//               className="
//                 truncate
//                 text-[11px]
//               "
//             >
//               {Number(
//                 students || 0
//               ).toLocaleString(
//                 "en-IN"
//               )}{" "}
//               Students
//             </span>

//           </div>

//         </div>


//         {/* =================================================
//             BUTTONS
//         ================================================= */}

//         <div
//           className="
//             mt-auto
//             grid
//             h-[42px]
//             shrink-0
//             grid-cols-2
//             gap-3
//           "
//         >

//           {/* DETAILS */}

//           <button
//             type="button"
//             onClick={
//               handleDetails
//             }
//             className="
//               flex
//               h-full
//               w-full
//               items-center
//               justify-center
//               border
//               px-3
//               text-[12px]
//               font-semibold
//               transition-all
//               duration-200
//               hover:opacity-80
//             "
//             style={{
//               color:
//                 branding.buttonColor,

//               backgroundColor:
//                 branding.cardBackgroundColor,

//               borderColor:
//                 branding.buttonColor,

//               borderRadius:
//                 buttonRadius(
//                   branding
//                 ),

//               fontFamily:
//                 fontFamily(
//                   branding.fontBody
//                 ),
//             }}
//           >
//             Details
//           </button>


//           {/* BOOK */}

//           <button
//             type="button"
//             onClick={
//               handleBook
//             }
//             className="
//               flex
//               h-full
//               w-full
//               items-center
//               justify-center
//               gap-2
//               border
//               px-3
//               text-[12px]
//               font-semibold
//               transition-all
//               duration-200
//               hover:opacity-90
//             "
//             style={{
//               color:
//                 branding.buttonTextColor,

//               backgroundColor:
//                 branding.buttonColor,

//               borderColor:
//                 branding.buttonColor,

//               borderRadius:
//                 buttonRadius(
//                   branding
//                 ),

//               fontFamily:
//                 fontFamily(
//                   branding.fontBody
//                 ),
//             }}
//           >
//             <span>
//               Book
//             </span>

//             <FaArrowRight
//               size={10}
//             />
//           </button>

//         </div>

//       </div>

//     </article>
//   );
// };

// /* =========================================================
//    CATEGORY CARD
// ========================================================= */

// const CategoryCard = ({
//   category,
//   count,
//   active,
//   onClick,
//   branding,
// }) => {
//   const name =
//     category?.name ||
//     category?.category_name ||
//     category?.title ||
//     "Category";

//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       className="
//         border
//         px-5
//         py-6
//         text-center
//         shadow-sm
//         transition-all
//         duration-200
//         hover:-translate-y-1
//         hover:shadow-md
//       "
//       style={{
//         backgroundColor:
//           branding.cardBackgroundColor,

//         borderColor:
//           active
//             ? branding.buttonColor
//             : withOpacity(
//                 branding.textColor,
//                 "18"
//               ),

//         borderRadius:
//           "12px",

//         fontFamily:
//           fontFamily(
//             branding.fontBody
//           ),
//       }}
//     >

//       <div
//         className="
//           mx-auto
//           mb-4
//           flex
//           h-14
//           w-14
//           items-center
//           justify-center
//           rounded-full
//         "
//         style={{
//           backgroundColor:
//             withOpacity(
//               branding.buttonColor,
//               "12"
//             ),

//           color:
//             branding.iconColor,
//         }}
//       >

//         <span
//           className="text-2xl"
//           style={{
//             fontFamily:
//               fontFamily(
//                 branding.fontHeading
//               ),

//             fontWeight:
//               branding.headingWeight,
//           }}
//         >
//           {String(name)
//             .charAt(0)
//             .toUpperCase()}
//         </span>

//       </div>


//       <h3
//         className="text-sm"
//         style={{
//           color:
//             branding.headingColor,

//           fontFamily:
//             fontFamily(
//               branding.fontHeading
//             ),

//           fontWeight:
//             branding.headingWeight,
//         }}
//       >
//         {name}
//       </h3>


//       <p
//         className="
//           mt-1
//           text-xs
//         "
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
//         {count}{" "}
//         {count === 1
//           ? "Class"
//           : "Classes"}
//       </p>

//     </button>
//   );
// };


// /* =========================================================
//    MAIN COMPONENT
// ========================================================= */

// const WebsiteClasses = () => {

//   const outlet =
//     useOutletContext() || {};


//   /* =======================================================
//      WEBSITE DATA
//   ======================================================= */

//   const website =
//     outlet?.website ||
//     outlet?.websiteData ||
//     {};


//   const classes =
//     outlet?.classes ||
//     website?.classes ||
//     [];


//   const categories =
//     outlet?.categories ||
//     website?.categories ||
//     [];


//   const banners =
//     outlet?.banners ||
//     website?.banners ||
//     [];


//   const rawBranding =
//     outlet?.branding ||
//     website?.branding ||
//     {};


//   const rawSections =
//     outlet?.sections ||
//     website?.sections ||
//     website?.websiteSections ||
//     website?.website_sections ||
//     [];


//   const rawContent =
//     outlet?.content ||
//     website?.content ||
//     website?.websiteContent ||
//     website?.website_content ||
//     {};


//   /* =======================================================
//      BRANDING
//   ======================================================= */

//   const branding =
//     useMemo(
//       () =>
//         getBranding(
//           rawBranding
//         ),
//       [
//         rawBranding,
//       ]
//     );


//   const navigate =
//     useNavigate();


//   /* =======================================================
//      DATA
//   ======================================================= */

//   const classData =
//     Array.isArray(classes)
//       ? classes
//       : [];


//   const categoryData =
//     Array.isArray(categories)
//       ? categories
//       : [];


//   const bannerData =
//     Array.isArray(banners)
//       ? banners
//       : [];


//   const sections =
//     Array.isArray(
//       rawSections
//     )
//       ? rawSections
//       : [];


//   /* =======================================================
//      CONTENT
//   ======================================================= */

//   const classesContent =
//     rawContent?.classes ||
//     rawContent?.Classes ||
//     website?.content?.classes ||
//     website?.content?.Classes ||
//     {};


//   const pageHeading =
//     findContent(
//       classesContent,
//       [
//         "heading",
//         "page_heading",
//         "pageHeading",
//         "title",
//         "main_heading",
//         "mainHeading",
//       ]
//     ) ||
//     "Classes";


//   const pageSubheading =
//     findContent(
//       classesContent,
//       [
//         "subheading",
//         "sub_heading",
//         "subHeading",
//         "page_subheading",
//         "pageSubheading",
//       ]
//     ) ||
//     "";


//   const categoriesContent =
//     classesContent?.categories ||
//     classesContent?.Categories ||
//     {};


//   const categoriesHeading =
//     findContent(
//       categoriesContent,
//       [
//         "heading",
//         "title",
//         "main_heading",
//         "mainHeading",
//       ]
//     ) ||
//     "Browse by Category";


//   const categoriesSubheading =
//     findContent(
//       categoriesContent,
//       [
//         "subheading",
//         "sub_heading",
//         "subHeading",
//       ]
//     ) ||
//     "";


//   const classesListContent =
//     classesContent?.classes ||
//     classesContent?.class_list ||
//     classesContent?.classList ||
//     classesContent?.list ||
//     {};


//   const classesListHeading =
//     findContent(
//       classesListContent,
//       [
//         "heading",
//         "title",
//         "main_heading",
//         "mainHeading",
//       ]
//     ) ||
//     "Choose Your Class";


//   const classesListSubheading =
//     findContent(
//       classesListContent,
//       [
//         "subheading",
//         "sub_heading",
//         "subHeading",
//       ]
//     ) ||
//     "";


//   const ctaContent =
//     classesContent?.cta ||
//     classesContent?.CTA ||
//     {};


//   const ctaHeading =
//     findContent(
//       ctaContent,
//       [
//         "heading",
//         "title",
//         "main_heading",
//         "mainHeading",
//       ]
//     ) ||
//     "Ready to start learning?";


//   const ctaSubheading =
//     findContent(
//       ctaContent,
//       [
//         "subheading",
//         "sub_heading",
//         "subHeading",
//         "description",
//       ]
//     ) ||
//     "Choose your favorite class and begin your learning journey today.";


//   const ctaButtonText =
//     findContent(
//       ctaContent,
//       [
//         "button",
//         "button_text",
//         "buttonText",
//         "button_label",
//         "buttonLabel",
//       ]
//     ) ||
//     "Explore Classes";


//   /* =======================================================
//      SECTION VISIBILITY
//   ======================================================= */

//   const bannerSection =
//     findSection(
//       sections,
//       "classes_banner",
//       "class_banner",
//       "classes_hero",
//       "class_hero",
//       "banner"
//     );


//   const categoriesSection =
//     findSection(
//       sections,
//       "classes_categories",
//       "class_categories",
//       "categories"
//     );


//   const classesSection =
//     findSection(
//       sections,
//       "classes_list",
//       "class_list",
//       "classes"
//     );


//   const ctaSection =
//     findSection(
//       sections,
//       "classes_cta",
//       "class_cta",
//       "cta"
//     );


//   const showBanner =
//     isEnabled(
//       bannerSection?.is_visible ??
//         bannerSection?.isVisible ??
//         bannerSection?.visible ??
//         bannerSection?.enabled,
//       true
//     );


//   const showCategories =
//     isEnabled(
//       categoriesSection?.is_visible ??
//         categoriesSection?.isVisible ??
//         categoriesSection?.visible ??
//         categoriesSection?.enabled,
//       true
//     );


//   const showClasses =
//     isEnabled(
//       classesSection?.is_visible ??
//         classesSection?.isVisible ??
//         classesSection?.visible ??
//         classesSection?.enabled,
//       true
//     );


//   const showCTA =
//     isEnabled(
//       ctaSection?.is_visible ??
//         ctaSection?.isVisible ??
//         ctaSection?.visible ??
//         ctaSection?.enabled,
//       true
//     );


//   /* =======================================================
//      BOOKING
//   ======================================================= */

//   const [
//     showBookingModal,
//     setShowBookingModal,
//   ] = useState(false);


//   const [
//     selectedClass,
//     setSelectedClass,
//   ] = useState(null);


//   const handleOpenBooking =
//     (classItem) => {
//       setSelectedClass(
//         classItem
//       );

//       setShowBookingModal(
//         true
//       );
//     };


//   const handleCloseBooking =
//     () => {
//       setShowBookingModal(
//         false
//       );

//       setTimeout(() => {
//         setSelectedClass(
//           null
//         );
//       }, 200);
//     };


//   /* =======================================================
//      SEARCH
//   ======================================================= */

//   const [
//     searchQuery,
//     setSearchQuery,
//   ] = useState("");


//   const [
//     debouncedSearch,
//     setDebouncedSearch,
//   ] = useState("");


//   const [
//     selectedCategory,
//     setSelectedCategory,
//   ] = useState("all");


//   useEffect(() => {

//     const timer =
//       setTimeout(
//         () => {
//           setDebouncedSearch(
//             searchQuery
//           );
//         },
//         400
//       );


//     return () =>
//       clearTimeout(
//         timer
//       );

//   }, [
//     searchQuery,
//   ]);


//   /* =======================================================
//      CATEGORY COUNTS
//   ======================================================= */

//   const categoryCounts =
//     useMemo(() => {

//       const counts = {};


//       classData.forEach(
//         (item) => {

//           const categoryId =
//             item?.category_id ||
//             item?.category?.id ||
//             item?.categoryId;


//           if (
//             categoryId !==
//               undefined &&
//             categoryId !== null
//           ) {

//             const key =
//               String(
//                 categoryId
//               );


//             counts[key] =
//               (counts[key] || 0) +
//               1;

//           }

//         }
//       );


//       return counts;

//     }, [
//       classData,
//     ]);


//   /* =======================================================
//      FILTER
//   ======================================================= */

//   const filteredClasses =
//     useMemo(() => {

//       const search =
//         debouncedSearch
//           .trim()
//           .toLowerCase();


//       return classData.filter(
//         (item) => {

//           const title =
//             getClassTitle(
//               item
//             );


//           const subcategory =
//             getSubcategoryName(
//               item
//             );


//           const institute =
//             getInstituteName(
//               item
//             );


//           const trainer =
//             getTrainerName(
//               item
//             );


//           const searchable =
//             `${title} ${subcategory} ${institute} ${trainer}`
//               .toLowerCase();


//           const searchMatch =
//             !search ||
//             searchable.includes(
//               search
//             );


//           const categoryId =
//             item?.category_id ||
//             item?.category?.id ||
//             item?.categoryId;


//           const categoryMatch =
//             selectedCategory ===
//               "all" ||
//             String(
//               categoryId
//             ) ===
//               String(
//                 selectedCategory
//               );


//           return (
//             searchMatch &&
//             categoryMatch
//           );

//         }
//       );

//     }, [
//       classData,
//       debouncedSearch,
//       selectedCategory,
//     ]);


//   /* =======================================================
//      BANNER
//   ======================================================= */

//   const classBanner =
//     bannerData.find(
//       (banner) => {

//         const type =
//           String(
//             banner?.banner_type ||
//               banner?.type ||
//               ""
//           ).toLowerCase();


//         return (
//           type ===
//             "class" ||
//           type ===
//             "classes"
//         );

//       }
//     ) || null;


//   const bannerImage =
//     classBanner?.image ||
//     classBanner?.image_url ||
//     classBanner?.banner_image ||
//     classBanner?.bannerImage ||
//     "";


//   const bannerTitle =
//     classBanner?.title ||
//     pageHeading;


//   const bannerDescription =
//     classBanner?.description ||
//     pageSubheading;


//   /* =======================================================
//      CLEAR FILTERS
//   ======================================================= */

//   const clearFilters =
//     () => {
//       setSearchQuery("");
//       setSelectedCategory(
//         "all"
//       );
//     };


//   /* =======================================================
//      RENDER
//   ======================================================= */

//   return (
//     <>
//       <div
//         className="
//           min-h-screen
//           w-full
//         "
//         style={{
//           backgroundColor:
//             branding.pageBackgroundColor,

//           color:
//             branding.textColor,

//           fontFamily:
//             fontFamily(
//               branding.fontBody
//             ),

//           fontWeight:
//             branding.bodyWeight,

//           lineHeight:
//             branding.bodyLineHeight,

//           letterSpacing:
//             branding.bodyLetterSpacing,
//         }}
//       >

//         {/* =================================================
//             PAGE HEADER
//         ================================================= */}

//         {showBanner && (
//           <section
//             className="
//               relative
//               overflow-hidden
//             "
//             style={{
//               backgroundColor:
//                 branding.navbarColor,
//             }}
//           >

//             {bannerImage ? (
//               <div
//                 className="
//                   relative
//                   h-[360px]
//                   w-full
//                 "
//               >

//                 <img
//                   src={
//                     bannerImage
//                   }
//                   alt={
//                     bannerTitle
//                   }
//                   className="
//                     absolute
//                     inset-0
//                     h-full
//                     w-full
//                     object-cover
//                   "
//                 />


//                 <div
//                   className="
//                     absolute
//                     inset-0
//                   "
//                   style={{
//                     background:
//                       "linear-gradient(90deg, rgba(0,0,0,0.72), rgba(0,0,0,0.35), rgba(0,0,0,0.10))",
//                   }}
//                 />


//                 {/* Banner image only — no title or description overlay */}
//                 <div
//                   className="
//                     absolute
//                     inset-0
//                     z-10
//                     pointer-events-none
//                   "
//                 />

//               </div>
//             ) : (
//               <div
//                 className="
//                   mx-auto
//                   max-w-7xl
//                   px-4
//                   py-16
//                   text-center
//                   sm:px-6
//                   lg:px-8
//                 "
//               >

//                 {pageSubheading && (
//                   <p
//                     className="
//                       text-xs
//                       uppercase
//                       tracking-[0.15em]
//                     "
//                     style={{
//                       color:
//                         branding.subheadingColor,

//                       fontFamily:
//                         fontFamily(
//                           branding.fontSubheading
//                         ),

//                       fontWeight:
//                         branding.subheadingWeight,
//                     }}
//                   >
//                     {pageSubheading}
//                   </p>
//                 )}


//                 <h1
//                   className="
//                     mt-3
//                     text-4xl
//                     sm:text-5xl
//                   "
//                   style={{
//                     color:
//                       branding.headingColor,

//                     fontFamily:
//                       fontFamily(
//                         branding.fontHeading
//                       ),

//                     fontWeight:
//                       branding.headingWeight,

//                     lineHeight:
//                       branding.headingLineHeight,
//                   }}
//                 >
//                   {pageHeading}
//                 </h1>

//               </div>
//             )}

//           </section>
//         )}


//         {/* =================================================
//             SEARCH
//         ================================================= */}

//         {showClasses && (
//           <section
//             className="
//               border-b
//             "
//             style={{
//               backgroundColor:
//                 branding.cardBackgroundColor,

//               borderColor:
//                 withOpacity(
//                   branding.textColor,
//                   "12"
//                 ),
//             }}
//           >

//             <div
//               className="
//                 mx-auto
//                 max-w-7xl
//                 px-4
//                 py-6
//                 sm:px-6
//                 lg:px-8
//               "
//             >

//               <div
//                 className="
//                   grid
//                   grid-cols-1
//                   gap-3
//                   md:grid-cols-[1fr_280px]
//                 "
//               >

//                 {/* SEARCH */}

//                 <div
//                   className="
//                     relative
//                   "
//                 >

//                   <FaSearch
//                     className="
//                       absolute
//                       left-4
//                       top-1/2
//                       -translate-y-1/2
//                     "
//                     style={{
//                       color:
//                         branding.iconColor,
//                     }}
//                   />


//                   <input
//                     type="text"
//                     value={
//                       searchQuery
//                     }
//                     onChange={(
//                       event
//                     ) =>
//                       setSearchQuery(
//                         event.target
//                           .value
//                       )
//                     }
//                     placeholder="Search classes..."
//                     className="
//                       w-full
//                       border
//                       py-3.5
//                       pl-11
//                       pr-11
//                       text-sm
//                       outline-none
//                     "
//                     style={{
//                       backgroundColor:
//                         branding.cardBackgroundColor,

//                       color:
//                         branding.textColor,

//                       borderColor:
//                         withOpacity(
//                           branding.textColor,
//                           "22"
//                         ),

//                       borderRadius:
//                         buttonRadius(
//                           branding
//                         ),

//                       fontFamily:
//                         fontFamily(
//                           branding.fontBody
//                         ),
//                     }}
//                   />


//                   {searchQuery && (
//                     <button
//                       type="button"
//                       onClick={() =>
//                         setSearchQuery(
//                           ""
//                         )
//                       }
//                       className="
//                         absolute
//                         right-4
//                         top-1/2
//                         -translate-y-1/2
//                       "
//                       style={{
//                         color:
//                           branding.iconColor,
//                       }}
//                     >
//                       <FaTimes />
//                     </button>
//                   )}

//                 </div>


//                 {/* CATEGORY */}

//                 <div
//                   className="
//                     relative
//                   "
//                 >

//                   <FaFilter
//                     className="
//                       absolute
//                       left-4
//                       top-1/2
//                       -translate-y-1/2
//                     "
//                     style={{
//                       color:
//                         branding.iconColor,
//                     }}
//                   />


//                   <select
//                     value={
//                       selectedCategory
//                     }
//                     onChange={(
//                       event
//                     ) =>
//                       setSelectedCategory(
//                         event.target
//                           .value
//                       )
//                     }
//                     className="
//                       w-full
//                       appearance-none
//                       border
//                       py-3.5
//                       pl-11
//                       pr-10
//                       text-sm
//                       outline-none
//                     "
//                     style={{
//                       backgroundColor:
//                         branding.cardBackgroundColor,

//                       color:
//                         branding.textColor,

//                       borderColor:
//                         withOpacity(
//                           branding.textColor,
//                           "22"
//                         ),

//                       borderRadius:
//                         buttonRadius(
//                           branding
//                         ),

//                       fontFamily:
//                         fontFamily(
//                           branding.fontBody
//                         ),
//                     }}
//                   >

//                     <option value="all">
//                       All Categories
//                     </option>


//                     {categoryData.map(
//                       (category) => {

//                         const id =
//                           category?.id ||
//                           category?.category_id;


//                         const name =
//                           category?.name ||
//                           category?.category_name ||
//                           category?.title ||
//                           "Category";


//                         return (
//                           <option
//                             key={id}
//                             value={id}
//                           >
//                             {name}
//                           </option>
//                         );

//                       }
//                     )}

//                   </select>


//                   <FaChevronDown
//                     className="
//                       pointer-events-none
//                       absolute
//                       right-4
//                       top-1/2
//                       -translate-y-1/2
//                     "
//                     style={{
//                       color:
//                         branding.iconColor,
//                     }}
//                   />

//                 </div>

//               </div>

//             </div>

//           </section>
//         )}


//         {/* =================================================
//             CATEGORIES
//         ================================================= */}

//         {showCategories && (
//           <section
//             className="
//               py-12
//               sm:py-16
//             "
//             style={{
//               backgroundColor:
//                 branding.pageBackgroundColor,
//             }}
//           >

//             <div
//               className="
//                 mx-auto
//                 max-w-7xl
//                 px-4
//                 sm:px-6
//                 lg:px-8
//               "
//             >

//               <div
//                 className="
//                   mb-8
//                   text-center
//                 "
//               >

//                 {categoriesSubheading && (
//                   <p
//                     className="
//                       text-xs
//                       uppercase
//                       tracking-widest
//                     "
//                     style={{
//                       color:
//                         branding.subheadingColor,

//                       fontFamily:
//                         fontFamily(
//                           branding.fontSubheading
//                         ),

//                       fontWeight:
//                         branding.subheadingWeight,
//                     }}
//                   >
//                     {categoriesSubheading}
//                   </p>
//                 )}


//                 <h2
//                   className="
//                     mt-2
//                     text-3xl
//                     sm:text-4xl
//                   "
//                   style={{
//                     color:
//                       branding.headingColor,

//                     fontFamily:
//                       fontFamily(
//                         branding.fontHeading
//                       ),

//                     fontWeight:
//                       branding.headingWeight,

//                     lineHeight:
//                       branding.headingLineHeight,
//                   }}
//                 >
//                   {categoriesHeading}
//                 </h2>

//               </div>


//               {categoryData.length >
//               0 ? (
//                 <div
//                   className="
//                     grid
//                     grid-cols-2
//                     gap-3
//                     sm:grid-cols-3
//                     lg:grid-cols-6
//                   "
//                 >

//                   {categoryData
//                     .slice(
//                       0,
//                       6
//                     )
//                     .map(
//                       (
//                         category
//                       ) => {

//                         const id =
//                           category?.id ||
//                           category?.category_id;


//                         return (
//                           <CategoryCard
//                             key={id}
//                             category={
//                               category
//                             }
//                             count={
//                               categoryCounts[
//                                 String(
//                                   id
//                                 )
//                               ] || 0
//                             }
//                             active={
//                               String(
//                                 selectedCategory
//                               ) ===
//                               String(id)
//                             }
//                             branding={
//                               branding
//                             }
//                             onClick={() =>
//                               setSelectedCategory(
//                                 String(
//                                   selectedCategory
//                                 ) ===
//                                 String(id)
//                                   ? "all"
//                                   : String(
//                                       id
//                                     )
//                               )
//                             }
//                           />
//                         );

//                       }
//                     )}

//                 </div>
//               ) : (
//                 <div
//                   className="
//                     border
//                     border-dashed
//                     py-12
//                     text-center
//                     text-sm
//                   "
//                   style={{
//                     backgroundColor:
//                       branding.cardBackgroundColor,

//                     color:
//                       branding.textColor,

//                     borderColor:
//                       withOpacity(
//                         branding.textColor,
//                         "25"
//                       ),

//                     borderRadius:
//                       "12px",
//                   }}
//                 >
//                   No categories
//                   available.
//                 </div>
//               )}

//             </div>

//           </section>
//         )}


//         {/* =================================================
//             CLASSES LIST
//         ================================================= */}

//         {showClasses && (
//           <section
//             id="classes-list"
//             className="
//               py-12
//               sm:py-16
//             "
//             style={{
//               backgroundColor:
//                 withOpacity(
//                   branding.subheadingColor,
//                   "06"
//                 ),
//             }}
//           >

//             <div
//               className="
//                 mx-auto
//                 max-w-7xl
//                 px-4
//                 sm:px-6
//                 lg:px-8
//               "
//             >

//               <div
//                 className="
//                   mb-8
//                   text-center
//                 "
//               >

//                 {classesListSubheading && (
//                   <p
//                     className="
//                       text-xs
//                       uppercase
//                       tracking-widest
//                     "
//                     style={{
//                       color:
//                         branding.subheadingColor,

//                       fontFamily:
//                         fontFamily(
//                           branding.fontSubheading
//                         ),

//                       fontWeight:
//                         branding.subheadingWeight,
//                     }}
//                   >
//                     {classesListSubheading}
//                   </p>
//                 )}


//                 <h2
//                   className="
//                     mt-2
//                     text-3xl
//                     sm:text-4xl
//                   "
//                   style={{
//                     color:
//                       branding.headingColor,

//                     fontFamily:
//                       fontFamily(
//                         branding.fontHeading
//                       ),

//                     fontWeight:
//                       branding.headingWeight,

//                     lineHeight:
//                       branding.headingLineHeight,
//                   }}
//                 >
//                   {classesListHeading}
//                 </h2>

//               </div>


//               {/* FILTER RESULT */}

//               {(selectedCategory !==
//                 "all" ||
//                 debouncedSearch) && (
//                 <div
//                   className="
//                     mb-6
//                     flex
//                     flex-wrap
//                     items-center
//                     justify-between
//                     gap-3
//                   "
//                 >

//                   <p
//                     className="text-sm"
//                     style={{
//                       color:
//                         branding.textColor,
//                     }}
//                   >
//                     Showing{" "}
//                     <span
//                       style={{
//                         color:
//                           branding.buttonColor,

//                         fontWeight:
//                           branding.headingWeight,
//                       }}
//                     >
//                       {
//                         filteredClasses.length
//                       }
//                     </span>{" "}
//                     classes
//                   </p>


//                   <button
//                     type="button"
//                     onClick={
//                       clearFilters
//                     }
//                     className="
//                       inline-flex
//                       items-center
//                       gap-2
//                       text-xs
//                     "
//                     style={{
//                       color:
//                         branding.buttonColor,

//                       fontFamily:
//                         fontFamily(
//                           branding.fontBody
//                         ),
//                     }}
//                   >
//                     <FaTimes />

//                     Clear Filters
//                   </button>

//                 </div>
//               )}


//               {/* CLASS GRID */}

//               {filteredClasses.length >
//               0 ? (
//                 <div
//                   className="
//                     grid
//                     grid-cols-1
//                     gap-6
//                     sm:grid-cols-2
//                     lg:grid-cols-3
//                     xl:grid-cols-4
//                   "
//                 >

//                   {filteredClasses.map(
//                     (item) => (
//                       <ClassCard
//                         key={
//                           getClassId(
//                             item
//                           )
//                         }
//                         item={
//                           item
//                         }
//                         branding={
//                           branding
//                         }
//                         onBook={
//                           handleOpenBooking
//                         }
//                       />
//                     )
//                   )}

//                 </div>
//               ) : (
//                 <div
//                   className="
//                     border
//                     border-dashed
//                     px-6
//                     py-16
//                     text-center
//                   "
//                   style={{
//                     backgroundColor:
//                       branding.cardBackgroundColor,

//                     borderColor:
//                       withOpacity(
//                         branding.textColor,
//                         "25"
//                       ),

//                     borderRadius:
//                       "16px",
//                   }}
//                 >

//                   <div
//                     className="
//                       mx-auto
//                       flex
//                       h-16
//                       w-16
//                       items-center
//                       justify-center
//                       rounded-full
//                     "
//                     style={{
//                       backgroundColor:
//                         withOpacity(
//                           branding.buttonColor,
//                           "12"
//                         ),

//                       color:
//                         branding.iconColor,
//                     }}
//                   >
//                     <FaSearch
//                       size={22}
//                     />
//                   </div>


//                   <h3
//                     className="
//                       mt-5
//                       text-xl
//                     "
//                     style={{
//                       color:
//                         branding.headingColor,

//                       fontFamily:
//                         fontFamily(
//                           branding.fontHeading
//                         ),

//                       fontWeight:
//                         branding.headingWeight,
//                     }}
//                   >
//                     No Classes Found
//                   </h3>


//                   <p
//                     className="
//                       mx-auto
//                       mt-2
//                       max-w-md
//                       text-sm
//                     "
//                     style={{
//                       color:
//                         branding.textColor,

//                       fontFamily:
//                         fontFamily(
//                           branding.fontBody
//                         ),
//                     }}
//                   >
//                     No classes match
//                     your current
//                     search or category
//                     selection.
//                   </p>


//                   <Button
//                     type="button"
//                     branding={
//                       branding
//                     }
//                     className="mt-6"
//                     onClick={
//                       clearFilters
//                     }
//                   >
//                     Clear Filters
//                   </Button>

//                 </div>
//               )}

//             </div>

//           </section>
//         )}

//       </div>


//       {/* =================================================
//           BOOKING
//       ================================================= */}

//       <WebsiteBooking
//         isOpen={
//           showBookingModal
//         }
//         selectedClass={
//           selectedClass
//         }
//         onClose={
//           handleCloseBooking
//         }
//       />

//     </>
//   );
// };


// export default WebsiteClasses;




import { useEffect, useMemo, useState } from "react";
import {
  Link,
  useNavigate,
  useOutletContext,
} from "react-router-dom";

import {
  FaArrowRight,
  FaCalendarAlt,
  FaCalendarWeek,
  FaChevronDown,
  FaClock,
  FaFilter,
  FaSearch,
  FaUsers,
  FaTimes,
} from "react-icons/fa";

import WebsiteBooking from "./WebsiteBooking";


/* =========================================================
   DEFAULT BRANDING
========================================================= */

const DEFAULT_BRANDING = {
  navbarColor: "#1F2937",

  navbarTextColor: "#FFFFFF",

  navbarButtonColor: "#7C3AED",

  navbarButtonTextColor: "#FFFFFF",

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

  footerIconColor: "#FFFFFF",

  fontHeading: "Inter",

  fontSubheading: "Inter",

  fontBody: "Inter",

  headingWeight: 700,

  headingLineHeight: 1.15,

  headingLetterSpacing: "0px",

  subheadingWeight: 600,

  subheadingLineHeight: 1.4,

  bodyWeight: 400,

  bodyLineHeight: 1.6,

  bodyLetterSpacing: "0px",

  roundedButtons: true,
};


/* =========================================================
   BRANDING
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


const getBranding = (
  branding = {}
) => ({
  navbarColor:
    getBrandingValue(
      branding,
      "navbarColor",
      "navbar_color",
      DEFAULT_BRANDING.navbarColor
    ),

  navbarTextColor:
    getBrandingValue(
      branding,
      "navbarTextColor",
      "navbar_text_color",
      DEFAULT_BRANDING.navbarTextColor
    ),

  navbarButtonColor:
    getBrandingValue(
      branding,
      "navbarButtonColor",
      "navbar_button_color",
      DEFAULT_BRANDING.navbarButtonColor
    ),

  navbarButtonTextColor:
    getBrandingValue(
      branding,
      "navbarButtonTextColor",
      "navbar_button_text_color",
      DEFAULT_BRANDING.navbarButtonTextColor
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

  footerIconColor:
    getBrandingValue(
      branding,
      "footerIconColor",
      "footer_icon_color",
      DEFAULT_BRANDING.footerIconColor
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


/* =========================================================
   HELPERS
========================================================= */

const fontFamily = (font) =>
  font
    ? `'${font}', sans-serif`
    : "Inter, sans-serif";


const buttonRadius = (
  branding
) =>
  branding.roundedButtons
    ? "999px"
    : "6px";


const withOpacity = (
  color,
  opacity = "12"
) => {
  if (
    typeof color === "string" &&
    /^#[0-9a-fA-F]{6}$/.test(
      color
    )
  ) {
    return `${color}${opacity}`;
  }

  return color;
};


const getValue = (
  ...values
) =>
  values.find(
    (value) =>
      value !== undefined &&
      value !== null &&
      String(value).trim() !== ""
  );


const getArray = (
  ...values
) =>
  values.find(
    (value) =>
      Array.isArray(value)
  ) || [];


const isEnabled = (
  value,
  defaultValue = true
) => {
  if (
    value === undefined ||
    value === null
  ) {
    return defaultValue;
  }

  if (
    value === true ||
    value === 1 ||
    value === "1" ||
    value === "true" ||
    value === "TRUE"
  ) {
    return true;
  }

  if (
    value === false ||
    value === 0 ||
    value === "0" ||
    value === "false" ||
    value === "FALSE"
  ) {
    return false;
  }

  return defaultValue;
};


/* =========================================================
   SECTION FINDER
========================================================= */

const findSection = (
  sections,
  ...keys
) => {
  if (
    !Array.isArray(sections)
  ) {
    return null;
  }

  const normalizedKeys =
    keys.map((key) =>
      String(key)
        .trim()
        .toLowerCase()
        .replace(
          /[\s-]+/g,
          "_"
        )
    );

  return (
    sections.find(
      (section) => {
        const candidates = [
          section?.section_key,
          section?.sectionKey,
          section?.section_name,
          section?.sectionName,
          section?.key,
          section?.name,
          section?.slug,
          section?.page_section,
          section?.pageSection,
        ];

        return candidates.some(
          (candidate) => {
            if (
              candidate ===
                undefined ||
              candidate === null
            ) {
              return false;
            }

            const normalized =
              String(candidate)
                .trim()
                .toLowerCase()
                .replace(
                  /[\s-]+/g,
                  "_"
                );

            return normalizedKeys.includes(
              normalized
            );
          }
        );
      }
    ) || null
  );
};


/* =========================================================
   CONTENT FINDER
========================================================= */

const findContent = (
  content,
  keys
) => {
  if (
    !content ||
    typeof content !== "object"
  ) {
    return "";
  }

  for (const key of keys) {
    const value =
      content?.[key];

    if (
      value !== undefined &&
      value !== null &&
      String(value).trim() !== ""
    ) {
      return value;
    }
  }

  return "";
};


/* =========================================================
   GET CLASS HELPERS
========================================================= */

const getClassId = (item) =>
  item?.id ||
  item?.class_id;


const getClassTitle = (item) =>
  item?.title ||
  item?.class_title ||
  item?.name ||
  "Class";


const getClassImage = (item) =>
  item?.image ||
  item?.class_image ||
  item?.image_url ||
  item?.thumbnail ||
  item?.thumbnail_url ||
  "";


const getInstituteName = (item) =>
  item?.institute_name ||
  item?.institute?.name ||
  item?.instituteName ||
  "Institute";


const getSubcategoryName = (
  item
) =>
  item?.subcategory_name ||
  item?.subcategory?.name ||
  item?.subcategoryName ||
  "General";


const getTrainerName = (
  item
) =>
  item?.trainer_name ||
  item?.trainerName ||
  item?.trainer?.name ||
  "Expert Trainer";


const getTrainerImage = (
  item
) =>
  item?.trainer_image ||
  item?.trainerImage ||
  item?.trainer?.image ||
  "";


const getLevel = (item) =>
  item?.level ||
  item?.class_level ||
  item?.difficulty ||
  "All Levels";


const getDuration = (item) =>
  item?.duration ||
  item?.class_duration ||
  item?.duration_minutes ||
  "--";


const getStudents = (item) =>
  item?.students ??
  item?.students_count ??
  item?.studentsCount ??
  0;


const getAvailableDays = (
  item
) => {
  if (
    Array.isArray(
      item?.available_days
    )
  ) {
    return item.available_days;
  }

  if (
    Array.isArray(
      item?.days
    )
  ) {
    return item.days;
  }

  if (
    Array.isArray(
      item?.schedule_days
    )
  ) {
    return item.schedule_days;
  }

  return [];
};


/* =========================================================
   DATE
========================================================= */

const formatDate = (
  dateValue
) => {
  if (!dateValue) {
    return "--";
  }

  const date =
    new Date(dateValue);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return String(
      dateValue
    );
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
   TIME
========================================================= */

const formatTime = (
  timeValue
) => {
  if (!timeValue) {
    return "--";
  }

  const value =
    String(timeValue);

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

  const hours =
    Number(parts[0]);

  const minutes =
    Number(parts[1]);

  if (
    Number.isNaN(hours) ||
    Number.isNaN(minutes)
  ) {
    return value;
  }

  const period =
    hours >= 12
      ? "PM"
      : "AM";

  const hour12 =
    hours % 12 || 12;

  return `${hour12}:${String(
    minutes
  ).padStart(2, "0")} ${period}`;
};


/* =========================================================
   TIMEZONE
========================================================= */

const formatTimeWithTimezone = (
  date,
  time,
  timezone
) => {
  if (
    !date ||
    !time
  ) {
    return "--";
  }

  try {
    const dateTime =
      new Date(
        `${date}T${time}`
      );

    if (
      Number.isNaN(
        dateTime.getTime()
      )
    ) {
      return `${formatTime(
        time
      )} ${timezone || ""}`;
    }

    const formatted =
      dateTime.toLocaleTimeString(
        "en-IN",
        {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
          timeZone:
            timezone ||
            "Asia/Kolkata",
          timeZoneName:
            "short",
        }
      );

    const match =
      formatted.match(
        /^(\d{1,2}:\d{2})\s*(AM|PM)\s*(.+)$/i
      );

    if (match) {
      const [
        ,
        timePart,
        period,
        zone,
      ] = match;

      return `${zone} ${timePart} ${period.toUpperCase()}`;
    }

    return formatted;
  } catch {
    return `${formatTime(
      time
    )} ${timezone || ""}`;
  }
};


/* =========================================================
   BUTTON
========================================================= */

const Button = ({
  children,
  variant = "solid",
  size = "md",
  icon: Icon,
  iconPosition = "left",
  className = "",
  type = "button",
  branding,
  ...props
}) => {
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-3 text-sm",
    lg: "px-6 py-3.5 text-base",
  };

  const styles = {
    solid: {
      backgroundColor:
        branding.buttonColor,

      color:
        branding.buttonTextColor,

      borderColor:
        branding.buttonColor,
    },

    outline: {
      backgroundColor:
        branding.cardBackgroundColor,

      color:
        branding.buttonColor,

      borderColor:
        branding.buttonColor,
    },

    white: {
      backgroundColor:
        branding.cardBackgroundColor,

      color:
        branding.buttonColor,

      borderColor:
        branding.cardBackgroundColor,
    },
  };

  const style =
    styles[variant] ||
    styles.solid;

  return (
    <button
      type={type}
      className={[
        "inline-flex items-center justify-center gap-2 border font-semibold transition-all duration-200 active:scale-[0.98]",
        sizes[size] ||
          sizes.md,
        className,
      ].join(" ")}
      style={{
        ...style,

        borderRadius:
          buttonRadius(
            branding
          ),

        fontFamily:
          fontFamily(
            branding.fontBody
          ),

        fontWeight:
          branding.bodyWeight,
      }}
      {...props}
    >
      {Icon &&
        iconPosition ===
          "left" && (
          <Icon size={14} />
        )}

      <span>
        {children}
      </span>

      {Icon &&
        iconPosition ===
          "right" && (
          <Icon size={14} />
        )}
    </button>
  );
};


/* =========================================================
   STAR RATING
========================================================= */

const StarRating = ({
  rating = 0,
  showValue = false,
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

      <div className="text-xs tracking-[1px]">

        {[1, 2, 3, 4, 5].map(
          (star) => (
            <span
              key={star}
              style={{
                color:
                  star <=
                  Math.round(value)
                    ? branding.iconColor
                    : withOpacity(
                        branding.textColor,
                        "35"
                      ),
              }}
            >
              ★
            </span>
          )
        )}

      </div>


      {showValue && (
        <span
          className="text-xs"
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
      )}

    </div>
  );
};

/* =========================================================
   CLASS CARD
========================================================= */

const ClassCard = ({
  item,
  onBook,
  branding,
}) => {
  const navigate = useNavigate();

  /* =======================================================
     DATA
  ======================================================= */

  const classId = getClassId(item);

  const image =
    getClassImage(item) ||
    "https://via.placeholder.com/500x300";

  const title =
    getClassTitle(item) || "Class";

  const instituteName =
    getInstituteName(item) || "Institute";

  const subcategory =
    getSubcategoryName(item) || "GENERAL";

  const trainerName =
    getTrainerName(item) || "Expert Trainer";

  const trainerImage =
    getTrainerImage(item) ||
    "https://via.placeholder.com/100";

  const level =
    getLevel(item) || "BEGINNER";

  const duration =
    getDuration(item) || "--";

  const rating =
    Number(item?.rating || 0);

  const availableDays =
    getAvailableDays(item);

  const startDate =
    item?.start_date ||
    item?.startDate;

  const startTime =
    item?.start_time ||
    item?.startTime;

  const timezone =
    item?.timezone ||
    item?.class_timezone ||
    "Asia/Kolkata";

  const price =
    Number(item?.price || 0);

  const students =
    getStudents(item);


  /* =======================================================
     DETAILS
  ======================================================= */

  const handleDetails = () => {
    if (!classId) {
      console.error(
        "Class ID missing:",
        item
      );
      return;
    }

    navigate(
      `/institute/website/preview/classes/${classId}`
    );
  };


  /* =======================================================
     BOOK
  ======================================================= */

  const handleBook = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!classId) {
      console.error(
        "Cannot book class. Class ID missing:",
        item
      );
      return;
    }

    if (typeof onBook === "function") {
      onBook(item);
    }
  };


  /* =======================================================
     FORMAT TIME
  ======================================================= */

  const formattedTime =
    startDate && startTime
      ? formatTimeWithTimezone(
          startDate,
          startTime,
          timezone
        )
      : "--";


  /* =======================================================
     DAYS
  ======================================================= */

  const formattedDays =
    Array.isArray(availableDays) &&
    availableDays.length
      ? availableDays
          .map((day) =>
            String(day).substring(0, 3).toUpperCase()
          )
          .join(" • ")
      : "--";


  /* =======================================================
     CARD
  ======================================================= */

  return (
    <article
      className="
        group
        relative
        w-full
        max-w-[360px]
        h-[650px]
        min-w-0
        overflow-hidden
        flex
        flex-col
        border
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-[0_20px_45px_rgba(0,0,0,0.25)]
      "
      style={{
        backgroundColor:
          branding.cardBackgroundColor,

        borderColor:
          withOpacity(
            branding.textColor,
            "18"
          ),

        borderRadius:
          "18px",

        boxSizing:
          "border-box",
      }}
    >

      {/* =====================================================
          IMAGE
      ===================================================== */}

      <Link
        to={`/institute/website/preview/classes/${classId}`}
        onClick={(event) =>
          event.stopPropagation()
        }
        className="
          relative
          block
          w-full
          h-[210px]
          shrink-0
          overflow-hidden
        "
      >

        <img
          src={image}
          alt={title}
          className="
            block
            h-full
            w-full
            object-cover
            transition-transform
            duration-500
            group-hover:scale-105
          "
          loading="lazy"
        />

        {/* Image Gradient */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-t
            from-black/80
            via-black/20
            to-transparent
          "
        />


        {/* =================================================
            INSTITUTE
        ================================================= */}

        <div
          className="
            absolute
            left-3
            top-3
            z-20
            max-w-[65%]
          "
        >

          <div
            className="
              flex
              max-w-full
              items-center
              gap-2
              border
              px-3
              py-1.5
              backdrop-blur-md
            "
            style={{
              backgroundColor:
                "rgba(0,0,0,0.72)",

              borderColor:
                withOpacity(
                  branding.buttonColor,
                  "55"
                ),

              borderRadius:
                "9px",
            }}
          >

            <span className="text-[10px]">
              🏛
            </span>

            <span
              className="
                max-w-[150px]
                truncate
                text-[11px]
              "
              style={{
                color:
                  branding.buttonColor,

                fontFamily:
                  fontFamily(
                    branding.fontBody
                  ),

                fontWeight:
                  branding.bodyWeight,
              }}
            >
              {instituteName}
            </span>

          </div>

        </div>


        {/* =================================================
            LEVEL
        ================================================= */}

        <span
          className="
            absolute
            bottom-3
            left-3
            z-20
            max-w-[50%]
            truncate
            px-3
            py-1.5
            text-[11px]
            font-semibold
          "
          style={{
            backgroundColor:
              branding.buttonColor,

            color:
              branding.buttonTextColor,

            borderRadius:
              "999px",

            fontFamily:
              fontFamily(
                branding.fontBody
              ),
          }}
        >
          {level}
        </span>


        {/* =================================================
            DURATION
        ================================================= */}

        <div
          className="
            absolute
            bottom-3
            right-3
            z-20
            flex
            items-center
            gap-1.5
            px-3
            py-1.5
            backdrop-blur-md
          "
          style={{
            backgroundColor:
              "rgba(0,0,0,0.72)",

            borderRadius:
              "999px",
          }}
        >

          <FaClock
            className="text-[10px]"
            style={{
              color:
                branding.iconColor,
            }}
          />

          <span
            className="
              max-w-[80px]
              truncate
              text-[11px]
            "
            style={{
              color:
                "#FFFFFF",

              fontFamily:
                fontFamily(
                  branding.fontBody
                ),
            }}
          >
            {duration}
          </span>

        </div>

      </Link>


      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div
        className="
          flex
          min-h-0
          flex-1
          flex-col
          p-5
        "
      >

        {/* =================================================
            CATEGORY
        ================================================= */}

        <p
          className="
            mb-1
            shrink-0
            truncate
            text-[11px]
            uppercase
            tracking-[0.12em]
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
          {subcategory}
        </p>


        {/* =================================================
            TITLE
        ================================================= */}

        <Link
          to={`/institute/website/preview/classes/${classId}`}
          onClick={(event) =>
            event.stopPropagation()
          }
          className="
            block
            shrink-0
          "
        >

          <h3
            className="
              mb-4
              min-h-[48px]
              max-h-[48px]
              overflow-hidden
              text-[21px]
              leading-[24px]
              line-clamp-2
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

              letterSpacing:
                branding.headingLetterSpacing,
            }}
          >
            {title}
          </h3>

        </Link>


        {/* =================================================
            TRAINER
        ================================================= */}

        <div
          className="
            mb-5
            flex
            min-h-[48px]
            shrink-0
            items-center
            gap-3
          "
        >

          {/* Trainer Image */}

          <img
            src={trainerImage}
            alt={trainerName}
            className="
              h-11
              w-11
              shrink-0
              rounded-full
              object-cover
            "
            style={{
              border:
                `2px solid ${branding.buttonColor}`,
            }}
          />


          {/* Trainer Details */}

          <div
            className="
              min-w-0
              flex-1
            "
          >

            <p
              className="
                truncate
                text-[13px]
                leading-[17px]
              "
              style={{
                color:
                  branding.headingColor,

                fontFamily:
                  fontFamily(
                    branding.fontBody
                  ),

                fontWeight:
                  branding.bodyWeight,
              }}
            >
              {trainerName}
            </p>


            <div
              className="
                mt-1
                flex
                items-center
                gap-2
              "
            >

              <StarRating
                rating={rating}
                showValue={false}
                branding={branding}
              />

              <span
                className="
                  text-[11px]
                  font-semibold
                "
                style={{
                  color:
                    branding.iconColor,
                }}
              >
                {rating.toFixed(1)}
              </span>

            </div>

          </div>

        </div>


        {/* =================================================
            DIVIDER
        ================================================= */}

        <div
          className="
            mb-4
            border-t
          "
          style={{
            borderColor:
              withOpacity(
                branding.textColor,
                "18"
              ),
          }}
        />


        {/* =================================================
            SCHEDULE
        ================================================= */}

        <div
          className="
            shrink-0
            space-y-3
          "
        >

          {/* DAYS */}

          <div
            className="
              flex
              min-h-[22px]
              items-center
              justify-between
              gap-3
            "
          >

            <div
              className="
                flex
                shrink-0
                items-center
                gap-2
                text-[12px]
              "
              style={{
                color:
                  branding.textColor,
              }}
            >

              <FaCalendarWeek
                className="text-[12px]"
                style={{
                  color:
                    branding.subheadingColor,
                }}
              />

              <span>
                Days
              </span>

            </div>


            <span
              className="
                max-w-[60%]
                truncate
                text-right
                text-[12px]
              "
              style={{
                color:
                  branding.headingColor,

                fontWeight:
                  branding.bodyWeight,
              }}
            >
              {formattedDays}
            </span>

          </div>


          {/* START DATE */}

          <div
            className="
              flex
              min-h-[22px]
              items-center
              justify-between
              gap-3
            "
          >

            <div
              className="
                flex
                shrink-0
                items-center
                gap-2
                text-[12px]
              "
              style={{
                color:
                  branding.textColor,
              }}
            >

              <FaCalendarAlt
                className="text-[12px]"
                style={{
                  color:
                    branding.buttonColor,
                }}
              />

              <span>
                Start Date
              </span>

            </div>


            <span
              className="
                max-w-[60%]
                truncate
                text-right
                text-[12px]
              "
              style={{
                color:
                  branding.headingColor,

                fontWeight:
                  branding.bodyWeight,
              }}
            >
              {formatDate(
                startDate
              )}
            </span>

          </div>


          {/* START TIME */}

          <div
            className="
              flex
              min-h-[22px]
              items-center
              justify-between
              gap-3
            "
          >

            <div
              className="
                flex
                shrink-0
                items-center
                gap-2
                text-[12px]
              "
              style={{
                color:
                  branding.textColor,
              }}
            >

              <FaClock
                className="text-[12px]"
                style={{
                  color:
                    branding.iconColor,
                }}
              />

              <span>
                Start Time
              </span>

            </div>


            <span
              className="
                max-w-[60%]
                truncate
                text-right
                text-[12px]
              "
              style={{
                color:
                  branding.headingColor,

                fontWeight:
                  branding.bodyWeight,
              }}
            >
              {formattedTime}
            </span>

          </div>

        </div>


        {/* =================================================
            PRICE + STUDENTS
        ================================================= */}

        <div
          className="
            mt-5
            flex
            min-h-[38px]
            shrink-0
            items-end
            justify-between
            gap-3
          "
        >

          {/* PRICE */}

          <div
            className="
              flex
              min-w-0
              items-baseline
              gap-1
            "
          >

            <span
              className="
                text-[25px]
                leading-none
              "
              style={{
                color:
                  branding.iconColor,

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
                text-[11px]
              "
              style={{
                color:
                  branding.textColor,
              }}
            >
              /month
            </span>

          </div>


          {/* STUDENTS */}

          <div
            className="
              flex
              min-w-0
              items-center
              gap-2
            "
            style={{
              color:
                branding.textColor,
            }}
          >

            <FaUsers
              className="
                shrink-0
                text-[12px]
              "
              style={{
                color:
                  branding.buttonColor,
              }}
            />

            <span
              className="
                truncate
                text-[11px]
              "
            >
              {Number(
                students || 0
              ).toLocaleString(
                "en-IN"
              )}{" "}
              Students
            </span>

          </div>

        </div>


        {/* =================================================
            BUTTONS
        ================================================= */}

        <div
          className="
            mt-auto
            grid
            h-[42px]
            shrink-0
            grid-cols-2
            gap-3
          "
        >

          {/* DETAILS */}

          <button
            type="button"
            onClick={
              handleDetails
            }
            className="
              flex
              h-full
              w-full
              items-center
              justify-center
              border
              px-3
              text-[12px]
              font-semibold
              transition-all
              duration-200
              hover:opacity-80
            "
            style={{
              color:
                branding.buttonColor,

              backgroundColor:
                branding.cardBackgroundColor,

              borderColor:
                branding.buttonColor,

              borderRadius:
                buttonRadius(
                  branding
                ),

              fontFamily:
                fontFamily(
                  branding.fontBody
                ),
            }}
          >
            Details
          </button>


          {/* BOOK */}

          <button
            type="button"
            onClick={
              handleBook
            }
            className="
              flex
              h-full
              w-full
              items-center
              justify-center
              gap-2
              border
              px-3
              text-[12px]
              font-semibold
              transition-all
              duration-200
              hover:opacity-90
            "
            style={{
              color:
                branding.buttonTextColor,

              backgroundColor:
                branding.buttonColor,

              borderColor:
                branding.buttonColor,

              borderRadius:
                buttonRadius(
                  branding
                ),

              fontFamily:
                fontFamily(
                  branding.fontBody
                ),
            }}
          >
            <span>
              Book
            </span>

            <FaArrowRight
              size={10}
            />
          </button>

        </div>

      </div>

    </article>
  );
};

/* =========================================================
   CATEGORY CARD
========================================================= */

const CategoryCard = ({
  category,
  count,
  active,
  onClick,
  branding,
}) => {
  const name =
    category?.name ||
    category?.category_name ||
    category?.title ||
    "Category";

  return (
    <button
      type="button"
      onClick={onClick}
      className="
        border
        px-5
        py-6
        text-center
        shadow-sm
        transition-all
        duration-200
        hover:-translate-y-1
        hover:shadow-md
      "
      style={{
        backgroundColor:
          branding.cardBackgroundColor,

        borderColor:
          active
            ? branding.buttonColor
            : withOpacity(
                branding.textColor,
                "18"
              ),

        borderRadius:
          "12px",

        fontFamily:
          fontFamily(
            branding.fontBody
          ),
      }}
    >

      <div
        className="
          mx-auto
          mb-4
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-full
        "
        style={{
          backgroundColor:
            withOpacity(
              branding.buttonColor,
              "12"
            ),

          color:
            branding.iconColor,
        }}
      >

        <span
          className="text-2xl"
          style={{
            fontFamily:
              fontFamily(
                branding.fontHeading
              ),

            fontWeight:
              branding.headingWeight,
          }}
        >
          {String(name)
            .charAt(0)
            .toUpperCase()}
        </span>

      </div>


      <h3
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
        {name}
      </h3>


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

          fontWeight:
            branding.bodyWeight,
        }}
      >
        {count}{" "}
        {count === 1
          ? "Class"
          : "Classes"}
      </p>

    </button>
  );
};


/* =========================================================
   MAIN COMPONENT
========================================================= */

const WebsiteClasses = () => {

  const outlet =
    useOutletContext() || {};


  /* =======================================================
     WEBSITE DATA
  ======================================================= */

  const website =
    outlet?.website ||
    outlet?.websiteData ||
    {};


  const classes =
    outlet?.classes ||
    website?.classes ||
    [];


  const categories =
    outlet?.categories ||
    website?.categories ||
    [];


  const subcategories =
    outlet?.subcategories ||
    website?.subcategories ||
    [];


  const banners =
    outlet?.banners ||
    website?.banners ||
    [];


  const rawBranding =
    outlet?.branding ||
    website?.branding ||
    {};


  const rawSections =
    outlet?.sections ||
    website?.sections ||
    website?.websiteSections ||
    website?.website_sections ||
    [];


  const rawContent =
    outlet?.content ||
    website?.content ||
    website?.websiteContent ||
    website?.website_content ||
    {};


  /* =======================================================
     BRANDING
  ======================================================= */

  const branding =
    useMemo(
      () =>
        getBranding(
          rawBranding
        ),
      [
        rawBranding,
      ]
    );


  const navigate =
    useNavigate();


  /* =======================================================
     DATA
  ======================================================= */

  const classData =
    Array.isArray(classes)
      ? classes
      : [];


  const categoryData =
    Array.isArray(categories)
      ? categories
      : [];


  const subcategoryData =
    Array.isArray(subcategories)
      ? subcategories
      : [];


  const bannerData =
    Array.isArray(banners)
      ? banners
      : [];


  const sections =
    Array.isArray(
      rawSections
    )
      ? rawSections
      : [];


  /* =======================================================
     CONTENT
  ======================================================= */

  const classesContent =
    rawContent?.classes ||
    rawContent?.Classes ||
    website?.content?.classes ||
    website?.content?.Classes ||
    {};


  const pageHeading =
    findContent(
      classesContent,
      [
        "heading",
        "page_heading",
        "pageHeading",
        "title",
        "main_heading",
        "mainHeading",
      ]
    ) ||
    "Classes";


  const pageSubheading =
    findContent(
      classesContent,
      [
        "subheading",
        "sub_heading",
        "subHeading",
        "page_subheading",
        "pageSubheading",
      ]
    ) ||
    "";


  const categoriesContent =
    classesContent?.categories ||
    classesContent?.Categories ||
    {};


  const categoriesHeading =
    findContent(
      categoriesContent,
      [
        "heading",
        "title",
        "main_heading",
        "mainHeading",
      ]
    ) ||
    "Browse by Category";


  const categoriesSubheading =
    findContent(
      categoriesContent,
      [
        "subheading",
        "sub_heading",
        "subHeading",
      ]
    ) ||
    "";


  const classesListContent =
    classesContent?.classes ||
    classesContent?.class_list ||
    classesContent?.classList ||
    classesContent?.list ||
    {};


  const classesListHeading =
    findContent(
      classesListContent,
      [
        "heading",
        "title",
        "main_heading",
        "mainHeading",
      ]
    ) ||
    "Choose Your Class";


  const classesListSubheading =
    findContent(
      classesListContent,
      [
        "subheading",
        "sub_heading",
        "subHeading",
      ]
    ) ||
    "";


  const ctaContent =
    classesContent?.cta ||
    classesContent?.CTA ||
    {};


  const ctaHeading =
    findContent(
      ctaContent,
      [
        "heading",
        "title",
        "main_heading",
        "mainHeading",
      ]
    ) ||
    "Ready to start learning?";


  const ctaSubheading =
    findContent(
      ctaContent,
      [
        "subheading",
        "sub_heading",
        "subHeading",
        "description",
      ]
    ) ||
    "Choose your favorite class and begin your learning journey today.";


  const ctaButtonText =
    findContent(
      ctaContent,
      [
        "button",
        "button_text",
        "buttonText",
        "button_label",
        "buttonLabel",
      ]
    ) ||
    "Explore Classes";


  /* =======================================================
     SECTION VISIBILITY
  ======================================================= */

  const bannerSection =
    findSection(
      sections,
      "classes_banner",
      "class_banner",
      "classes_hero",
      "class_hero",
      "banner"
    );


  const categoriesSection =
    findSection(
      sections,
      "classes_categories",
      "class_categories",
      "categories"
    );


  const classesSection =
    findSection(
      sections,
      "classes_list",
      "class_list",
      "classes"
    );


  const ctaSection =
    findSection(
      sections,
      "classes_cta",
      "class_cta",
      "cta"
    );


  const showBanner =
    isEnabled(
      bannerSection?.is_visible ??
        bannerSection?.isVisible ??
        bannerSection?.visible ??
        bannerSection?.enabled,
      true
    );


  const showCategories =
    isEnabled(
      categoriesSection?.is_visible ??
        categoriesSection?.isVisible ??
        categoriesSection?.visible ??
        categoriesSection?.enabled,
      true
    );


  const showClasses =
    isEnabled(
      classesSection?.is_visible ??
        classesSection?.isVisible ??
        classesSection?.visible ??
        classesSection?.enabled,
      true
    );


  const showCTA =
    isEnabled(
      ctaSection?.is_visible ??
        ctaSection?.isVisible ??
        ctaSection?.visible ??
        ctaSection?.enabled,
      true
    );


  /* =======================================================
     BOOKING
  ======================================================= */

  const [
    showBookingModal,
    setShowBookingModal,
  ] = useState(false);


  const [
    selectedClass,
    setSelectedClass,
  ] = useState(null);


  const handleOpenBooking =
    (classItem) => {
      setSelectedClass(
        classItem
      );

      setShowBookingModal(
        true
      );
    };


  const handleCloseBooking =
    () => {
      setShowBookingModal(
        false
      );

      setTimeout(() => {
        setSelectedClass(
          null
        );
      }, 200);
    };


  /* =======================================================
     SEARCH
  ======================================================= */

  const [
    searchQuery,
    setSearchQuery,
  ] = useState("");


  const [
    debouncedSearch,
    setDebouncedSearch,
  ] = useState("");


  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("all");


  const [
    selectedSubcategory,
    setSelectedSubcategory,
  ] = useState("all");


  useEffect(() => {

    const timer =
      setTimeout(
        () => {
          setDebouncedSearch(
            searchQuery
          );
        },
        400
      );


    return () =>
      clearTimeout(
        timer
      );

  }, [
    searchQuery,
  ]);


  /* =======================================================
     CATEGORY COUNTS
  ======================================================= */

  const categoryCounts =
    useMemo(() => {

      const counts = {};


      classData.forEach(
        (item) => {

          const categoryId =
            item?.category_id ||
            item?.category?.id ||
            item?.categoryId;


          if (
            categoryId !==
              undefined &&
            categoryId !== null
          ) {

            const key =
              String(
                categoryId
              );


            counts[key] =
              (counts[key] || 0) +
              1;

          }

        }
      );


      return counts;

    }, [
      classData,
    ]);


  /* =======================================================
     SUBCATEGORIES FOR SELECTED CATEGORY
  ======================================================= */

  const visibleSubcategories =
    useMemo(() => {
      if (
        selectedCategory ===
        "all"
      ) {
        return [];
      }

      return subcategoryData.filter(
        (subcategory) => {
          const categoryId =
            subcategory?.category_id ??
            subcategory?.categoryId ??
            subcategory?.category?.id;

          return (
            String(categoryId) ===
            String(selectedCategory)
          );
        }
      );
    }, [
      subcategoryData,
      selectedCategory,
    ]);


  /* =======================================================
     FILTER
  ======================================================= */

  const filteredClasses =
    useMemo(() => {

      const search =
        debouncedSearch
          .trim()
          .toLowerCase();


      return classData.filter(
        (item) => {

          const title =
            getClassTitle(
              item
            );


          const subcategory =
            getSubcategoryName(
              item
            );


          const institute =
            getInstituteName(
              item
            );


          const trainer =
            getTrainerName(
              item
            );


          const searchable =
            `${title} ${subcategory} ${institute} ${trainer}`
              .toLowerCase();


          const searchMatch =
            !search ||
            searchable.includes(
              search
            );


          const categoryId =
            item?.category_id ||
            item?.category?.id ||
            item?.categoryId;


          const categoryMatch =
            selectedCategory ===
              "all" ||
            String(
              categoryId
            ) ===
              String(
                selectedCategory
              );


          const subcategoryId =
            item?.subcategory_id ??
            item?.subcategory?.id ??
            item?.subcategoryId;


          const subcategoryMatch =
            selectedSubcategory ===
              "all" ||
            String(
              subcategoryId
            ) ===
              String(
                selectedSubcategory
              );


          return (
            searchMatch &&
            categoryMatch &&
            subcategoryMatch
          );

        }
      );

    }, [
      classData,
      debouncedSearch,
      selectedCategory,
      selectedSubcategory,
    ]);


  /* =======================================================
     BANNER
  ======================================================= */

  const classBanner =
    bannerData.find(
      (banner) => {

        const type =
          String(
            banner?.banner_type ||
              banner?.type ||
              ""
          ).toLowerCase();


        return (
          type ===
            "class" ||
          type ===
            "classes"
        );

      }
    ) || null;


  const bannerImage =
    classBanner?.image ||
    classBanner?.image_url ||
    classBanner?.banner_image ||
    classBanner?.bannerImage ||
    "";


  const bannerTitle =
    classBanner?.title ||
    pageHeading;


  const bannerDescription =
    classBanner?.description ||
    pageSubheading;


  /* =======================================================
     CLEAR FILTERS
  ======================================================= */

  const clearFilters =
    () => {
      setSearchQuery("");
      setSelectedCategory(
        "all"
      );
      setSelectedSubcategory(
        "all"
      );
    };


  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <>
      <div
        className="
          min-h-screen
          w-full
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

          fontWeight:
            branding.bodyWeight,

          lineHeight:
            branding.bodyLineHeight,

          letterSpacing:
            branding.bodyLetterSpacing,
        }}
      >

        {/* =================================================
            PAGE HEADER
        ================================================= */}

        {showBanner && (
          <section
            className="
              relative
              overflow-hidden
            "
            style={{
              backgroundColor:
                branding.navbarColor,
            }}
          >

            {bannerImage ? (
              <div
                className="
                  relative
                  h-[360px]
                  w-full
                "
              >

                <img
                  src={
                    bannerImage
                  }
                  alt={
                    bannerTitle
                  }
                  className="
                    absolute
                    inset-0
                    h-full
                    w-full
                    object-cover
                  "
                />


                <div
                  className="
                    absolute
                    inset-0
                  "
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(0,0,0,0.72), rgba(0,0,0,0.35), rgba(0,0,0,0.10))",
                  }}
                />


                {/* Banner image only — no title or description overlay */}
                <div
                  className="
                    absolute
                    inset-0
                    z-10
                    pointer-events-none
                  "
                />

              </div>
            ) : (
              <div
                className="
                  mx-auto
                  max-w-7xl
                  px-4
                  py-16
                  text-center
                  sm:px-6
                  lg:px-8
                "
              >

                {pageSubheading && (
                  <p
                    className="
                      text-xs
                      uppercase
                      tracking-[0.15em]
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
                    {pageSubheading}
                  </p>
                )}


                <h1
                  className="
                    mt-3
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
                  }}
                >
                  {pageHeading}
                </h1>

              </div>
            )}

          </section>
        )}


        {/* =================================================
            SEARCH
        ================================================= */}

        {showClasses && (
          <section
            className="
              border-b
            "
            style={{
              backgroundColor:
                branding.cardBackgroundColor,

              borderColor:
                withOpacity(
                  branding.textColor,
                  "12"
                ),
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

              <div
                className="
                  grid
                  grid-cols-1
                  gap-3
                  md:grid-cols-[1fr_280px]
                "
              >

                {/* SEARCH */}

                <div
                  className="
                    relative
                  "
                >

                  <FaSearch
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                    "
                    style={{
                      color:
                        branding.iconColor,
                    }}
                  />


                  <input
                    type="text"
                    value={
                      searchQuery
                    }
                    onChange={(
                      event
                    ) =>
                      setSearchQuery(
                        event.target
                          .value
                      )
                    }
                    placeholder="Search classes..."
                    className="
                      w-full
                      border
                      py-3.5
                      pl-11
                      pr-11
                      text-sm
                      outline-none
                    "
                    style={{
                      backgroundColor:
                        branding.cardBackgroundColor,

                      color:
                        branding.textColor,

                      borderColor:
                        withOpacity(
                          branding.textColor,
                          "22"
                        ),

                      borderRadius:
                        buttonRadius(
                          branding
                        ),

                      fontFamily:
                        fontFamily(
                          branding.fontBody
                        ),
                    }}
                  />


                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() =>
                        setSearchQuery(
                          ""
                        )
                      }
                      className="
                        absolute
                        right-4
                        top-1/2
                        -translate-y-1/2
                      "
                      style={{
                        color:
                          branding.iconColor,
                      }}
                    >
                      <FaTimes />
                    </button>
                  )}

                </div>


                {/* CATEGORY */}

                <div
                  className="
                    relative
                  "
                >

                  <FaFilter
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                    "
                    style={{
                      color:
                        branding.iconColor,
                    }}
                  />


                  <select
                    value={
                      selectedCategory
                    }
                    onChange={(
                      event
                    ) =>
                      setSelectedCategory(
                        event.target
                          .value
                      )
                    }
                    className="
                      w-full
                      appearance-none
                      border
                      py-3.5
                      pl-11
                      pr-10
                      text-sm
                      outline-none
                    "
                    style={{
                      backgroundColor:
                        branding.cardBackgroundColor,

                      color:
                        branding.textColor,

                      borderColor:
                        withOpacity(
                          branding.textColor,
                          "22"
                        ),

                      borderRadius:
                        buttonRadius(
                          branding
                        ),

                      fontFamily:
                        fontFamily(
                          branding.fontBody
                        ),
                    }}
                  >

                    <option value="all">
                      All Categories
                    </option>


                    {categoryData.map(
                      (category) => {

                        const id =
                          category?.id ||
                          category?.category_id;


                        const name =
                          category?.name ||
                          category?.category_name ||
                          category?.title ||
                          "Category";


                        return (
                          <option
                            key={id}
                            value={id}
                          >
                            {name}
                          </option>
                        );

                      }
                    )}

                  </select>


                  <FaChevronDown
                    className="
                      pointer-events-none
                      absolute
                      right-4
                      top-1/2
                      -translate-y-1/2
                    "
                    style={{
                      color:
                        branding.iconColor,
                    }}
                  />

                </div>


                {/* SUBCATEGORY */}

                <div
                  className="
                    relative
                  "
                >

                  <FaFilter
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                    "
                    style={{
                      color:
                        branding.iconColor,
                    }}
                  />


                  <select
                    value={
                      selectedSubcategory
                    }
                    disabled={
                      selectedCategory ===
                        "all" ||
                      visibleSubcategories.length ===
                        0
                    }
                    onChange={(
                      event
                    ) =>
                      setSelectedSubcategory(
                        event.target.value
                      )
                    }
                    className="
                      w-full
                      appearance-none
                      border
                      py-3.5
                      pl-11
                      pr-10
                      text-sm
                      outline-none
                      disabled:cursor-not-allowed
                      disabled:opacity-60
                    "
                    style={{
                      backgroundColor:
                        branding.cardBackgroundColor,

                      color:
                        branding.textColor,

                      borderColor:
                        withOpacity(
                          branding.textColor,
                          "22"
                        ),

                      borderRadius:
                        buttonRadius(
                          branding
                        ),

                      fontFamily:
                        fontFamily(
                          branding.fontBody
                        ),
                    }}
                  >

                    <option value="all">
                      {selectedCategory ===
                        "all"
                        ? "Select a Category First"
                        : visibleSubcategories.length
                          ? "All Subcategories"
                          : "No Subcategories"}
                    </option>


                    {visibleSubcategories.map(
                      (subcategory) => {

                        const id =
                          subcategory?.id ??
                          subcategory?.subcategory_id;

                        const name =
                          subcategory?.name ||
                          subcategory?.subcategory_name ||
                          subcategory?.title ||
                          "Subcategory";

                        return (
                          <option
                            key={id}
                            value={id}
                          >
                            {name}
                          </option>
                        );
                      }
                    )}

                  </select>


                  <FaChevronDown
                    className="
                      pointer-events-none
                      absolute
                      right-4
                      top-1/2
                      -translate-y-1/2
                    "
                    style={{
                      color:
                        branding.iconColor,
                    }}
                  />

                </div>

              </div>

            </div>

          </section>
        )}


        {/* =================================================
            CATEGORIES
        ================================================= */}

        {showCategories && (
          <section
            className="
              py-12
              sm:py-16
            "
            style={{
              backgroundColor:
                branding.pageBackgroundColor,
            }}
          >

            <div
              className="
                mx-auto
                max-w-7xl
                px-4
                sm:px-6
                lg:px-8
              "
            >

              <div
                className="
                  mb-8
                  text-center
                "
              >

                {categoriesSubheading && (
                  <p
                    className="
                      text-xs
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
                    {categoriesSubheading}
                  </p>
                )}


                <h2
                  className="
                    mt-2
                    text-3xl
                    sm:text-4xl
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
                  {categoriesHeading}
                </h2>

              </div>


              {categoryData.length >
              0 ? (
                <div
                  className="
                    grid
                    grid-cols-2
                    gap-3
                    sm:grid-cols-3
                    lg:grid-cols-6
                  "
                >

                  {categoryData.map(
                    (
                      category
                    ) => {

                        const id =
                          category?.id ||
                          category?.category_id;


                        return (
                          <CategoryCard
                            key={id}
                            category={
                              category
                            }
                            count={
                              categoryCounts[
                                String(
                                  id
                                )
                              ] || 0
                            }
                            active={
                              String(
                                selectedCategory
                              ) ===
                              String(id)
                            }
                            branding={
                              branding
                            }
                            onClick={() => {
                              const nextCategory =
                                String(
                                  selectedCategory
                                ) ===
                                String(id)
                                  ? "all"
                                  : String(id);

                              setSelectedCategory(
                                nextCategory
                              );

                              setSelectedSubcategory(
                                "all"
                              );
                            }}
                          />
                        );

                      }
                    )}

                </div>
              ) : (
                <div
                  className="
                    border
                    border-dashed
                    py-12
                    text-center
                    text-sm
                  "
                  style={{
                    backgroundColor:
                      branding.cardBackgroundColor,

                    color:
                      branding.textColor,

                    borderColor:
                      withOpacity(
                        branding.textColor,
                        "25"
                      ),

                    borderRadius:
                      "12px",
                  }}
                >
                  No categories
                  available.
                </div>
              )}

            </div>

          </section>
        )}


        {/* =================================================
            CLASSES LIST
        ================================================= */}

        {showClasses && (
          <section
            id="classes-list"
            className="
              py-12
              sm:py-16
            "
            style={{
              backgroundColor:
                withOpacity(
                  branding.subheadingColor,
                  "06"
                ),
            }}
          >

            <div
              className="
                mx-auto
                max-w-7xl
                px-4
                sm:px-6
                lg:px-8
              "
            >

              <div
                className="
                  mb-8
                  text-center
                "
              >

                {classesListSubheading && (
                  <p
                    className="
                      text-xs
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
                    {classesListSubheading}
                  </p>
                )}


                <h2
                  className="
                    mt-2
                    text-3xl
                    sm:text-4xl
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
                  {classesListHeading}
                </h2>

              </div>


              {/* FILTER RESULT */}

              {(selectedCategory !==
                "all" ||
                selectedSubcategory !==
                "all" ||
                debouncedSearch) && (
                <div
                  className="
                    mb-6
                    flex
                    flex-wrap
                    items-center
                    justify-between
                    gap-3
                  "
                >

                  <p
                    className="text-sm"
                    style={{
                      color:
                        branding.textColor,
                    }}
                  >
                    Showing{" "}
                    <span
                      style={{
                        color:
                          branding.buttonColor,

                        fontWeight:
                          branding.headingWeight,
                      }}
                    >
                      {
                        filteredClasses.length
                      }
                    </span>{" "}
                    classes
                  </p>


                  <button
                    type="button"
                    onClick={
                      clearFilters
                    }
                    className="
                      inline-flex
                      items-center
                      gap-2
                      text-xs
                    "
                    style={{
                      color:
                        branding.buttonColor,

                      fontFamily:
                        fontFamily(
                          branding.fontBody
                        ),
                    }}
                  >
                    <FaTimes />

                    Clear Filters
                  </button>

                </div>
              )}


              {/* CLASS GRID */}

              {filteredClasses.length >
              0 ? (
                <div
                  className="
                    grid
                    grid-cols-1
                    gap-6
                    sm:grid-cols-2
                    lg:grid-cols-3
                    xl:grid-cols-4
                  "
                >

                  {filteredClasses.map(
                    (item) => (
                      <ClassCard
                        key={
                          getClassId(
                            item
                          )
                        }
                        item={
                          item
                        }
                        branding={
                          branding
                        }
                        onBook={
                          handleOpenBooking
                        }
                      />
                    )
                  )}

                </div>
              ) : (
                <div
                  className="
                    border
                    border-dashed
                    px-6
                    py-16
                    text-center
                  "
                  style={{
                    backgroundColor:
                      branding.cardBackgroundColor,

                    borderColor:
                      withOpacity(
                        branding.textColor,
                        "25"
                      ),

                    borderRadius:
                      "16px",
                  }}
                >

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
                      backgroundColor:
                        withOpacity(
                          branding.buttonColor,
                          "12"
                        ),

                      color:
                        branding.iconColor,
                    }}
                  >
                    <FaSearch
                      size={22}
                    />
                  </div>


                  <h3
                    className="
                      mt-5
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
                    }}
                  >
                    No Classes Found
                  </h3>


                  <p
                    className="
                      mx-auto
                      mt-2
                      max-w-md
                      text-sm
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
                    No classes match
                    your current
                    search or category
                    selection.
                  </p>


                  <Button
                    type="button"
                    branding={
                      branding
                    }
                    className="mt-6"
                    onClick={
                      clearFilters
                    }
                  >
                    Clear Filters
                  </Button>

                </div>
              )}

            </div>

          </section>
        )}

      </div>


      {/* =================================================
          BOOKING
      ================================================= */}

      <WebsiteBooking
        isOpen={
          showBookingModal
        }
        selectedClass={
          selectedClass
        }
        onClose={
          handleCloseBooking
        }
      />

    </>
  );
};


export default WebsiteClasses;