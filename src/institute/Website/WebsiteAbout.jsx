// import React, {
//   useEffect,
//   useMemo,
//   useState,
// } from "react";

// import {
//   Award,
//   BookOpen,
//   Heart,
//   Lightbulb,
//   Target,
//   Sparkles,
// } from "lucide-react";

// import {
//   useOutletContext,
// } from "react-router-dom";


// /* =========================================================
//    DEFAULT BRANDING
// ========================================================= */

// const DEFAULT_BRANDING = {
//   headingColor: "#111827",
//   subheadingColor: "#5B21B6",
//   textColor: "#4B5563",

//   iconColor: "#F59E0B",

//   buttonColor: "#7C3AED",
//   buttonTextColor: "#FFFFFF",

//   pageBackgroundColor: "#FFFFFF",
//   cardBackgroundColor: "#FFFFFF",

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
//    GET BRANDING VALUE
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


// /* =========================================================
//    NORMALIZE BRANDING
// ========================================================= */

// const normalizeBranding = (
//   branding = {}
// ) => ({
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
//    FONT HELPER
// ========================================================= */

// const fontFamily = (font) =>
//   font
//     ? `'${font}', sans-serif`
//     : "Inter, sans-serif";


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
//    GET FIRST AVAILABLE VALUE
// ========================================================= */

// const getValue = (
//   ...values
// ) => {

//   return values.find(
//     (value) =>
//       value !== undefined &&
//       value !== null &&
//       String(value).trim() !== ""
//   );
// };


// /* =========================================================
//    GET ARRAY
// ========================================================= */

// const getArray = (
//   ...values
// ) => {

//   return values.find(
//     (value) =>
//       Array.isArray(value)
//   ) || [];
// };


// /* =========================================================
//    MAIN COMPONENT
// ========================================================= */

// const WebsiteAbout = () => {

//   /* =======================================================
//      OUTLET CONTEXT
//   ======================================================= */

//   const outletContext =
//     useOutletContext() || {};


//   /* =======================================================
//      INITIAL WEBSITE
//   ======================================================= */

//   const initialWebsite =
//     outletContext?.website ||
//     outletContext?.websiteData?.website ||
//     outletContext?.websiteData ||
//     {};


//   /* =======================================================
//      INSTITUTE DATA
//   ======================================================= */

//   const institute =
//     outletContext?.institute ||
//     initialWebsite?.institute ||
//     outletContext?.websiteData?.institute ||
//     {};


//   /* =======================================================
//      BRANDING
//   ======================================================= */

//   const rawBranding =
//     outletContext?.branding ||
//     initialWebsite?.branding ||
//     outletContext?.websiteData?.branding ||
//     {};


//   const branding = useMemo(
//     () =>
//       normalizeBranding(
//         rawBranding
//       ),
//     [rawBranding]
//   );


//   /* =======================================================
//      INSTITUTE ID
//   ======================================================= */

//   const instituteId =
//     institute?.id ||
//     institute?.institute_id ||
//     initialWebsite?.instituteId ||
//     initialWebsite?.institute_id ||
//     initialWebsite?.institute?.id ||
//     initialWebsite?.institute?.institute_id;


//   /* =======================================================
//      DEBUG
//   ======================================================= */

//   useEffect(() => {

//     console.log(
//       "=========================================="
//     );

//     console.log(
//       "ABOUT PAGE - INSTITUTE ID:",
//       instituteId
//     );

//     console.log(
//       "ABOUT PAGE - INITIAL WEBSITE:",
//       initialWebsite
//     );

//     console.log(
//       "ABOUT PAGE - INSTITUTE:",
//       institute
//     );

//     console.log(
//       "ABOUT PAGE - BRANDING:",
//       rawBranding
//     );

//     console.log(
//       "=========================================="
//     );

//   }, [
//     instituteId,
//     initialWebsite,
//     institute,
//     rawBranding,
//   ]);


//   /* =======================================================
//      ABOUT STATE
//   ======================================================= */

//   const [
//     about,
//     setAbout,
//   ] = useState(
//     initialWebsite?.about ||
//     initialWebsite?.aboutPage ||
//     initialWebsite?.about_page ||
//     {}
//   );


//   /* =======================================================
//      BANNERS STATE
//   ======================================================= */

//   const [
//     banners,
//     setBanners,
//   ] = useState(
//     getArray(
//       initialWebsite?.banners,
//       initialWebsite?.websiteBanners,
//       initialWebsite?.website_banners
//     )
//   );


//   /* =======================================================
//      LOADING
//   ======================================================= */

//   const [
//     loading,
//     setLoading,
//   ] = useState(true);


//   /* =======================================================
//      ERROR
//   ======================================================= */

//   const [
//     error,
//     setError,
//   ] = useState("");


//   /* =======================================================
//      FETCH PUBLIC WEBSITE
//   ======================================================= */

//   useEffect(() => {

//     const fetchWebsite = async () => {

//       if (!instituteId) {

//         console.error(
//           "ABOUT PAGE: Institute ID is missing"
//         );

//         setError(
//           "Institute ID is missing."
//         );

//         setLoading(false);

//         return;
//       }


//       try {

//         setLoading(true);

//         setError("");


//         const API_URL =
//           import.meta.env.VITE_API_URL ||
//           "https://finearts-backend.onrender.com/api";


//         const url =
//           `${API_URL}/websites/public/${instituteId}?preview=true`;


//         console.log(
//           "=========================================="
//         );

//         console.log(
//           "ABOUT PAGE API URL:",
//           url
//         );

//         console.log(
//           "=========================================="
//         );


//         const response =
//           await fetch(url);


//         const result =
//           await response.json();


//         console.log(
//           "=========================================="
//         );

//         console.log(
//           "ABOUT PAGE API RESPONSE:",
//           result
//         );

//         console.log(
//           "=========================================="
//         );


//         if (!response.ok) {

//           throw new Error(
//             result?.message ||
//             "Failed to load About page"
//           );

//         }


//         /* =================================================
//            NORMALIZE WEBSITE RESPONSE
//         ================================================= */

//         const publicWebsite =
//           result?.data?.website ||
//           result?.data?.data?.website ||
//           result?.data?.websiteData ||
//           result?.website ||
//           result?.data ||
//           {};


//         console.log(
//           "NORMALIZED PUBLIC WEBSITE:",
//           publicWebsite
//         );


//         /* =================================================
//            ABOUT DATA
//         ================================================= */

//         const aboutData =
//           publicWebsite?.about ||
//           publicWebsite?.aboutPage ||
//           publicWebsite?.about_page ||

//           result?.data?.about ||
//           result?.data?.aboutPage ||
//           result?.data?.about_page ||

//           result?.data?.data?.about ||
//           result?.data?.data?.aboutPage ||
//           result?.data?.data?.about_page ||

//           {};


//         console.log(
//           "=========================================="
//         );

//         console.log(
//           "FINAL ABOUT DATA:",
//           aboutData
//         );

//         console.log(
//           "=========================================="
//         );


//         /* =================================================
//            BANNERS DATA
//         ================================================= */

//         const bannerData =
//           publicWebsite?.banners ||
//           publicWebsite?.websiteBanners ||
//           publicWebsite?.website_banners ||

//           result?.data?.banners ||
//           result?.data?.websiteBanners ||
//           result?.data?.website_banners ||

//           result?.data?.data?.banners ||

//           [];


//         console.log(
//           "FINAL BANNERS:",
//           bannerData
//         );


//         setAbout(
//           aboutData || {}
//         );


//         setBanners(
//           Array.isArray(
//             bannerData
//           )
//             ? bannerData
//             : []
//         );


//       } catch (err) {

//         console.error(
//           "FETCH ABOUT PAGE ERROR:",
//           err
//         );


//         setError(
//           err?.message ||
//           "Failed to load About page"
//         );

//       } finally {

//         setLoading(false);

//       }

//     };


//     fetchWebsite();

//   }, [instituteId]);


//   /* =======================================================
//      FIND ABOUT BANNER
//   ======================================================= */

//   const aboutBanner = useMemo(() => {

//     if (
//       !Array.isArray(
//         banners
//       )
//     ) {
//       return null;
//     }


//     const filtered =
//       banners
//         .filter(
//           (banner) => {

//             const bannerType =
//               banner?.banner_type ||
//               banner?.bannerType ||
//               banner?.page_type ||
//               banner?.pageType ||
//               banner?.page ||
//               "";


//             const normalizedType =
//               String(
//                 bannerType
//               )
//                 .trim()
//                 .toLowerCase();


//             return (
//               normalizedType ===
//                 "about" ||

//               normalizedType ===
//                 "about_page" ||

//               normalizedType ===
//                 "about-page"
//             );

//           }
//         )
//         .filter(
//           (banner) => {

//             const active =
//               banner?.is_active ??
//               banner?.isActive ??
//               banner?.active;


//             if (
//               active === undefined ||
//               active === null
//             ) {
//               return true;
//             }


//             return (
//               active === true ||
//               active === 1 ||
//               active === "1" ||
//               active === "true"
//             );

//           }
//         )
//         .sort(
//           (a, b) =>
//             Number(
//               a?.display_order ??
//               a?.displayOrder ??
//               0
//             ) -
//             Number(
//               b?.display_order ??
//               b?.displayOrder ??
//               0
//             )
//         );


//     return (
//       filtered[0] ||
//       null
//     );

//   }, [banners]);


//   /* =======================================================
//      DEBUG SELECTED BANNER
//   ======================================================= */

//   useEffect(() => {

//     console.log(
//       "=========================================="
//     );

//     console.log(
//       "ABOUT PAGE - ALL BANNERS:",
//       banners
//     );

//     console.log(
//       "ABOUT PAGE - SELECTED ABOUT BANNER:",
//       aboutBanner
//     );

//     console.log(
//       "=========================================="
//     );

//   }, [
//     banners,
//     aboutBanner,
//   ]);


//   /* =======================================================
//      BANNER IMAGE
//   ======================================================= */

//   const aboutBannerImage =
//     getValue(
//       aboutBanner?.image_url,
//       aboutBanner?.imageUrl,
//       aboutBanner?.image,
//       aboutBanner?.banner_image_url,
//       aboutBanner?.bannerImageUrl,
//       aboutBanner?.url
//     );


//   /* =======================================================
//      INSTITUTE NAME
//   ======================================================= */

//   const instituteName =
//     getValue(
//       institute?.name,
//       institute?.institute_name,
//       initialWebsite?.name,
//       initialWebsite?.institute_name,
//       "Our Institute"
//     );


//   /* =======================================================
//      STORY
//   ======================================================= */

//   const storySmallHeading =
//     getValue(
//       about?.story_small_heading,
//       about?.storySmallHeading,
//       about?.story?.small_heading,
//       about?.story?.smallHeading,
//       "OUR STORY"
//     );


//   const storyTitle =
//     getValue(
//       about?.story_main_heading,
//       about?.storyMainHeading,
//       about?.story?.main_heading,
//       about?.story?.mainHeading,
//       `About ${instituteName}`
//     );


//   const storyDescription =
//     getValue(
//       about?.story_description,
//       about?.storyDescription,
//       about?.story?.description,
//       ""
//     );


//   const storyImage =
//     getValue(
//       about?.story_image_url,
//       about?.storyImageUrl,
//       about?.story_image,
//       about?.storyImage,
//       about?.story?.image_url,
//       about?.story?.imageUrl,
//       about?.story?.image,
//       ""
//     );


//   /* =======================================================
//      WHY CHOOSE
//   ======================================================= */

//   const whyTitle =
//     getValue(
//       about?.why_title,
//       about?.whyTitle,
//       about?.why_choose_title,
//       about?.whyChooseTitle,
//       about?.why_choose?.title,
//       about?.whyChoose?.title,
//       "Why Choose Our Institute?"
//     );


//   const whyDescription =
//     getValue(
//       about?.why_description,
//       about?.whyDescription,
//       about?.why_choose_description,
//       about?.whyChooseDescription,
//       about?.why_choose?.description,
//       about?.whyChoose?.description,
//       ""
//     );


//   const features =
//     getArray(
//       about?.features,

//       about?.why_choose?.features,

//       about?.whyChoose?.features,

//       about?.why_choose_us?.features,

//       about?.whyChooseUs?.features
//     );


//   /* =======================================================
//      GROWTH
//   ======================================================= */

//   const growthTitle =
//     getValue(
//       about?.growth_title,
//       about?.growthTitle,
//       about?.growth?.title,
//       about?.growth_section?.title,
//       "How We Help You Grow"
//     );


//   const growthDescription =
//     getValue(
//       about?.growth_description,
//       about?.growthDescription,
//       about?.growth?.description,
//       about?.growth_section?.description,
//       ""
//     );


//   const growthSteps =
//     getArray(
//       about?.growth_steps,

//       about?.growthSteps,

//       about?.growth?.steps,

//       about?.growth_section?.steps
//     );


//   /* =======================================================
//      HEADING STYLE
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


//   /* =======================================================
//      SUBHEADING STYLE
//   ======================================================= */

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


//   /* =======================================================
//      BODY STYLE
//   ======================================================= */

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

//       <main
//         className="
//           flex
//           min-h-[600px]
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
//                   0.20
//                 ),

//               borderTopColor:
//                 branding.buttonColor,
//             }}
//           />

//           <p
//             className="mt-4 text-sm"
//             style={{
//               color:
//                 branding.textColor,
//             }}
//           >
//             Loading About page...
//           </p>

//         </div>

//       </main>

//     );

//   }


//   /* =======================================================
//      ERROR
//   ======================================================= */

//   if (error) {

//     return (

//       <main
//         className="
//           flex
//           min-h-[600px]
//           items-center
//           justify-center
//           px-6
//         "
//         style={{
//           backgroundColor:
//             branding.pageBackgroundColor,
//         }}
//       >

//         <div
//           className="
//             max-w-lg
//             text-center
//           "
//         >

//           <p
//             className="
//               text-lg
//               font-semibold
//             "
//             style={{
//               color:
//                 branding.headingColor,
//             }}
//           >
//             Unable to load About page
//           </p>


//           <p
//             className="mt-2 text-sm"
//             style={{
//               color:
//                 branding.textColor,
//             }}
//           >
//             {error}
//           </p>

//         </div>

//       </main>

//     );

//   }


//   /* =======================================================
//      PAGE
//   ======================================================= */

//   return (

//     <main
//       className="
//         w-full
//         overflow-hidden
//       "
//       style={{
//         backgroundColor:
//           branding.pageBackgroundColor,

//         fontFamily:
//           fontFamily(
//             branding.fontBody
//           ),
//       }}
//     >

//       {/* ===================================================
//           ABOUT BANNER

//           IMAGE ONLY
//           NO TEXT
//       =================================================== */}

//       {aboutBannerImage && (

//         <section
//           className="
//             relative
//             min-h-[420px]
//             overflow-hidden
//           "
//         >

//           <img
//             src={
//               aboutBannerImage
//             }
//             alt=""
//             className="
//               absolute
//               inset-0
//               h-full
//               w-full
//               object-cover
//             "
//           />

//           <div
//             className="
//               absolute
//               inset-0
//             "
//             style={{
//               background:
//                 "linear-gradient(90deg, rgba(0,0,0,0.68) 0%, rgba(0,0,0,0.42) 55%, rgba(0,0,0,0.25) 100%)",
//             }}
//           />

//         </section>

//       )}


//       {/* ===================================================
//           STORY SECTION
//       =================================================== */}

//       <section
//         className="py-16"
//         style={{
//           backgroundColor:
//             branding.pageBackgroundColor,
//         }}
//       >

//         <div
//           className="
//             mx-auto
//             max-w-7xl
//             px-5
//             sm:px-6
//             lg:px-8
//           "
//         >

//           <div
//             className="
//               grid
//               grid-cols-1
//               items-center
//               gap-12
//               lg:grid-cols-2
//             "
//           >

//             {/* IMAGE */}

//             <div>

//               {storyImage ? (

//                 <img
//                   src={
//                     storyImage
//                   }
//                   alt={
//                     storyTitle
//                   }
//                   className="
//                     h-[380px]
//                     w-full
//                     rounded-2xl
//                     object-cover
//                     shadow-sm
//                   "
//                 />

//               ) : (

//                 <div
//                   className="
//                     flex
//                     h-[380px]
//                     items-center
//                     justify-center
//                     rounded-2xl
//                   "
//                   style={{
//                     backgroundColor:
//                       hexToRgba(
//                         branding.buttonColor,
//                         0.07
//                       ),
//                   }}
//                 >

//                   <BookOpen
//                     size={72}
//                     style={{
//                       color:
//                         branding.buttonColor,
//                     }}
//                   />

//                 </div>

//               )}

//             </div>


//             {/* CONTENT */}

//             <div>

//               <p
//                 className="
//                   text-xs
//                   uppercase
//                   tracking-[0.15em]
//                 "
//                 style={
//                   subheadingStyle
//                 }
//               >
//                 {storySmallHeading}
//               </p>


//               <h2
//                 className="
//                   mt-3
//                   text-4xl
//                   sm:text-5xl
//                 "
//                 style={
//                   headingStyle
//                 }
//               >
//                 {storyTitle}
//               </h2>


//               {storyDescription && (

//                 <p
//                   className="
//                     mt-6
//                     whitespace-pre-line
//                     text-base
//                   "
//                   style={{
//                     ...bodyStyle,
//                     opacity: 0.72,
//                   }}
//                 >
//                   {storyDescription}
//                 </p>

//               )}

//             </div>

//           </div>

//         </div>

//       </section>


//       {/* ===================================================
//           WHY CHOOSE US
//       =================================================== */}

//       <section
//         className="py-16"
//         style={{
//           backgroundColor:
//             hexToRgba(
//               branding.buttonColor,
//               0.035
//             ),
//         }}
//       >

//         <div
//           className="
//             mx-auto
//             max-w-7xl
//             px-5
//             sm:px-6
//             lg:px-8
//           "
//         >

//           <div className="text-center">

//             <p
//               className="
//                 text-xs
//                 uppercase
//                 tracking-[0.15em]
//               "
//               style={
//                 subheadingStyle
//               }
//             >
//               Why Choose Us
//             </p>


//             <h2
//               className="
//                 mt-3
//                 text-3xl
//                 sm:text-4xl
//               "
//               style={
//                 headingStyle
//               }
//             >
//               {whyTitle}
//             </h2>


//             {whyDescription && (

//               <p
//                 className="
//                   mx-auto
//                   mt-4
//                   max-w-2xl
//                   text-sm
//                 "
//                 style={{
//                   ...bodyStyle,
//                   opacity: 0.70,
//                 }}
//               >
//                 {whyDescription}
//               </p>

//             )}

//           </div>


//           {/* FEATURES */}

//           {features.length > 0 ? (

//             <div
//               className="
//                 mt-10
//                 grid
//                 grid-cols-1
//                 gap-5
//                 sm:grid-cols-2
//                 lg:grid-cols-3
//               "
//             >

//               {features
//                 .filter(
//                   (feature) => {

//                     const active =
//                       feature?.is_active ??
//                       feature?.isActive ??
//                       feature?.active;


//                     if (
//                       active === undefined ||
//                       active === null
//                     ) {
//                       return true;
//                     }


//                     return (
//                       active === true ||
//                       active === 1 ||
//                       active === "1" ||
//                       active === "true"
//                     );

//                   }
//                 )
//                 .slice()
//                 .sort(
//                   (a, b) =>
//                     Number(
//                       a?.display_order ??
//                       a?.displayOrder ??
//                       0
//                     ) -
//                     Number(
//                       b?.display_order ??
//                       b?.displayOrder ??
//                       0
//                     )
//                 )
//                 .map(
//                   (
//                     feature,
//                     index
//                   ) => {

//                     const icons = [
//                       Award,
//                       BookOpen,
//                       Sparkles,
//                       Heart,
//                       Target,
//                       Lightbulb,
//                     ];


//                     const Icon =
//                       icons[
//                         index %
//                           icons.length
//                       ];


//                     return (

//                       <div
//                         key={
//                           feature?.id ||
//                           index
//                         }
//                         className="
//                           rounded-2xl
//                           border
//                           p-6
//                           shadow-sm
//                         "
//                         style={{
//                           backgroundColor:
//                             branding.cardBackgroundColor,

//                           borderColor:
//                             hexToRgba(
//                               branding.textColor,
//                               0.10
//                             ),
//                         }}
//                       >

//                         <div
//                           className="
//                             flex
//                             h-12
//                             w-12
//                             items-center
//                             justify-center
//                             rounded-full
//                           "
//                           style={{
//                             color:
//                               branding.buttonColor,

//                             backgroundColor:
//                               hexToRgba(
//                                 branding.buttonColor,
//                                 0.08
//                               ),
//                           }}
//                         >

//                           <Icon
//                             size={24}
//                           />

//                         </div>


//                         <h3
//                           className="
//                             mt-5
//                             text-lg
//                           "
//                           style={
//                             subheadingStyle
//                           }
//                         >
//                           {
//                             feature?.title ||
//                             feature?.feature_title ||
//                             feature?.name
//                           }
//                         </h3>


//                         {(feature?.description ||
//                           feature?.feature_description) && (

//                           <p
//                             className="
//                               mt-2
//                               text-sm
//                             "
//                             style={{
//                               ...bodyStyle,
//                               opacity: 0.65,
//                             }}
//                           >
//                             {
//                               feature?.description ||
//                               feature?.feature_description
//                             }
//                           </p>

//                         )}

//                       </div>

//                     );

//                   }
//                 )}

//             </div>

//           ) : (

//             <div
//               className="
//                 mt-10
//                 text-center
//               "
//             >

//               <p
//                 className="text-sm"
//                 style={{
//                   color:
//                     branding.textColor,
//                 }}
//               >
//                 No features added yet.
//               </p>

//             </div>

//           )}

//         </div>

//       </section>


//       {/* ===================================================
//           GROWTH SECTION
//       =================================================== */}

//       <section
//         className="py-16"
//         style={{
//           backgroundColor:
//             branding.pageBackgroundColor,
//         }}
//       >

//         <div
//           className="
//             mx-auto
//             max-w-7xl
//             px-5
//             sm:px-6
//             lg:px-8
//           "
//         >

//           <div className="text-center">

//             <p
//               className="
//                 text-xs
//                 uppercase
//                 tracking-[0.15em]
//               "
//               style={
//                 subheadingStyle
//               }
//             >
//               Our Approach
//             </p>


//             <h2
//               className="
//                 mt-3
//                 text-3xl
//                 sm:text-4xl
//               "
//               style={
//                 headingStyle
//               }
//             >
//               {growthTitle}
//             </h2>


//             {growthDescription && (

//               <p
//                 className="
//                   mx-auto
//                   mt-4
//                   max-w-2xl
//                   text-sm
//                 "
//                 style={{
//                   ...bodyStyle,
//                   opacity: 0.70,
//                 }}
//               >
//                 {growthDescription}
//               </p>

//             )}

//           </div>


//           {/* GROWTH STEPS */}

//           {growthSteps.length > 0 ? (

//             <div
//               className="
//                 mt-12
//                 grid
//                 grid-cols-1
//                 gap-6
//                 md:grid-cols-2
//                 lg:grid-cols-4
//               "
//             >

//               {growthSteps
//                 .slice()
//                 .sort(
//                   (a, b) =>
//                     Number(
//                       a?.step_number ??
//                       a?.stepNumber ??
//                       a?.number ??
//                       0
//                     ) -
//                     Number(
//                       b?.step_number ??
//                       b?.stepNumber ??
//                       b?.number ??
//                       0
//                     )
//                 )
//                 .map(
//                   (
//                     step,
//                     index
//                   ) => {

//                     const stepNumber =
//                       step?.step_number ??
//                       step?.stepNumber ??
//                       step?.number ??
//                       index + 1;


//                     return (

//                       <div
//                         key={
//                           step?.id ||
//                           index
//                         }
//                         className="
//                           rounded-2xl
//                           border
//                           p-6
//                         "
//                         style={{
//                           backgroundColor:
//                             branding.cardBackgroundColor,

//                           borderColor:
//                             hexToRgba(
//                               branding.textColor,
//                               0.10
//                             ),
//                         }}
//                       >

//                         <div
//                           className="
//                             flex
//                             h-12
//                             w-12
//                             items-center
//                             justify-center
//                             rounded-full
//                             text-sm
//                           "
//                           style={{
//                             backgroundColor:
//                               branding.buttonColor,

//                             color:
//                               branding.buttonTextColor,

//                             fontFamily:
//                               fontFamily(
//                                 branding.fontHeading
//                               ),

//                             fontWeight:
//                               branding.headingWeight,
//                           }}
//                         >

//                           {String(
//                             stepNumber
//                           ).padStart(
//                             2,
//                             "0"
//                           )}

//                         </div>


//                         <h3
//                           className="
//                             mt-5
//                             text-lg
//                           "
//                           style={
//                             subheadingStyle
//                           }
//                         >
//                           {
//                             step?.title ||
//                             step?.step_title ||
//                             step?.name
//                           }
//                         </h3>


//                         {(step?.description ||
//                           step?.step_description) && (

//                           <p
//                             className="
//                               mt-2
//                               text-sm
//                             "
//                             style={{
//                               ...bodyStyle,
//                               opacity: 0.65,
//                             }}
//                           >
//                             {
//                               step?.description ||
//                               step?.step_description
//                             }
//                           </p>

//                         )}

//                       </div>

//                     );

//                   }
//                 )}

//             </div>

//           ) : (

//             <div
//               className="
//                 mt-10
//                 text-center
//               "
//             >

//               <p
//                 className="text-sm"
//                 style={{
//                   color:
//                     branding.textColor,
//                 }}
//               >
//                 No growth steps added yet.
//               </p>

//             </div>

//           )}

//         </div>

//       </section>


//       {/* ===================================================
//           NO CONTACT SECTION
          
//           Contact has intentionally been removed.
//       =================================================== */}

//     </main>

//   );

// };


// export default WebsiteAbout;


// import React, {
//   useEffect,
//   useMemo,
//   useState,
// } from "react";

// import {
//   Award,
//   BookOpen,
//   Heart,
//   Lightbulb,
//   Target,
//   Sparkles,
// } from "lucide-react";

// import {
//   useOutletContext,
// } from "react-router-dom";


// /* =========================================================
//    DEFAULT BRANDING
// ========================================================= */

// const DEFAULT_BRANDING = {
//   headingColor: "#111827",
//   subheadingColor: "#5B21B6",
//   textColor: "#4B5563",

//   iconColor: "#F59E0B",

//   buttonColor: "#7C3AED",
//   buttonTextColor: "#FFFFFF",

//   pageBackgroundColor: "#FFFFFF",
//   cardBackgroundColor: "#FFFFFF",

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
//    GET BRANDING VALUE
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


// /* =========================================================
//    NORMALIZE BRANDING
// ========================================================= */

// const normalizeBranding = (
//   branding = {}
// ) => ({

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
//    FONT HELPER
// ========================================================= */

// const fontFamily = (
//   font
// ) =>
//   font
//     ? `'${font}', sans-serif`
//     : "Inter, sans-serif";


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
//     color.replace(
//       "#",
//       ""
//     );


//   if (
//     !/^[0-9A-Fa-f]{6}$/.test(
//       hex
//     )
//   ) {
//     return color;
//   }


//   const r =
//     parseInt(
//       hex.substring(
//         0,
//         2
//       ),
//       16
//     );


//   const g =
//     parseInt(
//       hex.substring(
//         2,
//         4
//       ),
//       16
//     );


//   const b =
//     parseInt(
//       hex.substring(
//         4,
//         6
//       ),
//       16
//     );


//   return `rgba(${r}, ${g}, ${b}, ${alpha})`;
// };


// /* =========================================================
//    GET FIRST AVAILABLE VALUE
// ========================================================= */

// const getValue = (
//   ...values
// ) => {

//   return values.find(
//     (value) =>
//       value !== undefined &&
//       value !== null &&
//       String(value).trim() !== ""
//   );

// };


// /* =========================================================
//    GET ARRAY
// ========================================================= */

// const getArray = (
//   ...values
// ) => {

//   return values.find(
//     (value) =>
//       Array.isArray(value)
//   ) || [];

// };


// /* =========================================================
//    BOOLEAN HELPER
// ========================================================= */

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
//    GET SECTION
// ========================================================= */

// const findSection = (
//   sections,
//   ...keys
// ) => {

//   if (
//     !Array.isArray(
//       sections
//     )
//   ) {
//     return null;
//   }


//   const normalizedKeys =
//     keys.map(
//       (key) =>
//         String(
//           key
//         )
//           .trim()
//           .toLowerCase()
//           .replace(
//             /[\s-]+/g,
//             "_"
//           )
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
//               String(
//                 candidate
//               )
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
//    MAIN COMPONENT
// ========================================================= */

// const WebsiteAbout = () => {

//   /* =======================================================
//      OUTLET CONTEXT
//   ======================================================= */

//   const outletContext =
//     useOutletContext() || {};


//   /* =======================================================
//      INITIAL WEBSITE
//   ======================================================= */

//   const initialWebsite =
//     outletContext?.website ||
//     outletContext?.websiteData?.website ||
//     outletContext?.websiteData ||
//     {};


//   /* =======================================================
//      INSTITUTE
//   ======================================================= */

//   const institute =
//     outletContext?.institute ||
//     initialWebsite?.institute ||
//     outletContext?.websiteData?.institute ||
//     {};


//   /* =======================================================
//      BRANDING
//   ======================================================= */

//   const rawBranding =
//     outletContext?.branding ||
//     initialWebsite?.branding ||
//     outletContext?.websiteData?.branding ||
//     {};


//   const branding =
//     useMemo(
//       () =>
//         normalizeBranding(
//           rawBranding
//         ),
//       [
//         rawBranding,
//       ]
//     );


//   /* =======================================================
//      INSTITUTE ID
//   ======================================================= */

//   const instituteId =
//     institute?.id ||
//     institute?.institute_id ||
//     initialWebsite?.instituteId ||
//     initialWebsite?.institute_id ||
//     initialWebsite?.institute?.id ||
//     initialWebsite?.institute?.institute_id;


//   /* =======================================================
//      SECTIONS
//   ======================================================= */

//   const initialSections =
//     getArray(
//       outletContext?.sections,

//       initialWebsite?.sections,

//       initialWebsite?.websiteSections,

//       initialWebsite?.website_sections,

//       outletContext?.websiteData?.sections,

//       outletContext?.websiteData?.websiteSections,

//       outletContext?.websiteData?.website_sections
//     );


//   const [
//     sections,
//     setSections,
//   ] = useState(
//     initialSections
//   );


//   /* =======================================================
//      ABOUT STATE
//   ======================================================= */

//   const [
//     about,
//     setAbout,
//   ] = useState(
//     initialWebsite?.about ||
//     initialWebsite?.aboutPage ||
//     initialWebsite?.about_page ||
//     {}
//   );


//   /* =======================================================
//      BANNERS
//   ======================================================= */

//   const [
//     banners,
//     setBanners,
//   ] = useState(
//     getArray(
//       initialWebsite?.banners,

//       initialWebsite?.websiteBanners,

//       initialWebsite?.website_banners
//     )
//   );


//   /* =======================================================
//      LOADING
//   ======================================================= */

//   const [
//     loading,
//     setLoading,
//   ] = useState(true);


//   /* =======================================================
//      ERROR
//   ======================================================= */

//   const [
//     error,
//     setError,
//   ] = useState("");


//   /* =======================================================
//      FETCH PUBLIC WEBSITE
//   ======================================================= */

//   useEffect(() => {

//     const fetchWebsite =
//       async () => {

//         if (
//           !instituteId
//         ) {

//           console.error(
//             "ABOUT PAGE: Institute ID is missing"
//           );


//           setError(
//             "Institute ID is missing."
//           );


//           setLoading(
//             false
//           );


//           return;

//         }


//         try {

//           setLoading(
//             true
//           );


//           setError("");


//           const API_URL =
//             import.meta.env.VITE_API_URL ||
//             "https://finearts-backend.onrender.com/api";


//           const url =
//             `${API_URL}/websites/public/${instituteId}?preview=true`;


//           console.log(
//             "ABOUT PAGE API URL:",
//             url
//           );


//           const response =
//             await fetch(
//               url
//             );


//           const result =
//             await response.json();


//           console.log(
//             "ABOUT PAGE API RESPONSE:",
//             result
//           );


//           if (
//             !response.ok
//           ) {

//             throw new Error(
//               result?.message ||
//               "Failed to load About page"
//             );

//           }


//           /* ===============================================
//              NORMALIZE WEBSITE
//           =============================================== */

//           const publicWebsite =
//             result?.data?.website ||
//             result?.data?.data?.website ||
//             result?.data?.websiteData ||
//             result?.website ||
//             result?.data ||
//             {};


//           /* ===============================================
//              ABOUT DATA
//           =============================================== */

//           const aboutData =
//             publicWebsite?.about ||
//             publicWebsite?.aboutPage ||
//             publicWebsite?.about_page ||

//             result?.data?.about ||
//             result?.data?.aboutPage ||
//             result?.data?.about_page ||

//             result?.data?.data?.about ||
//             result?.data?.data?.aboutPage ||
//             result?.data?.data?.about_page ||

//             {};


//           /* ===============================================
//              BANNERS
//           =============================================== */

//           const bannerData =
//             publicWebsite?.banners ||
//             publicWebsite?.websiteBanners ||
//             publicWebsite?.website_banners ||

//             result?.data?.banners ||
//             result?.data?.websiteBanners ||
//             result?.data?.website_banners ||

//             result?.data?.data?.banners ||

//             [];


//           /* ===============================================
//              SECTIONS
//           =============================================== */

//           const sectionData =
//             publicWebsite?.sections ||
//             publicWebsite?.websiteSections ||
//             publicWebsite?.website_sections ||

//             result?.data?.sections ||
//             result?.data?.websiteSections ||
//             result?.data?.website_sections ||

//             result?.data?.data?.sections ||

//             [];


//           setAbout(
//             aboutData || {}
//           );


//           setBanners(
//             Array.isArray(
//               bannerData
//             )
//               ? bannerData
//               : []
//           );


//           if (
//             Array.isArray(
//               sectionData
//             )
//           ) {

//             setSections(
//               sectionData
//             );

//           }


//           console.log(
//             "ABOUT DATA:",
//             aboutData
//           );


//           console.log(
//             "ABOUT SECTIONS:",
//             sectionData
//           );


//           console.log(
//             "ABOUT BRANDING:",
//             publicWebsite?.branding ||
//             rawBranding
//           );

//         } catch (
//           err
//         ) {

//           console.error(
//             "FETCH ABOUT PAGE ERROR:",
//             err
//           );


//           setError(
//             err?.message ||
//             "Failed to load About page"
//           );

//         } finally {

//           setLoading(
//             false
//           );

//         }

//       };


//     fetchWebsite();

//   }, [
//     instituteId,
//   ]);


//   /* =======================================================
//      SECTION VISIBILITY
//   ======================================================= */

//   const aboutSection =
//     findSection(
//       sections,
//       "about",
//       "about_page"
//     );


//   const storySection =
//     findSection(
//       sections,
//       "about_story",
//       "story",
//       "about_story_section"
//     );


//   const whySection =
//     findSection(
//       sections,
//       "about_features",
//       "features",
//       "why_choose",
//       "why_choose_us"
//     );


//   const growthSection =
//     findSection(
//       sections,
//       "about_growth",
//       "growth",
//       "growth_section"
//     );


//   const bannerSection =
//     findSection(
//       sections,
//       "about_banner",
//       "banner",
//       "about_hero"
//     );


//   const showAbout =
//     isEnabled(
//       aboutSection?.is_visible ??
//       aboutSection?.isVisible ??
//       aboutSection?.visible ??
//       aboutSection?.enabled,
//       true
//     );


//   const showBanner =
//     isEnabled(
//       bannerSection?.is_visible ??
//       bannerSection?.isVisible ??
//       bannerSection?.visible ??
//       bannerSection?.enabled,
//       true
//     );


//   const showStory =
//     isEnabled(
//       storySection?.is_visible ??
//       storySection?.isVisible ??
//       storySection?.visible ??
//       storySection?.enabled,
//       true
//     );


//   const showWhy =
//     isEnabled(
//       whySection?.is_visible ??
//       whySection?.isVisible ??
//       whySection?.visible ??
//       whySection?.enabled,
//       true
//     );


//   const showGrowth =
//     isEnabled(
//       growthSection?.is_visible ??
//       growthSection?.isVisible ??
//       growthSection?.visible ??
//       growthSection?.enabled,
//       true
//     );


//   /* =======================================================
//      ABOUT PAGE CONTENT
//   ======================================================= */

//   const pageHeading =
//     getValue(

//       about?.heading,

//       about?.main_heading,

//       about?.mainHeading,

//       about?.page_heading,

//       about?.pageHeading,

//       about?.title,

//       about?.about_heading,

//       about?.aboutHeading,

//       "About Us"

//     );


//   const pageSubheading =
//     getValue(

//       about?.subheading,

//       about?.sub_heading,

//       about?.subHeading,

//       about?.page_subheading,

//       about?.pageSubheading,

//       about?.about_subheading,

//       about?.aboutSubheading,

//       ""

//     );


//   /* =======================================================
//      STORY CONTENT
//   ======================================================= */

//   const storySmallHeading =
//     getValue(

//       about?.story_small_heading,

//       about?.storySmallHeading,

//       about?.story?.small_heading,

//       about?.story?.smallHeading,

//       storySection?.subheading,

//       storySection?.sub_heading,

//       ""

//     );


//   const storyTitle =
//     getValue(

//       about?.story_main_heading,

//       about?.storyMainHeading,

//       about?.story_heading,

//       about?.storyHeading,

//       about?.story?.main_heading,

//       about?.story?.mainHeading,

//       about?.story?.heading,

//       storySection?.heading,

//       ""

//     );


//   const storyDescription =
//     getValue(

//       about?.story_description,

//       about?.storyDescription,

//       about?.story?.description,

//       ""

//     );


//   const storyImage =
//     getValue(

//       about?.story_image_url,

//       about?.storyImageUrl,

//       about?.story_image,

//       about?.storyImage,

//       about?.story?.image_url,

//       about?.story?.imageUrl,

//       about?.story?.image,

//       ""

//     );


//   /* =======================================================
//      WHY CHOOSE CONTENT
//   ======================================================= */

//   const whySmallHeading =
//     getValue(

//       about?.why_small_heading,

//       about?.whySmallHeading,

//       about?.why_subheading,

//       about?.whySubheading,

//       about?.why_choose_subheading,

//       about?.whyChooseSubheading,

//       whySection?.subheading,

//       whySection?.sub_heading,

//       ""

//     );


//   const whyTitle =
//     getValue(

//       about?.why_title,

//       about?.whyTitle,

//       about?.why_heading,

//       about?.whyHeading,

//       about?.why_choose_title,

//       about?.whyChooseTitle,

//       about?.why_choose_heading,

//       about?.whyChooseHeading,

//       about?.why_choose?.title,

//       about?.whyChoose?.title,

//       whySection?.heading,

//       ""

//     );


//   const whyDescription =
//     getValue(

//       about?.why_description,

//       about?.whyDescription,

//       about?.why_choose_description,

//       about?.whyChooseDescription,

//       about?.why_choose?.description,

//       about?.whyChoose?.description,

//       ""

//     );


//   const features =
//     getArray(

//       about?.features,

//       about?.why_choose?.features,

//       about?.whyChoose?.features,

//       about?.why_choose_us?.features,

//       about?.whyChooseUs?.features

//     );


//   /* =======================================================
//      GROWTH CONTENT
//   ======================================================= */

//   const growthSmallHeading =
//     getValue(

//       about?.growth_small_heading,

//       about?.growthSmallHeading,

//       about?.growth_subheading,

//       about?.growthSubheading,

//       about?.growth?.small_heading,

//       about?.growth?.smallHeading,

//       growthSection?.subheading,

//       growthSection?.sub_heading,

//       ""

//     );


//   const growthTitle =
//     getValue(

//       about?.growth_title,

//       about?.growthTitle,

//       about?.growth_heading,

//       about?.growthHeading,

//       about?.growth?.title,

//       about?.growth?.heading,

//       about?.growth_section?.title,

//       growthSection?.heading,

//       ""

//     );


//   const growthDescription =
//     getValue(

//       about?.growth_description,

//       about?.growthDescription,

//       about?.growth?.description,

//       about?.growth_section?.description,

//       ""

//     );


//   const growthSteps =
//     getArray(

//       about?.growth_steps,

//       about?.growthSteps,

//       about?.growth?.steps,

//       about?.growth_section?.steps

//     );


//   /* =======================================================
//      BANNER
//   ======================================================= */

//   const aboutBanner =
//     useMemo(() => {

//       if (
//         !Array.isArray(
//           banners
//         )
//       ) {
//         return null;
//       }


//       return (

//         banners
//           .filter(
//             (banner) => {

//               const bannerType =
//                 banner?.banner_type ||
//                 banner?.bannerType ||
//                 banner?.page_type ||
//                 banner?.pageType ||
//                 banner?.page ||
//                 "";


//               const normalizedType =
//                 String(
//                   bannerType
//                 )
//                   .trim()
//                   .toLowerCase()
//                   .replace(
//                     /[\s-]+/g,
//                     "_"
//                   );


//               return (

//                 normalizedType ===
//                   "about" ||

//                 normalizedType ===
//                   "about_page"

//               );

//             }
//           )
//           .filter(
//             (banner) => {

//               const active =
//                 banner?.is_active ??
//                 banner?.isActive ??
//                 banner?.active;


//               return isEnabled(
//                 active,
//                 true
//               );

//             }
//           )
//           .sort(
//             (a, b) =>
//               Number(
//                 a?.display_order ??
//                 a?.displayOrder ??
//                 0
//               ) -
//               Number(
//                 b?.display_order ??
//                 b?.displayOrder ??
//                 0
//               )
//           )[0] ||

//         null

//       );

//     }, [
//       banners,
//     ]);


//   const aboutBannerImage =
//     getValue(

//       aboutBanner?.image_url,

//       aboutBanner?.imageUrl,

//       aboutBanner?.image,

//       aboutBanner?.banner_image_url,

//       aboutBanner?.bannerImageUrl,

//       aboutBanner?.url

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
//      LOADING
//   ======================================================= */

//   if (
//     loading
//   ) {

//     return (

//       <main
//         className="
//           flex
//           min-h-[600px]
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
//                   0.20
//                 ),

//               borderTopColor:
//                 branding.buttonColor,

//             }}
//           />

//           <p
//             className="mt-4 text-sm"
//             style={{
//               color:
//                 branding.textColor,
//             }}
//           >
//             Loading About page...
//           </p>

//         </div>

//       </main>

//     );

//   }


//   /* =======================================================
//      ERROR
//   ======================================================= */

//   if (
//     error
//   ) {

//     return (

//       <main
//         className="
//           flex
//           min-h-[600px]
//           items-center
//           justify-center
//           px-6
//         "
//         style={{
//           backgroundColor:
//             branding.pageBackgroundColor,
//         }}
//       >

//         <div
//           className="
//             max-w-lg
//             text-center
//           "
//         >

//           <p
//             className="
//               text-lg
//               font-semibold
//             "
//             style={{
//               color:
//                 branding.headingColor,
//             }}
//           >
//             Unable to load About page
//           </p>


//           <p
//             className="mt-2 text-sm"
//             style={{
//               color:
//                 branding.textColor,
//             }}
//           >
//             {error}
//           </p>

//         </div>

//       </main>

//     );

//   }


//   /* =======================================================
//      PAGE
//   ======================================================= */

//   return (

//     <main
//       className="
//         w-full
//         overflow-hidden
//       "
//       style={{

//         backgroundColor:
//           branding.pageBackgroundColor,

//         fontFamily:
//           fontFamily(
//             branding.fontBody
//           ),

//       }}
//     >

//       {/* ===================================================
//           ABOUT PAGE HEADER

//           CONTENT PAGE:

//           Heading
//           Subheading
//       =================================================== */}

//       {showAbout && (
//         <section
//           className="
//             px-5
//             pb-12
//             pt-16
//             text-center
//             sm:px-6
//             lg:px-8
//           "
//           style={{
//             backgroundColor:
//               branding.pageBackgroundColor,
//           }}
//         >

//           {pageSubheading && (

//             <p
//               className="
//                 text-xs
//                 uppercase
//                 tracking-[0.15em]
//               "
//               style={
//                 subheadingStyle
//               }
//             >
//               {pageSubheading}
//             </p>

//           )}


//           {pageHeading && (

//             <h1
//               className="
//                 mt-3
//                 text-4xl
//                 sm:text-5xl
//               "
//               style={
//                 headingStyle
//               }
//             >
//               {pageHeading}
//             </h1>

//           )}

//         </section>
//       )}


//       {/* ===================================================
//           ABOUT BANNER

//           SECTION VISIBILITY:
//           About Banner
//       =================================================== */}

//       {showAbout &&
//         showBanner &&
//         aboutBannerImage && (

//           <section
//             className="
//               relative
//               min-h-[420px]
//               overflow-hidden
//             "
//           >

//             <img
//               src={
//                 aboutBannerImage
//               }

//               alt=""

//               className="
//                 absolute
//                 inset-0
//                 h-full
//                 w-full
//                 object-cover
//               "
//             />


//             <div
//               className="
//                 absolute
//                 inset-0
//               "
//               style={{
//                 background:
//                   "linear-gradient(90deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.15) 100%)",
//               }}
//             />

//           </section>

//         )}


//       {/* ===================================================
//           STORY SECTION
//       =================================================== */}

//       {showAbout &&
//         showStory && (

//           <section
//             className="py-16"
//             style={{
//               backgroundColor:
//                 branding.pageBackgroundColor,
//             }}
//           >

//             <div
//               className="
//                 mx-auto
//                 max-w-7xl
//                 px-5
//                 sm:px-6
//                 lg:px-8
//               "
//             >

//               <div
//                 className="
//                   grid
//                   grid-cols-1
//                   items-center
//                   gap-12
//                   lg:grid-cols-2
//                 "
//               >

//                 {/* IMAGE */}

//                 <div>

//                   {storyImage ? (

//                     <img
//                       src={
//                         storyImage
//                       }

//                       alt={
//                         storyTitle ||
//                         "About"
//                       }

//                       className="
//                         h-[380px]
//                         w-full
//                         rounded-2xl
//                         object-cover
//                         shadow-sm
//                       "
//                     />

//                   ) : (

//                     <div
//                       className="
//                         flex
//                         h-[380px]
//                         items-center
//                         justify-center
//                         rounded-2xl
//                       "
//                       style={{
//                         backgroundColor:
//                           hexToRgba(
//                             branding.buttonColor,
//                             0.07
//                           ),
//                       }}
//                     >

//                       <BookOpen
//                         size={72}
//                         style={{
//                           color:
//                             branding.buttonColor,
//                         }}
//                       />

//                     </div>

//                   )}

//                 </div>


//                 {/* CONTENT */}

//                 <div>

//                   {storySmallHeading && (

//                     <p
//                       className="
//                         text-xs
//                         uppercase
//                         tracking-[0.15em]
//                       "
//                       style={
//                         subheadingStyle
//                       }
//                     >
//                       {storySmallHeading}
//                     </p>

//                   )}


//                   {storyTitle && (

//                     <h2
//                       className="
//                         mt-3
//                         text-4xl
//                         sm:text-5xl
//                       "
//                       style={
//                         headingStyle
//                       }
//                     >
//                       {storyTitle}
//                     </h2>

//                   )}


//                   {storyDescription && (

//                     <p
//                       className="
//                         mt-6
//                         whitespace-pre-line
//                         text-base
//                       "
//                       style={{
//                         ...bodyStyle,
//                         opacity: 0.72,
//                       }}
//                     >
//                       {storyDescription}
//                     </p>

//                   )}

//                 </div>

//               </div>

//             </div>

//           </section>

//         )}


//       {/* ===================================================
//           WHY CHOOSE / FEATURES
//       =================================================== */}

//       {showAbout &&
//         showWhy && (

//           <section
//             className="py-16"
//             style={{
//               backgroundColor:
//                 hexToRgba(
//                   branding.buttonColor,
//                   0.035
//                 ),
//             }}
//           >

//             <div
//               className="
//                 mx-auto
//                 max-w-7xl
//                 px-5
//                 sm:px-6
//                 lg:px-8
//               "
//             >

//               <div
//                 className="text-center"
//               >

//                 {whySmallHeading && (

//                   <p
//                     className="
//                       text-xs
//                       uppercase
//                       tracking-[0.15em]
//                     "
//                     style={
//                       subheadingStyle
//                     }
//                   >
//                     {whySmallHeading}
//                   </p>

//                 )}


//                 {whyTitle && (

//                   <h2
//                     className="
//                       mt-3
//                       text-3xl
//                       sm:text-4xl
//                     "
//                     style={
//                       headingStyle
//                     }
//                   >
//                     {whyTitle}
//                   </h2>

//                 )}


//                 {whyDescription && (

//                   <p
//                     className="
//                       mx-auto
//                       mt-4
//                       max-w-2xl
//                       text-sm
//                     "
//                     style={{
//                       ...bodyStyle,
//                       opacity: 0.70,
//                     }}
//                   >
//                     {whyDescription}
//                   </p>

//                 )}

//               </div>


//               {/* FEATURES */}

//               {features.length > 0 && (

//                 <div
//                   className="
//                     mt-10
//                     grid
//                     grid-cols-1
//                     gap-5
//                     sm:grid-cols-2
//                     lg:grid-cols-3
//                   "
//                 >

//                   {features
//                     .filter(
//                       (
//                         feature
//                       ) =>
//                         isEnabled(
//                           feature?.is_active ??
//                           feature?.isActive ??
//                           feature?.active,
//                           true
//                         )
//                     )
//                     .slice()
//                     .sort(
//                       (
//                         a,
//                         b
//                       ) =>
//                         Number(
//                           a?.display_order ??
//                           a?.displayOrder ??
//                           0
//                         ) -
//                         Number(
//                           b?.display_order ??
//                           b?.displayOrder ??
//                           0
//                         )
//                     )
//                     .map(
//                       (
//                         feature,
//                         index
//                       ) => {

//                         const icons = [

//                           Award,

//                           BookOpen,

//                           Sparkles,

//                           Heart,

//                           Target,

//                           Lightbulb,

//                         ];


//                         const Icon =
//                           icons[
//                             index %
//                             icons.length
//                           ];


//                         const title =
//                           getValue(

//                             feature?.title,

//                             feature?.feature_title,

//                             feature?.featureTitle,

//                             feature?.name,

//                             ""

//                           );


//                         const description =
//                           getValue(

//                             feature?.description,

//                             feature?.feature_description,

//                             feature?.featureDescription,

//                             ""

//                           );


//                         return (

//                           <div
//                             key={
//                               feature?.id ||
//                               index
//                             }

//                             className="
//                               rounded-2xl
//                               border
//                               p-6
//                               shadow-sm
//                             "

//                             style={{

//                               backgroundColor:
//                                 branding.cardBackgroundColor,

//                               borderColor:
//                                 hexToRgba(
//                                   branding.textColor,
//                                   0.10
//                                 ),

//                             }}
//                           >

//                             <div
//                               className="
//                                 flex
//                                 h-12
//                                 w-12
//                                 items-center
//                                 justify-center
//                                 rounded-full
//                               "
//                               style={{

//                                 color:
//                                   branding.iconColor,

//                                 backgroundColor:
//                                   hexToRgba(
//                                     branding.iconColor,
//                                     0.10
//                                   ),

//                               }}
//                             >

//                               <Icon
//                                 size={24}
//                               />

//                             </div>


//                             {title && (

//                               <h3
//                                 className="
//                                   mt-5
//                                   text-lg
//                                 "
//                                 style={
//                                   subheadingStyle
//                                 }
//                               >
//                                 {title}
//                               </h3>

//                             )}


//                             {description && (

//                               <p
//                                 className="
//                                   mt-2
//                                   text-sm
//                                 "
//                                 style={{
//                                   ...bodyStyle,
//                                   opacity: 0.65,
//                                 }}
//                               >
//                                 {description}
//                               </p>

//                             )}

//                           </div>

//                         );

//                       }
//                     )}

//                 </div>

//               )}

//             </div>

//           </section>

//         )}


//       {/* ===================================================
//           GROWTH SECTION
//       =================================================== */}

//       {showAbout &&
//         showGrowth && (

//           <section
//             className="py-16"
//             style={{
//               backgroundColor:
//                 branding.pageBackgroundColor,
//             }}
//           >

//             <div
//               className="
//                 mx-auto
//                 max-w-7xl
//                 px-5
//                 sm:px-6
//                 lg:px-8
//               "
//             >

//               <div
//                 className="text-center"
//               >

//                 {growthSmallHeading && (

//                   <p
//                     className="
//                       text-xs
//                       uppercase
//                       tracking-[0.15em]
//                     "
//                     style={
//                       subheadingStyle
//                     }
//                   >
//                     {growthSmallHeading}
//                   </p>

//                 )}


//                 {growthTitle && (

//                   <h2
//                     className="
//                       mt-3
//                       text-3xl
//                       sm:text-4xl
//                     "
//                     style={
//                       headingStyle
//                     }
//                   >
//                     {growthTitle}
//                   </h2>

//                 )}


//                 {growthDescription && (

//                   <p
//                     className="
//                       mx-auto
//                       mt-4
//                       max-w-2xl
//                       text-sm
//                     "
//                     style={{
//                       ...bodyStyle,
//                       opacity: 0.70,
//                     }}
//                   >
//                     {growthDescription}
//                   </p>

//                 )}

//               </div>


//               {/* GROWTH STEPS */}

//               {growthSteps.length > 0 && (

//                 <div
//                   className="
//                     mt-12
//                     grid
//                     grid-cols-1
//                     gap-6
//                     md:grid-cols-2
//                     lg:grid-cols-4
//                   "
//                 >

//                   {growthSteps
//                     .slice()
//                     .sort(
//                       (
//                         a,
//                         b
//                       ) =>
//                         Number(
//                           a?.step_number ??
//                           a?.stepNumber ??
//                           a?.number ??
//                           0
//                         ) -
//                         Number(
//                           b?.step_number ??
//                           b?.stepNumber ??
//                           b?.number ??
//                           0
//                         )
//                     )
//                     .map(
//                       (
//                         step,
//                         index
//                       ) => {

//                         const stepNumber =
//                           step?.step_number ??
//                           step?.stepNumber ??
//                           step?.number ??
//                           index + 1;


//                         const title =
//                           getValue(

//                             step?.title,

//                             step?.step_title,

//                             step?.stepTitle,

//                             step?.name,

//                             ""

//                           );


//                         const description =
//                           getValue(

//                             step?.description,

//                             step?.step_description,

//                             step?.stepDescription,

//                             ""

//                           );


//                         return (

//                           <div
//                             key={
//                               step?.id ||
//                               index
//                             }

//                             className="
//                               rounded-2xl
//                               border
//                               p-6
//                             "

//                             style={{

//                               backgroundColor:
//                                 branding.cardBackgroundColor,

//                               borderColor:
//                                 hexToRgba(
//                                   branding.textColor,
//                                   0.10
//                                 ),

//                             }}
//                           >

//                             <div
//                               className="
//                                 flex
//                                 h-12
//                                 w-12
//                                 items-center
//                                 justify-center
//                                 rounded-full
//                                 text-sm
//                               "
//                               style={{

//                                 backgroundColor:
//                                   branding.buttonColor,

//                                 color:
//                                   branding.buttonTextColor,

//                                 fontFamily:
//                                   fontFamily(
//                                     branding.fontHeading
//                                   ),

//                                 fontWeight:
//                                   branding.headingWeight,

//                               }}
//                             >

//                               {String(
//                                 stepNumber
//                               ).padStart(
//                                 2,
//                                 "0"
//                               )}

//                             </div>


//                             {title && (

//                               <h3
//                                 className="
//                                   mt-5
//                                   text-lg
//                                 "
//                                 style={
//                                   subheadingStyle
//                                 }
//                               >
//                                 {title}
//                               </h3>

//                             )}


//                             {description && (

//                               <p
//                                 className="
//                                   mt-2
//                                   text-sm
//                                 "
//                                 style={{
//                                   ...bodyStyle,
//                                   opacity: 0.65,
//                                 }}
//                               >
//                                 {description}
//                               </p>

//                             )}

//                           </div>

//                         );

//                       }
//                     )}

//                 </div>

//               )}

//             </div>

//           </section>

//         )}

//     </main>

//   );

// };


// export default WebsiteAbout;


import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Award,
  BookOpen,
  Heart,
  Lightbulb,
  Target,
  Sparkles,
} from "lucide-react";

import {
  useOutletContext,
} from "react-router-dom";


/* =========================================================
   DEFAULT BRANDING
========================================================= */

const DEFAULT_BRANDING = {
  headingColor: "#111827",
  subheadingColor: "#5B21B6",
  textColor: "#4B5563",

  iconColor: "#F59E0B",

  buttonColor: "#7C3AED",
  buttonTextColor: "#FFFFFF",

  pageBackgroundColor: "#FFFFFF",
  cardBackgroundColor: "#FFFFFF",

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
   GET BRANDING VALUE
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


/* =========================================================
   NORMALIZE BRANDING
========================================================= */

const normalizeBranding = (
  branding = {}
) => ({

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
   FONT HELPER
========================================================= */

const fontFamily = (
  font
) =>
  font
    ? `'${font}', sans-serif`
    : "Inter, sans-serif";


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
   GET FIRST AVAILABLE VALUE
========================================================= */

const getValue = (
  ...values
) => {

  return values.find(
    (value) =>
      value !== undefined &&
      value !== null &&
      String(value).trim() !== ""
  );

};


/* =========================================================
   GET ARRAY
========================================================= */

const getArray = (
  ...values
) => {

  return values.find(
    (value) =>
      Array.isArray(value)
  ) || [];

};


/* =========================================================
   BOOLEAN HELPER
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
   GET SECTION
========================================================= */

const findSection = (
  sections,
  ...keys
) => {

  if (
    !Array.isArray(
      sections
    )
  ) {
    return null;
  }


  const normalizedKeys =
    keys.map(
      (key) =>
        String(
          key
        )
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
              String(
                candidate
              )
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
   MAIN COMPONENT
========================================================= */

const WebsiteAbout = () => {

  /* =======================================================
     OUTLET CONTEXT
  ======================================================= */

  const outletContext =
    useOutletContext() || {};


  /* =======================================================
     INITIAL WEBSITE
  ======================================================= */

  const initialWebsite =
    outletContext?.website ||
    outletContext?.websiteData?.website ||
    outletContext?.websiteData ||
    {};


  /* =======================================================
     INSTITUTE
  ======================================================= */

  const institute =
    outletContext?.institute ||
    initialWebsite?.institute ||
    outletContext?.websiteData?.institute ||
    {};


  /* =======================================================
     BRANDING
  ======================================================= */

  const rawBranding =
    outletContext?.branding ||
    initialWebsite?.branding ||
    outletContext?.websiteData?.branding ||
    {};


  const branding =
    useMemo(
      () =>
        normalizeBranding(
          rawBranding
        ),
      [
        rawBranding,
      ]
    );


  /* =======================================================
     INSTITUTE ID
  ======================================================= */

  const instituteId =
    institute?.id ||
    institute?.institute_id ||
    initialWebsite?.instituteId ||
    initialWebsite?.institute_id ||
    initialWebsite?.institute?.id ||
    initialWebsite?.institute?.institute_id;


  /* =======================================================
     SECTIONS
  ======================================================= */

  const initialSections =
    getArray(
      outletContext?.sections,

      initialWebsite?.sections,

      initialWebsite?.websiteSections,

      initialWebsite?.website_sections,

      outletContext?.websiteData?.sections,

      outletContext?.websiteData?.websiteSections,

      outletContext?.websiteData?.website_sections
    );


  const [
    sections,
    setSections,
  ] = useState(
    initialSections
  );


  /* =======================================================
     ABOUT STATE
  ======================================================= */

  const [
    about,
    setAbout,
  ] = useState(
    initialWebsite?.about ||
    initialWebsite?.aboutPage ||
    initialWebsite?.about_page ||
    {}
  );


  /* =======================================================
     BANNERS
  ======================================================= */

  const [
    banners,
    setBanners,
  ] = useState(
    getArray(
      initialWebsite?.banners,

      initialWebsite?.websiteBanners,

      initialWebsite?.website_banners
    )
  );


  /* =======================================================
     LOADING
  ======================================================= */

  const [
    loading,
    setLoading,
  ] = useState(true);


  /* =======================================================
     ERROR
  ======================================================= */

  const [
    error,
    setError,
  ] = useState("");


  /* =======================================================
     FETCH PUBLIC WEBSITE
  ======================================================= */

  useEffect(() => {

    const fetchWebsite =
      async () => {

        if (
          !instituteId
        ) {

          console.error(
            "ABOUT PAGE: Institute ID is missing"
          );


          setError(
            "Institute ID is missing."
          );


          setLoading(
            false
          );


          return;

        }


        try {

          setLoading(
            true
          );


          setError("");


          const API_URL =
            import.meta.env.VITE_API_URL ||
            "https://finearts-backend.onrender.com/api";


          const url =
            `${API_URL}/websites/public/${instituteId}?preview=true`;


          console.log(
            "ABOUT PAGE API URL:",
            url
          );


          const response =
            await fetch(
              url
            );


          const result =
            await response.json();


          console.log(
            "ABOUT PAGE API RESPONSE:",
            result
          );


          if (
            !response.ok
          ) {

            throw new Error(
              result?.message ||
              "Failed to load About page"
            );

          }


          /* ===============================================
             NORMALIZE WEBSITE
          =============================================== */

          const publicWebsite =
            result?.data?.website ||
            result?.data?.data?.website ||
            result?.data?.websiteData ||
            result?.website ||
            result?.data ||
            {};


          /* ===============================================
             ABOUT DATA
          =============================================== */

          const aboutData =
            publicWebsite?.about ||
            publicWebsite?.aboutPage ||
            publicWebsite?.about_page ||

            result?.data?.about ||
            result?.data?.aboutPage ||
            result?.data?.about_page ||

            result?.data?.data?.about ||
            result?.data?.data?.aboutPage ||
            result?.data?.data?.about_page ||

            {};


          /* ===============================================
             BANNERS
          =============================================== */

          const bannerData =
            publicWebsite?.banners ||
            publicWebsite?.websiteBanners ||
            publicWebsite?.website_banners ||

            result?.data?.banners ||
            result?.data?.websiteBanners ||
            result?.data?.website_banners ||

            result?.data?.data?.banners ||

            [];


          /* ===============================================
             SECTIONS
          =============================================== */

          const sectionData =
            publicWebsite?.sections ||
            publicWebsite?.websiteSections ||
            publicWebsite?.website_sections ||

            result?.data?.sections ||
            result?.data?.websiteSections ||
            result?.data?.website_sections ||

            result?.data?.data?.sections ||

            [];


          setAbout(
            aboutData || {}
          );


          setBanners(
            Array.isArray(
              bannerData
            )
              ? bannerData
              : []
          );


          if (
            Array.isArray(
              sectionData
            )
          ) {

            setSections(
              sectionData
            );

          }


          console.log(
            "ABOUT DATA:",
            aboutData
          );


          console.log(
            "ABOUT SECTIONS:",
            sectionData
          );


          console.log(
            "ABOUT BRANDING:",
            publicWebsite?.branding ||
            rawBranding
          );

        } catch (
          err
        ) {

          console.error(
            "FETCH ABOUT PAGE ERROR:",
            err
          );


          setError(
            err?.message ||
            "Failed to load About page"
          );

        } finally {

          setLoading(
            false
          );

        }

      };


    fetchWebsite();

  }, [
    instituteId,
  ]);


  /* =======================================================
     SECTION VISIBILITY
  ======================================================= */

  const aboutSection =
    findSection(
      sections,
      "about",
      "about_page"
    );


  const storySection =
    findSection(
      sections,
      "about_story",
      "story",
      "about_story_section"
    );


  const whySection =
    findSection(
      sections,
      "about_features",
      "features",
      "why_choose",
      "why_choose_us"
    );


  const growthSection =
    findSection(
      sections,
      "about_growth",
      "growth",
      "growth_section"
    );


  const bannerSection =
    findSection(
      sections,
      "about_banner",
      "banner",
      "about_hero"
    );


  const showAbout =
    isEnabled(
      aboutSection?.is_visible ??
      aboutSection?.isVisible ??
      aboutSection?.visible ??
      aboutSection?.enabled,
      true
    );


  const showBanner =
    isEnabled(
      bannerSection?.is_visible ??
      bannerSection?.isVisible ??
      bannerSection?.visible ??
      bannerSection?.enabled,
      true
    );


  const showStory =
    isEnabled(
      storySection?.is_visible ??
      storySection?.isVisible ??
      storySection?.visible ??
      storySection?.enabled,
      true
    );


  const showWhy =
    isEnabled(
      whySection?.is_visible ??
      whySection?.isVisible ??
      whySection?.visible ??
      whySection?.enabled,
      true
    );


  const showGrowth =
    isEnabled(
      growthSection?.is_visible ??
      growthSection?.isVisible ??
      growthSection?.visible ??
      growthSection?.enabled,
      true
    );


  /* =======================================================
     ABOUT PAGE CONTENT
  ======================================================= */

  const pageHeading =
    getValue(

      about?.heading,

      about?.main_heading,

      about?.mainHeading,

      about?.page_heading,

      about?.pageHeading,

      about?.title,

      about?.about_heading,

      about?.aboutHeading,

      "About Us"

    );


  const pageSubheading =
    getValue(

      about?.subheading,

      about?.sub_heading,

      about?.subHeading,

      about?.page_subheading,

      about?.pageSubheading,

      about?.about_subheading,

      about?.aboutSubheading,

      ""

    );


  /* =======================================================
     STORY CONTENT
  ======================================================= */

  const storySmallHeading =
    getValue(

      about?.story_small_heading,

      about?.storySmallHeading,

      about?.story?.small_heading,

      about?.story?.smallHeading,

      storySection?.subheading,

      storySection?.sub_heading,

      ""

    );


  const storyTitle =
    getValue(

      about?.story_main_heading,

      about?.storyMainHeading,

      about?.story_heading,

      about?.storyHeading,

      about?.story?.main_heading,

      about?.story?.mainHeading,

      about?.story?.heading,

      storySection?.heading,

      ""

    );


  const storyDescription =
    getValue(

      about?.story_description,

      about?.storyDescription,

      about?.story?.description,

      ""

    );


  const storyImage =
    getValue(

      about?.story_image_url,

      about?.storyImageUrl,

      about?.story_image,

      about?.storyImage,

      about?.story?.image_url,

      about?.story?.imageUrl,

      about?.story?.image,

      ""

    );


  /* =======================================================
     WHY CHOOSE CONTENT
  ======================================================= */

  const whySmallHeading =
    getValue(

      about?.why_small_heading,

      about?.whySmallHeading,

      about?.why_subheading,

      about?.whySubheading,

      about?.why_choose_subheading,

      about?.whyChooseSubheading,

      whySection?.subheading,

      whySection?.sub_heading,

      ""

    );


  const whyTitle =
    getValue(

      about?.why_title,

      about?.whyTitle,

      about?.why_heading,

      about?.whyHeading,

      about?.why_choose_title,

      about?.whyChooseTitle,

      about?.why_choose_heading,

      about?.whyChooseHeading,

      about?.why_choose?.title,

      about?.whyChoose?.title,

      whySection?.heading,

      ""

    );


  const whyDescription =
    getValue(

      about?.why_description,

      about?.whyDescription,

      about?.why_choose_description,

      about?.whyChooseDescription,

      about?.why_choose?.description,

      about?.whyChoose?.description,

      ""

    );


  const features =
    getArray(

      about?.features,

      about?.why_choose?.features,

      about?.whyChoose?.features,

      about?.why_choose_us?.features,

      about?.whyChooseUs?.features

    );


  /* =======================================================
     GROWTH CONTENT
  ======================================================= */

  const growthSmallHeading =
    getValue(

      about?.growth_small_heading,

      about?.growthSmallHeading,

      about?.growth_subheading,

      about?.growthSubheading,

      about?.growth?.small_heading,

      about?.growth?.smallHeading,

      growthSection?.subheading,

      growthSection?.sub_heading,

      ""

    );


  const growthTitle =
    getValue(

      about?.growth_title,

      about?.growthTitle,

      about?.growth_heading,

      about?.growthHeading,

      about?.growth?.title,

      about?.growth?.heading,

      about?.growth_section?.title,

      growthSection?.heading,

      ""

    );


  const growthDescription =
    getValue(

      about?.growth_description,

      about?.growthDescription,

      about?.growth?.description,

      about?.growth_section?.description,

      ""

    );


  const growthSteps =
    getArray(

      about?.growth_steps,

      about?.growthSteps,

      about?.growth?.steps,

      about?.growth_section?.steps

    );


  /* =======================================================
     BANNER
  ======================================================= */

  const aboutBanner =
    useMemo(() => {

      if (
        !Array.isArray(
          banners
        )
      ) {
        return null;
      }


      return (

        banners
          .filter(
            (banner) => {

              const bannerType =
                banner?.banner_type ||
                banner?.bannerType ||
                banner?.page_type ||
                banner?.pageType ||
                banner?.page ||
                "";


              const normalizedType =
                String(
                  bannerType
                )
                  .trim()
                  .toLowerCase()
                  .replace(
                    /[\s-]+/g,
                    "_"
                  );


              return (

                normalizedType ===
                  "about" ||

                normalizedType ===
                  "about_page"

              );

            }
          )
          .filter(
            (banner) => {

              const active =
                banner?.is_active ??
                banner?.isActive ??
                banner?.active;


              return isEnabled(
                active,
                true
              );

            }
          )
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
          )[0] ||

        null

      );

    }, [
      banners,
    ]);


  const aboutBannerImage =
    getValue(

      aboutBanner?.image_url,

      aboutBanner?.imageUrl,

      aboutBanner?.image,

      aboutBanner?.banner_image_url,

      aboutBanner?.bannerImageUrl,

      aboutBanner?.url

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
     LOADING
  ======================================================= */

  if (
    loading
  ) {

    return (

      <main
        className="
          flex
          min-h-[600px]
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

          <p
            className="mt-4 text-sm"
            style={{
              color:
                branding.textColor,
            }}
          >
            Loading About page...
          </p>

        </div>

      </main>

    );

  }


  /* =======================================================
     ERROR
  ======================================================= */

  if (
    error
  ) {

    return (

      <main
        className="
          flex
          min-h-[600px]
          items-center
          justify-center
          px-6
        "
        style={{
          backgroundColor:
            branding.pageBackgroundColor,
        }}
      >

        <div
          className="
            max-w-lg
            text-center
          "
        >

          <p
            className="
              text-lg
              font-semibold
            "
            style={{
              color:
                branding.headingColor,
            }}
          >
            Unable to load About page
          </p>


          <p
            className="mt-2 text-sm"
            style={{
              color:
                branding.textColor,
            }}
          >
            {error}
          </p>

        </div>

      </main>

    );

  }


  /* =======================================================
     PAGE
  ======================================================= */

  return (

    <main
      className="
        w-full
        overflow-hidden
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

      {/* ===================================================
          ABOUT BANNER

          SECTION VISIBILITY:
          About Banner
      =================================================== */}

      {showAbout &&
        showBanner &&
        aboutBannerImage && (

          <section
            className="
              relative
              min-h-[430px]
              overflow-hidden
            "
          >

            <img
              src={
                aboutBannerImage
              }

              alt=""

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
                  "linear-gradient(90deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.15) 100%)",
              }}
            />

          </section>

        )}


      {/* ===================================================
          STORY SECTION
      =================================================== */}

      {showAbout &&
        showStory && (

          <section
            className="py-16"
            style={{
              backgroundColor:
                branding.pageBackgroundColor,
            }}
          >

            <div
              className="
                mx-auto
                max-w-7xl
                px-5
                sm:px-6
                lg:px-8
              "
            >

              <div
                className="
                  grid
                  grid-cols-1
                  items-center
                  gap-12
                  lg:grid-cols-2
                "
              >

                {/* IMAGE */}

                <div>

                  {storyImage ? (

                    <img
                      src={
                        storyImage
                      }

                      alt={
                        storyTitle ||
                        "About"
                      }

                      className="
                        h-[380px]
                        w-full
                        rounded-2xl
                        object-cover
                        shadow-sm
                      "
                    />

                  ) : (

                    <div
                      className="
                        flex
                        h-[380px]
                        items-center
                        justify-center
                        rounded-2xl
                      "
                      style={{
                        backgroundColor:
                          hexToRgba(
                            branding.buttonColor,
                            0.07
                          ),
                      }}
                    >

                      <BookOpen
                        size={72}
                        style={{
                          color:
                            branding.buttonColor,
                        }}
                      />

                    </div>

                  )}

                </div>


                {/* CONTENT */}

                <div>

                  {storySmallHeading && (

                    <p
                      className="
                        text-xs
                        uppercase
                        tracking-[0.15em]
                      "
                      style={
                        subheadingStyle
                      }
                    >
                      {storySmallHeading}
                    </p>

                  )}


                  {storyTitle && (

                    <h2
                      className="
                        mt-3
                        text-4xl
                        sm:text-5xl
                      "
                      style={
                        headingStyle
                      }
                    >
                      {storyTitle}
                    </h2>

                  )}


                  {storyDescription && (

                    <p
                      className="
                        mt-6
                        whitespace-pre-line
                        text-base
                      "
                      style={{
                        ...bodyStyle,
                        opacity: 0.72,
                      }}
                    >
                      {storyDescription}
                    </p>

                  )}

                </div>

              </div>

            </div>

          </section>

        )}


      {/* ===================================================
          WHY CHOOSE / FEATURES
      =================================================== */}

      {showAbout &&
        showWhy && (

          <section
            className="py-16"
            style={{
              backgroundColor:
                hexToRgba(
                  branding.buttonColor,
                  0.035
                ),
            }}
          >

            <div
              className="
                mx-auto
                max-w-7xl
                px-5
                sm:px-6
                lg:px-8
              "
            >

              <div
                className="text-center"
              >

                {whySmallHeading && (

                  <p
                    className="
                      text-xs
                      uppercase
                      tracking-[0.15em]
                    "
                    style={
                      subheadingStyle
                    }
                  >
                    {whySmallHeading}
                  </p>

                )}


                {whyTitle && (

                  <h2
                    className="
                      mt-3
                      text-3xl
                      sm:text-4xl
                    "
                    style={
                      headingStyle
                    }
                  >
                    {whyTitle}
                  </h2>

                )}


                {whyDescription && (

                  <p
                    className="
                      mx-auto
                      mt-4
                      max-w-2xl
                      text-sm
                    "
                    style={{
                      ...bodyStyle,
                      opacity: 0.70,
                    }}
                  >
                    {whyDescription}
                  </p>

                )}

              </div>


              {/* FEATURES */}

              {features.length > 0 && (

                <div
                  className="
                    mt-10
                    grid
                    grid-cols-1
                    gap-5
                    sm:grid-cols-2
                    lg:grid-cols-3
                  "
                >

                  {features
                    .filter(
                      (
                        feature
                      ) =>
                        isEnabled(
                          feature?.is_active ??
                          feature?.isActive ??
                          feature?.active,
                          true
                        )
                    )
                    .slice()
                    .sort(
                      (
                        a,
                        b
                      ) =>
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
                    )
                    .map(
                      (
                        feature,
                        index
                      ) => {

                        const icons = [

                          Award,

                          BookOpen,

                          Sparkles,

                          Heart,

                          Target,

                          Lightbulb,

                        ];


                        const Icon =
                          icons[
                            index %
                            icons.length
                          ];


                        const title =
                          getValue(

                            feature?.title,

                            feature?.feature_title,

                            feature?.featureTitle,

                            feature?.name,

                            ""

                          );


                        const description =
                          getValue(

                            feature?.description,

                            feature?.feature_description,

                            feature?.featureDescription,

                            ""

                          );


                        return (

                          <div
                            key={
                              feature?.id ||
                              index
                            }

                            className="
                              rounded-2xl
                              border
                              p-6
                              shadow-sm
                            "

                            style={{

                              backgroundColor:
                                branding.cardBackgroundColor,

                              borderColor:
                                hexToRgba(
                                  branding.textColor,
                                  0.10
                                ),

                            }}
                          >

                            <div
                              className="
                                flex
                                h-12
                                w-12
                                items-center
                                justify-center
                                rounded-full
                              "
                              style={{

                                color:
                                  branding.iconColor,

                                backgroundColor:
                                  hexToRgba(
                                    branding.iconColor,
                                    0.10
                                  ),

                              }}
                            >

                              <Icon
                                size={24}
                              />

                            </div>


                            {title && (

                              <h3
                                className="
                                  mt-5
                                  text-lg
                                "
                                style={
                                  subheadingStyle
                                }
                              >
                                {title}
                              </h3>

                            )}


                            {description && (

                              <p
                                className="
                                  mt-2
                                  text-sm
                                "
                                style={{
                                  ...bodyStyle,
                                  opacity: 0.65,
                                }}
                              >
                                {description}
                              </p>

                            )}

                          </div>

                        );

                      }
                    )}

                </div>

              )}

            </div>

          </section>

        )}


      {/* ===================================================
          GROWTH SECTION
      =================================================== */}

      {showAbout &&
        showGrowth && (

          <section
            className="py-16"
            style={{
              backgroundColor:
                branding.pageBackgroundColor,
            }}
          >

            <div
              className="
                mx-auto
                max-w-7xl
                px-5
                sm:px-6
                lg:px-8
              "
            >

              <div
                className="text-center"
              >

                {growthSmallHeading && (

                  <p
                    className="
                      text-xs
                      uppercase
                      tracking-[0.15em]
                    "
                    style={
                      subheadingStyle
                    }
                  >
                    {growthSmallHeading}
                  </p>

                )}


                {growthTitle && (

                  <h2
                    className="
                      mt-3
                      text-3xl
                      sm:text-4xl
                    "
                    style={
                      headingStyle
                    }
                  >
                    {growthTitle}
                  </h2>

                )}


                {growthDescription && (

                  <p
                    className="
                      mx-auto
                      mt-4
                      max-w-2xl
                      text-sm
                    "
                    style={{
                      ...bodyStyle,
                      opacity: 0.70,
                    }}
                  >
                    {growthDescription}
                  </p>

                )}

              </div>


              {/* GROWTH STEPS */}

              {growthSteps.length > 0 && (

                <div
                  className="
                    mt-12
                    grid
                    grid-cols-1
                    gap-6
                    md:grid-cols-2
                    lg:grid-cols-4
                  "
                >

                  {growthSteps
                    .slice()
                    .sort(
                      (
                        a,
                        b
                      ) =>
                        Number(
                          a?.step_number ??
                          a?.stepNumber ??
                          a?.number ??
                          0
                        ) -
                        Number(
                          b?.step_number ??
                          b?.stepNumber ??
                          b?.number ??
                          0
                        )
                    )
                    .map(
                      (
                        step,
                        index
                      ) => {

                        const stepNumber =
                          step?.step_number ??
                          step?.stepNumber ??
                          step?.number ??
                          index + 1;


                        const title =
                          getValue(

                            step?.title,

                            step?.step_title,

                            step?.stepTitle,

                            step?.name,

                            ""

                          );


                        const description =
                          getValue(

                            step?.description,

                            step?.step_description,

                            step?.stepDescription,

                            ""

                          );


                        return (

                          <div
                            key={
                              step?.id ||
                              index
                            }

                            className="
                              rounded-2xl
                              border
                              p-6
                            "

                            style={{

                              backgroundColor:
                                branding.cardBackgroundColor,

                              borderColor:
                                hexToRgba(
                                  branding.textColor,
                                  0.10
                                ),

                            }}
                          >

                            <div
                              className="
                                flex
                                h-12
                                w-12
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
                                stepNumber
                              ).padStart(
                                2,
                                "0"
                              )}

                            </div>


                            {title && (

                              <h3
                                className="
                                  mt-5
                                  text-lg
                                "
                                style={
                                  subheadingStyle
                                }
                              >
                                {title}
                              </h3>

                            )}


                            {description && (

                              <p
                                className="
                                  mt-2
                                  text-sm
                                "
                                style={{
                                  ...bodyStyle,
                                  opacity: 0.65,
                                }}
                              >
                                {description}
                              </p>

                            )}

                          </div>

                        );

                      }
                    )}

                </div>

              )}

            </div>

          </section>

        )}

    </main>

  );

};


export default WebsiteAbout;