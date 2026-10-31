
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// import {
//   ArrowLeft,
//   ArrowDown,
//   ArrowUp,
//   GripVertical,
//   Loader2,
//   Save,
//   Settings,
// } from "lucide-react";

// import toast from "react-hot-toast";

// import {
//   getWebsiteData,
//   updateSections,
// } from "../../services/websiteService";


// /* =========================================================
//    SECTION INFORMATION
// ========================================================= */

// const SECTION_INFO = {
//   home: {
//     label: "Home",
//     description:
//       "Main homepage section of your institute website.",
//   },

//   about: {
//     label: "About Us",
//     description:
//       "Introduce your institute, mission, experience and achievements.",
//   },

//   courses: {
//     label: "Popular Classes",
//     description:
//       "Display your institute classes and available courses.",
//   },

//   categories: {
//     label: "Categories",
//     description:
//       "Display categories available in your institute.",
//   },

//   trainers: {
//     label: "Trainers",
//     description:
//       "Show trainers associated with your institute.",
//   },

//   sessions: {
//     label: "Sessions",
//     description:
//       "Display upcoming and scheduled sessions for your institute.",
//   },

//   testimonials: {
//     label: "Testimonials",
//     description:
//       "Display student reviews and testimonials.",
//   },

//   studentlogin: {
//     label: "Student Login",
//     description:
//       "Provide students with access to the student login page.",
//   },
// };


// /* =========================================================
//    SECTION TYPE ALIASES
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
//   popularclassessection: "courses",

//   categories: "categories",
//   category: "categories",

//   trainers: "trainers",
//   trainer: "trainers",

//   sessions: "sessions",
//   session: "sessions",

//   testimonials: "testimonials",
//   testimonial: "testimonials",

//   studentlogin: "studentlogin",
//   student_login: "studentlogin",
// };


// /* =========================================================
//    DEFAULT SECTION ORDER
// ========================================================= */

// const DEFAULT_SECTION_ORDER = [
//   "home",
//   "about",
//   "courses",
//   "categories",
//   "trainers",
//   "sessions",
//   "testimonials",
//   "studentlogin",
// ];


// /* =========================================================
//    NORMALIZE SECTION TYPE
// ========================================================= */

// const normalizeSectionType = (value) => {
//   if (
//     value === null ||
//     value === undefined
//   ) {
//     return "";
//   }

//   const normalized = String(value)
//     .trim()
//     .toLowerCase()
//     .replace(/[\s_-]+/g, "");

//   return (
//     SECTION_ALIASES[normalized] ||
//     normalized
//   );
// };


// /* =========================================================
//    NORMALIZE ENABLED VALUE
// ========================================================= */

// const normalizeEnabled = (section) => {
//   const value =
//     section?.is_enabled ??
//     section?.enabled ??
//     true;

//   if (
//     value === true ||
//     value === 1 ||
//     value === "1" ||
//     String(value)
//       .trim()
//       .toLowerCase() === "true"
//   ) {
//     return true;
//   }

//   return false;
// };


// /* =========================================================
//    NORMALIZE SECTION
// ========================================================= */

// const normalizeSection = (
//   section,
//   index
// ) => {
//   const rawType =
//     section?.section_type ??
//     section?.type ??
//     "";

//   const type =
//     normalizeSectionType(
//       rawType
//     );

//   const info =
//     SECTION_INFO[type] || {
//       label:
//         rawType || "Section",

//       description:
//         "Website section.",
//     };

//   const rawOrder =
//     section?.section_order ??
//     section?.order ??
//     index;

//   return {
//     id:
//       section?.id ??
//       null,

//     type,

//     label:
//       info.label,

//     description:
//       info.description,

//     enabled:
//       normalizeEnabled(
//         section
//       ),

//     order:
//       Number.isFinite(
//         Number(rawOrder)
//       )
//         ? Number(rawOrder)
//         : index,
//   };
// };


// /* =========================================================
//    NORMALIZE ALL SECTIONS
// ========================================================= */

// const normalizeSections = (
//   backendSections
// ) => {
//   if (
//     !Array.isArray(
//       backendSections
//     )
//   ) {
//     return [];
//   }

//   const normalized =
//     backendSections
//       .map(
//         (
//           section,
//           index
//         ) =>
//           normalizeSection(
//             section,
//             index
//           )
//       )
//       .filter(
//         (section) =>
//           section.type
//       );


//   /*
//    * Remove duplicate section types.
//    *
//    * This protects the UI if old database
//    * records contain aliases such as:
//    *
//    * classes + courses
//    * hero + home
//    */

//   const uniqueSections =
//     [];

//   const seenTypes =
//     new Set();


//   for (
//     const section of
//       normalized
//   ) {

//     if (
//       seenTypes.has(
//         section.type
//       )
//     ) {
//       continue;
//     }

//     seenTypes.add(
//       section.type
//     );

//     uniqueSections.push(
//       section
//     );
//   }


//   /*
//    * If a supported section does not
//    * exist in the database, show it
//    * in the dashboard.
//    *
//    * IMPORTANT:
//    * These are not frontendOnly.
//    *
//    * They will be created by
//    * updateSectionsService().
//    */

//   for (
//     const type of
//       DEFAULT_SECTION_ORDER
//   ) {

//     const exists =
//       uniqueSections.some(
//         (section) =>
//           section.type ===
//           type
//       );

//     if (
//       exists
//     ) {
//       continue;
//     }

//     uniqueSections.push({
//       id:
//         null,

//       type,

//       label:
//         SECTION_INFO[type]
//           .label,

//       description:
//         SECTION_INFO[type]
//           .description,

//       enabled:
//         true,

//       order:
//         uniqueSections.length,
//     });
//   }


//   return uniqueSections
//     .sort(
//       (a, b) =>
//         Number(a.order) -
//         Number(b.order)
//     )
//     .map(
//       (
//         section,
//         index
//       ) => ({
//         ...section,

//         order:
//           index,
//       })
//     );
// };


// /* =========================================================
//    CREATE SAVE PAYLOAD
// ========================================================= */

// const createSavePayload = (
//   sections
// ) => {
//   return sections.map(
//     (
//       section,
//       index
//     ) => ({
//       /*
//        * Keep ID when it exists.
//        *
//        * If ID is null, backend will
//        * create the section using type.
//        */

//       id:
//         section.id,

//       type:
//         section.type,

//       enabled:
//         Boolean(
//           section.enabled
//         ),

//       order:
//         index,
//     })
//   );
// };


// /* =========================================================
//    COMPONENT
// ========================================================= */

// export default function WebsiteSections() {
//   const navigate =
//     useNavigate();


//   /* =======================================================
//      STATE
//   ======================================================= */

//   const [
//     sections,
//     setSections,
//   ] = useState([]);

//   const [
//     originalSections,
//     setOriginalSections,
//   ] = useState([]);

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
//      LOAD ON MOUNT
//   ======================================================= */

//   useEffect(() => {
//     loadSections();
//   }, []);


//   /* =======================================================
//      LOAD WEBSITE SECTIONS
//   ======================================================= */

//   const loadSections = async () => {
//     try {

//       setLoading(
//         true
//       );


//       const response =
//         await getWebsiteData();


//       console.log(
//         "=========================================="
//       );

//       console.log(
//         "WEBSITE DATA"
//       );

//       console.log(
//         response
//       );

//       console.log(
//         "=========================================="
//       );


//       /*
//        * API service normally returns
//        * response.data.data directly.
//        *
//        * These checks also support
//        * older response structures.
//        */

//       let data =
//         response;


//       if (
//         data &&
//         typeof data ===
//           "object" &&
//         !Array.isArray(data) &&
//         data.data
//       ) {

//         data =
//           data.data;
//       }


//       if (
//         data?.data &&
//         typeof data.data ===
//           "object" &&
//         !Array.isArray(
//           data.data
//         )
//       ) {

//         data =
//           data.data;
//       }


//       const backendSections =
//         Array.isArray(
//           data?.sections
//         )
//           ? data.sections
//           : [];


//       console.log(
//         "BACKEND SECTIONS:",
//         backendSections
//       );


//       const normalizedSections =
//         normalizeSections(
//           backendSections
//         );


//       console.log(
//         "NORMALIZED SECTIONS:",
//         normalizedSections
//       );


//       setSections(
//         normalizedSections
//       );


//       /*
//        * Keep a separate snapshot
//        * for discard functionality.
//        */

//       setOriginalSections(
//         JSON.parse(
//           JSON.stringify(
//             normalizedSections
//           )
//         )
//       );


//       setHasChanges(
//         false
//       );

//     } catch (error) {

//       console.error(
//         "FAILED TO LOAD WEBSITE SECTIONS:",
//         error
//       );


//       toast.error(
//         error?.response?.data?.message ||
//           error?.message ||
//           "Failed to load website sections"
//       );

//     } finally {

//       setLoading(
//         false
//       );
//     }
//   };


//   /* =======================================================
//      TOGGLE VISIBILITY
//   ======================================================= */

//   const handleToggle = (
//     section
//   ) => {

//     if (
//       saving
//     ) {
//       return;
//     }


//     setSections(
//       (previous) =>
//         previous.map(
//           (item) => {

//             const sameSection =
//               item.type ===
//               section.type;


//             if (
//               !sameSection
//             ) {
//               return item;
//             }


//             return {
//               ...item,

//               enabled:
//                 !item.enabled,
//             };
//           }
//         )
//     );


//     setHasChanges(
//       true
//     );
//   };


//   /* =======================================================
//      MOVE UP
//   ======================================================= */

//   const handleMoveUp = (
//     index
//   ) => {

//     if (
//       index <= 0 ||
//       saving
//     ) {
//       return;
//     }


//     setSections(
//       (previous) => {

//         const updated = [
//           ...previous,
//         ];


//         [
//           updated[index - 1],
//           updated[index],
//         ] = [
//           updated[index],
//           updated[index - 1],
//         ];


//         return updated.map(
//           (
//             section,
//             sectionIndex
//           ) => ({
//             ...section,

//             order:
//               sectionIndex,
//           })
//         );
//       }
//     );


//     setHasChanges(
//       true
//     );
//   };


//   /* =======================================================
//      MOVE DOWN
//   ======================================================= */

//   const handleMoveDown = (
//     index
//   ) => {

//     if (
//       index >=
//         sections.length -
//           1 ||
//       saving
//     ) {
//       return;
//     }


//     setSections(
//       (previous) => {

//         const updated = [
//           ...previous,
//         ];


//         [
//           updated[index],
//           updated[index + 1],
//         ] = [
//           updated[index + 1],
//           updated[index],
//         ];


//         return updated.map(
//           (
//             section,
//             sectionIndex
//           ) => ({
//             ...section,

//             order:
//               sectionIndex,
//           })
//         );
//       }
//     );


//     setHasChanges(
//       true
//     );
//   };


//   /* =======================================================
//      SAVE
//   ======================================================= */

//   const handleSave = async () => {

//     if (
//       !hasChanges
//     ) {
//       return;
//     }


//     try {

//       setSaving(
//         true
//       );


//       const payload =
//         createSavePayload(
//           sections
//         );


//       console.log(
//         "=========================================="
//       );

//       console.log(
//         "SAVING WEBSITE SECTIONS"
//       );

//       console.log(
//         payload
//       );

//       console.log(
//         "=========================================="
//       );


//       const response =
//         await updateSections(
//           payload
//         );


//       console.log(
//         "UPDATE SECTIONS RESPONSE:",
//         response
//       );


//       /*
//        * Reload from database.
//        *
//        * This is important because newly
//        * created sections receive database IDs.
//        */

//       await loadSections();


//       toast.success(
//         "Website sections saved successfully"
//       );

//     } catch (error) {

//       console.error(
//         "FAILED TO SAVE WEBSITE SECTIONS:",
//         error
//       );


//       toast.error(
//         error?.response?.data?.message ||
//           error?.message ||
//           "Failed to save website sections"
//       );

//     } finally {

//       setSaving(
//         false
//       );
//     }
//   };


//   /* =======================================================
//      DISCARD
//   ======================================================= */

//   const handleDiscard = () => {

//     if (
//       !hasChanges
//     ) {
//       return;
//     }


//     setSections(
//       JSON.parse(
//         JSON.stringify(
//           originalSections
//         )
//       )
//     );


//     setHasChanges(
//       false
//     );


//     toast.success(
//       "Changes discarded"
//     );
//   };


//   /* =======================================================
//      RELOAD
//   ======================================================= */

//   const handleReload = () => {

//     if (
//       hasChanges
//     ) {

//       const confirmed =
//         window.confirm(
//           "You have unsaved changes. Reload and discard them?"
//         );


//       if (
//         !confirmed
//       ) {
//         return;
//       }
//     }


//     loadSections();
//   };


//   /* =======================================================
//      LOADING
//   ======================================================= */

//   if (
//     loading
//   ) {

//     return (
//       <div className="min-h-[400px] flex items-center justify-center">

//         <div className="flex items-center gap-3 text-gray-400">

//           <Loader2
//             size={22}
//             className="animate-spin"
//           />

//           <span>
//             Loading website sections...
//           </span>

//         </div>

//       </div>
//     );
//   }


//   /* =======================================================
//      COUNTS
//   ======================================================= */

//   const enabledCount =
//     sections.filter(
//       (section) =>
//         section.enabled
//     ).length;


//   const hiddenCount =
//     sections.filter(
//       (section) =>
//         !section.enabled
//     ).length;


//   /* =======================================================
//      PAGE
//   ======================================================= */

//   return (
//     <div className="space-y-6">

//       {/* =====================================================
//           HEADER
//       ===================================================== */}

//       <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

//         <div className="flex items-center gap-4">

//           <button
//             type="button"
//             onClick={() =>
//               navigate(
//                 "/institute/website"
//               )
//             }
//             disabled={saving}
//             className="rounded-xl p-2 text-gray-400 transition hover:bg-[#2a2a35] hover:text-white disabled:opacity-50"
//           >

//             <ArrowLeft
//               size={22}
//             />

//           </button>


//           <div>

//             <div className="flex items-center gap-2">

//               <Settings
//                 size={22}
//                 className="text-purple-400"
//               />

//               <h1 className="text-2xl font-bold text-white">
//                 Website Sections
//               </h1>

//             </div>


//             <p className="mt-1 text-sm text-gray-400">
//               Choose which sections appear on your website and arrange their order.
//             </p>

//           </div>

//         </div>


//         {/* =================================================
//             ACTIONS
//         ================================================= */}

//         <div className="flex items-center gap-3">

//           <button
//             type="button"
//             onClick={
//               handleReload
//             }
//             disabled={saving}
//             className="rounded-xl border border-[#34313f] px-4 py-2.5 text-gray-300 transition hover:bg-[#211f29] hover:text-white disabled:opacity-50"
//           >
//             Reload
//           </button>


//           {hasChanges && (
//             <button
//               type="button"
//               onClick={
//                 handleDiscard
//               }
//               disabled={saving}
//               className="rounded-xl border border-[#34313f] px-4 py-2.5 text-gray-300 transition hover:bg-[#211f29] hover:text-white disabled:opacity-50"
//             >
//               Discard
//             </button>
//           )}


//           <button
//             type="button"
//             onClick={
//               handleSave
//             }
//             disabled={
//               saving ||
//               !hasChanges
//             }
//             className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-5 py-2.5 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
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
//           INFO
//       ===================================================== */}

//       <div className="rounded-2xl border border-[#2c2c35] bg-[#151519] p-5">

//         <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

//           <div>

//             <h2 className="font-semibold text-white">
//               Manage Website Sections
//             </h2>

//             <p className="mt-1 text-sm text-gray-500">
//               Turn sections on or off and change their display order. Hidden sections will not appear in the website preview.
//             </p>

//           </div>


//           <div className="flex items-center gap-3">

//             {/* ENABLED */}

//             <div className="rounded-xl border border-green-500/20 bg-green-500/10 px-3 py-2">

//               <span className="text-sm text-green-400">
//                 {enabledCount} visible
//               </span>

//             </div>


//             {/* HIDDEN */}

//             <div className="rounded-xl border border-gray-500/20 bg-gray-500/10 px-3 py-2">

//               <span className="text-sm text-gray-400">
//                 {hiddenCount} hidden
//               </span>

//             </div>


//             {/* TOTAL */}

//             <div className="rounded-xl border border-purple-500/20 bg-purple-500/10 px-3 py-2">

//               <span className="text-sm text-purple-400">
//                 {sections.length} total
//               </span>

//             </div>

//           </div>

//         </div>

//       </div>


//       {/* =====================================================
//           EMPTY STATE
//       ===================================================== */}

//       {sections.length === 0 ? (

//         <div className="rounded-2xl border border-[#2c2c35] bg-[#151519] p-10 text-center">

//           <Settings
//             size={40}
//             className="mx-auto mb-4 text-gray-600"
//           />


//           <h2 className="text-lg font-semibold text-white">
//             No sections found
//           </h2>


//           <p className="mt-2 text-sm text-gray-500">
//             Your website sections have not been configured yet.
//           </p>


//           <button
//             type="button"
//             onClick={
//               loadSections
//             }
//             className="mt-5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-5 py-2.5 font-semibold text-white"
//           >
//             Reload
//           </button>

//         </div>

//       ) : (

//         /* ===================================================
//            SECTION LIST
//         =================================================== */

//         <div className="space-y-4">

//           {sections.map(
//             (
//               section,
//               index
//             ) => {

//               const info =
//                 SECTION_INFO[
//                   section.type
//                 ] || {
//                   label:
//                     section.label ||
//                     section.type ||
//                     "Section",

//                   description:
//                     section.description ||
//                     "Website section.",
//                 };


//               return (
//                 <div
//                   key={
//                     section.id ??
//                     `${section.type}-${index}`
//                   }
//                   className={`rounded-2xl border bg-[#151519] p-5 transition ${
//                     section.enabled
//                       ? "border-[#2c2c35]"
//                       : "border-[#25242c] opacity-70"
//                   }`}
//                 >

//                   <div className="flex flex-col gap-5 lg:flex-row lg:items-center">

//                     {/* =================================================
//                         DRAG / ORDER INDICATOR
//                     ================================================= */}

//                     <div className="flex items-center gap-3">

//                       <div
//                         className={`cursor-grab ${
//                           section.enabled
//                             ? "text-gray-600"
//                             : "text-gray-700"
//                         }`}
//                       >

//                         <GripVertical
//                           size={20}
//                         />

//                       </div>


//                       <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#24212f]">

//                         <span className="text-sm font-semibold text-gray-400">
//                           {index + 1}
//                         </span>

//                       </div>

//                     </div>


//                     {/* =================================================
//                         SECTION INFORMATION
//                     ================================================= */}

//                     <div className="min-w-0 flex-1">

//                       <div className="flex flex-wrap items-center gap-3">

//                         <h3 className="font-semibold text-white">
//                           {info.label}
//                         </h3>


//                         {section.enabled ? (
//                           <span className="rounded-md bg-green-500/10 px-2 py-1 text-xs text-green-400">
//                             Visible
//                           </span>
//                         ) : (
//                           <span className="rounded-md bg-gray-500/10 px-2 py-1 text-xs text-gray-500">
//                             Hidden
//                           </span>
//                         )}

//                       </div>


//                       <p className="mt-1 text-sm text-gray-500">
//                         {info.description}
//                       </p>


//                       <p className="mt-2 text-xs text-gray-700">
//                         Section:{" "}
//                         {section.type}
//                       </p>

//                     </div>


//                     {/* =================================================
//                         MOVE CONTROLS
//                     ================================================= */}

//                     <div className="flex items-center gap-2">

//                       <button
//                         type="button"
//                         onClick={() =>
//                           handleMoveUp(
//                             index
//                           )
//                         }
//                         disabled={
//                           index === 0 ||
//                           saving
//                         }
//                         title="Move up"
//                         className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#34313f] text-gray-400 transition hover:bg-[#24212f] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
//                       >

//                         <ArrowUp
//                           size={17}
//                         />

//                       </button>


//                       <button
//                         type="button"
//                         onClick={() =>
//                           handleMoveDown(
//                             index
//                           )
//                         }
//                         disabled={
//                           index ===
//                             sections.length -
//                               1 ||
//                           saving
//                         }
//                         title="Move down"
//                         className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#34313f] text-gray-400 transition hover:bg-[#24212f] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
//                       >

//                         <ArrowDown
//                           size={17}
//                         />

//                       </button>

//                     </div>


//                     {/* =================================================
//                         VISIBILITY TOGGLE
//                     ================================================= */}

//                     <button
//                       type="button"
//                       onClick={() =>
//                         handleToggle(
//                           section
//                         )
//                       }
//                       disabled={
//                         saving
//                       }
//                       className="flex items-center gap-3"
//                     >

//                       <div
//                         className={`relative h-6 w-12 rounded-full transition ${
//                           section.enabled
//                             ? "bg-purple-500"
//                             : "bg-[#34313f]"
//                         }`}
//                       >

//                         <div
//                           className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
//                             section.enabled
//                               ? "left-7"
//                               : "left-1"
//                           }`}
//                         />

//                       </div>


//                       <span className="min-w-[50px] text-left text-sm text-gray-400">
//                         {section.enabled
//                           ? "Visible"
//                           : "Hidden"}
//                       </span>

//                     </button>

//                   </div>

//                 </div>
//               );
//             }
//           )}

//         </div>
//       )}


//       {/* =====================================================
//           UNSAVED CHANGES
//       ===================================================== */}

//       {hasChanges && (

//         <div className="sticky bottom-4 z-20">

//           <div className="rounded-2xl border border-purple-500/20 bg-[#1f1b2e] p-4 shadow-2xl">

//             <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

//               <div className="flex items-center gap-3">

//                 <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-yellow-500/10">

//                   <span className="font-bold text-yellow-400">
//                     !
//                   </span>

//                 </div>


//                 <div>

//                   <p className="text-sm font-medium text-white">
//                     You have unsaved changes
//                   </p>

//                   <p className="mt-1 text-xs text-gray-500">
//                     Save your changes to update the public website.
//                   </p>

//                 </div>

//               </div>


//               <div className="flex items-center gap-3">

//                 <button
//                   type="button"
//                   onClick={
//                     handleDiscard
//                   }
//                   disabled={
//                     saving
//                   }
//                   className="rounded-xl border border-[#34313f] px-4 py-2.5 text-sm font-medium text-gray-300 transition hover:bg-[#24212f] hover:text-white disabled:opacity-50"
//                 >
//                   Discard
//                 </button>


//                 <button
//                   type="button"
//                   onClick={
//                     handleSave
//                   }
//                   disabled={
//                     saving
//                   }
//                   className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-5 py-2.5 font-semibold text-white disabled:opacity-50"
//                 >

//                   {saving ? (
//                     <>
//                       <Loader2
//                         size={17}
//                         className="animate-spin"
//                       />

//                       Saving...
//                     </>
//                   ) : (
//                     <>
//                       <Save
//                         size={17}
//                       />

//                       Save Changes
//                     </>
//                   )}

//                 </button>

//               </div>

//             </div>

//           </div>

//         </div>
//       )}

//     </div>
//   );
// }



import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowDown,
  ArrowUp,
  FileText,
  Loader2,
  Save,
  Settings,
  Home,
  Info,
  BookOpen,
  Users,
  MessageSquare,
  LayoutDashboard,
  LogIn,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  getWebsitePages,
  updateWebsitePages,
} from "../../services/websiteService";

/*
 * Website Pages
 *
 * This component intentionally keeps the existing websiteService API
 * (getWebsiteData / updateSections) so it can replace the old
 * WebsiteSections component without changing the service import.
 */

const PAGE_INFO = {
  home: {
    label: "Home",
    description: "Main institute website homepage.",
    path: "/",
    icon: Home,
    system: false,
  },
  about: {
    label: "About Us",
    description: "Institute information, mission, experience and achievements.",
    path: "/about",
    icon: Info,
    system: false,
  },
  classes: {
    label: "Classes",
    description: "Browse the institute's available classes and courses.",
    path: "/classes",
    icon: BookOpen,
    system: false,
  },
  trainers: {
    label: "Trainers",
    description: "Meet the trainers associated with the institute.",
    path: "/trainers",
    icon: Users,
    system: false,
  },
  testimonials: {
    label: "Testimonials",
    description: "Student reviews, feedback and success stories.",
    path: "/testimonials",
    icon: MessageSquare,
    system: false,
  },
  dashboard: {
    label: "Dashboard",
    description: "Protected institute administration dashboard.",
    path: "/institute/dashboard",
    icon: LayoutDashboard,
    system: true,
  },
  login: {
    label: "Login",
    description: "Institute or student sign-in page.",
    path: "/login",
    icon: LogIn,
    system: true,
  },
};

const PAGE_ALIASES = {
  home: "home",
  hero: "home",
  banner: "home",

  about: "about",
  aboutus: "about",

  classes: "classes",
  class: "classes",
  courses: "classes",
  course: "classes",
  popularclasses: "classes",
  popularclass: "classes",

  trainers: "trainers",
  trainer: "trainers",

  testimonials: "testimonials",
  testimonial: "testimonials",

  dashboard: "dashboard",
  admindashboard: "dashboard",
  institutedashboard: "dashboard",

  login: "login",
  studentlogin: "login",
  student_login: "login",
  institute_login: "login",
};

const DEFAULT_PAGE_ORDER = [
  "home",
  "about",
  "classes",
  "trainers",
  "testimonials",
  "dashboard",
  "login",
];

const normalizePageType = (value) => {
  if (value === null || value === undefined) return "";

  const normalized = String(value)
    .trim()
    .toLowerCase()
    .replace(/[\s_-]+/g, "");

  return PAGE_ALIASES[normalized] || normalized;
};

const normalizeEnabled = (page) => {
  const value = page?.is_enabled ?? page?.enabled ?? true;

  return (
    value === true ||
    value === 1 ||
    value === "1" ||
    String(value).trim().toLowerCase() === "true"
  );
};

const normalizePage = (page, index) => {
  const rawType = page?.section_type ?? page?.type ?? page?.page_type ?? "";
  const type = normalizePageType(rawType);
  const info = PAGE_INFO[type];

  if (!info) return null;

  const rawOrder =
    page?.section_order ?? page?.order ?? page?.display_order ?? index;

  return {
    id: page?.id ?? null,
    type,
    label: info.label,
    description: info.description,
    path: info.path,
    system: info.system,
    enabled: normalizeEnabled(page),
    order: Number.isFinite(Number(rawOrder)) ? Number(rawOrder) : index,
  };
};

const normalizePages = (backendPages) => {
  const received = Array.isArray(backendPages) ? backendPages : [];
  const uniquePages = [];
  const seenTypes = new Set();

  received.forEach((page, index) => {
    const normalized = normalizePage(page, index);

    if (!normalized || seenTypes.has(normalized.type)) return;

    seenTypes.add(normalized.type);
    uniquePages.push(normalized);
  });

  // Add any of the seven supported pages that are not yet in the database.
  DEFAULT_PAGE_ORDER.forEach((type) => {
    if (seenTypes.has(type)) return;

    const info = PAGE_INFO[type];
    uniquePages.push({
      id: null,
      type,
      label: info.label,
      description: info.description,
      path: info.path,
      system: info.system,
      enabled: true,
      order: uniquePages.length,
    });
  });

  return uniquePages
    .sort((a, b) => Number(a.order) - Number(b.order))
    .map((page, index) => ({ ...page, order: index }));
};

const createSavePayload = (pages) =>
  pages.map((page, index) => ({
    id: page.id,
    type: page.type,
    enabled: Boolean(page.enabled),
    order: index,
  }));

export default function WebsitePages() {
  const navigate = useNavigate();

  const [pages, setPages] = useState([]);
  const [originalPages, setOriginalPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    loadPages();
    // Load once when the component mounts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadPages = async () => {
    try {
      setLoading(true);

      const response = await getWebsitePages();
      let data = response;

      if (
        data &&
        typeof data === "object" &&
        !Array.isArray(data) &&
        data.data
      ) {
        data = data.data;
      }

      if (
        data?.data &&
        typeof data.data === "object" &&
        !Array.isArray(data.data)
      ) {
        data = data.data;
      }

      const backendPages = Array.isArray(data?.pages)
        ? data.pages
        : Array.isArray(data?.sections)
          ? data.sections
          : [];

      const normalized = normalizePages(backendPages);

      setPages(normalized);
      setOriginalPages(JSON.parse(JSON.stringify(normalized)));
      setHasChanges(false);
    } catch (error) {
      console.error("FAILED TO LOAD WEBSITE PAGES:", error);
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to load website pages"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = (page) => {
    if (saving) return;

    setPages((previous) =>
      previous.map((item) =>
        item.type === page.type
          ? { ...item, enabled: !item.enabled }
          : item
      )
    );
    setHasChanges(true);
  };

  const movePage = (index, direction) => {
    const targetIndex = index + direction;

    if (
      saving ||
      targetIndex < 0 ||
      targetIndex >= pages.length
    ) {
      return;
    }

    setPages((previous) => {
      const updated = [...previous];
      [updated[index], updated[targetIndex]] = [
        updated[targetIndex],
        updated[index],
      ];

      return updated.map((page, pageIndex) => ({
        ...page,
        order: pageIndex,
      }));
    });

    setHasChanges(true);
  };

  const handleSave = async () => {
    if (!hasChanges || saving) return;

    try {
      setSaving(true);

      const payload = createSavePayload(pages);
      await updateWebsitePages(payload);

      await loadPages();
      toast.success("Website pages saved successfully");
    } catch (error) {
      console.error("FAILED TO SAVE WEBSITE PAGES:", error);
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to save website pages"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDiscard = () => {
    if (!hasChanges) return;

    setPages(JSON.parse(JSON.stringify(originalPages)));
    setHasChanges(false);
    toast.success("Changes discarded");
  };

  const handleReload = () => {
    if (
      hasChanges &&
      !window.confirm("You have unsaved changes. Reload and discard them?")
    ) {
      return;
    }

    loadPages();
  };

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="flex items-center gap-3 text-gray-400">
          <Loader2 size={22} className="animate-spin" />
          <span>Loading website pages...</span>
        </div>
      </div>
    );
  }

  const activeCount = pages.filter((page) => page.enabled).length;
  const inactiveCount = pages.length - activeCount;

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate("/institute/website")}
            disabled={saving}
            className="rounded-xl p-2 text-gray-400 transition hover:bg-[#2a2a35] hover:text-white disabled:opacity-50"
            aria-label="Back to website settings"
          >
            <ArrowLeft size={22} />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <Settings size={22} className="text-purple-400" />
              <h1 className="text-2xl font-bold text-white">
                Website Pages
              </h1>
            </div>
            <p className="mt-1 text-sm text-gray-400">
              Manage the pages available on your institute website.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleReload}
            disabled={saving}
            className="rounded-xl border border-[#34313f] px-4 py-2.5 text-gray-300 transition hover:bg-[#211f29] hover:text-white disabled:opacity-50"
          >
            Reload
          </button>

          {hasChanges && (
            <button
              type="button"
              onClick={handleDiscard}
              disabled={saving}
              className="rounded-xl border border-[#34313f] px-4 py-2.5 text-gray-300 transition hover:bg-[#211f29] hover:text-white disabled:opacity-50"
            >
              Discard
            </button>
          )}

          <button
            type="button"
            onClick={handleSave}
            disabled={saving || !hasChanges}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-5 py-2.5 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save size={18} />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>

      {/* SUMMARY */}
      <div className="rounded-2xl border border-[#2c2c35] bg-[#151519] p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-semibold text-white">Manage Website Pages</h2>
            <p className="mt-1 text-sm text-gray-500">
              Activate or deactivate pages and arrange their display order.
              Inactive public pages should be hidden from website navigation
              and blocked from direct public access.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-xl border border-green-500/20 bg-green-500/10 px-3 py-2">
              <span className="text-sm text-green-400">
                {activeCount} active
              </span>
            </div>
            <div className="rounded-xl border border-gray-500/20 bg-gray-500/10 px-3 py-2">
              <span className="text-sm text-gray-400">
                {inactiveCount} inactive
              </span>
            </div>
            <div className="rounded-xl border border-purple-500/20 bg-purple-500/10 px-3 py-2">
              <span className="text-sm text-purple-400">
                {pages.length} total
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* PAGE LIST */}
      {pages.length === 0 ? (
        <div className="rounded-2xl border border-[#2c2c35] bg-[#151519] p-10 text-center">
          <FileText size={40} className="mx-auto mb-4 text-gray-600" />
          <h2 className="text-lg font-semibold text-white">
            No website pages found
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Your website pages could not be loaded.
          </p>
          <button
            type="button"
            onClick={loadPages}
            className="mt-5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-5 py-2.5 font-semibold text-white"
          >
            Reload
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {pages.map((page, index) => {
            const info = PAGE_INFO[page.type];
            const PageIcon = info?.icon || FileText;

            return (
              <div
                key={page.id ?? page.type}
                className={`rounded-2xl border bg-[#151519] p-5 transition ${
                  page.enabled
                    ? "border-[#2c2c35]"
                    : "border-[#25242c] opacity-70"
                }`}
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
                  {/* ORDER */}
                  <div className="flex items-center gap-3">
                    <div className="text-gray-600">
                      <FileText size={20} />
                    </div>
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#24212f]">
                      <span className="text-sm font-semibold text-gray-400">
                        {index + 1}
                      </span>
                    </div>
                  </div>

                  {/* PAGE DETAILS */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <PageIcon size={19} className="text-purple-400" />
                      <h3 className="font-semibold text-white">{page.label}</h3>
                      {page.enabled ? (
                        <span className="rounded-md bg-green-500/10 px-2 py-1 text-xs text-green-400">
                          Active
                        </span>
                      ) : (
                        <span className="rounded-md bg-gray-500/10 px-2 py-1 text-xs text-gray-500">
                          Inactive
                        </span>
                      )}
                      {page.system && (
                        <span className="rounded-md bg-blue-500/10 px-2 py-1 text-xs text-blue-400">
                          System page
                        </span>
                      )}
                    </div>

                    <p className="mt-1 text-sm text-gray-500">
                      {page.description}
                    </p>
                    <p className="mt-2 text-xs text-gray-600">
                      URL: {page.path}
                    </p>
                  </div>

                  {/* ORDER CONTROLS */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => movePage(index, -1)}
                      disabled={index === 0 || saving}
                      title="Move up"
                      aria-label={`Move ${page.label} up`}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#34313f] text-gray-400 transition hover:bg-[#24212f] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <ArrowUp size={17} />
                    </button>

                    <button
                      type="button"
                      onClick={() => movePage(index, 1)}
                      disabled={index === pages.length - 1 || saving}
                      title="Move down"
                      aria-label={`Move ${page.label} down`}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#34313f] text-gray-400 transition hover:bg-[#24212f] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <ArrowDown size={17} />
                    </button>
                  </div>

                  {/* ACTIVE / INACTIVE */}
                  <button
                    type="button"
                    onClick={() => handleToggle(page)}
                    disabled={saving}
                    aria-pressed={page.enabled}
                    aria-label={`${page.enabled ? "Deactivate" : "Activate"} ${page.label} page`}
                    className="flex items-center gap-3"
                  >
                    <span
                      className={`relative h-6 w-12 rounded-full transition ${
                        page.enabled ? "bg-purple-500" : "bg-[#34313f]"
                      }`}
                    >
                      <span
                        className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                          page.enabled ? "left-7" : "left-1"
                        }`}
                      />
                    </span>
                    <span className="min-w-[65px] text-left text-sm text-gray-400">
                      {page.enabled ? "Active" : "Inactive"}
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* UNSAVED CHANGES */}
      {hasChanges && (
        <div className="sticky bottom-4 z-20">
          <div className="rounded-2xl border border-purple-500/20 bg-[#1f1b2e] p-4 shadow-2xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-yellow-500/10">
                  <span className="font-bold text-yellow-400">!</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">
                    You have unsaved changes
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    Save your changes to update the website page settings.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleDiscard}
                  disabled={saving}
                  className="rounded-xl border border-[#34313f] px-4 py-2.5 text-sm font-medium text-gray-300 transition hover:bg-[#24212f] hover:text-white disabled:opacity-50"
                >
                  Discard
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-5 py-2.5 font-semibold text-white disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <Loader2 size={17} className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={17} />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
