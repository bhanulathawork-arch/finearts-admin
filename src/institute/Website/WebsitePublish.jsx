// // src/pages/institute/Website/WebsitePublish.jsx

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// import {
//   ArrowLeft,
//   Check,
//   CheckCircle2,
//   Copy,
//   ExternalLink,
//   Globe,
//   LayoutTemplate,
//   Loader2,
//   Lock,
//   AlertTriangle,
//   Eye,
//   Settings,
//   FileText,
//   Palette,
//   RefreshCw,
//   XCircle,
// } from "lucide-react";

// import toast from "react-hot-toast";

// import {
//   getWebsiteStatus,
//   getWebsiteData,
//   publishWebsite,
//   unpublishWebsite,
// } from "../../services/websiteService";


// /* =========================================================
//    STATUS CONFIG
// ========================================================= */

// const STATUS_CONFIG = {
//   draft: {
//     label: "Draft",
//     description:
//       "Your website is being prepared and has not been published yet.",
//   },

//   published: {
//     label: "Published",
//     description:
//       "Your website is currently live and visible to visitors.",
//   },

//   unpublished: {
//     label: "Unpublished",
//     description:
//       "Your website was previously published but is currently offline.",
//   },
// };


// /* =========================================================
//    FORMAT DATE
// ========================================================= */

// const formatDate = (
//   value
// ) => {
//   if (!value) {
//     return "-";
//   }

//   try {
//     return new Date(
//       value
//     ).toLocaleString(
//       "en-IN",
//       {
//         dateStyle: "medium",
//         timeStyle: "short",
//       }
//     );
//   } catch {
//     return "-";
//   }
// };


// /* =========================================================
//    MAIN COMPONENT
// ========================================================= */

// export default function WebsitePublish() {
//   const navigate =
//     useNavigate();


//   /* =========================================================
//      STATE
//   ========================================================= */

//   const [status, setStatus] =
//     useState(null);

//   const [website, setWebsite] =
//     useState(null);

//   const [loading, setLoading] =
//     useState(true);

//   const [publishing, setPublishing] =
//     useState(false);

//   const [unpublishing, setUnpublishing] =
//     useState(false);

//   const [showPublishConfirm, setShowPublishConfirm] =
//     useState(false);

//   const [showUnpublishConfirm, setShowUnpublishConfirm] =
//     useState(false);

//   const [copied, setCopied] =
//     useState(false);


//   /* =========================================================
//      LOAD WEBSITE STATUS
//   ========================================================= */

//   useEffect(() => {
//     loadWebsite();
//   }, []);


//   const loadWebsite =
//     async () => {
//       try {
//         setLoading(true);

//         const [
//           statusData,
//           websiteData,
//         ] = await Promise.all([
//           getWebsiteStatus(),
//           getWebsiteData(),
//         ]);

//         console.log(
//           "Website status:",
//           statusData
//         );

//         console.log(
//           "Website data:",
//           websiteData
//         );

//         setStatus(
//           statusData || {}
//         );

//         setWebsite(
//           websiteData || {}
//         );

//       } catch (error) {
//         console.error(
//           "Failed to load website status:",
//           error
//         );

//         toast.error(
//           error?.response?.data?.message ||
//             "Failed to load website status"
//         );
//       } finally {
//         setLoading(false);
//       }
//     };


//   /* =========================================================
//      GET CURRENT STATUS
//   ========================================================= */

//   const currentStatus =
//     (
//       status?.status ||
//       website?.status ||
//       "draft"
//     ).toLowerCase();


//   const statusConfig =
//     STATUS_CONFIG[
//       currentStatus
//     ] ||
//     STATUS_CONFIG.draft;


//   /* =========================================================
//      TEMPLATE
//   ========================================================= */

//   const template =
//     website?.template ||
//     website?.website?.template ||
//     null;


//   const templateId =
//     status?.templateId ||
//     status?.template_id ||
//     template?.id ||
//     null;


//   const templateName =
//     template?.name ||
//     website?.template_name ||
//     status?.templateName ||
//     "No template selected";


//   /* =========================================================
//      PUBLISHED URL
//   ========================================================= */

//   const publishedUrl =
//     status?.publishedUrl ||
//     status?.published_url ||
//     website?.publishedUrl ||
//     website?.published_url ||
//     null;


//   /* =========================================================
//      DATES
//   ========================================================= */

//   const publishedAt =
//     status?.publishedAt ||
//     status?.published_at ||
//     website?.publishedAt ||
//     website?.published_at ||
//     null;


//   const lastSavedAt =
//     status?.lastSavedAt ||
//     status?.last_saved_at ||
//     website?.lastSavedAt ||
//     website?.last_saved_at ||
//     null;


//   /* =========================================================
//      SECTION COUNTS
//   ========================================================= */

//   const sections =
//     Array.isArray(
//       website?.sections
//     )
//       ? website.sections
//       : [];


//   const visibleSectionCount =
//     status?.visibleSectionCount ??
//     status?.visible_section_count ??
//     sections.filter(
//       (section) =>
//         section.is_enabled ===
//           1 ||
//         section.is_enabled ===
//           true ||
//         section.enabled ===
//           true
//     ).length;


//   const totalSectionCount =
//     status?.totalSectionCount ??
//     status?.total_section_count ??
//     sections.length;


//   /* =========================================================
//      PUBLISH VALIDATION
//   ========================================================= */

//   const validation =
//     validateWebsite({
//       templateId,
//       sections,
//       visibleSectionCount,
//     });


//   /* =========================================================
//      PUBLISH
//   ========================================================= */

//   const handlePublish =
//     async () => {
//       try {
//         setPublishing(true);

//         const response =
//           await publishWebsite();

//         console.log(
//           "Publish response:",
//           response
//         );

//         toast.success(
//           "Website published successfully"
//         );

//         setShowPublishConfirm(
//           false
//         );

//         await loadWebsite();

//       } catch (error) {
//         console.error(
//           "Publish error:",
//           error
//         );

//         toast.error(
//           error?.response?.data?.message ||
//             error?.message ||
//             "Failed to publish website"
//         );
//       } finally {
//         setPublishing(false);
//       }
//     };


//   /* =========================================================
//      UNPUBLISH
//   ========================================================= */

//   const handleUnpublish =
//     async () => {
//       try {
//         setUnpublishing(
//           true
//         );

//         await unpublishWebsite();

//         toast.success(
//           "Website unpublished successfully"
//         );

//         setShowUnpublishConfirm(
//           false
//         );

//         await loadWebsite();

//       } catch (error) {
//         console.error(
//           "Unpublish error:",
//           error
//         );

//         toast.error(
//           error?.response?.data?.message ||
//             error?.message ||
//             "Failed to unpublish website"
//         );
//       } finally {
//         setUnpublishing(
//           false
//         );
//       }
//     };


//   /* =========================================================
//      COPY URL
//   ========================================================= */

//   const handleCopyUrl =
//     async () => {
//       if (!publishedUrl) {
//         return;
//       }

//       try {
//         await navigator.clipboard.writeText(
//           publishedUrl
//         );

//         setCopied(true);

//         toast.success(
//           "Website URL copied"
//         );

//         setTimeout(() => {
//           setCopied(false);
//         }, 2000);

//       } catch (error) {
//         console.error(
//           "Copy failed:",
//           error
//         );

//         toast.error(
//           "Unable to copy URL"
//         );
//       }
//     };


//   /* =========================================================
//      OPEN WEBSITE
//   ========================================================= */

//   const handleOpenWebsite =
//     () => {
//       if (!publishedUrl) {
//         return;
//       }

//       window.open(
//         publishedUrl,
//         "_blank",
//         "noopener,noreferrer"
//       );
//     };


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
//             Loading website publishing settings...
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
//             <ArrowLeft
//               size={22}
//             />
//           </button>

//           <div>

//             <div className="flex items-center gap-2">

//               <Globe
//                 size={22}
//                 className="text-purple-400"
//               />

//               <h1 className="text-2xl font-bold text-white">
//                 Publish Website
//               </h1>

//             </div>

//             <p className="text-sm text-gray-400 mt-1">
//               Review your website and publish it when you're ready.
//             </p>

//           </div>

//         </div>


//         {/* REFRESH */}

//         <button
//           type="button"
//           onClick={
//             loadWebsite
//           }
//           disabled={
//             publishing ||
//             unpublishing
//           }
//           className="px-4 py-2.5 rounded-xl border border-[#34313f] text-gray-300 hover:bg-[#24212f] transition flex items-center gap-2 disabled:opacity-50"
//         >

//           <RefreshCw
//             size={17}
//           />

//           Refresh

//         </button>

//       </div>


//       {/* =====================================================
//           STATUS CARD
//       ===================================================== */}

//       <div
//         className={`rounded-2xl border p-6 ${
//           currentStatus ===
//           "published"
//             ? "bg-green-500/5 border-green-500/20"
//             : "bg-[#151519] border-[#2c2c35]"
//         }`}
//       >

//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

//           <div className="flex items-center gap-4">

//             <div
//               className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
//                 currentStatus ===
//                 "published"
//                   ? "bg-green-500/10"
//                   : currentStatus ===
//                     "unpublished"
//                   ? "bg-orange-500/10"
//                   : "bg-purple-500/10"
//               }`}
//             >

//               {currentStatus ===
//               "published" ? (
//                 <CheckCircle2
//                   size={28}
//                   className="text-green-400"
//                 />
//               ) : currentStatus ===
//                 "unpublished" ? (
//                 <XCircle
//                   size={28}
//                   className="text-orange-400"
//                 />
//               ) : (
//                 <FileText
//                   size={28}
//                   className="text-purple-400"
//                 />
//               )}

//             </div>


//             <div>

//               <div className="flex items-center gap-3">

//                 <h2 className="text-xl font-semibold text-white">
//                   Website{" "}
//                   {statusConfig.label}
//                 </h2>

//                 <StatusBadge
//                   status={
//                     currentStatus
//                   }
//                 />

//               </div>

//               <p className="text-sm text-gray-500 mt-1">
//                 {
//                   statusConfig.description
//                 }
//               </p>

//             </div>

//           </div>


//           {/* ACTION */}

//           <div>

//             {currentStatus ===
//               "published" ? (

//               <button
//                 type="button"
//                 onClick={() =>
//                   setShowUnpublishConfirm(
//                     true
//                   )
//                 }
//                 disabled={
//                   unpublishing
//                 }
//                 className="px-5 py-2.5 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 transition flex items-center gap-2 disabled:opacity-50"
//               >

//                 <XCircle
//                   size={18}
//                 />

//                 Unpublish

//               </button>

//             ) : (

//               <button
//                 type="button"
//                 onClick={() =>
//                   setShowPublishConfirm(
//                     true
//                   )
//                 }
//                 disabled={
//                   !validation.canPublish ||
//                   publishing
//                 }
//                 className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//               >

//                 <Globe
//                   size={18}
//                 />

//                 Publish Website

//               </button>

//             )}

//           </div>

//         </div>

//       </div>


//       {/* =====================================================
//           PUBLISHED URL
//       ===================================================== */}

//       {publishedUrl && (
//         <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-6">

//           <div className="flex items-center gap-3 mb-4">

//             <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">

//               <Globe
//                 size={19}
//                 className="text-green-400"
//               />

//             </div>

//             <div>

//               <h2 className="text-white font-semibold">
//                 Your Website
//               </h2>

//               <p className="text-xs text-gray-500">
//                 Public website URL
//               </p>

//             </div>

//           </div>


//           <div className="flex flex-col sm:flex-row gap-3">

//             <div className="flex-1 min-w-0 rounded-xl bg-[#0f0f13] border border-[#34313f] px-4 py-3">

//               <p className="text-sm text-gray-300 truncate">
//                 {publishedUrl}
//               </p>

//             </div>


//             <button
//               type="button"
//               onClick={
//                 handleCopyUrl
//               }
//               className="px-4 py-3 rounded-xl border border-[#34313f] text-gray-300 hover:bg-[#24212f] flex items-center justify-center gap-2"
//             >

//               {copied ? (
//                 <>
//                   <Check
//                     size={17}
//                   />

//                   Copied
//                 </>
//               ) : (
//                 <>
//                   <Copy
//                     size={17}
//                   />

//                   Copy
//                 </>
//               )}

//             </button>


//             <button
//               type="button"
//               onClick={
//                 handleOpenWebsite
//               }
//               className="px-4 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold flex items-center justify-center gap-2"
//             >

//               <ExternalLink
//                 size={17}
//               />

//               Open Website

//             </button>

//           </div>

//         </div>
//       )}


//       {/* =====================================================
//           WEBSITE CHECKLIST
//       ===================================================== */}

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

//         {/* ===================================================
//             CHECKLIST
//         =================================================== */}

//         <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-6">

//           <div className="mb-6">

//             <h2 className="text-lg font-semibold text-white">
//               Publishing Checklist
//             </h2>

//             <p className="text-sm text-gray-500 mt-1">
//               Make sure your website is ready before publishing.
//             </p>

//           </div>


//           <div className="space-y-4">

//             <ChecklistItem
//               label="Website template selected"
//               description={
//                 templateId
//                   ? templateName
//                   : "Select a template first"
//               }
//               completed={
//                 Boolean(
//                   templateId
//                 )
//               }
//             />

//             <ChecklistItem
//               label="Hero section enabled"
//               description={
//                 validation.hasHero
//                   ? "Hero section is visible"
//                   : "Enable the Hero section"
//               }
//               completed={
//                 validation.hasHero
//               }
//             />

//             <ChecklistItem
//               label="Contact section enabled"
//               description={
//                 validation.hasContact
//                   ? "Contact section is visible"
//                   : "Enable the Contact section"
//               }
//               completed={
//                 validation.hasContact
//               }
//             />

//             <ChecklistItem
//               label="Website sections configured"
//               description={`${visibleSectionCount} of ${totalSectionCount} sections enabled`}
//               completed={
//                 visibleSectionCount >
//                 0
//               }
//             />

//           </div>

//         </div>


//         {/* ===================================================
//             WEBSITE SUMMARY
//         =================================================== */}

//         <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-6">

//           <div className="mb-6">

//             <h2 className="text-lg font-semibold text-white">
//               Website Summary
//             </h2>

//             <p className="text-sm text-gray-500 mt-1">
//               Current configuration of your website.
//             </p>

//           </div>


//           <div className="space-y-4">

//             <SummaryRow
//               icon={
//                 LayoutTemplate
//               }
//               label="Template"
//               value={
//                 templateName
//               }
//             />

//             <SummaryRow
//               icon={
//                 Settings
//               }
//               label="Visible Sections"
//               value={`${visibleSectionCount} / ${totalSectionCount}`}
//             />

//             <SummaryRow
//               icon={
//                 Palette
//               }
//               label="Branding"
//               value="Configured"
//             />

//             <SummaryRow
//               icon={
//                 FileText
//               }
//               label="Last Saved"
//               value={
//                 formatDate(
//                   lastSavedAt
//                 )
//               }
//             />

//             <SummaryRow
//               icon={
//                 CheckCircle2
//               }
//               label="Last Published"
//               value={
//                 formatDate(
//                   publishedAt
//                 )
//               }
//             />

//           </div>

//         </div>

//       </div>


//       {/* =====================================================
//           PREVIEW BUTTON
//       ===================================================== */}

//       <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-6">

//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

//           <div className="flex items-center gap-4">

//             <div className="w-11 h-11 rounded-xl bg-blue-500/10 flex items-center justify-center">

//               <Eye
//                 size={21}
//                 className="text-blue-400"
//               />

//             </div>

//             <div>

//               <h2 className="text-white font-semibold">
//                 Preview Your Website
//               </h2>

//               <p className="text-sm text-gray-500 mt-1">
//                 Check how your website looks before publishing.
//               </p>

//             </div>

//           </div>


//           <button
//             type="button"
//             onClick={() =>
//               navigate(
//                 "/institute/website/preview"
//               )
//             }
//             className="px-5 py-2.5 rounded-xl border border-[#34313f] text-gray-300 hover:bg-[#24212f] transition flex items-center justify-center gap-2"
//           >

//             <Eye size={17} />

//             Open Preview

//           </button>

//         </div>

//       </div>


//       {/* =====================================================
//           NAVIGATION
//       ===================================================== */}

//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

//         <NavigationCard
//           icon={
//             LayoutTemplate
//           }
//           title="Template"
//           description="Change website design"
//           onClick={() =>
//             navigate(
//               "/institute/website/template"
//             )
//           }
//         />

//         <NavigationCard
//           icon={
//             FileText
//           }
//           title="Content"
//           description="Edit website content"
//           onClick={() =>
//             navigate(
//               "/institute/website/content"
//             )
//           }
//         />

//         <NavigationCard
//           icon={
//             Palette
//           }
//           title="Branding"
//           description="Customize colors and fonts"
//           onClick={() =>
//             navigate(
//               "/institute/website/branding"
//             )
//           }
//         />

//       </div>


//       {/* =====================================================
//           PUBLISH CONFIRMATION
//       ===================================================== */}

//       {showPublishConfirm && (
//         <ConfirmationModal
//           title="Publish Website?"
//           description="Your institute website will become publicly accessible. You can unpublish it later."
//           confirmText={
//             publishing
//               ? "Publishing..."
//               : "Yes, Publish Website"
//           }
//           onCancel={() =>
//             setShowPublishConfirm(
//               false
//             )
//           }
//           onConfirm={
//             handlePublish
//           }
//           loading={
//             publishing
//           }
//           type="publish"
//         />
//       )}


//       {/* =====================================================
//           UNPUBLISH CONFIRMATION
//       ===================================================== */}

//       {showUnpublishConfirm && (
//         <ConfirmationModal
//           title="Unpublish Website?"
//           description="Your public website will no longer be accessible to visitors. Your website data will not be deleted."
//           confirmText={
//             unpublishing
//               ? "Unpublishing..."
//               : "Yes, Unpublish"
//           }
//           onCancel={() =>
//             setShowUnpublishConfirm(
//               false
//             )
//           }
//           onConfirm={
//             handleUnpublish
//           }
//           loading={
//             unpublishing
//           }
//           type="unpublish"
//         />
//       )}

//     </div>
//   );
// }


// /* =========================================================
//    VALIDATE WEBSITE
// ========================================================= */

// function validateWebsite({
//   templateId,
//   sections,
//   visibleSectionCount,
// }) {
//   const hasHero =
//     sections.some(
//       (section) =>
//         getSectionType(
//           section
//         ) === "hero" &&
//         (
//           section.is_enabled ===
//             1 ||
//           section.is_enabled ===
//             true ||
//           section.enabled ===
//             true
//         )
//     );

//   const hasContact =
//     sections.some(
//       (section) =>
//         getSectionType(
//           section
//         ) === "contact" &&
//         (
//           section.is_enabled ===
//             1 ||
//           section.is_enabled ===
//             true ||
//           section.enabled ===
//             true
//         )
//     );

//   const hasTemplate =
//     Boolean(templateId);

//   const hasSections =
//     Number(
//       visibleSectionCount
//     ) > 0;

//   return {
//     hasHero,
//     hasContact,
//     hasTemplate,
//     hasSections,

//     canPublish:
//       hasTemplate &&
//       hasHero &&
//       hasContact &&
//       hasSections,
//   };
// }


// /* =========================================================
//    SECTION TYPE
// ========================================================= */

// function getSectionType(
//   section
// ) {
//   return (
//     section?.section_type ||
//     section?.type ||
//     section?.id
//   );
// }


// /* =========================================================
//    STATUS BADGE
// ========================================================= */

// function StatusBadge({
//   status,
// }) {
//   const config = {
//     published: {
//       label: "Live",
//       className:
//         "bg-green-500/10 text-green-400 border-green-500/20",
//     },

//     draft: {
//       label: "Draft",
//       className:
//         "bg-purple-500/10 text-purple-400 border-purple-500/20",
//     },

//     unpublished: {
//       label: "Offline",
//       className:
//         "bg-orange-500/10 text-orange-400 border-orange-500/20",
//     },
//   };

//   const current =
//     config[status] ||
//     config.draft;

//   return (
//     <span
//       className={`px-2.5 py-1 rounded-full border text-xs font-medium ${current.className}`}
//     >
//       {current.label}
//     </span>
//   );
// }


// /* =========================================================
//    CHECKLIST ITEM
// ========================================================= */

// function ChecklistItem({
//   label,
//   description,
//   completed,
// }) {
//   return (
//     <div className="flex items-center gap-3">

//       <div
//         className={`w-8 h-8 rounded-lg flex items-center justify-center ${
//           completed
//             ? "bg-green-500/10"
//             : "bg-red-500/10"
//         }`}
//       >

//         {completed ? (
//           <Check
//             size={17}
//             className="text-green-400"
//           />
//         ) : (
//           <AlertTriangle
//             size={17}
//             className="text-red-400"
//           />
//         )}

//       </div>


//       <div className="flex-1">

//         <p className="text-sm font-medium text-gray-300">
//           {label}
//         </p>

//         <p className="text-xs text-gray-600 mt-1">
//           {description}
//         </p>

//       </div>

//     </div>
//   );
// }


// /* =========================================================
//    SUMMARY ROW
// ========================================================= */

// function SummaryRow({
//   icon: Icon,
//   label,
//   value,
// }) {
//   return (
//     <div className="flex items-center gap-3">

//       <div className="w-9 h-9 rounded-lg bg-[#24212f] flex items-center justify-center">

//         <Icon
//           size={17}
//           className="text-gray-500"
//         />

//       </div>

//       <div className="flex-1 min-w-0">

//         <p className="text-xs text-gray-600">
//           {label}
//         </p>

//         <p className="text-sm text-gray-300 mt-0.5 truncate">
//           {value || "-"}
//         </p>

//       </div>

//     </div>
//   );
// }


// /* =========================================================
//    NAVIGATION CARD
// ========================================================= */

// function NavigationCard({
//   icon: Icon,
//   title,
//   description,
//   onClick,
// }) {
//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-5 text-left hover:border-[#4b4560] transition group"
//     >

//       <div className="flex items-center gap-4">

//         <div className="w-10 h-10 rounded-xl bg-[#24212f] flex items-center justify-center group-hover:bg-purple-500/10 transition">

//           <Icon
//             size={19}
//             className="text-gray-500 group-hover:text-purple-400 transition"
//           />

//         </div>

//         <div>

//           <p className="text-white font-semibold">
//             {title}
//           </p>

//           <p className="text-xs text-gray-600 mt-1">
//             {description}
//           </p>

//         </div>

//       </div>

//     </button>
//   );
// }


// /* =========================================================
//    CONFIRMATION MODAL
// ========================================================= */

// function ConfirmationModal({
//   title,
//   description,
//   confirmText,
//   onCancel,
//   onConfirm,
//   loading,
//   type,
// }) {
//   const isPublish =
//     type === "publish";

//   return (
//     <div className="fixed inset-0 z-[200] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">

//       <div className="w-full max-w-md bg-[#1e1b2e] border border-[#343047] rounded-2xl shadow-2xl p-6">

//         {/* ICON */}

//         <div
//           className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${
//             isPublish
//               ? "bg-green-500/10"
//               : "bg-red-500/10"
//           }`}
//         >

//           {isPublish ? (
//             <Globe
//               size={26}
//               className="text-green-400"
//             />
//           ) : (
//             <AlertTriangle
//               size={26}
//               className="text-red-400"
//             />
//           )}

//         </div>


//         {/* TITLE */}

//         <h2 className="text-xl font-bold text-white">
//           {title}
//         </h2>


//         {/* DESCRIPTION */}

//         <p className="text-sm text-gray-400 mt-3 leading-6">
//           {description}
//         </p>


//         {/* BUTTONS */}

//         <div className="flex gap-3 mt-7">

//           <button
//             type="button"
//             onClick={onCancel}
//             disabled={loading}
//             className="flex-1 px-5 py-3 rounded-xl border border-[#3a3650] text-gray-300 hover:bg-[#2a2640] transition disabled:opacity-50"
//           >
//             Cancel
//           </button>


//           <button
//             type="button"
//             onClick={onConfirm}
//             disabled={loading}
//             className={`flex-1 px-5 py-3 rounded-xl text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-50 ${
//               isPublish
//                 ? "bg-gradient-to-r from-green-500 to-emerald-600"
//                 : "bg-gradient-to-r from-red-500 to-pink-500"
//             }`}
//           >

//             {loading && (
//               <Loader2
//                 size={17}
//                 className="animate-spin"
//               />
//             )}

//             {confirmText}

//           </button>

//         </div>

//       </div>

//     </div>
//   );
// }



// src/pages/institute/Website/WebsitePublish.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Copy,
  ExternalLink,
  Globe,
  Loader2,
  Eye,
  FileText,
  Palette,
  RefreshCw,
  XCircle,
  AlertTriangle,
} from "lucide-react";

import toast from "react-hot-toast";

import {
  getWebsiteStatus,
  getWebsiteData,
  publishWebsite,
  unpublishWebsite,
} from "../../services/websiteService";


/* =========================================================
   STATUS CONFIG
========================================================= */

const STATUS_CONFIG = {
  draft: {
    label: "Draft",
    description:
      "Your website is ready to be reviewed and published.",
  },

  published: {
    label: "Published",
    description:
      "Your website is currently live and visible to visitors.",
  },

  unpublished: {
    label: "Unpublished",
    description:
      "Your website is currently offline. Your website data is still saved.",
  },
};


/* =========================================================
   FORMAT DATE
========================================================= */

const formatDate = (value) => {
  if (!value) {
    return "-";
  }

  try {
    return new Date(value).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return "-";
  }
};


/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function WebsitePublish() {
  const navigate = useNavigate();

  /* =========================================================
     STATE
  ========================================================= */

  const [status, setStatus] = useState(null);
  const [website, setWebsite] = useState(null);

  const [loading, setLoading] = useState(true);
  const [publishing, setPublishing] = useState(false);
  const [unpublishing, setUnpublishing] = useState(false);

  const [showPublishConfirm, setShowPublishConfirm] =
    useState(false);

  const [showUnpublishConfirm, setShowUnpublishConfirm] =
    useState(false);

  const [copied, setCopied] = useState(false);


  /* =========================================================
     LOAD WEBSITE
  ========================================================= */

  useEffect(() => {
    loadWebsite();
  }, []);


  const loadWebsite = async () => {
    try {
      setLoading(true);

      const [statusData, websiteData] = await Promise.all([
        getWebsiteStatus(),
        getWebsiteData(),
      ]);

      console.log("Website status:", statusData);
      console.log("Website data:", websiteData);

      setStatus(statusData || {});
      setWebsite(websiteData || {});
    } catch (error) {
      console.error("Failed to load website:", error);

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to load website"
      );
    } finally {
      setLoading(false);
    }
  };


  /* =========================================================
     CURRENT STATUS
  ========================================================= */

  const currentStatus = (
    status?.status ||
    website?.status ||
    "draft"
  ).toLowerCase();

  const statusConfig =
    STATUS_CONFIG[currentStatus] ||
    STATUS_CONFIG.draft;


  /* =========================================================
     WEBSITE URL
  ========================================================= */

  const publishedUrl =
    status?.publishedUrl ||
    status?.published_url ||
    website?.publishedUrl ||
    website?.published_url ||
    null;


  /* =========================================================
     DATES
  ========================================================= */

  const publishedAt =
    status?.publishedAt ||
    status?.published_at ||
    website?.publishedAt ||
    website?.published_at ||
    null;

  const lastSavedAt =
    status?.lastSavedAt ||
    status?.last_saved_at ||
    website?.lastSavedAt ||
    website?.last_saved_at ||
    null;


  /* =========================================================
     SECTION INFORMATION
  ========================================================= */

  const sections = Array.isArray(website?.sections)
    ? website.sections
    : [];

  const visibleSectionCount =
    status?.visibleSectionCount ??
    status?.visible_section_count ??
    sections.filter((section) => {
      return (
        section?.is_enabled === 1 ||
        section?.is_enabled === true ||
        section?.enabled === true
      );
    }).length;

  const totalSectionCount =
    status?.totalSectionCount ??
    status?.total_section_count ??
    sections.length;


  /* =========================================================
     PUBLISH READINESS
     
     Template is NOT required.
     Hero is NOT required.
     Contact is NOT required.
  ========================================================= */

  const canPublish = visibleSectionCount > 0;


  /* =========================================================
     PUBLISH WEBSITE
  ========================================================= */

  const handlePublish = async () => {
    try {
      setPublishing(true);

      const response = await publishWebsite();

      console.log("Publish response:", response);

      toast.success("Website published successfully");

      setShowPublishConfirm(false);

      await loadWebsite();
    } catch (error) {
      console.error("Publish error:", error);

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to publish website"
      );
    } finally {
      setPublishing(false);
    }
  };


  /* =========================================================
     UNPUBLISH WEBSITE
  ========================================================= */

  const handleUnpublish = async () => {
    try {
      setUnpublishing(true);

      await unpublishWebsite();

      toast.success("Website unpublished successfully");

      setShowUnpublishConfirm(false);

      await loadWebsite();
    } catch (error) {
      console.error("Unpublish error:", error);

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to unpublish website"
      );
    } finally {
      setUnpublishing(false);
    }
  };


  /* =========================================================
     COPY WEBSITE URL
  ========================================================= */

  const handleCopyUrl = async () => {
    if (!publishedUrl) {
      return;
    }

    try {
      await navigator.clipboard.writeText(publishedUrl);

      setCopied(true);

      toast.success("Website URL copied");

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Copy failed:", error);

      toast.error("Unable to copy website URL");
    }
  };


  /* =========================================================
     OPEN WEBSITE
  ========================================================= */

  const handleOpenWebsite = () => {
    if (!publishedUrl) {
      return;
    }

    window.open(
      publishedUrl,
      "_blank",
      "noopener,noreferrer"
    );
  };


  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="flex items-center gap-3 text-gray-400">
          <Loader2
            size={22}
            className="animate-spin"
          />

          <span>
            Loading website information...
          </span>
        </div>
      </div>
    );
  }


  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <div className="space-y-6">


      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        <div className="flex items-center gap-4">

          <button
            type="button"
            onClick={() =>
              navigate("/institute/website")
            }
            className="p-2 rounded-xl text-gray-400 hover:bg-[#2a2a35] hover:text-white transition"
          >
            <ArrowLeft size={22} />
          </button>


          <div>

            <div className="flex items-center gap-2">

              <Globe
                size={22}
                className="text-purple-400"
              />

              <h1 className="text-2xl font-bold text-white">
                Publish Website
              </h1>

            </div>

            <p className="text-sm text-gray-400 mt-1">
              Review your website and publish it when you're ready.
            </p>

          </div>

        </div>


        {/* REFRESH */}

        <button
          type="button"
          onClick={loadWebsite}
          disabled={
            loading ||
            publishing ||
            unpublishing
          }
          className="px-4 py-2.5 rounded-xl border border-[#34313f] text-gray-300 hover:bg-[#24212f] transition flex items-center gap-2 disabled:opacity-50"
        >
          <RefreshCw size={17} />

          Refresh
        </button>

      </div>


      {/* =====================================================
          WEBSITE STATUS
      ===================================================== */}

      <div
        className={`rounded-2xl border p-6 ${
          currentStatus === "published"
            ? "bg-green-500/5 border-green-500/20"
            : currentStatus === "unpublished"
            ? "bg-orange-500/5 border-orange-500/20"
            : "bg-[#151519] border-[#2c2c35]"
        }`}
      >

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">


          {/* STATUS */}

          <div className="flex items-center gap-4">

            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                currentStatus === "published"
                  ? "bg-green-500/10"
                  : currentStatus === "unpublished"
                  ? "bg-orange-500/10"
                  : "bg-purple-500/10"
              }`}
            >

              {currentStatus === "published" ? (
                <CheckCircle2
                  size={28}
                  className="text-green-400"
                />
              ) : currentStatus === "unpublished" ? (
                <XCircle
                  size={28}
                  className="text-orange-400"
                />
              ) : (
                <FileText
                  size={28}
                  className="text-purple-400"
                />
              )}

            </div>


            <div>

              <div className="flex items-center gap-3">

                <h2 className="text-xl font-semibold text-white">
                  Website {statusConfig.label}
                </h2>

                <StatusBadge
                  status={currentStatus}
                />

              </div>

              <p className="text-sm text-gray-500 mt-1">
                {statusConfig.description}
              </p>

            </div>

          </div>


          {/* ACTION */}

          <div>

            {currentStatus === "published" ? (

              <button
                type="button"
                onClick={() =>
                  setShowUnpublishConfirm(true)
                }
                disabled={unpublishing}
                className="px-5 py-2.5 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 transition flex items-center gap-2 disabled:opacity-50"
              >

                {unpublishing ? (
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                ) : (
                  <XCircle size={18} />
                )}

                Unpublish

              </button>

            ) : (

              <button
                type="button"
                onClick={() =>
                  setShowPublishConfirm(true)
                }
                disabled={
                  !canPublish ||
                  publishing
                }
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >

                {publishing ? (
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                ) : (
                  <Globe size={18} />
                )}

                Publish Website

              </button>

            )}

          </div>

        </div>

      </div>


      {/* =====================================================
          WARNING IF NO SECTIONS
      ===================================================== */}

      {!canPublish && (
        <div className="rounded-2xl border border-orange-500/20 bg-orange-500/5 p-5">

          <div className="flex items-start gap-4">

            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0">

              <AlertTriangle
                size={20}
                className="text-orange-400"
              />

            </div>

            <div>

              <h3 className="text-sm font-semibold text-orange-300">
                Website is not ready to publish
              </h3>

              <p className="text-sm text-gray-400 mt-1">
                Enable at least one website section before publishing.
              </p>

            </div>

          </div>

        </div>
      )}


      {/* =====================================================
          PUBLISHED WEBSITE
      ===================================================== */}

      {publishedUrl && (
        <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-6">

          <div className="flex items-center gap-3 mb-4">

            <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">

              <Globe
                size={19}
                className="text-green-400"
              />

            </div>

            <div>

              <h2 className="text-white font-semibold">
                Published Website
              </h2>

              <p className="text-xs text-gray-500">
                Your public website URL
              </p>

            </div>

          </div>


          <div className="flex flex-col sm:flex-row gap-3">

            <div className="flex-1 min-w-0 rounded-xl bg-[#0f0f13] border border-[#34313f] px-4 py-3">

              <p className="text-sm text-gray-300 truncate">
                {publishedUrl}
              </p>

            </div>


            <button
              type="button"
              onClick={handleCopyUrl}
              className="px-4 py-3 rounded-xl border border-[#34313f] text-gray-300 hover:bg-[#24212f] flex items-center justify-center gap-2"
            >

              {copied ? (
                <>
                  <Check size={17} />
                  Copied
                </>
              ) : (
                <>
                  <Copy size={17} />
                  Copy
                </>
              )}

            </button>


            <button
              type="button"
              onClick={handleOpenWebsite}
              className="px-4 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold flex items-center justify-center gap-2"
            >

              <ExternalLink size={17} />

              Open Website

            </button>

          </div>

        </div>
      )}


      {/* =====================================================
          WEBSITE OVERVIEW
      ===================================================== */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">


        {/* WEBSITE CONFIGURATION */}

        <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-6">

          <div className="mb-6">

            <h2 className="text-lg font-semibold text-white">
              Website Overview
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Current website configuration.
            </p>

          </div>


          <div className="space-y-4">

            <InfoRow
              icon={FileText}
              label="Website Sections"
              value={`${visibleSectionCount} / ${totalSectionCount} enabled`}
            />

            <InfoRow
              icon={Palette}
              label="Branding"
              value="Configured"
            />

            <InfoRow
              icon={FileText}
              label="Last Saved"
              value={formatDate(lastSavedAt)}
            />

            <InfoRow
              icon={CheckCircle2}
              label="Last Published"
              value={formatDate(publishedAt)}
            />

          </div>

        </div>


        {/* PREVIEW */}

        <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-6">

          <div className="flex flex-col justify-between h-full">

            <div>

              <div className="w-11 h-11 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">

                <Eye
                  size={21}
                  className="text-blue-400"
                />

              </div>

              <h2 className="text-lg font-semibold text-white">
                Preview Your Website
              </h2>

              <p className="text-sm text-gray-500 mt-2 leading-6">
                Check your website before publishing it.
                Preview changes without making the website public.
              </p>

            </div>


            <button
              type="button"
              onClick={() =>
                navigate(
                  "/institute/website/preview"
                )
              }
              className="mt-6 w-full px-5 py-3 rounded-xl border border-[#34313f] text-gray-300 hover:bg-[#24212f] transition flex items-center justify-center gap-2"
            >

              <Eye size={17} />

              Open Preview

            </button>

          </div>

        </div>

      </div>


      {/* =====================================================
          QUICK ACTIONS
      ===================================================== */}

      <div>

        <h2 className="text-lg font-semibold text-white mb-4">
          Website Management
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <NavigationCard
            icon={FileText}
            title="Content"
            description="Edit your website content"
            onClick={() =>
              navigate(
                "/institute/website/content"
              )
            }
          />

          <NavigationCard
            icon={Palette}
            title="Branding"
            description="Customize website colors and fonts"
            onClick={() =>
              navigate(
                "/institute/website/branding"
              )
            }
          />

        </div>

      </div>


      {/* =====================================================
          PUBLISH CONFIRMATION
      ===================================================== */}

      {showPublishConfirm && (
        <ConfirmationModal
          title="Publish Website?"
          description="Your institute website will become publicly accessible. You can unpublish it later."
          confirmText={
            publishing
              ? "Publishing..."
              : "Yes, Publish Website"
          }
          onCancel={() =>
            setShowPublishConfirm(false)
          }
          onConfirm={handlePublish}
          loading={publishing}
          type="publish"
        />
      )}


      {/* =====================================================
          UNPUBLISH CONFIRMATION
      ===================================================== */}

      {showUnpublishConfirm && (
        <ConfirmationModal
          title="Unpublish Website?"
          description="Your public website will no longer be accessible to visitors. Your website content and branding will not be deleted."
          confirmText={
            unpublishing
              ? "Unpublishing..."
              : "Yes, Unpublish"
          }
          onCancel={() =>
            setShowUnpublishConfirm(false)
          }
          onConfirm={handleUnpublish}
          loading={unpublishing}
          type="unpublish"
        />
      )}

    </div>
  );
}


/* =========================================================
   STATUS BADGE
========================================================= */

function StatusBadge({ status }) {
  const config = {
    published: {
      label: "Live",
      className:
        "bg-green-500/10 text-green-400 border-green-500/20",
    },

    draft: {
      label: "Draft",
      className:
        "bg-purple-500/10 text-purple-400 border-purple-500/20",
    },

    unpublished: {
      label: "Offline",
      className:
        "bg-orange-500/10 text-orange-400 border-orange-500/20",
    },
  };

  const current =
    config[status] || config.draft;

  return (
    <span
      className={`px-2.5 py-1 rounded-full border text-xs font-medium ${current.className}`}
    >
      {current.label}
    </span>
  );
}


/* =========================================================
   INFO ROW
========================================================= */

function InfoRow({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="flex items-center gap-3">

      <div className="w-9 h-9 rounded-lg bg-[#24212f] flex items-center justify-center">

        <Icon
          size={17}
          className="text-gray-500"
        />

      </div>

      <div className="flex-1 min-w-0">

        <p className="text-xs text-gray-600">
          {label}
        </p>

        <p className="text-sm text-gray-300 mt-0.5 truncate">
          {value || "-"}
        </p>

      </div>

    </div>
  );
}


/* =========================================================
   NAVIGATION CARD
========================================================= */

function NavigationCard({
  icon: Icon,
  title,
  description,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-5 text-left hover:border-[#4b4560] transition group"
    >

      <div className="flex items-center gap-4">

        <div className="w-10 h-10 rounded-xl bg-[#24212f] flex items-center justify-center group-hover:bg-purple-500/10 transition">

          <Icon
            size={19}
            className="text-gray-500 group-hover:text-purple-400 transition"
          />

        </div>

        <div>

          <p className="text-white font-semibold">
            {title}
          </p>

          <p className="text-xs text-gray-600 mt-1">
            {description}
          </p>

        </div>

      </div>

    </button>
  );
}


/* =========================================================
   CONFIRMATION MODAL
========================================================= */

function ConfirmationModal({
  title,
  description,
  confirmText,
  onCancel,
  onConfirm,
  loading,
  type,
}) {
  const isPublish = type === "publish";

  return (
    <div className="fixed inset-0 z-[200] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">

      <div className="w-full max-w-md bg-[#1e1b2e] border border-[#343047] rounded-2xl shadow-2xl p-6">


        {/* ICON */}

        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${
            isPublish
              ? "bg-green-500/10"
              : "bg-red-500/10"
          }`}
        >

          {isPublish ? (
            <Globe
              size={26}
              className="text-green-400"
            />
          ) : (
            <AlertTriangle
              size={26}
              className="text-red-400"
            />
          )}

        </div>


        {/* TITLE */}

        <h2 className="text-xl font-bold text-white">
          {title}
        </h2>


        {/* DESCRIPTION */}

        <p className="text-sm text-gray-400 mt-3 leading-6">
          {description}
        </p>


        {/* BUTTONS */}

        <div className="flex gap-3 mt-7">

          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="flex-1 px-5 py-3 rounded-xl border border-[#3a3650] text-gray-300 hover:bg-[#2a2640] transition disabled:opacity-50"
          >
            Cancel
          </button>


          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className={`flex-1 px-5 py-3 rounded-xl text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-50 ${
              isPublish
                ? "bg-gradient-to-r from-green-500 to-emerald-600"
                : "bg-gradient-to-r from-red-500 to-pink-500"
            }`}
          >

            {loading && (
              <Loader2
                size={17}
                className="animate-spin"
              />
            )}

            {confirmText}

          </button>

        </div>

      </div>

    </div>
  );
}