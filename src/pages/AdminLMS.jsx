// import { useEffect, useMemo, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import toast from "react-hot-toast";
// import {
//   ArrowLeft,
//   BookOpen,
//   ChevronDown,
//   ChevronRight,
//   Edit3,
//   ExternalLink,
//   FileText,
//   GripVertical,
//   Loader2,
//   Plus,
//   Radio,
//   Save,
//   Trash2,
//   Video,
//   X,
// } from "lucide-react";
// import API from "../services/api";

// const COLORS = {
//   bg: "#07080D",
//   panel: "#10121A",
//   panel2: "#15121F",
//   border: "rgba(255,255,255,.10)",
//   purple: "#9B2CFF",
//   purple2: "#7B2CFF",
//   pink: "#FF2AAE",
//   text: "#FFFFFF",
//   muted: "#AAA5B8",
// };

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

// const normalizeArray = (value) => {
//   if (Array.isArray(value)) return value;
//   if (Array.isArray(value?.data)) return value.data;
//   if (Array.isArray(value?.rows)) return value.rows;
//   return [];
// };

// const normalizeCurriculum = (payload) => {
//   const root = payload?.data ?? payload ?? {};
//   const course = root?.course ?? root?.class ?? root?.data?.course ?? null;
//   const sections = normalizeArray(
//     root?.sections ?? root?.curriculum ?? root?.data?.sections
//   );

//   return {
//     course,
//     sections: sections.map((section) => ({
//       ...section,
//       lessons: normalizeArray(section.lessons ?? section.course_lessons),
//     })),
//   };
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

// const normalizeLessonType = (value) => {
//   const type = String(value || "").toUpperCase();

//   if (type === "VIDEO" || type === "DIRECT_VIDEO") return "VIDEO";
//   if (type === "YOUTUBE") return "YOUTUBE";
//   if (type === "PDF") return "PDF";
//   if (type === "TEXT") return "TEXT";
//   if (type === "LIVE") return "LIVE";
//   if (type === "EXTERNAL") return "EXTERNAL";

//   // Support older records that may contain "Video".
//   if (type === "VID") return "VIDEO";

//   return "YOUTUBE";
// };

// const getLessonIcon = (type) => {
//   switch (normalizeLessonType(type)) {
//     case "YOUTUBE":
//       return <Video size={16} />;
//     case "VIDEO":
//       return <Video size={16} />;
//     case "PDF":
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

// const getAuthConfig = async () => {
//   let token = localStorage.getItem("token");

//   try {
//     const { getAuth } = await import("firebase/auth");
//     const auth = getAuth();

//     if (auth.currentUser) {
//       token = await auth.currentUser.getIdToken(true);
//     }
//   } catch (error) {
//     console.warn("Firebase token lookup failed:", error);
//   }

//   return {
//     headers: token
//       ? {
//           Authorization: `Bearer ${token}`,
//         }
//       : {},
//   };
// };

// function InputStyles() {
//   return (
//     <style>{`
//       .input {
//         width: 100%;
//         border-radius: 0.75rem;
//         border: 1px solid rgba(255,255,255,.10);
//         background: #181820;
//         padding: 0.75rem 1rem;
//         color: #fff;
//         outline: none;
//         transition: border-color .2s ease, box-shadow .2s ease, background .2s ease;
//       }
//       .input::placeholder {
//         color: #666171;
//       }
//       .input:focus {
//         border-color: rgba(155,44,255,.8);
//         box-shadow: 0 0 0 3px rgba(155,44,255,.14);
//         background: #1a1a23;
//       }
//       .input option {
//         background: #181820;
//         color: #fff;
//       }
//     `}</style>
//   );
// }

// export default function AdminLMS() {

//   const { classId } = useParams();
//   const navigate = useNavigate();

//   const [course, setCourse] = useState(null);
//   const [sections, setSections] = useState([]);
//   const [classes, setClasses] = useState([]);

//   const [loading, setLoading] = useState(true);
//   const [classesLoading, setClassesLoading] = useState(false);
//   const [saving, setSaving] = useState(false);

//   const [openSections, setOpenSections] = useState({});

//   const [sectionModal, setSectionModal] = useState(null);
//   const [sectionForm, setSectionForm] = useState(EMPTY_SECTION);

//   const [lessonModal, setLessonModal] = useState(null);
//   const [lessonForm, setLessonForm] = useState(EMPTY_LESSON);

//   const classTitle = useMemo(
//     () => course?.title || course?.name || "Class Curriculum",
//     [course]
//   );

//   const loadClasses = async () => {
//     setClassesLoading(true);

//     try {
//       const config = await getAuthConfig();
//       const response = await API.get("/classes/trainer/my-classes", config);
//       const normalized = normalizeClasses(response.data);
//       setClasses(normalized);
//     } catch (error) {
//       console.error("Trainer LMS classes load error:", error);
//       toast.error(
//         error?.response?.data?.message || "Failed to load your classes"
//       );
//       setClasses([]);
//     } finally {
//       setClassesLoading(false);
//       setLoading(false);
//     }
//   };

//   const loadCurriculum = async () => {
//     if (!classId) {
//       await loadClasses();
//       return;
//     }

//     setLoading(true);

//     try {
//       const config = await getAuthConfig();
//       const response = await API.get(
//         `/lms/trainer/classes/${classId}/curriculum`,
//         config
//       );

//       const normalized = normalizeCurriculum(response.data);

//       setCourse(normalized.course);
//       setSections(normalized.sections);

//       setOpenSections((previous) => {
//         const next = { ...previous };

//         normalized.sections.forEach((section, index) => {
//           if (next[section.id] === undefined) {
//             next[section.id] = index === 0;
//           }
//         });

//         return next;
//       });
//     } catch (error) {
//       console.error("Trainer LMS load error:", error);
//       toast.error(
//         error?.response?.data?.message || "Failed to load curriculum"
//       );
//       setCourse(null);
//       setSections([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadCurriculum();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [classId]);

//   const createSection = () => {
//     setSectionForm({
//       ...EMPTY_SECTION,
//       sort_order: sections.length,
//     });
//     setSectionModal({ mode: "create" });
//   };

//   const editSection = (section) => {
//     setSectionForm({
//       title: section.title || "",
//       description: section.description || "",
//       sort_order: section.sort_order ?? 0,
//       is_published: Number(section.is_published) ? 1 : 0,
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
//       const config = await getAuthConfig();

//       const payload = {
//         title: sectionForm.title.trim(),
//         description: sectionForm.description?.trim() || null,
//         sort_order: Number(sectionForm.sort_order) || 0,
//         is_published: Number(sectionForm.is_published) ? 1 : 0,
//       };

//       if (sectionModal.mode === "create") {
//         await API.post(
//           `/lms/trainer/classes/${classId}/sections`,
//           payload,
//           config
//         );
//         toast.success("Section created");
//       } else {
//         await API.put(
//           `/lms/trainer/sections/${sectionModal.id}`,
//           payload,
//           config
//         );
//         toast.success("Section updated");
//       }

//       setSectionModal(null);
//       await loadCurriculum();
//     } catch (error) {
//       console.error("Save section error:", error);
//       toast.error(
//         error?.response?.data?.message || "Unable to save section"
//       );
//     } finally {
//       setSaving(false);
//     }
//   };

//   const deleteSection = async (section) => {
//     if (
//       !window.confirm(
//         `Delete section "${section.title}" and its lessons?`
//       )
//     ) {
//       return;
//     }

//     try {
//       const config = await getAuthConfig();
//       await API.delete(`/lms/trainer/sections/${section.id}`, config);

//       toast.success("Section deleted");
//       await loadCurriculum();
//     } catch (error) {
//       console.error("Delete section error:", error);
//       toast.error(
//         error?.response?.data?.message || "Unable to delete section"
//       );
//     }
//   };

//   const createLesson = (section) => {
//     setLessonForm({
//       ...EMPTY_LESSON,
//       sort_order: section.lessons?.length || 0,
//     });

//     setLessonModal({
//       mode: "create",
//       sectionId: section.id,
//     });
//   };

//   const editLesson = (section, lesson) => {
//     setLessonForm({
//       title: lesson.title || "",
//       description: lesson.description || "",
//       lesson_type: normalizeLessonType(
//         lesson.lesson_type || lesson.type
//       ),
//       youtube_url: lesson.youtube_url || lesson.Video_url || "",
//       content: lesson.content || "",
//       resource_url: lesson.resource_url || "",
//       duration_minutes: lesson.duration_minutes ?? "",
//       is_preview: Number(lesson.is_preview) ? 1 : 0,
//       sort_order: lesson.sort_order ?? 0,
//       is_published: Number(lesson.is_published) ? 1 : 0,
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

//     setSaving(true);

//     try {
//       const config = await getAuthConfig();

//       const payload = {
//         title: lessonForm.title.trim(),
//         description: lessonForm.description?.trim() || null,
//         lesson_type: normalizeLessonType(lessonForm.lesson_type),
//         youtube_url:
//           normalizeLessonType(lessonForm.lesson_type) === "YOUTUBE"
//             ? lessonForm.youtube_url?.trim() || null
//             : null,
//         content:
//           normalizeLessonType(lessonForm.lesson_type) === "TEXT"
//             ? lessonForm.content || null
//             : null,
//         resource_url:
//           ["VIDEO", "PDF", "LIVE", "EXTERNAL"].includes(
//             normalizeLessonType(lessonForm.lesson_type)
//           )
//             ? lessonForm.resource_url?.trim() || null
//             : null,
//         duration_minutes:
//           lessonForm.duration_minutes === ""
//             ? null
//             : Number(lessonForm.duration_minutes),
//         is_preview: Number(lessonForm.is_preview) ? 1 : 0,
//         sort_order: Number(lessonForm.sort_order) || 0,
//         is_published: Number(lessonForm.is_published) ? 1 : 0,
//       };

//       if (lessonModal.mode === "create") {
//         await API.post(
//           `/lms/trainer/sections/${lessonModal.sectionId}/lessons`,
//           payload,
//           config
//         );
//         toast.success("Lesson created");
//       } else {
//         await API.put(
//           `/lms/trainer/lessons/${lessonModal.id}`,
//           payload,
//           config
//         );
//         toast.success("Lesson updated");
//       }

//       setLessonModal(null);
//       await loadCurriculum();
//     } catch (error) {
//       console.error("Save lesson error:", error);
//       toast.error(
//         error?.response?.data?.message || "Unable to save lesson"
//       );
//     } finally {
//       setSaving(false);
//     }
//   };

//   const deleteLesson = async (lesson) => {
//     if (!window.confirm(`Delete lesson "${lesson.title}"?`)) {
//       return;
//     }

//     try {
//       const config = await getAuthConfig();
//       await API.delete(`/lms/trainer/lessons/${lesson.id}`, config);

//       toast.success("Lesson deleted");
//       await loadCurriculum();
//     } catch (error) {
//       console.error("Delete lesson error:", error);
//       toast.error(
//         error?.response?.data?.message || "Unable to delete lesson"
//       );
//     }
//   };

//   const toggleSection = (id) => {
//     setOpenSections((previous) => ({
//       ...previous,
//       [id]: !previous[id],
//     }));
//   };

//   const totalLessons = sections.reduce(
//     (sum, section) => sum + (section.lessons?.length || 0),
//     0
//   );

//   const publishedSections = sections.filter(
//     (section) => Number(section.is_published)
//   ).length;

//   const publishedLessons = sections.reduce(
//     (sum, section) =>
//       sum +
//       (section.lessons || []).filter(
//         (lesson) => Number(lesson.is_published)
//       ).length,
//     0
//   );

//   // ------------------------------------------------------------
//   // CLASS SELECTION SCREEN
//   // ------------------------------------------------------------
//   if (!classId) {
//     return (
//       <>
//         <InputStyles />
//         <div
//           className="min-h-screen text-white"
//           style={{ background: COLORS.bg }}
//         >
//         <div className="mx-auto max-w-7xl space-y-7">
//           <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
//             <div>
//               <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-purple-300">
//                 <BookOpen size={15} />
//                 Trainer LMS
//               </div>

//               <h1 className="mt-2 text-3xl font-bold tracking-tight">
//                 Learning Management System
//               </h1>

//               <p
//                 className="mt-2 max-w-2xl text-sm leading-6"
//                 style={{ color: COLORS.muted }}
//               >
//                 Select one of your classes to create and manage its
//                 curriculum, sections, and lessons.
//               </p>
//             </div>
//           </div>

//           {classesLoading ? (
//             <div
//               className="rounded-2xl border p-14 text-center"
//               style={{
//                 borderColor: COLORS.border,
//                 background: COLORS.panel,
//               }}
//             >
//               <Loader2
//                 className="mx-auto animate-spin text-purple-400"
//                 size={34}
//               />
//               <p
//                 className="mt-4 text-sm"
//                 style={{ color: COLORS.muted }}
//               >
//                 Loading your classes...
//               </p>
//             </div>
//           ) : classes.length === 0 ? (
//             <div
//               className="rounded-2xl border p-14 text-center"
//               style={{
//                 borderColor: COLORS.border,
//                 background: COLORS.panel,
//               }}
//             >
//               <BookOpen
//                 className="mx-auto text-purple-400"
//                 size={42}
//               />

//               <h2 className="mt-5 text-xl font-semibold">
//                 No classes available
//               </h2>

//               <p
//                 className="mx-auto mt-2 max-w-lg text-sm leading-6"
//                 style={{ color: COLORS.muted }}
//               >
//                 Create a class from My Classes first. Your LMS content
//                 is attached to an existing trainer class.
//               </p>

//               <button
//                 type="button"
//                 onClick={() => navigate("/trainer/classes")}
//                 className="mt-6 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition hover:opacity-90"
//                 style={{
//                   background: `linear-gradient(135deg, ${COLORS.purple}, ${COLORS.pink})`,
//                 }}
//               >
//                 <ArrowLeft size={17} />
//                 Go to My Classes
//               </button>
//             </div>
//           ) : (
//             <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
//               {classes.map((item) => {
//                 const id = item.id ?? item.class_id;
//                 const title =
//                   item.title ||
//                   item.name ||
//                   item.class_name ||
//                   "Untitled class";

//                 const category =
//                   item.category_name ||
//                   item.category ||
//                   item.subcategory_name ||
//                   "Not available";

//                 const image =
//                   item.image_url ||
//                   item.image ||
//                   item.thumbnail ||
//                   null;

//                 return (
//                   <button
//                     key={id}
//                     type="button"
//                     onClick={() =>
//                       navigate(`/trainer/lms/${id}`)
//                     }
//                     className="group overflow-hidden rounded-2xl border text-left transition hover:-translate-y-0.5 hover:border-purple-500/50"
//                     style={{
//                       borderColor: COLORS.border,
//                       background: COLORS.panel,
//                     }}
//                   >
//                     <div className="h-44 overflow-hidden bg-[#181820]">
//                       {image ? (
//                         <img
//                           src={image}
//                           alt={title}
//                           className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
//                         />
//                       ) : (
//                         <div className="flex h-full items-center justify-center">
//                           <BookOpen
//                             size={42}
//                             className="text-purple-400"
//                           />
//                         </div>
//                       )}
//                     </div>

//                     <div className="p-5">
//                       <div className="flex items-start justify-between gap-3">
//                         <div className="min-w-0">
//                           <h2 className="truncate text-lg font-semibold text-white">
//                             {title}
//                           </h2>

//                           <p
//                             className="mt-1 text-sm"
//                             style={{ color: COLORS.muted }}
//                           >
//                             {category}
//                           </p>
//                         </div>

//                         <ChevronRight
//                           size={20}
//                           className="shrink-0 text-purple-300 transition group-hover:translate-x-1"
//                         />
//                       </div>

//                       <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
//                         <span className="text-xs text-white/45">
//                           Manage curriculum
//                         </span>

//                         <span className="text-sm font-semibold text-purple-300">
//                           Open LMS
//                         </span>
//                       </div>
//                     </div>
//                   </button>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       </div>
//       </>
//     );
//   }

//   // ------------------------------------------------------------
//   // CLASS LMS SCREEN
//   // ------------------------------------------------------------
//   return (
//     <>
//       <InputStyles />
//       <div
//         className="min-h-screen text-white"
//         style={{ background: COLORS.bg }}
//       >
//       <div className="mx-auto max-w-7xl space-y-6">
//         {/* Header */}
//         <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
//           <div className="flex min-w-0 items-start gap-3">
//             <button
//               type="button"
//               onClick={() => navigate("/trainer/lms")}
//               className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition hover:bg-white/5"
//               style={{ borderColor: COLORS.border }}
//               title="Back to LMS classes"
//             >
//               <ArrowLeft size={19} />
//             </button>

//             <div className="min-w-0">
//               <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-purple-300">
//                 <BookOpen size={14} />
//                 Trainer LMS
//               </div>

//               <h1 className="mt-1 truncate text-2xl font-bold sm:text-3xl">
//                 {classTitle}
//               </h1>

//               <p
//                 className="mt-1 max-w-2xl text-sm leading-6"
//                 style={{ color: COLORS.muted }}
//               >
//                 Build the curriculum that enrolled students will see
//                 in their Learning dashboard.
//               </p>
//             </div>
//           </div>

//           <button
//             type="button"
//             onClick={createSection}
//             className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold text-white shadow-lg shadow-purple-500/20 transition hover:opacity-90"
//             style={{
//               background: `linear-gradient(135deg, ${COLORS.purple}, ${COLORS.pink})`,
//             }}
//           >
//             <Plus size={18} />
//             Add Section
//           </button>
//         </div>

//         {/* Course summary */}
//         <div
//           className="rounded-2xl border p-5"
//           style={{
//             borderColor: "rgba(155,44,255,.28)",
//             background:
//               "linear-gradient(135deg, rgba(155,44,255,.12), rgba(255,42,174,.05) 45%, #10121A 100%)",
//           }}
//         >
//           <div className="grid gap-4 md:grid-cols-4">
//             <Stat label="Sections" value={sections.length} />
//             <Stat label="Lessons" value={totalLessons} />
//             <Stat
//               label="Published sections"
//               value={publishedSections}
//             />
//             <Stat
//               label="Published lessons"
//               value={publishedLessons}
//             />
//           </div>
//         </div>

//         {/* Curriculum */}
//         {loading ? (
//           <div
//             className="rounded-2xl border p-12 text-center"
//             style={{
//               borderColor: COLORS.border,
//               background: COLORS.panel,
//             }}
//           >
//             <Loader2
//               className="mx-auto animate-spin text-purple-400"
//               size={32}
//             />

//             <p
//               className="mt-4 text-sm"
//               style={{ color: COLORS.muted }}
//             >
//               Loading curriculum...
//             </p>
//           </div>
//         ) : sections.length === 0 ? (
//           <div
//             className="rounded-2xl border p-12 text-center"
//             style={{
//               borderColor: COLORS.border,
//               background: COLORS.panel,
//             }}
//           >
//             <BookOpen
//               className="mx-auto text-purple-400"
//               size={38}
//             />

//             <h2 className="mt-4 text-lg font-semibold">
//               No curriculum yet
//             </h2>

//             <p
//               className="mx-auto mt-2 max-w-md text-sm leading-6"
//               style={{ color: COLORS.muted }}
//             >
//               Create your first section, then add lessons inside it.
//               Students will receive this content through their enrolled
//               class.
//             </p>

//             <button
//               type="button"
//               onClick={createSection}
//               className="mt-5 inline-flex items-center gap-2 rounded-xl px-5 py-3 font-semibold text-white"
//               style={{
//                 background: `linear-gradient(135deg, ${COLORS.purple}, ${COLORS.pink})`,
//               }}
//             >
//               <Plus size={17} />
//               Create First Section
//             </button>
//           </div>
//         ) : (
//           <div className="space-y-4">
//             {sections.map((section, index) => {
//               const isOpen = openSections[section.id] !== false;
//               const lessons = section.lessons || [];

//               return (
//                 <section
//                   key={section.id}
//                   className="overflow-hidden rounded-2xl border"
//                   style={{
//                     borderColor: COLORS.border,
//                     background: COLORS.panel,
//                   }}
//                 >
//                   {/* Section header */}
//                   <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
//                     <button
//                       type="button"
//                       onClick={() => toggleSection(section.id)}
//                       className="flex min-w-0 items-center gap-3 text-left"
//                     >
//                       {isOpen ? (
//                         <ChevronDown size={19} />
//                       ) : (
//                         <ChevronRight size={19} />
//                       )}

//                       <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-purple-500/15 text-sm font-bold text-purple-300">
//                         {index + 1}
//                       </span>

//                       <span className="min-w-0">
//                         <span className="block truncate font-semibold">
//                           {section.title || "Untitled section"}
//                         </span>

//                         <span
//                           className="mt-1 block text-xs"
//                           style={{ color: COLORS.muted }}
//                         >
//                           {lessons.length} lesson
//                           {lessons.length === 1 ? "" : "s"}
//                           {Number(section.is_published)
//                             ? " • Published"
//                             : " • Draft"}
//                         </span>
//                       </span>
//                     </button>

//                     <div className="flex items-center gap-2 pl-12 sm:pl-0">
//                       <button
//                         type="button"
//                         onClick={() => createLesson(section)}
//                         className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold transition hover:bg-white/5"
//                         style={{ borderColor: COLORS.border }}
//                       >
//                         <Plus size={15} />
//                         Lesson
//                       </button>

//                       <button
//                         type="button"
//                         onClick={() => editSection(section)}
//                         className="rounded-lg border p-2 transition hover:bg-white/5"
//                         style={{ borderColor: COLORS.border }}
//                         title="Edit section"
//                       >
//                         <Edit3 size={15} />
//                       </button>

//                       <button
//                         type="button"
//                         onClick={() => deleteSection(section)}
//                         className="rounded-lg border border-red-500/20 p-2 text-red-300 transition hover:bg-red-500/10"
//                         title="Delete section"
//                       >
//                         <Trash2 size={15} />
//                       </button>
//                     </div>
//                   </div>

//                   {/* Section content */}
//                   {isOpen && (
//                     <div
//                       className="border-t px-4 pb-4"
//                       style={{ borderColor: COLORS.border }}
//                     >
//                       {section.description && (
//                         <p
//                           className="py-4 text-sm leading-6"
//                           style={{ color: COLORS.muted }}
//                         >
//                           {section.description}
//                         </p>
//                       )}

//                       {lessons.length === 0 ? (
//                         <div
//                           className="rounded-xl border border-dashed p-7 text-center"
//                           style={{ borderColor: COLORS.border }}
//                         >
//                           <p
//                             className="text-sm"
//                             style={{ color: COLORS.muted }}
//                           >
//                             No lessons in this section.
//                           </p>

//                           <button
//                             type="button"
//                             onClick={() => createLesson(section)}
//                             className="mt-3 text-sm font-semibold text-purple-300 transition hover:text-purple-200"
//                           >
//                             + Add lesson
//                           </button>
//                         </div>
//                       ) : (
//                         <div className="space-y-2 pt-4">
//                           {lessons.map((lesson) => (
//                             <div
//                               key={lesson.id}
//                               className="flex flex-col gap-3 rounded-xl border p-3 transition hover:border-purple-500/20 sm:flex-row sm:items-center sm:justify-between"
//                               style={{
//                                 borderColor: COLORS.border,
//                                 background: COLORS.panel2,
//                               }}
//                             >
//                               <div className="flex min-w-0 items-center gap-3">
//                                 <GripVertical
//                                   size={16}
//                                   className="shrink-0 text-white/25"
//                                 />

//                                 <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-500/10 text-purple-300">
//                                   {getLessonIcon(
//                                     lesson.lesson_type || lesson.type
//                                   )}
//                                 </div>

//                                 <div className="min-w-0">
//                                   <p className="truncate text-sm font-semibold">
//                                     {lesson.title || "Untitled lesson"}
//                                   </p>

//                                   <p
//                                     className="mt-1 text-xs"
//                                     style={{ color: COLORS.muted }}
//                                   >
//                                     {getLessonTypeLabel(
//                                       lesson.lesson_type || lesson.type
//                                     )}
//                                     {lesson.duration_minutes
//                                       ? ` • ${lesson.duration_minutes} min`
//                                       : ""}
//                                     {Number(lesson.is_preview)
//                                       ? " • Preview"
//                                       : ""}
//                                     {Number(lesson.is_published)
//                                       ? " • Published"
//                                       : " • Draft"}
//                                   </p>
//                                 </div>
//                               </div>

//                               <div className="flex items-center gap-2 pl-12 sm:pl-0">
//                                 <button
//                                   type="button"
//                                   onClick={() =>
//                                     editLesson(section, lesson)
//                                   }
//                                   className="rounded-lg border p-2 transition hover:bg-white/5"
//                                   style={{
//                                     borderColor: COLORS.border,
//                                   }}
//                                   title="Edit lesson"
//                                 >
//                                   <Edit3 size={15} />
//                                 </button>

//                                 <button
//                                   type="button"
//                                   onClick={() => deleteLesson(lesson)}
//                                   className="rounded-lg border border-red-500/20 p-2 text-red-300 transition hover:bg-red-500/10"
//                                   title="Delete lesson"
//                                 >
//                                   <Trash2 size={15} />
//                                 </button>
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </section>
//               );
//             })}
//           </div>
//         )}
//       </div>

//       {/* CREATE / EDIT SECTION MODAL */}
//       {sectionModal && (
//         <Modal
//           title={
//             sectionModal.mode === "create"
//               ? "Create Section"
//               : "Edit Section"
//           }
//           subtitle="Organize your course content into sections."
//           onClose={() => !saving && setSectionModal(null)}
//         >
//           <form onSubmit={saveSection} className="space-y-5">
//             <Field label="Section title" required>
//               <input
//                 autoFocus
//                 type="text"
//                 value={sectionForm.title}
//                 onChange={(event) =>
//                   setSectionForm({
//                     ...sectionForm,
//                     title: event.target.value,
//                   })
//                 }
//                 className="input"
//                 placeholder="e.g. Module 1 - Introduction"
//               />
//             </Field>

//             <Field label="Description" optional>
//               <textarea
//                 value={sectionForm.description}
//                 onChange={(event) =>
//                   setSectionForm({
//                     ...sectionForm,
//                     description: event.target.value,
//                   })
//                 }
//                 rows={4}
//                 className="input resize-none leading-6"
//                 placeholder="Add a short description for this section..."
//               />
//             </Field>

//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//               <Field label="Sort order">
//                 <input
//                   type="number"
//                   min="0"
//                   value={sectionForm.sort_order}
//                   onChange={(event) =>
//                     setSectionForm({
//                       ...sectionForm,
//                       sort_order: event.target.value,
//                     })
//                   }
//                   className="input"
//                 />
//               </Field>

//               <div>
//                 <span className="mb-2 block text-sm font-medium text-gray-200">
//                   Visibility
//                 </span>

//                 <Toggle
//                   label="Published"
//                   helper="Visible to enrolled students"
//                   checked={Number(sectionForm.is_published) === 1}
//                   onChange={(value) =>
//                     setSectionForm({
//                       ...sectionForm,
//                       is_published: value ? 1 : 0,
//                     })
//                   }
//                 />
//               </div>
//             </div>

//             <ModalActions
//               saving={saving}
//               onCancel={() => setSectionModal(null)}
//               submitLabel={
//                 sectionModal.mode === "create"
//                   ? "Save Section"
//                   : "Update Section"
//               }
//             />
//           </form>
//         </Modal>
//       )}

//       {/* CREATE / EDIT LESSON MODAL */}
//       {lessonModal && (
//         <Modal
//           title={
//             lessonModal.mode === "create"
//               ? "Create Lesson"
//               : "Edit Lesson"
//           }
//           subtitle="Add learning material to this section."
//           onClose={() => !saving && setLessonModal(null)}
//           wide
//         >
//           <form onSubmit={saveLesson} className="space-y-5">
//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//               <Field label="Lesson title" required>
//                 <input
//                   autoFocus
//                   type="text"
//                   value={lessonForm.title}
//                   onChange={(event) =>
//                     setLessonForm({
//                       ...lessonForm,
//                       title: event.target.value,
//                     })
//                   }
//                   className="input"
//                   placeholder="e.g. Introduction to Basic Postures"
//                 />
//               </Field>

//               <Field label="Lesson type">
//                 <select
//                   value={lessonForm.lesson_type}
//                   onChange={(event) =>
//                     setLessonForm({
//                       ...lessonForm,
//                       lesson_type: event.target.value,
//                     })
//                   }
//                   className="input"
//                 >
//                   <option value="YOUTUBE">YouTube</option>
//                   <option value="VIDEO">Video</option>
//                   <option value="PDF">PDF</option>
//                   <option value="TEXT">Text</option>
//                   <option value="LIVE">Live</option>
//                   <option value="EXTERNAL">External</option>
//                 </select>
//               </Field>
//             </div>

//             <Field label="Description" optional>
//               <textarea
//                 value={lessonForm.description}
//                 onChange={(event) =>
//                   setLessonForm({
//                     ...lessonForm,
//                     description: event.target.value,
//                   })
//                 }
//                 rows={4}
//                 className="input resize-none leading-6"
//                 placeholder="Add a short description for this lesson..."
//               />
//             </Field>

//             {lessonForm.lesson_type === "YOUTUBE" && (
//               <Field label="YouTube URL">
//                 <input
//                   type="url"
//                   value={lessonForm.youtube_url}
//                   onChange={(event) =>
//                     setLessonForm({
//                       ...lessonForm,
//                       youtube_url: event.target.value,
//                     })
//                   }
//                   className="input"
//                   placeholder="https://www.youtube.com/watch?v=..."
//                 />
//               </Field>
//             )}

//             {lessonForm.lesson_type === "VIDEO" && (
//               <Field label="Video URL">
//                 <input
//                   type="url"
//                   value={lessonForm.resource_url}
//                   onChange={(event) =>
//                     setLessonForm({
//                       ...lessonForm,
//                       resource_url: event.target.value,
//                     })
//                   }
//                   className="input"
//                   placeholder="Direct video URL"
//                 />
//               </Field>
//             )}

//             {(lessonForm.lesson_type === "PDF" ||
//               lessonForm.lesson_type === "EXTERNAL") && (
//               <Field
//                 label={
//                   lessonForm.lesson_type === "PDF"
//                     ? "PDF URL"
//                     : "External URL"
//                 }
//               >
//                 <input
//                   type="url"
//                   value={lessonForm.resource_url}
//                   onChange={(event) =>
//                     setLessonForm({
//                       ...lessonForm,
//                       resource_url: event.target.value,
//                     })
//                   }
//                   className="input"
//                   placeholder="https://..."
//                 />
//               </Field>
//             )}

//             {lessonForm.lesson_type === "TEXT" && (
//               <Field label="Lesson content">
//                 <textarea
//                   value={lessonForm.content}
//                   onChange={(event) =>
//                     setLessonForm({
//                       ...lessonForm,
//                       content: event.target.value,
//                     })
//                   }
//                   rows={8}
//                   className="input resize-y leading-6"
//                   placeholder="Write the lesson content here..."
//                 />
//               </Field>
//             )}

//             {lessonForm.lesson_type === "LIVE" && (
//               <Field label="Live session / meeting URL">
//                 <input
//                   type="url"
//                   value={lessonForm.resource_url}
//                   onChange={(event) =>
//                     setLessonForm({
//                       ...lessonForm,
//                       resource_url: event.target.value,
//                     })
//                   }
//                   className="input"
//                   placeholder="Zoom / meeting URL"
//                 />
//               </Field>
//             )}

//             <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
//               <Field label="Duration (minutes)">
//                 <input
//                   type="number"
//                   min="0"
//                   value={lessonForm.duration_minutes}
//                   onChange={(event) =>
//                     setLessonForm({
//                       ...lessonForm,
//                       duration_minutes: event.target.value,
//                     })
//                   }
//                   className="input"
//                   placeholder="Optional"
//                 />
//               </Field>

//               <Field label="Sort order">
//                 <input
//                   type="number"
//                   min="0"
//                   value={lessonForm.sort_order}
//                   onChange={(event) =>
//                     setLessonForm({
//                       ...lessonForm,
//                       sort_order: event.target.value,
//                     })
//                   }
//                   className="input"
//                 />
//               </Field>

//               <div className="space-y-3">
//                 <Toggle
//                   label="Published"
//                   helper="Visible to students"
//                   checked={Number(lessonForm.is_published) === 1}
//                   onChange={(value) =>
//                     setLessonForm({
//                       ...lessonForm,
//                       is_published: value ? 1 : 0,
//                     })
//                   }
//                 />

//                 <Toggle
//                   label="Student preview"
//                   helper="Available before enrollment"
//                   checked={Number(lessonForm.is_preview) === 1}
//                   onChange={(value) =>
//                     setLessonForm({
//                       ...lessonForm,
//                       is_preview: value ? 1 : 0,
//                     })
//                   }
//                 />
//               </div>
//             </div>

//             <ModalActions
//               saving={saving}
//               onCancel={() => setLessonModal(null)}
//               submitLabel={
//                 lessonModal.mode === "create"
//                   ? "Save Lesson"
//                   : "Update Lesson"
//               }
//             />
//           </form>
//         </Modal>
//       )}
//       </div>
//     </>
//   );
// }

// function Stat({ label, value }) {
//   return (
//     <div className="rounded-xl border border-white/10 bg-black/20 p-4">
//       <p className="text-xs uppercase tracking-wider text-white/45">
//         {label}
//       </p>
//       <p className="mt-2 text-2xl font-bold text-white">{value}</p>
//     </div>
//   );
// }

// function Field({ label, required = false, optional = false, children }) {
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

// function Toggle({ label, helper, checked, onChange }) {
//   return (
//     <label className="flex min-h-[64px] cursor-pointer items-center justify-between gap-4 rounded-xl border border-white/10 bg-[#181820] px-4 py-3 transition hover:border-purple-500/40">
//       <div className="min-w-0">
//         <p className="text-sm font-medium text-white">{label}</p>

//         {helper && (
//           <p className="mt-1 text-xs text-gray-500">{helper}</p>
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
//     </label>
//   );
// }

// function Modal({
//   title,
//   subtitle,
//   onClose,
//   children,
//   wide = false,
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
//         {/* Modal Header */}
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
//             className="ml-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-white/10 hover:text-white"
//             title="Close"
//           >
//             <X size={20} />
//           </button>
//         </div>

//         {/* Modal Body */}
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


import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  BookOpen,
  ChevronDown,
  ChevronRight,
  Edit3,
  ExternalLink,
  FileText,
  GripVertical,
  Loader2,
  Plus,
  Radio,
  Save,
  Trash2,
  Video,
  X,
} from "lucide-react";
import API from "../services/api";

const COLORS = {
  bg: "#07080D",
  panel: "#10121A",
  panel2: "#15121F",
  border: "rgba(255,255,255,.10)",
  purple: "#9B2CFF",
  purple2: "#7B2CFF",
  pink: "#FF2AAE",
  text: "#FFFFFF",
  muted: "#AAA5B8",
};

const EMPTY_SECTION = {
  title: "",
  description: "",
  sort_order: 0,
  is_published: 0,
};

const EMPTY_LESSON = {
  title: "",
  description: "",
  lesson_type: "YOUTUBE",
  youtube_url: "",
  content: "",
  resource_url: "",
  duration_minutes: "",
  is_preview: 0,
  sort_order: 0,
  is_published: 0,
};

const normalizeArray = (value) => {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.data)) return value.data;
  if (Array.isArray(value?.rows)) return value.rows;
  return [];
};

const normalizeCurriculum = (payload) => {
  const root = payload?.data ?? payload ?? {};
  const course = root?.course ?? root?.class ?? root?.data?.course ?? null;
  const sections = normalizeArray(
    root?.sections ?? root?.curriculum ?? root?.data?.sections
  );

  return {
    course,
    sections: sections.map((section) => ({
      ...section,
      lessons: normalizeArray(section.lessons ?? section.course_lessons),
    })),
  };
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

const normalizeLessonType = (value) => {
  const type = String(value || "").toUpperCase();

  if (type === "VIDEO" || type === "DIRECT_VIDEO") return "VIDEO";
  if (type === "YOUTUBE") return "YOUTUBE";
  if (type === "PDF") return "PDF";
  if (type === "TEXT") return "TEXT";
  if (type === "LIVE") return "LIVE";
  if (type === "EXTERNAL") return "EXTERNAL";

  // Support older records that may contain "Video".
  if (type === "VID") return "VIDEO";

  return "YOUTUBE";
};

const getLessonIcon = (type) => {
  switch (normalizeLessonType(type)) {
    case "YOUTUBE":
      return <Video size={16} />;
    case "VIDEO":
      return <Video size={16} />;
    case "PDF":
    case "TEXT":
      return <FileText size={16} />;
    case "LIVE":
      return <Radio size={16} />;
    default:
      return <ExternalLink size={16} />;
  }
};

const getLessonTypeLabel = (type) => {
  switch (normalizeLessonType(type)) {
    case "YOUTUBE":
      return "YouTube";
    case "VIDEO":
      return "Video";
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

const getAuthConfig = async () => {
  let token = localStorage.getItem("token");

  try {
    const { getAuth } = await import("firebase/auth");
    const auth = getAuth();

    if (auth.currentUser) {
      token = await auth.currentUser.getIdToken(true);
    }
  } catch (error) {
    console.warn("Firebase token lookup failed:", error);
  }

  return {
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {},
  };
};

function InputStyles() {
  return (
    <style>{`
      .input {
        width: 100%;
        border-radius: 0.75rem;
        border: 1px solid rgba(255,255,255,.10);
        background: #181820;
        padding: 0.75rem 1rem;
        color: #fff;
        outline: none;
        transition: border-color .2s ease, box-shadow .2s ease, background .2s ease;
      }
      .input::placeholder {
        color: #666171;
      }
      .input:focus {
        border-color: rgba(155,44,255,.8);
        box-shadow: 0 0 0 3px rgba(155,44,255,.14);
        background: #1a1a23;
      }
      .input option {
        background: #181820;
        color: #fff;
      }
    `}</style>
  );
}

export default function AdminLMS() {

  const { classId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [sections, setSections] = useState([]);
  const [classes, setClasses] = useState([]);

  const [loading, setLoading] = useState(true);
  const [classesLoading, setClassesLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [openSections, setOpenSections] = useState({});

  const [sectionModal, setSectionModal] = useState(null);
  const [sectionForm, setSectionForm] = useState(EMPTY_SECTION);

  const [lessonModal, setLessonModal] = useState(null);
  const [lessonForm, setLessonForm] = useState(EMPTY_LESSON);

  const classTitle = useMemo(
    () => course?.title || course?.name || "Class Curriculum",
    [course]
  );

  const loadClasses = async () => {
    setClassesLoading(true);

    try {
      const config = await getAuthConfig();
      const response = await API.get("/classes/trainer/my-classes", config);
      const normalized = normalizeClasses(response.data);
      setClasses(normalized);
    } catch (error) {
      console.error("Trainer LMS classes load error:", error);
      toast.error(
        error?.response?.data?.message || "Failed to load your classes"
      );
      setClasses([]);
    } finally {
      setClassesLoading(false);
      setLoading(false);
    }
  };

  const loadCurriculum = async () => {
    if (!classId) {
      await loadClasses();
      return;
    }

    setLoading(true);

    try {
      const config = await getAuthConfig();
      const response = await API.get(
        `/lms/trainer/classes/${classId}/curriculum`,
        config
      );

      const normalized = normalizeCurriculum(response.data);

      setCourse(normalized.course);
      setSections(normalized.sections);

      setOpenSections((previous) => {
        const next = { ...previous };

        normalized.sections.forEach((section, index) => {
          if (next[section.id] === undefined) {
            next[section.id] = index === 0;
          }
        });

        return next;
      });
    } catch (error) {
      console.error("Trainer LMS load error:", error);
      toast.error(
        error?.response?.data?.message || "Failed to load curriculum"
      );
      setCourse(null);
      setSections([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCurriculum();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classId]);

  const createSection = () => {
    setSectionForm({
      ...EMPTY_SECTION,
      sort_order: sections.length,
    });
    setSectionModal({ mode: "create" });
  };

  const editSection = (section) => {
    setSectionForm({
      title: section.title || "",
      description: section.description || "",
      sort_order: section.sort_order ?? 0,
      is_published: Number(section.is_published) ? 1 : 0,
    });

    setSectionModal({
      mode: "edit",
      id: section.id,
    });
  };

  const saveSection = async (event) => {
    event.preventDefault();

    if (!sectionForm.title.trim()) {
      toast.error("Section title is required");
      return;
    }

    setSaving(true);

    try {
      const config = await getAuthConfig();

      const payload = {
        title: sectionForm.title.trim(),
        description: sectionForm.description?.trim() || null,
        sort_order: Number(sectionForm.sort_order) || 0,
        is_published: Number(sectionForm.is_published) ? 1 : 0,
      };

      if (sectionModal.mode === "create") {
        await API.post(
          `/lms/trainer/classes/${classId}/sections`,
          payload,
          config
        );
        toast.success("Section created");
      } else {
        await API.put(
          `/lms/trainer/sections/${sectionModal.id}`,
          payload,
          config
        );
        toast.success("Section updated");
      }

      setSectionModal(null);
      await loadCurriculum();
    } catch (error) {
      console.error("Save section error:", error);
      toast.error(
        error?.response?.data?.message || "Unable to save section"
      );
    } finally {
      setSaving(false);
    }
  };

  const deleteSection = async (section) => {
    if (
      !window.confirm(
        `Delete section "${section.title}" and its lessons?`
      )
    ) {
      return;
    }

    try {
      const config = await getAuthConfig();
      await API.delete(`/lms/trainer/sections/${section.id}`, config);

      toast.success("Section deleted");
      await loadCurriculum();
    } catch (error) {
      console.error("Delete section error:", error);
      toast.error(
        error?.response?.data?.message || "Unable to delete section"
      );
    }
  };

  const createLesson = (section) => {
    setLessonForm({
      ...EMPTY_LESSON,
      sort_order: section.lessons?.length || 0,
    });

    setLessonModal({
      mode: "create",
      sectionId: section.id,
    });
  };

  const editLesson = (section, lesson) => {
    setLessonForm({
      title: lesson.title || "",
      description: lesson.description || "",
      lesson_type: normalizeLessonType(
        lesson.lesson_type || lesson.type
      ),
      youtube_url: lesson.youtube_url || lesson.Video_url || "",
      content: lesson.content || "",
      resource_url: lesson.resource_url || "",
      duration_minutes: lesson.duration_minutes ?? "",
      is_preview: Number(lesson.is_preview) ? 1 : 0,
      sort_order: lesson.sort_order ?? 0,
      is_published: Number(lesson.is_published) ? 1 : 0,
    });

    setLessonModal({
      mode: "edit",
      id: lesson.id,
      sectionId: section.id,
    });
  };

  const saveLesson = async (event) => {
    event.preventDefault();

    if (!lessonForm.title.trim()) {
      toast.error("Lesson title is required");
      return;
    }

    const lessonType = normalizeLessonType(lessonForm.lesson_type);
    const youtubeUrl = lessonForm.youtube_url?.trim() || "";
    const resourceUrl = lessonForm.resource_url?.trim() || "";
    const textContent = lessonForm.content?.trim() || "";

    // Validate fields that the backend requires for each lesson type.
    if (lessonType === "YOUTUBE" && !youtubeUrl) {
      toast.error("YouTube URL is required for a YouTube lesson.");
      return;
    }

    if (lessonType === "VIDEO" && !resourceUrl) {
      toast.error("Video URL is required for a Video lesson.");
      return;
    }

    if (lessonType === "PDF" && !resourceUrl) {
      toast.error("PDF URL is required for a PDF lesson.");
      return;
    }

    if (lessonType === "LIVE" && !resourceUrl) {
      toast.error("Meeting URL is required for a Live lesson.");
      return;
    }

    if (lessonType === "EXTERNAL" && !resourceUrl) {
      toast.error("External URL is required for an External lesson.");
      return;
    }

    if (lessonType === "TEXT" && !textContent) {
      toast.error("Lesson content is required for a Text lesson.");
      return;
    }

    setSaving(true);

    try {
      const config = await getAuthConfig();

      const payload = {
        title: lessonForm.title.trim(),
        description: lessonForm.description?.trim() || null,
        lesson_type: lessonType,
        youtube_url: lessonType === "YOUTUBE" ? youtubeUrl : null,
        content: lessonType === "TEXT" ? textContent : null,
        resource_url:
          ["VIDEO", "PDF", "LIVE", "EXTERNAL"].includes(lessonType)
            ? resourceUrl
            : null,
        duration_minutes:
          lessonForm.duration_minutes === ""
            ? null
            : Number(lessonForm.duration_minutes),
        is_preview: Number(lessonForm.is_preview) ? 1 : 0,
        sort_order: Number(lessonForm.sort_order) || 0,
        is_published: Number(lessonForm.is_published) ? 1 : 0,
      };

      if (lessonModal.mode === "create") {
        await API.post(
          `/lms/trainer/sections/${lessonModal.sectionId}/lessons`,
          payload,
          config
        );
        toast.success("Lesson created");
      } else {
        await API.put(
          `/lms/trainer/lessons/${lessonModal.id}`,
          payload,
          config
        );
        toast.success("Lesson updated");
      }

      setLessonModal(null);
      await loadCurriculum();
    } catch (error) {
      console.error("Save lesson error:", error);
      toast.error(
        error?.response?.data?.message || "Unable to save lesson"
      );
    } finally {
      setSaving(false);
    }
  };

  const deleteLesson = async (lesson) => {
    if (!window.confirm(`Delete lesson "${lesson.title}"?`)) {
      return;
    }

    try {
      const config = await getAuthConfig();
      await API.delete(`/lms/trainer/lessons/${lesson.id}`, config);

      toast.success("Lesson deleted");
      await loadCurriculum();
    } catch (error) {
      console.error("Delete lesson error:", error);
      toast.error(
        error?.response?.data?.message || "Unable to delete lesson"
      );
    }
  };

  const toggleSection = (id) => {
    setOpenSections((previous) => ({
      ...previous,
      [id]: !previous[id],
    }));
  };

  const totalLessons = sections.reduce(
    (sum, section) => sum + (section.lessons?.length || 0),
    0
  );

  const publishedSections = sections.filter(
    (section) => Number(section.is_published)
  ).length;

  const publishedLessons = sections.reduce(
    (sum, section) =>
      sum +
      (section.lessons || []).filter(
        (lesson) => Number(lesson.is_published)
      ).length,
    0
  );

  // ------------------------------------------------------------
  // CLASS SELECTION SCREEN
  // ------------------------------------------------------------
  if (!classId) {
    return (
      <>
        <InputStyles />
        <div
          className="min-h-screen text-white"
          style={{ background: COLORS.bg }}
        >
        <div className="mx-auto max-w-7xl space-y-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-purple-300">
                <BookOpen size={15} />
                Trainer LMS
              </div>

              <h1 className="mt-2 text-3xl font-bold tracking-tight">
                Learning Management System
              </h1>

              <p
                className="mt-2 max-w-2xl text-sm leading-6"
                style={{ color: COLORS.muted }}
              >
                Select one of your classes to create and manage its
                curriculum, sections, and lessons.
              </p>
            </div>
          </div>

          {classesLoading ? (
            <div
              className="rounded-2xl border p-14 text-center"
              style={{
                borderColor: COLORS.border,
                background: COLORS.panel,
              }}
            >
              <Loader2
                className="mx-auto animate-spin text-purple-400"
                size={34}
              />
              <p
                className="mt-4 text-sm"
                style={{ color: COLORS.muted }}
              >
                Loading your classes...
              </p>
            </div>
          ) : classes.length === 0 ? (
            <div
              className="rounded-2xl border p-14 text-center"
              style={{
                borderColor: COLORS.border,
                background: COLORS.panel,
              }}
            >
              <BookOpen
                className="mx-auto text-purple-400"
                size={42}
              />

              <h2 className="mt-5 text-xl font-semibold">
                No classes available
              </h2>

              <p
                className="mx-auto mt-2 max-w-lg text-sm leading-6"
                style={{ color: COLORS.muted }}
              >
                Create a class from My Classes first. Your LMS content
                is attached to an existing trainer class.
              </p>

              <button
                type="button"
                onClick={() => navigate("/trainer/classes")}
                className="mt-6 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition hover:opacity-90"
                style={{
                  background: `linear-gradient(135deg, ${COLORS.purple}, ${COLORS.pink})`,
                }}
              >
                <ArrowLeft size={17} />
                Go to My Classes
              </button>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {classes.map((item) => {
                const id = item.id ?? item.class_id;
                const title =
                  item.title ||
                  item.name ||
                  item.class_name ||
                  "Untitled class";

                const category =
                  item.category_name ||
                  item.category ||
                  item.subcategory_name ||
                  "Not available";

                const image =
                  item.image_url ||
                  item.image ||
                  item.thumbnail ||
                  null;

                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() =>
                      navigate(`/trainer/lms/${id}`)
                    }
                    className="group overflow-hidden rounded-2xl border text-left transition hover:-translate-y-0.5 hover:border-purple-500/50"
                    style={{
                      borderColor: COLORS.border,
                      background: COLORS.panel,
                    }}
                  >
                    <div className="h-44 overflow-hidden bg-[#181820]">
                      {image ? (
                        <img
                          src={image}
                          alt={title}
                          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <BookOpen
                            size={42}
                            className="text-purple-400"
                          />
                        </div>
                      )}
                    </div>

                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h2 className="truncate text-lg font-semibold text-white">
                            {title}
                          </h2>

                          <p
                            className="mt-1 text-sm"
                            style={{ color: COLORS.muted }}
                          >
                            {category}
                          </p>
                        </div>

                        <ChevronRight
                          size={20}
                          className="shrink-0 text-purple-300 transition group-hover:translate-x-1"
                        />
                      </div>

                      <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                        <span className="text-xs text-white/45">
                          Manage curriculum
                        </span>

                        <span className="text-sm font-semibold text-purple-300">
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

  // ------------------------------------------------------------
  // CLASS LMS SCREEN
  // ------------------------------------------------------------
  return (
    <>
      <InputStyles />
      <div
        className="min-h-screen text-white"
        style={{ background: COLORS.bg }}
      >
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 items-start gap-3">
            <button
              type="button"
              onClick={() => navigate("/trainer/lms")}
              className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition hover:bg-white/5"
              style={{ borderColor: COLORS.border }}
              title="Back to LMS classes"
            >
              <ArrowLeft size={19} />
            </button>

            <div className="min-w-0">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-purple-300">
                <BookOpen size={14} />
                Trainer LMS
              </div>

              <h1 className="mt-1 truncate text-2xl font-bold sm:text-3xl">
                {classTitle}
              </h1>

              <p
                className="mt-1 max-w-2xl text-sm leading-6"
                style={{ color: COLORS.muted }}
              >
                Build the curriculum that enrolled students will see
                in their Learning dashboard.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={createSection}
            className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold text-white shadow-lg shadow-purple-500/20 transition hover:opacity-90"
            style={{
              background: `linear-gradient(135deg, ${COLORS.purple}, ${COLORS.pink})`,
            }}
          >
            <Plus size={18} />
            Add Section
          </button>
        </div>

        {/* Course summary */}
        <div
          className="rounded-2xl border p-5"
          style={{
            borderColor: "rgba(155,44,255,.28)",
            background:
              "linear-gradient(135deg, rgba(155,44,255,.12), rgba(255,42,174,.05) 45%, #10121A 100%)",
          }}
        >
          <div className="grid gap-4 md:grid-cols-4">
            <Stat label="Sections" value={sections.length} />
            <Stat label="Lessons" value={totalLessons} />
            <Stat
              label="Published sections"
              value={publishedSections}
            />
            <Stat
              label="Published lessons"
              value={publishedLessons}
            />
          </div>
        </div>

        {/* Curriculum */}
        {loading ? (
          <div
            className="rounded-2xl border p-12 text-center"
            style={{
              borderColor: COLORS.border,
              background: COLORS.panel,
            }}
          >
            <Loader2
              className="mx-auto animate-spin text-purple-400"
              size={32}
            />

            <p
              className="mt-4 text-sm"
              style={{ color: COLORS.muted }}
            >
              Loading curriculum...
            </p>
          </div>
        ) : sections.length === 0 ? (
          <div
            className="rounded-2xl border p-12 text-center"
            style={{
              borderColor: COLORS.border,
              background: COLORS.panel,
            }}
          >
            <BookOpen
              className="mx-auto text-purple-400"
              size={38}
            />

            <h2 className="mt-4 text-lg font-semibold">
              No curriculum yet
            </h2>

            <p
              className="mx-auto mt-2 max-w-md text-sm leading-6"
              style={{ color: COLORS.muted }}
            >
              Create your first section, then add lessons inside it.
              Students will receive this content through their enrolled
              class.
            </p>

            <button
              type="button"
              onClick={createSection}
              className="mt-5 inline-flex items-center gap-2 rounded-xl px-5 py-3 font-semibold text-white"
              style={{
                background: `linear-gradient(135deg, ${COLORS.purple}, ${COLORS.pink})`,
              }}
            >
              <Plus size={17} />
              Create First Section
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {sections.map((section, index) => {
              const isOpen = openSections[section.id] !== false;
              const lessons = section.lessons || [];

              return (
                <section
                  key={section.id}
                  className="overflow-hidden rounded-2xl border"
                  style={{
                    borderColor: COLORS.border,
                    background: COLORS.panel,
                  }}
                >
                  {/* Section header */}
                  <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="button"
                      onClick={() => toggleSection(section.id)}
                      className="flex min-w-0 items-center gap-3 text-left"
                    >
                      {isOpen ? (
                        <ChevronDown size={19} />
                      ) : (
                        <ChevronRight size={19} />
                      )}

                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-purple-500/15 text-sm font-bold text-purple-300">
                        {index + 1}
                      </span>

                      <span className="min-w-0">
                        <span className="block truncate font-semibold">
                          {section.title || "Untitled section"}
                        </span>

                        <span
                          className="mt-1 block text-xs"
                          style={{ color: COLORS.muted }}
                        >
                          {lessons.length} lesson
                          {lessons.length === 1 ? "" : "s"}
                          {Number(section.is_published)
                            ? " • Published"
                            : " • Draft"}
                        </span>
                      </span>
                    </button>

                    <div className="flex items-center gap-2 pl-12 sm:pl-0">
                      <button
                        type="button"
                        onClick={() => createLesson(section)}
                        className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold transition hover:bg-white/5"
                        style={{ borderColor: COLORS.border }}
                      >
                        <Plus size={15} />
                        Lesson
                      </button>

                      <button
                        type="button"
                        onClick={() => editSection(section)}
                        className="rounded-lg border p-2 transition hover:bg-white/5"
                        style={{ borderColor: COLORS.border }}
                        title="Edit section"
                      >
                        <Edit3 size={15} />
                      </button>

                      <button
                        type="button"
                        onClick={() => deleteSection(section)}
                        className="rounded-lg border border-red-500/20 p-2 text-red-300 transition hover:bg-red-500/10"
                        title="Delete section"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>

                  {/* Section content */}
                  {isOpen && (
                    <div
                      className="border-t px-4 pb-4"
                      style={{ borderColor: COLORS.border }}
                    >
                      {section.description && (
                        <p
                          className="py-4 text-sm leading-6"
                          style={{ color: COLORS.muted }}
                        >
                          {section.description}
                        </p>
                      )}

                      {lessons.length === 0 ? (
                        <div
                          className="rounded-xl border border-dashed p-7 text-center"
                          style={{ borderColor: COLORS.border }}
                        >
                          <p
                            className="text-sm"
                            style={{ color: COLORS.muted }}
                          >
                            No lessons in this section.
                          </p>

                          <button
                            type="button"
                            onClick={() => createLesson(section)}
                            className="mt-3 text-sm font-semibold text-purple-300 transition hover:text-purple-200"
                          >
                            + Add lesson
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-2 pt-4">
                          {lessons.map((lesson) => (
                            <div
                              key={lesson.id}
                              className="flex flex-col gap-3 rounded-xl border p-3 transition hover:border-purple-500/20 sm:flex-row sm:items-center sm:justify-between"
                              style={{
                                borderColor: COLORS.border,
                                background: COLORS.panel2,
                              }}
                            >
                              <div className="flex min-w-0 items-center gap-3">
                                <GripVertical
                                  size={16}
                                  className="shrink-0 text-white/25"
                                />

                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-500/10 text-purple-300">
                                  {getLessonIcon(
                                    lesson.lesson_type || lesson.type
                                  )}
                                </div>

                                <div className="min-w-0">
                                  <p className="truncate text-sm font-semibold">
                                    {lesson.title || "Untitled lesson"}
                                  </p>

                                  <p
                                    className="mt-1 text-xs"
                                    style={{ color: COLORS.muted }}
                                  >
                                    {getLessonTypeLabel(
                                      lesson.lesson_type || lesson.type
                                    )}
                                    {lesson.duration_minutes
                                      ? ` • ${lesson.duration_minutes} min`
                                      : ""}
                                    {Number(lesson.is_preview)
                                      ? " • Preview"
                                      : ""}
                                    {Number(lesson.is_published)
                                      ? " • Published"
                                      : " • Draft"}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 pl-12 sm:pl-0">
                                <button
                                  type="button"
                                  onClick={() =>
                                    editLesson(section, lesson)
                                  }
                                  className="rounded-lg border p-2 transition hover:bg-white/5"
                                  style={{
                                    borderColor: COLORS.border,
                                  }}
                                  title="Edit lesson"
                                >
                                  <Edit3 size={15} />
                                </button>

                                <button
                                  type="button"
                                  onClick={() => deleteLesson(lesson)}
                                  className="rounded-lg border border-red-500/20 p-2 text-red-300 transition hover:bg-red-500/10"
                                  title="Delete lesson"
                                >
                                  <Trash2 size={15} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        )}
      </div>

      {/* CREATE / EDIT SECTION MODAL */}
      {sectionModal && (
        <Modal
          title={
            sectionModal.mode === "create"
              ? "Create Section"
              : "Edit Section"
          }
          subtitle="Organize your course content into sections."
          onClose={() => !saving && setSectionModal(null)}
        >
          <form onSubmit={saveSection} className="space-y-5">
            <Field label="Section title" required>
              <input
                autoFocus
                type="text"
                value={sectionForm.title}
                onChange={(event) =>
                  setSectionForm({
                    ...sectionForm,
                    title: event.target.value,
                  })
                }
                className="input"
                placeholder="e.g. Module 1 - Introduction"
              />
            </Field>

            <Field label="Description" optional>
              <textarea
                value={sectionForm.description}
                onChange={(event) =>
                  setSectionForm({
                    ...sectionForm,
                    description: event.target.value,
                  })
                }
                rows={4}
                className="input resize-none leading-6"
                placeholder="Add a short description for this section..."
              />
            </Field>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Sort order">
                <input
                  type="number"
                  min="0"
                  value={sectionForm.sort_order}
                  onChange={(event) =>
                    setSectionForm({
                      ...sectionForm,
                      sort_order: event.target.value,
                    })
                  }
                  className="input"
                />
              </Field>

              <div>
                <span className="mb-2 block text-sm font-medium text-gray-200">
                  Visibility
                </span>

                <Toggle
                  label="Published"
                  helper="Visible to enrolled students"
                  checked={Number(sectionForm.is_published) === 1}
                  onChange={(value) =>
                    setSectionForm({
                      ...sectionForm,
                      is_published: value ? 1 : 0,
                    })
                  }
                />
              </div>
            </div>

            <ModalActions
              saving={saving}
              onCancel={() => setSectionModal(null)}
              submitLabel={
                sectionModal.mode === "create"
                  ? "Save Section"
                  : "Update Section"
              }
            />
          </form>
        </Modal>
      )}

      {/* CREATE / EDIT LESSON MODAL */}
      {lessonModal && (
        <Modal
          title={
            lessonModal.mode === "create"
              ? "Create Lesson"
              : "Edit Lesson"
          }
          subtitle="Add learning material to this section."
          onClose={() => !saving && setLessonModal(null)}
          wide
        >
          <form onSubmit={saveLesson} className="space-y-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Lesson title" required>
                <input
                  autoFocus
                  type="text"
                  value={lessonForm.title}
                  onChange={(event) =>
                    setLessonForm({
                      ...lessonForm,
                      title: event.target.value,
                    })
                  }
                  className="input"
                  placeholder="e.g. Introduction to Basic Postures"
                />
              </Field>

              <Field label="Lesson type">
                <select
                  value={lessonForm.lesson_type}
                  onChange={(event) =>
                    setLessonForm({
                      ...lessonForm,
                      lesson_type: event.target.value,
                    })
                  }
                  className="input"
                >
                  <option value="YOUTUBE">YouTube</option>
                  <option value="VIDEO">Video</option>
                  <option value="PDF">PDF</option>
                  <option value="TEXT">Text</option>
                  <option value="LIVE">Live</option>
                  <option value="EXTERNAL">External</option>
                </select>
              </Field>
            </div>

            <Field label="Description" optional>
              <textarea
                value={lessonForm.description}
                onChange={(event) =>
                  setLessonForm({
                    ...lessonForm,
                    description: event.target.value,
                  })
                }
                rows={4}
                className="input resize-none leading-6"
                placeholder="Add a short description for this lesson..."
              />
            </Field>

            {lessonForm.lesson_type === "YOUTUBE" && (
              <Field label="YouTube URL">
                <input
                  type="url"
                  value={lessonForm.youtube_url}
                  onChange={(event) =>
                    setLessonForm({
                      ...lessonForm,
                      youtube_url: event.target.value,
                    })
                  }
                  className="input"
                  placeholder="https://www.youtube.com/watch?v=..."
                />
              </Field>
            )}

            {lessonForm.lesson_type === "VIDEO" && (
              <Field label="Video URL">
                <input
                  type="url"
                  value={lessonForm.resource_url}
                  onChange={(event) =>
                    setLessonForm({
                      ...lessonForm,
                      resource_url: event.target.value,
                    })
                  }
                  className="input"
                  placeholder="Direct video URL"
                />
              </Field>
            )}

            {(lessonForm.lesson_type === "PDF" ||
              lessonForm.lesson_type === "EXTERNAL") && (
              <Field
                label={
                  lessonForm.lesson_type === "PDF"
                    ? "PDF URL"
                    : "External URL"
                }
              >
                <input
                  type="url"
                  value={lessonForm.resource_url}
                  onChange={(event) =>
                    setLessonForm({
                      ...lessonForm,
                      resource_url: event.target.value,
                    })
                  }
                  className="input"
                  placeholder="https://..."
                />
              </Field>
            )}

            {lessonForm.lesson_type === "TEXT" && (
              <Field label="Lesson content">
                <textarea
                  value={lessonForm.content}
                  onChange={(event) =>
                    setLessonForm({
                      ...lessonForm,
                      content: event.target.value,
                    })
                  }
                  rows={8}
                  className="input resize-y leading-6"
                  placeholder="Write the lesson content here..."
                />
              </Field>
            )}

            {lessonForm.lesson_type === "LIVE" && (
              <Field label="Live session / meeting URL">
                <input
                  type="url"
                  value={lessonForm.resource_url}
                  onChange={(event) =>
                    setLessonForm({
                      ...lessonForm,
                      resource_url: event.target.value,
                    })
                  }
                  className="input"
                  placeholder="Zoom / meeting URL"
                />
              </Field>
            )}

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Field label="Duration (minutes)">
                <input
                  type="number"
                  min="0"
                  value={lessonForm.duration_minutes}
                  onChange={(event) =>
                    setLessonForm({
                      ...lessonForm,
                      duration_minutes: event.target.value,
                    })
                  }
                  className="input"
                  placeholder="Optional"
                />
              </Field>

              <Field label="Sort order">
                <input
                  type="number"
                  min="0"
                  value={lessonForm.sort_order}
                  onChange={(event) =>
                    setLessonForm({
                      ...lessonForm,
                      sort_order: event.target.value,
                    })
                  }
                  className="input"
                />
              </Field>

              <div className="space-y-3">
                <Toggle
                  label="Published"
                  helper="Visible to students"
                  checked={Number(lessonForm.is_published) === 1}
                  onChange={(value) =>
                    setLessonForm({
                      ...lessonForm,
                      is_published: value ? 1 : 0,
                    })
                  }
                />

                <Toggle
                  label="Student preview"
                  helper="Available before enrollment"
                  checked={Number(lessonForm.is_preview) === 1}
                  onChange={(value) =>
                    setLessonForm({
                      ...lessonForm,
                      is_preview: value ? 1 : 0,
                    })
                  }
                />
              </div>
            </div>

            <ModalActions
              saving={saving}
              onCancel={() => setLessonModal(null)}
              submitLabel={
                lessonModal.mode === "create"
                  ? "Save Lesson"
                  : "Update Lesson"
              }
            />
          </form>
        </Modal>
      )}
      </div>
    </>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-4">
      <p className="text-xs uppercase tracking-wider text-white/45">
        {label}
      </p>
      <p className="mt-2 text-2xl font-bold text-white">{value}</p>
    </div>
  );
}

function Field({ label, required = false, optional = false, children }) {
  return (
    <label className="block text-sm">
      <span className="mb-2 block font-medium text-gray-200">
        {label}
        {required && (
          <span className="ml-1 text-pink-400">*</span>
        )}
        {optional && (
          <span className="ml-1 text-xs font-normal text-gray-500">
            (Optional)
          </span>
        )}
      </span>

      {children}
    </label>
  );
}

function Toggle({ label, helper, checked, onChange }) {
  return (
    <label className="flex min-h-[64px] cursor-pointer items-center justify-between gap-4 rounded-xl border border-white/10 bg-[#181820] px-4 py-3 transition hover:border-purple-500/40">
      <div className="min-w-0">
        <p className="text-sm font-medium text-white">{label}</p>

        {helper && (
          <p className="mt-1 text-xs text-gray-500">{helper}</p>
        )}
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          checked ? "bg-purple-500" : "bg-white/10"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition ${
            checked ? "left-6" : "left-1"
          }`}
        />
      </button>
    </label>
  );
}

function Modal({
  title,
  subtitle,
  onClose,
  children,
  wide = false,
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
      <div
        className={`w-full ${
          wide ? "max-w-3xl" : "max-w-xl"
        } max-h-[92vh] overflow-hidden rounded-2xl border shadow-[0_25px_80px_rgba(0,0,0,0.65)]`}
        style={{
          borderColor: COLORS.border,
          background: COLORS.panel,
        }}
      >
        {/* Modal Header */}
        <div
          className="flex items-center justify-between border-b px-6 py-5"
          style={{ borderColor: COLORS.border }}
        >
          <div className="min-w-0">
            <h2 className="text-xl font-semibold text-white">
              {title}
            </h2>

            {subtitle && (
              <p className="mt-1 text-sm text-gray-500">
                {subtitle}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="ml-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-white/10 hover:text-white"
            title="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="max-h-[calc(92vh-80px)] overflow-y-auto px-6 py-6">
          {children}
        </div>
      </div>
    </div>
  );
}

function ModalActions({
  saving,
  onCancel,
  submitLabel = "Save",
}) {
  return (
    <div className="flex items-center justify-end gap-3 border-t border-white/10 pt-5">
      <button
        type="button"
        onClick={onCancel}
        disabled={saving}
        className="rounded-xl border border-white/10 px-5 py-2.5 text-sm font-medium text-gray-300 transition hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        Cancel
      </button>

      <button
        type="submit"
        disabled={saving}
        className="inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        style={{
          background: `linear-gradient(135deg, ${COLORS.purple}, ${COLORS.pink})`,
        }}
      >
        {saving ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <Save size={16} />
        )}

        {saving ? "Saving..." : submitLabel}
      </button>
    </div>
  );
}
