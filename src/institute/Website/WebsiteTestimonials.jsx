

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
// } from "lucide-react";
// import { getInstituteTestimonials } from "../../services/testimonialService";

// /* =========================================================
//    WEBSITE TESTIMONIALS — BLACK + RADIANT BLUE THEME
//    ALL TEXT COLORS: WHITE
// ========================================================= */

// const THEME = {
//   page: "#000000",
//   page2: "#000000",
//   card: "#071426",
//   card2: "#091B31",
//   blue: "#008CFF",
//   blueDark: "#0057D9",
//   cyan: "#38D7FF",
//   white: "#FFFFFF",
//   text: "#FFFFFF",
//   muted: "#FFFFFF",
//   border: "rgba(0,140,255,0.25)",
//   borderStrong: "rgba(56,215,255,0.40)",
// };

// const DEFAULT_CONTENT = {
//   eyebrow: "TESTIMONIALS",
//   heading: "What Our Students Say",
//   subheading:
//     "Real experiences from learners who turned their passion into progress.",
//   searchPlaceholder: "Search by name, testimonial or subcategory...",
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

// /* =========================================================
//    HELPERS
// ========================================================= */

// const getValue = (...values) => {
//   for (const value of values) {
//     if (value !== undefined && value !== null && value !== "") {
//       return value;
//     }
//   }
//   return null;
// };

// const fontFamily = (font) =>
//   font ? `'${font}', sans-serif` : "Inter, sans-serif";

// const normalizeBranding = (branding = {}) => ({
//   pageBackgroundColor: THEME.page,
//   cardBackgroundColor: THEME.card,
//   headingColor: THEME.white,
//   subheadingColor: THEME.white,
//   textColor: THEME.white,
//   mutedColor: THEME.white,
//   primaryColor: THEME.blue,
//   secondaryColor: THEME.cyan,
//   borderColor: THEME.border,
//   buttonTextColor: "#FFFFFF",
//   navbarColor: "#000000",
//   footerBackgroundColor: "#000000",
//   fontHeading:
//     branding?.fontHeading || branding?.font_heading || "Inter",
//   fontSubheading:
//     branding?.fontSubheading || branding?.font_subheading || "Inter",
//   fontBody: branding?.fontBody || branding?.font_body || "Inter",
//   headingWeight:
//     branding?.headingWeight || branding?.heading_weight || 700,
//   headingLineHeight:
//     branding?.headingLineHeight || branding?.heading_line_height || 1.15,
//   bodyWeight: branding?.bodyWeight || branding?.body_weight || 400,
//   bodyLineHeight:
//     branding?.bodyLineHeight || branding?.body_line_height || 1.6,
// });

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
//     emptyAll: DEFAULT_CONTENT.emptyAll,
//     emptyImage: DEFAULT_CONTENT.emptyImage,
//     emptyVideo: DEFAULT_CONTENT.emptyVideo,
//   };
// };

// /* =========================================================
//    BANNER HELPERS
// ========================================================= */

// const isActiveBanner = (banner) => {
//   const value = banner?.is_active ?? banner?.isActive;

//   if (value === undefined || value === null) return true;

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

// /* =========================================================
//    TESTIMONIAL HELPERS
// ========================================================= */

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
//     testimonial?.rating ?? testimonial?.stars ?? 5
//   );

//   if (Number.isNaN(value)) return 5;

//   return Math.min(5, Math.max(0, Math.round(value)));
// };

// const normalizeTestimonials = (list = []) =>
//   list.filter(Boolean).map((testimonial, index) => {
//     const image = getImageUrl(testimonial);
//     const video = getVideoUrl(testimonial);

//     return {
//       ...testimonial,
//       _id: getId(testimonial, index),
//       _type: video ? "video" : "image",
//       _name: getStudentName(testimonial),
//       _subcategory: getSubcategory(testimonial),
//       _text: getTestimonialText(testimonial),
//       _avatar: getAvatar(testimonial),
//       _image: image,
//       _video: video,
//       _thumbnail: getVideoThumbnail(testimonial),
//       _rating: getRating(testimonial),
//     };
//   });

// /* =========================================================
//    MAIN COMPONENT
// ========================================================= */

// export default function WebsiteTestimonials() {
//   const context = useOutletContext() || {};

//   const {
//     branding: outletBranding = {},
//     content: outletContent = {},
//     website = {},
//     institute = {},
//     banners = [],
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

//   /* FETCH TESTIMONIALS */

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
//         } else if (Array.isArray(result?.data?.testimonials)) {
//           list = result.data.testimonials;
//         }

//         setTestimonials(normalizeTestimonials(list));
//       } catch (err) {
//         console.error("Testimonials API Error:", err);

//         if (!mounted) return;

//         setTestimonials([]);
//         setError(
//           err?.response?.data?.message ||
//             err?.message ||
//             "Failed to load testimonials."
//         );
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     };

//     loadTestimonials();

//     return () => {
//       mounted = false;
//     };
//   }, []);

//   /* DASHBOARD BANNER */

//   const testimonialBanner = useMemo(() => {
//     if (!Array.isArray(banners)) return null;

//     const activeBanners = banners
//       .filter(isActiveBanner)
//       .slice()
//       .sort(
//         (a, b) =>
//           Number(a?.display_order ?? a?.displayOrder ?? 0) -
//           Number(b?.display_order ?? b?.displayOrder ?? 0)
//       );

//     const testimonialTypes = ["TESTIMONIAL", "TESTIMONIALS"];

//     const testimonial = activeBanners.find((banner) => {
//       const type = String(
//         banner?.banner_type ?? banner?.bannerType ?? ""
//       )
//         .trim()
//         .toUpperCase();

//       return testimonialTypes.includes(type) && getBannerImage(banner);
//     });

//     if (testimonial) return testimonial;

//     const homeBanner = activeBanners.find((banner) => {
//       const type = String(
//         banner?.banner_type ?? banner?.bannerType ?? ""
//       )
//         .trim()
//         .toUpperCase();

//       return type === "HOME" && getBannerImage(banner);
//     });

//     if (homeBanner) return homeBanner;

//     return (
//       activeBanners.find((banner) => getBannerImage(banner)) || null
//     );
//   }, [banners]);

//   const bannerImage = getBannerImage(testimonialBanner);

//   const instituteName =
//     institute?.name ||
//     institute?.institute_name ||
//     website?.institute?.name ||
//     website?.name ||
//     "Our Institute";

//   /* FILTER */

//   const filteredTestimonials = useMemo(() => {
//     const query = searchQuery.trim().toLowerCase();

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

//       const matchesSearch = !query || searchableText.includes(query);

//       return matchesType && matchesSearch;
//     });
//   }, [testimonials, activeFilter, searchQuery]);

//   const imageCount = useMemo(
//     () => testimonials.filter((item) => item._type === "image").length,
//     [testimonials]
//   );

//   const videoCount = useMemo(
//     () => testimonials.filter((item) => item._type === "video").length,
//     [testimonials]
//   );

//   /* SHARED STYLES */

//   const headingStyle = {
//     color: "#FFFFFF",
//     fontFamily: fontFamily(branding.fontHeading),
//     fontWeight: branding.headingWeight,
//     lineHeight: branding.headingLineHeight,
//   };

//   const bodyStyle = {
//     color: "#FFFFFF",
//     fontFamily: fontFamily(branding.fontBody),
//     fontWeight: branding.bodyWeight,
//     lineHeight: branding.bodyLineHeight,
//   };

//   const cardStyle = {
//     background: "linear-gradient(145deg, #071426 0%, #030914 100%)",
//     border: "1px solid rgba(0,140,255,0.25)",
//     boxShadow:
//       "0 20px 60px rgba(0,0,0,0.45), 0 0 25px rgba(0,140,255,0.05)",
//   };

//   /* LOADING */

//   if (loading) {
//     return (
//       <main
//         className="min-h-screen w-full overflow-hidden bg-black"
//         style={{ background: "#000000" }}
//       />
//     );
//   }

//   /* ERROR */

//   if (error) {
//     return (
//       <main
//         className="flex min-h-screen items-center justify-center bg-black px-5"
//         style={{ background: THEME.page }}
//       >
//         <div
//           className="w-full max-w-lg rounded-3xl border p-10 text-center"
//           style={cardStyle}
//         >
//           <Quote
//             size={44}
//             className="mx-auto"
//             style={{ color: THEME.cyan }}
//           />

//           <h1
//             className="mt-5 text-2xl font-bold"
//             style={headingStyle}
//           >
//             Unable to load testimonials
//           </h1>

//           <p className="mt-3 text-sm" style={{ color: "#FFFFFF" }}>
//             {error}
//           </p>
//         </div>
//       </main>
//     );
//   }

//   /* MAIN PAGE */

//   return (
//     <main
//       className="min-h-screen w-full overflow-hidden bg-black"
//       style={{ background: "#000000" }}
//     >
//       {/* SEARCH + FILTER */}

//       <section className="relative z-20 w-full px-4 pt-4 sm:px-6 sm:pt-5 lg:px-8 lg:pt-6">
//         <div className="flex w-full items-center justify-between gap-6">
//           {/* SEARCH BAR */}

//           <div className="w-full max-w-2xl">
//             <div className="relative">
//               <Search
//                 size={20}
//                 className="absolute left-5 top-1/2 -translate-y-1/2"
//                 style={{ color: THEME.cyan }}
//               />

//               <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={(event) => setSearchQuery(event.target.value)}
//                 placeholder={content.searchPlaceholder}
//                 className="w-full rounded-lg border bg-transparent py-4 pl-13 pr-5 text-sm text-white outline-none placeholder:text-white"
//                 style={{
//                   background: "#000000",
//                   borderColor: "rgba(0,140,255,0.30)",
//                   color: "#FFFFFF",
//                 }}
//               />
//             </div>
//           </div>

//           {/* FILTER BUTTONS */}

//           <div className="flex shrink-0 items-center gap-3">
//             <FilterButton
//               label={content.all}
//               count={testimonials.length}
//               value="all"
//               activeFilter={activeFilter}
//               setActiveFilter={setActiveFilter}
//             />

//             <FilterButton
//               label={content.image}
//               icon={<ImageIcon size={17} />}
//               count={imageCount}
//               value="image"
//               activeFilter={activeFilter}
//               setActiveFilter={setActiveFilter}
//             />

//             <FilterButton
//               label={content.video}
//               icon={<Video size={17} />}
//               count={videoCount}
//               value="video"
//               activeFilter={activeFilter}
//               setActiveFilter={setActiveFilter}
//             />
//           </div>
//         </div>
//       </section>

//       {/* TESTIMONIALS */}

//       <section className="px-4 pb-24 pt-5 sm:px-6 lg:px-8">
//         <div className="mx-auto max-w-7xl">
//           {/* HEADING + SUBHEADING */}

//           <div className="mb-5 text-left">
//             <h2
//               className="text-3xl font-bold sm:text-4xl lg:text-5xl"
//               style={{ ...headingStyle, textAlign: "left" }}
//             >
//               {activeFilter === "all"
//                 ? content.sectionHeading
//                 : activeFilter === "image"
//                   ? "Image Testimonials"
//                   : "Video Testimonials"}
//             </h2>

//             <p
//               className="mt-4 max-w-2xl text-sm text-white sm:text-base"
//               style={{
//                 color: "#FFFFFF",
//                 lineHeight: 1.7,
//                 textAlign: "left",
//               }}
//             >
//               {activeFilter === "all"
//                 ? content.sectionSubheading
//                 : activeFilter === "image"
//                   ? "Explore visual stories and feedback from our students."
//                   : "Watch students share their learning experiences."}
//             </p>
//           </div>

//           {/* GRID */}

//           {filteredTestimonials.length > 0 ? (
//             <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
//               {filteredTestimonials.map((testimonial) =>
//                 testimonial._type === "video" ? (
//                   <VideoTestimonialCard
//                     key={testimonial._id}
//                     testimonial={testimonial}
//                     onPlay={() => setSelectedVideo(testimonial)}
//                   />
//                 ) : (
//                   <ImageTestimonialCard
//                     key={testimonial._id}
//                     testimonial={testimonial}
//                   />
//                 )
//               )}
//             </div>
//           ) : (
//             <EmptyState
//               activeFilter={activeFilter}
//               searchQuery={searchQuery}
//               content={content}
//               onClear={() => {
//                 setSearchQuery("");
//                 setActiveFilter("all");
//               }}
//             />
//           )}
//         </div>
//       </section>

//       {/* VIDEO MODAL */}

//       {selectedVideo && (
//         <VideoModal
//           testimonial={selectedVideo}
//           onClose={() => setSelectedVideo(null)}
//         />
//       )}

//       {/* BOTTOM RADIANT LINE */}

//       <div
//         className="h-px w-full"
//         style={{
//           background:
//             "linear-gradient(90deg, transparent, #008CFF, #38D7FF, #008CFF, transparent)",
//           boxShadow: "0 0 20px rgba(0,140,255,0.65)",
//         }}
//       />
//     </main>
//   );
// }

// /* =========================================================
//    HERO CONTENT
// ========================================================= */

// function HeroContent({ content, instituteName, headingStyle }) {
//   return (
//     <div>
//       <div className="mb-5 flex items-center gap-3">
//         <span
//           className="h-px w-12"
//           style={{ background: THEME.cyan }}
//         />

//         <p
//           className="text-xs font-bold uppercase tracking-[0.30em]"
//           style={{ color: THEME.cyan }}
//         >
//           {content.eyebrow}
//         </p>
//       </div>

//       <h1
//         className="max-w-3xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl"
//         style={{
//           ...headingStyle,
//           textShadow: "0 0 35px rgba(0,140,255,0.20)",
//         }}
//       >
//         {content.heading}
//       </h1>

//       <p
//         className="mt-6 max-w-2xl text-base leading-7 text-white sm:text-lg"
//         style={{ color: "#FFFFFF" }}
//       >
//         {content.subheading}
//       </p>

//       <div className="mt-7 flex flex-wrap items-center gap-3">
//         <span
//           className="rounded-full border px-4 py-2 text-xs font-semibold"
//           style={{
//             color: THEME.cyan,
//             background: "rgba(0,140,255,0.10)",
//             borderColor: "rgba(0,140,255,0.35)",
//             boxShadow: "0 0 18px rgba(0,140,255,0.08)",
//           }}
//         >
//           Real Student Stories
//         </span>

//         <span
//           className="rounded-full border px-4 py-2 text-xs font-semibold"
//           style={{
//             color: "#FFFFFF",
//             background: "rgba(56,215,255,0.06)",
//             borderColor: "rgba(56,215,255,0.25)",
//           }}
//         >
//           {instituteName}
//         </span>
//       </div>
//     </div>
//   );
// }

// /* =========================================================
//    FILTER BUTTON
// ========================================================= */

// function FilterButton({
//   label,
//   icon,
//   count,
//   value,
//   activeFilter,
//   setActiveFilter,
// }) {
//   const active = activeFilter === value;

//   return (
//     <button
//       type="button"
//       onClick={() => setActiveFilter(value)}
//       className="flex min-w-0 items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
//       style={{
//         background: active
//           ? "linear-gradient(135deg,#008CFF,#0057D9)"
//           : "#000000",
//         borderColor: active
//           ? THEME.blue
//           : "rgba(0,140,255,0.25)",
//         color: "#FFFFFF",
//         boxShadow: active
//           ? "0 0 28px rgba(0,140,255,0.32)"
//           : "none",
//       }}
//     >
//       {icon}
//       <span>{label}</span>

//       <span
//         className="rounded-full px-1.5 py-0.5 text-[10px]"
//         style={{
//           background: active
//             ? "rgba(255,255,255,0.15)"
//             : "rgba(0,140,255,0.10)",
//           color: "#FFFFFF",
//         }}
//       >
//         {count}
//       </span>
//     </button>
//   );
// }

// /* =========================================================
//    AVATAR
// ========================================================= */

// function Avatar({ src, name }) {
//   const [failed, setFailed] = useState(false);

//   const initials = String(name || "S")
//     .trim()
//     .split(/\s+/)
//     .map((word) => word.charAt(0))
//     .slice(0, 2)
//     .join("")
//     .toUpperCase();

//   return (
//     <div
//       className="h-11 w-11 shrink-0 overflow-hidden rounded-full border-2"
//       style={{
//         borderColor: "rgba(56,215,255,0.50)",
//         background: "linear-gradient(135deg,#008CFF,#062B55)",
//         boxShadow: "0 0 18px rgba(0,140,255,0.20)",
//       }}
//     >
//       {src && !failed ? (
//         <img
//           src={src}
//           alt={name}
//           className="h-full w-full object-cover"
//           onError={() => setFailed(true)}
//         />
//       ) : (
//         <div
//           className="flex h-full w-full items-center justify-center text-xs font-bold"
//           style={{ color: "#FFFFFF" }}
//         >
//           {initials}
//         </div>
//       )}
//     </div>
//   );
// }

// /* =========================================================
//    RATING
// ========================================================= */

// function Rating({ rating }) {
//   return (
//     <div className="flex shrink-0 gap-0.5">
//       {[1, 2, 3, 4, 5].map((star) => (
//         <Star
//           key={star}
//           size={13}
//           fill={star <= rating ? THEME.cyan : "transparent"}
//           style={{
//             color: THEME.cyan,
//             filter:
//               star <= rating
//                 ? "drop-shadow(0 0 4px rgba(56,215,255,0.60))"
//                 : "none",
//           }}
//         />
//       ))}
//     </div>
//   );
// }

// /* =========================================================
//    IMAGE TESTIMONIAL CARD
// ========================================================= */

// function ImageTestimonialCard({ testimonial }) {
//   const image = testimonial._image || testimonial._avatar;

//   return (
//     <article
//       className="group overflow-hidden rounded-lg border transition-all duration-300 hover:-translate-y-2"
//       style={{
//         background: "#000000",
//         borderColor: "rgba(0,140,255,0.25)",
//         boxShadow: "0 18px 50px rgba(0,0,0,0.40)",
//       }}
//     >
//       {/* IMAGE */}

//       <div className="relative aspect-[16/10] overflow-hidden bg-black">
//         {image ? (
//           <img
//             src={image}
//             alt={testimonial._name}
//             className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
//           />
//         ) : (
//           <FallbackMedia name={testimonial._name} />
//         )}

//         <div
//           className="absolute inset-0"
//           style={{
//             background:
//               "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.90) 100%)",
//           }}
//         />

//         <span
//           className="absolute left-4 top-4 flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold backdrop-blur-md"
//           style={{
//             background: "rgba(0,0,0,0.80)",
//             borderColor: "rgba(0,140,255,0.45)",
//             color: THEME.cyan,
//             boxShadow: "0 0 18px rgba(0,140,255,0.18)",
//           }}
//         >
//           <ImageIcon size={13} />
//           Image
//         </span>

//         <div
//           className="pointer-events-none absolute bottom-0 left-1/2 h-16 w-2/3 -translate-x-1/2 blur-3xl"
//           style={{ background: "rgba(0,140,255,0.18)" }}
//         />
//       </div>

//       {/* CONTENT */}

//       <div className="bg-black p-6">
//         <div className="flex items-start justify-between gap-4">
//           <div className="flex min-w-0 items-center gap-3">
//             <Avatar
//               src={testimonial._avatar}
//               name={testimonial._name}
//             />

//             <div className="min-w-0">
//               <h3
//                 className="truncate text-base font-bold"
//                 style={{ color: "#FFFFFF" }}
//               >
//                 {testimonial._name}
//               </h3>

//               <p
//                 className="truncate text-xs font-medium"
//                 style={{ color: THEME.cyan }}
//               >
//                 {testimonial._subcategory}
//               </p>
//             </div>
//           </div>

//           <Rating rating={testimonial._rating} />
//         </div>

//         <div
//           className="my-5 h-px"
//           style={{ background: "rgba(0,140,255,0.14)" }}
//         />

//         <div className="flex gap-3">
//           <Quote
//             size={25}
//             className="mt-1 shrink-0"
//             style={{
//               color: THEME.blue,
//               fill: "rgba(0,140,255,0.14)",
//             }}
//           />

//           <p
//             className="line-clamp-4 text-sm leading-7"
//             style={{ color: "#FFFFFF" }}
//           >
//             {testimonial._text || "Amazing learning experience."}
//           </p>
//         </div>
//       </div>
//     </article>
//   );
// }

// /* =========================================================
//    VIDEO TESTIMONIAL CARD
// ========================================================= */

// function VideoTestimonialCard({ testimonial, onPlay }) {
//   return (
//     <article
//       className="group overflow-hidden rounded-lg border transition-all duration-300 hover:-translate-y-2"
//       style={{
//         background: "#000000",
//         borderColor: "rgba(0,140,255,0.30)",
//         boxShadow: "0 18px 50px rgba(0,0,0,0.40)",
//       }}
//     >
//       {/* VIDEO THUMBNAIL */}

//       <div className="relative aspect-video overflow-hidden bg-black">
//         {testimonial._thumbnail ? (
//           <img
//             src={testimonial._thumbnail}
//             alt={testimonial._name}
//             className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
//           />
//         ) : (
//           <FallbackMedia name={testimonial._name} />
//         )}

//         <div
//           className="absolute inset-0"
//           style={{
//             background:
//               "linear-gradient(180deg,rgba(0,0,0,0.12),rgba(0,0,0,0.78))",
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
//               background: "linear-gradient(135deg,#008CFF,#0057D9)",
//               borderColor: "rgba(255,255,255,0.35)",
//               boxShadow: "0 0 40px rgba(0,140,255,0.75)",
//             }}
//           >
//             <Play size={23} fill="currentColor" className="ml-1" />
//           </span>
//         </button>

//         <span
//           className="absolute left-4 top-4 flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold backdrop-blur-md"
//           style={{
//             background: "rgba(0,0,0,0.80)",
//             borderColor: "rgba(0,140,255,0.45)",
//             color: THEME.cyan,
//             boxShadow: "0 0 18px rgba(0,140,255,0.18)",
//           }}
//         >
//           <Video size={13} />
//           Video
//         </span>

//         <div
//           className="pointer-events-none absolute bottom-0 left-1/2 h-16 w-2/3 -translate-x-1/2 blur-3xl"
//           style={{ background: "rgba(0,140,255,0.18)" }}
//         />
//       </div>

//       {/* CONTENT */}

//       <div className="bg-black p-6">
//         <div className="flex items-center gap-3">
//           <Avatar
//             src={testimonial._avatar}
//             name={testimonial._name}
//           />

//           <div className="min-w-0 flex-1">
//             <h3
//               className="truncate text-base font-bold"
//               style={{ color: "#FFFFFF" }}
//             >
//               {testimonial._name}
//             </h3>

//             <p
//               className="truncate text-xs font-medium"
//               style={{ color: THEME.cyan }}
//             >
//               {testimonial._subcategory}
//             </p>
//           </div>

//           <Rating rating={testimonial._rating} />
//         </div>

//         <div
//           className="my-5 h-px"
//           style={{ background: "rgba(0,140,255,0.14)" }}
//         />

//         <div className="flex gap-3">
//           <Quote
//             size={25}
//             className="mt-1 shrink-0"
//             style={{
//               color: THEME.blue,
//               fill: "rgba(0,140,255,0.14)",
//             }}
//           />

//           <p
//             className="line-clamp-3 text-sm leading-7"
//             style={{ color: "#FFFFFF" }}
//           >
//             {testimonial._text ||
//               "Watch this student share their learning experience."}
//           </p>
//         </div>
//       </div>
//     </article>
//   );
// }

// /* =========================================================
//    FALLBACK MEDIA
// ========================================================= */

// function FallbackMedia({ name }) {
//   const initial = String(name || "S").charAt(0).toUpperCase();

//   return (
//     <div
//       className="relative flex h-full w-full items-center justify-center bg-black"
//       style={{ background: "#000000" }}
//     >
//       <div
//         className="relative flex h-20 w-20 items-center justify-center rounded-full border text-2xl font-bold"
//         style={{
//           background: "#000000",
//           borderColor: "rgba(0,140,255,0.45)",
//           color: THEME.cyan,
//           boxShadow: "none",
//         }}
//       >
//         {initial}
//       </div>
//     </div>
//   );
// }

// /* =========================================================
//    VIDEO MODAL
// ========================================================= */

// function VideoModal({ testimonial, onClose }) {
//   return (
//     <div
//       className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md sm:p-8"
//       onClick={onClose}
//     >
//       <div
//         className="relative w-full max-w-5xl overflow-hidden rounded-3xl border"
//         style={{
//           background: "linear-gradient(145deg,#071426,#030914)",
//           borderColor: "rgba(0,140,255,0.45)",
//           boxShadow: "0 0 80px rgba(0,140,255,0.25)",
//         }}
//         onClick={(event) => event.stopPropagation()}
//       >
//         <button
//           type="button"
//           onClick={onClose}
//           className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border text-white backdrop-blur-md transition hover:scale-105"
//           style={{
//             background: "rgba(0,0,0,0.70)",
//             borderColor: "rgba(56,215,255,0.35)",
//           }}
//           aria-label="Close video"
//         >
//           <X size={20} />
//         </button>

//         <div className="bg-black">
//           <video
//             src={testimonial._video}
//             poster={testimonial._thumbnail || undefined}
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
//             />

//             <div>
//               <h3
//                 className="font-bold"
//                 style={{ color: "#FFFFFF" }}
//               >
//                 {testimonial._name}
//               </h3>

//               <p
//                 className="text-sm"
//                 style={{ color: THEME.cyan }}
//               >
//                 {testimonial._subcategory}
//               </p>
//             </div>
//           </div>

//           {testimonial._text && (
//             <p
//               className="mt-5 text-sm leading-7"
//               style={{ color: "#FFFFFF" }}
//             >
//               {testimonial._text}
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// /* =========================================================
//    EMPTY STATE
// ========================================================= */

// function EmptyState({
//   activeFilter,
//   searchQuery,
//   content,
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
//       className="relative overflow-hidden rounded-3xl border px-6 py-20 text-center"
//       style={{
//         background: "linear-gradient(145deg,#071426,#030914)",
//         borderColor: "rgba(0,140,255,0.22)",
//         boxShadow: "0 0 45px rgba(0,140,255,0.07)",
//       }}
//     >
//       <div
//         className="pointer-events-none absolute left-1/2 top-0 h-40 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
//         style={{ background: "rgba(0,140,255,0.10)" }}
//       />

//       <div
//         className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full border"
//         style={{
//           background: "rgba(0,140,255,0.10)",
//           borderColor: "rgba(0,140,255,0.30)",
//           color: THEME.cyan,
//           boxShadow: "0 0 25px rgba(0,140,255,0.18)",
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
//         className="relative mt-5 text-xl font-bold"
//         style={{ color: "#FFFFFF" }}
//       >
//         {message}
//       </h3>

//       <p
//         className="relative mx-auto mt-2 max-w-md text-sm"
//         style={{ color: "#FFFFFF" }}
//       >
//         {searchQuery
//           ? `No testimonials match "${searchQuery}".`
//           : "There are no testimonials available for this filter yet."}
//       </p>

//       {(searchQuery || activeFilter !== "all") && (
//         <button
//           type="button"
//           onClick={onClear}
//           className="relative mt-6 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
//           style={{
//             background: "linear-gradient(135deg,#008CFF,#0057D9)",
//             color: "#FFFFFF",
//             boxShadow: "0 0 25px rgba(0,140,255,0.30)",
//           }}
//         >
//           View All Testimonials
//         </button>
//       )}
//     </div>
//   );
// }






import React, { useEffect, useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  Search,
  Play,
  Image as ImageIcon,
  Video,
  Star,
  Quote,
  X,
} from "lucide-react";
import { getInstituteTestimonials } from "../../services/testimonialService";

/* =========================================================
   WEBSITE TESTIMONIALS — BLACK + RADIANT BLUE THEME
   ALL TEXT COLORS: WHITE
========================================================= */

const THEME = {
  page: "#000000",
  page2: "#000000",
  card: "#071426",
  card2: "#091B31",
  blue: "#008CFF",
  blueDark: "#0057D9",
  cyan: "#38D7FF",
  white: "#FFFFFF",
  text: "#FFFFFF",
  muted: "#FFFFFF",
  border: "rgba(0,140,255,0.25)",
  borderStrong: "rgba(56,215,255,0.40)",
};

const DEFAULT_CONTENT = {
  eyebrow: "TESTIMONIALS",
  heading: "What Our Students Say",
  subheading:
    "Real experiences from learners who turned their passion into progress.",
  searchPlaceholder: "Search by name, testimonial or subcategory...",
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
    if (value !== undefined && value !== null && value !== "") {
      return value;
    }
  }
  return null;
};

const fontFamily = (font) =>
  font ? `'${font}', sans-serif` : "Inter, sans-serif";

const normalizeBranding = (branding = {}) => ({
  pageBackgroundColor: THEME.page,
  cardBackgroundColor: THEME.card,
  headingColor: THEME.white,
  subheadingColor: THEME.white,
  textColor: THEME.white,
  mutedColor: THEME.white,
  primaryColor: THEME.blue,
  secondaryColor: THEME.cyan,
  borderColor: THEME.border,
  buttonTextColor: "#FFFFFF",
  navbarColor: "#000000",
  footerBackgroundColor: "#000000",
  fontHeading:
    branding?.fontHeading || branding?.font_heading || "Inter",
  fontSubheading:
    branding?.fontSubheading || branding?.font_subheading || "Inter",
  fontBody: branding?.fontBody || branding?.font_body || "Inter",
  headingWeight:
    branding?.headingWeight || branding?.heading_weight || 700,
  headingLineHeight:
    branding?.headingLineHeight || branding?.heading_line_height || 1.15,
  bodyWeight: branding?.bodyWeight || branding?.body_weight || 400,
  bodyLineHeight:
    branding?.bodyLineHeight || branding?.body_line_height || 1.6,
});

const normalizeContent = (content = {}) => {
  const source =
    content?.testimonials ||
    content?.testimonial ||
    content?.Testimonials ||
    content ||
    {};

  return {
    eyebrow: getValue(
      source?.eyebrow,
      source?.eyebrow_text,
      source?.label,
      DEFAULT_CONTENT.eyebrow
    ),
    heading: getValue(
      source?.heading,
      source?.title,
      source?.page_heading,
      DEFAULT_CONTENT.heading
    ),
    subheading: getValue(
      source?.subheading,
      source?.subtitle,
      source?.page_subheading,
      DEFAULT_CONTENT.subheading
    ),
    searchPlaceholder: getValue(
      source?.searchPlaceholder,
      source?.search_placeholder,
      DEFAULT_CONTENT.searchPlaceholder
    ),
    all: getValue(
      source?.filters?.all,
      source?.filter_all,
      DEFAULT_CONTENT.all
    ),
    image: getValue(
      source?.filters?.image,
      source?.filters?.text,
      source?.filter_image,
      source?.filter_text,
      DEFAULT_CONTENT.image
    ),
    video: getValue(
      source?.filters?.video,
      source?.filter_video,
      DEFAULT_CONTENT.video
    ),
    sectionHeading: getValue(
      source?.sectionHeading,
      source?.section_heading,
      DEFAULT_CONTENT.sectionHeading
    ),
    sectionSubheading: getValue(
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
  const value = banner?.is_active ?? banner?.isActive;

  if (value === undefined || value === null) return true;

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
  banner?.banner_url ||
  banner?.bannerUrl ||
  banner?.desktop_image_url ||
  banner?.desktopImageUrl ||
  banner?.image ||
  banner?.banner_image ||
  banner?.bannerImage ||
  banner?.url ||
  banner?.file_url ||
  banner?.fileUrl ||
  null;

const getBannerType = (banner) =>
  String(
    banner?.banner_type ??
      banner?.bannerType ??
      banner?.page ??
      banner?.page_name ??
      banner?.pageName ??
      banner?.page_type ??
      banner?.pageType ??
      banner?.section ??
      banner?.type ??
      ""
  )
    .trim()
    .toUpperCase();

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
    testimonial?.rating ?? testimonial?.stars ?? 5
  );

  if (Number.isNaN(value)) return 5;

  return Math.min(5, Math.max(0, Math.round(value)));
};

const normalizeTestimonials = (list = []) =>
  list.filter(Boolean).map((testimonial, index) => {
    const image = getImageUrl(testimonial);
    const video = getVideoUrl(testimonial);

    return {
      ...testimonial,
      _id: getId(testimonial, index),
      _type: video ? "video" : "image",
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
  } = context;

  const branding = useMemo(
    () => normalizeBranding(outletBranding),
    [outletBranding]
  );

  const content = useMemo(
    () => normalizeContent(outletContent),
    [outletContent]
  );

  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);

  /* FETCH TESTIMONIALS */

  useEffect(() => {
    let mounted = true;

    const loadTestimonials = async () => {
      try {
        setLoading(true);
        setError("");

        const result = await getInstituteTestimonials();

        if (!mounted) return;

        let list = [];

        if (Array.isArray(result)) {
          list = result;
        } else if (Array.isArray(result?.data)) {
          list = result.data;
        } else if (Array.isArray(result?.testimonials)) {
          list = result.testimonials;
        } else if (Array.isArray(result?.data?.testimonials)) {
          list = result.data.testimonials;
        }

        setTestimonials(normalizeTestimonials(list));
      } catch (err) {
        console.error("Testimonials API Error:", err);

        if (!mounted) return;

        setTestimonials([]);
        setError(
          err?.response?.data?.message ||
            err?.message ||
            "Failed to load testimonials."
        );
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadTestimonials();

    return () => {
      mounted = false;
    };
  }, []);

  /* DASHBOARD BANNER */

  const testimonialBanner = useMemo(() => {
    if (!Array.isArray(banners)) return null;

    const activeBanners = banners
      .filter(isActiveBanner)
      .slice()
      .sort(
        (a, b) =>
          Number(a?.display_order ?? a?.displayOrder ?? 0) -
          Number(b?.display_order ?? b?.displayOrder ?? 0)
      );

    const testimonialTypes = ["TESTIMONIAL", "TESTIMONIALS"];

    const testimonial = activeBanners.find((banner) => {
      const type = getBannerType(banner);

      return (
        (testimonialTypes.includes(type) ||
          type === "TESTIMONIAL PAGE" ||
          type === "TESTIMONIALS PAGE") &&
        getBannerImage(banner)
      );
    });

    if (testimonial) return testimonial;

    const homeBanner = activeBanners.find((banner) => {
      const type = getBannerType(banner);

      return ["HOME", "HOMEPAGE", "MAIN"].includes(type) && getBannerImage(banner);
    });

    if (homeBanner) return homeBanner;

    return (
      activeBanners.find((banner) => getBannerImage(banner)) || null
    );
  }, [banners]);

  const bannerImage = getBannerImage(testimonialBanner);

  const instituteName =
    institute?.name ||
    institute?.institute_name ||
    website?.institute?.name ||
    website?.name ||
    "Our Institute";

  /* FILTER */

  const filteredTestimonials = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return testimonials.filter((testimonial) => {
      const matchesType =
        activeFilter === "all" ||
        testimonial._type === activeFilter;

      const searchableText = [
        testimonial._name,
        testimonial._subcategory,
        testimonial._text,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch = !query || searchableText.includes(query);

      return matchesType && matchesSearch;
    });
  }, [testimonials, activeFilter, searchQuery]);

  const imageCount = useMemo(
    () => testimonials.filter((item) => item._type === "image").length,
    [testimonials]
  );

  const videoCount = useMemo(
    () => testimonials.filter((item) => item._type === "video").length,
    [testimonials]
  );

  /* SHARED STYLES */

  const headingStyle = {
    color: "#FFFFFF",
    fontFamily: fontFamily(branding.fontHeading),
    fontWeight: branding.headingWeight,
    lineHeight: branding.headingLineHeight,
  };

  const bodyStyle = {
    color: "#FFFFFF",
    fontFamily: fontFamily(branding.fontBody),
    fontWeight: branding.bodyWeight,
    lineHeight: branding.bodyLineHeight,
  };

  const cardStyle = {
    background: "linear-gradient(145deg, #071426 0%, #030914 100%)",
    border: "1px solid rgba(0,140,255,0.25)",
    boxShadow:
      "0 20px 60px rgba(0,0,0,0.45), 0 0 25px rgba(0,140,255,0.05)",
  };

  /* LOADING */

  if (loading) {
    return (
      <main
        className="min-h-screen w-full overflow-hidden bg-black"
        style={{ background: "#000000" }}
      />
    );
  }

  /* ERROR */

  if (error) {
    return (
      <main
        className="flex min-h-screen items-center justify-center bg-black px-5"
        style={{ background: THEME.page }}
      >
        <div
          className="w-full max-w-lg rounded-3xl border p-10 text-center"
          style={cardStyle}
        >
          <Quote
            size={44}
            className="mx-auto"
            style={{ color: THEME.cyan }}
          />

          <h1
            className="mt-5 text-2xl font-bold"
            style={headingStyle}
          >
            Unable to load testimonials
          </h1>

          <p className="mt-3 text-sm" style={{ color: "#FFFFFF" }}>
            {error}
          </p>
        </div>
      </main>
    );
  }

  /* MAIN PAGE */

  return (
    <main
      className="min-h-screen w-full overflow-hidden bg-black"
      style={{ background: "#000000" }}
    >
      {/* TESTIMONIAL PAGE BANNER FROM INSTITUTE BANNERS */}
      {bannerImage && (
        <section
          aria-label="Testimonials page banner"
          className="relative w-full overflow-hidden bg-black"
          style={{ background: "#000000" }}
        >
          <img
            src={bannerImage}
            alt={testimonialBanner?.banner_title || testimonialBanner?.title || "Testimonials banner"}
            className="block h-[180px] w-full object-cover sm:h-[240px] lg:h-[320px]"
            loading="eager"
            onError={(event) => {
              console.error("Testimonials banner image failed to load:", bannerImage);
              event.currentTarget.style.display = "none";
            }}
          />
        </section>
      )}

      {/* SEARCH + FILTER */}

      <section className="relative z-20 w-full px-4 pt-4 sm:px-6 sm:pt-5 lg:px-8 lg:pt-6">
        <div className="flex w-full items-center justify-between gap-6">
          {/* SEARCH BAR */}

          <div className="w-full max-w-2xl">
            <div className="relative">
              <Search
                size={20}
                className="absolute left-5 top-1/2 -translate-y-1/2"
                style={{ color: THEME.cyan }}
              />

              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder={content.searchPlaceholder}
                className="w-full rounded-lg border bg-transparent py-4 pl-13 pr-5 text-sm text-white outline-none placeholder:text-white"
                style={{
                  background: "#000000",
                  borderColor: "rgba(0,140,255,0.30)",
                  color: "#FFFFFF",
                }}
              />
            </div>
          </div>

          {/* FILTER BUTTONS */}

          <div className="flex shrink-0 items-center gap-3">
            <FilterButton
              label={content.all}
              count={testimonials.length}
              value="all"
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
            />

            <FilterButton
              label={content.image}
              icon={<ImageIcon size={17} />}
              count={imageCount}
              value="image"
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
            />

            <FilterButton
              label={content.video}
              icon={<Video size={17} />}
              count={videoCount}
              value="video"
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
            />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}

      <section className="px-4 pb-24 pt-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* HEADING + SUBHEADING */}

          <div className="mb-5 text-left">
            <h2
              className="text-3xl font-bold sm:text-4xl lg:text-5xl"
              style={{ ...headingStyle, textAlign: "left" }}
            >
              {activeFilter === "all"
                ? content.sectionHeading
                : activeFilter === "image"
                  ? "Image Testimonials"
                  : "Video Testimonials"}
            </h2>

            <p
              className="mt-4 max-w-2xl text-sm text-white sm:text-base"
              style={{
                color: "#FFFFFF",
                lineHeight: 1.7,
                textAlign: "left",
              }}
            >
              {activeFilter === "all"
                ? content.sectionSubheading
                : activeFilter === "image"
                  ? "Explore visual stories and feedback from our students."
                  : "Watch students share their learning experiences."}
            </p>
          </div>

          {/* GRID */}

          {filteredTestimonials.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredTestimonials.map((testimonial) =>
                testimonial._type === "video" ? (
                  <VideoTestimonialCard
                    key={testimonial._id}
                    testimonial={testimonial}
                    onPlay={() => setSelectedVideo(testimonial)}
                  />
                ) : (
                  <ImageTestimonialCard
                    key={testimonial._id}
                    testimonial={testimonial}
                  />
                )
              )}
            </div>
          ) : (
            <EmptyState
              activeFilter={activeFilter}
              searchQuery={searchQuery}
              content={content}
              onClear={() => {
                setSearchQuery("");
                setActiveFilter("all");
              }}
            />
          )}
        </div>
      </section>

      {/* VIDEO MODAL */}

      {selectedVideo && (
        <VideoModal
          testimonial={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}

      {/* BOTTOM RADIANT LINE */}

      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, #008CFF, #38D7FF, #008CFF, transparent)",
          boxShadow: "0 0 20px rgba(0,140,255,0.65)",
        }}
      />
    </main>
  );
}

/* =========================================================
   HERO CONTENT
========================================================= */

function HeroContent({ content, instituteName, headingStyle }) {
  return (
    <div>
      <div className="mb-5 flex items-center gap-3">
        <span
          className="h-px w-12"
          style={{ background: THEME.cyan }}
        />

        <p
          className="text-xs font-bold uppercase tracking-[0.30em]"
          style={{ color: THEME.cyan }}
        >
          {content.eyebrow}
        </p>
      </div>

      <h1
        className="max-w-3xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl"
        style={{
          ...headingStyle,
          textShadow: "0 0 35px rgba(0,140,255,0.20)",
        }}
      >
        {content.heading}
      </h1>

      <p
        className="mt-6 max-w-2xl text-base leading-7 text-white sm:text-lg"
        style={{ color: "#FFFFFF" }}
      >
        {content.subheading}
      </p>

      <div className="mt-7 flex flex-wrap items-center gap-3">
        <span
          className="rounded-full border px-4 py-2 text-xs font-semibold"
          style={{
            color: THEME.cyan,
            background: "rgba(0,140,255,0.10)",
            borderColor: "rgba(0,140,255,0.35)",
            boxShadow: "0 0 18px rgba(0,140,255,0.08)",
          }}
        >
          Real Student Stories
        </span>

        <span
          className="rounded-full border px-4 py-2 text-xs font-semibold"
          style={{
            color: "#FFFFFF",
            background: "rgba(56,215,255,0.06)",
            borderColor: "rgba(56,215,255,0.25)",
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
  const active = activeFilter === value;

  return (
    <button
      type="button"
      onClick={() => setActiveFilter(value)}
      className="flex min-w-0 items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
      style={{
        background: active
          ? "linear-gradient(135deg,#008CFF,#0057D9)"
          : "#000000",
        borderColor: active
          ? THEME.blue
          : "rgba(0,140,255,0.25)",
        color: "#FFFFFF",
        boxShadow: active
          ? "0 0 28px rgba(0,140,255,0.32)"
          : "none",
      }}
    >
      {icon}
      <span>{label}</span>

      <span
        className="rounded-full px-1.5 py-0.5 text-[10px]"
        style={{
          background: active
            ? "rgba(255,255,255,0.15)"
            : "rgba(0,140,255,0.10)",
          color: "#FFFFFF",
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

function Avatar({ src, name }) {
  const [failed, setFailed] = useState(false);

  const initials = String(name || "S")
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      className="h-11 w-11 shrink-0 overflow-hidden rounded-full border-2"
      style={{
        borderColor: "rgba(56,215,255,0.50)",
        background: "linear-gradient(135deg,#008CFF,#062B55)",
        boxShadow: "0 0 18px rgba(0,140,255,0.20)",
      }}
    >
      {src && !failed ? (
        <img
          src={src}
          alt={name}
          className="h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <div
          className="flex h-full w-full items-center justify-center text-xs font-bold"
          style={{ color: "#FFFFFF" }}
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
    <div className="flex shrink-0 gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={13}
          fill={star <= rating ? THEME.cyan : "transparent"}
          style={{
            color: THEME.cyan,
            filter:
              star <= rating
                ? "drop-shadow(0 0 4px rgba(56,215,255,0.60))"
                : "none",
          }}
        />
      ))}
    </div>
  );
}

/* =========================================================
   IMAGE TESTIMONIAL CARD
========================================================= */

function ImageTestimonialCard({ testimonial }) {
  const image = testimonial._image || testimonial._avatar;

  return (
    <article
      className="group overflow-hidden rounded-lg border transition-all duration-300 hover:-translate-y-2"
      style={{
        background: "#000000",
        borderColor: "rgba(0,140,255,0.25)",
        boxShadow: "0 18px 50px rgba(0,0,0,0.40)",
      }}
    >
      {/* IMAGE */}

      <div className="relative aspect-[16/10] overflow-hidden bg-black">
        {image ? (
          <img
            src={image}
            alt={testimonial._name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <FallbackMedia name={testimonial._name} />
        )}

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.90) 100%)",
          }}
        />

        <span
          className="absolute left-4 top-4 flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold backdrop-blur-md"
          style={{
            background: "rgba(0,0,0,0.80)",
            borderColor: "rgba(0,140,255,0.45)",
            color: THEME.cyan,
            boxShadow: "0 0 18px rgba(0,140,255,0.18)",
          }}
        >
          <ImageIcon size={13} />
          Image
        </span>

        <div
          className="pointer-events-none absolute bottom-0 left-1/2 h-16 w-2/3 -translate-x-1/2 blur-3xl"
          style={{ background: "rgba(0,140,255,0.18)" }}
        />
      </div>

      {/* CONTENT */}

      <div className="bg-black p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <Avatar
              src={testimonial._avatar}
              name={testimonial._name}
            />

            <div className="min-w-0">
              <h3
                className="truncate text-base font-bold"
                style={{ color: "#FFFFFF" }}
              >
                {testimonial._name}
              </h3>

              <p
                className="truncate text-xs font-medium"
                style={{ color: THEME.cyan }}
              >
                {testimonial._subcategory}
              </p>
            </div>
          </div>

          <Rating rating={testimonial._rating} />
        </div>

        <div
          className="my-5 h-px"
          style={{ background: "rgba(0,140,255,0.14)" }}
        />

        <div className="flex gap-3">
          <Quote
            size={25}
            className="mt-1 shrink-0"
            style={{
              color: THEME.blue,
              fill: "rgba(0,140,255,0.14)",
            }}
          />

          <p
            className="line-clamp-4 text-sm leading-7"
            style={{ color: "#FFFFFF" }}
          >
            {testimonial._text || "Amazing learning experience."}
          </p>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   VIDEO TESTIMONIAL CARD
========================================================= */

function VideoTestimonialCard({ testimonial, onPlay }) {
  return (
    <article
      className="group overflow-hidden rounded-lg border transition-all duration-300 hover:-translate-y-2"
      style={{
        background: "#000000",
        borderColor: "rgba(0,140,255,0.30)",
        boxShadow: "0 18px 50px rgba(0,0,0,0.40)",
      }}
    >
      {/* VIDEO THUMBNAIL */}

      <div className="relative aspect-video overflow-hidden bg-black">
        {testimonial._thumbnail ? (
          <img
            src={testimonial._thumbnail}
            alt={testimonial._name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <FallbackMedia name={testimonial._name} />
        )}

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg,rgba(0,0,0,0.12),rgba(0,0,0,0.78))",
          }}
        />

        <button
          type="button"
          onClick={onPlay}
          className="absolute inset-0 flex items-center justify-center"
          aria-label={`Play testimonial by ${testimonial._name}`}
        >
          <span
            className="flex h-16 w-16 items-center justify-center rounded-full border text-white transition duration-300 group-hover:scale-110"
            style={{
              background: "linear-gradient(135deg,#008CFF,#0057D9)",
              borderColor: "rgba(255,255,255,0.35)",
              boxShadow: "0 0 40px rgba(0,140,255,0.75)",
            }}
          >
            <Play size={23} fill="currentColor" className="ml-1" />
          </span>
        </button>

        <span
          className="absolute left-4 top-4 flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold backdrop-blur-md"
          style={{
            background: "rgba(0,0,0,0.80)",
            borderColor: "rgba(0,140,255,0.45)",
            color: THEME.cyan,
            boxShadow: "0 0 18px rgba(0,140,255,0.18)",
          }}
        >
          <Video size={13} />
          Video
        </span>

        <div
          className="pointer-events-none absolute bottom-0 left-1/2 h-16 w-2/3 -translate-x-1/2 blur-3xl"
          style={{ background: "rgba(0,140,255,0.18)" }}
        />
      </div>

      {/* CONTENT */}

      <div className="bg-black p-6">
        <div className="flex items-center gap-3">
          <Avatar
            src={testimonial._avatar}
            name={testimonial._name}
          />

          <div className="min-w-0 flex-1">
            <h3
              className="truncate text-base font-bold"
              style={{ color: "#FFFFFF" }}
            >
              {testimonial._name}
            </h3>

            <p
              className="truncate text-xs font-medium"
              style={{ color: THEME.cyan }}
            >
              {testimonial._subcategory}
            </p>
          </div>

          <Rating rating={testimonial._rating} />
        </div>

        <div
          className="my-5 h-px"
          style={{ background: "rgba(0,140,255,0.14)" }}
        />

        <div className="flex gap-3">
          <Quote
            size={25}
            className="mt-1 shrink-0"
            style={{
              color: THEME.blue,
              fill: "rgba(0,140,255,0.14)",
            }}
          />

          <p
            className="line-clamp-3 text-sm leading-7"
            style={{ color: "#FFFFFF" }}
          >
            {testimonial._text ||
              "Watch this student share their learning experience."}
          </p>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   FALLBACK MEDIA
========================================================= */

function FallbackMedia({ name }) {
  const initial = String(name || "S").charAt(0).toUpperCase();

  return (
    <div
      className="relative flex h-full w-full items-center justify-center bg-black"
      style={{ background: "#000000" }}
    >
      <div
        className="relative flex h-20 w-20 items-center justify-center rounded-full border text-2xl font-bold"
        style={{
          background: "#000000",
          borderColor: "rgba(0,140,255,0.45)",
          color: THEME.cyan,
          boxShadow: "none",
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

function VideoModal({ testimonial, onClose }) {
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md sm:p-8"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl overflow-hidden rounded-3xl border"
        style={{
          background: "linear-gradient(145deg,#071426,#030914)",
          borderColor: "rgba(0,140,255,0.45)",
          boxShadow: "0 0 80px rgba(0,140,255,0.25)",
        }}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border text-white backdrop-blur-md transition hover:scale-105"
          style={{
            background: "rgba(0,0,0,0.70)",
            borderColor: "rgba(56,215,255,0.35)",
          }}
          aria-label="Close video"
        >
          <X size={20} />
        </button>

        <div className="bg-black">
          <video
            src={testimonial._video}
            poster={testimonial._thumbnail || undefined}
            controls
            autoPlay
            playsInline
            className="max-h-[70vh] w-full object-contain"
          />
        </div>

        <div className="p-6 sm:p-7">
          <div className="flex items-center gap-3">
            <Avatar
              src={testimonial._avatar}
              name={testimonial._name}
            />

            <div>
              <h3
                className="font-bold"
                style={{ color: "#FFFFFF" }}
              >
                {testimonial._name}
              </h3>

              <p
                className="text-sm"
                style={{ color: THEME.cyan }}
              >
                {testimonial._subcategory}
              </p>
            </div>
          </div>

          {testimonial._text && (
            <p
              className="mt-5 text-sm leading-7"
              style={{ color: "#FFFFFF" }}
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
      className="relative overflow-hidden rounded-3xl border px-6 py-20 text-center"
      style={{
        background: "linear-gradient(145deg,#071426,#030914)",
        borderColor: "rgba(0,140,255,0.22)",
        boxShadow: "0 0 45px rgba(0,140,255,0.07)",
      }}
    >
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-40 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: "rgba(0,140,255,0.10)" }}
      />

      <div
        className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full border"
        style={{
          background: "rgba(0,140,255,0.10)",
          borderColor: "rgba(0,140,255,0.30)",
          color: THEME.cyan,
          boxShadow: "0 0 25px rgba(0,140,255,0.18)",
        }}
      >
        {activeFilter === "video" ? (
          <Video size={25} />
        ) : activeFilter === "image" ? (
          <ImageIcon size={25} />
        ) : (
          <Search size={25} />
        )}
      </div>

      <h3
        className="relative mt-5 text-xl font-bold"
        style={{ color: "#FFFFFF" }}
      >
        {message}
      </h3>

      <p
        className="relative mx-auto mt-2 max-w-md text-sm"
        style={{ color: "#FFFFFF" }}
      >
        {searchQuery
          ? `No testimonials match "${searchQuery}".`
          : "There are no testimonials available for this filter yet."}
      </p>

      {(searchQuery || activeFilter !== "all") && (
        <button
          type="button"
          onClick={onClear}
          className="relative mt-6 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
          style={{
            background: "linear-gradient(135deg,#008CFF,#0057D9)",
            color: "#FFFFFF",
            boxShadow: "0 0 25px rgba(0,140,255,0.30)",
          }}
        >
          View All Testimonials
        </button>
      )}
    </div>
  );
}