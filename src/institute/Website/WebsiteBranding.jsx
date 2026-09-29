// // src/pages/institute/Website/WebsiteBranding.jsx

// import {
//   useEffect,
//   useState,
// } from "react";

// import {
//   useNavigate,
// } from "react-router-dom";

// import {
//   ArrowLeft,
//   Check,
//   Loader2,
//   Palette,
//   Save,
// } from "lucide-react";

// import toast from "react-hot-toast";

// import {
//   getWebsiteData,
//   updateBranding,
// } from "../../services/websiteService";


// /* =========================================================
//    DEFAULT BRANDING
// ========================================================= */

// const DEFAULT_BRANDING = {

//   /* -------------------------------------------------------
//      MAIN WEBSITE COLORS
//   ------------------------------------------------------- */

//   navbarColor: "#1F2937",

//   headingColor: "#111827",

//   subheadingColor: "#5B21B6",

//   textColor: "#111827",

//   iconColor: "#F59E0B",

//   buttonColor: "#7C3AED",

//   buttonTextColor: "#FFFFFF",


//   /* -------------------------------------------------------
//      PAGE COLORS
//   ------------------------------------------------------- */

//   pageBackgroundColor: "#FAFAF9",

//   cardBackgroundColor: "#FFFFFF",


//   /* -------------------------------------------------------
//      FOOTER COLORS
//   ------------------------------------------------------- */

//   footerBackgroundColor: "#1F2937",

//   footerHeadingColor: "#FFFFFF",

//   footerTextColor: "#FAFAF9",


//   /* -------------------------------------------------------
//      TYPOGRAPHY
//   ------------------------------------------------------- */

//   fontHeading: "Inter",

//   headingWeight: 700,

//   headingLineHeight: 1.2,

//   headingLetterSpacing: "-0.02em",


//   fontSubheading: "Inter",

//   subheadingWeight: 600,

//   subheadingLineHeight: 1.4,


//   fontBody: "Inter",

//   bodyWeight: 400,

//   bodyLineHeight: 1.6,

//   bodyLetterSpacing: "0",


//   /* -------------------------------------------------------
//      ADVANCED
//   ------------------------------------------------------- */

//   customCSS: "",


//   /* -------------------------------------------------------
//      OPTIONS
//   ------------------------------------------------------- */

//   darkFooter: true,

//   roundedButtons: true,
// };


// /* =========================================================
//    FONT OPTIONS
// ========================================================= */

// const FONT_OPTIONS = [
//   "Inter",
//   "Poppins",
//   "Roboto",
//   "Open Sans",
//   "Montserrat",
//   "Lato",
//   "Nunito",
//   "Raleway",
//   "Playfair Display",
//   "Merriweather",
// ];


// /* =========================================================
//    FONT WEIGHTS
// ========================================================= */

// const FONT_WEIGHT_OPTIONS = [
//   {
//     value: 300,
//     label: "Light (300)",
//   },
//   {
//     value: 400,
//     label: "Regular (400)",
//   },
//   {
//     value: 500,
//     label: "Medium (500)",
//   },
//   {
//     value: 600,
//     label: "Semi Bold (600)",
//   },
//   {
//     value: 700,
//     label: "Bold (700)",
//   },
//   {
//     value: 800,
//     label: "Extra Bold (800)",
//   },
// ];


// /* =========================================================
//    LINE HEIGHT
// ========================================================= */

// const LINE_HEIGHT_OPTIONS = [
//   {
//     value: 1.1,
//     label: "Tight (1.1)",
//   },
//   {
//     value: 1.2,
//     label: "Compact (1.2)",
//   },
//   {
//     value: 1.4,
//     label: "Normal (1.4)",
//   },
//   {
//     value: 1.5,
//     label: "Relaxed (1.5)",
//   },
//   {
//     value: 1.6,
//     label: "Comfortable (1.6)",
//   },
//   {
//     value: 1.8,
//     label: "Loose (1.8)",
//   },
// ];


// /* =========================================================
//    NORMALIZE BOOLEAN
// ========================================================= */

// const normalizeBoolean = (
//   value,
//   fallback
// ) => {

//   if (
//     value === true ||
//     value === 1 ||
//     value === "1" ||
//     value === "true"
//   ) {
//     return true;
//   }

//   if (
//     value === false ||
//     value === 0 ||
//     value === "0" ||
//     value === "false"
//   ) {
//     return false;
//   }

//   return fallback;
// };


// /* =========================================================
//    NORMALIZE BRANDING
// ========================================================= */

// const normalizeBranding = (
//   branding
// ) => {

//   const source =
//     branding || {};

//   return {

//     ...DEFAULT_BRANDING,


//     /* -----------------------------------------------------
//        COLORS
//     ----------------------------------------------------- */

//     navbarColor:
//       source.navbarColor ??
//       source.navbar_color ??
//       DEFAULT_BRANDING.navbarColor,


//     headingColor:
//       source.headingColor ??
//       source.heading_color ??
//       DEFAULT_BRANDING.headingColor,


//     subheadingColor:
//       source.subheadingColor ??
//       source.subheading_color ??
//       DEFAULT_BRANDING.subheadingColor,


//     textColor:
//       source.textColor ??
//       source.text_color ??
//       DEFAULT_BRANDING.textColor,


//     iconColor:
//       source.iconColor ??
//       source.icon_color ??
//       DEFAULT_BRANDING.iconColor,


//     buttonColor:
//       source.buttonColor ??
//       source.button_color ??
//       DEFAULT_BRANDING.buttonColor,


//     buttonTextColor:
//       source.buttonTextColor ??
//       source.button_text_color ??
//       DEFAULT_BRANDING.buttonTextColor,


//     pageBackgroundColor:
//       source.pageBackgroundColor ??
//       source.page_background_color ??
//       DEFAULT_BRANDING.pageBackgroundColor,


//     cardBackgroundColor:
//       source.cardBackgroundColor ??
//       source.card_background_color ??
//       DEFAULT_BRANDING.cardBackgroundColor,


//     /* -----------------------------------------------------
//        FOOTER
//     ----------------------------------------------------- */

//     footerBackgroundColor:
//       source.footerBackgroundColor ??
//       source.footer_background_color ??
//       DEFAULT_BRANDING.footerBackgroundColor,


//     footerHeadingColor:
//       source.footerHeadingColor ??
//       source.footer_heading_color ??
//       DEFAULT_BRANDING.footerHeadingColor,


//     footerTextColor:
//       source.footerTextColor ??
//       source.footer_text_color ??
//       DEFAULT_BRANDING.footerTextColor,


//     /* -----------------------------------------------------
//        HEADING FONT
//     ----------------------------------------------------- */

//     fontHeading:
//       source.fontHeading ??
//       source.font_heading ??
//       DEFAULT_BRANDING.fontHeading,


//     headingWeight:
//       Number(
//         source.headingWeight ??
//         source.heading_weight ??
//         DEFAULT_BRANDING.headingWeight
//       ),


//     headingLineHeight:
//       Number(
//         source.headingLineHeight ??
//         source.heading_line_height ??
//         DEFAULT_BRANDING.headingLineHeight
//       ),


//     headingLetterSpacing:
//       source.headingLetterSpacing ??
//       source.heading_letter_spacing ??
//       DEFAULT_BRANDING.headingLetterSpacing,


//     /* -----------------------------------------------------
//        SUBHEADING FONT
//     ----------------------------------------------------- */

//     fontSubheading:
//       source.fontSubheading ??
//       source.font_subheading ??
//       DEFAULT_BRANDING.fontSubheading,


//     subheadingWeight:
//       Number(
//         source.subheadingWeight ??
//         source.subheading_weight ??
//         DEFAULT_BRANDING.subheadingWeight
//       ),


//     subheadingLineHeight:
//       Number(
//         source.subheadingLineHeight ??
//         source.subheading_line_height ??
//         DEFAULT_BRANDING.subheadingLineHeight
//       ),


//     /* -----------------------------------------------------
//        BODY FONT
//     ----------------------------------------------------- */

//     fontBody:
//       source.fontBody ??
//       source.font_body ??
//       DEFAULT_BRANDING.fontBody,


//     bodyWeight:
//       Number(
//         source.bodyWeight ??
//         source.body_weight ??
//         DEFAULT_BRANDING.bodyWeight
//       ),


//     bodyLineHeight:
//       Number(
//         source.bodyLineHeight ??
//         source.body_line_height ??
//         DEFAULT_BRANDING.bodyLineHeight
//       ),


//     bodyLetterSpacing:
//       source.bodyLetterSpacing ??
//       source.body_letter_spacing ??
//       DEFAULT_BRANDING.bodyLetterSpacing,


//     /* -----------------------------------------------------
//        CUSTOM CSS
//     ----------------------------------------------------- */

//     customCSS:
//       source.customCSS ??
//       source.custom_css ??
//       DEFAULT_BRANDING.customCSS,


//     /* -----------------------------------------------------
//        OPTIONS
//     ----------------------------------------------------- */

//     darkFooter:
//       normalizeBoolean(
//         source.darkFooter ??
//         source.dark_footer,
//         DEFAULT_BRANDING.darkFooter
//       ),


//     roundedButtons:
//       normalizeBoolean(
//         source.roundedButtons ??
//         source.rounded_buttons,
//         DEFAULT_BRANDING.roundedButtons
//       ),

//   };
// };


// /* =========================================================
//    CREATE API PAYLOAD
// ========================================================= */

// const createBrandingPayload = (
//   branding
// ) => {

//   return {

//     navbarColor:
//       branding.navbarColor,

//     headingColor:
//       branding.headingColor,

//     subheadingColor:
//       branding.subheadingColor,

//     textColor:
//       branding.textColor,

//     iconColor:
//       branding.iconColor,

//     buttonColor:
//       branding.buttonColor,

//     buttonTextColor:
//       branding.buttonTextColor,


//     pageBackgroundColor:
//       branding.pageBackgroundColor,

//     cardBackgroundColor:
//       branding.cardBackgroundColor,


//     footerBackgroundColor:
//       branding.footerBackgroundColor,

//     footerHeadingColor:
//       branding.footerHeadingColor,

//     footerTextColor:
//       branding.footerTextColor,


//     fontHeading:
//       branding.fontHeading,

//     headingWeight:
//       branding.headingWeight,

//     headingLineHeight:
//       branding.headingLineHeight,

//     headingLetterSpacing:
//       branding.headingLetterSpacing,


//     fontSubheading:
//       branding.fontSubheading,

//     subheadingWeight:
//       branding.subheadingWeight,

//     subheadingLineHeight:
//       branding.subheadingLineHeight,


//     fontBody:
//       branding.fontBody,

//     bodyWeight:
//       branding.bodyWeight,

//     bodyLineHeight:
//       branding.bodyLineHeight,

//     bodyLetterSpacing:
//       branding.bodyLetterSpacing,


//     customCSS:
//       branding.customCSS,

//     darkFooter:
//       branding.darkFooter,

//     roundedButtons:
//       branding.roundedButtons,

//   };
// };


// /* =========================================================
//    COLOR INPUT
// ========================================================= */

// function ColorInput({
//   label,
//   description,
//   value,
//   onChange,
// }) {

//   return (
//     <div className="space-y-3">

//       <div>

//         <label className="text-sm font-medium text-gray-300">
//           {label}
//         </label>

//         {description && (
//           <p className="text-xs text-gray-600 mt-1">
//             {description}
//           </p>
//         )}

//       </div>


//       <div className="flex items-center gap-3">

//         <input
//           type="color"
//           value={value || "#000000"}
//           onChange={(event) =>
//             onChange(
//               event.target.value
//             )
//           }
//           className="w-12 h-12 rounded-xl border border-[#34313f] bg-[#111116] p-1 cursor-pointer"
//         />


//         <input
//           type="text"
//           value={value || ""}
//           onChange={(event) =>
//             onChange(
//               event.target.value
//             )
//           }
//           placeholder="#000000"
//           className="flex-1 min-w-0 rounded-xl bg-[#111116] border border-[#34313f] px-4 py-3 text-white uppercase placeholder:text-gray-600 outline-none focus:border-purple-500"
//         />

//       </div>

//     </div>
//   );
// }


// /* =========================================================
//    TOGGLE
// ========================================================= */

// function Toggle({
//   label,
//   description,
//   checked,
//   onChange,
// }) {

//   return (

//     <button
//       type="button"
//       onClick={() =>
//         onChange(!checked)
//       }
//       className="w-full flex items-center justify-between gap-4 text-left"
//     >

//       <div>

//         <p className="text-sm font-medium text-gray-300">
//           {label}
//         </p>

//         {description && (
//           <p className="text-xs text-gray-600 mt-1">
//             {description}
//           </p>
//         )}

//       </div>


//       <div
//         className={`relative flex-shrink-0 w-12 h-6 rounded-full transition ${
//           checked
//             ? "bg-purple-500"
//             : "bg-[#34313f]"
//         }`}
//       >

//         <div
//           className={`absolute top-1 w-4 h-4 rounded-full bg-white transition ${
//             checked
//               ? "left-7"
//               : "left-1"
//           }`}
//         />

//       </div>

//     </button>
//   );
// }


// /* =========================================================
//    SECTION HEADER
// ========================================================= */

// function SectionHeader({
//   title,
//   description,
// }) {

//   return (

//     <div className="mb-6">

//       <h2 className="text-lg font-semibold text-white">
//         {title}
//       </h2>

//       {description && (
//         <p className="text-sm text-gray-500 mt-1">
//           {description}
//         </p>
//       )}

//     </div>
//   );
// }


// /* =========================================================
//    MAIN COMPONENT
// ========================================================= */

// export default function WebsiteBranding() {

//   const navigate =
//     useNavigate();


//   const [
//     branding,
//     setBranding,
//   ] = useState({
//     ...DEFAULT_BRANDING,
//   });


//   const [
//     loading,
//     setLoading,
//   ] = useState(true);


//   const [
//     saving,
//     setSaving,
//   ] = useState(false);


//   const [
//     hasChanges,
//     setHasChanges,
//   ] = useState(false);


//   /* =======================================================
//      LOAD BRANDING
//   ======================================================= */

//   useEffect(() => {

//     loadBranding();

//   }, []);


//   const loadBranding =
//     async () => {

//       try {

//         setLoading(true);


//         const data =
//           await getWebsiteData();


//         console.log(
//           "WEBSITE BRANDING DATA:",
//           data
//         );


//         const existingBranding =
//           data?.branding ||
//           data?.website?.branding ||
//           {};


//         const normalized =
//           normalizeBranding(
//             existingBranding
//           );


//         console.log(
//           "NORMALIZED BRANDING:",
//           normalized
//         );


//         setBranding(
//           normalized
//         );


//         setHasChanges(
//           false
//         );

//       } catch (error) {

//         console.error(
//           "Failed to load branding:",
//           error
//         );


//         toast.error(
//           error?.response?.data?.message ||
//           error?.message ||
//           "Failed to load website branding"
//         );

//       } finally {

//         setLoading(false);

//       }

//     };


//   /* =======================================================
//      UPDATE FIELD
//   ======================================================= */

//   const updateField =
//     (
//       field,
//       value
//     ) => {

//       setBranding(
//         (previous) => ({
//           ...previous,
//           [field]: value,
//         })
//       );


//       setHasChanges(
//         true
//       );

//     };


//   /* =======================================================
//      SAVE
//   ======================================================= */

//   const handleSave =
//     async () => {

//       if (saving) {
//         return;
//       }


//       try {

//         setSaving(true);


//         const payload =
//           createBrandingPayload(
//             branding
//           );


//         console.log(
//           "SAVING BRANDING:",
//           payload
//         );


//         const response =
//           await updateBranding(
//             payload
//           );


//         console.log(
//           "BRANDING SAVE RESPONSE:",
//           response
//         );


//         let savedBranding =
//           response;


//         if (
//           savedBranding?.data &&
//           typeof savedBranding.data ===
//             "object" &&
//           !Array.isArray(
//             savedBranding.data
//           )
//         ) {

//           savedBranding =
//             savedBranding.data;

//         }


//         if (
//           savedBranding?.branding
//         ) {

//           savedBranding =
//             savedBranding.branding;

//         }


//         /*
//          * If backend does not return branding,
//          * keep the current frontend state.
//          */

//         if (
//           savedBranding &&
//           typeof savedBranding ===
//             "object" &&
//           !Array.isArray(
//             savedBranding
//           )
//         ) {

//           setBranding(
//             normalizeBranding(
//               savedBranding
//             )
//           );

//         }


//         setHasChanges(
//           false
//         );


//         toast.success(
//           "Website branding saved successfully"
//         );


//         /* ---------------------------------------------------
//            VERIFY FROM DATABASE
//         --------------------------------------------------- */

//         try {

//           const freshData =
//             await getWebsiteData();


//           const freshBranding =
//             freshData?.branding ||
//             freshData?.website?.branding ||
//             {};


//           const normalizedFresh =
//             normalizeBranding(
//               freshBranding
//             );


//           console.log(
//             "BRANDING AFTER DATABASE RELOAD:",
//             normalizedFresh
//           );


//           setBranding(
//             normalizedFresh
//           );


//           setHasChanges(
//             false
//           );

//         } catch (reloadError) {

//           console.warn(
//             "Branding saved but reload verification failed:",
//             reloadError
//           );

//         }

//       } catch (error) {

//         console.error(
//           "Save branding error:",
//           error
//         );


//         toast.error(
//           error?.response?.data?.message ||
//           error?.message ||
//           "Failed to save branding"
//         );

//       } finally {

//         setSaving(false);

//       }

//     };


//   /* =======================================================
//      RESET
//   ======================================================= */

//   const handleReset =
//     () => {

//       setBranding({
//         ...DEFAULT_BRANDING,
//       });


//       setHasChanges(
//         true
//       );


//       toast.success(
//         "Default branding restored. Click Save Changes to apply it."
//       );

//     };


//   /* =======================================================
//      LOADING
//   ======================================================= */

//   if (loading) {

//     return (

//       <div className="min-h-[400px] flex items-center justify-center">

//         <div className="flex items-center gap-3 text-gray-400">

//           <Loader2
//             size={22}
//             className="animate-spin"
//           />

//           <span>
//             Loading branding...
//           </span>

//         </div>

//       </div>

//     );

//   }


//   /* =======================================================
//      PAGE
//   ======================================================= */

//   return (

//     <div className="space-y-6">

//       {/* =====================================================
//           HEADER
//       ===================================================== */}

//       <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

//         <div className="flex items-center gap-4">

//           <button
//             type="button"
//             onClick={() =>
//               navigate(
//                 "/institute/website"
//               )
//             }
//             className="p-2 rounded-xl text-gray-400 hover:bg-[#2a2a35] hover:text-white transition"
//           >
//             <ArrowLeft
//               size={22}
//             />
//           </button>


//           <div>

//             <div className="flex items-center gap-2">

//               <Palette
//                 size={22}
//                 className="text-purple-400"
//               />

//               <h1 className="text-2xl font-bold text-white">
//                 Website Branding
//               </h1>

//             </div>


//             <p className="text-sm text-gray-400 mt-1">
//               Customize colors, typography, buttons, footer and advanced CSS for your website.
//             </p>

//           </div>

//         </div>


//         <div className="flex items-center gap-3">

//           <button
//             type="button"
//             onClick={handleReset}
//             disabled={saving}
//             className="px-4 py-2.5 rounded-xl border border-[#34313f] text-gray-300 hover:bg-[#24212f] transition disabled:opacity-50"
//           >
//             Reset Defaults
//           </button>


//           <button
//             type="button"
//             onClick={handleSave}
//             disabled={
//               saving ||
//               !hasChanges
//             }
//             className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//           >

//             {saving ? (

//               <>
//                 <Loader2
//                   size={18}
//                   className="animate-spin"
//                 />

//                 Saving...
//               </>

//             ) : (

//               <>
//                 <Save
//                   size={18}
//                 />

//                 Save Changes
//               </>

//             )}

//           </button>

//         </div>

//       </div>


//       {/* =====================================================
//           COLOR PALETTE REFERENCE
//       ===================================================== */}

//       <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-6">

//         <SectionHeader
//           title="Fine Arts Color Palette"
//           description="These are the default colors used when an institute has not selected its own branding colors."
//         />


//         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">

//           {[
//             [
//               "Primary",
//               "#7C3AED",
//             ],
//             [
//               "Primary Dark",
//               "#5B21B6",
//             ],
//             [
//               "Charcoal",
//               "#1F2937",
//             ],
//             [
//               "Gold",
//               "#F59E0B",
//             ],
//             [
//               "Background",
//               "#FAFAF9",
//             ],
//             [
//               "Text",
//               "#111827",
//             ],
//             [
//               "Cards",
//               "#FFFFFF",
//             ],
//           ].map(
//             ([label, color]) => (

//               <div
//                 key={label}
//                 className="rounded-xl border border-[#34313f] overflow-hidden"
//               >

//                 <div
//                   className="h-14"
//                   style={{
//                     backgroundColor:
//                       color,
//                   }}
//                 />

//                 <div className="p-2 bg-[#111116]">

//                   <p className="text-xs text-white font-medium">
//                     {label}
//                   </p>

//                   <p className="text-[10px] text-gray-500 mt-1">
//                     {color}
//                   </p>

//                 </div>

//               </div>

//             )
//           )}

//         </div>

//       </div>


//       {/* =====================================================
//           MAIN GRID
//       ===================================================== */}

//       <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

//         <div className="xl:col-span-2 space-y-6">


//           {/* =================================================
//               WEBSITE COLORS
//           ================================================= */}

//           <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-6">

//             <SectionHeader
//               title="Website Element Colors"
//               description="Control the colors of your public institute website."
//             />


//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//               <ColorInput
//                 label="Navbar Color"
//                 description="Header and navigation background"
//                 value={
//                   branding.navbarColor
//                 }
//                 onChange={(value) =>
//                   updateField(
//                     "navbarColor",
//                     value
//                   )
//                 }
//               />


//               <ColorInput
//                 label="Heading Color"
//                 description="H1, H2, H3 and major headings"
//                 value={
//                   branding.headingColor
//                 }
//                 onChange={(value) =>
//                   updateField(
//                     "headingColor",
//                     value
//                   )
//                 }
//               />


//               <ColorInput
//                 label="Subheading Color"
//                 description="Section subtitles and supporting headings"
//                 value={
//                   branding.subheadingColor
//                 }
//                 onChange={(value) =>
//                   updateField(
//                     "subheadingColor",
//                     value
//                   )
//                 }
//               />


//               <ColorInput
//                 label="Text Color"
//                 description="Paragraphs and normal website text"
//                 value={
//                   branding.textColor
//                 }
//                 onChange={(value) =>
//                   updateField(
//                     "textColor",
//                     value
//                   )
//                 }
//               />


//               <ColorInput
//                 label="Icon Color"
//                 description="Icons and small artistic accents"
//                 value={
//                   branding.iconColor
//                 }
//                 onChange={(value) =>
//                   updateField(
//                     "iconColor",
//                     value
//                   )
//                 }
//               />


//               <ColorInput
//                 label="Button Color"
//                 description="Primary call-to-action buttons"
//                 value={
//                   branding.buttonColor
//                 }
//                 onChange={(value) =>
//                   updateField(
//                     "buttonColor",
//                     value
//                   )
//                 }
//               />


//               <ColorInput
//                 label="Button Text Color"
//                 description="Text inside buttons"
//                 value={
//                   branding.buttonTextColor
//                 }
//                 onChange={(value) =>
//                   updateField(
//                     "buttonTextColor",
//                     value
//                   )
//                 }
//               />


//               <ColorInput
//                 label="Page Background"
//                 description="Main public website background"
//                 value={
//                   branding.pageBackgroundColor
//                 }
//                 onChange={(value) =>
//                   updateField(
//                     "pageBackgroundColor",
//                     value
//                   )
//                 }
//               />


//               <ColorInput
//                 label="Card Background"
//                 description="Cards, panels and content blocks"
//                 value={
//                   branding.cardBackgroundColor
//                 }
//                 onChange={(value) =>
//                   updateField(
//                     "cardBackgroundColor",
//                     value
//                   )
//                 }
//               />

//             </div>

//           </div>


//           {/* =================================================
//               FOOTER
//           ================================================= */}

//           <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-6">

//             <SectionHeader
//               title="Footer Colors"
//               description="Customize the footer independently."
//             />


//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//               <ColorInput
//                 label="Footer Background"
//                 description="Main footer background"
//                 value={
//                   branding.footerBackgroundColor
//                 }
//                 onChange={(value) =>
//                   updateField(
//                     "footerBackgroundColor",
//                     value
//                   )
//                 }
//               />


//               <ColorInput
//                 label="Footer Heading"
//                 description="Footer headings and institute name"
//                 value={
//                   branding.footerHeadingColor
//                 }
//                 onChange={(value) =>
//                   updateField(
//                     "footerHeadingColor",
//                     value
//                   )
//                 }
//               />


//               <ColorInput
//                 label="Footer Text"
//                 description="Footer descriptions, links and contact details"
//                 value={
//                   branding.footerTextColor
//                 }
//                 onChange={(value) =>
//                   updateField(
//                     "footerTextColor",
//                     value
//                   )
//                 }
//               />

//             </div>


//             <div className="mt-6 rounded-xl border border-[#34313f] bg-[#111116] p-4">

//               <p className="text-xs text-gray-500 mb-3">
//                 Footer Preview
//               </p>


//               <div
//                 className="rounded-xl p-5"
//                 style={{
//                   backgroundColor:
//                     branding.footerBackgroundColor,
//                 }}
//               >

//                 <h3
//                   className="text-lg font-bold"
//                   style={{
//                     color:
//                       branding.footerHeadingColor,
//                   }}
//                 >
//                   Your Institute
//                 </h3>


//                 <p
//                   className="text-sm mt-2"
//                   style={{
//                     color:
//                       branding.footerTextColor,
//                   }}
//                 >
//                   Learn, create and grow with our institute.
//                 </p>

//               </div>

//             </div>

//           </div>


//           {/* =================================================
//               TYPOGRAPHY
//           ================================================= */}

//           <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-6">

//             <SectionHeader
//               title="Typography"
//               description="Control fonts, weights, line heights and spacing."
//             />


//             {/* HEADING */}

//             <div className="border border-[#34313f] rounded-xl p-5">

//               <h3 className="text-sm font-semibold text-white">
//                 Heading Typography
//               </h3>


//               <p className="text-xs text-gray-500 mt-1 mb-5">
//                 H1, H2, H3 and major website headings.
//               </p>


//               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

//                 <div>

//                   <label className="text-sm text-gray-300">
//                     Heading Font
//                   </label>

//                   <select
//                     value={
//                       branding.fontHeading
//                     }
//                     onChange={(event) =>
//                       updateField(
//                         "fontHeading",
//                         event.target.value
//                       )
//                     }
//                     className="w-full mt-2 rounded-xl bg-[#111116] border border-[#34313f] px-4 py-3 text-white outline-none"
//                   >

//                     {FONT_OPTIONS.map(
//                       (font) => (
//                         <option
//                           key={font}
//                           value={font}
//                         >
//                           {font}
//                         </option>
//                       )
//                     )}

//                   </select>

//                 </div>


//                 <div>

//                   <label className="text-sm text-gray-300">
//                     Heading Weight
//                   </label>

//                   <select
//                     value={
//                       branding.headingWeight
//                     }
//                     onChange={(event) =>
//                       updateField(
//                         "headingWeight",
//                         Number(
//                           event.target.value
//                         )
//                       )
//                     }
//                     className="w-full mt-2 rounded-xl bg-[#111116] border border-[#34313f] px-4 py-3 text-white outline-none"
//                   >

//                     {FONT_WEIGHT_OPTIONS.map(
//                       (item) => (
//                         <option
//                           key={item.value}
//                           value={item.value}
//                         >
//                           {item.label}
//                         </option>
//                       )
//                     )}

//                   </select>

//                 </div>


//                 <div>

//                   <label className="text-sm text-gray-300">
//                     Heading Line Height
//                   </label>

//                   <select
//                     value={
//                       branding.headingLineHeight
//                     }
//                     onChange={(event) =>
//                       updateField(
//                         "headingLineHeight",
//                         Number(
//                           event.target.value
//                         )
//                       )
//                     }
//                     className="w-full mt-2 rounded-xl bg-[#111116] border border-[#34313f] px-4 py-3 text-white outline-none"
//                   >

//                     {LINE_HEIGHT_OPTIONS.map(
//                       (item) => (
//                         <option
//                           key={item.value}
//                           value={item.value}
//                         >
//                           {item.label}
//                         </option>
//                       )
//                     )}

//                   </select>

//                 </div>


//                 <div>

//                   <label className="text-sm text-gray-300">
//                     Heading Letter Spacing
//                   </label>

//                   <input
//                     type="text"
//                     value={
//                       branding.headingLetterSpacing
//                     }
//                     onChange={(event) =>
//                       updateField(
//                         "headingLetterSpacing",
//                         event.target.value
//                       )
//                     }
//                     className="w-full mt-2 rounded-xl bg-[#111116] border border-[#34313f] px-4 py-3 text-white outline-none"
//                   />

//                 </div>

//               </div>

//             </div>


//             {/* SUBHEADING */}

//             <div className="border border-[#34313f] rounded-xl p-5 mt-5">

//               <h3 className="text-sm font-semibold text-white">
//                 Subheading Typography
//               </h3>


//               <p className="text-xs text-gray-500 mt-1 mb-5">
//                 Section subtitles and supporting headings.
//               </p>


//               <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

//                 <div>

//                   <label className="text-sm text-gray-300">
//                     Subheading Font
//                   </label>

//                   <select
//                     value={
//                       branding.fontSubheading
//                     }
//                     onChange={(event) =>
//                       updateField(
//                         "fontSubheading",
//                         event.target.value
//                       )
//                     }
//                     className="w-full mt-2 rounded-xl bg-[#111116] border border-[#34313f] px-4 py-3 text-white outline-none"
//                   >

//                     {FONT_OPTIONS.map(
//                       (font) => (
//                         <option
//                           key={font}
//                           value={font}
//                         >
//                           {font}
//                         </option>
//                       )
//                     )}

//                   </select>

//                 </div>


//                 <div>

//                   <label className="text-sm text-gray-300">
//                     Subheading Weight
//                   </label>

//                   <select
//                     value={
//                       branding.subheadingWeight
//                     }
//                     onChange={(event) =>
//                       updateField(
//                         "subheadingWeight",
//                         Number(
//                           event.target.value
//                         )
//                       )
//                     }
//                     className="w-full mt-2 rounded-xl bg-[#111116] border border-[#34313f] px-4 py-3 text-white outline-none"
//                   >

//                     {FONT_WEIGHT_OPTIONS.map(
//                       (item) => (
//                         <option
//                           key={item.value}
//                           value={item.value}
//                         >
//                           {item.label}
//                         </option>
//                       )
//                     )}

//                   </select>

//                 </div>


//                 <div>

//                   <label className="text-sm text-gray-300">
//                     Subheading Line Height
//                   </label>

//                   <select
//                     value={
//                       branding.subheadingLineHeight
//                     }
//                     onChange={(event) =>
//                       updateField(
//                         "subheadingLineHeight",
//                         Number(
//                           event.target.value
//                         )
//                       )
//                     }
//                     className="w-full mt-2 rounded-xl bg-[#111116] border border-[#34313f] px-4 py-3 text-white outline-none"
//                   >

//                     {LINE_HEIGHT_OPTIONS.map(
//                       (item) => (
//                         <option
//                           key={item.value}
//                           value={item.value}
//                         >
//                           {item.label}
//                         </option>
//                       )
//                     )}

//                   </select>

//                 </div>

//               </div>

//             </div>


//             {/* BODY */}

//             <div className="border border-[#34313f] rounded-xl p-5 mt-5">

//               <h3 className="text-sm font-semibold text-white">
//                 Body Typography
//               </h3>


//               <p className="text-xs text-gray-500 mt-1 mb-5">
//                 Paragraphs, descriptions and normal text.
//               </p>


//               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

//                 <div>

//                   <label className="text-sm text-gray-300">
//                     Body Font
//                   </label>

//                   <select
//                     value={
//                       branding.fontBody
//                     }
//                     onChange={(event) =>
//                       updateField(
//                         "fontBody",
//                         event.target.value
//                       )
//                     }
//                     className="w-full mt-2 rounded-xl bg-[#111116] border border-[#34313f] px-4 py-3 text-white outline-none"
//                   >

//                     {FONT_OPTIONS.map(
//                       (font) => (
//                         <option
//                           key={font}
//                           value={font}
//                         >
//                           {font}
//                         </option>
//                       )
//                     )}

//                   </select>

//                 </div>


//                 <div>

//                   <label className="text-sm text-gray-300">
//                     Body Weight
//                   </label>

//                   <select
//                     value={
//                       branding.bodyWeight
//                     }
//                     onChange={(event) =>
//                       updateField(
//                         "bodyWeight",
//                         Number(
//                           event.target.value
//                         )
//                       )
//                     }
//                     className="w-full mt-2 rounded-xl bg-[#111116] border border-[#34313f] px-4 py-3 text-white outline-none"
//                   >

//                     {FONT_WEIGHT_OPTIONS.map(
//                       (item) => (
//                         <option
//                           key={item.value}
//                           value={item.value}
//                         >
//                           {item.label}
//                         </option>
//                       )
//                     )}

//                   </select>

//                 </div>


//                 <div>

//                   <label className="text-sm text-gray-300">
//                     Body Line Height
//                   </label>

//                   <select
//                     value={
//                       branding.bodyLineHeight
//                     }
//                     onChange={(event) =>
//                       updateField(
//                         "bodyLineHeight",
//                         Number(
//                           event.target.value
//                         )
//                       )
//                     }
//                     className="w-full mt-2 rounded-xl bg-[#111116] border border-[#34313f] px-4 py-3 text-white outline-none"
//                   >

//                     {LINE_HEIGHT_OPTIONS.map(
//                       (item) => (
//                         <option
//                           key={item.value}
//                           value={item.value}
//                         >
//                           {item.label}
//                         </option>
//                       )
//                     )}

//                   </select>

//                 </div>


//                 <div>

//                   <label className="text-sm text-gray-300">
//                     Body Letter Spacing
//                   </label>

//                   <input
//                     type="text"
//                     value={
//                       branding.bodyLetterSpacing
//                     }
//                     onChange={(event) =>
//                       updateField(
//                         "bodyLetterSpacing",
//                         event.target.value
//                       )
//                     }
//                     className="w-full mt-2 rounded-xl bg-[#111116] border border-[#34313f] px-4 py-3 text-white outline-none"
//                   />

//                 </div>

//               </div>

//             </div>


//             {/* TYPOGRAPHY PREVIEW */}

//             <div className="mt-5 rounded-xl border border-[#34313f] bg-[#111116] p-6">

//               <p
//                 className="text-xs uppercase tracking-widest"
//                 style={{
//                   color:
//                     branding.subheadingColor,
//                   fontFamily:
//                     `'${branding.fontSubheading}', sans-serif`,
//                   fontWeight:
//                     branding.subheadingWeight,
//                 }}
//               >
//                 Typography Preview
//               </p>


//               <h3
//                 className="text-3xl mt-2"
//                 style={{
//                   color:
//                     branding.headingColor,
//                   fontFamily:
//                     `'${branding.fontHeading}', sans-serif`,
//                   fontWeight:
//                     branding.headingWeight,
//                   lineHeight:
//                     branding.headingLineHeight,
//                   letterSpacing:
//                     branding.headingLetterSpacing,
//                 }}
//               >
//                 Create Something Beautiful
//               </h3>


//               <p
//                 className="text-sm mt-3 max-w-xl"
//                 style={{
//                   color:
//                     branding.textColor,
//                   fontFamily:
//                     `'${branding.fontBody}', sans-serif`,
//                   fontWeight:
//                     branding.bodyWeight,
//                   lineHeight:
//                     branding.bodyLineHeight,
//                   letterSpacing:
//                     branding.bodyLetterSpacing,
//                 }}
//               >
//                 Learn, create and express your creativity with expert trainers and professional courses.
//               </p>

//             </div>

//           </div>


//           {/* =================================================
//               APPEARANCE
//           ================================================= */}

//           <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-6">

//             <SectionHeader
//               title="Website Appearance"
//               description="Control common visual settings."
//             />


//             <div className="space-y-6">

//               <Toggle
//                 label="Dark Footer"
//                 description="Use a dark footer across the public website."
//                 checked={
//                   Boolean(
//                     branding.darkFooter
//                   )
//                 }
//                 onChange={(value) =>
//                   updateField(
//                     "darkFooter",
//                     value
//                   )
//                 }
//               />


//               <div className="h-px bg-[#2c2c35]" />


//               <Toggle
//                 label="Rounded Buttons"
//                 description="Use rounded corners for website buttons."
//                 checked={
//                   Boolean(
//                     branding.roundedButtons
//                   )
//                 }
//                 onChange={(value) =>
//                   updateField(
//                     "roundedButtons",
//                     value
//                   )
//                 }
//               />

//             </div>

//           </div>


//           {/* =================================================
//               CUSTOM CSS
//           ================================================= */}

//           <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-6">

//             <SectionHeader
//               title="Custom CSS"
//               description="Optional advanced customization."
//             />


//             <textarea
//               value={
//                 branding.customCSS || ""
//               }
//               onChange={(event) =>
//                 updateField(
//                   "customCSS",
//                   event.target.value
//                 )
//               }
//               placeholder={`/* Example */

// .hero-title {
//   letter-spacing: -0.02em;
// }
// `}
//               rows={12}
//               className="w-full rounded-xl bg-[#0d0d11] border border-[#34313f] px-4 py-3 text-sm text-green-300 placeholder:text-gray-700 outline-none focus:border-purple-500 font-mono resize-y"
//             />


//             <p className="text-xs text-gray-600 mt-2">
//               Use this only for advanced website customization.
//             </p>

//           </div>

//         </div>


//         {/* ===================================================
//             LIVE PREVIEW
//         =================================================== */}

//         <div className="xl:col-span-1">

//           <div className="xl:sticky xl:top-6">

//             <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl overflow-hidden">

//               <div className="px-5 py-4 border-b border-[#2c2c35]">

//                 <div className="flex items-center gap-2">

//                   <Palette
//                     size={18}
//                     style={{
//                       color:
//                         branding.iconColor,
//                     }}
//                   />

//                   <h2 className="text-white font-semibold">
//                     Live Preview
//                   </h2>

//                 </div>


//                 <p className="text-xs text-gray-600 mt-1">
//                   Changes appear instantly. Save to apply them.
//                 </p>

//               </div>


//               <div className="p-4">

//                 <div
//                   className="rounded-xl overflow-hidden border"
//                   style={{
//                     borderColor:
//                       branding.iconColor,
//                     backgroundColor:
//                       branding.pageBackgroundColor,
//                   }}
//                 >

//                   {/* NAVBAR */}

//                   <div
//                     className="px-4 py-4 flex items-center justify-between"
//                     style={{
//                       backgroundColor:
//                         branding.navbarColor,
//                     }}
//                   >

//                     <div className="flex items-center gap-2">

//                       <div
//                         className="w-8 h-8 rounded"
//                         style={{
//                           backgroundColor:
//                             branding.iconColor,
//                         }}
//                       />


//                       <span
//                         className="text-sm font-bold"
//                         style={{
//                           color:
//                             "#FFFFFF",
//                           fontFamily:
//                             `'${branding.fontHeading}', sans-serif`,
//                           fontWeight:
//                             branding.headingWeight,
//                         }}
//                       >
//                         Your Institute
//                       </span>

//                     </div>


//                     <div className="flex gap-2">

//                       <div
//                         className="w-10 h-1.5 rounded"
//                         style={{
//                           backgroundColor:
//                             branding.iconColor,
//                         }}
//                       />


//                       <div
//                         className="w-8 h-1.5 rounded"
//                         style={{
//                           backgroundColor:
//                             branding.iconColor,
//                         }}
//                       />

//                     </div>

//                   </div>


//                   {/* HERO */}

//                   <div
//                     className="px-5 py-12 text-center"
//                     style={{
//                       backgroundColor:
//                         branding.pageBackgroundColor,
//                     }}
//                   >

//                     <p
//                       className="text-[10px] uppercase tracking-widest"
//                       style={{
//                         color:
//                           branding.subheadingColor,
//                         fontFamily:
//                           `'${branding.fontSubheading}', sans-serif`,
//                         fontWeight:
//                           branding.subheadingWeight,
//                       }}
//                     >
//                       Welcome to
//                     </p>


//                     <h3
//                       className="text-2xl mt-2"
//                       style={{
//                         color:
//                           branding.headingColor,
//                         fontFamily:
//                           `'${branding.fontHeading}', sans-serif`,
//                         fontWeight:
//                           branding.headingWeight,
//                         lineHeight:
//                           branding.headingLineHeight,
//                       }}
//                     >
//                       Your Institute
//                     </h3>


//                     <p
//                       className="text-xs mt-3"
//                       style={{
//                         color:
//                           branding.textColor,
//                         fontFamily:
//                           `'${branding.fontBody}', sans-serif`,
//                         lineHeight:
//                           branding.bodyLineHeight,
//                       }}
//                     >
//                       Learn. Create. Grow.
//                     </p>


//                     <button
//                       type="button"
//                       className="mt-5 px-4 py-2 text-xs font-semibold"
//                       style={{
//                         backgroundColor:
//                           branding.buttonColor,
//                         color:
//                           branding.buttonTextColor,
//                         borderRadius:
//                           branding.roundedButtons
//                             ? "999px"
//                             : "4px",
//                       }}
//                     >
//                       Explore Courses
//                     </button>

//                   </div>


//                   {/* CONTENT */}

//                   <div className="p-5">

//                     <div
//                       className="rounded-xl p-5 border"
//                       style={{
//                         backgroundColor:
//                           branding.cardBackgroundColor,
//                         borderColor:
//                           `${branding.iconColor}40`,
//                       }}
//                     >

//                       <h4
//                         className="text-lg"
//                         style={{
//                           color:
//                             branding.headingColor,
//                           fontFamily:
//                             `'${branding.fontHeading}', sans-serif`,
//                           fontWeight:
//                             branding.headingWeight,
//                         }}
//                       >
//                         About Our Institute
//                       </h4>


//                       <p
//                         className="text-xs mt-2"
//                         style={{
//                           color:
//                             branding.textColor,
//                           fontFamily:
//                             `'${branding.fontBody}', sans-serif`,
//                         }}
//                       >
//                         Professional education and training for students.
//                       </p>


//                       <div className="flex gap-4 mt-4">

//                         <Check
//                           size={20}
//                           style={{
//                             color:
//                               branding.iconColor,
//                           }}
//                         />


//                         <Palette
//                           size={20}
//                           style={{
//                             color:
//                               branding.iconColor,
//                           }}
//                         />

//                       </div>

//                     </div>

//                   </div>


//                   {/* FOOTER */}

//                   <div
//                     className="px-5 py-6"
//                     style={{
//                       backgroundColor:
//                         branding.footerBackgroundColor,
//                     }}
//                   >

//                     <h4
//                       className="text-sm font-bold"
//                       style={{
//                         color:
//                           branding.footerHeadingColor,
//                         fontFamily:
//                           `'${branding.fontHeading}', sans-serif`,
//                       }}
//                     >
//                       Your Institute
//                     </h4>


//                     <p
//                       className="text-[10px] mt-2 leading-4"
//                       style={{
//                         color:
//                           branding.footerTextColor,
//                         fontFamily:
//                           `'${branding.fontBody}', sans-serif`,
//                       }}
//                     >
//                       Learn, create and grow with our institute.
//                     </p>


//                     <div className="flex gap-3 mt-3">

//                       {[
//                         "Home",
//                         "About",
//                         "Classes",
//                         "Contact",
//                       ].map(
//                         (item) => (

//                           <span
//                             key={item}
//                             className="text-[9px]"
//                             style={{
//                               color:
//                                 branding.footerTextColor,
//                             }}
//                           >
//                             {item}
//                           </span>

//                         )
//                       )}

//                     </div>

//                   </div>

//                 </div>

//               </div>


//               {/* SWATCHES */}

//               <div className="px-5 pb-5">

//                 <p className="text-xs text-gray-600 mb-3">
//                   Active Website Colors
//                 </p>


//                 <div className="grid grid-cols-4 gap-2">

//                   {[
//                     [
//                       "Navbar",
//                       branding.navbarColor,
//                     ],
//                     [
//                       "Heading",
//                       branding.headingColor,
//                     ],
//                     [
//                       "Subheading",
//                       branding.subheadingColor,
//                     ],
//                     [
//                       "Text",
//                       branding.textColor,
//                     ],
//                     [
//                       "Icon",
//                       branding.iconColor,
//                     ],
//                     [
//                       "Button",
//                       branding.buttonColor,
//                     ],
//                     [
//                       "Page BG",
//                       branding.pageBackgroundColor,
//                     ],
//                     [
//                       "Cards",
//                       branding.cardBackgroundColor,
//                     ],
//                     [
//                       "Footer BG",
//                       branding.footerBackgroundColor,
//                     ],
//                     [
//                       "Footer Heading",
//                       branding.footerHeadingColor,
//                     ],
//                     [
//                       "Footer Text",
//                       branding.footerTextColor,
//                     ],
//                   ].map(
//                     ([
//                       label,
//                       color,
//                     ]) => (

//                       <div
//                         key={label}
//                       >

//                         <div
//                           className="w-full h-8 rounded-lg border border-white/10"
//                           style={{
//                             backgroundColor:
//                               color,
//                           }}
//                           title={label}
//                         />

//                         <p className="text-[9px] text-gray-600 mt-1 truncate">
//                           {label}
//                         </p>

//                       </div>

//                     )
//                   )}

//                 </div>

//               </div>

//             </div>

//           </div>

//         </div>

//       </div>


//       {/* =====================================================
//           UNSAVED BAR
//       ===================================================== */}

//       {hasChanges && (

//         <div className="sticky bottom-4 z-30">

//           <div className="bg-[#1f1b2e] border border-purple-500/20 rounded-2xl p-4 shadow-2xl">

//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

//               <div className="flex items-center gap-3">

//                 <div className="w-9 h-9 rounded-lg bg-yellow-500/10 flex items-center justify-center">

//                   <span className="text-yellow-400 font-bold">
//                     !
//                   </span>

//                 </div>


//                 <div>

//                   <p className="text-white text-sm font-medium">
//                     Unsaved branding changes
//                   </p>


//                   <p className="text-gray-500 text-xs mt-1">
//                     Save your changes before publishing the website.
//                   </p>

//                 </div>

//               </div>


//               <button
//                 type="button"
//                 onClick={handleSave}
//                 disabled={saving}
//                 className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
//               >

//                 {saving ? (

//                   <>
//                     <Loader2
//                       size={17}
//                       className="animate-spin"
//                     />

//                     Saving...
//                   </>

//                 ) : (

//                   <>
//                     <Save
//                       size={17}
//                     />

//                     Save Branding
//                   </>

//                 )}

//               </button>

//             </div>

//           </div>

//         </div>

//       )}

//     </div>

//   );
// }



// src/pages/institute/Website/WebsiteBranding.jsx

import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  ArrowLeft,
  Check,
  Loader2,
  Palette,
  Save,
  Type,
  Layout,
  Navigation,
  MousePointer2,
  FileText,
  Image,
  PanelBottom,
  RotateCcw,
    Eye,
} from "lucide-react";

import toast from "react-hot-toast";

import {
  getWebsiteData,
  updateBranding,
} from "../../services/websiteService";

/* =========================================================
   DEFAULT BRANDING
========================================================= */

const DEFAULT_BRANDING = {
  /* =======================================================
     GLOBAL
  ======================================================= */

  pageBackgroundColor: "#FAFAF9",
  cardBackgroundColor: "#FFFFFF",

  headingColor: "#111827",
  subheadingColor: "#7C3AED",
  textColor: "#374151",
  iconColor: "#F59E0B",

  fontHeading: "Inter",
  headingWeight: 700,
  headingLineHeight: 1.2,
  headingLetterSpacing: "-0.02em",

  fontSubheading: "Inter",
  subheadingWeight: 600,
  subheadingLineHeight: 1.4,

  fontBody: "Inter",
  bodyWeight: 400,
  bodyLineHeight: 1.6,
  bodyLetterSpacing: "0",

  /* =======================================================
     BUTTON
  ======================================================= */

  buttonColor: "#7C3AED",
  buttonTextColor: "#FFFFFF",

  buttonFont: "Inter",
  buttonFontWeight: 600,
  buttonBorderRadius: "999px",

  /* =======================================================
     NAVBAR
  ======================================================= */

  navbarBackgroundColor: "#1F2937",
  navbarTextColor: "#FFFFFF",
  navbarIconColor: "#FFFFFF",

  navbarButtonColor: "#7C3AED",
  navbarButtonTextColor: "#FFFFFF",

  navbarFont: "Inter",
  navbarFontWeight: 500,

  /* =======================================================
     FOOTER
  ======================================================= */

  footerBackgroundColor: "#1F2937",
  footerTextColor: "#F9FAFB",
  footerIconColor: "#F59E0B",
  footerLinkColor: "#F9FAFB",

  footerHeadingColor: "#FFFFFF",

  footerFont: "Inter",
  footerFontWeight: 400,

  footerHeadingFont: "Inter",
  footerHeadingWeight: 700,
};

/* =========================================================
   FONT OPTIONS
========================================================= */

const FONT_OPTIONS = [
  "Inter",
  "Poppins",
  "Roboto",
  "Open Sans",
  "Montserrat",
  "Lato",
  "Nunito",
  "Raleway",
  "Playfair Display",
  "Merriweather",
];

/* =========================================================
   FONT WEIGHTS
========================================================= */

const FONT_WEIGHT_OPTIONS = [
  {
    value: 300,
    label: "Light (300)",
  },
  {
    value: 400,
    label: "Regular (400)",
  },
  {
    value: 500,
    label: "Medium (500)",
  },
  {
    value: 600,
    label: "Semi Bold (600)",
  },
  {
    value: 700,
    label: "Bold (700)",
  },
  {
    value: 800,
    label: "Extra Bold (800)",
  },
];

/* =========================================================
   LINE HEIGHT OPTIONS
========================================================= */

const LINE_HEIGHT_OPTIONS = [
  {
    value: 1.1,
    label: "Tight (1.1)",
  },
  {
    value: 1.2,
    label: "Compact (1.2)",
  },
  {
    value: 1.4,
    label: "Normal (1.4)",
  },
  {
    value: 1.5,
    label: "Relaxed (1.5)",
  },
  {
    value: 1.6,
    label: "Comfortable (1.6)",
  },
  {
    value: 1.8,
    label: "Loose (1.8)",
  },
];

/* =========================================================
   BORDER RADIUS OPTIONS
========================================================= */

const BUTTON_RADIUS_OPTIONS = [
  {
    value: "0px",
    label: "Square",
  },
  {
    value: "6px",
    label: "Small",
  },
  {
    value: "10px",
    label: "Medium",
  },
  {
    value: "16px",
    label: "Large",
  },
  {
    value: "999px",
    label: "Pill",
  },
];

/* =========================================================
   NORMALIZE BRANDING
========================================================= */

const normalizeBranding = (
  branding
) => {
  const source =
    branding || {};

  return {
    ...DEFAULT_BRANDING,

    /* =====================================================
       GLOBAL COLORS
    ===================================================== */

    pageBackgroundColor:
      source.pageBackgroundColor ??
      source.page_background_color ??
      DEFAULT_BRANDING.pageBackgroundColor,

    cardBackgroundColor:
      source.cardBackgroundColor ??
      source.card_background_color ??
      DEFAULT_BRANDING.cardBackgroundColor,

    headingColor:
      source.headingColor ??
      source.heading_color ??
      DEFAULT_BRANDING.headingColor,

    subheadingColor:
      source.subheadingColor ??
      source.subheading_color ??
      DEFAULT_BRANDING.subheadingColor,

    textColor:
      source.textColor ??
      source.text_color ??
      DEFAULT_BRANDING.textColor,

    iconColor:
      source.iconColor ??
      source.icon_color ??
      DEFAULT_BRANDING.iconColor,

    /* =====================================================
       HEADING TYPOGRAPHY
    ===================================================== */

    fontHeading:
      source.fontHeading ??
      source.font_heading ??
      DEFAULT_BRANDING.fontHeading,

    headingWeight:
      Number(
        source.headingWeight ??
        source.heading_weight ??
        DEFAULT_BRANDING.headingWeight
      ),

    headingLineHeight:
      Number(
        source.headingLineHeight ??
        source.heading_line_height ??
        DEFAULT_BRANDING.headingLineHeight
      ),

    headingLetterSpacing:
      source.headingLetterSpacing ??
      source.heading_letter_spacing ??
      DEFAULT_BRANDING.headingLetterSpacing,

    /* =====================================================
       SUBHEADING TYPOGRAPHY
    ===================================================== */

    fontSubheading:
      source.fontSubheading ??
      source.font_subheading ??
      DEFAULT_BRANDING.fontSubheading,

    subheadingWeight:
      Number(
        source.subheadingWeight ??
        source.subheading_weight ??
        DEFAULT_BRANDING.subheadingWeight
      ),

    subheadingLineHeight:
      Number(
        source.subheadingLineHeight ??
        source.subheading_line_height ??
        DEFAULT_BRANDING.subheadingLineHeight
      ),

    /* =====================================================
       BODY TYPOGRAPHY
    ===================================================== */

    fontBody:
      source.fontBody ??
      source.font_body ??
      DEFAULT_BRANDING.fontBody,

    bodyWeight:
      Number(
        source.bodyWeight ??
        source.body_weight ??
        DEFAULT_BRANDING.bodyWeight
      ),

    bodyLineHeight:
      Number(
        source.bodyLineHeight ??
        source.body_line_height ??
        DEFAULT_BRANDING.bodyLineHeight
      ),

    bodyLetterSpacing:
      source.bodyLetterSpacing ??
      source.body_letter_spacing ??
      DEFAULT_BRANDING.bodyLetterSpacing,

    /* =====================================================
       BUTTON
    ===================================================== */

    buttonColor:
      source.buttonColor ??
      source.button_color ??
      DEFAULT_BRANDING.buttonColor,

    buttonTextColor:
      source.buttonTextColor ??
      source.button_text_color ??
      DEFAULT_BRANDING.buttonTextColor,

    buttonFont:
      source.buttonFont ??
      source.button_font ??
      DEFAULT_BRANDING.buttonFont,

    buttonFontWeight:
      Number(
        source.buttonFontWeight ??
        source.button_font_weight ??
        DEFAULT_BRANDING.buttonFontWeight
      ),

    buttonBorderRadius:
      source.buttonBorderRadius ??
      source.button_border_radius ??
      DEFAULT_BRANDING.buttonBorderRadius,

    /* =====================================================
       NAVBAR
    ===================================================== */

    navbarBackgroundColor:
      source.navbarBackgroundColor ??
      source.navbar_background_color ??
      source.navbarColor ??
      source.navbar_color ??
      DEFAULT_BRANDING.navbarBackgroundColor,

    navbarTextColor:
      source.navbarTextColor ??
      source.navbar_text_color ??
      DEFAULT_BRANDING.navbarTextColor,

    navbarIconColor:
      source.navbarIconColor ??
      source.navbar_icon_color ??
      DEFAULT_BRANDING.navbarIconColor,

    navbarButtonColor:
      source.navbarButtonColor ??
      source.navbar_button_color ??
      DEFAULT_BRANDING.navbarButtonColor,

    navbarButtonTextColor:
      source.navbarButtonTextColor ??
      source.navbar_button_text_color ??
      DEFAULT_BRANDING.navbarButtonTextColor,

    navbarFont:
      source.navbarFont ??
      source.navbar_font ??
      DEFAULT_BRANDING.navbarFont,

    navbarFontWeight:
      Number(
        source.navbarFontWeight ??
        source.navbar_font_weight ??
        DEFAULT_BRANDING.navbarFontWeight
      ),

    /* =====================================================
       FOOTER
    ===================================================== */

    footerBackgroundColor:
      source.footerBackgroundColor ??
      source.footer_background_color ??
      DEFAULT_BRANDING.footerBackgroundColor,

    footerTextColor:
      source.footerTextColor ??
      source.footer_text_color ??
      DEFAULT_BRANDING.footerTextColor,

    footerIconColor:
      source.footerIconColor ??
      source.footer_icon_color ??
      DEFAULT_BRANDING.footerIconColor,

    footerLinkColor:
      source.footerLinkColor ??
      source.footer_link_color ??
      DEFAULT_BRANDING.footerLinkColor,

    footerHeadingColor:
      source.footerHeadingColor ??
      source.footer_heading_color ??
      DEFAULT_BRANDING.footerHeadingColor,

    footerFont:
      source.footerFont ??
      source.footer_font ??
      DEFAULT_BRANDING.footerFont,

    footerFontWeight:
      Number(
        source.footerFontWeight ??
        source.footer_font_weight ??
        DEFAULT_BRANDING.footerFontWeight
      ),

    footerHeadingFont:
      source.footerHeadingFont ??
      source.footer_heading_font ??
      DEFAULT_BRANDING.footerHeadingFont,

    footerHeadingWeight:
      Number(
        source.footerHeadingWeight ??
        source.footer_heading_weight ??
        DEFAULT_BRANDING.footerHeadingWeight
      ),
  };
};

/* =========================================================
   CREATE API PAYLOAD
========================================================= */

const createBrandingPayload = (
  branding
) => {
  return {
    /* GLOBAL */

    pageBackgroundColor:
      branding.pageBackgroundColor,

    cardBackgroundColor:
      branding.cardBackgroundColor,

    headingColor:
      branding.headingColor,

    subheadingColor:
      branding.subheadingColor,

    textColor:
      branding.textColor,

    iconColor:
      branding.iconColor,

    /* HEADING */

    fontHeading:
      branding.fontHeading,

    headingWeight:
      branding.headingWeight,

    headingLineHeight:
      branding.headingLineHeight,

    headingLetterSpacing:
      branding.headingLetterSpacing,

    /* SUBHEADING */

    fontSubheading:
      branding.fontSubheading,

    subheadingWeight:
      branding.subheadingWeight,

    subheadingLineHeight:
      branding.subheadingLineHeight,

    /* BODY */

    fontBody:
      branding.fontBody,

    bodyWeight:
      branding.bodyWeight,

    bodyLineHeight:
      branding.bodyLineHeight,

    bodyLetterSpacing:
      branding.bodyLetterSpacing,

    /* BUTTON */

    buttonColor:
      branding.buttonColor,

    buttonTextColor:
      branding.buttonTextColor,

    buttonFont:
      branding.buttonFont,

    buttonFontWeight:
      branding.buttonFontWeight,

    buttonBorderRadius:
      branding.buttonBorderRadius,

    /* NAVBAR */

    navbarBackgroundColor:
      branding.navbarBackgroundColor,

    navbarTextColor:
      branding.navbarTextColor,

    navbarIconColor:
      branding.navbarIconColor,

    navbarButtonColor:
      branding.navbarButtonColor,

    navbarButtonTextColor:
      branding.navbarButtonTextColor,

    navbarFont:
      branding.navbarFont,

    navbarFontWeight:
      branding.navbarFontWeight,

    /* FOOTER */

    footerBackgroundColor:
      branding.footerBackgroundColor,

    footerTextColor:
      branding.footerTextColor,

    footerIconColor:
      branding.footerIconColor,

    footerLinkColor:
      branding.footerLinkColor,

    footerHeadingColor:
      branding.footerHeadingColor,

    footerFont:
      branding.footerFont,

    footerFontWeight:
      branding.footerFontWeight,

    footerHeadingFont:
      branding.footerHeadingFont,

    footerHeadingWeight:
      branding.footerHeadingWeight,
  };
};

/* =========================================================
   COLOR INPUT
========================================================= */

function ColorInput({
  label,
  description,
  value,
  onChange,
}) {
  return (
    <div className="space-y-2">
      <div>
        <label className="text-sm font-medium text-gray-300">
          {label}
        </label>

        {description && (
          <p className="text-xs text-gray-600 mt-1">
            {description}
          </p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <input
          type="color"
          value={
            /^#[0-9A-Fa-f]{6}$/.test(
              value || ""
            )
              ? value
              : "#000000"
          }
          onChange={(event) =>
            onChange(
              event.target.value
            )
          }
          className="w-12 h-12 rounded-xl border border-[#34313f] bg-[#111116] p-1 cursor-pointer"
        />

        <input
          type="text"
          value={value || ""}
          onChange={(event) =>
            onChange(
              event.target.value
            )
          }
          placeholder="#000000"
          className="flex-1 min-w-0 rounded-xl bg-[#111116] border border-[#34313f] px-4 py-3 text-white uppercase placeholder:text-gray-600 outline-none focus:border-purple-500"
        />
      </div>
    </div>
  );
}

/* =========================================================
   SECTION HEADER
========================================================= */

function SectionHeader({
  icon: Icon,
  title,
  description,
}) {
  return (
    <div className="flex items-start gap-3 mb-6">
      {Icon && (
        <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0">
          <Icon
            size={20}
            className="text-purple-400"
          />
        </div>
      )}

      <div>
        <h2 className="text-lg font-semibold text-white">
          {title}
        </h2>

        {description && (
          <p className="text-sm text-gray-500 mt-1">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   SELECT INPUT
========================================================= */

function SelectInput({
  label,
  description,
  value,
  onChange,
  options,
}) {
  return (
    <div>
      <label className="text-sm text-gray-300">
        {label}
      </label>

      {description && (
        <p className="text-xs text-gray-600 mt-1">
          {description}
        </p>
      )}

      <select
        value={value}
        onChange={(event) =>
          onChange(
            event.target.value
          )
        }
        className="w-full mt-2 rounded-xl bg-[#111116] border border-[#34313f] px-4 py-3 text-white outline-none focus:border-purple-500"
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function WebsiteBranding() {
  const navigate =
    useNavigate();

  const [branding, setBranding] =
    useState({
      ...DEFAULT_BRANDING,
    });

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [hasChanges, setHasChanges] =
    useState(false);

  /* =======================================================
     LOAD
  ======================================================= */

  useEffect(() => {
    loadBranding();
  }, []);

  const loadBranding =
    async () => {
      try {
        setLoading(true);

        const response =
          await getWebsiteData();

        console.log(
          "WEBSITE DATA:",
          response
        );

        /*
         * Support all common API response
         * structures.
         */

        let data = response;

        if (
          data?.data &&
          typeof data.data ===
            "object"
        ) {
          data = data.data;
        }

        const existingBranding =
          data?.branding ||
          data?.website?.branding ||
          {};

        const normalized =
          normalizeBranding(
            existingBranding
          );

        console.log(
          "NORMALIZED BRANDING:",
          normalized
        );

        setBranding(
          normalized
        );

        setHasChanges(
          false
        );
      } catch (error) {
        console.error(
          "LOAD BRANDING ERROR:",
          error
        );

        toast.error(
          error?.response?.data
            ?.message ||
            error?.message ||
            "Failed to load website branding"
        );
      } finally {
        setLoading(false);
      }
    };

  /* =======================================================
     UPDATE
  ======================================================= */

  const updateField = (
    field,
    value
  ) => {
    setBranding(
      (previous) => ({
        ...previous,
        [field]: value,
      })
    );

    setHasChanges(true);
  };

  /* =======================================================
     SAVE
  ======================================================= */

  const handleSave =
    async () => {
      if (
        saving ||
        !hasChanges
      ) {
        return;
      }

      try {
        setSaving(true);

        const payload =
          createBrandingPayload(
            branding
          );

        console.log(
          "BRANDING PAYLOAD:",
          payload
        );

        const response =
          await updateBranding(
            payload
          );

        console.log(
          "BRANDING SAVE RESPONSE:",
          response
        );

        toast.success(
          "Website branding saved successfully"
        );

        setHasChanges(
          false
        );

        /*
         * Reload from backend so the
         * dashboard reflects exactly what
         * was persisted.
         */

        await loadBranding();
      } catch (error) {
        console.error(
          "SAVE BRANDING ERROR:",
          error
        );

        toast.error(
          error?.response?.data
            ?.message ||
            error?.message ||
            "Failed to save website branding"
        );
      } finally {
        setSaving(false);
      }
    };

  /* =======================================================
     RESET
  ======================================================= */

  const handleReset =
    () => {
      setBranding({
        ...DEFAULT_BRANDING,
      });

      setHasChanges(
        true
      );

      toast.success(
        "Default branding loaded. Click Save Changes to apply."
      );
    };

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="flex items-center gap-3 text-gray-400">
          <Loader2
            size={22}
            className="animate-spin"
          />

          <span>
            Loading website branding...
          </span>
        </div>
      </div>
    );
  }

  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <div className="space-y-6 pb-24">
      {/* ===================================================
          HEADER
      =================================================== */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() =>
              navigate(
                "/institute/website"
              )
            }
            className="p-2 rounded-xl text-gray-400 hover:bg-[#2a2a35] hover:text-white transition"
          >
            <ArrowLeft
              size={22}
            />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <Palette
                size={23}
                className="text-purple-400"
              />

              <h1 className="text-2xl font-bold text-white">
                Website Branding
              </h1>
            </div>

            <p className="text-sm text-gray-400 mt-1">
              Customize the colors and fonts used throughout your public website.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            disabled={saving}
            className="px-4 py-2.5 rounded-xl border border-[#34313f] text-gray-300 hover:bg-[#24212f] transition disabled:opacity-50"
          >
            Reset Defaults
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={
              saving ||
              !hasChanges
            }
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>
                <Loader2
                  size={18}
                  className="animate-spin"
                />
                Saving...
              </>
            ) : (
              <>
                <Save
                  size={18}
                />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>

      {/* ===================================================
          GLOBAL COLORS
      =================================================== */}

      <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-6">
        <SectionHeader
          icon={Palette}
          title="Website Colors"
          description="Control the main colors used across every website page."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ColorInput
            label="Page Background"
            description="Main background of website pages."
            value={
              branding.pageBackgroundColor
            }
            onChange={(value) =>
              updateField(
                "pageBackgroundColor",
                value
              )
            }
          />

          <ColorInput
            label="Card Background"
            description="Background of cards and content blocks."
            value={
              branding.cardBackgroundColor
            }
            onChange={(value) =>
              updateField(
                "cardBackgroundColor",
                value
              )
            }
          />

          <ColorInput
            label="Heading Color"
            description="Main headings such as H1, H2 and H3."
            value={
              branding.headingColor
            }
            onChange={(value) =>
              updateField(
                "headingColor",
                value
              )
            }
          />

          <ColorInput
            label="Subheading Color"
            description="Section labels and subheadings."
            value={
              branding.subheadingColor
            }
            onChange={(value) =>
              updateField(
                "subheadingColor",
                value
              )
            }
          />

          <ColorInput
            label="Text Color"
            description="Normal paragraphs and website text."
            value={
              branding.textColor
            }
            onChange={(value) =>
              updateField(
                "textColor",
                value
              )
            }
          />

          <ColorInput
            label="Icon Color"
            description="Icons used throughout the website."
            value={
              branding.iconColor
            }
            onChange={(value) =>
              updateField(
                "iconColor",
                value
              )
            }
          />
        </div>
      </div>

      {/* ===================================================
          TYPOGRAPHY
      =================================================== */}

      <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-6">
        <SectionHeader
          icon={Type}
          title="Typography"
          description="Choose fonts and typography for headings, subheadings and normal text."
        />

        {/* HEADING */}

        <div className="border border-[#34313f] rounded-xl p-5">
          <h3 className="text-white font-semibold">
            Heading
          </h3>

          <p className="text-xs text-gray-500 mt-1 mb-5">
            Applies to headings across all public pages.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <SelectInput
              label="Font"
              value={
                branding.fontHeading
              }
              onChange={(value) =>
                updateField(
                  "fontHeading",
                  value
                )
              }
              options={FONT_OPTIONS.map(
                (font) => ({
                  value: font,
                  label: font,
                })
              )}
            />

            <SelectInput
              label="Weight"
              value={String(
                branding.headingWeight
              )}
              onChange={(value) =>
                updateField(
                  "headingWeight",
                  Number(value)
                )
              }
              options={FONT_WEIGHT_OPTIONS.map(
                (item) => ({
                  value: String(
                    item.value
                  ),
                  label: item.label,
                })
              )}
            />

            <SelectInput
              label="Line Height"
              value={String(
                branding.headingLineHeight
              )}
              onChange={(value) =>
                updateField(
                  "headingLineHeight",
                  Number(value)
                )
              }
              options={LINE_HEIGHT_OPTIONS.map(
                (item) => ({
                  value: String(
                    item.value
                  ),
                  label: item.label,
                })
              )}
            />

            <div>
              <label className="text-sm text-gray-300">
                Letter Spacing
              </label>

              <input
                type="text"
                value={
                  branding.headingLetterSpacing
                }
                onChange={(event) =>
                  updateField(
                    "headingLetterSpacing",
                    event.target.value
                  )
                }
                placeholder="-0.02em"
                className="w-full mt-2 rounded-xl bg-[#111116] border border-[#34313f] px-4 py-3 text-white outline-none focus:border-purple-500"
              />
            </div>
          </div>
        </div>

        {/* SUBHEADING */}

        <div className="border border-[#34313f] rounded-xl p-5 mt-5">
          <h3 className="text-white font-semibold">
            Subheading
          </h3>

          <p className="text-xs text-gray-500 mt-1 mb-5">
            Applies to section subheadings and eyebrow text.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <SelectInput
              label="Font"
              value={
                branding.fontSubheading
              }
              onChange={(value) =>
                updateField(
                  "fontSubheading",
                  value
                )
              }
              options={FONT_OPTIONS.map(
                (font) => ({
                  value: font,
                  label: font,
                })
              )}
            />

            <SelectInput
              label="Weight"
              value={String(
                branding.subheadingWeight
              )}
              onChange={(value) =>
                updateField(
                  "subheadingWeight",
                  Number(value)
                )
              }
              options={FONT_WEIGHT_OPTIONS.map(
                (item) => ({
                  value: String(
                    item.value
                  ),
                  label: item.label,
                })
              )}
            />

            <SelectInput
              label="Line Height"
              value={String(
                branding.subheadingLineHeight
              )}
              onChange={(value) =>
                updateField(
                  "subheadingLineHeight",
                  Number(value)
                )
              }
              options={LINE_HEIGHT_OPTIONS.map(
                (item) => ({
                  value: String(
                    item.value
                  ),
                  label: item.label,
                })
              )}
            />
          </div>
        </div>

        {/* BODY */}

        <div className="border border-[#34313f] rounded-xl p-5 mt-5">
          <h3 className="text-white font-semibold">
            Body Text
          </h3>

          <p className="text-xs text-gray-500 mt-1 mb-5">
            Applies to descriptions, paragraphs and normal text.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <SelectInput
              label="Font"
              value={
                branding.fontBody
              }
              onChange={(value) =>
                updateField(
                  "fontBody",
                  value
                )
              }
              options={FONT_OPTIONS.map(
                (font) => ({
                  value: font,
                  label: font,
                })
              )}
            />

            <SelectInput
              label="Weight"
              value={String(
                branding.bodyWeight
              )}
              onChange={(value) =>
                updateField(
                  "bodyWeight",
                  Number(value)
                )
              }
              options={FONT_WEIGHT_OPTIONS.map(
                (item) => ({
                  value: String(
                    item.value
                  ),
                  label: item.label,
                })
              )}
            />

            <SelectInput
              label="Line Height"
              value={String(
                branding.bodyLineHeight
              )}
              onChange={(value) =>
                updateField(
                  "bodyLineHeight",
                  Number(value)
                )
              }
              options={LINE_HEIGHT_OPTIONS.map(
                (item) => ({
                  value: String(
                    item.value
                  ),
                  label: item.label,
                })
              )}
            />

            <div>
              <label className="text-sm text-gray-300">
                Letter Spacing
              </label>

              <input
                type="text"
                value={
                  branding.bodyLetterSpacing
                }
                onChange={(event) =>
                  updateField(
                    "bodyLetterSpacing",
                    event.target.value
                  )
                }
                placeholder="0"
                className="w-full mt-2 rounded-xl bg-[#111116] border border-[#34313f] px-4 py-3 text-white outline-none focus:border-purple-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================
          BUTTON
      =================================================== */}

      <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-6">
        <SectionHeader
          icon={MousePointer2}
          title="Buttons"
          description="Control the appearance of buttons throughout the public website."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ColorInput
            label="Button Background"
            description="Background color of website buttons."
            value={
              branding.buttonColor
            }
            onChange={(value) =>
              updateField(
                "buttonColor",
                value
              )
            }
          />

          <ColorInput
            label="Button Text"
            description="Text color inside buttons."
            value={
              branding.buttonTextColor
            }
            onChange={(value) =>
              updateField(
                "buttonTextColor",
                value
              )
            }
          />

          <SelectInput
            label="Button Font"
            value={
              branding.buttonFont
            }
            onChange={(value) =>
              updateField(
                "buttonFont",
                value
              )
            }
            options={FONT_OPTIONS.map(
              (font) => ({
                value: font,
                label: font,
              })
            )}
          />

          <SelectInput
            label="Button Weight"
            value={String(
              branding.buttonFontWeight
            )}
            onChange={(value) =>
              updateField(
                "buttonFontWeight",
                Number(value)
              )
            }
            options={FONT_WEIGHT_OPTIONS.map(
              (item) => ({
                value: String(
                  item.value
                ),
                label: item.label,
              })
            )}
          />

          <SelectInput
            label="Button Shape"
            value={
              branding.buttonBorderRadius
            }
            onChange={(value) =>
              updateField(
                "buttonBorderRadius",
                value
              )
            }
            options={BUTTON_RADIUS_OPTIONS}
          />
        </div>

        <div className="mt-6 p-5 rounded-xl bg-[#111116] border border-[#34313f]">
          <p className="text-xs text-gray-500 mb-3">
            Button Preview
          </p>

          <button
            type="button"
            className="px-6 py-3"
            style={{
              backgroundColor:
                branding.buttonColor,
              color:
                branding.buttonTextColor,
              fontFamily: `'${branding.buttonFont}', sans-serif`,
              fontWeight:
                branding.buttonFontWeight,
              borderRadius:
                branding.buttonBorderRadius,
            }}
          >
            Explore Classes
          </button>
        </div>
      </div>

      {/* ===================================================
          NAVBAR
      =================================================== */}

      <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-6">
        <SectionHeader
          icon={Navigation}
          title="Navbar"
          description="Customize the navigation bar, navigation text, icons and navbar button."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ColorInput
            label="Navbar Background"
            description="Background color of the website navbar."
            value={
              branding.navbarBackgroundColor
            }
            onChange={(value) =>
              updateField(
                "navbarBackgroundColor",
                value
              )
            }
          />

          <ColorInput
            label="Navbar Text"
            description="Navigation menu text."
            value={
              branding.navbarTextColor
            }
            onChange={(value) =>
              updateField(
                "navbarTextColor",
                value
              )
            }
          />

          <ColorInput
            label="Navbar Icons"
            description="Icons used inside the navbar."
            value={
              branding.navbarIconColor
            }
            onChange={(value) =>
              updateField(
                "navbarIconColor",
                value
              )
            }
          />

          <ColorInput
            label="Navbar Button"
            description="Navbar call-to-action button."
            value={
              branding.navbarButtonColor
            }
            onChange={(value) =>
              updateField(
                "navbarButtonColor",
                value
              )
            }
          />

          <ColorInput
            label="Navbar Button Text"
            description="Text inside the navbar button."
            value={
              branding.navbarButtonTextColor
            }
            onChange={(value) =>
              updateField(
                "navbarButtonTextColor",
                value
              )
            }
          />

          <SelectInput
            label="Navbar Font"
            value={
              branding.navbarFont
            }
            onChange={(value) =>
              updateField(
                "navbarFont",
                value
              )
            }
            options={FONT_OPTIONS.map(
              (font) => ({
                value: font,
                label: font,
              })
            )}
          />

          <SelectInput
            label="Navbar Font Weight"
            value={String(
              branding.navbarFontWeight
            )}
            onChange={(value) =>
              updateField(
                "navbarFontWeight",
                Number(value)
              )
            }
            options={FONT_WEIGHT_OPTIONS.map(
              (item) => ({
                value: String(
                  item.value
                ),
                label: item.label,
              })
            )}
          />
        </div>

        {/* NAVBAR PREVIEW */}

        <div className="mt-6">
          <p className="text-xs text-gray-500 mb-3">
            Navbar Preview
          </p>

          <div
            className="rounded-xl px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            style={{
              backgroundColor:
                branding.navbarBackgroundColor,
              fontFamily: `'${branding.navbarFont}', sans-serif`,
              fontWeight:
                branding.navbarFontWeight,
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{
                  backgroundColor:
                    branding.navbarButtonColor,
                }}
              >
                <Palette
                  size={18}
                  style={{
                    color:
                      branding.navbarIconColor,
                  }}
                />
              </div>

              <span
                style={{
                  color:
                    branding.navbarTextColor,
                }}
              >
                Your Institute
              </span>
            </div>

            <div className="flex items-center gap-5 flex-wrap">
              {[
                "Home",
                "About",
                "Classes",
                "Sessions",
              ].map(
                (item) => (
                  <span
                    key={item}
                    className="text-sm"
                    style={{
                      color:
                        branding.navbarTextColor,
                    }}
                  >
                    {item}
                  </span>
                )
              )}

              <button
                type="button"
                className="px-4 py-2 rounded-lg text-sm font-semibold"
                style={{
                  backgroundColor:
                    branding.navbarButtonColor,
                  color:
                    branding.navbarButtonTextColor,
                }}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================
          FOOTER
      =================================================== */}

      <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-6">
        <SectionHeader
          icon={PanelBottom}
          title="Footer"
          description="Customize footer background, text, links, headings and icons."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ColorInput
            label="Footer Background"
            description="Main footer background."
            value={
              branding.footerBackgroundColor
            }
            onChange={(value) =>
              updateField(
                "footerBackgroundColor",
                value
              )
            }
          />

          <ColorInput
            label="Footer Heading"
            description="Institute name and footer headings."
            value={
              branding.footerHeadingColor
            }
            onChange={(value) =>
              updateField(
                "footerHeadingColor",
                value
              )
            }
          />

          <ColorInput
            label="Footer Text"
            description="Descriptions and normal footer text."
            value={
              branding.footerTextColor
            }
            onChange={(value) =>
              updateField(
                "footerTextColor",
                value
              )
            }
          />

          <ColorInput
            label="Footer Links"
            description="Quick links and navigation links."
            value={
              branding.footerLinkColor
            }
            onChange={(value) =>
              updateField(
                "footerLinkColor",
                value
              )
            }
          />

          <ColorInput
            label="Footer Icons"
            description="Social and other footer icons."
            value={
              branding.footerIconColor
            }
            onChange={(value) =>
              updateField(
                "footerIconColor",
                value
              )
            }
          />

          <SelectInput
            label="Footer Font"
            value={
              branding.footerFont
            }
            onChange={(value) =>
              updateField(
                "footerFont",
                value
              )
            }
            options={FONT_OPTIONS.map(
              (font) => ({
                value: font,
                label: font,
              })
            )}
          />

          <SelectInput
            label="Footer Font Weight"
            value={String(
              branding.footerFontWeight
            )}
            onChange={(value) =>
              updateField(
                "footerFontWeight",
                Number(value)
              )
            }
            options={FONT_WEIGHT_OPTIONS.map(
              (item) => ({
                value: String(
                  item.value
                ),
                label: item.label,
              })
            )}
          />

          <SelectInput
            label="Footer Heading Font"
            value={
              branding.footerHeadingFont
            }
            onChange={(value) =>
              updateField(
                "footerHeadingFont",
                value
              )
            }
            options={FONT_OPTIONS.map(
              (font) => ({
                value: font,
                label: font,
              })
            )}
          />

          <SelectInput
            label="Footer Heading Weight"
            value={String(
              branding.footerHeadingWeight
            )}
            onChange={(value) =>
              updateField(
                "footerHeadingWeight",
                Number(value)
              )
            }
            options={FONT_WEIGHT_OPTIONS.map(
              (item) => ({
                value: String(
                  item.value
                ),
                label: item.label,
              })
            )}
          />
        </div>

        {/* FOOTER PREVIEW */}

        <div className="mt-6">
          <p className="text-xs text-gray-500 mb-3">
            Footer Preview
          </p>

          <div
            className="rounded-xl p-6"
            style={{
              backgroundColor:
                branding.footerBackgroundColor,
              fontFamily: `'${branding.footerFont}', sans-serif`,
              fontWeight:
                branding.footerFontWeight,
            }}
          >
            <h3
              className="text-lg"
              style={{
                color:
                  branding.footerHeadingColor,
                fontFamily: `'${branding.footerHeadingFont}', sans-serif`,
                fontWeight:
                  branding.footerHeadingWeight,
              }}
            >
              Your Institute
            </h3>

            <p
              className="text-sm mt-2 max-w-lg"
              style={{
                color:
                  branding.footerTextColor,
              }}
            >
              Your institute description appears
              here from Website Footer settings.
            </p>

            <div className="flex flex-wrap gap-5 mt-5">
              {[
                "Home",
                "About",
                "Classes",
                "Sessions",
                "Trainers",
                "Testimonials",
              ].map(
                (item) => (
                  <span
                    key={item}
                    className="text-sm"
                    style={{
                      color:
                        branding.footerLinkColor,
                    }}
                  >
                    {item}
                  </span>
                )
              )}
            </div>

            <div className="flex gap-4 mt-5">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor:
                    `${branding.footerIconColor}20`,
                }}
              >
                <Check
                  size={16}
                  style={{
                    color:
                      branding.footerIconColor,
                  }}
                />
              </div>

              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor:
                    `${branding.footerIconColor}20`,
                }}
              >
                <Palette
                  size={16}
                  style={{
                    color:
                      branding.footerIconColor,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================
          COMPLETE LIVE PREVIEW
      =================================================== */}

      <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-6">
        <SectionHeader
          icon={Eye}
          title="Website Preview"
          description="Preview how your global branding works together."
        />

        <div className="rounded-2xl overflow-hidden border border-[#34313f]">
          {/* NAVBAR */}

          <div
            className="px-6 py-4 flex items-center justify-between gap-4"
            style={{
              backgroundColor:
                branding.navbarBackgroundColor,
              fontFamily: `'${branding.navbarFont}', sans-serif`,
              fontWeight:
                branding.navbarFontWeight,
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{
                  backgroundColor:
                    branding.navbarButtonColor,
                }}
              >
                <Palette
                  size={18}
                  style={{
                    color:
                      branding.navbarIconColor,
                  }}
                />
              </div>

              <span
                className="font-semibold"
                style={{
                  color:
                    branding.navbarTextColor,
                }}
              >
                Your Institute
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-5">
              {[
                "Home",
                "About",
                "Classes",
                "Sessions",
              ].map(
                (item) => (
                  <span
                    key={item}
                    className="text-sm"
                    style={{
                      color:
                        branding.navbarTextColor,
                    }}
                  >
                    {item}
                  </span>
                )
              )}

              <button
                type="button"
                className="px-4 py-2 text-xs font-semibold"
                style={{
                  backgroundColor:
                    branding.navbarButtonColor,
                  color:
                    branding.navbarButtonTextColor,
                  borderRadius:
                    branding.buttonBorderRadius,
                }}
              >
                Book Now
              </button>
            </div>
          </div>

          {/* PAGE */}

          <div
            className="p-8 sm:p-12"
            style={{
              backgroundColor:
                branding.pageBackgroundColor,
            }}
          >
            <div className="max-w-2xl mx-auto text-center">
              <p
                className="text-xs uppercase tracking-widest"
                style={{
                  color:
                    branding.subheadingColor,
                  fontFamily: `'${branding.fontSubheading}', sans-serif`,
                  fontWeight:
                    branding.subheadingWeight,
                  lineHeight:
                    branding.subheadingLineHeight,
                }}
              >
                Popular Classes
              </p>

              <h2
                className="text-3xl sm:text-4xl mt-2"
                style={{
                  color:
                    branding.headingColor,
                  fontFamily: `'${branding.fontHeading}', sans-serif`,
                  fontWeight:
                    branding.headingWeight,
                  lineHeight:
                    branding.headingLineHeight,
                  letterSpacing:
                    branding.headingLetterSpacing,
                }}
              >
                Explore Our Classes
              </h2>

              <p
                className="text-sm mt-4"
                style={{
                  color:
                    branding.textColor,
                  fontFamily: `'${branding.fontBody}', sans-serif`,
                  fontWeight:
                    branding.bodyWeight,
                  lineHeight:
                    branding.bodyLineHeight,
                  letterSpacing:
                    branding.bodyLetterSpacing,
                }}
              >
                Discover classes designed to help
                you learn, create and grow.
              </p>

              <button
                type="button"
                className="mt-6 px-6 py-3 font-semibold"
                style={{
                  backgroundColor:
                    branding.buttonColor,
                  color:
                    branding.buttonTextColor,
                  fontFamily: `'${branding.buttonFont}', sans-serif`,
                  fontWeight:
                    branding.buttonFontWeight,
                  borderRadius:
                    branding.buttonBorderRadius,
                }}
              >
                View Classes
              </button>

              {/* CARD */}

              <div
                className="mt-8 text-left rounded-2xl p-6 border"
                style={{
                  backgroundColor:
                    branding.cardBackgroundColor,
                  borderColor:
                    `${branding.iconColor}35`,
                }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor:
                        `${branding.iconColor}18`,
                    }}
                  >
                    <Palette
                      size={20}
                      style={{
                        color:
                          branding.iconColor,
                      }}
                    />
                  </div>

                  <div>
                    <h3
                      className="text-lg"
                      style={{
                        color:
                          branding.headingColor,
                        fontFamily: `'${branding.fontHeading}', sans-serif`,
                        fontWeight:
                          branding.headingWeight,
                      }}
                    >
                      Featured Class
                    </h3>

                    <p
                      className="text-sm mt-1"
                      style={{
                        color:
                          branding.textColor,
                        fontFamily: `'${branding.fontBody}', sans-serif`,
                        fontWeight:
                          branding.bodyWeight,
                      }}
                    >
                      This card uses your selected
                      card background, heading, text
                      and icon colors.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FOOTER */}

          <div
            className="px-6 py-8"
            style={{
              backgroundColor:
                branding.footerBackgroundColor,
              fontFamily: `'${branding.footerFont}', sans-serif`,
              fontWeight:
                branding.footerFontWeight,
            }}
          >
            <h3
              className="text-lg"
              style={{
                color:
                  branding.footerHeadingColor,
                fontFamily: `'${branding.footerHeadingFont}', sans-serif`,
                fontWeight:
                  branding.footerHeadingWeight,
              }}
            >
              Your Institute
            </h3>

            <p
              className="text-sm mt-2 max-w-lg"
              style={{
                color:
                  branding.footerTextColor,
              }}
            >
              Your footer description will appear
              here from the Institute Footer settings.
            </p>

            <div className="flex flex-wrap gap-5 mt-5">
              {[
                "Home",
                "About",
                "Classes",
                "Sessions",
                "Trainers",
                "Testimonials",
              ].map(
                (item) => (
                  <span
                    key={item}
                    className="text-sm"
                    style={{
                      color:
                        branding.footerLinkColor,
                    }}
                  >
                    {item}
                  </span>
                )
              )}
            </div>

            <div className="flex gap-3 mt-5">
              <Check
                size={20}
                style={{
                  color:
                    branding.footerIconColor,
                }}
              />

              <Palette
                size={20}
                style={{
                  color:
                    branding.footerIconColor,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================
          UNSAVED CHANGES
      =================================================== */}

      {hasChanges && (
        <div className="sticky bottom-4 z-30">
          <div className="bg-[#1f1b2e] border border-purple-500/20 rounded-2xl p-4 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                  <span className="text-yellow-400 font-bold">
                    !
                  </span>
                </div>

                <div>
                  <p className="text-white text-sm font-medium">
                    Unsaved branding changes
                  </p>

                  <p className="text-gray-500 text-xs mt-1">
                    Save your changes to apply them to the website.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={
                  handleSave
                }
                disabled={saving}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <Loader2
                      size={17}
                      className="animate-spin"
                    />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save
                      size={17}
                    />
                    Save Branding
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}