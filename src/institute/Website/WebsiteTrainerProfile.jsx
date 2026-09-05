// import { useParams, Link, useOutletContext } from "react-router-dom";
// import { useEffect, useState } from "react";
// import {
//   FaArrowLeft,
//   FaCheck,
//   FaStar,
//   FaUsers,
//   FaComment,
//   FaBriefcase,
//   FaLanguage,
//   FaBolt,
//   FaArrowRight,
// } from "react-icons/fa";

// import {
//   getTrainerById,
//   getTrainerClasses,
// } from "../../services/trainerService";

// const WebsiteTrainerProfile = () => {
//   const { trainerId } = useParams();
//   const context = useOutletContext() || {};

//   const [trainer, setTrainer] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [trainerClasses, setTrainerClasses] =
//     useState([]);
//   const [trainerInstitutes, setTrainerInstitutes] =
//     useState([]);

//   const branding = context.branding || {};

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
//     "#F59E0B";

//   useEffect(() => {
//     let isMounted = true;

//     const fetchTrainerData = async () => {
//       try {
//         setLoading(true);

//         const trainerData =
//           await getTrainerById(trainerId);

//         if (!isMounted) return;

//         setTrainer(trainerData);

//         /*
//           The existing trainer API returns the institute
//           information together with the trainer.
//         */
//         if (trainerData?.institute_id) {
//           setTrainerInstitutes([
//             {
//               id: trainerData.institute_id,
//               name:
//                 trainerData.institute_name,
//               description:
//                 trainerData.institute_description,

//               image:
//                 trainerData.institute_banner_image ||
//                 trainerData.institute_logo ||
//                 trainerData.institute_image_url,

//               city:
//                 trainerData.institute_city,

//               state:
//                 trainerData.institute_state,

//               rating:
//                 trainerData.institute_rating,

//               reviews:
//                 trainerData.institute_reviews,
//             },
//           ]);
//         } else {
//           setTrainerInstitutes([]);
//         }

//         const classesData =
//           await getTrainerClasses(trainerId);

//         if (!isMounted) return;

//         setTrainerClasses(
//           Array.isArray(classesData)
//             ? classesData
//             : []
//         );
//       } catch (error) {
//         console.error(
//           "Failed to load trainer profile:",
//           error
//         );

//         if (!isMounted) return;

//         setTrainer(null);
//         setTrainerInstitutes([]);
//         setTrainerClasses([]);
//       } finally {
//         if (isMounted) {
//           setLoading(false);
//         }
//       }
//     };

//     if (trainerId) {
//       fetchTrainerData();
//     } else {
//       setLoading(false);
//       setTrainer(null);
//     }

//     return () => {
//       isMounted = false;
//     };
//   }, [trainerId]);

//   /*
//     Safely handle skills.
//     The original page supports either an array
//     or comma-separated subcategories.
//   */
//   const skillsList = Array.isArray(
//     trainer?.skills
//   )
//     ? trainer.skills
//     : trainer?.subcategories
//       ? String(
//           trainer.subcategories
//         )
//           .split(",")
//           .map((skill) => skill.trim())
//           .filter(Boolean)
//       : [];

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-white">
//         <div className="text-center">
//           <div
//             className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-t-transparent"
//             style={{
//               borderColor: `${primaryColor}35`,
//               borderTopColor: primaryColor,
//             }}
//           />

//           <p className="text-sm text-gray-500">
//             Loading profile...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   if (!trainer) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-white px-4">
//         <div className="text-center">
//           <h2 className="mb-4 text-2xl font-bold text-gray-900">
//             Trainer Not Found
//           </h2>

//           <Link
//             to="/institute/website/preview/trainers"
//             className="inline-flex items-center rounded-xl px-5 py-2.5 text-sm font-semibold text-white"
//             style={{
//               backgroundColor:
//                 primaryColor,
//             }}
//           >
//             <FaArrowLeft className="mr-2" />
//             Back To Trainers
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   const trainerName =
//     trainer.full_name ||
//     "Professional Trainer";

//   const specialty =
//     trainer.specialty ||
//     "Professional Trainer";

//   const rating = Number(
//     trainer.rating || 0
//   );

//   return (
//     <div className="min-h-screen bg-white pb-20 pt-8">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

//         {/* BACK */}
//         <Link
//           to="/institute/website/preview/trainers"
//           className="group mb-8 inline-flex items-center text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
//         >
//           <FaArrowLeft className="mr-2 transition-transform group-hover:-translate-x-1" />
//           Back To Trainers
//         </Link>

//         <div className="grid gap-8 lg:grid-cols-3">

//           {/* =================================================
//               LEFT COLUMN
//           ================================================= */}
//           <div className="space-y-6 lg:col-span-2">

//             {/* PROFILE HEADER */}
//             <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
//               <div className="flex flex-col gap-6 p-6 sm:flex-row sm:gap-10 sm:p-8">

//                 {/* PROFILE IMAGE + NAME */}
//                 <div className="flex w-full flex-shrink-0 flex-col items-center text-center sm:w-auto sm:items-start sm:text-left">

//                   <div className="group relative">
//                     <div
//                       className="absolute -inset-4 rounded-full blur-xl transition-opacity duration-300 group-hover:opacity-100"
//                       style={{
//                         background: `linear-gradient(135deg, ${primaryColor}30, ${accentColor}25)`,
//                         opacity: 0.7,
//                       }}
//                     />

//                     {trainer.profile_image ? (
//                       <img
//                         src={
//                           trainer.profile_image
//                         }
//                         alt={trainerName}
//                         className="relative h-44 w-44 rounded-full border-4 border-white object-cover shadow-2xl sm:h-56 sm:w-56"
//                       />
//                     ) : (
//                       <div
//                         className="relative flex h-44 w-44 items-center justify-center rounded-full border-4 border-white text-5xl font-black text-white shadow-2xl sm:h-56 sm:w-56"
//                         style={{
//                           backgroundColor:
//                             primaryColor,
//                         }}
//                       >
//                         {String(
//                           trainerName
//                         )
//                           .charAt(0)
//                           .toUpperCase()}
//                       </div>
//                     )}

//                     <div className="mt-5 text-center sm:text-left">
//                       <h1 className="text-2xl font-black leading-tight text-gray-900 sm:text-3xl">
//                         {trainerName}
//                       </h1>

//                       <p
//                         className="mt-1.5 text-xs font-semibold uppercase tracking-wider sm:text-sm"
//                         style={{
//                           color:
//                             primaryColor,
//                         }}
//                       >
//                         {specialty}
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* STATS + BIO */}
//                 <div className="flex min-w-0 flex-1 flex-col justify-center">

//                   {/* RATING + EXPERIENCE */}
//                   <div className="mb-5 grid grid-cols-2 gap-4 border-b border-gray-100 pb-5">

//                     <StatBox
//                       icon={
//                         <FaStar
//                           style={{
//                             color:
//                               accentColor,
//                           }}
//                         />
//                       }
//                       value={rating.toFixed(1)}
//                       label="Rating"
//                     />

//                     <StatBox
//                       value={
//                         trainer.experience_years ||
//                         0
//                       }
//                       label="Years Exp"
//                     />
//                   </div>

//                   {/* STUDENTS + REVIEWS */}
//                   <div className="mb-5 grid grid-cols-2 gap-4 border-b border-gray-100 pb-5">

//                     <StatBox
//                       icon={
//                         <FaUsers
//                           style={{
//                             color:
//                               primaryColor,
//                           }}
//                         />
//                       }
//                       value={Number(
//                         trainer.total_students ||
//                           0
//                       ).toLocaleString()}
//                       label="Students"
//                     />

//                     <StatBox
//                       icon={
//                         <FaComment
//                           style={{
//                             color:
//                               primaryColor,
//                           }}
//                         />
//                       }
//                       value={Number(
//                         trainer.total_reviews ||
//                           0
//                       ).toLocaleString()}
//                       label="Reviews"
//                     />
//                   </div>

//                   {/* BIO */}
//                   <p className="text-sm leading-relaxed text-gray-600">
//                     {trainer.bio ||
//                       "No bio available for this trainer."}
//                   </p>
//                 </div>
//               </div>
//             </section>

//             {/* SKILLS */}
//             <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
//               <div className="mb-4 flex items-center gap-2">
//                 <div
//                   className="h-5 w-1 rounded-full"
//                   style={{
//                     backgroundColor:
//                       primaryColor,
//                   }}
//                 />

//                 <h2 className="text-lg font-bold text-gray-900">
//                   Skills
//                 </h2>
//               </div>

//               {skillsList.length > 0 ? (
//                 <div className="flex flex-wrap gap-2">
//                   {skillsList.map(
//                     (skill, index) => {
//                       const skillName =
//                         typeof skill === "string"
//                           ? skill
//                           : skill?.name ||
//                             skill?.title ||
//                             String(skill);

//                       return (
//                         <span
//                           key={`${skillName}-${index}`}
//                           className="rounded-full border px-4 py-2 text-xs font-semibold"
//                           style={{
//                             backgroundColor: `${primaryColor}10`,
//                             borderColor: `${primaryColor}30`,
//                             color:
//                               primaryColor,
//                           }}
//                         >
//                           {skillName}
//                         </span>
//                       );
//                     }
//                   )}
//                 </div>
//               ) : (
//                 <p className="text-sm text-gray-500">
//                   No skills listed.
//                 </p>
//               )}
//             </section>

//             {/* CERTIFICATIONS */}
//             <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
//               <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
//                 <div
//                   className="h-5 w-1 rounded-full"
//                   style={{
//                     backgroundColor:
//                       primaryColor,
//                   }}
//                 />
//                 Certifications
//               </h2>

//               {trainer.certifications ? (
//                 <ul className="space-y-3">
//                   {String(
//                     trainer.certifications
//                   )
//                     .split(",")
//                     .map((cert) => {
//                       const value =
//                         cert.trim();

//                       if (!value) return null;

//                       return (
//                         <li
//                           key={value}
//                           className="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50 p-3 transition-colors hover:bg-gray-100"
//                         >
//                           <div
//                             className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border"
//                             style={{
//                               backgroundColor: `${primaryColor}10`,
//                               borderColor: `${primaryColor}25`,
//                             }}
//                           >
//                             <FaCheck
//                               className="text-[10px]"
//                               style={{
//                                 color:
//                                   primaryColor,
//                               }}
//                             />
//                           </div>

//                           <span className="text-sm text-gray-700">
//                             {value}
//                           </span>
//                         </li>
//                       );
//                     })}
//                 </ul>
//               ) : (
//                 <p className="text-sm text-gray-500">
//                   No certifications listed.
//                 </p>
//               )}
//             </section>

//             {/* CLASSES BY TRAINER */}
//             {trainerClasses.length > 0 && (
//               <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
//                 <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-gray-900">
//                   <div
//                     className="h-6 w-1 rounded-full"
//                     style={{
//                       backgroundColor:
//                         accentColor,
//                     }}
//                   />

//                   Classes by{" "}
//                   {trainerName}
//                 </h2>

//                 <div className="space-y-3">
//                   {trainerClasses.map(
//                     (cls) => (
//                       <Link
//                         key={cls.id}
//                         to={`/institute/website/preview/classes/${cls.id}`}
//                         className="group flex items-center gap-5 rounded-xl border border-gray-100 bg-gray-50 p-4 transition-all hover:bg-white hover:shadow-md"
//                       >
//                         <img
//                           src={
//                             cls.image ||
//                             "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400"
//                           }
//                           alt={
//                             cls.title ||
//                             "Class"
//                           }
//                           className="h-16 w-16 flex-shrink-0 rounded-full border-2 object-cover sm:h-20 sm:w-20"
//                           style={{
//                             borderColor: `${primaryColor}30`,
//                           }}
//                         />

//                         <div className="min-w-0 flex-1">
//                           <h3 className="truncate text-base font-bold text-gray-900 transition-colors group-hover:text-purple-600 sm:text-lg">
//                             {cls.title}
//                           </h3>

//                           {cls.level && (
//                             <span
//                               className="mt-1 inline-block rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-wider"
//                               style={{
//                                 backgroundColor: `${primaryColor}10`,
//                                 borderColor: `${primaryColor}20`,
//                                 color:
//                                   primaryColor,
//                               }}
//                             >
//                               {cls.level}
//                             </span>
//                           )}
//                         </div>

//                         <FaArrowRight
//                           className="flex-shrink-0 text-sm transition-transform group-hover:translate-x-1"
//                           style={{
//                             color:
//                               primaryColor,
//                           }}
//                         />
//                       </Link>
//                     )
//                   )}
//                 </div>
//               </section>
//             )}
//           </div>

//           {/* =================================================
//               RIGHT SIDEBAR
//           ================================================= */}
//           <div className="lg:col-span-1">
//             <div className="sticky top-24 space-y-4">

//               {/* QUICK INFO */}
//               <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
//                 <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-gray-900">
//                   <div
//                     className="h-5 w-1 rounded-full"
//                     style={{
//                       backgroundColor:
//                         accentColor,
//                     }}
//                   />
//                   Quick Info
//                 </h3>

//                 <div>
//                   <QuickInfoRow
//                     icon={
//                       <FaBriefcase
//                         style={{
//                           color:
//                             primaryColor,
//                         }}
//                       />
//                     }
//                     label="Experience"
//                     value={`${trainer.experience_years || 0} Years`}
//                   />

//                   <QuickInfoRow
//                     icon={
//                       <FaLanguage
//                         style={{
//                           color:
//                             primaryColor,
//                         }}
//                       />
//                     }
//                     label="Languages"
//                     value={
//                       trainer.languages ||
//                       "N/A"
//                     }
//                   />

//                   <QuickInfoRow
//                     icon={
//                       <FaBolt
//                         style={{
//                           color:
//                             accentColor,
//                         }}
//                       />
//                     }
//                     label="Response Rate"
//                     value={
//                       trainer.response_rate ||
//                       "N/A"
//                     }
//                     last
//                   />
//                 </div>
//               </section>

//               {/* INSTITUTE */}
//               {trainerInstitutes.length >
//                 0 && (
//                 <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
//                   {trainerInstitutes.map(
//                     (inst) => (
//                       <div key={inst.id}>

//                         {inst.image ? (
//                           <img
//                             src={inst.image}
//                             alt={
//                               inst.name ||
//                               "Institute"
//                             }
//                             className="h-48 w-full object-cover"
//                           />
//                         ) : (
//                           <div
//                             className="flex h-48 items-center justify-center"
//                             style={{
//                               backgroundColor: `${primaryColor}10`,
//                             }}
//                           >
//                             <span
//                               className="text-4xl font-black"
//                               style={{
//                                 color:
//                                   primaryColor,
//                               }}
//                             >
//                               {String(
//                                 inst.name ||
//                                   "I"
//                               )
//                                 .charAt(0)
//                                 .toUpperCase()}
//                             </span>
//                           </div>
//                         )}

//                         <div className="p-5">
//                           <h2 className="text-2xl font-bold text-gray-900">
//                             {inst.name ||
//                               "Institute"}
//                           </h2>

//                           {(inst.city ||
//                             inst.state) && (
//                             <p className="mt-2 text-xs font-medium text-gray-500">
//                               {[
//                                 inst.city,
//                                 inst.state,
//                               ]
//                                 .filter(Boolean)
//                                 .join(", ")}
//                             </p>
//                           )}

//                           <p className="mt-4 line-clamp-2 text-sm text-gray-500">
//                             {inst.description ||
//                               "Institute details are not available."}
//                           </p>

//                           <Link
//                             to={`/institute/website/preview/institutes/${inst.id}`}
//                             className="mt-5 flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
//                             style={{
//                               backgroundColor:
//                                 primaryColor,
//                             }}
//                           >
//                             View Institute
//                           </Link>
//                         </div>
//                       </div>
//                     )
//                   )}
//                 </section>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// /* =========================================================
//    SMALL COMPONENTS
// ========================================================= */

// const StatBox = ({
//   icon,
//   value,
//   label,
// }) => (
//   <div className="flex flex-col items-center rounded-xl border border-gray-100 bg-gray-50 p-4">
//     <div className="mb-1.5 flex items-center gap-1.5">
//       {icon}
//       <span className="text-2xl font-black text-gray-900">
//         {value}
//       </span>
//     </div>

//     <span className="text-[10px] font-medium uppercase tracking-widest text-gray-500">
//       {label}
//     </span>
//   </div>
// );

// const QuickInfoRow = ({
//   icon,
//   label,
//   value,
//   last = false,
// }) => (
//   <div
//     className={`flex items-center justify-between py-4 ${
//       !last ? "border-b border-gray-100" : ""
//     }`}
//   >
//     <span className="flex items-center gap-3 text-sm text-gray-500">
//       <span className="w-4 text-center text-xs">
//         {icon}
//       </span>
//       {label}
//     </span>

//     <span className="max-w-[150px] truncate text-right text-sm font-semibold text-gray-900">
//       {value}
//     </span>
//   </div>
// );

// export default WebsiteTrainerProfile;



// import { useParams, Link, useOutletContext } from "react-router-dom";
// import { useEffect, useMemo, useState } from "react";
// import {
//   FaArrowLeft,
//   FaCheck,
//   FaStar,
//   FaUsers,
//   FaComment,
//   FaBriefcase,
//   FaLanguage,
//   FaBolt,
//   FaArrowRight,
// } from "react-icons/fa";

// import {
//   getTrainerById,
//   getTrainerClasses,
// } from "../../services/trainerService";


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

//   return value !== undefined &&
//     value !== null &&
//     value !== ""
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


// const fontFamily = (font) =>
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
//    WEBSITE TRAINER PROFILE
// ========================================================= */

// const WebsiteTrainerProfile = () => {

//   const { trainerId } =
//     useParams();

//   const context =
//     useOutletContext() || {};


//   /* =======================================================
//      BRANDING
//   ======================================================= */

//   const branding = useMemo(
//     () =>
//       normalizeBranding(
//         context?.branding ||
//           context?.websiteBranding ||
//           context?.brand ||
//           {}
//       ),
//     [
//       context?.branding,
//       context?.websiteBranding,
//       context?.brand,
//     ]
//   );


//   /* =======================================================
//      STATE
//   ======================================================= */

//   const [
//     trainer,
//     setTrainer,
//   ] = useState(null);

//   const [
//     loading,
//     setLoading,
//   ] = useState(true);

//   const [
//     trainerClasses,
//     setTrainerClasses,
//   ] = useState([]);

//   const [
//     trainerInstitutes,
//     setTrainerInstitutes,
//   ] = useState([]);


//   /* =======================================================
//      FETCH TRAINER DATA
//   ======================================================= */

//   useEffect(() => {

//     let isMounted = true;


//     const fetchTrainerData =
//       async () => {

//         try {

//           setLoading(true);


//           const trainerData =
//             await getTrainerById(
//               trainerId
//             );


//           if (!isMounted) {
//             return;
//           }


//           setTrainer(
//             trainerData
//           );


//           /*
//             Existing API returns institute
//             information together with trainer.
//           */

//           if (
//             trainerData?.institute_id
//           ) {

//             setTrainerInstitutes([
//               {
//                 id:
//                   trainerData.institute_id,

//                 name:
//                   trainerData.institute_name,

//                 description:
//                   trainerData.institute_description,

//                 image:
//                   trainerData.institute_banner_image ||
//                   trainerData.institute_logo ||
//                   trainerData.institute_image_url,

//                 city:
//                   trainerData.institute_city,

//                 state:
//                   trainerData.institute_state,

//                 rating:
//                   trainerData.institute_rating,

//                 reviews:
//                   trainerData.institute_reviews,
//               },
//             ]);

//           } else {

//             setTrainerInstitutes([]);

//           }


//           const classesData =
//             await getTrainerClasses(
//               trainerId
//             );


//           if (!isMounted) {
//             return;
//           }


//           setTrainerClasses(
//             Array.isArray(
//               classesData
//             )
//               ? classesData
//               : []
//           );

//         } catch (error) {

//           console.error(
//             "Failed to load trainer profile:",
//             error
//           );


//           if (!isMounted) {
//             return;
//           }


//           setTrainer(null);
//           setTrainerInstitutes([]);
//           setTrainerClasses([]);

//         } finally {

//           if (isMounted) {
//             setLoading(false);
//           }

//         }
//       };


//     if (trainerId) {

//       fetchTrainerData();

//     } else {

//       setLoading(false);
//       setTrainer(null);

//     }


//     return () => {
//       isMounted = false;
//     };

//   }, [trainerId]);


//   /* =======================================================
//      SKILLS
//   ======================================================= */

//   const skillsList =
//     useMemo(() => {

//       if (
//         Array.isArray(
//           trainer?.skills
//         )
//       ) {
//         return trainer.skills;
//       }


//       if (
//         trainer?.subcategories
//       ) {

//         return String(
//           trainer.subcategories
//         )
//           .split(",")
//           .map(
//             (skill) =>
//               skill.trim()
//           )
//           .filter(Boolean);

//       }


//       return [];

//     }, [
//       trainer?.skills,
//       trainer?.subcategories,
//     ]);


//   /* =======================================================
//      COMMON STYLES
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


//   const cardStyle = {
//     backgroundColor:
//       branding.cardBackgroundColor,

//     border:
//       `1px solid ${hexToRgba(
//         branding.textColor,
//         0.12
//       )}`,

//     borderRadius:
//       "18px",

//     boxShadow:
//       "0 2px 12px rgba(0,0,0,0.04)",
//   };


//   /* =======================================================
//      LOADING
//   ======================================================= */

//   if (loading) {

//     return (
//       <div
//         className="
//           min-h-screen
//           flex
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
//               mb-4
//               h-10
//               w-10
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

//           <p
//             className="text-sm"
//             style={{
//               ...bodyStyle,
//               opacity: 0.65,
//             }}
//           >
//             Loading profile...
//           </p>

//         </div>

//       </div>
//     );
//   }


//   /* =======================================================
//      NOT FOUND
//   ======================================================= */

//   if (!trainer) {

//     return (
//       <div
//         className="
//           min-h-screen
//           flex
//           items-center
//           justify-center
//           px-4
//         "
//         style={{
//           backgroundColor:
//             branding.pageBackgroundColor,
//         }}
//       >

//         <div className="text-center">

//           <h2
//             className="
//               mb-4
//               text-2xl
//             "
//             style={headingStyle}
//           >
//             Trainer Not Found
//           </h2>


//           <Link
//             to="/institute/website/preview/trainers"
//             className="
//               inline-flex
//               items-center
//               px-5
//               py-2.5
//               text-sm
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
//                 branding.bodyWeight,
//             }}
//           >

//             <FaArrowLeft
//               className="mr-2"
//             />

//             Back To Trainers

//           </Link>

//         </div>

//       </div>
//     );
//   }


//   /* =======================================================
//      TRAINER VALUES
//   ======================================================= */

//   const trainerName =
//     trainer.full_name ||
//     "Professional Trainer";


//   const specialty =
//     trainer.specialty ||
//     "Professional Trainer";


//   const rating =
//     Number(
//       trainer.rating || 0
//     );


//   const experience =
//     Number(
//       trainer.experience_years || 0
//     );


//   const totalStudents =
//     Number(
//       trainer.total_students || 0
//     );


//   const totalReviews =
//     Number(
//       trainer.total_reviews || 0
//     );


//   return (
//     <div
//       className="
//         min-h-screen
//         pb-20
//         pt-8
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

//       <div
//         className="
//           mx-auto
//           max-w-7xl
//           px-4
//           sm:px-6
//           lg:px-8
//         "
//       >

//         {/* =================================================
//             BACK
//         ================================================= */}

//         <Link
//           to="/institute/website/preview/trainers"
//           className="
//             group
//             mb-8
//             inline-flex
//             items-center
//             text-sm
//             transition
//           "
//           style={{
//             ...bodyStyle,
//             opacity: 0.65,
//           }}
//         >

//           <FaArrowLeft
//             className="
//               mr-2
//               transition-transform
//               group-hover:-translate-x-1
//             "
//           />

//           Back To Trainers

//         </Link>


//         <div
//           className="
//             grid
//             gap-8
//             lg:grid-cols-3
//           "
//         >

//           {/* =================================================
//               LEFT COLUMN
//           ================================================= */}

//           <div
//             className="
//               space-y-6
//               lg:col-span-2
//             "
//           >

//             {/* =================================================
//                 PROFILE HEADER
//             ================================================= */}

//             <section
//               className="
//                 overflow-hidden
//                 p-6
//                 sm:p-8
//               "
//               style={cardStyle}
//             >

//               <div
//                 className="
//                   flex
//                   flex-col
//                   gap-6
//                   sm:flex-row
//                   sm:gap-10
//                 "
//               >

//                 {/* PROFILE IMAGE */}

//                 <div
//                   className="
//                     flex
//                     w-full
//                     flex-shrink-0
//                     flex-col
//                     items-center
//                     text-center
//                     sm:w-auto
//                     sm:items-start
//                     sm:text-left
//                   "
//                 >

//                   <div className="group relative">

//                     <div
//                       className="
//                         absolute
//                         -inset-4
//                         rounded-full
//                         blur-xl
//                       "
//                       style={{
//                         background:
//                           `linear-gradient(
//                             135deg,
//                             ${hexToRgba(
//                               branding.buttonColor,
//                               0.2
//                             )},
//                             ${hexToRgba(
//                               branding.iconColor,
//                               0.15
//                             )}
//                           )`,
//                       }}
//                     />


//                     {trainer.profile_image ? (

//                       <img
//                         src={
//                           trainer.profile_image
//                         }
//                         alt={
//                           trainerName
//                         }
//                         className="
//                           relative
//                           h-44
//                           w-44
//                           rounded-full
//                           border-4
//                           object-cover
//                           shadow-2xl
//                           sm:h-56
//                           sm:w-56
//                         "
//                         style={{
//                           borderColor:
//                             branding.cardBackgroundColor,
//                         }}
//                       />

//                     ) : (

//                       <div
//                         className="
//                           relative
//                           flex
//                           h-44
//                           w-44
//                           items-center
//                           justify-center
//                           rounded-full
//                           border-4
//                           text-5xl
//                           shadow-2xl
//                           sm:h-56
//                           sm:w-56
//                         "
//                         style={{
//                           backgroundColor:
//                             branding.buttonColor,

//                           color:
//                             branding.buttonTextColor,

//                           borderColor:
//                             branding.cardBackgroundColor,

//                           fontFamily:
//                             fontFamily(
//                               branding.fontHeading
//                             ),

//                           fontWeight:
//                             branding.headingWeight,
//                         }}
//                       >
//                         {String(
//                           trainerName
//                         )
//                           .charAt(0)
//                           .toUpperCase()}
//                       </div>

//                     )}


//                     <div
//                       className="
//                         mt-5
//                         text-center
//                         sm:text-left
//                       "
//                     >

//                       <h1
//                         className="
//                           text-2xl
//                           sm:text-3xl
//                         "
//                         style={headingStyle}
//                       >
//                         {trainerName}
//                       </h1>


//                       <p
//                         className="
//                           mt-1.5
//                           text-xs
//                           uppercase
//                           tracking-wider
//                           sm:text-sm
//                         "
//                         style={
//                           subheadingStyle
//                         }
//                       >
//                         {specialty}
//                       </p>

//                     </div>

//                   </div>

//                 </div>


//                 {/* STATS + BIO */}

//                 <div
//                   className="
//                     flex
//                     min-w-0
//                     flex-1
//                     flex-col
//                     justify-center
//                   "
//                 >

//                   {/* RATING + EXPERIENCE */}

//                   <div
//                     className="
//                       mb-5
//                       grid
//                       grid-cols-2
//                       gap-4
//                       border-b
//                       pb-5
//                     "
//                     style={{
//                       borderColor:
//                         hexToRgba(
//                           branding.textColor,
//                           0.08
//                         ),
//                     }}
//                   >

//                     <StatBox
//                       branding={
//                         branding
//                       }
//                       icon={
//                         <FaStar />
//                       }
//                       iconColor={
//                         branding.iconColor
//                       }
//                       value={
//                         rating.toFixed(1)
//                       }
//                       label="Rating"
//                     />


//                     <StatBox
//                       branding={
//                         branding
//                       }
//                       value={
//                         experience
//                       }
//                       label="Years Exp"
//                     />

//                   </div>


//                   {/* STUDENTS + REVIEWS */}

//                   <div
//                     className="
//                       mb-5
//                       grid
//                       grid-cols-2
//                       gap-4
//                       border-b
//                       pb-5
//                     "
//                     style={{
//                       borderColor:
//                         hexToRgba(
//                           branding.textColor,
//                           0.08
//                         ),
//                     }}
//                   >

//                     <StatBox
//                       branding={
//                         branding
//                       }
//                       icon={
//                         <FaUsers />
//                       }
//                       iconColor={
//                         branding.iconColor
//                       }
//                       value={totalStudents.toLocaleString()}
//                       label="Students"
//                     />


//                     <StatBox
//                       branding={
//                         branding
//                       }
//                       icon={
//                         <FaComment />
//                       }
//                       iconColor={
//                         branding.iconColor
//                       }
//                       value={totalReviews.toLocaleString()}
//                       label="Reviews"
//                     />

//                   </div>


//                   {/* BIO */}

//                   <p
//                     className="
//                       text-sm
//                     "
//                     style={{
//                       ...bodyStyle,
//                       opacity: 0.68,
//                     }}
//                   >
//                     {trainer.bio ||
//                       "No bio available for this trainer."}
//                   </p>

//                 </div>

//               </div>

//             </section>


//             {/* =================================================
//                 SKILLS
//             ================================================= */}

//             <section
//               className="p-6"
//               style={cardStyle}
//             >

//               <div
//                 className="
//                   mb-4
//                   flex
//                   items-center
//                   gap-2
//                 "
//               >

//                 <div
//                   className="
//                     h-5
//                     w-1
//                   "
//                   style={{
//                     backgroundColor:
//                       branding.buttonColor,

//                     borderRadius:
//                       getButtonRadius(
//                         branding
//                       ),
//                   }}
//                 />


//                 <h2
//                   className="text-lg"
//                   style={headingStyle}
//                 >
//                   Skills
//                 </h2>

//               </div>


//               {skillsList.length >
//               0 ? (

//                 <div
//                   className="
//                     flex
//                     flex-wrap
//                     gap-2
//                   "
//                 >

//                   {skillsList.map(
//                     (
//                       skill,
//                       index
//                     ) => {

//                       const skillName =
//                         typeof skill ===
//                         "string"
//                           ? skill
//                           : skill?.name ||
//                             skill?.title ||
//                             String(
//                               skill
//                             );


//                       return (
//                         <span
//                           key={`${skillName}-${index}`}
//                           className="
//                             border
//                             px-4
//                             py-2
//                             text-xs
//                           "
//                           style={{
//                             backgroundColor:
//                               hexToRgba(
//                                 branding.buttonColor,
//                                 0.1
//                               ),

//                             borderColor:
//                               hexToRgba(
//                                 branding.buttonColor,
//                                 0.25
//                               ),

//                             color:
//                               branding.buttonColor,

//                             borderRadius:
//                               getButtonRadius(
//                                 branding
//                               ),

//                             fontFamily:
//                               fontFamily(
//                                 branding.fontBody
//                               ),

//                             fontWeight:
//                               branding.bodyWeight,
//                           }}
//                         >
//                           {skillName}
//                         </span>
//                       );

//                     }
//                   )}

//                 </div>

//               ) : (

//                 <p
//                   className="text-sm"
//                   style={{
//                     ...bodyStyle,
//                     opacity: 0.6,
//                   }}
//                 >
//                   No skills listed.
//                 </p>

//               )}

//             </section>


//             {/* =================================================
//                 CERTIFICATIONS
//             ================================================= */}

//             <section
//               className="p-6"
//               style={cardStyle}
//             >

//               <h2
//                 className="
//                   mb-4
//                   flex
//                   items-center
//                   gap-2
//                   text-lg
//                 "
//                 style={headingStyle}
//               >

//                 <div
//                   className="
//                     h-5
//                     w-1
//                   "
//                   style={{
//                     backgroundColor:
//                       branding.buttonColor,

//                     borderRadius:
//                       getButtonRadius(
//                         branding
//                       ),
//                   }}
//                 />

//                 Certifications

//               </h2>


//               {trainer.certifications ? (

//                 <ul
//                   className="
//                     space-y-3
//                   "
//                 >

//                   {String(
//                     trainer.certifications
//                   )
//                     .split(",")
//                     .map(
//                       (
//                         cert
//                       ) => {

//                         const value =
//                           cert.trim();


//                         if (!value) {
//                           return null;
//                         }


//                         return (
//                           <li
//                             key={
//                               value
//                             }
//                             className="
//                               flex
//                               items-center
//                               gap-3
//                               p-3
//                             "
//                             style={{
//                               backgroundColor:
//                                 hexToRgba(
//                                   branding.textColor,
//                                   0.035
//                                 ),

//                               border:
//                                 `1px solid ${hexToRgba(
//                                   branding.textColor,
//                                   0.08
//                                 )}`,

//                               borderRadius:
//                                 "10px",
//                             }}
//                           >

//                             <div
//                               className="
//                                 flex
//                                 h-6
//                                 w-6
//                                 flex-shrink-0
//                                 items-center
//                                 justify-center
//                                 rounded-full
//                                 border
//                               "
//                               style={{
//                                 backgroundColor:
//                                   hexToRgba(
//                                     branding.buttonColor,
//                                     0.1
//                                   ),

//                                 borderColor:
//                                   hexToRgba(
//                                     branding.buttonColor,
//                                     0.2
//                                   ),
//                               }}
//                             >

//                               <FaCheck
//                                 className="text-[10px]"
//                                 style={{
//                                   color:
//                                     branding.buttonColor,
//                                 }}
//                               />

//                             </div>


//                             <span
//                               className="text-sm"
//                               style={{
//                                 ...bodyStyle,
//                                 opacity: 0.75,
//                               }}
//                             >
//                               {value}
//                             </span>

//                           </li>
//                         );

//                       }
//                     )}

//                 </ul>

//               ) : (

//                 <p
//                   className="text-sm"
//                   style={{
//                     ...bodyStyle,
//                     opacity: 0.6,
//                   }}
//                 >
//                   No certifications
//                   listed.
//                 </p>

//               )}

//             </section>


//             {/* =================================================
//                 CLASSES
//             ================================================= */}

//             {trainerClasses.length >
//               0 && (

//               <section
//                 className="p-6"
//                 style={cardStyle}
//               >

//                 <h2
//                   className="
//                     mb-6
//                     flex
//                     items-center
//                     gap-2
//                     text-xl
//                   "
//                   style={headingStyle}
//                 >

//                   <div
//                     className="
//                       h-6
//                       w-1
//                     "
//                     style={{
//                       backgroundColor:
//                         branding.iconColor,

//                       borderRadius:
//                         getButtonRadius(
//                           branding
//                         ),
//                     }}
//                   />

//                   Classes by{" "}
//                   {trainerName}

//                 </h2>


//                 <div
//                   className="
//                     space-y-3
//                   "
//                 >

//                   {trainerClasses.map(
//                     (cls) => (

//                       <Link
//                         key={
//                           cls.id
//                         }
//                         to={`/institute/website/preview/classes/${cls.id}`}
//                         className="
//                           group
//                           flex
//                           items-center
//                           gap-5
//                           p-4
//                           transition-all
//                         "
//                         style={{
//                           backgroundColor:
//                             hexToRgba(
//                               branding.textColor,
//                               0.025
//                             ),

//                           border:
//                             `1px solid ${hexToRgba(
//                               branding.textColor,
//                               0.08
//                             )}`,

//                           borderRadius:
//                             "12px",
//                         }}
//                       >

//                         <img
//                           src={
//                             cls.image ||
//                             "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400"
//                           }
//                           alt={
//                             cls.title ||
//                             "Class"
//                           }
//                           className="
//                             h-16
//                             w-16
//                             flex-shrink-0
//                             rounded-full
//                             border-2
//                             object-cover
//                             sm:h-20
//                             sm:w-20
//                           "
//                           style={{
//                             borderColor:
//                               hexToRgba(
//                                 branding.buttonColor,
//                                 0.3
//                               ),
//                           }}
//                         />


//                         <div
//                           className="
//                             min-w-0
//                             flex-1
//                           "
//                         >

//                           <h3
//                             className="
//                               truncate
//                               text-base
//                               sm:text-lg
//                             "
//                             style={{
//                               ...headingStyle,
//                               fontWeight:
//                                 branding.subheadingWeight,
//                             }}
//                           >
//                             {cls.title}
//                           </h3>


//                           {cls.level && (

//                             <span
//                               className="
//                                 mt-1
//                                 inline-block
//                                 border
//                                 px-3
//                                 py-1
//                                 text-[10px]
//                                 uppercase
//                                 tracking-wider
//                               "
//                               style={{
//                                 backgroundColor:
//                                   hexToRgba(
//                                     branding.buttonColor,
//                                     0.1
//                                   ),

//                                 borderColor:
//                                   hexToRgba(
//                                     branding.buttonColor,
//                                     0.2
//                                   ),

//                                 color:
//                                   branding.buttonColor,

//                                 borderRadius:
//                                   getButtonRadius(
//                                     branding
//                                   ),

//                                 fontFamily:
//                                   fontFamily(
//                                     branding.fontBody
//                                   ),

//                                 fontWeight:
//                                   branding.bodyWeight,
//                               }}
//                             >
//                               {cls.level}
//                             </span>

//                           )}

//                         </div>


//                         <FaArrowRight
//                           className="
//                             flex-shrink-0
//                             text-sm
//                             transition-transform
//                             group-hover:translate-x-1
//                           "
//                           style={{
//                             color:
//                               branding.buttonColor,
//                           }}
//                         />

//                       </Link>

//                     )
//                   )}

//                 </div>

//               </section>

//             )}

//           </div>


//           {/* =================================================
//               RIGHT SIDEBAR
//           ================================================= */}

//           <div
//             className="
//               lg:col-span-1
//             "
//           >

//             <div
//               className="
//                 sticky
//                 top-24
//                 space-y-4
//               "
//             >

//               {/* =================================================
//                   QUICK INFO
//               ================================================= */}

//               <section
//                 className="p-6"
//                 style={cardStyle}
//               >

//                 <h3
//                   className="
//                     mb-6
//                     flex
//                     items-center
//                     gap-2
//                     text-lg
//                   "
//                   style={headingStyle}
//                 >

//                   <div
//                     className="
//                       h-5
//                       w-1
//                     "
//                     style={{
//                       backgroundColor:
//                         branding.iconColor,

//                       borderRadius:
//                         getButtonRadius(
//                           branding
//                         ),
//                     }}
//                   />

//                   Quick Info

//                 </h3>


//                 <div>

//                   <QuickInfoRow
//                     branding={
//                       branding
//                     }
//                     icon={
//                       <FaBriefcase />
//                     }
//                     label="Experience"
//                     value={`${experience} Years`}
//                   />


//                   <QuickInfoRow
//                     branding={
//                       branding
//                     }
//                     icon={
//                       <FaLanguage />
//                     }
//                     label="Languages"
//                     value={
//                       trainer.languages ||
//                       "N/A"
//                     }
//                   />


//                   <QuickInfoRow
//                     branding={
//                       branding
//                     }
//                     icon={
//                       <FaBolt />
//                     }
//                     iconColor={
//                       branding.iconColor
//                     }
//                     label="Response Rate"
//                     value={
//                       trainer.response_rate ||
//                       "N/A"
//                     }
//                     last
//                   />

//                 </div>

//               </section>


//               {/* =================================================
//                   INSTITUTE
//               ================================================= */}

//               {trainerInstitutes.length >
//                 0 && (

//                 <section
//                   className="
//                     overflow-hidden
//                   "
//                   style={cardStyle}
//                 >

//                   {trainerInstitutes.map(
//                     (inst) => (

//                       <div
//                         key={
//                           inst.id
//                         }
//                       >

//                         {inst.image ? (

//                           <img
//                             src={
//                               inst.image
//                             }
//                             alt={
//                               inst.name ||
//                               "Institute"
//                             }
//                             className="
//                               h-48
//                               w-full
//                               object-cover
//                             "
//                           />

//                         ) : (

//                           <div
//                             className="
//                               flex
//                               h-48
//                               items-center
//                               justify-center
//                             "
//                             style={{
//                               backgroundColor:
//                                 hexToRgba(
//                                   branding.buttonColor,
//                                   0.1
//                                 ),
//                             }}
//                           >

//                             <span
//                               className="
//                                 text-4xl
//                               "
//                               style={{
//                                 color:
//                                   branding.buttonColor,

//                                 fontFamily:
//                                   fontFamily(
//                                     branding.fontHeading
//                                   ),

//                                 fontWeight:
//                                   branding.headingWeight,
//                               }}
//                             >
//                               {String(
//                                 inst.name ||
//                                   "I"
//                               )
//                                 .charAt(0)
//                                 .toUpperCase()}
//                             </span>

//                           </div>

//                         )}


//                         <div
//                           className="p-5"
//                         >

//                           <h2
//                             className="
//                               text-2xl
//                             "
//                             style={
//                               headingStyle
//                             }
//                           >
//                             {inst.name ||
//                               "Institute"}
//                           </h2>


//                           {(inst.city ||
//                             inst.state) && (

//                             <p
//                               className="
//                                 mt-2
//                                 text-xs
//                               "
//                               style={{
//                                 ...bodyStyle,
//                                 opacity: 0.6,
//                               }}
//                             >
//                               {[
//                                 inst.city,
//                                 inst.state,
//                               ]
//                                 .filter(
//                                   Boolean
//                                 )
//                                 .join(
//                                   ", "
//                                 )}
//                             </p>

//                           )}


//                           <p
//                             className="
//                               mt-4
//                               line-clamp-2
//                               text-sm
//                             "
//                             style={{
//                               ...bodyStyle,
//                               opacity: 0.65,
//                             }}
//                           >
//                             {inst.description ||
//                               "Institute details are not available."}
//                           </p>


//                           <Link
//                             to={`/institute/website/preview/institutes/${inst.id}`}
//                             className="
//                               mt-5
//                               flex
//                               w-full
//                               items-center
//                               justify-center
//                               px-4
//                               py-3
//                               text-sm
//                               transition
//                               hover:opacity-90
//                             "
//                             style={{
//                               backgroundColor:
//                                 branding.buttonColor,

//                               color:
//                                 branding.buttonTextColor,

//                               borderRadius:
//                                 getButtonRadius(
//                                   branding
//                                 ),

//                               fontFamily:
//                                 fontFamily(
//                                   branding.fontBody
//                                 ),

//                               fontWeight:
//                                 branding.bodyWeight,
//                             }}
//                           >
//                             View Institute
//                           </Link>

//                         </div>

//                       </div>

//                     )
//                   )}

//                 </section>

//               )}

//             </div>

//           </div>

//         </div>

//       </div>

//     </div>
//   );
// };


// /* =========================================================
//    STAT BOX
// ========================================================= */

// const StatBox = ({
//   branding,
//   icon,
//   iconColor,
//   value,
//   label,
// }) => (

//   <div
//     className="
//       flex
//       flex-col
//       items-center
//       p-4
//     "
//     style={{
//       backgroundColor:
//         hexToRgba(
//           branding.textColor,
//           0.025
//         ),

//       border:
//         `1px solid ${hexToRgba(
//           branding.textColor,
//           0.07
//         )}`,

//       borderRadius:
//         "12px",
//     }}
//   >

//     <div
//       className="
//         mb-1.5
//         flex
//         items-center
//         gap-1.5
//       "
//     >

//       {icon && (
//         <span
//           style={{
//             color:
//               iconColor ||
//               branding.iconColor,
//           }}
//         >
//           {icon}
//         </span>
//       )}


//       <span
//         className="
//           text-2xl
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
//       </span>

//     </div>


//     <span
//       className="
//         text-[10px]
//         uppercase
//         tracking-widest
//       "
//       style={{
//         ...{
//           color:
//             branding.textColor,

//           fontFamily:
//             fontFamily(
//               branding.fontBody
//             ),

//           fontWeight:
//             branding.bodyWeight,
//         },

//         opacity: 0.55,
//       }}
//     >
//       {label}
//     </span>

//   </div>
// );


// /* =========================================================
//    QUICK INFO ROW
// ========================================================= */

// const QuickInfoRow = ({
//   branding,
//   icon,
//   iconColor,
//   label,
//   value,
//   last = false,
// }) => (

//   <div
//     className="
//       flex
//       items-center
//       justify-between
//       py-4
//     "
//     style={{
//       borderBottom: last
//         ? "none"
//         : `1px solid ${hexToRgba(
//             branding.textColor,
//             0.08
//           )}`,
//     }}
//   >

//     <span
//       className="
//         flex
//         items-center
//         gap-3
//         text-sm
//       "
//       style={{
//         color:
//           branding.textColor,

//         fontFamily:
//           fontFamily(
//             branding.fontBody
//           ),

//         fontWeight:
//           branding.bodyWeight,

//         opacity: 0.65,
//       }}
//     >

//       <span
//         className="
//           w-4
//           text-center
//           text-xs
//         "
//         style={{
//           color:
//             iconColor ||
//             branding.iconColor,
//         }}
//       >
//         {icon}
//       </span>

//       {label}

//     </span>


//     <span
//       className="
//         max-w-[150px]
//         truncate
//         text-right
//         text-sm
//       "
//       style={{
//         color:
//           branding.headingColor,

//         fontFamily:
//           fontFamily(
//             branding.fontBody
//           ),

//         fontWeight:
//           branding.subheadingWeight,
//       }}
//     >
//       {value}
//     </span>

//   </div>
// );


// export default WebsiteTrainerProfile;

// src/institute/Website/WebsiteTrainerProfile.jsx

import {
  useParams,
  Link,
  useOutletContext,
} from "react-router-dom";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  FaArrowLeft,
  FaCheck,
  FaStar,
  FaUsers,
  FaComment,
  FaBriefcase,
  FaLanguage,
  FaBolt,
  FaArrowRight,
} from "react-icons/fa";

import {
  getTrainerById,
  getTrainerClasses,
} from "../../services/trainerService";


/* =========================================================
   DEFAULT CONTENT
========================================================= */

const DEFAULT_CONTENT = {
  trainers: {
    eyebrow: "OUR TEAM",
    heading: "Meet Our Expert Trainers",
    subheading:
      "Find the right trainer based on expertise, experience and specialty.",
  },
};


/* =========================================================
   DEFAULT SECTIONS
========================================================= */

const DEFAULT_SECTIONS = {
  trainers: {
    visible: true,
  },
};


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
   HELPERS
========================================================= */

const firstValue = (...values) =>
  values.find(
    (value) =>
      value !== undefined &&
      value !== null &&
      String(value).trim() !== ""
  );


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
   NORMALIZE BRANDING
========================================================= */

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

  footerBackgroundColor: getBrandingValue(
    branding,
    "footerBackgroundColor",
    "footer_background_color",
    DEFAULT_BRANDING.footerBackgroundColor
  ),

  footerHeadingColor: getBrandingValue(
    branding,
    "footerHeadingColor",
    "footer_heading_color",
    DEFAULT_BRANDING.footerHeadingColor
  ),

  footerTextColor: getBrandingValue(
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

  fontSubheading: getBrandingValue(
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

  headingWeight: getBrandingValue(
    branding,
    "headingWeight",
    "heading_weight",
    DEFAULT_BRANDING.headingWeight
  ),

  headingLineHeight: getBrandingValue(
    branding,
    "headingLineHeight",
    "heading_line_height",
    DEFAULT_BRANDING.headingLineHeight
  ),

  headingLetterSpacing: getBrandingValue(
    branding,
    "headingLetterSpacing",
    "heading_letter_spacing",
    DEFAULT_BRANDING.headingLetterSpacing
  ),

  subheadingWeight: getBrandingValue(
    branding,
    "subheadingWeight",
    "subheading_weight",
    DEFAULT_BRANDING.subheadingWeight
  ),

  subheadingLineHeight: getBrandingValue(
    branding,
    "subheadingLineHeight",
    "subheading_line_height",
    DEFAULT_BRANDING.subheadingLineHeight
  ),

  bodyWeight: getBrandingValue(
    branding,
    "bodyWeight",
    "body_weight",
    DEFAULT_BRANDING.bodyWeight
  ),

  bodyLineHeight: getBrandingValue(
    branding,
    "bodyLineHeight",
    "body_line_height",
    DEFAULT_BRANDING.bodyLineHeight
  ),

  bodyLetterSpacing: getBrandingValue(
    branding,
    "bodyLetterSpacing",
    "body_letter_spacing",
    DEFAULT_BRANDING.bodyLetterSpacing
  ),

  roundedButtons: getBrandingValue(
    branding,
    "roundedButtons",
    "rounded_buttons",
    DEFAULT_BRANDING.roundedButtons
  ),
});


/* =========================================================
   NORMALIZE CONTENT
========================================================= */

const normalizeContent = (
  content = {}
) => {
  const source =
    content?.trainers ||
    content?.trainer ||
    content?.Trainers ||
    {};

  return {
    trainers: {
      eyebrow: firstValue(
        source?.eyebrow,
        source?.eyebrow_text,
        source?.label,
        DEFAULT_CONTENT.trainers.eyebrow
      ),

      heading: firstValue(
        source?.heading,
        source?.title,
        source?.page_heading,
        DEFAULT_CONTENT.trainers.heading
      ),

      subheading: firstValue(
        source?.subheading,
        source?.subtitle,
        source?.page_subheading,
        DEFAULT_CONTENT.trainers.subheading
      ),
    },
  };
};


/* =========================================================
   NORMALIZE SECTIONS
========================================================= */

const normalizeSections = (
  sections = {}
) => {
  const source =
    sections?.trainers ||
    sections?.trainer ||
    sections?.Trainers ||
    {};

  const visible =
    source?.visible ??
    source?.is_visible ??
    source?.isVisible ??
    sections?.trainers_visible ??
    sections?.trainer_visible;

  if (
    visible === false ||
    visible === 0 ||
    visible === "0" ||
    visible === "false"
  ) {
    return {
      trainers: {
        visible: false,
      },
    };
  }

  return {
    trainers: {
      visible: true,
    },
  };
};


/* =========================================================
   FONT
========================================================= */

const fontFamily = (font) =>
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
   RGBA
========================================================= */

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
   STAT BOX
========================================================= */

const StatBox = ({
  branding,
  icon,
  value,
  label,
}) => (
  <div
    className="
      flex
      flex-col
      items-center
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
          0.07
        )}`,

      borderRadius:
        "12px",
    }}
  >

    <div
      className="
        mb-1.5
        flex
        items-center
        gap-1.5
      "
    >

      {icon && (
        <span
          style={{
            color:
              branding.iconColor,
          }}
        >
          {icon}
        </span>
      )}

      <span
        className="text-2xl"
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
      </span>

    </div>


    <span
      className="
        text-[10px]
        uppercase
        tracking-widest
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

        opacity: 0.55,
      }}
    >
      {label}
    </span>

  </div>
);


/* =========================================================
   QUICK INFO ROW
========================================================= */

const QuickInfoRow = ({
  branding,
  icon,
  label,
  value,
  last = false,
}) => (
  <div
    className="
      flex
      items-center
      justify-between
      py-4
    "
    style={{
      borderBottom:
        last
          ? "none"
          : `1px solid ${hexToRgba(
              branding.textColor,
              0.08
            )}`,
    }}
  >

    <span
      className="
        flex
        items-center
        gap-3
        text-sm
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

        opacity: 0.65,
      }}
    >

      <span
        className="
          w-4
          text-center
          text-xs
        "
        style={{
          color:
            branding.iconColor,
        }}
      >
        {icon}
      </span>

      {label}

    </span>


    <span
      className="
        max-w-[150px]
        truncate
        text-right
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
      {value}
    </span>

  </div>
);


/* =========================================================
   MAIN
========================================================= */

const WebsiteTrainerProfile = () => {

  const { trainerId } =
    useParams();

  const context =
    useOutletContext() || {};


  /* =======================================================
     CONTENT
  ======================================================= */

  const content =
    useMemo(
      () =>
        normalizeContent(
          context?.content ||
            context?.websiteContent ||
            context?.contents ||
            {}
        ),
      [
        context?.content,
        context?.websiteContent,
        context?.contents,
      ]
    );


  /* =======================================================
     SECTIONS
  ======================================================= */

  const sections =
    useMemo(
      () =>
        normalizeSections(
          context?.sections ||
            context?.websiteSections ||
            {}
        ),
      [
        context?.sections,
        context?.websiteSections,
      ]
    );


  /* =======================================================
     BRANDING
  ======================================================= */

  const branding =
    useMemo(
      () =>
        normalizeBranding(
          context?.branding ||
            context?.websiteBranding ||
            context?.brand ||
            {}
        ),
      [
        context?.branding,
        context?.websiteBranding,
        context?.brand,
      ]
    );


  /* =======================================================
     VISIBILITY
  ======================================================= */

  const trainersVisible =
    sections?.trainers?.visible !==
    false;


  /* =======================================================
     STATE
  ======================================================= */

  const [
    trainer,
    setTrainer,
  ] = useState(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    trainerClasses,
    setTrainerClasses,
  ] = useState([]);

  const [
    trainerInstitutes,
    setTrainerInstitutes,
  ] = useState([]);


  /* =======================================================
     FETCH
  ======================================================= */

  useEffect(() => {

    let isMounted = true;


    const fetchTrainerData =
      async () => {

        try {

          setLoading(true);


          const trainerData =
            await getTrainerById(
              trainerId
            );


          if (!isMounted) {
            return;
          }


          setTrainer(
            trainerData
          );


          if (
            trainerData?.institute_id
          ) {

            setTrainerInstitutes([
              {
                id:
                  trainerData.institute_id,

                name:
                  trainerData.institute_name,

                description:
                  trainerData.institute_description,

                image:
                  trainerData.institute_banner_image ||
                  trainerData.institute_logo ||
                  trainerData.institute_image_url,

                city:
                  trainerData.institute_city,

                state:
                  trainerData.institute_state,

                rating:
                  trainerData.institute_rating,

                reviews:
                  trainerData.institute_reviews,
              },
            ]);

          } else {

            setTrainerInstitutes([]);

          }


          const classesData =
            await getTrainerClasses(
              trainerId
            );


          if (!isMounted) {
            return;
          }


          setTrainerClasses(
            Array.isArray(
              classesData
            )
              ? classesData
              : []
          );

        } catch (error) {

          console.error(
            "Failed to load trainer profile:",
            error
          );


          if (!isMounted) {
            return;
          }


          setTrainer(null);
          setTrainerInstitutes([]);
          setTrainerClasses([]);

        } finally {

          if (isMounted) {
            setLoading(false);
          }

        }
      };


    if (trainerId) {

      fetchTrainerData();

    } else {

      setLoading(false);
      setTrainer(null);

    }


    return () => {
      isMounted = false;
    };

  }, [trainerId]);


  /* =======================================================
     SKILLS
  ======================================================= */

  const skillsList =
    useMemo(() => {

      if (
        Array.isArray(
          trainer?.skills
        )
      ) {
        return trainer.skills;
      }


      if (
        trainer?.subcategories
      ) {

        return String(
          trainer.subcategories
        )
          .split(",")
          .map(
            (skill) =>
              skill.trim()
          )
          .filter(Boolean);

      }


      return [];

    }, [
      trainer?.skills,
      trainer?.subcategories,
    ]);


  /* =======================================================
     STYLES
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


  const subheadingStyle = {
    color:
      branding.subheadingColor,

    fontFamily:
      fontFamily(
        branding.fontSubheading
      ),

    fontWeight:
      branding.subheadingWeight,

    lineHeight:
      branding.subheadingLineHeight,
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


  const cardStyle = {
    backgroundColor:
      branding.cardBackgroundColor,

    border:
      `1px solid ${hexToRgba(
        branding.textColor,
        0.12
      )}`,

    borderRadius:
      "18px",

    boxShadow:
      "0 2px 12px rgba(0,0,0,0.04)",
  };


  /* =======================================================
     SECTION DISABLED
  ======================================================= */

  if (!trainersVisible) {

    return null;

  }


  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {

    return (
      <div
        className="
          min-h-screen
          flex
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
              mb-4
              h-10
              w-10
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

          <p
            className="text-sm"
            style={{
              ...bodyStyle,
              opacity: 0.65,
            }}
          >
            Loading profile...
          </p>

        </div>

      </div>
    );
  }


  /* =======================================================
     NOT FOUND
  ======================================================= */

  if (!trainer) {

    return (
      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
          px-4
        "
        style={{
          backgroundColor:
            branding.pageBackgroundColor,
        }}
      >

        <div className="text-center">

          <h2
            className="
              mb-4
              text-2xl
            "
            style={headingStyle}
          >
            Trainer Not Found
          </h2>


          <Link
            to="/institute/website/preview/trainers"
            className="
              inline-flex
              items-center
              px-5
              py-2.5
              text-sm
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

            <FaArrowLeft
              className="mr-2"
            />

            Back To Trainers

          </Link>

        </div>

      </div>
    );
  }


  /* =======================================================
     TRAINER VALUES
  ======================================================= */

  const trainerName =
    trainer.full_name ||
    "Professional Trainer";


  const specialty =
    trainer.specialty ||
    "Professional Trainer";


  const rating =
    Number(
      trainer.rating || 0
    );


  const experience =
    Number(
      trainer.experience_years || 0
    );


  const totalStudents =
    Number(
      trainer.total_students || 0
    );


  const totalReviews =
    Number(
      trainer.total_reviews || 0
    );


  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <div
      className="
        min-h-screen
        pb-20
        pt-8
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

      <div
        className="
          mx-auto
          max-w-7xl
          px-4
          sm:px-6
          lg:px-8
        "
      >

        {/* =================================================
            BACK
        ================================================= */}

        <Link
          to="/institute/website/preview/trainers"
          className="
            group
            mb-8
            inline-flex
            items-center
            text-sm
            transition
          "
          style={{
            ...bodyStyle,
            opacity: 0.65,
          }}
        >

          <FaArrowLeft
            className="
              mr-2
              transition-transform
              group-hover:-translate-x-1
            "
          />

          Back To Trainers

        </Link>


        {/* =================================================
            TRAINER PAGE HEADING
        ================================================= */}

        <div
          className="
            mb-8
            text-center
          "
        >

          {content?.trainers?.eyebrow && (

            <p
              className="
                mb-2
                text-sm
                uppercase
                tracking-[0.18em]
              "
              style={subheadingStyle}
            >
              {
                content
                  .trainers
                  .eyebrow
              }
            </p>

          )}


          <h1
            className="
              text-3xl
              md:text-4xl
            "
            style={headingStyle}
          >
            {
              content
                .trainers
                .heading
            }
          </h1>


          {content?.trainers?.subheading && (

            <p
              className="
                mx-auto
                mt-3
                max-w-2xl
              "
              style={{
                ...bodyStyle,
                opacity: 0.65,
              }}
            >
              {
                content
                  .trainers
                  .subheading
              }
            </p>

          )}

        </div>


        <div
          className="
            grid
            gap-8
            lg:grid-cols-3
          "
        >

          {/* =================================================
              LEFT
          ================================================= */}

          <div
            className="
              space-y-6
              lg:col-span-2
            "
          >

            {/* PROFILE HEADER */}

            <section
              className="
                overflow-hidden
                p-6
                sm:p-8
              "
              style={cardStyle}
            >

              <div
                className="
                  flex
                  flex-col
                  gap-6
                  sm:flex-row
                  sm:gap-10
                "
              >

                {/* IMAGE */}

                <div
                  className="
                    flex
                    w-full
                    flex-shrink-0
                    flex-col
                    items-center
                    text-center
                    sm:w-auto
                    sm:items-start
                    sm:text-left
                  "
                >

                  <div className="relative">

                    <div
                      className="
                        absolute
                        -inset-4
                        rounded-full
                        blur-xl
                      "
                      style={{
                        background:
                          `linear-gradient(
                            135deg,
                            ${hexToRgba(
                              branding.buttonColor,
                              0.2
                            )},
                            ${hexToRgba(
                              branding.iconColor,
                              0.15
                            )}
                          )`,
                      }}
                    />


                    {trainer.profile_image ? (

                      <img
                        src={
                          trainer.profile_image
                        }
                        alt={
                          trainerName
                        }
                        className="
                          relative
                          h-44
                          w-44
                          rounded-full
                          border-4
                          object-cover
                          shadow-2xl
                          sm:h-56
                          sm:w-56
                        "
                        style={{
                          borderColor:
                            branding.cardBackgroundColor,
                        }}
                      />

                    ) : (

                      <div
                        className="
                          relative
                          flex
                          h-44
                          w-44
                          items-center
                          justify-center
                          rounded-full
                          border-4
                          text-5xl
                          shadow-2xl
                          sm:h-56
                          sm:w-56
                        "
                        style={{
                          backgroundColor:
                            branding.buttonColor,

                          color:
                            branding.buttonTextColor,

                          borderColor:
                            branding.cardBackgroundColor,

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
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                    )}

                  </div>


                  <div
                    className="
                      mt-5
                      text-center
                      sm:text-left
                    "
                  >

                    <h2
                      className="
                        text-2xl
                        sm:text-3xl
                      "
                      style={headingStyle}
                    >
                      {trainerName}
                    </h2>


                    <p
                      className="
                        mt-1.5
                        text-xs
                        uppercase
                        tracking-wider
                        sm:text-sm
                      "
                      style={subheadingStyle}
                    >
                      {specialty}
                    </p>

                  </div>

                </div>


                {/* DETAILS */}

                <div
                  className="
                    flex
                    min-w-0
                    flex-1
                    flex-col
                    justify-center
                  "
                >

                  <div
                    className="
                      mb-5
                      grid
                      grid-cols-2
                      gap-4
                      border-b
                      pb-5
                    "
                    style={{
                      borderColor:
                        hexToRgba(
                          branding.textColor,
                          0.08
                        ),
                    }}
                  >

                    <StatBox
                      branding={
                        branding
                      }
                      icon={
                        <FaStar />
                      }
                      value={
                        rating.toFixed(1)
                      }
                      label="Rating"
                    />


                    <StatBox
                      branding={
                        branding
                      }
                      value={
                        experience
                      }
                      label="Years Exp"
                    />

                  </div>


                  <div
                    className="
                      mb-5
                      grid
                      grid-cols-2
                      gap-4
                      border-b
                      pb-5
                    "
                    style={{
                      borderColor:
                        hexToRgba(
                          branding.textColor,
                          0.08
                        ),
                    }}
                  >

                    <StatBox
                      branding={
                        branding
                      }
                      icon={
                        <FaUsers />
                      }
                      value={
                        totalStudents.toLocaleString()
                      }
                      label="Students"
                    />


                    <StatBox
                      branding={
                        branding
                      }
                      icon={
                        <FaComment />
                      }
                      value={
                        totalReviews.toLocaleString()
                      }
                      label="Reviews"
                    />

                  </div>


                  <p
                    className="text-sm"
                    style={{
                      ...bodyStyle,
                      opacity: 0.68,
                    }}
                  >
                    {trainer.bio ||
                      "No bio available for this trainer."}
                  </p>

                </div>

              </div>

            </section>


            {/* =================================================
                SKILLS
            ================================================= */}

            <section
              className="p-6"
              style={cardStyle}
            >

              <h2
                className="
                  mb-4
                  flex
                  items-center
                  gap-2
                  text-lg
                "
                style={headingStyle}
              >

                <span
                  className="
                    h-5
                    w-1
                  "
                  style={{
                    backgroundColor:
                      branding.buttonColor,

                    borderRadius:
                      getButtonRadius(
                        branding
                      ),
                  }}
                />

                Skills

              </h2>


              {skillsList.length > 0 ? (

                <div
                  className="
                    flex
                    flex-wrap
                    gap-2
                  "
                >

                  {skillsList.map(
                    (
                      skill,
                      index
                    ) => {

                      const skillName =
                        typeof skill ===
                        "string"
                          ? skill
                          : skill?.name ||
                            skill?.title ||
                            String(
                              skill
                            );


                      return (
                        <span
                          key={`${skillName}-${index}`}
                          className="
                            border
                            px-4
                            py-2
                            text-xs
                          "
                          style={{
                            backgroundColor:
                              hexToRgba(
                                branding.buttonColor,
                                0.1
                              ),

                            borderColor:
                              hexToRgba(
                                branding.buttonColor,
                                0.25
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
                          }}
                        >
                          {skillName}
                        </span>
                      );

                    }
                  )}

                </div>

              ) : (

                <p
                  className="text-sm"
                  style={{
                    ...bodyStyle,
                    opacity: 0.6,
                  }}
                >
                  No skills listed.
                </p>

              )}

            </section>


            {/* =================================================
                CERTIFICATIONS
            ================================================= */}

            <section
              className="p-6"
              style={cardStyle}
            >

              <h2
                className="
                  mb-4
                  flex
                  items-center
                  gap-2
                  text-lg
                "
                style={headingStyle}
              >

                <span
                  className="
                    h-5
                    w-1
                  "
                  style={{
                    backgroundColor:
                      branding.buttonColor,

                    borderRadius:
                      getButtonRadius(
                        branding
                      ),
                  }}
                />

                Certifications

              </h2>


              {trainer.certifications ? (

                <ul className="space-y-3">

                  {String(
                    trainer.certifications
                  )
                    .split(",")
                    .map(
                      (
                        cert
                      ) => {

                        const value =
                          cert.trim();

                        if (!value) {
                          return null;
                        }

                        return (
                          <li
                            key={
                              value
                            }
                            className="
                              flex
                              items-center
                              gap-3
                              p-3
                            "
                            style={{
                              backgroundColor:
                                hexToRgba(
                                  branding.textColor,
                                  0.035
                                ),

                              border:
                                `1px solid ${hexToRgba(
                                  branding.textColor,
                                  0.08
                                )}`,

                              borderRadius:
                                "10px",
                            }}
                          >

                            <div
                              className="
                                flex
                                h-6
                                w-6
                                flex-shrink-0
                                items-center
                                justify-center
                                rounded-full
                                border
                              "
                              style={{
                                backgroundColor:
                                  hexToRgba(
                                    branding.buttonColor,
                                    0.1
                                  ),

                                borderColor:
                                  hexToRgba(
                                    branding.buttonColor,
                                    0.2
                                  ),
                              }}
                            >

                              <FaCheck
                                className="text-[10px]"
                                style={{
                                  color:
                                    branding.buttonColor,
                                }}
                              />

                            </div>


                            <span
                              className="text-sm"
                              style={{
                                ...bodyStyle,
                                opacity: 0.75,
                              }}
                            >
                              {value}
                            </span>

                          </li>
                        );
                      }
                    )}

                </ul>

              ) : (

                <p
                  className="text-sm"
                  style={{
                    ...bodyStyle,
                    opacity: 0.6,
                  }}
                >
                  No certifications
                  listed.
                </p>

              )}

            </section>


            {/* =================================================
                CLASSES
            ================================================= */}

            {trainerClasses.length >
              0 && (

              <section
                className="p-6"
                style={cardStyle}
              >

                <h2
                  className="
                    mb-6
                    flex
                    items-center
                    gap-2
                    text-xl
                  "
                  style={headingStyle}
                >

                  <span
                    className="
                      h-6
                      w-1
                    "
                    style={{
                      backgroundColor:
                        branding.iconColor,

                      borderRadius:
                        getButtonRadius(
                          branding
                        ),
                    }}
                  />

                  Classes by{" "}
                  {trainerName}

                </h2>


                <div className="space-y-3">

                  {trainerClasses.map(
                    (cls) => (

                      <Link
                        key={
                          cls.id
                        }
                        to={`/institute/website/preview/classes/${cls.id}`}
                        className="
                          group
                          flex
                          items-center
                          gap-5
                          p-4
                          transition-all
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

                        <img
                          src={
                            cls.image ||
                            "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400"
                          }
                          alt={
                            cls.title ||
                            "Class"
                          }
                          className="
                            h-16
                            w-16
                            flex-shrink-0
                            rounded-full
                            border-2
                            object-cover
                            sm:h-20
                            sm:w-20
                          "
                          style={{
                            borderColor:
                              hexToRgba(
                                branding.buttonColor,
                                0.3
                              ),
                          }}
                        />


                        <div
                          className="
                            min-w-0
                            flex-1
                          "
                        >

                          <h3
                            className="
                              truncate
                              text-base
                              sm:text-lg
                            "
                            style={{
                              ...headingStyle,
                              fontWeight:
                                branding.subheadingWeight,
                            }}
                          >
                            {cls.title}
                          </h3>


                          {cls.level && (

                            <span
                              className="
                                mt-1
                                inline-block
                                border
                                px-3
                                py-1
                                text-[10px]
                                uppercase
                                tracking-wider
                              "
                              style={{
                                backgroundColor:
                                  hexToRgba(
                                    branding.buttonColor,
                                    0.1
                                  ),

                                borderColor:
                                  hexToRgba(
                                    branding.buttonColor,
                                    0.2
                                  ),

                                color:
                                  branding.buttonColor,

                                borderRadius:
                                  getButtonRadius(
                                    branding
                                  ),
                              }}
                            >
                              {cls.level}
                            </span>

                          )}

                        </div>


                        <FaArrowRight
                          className="
                            flex-shrink-0
                            text-sm
                            transition-transform
                            group-hover:translate-x-1
                          "
                          style={{
                            color:
                              branding.buttonColor,
                          }}
                        />

                      </Link>

                    )
                  )}

                </div>

              </section>

            )}

          </div>


          {/* =================================================
              RIGHT SIDEBAR
          ================================================= */}

          <div
            className="
              lg:col-span-1
            "
          >

            <div
              className="
                sticky
                top-24
                space-y-4
              "
            >

              {/* QUICK INFO */}

              <section
                className="p-6"
                style={cardStyle}
              >

                <h3
                  className="
                    mb-6
                    flex
                    items-center
                    gap-2
                    text-lg
                  "
                  style={headingStyle}
                >

                  <span
                    className="
                      h-5
                      w-1
                    "
                    style={{
                      backgroundColor:
                        branding.iconColor,

                      borderRadius:
                        getButtonRadius(
                          branding
                        ),
                    }}
                  />

                  Quick Info

                </h3>


                <QuickInfoRow
                  branding={
                    branding
                  }
                  icon={
                    <FaBriefcase />
                  }
                  label="Experience"
                  value={`${experience} Years`}
                />


                <QuickInfoRow
                  branding={
                    branding
                  }
                  icon={
                    <FaLanguage />
                  }
                  label="Languages"
                  value={
                    trainer.languages ||
                    "N/A"
                  }
                />


                <QuickInfoRow
                  branding={
                    branding
                  }
                  icon={
                    <FaBolt />
                  }
                  label="Response Rate"
                  value={
                    trainer.response_rate ||
                    "N/A"
                  }
                  last
                />

              </section>


              {/* INSTITUTE */}

              {trainerInstitutes.length >
                0 && (

                <section
                  className="
                    overflow-hidden
                  "
                  style={cardStyle}
                >

                  {trainerInstitutes.map(
                    (inst) => (

                      <div
                        key={
                          inst.id
                        }
                      >

                        {inst.image ? (

                          <img
                            src={
                              inst.image
                            }
                            alt={
                              inst.name ||
                              "Institute"
                            }
                            className="
                              h-48
                              w-full
                              object-cover
                            "
                          />

                        ) : (

                          <div
                            className="
                              flex
                              h-48
                              items-center
                              justify-center
                            "
                            style={{
                              backgroundColor:
                                hexToRgba(
                                  branding.buttonColor,
                                  0.1
                                ),
                            }}
                          >

                            <span
                              className="
                                text-4xl
                              "
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
                              {String(
                                inst.name ||
                                  "I"
                              )
                                .charAt(0)
                                .toUpperCase()}
                            </span>

                          </div>

                        )}


                        <div className="p-5">

                          <h2
                            className="text-2xl"
                            style={headingStyle}
                          >
                            {inst.name ||
                              "Institute"}
                          </h2>


                          {(inst.city ||
                            inst.state) && (

                            <p
                              className="
                                mt-2
                                text-xs
                              "
                              style={{
                                ...bodyStyle,
                                opacity: 0.6,
                              }}
                            >
                              {[
                                inst.city,
                                inst.state,
                              ]
                                .filter(
                                  Boolean
                                )
                                .join(
                                  ", "
                                )}
                            </p>

                          )}


                          <p
                            className="
                              mt-4
                              line-clamp-2
                              text-sm
                            "
                            style={{
                              ...bodyStyle,
                              opacity: 0.65,
                            }}
                          >
                            {inst.description ||
                              "Institute details are not available."}
                          </p>


                          <Link
                            to={`/institute/website/preview/institutes/${inst.id}`}
                            className="
                              mt-5
                              flex
                              w-full
                              items-center
                              justify-center
                              px-4
                              py-3
                              text-sm
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
                            View Institute
                          </Link>

                        </div>

                      </div>

                    )
                  )}

                </section>

              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};


export default WebsiteTrainerProfile;