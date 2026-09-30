

// import { useEffect, useMemo, useState } from "react";
// import { useNavigate, useOutletContext } from "react-router-dom";
// import {
//   FaArrowRight,
//   FaCalendarAlt,
//   FaCalendarWeek,
//   FaClock,
//   FaSearch,
//   FaUsers,
//   FaTimes,
// } from "react-icons/fa";
// import WebsiteBooking from "./WebsiteBooking";



// const DEFAULT_BRANDING = {
//   navbarColor: "#020817",
//   navbarTextColor: "#FFFFFF",
//   navbarButtonColor: "#008CFF",
//   navbarButtonTextColor: "#FFFFFF",
//   headingColor: "#F8FAFC",
//   subheadingColor: "#60A5FA",
//   textColor: "#CBD5E1",
//   iconColor: "#38BDF8",
//   buttonColor: "#008CFF",
//   buttonTextColor: "#FFFFFF",
//   pageBackgroundColor: "#020817",
//   cardBackgroundColor: "#061426",
//   footerBackgroundColor: "#020817",
//   footerHeadingColor: "#FFFFFF",
//   footerTextColor: "#CBD5E1",
//   footerIconColor: "#FFFFFF",
//   fontHeading: "Inter",
//   fontSubheading: "Inter",
//   fontBody: "Inter",
//   headingWeight: 700,
//   headingLineHeight: 1.15,
//   headingLetterSpacing: "0px",
//   subheadingWeight: 500,
//   subheadingLineHeight: 1.4,
//   bodyWeight: 400,
//   bodyLineHeight: 1.6,
//   bodyLetterSpacing: "0px",
//   roundedButtons: true,
// };

// const getBrandingValue = (branding, camelKey, snakeKey, fallback) => {
//   const value = branding?.[camelKey] ?? branding?.[snakeKey];
//   return value !== undefined && value !== null && value !== ""
//     ? value
//     : fallback;
// };

// const getBranding = (branding = {}) => {
//   const keys = [
//     "navbarColor",
//     "navbarTextColor",
//     "navbarButtonColor",
//     "navbarButtonTextColor",
//     "headingColor",
//     "subheadingColor",
//     "textColor",
//     "iconColor",
//     "buttonColor",
//     "buttonTextColor",
//     "pageBackgroundColor",
//     "cardBackgroundColor",
//     "footerBackgroundColor",
//     "footerHeadingColor",
//     "footerTextColor",
//     "footerIconColor",
//     "fontHeading",
//     "fontSubheading",
//     "fontBody",
//     "headingWeight",
//     "headingLineHeight",
//     "headingLetterSpacing",
//     "subheadingWeight",
//     "subheadingLineHeight",
//     "bodyWeight",
//     "bodyLineHeight",
//     "bodyLetterSpacing",
//     "roundedButtons",
//   ];

//   const result = {};
//   keys.forEach((key) => {
//     const snake = key.replace(/[A-Z]/g, (m) => `_${m.toLowerCase()}`);
//     result[key] = getBrandingValue(
//       branding,
//       key,
//       snake,
//       DEFAULT_BRANDING[key]
//     );
//   });
//   return result;
// };

// const fontFamily = (font) => (font ? `'${font}', sans-serif` : "Inter, sans-serif");

// const withOpacity = (color, opacity = "18") => {
//   if (typeof color === "string" && /^#[0-9a-fA-F]{6}$/.test(color)) {
//     return `${color}${opacity}`;
//   }
//   return color;
// };

// const getValue = (...values) =>
//   values.find(
//     (value) =>
//       value !== undefined &&
//       value !== null &&
//       String(value).trim() !== ""
//   );

// const getArray = (...values) =>
//   values.find((value) => Array.isArray(value)) || [];

// const isEnabled = (value, defaultValue = true) => {
//   if (value === undefined || value === null) return defaultValue;
//   if ([true, 1, "1", "true", "TRUE"].includes(value)) return true;
//   if ([false, 0, "0", "false", "FALSE"].includes(value)) return false;
//   return defaultValue;
// };

// const findSection = (sections, ...keys) => {
//   if (!Array.isArray(sections)) return null;

//   const normalizedKeys = keys.map((key) =>
//     String(key).trim().toLowerCase().replace(/[\s-]+/g, "_")
//   );

//   return (
//     sections.find((section) => {
//       const candidates = [
//         section?.section_key,
//         section?.sectionKey,
//         section?.section_name,
//         section?.sectionName,
//         section?.key,
//         section?.name,
//         section?.slug,
//         section?.page_section,
//         section?.pageSection,
//       ];

//       return candidates.some((candidate) => {
//         if (candidate === undefined || candidate === null) return false;
//         const normalized = String(candidate)
//           .trim()
//           .toLowerCase()
//           .replace(/[\s-]+/g, "_");
//         return normalizedKeys.includes(normalized);
//       });
//     }) || null
//   );
// };

// const findContent = (content, keys) => {
//   if (!content || typeof content !== "object") return "";
//   for (const key of keys) {
//     const value = content?.[key];
//     if (value !== undefined && value !== null && String(value).trim() !== "") {
//       return value;
//     }
//   }
//   return "";
// };

// /* ---------------------------- Data helpers ---------------------------- */

// const getClassId = (item) => item?.id || item?.class_id;

// const getClassTitle = (item) =>
//   item?.title || item?.class_title || item?.name || "Class";

// const getClassImage = (item) =>
//   item?.image ||
//   item?.class_image ||
//   item?.image_url ||
//   item?.thumbnail ||
//   item?.thumbnail_url ||
//   "";

// const getInstituteName = (item) =>
//   item?.institute_name || item?.institute?.name || item?.instituteName || "Institute";

// const getCategoryName = (item) =>
//   item?.category_name || item?.category?.name || item?.categoryName || "Category";

// const getSubcategoryName = (item) =>
//   item?.subcategory_name ||
//   item?.subcategory?.name ||
//   item?.subcategoryName ||
//   "General";

// const getTrainerName = (item) =>
//   item?.trainer_name || item?.trainerName || item?.trainer?.name || "Expert Trainer";

// const getTrainerImage = (item) =>
//   item?.trainer_image || item?.trainerImage || item?.trainer?.image || "";

// const getLevel = (item) =>
//   item?.level || item?.class_level || item?.difficulty || "All Levels";

// const getDuration = (item) =>
//   item?.duration || item?.class_duration || item?.duration_minutes || "--";

// const getAvailableDays = (item) => {
//   const value =
//     item?.available_days ??
//     item?.availableDays ??
//     item?.days ??
//     item?.schedule_days;

//   if (Array.isArray(value)) return value.filter(Boolean);

//   if (typeof value === "string") {
//     const trimmed = value.trim();
//     if (!trimmed) return [];

//     try {
//       const parsed = JSON.parse(trimmed);
//       if (Array.isArray(parsed)) return parsed.filter(Boolean);
//     } catch {
//       // comma-separated fallback
//     }

//     return trimmed
//       .split(",")
//       .map((day) => day.trim())
//       .filter(Boolean);
//   }

//   return [];
// };

// const formatDate = (dateValue) => {
//   if (!dateValue) return "--";
//   const date = new Date(dateValue);
//   if (Number.isNaN(date.getTime())) return String(dateValue);

//   return date.toLocaleDateString("en-IN", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });
// };

// const formatTime = (timeValue) => {
//   if (!timeValue) return "--";
//   const value = String(timeValue);

//   if (/am|pm/i.test(value)) return value;

//   const parts = value.split(":");
//   if (parts.length < 2) return value;

//   const hours = Number(parts[0]);
//   const minutes = Number(parts[1]);
//   if (Number.isNaN(hours) || Number.isNaN(minutes)) return value;

//   const period = hours >= 12 ? "PM" : "AM";
//   const hour12 = hours % 12 || 12;
//   return `${hour12}:${String(minutes).padStart(2, "0")} ${period}`;
// };

// const formatTimeWithTimezone = (date, time, timezone) => {
//   if (!date || !time) return "--";

//   try {
//     const dateTime = new Date(`${date}T${time}`);
//     if (Number.isNaN(dateTime.getTime())) {
//       return `${formatTime(time)} ${timezone || ""}`.trim();
//     }

//     return dateTime.toLocaleTimeString("en-IN", {
//       hour: "numeric",
//       minute: "2-digit",
//       hour12: true,
//       timeZone: timezone || "Asia/Kolkata",
//       timeZoneName: "short",
//     });
//   } catch {
//     return `${formatTime(time)} ${timezone || ""}`.trim();
//   }
// };

// const getImage = (item, type = "category") => {
//   if (!item) return "";

//   if (type === "subcategory") {
//     return (
//       item?.image ||
//       item?.subcategory_image ||
//       item?.image_url ||
//       item?.thumbnail ||
//       item?.thumbnail_url ||
//       ""
//     );
//   }

//   return (
//     item?.image ||
//     item?.category_image ||
//     item?.image_url ||
//     item?.thumbnail ||
//     item?.thumbnail_url ||
//     ""
//   );
// };

// const getId = (item) =>
//   item?.id ?? item?.category_id ?? item?.categoryId;

// const getSubcategoryId = (item) =>
//   item?.id ?? item?.subcategory_id ?? item?.subcategoryId;

// const getCategoryIdFromSubcategory = (item) =>
//   item?.category_id ?? item?.categoryId ?? item?.category?.id;

// const getItemCategoryId = (item) =>
//   item?.category_id ?? item?.categoryId ?? item?.category?.id;

// const getItemSubcategoryId = (item) =>
//   item?.subcategory_id ?? item?.subcategoryId ?? item?.subcategory?.id;

// /* ---------------------------- UI helpers ---------------------------- */

// const SectionHeading = ({ eyebrow, heading, subheading, branding }) => (
//   <div className="mx-auto mb-8 max-w-3xl text-center">
//     {eyebrow && (
//       <p
//         className="mb-2 text-xs font-semibold uppercase tracking-[0.22em]"
//         style={{
//           color: branding.subheadingColor,
//           fontFamily: fontFamily(branding.fontSubheading),
//         }}
//       >
//         {eyebrow}
//       </p>
//     )}

//     <div className="flex items-center justify-center gap-3">
//       <span
//         className="hidden h-px w-14 sm:block"
//         style={{
//           background: `linear-gradient(90deg, transparent, ${branding.buttonColor})`,
//         }}
//       />
//       <span
//         className="h-1.5 w-1.5 rotate-45"
//         style={{ backgroundColor: branding.buttonColor }}
//       />
//       <h2
//         className="text-3xl sm:text-4xl"
//         style={{
//           color: branding.headingColor,
//           fontFamily: fontFamily(branding.fontHeading),
//           fontWeight: branding.headingWeight,
//           lineHeight: branding.headingLineHeight,
//         }}
//       >
//         {heading}
//       </h2>
//       <span
//         className="h-1.5 w-1.5 rotate-45"
//         style={{ backgroundColor: branding.buttonColor }}
//       />
//       <span
//         className="hidden h-px w-14 sm:block"
//         style={{
//           background: `linear-gradient(90deg, ${branding.buttonColor}, transparent)`,
//         }}
//       />
//     </div>

//     {subheading && (
//       <p
//         className="mx-auto mt-3 max-w-2xl text-sm sm:text-base"
//         style={{
//           color: branding.textColor,
//           fontFamily: fontFamily(branding.fontBody),
//         }}
//       >
//         {subheading}
//       </p>
//     )}
//   </div>
// );

// const Stars = ({ rating, branding }) => {
//   const value = Math.max(0, Math.min(5, Number(rating) || 0));

//   return (
//     <div className="flex items-center gap-1">
//       <span
//         className="text-xs tracking-[1px]"
//         style={{ color: branding.iconColor }}
//       >
//         {[1, 2, 3, 4, 5].map((star) => (
//           <span
//             key={star}
//             style={{
//               color:
//                 star <= Math.round(value)
//                   ? branding.iconColor
//                   : withOpacity(branding.textColor, "45"),
//             }}
//           >
//             ★
//           </span>
//         ))}
//       </span>
//       <span
//         className="text-xs font-semibold"
//         style={{ color: branding.iconColor }}
//       >
//         {value.toFixed(1)}
//       </span>
//     </div>
//   );
// };

// /* ---------------------------- Category card ---------------------------- */

// const CategoryCard = ({ category, count, active, onClick, branding }) => {
//   const name =
//     category?.name || category?.category_name || category?.title || "Category";
//   const image = getImage(category, "category");

//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       className="group relative overflow-hidden rounded-2xl border text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(0,140,255,0.18)]"
//       style={{
//         backgroundColor: branding.cardBackgroundColor,
//         borderColor: active
//           ? branding.buttonColor
//           : withOpacity(branding.buttonColor, "65"),
//         boxShadow: active
//           ? `0 0 0 1px ${withOpacity(branding.buttonColor, "55")}, 0 0 30px ${withOpacity(
//               branding.buttonColor,
//               "20"
//             )}`
//           : "none",
//       }}
//     >
//       <div className="relative h-44 w-full overflow-hidden">
//         {image ? (
//           <img
//             src={image}
//             alt={name}
//             className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
//             loading="lazy"
//           />
//         ) : (
//           <div
//             className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#071a33] to-[#020817]"
//             style={{ color: branding.buttonColor }}
//           >
//             <span className="text-5xl font-bold">
//               {String(name).charAt(0).toUpperCase()}
//             </span>
//           </div>
//         )}

//         <div className="absolute inset-0 bg-gradient-to-t from-[#020817] via-black/15 to-transparent" />

//         {active && (
//           <span
//             className="absolute right-3 top-3 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
//             style={{
//               backgroundColor: branding.buttonColor,
//               color: branding.buttonTextColor,
//             }}
//           >
//             Selected
//           </span>
//         )}
//       </div>

//       <div className="flex items-center justify-between gap-3 p-4">
//         <div className="min-w-0">
//           <h3
//             className="truncate text-base"
//             style={{
//               color: branding.headingColor,
//               fontFamily: fontFamily(branding.fontHeading),
//               fontWeight: branding.headingWeight,
//             }}
//           >
//             {name}
//           </h3>
//           <p
//             className="mt-1 text-xs"
//             style={{ color: branding.textColor }}
//           >
//             {count} {count === 1 ? "Class" : "Classes"}
//           </p>
//         </div>

//         <FaArrowRight
//           className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
//           size={13}
//           style={{ color: branding.buttonColor }}
//         />
//       </div>
//     </button>
//   );
// };

// /* ---------------------------- Subcategory card ---------------------------- */

// const SubcategoryCard = ({
//   subcategory,
//   count,
//   active,
//   onClick,
//   branding,
// }) => {
//   const name =
//     subcategory?.name ||
//     subcategory?.subcategory_name ||
//     subcategory?.title ||
//     "Subcategory";
//   const image = getImage(subcategory, "subcategory");

//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       className="group overflow-hidden rounded-2xl border text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(0,140,255,0.18)]"
//       style={{
//         backgroundColor: branding.cardBackgroundColor,
//         borderColor: active
//           ? branding.buttonColor
//           : withOpacity(branding.buttonColor, "55"),
//       }}
//     >
//       <div className="relative h-36 w-full overflow-hidden">
//         {image ? (
//           <img
//             src={image}
//             alt={name}
//             className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
//             loading="lazy"
//           />
//         ) : (
//           <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#071a33] to-[#020817]">
//             <span
//               className="text-4xl font-bold"
//               style={{ color: branding.buttonColor }}
//             >
//               {String(name).charAt(0).toUpperCase()}
//             </span>
//           </div>
//         )}

//         <div className="absolute inset-0 bg-gradient-to-t from-[#020817] via-black/10 to-transparent" />

//         {active && (
//           <span
//             className="absolute right-3 top-3 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
//             style={{
//               backgroundColor: branding.buttonColor,
//               color: branding.buttonTextColor,
//             }}
//           >
//             Selected
//           </span>
//         )}
//       </div>

//       <div className="flex items-center justify-between gap-3 p-4">
//         <div className="min-w-0">
//           <h3
//             className="truncate text-sm sm:text-base"
//             style={{
//               color: branding.headingColor,
//               fontFamily: fontFamily(branding.fontHeading),
//               fontWeight: branding.headingWeight,
//             }}
//           >
//             {name}
//           </h3>
//           <p className="mt-1 text-xs" style={{ color: branding.textColor }}>
//             {count} {count === 1 ? "Class" : "Classes"}
//           </p>
//         </div>

//         <FaArrowRight
//           className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
//           size={12}
//           style={{ color: branding.buttonColor }}
//         />
//       </div>
//     </button>
//   );
// };

// /* ---------------------------- Class card ---------------------------- */

// const ClassCard = ({ item, onBook, branding }) => {
//   const navigate = useNavigate();

//   const classId = getClassId(item);
//   const title = getClassTitle(item);
//   const image =
//     getClassImage(item) ||
//     "https://via.placeholder.com/800x500/061426/38BDF8?text=Fine+Arts";

//   const subcategory = getSubcategoryName(item);
//   const trainerName = getTrainerName(item);
//   const trainerImage = getTrainerImage(item);
//   const level = getLevel(item);
//   const duration = getDuration(item);

//   const trainerRating = Number(
//     item?.trainer_rating ??
//       item?.trainerRating ??
//       item?.trainer?.rating ??
//       0
//   );

//   const trainerReviews = Number(
//     item?.trainer_total_reviews ??
//       item?.trainerTotalReviews ??
//       item?.trainer?.total_reviews ??
//       item?.trainer?.totalReviews ??
//       0
//   );

//   const availableDays = getAvailableDays(item);
//   const startDate = item?.start_date || item?.startDate || null;
//   const startTime = item?.start_time || item?.startTime || null;
//   const timezone =
//     item?.timezone || item?.class_timezone || "Asia/Kolkata";

//   const price = Number(item?.price ?? 0);
//   const students = Number(
//     item?.students_count ?? item?.students ?? item?.studentsCount ?? 0
//   );

//   const formattedDays = availableDays.length
//     ? availableDays.map((day) => String(day).substring(0, 3)).join(", ")
//     : "--";

//   const formattedTime =
//     startDate && startTime
//       ? formatTimeWithTimezone(startDate, startTime, timezone)
//       : formatTime(startTime);

//   const handleDetails = () => {
//     if (!classId) return;
//     navigate(`/institute/website/preview/classes/${classId}`);
//   };

//   const handleBook = (event) => {
//     event.preventDefault();
//     event.stopPropagation();
//     if (typeof onBook === "function") onBook(item);
//   };

//   return (
//     <article
//       className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,140,255,0.18)]"
//       style={{
//         backgroundColor: branding.cardBackgroundColor,
//         borderColor: withOpacity(branding.buttonColor, "65"),
//       }}
//     >
//       <button
//         type="button"
//         onClick={handleDetails}
//         className="relative block h-48 w-full shrink-0 overflow-hidden text-left"
//       >
//         <img
//           src={image}
//           alt={title}
//           className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
//           loading="lazy"
//           onError={(event) => {
//             event.currentTarget.onerror = null;
//             event.currentTarget.src =
//               "https://via.placeholder.com/800x500/061426/38BDF8?text=Fine+Arts";
//           }}
//         />

//         <div className="absolute inset-0 bg-gradient-to-t from-[#020817] via-black/15 to-transparent" />

//         <span
//           className="absolute left-3 top-3 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
//           style={{
//             backgroundColor: withOpacity(branding.buttonColor, "E8"),
//             color: branding.buttonTextColor,
//           }}
//         >
//           {subcategory}
//         </span>
//       </button>

//       <div className="flex flex-1 flex-col p-4">
//         <h3
//           className="line-clamp-2 min-h-[48px] text-lg"
//           style={{
//             color: branding.headingColor,
//             fontFamily: fontFamily(branding.fontHeading),
//             fontWeight: branding.headingWeight,
//           }}
//         >
//           {title}
//         </h3>

//         <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-xs">
//           <Info icon={<FaClock />} label="Duration" value={duration} branding={branding} />
//           <Info icon={<span className="text-[11px]">◈</span>} label="Level" value={level} branding={branding} />
//           <Info icon={<FaCalendarWeek />} label="Days" value={formattedDays} branding={branding} />
//           <Info icon={<FaClock />} label="Start Time" value={formattedTime} branding={branding} />
//           <Info icon={<FaCalendarAlt />} label="Start Date" value={formatDate(startDate)} branding={branding} />
//           <Info icon={<FaUsers />} label="Students" value={students} branding={branding} />
//         </div>

//         <div className="mt-4 flex items-center justify-between gap-3 border-t pt-4"
//           style={{ borderColor: withOpacity(branding.buttonColor, "18") }}
//         >
//           <div>
//             <p className="text-[10px] uppercase tracking-wider" style={{ color: branding.textColor }}>
//               Price
//             </p>
//             <p
//               className="mt-1 text-xl"
//               style={{
//                 color: branding.buttonColor,
//                 fontFamily: fontFamily(branding.fontHeading),
//                 fontWeight: branding.headingWeight,
//               }}
//             >
//               ₹{price.toLocaleString("en-IN")}
//             </p>
//           </div>

//           <div className="text-right">
//             <p className="text-[10px] uppercase tracking-wider" style={{ color: branding.textColor }}>
//               Students
//             </p>
//             <p className="mt-1 text-xs font-semibold" style={{ color: branding.headingColor }}>
//               {students.toLocaleString("en-IN")}
//             </p>
//           </div>
//         </div>

//         <div className="mt-4 flex min-w-0 items-center gap-3">
//           <img
//             src={trainerImage || "https://via.placeholder.com/100/061426/38BDF8?text=T"}
//             alt={trainerName}
//             className="h-11 w-11 shrink-0 rounded-full object-cover"
//             style={{ border: `2px solid ${branding.buttonColor}` }}
//             onError={(event) => {
//               event.currentTarget.onerror = null;
//               event.currentTarget.src =
//                 "https://via.placeholder.com/100/061426/38BDF8?text=T";
//             }}
//           />

//           <div className="min-w-0 flex-1">
//             <p className="truncate text-sm font-semibold" style={{ color: branding.headingColor }}>
//               {trainerName}
//             </p>

//             <div className="mt-1 flex items-center gap-2">
//               <Stars rating={trainerRating} branding={branding} />
//               {trainerReviews > 0 && (
//                 <span className="text-[10px]" style={{ color: branding.textColor }}>
//                   ({trainerReviews})
//                 </span>
//               )}
//             </div>
//           </div>
//         </div>

//         <div className="mt-auto grid grid-cols-2 gap-2 pt-5">
//           <button
//             type="button"
//             onClick={handleBook}
//             className="rounded-lg px-3 py-2.5 text-xs font-bold transition hover:brightness-110"
//             style={{
//               backgroundColor: branding.buttonColor,
//               color: branding.buttonTextColor,
//               boxShadow: `0 0 18px ${withOpacity(branding.buttonColor, "35")}`,
//             }}
//           >
//             Book Now
//           </button>

//           <button
//             type="button"
//             onClick={handleDetails}
//             className="rounded-lg border px-3 py-2.5 text-xs font-bold transition hover:bg-white/5"
//             style={{
//               color: branding.headingColor,
//               borderColor: branding.buttonColor,
//               backgroundColor: "transparent",
//             }}
//           >
//             View Details
//           </button>
//         </div>
//       </div>
//     </article>
//   );
// };

// const Info = ({ icon, label, value, branding }) => (
//   <div className="flex min-w-0 items-start gap-2">
//     <span className="mt-0.5 shrink-0" style={{ color: branding.iconColor }}>
//       {icon}
//     </span>
//     <div className="min-w-0">
//       <p className="text-[10px]" style={{ color: branding.textColor }}>
//         {label}
//       </p>
//       <p
//         className="truncate text-xs font-semibold"
//         style={{ color: branding.headingColor }}
//         title={String(value)}
//       >
//         {value}
//       </p>
//     </div>
//   </div>
// );

// /* ---------------------------- Main page ---------------------------- */

// const WebsiteClasses = () => {
//   const outlet = useOutletContext() || {};

//   const website = outlet?.website || outlet?.websiteData || {};
//   const classes = outlet?.classes || website?.classes || [];
//   const categories = outlet?.categories || website?.categories || [];
//   const subcategories = outlet?.subcategories || website?.subcategories || [];
//   const banners = outlet?.banners || website?.banners || [];

//   const rawBranding = outlet?.branding || website?.branding || {};
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

//   const branding = useMemo(() => getBranding(rawBranding), [rawBranding]);

//   const classData = Array.isArray(classes) ? classes : [];

//   const categoryData = useMemo(() => {
//     const source = Array.isArray(categories) ? categories : [];
//     const seen = new Set();

//     return source.filter((category) => {
//       const id = getId(category);
//       if (id === undefined || id === null) return false;

//       const key = String(id);
//       if (seen.has(key)) return false;

//       seen.add(key);
//       return true;
//     });
//   }, [categories]);

//   const subcategoryData = useMemo(() => {
//     const source = Array.isArray(subcategories) ? subcategories : [];
//     const seen = new Set();

//     return source.filter((subcategory) => {
//       const id = getSubcategoryId(subcategory);
//       const categoryId = getCategoryIdFromSubcategory(subcategory);

//       if (
//         id === undefined ||
//         id === null ||
//         categoryId === undefined ||
//         categoryId === null
//       ) {
//         return false;
//       }

//       const key = `${categoryId}-${id}`;
//       if (seen.has(key)) return false;

//       seen.add(key);
//       return true;
//     });
//   }, [subcategories]);

//   const bannerData = Array.isArray(banners) ? banners : [];
//   const sections = Array.isArray(rawSections) ? rawSections : [];

//   const classesContent =
//     rawContent?.classes ||
//     rawContent?.Classes ||
//     website?.content?.classes ||
//     website?.content?.Classes ||
//     {};

//   const pageHeading =
//     findContent(classesContent, [
//       "heading",
//       "page_heading",
//       "pageHeading",
//       "title",
//       "main_heading",
//       "mainHeading",
//     ]) || "Explore Classes";

//   const pageSubheading =
//     findContent(classesContent, [
//       "subheading",
//       "sub_heading",
//       "subHeading",
//       "page_subheading",
//       "pageSubheading",
//     ]) || "Choose a category, explore its subcategories, and find the right class for you.";

//   const categoriesContent =
//     classesContent?.categories || classesContent?.Categories || {};

//   const categoriesHeading =
//     findContent(categoriesContent, [
//       "heading",
//       "title",
//       "main_heading",
//       "mainHeading",
//     ]) || "Explore Categories";

//   const categoriesSubheading =
//     findContent(categoriesContent, [
//       "subheading",
//       "sub_heading",
//       "subHeading",
//     ]) || "Discover creative categories and choose where you want to learn.";

//   const subcategoriesContent =
//     classesContent?.subcategories ||
//     classesContent?.subCategories ||
//     classesContent?.subcategory ||
//     {};

//   const subcategoriesHeading =
//     findContent(subcategoriesContent, [
//       "heading",
//       "title",
//       "main_heading",
//       "mainHeading",
//     ]) || "Explore Subcategories";

//   const subcategoriesSubheading =
//     findContent(subcategoriesContent, [
//       "subheading",
//       "sub_heading",
//       "subHeading",
//     ]) || "Choose a specialized area within your selected category.";

//   const classesListContent =
//     classesContent?.classes ||
//     classesContent?.class_list ||
//     classesContent?.classList ||
//     classesContent?.list ||
//     {};

//   const classesListHeading =
//     findContent(classesListContent, [
//       "heading",
//       "title",
//       "main_heading",
//       "mainHeading",
//     ]) || "Available Classes";

//   const classesListSubheading =
//     findContent(classesListContent, [
//       "subheading",
//       "sub_heading",
//       "subHeading",
//     ]) || "Choose from expert-led classes and start your creative journey.";

//   const bannerSection = findSection(
//     sections,
//     "classes_banner",
//     "class_banner",
//     "classes_hero",
//     "class_hero",
//     "banner"
//   );

//   const categoriesSection = findSection(
//     sections,
//     "classes_categories",
//     "class_categories",
//     "categories"
//   );

//   const classesSection = findSection(
//     sections,
//     "classes_list",
//     "class_list",
//     "classes"
//   );

//   const showBanner = isEnabled(
//     bannerSection?.is_visible ??
//       bannerSection?.isVisible ??
//       bannerSection?.visible ??
//       bannerSection?.enabled,
//     true
//   );

//   const showCategories = isEnabled(
//     categoriesSection?.is_visible ??
//       categoriesSection?.isVisible ??
//       categoriesSection?.visible ??
//       categoriesSection?.enabled,
//     true
//   );

//   const showClasses = isEnabled(
//     classesSection?.is_visible ??
//       classesSection?.isVisible ??
//       classesSection?.visible ??
//       classesSection?.enabled,
//     true
//   );

//   /* ---------------------------- Banner ---------------------------- */

//   const classBanner =
//     bannerData.find((banner) => {
//       const type = String(
//         banner?.banner_type || banner?.type || ""
//       ).toLowerCase();

//       return type === "class" || type === "classes";
//     }) || bannerData[0] || null;

//   const bannerImage =
//     classBanner?.image ||
//     classBanner?.image_url ||
//     classBanner?.banner_image ||
//     classBanner?.bannerImage ||
//     "";

//   /* ---------------------------- Flow state ---------------------------- */

//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [selectedSubcategory, setSelectedSubcategory] = useState("all");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [debouncedSearch, setDebouncedSearch] = useState("");

//   useEffect(() => {
//     const timer = setTimeout(() => setDebouncedSearch(searchQuery), 300);
//     return () => clearTimeout(timer);
//   }, [searchQuery]);

//   const selectedCategoryObject = useMemo(
//     () =>
//       categoryData.find(
//         (category) => String(getId(category)) === String(selectedCategory)
//       ) || null,
//     [categoryData, selectedCategory]
//   );

//   const visibleSubcategories = useMemo(() => {
//     if (selectedCategory === "all") return [];

//     return subcategoryData.filter(
//       (subcategory) =>
//         String(getCategoryIdFromSubcategory(subcategory)) ===
//         String(selectedCategory)
//     );
//   }, [subcategoryData, selectedCategory]);

//   const categoryCounts = useMemo(() => {
//     const counts = {};

//     classData.forEach((item) => {
//       const id = getItemCategoryId(item);
//       if (id !== undefined && id !== null) {
//         const key = String(id);
//         counts[key] = (counts[key] || 0) + 1;
//       }
//     });

//     return counts;
//   }, [classData]);

//   const subcategoryCounts = useMemo(() => {
//     const counts = {};

//     classData.forEach((item) => {
//       const categoryId = getItemCategoryId(item);
//       const subcategoryId = getItemSubcategoryId(item);

//       if (
//         categoryId === undefined ||
//         categoryId === null ||
//         subcategoryId === undefined ||
//         subcategoryId === null ||
//         String(categoryId) !== String(selectedCategory)
//       ) {
//         return;
//       }

//       const key = String(subcategoryId);
//       counts[key] = (counts[key] || 0) + 1;
//     });

//     return counts;
//   }, [classData, selectedCategory]);

//   const filteredClasses = useMemo(() => {
//     const search = debouncedSearch.trim().toLowerCase();

//     if (selectedCategory === "all") return [];

//     return classData.filter((item) => {
//       if (
//         String(getItemCategoryId(item)) !== String(selectedCategory)
//       ) {
//         return false;
//       }

//       if (
//         selectedSubcategory !== "all" &&
//         String(getItemSubcategoryId(item)) !== String(selectedSubcategory)
//       ) {
//         return false;
//       }

//       if (!search) return true;

//       const searchable = [
//         getClassTitle(item),
//         getSubcategoryName(item),
//         getCategoryName(item),
//         getInstituteName(item),
//         getTrainerName(item),
//       ]
//         .filter(Boolean)
//         .join(" ")
//         .toLowerCase();

//       return searchable.includes(search);
//     });
//   }, [
//     classData,
//     debouncedSearch,
//     selectedCategory,
//     selectedSubcategory,
//   ]);

//   const handleCategoryClick = (categoryId) => {
//     const id = String(categoryId);

//     if (String(selectedCategory) === id) {
//       setSelectedCategory("all");
//       setSelectedSubcategory("all");
//       setSearchQuery("");
//       return;
//     }

//     setSelectedCategory(id);
//     setSelectedSubcategory("all");
//     setSearchQuery("");

//     setTimeout(() => {
//       document.getElementById("subcategories-section")?.scrollIntoView({
//         behavior: "smooth",
//         block: "start",
//       });
//     }, 50);
//   };

//   const handleSubcategoryClick = (subcategoryId) => {
//     const id = String(subcategoryId);

//     setSelectedSubcategory((current) =>
//       String(current) === id ? "all" : id
//     );

//     setTimeout(() => {
//       document.getElementById("classes-section")?.scrollIntoView({
//         behavior: "smooth",
//         block: "start",
//       });
//     }, 50);
//   };

//   /* ---------------------------- Booking ---------------------------- */

//   const [showBookingModal, setShowBookingModal] = useState(false);
//   const [selectedClass, setSelectedClass] = useState(null);

//   const handleOpenBooking = (classItem) => {
//     setSelectedClass(classItem);
//     setShowBookingModal(true);
//   };

//   const handleCloseBooking = () => {
//     setShowBookingModal(false);
//     setTimeout(() => setSelectedClass(null), 200);
//   };

//   return (
//     <>
//       <div
//         className="min-h-screen w-full overflow-x-hidden"
//         style={{
//           backgroundColor: branding.pageBackgroundColor,
//           color: branding.textColor,
//           fontFamily: fontFamily(branding.fontBody),
//           fontWeight: branding.bodyWeight,
//           lineHeight: branding.bodyLineHeight,
//           letterSpacing: branding.bodyLetterSpacing,
//         }}
//       >
//         {/* ==================== BANNER ==================== */}
//         {showBanner && (
//           <section className="relative overflow-hidden">
//             {bannerImage ? (
//               <div className="relative h-[230px] w-full sm:h-[300px] lg:h-[350px]">
//                 <img
//                   src={bannerImage}
//                   alt="Classes banner"
//                   className="absolute inset-0 h-full w-full object-cover"
//                 />

//                 <div className="absolute inset-0 bg-gradient-to-r from-[#020817]/75 via-[#020817]/25 to-[#020817]/20" />
//                 <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#020817] to-transparent" />

//                 <div
//                   className="pointer-events-none absolute inset-0"
//                   style={{
//                     boxShadow: `inset 0 0 70px ${withOpacity(
//                       branding.buttonColor,
//                       "22"
//                     )}`,
//                   }}
//                 />
//               </div>
//             ) : (
//               <div className="flex h-[230px] items-center justify-center bg-gradient-to-br from-[#020817] via-[#061a35] to-[#020817] sm:h-[300px] lg:h-[350px]">
//                 <div className="text-center">
//                   <p
//                     className="text-xs uppercase tracking-[0.25em]"
//                     style={{ color: branding.subheadingColor }}
//                   >
//                     Fine Arts
//                   </p>
//                   <h1
//                     className="mt-3 text-4xl sm:text-5xl"
//                     style={{
//                       color: branding.headingColor,
//                       fontFamily: fontFamily(branding.fontHeading),
//                       fontWeight: branding.headingWeight,
//                     }}
//                   >
//                     {pageHeading}
//                   </h1>
//                 </div>
//               </div>
//             )}
//           </section>
//         )}

//         {/* ==================== CATEGORY ==================== */}
//         {showCategories && (
//           <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
//             <div className="mx-auto max-w-7xl">
//               <SectionHeading
//                 eyebrow="Discover"
//                 heading={categoriesHeading}
//                 subheading={categoriesSubheading}
//                 branding={branding}
//               />

//               {categoryData.length > 0 ? (
//                 <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
//                   {categoryData.map((category) => {
//                     const id = getId(category);

//                     return (
//                       <CategoryCard
//                         key={id}
//                         category={category}
//                         count={categoryCounts[String(id)] || 0}
//                         active={
//                           String(selectedCategory) === String(id)
//                         }
//                         branding={branding}
//                         onClick={() => handleCategoryClick(id)}
//                       />
//                     );
//                   })}
//                 </div>
//               ) : (
//                 <EmptyState
//                   title="No Categories Available"
//                   text="Categories will appear here when they are added."
//                   branding={branding}
//                 />
//               )}
//             </div>
//           </section>
//         )}

//         {/* ==================== SUBCATEGORY ==================== */}
//         {showCategories && selectedCategory !== "all" && (
//           <section
//             id="subcategories-section"
//             className="border-y px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
//             style={{
//               background:
//                 "linear-gradient(180deg, rgba(0,140,255,0.045), rgba(2,8,23,0))",
//               borderColor: withOpacity(branding.buttonColor, "18"),
//             }}
//           >
//             <div className="mx-auto max-w-7xl">
//               <SectionHeading
//                 eyebrow={
//                   selectedCategoryObject?.name ||
//                   selectedCategoryObject?.category_name ||
//                   "Selected Category"
//                 }
//                 heading={subcategoriesHeading}
//                 subheading={subcategoriesSubheading}
//                 branding={branding}
//               />

//               {visibleSubcategories.length > 0 ? (
//                 <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
//                   <button
//                     type="button"
//                     onClick={() => setSelectedSubcategory("all")}
//                     className="group overflow-hidden rounded-2xl border text-left transition-all duration-300 hover:-translate-y-1"
//                     style={{
//                       backgroundColor: branding.cardBackgroundColor,
//                       borderColor:
//                         selectedSubcategory === "all"
//                           ? branding.buttonColor
//                           : withOpacity(branding.buttonColor, "55"),
//                     }}
//                   >
//                     <div className="relative flex h-36 items-center justify-center overflow-hidden bg-gradient-to-br from-[#071a33] to-[#020817]">
//                       <div
//                         className="absolute inset-0 opacity-40"
//                         style={{
//                           background:
//                             `radial-gradient(circle at center, ${withOpacity(
//                               branding.buttonColor,
//                               "45"
//                             )}, transparent 60%)`,
//                         }}
//                       />
//                       <span
//                         className="relative text-4xl font-bold"
//                         style={{ color: branding.buttonColor }}
//                       >
//                         All
//                       </span>
//                     </div>
//                     <div className="p-4">
//                       <h3
//                         className="text-base"
//                         style={{
//                           color: branding.headingColor,
//                           fontFamily: fontFamily(branding.fontHeading),
//                           fontWeight: branding.headingWeight,
//                         }}
//                       >
//                         All Subcategories
//                       </h3>
//                       <p
//                         className="mt-1 text-xs"
//                         style={{ color: branding.textColor }}
//                       >
//                         {categoryCounts[String(selectedCategory)] || 0} Classes
//                       </p>
//                     </div>
//                   </button>

//                   {visibleSubcategories.map((subcategory) => {
//                     const id = getSubcategoryId(subcategory);

//                     return (
//                       <SubcategoryCard
//                         key={id}
//                         subcategory={subcategory}
//                         count={subcategoryCounts[String(id)] || 0}
//                         active={
//                           String(selectedSubcategory) === String(id)
//                         }
//                         branding={branding}
//                         onClick={() => handleSubcategoryClick(id)}
//                       />
//                     );
//                   })}
//                 </div>
//               ) : (
//                 <EmptyState
//                   title="No Subcategories Available"
//                   text="There are no subcategories configured for this category yet."
//                   branding={branding}
//                 />
//               )}
//             </div>
//           </section>
//         )}

//         {/* ==================== CLASSES ==================== */}
//         {showClasses && selectedCategory !== "all" && (
//           <section
//             id="classes-section"
//             className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
//           >
//             <div className="mx-auto max-w-7xl">
//               <SectionHeading
//                 eyebrow={
//                   selectedSubcategory !== "all"
//                     ? getValue(
//                         visibleSubcategories.find(
//                           (item) =>
//                             String(getSubcategoryId(item)) ===
//                             String(selectedSubcategory)
//                         )?.name,
//                         visibleSubcategories.find(
//                           (item) =>
//                             String(getSubcategoryId(item)) ===
//                             String(selectedSubcategory)
//                         )?.subcategory_name,
//                         "Selected Subcategory"
//                       )
//                     : selectedCategoryObject?.name ||
//                       selectedCategoryObject?.category_name ||
//                       "Selected Category"
//                 }
//                 heading={classesListHeading}
//                 subheading={
//                   classesListSubheading ||
//                   "Choose from our expert-led classes and start your creative journey."
//                 }
//                 branding={branding}
//               />

//               {/* Search */}
//               <div className="mx-auto mb-8 max-w-2xl">
//                 <div className="relative">
//                   <FaSearch
//                     className="absolute left-4 top-1/2 -translate-y-1/2"
//                     style={{ color: branding.iconColor }}
//                   />

//                   <input
//                     type="text"
//                     value={searchQuery}
//                     onChange={(event) =>
//                       setSearchQuery(event.target.value)
//                     }
//                     placeholder="Search classes..."
//                     className="w-full border py-3.5 pl-11 pr-11 text-sm outline-none transition focus:ring-2"
//                     style={{
//                       backgroundColor: branding.cardBackgroundColor,
//                       color: branding.headingColor,
//                       borderColor: withOpacity(
//                         branding.buttonColor,
//                         "50"
//                       ),
//                       borderRadius: "999px",
//                       fontFamily: fontFamily(branding.fontBody),
//                     }}
//                   />

//                   {searchQuery && (
//                     <button
//                       type="button"
//                       onClick={() => setSearchQuery("")}
//                       className="absolute right-4 top-1/2 -translate-y-1/2"
//                       style={{ color: branding.iconColor }}
//                       aria-label="Clear search"
//                     >
//                       <FaTimes />
//                     </button>
//                   )}
//                 </div>
//               </div>

//               <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
//                 <p className="text-xs" style={{ color: branding.textColor }}>
//                   Showing{" "}
//                   <span
//                     className="font-bold"
//                     style={{ color: branding.buttonColor }}
//                   >
//                     {filteredClasses.length}
//                   </span>{" "}
//                   {filteredClasses.length === 1 ? "class" : "classes"}
//                 </p>

//                 {(selectedSubcategory !== "all" || debouncedSearch) && (
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setSelectedSubcategory("all");
//                       setSearchQuery("");
//                     }}
//                     className="inline-flex items-center gap-2 text-xs font-semibold"
//                     style={{ color: branding.buttonColor }}
//                   >
//                     <FaTimes />
//                     Clear Filter
//                   </button>
//                 )}
//               </div>

//               {filteredClasses.length > 0 ? (
//                 <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
//                   {filteredClasses.map((item) => (
//                     <ClassCard
//                       key={getClassId(item)}
//                       item={item}
//                       branding={branding}
//                       onBook={handleOpenBooking}
//                     />
//                   ))}
//                 </div>
//               ) : (
//                 <EmptyState
//                   title="No Classes Found"
//                   text={
//                     debouncedSearch
//                       ? "No classes match your search."
//                       : selectedSubcategory !== "all"
//                       ? "No classes are available in this subcategory."
//                       : "No classes are available in this category."
//                   }
//                   branding={branding}
//                   action={
//                     <button
//                       type="button"
//                       onClick={() => {
//                         setSelectedSubcategory("all");
//                         setSearchQuery("");
//                       }}
//                       className="mt-5 rounded-full px-5 py-2.5 text-xs font-bold"
//                       style={{
//                         backgroundColor: branding.buttonColor,
//                         color: branding.buttonTextColor,
//                       }}
//                     >
//                       Clear Selection
//                     </button>
//                   }
//                 />
//               )}

//               {/* Intentionally no View More Classes button. */}
//             </div>
//           </section>
//         )}

//         {/* ==================== INITIAL STATE ==================== */}
//         {showClasses && selectedCategory === "all" && (
//           <section className="px-4 pb-16 sm:px-6 lg:px-8">
//             <div className="mx-auto max-w-3xl rounded-2xl border px-6 py-12 text-center"
//               style={{
//                 backgroundColor: branding.cardBackgroundColor,
//                 borderColor: withOpacity(branding.buttonColor, "35"),
//               }}
//             >
//               <div
//                 className="mx-auto flex h-14 w-14 items-center justify-center rounded-full"
//                 style={{
//                   backgroundColor: withOpacity(branding.buttonColor, "14"),
//                   color: branding.buttonColor,
//                 }}
//               >
//                 <FaArrowRight size={18} />
//               </div>

//               <h3
//                 className="mt-5 text-2xl"
//                 style={{
//                   color: branding.headingColor,
//                   fontFamily: fontFamily(branding.fontHeading),
//                   fontWeight: branding.headingWeight,
//                 }}
//               >
//                 Choose a Category
//               </h3>

//               <p
//                 className="mx-auto mt-2 max-w-xl text-sm"
//                 style={{ color: branding.textColor }}
//               >
//                 Select a category above to load its related subcategories and classes.
//               </p>
//             </div>
//           </section>
//         )}
//       </div>

//       <WebsiteBooking
//         isOpen={showBookingModal}
//         selectedClass={selectedClass}
//         onClose={handleCloseBooking}
//       />
//     </>
//   );
// };

// const EmptyState = ({ title, text, branding, action }) => (
//   <div
//     className="rounded-2xl border border-dashed px-6 py-14 text-center"
//     style={{
//       backgroundColor: branding.cardBackgroundColor,
//       borderColor: withOpacity(branding.buttonColor, "35"),
//     }}
//   >
//     <div
//       className="mx-auto flex h-14 w-14 items-center justify-center rounded-full"
//       style={{
//         backgroundColor: withOpacity(branding.buttonColor, "12"),
//         color: branding.buttonColor,
//       }}
//     >
//       <FaSearch size={19} />
//     </div>

//     <h3
//       className="mt-5 text-xl"
//       style={{
//         color: branding.headingColor,
//         fontFamily: fontFamily(branding.fontHeading),
//         fontWeight: branding.headingWeight,
//       }}
//     >
//       {title}
//     </h3>

//     <p className="mx-auto mt-2 max-w-md text-sm" style={{ color: branding.textColor }}>
//       {text}
//     </p>

//     {action}
//   </div>
// );

// export default WebsiteClasses;


import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useNavigate,
  useOutletContext,
  useLocation,
} from "react-router-dom";

import {
  FaArrowRight,
  FaCalendarAlt,
  FaCalendarWeek,
  FaClock,
  FaSearch,
  FaUsers,
  FaTimes,
} from "react-icons/fa";

import WebsiteBooking from "./WebsiteBooking";

import API from "../../services/api";

/* =========================================================
   BLACK + RADIANT BLUE THEME
========================================================= */

const COLORS = {
  black: "#000000",
  page: "#000000",
  pageSecondary: "#02050A",

  card: "#071426",
  cardSecondary: "#06111F",
  cardHover: "#0A1B30",

  blue: "#008CFF",
  radiantBlue: "#38D7FF",
  blueLight: "#60A5FA",

  white: "#FFFFFF",
  heading: "#F8FAFC",
  text: "#CBD5E1",
  textBright: "#E2E8F0",
  muted: "#94A3B8",

  border: "rgba(0,140,255,0.35)",
  borderSoft: "rgba(0,140,255,0.18)",
  borderStrong: "rgba(56,215,255,0.55)",

  blueGlow: "rgba(0,140,255,0.35)",
  radiantGlow: "rgba(56,215,255,0.30)",
};

/* =========================================================
   DEFAULT BRANDING
========================================================= */

const DEFAULT_BRANDING = {
  navbarColor: COLORS.black,
  navbarTextColor: COLORS.white,

  headingColor: COLORS.heading,
  subheadingColor: COLORS.radiantBlue,
  textColor: COLORS.text,
  iconColor: COLORS.radiantBlue,

  buttonColor: COLORS.blue,
  buttonTextColor: COLORS.white,

  cardBackgroundColor: COLORS.card,

  fontHeading: "Inter",
  fontSubheading: "Inter",
  fontBody: "Inter",

  headingWeight: 700,
  headingLineHeight: 1.15,
  headingLetterSpacing: "0px",

  subheadingWeight: 500,
  subheadingLineHeight: 1.4,

  bodyWeight: 400,
  bodyLineHeight: 1.6,
  bodyLetterSpacing: "0px",

  roundedButtons: true,
};

/* =========================================================
   BRANDING HELPER
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

  return value !== undefined &&
    value !== null &&
    value !== ""
    ? value
    : fallback;
};

/* =========================================================
   GET BRANDING
   IMPORTANT:
   Text colors are FORCE-LOCKED to visible colors.
========================================================= */

const getBranding = (
  branding = {}
) => {
  const result = {
    ...DEFAULT_BRANDING,

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
  };

  /*
   * IMPORTANT:
   * Never allow old database branding to make text
   * invisible on the black website.
   */

  result.pageBackgroundColor =
    COLORS.black;

  result.headingColor =
    COLORS.heading;

  result.subheadingColor =
    COLORS.radiantBlue;

  result.textColor =
    COLORS.text;

  result.iconColor =
    COLORS.radiantBlue;

  result.buttonColor =
    COLORS.blue;

  result.buttonTextColor =
    COLORS.white;

  result.cardBackgroundColor =
    COLORS.card;

  return result;
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
   OPACITY HELPER
========================================================= */

const withOpacity = (
  color,
  opacity = "18"
) => {
  if (
    typeof color === "string" &&
    /^#[0-9a-fA-F]{6}$/.test(color)
  ) {
    return `${color}${opacity}`;
  }

  return color;
};

/* =========================================================
   VALUE HELPER
========================================================= */

const getValue = (
  ...values
) =>
  values.find(
    (value) =>
      value !== undefined &&
      value !== null &&
      String(value).trim() !== ""
  );

/* =========================================================
   ENABLED HELPER
========================================================= */

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
    [
      true,
      1,
      "1",
      "true",
      "TRUE",
    ].includes(value)
  ) {
    return true;
  }

  if (
    [
      false,
      0,
      "0",
      "false",
      "FALSE",
    ].includes(value)
  ) {
    return false;
  }

  return defaultValue;
};

/* =========================================================
   SECTION HELPER
========================================================= */

const findSection = (
  sections,
  ...keys
) => {
  if (!Array.isArray(sections)) {
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
   CONTENT HELPER
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
   CLASS HELPERS
========================================================= */

const getClassId = (
  item
) =>
  item?.id ??
  item?.class_id ??
  item?.classId;

const getClassTitle = (
  item
) =>
  item?.title ||
  item?.class_title ||
  item?.classTitle ||
  item?.name ||
  "Class";

const getClassImage = (
  item
) =>
  item?.image ||
  item?.class_image ||
  item?.classImage ||
  item?.image_url ||
  item?.thumbnail ||
  item?.thumbnail_url ||
  "";

const getInstituteName = (
  item
) =>
  item?.institute_name ||
  item?.institute?.name ||
  item?.instituteName ||
  "Institute";

const getCategoryName = (
  item
) =>
  item?.category_name ||
  item?.category?.name ||
  item?.categoryName ||
  "Category";

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
  item?.trainer?.image_url ||
  "";

const getLevel = (
  item
) =>
  item?.level ||
  item?.class_level ||
  item?.difficulty ||
  "All Levels";

const getDuration = (
  item
) =>
  item?.duration ||
  item?.class_duration ||
  item?.duration_minutes ||
  "--";

/* =========================================================
   DAYS
========================================================= */

const getAvailableDays = (
  item
) => {
  const value =
    item?.available_days ??
    item?.availableDays ??
    item?.days ??
    item?.schedule_days;

  if (Array.isArray(value)) {
    return value.filter(Boolean);
  }

  if (typeof value === "string") {
    const trimmed =
      value.trim();

    if (!trimmed) {
      return [];
    }

    try {
      const parsed =
        JSON.parse(trimmed);

      if (Array.isArray(parsed)) {
        return parsed.filter(
          Boolean
        );
      }
    } catch {
      // fallback
    }

    return trimmed
      .split(",")
      .map((day) =>
        day.trim()
      )
      .filter(Boolean);
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
    /am|pm/i.test(value)
  ) {
    return value;
  }

  const parts =
    value.split(":");

  if (parts.length < 2) {
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
  ).padStart(
    2,
    "0"
  )} ${period}`;
};

/* =========================================================
   TIMEZONE
========================================================= */

const formatTimeWithTimezone = (
  date,
  time,
  timezone
) => {
  if (!date || !time) {
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
      )} ${timezone || ""}`.trim();
    }

    return dateTime.toLocaleTimeString(
      "en-IN",
      {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone:
          timezone ||
          "Asia/Kolkata",
        timeZoneName: "short",
      }
    );
  } catch {
    return `${formatTime(
      time
    )} ${timezone || ""}`.trim();
  }
};

/* =========================================================
   IMAGE HELPER
========================================================= */

const getImage = (
  item,
  type = "category"
) => {
  if (!item) {
    return "";
  }

  if (
    type ===
    "subcategory"
  ) {
    return (
      item?.image ||
      item?.subcategory_image ||
      item?.subcategoryImage ||
      item?.image_url ||
      item?.thumbnail ||
      item?.thumbnail_url ||
      ""
    );
  }

  return (
    item?.image ||
    item?.category_image ||
    item?.categoryImage ||
    item?.image_url ||
    item?.thumbnail ||
    item?.thumbnail_url ||
    ""
  );
};

/* =========================================================
   ID HELPERS
========================================================= */

const getId = (
  item
) =>
  item?.id ??
  item?.category_id ??
  item?.categoryId;

const getSubcategoryId = (
  item
) =>
  item?.id ??
  item?.subcategory_id ??
  item?.subcategoryId;

const getCategoryIdFromSubcategory =
  (item) =>
    item?.category_id ??
    item?.categoryId ??
    item?.category?.id;

const getItemCategoryId = (
  item
) =>
  item?.category_id ??
  item?.categoryId ??
  item?.category?.id;

const getItemSubcategoryId = (
  item
) =>
  item?.subcategory_id ??
  item?.subcategoryId ??
  item?.subcategory?.id;

/* =========================================================
   SECTION HEADING
========================================================= */

const SectionHeading = ({
  eyebrow,
  heading,
  subheading,
  branding,
}) => (
  <div className="mx-auto mb-8 max-w-3xl text-center">

    {eyebrow && (
      <p
        className="mb-3 text-xs font-bold uppercase tracking-[0.28em]"
        style={{
          color:
            COLORS.radiantBlue,

          fontFamily:
            fontFamily(
              branding.fontSubheading
            ),

          textShadow:
            "0 0 12px rgba(56,215,255,0.3)",
        }}
      >
        {eyebrow}
      </p>
    )}

    <div className="flex items-center justify-center gap-3">

      <span
        className="hidden h-px w-16 sm:block"
        style={{
          background:
            `linear-gradient(90deg, transparent, ${COLORS.blue})`,
        }}
      />

      <span
        className="h-2 w-2 rotate-45"
        style={{
          backgroundColor:
            COLORS.blue,

          boxShadow:
            `0 0 12px ${COLORS.blue}`,
        }}
      />

      <h2
        className="text-3xl sm:text-4xl"
        style={{
          color:
            COLORS.white,

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

          textShadow:
            "0 0 25px rgba(0,140,255,0.15)",
        }}
      >
        {heading}
      </h2>

      <span
        className="h-2 w-2 rotate-45"
        style={{
          backgroundColor:
            COLORS.radiantBlue,

          boxShadow:
            `0 0 12px ${COLORS.radiantBlue}`,
        }}
      />

      <span
        className="hidden h-px w-16 sm:block"
        style={{
          background:
            `linear-gradient(90deg, ${COLORS.blue}, transparent)`,
        }}
      />

    </div>

    {subheading && (
      <p
        className="mx-auto mt-4 max-w-2xl text-sm leading-6 sm:text-base"
        style={{
          color:
            COLORS.textBright,

          fontFamily:
            fontFamily(
              branding.fontBody
            ),

          fontWeight:
            branding.bodyWeight,
        }}
      >
        {subheading}
      </p>
    )}

  </div>
);

/* =========================================================
   STARS
========================================================= */

const Stars = ({
  rating,
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
    <div className="flex items-center gap-2">

      <span className="text-xs tracking-[2px]">

        {[1, 2, 3, 4, 5].map(
          (star) => (
            <span
              key={star}
              style={{
                color:
                  star <=
                  Math.round(
                    value
                  )
                    ? COLORS.radiantBlue
                    : "rgba(148,163,184,0.35)",
              }}
            >
              ★
            </span>
          )
        )}

      </span>

      <span
        className="text-xs font-semibold"
        style={{
          color:
            COLORS.radiantBlue,
        }}
      >
        {value.toFixed(1)}
      </span>

    </div>
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
}) => {
  const name =
    category?.name ||
    category?.category_name ||
    category?.title ||
    "Category";

  const image =
    getImage(
      category,
      "category"
    );

  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative overflow-hidden rounded-2xl border text-left transition-all duration-300 hover:-translate-y-1"
      style={{
        background:
          `linear-gradient(145deg, ${COLORS.card}, ${COLORS.cardSecondary})`,

        borderColor:
          active
            ? COLORS.radiantBlue
            : COLORS.border,

        boxShadow:
          active
            ? "0 0 0 1px rgba(0,140,255,0.35),0 0 35px rgba(0,140,255,0.16)"
            : "0 12px 35px rgba(0,0,0,0.35)",
      }}
    >

      <div className="relative h-44 w-full overflow-hidden">

        {image ? (
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center"
            style={{
              background:
                "radial-gradient(circle at center,rgba(0,140,255,0.25),transparent 55%),linear-gradient(135deg,#071a33,#000000)",
            }}
          >
            <span
              className="text-5xl font-bold"
              style={{
                color:
                  COLORS.radiantBlue,

                textShadow:
                  "0 0 25px rgba(56,215,255,0.45)",
              }}
            >
              {String(name)
                .charAt(0)
                .toUpperCase()}
            </span>
          </div>
        )}

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top,rgba(0,0,0,0.95),transparent 60%)",
          }}
        />

        {active && (
          <span
            className="absolute right-3 top-3 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
            style={{
              background:
                COLORS.blue,

              color:
                COLORS.white,

              boxShadow:
                "0 0 18px rgba(0,140,255,0.55)",
            }}
          >
            Selected
          </span>
        )}

      </div>

      <div className="flex items-center justify-between gap-3 p-4">

        <div className="min-w-0">

          <h3
            className="truncate text-base"
            style={{
              color:
                COLORS.white,

              fontWeight: 700,
            }}
          >
            {name}
          </h3>

          <p
            className="mt-1 text-xs"
            style={{
              color:
                COLORS.text,
            }}
          >
            {count}{" "}
            {count === 1
              ? "Class"
              : "Classes"}
          </p>

        </div>

        <FaArrowRight
          size={13}
          className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
          style={{
            color:
              COLORS.radiantBlue,

            filter:
              "drop-shadow(0 0 6px rgba(56,215,255,0.5))",
          }}
        />

      </div>

    </button>
  );
};

/* =========================================================
   SUBCATEGORY CARD
========================================================= */

const SubcategoryCard = ({
  subcategory,
  count,
  active,
  onClick,
}) => {
  const name =
    subcategory?.name ||
    subcategory?.subcategory_name ||
    subcategory?.title ||
    "Subcategory";

  const image =
    getImage(
      subcategory,
      "subcategory"
    );

  return (
    <button
      type="button"
      onClick={onClick}
      className="group overflow-hidden rounded-2xl border text-left transition-all duration-300 hover:-translate-y-1"
      style={{
        background:
          `linear-gradient(145deg, ${COLORS.card}, ${COLORS.cardSecondary})`,

        borderColor:
          active
            ? COLORS.radiantBlue
            : COLORS.border,

        boxShadow:
          active
            ? "0 0 30px rgba(0,140,255,0.15)"
            : "none",
      }}
    >

      <div className="relative h-36 w-full overflow-hidden">

        {image ? (
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center"
            style={{
              background:
                "radial-gradient(circle at center,rgba(0,140,255,0.2),transparent 60%),linear-gradient(135deg,#071a33,#000000)",
            }}
          >
            <span
              className="text-4xl font-bold"
              style={{
                color:
                  COLORS.radiantBlue,

                textShadow:
                  "0 0 20px rgba(56,215,255,0.4)",
              }}
            >
              {String(name)
                .charAt(0)
                .toUpperCase()}
            </span>
          </div>
        )}

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top,rgba(0,0,0,0.9),transparent 60%)",
          }}
        />

        {active && (
          <span
            className="absolute right-3 top-3 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
            style={{
              background:
                COLORS.blue,

              color:
                COLORS.white,

              boxShadow:
                "0 0 16px rgba(0,140,255,0.5)",
            }}
          >
            Selected
          </span>
        )}

      </div>

      <div className="flex items-center justify-between gap-3 p-4">

        <div className="min-w-0">

          <h3
            className="truncate text-sm sm:text-base"
            style={{
              color:
                COLORS.white,

              fontWeight: 700,
            }}
          >
            {name}
          </h3>

          <p
            className="mt-1 text-xs"
            style={{
              color:
                COLORS.text,
            }}
          >
            {count}{" "}
            {count === 1
              ? "Class"
              : "Classes"}
          </p>

        </div>

        <FaArrowRight
          size={12}
          className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
          style={{
            color:
              COLORS.radiantBlue,
          }}
        />

      </div>

    </button>
  );
};

/* =========================================================
   INFO
========================================================= */

const Info = ({
  icon,
  label,
  value,
}) => (
  <div className="flex min-w-0 items-start gap-2">

    <span
      className="mt-0.5 shrink-0"
      style={{
        color:
          COLORS.radiantBlue,

        filter:
          "drop-shadow(0 0 5px rgba(56,215,255,0.35))",
      }}
    >
      {icon}
    </span>

    <div className="min-w-0">

      <p
        className="text-[10px]"
        style={{
          color:
            COLORS.muted,
        }}
      >
        {label}
      </p>

      <p
        className="truncate text-xs font-semibold"
        style={{
          color:
            COLORS.textBright,
        }}
        title={String(value)}
      >
        {value}
      </p>

    </div>

  </div>
);

/* =========================================================
   CLASS CARD
========================================================= */

const ClassCard = ({
  item,
  onBook,
}) => {
  const navigate =
    useNavigate();

  const classId =
    getClassId(item);

  const title =
    getClassTitle(item);

  const image =
    getClassImage(item) ||
    "https://via.placeholder.com/800x500/071426/38D7FF?text=Fine+Arts";

  const subcategory =
    getSubcategoryName(item);

  const trainerName =
    getTrainerName(item);

  const trainerImage =
    getTrainerImage(item);

  const level =
    getLevel(item);

  const duration =
    getDuration(item);

  const trainerRating =
    Number(
      item?.trainer_rating ??
      item?.trainerRating ??
      item?.trainer?.rating ??
      0
    );

  const trainerReviews =
    Number(
      item?.trainer_total_reviews ??
      item?.trainerTotalReviews ??
      item?.trainer?.total_reviews ??
      item?.trainer?.totalReviews ??
      0
    );

  const availableDays =
    getAvailableDays(item);

  const startDate =
    item?.start_date ||
    item?.startDate ||
    null;

  const startTime =
    item?.start_time ||
    item?.startTime ||
    null;

  const timezone =
    item?.timezone ||
    item?.class_timezone ||
    "Asia/Kolkata";

  const price =
    Number(
      item?.price ?? 0
    );

  const students =
    Number(
      item?.students_count ??
      item?.students ??
      item?.studentsCount ??
      0
    );

  const formattedDays =
    availableDays.length
      ? availableDays
          .map((day) =>
            String(day)
              .substring(0, 3)
          )
          .join(", ")
      : "--";

  const formattedTime =
    startDate && startTime
      ? formatTimeWithTimezone(
          startDate,
          startTime,
          timezone
        )
      : formatTime(
          startTime
        );

  const handleDetails =
    () => {
      if (!classId) {
        return;
      }

      navigate(
        `/institute/website/preview/classes/${classId}`
      );
    };

  const handleBook =
    (event) => {
      event.preventDefault();
      event.stopPropagation();

      if (
        typeof onBook ===
        "function"
      ) {
        onBook(item);
      }
    };

  return (
    <article
      className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1"
      style={{
        background:
          `linear-gradient(145deg, ${COLORS.card}, ${COLORS.cardSecondary})`,

        borderColor:
          COLORS.border,

        boxShadow:
          "0 15px 45px rgba(0,0,0,0.4)",
      }}
    >

      {/* IMAGE */}

      <button
        type="button"
        onClick={
          handleDetails
        }
        className="relative block h-48 w-full shrink-0 overflow-hidden text-left"
      >

        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(
            event
          ) => {
            event.currentTarget.onerror =
              null;

            event.currentTarget.src =
              "https://via.placeholder.com/800x500/071426/38D7FF?text=Fine+Arts";
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top,rgba(0,0,0,0.95),rgba(0,0,0,0.05) 65%)",
          }}
        />

        <span
          className="absolute left-3 top-3 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
          style={{
            background:
              "rgba(0,140,255,0.92)",

            color:
              COLORS.white,

            boxShadow:
              "0 0 18px rgba(0,140,255,0.45)",
          }}
        >
          {subcategory}
        </span>

      </button>

      {/* CONTENT */}

      <div className="flex flex-1 flex-col p-4">

        <h3
          className="line-clamp-2 min-h-[48px] text-lg"
          style={{
            color:
              COLORS.white,

            fontWeight:
              700,

            lineHeight:
              1.35,
          }}
        >
          {title}
        </h3>

        {/* INFORMATION */}

        <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-xs">

          <Info
            icon={
              <FaClock />
            }
            label="Duration"
            value={duration}
          />

          <Info
            icon={
              <span className="text-[11px]">
                ◈
              </span>
            }
            label="Level"
            value={level}
          />

          <Info
            icon={
              <FaCalendarWeek />
            }
            label="Days"
            value={
              formattedDays
            }
          />

          <Info
            icon={
              <FaClock />
            }
            label="Start Time"
            value={
              formattedTime
            }
          />

          <Info
            icon={
              <FaCalendarAlt />
            }
            label="Start Date"
            value={formatDate(
              startDate
            )}
          />

          <Info
            icon={
              <FaUsers />
            }
            label="Students"
            value={students}
          />

        </div>

        {/* PRICE */}

        <div
          className="mt-4 flex items-center justify-between gap-3 border-t pt-4"
          style={{
            borderColor:
              COLORS.borderSoft,
          }}
        >

          <div>

            <p
              className="text-[10px] uppercase tracking-wider"
              style={{
                color:
                  COLORS.muted,
              }}
            >
              Price
            </p>

            <p
              className="mt-1 text-xl"
              style={{
                color:
                  COLORS.radiantBlue,

                fontWeight:
                  700,

                textShadow:
                  "0 0 12px rgba(56,215,255,0.25)",
              }}
            >
              ₹
              {price.toLocaleString(
                "en-IN"
              )}
            </p>

          </div>

          <div className="text-right">

            <p
              className="text-[10px] uppercase tracking-wider"
              style={{
                color:
                  COLORS.muted,
              }}
            >
              Students
            </p>

            <p
              className="mt-1 text-xs font-semibold"
              style={{
                color:
                  COLORS.white,
              }}
            >
              {students.toLocaleString(
                "en-IN"
              )}
            </p>

          </div>

        </div>

        {/* TRAINER */}

        <div className="mt-4 flex min-w-0 items-center gap-3">

          <img
            src={
              trainerImage ||
              "https://via.placeholder.com/100/071426/38D7FF?text=T"
            }
            alt={trainerName}
            className="h-11 w-11 shrink-0 rounded-full object-cover"
            style={{
              border:
                `2px solid ${COLORS.blue}`,

              boxShadow:
                "0 0 12px rgba(0,140,255,0.25)",
            }}
            onError={(
              event
            ) => {
              event.currentTarget.onerror =
                null;

              event.currentTarget.src =
                "https://via.placeholder.com/100/071426/38D7FF?text=T";
            }}
          />

          <div className="min-w-0 flex-1">

            <p
              className="truncate text-sm font-semibold"
              style={{
                color:
                  COLORS.white,
              }}
            >
              {trainerName}
            </p>

            <div className="mt-1 flex items-center gap-2">

              <Stars
                rating={
                  trainerRating
                }
              />

              {trainerReviews >
                0 && (
                <span
                  className="text-[10px]"
                  style={{
                    color:
                      COLORS.muted,
                  }}
                >
                  (
                  {
                    trainerReviews
                  }
                  )
                </span>
              )}

            </div>

          </div>

        </div>

        {/* ACTIONS */}

        <div className="mt-auto grid grid-cols-2 gap-2 pt-5">

          <button
            type="button"
            onClick={
              handleBook
            }
            className="rounded-lg px-3 py-2.5 text-xs font-bold transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110"
            style={{
              background:
                `linear-gradient(135deg, ${COLORS.blue}, ${COLORS.radiantBlue})`,

              color:
                COLORS.black,

              boxShadow:
                "0 0 20px rgba(0,140,255,0.3)",
            }}
          >
            Book Now
          </button>

          <button
            type="button"
            onClick={
              handleDetails
            }
            className="rounded-lg border px-3 py-2.5 text-xs font-bold transition-all duration-200 hover:bg-blue-500/10"
            style={{
              color:
                COLORS.white,

              borderColor:
                COLORS.blue,

              background:
                "rgba(0,0,0,0.25)",
            }}
          >
            View Details
          </button>

        </div>

      </div>

    </article>
  );
};

/* =========================================================
   EMPTY STATE
========================================================= */

const EmptyState = ({
  title,
  text,
  action,
}) => (
  <div
    className="rounded-2xl border border-dashed px-6 py-14 text-center"
    style={{
      background:
        `linear-gradient(145deg, ${COLORS.card}, ${COLORS.cardSecondary})`,

      borderColor:
        COLORS.border,

      boxShadow:
        "0 15px 50px rgba(0,0,0,0.4)",
    }}
  >

    <div
      className="mx-auto flex h-14 w-14 items-center justify-center rounded-full"
      style={{
        background:
          "rgba(0,140,255,0.1)",

        color:
          COLORS.radiantBlue,

        boxShadow:
          "0 0 25px rgba(0,140,255,0.15)",
      }}
    >
      <FaSearch
        size={19}
      />
    </div>

    <h3
      className="mt-5 text-xl"
      style={{
        color:
          COLORS.white,

        fontWeight:
          700,
      }}
    >
      {title}
    </h3>

    <p
      className="mx-auto mt-2 max-w-md text-sm"
      style={{
        color:
          COLORS.text,
      }}
    >
      {text}
    </p>

    {action}

  </div>
);

/* =========================================================
   MAIN WEBSITE CLASSES
========================================================= */

const WebsiteClasses = () => {
  const outlet =
    useOutletContext() || {};

  const location =
    useLocation();

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

  /* =======================================================
     BANNERS
  ======================================================= */

  const outletBanners =
    outlet?.banners ||
    website?.banners ||
    [];

  /* =======================================================
     BRANDING
  ======================================================= */

  const rawBranding =
    outlet?.branding ||
    website?.branding ||
    {};

  const branding =
    useMemo(
      () =>
        getBranding(
          rawBranding
        ),
      [rawBranding]
    );

  /* =======================================================
     SECTIONS
  ======================================================= */

  const rawSections =
    outlet?.sections ||
    website?.sections ||
    website?.websiteSections ||
    website?.website_sections ||
    [];

  const sections =
    Array.isArray(
      rawSections
    )
      ? rawSections
      : [];

  /* =======================================================
     CONTENT
  ======================================================= */

  const rawContent =
    outlet?.content ||
    website?.content ||
    website?.websiteContent ||
    website?.website_content ||
    {};

  const classesContent =
    rawContent?.classes ||
    rawContent?.Classes ||
    website?.content
      ?.classes ||
    website?.content
      ?.Classes ||
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
    "Explore Classes";

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
    "Choose a category, explore its subcategories, and find the right class for you.";

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
    "Explore Categories";

  const categoriesSubheading =
    findContent(
      categoriesContent,
      [
        "subheading",
        "sub_heading",
        "subHeading",
      ]
    ) ||
    "Discover creative categories and choose where you want to learn.";

  const subcategoriesContent =
    classesContent?.subcategories ||
    classesContent?.subCategories ||
    classesContent?.subcategory ||
    {};

  const subcategoriesHeading =
    findContent(
      subcategoriesContent,
      [
        "heading",
        "title",
        "main_heading",
        "mainHeading",
      ]
    ) ||
    "Explore Subcategories";

  const subcategoriesSubheading =
    findContent(
      subcategoriesContent,
      [
        "subheading",
        "sub_heading",
        "subHeading",
      ]
    ) ||
    "Choose a specialized area within your selected category.";

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
    "Available Classes";

  const classesListSubheading =
    findContent(
      classesListContent,
      [
        "subheading",
        "sub_heading",
        "subHeading",
      ]
    ) ||
    "Choose from expert-led classes and start your creative journey.";

  /* =======================================================
     NORMALIZE DATA
  ======================================================= */

  const classData =
    Array.isArray(classes)
      ? classes
      : [];

  const categoryData =
    useMemo(() => {
      const source =
        Array.isArray(
          categories
        )
          ? categories
          : [];

      const seen =
        new Set();

      return source.filter(
        (category) => {
          const id =
            getId(
              category
            );

          if (
            id === undefined ||
            id === null
          ) {
            return false;
          }

          const key =
            String(id);

          if (
            seen.has(key)
          ) {
            return false;
          }

          seen.add(key);

          return true;
        }
      );
    }, [categories]);

  const subcategoryData =
    useMemo(() => {
      const source =
        Array.isArray(
          subcategories
        )
          ? subcategories
          : [];

      const seen =
        new Set();

      return source.filter(
        (subcategory) => {
          const id =
            getSubcategoryId(
              subcategory
            );

          const categoryId =
            getCategoryIdFromSubcategory(
              subcategory
            );

          if (
            id === undefined ||
            id === null ||
            categoryId ===
              undefined ||
            categoryId === null
          ) {
            return false;
          }

          const key =
            `${categoryId}-${id}`;

          if (
            seen.has(key)
          ) {
            return false;
          }

          seen.add(key);

          return true;
        }
      );
    }, [subcategories]);

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

  /* =======================================================
     INSTITUTE ID
  ======================================================= */

  const resolveInstituteId =
    () => {
      const candidates = [
        outlet?.instituteId,
        outlet?.institute_id,

        outlet?.institute?.id,
        outlet?.institute
          ?.institute_id,

        website?.institute_id,
        website?.instituteId,

        outlet?.websiteData
          ?.institute?.id,

        outlet?.websiteData
          ?.institute
          ?.institute_id,

        localStorage.getItem(
          "previewInstituteId"
        ),

        sessionStorage.getItem(
          "previewInstituteId"
        ),

        localStorage.getItem(
          "instituteId"
        ),

        sessionStorage.getItem(
          "instituteId"
        ),

        new URLSearchParams(
          location.search
        ).get(
          "institute_id"
        ),
      ];

      for (
        const value of
          candidates
      ) {
        if (
          value !==
            undefined &&
          value !== null &&
          String(value).trim() !==
            ""
        ) {
          const id =
            Number(value);

          if (
            Number.isInteger(id) &&
            id > 0
          ) {
            return id;
          }
        }
      }

      return null;
    };

  /* =======================================================
     BANNER STATE
  ======================================================= */

  const [
    fetchedBanners,
    setFetchedBanners,
  ] = useState([]);

  const [
    bannersLoading,
    setBannersLoading,
  ] = useState(false);

  useEffect(() => {
    let cancelled =
      false;

    const loadBanners =
      async () => {
        const instituteId =
          resolveInstituteId();

        if (!instituteId) {
          return;
        }

        try {
          setBannersLoading(
            true
          );

          const response =
            await API.get(
              `/websites/public/${instituteId}`,
              {
                params: {
                  preview: true,
                },
              }
            );

          if (
            cancelled
          ) {
            return;
          }

          const result =
            response?.data
              ?.data ??
            response?.data ??
            {};

          const apiBanners =
            Array.isArray(
              result?.banners
            )
              ? result.banners
              : [];

          setFetchedBanners(
            apiBanners
          );
        } catch (
          error
        ) {
          if (
            cancelled
          ) {
            return;
          }

          console.error(
            "WebsiteClasses banner error:",
            error?.response
              ?.data ||
              error
          );

          setFetchedBanners(
            []
          );
        } finally {
          if (
            !cancelled
          ) {
            setBannersLoading(
              false
            );
          }
        }
      };

    loadBanners();

    return () => {
      cancelled = true;
    };
  }, [location.search]);

  /* =======================================================
     BANNER DATA
  ======================================================= */

  const bannerData =
    useMemo(() => {
      const source =
        fetchedBanners.length >
        0
          ? fetchedBanners
          : Array.isArray(
                outletBanners
            )
            ? outletBanners
            : [];

      return source
        .filter(Boolean)
        .filter(
          (banner) => {
            const type =
              String(
                banner?.banner_type ??
                  banner?.bannerType ??
                  banner?.type ??
                  ""
              )
                .trim()
                .toUpperCase();

            const active =
              banner?.is_active ??
              banner?.isActive ??
              banner?.active ??
              true;

            const isActive =
              active === true ||
              active === 1 ||
              active === "1" ||
              active === "true" ||
              active === "TRUE";

            const isClasses =
              [
                "CLASS",
                "CLASSES",
                "CLASS_PAGE",
                "CLASSES_PAGE",
              ].includes(type);

            const isHome =
              [
                "HOME",
                "HOMEPAGE",
                "HOME_PAGE",
                "",
              ].includes(type);

            return (
              isActive &&
              (isClasses ||
                isHome)
            );
          }
        )
        .sort(
          (a, b) =>
            Number(
              a?.display_order ??
                a?.displayOrder ??
                999
            ) -
            Number(
              b?.display_order ??
                b?.displayOrder ??
                999
            )
        );
    }, [
      fetchedBanners,
      outletBanners,
    ]);

  const currentBanner =
    bannerData[0] ||
    null;

  const bannerImage =
    currentBanner?.image_url ||
    currentBanner?.image ||
    currentBanner?.banner_image ||
    currentBanner?.bannerImage ||
    "";

  const bannerTitle =
    currentBanner?.title ||
    currentBanner?.heading ||
    currentBanner?.name ||
    pageHeading;

  const bannerSubtitle =
    currentBanner?.subtitle ||
    currentBanner?.subheading ||
    currentBanner?.description ||
    "";

  /* =======================================================
     CATEGORY STATE
  ======================================================= */

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("all");

  const [
    selectedSubcategory,
    setSelectedSubcategory,
  ] = useState("all");

  const [
    searchQuery,
    setSearchQuery,
  ] = useState("");

  const [
    debouncedSearch,
    setDebouncedSearch,
  ] = useState("");

  useEffect(() => {
    const timer =
      setTimeout(() => {
        setDebouncedSearch(
          searchQuery
        );
      }, 300);

    return () =>
      clearTimeout(
        timer
      );
  }, [searchQuery]);

  /* =======================================================
     SELECTED CATEGORY
  ======================================================= */

  const selectedCategoryObject =
    useMemo(
      () =>
        categoryData.find(
          (category) =>
            String(
              getId(category)
            ) ===
            String(
              selectedCategory
            )
        ) || null,
      [
        categoryData,
        selectedCategory,
      ]
    );

  /* =======================================================
     VISIBLE SUBCATEGORIES
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
        (subcategory) =>
          String(
            getCategoryIdFromSubcategory(
              subcategory
            )
          ) ===
          String(
            selectedCategory
          )
      );
    }, [
      subcategoryData,
      selectedCategory,
    ]);

  /* =======================================================
     CATEGORY COUNTS
  ======================================================= */

  const categoryCounts =
    useMemo(() => {
      const counts = {};

      classData.forEach(
        (item) => {
          const id =
            getItemCategoryId(
              item
            );

          if (
            id !== undefined &&
            id !== null
          ) {
            const key =
              String(id);

            counts[key] =
              (counts[key] ||
                0) + 1;
          }
        }
      );

      return counts;
    }, [classData]);

  /* =======================================================
     SUBCATEGORY COUNTS
  ======================================================= */

  const subcategoryCounts =
    useMemo(() => {
      const counts = {};

      classData.forEach(
        (item) => {
          const categoryId =
            getItemCategoryId(
              item
            );

          const subcategoryId =
            getItemSubcategoryId(
              item
            );

          if (
            categoryId ===
              undefined ||
            categoryId === null ||
            subcategoryId ===
              undefined ||
            subcategoryId === null ||
            String(
              categoryId
            ) !==
              String(
                selectedCategory
              )
          ) {
            return;
          }

          const key =
            String(
              subcategoryId
            );

          counts[key] =
            (counts[key] ||
              0) + 1;
        }
      );

      return counts;
    }, [
      classData,
      selectedCategory,
    ]);

  /* =======================================================
     FILTER CLASSES
  ======================================================= */

  const filteredClasses =
    useMemo(() => {
      const search =
        debouncedSearch
          .trim()
          .toLowerCase();

      if (
        selectedCategory ===
        "all"
      ) {
        return [];
      }

      return classData.filter(
        (item) => {
          if (
            String(
              getItemCategoryId(
                item
              )
            ) !==
            String(
              selectedCategory
            )
          ) {
            return false;
          }

          if (
            selectedSubcategory !==
              "all" &&
            String(
              getItemSubcategoryId(
                item
              )
            ) !==
            String(
              selectedSubcategory
            )
          ) {
            return false;
          }

          if (!search) {
            return true;
          }

          const searchable = [
            getClassTitle(
              item
            ),
            getSubcategoryName(
              item
            ),
            getCategoryName(
              item
            ),
            getInstituteName(
              item
            ),
            getTrainerName(
              item
            ),
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();

          return searchable.includes(
            search
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
     CATEGORY CLICK
  ======================================================= */

  const handleCategoryClick =
    (categoryId) => {
      const id =
        String(categoryId);

      if (
        String(
          selectedCategory
        ) === id
      ) {
        setSelectedCategory(
          "all"
        );

        setSelectedSubcategory(
          "all"
        );

        setSearchQuery(
          ""
        );

        return;
      }

      setSelectedCategory(
        id
      );

      setSelectedSubcategory(
        "all"
      );

      setSearchQuery(
        ""
      );

      setTimeout(() => {
        document
          .getElementById(
            "subcategories-section"
          )
          ?.scrollIntoView({
            behavior:
              "smooth",
            block:
              "start",
          });
      }, 50);
    };

  /* =======================================================
     SUBCATEGORY CLICK
  ======================================================= */

  const handleSubcategoryClick =
    (subcategoryId) => {
      const id =
        String(
          subcategoryId
        );

      setSelectedSubcategory(
        (current) =>
          String(current) ===
          id
            ? "all"
            : id
      );

      setTimeout(() => {
        document
          .getElementById(
            "classes-section"
          )
          ?.scrollIntoView({
            behavior:
              "smooth",
            block:
              "start",
          });
      }, 50);
    };

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
     PAGE
  ======================================================= */

  return (
    <>
      <div
        className="min-h-screen w-full overflow-x-hidden"
        style={{
          background:
            COLORS.black,

          color:
            COLORS.text,

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
            TOP RADIANT LINE
        ================================================= */}

        <div
          className="h-[2px] w-full"
          style={{
            background:
              "linear-gradient(90deg,transparent,#008CFF,#38D7FF,#008CFF,transparent)",

            boxShadow:
              "0 0 18px rgba(0,140,255,0.7)",
          }}
        />

        {/* =================================================
            BANNER
        ================================================= */}

        {showBanner && (
          <section
            className="relative overflow-hidden"
            style={{
              background:
                COLORS.black,
            }}
          >

            {bannersLoading &&
              bannerData.length ===
                0 && (
                <div
                  className="relative flex h-[230px] items-center justify-center sm:h-[300px] lg:h-[350px]"
                  style={{
                    background:
                      "linear-gradient(135deg,#000000,#020B18,#061426)",
                  }}
                >
                  <div className="text-center">

                    <div
                      className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2"
                      style={{
                        borderColor:
                          "rgba(56,215,255,0.2)",

                        borderTopColor:
                          COLORS.radiantBlue,
                      }}
                    />

                    <p
                      className="text-sm"
                      style={{
                        color:
                          COLORS.white,
                      }}
                    >
                      Loading banner...
                    </p>

                  </div>
                </div>
              )}

            {!bannersLoading &&
              bannerData.length >
                0 &&
              bannerImage && (
                <div className="relative h-[230px] w-full overflow-hidden sm:h-[300px] lg:h-[350px]">

                  <img
                    src={
                      bannerImage
                    }
                    alt={
                      bannerTitle ||
                      "Institute Banner"
                    }
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="eager"
                    onError={(
                      event
                    ) => {
                      event.currentTarget.onerror =
                        null;

                      event.currentTarget.style.display =
                        "none";
                    }}
                  />

                  {/* OVERLAY */}

                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(90deg,rgba(0,0,0,0.95) 0%,rgba(0,0,0,0.72) 38%,rgba(0,0,0,0.35) 75%,rgba(0,0,0,0.2) 100%)",
                    }}
                  />

                  <div
                    className="absolute inset-x-0 bottom-0 h-40"
                    style={{
                      background:
                        "linear-gradient(to top,#000000,transparent)",
                    }}
                  />

                  <div
                    className="pointer-events-none absolute -right-32 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full blur-3xl"
                    style={{
                      background:
                        "rgba(0,140,255,0.16)",
                    }}
                  />

                  {/* BANNER TEXT */}

                  <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-5 sm:px-8 lg:px-10">

                    <div className="max-w-2xl">

                      <p
                        className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] sm:text-xs"
                        style={{
                          color:
                            COLORS.radiantBlue,
                        }}
                      >
                        Fine Arts
                      </p>

                      <h1
                        className="text-3xl sm:text-4xl lg:text-5xl"
                        style={{
                          color:
                            COLORS.white,

                          fontFamily:
                            fontFamily(
                              branding.fontHeading
                            ),

                          fontWeight:
                            700,

                          lineHeight:
                            1.15,

                          textShadow:
                            "0 0 35px rgba(0,140,255,0.3)",
                        }}
                      >
                        {bannerTitle}
                      </h1>

                      {bannerSubtitle && (
                        <p
                          className="mt-3 max-w-xl text-xs leading-6 sm:text-sm"
                          style={{
                            color:
                              COLORS.textBright,
                          }}
                        >
                          {
                            bannerSubtitle
                          }
                        </p>
                      )}

                    </div>

                  </div>

                  <div
                    className="absolute bottom-0 left-0 right-0 h-[2px]"
                    style={{
                      background:
                        "linear-gradient(90deg,transparent,#008CFF,#38D7FF,#008CFF,transparent)",

                      boxShadow:
                        "0 0 20px rgba(0,140,255,0.8)",
                    }}
                  />

                </div>
              )}

            {/* FALLBACK BANNER */}

            {!bannersLoading &&
              (!bannerData.length ||
                !bannerImage) && (
                <div
                  className="relative flex h-[230px] items-center justify-center overflow-hidden sm:h-[300px] lg:h-[350px]"
                  style={{
                    background:
                      "radial-gradient(circle at 80% 50%,rgba(0,140,255,0.18),transparent 35%),linear-gradient(135deg,#000000,#020B18,#000000)",
                  }}
                >

                  <div
                    className="relative z-10 px-5 text-center"
                  >

                    <p
                      className="text-xs uppercase tracking-[0.25em]"
                      style={{
                        color:
                          COLORS.radiantBlue,
                      }}
                    >
                      Fine Arts
                    </p>

                    <h1
                      className="mt-3 text-4xl sm:text-5xl"
                      style={{
                        color:
                          COLORS.white,

                        fontFamily:
                          fontFamily(
                            branding.fontHeading
                          ),

                        fontWeight:
                          700,
                      }}
                    >
                      {pageHeading}
                    </h1>

                    <p
                      className="mx-auto mt-3 max-w-xl text-sm"
                      style={{
                        color:
                          COLORS.text,
                      }}
                    >
                      {
                        pageSubheading
                      }
                    </p>

                  </div>

                  <div
                    className="absolute bottom-0 left-0 right-0 h-[2px]"
                    style={{
                      background:
                        "linear-gradient(90deg,transparent,#008CFF,#38D7FF,#008CFF,transparent)",
                    }}
                  />

                </div>
              )}

          </section>
        )}

        {/* =================================================
            CATEGORIES
        ================================================= */}

        {showCategories && (
          <section
            className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
            style={{
              background:
                COLORS.black,
            }}
          >

            <div className="mx-auto max-w-7xl">

              <SectionHeading
                eyebrow="Discover"
                heading={
                  categoriesHeading
                }
                subheading={
                  categoriesSubheading
                }
                branding={
                  branding
                }
              />

              {categoryData.length >
              0 ? (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

                  {categoryData.map(
                    (
                      category
                    ) => {
                      const id =
                        getId(
                          category
                        );

                      return (
                        <CategoryCard
                          key={
                            id
                          }
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
                            String(
                              id
                            )
                          }
                          onClick={() =>
                            handleCategoryClick(
                              id
                            )
                          }
                        />
                      );
                    }
                  )}

                </div>
              ) : (
                <EmptyState
                  title="No Categories Available"
                  text="Categories will appear here when they are added."
                />
              )}

            </div>

          </section>
        )}

        {/* =================================================
            SUBCATEGORIES
        ================================================= */}

        {showCategories &&
          selectedCategory !==
            "all" && (
            <section
              id="subcategories-section"
              className="border-y px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
              style={{
                background:
                  COLORS.black,

                borderColor:
                  COLORS.borderSoft,
              }}
            >

              <div className="mx-auto max-w-7xl">

                <SectionHeading
                  eyebrow={
                    selectedCategoryObject?.name ||
                    selectedCategoryObject?.category_name ||
                    "Selected Category"
                  }
                  heading={
                    subcategoriesHeading
                  }
                  subheading={
                    subcategoriesSubheading
                  }
                  branding={
                    branding
                  }
                />

                {visibleSubcategories.length >
                0 ? (
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

                    {/* ALL */}

                    <button
                      type="button"
                      onClick={() =>
                        setSelectedSubcategory(
                          "all"
                        )
                      }
                      className="group overflow-hidden rounded-2xl border text-left transition-all duration-300 hover:-translate-y-1"
                      style={{
                        background:
                          `linear-gradient(145deg, ${COLORS.card}, ${COLORS.cardSecondary})`,

                        borderColor:
                          selectedSubcategory ===
                          "all"
                            ? COLORS.radiantBlue
                            : COLORS.border,
                      }}
                    >

                      <div
                        className="relative flex h-36 items-center justify-center"
                        style={{
                          background:
                            "radial-gradient(circle at center,rgba(0,140,255,0.2),transparent 60%),linear-gradient(135deg,#071a33,#000000)",
                        }}
                      >

                        <span
                          className="text-4xl font-bold"
                          style={{
                            color:
                              COLORS.radiantBlue,

                            textShadow:
                              "0 0 20px rgba(56,215,255,0.45)",
                          }}
                        >
                          All
                        </span>

                      </div>

                      <div className="p-4">

                        <h3
                          className="text-base"
                          style={{
                            color:
                              COLORS.white,

                            fontWeight:
                              700,
                          }}
                        >
                          All Subcategories
                        </h3>

                        <p
                          className="mt-1 text-xs"
                          style={{
                            color:
                              COLORS.text,
                          }}
                        >
                          {
                            categoryCounts[
                              String(
                                selectedCategory
                              )
                            ] || 0
                          }{" "}
                          Classes
                        </p>

                      </div>

                    </button>

                    {visibleSubcategories.map(
                      (
                        subcategory
                      ) => {
                        const id =
                          getSubcategoryId(
                            subcategory
                          );

                        return (
                          <SubcategoryCard
                            key={
                              id
                            }
                            subcategory={
                              subcategory
                            }
                            count={
                              subcategoryCounts[
                                String(
                                  id
                                )
                              ] || 0
                            }
                            active={
                              String(
                                selectedSubcategory
                              ) ===
                              String(
                                id
                              )
                            }
                            onClick={() =>
                              handleSubcategoryClick(
                                id
                              )
                            }
                          />
                        );
                      }
                    )}

                  </div>
                ) : (
                  <EmptyState
                    title="No Subcategories Available"
                    text="There are no subcategories configured for this category yet."
                  />
                )}

              </div>

            </section>
          )}

        {/* =================================================
            CLASSES
        ================================================= */}

        {showClasses &&
          selectedCategory !==
            "all" && (
            <section
              id="classes-section"
              className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
              style={{
                background:
                  COLORS.black,
              }}
            >

              <div className="mx-auto max-w-7xl">

                <SectionHeading
                  eyebrow={
                    selectedSubcategory !==
                    "all"
                      ? getValue(
                          visibleSubcategories.find(
                            (item) =>
                              String(
                                getSubcategoryId(
                                  item
                                )
                              ) ===
                              String(
                                selectedSubcategory
                              )
                          )?.name,

                          visibleSubcategories.find(
                            (item) =>
                              String(
                                getSubcategoryId(
                                  item
                                )
                              ) ===
                              String(
                                selectedSubcategory
                              )
                          )?.subcategory_name,

                          "Selected Subcategory"
                        )
                      : selectedCategoryObject?.name ||
                        selectedCategoryObject?.category_name ||
                        "Selected Category"
                  }
                  heading={
                    classesListHeading
                  }
                  subheading={
                    classesListSubheading
                  }
                  branding={
                    branding
                  }
                />

                {/* SEARCH */}

                <div className="mx-auto mb-8 max-w-2xl">

                  <div className="relative">

                    <FaSearch
                      className="absolute left-4 top-1/2 -translate-y-1/2"
                      style={{
                        color:
                          COLORS.radiantBlue,

                        filter:
                          "drop-shadow(0 0 5px rgba(56,215,255,0.4))",
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
                          event.target.value
                        )
                      }
                      placeholder="Search classes..."
                      className="w-full border py-3.5 pl-11 pr-11 text-sm outline-none"
                      style={{
                        background:
                          `linear-gradient(145deg, ${COLORS.card}, ${COLORS.cardSecondary})`,

                        color:
                          COLORS.white,

                        caretColor:
                          COLORS.radiantBlue,

                        borderColor:
                          COLORS.border,

                        borderRadius:
                          "999px",

                        fontFamily:
                          fontFamily(
                            branding.fontBody
                          ),

                        boxShadow:
                          "0 10px 30px rgba(0,0,0,0.35)",
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
                        className="absolute right-4 top-1/2 -translate-y-1/2"
                        style={{
                          color:
                            COLORS.radiantBlue,
                        }}
                        aria-label="Clear search"
                      >
                        <FaTimes />
                      </button>
                    )}

                  </div>

                </div>

                {/* RESULT COUNT */}

                <div className="mb-6 flex flex-wrap items-center justify-between gap-3">

                  <p
                    className="text-xs"
                    style={{
                      color:
                        COLORS.text,
                    }}
                  >
                    Showing{" "}
                    <span
                      className="font-bold"
                      style={{
                        color:
                          COLORS.radiantBlue,
                      }}
                    >
                      {
                        filteredClasses.length
                      }
                    </span>{" "}
                    {filteredClasses.length ===
                    1
                      ? "class"
                      : "classes"}
                  </p>

                  {(selectedSubcategory !==
                    "all" ||
                    debouncedSearch) && (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedSubcategory(
                          "all"
                        );

                        setSearchQuery(
                          ""
                        );
                      }}
                      className="inline-flex items-center gap-2 text-xs font-semibold"
                      style={{
                        color:
                          COLORS.radiantBlue,
                      }}
                    >
                      <FaTimes />
                      Clear Filter
                    </button>
                  )}

                </div>

                {/* CLASS RESULTS */}

                {filteredClasses.length >
                0 ? (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

                    {filteredClasses.map(
                      (item) => (
                        <ClassCard
                          key={getClassId(
                            item
                          )}
                          item={
                            item
                          }
                          onBook={
                            handleOpenBooking
                          }
                        />
                      )
                    )}

                  </div>
                ) : (
                  <EmptyState
                    title="No Classes Found"
                    text={
                      debouncedSearch
                        ? "No classes match your search."
                        : selectedSubcategory !==
                            "all"
                          ? "No classes are available in this subcategory."
                          : "No classes are available in this category."
                    }
                    action={
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedSubcategory(
                            "all"
                          );

                          setSearchQuery(
                            ""
                          );
                        }}
                        className="mt-5 rounded-full px-5 py-2.5 text-xs font-bold"
                        style={{
                          background:
                            `linear-gradient(135deg, ${COLORS.blue}, ${COLORS.radiantBlue})`,

                          color:
                            COLORS.black,

                          boxShadow:
                            "0 0 20px rgba(0,140,255,0.3)",
                        }}
                      >
                        Clear Selection
                      </button>
                    }
                  />
                )}

              </div>

            </section>
          )}

        {/* =================================================
            INITIAL STATE
        ================================================= */}

        {showClasses &&
          selectedCategory ===
            "all" && (
            <section
              className="px-4 pb-16 sm:px-6 lg:px-8"
              style={{
                background:
                  COLORS.black,
              }}
            >

              <div
                className="mx-auto max-w-3xl rounded-2xl border px-6 py-12 text-center"
                style={{
                  background:
                    `linear-gradient(145deg, ${COLORS.card}, ${COLORS.cardSecondary})`,

                  borderColor:
                    COLORS.border,

                  boxShadow:
                    "0 15px 50px rgba(0,0,0,0.4)",
                }}
              >

                <div
                  className="mx-auto flex h-14 w-14 items-center justify-center rounded-full"
                  style={{
                    background:
                      "rgba(0,140,255,0.1)",

                    color:
                      COLORS.radiantBlue,

                    boxShadow:
                      "0 0 25px rgba(0,140,255,0.15)",
                  }}
                >
                  <FaArrowRight
                    size={18}
                  />
                </div>

                <h3
                  className="mt-5 text-2xl"
                  style={{
                    color:
                      COLORS.white,

                    fontWeight:
                      700,
                  }}
                >
                  Choose a Category
                </h3>

                <p
                  className="mx-auto mt-2 max-w-xl text-sm"
                  style={{
                    color:
                      COLORS.textBright,
                  }}
                >
                  Select a category above
                  to load its related
                  subcategories and
                  classes.
                </p>

              </div>

            </section>
          )}

        {/* =================================================
            BOTTOM BLUE LINE
        ================================================= */}

        <div
          className="h-[2px] w-full"
          style={{
            background:
              "linear-gradient(90deg,transparent,#008CFF,#38D7FF,#008CFF,transparent)",

            boxShadow:
              "0 0 18px rgba(0,140,255,0.65)",
          }}
        />

      </div>

      {/* =================================================
          BOOKING MODAL
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

      {/* =================================================
          FORCE INPUT TEXT VISIBILITY
      ================================================= */}

      <style>
        {`
          .website-classes-page input::placeholder {
            color: #94A3B8 !important;
            opacity: 1 !important;
          }

          input::placeholder {
            color: #94A3B8 !important;
            opacity: 1 !important;
          }

          input {
            color: #FFFFFF !important;
            caret-color: #38D7FF !important;
          }

          button {
            -webkit-tap-highlight-color: transparent;
          }

          button:focus-visible,
          input:focus-visible {
            outline: 2px solid #38D7FF;
            outline-offset: 2px;
          }

          @media (max-width: 640px) {
            .website-classes-page {
              overflow-x: hidden;
            }
          }
        `}
      </style>

    </>
  );
};

export default WebsiteClasses;