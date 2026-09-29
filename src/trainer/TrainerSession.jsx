



// import React, { useEffect, useMemo, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { FaTrash } from "react-icons/fa";
// import { getAuth } from "firebase/auth";

// import {
//   Plus,
//   Search,
//   Clock,
//   Video,
//   Edit,
//   Trash2,
//   CheckCircle,
//   Loader2,
//   Copy,
//   RefreshCcw,
//   BookOpen,
//   X,
//   Globe,
// } from "lucide-react";

// /* ── Timezone Utility ── */
// import { useTimezone, getTimezone } from "../utils/timezone";

// // const API_URL = "http://localhost:5000/api";
// const API_URL =
//   import.meta.env.VITE_API_URL || "http://localhost:5000/api";
// /* ═══════════════════════════════════════════════════════
//    TRAINER AUTH CONFIG (Firebase)
// ════════════════════════════════════════════════════════ */

// const authHeader = async () => {
//   const auth = getAuth();
//   let token = null;

//   if (auth.currentUser) {
//     token = await auth.currentUser.getIdToken(true);
//   } else {
//     token = localStorage.getItem("token");
//   }

//   return {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "X-Timezone": getTimezone(),
//     },
//   };
// };

// /* ═══════════════════════════════════════════════════════
//    TIME HELPERS (UI only — for 12h display & input)
// ════════════════════════════════════════════════════════ */

// const convertTo24Hour = (time, ampm) => {
//   if (!time) return "";
//   let [hour, minute] = time.split(":").map(Number);
//   if (hour > 12) {
//     return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
//   }
//   if (ampm === "PM" && hour !== 12) hour += 12;
//   if (ampm === "AM" && hour === 12) hour = 0;
//   return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
// };

// const convertTo12Hour = (time24) => {
//   if (!time24) return { time: "", ampm: "AM" };
//   let [hour, minute] = time24.split(":").map(Number);
//   const ampm = hour >= 12 ? "PM" : "AM";
//   hour = hour % 12;
//   if (hour === 0) hour = 12;
//   return {
//     time: `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`,
//     ampm,
//   };
// };

// /* ═══════════════════════════════════════════════════════
//    STYLES
// ════════════════════════════════════════════════════════ */

// const inputClass =
//   "w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors";
// const selectClass =
//   "w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors";
// const labelClass = "block text-sm text-white mb-1";
// const gridInputClass =
//   "w-full p-2.5 rounded-lg bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors text-sm";

// /* ═══════════════════════════════════════════════════════
//    MAIN COMPONENT
// ════════════════════════════════════════════════════════ */

// export default function TrainerSessions() {
//   const tz = useTimezone();

//   const [sessions, setSessions] = useState([]);
//   const [classes, setClasses] = useState([]);

//   const [loading, setLoading] = useState(true);
//   const [creating, setCreating] = useState(false);
//   const [editing, setEditing] = useState(false);
//   const [deleting, setDeleting] = useState(false);
//   const [generatingZoom, setGeneratingZoom] = useState(false);

//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("ALL");
//   const [page, setPage] = useState(1);
//   const PAGE_SIZE = 10;

//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [showZoomModal, setShowZoomModal] = useState(false);

//   const [form, setForm] = useState({
//     class_id: "",
//     notes: "",
//   });

//   const [slots, setSlots] = useState([
//     {
//       id: Date.now(),
//       title: "",
//       start_time: "",
//       start_ampm: "AM",
//     },
//   ]);

//   const [editForm, setEditForm] = useState({
//     session_id: "",
//     class_id: "",
//     title: "",
//     start_time: "",
//     start_ampm: "AM",
//   });

//   const [selectedSession, setSelectedSession] = useState(null);

//   /* ─────────────────────────────────────────────
//      SLOT HELPERS
//   ───────────────────────────────────────────── */

//   const addSlot = () => {
//     setSlots((prev) => [
//       ...prev,
//       {
//         id: Date.now(),
//         title: "",
//         start_time: "",
//         start_ampm: "AM",
//       },
//     ]);
//   };

//   const removeSlot = (slotId) => {
//     if (slots.length <= 1)
//       return toast.error("At least one template is required");
//     setSlots((prev) => prev.filter((s) => s.id !== slotId));
//   };

//   const updateSlot = (slotId, field, value) => {
//     setSlots((prev) =>
//       prev.map((s) => (s.id === slotId ? { ...s, [field]: value } : s))
//     );
//   };

//   const resetCreateForm = () => {
//     setForm({ class_id: "", notes: "" });
//     setSlots([
//       {
//         id: Date.now(),
//         title: "",
//         start_time: "",
//         start_ampm: "AM",
//       },
//     ]);
//   };

//   /* ─────────────────────────────────────────────
//      DATA FETCHING
//   ───────────────────────────────────────────── */

//   const fetchClasses = async () => {
//     try {
//       const config = await authHeader();
//       const res = await axios.get(
//         `${API_URL}/classes/trainer/my-classes`,
//         config
//       );
//       setClasses(res.data?.data || res.data || []);
//     } catch (err) {
//       toast.error("Failed to load classes");
//     }
//   };

//   const fetchSessions = async () => {
//     try {
//       setLoading(true);
//       const config = await authHeader();
//       const res = await axios.get(
//         `${API_URL}/sessions/trainer/my-sessions`,
//         config
//       );
//       let data = [];
//       if (Array.isArray(res.data)) data = res.data;
//       else if (Array.isArray(res.data.data)) data = res.data.data;
//       else if (Array.isArray(res.data.sessions)) data = res.data.sessions;

//       // Normalize id so the rest of the component always uses session.id
//       setSessions(
//         data.map((s) => ({
//           ...s,
//           id: s.id ?? s.session_id,
//         }))
//       );
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to load sessions");
//       setSessions([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchClasses();
//     fetchSessions();
//   }, []);

//   /* ─────────────────────────────────────────────
//      SEARCH + FILTER + PAGINATION
//   ───────────────────────────────────────────── */

//   const filteredSessions = useMemo(() => {
//     let data = Array.isArray(sessions) ? [...sessions] : [];
//     if (statusFilter !== "ALL") {
//       data = data.filter(
//         (item) => (item.live_status || item.status) === statusFilter
//       );
//     }
//     if (search.trim()) {
//       const keyword = search.toLowerCase();
//       data = data.filter((item) => {
//         return (
//           item.title?.toLowerCase().includes(keyword) ||
//           item.class_title?.toLowerCase().includes(keyword)
//         );
//       });
//     }
//     return data;
//   }, [sessions, search, statusFilter]);

//   const totalPages = Math.ceil(filteredSessions.length / PAGE_SIZE);
//   const paginatedSessions = useMemo(() => {
//     const start = (page - 1) * PAGE_SIZE;
//     return filteredSessions.slice(start, start + PAGE_SIZE);
//   }, [filteredSessions, page]);

//   useEffect(() => {
//     if (page > totalPages && totalPages > 0) setPage(1);
//   }, [filteredSessions, page, totalPages]);

//   /* ─────────────────────────────────────────────
//      DASHBOARD STATS
//   ───────────────────────────────────────────── */

//   const stats = useMemo(() => {
//     const list = Array.isArray(sessions) ? sessions : [];
//     const statusKey =
//       list[0]?.live_status !== undefined ? "live_status" : "status";
//     return {
//       total: list.length,
//       scheduled: list.filter(
//         (s) => s[statusKey] === "SCHEDULED" || s[statusKey] === "UPCOMING"
//       ).length,
//       live: list.filter((s) => s[statusKey] === "LIVE").length,
//       completed: list.filter((s) => s[statusKey] === "COMPLETED").length,
//     };
//   }, [sessions]);

//   /* ─────────────────────────────────────────────
//      CREATE SESSION TEMPLATES
//   ───────────────────────────────────────────── */

//   const createSession = async () => {
//     try {
//       setCreating(true);
//       if (!form.class_id) return toast.error("Select a class");

//       const invalidSlot = slots.find((s) => !s.title || !s.start_time);
//       if (invalidSlot)
//         return toast.error(
//           "Please fill title and start time for all templates"
//         );

//       const payloads = slots.map((slot) => ({
//         class_id: form.class_id,
//         title: slot.title,
//         start_time: convertTo24Hour(slot.start_time, slot.start_ampm),
//         notes: form.notes,
//         timezone: tz.timezone,
//       }));

//       const config = await authHeader();
//       await axios.post(
//         `${API_URL}/sessions/trainer/create`,
//         { sessions: payloads },
//         config
//       );

//       toast.success(`${payloads.length} session template(s) created`);
//       setShowCreateModal(false);
//       resetCreateForm();
//       fetchSessions();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Unable to create sessions");
//     } finally {
//       setCreating(false);
//     }
//   };

//   /* ─────────────────────────────────────────────
//      EDIT SESSION
//   ───────────────────────────────────────────── */

//   const openEditModal = (session) => {
//     setSelectedSession(session);
//     const start = convertTo12Hour(session.start_time);
//     setEditForm({
//       session_id: session.id,
//       class_id: session.class_id,
//       title: session.title || "",
//       start_time: start.time,
//       start_ampm: start.ampm,
//     });
//     setShowEditModal(true);
//   };

//   const updateSession = async () => {
//     try {
//       setEditing(true);
//       const config = await authHeader();
//       await axios.put(
//         `${API_URL}/sessions/trainer/${editForm.session_id}`,
//         {
//           class_id: editForm.class_id,
//           title: editForm.title,
//           start_time: convertTo24Hour(
//             editForm.start_time,
//             editForm.start_ampm
//           ),
//           timezone: tz.timezone,
//         },
//         config
//       );
//       toast.success("Session template updated");
//       setShowEditModal(false);
//       fetchSessions();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Unable to update session");
//     } finally {
//       setEditing(false);
//     }
//   };

//   /* ─────────────────────────────────────────────
//      DELETE & ZOOM
//   ───────────────────────────────────────────── */

//   const openDeleteModal = (session) => {
//     setSelectedSession(session);
//     setShowDeleteModal(true);
//   };

//   const deleteSession = async () => {
//     try {
//       setDeleting(true);
//       const config = await authHeader();
//       await axios.delete(
//         `${API_URL}/sessions/trainer/${selectedSession.id}`,
//         config
//       );
//       toast.success("Session deleted");
//       setShowDeleteModal(false);
//       fetchSessions();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Unable to delete session");
//     } finally {
//       setDeleting(false);
//     }
//   };

//   const openZoomModal = (session) => {
//     setSelectedSession(session);
//     setShowZoomModal(true);
//   };

//   const generateZoomMeeting = async () => {
//     try {
//       setGeneratingZoom(true);
//       const config = await authHeader();
//       await axios.post(
//         `${API_URL}/sessions/trainer/${selectedSession.id}/generate-zoom`,
//         {},
//         config
//       );
//       toast.success("Zoom meeting generated");
//       fetchSessions();
//       setShowZoomModal(false);
//     } catch (err) {
//       toast.error(
//         err.response?.data?.message || "Unable to generate Zoom meeting"
//       );
//     } finally {
//       setGeneratingZoom(false);
//     }
//   };

//   const copyZoomLink = async (link) => {
//     if (!link) return toast.error("Zoom link not available");
//     try {
//       await navigator.clipboard.writeText(link);
//       toast.success("Zoom link copied");
//     } catch {
//       const textArea = document.createElement("textarea");
//       textArea.value = link;
//       document.body.appendChild(textArea);
//       textArea.select();
//       document.execCommand("copy");
//       document.body.removeChild(textArea);
//       toast.success("Zoom link copied");
//     }
//   };

//   /* ============================================================
//       PAGE RENDER
//   ============================================================ */

//   return (
//     <div className="p-8 text-white">
//       {/* ── HEADER ── */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//         <div>
//           <h1 className="text-4xl font-bold text-purple-400">
//             Trainer Session Templates
//           </h1>
//           <p className="text-white mt-2">
//             Manage recurring time slots (e.g., Session A, B, C).
//           </p>
        
//         </div>
//         <button
//           onClick={() => setShowCreateModal(true)}
//           className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition-opacity flex items-center gap-2"
//         >
//           <Plus size={18} /> Create Template
//         </button>
//       </div>

//       {/* ── STATS ── */}
//       <div className="grid grid-cols-4 gap-4 mb-6">
//         <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-5">
//           <p className="text-white text-sm">Active Today</p>
//           <h2 className="text-4xl font-bold mt-2">{stats.total}</h2>
//         </div>
//         <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-5">
//           <p className="text-white text-sm">Scheduled</p>
//           <h2 className="text-4xl font-bold text-white mt-2">
//             {stats.scheduled}
//           </h2>
//         </div>
//         <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-5">
//           <p className="text-white text-sm">Live</p>
//           <h2 className="text-4xl font-bold text-white mt-2">
//             {stats.live}
//           </h2>
//         </div>
//         <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-5">
//           <p className="text-white text-sm">Completed</p>
//           <h2 className="text-4xl font-bold text-white mt-2">
//             {stats.completed}
//           </h2>
//         </div>
//       </div>

//       {/* ── FILTERS ── */}
//       <div className="mb-6">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//           <div className="relative w-full">
//             <Search
//               className="absolute left-4 top-1/2 -translate-y-1/2 text-white pointer-events-none"
//               size={18}
//             />
//             <input
//               type="text"
//               placeholder="Search templates..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-full pl-12 pr-10 py-3.5 rounded-xl bg-[#151519] border border-[#2c2c35] text-white placeholder-white focus:outline-none focus:border-purple-500/60 transition-colors text-sm"
//             />
//             {search && (
//               <button
//                 onClick={() => setSearch("")}
//                 className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-white transition-colors"
//               >
//                 <X size={14} />
//               </button>
//             )}
//           </div>
//           <select
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//             className="w-full py-3.5 px-4 rounded-xl bg-[#151519] border border-[#2c2c35] text-white focus:outline-none focus:border-purple-500/60 transition-colors text-sm"
//           >
//             <option value="ALL">All Status</option>
//             <option value="SCHEDULED">Scheduled</option>
//             <option value="UPCOMING">Upcoming</option>
//             <option value="LIVE">Live</option>
//             <option value="COMPLETED">Completed</option>
//           </select>
//         </div>
//       </div>

//       {/* ── TABLE ── */}
//       <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl overflow-hidden">
//         <div className="overflow-x-auto">
//           {loading ? (
//             <div className="p-24 flex flex-col items-center justify-center">
//               <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
//               <p className="mt-5 text-gray-500">Loading Sessions...</p>
//             </div>
//           ) : paginatedSessions.length === 0 ? (
//             <div className="p-12 text-center">
//               <BookOpen size={40} className="text-gray-600 mx-auto" />
//               <p className="text-gray-500 text-lg mt-3">
//                 {search
//                   ? "No templates found"
//                   : "No session templates active right now"}
//               </p>
//             </div>
//           ) : (
//             <table className="w-full">
//               <thead className="bg-[#202027] text-white">
//                 <tr>
//                   <th className="p-4 text-left whitespace-nowrap">Class</th>
//                   <th className="p-4 text-left whitespace-nowrap">
//                     Start Time
//                   </th>
//                   <th className="p-4 text-left whitespace-nowrap">Status</th>
//                   <th className="p-4 text-left whitespace-nowrap">Zoom</th>
//                   <th className="p-4 text-left whitespace-nowrap">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {paginatedSessions.map((session) => {
//                   const hasZoom = !!session.zoom_link;
//                   const start12 = convertTo12Hour(session.start_time);
//                   const currentStatus =
//                     session.live_status || session.status;

//                   return (
//                     <tr
//                       key={session.id}
//                       className="border-t border-[#2c2c35] hover:bg-[#1a1a20] transition-colors"
//                     >
//                       <td className="p-4 text-white whitespace-nowrap">
//                         {session.class_title || "-"}
//                       </td>

//                       <td className="p-4 text-white whitespace-nowrap">
//                         <span>
//                           {start12.time} {start12.ampm}
//                         </span>
//                         {session.session_timezone &&
//                           session.session_timezone !== tz.timezone && (
//                             <span className="ml-1.5 text-[10px] text-purple-400/70 bg-purple-500/10 px-1.5 py-0.5 rounded">
//                               {session.session_timezone}
//                             </span>
//                           )}
//                       </td>

//                       <td className="p-4 whitespace-nowrap">
//                         <span
//                           className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
//                             currentStatus === "LIVE"
//                               ? "bg-green-500/20 text-green-400"
//                               : currentStatus === "COMPLETED"
//                               ? "bg-blue-500/20 text-blue-400"
//                               : currentStatus === "UPCOMING"
//                               ? "bg-yellow-500/20 text-yellow-400"
//                               : "bg-yellow-500/20 text-yellow-400"
//                           }`}
//                         >
//                           {currentStatus === "LIVE" && (
//                             <CheckCircle size={12} />
//                           )}
//                           {currentStatus}
//                         </span>
//                       </td>

//                       <td className="p-4 whitespace-nowrap">
//                         {hasZoom ? (
//                           <button
//                             onClick={() => copyZoomLink(session.zoom_link)}
//                             className="flex items-center gap-1.5 text-purple-300/80 hover:text-purple-300 transition-colors"
//                           >
//                             <Video size={14} /> Copy Link
//                           </button>
//                         ) : (
//                           <button
//                             onClick={() => openZoomModal(session)}
//                             className="flex items-center gap-1.5 text-gray-500 hover:text-white transition-colors"
//                           >
//                             <RefreshCcw size={14} /> Generate
//                           </button>
//                         )}
//                       </td>

//                       <td className="p-4">
//                         <div className="flex items-center gap-2">
//                           <button
//                             onClick={() => openEditModal(session)}
//                             className="p-2 rounded-lg hover:bg-[#2a2a35] transition-colors group"
//                             title="Edit"
//                           >
//                             <Edit
//                               size={16}
//                               className="text-white group-hover:text-white transition-colors"
//                             />
//                           </button>
//                           <button
//                             onClick={() => openDeleteModal(session)}
//                             className="p-2 rounded-lg hover:bg-red-500/10 transition-colors group"
//                             title="Delete"
//                           >
//                             <Trash2
//                               size={16}
//                               className="text-red-500/70 group-hover:text-red-400 transition-colors"
//                             />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>

//       {/* ── PAGINATION ── */}
//       {totalPages > 1 && (
//         <div className="flex justify-between items-center mt-6 text-sm">
//           <p className="text-white">
//             Showing {(page - 1) * PAGE_SIZE + 1} to{" "}
//             {Math.min(page * PAGE_SIZE, filteredSessions.length)} of{" "}
//             {filteredSessions.length} entries
//           </p>
//           <div className="flex gap-2">
//             <button
//               onClick={() => setPage((p) => Math.max(1, p - 1))}
//               disabled={page === 1}
//               className="px-4 py-2 rounded-xl bg-[#151519] border border-[#2c2c35] text-gray-300 hover:bg-[#1a1a20] disabled:opacity-50 transition-colors"
//             >
//               Prev
//             </button>
//             <button
//               onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//               disabled={page === totalPages}
//               className="px-4 py-2 rounded-xl bg-[#151519] border border-[#2c2c35] text-gray-300 hover:bg-[#1a1a20] disabled:opacity-50 transition-colors"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       )}

//       {/* ==================== CREATE SESSION MODAL ==================== */}
//       {showCreateModal && (
//         <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
//           <div className="w-full max-w-[700px] max-h-[90vh] bg-[#211c30] rounded-2xl overflow-hidden shadow-2xl">
//             <div className="flex justify-between items-center p-6 border-b border-[#3a3448]">
//               <div>
//                 <h2 className="text-2xl font-bold text-white">
//                   Create Session Templates
//                 </h2>
//                 <p className="text-white mt-1 text-sm">
//                   Define time slots (e.g., Session A, Session B). Times are
//                   saved as{" "}
//                   <span className="text-purple-300">{tz.label}</span>.
//                 </p>
//               </div>
//               <button
//                 onClick={() => setShowCreateModal(false)}
//                 className="text-white hover:text-white transition-colors"
//               >
//                 <X size={20} />
//               </button>
//             </div>

//             <div className="overflow-y-auto max-h-[75vh] p-6">
//               <div className="space-y-1">
//                 <div>
//                   <label className={labelClass}>Class</label>
//                   <select
//                     className={selectClass}
//                     value={form.class_id}
//                     onChange={(e) =>
//                       setForm({ ...form, class_id: e.target.value })
//                     }
//                   >
//                     <option value="">Select Class</option>
//                     {classes.map((cls) => (
//                       <option key={cls.id} value={cls.id}>
//                         {cls.title}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="border-t border-[#3a3448] pt-6 mt-4">
//                   <h3 className="text-lg font-bold flex items-center gap-2 mb-4 text-white">
//                     <Clock size={18} className="text-purple-400" />
//                     Time Slots
//                     <span className="text-xs font-normal text-gray-500 ml-1">
//                       ({tz.abbr})
//                     </span>
//                   </h3>

//                   <div className="space-y-3">
//                     {slots.map((slot) => (
//                       <div
//                         key={slot.id}
//                         className="bg-[#151519] border border-[#2c2c35] rounded-xl p-4"
//                       >
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
//                           <div>
//                             <label className="block mb-1.5 text-xs text-white">
//                               Template Name
//                             </label>
//                             <input
//                               type="text"
//                               className={gridInputClass}
//                               placeholder="e.g. Session B"
//                               value={slot.title}
//                               onChange={(e) =>
//                                 updateSlot(slot.id, "title", e.target.value)
//                               }
//                             />
//                           </div>

//                           <div>
//                             <label className="block mb-1.5 text-xs text-white">
//                               Start Time
//                             </label>
//                             <div className="flex gap-2">
//                               <input
//                                 type="time"
//                                 className={`${gridInputClass} flex-1`}
//                                 value={slot.start_time}
//                                 onChange={(e) =>
//                                   updateSlot(
//                                     slot.id,
//                                     "start_time",
//                                     e.target.value
//                                   )
//                                 }
//                               />
//                               <select
//                                 className="w-20 p-2.5 rounded-lg bg-[#2b2638] text-white border border-transparent focus:outline-none text-sm"
//                                 value={slot.start_ampm}
//                                 onChange={(e) =>
//                                   updateSlot(
//                                     slot.id,
//                                     "start_ampm",
//                                     e.target.value
//                                   )
//                                 }
//                               >
//                                 <option value="AM">AM</option>
//                                 <option value="PM">PM</option>
//                               </select>
//                             </div>
//                           </div>

//                           <div className="flex justify-center items-end h-full">
//                             <button
//                               onClick={() => removeSlot(slot.id)}
//                               className="p-2.5 rounded-lg text-red-500/70 hover:bg-red-500/10 hover:text-red-400 transition-colors"
//                               title="Remove slot"
//                             >
//                               <X size={18} />
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   <button
//                     onClick={addSlot}
//                     className="mt-4 w-full py-3 rounded-xl border border-dashed border-[#2c2c35] hover:border-purple-500/50 text-gray-500 hover:text-purple-400 flex items-center justify-center gap-2 transition-colors"
//                   >
//                     <Plus size={18} /> Add Another Template
//                   </button>
//                 </div>
//               </div>

//               <div className="flex justify-end pt-4 border-t border-[#3a3448] mt-6">
//                 <button
//                   onClick={createSession}
//                   disabled={creating}
//                   className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center gap-2"
//                 >
//                   {creating ? (
//                     <>
//                       <Loader2 size={18} className="animate-spin" /> Creating...
//                     </>
//                   ) : (
//                     <>
//                       <Plus size={18} /> Create Templates
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ==================== EDIT SESSION MODAL ==================== */}
//       {showEditModal && (
//         <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
//           <div className="w-full max-w-[700px] max-h-[90vh] bg-[#211c30] rounded-2xl overflow-hidden shadow-2xl">
//             <div className="flex justify-between items-center p-6 border-b border-[#3a3448]">
//               <div>
//                 <h2 className="text-2xl font-bold text-white">
//                   Edit Template
//                 </h2>
//                 <p className="text-white mt-1 text-sm">
//                   Update session template information.{" "}
//                   <span className="text-purple-300">({tz.abbr})</span>
//                 </p>
//               </div>
//               <button
//                 onClick={() => setShowEditModal(false)}
//                 className="text-white hover:text-white transition-colors"
//               >
//                 <X size={20} />
//               </button>
//             </div>

//             <div className="overflow-y-auto max-h-[75vh] p-6">
//               <div className="space-y-1">
//                 <div>
//                   <label className={labelClass}>Class</label>
//                   <select
//                     className={selectClass}
//                     value={editForm.class_id}
//                     onChange={(e) =>
//                       setEditForm({ ...editForm, class_id: e.target.value })
//                     }
//                   >
//                     {classes.map((cls) => (
//                       <option key={cls.id} value={cls.id}>
//                         {cls.title}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className={labelClass}>Template Title</label>
//                   <input
//                     type="text"
//                     className={inputClass}
//                     value={editForm.title}
//                     onChange={(e) =>
//                       setEditForm({ ...editForm, title: e.target.value })
//                     }
//                   />
//                 </div>

//                 <div className="border-t border-[#3a3448] pt-6 mt-4">
//                   <h3 className="text-lg font-bold flex items-center gap-2 mb-4 text-white">
//                     <Clock size={18} className="text-purple-400" /> Time
//                     Slot
//                   </h3>

//                   <div className="bg-[#151519] border border-[#2c2c35] rounded-xl p-4">
//                     <div className="grid grid-cols-1 md:grid-cols-1 gap-4 items-end max-w-xs">
//                       <div>
//                         <label className="block mb-1.5 text-xs text-white">
//                           Start Time
//                         </label>
//                         <div className="flex gap-2">
//                           <input
//                             type="time"
//                             className={`${gridInputClass} flex-1`}
//                             value={editForm.start_time}
//                             onChange={(e) =>
//                               setEditForm({
//                                 ...editForm,
//                                 start_time: e.target.value,
//                               })
//                             }
//                           />
//                           <select
//                             className="w-20 p-2.5 rounded-lg bg-[#2b2638] text-white border border-transparent focus:outline-none text-sm"
//                             value={editForm.start_ampm}
//                             onChange={(e) =>
//                               setEditForm({
//                                 ...editForm,
//                                 start_ampm: e.target.value,
//                               })
//                             }
//                           >
//                             <option value="AM">AM</option>
//                             <option value="PM">PM</option>
//                           </select>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex justify-end pt-4 border-t border-[#3a3448] mt-6">
//                 <button
//                   onClick={updateSession}
//                   disabled={editing}
//                   className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center gap-2"
//                 >
//                   {editing ? (
//                     <>
//                       <Loader2 size={18} className="animate-spin" /> Updating...
//                     </>
//                   ) : (
//                     <>
//                       <Edit size={18} /> Update Template
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ==================== DELETE CONFIRMATION MODAL ==================== */}
//       {showDeleteModal && (
//         <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50">
//           <div className="w-full max-w-[400px] bg-[#1e1b2e] border border-[#2e2a42] rounded-2xl shadow-2xl overflow-hidden">
//             <div className="p-8 flex flex-col items-center">
//               <div className="w-14 h-14 rounded-full bg-red-500/15 flex items-center justify-center mb-5">
//                 <FaTrash className="text-red-400 text-lg" />
//               </div>
//               <h2 className="text-xl font-bold text-white mb-3 text-center">
//                 Delete Template
//               </h2>
//               <p className="text-white text-center text-sm leading-relaxed mb-4">
//                 Are you sure? This will remove this time slot completely.
//               </p>

//               {selectedSession && (
//                 <div className="w-full bg-[#151519] rounded-xl p-4 mb-8 border border-[#2c2c35] text-sm">
//                   <p className="text-gray-500 text-xs">Title</p>
//                   <p className="font-semibold text-white">
//                     {selectedSession.title || "Untitled Template"}
//                   </p>
//                   <div className="mt-2">
//                     <p className="text-gray-500 text-xs">Start Time</p>
//                     <p className="text-gray-300">
//                       {convertTo12Hour(selectedSession.start_time).time}{" "}
//                       {convertTo12Hour(selectedSession.start_time).ampm}
//                     </p>
//                   </div>
//                 </div>
//               )}

//               <button
//                 onClick={deleteSession}
//                 disabled={deleting}
//                 className="w-full px-5 py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold hover:opacity-90 transition-opacity text-sm disabled:opacity-60 flex items-center justify-center gap-2"
//               >
//                 {deleting ? (
//                   <>
//                     <Loader2 size={16} className="animate-spin" /> Deleting...
//                   </>
//                 ) : (
//                   <>
//                     <Trash2 size={16} /> Delete
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ==================== ZOOM MEETING MODAL ==================== */}
//       {showZoomModal && (
//         <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
//           <div className="w-full max-w-[600px] max-h-[90vh] bg-[#211c30] rounded-2xl overflow-hidden shadow-2xl">
//             <div className="flex justify-between items-center p-6 border-b border-[#3a3448]">
//               <div>
//                 <h2 className="text-2xl font-bold text-white flex items-center gap-2">
//                   <Video className="text-purple-400" size={22} /> Zoom Meeting
//                 </h2>
//                 <p className="text-white mt-1 text-sm">
//                   Manage the recurring Zoom link for this template.
//                 </p>
//               </div>
//               <button
//                 onClick={() => setShowZoomModal(false)}
//                 className="text-white hover:text-white transition-colors"
//               >
//                 <X size={20} />
//               </button>
//             </div>

//             <div className="overflow-y-auto max-h-[75vh] p-6">
//               {selectedSession?.zoom_link ? (
//                 <div className="space-y-1">
//                   <div>
//                     <label className={labelClass}>Meeting ID</label>
//                     <div className="w-full p-3 rounded-xl bg-[#2b2638] text-white border border-transparent">
//                       {selectedSession.zoom_meeting_id || "-"}
//                     </div>
//                   </div>
//                   <div>
//                     <label className={labelClass}>Password</label>
//                     <div className="w-full p-3 rounded-xl bg-[#2b2638] text-white border border-transparent">
//                       {selectedSession.zoom_password || "-"}
//                     </div>
//                   </div>
//                   <div>
//                     <label className={labelClass}>Join URL</label>
//                     <div className="flex gap-3 mt-2">
//                       <input
//                         readOnly
//                         value={selectedSession.zoom_link}
//                         className="w-full p-3 rounded-xl bg-[#2b2638] text-white border border-transparent"
//                       />
//                       <button
//                         onClick={() =>
//                           copyZoomLink(selectedSession?.zoom_link)
//                         }
//                         className="px-5 py-3 rounded-xl bg-[#151519] border border-[#2c2c35] hover:bg-[#1a1a20] transition-colors"
//                       >
//                         <Copy size={18} />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="text-center py-14">
//                   <Video size={60} className="mx-auto text-white" />
//                   <h3 className="text-2xl font-bold mt-6">No Zoom Meeting</h3>
//                   <p className="text-white mt-2">
//                     Generate a recurring Zoom link for this time slot.
//                   </p>
//                 </div>
//               )}

//               <div className="flex justify-end pt-4 border-t border-[#3a3448] mt-6">
//                 <button
//                   onClick={generateZoomMeeting}
//                   disabled={generatingZoom}
//                   className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center gap-2"
//                 >
//                   {generatingZoom ? (
//                     <>
//                       <Loader2 size={18} className="animate-spin" /> Generating...
//                     </>
//                   ) : (
//                     <>
//                       <RefreshCcw size={18} />{" "}
//                       {selectedSession?.zoom_link
//                         ? "Regenerate Zoom"
//                         : "Generate Zoom"}
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



// import React, { useEffect, useMemo, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { FaTrash } from "react-icons/fa";
// import { getAuth } from "firebase/auth";

// import {
//   Plus,
//   Search,
//   Clock,
//   Video,
//   Edit,
//   Trash2,
//   CheckCircle,
//   Loader2,
//   Copy,
//   RefreshCcw,
//   BookOpen,
//   X,
// } from "lucide-react";

// import { useTimezone, getTimezone } from "../utils/timezone";

// /* =========================================================
//    API
// ========================================================= */

// const API_URL =
//   import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// /* =========================================================
//    AUTH
// ========================================================= */

// const authHeader = async () => {
//   const auth = getAuth();

//   let token = null;

//   if (auth.currentUser) {
//     token = await auth.currentUser.getIdToken(true);
//   } else {
//     token = localStorage.getItem("token");
//   }

//   return {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "X-Timezone": getTimezone(),
//     },
//   };
// };

// /* =========================================================
//    TIME HELPERS
// ========================================================= */

// const convertTo24Hour = (time, ampm) => {
//   if (!time) return "";

//   let [hour, minute] = time.split(":").map(Number);

//   if (ampm === "PM" && hour !== 12) {
//     hour += 12;
//   }

//   if (ampm === "AM" && hour === 12) {
//     hour = 0;
//   }

//   return `${String(hour).padStart(2, "0")}:${String(minute).padStart(
//     2,
//     "0"
//   )}`;
// };

// const convertTo12Hour = (time24) => {
//   if (!time24) {
//     return {
//       time: "",
//       ampm: "AM",
//     };
//   }

//   const parts = String(time24).split(":");
//   let hour = Number(parts[0]);
//   const minute = Number(parts[1] || 0);

//   const ampm = hour >= 12 ? "PM" : "AM";

//   hour = hour % 12;

//   if (hour === 0) {
//     hour = 12;
//   }

//   return {
//     time: `${String(hour).padStart(2, "0")}:${String(minute).padStart(
//       2,
//       "0"
//     )}`,
//     ampm,
//   };
// };

// /* =========================================================
//    STATUS HELPERS
// ========================================================= */

// /*
//   IMPORTANT:

//   Database status:
//     ACTIVE

//   Dynamic occurrence status:
//     UPCOMING
//     LIVE
//     COMPLETED

//   We never replace ACTIVE in the database with LIVE/COMPLETED.
// */

// const getTemplateStatus = (session) => {
//   return String(session?.status || "").toUpperCase();
// };

// const getLiveStatus = (session) => {
//   return String(session?.live_status || "").toUpperCase();
// };

// const getDisplayStatus = (session) => {
//   const liveStatus = getLiveStatus(session);

//   if (
//     liveStatus === "UPCOMING" ||
//     liveStatus === "LIVE" ||
//     liveStatus === "COMPLETED"
//   ) {
//     return liveStatus;
//   }

//   return getTemplateStatus(session) || "ACTIVE";
// };

// /* =========================================================
//    STYLES
// ========================================================= */

// const inputClass =
//   "w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors";

// const selectClass =
//   "w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors";

// const labelClass = "block text-sm text-white mb-1";

// const gridInputClass =
//   "w-full p-2.5 rounded-lg bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors text-sm";

// /* =========================================================
//    COMPONENT
// ========================================================= */

// export default function TrainerSessions() {
//   const tz = useTimezone();

//   /* =======================================================
//      STATE
//   ======================================================= */

//   const [sessions, setSessions] = useState([]);
//   const [classes, setClasses] = useState([]);

//   const [loading, setLoading] = useState(true);
//   const [creating, setCreating] = useState(false);
//   const [editing, setEditing] = useState(false);
//   const [deleting, setDeleting] = useState(false);
//   const [generatingZoom, setGeneratingZoom] = useState(false);

//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("ALL");

//   const [page, setPage] = useState(1);

//   const PAGE_SIZE = 10;

//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [showZoomModal, setShowZoomModal] = useState(false);

//   const [form, setForm] = useState({
//     class_id: "",
//     notes: "",
//   });

//   const [slots, setSlots] = useState([
//     {
//       id: Date.now(),
//       title: "",
//       start_time: "",
//       start_ampm: "AM",
//     },
//   ]);

//   const [editForm, setEditForm] = useState({
//     session_id: "",
//     class_id: "",
//     title: "",
//     start_time: "",
//     start_ampm: "AM",
//   });

//   const [selectedSession, setSelectedSession] = useState(null);

//   /* =======================================================
//      SLOT HELPERS
//   ======================================================= */

//   const addSlot = () => {
//     setSlots((prev) => [
//       ...prev,
//       {
//         id: Date.now(),
//         title: "",
//         start_time: "",
//         start_ampm: "AM",
//       },
//     ]);
//   };

//   const removeSlot = (slotId) => {
//     if (slots.length <= 1) {
//       return toast.error("At least one template is required");
//     }

//     setSlots((prev) => prev.filter((slot) => slot.id !== slotId));
//   };

//   const updateSlot = (slotId, field, value) => {
//     setSlots((prev) =>
//       prev.map((slot) =>
//         slot.id === slotId
//           ? {
//               ...slot,
//               [field]: value,
//             }
//           : slot
//       )
//     );
//   };

//   const resetCreateForm = () => {
//     setForm({
//       class_id: "",
//       notes: "",
//     });

//     setSlots([
//       {
//         id: Date.now(),
//         title: "",
//         start_time: "",
//         start_ampm: "AM",
//       },
//     ]);
//   };

//   /* =======================================================
//      FETCH CLASSES
//   ======================================================= */

//   const fetchClasses = async () => {
//     try {
//       const config = await authHeader();

//       const res = await axios.get(
//         `${API_URL}/classes/trainer/my-classes`,
//         config
//       );

//       const classData = res.data?.data || res.data || [];

//       setClasses(Array.isArray(classData) ? classData : []);
//     } catch (err) {
//       console.error("Fetch classes error:", err);
//       toast.error("Failed to load classes");
//       setClasses([]);
//     }
//   };

//   /* =======================================================
//      FETCH SESSIONS
//   ======================================================= */

//   const fetchSessions = async () => {
//     try {
//       setLoading(true);

//       const config = await authHeader();

//       const res = await axios.get(
//         `${API_URL}/sessions/trainer/my-sessions`,
//         config
//       );

//       let data = [];

//       if (Array.isArray(res.data)) {
//         data = res.data;
//       } else if (Array.isArray(res.data?.data)) {
//         data = res.data.data;
//       } else if (Array.isArray(res.data?.sessions)) {
//         data = res.data.sessions;
//       }

//       const normalized = data.map((session) => ({
//         ...session,

//         id: session.id ?? session.session_id,

//         class_title:
//           session.class_title ||
//           session.class_name ||
//           session.class?.title ||
//           session.class?.name ||
//           "-",

//         status: session.status
//           ? String(session.status).toUpperCase()
//           : "ACTIVE",

//         live_status: session.live_status
//           ? String(session.live_status).toUpperCase()
//           : undefined,
//       }));

//       setSessions(normalized);
//     } catch (err) {
//       console.error("Fetch sessions error:", err);

//       toast.error(
//         err.response?.data?.message || "Failed to load sessions"
//       );

//       setSessions([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* =======================================================
//      INITIAL LOAD
//   ======================================================= */

//   useEffect(() => {
//     fetchClasses();
//     fetchSessions();
//   }, []);

//   /* =======================================================
//      FILTER + SEARCH
//   ======================================================= */

//   const filteredSessions = useMemo(() => {
//     let data = Array.isArray(sessions) ? [...sessions] : [];

//     /*
//       ACTIVE = database/template status

//       UPCOMING/LIVE/COMPLETED = dynamic occurrence status
//     */

//     if (statusFilter !== "ALL") {
//       data = data.filter((session) => {
//         if (statusFilter === "ACTIVE") {
//           return getTemplateStatus(session) === "ACTIVE";
//         }

//         return getLiveStatus(session) === statusFilter;
//       });
//     }

//     if (search.trim()) {
//       const keyword = search.toLowerCase().trim();

//       data = data.filter((session) => {
//         const title = String(session.title || "").toLowerCase();

//         const classTitle = String(
//           session.class_title ||
//             session.class_name ||
//             ""
//         ).toLowerCase();

//         return (
//           title.includes(keyword) ||
//           classTitle.includes(keyword)
//         );
//       });
//     }

//     return data;
//   }, [sessions, search, statusFilter]);

//   /* =======================================================
//      PAGINATION
//   ======================================================= */

//   const totalPages = Math.ceil(
//     filteredSessions.length / PAGE_SIZE
//   );

//   const paginatedSessions = useMemo(() => {
//     const start = (page - 1) * PAGE_SIZE;

//     return filteredSessions.slice(
//       start,
//       start + PAGE_SIZE
//     );
//   }, [filteredSessions, page]);

//   useEffect(() => {
//     if (page > totalPages && totalPages > 0) {
//       setPage(1);
//     }

//     if (totalPages === 0 && page !== 1) {
//       setPage(1);
//     }
//   }, [filteredSessions, page, totalPages]);

//   useEffect(() => {
//     setPage(1);
//   }, [search, statusFilter]);

//   /* =======================================================
//      STATS
//   ======================================================= */

//   const stats = useMemo(() => {
//     const list = Array.isArray(sessions)
//       ? sessions
//       : [];

//     return {
//       total: list.length,

//       active: list.filter(
//         (session) =>
//           getTemplateStatus(session) === "ACTIVE"
//       ).length,

//       scheduled: list.filter(
//         (session) => {
//           const status = getLiveStatus(session);

//           return (
//             status === "SCHEDULED" ||
//             status === "UPCOMING"
//           );
//         }
//       ).length,

//       live: list.filter(
//         (session) =>
//           getLiveStatus(session) === "LIVE"
//       ).length,

//       completed: list.filter(
//         (session) =>
//           getLiveStatus(session) === "COMPLETED"
//       ).length,
//     };
//   }, [sessions]);

//   /* =======================================================
//      CREATE SESSION TEMPLATES
//   ======================================================= */

//   const createSession = async () => {
//     if (creating) return;

//     try {
//       if (!form.class_id) {
//         return toast.error("Select a class");
//       }

//       const invalidSlot = slots.find(
//         (slot) =>
//           !slot.title?.trim() ||
//           !slot.start_time
//       );

//       if (invalidSlot) {
//         return toast.error(
//           "Please fill title and start time for all templates"
//         );
//       }

//       setCreating(true);

//       const payloads = slots.map((slot) => ({
//         class_id: form.class_id,
//         title: slot.title.trim(),
//         start_time: convertTo24Hour(
//           slot.start_time,
//           slot.start_ampm
//         ),
//         notes: form.notes,
//         timezone: tz.timezone,
//       }));

//       const config = await authHeader();

//       await axios.post(
//         `${API_URL}/sessions/trainer/create`,
//         {
//           sessions: payloads,
//         },
//         config
//       );

//       toast.success(
//         `${payloads.length} session template(s) created`
//       );

//       setShowCreateModal(false);

//       resetCreateForm();

//       await fetchSessions();
//     } catch (err) {
//       console.error("Create session error:", err);

//       toast.error(
//         err.response?.data?.message ||
//           "Unable to create sessions"
//       );
//     } finally {
//       setCreating(false);
//     }
//   };

//   /* =======================================================
//      EDIT
//   ======================================================= */

//   const openEditModal = (session) => {
//     setSelectedSession(session);

//     const start = convertTo12Hour(
//       session.start_time
//     );

//     setEditForm({
//       session_id: session.id,
//       class_id: session.class_id,
//       title: session.title || "",
//       start_time: start.time,
//       start_ampm: start.ampm,
//     });

//     setShowEditModal(true);
//   };

//   const updateSession = async () => {
//     if (editing) return;

//     try {
//       if (!editForm.class_id) {
//         return toast.error("Select a class");
//       }

//       if (!editForm.title?.trim()) {
//         return toast.error(
//           "Please enter template title"
//         );
//       }

//       if (!editForm.start_time) {
//         return toast.error(
//           "Please select start time"
//         );
//       }

//       setEditing(true);

//       const config = await authHeader();

//       await axios.put(
//         `${API_URL}/sessions/trainer/${editForm.session_id}`,
//         {
//           class_id: editForm.class_id,
//           title: editForm.title.trim(),
//           start_time: convertTo24Hour(
//             editForm.start_time,
//             editForm.start_ampm
//           ),
//           timezone: tz.timezone,
//         },
//         config
//       );

//       toast.success(
//         "Session template updated"
//       );

//       setShowEditModal(false);

//       setSelectedSession(null);

//       await fetchSessions();
//     } catch (err) {
//       console.error("Update session error:", err);

//       toast.error(
//         err.response?.data?.message ||
//           "Unable to update session"
//       );
//     } finally {
//       setEditing(false);
//     }
//   };

//   /* =======================================================
//      DELETE
//   ======================================================= */

//   const openDeleteModal = (session) => {
//     setSelectedSession(session);
//     setShowDeleteModal(true);
//   };

//   const deleteSession = async () => {
//     if (!selectedSession || deleting) return;

//     try {
//       setDeleting(true);

//       const config = await authHeader();

//       await axios.delete(
//         `${API_URL}/sessions/trainer/${selectedSession.id}`,
//         config
//       );

//       toast.success("Session deleted");

//       setShowDeleteModal(false);

//       setSelectedSession(null);

//       await fetchSessions();
//     } catch (err) {
//       console.error("Delete session error:", err);

//       toast.error(
//         err.response?.data?.message ||
//           "Unable to delete session"
//       );
//     } finally {
//       setDeleting(false);
//     }
//   };

//   /* =======================================================
//      ZOOM
//   ======================================================= */

//   const openZoomModal = (session) => {
//     setSelectedSession(session);
//     setShowZoomModal(true);
//   };

//   const generateZoomMeeting = async () => {
//     if (!selectedSession || generatingZoom) {
//       return;
//     }

//     try {
//       setGeneratingZoom(true);

//       const config = await authHeader();

//       await axios.post(
//         `${API_URL}/sessions/trainer/${selectedSession.id}/generate-zoom`,
//         {},
//         config
//       );

//       toast.success(
//         "Zoom meeting generated"
//       );

//       await fetchSessions();

//       setShowZoomModal(false);
//     } catch (err) {
//       console.error(
//         "Generate Zoom error:",
//         err
//       );

//       toast.error(
//         err.response?.data?.message ||
//           "Unable to generate Zoom meeting"
//       );
//     } finally {
//       setGeneratingZoom(false);
//     }
//   };

//   const copyZoomLink = async (link) => {
//     if (!link) {
//       return toast.error(
//         "Zoom link not available"
//       );
//     }

//     try {
//       await navigator.clipboard.writeText(link);

//       toast.success("Zoom link copied");
//     } catch {
//       try {
//         const textArea =
//           document.createElement("textarea");

//         textArea.value = link;

//         document.body.appendChild(textArea);

//         textArea.select();

//         document.execCommand("copy");

//         document.body.removeChild(textArea);

//         toast.success("Zoom link copied");
//       } catch {
//         toast.error(
//           "Unable to copy Zoom link"
//         );
//       }
//     }
//   };

//   /* =======================================================
//      STATUS UI
//   ======================================================= */

//   const getStatusClass = (status) => {
//     switch (status) {
//       case "LIVE":
//         return "bg-red-500/20 text-red-400";

//       case "COMPLETED":
//         return "bg-blue-500/20 text-blue-400";

//       case "UPCOMING":
//         return "bg-yellow-500/20 text-yellow-400";

//       case "ACTIVE":
//         return "bg-purple-500/20 text-purple-400";

//       case "SCHEDULED":
//         return "bg-yellow-500/20 text-yellow-400";

//       default:
//         return "bg-gray-500/20 text-gray-400";
//     }
//   };

//   const getStatusLabel = (status) => {
//     switch (status) {
//       case "LIVE":
//         return "LIVE";

//       case "COMPLETED":
//         return "COMPLETED";

//       case "UPCOMING":
//         return "UPCOMING";

//       case "ACTIVE":
//         return "ACTIVE";

//       case "SCHEDULED":
//         return "SCHEDULED";

//       default:
//         return status || "ACTIVE";
//     }
//   };

//   /* =======================================================
//      RENDER
//   ======================================================= */

//   return (
//     <div className="p-8 text-white">

//       {/* ===================================================
//           HEADER
//       =================================================== */}

//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">

//         <div>
//           <h1 className="text-4xl font-bold text-purple-400">
//             Trainer Session Templates
//           </h1>

//           <p className="text-white mt-2">
//             Manage recurring time slots
//             (e.g., Session A, B, C).
//           </p>
//         </div>

//         <button
//           onClick={() => {
//             resetCreateForm();
//             setShowCreateModal(true);
//           }}
//           className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition-opacity flex items-center gap-2"
//         >
//           <Plus size={18} />

//           Create Template
//         </button>
//       </div>

//       {/* ===================================================
//           STATS
//       =================================================== */}

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

//         {/* TOTAL */}

//         <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-5">
//           <p className="text-white text-sm">
//             Total Templates
//           </p>

//           <h2 className="text-4xl font-bold mt-2">
//             {stats.total}
//           </h2>
//         </div>

//         {/* UPCOMING */}

//         <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-5">
//           <p className="text-white text-sm">
//             Upcoming
//           </p>

//           <h2 className="text-4xl font-bold text-white mt-2">
//             {stats.scheduled}
//           </h2>
//         </div>

//         {/* LIVE */}

//         <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-5">
//           <p className="text-white text-sm">
//             Live
//           </p>

//           <h2 className="text-4xl font-bold text-white mt-2">
//             {stats.live}
//           </h2>
//         </div>

//         {/* COMPLETED */}

//         <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-5">
//           <p className="text-white text-sm">
//             Completed
//           </p>

//           <h2 className="text-4xl font-bold text-white mt-2">
//             {stats.completed}
//           </h2>
//         </div>
//       </div>

//       {/* ===================================================
//           FILTERS
//       =================================================== */}

//       <div className="mb-6">

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

//           {/* SEARCH */}

//           <div className="relative w-full">

//             <Search
//               className="absolute left-4 top-1/2 -translate-y-1/2 text-white pointer-events-none"
//               size={18}
//             />

//             <input
//               type="text"
//               placeholder="Search templates..."
//               value={search}
//               onChange={(e) =>
//                 setSearch(e.target.value)
//               }
//               className="w-full pl-12 pr-10 py-3.5 rounded-xl bg-[#151519] border border-[#2c2c35] text-white placeholder-white focus:outline-none focus:border-purple-500/60 transition-colors text-sm"
//             />

//             {search && (
//               <button
//                 onClick={() => setSearch("")}
//                 className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-purple-400 transition-colors"
//               >
//                 <X size={14} />
//               </button>
//             )}
//           </div>

//           {/* STATUS */}

//           <select
//             value={statusFilter}
//             onChange={(e) =>
//               setStatusFilter(e.target.value)
//             }
//             className="w-full py-3.5 px-4 rounded-xl bg-[#151519] border border-[#2c2c35] text-white focus:outline-none focus:border-purple-500/60 transition-colors text-sm"
//           >
//             <option value="ALL">
//               All Status
//             </option>

//             <option value="ACTIVE">
//               Active
//             </option>

//             <option value="UPCOMING">
//               Upcoming
//             </option>

//             <option value="LIVE">
//               Live
//             </option>

//             <option value="COMPLETED">
//               Completed
//             </option>
//           </select>
//         </div>
//       </div>

//       {/* ===================================================
//           TABLE
//       =================================================== */}

//       <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl overflow-hidden">

//         <div className="overflow-x-auto">

//           {loading ? (
//             <div className="p-24 flex flex-col items-center justify-center">

//               <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />

//               <p className="mt-5 text-gray-500">
//                 Loading Sessions...
//               </p>
//             </div>
//           ) : paginatedSessions.length === 0 ? (
//             <div className="p-12 text-center">

//               <BookOpen
//                 size={40}
//                 className="text-gray-600 mx-auto"
//               />

//               <p className="text-gray-500 text-lg mt-3">
//                 {search
//                   ? "No templates found"
//                   : statusFilter !== "ALL"
//                   ? `No ${statusFilter.toLowerCase()} templates found`
//                   : "No session templates active right now"}
//               </p>
//             </div>
//           ) : (
//             <table className="w-full">

//               <thead className="bg-[#202027] text-white">

//                 <tr>
//                   <th className="p-4 text-left whitespace-nowrap">
//                     Class
//                   </th>

//                   <th className="p-4 text-left whitespace-nowrap">
//                     Template
//                   </th>

//                   <th className="p-4 text-left whitespace-nowrap">
//                     Start Time
//                   </th>

//                   <th className="p-4 text-left whitespace-nowrap">
//                     Status
//                   </th>

//                   <th className="p-4 text-left whitespace-nowrap">
//                     Zoom
//                   </th>

//                   <th className="p-4 text-left whitespace-nowrap">
//                     Actions
//                   </th>
//                 </tr>

//               </thead>

//               <tbody>

//                 {paginatedSessions.map((session) => {

//                   const hasZoom =
//                     !!session.zoom_link;

//                   const start12 =
//                     convertTo12Hour(
//                       session.start_time
//                     );

//                   const currentStatus =
//                     getDisplayStatus(session);

//                   return (
//                     <tr
//                       key={session.id}
//                       className="border-t border-[#2c2c35] hover:bg-[#1a1a20] transition-colors"
//                     >

//                       {/* CLASS */}

//                       <td className="p-4 text-white whitespace-nowrap">

//                         {session.class_title ||
//                           session.class_name ||
//                           "-"}

//                       </td>

//                       {/* TEMPLATE */}

//                       <td className="p-4 text-gray-300 whitespace-nowrap">

//                         {session.title ||
//                           "Untitled Template"}

//                       </td>

//                       {/* TIME */}

//                       <td className="p-4 text-white whitespace-nowrap">

//                         <span>
//                           {start12.time}{" "}
//                           {start12.ampm}
//                         </span>

//                         {session.session_timezone &&
//                           session.session_timezone !==
//                             tz.timezone && (
//                             <span className="ml-1.5 text-[10px] text-purple-400/70 bg-purple-500/10 px-1.5 py-0.5 rounded">
//                               {
//                                 session.session_timezone
//                               }
//                             </span>
//                           )}
//                       </td>

//                       {/* STATUS */}

//                       <td className="p-4 whitespace-nowrap">

//                         <span
//                           className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusClass(
//                             currentStatus
//                           )}`}
//                         >

//                           {currentStatus ===
//                             "LIVE" && (
//                             <CheckCircle size={12} />
//                           )}

//                           {getStatusLabel(
//                             currentStatus
//                           )}
//                         </span>
//                       </td>

//                       {/* ZOOM */}

//                       <td className="p-4 whitespace-nowrap">

//                         {hasZoom ? (
//                           <button
//                             onClick={() =>
//                               copyZoomLink(
//                                 session.zoom_link
//                               )
//                             }
//                             className="flex items-center gap-1.5 text-purple-300/80 hover:text-purple-300 transition-colors"
//                           >
//                             <Video size={14} />

//                             Copy Link
//                           </button>
//                         ) : (
//                           <button
//                             onClick={() =>
//                               openZoomModal(
//                                 session
//                               )
//                             }
//                             className="flex items-center gap-1.5 text-gray-500 hover:text-white transition-colors"
//                           >
//                             <RefreshCcw size={14} />

//                             Generate
//                           </button>
//                         )}

//                       </td>

//                       {/* ACTIONS */}

//                       <td className="p-4">

//                         <div className="flex items-center gap-2">

//                           <button
//                             onClick={() =>
//                               openEditModal(
//                                 session
//                               )
//                             }
//                             className="p-2 rounded-lg hover:bg-[#2a2a35] transition-colors group"
//                             title="Edit"
//                           >
//                             <Edit
//                               size={16}
//                               className="text-white group-hover:text-purple-400 transition-colors"
//                             />
//                           </button>

//                           <button
//                             onClick={() =>
//                               openDeleteModal(
//                                 session
//                               )
//                             }
//                             className="p-2 rounded-lg hover:bg-red-500/10 transition-colors group"
//                             title="Delete"
//                           >
//                             <Trash2
//                               size={16}
//                               className="text-red-500/70 group-hover:text-red-400 transition-colors"
//                             />
//                           </button>

//                         </div>
//                       </td>

//                     </tr>
//                   );
//                 })}

//               </tbody>
//             </table>
//           )}

//         </div>
//       </div>

//       {/* ===================================================
//           PAGINATION
//       =================================================== */}

//       {totalPages > 1 && (
//         <div className="flex justify-between items-center mt-6 text-sm">

//           <p className="text-white">
//             Showing{" "}
//             {(page - 1) * PAGE_SIZE + 1}{" "}
//             to{" "}
//             {Math.min(
//               page * PAGE_SIZE,
//               filteredSessions.length
//             )}{" "}
//             of{" "}
//             {filteredSessions.length} entries
//           </p>

//           <div className="flex gap-2">

//             <button
//               onClick={() =>
//                 setPage((p) =>
//                   Math.max(1, p - 1)
//                 )
//               }
//               disabled={page === 1}
//               className="px-4 py-2 rounded-xl bg-[#151519] border border-[#2c2c35] text-gray-300 hover:bg-[#1a1a20] disabled:opacity-50 transition-colors"
//             >
//               Prev
//             </button>

//             <button
//               onClick={() =>
//                 setPage((p) =>
//                   Math.min(totalPages, p + 1)
//                 )
//               }
//               disabled={page === totalPages}
//               className="px-4 py-2 rounded-xl bg-[#151519] border border-[#2c2c35] text-gray-300 hover:bg-[#1a1a20] disabled:opacity-50 transition-colors"
//             >
//               Next
//             </button>

//           </div>
//         </div>
//       )}

//       {/* ===================================================
//           CREATE MODAL
//       =================================================== */}

//       {showCreateModal && (
//         <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">

//           <div className="w-full max-w-[700px] max-h-[90vh] bg-[#211c30] rounded-2xl overflow-hidden shadow-2xl">

//             <div className="flex justify-between items-center p-6 border-b border-[#3a3448]">

//               <div>
//                 <h2 className="text-2xl font-bold text-white">
//                   Create Session Templates
//                 </h2>

//                 <p className="text-white mt-1 text-sm">
//                   Define time slots
//                   (e.g., Session A,
//                   Session B).
//                   Times are saved as{" "}
//                   <span className="text-purple-300">
//                     {tz.label}
//                   </span>
//                   .
//                 </p>
//               </div>

//               <button
//                 onClick={() =>
//                   setShowCreateModal(false)
//                 }
//                 className="text-white hover:text-purple-400 transition-colors"
//               >
//                 <X size={20} />
//               </button>

//             </div>

//             <div className="overflow-y-auto max-h-[75vh] p-6">

//               {/* CLASS */}

//               <div>
//                 <label className={labelClass}>
//                   Class
//                 </label>

//                 <select
//                   className={selectClass}
//                   value={form.class_id}
//                   onChange={(e) =>
//                     setForm({
//                       ...form,
//                       class_id:
//                         e.target.value,
//                     })
//                   }
//                 >

//                   <option value="">
//                     Select Class
//                   </option>

//                   {classes.map((cls) => (
//                     <option
//                       key={cls.id}
//                       value={cls.id}
//                     >
//                       {cls.title ||
//                         cls.name ||
//                         `Class #${cls.id}`}
//                     </option>
//                   ))}

//                 </select>
//               </div>

//               {/* TIME SLOTS */}

//               <div className="border-t border-[#3a3448] pt-6 mt-4">

//                 <h3 className="text-lg font-bold flex items-center gap-2 mb-4 text-white">

//                   <Clock
//                     size={18}
//                     className="text-purple-400"
//                   />

//                   Time Slots

//                   <span className="text-xs font-normal text-gray-500 ml-1">
//                     ({tz.abbr})
//                   </span>

//                 </h3>

//                 <div className="space-y-3">

//                   {slots.map((slot) => (
//                     <div
//                       key={slot.id}
//                       className="bg-[#151519] border border-[#2c2c35] rounded-xl p-4"
//                     >

//                       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">

//                         {/* TITLE */}

//                         <div>
//                           <label className="block mb-1.5 text-xs text-white">
//                             Template Name
//                           </label>

//                           <input
//                             type="text"
//                             className={gridInputClass}
//                             placeholder="e.g. Session B"
//                             value={slot.title}
//                             onChange={(e) =>
//                               updateSlot(
//                                 slot.id,
//                                 "title",
//                                 e.target.value
//                               )
//                             }
//                           />
//                         </div>

//                         {/* TIME */}

//                         <div>
//                           <label className="block mb-1.5 text-xs text-white">
//                             Start Time
//                           </label>

//                           <div className="flex gap-2">

//                             <input
//                               type="time"
//                               className={`${gridInputClass} flex-1`}
//                               value={
//                                 slot.start_time
//                               }
//                               onChange={(e) =>
//                                 updateSlot(
//                                   slot.id,
//                                   "start_time",
//                                   e.target.value
//                                 )
//                               }
//                             />

//                             <select
//                               className="w-20 p-2.5 rounded-lg bg-[#2b2638] text-white border border-transparent focus:outline-none text-sm"
//                               value={
//                                 slot.start_ampm
//                               }
//                               onChange={(e) =>
//                                 updateSlot(
//                                   slot.id,
//                                   "start_ampm",
//                                   e.target.value
//                                 )
//                               }
//                             >
//                               <option value="AM">
//                                 AM
//                               </option>

//                               <option value="PM">
//                                 PM
//                               </option>
//                             </select>

//                           </div>
//                         </div>

//                         {/* REMOVE */}

//                         <div className="flex justify-center items-end h-full">

//                           <button
//                             onClick={() =>
//                               removeSlot(
//                                 slot.id
//                               )
//                             }
//                             className="p-2.5 rounded-lg text-red-500/70 hover:bg-red-500/10 hover:text-red-400 transition-colors"
//                             title="Remove slot"
//                           >
//                             <X size={18} />
//                           </button>

//                         </div>

//                       </div>
//                     </div>
//                   ))}

//                 </div>

//                 <button
//                   onClick={addSlot}
//                   className="mt-4 w-full py-3 rounded-xl border border-dashed border-[#2c2c35] hover:border-purple-500/50 text-gray-500 hover:text-purple-400 flex items-center justify-center gap-2 transition-colors"
//                 >
//                   <Plus size={18} />

//                   Add Another Template
//                 </button>

//               </div>

//               {/* NOTES */}

//               <div className="mt-6">

//                 <label className={labelClass}>
//                   Notes
//                 </label>

//                 <textarea
//                   className={`${inputClass} min-h-[100px] resize-none`}
//                   placeholder="Optional notes..."
//                   value={form.notes}
//                   onChange={(e) =>
//                     setForm({
//                       ...form,
//                       notes: e.target.value,
//                     })
//                   }
//                 />

//               </div>

//               {/* FOOTER */}

//               <div className="flex justify-end pt-4 border-t border-[#3a3448] mt-6">

//                 <button
//                   onClick={createSession}
//                   disabled={creating}
//                   className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center gap-2"
//                 >

//                   {creating ? (
//                     <>
//                       <Loader2
//                         size={18}
//                         className="animate-spin"
//                       />

//                       Creating...
//                     </>
//                   ) : (
//                     <>
//                       <Plus size={18} />

//                       Create Templates
//                     </>
//                   )}

//                 </button>

//               </div>

//             </div>
//           </div>
//         </div>
//       )}

//       {/* ===================================================
//           EDIT MODAL
//       =================================================== */}

//       {showEditModal && (
//         <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">

//           <div className="w-full max-w-[700px] max-h-[90vh] bg-[#211c30] rounded-2xl overflow-hidden shadow-2xl">

//             <div className="flex justify-between items-center p-6 border-b border-[#3a3448]">

//               <div>
//                 <h2 className="text-2xl font-bold text-white">
//                   Edit Template
//                 </h2>

//                 <p className="text-white mt-1 text-sm">
//                   Update session template information.
//                   <span className="text-purple-300">
//                     {" "}
//                     ({tz.abbr})
//                   </span>
//                 </p>
//               </div>

//               <button
//                 onClick={() =>
//                   setShowEditModal(false)
//                 }
//                 className="text-white hover:text-purple-400 transition-colors"
//               >
//                 <X size={20} />
//               </button>

//             </div>

//             <div className="overflow-y-auto max-h-[75vh] p-6">

//               {/* CLASS */}

//               <div>
//                 <label className={labelClass}>
//                   Class
//                 </label>

//                 <select
//                   className={selectClass}
//                   value={editForm.class_id}
//                   onChange={(e) =>
//                     setEditForm({
//                       ...editForm,
//                       class_id:
//                         e.target.value,
//                     })
//                   }
//                 >

//                   {classes.map((cls) => (
//                     <option
//                       key={cls.id}
//                       value={cls.id}
//                     >
//                       {cls.title ||
//                         cls.name ||
//                         `Class #${cls.id}`}
//                     </option>
//                   ))}

//                 </select>
//               </div>

//               {/* TITLE */}

//               <div>
//                 <label className={labelClass}>
//                   Template Title
//                 </label>

//                 <input
//                   type="text"
//                   className={inputClass}
//                   value={editForm.title}
//                   onChange={(e) =>
//                     setEditForm({
//                       ...editForm,
//                       title: e.target.value,
//                     })
//                   }
//                 />
//               </div>

//               {/* TIME */}

//               <div className="border-t border-[#3a3448] pt-6 mt-4">

//                 <h3 className="text-lg font-bold flex items-center gap-2 mb-4 text-white">

//                   <Clock
//                     size={18}
//                     className="text-purple-400"
//                   />

//                   Time Slot

//                 </h3>

//                 <div className="bg-[#151519] border border-[#2c2c35] rounded-xl p-4">

//                   <div className="max-w-xs">

//                     <label className="block mb-1.5 text-xs text-white">
//                       Start Time
//                     </label>

//                     <div className="flex gap-2">

//                       <input
//                         type="time"
//                         className={`${gridInputClass} flex-1`}
//                         value={
//                           editForm.start_time
//                         }
//                         onChange={(e) =>
//                           setEditForm({
//                             ...editForm,
//                             start_time:
//                               e.target.value,
//                           })
//                         }
//                       />

//                       <select
//                         className="w-20 p-2.5 rounded-lg bg-[#2b2638] text-white border border-transparent focus:outline-none text-sm"
//                         value={
//                           editForm.start_ampm
//                         }
//                         onChange={(e) =>
//                           setEditForm({
//                             ...editForm,
//                             start_ampm:
//                               e.target.value,
//                           })
//                         }
//                       >
//                         <option value="AM">
//                           AM
//                         </option>

//                         <option value="PM">
//                           PM
//                         </option>
//                       </select>

//                     </div>
//                   </div>

//                 </div>
//               </div>

//               {/* FOOTER */}

//               <div className="flex justify-end pt-4 border-t border-[#3a3448] mt-6">

//                 <button
//                   onClick={updateSession}
//                   disabled={editing}
//                   className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center gap-2"
//                 >

//                   {editing ? (
//                     <>
//                       <Loader2
//                         size={18}
//                         className="animate-spin"
//                       />

//                       Updating...
//                     </>
//                   ) : (
//                     <>
//                       <Edit size={18} />

//                       Update Template
//                     </>
//                   )}

//                 </button>

//               </div>

//             </div>
//           </div>
//         </div>
//       )}

//       {/* ===================================================
//           DELETE MODAL
//       =================================================== */}

//       {showDeleteModal && (
//         <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50">

//           <div className="w-full max-w-[400px] bg-[#1e1b2e] border border-[#2e2a42] rounded-2xl shadow-2xl overflow-hidden">

//             <div className="p-8 flex flex-col items-center">

//               <div className="w-14 h-14 rounded-full bg-red-500/15 flex items-center justify-center mb-5">

//                 <FaTrash className="text-red-400 text-lg" />

//               </div>

//               <h2 className="text-xl font-bold text-white mb-3 text-center">
//                 Delete Template
//               </h2>

//               <p className="text-white text-center text-sm leading-relaxed mb-4">
//                 Are you sure? This will remove this time slot completely.
//               </p>

//               {selectedSession && (
//                 <div className="w-full bg-[#151519] rounded-xl p-4 mb-8 border border-[#2c2c35] text-sm">

//                   <p className="text-gray-500 text-xs">
//                     Class
//                   </p>

//                   <p className="font-semibold text-white">
//                     {selectedSession.class_title ||
//                       "-"}
//                   </p>

//                   <div className="mt-3">

//                     <p className="text-gray-500 text-xs">
//                       Title
//                     </p>

//                     <p className="font-semibold text-white">
//                       {selectedSession.title ||
//                         "Untitled Template"}
//                     </p>

//                   </div>

//                   <div className="mt-2">

//                     <p className="text-gray-500 text-xs">
//                       Start Time
//                     </p>

//                     <p className="text-gray-300">

//                       {
//                         convertTo12Hour(
//                           selectedSession.start_time
//                         ).time
//                       }{" "}

//                       {
//                         convertTo12Hour(
//                           selectedSession.start_time
//                         ).ampm
//                       }

//                     </p>

//                   </div>

//                 </div>
//               )}

//               <button
//                 onClick={deleteSession}
//                 disabled={deleting}
//                 className="w-full px-5 py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold hover:opacity-90 transition-opacity text-sm disabled:opacity-60 flex items-center justify-center gap-2"
//               >

//                 {deleting ? (
//                   <>
//                     <Loader2
//                       size={16}
//                       className="animate-spin"
//                     />

//                     Deleting...
//                   </>
//                 ) : (
//                   <>
//                     <Trash2 size={16} />

//                     Delete
//                   </>
//                 )}

//               </button>

//             </div>
//           </div>
//         </div>
//       )}

//       {/* ===================================================
//           ZOOM MODAL
//       =================================================== */}

//       {showZoomModal && (
//         <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">

//           <div className="w-full max-w-[600px] max-h-[90vh] bg-[#211c30] rounded-2xl overflow-hidden shadow-2xl">

//             <div className="flex justify-between items-center p-6 border-b border-[#3a3448]">

//               <div>

//                 <h2 className="text-2xl font-bold text-white flex items-center gap-2">

//                   <Video
//                     className="text-purple-400"
//                     size={22}
//                   />

//                   Zoom Meeting

//                 </h2>

//                 <p className="text-white mt-1 text-sm">
//                   Manage the recurring Zoom link for this template.
//                 </p>

//               </div>

//               <button
//                 onClick={() =>
//                   setShowZoomModal(false)
//                 }
//                 className="text-white hover:text-purple-400 transition-colors"
//               >
//                 <X size={20} />
//               </button>

//             </div>

//             <div className="overflow-y-auto max-h-[75vh] p-6">

//               {selectedSession?.zoom_link ? (
//                 <div className="space-y-4">

//                   {/* MEETING ID */}

//                   <div>

//                     <label className={labelClass}>
//                       Meeting ID
//                     </label>

//                     <div className="w-full p-3 rounded-xl bg-[#2b2638] text-white">
//                       {selectedSession.zoom_meeting_id ||
//                         "-"}
//                     </div>

//                   </div>

//                   {/* PASSWORD */}

//                   <div>

//                     <label className={labelClass}>
//                       Password
//                     </label>

//                     <div className="w-full p-3 rounded-xl bg-[#2b2638] text-white">
//                       {selectedSession.zoom_password ||
//                         "-"}
//                     </div>

//                   </div>

//                   {/* URL */}

//                   <div>

//                     <label className={labelClass}>
//                       Join URL
//                     </label>

//                     <div className="flex gap-3 mt-2">

//                       <input
//                         readOnly
//                         value={
//                           selectedSession.zoom_link
//                         }
//                         className="w-full p-3 rounded-xl bg-[#2b2638] text-white border border-transparent"
//                       />

//                       <button
//                         onClick={() =>
//                           copyZoomLink(
//                             selectedSession.zoom_link
//                           )
//                         }
//                         className="px-5 py-3 rounded-xl bg-[#151519] border border-[#2c2c35] hover:bg-[#1a1a20] transition-colors"
//                       >
//                         <Copy size={18} />
//                       </button>

//                     </div>

//                   </div>

//                 </div>
//               ) : (
//                 <div className="text-center py-14">

//                   <Video
//                     size={60}
//                     className="mx-auto text-white"
//                   />

//                   <h3 className="text-2xl font-bold mt-6">
//                     No Zoom Meeting
//                   </h3>

//                   <p className="text-white mt-2">
//                     Generate a recurring Zoom link for this time slot.
//                   </p>

//                 </div>
//               )}

//               {/* FOOTER */}

//               <div className="flex justify-end pt-4 border-t border-[#3a3448] mt-6">

//                 <button
//                   onClick={generateZoomMeeting}
//                   disabled={generatingZoom}
//                   className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center gap-2"
//                 >

//                   {generatingZoom ? (
//                     <>
//                       <Loader2
//                         size={18}
//                         className="animate-spin"
//                       />

//                       Generating...
//                     </>
//                   ) : (
//                     <>
//                       <RefreshCcw size={18} />

//                       {selectedSession?.zoom_link
//                         ? "Regenerate Zoom"
//                         : "Generate Zoom"}
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



import React from "react";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import { getAuth } from "firebase/auth";
import {
  Plus,
  Search,
  Clock,
  Video,
  Edit,
  Trash2,
  CheckCircle,
  Loader2,
  Copy,
  RefreshCcw,
  BookOpen,
  X,
  CalendarClock,
  Users,
} from "lucide-react";
import { useTimezone, getTimezone } from "../utils/timezone";

// const API_URL =
//   import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://finearts-backend.onrender.com/api";


/* =========================================================
   AUTH
========================================================= */

const authHeader = async () => {
  const auth = getAuth();

  let token = null;

  if (auth.currentUser) {
    token = await auth.currentUser.getIdToken(true);
  } else {
    token = localStorage.getItem("token");
  }

  if (!token) {
    throw new Error("Authentication token not available. Please sign in again.");
  }

  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Timezone": getTimezone(),
    },
  };
};

/* =========================================================
   TIME HELPERS
   UI: 12-hour format
   API: 24-hour format
========================================================= */

const sanitize12HourTime = (value = "") => {
  let raw = String(value).replace(/[^0-9:]/g, "");

  if (!raw.includes(":") && raw.length > 2) {
    raw = `${raw.slice(0, -2)}:${raw.slice(-2)}`;
  }

  let [hours = "", minutes = ""] = raw.split(":");

  hours = hours.replace(/\D/g, "").slice(0, 2);
  minutes = minutes.replace(/\D/g, "").slice(0, 2);

  if (!raw.includes(":")) return hours;

  return `${hours}${minutes !== "" ? `:${minutes}` : ":"}`;
};

const isValid12HourTime = (time) => {
  if (!/^\d{1,2}:\d{2}$/.test(String(time || ""))) return false;

  const [hours, minutes] = String(time).split(":").map(Number);

  return (
    Number.isInteger(hours) &&
    Number.isInteger(minutes) &&
    hours >= 1 &&
    hours <= 12 &&
    minutes >= 0 &&
    minutes <= 59
  );
};

/*
 * The sessions API expects start_time as a UTC ISO timestamp, not HH:mm.
 * The UI works in Asia/Calcutta (IST, UTC+05:30).
 *
 * Example:
 *   05:00 PM IST -> 1970-01-01T11:30:00.000Z
 *
 * A fixed date is intentional because this module stores a recurring TIME.
 * The date is only used to satisfy the API's ISO timestamp validation.
 */
const convertToUtcIso = (time, ampm, timezone = "Asia/Calcutta") => {
  if (!isValid12HourTime(time)) return null;

  let [hour, minute] = String(time).split(":").map(Number);
  const period = String(ampm || "AM").toUpperCase();

  if (period === "PM" && hour !== 12) hour += 12;
  if (period === "AM" && hour === 12) hour = 0;

  // India has no DST and is UTC+05:30. Keep a generic Intl fallback for the
  // configured timezone so the conversion is explicit rather than relying on
  // the browser's local timezone.
  if (timezone === "Asia/Calcutta" || timezone === "Asia/Kolkata") {
    const utcMillis = Date.UTC(1970, 0, 1, hour, minute) - (5 * 60 + 30) * 60 * 1000;
    return new Date(utcMillis).toISOString();
  }

  // Generic timezone conversion for any future timezone setting.
  // Start with the intended wall-clock UTC value and calculate the timezone
  // offset at that instant using Intl.
  const wallClock = new Date(Date.UTC(1970, 0, 1, hour, minute));
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(wallClock);

  const values = Object.fromEntries(
    parts.map((part) => [part.type, part.value])
  );

  const timezoneWall = Date.UTC(
    Number(values.year),
    Number(values.month) - 1,
    Number(values.day),
    Number(values.hour) === 24 ? 0 : Number(values.hour),
    Number(values.minute),
    Number(values.second)
  );

  const offset = timezoneWall - wallClock.getTime();
  return new Date(wallClock.getTime() - offset).toISOString();
};

const extractTimeFromApiValue = (value, timezone = "Asia/Calcutta") => {
  if (value === null || value === undefined || value === "") return null;

  const raw = String(value).trim();

  // API may return a database TIME value such as 17:00 or 17:00:00.
  const timeMatch = raw.match(/^(\d{1,2}):(\d{2})(?::\d{2})?$/);
  if (timeMatch) {
    return {
      hour: Number(timeMatch[1]),
      minute: Number(timeMatch[2]),
    };
  }

  // API may return the ISO value we send. Convert it to the configured
  // timezone before showing it in the 12-hour edit field.
  const date = new Date(raw);
  if (Number.isNaN(date.getTime())) return null;

  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  }).formatToParts(date);

  const values = Object.fromEntries(
    parts.map((part) => [part.type, part.value])
  );

  let hour = Number(values.hour);
  if (hour === 24) hour = 0;

  return {
    hour,
    minute: Number(values.minute),
  };
};

const convertTo12Hour = (time24, timezone = "Asia/Calcutta") => {
  if (time24 === null || time24 === undefined || time24 === "") {
    return { time: "", ampm: "AM" };
  }

  const parsed = extractTimeFromApiValue(time24, timezone);
  if (!parsed) return { time: "", ampm: "AM" };

  let hour = parsed.hour;
  const minute = parsed.minute;

  if (
    !Number.isInteger(hour) ||
    !Number.isInteger(minute) ||
    hour < 0 ||
    hour > 23 ||
    minute < 0 ||
    minute > 59
  ) {
    return { time: "", ampm: "AM" };
  }

  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;

  return {
    time: `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`,
    ampm,
  };
};

const formatDisplayTime = (time24) => {
  const value = convertTo12Hour(time24);
  return value.time ? `${value.time} ${value.ampm}` : "Invalid time";
};

/* =========================================================
   STATUS
========================================================= */

const getTemplateStatus = (session) =>
  String(session?.status || "").toUpperCase();

const getLiveStatus = (session) =>
  String(session?.live_status || "").toUpperCase();

const getDisplayStatus = (session) => {
  const liveStatus = getLiveStatus(session);

  if (["UPCOMING", "LIVE", "COMPLETED"].includes(liveStatus)) {
    return liveStatus;
  }

  return getTemplateStatus(session) || "ACTIVE";
};

const statusClass = (status) => {
  switch (status) {
    case "LIVE":
      return "bg-red-500/15 text-red-300 border-red-500/20";
    case "COMPLETED":
      return "bg-blue-500/15 text-blue-300 border-blue-500/20";
    case "UPCOMING":
    case "SCHEDULED":
      return "bg-amber-500/15 text-amber-300 border-amber-500/20";
    case "ACTIVE":
      return "bg-purple-500/15 text-purple-300 border-purple-500/20";
    default:
      return "bg-white/5 text-gray-300 border-white/10";
  }
};

/* =========================================================
   SMALL UI COMPONENTS
========================================================= */

const FieldLabel = ({ children, required = false }) => (
  <label className="block text-sm font-semibold text-gray-200 mb-2">
    {children}
    {required && <span className="text-pink-400 ml-1">*</span>}
  </label>
);

const ModalShell = ({
  children,
  title,
  subtitle,
  icon: Icon,
  onClose,
  maxWidth = "max-w-2xl",
  footer,
}) => (
  <div
    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-md p-4"
    onMouseDown={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}
  >
    <div
      className={`w-full ${maxWidth} max-h-[calc(100vh-32px)] overflow-hidden rounded-3xl border border-purple-500/20 bg-[#17151f] shadow-[0_25px_90px_rgba(0,0,0,0.7)] flex flex-col`}
    >
      <div className="relative shrink-0 px-6 sm:px-7 py-5 border-b border-white/10 bg-gradient-to-r from-[#241739] via-[#1d1928] to-[#17151f]">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-pink-500" />

        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-purple-500/25 to-pink-500/20 border border-purple-400/20 flex items-center justify-center shrink-0">
              <Icon size={20} className="text-purple-300" />
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                {title}
              </h2>
              {subtitle && (
                <p className="text-sm text-gray-400 mt-1.5 leading-5">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-xl border border-white/10 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center shrink-0"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-6 sm:px-7 py-6">
        {children}
      </div>

      <div className="shrink-0 px-6 sm:px-7 py-4 border-t border-white/10 bg-[#14131b]">
        {footer}
      </div>
    </div>
  </div>
);

const TimeInput = ({ value, ampm, onTimeChange, onAmPmChange }) => (
  <div className="flex gap-2">
    <div className="relative flex-1">
      <Clock
        size={16}
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
      />
      <input
        type="text"
        inputMode="numeric"
        autoComplete="off"
        maxLength={5}
        placeholder="01:00"
        value={value}
        onChange={(e) => onTimeChange(sanitize12HourTime(e.target.value))}
        className="w-full pl-10 pr-3 py-3.5 rounded-xl bg-[#191722] border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/70 focus:ring-2 focus:ring-purple-500/10 transition-all"
      />
    </div>

    <select
      value={ampm}
      onChange={(e) => onAmPmChange(e.target.value)}
      className="w-[92px] px-3 py-3.5 rounded-xl bg-[#191722] border border-white/10 text-white focus:outline-none focus:border-purple-500/70 focus:ring-2 focus:ring-purple-500/10 transition-all"
    >
      <option value="AM">AM</option>
      <option value="PM">PM</option>
    </select>
  </div>
);

/* =========================================================
   PAGE
========================================================= */

export default function TrainerSessions() {
  const tz = useTimezone();

  const [sessions, setSessions] = useState([]);
  const [classes, setClasses] = useState([]);

  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [generatingZoom, setGeneratingZoom] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [page, setPage] = useState(1);

  const PAGE_SIZE = 10;

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showZoomModal, setShowZoomModal] = useState(false);

  const [form, setForm] = useState({
    class_id: "",
  });

  const createEmptySlot = () => ({
    id: `${Date.now()}-${Math.random()}`,
    title: "",
    start_time: "",
    start_ampm: "AM",
  });

  const [slots, setSlots] = useState([createEmptySlot()]);

  const [editForm, setEditForm] = useState({
    session_id: "",
    class_id: "",
    start_time: "",
    start_ampm: "AM",
  });

  const [selectedSession, setSelectedSession] = useState(null);

  /* =======================================================
     FORM HELPERS
  ======================================================= */

  const resetCreateForm = () => {
    setForm({ class_id: "" });
    setSlots([createEmptySlot()]);
  };

  const addSlot = () => {
    setSlots((prev) => [...prev, createEmptySlot()]);
  };

  const removeSlot = (slotId) => {
    if (slots.length <= 1) {
      toast.error("At least one time slot is required");
      return;
    }

    setSlots((prev) => prev.filter((slot) => slot.id !== slotId));
  };

  const updateSlot = (slotId, field, value) => {
    setSlots((prev) =>
      prev.map((slot) =>
        slot.id === slotId ? { ...slot, [field]: value } : slot
      )
    );
  };

  /* =======================================================
     FETCH
  ======================================================= */

  const fetchClasses = async () => {
    try {
      const config = await authHeader();

      const res = await axios.get(
        `${API_URL}/classes/trainer/my-classes`,
        config
      );

      const classData = res.data?.data || res.data || [];
      setClasses(Array.isArray(classData) ? classData : []);
    } catch (err) {
      console.error("Fetch classes error:", err);
      toast.error(
        err.response?.data?.message || "Failed to load classes"
      );
      setClasses([]);
    }
  };

  const fetchSessions = async () => {
    try {
      setLoading(true);

      const config = await authHeader();

      const res = await axios.get(
        `${API_URL}/sessions/trainer/my-sessions`,
        config
      );

      let data = [];

      if (Array.isArray(res.data)) {
        data = res.data;
      } else if (Array.isArray(res.data?.data)) {
        data = res.data.data;
      } else if (Array.isArray(res.data?.sessions)) {
        data = res.data.sessions;
      }

      const normalized = data.map((session) => ({
        ...session,
        id: session.id ?? session.session_id,
        class_title:
          session.class_title ||
          session.class_name ||
          session.class?.title ||
          session.class?.name ||
          "-",
        status: session.status
          ? String(session.status).toUpperCase()
          : "ACTIVE",
        live_status: session.live_status
          ? String(session.live_status).toUpperCase()
          : undefined,
      }));

      setSessions(normalized);
    } catch (err) {
      console.error("Fetch sessions error:", err);
      toast.error(
        err.response?.data?.message || "Failed to load sessions"
      );
      setSessions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
    fetchSessions();
  }, []);

  /* =======================================================
     FILTERS / PAGINATION
  ======================================================= */

  const filteredSessions = useMemo(() => {
    let data = Array.isArray(sessions) ? [...sessions] : [];

    if (statusFilter !== "ALL") {
      data = data.filter((session) => {
        if (statusFilter === "ACTIVE") {
          return getTemplateStatus(session) === "ACTIVE";
        }

        return getLiveStatus(session) === statusFilter;
      });
    }

    const keyword = search.trim().toLowerCase();

    if (keyword) {
      data = data.filter((session) => {
        const classTitle = String(
          session.class_title ||
            session.class_name ||
            ""
        ).toLowerCase();

        const startTime = formatDisplayTime(
          session.start_time
        ).toLowerCase();

        return (
          classTitle.includes(keyword) ||
          startTime.includes(keyword)
        );
      });
    }

    return data;
  }, [sessions, search, statusFilter]);

  const totalPages = Math.ceil(
    filteredSessions.length / PAGE_SIZE
  );

  const paginatedSessions = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredSessions.slice(start, start + PAGE_SIZE);
  }, [filteredSessions, page]);

  useEffect(() => {
    if (page > totalPages && totalPages > 0) {
      setPage(1);
    }

    if (totalPages === 0 && page !== 1) {
      setPage(1);
    }
  }, [page, totalPages]);

  useEffect(() => {
    setPage(1);
  }, [search, statusFilter]);

  const stats = useMemo(() => {
    const list = Array.isArray(sessions) ? sessions : [];

    return {
      total: list.length,
      upcoming: list.filter((session) => {
        const status = getLiveStatus(session);
        return status === "SCHEDULED" || status === "UPCOMING";
      }).length,
      live: list.filter(
        (session) => getLiveStatus(session) === "LIVE"
      ).length,
      completed: list.filter(
        (session) => getLiveStatus(session) === "COMPLETED"
      ).length,
    };
  }, [sessions]);

  /* =======================================================
     CREATE
  ======================================================= */

  const createSession = async () => {
    if (creating) return;

    try {
      if (!form.class_id) {
        toast.error("Please select a class");
        return;
      }

      const invalidSlot = slots.find(
        (slot) =>
          !slot.title?.trim() ||
          !isValid12HourTime(slot.start_time)
      );

      if (invalidSlot) {
        toast.error(
          "Enter a template name and a valid time in 01:00–12:59 format"
        );
        return;
      }

      const payloads = slots.map((slot) => {
        const startTime = convertToUtcIso(
          slot.start_time,
          slot.start_ampm,
          tz.timezone
        );

        if (!startTime) {
          throw new Error(`Invalid time for ${slot.title}`);
        }

        return {
          class_id: form.class_id,
          title: slot.title.trim(),
          start_time: startTime,
          timezone: tz.timezone,
        };
      });

      setCreating(true);

      const config = await authHeader();

      await axios.post(
        `${API_URL}/sessions/trainer/create`,
        { sessions: payloads },
        config
      );

      toast.success(
        `${payloads.length} session template(s) created`
      );

      setShowCreateModal(false);
      resetCreateForm();
      await fetchSessions();
    } catch (err) {
      console.error("Create session error:", err);
      toast.error(
        err.response?.data?.message ||
          err.message ||
          "Unable to create sessions"
      );
    } finally {
      setCreating(false);
    }
  };

  /* =======================================================
     EDIT
     NOTE: Template Title is intentionally NOT editable here.
  ======================================================= */

  const openEditModal = (session) => {
    const start = convertTo12Hour(session.start_time);

    setSelectedSession(session);

    setEditForm({
      session_id: session.id,
      class_id: session.class_id,
      start_time: start.time,
      start_ampm: start.ampm,
    });

    setShowEditModal(true);
  };

  const updateSession = async () => {
    if (editing) return;

    try {
      if (!editForm.class_id) {
        toast.error("Please select a class");
        return;
      }

      if (!isValid12HourTime(editForm.start_time)) {
        toast.error(
          "Enter a valid time in 01:00–12:59 format"
        );
        return;
      }

      const startTime = convertToUtcIso(
        editForm.start_time,
        editForm.start_ampm,
        tz.timezone
      );

      if (!startTime) {
        toast.error("Invalid start time");
        return;
      }

      setEditing(true);

      const config = await authHeader();

      await axios.put(
        `${API_URL}/sessions/trainer/${editForm.session_id}`,
        {
          class_id: editForm.class_id,
          start_time: startTime,
          timezone: tz.timezone,
        },
        config
      );

      toast.success("Session template updated");

      setShowEditModal(false);
      setSelectedSession(null);
      await fetchSessions();
    } catch (err) {
      console.error("Update session error:", err);
      toast.error(
        err.response?.data?.message ||
          "Unable to update session"
      );
    } finally {
      setEditing(false);
    }
  };

  /* =======================================================
     DELETE
  ======================================================= */

  const openDeleteModal = (session) => {
    setSelectedSession(session);
    setShowDeleteModal(true);
  };

  const deleteSession = async () => {
    if (!selectedSession || deleting) return;

    try {
      setDeleting(true);

      const config = await authHeader();

      await axios.delete(
        `${API_URL}/sessions/trainer/${selectedSession.id}`,
        config
      );

      toast.success("Session deleted");

      setShowDeleteModal(false);
      setSelectedSession(null);
      await fetchSessions();
    } catch (err) {
      console.error("Delete session error:", err);
      toast.error(
        err.response?.data?.message ||
          "Unable to delete session"
      );
    } finally {
      setDeleting(false);
    }
  };

  /* =======================================================
     ZOOM
  ======================================================= */

  const openZoomModal = (session) => {
    setSelectedSession(session);
    setShowZoomModal(true);
  };

  const generateZoomMeeting = async () => {
    if (!selectedSession || generatingZoom) return;

    try {
      setGeneratingZoom(true);

      const config = await authHeader();

      await axios.post(
        `${API_URL}/sessions/trainer/${selectedSession.id}/generate-zoom`,
        {},
        config
      );

      toast.success("Zoom meeting generated");
      await fetchSessions();

      const refreshed = sessions.find(
        (item) => item.id === selectedSession.id
      );

      if (refreshed) {
        setSelectedSession(refreshed);
      }

      setShowZoomModal(false);
    } catch (err) {
      console.error("Generate Zoom error:", err);
      toast.error(
        err.response?.data?.message ||
          "Unable to generate Zoom meeting"
      );
    } finally {
      setGeneratingZoom(false);
    }
  };

  const copyZoomLink = async (link) => {
    if (!link) {
      toast.error("Zoom link not available");
      return;
    }

    try {
      await navigator.clipboard.writeText(link);
      toast.success("Zoom link copied");
    } catch {
      try {
        const textArea = document.createElement("textarea");
        textArea.value = link;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        toast.success("Zoom link copied");
      } catch {
        toast.error("Unable to copy Zoom link");
      }
    }
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="min-h-full p-4 sm:p-6 lg:p-8 text-white">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5 mb-7">
        <div>
          <div className="flex items-center gap-2 text-purple-300 text-xs font-semibold tracking-[0.25em] uppercase mb-2">
            <CalendarClock size={15} />
            Trainer Sessions
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-300 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
            Trainer Session Templates
          </h1>

          <p className="text-gray-400 mt-2">
            Manage recurring time slots for your classes.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            resetCreateForm();
            setShowCreateModal(true);
          }}
          className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 hover:brightness-110 transition-all flex items-center justify-center gap-2"
        >
          <Plus size={18} />
          Create Template
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {[
          {
            label: "Total Templates",
            value: stats.total,
            icon: CalendarClock,
          },
          {
            label: "Upcoming",
            value: stats.upcoming,
            icon: Clock,
          },
          {
            label: "Live",
            value: stats.live,
            icon: Video,
          },
          {
            label: "Completed",
            value: stats.completed,
            icon: CheckCircle,
          },
        ].map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="rounded-2xl border border-white/10 bg-[#151519] p-5 hover:border-purple-500/20 transition-colors"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400">{item.label}</p>
                <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/10 flex items-center justify-center">
                  <Icon size={17} className="text-purple-300" />
                </div>
              </div>
              <h2 className="text-3xl font-bold mt-3">
                {item.value}
              </h2>
            </div>
          );
        })}
      </div>

      {/* FILTERS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search classes or time..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-11 py-3.5 rounded-xl bg-[#151519] border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/60 transition-all"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
            >
              <X size={15} />
            </button>
          )}
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full py-3.5 px-4 rounded-xl bg-[#151519] border border-white/10 text-white focus:outline-none focus:border-purple-500/60 transition-all"
        >
          <option value="ALL">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="UPCOMING">Upcoming</option>
          <option value="LIVE">Live</option>
          <option value="COMPLETED">Completed</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="rounded-2xl border border-white/10 bg-[#151519] overflow-hidden">
        {loading ? (
          <div className="min-h-[360px] flex flex-col items-center justify-center">
            <Loader2
              size={32}
              className="text-purple-400 animate-spin"
            />
            <p className="mt-4 text-gray-500">
              Loading sessions...
            </p>
          </div>
        ) : paginatedSessions.length === 0 ? (
          <div className="min-h-[360px] flex flex-col items-center justify-center text-center px-6">
            <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/10 flex items-center justify-center">
              <BookOpen size={30} className="text-purple-400" />
            </div>

            <h3 className="text-lg font-semibold mt-5">
              {search
                ? "No sessions found"
                : statusFilter !== "ALL"
                ? `No ${statusFilter.toLowerCase()} sessions found`
                : "No session templates yet"}
            </h3>

            <p className="text-gray-500 text-sm mt-2 max-w-md">
              Create a recurring time slot for one of your trainer classes.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px]">
              <thead className="bg-[#202027]">
                <tr className="text-left">
                  <th className="px-5 py-4 text-sm font-semibold text-gray-300">
                    Class
                  </th>
                  <th className="px-5 py-4 text-sm font-semibold text-gray-300">
                    Start Time
                  </th>
                  <th className="px-5 py-4 text-sm font-semibold text-gray-300">
                    Status
                  </th>
                  <th className="px-5 py-4 text-sm font-semibold text-gray-300">
                    Zoom
                  </th>
                  <th className="px-5 py-4 text-sm font-semibold text-gray-300 text-right">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {paginatedSessions.map((session) => {
                  const currentStatus =
                    getDisplayStatus(session);
                  const start12 = convertTo12Hour(
                    session.start_time
                  );

                  return (
                    <tr
                      key={session.id}
                      className="border-t border-white/5 hover:bg-white/[0.025] transition-colors"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/10 flex items-center justify-center">
                            <BookOpen
                              size={17}
                              className="text-purple-300"
                            />
                          </div>
                          <div>
                            <p className="font-semibold text-white">
                              {session.class_title ||
                                session.class_name ||
                                "-"}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">
                              Session slot
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2 text-gray-200">
                          <Clock
                            size={15}
                            className="text-purple-400"
                          />
                          <span>
                            {start12.time
                              ? `${start12.time} ${start12.ampm}`
                              : "Invalid time"}
                          </span>
                        </div>

                        {session.session_timezone &&
                          session.session_timezone !==
                            tz.timezone && (
                            <span className="inline-block mt-1 text-[10px] text-purple-300 bg-purple-500/10 border border-purple-500/10 px-1.5 py-0.5 rounded">
                              {session.session_timezone}
                            </span>
                          )}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${statusClass(
                            currentStatus
                          )}`}
                        >
                          {currentStatus === "LIVE" && (
                            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                          )}
                          {currentStatus}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        {session.zoom_link ? (
                          <button
                            type="button"
                            onClick={() =>
                              copyZoomLink(
                                session.zoom_link
                              )
                            }
                            className="inline-flex items-center gap-2 text-purple-300 hover:text-white transition-colors"
                          >
                            <Copy size={15} />
                            Copy Link
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() =>
                              openZoomModal(session)
                            }
                            className="inline-flex items-center gap-2 text-gray-400 hover:text-purple-300 transition-colors"
                          >
                            <RefreshCcw size={15} />
                            Generate
                          </button>
                        )}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() =>
                              openEditModal(session)
                            }
                            className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-purple-500/10 text-gray-400 hover:text-purple-300 transition-all"
                            title="Edit"
                          >
                            <Edit size={16} />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              openDeleteModal(session)
                            }
                            className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-red-500/10 text-gray-500 hover:text-red-400 transition-all"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-5">
          <p className="text-sm text-gray-500">
            Showing {(page - 1) * PAGE_SIZE + 1}–
            {Math.min(
              page * PAGE_SIZE,
              filteredSessions.length
            )}{" "}
            of {filteredSessions.length}
          </p>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() =>
                setPage((p) => Math.max(1, p - 1))
              }
              disabled={page === 1}
              className="px-4 py-2 rounded-xl bg-[#151519] border border-white/10 text-gray-300 hover:bg-white/5 disabled:opacity-40 transition-all"
            >
              Previous
            </button>

            <div className="px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/10 text-purple-300 text-sm">
              {page} / {totalPages}
            </div>

            <button
              type="button"
              onClick={() =>
                setPage((p) =>
                  Math.min(totalPages, p + 1)
                )
              }
              disabled={page === totalPages}
              className="px-4 py-2 rounded-xl bg-[#151519] border border-white/10 text-gray-300 hover:bg-white/5 disabled:opacity-40 transition-all"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* =====================================================
          CREATE MODAL
          IMPORTANT:
          - Footer is always visible.
          - Only the content area scrolls.
          - No Notes field.
      ===================================================== */}
      {showCreateModal && (
        <ModalShell
          title="Create Session Templates"
          subtitle={`Define recurring time slots for your classes. Times are saved in ${tz.label}.`}
          icon={Clock}
          onClose={() => setShowCreateModal(false)}
          maxWidth="max-w-3xl"
          footer={
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="px-5 py-3 rounded-xl border border-white/10 bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 transition-all font-medium"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={createSession}
                disabled={creating}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg shadow-purple-500/20 hover:brightness-110 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {creating ? (
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                ) : (
                  <Plus size={18} />
                )}
                {creating
                  ? "Creating..."
                  : "Create Templates"}
              </button>
            </div>
          }
        >
          <div className="space-y-7">
            {/* CLASS */}
            <div>
              <FieldLabel required>
                Select Class
              </FieldLabel>

              <div className="relative">
                <BookOpen
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300 pointer-events-none"
                />

                <select
                  value={form.class_id}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      class_id: e.target.value,
                    })
                  }
                  className="w-full appearance-none pl-11 pr-10 py-3.5 rounded-2xl bg-[#100f15] border border-white/10 text-white focus:outline-none focus:border-purple-500/70 focus:ring-2 focus:ring-purple-500/10 transition-all"
                >
                  <option value="">
                    Choose a class
                  </option>

                  {classes.map((cls) => (
                    <option
                      key={cls.id}
                      value={cls.id}
                    >
                      {cls.title ||
                        cls.name ||
                        `Class #${cls.id}`}
                    </option>
                  ))}
                </select>

                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                  ⌄
                </span>
              </div>
            </div>

            {/* TIME SLOTS */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                <div>
                  <h3 className="text-base font-semibold text-white flex items-center gap-2">
                    <Clock
                      size={17}
                      className="text-purple-400"
                    />
                    Time Slots
                  </h3>

                  <p className="text-xs text-gray-500 mt-1">
                    Add one or more recurring time slots.
                  </p>
                </div>

                <span className="self-start sm:self-auto px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-xs font-medium text-purple-300">
                  {tz.abbr}
                </span>
              </div>

              <div className="space-y-3">
                {slots.map((slot, index) => (
                  <div
                    key={slot.id}
                    className="rounded-2xl border border-white/10 bg-[#100f15] p-4 sm:p-5 hover:border-purple-500/25 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-300 flex items-center justify-center text-xs font-bold">
                          {index + 1}
                        </span>

                        <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                          Time Slot
                        </span>
                      </div>

                      {slots.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            removeSlot(slot.id)
                          }
                          className="w-8 h-8 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all flex items-center justify-center"
                          title="Remove slot"
                        >
                          <Trash2 size={15} />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <FieldLabel required>
                          Template Name
                        </FieldLabel>

                        <input
                          type="text"
                          placeholder="e.g. Session A"
                          value={slot.title}
                          onChange={(e) =>
                            updateSlot(
                              slot.id,
                              "title",
                              e.target.value
                            )
                          }
                          className="w-full px-4 py-3.5 rounded-xl bg-[#191722] border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/70 focus:ring-2 focus:ring-purple-500/10 transition-all"
                        />
                      </div>

                      <div>
                        <FieldLabel required>
                          Start Time
                        </FieldLabel>

                        <TimeInput
                          value={slot.start_time}
                          ampm={slot.start_ampm}
                          onTimeChange={(value) =>
                            updateSlot(
                              slot.id,
                              "start_time",
                              value
                            )
                          }
                          onAmPmChange={(value) =>
                            updateSlot(
                              slot.id,
                              "start_ampm",
                              value
                            )
                          }
                        />

                        <p className="text-[11px] text-gray-600 mt-2">
                          Use 01:00–12:59 format
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={addSlot}
                className="w-full mt-4 py-3.5 rounded-2xl border border-dashed border-purple-500/30 bg-purple-500/5 text-purple-300 hover:bg-purple-500/10 hover:border-purple-500/50 transition-all flex items-center justify-center gap-2 font-medium"
              >
                <Plus size={17} />
                Add Another Time Slot
              </button>
            </div>
          </div>
        </ModalShell>
      )}

      {/* =====================================================
          EDIT MODAL
          Template Title is intentionally removed.
      ===================================================== */}
      {showEditModal && (
        <ModalShell
          title="Edit Session"
          subtitle="Update the class and recurring start time for this session."
          icon={Edit}
          onClose={() => setShowEditModal(false)}
          maxWidth="max-w-xl"
          footer={
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowEditModal(false)}
                className="px-5 py-3 rounded-xl border border-white/10 bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 transition-all font-medium"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={updateSession}
                disabled={editing}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg shadow-purple-500/20 hover:brightness-110 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {editing ? (
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                ) : (
                  <CheckCircle size={18} />
                )}
                {editing
                  ? "Saving..."
                  : "Save Changes"}
              </button>
            </div>
          }
        >
          <div className="space-y-6">
            <div>
              <FieldLabel required>
                Class
              </FieldLabel>

              <div className="relative">
                <BookOpen
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300 pointer-events-none"
                />

                <select
                  value={editForm.class_id}
                  onChange={(e) =>
                    setEditForm((prev) => ({
                      ...prev,
                      class_id: e.target.value,
                    }))
                  }
                  className="w-full appearance-none pl-11 pr-10 py-3.5 rounded-2xl bg-[#100f15] border border-white/10 text-white focus:outline-none focus:border-purple-500/70 focus:ring-2 focus:ring-purple-500/10 transition-all"
                >
                  {classes.map((cls) => (
                    <option
                      key={cls.id}
                      value={cls.id}
                    >
                      {cls.title ||
                        cls.name ||
                        `Class #${cls.id}`}
                    </option>
                  ))}
                </select>

                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                  ⌄
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#100f15] p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                    <Clock
                      size={16}
                      className="text-purple-400"
                    />
                    Start Time
                  </h3>

                  <p className="text-xs text-gray-600 mt-1">
                    12-hour format with AM/PM
                  </p>
                </div>

                <span className="px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-xs text-purple-300 font-medium">
                  {tz.abbr}
                </span>
              </div>

              <TimeInput
                value={editForm.start_time}
                ampm={editForm.start_ampm}
                onTimeChange={(value) =>
                  setEditForm((prev) => ({
                    ...prev,
                    start_time: value,
                  }))
                }
                onAmPmChange={(value) =>
                  setEditForm((prev) => ({
                    ...prev,
                    start_ampm: value,
                  }))
                }
              />

              <p className="text-[11px] text-gray-600 mt-2">
                Example: 01:00 PM is saved as 13:00.
              </p>
            </div>
          </div>
        </ModalShell>
      )}

      {/* DELETE MODAL */}
      {showDeleteModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-md p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setShowDeleteModal(false);
            }
          }}
        >
          <div className="w-full max-w-md rounded-3xl border border-red-500/15 bg-[#1b1824] shadow-[0_25px_90px_rgba(0,0,0,0.7)] overflow-hidden">
            <div className="p-7">
              <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/10 flex items-center justify-center mb-5">
                <FaTrash className="text-red-400 text-lg" />
              </div>

              <h2 className="text-xl font-bold text-white">
                Delete Session Template?
              </h2>

              <p className="text-gray-400 text-sm leading-6 mt-2">
                This will permanently remove this recurring
                time slot.
              </p>

              {selectedSession && (
                <div className="mt-5 rounded-2xl bg-[#111016] border border-white/10 p-4 space-y-4">
                  <div>
                    <p className="text-xs text-gray-500">
                      Class
                    </p>
                    <p className="font-semibold text-white mt-1">
                      {selectedSession.class_title ||
                        "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      Start Time
                    </p>
                    <p className="font-semibold text-gray-200 mt-1">
                      {formatDisplayTime(
                        selectedSession.start_time
                      )}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() =>
                    setShowDeleteModal(false)
                  }
                  className="flex-1 px-5 py-3 rounded-xl border border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 transition-all"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={deleteSession}
                  disabled={deleting}
                  className="flex-1 px-5 py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {deleting ? (
                    <Loader2
                      size={17}
                      className="animate-spin"
                    />
                  ) : (
                    <Trash2 size={17} />
                  )}
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ZOOM MODAL */}
      {showZoomModal && (
        <ModalShell
          title="Zoom Meeting"
          subtitle="Manage the recurring Zoom link for this session template."
          icon={Video}
          onClose={() => setShowZoomModal(false)}
          maxWidth="max-w-xl"
          footer={
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowZoomModal(false)}
                className="px-5 py-3 rounded-xl border border-white/10 bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 transition-all font-medium"
              >
                Close
              </button>

              <button
                type="button"
                onClick={generateZoomMeeting}
                disabled={generatingZoom}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {generatingZoom ? (
                  <Loader2
                    size={17}
                    className="animate-spin"
                  />
                ) : (
                  <RefreshCcw size={17} />
                )}
                {generatingZoom
                  ? "Generating..."
                  : selectedSession?.zoom_link
                  ? "Regenerate Zoom"
                  : "Generate Zoom"}
              </button>
            </div>
          }
        >
          {selectedSession?.zoom_link ? (
            <div className="space-y-5">
              <div className="rounded-2xl bg-[#100f15] border border-white/10 p-5">
                <p className="text-xs text-gray-500">
                  Meeting ID
                </p>
                <p className="text-white font-semibold mt-1">
                  {selectedSession.zoom_meeting_id ||
                    "-"}
                </p>
              </div>

              <div className="rounded-2xl bg-[#100f15] border border-white/10 p-5">
                <p className="text-xs text-gray-500">
                  Password
                </p>
                <p className="text-white font-semibold mt-1">
                  {selectedSession.zoom_password ||
                    "-"}
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-200 mb-2">
                  Join URL
                </p>

                <div className="flex gap-2">
                  <input
                    readOnly
                    value={selectedSession.zoom_link}
                    className="flex-1 min-w-0 px-4 py-3 rounded-xl bg-[#191722] border border-white/10 text-white"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      copyZoomLink(
                        selectedSession.zoom_link
                      )
                    }
                    className="w-12 rounded-xl bg-purple-500/10 border border-purple-500/10 text-purple-300 hover:bg-purple-500/20 flex items-center justify-center"
                    title="Copy Zoom link"
                  >
                    <Copy size={17} />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-10">
              <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/10 flex items-center justify-center mx-auto">
                <Video
                  size={30}
                  className="text-purple-300"
                />
              </div>

              <h3 className="text-xl font-bold mt-5">
                No Zoom Meeting
              </h3>

              <p className="text-gray-500 text-sm mt-2">
                Generate a recurring Zoom link for this
                session template.
              </p>
            </div>
          )}
        </ModalShell>
      )}
    </div>
  );
}
