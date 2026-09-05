
// // src/pages/institute/Website/WebsiteContent.jsx

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   ArrowLeft,
//   Save,
//   Loader2,
//   Type,
//   FileText,
//   BookOpen,
//   Users,
//   MessageSquare,
//   LogIn,
// } from "lucide-react";

// import toast from "react-hot-toast";

// import {
//   getWebsiteData,
//   updateSectionContent,
// } from "../../services/websiteService";

// /* =========================================================
//    SECTION CONFIGURATION
// ========================================================= */

// const SECTION_CONFIG = {
//   hero: {
//     label: "Hero",
//     icon: Type,
//     description:
//       "Main banner and introduction shown at the top of your website.",
//     dynamic: false,
//     fields: [
//       {
//         key: "title",
//         label: "Title",
//         type: "text",
//         placeholder:
//           "Welcome to our institute",
//       },
//       {
//         key: "subtitle",
//         label: "Subtitle",
//         type: "text",
//         placeholder:
//           "Learn. Grow. Succeed.",
//       },
//       {
//         key: "description",
//         label: "Description",
//         type: "textarea",
//         placeholder:
//           "Enter a short description about your institute...",
//       },
//       {
//         key: "buttonText",
//         label: "Button Text",
//         type: "text",
//         placeholder:
//           "Explore Courses",
//       },
//       {
//         key: "buttonUrl",
//         label: "Button URL",
//         type: "text",
//         placeholder:
//           "/courses",
//       },
//       {
//         key: "imageUrl",
//         label: "Hero Image URL",
//         type: "text",
//         placeholder:
//           "https://example.com/hero.jpg",
//       },
//     ],
//   },

//   about: {
//     label: "About Us",
//     icon: FileText,
//     description:
//       "Tell visitors about your institute, mission and vision.",
//     dynamic: false,
//     fields: [
//       {
//         key: "title",
//         label: "Title",
//         type: "text",
//         placeholder:
//           "About Our Institute",
//       },
//       {
//         key: "description",
//         label: "Description",
//         type: "textarea",
//         placeholder:
//           "Tell students about your institute...",
//       },
//       {
//         key: "mission",
//         label: "Mission",
//         type: "textarea",
//         placeholder:
//           "Our mission...",
//       },
//       {
//         key: "vision",
//         label: "Vision",
//         type: "textarea",
//         placeholder:
//           "Our vision...",
//       },
//       {
//         key: "imageUrl",
//         label: "About Image URL",
//         type: "text",
//         placeholder:
//           "https://example.com/about.jpg",
//       },
//     ],
//   },

//   categories: {
//     label: "Categories",
//     icon: BookOpen,
//     dynamic: true,
//     description:
//       "Categories, subcategories and available courses are automatically loaded from your institute data.",
//   },

//   trainers: {
//     label: "Trainers",
//     icon: Users,
//     dynamic: true,
//     description:
//       "Trainers associated with your institute are automatically loaded from your institute data.",
//   },

//   classes: {
//     label: "Classes",
//     icon: FileText,
//     dynamic: true,
//     description:
//       "Classes and class information are automatically loaded from your institute data.",
//   },

//   testimonials: {
//     label: "Testimonials",
//     icon: MessageSquare,
//     dynamic: true,
//     description:
//       "Student testimonials are automatically loaded from your institute testimonial data.",
//   },

//   studentLogin: {
//     label: "Student Login",
//     icon: LogIn,
//     dynamic: true,
//     description:
//       "The student login section uses the platform's existing student authentication.",
//   },
// };


// /* =========================================================
//    DEFAULT CONTENT
// ========================================================= */

// const DEFAULT_CONTENT = {
//   hero: {
//     title: "",
//     subtitle: "",
//     description: "",
//     buttonText: "Explore Courses",
//     buttonUrl: "/courses",
//     imageUrl: "",
//   },

//   about: {
//     title: "About Our Institute",
//     description: "",
//     mission: "",
//     vision: "",
//     imageUrl: "",
//   },

// };


// /* =========================================================
//    NORMALIZE SECTION
// ========================================================= */

// const getSectionType = (
//   section
// ) => {
//   return (
//     section.section_type ||
//     section.type ||
//     section.id
//   );
// };


// /* =========================================================
//    WEBSITE SECTION TYPE MAPPING

//    Backend section names can remain:
//    home       -> Hero
//    courses    -> Categories
//    batches    -> Classes
//    trainers   -> Trainers
//    testimonials -> Testimonials
//    studentlogin / student_login -> Student Login
// ========================================================= */

// const getSectionConfigKey = (section) => {
//   const rawType = String(
//     getSectionType(section) || ""
//   )
//     .trim()
//     .toLowerCase();

//   const normalized = rawType.replace(
//     /[\s_-]+/g,
//     ""
//   );

//   if (
//     normalized === "home" ||
//     normalized === "hero"
//   ) {
//     return "hero";
//   }

//   if (
//     normalized === "about" ||
//     normalized === "aboutus"
//   ) {
//     return "about";
//   }

//   if (
//     normalized === "courses" ||
//     normalized === "categories"
//   ) {
//     return "categories";
//   }

//   if (
//     normalized === "trainers" ||
//     normalized === "trainer"
//   ) {
//     return "trainers";
//   }

//   if (
//     normalized === "batches" ||
//     normalized === "classes" ||
//     normalized === "class"
//   ) {
//     return "classes";
//   }

//   if (
//     normalized === "testimonials" ||
//     normalized === "testimonial"
//   ) {
//     return "testimonials";
//   }

//   if (normalized === "studentlogin") {
//     return "studentLogin";
//   }

//   return null;
// };


// export default function WebsiteContent() {
//   const navigate = useNavigate();

//   const [sections, setSections] =
//     useState([]);

//   const [activeSection, setActiveSection] =
//     useState(null);

//   const [content, setContent] =
//     useState({});

//   const [loading, setLoading] =
//     useState(true);

//   const [saving, setSaving] =
//     useState(false);

//   const [hasChanges, setHasChanges] =
//     useState(false);


//   /* =========================================================
//      LOAD WEBSITE CONTENT
//   ========================================================= */

//   useEffect(() => {
//     loadWebsite();
//   }, []);


//   const loadWebsite = async () => {
//     try {
//       setLoading(true);

//       const data =
//         await getWebsiteData();

//       console.log(
//         "Website content data:",
//         data
//       );

//       const websiteSections =
//         Array.isArray(
//           data?.sections
//         )
//           ? data.sections.filter(
//               (section) =>
//                 Boolean(
//                   getSectionConfigKey(
//                     section
//                   )
//                 )
//             )
//           : [];

//       setSections(
//         websiteSections
//       );

//       /*
//        * Find first editable section.
//        */

//       const firstEditable =
//         websiteSections.find(
//           (section) => {
//             const configKey =
//               getSectionConfigKey(section);

//             return (
//               configKey &&
//               SECTION_CONFIG[configKey] &&
//               !SECTION_CONFIG[configKey].dynamic
//             );
//           }
//         );

//       if (firstEditable) {
//         selectSection(
//           firstEditable,
//           data
//         );
//       }

//     } catch (error) {
//       console.error(
//         "Failed to load website content:",
//         error
//       );

//       toast.error(
//         error?.response?.data?.message ||
//           "Failed to load website content"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };


//   /* =========================================================
//      SELECT SECTION
//   ========================================================= */

//   const selectSection = (
//     section,
//     websiteData = null
//   ) => {
//     const type =
//       getSectionConfigKey(section);

//     setActiveSection(
//       section
//     );

//     /*
//      * Content can be returned directly
//      * from the section or inside data.
//      */

//     const existingContent =
//       section?.content || {};

//     const defaultContent =
//       DEFAULT_CONTENT[type] || {};

//     setContent({
//       ...defaultContent,
//       ...existingContent,
//     });

//     setHasChanges(false);
//   };


//   /* =========================================================
//      CHANGE FIELD
//   ========================================================= */

//   const handleChange = (
//     key,
//     value
//   ) => {
//     setContent(
//       (previous) => ({
//         ...previous,
//         [key]: value,
//       })
//     );

//     setHasChanges(true);
//   };


//   /* =========================================================
//      SAVE SECTION
//   ========================================================= */

//   const handleSave = async () => {
//     if (!activeSection) {
//       return;
//     }

//     const sectionId =
//       activeSection.id;

//     if (!sectionId) {
//       toast.error(
//         "Section ID is missing"
//       );
//       return;
//     }

//     try {
//       setSaving(true);

//       await updateSectionContent(
//         sectionId,
//         content
//       );

//       /*
//        * Update local section data.
//        */

//       setSections(
//         (previous) =>
//           previous.map(
//             (section) =>
//               Number(section.id) ===
//               Number(sectionId)
//                 ? {
//                     ...section,
//                     content: {
//                       ...section.content,
//                       ...content,
//                     },
//                   }
//                 : section
//           )
//       );

//       setHasChanges(false);

//       toast.success(
//         `${getSectionLabel(
//           activeSection
//         )} content saved successfully`
//       );

//     } catch (error) {
//       console.error(
//         "Save section content error:",
//         error
//       );

//       toast.error(
//         error?.response?.data?.message ||
//           "Failed to save content"
//       );
//     } finally {
//       setSaving(false);
//     }
//   };


//   /* =========================================================
//      GET LABEL
//   ========================================================= */

//   const getSectionLabel = (
//     section
//   ) => {
//     const type =
//       getSectionConfigKey(section);

//     return (
//       SECTION_CONFIG[type]
//         ?.label ||
//       type ||
//       "Section"
//     );
//   };


//   /* =========================================================
//      DYNAMIC SECTION MESSAGE
//   ========================================================= */

//   const renderDynamicSection =
//     () => {
//       const type =
//         getSectionConfigKey(
//           activeSection
//         );

//       const config =
//         SECTION_CONFIG[type];

//       if (!config?.dynamic) {
//         return null;
//       }

//       const Icon =
//         config.icon;

//       return (
//         <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-8">

//           <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-5">

//             <Icon
//               size={26}
//               className="text-purple-400"
//             />

//           </div>

//           <h2 className="text-xl font-semibold text-white">
//             {config.label}
//           </h2>

//           <p className="text-gray-400 text-sm mt-2 max-w-2xl">
//             {config.description}
//           </p>

//           <div className="mt-6 rounded-xl bg-[#1d1b23] border border-[#2c2c35] p-5">

//             <p className="text-sm text-gray-300">
//               This section is connected to your existing institute data and appears automatically on the website.
//             </p>

//             <div className="mt-4 space-y-2 text-sm text-gray-500">

//               {type === "categories" && (
//                 <>
//                   <p>• Categories are loaded automatically.</p>
//                   <p>• Subcategories and available courses are shown from institute data.</p>
//                 </>
//               )}

//               {type === "trainers" && (
//                 <>
//                   <p>• Approved active trainers are loaded automatically.</p>
//                   <p>• Trainer profile information is displayed from the trainer records.</p>
//                 </>
//               )}

//               {type === "classes" && (
//                 <>
//                   <p>• Published active classes are loaded automatically.</p>
//                   <p>• Class schedule, trainer and course information comes from the existing class data.</p>
//                 </>
//               )}

//               {type === "testimonials" && (
//                 <>
//                   <p>• Active institute testimonials are loaded automatically.</p>
//                   <p>• No separate testimonial content needs to be entered here.</p>
//                 </>
//               )}

//               {type === "studentLogin" && (
//                 <>
//                   <p>• Uses the existing student authentication system.</p>
//                   <p>• No duplicate student accounts are created.</p>
//                 </>
//               )}

//             </div>

//           </div>

//         </div>
//       );
//     };


//   /* =========================================================
//      RENDER FIELD
//   ========================================================= */

//   const renderField = (
//     field
//   ) => {
//     const value =
//       content[field.key] ??
//       "";

//     if (
//       field.type ===
//       "textarea"
//     ) {
//       return (
//         <div
//           key={field.key}
//           className="space-y-2"
//         >

//           <label className="text-sm font-medium text-gray-300">
//             {field.label}
//           </label>

//           <textarea
//             value={value}
//             onChange={(event) =>
//               handleChange(
//                 field.key,
//                 event.target.value
//               )
//             }
//             placeholder={
//               field.placeholder
//             }
//             rows={5}
//             className="w-full rounded-xl bg-[#111116] border border-[#34313f] px-4 py-3 text-white placeholder:text-gray-600 outline-none focus:border-purple-500 resize-y"
//           />

//         </div>
//       );
//     }

//     return (
//       <div
//         key={field.key}
//         className="space-y-2"
//       >

//         <label className="text-sm font-medium text-gray-300">
//           {field.label}
//         </label>

//         <input
//           type="text"
//           value={value}
//           onChange={(event) =>
//             handleChange(
//               field.key,
//               event.target.value
//             )
//           }
//           placeholder={
//             field.placeholder
//           }
//           className="w-full rounded-xl bg-[#111116] border border-[#34313f] px-4 py-3 text-white placeholder:text-gray-600 outline-none focus:border-purple-500"
//         />

//       </div>
//     );
//   };


//   /* =========================================================
//      LOADING
//   ========================================================= */

//   if (loading) {
//     return (
//       <div className="min-h-[400px] flex items-center justify-center">

//         <div className="flex items-center gap-3 text-gray-400">

//           <Loader2
//             size={22}
//             className="animate-spin"
//           />

//           <span>
//             Loading website content...
//           </span>

//         </div>

//       </div>
//     );
//   }


//   /* =========================================================
//      PAGE
//   ========================================================= */

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
//             <ArrowLeft size={22} />
//           </button>

//           <div>

//             <div className="flex items-center gap-2">

//               <FileText
//                 size={22}
//                 className="text-purple-400"
//               />

//               <h1 className="text-2xl font-bold text-white">
//                 Website Content
//               </h1>

//             </div>

//             <p className="text-sm text-gray-400 mt-1">
//               Manage the content displayed on your institute website.
//             </p>

//           </div>

//         </div>


//         {/* SAVE */}

//         {activeSection &&
//           !SECTION_CONFIG[
//             getSectionConfigKey(
//               activeSection
//             )
//           ]?.dynamic && (
//             <button
//               type="button"
//               onClick={
//                 handleSave
//               }
//               disabled={
//                 saving ||
//                 !hasChanges
//               }
//               className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//             >

//               {saving ? (
//                 <>
//                   <Loader2
//                     size={18}
//                     className="animate-spin"
//                   />

//                   Saving...
//                 </>
//               ) : (
//                 <>
//                   <Save size={18} />

//                   Save Changes
//                 </>
//               )}

//             </button>
//           )}

//       </div>


//       {/* =====================================================
//           CONTENT AREA
//       ===================================================== */}

//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

//         {/* ===================================================
//             LEFT SECTION MENU
//         =================================================== */}

//         <div className="lg:col-span-1">

//           <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-3">

//             <p className="px-3 py-2 text-xs uppercase tracking-wider text-gray-600">
//               Website Sections
//             </p>

//             <div className="space-y-1">

//               {sections.map(
//                 (section) => {

//                   const type =
//                     getSectionConfigKey(
//                       section
//                     );

//                   const config =
//                     type
//                       ? SECTION_CONFIG[type]
//                       : null;

//                   if (!config) {
//                     return null;
//                   }

//                   const Icon =
//                     config.icon;

//                   const isActive =
//                     Number(
//                       activeSection?.id
//                     ) ===
//                     Number(
//                       section.id
//                     );

//                   const isDynamic =
//                     config.dynamic;

//                   return (
//                     <button
//                       key={
//                         section.id
//                       }
//                       type="button"
//                       onClick={() =>
//                         selectSection(
//                           section
//                         )
//                       }
//                       className={`w-full text-left rounded-xl px-3 py-3 flex items-center gap-3 transition ${
//                         isActive
//                           ? "bg-purple-500/10 border border-purple-500/20"
//                           : "hover:bg-[#211f29] border border-transparent"
//                       }`}
//                     >

//                       <div
//                         className={`w-9 h-9 rounded-lg flex items-center justify-center ${
//                           isActive
//                             ? "bg-purple-500/15"
//                             : "bg-[#24212f]"
//                         }`}
//                       >

//                         <Icon
//                           size={17}
//                           className={
//                             isActive
//                               ? "text-purple-400"
//                               : "text-gray-500"
//                           }
//                         />

//                       </div>

//                       <div className="flex-1 min-w-0">

//                         <p
//                           className={`text-sm font-medium truncate ${
//                             isActive
//                               ? "text-white"
//                               : "text-gray-400"
//                           }`}
//                         >
//                           {config.label}
//                         </p>

//                         {isDynamic && (
//                           <p className="text-[10px] text-gray-600 mt-0.5">
//                             Automatic
//                           </p>
//                         )}

//                       </div>

//                       {section.is_enabled ===
//                         0 && (
//                         <span className="text-[10px] text-gray-600">
//                           Hidden
//                         </span>
//                       )}

//                     </button>
//                   );
//                 }
//               )}

//             </div>

//           </div>

//         </div>


//         {/* ===================================================
//             RIGHT CONTENT
//         =================================================== */}

//         <div className="lg:col-span-3">

//           {!activeSection ? (

//             <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-10 text-center">

//               <FileText
//                 size={40}
//                 className="mx-auto text-gray-600 mb-4"
//               />

//               <h2 className="text-lg font-semibold text-white">
//                 Select a section
//               </h2>

//               <p className="text-sm text-gray-500 mt-2">
//                 Select a website section from the left.
//               </p>

//             </div>

//           ) : (

//             <div className="space-y-5">

//               {/* SECTION HEADER */}

//               <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-6">

//                 <div className="flex items-center gap-4">

//                   {(() => {
//                     const type =
//                       getSectionConfigKey(
//                         activeSection
//                       );

//                     const Icon =
//                       SECTION_CONFIG[
//                         type
//                       ]?.icon ||
//                       FileText;

//                     return (
//                       <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">

//                         <Icon
//                           size={23}
//                           className="text-purple-400"
//                         />

//                       </div>
//                     );
//                   })()}

//                   <div>

//                     <h2 className="text-xl font-semibold text-white">
//                       {getSectionLabel(
//                         activeSection
//                       )}
//                     </h2>

//                     <p className="text-sm text-gray-500 mt-1">
//                       {
//                         SECTION_CONFIG[
//                           getSectionConfigKey(
//                             activeSection
//                           )
//                         ]?.description
//                       }
//                     </p>

//                   </div>

//                 </div>

//               </div>


//               {/* DYNAMIC SECTION */}

//               {renderDynamicSection()}


//               {/* EDITABLE SECTION */}

//               {!SECTION_CONFIG[
//                 getSectionConfigKey(
//                   activeSection
//                 )
//               ]?.dynamic && (
//                 <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-6">

//                   <div className="space-y-5">

//                     {(
//                       SECTION_CONFIG[
//                         getSectionConfigKey(
//                           activeSection
//                         )
//                       ]?.fields || []
//                     ).map(
//                       renderField
//                     )}

//                   </div>


//                   {/* SAVE */}

//                   <div className="flex justify-end mt-7 pt-5 border-t border-[#2c2c35]">

//                     <button
//                       type="button"
//                       onClick={
//                         handleSave
//                       }
//                       disabled={
//                         saving ||
//                         !hasChanges
//                       }
//                       className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//                     >

//                       {saving ? (
//                         <>
//                           <Loader2
//                             size={18}
//                             className="animate-spin"
//                           />

//                           Saving...
//                         </>
//                       ) : (
//                         <>
//                           <Save
//                             size={18}
//                           />

//                           Save Changes
//                         </>
//                       )}

//                     </button>

//                   </div>

//                 </div>
//               )}

//             </div>

//           )}

//         </div>

//       </div>


//       {/* =====================================================
//           UNSAVED CHANGES
//       ===================================================== */}

//       {hasChanges && (
//         <div className="sticky bottom-4 z-20">

//           <div className="bg-[#1f1b2e] border border-purple-500/20 rounded-2xl p-4 shadow-2xl">

//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

//               <div>

//                 <p className="text-white text-sm font-medium">
//                   Unsaved changes
//                 </p>

//                 <p className="text-gray-500 text-xs mt-1">
//                   Save your changes to update the public website.
//                 </p>

//               </div>

//               <button
//                 type="button"
//                 onClick={
//                   handleSave
//                 }
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


// // src/pages/institute/Website/WebsiteContent.jsx

// import { useEffect, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";

// import {
//   ArrowLeft,
//   Save,
//   Loader2,
//   Type,
//   FileText,
//   BookOpen,
//   Users,
//   MessageSquare,
//   LogIn,
//   Database,
//   Eye,
//   CheckCircle2,
//   AlertCircle,
// } from "lucide-react";

// import toast from "react-hot-toast";

// import {
//   getWebsiteData,
//   updateSectionContent,
// } from "../../services/websiteService";

// /* =========================================================
//    BRANDING
// ========================================================= */

// const BRANDING = {
//   primary: "#7C3AED",
//   primaryDark: "#5B21B6",
//   charcoal: "#1F2937",
//   gold: "#F59E0B",

//   background: "#FAFAF9",
//   text: "#111827",
//   cards: "#FFFFFF",

//   navbar: "#F59E0B",
//   heading: "#111827",
//   subheading: "#374151",
//   bodyText: "#4B5562",
//   icon: "#0D9488",
//   button: "#9333EA",
// };

// /* =========================================================
//    SECTION CONFIGURATION
// ========================================================= */

// const SECTION_CONFIG = {
//   hero: {
//     label: "Hero",
//     icon: Type,
//     dynamic: false,

//     description:
//       "Edit the main introduction displayed at the top of your institute website.",

//     fields: [
//       {
//         key: "title",
//         label: "Title",
//         type: "text",
//         placeholder: "Welcome to our institute",
//         description:
//           "Main heading displayed in the hero section.",
//       },

//       {
//         key: "subtitle",
//         label: "Subtitle",
//         type: "text",
//         placeholder: "Learn. Grow. Succeed.",
//         description:
//           "Short supporting text below the main heading.",
//       },

//       {
//         key: "description",
//         label: "Description",
//         type: "textarea",
//         placeholder:
//           "Enter a short description about your institute...",
//         description:
//           "Brief introduction about your institute.",
//       },

//       {
//         key: "buttonText",
//         label: "Button Text",
//         type: "text",
//         placeholder: "Explore Courses",
//         description:
//           "Text shown on the primary hero button.",
//       },

//       {
//         key: "buttonUrl",
//         label: "Button URL",
//         type: "text",
//         placeholder: "/courses",
//         description:
//           "Route opened when the visitor clicks the button.",
//       },

//       {
//         key: "imageUrl",
//         label: "Hero Image URL",
//         type: "text",
//         placeholder:
//           "https://example.com/hero.jpg",
//         description:
//           "Image displayed in the hero section.",
//       },
//     ],
//   },

//   about: {
//     label: "About Us",
//     icon: FileText,
//     dynamic: false,

//     description:
//       "Manage the information visitors see in the About section.",

//     fields: [
//       {
//         key: "title",
//         label: "Title",
//         type: "text",
//         placeholder: "About Our Institute",
//         description:
//           "Heading displayed for the About section.",
//       },

//       {
//         key: "description",
//         label: "Description",
//         type: "textarea",
//         placeholder:
//           "Tell students about your institute...",
//         description:
//           "Explain your institute and its teaching approach.",
//       },

//       {
//         key: "mission",
//         label: "Mission",
//         type: "textarea",
//         placeholder:
//           "Our mission is to...",
//         description:
//           "Optional mission statement.",
//       },

//       {
//         key: "vision",
//         label: "Vision",
//         type: "textarea",
//         placeholder:
//           "Our vision is to...",
//         description:
//           "Optional vision statement.",
//       },

//       {
//         key: "imageUrl",
//         label: "About Image URL",
//         type: "text",
//         placeholder:
//           "https://example.com/about.jpg",
//         description:
//           "Optional image displayed in the About section.",
//       },
//     ],
//   },

//   categories: {
//     label: "Categories",
//     icon: BookOpen,
//     dynamic: true,

//     description:
//       "Categories are automatically loaded from your institute's category data.",
//   },

//   trainers: {
//     label: "Trainers",
//     icon: Users,
//     dynamic: true,

//     description:
//       "Trainer information is automatically loaded from the Trainers module.",
//   },

//   classes: {
//     label: "Classes",
//     icon: FileText,
//     dynamic: true,

//     description:
//       "Classes are automatically loaded from the Classes module.",
//   },

//   testimonials: {
//     label: "Testimonials",
//     icon: MessageSquare,
//     dynamic: true,

//     description:
//       "Student testimonials are automatically loaded from testimonial data.",
//   },

//   studentLogin: {
//     label: "Student Login",
//     icon: LogIn,
//     dynamic: true,

//     description:
//       "Student Login uses the existing student authentication system.",
//   },
// };

// /* =========================================================
//    DEFAULT CONTENT
// ========================================================= */

// const DEFAULT_CONTENT = {
//   hero: {
//     title: "",
//     subtitle: "",
//     description: "",
//     buttonText: "Explore Courses",
//     buttonUrl: "/courses",
//     imageUrl: "",
//   },

//   about: {
//     title: "About Our Institute",
//     description: "",
//     mission: "",
//     vision: "",
//     imageUrl: "",
//   },
// };

// /* =========================================================
//    NORMALIZE RAW SECTION TYPE
// ========================================================= */

// const getRawSectionType = (section) => {
//   return (
//     section?.section_type ??
//     section?.sectionType ??
//     section?.type ??
//     ""
//   );
// };

// /* =========================================================
//    NORMALIZE SECTION TYPE
// ========================================================= */

// const normalizeSectionType = (value) => {
//   return String(value || "")
//     .trim()
//     .toLowerCase()
//     .replace(/[\s_-]+/g, "");
// };

// /* =========================================================
//    GET FRONTEND CONFIG KEY
// =========================================================

// Backend → Content Page

// home            → hero
// hero            → hero

// about           → about
// about_us        → about

// courses         → categories
// categories      → categories

// trainers        → trainers

// batches         → classes
// classes         → classes

// testimonials    → testimonials

// student_login   → studentLogin
// studentlogin    → studentLogin
// ========================================================= */

// const getSectionConfigKey = (section) => {
//   const normalized = normalizeSectionType(
//     getRawSectionType(section)
//   );

//   switch (normalized) {
//     case "home":
//     case "hero":
//       return "hero";

//     case "about":
//     case "aboutus":
//       return "about";

//     case "courses":
//     case "course":
//     case "categories":
//     case "category":
//       return "categories";

//     case "trainers":
//     case "trainer":
//       return "trainers";

//     case "batches":
//     case "batch":
//     case "classes":
//     case "class":
//       return "classes";

//     case "testimonials":
//     case "testimonial":
//       return "testimonials";

//     case "studentlogin":
//     case "studentauthentication":
//       return "studentLogin";

//     default:
//       return null;
//   }
// };

// /* =========================================================
//    ENABLED VALUE
// ========================================================= */

// const isSectionEnabled = (section) => {
//   const value =
//     section?.is_enabled ??
//     section?.isEnabled ??
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
//    UNIQUE SECTIONS
// =========================================================

// IMPORTANT:

// If backend sends:

// [
//   {
//     section_type: "categories"
//   },
//   {
//     section_type: "courses"
//   }
// ]

// both map to:

// "categories"

// We keep only ONE.

// This prevents:

// Categories
// Categories

// from appearing in the Content page.
// ========================================================= */

// const getUniqueWebsiteSections = (
//   backendSections
// ) => {
//   if (!Array.isArray(backendSections)) {
//     return [];
//   }

//   const uniqueSections = new Map();

//   backendSections.forEach(
//     (section, index) => {
//       const configKey =
//         getSectionConfigKey(section);

//       if (!configKey) {
//         return;
//       }

//       /*
//        * Keep the first section for every
//        * frontend section type.
//        *
//        * Example:
//        *
//        * courses + categories
//        * both become categories
//        *
//        * only one is displayed.
//        */

//       if (!uniqueSections.has(configKey)) {
//         uniqueSections.set(configKey, {
//           ...section,

//           /*
//            * Preserve original backend
//            * section type.
//            */
//           __rawType:
//             getRawSectionType(section),

//           /*
//            * Frontend type.
//            */
//           __configKey: configKey,

//           /*
//            * Original order.
//            */
//           __index: index,
//         });
//       }
//     }
//   );

//   return Array.from(
//     uniqueSections.values()
//   ).sort((a, b) => {
//     const orderA =
//       Number(
//         a?.section_order ??
//           a?.order ??
//           a?.__index ??
//           0
//       );

//     const orderB =
//       Number(
//         b?.section_order ??
//           b?.order ??
//           b?.__index ??
//           0
//       );

//     return orderA - orderB;
//   });
// };

// /* =========================================================
//    COMPONENT
// ========================================================= */

// export default function WebsiteContent() {
//   const navigate = useNavigate();

//   /* =======================================================
//      STATE
//   ======================================================= */

//   const [
//     sections,
//     setSections,
//   ] = useState([]);

//   const [
//     activeSection,
//     setActiveSection,
//   ] = useState(null);

//   const [
//     content,
//     setContent,
//   ] = useState({});

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
//      LOAD WEBSITE
//   ======================================================= */

//   useEffect(() => {
//     loadWebsite();
//   }, []);

//   const loadWebsite = async () => {
//     try {
//       setLoading(true);

//       const response =
//         await getWebsiteData();

//       console.log(
//         "WEBSITE CONTENT RESPONSE:",
//         response
//       );

//       /*
//        * Support both:
//        *
//        * response.sections
//        *
//        * and
//        *
//        * response.data.sections
//        */

//       let data = response;

//       if (
//         data &&
//         typeof data === "object" &&
//         data.data &&
//         typeof data.data === "object" &&
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
//         "BACKEND WEBSITE SECTIONS:",
//         backendSections
//       );

//       /*
//        * Remove duplicate frontend
//        * section types.
//        */

//       const uniqueSections =
//         getUniqueWebsiteSections(
//           backendSections
//         );

//       console.log(
//         "UNIQUE CONTENT SECTIONS:",
//         uniqueSections
//       );

//       setSections(
//         uniqueSections
//       );

//       /*
//        * Find first editable section.
//        *
//        * Usually Hero.
//        */

//       const firstEditable =
//         uniqueSections.find(
//           (section) => {
//             const configKey =
//               getSectionConfigKey(
//                 section
//               );

//             return (
//               configKey &&
//               SECTION_CONFIG[
//                 configKey
//               ] &&
//               !SECTION_CONFIG[
//                 configKey
//               ].dynamic
//             );
//           }
//         );

//       if (firstEditable) {
//         selectSection(
//           firstEditable
//         );
//       }
//     } catch (error) {
//       console.error(
//         "Failed to load website content:",
//         error
//       );

//       toast.error(
//         error?.response?.data
//           ?.message ||
//           error?.message ||
//           "Failed to load website content"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* =======================================================
//      SELECT SECTION
//   ======================================================= */

//   const selectSection = (
//     section
//   ) => {
//     if (!section) {
//       return;
//     }

//     const configKey =
//       getSectionConfigKey(
//         section
//       );

//     setActiveSection(
//       section
//     );

//     /*
//      * Dynamic sections don't have
//      * editable content.
//      */

//     if (
//       SECTION_CONFIG[
//         configKey
//       ]?.dynamic
//     ) {
//       setContent({});
//       setHasChanges(false);
//       return;
//     }

//     const defaultContent =
//       DEFAULT_CONTENT[
//         configKey
//       ] || {};

//     const existingContent =
//       section?.content &&
//       typeof section.content ===
//         "object"
//         ? section.content
//         : {};

//     setContent({
//       ...defaultContent,
//       ...existingContent,
//     });

//     setHasChanges(false);
//   };

//   /* =======================================================
//      ACTIVE CONFIG
//   ======================================================= */

//   const activeConfig = useMemo(() => {
//     if (!activeSection) {
//       return null;
//     }

//     const configKey =
//       getSectionConfigKey(
//         activeSection
//       );

//     return (
//       SECTION_CONFIG[
//         configKey
//       ] || null
//     );
//   }, [activeSection]);

//   /* =======================================================
//      ACTIVE CONFIG KEY
//   ======================================================= */

//   const activeConfigKey = useMemo(() => {
//     if (!activeSection) {
//       return null;
//     }

//     return getSectionConfigKey(
//       activeSection
//     );
//   }, [activeSection]);

//   /* =======================================================
//      CHANGE FIELD
//   ======================================================= */

//   const handleChange = (
//     key,
//     value
//   ) => {
//     setContent(
//       (previous) => ({
//         ...previous,
//         [key]: value,
//       })
//     );

//     setHasChanges(true);
//   };

//   /* =======================================================
//      SAVE
//   ======================================================= */

//   const handleSave = async () => {
//     if (!activeSection) {
//       return;
//     }

//     const configKey =
//       getSectionConfigKey(
//         activeSection
//       );

//     /*
//      * Never save automatic sections.
//      */

//     if (
//       SECTION_CONFIG[
//         configKey
//       ]?.dynamic
//     ) {
//       return;
//     }

//     const sectionId =
//       activeSection?.id;

//     if (!sectionId) {
//       toast.error(
//         "Section ID is missing"
//       );
//       return;
//     }

//     try {
//       setSaving(true);

//       await updateSectionContent(
//         sectionId,
//         content
//       );

//       /*
//        * Update current section.
//        */

//       const updatedSection = {
//         ...activeSection,
//         content: {
//           ...(activeSection.content ||
//             {}),
//           ...content,
//         },
//       };

//       setActiveSection(
//         updatedSection
//       );

//       /*
//        * Update section list.
//        */

//       setSections(
//         (previous) =>
//           previous.map(
//             (section) =>
//               Number(section.id) ===
//               Number(sectionId)
//                 ? updatedSection
//                 : section
//           )
//       );

//       setHasChanges(false);

//       toast.success(
//         `${getSectionLabel(
//           activeSection
//         )} content saved successfully`
//       );
//     } catch (error) {
//       console.error(
//         "Save website content error:",
//         error
//       );

//       toast.error(
//         error?.response?.data
//           ?.message ||
//           error?.message ||
//           "Failed to save content"
//       );
//     } finally {
//       setSaving(false);
//     }
//   };

//   /* =======================================================
//      LABEL
//   ======================================================= */

//   const getSectionLabel = (
//     section
//   ) => {
//     const configKey =
//       getSectionConfigKey(
//         section
//       );

//     return (
//       SECTION_CONFIG[
//         configKey
//       ]?.label ||
//       "Section"
//     );
//   };

//   /* =======================================================
//      DYNAMIC INFORMATION
//   ======================================================= */

//   const getDynamicInformation =
//     (configKey) => {
//       switch (configKey) {
//         case "categories":
//           return {
//             title:
//               "Categories are managed automatically",
//             description:
//               "The public website receives category information from your institute data. You do not need to enter categories again here.",

//             points: [
//               "Categories come from the institute category data.",
//               "Courses/classes use the selected categories.",
//               "Manage category information from the Categories module.",
//             ],
//           };

//         case "trainers":
//           return {
//             title:
//               "Trainers are managed automatically",
//             description:
//               "Approved and active trainers are displayed automatically on the public website.",

//             points: [
//               "Trainer information comes from the Trainers module.",
//               "Only the appropriate active trainer data is used.",
//               "Manage trainer information from the Trainers page.",
//             ],
//           };

//         case "classes":
//           return {
//             title:
//               "Classes are managed automatically",
//             description:
//               "Published classes are automatically supplied to the public website.",

//             points: [
//               "Class information comes from the Classes module.",
//               "Schedules and sessions are managed separately.",
//               "Manage class information from the Classes page.",
//             ],
//           };

//         case "testimonials":
//           return {
//             title:
//               "Testimonials are managed automatically",
//             description:
//               "Student testimonials are loaded from your institute testimonial data.",

//             points: [
//               "Testimonials come from the Testimonials module.",
//               "There is no need to duplicate testimonial records here.",
//               "Manage testimonials from the Testimonials page.",
//             ],
//           };

//         case "studentLogin":
//           return {
//             title:
//               "Student Login is automatic",
//             description:
//               "The website uses the existing student authentication system.",

//             points: [
//               "Students use the existing login flow.",
//               "No duplicate student credentials are created here.",
//               "Login visibility is controlled by the Website Sections page.",
//             ],
//           };

//         default:
//           return {
//             title:
//               "This section is automatic",
//             description:
//               "This website section receives its data from the platform.",

//             points: [],
//           };
//       }
//     };

//   /* =======================================================
//      RENDER FIELD
//   ======================================================= */

//   const renderField = (
//     field
//   ) => {
//     const value =
//       content?.[field.key] ?? "";

//     return (
//       <div
//         key={field.key}
//         className="space-y-2"
//       >
//         <label
//           className="block text-sm font-semibold"
//           style={{
//             color:
//               BRANDING.heading,
//           }}
//         >
//           {field.label}
//         </label>

//         {field.description && (
//           <p
//             className="text-xs"
//             style={{
//               color:
//                 BRANDING.bodyText,
//             }}
//           >
//             {field.description}
//           </p>
//         )}

//         {field.type ===
//         "textarea" ? (
//           <textarea
//             value={value}
//             onChange={(event) =>
//               handleChange(
//                 field.key,
//                 event.target.value
//               )
//             }
//             placeholder={
//               field.placeholder
//             }
//             rows={5}
//             className="w-full rounded-xl px-4 py-3 outline-none resize-y transition"
//             style={{
//               backgroundColor:
//                 "#FFFFFF",
//               color:
//                 BRANDING.text,
//               border:
//                 "1px solid #D1D5DB",
//             }}
//             onFocus={(event) => {
//               event.currentTarget.style.borderColor =
//                 BRANDING.primary;
//             }}
//             onBlur={(event) => {
//               event.currentTarget.style.borderColor =
//                 "#D1D5DB";
//             }}
//           />
//         ) : (
//           <input
//             type="text"
//             value={value}
//             onChange={(event) =>
//               handleChange(
//                 field.key,
//                 event.target.value
//               )
//             }
//             placeholder={
//               field.placeholder
//             }
//             className="w-full rounded-xl px-4 py-3 outline-none transition"
//             style={{
//               backgroundColor:
//                 "#FFFFFF",
//               color:
//                 BRANDING.text,
//               border:
//                 "1px solid #D1D5DB",
//             }}
//             onFocus={(event) => {
//               event.currentTarget.style.borderColor =
//                 BRANDING.primary;
//             }}
//             onBlur={(event) => {
//               event.currentTarget.style.borderColor =
//                 "#D1D5DB";
//             }}
//           />
//         )}
//       </div>
//     );
//   };

//   /* =======================================================
//      DYNAMIC SECTION
//   ======================================================= */

//   const renderDynamicSection =
//     () => {
//       if (
//         !activeConfig ||
//         !activeConfig.dynamic
//       ) {
//         return null;
//       }

//       const Icon =
//         activeConfig.icon;

//       const information =
//         getDynamicInformation(
//           activeConfigKey
//         );

//       return (
//         <div
//           className="rounded-2xl border p-6 sm:p-8"
//           style={{
//             backgroundColor:
//               BRANDING.cards,
//             borderColor:
//               "#E5E7EB",
//           }}
//         >
//           {/* HEADER */}

//           <div className="flex items-start gap-4">
//             <div
//               className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
//               style={{
//                 backgroundColor:
//                   `${BRANDING.icon}15`,
//               }}
//             >
//               <Icon
//                 size={23}
//                 style={{
//                   color:
//                     BRANDING.icon,
//                 }}
//               />
//             </div>

//             <div>
//               <div className="flex items-center gap-2 flex-wrap">
//                 <h2
//                   className="text-xl font-semibold"
//                   style={{
//                     color:
//                       BRANDING.heading,
//                   }}
//                 >
//                   {activeConfig.label}
//                 </h2>

//                 <span
//                   className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium"
//                   style={{
//                     backgroundColor:
//                       `${BRANDING.icon}15`,
//                     color:
//                       BRANDING.icon,
//                   }}
//                 >
//                   <Database
//                     size={12}
//                   />
//                   Automatic
//                 </span>
//               </div>

//               <p
//                 className="text-sm mt-1"
//                 style={{
//                   color:
//                     BRANDING.bodyText,
//                 }}
//               >
//                 {activeConfig.description}
//               </p>
//             </div>
//           </div>

//           {/* AUTOMATIC CARD */}

//           <div
//             className="mt-6 rounded-xl border p-5"
//             style={{
//               backgroundColor:
//                 "#F8FAFC",
//               borderColor:
//                 "#E5E7EB",
//             }}
//           >
//             <div className="flex items-start gap-3">
//               <CheckCircle2
//                 size={20}
//                 className="shrink-0 mt-0.5"
//                 style={{
//                   color:
//                     BRANDING.icon,
//                 }}
//               />

//               <div>
//                 <p
//                   className="text-sm font-semibold"
//                   style={{
//                     color:
//                       BRANDING.heading,
//                   }}
//                 >
//                   {information.title}
//                 </p>

//                 <p
//                   className="text-sm mt-1"
//                   style={{
//                     color:
//                       BRANDING.bodyText,
//                   }}
//                 >
//                   {
//                     information.description
//                   }
//                 </p>
//               </div>
//             </div>

//             {information.points
//               ?.length > 0 && (
//               <div className="mt-5 space-y-3">
//                 {information.points.map(
//                   (
//                     point,
//                     index
//                   ) => (
//                     <div
//                       key={index}
//                       className="flex items-start gap-3"
//                     >
//                       <span
//                         className="w-1.5 h-1.5 rounded-full mt-2.5 shrink-0"
//                         style={{
//                           backgroundColor:
//                             BRANDING.primary,
//                         }}
//                       />

//                       <p
//                         className="text-sm"
//                         style={{
//                           color:
//                             BRANDING.bodyText,
//                         }}
//                       >
//                         {point}
//                       </p>
//                     </div>
//                   )
//                 )}
//               </div>
//             )}
//           </div>

//           {/* INFO */}

//           <div
//             className="mt-5 rounded-xl p-4 flex items-start gap-3"
//             style={{
//               backgroundColor:
//                 `${BRANDING.gold}12`,
//             }}
//           >
//             <AlertCircle
//               size={18}
//               className="shrink-0 mt-0.5"
//               style={{
//                 color:
//                   BRANDING.gold,
//               }}
//             />

//             <p
//               className="text-sm"
//               style={{
//                 color:
//                   BRANDING.bodyText,
//               }}
//             >
//               To change this information,
//               use the corresponding
//               institute management module.
//             </p>
//           </div>
//         </div>
//       );
//     };

//   /* =======================================================
//      LOADING
//   ======================================================= */

//   if (loading) {
//     return (
//       <div
//         className="min-h-[400px] flex items-center justify-center"
//         style={{
//           backgroundColor:
//             BRANDING.background,
//         }}
//       >
//         <div
//           className="flex items-center gap-3"
//           style={{
//             color:
//               BRANDING.bodyText,
//           }}
//         >
//           <Loader2
//             size={22}
//             className="animate-spin"
//             style={{
//               color:
//                 BRANDING.primary,
//             }}
//           />

//           <span>
//             Loading website content...
//           </span>
//         </div>
//       </div>
//     );
//   }

//   /* =======================================================
//      PAGE
//   ======================================================= */

//   return (
//     <div
//       className="space-y-6 pb-28"
//       style={{
//         fontFamily:
//           "inherit",
//       }}
//     >
//       {/* ===================================================
//           HEADER
//       =================================================== */}

//       <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//         <div className="flex items-center gap-4">
//           <button
//             type="button"
//             onClick={() =>
//               navigate(
//                 "/institute/website"
//               )
//             }
//             className="w-10 h-10 rounded-xl flex items-center justify-center transition hover:bg-gray-100"
//             style={{
//               color:
//                 BRANDING.bodyText,
//             }}
//           >
//             <ArrowLeft
//               size={21}
//             />
//           </button>

//           <div>
//             <div className="flex items-center gap-2">
//               <FileText
//                 size={23}
//                 style={{
//                   color:
//                     BRANDING.primary,
//                 }}
//               />

//               <h1
//                 className="text-2xl font-bold"
//                 style={{
//                   color:
//                     BRANDING.heading,
//                 }}
//               >
//                 Website Content
//               </h1>
//             </div>

//             <p
//               className="text-sm mt-1"
//               style={{
//                 color:
//                   BRANDING.bodyText,
//               }}
//             >
//               Manage the content displayed on your institute website.
//             </p>
//           </div>
//         </div>

//         {/* TOP SAVE */}

//         {activeSection &&
//           !activeConfig?.dynamic && (
//             <button
//               type="button"
//               onClick={
//                 handleSave
//               }
//               disabled={
//                 saving ||
//                 !hasChanges
//               }
//               className="px-5 py-2.5 rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
//               style={{
//                 backgroundColor:
//                   BRANDING.button,
//               }}
//             >
//               {saving ? (
//                 <>
//                   <Loader2
//                     size={18}
//                     className="animate-spin"
//                   />
//                   Saving...
//                 </>
//               ) : (
//                 <>
//                   <Save size={18} />
//                   Save Changes
//                 </>
//               )}
//             </button>
//           )}
//       </div>

//       {/* ===================================================
//           MAIN GRID
//       =================================================== */}

//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//         {/* =================================================
//             LEFT MENU
//         ================================================= */}

//         <aside className="lg:col-span-1">
//           <div
//             className="rounded-2xl border p-3 lg:sticky lg:top-6"
//             style={{
//               backgroundColor:
//                 BRANDING.cards,
//               borderColor:
//                 "#E5E7EB",
//             }}
//           >
//             <p
//               className="px-3 py-2 text-xs font-semibold uppercase tracking-wider"
//               style={{
//                 color:
//                   BRANDING.subheading,
//               }}
//             >
//               Website Sections
//             </p>

//             <div className="space-y-1">
//               {sections.map(
//                 (section) => {
//                   const configKey =
//                     getSectionConfigKey(
//                       section
//                     );

//                   const config =
//                     SECTION_CONFIG[
//                       configKey
//                     ];

//                   if (!config) {
//                     return null;
//                   }

//                   const Icon =
//                     config.icon;

//                   const isActive =
//                     Number(
//                       activeSection?.id
//                     ) ===
//                     Number(
//                       section?.id
//                     );

//                   const enabled =
//                     isSectionEnabled(
//                       section
//                     );

//                   return (
//                     <button
//                       key={`${configKey}-${section.id}`}
//                       type="button"
//                       onClick={() =>
//                         selectSection(
//                           section
//                         )
//                       }
//                       className="w-full text-left rounded-xl px-3 py-3 flex items-center gap-3 transition"
//                       style={{
//                         backgroundColor:
//                           isActive
//                             ? `${BRANDING.primary}12`
//                             : "transparent",

//                         border:
//                           isActive
//                             ? `1px solid ${BRANDING.primary}30`
//                             : "1px solid transparent",
//                       }}
//                     >
//                       <div
//                         className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
//                         style={{
//                           backgroundColor:
//                             isActive
//                               ? `${BRANDING.primary}15`
//                               : "#F3F4F6",
//                         }}
//                       >
//                         <Icon
//                           size={17}
//                           style={{
//                             color:
//                               isActive
//                                 ? BRANDING.primary
//                                 : BRANDING.subheading,
//                           }}
//                         />
//                       </div>

//                       <div className="flex-1 min-w-0">
//                         <p
//                           className="text-sm font-semibold truncate"
//                           style={{
//                             color:
//                               isActive
//                                 ? BRANDING.heading
//                                 : BRANDING.bodyText,
//                           }}
//                         >
//                           {config.label}
//                         </p>

//                         {config.dynamic && (
//                           <p
//                             className="text-[10px] mt-0.5"
//                             style={{
//                               color:
//                                 BRANDING.icon,
//                             }}
//                           >
//                             Automatic
//                           </p>
//                         )}

//                         {!enabled && (
//                           <p
//                             className="text-[10px] mt-0.5"
//                             style={{
//                               color:
//                                 BRANDING.gold,
//                             }}
//                           >
//                             Hidden
//                           </p>
//                         )}
//                       </div>
//                     </button>
//                   );
//                 }
//               )}
//             </div>

//             {/* DUPLICATE PROTECTION INFO */}

//             <div
//               className="mt-4 mx-1 rounded-xl p-3"
//               style={{
//                 backgroundColor:
//                   "#F8FAFC",
//               }}
//             >
//               <p
//                 className="text-xs"
//                 style={{
//                   color:
//                     BRANDING.bodyText,
//                 }}
//               >
//                 Automatic sections are
//                 shown only once even when
//                 multiple backend section
//                 names map to the same
//                 website section.
//               </p>
//             </div>
//           </div>
//         </aside>

//         {/* =================================================
//             RIGHT CONTENT
//         ================================================= */}

//         <main className="lg:col-span-3">
//           {!activeSection ? (
//             <div
//               className="rounded-2xl border p-10 text-center"
//               style={{
//                 backgroundColor:
//                   BRANDING.cards,
//                 borderColor:
//                   "#E5E7EB",
//               }}
//             >
//               <FileText
//                 size={40}
//                 className="mx-auto mb-4"
//                 style={{
//                   color:
//                     BRANDING.subheading,
//                 }}
//               />

//               <h2
//                 className="text-lg font-semibold"
//                 style={{
//                   color:
//                     BRANDING.heading,
//                 }}
//               >
//                 Select a section
//               </h2>

//               <p
//                 className="text-sm mt-2"
//                 style={{
//                   color:
//                     BRANDING.bodyText,
//                 }}
//               >
//                 Select a section from the
//                 left to manage its content.
//               </p>
//             </div>
//           ) : (
//             <div className="space-y-5">
//               {/* =========================================
//                   SECTION HEADER
//               ========================================= */}

//               <div
//                 className="rounded-2xl border p-6"
//                 style={{
//                   backgroundColor:
//                     BRANDING.cards,
//                   borderColor:
//                     "#E5E7EB",
//                 }}
//               >
//                 <div className="flex items-center gap-4">
//                   {(() => {
//                     const Icon =
//                       activeConfig?.icon ||
//                       FileText;

//                     return (
//                       <div
//                         className="w-12 h-12 rounded-xl flex items-center justify-center"
//                         style={{
//                           backgroundColor:
//                             `${BRANDING.primary}12`,
//                         }}
//                       >
//                         <Icon
//                           size={23}
//                           style={{
//                             color:
//                               BRANDING.primary,
//                           }}
//                         />
//                       </div>
//                     );
//                   })()}

//                   <div>
//                     <div className="flex items-center gap-2 flex-wrap">
//                       <h2
//                         className="text-xl font-semibold"
//                         style={{
//                           color:
//                             BRANDING.heading,
//                         }}
//                       >
//                         {getSectionLabel(
//                           activeSection
//                         )}
//                       </h2>

//                       {activeConfig?.dynamic && (
//                         <span
//                           className="px-2.5 py-1 rounded-full text-xs font-medium"
//                           style={{
//                             backgroundColor:
//                               `${BRANDING.icon}15`,
//                             color:
//                               BRANDING.icon,
//                           }}
//                         >
//                           Automatic
//                         </span>
//                       )}
//                     </div>

//                     <p
//                       className="text-sm mt-1"
//                       style={{
//                         color:
//                           BRANDING.bodyText,
//                       }}
//                     >
//                       {
//                         activeConfig?.description
//                       }
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* =========================================
//                   AUTOMATIC SECTION
//               ========================================= */}

//               {renderDynamicSection()}

//               {/* =========================================
//                   EDITABLE SECTION
//               ========================================= */}

//               {!activeConfig?.dynamic && (
//                 <div
//                   className="rounded-2xl border"
//                   style={{
//                     backgroundColor:
//                       BRANDING.cards,
//                     borderColor:
//                       "#E5E7EB",
//                   }}
//                 >
//                   <div className="p-6 sm:p-8">
//                     <div className="space-y-6">
//                       {(
//                         activeConfig?.fields ||
//                         []
//                       ).map(
//                         renderField
//                       )}
//                     </div>
//                   </div>

//                   {/* SAVE */}

//                   <div
//                     className="px-6 sm:px-8 py-5 border-t flex justify-end"
//                     style={{
//                       borderColor:
//                         "#E5E7EB",
//                     }}
//                   >
//                     <button
//                       type="button"
//                       onClick={
//                         handleSave
//                       }
//                       disabled={
//                         saving ||
//                         !hasChanges
//                       }
//                       className="px-5 py-2.5 rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
//                       style={{
//                         backgroundColor:
//                           BRANDING.button,
//                       }}
//                     >
//                       {saving ? (
//                         <>
//                           <Loader2
//                             size={18}
//                             className="animate-spin"
//                           />
//                           Saving...
//                         </>
//                       ) : (
//                         <>
//                           <Save
//                             size={18}
//                           />
//                           Save Changes
//                         </>
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               )}

//               {/* =========================================
//                   PREVIEW NOTE
//               ========================================= */}

//               {!activeConfig?.dynamic && (
//                 <div
//                   className="rounded-2xl border p-5 flex items-start gap-3"
//                   style={{
//                     backgroundColor:
//                       `${BRANDING.primary}08`,
//                     borderColor:
//                       `${BRANDING.primary}20`,
//                   }}
//                 >
//                   <Eye
//                     size={20}
//                     className="shrink-0 mt-0.5"
//                     style={{
//                       color:
//                         BRANDING.primary,
//                     }}
//                   />

//                   <div>
//                     <p
//                       className="text-sm font-semibold"
//                       style={{
//                         color:
//                           BRANDING.heading,
//                       }}
//                     >
//                       Preview your changes
//                     </p>

//                     <p
//                       className="text-sm mt-1"
//                       style={{
//                         color:
//                           BRANDING.bodyText,
//                       }}
//                     >
//                       Save your content first,
//                       then open Website Preview
//                       to check how it appears
//                       on the public website.
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//         </main>
//       </div>

//       {/* ===================================================
//           UNSAVED CHANGES BAR
//       =================================================== */}

//       {hasChanges && (
//         <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-3xl">
//           <div
//             className="rounded-2xl border p-4 shadow-2xl"
//             style={{
//               backgroundColor:
//                 BRANDING.cards,
//               borderColor:
//                 `${BRANDING.primary}40`,
//             }}
//           >
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//               <div className="flex items-start gap-3">
//                 <div
//                   className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
//                   style={{
//                     backgroundColor:
//                       `${BRANDING.gold}15`,
//                   }}
//                 >
//                   <AlertCircle
//                     size={18}
//                     style={{
//                       color:
//                         BRANDING.gold,
//                     }}
//                   />
//                 </div>

//                 <div>
//                   <p
//                     className="text-sm font-semibold"
//                     style={{
//                       color:
//                         BRANDING.heading,
//                     }}
//                   >
//                     Unsaved changes
//                   </p>

//                   <p
//                     className="text-xs mt-1"
//                     style={{
//                       color:
//                         BRANDING.bodyText,
//                     }}
//                   >
//                     Save your changes before
//                     leaving this page.
//                   </p>
//                 </div>
//               </div>

//               <button
//                 type="button"
//                 onClick={
//                   handleSave
//                 }
//                 disabled={saving}
//                 className="px-5 py-2.5 rounded-xl text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//                 style={{
//                   backgroundColor:
//                     BRANDING.button,
//                 }}
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
//                     <Save size={17} />
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



// // src/pages/institute/Website/WebsiteContent.jsx

// import { useEffect, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";

// import {
//   ArrowLeft,
//   Save,
//   Loader2,
//   FileText,
//   BookOpen,
//   Users,
//   MessageSquare,
//   CalendarDays,
//   Home,
//   Info,
//   Eye,
//   AlertCircle,
//   ChevronDown,
//   ChevronRight,
// } from "lucide-react";

// import toast from "react-hot-toast";

// import {
//   getWebsiteData,
//   updateSectionContent,
// } from "../../services/websiteService";


// /* =========================================================
//    BRANDING
// ========================================================= */

// const BRANDING = {
//   primary: "#7C3AED",
//   primaryDark: "#5B21B6",
//   gold: "#F59E0B",

//   background: "#FAFAF9",
//   text: "#111827",
//   cards: "#FFFFFF",

//   heading: "#111827",
//   subheading: "#374151",
//   bodyText: "#4B5562",

//   icon: "#0D9488",
//   button: "#9333EA",
// };


// /* =========================================================
//    SECTION CONFIGURATION
// ========================================================= */

// const SECTION_CONFIG = {

//   popularClasses: {
//     key: "popularClasses",
//     page: "home",
//     sectionKey: "popular_classes",
//     label: "Popular Classes",
//     icon: BookOpen,

//     dynamic: true,

//     description:
//       "Classes are loaded automatically. You can control the heading and subheading displayed above them.",

//     fields: [
//       {
//         key: "heading",
//         label: "Heading",
//         type: "text",
//         placeholder:
//           "Explore Our Classes",
//         description:
//           "Main heading displayed above Popular Classes.",
//       },

//       {
//         key: "subheading",
//         label: "Subheading",
//         type: "text",
//         placeholder:
//           "POPULAR CLASSES",
//         description:
//           "Small text displayed above the main heading.",
//       },
//     ],
//   },


//   categories: {
//     key: "categories",
//     page: "home",
//     sectionKey: "categories",
//     label: "Categories",
//     icon: BookOpen,

//     dynamic: true,

//     description:
//       "Categories are loaded automatically from your institute category data.",

//     fields: [
//       {
//         key: "heading",
//         label: "Heading",
//         type: "text",
//         placeholder:
//           "Explore Our Categories",
//         description:
//           "Main heading displayed above Categories.",
//       },

//       {
//         key: "subheading",
//         label: "Subheading",
//         type: "text",
//         placeholder:
//           "CATEGORIES",
//         description:
//           "Small text displayed above the main heading.",
//       },
//     ],
//   },


//   homeTrainers: {
//     key: "homeTrainers",
//     page: "home",
//     sectionKey: "trainers",
//     label: "Trainers",
//     icon: Users,

//     dynamic: true,

//     description:
//       "Trainer data is loaded automatically from the Trainers module.",

//     fields: [
//       {
//         key: "heading",
//         label: "Heading",
//         type: "text",
//         placeholder:
//           "Meet Our Expert Trainers",
//         description:
//           "Main heading displayed above Trainers on Home.",
//       },

//       {
//         key: "subheading",
//         label: "Subheading",
//         type: "text",
//         placeholder:
//           "OUR TRAINERS",
//         description:
//           "Small text displayed above the main heading.",
//       },
//     ],
//   },


//   homeTestimonials: {
//     key: "homeTestimonials",
//     page: "home",
//     sectionKey: "testimonials",
//     label: "Testimonials",
//     icon: MessageSquare,

//     dynamic: true,

//     description:
//       "Testimonials are loaded automatically from your testimonial data.",

//     fields: [
//       {
//         key: "heading",
//         label: "Heading",
//         type: "text",
//         placeholder:
//           "What Our Students Say",
//         description:
//           "Main heading displayed above Testimonials on Home.",
//       },

//       {
//         key: "subheading",
//         label: "Subheading",
//         type: "text",
//         placeholder:
//           "STUDENT TESTIMONIALS",
//         description:
//           "Small text displayed above the main heading.",
//       },
//     ],
//   },


//   about: {
//     key: "about",
//     page: "about",
//     sectionKey: "about",
//     label: "About",
//     icon: Info,

//     description:
//       "Manage the heading and content displayed on the About page.",

//     fields: [
//       {
//         key: "heading",
//         label: "Heading",
//         type: "text",
//         placeholder:
//           "About Our Institute",
//         description:
//           "Main heading displayed on the About page.",
//       },

//       {
//         key: "subheading",
//         label: "Subheading",
//         type: "textarea",
//         placeholder:
//           "Discover who we are and what we offer.",
//         description:
//           "Supporting text displayed below the About heading.",
//       },

//       {
//         key: "description",
//         label: "Description",
//         type: "textarea",
//         placeholder:
//           "Tell visitors about your institute...",
//         description:
//           "Additional About page content.",
//       },

//       {
//         key: "mission",
//         label: "Mission",
//         type: "textarea",
//         placeholder:
//           "Our mission is...",
//         description:
//           "Optional mission statement.",
//       },

//       {
//         key: "vision",
//         label: "Vision",
//         type: "textarea",
//         placeholder:
//           "Our vision is...",
//         description:
//           "Optional vision statement.",
//       },

//       {
//         key: "imageUrl",
//         label: "About Image URL",
//         type: "text",
//         placeholder:
//           "https://example.com/about.jpg",
//         description:
//           "Optional About page image.",
//       },
//     ],
//   },


//   classCategories: {
//     key: "classCategories",
//     page: "classes",
//     sectionKey: "categories",
//     label: "Categories",
//     icon: BookOpen,

//     dynamic: true,

//     description:
//       "Manage the heading and subheading displayed above the category section on the Classes page.",

//     fields: [
//       {
//         key: "heading",
//         label: "Heading",
//         type: "text",
//         placeholder:
//           "Browse by Category",
//         description:
//           "Main heading displayed above the category section.",
//       },

//       {
//         key: "subheading",
//         label: "Subheading",
//         type: "text",
//         placeholder:
//           "CATEGORIES",
//         description:
//           "Small text displayed above the category heading.",
//       },
//     ],
//   },


//   classListing: {
//     key: "classListing",
//     page: "classes",
//     sectionKey: "classes",
//     label: "Class Listing",
//     icon: BookOpen,

//     dynamic: true,

//     description:
//       "Manage the heading and subheading displayed above the class listing on the Classes page.",

//     fields: [
//       {
//         key: "heading",
//         label: "Heading",
//         type: "text",
//         placeholder:
//           "Choose Your Class",
//         description:
//           "Main heading displayed above the class listing.",
//       },

//       {
//         key: "subheading",
//         label: "Subheading",
//         type: "text",
//         placeholder:
//           "OUR CLASSES",
//         description:
//           "Small text displayed above the class listing.",
//       },
//     ],
//   },


//   classes: {
//     key: "classes",
//     page: "classes",
//     sectionKey: "classes",
//     label: "Classes",
//     icon: BookOpen,

//     dynamic: true,

//     description:
//       "Legacy Classes content configuration kept for compatibility.",

//     fields: [
//       {
//         key: "heading",
//         label: "Heading",
//         type: "text",
//         placeholder:
//           "Choose Your Class",
//         description:
//           "Main heading displayed above the class listing.",
//       },

//       {
//         key: "subheading",
//         label: "Subheading",
//         type: "text",
//         placeholder:
//           "OUR CLASSES",
//         description:
//           "Small text displayed above the class listing.",
//       },
//     ],
//   },


//   sessions: {
//     key: "sessions",
//     page: "sessions",
//     sectionKey: "sessions",
//     label: "Sessions",
//     icon: CalendarDays,

//     dynamic: true,

//     description:
//       "Session information is loaded automatically from the Sessions module.",

//     fields: [
//       {
//         key: "heading",
//         label: "Heading",
//         type: "text",
//         placeholder:
//           "Upcoming Sessions",
//         description:
//           "Main heading displayed on the Sessions page.",
//       },

//       {
//         key: "subheading",
//         label: "Subheading",
//         type: "text",
//         placeholder:
//           "UPCOMING SESSIONS",
//         description:
//           "Small text displayed above the Sessions heading.",
//       },
//     ],
//   },


//   trainers: {
//     key: "trainers",
//     page: "trainers",
//     sectionKey: "trainers",
//     label: "Trainers",
//     icon: Users,

//     dynamic: true,

//     description:
//       "Trainer information is loaded automatically from the Trainers module.",

//     fields: [
//       {
//         key: "heading",
//         label: "Heading",
//         type: "text",
//         placeholder:
//           "Meet Our Trainers",
//         description:
//           "Main heading displayed on the Trainers page.",
//       },

//       {
//         key: "subheading",
//         label: "Subheading",
//         type: "text",
//         placeholder:
//           "OUR TRAINERS",
//         description:
//           "Small text displayed above the Trainers heading.",
//       },
//     ],
//   },


//   testimonials: {
//     key: "testimonials",
//     page: "testimonials",
//     sectionKey: "testimonials",
//     label: "Testimonials",
//     icon: MessageSquare,

//     dynamic: true,

//     description:
//       "Testimonial information is loaded automatically from the Testimonials module.",

//     fields: [
//       {
//         key: "heading",
//         label: "Heading",
//         type: "text",
//         placeholder:
//           "What Our Students Say",
//         description:
//           "Main heading displayed on the Testimonials page.",
//       },

//       {
//         key: "subheading",
//         label: "Subheading",
//         type: "text",
//         placeholder:
//           "TESTIMONIALS",
//         description:
//           "Small text displayed above the Testimonials heading.",
//       },
//     ],
//   },
// };


// /* =========================================================
//    DEFAULT CONTENT
// ========================================================= */

// const DEFAULT_CONTENT = {

//   popularClasses: {
//     heading: "Explore Our Classes",
//     subheading: "POPULAR CLASSES",
//   },

//   categories: {
//     heading: "Explore Our Categories",
//     subheading: "CATEGORIES",
//   },

//   homeTrainers: {
//     heading: "Meet Our Expert Trainers",
//     subheading: "OUR TRAINERS",
//   },

//   homeTestimonials: {
//     heading: "What Our Students Say",
//     subheading: "TESTIMONIALS",
//   },

//   about: {
//     heading: "About Our Institute",
//     subheading: "",
//     description: "",
//     mission: "",
//     vision: "",
//     imageUrl: "",
//   },

//   classCategories: {
//     heading: "Browse by Category",
//     subheading: "CATEGORIES",
//   },

//   classListing: {
//     heading: "Choose Your Class",
//     subheading: "OUR CLASSES",
//   },

//   classes: {
//     heading: "Choose Your Class",
//     subheading: "OUR CLASSES",
//   },

//   sessions: {
//     heading: "Upcoming Sessions",
//     subheading: "UPCOMING SESSIONS",
//   },

//   trainers: {
//     heading: "Meet Our Trainers",
//     subheading: "OUR TRAINERS",
//   },

//   testimonials: {
//     heading: "What Our Students Say",
//     subheading: "TESTIMONIALS",
//   },
// };


// /* =========================================================
//    PAGE CONFIGURATION
// ========================================================= */

// const PAGE_CONFIG = [

//   {
//     key: "home",
//     label: "Home",
//     icon: Home,

//     sections: [
//       "popularClasses",
//       "categories",
//       "homeTrainers",
//       "homeTestimonials",
//     ],
//   },

//   {
//     key: "about",
//     label: "About",
//     icon: Info,

//     sections: [
//       "about",
//     ],
//   },

//   {
//     key: "classes",
//     label: "Classes",
//     icon: BookOpen,

//     sections: [
//       "classCategories",
//       "classListing",
//     ],
//   },

//   {
//     key: "sessions",
//     label: "Sessions",
//     icon: CalendarDays,

//     sections: [
//       "sessions",
//     ],
//   },

//   {
//     key: "trainers",
//     label: "Trainers",
//     icon: Users,

//     sections: [
//       "trainers",
//     ],
//   },

//   {
//     key: "testimonials",
//     label: "Testimonials",
//     icon: MessageSquare,

//     sections: [
//       "testimonials",
//     ],
//   },
// ];


// /* =========================================================
//    BACKEND SECTION TYPE
// ========================================================= */

// const getRawSectionType = (
//   section
// ) => {

//   return (
//     section?.section_type ??
//     section?.sectionType ??
//     section?.type ??
//     ""
//   );
// };


// /* =========================================================
//    NORMALIZE
// ========================================================= */

// const normalizeSectionType = (
//   value
// ) => {

//   return String(value || "")
//     .trim()
//     .toLowerCase()
//     .replace(/[\s_-]+/g, "");
// };


// /* =========================================================
//    MAP BACKEND SECTION → CONFIG
// ========================================================= */

// const getSectionConfigKey = (
//   section
// ) => {

//   const normalized =
//     normalizeSectionType(
//       getRawSectionType(section)
//     );


//   switch (normalized) {

//     case "popularclasses":
//     case "popularclass":
//     case "featuredclasses":
//       return "popularClasses";


//     case "categories":
//     case "category":
//     case "courses":
//     case "course":
//       return "categories";


//     case "hometrainers":
//     case "featuredtrainers":
//       return "homeTrainers";


//     case "hometestimonials":
//     case "featuredtestimonials":
//       return "homeTestimonials";


//     case "about":
//     case "aboutus":
//       return "about";


//     case "classes":
//     case "class":
//     case "batches":
//     case "batch":
//       return "classes";


//     case "sessions":
//     case "session":
//       return "sessions";


//     case "trainers":
//     case "trainer":
//       return "trainers";


//     case "testimonials":
//     case "testimonial":
//       return "testimonials";


//     default:
//       return null;
//   }
// };


// /* =========================================================
//    ENABLED VALUE
// ========================================================= */

// const isSectionEnabled = (
//   section
// ) => {

//   const value =
//     section?.is_enabled ??
//     section?.isEnabled ??
//     section?.enabled ??
//     true;

//   return (
//     value === true ||
//     value === 1 ||
//     value === "1" ||
//     String(value).toLowerCase() ===
//       "true"
//   );
// };


// /* =========================================================
//    NORMALIZE CONTENT
// ========================================================= */

// const normalizeContent = (
//   configKey,
//   rawContent
// ) => {

//   const defaults =
//     DEFAULT_CONTENT[
//       configKey
//     ] || {};

//   let existing = {};

//   if (
//     rawContent &&
//     typeof rawContent === "object" &&
//     !Array.isArray(rawContent)
//   ) {
//     existing = rawContent;
//   }

//   if (typeof rawContent === "string") {

//     try {
//       const parsed =
//         JSON.parse(rawContent);

//       if (
//         parsed &&
//         typeof parsed === "object" &&
//         !Array.isArray(parsed)
//       ) {
//         existing = parsed;
//       }
//     } catch {
//       existing = {};
//     }
//   }


//   return {
//     ...defaults,
//     ...existing,

//     heading:
//       existing.heading ??
//       existing.title ??
//       defaults.heading ??
//       "",

//     subheading:
//       existing.subheading ??
//       existing.subtitle ??
//       defaults.subheading ??
//       "",
//   };
// };


// /* =========================================================
//    BUILD WEBSITE CONTENT SECTIONS

//    Website content is resolved by:

//    pageKey + sectionKey

//    This allows the same section key to exist
//    independently on different pages.

//    For example:

//    home + categories
//    classes + categories
//    classes + classes

//    are separate editable records.
// ========================================================= */

// const buildWebsiteSections = (
//   backendSections
// ) => {

//   const source =
//     Array.isArray(
//       backendSections
//     )
//       ? backendSections
//       : [];


//   /*
//    * Website content is identified by:
//    *
//    * pageKey + sectionKey
//    *
//    * This is required because the Classes page
//    * contains BOTH:
//    *
//    * classes + categories
//    * classes + classes
//    *
//    * They must have separate content.
//    */
//   const backendMap =
//     new Map();


//   source.forEach(
//     (section) => {

//       const rawType =
//         getRawSectionType(
//           section
//         );


//       const normalizedType =
//         normalizeSectionType(
//           rawType
//         );


//       const explicitPage =
//         String(
//           section?.page ??
//           section?.page_key ??
//           section?.pageKey ??
//           ""
//         )
//           .trim()
//           .toLowerCase();


//       const explicitSection =
//         String(
//           section?.section_key ??
//           section?.sectionKey ??
//           ""
//         )
//           .trim()
//           .toLowerCase();


//       let pageKey =
//         explicitPage;

//       let sectionKey =
//         explicitSection;


//       /*
//        * Backward-compatible fallback for APIs that
//        * return only section_type.
//        */
//       if (!sectionKey) {

//         if (
//           normalizedType === "popularclasses" ||
//           normalizedType === "popularclass" ||
//           normalizedType === "featuredclasses"
//         ) {
//           pageKey = pageKey || "home";
//           sectionKey = "popular_classes";

//         } else if (
//           normalizedType === "hometrainers" ||
//           normalizedType === "featuredtrainers"
//         ) {
//           pageKey = pageKey || "home";
//           sectionKey = "trainers";

//         } else if (
//           normalizedType === "hometestimonials" ||
//           normalizedType === "featuredtestimonials"
//         ) {
//           pageKey = pageKey || "home";
//           sectionKey = "testimonials";

//         } else if (
//           normalizedType === "about" ||
//           normalizedType === "aboutus"
//         ) {
//           pageKey = pageKey || "about";
//           sectionKey = "about";

//         } else if (
//           normalizedType === "categories" ||
//           normalizedType === "category"
//         ) {
//           /*
//            * Old category records are treated as Home
//            * unless the backend explicitly says page=classes.
//            */
//           pageKey = pageKey || "home";
//           sectionKey = "categories";

//         } else if (
//           normalizedType === "classes" ||
//           normalizedType === "class" ||
//           normalizedType === "batches" ||
//           normalizedType === "batch"
//         ) {
//           pageKey = pageKey || "classes";
//           sectionKey = "classes";

//         } else if (
//           normalizedType === "sessions" ||
//           normalizedType === "session"
//         ) {
//           pageKey = pageKey || "sessions";
//           sectionKey = "sessions";

//         } else if (
//           normalizedType === "trainers" ||
//           normalizedType === "trainer"
//         ) {
//           pageKey = pageKey || "trainers";
//           sectionKey = "trainers";

//         } else if (
//           normalizedType === "testimonials" ||
//           normalizedType === "testimonial"
//         ) {
//           pageKey = pageKey || "testimonials";
//           sectionKey = "testimonials";
//         }
//       }


//       if (
//         !pageKey ||
//         !sectionKey
//       ) {
//         return;
//       }


//       const mapKey =
//         `${pageKey}:${normalizeSectionType(sectionKey)}`;


//       /*
//        * Keep the first matching record.
//        * This prevents duplicate API records from
//        * replacing the intended content unexpectedly.
//        */
//       if (!backendMap.has(mapKey)) {

//         backendMap.set(
//           mapKey,
//           section
//         );

//       }

//     }
//   );


//   const result = [];


//   PAGE_CONFIG.forEach(
//     (page) => {

//       page.sections.forEach(
//         (configKey) => {

//           const config =
//             SECTION_CONFIG[
//               configKey
//             ];


//           if (!config) {
//             return;
//           }


//           const mapKey =
//             `${String(config.page).trim().toLowerCase()}:${normalizeSectionType(config.sectionKey)}`;


//           const backendSection =
//             backendMap.get(
//               mapKey
//             );


//           const content =
//             normalizeContent(
//               configKey,
//               backendSection?.content
//             );


//           result.push({

//             ...(backendSection || {}),

//             id:
//               backendSection?.id ??
//               null,

//             __configKey:
//               configKey,

//             __pageKey:
//               config.page,

//             __sectionKey:
//               config.sectionKey,

//             __virtual:
//               !backendSection,

//             __rawType:
//               backendSection
//                 ? getRawSectionType(
//                     backendSection
//                   )
//                 : configKey,

//             content,
//           });

//         }
//       );
//     }
//   );


//   return result;
// };


// /* =========================================================
//    COMPONENT
// ========================================================= */

// export default function WebsiteContent() {

//   const navigate =
//     useNavigate();


//   const [
//     sections,
//     setSections,
//   ] = useState([]);


//   const [
//     activeSection,
//     setActiveSection,
//   ] = useState(null);


//   const [
//     content,
//     setContent,
//   ] = useState({});


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


//   const [
//     expandedPages,
//     setExpandedPages,
//   ] = useState({

//     home: true,

//     about: true,

//     classes: true,

//     sessions: true,

//     trainers: true,

//     testimonials: true,

//   });


//   /* =======================================================
//      LOAD WEBSITE
//   ======================================================= */

//   useEffect(() => {

//     loadWebsite();

//   }, []);


//   const loadWebsite = async () => {

//     try {

//       setLoading(true);


//       const response =
//         await getWebsiteData();


//       console.log(
//         "WEBSITE CONTENT RESPONSE:",
//         response
//       );


//       let data =
//         response;


//       if (
//         data &&
//         typeof data === "object" &&
//         data.data &&
//         typeof data.data === "object" &&
//         !Array.isArray(data.data)
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
//         "BACKEND WEBSITE SECTIONS:",
//         backendSections
//       );


//       const websiteSections =
//         buildWebsiteSections(
//           backendSections
//         );


//       console.log(
//         "CONTENT PAGE SECTIONS:",
//         websiteSections
//       );


//       setSections(
//         websiteSections
//       );


//       if (websiteSections.length > 0) {
//         selectSection(websiteSections[0]);
//       }

//     } catch (error) {

//       console.error(
//         "LOAD WEBSITE CONTENT ERROR:",
//         error
//       );


//       toast.error(
//         error?.response?.data
//           ?.message ||
//         error?.message ||
//         "Failed to load website content"
//       );

//     } finally {

//       setLoading(false);

//     }
//   };


//   /* =======================================================
//      SELECT SECTION
//   ======================================================= */

//   const selectSection = (
//     section
//   ) => {

//     if (!section) {
//       return;
//     }


//     const configKey =
//       section.__configKey ||
//       getSectionConfigKey(
//         section
//       );


//     const normalized =
//       normalizeContent(
//         configKey,
//         section.content
//       );


//     setActiveSection(
//       section
//     );


//     setContent(
//       normalized
//     );


//     setHasChanges(
//       false
//     );
//   };


//   /* =======================================================
//      ACTIVE CONFIG
//   ======================================================= */

//   const activeConfig =
//     useMemo(() => {

//       if (!activeSection) {
//         return null;
//       }


//       const configKey =
//         activeSection.__configKey ||
//         getSectionConfigKey(
//           activeSection
//         );


//       return (
//         SECTION_CONFIG[
//           configKey
//         ] || null
//       );

//     }, [
//       activeSection,
//     ]);


//   /* =======================================================
//      CHANGE FIELD
//   ======================================================= */

//   const handleChange = (
//     key,
//     value
//   ) => {

//     setContent(
//       (previous) => ({
//         ...previous,
//         [key]: value,
//       })
//     );


//     setHasChanges(
//       true
//     );
//   };


//   /* =======================================================
//      SAVE
     
//      IMPORTANT:

//      DO NOT BLOCK VIRTUAL SECTIONS.

//      Popular Classes, Categories,
//      Home Trainers and Home Testimonials
//      are content records and therefore don't
//      need their own website_sections row.
//   ======================================================= */

//   const handleSave = async () => {

//     if (!activeSection) {
//       return;
//     }


//     const pageKey =
//       activeSection.__pageKey;


//     const sectionKey =
//       activeSection.__sectionKey;


//     if (!pageKey) {

//       toast.error(
//         "Page key is missing"
//       );

//       return;
//     }


//     if (!sectionKey) {

//       toast.error(
//         "Section key is missing"
//       );

//       return;
//     }


//     try {

//       setSaving(true);


//       console.log(
//         "SAVING WEBSITE CONTENT:",
//         {
//           pageKey,
//           sectionKey,
//           content,
//         }
//       );


//       /*
//        * IMPORTANT:
//        *
//        * New updateSectionContent()
//        * accepts:
//        *
//        * {
//        *   pageKey,
//        *   sectionKey,
//        *   content
//        * }
//        */

//       await updateSectionContent({

//         pageKey,

//         sectionKey,

//         content: {
//           ...content,
//         },

//       });


//       const updatedSection = {

//         ...activeSection,

//         content: {
//           ...content,
//         },

//         __virtual: false,

//       };


//       setActiveSection(
//         updatedSection
//       );


//       setSections(
//         (previous) =>
//           previous.map(
//             (section) => {

//               if (
//                 section.__configKey ===
//                 activeSection.__configKey
//               ) {

//                 return updatedSection;

//               }

//               return section;

//             }
//           )
//       );


//       setHasChanges(
//         false
//       );


//       toast.success(
//         `${activeConfig?.label || "Section"} content saved successfully`
//       );


//     } catch (error) {

//       console.error(
//         "SAVE WEBSITE CONTENT ERROR:",
//         error
//       );


//       toast.error(
//         error?.response?.data
//           ?.message ||
//         error?.message ||
//         "Failed to save website content"
//       );

//     } finally {

//       setSaving(false);

//     }
//   };


//   /* =======================================================
//      TOGGLE PAGE
//   ======================================================= */

//   const togglePage = (
//     pageKey
//   ) => {

//     setExpandedPages(
//       (previous) => ({

//         ...previous,

//         [pageKey]:
//           !previous[pageKey],

//       })
//     );
//   };


//   /* =======================================================
//      GET SECTION
//   ======================================================= */

//   const getPageSection = (
//     configKey
//   ) => {

//     return sections.find(
//       (section) =>
//         section.__configKey ===
//         configKey
//     );
//   };


//   /* =======================================================
//      RENDER FIELD
//   ======================================================= */

//   const renderField = (
//     field
//   ) => {

//     const value =
//       content?.[
//         field.key
//       ] ?? "";


//     return (

//       <div
//         key={field.key}
//         className="space-y-2"
//       >

//         <label
//           className="block text-sm font-semibold"
//           style={{
//             color:
//               BRANDING.heading,
//           }}
//         >
//           {field.label}
//         </label>


//         {field.description && (

//           <p
//             className="text-xs"
//             style={{
//               color:
//                 BRANDING.bodyText,
//             }}
//           >
//             {field.description}
//           </p>

//         )}


//         {field.type ===
//         "textarea" ? (

//           <textarea
//             value={value}
//             onChange={(event) =>
//               handleChange(
//                 field.key,
//                 event.target.value
//               )
//             }
//             placeholder={
//               field.placeholder
//             }
//             rows={5}
//             className="w-full rounded-xl px-4 py-3 outline-none resize-y transition"
//             style={{
//               backgroundColor:
//                 "#FFFFFF",

//               color:
//                 BRANDING.text,

//               border:
//                 "1px solid #D1D5DB",
//             }}

//             onFocus={(event) => {

//               event.currentTarget.style.borderColor =
//                 BRANDING.primary;

//             }}

//             onBlur={(event) => {

//               event.currentTarget.style.borderColor =
//                 "#D1D5DB";

//             }}
//           />

//         ) : (

//           <input
//             type="text"
//             value={value}
//             onChange={(event) =>
//               handleChange(
//                 field.key,
//                 event.target.value
//               )
//             }
//             placeholder={
//               field.placeholder
//             }
//             className="w-full rounded-xl px-4 py-3 outline-none transition"
//             style={{
//               backgroundColor:
//                 "#FFFFFF",

//               color:
//                 BRANDING.text,

//               border:
//                 "1px solid #D1D5DB",
//             }}

//             onFocus={(event) => {

//               event.currentTarget.style.borderColor =
//                 BRANDING.primary;

//             }}

//             onBlur={(event) => {

//               event.currentTarget.style.borderColor =
//                 "#D1D5DB";

//             }}
//           />

//         )}

//       </div>

//     );
//   };


//   /* =======================================================
//      LOADING
//   ======================================================= */

//   if (loading) {

//     return (

//       <div
//         className="min-h-[400px] flex items-center justify-center"
//         style={{
//           backgroundColor:
//             BRANDING.background,
//         }}
//       >

//         <div
//           className="flex items-center gap-3"
//           style={{
//             color:
//               BRANDING.bodyText,
//           }}
//         >

//           <Loader2
//             size={22}
//             className="animate-spin"
//             style={{
//               color:
//                 BRANDING.primary,
//             }}
//           />

//           <span>
//             Loading website content...
//           </span>

//         </div>

//       </div>

//     );
//   }


//   /* =======================================================
//      PAGE
//   ======================================================= */

//   return (

//     <div
//       className="space-y-6 pb-28"
//       style={{
//         fontFamily:
//           "inherit",
//       }}
//     >

//       {/* ===================================================
//           HEADER
//       =================================================== */}

//       <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

//         <div className="flex items-center gap-4">

//           <button
//             type="button"
//             onClick={() =>
//               navigate(
//                 "/institute/website"
//               )
//             }
//             className="w-10 h-10 rounded-xl flex items-center justify-center transition hover:bg-gray-100"
//             style={{
//               color:
//                 BRANDING.bodyText,
//             }}
//           >

//             <ArrowLeft
//               size={21}
//             />

//           </button>


//           <div>

//             <div className="flex items-center gap-2">

//               <FileText
//                 size={23}
//                 style={{
//                   color:
//                     BRANDING.primary,
//                 }}
//               />

//               <h1
//                 className="text-2xl font-bold"
//                 style={{
//                   color:
//                     BRANDING.heading,
//                 }}
//               >
//                 Website Content
//               </h1>

//             </div>


//             <p
//               className="text-sm mt-1"
//               style={{
//                 color:
//                   BRANDING.bodyText,
//               }}
//             >
//               Manage headings, subheadings and
//               page content displayed on your
//               institute website.
//             </p>

//           </div>

//         </div>


//         {activeSection && (

//           <button
//             type="button"
//             onClick={
//               handleSave
//             }
//             disabled={
//               saving ||
//               !hasChanges
//             }
//             className="px-5 py-2.5 rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
//             style={{
//               backgroundColor:
//                 BRANDING.button,
//             }}
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

//         )}

//       </div>


//       {/* ===================================================
//           MAIN GRID
//       =================================================== */}

//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">


//         {/* =================================================
//             LEFT MENU
//         ================================================= */}

//         <aside className="lg:col-span-1">

//           <div
//             className="rounded-2xl border p-3 lg:sticky lg:top-6"
//             style={{
//               backgroundColor:
//                 BRANDING.cards,

//               borderColor:
//                 "#E5E7EB",
//             }}
//           >

//             <p
//               className="px-3 py-2 text-xs font-semibold uppercase tracking-wider"
//               style={{
//                 color:
//                   BRANDING.subheading,
//               }}
//             >
//               Website Content
//             </p>


//             <div className="space-y-2">

//               {PAGE_CONFIG.map(
//                 (page) => {

//                   const PageIcon =
//                     page.icon;

//                   const expanded =
//                     expandedPages[
//                       page.key
//                     ];


//                   return (

//                     <div
//                       key={page.key}
//                       className="rounded-xl overflow-hidden"
//                     >

//                       <button
//                         type="button"
//                         onClick={() =>
//                           togglePage(
//                             page.key
//                           )
//                         }
//                         className="w-full flex items-center gap-3 px-3 py-3 text-left transition"
//                         style={{
//                           backgroundColor:
//                             "#F8FAFC",
//                         }}
//                       >

//                         <PageIcon
//                           size={18}
//                           style={{
//                             color:
//                               BRANDING.primary,
//                           }}
//                         />


//                         <span
//                           className="flex-1 text-sm font-bold"
//                           style={{
//                             color:
//                               BRANDING.heading,
//                           }}
//                         >
//                           {page.label}
//                         </span>


//                         {expanded ? (

//                           <ChevronDown
//                             size={17}
//                             style={{
//                               color:
//                                 BRANDING.bodyText,
//                             }}
//                           />

//                         ) : (

//                           <ChevronRight
//                             size={17}
//                             style={{
//                               color:
//                                 BRANDING.bodyText,
//                             }}
//                           />

//                         )}

//                       </button>


//                       {expanded && (

//                         <div className="mt-1 space-y-1">

//                           {page.sections.map(
//                             (configKey) => {

//                               const config =
//                                 SECTION_CONFIG[
//                                   configKey
//                                 ];


//                               const section =
//                                 getPageSection(
//                                   configKey
//                                 );


//                               if (
//                                 !config ||
//                                 !section
//                               ) {
//                                 return null;
//                               }


//                               const Icon =
//                                 config.icon;


//                               const isActive =
//                                 activeSection?.__configKey ===
//                                 configKey;


//                               const enabled =
//                                 isSectionEnabled(
//                                   section
//                                 );


//                               return (

//                                 <button
//                                   key={
//                                     configKey
//                                   }
//                                   type="button"
//                                   onClick={() =>
//                                     selectSection(
//                                       section
//                                     )
//                                   }
//                                   className="w-full text-left rounded-xl px-3 py-3 ml-1 flex items-center gap-3 transition"
//                                   style={{

//                                     width:
//                                       "calc(100% - 0.25rem)",

//                                     backgroundColor:
//                                       isActive
//                                         ? `${BRANDING.primary}12`
//                                         : "transparent",

//                                     border:
//                                       isActive
//                                         ? `1px solid ${BRANDING.primary}30`
//                                         : "1px solid transparent",

//                                   }}
//                                 >

//                                   <div
//                                     className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
//                                     style={{
//                                       backgroundColor:
//                                         isActive
//                                           ? `${BRANDING.primary}15`
//                                           : "#F3F4F6",
//                                     }}
//                                   >

//                                     <Icon
//                                       size={
//                                         16
//                                       }
//                                       style={{
//                                         color:
//                                           isActive
//                                             ? BRANDING.primary
//                                             : BRANDING.subheading,
//                                       }}
//                                     />

//                                   </div>


//                                   <div className="flex-1 min-w-0">

//                                     <p
//                                       className="text-sm font-semibold truncate"
//                                       style={{
//                                         color:
//                                           isActive
//                                             ? BRANDING.heading
//                                             : BRANDING.bodyText,
//                                       }}
//                                     >
//                                       {
//                                         config.label
//                                       }
//                                     </p>


//                                     {config.dynamic && (

//                                       <p
//                                         className="text-[10px] mt-0.5"
//                                         style={{
//                                           color:
//                                             BRANDING.icon,
//                                         }}
//                                       >
//                                         Data automatic
//                                       </p>

//                                     )}


//                                     {!enabled && (

//                                       <p
//                                         className="text-[10px] mt-0.5"
//                                         style={{
//                                           color:
//                                             BRANDING.gold,
//                                         }}
//                                       >
//                                         Hidden
//                                       </p>

//                                     )}

//                                   </div>

//                                 </button>

//                               );

//                             }
//                           )}

//                         </div>

//                       )}

//                     </div>

//                   );

//                 }
//               )}

//             </div>

//           </div>

//         </aside>


//         {/* =================================================
//             RIGHT CONTENT
//         ================================================= */}

//         <main className="lg:col-span-3">

//           {!activeSection ? (

//             <div
//               className="rounded-2xl border p-10 text-center"
//               style={{
//                 backgroundColor:
//                   BRANDING.cards,

//                 borderColor:
//                   "#E5E7EB",
//               }}
//             >

//               <FileText
//                 size={40}
//                 className="mx-auto mb-4"
//                 style={{
//                   color:
//                     BRANDING.subheading,
//                 }}
//               />


//               <h2
//                 className="text-lg font-semibold"
//                 style={{
//                   color:
//                     BRANDING.heading,
//                 }}
//               >
//                 Select a section
//               </h2>


//               <p
//                 className="text-sm mt-2"
//                 style={{
//                   color:
//                     BRANDING.bodyText,
//                 }}
//               >
//                 Select a page and section
//                 from the left to manage its
//                 content.
//               </p>

//             </div>

//           ) : (

//             <div className="space-y-5">


//               {/* =========================================
//                   SECTION HEADER
//               ========================================= */}

//               <div
//                 className="rounded-2xl border p-6"
//                 style={{
//                   backgroundColor:
//                     BRANDING.cards,

//                   borderColor:
//                     "#E5E7EB",
//                 }}
//               >

//                 <div className="flex items-center gap-4">

//                   {(() => {

//                     const Icon =
//                       activeConfig?.icon ||
//                       FileText;


//                     return (

//                       <div
//                         className="w-12 h-12 rounded-xl flex items-center justify-center"
//                         style={{
//                           backgroundColor:
//                             `${BRANDING.primary}12`,
//                         }}
//                       >

//                         <Icon
//                           size={23}
//                           style={{
//                             color:
//                               BRANDING.primary,
//                           }}
//                         />

//                       </div>

//                     );

//                   })()}


//                   <div>

//                     <h2
//                       className="text-xl font-semibold"
//                       style={{
//                         color:
//                           BRANDING.heading,
//                       }}
//                     >
//                       {
//                         activeConfig?.label
//                       }
//                     </h2>


//                     <p
//                       className="text-sm mt-1"
//                       style={{
//                         color:
//                           BRANDING.bodyText,
//                       }}
//                     >
//                       {
//                         activeConfig?.description
//                       }
//                     </p>

//                   </div>

//                 </div>

//               </div>


//               {/* =========================================
//                   CONTENT FORM
//               ========================================= */}

//               <div
//                 className="rounded-2xl border"
//                 style={{
//                   backgroundColor:
//                     BRANDING.cards,

//                   borderColor:
//                     "#E5E7EB",
//                 }}
//               >

//                 <div className="p-6 sm:p-8">

//                   <div className="space-y-6">

//                     {(
//                       activeConfig?.fields ||
//                       []
//                     ).map(
//                       renderField
//                     )}

//                   </div>

//                 </div>


//                 {/* =======================================
//                     DYNAMIC DATA INFORMATION
//                 ======================================= */}

//                 {activeConfig?.dynamic && (

//                   <div
//                     className="mx-6 sm:mx-8 mb-6 rounded-xl border p-4 flex items-start gap-3"
//                     style={{
//                       backgroundColor:
//                         "#F8FAFC",

//                       borderColor:
//                         "#E5E7EB",
//                     }}
//                   >

//                     <Eye
//                       size={18}
//                       className="shrink-0 mt-0.5"
//                       style={{
//                         color:
//                           BRANDING.icon,
//                       }}
//                     />


//                     <div>

//                       <p
//                         className="text-sm font-semibold"
//                         style={{
//                           color:
//                             BRANDING.heading,
//                         }}
//                       >
//                         Content and data are
//                         separate
//                       </p>


//                       <p
//                         className="text-xs mt-1"
//                         style={{
//                           color:
//                             BRANDING.bodyText,
//                         }}
//                       >
//                         The heading and
//                         subheading are managed
//                         here. The actual{" "}
//                         {
//                           activeConfig.label
//                         }{" "}
//                         records are still
//                         loaded automatically
//                         from their respective
//                         institute module.
//                       </p>

//                     </div>

//                   </div>

//                 )}


//                 {/* =======================================
//                     SAVE
//                 ======================================= */}

//                 <div
//                   className="px-6 sm:px-8 py-5 border-t flex justify-end"
//                   style={{
//                     borderColor:
//                       "#E5E7EB",
//                   }}
//                 >

//                   <button
//                     type="button"
//                     onClick={
//                       handleSave
//                     }
//                     disabled={
//                       saving ||
//                       !hasChanges
//                     }
//                     className="px-5 py-2.5 rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
//                     style={{
//                       backgroundColor:
//                         BRANDING.button,
//                     }}
//                   >

//                     {saving ? (

//                       <>
//                         <Loader2
//                           size={18}
//                           className="animate-spin"
//                         />

//                         Saving...
//                       </>

//                     ) : (

//                       <>
//                         <Save
//                           size={18}
//                         />

//                         Save Changes
//                       </>

//                     )}

//                   </button>

//                 </div>

//               </div>


//               {/* =========================================
//                   PREVIEW NOTE
//               ========================================= */}

//               <div
//                 className="rounded-2xl border p-5 flex items-start gap-3"
//                 style={{
//                   backgroundColor:
//                     `${BRANDING.primary}08`,

//                   borderColor:
//                     `${BRANDING.primary}20`,
//                 }}
//               >

//                 <Eye
//                   size={20}
//                   className="shrink-0 mt-0.5"
//                   style={{
//                     color:
//                       BRANDING.primary,
//                   }}
//                 />


//                 <div>

//                   <p
//                     className="text-sm font-semibold"
//                     style={{
//                       color:
//                         BRANDING.heading,
//                     }}
//                   >
//                     Preview your changes
//                   </p>


//                   <p
//                     className="text-sm mt-1"
//                     style={{
//                       color:
//                         BRANDING.bodyText,
//                     }}
//                   >
//                     Save the content and
//                     refresh the website
//                     preview. The preview
//                     pages should read the
//                     heading and subheading
//                     from this section's
//                     content.
//                   </p>

//                 </div>

//               </div>

//             </div>

//           )}

//         </main>

//       </div>


//       {/* ===================================================
//           UNSAVED CHANGES BAR
//       =================================================== */}

//       {hasChanges && (

//         <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-3xl">

//           <div
//             className="rounded-2xl border p-4 shadow-2xl"
//             style={{
//               backgroundColor:
//                 BRANDING.cards,

//               borderColor:
//                 `${BRANDING.primary}40`,
//             }}
//           >

//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

//               <div className="flex items-start gap-3">

//                 <div
//                   className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
//                   style={{
//                     backgroundColor:
//                       `${BRANDING.gold}15`,
//                   }}
//                 >

//                   <AlertCircle
//                     size={18}
//                     style={{
//                       color:
//                         BRANDING.gold,
//                     }}
//                   />

//                 </div>


//                 <div>

//                   <p
//                     className="text-sm font-semibold"
//                     style={{
//                       color:
//                         BRANDING.heading,
//                     }}
//                   >
//                     Unsaved changes
//                   </p>


//                   <p
//                     className="text-xs mt-1"
//                     style={{
//                       color:
//                         BRANDING.bodyText,
//                     }}
//                   >
//                     Save your changes before
//                     leaving this page.
//                   </p>

//                 </div>

//               </div>


//               <button
//                 type="button"
//                 onClick={
//                   handleSave
//                 }
//                 disabled={saving}
//                 className="px-5 py-2.5 rounded-xl text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//                 style={{
//                   backgroundColor:
//                     BRANDING.button,
//                 }}
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




import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  Loader2,
  FileText,
  BookOpen,
  Users,
  MessageSquare,
  CalendarDays,
  Home,
  Eye,
  AlertCircle,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import toast from "react-hot-toast";

import {
  getWebsiteData,
  updateSectionContent,
} from "../../services/websiteService";

/* =========================================================
   BRANDING
========================================================= */

const BRANDING = {
  primary: "#7C3AED",
  gold: "#F59E0B",
  background: "#FAFAF9",
  text: "#111827",
  cards: "#FFFFFF",
  heading: "#111827",
  subheading: "#374151",
  bodyText: "#4B5562",
  icon: "#0D9488",
  button: "#9333EA",
};

/* =========================================================
   SECTION CONFIG
========================================================= */

const SECTION_CONFIG = {
  popularClasses: {
    key: "popularClasses",
    pageKey: "home",
    sectionKey: "popular_classes",
    label: "Popular Classes",
    icon: BookOpen,
    dynamic: true,
    description:
      "Manage the heading and subheading displayed above Popular Classes on the Home page.",
    fields: [
      {
        key: "heading",
        label: "Heading",
        type: "text",
        placeholder: "Explore Our Classes",
        description:
          "Main heading displayed above Popular Classes.",
      },
      {
        key: "subheading",
        label: "Subheading",
        type: "text",
        placeholder: "POPULAR CLASSES",
        description:
          "Small text displayed above the main heading.",
      },
    ],
  },

  homeCategories: {
    key: "homeCategories",
    pageKey: "home",
    sectionKey: "categories",
    label: "Categories",
    icon: BookOpen,
    dynamic: true,
    description:
      "Manage the heading and subheading displayed above Categories on the Home page.",
    fields: [
      {
        key: "heading",
        label: "Heading",
        type: "text",
        placeholder: "Explore Our Categories",
        description:
          "Main heading displayed above Categories.",
      },
      {
        key: "subheading",
        label: "Subheading",
        type: "text",
        placeholder: "CATEGORIES",
        description:
          "Small text displayed above the category heading.",
      },
    ],
  },

  homeTrainers: {
    key: "homeTrainers",
    pageKey: "home",
    sectionKey: "trainers",
    label: "Trainers",
    icon: Users,
    dynamic: true,
    description:
      "Manage the heading and subheading displayed above Trainers on the Home page.",
    fields: [
      {
        key: "heading",
        label: "Heading",
        type: "text",
        placeholder: "Meet Our Expert Trainers",
        description:
          "Main heading displayed above Trainers.",
      },
      {
        key: "subheading",
        label: "Subheading",
        type: "text",
        placeholder: "OUR TRAINERS",
        description:
          "Small text displayed above the main heading.",
      },
    ],
  },

  homeTestimonials: {
    key: "homeTestimonials",
    pageKey: "home",
    sectionKey: "testimonials",
    label: "Testimonials",
    icon: MessageSquare,
    dynamic: true,
    description:
      "Manage the heading and subheading displayed above Testimonials on the Home page.",
    fields: [
      {
        key: "heading",
        label: "Heading",
        type: "text",
        placeholder: "What Our Students Say",
        description:
          "Main heading displayed above Testimonials.",
      },
      {
        key: "subheading",
        label: "Subheading",
        type: "text",
        placeholder: "TESTIMONIALS",
        description:
          "Small text displayed above the main heading.",
      },
    ],
  },

  /* =======================================================
     IMPORTANT:
     CLASSES PAGE HAS TWO DIFFERENT RECORDS
  ======================================================= */

  classCategories: {
    key: "classCategories",
    pageKey: "classes",
    sectionKey: "categories",
    label: "Categories",
    icon: BookOpen,
    dynamic: true,
    description:
      "Manage the heading and subheading displayed above the category section on the Classes page.",
    fields: [
      {
        key: "heading",
        label: "Heading",
        type: "text",
        placeholder: "Browse by Category",
        description:
          "Main heading displayed above the category section.",
      },
      {
        key: "subheading",
        label: "Subheading",
        type: "text",
        placeholder: "CATEGORIES",
        description:
          "Small text displayed above the category heading.",
      },
    ],
  },

  classListing: {
    key: "classListing",
    pageKey: "classes",
    sectionKey: "classes",
    label: "Class Listing",
    icon: BookOpen,
    dynamic: true,
    description:
      "Manage the heading and subheading displayed above the class listing on the Classes page.",
    fields: [
      {
        key: "heading",
        label: "Heading",
        type: "text",
        placeholder: "Choose Your Class",
        description:
          "Main heading displayed above the class listing.",
      },
      {
        key: "subheading",
        label: "Subheading",
        type: "text",
        placeholder: "OUR CLASSES",
        description:
          "Small text displayed above the class listing.",
      },
    ],
  },

  sessions: {
    key: "sessions",
    pageKey: "sessions",
    sectionKey: "sessions",
    label: "Sessions",
    icon: CalendarDays,
    dynamic: true,
    description:
      "Manage the heading and subheading displayed on the Sessions page.",
    fields: [
      {
        key: "heading",
        label: "Heading",
        type: "text",
        placeholder: "Upcoming Sessions",
        description:
          "Main heading displayed on the Sessions page.",
      },
      {
        key: "subheading",
        label: "Subheading",
        type: "text",
        placeholder: "UPCOMING SESSIONS",
        description:
          "Small text displayed above the Sessions heading.",
      },
    ],
  },

  trainers: {
    key: "trainers",
    pageKey: "trainers",
    sectionKey: "trainers",
    label: "Trainers",
    icon: Users,
    dynamic: true,
    description:
      "Manage the heading and subheading displayed on the Trainers page.",
    fields: [
      {
        key: "heading",
        label: "Heading",
        type: "text",
        placeholder: "Meet Our Trainers",
        description:
          "Main heading displayed on the Trainers page.",
      },
      {
        key: "subheading",
        label: "Subheading",
        type: "text",
        placeholder: "OUR TRAINERS",
        description:
          "Small text displayed above the Trainers heading.",
      },
    ],
  },

  testimonials: {
    key: "testimonials",
    pageKey: "testimonials",
    sectionKey: "testimonials",
    label: "Testimonials",
    icon: MessageSquare,
    dynamic: true,
    description:
      "Manage the heading and subheading displayed on the Testimonials page.",
    fields: [
      {
        key: "heading",
        label: "Heading",
        type: "text",
        placeholder: "What Our Students Say",
        description:
          "Main heading displayed on the Testimonials page.",
      },
      {
        key: "subheading",
        label: "Subheading",
        type: "text",
        placeholder: "TESTIMONIALS",
        description:
          "Small text displayed above the Testimonials heading.",
      },
    ],
  },
};

/* =========================================================
   DEFAULT CONTENT
========================================================= */

const DEFAULT_CONTENT = {
  popularClasses: {
    heading: "Explore Our Classes",
    subheading: "POPULAR CLASSES",
  },

  homeCategories: {
    heading: "Explore Our Categories",
    subheading: "CATEGORIES",
  },

  homeTrainers: {
    heading: "Meet Our Expert Trainers",
    subheading: "OUR TRAINERS",
  },

  homeTestimonials: {
    heading: "What Our Students Say",
    subheading: "TESTIMONIALS",
  },

  classCategories: {
    heading: "Browse by Category",
    subheading: "CATEGORIES",
  },

  classListing: {
    heading: "Choose Your Class",
    subheading: "OUR CLASSES",
  },

  sessions: {
    heading: "Upcoming Sessions",
    subheading: "UPCOMING SESSIONS",
  },

  trainers: {
    heading: "Meet Our Trainers",
    subheading: "OUR TRAINERS",
  },

  testimonials: {
    heading: "What Our Students Say",
    subheading: "TESTIMONIALS",
  },
};

/* =========================================================
   PAGE CONFIG
========================================================= */

const PAGE_CONFIG = [
  {
    key: "home",
    label: "Home",
    icon: Home,
    sections: [
      "popularClasses",
      "homeCategories",
      "homeTrainers",
      "homeTestimonials",
    ],
  },

  {
    key: "classes",
    label: "Classes",
    icon: BookOpen,
    sections: [
      "classCategories",
      "classListing",
    ],
  },

  {
    key: "sessions",
    label: "Sessions",
    icon: CalendarDays,
    sections: ["sessions"],
  },

  {
    key: "trainers",
    label: "Trainers",
    icon: Users,
    sections: ["trainers"],
  },

  {
    key: "testimonials",
    label: "Testimonials",
    icon: MessageSquare,
    sections: ["testimonials"],
  },
];

/* =========================================================
   HELPERS
========================================================= */

const normalizeKey = (value) =>
  String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[\s_-]+/g, "");

const getBackendPageKey = (section) =>
  String(
    section?.pageKey ??
      section?.page_key ??
      section?.page ??
      ""
  )
    .trim()
    .toLowerCase();

const getBackendSectionKey = (section) =>
  String(
    section?.sectionKey ??
      section?.section_key ??
      ""
  )
    .trim()
    .toLowerCase();

const parseContent = (raw) => {
  if (
    raw &&
    typeof raw === "object" &&
    !Array.isArray(raw)
  ) {
    return raw;
  }

  if (typeof raw === "string") {
    try {
      const parsed = JSON.parse(raw);

      if (
        parsed &&
        typeof parsed === "object" &&
        !Array.isArray(parsed)
      ) {
        return parsed;
      }
    } catch {
      return {};
    }
  }

  return {};
};

const normalizeContent = (
  configKey,
  rawContent
) => {
  const defaults =
    DEFAULT_CONTENT[configKey] || {};

  const existing = parseContent(
    rawContent
  );

  return {
    ...defaults,
    ...existing,

    heading:
      existing.heading ??
      existing.title ??
      defaults.heading ??
      "",

    subheading:
      existing.subheading ??
      existing.subtitle ??
      defaults.subheading ??
      "",
  };
};

const makeMapKey = (
  pageKey,
  sectionKey
) =>
  `${String(pageKey).trim().toLowerCase()}:${normalizeKey(
    sectionKey
  )}`;

/* =========================================================
   BUILD SECTIONS
========================================================= */

const buildWebsiteSections = (
  backendSections
) => {
  const source = Array.isArray(
    backendSections
  )
    ? backendSections
    : [];

  const backendMap = new Map();

  /*
   * IMPORTANT:
   * We ONLY use explicit page + section keys
   * when available.
   *
   * This prevents:
   *
   * home:categories
   *
   * from being confused with:
   *
   * classes:categories
   *
   * and prevents:
   *
   * classes:classes
   *
   * from being confused with anything else.
   */
  source.forEach((section) => {
    const pageKey =
      getBackendPageKey(section);

    const sectionKey =
      getBackendSectionKey(section);

    if (!pageKey || !sectionKey) {
      return;
    }

    const mapKey = makeMapKey(
      pageKey,
      sectionKey
    );

    /*
     * Keep the latest backend record.
     * This is safer when old duplicate records
     * exist in the database.
     */
    backendMap.set(
      mapKey,
      section
    );
  });

  const result = [];

  PAGE_CONFIG.forEach((page) => {
    page.sections.forEach(
      (configKey) => {
        const config =
          SECTION_CONFIG[configKey];

        if (!config) {
          return;
        }

        const mapKey = makeMapKey(
          config.pageKey,
          config.sectionKey
        );

        const backendSection =
          backendMap.get(mapKey);

        result.push({
          ...(backendSection || {}),

          id:
            backendSection?.id ?? null,

          __configKey:
            configKey,

          __pageKey:
            config.pageKey,

          __sectionKey:
            config.sectionKey,

          __virtual:
            !backendSection,

          content:
            normalizeContent(
              configKey,
              backendSection?.content
            ),
        });
      }
    );
  });

  return result;
};

/* =========================================================
   COMPONENT
========================================================= */

export default function WebsiteContent() {
  const navigate = useNavigate();

  const [sections, setSections] =
    useState([]);

  const [activeSection, setActiveSection] =
    useState(null);

  const [content, setContent] =
    useState({});

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [hasChanges, setHasChanges] =
    useState(false);

  const [
    expandedPages,
    setExpandedPages,
  ] = useState({
    home: true,
    about: true,
    classes: true,
    sessions: true,
    trainers: true,
    testimonials: true,
  });

  /* =======================================================
     LOAD
  ======================================================= */

  const loadWebsite = async (
    preserveConfigKey = null
  ) => {
    try {
      setLoading(true);

      const response =
        await getWebsiteData();

      console.log(
        "WEBSITE CONTENT RESPONSE:",
        response
      );

      let data = response;

      if (
        data?.data &&
        typeof data.data === "object"
      ) {
        data = data.data;
      }

      const backendSections =
        Array.isArray(data?.sections)
          ? data.sections
          : [];

      console.log(
        "BACKEND WEBSITE SECTIONS:",
        backendSections
      );

      const websiteSections =
        buildWebsiteSections(
          backendSections
        );

      console.log(
        "RESOLVED WEBSITE SECTIONS:",
        websiteSections
      );

      setSections(
        websiteSections
      );

      let selected = null;

      if (preserveConfigKey) {
        selected =
          websiteSections.find(
            (section) =>
              section.__configKey ===
              preserveConfigKey
          );
      }

      if (!selected) {
        selected =
          websiteSections[0] || null;
      }

      if (selected) {
        setActiveSection(
          selected
        );

        setContent(
          normalizeContent(
            selected.__configKey,
            selected.content
          )
        );
      }
    } catch (error) {
      console.error(
        "LOAD WEBSITE CONTENT ERROR:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to load website content"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWebsite();
  }, []);

  /* =======================================================
     ACTIVE CONFIG
  ======================================================= */

  const activeConfig =
    useMemo(() => {
      if (!activeSection) {
        return null;
      }

      return (
        SECTION_CONFIG[
          activeSection.__configKey
        ] || null
      );
    }, [activeSection]);

  /* =======================================================
     SELECT
  ======================================================= */

  const selectSection = (
    section
  ) => {
    if (!section) {
      return;
    }

    setActiveSection(
      section
    );

    setContent(
      normalizeContent(
        section.__configKey,
        section.content
      )
    );

    setHasChanges(false);
  };

  /* =======================================================
     CHANGE
  ======================================================= */

  const handleChange = (
    key,
    value
  ) => {
    setContent(
      (previous) => ({
        ...previous,
        [key]: value,
      })
    );

    setHasChanges(true);
  };

  /* =======================================================
     SAVE
  ======================================================= */

  const handleSave = async () => {
    if (!activeSection) {
      return;
    }

    const pageKey =
      activeSection.__pageKey;

    const sectionKey =
      activeSection.__sectionKey;

    const configKey =
      activeSection.__configKey;

    if (!pageKey || !sectionKey) {
      toast.error(
        "Page key or section key is missing"
      );
      return;
    }

    try {
      setSaving(true);

      console.log(
        "================================="
      );

      console.log(
        "SAVING WEBSITE CONTENT"
      );

      console.log({
        pageKey,
        sectionKey,
        configKey,
        content,
      });

      console.log(
        "================================="
      );

      await updateSectionContent({
        pageKey,
        sectionKey,
        content: {
          ...content,
        },
      });

      toast.success(
        `${activeConfig?.label || "Section"} saved successfully`
      );

      setHasChanges(false);

      /*
       * Reload from backend.
       *
       * This is important because it proves
       * that the saved value is actually being
       * returned by the API.
       */
      await loadWebsite(
        configKey
      );
    } catch (error) {
      console.error(
        "SAVE WEBSITE CONTENT ERROR:",
        error
      );

      console.error(
        "STATUS:",
        error?.response?.status
      );

      console.error(
        "BACKEND:",
        error?.response?.data
      );

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to save website content"
      );
    } finally {
      setSaving(false);
    }
  };

  /* =======================================================
     TOGGLE PAGE
  ======================================================= */

  const togglePage = (
    pageKey
  ) => {
    setExpandedPages(
      (previous) => ({
        ...previous,
        [pageKey]:
          !previous[pageKey],
      })
    );
  };

  /* =======================================================
     GET SECTION
  ======================================================= */

  const getPageSection = (
    configKey
  ) =>
    sections.find(
      (section) =>
        section.__configKey ===
        configKey
    );

  /* =======================================================
     ENABLED
  ======================================================= */

  const isSectionEnabled = (
    section
  ) => {
    const value =
      section?.is_enabled ??
      section?.isEnabled ??
      section?.enabled ??
      true;

    return (
      value === true ||
      value === 1 ||
      value === "1" ||
      String(value).toLowerCase() ===
        "true"
    );
  };

  /* =======================================================
     FIELD
  ======================================================= */

  const renderField = (
    field
  ) => {
    const value =
      content?.[field.key] ?? "";

    return (
      <div
        key={field.key}
        className="space-y-2"
      >
        <label
          className="block text-sm font-semibold"
          style={{
            color:
              BRANDING.heading,
          }}
        >
          {field.label}
        </label>

        {field.description && (
          <p
            className="text-xs"
            style={{
              color:
                BRANDING.bodyText,
            }}
          >
            {field.description}
          </p>
        )}

        {field.type ===
        "textarea" ? (
          <textarea
            value={value}
            onChange={(event) =>
              handleChange(
                field.key,
                event.target.value
              )
            }
            placeholder={
              field.placeholder
            }
            rows={5}
            className="w-full rounded-xl px-4 py-3 outline-none resize-y transition"
            style={{
              backgroundColor:
                "#FFFFFF",
              color:
                BRANDING.text,
              border:
                "1px solid #D1D5DB",
            }}
            onFocus={(event) => {
              event.currentTarget.style.borderColor =
                BRANDING.primary;
            }}
            onBlur={(event) => {
              event.currentTarget.style.borderColor =
                "#D1D5DB";
            }}
          />
        ) : (
          <input
            type="text"
            value={value}
            onChange={(event) =>
              handleChange(
                field.key,
                event.target.value
              )
            }
            placeholder={
              field.placeholder
            }
            className="w-full rounded-xl px-4 py-3 outline-none transition"
            style={{
              backgroundColor:
                "#FFFFFF",
              color:
                BRANDING.text,
              border:
                "1px solid #D1D5DB",
            }}
            onFocus={(event) => {
              event.currentTarget.style.borderColor =
                BRANDING.primary;
            }}
            onBlur={(event) => {
              event.currentTarget.style.borderColor =
                "#D1D5DB";
            }}
          />
        )}
      </div>
    );
  };

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <div
        className="min-h-[400px] flex items-center justify-center"
        style={{
          backgroundColor:
            BRANDING.background,
        }}
      >
        <div
          className="flex items-center gap-3"
          style={{
            color:
              BRANDING.bodyText,
          }}
        >
          <Loader2
            size={22}
            className="animate-spin"
            style={{
              color:
                BRANDING.primary,
            }}
          />

          <span>
            Loading website content...
          </span>
        </div>
      </div>
    );
  }

  /* =======================================================
     UI
  ======================================================= */

  return (
    <div
      className="space-y-6 pb-28"
      style={{
        fontFamily: "inherit",
      }}
    >
      {/* HEADER */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() =>
              navigate(
                "/institute/website"
              )
            }
            className="w-10 h-10 rounded-xl flex items-center justify-center transition hover:bg-gray-100"
            style={{
              color:
                BRANDING.bodyText,
            }}
          >
            <ArrowLeft
              size={21}
            />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <FileText
                size={23}
                style={{
                  color:
                    BRANDING.primary,
                }}
              />

              <h1
                className="text-2xl font-bold"
                style={{
                  color:
                    BRANDING.heading,
                }}
              >
                Website Content
              </h1>
            </div>

            <p
              className="text-sm mt-1"
              style={{
                color:
                  BRANDING.bodyText,
              }}
            >
              Manage headings, subheadings
              and page content displayed on
              your institute website.
            </p>
          </div>
        </div>

        {activeSection && (
          <button
            type="button"
            onClick={
              handleSave
            }
            disabled={
              saving ||
              !hasChanges
            }
            className="px-5 py-2.5 rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor:
                BRANDING.button,
            }}
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
                <Save size={18} />
                Save Changes
              </>
            )}
          </button>
        )}
      </div>

      {/* MAIN */}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* LEFT */}

        <aside className="lg:col-span-1">
          <div
            className="rounded-2xl border p-3 lg:sticky lg:top-6"
            style={{
              backgroundColor:
                BRANDING.cards,
              borderColor:
                "#E5E7EB",
            }}
          >
            <p
              className="px-3 py-2 text-xs font-semibold uppercase tracking-wider"
              style={{
                color:
                  BRANDING.subheading,
              }}
            >
              Website Content
            </p>

            <div className="space-y-2">
              {PAGE_CONFIG.map(
                (page) => {
                  const PageIcon =
                    page.icon;

                  const expanded =
                    expandedPages[
                      page.key
                    ];

                  return (
                    <div
                      key={page.key}
                      className="rounded-xl overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          togglePage(
                            page.key
                          )
                        }
                        className="w-full flex items-center gap-3 px-3 py-3 text-left transition"
                        style={{
                          backgroundColor:
                            "#F8FAFC",
                        }}
                      >
                        <PageIcon
                          size={18}
                          style={{
                            color:
                              BRANDING.primary,
                          }}
                        />

                        <span
                          className="flex-1 text-sm font-bold"
                          style={{
                            color:
                              BRANDING.heading,
                          }}
                        >
                          {
                            page.label
                          }
                        </span>

                        {expanded ? (
                          <ChevronDown
                            size={17}
                          />
                        ) : (
                          <ChevronRight
                            size={17}
                          />
                        )}
                      </button>

                      {expanded && (
                        <div className="mt-1 space-y-1">
                          {page.sections.map(
                            (configKey) => {
                              const config =
                                SECTION_CONFIG[
                                  configKey
                                ];

                              const section =
                                getPageSection(
                                  configKey
                                );

                              if (
                                !config ||
                                !section
                              ) {
                                return null;
                              }

                              const Icon =
                                config.icon;

                              const isActive =
                                activeSection?.__configKey ===
                                configKey;

                              const enabled =
                                isSectionEnabled(
                                  section
                                );

                              return (
                                <button
                                  key={
                                    configKey
                                  }
                                  type="button"
                                  onClick={() =>
                                    selectSection(
                                      section
                                    )
                                  }
                                  className="w-full text-left rounded-xl px-3 py-3 ml-1 flex items-center gap-3 transition"
                                  style={{
                                    width:
                                      "calc(100% - 0.25rem)",
                                    backgroundColor:
                                      isActive
                                        ? `${BRANDING.primary}12`
                                        : "transparent",
                                    border:
                                      isActive
                                        ? `1px solid ${BRANDING.primary}30`
                                        : "1px solid transparent",
                                  }}
                                >
                                  <div
                                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                                    style={{
                                      backgroundColor:
                                        isActive
                                          ? `${BRANDING.primary}15`
                                          : "#F3F4F6",
                                    }}
                                  >
                                    <Icon
                                      size={16}
                                      style={{
                                        color:
                                          isActive
                                            ? BRANDING.primary
                                            : BRANDING.subheading,
                                      }}
                                    />
                                  </div>

                                  <div className="flex-1 min-w-0">
                                    <p
                                      className="text-sm font-semibold truncate"
                                      style={{
                                        color:
                                          isActive
                                            ? BRANDING.heading
                                            : BRANDING.bodyText,
                                      }}
                                    >
                                      {
                                        config.label
                                      }
                                    </p>

                                    {config.dynamic && (
                                      <p
                                        className="text-[10px] mt-0.5"
                                        style={{
                                          color:
                                            BRANDING.icon,
                                        }}
                                      >
                                        Data automatic
                                      </p>
                                    )}

                                    {!enabled && (
                                      <p
                                        className="text-[10px] mt-0.5"
                                        style={{
                                          color:
                                            BRANDING.gold,
                                        }}
                                      >
                                        Hidden
                                      </p>
                                    )}
                                  </div>
                                </button>
                              );
                            }
                          )}
                        </div>
                      )}
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </aside>

        {/* RIGHT */}

        <main className="lg:col-span-3">
          {!activeSection ? (
            <div className="rounded-2xl border p-10 text-center">
              <FileText
                size={40}
                className="mx-auto mb-4"
              />

              <h2 className="text-lg font-semibold">
                Select a section
              </h2>

              <p className="text-sm mt-2">
                Select a page and section
                from the left.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {/* SECTION HEADER */}

              <div
                className="rounded-2xl border p-6"
                style={{
                  backgroundColor:
                    BRANDING.cards,
                  borderColor:
                    "#E5E7EB",
                }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{
                      backgroundColor:
                        `${BRANDING.primary}12`,
                    }}
                  >
                    {(() => {
                      const Icon =
                        activeConfig?.icon ||
                        FileText;

                      return (
                        <Icon
                          size={23}
                          style={{
                            color:
                              BRANDING.primary,
                          }}
                        />
                      );
                    })()}
                  </div>

                  <div>
                    <h2
                      className="text-xl font-semibold"
                      style={{
                        color:
                          BRANDING.heading,
                      }}
                    >
                      {
                        activeConfig?.label
                      }
                    </h2>

                    <p
                      className="text-sm mt-1"
                      style={{
                        color:
                          BRANDING.bodyText,
                      }}
                    >
                      {
                        activeConfig?.description
                      }
                    </p>

                    {/* DEBUG / IDENTIFICATION */}

                    <p
                      className="text-[11px] mt-2"
                      style={{
                        color:
                          BRANDING.icon,
                      }}
                    >
                      Page:{" "}
                      {
                        activeSection.__pageKey
                      }{" "}
                      • Section:{" "}
                      {
                        activeSection.__sectionKey
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* FORM */}

              <div
                className="rounded-2xl border"
                style={{
                  backgroundColor:
                    BRANDING.cards,
                  borderColor:
                    "#E5E7EB",
                }}
              >
                <div className="p-6 sm:p-8">
                  <div className="space-y-6">
                    {(
                      activeConfig?.fields ||
                      []
                    ).map(
                      renderField
                    )}
                  </div>
                </div>

                {activeConfig?.dynamic && (
                  <div
                    className="mx-6 sm:mx-8 mb-6 rounded-xl border p-4 flex items-start gap-3"
                    style={{
                      backgroundColor:
                        "#F8FAFC",
                      borderColor:
                        "#E5E7EB",
                    }}
                  >
                    <Eye
                      size={18}
                      className="shrink-0 mt-0.5"
                      style={{
                        color:
                          BRANDING.icon,
                      }}
                    />

                    <div>
                      <p
                        className="text-sm font-semibold"
                        style={{
                          color:
                            BRANDING.heading,
                        }}
                      >
                        Content and data are
                        separate
                      </p>

                      <p
                        className="text-xs mt-1"
                        style={{
                          color:
                            BRANDING.bodyText,
                        }}
                      >
                        The heading and
                        subheading are managed
                        here. The actual data
                        records continue to
                        come from their
                        respective modules.
                      </p>
                    </div>
                  </div>
                )}

                <div
                  className="px-6 sm:px-8 py-5 border-t flex justify-end"
                  style={{
                    borderColor:
                      "#E5E7EB",
                  }}
                >
                  <button
                    type="button"
                    onClick={
                      handleSave
                    }
                    disabled={
                      saving ||
                      !hasChanges
                    }
                    className="px-5 py-2.5 rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor:
                        BRANDING.button,
                    }}
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
                        <Save size={18} />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* PREVIEW */}

              <div
                className="rounded-2xl border p-5 flex items-start gap-3"
                style={{
                  backgroundColor:
                    `${BRANDING.primary}08`,
                  borderColor:
                    `${BRANDING.primary}20`,
                }}
              >
                <Eye
                  size={20}
                  className="shrink-0 mt-0.5"
                  style={{
                    color:
                      BRANDING.primary,
                  }}
                />

                <div>
                  <p
                    className="text-sm font-semibold"
                    style={{
                      color:
                        BRANDING.heading,
                    }}
                  >
                    Preview your changes
                  </p>

                  <p
                    className="text-sm mt-1"
                    style={{
                      color:
                        BRANDING.bodyText,
                    }}
                  >
                    Save your changes and
                    refresh the website preview
                    to see the updated content.
                  </p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* UNSAVED BAR */}

      {hasChanges && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-3xl">
          <div
            className="rounded-2xl border p-4 shadow-2xl"
            style={{
              backgroundColor:
                BRANDING.cards,
              borderColor:
                `${BRANDING.primary}40`,
            }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-start gap-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor:
                      `${BRANDING.gold}15`,
                  }}
                >
                  <AlertCircle
                    size={18}
                    style={{
                      color:
                        BRANDING.gold,
                    }}
                  />
                </div>

                <div>
                  <p
                    className="text-sm font-semibold"
                    style={{
                      color:
                        BRANDING.heading,
                    }}
                  >
                    Unsaved changes
                  </p>

                  <p
                    className="text-xs mt-1"
                    style={{
                      color:
                        BRANDING.bodyText,
                    }}
                  >
                    Save your changes before
                    leaving this page.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={
                  handleSave
                }
                disabled={saving}
                className="px-5 py-2.5 rounded-xl text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                style={{
                  backgroundColor:
                    BRANDING.button,
                }}
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
                    <Save size={17} />
                    Save Changes
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