
// import { useCallback, useEffect, useMemo, useState } from "react";
// import {
//   ClipboardList,
//   Edit3,
//   Plus,
//   Search,
//   Trash2,
//   UploadCloud,
//   X,
//   CalendarDays,
//   Clock3,
//   BookOpen,
//   Award,
//   FileText,
//   RefreshCw,
// } from "lucide-react";
// import API from "../services/api";

// /* =========================================================
//    HELPERS
// ========================================================= */

// const EMPTY_FORM = {
//   class_id: "",
//   session_id: "",
//   title: "",
//   description: "",
//   due_date: "",
//   max_marks: 100,
//   status: "DRAFT",
//   attachment_url: "",
// };

// const getId = (item) =>
//   item?.id ??
//   item?.assignment_id ??
//   item?.class_id ??
//   item?.session_id;

// const getList = (response) => {
//   const payload = response?.data ?? response;

//   if (Array.isArray(payload)) return payload;

//   if (Array.isArray(payload?.data)) return payload.data;
//   if (Array.isArray(payload?.assignments)) return payload.assignments;
//   if (Array.isArray(payload?.classes)) return payload.classes;
//   if (Array.isArray(payload?.items)) return payload.items;
//   if (Array.isArray(payload?.rows)) return payload.rows;
//   if (Array.isArray(payload?.results)) return payload.results;

//   return [];
// };

// const getClassId = (item) =>
//   item?.id ??
//   item?.class_id ??
//   item?.classId;

// const getClassName = (item) =>
//   item?.class_name ??
//   item?.className ??
//   item?.name ??
//   item?.title ??
//   item?.class_title ??
//   `Class ${getClassId(item) ?? ""}`;

// const getAssignmentTitle = (item) =>
//   item?.title ??
//   item?.assignment_title ??
//   item?.name ??
//   "Untitled Assignment";

// const getAssignmentClass = (item) =>
//   item?.class_title ??
//   item?.class_name ??
//   item?.className ??
//   item?.class?.name ??
//   "Class";

// const getStatus = (item) =>
//   String(item?.status ?? "DRAFT").toUpperCase();

// const formatDateTime = (value) => {
//   if (!value) return "Not set";

//   const date = new Date(value);

//   if (Number.isNaN(date.getTime())) {
//     return value;
//   }

//   return date.toLocaleString("en-IN", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   });
// };

// /*
//   Converts datetime-local:

//       2026-09-23T17:00

//   into:

//       2026-09-23T11:30:00.000Z

//   This is important because the backend should receive
//   a proper UTC ISO string.
// */
// const localDateTimeToUTC = (value) => {
//   if (!value) return null;

//   const date = new Date(value);

//   if (Number.isNaN(date.getTime())) {
//     return null;
//   }

//   return date.toISOString();
// };

// /*
//   Converts backend ISO date into datetime-local format.
// */
// const utcToLocalDateTime = (value) => {
//   if (!value) return "";

//   const date = new Date(value);

//   if (Number.isNaN(date.getTime())) {
//     return "";
//   }

//   const pad = (number) => String(number).padStart(2, "0");

//   return `${date.getFullYear()}-${pad(
//     date.getMonth() + 1
//   )}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(
//     date.getMinutes()
//   )}`;
// };

// const normalizeAssignment = (assignment) => ({
//   ...EMPTY_FORM,
//   ...assignment,

//   class_id:
//     assignment?.class_id ??
//     assignment?.classId ??
//     assignment?.class?.id ??
//     "",

//   session_id:
//     assignment?.session_id ??
//     assignment?.sessionId ??
//     assignment?.session?.id ??
//     "",

//   title:
//     assignment?.title ??
//     assignment?.assignment_title ??
//     "",

//   description:
//     assignment?.description ??
//     assignment?.instructions ??
//     "",

//   due_date: utcToLocalDateTime(
//     assignment?.due_date ??
//       assignment?.dueDate ??
//       assignment?.deadline
//   ),

//   max_marks:
//     assignment?.max_marks ??
//     assignment?.maxMarks ??
//     100,

//   status:
//     assignment?.status ??
//     "DRAFT",

//   attachment_url:
//     assignment?.attachment_url ??
//     assignment?.attachmentUrl ??
//     "",
// });

// /* =========================================================
//    COMPONENT
// ========================================================= */

// export default function AdminAssignments() {
//   const [items, setItems] = useState([]);
//   const [classes, setClasses] = useState([]);

//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("ALL");

//   const [open, setOpen] = useState(false);
//   const [edit, setEdit] = useState(null);

//   const [saving, setSaving] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [loadingClasses, setLoadingClasses] = useState(false);

//   const [error, setError] = useState("");

//   const [form, setForm] = useState(EMPTY_FORM);

//   /* =========================================================
//      LOAD ASSIGNMENTS
//   ========================================================= */

//   const loadAssignments = useCallback(async () => {
//     try {
//       const response = await API.get(
//         "/assignments/trainer/my-assignments"
//       );

//       const data = getList(response);

//       setItems(data);
//     } catch (error) {
//       console.error("Load assignments error:", error);

//       setItems([]);

//       setError(
//         error?.response?.data?.message ||
//           "Unable to load assignments."
//       );
//     }
//   }, []);

//   /* =========================================================
//      LOAD TRAINER CLASSES
//   ========================================================= */

//   const loadClasses = useCallback(async () => {
//     setLoadingClasses(true);

//     try {
//       const response = await API.get(
//         "/classes/trainer/my-classes"
//       );

//       console.log(
//         "Trainer classes API response:",
//         response?.data
//       );

//       const data = getList(response);

//       console.log("Normalized classes:", data);

//       setClasses(data);
//     } catch (error) {
//       console.error("Load classes error:", error);

//       setClasses([]);

//       setError(
//         error?.response?.data?.message ||
//           "Unable to load your classes."
//       );
//     } finally {
//       setLoadingClasses(false);
//     }
//   }, []);

//   /* =========================================================
//      INITIAL LOAD
//   ========================================================= */

//   const loadData = useCallback(async () => {
//     setLoading(true);
//     setError("");

//     await Promise.all([
//       loadAssignments(),
//       loadClasses(),
//     ]);

//     setLoading(false);
//   }, [loadAssignments, loadClasses]);

//   useEffect(() => {
//     loadData();
//   }, [loadData]);

//   /* =========================================================
//      FILTER
//   ========================================================= */

//   const filteredAssignments = useMemo(() => {
//     const query = search.trim().toLowerCase();

//     return items.filter((assignment) => {
//       const title = getAssignmentTitle(
//         assignment
//       ).toLowerCase();

//       const className = getAssignmentClass(
//         assignment
//       ).toLowerCase();

//       const status = getStatus(
//         assignment
//       );

//       const matchesSearch =
//         !query ||
//         title.includes(query) ||
//         className.includes(query);

//       const matchesStatus =
//         statusFilter === "ALL" ||
//         status === statusFilter;

//       return matchesSearch && matchesStatus;
//     });
//   }, [items, search, statusFilter]);

//   /* =========================================================
//      STATISTICS
//   ========================================================= */

//   const statistics = useMemo(() => {
//     return {
//       total: items.length,

//       published: items.filter(
//         (item) =>
//           getStatus(item) === "PUBLISHED"
//       ).length,

//       draft: items.filter(
//         (item) =>
//           getStatus(item) === "DRAFT"
//       ).length,

//       closed: items.filter(
//         (item) =>
//           getStatus(item) === "CLOSED"
//       ).length,
//     };
//   }, [items]);

//   /* =========================================================
//      FORM HELPERS
//   ========================================================= */

//   const updateForm = (field, value) => {
//     setForm((previous) => ({
//       ...previous,
//       [field]: value,
//     }));
//   };

//   const openCreateModal = () => {
//     setEdit(null);
//     setForm(EMPTY_FORM);
//     setError("");
//     setOpen(true);

//     /*
//       Refresh classes whenever modal opens.
//       This helps if a new class was created recently.
//     */
//     loadClasses();
//   };

//   const openEditModal = (assignment) => {
//     setEdit(assignment);

//     setForm(
//       normalizeAssignment(assignment)
//     );

//     setError("");
//     setOpen(true);

//     loadClasses();
//   };

//   const closeModal = () => {
//     if (saving) return;

//     setOpen(false);
//     setEdit(null);
//     setForm(EMPTY_FORM);
//     setError("");
//   };

//   /* =========================================================
//      VALIDATION
//   ========================================================= */

//   const validateForm = () => {
//     if (!form.class_id) {
//       return "Please select a class.";
//     }

//     if (!form.title.trim()) {
//       return "Please enter an assignment title.";
//     }

//     if (
//       form.max_marks === "" ||
//       Number(form.max_marks) < 0
//     ) {
//       return "Maximum marks must be 0 or greater.";
//     }

//     if (form.due_date) {
//       const date = new Date(form.due_date);

//       if (Number.isNaN(date.getTime())) {
//         return "Please select a valid due date.";
//       }
//     }

//     return null;
//   };

//   /* =========================================================
//      SAVE
//   ========================================================= */

// //   const saveAssignment = async (event) => {
// //     event.preventDefault();

// //     setError("");

// //     const validationError = validateForm();

// //     if (validationError) {
// //       setError(validationError);
// //       return;
// //     }

// //     setSaving(true);

// //     try {
// //       const payload = {
// //         class_id: Number(form.class_id),

// //         title: form.title.trim(),

// //         description:
// //           form.description?.trim() || null,

// //         due_date: form.due_date
// //           ? localDateTimeToUTC(form.due_date)
// //           : null,

// //         max_marks: Number(form.max_marks) || 0,

// //         status: form.status || "DRAFT",

// //         attachment_url:
// //           form.attachment_url?.trim() || null,
// //       };

// //       /*
// //         Only send session_id if it actually exists.
// //       */
// //       if (form.session_id) {
// //         payload.session_id = Number(
// //           form.session_id
// //         );
// //       }

// //       console.log(
// //         "Assignment payload:",
// //         payload
// //       );

// //    if (edit) {
// //   await API.put(`/assignments/trainer/${idOf(edit)}`, form);
// // } else {
// //   await API.post("/assignments/trainer", form);
// // }
// //       closeModal();

// //       await loadAssignments();
// //     } catch (error) {
// //       console.error(
// //         "Save assignment error:",
// //         error
// //       );

// //       const message =
// //         error?.response?.data?.message ||
// //         error?.response?.data?.error ||
// //         "Unable to save assignment.";

// //       setError(message);
// //     } finally {
// //       setSaving(false);
// //     }
// //   };
// const saveAssignment = async (event) => {
//   event.preventDefault();

//   setError("");

//   const validationError = validateForm();

//   if (validationError) {
//     setError(validationError);
//     return;
//   }

//   setSaving(true);

//   try {
//     const payload = {
//       class_id: Number(form.class_id),

//       title: form.title.trim(),

//       description:
//         form.description?.trim() || null,

//       due_date: form.due_date
//         ? localDateTimeToUTC(form.due_date)
//         : null,

//       max_marks: Number(form.max_marks) || 0,

//       status: form.status || "DRAFT",

//       attachment_url:
//         form.attachment_url?.trim() || null,
//     };

//     // Send session_id only when selected
//     if (form.session_id) {
//       payload.session_id = Number(form.session_id);
//     }

//     console.log("Assignment payload:", payload);

//     if (edit) {
//       const assignmentId = getId(edit);

//       if (!assignmentId) {
//         throw new Error("Assignment ID is missing.");
//       }

//       console.log(
//         "Updating assignment:",
//         assignmentId,
//         payload
//       );

//       await API.put(
//         `/assignments/trainer/${assignmentId}`,
//         payload
//       );
//     } else {
//       console.log(
//         "Creating assignment:",
//         payload
//       );

//       await API.post(
//         "/assignments/trainer",
//         payload
//       );
//     }

//     closeModal();

//     await loadAssignments();

//   } catch (error) {
//     console.error(
//       "Save assignment error:",
//       error
//     );

//     const message =
//       error?.response?.data?.message ||
//       error?.response?.data?.error ||
//       error?.message ||
//       "Unable to save assignment.";

//     setError(message);

//   } finally {
//     setSaving(false);
//   }
// };
//   /* =========================================================
//      DELETE
//   ========================================================= */

//  const deleteAssignment = async (assignment) => {
//   const assignmentId = getId(assignment);

//   if (!assignmentId) {
//     alert("Assignment ID is missing.");
//     return;
//   }

//   const confirmed = window.confirm(
//     `Delete "${getAssignmentTitle(assignment)}"?`
//   );

//   if (!confirmed) return;

//   try {
//     console.log("Deleting assignment:", assignmentId);

//     await API.delete(
//       `/assignments/trainer/${assignmentId}`
//     );

//     await loadAssignments();

//   } catch (error) {
//     console.error(
//       "Delete assignment error:",
//       error
//     );

//     alert(
//       error?.response?.data?.message ||
//       error?.response?.data?.error ||
//       "Unable to delete assignment."
//     );
//   }
// };

//   /* =========================================================
//      STATUS COLOR
//   ========================================================= */

//   const statusClasses = (status) => {
//     switch (status) {
//       case "PUBLISHED":
//         return "bg-emerald-500/15 text-emerald-300 border-emerald-500/20";

//       case "CLOSED":
//         return "bg-red-500/15 text-red-300 border-red-500/20";

//       default:
//         return "bg-purple-500/15 text-purple-300 border-purple-500/20";
//     }
//   };

//   /* =========================================================
//      RENDER
//   ========================================================= */

//   return (
//     <div className="min-h-full text-white space-y-7">

//       {/* =====================================================
//           HEADER
//       ===================================================== */}

//       <header className="flex flex-wrap items-center justify-between gap-5">

//         <div>
//           <div className="flex items-center gap-3">
//             <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
//               <ClipboardList size={22} />
//             </div>

//             <div>
//               <h1 className="text-3xl font-bold">
//                 Assignments
//               </h1>

//               <p className="text-white/45 mt-1">
//                 Create work, publish deadlines and manage
//                 student assignments.
//               </p>
//             </div>
//           </div>
//         </div>

//         <button
//           type="button"
//           onClick={openCreateModal}
//           className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 font-semibold shadow-lg shadow-purple-500/20 transition"
//         >
//           <Plus size={19} />
//           New Assignment
//         </button>
//       </header>

//       {/* =====================================================
//           ERROR
//       ===================================================== */}

//       {error && !open && (
//         <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-red-300 flex items-center justify-between gap-4">
//           <span>{error}</span>

//           <button
//             type="button"
//             onClick={() => setError("")}
//             className="text-red-300 hover:text-white"
//           >
//             <X size={18} />
//           </button>
//         </div>
//       )}

//       {/* =====================================================
//           STATISTICS
//       ===================================================== */}

//       <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">

//         <StatCard
//           icon={<ClipboardList size={19} />}
//           label="Total Assignments"
//           value={statistics.total}
//         />

//         <StatCard
//           icon={<FileText size={19} />}
//           label="Published"
//           value={statistics.published}
//         />

//         <StatCard
//           icon={<Clock3 size={19} />}
//           label="Draft"
//           value={statistics.draft}
//         />

//         <StatCard
//           icon={<Award size={19} />}
//           label="Closed"
//           value={statistics.closed}
//         />

//       </div>

//       {/* =====================================================
//           SEARCH / FILTER
//       ===================================================== */}

//       <section className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">

//         <div className="grid lg:grid-cols-[1fr_220px_auto] gap-3">

//           <div className="relative">

//             <Search
//               size={18}
//               className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
//             />

//             <input
//               value={search}
//               onChange={(event) =>
//                 setSearch(event.target.value)
//               }
//               placeholder="Search assignments..."
//               className="w-full pl-11 pr-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white placeholder:text-white/30 outline-none focus:border-purple-500/60 transition"
//             />

//           </div>

//           <select
//             value={statusFilter}
//             onChange={(event) =>
//               setStatusFilter(
//                 event.target.value
//               )
//             }
//             className="px-4 py-3 rounded-xl bg-[#15131d] border border-white/10 text-white outline-none focus:border-purple-500/60"
//           >
//             <option value="ALL">
//               All Status
//             </option>

//             <option value="DRAFT">
//               Draft
//             </option>

//             <option value="PUBLISHED">
//               Published
//             </option>

//             <option value="CLOSED">
//               Closed
//             </option>
//           </select>

//           <button
//             type="button"
//             onClick={loadData}
//             className="px-4 py-3 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] transition flex items-center justify-center gap-2"
//           >
//             <RefreshCw size={17} />
//             Refresh
//           </button>

//         </div>

//       </section>

//       {/* =====================================================
//           CONTENT
//       ===================================================== */}

//       {loading ? (
//         <LoadingState />
//       ) : filteredAssignments.length === 0 ? (
//         <EmptyState
//           onCreate={openCreateModal}
//         />
//       ) : (
//         <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">

//           {filteredAssignments.map(
//             (assignment) => (
//               <AssignmentCard
//                 key={getId(assignment)}
//                 assignment={assignment}
//                 onEdit={() =>
//                   openEditModal(
//                     assignment
//                   )
//                 }
//                 onDelete={() =>
//                   deleteAssignment(
//                     assignment
//                   )
//                 }
//                 statusClasses={
//                   statusClasses
//                 }
//               />
//             )
//           )}

//         </div>
//       )}

//       {/* =====================================================
//           CREATE / EDIT MODAL
//       ===================================================== */}

//       {open && (
//         <AssignmentModal
//           edit={edit}
//           form={form}
//           classes={classes}
//           loadingClasses={
//             loadingClasses
//           }
//           saving={saving}
//           error={error}
//           updateForm={updateForm}
//           onClose={closeModal}
//           onSubmit={saveAssignment}
//           onRefreshClasses={
//             loadClasses
//           }
//         />
//       )}
//     </div>
//   );
// }

// /* =========================================================
//    STAT CARD
// ========================================================= */

// function StatCard({
//   icon,
//   label,
//   value,
// }) {
//   return (
//     <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">

//       <div className="flex items-center gap-3 text-white/55">

//         <div className="w-9 h-9 rounded-lg bg-purple-500/10 text-purple-300 flex items-center justify-center">
//           {icon}
//         </div>

//         <span className="text-sm">
//           {label}
//         </span>

//       </div>

//       <div className="mt-4 text-3xl font-bold">
//         {value}
//       </div>

//     </div>
//   );
// }

// /* =========================================================
//    ASSIGNMENT CARD
// ========================================================= */

// function AssignmentCard({
//   assignment,
//   onEdit,
//   onDelete,
//   statusClasses,
// }) {
//   const status = getStatus(
//     assignment
//   );

//   return (
//     <article className="group rounded-2xl border border-white/10 bg-white/[0.035] hover:bg-white/[0.055] hover:border-purple-500/30 transition overflow-hidden">

//       {/* top gradient */}
//       <div className="h-1 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500" />

//       <div className="p-5">

//         <div className="flex items-start justify-between gap-3">

//           <span
//             className={`inline-flex items-center px-2.5 py-1 rounded-full border text-xs font-medium ${statusClasses(
//               status
//             )}`}
//           >
//             {status}
//           </span>

//           <div className="flex items-center gap-2">

//             <button
//               type="button"
//               onClick={onEdit}
//               title="Edit assignment"
//               className="w-9 h-9 rounded-lg bg-white/5 hover:bg-purple-500/15 hover:text-purple-300 flex items-center justify-center transition"
//             >
//               <Edit3 size={16} />
//             </button>

//             <button
//               type="button"
//               onClick={onDelete}
//               title="Delete assignment"
//               className="w-9 h-9 rounded-lg bg-white/5 hover:bg-red-500/15 text-red-300 flex items-center justify-center transition"
//             >
//               <Trash2 size={16} />
//             </button>

//           </div>

//         </div>

//         <h3 className="mt-5 text-lg font-semibold line-clamp-2">
//           {getAssignmentTitle(
//             assignment
//           )}
//         </h3>

//         <div className="flex items-center gap-2 mt-2 text-sm text-purple-300">
//           <BookOpen size={15} />

//           <span className="truncate">
//             {getAssignmentClass(
//               assignment
//             )}
//           </span>
//         </div>

//         <p className="text-sm text-white/45 mt-4 line-clamp-3 min-h-[60px]">
//           {assignment.description ||
//             assignment.instructions ||
//             "No description provided."}
//         </p>

//         <div className="mt-5 pt-4 border-t border-white/10 grid grid-cols-2 gap-3">

//           <div>
//             <p className="text-xs text-white/35">
//               Due Date
//             </p>

//             <p className="text-sm text-white/70 mt-1">
//               {formatDateTime(
//                 assignment.due_date
//               )}
//             </p>
//           </div>

//           <div>
//             <p className="text-xs text-white/35">
//               Maximum Marks
//             </p>

//             <p className="text-sm text-white/70 mt-1">
//               {assignment.max_marks ??
//                 assignment.maxMarks ??
//                 100}
//             </p>
//           </div>

//         </div>

//       </div>
//     </article>
//   );
// }

// /* =========================================================
//    MODAL
// ========================================================= */

// function AssignmentModal({
//   edit,
//   form,
//   classes,
//   loadingClasses,
//   saving,
//   error,
//   updateForm,
//   onClose,
//   onSubmit,
//   onRefreshClasses,
// }) {
//   return (
//     <div className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">

//       <div className="w-full max-w-2xl max-h-[92vh] overflow-hidden rounded-3xl border border-purple-500/25 bg-[#111019] shadow-2xl shadow-purple-900/30">

//         {/* =================================================
//             MODAL HEADER
//         ================================================= */}

//         <div className="px-6 py-5 border-b border-white/10 bg-gradient-to-r from-purple-950/40 to-pink-950/20">

//           <div className="flex items-start justify-between gap-4">

//             <div className="flex items-center gap-4">

//               <div className="w-12 h-12 rounded-xl bg-purple-500/15 border border-purple-500/20 text-purple-300 flex items-center justify-center">
//                 <ClipboardList
//                   size={23}
//                 />
//               </div>

//               <div>

//                 <h2 className="text-2xl font-bold">
//                   {edit
//                     ? "Edit Assignment"
//                     : "Create Assignment"}
//                 </h2>

//                 <p className="text-sm text-white/45 mt-1">
//                   {edit
//                     ? "Update assignment details and deadline."
//                     : "Create an assignment for your enrolled students."}
//                 </p>

//               </div>

//             </div>

//             <button
//               type="button"
//               onClick={onClose}
//               disabled={saving}
//               className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition"
//             >
//               <X size={20} />
//             </button>

//           </div>

//         </div>

//         {/* =================================================
//             FORM
//         ================================================= */}

//         <form
//           onSubmit={onSubmit}
//           className="overflow-y-auto max-h-[calc(92vh-170px)]"
//         >

//           <div className="p-6 space-y-6">

//             {/* error */}

//             {error && (
//               <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
//                 {error}
//               </div>
//             )}

//             {/* CLASS */}

//             <div>
//               <FieldLabel
//                 label="Class"
//                 required
//               />

//               <div className="flex gap-2">

//                 <select
//                   value={form.class_id}
//                   onChange={(event) =>
//                     updateForm(
//                       "class_id",
//                       event.target.value
//                     )
//                   }
//                   required
//                   disabled={
//                     loadingClasses
//                   }
//                   className="flex-1 px-4 py-3.5 rounded-xl bg-[#181620] border border-white/10 text-white outline-none focus:border-purple-500/70 transition"
//                 >
//                   <option value="">
//                     {loadingClasses
//                       ? "Loading classes..."
//                       : classes.length === 0
//                       ? "No classes available"
//                       : "Select class"}
//                   </option>

//                   {classes.map(
//                     (classItem) => {
//                       const classId =
//                         getClassId(
//                           classItem
//                         );

//                       return (
//                         <option
//                           key={classId}
//                           value={classId}
//                         >
//                           {getClassName(
//                             classItem
//                           )}
//                         </option>
//                       );
//                     }
//                   )}
//                 </select>

//                 <button
//                   type="button"
//                   onClick={
//                     onRefreshClasses
//                   }
//                   disabled={
//                     loadingClasses
//                   }
//                   title="Refresh classes"
//                   className="w-12 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-purple-500/10 flex items-center justify-center"
//                 >
//                   <RefreshCw
//                     size={17}
//                     className={
//                       loadingClasses
//                         ? "animate-spin"
//                         : ""
//                     }
//                   />
//                 </button>

//               </div>

//               {classes.length === 0 &&
//                 !loadingClasses && (
//                   <p className="mt-2 text-xs text-amber-300/80">
//                     No trainer classes were returned by
//                     the classes API.
//                   </p>
//                 )}
//             </div>

//             {/* TITLE */}

//             <div>
//               <FieldLabel
//                 label="Assignment Title"
//                 required
//               />

//               <input
//                 type="text"
//                 value={form.title}
//                 onChange={(event) =>
//                   updateForm(
//                     "title",
//                     event.target.value
//                   )
//                 }
//                 placeholder="e.g. Basic Drawing Practice"
//                 required
//                 className="w-full px-4 py-3.5 rounded-xl bg-[#181620] border border-white/10 text-white placeholder:text-white/25 outline-none focus:border-purple-500/70 transition"
//               />
//             </div>

//             {/* DESCRIPTION */}

//             <div>
//               <FieldLabel label="Description / Instructions" />

//               <textarea
//                 value={form.description}
//                 onChange={(event) =>
//                   updateForm(
//                     "description",
//                     event.target.value
//                   )
//                 }
//                 placeholder="Write the assignment instructions for students..."
//                 rows={5}
//                 className="w-full px-4 py-3.5 rounded-xl bg-[#181620] border border-white/10 text-white placeholder:text-white/25 outline-none focus:border-purple-500/70 transition resize-none"
//               />
//             </div>

//             {/* DATE / MARKS / STATUS */}

//             <div className="grid md:grid-cols-3 gap-4">

//               <div>
//                 <FieldLabel label="Due Date & Time" />

//                 <input
//                   type="datetime-local"
//                   value={form.due_date}
//                   onChange={(event) =>
//                     updateForm(
//                       "due_date",
//                       event.target.value
//                     )
//                   }
//                   className="w-full px-3 py-3.5 rounded-xl bg-[#181620] border border-white/10 text-white outline-none focus:border-purple-500/70"
//                 />

//                 <p className="text-[11px] text-white/30 mt-2">
//                   Your local time is converted to UTC
//                   before sending to the backend.
//                 </p>
//               </div>

//               <div>
//                 <FieldLabel label="Maximum Marks" />

//                 <input
//                   type="number"
//                   min="0"
//                   value={form.max_marks}
//                   onChange={(event) =>
//                     updateForm(
//                       "max_marks",
//                       event.target.value
//                     )
//                   }
//                   className="w-full px-3 py-3.5 rounded-xl bg-[#181620] border border-white/10 text-white outline-none focus:border-purple-500/70"
//                 />
//               </div>

//               <div>
//                 <FieldLabel label="Status" />

//                 <select
//                   value={form.status}
//                   onChange={(event) =>
//                     updateForm(
//                       "status",
//                       event.target.value
//                     )
//                   }
//                   className="w-full px-3 py-3.5 rounded-xl bg-[#181620] border border-white/10 text-white outline-none focus:border-purple-500/70"
//                 >
//                   <option value="DRAFT">
//                     DRAFT
//                   </option>

//                   <option value="PUBLISHED">
//                     PUBLISHED
//                   </option>

//                   <option value="CLOSED">
//                     CLOSED
//                   </option>
//                 </select>
//               </div>

//             </div>

//             {/* ATTACHMENT */}

//             <div>
//               <FieldLabel label="Attachment" />

//               <div className="rounded-xl border border-dashed border-white/15 bg-white/[0.02] p-5">

//                 <div className="flex items-center gap-3">

//                   <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-300 flex items-center justify-center">
//                     <UploadCloud
//                       size={19}
//                     />
//                   </div>

//                   <div>
//                     <p className="text-sm font-medium">
//                       Attachment URL
//                     </p>

//                     <p className="text-xs text-white/35 mt-1">
//                       Connect this field to your existing
//                       storage service.
//                     </p>
//                   </div>

//                 </div>

//                 <input
//                   type="url"
//                   value={form.attachment_url}
//                   onChange={(event) =>
//                     updateForm(
//                       "attachment_url",
//                       event.target.value
//                     )
//                   }
//                   placeholder="https://..."
//                   className="w-full mt-4 px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white placeholder:text-white/25 outline-none focus:border-purple-500/70"
//                 />

//               </div>
//             </div>

//           </div>

//           {/* =================================================
//               FOOTER
//           ================================================= */}

//           <div className="sticky bottom-0 px-6 py-4 border-t border-white/10 bg-[#111019] flex items-center justify-end gap-3">

//             <button
//               type="button"
//               onClick={onClose}
//               disabled={saving}
//               className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition font-medium"
//             >
//               Cancel
//             </button>

//             <button
//               type="submit"
//               disabled={saving}
//               className="min-w-[170px] px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg shadow-purple-500/20 transition flex items-center justify-center gap-2"
//             >
//               {saving ? (
//                 <>
//                   <RefreshCw
//                     size={17}
//                     className="animate-spin"
//                   />
//                   Saving...
//                 </>
//               ) : (
//                 <>
//                   <Plus size={18} />
//                   {edit
//                     ? "Save Changes"
//                     : "Create Assignment"}
//                 </>
//               )}
//             </button>

//           </div>

//         </form>

//       </div>
//     </div>
//   );
// }

// /* =========================================================
//    FIELD LABEL
// ========================================================= */

// function FieldLabel({
//   label,
//   required = false,
// }) {
//   return (
//     <label className="block text-sm font-medium text-white/75 mb-2">
//       {label}

//       {required && (
//         <span className="text-pink-400 ml-1">
//           *
//         </span>
//       )}
//     </label>
//   );
// }

// /* =========================================================
//    LOADING
// ========================================================= */

// function LoadingState() {
//   return (
//     <div className="rounded-2xl border border-white/10 bg-white/[0.03] py-24 flex flex-col items-center justify-center">

//       <div className="w-10 h-10 border-2 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />

//       <p className="mt-4 text-white/40">
//         Loading assignments...
//       </p>

//     </div>
//   );
// }

// /* =========================================================
//    EMPTY
// ========================================================= */

// function EmptyState({
//   onCreate,
// }) {
//   return (
//     <div className="rounded-2xl border border-white/10 bg-white/[0.03] py-24 flex flex-col items-center justify-center text-center">

//       <div className="w-16 h-16 rounded-2xl bg-purple-500/10 text-purple-300 flex items-center justify-center">
//         <ClipboardList size={32} />
//       </div>

//       <h3 className="text-xl font-semibold mt-5">
//         No assignments yet
//       </h3>

//       <p className="text-white/40 mt-2 max-w-md">
//         Create your first assignment and publish
//         it for students enrolled in your classes.
//       </p>

//       <button
//         type="button"
//         onClick={onCreate}
//         className="mt-6 px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 font-semibold flex items-center gap-2"
//       >
//         <Plus size={18} />
//         Create Assignment
//       </button>

//     </div>
//   );
// }



import { useCallback, useEffect, useMemo, useState } from "react";

import {

  ClipboardList,

  Edit3,

  Plus,

  Search,

  Trash2,

  UploadCloud,

  X,

  CalendarDays,

  Clock3,

  BookOpen,

  Award,

  FileText,

  RefreshCw,

} from "lucide-react";

import API from "../services/api";



/* =========================================================

   HELPERS

========================================================= */



const EMPTY_FORM = {

  class_id: "",

  session_id: "",

  title: "",

  description: "",

  due_date: "",

  max_marks: 100,

  status: "DRAFT",

  attachment_url: "",

};



const getId = (item) =>

  item?.id ??

  item?.assignment_id ??

  item?.class_id ??

  item?.session_id;



const getList = (response) => {

  const payload = response?.data ?? response;



  if (Array.isArray(payload)) return payload;



  if (Array.isArray(payload?.data)) return payload.data;

  if (Array.isArray(payload?.assignments)) return payload.assignments;

  if (Array.isArray(payload?.classes)) return payload.classes;

  if (Array.isArray(payload?.items)) return payload.items;

  if (Array.isArray(payload?.rows)) return payload.rows;

  if (Array.isArray(payload?.results)) return payload.results;



  return [];

};



const getClassId = (item) =>

  item?.id ??

  item?.class_id ??

  item?.classId;



const getClassName = (item) =>

  item?.class_name ??

  item?.className ??

  item?.name ??

  item?.title ??

  item?.class_title ??

  `Class ${getClassId(item) ?? ""}`;



const getAssignmentTitle = (item) =>

  item?.title ??

  item?.assignment_title ??

  item?.name ??

  "Untitled Assignment";



const getAssignmentClass = (item) =>

  item?.class_title ??

  item?.class_name ??

  item?.className ??

  item?.class?.name ??

  "Class";



const getStatus = (item) =>

  String(item?.status ?? "DRAFT").toUpperCase();



const formatDateTime = (value) => {

  if (!value) return "Not set";



  const date = new Date(value);



  if (Number.isNaN(date.getTime())) {

    return value;

  }



  return date.toLocaleString("en-IN", {

    day: "2-digit",

    month: "short",

    year: "numeric",

    hour: "2-digit",

    minute: "2-digit",

  });

};



/*

  Converts datetime-local:



      2026-09-23T17:00



  into:



      2026-09-23T11:30:00.000Z



  This is important because the backend should receive

  a proper UTC ISO string.

*/

const localDateTimeToUTC = (value) => {

  if (!value) return null;



  const date = new Date(value);



  if (Number.isNaN(date.getTime())) {

    return null;

  }



  return date.toISOString();

};



/*

  Converts backend ISO date into datetime-local format.

*/

const utcToLocalDateTime = (value) => {

  if (!value) return "";



  const date = new Date(value);



  if (Number.isNaN(date.getTime())) {

    return "";

  }



  const pad = (number) => String(number).padStart(2, "0");



  return `${date.getFullYear()}-${pad(

    date.getMonth() + 1

  )}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(

    date.getMinutes()

  )}`;

};



const normalizeAssignment = (assignment) => ({

  ...EMPTY_FORM,

  ...assignment,



  class_id:

    assignment?.class_id ??

    assignment?.classId ??

    assignment?.class?.id ??

    "",



  session_id:

    assignment?.session_id ??

    assignment?.sessionId ??

    assignment?.session?.id ??

    "",



  title:

    assignment?.title ??

    assignment?.assignment_title ??

    "",



  description:

    assignment?.description ??

    assignment?.instructions ??

    "",



  due_date: utcToLocalDateTime(

    assignment?.due_date ??

      assignment?.dueDate ??

      assignment?.deadline

  ),



  max_marks:

    assignment?.max_marks ??

    assignment?.maxMarks ??

    100,



  status:

    assignment?.status ??

    "DRAFT",



  attachment_url:

    assignment?.attachment_url ??

    assignment?.attachmentUrl ??

    "",

});



/* =========================================================

   COMPONENT

========================================================= */



export default function AdminAssignments() {

  const [items, setItems] = useState([]);

  const [classes, setClasses] = useState([]);



  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("ALL");



  const [open, setOpen] = useState(false);

  const [edit, setEdit] = useState(null);



  const [saving, setSaving] = useState(false);

  const [loading, setLoading] = useState(true);

  const [loadingClasses, setLoadingClasses] = useState(false);



  const [error, setError] = useState("");



  const [form, setForm] = useState(EMPTY_FORM);



  /* =========================================================

     LOAD ASSIGNMENTS

  ========================================================= */



  const loadAssignments = useCallback(async () => {

    try {

      const response = await API.get(

        "/assignments/admin"

      );



      const data = getList(response);



      setItems(data);

    } catch (error) {

      console.error("Load assignments error:", error);



      setItems([]);



      setError(

        error?.response?.data?.message ||

          "Unable to load assignments."

      );

    }

  }, []);



  /* =========================================================

     LOAD TRAINER CLASSES

  ========================================================= */



  const loadClasses = useCallback(async () => {

    setLoadingClasses(true);



    try {

      const response = await API.get(

        "/classes/admin"

      );



      console.log(

        "Admin classes API response:",

        response?.data

      );



      const data = getList(response);



      console.log("Normalized classes:", data);



      setClasses(data);

    } catch (error) {

      console.error("Load classes error:", error);



      setClasses([]);



      setError(

        error?.response?.data?.message ||

          "Unable to load classes."

      );

    } finally {

      setLoadingClasses(false);

    }

  }, []);



  /* =========================================================

     INITIAL LOAD

  ========================================================= */



  const loadData = useCallback(async () => {

    setLoading(true);

    setError("");



    await Promise.all([

      loadAssignments(),

      loadClasses(),

    ]);



    setLoading(false);

  }, [loadAssignments, loadClasses]);



  useEffect(() => {

    loadData();

  }, [loadData]);



  /* =========================================================

     FILTER

  ========================================================= */



  const filteredAssignments = useMemo(() => {

    const query = search.trim().toLowerCase();



    return items.filter((assignment) => {

      const title = getAssignmentTitle(

        assignment

      ).toLowerCase();



      const className = getAssignmentClass(

        assignment

      ).toLowerCase();



      const status = getStatus(

        assignment

      );



      const matchesSearch =

        !query ||

        title.includes(query) ||

        className.includes(query);



      const matchesStatus =

        statusFilter === "ALL" ||

        status === statusFilter;



      return matchesSearch && matchesStatus;

    });

  }, [items, search, statusFilter]);



  /* =========================================================

     STATISTICS

  ========================================================= */



  const statistics = useMemo(() => {

    return {

      total: items.length,



      published: items.filter(

        (item) =>

          getStatus(item) === "PUBLISHED"

      ).length,



      draft: items.filter(

        (item) =>

          getStatus(item) === "DRAFT"

      ).length,



      closed: items.filter(

        (item) =>

          getStatus(item) === "CLOSED"

      ).length,

    };

  }, [items]);



  /* =========================================================

     FORM HELPERS

  ========================================================= */



  const updateForm = (field, value) => {

    setForm((previous) => ({

      ...previous,

      [field]: value,

    }));

  };



  const openCreateModal = () => {

    setEdit(null);

    setForm(EMPTY_FORM);

    setError("");

    setOpen(true);



    /*

      Refresh classes whenever modal opens.

      This helps if a new class was created recently.

    */

    loadClasses();

  };



  const openEditModal = (assignment) => {

    setEdit(assignment);



    setForm(

      normalizeAssignment(assignment)

    );



    setError("");

    setOpen(true);



    loadClasses();

  };



  const closeModal = () => {

    if (saving) return;



    setOpen(false);

    setEdit(null);

    setForm(EMPTY_FORM);

    setError("");

  };



  /* =========================================================

     VALIDATION

  ========================================================= */



  const validateForm = () => {

    if (!form.class_id) {

      return "Please select a class.";

    }



    if (!form.title.trim()) {

      return "Please enter an assignment title.";

    }



    if (

      form.max_marks === "" ||

      Number(form.max_marks) < 0

    ) {

      return "Maximum marks must be 0 or greater.";

    }



    if (form.due_date) {

      const date = new Date(form.due_date);



      if (Number.isNaN(date.getTime())) {

        return "Please select a valid due date.";

      }

    }



    return null;

  };



  /* =========================================================

     SAVE

  ========================================================= */



//   const saveAssignment = async (event) => {

//     event.preventDefault();



//     setError("");



//     const validationError = validateForm();



//     if (validationError) {

//       setError(validationError);

//       return;

//     }



//     setSaving(true);



//     try {

//       const payload = {

//         class_id: Number(form.class_id),



//         title: form.title.trim(),



//         description:

//           form.description?.trim() || null,



//         due_date: form.due_date

//           ? localDateTimeToUTC(form.due_date)

//           : null,



//         max_marks: Number(form.max_marks) || 0,



//         status: form.status || "DRAFT",



//         attachment_url:

//           form.attachment_url?.trim() || null,

//       };



//       /*

//         Only send session_id if it actually exists.

//       */

//       if (form.session_id) {

//         payload.session_id = Number(

//           form.session_id

//         );

//       }



//       console.log(

//         "Assignment payload:",

//         payload

//       );



//    if (edit) {

//   await API.put(`/assignments/trainer/${idOf(edit)}`, form);

// } else {

//   await API.post("/assignments/admin", form);

// }

//       closeModal();



//       await loadAssignments();

//     } catch (error) {

//       console.error(

//         "Save assignment error:",

//         error

//       );



//       const message =

//         error?.response?.data?.message ||

//         error?.response?.data?.error ||

//         "Unable to save assignment.";



//       setError(message);

//     } finally {

//       setSaving(false);

//     }

//   };

const saveAssignment = async (event) => {

  event.preventDefault();



  setError("");



  const validationError = validateForm();



  if (validationError) {

    setError(validationError);

    return;

  }



  setSaving(true);



  try {

    const payload = {

      class_id: Number(form.class_id),



      title: form.title.trim(),



      description:

        form.description?.trim() || null,



      due_date: form.due_date

        ? localDateTimeToUTC(form.due_date)

        : null,



      max_marks: Number(form.max_marks) || 0,



      status: form.status || "DRAFT",



      attachment_url:

        form.attachment_url?.trim() || null,

    };



    // Send session_id only when selected

    if (form.session_id) {

      payload.session_id = Number(form.session_id);

    }



    console.log("Assignment payload:", payload);



    if (edit) {

      const assignmentId = getId(edit);



      if (!assignmentId) {

        throw new Error("Assignment ID is missing.");

      }



      console.log(

        "Updating assignment:",

        assignmentId,

        payload

      );



      await API.put(

        `/assignments/admin/${assignmentId}`,

        payload

      );

    } else {

      console.log(

        "Creating assignment:",

        payload

      );



      await API.post(

        "/assignments/admin",

        payload

      );

    }



    closeModal();



    await loadAssignments();



  } catch (error) {

    console.error(

      "Save assignment error:",

      error

    );



    const message =

      error?.response?.data?.message ||

      error?.response?.data?.error ||

      error?.message ||

      "Unable to save assignment.";



    setError(message);



  } finally {

    setSaving(false);

  }

};

  /* =========================================================

     DELETE

  ========================================================= */



 const deleteAssignment = async (assignment) => {

  const assignmentId = getId(assignment);



  if (!assignmentId) {

    alert("Assignment ID is missing.");

    return;

  }



  const confirmed = window.confirm(

    `Delete "${getAssignmentTitle(assignment)}"?`

  );



  if (!confirmed) return;



  try {

    console.log("Deleting assignment:", assignmentId);



    await API.delete(

      `/assignments/admin/${assignmentId}`

    );



    await loadAssignments();



  } catch (error) {

    console.error(

      "Delete assignment error:",

      error

    );



    alert(

      error?.response?.data?.message ||

      error?.response?.data?.error ||

      "Unable to delete assignment."

    );

  }

};



  /* =========================================================

     STATUS COLOR

  ========================================================= */



  const statusClasses = (status) => {

    switch (status) {

      case "PUBLISHED":

        return "bg-emerald-500/15 text-emerald-300 border-emerald-500/20";



      case "CLOSED":

        return "bg-red-500/15 text-red-300 border-red-500/20";



      default:

        return "bg-purple-500/15 text-purple-300 border-purple-500/20";

    }

  };



  /* =========================================================

     RENDER

  ========================================================= */



  return (

    <div className="min-h-full text-white space-y-7">



      {/* =====================================================

          HEADER

      ===================================================== */}



      <header className="flex flex-wrap items-center justify-between gap-5">



        <div>

          <div className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20">

              <ClipboardList size={22} />

            </div>



            <div>

              <h1 className="text-3xl font-bold">

                Assignments

              </h1>



              <p className="text-white/45 mt-1">

                Create work, publish deadlines and manage

                student assignments.

              </p>

            </div>

          </div>

        </div>



        <button

          type="button"

          onClick={openCreateModal}

          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 font-semibold shadow-lg shadow-purple-500/20 transition"

        >

          <Plus size={19} />

          New Assignment

        </button>

      </header>



      {/* =====================================================

          ERROR

      ===================================================== */}



      {error && !open && (

        <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-red-300 flex items-center justify-between gap-4">

          <span>{error}</span>



          <button

            type="button"

            onClick={() => setError("")}

            className="text-red-300 hover:text-white"

          >

            <X size={18} />

          </button>

        </div>

      )}



      {/* =====================================================

          STATISTICS

      ===================================================== */}



      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">



        <StatCard

          icon={<ClipboardList size={19} />}

          label="Total Assignments"

          value={statistics.total}

        />



        <StatCard

          icon={<FileText size={19} />}

          label="Published"

          value={statistics.published}

        />



        <StatCard

          icon={<Clock3 size={19} />}

          label="Draft"

          value={statistics.draft}

        />



        <StatCard

          icon={<Award size={19} />}

          label="Closed"

          value={statistics.closed}

        />



      </div>



      {/* =====================================================

          SEARCH / FILTER

      ===================================================== */}



      <section className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">



        <div className="grid lg:grid-cols-[1fr_220px_auto] gap-3">



          <div className="relative">



            <Search

              size={18}

              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"

            />



            <input

              value={search}

              onChange={(event) =>

                setSearch(event.target.value)

              }

              placeholder="Search assignments..."

              className="w-full pl-11 pr-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white placeholder:text-white/30 outline-none focus:border-purple-500/60 transition"

            />



          </div>



          <select

            value={statusFilter}

            onChange={(event) =>

              setStatusFilter(

                event.target.value

              )

            }

            className="px-4 py-3 rounded-xl bg-[#15131d] border border-white/10 text-white outline-none focus:border-purple-500/60"

          >

            <option value="ALL">

              All Status

            </option>



            <option value="DRAFT">

              Draft

            </option>



            <option value="PUBLISHED">

              Published

            </option>



            <option value="CLOSED">

              Closed

            </option>

          </select>



          <button

            type="button"

            onClick={loadData}

            className="px-4 py-3 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] transition flex items-center justify-center gap-2"

          >

            <RefreshCw size={17} />

            Refresh

          </button>



        </div>



      </section>



      {/* =====================================================

          CONTENT

      ===================================================== */}



      {loading ? (

        <LoadingState />

      ) : filteredAssignments.length === 0 ? (

        <EmptyState

          onCreate={openCreateModal}

        />

      ) : (

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">



          {filteredAssignments.map(

            (assignment) => (

              <AssignmentCard

                key={getId(assignment)}

                assignment={assignment}

                onEdit={() =>

                  openEditModal(

                    assignment

                  )

                }

                onDelete={() =>

                  deleteAssignment(

                    assignment

                  )

                }

                statusClasses={

                  statusClasses

                }

              />

            )

          )}



        </div>

      )}



      {/* =====================================================

          CREATE / EDIT MODAL

      ===================================================== */}



      {open && (

        <AssignmentModal

          edit={edit}

          form={form}

          classes={classes}

          loadingClasses={

            loadingClasses

          }

          saving={saving}

          error={error}

          updateForm={updateForm}

          onClose={closeModal}

          onSubmit={saveAssignment}

          onRefreshClasses={

            loadClasses

          }

        />

      )}

    </div>

  );

}



/* =========================================================

   STAT CARD

========================================================= */



function StatCard({

  icon,

  label,

  value,

}) {

  return (

    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">



      <div className="flex items-center gap-3 text-white/55">



        <div className="w-9 h-9 rounded-lg bg-purple-500/10 text-purple-300 flex items-center justify-center">

          {icon}

        </div>



        <span className="text-sm">

          {label}

        </span>



      </div>



      <div className="mt-4 text-3xl font-bold">

        {value}

      </div>



    </div>

  );

}



/* =========================================================

   ASSIGNMENT CARD

========================================================= */



function AssignmentCard({

  assignment,

  onEdit,

  onDelete,

  statusClasses,

}) {

  const status = getStatus(

    assignment

  );



  return (

    <article className="group rounded-2xl border border-white/10 bg-white/[0.035] hover:bg-white/[0.055] hover:border-purple-500/30 transition overflow-hidden">



      {/* top gradient */}

      <div className="h-1 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500" />



      <div className="p-5">



        <div className="flex items-start justify-between gap-3">



          <span

            className={`inline-flex items-center px-2.5 py-1 rounded-full border text-xs font-medium ${statusClasses(

              status

            )}`}

          >

            {status}

          </span>



          <div className="flex items-center gap-2">



            <button

              type="button"

              onClick={onEdit}

              title="Edit assignment"

              className="w-9 h-9 rounded-lg bg-white/5 hover:bg-purple-500/15 hover:text-purple-300 flex items-center justify-center transition"

            >

              <Edit3 size={16} />

            </button>



            <button

              type="button"

              onClick={onDelete}

              title="Delete assignment"

              className="w-9 h-9 rounded-lg bg-white/5 hover:bg-red-500/15 text-red-300 flex items-center justify-center transition"

            >

              <Trash2 size={16} />

            </button>



          </div>



        </div>



        <h3 className="mt-5 text-lg font-semibold line-clamp-2">

          {getAssignmentTitle(

            assignment

          )}

        </h3>



        <div className="flex items-center gap-2 mt-2 text-sm text-purple-300">

          <BookOpen size={15} />



          <span className="truncate">

            {getAssignmentClass(

              assignment

            )}

          </span>

        </div>



        <p className="text-sm text-white/45 mt-4 line-clamp-3 min-h-[60px]">

          {assignment.description ||

            assignment.instructions ||

            "No description provided."}

        </p>



        <div className="mt-5 pt-4 border-t border-white/10 grid grid-cols-2 gap-3">



          <div>

            <p className="text-xs text-white/35">

              Due Date

            </p>



            <p className="text-sm text-white/70 mt-1">

              {formatDateTime(

                assignment.due_date

              )}

            </p>

          </div>



          <div>

            <p className="text-xs text-white/35">

              Maximum Marks

            </p>



            <p className="text-sm text-white/70 mt-1">

              {assignment.max_marks ??

                assignment.maxMarks ??

                100}

            </p>

          </div>



        </div>



      </div>

    </article>

  );

}



/* =========================================================

   MODAL

========================================================= */



function AssignmentModal({

  edit,

  form,

  classes,

  loadingClasses,

  saving,

  error,

  updateForm,

  onClose,

  onSubmit,

  onRefreshClasses,

}) {

  return (

    <div className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">



      <div className="w-full max-w-2xl max-h-[92vh] overflow-hidden rounded-3xl border border-purple-500/25 bg-[#111019] shadow-2xl shadow-purple-900/30">



        {/* =================================================

            MODAL HEADER

        ================================================= */}



        <div className="px-6 py-5 border-b border-white/10 bg-gradient-to-r from-purple-950/40 to-pink-950/20">



          <div className="flex items-start justify-between gap-4">



            <div className="flex items-center gap-4">



              <div className="w-12 h-12 rounded-xl bg-purple-500/15 border border-purple-500/20 text-purple-300 flex items-center justify-center">

                <ClipboardList

                  size={23}

                />

              </div>



              <div>



                <h2 className="text-2xl font-bold">

                  {edit

                    ? "Edit Assignment"

                    : "Create Assignment"}

                </h2>



                <p className="text-sm text-white/45 mt-1">

                  {edit

                    ? "Update assignment details and deadline."

                    : "Create an assignment for your enrolled students."}

                </p>



              </div>



            </div>



            <button

              type="button"

              onClick={onClose}

              disabled={saving}

              className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition"

            >

              <X size={20} />

            </button>



          </div>



        </div>



        {/* =================================================

            FORM

        ================================================= */}



        <form

          onSubmit={onSubmit}

          className="overflow-y-auto max-h-[calc(92vh-170px)]"

        >



          <div className="p-6 space-y-6">



            {/* error */}



            {error && (

              <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">

                {error}

              </div>

            )}



            {/* CLASS */}



            <div>

              <FieldLabel

                label="Class"

                required

              />



              <div className="flex gap-2">



                <select

                  value={form.class_id}

                  onChange={(event) =>

                    updateForm(

                      "class_id",

                      event.target.value

                    )

                  }

                  required

                  disabled={

                    loadingClasses

                  }

                  className="flex-1 px-4 py-3.5 rounded-xl bg-[#181620] border border-white/10 text-white outline-none focus:border-purple-500/70 transition"

                >

                  <option value="">

                    {loadingClasses

                      ? "Loading classes..."

                      : classes.length === 0

                      ? "No classes available"

                      : "Select class"}

                  </option>



                  {classes.map(

                    (classItem) => {

                      const classId =

                        getClassId(

                          classItem

                        );



                      return (

                        <option

                          key={classId}

                          value={classId}

                        >

                          {getClassName(

                            classItem

                          )}

                        </option>

                      );

                    }

                  )}

                </select>



                <button

                  type="button"

                  onClick={

                    onRefreshClasses

                  }

                  disabled={

                    loadingClasses

                  }

                  title="Refresh classes"

                  className="w-12 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-purple-500/10 flex items-center justify-center"

                >

                  <RefreshCw

                    size={17}

                    className={

                      loadingClasses

                        ? "animate-spin"

                        : ""

                    }

                  />

                </button>



              </div>



              {classes.length === 0 &&

                !loadingClasses && (

                  <p className="mt-2 text-xs text-amber-300/80">

                    No classes were returned by

                    the classes API.

                  </p>

                )}

            </div>



            {/* TITLE */}



            <div>

              <FieldLabel

                label="Assignment Title"

                required

              />



              <input

                type="text"

                value={form.title}

                onChange={(event) =>

                  updateForm(

                    "title",

                    event.target.value

                  )

                }

                placeholder="e.g. Basic Drawing Practice"

                required

                className="w-full px-4 py-3.5 rounded-xl bg-[#181620] border border-white/10 text-white placeholder:text-white/25 outline-none focus:border-purple-500/70 transition"

              />

            </div>



            {/* DESCRIPTION */}



            <div>

              <FieldLabel label="Description / Instructions" />



              <textarea

                value={form.description}

                onChange={(event) =>

                  updateForm(

                    "description",

                    event.target.value

                  )

                }

                placeholder="Write the assignment instructions for students..."

                rows={5}

                className="w-full px-4 py-3.5 rounded-xl bg-[#181620] border border-white/10 text-white placeholder:text-white/25 outline-none focus:border-purple-500/70 transition resize-none"

              />

            </div>



            {/* DATE / MARKS / STATUS */}



            <div className="grid md:grid-cols-3 gap-4">



              <div>

                <FieldLabel label="Due Date & Time" />



                <input

                  type="datetime-local"

                  value={form.due_date}

                  onChange={(event) =>

                    updateForm(

                      "due_date",

                      event.target.value

                    )

                  }

                  className="w-full px-3 py-3.5 rounded-xl bg-[#181620] border border-white/10 text-white outline-none focus:border-purple-500/70"

                />



                <p className="text-[11px] text-white/30 mt-2">

                  Your local time is converted to UTC

                  before sending to the backend.

                </p>

              </div>



              <div>

                <FieldLabel label="Maximum Marks" />



                <input

                  type="number"

                  min="0"

                  value={form.max_marks}

                  onChange={(event) =>

                    updateForm(

                      "max_marks",

                      event.target.value

                    )

                  }

                  className="w-full px-3 py-3.5 rounded-xl bg-[#181620] border border-white/10 text-white outline-none focus:border-purple-500/70"

                />

              </div>



              <div>

                <FieldLabel label="Status" />



                <select

                  value={form.status}

                  onChange={(event) =>

                    updateForm(

                      "status",

                      event.target.value

                    )

                  }

                  className="w-full px-3 py-3.5 rounded-xl bg-[#181620] border border-white/10 text-white outline-none focus:border-purple-500/70"

                >

                  <option value="DRAFT">

                    DRAFT

                  </option>



                  <option value="PUBLISHED">

                    PUBLISHED

                  </option>



                  <option value="CLOSED">

                    CLOSED

                  </option>

                </select>

              </div>



            </div>



            {/* ATTACHMENT */}



            <div>

              <FieldLabel label="Attachment" />



              <div className="rounded-xl border border-dashed border-white/15 bg-white/[0.02] p-5">



                <div className="flex items-center gap-3">



                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-300 flex items-center justify-center">

                    <UploadCloud

                      size={19}

                    />

                  </div>



                  <div>

                    <p className="text-sm font-medium">

                      Attachment URL

                    </p>



                    <p className="text-xs text-white/35 mt-1">

                      Connect this field to your existing

                      storage service.

                    </p>

                  </div>



                </div>



                <input

                  type="url"

                  value={form.attachment_url}

                  onChange={(event) =>

                    updateForm(

                      "attachment_url",

                      event.target.value

                    )

                  }

                  placeholder="https://..."

                  className="w-full mt-4 px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white placeholder:text-white/25 outline-none focus:border-purple-500/70"

                />



              </div>

            </div>



          </div>



          {/* =================================================

              FOOTER

          ================================================= */}



          <div className="sticky bottom-0 px-6 py-4 border-t border-white/10 bg-[#111019] flex items-center justify-end gap-3">



            <button

              type="button"

              onClick={onClose}

              disabled={saving}

              className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition font-medium"

            >

              Cancel

            </button>



            <button

              type="submit"

              disabled={saving}

              className="min-w-[170px] px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg shadow-purple-500/20 transition flex items-center justify-center gap-2"

            >

              {saving ? (

                <>

                  <RefreshCw

                    size={17}

                    className="animate-spin"

                  />

                  Saving...

                </>

              ) : (

                <>

                  <Plus size={18} />

                  {edit

                    ? "Save Changes"

                    : "Create Assignment"}

                </>

              )}

            </button>



          </div>



        </form>



      </div>

    </div>

  );

}



/* =========================================================

   FIELD LABEL

========================================================= */



function FieldLabel({

  label,

  required = false,

}) {

  return (

    <label className="block text-sm font-medium text-white/75 mb-2">

      {label}



      {required && (

        <span className="text-pink-400 ml-1">

          *

        </span>

      )}

    </label>

  );

}



/* =========================================================

   LOADING

========================================================= */



function LoadingState() {

  return (

    <div className="rounded-2xl border border-white/10 bg-white/[0.03] py-24 flex flex-col items-center justify-center">



      <div className="w-10 h-10 border-2 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />



      <p className="mt-4 text-white/40">

        Loading assignments...

      </p>



    </div>

  );

}



/* =========================================================

   EMPTY

========================================================= */



function EmptyState({

  onCreate,

}) {

  return (

    <div className="rounded-2xl border border-white/10 bg-white/[0.03] py-24 flex flex-col items-center justify-center text-center">



      <div className="w-16 h-16 rounded-2xl bg-purple-500/10 text-purple-300 flex items-center justify-center">

        <ClipboardList size={32} />

      </div>



      <h3 className="text-xl font-semibold mt-5">

        No assignments yet

      </h3>



      <p className="text-white/40 mt-2 max-w-md">

        Create your first assignment and publish

        it for students enrolled in your classes.

      </p>



      <button

        type="button"

        onClick={onCreate}

        className="mt-6 px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 font-semibold flex items-center gap-2"

      >

        <Plus size={18} />

        Create Assignment

      </button>



    </div>

  );

}