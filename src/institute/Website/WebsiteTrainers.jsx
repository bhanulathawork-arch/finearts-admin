

// import { useMemo, useEffect, useState } from "react";

// import {
//   FaSearch,
//   FaStar,
//   FaUsers,
//   FaComment,
//   FaArrowRight,
//   FaChalkboardTeacher,
//   FaBriefcase,
// } from "react-icons/fa";

// import {
//   useNavigate,
//   useOutletContext,
// } from "react-router-dom";

// /* =========================================================
//    BLACK + RADIANT BLUE THEME
// ========================================================= */

// const THEME = {
//   page: "#02050A",
//   page2: "#030914",

//   card: "#071426",
//   card2: "#050D18",

//   white: "#FFFFFF",
//   heading: "#FFFFFF",
//   text: "#FFFFFF",
//   muted: "#FFFFFF",

//   blue: "#008CFF",
//   radiant: "#38D7FF",
//   brightBlue: "#0066FF",

//   border: "rgba(0,140,255,0.35)",
//   borderStrong: "rgba(56,215,255,0.55)",

//   blueGlow: "rgba(0,140,255,0.22)",
//   radiantGlow: "rgba(56,215,255,0.14)",
// };

// /* =========================================================
//    DEFAULT CONTENT
// ========================================================= */

// const DEFAULT_CONTENT = {
//   trainers: {
//     eyebrow: "OUR TRAINERS",
//     heading: "Meet Our Trainers",
//     subheading:
//       "Search for trainers by name and discover the right mentor for your creative journey.",
//   },
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

// /* =========================================================
//    CONTENT NORMALIZER
// ========================================================= */

// const normalizeContent = (content = {}) => {
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
//    SECTION NORMALIZER
// ========================================================= */

// const normalizeSections = (sections = {}) => {
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

//   return {
//     trainers: {
//       visible: true,
//     },
//   };
// };

// /* =========================================================
//    ARRAY HELPER
// ========================================================= */

// const toArray = (value) => {
//   if (Array.isArray(value)) {
//     return value;
//   }

//   if (typeof value === "string") {
//     try {
//       const parsed = JSON.parse(value);

//       if (Array.isArray(parsed)) {
//         return parsed;
//       }
//     } catch {
//       // Ignore JSON parsing errors
//     }

//     return value
//       .split(",")
//       .map((item) => item.trim())
//       .filter(Boolean);
//   }

//   return [];
// };

// /* =========================================================
//    TRAINER SKILLS
// ========================================================= */

// const getSkills = (trainer) =>
//   toArray(trainer?.skills);

// /* =========================================================
//    BANNER HELPERS
// ========================================================= */

// const getBannerType = (banner) =>
//   String(
//     firstValue(
//       banner?.page,
//       banner?.page_name,
//       banner?.pageName,
//       banner?.page_type,
//       banner?.pageType,
//       banner?.section,
//       banner?.banner_type,
//       banner?.bannerType,
//       banner?.type
//     ) || ""
//   )
//     .trim()
//     .toLowerCase();

// /* =========================================================
//    BANNER ACTIVE STATUS
// ========================================================= */

// const isBannerActive = (banner) => {
//   const value = firstValue(
//     banner?.is_active,
//     banner?.isActive,
//     banner?.active,
//     banner?.status
//   );

//   if (
//     value === undefined ||
//     value === null ||
//     value === ""
//   ) {
//     return true;
//   }

//   if (
//     value === false ||
//     value === 0 ||
//     value === "0" ||
//     value === "false" ||
//     String(value).toLowerCase() === "inactive"
//   ) {
//     return false;
//   }

//   return true;
// };

// /* =========================================================
//    BANNER ORDER
// ========================================================= */

// const getBannerOrder = (banner) => {
//   const value = firstValue(
//     banner?.display_order,
//     banner?.displayOrder,
//     banner?.sort_order,
//     banner?.sortOrder,
//     999999
//   );

//   const number = Number(value);

//   return Number.isFinite(number)
//     ? number
//     : 999999;
// };

// /* =========================================================
//    BANNER IMAGE
// ========================================================= */

// const getBannerImage = (banner) =>
//   firstValue(
//     banner?.image_url,
//     banner?.imageUrl,
//     banner?.banner_url,
//     banner?.bannerUrl,
//     banner?.desktop_image_url,
//     banner?.desktopImageUrl,
//     banner?.image,
//     banner?.url,
//     banner?.file_url,
//     banner?.fileUrl
//   );

// /* =========================================================
//    FIND TRAINER BANNER
// ========================================================= */

// const getTrainerBanner = (banners) => {
//   if (!Array.isArray(banners) || banners.length === 0) {
//     return null;
//   }

//   const activeBanners = banners
//     .filter(isBannerActive)
//     .sort(
//       (a, b) =>
//         getBannerOrder(a) -
//         getBannerOrder(b)
//     );

//   if (activeBanners.length === 0) {
//     return null;
//   }

//   /* ---------------------------------------------
//      TRAINER BANNER
//   --------------------------------------------- */

//   const trainerBanner = activeBanners.find(
//     (banner) => {
//       const type = getBannerType(banner);

//       return (
//         type === "trainer" ||
//         type === "trainers" ||
//         type === "teacher" ||
//         type === "teachers" ||
//         type === "faculty" ||
//         type.includes("trainer") ||
//         type.includes("teacher") ||
//         type.includes("faculty")
//       );
//     }
//   );

//   if (trainerBanner) {
//     return trainerBanner;
//   }

//   /* ---------------------------------------------
//      HOME FALLBACK
//   --------------------------------------------- */

//   const homeBanner = activeBanners.find(
//     (banner) => {
//       const type = getBannerType(banner);

//       return (
//         type === "home" ||
//         type === "homepage" ||
//         type === "main"
//       );
//     }
//   );

//   if (homeBanner) {
//     return homeBanner;
//   }

//   /* ---------------------------------------------
//      FIRST ACTIVE BANNER
//   --------------------------------------------- */

//   return activeBanners[0];
// };

// /* =========================================================
//    COMPONENT
// ========================================================= */

// const WebsiteTrainers = () => {
//   const outletContext =
//     useOutletContext() || {};

//   const navigate = useNavigate();

//   /* =======================================================
//      CONTENT
//   ======================================================= */

//   const content = useMemo(
//     () =>
//       normalizeContent(
//         outletContext?.content ||
//           outletContext?.websiteContent ||
//           outletContext?.contents ||
//           {}
//       ),
//     [
//       outletContext?.content,
//       outletContext?.websiteContent,
//       outletContext?.contents,
//     ]
//   );

//   /* =======================================================
//      SECTIONS
//   ======================================================= */

//   const sections = useMemo(
//     () =>
//       normalizeSections(
//         outletContext?.sections ||
//           outletContext?.websiteSections ||
//           {}
//       ),
//     [
//       outletContext?.sections,
//       outletContext?.websiteSections,
//     ]
//   );

//   /* =======================================================
//      TRAINERS FROM WEBSITE PREVIEW
//   ======================================================= */

//   const trainersFromContext =
//     outletContext?.trainers || [];

//   /* =======================================================
//      BANNERS FROM INSTITUTE DASHBOARD

//      Dashboard
//           ↓
//      Database
//           ↓
//      Public Website API
//           ↓
//      WebsitePreview
//           ↓
//      Outlet Context
//           ↓
//      WebsiteTrainers
//   ======================================================= */

//   const bannersFromContext =
//     outletContext?.banners || [];

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

//   /* =======================================================
//      LOAD OUTLET DATA
//   ======================================================= */

//   useEffect(() => {
//     setTrainers(
//       Array.isArray(trainersFromContext)
//         ? trainersFromContext
//         : []
//     );

//     setBanners(
//       Array.isArray(bannersFromContext)
//         ? bannersFromContext
//         : []
//     );

//     setLoading(false);
//   }, [
//     trainersFromContext,
//     bannersFromContext,
//   ]);

//   /* =======================================================
//      FILTER TRAINERS
//   ======================================================= */

//   const filteredTrainers = useMemo(() => {
//     const query = searchQuery
//       .trim()
//       .toLowerCase();

//     if (!query) {
//       return trainers;
//     }

//     return trainers.filter(
//       (trainer) => {
//         const name = String(
//           trainer?.full_name ||
//             trainer?.name ||
//             ""
//         ).toLowerCase();

//         return name.includes(query);
//       }
//     );
//   }, [
//     trainers,
//     searchQuery,
//   ]);

//   /* =======================================================
//      SECTION VISIBILITY
//   ======================================================= */

//   if (
//     sections?.trainers?.visible === false
//   ) {
//     return null;
//   }

//   /* =======================================================
//      LOADING
//   ======================================================= */

//   if (loading) {
//     return (
//       <div
//         className="min-h-screen flex items-center justify-center"
//         style={{
//           background:
//             "radial-gradient(circle at 50% 40%, rgba(0,140,255,.14), transparent 35%), #02050A",
//         }}
//       >
//         <div className="text-center">

//           <div
//             className="mx-auto h-12 w-12 animate-spin rounded-full border-4"
//             style={{
//               borderColor:
//                 "rgba(0,140,255,.18)",
//               borderTopColor:
//                 THEME.radiant,
//               boxShadow:
//                 "0 0 30px rgba(0,140,255,.35)",
//             }}
//           />

//           <p
//             className="mt-5 text-sm font-medium"
//             style={{
//               color: THEME.muted,
//             }}
//           >
//             Loading trainers...
//           </p>

//         </div>
//       </div>
//     );
//   }

//   /* =======================================================
//      TRAINER BANNER
//   ======================================================= */

//   const trainerBanner =
//     getTrainerBanner(banners);

//   const bannerImage =
//     getBannerImage(trainerBanner);

//   /* =======================================================
//      PAGE
//   ======================================================= */

//   return (
//     <main
//       className="min-h-screen overflow-hidden"
//       style={{
//         background: `
//           radial-gradient(
//             circle at 10% 5%,
//             rgba(0,140,255,.16),
//             transparent 25%
//           ),
//           radial-gradient(
//             circle at 90% 20%,
//             rgba(56,215,255,.10),
//             transparent 28%
//           ),
//           radial-gradient(
//             circle at 50% 100%,
//             rgba(0,102,255,.12),
//             transparent 35%
//           ),
//           ${THEME.page}
//         `,
//         color: THEME.text,
//         fontFamily: "Inter, sans-serif",
//       }}
//     >

//       {/* ===================================================
//           RADIANT BLUE BACKGROUND GLOWS
//       =================================================== */}

//       <div
//         className="pointer-events-none fixed -left-40 top-24 -z-10 h-96 w-96 rounded-full blur-[130px]"
//         style={{
//           background:
//             "rgba(0,140,255,.13)",
//         }}
//       />

//       <div
//         className="pointer-events-none fixed -right-40 top-[40%] -z-10 h-[500px] w-[500px] rounded-full blur-[140px]"
//         style={{
//           background:
//             "rgba(56,215,255,.08)",
//         }}
//       />

//       {/* ===================================================
//           INSTITUTE DASHBOARD BANNER
//       =================================================== */}

//  {/* ===================================================
//     TRAINER PAGE BANNER
// =================================================== */}

// <section
//   className="
//     relative
//     h-[180px]
//     w-full
//     overflow-hidden
//     bg-black
//     sm:h-[220px]
//     lg:h-[260px]
//   "
//   style={{
//     background: "#000000",
//     boxShadow:
//       "0 8px 25px rgba(0,0,0,0.35)",
//   }}
// >
//   {/* PURE BLACK BACKGROUND */}

//   <div
//     className="absolute inset-0"
//     style={{
//       background: "#000000",
//     }}
//   />
// </section>
   

//       {/* ===================================================
//           TRAINERS SECTION
//       =================================================== */}

//      <section
//   id="trainers"
//   className="w-full bg-black px-4 py-14 sm:px-6 lg:px-10 lg:py-20"
// >
//   <div className="mx-auto max-w-7xl">

//     {/* =========================================================
//         HEADER
//         LEFT  = HEADING + SUBHEADING
//         RIGHT = SEARCH
//     ========================================================= */}

//    <div className="mb-3 grid grid-cols-1 items-center gap-5 lg:grid-cols-2">

//       {/* =======================================================
//           LEFT — HEADING + SUBHEADING
//       ======================================================= */}

//       <div className="text-left">

//         <h1
//           className="text-3xl font-extrabold sm:text-4xl lg:text-5xl"
//           style={{
//             color: "#FFFFFF",
//             fontWeight: 800,
//             lineHeight: 1.15,
//             textShadow:
//               "0 0 30px rgba(0,140,255,0.12)",
//           }}
//         >
//           {content.trainers.heading}
//         </h1>

//         <p
//           className="mt-4 max-w-2xl text-sm sm:text-base"
//           style={{
//             color: "#FFFFFF",
//             lineHeight: 1.7,
//           }}
//         >
//           {content.trainers.subheading}
//         </p>

//       </div>


//       {/* =======================================================
//           RIGHT — SEARCH BAR
//       ======================================================= */}

//       <div className="w-full">

//         <div
//           className="
//             relative
//             flex
//             h-16
//             w-full
//             items-center
//             overflow-hidden
//             rounded-lg
//             border
//           "
//           style={{
//             background: "#02050A",
//             color: "white",
//             borderColor:
//               "rgba(0,140,255,0.55)",
//             boxShadow:
//               "0 0 30px rgba(0,140,255,0.12)",
//           }}
//         >

//           <FaSearch
//             className="absolute left-5 text-lg"
//             style={{
//               color: "white",
//               filter:
//                 "drop-shadow(0 0 8px rgba(56,215,255,0.55))",
//             }}
//           />

//         <input
//   type="text"
//   value={searchQuery}
//   onChange={(event) =>
//     setSearchQuery(event.target.value)
//   }
//   placeholder="Search trainers..."
//   className="
//     h-full
//     w-full
//     bg-transparent
//     px-14
//     pr-5
//     text-sm
//     text-white
//     placeholder:text-white
//     outline-none
//   "
//   style={{
//     color: "#FFFFFF",
//   }}
// />

//         </div>

//       </div>

//     </div>


//     {/* =========================================================
//         NO TRAINERS
//     ========================================================= */}

//   {filteredTrainers.length === 0 ? (
//   <div
//     className="w-full bg-black py-24 text-center"
//   >
//     {/* ICON */}

//     <div
//       className="
//         mx-auto
//         flex
//         h-16
//         w-16
//         items-center
//         justify-center
//         rounded-full
//       "
//       style={{
//         background: "rgba(0,0,0,0)",
//         color: THEME.radiant,
//       }}
//     >
//       <FaChalkboardTeacher size={26} />
//     </div>

//     {/* TITLE */}

//     <h2
//       className="mt-6 text-xl font-bold"
//       style={{
//         color: "#FFFFFF",
//       }}
//     >
//       No trainers found
//     </h2>

//     {/* DESCRIPTION */}

//     <p
//       className="mt-2 text-sm"
//       style={{
//         color: "#FFFFFF",
//       }}
//     >
//       Try another trainer name.
//     </p>

//     {/* CLEAR SEARCH */}

//     <button
//       type="button"
//       onClick={() => setSearchQuery("")}
//       className="
//         mt-6
//         rounded-full
//         px-7
//         py-3
//         font-semibold
//         transition-all
//         duration-300
//         hover:scale-105
//       "
//       style={{
//         background:
//           "linear-gradient(135deg,#008CFF,#0066FF,#38D7FF)",
//         color: "#FFFFFF",
//         boxShadow:
//           "0 0 25px rgba(0,140,255,0.30)",
//       }}
//     >
//       Clear Search
//     </button>
//   </div>
// ) : (

//       /* =========================================================
//           TRAINER GRID
//           4 COLUMNS ON DESKTOP
//       ========================================================= */

//       <div
//         className="
//           grid
//           grid-cols-1
//           gap-7
//           sm:grid-cols-2
//           lg:grid-cols-4
//         "
//       >

//         {filteredTrainers.map(
//           (trainer) => {

//             /* ===================================================
//                 TRAINER DATA
//             =================================================== */

//             const trainerId =
//               trainer?.id ||
//               trainer?._id;


//             const skills =
//               getSkills(trainer);


//             const subcategory =
//               skills.length > 0
//                 ? skills[0]
//                 : trainer?.subcategory_name ||
//                   trainer?.subcategory ||
//                   "Professional Trainer";


//             const rating =
//               Number(
//                 trainer?.rating || 0
//               );


//             const experience =
//               Number(
//                 trainer?.experience_years || 0
//               );


//             const students =
//               Number(
//                 trainer?.total_students || 0
//               );


//             const reviews =
//               Number(
//                 trainer?.total_reviews || 0
//               );


//             const trainerImage =
//               trainer?.profile_image ||
//               trainer?.profileImage ||
//               trainer?.image_url ||
//               trainer?.image ||
//               "https://placehold.co/300x300/png?text=Trainer";


//             return (

//               <article
//                 key={
//                   trainerId ||
//                   trainer?.full_name
//                 }
//                 className="
//                   group
//                   flex
//                   h-full
//                   flex-col
//                   overflow-hidden
//                   rounded-lg
//                   border
//                   transition-all
//                   duration-300
//                   hover:-translate-y-2
//                 "
//                style={{
//   background: "#000000",
//   borderColor: "rgba(0,140,255,0.38)",
//   boxShadow: "0 15px 45px rgba(0,0,0,0.50)",
// }}
//               >

//                 {/* =================================================
//                     IMAGE
//                 ================================================= */}

//                 <div
//                   className="
//                     relative
//                     flex
//                     justify-center
//                     pt-6
//                   "
//                 >

//                   <div
//                     className="
//                       relative
//                       h-24
//                       w-24
//                     "
//                   >

//                     <img
//                       src={trainerImage}
//                       alt={
//                         trainer?.full_name ||
//                         "Trainer"
//                       }
//                       className="
//                         h-24
//                         w-24
//                         rounded-full
//                         border-2
//                         object-cover
//                         transition-transform
//                         duration-500
//                         group-hover:scale-105
//                       "
//                      style={{
//   background: "#000000",
//   borderColor: "rgba(0,140,255,0.22)",
// }}
//                       loading="lazy"
//                       onError={(
//                         event
//                       ) => {

//                         event.currentTarget.onerror =
//                           null;

//                         event.currentTarget.src =
//                           "https://placehold.co/300x300/png?text=Trainer";

//                       }}
//                     />


//                     {/* EXPERIENCE BADGE */}

//                     <div
//                       className="
//                         absolute
//                         -right-3
//                         top-0
//                         rounded-full
//                         px-2.5
//                         py-1
//                         text-[10px]
//                         font-bold
//                         leading-none
//                       "
//                       style={{
//                         background:
//                           "linear-gradient(135deg,#008CFF,#38D7FF)",
//                         color:
//                           "#FFFFFF",
//                         boxShadow:
//                           "0 0 15px rgba(56,215,255,0.35)",
//                       }}
//                     >
//                       {experience} yrs
//                     </div>

//                   </div>

//                 </div>


//                 {/* =================================================
//                     TRAINER NAME
//                 ================================================= */}

//                 <h2
//                   className="
//                     mt-4
//                     px-3
//                     text-center
//                     text-lg
//                     font-extrabold
//                   "
//                   style={{
//                     color:
//                       "#FFFFFF",
//                   }}
//                 >
//                   {trainer?.full_name ||
//                     trainer?.name ||
//                     "Trainer"}
//                 </h2>


//                 {/* =================================================
//                     RATING
//                 ================================================= */}

//                 <div
//                   className="
//                     mt-2
//                     flex
//                     items-center
//                     justify-center
//                     gap-1
//                   "
//                 >

//                   <div
//                     className="
//                       flex
//                       items-center
//                       gap-0.5
//                     "
//                   >

//                     {[1, 2, 3, 4, 5].map(
//                       (star) => (

//                         <FaStar
//                           key={star}
//                           size={12}
//                           style={{
//                             color:
//                               star <=
//                               Math.round(
//                                 rating
//                               )
//                                 ? "#FACC15"
//                                 : "#334155",
//                           }}
//                         />

//                       )
//                     )}

//                   </div>


//                   <span
//                     className="ml-1 text-xs font-semibold"
//                     style={{
//                       color:
//                         "#FACC15",
//                     }}
//                   >
//                     {rating.toFixed(1)}
//                   </span>

//                 </div>


//                 {/* =================================================
//                     DETAILS
//                 ================================================= */}

//                <div
//   className="
//     mx-4
//     mt-5
//     flex
//     flex-1
//     flex-col
//     rounded-2xl
//     border
//     p-4
//   "
//   style={{
//     background: "#000000",
//     borderColor: "rgba(0,140,255,0.22)",
//   }}
// >
//   {/* DESCRIPTION */}

//   <p
//     className="
//       min-h-[68px]
//       line-clamp-3
//       text-sm
//     "
//     style={{
//       color: "#FFFFFF",
//       lineHeight: 1.65,
//     }}
//   >
//     {trainer?.bio ||
//       "No description available for this trainer."}
//   </p>


//   {/* =================================================
//       SKILL TAGS
//   ================================================= */}

//   <div
//     className="
//       mt-3
//       flex
//       min-h-[28px]
//       flex-wrap
//       gap-x-4
//       gap-y-1
//     "
//   >
//     {skills.length > 0 ? (
//       skills
//         .slice(0, 3)
//         .map((skill, index) => (
//           <span
//             key={`${skill}-${index}`}
//             className="
//               text-xs
//               font-semibold
//               uppercase
//               tracking-wide
//             "
//             style={{
//               color: THEME.radiant,
//             }}
//           >
//             {skill}
//           </span>
//         ))
//     ) : (
//       <span
//         className="
//           text-xs
//           font-semibold
//           uppercase
//           tracking-wide
//         "
//         style={{
//           color: THEME.radiant,
//         }}
//       >
//         {subcategory}
//       </span>
//     )}
//   </div>


//   {/* =================================================
//       STATS
//   ================================================= */}

//   <div
//     className="
//       mt-4
//       grid
//       grid-cols-3
//       gap-2
//       border-t
//       pt-3
//     "
//     style={{
//       borderColor: "rgba(0,140,255,0.18)",
//     }}
//   >
//     {/* STUDENTS */}

//     <div className="text-center">
//       <div
//         className="text-xs font-bold"
//         style={{
//           color: "#FFFFFF",
//         }}
//       >
//         {students.toLocaleString()}
//       </div>

//       <div
//         className="mt-1 text-[9px]"
//         style={{
//           color: "#FFFFFF",
//         }}
//       >
//         Students
//       </div>
//     </div>


//     {/* REVIEWS */}

//     <div className="text-center">
//       <div
//         className="text-xs font-bold"
//         style={{
//           color: "#FFFFFF",
//         }}
//       >
//         {reviews.toLocaleString()}
//       </div>

//       <div
//         className="mt-1 text-[9px]"
//         style={{
//           color: "#FFFFFF",
//         }}
//       >
//         Reviews
//       </div>
//     </div>


//     {/* EXPERIENCE */}

//     <div className="text-center">
//       <div
//         className="text-xs font-bold"
//         style={{
//           color: "#FFFFFF",
//         }}
//       >
//         {experience} yrs
//       </div>

//       <div
//         className="mt-1 text-[9px]"
//         style={{
//           color: "#FFFFFF",
//         }}
//       >
//         Experience
//       </div>
//     </div>
//   </div>


//   {/* =================================================
//       VIEW PROFILE
//   ================================================= */}

//   <button
//     type="button"
//     onClick={() => {
//       if (!trainerId) {
//         return;
//       }

//       navigate(
//         `/institute/website/preview/trainers/${trainerId}`
//       );
//     }}
//     disabled={!trainerId}
//     className="
//       mt-4
//       flex
//       w-full
//       items-center
//       justify-center
//       gap-2
//       rounded-lg
//       py-3
//       text-sm
//       font-bold
//       transition-all
//       duration-300
//       hover:scale-[1.02]
//       disabled:cursor-not-allowed
//       disabled:opacity-40
//     "
//     style={{
//       background:
//         "linear-gradient(135deg,#008CFF 0%,#0066FF 55%,#38D7FF 100%)",
//       color: "#FFFFFF",
//       boxShadow:
//         "0 0 25px rgba(0,140,255,0.30)",
//     }}
//   >
//     View Profile

//     <FaArrowRight className="text-xs" />
//   </button>
// </div>

//               </article>

//             );

//           }
//         )}

//       </div>

//     )}

//   </div>
// </section>

//       {/* ===================================================
//           BOTTOM RADIANT LINE
//       =================================================== */}

//       <div
//         className="h-px w-full"
//         style={{
//           background: `
//             linear-gradient(
//               90deg,
//               transparent,
//               #008CFF,
//               #38D7FF,
//               #008CFF,
//               transparent
//             )
//           `,
//           boxShadow:
//             "0 0 20px rgba(56,215,255,.45)",
//         }}
//       />

//     </main>
//   );
// };

// export default WebsiteTrainers;






import { useMemo, useEffect, useState } from "react";

import {
  FaSearch,
  FaStar,
  FaUsers,
  FaComment,
  FaArrowRight,
  FaChalkboardTeacher,
  FaBriefcase,
} from "react-icons/fa";

import {
  useNavigate,
  useOutletContext,
} from "react-router-dom";

/* =========================================================
   BLACK + RADIANT BLUE THEME
========================================================= */

const THEME = {
  page: "#02050A",
  page2: "#030914",

  card: "#071426",
  card2: "#050D18",

  white: "#FFFFFF",
  heading: "#FFFFFF",
  text: "#FFFFFF",
  muted: "#FFFFFF",

  blue: "#008CFF",
  radiant: "#38D7FF",
  brightBlue: "#0066FF",

  border: "rgba(0,140,255,0.35)",
  borderStrong: "rgba(56,215,255,0.55)",

  blueGlow: "rgba(0,140,255,0.22)",
  radiantGlow: "rgba(56,215,255,0.14)",
};

/* =========================================================
   DEFAULT CONTENT
========================================================= */

const DEFAULT_CONTENT = {
  trainers: {
    eyebrow: "OUR TRAINERS",
    heading: "Meet Our Trainers",
    subheading:
      "Search for trainers by name and discover the right mentor for your creative journey.",
  },
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

/* =========================================================
   CONTENT NORMALIZER
========================================================= */

const normalizeContent = (content = {}) => {
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
   SECTION NORMALIZER
========================================================= */

const normalizeSections = (sections = {}) => {
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
   ARRAY HELPER
========================================================= */

const toArray = (value) => {
  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);

      if (Array.isArray(parsed)) {
        return parsed;
      }
    } catch {
      // Ignore JSON parsing errors
    }

    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

/* =========================================================
   TRAINER SKILLS
========================================================= */

const getSkills = (trainer) =>
  toArray(trainer?.skills);

/* =========================================================
   BANNER HELPERS
========================================================= */

const getBannerType = (banner) =>
  String(
    firstValue(
      banner?.page,
      banner?.page_name,
      banner?.pageName,
      banner?.page_type,
      banner?.pageType,
      banner?.section,
      banner?.banner_type,
      banner?.bannerType,
      banner?.type
    ) || ""
  )
    .trim()
    .toLowerCase();

/* =========================================================
   BANNER ACTIVE STATUS
========================================================= */

const isBannerActive = (banner) => {
  const value = firstValue(
    banner?.is_active,
    banner?.isActive,
    banner?.active,
    banner?.status
  );

  if (
    value === undefined ||
    value === null ||
    value === ""
  ) {
    return true;
  }

  if (
    value === false ||
    value === 0 ||
    value === "0" ||
    value === "false" ||
    String(value).toLowerCase() === "inactive"
  ) {
    return false;
  }

  return true;
};

/* =========================================================
   BANNER ORDER
========================================================= */

const getBannerOrder = (banner) => {
  const value = firstValue(
    banner?.display_order,
    banner?.displayOrder,
    banner?.sort_order,
    banner?.sortOrder,
    999999
  );

  const number = Number(value);

  return Number.isFinite(number)
    ? number
    : 999999;
};

/* =========================================================
   BANNER IMAGE
========================================================= */

const getBannerImage = (banner) =>
  firstValue(
    banner?.image_url,
    banner?.imageUrl,
    banner?.banner_url,
    banner?.bannerUrl,
    banner?.desktop_image_url,
    banner?.desktopImageUrl,
    banner?.image,
    banner?.url,
    banner?.file_url,
    banner?.fileUrl
  );

/* =========================================================
   FIND TRAINER BANNER
========================================================= */

const getTrainerBanner = (banners) => {
  if (!Array.isArray(banners) || banners.length === 0) {
    return null;
  }

  const activeBanners = banners
    .filter(isBannerActive)
    .sort(
      (a, b) =>
        getBannerOrder(a) -
        getBannerOrder(b)
    );

  if (activeBanners.length === 0) {
    return null;
  }

  /* ---------------------------------------------
     TRAINER BANNER
  --------------------------------------------- */

  const trainerBanner = activeBanners.find(
    (banner) => {
      const type = getBannerType(banner);

      return (
        type === "trainer" ||
        type === "trainers" ||
        type === "teacher" ||
        type === "teachers" ||
        type === "faculty" ||
        type.includes("trainer") ||
        type.includes("teacher") ||
        type.includes("faculty")
      );
    }
  );

  if (trainerBanner) {
    return trainerBanner;
  }

  /* ---------------------------------------------
     HOME FALLBACK
  --------------------------------------------- */

  const homeBanner = activeBanners.find(
    (banner) => {
      const type = getBannerType(banner);

      return (
        type === "home" ||
        type === "homepage" ||
        type === "main"
      );
    }
  );

  if (homeBanner) {
    return homeBanner;
  }

  /* ---------------------------------------------
     FIRST ACTIVE BANNER
  --------------------------------------------- */

  return activeBanners[0];
};

/* =========================================================
   COMPONENT
========================================================= */

const WebsiteTrainers = () => {
  const outletContext =
    useOutletContext() || {};

  const navigate = useNavigate();

  /* =======================================================
     CONTENT
  ======================================================= */

  const content = useMemo(
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

  const sections = useMemo(
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
     TRAINERS FROM WEBSITE PREVIEW
  ======================================================= */

  const trainersFromContext =
    outletContext?.trainers || [];

  /* =======================================================
     BANNERS FROM INSTITUTE DASHBOARD

     Dashboard
          ↓
     Database
          ↓
     Public Website API
          ↓
     WebsitePreview
          ↓
     Outlet Context
          ↓
     WebsiteTrainers
  ======================================================= */

  const bannersFromContext =
    outletContext?.banners || [];

  /* =======================================================
     STATE
  ======================================================= */

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

  /* =======================================================
     LOAD OUTLET DATA
  ======================================================= */

  useEffect(() => {
    setTrainers(
      Array.isArray(trainersFromContext)
        ? trainersFromContext
        : []
    );

    setBanners(
      Array.isArray(bannersFromContext)
        ? bannersFromContext
        : []
    );

    setLoading(false);
  }, [
    trainersFromContext,
    bannersFromContext,
  ]);

  /* =======================================================
     FILTER TRAINERS
  ======================================================= */

  const filteredTrainers = useMemo(() => {
    const query = searchQuery
      .trim()
      .toLowerCase();

    if (!query) {
      return trainers;
    }

    return trainers.filter(
      (trainer) => {
        const name = String(
          trainer?.full_name ||
            trainer?.name ||
            ""
        ).toLowerCase();

        return name.includes(query);
      }
    );
  }, [
    trainers,
    searchQuery,
  ]);

  /* =======================================================
     SECTION VISIBILITY
  ======================================================= */

  if (
    sections?.trainers?.visible === false
  ) {
    return null;
  }

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, rgba(0,140,255,.14), transparent 35%), #02050A",
        }}
      >
        <div className="text-center">

          <div
            className="mx-auto h-12 w-12 animate-spin rounded-full border-4"
            style={{
              borderColor:
                "rgba(0,140,255,.18)",
              borderTopColor:
                THEME.radiant,
              boxShadow:
                "0 0 30px rgba(0,140,255,.35)",
            }}
          />

          <p
            className="mt-5 text-sm font-medium"
            style={{
              color: THEME.muted,
            }}
          >
            Loading trainers...
          </p>

        </div>
      </div>
    );
  }

  /* =======================================================
     TRAINER BANNER
  ======================================================= */

  const trainerBanner =
    getTrainerBanner(banners);

  const bannerImage =
    getBannerImage(trainerBanner);

  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <main
      className="min-h-screen overflow-hidden"
      style={{
        background: `
          radial-gradient(
            circle at 10% 5%,
            rgba(0,140,255,.16),
            transparent 25%
          ),
          radial-gradient(
            circle at 90% 20%,
            rgba(56,215,255,.10),
            transparent 28%
          ),
          radial-gradient(
            circle at 50% 100%,
            rgba(0,102,255,.12),
            transparent 35%
          ),
          ${THEME.page}
        `,
        color: THEME.text,
        fontFamily: "Inter, sans-serif",
      }}
    >

      {/* ===================================================
          RADIANT BLUE BACKGROUND GLOWS
      =================================================== */}

      <div
        className="pointer-events-none fixed -left-40 top-24 -z-10 h-96 w-96 rounded-full blur-[130px]"
        style={{
          background:
            "rgba(0,140,255,.13)",
        }}
      />

      <div
        className="pointer-events-none fixed -right-40 top-[40%] -z-10 h-[500px] w-[500px] rounded-full blur-[140px]"
        style={{
          background:
            "rgba(56,215,255,.08)",
        }}
      />

      {/* ===================================================
          INSTITUTE DASHBOARD BANNER
      =================================================== */}

 {/* ===================================================
    TRAINER PAGE BANNER
=================================================== */}

<section
  aria-label="Trainer page banner"
  className="relative h-[180px] w-full overflow-hidden bg-black sm:h-[220px] lg:h-[260px]"
  style={{
    background: "#000000",
    boxShadow: "0 8px 25px rgba(0,0,0,0.35)",
  }}
>
  {bannerImage ? (
    <img
      src={
        String(bannerImage).startsWith("http://") ||
        String(bannerImage).startsWith("https://") ||
        String(bannerImage).startsWith("data:")
          ? bannerImage
          : `https://finearts-backend.onrender.com/${String(bannerImage).replace(/^\/+/, "")}`
      }
      alt={trainerBanner?.title || "Trainer page banner"}
      className="absolute inset-0 h-full w-full object-cover object-center"
      loading="eager"
      onError={(event) => {
        console.error("Trainer banner image failed to load:", event.currentTarget.src);
        event.currentTarget.style.display = "none";
      }}
    />
  ) : null}
  <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/25" />
</section>
   

      {/* ===================================================
          TRAINERS SECTION
      =================================================== */}

     <section
  id="trainers"
  className="w-full bg-black px-4 py-14 sm:px-6 lg:px-10 lg:py-20"
>
  <div className="mx-auto max-w-7xl">

    {/* =========================================================
        HEADER
        LEFT  = HEADING + SUBHEADING
        RIGHT = SEARCH
    ========================================================= */}

   <div className="mb-3 grid grid-cols-1 items-center gap-5 lg:grid-cols-2">

      {/* =======================================================
          LEFT — HEADING + SUBHEADING
      ======================================================= */}

      <div className="text-left">

        <h1
          className="text-3xl font-extrabold sm:text-4xl lg:text-5xl"
          style={{
            color: "#FFFFFF",
            fontWeight: 800,
            lineHeight: 1.15,
            textShadow:
              "0 0 30px rgba(0,140,255,0.12)",
          }}
        >
          {content.trainers.heading}
        </h1>

        <p
          className="mt-4 max-w-2xl text-sm sm:text-base"
          style={{
            color: "#FFFFFF",
            lineHeight: 1.7,
          }}
        >
          {content.trainers.subheading}
        </p>

      </div>


      {/* =======================================================
          RIGHT — SEARCH BAR
      ======================================================= */}

      <div className="w-full">

        <div
          className="
            relative
            flex
            h-16
            w-full
            items-center
            overflow-hidden
            rounded-lg
            border
          "
          style={{
            background: "#02050A",
            color: "white",
            borderColor:
              "rgba(0,140,255,0.55)",
            boxShadow:
              "0 0 30px rgba(0,140,255,0.12)",
          }}
        >

          <FaSearch
            className="absolute left-5 text-lg"
            style={{
              color: "white",
              filter:
                "drop-shadow(0 0 8px rgba(56,215,255,0.55))",
            }}
          />

        <input
  type="text"
  value={searchQuery}
  onChange={(event) =>
    setSearchQuery(event.target.value)
  }
  placeholder="Search trainers..."
  className="
    h-full
    w-full
    bg-transparent
    px-14
    pr-5
    text-sm
    text-white
    placeholder:text-white
    outline-none
  "
  style={{
    color: "#FFFFFF",
  }}
/>

        </div>

      </div>

    </div>


    {/* =========================================================
        NO TRAINERS
    ========================================================= */}

  {filteredTrainers.length === 0 ? (
  <div
    className="w-full bg-black py-24 text-center"
  >
    {/* ICON */}

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
        background: "rgba(0,0,0,0)",
        color: THEME.radiant,
      }}
    >
      <FaChalkboardTeacher size={26} />
    </div>

    {/* TITLE */}

    <h2
      className="mt-6 text-xl font-bold"
      style={{
        color: "#FFFFFF",
      }}
    >
      No trainers found
    </h2>

    {/* DESCRIPTION */}

    <p
      className="mt-2 text-sm"
      style={{
        color: "#FFFFFF",
      }}
    >
      Try another trainer name.
    </p>

    {/* CLEAR SEARCH */}

    <button
      type="button"
      onClick={() => setSearchQuery("")}
      className="
        mt-6
        rounded-full
        px-7
        py-3
        font-semibold
        transition-all
        duration-300
        hover:scale-105
      "
      style={{
        background:
          "linear-gradient(135deg,#008CFF,#0066FF,#38D7FF)",
        color: "#FFFFFF",
        boxShadow:
          "0 0 25px rgba(0,140,255,0.30)",
      }}
    >
      Clear Search
    </button>
  </div>
) : (

      /* =========================================================
          TRAINER GRID
          4 COLUMNS ON DESKTOP
      ========================================================= */

      <div
        className="
          grid
          grid-cols-1
          gap-7
          sm:grid-cols-2
          lg:grid-cols-4
        "
      >

        {filteredTrainers.map(
          (trainer) => {

            /* ===================================================
                TRAINER DATA
            =================================================== */

            const trainerId =
              trainer?.id ||
              trainer?._id;


            const skills =
              getSkills(trainer);


            const subcategory =
              skills.length > 0
                ? skills[0]
                : trainer?.subcategory_name ||
                  trainer?.subcategory ||
                  "Professional Trainer";


            const rating =
              Number(
                trainer?.rating || 0
              );


            const experience =
              Number(
                trainer?.experience_years || 0
              );


            const students =
              Number(
                trainer?.total_students || 0
              );


            const reviews =
              Number(
                trainer?.total_reviews || 0
              );


            const trainerImage =
              trainer?.profile_image ||
              trainer?.profileImage ||
              trainer?.image_url ||
              trainer?.image ||
              "https://placehold.co/300x300/png?text=Trainer";


            return (

              <article
                key={
                  trainerId ||
                  trainer?.full_name
                }
                className="
                  group
                  flex
                  h-full
                  flex-col
                  overflow-hidden
                  rounded-lg
                  border
                  transition-all
                  duration-300
                  hover:-translate-y-2
                "
               style={{
  background: "#000000",
  borderColor: "rgba(0,140,255,0.38)",
  boxShadow: "0 15px 45px rgba(0,0,0,0.50)",
}}
              >

                {/* =================================================
                    IMAGE
                ================================================= */}

                <div
                  className="
                    relative
                    flex
                    justify-center
                    pt-6
                  "
                >

                  <div
                    className="
                      relative
                      h-24
                      w-24
                    "
                  >

                    <img
                      src={trainerImage}
                      alt={
                        trainer?.full_name ||
                        "Trainer"
                      }
                      className="
                        h-24
                        w-24
                        rounded-full
                        border-2
                        object-cover
                        transition-transform
                        duration-500
                        group-hover:scale-105
                      "
                     style={{
  background: "#000000",
  borderColor: "rgba(0,140,255,0.22)",
}}
                      loading="lazy"
                      onError={(
                        event
                      ) => {

                        event.currentTarget.onerror =
                          null;

                        event.currentTarget.src =
                          "https://placehold.co/300x300/png?text=Trainer";

                      }}
                    />


                    {/* EXPERIENCE BADGE */}

                    <div
                      className="
                        absolute
                        -right-3
                        top-0
                        rounded-full
                        px-2.5
                        py-1
                        text-[10px]
                        font-bold
                        leading-none
                      "
                      style={{
                        background:
                          "linear-gradient(135deg,#008CFF,#38D7FF)",
                        color:
                          "#FFFFFF",
                        boxShadow:
                          "0 0 15px rgba(56,215,255,0.35)",
                      }}
                    >
                      {experience} yrs
                    </div>

                  </div>

                </div>


                {/* =================================================
                    TRAINER NAME
                ================================================= */}

                <h2
                  className="
                    mt-4
                    px-3
                    text-center
                    text-lg
                    font-extrabold
                  "
                  style={{
                    color:
                      "#FFFFFF",
                  }}
                >
                  {trainer?.full_name ||
                    trainer?.name ||
                    "Trainer"}
                </h2>


                {/* =================================================
                    RATING
                ================================================= */}

                <div
                  className="
                    mt-2
                    flex
                    items-center
                    justify-center
                    gap-1
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
                      (star) => (

                        <FaStar
                          key={star}
                          size={12}
                          style={{
                            color:
                              star <=
                              Math.round(
                                rating
                              )
                                ? "#FACC15"
                                : "#334155",
                          }}
                        />

                      )
                    )}

                  </div>


                  <span
                    className="ml-1 text-xs font-semibold"
                    style={{
                      color:
                        "#FACC15",
                    }}
                  >
                    {rating.toFixed(1)}
                  </span>

                </div>


                {/* =================================================
                    DETAILS
                ================================================= */}

               <div
  className="
    mx-4
    mt-5
    flex
    flex-1
    flex-col
    rounded-2xl
    border
    p-4
  "
  style={{
    background: "#000000",
    borderColor: "rgba(0,140,255,0.22)",
  }}
>
  {/* DESCRIPTION */}

  <p
    className="
      min-h-[68px]
      line-clamp-3
      text-sm
    "
    style={{
      color: "#FFFFFF",
      lineHeight: 1.65,
    }}
  >
    {trainer?.bio ||
      "No description available for this trainer."}
  </p>


  {/* =================================================
      SKILL TAGS
  ================================================= */}

  <div
    className="
      mt-3
      flex
      min-h-[28px]
      flex-wrap
      gap-x-4
      gap-y-1
    "
  >
    {skills.length > 0 ? (
      skills
        .slice(0, 3)
        .map((skill, index) => (
          <span
            key={`${skill}-${index}`}
            className="
              text-xs
              font-semibold
              uppercase
              tracking-wide
            "
            style={{
              color: THEME.radiant,
            }}
          >
            {skill}
          </span>
        ))
    ) : (
      <span
        className="
          text-xs
          font-semibold
          uppercase
          tracking-wide
        "
        style={{
          color: THEME.radiant,
        }}
      >
        {subcategory}
      </span>
    )}
  </div>


  {/* =================================================
      STATS
  ================================================= */}

  <div
    className="
      mt-4
      grid
      grid-cols-3
      gap-2
      border-t
      pt-3
    "
    style={{
      borderColor: "rgba(0,140,255,0.18)",
    }}
  >
    {/* STUDENTS */}

    <div className="text-center">
      <div
        className="text-xs font-bold"
        style={{
          color: "#FFFFFF",
        }}
      >
        {students.toLocaleString()}
      </div>

      <div
        className="mt-1 text-[9px]"
        style={{
          color: "#FFFFFF",
        }}
      >
        Students
      </div>
    </div>


    {/* REVIEWS */}

    <div className="text-center">
      <div
        className="text-xs font-bold"
        style={{
          color: "#FFFFFF",
        }}
      >
        {reviews.toLocaleString()}
      </div>

      <div
        className="mt-1 text-[9px]"
        style={{
          color: "#FFFFFF",
        }}
      >
        Reviews
      </div>
    </div>


    {/* EXPERIENCE */}

    <div className="text-center">
      <div
        className="text-xs font-bold"
        style={{
          color: "#FFFFFF",
        }}
      >
        {experience} yrs
      </div>

      <div
        className="mt-1 text-[9px]"
        style={{
          color: "#FFFFFF",
        }}
      >
        Experience
      </div>
    </div>
  </div>


  {/* =================================================
      VIEW PROFILE
  ================================================= */}

  <button
    type="button"
    onClick={() => {
      if (!trainerId) {
        return;
      }

      navigate(
        `/institute/website/preview/trainers/${trainerId}`
      );
    }}
    disabled={!trainerId}
    className="
      mt-4
      flex
      w-full
      items-center
      justify-center
      gap-2
      rounded-lg
      py-3
      text-sm
      font-bold
      transition-all
      duration-300
      hover:scale-[1.02]
      disabled:cursor-not-allowed
      disabled:opacity-40
    "
    style={{
      background:
        "linear-gradient(135deg,#008CFF 0%,#0066FF 55%,#38D7FF 100%)",
      color: "#FFFFFF",
      boxShadow:
        "0 0 25px rgba(0,140,255,0.30)",
    }}
  >
    View Profile

    <FaArrowRight className="text-xs" />
  </button>
</div>

              </article>

            );

          }
        )}

      </div>

    )}

  </div>
</section>

      {/* ===================================================
          BOTTOM RADIANT LINE
      =================================================== */}

      <div
        className="h-px w-full"
        style={{
          background: `
            linear-gradient(
              90deg,
              transparent,
              #008CFF,
              #38D7FF,
              #008CFF,
              transparent
            )
          `,
          boxShadow:
            "0 0 20px rgba(56,215,255,.45)",
        }}
      />

    </main>
  );
};

export default WebsiteTrainers;