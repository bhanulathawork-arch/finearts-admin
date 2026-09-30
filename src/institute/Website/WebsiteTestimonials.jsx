
// import React, { useEffect, useMemo, useState } from "react";
// import { useOutletContext } from "react-router-dom";
// import {
//   Search,
//   Play,
//   Image as ImageIcon,
//   Video,
//   Star,
//   Quote,
//   X,
//   ArrowRight,
// } from "lucide-react";

// import {
//   getInstituteTestimonials,
// } from "../../services/testimonialService";

// /*
// =========================================================
// WEBSITE TESTIMONIALS
// =========================================================

// Complete rewrite of the testimonial page.

// PAGE FLOW
// ---------
// 1. Banner / Hero
// 2. Search bar
// 3. Three filters:
//    - All
//    - Image
//    - Video
// 4. One testimonial grid
// 5. Image testimonial cards
// 6. Video testimonial cards
// 7. Video popup

// FILTER BEHAVIOUR
// ----------------
// ALL:
//   Shows image + video testimonials together.

// IMAGE:
//   Shows ONLY testimonials that contain an image testimonial.

// VIDEO:
//   Shows ONLY testimonials that contain a video.

// SEARCH:
//   Searches name, text and subcategory.

// API:
//   Uses the existing getInstituteTestimonials() service.
//   The API is called once and the returned data is filtered
//   on the page so switching tabs is instant.
// =========================================================
// */

// /* ========================================================
//    DEFAULT BRANDING
// ======================================================== */

// const DEFAULT_BRANDING = {
//   pageBackgroundColor: "#050B16",
//   cardBackgroundColor: "#0B1424",
//   cardSecondaryColor: "#0F1C30",

//   headingColor: "#F8FAFC",
//   subheadingColor: "#60A5FA",
//   textColor: "#CBD5E1",
//   mutedColor: "#64748B",

//   primaryColor: "#2563EB",
//   secondaryColor: "#38BDF8",
//   borderColor: "#2563EB",

//   buttonTextColor: "#FFFFFF",

//   navbarColor: "#050B16",
//   footerBackgroundColor: "#050B16",

//   fontHeading: "Inter",
//   fontSubheading: "Inter",
//   fontBody: "Inter",

//   headingWeight: 700,
//   headingLineHeight: 1.15,
//   bodyWeight: 400,
//   bodyLineHeight: 1.6,
// };

// /* ========================================================
//    DEFAULT CONTENT
// ======================================================== */

// const DEFAULT_CONTENT = {
//   eyebrow: "TESTIMONIALS",
//   heading: "What Our Students Say",
//   subheading:
//     "Real experiences from learners who turned their passion into progress.",

//   searchPlaceholder:
//     "Search by name, testimonial or subcategory...",

//   all: "All",
//   image: "Image",
//   video: "Video",

//   sectionHeading: "Student Experiences",
//   sectionSubheading:
//     "Explore real stories, feedback and learning experiences from our students.",

//   emptyAll: "No testimonials found.",
//   emptyImage: "No image testimonials found.",
//   emptyVideo: "No video testimonials found.",

//   watchVideo: "Watch Testimonial",
// };

// /* ========================================================
//    GENERIC HELPERS
// ======================================================== */

// const getValue = (...values) => {
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

// const normalizeBranding = (branding = {}) => ({
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

//   cardSecondaryColor: getBrandingValue(
//     branding,
//     "cardSecondaryColor",
//     "card_secondary_color",
//     DEFAULT_BRANDING.cardSecondaryColor
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

//   mutedColor: getBrandingValue(
//     branding,
//     "mutedColor",
//     "muted_color",
//     DEFAULT_BRANDING.mutedColor
//   ),

//   primaryColor: getBrandingValue(
//     branding,
//     "primaryColor",
//     "primary_color",
//     DEFAULT_BRANDING.primaryColor
//   ),

//   secondaryColor: getBrandingValue(
//     branding,
//     "secondaryColor",
//     "secondary_color",
//     DEFAULT_BRANDING.secondaryColor
//   ),

//   borderColor: getBrandingValue(
//     branding,
//     "borderColor",
//     "border_color",
//     DEFAULT_BRANDING.borderColor
//   ),

//   buttonTextColor: getBrandingValue(
//     branding,
//     "buttonTextColor",
//     "button_text_color",
//     DEFAULT_BRANDING.buttonTextColor
//   ),

//   navbarColor: getBrandingValue(
//     branding,
//     "navbarColor",
//     "navbar_color",
//     DEFAULT_BRANDING.navbarColor
//   ),

//   footerBackgroundColor: getBrandingValue(
//     branding,
//     "footerBackgroundColor",
//     "footer_background_color",
//     DEFAULT_BRANDING.footerBackgroundColor
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
// });

// const fontFamily = (font) =>
//   font ? `'${font}', sans-serif` : "Inter, sans-serif";

// const hexToRgba = (color, alpha) => {
//   if (typeof color !== "string") return color;

//   const hex = color.replace("#", "");

//   if (!/^[0-9A-Fa-f]{6}$/.test(hex)) {
//     return color;
//   }

//   const r = parseInt(hex.substring(0, 2), 16);
//   const g = parseInt(hex.substring(2, 4), 16);
//   const b = parseInt(hex.substring(4, 6), 16);

//   return `rgba(${r}, ${g}, ${b}, ${alpha})`;
// };

// /* ========================================================
//    CONTENT NORMALIZER
// ======================================================== */

// const normalizeContent = (content = {}) => {
//   const source =
//     content?.testimonials ||
//     content?.testimonial ||
//     content?.Testimonials ||
//     content ||
//     {};

//   return {
//     eyebrow: getValue(
//       source?.eyebrow,
//       source?.eyebrow_text,
//       source?.label,
//       DEFAULT_CONTENT.eyebrow
//     ),

//     heading: getValue(
//       source?.heading,
//       source?.title,
//       source?.page_heading,
//       DEFAULT_CONTENT.heading
//     ),

//     subheading: getValue(
//       source?.subheading,
//       source?.subtitle,
//       source?.page_subheading,
//       DEFAULT_CONTENT.subheading
//     ),

//     searchPlaceholder: getValue(
//       source?.searchPlaceholder,
//       source?.search_placeholder,
//       DEFAULT_CONTENT.searchPlaceholder
//     ),

//     all: getValue(
//       source?.filters?.all,
//       source?.filter_all,
//       DEFAULT_CONTENT.all
//     ),

//     image: getValue(
//       source?.filters?.image,
//       source?.filters?.text,
//       source?.filter_image,
//       source?.filter_text,
//       DEFAULT_CONTENT.image
//     ),

//     video: getValue(
//       source?.filters?.video,
//       source?.filter_video,
//       DEFAULT_CONTENT.video
//     ),

//     sectionHeading: getValue(
//       source?.sectionHeading,
//       source?.section_heading,
//       DEFAULT_CONTENT.sectionHeading
//     ),

//     sectionSubheading: getValue(
//       source?.sectionSubheading,
//       source?.section_subheading,
//       DEFAULT_CONTENT.sectionSubheading
//     ),
//   };
// };

// /* ========================================================
//    BANNER HELPERS
// ======================================================== */

// const isActiveBanner = (banner) => {
//   const value =
//     banner?.is_active ??
//     banner?.isActive;

//   if (value === undefined || value === null) {
//     return true;
//   }

//   return (
//     value === true ||
//     value === 1 ||
//     value === "1" ||
//     value === "true" ||
//     String(value).toUpperCase() === "ACTIVE"
//   );
// };

// const getBannerImage = (banner) =>
//   banner?.image_url ||
//   banner?.imageUrl ||
//   banner?.image ||
//   banner?.banner_image ||
//   banner?.bannerImage ||
//   null;

// /* ========================================================
//    TESTIMONIAL FIELD HELPERS
// ======================================================== */

// const getId = (testimonial, index) =>
//   testimonial?.id ??
//   testimonial?._id ??
//   testimonial?.testimonial_id ??
//   `testimonial-${index}`;

// const getStudentName = (testimonial) =>
//   getValue(
//     testimonial?.student_name,
//     testimonial?.studentName,
//     testimonial?.name,
//     testimonial?.student?.name,
//     "Student"
//   );

// const getSubcategory = (testimonial) =>
//   getValue(
//     testimonial?.subcategory,
//     testimonial?.sub_category,
//     testimonial?.subcategory_name,
//     testimonial?.subcategoryName,
//     testimonial?.subCategory,
//     testimonial?.student?.subcategory,
//     testimonial?.course_subcategory,
//     testimonial?.category_name,
//     "Student"
//   );

// const getTestimonialText = (testimonial) =>
//   getValue(
//     testimonial?.testimonial_text,
//     testimonial?.testimonialText,
//     testimonial?.text,
//     testimonial?.review,
//     testimonial?.comment,
//     testimonial?.message,
//     ""
//   );

// const getAvatar = (testimonial) =>
//   getValue(
//     testimonial?.avatar,
//     testimonial?.avatar_url,
//     testimonial?.avatarUrl,
//     testimonial?.student_avatar,
//     testimonial?.studentAvatar,
//     testimonial?.student_image,
//     testimonial?.studentImage,
//     testimonial?.profile_image,
//     testimonial?.profileImage,
//     testimonial?.student?.avatar,
//     testimonial?.student?.image,
//     null
//   );

// const getImageUrl = (testimonial) =>
//   getValue(
//     testimonial?.image_url,
//     testimonial?.imageUrl,
//     testimonial?.image,
//     testimonial?.testimonial_image,
//     testimonial?.testimonialImage,
//     testimonial?.photo,
//     testimonial?.photo_url,
//     null
//   );

// const getVideoUrl = (testimonial) =>
//   getValue(
//     testimonial?.video_url,
//     testimonial?.videoUrl,
//     testimonial?.video,
//     testimonial?.video_file,
//     testimonial?.videoFile,
//     testimonial?.video_path,
//     null
//   );

// const getVideoThumbnail = (testimonial) =>
//   getValue(
//     testimonial?.video_thumbnail,
//     testimonial?.videoThumbnail,
//     testimonial?.thumbnail,
//     testimonial?.thumbnail_url,
//     testimonial?.thumbnailUrl,
//     getImageUrl(testimonial),
//     getAvatar(testimonial),
//     null
//   );

// const getRating = (testimonial) => {
//   const value = Number(
//     testimonial?.rating ??
//     testimonial?.stars ??
//     5
//   );

//   if (Number.isNaN(value)) return 5;

//   return Math.min(5, Math.max(0, Math.round(value)));
// };

// /*
//   IMPORTANT:
//   An image testimonial is identified by an image URL.
//   A video testimonial is identified by a video URL.

//   If an API record has both image and video, video takes
//   priority for the video filter, while All will still show
//   it once as a video testimonial.
// */
// const normalizeTestimonials = (list = []) =>
//   list
//     .filter(Boolean)
//     .map((testimonial, index) => {
//       const image = getImageUrl(testimonial);
//       const video = getVideoUrl(testimonial);

//       const type = video
//         ? "video"
//         : image
//           ? "image"
//           : "image";

//       return {
//         ...testimonial,
//         _id: getId(testimonial, index),
//         _type: type,
//         _name: getStudentName(testimonial),
//         _subcategory: getSubcategory(testimonial),
//         _text: getTestimonialText(testimonial),
//         _avatar: getAvatar(testimonial),
//         _image: image,
//         _video: video,
//         _thumbnail: getVideoThumbnail(testimonial),
//         _rating: getRating(testimonial),
//       };
//     });

// /* ========================================================
//    MAIN COMPONENT
// ======================================================== */

// export default function WebsiteTestimonials() {
//   const context = useOutletContext() || {};

//   const {
//     branding: outletBranding = {},
//     content: outletContent = {},
//     website = {},
//     institute = {},
//     banners = [],
//     bannersLoading = false,
//   } = context;

//   const branding = useMemo(
//     () => normalizeBranding(outletBranding),
//     [outletBranding]
//   );

//   const content = useMemo(
//     () => normalizeContent(outletContent),
//     [outletContent]
//   );

//   const [testimonials, setTestimonials] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const [activeFilter, setActiveFilter] = useState("all");
//   const [searchQuery, setSearchQuery] = useState("");

//   const [selectedVideo, setSelectedVideo] = useState(null);

//   /* ======================================================
//      FETCH ALL TESTIMONIALS
//   ====================================================== */

//   useEffect(() => {
//     let mounted = true;

//     const loadTestimonials = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         const result = await getInstituteTestimonials();

//         if (!mounted) return;

//         let list = [];

//         if (Array.isArray(result)) {
//           list = result;
//         } else if (Array.isArray(result?.data)) {
//           list = result.data;
//         } else if (Array.isArray(result?.testimonials)) {
//           list = result.testimonials;
//         } else if (
//           Array.isArray(result?.data?.testimonials)
//         ) {
//           list = result.data.testimonials;
//         }

//         setTestimonials(normalizeTestimonials(list));
//       } catch (err) {
//         console.error("Testimonials API Error:", err);

//         if (!mounted) return;

//         setTestimonials([]);

//         setError(
//           err?.response?.data?.message ||
//           err?.message ||
//           "Failed to load testimonials."
//         );
//       } finally {
//         if (mounted) {
//           setLoading(false);
//         }
//       }
//     };

//     loadTestimonials();

//     return () => {
//       mounted = false;
//     };
//   }, []);

//   /* ======================================================
//      BANNER
//   ====================================================== */

//   const testimonialBanner = useMemo(() => {
//     if (!Array.isArray(banners)) return null;

//     return (
//       banners.find((banner) => {
//         const type = String(
//           banner?.banner_type ??
//           banner?.bannerType ??
//           ""
//         )
//           .trim()
//           .toUpperCase();

//         return (
//           type === "TESTIMONIAL" &&
//           isActiveBanner(banner)
//         );
//       }) || null
//     );
//   }, [banners]);

//   const bannerImage = getBannerImage(
//     testimonialBanner
//   );

//   const instituteName =
//     institute?.name ||
//     website?.institute?.name ||
//     website?.name ||
//     "Our Institute";

//   /* ======================================================
//      FILTER + SEARCH
//   ====================================================== */

//   const filteredTestimonials = useMemo(() => {
//     const query = searchQuery
//       .trim()
//       .toLowerCase();

//     return testimonials.filter((testimonial) => {
//       const matchesType =
//         activeFilter === "all" ||
//         testimonial._type === activeFilter;

//       const searchableText = [
//         testimonial._name,
//         testimonial._subcategory,
//         testimonial._text,
//       ]
//         .filter(Boolean)
//         .join(" ")
//         .toLowerCase();

//       const matchesSearch =
//         !query ||
//         searchableText.includes(query);

//       return matchesType && matchesSearch;
//     });
//   }, [
//     testimonials,
//     activeFilter,
//     searchQuery,
//   ]);

//   /* ======================================================
//      COUNTS
//   ====================================================== */

//   const imageCount = useMemo(
//     () =>
//       testimonials.filter(
//         (item) => item._type === "image"
//       ).length,
//     [testimonials]
//   );

//   const videoCount = useMemo(
//     () =>
//       testimonials.filter(
//         (item) => item._type === "video"
//       ).length,
//     [testimonials]
//   );

//   /* ======================================================
//      STYLES
//   ====================================================== */

//   const pageStyle = {
//     backgroundColor:
//       branding.pageBackgroundColor,
//     color: branding.textColor,
//     fontFamily: fontFamily(
//       branding.fontBody
//     ),
//   };

//   const headingStyle = {
//     color: branding.headingColor,
//     fontFamily: fontFamily(
//       branding.fontHeading
//     ),
//     fontWeight: branding.headingWeight,
//     lineHeight:
//       branding.headingLineHeight,
//   };

//   /* ======================================================
//      LOADING
//   ====================================================== */

//   if (loading) {
//     return (
//       <main
//         className="flex min-h-screen items-center justify-center"
//         style={pageStyle}
//       >
//         <div className="text-center">
//           <div
//             className="mx-auto h-12 w-12 animate-spin rounded-full border-4"
//             style={{
//               borderColor: hexToRgba(
//                 branding.primaryColor,
//                 0.18
//               ),
//               borderTopColor:
//                 branding.primaryColor,
//             }}
//           />

//           <p
//             className="mt-5 text-sm"
//             style={{
//               color: branding.mutedColor,
//             }}
//           >
//             Loading testimonials...
//           </p>
//         </div>
//       </main>
//     );
//   }

//   /* ======================================================
//      ERROR
//   ====================================================== */

//   if (error) {
//     return (
//       <main
//         className="flex min-h-screen items-center justify-center px-5"
//         style={pageStyle}
//       >
//         <div
//           className="w-full max-w-lg rounded-3xl border p-10 text-center"
//           style={{
//             backgroundColor:
//               branding.cardBackgroundColor,
//             borderColor: hexToRgba(
//               branding.primaryColor,
//               0.25
//             ),
//           }}
//         >
//           <Quote
//             size={42}
//             className="mx-auto"
//             style={{
//               color: branding.primaryColor,
//             }}
//           />

//           <h1
//             className="mt-5 text-2xl"
//             style={headingStyle}
//           >
//             Unable to load testimonials
//           </h1>

//           <p
//             className="mt-3 text-sm"
//             style={{
//               color: branding.mutedColor,
//             }}
//           >
//             {error}
//           </p>
//         </div>
//       </main>
//     );
//   }

//   /* ======================================================
//      MAIN PAGE
//   ====================================================== */

//   return (
//     <main
//       className="min-h-screen overflow-hidden"
//       style={pageStyle}
//     >
//       {/* ==================================================
//           HERO / BANNER
//       ================================================== */}

//       <section className="relative overflow-hidden">
//         {/* Glow */}
//         <div
//           className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full blur-3xl"
//           style={{
//             backgroundColor: hexToRgba(
//               branding.primaryColor,
//               0.16
//             ),
//           }}
//         />

//         <div
//           className="pointer-events-none absolute -right-40 top-20 h-[450px] w-[450px] rounded-full blur-3xl"
//           style={{
//             backgroundColor: hexToRgba(
//               branding.secondaryColor,
//               0.1
//             ),
//           }}
//         />

//         <div
//           className="relative mx-auto max-w-7xl px-5 pb-12 pt-10 sm:px-8 sm:pb-16 sm:pt-14 lg:px-10"
//         >
//           {bannersLoading ? (
//             <div
//               className="h-[280px] animate-pulse rounded-3xl sm:h-[350px]"
//               style={{
//                 backgroundColor:
//                   branding.cardBackgroundColor,
//               }}
//             />
//           ) : bannerImage ? (
//             <div
//               className="relative min-h-[360px] overflow-hidden rounded-[28px] border sm:min-h-[430px]"
//               style={{
//                 borderColor: hexToRgba(
//                   branding.primaryColor,
//                   0.45
//                 ),
//                 boxShadow: `0 0 50px ${hexToRgba(
//                   branding.primaryColor,
//                   0.14
//                 )}`,
//               }}
//             >
//               <img
//                 src={bannerImage}
//                 alt={
//                   testimonialBanner?.title ||
//                   content.heading
//                 }
//                 className="absolute inset-0 h-full w-full object-cover"
//               />

//               <div
//                 className="absolute inset-0"
//                 style={{
//                   background:
//                     "linear-gradient(90deg, rgba(3,8,18,0.92) 0%, rgba(3,8,18,0.72) 42%, rgba(3,8,18,0.18) 100%)",
//                 }}
//               />

//               <div className="relative flex min-h-[360px] max-w-3xl items-center px-7 py-12 sm:min-h-[430px] sm:px-12 lg:px-16">
//                 <HeroContent
//                   content={content}
//                   instituteName={instituteName}
//                   headingStyle={headingStyle}
//                   branding={branding}
//                 />
//               </div>
//             </div>
//           ) : (
//             <div
//               className="relative overflow-hidden rounded-[28px] border px-7 py-16 sm:px-12 sm:py-20 lg:px-16"
//               style={{
//                 borderColor: hexToRgba(
//                   branding.primaryColor,
//                   0.35
//                 ),
//                 background:
//                   `linear-gradient(135deg, ${hexToRgba(
//                     branding.primaryColor,
//                     0.22
//                   )}, ${hexToRgba(
//                     branding.secondaryColor,
//                     0.08
//                   )}, ${branding.cardBackgroundColor})`,
//                 boxShadow: `0 0 50px ${hexToRgba(
//                   branding.primaryColor,
//                   0.12
//                 )}`,
//               }}
//             >
//               <div
//                 className="absolute -right-20 -top-20 h-72 w-72 rounded-full blur-3xl"
//                 style={{
//                   backgroundColor:
//                     hexToRgba(
//                       branding.primaryColor,
//                       0.18
//                     ),
//                 }}
//               />

//               <div className="relative max-w-3xl">
//                 <HeroContent
//                   content={content}
//                   instituteName={instituteName}
//                   headingStyle={headingStyle}
//                   branding={branding}
//                 />
//               </div>
//             </div>
//           )}
//         </div>
//       </section>

//       {/* ==================================================
//           SEARCH + FILTER
//       ================================================== */}

//       <section className="relative z-10 px-5 sm:px-8 lg:px-10">
//         <div className="mx-auto max-w-7xl">
//           <div
//             className="rounded-3xl border p-4 shadow-2xl sm:p-5"
//             style={{
//               backgroundColor: hexToRgba(
//                 branding.cardBackgroundColor,
//                 0.96
//               ),
//               borderColor: hexToRgba(
//                 branding.primaryColor,
//                 0.25
//               ),
//               boxShadow: `0 15px 50px ${hexToRgba(
//                 "#000000",
//                 0.3
//               )}`,
//             }}
//           >
//             <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
//               {/* Search */}
//               <div className="relative flex-1">
//                 <Search
//                   size={20}
//                   className="absolute left-5 top-1/2 -translate-y-1/2"
//                   style={{
//                     color:
//                       branding.secondaryColor,
//                   }}
//                 />

//                 <input
//                   type="text"
//                   value={searchQuery}
//                   onChange={(event) =>
//                     setSearchQuery(
//                       event.target.value
//                     )
//                   }
//                   placeholder={
//                     content.searchPlaceholder
//                   }
//                   className="w-full rounded-2xl border bg-transparent py-4 pl-13 pr-5 text-sm outline-none transition placeholder:text-slate-500 focus:ring-2"
//                   style={{
//                     borderColor: hexToRgba(
//                       branding.primaryColor,
//                       0.3
//                     ),
//                     color:
//                       branding.headingColor,
//                   }}
//                 />
//               </div>

//               {/* 3 Buttons */}
//               <div className="grid grid-cols-3 gap-2 sm:flex">
//                 <FilterButton
//                   label={content.all}
//                   icon={null}
//                   count={testimonials.length}
//                   value="all"
//                   activeFilter={activeFilter}
//                   setActiveFilter={
//                     setActiveFilter
//                   }
//                   branding={branding}
//                 />

//                 <FilterButton
//                   label={content.image}
//                   icon={<ImageIcon size={17} />}
//                   count={imageCount}
//                   value="image"
//                   activeFilter={activeFilter}
//                   setActiveFilter={
//                     setActiveFilter
//                   }
//                   branding={branding}
//                 />

//                 <FilterButton
//                   label={content.video}
//                   icon={<Video size={17} />}
//                   count={videoCount}
//                   value="video"
//                   activeFilter={activeFilter}
//                   setActiveFilter={
//                     setActiveFilter
//                   }
//                   branding={branding}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ==================================================
//           TESTIMONIAL GRID
//       ================================================== */}

//       <section className="px-5 pb-20 pt-16 sm:px-8 lg:px-10">
//         <div className="mx-auto max-w-7xl">
//           <div className="mb-9 text-center">
//             <p
//               className="text-xs font-bold uppercase tracking-[0.3em]"
//               style={{
//                 color:
//                   branding.secondaryColor,
//               }}
//             >
//               {content.eyebrow}
//             </p>

//             <h2
//               className="mt-3 text-3xl sm:text-4xl"
//               style={headingStyle}
//             >
//               {activeFilter === "all"
//                 ? content.sectionHeading
//                 : activeFilter === "image"
//                   ? "Image Testimonials"
//                   : "Video Testimonials"}
//             </h2>

//             <p
//               className="mx-auto mt-3 max-w-2xl text-sm sm:text-base"
//               style={{
//                 color: branding.mutedColor,
//               }}
//             >
//               {activeFilter === "all"
//                 ? content.sectionSubheading
//                 : activeFilter === "image"
//                   ? "Explore visual stories and feedback from our students."
//                   : "Watch students share their learning experiences."}
//             </p>
//           </div>

//           {filteredTestimonials.length > 0 ? (
//             <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
//               {filteredTestimonials.map(
//                 (testimonial, index) =>
//                   testimonial._type === "video" ? (
//                     <VideoTestimonialCard
//                       key={testimonial._id}
//                       testimonial={testimonial}
//                       branding={branding}
//                       onPlay={() =>
//                         setSelectedVideo(
//                           testimonial
//                         )
//                       }
//                     />
//                   ) : (
//                     <ImageTestimonialCard
//                       key={testimonial._id}
//                       testimonial={testimonial}
//                       branding={branding}
//                       index={index}
//                     />
//                   )
//               )}
//             </div>
//           ) : (
//             <EmptyState
//               activeFilter={activeFilter}
//               searchQuery={searchQuery}
//               content={content}
//               branding={branding}
//               onClear={() => {
//                 setSearchQuery("");
//                 setActiveFilter("all");
//               }}
//             />
//           )}
//         </div>
//       </section>

//       {/* ==================================================
//           VIDEO MODAL
//       ================================================== */}

//       {selectedVideo && (
//         <VideoModal
//           testimonial={selectedVideo}
//           branding={branding}
//           onClose={() =>
//             setSelectedVideo(null)
//           }
//         />
//       )}
//     </main>
//   );
// }

// /* ========================================================
//    HERO CONTENT
// ======================================================== */

// function HeroContent({
//   content,
//   instituteName,
//   headingStyle,
//   branding,
// }) {
//   return (
//     <>
//       <div>
//         <div className="mb-5 flex items-center gap-3">
//           <span
//             className="h-px w-10"
//             style={{
//               backgroundColor:
//                 branding.secondaryColor,
//             }}
//           />

//           <p
//             className="text-xs font-bold uppercase tracking-[0.3em]"
//             style={{
//               color:
//                 branding.secondaryColor,
//             }}
//           >
//             {content.eyebrow}
//           </p>
//         </div>

//         <h1
//           className="max-w-3xl text-4xl sm:text-5xl lg:text-6xl"
//           style={{
//             ...headingStyle,
//             textShadow: `0 0 30px ${hexToRgba(
//               branding.primaryColor,
//               0.18
//             )}`,
//           }}
//         >
//           {content.heading}
//         </h1>

//         <p
//           className="mt-6 max-w-2xl text-base leading-7 sm:text-lg"
//           style={{
//             color:
//               hexToRgba(
//                 branding.headingColor,
//                 0.78
//               ),
//           }}
//         >
//           {content.subheading}
//         </p>

//         <div className="mt-7 flex flex-wrap items-center gap-3">
//           <span
//             className="rounded-full border px-4 py-2 text-xs font-semibold"
//             style={{
//               borderColor: hexToRgba(
//                 branding.primaryColor,
//                 0.35
//               ),
//               backgroundColor: hexToRgba(
//                 branding.primaryColor,
//                 0.1
//               ),
//               color:
//                 branding.secondaryColor,
//             }}
//           >
//             Real Student Stories
//           </span>

//           <span
//             className="rounded-full border px-4 py-2 text-xs font-semibold"
//             style={{
//               borderColor: hexToRgba(
//                 branding.secondaryColor,
//                 0.25
//               ),
//               backgroundColor: hexToRgba(
//                 branding.secondaryColor,
//                 0.07
//               ),
//               color:
//                 branding.headingColor,
//             }}
//           >
//             {instituteName}
//           </span>
//         </div>
//       </div>
//     </>
//   );
// }

// /* ========================================================
//    FILTER BUTTON
// ======================================================== */

// function FilterButton({
//   label,
//   icon,
//   count,
//   value,
//   activeFilter,
//   setActiveFilter,
//   branding,
// }) {
//   const active = activeFilter === value;

//   return (
//     <button
//       type="button"
//       onClick={() =>
//         setActiveFilter(value)
//       }
//       className="flex min-w-0 items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-semibold transition-all duration-200 sm:min-w-[115px] sm:px-5 hover:-translate-y-0.5"
//       style={{
//         backgroundColor: active
//           ? branding.primaryColor
//           : "transparent",

//         borderColor: active
//           ? branding.primaryColor
//           : hexToRgba(
//               branding.primaryColor,
//               0.25
//             ),

//         color: active
//           ? branding.buttonTextColor
//           : branding.textColor,

//         boxShadow: active
//           ? `0 0 24px ${hexToRgba(
//               branding.primaryColor,
//               0.28
//             )}`
//           : "none",
//       }}
//     >
//       {icon}

//       <span className="hidden sm:inline">
//         {label}
//       </span>

//       <span className="sm:hidden">
//         {label}
//       </span>

//       <span
//         className="rounded-full px-1.5 py-0.5 text-[10px]"
//         style={{
//           backgroundColor: active
//             ? hexToRgba("#FFFFFF", 0.16)
//             : hexToRgba(
//                 branding.primaryColor,
//                 0.1
//               ),
//           color: active
//             ? branding.buttonTextColor
//             : branding.secondaryColor,
//         }}
//       >
//         {count}
//       </span>
//     </button>
//   );
// }

// /* ========================================================
//    IMAGE TESTIMONIAL CARD
// ======================================================== */

// function ImageTestimonialCard({
//   testimonial,
//   branding,
//   index,
// }) {
//   const image =
//     testimonial._image ||
//     testimonial._avatar;

//   return (
//     <article
//       className="group overflow-hidden rounded-3xl border transition-all duration-300 hover:-translate-y-1"
//       style={{
//         backgroundColor:
//           branding.cardBackgroundColor,

//         borderColor: hexToRgba(
//           branding.primaryColor,
//           0.2
//         ),

//         boxShadow:
//           "0 15px 45px rgba(0,0,0,0.22)",
//       }}
//     >
//       {/* Image */}
//       <div className="relative aspect-[16/10] overflow-hidden">
//         {image ? (
//           <img
//             src={image}
//             alt={testimonial._name}
//             className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
//             onError={(event) => {
//               event.currentTarget.style.display =
//                 "none";
//             }}
//           />
//         ) : (
//           <FallbackMedia
//             name={testimonial._name}
//             branding={branding}
//           />
//         )}

//         <div
//           className="absolute inset-0"
//           style={{
//             background:
//               "linear-gradient(180deg, transparent 55%, rgba(2,6,23,0.82) 100%)",
//           }}
//         />

//         <span
//           className="absolute left-4 top-4 flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold backdrop-blur-md"
//           style={{
//             backgroundColor:
//               "rgba(3,8,18,0.65)",
//             borderColor: hexToRgba(
//               branding.primaryColor,
//               0.4
//             ),
//             color:
//               branding.headingColor,
//           }}
//         >
//           <ImageIcon size={13} />
//           Image
//         </span>
//       </div>

//       {/* Content */}
//       <div className="p-6">
//         <div className="flex items-start justify-between gap-4">
//           <div className="flex min-w-0 items-center gap-3">
//             <Avatar
//               src={testimonial._avatar}
//               name={testimonial._name}
//               branding={branding}
//             />

//             <div className="min-w-0">
//               <h3
//                 className="truncate text-base font-bold"
//                 style={{
//                   color:
//                     branding.headingColor,
//                 }}
//               >
//                 {testimonial._name}
//               </h3>

//               <p
//                 className="truncate text-xs font-medium"
//                 style={{
//                   color:
//                     branding.secondaryColor,
//                 }}
//               >
//                 {testimonial._subcategory}
//               </p>
//             </div>
//           </div>

//           <Rating
//             rating={testimonial._rating}
//             branding={branding}
//           />
//         </div>

//         <div
//           className="my-5 h-px"
//           style={{
//             backgroundColor: hexToRgba(
//               branding.primaryColor,
//               0.12
//             ),
//           }}
//         />

//         <div className="flex gap-3">
//           <Quote
//             size={25}
//             className="mt-1 shrink-0"
//             style={{
//               color:
//                 branding.primaryColor,
//               fill: hexToRgba(
//                 branding.primaryColor,
//                 0.14
//               ),
//             }}
//           />

//           <p
//             className="line-clamp-4 text-sm leading-7"
//             style={{
//               color: branding.textColor,
//             }}
//           >
//             {testimonial._text ||
//               "Amazing learning experience."}
//           </p>
//         </div>

//         <div
//           className="mt-6 flex items-center justify-between border-t pt-4"
//           style={{
//             borderColor: hexToRgba(
//               branding.primaryColor,
//               0.1
//             ),
//           }}
//         >
//           <span
//             className="text-xs"
//             style={{
//               color:
//                 branding.mutedColor,
//             }}
//           >
//             Student testimonial
//           </span>

//           <ArrowRight
//             size={16}
//             className="transition-transform duration-200 group-hover:translate-x-1"
//             style={{
//               color:
//                 branding.secondaryColor,
//             }}
//           />
//         </div>
//       </div>
//     </article>
//   );
// }

// /* ========================================================
//    VIDEO TESTIMONIAL CARD
// ======================================================== */

// function VideoTestimonialCard({
//   testimonial,
//   branding,
//   onPlay,
// }) {
//   return (
//     <article
//       className="group overflow-hidden rounded-3xl border transition-all duration-300 hover:-translate-y-1"
//       style={{
//         backgroundColor:
//           branding.cardBackgroundColor,

//         borderColor: hexToRgba(
//           branding.primaryColor,
//           0.25
//         ),

//         boxShadow:
//           "0 15px 45px rgba(0,0,0,0.22)",
//       }}
//     >
//       {/* Video thumbnail */}
//       <div className="relative aspect-video overflow-hidden bg-black">
//         {testimonial._thumbnail ? (
//           <img
//             src={testimonial._thumbnail}
//             alt={testimonial._name}
//             className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
//           />
//         ) : (
//           <FallbackMedia
//             name={testimonial._name}
//             branding={branding}
//           />
//         )}

//         <div
//           className="absolute inset-0"
//           style={{
//             background:
//               "linear-gradient(180deg, rgba(0,0,0,0.1), rgba(0,0,0,0.65))",
//           }}
//         />

//         <button
//           type="button"
//           onClick={onPlay}
//           className="absolute inset-0 flex items-center justify-center"
//           aria-label={`Play testimonial by ${testimonial._name}`}
//         >
//           <span
//             className="flex h-16 w-16 items-center justify-center rounded-full border text-white transition duration-300 group-hover:scale-110"
//             style={{
//               backgroundColor:
//                 branding.primaryColor,
//               borderColor: hexToRgba(
//                 "#FFFFFF",
//                 0.35
//               ),
//               boxShadow: `0 0 35px ${hexToRgba(
//                 branding.primaryColor,
//                 0.7
//               )}`,
//             }}
//           >
//             <Play
//               size={23}
//               fill="currentColor"
//               className="ml-1"
//             />
//           </span>
//         </button>

//         <span
//           className="absolute left-4 top-4 flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold backdrop-blur-md"
//           style={{
//             backgroundColor:
//               "rgba(3,8,18,0.65)",
//             borderColor: hexToRgba(
//               branding.primaryColor,
//               0.4
//             ),
//             color:
//               branding.headingColor,
//           }}
//         >
//           <Video size={13} />
//           Video
//         </span>
//       </div>

//       {/* Content */}
//       <div className="p-6">
//         <div className="flex items-center gap-3">
//           <Avatar
//             src={testimonial._avatar}
//             name={testimonial._name}
//             branding={branding}
//           />

//           <div className="min-w-0 flex-1">
//             <h3
//               className="truncate text-base font-bold"
//               style={{
//                 color:
//                   branding.headingColor,
//               }}
//             >
//               {testimonial._name}
//             </h3>

//             <p
//               className="truncate text-xs font-medium"
//               style={{
//                 color:
//                   branding.secondaryColor,
//               }}
//             >
//               {testimonial._subcategory}
//             </p>
//           </div>

//           <Rating
//             rating={testimonial._rating}
//             branding={branding}
//           />
//         </div>

//         <div
//           className="my-5 h-px"
//           style={{
//             backgroundColor: hexToRgba(
//               branding.primaryColor,
//               0.12
//             ),
//           }}
//         />

//         <div className="flex gap-3">
//           <Quote
//             size={25}
//             className="mt-1 shrink-0"
//             style={{
//               color:
//                 branding.primaryColor,
//               fill: hexToRgba(
//                 branding.primaryColor,
//                 0.14
//               ),
//             }}
//           />

//           <p
//             className="line-clamp-3 text-sm leading-7"
//             style={{
//               color: branding.textColor,
//             }}
//           >
//             {testimonial._text ||
//               "Watch this student share their learning experience."}
//           </p>
//         </div>

//         <button
//           type="button"
//           onClick={onPlay}
//           className="mt-5 flex items-center gap-2 text-sm font-semibold transition hover:gap-3"
//           style={{
//             color:
//               branding.secondaryColor,
//           }}
//         >
//           <Play
//             size={15}
//             fill="currentColor"
//           />

//           {DEFAULT_CONTENT.watchVideo}

//           <ArrowRight size={15} />
//         </button>
//       </div>
//     </article>
//   );
// }

// /* ========================================================
//    VIDEO MODAL
// ======================================================== */

// function VideoModal({
//   testimonial,
//   branding,
//   onClose,
// }) {
//   return (
//     <div
//       className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md sm:p-8"
//       onClick={onClose}
//     >
//       <div
//         className="relative w-full max-w-5xl overflow-hidden rounded-3xl border shadow-2xl"
//         style={{
//           backgroundColor:
//             branding.cardBackgroundColor,

//           borderColor: hexToRgba(
//             branding.primaryColor,
//             0.4
//           ),

//           boxShadow: `0 0 70px ${hexToRgba(
//             branding.primaryColor,
//             0.2
//           )}`,
//         }}
//         onClick={(event) =>
//           event.stopPropagation()
//         }
//       >
//         <button
//           type="button"
//           onClick={onClose}
//           className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border text-white backdrop-blur-md transition hover:scale-105"
//           style={{
//             backgroundColor:
//               "rgba(0,0,0,0.6)",
//             borderColor: hexToRgba(
//               "#FFFFFF",
//               0.2
//             ),
//           }}
//           aria-label="Close video"
//         >
//           <X size={20} />
//         </button>

//         <div className="bg-black">
//           <video
//             src={testimonial._video}
//             poster={
//               testimonial._thumbnail ||
//               undefined
//             }
//             controls
//             autoPlay
//             playsInline
//             className="max-h-[70vh] w-full object-contain"
//           />
//         </div>

//         <div className="p-6 sm:p-7">
//           <div className="flex items-center gap-3">
//             <Avatar
//               src={testimonial._avatar}
//               name={testimonial._name}
//               branding={branding}
//             />

//             <div>
//               <h3
//                 className="font-bold"
//                 style={{
//                   color:
//                     branding.headingColor,
//                 }}
//               >
//                 {testimonial._name}
//               </h3>

//               <p
//                 className="text-sm"
//                 style={{
//                   color:
//                     branding.secondaryColor,
//                 }}
//               >
//                 {testimonial._subcategory}
//               </p>
//             </div>
//           </div>

//           {testimonial._text && (
//             <p
//               className="mt-5 text-sm leading-7"
//               style={{
//                 color:
//                   branding.textColor,
//               }}
//             >
//               {testimonial._text}
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ========================================================
//    AVATAR
// ======================================================== */

// function Avatar({
//   src,
//   name,
//   branding,
// }) {
//   if (src) {
//     return (
//       <img
//         src={src}
//         alt={name}
//         className="h-11 w-11 shrink-0 rounded-full border-2 object-cover"
//         style={{
//           borderColor: hexToRgba(
//             branding.primaryColor,
//             0.5
//           ),
//         }}
//       />
//     );
//   }

//   return (
//     <div
//       className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold"
//       style={{
//         backgroundColor: hexToRgba(
//           branding.primaryColor,
//           0.18
//         ),
//         borderColor: hexToRgba(
//           branding.primaryColor,
//           0.45
//         ),
//         color:
//           branding.secondaryColor,
//       }}
//     >
//       {(name || "S")
//         .charAt(0)
//         .toUpperCase()}
//     </div>
//   );
// }

// /* ========================================================
//    RATING
// ======================================================== */

// function Rating({
//   rating,
//   branding,
// }) {
//   return (
//     <div className="flex shrink-0 gap-0.5">
//       {[1, 2, 3, 4, 5].map(
//         (star) => (
//           <Star
//             key={star}
//             size={12}
//             fill={
//               star <= rating
//                 ? branding.secondaryColor
//                 : "transparent"
//             }
//             style={{
//               color:
//                 branding.secondaryColor,
//             }}
//           />
//         )
//       )}
//     </div>
//   );
// }

// /* ========================================================
//    FALLBACK MEDIA
// ======================================================== */

// function FallbackMedia({
//   name,
//   branding,
// }) {
//   return (
//     <div
//       className="flex h-full w-full items-center justify-center"
//       style={{
//         background:
//           `radial-gradient(circle at center, ${hexToRgba(
//             branding.primaryColor,
//             0.3
//           )}, ${branding.cardBackgroundColor} 65%)`,
//       }}
//     >
//       <div className="text-center">
//         <div
//           className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border text-2xl font-bold"
//           style={{
//             backgroundColor:
//               hexToRgba(
//                 branding.primaryColor,
//                 0.15
//               ),
//             borderColor: hexToRgba(
//               branding.primaryColor,
//               0.45
//             ),
//             color:
//               branding.secondaryColor,
//           }}
//         >
//           {(name || "S")
//             .charAt(0)
//             .toUpperCase()}
//         </div>

//         <p
//           className="mt-3 text-xs"
//           style={{
//             color:
//               branding.mutedColor,
//           }}
//         >
//           {name}
//         </p>
//       </div>
//     </div>
//   );
// }

// /* ========================================================
//    EMPTY STATE
// ======================================================== */

// function EmptyState({
//   activeFilter,
//   searchQuery,
//   content,
//   branding,
//   onClear,
// }) {
//   const message =
//     activeFilter === "image"
//       ? content.emptyImage
//       : activeFilter === "video"
//         ? content.emptyVideo
//         : content.emptyAll;

//   return (
//     <div
//       className="rounded-3xl border px-6 py-20 text-center"
//       style={{
//         backgroundColor:
//           branding.cardBackgroundColor,
//         borderColor: hexToRgba(
//           branding.primaryColor,
//           0.2
//         ),
//       }}
//     >
//       <div
//         className="mx-auto flex h-16 w-16 items-center justify-center rounded-full"
//         style={{
//           backgroundColor: hexToRgba(
//             branding.primaryColor,
//             0.1
//           ),
//           color:
//             branding.secondaryColor,
//         }}
//       >
//         {activeFilter === "video" ? (
//           <Video size={25} />
//         ) : activeFilter === "image" ? (
//           <ImageIcon size={25} />
//         ) : (
//           <Search size={25} />
//         )}
//       </div>

//       <h3
//         className="mt-5 text-xl font-bold"
//         style={{
//           color:
//             branding.headingColor,
//         }}
//       >
//         {message}
//       </h3>

//       <p
//         className="mx-auto mt-2 max-w-md text-sm"
//         style={{
//           color:
//             branding.mutedColor,
//         }}
//       >
//         {searchQuery
//           ? `No testimonials match "${searchQuery}".`
//           : "There are no testimonials available for this filter yet."}
//       </p>

//       {(searchQuery ||
//         activeFilter !== "all") && (
//         <button
//           type="button"
//           onClick={onClear}
//           className="mt-6 rounded-xl px-5 py-3 text-sm font-semibold transition hover:scale-[1.02]"
//           style={{
//             backgroundColor:
//               branding.primaryColor,
//             color:
//               branding.buttonTextColor,
//           }}
//         >
//           View All Testimonials
//         </button>
//       )}
//     </div>
//   );
// }



import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useOutletContext } from "react-router-dom";

import {
  Search,
  Play,
  Image as ImageIcon,
  Video,
  Star,
  Quote,
  X,
  ArrowRight,
} from "lucide-react";

import {
  getInstituteTestimonials,
} from "../../services/testimonialService";

/* =========================================================
   WEBSITE TESTIMONIALS
   BLACK + RADIANT BLUE THEME
========================================================= */

const THEME = {
  page: "#02050A",
  page2: "#030914",

  card: "#071426",
  card2: "#091B31",

  blue: "#008CFF",
  blueDark: "#0057D9",
  cyan: "#38D7FF",

  white: "#F8FAFC",
  text: "#CBD5E1",
  muted: "#94A3B8",

  border: "rgba(0,140,255,0.25)",
  borderStrong: "rgba(56,215,255,0.40)",
};

/* =========================================================
   DEFAULT CONTENT
========================================================= */

const DEFAULT_CONTENT = {
  eyebrow: "TESTIMONIALS",

  heading: "What Our Students Say",

  subheading:
    "Real experiences from learners who turned their passion into progress.",

  searchPlaceholder:
    "Search by name, testimonial or subcategory...",

  all: "All",
  image: "Image",
  video: "Video",

  sectionHeading: "Student Experiences",

  sectionSubheading:
    "Explore real stories, feedback and learning experiences from our students.",

  emptyAll: "No testimonials found.",
  emptyImage: "No image testimonials found.",
  emptyVideo: "No video testimonials found.",

  watchVideo: "Watch Testimonial",
};

/* =========================================================
   HELPERS
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

const hexToRgba = (color, alpha) => {
  if (typeof color !== "string") {
    return `rgba(0,140,255,${alpha})`;
  }

  const hex = color.replace("#", "");

  if (!/^[0-9A-Fa-f]{6}$/.test(hex)) {
    return color;
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

/* =========================================================
   BRANDING
   FORCE BLACK + RADIANT BLUE
========================================================= */

const normalizeBranding = (branding = {}) => ({
  pageBackgroundColor: THEME.page,
  cardBackgroundColor: THEME.card,

  headingColor: THEME.white,
  subheadingColor: THEME.cyan,
  textColor: THEME.text,
  mutedColor: THEME.muted,

  primaryColor: THEME.blue,
  secondaryColor: THEME.cyan,

  borderColor: THEME.border,

  buttonTextColor: "#FFFFFF",

  navbarColor: "#02050A",
  footerBackgroundColor: "#02050A",

  fontHeading:
    branding?.fontHeading ||
    branding?.font_heading ||
    "Inter",

  fontSubheading:
    branding?.fontSubheading ||
    branding?.font_subheading ||
    "Inter",

  fontBody:
    branding?.fontBody ||
    branding?.font_body ||
    "Inter",

  headingWeight:
    branding?.headingWeight ||
    branding?.heading_weight ||
    700,

  headingLineHeight:
    branding?.headingLineHeight ||
    branding?.heading_line_height ||
    1.15,

  bodyWeight:
    branding?.bodyWeight ||
    branding?.body_weight ||
    400,

  bodyLineHeight:
    branding?.bodyLineHeight ||
    branding?.body_line_height ||
    1.6,
});

/* =========================================================
   CONTENT NORMALIZER
========================================================= */

const normalizeContent = (content = {}) => {
  const source =
    content?.testimonials ||
    content?.testimonial ||
    content?.Testimonials ||
    content ||
    {};

  return {
    eyebrow:
      getValue(
        source?.eyebrow,
        source?.eyebrow_text,
        source?.label,
        DEFAULT_CONTENT.eyebrow
      ),

    heading:
      getValue(
        source?.heading,
        source?.title,
        source?.page_heading,
        DEFAULT_CONTENT.heading
      ),

    subheading:
      getValue(
        source?.subheading,
        source?.subtitle,
        source?.page_subheading,
        DEFAULT_CONTENT.subheading
      ),

    searchPlaceholder:
      getValue(
        source?.searchPlaceholder,
        source?.search_placeholder,
        DEFAULT_CONTENT.searchPlaceholder
      ),

    all:
      getValue(
        source?.filters?.all,
        source?.filter_all,
        DEFAULT_CONTENT.all
      ),

    image:
      getValue(
        source?.filters?.image,
        source?.filters?.text,
        source?.filter_image,
        source?.filter_text,
        DEFAULT_CONTENT.image
      ),

    video:
      getValue(
        source?.filters?.video,
        source?.filter_video,
        DEFAULT_CONTENT.video
      ),

    sectionHeading:
      getValue(
        source?.sectionHeading,
        source?.section_heading,
        DEFAULT_CONTENT.sectionHeading
      ),

    sectionSubheading:
      getValue(
        source?.sectionSubheading,
        source?.section_subheading,
        DEFAULT_CONTENT.sectionSubheading
      ),

    emptyAll: DEFAULT_CONTENT.emptyAll,
    emptyImage: DEFAULT_CONTENT.emptyImage,
    emptyVideo: DEFAULT_CONTENT.emptyVideo,
  };
};

/* =========================================================
   BANNER HELPERS
========================================================= */

const isActiveBanner = (banner) => {
  const value =
    banner?.is_active ??
    banner?.isActive;

  if (value === undefined || value === null) {
    return true;
  }

  return (
    value === true ||
    value === 1 ||
    value === "1" ||
    value === "true" ||
    String(value).toUpperCase() === "ACTIVE"
  );
};

const getBannerImage = (banner) =>
  banner?.image_url ||
  banner?.imageUrl ||
  banner?.image ||
  banner?.banner_image ||
  banner?.bannerImage ||
  null;

/* =========================================================
   TESTIMONIAL HELPERS
========================================================= */

const getId = (testimonial, index) =>
  testimonial?.id ??
  testimonial?._id ??
  testimonial?.testimonial_id ??
  `testimonial-${index}`;

const getStudentName = (testimonial) =>
  getValue(
    testimonial?.student_name,
    testimonial?.studentName,
    testimonial?.name,
    testimonial?.student?.name,
    "Student"
  );

const getSubcategory = (testimonial) =>
  getValue(
    testimonial?.subcategory,
    testimonial?.sub_category,
    testimonial?.subcategory_name,
    testimonial?.subcategoryName,
    testimonial?.subCategory,
    testimonial?.student?.subcategory,
    testimonial?.course_subcategory,
    testimonial?.category_name,
    "Student"
  );

const getTestimonialText = (testimonial) =>
  getValue(
    testimonial?.testimonial_text,
    testimonial?.testimonialText,
    testimonial?.text,
    testimonial?.review,
    testimonial?.comment,
    testimonial?.message,
    ""
  );

const getAvatar = (testimonial) =>
  getValue(
    testimonial?.avatar,
    testimonial?.avatar_url,
    testimonial?.avatarUrl,
    testimonial?.student_avatar,
    testimonial?.studentAvatar,
    testimonial?.student_image,
    testimonial?.studentImage,
    testimonial?.profile_image,
    testimonial?.profileImage,
    testimonial?.student?.avatar,
    testimonial?.student?.image,
    null
  );

const getImageUrl = (testimonial) =>
  getValue(
    testimonial?.image_url,
    testimonial?.imageUrl,
    testimonial?.image,
    testimonial?.testimonial_image,
    testimonial?.testimonialImage,
    testimonial?.photo,
    testimonial?.photo_url,
    null
  );

const getVideoUrl = (testimonial) =>
  getValue(
    testimonial?.video_url,
    testimonial?.videoUrl,
    testimonial?.video,
    testimonial?.video_file,
    testimonial?.videoFile,
    testimonial?.video_path,
    null
  );

const getVideoThumbnail = (testimonial) =>
  getValue(
    testimonial?.video_thumbnail,
    testimonial?.videoThumbnail,
    testimonial?.thumbnail,
    testimonial?.thumbnail_url,
    testimonial?.thumbnailUrl,
    getImageUrl(testimonial),
    getAvatar(testimonial),
    null
  );

const getRating = (testimonial) => {
  const value = Number(
    testimonial?.rating ??
    testimonial?.stars ??
    5
  );

  if (Number.isNaN(value)) {
    return 5;
  }

  return Math.min(
    5,
    Math.max(0, Math.round(value))
  );
};

const normalizeTestimonials = (list = []) =>
  list
    .filter(Boolean)
    .map((testimonial, index) => {
      const image = getImageUrl(testimonial);
      const video = getVideoUrl(testimonial);

      const type = video
        ? "video"
        : image
          ? "image"
          : "image";

      return {
        ...testimonial,

        _id: getId(testimonial, index),
        _type: type,
        _name: getStudentName(testimonial),
        _subcategory: getSubcategory(testimonial),
        _text: getTestimonialText(testimonial),
        _avatar: getAvatar(testimonial),
        _image: image,
        _video: video,
        _thumbnail: getVideoThumbnail(testimonial),
        _rating: getRating(testimonial),
      };
    });

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function WebsiteTestimonials() {
  const context = useOutletContext() || {};

  const {
    branding: outletBranding = {},
    content: outletContent = {},
    website = {},
    institute = {},
    banners = [],
    bannersLoading = false,
  } = context;

  const branding = useMemo(
    () => normalizeBranding(outletBranding),
    [outletBranding]
  );

  const content = useMemo(
    () => normalizeContent(outletContent),
    [outletContent]
  );

  const [testimonials, setTestimonials] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [activeFilter, setActiveFilter] =
    useState("all");

  const [searchQuery, setSearchQuery] =
    useState("");

  const [selectedVideo, setSelectedVideo] =
    useState(null);

  /* =======================================================
     FETCH TESTIMONIALS
  ======================================================= */

  useEffect(() => {
    let mounted = true;

    const loadTestimonials = async () => {
      try {
        setLoading(true);
        setError("");

        const result =
          await getInstituteTestimonials();

        if (!mounted) {
          return;
        }

        let list = [];

        if (Array.isArray(result)) {
          list = result;
        } else if (
          Array.isArray(result?.data)
        ) {
          list = result.data;
        } else if (
          Array.isArray(result?.testimonials)
        ) {
          list = result.testimonials;
        } else if (
          Array.isArray(
            result?.data?.testimonials
          )
        ) {
          list =
            result.data.testimonials;
        }

        setTestimonials(
          normalizeTestimonials(list)
        );
      } catch (err) {
        console.error(
          "Testimonials API Error:",
          err
        );

        if (!mounted) {
          return;
        }

        setTestimonials([]);

        setError(
          err?.response?.data?.message ||
          err?.message ||
          "Failed to load testimonials."
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadTestimonials();

    return () => {
      mounted = false;
    };
  }, []);

  /* =======================================================
     DASHBOARD BANNER
  ======================================================= */

  const testimonialBanner = useMemo(() => {
    if (!Array.isArray(banners)) {
      return null;
    }

    const activeBanners = banners
      .filter(isActiveBanner)
      .slice()
      .sort(
        (a, b) =>
          Number(
            a?.display_order ??
            a?.displayOrder ??
            0
          ) -
          Number(
            b?.display_order ??
            b?.displayOrder ??
            0
          )
      );

    /* TESTIMONIAL */

    const testimonialTypes = [
      "TESTIMONIAL",
      "TESTIMONIALS",
    ];

    const testimonial =
      activeBanners.find((banner) => {
        const type = String(
          banner?.banner_type ??
          banner?.bannerType ??
          ""
        )
          .trim()
          .toUpperCase();

        return (
          testimonialTypes.includes(type) &&
          getBannerImage(banner)
        );
      });

    if (testimonial) {
      return testimonial;
    }

    /* HOME FALLBACK */

    const homeBanner =
      activeBanners.find((banner) => {
        const type = String(
          banner?.banner_type ??
          banner?.bannerType ??
          ""
        )
          .trim()
          .toUpperCase();

        return (
          type === "HOME" &&
          getBannerImage(banner)
        );
      });

    if (homeBanner) {
      return homeBanner;
    }

    /* FIRST ACTIVE IMAGE */

    return (
      activeBanners.find((banner) =>
        getBannerImage(banner)
      ) || null
    );
  }, [banners]);

  const bannerImage =
    getBannerImage(testimonialBanner);

  const instituteName =
    institute?.name ||
    institute?.institute_name ||
    website?.institute?.name ||
    website?.name ||
    "Our Institute";

  /* =======================================================
     FILTER
  ======================================================= */

  const filteredTestimonials =
    useMemo(() => {
      const query =
        searchQuery
          .trim()
          .toLowerCase();

      return testimonials.filter(
        (testimonial) => {
          const matchesType =
            activeFilter === "all" ||
            testimonial._type ===
              activeFilter;

          const searchableText = [
            testimonial._name,
            testimonial._subcategory,
            testimonial._text,
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();

          const matchesSearch =
            !query ||
            searchableText.includes(query);

          return (
            matchesType &&
            matchesSearch
          );
        }
      );
    }, [
      testimonials,
      activeFilter,
      searchQuery,
    ]);

  const imageCount = useMemo(
    () =>
      testimonials.filter(
        (item) =>
          item._type === "image"
      ).length,
    [testimonials]
  );

  const videoCount = useMemo(
    () =>
      testimonials.filter(
        (item) =>
          item._type === "video"
      ).length,
    [testimonials]
  );

  /* =======================================================
     SHARED STYLES
  ======================================================= */

  const headingStyle = {
    color: THEME.white,
    fontFamily: fontFamily(
      branding.fontHeading
    ),
    fontWeight:
      branding.headingWeight,
    lineHeight:
      branding.headingLineHeight,
  };

  const bodyStyle = {
    color: THEME.text,
    fontFamily: fontFamily(
      branding.fontBody
    ),
    fontWeight:
      branding.bodyWeight,
    lineHeight:
      branding.bodyLineHeight,
  };

  const cardStyle = {
    background: `
      linear-gradient(
        145deg,
        #071426 0%,
        #030914 100%
      )
    `,
    border:
      "1px solid rgba(0,140,255,0.25)",
    boxShadow: `
      0 20px 60px rgba(0,0,0,0.45),
      0 0 25px rgba(0,140,255,0.05)
    `,
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
        "
        style={{
          background: THEME.page,
        }}
      >
        <div className="text-center">
          <div
            className="
              mx-auto
              h-12
              w-12
              animate-spin
              rounded-full
              border-4
            "
            style={{
              borderColor:
                "rgba(0,140,255,0.15)",
              borderTopColor:
                THEME.cyan,
              boxShadow:
                "0 0 30px rgba(0,140,255,0.35)",
            }}
          />

          <p
            className="mt-5 text-sm"
            style={{
              color: THEME.text,
              fontFamily:
                fontFamily(
                  branding.fontBody
                ),
            }}
          >
            Loading testimonials...
          </p>
        </div>
      </main>
    );
  }

  /* =======================================================
     ERROR
  ======================================================= */

  if (error) {
    return (
      <main
        className="
          flex
          min-h-screen
          items-center
          justify-center
          px-5
        "
        style={{
          background: THEME.page,
        }}
      >
        <div
          className="
            w-full
            max-w-lg
            rounded-3xl
            border
            p-10
            text-center
          "
          style={cardStyle}
        >
          <Quote
            size={44}
            className="mx-auto"
            style={{
              color: THEME.cyan,
            }}
          />

          <h1
            className="
              mt-5
              text-2xl
              font-bold
            "
            style={headingStyle}
          >
            Unable to load testimonials
          </h1>

          <p
            className="mt-3 text-sm"
            style={{
              color: THEME.muted,
            }}
          >
            {error}
          </p>
        </div>
      </main>
    );
  }

  /* =======================================================
     MAIN PAGE
  ======================================================= */

  return (
    <main
      className="
        min-h-screen
        overflow-hidden
      "
      style={{
        background: `
          radial-gradient(
            circle at 10% 0%,
            rgba(0,140,255,0.14),
            transparent 25%
          ),
          radial-gradient(
            circle at 90% 10%,
            rgba(56,215,255,0.08),
            transparent 28%
          ),
          linear-gradient(
            180deg,
            #02050A 0%,
            #030914 45%,
            #02050A 100%
          )
        `,
      }}
    >
      {/* ===================================================
          HERO
      =================================================== */}

      <section
        className="
          relative
          px-4
          pb-10
          pt-5
          sm:px-6
          lg:px-8
        "
      >
        {/* Background glow */}

        <div
          className="
            pointer-events-none
            absolute
            -left-40
            -top-40
            h-[500px]
            w-[500px]
            rounded-full
            blur-3xl
          "
          style={{
            background:
              "rgba(0,140,255,0.15)",
          }}
        />

        <div
          className="
            pointer-events-none
            absolute
            -right-40
            top-20
            h-[450px]
            w-[450px]
            rounded-full
            blur-3xl
          "
          style={{
            background:
              "rgba(56,215,255,0.08)",
          }}
        />

        <div
          className="
            relative
            mx-auto
            max-w-7xl
          "
        >
          {bannersLoading ? (
            <div
              className="
                h-[300px]
                animate-pulse
                rounded-[28px]
                border
                sm:h-[400px]
              "
              style={{
                background:
                  THEME.card,
                borderColor:
                  THEME.border,
              }}
            />
          ) : bannerImage ? (
            <div
              className="
                relative
                min-h-[380px]
                overflow-hidden
                rounded-[30px]
                border
                sm:min-h-[470px]
              "
              style={{
                borderColor:
                  "rgba(0,140,255,0.50)",
                boxShadow: `
                  0 0 60px rgba(0,140,255,0.16),
                  0 25px 80px rgba(0,0,0,0.50)
                `,
              }}
            >
              <img
                src={bannerImage}
                alt={
                  testimonialBanner?.title ||
                  content.heading
                }
                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                  object-cover
                "
              />

              {/* Dark overlay */}

              <div
                className="
                  absolute
                  inset-0
                "
                style={{
                  background: `
                    linear-gradient(
                      90deg,
                      rgba(2,5,10,0.97) 0%,
                      rgba(2,5,10,0.85) 35%,
                      rgba(2,5,10,0.48) 68%,
                      rgba(2,5,10,0.22) 100%
                    )
                  `,
                }}
              />

              {/* Blue bottom glow */}

              <div
                className="
                  absolute
                  bottom-0
                  left-0
                  right-0
                  h-32
                "
                style={{
                  background:
                    "linear-gradient(to top,rgba(0,140,255,0.16),transparent)",
                }}
              />

              <div
                className="
                  relative
                  flex
                  min-h-[380px]
                  max-w-3xl
                  items-center
                  px-7
                  py-12
                  sm:min-h-[470px]
                  sm:px-12
                  lg:px-16
                "
              >
                <HeroContent
                  content={content}
                  instituteName={
                    instituteName
                  }
                  headingStyle={
                    headingStyle
                  }
                />
              </div>
            </div>
          ) : (
            <div
              className="
                relative
                overflow-hidden
                rounded-[30px]
                border
                px-7
                py-16
                sm:px-12
                sm:py-20
                lg:px-16
              "
              style={{
                background: `
                  radial-gradient(
                    circle at 80% 20%,
                    rgba(56,215,255,0.12),
                    transparent 30%
                  ),
                  linear-gradient(
                    135deg,
                    #071426,
                    #030914
                  )
                `,
                borderColor:
                  "rgba(0,140,255,0.35)",
                boxShadow:
                  "0 0 60px rgba(0,140,255,0.10)",
              }}
            >
              <div
                className="
                  pointer-events-none
                  absolute
                  -right-20
                  -top-20
                  h-72
                  w-72
                  rounded-full
                  blur-3xl
                "
                style={{
                  background:
                    "rgba(0,140,255,0.16)",
                }}
              />

              <div className="relative">
                <HeroContent
                  content={content}
                  instituteName={
                    instituteName
                  }
                  headingStyle={
                    headingStyle
                  }
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ===================================================
          SEARCH + FILTER
      =================================================== */}

      <section
        className="
          relative
          z-20
          px-4
          sm:px-6
          lg:px-8
        "
      >
        <div className="mx-auto max-w-7xl">
          <div
            className="
              rounded-[24px]
              border
              p-4
              sm:p-5
            "
            style={{
              background:
                "rgba(7,20,38,0.92)",
              borderColor:
                "rgba(0,140,255,0.30)",
              boxShadow: `
                0 20px 60px rgba(0,0,0,0.50),
                0 0 30px rgba(0,140,255,0.08)
              `,
              backdropFilter:
                "blur(20px)",
            }}
          >
            <div
              className="
                flex
                flex-col
                gap-4
                lg:flex-row
                lg:items-center
              "
            >
              {/* Search */}

              <div className="relative flex-1">
                <Search
                  size={20}
                  className="
                    absolute
                    left-5
                    top-1/2
                    -translate-y-1/2
                  "
                  style={{
                    color: THEME.cyan,
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
                  placeholder={
                    content.searchPlaceholder
                  }
                  className="
                    w-full
                    rounded-2xl
                    border
                    py-4
                    pl-13
                    pr-5
                    text-sm
                    outline-none
                    transition
                  "
                  style={{
                    background:
                      "#030914",
                    borderColor:
                      "rgba(0,140,255,0.30)",
                    color:
                      "#F8FAFC",
                    boxShadow:
                      "inset 0 0 30px rgba(0,140,255,0.035)",
                  }}
                />
              </div>

              {/* Filters */}

              <div
                className="
                  grid
                  grid-cols-3
                  gap-2
                  sm:flex
                "
              >
                <FilterButton
                  label={content.all}
                  count={
                    testimonials.length
                  }
                  value="all"
                  activeFilter={
                    activeFilter
                  }
                  setActiveFilter={
                    setActiveFilter
                  }
                />

                <FilterButton
                  label={content.image}
                  icon={
                    <ImageIcon size={17} />
                  }
                  count={imageCount}
                  value="image"
                  activeFilter={
                    activeFilter
                  }
                  setActiveFilter={
                    setActiveFilter
                  }
                />

                <FilterButton
                  label={content.video}
                  icon={
                    <Video size={17} />
                  }
                  count={videoCount}
                  value="video"
                  activeFilter={
                    activeFilter
                  }
                  setActiveFilter={
                    setActiveFilter
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          TESTIMONIALS
      =================================================== */}

      <section
        className="
          px-4
          pb-24
          pt-16
          sm:px-6
          lg:px-8
        "
      >
        <div className="mx-auto max-w-7xl">
          {/* Heading */}

          <div className="mb-10 text-center">
            <div
              className="
                mx-auto
                mb-4
                flex
                items-center
                justify-center
                gap-3
              "
            >
              <span
                className="
                  h-px
                  w-10
                "
                style={{
                  background:
                    THEME.blue,
                }}
              />

              <p
                className="
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.30em]
                "
                style={{
                  color:
                    THEME.cyan,
                }}
              >
                {content.eyebrow}
              </p>

              <span
                className="
                  h-px
                  w-10
                "
                style={{
                  background:
                    THEME.blue,
                }}
              />
            </div>

            <h2
              className="
                text-3xl
                font-bold
                sm:text-4xl
                lg:text-5xl
              "
              style={headingStyle}
            >
              {activeFilter === "all"
                ? content.sectionHeading
                : activeFilter === "image"
                  ? "Image Testimonials"
                  : "Video Testimonials"}
            </h2>

            <p
              className="
                mx-auto
                mt-4
                max-w-2xl
                text-sm
                sm:text-base
              "
              style={{
                color:
                  THEME.muted,
              }}
            >
              {activeFilter === "all"
                ? content.sectionSubheading
                : activeFilter === "image"
                  ? "Explore visual stories and feedback from our students."
                  : "Watch students share their learning experiences."}
            </p>
          </div>

          {/* Grid */}

          {filteredTestimonials.length >
          0 ? (
            <div
              className="
                grid
                grid-cols-1
                gap-6
                md:grid-cols-2
                xl:grid-cols-3
              "
            >
              {filteredTestimonials.map(
                (
                  testimonial,
                  index
                ) =>
                  testimonial._type ===
                  "video" ? (
                    <VideoTestimonialCard
                      key={
                        testimonial._id
                      }
                      testimonial={
                        testimonial
                      }
                      onPlay={() =>
                        setSelectedVideo(
                          testimonial
                        )
                      }
                    />
                  ) : (
                    <ImageTestimonialCard
                      key={
                        testimonial._id
                      }
                      testimonial={
                        testimonial
                      }
                      index={index}
                    />
                  )
              )}
            </div>
          ) : (
            <EmptyState
              activeFilter={
                activeFilter
              }
              searchQuery={
                searchQuery
              }
              content={content}
              onClear={() => {
                setSearchQuery("");
                setActiveFilter(
                  "all"
                );
              }}
            />
          )}
        </div>
      </section>

      {/* ===================================================
          VIDEO MODAL
      =================================================== */}

      {selectedVideo && (
        <VideoModal
          testimonial={
            selectedVideo
          }
          onClose={() =>
            setSelectedVideo(null)
          }
        />
      )}

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
            "0 0 20px rgba(0,140,255,0.65)",
        }}
      />
    </main>
  );
}

/* =========================================================
   HERO CONTENT
========================================================= */

function HeroContent({
  content,
  instituteName,
  headingStyle,
}) {
  return (
    <div>
      <div
        className="
          mb-5
          flex
          items-center
          gap-3
        "
      >
        <span
          className="
            h-px
            w-12
          "
          style={{
            background:
              THEME.cyan,
          }}
        />

        <p
          className="
            text-xs
            font-bold
            uppercase
            tracking-[0.30em]
          "
          style={{
            color:
              THEME.cyan,
          }}
        >
          {content.eyebrow}
        </p>
      </div>

      <h1
        className="
          max-w-3xl
          text-4xl
          font-black
          leading-tight
          sm:text-5xl
          lg:text-6xl
        "
        style={{
          ...headingStyle,
          textShadow:
            "0 0 35px rgba(0,140,255,0.20)",
        }}
      >
        {content.heading}
      </h1>

      <p
        className="
          mt-6
          max-w-2xl
          text-base
          leading-7
          sm:text-lg
        "
        style={{
          color:
            "rgba(248,250,252,0.78)",
        }}
      >
        {content.subheading}
      </p>

      <div
        className="
          mt-7
          flex
          flex-wrap
          items-center
          gap-3
        "
      >
        <span
          className="
            rounded-full
            border
            px-4
            py-2
            text-xs
            font-semibold
          "
          style={{
            color:
              THEME.cyan,
            background:
              "rgba(0,140,255,0.10)",
            borderColor:
              "rgba(0,140,255,0.35)",
            boxShadow:
              "0 0 18px rgba(0,140,255,0.08)",
          }}
        >
          Real Student Stories
        </span>

        <span
          className="
            rounded-full
            border
            px-4
            py-2
            text-xs
            font-semibold
          "
          style={{
            color:
              THEME.white,
            background:
              "rgba(56,215,255,0.06)",
            borderColor:
              "rgba(56,215,255,0.25)",
          }}
        >
          {instituteName}
        </span>
      </div>
    </div>
  );
}

/* =========================================================
   FILTER BUTTON
========================================================= */

function FilterButton({
  label,
  icon,
  count,
  value,
  activeFilter,
  setActiveFilter,
}) {
  const active =
    activeFilter === value;

  return (
    <button
      type="button"
      onClick={() =>
        setActiveFilter(value)
      }
      className="
        flex
        min-w-0
        items-center
        justify-center
        gap-2
        rounded-xl
        border
        px-3
        py-3
        text-sm
        font-semibold
        transition-all
        duration-200
        hover:-translate-y-0.5
      "
      style={{
        background: active
          ? "linear-gradient(135deg,#008CFF,#0057D9)"
          : "rgba(2,5,10,0.55)",

        borderColor: active
          ? THEME.blue
          : "rgba(0,140,255,0.25)",

        color: active
          ? "#FFFFFF"
          : THEME.text,

        boxShadow: active
          ? "0 0 28px rgba(0,140,255,0.32)"
          : "none",
      }}
    >
      {icon}

      <span>{label}</span>

      <span
        className="
          rounded-full
          px-1.5
          py-0.5
          text-[10px]
        "
        style={{
          background: active
            ? "rgba(255,255,255,0.15)"
            : "rgba(0,140,255,0.10)",

          color: active
            ? "#FFFFFF"
            : THEME.cyan,
        }}
      >
        {count}
      </span>
    </button>
  );
}

/* =========================================================
   AVATAR
========================================================= */

function Avatar({
  src,
  name,
}) {
  const [failed, setFailed] =
    useState(false);

  const initials = String(
    name || "S"
  )
    .trim()
    .split(/\s+/)
    .map((word) =>
      word.charAt(0)
    )
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      className="
        h-11
        w-11
        shrink-0
        overflow-hidden
        rounded-full
        border-2
      "
      style={{
        borderColor:
          "rgba(56,215,255,0.50)",
        background:
          "linear-gradient(135deg,#008CFF,#062B55)",
        boxShadow:
          "0 0 18px rgba(0,140,255,0.20)",
      }}
    >
      {src && !failed ? (
        <img
          src={src}
          alt={name}
          className="
            h-full
            w-full
            object-cover
          "
          onError={() =>
            setFailed(true)
          }
        />
      ) : (
        <div
          className="
            flex
            h-full
            w-full
            items-center
            justify-center
            text-xs
            font-bold
          "
          style={{
            color: "#FFFFFF",
          }}
        >
          {initials}
        </div>
      )}
    </div>
  );
}

/* =========================================================
   RATING
========================================================= */

function Rating({ rating }) {
  return (
    <div
      className="
        flex
        shrink-0
        gap-0.5
      "
    >
      {[1, 2, 3, 4, 5].map(
        (star) => (
          <Star
            key={star}
            size={13}
            fill={
              star <= rating
                ? THEME.cyan
                : "transparent"
            }
            style={{
              color:
                THEME.cyan,
              filter:
                star <= rating
                  ? "drop-shadow(0 0 4px rgba(56,215,255,0.60))"
                  : "none",
            }}
          />
        )
      )}
    </div>
  );
}

/* =========================================================
   IMAGE TESTIMONIAL CARD
========================================================= */

function ImageTestimonialCard({
  testimonial,
}) {
  const image =
    testimonial._image ||
    testimonial._avatar;

  return (
    <article
      className="
        group
        overflow-hidden
        rounded-3xl
        border
        transition-all
        duration-300
        hover:-translate-y-2
      "
      style={{
        background: `
          linear-gradient(
            145deg,
            #071426 0%,
            #030914 100%
          )
        `,
        borderColor:
          "rgba(0,140,255,0.25)",
        boxShadow:
          "0 18px 50px rgba(0,0,0,0.40)",
      }}
    >
      {/* IMAGE */}

      <div
        className="
          relative
          aspect-[16/10]
          overflow-hidden
        "
      >
        {image ? (
          <img
            src={image}
            alt={
              testimonial._name
            }
            className="
              h-full
              w-full
              object-cover
              transition
              duration-500
              group-hover:scale-105
            "
          />
        ) : (
          <FallbackMedia
            name={
              testimonial._name
            }
          />
        )}

        <div
          className="
            absolute
            inset-0
          "
          style={{
            background: `
              linear-gradient(
                180deg,
                transparent 40%,
                rgba(2,5,10,0.90) 100%
              )
            `,
          }}
        />

        <span
          className="
            absolute
            left-4
            top-4
            flex
            items-center
            gap-2
            rounded-full
            border
            px-3
            py-1.5
            text-xs
            font-bold
            backdrop-blur-md
          "
          style={{
            background:
              "rgba(2,5,10,0.76)",
            borderColor:
              "rgba(0,140,255,0.45)",
            color:
              THEME.cyan,
            boxShadow:
              "0 0 18px rgba(0,140,255,0.18)",
          }}
        >
          <ImageIcon size={13} />
          Image
        </span>

        <div
          className="
            pointer-events-none
            absolute
            bottom-0
            left-1/2
            h-16
            w-2/3
            -translate-x-1/2
            blur-3xl
          "
          style={{
            background:
              "rgba(0,140,255,0.25)",
          }}
        />
      </div>

      {/* CONTENT */}

      <div className="p-6">
        <div
          className="
            flex
            items-start
            justify-between
            gap-4
          "
        >
          <div
            className="
              flex
              min-w-0
              items-center
              gap-3
            "
          >
            <Avatar
              src={
                testimonial._avatar
              }
              name={
                testimonial._name
              }
            />

            <div className="min-w-0">
              <h3
                className="
                  truncate
                  text-base
                  font-bold
                "
                style={{
                  color:
                    THEME.white,
                }}
              >
                {testimonial._name}
              </h3>

              <p
                className="
                  truncate
                  text-xs
                  font-medium
                "
                style={{
                  color:
                    THEME.cyan,
                }}
              >
                {
                  testimonial._subcategory
                }
              </p>
            </div>
          </div>

          <Rating
            rating={
              testimonial._rating
            }
          />
        </div>

        <div
          className="
            my-5
            h-px
          "
          style={{
            background:
              "rgba(0,140,255,0.14)",
          }}
        />

        <div
          className="
            flex
            gap-3
          "
        >
          <Quote
            size={25}
            className="
              mt-1
              shrink-0
            "
            style={{
              color:
                THEME.blue,
              fill:
                "rgba(0,140,255,0.14)",
            }}
          />

          <p
            className="
              line-clamp-4
              text-sm
              leading-7
            "
            style={{
              color:
                THEME.text,
            }}
          >
            {testimonial._text ||
              "Amazing learning experience."}
          </p>
        </div>

        <div
          className="
            mt-6
            flex
            items-center
            justify-between
            border-t
            pt-4
          "
          style={{
            borderColor:
              "rgba(0,140,255,0.12)",
          }}
        >
          <span
            className="
              text-xs
            "
            style={{
              color:
                THEME.muted,
            }}
          >
            Student testimonial
          </span>

          <ArrowRight
            size={16}
            className="
              transition
              duration-200
              group-hover:translate-x-1
            "
            style={{
              color:
                THEME.cyan,
            }}
          />
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   VIDEO TESTIMONIAL CARD
========================================================= */

function VideoTestimonialCard({
  testimonial,
  onPlay,
}) {
  return (
    <article
      className="
        group
        overflow-hidden
        rounded-3xl
        border
        transition-all
        duration-300
        hover:-translate-y-2
      "
      style={{
        background: `
          linear-gradient(
            145deg,
            #071426 0%,
            #030914 100%
          )
        `,
        borderColor:
          "rgba(0,140,255,0.30)",
        boxShadow:
          "0 18px 50px rgba(0,0,0,0.40)",
      }}
    >
      {/* VIDEO */}

      <div
        className="
          relative
          aspect-video
          overflow-hidden
          bg-black
        "
      >
        {testimonial._thumbnail ? (
          <img
            src={
              testimonial._thumbnail
            }
            alt={
              testimonial._name
            }
            className="
              h-full
              w-full
              object-cover
              transition
              duration-500
              group-hover:scale-105
            "
          />
        ) : (
          <FallbackMedia
            name={
              testimonial._name
            }
          />
        )}

        <div
          className="
            absolute
            inset-0
          "
          style={{
            background:
              "linear-gradient(180deg,rgba(0,0,0,0.12),rgba(0,0,0,0.78))",
          }}
        />

        {/* PLAY */}

        <button
          type="button"
          onClick={onPlay}
          className="
            absolute
            inset-0
            flex
            items-center
            justify-center
          "
          aria-label={`Play testimonial by ${testimonial._name}`}
        >
          <span
            className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full
              border
              text-white
              transition
              duration-300
              group-hover:scale-110
            "
            style={{
              background:
                "linear-gradient(135deg,#008CFF,#0057D9)",
              borderColor:
                "rgba(255,255,255,0.35)",
              boxShadow:
                "0 0 40px rgba(0,140,255,0.75)",
            }}
          >
            <Play
              size={23}
              fill="currentColor"
              className="ml-1"
            />
          </span>
        </button>

        {/* BADGE */}

        <span
          className="
            absolute
            left-4
            top-4
            flex
            items-center
            gap-2
            rounded-full
            border
            px-3
            py-1.5
            text-xs
            font-bold
            backdrop-blur-md
          "
          style={{
            background:
              "rgba(2,5,10,0.76)",
            borderColor:
              "rgba(0,140,255,0.45)",
            color:
              THEME.cyan,
          }}
        >
          <Video size={13} />
          Video
        </span>
      </div>

      {/* CONTENT */}

      <div className="p-6">
        <div
          className="
            flex
            items-center
            gap-3
          "
        >
          <Avatar
            src={
              testimonial._avatar
            }
            name={
              testimonial._name
            }
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
                font-bold
              "
              style={{
                color:
                  THEME.white,
              }}
            >
              {testimonial._name}
            </h3>

            <p
              className="
                truncate
                text-xs
                font-medium
              "
              style={{
                color:
                  THEME.cyan,
              }}
            >
              {testimonial._subcategory}
            </p>
          </div>

          <Rating
            rating={
              testimonial._rating
            }
          />
        </div>

        <div
          className="
            my-5
            h-px
          "
          style={{
            background:
              "rgba(0,140,255,0.14)",
          }}
        />

        <div
          className="
            flex
            gap-3
          "
        >
          <Quote
            size={25}
            className="
              mt-1
              shrink-0
            "
            style={{
              color:
                THEME.blue,
              fill:
                "rgba(0,140,255,0.14)",
            }}
          />

          <p
            className="
              line-clamp-3
              text-sm
              leading-7
            "
            style={{
              color:
                THEME.text,
            }}
          >
            {testimonial._text ||
              "Watch this student share their learning experience."}
          </p>
        </div>

        <button
          type="button"
          onClick={onPlay}
          className="
            mt-5
            flex
            items-center
            gap-2
            text-sm
            font-semibold
            transition-all
            duration-200
            hover:gap-3
          "
          style={{
            color:
              THEME.cyan,
          }}
        >
          <Play
            size={15}
            fill="currentColor"
          />

          Watch Testimonial

          <ArrowRight size={15} />
        </button>
      </div>
    </article>
  );
}

/* =========================================================
   FALLBACK MEDIA
========================================================= */

function FallbackMedia({
  name,
}) {
  const initial =
    String(name || "S")
      .charAt(0)
      .toUpperCase();

  return (
    <div
      className="
        relative
        flex
        h-full
        w-full
        items-center
        justify-center
      "
      style={{
        background: `
          radial-gradient(
            circle at center,
            rgba(0,140,255,0.30),
            #071426 65%
          )
        `,
      }}
    >
      <div
        className="
          absolute
          h-44
          w-44
          rounded-full
          blur-3xl
        "
        style={{
          background:
            "rgba(56,215,255,0.12)",
        }}
      />

      <div
        className="
          relative
          flex
          h-20
          w-20
          items-center
          justify-center
          rounded-full
          border
          text-2xl
          font-bold
        "
        style={{
          background:
            "rgba(0,140,255,0.15)",
          borderColor:
            "rgba(0,140,255,0.45)",
          color:
            THEME.cyan,
          boxShadow:
            "0 0 30px rgba(0,140,255,0.25)",
        }}
      >
        {initial}
      </div>
    </div>
  );
}

/* =========================================================
   VIDEO MODAL
========================================================= */

function VideoModal({
  testimonial,
  onClose,
}) {
  return (
    <div
      className="
        fixed
        inset-0
        z-[9999]
        flex
        items-center
        justify-center
        bg-black/90
        p-4
        backdrop-blur-md
        sm:p-8
      "
      onClick={onClose}
    >
      <div
        className="
          relative
          w-full
          max-w-5xl
          overflow-hidden
          rounded-3xl
          border
        "
        style={{
          background:
            "linear-gradient(145deg,#071426,#030914)",
          borderColor:
            "rgba(0,140,255,0.45)",
          boxShadow:
            "0 0 80px rgba(0,140,255,0.25)",
        }}
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        {/* CLOSE */}

        <button
          type="button"
          onClick={onClose}
          className="
            absolute
            right-4
            top-4
            z-20
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            border
            text-white
            backdrop-blur-md
            transition
            hover:scale-105
          "
          style={{
            background:
              "rgba(0,0,0,0.70)",
            borderColor:
              "rgba(56,215,255,0.35)",
          }}
          aria-label="Close video"
        >
          <X size={20} />
        </button>

        {/* VIDEO */}

        <div className="bg-black">
          <video
            src={
              testimonial._video
            }
            poster={
              testimonial._thumbnail ||
              undefined
            }
            controls
            autoPlay
            playsInline
            className="
              max-h-[70vh]
              w-full
              object-contain
            "
          />
        </div>

        {/* DETAILS */}

        <div className="p-6 sm:p-7">
          <div
            className="
              flex
              items-center
              gap-3
            "
          >
            <Avatar
              src={
                testimonial._avatar
              }
              name={
                testimonial._name
              }
            />

            <div>
              <h3
                className="font-bold"
                style={{
                  color:
                    THEME.white,
                }}
              >
                {testimonial._name}
              </h3>

              <p
                className="text-sm"
                style={{
                  color:
                    THEME.cyan,
                }}
              >
                {
                  testimonial._subcategory
                }
              </p>
            </div>
          </div>

          {testimonial._text && (
            <p
              className="
                mt-5
                text-sm
                leading-7
              "
              style={{
                color:
                  THEME.text,
              }}
            >
              {testimonial._text}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyState({
  activeFilter,
  searchQuery,
  content,
  onClear,
}) {
  const message =
    activeFilter === "image"
      ? content.emptyImage
      : activeFilter === "video"
        ? content.emptyVideo
        : content.emptyAll;

  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        px-6
        py-20
        text-center
      "
      style={{
        background: `
          linear-gradient(
            145deg,
            #071426,
            #030914
          )
        `,
        borderColor:
          "rgba(0,140,255,0.22)",
        boxShadow:
          "0 0 45px rgba(0,140,255,0.07)",
      }}
    >
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-40
          w-72
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          blur-3xl
        "
        style={{
          background:
            "rgba(0,140,255,0.10)",
        }}
      />

      <div
        className="
          relative
          mx-auto
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-full
          border
        "
        style={{
          background:
            "rgba(0,140,255,0.10)",
          borderColor:
            "rgba(0,140,255,0.30)",
          color:
            THEME.cyan,
          boxShadow:
            "0 0 25px rgba(0,140,255,0.18)",
        }}
      >
        {activeFilter ===
        "video" ? (
          <Video size={25} />
        ) : activeFilter ===
          "image" ? (
          <ImageIcon size={25} />
        ) : (
          <Search size={25} />
        )}
      </div>

      <h3
        className="
          relative
          mt-5
          text-xl
          font-bold
        "
        style={{
          color:
            THEME.white,
        }}
      >
        {message}
      </h3>

      <p
        className="
          relative
          mx-auto
          mt-2
          max-w-md
          text-sm
        "
        style={{
          color:
            THEME.muted,
        }}
      >
        {searchQuery
          ? `No testimonials match "${searchQuery}".`
          : "There are no testimonials available for this filter yet."}
      </p>

      {(searchQuery ||
        activeFilter !== "all") && (
        <button
          type="button"
          onClick={onClear}
          className="
            relative
            mt-6
            rounded-xl
            px-5
            py-3
            text-sm
            font-semibold
            transition-all
            duration-200
            hover:-translate-y-0.5
          "
          style={{
            background:
              "linear-gradient(135deg,#008CFF,#0057D9)",
            color:
              "#FFFFFF",
            boxShadow:
              "0 0 25px rgba(0,140,255,0.30)",
          }}
        >
          View All Testimonials
        </button>
      )}
    </div>
  );
}