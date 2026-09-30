
// import { useMemo, useEffect, useState } from "react";
// import { FaSearch, FaStar, FaUsers, FaComment, FaArrowRight } from "react-icons/fa";
// import { useNavigate, useOutletContext } from "react-router-dom";

// const DEFAULT_CONTENT = {
//   trainers: {
//     eyebrow: "OUR TRAINERS",
//     heading: "Find Your Perfect Trainer",
//     subheading:
//       "Search for trainers by name and discover the right mentor for your creative journey.",
//   },
// };

// const DEFAULT_SECTIONS = {
//   trainers: { visible: true },
// };

// const DEFAULT_BRANDING = {
//   buttonColor: "#1688ff",
//   buttonTextColor: "#ffffff",
//   pageBackgroundColor: "#020b16",
//   cardBackgroundColor: "#041525",
//   textColor: "#e8f3ff",
//   headingColor: "#ffffff",
//   subheadingColor: "#1688ff",
//   iconColor: "#1688ff",
//   fontHeading: "Inter",
//   fontSubheading: "Inter",
//   fontBody: "Inter",
//   headingWeight: 800,
//   headingLineHeight: 1.15,
//   headingLetterSpacing: 0,
//   subheadingWeight: 500,
//   subheadingLineHeight: 1.5,
//   bodyWeight: 400,
//   bodyLineHeight: 1.55,
//   bodyLetterSpacing: 0,
//   roundedButtons: true,
// };

// const firstValue = (...values) =>
//   values.find(
//     (value) =>
//       value !== undefined &&
//       value !== null &&
//       String(value).trim() !== ""
//   );

// const getBrandingValue = (branding, camelKey, snakeKey, fallback) => {
//   const value = branding?.[camelKey] ?? branding?.[snakeKey];
//   return value !== undefined && value !== null && value !== ""
//     ? value
//     : fallback;
// };

// const normalizeBranding = (branding = {}) => ({
//   ...DEFAULT_BRANDING,
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
//   textColor: getBrandingValue(
//     branding,
//     "textColor",
//     "text_color",
//     DEFAULT_BRANDING.textColor
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
//   iconColor: getBrandingValue(
//     branding,
//     "iconColor",
//     "icon_color",
//     DEFAULT_BRANDING.iconColor
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
// });

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
//     return { trainers: { visible: false } };
//   }

//   return { trainers: { visible: true } };
// };

// const fontFamily = (font) => (font ? `'${font}', sans-serif` : "Inter, sans-serif");

// const hexToRgba = (color, alpha) => {
//   if (typeof color !== "string") return color;
//   const hex = color.replace("#", "");
//   if (!/^[0-9A-Fa-f]{6}$/.test(hex)) return color;
//   const r = parseInt(hex.substring(0, 2), 16);
//   const g = parseInt(hex.substring(2, 4), 16);
//   const b = parseInt(hex.substring(4, 6), 16);
//   return `rgba(${r}, ${g}, ${b}, ${alpha})`;
// };

// const toArray = (value) => {
//   if (Array.isArray(value)) return value;

//   if (typeof value === "string") {
//     try {
//       const parsed = JSON.parse(value);
//       if (Array.isArray(parsed)) return parsed;
//     } catch {}

//     return value
//       .split(",")
//       .map((item) => item.trim())
//       .filter(Boolean);
//   }

//   return [];
// };

// const getSkills = (trainer) => toArray(trainer?.skills);

// const WebsiteTrainers = () => {
//   const outletContext = useOutletContext() || {};
//   const navigate = useNavigate();

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

//   const sections = useMemo(
//     () =>
//       normalizeSections(
//         outletContext?.sections ||
//           outletContext?.websiteSections ||
//           {}
//       ),
//     [outletContext?.sections, outletContext?.websiteSections]
//   );

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

//   const trainersFromContext = outletContext?.trainers || [];
//   const bannersFromContext = outletContext?.banners || [];

//   const [trainers, setTrainers] = useState([]);
//   const [banners, setBanners] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");

//   useEffect(() => {
//     setTrainers(Array.isArray(trainersFromContext) ? trainersFromContext : []);
//     setBanners(Array.isArray(bannersFromContext) ? bannersFromContext : []);
//     setLoading(false);
//   }, [trainersFromContext, bannersFromContext]);

//   const filteredTrainers = useMemo(() => {
//     const query = searchQuery.trim().toLowerCase();

//     if (!query) return trainers;

//     return trainers.filter((trainer) => {
//       const name = String(trainer?.full_name || "").toLowerCase();
//       return name.includes(query);
//     });
//   }, [trainers, searchQuery]);

//   if (sections?.trainers?.visible === false) return null;

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#020b16] flex items-center justify-center">
//         <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#1688ff]/20 border-t-[#1688ff]" />
//       </div>
//     );
//   }

//   const trainerBanner =
//     banners.find((banner) => {
//       const value = String(
//         firstValue(
//           banner?.page,
//           banner?.page_name,
//           banner?.pageName,
//           banner?.page_type,
//           banner?.pageType,
//           banner?.section,
//           banner?.banner_type,
//           banner?.bannerType
//         ) || ""
//       ).toLowerCase();

//       return (
//         value.includes("trainer") ||
//         value.includes("teacher") ||
//         value.includes("faculty")
//       );
//     }) || banners[0];

//   const bannerImage = firstValue(
//     trainerBanner?.image_url,
//     trainerBanner?.imageUrl,
//     trainerBanner?.banner_url,
//     trainerBanner?.bannerUrl,
//     trainerBanner?.desktop_image_url,
//     trainerBanner?.desktopImageUrl,
//     trainerBanner?.image,
//     trainerBanner?.url
//   );

//   return (
//     <main
//       className="min-h-screen overflow-hidden"
//       style={{
//         background: branding.pageBackgroundColor,
//         color: branding.textColor,
//         fontFamily: fontFamily(branding.fontBody),
//       }}
//     >
//       {/* Banner: image only */}
//       {bannerImage && (
//         <section className="relative h-[260px] overflow-hidden border-b border-[#1688ff]/70 sm:h-[330px] lg:h-[430px]">
//           <img
//             src={bannerImage}
//             alt="Trainers"
//             className="absolute inset-0 h-full w-full object-cover"
//             onError={(event) => {
//               event.currentTarget.style.display = "none";
//             }}
//           />
//           <div className="absolute inset-0 bg-gradient-to-r from-[#020b16]/55 via-[#020b16]/15 to-[#020b16]/45" />
//           <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(22,136,255,.20),transparent_35%)]" />
//         </section>
//       )}

//       {/* Trainers */}
//       <section
//         id="trainers"
//         className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16"
//       >
//         <div className="mb-8 text-center">
//           <div
//             className="mb-3 text-xs font-bold uppercase tracking-[0.35em]"
//             style={{ color: branding.buttonColor }}
//           >
//             {content.trainers.eyebrow}
//           </div>

//           <h1
//             className="text-3xl font-extrabold sm:text-4xl lg:text-5xl"
//             style={{
//               color: branding.headingColor,
//               fontFamily: fontFamily(branding.fontHeading),
//             }}
//           >
//             {content.trainers.heading}
//           </h1>

//           <p
//             className="mx-auto mt-3 max-w-3xl text-sm sm:text-base"
//             style={{
//               color: branding.textColor,
//               opacity: 0.78,
//               fontFamily: fontFamily(branding.fontSubheading),
//             }}
//           >
//             {content.trainers.subheading}
//           </p>
//         </div>

//         {/* Search trainer name */}
//         <div className="mx-auto mb-10 max-w-4xl">
//           <div
//             className="relative flex h-14 items-center overflow-hidden rounded-2xl border shadow-[0_0_25px_rgba(22,136,255,.15)]"
//             style={{
//               background: "rgba(4,21,37,.92)",
//               borderColor: hexToRgba(branding.buttonColor, 0.75),
//             }}
//           >
//             <FaSearch
//               className="absolute left-5 text-lg"
//               style={{ color: branding.buttonColor }}
//             />

//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(event) => setSearchQuery(event.target.value)}
//               placeholder="Search trainer name..."
//               className="h-full w-full bg-transparent px-14 pr-5 text-sm outline-none placeholder:text-slate-500"
//               style={{
//                 color: branding.textColor,
//                 fontFamily: fontFamily(branding.fontBody),
//               }}
//             />
//           </div>
//         </div>

//         {filteredTrainers.length === 0 ? (
//           <div
//             className="rounded-2xl border px-6 py-20 text-center"
//             style={{
//               background: branding.cardBackgroundColor,
//               borderColor: hexToRgba(branding.buttonColor, 0.35),
//             }}
//           >
//             <h2 className="text-xl font-bold" style={{ color: branding.headingColor }}>
//               No trainers found
//             </h2>
//             <p className="mt-2 text-sm opacity-70">
//               Try another trainer name.
//             </p>
//             <button
//               type="button"
//               onClick={() => setSearchQuery("")}
//               className="mt-5 rounded-full px-6 py-3 font-semibold text-white"
//               style={{ background: branding.buttonColor }}
//             >
//               Clear Search
//             </button>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//             {filteredTrainers.map((trainer) => {
//               const trainerId = trainer?.id || trainer?._id;
//               const skills = getSkills(trainer);
//               const subcategory =
//                 skills.length > 0
//                   ? skills[0]
//                   : trainer?.subcategory_name ||
//                     trainer?.subcategory ||
//                     "Professional Trainer";

//               const rating = Number(trainer?.rating || 0);
//               const experience = Number(trainer?.experience_years || 0);
//               const students = Number(trainer?.total_students || 0);
//               const reviews = Number(trainer?.total_reviews || 0);

//               return (
//                 <article
//                   key={trainerId || trainer?.full_name}
//                   className="group overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_35px_rgba(22,136,255,.25)]"
//                   style={{
//                     background:
//                       "linear-gradient(180deg, rgba(5,25,43,.98), rgba(2,13,24,.98))",
//                     borderColor: hexToRgba(branding.buttonColor, 0.55),
//                     boxShadow: "0 10px 35px rgba(0,0,0,.30)",
//                   }}
//                 >
//                   {/* Trainer image */}
//                   <div className="relative h-56 overflow-hidden sm:h-60">
//                     <img
//                       src={
//                         trainer?.profile_image ||
//                         "https://placehold.co/700x500/png?text=Trainer"
//                       }
//                       alt={trainer?.full_name || "Trainer"}
//                       className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
//                       loading="lazy"
//                       onError={(event) => {
//                         event.currentTarget.onerror = null;
//                         event.currentTarget.src =
//                           "https://placehold.co/700x500/png?text=Trainer";
//                       }}
//                     />

//                     <div className="absolute inset-0 bg-gradient-to-t from-[#020b16] via-transparent to-transparent" />

//                     <div
//                       className="absolute right-3 top-3 flex items-center gap-1 rounded-full border px-3 py-1.5 text-sm font-bold"
//                       style={{
//                         background: "rgba(2,11,22,.86)",
//                         borderColor: hexToRgba(branding.buttonColor, 0.5),
//                         color: "#ffffff",
//                       }}
//                     >
//                       <FaStar style={{ color: "#facc15" }} />
//                       {rating.toFixed(1)}
//                     </div>
//                   </div>

//                   {/* Trainer details */}
//                   <div className="p-5">
//                     <h2
//                       className="text-xl font-extrabold"
//                       style={{
//                         color: branding.headingColor,
//                         fontFamily: fontFamily(branding.fontHeading),
//                       }}
//                     >
//                       {trainer?.full_name || "Trainer"}
//                     </h2>

//                     <div
//                       className="mt-1 text-sm font-semibold"
//                       style={{ color: branding.buttonColor }}
//                     >
//                       {subcategory}
//                     </div>

//                     <div className="mt-5 grid grid-cols-2 gap-3">
//                       <div className="rounded-xl border border-[#1688ff]/20 bg-[#1688ff]/5 p-3">
//                         <div className="text-xs opacity-60">Experience</div>
//                         <div className="mt-1 font-bold">
//                           {experience}+ Years
//                         </div>
//                       </div>

//                       <div className="rounded-xl border border-[#1688ff]/20 bg-[#1688ff]/5 p-3">
//                         <div className="text-xs opacity-60">Students</div>
//                         <div className="mt-1 font-bold">
//                           {students.toLocaleString()}
//                         </div>
//                       </div>
//                     </div>

//                     <p
//                       className="mt-5 min-h-[72px] line-clamp-3 text-sm"
//                       style={{
//                         color: branding.textColor,
//                         opacity: 0.78,
//                         lineHeight: branding.bodyLineHeight,
//                       }}
//                     >
//                       {trainer?.bio || "No description available for this trainer."}
//                     </p>

//                     <div className="mt-5 flex items-center justify-between gap-3">
//                       <div className="flex items-center gap-2 text-sm">
//                         <FaComment style={{ color: branding.buttonColor }} />
//                         <span className="font-semibold">
//                           {reviews.toLocaleString()}
//                         </span>
//                         <span className="opacity-60">Reviews</span>
//                       </div>

//                       <button
//                         type="button"
//                         onClick={() => {
//                           if (!trainerId) return;
//                           navigate(
//                             `/institute/website/preview/trainers/${trainerId}`
//                           );
//                         }}
//                         className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-white transition-transform hover:scale-[1.03]"
//                         style={{
//                           background:
//                             "linear-gradient(135deg, #1688ff 0%, #0066ff 100%)",
//                           boxShadow: "0 0 22px rgba(22,136,255,.25)",
//                         }}
//                       >
//                         View Profile
//                         <FaArrowRight className="text-xs" />
//                       </button>
//                     </div>
//                   </div>
//                 </article>
//               );
//             })}
//           </div>
//         )}
//       </section>
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
  heading: "#F8FAFC",
  text: "#CBD5E1",
  muted: "#94A3B8",

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

      {bannerImage && (
        <section
          className="relative h-[250px] overflow-hidden border-b sm:h-[330px] lg:h-[430px]"
          style={{
            borderColor:
              THEME.borderStrong,
            boxShadow:
              "0 15px 60px rgba(0,140,255,.12)",
          }}
        >

          {/* IMAGE */}

          <img
            src={bannerImage}
            alt="Our Trainers"
            className="absolute inset-0 h-full w-full object-cover"
            onError={(event) => {
              event.currentTarget.style.display =
                "none";
            }}
          />

          {/* DARK OVERLAY */}

          <div
            className="absolute inset-0"
            style={{
              background: `
                linear-gradient(
                  90deg,
                  rgba(1,5,12,.90),
                  rgba(2,8,18,.35),
                  rgba(1,5,12,.82)
                )
              `,
            }}
          />

          {/* RADIANT BLUE OVERLAY */}

          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(
                  circle at 75% 25%,
                  rgba(0,140,255,.30),
                  transparent 38%
                ),
                radial-gradient(
                  circle at 20% 70%,
                  rgba(56,215,255,.12),
                  transparent 35%
                )
              `,
            }}
          />

          {/* BOTTOM FADE */}

          <div
            className="absolute inset-x-0 bottom-0 h-40"
            style={{
              background:
                "linear-gradient(to top,#02050A,transparent)",
            }}
          />

          {/* BANNER LABEL */}

          <div className="absolute bottom-8 left-1/2 w-full max-w-7xl -translate-x-1/2 px-4 sm:px-6 lg:px-8">

            <div
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] backdrop-blur-md"
              style={{
                color: THEME.radiant,
                background:
                  "rgba(2,5,10,.75)",
                borderColor:
                  "rgba(56,215,255,.45)",
                boxShadow:
                  "0 0 30px rgba(0,140,255,.20)",
              }}
            >
              <FaChalkboardTeacher />

              Our Trainers
            </div>

          </div>

        </section>
      )}

      {/* ===================================================
          TRAINERS SECTION
      =================================================== */}

      <section
        id="trainers"
        className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20"
      >

        {/* =================================================
            HEADING
        ================================================= */}

        <div className="mb-10 text-center">

          {/* EYEBROW */}

          <div
            className="mb-4 text-xs font-bold uppercase tracking-[0.35em]"
            style={{
              color: THEME.radiant,
              textShadow:
                "0 0 15px rgba(56,215,255,.45)",
            }}
          >
            {content.trainers.eyebrow}
          </div>

          {/* HEADING */}

          <h1
            className="text-3xl font-extrabold sm:text-4xl lg:text-5xl"
            style={{
              color: THEME.heading,
              fontWeight: 800,
              lineHeight: 1.15,
              textShadow:
                "0 0 30px rgba(0,140,255,.12)",
            }}
          >
            {content.trainers.heading}
          </h1>

          {/* SUBHEADING */}

          <p
            className="mx-auto mt-4 max-w-3xl text-sm sm:text-base"
            style={{
              color: THEME.text,
              lineHeight: 1.7,
            }}
          >
            {content.trainers.subheading}
          </p>

        </div>

        {/* =================================================
            SEARCH
        ================================================= */}

        <div className="mx-auto mb-12 max-w-4xl">

          <div
            className="relative flex h-16 items-center overflow-hidden rounded-2xl border"
            style={{
              background: `
                linear-gradient(
                  145deg,
                  rgba(7,20,38,.98),
                  rgba(2,8,18,.98)
                )
              `,
              borderColor:
                "rgba(0,140,255,.55)",
              boxShadow: `
                0 0 30px rgba(0,140,255,.12),
                inset 0 0 20px rgba(0,140,255,.025)
              `,
            }}
          >

            <FaSearch
              className="absolute left-5 text-lg"
              style={{
                color: THEME.radiant,
                filter:
                  "drop-shadow(0 0 8px rgba(56,215,255,.55))",
              }}
            />

            <input
              type="text"
              value={searchQuery}
              onChange={(event) =>
                setSearchQuery(
                  event.target.value
                )
              }
              placeholder="Search trainer name..."
              className="h-full w-full bg-transparent px-14 pr-5 text-sm outline-none"
              style={{
                color: THEME.white,
              }}
            />

          </div>

        </div>

        {/* =================================================
            NO TRAINERS
        ================================================= */}

        {filteredTrainers.length === 0 ? (

          <div
            className="rounded-3xl border px-6 py-20 text-center"
            style={{
              background: `
                linear-gradient(
                  145deg,
                  rgba(7,20,38,.98),
                  rgba(2,8,18,.98)
                )
              `,
              borderColor:
                "rgba(0,140,255,.30)",
              boxShadow:
                "0 0 50px rgba(0,140,255,.07)",
            }}
          >

            <div
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-full"
              style={{
                background:
                  "rgba(0,140,255,.10)",
                color: THEME.radiant,
                boxShadow:
                  "0 0 30px rgba(0,140,255,.18)",
              }}
            >
              <FaChalkboardTeacher size={26} />
            </div>

            <h2
              className="mt-6 text-xl font-bold"
              style={{
                color: THEME.heading,
              }}
            >
              No trainers found
            </h2>

            <p
              className="mt-2 text-sm"
              style={{
                color: THEME.text,
              }}
            >
              Try another trainer name.
            </p>

            <button
              type="button"
              onClick={() =>
                setSearchQuery("")
              }
              className="mt-6 rounded-full px-7 py-3 font-semibold transition-all duration-300 hover:scale-105"
              style={{
                background: `
                  linear-gradient(
                    135deg,
                    #008CFF,
                    #0066FF,
                    #38D7FF
                  )
                `,
                color: "#FFFFFF",
                boxShadow:
                  "0 0 25px rgba(0,140,255,.30)",
              }}
            >
              Clear Search
            </button>

          </div>

        ) : (

          /* =================================================
             TRAINER GRID
          ================================================= */

          <div
            className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3"
          >

            {filteredTrainers.map(
              (trainer) => {

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

                const trainerImage =
                  trainer?.profile_image ||
                  trainer?.profileImage ||
                  trainer?.image_url ||
                  trainer?.image ||
                  "https://placehold.co/700x500/png?text=Trainer";

                return (

                  <article
                    key={
                      trainerId ||
                      trainer?.full_name
                    }
                    className="group overflow-hidden rounded-3xl border transition-all duration-300 hover:-translate-y-2"
                    style={{
                      background: `
                        linear-gradient(
                          180deg,
                          rgba(7,20,38,.98),
                          rgba(2,8,18,.98)
                        )
                      `,
                      borderColor:
                        "rgba(0,140,255,.38)",
                      boxShadow:
                        "0 15px 45px rgba(0,0,0,.40)",
                    }}
                  >

                    {/* =================================================
                        IMAGE
                    ================================================= */}

                    <div
                      className="relative h-60 overflow-hidden"
                    >

                      <img
                        src={trainerImage}
                        alt={
                          trainer?.full_name ||
                          "Trainer"
                        }
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                        onError={(event) => {
                          event.currentTarget.onerror =
                            null;

                          event.currentTarget.src =
                            "https://placehold.co/700x500/png?text=Trainer";
                        }}
                      />

                      {/* DARK IMAGE OVERLAY */}

                      <div
                        className="absolute inset-0"
                        style={{
                          background: `
                            linear-gradient(
                              to top,
                              rgba(2,5,10,.98),
                              rgba(2,5,10,.10) 70%
                            )
                          `,
                        }}
                      />

                      {/* BLUE GLOW */}

                      <div
                        className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full blur-3xl"
                        style={{
                          background:
                            "rgba(0,140,255,.25)",
                        }}
                      />

                      {/* RATING */}

                      <div
                        className="absolute right-4 top-4 flex items-center gap-1 rounded-full border px-3 py-2 text-sm font-bold backdrop-blur-md"
                        style={{
                          background:
                            "rgba(2,5,10,.86)",
                          borderColor:
                            "rgba(56,215,255,.40)",
                          color: "#FFFFFF",
                          boxShadow:
                            "0 0 18px rgba(0,140,255,.15)",
                        }}
                      >
                        <FaStar
                          style={{
                            color:
                              "#FACC15",
                          }}
                        />

                        {rating.toFixed(1)}
                      </div>

                      {/* TRAINER BADGE */}

                      <div
                        className="absolute bottom-4 left-4 rounded-full border px-3 py-1.5 text-xs font-bold backdrop-blur-md"
                        style={{
                          background:
                            "rgba(2,5,10,.80)",
                          borderColor:
                            "rgba(0,140,255,.45)",
                          color:
                            THEME.radiant,
                        }}
                      >
                        TRAINER
                      </div>

                    </div>

                    {/* =================================================
                        DETAILS
                    ================================================= */}

                    <div className="p-5">

                      {/* NAME */}

                      <h2
                        className="text-xl font-extrabold"
                        style={{
                          color:
                            THEME.heading,
                        }}
                      >
                        {trainer?.full_name ||
                          trainer?.name ||
                          "Trainer"}
                      </h2>

                      {/* SPECIALIZATION */}

                      <div
                        className="mt-1 text-sm font-semibold"
                        style={{
                          color:
                            THEME.radiant,
                        }}
                      >
                        {subcategory}
                      </div>

                      {/* =================================================
                          STATS
                      ================================================= */}

                      <div className="mt-5 grid grid-cols-2 gap-3">

                        {/* EXPERIENCE */}

                        <div
                          className="rounded-xl border p-3"
                          style={{
                            background:
                              "rgba(0,140,255,.05)",
                            borderColor:
                              "rgba(0,140,255,.18)",
                          }}
                        >

                          <div
                            className="flex items-center gap-2 text-xs"
                            style={{
                              color:
                                THEME.muted,
                            }}
                          >
                            <FaBriefcase
                              style={{
                                color:
                                  THEME.radiant,
                              }}
                            />

                            Experience
                          </div>

                          <div
                            className="mt-2 font-bold"
                            style={{
                              color:
                                "#FFFFFF",
                            }}
                          >
                            {experience}+
                            Years
                          </div>

                        </div>

                        {/* STUDENTS */}

                        <div
                          className="rounded-xl border p-3"
                          style={{
                            background:
                              "rgba(0,140,255,.05)",
                            borderColor:
                              "rgba(0,140,255,.18)",
                          }}
                        >

                          <div
                            className="flex items-center gap-2 text-xs"
                            style={{
                              color:
                                THEME.muted,
                            }}
                          >
                            <FaUsers
                              style={{
                                color:
                                  THEME.radiant,
                              }}
                            />

                            Students
                          </div>

                          <div
                            className="mt-2 font-bold"
                            style={{
                              color:
                                "#FFFFFF",
                            }}
                          >
                            {students.toLocaleString()}
                          </div>

                        </div>

                      </div>

                      {/* =================================================
                          BIO
                      ================================================= */}

                      <p
                        className="mt-5 min-h-[72px] line-clamp-3 text-sm"
                        style={{
                          color:
                            THEME.text,
                          lineHeight: 1.65,
                        }}
                      >
                        {trainer?.bio ||
                          "No description available for this trainer."}
                      </p>

                      {/* =================================================
                          FOOTER
                      ================================================= */}

                      <div className="mt-5 flex items-center justify-between gap-3">

                        {/* REVIEWS */}

                        <div
                          className="flex items-center gap-2 text-sm"
                        >
                          <FaComment
                            style={{
                              color:
                                THEME.radiant,
                            }}
                          />

                          <span
                            className="font-semibold"
                            style={{
                              color:
                                "#FFFFFF",
                            }}
                          >
                            {reviews.toLocaleString()}
                          </span>

                          <span
                            style={{
                              color:
                                "#64748B",
                            }}
                          >
                            Reviews
                          </span>
                        </div>

                        {/* VIEW PROFILE */}

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
                          className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition-all duration-300 hover:scale-[1.04] disabled:cursor-not-allowed disabled:opacity-40"
                          style={{
                            background: `
                              linear-gradient(
                                135deg,
                                #008CFF 0%,
                                #0066FF 55%,
                                #38D7FF 100%
                              )
                            `,
                            color:
                              "#FFFFFF",
                            boxShadow:
                              "0 0 25px rgba(0,140,255,.30)",
                          }}
                        >
                          View Profile

                          <FaArrowRight className="text-xs" />
                        </button>

                      </div>

                    </div>

                  </article>
                );
              }
            )}

          </div>
        )}

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