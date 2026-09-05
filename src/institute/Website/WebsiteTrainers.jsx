// import { useState, useMemo, useEffect } from "react";
// import {
//   FaSearch,
//   FaStar,
//   FaUsers,
//   FaComment,
//   FaArrowRight,
//   FaChevronDown,
// } from "react-icons/fa";
// import { Link, useNavigate, useOutletContext } from "react-router-dom";

// /* =========================================================
//    Local UI components
//    No external Card/Button imports required.
// ========================================================= */

// const Card = ({ children, className = "", ...props }) => (
//   <div
//     className={`rounded-2xl bg-white border border-slate-200 ${className}`}
//     {...props}
//   >
//     {children}
//   </div>
// );

// const Button = ({
//   children,
//   variant = "solid",
//   fullWidth = false,
//   size = "md",
//   className = "",
//   type = "button",
//   ...props
// }) => {
//   const sizes = {
//     sm: "px-4 py-2 text-sm",
//     md: "px-5 py-2.5 text-sm",
//     lg: "px-6 py-3 text-base",
//   };

//   const variants = {
//     solid: "bg-primary-purple text-white hover:opacity-90",
//     outline:
//       "bg-white text-primary-purple border border-primary-purple/40 hover:bg-primary-purple/5",
//   };

//   return (
//     <button
//       type={type}
//       className={[
//         "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300",
//         sizes[size] || sizes.md,
//         variants[variant] || variants.solid,
//         fullWidth ? "w-full" : "",
//         className,
//       ].join(" ")}
//       {...props}
//     >
//       {children}
//     </button>
//   );
// };

// /* =========================================================
//    Helpers
// ========================================================= */

// const toArray = (value) => {
//   if (Array.isArray(value)) return value;
//   if (typeof value === "string") {
//     try {
//       const parsed = JSON.parse(value);
//       if (Array.isArray(parsed)) return parsed;
//     } catch {
//       // Not JSON; continue below.
//     }
//     return value
//       .split(",")
//       .map((item) => item.trim())
//       .filter(Boolean);
//   }
//   return [];
// };

// const firstValue = (...values) =>
//   values.find(
//     (value) =>
//       value !== undefined &&
//       value !== null &&
//       String(value).trim() !== ""
//   );

// const getBannerImage = (banner) =>
//   firstValue(
//     banner?.image_url,
//     banner?.imageUrl,
//     banner?.banner_url,
//     banner?.bannerUrl,
//     banner?.desktop_image_url,
//     banner?.desktopImageUrl,
//     banner?.image,
//     banner?.url
//   );

// const getBannerTitle = (banner) =>
//   firstValue(
//     banner?.title,
//     banner?.banner_title,
//     banner?.heading,
//     banner?.name,
//     "Our Trainers"
//   );

// const getBannerDescription = (banner) =>
//   firstValue(
//     banner?.description,
//     banner?.subtitle,
//     banner?.sub_title,
//     banner?.banner_description,
//     "Meet our experienced trainers and learn from the best."
//   );

// const isTrainerBanner = (banner) => {
//   if (!banner) return false;

//   const page = String(
//     firstValue(
//       banner.page,
//       banner.page_name,
//       banner.pageName,
//       banner.page_type,
//       banner.pageType,
//       banner.section,
//       banner.banner_type,
//       banner.bannerType
//     ) || ""
//   ).toLowerCase();

//   return (
//     page.includes("trainer") ||
//     page.includes("trainers") ||
//     page.includes("teacher") ||
//     page.includes("faculty")
//   );
// };

// /* =========================================================
//    Website Trainers
// ========================================================= */

// const WebsiteTrainers = () => {
//   const outletContext = useOutletContext() || {};
//   const navigate = useNavigate();

//   const outletTrainers = outletContext.trainers;
//   const outletBanners = outletContext.banners;

//   const [trainers, setTrainers] = useState([]);
//   const [banners, setBanners] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [searchQuery, setSearchQuery] = useState("");
//   const [filterSpecialty, setFilterSpecialty] = useState("all");

//   /* ---------------------------------------------------------
//      Sync dashboard data from website outlet context.
//      The banner is NOT hardcoded. It comes from the
//      institute-dashboard banner data exposed to this website.
//   --------------------------------------------------------- */

//   useEffect(() => {
//     setTrainers(Array.isArray(outletTrainers) ? outletTrainers : []);
//     setBanners(Array.isArray(outletBanners) ? outletBanners : []);
//     setLoading(false);
//   }, [outletTrainers, outletBanners]);

//   /* ---------------------------------------------------------
//      Select the Trainers banner.
//      If dashboard stores banners without a page field,
//      the first available banner is used as a fallback.
//   --------------------------------------------------------- */

//   const trainerBanner = useMemo(() => {
//     if (!banners.length) return null;

//     const matchingBanner = banners.find(isTrainerBanner);
//     return matchingBanner || banners[0];
//   }, [banners]);

//   /* ---------------------------------------------------------
//      Normalize skills so both JSON strings and arrays work.
//   --------------------------------------------------------- */

//   const getSkills = (trainer) => toArray(trainer?.skills);

//   const specialties = useMemo(() => {
//     const values = trainers.flatMap((trainer) => getSkills(trainer));

//     return [
//       "all",
//       ...Array.from(
//         new Set(
//           values
//             .map((skill) => String(skill).trim())
//             .filter(Boolean)
//         )
//       ),
//     ];
//   }, [trainers]);

//   /* ---------------------------------------------------------
//      Filter trainers
//   --------------------------------------------------------- */

//   const filteredTrainers = useMemo(() => {
//     const query = searchQuery.trim().toLowerCase();

//     return trainers.filter((trainer) => {
//       const fullName = String(trainer?.full_name || "").toLowerCase();
//       const bio = String(trainer?.bio || "").toLowerCase();
//       const skills = getSkills(trainer).map((skill) =>
//         String(skill).trim().toLowerCase()
//       );

//       const matchesSearch =
//         !query ||
//         fullName.includes(query) ||
//         bio.includes(query) ||
//         skills.some((skill) => skill.includes(query));

//       const matchesSpecialty =
//         filterSpecialty === "all" ||
//         skills.includes(String(filterSpecialty).toLowerCase());

//       return matchesSearch && matchesSpecialty;
//     });
//   }, [trainers, searchQuery, filterSpecialty]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-white">
//         <p className="text-slate-600 text-lg">Loading trainers...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-white text-slate-900 pb-20">

//       {/* =====================================================
//           HERO / DASHBOARD BANNER
//           Image is fetched from institute dashboard banners.
//       ===================================================== */}
//       {trainerBanner && getBannerImage(trainerBanner) ? (
//         <section className="relative overflow-hidden">
//           <div className="relative min-h-[360px] md:min-h-[430px]">
//             <img
//               src={getBannerImage(trainerBanner)}
//               alt={getBannerTitle(trainerBanner)}
//               className="absolute inset-0 h-full w-full object-cover"
//               onError={(event) => {
//                 event.currentTarget.style.display = "none";
//               }}
//             />

//             {/* Overlay for readable content */}
//             <div className="absolute inset-0 bg-gradient-to-r from-[#17103f]/95 via-[#29135f]/75 to-black/10" />

//             <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 min-h-[360px] md:min-h-[430px] flex items-center">
//               <div className="max-w-2xl text-white">
//                 <nav className="flex items-center gap-2 text-sm text-white/80 mb-5">
//                   <Link
//                     to="/institute/website/preview"
//                     className="hover:text-white transition"
//                   >
//                     Home
//                   </Link>
//                   <span>›</span>
//                   <span>Trainers</span>
//                 </nav>

//                 <p className="text-sm md:text-base font-semibold uppercase tracking-[0.18em] text-white/80 mb-3">
//                   Our Faculty
//                 </p>

//                 <h1 className="text-4xl md:text-6xl font-black leading-tight mb-4">
//                   {getBannerTitle(trainerBanner)}
//                 </h1>

//                 <p className="text-base md:text-lg text-white/90 max-w-xl leading-relaxed">
//                   {getBannerDescription(trainerBanner)}
//                 </p>

//                 <div className="mt-7 flex flex-col sm:flex-row gap-3">
//                   <a
//                     href="#trainers"
//                     className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 font-semibold text-[#4f20b8] hover:bg-white/90 transition"
//                   >
//                     Meet Our Trainers
//                     <FaArrowRight className="ml-2 text-sm" />
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       ) : (
//         /* No dashboard banner available: keep layout clean instead of
//            inserting an unrelated/hardcoded image. */
//         <section className="bg-gradient-to-r from-[#24104f] to-[#6427b8] text-white">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
//             <nav className="flex items-center gap-2 text-sm text-white/80 mb-5">
//               <Link
//                 to="/institute/website/preview"
//                 className="hover:text-white transition"
//               >
//                 Home
//               </Link>
//               <span>›</span>
//               <span>Trainers</span>
//             </nav>

//             <h1 className="text-4xl md:text-6xl font-black mb-4">
//               Our Expert Trainers
//             </h1>

//             <p className="text-white/90 max-w-2xl text-lg">
//               Learn from certified professionals and experienced trainers.
//             </p>
//           </div>
//         </section>
//       )}

//       {/* =====================================================
//           SEARCH + FILTER
//       ===================================================== */}
//       <section id="trainers" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
//         <div className="text-center mb-8">
//           <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary-purple mb-2">
//             OUR TEAM
//           </p>

//           <h2 className="text-3xl md:text-4xl font-black text-slate-900">
//             Meet Our Expert Trainers
//           </h2>

//           <p className="mt-3 text-slate-500 max-w-2xl mx-auto">
//             Find the right trainer based on expertise, experience and
//             specialty.
//           </p>
//         </div>

//         <div className="flex flex-col lg:flex-row gap-4 mb-10">
//           {/* Search */}
//           <div className="relative flex-1">
//             <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(event) => setSearchQuery(event.target.value)}
//               placeholder="Search trainers..."
//               className="w-full h-14 pl-12 pr-4 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 outline-none focus:border-primary-purple focus:ring-2 focus:ring-primary-purple/10 transition"
//             />
//           </div>

//           {/* Specialty */}
//           <div className="relative lg:w-[260px]">
//             <select
//               value={filterSpecialty}
//               onChange={(event) => setFilterSpecialty(event.target.value)}
//               className="w-full h-14 appearance-none px-4 pr-10 rounded-xl bg-white border border-slate-200 text-slate-700 outline-none focus:border-primary-purple focus:ring-2 focus:ring-primary-purple/10 transition cursor-pointer"
//             >
//               {specialties.map((specialty) => (
//                 <option key={specialty} value={specialty}>
//                   {specialty === "all" ? "All Specialties" : specialty}
//                 </option>
//               ))}
//             </select>

//             <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-sm" />
//           </div>
//         </div>

//         {/* ===================================================
//             TRAINER GRID
//         =================================================== */}
//         {filteredTrainers.length === 0 ? (
//           <div className="text-center py-20 rounded-2xl bg-slate-50 border border-slate-200">
//             <h3 className="text-xl font-bold text-slate-800">
//               No trainers found
//             </h3>

//             <p className="mt-2 text-slate-500">
//               Try another search term or specialty.
//             </p>

//             <button
//               onClick={() => {
//                 setSearchQuery("");
//                 setFilterSpecialty("all");
//               }}
//               className="mt-5 px-6 py-2.5 rounded-xl bg-primary-purple text-white font-semibold hover:opacity-90 transition"
//             >
//               Clear Filters
//             </button>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {filteredTrainers.map((trainer) => {
//               const skills = getSkills(trainer);
//               const rating = Number(trainer?.rating || 0);
//               const experience = Number(trainer?.experience_years || 0);
//               const students = Number(trainer?.total_students || 0);
//               const reviews = Number(trainer?.total_reviews || 0);

//               return (
//                 <Card
//                   key={trainer?.id || trainer?._id}
//                   className="overflow-hidden group flex flex-col h-full hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
//                 >
//                   {/* Trainer Image */}
//                   <div className="relative h-64 bg-slate-100 overflow-hidden">
//                     <img
//                       src={
//                         trainer?.profile_image ||
//                         "https://placehold.co/600x600/png?text=Trainer"
//                       }
//                       alt={trainer?.full_name || "Trainer"}
//                       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                       loading="lazy"
//                       onError={(event) => {
//                         event.currentTarget.onerror = null;
//                         event.currentTarget.src =
//                           "https://placehold.co/600x600/png?text=Trainer";
//                       }}
//                     />

//                     {experience > 0 && (
//                       <span className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-white/95 text-slate-800 text-xs font-bold shadow">
//                         {experience} yrs experience
//                       </span>
//                     )}
//                   </div>

//                   {/* Content */}
//                   <div className="p-5 flex flex-col flex-1">
//                     <h3 className="text-xl font-bold text-slate-900 truncate">
//                       {trainer?.full_name || "Trainer"}
//                     </h3>

//                     <div className="flex flex-wrap gap-2 mt-3 min-h-[28px]">
//                       {skills.slice(0, 3).map((skill, index) => (
//                         <span
//                           key={`${skill}-${index}`}
//                           className="px-2.5 py-1 rounded-full bg-primary-purple/10 text-primary-purple text-xs font-semibold"
//                         >
//                           {String(skill).trim()}
//                         </span>
//                       ))}

//                       {!skills.length && (
//                         <span className="text-sm text-slate-500">
//                           Professional Trainer
//                         </span>
//                       )}
//                     </div>

//                     <p className="text-sm text-slate-500 leading-relaxed mt-4 line-clamp-3">
//                       {trainer?.bio ||
//                         "No bio available for this trainer."}
//                     </p>

//                     {/* Rating */}
//                     <div className="mt-5">
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-1">
//                           {[1, 2, 3, 4, 5].map((star) => (
//                             <FaStar
//                               key={star}
//                               className={
//                                 star <= Math.round(rating)
//                                   ? "text-amber-400"
//                                   : "text-slate-200"
//                               }
//                             />
//                           ))}
//                         </div>

//                         <span className="font-bold text-slate-800">
//                           {rating.toFixed(1)}
//                         </span>
//                       </div>

//                       <div className="mt-2 h-1.5 rounded-full bg-slate-100 overflow-hidden">
//                         <div
//                           className="h-full rounded-full bg-primary-purple transition-all duration-500"
//                           style={{
//                             width: `${Math.min(
//                               Math.max((rating / 5) * 100, 0),
//                               100
//                             )}%`,
//                           }}
//                         />
//                       </div>
//                     </div>

//                     {/* Stats */}
//                     <div className="grid grid-cols-2 gap-3 mt-5">
//                       <div className="rounded-xl bg-slate-50 border border-slate-100 p-3">
//                         <div className="flex items-center gap-2">
//                           <FaUsers className="text-primary-purple text-sm" />
//                           <span className="text-sm font-bold text-slate-800">
//                             {students.toLocaleString()}
//                           </span>
//                         </div>
//                         <p className="text-xs text-slate-500 mt-1">
//                           Students
//                         </p>
//                       </div>

//                       <div className="rounded-xl bg-slate-50 border border-slate-100 p-3">
//                         <div className="flex items-center gap-2">
//                           <FaComment className="text-primary-purple text-sm" />
//                           <span className="text-sm font-bold text-slate-800">
//                             {reviews.toLocaleString()}
//                           </span>
//                         </div>
//                         <p className="text-xs text-slate-500 mt-1">
//                           Reviews
//                         </p>
//                       </div>
//                     </div>

//                     {/* CTA */}
//                     <div className="mt-auto pt-5">
//                       <Button
//                         variant="outline"
//                         fullWidth
//                         size="sm"
//                         onClick={() => {
//                           const trainerId =
//                             trainer?.id || trainer?._id;

//                           if (!trainerId) {
//                             console.error(
//                               "Trainer profile navigation failed: trainer ID is missing.",
//                               trainer
//                             );
//                             return;
//                           }

//                           navigate(
//                             `/institute/website/preview/trainers/${trainerId}`
//                           );
//                         }}
//                       >
//                         View Profile
//                         <FaArrowRight className="ml-2 text-xs" />
//                       </Button>
//                     </div>
//                   </div>
//                 </Card>
//               );
//             })}
//           </div>
//         )}
//       </section>
//     </div>
//   );
// };

// export default WebsiteTrainers;


// import { useState, useMemo, useEffect } from "react";
// import {
//   FaSearch,
//   FaStar,
//   FaUsers,
//   FaComment,
//   FaArrowRight,
//   FaChevronDown,
// } from "react-icons/fa";
// import {
//   Link,
//   useNavigate,
//   useOutletContext,
// } from "react-router-dom";

// /* =========================================================
//    DEFAULT BRANDING
//    Branding module is the source of truth.
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
//   branding,
//   large = false
// ) => {
//   if (branding.roundedButtons) {
//     return "9999px";
//   }

//   return large ? "12px" : "8px";
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
//    LOCAL CARD
// ========================================================= */

// const Card = ({
//   children,
//   className = "",
//   style = {},
//   ...props
// }) => (
//   <div
//     className={className}
//     style={style}
//     {...props}
//   >
//     {children}
//   </div>
// );


// /* =========================================================
//    LOCAL BUTTON
// ========================================================= */

// const Button = ({
//   children,
//   variant = "solid",
//   fullWidth = false,
//   size = "md",
//   className = "",
//   type = "button",
//   branding,
//   style = {},
//   ...props
// }) => {

//   const sizes = {
//     sm: "px-4 py-2 text-sm",
//     md: "px-5 py-2.5 text-sm",
//     lg: "px-6 py-3 text-base",
//   };

//   const sizeClass =
//     sizes[size] || sizes.md;

//   const baseStyle = {
//     display: "inline-flex",
//     alignItems: "center",
//     justifyContent: "center",

//     width: fullWidth
//       ? "100%"
//       : undefined,

//     borderRadius:
//       getButtonRadius(
//         branding,
//         size === "lg"
//       ),

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

//     transition:
//       "all 0.3s ease",

//     cursor: "pointer",

//     ...(variant === "outline"
//       ? {
//           backgroundColor:
//             branding.cardBackgroundColor,

//           color:
//             branding.buttonColor,

//           border:
//             `1px solid ${branding.buttonColor}`,
//         }
//       : {
//           backgroundColor:
//             branding.buttonColor,

//           color:
//             branding.buttonTextColor,

//           border:
//             `1px solid ${branding.buttonColor}`,
//         }),

//     ...style,
//   };

//   return (
//     <button
//       type={type}
//       className={[
//         "font-semibold",
//         sizeClass,
//         className,
//       ].join(" ")}
//       style={baseStyle}
//       {...props}
//     >
//       {children}
//     </button>
//   );
// };


// /* =========================================================
//    HELPERS
// ========================================================= */

// const toArray = (value) => {

//   if (
//     Array.isArray(value)
//   ) {
//     return value;
//   }

//   if (
//     typeof value === "string"
//   ) {

//     try {

//       const parsed =
//         JSON.parse(value);

//       if (
//         Array.isArray(parsed)
//       ) {
//         return parsed;
//       }

//     } catch {
//       // Continue below.
//     }

//     return value
//       .split(",")
//       .map(
//         (item) =>
//           item.trim()
//       )
//       .filter(Boolean);
//   }

//   return [];
// };


// const firstValue = (
//   ...values
// ) =>
//   values.find(
//     (value) =>
//       value !== undefined &&
//       value !== null &&
//       String(value).trim() !== ""
//   );


// const getBannerImage = (
//   banner
// ) =>
//   firstValue(
//     banner?.image_url,
//     banner?.imageUrl,
//     banner?.banner_url,
//     banner?.bannerUrl,
//     banner?.desktop_image_url,
//     banner?.desktopImageUrl,
//     banner?.image,
//     banner?.url
//   );


// const getBannerTitle = (
//   banner
// ) =>
//   firstValue(
//     banner?.title,
//     banner?.banner_title,
//     banner?.heading,
//     banner?.name,
//     "Our Trainers"
//   );


// const getBannerDescription = (
//   banner
// ) =>
//   firstValue(
//     banner?.description,
//     banner?.subtitle,
//     banner?.sub_title,
//     banner?.banner_description,
//     "Meet our experienced trainers and learn from the best."
//   );


// const isTrainerBanner = (
//   banner
// ) => {

//   if (!banner) {
//     return false;
//   }

//   const page =
//     String(
//       firstValue(
//         banner.page,
//         banner.page_name,
//         banner.pageName,
//         banner.page_type,
//         banner.pageType,
//         banner.section,
//         banner.banner_type,
//         banner.bannerType
//       ) || ""
//     ).toLowerCase();

//   return (
//     page.includes("trainer") ||
//     page.includes("trainers") ||
//     page.includes("teacher") ||
//     page.includes("faculty")
//   );
// };


// /* =========================================================
//    WEBSITE TRAINERS
// ========================================================= */

// const WebsiteTrainers = () => {

//   const outletContext =
//     useOutletContext() || {};

//   const navigate =
//     useNavigate();


//   /* =======================================================
//      GET WEBSITE DATA
//   ======================================================= */

//   const outletTrainers =
//     outletContext.trainers;

//   const outletBanners =
//     outletContext.banners;


//   /*
//     Branding can be provided through:
//       branding
//       websiteBranding
//       brand

//     This makes the page compatible with
//     your existing website preview context.
//   */

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


//   /* =======================================================
//      STATE
//   ======================================================= */

//   const [
//     trainers,
//     setTrainers,
//   ] = useState([]);

//   const [
//     banners,
//     setBanners,
//   ] = useState([]);

//   const [
//     loading,
//     setLoading,
//   ] = useState(true);

//   const [
//     searchQuery,
//     setSearchQuery,
//   ] = useState("");

//   const [
//     filterSpecialty,
//     setFilterSpecialty,
//   ] = useState("all");


//   /* =======================================================
//      SYNC DASHBOARD DATA
//   ======================================================= */

//   useEffect(() => {

//     setTrainers(
//       Array.isArray(
//         outletTrainers
//       )
//         ? outletTrainers
//         : []
//     );

//     setBanners(
//       Array.isArray(
//         outletBanners
//       )
//         ? outletBanners
//         : []
//     );

//     setLoading(false);

//   }, [
//     outletTrainers,
//     outletBanners,
//   ]);


//   /* =======================================================
//      DEBUG BRANDING
//   ======================================================= */

//   useEffect(() => {

//     console.log(
//       "================================"
//     );

//     console.log(
//       "WEBSITE TRAINERS BRANDING"
//     );

//     console.log(
//       branding
//     );

//     console.log(
//       "================================"
//     );

//   }, [branding]);


//   /* =======================================================
//      SELECT TRAINER BANNER
//   ======================================================= */

//   const trainerBanner =
//     useMemo(() => {

//       if (
//         !banners.length
//       ) {
//         return null;
//       }

//       const matchingBanner =
//         banners.find(
//           isTrainerBanner
//         );

//       return (
//         matchingBanner ||
//         banners[0]
//       );

//     }, [banners]);


//   /* =======================================================
//      TRAINER SKILLS
//   ======================================================= */

//   const getSkills = (
//     trainer
//   ) =>
//     toArray(
//       trainer?.skills
//     );


//   /* =======================================================
//      SPECIALTIES
//   ======================================================= */

//   const specialties =
//     useMemo(() => {

//       const values =
//         trainers.flatMap(
//           (trainer) =>
//             getSkills(
//               trainer
//             )
//         );

//       return [
//         "all",
//         ...Array.from(
//           new Set(
//             values
//               .map(
//                 (skill) =>
//                   String(
//                     skill
//                   ).trim()
//               )
//               .filter(Boolean)
//           )
//         ),
//       ];

//     }, [trainers]);


//   /* =======================================================
//      FILTER TRAINERS
//   ======================================================= */

//   const filteredTrainers =
//     useMemo(() => {

//       const query =
//         searchQuery
//           .trim()
//           .toLowerCase();

//       return trainers.filter(
//         (trainer) => {

//           const fullName =
//             String(
//               trainer?.full_name ||
//                 ""
//             ).toLowerCase();

//           const bio =
//             String(
//               trainer?.bio || ""
//             ).toLowerCase();

//           const skills =
//             getSkills(
//               trainer
//             ).map(
//               (skill) =>
//                 String(
//                   skill
//                 )
//                   .trim()
//                   .toLowerCase()
//             );


//           const matchesSearch =
//             !query ||
//             fullName.includes(
//               query
//             ) ||
//             bio.includes(
//               query
//             ) ||
//             skills.some(
//               (skill) =>
//                 skill.includes(
//                   query
//                 )
//             );


//           const matchesSpecialty =
//             filterSpecialty ===
//               "all" ||
//             skills.includes(
//               String(
//                 filterSpecialty
//               ).toLowerCase()
//             );


//           return (
//             matchesSearch &&
//             matchesSpecialty
//           );
//         }
//       );

//     }, [
//       trainers,
//       searchQuery,
//       filterSpecialty,
//     ]);


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
//               mb-5
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
//             className="text-lg"
//             style={{
//               ...bodyStyle,
//               opacity: 0.7,
//             }}
//           >
//             Loading trainers...
//           </p>

//         </div>

//       </div>
//     );
//   }


//   /* =======================================================
//      MAIN
//   ======================================================= */

//   return (
//     <div
//       className="
//         min-h-screen
//         pb-20
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

//       {/* =====================================================
//           HERO / DASHBOARD BANNER
//       ===================================================== */}

//       {trainerBanner &&
//       getBannerImage(
//         trainerBanner
//       ) ? (

//         <section
//           className="
//             relative
//             overflow-hidden
//           "
//         >

//           <div
//             className="
//               relative
//               min-h-[360px]
//               md:min-h-[430px]
//             "
//           >

//             <img
//               src={getBannerImage(
//                 trainerBanner
//               )}
//               alt={getBannerTitle(
//                 trainerBanner
//               )}
//               className="
//                 absolute
//                 inset-0
//                 h-full
//                 w-full
//                 object-cover
//               "
//               onError={(event) => {
//                 event.currentTarget.style.display =
//                   "none";
//               }}
//             />


//             {/* Branding-based overlay */}

//             <div
//               className="
//                 absolute
//                 inset-0
//               "
//               style={{
//                 background: `linear-gradient(
//                   90deg,
//                   ${hexToRgba(
//                     branding.navbarColor,
//                     0.96
//                   )} 0%,
//                   ${hexToRgba(
//                     branding.buttonColor,
//                     0.72
//                   )} 55%,
//                   rgba(0,0,0,0.05) 100%
//                 )`,
//               }}
//             />


//             <div
//               className="
//                 relative
//                 z-10
//                 mx-auto
//                 max-w-7xl
//                 min-h-[360px]
//                 px-4
//                 py-12
//                 flex
//                 items-center
//                 sm:px-6
//                 md:min-h-[430px]
//                 md:py-16
//                 lg:px-8
//               "
//             >

//               <div
//                 className="
//                   max-w-2xl
//                 "
//               >

//                 {/* Breadcrumb */}

//                 <nav
//                   className="
//                     mb-5
//                     flex
//                     items-center
//                     gap-2
//                     text-sm
//                   "
//                   style={{
//                     color:
//                       hexToRgba(
//                         branding.buttonTextColor,
//                         0.8
//                       ),

//                     fontFamily:
//                       fontFamily(
//                         branding.fontBody
//                       ),
//                   }}
//                 >

//                   <Link
//                     to="/institute/website/preview"
//                     className="transition"
//                     style={{
//                       color:
//                         hexToRgba(
//                           branding.buttonTextColor,
//                           0.8
//                         ),
//                     }}
//                   >
//                     Home
//                   </Link>

//                   <span>
//                     ›
//                   </span>

//                   <span>
//                     Trainers
//                   </span>

//                 </nav>


//                 {/* Label */}

//                 <p
//                   className="
//                     mb-3
//                     text-sm
//                     uppercase
//                     tracking-[0.18em]
//                     md:text-base
//                   "
//                   style={{
//                     color:
//                       hexToRgba(
//                         branding.buttonTextColor,
//                         0.8
//                       ),

//                     fontFamily:
//                       fontFamily(
//                         branding.fontSubheading
//                       ),

//                     fontWeight:
//                       branding.subheadingWeight,

//                     lineHeight:
//                       branding.subheadingLineHeight,
//                   }}
//                 >
//                   Our Faculty
//                 </p>


//                 {/* Heading */}

//                 <h1
//                   className="
//                     mb-4
//                     text-4xl
//                     leading-tight
//                     md:text-6xl
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
//                   {getBannerTitle(
//                     trainerBanner
//                   )}
//                 </h1>


//                 {/* Description */}

//                 <p
//                   className="
//                     max-w-xl
//                     text-base
//                     leading-relaxed
//                     md:text-lg
//                   "
//                   style={{
//                     color:
//                       hexToRgba(
//                         branding.buttonTextColor,
//                         0.9
//                       ),

//                     fontFamily:
//                       fontFamily(
//                         branding.fontBody
//                       ),

//                     fontWeight:
//                       branding.bodyWeight,

//                     lineHeight:
//                       branding.bodyLineHeight,
//                   }}
//                 >
//                   {getBannerDescription(
//                     trainerBanner
//                   )}
//                 </p>


//                 {/* CTA */}

//                 <div
//                   className="
//                     mt-7
//                     flex
//                     flex-col
//                     gap-3
//                     sm:flex-row
//                   "
//                 >

//                   <a
//                     href="#trainers"
//                     className="
//                       inline-flex
//                       items-center
//                       justify-center
//                       px-6
//                       py-3
//                       transition
//                     "
//                     style={{
//                       backgroundColor:
//                         branding.buttonTextColor,

//                       color:
//                         branding.buttonColor,

//                       borderRadius:
//                         getButtonRadius(
//                           branding,
//                           true
//                         ),

//                       fontFamily:
//                         fontFamily(
//                           branding.fontBody
//                         ),

//                       fontWeight:
//                         branding.bodyWeight,
//                     }}
//                   >

//                     Meet Our Trainers

//                     <FaArrowRight
//                       className="ml-2 text-sm"
//                     />

//                   </a>

//                 </div>

//               </div>

//             </div>

//           </div>

//         </section>

//       ) : (

//         /* ===================================================
//            FALLBACK HERO
//         =================================================== */

//         <section
//           style={{
//             backgroundColor:
//               branding.navbarColor,
//           }}
//         >

//           <div
//             className="
//               mx-auto
//               max-w-7xl
//               px-4
//               py-14
//               sm:px-6
//               md:py-20
//               lg:px-8
//             "
//           >

//             <nav
//               className="
//                 mb-5
//                 flex
//                 items-center
//                 gap-2
//                 text-sm
//               "
//               style={{
//                 color:
//                   hexToRgba(
//                     branding.buttonTextColor,
//                     0.8
//                   ),

//                 fontFamily:
//                   fontFamily(
//                     branding.fontBody
//                   ),
//               }}
//             >

//               <Link
//                 to="/institute/website/preview"
//                 style={{
//                   color:
//                     hexToRgba(
//                       branding.buttonTextColor,
//                       0.8
//                     ),
//                 }}
//               >
//                 Home
//               </Link>

//               <span>
//                 ›
//               </span>

//               <span>
//                 Trainers
//               </span>

//             </nav>


//             <p
//               className="
//                 mb-3
//                 text-sm
//                 uppercase
//                 tracking-[0.18em]
//               "
//               style={{
//                 color:
//                   hexToRgba(
//                     branding.buttonTextColor,
//                     0.75
//                   ),

//                 fontFamily:
//                   fontFamily(
//                     branding.fontSubheading
//                   ),

//                 fontWeight:
//                   branding.subheadingWeight,
//               }}
//             >
//               Our Faculty
//             </p>


//             <h1
//               className="
//                 mb-4
//                 text-4xl
//                 md:text-6xl
//               "
//               style={{
//                 color:
//                   branding.buttonTextColor,

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
//               Our Expert Trainers
//             </h1>


//             <p
//               className="
//                 max-w-2xl
//                 text-lg
//               "
//               style={{
//                 color:
//                   hexToRgba(
//                     branding.buttonTextColor,
//                     0.9
//                   ),

//                 fontFamily:
//                   fontFamily(
//                     branding.fontBody
//                   ),

//                 fontWeight:
//                   branding.bodyWeight,

//                 lineHeight:
//                   branding.bodyLineHeight,
//               }}
//             >
//               Learn from certified
//               professionals and
//               experienced trainers.
//             </p>

//           </div>

//         </section>

//       )}


//       {/* =====================================================
//           SEARCH + FILTER
//       ===================================================== */}

//       <section
//         id="trainers"
//         className="
//           mx-auto
//           max-w-7xl
//           px-4
//           pt-12
//           sm:px-6
//           lg:px-8
//         "
//       >

//         <div
//           className="
//             mb-8
//             text-center
//           "
//         >

//           <p
//             className="
//               mb-2
//               text-sm
//               uppercase
//               tracking-[0.18em]
//             "
//             style={subheadingStyle}
//           >
//             OUR TEAM
//           </p>


//           <h2
//             className="
//               text-3xl
//               md:text-4xl
//             "
//             style={headingStyle}
//           >
//             Meet Our Expert Trainers
//           </h2>


//           <p
//             className="
//               mx-auto
//               mt-3
//               max-w-2xl
//             "
//             style={{
//               ...bodyStyle,
//               opacity: 0.65,
//             }}
//           >
//             Find the right trainer
//             based on expertise,
//             experience and specialty.
//           </p>

//         </div>


//         {/* Search + Specialty */}

//         <div
//           className="
//             mb-10
//             flex
//             flex-col
//             gap-4
//             lg:flex-row
//           "
//         >

//           {/* Search */}

//           <div
//             className="
//               relative
//               flex-1
//             "
//           >

//             <FaSearch
//               className="
//                 absolute
//                 left-4
//                 top-1/2
//                 -translate-y-1/2
//               "
//               style={{
//                 color:
//                   hexToRgba(
//                     branding.textColor,
//                     0.45
//                   ),
//               }}
//             />


//             <input
//               type="text"
//               value={
//                 searchQuery
//               }
//               onChange={(
//                 event
//               ) =>
//                 setSearchQuery(
//                   event.target.value
//                 )
//               }
//               placeholder="Search trainers..."
//               className="
//                 h-14
//                 w-full
//                 border
//                 px-12
//                 pr-4
//                 outline-none
//                 transition
//               "
//               style={{
//                 backgroundColor:
//                   branding.cardBackgroundColor,

//                 color:
//                   branding.textColor,

//                 borderColor:
//                   hexToRgba(
//                     branding.textColor,
//                     0.15
//                   ),

//                 borderRadius:
//                   "12px",

//                 fontFamily:
//                   fontFamily(
//                     branding.fontBody
//                   ),

//                 fontWeight:
//                   branding.bodyWeight,

//                 lineHeight:
//                   branding.bodyLineHeight,
//               }}
//             />

//           </div>


//           {/* Specialty */}

//           <div
//             className="
//               relative
//               lg:w-[260px]
//             "
//           >

//             <select
//               value={
//                 filterSpecialty
//               }
//               onChange={(
//                 event
//               ) =>
//                 setFilterSpecialty(
//                   event.target.value
//                 )
//               }
//               className="
//                 h-14
//                 w-full
//                 appearance-none
//                 border
//                 px-4
//                 pr-10
//                 outline-none
//                 transition
//                 cursor-pointer
//               "
//               style={{
//                 backgroundColor:
//                   branding.cardBackgroundColor,

//                 color:
//                   branding.textColor,

//                 borderColor:
//                   hexToRgba(
//                     branding.textColor,
//                     0.15
//                   ),

//                 borderRadius:
//                   "12px",

//                 fontFamily:
//                   fontFamily(
//                     branding.fontBody
//                   ),

//                 fontWeight:
//                   branding.bodyWeight,
//               }}
//             >

//               {specialties.map(
//                 (
//                   specialty
//                 ) => (

//                   <option
//                     key={
//                       specialty
//                     }
//                     value={
//                       specialty
//                     }
//                   >
//                     {specialty ===
//                     "all"
//                       ? "All Specialties"
//                       : specialty}
//                   </option>

//                 )
//               )}

//             </select>


//             <FaChevronDown
//               className="
//                 pointer-events-none
//                 absolute
//                 right-4
//                 top-1/2
//                 -translate-y-1/2
//               "
//               style={{
//                 color:
//                   hexToRgba(
//                     branding.textColor,
//                     0.45
//                   ),
//               }}
//             />

//           </div>

//         </div>


//         {/* ===================================================
//             TRAINER GRID
//         =================================================== */}

//         {filteredTrainers.length ===
//         0 ? (

//           <div
//             className="
//               rounded-2xl
//               border
//               py-20
//               text-center
//             "
//             style={{
//               backgroundColor:
//                 branding.cardBackgroundColor,

//               borderColor:
//                 hexToRgba(
//                   branding.textColor,
//                   0.12
//                 ),
//             }}
//           >

//             <h3
//               className="text-xl"
//               style={headingStyle}
//             >
//               No trainers found
//             </h3>


//             <p
//               className="mt-2"
//               style={{
//                 ...bodyStyle,
//                 opacity: 0.65,
//               }}
//             >
//               Try another search
//               term or specialty.
//             </p>


//             <Button
//               branding={
//                 branding
//               }
//               size="md"
//               className="mt-5"
//               onClick={() => {
//                 setSearchQuery("");
//                 setFilterSpecialty(
//                   "all"
//                 );
//               }}
//             >
//               Clear Filters
//             </Button>

//           </div>

//         ) : (

//           <div
//             className="
//               grid
//               grid-cols-1
//               gap-6
//               sm:grid-cols-2
//               lg:grid-cols-3
//               xl:grid-cols-4
//             "
//           >

//             {filteredTrainers.map(
//               (trainer) => {

//                 const skills =
//                   getSkills(
//                     trainer
//                   );

//                 const rating =
//                   Number(
//                     trainer?.rating ||
//                       0
//                   );

//                 const experience =
//                   Number(
//                     trainer?.experience_years ||
//                       0
//                   );

//                 const students =
//                   Number(
//                     trainer?.total_students ||
//                       0
//                   );

//                 const reviews =
//                   Number(
//                     trainer?.total_reviews ||
//                       0
//                   );


//                 const trainerId =
//                   trainer?.id ||
//                   trainer?._id;


//                 return (
//                   <Card
//                     key={
//                       trainerId
//                     }
//                     className="
//                       group
//                       flex
//                       h-full
//                       flex-col
//                       overflow-hidden
//                       transition-all
//                       duration-300
//                       hover:-translate-y-1
//                     "
//                     style={{
//                       backgroundColor:
//                         branding.cardBackgroundColor,

//                       border:
//                         `1px solid ${hexToRgba(
//                           branding.textColor,
//                           0.12
//                         )}`,

//                       borderRadius:
//                         "18px",

//                       boxShadow:
//                         "0 2px 10px rgba(0,0,0,0.04)",
//                     }}
//                   >

//                     {/* ======================================
//                         TRAINER IMAGE
//                     ====================================== */}

//                     <div
//                       className="
//                         relative
//                         h-64
//                         overflow-hidden
//                       "
//                       style={{
//                         backgroundColor:
//                           hexToRgba(
//                             branding.textColor,
//                             0.05
//                           ),
//                       }}
//                     >

//                       <img
//                         src={
//                           trainer?.profile_image ||
//                           "https://placehold.co/600x600/png?text=Trainer"
//                         }
//                         alt={
//                           trainer?.full_name ||
//                           "Trainer"
//                         }
//                         className="
//                           h-full
//                           w-full
//                           object-cover
//                           transition-transform
//                           duration-500
//                           group-hover:scale-105
//                         "
//                         loading="lazy"
//                         onError={(
//                           event
//                         ) => {

//                           event.currentTarget.onerror =
//                             null;

//                           event.currentTarget.src =
//                             "https://placehold.co/600x600/png?text=Trainer";

//                         }}
//                       />


//                       {/* Experience */}

//                       {experience >
//                         0 && (

//                         <span
//                           className="
//                             absolute
//                             right-4
//                             top-4
//                             px-3
//                             py-1.5
//                             text-xs
//                           "
//                           style={{
//                             backgroundColor:
//                               branding.cardBackgroundColor,

//                             color:
//                               branding.headingColor,

//                             borderRadius:
//                               getButtonRadius(
//                                 branding
//                               ),

//                             fontFamily:
//                               fontFamily(
//                                 branding.fontBody
//                               ),

//                             fontWeight:
//                               branding.headingWeight,

//                             boxShadow:
//                               "0 2px 8px rgba(0,0,0,0.08)",
//                           }}
//                         >
//                           {experience}{" "}
//                           yrs experience
//                         </span>

//                       )}

//                     </div>


//                     {/* ======================================
//                         CONTENT
//                     ====================================== */}

//                     <div
//                       className="
//                         flex
//                         flex-1
//                         flex-col
//                         p-5
//                       "
//                     >

//                       {/* Name */}

//                       <h3
//                         className="
//                           truncate
//                           text-xl
//                         "
//                         style={
//                           headingStyle
//                         }
//                       >
//                         {trainer?.full_name ||
//                           "Trainer"}
//                       </h3>


//                       {/* Skills */}

//                       <div
//                         className="
//                           mt-3
//                           flex
//                           min-h-[28px]
//                           flex-wrap
//                           gap-2
//                         "
//                       >

//                         {skills
//                           .slice(
//                             0,
//                             3
//                           )
//                           .map(
//                             (
//                               skill,
//                               index
//                             ) => (

//                               <span
//                                 key={`${skill}-${index}`}
//                                 className="
//                                   px-2.5
//                                   py-1
//                                   text-xs
//                                 "
//                                 style={{
//                                   backgroundColor:
//                                     hexToRgba(
//                                       branding.buttonColor,
//                                       0.1
//                                     ),

//                                   color:
//                                     branding.buttonColor,

//                                   borderRadius:
//                                     getButtonRadius(
//                                       branding
//                                     ),

//                                   fontFamily:
//                                     fontFamily(
//                                       branding.fontBody
//                                     ),

//                                   fontWeight:
//                                     branding.bodyWeight,
//                                 }}
//                               >
//                                 {String(
//                                   skill
//                                 ).trim()}
//                               </span>

//                             )
//                           )}


//                         {!skills.length && (

//                           <span
//                             className="text-sm"
//                             style={{
//                               ...bodyStyle,
//                               opacity: 0.6,
//                             }}
//                           >
//                             Professional
//                             Trainer
//                           </span>

//                         )}

//                       </div>


//                       {/* Bio */}

//                       <p
//                         className="
//                           mt-4
//                           line-clamp-3
//                           text-sm
//                         "
//                         style={{
//                           ...bodyStyle,
//                           opacity: 0.68,
//                         }}
//                       >
//                         {trainer?.bio ||
//                           "No bio available for this trainer."}
//                       </p>


//                       {/* ====================================
//                           RATING
//                       ==================================== */}

//                       <div
//                         className="
//                           mt-5
//                         "
//                       >

//                         <div
//                           className="
//                             flex
//                             items-center
//                             justify-between
//                           "
//                         >

//                           <div
//                             className="
//                               flex
//                               items-center
//                               gap-1
//                             "
//                           >

//                             {[
//                               1,
//                               2,
//                               3,
//                               4,
//                               5,
//                             ].map(
//                               (
//                                 star
//                               ) => (

//                                 <FaStar
//                                   key={
//                                     star
//                                   }
//                                   style={{
//                                     color:
//                                       star <=
//                                       Math.round(
//                                         rating
//                                       )
//                                         ? branding.iconColor
//                                         : hexToRgba(
//                                             branding.textColor,
//                                             0.15
//                                           ),
//                                   }}
//                                 />

//                               )
//                             )}

//                           </div>


//                           <span
//                             className="font-bold"
//                             style={{
//                               color:
//                                 branding.headingColor,

//                               fontFamily:
//                                 fontFamily(
//                                   branding.fontBody
//                                 ),

//                               fontWeight:
//                                 branding.headingWeight,
//                             }}
//                           >
//                             {rating.toFixed(
//                               1
//                             )}
//                           </span>

//                         </div>


//                         {/* Rating progress */}

//                         <div
//                           className="
//                             mt-2
//                             h-1.5
//                             overflow-hidden
//                           "
//                           style={{
//                             backgroundColor:
//                               hexToRgba(
//                                 branding.textColor,
//                                 0.08
//                               ),

//                             borderRadius:
//                               getButtonRadius(
//                                 branding
//                               ),
//                           }}
//                         >

//                           <div
//                             className="
//                               h-full
//                             "
//                             style={{
//                               width: `${Math.min(
//                                 Math.max(
//                                   (rating /
//                                     5) *
//                                     100,
//                                   0
//                                 ),
//                                 100
//                               )}%`,

//                               backgroundColor:
//                                 branding.buttonColor,

//                               borderRadius:
//                                 getButtonRadius(
//                                   branding
//                                 ),
//                             }}
//                           />

//                         </div>

//                       </div>


//                       {/* ====================================
//                           STATS
//                       ==================================== */}

//                       <div
//                         className="
//                           mt-5
//                           grid
//                           grid-cols-2
//                           gap-3
//                         "
//                       >

//                         {/* Students */}

//                         <div
//                           className="
//                             p-3
//                           "
//                           style={{
//                             backgroundColor:
//                               hexToRgba(
//                                 branding.textColor,
//                                 0.035
//                               ),

//                             border:
//                               `1px solid ${hexToRgba(
//                                 branding.textColor,
//                                 0.08
//                               )}`,

//                             borderRadius:
//                               "12px",
//                           }}
//                         >

//                           <div
//                             className="
//                               flex
//                               items-center
//                               gap-2
//                             "
//                           >

//                             <FaUsers
//                               className="text-sm"
//                               style={{
//                                 color:
//                                   branding.iconColor,
//                               }}
//                             />

//                             <span
//                               className="
//                                 text-sm
//                                 font-bold
//                               "
//                               style={{
//                                 color:
//                                   branding.headingColor,

//                                 fontFamily:
//                                   fontFamily(
//                                     branding.fontBody
//                                   ),
//                               }}
//                             >
//                               {students.toLocaleString()}
//                             </span>

//                           </div>


//                           <p
//                             className="
//                               mt-1
//                               text-xs
//                             "
//                             style={{
//                               ...bodyStyle,
//                               opacity: 0.6,
//                             }}
//                           >
//                             Students
//                           </p>

//                         </div>


//                         {/* Reviews */}

//                         <div
//                           className="
//                             p-3
//                           "
//                           style={{
//                             backgroundColor:
//                               hexToRgba(
//                                 branding.textColor,
//                                 0.035
//                               ),

//                             border:
//                               `1px solid ${hexToRgba(
//                                 branding.textColor,
//                                 0.08
//                               )}`,

//                             borderRadius:
//                               "12px",
//                           }}
//                         >

//                           <div
//                             className="
//                               flex
//                               items-center
//                               gap-2
//                             "
//                           >

//                             <FaComment
//                               className="text-sm"
//                               style={{
//                                 color:
//                                   branding.iconColor,
//                               }}
//                             />

//                             <span
//                               className="
//                                 text-sm
//                                 font-bold
//                               "
//                               style={{
//                                 color:
//                                   branding.headingColor,

//                                 fontFamily:
//                                   fontFamily(
//                                     branding.fontBody
//                                   ),
//                               }}
//                             >
//                               {reviews.toLocaleString()}
//                             </span>

//                           </div>


//                           <p
//                             className="
//                               mt-1
//                               text-xs
//                             "
//                             style={{
//                               ...bodyStyle,
//                               opacity: 0.6,
//                             }}
//                           >
//                             Reviews
//                           </p>

//                         </div>

//                       </div>


//                       {/* ====================================
//                           CTA
//                       ==================================== */}

//                       <div
//                         className="
//                           mt-auto
//                           pt-5
//                         "
//                       >

//                         <Button
//                           branding={
//                             branding
//                           }
//                           variant="outline"
//                           fullWidth
//                           size="sm"
//                           onClick={() => {

//                             if (
//                               !trainerId
//                             ) {

//                               console.error(
//                                 "Trainer profile navigation failed: trainer ID is missing.",
//                                 trainer
//                               );

//                               return;
//                             }

//                             navigate(
//                               `/institute/website/preview/trainers/${trainerId}`
//                             );

//                           }}
//                         >

//                           View Profile

//                           <FaArrowRight
//                             className="
//                               ml-2
//                               text-xs
//                             "
//                           />

//                         </Button>

//                       </div>

//                     </div>

//                   </Card>
//                 );
//               }
//             )}

//           </div>

//         )}

//       </section>

//     </div>
//   );
// };


// // export default WebsiteTrainers;


// import { useState, useMemo, useEffect } from "react";
// import {
//   FaSearch,
//   FaStar,
//   FaUsers,
//   FaComment,
//   FaArrowRight,
//   FaChevronDown,
// } from "react-icons/fa";
// import {
//   Link,
//   useNavigate,
//   useOutletContext,
// } from "react-router-dom";

// /* =========================================================
//    DEFAULT BRANDING
//    Branding module is the source of truth.
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
//   branding,
//   large = false
// ) => {
//   if (branding.roundedButtons) {
//     return "9999px";
//   }

//   return large ? "12px" : "8px";
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
//    LOCAL CARD
// ========================================================= */

// const Card = ({
//   children,
//   className = "",
//   style = {},
//   ...props
// }) => (
//   <div
//     className={className}
//     style={style}
//     {...props}
//   >
//     {children}
//   </div>
// );


// /* =========================================================
//    LOCAL BUTTON
// ========================================================= */

// const Button = ({
//   children,
//   variant = "solid",
//   fullWidth = false,
//   size = "md",
//   className = "",
//   type = "button",
//   branding,
//   style = {},
//   ...props
// }) => {

//   const sizes = {
//     sm: "px-4 py-2 text-sm",
//     md: "px-5 py-2.5 text-sm",
//     lg: "px-6 py-3 text-base",
//   };

//   const sizeClass =
//     sizes[size] || sizes.md;

//   const baseStyle = {
//     display: "inline-flex",
//     alignItems: "center",
//     justifyContent: "center",

//     width: fullWidth
//       ? "100%"
//       : undefined,

//     borderRadius:
//       getButtonRadius(
//         branding,
//         size === "lg"
//       ),

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

//     transition:
//       "all 0.3s ease",

//     cursor: "pointer",

//     ...(variant === "outline"
//       ? {
//           backgroundColor:
//             branding.cardBackgroundColor,

//           color:
//             branding.buttonColor,

//           border:
//             `1px solid ${branding.buttonColor}`,
//         }
//       : {
//           backgroundColor:
//             branding.buttonColor,

//           color:
//             branding.buttonTextColor,

//           border:
//             `1px solid ${branding.buttonColor}`,
//         }),

//     ...style,
//   };

//   return (
//     <button
//       type={type}
//       className={[
//         "font-semibold",
//         sizeClass,
//         className,
//       ].join(" ")}
//       style={baseStyle}
//       {...props}
//     >
//       {children}
//     </button>
//   );
// };


// /* =========================================================
//    HELPERS
// ========================================================= */

// const toArray = (value) => {

//   if (
//     Array.isArray(value)
//   ) {
//     return value;
//   }

//   if (
//     typeof value === "string"
//   ) {

//     try {

//       const parsed =
//         JSON.parse(value);

//       if (
//         Array.isArray(parsed)
//       ) {
//         return parsed;
//       }

//     } catch {
//       // Continue below.
//     }

//     return value
//       .split(",")
//       .map(
//         (item) =>
//           item.trim()
//       )
//       .filter(Boolean);
//   }

//   return [];
// };


// const firstValue = (
//   ...values
// ) =>
//   values.find(
//     (value) =>
//       value !== undefined &&
//       value !== null &&
//       String(value).trim() !== ""
//   );


// const getBannerImage = (
//   banner
// ) =>
//   firstValue(
//     banner?.image_url,
//     banner?.imageUrl,
//     banner?.banner_url,
//     banner?.bannerUrl,
//     banner?.desktop_image_url,
//     banner?.desktopImageUrl,
//     banner?.image,
//     banner?.url
//   );


// const getBannerTitle = (
//   banner
// ) =>
//   firstValue(
//     banner?.title,
//     banner?.banner_title,
//     banner?.heading,
//     banner?.name,
//     "Our Trainers"
//   );


// const getBannerDescription = (
//   banner
// ) =>
//   firstValue(
//     banner?.description,
//     banner?.subtitle,
//     banner?.sub_title,
//     banner?.banner_description,
//     "Meet our experienced trainers and learn from the best."
//   );


// const isTrainerBanner = (
//   banner
// ) => {

//   if (!banner) {
//     return false;
//   }

//   const page =
//     String(
//       firstValue(
//         banner.page,
//         banner.page_name,
//         banner.pageName,
//         banner.page_type,
//         banner.pageType,
//         banner.section,
//         banner.banner_type,
//         banner.bannerType
//       ) || ""
//     ).toLowerCase();

//   return (
//     page.includes("trainer") ||
//     page.includes("trainers") ||
//     page.includes("teacher") ||
//     page.includes("faculty")
//   );
// };


// /* =========================================================
//    WEBSITE TRAINERS
// ========================================================= */

// const WebsiteTrainers = () => {

//   const outletContext =
//     useOutletContext() || {};

//   const navigate =
//     useNavigate();


//   /* =======================================================
//      GET WEBSITE DATA
//   ======================================================= */

//   const outletTrainers =
//     outletContext.trainers;

//   const outletBanners =
//     outletContext.banners;


//   /*
//     Branding can be provided through:
//       branding
//       websiteBranding
//       brand

//     This makes the page compatible with
//     your existing website preview context.
//   */

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


//   /* =======================================================
//      STATE
//   ======================================================= */

//   const [
//     trainers,
//     setTrainers,
//   ] = useState([]);

//   const [
//     banners,
//     setBanners,
//   ] = useState([]);

//   const [
//     loading,
//     setLoading,
//   ] = useState(true);

//   const [
//     searchQuery,
//     setSearchQuery,
//   ] = useState("");

//   const [
//     filterSpecialty,
//     setFilterSpecialty,
//   ] = useState("all");


//   /* =======================================================
//      SYNC DASHBOARD DATA
//   ======================================================= */

//   useEffect(() => {

//     setTrainers(
//       Array.isArray(
//         outletTrainers
//       )
//         ? outletTrainers
//         : []
//     );

//     setBanners(
//       Array.isArray(
//         outletBanners
//       )
//         ? outletBanners
//         : []
//     );

//     setLoading(false);

//   }, [
//     outletTrainers,
//     outletBanners,
//   ]);


//   /* =======================================================
//      DEBUG BRANDING
//   ======================================================= */

//   useEffect(() => {

//     console.log(
//       "================================"
//     );

//     console.log(
//       "WEBSITE TRAINERS BRANDING"
//     );

//     console.log(
//       branding
//     );

//     console.log(
//       "================================"
//     );

//   }, [branding]);


//   /* =======================================================
//      SELECT TRAINER BANNER
//   ======================================================= */

//   const trainerBanner =
//     useMemo(() => {

//       if (
//         !banners.length
//       ) {
//         return null;
//       }

//       const matchingBanner =
//         banners.find(
//           isTrainerBanner
//         );

//       return (
//         matchingBanner ||
//         banners[0]
//       );

//     }, [banners]);


//   /* =======================================================
//      TRAINER SKILLS
//   ======================================================= */

//   const getSkills = (
//     trainer
//   ) =>
//     toArray(
//       trainer?.skills
//     );


//   /* =======================================================
//      SPECIALTIES
//   ======================================================= */

//   const specialties =
//     useMemo(() => {

//       const values =
//         trainers.flatMap(
//           (trainer) =>
//             getSkills(
//               trainer
//             )
//         );

//       return [
//         "all",
//         ...Array.from(
//           new Set(
//             values
//               .map(
//                 (skill) =>
//                   String(
//                     skill
//                   ).trim()
//               )
//               .filter(Boolean)
//           )
//         ),
//       ];

//     }, [trainers]);


//   /* =======================================================
//      FILTER TRAINERS
//   ======================================================= */

//   const filteredTrainers =
//     useMemo(() => {

//       const query =
//         searchQuery
//           .trim()
//           .toLowerCase();

//       return trainers.filter(
//         (trainer) => {

//           const fullName =
//             String(
//               trainer?.full_name ||
//                 ""
//             ).toLowerCase();

//           const bio =
//             String(
//               trainer?.bio || ""
//             ).toLowerCase();

//           const skills =
//             getSkills(
//               trainer
//             ).map(
//               (skill) =>
//                 String(
//                   skill
//                 )
//                   .trim()
//                   .toLowerCase()
//             );


//           const matchesSearch =
//             !query ||
//             fullName.includes(
//               query
//             ) ||
//             bio.includes(
//               query
//             ) ||
//             skills.some(
//               (skill) =>
//                 skill.includes(
//                   query
//                 )
//             );


//           const matchesSpecialty =
//             filterSpecialty ===
//               "all" ||
//             skills.includes(
//               String(
//                 filterSpecialty
//               ).toLowerCase()
//             );


//           return (
//             matchesSearch &&
//             matchesSpecialty
//           );
//         }
//       );

//     }, [
//       trainers,
//       searchQuery,
//       filterSpecialty,
//     ]);


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
//               mb-5
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
//             className="text-lg"
//             style={{
//               ...bodyStyle,
//               opacity: 0.7,
//             }}
//           >
//             Loading trainers...
//           </p>

//         </div>

//       </div>
//     );
//   }


//   /* =======================================================
//      MAIN
//   ======================================================= */

//   return (
//     <div
//       className="
//         min-h-screen
//         pb-20
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

//       {/* =====================================================
//           HERO / DASHBOARD BANNER
//           Text removed — banner image only
//       ===================================================== */}

//       {trainerBanner &&
//       getBannerImage(
//         trainerBanner
//       ) ? (

//         <section
//           className="
//             relative
//             h-[360px]
//             overflow-hidden
//             md:h-[430px]
//           "
//         >

//           <img
//             src={getBannerImage(
//               trainerBanner
//             )}
//             alt="Trainer Banner"
//             className="
//               absolute
//               inset-0
//               h-full
//               w-full
//               object-cover
//             "
//             onError={(event) => {
//               event.currentTarget.style.display =
//                 "none";
//             }}
//           />

//         </section>

//       ) : null}

//       {/* =====================================================
//           SEARCH + FILTER
//       ===================================================== */}

//       <section
//         id="trainers"
//         className="
//           mx-auto
//           max-w-7xl
//           px-4
//           pt-12
//           sm:px-6
//           lg:px-8
//         "
//       >

//         <div
//           className="
//             mb-8
//             text-center
//           "
//         >

//           <p
//             className="
//               mb-2
//               text-sm
//               uppercase
//               tracking-[0.18em]
//             "
//             style={subheadingStyle}
//           >
//             OUR TEAM
//           </p>


//           <h2
//             className="
//               text-3xl
//               md:text-4xl
//             "
//             style={headingStyle}
//           >
//             Meet Our Expert Trainers
//           </h2>


//           <p
//             className="
//               mx-auto
//               mt-3
//               max-w-2xl
//             "
//             style={{
//               ...bodyStyle,
//               opacity: 0.65,
//             }}
//           >
//             Find the right trainer
//             based on expertise,
//             experience and specialty.
//           </p>

//         </div>


//         {/* Search + Specialty */}

//         <div
//           className="
//             mb-10
//             flex
//             flex-col
//             gap-4
//             lg:flex-row
//           "
//         >

//           {/* Search */}

//           <div
//             className="
//               relative
//               flex-1
//             "
//           >

//             <FaSearch
//               className="
//                 absolute
//                 left-4
//                 top-1/2
//                 -translate-y-1/2
//               "
//               style={{
//                 color:
//                   hexToRgba(
//                     branding.textColor,
//                     0.45
//                   ),
//               }}
//             />


//             <input
//               type="text"
//               value={
//                 searchQuery
//               }
//               onChange={(
//                 event
//               ) =>
//                 setSearchQuery(
//                   event.target.value
//                 )
//               }
//               placeholder="Search trainers..."
//               className="
//                 h-14
//                 w-full
//                 border
//                 px-12
//                 pr-4
//                 outline-none
//                 transition
//               "
//               style={{
//                 backgroundColor:
//                   branding.cardBackgroundColor,

//                 color:
//                   branding.textColor,

//                 borderColor:
//                   hexToRgba(
//                     branding.textColor,
//                     0.15
//                   ),

//                 borderRadius:
//                   "12px",

//                 fontFamily:
//                   fontFamily(
//                     branding.fontBody
//                   ),

//                 fontWeight:
//                   branding.bodyWeight,

//                 lineHeight:
//                   branding.bodyLineHeight,
//               }}
//             />

//           </div>


//           {/* Specialty */}

//           <div
//             className="
//               relative
//               lg:w-[260px]
//             "
//           >

//             <select
//               value={
//                 filterSpecialty
//               }
//               onChange={(
//                 event
//               ) =>
//                 setFilterSpecialty(
//                   event.target.value
//                 )
//               }
//               className="
//                 h-14
//                 w-full
//                 appearance-none
//                 border
//                 px-4
//                 pr-10
//                 outline-none
//                 transition
//                 cursor-pointer
//               "
//               style={{
//                 backgroundColor:
//                   branding.cardBackgroundColor,

//                 color:
//                   branding.textColor,

//                 borderColor:
//                   hexToRgba(
//                     branding.textColor,
//                     0.15
//                   ),

//                 borderRadius:
//                   "12px",

//                 fontFamily:
//                   fontFamily(
//                     branding.fontBody
//                   ),

//                 fontWeight:
//                   branding.bodyWeight,
//               }}
//             >

//               {specialties.map(
//                 (
//                   specialty
//                 ) => (

//                   <option
//                     key={
//                       specialty
//                     }
//                     value={
//                       specialty
//                     }
//                   >
//                     {specialty ===
//                     "all"
//                       ? "All Specialties"
//                       : specialty}
//                   </option>

//                 )
//               )}

//             </select>


//             <FaChevronDown
//               className="
//                 pointer-events-none
//                 absolute
//                 right-4
//                 top-1/2
//                 -translate-y-1/2
//               "
//               style={{
//                 color:
//                   hexToRgba(
//                     branding.textColor,
//                     0.45
//                   ),
//               }}
//             />

//           </div>

//         </div>


//         {/* ===================================================
//             TRAINER GRID
//         =================================================== */}

//         {filteredTrainers.length ===
//         0 ? (

//           <div
//             className="
//               rounded-2xl
//               border
//               py-20
//               text-center
//             "
//             style={{
//               backgroundColor:
//                 branding.cardBackgroundColor,

//               borderColor:
//                 hexToRgba(
//                   branding.textColor,
//                   0.12
//                 ),
//             }}
//           >

//             <h3
//               className="text-xl"
//               style={headingStyle}
//             >
//               No trainers found
//             </h3>


//             <p
//               className="mt-2"
//               style={{
//                 ...bodyStyle,
//                 opacity: 0.65,
//               }}
//             >
//               Try another search
//               term or specialty.
//             </p>


//             <Button
//               branding={
//                 branding
//               }
//               size="md"
//               className="mt-5"
//               onClick={() => {
//                 setSearchQuery("");
//                 setFilterSpecialty(
//                   "all"
//                 );
//               }}
//             >
//               Clear Filters
//             </Button>

//           </div>

//         ) : (

//           <div
//             className="
//               grid
//               grid-cols-1
//               gap-6
//               sm:grid-cols-2
//               lg:grid-cols-3
//               xl:grid-cols-4
//             "
//           >

//             {filteredTrainers.map(
//               (trainer) => {

//                 const skills =
//                   getSkills(
//                     trainer
//                   );

//                 const rating =
//                   Number(
//                     trainer?.rating ||
//                       0
//                   );

//                 const experience =
//                   Number(
//                     trainer?.experience_years ||
//                       0
//                   );

//                 const students =
//                   Number(
//                     trainer?.total_students ||
//                       0
//                   );

//                 const reviews =
//                   Number(
//                     trainer?.total_reviews ||
//                       0
//                   );


//                 const trainerId =
//                   trainer?.id ||
//                   trainer?._id;


//                 return (
//                   <Card
//                     key={
//                       trainerId
//                     }
//                     className="
//                       group
//                       flex
//                       h-full
//                       flex-col
//                       overflow-hidden
//                       transition-all
//                       duration-300
//                       hover:-translate-y-1
//                     "
//                     style={{
//                       backgroundColor:
//                         branding.cardBackgroundColor,

//                       border:
//                         `1px solid ${hexToRgba(
//                           branding.textColor,
//                           0.12
//                         )}`,

//                       borderRadius:
//                         "18px",

//                       boxShadow:
//                         "0 2px 10px rgba(0,0,0,0.04)",
//                     }}
//                   >

//                     {/* ======================================
//                         TRAINER IMAGE
//                     ====================================== */}

//                     <div
//                       className="
//                         relative
//                         h-64
//                         overflow-hidden
//                       "
//                       style={{
//                         backgroundColor:
//                           hexToRgba(
//                             branding.textColor,
//                             0.05
//                           ),
//                       }}
//                     >

//                       <img
//                         src={
//                           trainer?.profile_image ||
//                           "https://placehold.co/600x600/png?text=Trainer"
//                         }
//                         alt={
//                           trainer?.full_name ||
//                           "Trainer"
//                         }
//                         className="
//                           h-full
//                           w-full
//                           object-cover
//                           transition-transform
//                           duration-500
//                           group-hover:scale-105
//                         "
//                         loading="lazy"
//                         onError={(
//                           event
//                         ) => {

//                           event.currentTarget.onerror =
//                             null;

//                           event.currentTarget.src =
//                             "https://placehold.co/600x600/png?text=Trainer";

//                         }}
//                       />


//                       {/* Experience */}

//                       {experience >
//                         0 && (

//                         <span
//                           className="
//                             absolute
//                             right-4
//                             top-4
//                             px-3
//                             py-1.5
//                             text-xs
//                           "
//                           style={{
//                             backgroundColor:
//                               branding.cardBackgroundColor,

//                             color:
//                               branding.headingColor,

//                             borderRadius:
//                               getButtonRadius(
//                                 branding
//                               ),

//                             fontFamily:
//                               fontFamily(
//                                 branding.fontBody
//                               ),

//                             fontWeight:
//                               branding.headingWeight,

//                             boxShadow:
//                               "0 2px 8px rgba(0,0,0,0.08)",
//                           }}
//                         >
//                           {experience}{" "}
//                           yrs experience
//                         </span>

//                       )}

//                     </div>


//                     {/* ======================================
//                         CONTENT
//                     ====================================== */}

//                     <div
//                       className="
//                         flex
//                         flex-1
//                         flex-col
//                         p-5
//                       "
//                     >

//                       {/* Name */}

//                       <h3
//                         className="
//                           truncate
//                           text-xl
//                         "
//                         style={
//                           headingStyle
//                         }
//                       >
//                         {trainer?.full_name ||
//                           "Trainer"}
//                       </h3>


//                       {/* Skills */}

//                       <div
//                         className="
//                           mt-3
//                           flex
//                           min-h-[28px]
//                           flex-wrap
//                           gap-2
//                         "
//                       >

//                         {skills
//                           .slice(
//                             0,
//                             3
//                           )
//                           .map(
//                             (
//                               skill,
//                               index
//                             ) => (

//                               <span
//                                 key={`${skill}-${index}`}
//                                 className="
//                                   px-2.5
//                                   py-1
//                                   text-xs
//                                 "
//                                 style={{
//                                   backgroundColor:
//                                     hexToRgba(
//                                       branding.buttonColor,
//                                       0.1
//                                     ),

//                                   color:
//                                     branding.buttonColor,

//                                   borderRadius:
//                                     getButtonRadius(
//                                       branding
//                                     ),

//                                   fontFamily:
//                                     fontFamily(
//                                       branding.fontBody
//                                     ),

//                                   fontWeight:
//                                     branding.bodyWeight,
//                                 }}
//                               >
//                                 {String(
//                                   skill
//                                 ).trim()}
//                               </span>

//                             )
//                           )}


//                         {!skills.length && (

//                           <span
//                             className="text-sm"
//                             style={{
//                               ...bodyStyle,
//                               opacity: 0.6,
//                             }}
//                           >
//                             Professional
//                             Trainer
//                           </span>

//                         )}

//                       </div>


//                       {/* Bio */}

//                       <p
//                         className="
//                           mt-4
//                           line-clamp-3
//                           text-sm
//                         "
//                         style={{
//                           ...bodyStyle,
//                           opacity: 0.68,
//                         }}
//                       >
//                         {trainer?.bio ||
//                           "No bio available for this trainer."}
//                       </p>


//                       {/* ====================================
//                           RATING
//                       ==================================== */}

//                       <div
//                         className="
//                           mt-5
//                         "
//                       >

//                         <div
//                           className="
//                             flex
//                             items-center
//                             justify-between
//                           "
//                         >

//                           <div
//                             className="
//                               flex
//                               items-center
//                               gap-1
//                             "
//                           >

//                             {[
//                               1,
//                               2,
//                               3,
//                               4,
//                               5,
//                             ].map(
//                               (
//                                 star
//                               ) => (

//                                 <FaStar
//                                   key={
//                                     star
//                                   }
//                                   style={{
//                                     color:
//                                       star <=
//                                       Math.round(
//                                         rating
//                                       )
//                                         ? branding.iconColor
//                                         : hexToRgba(
//                                             branding.textColor,
//                                             0.15
//                                           ),
//                                   }}
//                                 />

//                               )
//                             )}

//                           </div>


//                           <span
//                             className="font-bold"
//                             style={{
//                               color:
//                                 branding.headingColor,

//                               fontFamily:
//                                 fontFamily(
//                                   branding.fontBody
//                                 ),

//                               fontWeight:
//                                 branding.headingWeight,
//                             }}
//                           >
//                             {rating.toFixed(
//                               1
//                             )}
//                           </span>

//                         </div>


//                         {/* Rating progress */}

//                         <div
//                           className="
//                             mt-2
//                             h-1.5
//                             overflow-hidden
//                           "
//                           style={{
//                             backgroundColor:
//                               hexToRgba(
//                                 branding.textColor,
//                                 0.08
//                               ),

//                             borderRadius:
//                               getButtonRadius(
//                                 branding
//                               ),
//                           }}
//                         >

//                           <div
//                             className="
//                               h-full
//                             "
//                             style={{
//                               width: `${Math.min(
//                                 Math.max(
//                                   (rating /
//                                     5) *
//                                     100,
//                                   0
//                                 ),
//                                 100
//                               )}%`,

//                               backgroundColor:
//                                 branding.buttonColor,

//                               borderRadius:
//                                 getButtonRadius(
//                                   branding
//                                 ),
//                             }}
//                           />

//                         </div>

//                       </div>


//                       {/* ====================================
//                           STATS
//                       ==================================== */}

//                       <div
//                         className="
//                           mt-5
//                           grid
//                           grid-cols-2
//                           gap-3
//                         "
//                       >

//                         {/* Students */}

//                         <div
//                           className="
//                             p-3
//                           "
//                           style={{
//                             backgroundColor:
//                               hexToRgba(
//                                 branding.textColor,
//                                 0.035
//                               ),

//                             border:
//                               `1px solid ${hexToRgba(
//                                 branding.textColor,
//                                 0.08
//                               )}`,

//                             borderRadius:
//                               "12px",
//                           }}
//                         >

//                           <div
//                             className="
//                               flex
//                               items-center
//                               gap-2
//                             "
//                           >

//                             <FaUsers
//                               className="text-sm"
//                               style={{
//                                 color:
//                                   branding.iconColor,
//                               }}
//                             />

//                             <span
//                               className="
//                                 text-sm
//                                 font-bold
//                               "
//                               style={{
//                                 color:
//                                   branding.headingColor,

//                                 fontFamily:
//                                   fontFamily(
//                                     branding.fontBody
//                                   ),
//                               }}
//                             >
//                               {students.toLocaleString()}
//                             </span>

//                           </div>


//                           <p
//                             className="
//                               mt-1
//                               text-xs
//                             "
//                             style={{
//                               ...bodyStyle,
//                               opacity: 0.6,
//                             }}
//                           >
//                             Students
//                           </p>

//                         </div>


//                         {/* Reviews */}

//                         <div
//                           className="
//                             p-3
//                           "
//                           style={{
//                             backgroundColor:
//                               hexToRgba(
//                                 branding.textColor,
//                                 0.035
//                               ),

//                             border:
//                               `1px solid ${hexToRgba(
//                                 branding.textColor,
//                                 0.08
//                               )}`,

//                             borderRadius:
//                               "12px",
//                           }}
//                         >

//                           <div
//                             className="
//                               flex
//                               items-center
//                               gap-2
//                             "
//                           >

//                             <FaComment
//                               className="text-sm"
//                               style={{
//                                 color:
//                                   branding.iconColor,
//                               }}
//                             />

//                             <span
//                               className="
//                                 text-sm
//                                 font-bold
//                               "
//                               style={{
//                                 color:
//                                   branding.headingColor,

//                                 fontFamily:
//                                   fontFamily(
//                                     branding.fontBody
//                                   ),
//                               }}
//                             >
//                               {reviews.toLocaleString()}
//                             </span>

//                           </div>


//                           <p
//                             className="
//                               mt-1
//                               text-xs
//                             "
//                             style={{
//                               ...bodyStyle,
//                               opacity: 0.6,
//                             }}
//                           >
//                             Reviews
//                           </p>

//                         </div>

//                       </div>


//                       {/* ====================================
//                           CTA
//                       ==================================== */}

//                       <div
//                         className="
//                           mt-auto
//                           pt-5
//                         "
//                       >

//                         <Button
//                           branding={
//                             branding
//                           }
//                           variant="outline"
//                           fullWidth
//                           size="sm"
//                           onClick={() => {

//                             if (
//                               !trainerId
//                             ) {

//                               console.error(
//                                 "Trainer profile navigation failed: trainer ID is missing.",
//                                 trainer
//                               );

//                               return;
//                             }

//                             navigate(
//                               `/institute/website/preview/trainers/${trainerId}`
//                             );

//                           }}
//                         >

//                           View Profile

//                           <FaArrowRight
//                             className="
//                               ml-2
//                               text-xs
//                             "
//                           />

//                         </Button>

//                       </div>

//                     </div>

//                   </Card>
//                 );
//               }
//             )}

//           </div>

//         )}

//       </section>

//     </div>
//   );
// };


// export default WebsiteTrainers;


// // src/institute/Website/WebsiteTrainers.jsx

// import {
//   useState,
//   useMemo,
//   useEffect,
// } from "react";

// import {
//   FaSearch,
//   FaStar,
//   FaUsers,
//   FaComment,
//   FaArrowRight,
//   FaChevronDown,
// } from "react-icons/fa";

// import {
//   useNavigate,
//   useOutletContext,
// } from "react-router-dom";


// /* =========================================================
//    DEFAULT CONTENT
// ========================================================= */

// const DEFAULT_CONTENT = {
//   trainers: {
//     eyebrow: "OUR TEAM",
//     heading: "Meet Our Expert Trainers",
//     subheading:
//       "Find the right trainer based on expertise, experience and specialty.",
//   },
// };


// /* =========================================================
//    DEFAULT SECTIONS
// ========================================================= */

// const DEFAULT_SECTIONS = {
//   trainers: {
//     visible: true,
//   },
// };


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
//    HELPERS
// ========================================================= */

// const firstValue = (...values) =>
//   values.find(
//     (value) =>
//       value !== undefined &&
//       value !== null &&
//       String(value).trim() !== ""
//   );


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


// /* =========================================================
//    NORMALIZE BRANDING
// ========================================================= */

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

//   footerBackgroundColor: getBrandingValue(
//     branding,
//     "footerBackgroundColor",
//     "footer_background_color",
//     DEFAULT_BRANDING.footerBackgroundColor
//   ),

//   footerHeadingColor: getBrandingValue(
//     branding,
//     "footerHeadingColor",
//     "footer_heading_color",
//     DEFAULT_BRANDING.footerHeadingColor
//   ),

//   footerTextColor: getBrandingValue(
//     branding,
//     "footerTextColor",
//     "footer_text_color",
//     DEFAULT_BRANDING.footerTextColor
//   ),

//   fontHeading: getBrandingValue(
//     branding,
//     "fontHeading",
//     "font_heading",
//     DEFAULT_BRANDING.fontHeading
//   ),

//   fontSubheading: getBrandingValue(
//     branding,
//     "fontSubheading",
//     "font_subheading",
//     DEFAULT_BRANDING.fontSubheading
//   ),

//   fontBody: getBrandingValue(
//     branding,
//     "fontBody",
//     "font_body",
//     DEFAULT_BRANDING.fontBody
//   ),

//   headingWeight: getBrandingValue(
//     branding,
//     "headingWeight",
//     "heading_weight",
//     DEFAULT_BRANDING.headingWeight
//   ),

//   headingLineHeight: getBrandingValue(
//     branding,
//     "headingLineHeight",
//     "heading_line_height",
//     DEFAULT_BRANDING.headingLineHeight
//   ),

//   headingLetterSpacing: getBrandingValue(
//     branding,
//     "headingLetterSpacing",
//     "heading_letter_spacing",
//     DEFAULT_BRANDING.headingLetterSpacing
//   ),

//   subheadingWeight: getBrandingValue(
//     branding,
//     "subheadingWeight",
//     "subheading_weight",
//     DEFAULT_BRANDING.subheadingWeight
//   ),

//   subheadingLineHeight: getBrandingValue(
//     branding,
//     "subheadingLineHeight",
//     "subheading_line_height",
//     DEFAULT_BRANDING.subheadingLineHeight
//   ),

//   bodyWeight: getBrandingValue(
//     branding,
//     "bodyWeight",
//     "body_weight",
//     DEFAULT_BRANDING.bodyWeight
//   ),

//   bodyLineHeight: getBrandingValue(
//     branding,
//     "bodyLineHeight",
//     "body_line_height",
//     DEFAULT_BRANDING.bodyLineHeight
//   ),

//   bodyLetterSpacing: getBrandingValue(
//     branding,
//     "bodyLetterSpacing",
//     "body_letter_spacing",
//     DEFAULT_BRANDING.bodyLetterSpacing
//   ),

//   roundedButtons: getBrandingValue(
//     branding,
//     "roundedButtons",
//     "rounded_buttons",
//     DEFAULT_BRANDING.roundedButtons
//   ),
// });


// /* =========================================================
//    NORMALIZE CONTENT
// ========================================================= */

// const normalizeContent = (
//   content = {}
// ) => {
//   const source =
//     content?.trainers ||
//     content?.trainer ||
//     content?.Trainers ||
//     {};

//   return {
//     trainers: {
//       eyebrow: firstValue(
//         source?.eyebrow,
//         source?.eyebrow_text,
//         source?.label,
//         DEFAULT_CONTENT.trainers.eyebrow
//       ),

//       heading: firstValue(
//         source?.heading,
//         source?.title,
//         source?.page_heading,
//         DEFAULT_CONTENT.trainers.heading
//       ),

//       subheading: firstValue(
//         source?.subheading,
//         source?.subtitle,
//         source?.page_subheading,
//         DEFAULT_CONTENT.trainers.subheading
//       ),
//     },
//   };
// };


// /* =========================================================
//    NORMALIZE SECTIONS
// ========================================================= */

// const normalizeSections = (
//   sections = {}
// ) => {
//   const source =
//     sections?.trainers ||
//     sections?.trainer ||
//     sections?.Trainers ||
//     {};

//   const visible =
//     source?.visible ??
//     source?.is_visible ??
//     source?.isVisible ??
//     sections?.trainers_visible ??
//     sections?.trainer_visible;

//   if (
//     visible === false ||
//     visible === 0 ||
//     visible === "0" ||
//     visible === "false"
//   ) {
//     return {
//       trainers: {
//         visible: false,
//       },
//     };
//   }

//   if (
//     visible === true ||
//     visible === 1 ||
//     visible === "1" ||
//     visible === "true"
//   ) {
//     return {
//       trainers: {
//         visible: true,
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


// /* =========================================================
//    HEX TO RGBA
// ========================================================= */

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
//    ARRAY HELPER
// ========================================================= */

// const toArray = (
//   value
// ) => {
//   if (
//     Array.isArray(value)
//   ) {
//     return value;
//   }

//   if (
//     typeof value === "string"
//   ) {
//     try {
//       const parsed =
//         JSON.parse(value);

//       if (
//         Array.isArray(parsed)
//       ) {
//         return parsed;
//       }
//     } catch {
//       // fallback
//     }

//     return value
//       .split(",")
//       .map(
//         (item) =>
//           item.trim()
//       )
//       .filter(Boolean);
//   }

//   return [];
// };


// /* =========================================================
//    CARD
// ========================================================= */

// const Card = ({
//   children,
//   className = "",
//   style = {},
//   ...props
// }) => (
//   <div
//     className={className}
//     style={style}
//     {...props}
//   >
//     {children}
//   </div>
// );


// /* =========================================================
//    BUTTON
// ========================================================= */

// const Button = ({
//   children,
//   variant = "solid",
//   fullWidth = false,
//   size = "md",
//   className = "",
//   type = "button",
//   branding,
//   style = {},
//   ...props
// }) => {

//   const sizes = {
//     sm: "px-4 py-2 text-sm",
//     md: "px-5 py-2.5 text-sm",
//     lg: "px-6 py-3 text-base",
//   };

//   const sizeClass =
//     sizes[size] || sizes.md;

//   const baseStyle = {
//     display:
//       "inline-flex",

//     alignItems:
//       "center",

//     justifyContent:
//       "center",

//     width:
//       fullWidth
//         ? "100%"
//         : undefined,

//     borderRadius:
//       getButtonRadius(
//         branding,
//         size === "lg"
//       ),

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

//     transition:
//       "all 0.3s ease",

//     cursor:
//       "pointer",

//     ...(variant ===
//     "outline"
//       ? {
//           backgroundColor:
//             branding.cardBackgroundColor,

//           color:
//             branding.buttonColor,

//           border:
//             `1px solid ${branding.buttonColor}`,
//         }
//       : {
//           backgroundColor:
//             branding.buttonColor,

//           color:
//             branding.buttonTextColor,

//           border:
//             `1px solid ${branding.buttonColor}`,
//         }),

//     ...style,
//   };

//   return (
//     <button
//       type={type}
//       className={[
//         "font-semibold",
//         sizeClass,
//         className,
//       ].join(" ")}
//       style={baseStyle}
//       {...props}
//     >
//       {children}
//     </button>
//   );
// };


// /* =========================================================
//    MAIN COMPONENT
// ========================================================= */

// const WebsiteTrainers = () => {

//   const outletContext =
//     useOutletContext() || {};

//   const navigate =
//     useNavigate();


//   /* =======================================================
//      CONTENT
//   ======================================================= */

//   const content =
//     useMemo(
//       () =>
//         normalizeContent(
//           outletContext?.content ||
//             outletContext?.websiteContent ||
//             outletContext?.contents ||
//             {}
//         ),
//       [
//         outletContext?.content,
//         outletContext?.websiteContent,
//         outletContext?.contents,
//       ]
//     );


//   /* =======================================================
//      SECTIONS
//   ======================================================= */

//   const sections =
//     useMemo(
//       () =>
//         normalizeSections(
//           outletContext?.sections ||
//             outletContext?.websiteSections ||
//             {}
//         ),
//       [
//         outletContext?.sections,
//         outletContext?.websiteSections,
//       ]
//     );


//   /* =======================================================
//      BRANDING
//   ======================================================= */

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
//      SECTION VISIBILITY
//   ======================================================= */

//   const trainersVisible =
//     sections?.trainers?.visible !==
//     false;


//   /* =======================================================
//      DATA
//   ======================================================= */

//   const outletTrainers =
//     outletContext?.trainers ||
//     [];

//   const outletBanners =
//     outletContext?.banners ||
//     [];


//   const [
//     trainers,
//     setTrainers,
//   ] = useState([]);


//   const [
//     banners,
//     setBanners,
//   ] = useState([]);


//   const [
//     loading,
//     setLoading,
//   ] = useState(true);


//   const [
//     searchQuery,
//     setSearchQuery,
//   ] = useState("");


//   const [
//     filterSpecialty,
//     setFilterSpecialty,
//   ] = useState("all");


//   /* =======================================================
//      SYNC
//   ======================================================= */

//   useEffect(() => {

//     setTrainers(
//       Array.isArray(
//         outletTrainers
//       )
//         ? outletTrainers
//         : []
//     );

//     setBanners(
//       Array.isArray(
//         outletBanners
//       )
//         ? outletBanners
//         : []
//     );

//     setLoading(false);

//   }, [
//     outletTrainers,
//     outletBanners,
//   ]);


//   /* =======================================================
//      SKILLS
//   ======================================================= */

//   const getSkills = (
//     trainer
//   ) =>
//     toArray(
//       trainer?.skills
//     );


//   /* =======================================================
//      SPECIALTIES
//   ======================================================= */

//   const specialties =
//     useMemo(
//       () => {

//         const values =
//           trainers.flatMap(
//             (trainer) =>
//               getSkills(
//                 trainer
//               )
//           );

//         return [
//           "all",
//           ...Array.from(
//             new Set(
//               values
//                 .map(
//                   (skill) =>
//                     String(
//                       skill
//                     ).trim()
//                 )
//                 .filter(
//                   Boolean
//                 )
//             )
//           ),
//         ];
//       },
//       [
//         trainers,
//       ]
//     );


//   /* =======================================================
//      FILTERED TRAINERS
//   ======================================================= */

//   const filteredTrainers =
//     useMemo(
//       () => {

//         const query =
//           searchQuery
//             .trim()
//             .toLowerCase();

//         return trainers.filter(
//           (trainer) => {

//             const fullName =
//               String(
//                 trainer?.full_name ||
//                   ""
//               ).toLowerCase();

//             const bio =
//               String(
//                 trainer?.bio ||
//                   ""
//               ).toLowerCase();

//             const skills =
//               getSkills(
//                 trainer
//               ).map(
//                 (skill) =>
//                   String(
//                     skill
//                   )
//                     .trim()
//                     .toLowerCase()
//               );


//             const matchesSearch =
//               !query ||
//               fullName.includes(
//                 query
//               ) ||
//               bio.includes(
//                 query
//               ) ||
//               skills.some(
//                 (skill) =>
//                   skill.includes(
//                     query
//                   )
//               );


//             const matchesSpecialty =
//               filterSpecialty ===
//                 "all" ||
//               skills.includes(
//                 String(
//                   filterSpecialty
//                 ).toLowerCase()
//               );


//             return (
//               matchesSearch &&
//               matchesSpecialty
//             );
//           }
//         );

//       },
//       [
//         trainers,
//         searchQuery,
//         filterSpecialty,
//       ]
//     );


//   /* =======================================================
//      STYLES
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
//      HIDDEN
//   ======================================================= */

//   if (
//     !trainersVisible
//   ) {
//     return null;
//   }


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

//         <div
//           className="
//             h-10
//             w-10
//             animate-spin
//             rounded-full
//             border-4
//           "
//           style={{
//             borderColor:
//               hexToRgba(
//                 branding.buttonColor,
//                 0.20
//               ),

//             borderTopColor:
//               branding.buttonColor,
//           }}
//         />

//       </div>
//     );
//   }


//   /* =======================================================
//      PAGE
//   ======================================================= */

//   return (
//     <div
//       className="
//         min-h-screen
//         pb-20
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

//       {/* ===================================================
//           BANNER
//       =================================================== */}

//       {banners.length >
//         0 &&
//         (() => {

//           const trainerBanner =
//             banners.find(
//               (banner) => {

//                 const value =
//                   String(
//                     firstValue(
//                       banner?.page,
//                       banner?.page_name,
//                       banner?.pageName,
//                       banner?.page_type,
//                       banner?.pageType,
//                       banner?.section,
//                       banner?.banner_type,
//                       banner?.bannerType
//                     ) || ""
//                   ).toLowerCase();

//                 return (
//                   value.includes(
//                     "trainer"
//                   ) ||
//                   value.includes(
//                     "teacher"
//                   ) ||
//                   value.includes(
//                     "faculty"
//                   )
//                 );
//               }
//             ) ||
//             banners[0];


//           const image =
//             firstValue(
//               trainerBanner?.image_url,
//               trainerBanner?.imageUrl,
//               trainerBanner?.banner_url,
//               trainerBanner?.bannerUrl,
//               trainerBanner?.desktop_image_url,
//               trainerBanner?.desktopImageUrl,
//               trainerBanner?.image,
//               trainerBanner?.url
//             );


//           if (!image) {
//             return null;
//           }


//           return (
//             <section
//               className="
//                 relative
//                 h-[300px]
//                 overflow-hidden
//                 md:h-[400px]
//               "
//             >

//               <img
//                 src={image}
//                 alt="Trainers"
//                 className="
//                   absolute
//                   inset-0
//                   h-full
//                   w-full
//                   object-cover
//                 "
//                 onError={(
//                   event
//                 ) => {

//                   event.currentTarget.style.display =
//                     "none";

//                 }}
//               />

//             </section>
//           );

//         })()}


//       {/* ===================================================
//           TRAINERS CONTENT
//       =================================================== */}

//       <section
//         id="trainers"
//         className="
//           mx-auto
//           max-w-7xl
//           px-4
//           pt-12
//           sm:px-6
//           lg:px-8
//         "
//       >

//         {/* =================================================
//             DYNAMIC CONTENT
//         ================================================= */}

//         <div
//           className="
//             mb-8
//             text-center
//           "
//         >

//           {/* EYEBROW */}

//           {content?.trainers?.eyebrow && (

//             <p
//               className="
//                 mb-2
//                 text-sm
//                 uppercase
//                 tracking-[0.18em]
//               "
//               style={
//                 subheadingStyle
//               }
//             >
//               {
//                 content
//                   .trainers
//                   .eyebrow
//               }
//             </p>

//           )}


//           {/* HEADING */}

//           <h1
//             className="
//               text-3xl
//               md:text-4xl
//             "
//             style={
//               headingStyle
//             }
//           >
//             {
//               content
//                 .trainers
//                 .heading
//             }
//           </h1>


//           {/* SUBHEADING */}

//           {content?.trainers?.subheading && (

//             <p
//               className="
//                 mx-auto
//                 mt-3
//                 max-w-2xl
//               "
//               style={{
//                 ...bodyStyle,
//                 opacity: 0.65,
//               }}
//             >
//               {
//                 content
//                   .trainers
//                   .subheading
//               }
//             </p>

//           )}

//         </div>


//         {/* =================================================
//             SEARCH / FILTER
//         ================================================= */}

//         <div
//           className="
//             mb-10
//             flex
//             flex-col
//             gap-4
//             lg:flex-row
//           "
//         >

//           {/* SEARCH */}

//           <div
//             className="
//               relative
//               flex-1
//             "
//           >

//             <FaSearch
//               className="
//                 absolute
//                 left-4
//                 top-1/2
//                 -translate-y-1/2
//               "
//               style={{
//                 color:
//                   hexToRgba(
//                     branding.textColor,
//                     0.45
//                   ),
//               }}
//             />


//             <input
//               type="text"
//               value={
//                 searchQuery
//               }
//               onChange={(
//                 event
//               ) =>
//                 setSearchQuery(
//                   event.target.value
//                 )
//               }
//               placeholder="Search trainers..."
//               className="
//                 h-14
//                 w-full
//                 border
//                 px-12
//                 pr-4
//                 outline-none
//               "
//               style={{
//                 backgroundColor:
//                   branding.cardBackgroundColor,

//                 color:
//                   branding.textColor,

//                 borderColor:
//                   hexToRgba(
//                     branding.textColor,
//                     0.15
//                   ),

//                 borderRadius:
//                   "12px",

//                 fontFamily:
//                   fontFamily(
//                     branding.fontBody
//                   ),
//               }}
//             />

//           </div>


//           {/* FILTER */}

//           <div
//             className="
//               relative
//               lg:w-[260px]
//             "
//           >

//             <select
//               value={
//                 filterSpecialty
//               }
//               onChange={(
//                 event
//               ) =>
//                 setFilterSpecialty(
//                   event.target.value
//                 )
//               }
//               className="
//                 h-14
//                 w-full
//                 appearance-none
//                 border
//                 px-4
//                 pr-10
//                 outline-none
//                 cursor-pointer
//               "
//               style={{
//                 backgroundColor:
//                   branding.cardBackgroundColor,

//                 color:
//                   branding.textColor,

//                 borderColor:
//                   hexToRgba(
//                     branding.textColor,
//                     0.15
//                   ),

//                 borderRadius:
//                   "12px",

//                 fontFamily:
//                   fontFamily(
//                     branding.fontBody
//                   ),
//               }}
//             >

//               {specialties.map(
//                 (
//                   specialty
//                 ) => (

//                   <option
//                     key={
//                       specialty
//                     }
//                     value={
//                       specialty
//                     }
//                   >
//                     {specialty ===
//                     "all"
//                       ? "All Specialties"
//                       : specialty}
//                   </option>

//                 )
//               )}

//             </select>


//             <FaChevronDown
//               className="
//                 pointer-events-none
//                 absolute
//                 right-4
//                 top-1/2
//                 -translate-y-1/2
//               "
//               style={{
//                 color:
//                   hexToRgba(
//                     branding.textColor,
//                     0.45
//                   ),
//               }}
//             />

//           </div>

//         </div>


//         {/* =================================================
//             NO RESULTS
//         ================================================= */}

//         {filteredTrainers.length ===
//         0 ? (

//           <div
//             className="
//               rounded-2xl
//               border
//               py-20
//               text-center
//             "
//             style={{
//               backgroundColor:
//                 branding.cardBackgroundColor,

//               borderColor:
//                 hexToRgba(
//                   branding.textColor,
//                   0.12
//                 ),
//             }}
//           >

//             <h2
//               className="
//                 text-xl
//               "
//               style={
//                 headingStyle
//               }
//             >
//               No trainers found
//             </h2>


//             <p
//               className="
//                 mt-2
//               "
//               style={{
//                 ...bodyStyle,
//                 opacity: 0.65,
//               }}
//             >
//               Try another search
//               term or specialty.
//             </p>


//             <Button
//               branding={
//                 branding
//               }
//               size="md"
//               className="mt-5"
//               onClick={() => {

//                 setSearchQuery(
//                   ""
//                 );

//                 setFilterSpecialty(
//                   "all"
//                 );

//               }}
//             >
//               Clear Filters
//             </Button>

//           </div>

//         ) : (

//           /* =================================================
//              TRAINER GRID
//           ================================================= */

//           <div
//             className="
//               grid
//               grid-cols-1
//               gap-6
//               sm:grid-cols-2
//               lg:grid-cols-3
//               xl:grid-cols-4
//             "
//           >

//             {filteredTrainers.map(
//               (
//                 trainer
//               ) => {

//                 const skills =
//                   getSkills(
//                     trainer
//                   );

//                 const rating =
//                   Number(
//                     trainer?.rating ||
//                       0
//                   );

//                 const experience =
//                   Number(
//                     trainer?.experience_years ||
//                       0
//                   );

//                 const students =
//                   Number(
//                     trainer?.total_students ||
//                       0
//                   );

//                 const reviews =
//                   Number(
//                     trainer?.total_reviews ||
//                       0
//                   );

//                 const trainerId =
//                   trainer?.id ||
//                   trainer?._id;


//                 return (
//                   <Card
//                     key={
//                       trainerId
//                     }
//                     className="
//                       group
//                       flex
//                       h-full
//                       flex-col
//                       overflow-hidden
//                       transition-all
//                       duration-300
//                       hover:-translate-y-1
//                     "
//                     style={{
//                       backgroundColor:
//                         branding.cardBackgroundColor,

//                       border:
//                         `1px solid ${hexToRgba(
//                           branding.textColor,
//                           0.12
//                         )}`,

//                       borderRadius:
//                         "18px",

//                       boxShadow:
//                         "0 2px 10px rgba(0,0,0,0.04)",
//                     }}
//                   >

//                     {/* IMAGE */}

//                     <div
//                       className="
//                         relative
//                         h-64
//                         overflow-hidden
//                       "
//                       style={{
//                         backgroundColor:
//                           hexToRgba(
//                             branding.textColor,
//                             0.05
//                           ),
//                       }}
//                     >

//                       <img
//                         src={
//                           trainer?.profile_image ||
//                           "https://placehold.co/600x600/png?text=Trainer"
//                         }
//                         alt={
//                           trainer?.full_name ||
//                           "Trainer"
//                         }
//                         className="
//                           h-full
//                           w-full
//                           object-cover
//                           transition-transform
//                           duration-500
//                           group-hover:scale-105
//                         "
//                         loading="lazy"
//                         onError={(
//                           event
//                         ) => {

//                           event.currentTarget.onerror =
//                             null;

//                           event.currentTarget.src =
//                             "https://placehold.co/600x600/png?text=Trainer";

//                         }}
//                       />


//                       {experience >
//                         0 && (

//                         <span
//                           className="
//                             absolute
//                             right-4
//                             top-4
//                             px-3
//                             py-1.5
//                             text-xs
//                           "
//                           style={{
//                             backgroundColor:
//                               branding.cardBackgroundColor,

//                             color:
//                               branding.headingColor,

//                             borderRadius:
//                               getButtonRadius(
//                                 branding
//                               ),

//                             fontFamily:
//                               fontFamily(
//                                 branding.fontBody
//                               ),

//                             fontWeight:
//                               branding.headingWeight,
//                           }}
//                         >
//                           {experience}{" "}
//                           yrs experience
//                         </span>

//                       )}

//                     </div>


//                     {/* CARD */}

//                     <div
//                       className="
//                         flex
//                         flex-1
//                         flex-col
//                         p-5
//                       "
//                     >

//                       <h2
//                         className="
//                           truncate
//                           text-xl
//                         "
//                         style={
//                           headingStyle
//                         }
//                       >
//                         {
//                           trainer?.full_name ||
//                           "Trainer"
//                         }
//                       </h2>


//                       {/* SKILLS */}

//                       <div
//                         className="
//                           mt-3
//                           flex
//                           min-h-[28px]
//                           flex-wrap
//                           gap-2
//                         "
//                       >

//                         {skills
//                           .slice(
//                             0,
//                             3
//                           )
//                           .map(
//                             (
//                               skill,
//                               index
//                             ) => (

//                               <span
//                                 key={`${skill}-${index}`}
//                                 className="
//                                   px-2.5
//                                   py-1
//                                   text-xs
//                                 "
//                                 style={{
//                                   backgroundColor:
//                                     hexToRgba(
//                                       branding.buttonColor,
//                                       0.10
//                                     ),

//                                   color:
//                                     branding.buttonColor,

//                                   borderRadius:
//                                     getButtonRadius(
//                                       branding
//                                     ),

//                                   fontFamily:
//                                     fontFamily(
//                                       branding.fontBody
//                                     ),
//                                 }}
//                               >
//                                 {
//                                   String(
//                                     skill
//                                   ).trim()
//                                 }
//                               </span>

//                             )
//                           )}


//                         {!skills.length && (

//                           <span
//                             className="
//                               text-sm
//                             "
//                             style={{
//                               ...bodyStyle,
//                               opacity: 0.60,
//                             }}
//                           >
//                             Professional
//                             Trainer
//                           </span>

//                         )}

//                       </div>


//                       {/* BIO */}

//                       <p
//                         className="
//                           mt-4
//                           line-clamp-3
//                           text-sm
//                         "
//                         style={{
//                           ...bodyStyle,
//                           opacity: 0.68,
//                         }}
//                       >
//                         {
//                           trainer?.bio ||
//                           "No bio available for this trainer."
//                         }
//                       </p>


//                       {/* RATING */}

//                       <div
//                         className="
//                           mt-5
//                         "
//                       >

//                         <div
//                           className="
//                             flex
//                             items-center
//                             justify-between
//                           "
//                         >

//                           <div
//                             className="
//                               flex
//                               items-center
//                               gap-1
//                             "
//                           >

//                             {[1, 2, 3, 4, 5].map(
//                               (
//                                 star
//                               ) => (

//                                 <FaStar
//                                   key={
//                                     star
//                                   }
//                                   style={{
//                                     color:
//                                       star <=
//                                       Math.round(
//                                         rating
//                                       )
//                                         ? branding.iconColor
//                                         : hexToRgba(
//                                             branding.textColor,
//                                             0.15
//                                           ),
//                                   }}
//                                 />

//                               )
//                             )}

//                           </div>


//                           <span
//                             style={{
//                               color:
//                                 branding.headingColor,

//                               fontFamily:
//                                 fontFamily(
//                                   branding.fontBody
//                                 ),

//                               fontWeight:
//                                 branding.headingWeight,
//                             }}
//                           >
//                             {rating.toFixed(
//                               1
//                             )}
//                           </span>

//                         </div>


//                         <div
//                           className="
//                             mt-2
//                             h-1.5
//                             overflow-hidden
//                           "
//                           style={{
//                             backgroundColor:
//                               hexToRgba(
//                                 branding.textColor,
//                                 0.08
//                               ),

//                             borderRadius:
//                               getButtonRadius(
//                                 branding
//                               ),
//                           }}
//                         >

//                           <div
//                             className="
//                               h-full
//                             "
//                             style={{
//                               width:
//                                 `${Math.min(
//                                   Math.max(
//                                     (rating /
//                                       5) *
//                                       100,
//                                     0
//                                   ),
//                                   100
//                                 )}%`,

//                               backgroundColor:
//                                 branding.buttonColor,

//                               borderRadius:
//                                 getButtonRadius(
//                                   branding
//                                 ),
//                             }}
//                           />

//                         </div>

//                       </div>


//                       {/* STATS */}

//                       <div
//                         className="
//                           mt-5
//                           grid
//                           grid-cols-2
//                           gap-3
//                         "
//                       >

//                         <div
//                           className="
//                             p-3
//                           "
//                           style={{
//                             backgroundColor:
//                               hexToRgba(
//                                 branding.textColor,
//                                 0.035
//                               ),

//                             border:
//                               `1px solid ${hexToRgba(
//                                 branding.textColor,
//                                 0.08
//                               )}`,

//                             borderRadius:
//                               "12px",
//                           }}
//                         >

//                           <div
//                             className="
//                               flex
//                               items-center
//                               gap-2
//                             "
//                           >

//                             <FaUsers
//                               className="text-sm"
//                               style={{
//                                 color:
//                                   branding.iconColor,
//                               }}
//                             />

//                             <span
//                               className="
//                                 text-sm
//                                 font-bold
//                               "
//                               style={{
//                                 color:
//                                   branding.headingColor,

//                                 fontFamily:
//                                   fontFamily(
//                                     branding.fontBody
//                                   ),
//                               }}
//                             >
//                               {students.toLocaleString()}
//                             </span>

//                           </div>


//                           <p
//                             className="
//                               mt-1
//                               text-xs
//                             "
//                             style={{
//                               ...bodyStyle,
//                               opacity: 0.60,
//                             }}
//                           >
//                             Students
//                           </p>

//                         </div>


//                         <div
//                           className="
//                             p-3
//                           "
//                           style={{
//                             backgroundColor:
//                               hexToRgba(
//                                 branding.textColor,
//                                 0.035
//                               ),

//                             border:
//                               `1px solid ${hexToRgba(
//                                 branding.textColor,
//                                 0.08
//                               )}`,

//                             borderRadius:
//                               "12px",
//                           }}
//                         >

//                           <div
//                             className="
//                               flex
//                               items-center
//                               gap-2
//                             "
//                           >

//                             <FaComment
//                               className="text-sm"
//                               style={{
//                                 color:
//                                   branding.iconColor,
//                               }}
//                             />

//                             <span
//                               className="
//                                 text-sm
//                                 font-bold
//                               "
//                               style={{
//                                 color:
//                                   branding.headingColor,

//                                 fontFamily:
//                                   fontFamily(
//                                     branding.fontBody
//                                   ),
//                               }}
//                             >
//                               {reviews.toLocaleString()}
//                             </span>

//                           </div>


//                           <p
//                             className="
//                               mt-1
//                               text-xs
//                             "
//                             style={{
//                               ...bodyStyle,
//                               opacity: 0.60,
//                             }}
//                           >
//                             Reviews
//                           </p>

//                         </div>

//                       </div>


//                       {/* BUTTON */}

//                       <div
//                         className="
//                           mt-auto
//                           pt-5
//                         "
//                       >

//                         <Button
//                           branding={
//                             branding
//                           }
//                           variant="outline"
//                           fullWidth
//                           size="sm"
//                           onClick={() => {

//                             if (
//                               !trainerId
//                             ) {

//                               console.error(
//                                 "Trainer ID is missing.",
//                                 trainer
//                               );

//                               return;
//                             }


//                             navigate(
//                               `/institute/website/preview/trainers/${trainerId}`
//                             );

//                           }}
//                         >

//                           View Profile

//                           <FaArrowRight
//                             className="
//                               ml-2
//                               text-xs
//                             "
//                           />

//                         </Button>

//                       </div>

//                     </div>

//                   </Card>
//                 );
//               }
//             )}

//           </div>

//         )}

//       </section>

//     </div>
//   );
// };


// export default WebsiteTrainers;



// // src/institute/Website/WebsiteTrainers.jsx

// import {
//   useState,
//   useMemo,
//   useEffect,
//   useRef,
// } from "react";

// import {
//   FaSearch,
//   FaStar,
//   FaUsers,
//   FaComment,
//   FaArrowRight,
//   FaChevronDown,
//   FaChevronLeft,
//   FaChevronRight,
// } from "react-icons/fa";

// import {
//   useNavigate,
//   useOutletContext,
// } from "react-router-dom";


// /* =========================================================
//    DEFAULT CONTENT
// ========================================================= */

// const DEFAULT_CONTENT = {
//   trainers: {
//     eyebrow: "OUR TEAM",
//     heading: "Meet Our Expert Trainers",
//     subheading:
//       "Find the right trainer based on expertise, experience and specialty.",
//   },
// };


// /* =========================================================
//    DEFAULT SECTIONS
// ========================================================= */

// const DEFAULT_SECTIONS = {
//   trainers: {
//     visible: true,
//   },
// };


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
//    HELPERS
// ========================================================= */

// const firstValue = (...values) =>
//   values.find(
//     (value) =>
//       value !== undefined &&
//       value !== null &&
//       String(value).trim() !== ""
//   );


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


// /* =========================================================
//    NORMALIZE BRANDING
// ========================================================= */

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

//   footerBackgroundColor: getBrandingValue(
//     branding,
//     "footerBackgroundColor",
//     "footer_background_color",
//     DEFAULT_BRANDING.footerBackgroundColor
//   ),

//   footerHeadingColor: getBrandingValue(
//     branding,
//     "footerHeadingColor",
//     "footer_heading_color",
//     DEFAULT_BRANDING.footerHeadingColor
//   ),

//   footerTextColor: getBrandingValue(
//     branding,
//     "footerTextColor",
//     "footer_text_color",
//     DEFAULT_BRANDING.footerTextColor
//   ),

//   fontHeading: getBrandingValue(
//     branding,
//     "fontHeading",
//     "font_heading",
//     DEFAULT_BRANDING.fontHeading
//   ),

//   fontSubheading: getBrandingValue(
//     branding,
//     "fontSubheading",
//     "font_subheading",
//     DEFAULT_BRANDING.fontSubheading
//   ),

//   fontBody: getBrandingValue(
//     branding,
//     "fontBody",
//     "font_body",
//     DEFAULT_BRANDING.fontBody
//   ),

//   headingWeight: getBrandingValue(
//     branding,
//     "headingWeight",
//     "heading_weight",
//     DEFAULT_BRANDING.headingWeight
//   ),

//   headingLineHeight: getBrandingValue(
//     branding,
//     "headingLineHeight",
//     "heading_line_height",
//     DEFAULT_BRANDING.headingLineHeight
//   ),

//   headingLetterSpacing: getBrandingValue(
//     branding,
//     "headingLetterSpacing",
//     "heading_letter_spacing",
//     DEFAULT_BRANDING.headingLetterSpacing
//   ),

//   subheadingWeight: getBrandingValue(
//     branding,
//     "subheadingWeight",
//     "subheading_weight",
//     DEFAULT_BRANDING.subheadingWeight
//   ),

//   subheadingLineHeight: getBrandingValue(
//     branding,
//     "subheadingLineHeight",
//     "subheading_line_height",
//     DEFAULT_BRANDING.subheadingLineHeight
//   ),

//   bodyWeight: getBrandingValue(
//     branding,
//     "bodyWeight",
//     "body_weight",
//     DEFAULT_BRANDING.bodyWeight
//   ),

//   bodyLineHeight: getBrandingValue(
//     branding,
//     "bodyLineHeight",
//     "body_line_height",
//     DEFAULT_BRANDING.bodyLineHeight
//   ),

//   bodyLetterSpacing: getBrandingValue(
//     branding,
//     "bodyLetterSpacing",
//     "body_letter_spacing",
//     DEFAULT_BRANDING.bodyLetterSpacing
//   ),

//   roundedButtons: getBrandingValue(
//     branding,
//     "roundedButtons",
//     "rounded_buttons",
//     DEFAULT_BRANDING.roundedButtons
//   ),
// });


// /* =========================================================
//    NORMALIZE CONTENT
// ========================================================= */

// const normalizeContent = (
//   content = {}
// ) => {
//   const source =
//     content?.trainers ||
//     content?.trainer ||
//     content?.Trainers ||
//     {};

//   return {
//     trainers: {
//       eyebrow: firstValue(
//         source?.eyebrow,
//         source?.eyebrow_text,
//         source?.label,
//         DEFAULT_CONTENT.trainers.eyebrow
//       ),

//       heading: firstValue(
//         source?.heading,
//         source?.title,
//         source?.page_heading,
//         DEFAULT_CONTENT.trainers.heading
//       ),

//       subheading: firstValue(
//         source?.subheading,
//         source?.subtitle,
//         source?.page_subheading,
//         DEFAULT_CONTENT.trainers.subheading
//       ),
//     },
//   };
// };


// /* =========================================================
//    NORMALIZE SECTIONS
// ========================================================= */

// const normalizeSections = (
//   sections = {}
// ) => {
//   const source =
//     sections?.trainers ||
//     sections?.trainer ||
//     sections?.Trainers ||
//     {};

//   const visible =
//     source?.visible ??
//     source?.is_visible ??
//     source?.isVisible ??
//     sections?.trainers_visible ??
//     sections?.trainer_visible;

//   if (
//     visible === false ||
//     visible === 0 ||
//     visible === "0" ||
//     visible === "false"
//   ) {
//     return {
//       trainers: {
//         visible: false,
//       },
//     };
//   }

//   if (
//     visible === true ||
//     visible === 1 ||
//     visible === "1" ||
//     visible === "true"
//   ) {
//     return {
//       trainers: {
//         visible: true,
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


// /* =========================================================
//    HEX TO RGBA
// ========================================================= */

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
//    ARRAY HELPER
// ========================================================= */

// const toArray = (
//   value
// ) => {
//   if (
//     Array.isArray(value)
//   ) {
//     return value;
//   }

//   if (
//     typeof value === "string"
//   ) {
//     try {
//       const parsed =
//         JSON.parse(value);

//       if (
//         Array.isArray(parsed)
//       ) {
//         return parsed;
//       }
//     } catch {
//       // fallback
//     }

//     return value
//       .split(",")
//       .map(
//         (item) =>
//           item.trim()
//       )
//       .filter(Boolean);
//   }

//   return [];
// };


// /* =========================================================
//    CARD
// ========================================================= */

// const Card = ({
//   children,
//   className = "",
//   style = {},
//   ...props
// }) => (
//   <div
//     className={className}
//     style={style}
//     {...props}
//   >
//     {children}
//   </div>
// );


// /* =========================================================
//    BUTTON
// ========================================================= */

// const Button = ({
//   children,
//   variant = "solid",
//   fullWidth = false,
//   size = "md",
//   className = "",
//   type = "button",
//   branding,
//   style = {},
//   ...props
// }) => {

//   const sizes = {
//     sm: "px-4 py-2 text-sm",
//     md: "px-5 py-2.5 text-sm",
//     lg: "px-6 py-3 text-base",
//   };

//   const sizeClass =
//     sizes[size] || sizes.md;

//   const baseStyle = {
//     display:
//       "inline-flex",

//     alignItems:
//       "center",

//     justifyContent:
//       "center",

//     width:
//       fullWidth
//         ? "100%"
//         : undefined,

//     borderRadius:
//       getButtonRadius(
//         branding,
//         size === "lg"
//       ),

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

//     transition:
//       "all 0.3s ease",

//     cursor:
//       "pointer",

//     ...(variant ===
//     "outline"
//       ? {
//           backgroundColor:
//             branding.cardBackgroundColor,

//           color:
//             branding.buttonColor,

//           border:
//             `1px solid ${branding.buttonColor}`,
//         }
//       : {
//           backgroundColor:
//             branding.buttonColor,

//           color:
//             branding.buttonTextColor,

//           border:
//             `1px solid ${branding.buttonColor}`,
//         }),

//     ...style,
//   };

//   return (
//     <button
//       type={type}
//       className={[
//         "font-semibold",
//         sizeClass,
//         className,
//       ].join(" ")}
//       style={baseStyle}
//       {...props}
//     >
//       {children}
//     </button>
//   );
// };


// /* =========================================================
//    MAIN COMPONENT
// ========================================================= */

// const WebsiteTrainers = () => {

//   const outletContext =
//     useOutletContext() || {};

//   const navigate =
//     useNavigate();

//   /* =======================================================
//      TRAINERS CAROUSEL
//   ======================================================= */

//   const trainersSliderRef = useRef(null);

//   const scrollTrainers = (direction) => {
//     if (!trainersSliderRef.current) return;

//     const container = trainersSliderRef.current;
//     const cardWidth = container.clientWidth;

//     container.scrollBy({
//       left:
//         direction === "left"
//           ? -cardWidth
//           : cardWidth,
//       behavior: "smooth",
//     });
//   };


//   /* =======================================================
//      CONTENT
//   ======================================================= */

//   const content =
//     useMemo(
//       () =>
//         normalizeContent(
//           outletContext?.content ||
//             outletContext?.websiteContent ||
//             outletContext?.contents ||
//             {}
//         ),
//       [
//         outletContext?.content,
//         outletContext?.websiteContent,
//         outletContext?.contents,
//       ]
//     );


//   /* =======================================================
//      SECTIONS
//   ======================================================= */

//   const sections =
//     useMemo(
//       () =>
//         normalizeSections(
//           outletContext?.sections ||
//             outletContext?.websiteSections ||
//             {}
//         ),
//       [
//         outletContext?.sections,
//         outletContext?.websiteSections,
//       ]
//     );


//   /* =======================================================
//      BRANDING
//   ======================================================= */

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
//      SECTION VISIBILITY
//   ======================================================= */

//   const trainersVisible =
//     sections?.trainers?.visible !==
//     false;


//   /* =======================================================
//      DATA
//   ======================================================= */

//   const outletTrainers =
//     outletContext?.trainers ||
//     [];

//   const outletBanners =
//     outletContext?.banners ||
//     [];


//   const [
//     trainers,
//     setTrainers,
//   ] = useState([]);


//   const [
//     banners,
//     setBanners,
//   ] = useState([]);


//   const [
//     loading,
//     setLoading,
//   ] = useState(true);


//   const [
//     searchQuery,
//     setSearchQuery,
//   ] = useState("");


//   const [
//     filterSpecialty,
//     setFilterSpecialty,
//   ] = useState("all");


//   /* =======================================================
//      SYNC
//   ======================================================= */

//   useEffect(() => {

//     setTrainers(
//       Array.isArray(
//         outletTrainers
//       )
//         ? outletTrainers
//         : []
//     );

//     setBanners(
//       Array.isArray(
//         outletBanners
//       )
//         ? outletBanners
//         : []
//     );

//     setLoading(false);

//   }, [
//     outletTrainers,
//     outletBanners,
//   ]);


//   /* =======================================================
//      SKILLS
//   ======================================================= */

//   const getSkills = (
//     trainer
//   ) =>
//     toArray(
//       trainer?.skills
//     );


//   /* =======================================================
//      SPECIALTIES
//   ======================================================= */

//   const specialties =
//     useMemo(
//       () => {

//         const values =
//           trainers.flatMap(
//             (trainer) =>
//               getSkills(
//                 trainer
//               )
//           );

//         return [
//           "all",
//           ...Array.from(
//             new Set(
//               values
//                 .map(
//                   (skill) =>
//                     String(
//                       skill
//                     ).trim()
//                 )
//                 .filter(
//                   Boolean
//                 )
//             )
//           ),
//         ];
//       },
//       [
//         trainers,
//       ]
//     );


//   /* =======================================================
//      FILTERED TRAINERS
//   ======================================================= */

//   const filteredTrainers =
//     useMemo(
//       () => {

//         const query =
//           searchQuery
//             .trim()
//             .toLowerCase();

//         return trainers.filter(
//           (trainer) => {

//             const fullName =
//               String(
//                 trainer?.full_name ||
//                   ""
//               ).toLowerCase();

//             const bio =
//               String(
//                 trainer?.bio ||
//                   ""
//               ).toLowerCase();

//             const skills =
//               getSkills(
//                 trainer
//               ).map(
//                 (skill) =>
//                   String(
//                     skill
//                   )
//                     .trim()
//                     .toLowerCase()
//               );


//             const matchesSearch =
//               !query ||
//               fullName.includes(
//                 query
//               ) ||
//               bio.includes(
//                 query
//               ) ||
//               skills.some(
//                 (skill) =>
//                   skill.includes(
//                     query
//                   )
//               );


//             const matchesSpecialty =
//               filterSpecialty ===
//                 "all" ||
//               skills.includes(
//                 String(
//                   filterSpecialty
//                 ).toLowerCase()
//               );


//             return (
//               matchesSearch &&
//               matchesSpecialty
//             );
//           }
//         );

//       },
//       [
//         trainers,
//         searchQuery,
//         filterSpecialty,
//       ]
//     );


//   /* =======================================================
//      STYLES
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
//      HIDDEN
//   ======================================================= */

//   if (
//     !trainersVisible
//   ) {
//     return null;
//   }


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

//         <div
//           className="
//             h-10
//             w-10
//             animate-spin
//             rounded-full
//             border-4
//           "
//           style={{
//             borderColor:
//               hexToRgba(
//                 branding.buttonColor,
//                 0.20
//               ),

//             borderTopColor:
//               branding.buttonColor,
//           }}
//         />

//       </div>
//     );
//   }


//   /* =======================================================
//      PAGE
//   ======================================================= */

//   return (
//     <div
//       className="
//         min-h-screen
//         pb-20
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

//       {/* ===================================================
//           BANNER
//       =================================================== */}

//       {banners.length >
//         0 &&
//         (() => {

//           const trainerBanner =
//             banners.find(
//               (banner) => {

//                 const value =
//                   String(
//                     firstValue(
//                       banner?.page,
//                       banner?.page_name,
//                       banner?.pageName,
//                       banner?.page_type,
//                       banner?.pageType,
//                       banner?.section,
//                       banner?.banner_type,
//                       banner?.bannerType
//                     ) || ""
//                   ).toLowerCase();

//                 return (
//                   value.includes(
//                     "trainer"
//                   ) ||
//                   value.includes(
//                     "teacher"
//                   ) ||
//                   value.includes(
//                     "faculty"
//                   )
//                 );
//               }
//             ) ||
//             banners[0];


//           const image =
//             firstValue(
//               trainerBanner?.image_url,
//               trainerBanner?.imageUrl,
//               trainerBanner?.banner_url,
//               trainerBanner?.bannerUrl,
//               trainerBanner?.desktop_image_url,
//               trainerBanner?.desktopImageUrl,
//               trainerBanner?.image,
//               trainerBanner?.url
//             );


//           if (!image) {
//             return null;
//           }


//           return (
//             <section
//               className="
//                 relative
//                 h-[300px]
//                 overflow-hidden
//                 md:h-[400px]
//               "
//             >

//               <img
//                 src={image}
//                 alt="Trainers"
//                 className="
//                   absolute
//                   inset-0
//                   h-full
//                   w-full
//                   object-cover
//                 "
//                 onError={(
//                   event
//                 ) => {

//                   event.currentTarget.style.display =
//                     "none";

//                 }}
//               />

//             </section>
//           );

//         })()}


//       {/* ===================================================
//           TRAINERS CONTENT
//       =================================================== */}

//       <section
//         id="trainers"
//         className="
//           mx-auto
//           max-w-7xl
//           px-4
//           pt-12
//           sm:px-6
//           lg:px-8
//         "
//       >
// {/* =================================================
//     DYNAMIC CONTENT
// ================================================= */}

// <div className="mb-8 text-center">

//   {/* HEADING */}
//   <h1
//     className="
//       text-3xl
//       md:text-4xl
//     "
//     style={headingStyle}
//   >
//     {content?.trainers?.heading || "Our Trainers"}
//   </h1>

//   {/* SUBHEADING */}
//   {content?.trainers?.subheading && (
//     <p
//       className="
//         mx-auto
//         mt-3
//         max-w-2xl
//       "
//       style={{
//         ...bodyStyle,
//         opacity: 0.65,
//       }}
//     >
//       {content.trainers.subheading}
//     </p>
//   )}

// </div>


//         {/* =================================================
//             SEARCH / FILTER
//         ================================================= */}

//         <div
//           className="
//             mb-10
//             flex
//             flex-col
//             gap-4
//             lg:flex-row
//           "
//         >

//           {/* SEARCH */}

//           <div
//             className="
//               relative
//               flex-1
//             "
//           >

//             <FaSearch
//               className="
//                 absolute
//                 left-4
//                 top-1/2
//                 -translate-y-1/2
//               "
//               style={{
//                 color:
//                   hexToRgba(
//                     branding.textColor,
//                     0.45
//                   ),
//               }}
//             />


//             <input
//               type="text"
//               value={
//                 searchQuery
//               }
//               onChange={(
//                 event
//               ) =>
//                 setSearchQuery(
//                   event.target.value
//                 )
//               }
//               placeholder="Search trainers..."
//               className="
//                 h-14
//                 w-full
//                 border
//                 px-12
//                 pr-4
//                 outline-none
//               "
//               style={{
//                 backgroundColor:
//                   branding.cardBackgroundColor,

//                 color:
//                   branding.textColor,

//                 borderColor:
//                   hexToRgba(
//                     branding.textColor,
//                     0.15
//                   ),

//                 borderRadius:
//                   "12px",

//                 fontFamily:
//                   fontFamily(
//                     branding.fontBody
//                   ),
//               }}
//             />

//           </div>


//           {/* FILTER */}

//           <div
//             className="
//               relative
//               lg:w-[260px]
//             "
//           >

//             <select
//               value={
//                 filterSpecialty
//               }
//               onChange={(
//                 event
//               ) =>
//                 setFilterSpecialty(
//                   event.target.value
//                 )
//               }
//               className="
//                 h-14
//                 w-full
//                 appearance-none
//                 border
//                 px-4
//                 pr-10
//                 outline-none
//                 cursor-pointer
//               "
//               style={{
//                 backgroundColor:
//                   branding.cardBackgroundColor,

//                 color:
//                   branding.textColor,

//                 borderColor:
//                   hexToRgba(
//                     branding.textColor,
//                     0.15
//                   ),

//                 borderRadius:
//                   "12px",

//                 fontFamily:
//                   fontFamily(
//                     branding.fontBody
//                   ),
//               }}
//             >

//               {specialties.map(
//                 (
//                   specialty
//                 ) => (

//                   <option
//                     key={
//                       specialty
//                     }
//                     value={
//                       specialty
//                     }
//                   >
//                     {specialty ===
//                     "all"
//                       ? "All Specialties"
//                       : specialty}
//                   </option>

//                 )
//               )}

//             </select>


//             <FaChevronDown
//               className="
//                 pointer-events-none
//                 absolute
//                 right-4
//                 top-1/2
//                 -translate-y-1/2
//               "
//               style={{
//                 color:
//                   hexToRgba(
//                     branding.textColor,
//                     0.45
//                   ),
//               }}
//             />

//           </div>

//         </div>


//         {/* =================================================
//             NO RESULTS
//         ================================================= */}

//         {filteredTrainers.length ===
//         0 ? (

//           <div
//             className="
//               rounded-2xl
//               border
//               py-20
//               text-center
//             "
//             style={{
//               backgroundColor:
//                 branding.cardBackgroundColor,

//               borderColor:
//                 hexToRgba(
//                   branding.textColor,
//                   0.12
//                 ),
//             }}
//           >

//             <h2
//               className="
//                 text-xl
//               "
//               style={
//                 headingStyle
//               }
//             >
//               No trainers found
//             </h2>


//             <p
//               className="
//                 mt-2
//               "
//               style={{
//                 ...bodyStyle,
//                 opacity: 0.65,
//               }}
//             >
//               Try another search
//               term or specialty.
//             </p>


//             <Button
//               branding={
//                 branding
//               }
//               size="md"
//               className="mt-5"
//               onClick={() => {

//                 setSearchQuery(
//                   ""
//                 );

//                 setFilterSpecialty(
//                   "all"
//                 );

//               }}
//             >
//               Clear Filters
//             </Button>

//           </div>

//         ) : (

//           /* =================================================
//              TRAINER CAROUSEL
//           ================================================= */

//           <div className="relative w-full">

//             {/* TRAINER VIEWPORT */}
//             <div
//               ref={trainersSliderRef}
//               className="
//                 flex
//                 snap-x
//                 snap-mandatory
//                 gap-6
//                 overflow-x-auto
//                 scroll-smooth
//                 pb-2
//                 [scrollbar-width:none]
//                 [&::-webkit-scrollbar]:hidden
//               "
//             >

//               {filteredTrainers.map(
//                 (trainer) => {

//                   const skills =
//                     getSkills(
//                       trainer
//                     );

//                   const rating =
//                     Number(
//                       trainer?.rating ||
//                         0
//                     );

//                   const experience =
//                     Number(
//                       trainer?.experience_years ||
//                         0
//                     );

//                   const students =
//                     Number(
//                       trainer?.total_students ||
//                         0
//                     );

//                   const reviews =
//                     Number(
//                       trainer?.total_reviews ||
//                         0
//                     );

//                   const trainerId =
//                     trainer?.id ||
//                     trainer?._id;


//                   return (
//                     <div
//                       key={trainerId}
//                       className="
//                         w-full
//                         flex-none
//                         snap-start
//                         sm:w-[calc(50%-12px)]
//                         lg:w-[calc(25%-18px)]
//                       "
//                     >

//                       <Card
//                         className="
//                           group
//                           flex
//                           h-full
//                           min-h-[430px]
//                           flex-col
//                           overflow-hidden
//                           p-0
//                           transition-all
//                           duration-500
//                           hover:-translate-y-1
//                         "
//                         style={{
//                           backgroundColor:
//                             branding.cardBackgroundColor,

//                           border:
//                             `1px solid ${hexToRgba(
//                               branding.textColor,
//                               0.08
//                             )}`,

//                           borderRadius:
//                             "18px",

//                           boxShadow:
//                             "0 10px 30px rgba(0,0,0,0.06)",
//                         }}
//                       >

//                         {/* =================================================
//                             SECTION 1: TRAINER IMAGE
//                         ================================================= */}

//                         <div
//                           className="
//                             relative
//                             flex
//                             items-center
//                             justify-center
//                             py-5
//                           "
//                           style={{
//                             background:
//                               `linear-gradient(to bottom, ${hexToRgba(
//                                 branding.buttonColor,
//                                 0.04
//                               )}, transparent)`,
//                           }}
//                         >

//                           <div
//                             className="
//                               absolute
//                               h-28
//                               w-28
//                               rounded-full
//                               blur-2xl
//                               transition-all
//                               duration-500
//                               group-hover:scale-110
//                             "
//                             style={{
//                               backgroundColor:
//                                 hexToRgba(
//                                   branding.buttonColor,
//                                   0
//                                 ),
//                             }}
//                           />

//                           <div
//                             className="
//                               relative
//                               h-24
//                               w-24
//                               overflow-hidden
//                               rounded-full
//                               transition-all
//                               duration-500
//                               lg:h-28
//                               lg:w-28
//                             "
//                             style={{
//                               border:
//                                 `3px solid ${hexToRgba(
//                                   branding.textColor,
//                                   0.10
//                                 )}`,
//                             }}
//                           >

//                             <img
//                               src={
//                                 trainer?.profile_image ||
//                                 "https://placehold.co/400x400/png?text=Trainer"
//                               }
//                               alt={
//                                 trainer?.full_name ||
//                                 "Trainer"
//                               }
//                               onError={(
//                                 event
//                               ) => {

//                                 event.currentTarget.onerror =
//                                   null;

//                                 event.currentTarget.src =
//                                   "https://placehold.co/400x400/png?text=Trainer";

//                               }}
//                               className="
//                                 h-full
//                                 w-full
//                                 object-cover
//                                 transition-transform
//                                 duration-700
//                                 group-hover:scale-110
//                               "
//                               loading="lazy"
//                             />

//                           </div>


//                           {/* EXPERIENCE */}

//                           <div
//                             className="
//                               absolute
//                               right-3
//                               top-3
//                             "
//                           >

//                             <span
//                               className="
//                                 rounded-md
//                                 px-2
//                                 py-0.5
//                                 text-[8px]
//                                 font-bold
//                                 uppercase
//                                 tracking-widest
//                               "
//                               style={{
//                                 backgroundColor:
//                                   hexToRgba(
//                                     branding.textColor,
//                                     0.08
//                                   ),

//                                 color:
//                                   branding.textColor,

//                                 border:
//                                   `1px solid ${hexToRgba(
//                                     branding.textColor,
//                                     0.10
//                                   )}`,

//                                 backdropFilter:
//                                   "blur(8px)",

//                                 fontFamily:
//                                   fontFamily(
//                                     branding.fontBody
//                                   ),
//                               }}
//                             >
//                               {experience} yrs
//                             </span>

//                           </div>

//                         </div>


//                         {/* =================================================
//                             SECTION 2: NAME + SKILLS
//                         ================================================= */}

//                         <div
//                           className="
//                             border-b
//                             border-t
//                             px-4
//                             py-3
//                           "
//                           style={{
//                             borderColor:
//                               hexToRgba(
//                                 branding.textColor,
//                                 0.06
//                               ),

//                             backgroundColor:
//                               hexToRgba(
//                                 branding.textColor,
//                                 0.01
//                               ),
//                           }}
//                         >

//                           <h3
//                             className="
//                               truncate
//                               text-center
//                               text-base
//                               font-black
//                               tracking-tight
//                               transition-colors
//                               duration-300
//                             "
//                             style={{
//                               color:
//                                 branding.headingColor,

//                               fontFamily:
//                                 fontFamily(
//                                   branding.fontHeading
//                                 ),

//                               fontWeight:
//                                 branding.headingWeight,

//                               lineHeight:
//                                 branding.headingLineHeight,

//                               letterSpacing:
//                                 branding.headingLetterSpacing,
//                             }}
//                           >
//                             {trainer?.full_name || "Trainer"}
//                           </h3>


//                           <div
//                             className="
//                               mt-2
//                               flex
//                               min-h-[22px]
//                               flex-wrap
//                               items-center
//                               justify-center
//                               gap-1.5
//                             "
//                           >

//                             {skills.length > 0
//                               ? skills
//                                   .slice(0, 2)
//                                   .map(
//                                     (
//                                       skill,
//                                       index
//                                     ) => (

//                                       <span
//                                         key={`${skill}-${index}`}
//                                         className="
//                                           inline-block
//                                           rounded-md
//                                           px-2
//                                           py-0.5
//                                           text-[9px]
//                                           font-semibold
//                                           uppercase
//                                           tracking-wider
//                                         "
//                                         style={{
//                                           backgroundColor:
//                                             hexToRgba(
//                                               branding.buttonColor,
//                                               0.10
//                                             ),

//                                           border:
//                                             `1px solid ${hexToRgba(
//                                               branding.buttonColor,
//                                               0.15
//                                             )}`,

//                                           color:
//                                             branding.buttonColor,

//                                           fontFamily:
//                                             fontFamily(
//                                               branding.fontBody
//                                             ),
//                                         }}
//                                       >
//                                         {String(
//                                           skill
//                                         ).trim()}
//                                       </span>

//                                     )
//                                   )
//                               : (
//                                   <span
//                                     className="
//                                       text-[10px]
//                                       font-medium
//                                       uppercase
//                                       tracking-wider
//                                     "
//                                     style={{
//                                       color:
//                                         branding.buttonColor,

//                                       fontFamily:
//                                         fontFamily(
//                                           branding.fontBody
//                                         ),
//                                     }}
//                                   >
//                                     Professional Trainer
//                                   </span>
//                                 )}

//                           </div>

//                         </div>


//                         {/* =================================================
//                             SECTION 3: DETAILS
//                         ================================================= */}

//                         <div
//                           className="
//                             flex
//                             flex-1
//                             flex-col
//                             space-y-2.5
//                             border-b
//                             px-4
//                             py-3
//                           "
//                           style={{
//                             borderColor:
//                               hexToRgba(
//                                 branding.textColor,
//                                 0.06
//                               ),
//                           }}
//                         >

//                           {/* BIO */}

//                           <p
//                             className="
//                               min-h-[34px]
//                               line-clamp-2
//                               text-xs
//                             "
//                             style={{
//                               color:
//                                 branding.textColor,

//                               fontFamily:
//                                 fontFamily(
//                                   branding.fontBody
//                                 ),

//                               fontWeight:
//                                 branding.bodyWeight,

//                               lineHeight:
//                                 branding.bodyLineHeight,

//                               letterSpacing:
//                                 branding.bodyLetterSpacing,

//                               opacity:
//                                 0.75,
//                             }}
//                           >
//                             {
//                               trainer?.bio ||
//                               "No bio available for this trainer."
//                             }
//                           </p>


//                           {/* RATING */}

//                           <div
//                             className="
//                               space-y-1
//                             "
//                           >

//                             <div
//                               className="
//                                 flex
//                                 items-center
//                                 justify-between
//                               "
//                             >

//                               <div
//                                 className="
//                                   flex
//                                   items-center
//                                   gap-0.5
//                                 "
//                               >

//                                 {[1, 2, 3, 4, 5].map(
//                                   (
//                                     star
//                                   ) => (

//                                     <FaStar
//                                       key={
//                                         star
//                                       }
//                                       className="
//                                         text-[10px]
//                                       "
//                                       style={{
//                                         color:
//                                           star <=
//                                           Math.round(
//                                             rating
//                                           )
//                                             ? branding.iconColor
//                                             : hexToRgba(
//                                                 branding.textColor,
//                                                 0.15
//                                               ),
//                                       }}
//                                     />

//                                   )
//                                 )}

//                               </div>

//                               <span
//                                 className="
//                                   text-xs
//                                   font-bold
//                                 "
//                                 style={{
//                                   color:
//                                     branding.iconColor,

//                                   fontFamily:
//                                     fontFamily(
//                                       branding.fontBody
//                                     ),
//                                 }}
//                               >
//                                 {rating.toFixed(1)}
//                               </span>

//                             </div>


//                             {/* RATING BAR */}

//                             <div
//                               className="
//                                 h-1
//                                 w-full
//                                 overflow-hidden
//                                 rounded-full
//                               "
//                               style={{
//                                 backgroundColor:
//                                   hexToRgba(
//                                     branding.textColor,
//                                     0.05
//                                   ),
//                               }}
//                             >

//                               <div
//                                 className="
//                                   h-full
//                                   rounded-full
//                                   transition-all
//                                   duration-700
//                                 "
//                                 style={{
//                                   width:
//                                     `${Math.min(
//                                       Math.max(
//                                         (rating / 5) *
//                                           100,
//                                         0
//                                       ),
//                                       100
//                                     )}%`,

//                                   background:
//                                     `linear-gradient(to right, ${branding.iconColor}, ${branding.buttonColor})`,
//                                 }}
//                               />

//                             </div>

//                           </div>


//                           {/* STUDENTS + REVIEWS */}

//                           <div
//                             className="
//                               grid
//                               grid-cols-2
//                               gap-2
//                             "
//                           >

//                             {/* STUDENTS */}

//                             <div
//                               className="
//                                 flex
//                                 items-center
//                                 justify-center
//                                 gap-1
//                                 rounded-lg
//                                 px-2.5
//                                 py-2
//                               "
//                               style={{
//                                 backgroundColor:
//                                   hexToRgba(
//                                     branding.textColor,
//                                     0.03
//                                   ),

//                                 border:
//                                   `1px solid ${hexToRgba(
//                                     branding.textColor,
//                                     0.05
//                                   )}`,
//                               }}
//                             >

//                               <FaUsers
//                                 className="
//                                   text-[10px]
//                                 "
//                                 style={{
//                                   color:
//                                     branding.buttonColor,
//                                 }}
//                               />

//                               <span
//                                 className="
//                                   text-xs
//                                   font-bold
//                                 "
//                                 style={{
//                                   color:
//                                     branding.textColor,

//                                   fontFamily:
//                                     fontFamily(
//                                       branding.fontBody
//                                     ),
//                                 }}
//                               >
//                                 {students.toLocaleString()}
//                               </span>

//                               <span
//                                 className="
//                                   text-[10px]
//                                 "
//                                 style={{
//                                   color:
//                                     branding.textColor,

//                                   opacity:
//                                     0.75,

//                                   fontFamily:
//                                     fontFamily(
//                                       branding.fontBody
//                                     ),
//                                 }}
//                               >
//                                 Students
//                               </span>

//                             </div>


//                             {/* REVIEWS */}

//                             <div
//                               className="
//                                 flex
//                                 items-center
//                                 justify-center
//                                 gap-1
//                                 rounded-lg
//                                 px-2.5
//                                 py-2
//                               "
//                               style={{
//                                 backgroundColor:
//                                   hexToRgba(
//                                     branding.textColor,
//                                     0.03
//                                   ),

//                                 border:
//                                   `1px solid ${hexToRgba(
//                                     branding.textColor,
//                                     0.05
//                                   )}`,
//                               }}
//                             >

//                               <FaComment
//                                 className="
//                                   text-[10px]
//                                 "
//                                 style={{
//                                   color:
//                                     branding.buttonColor,
//                                 }}
//                               />

//                               <span
//                                 className="
//                                   text-xs
//                                   font-bold
//                                 "
//                                 style={{
//                                   color:
//                                     branding.textColor,

//                                   fontFamily:
//                                     fontFamily(
//                                       branding.fontBody
//                                     ),
//                                 }}
//                               >
//                                 {reviews.toLocaleString()}
//                               </span>

//                               <span
//                                 className="
//                                   text-[10px]
//                                 "
//                                 style={{
//                                   color:
//                                     branding.textColor,

//                                   opacity:
//                                     0.75,

//                                   fontFamily:
//                                     fontFamily(
//                                       branding.fontBody
//                                     ),
//                                 }}
//                               >
//                                 Reviews
//                               </span>

//                             </div>

//                           </div>

//                         </div>


//                         {/* =================================================
//                             SECTION 4: CTA
//                         ================================================= */}

//                         <div
//                           className="
//                             mt-auto
//                             px-4
//                             py-3
//                           "
//                         >

//                           <Button
//                             branding={
//                               branding
//                             }
//                             variant="outline"
//                             fullWidth
//                             size="sm"
//                             onClick={() => {

//                               if (!trainerId) {

//                                 console.error(
//                                   "Trainer ID is missing.",
//                                   trainer
//                                 );

//                                 return;
//                               }

//                               navigate(
//                                 `/institute/website/preview/trainers/${trainerId}`
//                               );

//                             }}
//                           >

//                             <span
//                               className="
//                                 flex
//                                 items-center
//                                 justify-center
//                                 gap-2
//                               "
//                             >
//                               View Profile

//                               <FaArrowRight
//                                 className="
//                                   text-[10px]
//                                 "
//                               />
//                             </span>

//                           </Button>

//                         </div>

//                       </Card>

//                     </div>
//                   );
//                 }
//               )}

//             </div>


//             {/* =================================================
//                 TRAINER CAROUSEL CONTROLS
//             ================================================= */}

//             {filteredTrainers.length > 4 && (
//               <div
//                 className="
//                   mt-6
//                   flex
//                   flex-col
//                   gap-4
//                   border-t
//                   pt-5
//                   sm:flex-row
//                   sm:items-center
//                   sm:justify-between
//                 "
//                 style={{
//                   borderColor:
//                     hexToRgba(
//                       branding.textColor,
//                       0.08
//                     ),
//                 }}
//               >

//                 {/* RESULT COUNT */}

//                 <p
//                   className="
//                     text-center
//                     text-xs
//                     sm:text-left
//                   "
//                   style={{
//                     color:
//                       branding.textColor,

//                     opacity: 0.65,

//                     fontFamily:
//                       fontFamily(
//                         branding.fontBody
//                       ),
//                   }}
//                 >
//                   Showing 1 to{" "}
//                   {Math.min(
//                     4,
//                     filteredTrainers.length
//                   )}{" "}
//                   of{" "}
//                   {filteredTrainers.length}{" "}
//                   trainers
//                 </p>


//                 {/* ARROW SECTION */}

//                 <div
//                   className="
//                     flex
//                     items-center
//                     justify-center
//                     gap-2
//                   "
//                 >

//                   {/* PREVIOUS */}

//                   <button
//                     type="button"
//                     onClick={() =>
//                       scrollTrainers("left")
//                     }
//                     aria-label="Previous trainers"
//                     className="
//                       flex
//                       h-9
//                       w-9
//                       items-center
//                       justify-center
//                       rounded-lg
//                       border
//                       transition-all
//                       duration-200
//                       hover:scale-105
//                       disabled:cursor-not-allowed
//                       disabled:opacity-40
//                     "
//                     style={{
//                       backgroundColor:
//                         branding.cardBackgroundColor,

//                       borderColor:
//                         hexToRgba(
//                           branding.textColor,
//                           0.14
//                         ),

//                       color:
//                         branding.textColor,
//                     }}
//                   >
//                     <FaChevronLeft
//                       className="text-xs"
//                     />
//                   </button>


//                   {/* CURRENT PAGE */}

//                   <span
//                     className="
//                       flex
//                       h-9
//                       min-w-9
//                       items-center
//                       justify-center
//                       rounded-lg
//                       px-3
//                       text-xs
//                       font-semibold
//                     "
//                     style={{
//                       backgroundColor:
//                         branding.buttonColor,

//                       color:
//                         branding.buttonTextColor,

//                       fontFamily:
//                         fontFamily(
//                           branding.fontBody
//                         ),

//                       boxShadow:
//                         `0 5px 15px ${hexToRgba(
//                           branding.buttonColor,
//                           0.22
//                         )}`,
//                     }}
//                   >
//                     1
//                   </span>


//                   {/* PAGE INDICATOR */}

//                   {filteredTrainers.length > 8 && (
//                     <>
//                       <span
//                         className="
//                           flex
//                           h-9
//                           min-w-9
//                           items-center
//                           justify-center
//                           rounded-lg
//                           border
//                           px-3
//                           text-xs
//                         "
//                         style={{
//                           backgroundColor:
//                             branding.cardBackgroundColor,

//                           borderColor:
//                             hexToRgba(
//                               branding.textColor,
//                               0.14
//                             ),

//                           color:
//                             branding.textColor,
//                         }}
//                       >
//                         2
//                       </span>

//                       <span
//                         className="
//                           flex
//                           h-9
//                           min-w-9
//                           items-center
//                           justify-center
//                           text-xs
//                         "
//                         style={{
//                           color:
//                             branding.textColor,
//                           opacity: 0.55,
//                         }}
//                       >
//                         ...
//                       </span>
//                     </>
//                   )}


//                   {/* NEXT */}

//                   <button
//                     type="button"
//                     onClick={() =>
//                       scrollTrainers("right")
//                     }
//                     aria-label="Next trainers"
//                     className="
//                       flex
//                       h-9
//                       w-9
//                       items-center
//                       justify-center
//                       rounded-lg
//                       border
//                       transition-all
//                       duration-200
//                       hover:scale-105
//                     "
//                     style={{
//                       backgroundColor:
//                         branding.cardBackgroundColor,

//                       borderColor:
//                         hexToRgba(
//                           branding.textColor,
//                           0.14
//                         ),

//                       color:
//                         branding.textColor,
//                     }}
//                   >
//                     <FaChevronRight
//                       className="text-xs"
//                     />
//                   </button>

//                 </div>

//               </div>
//             )}


//           </div>

//         )}

//       </section>

//     </div>
//   );
// };


// export default WebsiteTrainers







import {
  useState,
  useMemo,
  useEffect,
} from "react";

import {
  FaSearch,
  FaStar,
  FaUsers,
  FaComment,
  FaArrowRight,
  FaChevronDown,
} from "react-icons/fa";

import {
  useNavigate,
  useOutletContext,
} from "react-router-dom";


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

  if (
    visible === true ||
    visible === 1 ||
    visible === "1" ||
    visible === "true"
  ) {
    return {
      trainers: {
        visible: true,
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
  branding,
  large = false
) => {
  if (branding.roundedButtons) {
    return "9999px";
  }

  return large
    ? "12px"
    : "8px";
};


/* =========================================================
   HEX TO RGBA
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
   ARRAY HELPER
========================================================= */

const toArray = (
  value
) => {
  if (
    Array.isArray(value)
  ) {
    return value;
  }

  if (
    typeof value === "string"
  ) {
    try {
      const parsed =
        JSON.parse(value);

      if (
        Array.isArray(parsed)
      ) {
        return parsed;
      }
    } catch {
      // fallback
    }

    return value
      .split(",")
      .map(
        (item) =>
          item.trim()
      )
      .filter(Boolean);
  }

  return [];
};


/* =========================================================
   CARD
========================================================= */

const Card = ({
  children,
  className = "",
  style = {},
  ...props
}) => (
  <div
    className={className}
    style={style}
    {...props}
  >
    {children}
  </div>
);


/* =========================================================
   BUTTON
========================================================= */

const Button = ({
  children,
  variant = "solid",
  fullWidth = false,
  size = "md",
  className = "",
  type = "button",
  branding,
  style = {},
  ...props
}) => {

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const sizeClass =
    sizes[size] || sizes.md;

  const baseStyle = {
    display:
      "inline-flex",

    alignItems:
      "center",

    justifyContent:
      "center",

    width:
      fullWidth
        ? "100%"
        : undefined,

    borderRadius:
      getButtonRadius(
        branding,
        size === "lg"
      ),

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

    transition:
      "all 0.3s ease",

    cursor:
      "pointer",

    ...(variant ===
    "outline"
      ? {
          backgroundColor:
            branding.cardBackgroundColor,

          color:
            branding.buttonColor,

          border:
            `1px solid ${branding.buttonColor}`,
        }
      : {
          backgroundColor:
            branding.buttonColor,

          color:
            branding.buttonTextColor,

          border:
            `1px solid ${branding.buttonColor}`,
        }),

    ...style,
  };

  return (
    <button
      type={type}
      className={[
        "font-semibold",
        sizeClass,
        className,
      ].join(" ")}
      style={baseStyle}
      {...props}
    >
      {children}
    </button>
  );
};


/* =========================================================
   MAIN COMPONENT
========================================================= */

const WebsiteTrainers = () => {

  const outletContext =
    useOutletContext() || {};

  const navigate =
    useNavigate();

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
     SECTION VISIBILITY
  ======================================================= */

  const trainersVisible =
    sections?.trainers?.visible !==
    false;


  /* =======================================================
     DATA
  ======================================================= */

  const outletTrainers =
    outletContext?.trainers ||
    [];

  const outletBanners =
    outletContext?.banners ||
    [];


  const [
    trainers,
    setTrainers,
  ] = useState([]);


  const [
    banners,
    setBanners,
  ] = useState([]);


  const [
    loading,
    setLoading,
  ] = useState(true);


  const [
    searchQuery,
    setSearchQuery,
  ] = useState("");


  const [
    filterSpecialty,
    setFilterSpecialty,
  ] = useState("all");


  /* =======================================================
     SYNC
  ======================================================= */

  useEffect(() => {

    setTrainers(
      Array.isArray(
        outletTrainers
      )
        ? outletTrainers
        : []
    );

    setBanners(
      Array.isArray(
        outletBanners
      )
        ? outletBanners
        : []
    );

    setLoading(false);

  }, [
    outletTrainers,
    outletBanners,
  ]);


  /* =======================================================
     SKILLS
  ======================================================= */

  const getSkills = (
    trainer
  ) =>
    toArray(
      trainer?.skills
    );


  /* =======================================================
     SPECIALTIES
  ======================================================= */

  const specialties =
    useMemo(
      () => {

        const values =
          trainers.flatMap(
            (trainer) =>
              getSkills(
                trainer
              )
          );

        return [
          "all",
          ...Array.from(
            new Set(
              values
                .map(
                  (skill) =>
                    String(
                      skill
                    ).trim()
                )
                .filter(
                  Boolean
                )
            )
          ),
        ];
      },
      [
        trainers,
      ]
    );


  /* =======================================================
     FILTERED TRAINERS
  ======================================================= */

  const filteredTrainers =
    useMemo(
      () => {

        const query =
          searchQuery
            .trim()
            .toLowerCase();

        const filtered =
          trainers.filter(
            (trainer) => {

              const fullName =
                String(
                  trainer?.full_name ||
                    ""
                ).toLowerCase();

              const bio =
                String(
                  trainer?.bio ||
                    ""
                ).toLowerCase();

              const skills =
                getSkills(
                  trainer
                ).map(
                  (skill) =>
                    String(
                      skill
                    )
                      .trim()
                      .toLowerCase()
                );


              const matchesSearch =
                !query ||
                fullName.includes(
                  query
                ) ||
                bio.includes(
                  query
                ) ||
                skills.some(
                  (skill) =>
                    skill.includes(
                      query
                    )
                );


              const matchesSpecialty =
                filterSpecialty ===
                  "all" ||
                skills.includes(
                  String(
                    filterSpecialty
                  ).toLowerCase()
                );


              return (
                matchesSearch &&
                matchesSpecialty
              );
            }
          );

        // IMPORTANT:
        // Website Trainers page must display
        // all trainers with 4 trainers per row on desktop.
        return filtered;

      },
      [
        trainers,
        searchQuery,
        filterSpecialty,
      ]
    );


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


  /* =======================================================
     HIDDEN
  ======================================================= */

  if (
    !trainersVisible
  ) {
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

        <div
          className="
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
                0.20
              ),

            borderTopColor:
              branding.buttonColor,
          }}
        />

      </div>
    );
  }


  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <div
      className="
        min-h-screen
        pb-20
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

      {/* ===================================================
          BANNER
      =================================================== */}

      {banners.length >
        0 &&
        (() => {

          const trainerBanner =
            banners.find(
              (banner) => {

                const value =
                  String(
                    firstValue(
                      banner?.page,
                      banner?.page_name,
                      banner?.pageName,
                      banner?.page_type,
                      banner?.pageType,
                      banner?.section,
                      banner?.banner_type,
                      banner?.bannerType
                    ) || ""
                  ).toLowerCase();

                return (
                  value.includes(
                    "trainer"
                  ) ||
                  value.includes(
                    "teacher"
                  ) ||
                  value.includes(
                    "faculty"
                  )
                );
              }
            ) ||
            banners[0];


          const image =
            firstValue(
              trainerBanner?.image_url,
              trainerBanner?.imageUrl,
              trainerBanner?.banner_url,
              trainerBanner?.bannerUrl,
              trainerBanner?.desktop_image_url,
              trainerBanner?.desktopImageUrl,
              trainerBanner?.image,
              trainerBanner?.url
            );


          if (!image) {
            return null;
          }


          return (
            <section
              className="
                relative
                h-[430px]
                overflow-hidden
                md:h-[430px]
              "
            >

              <img
                src={image}
                alt="Trainers"
                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                  object-cover
                "
                onError={(
                  event
                ) => {

                  event.currentTarget.style.display =
                    "none";

                }}
              />

            </section>
          );

        })()}


      {/* ===================================================
          TRAINERS CONTENT
      =================================================== */}

      <section
        id="trainers"
        className="
          mx-auto
          max-w-7xl
          px-4
          pt-12
          sm:px-6
          lg:px-8
        "
      >
{/* =================================================
    DYNAMIC CONTENT
================================================= */}

<div className="mb-8 text-center">

  {/* HEADING */}
  <h1
    className="
      text-3xl
      md:text-4xl
    "
    style={headingStyle}
  >
    {content?.trainers?.heading || "Our Trainers"}
  </h1>

  {/* SUBHEADING */}
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
      {content.trainers.subheading}
    </p>
  )}

</div>


        {/* =================================================
            SEARCH / FILTER
        ================================================= */}

        <div
          className="
            mb-10
            flex
            flex-col
            gap-4
            lg:flex-row
          "
        >

          {/* SEARCH */}

          <div
            className="
              relative
              flex-1
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
                  hexToRgba(
                    branding.textColor,
                    0.45
                  ),
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
              placeholder="Search trainers..."
              className="
                h-14
                w-full
                border
                px-12
                pr-4
                outline-none
              "
              style={{
                backgroundColor:
                  branding.cardBackgroundColor,

                color:
                  branding.textColor,

                borderColor:
                  hexToRgba(
                    branding.textColor,
                    0.15
                  ),

                borderRadius:
                  "12px",

                fontFamily:
                  fontFamily(
                    branding.fontBody
                  ),
              }}
            />

          </div>


          {/* FILTER */}

          <div
            className="
              relative
              lg:w-[260px]
            "
          >

            <select
              value={
                filterSpecialty
              }
              onChange={(
                event
              ) =>
                setFilterSpecialty(
                  event.target.value
                )
              }
              className="
                h-14
                w-full
                appearance-none
                border
                px-4
                pr-10
                outline-none
                cursor-pointer
              "
              style={{
                backgroundColor:
                  branding.cardBackgroundColor,

                color:
                  branding.textColor,

                borderColor:
                  hexToRgba(
                    branding.textColor,
                    0.15
                  ),

                borderRadius:
                  "12px",

                fontFamily:
                  fontFamily(
                    branding.fontBody
                  ),
              }}
            >

              {specialties.map(
                (
                  specialty
                ) => (

                  <option
                    key={
                      specialty
                    }
                    value={
                      specialty
                    }
                  >
                    {specialty ===
                    "all"
                      ? "All Specialties"
                      : specialty}
                  </option>

                )
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
                  hexToRgba(
                    branding.textColor,
                    0.45
                  ),
              }}
            />

          </div>

        </div>


        {/* =================================================
            NO RESULTS
        ================================================= */}

        {filteredTrainers.length ===
        0 ? (

          <div
            className="
              rounded-2xl
              border
              py-20
              text-center
            "
            style={{
              backgroundColor:
                branding.cardBackgroundColor,

              borderColor:
                hexToRgba(
                  branding.textColor,
                  0.12
                ),
            }}
          >

            <h2
              className="
                text-xl
              "
              style={
                headingStyle
              }
            >
              No trainers found
            </h2>


            <p
              className="
                mt-2
              "
              style={{
                ...bodyStyle,
                opacity: 0.65,
              }}
            >
              Try another search
              term or specialty.
            </p>


            <Button
              branding={
                branding
              }
              size="md"
              className="mt-5"
              onClick={() => {

                setSearchQuery(
                  ""
                );

                setFilterSpecialty(
                  "all"
                );

              }}
            >
              Clear Filters
            </Button>

          </div>

        ) : (

          /* =================================================
             TRAINER GRID
             Show all trainers with 4 trainers per row on desktop.
          ================================================= */

          <div className="w-full">

            <div
              className="
                grid
                w-full
                grid-cols-1
                gap-6
                sm:grid-cols-2
                lg:grid-cols-4
              "
            >

              {filteredTrainers.map(
                (trainer) => {

                  const skills =
                    getSkills(
                      trainer
                    );

                  const rating =
                    Number(
                      trainer?.rating ||
                        0
                    );

                  const experience =
                    Number(
                      trainer?.experience_years ||
                        0
                    );

                  const students =
                    Number(
                      trainer?.total_students ||
                        0
                    );

                  const reviews =
                    Number(
                      trainer?.total_reviews ||
                        0
                    );

                  const trainerId =
                    trainer?.id ||
                    trainer?._id;


                  return (
                    <div
                      key={trainerId}
                      className="
                        w-full
                      "
                    >

                      <Card
                        className="
                          group
                          flex
                          h-full
                          min-h-[430px]
                          flex-col
                          overflow-hidden
                          p-0
                          transition-all
                          duration-500
                          hover:-translate-y-1
                        "
                        style={{
                          backgroundColor:
                            branding.cardBackgroundColor,

                          border:
                            `1px solid ${hexToRgba(
                              branding.textColor,
                              0.08
                            )}`,

                          borderRadius:
                            "18px",

                          boxShadow:
                            "0 10px 30px rgba(0,0,0,0.06)",
                        }}
                      >

                        {/* =================================================
                            SECTION 1: TRAINER IMAGE
                        ================================================= */}

                        <div
                          className="
                            relative
                            flex
                            items-center
                            justify-center
                            py-5
                          "
                          style={{
                            background:
                              `linear-gradient(to bottom, ${hexToRgba(
                                branding.buttonColor,
                                0.04
                              )}, transparent)`,
                          }}
                        >

                          <div
                            className="
                              absolute
                              h-28
                              w-28
                              rounded-full
                              blur-2xl
                              transition-all
                              duration-500
                              group-hover:scale-110
                            "
                            style={{
                              backgroundColor:
                                hexToRgba(
                                  branding.buttonColor,
                                  0
                                ),
                            }}
                          />

                          <div
                            className="
                              relative
                              h-24
                              w-24
                              overflow-hidden
                              rounded-full
                              transition-all
                              duration-500
                              lg:h-28
                              lg:w-28
                            "
                            style={{
                              border:
                                `3px solid ${hexToRgba(
                                  branding.textColor,
                                  0.10
                                )}`,
                            }}
                          >

                            <img
                              src={
                                trainer?.profile_image ||
                                "https://placehold.co/400x400/png?text=Trainer"
                              }
                              alt={
                                trainer?.full_name ||
                                "Trainer"
                              }
                              onError={(
                                event
                              ) => {

                                event.currentTarget.onerror =
                                  null;

                                event.currentTarget.src =
                                  "https://placehold.co/400x400/png?text=Trainer";

                              }}
                              className="
                                h-full
                                w-full
                                object-cover
                                transition-transform
                                duration-700
                                group-hover:scale-110
                              "
                              loading="lazy"
                            />

                          </div>


                          {/* EXPERIENCE */}

                          <div
                            className="
                              absolute
                              right-3
                              top-3
                            "
                          >

                            <span
                              className="
                                rounded-md
                                px-2
                                py-0.5
                                text-[8px]
                                font-bold
                                uppercase
                                tracking-widest
                              "
                              style={{
                                backgroundColor:
                                  hexToRgba(
                                    branding.textColor,
                                    0.08
                                  ),

                                color:
                                  branding.textColor,

                                border:
                                  `1px solid ${hexToRgba(
                                    branding.textColor,
                                    0.10
                                  )}`,

                                backdropFilter:
                                  "blur(8px)",

                                fontFamily:
                                  fontFamily(
                                    branding.fontBody
                                  ),
                              }}
                            >
                              {experience} yrs
                            </span>

                          </div>

                        </div>


                        {/* =================================================
                            SECTION 2: NAME + SKILLS
                        ================================================= */}

                        <div
                          className="
                            border-b
                            border-t
                            px-4
                            py-3
                          "
                          style={{
                            borderColor:
                              hexToRgba(
                                branding.textColor,
                                0.06
                              ),

                            backgroundColor:
                              hexToRgba(
                                branding.textColor,
                                0.01
                              ),
                          }}
                        >

                          <h3
                            className="
                              truncate
                              text-center
                              text-base
                              font-black
                              tracking-tight
                              transition-colors
                              duration-300
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
                            {trainer?.full_name || "Trainer"}
                          </h3>


                          <div
                            className="
                              mt-2
                              flex
                              min-h-[22px]
                              flex-wrap
                              items-center
                              justify-center
                              gap-1.5
                            "
                          >

                            {skills.length > 0
                              ? skills
                                  .slice(0, 2)
                                  .map(
                                    (
                                      skill,
                                      index
                                    ) => (

                                      <span
                                        key={`${skill}-${index}`}
                                        className="
                                          inline-block
                                          rounded-md
                                          px-2
                                          py-0.5
                                          text-[9px]
                                          font-semibold
                                          uppercase
                                          tracking-wider
                                        "
                                        style={{
                                          backgroundColor:
                                            hexToRgba(
                                              branding.buttonColor,
                                              0.10
                                            ),

                                          border:
                                            `1px solid ${hexToRgba(
                                              branding.buttonColor,
                                              0.15
                                            )}`,

                                          color:
                                            branding.buttonColor,

                                          fontFamily:
                                            fontFamily(
                                              branding.fontBody
                                            ),
                                        }}
                                      >
                                        {String(
                                          skill
                                        ).trim()}
                                      </span>

                                    )
                                  )
                              : (
                                  <span
                                    className="
                                      text-[10px]
                                      font-medium
                                      uppercase
                                      tracking-wider
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
                                    Professional Trainer
                                  </span>
                                )}

                          </div>

                        </div>


                        {/* =================================================
                            SECTION 3: DETAILS
                        ================================================= */}

                        <div
                          className="
                            flex
                            flex-1
                            flex-col
                            space-y-2.5
                            border-b
                            px-4
                            py-3
                          "
                          style={{
                            borderColor:
                              hexToRgba(
                                branding.textColor,
                                0.06
                              ),
                          }}
                        >

                          {/* BIO */}

                          <p
                            className="
                              min-h-[34px]
                              line-clamp-2
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

                              lineHeight:
                                branding.bodyLineHeight,

                              letterSpacing:
                                branding.bodyLetterSpacing,

                              opacity:
                                0.75,
                            }}
                          >
                            {
                              trainer?.bio ||
                              "No bio available for this trainer."
                            }
                          </p>


                          {/* RATING */}

                          <div
                            className="
                              space-y-1
                            "
                          >

                            <div
                              className="
                                flex
                                items-center
                                justify-between
                              "
                            >

                              <div
                                className="
                                  flex
                                  items-center
                                  gap-0.5
                                "
                              >

                                {[1, 2, 3, 4, 5].map(
                                  (
                                    star
                                  ) => (

                                    <FaStar
                                      key={
                                        star
                                      }
                                      className="
                                        text-[10px]
                                      "
                                      style={{
                                        color:
                                          star <=
                                          Math.round(
                                            rating
                                          )
                                            ? branding.iconColor
                                            : hexToRgba(
                                                branding.textColor,
                                                0.15
                                              ),
                                      }}
                                    />

                                  )
                                )}

                              </div>

                              <span
                                className="
                                  text-xs
                                  font-bold
                                "
                                style={{
                                  color:
                                    branding.iconColor,

                                  fontFamily:
                                    fontFamily(
                                      branding.fontBody
                                    ),
                                }}
                              >
                                {rating.toFixed(1)}
                              </span>

                            </div>


                            {/* RATING BAR */}

                            <div
                              className="
                                h-1
                                w-full
                                overflow-hidden
                                rounded-full
                              "
                              style={{
                                backgroundColor:
                                  hexToRgba(
                                    branding.textColor,
                                    0.05
                                  ),
                              }}
                            >

                              <div
                                className="
                                  h-full
                                  rounded-full
                                  transition-all
                                  duration-700
                                "
                                style={{
                                  width:
                                    `${Math.min(
                                      Math.max(
                                        (rating / 5) *
                                          100,
                                        0
                                      ),
                                      100
                                    )}%`,

                                  background:
                                    `linear-gradient(to right, ${branding.iconColor}, ${branding.buttonColor})`,
                                }}
                              />

                            </div>

                          </div>


                          {/* STUDENTS + REVIEWS */}

                          <div
                            className="
                              grid
                              grid-cols-2
                              gap-2
                            "
                          >

                            {/* STUDENTS */}

                            <div
                              className="
                                flex
                                items-center
                                justify-center
                                gap-1
                                rounded-lg
                                px-2.5
                                py-2
                              "
                              style={{
                                backgroundColor:
                                  hexToRgba(
                                    branding.textColor,
                                    0.03
                                  ),

                                border:
                                  `1px solid ${hexToRgba(
                                    branding.textColor,
                                    0.05
                                  )}`,
                              }}
                            >

                              <FaUsers
                                className="
                                  text-[10px]
                                "
                                style={{
                                  color:
                                    branding.buttonColor,
                                }}
                              />

                              <span
                                className="
                                  text-xs
                                  font-bold
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
                                {students.toLocaleString()}
                              </span>

                              <span
                                className="
                                  text-[10px]
                                "
                                style={{
                                  color:
                                    branding.textColor,

                                  opacity:
                                    0.75,

                                  fontFamily:
                                    fontFamily(
                                      branding.fontBody
                                    ),
                                }}
                              >
                                Students
                              </span>

                            </div>


                            {/* REVIEWS */}

                            <div
                              className="
                                flex
                                items-center
                                justify-center
                                gap-1
                                rounded-lg
                                px-2.5
                                py-2
                              "
                              style={{
                                backgroundColor:
                                  hexToRgba(
                                    branding.textColor,
                                    0.03
                                  ),

                                border:
                                  `1px solid ${hexToRgba(
                                    branding.textColor,
                                    0.05
                                  )}`,
                              }}
                            >

                              <FaComment
                                className="
                                  text-[10px]
                                "
                                style={{
                                  color:
                                    branding.buttonColor,
                                }}
                              />

                              <span
                                className="
                                  text-xs
                                  font-bold
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
                                {reviews.toLocaleString()}
                              </span>

                              <span
                                className="
                                  text-[10px]
                                "
                                style={{
                                  color:
                                    branding.textColor,

                                  opacity:
                                    0.75,

                                  fontFamily:
                                    fontFamily(
                                      branding.fontBody
                                    ),
                                }}
                              >
                                Reviews
                              </span>

                            </div>

                          </div>

                        </div>


                        {/* =================================================
                            SECTION 4: CTA
                        ================================================= */}

                        <div
                          className="
                            mt-auto
                            px-4
                            py-3
                          "
                        >

                          <Button
                            branding={
                              branding
                            }
                            variant="outline"
                            fullWidth
                            size="sm"
                            onClick={() => {

                              if (!trainerId) {

                                console.error(
                                  "Trainer ID is missing.",
                                  trainer
                                );

                                return;
                              }

                              navigate(
                                `/institute/website/preview/trainers/${trainerId}`
                              );

                            }}
                          >

                            <span
                              className="
                                flex
                                items-center
                                justify-center
                                gap-2
                              "
                            >
                              View Profile

                              <FaArrowRight
                                className="
                                  text-[10px]
                                "
                              />
                            </span>

                          </Button>

                        </div>

                      </Card>

                    </div>
                  );
                }
              )}

            </div>


          </div>

        )}

      </section>

    </div>
  );
};


export default WebsiteTrainers;