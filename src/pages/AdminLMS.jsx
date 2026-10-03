
// import { useEffect, useMemo, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import toast from "react-hot-toast";

// import {
//   ArrowLeft,
//   BookOpen,
//   ChevronDown,
//   ChevronRight,
//   ExternalLink,
//   FileText,
//   GripVertical,
//   Loader2,
//   Radio,
//   Video,
// } from "lucide-react";

// import API from "../services/api";

// const COLORS = {
//   bg: "#07080D",
//   panel: "#10121A",
//   panel2: "#15121F",
//   border: "rgba(255,255,255,.10)",
//   purple: "#9B2CFF",
//   pink: "#FF2AAE",
//   text: "#FFFFFF",
//   muted: "#AAA5B8",
// };

// /* =========================================================
//    HELPERS
// ========================================================= */

// const normalizeArray = (value) => {
//   if (Array.isArray(value)) return value;

//   if (Array.isArray(value?.data)) {
//     return value.data;
//   }

//   if (Array.isArray(value?.rows)) {
//     return value.rows;
//   }

//   return [];
// };

// const normalizeClasses = (payload) => {
//   const root = payload?.data ?? payload ?? {};

//   const candidates =
//     root?.classes ??
//     root?.data?.classes ??
//     root?.rows ??
//     root?.data ??
//     root;

//   return normalizeArray(candidates);
// };

// const normalizeCurriculum = (payload) => {
//   const root = payload?.data ?? payload ?? {};

//   const course =
//     root?.course ??
//     root?.class ??
//     root?.data?.course ??
//     root?.data?.class ??
//     null;

//   const sections = normalizeArray(
//     root?.sections ??
//       root?.curriculum ??
//       root?.data?.sections ??
//       root?.data?.curriculum
//   );

//   return {
//     course,
//     sections: sections.map((section) => ({
//       ...section,
//       lessons: normalizeArray(
//         section?.lessons ??
//           section?.course_lessons ??
//           section?.lms_lessons
//       ),
//     })),
//   };
// };

// const normalizeLessonType = (value) => {
//   const type = String(value || "").toUpperCase();

//   if (
//     type === "VIDEO" ||
//     type === "DIRECT_VIDEO" ||
//     type === "VID"
//   ) {
//     return "VIDEO";
//   }

//   if (type === "RECORDING") {
//     return "RECORDING";
//   }

//   if (type === "YOUTUBE") {
//     return "YOUTUBE";
//   }

//   if (type === "PDF") {
//     return "PDF";
//   }

//   if (type === "TEXT") {
//     return "TEXT";
//   }

//   if (type === "LIVE") {
//     return "LIVE";
//   }

//   if (type === "EXTERNAL") {
//     return "EXTERNAL";
//   }

//   return "YOUTUBE";
// };

// const getLessonIcon = (type) => {
//   switch (normalizeLessonType(type)) {
//     case "YOUTUBE":
//       return <Video size={16} />;

//     case "VIDEO":
//       return <Video size={16} />;

//     case "RECORDING":
//       return <Video size={16} />;

//     case "PDF":
//       return <FileText size={16} />;

//     case "TEXT":
//       return <FileText size={16} />;

//     case "LIVE":
//       return <Radio size={16} />;

//     default:
//       return <ExternalLink size={16} />;
//   }
// };

// const getLessonTypeLabel = (type) => {
//   switch (normalizeLessonType(type)) {
//     case "YOUTUBE":
//       return "YouTube";

//     case "VIDEO":
//       return "Video";

//     case "RECORDING":
//       return "Recording";

//     case "PDF":
//       return "PDF";

//     case "TEXT":
//       return "Text";

//     case "LIVE":
//       return "Live";

//     case "EXTERNAL":
//       return "External";

//     default:
//       return "Lesson";
//   }
// };

// /* =========================================================
//    ADMIN AUTH
// ========================================================= */

// const getAdminConfig = () => {
//   const adminToken = localStorage.getItem("adminToken");

//   return {
//     headers: adminToken
//       ? {
//           Authorization: `Bearer ${adminToken}`,
//         }
//       : {},
//   };
// };

// /* =========================================================
//    INPUT STYLES
// ========================================================= */

// function InputStyles() {
//   return (
//     <style>{`
//       .admin-lms-scrollbar::-webkit-scrollbar {
//         width: 7px;
//       }

//       .admin-lms-scrollbar::-webkit-scrollbar-track {
//         background: transparent;
//       }

//       .admin-lms-scrollbar::-webkit-scrollbar-thumb {
//         background: rgba(255,255,255,.12);
//         border-radius: 999px;
//       }

//       .admin-lms-scrollbar::-webkit-scrollbar-thumb:hover {
//         background: rgba(255,255,255,.20);
//       }
//     `}</style>
//   );
// }

// /* =========================================================
//    MAIN COMPONENT
// ========================================================= */

// export default function AdminLMS() {
//   const { classId } = useParams();
//   const navigate = useNavigate();

//   const [classes, setClasses] = useState([]);
//   const [course, setCourse] = useState(null);
//   const [sections, setSections] = useState([]);

//   const [loading, setLoading] = useState(true);
//   const [classesLoading, setClassesLoading] = useState(false);

//   const [openSections, setOpenSections] = useState({});

//   /* =======================================================
//      COURSE TITLE
//   ======================================================= */

//   const classTitle = useMemo(() => {
//     return (
//       course?.title ||
//       course?.name ||
//       course?.class_name ||
//       "Class Curriculum"
//     );
//   }, [course]);

//   /* =======================================================
//      LOAD ADMIN CLASSES
//   ======================================================= */

//   const loadClasses = async () => {
//     setClassesLoading(true);
//     setLoading(true);

//     try {
//       const config = getAdminConfig();

//       const response = await API.get(
//         "/lms/admin/classes",
//         config
//       );

//       const normalized = normalizeClasses(
//         response.data
//       );

//       setClasses(normalized);
//     } catch (error) {
//       console.error(
//         "Admin LMS classes load error:",
//         error
//       );

//       toast.error(
//         error?.response?.data?.message ||
//           "Failed to load LMS classes"
//       );

//       setClasses([]);
//     } finally {
//       setClassesLoading(false);
//       setLoading(false);
//     }
//   };

//   /* =======================================================
//      LOAD ADMIN CURRICULUM
//   ======================================================= */

//   const loadCurriculum = async () => {
//     if (!classId) {
//       await loadClasses();
//       return;
//     }

//     setLoading(true);

//     try {
//       const config = getAdminConfig();

//       const response = await API.get(
//         `/lms/admin/classes/${classId}/curriculum`,
//         config
//       );

//       const normalized = normalizeCurriculum(
//         response.data
//       );

//       setCourse(normalized.course);
//       setSections(normalized.sections);

//       setOpenSections((previous) => {
//         const next = { ...previous };

//         normalized.sections.forEach(
//           (section, index) => {
//             if (
//               next[section.id] ===
//               undefined
//             ) {
//               next[section.id] =
//                 index === 0;
//             }
//           }
//         );

//         return next;
//       });
//     } catch (error) {
//       console.error(
//         "Admin LMS curriculum load error:",
//         error
//       );

//       toast.error(
//         error?.response?.data?.message ||
//           "Failed to load curriculum"
//       );

//       setCourse(null);
//       setSections([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* =======================================================
//      INITIAL LOAD
//   ======================================================= */

//   useEffect(() => {
//     loadCurriculum();

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [classId]);

//   /* =======================================================
//      TOGGLE SECTION
//   ======================================================= */

//   const toggleSection = (id) => {
//     setOpenSections((previous) => ({
//       ...previous,
//       [id]: !previous[id],
//     }));
//   };

//   /* =======================================================
//      STATISTICS
//   ======================================================= */

//   const totalLessons = sections.reduce(
//     (total, section) =>
//       total +
//       (section?.lessons?.length || 0),
//     0
//   );

//   const publishedSections =
//     sections.filter(
//       (section) =>
//         Number(section?.is_published) === 1
//     ).length;

//   const publishedLessons =
//     sections.reduce(
//       (total, section) =>
//         total +
//         (section?.lessons || []).filter(
//           (lesson) =>
//             Number(lesson?.is_published) === 1
//         ).length,
//       0
//     );

//   /* =======================================================
//      CLASS SELECTION
//   ======================================================= */

//   if (!classId) {
//     return (
//       <>
//         <InputStyles />

//         <div
//           className="min-h-screen w-full text-white"
//           style={{
//             background: COLORS.bg,
//           }}
//         >
//           <div className="mx-auto max-w-7xl space-y-7 p-6">
//             {/* HEADER */}

//             <div>
//               <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-purple-300">
//                 <BookOpen size={15} />

//                 Admin LMS
//               </div>

//               <h1 className="mt-2 text-3xl font-bold tracking-tight">
//                 Learning Management
//                 System
//               </h1>

//               <p
//                 className="mt-2 max-w-2xl text-sm leading-6"
//                 style={{
//                   color: COLORS.muted,
//                 }}
//               >
//                 Select a class to view
//                 its LMS curriculum,
//                 sections, lessons and
//                 learning content.
//               </p>
//             </div>

//             {/* LOADING */}

//             {classesLoading ? (
//               <div
//                 className="rounded-2xl border p-16 text-center"
//                 style={{
//                   borderColor:
//                     COLORS.border,
//                   background:
//                     COLORS.panel,
//                 }}
//               >
//                 <Loader2
//                   className="mx-auto animate-spin text-purple-400"
//                   size={36}
//                 />

//                 <p
//                   className="mt-4 text-sm"
//                   style={{
//                     color: COLORS.muted,
//                   }}
//                 >
//                   Loading classes...
//                 </p>
//               </div>
//             ) : classes.length === 0 ? (
//               /* EMPTY */

//               <div
//                 className="rounded-2xl border p-16 text-center"
//                 style={{
//                   borderColor:
//                     COLORS.border,
//                   background:
//                     COLORS.panel,
//                 }}
//               >
//                 <BookOpen
//                   className="mx-auto text-purple-400"
//                   size={44}
//                 />

//                 <h2 className="mt-5 text-xl font-semibold">
//                   No LMS classes found
//                 </h2>

//                 <p
//                   className="mx-auto mt-2 max-w-lg text-sm leading-6"
//                   style={{
//                     color: COLORS.muted,
//                   }}
//                 >
//                   There are currently no
//                   classes available for
//                   the Admin LMS.
//                 </p>
//               </div>
//             ) : (
//               /* CLASS CARDS */

//               <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
//                 {classes.map((item) => {
//                   const id =
//                     item?.id ??
//                     item?.class_id;

//                   const title =
//                     item?.title ||
//                     item?.name ||
//                     item?.class_name ||
//                     "Untitled class";

//                   const category =
//                     item?.category_name ||
//                     item?.category ||
//                     item?.subcategory_name ||
//                     "Not available";

//                   const image =
//                     item?.image_url ||
//                     item?.image ||
//                     item?.thumbnail ||
//                     item?.banner_image ||
//                     null;

//                   return (
//                     <button
//                       key={id}
//                       type="button"
//                       onClick={() =>
//                         navigate(
//                           `/admin/lms/${id}`
//                         )
//                       }
//                       className="group overflow-hidden rounded-2xl border text-left transition hover:-translate-y-1 hover:border-purple-500/50"
//                       style={{
//                         borderColor:
//                           COLORS.border,
//                         background:
//                           COLORS.panel,
//                       }}
//                     >
//                       {/* IMAGE */}

//                       <div className="h-44 overflow-hidden bg-[#181820]">
//                         {image ? (
//                           <img
//                             src={image}
//                             alt={title}
//                             className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
//                           />
//                         ) : (
//                           <div className="flex h-full items-center justify-center">
//                             <BookOpen
//                               size={42}
//                               className="text-purple-400"
//                             />
//                           </div>
//                         )}
//                       </div>

//                       {/* CONTENT */}

//                       <div className="p-5">
//                         <div className="flex items-start justify-between gap-3">
//                           <div className="min-w-0">
//                             <h2 className="truncate text-lg font-semibold text-white">
//                               {title}
//                             </h2>

//                             <p
//                               className="mt-1 text-sm"
//                               style={{
//                                 color:
//                                   COLORS.muted,
//                               }}
//                             >
//                               {category}
//                             </p>
//                           </div>

//                           <ChevronRight
//                             size={20}
//                             className="shrink-0 text-purple-300 transition group-hover:translate-x-1"
//                           />
//                         </div>

//                         <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
//                           <span className="text-xs text-white/45">
//                             View curriculum
//                           </span>

//                           <span className="text-sm font-semibold text-purple-300">
//                             Open LMS
//                           </span>
//                         </div>
//                       </div>
//                     </button>
//                   );
//                 })}
//               </div>
//             )}
//           </div>
//         </div>
//       </>
//     );
//   }

//   /* =======================================================
//      ADMIN CLASS LMS
//   ======================================================= */

//   return (
//     <>
//       <InputStyles />

//       <div
//         className="min-h-screen w-full text-white"
//         style={{
//           background: COLORS.bg,
//         }}
//       >
//         <div className="mx-auto max-w-7xl space-y-6 p-6">
//           {/* =================================================
//               HEADER
//           ================================================= */}

//           <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
//             <div className="flex min-w-0 items-start gap-3">
//               <button
//                 type="button"
//                 onClick={() =>
//                   navigate("/admin/lms")
//                 }
//                 className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition hover:bg-white/5"
//                 style={{
//                   borderColor:
//                     COLORS.border,
//                 }}
//                 title="Back to LMS classes"
//               >
//                 <ArrowLeft size={19} />
//               </button>

//               <div className="min-w-0">
//                 <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-purple-300">
//                   <BookOpen size={14} />

//                   Admin LMS
//                 </div>

//                 <h1 className="mt-1 truncate text-2xl font-bold sm:text-3xl">
//                   {classTitle}
//                 </h1>

//                 <p
//                   className="mt-1 max-w-2xl text-sm leading-6"
//                   style={{
//                     color: COLORS.muted,
//                   }}
//                 >
//                   View the complete
//                   curriculum, sections and
//                   lessons for this class.
//                 </p>
//               </div>
//             </div>

//             <div
//               className="rounded-xl border px-4 py-3 text-xs"
//               style={{
//                 borderColor:
//                   "rgba(155,44,255,.25)",
//                 background:
//                   "rgba(155,44,255,.08)",
//               }}
//             >
//               <span className="text-purple-300">
//                 Admin View
//               </span>
//             </div>
//           </div>

//           {/* =================================================
//               SUMMARY
//           ================================================= */}

//           <div
//             className="rounded-2xl border p-5"
//             style={{
//               borderColor:
//                 "rgba(155,44,255,.28)",
//               background:
//                 "linear-gradient(135deg, rgba(155,44,255,.12), rgba(255,42,174,.05) 45%, #10121A 100%)",
//             }}
//           >
//             <div className="grid gap-4 md:grid-cols-4">
//               <Stat
//                 label="Sections"
//                 value={sections.length}
//               />

//               <Stat
//                 label="Lessons"
//                 value={totalLessons}
//               />

//               <Stat
//                 label="Published Sections"
//                 value={publishedSections}
//               />

//               <Stat
//                 label="Published Lessons"
//                 value={publishedLessons}
//               />
//             </div>
//           </div>

//           {/* =================================================
//               LOADING
//           ================================================= */}

//           {loading ? (
//             <div
//               className="rounded-2xl border p-14 text-center"
//               style={{
//                 borderColor:
//                   COLORS.border,
//                 background:
//                   COLORS.panel,
//               }}
//             >
//               <Loader2
//                 className="mx-auto animate-spin text-purple-400"
//                 size={34}
//               />

//               <p
//                 className="mt-4 text-sm"
//                 style={{
//                   color: COLORS.muted,
//                 }}
//               >
//                 Loading curriculum...
//               </p>
//             </div>
//           ) : sections.length === 0 ? (
//             /* =================================================
//                EMPTY CURRICULUM
//             ================================================= */

//             <div
//               className="rounded-2xl border p-14 text-center"
//               style={{
//                 borderColor:
//                   COLORS.border,
//                 background:
//                   COLORS.panel,
//               }}
//             >
//               <BookOpen
//                 className="mx-auto text-purple-400"
//                 size={42}
//               />

//               <h2 className="mt-5 text-xl font-semibold">
//                 No curriculum found
//               </h2>

//               <p
//                 className="mx-auto mt-2 max-w-lg text-sm leading-6"
//                 style={{
//                   color: COLORS.muted,
//                 }}
//               >
//                 This class does not
//                 currently have any LMS
//                 sections or lessons.
//               </p>
//             </div>
//           ) : (
//             /* =================================================
//                CURRICULUM
//             ================================================= */

//             <div className="space-y-4">
//               {sections.map(
//                 (section, index) => {
//                   const isOpen =
//                     openSections[
//                       section.id
//                     ] !== false;

//                   const lessons =
//                     section.lessons || [];

//                   return (
//                     <section
//                       key={section.id}
//                       className="overflow-hidden rounded-2xl border"
//                       style={{
//                         borderColor:
//                           COLORS.border,
//                         background:
//                           COLORS.panel,
//                       }}
//                     >
//                       {/* =====================================
//                           SECTION HEADER
//                       ===================================== */}

//                       <button
//                         type="button"
//                         onClick={() =>
//                           toggleSection(
//                             section.id
//                           )
//                         }
//                         className="flex w-full flex-col gap-4 p-5 text-left transition hover:bg-white/[0.02] sm:flex-row sm:items-center sm:justify-between"
//                       >
//                         <div className="flex min-w-0 items-center gap-3">
//                           {isOpen ? (
//                             <ChevronDown
//                               size={19}
//                               className="shrink-0"
//                             />
//                           ) : (
//                             <ChevronRight
//                               size={19}
//                               className="shrink-0"
//                             />
//                           )}

//                           <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-purple-500/15 text-sm font-bold text-purple-300">
//                             {index + 1}
//                           </span>

//                           <div className="min-w-0">
//                             <p className="truncate font-semibold">
//                               {section.title ||
//                                 "Untitled section"}
//                             </p>

//                             <p
//                               className="mt-1 text-xs"
//                               style={{
//                                 color:
//                                   COLORS.muted,
//                               }}
//                             >
//                               {lessons.length}{" "}
//                               lesson
//                               {lessons.length ===
//                               1
//                                 ? ""
//                                 : "s"}

//                               {Number(
//                                 section.is_published
//                               ) === 1
//                                 ? " • Published"
//                                 : " • Draft"}
//                             </p>
//                           </div>
//                         </div>

//                         <div className="flex items-center gap-2 pl-12 sm:pl-0">
//                           <span className="rounded-lg border border-white/10 px-3 py-2 text-xs text-white/50">
//                             Admin
//                             Preview
//                           </span>
//                         </div>
//                       </button>

//                       {/* =====================================
//                           SECTION CONTENT
//                       ===================================== */}

//                       {isOpen && (
//                         <div
//                           className="border-t px-4 pb-4"
//                           style={{
//                             borderColor:
//                               COLORS.border,
//                           }}
//                         >
//                           {section.description && (
//                             <p
//                               className="py-4 text-sm leading-6"
//                               style={{
//                                 color:
//                                   COLORS.muted,
//                               }}
//                             >
//                               {
//                                 section.description
//                               }
//                             </p>
//                           )}

//                           {lessons.length ===
//                           0 ? (
//                             <div
//                               className="rounded-xl border border-dashed p-8 text-center"
//                               style={{
//                                 borderColor:
//                                   COLORS.border,
//                               }}
//                             >
//                               <BookOpen
//                                 className="mx-auto text-purple-400/70"
//                                 size={30}
//                               />

//                               <p
//                                 className="mt-3 text-sm"
//                                 style={{
//                                   color:
//                                     COLORS.muted,
//                                 }}
//                               >
//                                 No lessons in
//                                 this section.
//                               </p>
//                             </div>
//                           ) : (
//                             <div className="space-y-2 pt-4">
//                               {lessons.map(
//                                 (lesson) => (
//                                   <LessonRow
//                                     key={
//                                       lesson.id
//                                     }
//                                     lesson={
//                                       lesson
//                                     }
//                                   />
//                                 )
//                               )}
//                             </div>
//                           )}
//                         </div>
//                       )}
//                     </section>
//                   );
//                 }
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// /* =========================================================
//    LESSON ROW
// ========================================================= */

// function LessonRow({ lesson }) {
//   const type =
//     lesson?.lesson_type ||
//     lesson?.type;

//   const lessonType =
//     normalizeLessonType(type);

//   const title =
//     lesson?.title ||
//     "Untitled lesson";

//   const duration =
//     lesson?.duration_minutes;

//   const isPreview =
//     Number(lesson?.is_preview) === 1;

//   const isPublished =
//     Number(lesson?.is_published) === 1;

//   return (
//     <div
//       className="flex flex-col gap-3 rounded-xl border p-4 transition hover:border-purple-500/20 sm:flex-row sm:items-center sm:justify-between"
//       style={{
//         borderColor: COLORS.border,
//         background: COLORS.panel2,
//       }}
//     >
//       {/* LEFT */}

//       <div className="flex min-w-0 items-center gap-3">
//         <GripVertical
//           size={16}
//           className="shrink-0 text-white/20"
//         />

//         <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-500/10 text-purple-300">
//           {getLessonIcon(type)}
//         </div>

//         <div className="min-w-0">
//           <p className="truncate text-sm font-semibold text-white">
//             {title}
//           </p>

//           <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
//             <span
//               className="text-purple-300"
//             >
//               {getLessonTypeLabel(type)}
//             </span>

//             {duration !==
//               null &&
//               duration !==
//                 undefined &&
//               duration !==
//                 "" && (
//                 <span
//                   style={{
//                     color:
//                       COLORS.muted,
//                   }}
//                 >
//                   • {duration} min
//                 </span>
//               )}

//             {isPreview && (
//               <span
//                 style={{
//                   color:
//                     COLORS.muted,
//                 }}
//               >
//                 • Preview
//               </span>
//             )}

//             <span
//               style={{
//                 color:
//                   COLORS.muted,
//               }}
//             >
//               •{" "}
//               {isPublished
//                 ? "Published"
//                 : "Draft"}
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* RIGHT */}

//       <div className="flex items-center gap-2 pl-12 sm:pl-0">
//         {lessonType ===
//           "YOUTUBE" &&
//           lesson?.youtube_url && (
//             <a
//               href={
//                 lesson.youtube_url
//               }
//               target="_blank"
//               rel="noreferrer"
//               className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-purple-300 transition hover:bg-white/5"
//             >
//               <ExternalLink
//                 size={14}
//               />
//               Open
//             </a>
//           )}

//         {[
//           "VIDEO",
//           "RECORDING",
//           "PDF",
//           "LIVE",
//           "EXTERNAL",
//         ].includes(
//           lessonType
//         ) &&
//           lesson?.resource_url && (
//             <a
//               href={
//                 lesson.resource_url
//               }
//               target="_blank"
//               rel="noreferrer"
//               className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-purple-300 transition hover:bg-white/5"
//             >
//               <ExternalLink
//                 size={14}
//               />
//               Open
//             </a>
//           )}

//         <span className="rounded-lg border border-white/10 px-3 py-2 text-xs text-white/40">
//           View only
//         </span>
//       </div>
//     </div>
//   );
// }

// /* =========================================================
//    STAT
// ========================================================= */

// function Stat({ label, value }) {
//   return (
//     <div className="rounded-xl border border-white/10 bg-black/20 p-4">
//       <p className="text-xs uppercase tracking-wider text-white/45">
//         {label}
//       </p>

//       <p className="mt-2 text-2xl font-bold text-white">
//         {value}
//       </p>
//     </div>
//   );
// }



// import { useEffect, useMemo, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import toast from "react-hot-toast";

// import {
//   ArrowLeft,
//   BookOpen,
//   ChevronDown,
//   ChevronRight,
//   ExternalLink,
//   FileText,
//   GripVertical,
//   Loader2,
//   Radio,
//   Users,
//   BarChart3,
//   Pencil,
//   Trash2,
//   Plus,
//   Eye,
//   PlayCircle,
//   Video,
//   CheckCircle2,
//   Clock3,
//   CalendarDays,
// } from "lucide-react";

// import API from "../services/api";

// /* =========================================================
//    COLORS
// ========================================================= */

// const COLORS = {
//   bg: "#07080D",
//   panel: "#10121A",
//   panel2: "#15121F",
//   panel3: "#191523",
//   border: "rgba(255,255,255,.10)",
//   borderStrong: "rgba(180,70,255,.35)",
//   purple: "#9B2CFF",
//   pink: "#FF2AAE",
//   purpleLight: "#C58BFF",
//   text: "#FFFFFF",
//   muted: "#AAA5B8",
//   success: "#18D89D",
//   successBg: "rgba(24,216,157,.12)",
//   blue: "#4CA8FF",
//   blueBg: "rgba(76,168,255,.13)",
//   orange: "#FFB84D",
//   orangeBg: "rgba(255,184,77,.13)",
//   red: "#FF5C6C",
//   redBg: "rgba(255,92,108,.12)",
// };

// /* =========================================================
//    HELPERS
// ========================================================= */

// const normalizeArray = (value) => {
//   if (Array.isArray(value)) return value;

//   if (Array.isArray(value?.data)) {
//     return value.data;
//   }

//   if (Array.isArray(value?.rows)) {
//     return value.rows;
//   }

//   return [];
// };

// const normalizeClasses = (payload) => {
//   const root = payload?.data ?? payload ?? {};

//   const candidates =
//     root?.classes ??
//     root?.data?.classes ??
//     root?.rows ??
//     root?.data ??
//     root;

//   return normalizeArray(candidates);
// };

// const normalizeCurriculum = (payload) => {
//   const root = payload?.data ?? payload ?? {};

//   const course =
//     root?.course ??
//     root?.class ??
//     root?.data?.course ??
//     root?.data?.class ??
//     null;

//   const sections = normalizeArray(
//     root?.sections ??
//       root?.curriculum ??
//       root?.data?.sections ??
//       root?.data?.curriculum
//   );

//   return {
//     course,
//     sections: sections.map((section) => ({
//       ...section,
//       lessons: normalizeArray(
//         section?.lessons ??
//           section?.course_lessons ??
//           section?.lms_lessons
//       ),
//     })),
//   };
// };

// const normalizeLessonType = (value) => {
//   const type = String(value || "").toUpperCase();

//   if (
//     type === "VIDEO" ||
//     type === "DIRECT_VIDEO" ||
//     type === "VID"
//   ) {
//     return "VIDEO";
//   }

//   if (type === "RECORDING") return "RECORDING";
//   if (type === "YOUTUBE") return "YOUTUBE";
//   if (type === "PDF") return "PDF";
//   if (type === "TEXT") return "TEXT";
//   if (type === "LIVE") return "LIVE";
//   if (type === "EXTERNAL") return "EXTERNAL";

//   return "YOUTUBE";
// };

// const getLessonTypeLabel = (type) => {
//   switch (normalizeLessonType(type)) {
//     case "VIDEO":
//       return "Video";

//     case "RECORDING":
//       return "Recording";

//     case "YOUTUBE":
//       return "YouTube";

//     case "PDF":
//       return "PDF";

//     case "TEXT":
//       return "Text";

//     case "LIVE":
//       return "Live";

//     case "EXTERNAL":
//       return "External";

//     default:
//       return "Lesson";
//   }
// };

// const getLessonIcon = (type) => {
//   switch (normalizeLessonType(type)) {
//     case "VIDEO":
//     case "RECORDING":
//     case "YOUTUBE":
//       return <Video size={15} />;

//     case "PDF":
//     case "TEXT":
//       return <FileText size={15} />;

//     case "LIVE":
//       return <Radio size={15} />;

//     case "EXTERNAL":
//       return <ExternalLink size={15} />;

//     default:
//       return <BookOpen size={15} />;
//   }
// };

// const getLessonTypeStyle = (type) => {
//   switch (normalizeLessonType(type)) {
//     case "VIDEO":
//     case "RECORDING":
//       return {
//         background: "rgba(255,55,90,.12)",
//         color: "#FF5570",
//       };

//     case "YOUTUBE":
//       return {
//         background: "rgba(255,55,90,.12)",
//         color: "#FF5570",
//       };

//     case "TEXT":
//       return {
//         background: "rgba(67,145,255,.13)",
//         color: "#65A9FF",
//       };

//     case "PDF":
//       return {
//         background: "rgba(155,44,255,.14)",
//         color: "#C27BFF",
//       };

//     case "LIVE":
//       return {
//         background: "rgba(155,44,255,.16)",
//         color: "#C27BFF",
//       };

//     case "EXTERNAL":
//       return {
//         background: "rgba(40,150,255,.12)",
//         color: "#63B2FF",
//       };

//     default:
//       return {
//         background: "rgba(255,255,255,.08)",
//         color: COLORS.muted,
//       };
//   }
// };

// const getLessonDuration = (lesson) => {
//   const value =
//     lesson?.duration ??
//     lesson?.duration_minutes ??
//     lesson?.minutes ??
//     null;

//   if (
//     value === null ||
//     value === undefined ||
//     value === ""
//   ) {
//     return "-";
//   }

//   const number = Number(value);

//   if (!Number.isNaN(number)) {
//     return `${number} min`;
//   }

//   return String(value);
// };

// const getPublishState = (lesson) => {
//   if (Number(lesson?.is_published) === 1) {
//     return {
//       label: "Published",
//       background: COLORS.successBg,
//       color: COLORS.success,
//     };
//   }

//   if (
//     String(lesson?.status || "").toUpperCase() ===
//     "SCHEDULED"
//   ) {
//     return {
//       label: "Scheduled",
//       background: COLORS.blueBg,
//       color: COLORS.blue,
//     };
//   }

//   return {
//     label: "Draft",
//     background: "rgba(255,255,255,.07)",
//     color: "#A8A4B2",
//   };
// };

// const getSectionPublishState = (section) => {
//   if (Number(section?.is_published) === 1) {
//     return {
//       label: "Published",
//       background: COLORS.successBg,
//       color: COLORS.success,
//     };
//   }

//   return {
//     label: "Draft",
//     background: "rgba(255,255,255,.07)",
//     color: "#A8A4B2",
//   };
// };

// const getAdminConfig = () => {
//   const adminToken = localStorage.getItem("adminToken");

//   return {
//     headers: adminToken
//       ? {
//           Authorization: `Bearer ${adminToken}`,
//         }
//       : {},
//   };
// };

// /* =========================================================
//    SMALL UI COMPONENTS
// ========================================================= */

// function StatusBadge({ children, type = "success" }) {
//   const styles =
//     type === "success"
//       ? {
//           background: COLORS.successBg,
//           color: COLORS.success,
//         }
//       : type === "blue"
//       ? {
//           background: COLORS.blueBg,
//           color: COLORS.blue,
//         }
//       : {
//           background: "rgba(255,255,255,.07)",
//           color: COLORS.muted,
//         };

//   return (
//     <span
//       className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold"
//       style={styles}
//     >
//       {children}
//     </span>
//   );
// }

// function LessonTypeBadge({ type }) {
//   const style = getLessonTypeStyle(type);

//   return (
//     <span
//       className="inline-flex min-w-[86px] items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold"
//       style={style}
//     >
//       {getLessonIcon(type)}
//       {getLessonTypeLabel(type)}
//     </span>
//   );
// }

// function ActionButton({
//   icon,
//   label,
//   onClick,
//   danger = false,
// }) {
//   return (
//     <button
//       type="button"
//       title={label}
//       onClick={onClick}
//       className="flex h-9 w-9 items-center justify-center rounded-lg transition hover:bg-white/10"
//       style={{
//         color: danger ? COLORS.red : "#D9D4E4",
//       }}
//     >
//       {icon}
//     </button>
//   );
// }

// function StatCard({
//   icon,
//   label,
//   value,
// }) {
//   return (
//     <div
//       className="rounded-2xl border p-5"
//       style={{
//         borderColor: COLORS.border,
//         background:
//           "linear-gradient(145deg, rgba(155,44,255,.08), rgba(255,255,255,.015))",
//       }}
//     >
//       <div
//         className="text-xs font-medium uppercase tracking-[0.14em]"
//         style={{ color: COLORS.muted }}
//       >
//         {label}
//       </div>

//       <div className="mt-3 flex items-end justify-between">
//         <div className="text-3xl font-bold">
//           {value}
//         </div>

//         <div
//           className="flex h-10 w-10 items-center justify-center rounded-xl"
//           style={{
//             background:
//               "linear-gradient(135deg, rgba(155,44,255,.18), rgba(255,42,174,.12))",
//             color: COLORS.purpleLight,
//           }}
//         >
//           {icon}
//         </div>
//       </div>
//     </div>
//   );
// }

// /* =========================================================
//    MAIN
// ========================================================= */

// export default function AdminLMS() {
//   const { classId } = useParams();
//   const navigate = useNavigate();

//   const [classes, setClasses] = useState([]);
//   const [course, setCourse] = useState(null);
//   const [sections, setSections] = useState([]);

//   const [loading, setLoading] = useState(true);
//   const [classesLoading, setClassesLoading] =
//     useState(false);

//   const [openSections, setOpenSections] =
//     useState({});

//   const [activeTab, setActiveTab] =
//     useState("content");

//   /* =======================================================
//      CLASS TITLE
//   ======================================================= */

//   const classTitle = useMemo(() => {
//     return (
//       course?.title ||
//       course?.name ||
//       course?.class_name ||
//       "Class Curriculum"
//     );
//   }, [course]);

//   /* =======================================================
//      LOAD CLASSES
//   ======================================================= */

//   const loadClasses = async () => {
//     setClassesLoading(true);
//     setLoading(true);

//     try {
//       const response = await API.get(
//         "/lms/admin/classes",
//         getAdminConfig()
//       );

//       setClasses(
//         normalizeClasses(response?.data)
//       );
//     } catch (error) {
//       console.error(
//         "Admin LMS classes load error:",
//         error
//       );

//       toast.error(
//         error?.response?.data?.message ||
//           "Failed to load LMS classes"
//       );

//       setClasses([]);
//     } finally {
//       setClassesLoading(false);
//       setLoading(false);
//     }
//   };

//   /* =======================================================
//      LOAD CURRICULUM
//   ======================================================= */

//   const loadCurriculum = async () => {
//     if (!classId) {
//       await loadClasses();
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await API.get(
//         `/lms/admin/classes/${classId}/curriculum`,
//         getAdminConfig()
//       );

//       const normalized =
//         normalizeCurriculum(response?.data);

//       setCourse(normalized.course);
//       setSections(normalized.sections);

//       setOpenSections((previous) => {
//         const next = { ...previous };

//         normalized.sections.forEach(
//           (section, index) => {
//             if (
//               next[section.id] ===
//               undefined
//             ) {
//               next[section.id] =
//                 index === 0;
//             }
//           }
//         );

//         return next;
//       });
//     } catch (error) {
//       console.error(
//         "Admin LMS curriculum load error:",
//         error
//       );

//       toast.error(
//         error?.response?.data?.message ||
//           "Failed to load curriculum"
//       );

//       setCourse(null);
//       setSections([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* =======================================================
//      INITIAL LOAD
//   ======================================================= */

//   useEffect(() => {
//     loadCurriculum();

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [classId]);

//   /* =======================================================
//      SECTION TOGGLE
//   ======================================================= */

//   const toggleSection = (id) => {
//     setOpenSections((previous) => ({
//       ...previous,
//       [id]: !previous[id],
//     }));
//   };

//   /* =======================================================
//      UI ONLY ACTIONS
//   ======================================================= */

//   const uiAction = (message) => {
//     toast(message, {
//       icon: "ℹ️",
//       style: {
//         background: "#17131F",
//         color: "#fff",
//         border:
//           "1px solid rgba(155,44,255,.35)",
//       },
//     });
//   };

//   /* =======================================================
//      STATS
//   ======================================================= */

//   const totalLessons = sections.reduce(
//     (total, section) =>
//       total +
//       (section?.lessons?.length || 0),
//     0
//   );

//   const publishedSections =
//     sections.filter(
//       (section) =>
//         Number(section?.is_published) === 1
//     ).length;

//   const publishedLessons =
//     sections.reduce(
//       (total, section) =>
//         total +
//         (section?.lessons || []).filter(
//           (lesson) =>
//             Number(lesson?.is_published) ===
//             1
//         ).length,
//       0
//     );

//   const studentCount =
//     course?.students_count ??
//     course?.students ??
//     course?.enrolled_students ??
//     0;

//   /* =======================================================
//      CLASS LIST
//   ======================================================= */

//   if (!classId) {
//     return (
//       <>
//         <style>{`
//           .admin-lms-scrollbar::-webkit-scrollbar {
//             width: 7px;
//           }

//           .admin-lms-scrollbar::-webkit-scrollbar-track {
//             background: transparent;
//           }

//           .admin-lms-scrollbar::-webkit-scrollbar-thumb {
//             background: rgba(255,255,255,.12);
//             border-radius: 999px;
//           }

//           .admin-lms-scrollbar::-webkit-scrollbar-thumb:hover {
//             background: rgba(255,255,255,.22);
//           }

//           .admin-lms-card {
//             transition:
//               transform .2s ease,
//               border-color .2s ease,
//               box-shadow .2s ease;
//           }

//           .admin-lms-card:hover {
//             transform: translateY(-3px);
//             border-color: rgba(155,44,255,.38) !important;
//             box-shadow:
//               0 18px 50px rgba(0,0,0,.28),
//               0 0 30px rgba(155,44,255,.08);
//           }
//         `}</style>

//         <div
//           className="admin-lms-scrollbar min-h-screen w-full overflow-y-auto text-white"
//           style={{
//             background: COLORS.bg,
//           }}
//         >
//           <div className="mx-auto max-w-[1450px] space-y-8 p-6 lg:p-8">

//             {/* HEADER */}

//             <div>
//               <div
//                 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em]"
//                 style={{
//                   color: COLORS.purpleLight,
//                 }}
//               >
//                 <BookOpen size={16} />
//                 Admin LMS
//               </div>

//               <h1 className="mt-3 text-3xl font-bold tracking-tight lg:text-4xl">
//                 Learning Management System
//               </h1>

//               <p
//                 className="mt-2 max-w-2xl text-sm leading-6"
//                 style={{
//                   color: COLORS.muted,
//                 }}
//               >
//                 Select a class to view its
//                 complete LMS curriculum,
//                 sections, lessons and
//                 learning content.
//               </p>
//             </div>

//             {/* LOADING */}

//             {classesLoading ? (
//               <div
//                 className="rounded-2xl border p-20 text-center"
//                 style={{
//                   borderColor: COLORS.border,
//                   background: COLORS.panel,
//                 }}
//               >
//                 <Loader2
//                   className="mx-auto animate-spin"
//                   size={38}
//                   color={COLORS.purpleLight}
//                 />

//                 <p
//                   className="mt-4 text-sm"
//                   style={{
//                     color: COLORS.muted,
//                   }}
//                 >
//                   Loading LMS classes...
//                 </p>
//               </div>
//             ) : classes.length === 0 ? (
//               <div
//                 className="rounded-2xl border p-20 text-center"
//                 style={{
//                   borderColor: COLORS.border,
//                   background: COLORS.panel,
//                 }}
//               >
//                 <BookOpen
//                   className="mx-auto"
//                   size={48}
//                   color={COLORS.purpleLight}
//                 />

//                 <h2 className="mt-5 text-xl font-semibold">
//                   No LMS classes found
//                 </h2>

//                 <p
//                   className="mx-auto mt-2 max-w-lg text-sm leading-6"
//                   style={{
//                     color: COLORS.muted,
//                   }}
//                 >
//                   No classes are currently
//                   available in the Admin LMS.
//                 </p>
//               </div>
//             ) : (
//               <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
//                 {classes.map((item) => {
//                   const id =
//                     item?.id ??
//                     item?.class_id;

//                   const title =
//                     item?.title ||
//                     item?.name ||
//                     item?.class_name ||
//                     "Untitled Class";

//                   const image =
//                     item?.image ||
//                     item?.thumbnail ||
//                     item?.banner_image ||
//                     item?.class_image ||
//                     null;

//                   const category =
//                     item?.category_name ||
//                     item?.category ||
//                     "Not available";

//                   const subcategory =
//                     item?.subcategory_name ||
//                     item?.subcategory ||
//                     "Not available";

//                   const sectionsCount =
//                     item?.sections ??
//                     item?.section_count ??
//                     0;

//                   const lessonsCount =
//                     item?.lessons ??
//                     item?.lesson_count ??
//                     0;

//                   const students =
//                     item?.students ??
//                     item?.students_count ??
//                     item?.enrolled_students ??
//                     0;

//                   return (
//                     <button
//                       key={id}
//                       type="button"
//                       onClick={() =>
//                         navigate(
//                           `/admin/lms/${id}`
//                         )
//                       }
//                       className="admin-lms-card overflow-hidden rounded-2xl border text-left"
//                       style={{
//                         borderColor:
//                           COLORS.border,
//                         background:
//                           COLORS.panel,
//                       }}
//                     >
//                       {/* IMAGE */}

//                       <div
//                         className="relative h-52 w-full overflow-hidden"
//                         style={{
//                           background:
//                             "linear-gradient(135deg, #241132, #10121A)",
//                         }}
//                       >
//                         {image ? (
//                           <img
//                             src={image}
//                             alt={title}
//                             className="h-full w-full object-cover"
//                           />
//                         ) : (
//                           <div className="flex h-full w-full items-center justify-center">
//                             <BookOpen
//                               size={60}
//                               color={
//                                 COLORS.purpleLight
//                               }
//                             />
//                           </div>
//                         )}

//                         <div
//                           className="absolute inset-x-0 bottom-0 h-24"
//                           style={{
//                             background:
//                               "linear-gradient(to top, rgba(7,8,13,.9), transparent)",
//                           }}
//                         />

//                         <div className="absolute right-4 top-4">
//                           <StatusBadge>
//                             Active
//                           </StatusBadge>
//                         </div>
//                       </div>

//                       {/* CONTENT */}

//                       <div className="p-5">
//                         <div className="flex items-start justify-between gap-3">
//                           <div>
//                             <h2 className="text-lg font-bold">
//                               {title}
//                             </h2>

//                             <p
//                               className="mt-1 text-sm"
//                               style={{
//                                 color:
//                                   COLORS.muted,
//                               }}
//                             >
//                               {category}
//                               {"  "}
//                               <span className="opacity-40">
//                                 |
//                               </span>
//                               {"  "}
//                               {subcategory}
//                             </p>
//                           </div>

//                           <ChevronRight
//                             size={21}
//                             color={
//                               COLORS.purpleLight
//                             }
//                           />
//                         </div>

//                         <div
//                           className="mt-5 grid grid-cols-3 gap-2 border-t pt-4"
//                           style={{
//                             borderColor:
//                               COLORS.border,
//                           }}
//                         >
//                           <div>
//                             <div
//                               className="text-xs"
//                               style={{
//                                 color:
//                                   COLORS.muted,
//                               }}
//                             >
//                               Sections
//                             </div>

//                             <div className="mt-1 font-semibold">
//                               {sectionsCount}
//                             </div>
//                           </div>

//                           <div>
//                             <div
//                               className="text-xs"
//                               style={{
//                                 color:
//                                   COLORS.muted,
//                               }}
//                             >
//                               Lessons
//                             </div>

//                             <div className="mt-1 font-semibold">
//                               {lessonsCount}
//                             </div>
//                           </div>

//                           <div>
//                             <div
//                               className="text-xs"
//                               style={{
//                                 color:
//                                   COLORS.muted,
//                               }}
//                             >
//                               Students
//                             </div>

//                             <div className="mt-1 font-semibold">
//                               {students}
//                             </div>
//                           </div>
//                         </div>

//                         <div
//                           className="mt-5 flex items-center justify-between border-t pt-4"
//                           style={{
//                             borderColor:
//                               COLORS.border,
//                           }}
//                         >
//                           <span
//                             className="text-sm"
//                             style={{
//                               color:
//                                 COLORS.muted,
//                             }}
//                           >
//                             View curriculum
//                           </span>

//                           <span
//                             className="font-semibold"
//                             style={{
//                               color:
//                                 COLORS.purpleLight,
//                             }}
//                           >
//                             Open LMS
//                           </span>
//                         </div>
//                       </div>
//                     </button>
//                   );
//                 })}
//               </div>
//             )}
//           </div>
//         </div>
//       </>
//     );
//   }

//   /* =======================================================
//      CURRICULUM DETAIL
//   ======================================================= */

//   return (
//     <>
//       <style>{`
//         .admin-lms-detail-scrollbar::-webkit-scrollbar {
//           width: 7px;
//         }

//         .admin-lms-detail-scrollbar::-webkit-scrollbar-track {
//           background: transparent;
//         }

//         .admin-lms-detail-scrollbar::-webkit-scrollbar-thumb {
//           background: rgba(255,255,255,.12);
//           border-radius: 999px;
//         }

//         .admin-lms-detail-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: rgba(255,255,255,.22);
//         }

//         .admin-lms-lesson {
//           transition: background .15s ease;
//         }

//         .admin-lms-lesson:hover {
//           background: rgba(255,255,255,.025);
//         }

//         .admin-lms-section {
//           box-shadow: 0 15px 45px rgba(0,0,0,.18);
//         }

//         .admin-lms-tab {
//           transition:
//             background .2s ease,
//             color .2s ease;
//         }
//       `}</style>

//       <div
//         className="admin-lms-detail-scrollbar min-h-screen w-full overflow-y-auto text-white"
//         style={{
//           background: COLORS.bg,
//         }}
//       >
//         <div className="mx-auto max-w-[1450px] space-y-6 p-5 lg:p-7">

//           {/* TOP HEADER */}

//           <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
//             <div className="flex items-start gap-4">
//               <button
//                 type="button"
//                 onClick={() =>
//                   navigate("/admin/lms")
//                 }
//                 className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border transition hover:bg-white/10"
//                 style={{
//                   borderColor: COLORS.border,
//                   background: COLORS.panel,
//                 }}
//               >
//                 <ArrowLeft size={20} />
//               </button>

//               <div>
//                 <div
//                   className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em]"
//                   style={{
//                     color: COLORS.purpleLight,
//                   }}
//                 >
//                   <BookOpen size={15} />
//                   Admin LMS
//                 </div>

//                 <h1 className="mt-2 text-3xl font-bold lg:text-4xl">
//                   {classTitle}
//                 </h1>

//                 <p
//                   className="mt-2 text-sm"
//                   style={{
//                     color: COLORS.muted,
//                   }}
//                 >
//                   Manage and monitor the
//                   complete curriculum for
//                   this class.
//                 </p>
//               </div>
//             </div>

//             <button
//               type="button"
//               onClick={() =>
//                 uiAction(
//                   "Admin view is ready. Management actions will be connected next."
//                 )
//               }
//               className="rounded-xl border px-5 py-3 text-sm font-semibold transition hover:bg-white/10"
//               style={{
//                 borderColor:
//                   COLORS.borderStrong,
//                 color:
//                   COLORS.purpleLight,
//               }}
//             >
//               Admin View
//             </button>
//           </div>

//           {/* CLASS SUMMARY */}

//           <div
//             className="overflow-hidden rounded-3xl border"
//             style={{
//               borderColor:
//                 "rgba(155,44,255,.24)",
//               background:
//                 "linear-gradient(135deg, rgba(35,14,51,.85), rgba(15,17,25,.95))",
//             }}
//           >
//             <div className="flex flex-col gap-6 p-5 lg:flex-row lg:items-center lg:p-6">

//               {/* IMAGE */}

//               <div
//                 className="h-32 w-full shrink-0 overflow-hidden rounded-2xl lg:w-56"
//                 style={{
//                   background:
//                     "linear-gradient(135deg,#2A123D,#11131C)",
//                 }}
//               >
//                 {course?.image ||
//                 course?.thumbnail ||
//                 course?.banner_image ||
//                 course?.class_image ? (
//                   <img
//                     src={
//                       course?.image ||
//                       course?.thumbnail ||
//                       course?.banner_image ||
//                       course?.class_image
//                     }
//                     alt={classTitle}
//                     className="h-full w-full object-cover"
//                   />
//                 ) : (
//                   <div className="flex h-full w-full items-center justify-center">
//                     <BookOpen
//                       size={50}
//                       color={
//                         COLORS.purpleLight
//                       }
//                     />
//                   </div>
//                 )}
//               </div>

//               {/* DETAILS */}

//               <div className="min-w-0 flex-1">
//                 <div className="flex flex-wrap items-center gap-3">
//                   <h2 className="text-2xl font-bold">
//                     {classTitle}
//                   </h2>

//                   <StatusBadge>
//                     <CheckCircle2
//                       size={13}
//                     />
//                     Active
//                   </StatusBadge>
//                 </div>

//                 <div
//                   className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm"
//                   style={{
//                     color: COLORS.muted,
//                   }}
//                 >
//                   <span>
//                     Category:{" "}
//                     <strong className="text-white">
//                       {course?.category_name ||
//                         course?.category ||
//                         "Not available"}
//                     </strong>
//                   </span>

//                   <span className="opacity-30">
//                     |
//                   </span>

//                   <span>
//                     Subcategory:{" "}
//                     <strong className="text-white">
//                       {course?.subcategory_name ||
//                         course?.subcategory ||
//                         "Not available"}
//                     </strong>
//                   </span>
//                 </div>

//                 <div
//                   className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm"
//                   style={{
//                     color: COLORS.muted,
//                   }}
//                 >
//                   <span>
//                     Total Sections:{" "}
//                     <strong className="text-white">
//                       {sections.length}
//                     </strong>
//                   </span>

//                   <span>
//                     Total Lessons:{" "}
//                     <strong className="text-white">
//                       {totalLessons}
//                     </strong>
//                   </span>

//                   <span>
//                     Students Enrolled:{" "}
//                     <strong className="text-white">
//                       {studentCount}
//                     </strong>
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* STATS */}

//           <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
//             <StatCard
//               icon={<BookOpen size={20} />}
//               label="Sections"
//               value={sections.length}
//             />

//             <StatCard
//               icon={<FileText size={20} />}
//               label="Lessons"
//               value={totalLessons}
//             />

//             <StatCard
//               icon={<CheckCircle2 size={20} />}
//               label="Published Lessons"
//               value={publishedLessons}
//             />

//             <StatCard
//               icon={<Users size={20} />}
//               label="Students"
//               value={studentCount}
//             />
//           </div>

//           {/* TABS + ADD SECTION */}

//           <div className="flex flex-col gap-4 border-b pb-4 lg:flex-row lg:items-center lg:justify-between"
//             style={{
//               borderColor: COLORS.border,
//             }}
//           >
//             <div className="flex flex-wrap gap-2">
//               {[
//                 {
//                   key: "content",
//                   label: "Content",
//                   icon: <BookOpen size={17} />,
//                 },
//                 {
//                   key: "students",
//                   label: "Students",
//                   icon: <Users size={17} />,
//                 },
//                 {
//                   key: "progress",
//                   label: "Progress",
//                   icon: <BarChart3 size={17} />,
//                 },
//                 {
//                   key: "analytics",
//                   label: "Analytics",
//                   icon: <BarChart3 size={17} />,
//                 },
//               ].map((tab) => {
//                 const active =
//                   activeTab === tab.key;

//                 return (
//                   <button
//                     key={tab.key}
//                     type="button"
//                     onClick={() => {
//                       setActiveTab(tab.key);

//                       if (
//                         tab.key !== "content"
//                       ) {
//                         uiAction(
//                           `${tab.label} UI is ready for the next implementation step.`
//                         );
//                       }
//                     }}
//                     className="admin-lms-tab flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold"
//                     style={{
//                       background: active
//                         ? "linear-gradient(135deg, rgba(155,44,255,.28), rgba(255,42,174,.18))"
//                         : "transparent",
//                       color: active
//                         ? COLORS.purpleLight
//                         : "#D5D0DE",
//                       border: active
//                         ? "1px solid rgba(155,44,255,.30)"
//                         : "1px solid transparent",
//                     }}
//                   >
//                     {tab.icon}
//                     {tab.label}
//                   </button>
//                 );
//               })}
//             </div>

//             <button
//               type="button"
//               onClick={() =>
//                 uiAction(
//                   "Add Section UI is ready. CRUD will be connected next."
//                 )
//               }
//               className="flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white"
//               style={{
//                 background:
//                   "linear-gradient(135deg,#9B2CFF,#FF2AAE)",
//                 boxShadow:
//                   "0 10px 30px rgba(155,44,255,.20)",
//               }}
//             >
//               <Plus size={18} />
//               Add Section
//             </button>
//           </div>

//           {/* NON-CONTENT TABS */}

//           {activeTab !== "content" ? (
//             <div
//               className="rounded-3xl border p-16 text-center"
//               style={{
//                 borderColor: COLORS.border,
//                 background: COLORS.panel,
//               }}
//             >
//               {activeTab === "students" ? (
//                 <Users
//                   className="mx-auto"
//                   size={52}
//                   color={COLORS.purpleLight}
//                 />
//               ) : activeTab ===
//                 "progress" ? (
//                 <BarChart3
//                   className="mx-auto"
//                   size={52}
//                   color={COLORS.purpleLight}
//                 />
//               ) : (
//                 <BarChart3
//                   className="mx-auto"
//                   size={52}
//                   color={COLORS.purpleLight}
//                 />
//               )}

//               <h2 className="mt-5 text-xl font-bold">
//                 {activeTab === "students"
//                   ? "Students"
//                   : activeTab ===
//                     "progress"
//                   ? "Learning Progress"
//                   : "Analytics"}
//               </h2>

//               <p
//                 className="mx-auto mt-2 max-w-xl text-sm leading-6"
//                 style={{
//                   color: COLORS.muted,
//                 }}
//               >
//                 The {activeTab} section
//                 will use the same Admin LMS
//                 design and will be connected
//                 to the backend after the UI
//                 implementation.
//               </p>
//             </div>
//           ) : loading ? (
//             <div
//               className="rounded-3xl border p-20 text-center"
//               style={{
//                 borderColor: COLORS.border,
//                 background: COLORS.panel,
//               }}
//             >
//               <Loader2
//                 className="mx-auto animate-spin"
//                 size={38}
//                 color={COLORS.purpleLight}
//               />

//               <p
//                 className="mt-4 text-sm"
//                 style={{
//                   color: COLORS.muted,
//                 }}
//               >
//                 Loading curriculum...
//               </p>
//             </div>
//           ) : sections.length === 0 ? (
//             <div
//               className="rounded-3xl border p-20 text-center"
//               style={{
//                 borderColor: COLORS.border,
//                 background: COLORS.panel,
//               }}
//             >
//               <BookOpen
//                 className="mx-auto"
//                 size={55}
//                 color={COLORS.purpleLight}
//               />

//               <h2 className="mt-5 text-2xl font-bold">
//                 No curriculum found
//               </h2>

//               <p
//                 className="mx-auto mt-2 max-w-xl text-sm leading-6"
//                 style={{
//                   color: COLORS.muted,
//                 }}
//               >
//                 This class does not
//                 currently have any LMS
//                 sections or lessons.
//               </p>

//               <button
//                 type="button"
//                 onClick={() =>
//                   uiAction(
//                     "Add Section UI is ready."
//                   )
//                 }
//                 className="mx-auto mt-6 flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold"
//                 style={{
//                   background:
//                     "linear-gradient(135deg,#9B2CFF,#FF2AAE)",
//                 }}
//               >
//                 <Plus size={18} />
//                 Add First Section
//               </button>
//             </div>
//           ) : (
//             /* =================================================
//                SECTIONS
//             ================================================= */

//             <div className="space-y-5">
//               {sections.map(
//                 (section, sectionIndex) => {
//                   const sectionId =
//                     section?.id ??
//                     `section-${sectionIndex}`;

//                   const isOpen =
//                     openSections[
//                       sectionId
//                     ] !== false;

//                   const lessons =
//                     section?.lessons || [];

//                   const sectionState =
//                     getSectionPublishState(
//                       section
//                     );

//                   return (
//                     <div
//                       key={sectionId}
//                       className="admin-lms-section overflow-hidden rounded-2xl border"
//                       style={{
//                         borderColor:
//                           COLORS.border,
//                         background:
//                           COLORS.panel,
//                       }}
//                     >
//                       {/* SECTION HEADER */}

//                       <div
//                         className="flex flex-col gap-4 px-5 py-4 lg:flex-row lg:items-center lg:justify-between"
//                         style={{
//                           background:
//                             "linear-gradient(90deg, rgba(255,255,255,.035), rgba(255,255,255,.012))",
//                         }}
//                       >
//                         <div className="flex min-w-0 items-center gap-3">
//                           <button
//                             type="button"
//                             onClick={() =>
//                               toggleSection(
//                                 sectionId
//                               )
//                             }
//                             className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition hover:bg-white/10"
//                           >
//                             {isOpen ? (
//                               <ChevronDown
//                                 size={19}
//                               />
//                             ) : (
//                               <ChevronRight
//                                 size={19}
//                               />
//                             )}
//                           </button>

//                           <div className="min-w-0">
//                             <div className="flex flex-wrap items-center gap-3">
//                               <h3 className="truncate text-lg font-bold">
//                                 Section{" "}
//                                 {sectionIndex +
//                                   1}
//                                 :{" "}
//                                 {section?.title ||
//                                   section?.name ||
//                                   "Untitled Section"}
//                               </h3>

//                               <span
//                                 className="rounded-full px-2.5 py-1 text-[10px] font-semibold"
//                                 style={{
//                                   background:
//                                     sectionState.background,
//                                   color:
//                                     sectionState.color,
//                                 }}
//                               >
//                                 {
//                                   sectionState.label
//                                 }
//                               </span>
//                             </div>

//                             <div
//                               className="mt-1 flex flex-wrap items-center gap-3 text-xs"
//                               style={{
//                                 color:
//                                   COLORS.muted,
//                               }}
//                             >
//                               <span>
//                                 {lessons.length}{" "}
//                                 {lessons.length ===
//                                 1
//                                   ? "lesson"
//                                   : "lessons"}
//                               </span>

//                               {section?.description && (
//                                 <>
//                                   <span className="opacity-30">
//                                     |
//                                   </span>

//                                   <span>
//                                     {
//                                       section.description
//                                     }
//                                   </span>
//                                 </>
//                               )}
//                             </div>
//                           </div>
//                         </div>

//                         <div className="flex items-center gap-1 self-end lg:self-auto">
//                           <ActionButton
//                             icon={
//                               <Pencil
//                                 size={17}
//                               />
//                             }
//                             label="Edit section"
//                             onClick={() =>
//                               uiAction(
//                                 "Edit Section UI is ready."
//                               )
//                             }
//                           />

//                           <ActionButton
//                             icon={
//                               <Trash2
//                                 size={17}
//                               />
//                             }
//                             label="Delete section"
//                             danger
//                             onClick={() =>
//                               uiAction(
//                                 "Delete Section UI is ready."
//                               )
//                             }
//                           />

//                           <button
//                             type="button"
//                             onClick={() =>
//                               uiAction(
//                                 "Add Lesson UI is ready."
//                               )
//                             }
//                             className="ml-2 flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition hover:bg-white/10"
//                             style={{
//                               borderColor:
//                                 COLORS.borderStrong,
//                               color:
//                                 COLORS.purpleLight,
//                             }}
//                           >
//                             <Plus
//                               size={16}
//                             />
//                             Add Lesson
//                           </button>
//                         </div>
//                       </div>

//                       {/* LESSONS */}

//                       {isOpen && (
//                         <div
//                           className="border-t"
//                           style={{
//                             borderColor:
//                               COLORS.border,
//                           }}
//                         >
//                           {lessons.length ===
//                           0 ? (
//                             <div
//                               className="px-6 py-10 text-center"
//                               style={{
//                                 color:
//                                   COLORS.muted,
//                               }}
//                             >
//                               <FileText
//                                 className="mx-auto opacity-50"
//                                 size={30}
//                               />

//                               <p className="mt-3 text-sm">
//                                 No lessons in
//                                 this section.
//                               </p>
//                             </div>
//                           ) : (
//                             lessons.map(
//                               (
//                                 lesson,
//                                 lessonIndex
//                               ) => {
//                                 const publishState =
//                                   getPublishState(
//                                     lesson
//                                   );

//                                 const lessonTitle =
//                                   lesson?.title ||
//                                   lesson?.name ||
//                                   lesson?.lesson_name ||
//                                   `Lesson ${
//                                     lessonIndex +
//                                     1
//                                   }`;

//                                 const description =
//                                   lesson?.description ||
//                                   lesson?.short_description ||
//                                   lesson?.summary ||
//                                   "";

//                                 return (
//                                   <div
//                                     key={
//                                       lesson?.id ??
//                                       `${sectionId}-${lessonIndex}`
//                                     }
//                                     className="admin-lms-lesson grid items-center gap-4 border-b px-5 py-4 last:border-b-0 lg:grid-cols-[35px_minmax(260px,1fr)_120px_90px_110px_120px]"
//                                     style={{
//                                       borderColor:
//                                         COLORS.border,
//                                     }}
//                                   >
//                                     {/* DRAG HANDLE */}

//                                     <div
//                                       className="hidden lg:flex items-center justify-center"
//                                       style={{
//                                         color:
//                                           "#777281",
//                                       }}
//                                     >
//                                       <GripVertical
//                                         size={20}
//                                       />
//                                     </div>

//                                     {/* LESSON */}

//                                     <div className="flex min-w-0 items-center gap-3">
//                                       <div
//                                         className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg"
//                                         style={{
//                                           background:
//                                             "rgba(255,255,255,.06)",
//                                           color:
//                                             COLORS.purpleLight,
//                                         }}
//                                       >
//                                         {lesson?.thumbnail ||
//                                         lesson?.image ? (
//                                           <img
//                                             src={
//                                               lesson?.thumbnail ||
//                                               lesson?.image
//                                             }
//                                             alt=""
//                                             className="h-full w-full object-cover"
//                                           />
//                                         ) : (
//                                           getLessonIcon(
//                                             lesson?.lesson_type ||
//                                               lesson?.type
//                                           )
//                                         )}
//                                       </div>

//                                       <div className="min-w-0">
//                                         <h4 className="truncate text-sm font-bold">
//                                           {
//                                             lessonTitle
//                                           }
//                                         </h4>

//                                         {description && (
//                                           <p
//                                             className="mt-1 truncate text-xs"
//                                             style={{
//                                               color:
//                                                 COLORS.muted,
//                                             }}
//                                           >
//                                             {
//                                               description
//                                             }
//                                           </p>
//                                         )}

//                                         <div className="mt-2 flex items-center gap-2 lg:hidden">
//                                           <LessonTypeBadge
//                                             type={
//                                               lesson?.lesson_type ||
//                                               lesson?.type
//                                             }
//                                           />

//                                           <span
//                                             className="text-xs"
//                                             style={{
//                                               color:
//                                                 COLORS.muted,
//                                             }}
//                                           >
//                                             {getLessonDuration(
//                                               lesson
//                                             )}
//                                           </span>
//                                         </div>
//                                       </div>
//                                     </div>

//                                     {/* TYPE */}

//                                     <div className="hidden lg:block">
//                                       <LessonTypeBadge
//                                         type={
//                                           lesson?.lesson_type ||
//                                           lesson?.type
//                                         }
//                                       />
//                                     </div>

//                                     {/* DURATION */}

//                                     <div
//                                       className="hidden items-center gap-1.5 text-sm lg:flex"
//                                       style={{
//                                         color:
//                                           COLORS.muted,
//                                       }}
//                                     >
//                                       <Clock3
//                                         size={14}
//                                       />

//                                       {getLessonDuration(
//                                         lesson
//                                       )}
//                                     </div>

//                                     {/* STATUS */}

//                                     <div className="hidden lg:block">
//                                       <span
//                                         className="inline-flex items-center justify-center rounded-full px-3 py-1.5 text-xs font-semibold"
//                                         style={{
//                                           background:
//                                             publishState.background,
//                                           color:
//                                             publishState.color,
//                                         }}
//                                       >
//                                         {
//                                           publishState.label
//                                         }
//                                       </span>
//                                     </div>

//                                     {/* ACTIONS */}

//                                     <div className="flex items-center justify-end gap-1">
//                                       <ActionButton
//                                         icon={
//                                           <Eye
//                                             size={17}
//                                           />
//                                         }
//                                         label="Preview lesson"
//                                         onClick={() =>
//                                           uiAction(
//                                             "Preview Lesson UI is ready."
//                                           )
//                                         }
//                                       />

//                                       <ActionButton
//                                         icon={
//                                           <Pencil
//                                             size={17}
//                                           />
//                                         }
//                                         label="Edit lesson"
//                                         onClick={() =>
//                                           uiAction(
//                                             "Edit Lesson UI is ready."
//                                           )
//                                         }
//                                       />

//                                       <ActionButton
//                                         icon={
//                                           <Trash2
//                                             size={17}
//                                           />
//                                         }
//                                         label="Delete lesson"
//                                         danger
//                                         onClick={() =>
//                                           uiAction(
//                                             "Delete Lesson UI is ready."
//                                           )
//                                         }
//                                       />
//                                     </div>
//                                   </div>
//                                 );
//                               }
//                             )
//                           )}
//                         </div>
//                       )}
//                     </div>
//                   );
//                 }
//               )}
//             </div>
//           )}

//           {/* FOOTER INFO */}

//           {activeTab === "content" &&
//             sections.length > 0 && (
//               <div
//                 className="flex flex-col gap-3 rounded-2xl border p-5 sm:flex-row sm:items-center sm:justify-between"
//                 style={{
//                   borderColor: COLORS.border,
//                   background:
//                     "rgba(255,255,255,.018)",
//                 }}
//               >
//                 <div className="flex items-center gap-3">
//                   <CalendarDays
//                     size={18}
//                     color={COLORS.purpleLight}
//                   />

//                   <div>
//                     <div className="text-sm font-semibold">
//                       Curriculum overview
//                     </div>

//                     <div
//                       className="mt-1 text-xs"
//                       style={{
//                         color: COLORS.muted,
//                       }}
//                     >
//                       {publishedSections} of{" "}
//                       {sections.length} sections
//                       published ·{" "}
//                       {publishedLessons} of{" "}
//                       {totalLessons} lessons
//                       published
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-2 text-xs">
//                   <span
//                     className="h-2 w-2 rounded-full"
//                     style={{
//                       background:
//                         COLORS.success,
//                     }}
//                   />

//                   <span
//                     style={{
//                       color: COLORS.muted,
//                     }}
//                   >
//                     Published
//                   </span>
//                 </div>
//               </div>
//             )}
//         </div>
//       </div>
//     </>
//   );
// }


// import { useEffect, useMemo, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import toast from "react-hot-toast";

// import {
//   ArrowLeft,
//   BookOpen,
//   ChevronDown,
//   ChevronRight,
//   ExternalLink,
//   FileText,
//   GripVertical,
//   Loader2,
//   Radio,
//   Users,
//   BarChart3,
//   Pencil,
//   Trash2,
//   Plus,
//   Eye,
//   Video,
//   CheckCircle2,
//   Clock3,
//   CalendarDays,
//   Save,
//   X,
// } from "lucide-react";

// import API from "../services/api";

// /* =========================================================
//    COLORS
// ========================================================= */

// const COLORS = {
//   bg: "#07080D",
//   panel: "#10121A",
//   panel2: "#15121F",
//   panel3: "#191523",
//   border: "rgba(255,255,255,.10)",
//   borderStrong: "rgba(180,70,255,.35)",

//   purple: "#9B2CFF",
//   pink: "#FF2AAE",
//   purpleLight: "#C58BFF",

//   text: "#FFFFFF",
//   muted: "#AAA5B8",

//   success: "#18D89D",
//   successBg: "rgba(24,216,157,.12)",

//   blue: "#4CA8FF",
//   blueBg: "rgba(76,168,255,.13)",

//   orange: "#FFB84D",
//   orangeBg: "rgba(255,184,77,.13)",

//   red: "#FF5C6C",
//   redBg: "rgba(255,92,108,.12)",
// };

// /* =========================================================
//    EMPTY FORMS
// ========================================================= */

// const EMPTY_SECTION = {
//   title: "",
//   description: "",
//   sort_order: 0,
//   is_published: 0,
// };

// const EMPTY_LESSON = {
//   title: "",
//   description: "",
//   lesson_type: "YOUTUBE",
//   youtube_url: "",
//   content: "",
//   resource_url: "",
//   duration_minutes: "",
//   is_preview: 0,
//   sort_order: 0,
//   is_published: 0,
// };

// /* =========================================================
//    HELPERS
// ========================================================= */

// const normalizeArray = (value) => {
//   if (Array.isArray(value)) return value;

//   if (Array.isArray(value?.data)) {
//     return value.data;
//   }

//   if (Array.isArray(value?.rows)) {
//     return value.rows;
//   }

//   return [];
// };

// const normalizeClasses = (payload) => {
//   const root = payload?.data ?? payload ?? {};

//   const candidates =
//     root?.classes ??
//     root?.data?.classes ??
//     root?.rows ??
//     root?.data ??
//     root;

//   return normalizeArray(candidates);
// };

// const normalizeCurriculum = (payload) => {
//   const root = payload?.data ?? payload ?? {};

//   const course =
//     root?.course ??
//     root?.class ??
//     root?.data?.course ??
//     root?.data?.class ??
//     null;

//   const sections = normalizeArray(
//     root?.sections ??
//       root?.curriculum ??
//       root?.data?.sections ??
//       root?.data?.curriculum
//   );

//   return {
//     course,
//     sections: sections.map((section) => ({
//       ...section,
//       lessons: normalizeArray(
//         section?.lessons ??
//           section?.course_lessons ??
//           section?.lms_lessons
//       ),
//     })),
//   };
// };

// const normalizeLessonType = (value) => {
//   const type = String(value || "").toUpperCase();

//   if (
//     type === "VIDEO" ||
//     type === "DIRECT_VIDEO" ||
//     type === "VID"
//   ) {
//     return "VIDEO";
//   }

//   if (type === "RECORDING") return "RECORDING";
//   if (type === "YOUTUBE") return "YOUTUBE";
//   if (type === "PDF") return "PDF";
//   if (type === "TEXT") return "TEXT";
//   if (type === "LIVE") return "LIVE";
//   if (type === "EXTERNAL") return "EXTERNAL";

//   return "YOUTUBE";
// };

// const getLessonTypeLabel = (type) => {
//   switch (normalizeLessonType(type)) {
//     case "VIDEO":
//       return "Video";

//     case "RECORDING":
//       return "Recording";

//     case "YOUTUBE":
//       return "YouTube";

//     case "PDF":
//       return "PDF";

//     case "TEXT":
//       return "Text";

//     case "LIVE":
//       return "Live";

//     case "EXTERNAL":
//       return "External";

//     default:
//       return "Lesson";
//   }
// };

// const getLessonIcon = (type) => {
//   switch (normalizeLessonType(type)) {
//     case "VIDEO":
//     case "RECORDING":
//     case "YOUTUBE":
//       return <Video size={15} />;

//     case "PDF":
//     case "TEXT":
//       return <FileText size={15} />;

//     case "LIVE":
//       return <Radio size={15} />;

//     case "EXTERNAL":
//       return <ExternalLink size={15} />;

//     default:
//       return <BookOpen size={15} />;
//   }
// };

// const getLessonTypeStyle = (type) => {
//   switch (normalizeLessonType(type)) {
//     case "VIDEO":
//     case "RECORDING":
//     case "YOUTUBE":
//       return {
//         background: "rgba(255,55,90,.12)",
//         color: "#FF5570",
//       };

//     case "TEXT":
//       return {
//         background: "rgba(67,145,255,.13)",
//         color: "#65A9FF",
//       };

//     case "PDF":
//       return {
//         background: "rgba(155,44,255,.14)",
//         color: "#C27BFF",
//       };

//     case "LIVE":
//       return {
//         background: "rgba(155,44,255,.16)",
//         color: "#C27BFF",
//       };

//     case "EXTERNAL":
//       return {
//         background: "rgba(40,150,255,.12)",
//         color: "#63B2FF",
//       };

//     default:
//       return {
//         background: "rgba(255,255,255,.08)",
//         color: COLORS.muted,
//       };
//   }
// };

// const getLessonDuration = (lesson) => {
//   const value =
//     lesson?.duration ??
//     lesson?.duration_minutes ??
//     lesson?.minutes ??
//     null;

//   if (
//     value === null ||
//     value === undefined ||
//     value === ""
//   ) {
//     return "-";
//   }

//   const number = Number(value);

//   if (!Number.isNaN(number)) {
//     return `${number} min`;
//   }

//   return String(value);
// };

// const getPublishState = (lesson) => {
//   if (Number(lesson?.is_published) === 1) {
//     return {
//       label: "Published",
//       background: COLORS.successBg,
//       color: COLORS.success,
//     };
//   }

//   if (
//     String(lesson?.status || "").toUpperCase() ===
//     "SCHEDULED"
//   ) {
//     return {
//       label: "Scheduled",
//       background: COLORS.blueBg,
//       color: COLORS.blue,
//     };
//   }

//   return {
//     label: "Draft",
//     background: "rgba(255,255,255,.07)",
//     color: "#A8A4B2",
//   };
// };

// const getSectionPublishState = (section) => {
//   if (Number(section?.is_published) === 1) {
//     return {
//       label: "Published",
//       background: COLORS.successBg,
//       color: COLORS.success,
//     };
//   }

//   return {
//     label: "Draft",
//     background: "rgba(255,255,255,.07)",
//     color: "#A8A4B2",
//   };
// };

// const getAdminConfig = () => {
//   const adminToken = localStorage.getItem("adminToken");

//   return {
//     headers: adminToken
//       ? {
//           Authorization: `Bearer ${adminToken}`,
//         }
//       : {},
//   };
// };

// /* =========================================================
//    SMALL UI COMPONENTS
// ========================================================= */

// function StatusBadge({ children, type = "success" }) {
//   const styles =
//     type === "success"
//       ? {
//           background: COLORS.successBg,
//           color: COLORS.success,
//         }
//       : type === "blue"
//       ? {
//           background: COLORS.blueBg,
//           color: COLORS.blue,
//         }
//       : {
//           background: "rgba(255,255,255,.07)",
//           color: COLORS.muted,
//         };

//   return (
//     <span
//       className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold"
//       style={styles}
//     >
//       {children}
//     </span>
//   );
// }

// function LessonTypeBadge({ type }) {
//   const style = getLessonTypeStyle(type);

//   return (
//     <span
//       className="inline-flex min-w-[86px] items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold"
//       style={style}
//     >
//       {getLessonIcon(type)}
//       {getLessonTypeLabel(type)}
//     </span>
//   );
// }

// function ActionButton({
//   icon,
//   label,
//   onClick,
//   danger = false,
// }) {
//   return (
//     <button
//       type="button"
//       title={label}
//       aria-label={label}
//       onClick={onClick}
//       className="flex h-9 w-9 items-center justify-center rounded-lg transition hover:bg-white/10"
//       style={{
//         color: danger ? COLORS.red : "#D9D4E4",
//       }}
//     >
//       {icon}
//     </button>
//   );
// }

// function StatCard({ icon, label, value }) {
//   return (
//     <div
//       className="rounded-2xl border p-5"
//       style={{
//         borderColor: COLORS.border,
//         background:
//           "linear-gradient(145deg, rgba(155,44,255,.08), rgba(255,255,255,.015))",
//       }}
//     >
//       <div
//         className="text-xs font-medium uppercase tracking-[0.14em]"
//         style={{ color: COLORS.muted }}
//       >
//         {label}
//       </div>

//       <div className="mt-3 flex items-end justify-between">
//         <div className="text-3xl font-bold">{value}</div>

//         <div
//           className="flex h-10 w-10 items-center justify-center rounded-xl"
//           style={{
//             background:
//               "linear-gradient(135deg, rgba(155,44,255,.18), rgba(255,42,174,.12))",
//             color: COLORS.purpleLight,
//           }}
//         >
//           {icon}
//         </div>
//       </div>
//     </div>
//   );
// }

// function InputStyles() {
//   return (
//     <style>{`
//       .admin-lms-input {
//         width: 100%;
//         border-radius: 0.75rem;
//         border: 1px solid rgba(255,255,255,.10);
//         background: #181820;
//         padding: 0.75rem 1rem;
//         color: #fff;
//         outline: none;
//         transition: border-color .2s ease, box-shadow .2s ease, background .2s ease;
//       }

//       .admin-lms-input::placeholder {
//         color: #666171;
//       }

//       .admin-lms-input:focus {
//         border-color: rgba(155,44,255,.8);
//         box-shadow: 0 0 0 3px rgba(155,44,255,.14);
//         background: #1a1a23;
//       }

//       .admin-lms-input option {
//         background: #181820;
//         color: #fff;
//       }
//     `}</style>
//   );
// }

// function Field({
//   label,
//   required = false,
//   optional = false,
//   children,
// }) {
//   return (
//     <label className="block text-sm">
//       <span className="mb-2 block font-medium text-gray-200">
//         {label}

//         {required && (
//           <span className="ml-1 text-pink-400">*</span>
//         )}

//         {optional && (
//           <span className="ml-1 text-xs font-normal text-gray-500">
//             (Optional)
//           </span>
//         )}
//       </span>

//       {children}
//     </label>
//   );
// }

// function Toggle({
//   label,
//   helper,
//   checked,
//   onChange,
// }) {
//   return (
//     <div className="flex min-h-[64px] items-center justify-between gap-4 rounded-xl border border-white/10 bg-[#181820] px-4 py-3 transition hover:border-purple-500/40">
//       <div className="min-w-0">
//         <p className="text-sm font-medium text-white">
//           {label}
//         </p>

//         {helper && (
//           <p className="mt-1 text-xs text-gray-500">
//             {helper}
//           </p>
//         )}
//       </div>

//       <button
//         type="button"
//         role="switch"
//         aria-checked={checked}
//         onClick={() => onChange(!checked)}
//         className={`relative h-6 w-11 shrink-0 rounded-full transition ${
//           checked ? "bg-purple-500" : "bg-white/10"
//         }`}
//       >
//         <span
//           className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition ${
//             checked ? "left-6" : "left-1"
//           }`}
//         />
//       </button>
//     </div>
//   );
// }

// function Modal({
//   title,
//   subtitle,
//   onClose,
//   children,
//   wide = false,
//   closeDisabled = false,
// }) {
//   return (
//     <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
//       <div
//         className={`w-full ${
//           wide ? "max-w-3xl" : "max-w-xl"
//         } max-h-[92vh] overflow-hidden rounded-2xl border shadow-[0_25px_80px_rgba(0,0,0,0.65)]`}
//         style={{
//           borderColor: COLORS.border,
//           background: COLORS.panel,
//         }}
//       >
//         <div
//           className="flex items-center justify-between border-b px-6 py-5"
//           style={{ borderColor: COLORS.border }}
//         >
//           <div className="min-w-0">
//             <h2 className="text-xl font-semibold text-white">
//               {title}
//             </h2>

//             {subtitle && (
//               <p className="mt-1 text-sm text-gray-500">
//                 {subtitle}
//               </p>
//             )}
//           </div>

//           <button
//             type="button"
//             onClick={onClose}
//             disabled={closeDisabled}
//             className="ml-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
//             title="Close"
//           >
//             <X size={20} />
//           </button>
//         </div>

//         <div className="max-h-[calc(92vh-80px)] overflow-y-auto px-6 py-6">
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// }

// function ModalActions({
//   saving,
//   onCancel,
//   submitLabel = "Save",
// }) {
//   return (
//     <div className="flex items-center justify-end gap-3 border-t border-white/10 pt-5">
//       <button
//         type="button"
//         onClick={onCancel}
//         disabled={saving}
//         className="rounded-xl border border-white/10 px-5 py-2.5 text-sm font-medium text-gray-300 transition hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
//       >
//         Cancel
//       </button>

//       <button
//         type="submit"
//         disabled={saving}
//         className="inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
//         style={{
//           background: `linear-gradient(135deg, ${COLORS.purple}, ${COLORS.pink})`,
//         }}
//       >
//         {saving ? (
//           <Loader2 size={16} className="animate-spin" />
//         ) : (
//           <Save size={16} />
//         )}

//         {saving ? "Saving..." : submitLabel}
//       </button>
//     </div>
//   );
// }

// /* =========================================================
//    CONFIRM MODAL
// ========================================================= */

// function ConfirmModal({
//   title,
//   message,
//   confirmLabel = "Delete",
//   danger = true,
//   loading = false,
//   onCancel,
//   onConfirm,
// }) {
//   return (
//     <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
//       <div
//         className="w-full max-w-md overflow-hidden rounded-2xl border shadow-[0_25px_80px_rgba(0,0,0,.65)]"
//         style={{
//           background: COLORS.panel,
//           borderColor: COLORS.border,
//         }}
//       >
//         <div className="p-6">
//           <div
//             className="mx-auto flex h-12 w-12 items-center justify-center rounded-full"
//             style={{
//               background: danger
//                 ? COLORS.redBg
//                 : "rgba(155,44,255,.12)",
//               color: danger
//                 ? COLORS.red
//                 : COLORS.purpleLight,
//             }}
//           >
//             <Trash2 size={22} />
//           </div>

//           <h3 className="mt-5 text-center text-xl font-bold">
//             {title}
//           </h3>

//           <p
//             className="mt-2 text-center text-sm leading-6"
//             style={{ color: COLORS.muted }}
//           >
//             {message}
//           </p>

//           <div className="mt-6 flex justify-end gap-3">
//             <button
//               type="button"
//               disabled={loading}
//               onClick={onCancel}
//               className="rounded-xl border border-white/10 px-5 py-2.5 text-sm font-medium text-gray-300 transition hover:bg-white/5 hover:text-white disabled:opacity-50"
//             >
//               Cancel
//             </button>

//             <button
//               type="button"
//               disabled={loading}
//               onClick={onConfirm}
//               className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
//               style={{
//                 background: danger
//                   ? COLORS.red
//                   : `linear-gradient(135deg, ${COLORS.purple}, ${COLORS.pink})`,
//               }}
//             >
//               {loading && (
//                 <Loader2
//                   size={16}
//                   className="animate-spin"
//                 />
//               )}

//               {loading ? "Deleting..." : confirmLabel}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* =========================================================
//    PREVIEW MODAL
// ========================================================= */

// function PreviewModal({ lesson, onClose }) {
//   if (!lesson) return null;

//   const type = normalizeLessonType(
//     lesson.lesson_type || lesson.type
//   );

//   const youtubeUrl =
//     lesson.youtube_url ||
//     lesson.Video_url ||
//     lesson.video_url ||
//     "";

//   const resourceUrl =
//     lesson.resource_url ||
//     lesson.url ||
//     "";

//   const content = lesson.content || "";

//   return (
//     <div className="fixed inset-0 z-[115] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
//       <div
//         className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border"
//         style={{
//           background: COLORS.panel,
//           borderColor: COLORS.border,
//         }}
//       >
//         <div
//           className="flex items-center justify-between border-b px-6 py-5"
//           style={{ borderColor: COLORS.border }}
//         >
//           <div className="min-w-0">
//             <div className="flex items-center gap-3">
//               <h2 className="truncate text-xl font-bold">
//                 {lesson.title || "Lesson Preview"}
//               </h2>

//               <LessonTypeBadge type={type} />
//             </div>

//             {lesson.description && (
//               <p
//                 className="mt-2 text-sm"
//                 style={{ color: COLORS.muted }}
//               >
//                 {lesson.description}
//               </p>
//             )}
//           </div>

//           <button
//             type="button"
//             onClick={onClose}
//             className="ml-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-white/10 hover:text-white"
//           >
//             <X size={20} />
//           </button>
//         </div>

//         <div className="overflow-y-auto p-6">
//           {type === "YOUTUBE" && youtubeUrl ? (
//             <div className="overflow-hidden rounded-2xl bg-black">
//               <iframe
//                 src={convertYoutubeUrl(youtubeUrl)}
//                 title={lesson.title || "YouTube lesson"}
//                 className="aspect-video w-full"
//                 allowFullScreen
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               />
//             </div>
//           ) : type === "VIDEO" && resourceUrl ? (
//             <video
//               controls
//               className="max-h-[65vh] w-full rounded-2xl bg-black"
//               src={resourceUrl}
//             />
//           ) : type === "PDF" && resourceUrl ? (
//             <iframe
//               src={resourceUrl}
//               title={lesson.title || "PDF lesson"}
//               className="h-[65vh] w-full rounded-2xl border border-white/10 bg-white"
//             />
//           ) : type === "TEXT" ? (
//             <div
//               className="whitespace-pre-wrap rounded-2xl border p-6 text-sm leading-7"
//               style={{
//                 borderColor: COLORS.border,
//                 background: COLORS.panel2,
//                 color: "#E9E5F0",
//               }}
//             >
//               {content || "No lesson content available."}
//             </div>
//           ) : resourceUrl ? (
//             <div className="rounded-2xl border p-8 text-center">
//               <ExternalLink
//                 className="mx-auto"
//                 size={42}
//                 color={COLORS.purpleLight}
//               />

//               <h3 className="mt-4 text-lg font-semibold">
//                 External Resource
//               </h3>

//               <p
//                 className="mt-2 break-all text-sm"
//                 style={{ color: COLORS.muted }}
//               >
//                 {resourceUrl}
//               </p>

//               <a
//                 href={resourceUrl}
//                 target="_blank"
//                 rel="noreferrer"
//                 className="mt-5 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white"
//                 style={{
//                   background: `linear-gradient(135deg, ${COLORS.purple}, ${COLORS.pink})`,
//                 }}
//               >
//                 <ExternalLink size={16} />
//                 Open Resource
//               </a>
//             </div>
//           ) : (
//             <div className="rounded-2xl border p-12 text-center">
//               <BookOpen
//                 className="mx-auto"
//                 size={42}
//                 color={COLORS.purpleLight}
//               />

//               <p
//                 className="mt-4 text-sm"
//                 style={{ color: COLORS.muted }}
//               >
//                 No preview content is available for
//                 this lesson.
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// function convertYoutubeUrl(url) {
//   if (!url) return "";

//   try {
//     const parsed = new URL(url);

//     if (parsed.hostname.includes("youtu.be")) {
//       const id = parsed.pathname.replace("/", "");

//       return id
//         ? `https://www.youtube.com/embed/${id}`
//         : url;
//     }

//     if (parsed.hostname.includes("youtube.com")) {
//       const videoId = parsed.searchParams.get("v");

//       if (videoId) {
//         return `https://www.youtube.com/embed/${videoId}`;
//       }

//       if (parsed.pathname.includes("/embed/")) {
//         return url;
//       }

//       if (parsed.pathname.includes("/shorts/")) {
//         const id = parsed.pathname.split("/shorts/")[1];

//         return id
//           ? `https://www.youtube.com/embed/${id}`
//           : url;
//       }
//     }

//     return url;
//   } catch {
//     return url;
//   }
// }

// /* =========================================================
//    MAIN
// ========================================================= */

// export default function AdminLMS() {
//   const { classId } = useParams();
//   const navigate = useNavigate();

//   const [classes, setClasses] = useState([]);
//   const [course, setCourse] = useState(null);
//   const [sections, setSections] = useState([]);

//   const [loading, setLoading] = useState(true);
//   const [classesLoading, setClassesLoading] =
//     useState(false);
//   const [saving, setSaving] = useState(false);
//   const [deleting, setDeleting] = useState(false);

//   const [openSections, setOpenSections] =
//     useState({});

//   const [activeTab, setActiveTab] =
//     useState("content");

//   /* SECTION MODAL */

//   const [sectionModal, setSectionModal] =
//     useState(null);

//   const [sectionForm, setSectionForm] =
//     useState(EMPTY_SECTION);

//   /* LESSON MODAL */

//   const [lessonModal, setLessonModal] =
//     useState(null);

//   const [lessonForm, setLessonForm] =
//     useState(EMPTY_LESSON);

//   /* DELETE */

//   const [deleteModal, setDeleteModal] =
//     useState(null);

//   /* PREVIEW */

//   const [previewLesson, setPreviewLesson] =
//     useState(null);

//   /* =======================================================
//      CLASS TITLE
//   ======================================================= */

//   const classTitle = useMemo(() => {
//     return (
//       course?.title ||
//       course?.name ||
//       course?.class_name ||
//       "Class Curriculum"
//     );
//   }, [course]);

//   /* =======================================================
//      LOAD CLASSES
//   ======================================================= */

//   const loadClasses = async () => {
//     setClassesLoading(true);
//     setLoading(true);

//     try {
//       const response = await API.get(
//         "/lms/admin/classes",
//         getAdminConfig()
//       );

//       setClasses(
//         normalizeClasses(response?.data)
//       );
//     } catch (error) {
//       console.error(
//         "Admin LMS classes load error:",
//         error
//       );

//       toast.error(
//         error?.response?.data?.message ||
//           "Failed to load LMS classes"
//       );

//       setClasses([]);
//     } finally {
//       setClassesLoading(false);
//       setLoading(false);
//     }
//   };

//   /* =======================================================
//      LOAD CURRICULUM
//   ======================================================= */

//   const loadCurriculum = async () => {
//     if (!classId) {
//       await loadClasses();
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await API.get(
//         `/lms/admin/classes/${classId}/curriculum`,
//         getAdminConfig()
//       );

//       const normalized =
//         normalizeCurriculum(response?.data);

//       setCourse(normalized.course);
//       setSections(normalized.sections);

//       setOpenSections((previous) => {
//         const next = { ...previous };

//         normalized.sections.forEach(
//           (section, index) => {
//             if (
//               next[section.id] ===
//               undefined
//             ) {
//               next[section.id] =
//                 index === 0;
//             }
//           }
//         );

//         return next;
//       });
//     } catch (error) {
//       console.error(
//         "Admin LMS curriculum load error:",
//         error
//       );

//       toast.error(
//         error?.response?.data?.message ||
//           "Failed to load curriculum"
//       );

//       setCourse(null);
//       setSections([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* =======================================================
//      INITIAL LOAD
//   ======================================================= */

//   useEffect(() => {
//     loadCurriculum();

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [classId]);

//   /* =======================================================
//      SECTION CRUD
//   ======================================================= */

//   const createSection = () => {
//     setSectionForm({
//       ...EMPTY_SECTION,
//       sort_order: sections.length,
//     });

//     setSectionModal({
//       mode: "create",
//     });
//   };

//   const editSection = (section) => {
//     setSectionForm({
//       title: section?.title || "",
//       description: section?.description || "",
//       sort_order: section?.sort_order ?? 0,
//       is_published: Number(
//         section?.is_published
//       )
//         ? 1
//         : 0,
//     });

//     setSectionModal({
//       mode: "edit",
//       id: section.id,
//     });
//   };

//   const saveSection = async (event) => {
//     event.preventDefault();

//     if (!sectionForm.title.trim()) {
//       toast.error("Section title is required");
//       return;
//     }

//     setSaving(true);

//     try {
//       const payload = {
//         title: sectionForm.title.trim(),
//         description:
//           sectionForm.description?.trim() ||
//           null,
//         sort_order:
//           Number(sectionForm.sort_order) || 0,
//         is_published: Number(
//           sectionForm.is_published
//         )
//           ? 1
//           : 0,
//       };

//       if (sectionModal.mode === "create") {
//         await API.post(
//           `/lms/admin/classes/${classId}/sections`,
//           payload,
//           getAdminConfig()
//         );

//         toast.success("Section created");
//       } else {
//         await API.put(
//           `/lms/admin/sections/${sectionModal.id}`,
//           payload,
//           getAdminConfig()
//         );

//         toast.success("Section updated");
//       }

//       setSectionModal(null);

//       await loadCurriculum();
//     } catch (error) {
//       console.error(
//         "Admin save section error:",
//         error
//       );

//       toast.error(
//         error?.response?.data?.message ||
//           "Unable to save section"
//       );
//     } finally {
//       setSaving(false);
//     }
//   };

//   const requestDeleteSection = (section) => {
//     setDeleteModal({
//       type: "section",
//       id: section.id,
//       title: section.title,
//       message: `Delete section "${section.title}" and all lessons inside it? This action cannot be undone.`,
//     });
//   };

//   const deleteSection = async () => {
//     if (!deleteModal?.id) return;

//     setDeleting(true);

//     try {
//       await API.delete(
//         `/lms/admin/sections/${deleteModal.id}`,
//         getAdminConfig()
//       );

//       toast.success("Section deleted");

//       setDeleteModal(null);

//       await loadCurriculum();
//     } catch (error) {
//       console.error(
//         "Admin delete section error:",
//         error
//       );

//       toast.error(
//         error?.response?.data?.message ||
//           "Unable to delete section"
//       );
//     } finally {
//       setDeleting(false);
//     }
//   };

//   /* =======================================================
//      LESSON CRUD
//   ======================================================= */

//   const createLesson = (section) => {
//     setLessonForm({
//       ...EMPTY_LESSON,
//       sort_order:
//         section?.lessons?.length || 0,
//     });

//     setLessonModal({
//       mode: "create",
//       sectionId: section.id,
//     });
//   };

//   const editLesson = (section, lesson) => {
//     setLessonForm({
//       title: lesson?.title || "",
//       description:
//         lesson?.description || "",

//       lesson_type: normalizeLessonType(
//         lesson?.lesson_type ||
//           lesson?.type
//       ),

//       youtube_url:
//         lesson?.youtube_url ||
//         lesson?.Video_url ||
//         lesson?.video_url ||
//         "",

//       content: lesson?.content || "",

//       resource_url:
//         lesson?.resource_url ||
//         lesson?.url ||
//         "",

//       duration_minutes:
//         lesson?.duration_minutes ??
//         lesson?.duration ??
//         "",

//       is_preview: Number(
//         lesson?.is_preview
//       )
//         ? 1
//         : 0,

//       sort_order:
//         lesson?.sort_order ?? 0,

//       is_published: Number(
//         lesson?.is_published
//       )
//         ? 1
//         : 0,
//     });

//     setLessonModal({
//       mode: "edit",
//       id: lesson.id,
//       sectionId: section.id,
//     });
//   };

//   const saveLesson = async (event) => {
//     event.preventDefault();

//     if (!lessonForm.title.trim()) {
//       toast.error("Lesson title is required");
//       return;
//     }

//     const lessonType =
//       normalizeLessonType(
//         lessonForm.lesson_type
//       );

//     const youtubeUrl =
//       lessonForm.youtube_url?.trim() ||
//       "";

//     const resourceUrl =
//       lessonForm.resource_url?.trim() ||
//       "";

//     const textContent =
//       lessonForm.content?.trim() || "";

//     /* VALIDATION */

//     if (
//       lessonType === "YOUTUBE" &&
//       !youtubeUrl
//     ) {
//       toast.error(
//         "YouTube URL is required for a YouTube lesson."
//       );
//       return;
//     }

//     if (
//       lessonType === "VIDEO" &&
//       !resourceUrl
//     ) {
//       toast.error(
//         "Video URL is required for a Video lesson."
//       );
//       return;
//     }

//     if (
//       lessonType === "PDF" &&
//       !resourceUrl
//     ) {
//       toast.error(
//         "PDF URL is required for a PDF lesson."
//       );
//       return;
//     }

//     if (
//       lessonType === "LIVE" &&
//       !resourceUrl
//     ) {
//       toast.error(
//         "Meeting URL is required for a Live lesson."
//       );
//       return;
//     }

//     if (
//       lessonType === "EXTERNAL" &&
//       !resourceUrl
//     ) {
//       toast.error(
//         "External URL is required for an External lesson."
//       );
//       return;
//     }

//     if (
//       lessonType === "TEXT" &&
//       !textContent
//     ) {
//       toast.error(
//         "Lesson content is required for a Text lesson."
//       );
//       return;
//     }

//     setSaving(true);

//     try {
//       const payload = {
//         title: lessonForm.title.trim(),

//         description:
//           lessonForm.description?.trim() ||
//           null,

//         lesson_type: lessonType,

//         youtube_url:
//           lessonType === "YOUTUBE"
//             ? youtubeUrl
//             : null,

//         content:
//           lessonType === "TEXT"
//             ? textContent
//             : null,

//         resource_url: [
//           "VIDEO",
//           "PDF",
//           "LIVE",
//           "EXTERNAL",
//         ].includes(lessonType)
//           ? resourceUrl
//           : null,

//         duration_minutes:
//           lessonForm.duration_minutes === ""
//             ? null
//             : Number(
//                 lessonForm.duration_minutes
//               ),

//         is_preview: Number(
//           lessonForm.is_preview
//         )
//           ? 1
//           : 0,

//         sort_order:
//           Number(
//             lessonForm.sort_order
//           ) || 0,

//         is_published: Number(
//           lessonForm.is_published
//         )
//           ? 1
//           : 0,
//       };

//       if (
//         lessonModal.mode === "create"
//       ) {
//         await API.post(
//           `/lms/admin/sections/${lessonModal.sectionId}/lessons`,
//           payload,
//           getAdminConfig()
//         );

//         toast.success("Lesson created");
//       } else {
//         await API.put(
//           `/lms/admin/lessons/${lessonModal.id}`,
//           payload,
//           getAdminConfig()
//         );

//         toast.success("Lesson updated");
//       }

//       setLessonModal(null);

//       await loadCurriculum();
//     } catch (error) {
//       console.error(
//         "Admin save lesson error:",
//         error
//       );

//       toast.error(
//         error?.response?.data?.message ||
//           "Unable to save lesson"
//       );
//     } finally {
//       setSaving(false);
//     }
//   };

//   const requestDeleteLesson = (lesson) => {
//     setDeleteModal({
//       type: "lesson",
//       id: lesson.id,
//       title: lesson.title,
//       message: `Delete lesson "${lesson.title}"? This action cannot be undone.`,
//     });
//   };

//   const deleteLesson = async () => {
//     if (!deleteModal?.id) return;

//     setDeleting(true);

//     try {
//       await API.delete(
//         `/lms/admin/lessons/${deleteModal.id}`,
//         getAdminConfig()
//       );

//       toast.success("Lesson deleted");

//       setDeleteModal(null);

//       await loadCurriculum();
//     } catch (error) {
//       console.error(
//         "Admin delete lesson error:",
//         error
//       );

//       toast.error(
//         error?.response?.data?.message ||
//           "Unable to delete lesson"
//       );
//     } finally {
//       setDeleting(false);
//     }
//   };

//   /* =======================================================
//      SECTION TOGGLE
//   ======================================================= */

//   const toggleSection = (id) => {
//     setOpenSections((previous) => ({
//       ...previous,
//       [id]: !previous[id],
//     }));
//   };

//   /* =======================================================
//      STATS
//   ======================================================= */

//   const totalLessons = sections.reduce(
//     (total, section) =>
//       total +
//       (section?.lessons?.length || 0),
//     0
//   );

//   const publishedSections =
//     sections.filter(
//       (section) =>
//         Number(section?.is_published) === 1
//     ).length;

//   const publishedLessons =
//     sections.reduce(
//       (total, section) =>
//         total +
//         (section?.lessons || []).filter(
//           (lesson) =>
//             Number(
//               lesson?.is_published
//             ) === 1
//         ).length,
//       0
//     );

//   const studentCount =
//     course?.students_count ??
//     course?.students ??
//     course?.enrolled_students ??
//     0;

//   /* =======================================================
//      CLASS LIST
//   ======================================================= */

//   if (!classId) {
//     return (
//       <>
//         <InputStyles />

//         <style>{`
//           .admin-lms-scrollbar::-webkit-scrollbar {
//             width: 7px;
//           }

//           .admin-lms-scrollbar::-webkit-scrollbar-track {
//             background: transparent;
//           }

//           .admin-lms-scrollbar::-webkit-scrollbar-thumb {
//             background: rgba(255,255,255,.12);
//             border-radius: 999px;
//           }

//           .admin-lms-scrollbar::-webkit-scrollbar-thumb:hover {
//             background: rgba(255,255,255,.22);
//           }

//           .admin-lms-card {
//             transition:
//               transform .2s ease,
//               border-color .2s ease,
//               box-shadow .2s ease;
//           }

//           .admin-lms-card:hover {
//             transform: translateY(-3px);
//             border-color: rgba(155,44,255,.38) !important;
//             box-shadow:
//               0 18px 50px rgba(0,0,0,.28),
//               0 0 30px rgba(155,44,255,.08);
//           }
//         `}</style>

//         <div
//           className="admin-lms-scrollbar min-h-screen w-full overflow-y-auto text-white"
//           style={{
//             background: COLORS.bg,
//           }}
//         >
//           <div className="mx-auto max-w-[1450px] space-y-8 p-6 lg:p-8">
//             {/* HEADER */}

//             <div>
//               <div
//                 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em]"
//                 style={{
//                   color: COLORS.purpleLight,
//                 }}
//               >
//                 <BookOpen size={16} />
//                 Admin LMS
//               </div>

//               <h1 className="mt-3 text-3xl font-bold tracking-tight lg:text-4xl">
//                 Learning Management System
//               </h1>

//               <p
//                 className="mt-2 max-w-2xl text-sm leading-6"
//                 style={{
//                   color: COLORS.muted,
//                 }}
//               >
//                 Select a class to view and
//                 manage its complete LMS
//                 curriculum, sections, lessons
//                 and learning content.
//               </p>
//             </div>

//             {/* LOADING */}

//             {classesLoading ? (
//               <div
//                 className="rounded-2xl border p-20 text-center"
//                 style={{
//                   borderColor: COLORS.border,
//                   background: COLORS.panel,
//                 }}
//               >
//                 <Loader2
//                   className="mx-auto animate-spin"
//                   size={38}
//                   color={COLORS.purpleLight}
//                 />

//                 <p
//                   className="mt-4 text-sm"
//                   style={{
//                     color: COLORS.muted,
//                   }}
//                 >
//                   Loading LMS classes...
//                 </p>
//               </div>
//             ) : classes.length === 0 ? (
//               <div
//                 className="rounded-2xl border p-20 text-center"
//                 style={{
//                   borderColor: COLORS.border,
//                   background: COLORS.panel,
//                 }}
//               >
//                 <BookOpen
//                   className="mx-auto"
//                   size={48}
//                   color={COLORS.purpleLight}
//                 />

//                 <h2 className="mt-5 text-xl font-semibold">
//                   No LMS classes found
//                 </h2>

//                 <p
//                   className="mx-auto mt-2 max-w-lg text-sm leading-6"
//                   style={{
//                     color: COLORS.muted,
//                   }}
//                 >
//                   No classes are currently
//                   available in the Admin LMS.
//                 </p>
//               </div>
//             ) : (
//               <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
//                 {classes.map((item) => {
//                   const id =
//                     item?.id ??
//                     item?.class_id;

//                   const title =
//                     item?.title ||
//                     item?.name ||
//                     item?.class_name ||
//                     "Untitled Class";

//                   const image =
//                     item?.image ||
//                     item?.image_url ||
//                     item?.thumbnail ||
//                     item?.banner_image ||
//                     item?.class_image ||
//                     null;

//                   const category =
//                     item?.category_name ||
//                     item?.category ||
//                     "Not available";

//                   const subcategory =
//                     item?.subcategory_name ||
//                     item?.subcategory ||
//                     "Not available";

//                   const sectionsCount =
//                     item?.sections ??
//                     item?.section_count ??
//                     0;

//                   const lessonsCount =
//                     item?.lessons ??
//                     item?.lesson_count ??
//                     0;

//                   const students =
//                     item?.students ??
//                     item?.students_count ??
//                     item?.enrolled_students ??
//                     0;

//                   return (
//                     <button
//                       key={id}
//                       type="button"
//                       onClick={() =>
//                         navigate(
//                           `/admin/lms/${id}`
//                         )
//                       }
//                       className="admin-lms-card overflow-hidden rounded-2xl border text-left"
//                       style={{
//                         borderColor:
//                           COLORS.border,
//                         background:
//                           COLORS.panel,
//                       }}
//                     >
//                       <div
//                         className="relative h-52 w-full overflow-hidden"
//                         style={{
//                           background:
//                             "linear-gradient(135deg, #241132, #10121A)",
//                         }}
//                       >
//                         {image ? (
//                           <img
//                             src={image}
//                             alt={title}
//                             className="h-full w-full object-cover"
//                           />
//                         ) : (
//                           <div className="flex h-full w-full items-center justify-center">
//                             <BookOpen
//                               size={60}
//                               color={
//                                 COLORS.purpleLight
//                               }
//                             />
//                           </div>
//                         )}

//                         <div
//                           className="absolute inset-x-0 bottom-0 h-24"
//                           style={{
//                             background:
//                               "linear-gradient(to top, rgba(7,8,13,.9), transparent)",
//                           }}
//                         />

//                         <div className="absolute right-4 top-4">
//                           <StatusBadge>
//                             Active
//                           </StatusBadge>
//                         </div>
//                       </div>

//                       <div className="p-5">
//                         <div className="flex items-start justify-between gap-3">
//                           <div className="min-w-0">
//                             <h2 className="truncate text-lg font-bold">
//                               {title}
//                             </h2>

//                             <p
//                               className="mt-1 text-sm"
//                               style={{
//                                 color:
//                                   COLORS.muted,
//                               }}
//                             >
//                               {category}

//                               <span className="mx-2 opacity-40">
//                                 |
//                               </span>

//                               {subcategory}
//                             </p>
//                           </div>

//                           <ChevronRight
//                             size={21}
//                             color={
//                               COLORS.purpleLight
//                             }
//                           />
//                         </div>

//                         <div
//                           className="mt-5 grid grid-cols-3 gap-2 border-t pt-4"
//                           style={{
//                             borderColor:
//                               COLORS.border,
//                           }}
//                         >
//                           <div>
//                             <div
//                               className="text-xs"
//                               style={{
//                                 color:
//                                   COLORS.muted,
//                               }}
//                             >
//                               Sections
//                             </div>

//                             <div className="mt-1 font-semibold">
//                               {sectionsCount}
//                             </div>
//                           </div>

//                           <div>
//                             <div
//                               className="text-xs"
//                               style={{
//                                 color:
//                                   COLORS.muted,
//                               }}
//                             >
//                               Lessons
//                             </div>

//                             <div className="mt-1 font-semibold">
//                               {lessonsCount}
//                             </div>
//                           </div>

//                           <div>
//                             <div
//                               className="text-xs"
//                               style={{
//                                 color:
//                                   COLORS.muted,
//                               }}
//                             >
//                               Students
//                             </div>

//                             <div className="mt-1 font-semibold">
//                               {students}
//                             </div>
//                           </div>
//                         </div>

//                         <div
//                           className="mt-5 flex items-center justify-between border-t pt-4"
//                           style={{
//                             borderColor:
//                               COLORS.border,
//                           }}
//                         >
//                           <span
//                             className="text-sm"
//                             style={{
//                               color:
//                                 COLORS.muted,
//                             }}
//                           >
//                             Manage curriculum
//                           </span>

//                           <span
//                             className="font-semibold"
//                             style={{
//                               color:
//                                 COLORS.purpleLight,
//                             }}
//                           >
//                             Open LMS
//                           </span>
//                         </div>
//                       </div>
//                     </button>
//                   );
//                 })}
//               </div>
//             )}
//           </div>
//         </div>
//       </>
//     );
//   }

//   /* =======================================================
//      CURRICULUM DETAIL
//   ======================================================= */

//   return (
//     <>
//       <InputStyles />

//       <style>{`
//         .admin-lms-detail-scrollbar::-webkit-scrollbar {
//           width: 7px;
//         }

//         .admin-lms-detail-scrollbar::-webkit-scrollbar-track {
//           background: transparent;
//         }

//         .admin-lms-detail-scrollbar::-webkit-scrollbar-thumb {
//           background: rgba(255,255,255,.12);
//           border-radius: 999px;
//         }

//         .admin-lms-detail-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: rgba(255,255,255,.22);
//         }

//         .admin-lms-lesson {
//           transition: background .15s ease;
//         }

//         .admin-lms-lesson:hover {
//           background: rgba(255,255,255,.025);
//         }

//         .admin-lms-section {
//           box-shadow: 0 15px 45px rgba(0,0,0,.18);
//         }

//         .admin-lms-tab {
//           transition:
//             background .2s ease,
//             color .2s ease;
//         }
//       `}</style>

//       <div
//         className="admin-lms-detail-scrollbar min-h-screen w-full overflow-y-auto text-white"
//         style={{
//           background: COLORS.bg,
//         }}
//       >
//         <div className="mx-auto max-w-[1450px] space-y-6 p-5 lg:p-7">
//           {/* TOP HEADER */}

//           <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
//             <div className="flex min-w-0 items-start gap-4">
//               <button
//                 type="button"
//                 onClick={() =>
//                   navigate("/admin/lms")
//                 }
//                 className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border transition hover:bg-white/10"
//                 style={{
//                   borderColor: COLORS.border,
//                   background: COLORS.panel,
//                 }}
//               >
//                 <ArrowLeft size={20} />
//               </button>

//               <div className="min-w-0">
//                 <div
//                   className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em]"
//                   style={{
//                     color: COLORS.purpleLight,
//                   }}
//                 >
//                   <BookOpen size={15} />
//                   Admin LMS
//                 </div>

//                 <h1 className="mt-2 truncate text-3xl font-bold lg:text-4xl">
//                   {classTitle}
//                 </h1>

//                 <p
//                   className="mt-2 text-sm"
//                   style={{
//                     color: COLORS.muted,
//                   }}
//                 >
//                   Manage the complete
//                   curriculum for this class.
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-center gap-3">
//               <button
//                 type="button"
//                 onClick={loadCurriculum}
//                 disabled={loading}
//                 className="inline-flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition hover:bg-white/10 disabled:opacity-50"
//                 style={{
//                   borderColor: COLORS.border,
//                   color: "#D9D4E4",
//                 }}
//               >
//                 {loading ? (
//                   <Loader2
//                     size={16}
//                     className="animate-spin"
//                   />
//                 ) : (
//                   <BookOpen size={16} />
//                 )}

//                 Refresh
//               </button>

//               <button
//                 type="button"
//                 onClick={createSection}
//                 className="flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white"
//                 style={{
//                   background:
//                     "linear-gradient(135deg,#9B2CFF,#FF2AAE)",
//                   boxShadow:
//                     "0 10px 30px rgba(155,44,255,.20)",
//                 }}
//               >
//                 <Plus size={18} />
//                 Add Section
//               </button>
//             </div>
//           </div>

//           {/* CLASS SUMMARY */}

//           <div
//             className="overflow-hidden rounded-3xl border"
//             style={{
//               borderColor:
//                 "rgba(155,44,255,.24)",
//               background:
//                 "linear-gradient(135deg, rgba(35,14,51,.85), rgba(15,17,25,.95))",
//             }}
//           >
//             <div className="flex flex-col gap-6 p-5 lg:flex-row lg:items-center lg:p-6">
//               <div
//                 className="h-32 w-full shrink-0 overflow-hidden rounded-2xl lg:w-56"
//                 style={{
//                   background:
//                     "linear-gradient(135deg,#2A123D,#11131C)",
//                 }}
//               >
//                 {course?.image ||
//                 course?.image_url ||
//                 course?.thumbnail ||
//                 course?.banner_image ||
//                 course?.class_image ? (
//                   <img
//                     src={
//                       course?.image ||
//                       course?.image_url ||
//                       course?.thumbnail ||
//                       course?.banner_image ||
//                       course?.class_image
//                     }
//                     alt={classTitle}
//                     className="h-full w-full object-cover"
//                   />
//                 ) : (
//                   <div className="flex h-full w-full items-center justify-center">
//                     <BookOpen
//                       size={50}
//                       color={
//                         COLORS.purpleLight
//                       }
//                     />
//                   </div>
//                 )}
//               </div>

//               <div className="min-w-0 flex-1">
//                 <div className="flex flex-wrap items-center gap-3">
//                   <h2 className="text-2xl font-bold">
//                     {classTitle}
//                   </h2>

//                   <StatusBadge>
//                     <CheckCircle2 size={13} />
//                     Active
//                   </StatusBadge>
//                 </div>

//                 <div
//                   className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm"
//                   style={{
//                     color: COLORS.muted,
//                   }}
//                 >
//                   <span>
//                     Category:{" "}
//                     <strong className="text-white">
//                       {course?.category_name ||
//                         course?.category ||
//                         "Not available"}
//                     </strong>
//                   </span>

//                   <span className="opacity-30">
//                     |
//                   </span>

//                   <span>
//                     Subcategory:{" "}
//                     <strong className="text-white">
//                       {course?.subcategory_name ||
//                         course?.subcategory ||
//                         "Not available"}
//                     </strong>
//                   </span>
//                 </div>

//                 <div
//                   className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm"
//                   style={{
//                     color: COLORS.muted,
//                   }}
//                 >
//                   <span>
//                     Total Sections:{" "}
//                     <strong className="text-white">
//                       {sections.length}
//                     </strong>
//                   </span>

//                   <span>
//                     Total Lessons:{" "}
//                     <strong className="text-white">
//                       {totalLessons}
//                     </strong>
//                   </span>

//                   <span>
//                     Students Enrolled:{" "}
//                     <strong className="text-white">
//                       {studentCount}
//                     </strong>
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* STATS */}

//           <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
//             <StatCard
//               icon={<BookOpen size={20} />}
//               label="Sections"
//               value={sections.length}
//             />

//             <StatCard
//               icon={<FileText size={20} />}
//               label="Lessons"
//               value={totalLessons}
//             />

//             <StatCard
//               icon={<CheckCircle2 size={20} />}
//               label="Published Lessons"
//               value={publishedLessons}
//             />

//             <StatCard
//               icon={<Users size={20} />}
//               label="Students"
//               value={studentCount}
//             />
//           </div>

//           {/* TABS */}

//           <div
//             className="flex flex-col gap-4 border-b pb-4 lg:flex-row lg:items-center lg:justify-between"
//             style={{
//               borderColor: COLORS.border,
//             }}
//           >
//             <div className="flex flex-wrap gap-2">
//               {[
//                 {
//                   key: "content",
//                   label: "Content",
//                   icon: <BookOpen size={17} />,
//                 },
//                 {
//                   key: "students",
//                   label: "Students",
//                   icon: <Users size={17} />,
//                 },
//                 {
//                   key: "progress",
//                   label: "Progress",
//                   icon: <BarChart3 size={17} />,
//                 },
//                 {
//                   key: "analytics",
//                   label: "Analytics",
//                   icon: <BarChart3 size={17} />,
//                 },
//               ].map((tab) => {
//                 const active =
//                   activeTab === tab.key;

//                 return (
//                   <button
//                     key={tab.key}
//                     type="button"
//                     onClick={() =>
//                       setActiveTab(tab.key)
//                     }
//                     className="admin-lms-tab flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold"
//                     style={{
//                       background: active
//                         ? "linear-gradient(135deg, rgba(155,44,255,.28), rgba(255,42,174,.18))"
//                         : "transparent",
//                       color: active
//                         ? COLORS.purpleLight
//                         : "#D5D0DE",
//                       border: active
//                         ? "1px solid rgba(155,44,255,.30)"
//                         : "1px solid transparent",
//                     }}
//                   >
//                     {tab.icon}
//                     {tab.label}
//                   </button>
//                 );
//               })}
//             </div>

//             {activeTab === "content" && (
//               <button
//                 type="button"
//                 onClick={createSection}
//                 className="flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white"
//                 style={{
//                   background:
//                     "linear-gradient(135deg,#9B2CFF,#FF2AAE)",
//                   boxShadow:
//                     "0 10px 30px rgba(155,44,255,.20)",
//                 }}
//               >
//                 <Plus size={18} />
//                 Add Section
//               </button>
//             )}
//           </div>

//           {/* NON CONTENT TABS */}

//           {activeTab !== "content" ? (
//             <div
//               className="rounded-3xl border p-16 text-center"
//               style={{
//                 borderColor: COLORS.border,
//                 background: COLORS.panel,
//               }}
//             >
//               {activeTab === "students" ? (
//                 <Users
//                   className="mx-auto"
//                   size={52}
//                   color={COLORS.purpleLight}
//                 />
//               ) : (
//                 <BarChart3
//                   className="mx-auto"
//                   size={52}
//                   color={COLORS.purpleLight}
//                 />
//               )}

//               <h2 className="mt-5 text-xl font-bold">
//                 {activeTab === "students"
//                   ? "Students"
//                   : activeTab === "progress"
//                   ? "Learning Progress"
//                   : "Analytics"}
//               </h2>

//               <p
//                 className="mx-auto mt-2 max-w-xl text-sm leading-6"
//                 style={{
//                   color: COLORS.muted,
//                 }}
//               >
//                 The{" "}
//                 {activeTab === "students"
//                   ? "student management"
//                   : activeTab === "progress"
//                   ? "learning progress"
//                   : "analytics"}{" "}
//                 dashboard can be connected
//                 to the corresponding Admin
//                 APIs separately.
//               </p>
//             </div>
//           ) : loading ? (
//             <div
//               className="rounded-3xl border p-20 text-center"
//               style={{
//                 borderColor: COLORS.border,
//                 background: COLORS.panel,
//               }}
//             >
//               <Loader2
//                 className="mx-auto animate-spin"
//                 size={38}
//                 color={COLORS.purpleLight}
//               />

//               <p
//                 className="mt-4 text-sm"
//                 style={{
//                   color: COLORS.muted,
//                 }}
//               >
//                 Loading curriculum...
//               </p>
//             </div>
//           ) : sections.length === 0 ? (
//             <div
//               className="rounded-3xl border p-20 text-center"
//               style={{
//                 borderColor: COLORS.border,
//                 background: COLORS.panel,
//               }}
//             >
//               <BookOpen
//                 className="mx-auto"
//                 size={55}
//                 color={COLORS.purpleLight}
//               />

//               <h2 className="mt-5 text-2xl font-bold">
//                 No curriculum found
//               </h2>

//               <p
//                 className="mx-auto mt-2 max-w-xl text-sm leading-6"
//                 style={{
//                   color: COLORS.muted,
//                 }}
//               >
//                 This class does not currently
//                 have any LMS sections or
//                 lessons.
//               </p>

//               <button
//                 type="button"
//                 onClick={createSection}
//                 className="mx-auto mt-6 flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white"
//                 style={{
//                   background:
//                     "linear-gradient(135deg,#9B2CFF,#FF2AAE)",
//                 }}
//               >
//                 <Plus size={18} />
//                 Add First Section
//               </button>
//             </div>
//           ) : (
//             <div className="space-y-5">
//               {sections.map(
//                 (section, sectionIndex) => {
//                   const sectionId =
//                     section?.id ??
//                     `section-${sectionIndex}`;

//                   const isOpen =
//                     openSections[
//                       sectionId
//                     ] !== false;

//                   const lessons =
//                     section?.lessons || [];

//                   const sectionState =
//                     getSectionPublishState(
//                       section
//                     );

//                   return (
//                     <div
//                       key={sectionId}
//                       className="admin-lms-section overflow-hidden rounded-2xl border"
//                       style={{
//                         borderColor:
//                           COLORS.border,
//                         background:
//                           COLORS.panel,
//                       }}
//                     >
//                       {/* SECTION HEADER */}

//                       <div
//                         className="flex flex-col gap-4 px-5 py-4 lg:flex-row lg:items-center lg:justify-between"
//                         style={{
//                           background:
//                             "linear-gradient(90deg, rgba(255,255,255,.035), rgba(255,255,255,.012))",
//                         }}
//                       >
//                         <div className="flex min-w-0 items-center gap-3">
//                           <button
//                             type="button"
//                             onClick={() =>
//                               toggleSection(
//                                 sectionId
//                               )
//                             }
//                             className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition hover:bg-white/10"
//                           >
//                             {isOpen ? (
//                               <ChevronDown
//                                 size={19}
//                               />
//                             ) : (
//                               <ChevronRight
//                                 size={19}
//                               />
//                             )}
//                           </button>

//                           <div className="min-w-0">
//                             <div className="flex flex-wrap items-center gap-3">
//                               <h3 className="truncate text-lg font-bold">
//                                 Section{" "}
//                                 {sectionIndex +
//                                   1}
//                                 :{" "}
//                                 {section?.title ||
//                                   section?.name ||
//                                   "Untitled Section"}
//                               </h3>

//                               <span
//                                 className="rounded-full px-2.5 py-1 text-[10px] font-semibold"
//                                 style={{
//                                   background:
//                                     sectionState.background,
//                                   color:
//                                     sectionState.color,
//                                 }}
//                               >
//                                 {
//                                   sectionState.label
//                                 }
//                               </span>
//                             </div>

//                             <div
//                               className="mt-1 flex flex-wrap items-center gap-3 text-xs"
//                               style={{
//                                 color:
//                                   COLORS.muted,
//                               }}
//                             >
//                               <span>
//                                 {lessons.length}{" "}
//                                 {lessons.length ===
//                                 1
//                                   ? "lesson"
//                                   : "lessons"}
//                               </span>

//                               {section?.description && (
//                                 <>
//                                   <span className="opacity-30">
//                                     |
//                                   </span>

//                                   <span className="max-w-xl truncate">
//                                     {
//                                       section.description
//                                     }
//                                   </span>
//                                 </>
//                               )}
//                             </div>
//                           </div>
//                         </div>

//                         <div className="flex items-center gap-1 self-end lg:self-auto">
//                           <ActionButton
//                             icon={
//                               <Pencil
//                                 size={17}
//                               />
//                             }
//                             label="Edit section"
//                             onClick={() =>
//                               editSection(
//                                 section
//                               )
//                             }
//                           />

//                           <ActionButton
//                             icon={
//                               <Trash2
//                                 size={17}
//                               />
//                             }
//                             label="Delete section"
//                             danger
//                             onClick={() =>
//                               requestDeleteSection(
//                                 section
//                               )
//                             }
//                           />

//                           <button
//                             type="button"
//                             onClick={() =>
//                               createLesson(
//                                 section
//                               )
//                             }
//                             className="ml-2 flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition hover:bg-white/10"
//                             style={{
//                               borderColor:
//                                 COLORS.borderStrong,
//                               color:
//                                 COLORS.purpleLight,
//                             }}
//                           >
//                             <Plus
//                               size={16}
//                             />
//                             Add Lesson
//                           </button>
//                         </div>
//                       </div>

//                       {/* LESSONS */}

//                       {isOpen && (
//                         <div
//                           className="border-t"
//                           style={{
//                             borderColor:
//                               COLORS.border,
//                           }}
//                         >
//                           {lessons.length ===
//                           0 ? (
//                             <div
//                               className="px-6 py-10 text-center"
//                               style={{
//                                 color:
//                                   COLORS.muted,
//                               }}
//                             >
//                               <FileText
//                                 className="mx-auto opacity-50"
//                                 size={30}
//                               />

//                               <p className="mt-3 text-sm">
//                                 No lessons in
//                                 this section.
//                               </p>

//                               <button
//                                 type="button"
//                                 onClick={() =>
//                                   createLesson(
//                                     section
//                                   )
//                                 }
//                                 className="mt-3 text-sm font-semibold text-purple-300 hover:text-purple-200"
//                               >
//                                 + Add lesson
//                               </button>
//                             </div>
//                           ) : (
//                             lessons.map(
//                               (
//                                 lesson,
//                                 lessonIndex
//                               ) => {
//                                 const publishState =
//                                   getPublishState(
//                                     lesson
//                                   );

//                                 const lessonTitle =
//                                   lesson?.title ||
//                                   lesson?.name ||
//                                   lesson?.lesson_name ||
//                                   `Lesson ${
//                                     lessonIndex +
//                                     1
//                                   }`;

//                                 const description =
//                                   lesson?.description ||
//                                   lesson?.short_description ||
//                                   lesson?.summary ||
//                                   "";

//                                 return (
//                                   <div
//                                     key={
//                                       lesson?.id ??
//                                       `${sectionId}-${lessonIndex}`
//                                     }
//                                     className="admin-lms-lesson grid items-center gap-4 border-b px-5 py-4 last:border-b-0 lg:grid-cols-[35px_minmax(260px,1fr)_120px_90px_110px_135px]"
//                                     style={{
//                                       borderColor:
//                                         COLORS.border,
//                                     }}
//                                   >
//                                     {/* DRAG HANDLE */}

//                                     <div
//                                       className="hidden lg:flex items-center justify-center"
//                                       style={{
//                                         color:
//                                           "#777281",
//                                       }}
//                                     >
//                                       <GripVertical
//                                         size={20}
//                                       />
//                                     </div>

//                                     {/* LESSON */}

//                                     <div className="flex min-w-0 items-center gap-3">
//                                       <div
//                                         className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg"
//                                         style={{
//                                           background:
//                                             "rgba(255,255,255,.06)",
//                                           color:
//                                             COLORS.purpleLight,
//                                         }}
//                                       >
//                                         {lesson?.thumbnail ||
//                                         lesson?.image ? (
//                                           <img
//                                             src={
//                                               lesson?.thumbnail ||
//                                               lesson?.image
//                                             }
//                                             alt=""
//                                             className="h-full w-full object-cover"
//                                           />
//                                         ) : (
//                                           getLessonIcon(
//                                             lesson?.lesson_type ||
//                                               lesson?.type
//                                           )
//                                         )}
//                                       </div>

//                                       <div className="min-w-0">
//                                         <h4 className="truncate text-sm font-bold">
//                                           {
//                                             lessonTitle
//                                           }
//                                         </h4>

//                                         {description && (
//                                           <p
//                                             className="mt-1 truncate text-xs"
//                                             style={{
//                                               color:
//                                                 COLORS.muted,
//                                             }}
//                                           >
//                                             {
//                                               description
//                                             }
//                                           </p>
//                                         )}

//                                         <div className="mt-2 flex flex-wrap items-center gap-2 lg:hidden">
//                                           <LessonTypeBadge
//                                             type={
//                                               lesson?.lesson_type ||
//                                               lesson?.type
//                                             }
//                                           />

//                                           <span
//                                             className="text-xs"
//                                             style={{
//                                               color:
//                                                 COLORS.muted,
//                                             }}
//                                           >
//                                             {getLessonDuration(
//                                               lesson
//                                             )}
//                                           </span>

//                                           <span
//                                             className="rounded-full px-2 py-1 text-[10px] font-semibold"
//                                             style={{
//                                               background:
//                                                 publishState.background,
//                                               color:
//                                                 publishState.color,
//                                             }}
//                                           >
//                                             {
//                                               publishState.label
//                                             }
//                                           </span>
//                                         </div>
//                                       </div>
//                                     </div>

//                                     {/* TYPE */}

//                                     <div className="hidden lg:block">
//                                       <LessonTypeBadge
//                                         type={
//                                           lesson?.lesson_type ||
//                                           lesson?.type
//                                         }
//                                       />
//                                     </div>

//                                     {/* DURATION */}

//                                     <div
//                                       className="hidden items-center gap-1.5 text-sm lg:flex"
//                                       style={{
//                                         color:
//                                           COLORS.muted,
//                                       }}
//                                     >
//                                       <Clock3
//                                         size={14}
//                                       />

//                                       {getLessonDuration(
//                                         lesson
//                                       )}
//                                     </div>

//                                     {/* STATUS */}

//                                     <div className="hidden lg:block">
//                                       <span
//                                         className="inline-flex items-center justify-center rounded-full px-3 py-1.5 text-xs font-semibold"
//                                         style={{
//                                           background:
//                                             publishState.background,
//                                           color:
//                                             publishState.color,
//                                         }}
//                                       >
//                                         {
//                                           publishState.label
//                                         }
//                                       </span>
//                                     </div>

//                                     {/* ACTIONS */}

//                                     <div className="flex items-center justify-end gap-1">
//                                       <ActionButton
//                                         icon={
//                                           <Eye
//                                             size={17}
//                                           />
//                                         }
//                                         label="Preview lesson"
//                                         onClick={() =>
//                                           setPreviewLesson(
//                                             lesson
//                                           )
//                                         }
//                                       />

//                                       <ActionButton
//                                         icon={
//                                           <Pencil
//                                             size={17}
//                                           />
//                                         }
//                                         label="Edit lesson"
//                                         onClick={() =>
//                                           editLesson(
//                                             section,
//                                             lesson
//                                           )
//                                         }
//                                       />

//                                       <ActionButton
//                                         icon={
//                                           <Trash2
//                                             size={17}
//                                           />
//                                         }
//                                         label="Delete lesson"
//                                         danger
//                                         onClick={() =>
//                                           requestDeleteLesson(
//                                             lesson
//                                           )
//                                         }
//                                       />
//                                     </div>
//                                   </div>
//                                 );
//                               }
//                             )
//                           )}
//                         </div>
//                       )}
//                     </div>
//                   );
//                 }
//               )}
//             </div>
//           )}

//           {/* FOOTER INFO */}

//           {activeTab === "content" &&
//             sections.length > 0 && (
//               <div
//                 className="flex flex-col gap-3 rounded-2xl border p-5 sm:flex-row sm:items-center sm:justify-between"
//                 style={{
//                   borderColor: COLORS.border,
//                   background:
//                     "rgba(255,255,255,.018)",
//                 }}
//               >
//                 <div className="flex items-center gap-3">
//                   <CalendarDays
//                     size={18}
//                     color={COLORS.purpleLight}
//                   />

//                   <div>
//                     <div className="text-sm font-semibold">
//                       Curriculum overview
//                     </div>

//                     <div
//                       className="mt-1 text-xs"
//                       style={{
//                         color: COLORS.muted,
//                       }}
//                     >
//                       {publishedSections} of{" "}
//                       {sections.length} sections
//                       published ·{" "}
//                       {publishedLessons} of{" "}
//                       {totalLessons} lessons
//                       published
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-2 text-xs">
//                   <span
//                     className="h-2 w-2 rounded-full"
//                     style={{
//                       background:
//                         COLORS.success,
//                     }}
//                   />

//                   <span
//                     style={{
//                       color: COLORS.muted,
//                     }}
//                   >
//                     Published
//                   </span>
//                 </div>
//               </div>
//             )}
//         </div>
//       </div>

//       {/* =====================================================
//           SECTION MODAL
//       ===================================================== */}

//       {sectionModal && (
//         <Modal
//           title={
//             sectionModal.mode === "create"
//               ? "Create Section"
//               : "Edit Section"
//           }
//           subtitle="Organize your class curriculum into sections."
//           onClose={() =>
//             !saving && setSectionModal(null)
//           }
//           closeDisabled={saving}
//         >
//           <form
//             onSubmit={saveSection}
//             className="space-y-5"
//           >
//             <Field
//               label="Section title"
//               required
//             >
//               <input
//                 autoFocus
//                 type="text"
//                 value={sectionForm.title}
//                 onChange={(event) =>
//                   setSectionForm({
//                     ...sectionForm,
//                     title:
//                       event.target.value,
//                   })
//                 }
//                 className="admin-lms-input"
//                 placeholder="e.g. Module 1 - Introduction"
//               />
//             </Field>

//             <Field
//               label="Description"
//               optional
//             >
//               <textarea
//                 value={
//                   sectionForm.description
//                 }
//                 onChange={(event) =>
//                   setSectionForm({
//                     ...sectionForm,
//                     description:
//                       event.target.value,
//                   })
//                 }
//                 rows={4}
//                 className="admin-lms-input resize-none leading-6"
//                 placeholder="Add a short description for this section..."
//               />
//             </Field>

//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//               <Field label="Sort order">
//                 <input
//                   type="number"
//                   min="0"
//                   value={
//                     sectionForm.sort_order
//                   }
//                   onChange={(event) =>
//                     setSectionForm({
//                       ...sectionForm,
//                       sort_order:
//                         event.target.value,
//                     })
//                   }
//                   className="admin-lms-input"
//                 />
//               </Field>

//               <div>
//                 <span className="mb-2 block text-sm font-medium text-gray-200">
//                   Visibility
//                 </span>

//                 <Toggle
//                   label="Published"
//                   helper="Visible to enrolled students"
//                   checked={
//                     Number(
//                       sectionForm.is_published
//                     ) === 1
//                   }
//                   onChange={(value) =>
//                     setSectionForm({
//                       ...sectionForm,
//                       is_published:
//                         value ? 1 : 0,
//                     })
//                   }
//                 />
//               </div>
//             </div>

//             <ModalActions
//               saving={saving}
//               onCancel={() =>
//                 setSectionModal(null)
//               }
//               submitLabel={
//                 sectionModal.mode ===
//                 "create"
//                   ? "Save Section"
//                   : "Update Section"
//               }
//             />
//           </form>
//         </Modal>
//       )}

//       {/* =====================================================
//           LESSON MODAL
//       ===================================================== */}

//       {lessonModal && (
//         <Modal
//           title={
//             lessonModal.mode === "create"
//               ? "Create Lesson"
//               : "Edit Lesson"
//           }
//           subtitle="Add learning material to this section."
//           onClose={() =>
//             !saving && setLessonModal(null)
//           }
//           closeDisabled={saving}
//           wide
//         >
//           <form
//             onSubmit={saveLesson}
//             className="space-y-5"
//           >
//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//               <Field
//                 label="Lesson title"
//                 required
//               >
//                 <input
//                   autoFocus
//                   type="text"
//                   value={lessonForm.title}
//                   onChange={(event) =>
//                     setLessonForm({
//                       ...lessonForm,
//                       title:
//                         event.target.value,
//                     })
//                   }
//                   className="admin-lms-input"
//                   placeholder="e.g. Introduction to Basic Postures"
//                 />
//               </Field>

//               <Field label="Lesson type">
//                 <select
//                   value={
//                     lessonForm.lesson_type
//                   }
//                   onChange={(event) =>
//                     setLessonForm({
//                       ...lessonForm,
//                       lesson_type:
//                         event.target.value,
//                     })
//                   }
//                   className="admin-lms-input"
//                 >
//                   <option value="YOUTUBE">
//                     YouTube
//                   </option>

//                   <option value="VIDEO">
//                     Video
//                   </option>

//                   <option value="PDF">
//                     PDF
//                   </option>

//                   <option value="TEXT">
//                     Text
//                   </option>

//                   <option value="LIVE">
//                     Live
//                   </option>

//                   <option value="EXTERNAL">
//                     External
//                   </option>
//                 </select>
//               </Field>
//             </div>

//             <Field
//               label="Description"
//               optional
//             >
//               <textarea
//                 value={
//                   lessonForm.description
//                 }
//                 onChange={(event) =>
//                   setLessonForm({
//                     ...lessonForm,
//                     description:
//                       event.target.value,
//                   })
//                 }
//                 rows={4}
//                 className="admin-lms-input resize-none leading-6"
//                 placeholder="Add a short description for this lesson..."
//               />
//             </Field>

//             {/* YOUTUBE */}

//             {lessonForm.lesson_type ===
//               "YOUTUBE" && (
//               <Field label="YouTube URL" required>
//                 <input
//                   type="url"
//                   value={
//                     lessonForm.youtube_url
//                   }
//                   onChange={(event) =>
//                     setLessonForm({
//                       ...lessonForm,
//                       youtube_url:
//                         event.target.value,
//                     })
//                   }
//                   className="admin-lms-input"
//                   placeholder="https://www.youtube.com/watch?v=..."
//                 />
//               </Field>
//             )}

//             {/* VIDEO */}

//             {lessonForm.lesson_type ===
//               "VIDEO" && (
//               <Field label="Video URL" required>
//                 <input
//                   type="url"
//                   value={
//                     lessonForm.resource_url
//                   }
//                   onChange={(event) =>
//                     setLessonForm({
//                       ...lessonForm,
//                       resource_url:
//                         event.target.value,
//                     })
//                   }
//                   className="admin-lms-input"
//                   placeholder="Direct video URL"
//                 />
//               </Field>
//             )}

//             {/* PDF */}

//             {lessonForm.lesson_type ===
//               "PDF" && (
//               <Field label="PDF URL" required>
//                 <input
//                   type="url"
//                   value={
//                     lessonForm.resource_url
//                   }
//                   onChange={(event) =>
//                     setLessonForm({
//                       ...lessonForm,
//                       resource_url:
//                         event.target.value,
//                     })
//                   }
//                   className="admin-lms-input"
//                   placeholder="https://..."
//                 />
//               </Field>
//             )}

//             {/* EXTERNAL */}

//             {lessonForm.lesson_type ===
//               "EXTERNAL" && (
//               <Field
//                 label="External URL"
//                 required
//               >
//                 <input
//                   type="url"
//                   value={
//                     lessonForm.resource_url
//                   }
//                   onChange={(event) =>
//                     setLessonForm({
//                       ...lessonForm,
//                       resource_url:
//                         event.target.value,
//                     })
//                   }
//                   className="admin-lms-input"
//                   placeholder="https://..."
//                 />
//               </Field>
//             )}

//             {/* TEXT */}

//             {lessonForm.lesson_type ===
//               "TEXT" && (
//               <Field
//                 label="Lesson content"
//                 required
//               >
//                 <textarea
//                   value={
//                     lessonForm.content
//                   }
//                   onChange={(event) =>
//                     setLessonForm({
//                       ...lessonForm,
//                       content:
//                         event.target.value,
//                     })
//                   }
//                   rows={9}
//                   className="admin-lms-input resize-y leading-6"
//                   placeholder="Write the lesson content here..."
//                 />
//               </Field>
//             )}

//             {/* LIVE */}

//             {lessonForm.lesson_type ===
//               "LIVE" && (
//               <Field
//                 label="Live session / meeting URL"
//                 required
//               >
//                 <input
//                   type="url"
//                   value={
//                     lessonForm.resource_url
//                   }
//                   onChange={(event) =>
//                     setLessonForm({
//                       ...lessonForm,
//                       resource_url:
//                         event.target.value,
//                     })
//                   }
//                   className="admin-lms-input"
//                   placeholder="Zoom / Google Meet / meeting URL"
//                 />
//               </Field>
//             )}

//             <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
//               <Field label="Duration (minutes)">
//                 <input
//                   type="number"
//                   min="0"
//                   value={
//                     lessonForm.duration_minutes
//                   }
//                   onChange={(event) =>
//                     setLessonForm({
//                       ...lessonForm,
//                       duration_minutes:
//                         event.target.value,
//                     })
//                   }
//                   className="admin-lms-input"
//                   placeholder="Optional"
//                 />
//               </Field>

//               <Field label="Sort order">
//                 <input
//                   type="number"
//                   min="0"
//                   value={
//                     lessonForm.sort_order
//                   }
//                   onChange={(event) =>
//                     setLessonForm({
//                       ...lessonForm,
//                       sort_order:
//                         event.target.value,
//                     })
//                   }
//                   className="admin-lms-input"
//                 />
//               </Field>

//               <div className="space-y-3">
//                 <Toggle
//                   label="Published"
//                   helper="Visible to students"
//                   checked={
//                     Number(
//                       lessonForm.is_published
//                     ) === 1
//                   }
//                   onChange={(value) =>
//                     setLessonForm({
//                       ...lessonForm,
//                       is_published:
//                         value ? 1 : 0,
//                     })
//                   }
//                 />

//                 <Toggle
//                   label="Student preview"
//                   helper="Available before enrollment"
//                   checked={
//                     Number(
//                       lessonForm.is_preview
//                     ) === 1
//                   }
//                   onChange={(value) =>
//                     setLessonForm({
//                       ...lessonForm,
//                       is_preview:
//                         value ? 1 : 0,
//                     })
//                   }
//                 />
//               </div>
//             </div>

//             <ModalActions
//               saving={saving}
//               onCancel={() =>
//                 setLessonModal(null)
//               }
//               submitLabel={
//                 lessonModal.mode ===
//                 "create"
//                   ? "Save Lesson"
//                   : "Update Lesson"
//               }
//             />
//           </form>
//         </Modal>
//       )}

//       {/* =====================================================
//           DELETE MODAL
//       ===================================================== */}

//       {deleteModal && (
//         <ConfirmModal
//           title={
//             deleteModal.type ===
//             "section"
//               ? "Delete Section?"
//               : "Delete Lesson?"
//           }
//           message={deleteModal.message}
//           loading={deleting}
//           onCancel={() =>
//             !deleting &&
//             setDeleteModal(null)
//           }
//           onConfirm={
//             deleteModal.type ===
//             "section"
//               ? deleteSection
//               : deleteLesson
//           }
//         />
//       )}

//       {/* =====================================================
//           PREVIEW MODAL
//       ===================================================== */}

//       {previewLesson && (
//         <PreviewModal
//           lesson={previewLesson}
//           onClose={() =>
//             setPreviewLesson(null)
//           }
//         />
//       )}
//     </>
//   );
// }

