// // src/pages/institute/Website/WebsiteSections.jsx

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
//       "Main banner of your institute website with title, description and CTA.",
//   },

//   about: {
//     label: "About Us",
//     description:
//       "Introduce your institute, mission, experience and achievements.",
//   },

//   courses: {
//     label: "Courses",
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

//   dashboard: {
//     label: "Dashboard",
//     description:
//       "Provide logged-in students with access to their student dashboard.",
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
//    NORMALIZE SECTION TYPE

//    HOME      -> home
//    Home      -> home
//    home      -> home

//    STUDENT_LOGIN -> studentlogin
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
//    CHECK ENABLED VALUE

//    Supports:

//    true
//    false
//    1
//    0
//    "1"
//    "0"
//    "true"
//    "false"
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
//     String(value).toLowerCase() === "true"
//   ) {
//     return true;
//   }

//   return false;
// };


// /* =========================================================
//    NORMALIZE SECTION

//    Backend example:

//    {
//       id: 1,
//       section_type: "HOME",
//       section_order: 0,
//       is_enabled: 1
//    }

//    Frontend:

//    {
//       id: 1,
//       type: "home",
//       label: "Home",
//       enabled: true,
//       order: 0
//    }
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
//         "Website section",
//     };


//   const rawOrder =
//     section?.section_order ??
//     section?.order ??
//     index;


//   return {
//     id: section?.id,

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
//       Number(rawOrder) || 0,

//     /*
//      * Keep original backend data.
//      * This is useful if content is required later.
//      */
//     content:
//       section?.content || {},
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


//   const REMOVED_SECTION_TYPES = new Set([
//     "gallery",
//     "contact",
//     "batches",
//   ]);


//   const filteredSections = backendSections
//     .filter((section) => {
//       const rawType =
//         section?.section_type ??
//         section?.type ??
//         "";

//       return !REMOVED_SECTION_TYPES.has(
//         normalizeSectionType(rawType)
//       );
//     });

//   const normalized = filteredSections
//     .map(normalizeSection);

//   /*
//    * Sessions and Dashboard are student-facing navigation pages.
//    * If the backend already has these sections, use them.
//    * Otherwise add frontend-only entries so they are still visible
//    * in the section manager without sending invalid/null ids
//    * to updateSections().
//    */
//   const hasSessions = normalized.some(
//     (section) => section.type === "sessions"
//   );

//   if (!hasSessions) {
//     normalized.push({
//       id: null,
//       type: "sessions",
//       label: SECTION_INFO.sessions.label,
//       description: SECTION_INFO.sessions.description,
//       enabled: true,
//       order: normalized.length,
//       content: {},
//       frontendOnly: true,
//     });
//   }

//   const hasDashboard = normalized.some(
//     (section) => section.type === "dashboard"
//   );

//   if (!hasDashboard) {
//     normalized.push({
//       id: null,
//       type: "dashboard",
//       label: SECTION_INFO.dashboard.label,
//       description: SECTION_INFO.dashboard.description,
//       enabled: true,
//       order: normalized.length,
//       content: {},
//       frontendOnly: true,
//     });
//   }

//   /*
//    * Categories is a website-facing section.
//    * If the backend has not created a categories section yet,
//    * add a frontend-only entry so it appears in the section manager.
//    */
//   const hasCategories = normalized.some(
//     (section) => section.type === "categories"
//   );

//   if (!hasCategories) {
//     normalized.push({
//       id: null,
//       type: "categories",
//       label: SECTION_INFO.categories.label,
//       description: SECTION_INFO.categories.description,
//       enabled: true,
//       order: normalized.length,
//       content: {},
//       frontendOnly: true,
//     });
//   }

//   return normalized
//     .sort(
//       (a, b) =>
//         Number(a.order) -
//         Number(b.order)
//     )
//     .map(
//       (section, index) => ({
//         ...section,
//         order: index,
//       })
//     );
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
//      LOAD SECTIONS
//   ======================================================= */

//   useEffect(() => {

//     loadSections();

//   }, []);


//   /* =======================================================
//      LOAD FROM API
//   ======================================================= */

//   const loadSections = async () => {

//     try {

//       setLoading(true);


//       const response =
//         await getWebsiteData();


//       console.log(
//         "======================================"
//       );

//       console.log(
//         "WEBSITE SECTIONS RESPONSE"
//       );

//       console.log(
//         "Website Data:",
//         response
//       );


//       /*
//        * Handle different response structures.
//        */

//       let data =
//         response;


//       /*
//        * Axios response:
//        *
//        * {
//        *   data: {...}
//        * }
//        */

//       if (
//         data &&
//         typeof data === "object" &&
//         !Array.isArray(data) &&
//         data.data
//       ) {

//         data =
//           data.data;

//       }


//       /*
//        * API wrapper:
//        *
//        * {
//        *   success: true,
//        *   data: {...}
//        * }
//        */

//       if (
//         data?.data &&
//         typeof data.data ===
//           "object" &&
//         !Array.isArray(data.data)
//       ) {

//         data =
//           data.data;

//       }


//       console.log(
//         "NORMALIZED WEBSITE DATA:",
//         data
//       );


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


//       setHasChanges(
//         false
//       );

//     } catch (error) {

//       console.error(
//         "Failed to load website sections:",
//         error
//       );


//       toast.error(
//         error?.response?.data?.message ||
//         error?.message ||
//         "Failed to load website sections"
//       );

//     } finally {

//       setLoading(false);

//     }

//   };


//   /* =======================================================
//      TOGGLE SECTION
//   ======================================================= */

//   const handleToggle = (
//     sectionId,
//     sectionType
//   ) => {

//     setSections(
//       (previous) =>
//         previous.map(
//           (section) => {

//             const sameSection =
//               section.frontendOnly
//                 ? section.type === sectionType
//                 : Number(section.id) === Number(sectionId);

//             if (!sameSection) {
//               return section;
//             }

//             return {
//               ...section,
//               enabled: !section.enabled,
//             };
//           }
//         )
//     );

//     setHasChanges(true);
//   };


//   /* =======================================================
//      MOVE UP
//   ======================================================= */

//   const handleMoveUp = (
//     index
//   ) => {

//     if (
//       index <= 0
//     ) {
//       return;
//     }


//     setSections(
//       (previous) => {

//         const updated = [
//           ...previous,
//         ];


//         const current =
//           updated[index];


//         updated[index] =
//           updated[index - 1];


//         updated[index - 1] =
//           current;


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
//       sections.length - 1
//     ) {
//       return;
//     }


//     setSections(
//       (previous) => {

//         const updated = [
//           ...previous,
//         ];


//         const current =
//           updated[index];


//         updated[index] =
//           updated[index + 1];


//         updated[index + 1] =
//           current;


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
//      SAVE SECTIONS
//   ======================================================= */

//   const handleSave = async () => {

//     try {

//       setSaving(true);


//       /*
//        * Backend payload.
//        */

//       const payload =
//         sections
//           .filter(
//             (section) =>
//               !section.frontendOnly &&
//               section.id !== null &&
//               section.id !== undefined
//           )
//           .map(
//             (
//               section,
//               index
//             ) => ({
//               id:
//                 section.id,

//               type:
//                 section.type,

//               enabled:
//                 Boolean(
//                   section.enabled
//                 ),

//               order:
//                 index,
//             })
//           );


//       console.log(
//         "======================================"
//       );

//       console.log(
//         "SAVING WEBSITE SECTIONS"
//       );

//       console.log(
//         "Payload:",
//         payload
//       );


//       const response =
//         await updateSections(
//           payload
//         );


//       console.log(
//         "UPDATE RESPONSE:",
//         response
//       );


//       /*
//        * Reload from database.
//        */

//       await loadSections();


//       setHasChanges(
//         false
//       );


//       toast.success(
//         "Website sections saved successfully"
//       );

//     } catch (error) {

//       console.error(
//         "Failed to save website sections:",
//         error
//       );


//       toast.error(
//         error?.response?.data?.message ||
//         error?.message ||
//         "Failed to save website sections"
//       );

//     } finally {

//       setSaving(false);

//     }

//   };


//   /* =======================================================
//      DISCARD
//   ======================================================= */

//   const handleDiscard = async () => {

//     if (
//       !hasChanges
//     ) {
//       return;
//     }


//     await loadSections();


//     toast.success(
//       "Changes discarded"
//     );

//   };


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
//             Loading website sections...
//           </span>

//         </div>

//       </div>

//     );

//   }


//   /* =======================================================
//      ENABLED COUNT
//   ======================================================= */

//   const enabledCount =
//     sections.filter(
//       (section) =>
//         section.enabled
//     ).length;


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

//               <Settings
//                 size={22}
//                 className="text-purple-400"
//               />

//               <h1 className="text-2xl font-bold text-white">
//                 Website Sections
//               </h1>

//             </div>


//             <p className="text-sm text-gray-400 mt-1">
//               Choose which sections appear on your website and arrange their order.
//             </p>

//           </div>

//         </div>


//         {/* ACTIONS */}

//         <div className="flex items-center gap-3">

//           {hasChanges && (

//             <button
//               type="button"
//               onClick={
//                 handleDiscard
//               }
//               disabled={
//                 saving
//               }
//               className="px-4 py-2.5 rounded-xl border border-[#34313f] text-gray-300 hover:bg-[#211f29] transition disabled:opacity-50"
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
//           INFO CARD
//       ===================================================== */}

//       <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-5">

//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

//           <div>

//             <h2 className="text-white font-semibold">
//               Manage Website Sections
//             </h2>

//             <p className="text-sm text-gray-500 mt-1">
//               Disabled sections will not appear on your public website.
//             </p>

//           </div>


//           <div className="flex items-center gap-3">

//             <div className="px-3 py-2 rounded-xl bg-green-500/10 border border-green-500/20">

//               <span className="text-sm text-green-400">

//                 {enabledCount}
//                 {" enabled"}

//               </span>

//             </div>


//             <div className="px-3 py-2 rounded-xl bg-gray-500/10 border border-gray-500/20">

//               <span className="text-sm text-gray-400">

//                 {sections.length}
//                 {" total"}

//               </span>

//             </div>

//           </div>

//         </div>

//       </div>


//       {/* =====================================================
//           EMPTY STATE
//       ===================================================== */}

//       {sections.length === 0 ? (

//         <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-10 text-center">

//           <Settings
//             size={40}
//             className="mx-auto text-gray-600 mb-4"
//           />


//           <h2 className="text-lg font-semibold text-white">
//             No sections found
//           </h2>


//           <p className="text-sm text-gray-500 mt-2">
//             Your website sections have not been configured yet.
//           </p>


//           <button
//             type="button"
//             onClick={
//               loadSections
//             }
//             className="mt-5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold"
//           >
//             Reload
//           </button>

//         </div>

//       ) : (

//         /* =====================================================
//            SECTION LIST
//         ===================================================== */

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
//                     "Website section",
//                 };


//               return (

//                 <div
//                   key={
//                     section.id ??
//                     `${section.type}-${index}`
//                   }
//                   className={`bg-[#151519] border rounded-2xl p-5 transition ${
//                     section.enabled
//                       ? "border-[#2c2c35]"
//                       : "border-[#25242c] opacity-70"
//                   }`}
//                 >

//                   <div className="flex flex-col lg:flex-row lg:items-center gap-5">

//                     {/* ======================================
//                         ORDER
//                     ====================================== */}

//                     <div className="flex items-center gap-3">

//                       <div className="text-gray-600 cursor-grab">

//                         <GripVertical
//                           size={20}
//                         />

//                       </div>


//                       <div className="w-9 h-9 rounded-xl bg-[#24212f] flex items-center justify-center">

//                         <span className="text-sm font-semibold text-gray-400">
//                           {index + 1}
//                         </span>

//                       </div>

//                     </div>


//                     {/* ======================================
//                         SECTION INFO
//                     ====================================== */}

//                     <div className="flex-1 min-w-0">

//                       <div className="flex items-center gap-3 flex-wrap">

//                         <h3 className="text-white font-semibold">

//                           {info.label}

//                         </h3>


//                         {section.enabled ? (

//                           <span className="px-2 py-1 rounded-md bg-green-500/10 text-green-400 text-xs">
//                             Visible
//                           </span>

//                         ) : (

//                           <span className="px-2 py-1 rounded-md bg-gray-500/10 text-gray-500 text-xs">
//                             Hidden
//                           </span>

//                         )}

//                         {section.frontendOnly && (
//                           <span className="px-2 py-1 rounded-md bg-blue-500/10 text-blue-400 text-xs">
//                             Navigation
//                           </span>
//                         )}

//                       </div>


//                       <p className="text-sm text-gray-500 mt-1">

//                         {info.description}

//                       </p>


//                       <p className="text-xs text-gray-700 mt-2">

//                         Section:
//                         {" "}
//                         {section.type}

//                       </p>

//                       {section.frontendOnly && (
//                         <p className="text-xs text-blue-400/70 mt-1">
//                           {section.type === "dashboard"
//                             ? "Dashboard is available for logged-in students."
//                             : "Sessions are available to students."}
//                         </p>
//                       )}

//                     </div>


//                     {/* ======================================
//                         MOVE BUTTONS
//                     ====================================== */}

//                     <div className="flex items-center gap-2">

//                       <button
//                         type="button"
//                         onClick={() =>
//                           handleMoveUp(
//                             index
//                           )
//                         }
//                         disabled={
//                           index ===
//                             0 ||
//                           saving
//                         }
//                         title="Move up"
//                         className="w-9 h-9 rounded-lg border border-[#34313f] text-gray-400 hover:bg-[#24212f] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center"
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
//                         className="w-9 h-9 rounded-lg border border-[#34313f] text-gray-400 hover:bg-[#24212f] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center"
//                       >

//                         <ArrowDown
//                           size={17}
//                         />

//                       </button>

//                     </div>


//                     {/* ======================================
//                         VISIBILITY TOGGLE
//                     ====================================== */}

//                     <button
//                       type="button"
//                       onClick={() =>
//                         handleToggle(
//                           section.id,
//                           section.type
//                         )
//                       }
//                       disabled={
//                         saving
//                       }
//                       className="flex items-center gap-3"
//                     >

//                       <div
//                         className={`relative w-12 h-6 rounded-full transition ${
//                           section.enabled
//                             ? "bg-purple-500"
//                             : "bg-[#34313f]"
//                         }`}
//                       >

//                         <div
//                           className={`absolute top-1 w-4 h-4 rounded-full bg-white transition ${
//                             section.enabled
//                               ? "left-7"
//                               : "left-1"
//                           }`}
//                         />

//                       </div>


//                       <span className="text-sm text-gray-400 min-w-[50px] text-left">

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
//           UNSAVED CHANGES BAR
//       ===================================================== */}

//       {hasChanges && (

//         <div className="sticky bottom-4 z-20">

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
//                     You have unsaved changes
//                   </p>


//                   <p className="text-gray-500 text-xs mt-1">
//                     Save your changes to update the public website.
//                   </p>

//                 </div>

//               </div>


//               <button
//                 type="button"
//                 onClick={
//                   handleSave
//                 }
//                 disabled={
//                   saving
//                 }
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

//                     Save Changes

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
//       "Main banner of your institute website with title, description and CTA.",
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

//   dashboard: {
//     label: "Dashboard",
//     description:
//       "Provide logged-in students with access to their student dashboard.",
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

//    All possible backend/frontend names are converted
//    to one standard type.
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

//   dashboard: "dashboard",

//   testimonials: "testimonials",
//   testimonial: "testimonials",

//   studentlogin: "studentlogin",
// };


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
//     String(value).trim().toLowerCase() ===
//       "true"
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
//     normalizeSectionType(rawType);

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
//     id: section?.id ?? null,

//     type,

//     label: info.label,

//     description:
//       info.description,

//     enabled:
//       normalizeEnabled(section),

//     order:
//       Number.isFinite(
//         Number(rawOrder)
//       )
//         ? Number(rawOrder)
//         : index,

//     content:
//       section?.content || {},

//     frontendOnly:
//       Boolean(section?.frontendOnly),
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

//   const REMOVED_SECTION_TYPES =
//     new Set([
//       "gallery",
//       "contact",
//       "batches",
//     ]);

//   const normalized =
//     backendSections
//       .filter((section) => {
//         const rawType =
//           section?.section_type ??
//           section?.type ??
//           "";

//         const type =
//           normalizeSectionType(
//             rawType
//           );

//         return !REMOVED_SECTION_TYPES.has(
//           type
//         );
//       })
//       .map(normalizeSection);

//   /*
//    * Only add frontend-only entries if they
//    * don't already exist in the backend.
//    *
//    * These entries are NOT persisted through
//    * updateSections().
//    */

//   const addFrontendSection = (
//     type
//   ) => {
//     const exists =
//       normalized.some(
//         (section) =>
//           section.type === type
//       );

//     if (exists) {
//       return;
//     }

//     normalized.push({
//       id: null,

//       type,

//       label:
//         SECTION_INFO[type].label,

//       description:
//         SECTION_INFO[type]
//           .description,

//       enabled: true,

//       order:
//         normalized.length,

//       content: {},

//       frontendOnly: true,
//     });
//   };


//   addFrontendSection("sessions");

//   addFrontendSection("dashboard");

//   addFrontendSection("categories");


//   return normalized
//     .sort(
//       (a, b) =>
//         Number(a.order) -
//         Number(b.order)
//     )
//     .map(
//       (section, index) => ({
//         ...section,

//         order: index,
//       })
//     );
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
//      LOAD
//   ======================================================= */

//   useEffect(() => {
//     loadSections();
//   }, []);


//   /* =======================================================
//      LOAD SECTIONS
//   ======================================================= */

//   const loadSections = async () => {
//     try {
//       setLoading(true);

//       const response =
//         await getWebsiteData();

//       console.log(
//         "WEBSITE DATA:",
//         response
//       );

//       let data = response;

//       if (
//         data &&
//         typeof data === "object" &&
//         !Array.isArray(data) &&
//         data.data
//       ) {
//         data = data.data;
//       }

//       if (
//         data?.data &&
//         typeof data.data ===
//           "object" &&
//         !Array.isArray(data.data)
//       ) {
//         data = data.data;
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

//       setHasChanges(false);
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
//       setLoading(false);
//     }
//   };


//   /* =======================================================
//      TOGGLE
//   ======================================================= */

//   const handleToggle = (
//     sectionId,
//     sectionType
//   ) => {
//     setSections(
//       (previous) =>
//         previous.map(
//           (section) => {
//             const sameSection =
//               section.frontendOnly
//                 ? section.type ===
//                   sectionType
//                 : Number(section.id) ===
//                   Number(sectionId);

//             if (!sameSection) {
//               return section;
//             }

//             return {
//               ...section,

//               enabled:
//                 !section.enabled,
//             };
//           }
//         )
//     );

//     setHasChanges(true);
//   };


//   /* =======================================================
//      MOVE UP
//   ======================================================= */

//   const handleMoveUp = (
//     index
//   ) => {
//     if (index <= 0) {
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

//     setHasChanges(true);
//   };


//   /* =======================================================
//      MOVE DOWN
//   ======================================================= */

//   const handleMoveDown = (
//     index
//   ) => {
//     if (
//       index >=
//       sections.length - 1
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

//     setHasChanges(true);
//   };


//   /* =======================================================
//      SAVE
//   ======================================================= */

//   const handleSave = async () => {
//     try {
//       setSaving(true);

//       /*
//        * Only actual database sections are sent.
//        *
//        * frontendOnly sections are display-only.
//        */

//       const payload =
//         sections
//           .filter(
//             (section) =>
//               !section.frontendOnly &&
//               section.id !== null &&
//               section.id !== undefined
//           )
//           .map(
//             (
//               section,
//               index
//             ) => ({
//               id:
//                 section.id,

//               type:
//                 section.type,

//               enabled:
//                 Boolean(
//                   section.enabled
//                 ),

//               order:
//                 index,
//             })
//           );

//       console.log(
//         "SAVING SECTION PAYLOAD:",
//         payload
//       );

//       const response =
//         await updateSections(
//           payload
//         );

//       console.log(
//         "UPDATE SECTIONS RESPONSE:",
//         response
//       );

//       await loadSections();

//       setHasChanges(false);

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
//       setSaving(false);
//     }
//   };


//   /* =======================================================
//      DISCARD
//   ======================================================= */

//   const handleDiscard = async () => {
//     if (!hasChanges) {
//       return;
//     }

//     await loadSections();

//     toast.success(
//       "Changes discarded"
//     );
//   };


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
//             Loading website sections...
//           </span>
//         </div>
//       </div>
//     );
//   }


//   /* =======================================================
//      ENABLED COUNT
//   ======================================================= */

//   const enabledCount =
//     sections.filter(
//       (section) =>
//         section.enabled
//     ).length;


//   /* =======================================================
//      PAGE
//   ======================================================= */

//   return (
//     <div className="space-y-6">

//       {/* HEADER */}

//       <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

//         <div className="flex items-center gap-4">

//           <button
//             type="button"
//             onClick={() =>
//               navigate(
//                 "/institute/website"
//               )
//             }
//             className="rounded-xl p-2 text-gray-400 transition hover:bg-[#2a2a35] hover:text-white"
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


//         {/* ACTIONS */}

//         <div className="flex items-center gap-3">

//           {hasChanges && (
//             <button
//               type="button"
//               onClick={
//                 handleDiscard
//               }
//               disabled={saving}
//               className="rounded-xl border border-[#34313f] px-4 py-2.5 text-gray-300 transition hover:bg-[#211f29] disabled:opacity-50"
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


//       {/* INFO */}

//       <div className="rounded-2xl border border-[#2c2c35] bg-[#151519] p-5">

//         <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

//           <div>

//             <h2 className="font-semibold text-white">
//               Manage Website Sections
//             </h2>

//             <p className="mt-1 text-sm text-gray-500">
//               Hidden sections will not appear on your public website.
//             </p>

//           </div>

//           <div className="flex items-center gap-3">

//             <div className="rounded-xl border border-green-500/20 bg-green-500/10 px-3 py-2">

//               <span className="text-sm text-green-400">
//                 {enabledCount} enabled
//               </span>

//             </div>

//             <div className="rounded-xl border border-gray-500/20 bg-gray-500/10 px-3 py-2">

//               <span className="text-sm text-gray-400">
//                 {sections.length} total
//               </span>

//             </div>

//           </div>

//         </div>

//       </div>


//       {/* EMPTY */}

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

//         /* SECTION LIST */

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
//                     "Website section",
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

//                     {/* ORDER */}

//                     <div className="flex items-center gap-3">

//                       <div className="cursor-grab text-gray-600">
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


//                     {/* INFO */}

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

//                         {section.frontendOnly && (
//                           <span className="rounded-md bg-blue-500/10 px-2 py-1 text-xs text-blue-400">
//                             Navigation
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


//                     {/* MOVE */}

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
//                         className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#34313f] text-gray-400 hover:bg-[#24212f] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
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
//                         className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#34313f] text-gray-400 hover:bg-[#24212f] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
//                       >
//                         <ArrowDown
//                           size={17}
//                         />
//                       </button>

//                     </div>


//                     {/* VISIBILITY */}

//                     <button
//                       type="button"
//                       onClick={() =>
//                         handleToggle(
//                           section.id,
//                           section.type
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


//       {/* UNSAVED */}

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

//               <button
//                 type="button"
//                 onClick={
//                   handleSave
//                 }
//                 disabled={saving}
//                 className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-5 py-2.5 font-semibold text-white disabled:opacity-50"
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

//                     Save Changes
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



import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  ArrowDown,
  ArrowUp,
  GripVertical,
  Loader2,
  Save,
  Settings,
} from "lucide-react";

import toast from "react-hot-toast";

import {
  getWebsiteData,
  updateSections,
} from "../../services/websiteService";


/* =========================================================
   SECTION INFORMATION
========================================================= */

const SECTION_INFO = {
  home: {
    label: "Home",
    description:
      "Main homepage section of your institute website.",
  },

  about: {
    label: "About Us",
    description:
      "Introduce your institute, mission, experience and achievements.",
  },

  courses: {
    label: "Popular Classes",
    description:
      "Display your institute classes and available courses.",
  },

  categories: {
    label: "Categories",
    description:
      "Display categories available in your institute.",
  },

  trainers: {
    label: "Trainers",
    description:
      "Show trainers associated with your institute.",
  },

  sessions: {
    label: "Sessions",
    description:
      "Display upcoming and scheduled sessions for your institute.",
  },

  testimonials: {
    label: "Testimonials",
    description:
      "Display student reviews and testimonials.",
  },

  studentlogin: {
    label: "Student Login",
    description:
      "Provide students with access to the student login page.",
  },
};


/* =========================================================
   SECTION TYPE ALIASES
========================================================= */

const SECTION_ALIASES = {
  home: "home",
  hero: "home",
  banner: "home",

  about: "about",
  aboutus: "about",

  courses: "courses",
  course: "courses",
  classes: "courses",
  class: "courses",
  popularclasses: "courses",
  popularclass: "courses",
  popularclassessection: "courses",

  categories: "categories",
  category: "categories",

  trainers: "trainers",
  trainer: "trainers",

  sessions: "sessions",
  session: "sessions",

  testimonials: "testimonials",
  testimonial: "testimonials",

  studentlogin: "studentlogin",
  student_login: "studentlogin",
};


/* =========================================================
   DEFAULT SECTION ORDER
========================================================= */

const DEFAULT_SECTION_ORDER = [
  "home",
  "about",
  "courses",
  "categories",
  "trainers",
  "sessions",
  "testimonials",
  "studentlogin",
];


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

  const normalized = String(value)
    .trim()
    .toLowerCase()
    .replace(/[\s_-]+/g, "");

  return (
    SECTION_ALIASES[normalized] ||
    normalized
  );
};


/* =========================================================
   NORMALIZE ENABLED VALUE
========================================================= */

const normalizeEnabled = (section) => {
  const value =
    section?.is_enabled ??
    section?.enabled ??
    true;

  if (
    value === true ||
    value === 1 ||
    value === "1" ||
    String(value)
      .trim()
      .toLowerCase() === "true"
  ) {
    return true;
  }

  return false;
};


/* =========================================================
   NORMALIZE SECTION
========================================================= */

const normalizeSection = (
  section,
  index
) => {
  const rawType =
    section?.section_type ??
    section?.type ??
    "";

  const type =
    normalizeSectionType(
      rawType
    );

  const info =
    SECTION_INFO[type] || {
      label:
        rawType || "Section",

      description:
        "Website section.",
    };

  const rawOrder =
    section?.section_order ??
    section?.order ??
    index;

  return {
    id:
      section?.id ??
      null,

    type,

    label:
      info.label,

    description:
      info.description,

    enabled:
      normalizeEnabled(
        section
      ),

    order:
      Number.isFinite(
        Number(rawOrder)
      )
        ? Number(rawOrder)
        : index,
  };
};


/* =========================================================
   NORMALIZE ALL SECTIONS
========================================================= */

const normalizeSections = (
  backendSections
) => {
  if (
    !Array.isArray(
      backendSections
    )
  ) {
    return [];
  }

  const normalized =
    backendSections
      .map(
        (
          section,
          index
        ) =>
          normalizeSection(
            section,
            index
          )
      )
      .filter(
        (section) =>
          section.type
      );


  /*
   * Remove duplicate section types.
   *
   * This protects the UI if old database
   * records contain aliases such as:
   *
   * classes + courses
   * hero + home
   */

  const uniqueSections =
    [];

  const seenTypes =
    new Set();


  for (
    const section of
      normalized
  ) {

    if (
      seenTypes.has(
        section.type
      )
    ) {
      continue;
    }

    seenTypes.add(
      section.type
    );

    uniqueSections.push(
      section
    );
  }


  /*
   * If a supported section does not
   * exist in the database, show it
   * in the dashboard.
   *
   * IMPORTANT:
   * These are not frontendOnly.
   *
   * They will be created by
   * updateSectionsService().
   */

  for (
    const type of
      DEFAULT_SECTION_ORDER
  ) {

    const exists =
      uniqueSections.some(
        (section) =>
          section.type ===
          type
      );

    if (
      exists
    ) {
      continue;
    }

    uniqueSections.push({
      id:
        null,

      type,

      label:
        SECTION_INFO[type]
          .label,

      description:
        SECTION_INFO[type]
          .description,

      enabled:
        true,

      order:
        uniqueSections.length,
    });
  }


  return uniqueSections
    .sort(
      (a, b) =>
        Number(a.order) -
        Number(b.order)
    )
    .map(
      (
        section,
        index
      ) => ({
        ...section,

        order:
          index,
      })
    );
};


/* =========================================================
   CREATE SAVE PAYLOAD
========================================================= */

const createSavePayload = (
  sections
) => {
  return sections.map(
    (
      section,
      index
    ) => ({
      /*
       * Keep ID when it exists.
       *
       * If ID is null, backend will
       * create the section using type.
       */

      id:
        section.id,

      type:
        section.type,

      enabled:
        Boolean(
          section.enabled
        ),

      order:
        index,
    })
  );
};


/* =========================================================
   COMPONENT
========================================================= */

export default function WebsiteSections() {
  const navigate =
    useNavigate();


  /* =======================================================
     STATE
  ======================================================= */

  const [
    sections,
    setSections,
  ] = useState([]);

  const [
    originalSections,
    setOriginalSections,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    saving,
    setSaving,
  ] = useState(false);

  const [
    hasChanges,
    setHasChanges,
  ] = useState(false);


  /* =======================================================
     LOAD ON MOUNT
  ======================================================= */

  useEffect(() => {
    loadSections();
  }, []);


  /* =======================================================
     LOAD WEBSITE SECTIONS
  ======================================================= */

  const loadSections = async () => {
    try {

      setLoading(
        true
      );


      const response =
        await getWebsiteData();


      console.log(
        "=========================================="
      );

      console.log(
        "WEBSITE DATA"
      );

      console.log(
        response
      );

      console.log(
        "=========================================="
      );


      /*
       * API service normally returns
       * response.data.data directly.
       *
       * These checks also support
       * older response structures.
       */

      let data =
        response;


      if (
        data &&
        typeof data ===
          "object" &&
        !Array.isArray(data) &&
        data.data
      ) {

        data =
          data.data;
      }


      if (
        data?.data &&
        typeof data.data ===
          "object" &&
        !Array.isArray(
          data.data
        )
      ) {

        data =
          data.data;
      }


      const backendSections =
        Array.isArray(
          data?.sections
        )
          ? data.sections
          : [];


      console.log(
        "BACKEND SECTIONS:",
        backendSections
      );


      const normalizedSections =
        normalizeSections(
          backendSections
        );


      console.log(
        "NORMALIZED SECTIONS:",
        normalizedSections
      );


      setSections(
        normalizedSections
      );


      /*
       * Keep a separate snapshot
       * for discard functionality.
       */

      setOriginalSections(
        JSON.parse(
          JSON.stringify(
            normalizedSections
          )
        )
      );


      setHasChanges(
        false
      );

    } catch (error) {

      console.error(
        "FAILED TO LOAD WEBSITE SECTIONS:",
        error
      );


      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to load website sections"
      );

    } finally {

      setLoading(
        false
      );
    }
  };


  /* =======================================================
     TOGGLE VISIBILITY
  ======================================================= */

  const handleToggle = (
    section
  ) => {

    if (
      saving
    ) {
      return;
    }


    setSections(
      (previous) =>
        previous.map(
          (item) => {

            const sameSection =
              item.type ===
              section.type;


            if (
              !sameSection
            ) {
              return item;
            }


            return {
              ...item,

              enabled:
                !item.enabled,
            };
          }
        )
    );


    setHasChanges(
      true
    );
  };


  /* =======================================================
     MOVE UP
  ======================================================= */

  const handleMoveUp = (
    index
  ) => {

    if (
      index <= 0 ||
      saving
    ) {
      return;
    }


    setSections(
      (previous) => {

        const updated = [
          ...previous,
        ];


        [
          updated[index - 1],
          updated[index],
        ] = [
          updated[index],
          updated[index - 1],
        ];


        return updated.map(
          (
            section,
            sectionIndex
          ) => ({
            ...section,

            order:
              sectionIndex,
          })
        );
      }
    );


    setHasChanges(
      true
    );
  };


  /* =======================================================
     MOVE DOWN
  ======================================================= */

  const handleMoveDown = (
    index
  ) => {

    if (
      index >=
        sections.length -
          1 ||
      saving
    ) {
      return;
    }


    setSections(
      (previous) => {

        const updated = [
          ...previous,
        ];


        [
          updated[index],
          updated[index + 1],
        ] = [
          updated[index + 1],
          updated[index],
        ];


        return updated.map(
          (
            section,
            sectionIndex
          ) => ({
            ...section,

            order:
              sectionIndex,
          })
        );
      }
    );


    setHasChanges(
      true
    );
  };


  /* =======================================================
     SAVE
  ======================================================= */

  const handleSave = async () => {

    if (
      !hasChanges
    ) {
      return;
    }


    try {

      setSaving(
        true
      );


      const payload =
        createSavePayload(
          sections
        );


      console.log(
        "=========================================="
      );

      console.log(
        "SAVING WEBSITE SECTIONS"
      );

      console.log(
        payload
      );

      console.log(
        "=========================================="
      );


      const response =
        await updateSections(
          payload
        );


      console.log(
        "UPDATE SECTIONS RESPONSE:",
        response
      );


      /*
       * Reload from database.
       *
       * This is important because newly
       * created sections receive database IDs.
       */

      await loadSections();


      toast.success(
        "Website sections saved successfully"
      );

    } catch (error) {

      console.error(
        "FAILED TO SAVE WEBSITE SECTIONS:",
        error
      );


      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to save website sections"
      );

    } finally {

      setSaving(
        false
      );
    }
  };


  /* =======================================================
     DISCARD
  ======================================================= */

  const handleDiscard = () => {

    if (
      !hasChanges
    ) {
      return;
    }


    setSections(
      JSON.parse(
        JSON.stringify(
          originalSections
        )
      )
    );


    setHasChanges(
      false
    );


    toast.success(
      "Changes discarded"
    );
  };


  /* =======================================================
     RELOAD
  ======================================================= */

  const handleReload = () => {

    if (
      hasChanges
    ) {

      const confirmed =
        window.confirm(
          "You have unsaved changes. Reload and discard them?"
        );


      if (
        !confirmed
      ) {
        return;
      }
    }


    loadSections();
  };


  /* =======================================================
     LOADING
  ======================================================= */

  if (
    loading
  ) {

    return (
      <div className="min-h-[400px] flex items-center justify-center">

        <div className="flex items-center gap-3 text-gray-400">

          <Loader2
            size={22}
            className="animate-spin"
          />

          <span>
            Loading website sections...
          </span>

        </div>

      </div>
    );
  }


  /* =======================================================
     COUNTS
  ======================================================= */

  const enabledCount =
    sections.filter(
      (section) =>
        section.enabled
    ).length;


  const hiddenCount =
    sections.filter(
      (section) =>
        !section.enabled
    ).length;


  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <div className="space-y-6">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div className="flex items-center gap-4">

          <button
            type="button"
            onClick={() =>
              navigate(
                "/institute/website"
              )
            }
            disabled={saving}
            className="rounded-xl p-2 text-gray-400 transition hover:bg-[#2a2a35] hover:text-white disabled:opacity-50"
          >

            <ArrowLeft
              size={22}
            />

          </button>


          <div>

            <div className="flex items-center gap-2">

              <Settings
                size={22}
                className="text-purple-400"
              />

              <h1 className="text-2xl font-bold text-white">
                Website Sections
              </h1>

            </div>


            <p className="mt-1 text-sm text-gray-400">
              Choose which sections appear on your website and arrange their order.
            </p>

          </div>

        </div>


        {/* =================================================
            ACTIONS
        ================================================= */}

        <div className="flex items-center gap-3">

          <button
            type="button"
            onClick={
              handleReload
            }
            disabled={saving}
            className="rounded-xl border border-[#34313f] px-4 py-2.5 text-gray-300 transition hover:bg-[#211f29] hover:text-white disabled:opacity-50"
          >
            Reload
          </button>


          {hasChanges && (
            <button
              type="button"
              onClick={
                handleDiscard
              }
              disabled={saving}
              className="rounded-xl border border-[#34313f] px-4 py-2.5 text-gray-300 transition hover:bg-[#211f29] hover:text-white disabled:opacity-50"
            >
              Discard
            </button>
          )}


          <button
            type="button"
            onClick={
              handleSave
            }
            disabled={
              saving ||
              !hasChanges
            }
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-5 py-2.5 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
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


      {/* =====================================================
          INFO
      ===================================================== */}

      <div className="rounded-2xl border border-[#2c2c35] bg-[#151519] p-5">

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div>

            <h2 className="font-semibold text-white">
              Manage Website Sections
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Turn sections on or off and change their display order. Hidden sections will not appear in the website preview.
            </p>

          </div>


          <div className="flex items-center gap-3">

            {/* ENABLED */}

            <div className="rounded-xl border border-green-500/20 bg-green-500/10 px-3 py-2">

              <span className="text-sm text-green-400">
                {enabledCount} visible
              </span>

            </div>


            {/* HIDDEN */}

            <div className="rounded-xl border border-gray-500/20 bg-gray-500/10 px-3 py-2">

              <span className="text-sm text-gray-400">
                {hiddenCount} hidden
              </span>

            </div>


            {/* TOTAL */}

            <div className="rounded-xl border border-purple-500/20 bg-purple-500/10 px-3 py-2">

              <span className="text-sm text-purple-400">
                {sections.length} total
              </span>

            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          EMPTY STATE
      ===================================================== */}

      {sections.length === 0 ? (

        <div className="rounded-2xl border border-[#2c2c35] bg-[#151519] p-10 text-center">

          <Settings
            size={40}
            className="mx-auto mb-4 text-gray-600"
          />


          <h2 className="text-lg font-semibold text-white">
            No sections found
          </h2>


          <p className="mt-2 text-sm text-gray-500">
            Your website sections have not been configured yet.
          </p>


          <button
            type="button"
            onClick={
              loadSections
            }
            className="mt-5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-5 py-2.5 font-semibold text-white"
          >
            Reload
          </button>

        </div>

      ) : (

        /* ===================================================
           SECTION LIST
        =================================================== */

        <div className="space-y-4">

          {sections.map(
            (
              section,
              index
            ) => {

              const info =
                SECTION_INFO[
                  section.type
                ] || {
                  label:
                    section.label ||
                    section.type ||
                    "Section",

                  description:
                    section.description ||
                    "Website section.",
                };


              return (
                <div
                  key={
                    section.id ??
                    `${section.type}-${index}`
                  }
                  className={`rounded-2xl border bg-[#151519] p-5 transition ${
                    section.enabled
                      ? "border-[#2c2c35]"
                      : "border-[#25242c] opacity-70"
                  }`}
                >

                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center">

                    {/* =================================================
                        DRAG / ORDER INDICATOR
                    ================================================= */}

                    <div className="flex items-center gap-3">

                      <div
                        className={`cursor-grab ${
                          section.enabled
                            ? "text-gray-600"
                            : "text-gray-700"
                        }`}
                      >

                        <GripVertical
                          size={20}
                        />

                      </div>


                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#24212f]">

                        <span className="text-sm font-semibold text-gray-400">
                          {index + 1}
                        </span>

                      </div>

                    </div>


                    {/* =================================================
                        SECTION INFORMATION
                    ================================================= */}

                    <div className="min-w-0 flex-1">

                      <div className="flex flex-wrap items-center gap-3">

                        <h3 className="font-semibold text-white">
                          {info.label}
                        </h3>


                        {section.enabled ? (
                          <span className="rounded-md bg-green-500/10 px-2 py-1 text-xs text-green-400">
                            Visible
                          </span>
                        ) : (
                          <span className="rounded-md bg-gray-500/10 px-2 py-1 text-xs text-gray-500">
                            Hidden
                          </span>
                        )}

                      </div>


                      <p className="mt-1 text-sm text-gray-500">
                        {info.description}
                      </p>


                      <p className="mt-2 text-xs text-gray-700">
                        Section:{" "}
                        {section.type}
                      </p>

                    </div>


                    {/* =================================================
                        MOVE CONTROLS
                    ================================================= */}

                    <div className="flex items-center gap-2">

                      <button
                        type="button"
                        onClick={() =>
                          handleMoveUp(
                            index
                          )
                        }
                        disabled={
                          index === 0 ||
                          saving
                        }
                        title="Move up"
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#34313f] text-gray-400 transition hover:bg-[#24212f] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                      >

                        <ArrowUp
                          size={17}
                        />

                      </button>


                      <button
                        type="button"
                        onClick={() =>
                          handleMoveDown(
                            index
                          )
                        }
                        disabled={
                          index ===
                            sections.length -
                              1 ||
                          saving
                        }
                        title="Move down"
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#34313f] text-gray-400 transition hover:bg-[#24212f] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                      >

                        <ArrowDown
                          size={17}
                        />

                      </button>

                    </div>


                    {/* =================================================
                        VISIBILITY TOGGLE
                    ================================================= */}

                    <button
                      type="button"
                      onClick={() =>
                        handleToggle(
                          section
                        )
                      }
                      disabled={
                        saving
                      }
                      className="flex items-center gap-3"
                    >

                      <div
                        className={`relative h-6 w-12 rounded-full transition ${
                          section.enabled
                            ? "bg-purple-500"
                            : "bg-[#34313f]"
                        }`}
                      >

                        <div
                          className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                            section.enabled
                              ? "left-7"
                              : "left-1"
                          }`}
                        />

                      </div>


                      <span className="min-w-[50px] text-left text-sm text-gray-400">
                        {section.enabled
                          ? "Visible"
                          : "Hidden"}
                      </span>

                    </button>

                  </div>

                </div>
              );
            }
          )}

        </div>
      )}


      {/* =====================================================
          UNSAVED CHANGES
      ===================================================== */}

      {hasChanges && (

        <div className="sticky bottom-4 z-20">

          <div className="rounded-2xl border border-purple-500/20 bg-[#1f1b2e] p-4 shadow-2xl">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-center gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-yellow-500/10">

                  <span className="font-bold text-yellow-400">
                    !
                  </span>

                </div>


                <div>

                  <p className="text-sm font-medium text-white">
                    You have unsaved changes
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Save your changes to update the public website.
                  </p>

                </div>

              </div>


              <div className="flex items-center gap-3">

                <button
                  type="button"
                  onClick={
                    handleDiscard
                  }
                  disabled={
                    saving
                  }
                  className="rounded-xl border border-[#34313f] px-4 py-2.5 text-sm font-medium text-gray-300 transition hover:bg-[#24212f] hover:text-white disabled:opacity-50"
                >
                  Discard
                </button>


                <button
                  type="button"
                  onClick={
                    handleSave
                  }
                  disabled={
                    saving
                  }
                  className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-5 py-2.5 font-semibold text-white disabled:opacity-50"
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