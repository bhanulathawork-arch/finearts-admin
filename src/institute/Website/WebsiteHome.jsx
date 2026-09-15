// // src/pages/institute/Website/WebsiteHome.jsx

// import { useEffect, useMemo, useState } from "react";
// import { Link, useOutletContext } from "react-router-dom";

// import {
//   ArrowRight,
//   BookOpen,
//   Star,
//   Users,
//   Palette,
//   Music,
//   Camera,
//   Drama,
//   Monitor,
//   Clock3,
//   ChevronLeft,
//   ChevronRight,
//   Award,
// } from "lucide-react";


// /* =========================================================
//    WEBSITE HOME

//    Branding is controlled entirely by Website Branding.

//    Sections:
//    1. Hero / Banners
//    2. Popular Classes
//    3. Expert Trainers
//    4. Top Categories
//    5. Testimonials
// ========================================================= */


// /* =========================================================
//    BRANDING HELPERS
// ========================================================= */

// const getBranding = (branding = {}) => {
//   return {
//     /* COLORS */

//     navbarColor:
//       branding?.navbarColor ||
//       branding?.navbar_color ||
//       "#1F2937",

//     headingColor:
//       branding?.headingColor ||
//       branding?.heading_color ||
//       "#111827",

//     subheadingColor:
//       branding?.subheadingColor ||
//       branding?.subheading_color ||
//       "#5B21B6",

//     textColor:
//       branding?.textColor ||
//       branding?.text_color ||
//       "#111827",

//     iconColor:
//       branding?.iconColor ||
//       branding?.icon_color ||
//       "#F59E0B",

//     buttonColor:
//       branding?.buttonColor ||
//       branding?.button_color ||
//       "#7C3AED",

//     buttonTextColor:
//       branding?.buttonTextColor ||
//       branding?.button_text_color ||
//       "#FFFFFF",

//     pageBackgroundColor:
//       branding?.pageBackgroundColor ||
//       branding?.page_background_color ||
//       "#FAFAF9",

//     cardBackgroundColor:
//       branding?.cardBackgroundColor ||
//       branding?.card_background_color ||
//       "#FFFFFF",

//     footerBackgroundColor:
//       branding?.footerBackgroundColor ||
//       branding?.footer_background_color ||
//       "#1F2937",

//     footerHeadingColor:
//       branding?.footerHeadingColor ||
//       branding?.footer_heading_color ||
//       "#FFFFFF",

//     footerTextColor:
//       branding?.footerTextColor ||
//       branding?.footer_text_color ||
//       "#FAFAF9",


//     /* FONTS */

//     fontHeading:
//       branding?.fontHeading ||
//       branding?.font_heading ||
//       "Inter",

//     fontSubheading:
//       branding?.fontSubheading ||
//       branding?.font_subheading ||
//       "Inter",

//     fontBody:
//       branding?.fontBody ||
//       branding?.font_body ||
//       "Inter",


//     /* HEADING TYPOGRAPHY */

//     headingWeight:
//       branding?.headingWeight ||
//       branding?.heading_weight ||
//       700,

//     headingLineHeight:
//       branding?.headingLineHeight ||
//       branding?.heading_line_height ||
//       1.15,

//     headingLetterSpacing:
//       branding?.headingLetterSpacing ??
//       branding?.heading_letter_spacing ??
//       0,


//     /* SUBHEADING TYPOGRAPHY */

//     subheadingWeight:
//       branding?.subheadingWeight ||
//       branding?.subheading_weight ||
//       600,

//     subheadingLineHeight:
//       branding?.subheadingLineHeight ||
//       branding?.subheading_line_height ||
//       1.4,


//     /* BODY TYPOGRAPHY */

//     bodyWeight:
//       branding?.bodyWeight ||
//       branding?.body_weight ||
//       400,

//     bodyLineHeight:
//       branding?.bodyLineHeight ||
//       branding?.body_line_height ||
//       1.6,

//     bodyLetterSpacing:
//       branding?.bodyLetterSpacing ??
//       branding?.body_letter_spacing ??
//       0,


//     /* APPEARANCE */

//     roundedButtons:
//       branding?.roundedButtons ??
//       branding?.rounded_buttons ??
//       true,
//   };
// };


// /* =========================================================
//    CSS HELPERS
// ========================================================= */

// const hexWithOpacity = (
//   color,
//   opacity = "10"
// ) => {
//   if (!color) {
//     return `#000000${opacity}`;
//   }

//   if (
//     typeof color === "string" &&
//     color.startsWith("#") &&
//     color.length === 7
//   ) {
//     return `${color}${opacity}`;
//   }

//   return color;
// };


// const buttonRadius = (branding) => {
//   return branding?.roundedButtons
//     ? "999px"
//     : "6px";
// };


// const fontValue = (font) => {
//   if (!font) {
//     return "Inter, sans-serif";
//   }

//   return `'${font}', sans-serif`;
// };


// /* =========================================================
//    MAIN HOME PAGE
// ========================================================= */

// export default function WebsiteHome() {
//   const context = useOutletContext() || {};

//   const {
//     institute = {},
//     instituteName = "",
//     branding: rawBranding = {},
//     banners = [],
//     bannersLoading = false,
//     categories = [],
//     classes = [],
//     trainers = [],
//     testimonials = [],
//     sectionEnabled,
//     getContent,
//   } = context;


//   /* =========================================================
//      BRANDING
//   ========================================================= */

//   const branding = useMemo(
//     () => getBranding(rawBranding),
//     [rawBranding]
//   );


//   /* =========================================================
//      SAFE DATA
//   ========================================================= */

//   const categoryList = Array.isArray(categories)
//     ? categories
//     : [];

//   const classList = Array.isArray(classes)
//     ? classes
//     : [];

//   const trainerList = Array.isArray(trainers)
//     ? trainers
//     : [];

//   const testimonialList = Array.isArray(testimonials)
//     ? testimonials
//     : [];

//   const bannerList = Array.isArray(banners)
//     ? banners
//     : [];


//   /* =========================================================
//      INSTITUTE
//   ========================================================= */

//   const displayInstituteName =
//     instituteName ||
//     institute?.name ||
//     institute?.institute_name ||
//     "Fine Arts Institute";


//   /* =========================================================
//      CONTENT
//   ========================================================= */

//   const homeContent =
//     typeof getContent === "function"
//       ? getContent("home") || {}
//       : {};


//   const heroBadge =
//     homeContent?.badge ||
//     "EMPOWERING YOUR FUTURE";


//   const heroTitle =
//     homeContent?.title ||
//     "Learn New Skills,";


//   const heroHighlight =
//     homeContent?.highlight ||
//     "Achieve Your Goals";


//   const heroDescription =
//     homeContent?.description ||
//     "Join expert-led classes, learn from experienced trainers, and achieve skills that help you grow in your career and life.";


//   /* =========================================================
//      SECTION ENABLE
//   ========================================================= */

//   const isSectionEnabled = (section) => {
//     if (typeof sectionEnabled !== "function") {
//       return true;
//     }

//     return sectionEnabled(section);
//   };


//   /* =========================================================
//      NORMALIZE BANNERS
//   ========================================================= */

//   const homeBanners = useMemo(() => {
//     return bannerList
//       .map((banner) => {
//         if (!banner) {
//           return null;
//         }

//         const type = String(
//           banner?.banner_type ??
//             banner?.bannerType ??
//             banner?.type ??
//             ""
//         )
//           .trim()
//           .toUpperCase();

//         const active =
//           banner?.is_active ??
//           banner?.isActive ??
//           banner?.active ??
//           true;

//         const isActive =
//           active === true ||
//           active === 1 ||
//           active === "1" ||
//           String(active).toLowerCase() === "true";

//         const image =
//           banner?.image_url ||
//           banner?.image ||
//           banner?.imageUrl ||
//           banner?.url ||
//           "";

//         return {
//           ...banner,

//           banner_type: type,

//           is_active: isActive,

//           image_url: image,

//           display_order: Number(
//             banner?.display_order ??
//               banner?.displayOrder ??
//               1
//           ),
//         };
//       })
//       .filter(
//         (banner) =>
//           banner &&
//           banner.banner_type === "HOME" &&
//           banner.is_active &&
//           banner.image_url
//       )
//       .sort(
//         (a, b) =>
//           a.display_order -
//           b.display_order
//       );
//   }, [bannerList]);


//   /* =========================================================
//      BANNER STATE
//   ========================================================= */

//   const [currentBanner, setCurrentBanner] =
//     useState(0);


//   useEffect(() => {
//     if (
//       currentBanner >=
//       homeBanners.length
//     ) {
//       setCurrentBanner(0);
//     }
//   }, [
//     currentBanner,
//     homeBanners.length,
//   ]);


//   useEffect(() => {
//     if (homeBanners.length <= 1) {
//       return undefined;
//     }

//     const timer = setInterval(() => {
//       setCurrentBanner((previous) =>
//         previous >=
//         homeBanners.length - 1
//           ? 0
//           : previous + 1
//       );
//     }, 5000);

//     return () => clearInterval(timer);
//   }, [homeBanners.length]);


//   /* =========================================================
//      RENDER
//   ========================================================= */

//   return (
//     <main
//       className="w-full overflow-hidden"
//       style={{
//         backgroundColor:
//           branding.pageBackgroundColor,

//         color: branding.textColor,

//         fontFamily: fontValue(
//           branding.fontBody
//         ),

//         fontWeight:
//           branding.bodyWeight,

//         lineHeight:
//           branding.bodyLineHeight,

//         letterSpacing:
//           branding.bodyLetterSpacing,
//       }}
//     >

//       {/* =====================================================
//           HERO
//       ===================================================== */}

//       {isSectionEnabled("home") && (
//         <HeroSection
//           banners={homeBanners}
//           bannersLoading={bannersLoading}
//           currentBanner={currentBanner}
//           setCurrentBanner={setCurrentBanner}
//           branding={branding}
//           instituteName={
//             displayInstituteName
//           }
//           heroBadge={heroBadge}
//           heroTitle={heroTitle}
//           heroHighlight={
//             heroHighlight
//           }
//           heroDescription={
//             heroDescription
//           }
//           classCount={
//             classList.length
//           }
//           trainerCount={
//             trainerList.length
//           }
//         />
//       )}


//       {/* =====================================================
//           POPULAR CLASSES
//       ===================================================== */}

//       {isSectionEnabled("courses") &&
//         classList.length > 0 && (
//           <PopularClasses
//             classes={classList}
//             branding={branding}
//           />
//         )}


//       {/* =====================================================
//           TRAINERS
//       ===================================================== */}

//       {isSectionEnabled("trainers") &&
//         trainerList.length > 0 && (
//           <TrainersSection
//             trainers={trainerList}
//             branding={branding}
//           />
//         )}


//       {/* =====================================================
//           CATEGORIES
//       ===================================================== */}

//       {isSectionEnabled("categories") &&
//         categoryList.length > 0 && (
//           <CategoriesSection
//             categories={categoryList}
//             branding={branding}
//           />
//         )}


//       {/* =====================================================
//           TESTIMONIALS
//       ===================================================== */}

//       {isSectionEnabled("testimonials") &&
//         testimonialList.length > 0 && (
//           <TestimonialsSection
//             testimonials={testimonialList.slice(
//               0,
//               3
//             )}
//             branding={branding}
//           />
//         )}

//     </main>
//   );
// }


// /* =========================================================
//    HERO SECTION
// ========================================================= */

// function HeroSection({
//   banners,
//   bannersLoading,
//   currentBanner,
//   setCurrentBanner,
//   branding,
//   instituteName,
//   heroBadge,
//   heroTitle,
//   heroHighlight,
//   heroDescription,
//   classCount,
//   trainerCount,
// }) {

//   /* ---------------------------------------------------------
//      LOADING
//   --------------------------------------------------------- */

//   if (
//     bannersLoading &&
//     banners.length === 0
//   ) {
//     return (
//       <section
//         style={{
//           backgroundColor:
//             branding.pageBackgroundColor,
//         }}
//       >
//         <div
//           className="mx-auto h-[420px] max-w-7xl animate-pulse"
//           style={{
//             backgroundColor:
//               branding.cardBackgroundColor,
//           }}
//         />
//       </section>
//     );
//   }


//   /* ---------------------------------------------------------
//      NO BANNER
//   --------------------------------------------------------- */

//   if (banners.length === 0) {
//     return (
//       <section
//         className="relative overflow-hidden"
//         style={{
//           backgroundColor:
//             branding.pageBackgroundColor,
//         }}
//       >

//         <div className="mx-auto max-w-7xl px-5">

//           <div className="grid min-h-[430px] items-center lg:grid-cols-2">


//             {/* LEFT */}

//             <div className="relative z-10 py-12">

//               <div
//                 className="inline-flex items-center gap-2 px-4 py-2 text-[10px] font-bold tracking-wide"
//                 style={{
//                   color:
//                     branding.subheadingColor,

//                   backgroundColor:
//                     hexWithOpacity(
//                       branding.subheadingColor,
//                       "12"
//                     ),

//                   borderRadius:
//                     buttonRadius(branding),
//                 }}
//               >

//                 <Award
//                   size={13}
//                   style={{
//                     color:
//                       branding.iconColor,
//                   }}
//                 />

//                 {heroBadge}

//               </div>


//               <h1
//                 className="mt-5 max-w-[580px] text-4xl sm:text-5xl lg:text-[52px]"
//                 style={{
//                   color:
//                     branding.headingColor,

//                   fontFamily:
//                     fontValue(
//                       branding.fontHeading
//                     ),

//                   fontWeight:
//                     branding.headingWeight,

//                   lineHeight:
//                     branding.headingLineHeight,

//                   letterSpacing:
//                     branding.headingLetterSpacing,
//                 }}
//               >

//                 {heroTitle}

//                 <br />

//                 <span
//                   style={{
//                     color:
//                       branding.subheadingColor,
//                   }}
//                 >
//                   {heroHighlight}
//                 </span>

//               </h1>


//               <p
//                 className="mt-5 max-w-[530px] text-sm sm:text-base"
//                 style={{
//                   color:
//                     branding.textColor,

//                   fontFamily:
//                     fontValue(
//                       branding.fontBody
//                     ),

//                   fontWeight:
//                     branding.bodyWeight,

//                   lineHeight:
//                     branding.bodyLineHeight,

//                   letterSpacing:
//                     branding.bodyLetterSpacing,
//                 }}
//               >
//                 {heroDescription}
//               </p>


//               {/* BUTTONS */}

//               <div className="mt-6 flex flex-wrap gap-3">

//                 <BrandButton
//                   to="/institute/website/preview/classes"
//                   branding={branding}
//                 >
//                   Explore Classes
//                   <ArrowRight size={16} />
//                 </BrandButton>


//                 <BrandOutlineButton
//                   to="/institute/website/preview/trainers"
//                   branding={branding}
//                 >
//                   Browse Trainers
//                 </BrandOutlineButton>

//               </div>


//               {/* STATS */}

//               <div className="mt-8 flex flex-wrap gap-8">

//                 <HeroStat
//                   icon={<Users size={20} />}
//                   value="2K+"
//                   label="Students"
//                   branding={branding}
//                 />

//                 <HeroStat
//                   icon={<BookOpen size={20} />}
//                   value={`${classCount}+`}
//                   label="Classes"
//                   branding={branding}
//                 />

//                 <HeroStat
//                   icon={<Award size={20} />}
//                   value={`${trainerCount}+`}
//                   label="Expert Trainers"
//                   branding={branding}
//                 />

//               </div>

//             </div>


//             {/* RIGHT */}

//             <div className="hidden h-full min-h-[430px] items-end justify-center lg:flex">

//               <div
//                 className="flex h-[360px] w-[480px] items-center justify-center rounded-[50%]"
//                 style={{
//                   backgroundColor:
//                     hexWithOpacity(
//                       branding.iconColor,
//                       "10"
//                     ),
//                 }}
//               >

//                 <BookOpen
//                   size={100}
//                   style={{
//                     color:
//                       hexWithOpacity(
//                         branding.iconColor,
//                         "45"
//                       ),
//                   }}
//                 />

//               </div>

//             </div>

//           </div>

//         </div>

//       </section>
//     );
//   }


//   /* ---------------------------------------------------------
//      ACTIVE BANNER
//   --------------------------------------------------------- */

//   const banner =
//     banners[currentBanner];

//   const image =
//     banner?.image_url ||
//     banner?.image ||
//     "";

//   const title =
//     banner?.title ||
//     heroTitle;

//   const description =
//     banner?.description ||
//     heroDescription;

//   const buttonText =
//     banner?.button_text ||
//     banner?.buttonText ||
//     "Explore Classes";

//   const buttonLink =
//     banner?.button_link ||
//     banner?.buttonLink ||
//     "/institute/website/preview/classes";


//   return (
//     <section
//       className="relative overflow-hidden"
//       style={{
//         backgroundColor:
//           branding.pageBackgroundColor,
//       }}
//     >

//       <div className="mx-auto grid min-h-[430px] max-w-7xl lg:grid-cols-2">


//         {/* LEFT CONTENT */}

//         <div className="relative z-20 flex items-center px-5 py-12 lg:px-0">

//           <div className="max-w-[570px]">

//             <div
//               className="inline-flex items-center gap-2 px-4 py-2 text-[10px] font-bold tracking-wide"
//               style={{
//                 color:
//                   branding.subheadingColor,

//                 backgroundColor:
//                   hexWithOpacity(
//                     branding.subheadingColor,
//                     "12"
//                   ),

//                 borderRadius:
//                   buttonRadius(branding),
//               }}
//             >

//               <Award
//                 size={13}
//                 style={{
//                   color:
//                     branding.iconColor,
//                 }}
//               />

//               {heroBadge}

//             </div>


//             <h1
//               className="mt-5 text-4xl sm:text-5xl lg:text-[52px]"
//               style={{
//                 color:
//                   branding.headingColor,

//                 fontFamily:
//                   fontValue(
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
//               {title}
//             </h1>


//             <p
//               className="mt-5 max-w-[520px] text-sm sm:text-base"
//               style={{
//                 color:
//                   branding.textColor,

//                 fontFamily:
//                   fontValue(
//                     branding.fontBody
//                   ),

//                 fontWeight:
//                   branding.bodyWeight,

//                 lineHeight:
//                   branding.bodyLineHeight,

//                 letterSpacing:
//                   branding.bodyLetterSpacing,
//               }}
//             >
//               {description}
//             </p>


//             {/* BUTTONS */}

//             <div className="mt-6 flex flex-wrap gap-3">

//               <BrandButton
//                 to={buttonLink}
//                 branding={branding}
//               >
//                 {buttonText}
//                 <ArrowRight size={16} />
//               </BrandButton>


//               <BrandOutlineButton
//                 to="/institute/website/preview/trainers"
//                 branding={branding}
//               >
//                 Browse Trainers
//               </BrandOutlineButton>

//             </div>


//             {/* STATS */}

//             <div className="mt-8 flex gap-7">

//               <HeroStat
//                 icon={<Users size={19} />}
//                 value="2K+"
//                 label="Students"
//                 branding={branding}
//               />

//               <HeroStat
//                 icon={<BookOpen size={19} />}
//                 value={`${classCount}+`}
//                 label="Classes"
//                 branding={branding}
//               />

//               <HeroStat
//                 icon={<Award size={19} />}
//                 value={`${trainerCount}+`}
//                 label="Expert Trainers"
//                 branding={branding}
//               />

//             </div>

//           </div>

//         </div>


//         {/* RIGHT IMAGE */}

//         <div className="relative min-h-[330px] lg:min-h-[430px]">

//           <img
//             src={image}
//             alt={title}
//             className="absolute inset-0 h-full w-full object-cover"
//           />


//           <div
//             className="absolute inset-y-0 left-0 w-32"
//             style={{
//               background: `linear-gradient(to right, ${branding.pageBackgroundColor}, transparent)`,
//             }}
//           />


//           {/* ARROWS */}

//           {banners.length > 1 && (
//             <>
//               <CarouselButton
//                 direction="left"
//                 onClick={() =>
//                   setCurrentBanner(
//                     currentBanner === 0
//                       ? banners.length - 1
//                       : currentBanner - 1
//                   )
//                 }
//                 branding={branding}
//               />

//               <CarouselButton
//                 direction="right"
//                 onClick={() =>
//                   setCurrentBanner(
//                     currentBanner >=
//                     banners.length - 1
//                       ? 0
//                       : currentBanner + 1
//                   )
//                 }
//                 branding={branding}
//               />
//             </>
//           )}

//         </div>

//       </div>


//       {/* DOTS */}

//       {banners.length > 1 && (
//         <div className="absolute bottom-4 left-1/2 z-40 flex -translate-x-1/2 gap-1.5">

//           {banners.map(
//             (bannerItem, index) => (
//               <button
//                 key={
//                   bannerItem?.id ||
//                   index
//                 }
//                 type="button"
//                 onClick={() =>
//                   setCurrentBanner(index)
//                 }
//                 aria-label={`Go to banner ${index + 1}`}
//                 className="h-2 transition-all"
//                 style={{
//                   width:
//                     currentBanner === index
//                       ? 22
//                       : 7,

//                   backgroundColor:
//                     currentBanner === index
//                       ? branding.buttonColor
//                       : branding.iconColor,

//                   borderRadius:
//                     buttonRadius(
//                       branding
//                     ),
//                 }}
//               />
//             )
//           )}

//         </div>
//       )}

//     </section>
//   );
// }


// /* =========================================================
//    CAROUSEL BUTTON
// ========================================================= */

// function CarouselButton({
//   direction,
//   onClick,
//   branding,
// }) {
//   const Icon =
//     direction === "left"
//       ? ChevronLeft
//       : ChevronRight;

//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       className="absolute top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center shadow-md"
//       style={{
//         [direction === "left"
//           ? "left"
//           : "right"]: "16px",

//         backgroundColor:
//           branding.cardBackgroundColor,

//         color:
//           branding.iconColor,

//         borderRadius:
//           buttonRadius(branding),
//       }}
//       aria-label={
//         direction === "left"
//           ? "Previous banner"
//           : "Next banner"
//       }
//     >
//       <Icon size={18} />
//     </button>
//   );
// }


// /* =========================================================
//    HERO STAT
// ========================================================= */

// function HeroStat({
//   icon,
//   value,
//   label,
//   branding,
// }) {
//   return (
//     <div className="flex items-center gap-2">

//       <div
//         style={{
//           color:
//             branding.iconColor,
//         }}
//       >
//         {icon}
//       </div>

//       <div>

//         <p
//           className="text-sm"
//           style={{
//             color:
//               branding.headingColor,

//             fontFamily:
//               fontValue(
//                 branding.fontHeading
//               ),

//             fontWeight:
//               branding.headingWeight,
//           }}
//         >
//           {value}
//         </p>

//         <p
//           className="text-[9px]"
//           style={{
//             color:
//               branding.textColor,

//             fontFamily:
//               fontValue(
//                 branding.fontBody
//               ),
//           }}
//         >
//           {label}
//         </p>

//       </div>

//     </div>
//   );
// }


// /* =========================================================
//    BRAND BUTTON
// ========================================================= */

// function BrandButton({
//   to,
//   branding,
//   children,
// }) {
//   return (
//     <Link
//       to={to}
//       className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold transition hover:opacity-90"
//       style={{
//         backgroundColor:
//           branding.buttonColor,

//         color:
//           branding.buttonTextColor,

//         borderRadius:
//           buttonRadius(branding),

//         fontFamily:
//           fontValue(
//             branding.fontBody
//           ),

//         fontWeight:
//           branding.bodyWeight,
//       }}
//     >
//       {children}
//     </Link>
//   );
// }


// /* =========================================================
//    OUTLINE BUTTON
// ========================================================= */

// function BrandOutlineButton({
//   to,
//   branding,
//   children,
// }) {
//   return (
//     <Link
//       to={to}
//       className="inline-flex items-center gap-2 border px-6 py-3 text-sm font-semibold transition hover:opacity-80"
//       style={{
//         borderColor:
//           branding.buttonColor,

//         color:
//           branding.buttonColor,

//         backgroundColor:
//           branding.cardBackgroundColor,

//         borderRadius:
//           buttonRadius(branding),

//         fontFamily:
//           fontValue(
//             branding.fontBody
//           ),

//         fontWeight:
//           branding.bodyWeight,
//       }}
//     >
//       {children}
//     </Link>
//   );
// }


// /* =========================================================
//    SECTION HEADING
// ========================================================= */

// function SectionHeading({
//   eyebrow,
//   title,
//   branding,
//   action,
// }) {
//   return (
//     <div className="mb-5 flex items-end justify-between">

//       <div>

//         <p
//           className="text-[9px] font-bold uppercase"
//           style={{
//             color:
//               branding.subheadingColor,

//             fontFamily:
//               fontValue(
//                 branding.fontSubheading
//               ),

//             fontWeight:
//               branding.subheadingWeight,
//           }}
//         >
//           {eyebrow}
//         </p>


//         <h2
//           className="mt-1 text-xl sm:text-2xl"
//           style={{
//             color:
//               branding.headingColor,

//             fontFamily:
//               fontValue(
//                 branding.fontHeading
//               ),

//             fontWeight:
//               branding.headingWeight,

//             lineHeight:
//               branding.headingLineHeight,

//             letterSpacing:
//               branding.headingLetterSpacing,
//           }}
//         >
//           {title}
//         </h2>

//       </div>

//       {action}

//     </div>
//   );
// }


// /* =========================================================
//    POPULAR CLASSES
// ========================================================= */

// function PopularClasses({
//   classes,
//   branding,
// }) {
//   return (
//     <section
//       className="py-9 sm:py-11"
//       style={{
//         backgroundColor:
//           branding.pageBackgroundColor,
//       }}
//     >

//       <div className="mx-auto max-w-7xl px-5">

//         <SectionHeading
//           eyebrow="Popular Classes"
//           title="Explore Our Classes"
//           branding={branding}
//           action={
//             <Link
//               to="/institute/website/preview/classes"
//               className="hidden items-center gap-1 text-[10px] font-semibold sm:flex"
//               style={{
//                 color:
//                   branding.buttonColor,

//                 fontFamily:
//                   fontValue(
//                     branding.fontBody
//                   ),
//               }}
//             >
//               View all classes
//               <ArrowRight size={14} />
//             </Link>
//           }
//         />


//         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

//           {classes
//             .slice(0, 4)
//             .map((item, index) => (
//               <ClassCard
//                 key={
//                   item?.id ||
//                   index
//                 }
//                 item={item}
//                 branding={branding}
//               />
//             ))}

//         </div>

//       </div>

//     </section>
//   );
// }


// /* =========================================================
//    CLASS CARD
// ========================================================= */

// function ClassCard({
//   item,
//   branding,
// }) {
//   const id = item?.id;

//   const title =
//     item?.title ||
//     item?.name ||
//     "Class";

//   const image =
//     item?.image ||
//     item?.image_url ||
//     "";

//   const trainer =
//     item?.trainer_name ||
//     item?.trainerName;

//   const trainerImage =
//     item?.trainer_image ||
//     item?.trainerImage;

//   const rating =
//     Number(item?.rating || 0);

//   const availableDays =
//     Array.isArray(
//       item?.available_days
//     )
//       ? item.available_days
//       : [];

//   const startDate =
//     item?.start_date;

//   const startTime =
//     item?.start_time;

//   const students =
//     item?.students;

//   const price =
//     item?.price;

//   const duration =
//     item?.duration;

//   const level =
//     item?.level;


//   return (
//     <article
//       className="overflow-hidden border transition hover:-translate-y-1 hover:shadow-md"
//       style={{
//         borderColor:
//           hexWithOpacity(
//             branding.textColor,
//             "18"
//           ),

//         backgroundColor:
//           branding.cardBackgroundColor,

//         borderRadius:
//           "10px",
//       }}
//     >

//       <Link
//         to={`/institute/website/preview/classes/${id}`}
//       >

//         <div
//           className="relative h-[155px] overflow-hidden"
//           style={{
//             backgroundColor:
//               branding.pageBackgroundColor,
//           }}
//         >

//           {image ? (
//             <img
//               src={image}
//               alt={title}
//               className="h-full w-full object-cover transition duration-500 hover:scale-105"
//             />
//           ) : (
//             <div className="flex h-full items-center justify-center">

//               <BookOpen
//                 size={50}
//                 style={{
//                   color:
//                     branding.iconColor,
//                 }}
//               />

//             </div>
//           )}


//           {level && (
//             <span
//               className="absolute left-2 top-2 px-2 py-1 text-[9px] font-semibold"
//               style={{
//                 color:
//                   branding.buttonColor,

//                 backgroundColor:
//                   branding.cardBackgroundColor,

//                 borderRadius:
//                   buttonRadius(
//                     branding
//                   ),
//               }}
//             >
//               {level}
//             </span>
//           )}


//           {price !== undefined &&
//             price !== null &&
//             price !== "" && (
//               <span
//                 className="absolute right-2 top-2 px-2 py-1 text-[10px] font-bold"
//                 style={{
//                   color:
//                     branding.buttonColor,

//                   backgroundColor:
//                     branding.cardBackgroundColor,

//                   borderRadius:
//                     buttonRadius(
//                       branding
//                     ),
//                 }}
//               >
//                 {Number(price) > 0
//                   ? `$${price}`
//                   : "Free"}
//               </span>
//             )}

//         </div>

//       </Link>


//       <div className="p-3">

//         <h3
//           className="truncate text-xs"
//           style={{
//             color:
//               branding.headingColor,

//             fontFamily:
//               fontValue(
//                 branding.fontHeading
//               ),

//             fontWeight:
//               branding.headingWeight,
//           }}
//         >
//           {title}
//         </h3>


//         {trainer && (
//           <div className="mt-2 flex items-center gap-1.5">

//             {trainerImage ? (
//               <img
//                 src={trainerImage}
//                 alt={trainer}
//                 className="h-4 w-4 rounded-full object-cover"
//               />
//             ) : (
//               <div
//                 className="flex h-4 w-4 items-center justify-center rounded-full text-[7px] font-bold"
//                 style={{
//                   backgroundColor:
//                     branding.buttonColor,

//                   color:
//                     branding.buttonTextColor,
//                 }}
//               >
//                 {String(trainer)
//                   .charAt(0)
//                   .toUpperCase()}
//               </div>
//             )}

//             <span
//               className="truncate text-[9px]"
//               style={{
//                 color:
//                   branding.textColor,

//                 fontFamily:
//                   fontValue(
//                     branding.fontBody
//                   ),
//               }}
//             >
//               {trainer}
//             </span>

//           </div>
//         )}


//         <div className="mt-2 flex items-center gap-1">

//           <Star
//             size={13}
//             fill={
//               branding.iconColor
//             }
//             style={{
//               color:
//                 branding.iconColor,
//             }}
//           />

//           <span
//             className="text-[10px] font-semibold"
//             style={{
//               color:
//                 branding.headingColor,
//             }}
//           >
//             {rating > 0
//               ? rating.toFixed(1)
//               : "0.0"}
//           </span>


//           {students !==
//             undefined &&
//             students !== null && (
//               <span
//                 className="text-[9px]"
//                 style={{
//                   color:
//                     branding.textColor,
//                 }}
//               >
//                 ({students} Students)
//               </span>
//             )}

//         </div>


//         <div
//           className="mt-2 flex items-center gap-1.5 text-[9px]"
//           style={{
//             color:
//               branding.textColor,
//           }}
//         >

//           <Clock3
//             size={12}
//             style={{
//               color:
//                 branding.iconColor,
//             }}
//           />

//           <span>
//             {duration ||
//               "Duration not specified"}
//           </span>

//         </div>


//         {(startDate ||
//           startTime) && (
//           <div
//             className="mt-1.5 flex items-center gap-2 text-[9px]"
//             style={{
//               color:
//                 branding.textColor,
//             }}
//           >

//             {startDate && (
//               <span>
//                 {startDate}
//               </span>
//             )}

//             {startDate &&
//               startTime && (
//                 <span>•</span>
//               )}

//             {startTime && (
//               <span>
//                 {startTime}
//               </span>
//             )}

//           </div>
//         )}


//         {availableDays.length >
//           0 && (
//           <p
//             className="mt-1 truncate text-[9px]"
//             style={{
//               color:
//                 branding.textColor,
//             }}
//           >
//             {availableDays.join(
//               " • "
//             )}
//           </p>
//         )}

//       </div>

//     </article>
//   );
// }


// /* =========================================================
//    TRAINERS
// ========================================================= */

// function TrainersSection({
//   trainers,
//   branding,
// }) {
//   return (
//     <section
//       className="py-9"
//       style={{
//         backgroundColor:
//           branding.pageBackgroundColor,
//       }}
//     >

//       <div className="mx-auto max-w-7xl px-5">

//         <SectionHeading
//           eyebrow="Our Trainers"
//           title="Learn From Expert Trainers"
//           branding={branding}
//           action={
//             <Link
//               to="/institute/website/preview/trainers"
//               className="hidden items-center gap-1 text-[10px] font-semibold sm:flex"
//               style={{
//                 color:
//                   branding.buttonColor,

//                 fontFamily:
//                   fontValue(
//                     branding.fontBody
//                   ),
//               }}
//             >
//               View all trainers
//               <ArrowRight size={14} />
//             </Link>
//           }
//         />


//         <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

//           {trainers
//             .slice(0, 4)
//             .map(
//               (trainer, index) => (
//                 <TrainerCard
//                   key={
//                     trainer?.id ||
//                     index
//                   }
//                   trainer={trainer}
//                   branding={branding}
//                 />
//               )
//             )}

//         </div>

//       </div>

//     </section>
//   );
// }


// /* =========================================================
//    TRAINER CARD
// ========================================================= */

// function TrainerCard({
//   trainer,
//   branding,
// }) {
//   const id =
//     trainer?.id;

//   const name =
//     typeof trainer?.full_name ===
//     "string"
//       ? trainer.full_name
//       : trainer?.name ||
//         "Trainer";

//   const image =
//     trainer?.profile_image ||
//     trainer?.profileImage ||
//     trainer?.image;

//   const specialty =
//     trainer?.specialty ||
//     "Expert Instructor";

//   const rating =
//     Number(
//       trainer?.rating || 0
//     );

//   const totalReviews =
//     Number(
//       trainer?.total_reviews || 0
//     );

//   const totalStudents =
//     Number(
//       trainer?.total_students || 0
//     );


//   return (
//     <article
//       className="overflow-hidden border transition hover:-translate-y-1 hover:shadow-md"
//       style={{
//         borderColor:
//           hexWithOpacity(
//             branding.textColor,
//             "18"
//           ),

//         backgroundColor:
//           branding.cardBackgroundColor,

//         borderRadius:
//           "10px",
//       }}
//     >

//       <Link
//         to={`/institute/website/preview/trainers/${id}`}
//       >

//         <div
//           className="relative flex h-[175px] items-end justify-center overflow-hidden"
//           style={{
//             backgroundColor:
//               hexWithOpacity(
//                 branding.subheadingColor,
//                 "08"
//               ),
//           }}
//         >

//           {image ? (
//             <img
//               src={image}
//               alt={name}
//               className="h-full w-full object-cover object-top"
//             />
//           ) : (
//             <div
//               className="mb-5 flex h-24 w-24 items-center justify-center rounded-full text-3xl font-bold"
//               style={{
//                 backgroundColor:
//                   branding.buttonColor,

//                 color:
//                   branding.buttonTextColor,
//               }}
//             >
//               {name
//                 .charAt(0)
//                 .toUpperCase()}
//             </div>
//           )}

//         </div>

//       </Link>


//       <div className="p-3">

//         <h3
//           className="text-xs"
//           style={{
//             color:
//               branding.headingColor,

//             fontFamily:
//               fontValue(
//                 branding.fontHeading
//               ),

//             fontWeight:
//               branding.headingWeight,
//           }}
//         >
//           {name}
//         </h3>


//         <p
//           className="mt-1 truncate text-[9px]"
//           style={{
//             color:
//               branding.textColor,

//             fontFamily:
//               fontValue(
//                 branding.fontBody
//               ),
//           }}
//         >
//           {specialty}
//         </p>


//         <div className="mt-2 flex items-center justify-between">

//           <div className="flex items-center gap-1">

//             <Star
//               size={12}
//               fill={
//                 branding.iconColor
//               }
//               style={{
//                 color:
//                   branding.iconColor,
//               }}
//             />

//             <span
//               className="text-[10px] font-semibold"
//               style={{
//                 color:
//                   branding.headingColor,
//               }}
//             >
//               {rating > 0
//                 ? rating.toFixed(1)
//                 : "0.0"}
//             </span>

//           </div>


//           <span
//             className="text-[9px]"
//             style={{
//               color:
//                 branding.textColor,
//             }}
//           >
//             {totalReviews} Reviews
//           </span>

//         </div>


//         <div
//           className="mt-2 flex items-center gap-1 text-[9px]"
//           style={{
//             color:
//               branding.textColor,
//           }}
//         >

//           <Users
//             size={12}
//             style={{
//               color:
//                 branding.iconColor,
//             }}
//           />

//           {totalStudents.toLocaleString()}
//           {" "}
//           Students

//         </div>

//       </div>

//     </article>
//   );
// }


// /* =========================================================
//    CATEGORIES
// ========================================================= */

// function CategoriesSection({
//   categories,
//   branding,
// }) {
//   const icons = [
//     <Palette size={27} />,
//     <Music size={27} />,
//     <Users size={27} />,
//     <Camera size={27} />,
//     <Drama size={27} />,
//     <Monitor size={27} />,
//   ];


//   return (
//     <section
//       className="py-9"
//       style={{
//         backgroundColor:
//           branding.pageBackgroundColor,
//       }}
//     >

//       <div className="mx-auto max-w-7xl px-5">

//         <SectionHeading
//           eyebrow="Top Categories"
//           title="Browse Top Categories"
//           branding={branding}
//         />


//         <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">

//           {categories
//             .slice(0, 6)
//             .map(
//               (
//                 category,
//                 index
//               ) => {

//                 const name =
//                   category?.name ||
//                   category?.category_name ||
//                   category?.title ||
//                   "Category";


//                 return (
//                   <Link
//                     key={
//                       category?.id ||
//                       index
//                     }
//                     to="/institute/website/preview/classes"
//                     className="flex h-[90px] flex-col items-center justify-center border transition hover:-translate-y-1 hover:shadow-sm"
//                     style={{
//                       backgroundColor:
//                         branding.cardBackgroundColor,

//                       borderColor:
//                         hexWithOpacity(
//                           branding.textColor,
//                           "18"
//                         ),

//                       borderRadius:
//                         "10px",
//                     }}
//                   >

//                     <div
//                       style={{
//                         color:
//                           branding.iconColor,
//                       }}
//                     >
//                       {icons[
//                         index % 6
//                       ]}
//                     </div>


//                     <p
//                       className="mt-2 text-[10px]"
//                       style={{
//                         color:
//                           branding.headingColor,

//                         fontFamily:
//                           fontValue(
//                             branding.fontHeading
//                           ),

//                         fontWeight:
//                           branding.headingWeight,
//                       }}
//                     >
//                       {name}
//                     </p>

//                   </Link>
//                 );
//               }
//             )}

//         </div>

//       </div>

//     </section>
//   );
// }


// /* =========================================================
//    TESTIMONIALS
// ========================================================= */

// function TestimonialsSection({
//   testimonials,
//   branding,
// }) {
//   return (
//     <section
//       className="py-9"
//       style={{
//         backgroundColor:
//           branding.subheadingColor
//             ? hexWithOpacity(
//                 branding.subheadingColor,
//                 "06"
//               )
//             : branding.pageBackgroundColor,
//       }}
//     >

//       <div className="mx-auto max-w-7xl px-5">

//         <SectionHeading
//           eyebrow="Testimonials"
//           title="What Our Students Say"
//           branding={branding}
//         />


//         <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">

//           {testimonials
//             .slice(0, 3)
//             .map(
//               (
//                 testimonial,
//                 index
//               ) => {

//                 const name =
//                   testimonial?.student_name ||
//                   testimonial?.studentName ||
//                   testimonial?.name ||
//                   "Student";


//                 const role =
//                   testimonial?.role ||
//                   testimonial?.designation ||
//                   "Student";


//                 const text =
//                   testimonial?.testimonial_text ||
//                   testimonial?.testimonialText ||
//                   testimonial?.review ||
//                   testimonial?.comment ||
//                   testimonial?.message ||
//                   "The classes are well structured and the trainers are very supportive.";


//                 const avatar =
//                   testimonial?.avatar ||
//                   testimonial?.student_image ||
//                   testimonial?.profile_image ||
//                   testimonial?.image;


//                 const rating = Math.min(
//                   5,
//                   Math.max(
//                     0,
//                     Number(
//                       testimonial?.rating ||
//                         5
//                     )
//                   )
//                 );


//                 return (
//                   <article
//                     key={
//                       testimonial?.id ||
//                       index
//                     }
//                     className="border p-4 shadow-sm"
//                     style={{
//                       backgroundColor:
//                         branding.cardBackgroundColor,

//                       borderColor:
//                         hexWithOpacity(
//                           branding.textColor,
//                           "18"
//                         ),

//                       borderRadius:
//                         "10px",
//                     }}
//                   >

//                     <div className="flex items-center gap-1">

//                       <span
//                         className="text-xl font-bold"
//                         style={{
//                           color:
//                             branding.subheadingColor,
//                         }}
//                       >
//                         "
//                       </span>


//                       {[
//                         1,
//                         2,
//                         3,
//                         4,
//                         5,
//                       ].map(
//                         (star) => (
//                           <Star
//                             key={star}
//                             size={12}
//                             fill={
//                               star <=
//                               rating
//                                 ? branding.iconColor
//                                 : "none"
//                             }
//                             style={{
//                               color:
//                                 branding.iconColor,
//                             }}
//                           />
//                         )
//                       )}

//                     </div>


//                     <p
//                       className="mt-2 min-h-[60px] text-[10px] italic sm:text-xs"
//                       style={{
//                         color:
//                           branding.textColor,

//                         fontFamily:
//                           fontValue(
//                             branding.fontBody
//                           ),

//                         fontWeight:
//                           branding.bodyWeight,

//                         lineHeight:
//                           branding.bodyLineHeight,

//                         letterSpacing:
//                           branding.bodyLetterSpacing,
//                       }}
//                     >
//                       "{text}"
//                     </p>


//                     <div className="mt-4 flex items-center gap-2.5">

//                       {avatar ? (
//                         <img
//                           src={avatar}
//                           alt={name}
//                           className="h-9 w-9 rounded-full object-cover"
//                         />
//                       ) : (
//                         <div
//                           className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold"
//                           style={{
//                             backgroundColor:
//                               branding.buttonColor,

//                             color:
//                               branding.buttonTextColor,
//                           }}
//                         >
//                           {String(name)
//                             .charAt(0)
//                             .toUpperCase()}
//                         </div>
//                       )}


//                       <div>

//                         <h4
//                           className="text-[10px]"
//                           style={{
//                             color:
//                               branding.headingColor,

//                             fontFamily:
//                               fontValue(
//                                 branding.fontHeading
//                               ),

//                             fontWeight:
//                               branding.headingWeight,
//                           }}
//                         >
//                           {name}
//                         </h4>


//                         <p
//                           className="text-[9px]"
//                           style={{
//                             color:
//                               branding.textColor,

//                             fontFamily:
//                               fontValue(
//                                 branding.fontBody
//                               ),
//                           }}
//                         >
//                           {role}
//                         </p>

//                       </div>

//                     </div>

//                   </article>
//                 );
//               }
//             )}

//         </div>

//       </div>

//     </section>
//   );
// }


// // src/pages/institute/Website/WebsiteHome.jsx

// import { useEffect, useMemo, useState } from "react";
// import { Link, useOutletContext } from "react-router-dom";

// import {
//   ArrowRight,
//   BookOpen,
//   Star,
//   Users,
//   Palette,
//   Music,
//   Camera,
//   Drama,
//   Monitor,
//   Clock3,
//   ChevronLeft,
//   ChevronRight,
//   Award,
// } from "lucide-react";


// /* =========================================================
//    WEBSITE HOME

//    SECTION VISIBILITY:

//    home
//       -> Hero / Banners

//    courses
//       -> Popular Classes

//    trainers
//       -> Expert Trainers

//    categories
//       -> Top Categories

//    testimonials
//       -> Testimonials

//    Visibility is controlled from:
//    Website → Sections
// ========================================================= */


// /* =========================================================
//    BRANDING HELPERS
// ========================================================= */

// const getBranding = (branding = {}) => {
//   return {
//     /* COLORS */

//     navbarColor:
//       branding?.navbarColor ||
//       branding?.navbar_color ||
//       "#1F2937",

//     headingColor:
//       branding?.headingColor ||
//       branding?.heading_color ||
//       "#111827",

//     subheadingColor:
//       branding?.subheadingColor ||
//       branding?.subheading_color ||
//       "#5B21B6",

//     textColor:
//       branding?.textColor ||
//       branding?.text_color ||
//       "#111827",

//     iconColor:
//       branding?.iconColor ||
//       branding?.icon_color ||
//       "#F59E0B",

//     buttonColor:
//       branding?.buttonColor ||
//       branding?.button_color ||
//       "#7C3AED",

//     buttonTextColor:
//       branding?.buttonTextColor ||
//       branding?.button_text_color ||
//       "#FFFFFF",

//     pageBackgroundColor:
//       branding?.pageBackgroundColor ||
//       branding?.page_background_color ||
//       "#FAFAF9",

//     cardBackgroundColor:
//       branding?.cardBackgroundColor ||
//       branding?.card_background_color ||
//       "#FFFFFF",

//     footerBackgroundColor:
//       branding?.footerBackgroundColor ||
//       branding?.footer_background_color ||
//       "#1F2937",

//     footerHeadingColor:
//       branding?.footerHeadingColor ||
//       branding?.footer_heading_color ||
//       "#FFFFFF",

//     footerTextColor:
//       branding?.footerTextColor ||
//       branding?.footer_text_color ||
//       "#FAFAF9",


//     /* FONTS */

//     fontHeading:
//       branding?.fontHeading ||
//       branding?.font_heading ||
//       "Inter",

//     fontSubheading:
//       branding?.fontSubheading ||
//       branding?.font_subheading ||
//       "Inter",

//     fontBody:
//       branding?.fontBody ||
//       branding?.font_body ||
//       "Inter",


//     /* HEADING TYPOGRAPHY */

//     headingWeight:
//       branding?.headingWeight ||
//       branding?.heading_weight ||
//       700,

//     headingLineHeight:
//       branding?.headingLineHeight ||
//       branding?.heading_line_height ||
//       1.15,

//     headingLetterSpacing:
//       branding?.headingLetterSpacing ??
//       branding?.heading_letter_spacing ??
//       0,


//     /* SUBHEADING TYPOGRAPHY */

//     subheadingWeight:
//       branding?.subheadingWeight ||
//       branding?.subheading_weight ||
//       600,

//     subheadingLineHeight:
//       branding?.subheadingLineHeight ||
//       branding?.subheading_line_height ||
//       1.4,


//     /* BODY TYPOGRAPHY */

//     bodyWeight:
//       branding?.bodyWeight ||
//       branding?.body_weight ||
//       400,

//     bodyLineHeight:
//       branding?.bodyLineHeight ||
//       branding?.body_line_height ||
//       1.6,

//     bodyLetterSpacing:
//       branding?.bodyLetterSpacing ??
//       branding?.body_letter_spacing ??
//       0,


//     /* APPEARANCE */

//     roundedButtons:
//       branding?.roundedButtons ??
//       branding?.rounded_buttons ??
//       true,
//   };
// };


// /* =========================================================
//    SECTION TYPE NORMALIZATION
// ========================================================= */

// const normalizeSectionType = (value) => {
//   if (
//     value === null ||
//     value === undefined
//   ) {
//     return "";
//   }

//   return String(value)
//     .trim()
//     .toLowerCase()
//     .replace(/[\s_-]+/g, "");
// };


// /* =========================================================
//    SECTION ALIASES

//    This makes different names point to the
//    same website section.
// ========================================================= */

// const SECTION_ALIASES = {
//   home: "home",
//   hero: "home",
//   banner: "home",

//   about: "about",
//   aboutus: "about",

//   courses: "courses",
//   course: "courses",
//   classes: "courses",
//   class: "courses",
//   popularclasses: "courses",
//   popularclass: "courses",

//   trainers: "trainers",
//   trainer: "trainers",

//   categories: "categories",
//   category: "categories",

//   testimonials: "testimonials",
//   testimonial: "testimonials",

//   sessions: "sessions",
//   session: "sessions",

//   dashboard: "dashboard",

//   studentlogin: "studentlogin",
// };


// /* =========================================================
//    NORMALIZE SECTION VALUE
// ========================================================= */

// const getNormalizedSectionType = (
//   value
// ) => {
//   const normalized =
//     normalizeSectionType(value);

//   return (
//     SECTION_ALIASES[normalized] ||
//     normalized
//   );
// };


// /* =========================================================
//    NORMALIZE BOOLEAN

//    Important:

//    Boolean("0") === true

//    So we must NOT use Boolean()
//    directly for MySQL values.
// ========================================================= */

// const normalizeBoolean = (
//   value,
//   defaultValue = false
// ) => {
//   if (
//     value === undefined ||
//     value === null
//   ) {
//     return defaultValue;
//   }

//   if (value === true) {
//     return true;
//   }

//   if (value === false) {
//     return false;
//   }

//   if (value === 1) {
//     return true;
//   }

//   if (value === 0) {
//     return false;
//   }

//   const normalized =
//     String(value)
//       .trim()
//       .toLowerCase();

//   if (
//     normalized === "true" ||
//     normalized === "1" ||
//     normalized === "yes" ||
//     normalized === "on"
//   ) {
//     return true;
//   }

//   if (
//     normalized === "false" ||
//     normalized === "0" ||
//     normalized === "no" ||
//     normalized === "off" ||
//     normalized === ""
//   ) {
//     return false;
//   }

//   return defaultValue;
// };


// /* =========================================================
//    CSS HELPERS
// ========================================================= */

// const hexWithOpacity = (
//   color,
//   opacity = "10"
// ) => {
//   if (!color) {
//     return `#000000${opacity}`;
//   }

//   if (
//     typeof color === "string" &&
//     color.startsWith("#") &&
//     color.length === 7
//   ) {
//     return `${color}${opacity}`;
//   }

//   return color;
// };


// const buttonRadius = (
//   branding
// ) => {
//   return branding?.roundedButtons
//     ? "999px"
//     : "6px";
// };


// const fontValue = (
//   font
// ) => {
//   if (!font) {
//     return "Inter, sans-serif";
//   }

//   return `'${font}', sans-serif`;
// };


// /* =========================================================
//    MAIN HOME PAGE
// ========================================================= */

// export default function WebsiteHome() {

//   const context =
//     useOutletContext() || {};


//   const {
//     institute = {},

//     instituteName = "",

//     branding: rawBranding = {},

//     banners = [],

//     bannersLoading = false,

//     categories = [],

//     classes = [],

//     trainers = [],

//     testimonials = [],

//     sectionEnabled,

//     getContent,
//   } = context;


//   /* =======================================================
//      BRANDING
//   ======================================================= */

//   const branding = useMemo(
//     () =>
//       getBranding(
//         rawBranding
//       ),
//     [rawBranding]
//   );


//   /* =======================================================
//      SAFE DATA
//   ======================================================= */

//   const categoryList =
//     Array.isArray(categories)
//       ? categories
//       : [];


//   const classList =
//     Array.isArray(classes)
//       ? classes
//       : [];


//   const trainerList =
//     Array.isArray(trainers)
//       ? trainers
//       : [];


//   const testimonialList =
//     Array.isArray(testimonials)
//       ? testimonials
//       : [];


//   const bannerList =
//     Array.isArray(banners)
//       ? banners
//       : [];


//   /* =======================================================
//      INSTITUTE NAME
//   ======================================================= */

//   const displayInstituteName =
//     instituteName ||
//     institute?.name ||
//     institute?.institute_name ||
//     "Fine Arts Institute";


//   /* =======================================================
//      HOME CONTENT
//   ======================================================= */

//   const homeContent =
//     typeof getContent ===
//     "function"
//       ? getContent("home") ||
//         {}
//       : {};


//   const heroBadge =
//     homeContent?.badge ||
//     "EMPOWERING YOUR FUTURE";


//   const heroTitle =
//     homeContent?.title ||
//     "Learn New Skills,";


//   const heroHighlight =
//     homeContent?.highlight ||
//     "Achieve Your Goals";


//   const heroDescription =
//     homeContent?.description ||
//     "Join expert-led classes, learn from experienced trainers, and achieve skills that help you grow in your career and life.";


//   /* =======================================================
//      SECTION VISIBILITY

//      This is the important part.

//      The dashboard uses:

//      home
//      courses
//      trainers
//      categories
//      testimonials

//      We normalize all incoming values before
//      comparing them.
//   ======================================================= */

//   const isSectionEnabled = (
//     requestedSection
//   ) => {

//     /*
//      * If WebsitePreview already provides
//      * sectionEnabled(), use it.
//      */

//     if (
//       typeof sectionEnabled ===
//       "function"
//     ) {
//       const result =
//         sectionEnabled(
//           requestedSection
//         );

//       return normalizeBoolean(
//         result,
//         true
//       );
//     }


//     /*
//      * Fallback.

//      * This makes the Home page safe even
//      * if sectionEnabled is temporarily
//      * unavailable.
//      */

//     return true;
//   };


//   /* =======================================================
//      NORMALIZE BANNERS
//   ======================================================= */

//   const homeBanners =
//     useMemo(() => {

//       return bannerList

//         .map((banner) => {

//           if (!banner) {
//             return null;
//           }


//           const type =
//             String(
//               banner?.banner_type ??
//                 banner?.bannerType ??
//                 banner?.type ??
//                 ""
//             )
//               .trim()
//               .toUpperCase();


//           const active =
//             banner?.is_active ??
//             banner?.isActive ??
//             banner?.active ??
//             true;


//           const isActive =
//             normalizeBoolean(
//               active,
//               true
//             );


//           const image =
//             banner?.image_url ||
//             banner?.image ||
//             banner?.imageUrl ||
//             banner?.url ||
//             "";


//           return {
//             ...banner,

//             banner_type:
//               type,

//             is_active:
//               isActive,

//             image_url:
//               image,

//             display_order:
//               Number(
//                 banner?.display_order ??
//                   banner?.displayOrder ??
//                   1
//               ),
//           };

//         })

//         .filter(
//           (banner) =>
//             banner &&
//             banner.banner_type ===
//               "HOME" &&
//             banner.is_active &&
//             banner.image_url
//         )

//         .sort(
//           (a, b) =>
//             a.display_order -
//             b.display_order
//         );

//     }, [bannerList]);


//   /* =======================================================
//      BANNER STATE
//   ======================================================= */

//   const [
//     currentBanner,
//     setCurrentBanner,
//   ] = useState(0);


//   useEffect(() => {

//     if (
//       currentBanner >=
//       homeBanners.length
//     ) {
//       setCurrentBanner(0);
//     }

//   }, [
//     currentBanner,
//     homeBanners.length,
//   ]);


//   useEffect(() => {

//     if (
//       homeBanners.length <= 1
//     ) {
//       return undefined;
//     }


//     const timer =
//       setInterval(() => {

//         setCurrentBanner(
//           (previous) =>
//             previous >=
//             homeBanners.length - 1
//               ? 0
//               : previous + 1
//         );

//       }, 5000);


//     return () =>
//       clearInterval(timer);

//   }, [
//     homeBanners.length,
//   ]);


//   /* =======================================================
//      RENDER
//   ======================================================= */

//   return (

//     <main
//       className="w-full overflow-hidden"

//       style={{
//         backgroundColor:
//           branding.pageBackgroundColor,

//         color:
//           branding.textColor,

//         fontFamily:
//           fontValue(
//             branding.fontBody
//           ),

//         fontWeight:
//           branding.bodyWeight,

//         lineHeight:
//           branding.bodyLineHeight,

//         letterSpacing:
//           branding.bodyLetterSpacing,
//       }}
//     >


//       {/* =================================================
//           HERO
//       ================================================= */}

//       {isSectionEnabled(
//         "home"
//       ) && (

//         <HeroSection
//           banners={
//             homeBanners
//           }

//           bannersLoading={
//             bannersLoading
//           }

//           currentBanner={
//             currentBanner
//           }

//           setCurrentBanner={
//             setCurrentBanner
//           }

//           branding={
//             branding
//           }

//           instituteName={
//             displayInstituteName
//           }

//           heroBadge={
//             heroBadge
//           }

//           heroTitle={
//             heroTitle
//           }

//           heroHighlight={
//             heroHighlight
//           }

//           heroDescription={
//             heroDescription
//           }

//           classCount={
//             classList.length
//           }

//           trainerCount={
//             trainerList.length
//           }
//         />

//       )}


//       {/* =================================================
//           POPULAR CLASSES

//           Dashboard:
//           Courses → Popular Classes
//       ================================================= */}

//       {isSectionEnabled(
//         "courses"
//       ) &&
//         classList.length >
//           0 && (

//           <PopularClasses
//             classes={
//               classList
//             }

//             branding={
//               branding
//             }
//           />

//         )}


//       {/* =================================================
//           TRAINERS
//       ================================================= */}

//       {isSectionEnabled(
//         "trainers"
//       ) &&
//         trainerList.length >
//           0 && (

//           <TrainersSection
//             trainers={
//               trainerList
//             }

//             branding={
//               branding
//             }
//           />

//         )}


//       {/* =================================================
//           CATEGORIES
//       ================================================= */}

//       {isSectionEnabled(
//         "categories"
//       ) &&
//         categoryList.length >
//           0 && (

//           <CategoriesSection
//             categories={
//               categoryList
//             }

//             branding={
//               branding
//             }
//           />

//         )}


//       {/* =================================================
//           TESTIMONIALS
//       ================================================= */}

//       {isSectionEnabled(
//         "testimonials"
//       ) &&
//         testimonialList.length >
//           0 && (

//           <TestimonialsSection
//             testimonials={
//               testimonialList.slice(
//                 0,
//                 3
//               )
//             }

//             branding={
//               branding
//             }
//           />

//         )}

//     </main>
//   );
// }


// /* =========================================================
//    HERO SECTION
// ========================================================= */

// function HeroSection({
//   banners,
//   bannersLoading,
//   currentBanner,
//   setCurrentBanner,
//   branding,
//   instituteName,
//   heroBadge,
//   heroTitle,
//   heroHighlight,
//   heroDescription,
//   classCount,
//   trainerCount,
// }) {

//   /* -------------------------------------------------------
//      LOADING
//   ------------------------------------------------------- */

//   if (
//     bannersLoading &&
//     banners.length === 0
//   ) {

//     return (

//       <section
//         style={{
//           backgroundColor:
//             branding.pageBackgroundColor,
//         }}
//       >

//         <div
//           className="mx-auto h-[420px] max-w-7xl animate-pulse"

//           style={{
//             backgroundColor:
//               branding.cardBackgroundColor,
//           }}
//         />

//       </section>

//     );
//   }


//   /* -------------------------------------------------------
//      NO BANNER
//   ------------------------------------------------------- */

//   if (
//     banners.length === 0
//   ) {

//     return (

//       <section
//         className="relative overflow-hidden"

//         style={{
//           backgroundColor:
//             branding.pageBackgroundColor,
//         }}
//       >

//         <div className="mx-auto max-w-7xl px-5">

//           <div className="grid min-h-[430px] items-center lg:grid-cols-2">


//             {/* LEFT */}

//             <div className="relative z-10 py-12">

//               <div
//                 className="inline-flex items-center gap-2 px-4 py-2 text-[10px] font-bold tracking-wide"

//                 style={{
//                   color:
//                     branding.subheadingColor,

//                   backgroundColor:
//                     hexWithOpacity(
//                       branding.subheadingColor,
//                       "12"
//                     ),

//                   borderRadius:
//                     buttonRadius(
//                       branding
//                     ),
//                 }}
//               >

//                 <Award
//                   size={13}
//                   style={{
//                     color:
//                       branding.iconColor,
//                   }}
//                 />

//                 {heroBadge}

//               </div>


//               <h1
//                 className="mt-5 max-w-[580px] text-4xl sm:text-5xl lg:text-[52px]"

//                 style={{
//                   color:
//                     branding.headingColor,

//                   fontFamily:
//                     fontValue(
//                       branding.fontHeading
//                     ),

//                   fontWeight:
//                     branding.headingWeight,

//                   lineHeight:
//                     branding.headingLineHeight,

//                   letterSpacing:
//                     branding.headingLetterSpacing,
//                 }}
//               >

//                 {heroTitle}

//                 <br />

//                 <span
//                   style={{
//                     color:
//                       branding.subheadingColor,
//                   }}
//                 >
//                   {heroHighlight}
//                 </span>

//               </h1>


//               <p
//                 className="mt-5 max-w-[530px] text-sm sm:text-base"

//                 style={{
//                   color:
//                     branding.textColor,

//                   fontFamily:
//                     fontValue(
//                       branding.fontBody
//                     ),

//                   fontWeight:
//                     branding.bodyWeight,

//                   lineHeight:
//                     branding.bodyLineHeight,

//                   letterSpacing:
//                     branding.bodyLetterSpacing,
//                 }}
//               >
//                 {heroDescription}
//               </p>


//               {/* BUTTONS */}

//               <div className="mt-6 flex flex-wrap gap-3">

//                 <BrandButton
//                   to="/institute/website/preview/classes"
//                   branding={
//                     branding
//                   }
//                 >
//                   Explore Classes

//                   <ArrowRight
//                     size={16}
//                   />

//                 </BrandButton>


//                 <BrandOutlineButton
//                   to="/institute/website/preview/trainers"
//                   branding={
//                     branding
//                   }
//                 >
//                   Browse Trainers
//                 </BrandOutlineButton>

//               </div>


//               {/* STATS */}

//               <div className="mt-8 flex flex-wrap gap-8">

//                 <HeroStat
//                   icon={
//                     <Users
//                       size={20}
//                     />
//                   }

//                   value="2K+"

//                   label="Students"

//                   branding={
//                     branding
//                   }
//                 />


//                 <HeroStat
//                   icon={
//                     <BookOpen
//                       size={20}
//                     />
//                   }

//                   value={`${classCount}+`}

//                   label="Classes"

//                   branding={
//                     branding
//                   }
//                 />


//                 <HeroStat
//                   icon={
//                     <Award
//                       size={20}
//                     />
//                   }

//                   value={`${trainerCount}+`}

//                   label="Expert Trainers"

//                   branding={
//                     branding
//                   }
//                 />

//               </div>

//             </div>


//             {/* RIGHT */}

//             <div className="hidden h-full min-h-[430px] items-end justify-center lg:flex">

//               <div
//                 className="flex h-[360px] w-[480px] items-center justify-center rounded-[50%]"

//                 style={{
//                   backgroundColor:
//                     hexWithOpacity(
//                       branding.iconColor,
//                       "10"
//                     ),
//                 }}
//               >

//                 <BookOpen
//                   size={100}

//                   style={{
//                     color:
//                       hexWithOpacity(
//                         branding.iconColor,
//                         "45"
//                       ),
//                   }}
//                 />

//               </div>

//             </div>

//           </div>

//         </div>

//       </section>

//     );
//   }


//   /* -------------------------------------------------------
//      ACTIVE BANNER
//   ------------------------------------------------------- */

//   const banner =
//     banners[
//       currentBanner
//     ];


//   const image =
//     banner?.image_url ||
//     banner?.image ||
//     "";


//   const title =
//     banner?.title ||
//     heroTitle;


//   const description =
//     banner?.description ||
//     heroDescription;


//   const buttonText =
//     banner?.button_text ||
//     banner?.buttonText ||
//     "Explore Classes";


//   const buttonLink =
//     banner?.button_link ||
//     banner?.buttonLink ||
//     "/institute/website/preview/classes";


//   return (

//     <section
//       className="relative overflow-hidden"

//       style={{
//         backgroundColor:
//           branding.pageBackgroundColor,
//       }}
//     >

//       <div className="mx-auto grid min-h-[430px] max-w-7xl lg:grid-cols-2">


//         {/* LEFT CONTENT */}

//         <div className="relative z-20 flex items-center px-5 py-12 lg:px-0">

//           <div className="max-w-[570px]">

//             <div
//               className="inline-flex items-center gap-2 px-4 py-2 text-[10px] font-bold tracking-wide"

//               style={{
//                 color:
//                   branding.subheadingColor,

//                 backgroundColor:
//                   hexWithOpacity(
//                     branding.subheadingColor,
//                     "12"
//                   ),

//                 borderRadius:
//                   buttonRadius(
//                     branding
//                   ),
//               }}
//             >

//               <Award
//                 size={13}
//                 style={{
//                   color:
//                     branding.iconColor,
//                 }}
//               />

//               {heroBadge}

//             </div>


//             <h1
//               className="mt-5 text-4xl sm:text-5xl lg:text-[52px]"

//               style={{
//                 color:
//                   branding.headingColor,

//                 fontFamily:
//                   fontValue(
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
//               {title}
//             </h1>


//             <p
//               className="mt-5 max-w-[520px] text-sm sm:text-base"

//               style={{
//                 color:
//                   branding.textColor,

//                 fontFamily:
//                   fontValue(
//                     branding.fontBody
//                   ),

//                 fontWeight:
//                   branding.bodyWeight,

//                 lineHeight:
//                   branding.bodyLineHeight,

//                 letterSpacing:
//                   branding.bodyLetterSpacing,
//               }}
//             >
//               {description}
//             </p>


//             {/* BUTTONS */}

//             <div className="mt-6 flex flex-wrap gap-3">

//               <BrandButton
//                 to={buttonLink}
//                 branding={
//                   branding
//                 }
//               >

//                 {buttonText}

//                 <ArrowRight
//                   size={16}
//                 />

//               </BrandButton>


//               <BrandOutlineButton
//                 to="/institute/website/preview/trainers"
//                 branding={
//                   branding
//                 }
//               >
//                 Browse Trainers
//               </BrandOutlineButton>

//             </div>


//             {/* STATS */}

//             <div className="mt-8 flex gap-7">

//               <HeroStat
//                 icon={
//                   <Users
//                     size={19}
//                   />
//                 }

//                 value="2K+"

//                 label="Students"

//                 branding={
//                   branding
//                 }
//               />


//               <HeroStat
//                 icon={
//                   <BookOpen
//                     size={19}
//                   />
//                 }

//                 value={`${classCount}+`}

//                 label="Classes"

//                 branding={
//                   branding
//                 }
//               />


//               <HeroStat
//                 icon={
//                   <Award
//                     size={19}
//                   />
//                 }

//                 value={`${trainerCount}+`}

//                 label="Expert Trainers"

//                 branding={
//                   branding
//                 }
//               />

//             </div>

//           </div>

//         </div>


//         {/* RIGHT IMAGE */}

//         <div className="relative min-h-[330px] lg:min-h-[430px]">

//           <img
//             src={image}
//             alt={title}
//             className="absolute inset-0 h-full w-full object-cover"
//           />


//           <div
//             className="absolute inset-y-0 left-0 w-32"

//             style={{
//               background:
//                 `linear-gradient(to right, ${branding.pageBackgroundColor}, transparent)`,
//             }}
//           />


//           {/* ARROWS */}

//           {banners.length >
//             1 && (
//             <>

//               <CarouselButton
//                 direction="left"

//                 onClick={() =>
//                   setCurrentBanner(
//                     currentBanner ===
//                       0
//                       ? banners.length -
//                         1
//                       : currentBanner -
//                         1
//                   )
//                 }

//                 branding={
//                   branding
//                 }
//               />


//               <CarouselButton
//                 direction="right"

//                 onClick={() =>
//                   setCurrentBanner(
//                     currentBanner >=
//                       banners.length -
//                         1
//                       ? 0
//                       : currentBanner +
//                         1
//                   )
//                 }

//                 branding={
//                   branding
//                 }
//               />

//             </>
//           )}

//         </div>

//       </div>


//       {/* DOTS */}

//       {banners.length >
//         1 && (

//         <div className="absolute bottom-4 left-1/2 z-40 flex -translate-x-1/2 gap-1.5">

//           {banners.map(
//             (
//               bannerItem,
//               index
//             ) => (

//               <button
//                 key={
//                   bannerItem?.id ||
//                   index
//                 }

//                 type="button"

//                 onClick={() =>
//                   setCurrentBanner(
//                     index
//                   )
//                 }

//                 aria-label={`Go to banner ${index + 1}`}

//                 className="h-2 transition-all"

//                 style={{
//                   width:
//                     currentBanner ===
//                     index
//                       ? 22
//                       : 7,

//                   backgroundColor:
//                     currentBanner ===
//                     index
//                       ? branding.buttonColor
//                       : branding.iconColor,

//                   borderRadius:
//                     buttonRadius(
//                       branding
//                     ),
//                 }}
//               />

//             )
//           )}

//         </div>

//       )}

//     </section>
//   );
// }


// /* =========================================================
//    CAROUSEL BUTTON
// ========================================================= */

// function CarouselButton({
//   direction,
//   onClick,
//   branding,
// }) {

//   const Icon =
//     direction === "left"
//       ? ChevronLeft
//       : ChevronRight;


//   return (

//     <button
//       type="button"

//       onClick={
//         onClick
//       }

//       className="absolute top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center shadow-md"

//       style={{
//         [direction === "left"
//           ? "left"
//           : "right"]: "16px",

//         backgroundColor:
//           branding.cardBackgroundColor,

//         color:
//           branding.iconColor,

//         borderRadius:
//           buttonRadius(
//             branding
//           ),
//       }}

//       aria-label={
//         direction === "left"
//           ? "Previous banner"
//           : "Next banner"
//       }
//     >

//       <Icon
//         size={18}
//       />

//     </button>
//   );
// }


// /* =========================================================
//    HERO STAT
// ========================================================= */

// function HeroStat({
//   icon,
//   value,
//   label,
//   branding,
// }) {

//   return (

//     <div className="flex items-center gap-2">

//       <div
//         style={{
//           color:
//             branding.iconColor,
//         }}
//       >
//         {icon}
//       </div>


//       <div>

//         <p
//           className="text-sm"

//           style={{
//             color:
//               branding.headingColor,

//             fontFamily:
//               fontValue(
//                 branding.fontHeading
//               ),

//             fontWeight:
//               branding.headingWeight,
//           }}
//         >
//           {value}
//         </p>


//         <p
//           className="text-[9px]"

//           style={{
//             color:
//               branding.textColor,

//             fontFamily:
//               fontValue(
//                 branding.fontBody
//               ),
//           }}
//         >
//           {label}
//         </p>

//       </div>

//     </div>
//   );
// }


// /* =========================================================
//    BRAND BUTTON
// ========================================================= */

// function BrandButton({
//   to,
//   branding,
//   children,
// }) {

//   return (

//     <Link
//       to={to}

//       className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold transition hover:opacity-90"

//       style={{
//         backgroundColor:
//           branding.buttonColor,

//         color:
//           branding.buttonTextColor,

//         borderRadius:
//           buttonRadius(
//             branding
//           ),

//         fontFamily:
//           fontValue(
//             branding.fontBody
//           ),

//         fontWeight:
//           branding.bodyWeight,
//       }}
//     >
//       {children}
//     </Link>
//   );
// }


// /* =========================================================
//    OUTLINE BUTTON
// ========================================================= */

// function BrandOutlineButton({
//   to,
//   branding,
//   children,
// }) {

//   return (

//     <Link
//       to={to}

//       className="inline-flex items-center gap-2 border px-6 py-3 text-sm font-semibold transition hover:opacity-80"

//       style={{
//         borderColor:
//           branding.buttonColor,

//         color:
//           branding.buttonColor,

//         backgroundColor:
//           branding.cardBackgroundColor,

//         borderRadius:
//           buttonRadius(
//             branding
//           ),

//         fontFamily:
//           fontValue(
//             branding.fontBody
//           ),

//         fontWeight:
//           branding.bodyWeight,
//       }}
//     >
//       {children}
//     </Link>
//   );
// }


// /* =========================================================
//    SECTION HEADING
// ========================================================= */

// function SectionHeading({
//   eyebrow,
//   title,
//   branding,
//   action,
// }) {

//   return (

//     <div className="mb-5 flex items-end justify-between">

//       <div>

//         <p
//           className="text-[9px] font-bold uppercase"

//           style={{
//             color:
//               branding.subheadingColor,

//             fontFamily:
//               fontValue(
//                 branding.fontSubheading
//               ),

//             fontWeight:
//               branding.subheadingWeight,
//           }}
//         >
//           {eyebrow}
//         </p>


//         <h2
//           className="mt-1 text-xl sm:text-2xl"

//           style={{
//             color:
//               branding.headingColor,

//             fontFamily:
//               fontValue(
//                 branding.fontHeading
//               ),

//             fontWeight:
//               branding.headingWeight,

//             lineHeight:
//               branding.headingLineHeight,

//             letterSpacing:
//               branding.headingLetterSpacing,
//           }}
//         >
//           {title}
//         </h2>

//       </div>


//       {action}

//     </div>
//   );
// }


// /* =========================================================
//    POPULAR CLASSES
// ========================================================= */

// function PopularClasses({
//   classes,
//   branding,
// }) {

//   return (

//     <section
//       className="py-9 sm:py-11"

//       style={{
//         backgroundColor:
//           branding.pageBackgroundColor,
//       }}
//     >

//       <div className="mx-auto max-w-7xl px-5">

//         <SectionHeading
//           eyebrow="Popular Classes"
//           title="Explore Our Classes"
//           branding={
//             branding
//           }

//           action={

//             <Link
//               to="/institute/website/preview/classes"

//               className="hidden items-center gap-1 text-[10px] font-semibold sm:flex"

//               style={{
//                 color:
//                   branding.buttonColor,

//                 fontFamily:
//                   fontValue(
//                     branding.fontBody
//                   ),
//               }}
//             >

//               View all classes

//               <ArrowRight
//                 size={14}
//               />

//             </Link>
//           }
//         />


//         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

//           {classes
//             .slice(0, 4)
//             .map(
//               (
//                 item,
//                 index
//               ) => (

//                 <ClassCard
//                   key={
//                     item?.id ||
//                     index
//                   }

//                   item={
//                     item
//                   }

//                   branding={
//                     branding
//                   }
//                 />

//               )
//             )}

//         </div>

//       </div>

//     </section>
//   );
// }


// /* =========================================================
//    CLASS CARD
// ========================================================= */

// function ClassCard({
//   item,
//   branding,
// }) {

//   const id =
//     item?.id;


//   const title =
//     item?.title ||
//     item?.name ||
//     "Class";


//   const image =
//     item?.image ||
//     item?.image_url ||
//     "";


//   const trainer =
//     item?.trainer_name ||
//     item?.trainerName;


//   const trainerImage =
//     item?.trainer_image ||
//     item?.trainerImage;


//   const rating =
//     Number(
//       item?.rating || 0
//     );


//   const availableDays =
//     Array.isArray(
//       item?.available_days
//     )
//       ? item.available_days
//       : [];


//   const startDate =
//     item?.start_date;


//   const startTime =
//     item?.start_time;


//   const students =
//     item?.students;


//   const price =
//     item?.price;


//   const duration =
//     item?.duration;


//   const level =
//     item?.level;


//   return (

//     <article
//       className="overflow-hidden border transition hover:-translate-y-1 hover:shadow-md"

//       style={{
//         borderColor:
//           hexWithOpacity(
//             branding.textColor,
//             "18"
//           ),

//         backgroundColor:
//           branding.cardBackgroundColor,

//         borderRadius:
//           "10px",
//       }}
//     >

//       <Link
//         to={`/institute/website/preview/classes/${id}`}
//       >

//         <div
//           className="relative h-[155px] overflow-hidden"

//           style={{
//             backgroundColor:
//               branding.pageBackgroundColor,
//           }}
//         >

//           {image ? (

//             <img
//               src={image}
//               alt={title}
//               className="h-full w-full object-cover transition duration-500 hover:scale-105"
//             />

//           ) : (

//             <div className="flex h-full items-center justify-center">

//               <BookOpen
//                 size={50}
//                 style={{
//                   color:
//                     branding.iconColor,
//                 }}
//               />

//             </div>

//           )}


//           {level && (

//             <span
//               className="absolute left-2 top-2 px-2 py-1 text-[9px] font-semibold"

//               style={{
//                 color:
//                   branding.buttonColor,

//                 backgroundColor:
//                   branding.cardBackgroundColor,

//                 borderRadius:
//                   buttonRadius(
//                     branding
//                   ),
//               }}
//             >
//               {level}
//             </span>

//           )}


//           {price !==
//             undefined &&
//             price !== null &&
//             price !== "" && (

//             <span
//               className="absolute right-2 top-2 px-2 py-1 text-[10px] font-bold"

//               style={{
//                 color:
//                   branding.buttonColor,

//                 backgroundColor:
//                   branding.cardBackgroundColor,

//                 borderRadius:
//                   buttonRadius(
//                     branding
//                   ),
//               }}
//             >

//               {Number(price) >
//               0
//                 ? `$${price}`
//                 : "Free"}

//             </span>

//           )}

//         </div>

//       </Link>


//       <div className="p-3">

//         <h3
//           className="truncate text-xs"

//           style={{
//             color:
//               branding.headingColor,

//             fontFamily:
//               fontValue(
//                 branding.fontHeading
//               ),

//             fontWeight:
//               branding.headingWeight,
//           }}
//         >
//           {title}
//         </h3>


//         {trainer && (

//           <div className="mt-2 flex items-center gap-1.5">

//             {trainerImage ? (

//               <img
//                 src={trainerImage}
//                 alt={trainer}
//                 className="h-4 w-4 rounded-full object-cover"
//               />

//             ) : (

//               <div
//                 className="flex h-4 w-4 items-center justify-center rounded-full text-[7px] font-bold"

//                 style={{
//                   backgroundColor:
//                     branding.buttonColor,

//                   color:
//                     branding.buttonTextColor,
//                 }}
//               >
//                 {String(
//                   trainer
//                 )
//                   .charAt(0)
//                   .toUpperCase()}
//               </div>

//             )}


//             <span
//               className="truncate text-[9px]"

//               style={{
//                 color:
//                   branding.textColor,

//                 fontFamily:
//                   fontValue(
//                     branding.fontBody
//                   ),
//               }}
//             >
//               {trainer}
//             </span>

//           </div>

//         )}


//         <div className="mt-2 flex items-center gap-1">

//           <Star
//             size={13}
//             fill={
//               branding.iconColor
//             }

//             style={{
//               color:
//                 branding.iconColor,
//             }}
//           />


//           <span
//             className="text-[10px] font-semibold"

//             style={{
//               color:
//                 branding.headingColor,
//             }}
//           >
//             {rating > 0
//               ? rating.toFixed(1)
//               : "0.0"}
//           </span>


//           {students !==
//             undefined &&
//             students !== null && (

//             <span
//               className="text-[9px]"

//               style={{
//                 color:
//                   branding.textColor,
//               }}
//             >
//               ({students} Students)
//             </span>

//           )}

//         </div>


//         <div
//           className="mt-2 flex items-center gap-1.5 text-[9px]"

//           style={{
//             color:
//               branding.textColor,
//           }}
//         >

//           <Clock3
//             size={12}
//             style={{
//               color:
//                 branding.iconColor,
//             }}
//           />

//           <span>
//             {duration ||
//               "Duration not specified"}
//           </span>

//         </div>


//         {(startDate ||
//           startTime) && (

//           <div
//             className="mt-1.5 flex items-center gap-2 text-[9px]"

//             style={{
//               color:
//                 branding.textColor,
//             }}
//           >

//             {startDate && (
//               <span>
//                 {startDate}
//               </span>
//             )}


//             {startDate &&
//               startTime && (
//                 <span>
//                   •
//                 </span>
//               )}


//             {startTime && (
//               <span>
//                 {startTime}
//               </span>
//             )}

//           </div>

//         )}


//         {availableDays.length >
//           0 && (

//           <p
//             className="mt-1 truncate text-[9px]"

//             style={{
//               color:
//                 branding.textColor,
//             }}
//           >
//             {availableDays.join(
//               " • "
//             )}
//           </p>

//         )}

//       </div>

//     </article>
//   );
// }


// /* =========================================================
//    TRAINERS
// ========================================================= */

// function TrainersSection({
//   trainers,
//   branding,
// }) {

//   return (

//     <section
//       className="py-9"

//       style={{
//         backgroundColor:
//           branding.pageBackgroundColor,
//       }}
//     >

//       <div className="mx-auto max-w-7xl px-5">

//         <SectionHeading
//           eyebrow="Our Trainers"
//           title="Learn From Expert Trainers"
//           branding={
//             branding
//           }

//           action={

//             <Link
//               to="/institute/website/preview/trainers"

//               className="hidden items-center gap-1 text-[10px] font-semibold sm:flex"

//               style={{
//                 color:
//                   branding.buttonColor,

//                 fontFamily:
//                   fontValue(
//                     branding.fontBody
//                   ),
//               }}
//             >

//               View all trainers

//               <ArrowRight
//                 size={14}
//               />

//             </Link>
//           }
//         />


//         <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

//           {trainers
//             .slice(0, 4)
//             .map(
//               (
//                 trainer,
//                 index
//               ) => (

//                 <TrainerCard
//                   key={
//                     trainer?.id ||
//                     index
//                   }

//                   trainer={
//                     trainer
//                   }

//                   branding={
//                     branding
//                   }
//                 />

//               )
//             )}

//         </div>

//       </div>

//     </section>
//   );
// }


// /* =========================================================
//    TRAINER CARD
// ========================================================= */

// function TrainerCard({
//   trainer,
//   branding,
// }) {

//   const id =
//     trainer?.id;


//   const name =
//     typeof trainer?.full_name ===
//     "string"
//       ? trainer.full_name
//       : trainer?.name ||
//         "Trainer";


//   const image =
//     trainer?.profile_image ||
//     trainer?.profileImage ||
//     trainer?.image;


//   const specialty =
//     trainer?.specialty ||
//     "Expert Instructor";


//   const rating =
//     Number(
//       trainer?.rating || 0
//     );


//   const totalReviews =
//     Number(
//       trainer?.total_reviews || 0
//     );


//   const totalStudents =
//     Number(
//       trainer?.total_students || 0
//     );


//   return (

//     <article
//       className="overflow-hidden border transition hover:-translate-y-1 hover:shadow-md"

//       style={{
//         borderColor:
//           hexWithOpacity(
//             branding.textColor,
//             "18"
//           ),

//         backgroundColor:
//           branding.cardBackgroundColor,

//         borderRadius:
//           "10px",
//       }}
//     >

//       <Link
//         to={`/institute/website/preview/trainers/${id}`}
//       >

//         <div
//           className="relative flex h-[175px] items-end justify-center overflow-hidden"

//           style={{
//             backgroundColor:
//               hexWithOpacity(
//                 branding.subheadingColor,
//                 "08"
//               ),
//           }}
//         >

//           {image ? (

//             <img
//               src={image}
//               alt={name}
//               className="h-full w-full object-cover object-top"
//             />

//           ) : (

//             <div
//               className="mb-5 flex h-24 w-24 items-center justify-center rounded-full text-3xl font-bold"

//               style={{
//                 backgroundColor:
//                   branding.buttonColor,

//                 color:
//                   branding.buttonTextColor,
//               }}
//             >
//               {name
//                 .charAt(0)
//                 .toUpperCase()}
//             </div>

//           )}

//         </div>

//       </Link>


//       <div className="p-3">

//         <h3
//           className="text-xs"

//           style={{
//             color:
//               branding.headingColor,

//             fontFamily:
//               fontValue(
//                 branding.fontHeading
//               ),

//             fontWeight:
//               branding.headingWeight,
//           }}
//         >
//           {name}
//         </h3>


//         <p
//           className="mt-1 truncate text-[9px]"

//           style={{
//             color:
//               branding.textColor,

//             fontFamily:
//               fontValue(
//                 branding.fontBody
//               ),
//           }}
//         >
//           {specialty}
//         </p>


//         <div className="mt-2 flex items-center justify-between">

//           <div className="flex items-center gap-1">

//             <Star
//               size={12}
//               fill={
//                 branding.iconColor
//               }

//               style={{
//                 color:
//                   branding.iconColor,
//               }}
//             />


//             <span
//               className="text-[10px] font-semibold"

//               style={{
//                 color:
//                   branding.headingColor,
//               }}
//             >
//               {rating > 0
//                 ? rating.toFixed(1)
//                 : "0.0"}
//             </span>

//           </div>


//           <span
//             className="text-[9px]"

//             style={{
//               color:
//                 branding.textColor,
//             }}
//           >
//             {totalReviews} Reviews
//           </span>

//         </div>


//         <div
//           className="mt-2 flex items-center gap-1 text-[9px]"

//           style={{
//             color:
//               branding.textColor,
//           }}
//         >

//           <Users
//             size={12}
//             style={{
//               color:
//                 branding.iconColor,
//             }}
//           />

//           {totalStudents.toLocaleString()}
//           {" "}
//           Students

//         </div>

//       </div>

//     </article>
//   );
// }


// /* =========================================================
//    CATEGORIES
// ========================================================= */

// function CategoriesSection({
//   categories,
//   branding,
// }) {

//   const icons = [
//     <Palette
//       size={27}
//     />,

//     <Music
//       size={27}
//     />,

//     <Users
//       size={27}
//     />,

//     <Camera
//       size={27}
//     />,

//     <Drama
//       size={27}
//     />,

//     <Monitor
//       size={27}
//     />,
//   ];


//   return (

//     <section
//       className="py-9"

//       style={{
//         backgroundColor:
//           branding.pageBackgroundColor,
//       }}
//     >

//       <div className="mx-auto max-w-7xl px-5">

//         <SectionHeading
//           eyebrow="Top Categories"
//           title="Browse Top Categories"
//           branding={
//             branding
//           }
//         />


//         <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">

//           {categories
//             .slice(0, 6)
//             .map(
//               (
//                 category,
//                 index
//               ) => {

//                 const name =
//                   category?.name ||
//                   category?.category_name ||
//                   category?.title ||
//                   "Category";


//                 return (

//                   <Link
//                     key={
//                       category?.id ||
//                       index
//                     }

//                     to="/institute/website/preview/classes"

//                     className="flex h-[90px] flex-col items-center justify-center border transition hover:-translate-y-1 hover:shadow-sm"

//                     style={{
//                       backgroundColor:
//                         branding.cardBackgroundColor,

//                       borderColor:
//                         hexWithOpacity(
//                           branding.textColor,
//                           "18"
//                         ),

//                       borderRadius:
//                         "10px",
//                     }}
//                   >

//                     <div
//                       style={{
//                         color:
//                           branding.iconColor,
//                       }}
//                     >
//                       {
//                         icons[
//                           index %
//                             6
//                         ]
//                       }
//                     </div>


//                     <p
//                       className="mt-2 text-[10px]"

//                       style={{
//                         color:
//                           branding.headingColor,

//                         fontFamily:
//                           fontValue(
//                             branding.fontHeading
//                           ),

//                         fontWeight:
//                           branding.headingWeight,
//                       }}
//                     >
//                       {name}
//                     </p>

//                   </Link>

//                 );
//               }
//             )}

//         </div>

//       </div>

//     </section>
//   );
// }


// /* =========================================================
//    TESTIMONIALS
// ========================================================= */

// function TestimonialsSection({
//   testimonials,
//   branding,
// }) {

//   return (

//     <section
//       className="py-9"

//       style={{
//         backgroundColor:
//           branding.subheadingColor
//             ? hexWithOpacity(
//                 branding.subheadingColor,
//                 "06"
//               )
//             : branding.pageBackgroundColor,
//       }}
//     >

//       <div className="mx-auto max-w-7xl px-5">

//         <SectionHeading
//           eyebrow="Testimonials"
//           title="What Our Students Say"
//           branding={
//             branding
//           }
//         />


//         <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">

//           {testimonials
//             .slice(0, 3)
//             .map(
//               (
//                 testimonial,
//                 index
//               ) => {

//                 const name =
//                   testimonial?.student_name ||
//                   testimonial?.studentName ||
//                   testimonial?.name ||
//                   "Student";


//                 const role =
//                   testimonial?.role ||
//                   testimonial?.designation ||
//                   "Student";


//                 const text =
//                   testimonial?.testimonial_text ||
//                   testimonial?.testimonialText ||
//                   testimonial?.review ||
//                   testimonial?.comment ||
//                   testimonial?.message ||
//                   "The classes are well structured and the trainers are very supportive.";


//                 const avatar =
//                   testimonial?.avatar ||
//                   testimonial?.student_image ||
//                   testimonial?.profile_image ||
//                   testimonial?.image;


//                 const rating =
//                   Math.min(
//                     5,
//                     Math.max(
//                       0,
//                       Number(
//                         testimonial?.rating ||
//                           5
//                       )
//                     )
//                   );


//                 return (

//                   <article
//                     key={
//                       testimonial?.id ||
//                       index
//                     }

//                     className="border p-4 shadow-sm"

//                     style={{
//                       backgroundColor:
//                         branding.cardBackgroundColor,

//                       borderColor:
//                         hexWithOpacity(
//                           branding.textColor,
//                           "18"
//                         ),

//                       borderRadius:
//                         "10px",
//                     }}
//                   >

//                     <div className="flex items-center gap-1">

//                       <span
//                         className="text-xl font-bold"

//                         style={{
//                           color:
//                             branding.subheadingColor,
//                         }}
//                       >
//                         "
//                       </span>


//                       {[
//                         1,
//                         2,
//                         3,
//                         4,
//                         5,
//                       ].map(
//                         (star) => (

//                           <Star
//                             key={
//                               star
//                             }

//                             size={12}

//                             fill={
//                               star <=
//                               rating
//                                 ? branding.iconColor
//                                 : "none"
//                             }

//                             style={{
//                               color:
//                                 branding.iconColor,
//                             }}
//                           />

//                         )
//                       )}

//                     </div>


//                     <p
//                       className="mt-2 min-h-[60px] text-[10px] italic sm:text-xs"

//                       style={{
//                         color:
//                           branding.textColor,

//                         fontFamily:
//                           fontValue(
//                             branding.fontBody
//                           ),

//                         fontWeight:
//                           branding.bodyWeight,

//                         lineHeight:
//                           branding.bodyLineHeight,

//                         letterSpacing:
//                           branding.bodyLetterSpacing,
//                       }}
//                     >
//                       "{text}"
//                     </p>


//                     <div className="mt-4 flex items-center gap-2.5">

//                       {avatar ? (

//                         <img
//                           src={avatar}
//                           alt={name}
//                           className="h-9 w-9 rounded-full object-cover"
//                         />

//                       ) : (

//                         <div
//                           className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold"

//                           style={{
//                             backgroundColor:
//                               branding.buttonColor,

//                             color:
//                               branding.buttonTextColor,
//                           }}
//                         >
//                           {String(
//                             name
//                           )
//                             .charAt(0)
//                             .toUpperCase()}
//                         </div>

//                       )}


//                       <div>

//                         <h4
//                           className="text-[10px]"

//                           style={{
//                             color:
//                               branding.headingColor,

//                             fontFamily:
//                               fontValue(
//                                 branding.fontHeading
//                               ),

//                             fontWeight:
//                               branding.headingWeight,
//                           }}
//                         >
//                           {name}
//                         </h4>


//                         <p
//                           className="text-[9px]"

//                           style={{
//                             color:
//                               branding.textColor,

//                             fontFamily:
//                               fontValue(
//                                 branding.fontBody
//                               ),
//                           }}
//                         >
//                           {role}
//                         </p>

//                       </div>

//                     </div>

//                   </article>

//                 );
//               }
//             )}

//         </div>

//       </div>

//     </section>
//   );
// }



// src/pages/institute/Website/WebsiteHome.jsx


import { useEffect, useMemo, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";

import {
  ArrowRight,
  BookOpen,
  Star,
  Users,
  Palette,
  Music,
  Camera,
  Drama,
  Monitor,
  Clock3,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";


/* =========================================================
   BRANDING
========================================================= */

const getBranding = (branding = {}) => {
  return {
    navbarColor:
      branding?.navbarColor ??
      branding?.navbar_color ??
      "#1F2937",

    navbarTextColor:
      branding?.navbarTextColor ??
      branding?.navbar_text_color ??
      branding?.navbarText ??
      branding?.navbar_text ??
      "#FFFFFF",

    navbarIconColor:
      branding?.navbarIconColor ??
      branding?.navbar_icon_color ??
      branding?.navbarIcons ??
      branding?.navbar_icons ??
      "#FFFFFF",

    navbarButtonColor:
      branding?.navbarButtonColor ??
      branding?.navbar_button_color ??
      "#7C3AED",

    navbarButtonTextColor:
      branding?.navbarButtonTextColor ??
      branding?.navbar_button_text_color ??
      "#FFFFFF",

    headingColor:
      branding?.headingColor ??
      branding?.heading_color ??
      "#111827",

    subheadingColor:
      branding?.subheadingColor ??
      branding?.subheading_color ??
      "#5B21B6",

    textColor:
      branding?.textColor ??
      branding?.text_color ??
      "#111827",

    iconColor:
      branding?.iconColor ??
      branding?.icon_color ??
      "#F59E0B",

    buttonColor:
      branding?.buttonColor ??
      branding?.button_color ??
      "#7C3AED",

    buttonTextColor:
      branding?.buttonTextColor ??
      branding?.button_text_color ??
      "#FFFFFF",

    pageBackgroundColor:
      branding?.pageBackgroundColor ??
      branding?.page_background_color ??
      "#FAFAF9",

    cardBackgroundColor:
      branding?.cardBackgroundColor ??
      branding?.card_background_color ??
      "#FFFFFF",

    footerBackgroundColor:
      branding?.footerBackgroundColor ??
      branding?.footer_background_color ??
      "#1F2937",

    footerHeadingColor:
      branding?.footerHeadingColor ??
      branding?.footer_heading_color ??
      "#FFFFFF",

    footerTextColor:
      branding?.footerTextColor ??
      branding?.footer_text_color ??
      "#FAFAF9",

    fontHeading:
      branding?.fontHeading ??
      branding?.font_heading ??
      "Inter",

    fontSubheading:
      branding?.fontSubheading ??
      branding?.font_subheading ??
      "Inter",

    fontBody:
      branding?.fontBody ??
      branding?.font_body ??
      "Inter",

    headingWeight:
      branding?.headingWeight ??
      branding?.heading_weight ??
      700,

    headingLineHeight:
      branding?.headingLineHeight ??
      branding?.heading_line_height ??
      1.15,

    headingLetterSpacing:
      branding?.headingLetterSpacing ??
      branding?.heading_letter_spacing ??
      0,

    subheadingWeight:
      branding?.subheadingWeight ??
      branding?.subheading_weight ??
      600,

    subheadingLineHeight:
      branding?.subheadingLineHeight ??
      branding?.subheading_line_height ??
      1.4,

    bodyWeight:
      branding?.bodyWeight ??
      branding?.body_weight ??
      400,

    bodyLineHeight:
      branding?.bodyLineHeight ??
      branding?.body_line_height ??
      1.6,

    bodyLetterSpacing:
      branding?.bodyLetterSpacing ??
      branding?.body_letter_spacing ??
      0,

    roundedButtons:
      branding?.roundedButtons ??
      branding?.rounded_buttons ??
      true,
  };
};


/* =========================================================
   NORMALIZE SECTION TYPE
========================================================= */

const normalizeSectionType = (value) => {
  if (
    value === null ||
    value === undefined
  ) {
    return "";
  }

  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[\s_-]+/g, "");
};


/* =========================================================
   SECTION ALIASES
========================================================= */

const SECTION_ALIASES = {
  home: "home",

  hero: "hero",
  banner: "hero",

  about: "about",
  aboutus: "about",

  courses: "classes",
  course: "classes",

  classes: "classes",
  class: "classes",

  popularclasses: "classes",
  popularclass: "classes",

  categories: "categories",
  category: "categories",

  trainers: "trainers",
  trainer: "trainers",

  testimonials: "testimonials",
  testimonial: "testimonials",

  sessions: "sessions",
  session: "sessions",

  dashboard: "dashboard",

  studentlogin: "studentlogin",
};


/* =========================================================
   GET NORMALIZED SECTION
========================================================= */

const getNormalizedSectionType = (value) => {
  const normalized =
    normalizeSectionType(value);

  return (
    SECTION_ALIASES[normalized] ||
    normalized
  );
};


/* =========================================================
   NORMALIZE BOOLEAN
========================================================= */

const normalizeBoolean = (
  value,
  defaultValue = false
) => {
  if (
    value === undefined ||
    value === null
  ) {
    return defaultValue;
  }

  if (value === true) {
    return true;
  }

  if (value === false) {
    return false;
  }

  if (value === 1) {
    return true;
  }

  if (value === 0) {
    return false;
  }

  const normalized =
    String(value)
      .trim()
      .toLowerCase();

  if (
    normalized === "true" ||
    normalized === "1" ||
    normalized === "yes" ||
    normalized === "on"
  ) {
    return true;
  }

  if (
    normalized === "false" ||
    normalized === "0" ||
    normalized === "no" ||
    normalized === "off" ||
    normalized === ""
  ) {
    return false;
  }

  return defaultValue;
};


/* =========================================================
   HEX OPACITY
========================================================= */

const hexWithOpacity = (
  color,
  opacity = "10"
) => {
  if (!color) {
    return "#00000010";
  }

  if (
    typeof color === "string" &&
    /^#[0-9a-fA-F]{6}$/.test(color)
  ) {
    return `${color}${opacity}`;
  }

  return color;
};


/* =========================================================
   BUTTON RADIUS
========================================================= */

const buttonRadius = (branding) => {
  return branding?.roundedButtons
    ? "999px"
    : "6px";
};


/* =========================================================
   FONT
========================================================= */

const fontValue = (font) => {
  if (!font) {
    return "Inter, sans-serif";
  }

  return `'${font}', sans-serif`;
};


/* =========================================================
   CONTENT VALUE EXTRACTION
========================================================= */

const getContentValue = (
  content,
  key,
  fallback = ""
) => {
  if (
    content === null ||
    content === undefined
  ) {
    return fallback;
  }

  const wantedKey =
    String(key)
      .trim()
      .toLowerCase();


  /* ARRAY */

  if (Array.isArray(content)) {
    const row =
      content.find((item) => {
        if (!item) {
          return false;
        }

        const itemKey =
          item?.content_key ??
          item?.contentKey ??
          item?.key ??
          item?.field ??
          item?.name;

        return (
          String(itemKey ?? "")
            .trim()
            .toLowerCase() ===
          wantedKey
        );
      });

    if (row) {
      const value =
        row?.content_value ??
        row?.contentValue ??
        row?.value ??
        row?.text ??
        row?.content ??
        row?.data;

      if (
        value !== undefined &&
        value !== null &&
        String(value).trim() !== ""
      ) {
        return String(value);
      }
    }

    return fallback;
  }


  /* OBJECT */

  if (
    typeof content === "object"
  ) {
    if (
      Object.prototype.hasOwnProperty.call(
        content,
        key
      )
    ) {
      const direct =
        content[key];

      if (
        typeof direct === "string" &&
        direct.trim()
      ) {
        return direct;
      }

      if (
        typeof direct === "number"
      ) {
        return String(direct);
      }

      if (
        direct &&
        typeof direct === "object"
      ) {
        const nested =
          direct?.content_value ??
          direct?.contentValue ??
          direct?.value ??
          direct?.text ??
          direct?.content;

        if (
          nested !== undefined &&
          nested !== null &&
          String(nested).trim()
        ) {
          return String(nested);
        }
      }
    }


    const matchingKey =
      Object.keys(content).find(
        (itemKey) =>
          String(itemKey)
            .trim()
            .toLowerCase() ===
          wantedKey
      );

    if (matchingKey) {
      const value =
        content[matchingKey];

      if (
        typeof value === "string" ||
        typeof value === "number"
      ) {
        return String(value);
      }

      if (
        value &&
        typeof value === "object"
      ) {
        const nested =
          value?.content_value ??
          value?.contentValue ??
          value?.value ??
          value?.text ??
          value?.content;

        if (
          nested !== undefined &&
          nested !== null
        ) {
          return String(nested);
        }
      }
    }


    if (
      content?.content !== undefined
    ) {
      const nestedValue =
        getContentValue(
          content.content,
          key,
          ""
        );

      if (
        nestedValue !== ""
      ) {
        return nestedValue;
      }
    }


    if (
      content?.data !== undefined
    ) {
      const nestedValue =
        getContentValue(
          content.data,
          key,
          ""
        );

      if (
        nestedValue !== ""
      ) {
        return nestedValue;
      }
    }
  }


  return fallback;
};


/* =========================================================
   NORMALIZE CONTENT
========================================================= */

const normalizeContent = (
  content
) => {
  if (!content) {
    return {};
  }


  /* ARRAY */

  if (
    Array.isArray(content)
  ) {
    const result = {};

    content.forEach((item) => {
      if (!item) {
        return;
      }

      const key =
        item?.content_key ??
        item?.contentKey ??
        item?.key ??
        item?.field;

      const value =
        item?.content_value ??
        item?.contentValue ??
        item?.value ??
        item?.text ??
        item?.content ??
        "";

      if (
        key !== undefined &&
        key !== null
      ) {
        result[
          String(key)
            .trim()
            .toLowerCase()
        ] = value;
      }
    });

    return result;
  }


  /* OBJECT WITH CONTENT ARRAY */

  if (
    content?.content &&
    Array.isArray(content.content)
  ) {
    return normalizeContent(
      content.content
    );
  }


  /* OBJECT WITH DATA ARRAY */

  if (
    content?.data &&
    Array.isArray(content.data)
  ) {
    return normalizeContent(
      content.data
    );
  }


  /* DIRECT OBJECT */

  if (
    typeof content === "object"
  ) {
    const result = {
      ...content,
    };

    if (
      content?.content_key
    ) {
      result[
        String(
          content.content_key
        )
          .trim()
          .toLowerCase()
      ] =
        content?.content_value ??
        content?.contentValue ??
        content?.value ??
        content?.text ??
        "";
    }

    return result;
  }


  return {};
};


/* =========================================================
   EXTRACT SECTION CONTENT
========================================================= */

const extractSectionContent = (
  response,
  requestedKeys = []
) => {
  if (!response) {
    return null;
  }

  const normalizedRequestedKeys =
    requestedKeys.map(
      (key) =>
        getNormalizedSectionType(
          key
        )
    );


  /* ARRAY RESPONSE */

  if (
    Array.isArray(response)
  ) {
    const rows =
      response;

    const sectionRows =
      rows.filter((row) => {
        if (!row) {
          return false;
        }

        const sectionKey =
          row?.section_key ??
          row?.sectionKey ??
          row?.section ??
          row?.section_type ??
          row?.sectionType;

        if (!sectionKey) {
          return false;
        }

        const normalized =
          getNormalizedSectionType(
            sectionKey
          );

        return normalizedRequestedKeys.includes(
          normalized
        );
      });

    if (
      sectionRows.length > 0
    ) {
      return normalizeContent(
        sectionRows
      );
    }

    const direct =
      normalizeContent(rows);

    if (
      Object.keys(direct).length > 0
    ) {
      return direct;
    }
  }


  /* OBJECT RESPONSE */

  if (
    typeof response === "object"
  ) {
    if (
      response?.data !== undefined
    ) {
      const extracted =
        extractSectionContent(
          response.data,
          requestedKeys
        );

      if (extracted) {
        return extracted;
      }
    }


    if (
      response?.content !== undefined
    ) {
      const extracted =
        extractSectionContent(
          response.content,
          requestedKeys
        );

      if (extracted) {
        return extracted;
      }
    }


    for (
      const requestedKey of requestedKeys
    ) {
      const normalizedRequested =
        getNormalizedSectionType(
          requestedKey
        );

      for (
        const objectKey of Object.keys(
          response
        )
      ) {
        if (
          getNormalizedSectionType(
            objectKey
          ) === normalizedRequested
        ) {
          const section =
            response[objectKey];

          const normalized =
            normalizeContent(
              section
            );

          if (
            Object.keys(
              normalized
            ).length > 0
          ) {
            return normalized;
          }
        }
      }
    }


    const direct =
      normalizeContent(
        response
      );

    if (
      Object.keys(direct).length > 0
    ) {
      return direct;
    }
  }


  return null;
};


/* =========================================================
   HOME SECTION CONTENT
========================================================= */

const getHomeSectionContent = (
  getContent,
  section,
  aliases = []
) => {
  if (
    typeof getContent !==
    "function"
  ) {
    return {};
  }

  const keys = [
    section,
    ...aliases,
  ];


  /* PREFERRED */

  for (
    const key of keys
  ) {
    try {
      const response =
        getContent(
          "home",
          key
        );

      if (
        response !== undefined &&
        response !== null
      ) {
        const extracted =
          extractSectionContent(
            response,
            [
              key,
              ...keys,
            ]
          );

        if (
          extracted &&
          Object.keys(extracted)
            .length > 0
        ) {
          return extracted;
        }
      }
    } catch (error) {
      console.warn(
        `[WebsiteHome] getContent("home", "${key}") failed`,
        error
      );
    }
  }


  /* FALLBACK */

  for (
    const key of keys
  ) {
    try {
      const response =
        getContent(key);

      if (
        response !== undefined &&
        response !== null
      ) {
        const extracted =
          extractSectionContent(
            response,
            [
              key,
              ...keys,
            ]
          );

        if (
          extracted &&
          Object.keys(extracted)
            .length > 0
        ) {
          return extracted;
        }
      }
    } catch (error) {
      console.warn(
        `[WebsiteHome] getContent("${key}") failed`,
        error
      );
    }
  }


  return {};
};


/* =========================================================
   MAIN WEBSITE HOME
========================================================= */

export default function WebsiteHome() {
  const context =
    useOutletContext() || {};

  const {
    institute = {},
    branding: rawBranding = {},
    banners = [],
    bannersLoading = false,
    categories = [],
    classes = [],
    trainers = [],
    testimonials = [],
    sectionEnabled,
    getContent,
  } = context;


  /* =======================================================
     BRANDING
  ======================================================= */

  const branding =
    useMemo(
      () =>
        getBranding(
          rawBranding
        ),
      [rawBranding]
    );


  /* =======================================================
     SAFE ARRAYS
  ======================================================= */

  const categoryList =
    Array.isArray(categories)
      ? categories
      : [];

  const classList =
    Array.isArray(classes)
      ? classes
      : [];

  const trainerList =
    Array.isArray(trainers)
      ? trainers
      : [];

  const testimonialList =
    Array.isArray(testimonials)
      ? testimonials
      : [];

  const bannerList =
    Array.isArray(banners)
      ? banners
      : [];


  /* =======================================================
     HOME CONTENT
     
     Hero content is intentionally NOT rendered.
     Banner image is the only hero content.
  ======================================================= */

  const popularClassesContent =
    useMemo(
      () =>
        getHomeSectionContent(
          getContent,
          "classes",
          [
            "courses",
            "popularClasses",
            "popular_classes",
          ]
        ),
      [getContent]
    );


  const categoriesContent =
    useMemo(
      () =>
        getHomeSectionContent(
          getContent,
          "categories",
          [
            "category",
          ]
        ),
      [getContent]
    );


  const trainersContent =
    useMemo(
      () =>
        getHomeSectionContent(
          getContent,
          "trainers",
          [
            "trainer",
          ]
        ),
      [getContent]
    );


  const testimonialsContent =
    useMemo(
      () =>
        getHomeSectionContent(
          getContent,
          "testimonials",
          [
            "testimonial",
          ]
        ),
      [getContent]
    );


  /* =======================================================
     POPULAR CLASSES CONTENT
  ======================================================= */

  const popularClassesHeading =
    getContentValue(
      popularClassesContent,
      "heading",
      "Explore Our Classes"
    );


  const popularClassesSubheading =
    getContentValue(
      popularClassesContent,
      "subheading",
      "POPULAR CLASSES"
    );


  /* =======================================================
     CATEGORIES CONTENT
  ======================================================= */

  const categoriesHeading =
    getContentValue(
      categoriesContent,
      "heading",
      "Browse Top Categories"
    );


  const categoriesSubheading =
    getContentValue(
      categoriesContent,
      "subheading",
      "TOP CATEGORIES"
    );


  /* =======================================================
     TRAINERS CONTENT
  ======================================================= */

  const trainersHeading =
    getContentValue(
      trainersContent,
      "heading",
      "Learn From Expert Trainers"
    );


  const trainersSubheading =
    getContentValue(
      trainersContent,
      "subheading",
      "OUR TRAINERS"
    );


  /* =======================================================
     TESTIMONIALS CONTENT
  ======================================================= */

  const testimonialsHeading =
    getContentValue(
      testimonialsContent,
      "heading",
      "What Our Students Say"
    );


  const testimonialsSubheading =
    getContentValue(
      testimonialsContent,
      "subheading",
      "TESTIMONIALS"
    );


  /* =======================================================
     SECTION ENABLED
  ======================================================= */

  const isSectionEnabled = (
    requestedSection
  ) => {
    if (
      typeof sectionEnabled !==
      "function"
    ) {
      return true;
    }

    try {
      return normalizeBoolean(
        sectionEnabled(
          getNormalizedSectionType(
            requestedSection
          )
        ),
        true
      );
    } catch (error) {
      console.warn(
        `[WebsiteHome] sectionEnabled failed for ${requestedSection}`,
        error
      );

      return true;
    }
  };


  /* =======================================================
     NORMALIZE BANNERS
  ======================================================= */

  const homeBanners =
    useMemo(() => {
      return bannerList
        .map((banner) => {
          if (!banner) {
            return null;
          }

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

          const image =
            banner?.image_url ||
            banner?.image ||
            banner?.imageUrl ||
            banner?.url ||
            "";

          return {
            ...banner,

            banner_type:
              type,

            is_active:
              normalizeBoolean(
                active,
                true
              ),

            image_url:
              image,

            display_order:
              Number(
                banner?.display_order ??
                banner?.displayOrder ??
                1
              ),
          };
        })
        .filter(
          (banner) =>
            banner &&
            banner.banner_type ===
              "HOME" &&
            banner.is_active &&
            banner.image_url
        )
        .sort(
          (a, b) =>
            a.display_order -
            b.display_order
        );
    }, [bannerList]);


  /* =======================================================
     BANNER STATE
  ======================================================= */

  const [
    currentBanner,
    setCurrentBanner,
  ] = useState(0);


  useEffect(() => {
    if (
      currentBanner >=
      homeBanners.length
    ) {
      setCurrentBanner(0);
    }
  }, [
    currentBanner,
    homeBanners.length,
  ]);


  /* =======================================================
     AUTO SLIDE
  ======================================================= */

  useEffect(() => {
    if (
      homeBanners.length <= 1
    ) {
      return undefined;
    }

    const timer =
      setInterval(() => {
        setCurrentBanner(
          (previous) =>
            previous >=
            homeBanners.length - 1
              ? 0
              : previous + 1
        );
      }, 5000);

    return () =>
      clearInterval(timer);
  }, [
    homeBanners.length,
  ]);


  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <main
      className="w-full overflow-hidden"
      style={{
        backgroundColor:
          branding.pageBackgroundColor,

        color:
          branding.textColor,

        fontFamily:
          fontValue(
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

      {/* ===================================================
          HERO / HOME BANNER ONLY
      =================================================== */}

      {isSectionEnabled("home") && (
        <HeroSection
          banners={homeBanners}
          bannersLoading={
            bannersLoading
          }
          currentBanner={
            currentBanner
          }
          setCurrentBanner={
            setCurrentBanner
          }
          branding={branding}
        />
      )}


      {/* ===================================================
          POPULAR CLASSES
      =================================================== */}

      {isSectionEnabled(
        "classes"
      ) &&
        classList.length > 0 && (
          <PopularClasses
            classes={classList}
            branding={branding}
            heading={
              popularClassesHeading
            }
            subheading={
              popularClassesSubheading
            }
          />
        )}


      {/* ===================================================
          CATEGORIES
      =================================================== */}

      {isSectionEnabled(
        "categories"
      ) &&
        categoryList.length > 0 && (
          <CategoriesSection
            categories={
              categoryList
            }
            branding={branding}
            heading={
              categoriesHeading
            }
            subheading={
              categoriesSubheading
            }
          />
        )}


      {/* ===================================================
          TRAINERS
      =================================================== */}

      {isSectionEnabled(
        "trainers"
      ) &&
        trainerList.length > 0 && (
          <TrainersSection
            trainers={trainerList}
            branding={branding}
            heading={
              trainersHeading
            }
            subheading={
              trainersSubheading
            }
          />
        )}


      {/* ===================================================
          TESTIMONIALS
      =================================================== */}

      {isSectionEnabled(
        "testimonials"
      ) &&
        testimonialList.length > 0 && (
          <TestimonialsSection
            testimonials={testimonialList.slice(
              0,
              3
            )}
            branding={branding}
            heading={
              testimonialsHeading
            }
            subheading={
              testimonialsSubheading
            }
          />
        )}

    </main>
  );
}


/* =========================================================
   HERO SECTION
   BANNER IMAGE ONLY
========================================================= */

function HeroSection({
  banners,
  bannersLoading,
  currentBanner,
  setCurrentBanner,
  branding,
}) {

  /* -------------------------------------------------------
     LOADING
  ------------------------------------------------------- */

  if (
    bannersLoading &&
    banners.length === 0
  ) {
    return (
      <section
        className="w-full"
        style={{
          backgroundColor:
            branding.pageBackgroundColor,
        }}
      >
        <div
          className="
            w-full
            h-[450px]
            animate-pulse
          "
          style={{
            backgroundColor:
              branding.cardBackgroundColor,
          }}
        />
      </section>
    );
  }


  /* -------------------------------------------------------
     NO BANNER
  ------------------------------------------------------- */

  if (
    banners.length === 0
  ) {
    return null;
  }


  /* -------------------------------------------------------
     CURRENT BANNER
  ------------------------------------------------------- */

  const banner =
    banners[currentBanner] ||
    banners[0];

  const image =
    banner?.image_url ||
    banner?.image ||
    banner?.imageUrl ||
    banner?.url ||
    "";


  /* -------------------------------------------------------
     BANNER ONLY
  ------------------------------------------------------- */

  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
      "
      style={{
        backgroundColor:
          branding.pageBackgroundColor,
      }}
    >

      {/* ===================================================
          BANNER IMAGE
          NO HERO TEXT
          NO HERO CONTENT
          NO HERO BUTTONS
          NO HERO STATS
      =================================================== */}

      {image && (
       
        <img
  src={image}
  alt=""
  aria-hidden="true"
  className="
    block
    w-full
    h-[450px]
    object-cover
  "
/>
      )}


      {/* ===================================================
          CAROUSEL CONTROLS
      =================================================== */}

      {banners.length > 1 && (
        <>
          <button
            type="button"
            onClick={() =>
              setCurrentBanner(
                currentBanner === 0
                  ? banners.length - 1
                  : currentBanner - 1
              )
            }
            aria-label="Previous banner"
            className="
              absolute
              left-4
              top-1/2
              z-20
              flex
              h-10
              w-10
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              shadow-lg
              transition
              hover:scale-105
            "
            style={{
              backgroundColor:
                branding.buttonColor,

              color:
                branding.buttonTextColor,
            }}
          >
            <ChevronLeft
              size={22}
            />
          </button>


          <button
            type="button"
            onClick={() =>
              setCurrentBanner(
                currentBanner >=
                  banners.length - 1
                  ? 0
                  : currentBanner + 1
              )
            }
            aria-label="Next banner"
            className="
              absolute
              right-4
              top-1/2
              z-20
              flex
              h-10
              w-10
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              shadow-lg
              transition
              hover:scale-105
            "
            style={{
              backgroundColor:
                branding.buttonColor,

              color:
                branding.buttonTextColor,
            }}
          >
            <ChevronRight
              size={22}
            />
          </button>
        </>
      )}


      {/* ===================================================
          CAROUSEL DOTS
      =================================================== */}

      {banners.length > 1 && (
        <div
          className="
            absolute
            bottom-5
            left-1/2
            z-20
            flex
            -translate-x-1/2
            gap-2
          "
        >
          {banners.map(
            (
              bannerItem,
              index
            ) => (
              <button
                key={
                  bannerItem?.id ||
                  index
                }
                type="button"
                onClick={() =>
                  setCurrentBanner(
                    index
                  )
                }
                aria-label={`Go to banner ${
                  index + 1
                }`}
                className="
                  h-2
                  transition-all
                "
                style={{
                  width:
                    currentBanner ===
                    index
                      ? 24
                      : 8,

                  backgroundColor:
                    currentBanner ===
                    index
                      ? branding.buttonColor
                      : "#FFFFFF",

                  borderRadius:
                    "999px",
                }}
              />
            )
          )}
        </div>
      )}

    </section>
  );
}


/* =========================================================
   SECTION HEADING
========================================================= */

function SectionHeading({
  eyebrow,
  title,
  branding,
  action,
}) {
  return (
    <div className="mb-5 flex items-end justify-between">

      <div>

        <p
          className="text-[9px] font-bold uppercase"
          style={{
            color:
              branding.subheadingColor,

            fontFamily:
              fontValue(
                branding.fontSubheading
              ),

            fontWeight:
              branding.subheadingWeight,
          }}
        >
          {eyebrow}
        </p>


        <h2
          className="mt-1 text-xl sm:text-2xl"
          style={{
            color:
              branding.headingColor,

            fontFamily:
              fontValue(
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
          {title}
        </h2>

      </div>


      {action}

    </div>
  );
}


/* =========================================================
   POPULAR CLASSES
========================================================= */

function PopularClasses({
  classes,
  branding,
  heading,
  subheading,
}) {
  return (
    <section
      className="py-9 sm:py-11"
      style={{
        backgroundColor:
          branding.pageBackgroundColor,
      }}
    >

      <div className="mx-auto max-w-7xl px-5">

        <SectionHeading
          eyebrow={
            subheading
          }
          title={heading}
          branding={branding}
          action={
            <Link
              to="/institute/website/preview/classes"
              className="hidden items-center gap-1 text-[10px] font-semibold sm:flex"
              style={{
                color:
                  branding.buttonColor,

                fontFamily:
                  fontValue(
                    branding.fontBody
                  ),
              }}
            >
              View all classes

              <ArrowRight size={14} />
            </Link>
          }
        />


        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {classes
            .slice(0, 4)
            .map(
              (
                item,
                index
              ) => (
                <ClassCard
                  key={
                    item?.id ||
                    index
                  }
                  item={item}
                  branding={branding}
                />
              )
            )}

        </div>

      </div>

    </section>
  );
}


/* =========================================================
   CLASS CARD
========================================================= */

function ClassCard({
  item,
  branding,
}) {
  const id =
    item?.id;

  const title =
    item?.title ||
    item?.name ||
    item?.class_name ||
    "Class";

  const image =
    item?.image ||
    item?.image_url ||
    item?.imageUrl ||
    "";

  const trainer =
    item?.trainer_name ||
    item?.trainerName;

  const trainerImage =
    item?.trainer_image ||
    item?.trainerImage;

  const rating =
    Number(
      item?.rating || 0
    );

  const availableDays =
    Array.isArray(
      item?.available_days
    )
      ? item.available_days
      : [];

  const startDate =
    item?.start_date;

  const startTime =
    item?.start_time;

  const students =
    item?.students ??
    item?.student_count;

  const price =
    item?.price;

  const duration =
    item?.duration;

  const level =
    item?.level;


  return (
    <article
      className="overflow-hidden border transition hover:-translate-y-1 hover:shadow-md"
      style={{
        borderColor:
          hexWithOpacity(
            branding.textColor,
            "18"
          ),

        backgroundColor:
          branding.cardBackgroundColor,

        borderRadius:
          "10px",
      }}
    >

      <Link
        to={`/institute/website/preview/classes/${id}`}
      >

        <div
          className="relative h-[155px] overflow-hidden"
          style={{
            backgroundColor:
              branding.pageBackgroundColor,
          }}
        >

          {image ? (
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover transition duration-500 hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <BookOpen
                size={50}
                style={{
                  color:
                    branding.iconColor,
                }}
              />
            </div>
          )}


          {level && (
            <span
              className="absolute left-2 top-2 px-2 py-1 text-[9px] font-semibold"
              style={{
                color:
                  branding.buttonColor,

                backgroundColor:
                  branding.cardBackgroundColor,

                borderRadius:
                  buttonRadius(
                    branding
                  ),
              }}
            >
              {level}
            </span>
          )}


          {price !==
            undefined &&
            price !== null &&
            price !== "" && (
              <span
                className="absolute right-2 top-2 px-2 py-1 text-[10px] font-bold"
                style={{
                  color:
                    branding.buttonColor,

                  backgroundColor:
                    branding.cardBackgroundColor,

                  borderRadius:
                    buttonRadius(
                      branding
                    ),
                }}
              >
                {Number(price) > 0
                  ? `$${price}`
                  : "Free"}
              </span>
            )}

        </div>

      </Link>


      <div className="p-3">

        <h3
          className="truncate text-xs"
          style={{
            color:
              branding.headingColor,

            fontFamily:
              fontValue(
                branding.fontHeading
              ),

            fontWeight:
              branding.headingWeight,
          }}
        >
          {title}
        </h3>


        {trainer && (
          <div className="mt-2 flex items-center gap-1.5">

            {trainerImage ? (
              <img
                src={trainerImage}
                alt={trainer}
                className="h-4 w-4 rounded-full object-cover"
              />
            ) : (
              <div
                className="flex h-4 w-4 items-center justify-center rounded-full text-[7px] font-bold"
                style={{
                  backgroundColor:
                    branding.buttonColor,

                  color:
                    branding.buttonTextColor,
                }}
              >
                {String(
                  trainer
                )
                  .charAt(0)
                  .toUpperCase()}
              </div>
            )}

            <span
              className="truncate text-[9px]"
              style={{
                color:
                  branding.textColor,

                fontFamily:
                  fontValue(
                    branding.fontBody
                  ),
              }}
            >
              {trainer}
            </span>

          </div>
        )}


        <div className="mt-2 flex items-center gap-1">

          <Star
            size={13}
            fill={
              branding.iconColor
            }
            style={{
              color:
                branding.iconColor,
            }}
          />

          <span
            className="text-[10px] font-semibold"
            style={{
              color:
                branding.headingColor,
            }}
          >
            {rating > 0
              ? rating.toFixed(1)
              : "0.0"}
          </span>


          {students !==
            undefined &&
            students !== null && (
              <span
                className="text-[9px]"
                style={{
                  color:
                    branding.textColor,
                }}
              >
                ({students} Students)
              </span>
            )}

        </div>


        <div
          className="mt-2 flex items-center gap-1.5 text-[9px]"
          style={{
            color:
              branding.textColor,
          }}
        >
          <Clock3
            size={12}
            style={{
              color:
                branding.iconColor,
            }}
          />

          <span>
            {duration ||
              "Duration not specified"}
          </span>
        </div>


        {(startDate ||
          startTime) && (
          <div
            className="mt-1.5 flex items-center gap-2 text-[9px]"
            style={{
              color:
                branding.textColor,
            }}
          >

            {startDate && (
              <span>
                {startDate}
              </span>
            )}

            {startDate &&
              startTime && (
                <span>•</span>
              )}

            {startTime && (
              <span>
                {startTime}
              </span>
            )}

          </div>
        )}


        {availableDays.length >
          0 && (
          <p
            className="mt-1 truncate text-[9px]"
            style={{
              color:
                branding.textColor,
            }}
          >
            {availableDays.join(
              " • "
            )}
          </p>
        )}

      </div>

    </article>
  );
}


/* =========================================================
   TRAINERS
========================================================= */

function TrainersSection({
  trainers,
  branding,
  heading,
  subheading,
}) {
  return (
    <section
      className="py-9"
      style={{
        backgroundColor:
          branding.pageBackgroundColor,
      }}
    >

      <div className="mx-auto max-w-7xl px-5">

        <SectionHeading
          eyebrow={
            subheading
          }
          title={heading}
          branding={branding}
          action={
            <Link
              to="/institute/website/preview/trainers"
              className="hidden items-center gap-1 text-[10px] font-semibold sm:flex"
              style={{
                color:
                  branding.buttonColor,

                fontFamily:
                  fontValue(
                    branding.fontBody
                  ),
              }}
            >
              View all trainers

              <ArrowRight size={14} />
            </Link>
          }
        />


        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {trainers
            .slice(0, 4)
            .map(
              (
                trainer,
                index
              ) => (
                <TrainerCard
                  key={
                    trainer?.id ||
                    index
                  }
                  trainer={
                    trainer
                  }
                  branding={
                    branding
                  }
                />
              )
            )}

        </div>

      </div>

    </section>
  );
}


/* =========================================================
   TRAINER CARD
========================================================= */

function TrainerCard({
  trainer,
  branding,
}) {
  const id =
    trainer?.id;

  const name =
    typeof trainer?.full_name ===
    "string"
      ? trainer.full_name
      : trainer?.name ||
        "Trainer";

  const image =
    trainer?.profile_image ||
    trainer?.profileImage ||
    trainer?.image;

  const specialty =
    trainer?.specialty ||
    trainer?.specialization ||
    "Expert Instructor";

  const rating =
    Number(
      trainer?.rating || 0
    );

  const totalReviews =
    Number(
      trainer?.total_reviews ||
      trainer?.totalReviews ||
      0
    );

  const totalStudents =
    Number(
      trainer?.total_students ||
      trainer?.totalStudents ||
      0
    );


  return (
    <article
      className="overflow-hidden border transition hover:-translate-y-1 hover:shadow-md"
      style={{
        borderColor:
          hexWithOpacity(
            branding.textColor,
            "18"
          ),

        backgroundColor:
          branding.cardBackgroundColor,

        borderRadius:
          "10px",
      }}
    >

      <Link
        to={`/institute/website/preview/trainers/${id}`}
      >

        <div
          className="relative flex h-[175px] items-end justify-center overflow-hidden"
          style={{
            backgroundColor:
              hexWithOpacity(
                branding.subheadingColor,
                "08"
              ),
          }}
        >

          {image ? (
            <img
              src={image}
              alt={name}
              className="h-full w-full object-cover object-top"
            />
          ) : (
            <div
              className="mb-5 flex h-24 w-24 items-center justify-center rounded-full text-3xl font-bold"
              style={{
                backgroundColor:
                  branding.buttonColor,

                color:
                  branding.buttonTextColor,
              }}
            >
              {name
                .charAt(0)
                .toUpperCase()}
            </div>
          )}

        </div>

      </Link>


      <div className="p-3">

        <h3
          className="text-xs"
          style={{
            color:
              branding.headingColor,

            fontFamily:
              fontValue(
                branding.fontHeading
              ),

            fontWeight:
              branding.headingWeight,
          }}
        >
          {name}
        </h3>


        <p
          className="mt-1 truncate text-[9px]"
          style={{
            color:
              branding.textColor,

            fontFamily:
              fontValue(
                branding.fontBody
              ),
          }}
        >
          {specialty}
        </p>


        <div className="mt-2 flex items-center justify-between">

          <div className="flex items-center gap-1">

            <Star
              size={12}
              fill={
                branding.iconColor
              }
              style={{
                color:
                  branding.iconColor,
              }}
            />

            <span
              className="text-[10px] font-semibold"
              style={{
                color:
                  branding.headingColor,
              }}
            >
              {rating > 0
                ? rating.toFixed(1)
                : "0.0"}
            </span>

          </div>


          <span
            className="text-[9px]"
            style={{
              color:
                branding.textColor,
            }}
          >
            {totalReviews} Reviews
          </span>

        </div>


        <div
          className="mt-2 flex items-center gap-1 text-[9px]"
          style={{
            color:
              branding.textColor,
          }}
        >

          <Users
            size={12}
            style={{
              color:
                branding.iconColor,
            }}
          />

          {totalStudents.toLocaleString()}
          {" "}
          Students

        </div>

      </div>

    </article>
  );
}


/* =========================================================
   CATEGORIES
========================================================= */

function CategoriesSection({
  categories,
  branding,
  heading,
  subheading,
}) {
  const icons = [
    <Palette
      key="palette"
      size={27}
    />,
    <Music
      key="music"
      size={27}
    />,
    <Users
      key="users"
      size={27}
    />,
    <Camera
      key="camera"
      size={27}
    />,
    <Drama
      key="drama"
      size={27}
    />,
    <Monitor
      key="monitor"
      size={27}
    />,
  ];


  return (
    <section
      className="py-9"
      style={{
        backgroundColor:
          branding.pageBackgroundColor,
      }}
    >

      <div className="mx-auto max-w-7xl px-5">

        <SectionHeading
          eyebrow={
            subheading
          }
          title={heading}
          branding={branding}
        />


        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">

          {categories
            .slice(0, 6)
            .map(
              (
                category,
                index
              ) => {

                const name =
                  category?.name ||
                  category?.category_name ||
                  category?.categoryName ||
                  category?.title ||
                  "Category";


                return (
                  <Link
                    key={
                      category?.id ||
                      index
                    }
                    to="/institute/website/preview/classes"
                    className="flex h-[90px] flex-col items-center justify-center border transition hover:-translate-y-1 hover:shadow-sm"
                    style={{
                      backgroundColor:
                        branding.cardBackgroundColor,

                      borderColor:
                        hexWithOpacity(
                          branding.textColor,
                          "18"
                        ),

                      borderRadius:
                        "10px",
                    }}
                  >

                    <div
                      style={{
                        color:
                          branding.iconColor,
                      }}
                    >
                      {
                        icons[
                          index % 6
                        ]
                      }
                    </div>


                    <p
                      className="mt-2 text-[10px]"
                      style={{
                        color:
                          branding.headingColor,

                        fontFamily:
                          fontValue(
                            branding.fontHeading
                          ),

                        fontWeight:
                          branding.headingWeight,
                      }}
                    >
                      {name}
                    </p>

                  </Link>
                );
              }
            )}

        </div>

      </div>

    </section>
  );
}


/* =========================================================
   TESTIMONIALS
========================================================= */

function TestimonialsSection({
  testimonials,
  branding,
  heading,
  subheading,
}) {
  return (
    <section
      className="py-9"
      style={{
        backgroundColor:
          branding.subheadingColor
            ? hexWithOpacity(
                branding.subheadingColor,
                "06"
              )
            : branding.pageBackgroundColor,
      }}
    >

      <div className="mx-auto max-w-7xl px-5">

        <SectionHeading
          eyebrow={
            subheading
          }
          title={heading}
          branding={branding}
        />


        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">

          {testimonials
            .slice(0, 3)
            .map(
              (
                testimonial,
                index
              ) => {

                const name =
                  testimonial?.student_name ||
                  testimonial?.studentName ||
                  testimonial?.name ||
                  "Student";

                const role =
                  testimonial?.role ||
                  testimonial?.designation ||
                  "Student";

                const text =
                  testimonial?.testimonial_text ||
                  testimonial?.testimonialText ||
                  testimonial?.review ||
                  testimonial?.comment ||
                  testimonial?.message ||
                  "The classes are well structured and the trainers are very supportive.";

                const avatar =
                  testimonial?.avatar ||
                  testimonial?.student_image ||
                  testimonial?.studentImage ||
                  testimonial?.profile_image ||
                  testimonial?.image;

                const rating =
                  Math.min(
                    5,
                    Math.max(
                      0,
                      Number(
                        testimonial?.rating ||
                        5
                      )
                    )
                  );


                return (
                  <article
                    key={
                      testimonial?.id ||
                      index
                    }
                    className="border p-4 shadow-sm"
                    style={{
                      backgroundColor:
                        branding.cardBackgroundColor,

                      borderColor:
                        hexWithOpacity(
                          branding.textColor,
                          "18"
                        ),

                      borderRadius:
                        "10px",
                    }}
                  >

                    <div className="flex items-center gap-1">

                      <span
                        className="text-xl font-bold"
                        style={{
                          color:
                            branding.subheadingColor,
                        }}
                      >
                        "
                      </span>


                      {[1, 2, 3, 4, 5].map(
                        (star) => (
                          <Star
                            key={star}
                            size={12}
                            fill={
                              star <=
                              rating
                                ? branding.iconColor
                                : "none"
                            }
                            style={{
                              color:
                                branding.iconColor,
                            }}
                          />
                        )
                      )}

                    </div>


                    <p
                      className="mt-2 min-h-[60px] text-[10px] italic sm:text-xs"
                      style={{
                        color:
                          branding.textColor,

                        fontFamily:
                          fontValue(
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
                      "{text}"
                    </p>


                    <div className="mt-4 flex items-center gap-2.5">

                      {avatar ? (
                        <img
                          src={avatar}
                          alt={name}
                          className="h-9 w-9 rounded-full object-cover"
                        />
                      ) : (
                        <div
                          className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold"
                          style={{
                            backgroundColor:
                              branding.buttonColor,

                            color:
                              branding.buttonTextColor,
                          }}
                        >
                          {String(
                            name
                          )
                            .charAt(0)
                            .toUpperCase()}
                        </div>
                      )}


                      <div>

                        <h4
                          className="text-[10px]"
                          style={{
                            color:
                              branding.headingColor,

                            fontFamily:
                              fontValue(
                                branding.fontHeading
                              ),

                            fontWeight:
                              branding.headingWeight,
                          }}
                        >
                          {name}
                        </h4>


                        <p
                          className="text-[9px]"
                          style={{
                            color:
                              branding.textColor,

                            fontFamily:
                              fontValue(
                                branding.fontBody
                              ),
                          }}
                        >
                          {role}
                        </p>

                      </div>

                    </div>

                  </article>
                );
              }
            )}

        </div>

      </div>

    </section>
  );
}