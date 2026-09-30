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


    
// const API_URL =
//   import.meta.env.VITE_API_URL ||
//   "https://finearts-backend.onrender.com/api";

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
//               min-h-[430px]
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
  ArrowRight,
  CheckCircle2,
  Users,
  GraduationCap,
  Rocket,
  Star,
} from "lucide-react";

import {
  useOutletContext,
} from "react-router-dom";

/* =========================================================
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
  electric: "#00BFFF",

  white: "#F8FAFC",
  text: "#CBD5E1",
  muted: "#94A3B8",

  border: "rgba(0,140,255,0.24)",
  borderStrong: "rgba(56,215,255,0.42)",
};

/* =========================================================
   DEFAULT BRANDING
   COLORS ARE LOCKED TO BLACK + BLUE
========================================================= */

const DEFAULT_BRANDING = {
  headingColor: THEME.white,
  subheadingColor: THEME.cyan,
  textColor: THEME.text,
  iconColor: THEME.cyan,

  buttonColor: THEME.blue,
  buttonTextColor: "#FFFFFF",

  pageBackgroundColor: THEME.page,
  cardBackgroundColor: THEME.card,

  fontHeading: "Inter",
  fontSubheading: "Inter",
  fontBody: "Inter",

  headingWeight: 700,
  headingLineHeight: 1.15,
  headingLetterSpacing: "0px",

  subheadingWeight: 600,
  subheadingLineHeight: 1.4,

  bodyWeight: 400,
  bodyLineHeight: 1.7,
  bodyLetterSpacing: "0px",

  roundedButtons: true,
};

/* =========================================================
   HELPERS
========================================================= */

const getValue = (...values) => {
  return values.find(
    (value) =>
      value !== undefined &&
      value !== null &&
      String(value).trim() !== ""
  );
};

const getArray = (...values) => {
  return (
    values.find((value) =>
      Array.isArray(value)
    ) || []
  );
};

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

const fontFamily = (font) =>
  font
    ? `'${font}', sans-serif`
    : "Inter, sans-serif";

const hexToRgba = (
  color,
  alpha
) => {
  if (
    typeof color !== "string"
  ) {
    return `rgba(0,140,255,${alpha})`;
  }

  const hex = color.replace(
    "#",
    ""
  );

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
   SECTION FINDER
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
    sections.find((section) => {
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
            candidate === undefined ||
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
    }) || null
  );
};

/* =========================================================
   NORMALIZE BRANDING
========================================================= */

const normalizeBranding = (
  branding = {}
) => ({
  /*
    IMPORTANT:
    Dashboard colors are intentionally NOT used
    for page background/text so the About page
    always remains black + radiant blue.
  */

  headingColor:
    THEME.white,

  subheadingColor:
    THEME.cyan,

  textColor:
    THEME.text,

  iconColor:
    THEME.cyan,

  buttonColor:
    THEME.blue,

  buttonTextColor:
    "#FFFFFF",

  pageBackgroundColor:
    THEME.page,

  cardBackgroundColor:
    THEME.card,

  fontHeading:
    branding?.fontHeading ||
    branding?.font_heading ||
    DEFAULT_BRANDING.fontHeading,

  fontSubheading:
    branding?.fontSubheading ||
    branding?.font_subheading ||
    DEFAULT_BRANDING.fontSubheading,

  fontBody:
    branding?.fontBody ||
    branding?.font_body ||
    DEFAULT_BRANDING.fontBody,

  headingWeight:
    branding?.headingWeight ||
    branding?.heading_weight ||
    DEFAULT_BRANDING.headingWeight,

  headingLineHeight:
    branding?.headingLineHeight ||
    branding?.heading_line_height ||
    DEFAULT_BRANDING.headingLineHeight,

  headingLetterSpacing:
    branding?.headingLetterSpacing ||
    branding?.heading_letter_spacing ||
    DEFAULT_BRANDING.headingLetterSpacing,

  subheadingWeight:
    branding?.subheadingWeight ||
    branding?.subheading_weight ||
    DEFAULT_BRANDING.subheadingWeight,

  subheadingLineHeight:
    branding?.subheadingLineHeight ||
    branding?.subheading_line_height ||
    DEFAULT_BRANDING.subheadingLineHeight,

  bodyWeight:
    branding?.bodyWeight ||
    branding?.body_weight ||
    DEFAULT_BRANDING.bodyWeight,

  bodyLineHeight:
    branding?.bodyLineHeight ||
    branding?.body_line_height ||
    DEFAULT_BRANDING.bodyLineHeight,

  bodyLetterSpacing:
    branding?.bodyLetterSpacing ||
    branding?.body_letter_spacing ||
    DEFAULT_BRANDING.bodyLetterSpacing,

  roundedButtons:
    branding?.roundedButtons ??
    branding?.rounded_buttons ??
    true,
});

/* =========================================================
   BANNER HELPERS
========================================================= */

const isActiveBanner = (
  banner
) => {
  const active =
    banner?.is_active ??
    banner?.isActive ??
    banner?.active;

  return isEnabled(
    active,
    true
  );
};

const getBannerType = (
  banner
) =>
  String(
    banner?.banner_type ||
      banner?.bannerType ||
      banner?.page_type ||
      banner?.pageType ||
      banner?.page ||
      ""
  )
    .trim()
    .toLowerCase()
    .replace(
      /[\s-]+/g,
      "_"
    );

const getBannerImage = (
  banner
) =>
  getValue(
    banner?.image_url,
    banner?.imageUrl,
    banner?.image,
    banner?.banner_image_url,
    banner?.bannerImageUrl,
    banner?.banner_image,
    banner?.url
  );

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
     WEBSITE
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

  const branding = useMemo(
    () =>
      normalizeBranding(
        rawBranding
      ),
    [rawBranding]
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
     INITIAL SECTIONS
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

  const contextBanners =
    getArray(
      outletContext?.banners,
      outletContext?.websiteData?.banners,
      initialWebsite?.banners,
      initialWebsite?.websiteBanners,
      initialWebsite?.website_banners
    );

  const [
    banners,
    setBanners,
  ] = useState(
    contextBanners
  );

  /* =======================================================
     LOADING / ERROR
  ======================================================= */

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  /* =======================================================
     FETCH PUBLIC WEBSITE
  ======================================================= */

  useEffect(() => {
    let mounted = true;

    const fetchWebsite =
      async () => {
        if (!instituteId) {
          console.error(
            "ABOUT PAGE: Institute ID is missing"
          );

          if (mounted) {
            setError(
              "Institute ID is missing."
            );

            setLoading(false);
          }

          return;
        }

        try {
          setLoading(true);
          setError("");

          const API_URL =
            import.meta.env
              .VITE_API_URL ||
            "https://finearts-backend.onrender.com/api";

          const url =
            `${API_URL}/websites/public/${instituteId}?preview=true`;

          console.log(
            "ABOUT PAGE API URL:",
            url
          );

          const response =
            await fetch(url);

          const result =
            await response.json();

          console.log(
            "ABOUT PAGE API RESPONSE:",
            result
          );

          if (!response.ok) {
            throw new Error(
              result?.message ||
                "Failed to load About page"
            );
          }

          const publicWebsite =
            result?.data?.website ||
            result?.data?.data?.website ||
            result?.data?.websiteData ||
            result?.website ||
            result?.data ||
            {};

          /* ABOUT */

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

          /* BANNERS */

          const bannerData =
            publicWebsite?.banners ||
            publicWebsite?.websiteBanners ||
            publicWebsite?.website_banners ||
            result?.data?.banners ||
            result?.data?.websiteBanners ||
            result?.data?.website_banners ||
            result?.data?.data?.banners ||
            [];

          /* SECTIONS */

          const sectionData =
            publicWebsite?.sections ||
            publicWebsite?.websiteSections ||
            publicWebsite?.website_sections ||
            result?.data?.sections ||
            result?.data?.websiteSections ||
            result?.data?.website_sections ||
            result?.data?.data?.sections ||
            [];

          if (!mounted) {
            return;
          }

          setAbout(
            aboutData || {}
          );

          setBanners(
            Array.isArray(
              bannerData
            )
              ? bannerData
              : contextBanners
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
            "ABOUT BANNERS:",
            bannerData
          );

          console.log(
            "ABOUT SECTIONS:",
            sectionData
          );
        } catch (err) {
          console.error(
            "FETCH ABOUT PAGE ERROR:",
            err
          );

          if (mounted) {
            setError(
              err?.message ||
                "Failed to load About page"
            );
          }
        } finally {
          if (mounted) {
            setLoading(false);
          }
        }
      };

    fetchWebsite();

    return () => {
      mounted = false;
    };
  }, [instituteId]);

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
     ABOUT CONTENT
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
     STORY
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
     WHY CHOOSE
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
     GROWTH
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
     ABOUT BANNER
  ======================================================= */

  const aboutBanner =
    useMemo(() => {
      if (
        !Array.isArray(banners)
      ) {
        return null;
      }

      const active =
        banners
          .filter(
            isActiveBanner
          )
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

      /*
        1. ABOUT banner
      */

      const aboutSpecific =
        active.find((banner) => {
          const type =
            getBannerType(
              banner
            );

          return (
            (
              type === "about" ||
              type ===
                "about_page" ||
              type ===
                "about_banner"
            ) &&
            getBannerImage(
              banner
            )
          );
        });

      if (aboutSpecific) {
        return aboutSpecific;
      }

      /*
        2. HOME fallback
      */

      const home =
        active.find(
          (banner) =>
            getBannerType(
              banner
            ) === "home" &&
            getBannerImage(
              banner
            )
        );

      if (home) {
        return home;
      }

      /*
        3. First active banner
      */

      return (
        active.find(
          (banner) =>
            getBannerImage(
              banner
            )
        ) || null
      );
    }, [banners]);

  const aboutBannerImage =
    getBannerImage(
      aboutBanner
    );

  /* =======================================================
     STYLES
  ======================================================= */

  const headingStyle = {
    color: THEME.white,
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
    color: THEME.cyan,
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
    color: THEME.text,
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
          background:
            THEME.page,
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
                "0 0 30px rgba(0,140,255,0.30)",
            }}
          />

          <p
            className="mt-5 text-sm"
            style={{
              color:
                THEME.text,
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

  if (error) {
    return (
      <main
        className="
          flex
          min-h-screen
          items-center
          justify-center
          px-6
        "
        style={{
          background:
            THEME.page,
        }}
      >
        <div
          className="
            max-w-lg
            rounded-3xl
            border
            p-10
            text-center
          "
          style={{
            background:
              THEME.card,
            borderColor:
              THEME.border,
            boxShadow:
              "0 0 50px rgba(0,140,255,0.10)",
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
              border
            "
            style={{
              background:
                "rgba(0,140,255,0.10)",
              borderColor:
                THEME.borderStrong,
              color:
                THEME.cyan,
            }}
          >
            <BookOpen size={28} />
          </div>

          <h2
            className="
              mt-6
              text-2xl
              font-bold
            "
            style={headingStyle}
          >
            Unable to load About page
          </h2>

          <p
            className="
              mt-3
              text-sm
            "
            style={{
              color:
                THEME.muted,
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
        min-h-screen
        w-full
        overflow-hidden
      "
      style={{
        background: `
          radial-gradient(
            circle at 10% 0%,
            rgba(0,140,255,0.13),
            transparent 25%
          ),
          radial-gradient(
            circle at 90% 15%,
            rgba(56,215,255,0.08),
            transparent 25%
          ),
          linear-gradient(
            180deg,
            #02050A 0%,
            #030914 50%,
            #02050A 100%
          )
        `,
        fontFamily:
          fontFamily(
            branding.fontBody
          ),
      }}
    >
      {/* ===================================================
          HERO / ABOUT BANNER
      =================================================== */}

      {showAbout &&
        showBanner &&
        aboutBannerImage && (
          <section
            className="
              relative
              min-h-[430px]
              overflow-hidden
              border-b
            "
            style={{
              borderColor:
                "rgba(0,140,255,0.28)",
            }}
          >
            <img
              src={
                aboutBannerImage
              }
              alt={
                pageHeading ||
                "About Us"
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
                    rgba(2,5,10,0.88) 35%,
                    rgba(2,5,10,0.58) 68%,
                    rgba(2,5,10,0.35) 100%
                  )
                `,
              }}
            />

            {/* Blue glow */}

            <div
              className="
                absolute
                -right-32
                top-1/2
                h-[450px]
                w-[450px]
                -translate-y-1/2
                rounded-full
                blur-3xl
              "
              style={{
                background:
                  "rgba(0,140,255,0.14)",
              }}
            />

            {/* Content */}

            <div
              className="
                relative
                mx-auto
                flex
                min-h-[430px]
                max-w-7xl
                items-center
                px-5
                py-20
                sm:px-6
                lg:px-8
              "
            >
              <div
                className="
                  max-w-3xl
                "
              >
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
                      boxShadow:
                        "0 0 12px rgba(56,215,255,0.60)",
                    }}
                  />

                  <span
                    className="
                      text-xs
                      font-bold
                      uppercase
                      tracking-[0.3em]
                    "
                    style={{
                      color:
                        THEME.cyan,
                    }}
                  >
                    ABOUT US
                  </span>
                </div>

                <h1
                  className="
                    text-4xl
                    font-black
                    leading-tight
                    sm:text-5xl
                    lg:text-6xl
                  "
                  style={{
                    ...headingStyle,
                    textShadow:
                      "0 0 35px rgba(0,140,255,0.18)",
                  }}
                >
                  {pageHeading}
                </h1>

                {pageSubheading && (
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
                        "rgba(248,250,252,0.76)",
                    }}
                  >
                    {pageSubheading}
                  </p>
                )}

                <div
                  className="
                    mt-8
                    flex
                    flex-wrap
                    gap-3
                  "
                >
                  <span
                    className="
                      rounded-full
                      border
                      px-5
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
                        THEME.borderStrong,
                      boxShadow:
                        "0 0 20px rgba(0,140,255,0.10)",
                    }}
                  >
                    Creative Learning
                  </span>

                  <span
                    className="
                      rounded-full
                      border
                      px-5
                      py-2
                      text-xs
                      font-semibold
                    "
                    style={{
                      color:
                        THEME.white,
                      background:
                        "rgba(255,255,255,0.04)",
                      borderColor:
                        "rgba(255,255,255,0.14)",
                    }}
                  >
                    Student Growth
                  </span>
                </div>
              </div>
            </div>
          </section>
        )}

      {/* ===================================================
          FALLBACK HERO IF NO BANNER
      =================================================== */}

      {showAbout &&
        showBanner &&
        !aboutBannerImage && (
          <section
            className="
              relative
              overflow-hidden
              border-b
            "
            style={{
              borderColor:
                THEME.border,
              background: `
                radial-gradient(
                  circle at 80% 20%,
                  rgba(56,215,255,0.13),
                  transparent 28%
                ),
                linear-gradient(
                  135deg,
                  #071426,
                  #02050A
                )
              `,
            }}
          >
            <div
              className="
                absolute
                -right-32
                -top-32
                h-[500px]
                w-[500px]
                rounded-full
                blur-3xl
              "
              style={{
                background:
                  "rgba(0,140,255,0.12)",
              }}
            />

            <div
              className="
                relative
                mx-auto
                max-w-7xl
                px-5
                py-24
                sm:px-6
                lg:px-8
              "
            >
              <div className="max-w-3xl">
                <p
                  className="
                    text-xs
                    font-bold
                    uppercase
                    tracking-[0.3em]
                  "
                  style={{
                    color:
                      THEME.cyan,
                  }}
                >
                  ABOUT US
                </p>

                <h1
                  className="
                    mt-5
                    text-4xl
                    font-black
                    sm:text-5xl
                    lg:text-6xl
                  "
                  style={
                    headingStyle
                  }
                >
                  {pageHeading}
                </h1>

                {pageSubheading && (
                  <p
                    className="
                      mt-6
                      text-base
                      leading-7
                      sm:text-lg
                    "
                    style={{
                      color:
                        THEME.text,
                    }}
                  >
                    {pageSubheading}
                  </p>
                )}
              </div>
            </div>
          </section>
        )}

      {/* ===================================================
          STORY SECTION
      =================================================== */}

      {showAbout &&
        showStory && (
          <section
            className="
              relative
              py-20
              sm:py-24
            "
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

                <div className="relative">
                  <div
                    className="
                      absolute
                      -inset-4
                      rounded-[30px]
                      blur-2xl
                    "
                    style={{
                      background:
                        "rgba(0,140,255,0.08)",
                    }}
                  />

                  <div
                    className="
                      relative
                      overflow-hidden
                      rounded-3xl
                      border
                    "
                    style={{
                      borderColor:
                        THEME.border,
                      boxShadow: `
                        0 25px 70px rgba(0,0,0,0.50),
                        0 0 35px rgba(0,140,255,0.08)
                      `,
                    }}
                  >
                    {storyImage ? (
                      <img
                        src={
                          storyImage
                        }
                        alt={
                          storyTitle ||
                          "Our Story"
                        }
                        className="
                          h-[380px]
                          w-full
                          object-cover
                          sm:h-[460px]
                        "
                      />
                    ) : (
                      <div
                        className="
                          flex
                          h-[380px]
                          items-center
                          justify-center
                          sm:h-[460px]
                        "
                        style={{
                          background: `
                            radial-gradient(
                              circle,
                              rgba(0,140,255,0.24),
                              #071426
                            )
                          `,
                        }}
                      >
                        <BookOpen
                          size={82}
                          style={{
                            color:
                              THEME.cyan,
                            filter:
                              "drop-shadow(0 0 20px rgba(56,215,255,0.45))",
                          }}
                        />
                      </div>
                    )}

                    <div
                      className="
                        absolute
                        inset-x-0
                        bottom-0
                        h-32
                      "
                      style={{
                        background:
                          "linear-gradient(to top,rgba(2,5,10,0.85),transparent)",
                      }}
                    />
                  </div>
                </div>

                {/* CONTENT */}

                <div>
                  {storySmallHeading && (
                    <p
                      className="
                        text-xs
                        font-bold
                        uppercase
                        tracking-[0.25em]
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
                        mt-4
                        text-3xl
                        font-bold
                        sm:text-4xl
                        lg:text-5xl
                      "
                      style={
                        headingStyle
                      }
                    >
                      {storyTitle}
                    </h2>
                  )}

                  <div
                    className="
                      mt-5
                      h-1
                      w-20
                      rounded-full
                    "
                    style={{
                      background:
                        "linear-gradient(90deg,#008CFF,#38D7FF)",
                      boxShadow:
                        "0 0 18px rgba(0,140,255,0.45)",
                    }}
                  />

                  {storyDescription && (
                    <p
                      className="
                        mt-7
                        whitespace-pre-line
                        text-base
                      "
                      style={
                        bodyStyle
                      }
                    >
                      {storyDescription}
                    </p>
                  )}

                  <div
                    className="
                      mt-8
                      grid
                      grid-cols-2
                      gap-4
                    "
                  >
                    <MiniStat
                      icon={
                        <GraduationCap
                          size={20}
                        />
                      }
                      title="Learn"
                      text="Creative skills"
                    />

                    <MiniStat
                      icon={
                        <Rocket
                          size={20}
                        />
                      }
                      title="Grow"
                      text="Build your future"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

      {/* ===================================================
          WHY CHOOSE US
      =================================================== */}

      {showAbout &&
        showWhy && (
          <section
            className="
              relative
              border-y
              py-20
              sm:py-24
            "
            style={{
              background: `
                radial-gradient(
                  circle at 50% 0%,
                  rgba(0,140,255,0.08),
                  transparent 35%
                ),
                #030914
              `,
              borderColor:
                "rgba(0,140,255,0.14)",
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
              <SectionHeading
                small={whySmallHeading}
                title={whyTitle}
                description={
                  whyDescription
                }
              />

              {features.length >
                0 && (
                <div
                  className="
                    mt-12
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
                          <FeatureCard
                            key={
                              feature?.id ||
                              index
                            }
                            Icon={
                              Icon
                            }
                            title={
                              title
                            }
                            description={
                              description
                            }
                          />
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
            className="
              relative
              py-20
              sm:py-24
            "
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
              <SectionHeading
                small={
                  growthSmallHeading
                }
                title={
                  growthTitle
                }
                description={
                  growthDescription
                }
              />

              {growthSteps.length >
                0 && (
                <div
                  className="
                    mt-12
                    grid
                    grid-cols-1
                    gap-5
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
                          <GrowthCard
                            key={
                              step?.id ||
                              index
                            }
                            number={
                              stepNumber
                            }
                            title={
                              title
                            }
                            description={
                              description
                            }
                          />
                        );
                      }
                    )}
                </div>
              )}
            </div>
          </section>
        )}

      {/* ===================================================
          BOTTOM RADIANT LINE
      =================================================== */}

      <div
        className="
          h-px
          w-full
        "
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
            "0 0 22px rgba(0,140,255,0.70)",
        }}
      />
    </main>
  );
};

/* =========================================================
   SECTION HEADING
========================================================= */

const SectionHeading = ({
  small,
  title,
  description,
}) => {
  return (
    <div className="text-center">
      {small && (
        <div
          className="
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
              tracking-[0.25em]
            "
            style={{
              color:
                THEME.cyan,
            }}
          >
            {small}
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
      )}

      {title && (
        <h2
          className="
            mt-4
            text-3xl
            font-bold
            sm:text-4xl
          "
          style={{
            color:
              THEME.white,
          }}
        >
          {title}
        </h2>
      )}

      {description && (
        <p
          className="
            mx-auto
            mt-4
            max-w-2xl
            text-sm
            leading-7
            sm:text-base
          "
          style={{
            color:
              THEME.muted,
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
};

/* =========================================================
   FEATURE CARD
========================================================= */

const FeatureCard = ({
  Icon,
  title,
  description,
}) => {
  return (
    <div
      className="
        group
        rounded-3xl
        border
        p-6
        transition-all
        duration-300
        hover:-translate-y-2
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
          "0 15px 45px rgba(0,0,0,0.35)",
      }}
    >
      <div
        className="
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
          border
          transition-all
          duration-300
          group-hover:scale-105
        "
        style={{
          color:
            THEME.cyan,
          background:
            "rgba(0,140,255,0.10)",
          borderColor:
            "rgba(56,215,255,0.30)",
          boxShadow:
            "0 0 25px rgba(0,140,255,0.08)",
        }}
      >
        <Icon size={25} />
      </div>

      {title && (
        <h3
          className="
            mt-6
            text-lg
            font-bold
          "
          style={{
            color:
              THEME.white,
          }}
        >
          {title}
        </h3>
      )}

      {description && (
        <p
          className="
            mt-3
            text-sm
            leading-7
          "
          style={{
            color:
              THEME.muted,
          }}
        >
          {description}
        </p>
      )}

      <div
        className="
          mt-6
          h-px
          w-12
          transition-all
          duration-300
          group-hover:w-full
        "
        style={{
          background:
            "linear-gradient(90deg,#008CFF,#38D7FF)",
        }}
      />
    </div>
  );
};

/* =========================================================
   GROWTH CARD
========================================================= */

const GrowthCard = ({
  number,
  title,
  description,
}) => {
  return (
    <div
      className="
        group
        rounded-3xl
        border
        p-6
        transition-all
        duration-300
        hover:-translate-y-2
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
          "0 15px 45px rgba(0,0,0,0.35)",
      }}
    >
      <div
        className="
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
          text-sm
          font-black
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
        {String(
          number
        ).padStart(2, "0")}
      </div>

      {title && (
        <h3
          className="
            mt-6
            text-lg
            font-bold
          "
          style={{
            color:
              THEME.white,
          }}
        >
          {title}
        </h3>
      )}

      {description && (
        <p
          className="
            mt-3
            text-sm
            leading-7
          "
          style={{
            color:
              THEME.muted,
          }}
        >
          {description}
        </p>
      )}

      <div
        className="
          mt-6
          flex
          items-center
          gap-2
          text-xs
          font-semibold
        "
        style={{
          color:
            THEME.cyan,
        }}
      >
        <CheckCircle2
          size={15}
        />

        Growth Journey
      </div>
    </div>
  );
};

/* =========================================================
   MINI STAT
========================================================= */

const MiniStat = ({
  icon,
  title,
  text,
}) => {
  return (
    <div
      className="
        rounded-2xl
        border
        p-4
      "
      style={{
        background:
          "rgba(0,140,255,0.05)",
        borderColor:
          "rgba(0,140,255,0.18)",
      }}
    >
      <div
        className="
          flex
          items-center
          gap-3
        "
      >
        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
          "
          style={{
            background:
              "rgba(0,140,255,0.12)",
            color:
              THEME.cyan,
          }}
        >
          {icon}
        </div>

        <div>
          <p
            className="
              text-sm
              font-bold
            "
            style={{
              color:
                THEME.white,
            }}
          >
            {title}
          </p>

          <p
            className="
              mt-0.5
              text-xs
            "
            style={{
              color:
                THEME.muted,
            }}
          >
            {text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WebsiteAbout;