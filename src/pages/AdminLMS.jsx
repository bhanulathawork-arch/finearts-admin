
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



import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
  ArrowLeft,
  BookOpen,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  FileText,
  GripVertical,
  Loader2,
  Radio,
  Users,
  BarChart3,
  Pencil,
  Trash2,
  Plus,
  Eye,
  PlayCircle,
  Video,
  CheckCircle2,
  Clock3,
  CalendarDays,
} from "lucide-react";

import API from "../services/api";

/* =========================================================
   COLORS
========================================================= */

const COLORS = {
  bg: "#07080D",
  panel: "#10121A",
  panel2: "#15121F",
  panel3: "#191523",
  border: "rgba(255,255,255,.10)",
  borderStrong: "rgba(180,70,255,.35)",
  purple: "#9B2CFF",
  pink: "#FF2AAE",
  purpleLight: "#C58BFF",
  text: "#FFFFFF",
  muted: "#AAA5B8",
  success: "#18D89D",
  successBg: "rgba(24,216,157,.12)",
  blue: "#4CA8FF",
  blueBg: "rgba(76,168,255,.13)",
  orange: "#FFB84D",
  orangeBg: "rgba(255,184,77,.13)",
  red: "#FF5C6C",
  redBg: "rgba(255,92,108,.12)",
};

/* =========================================================
   HELPERS
========================================================= */

const normalizeArray = (value) => {
  if (Array.isArray(value)) return value;

  if (Array.isArray(value?.data)) {
    return value.data;
  }

  if (Array.isArray(value?.rows)) {
    return value.rows;
  }

  return [];
};

const normalizeClasses = (payload) => {
  const root = payload?.data ?? payload ?? {};

  const candidates =
    root?.classes ??
    root?.data?.classes ??
    root?.rows ??
    root?.data ??
    root;

  return normalizeArray(candidates);
};

const normalizeCurriculum = (payload) => {
  const root = payload?.data ?? payload ?? {};

  const course =
    root?.course ??
    root?.class ??
    root?.data?.course ??
    root?.data?.class ??
    null;

  const sections = normalizeArray(
    root?.sections ??
      root?.curriculum ??
      root?.data?.sections ??
      root?.data?.curriculum
  );

  return {
    course,
    sections: sections.map((section) => ({
      ...section,
      lessons: normalizeArray(
        section?.lessons ??
          section?.course_lessons ??
          section?.lms_lessons
      ),
    })),
  };
};

const normalizeLessonType = (value) => {
  const type = String(value || "").toUpperCase();

  if (
    type === "VIDEO" ||
    type === "DIRECT_VIDEO" ||
    type === "VID"
  ) {
    return "VIDEO";
  }

  if (type === "RECORDING") return "RECORDING";
  if (type === "YOUTUBE") return "YOUTUBE";
  if (type === "PDF") return "PDF";
  if (type === "TEXT") return "TEXT";
  if (type === "LIVE") return "LIVE";
  if (type === "EXTERNAL") return "EXTERNAL";

  return "YOUTUBE";
};

const getLessonTypeLabel = (type) => {
  switch (normalizeLessonType(type)) {
    case "VIDEO":
      return "Video";

    case "RECORDING":
      return "Recording";

    case "YOUTUBE":
      return "YouTube";

    case "PDF":
      return "PDF";

    case "TEXT":
      return "Text";

    case "LIVE":
      return "Live";

    case "EXTERNAL":
      return "External";

    default:
      return "Lesson";
  }
};

const getLessonIcon = (type) => {
  switch (normalizeLessonType(type)) {
    case "VIDEO":
    case "RECORDING":
    case "YOUTUBE":
      return <Video size={15} />;

    case "PDF":
    case "TEXT":
      return <FileText size={15} />;

    case "LIVE":
      return <Radio size={15} />;

    case "EXTERNAL":
      return <ExternalLink size={15} />;

    default:
      return <BookOpen size={15} />;
  }
};

const getLessonTypeStyle = (type) => {
  switch (normalizeLessonType(type)) {
    case "VIDEO":
    case "RECORDING":
      return {
        background: "rgba(255,55,90,.12)",
        color: "#FF5570",
      };

    case "YOUTUBE":
      return {
        background: "rgba(255,55,90,.12)",
        color: "#FF5570",
      };

    case "TEXT":
      return {
        background: "rgba(67,145,255,.13)",
        color: "#65A9FF",
      };

    case "PDF":
      return {
        background: "rgba(155,44,255,.14)",
        color: "#C27BFF",
      };

    case "LIVE":
      return {
        background: "rgba(155,44,255,.16)",
        color: "#C27BFF",
      };

    case "EXTERNAL":
      return {
        background: "rgba(40,150,255,.12)",
        color: "#63B2FF",
      };

    default:
      return {
        background: "rgba(255,255,255,.08)",
        color: COLORS.muted,
      };
  }
};

const getLessonDuration = (lesson) => {
  const value =
    lesson?.duration ??
    lesson?.duration_minutes ??
    lesson?.minutes ??
    null;

  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return "-";
  }

  const number = Number(value);

  if (!Number.isNaN(number)) {
    return `${number} min`;
  }

  return String(value);
};

const getPublishState = (lesson) => {
  if (Number(lesson?.is_published) === 1) {
    return {
      label: "Published",
      background: COLORS.successBg,
      color: COLORS.success,
    };
  }

  if (
    String(lesson?.status || "").toUpperCase() ===
    "SCHEDULED"
  ) {
    return {
      label: "Scheduled",
      background: COLORS.blueBg,
      color: COLORS.blue,
    };
  }

  return {
    label: "Draft",
    background: "rgba(255,255,255,.07)",
    color: "#A8A4B2",
  };
};

const getSectionPublishState = (section) => {
  if (Number(section?.is_published) === 1) {
    return {
      label: "Published",
      background: COLORS.successBg,
      color: COLORS.success,
    };
  }

  return {
    label: "Draft",
    background: "rgba(255,255,255,.07)",
    color: "#A8A4B2",
  };
};

const getAdminConfig = () => {
  const adminToken = localStorage.getItem("adminToken");

  return {
    headers: adminToken
      ? {
          Authorization: `Bearer ${adminToken}`,
        }
      : {},
  };
};

/* =========================================================
   SMALL UI COMPONENTS
========================================================= */

function StatusBadge({ children, type = "success" }) {
  const styles =
    type === "success"
      ? {
          background: COLORS.successBg,
          color: COLORS.success,
        }
      : type === "blue"
      ? {
          background: COLORS.blueBg,
          color: COLORS.blue,
        }
      : {
          background: "rgba(255,255,255,.07)",
          color: COLORS.muted,
        };

  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold"
      style={styles}
    >
      {children}
    </span>
  );
}

function LessonTypeBadge({ type }) {
  const style = getLessonTypeStyle(type);

  return (
    <span
      className="inline-flex min-w-[86px] items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold"
      style={style}
    >
      {getLessonIcon(type)}
      {getLessonTypeLabel(type)}
    </span>
  );
}

function ActionButton({
  icon,
  label,
  onClick,
  danger = false,
}) {
  return (
    <button
      type="button"
      title={label}
      onClick={onClick}
      className="flex h-9 w-9 items-center justify-center rounded-lg transition hover:bg-white/10"
      style={{
        color: danger ? COLORS.red : "#D9D4E4",
      }}
    >
      {icon}
    </button>
  );
}

function StatCard({
  icon,
  label,
  value,
}) {
  return (
    <div
      className="rounded-2xl border p-5"
      style={{
        borderColor: COLORS.border,
        background:
          "linear-gradient(145deg, rgba(155,44,255,.08), rgba(255,255,255,.015))",
      }}
    >
      <div
        className="text-xs font-medium uppercase tracking-[0.14em]"
        style={{ color: COLORS.muted }}
      >
        {label}
      </div>

      <div className="mt-3 flex items-end justify-between">
        <div className="text-3xl font-bold">
          {value}
        </div>

        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl"
          style={{
            background:
              "linear-gradient(135deg, rgba(155,44,255,.18), rgba(255,42,174,.12))",
            color: COLORS.purpleLight,
          }}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MAIN
========================================================= */

export default function AdminLMS() {
  const { classId } = useParams();
  const navigate = useNavigate();

  const [classes, setClasses] = useState([]);
  const [course, setCourse] = useState(null);
  const [sections, setSections] = useState([]);

  const [loading, setLoading] = useState(true);
  const [classesLoading, setClassesLoading] =
    useState(false);

  const [openSections, setOpenSections] =
    useState({});

  const [activeTab, setActiveTab] =
    useState("content");

  /* =======================================================
     CLASS TITLE
  ======================================================= */

  const classTitle = useMemo(() => {
    return (
      course?.title ||
      course?.name ||
      course?.class_name ||
      "Class Curriculum"
    );
  }, [course]);

  /* =======================================================
     LOAD CLASSES
  ======================================================= */

  const loadClasses = async () => {
    setClassesLoading(true);
    setLoading(true);

    try {
      const response = await API.get(
        "/lms/admin/classes",
        getAdminConfig()
      );

      setClasses(
        normalizeClasses(response?.data)
      );
    } catch (error) {
      console.error(
        "Admin LMS classes load error:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to load LMS classes"
      );

      setClasses([]);
    } finally {
      setClassesLoading(false);
      setLoading(false);
    }
  };

  /* =======================================================
     LOAD CURRICULUM
  ======================================================= */

  const loadCurriculum = async () => {
    if (!classId) {
      await loadClasses();
      return;
    }

    setLoading(true);

    try {
      const response = await API.get(
        `/lms/admin/classes/${classId}/curriculum`,
        getAdminConfig()
      );

      const normalized =
        normalizeCurriculum(response?.data);

      setCourse(normalized.course);
      setSections(normalized.sections);

      setOpenSections((previous) => {
        const next = { ...previous };

        normalized.sections.forEach(
          (section, index) => {
            if (
              next[section.id] ===
              undefined
            ) {
              next[section.id] =
                index === 0;
            }
          }
        );

        return next;
      });
    } catch (error) {
      console.error(
        "Admin LMS curriculum load error:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to load curriculum"
      );

      setCourse(null);
      setSections([]);
    } finally {
      setLoading(false);
    }
  };

  /* =======================================================
     INITIAL LOAD
  ======================================================= */

  useEffect(() => {
    loadCurriculum();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classId]);

  /* =======================================================
     SECTION TOGGLE
  ======================================================= */

  const toggleSection = (id) => {
    setOpenSections((previous) => ({
      ...previous,
      [id]: !previous[id],
    }));
  };

  /* =======================================================
     UI ONLY ACTIONS
  ======================================================= */

  const uiAction = (message) => {
    toast(message, {
      icon: "ℹ️",
      style: {
        background: "#17131F",
        color: "#fff",
        border:
          "1px solid rgba(155,44,255,.35)",
      },
    });
  };

  /* =======================================================
     STATS
  ======================================================= */

  const totalLessons = sections.reduce(
    (total, section) =>
      total +
      (section?.lessons?.length || 0),
    0
  );

  const publishedSections =
    sections.filter(
      (section) =>
        Number(section?.is_published) === 1
    ).length;

  const publishedLessons =
    sections.reduce(
      (total, section) =>
        total +
        (section?.lessons || []).filter(
          (lesson) =>
            Number(lesson?.is_published) ===
            1
        ).length,
      0
    );

  const studentCount =
    course?.students_count ??
    course?.students ??
    course?.enrolled_students ??
    0;

  /* =======================================================
     CLASS LIST
  ======================================================= */

  if (!classId) {
    return (
      <>
        <style>{`
          .admin-lms-scrollbar::-webkit-scrollbar {
            width: 7px;
          }

          .admin-lms-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }

          .admin-lms-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(255,255,255,.12);
            border-radius: 999px;
          }

          .admin-lms-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(255,255,255,.22);
          }

          .admin-lms-card {
            transition:
              transform .2s ease,
              border-color .2s ease,
              box-shadow .2s ease;
          }

          .admin-lms-card:hover {
            transform: translateY(-3px);
            border-color: rgba(155,44,255,.38) !important;
            box-shadow:
              0 18px 50px rgba(0,0,0,.28),
              0 0 30px rgba(155,44,255,.08);
          }
        `}</style>

        <div
          className="admin-lms-scrollbar min-h-screen w-full overflow-y-auto text-white"
          style={{
            background: COLORS.bg,
          }}
        >
          <div className="mx-auto max-w-[1450px] space-y-8 p-6 lg:p-8">

            {/* HEADER */}

            <div>
              <div
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em]"
                style={{
                  color: COLORS.purpleLight,
                }}
              >
                <BookOpen size={16} />
                Admin LMS
              </div>

              <h1 className="mt-3 text-3xl font-bold tracking-tight lg:text-4xl">
                Learning Management System
              </h1>

              <p
                className="mt-2 max-w-2xl text-sm leading-6"
                style={{
                  color: COLORS.muted,
                }}
              >
                Select a class to view its
                complete LMS curriculum,
                sections, lessons and
                learning content.
              </p>
            </div>

            {/* LOADING */}

            {classesLoading ? (
              <div
                className="rounded-2xl border p-20 text-center"
                style={{
                  borderColor: COLORS.border,
                  background: COLORS.panel,
                }}
              >
                <Loader2
                  className="mx-auto animate-spin"
                  size={38}
                  color={COLORS.purpleLight}
                />

                <p
                  className="mt-4 text-sm"
                  style={{
                    color: COLORS.muted,
                  }}
                >
                  Loading LMS classes...
                </p>
              </div>
            ) : classes.length === 0 ? (
              <div
                className="rounded-2xl border p-20 text-center"
                style={{
                  borderColor: COLORS.border,
                  background: COLORS.panel,
                }}
              >
                <BookOpen
                  className="mx-auto"
                  size={48}
                  color={COLORS.purpleLight}
                />

                <h2 className="mt-5 text-xl font-semibold">
                  No LMS classes found
                </h2>

                <p
                  className="mx-auto mt-2 max-w-lg text-sm leading-6"
                  style={{
                    color: COLORS.muted,
                  }}
                >
                  No classes are currently
                  available in the Admin LMS.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {classes.map((item) => {
                  const id =
                    item?.id ??
                    item?.class_id;

                  const title =
                    item?.title ||
                    item?.name ||
                    item?.class_name ||
                    "Untitled Class";

                  const image =
                    item?.image ||
                    item?.thumbnail ||
                    item?.banner_image ||
                    item?.class_image ||
                    null;

                  const category =
                    item?.category_name ||
                    item?.category ||
                    "Not available";

                  const subcategory =
                    item?.subcategory_name ||
                    item?.subcategory ||
                    "Not available";

                  const sectionsCount =
                    item?.sections ??
                    item?.section_count ??
                    0;

                  const lessonsCount =
                    item?.lessons ??
                    item?.lesson_count ??
                    0;

                  const students =
                    item?.students ??
                    item?.students_count ??
                    item?.enrolled_students ??
                    0;

                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() =>
                        navigate(
                          `/admin/lms/${id}`
                        )
                      }
                      className="admin-lms-card overflow-hidden rounded-2xl border text-left"
                      style={{
                        borderColor:
                          COLORS.border,
                        background:
                          COLORS.panel,
                      }}
                    >
                      {/* IMAGE */}

                      <div
                        className="relative h-52 w-full overflow-hidden"
                        style={{
                          background:
                            "linear-gradient(135deg, #241132, #10121A)",
                        }}
                      >
                        {image ? (
                          <img
                            src={image}
                            alt={title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <BookOpen
                              size={60}
                              color={
                                COLORS.purpleLight
                              }
                            />
                          </div>
                        )}

                        <div
                          className="absolute inset-x-0 bottom-0 h-24"
                          style={{
                            background:
                              "linear-gradient(to top, rgba(7,8,13,.9), transparent)",
                          }}
                        />

                        <div className="absolute right-4 top-4">
                          <StatusBadge>
                            Active
                          </StatusBadge>
                        </div>
                      </div>

                      {/* CONTENT */}

                      <div className="p-5">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h2 className="text-lg font-bold">
                              {title}
                            </h2>

                            <p
                              className="mt-1 text-sm"
                              style={{
                                color:
                                  COLORS.muted,
                              }}
                            >
                              {category}
                              {"  "}
                              <span className="opacity-40">
                                |
                              </span>
                              {"  "}
                              {subcategory}
                            </p>
                          </div>

                          <ChevronRight
                            size={21}
                            color={
                              COLORS.purpleLight
                            }
                          />
                        </div>

                        <div
                          className="mt-5 grid grid-cols-3 gap-2 border-t pt-4"
                          style={{
                            borderColor:
                              COLORS.border,
                          }}
                        >
                          <div>
                            <div
                              className="text-xs"
                              style={{
                                color:
                                  COLORS.muted,
                              }}
                            >
                              Sections
                            </div>

                            <div className="mt-1 font-semibold">
                              {sectionsCount}
                            </div>
                          </div>

                          <div>
                            <div
                              className="text-xs"
                              style={{
                                color:
                                  COLORS.muted,
                              }}
                            >
                              Lessons
                            </div>

                            <div className="mt-1 font-semibold">
                              {lessonsCount}
                            </div>
                          </div>

                          <div>
                            <div
                              className="text-xs"
                              style={{
                                color:
                                  COLORS.muted,
                              }}
                            >
                              Students
                            </div>

                            <div className="mt-1 font-semibold">
                              {students}
                            </div>
                          </div>
                        </div>

                        <div
                          className="mt-5 flex items-center justify-between border-t pt-4"
                          style={{
                            borderColor:
                              COLORS.border,
                          }}
                        >
                          <span
                            className="text-sm"
                            style={{
                              color:
                                COLORS.muted,
                            }}
                          >
                            View curriculum
                          </span>

                          <span
                            className="font-semibold"
                            style={{
                              color:
                                COLORS.purpleLight,
                            }}
                          >
                            Open LMS
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </>
    );
  }

  /* =======================================================
     CURRICULUM DETAIL
  ======================================================= */

  return (
    <>
      <style>{`
        .admin-lms-detail-scrollbar::-webkit-scrollbar {
          width: 7px;
        }

        .admin-lms-detail-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .admin-lms-detail-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,.12);
          border-radius: 999px;
        }

        .admin-lms-detail-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,.22);
        }

        .admin-lms-lesson {
          transition: background .15s ease;
        }

        .admin-lms-lesson:hover {
          background: rgba(255,255,255,.025);
        }

        .admin-lms-section {
          box-shadow: 0 15px 45px rgba(0,0,0,.18);
        }

        .admin-lms-tab {
          transition:
            background .2s ease,
            color .2s ease;
        }
      `}</style>

      <div
        className="admin-lms-detail-scrollbar min-h-screen w-full overflow-y-auto text-white"
        style={{
          background: COLORS.bg,
        }}
      >
        <div className="mx-auto max-w-[1450px] space-y-6 p-5 lg:p-7">

          {/* TOP HEADER */}

          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <button
                type="button"
                onClick={() =>
                  navigate("/admin/lms")
                }
                className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border transition hover:bg-white/10"
                style={{
                  borderColor: COLORS.border,
                  background: COLORS.panel,
                }}
              >
                <ArrowLeft size={20} />
              </button>

              <div>
                <div
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em]"
                  style={{
                    color: COLORS.purpleLight,
                  }}
                >
                  <BookOpen size={15} />
                  Admin LMS
                </div>

                <h1 className="mt-2 text-3xl font-bold lg:text-4xl">
                  {classTitle}
                </h1>

                <p
                  className="mt-2 text-sm"
                  style={{
                    color: COLORS.muted,
                  }}
                >
                  Manage and monitor the
                  complete curriculum for
                  this class.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                uiAction(
                  "Admin view is ready. Management actions will be connected next."
                )
              }
              className="rounded-xl border px-5 py-3 text-sm font-semibold transition hover:bg-white/10"
              style={{
                borderColor:
                  COLORS.borderStrong,
                color:
                  COLORS.purpleLight,
              }}
            >
              Admin View
            </button>
          </div>

          {/* CLASS SUMMARY */}

          <div
            className="overflow-hidden rounded-3xl border"
            style={{
              borderColor:
                "rgba(155,44,255,.24)",
              background:
                "linear-gradient(135deg, rgba(35,14,51,.85), rgba(15,17,25,.95))",
            }}
          >
            <div className="flex flex-col gap-6 p-5 lg:flex-row lg:items-center lg:p-6">

              {/* IMAGE */}

              <div
                className="h-32 w-full shrink-0 overflow-hidden rounded-2xl lg:w-56"
                style={{
                  background:
                    "linear-gradient(135deg,#2A123D,#11131C)",
                }}
              >
                {course?.image ||
                course?.thumbnail ||
                course?.banner_image ||
                course?.class_image ? (
                  <img
                    src={
                      course?.image ||
                      course?.thumbnail ||
                      course?.banner_image ||
                      course?.class_image
                    }
                    alt={classTitle}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <BookOpen
                      size={50}
                      color={
                        COLORS.purpleLight
                      }
                    />
                  </div>
                )}
              </div>

              {/* DETAILS */}

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-2xl font-bold">
                    {classTitle}
                  </h2>

                  <StatusBadge>
                    <CheckCircle2
                      size={13}
                    />
                    Active
                  </StatusBadge>
                </div>

                <div
                  className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm"
                  style={{
                    color: COLORS.muted,
                  }}
                >
                  <span>
                    Category:{" "}
                    <strong className="text-white">
                      {course?.category_name ||
                        course?.category ||
                        "Not available"}
                    </strong>
                  </span>

                  <span className="opacity-30">
                    |
                  </span>

                  <span>
                    Subcategory:{" "}
                    <strong className="text-white">
                      {course?.subcategory_name ||
                        course?.subcategory ||
                        "Not available"}
                    </strong>
                  </span>
                </div>

                <div
                  className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm"
                  style={{
                    color: COLORS.muted,
                  }}
                >
                  <span>
                    Total Sections:{" "}
                    <strong className="text-white">
                      {sections.length}
                    </strong>
                  </span>

                  <span>
                    Total Lessons:{" "}
                    <strong className="text-white">
                      {totalLessons}
                    </strong>
                  </span>

                  <span>
                    Students Enrolled:{" "}
                    <strong className="text-white">
                      {studentCount}
                    </strong>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* STATS */}

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatCard
              icon={<BookOpen size={20} />}
              label="Sections"
              value={sections.length}
            />

            <StatCard
              icon={<FileText size={20} />}
              label="Lessons"
              value={totalLessons}
            />

            <StatCard
              icon={<CheckCircle2 size={20} />}
              label="Published Lessons"
              value={publishedLessons}
            />

            <StatCard
              icon={<Users size={20} />}
              label="Students"
              value={studentCount}
            />
          </div>

          {/* TABS + ADD SECTION */}

          <div className="flex flex-col gap-4 border-b pb-4 lg:flex-row lg:items-center lg:justify-between"
            style={{
              borderColor: COLORS.border,
            }}
          >
            <div className="flex flex-wrap gap-2">
              {[
                {
                  key: "content",
                  label: "Content",
                  icon: <BookOpen size={17} />,
                },
                {
                  key: "students",
                  label: "Students",
                  icon: <Users size={17} />,
                },
                {
                  key: "progress",
                  label: "Progress",
                  icon: <BarChart3 size={17} />,
                },
                {
                  key: "analytics",
                  label: "Analytics",
                  icon: <BarChart3 size={17} />,
                },
              ].map((tab) => {
                const active =
                  activeTab === tab.key;

                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => {
                      setActiveTab(tab.key);

                      if (
                        tab.key !== "content"
                      ) {
                        uiAction(
                          `${tab.label} UI is ready for the next implementation step.`
                        );
                      }
                    }}
                    className="admin-lms-tab flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold"
                    style={{
                      background: active
                        ? "linear-gradient(135deg, rgba(155,44,255,.28), rgba(255,42,174,.18))"
                        : "transparent",
                      color: active
                        ? COLORS.purpleLight
                        : "#D5D0DE",
                      border: active
                        ? "1px solid rgba(155,44,255,.30)"
                        : "1px solid transparent",
                    }}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() =>
                uiAction(
                  "Add Section UI is ready. CRUD will be connected next."
                )
              }
              className="flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white"
              style={{
                background:
                  "linear-gradient(135deg,#9B2CFF,#FF2AAE)",
                boxShadow:
                  "0 10px 30px rgba(155,44,255,.20)",
              }}
            >
              <Plus size={18} />
              Add Section
            </button>
          </div>

          {/* NON-CONTENT TABS */}

          {activeTab !== "content" ? (
            <div
              className="rounded-3xl border p-16 text-center"
              style={{
                borderColor: COLORS.border,
                background: COLORS.panel,
              }}
            >
              {activeTab === "students" ? (
                <Users
                  className="mx-auto"
                  size={52}
                  color={COLORS.purpleLight}
                />
              ) : activeTab ===
                "progress" ? (
                <BarChart3
                  className="mx-auto"
                  size={52}
                  color={COLORS.purpleLight}
                />
              ) : (
                <BarChart3
                  className="mx-auto"
                  size={52}
                  color={COLORS.purpleLight}
                />
              )}

              <h2 className="mt-5 text-xl font-bold">
                {activeTab === "students"
                  ? "Students"
                  : activeTab ===
                    "progress"
                  ? "Learning Progress"
                  : "Analytics"}
              </h2>

              <p
                className="mx-auto mt-2 max-w-xl text-sm leading-6"
                style={{
                  color: COLORS.muted,
                }}
              >
                The {activeTab} section
                will use the same Admin LMS
                design and will be connected
                to the backend after the UI
                implementation.
              </p>
            </div>
          ) : loading ? (
            <div
              className="rounded-3xl border p-20 text-center"
              style={{
                borderColor: COLORS.border,
                background: COLORS.panel,
              }}
            >
              <Loader2
                className="mx-auto animate-spin"
                size={38}
                color={COLORS.purpleLight}
              />

              <p
                className="mt-4 text-sm"
                style={{
                  color: COLORS.muted,
                }}
              >
                Loading curriculum...
              </p>
            </div>
          ) : sections.length === 0 ? (
            <div
              className="rounded-3xl border p-20 text-center"
              style={{
                borderColor: COLORS.border,
                background: COLORS.panel,
              }}
            >
              <BookOpen
                className="mx-auto"
                size={55}
                color={COLORS.purpleLight}
              />

              <h2 className="mt-5 text-2xl font-bold">
                No curriculum found
              </h2>

              <p
                className="mx-auto mt-2 max-w-xl text-sm leading-6"
                style={{
                  color: COLORS.muted,
                }}
              >
                This class does not
                currently have any LMS
                sections or lessons.
              </p>

              <button
                type="button"
                onClick={() =>
                  uiAction(
                    "Add Section UI is ready."
                  )
                }
                className="mx-auto mt-6 flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold"
                style={{
                  background:
                    "linear-gradient(135deg,#9B2CFF,#FF2AAE)",
                }}
              >
                <Plus size={18} />
                Add First Section
              </button>
            </div>
          ) : (
            /* =================================================
               SECTIONS
            ================================================= */

            <div className="space-y-5">
              {sections.map(
                (section, sectionIndex) => {
                  const sectionId =
                    section?.id ??
                    `section-${sectionIndex}`;

                  const isOpen =
                    openSections[
                      sectionId
                    ] !== false;

                  const lessons =
                    section?.lessons || [];

                  const sectionState =
                    getSectionPublishState(
                      section
                    );

                  return (
                    <div
                      key={sectionId}
                      className="admin-lms-section overflow-hidden rounded-2xl border"
                      style={{
                        borderColor:
                          COLORS.border,
                        background:
                          COLORS.panel,
                      }}
                    >
                      {/* SECTION HEADER */}

                      <div
                        className="flex flex-col gap-4 px-5 py-4 lg:flex-row lg:items-center lg:justify-between"
                        style={{
                          background:
                            "linear-gradient(90deg, rgba(255,255,255,.035), rgba(255,255,255,.012))",
                        }}
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <button
                            type="button"
                            onClick={() =>
                              toggleSection(
                                sectionId
                              )
                            }
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition hover:bg-white/10"
                          >
                            {isOpen ? (
                              <ChevronDown
                                size={19}
                              />
                            ) : (
                              <ChevronRight
                                size={19}
                              />
                            )}
                          </button>

                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-3">
                              <h3 className="truncate text-lg font-bold">
                                Section{" "}
                                {sectionIndex +
                                  1}
                                :{" "}
                                {section?.title ||
                                  section?.name ||
                                  "Untitled Section"}
                              </h3>

                              <span
                                className="rounded-full px-2.5 py-1 text-[10px] font-semibold"
                                style={{
                                  background:
                                    sectionState.background,
                                  color:
                                    sectionState.color,
                                }}
                              >
                                {
                                  sectionState.label
                                }
                              </span>
                            </div>

                            <div
                              className="mt-1 flex flex-wrap items-center gap-3 text-xs"
                              style={{
                                color:
                                  COLORS.muted,
                              }}
                            >
                              <span>
                                {lessons.length}{" "}
                                {lessons.length ===
                                1
                                  ? "lesson"
                                  : "lessons"}
                              </span>

                              {section?.description && (
                                <>
                                  <span className="opacity-30">
                                    |
                                  </span>

                                  <span>
                                    {
                                      section.description
                                    }
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 self-end lg:self-auto">
                          <ActionButton
                            icon={
                              <Pencil
                                size={17}
                              />
                            }
                            label="Edit section"
                            onClick={() =>
                              uiAction(
                                "Edit Section UI is ready."
                              )
                            }
                          />

                          <ActionButton
                            icon={
                              <Trash2
                                size={17}
                              />
                            }
                            label="Delete section"
                            danger
                            onClick={() =>
                              uiAction(
                                "Delete Section UI is ready."
                              )
                            }
                          />

                          <button
                            type="button"
                            onClick={() =>
                              uiAction(
                                "Add Lesson UI is ready."
                              )
                            }
                            className="ml-2 flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition hover:bg-white/10"
                            style={{
                              borderColor:
                                COLORS.borderStrong,
                              color:
                                COLORS.purpleLight,
                            }}
                          >
                            <Plus
                              size={16}
                            />
                            Add Lesson
                          </button>
                        </div>
                      </div>

                      {/* LESSONS */}

                      {isOpen && (
                        <div
                          className="border-t"
                          style={{
                            borderColor:
                              COLORS.border,
                          }}
                        >
                          {lessons.length ===
                          0 ? (
                            <div
                              className="px-6 py-10 text-center"
                              style={{
                                color:
                                  COLORS.muted,
                              }}
                            >
                              <FileText
                                className="mx-auto opacity-50"
                                size={30}
                              />

                              <p className="mt-3 text-sm">
                                No lessons in
                                this section.
                              </p>
                            </div>
                          ) : (
                            lessons.map(
                              (
                                lesson,
                                lessonIndex
                              ) => {
                                const publishState =
                                  getPublishState(
                                    lesson
                                  );

                                const lessonTitle =
                                  lesson?.title ||
                                  lesson?.name ||
                                  lesson?.lesson_name ||
                                  `Lesson ${
                                    lessonIndex +
                                    1
                                  }`;

                                const description =
                                  lesson?.description ||
                                  lesson?.short_description ||
                                  lesson?.summary ||
                                  "";

                                return (
                                  <div
                                    key={
                                      lesson?.id ??
                                      `${sectionId}-${lessonIndex}`
                                    }
                                    className="admin-lms-lesson grid items-center gap-4 border-b px-5 py-4 last:border-b-0 lg:grid-cols-[35px_minmax(260px,1fr)_120px_90px_110px_120px]"
                                    style={{
                                      borderColor:
                                        COLORS.border,
                                    }}
                                  >
                                    {/* DRAG HANDLE */}

                                    <div
                                      className="hidden lg:flex items-center justify-center"
                                      style={{
                                        color:
                                          "#777281",
                                      }}
                                    >
                                      <GripVertical
                                        size={20}
                                      />
                                    </div>

                                    {/* LESSON */}

                                    <div className="flex min-w-0 items-center gap-3">
                                      <div
                                        className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg"
                                        style={{
                                          background:
                                            "rgba(255,255,255,.06)",
                                          color:
                                            COLORS.purpleLight,
                                        }}
                                      >
                                        {lesson?.thumbnail ||
                                        lesson?.image ? (
                                          <img
                                            src={
                                              lesson?.thumbnail ||
                                              lesson?.image
                                            }
                                            alt=""
                                            className="h-full w-full object-cover"
                                          />
                                        ) : (
                                          getLessonIcon(
                                            lesson?.lesson_type ||
                                              lesson?.type
                                          )
                                        )}
                                      </div>

                                      <div className="min-w-0">
                                        <h4 className="truncate text-sm font-bold">
                                          {
                                            lessonTitle
                                          }
                                        </h4>

                                        {description && (
                                          <p
                                            className="mt-1 truncate text-xs"
                                            style={{
                                              color:
                                                COLORS.muted,
                                            }}
                                          >
                                            {
                                              description
                                            }
                                          </p>
                                        )}

                                        <div className="mt-2 flex items-center gap-2 lg:hidden">
                                          <LessonTypeBadge
                                            type={
                                              lesson?.lesson_type ||
                                              lesson?.type
                                            }
                                          />

                                          <span
                                            className="text-xs"
                                            style={{
                                              color:
                                                COLORS.muted,
                                            }}
                                          >
                                            {getLessonDuration(
                                              lesson
                                            )}
                                          </span>
                                        </div>
                                      </div>
                                    </div>

                                    {/* TYPE */}

                                    <div className="hidden lg:block">
                                      <LessonTypeBadge
                                        type={
                                          lesson?.lesson_type ||
                                          lesson?.type
                                        }
                                      />
                                    </div>

                                    {/* DURATION */}

                                    <div
                                      className="hidden items-center gap-1.5 text-sm lg:flex"
                                      style={{
                                        color:
                                          COLORS.muted,
                                      }}
                                    >
                                      <Clock3
                                        size={14}
                                      />

                                      {getLessonDuration(
                                        lesson
                                      )}
                                    </div>

                                    {/* STATUS */}

                                    <div className="hidden lg:block">
                                      <span
                                        className="inline-flex items-center justify-center rounded-full px-3 py-1.5 text-xs font-semibold"
                                        style={{
                                          background:
                                            publishState.background,
                                          color:
                                            publishState.color,
                                        }}
                                      >
                                        {
                                          publishState.label
                                        }
                                      </span>
                                    </div>

                                    {/* ACTIONS */}

                                    <div className="flex items-center justify-end gap-1">
                                      <ActionButton
                                        icon={
                                          <Eye
                                            size={17}
                                          />
                                        }
                                        label="Preview lesson"
                                        onClick={() =>
                                          uiAction(
                                            "Preview Lesson UI is ready."
                                          )
                                        }
                                      />

                                      <ActionButton
                                        icon={
                                          <Pencil
                                            size={17}
                                          />
                                        }
                                        label="Edit lesson"
                                        onClick={() =>
                                          uiAction(
                                            "Edit Lesson UI is ready."
                                          )
                                        }
                                      />

                                      <ActionButton
                                        icon={
                                          <Trash2
                                            size={17}
                                          />
                                        }
                                        label="Delete lesson"
                                        danger
                                        onClick={() =>
                                          uiAction(
                                            "Delete Lesson UI is ready."
                                          )
                                        }
                                      />
                                    </div>
                                  </div>
                                );
                              }
                            )
                          )}
                        </div>
                      )}
                    </div>
                  );
                }
              )}
            </div>
          )}

          {/* FOOTER INFO */}

          {activeTab === "content" &&
            sections.length > 0 && (
              <div
                className="flex flex-col gap-3 rounded-2xl border p-5 sm:flex-row sm:items-center sm:justify-between"
                style={{
                  borderColor: COLORS.border,
                  background:
                    "rgba(255,255,255,.018)",
                }}
              >
                <div className="flex items-center gap-3">
                  <CalendarDays
                    size={18}
                    color={COLORS.purpleLight}
                  />

                  <div>
                    <div className="text-sm font-semibold">
                      Curriculum overview
                    </div>

                    <div
                      className="mt-1 text-xs"
                      style={{
                        color: COLORS.muted,
                      }}
                    >
                      {publishedSections} of{" "}
                      {sections.length} sections
                      published ·{" "}
                      {publishedLessons} of{" "}
                      {totalLessons} lessons
                      published
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{
                      background:
                        COLORS.success,
                    }}
                  />

                  <span
                    style={{
                      color: COLORS.muted,
                    }}
                  >
                    Published
                  </span>
                </div>
              </div>
            )}
        </div>
      </div>
    </>
  );
}