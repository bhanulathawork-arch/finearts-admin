// import React, { useEffect, useMemo, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { FaTrash } from "react-icons/fa";

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
// const API_URL = "https://finearts-backend.onrender.com/api";

// const authHeader = () => ({
//   headers: {
//     Authorization: `Bearer ${localStorage.getItem("token")}`,
//     "X-Timezone": getTimezone(),
//   },
// });

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

// export default function InstituteSessions() {
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
//     if (slots.length <= 1) return toast.error("At least one template is required");
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
//       const res = await axios.get(`${API_URL}/classes/institute/my-classes`, authHeader());
//       setClasses(res.data?.data || res.data || []);
//     } catch (err) {
//       toast.error("Failed to load classes");
//     }
//   };

//   const fetchSessions = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(
//         `${API_URL}/sessions/institute/my-sessions`,
//         authHeader()
//       );
//       let data = [];
//       if (Array.isArray(res.data)) data = res.data;
//       else if (Array.isArray(res.data.data)) data = res.data.data;
//       else if (Array.isArray(res.data.sessions)) data = res.data.sessions;
//       setSessions(data);
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
//           item.class_title?.toLowerCase().includes(keyword) ||
//           item.trainer_name?.toLowerCase().includes(keyword)
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
//       scheduled: list.filter((s) => s[statusKey] === "SCHEDULED" || s[statusKey] === "UPCOMING").length,
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

//       const invalidSlot = slots.find(
//         (s) => !s.title || !s.start_time
//       );
//       if (invalidSlot)
//         return toast.error(
//           "Please fill title and start time for all templates"
//         );

//  const payloads = slots.map((slot) => ({
//   class_id: form.class_id,
//   title: slot.title,
//   start_time: convertTo24Hour(slot.start_time, slot.start_ampm),
//   notes: form.notes,
//   timezone: tz.timezone,
// }));

// await axios.post(
//   `${API_URL}/sessions/institute/create`,
//   {
//     sessions: payloads,
//   },
//   authHeader()
// );

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
//       await axios.put(
//         `${API_URL}/sessions/institute/${editForm.session_id}`,
//         {
//           class_id: editForm.class_id,
//           title: editForm.title,
//           start_time: convertTo24Hour(editForm.start_time, editForm.start_ampm),
  
//           timezone: tz.timezone,
//         },
//         authHeader()
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
//       await axios.delete(
//         `${API_URL}/sessions/institute/${selectedSession.session_id}`,
//         authHeader()
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
//       await axios.post(
//         `${API_URL}/sessions/institute/${selectedSession.session_id}/generate-zoom`,
//         {},
//         authHeader()
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
//     if (!link)
//       return toast.error("Zoom link not available");
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
//             Institute Session Templates
//           </h1>
//           <p className="text-white mt-2">
//             Manage recurring time slots (e.g., Session A, B, C)
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
//                   <th className="p-4 text-left whitespace-nowrap">Trainer</th>
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
//                         {session.trainer_name || "-"}
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
//                     <Clock size={18} className="text-white" /> Time
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
//                   <Video className="text-white" size={22} /> Zoom Meeting
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
//                         onClick={() => copyZoomLink(selectedSession?.zoom_link)}
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


import { useEffect, useMemo, useState } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
  FaClock,
  FaGraduationCap,
  FaSyncAlt,
} from "react-icons/fa";
import API from "../services/api";

/*
|--------------------------------------------------------------------------
| Institute Sessions
|--------------------------------------------------------------------------
| Removed:
| - Session Title
| - Notes
| - Templates
|
| Session now contains only:
| - Class
| - Start Time
|
| Important:
| Backend expects start_time as UTC ISO:
| 2026-09-28T16:34:00.000Z
|
| UI works in IST.
|--------------------------------------------------------------------------
*/

const Sessions = () => {
  const [sessions, setSessions] = useState([]);
  const [classes, setClasses] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [editingSession, setEditingSession] = useState(null);

  const [form, setForm] = useState({
    class_id: "",
    start_time: "",
  });

  const [search, setSearch] = useState("");

  /*
  |--------------------------------------------------------------------------
  | Load Sessions
  |--------------------------------------------------------------------------
  */

  const fetchSessions = async () => {
    try {
      setLoading(true);

      const response = await API.get(
        "/sessions/institute/my-sessions"
      );

      console.log("SESSIONS RESPONSE:", response.data);

      const data = response?.data;

      if (Array.isArray(data)) {
        setSessions(data);
      } else if (Array.isArray(data?.sessions)) {
        setSessions(data.sessions);
      } else if (Array.isArray(data?.data)) {
        setSessions(data.data);
      } else {
        setSessions([]);
      }
    } catch (error) {
      console.error(
        "Fetch Institute Sessions Error:",
        error
      );

      setSessions([]);
    } finally {
      setLoading(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Load Institute Classes
  |--------------------------------------------------------------------------
  */

  const fetchClasses = async () => {
    try {
      const response = await API.get(
        "/classes/institute/my-classes"
      );

      console.log("INSTITUTE CLASSES RESPONSE:", response.data);

      const data = response?.data;

      if (Array.isArray(data)) {
        setClasses(data);
      } else if (Array.isArray(data?.classes)) {
        setClasses(data.classes);
      } else if (Array.isArray(data?.data)) {
        setClasses(data.data);
      } else {
        setClasses([]);
      }
    } catch (error) {
      console.error(
        "Fetch Institute Classes Error:",
        error
      );

      /*
       * Some backend versions use:
       * /classes/institute/:instituteId
       *
       * If the first endpoint doesn't exist, don't break
       * the sessions page.
       */
      setClasses([]);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Initial Load
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    fetchSessions();
    fetchClasses();
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Refresh
  |--------------------------------------------------------------------------
  */

  const handleRefresh = async () => {
    await Promise.all([
      fetchSessions(),
      fetchClasses(),
    ]);
  };

  /*
  |--------------------------------------------------------------------------
  | Convert Backend UTC Date/Time -> IST HH:mm
  |--------------------------------------------------------------------------
  */

  const getISTTime = (value) => {
    if (!value) return "";

    try {
      const date = new Date(value);

      if (Number.isNaN(date.getTime())) {
        /*
         * Backend may already return HH:mm
         */
        if (/^\d{2}:\d{2}$/.test(value)) {
          return value;
        }

        return "";
      }

      return new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(date);
    } catch {
      return "";
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Convert HH:mm IST -> UTC ISO
  |--------------------------------------------------------------------------
  |
  | Backend requires:
  |
  | 2026-09-28T16:34:00.000Z
  |
  | NOT:
  |
  | 22:04
  |--------------------------------------------------------------------------
  */

  const convertISTTimeToUTC = (
    time,
    existingStartTime = null
  ) => {
    if (!time) return null;

    const match = time.match(/^(\d{1,2}):(\d{2})$/);

    if (!match) return null;

    const hours = Number(match[1]);
    const minutes = Number(match[2]);

    if (
      Number.isNaN(hours) ||
      Number.isNaN(minutes) ||
      hours < 0 ||
      hours > 23 ||
      minutes < 0 ||
      minutes > 59
    ) {
      return null;
    }

    /*
     * Preserve the existing date when editing.
     *
     * If editing:
     * use the date already stored in start_time.
     *
     * If creating:
     * use today's date in IST.
     */

    let year;
    let month;
    let day;

    if (existingStartTime) {
      const existingDate = new Date(existingStartTime);

      if (!Number.isNaN(existingDate.getTime())) {
        const parts = new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Kolkata",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }).formatToParts(existingDate);

        year = Number(
          parts.find((p) => p.type === "year")?.value
        );

        month = Number(
          parts.find((p) => p.type === "month")?.value
        );

        day = Number(
          parts.find((p) => p.type === "day")?.value
        );
      }
    }

    /*
     * If no existing date was available,
     * use today's IST date.
     */

    if (!year || !month || !day) {
      const now = new Date();

      const parts = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).formatToParts(now);

      year = Number(
        parts.find((p) => p.type === "year")?.value
      );

      month = Number(
        parts.find((p) => p.type === "month")?.value
      );

      day = Number(
        parts.find((p) => p.type === "day")?.value
      );
    }

    /*
     * IST = UTC + 5:30
     *
     * Create a UTC date by subtracting 5:30.
     */

    const utcDate = new Date(
      Date.UTC(
        year,
        month - 1,
        day,
        hours - 5,
        minutes - 30,
        0,
        0
      )
    );

    return utcDate.toISOString();
  };

  /*
  |--------------------------------------------------------------------------
  | Find Class Name
  |--------------------------------------------------------------------------
  */

  const getClassName = (session) => {
    return (
      session?.class_name ||
      session?.className ||
      session?.class?.name ||
      session?.class?.class_name ||
      classes.find(
        (item) =>
          String(item?.id) ===
          String(
            session?.class_id ||
              session?.classId
          )
      )?.name ||
      classes.find(
        (item) =>
          String(item?.id) ===
          String(
            session?.class_id ||
              session?.classId
          )
      )?.class_name ||
      "Unknown Class"
    );
  };

  /*
  |--------------------------------------------------------------------------
  | Get Session ID
  |--------------------------------------------------------------------------
  */

  const getSessionId = (session) => {
    return (
      session?.id ||
      session?.session_id ||
      session?.sessionId
    );
  };

  /*
  |--------------------------------------------------------------------------
  | Open Create Modal
  |--------------------------------------------------------------------------
  */

  const openCreateModal = () => {
    setEditingSession(null);

    setForm({
      class_id:
        classes.length > 0
          ? String(classes[0]?.id || "")
          : "",
      start_time: "",
    });

    setShowModal(true);
  };

  /*
  |--------------------------------------------------------------------------
  | Open Edit Modal
  |--------------------------------------------------------------------------
  */

  const openEditModal = (session) => {
    setEditingSession(session);

    const classId =
      session?.class_id ||
      session?.classId ||
      session?.class?.id ||
      "";

    const time = getISTTime(
      session?.start_time ||
        session?.startTime
    );

    setForm({
      class_id: String(classId || ""),
      start_time: time,
    });

    setShowModal(true);
  };

  /*
  |--------------------------------------------------------------------------
  | Close Modal
  |--------------------------------------------------------------------------
  */

  const closeModal = () => {
    if (saving) return;

    setShowModal(false);
    setEditingSession(null);

    setForm({
      class_id: "",
      start_time: "",
    });
  };

  /*
  |--------------------------------------------------------------------------
  | Input Change
  |--------------------------------------------------------------------------
  */

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /*
  |--------------------------------------------------------------------------
  | Save / Update Session
  |--------------------------------------------------------------------------
  */

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.class_id) {
      alert("Please select a class.");
      return;
    }

    if (!form.start_time) {
      alert("Please select a start time.");
      return;
    }

    const sessionId = editingSession
      ? getSessionId(editingSession)
      : null;

    /*
     * Convert IST HH:mm to UTC ISO
     */

    const utcStartTime = convertISTTimeToUTC(
      form.start_time,
      editingSession?.start_time ||
        editingSession?.startTime ||
        null
    );

    if (!utcStartTime) {
      alert("Invalid start time.");
      return;
    }

    /*
     * IMPORTANT:
     *
     * Do NOT send:
     *
     * start_time: "22:04"
     *
     * Send:
     *
     * start_time: "2026-09-28T16:34:00.000Z"
     */

    const payload = {
      class_id: Number(form.class_id),
      start_time: utcStartTime,
    };

    console.log(
      "SESSION PAYLOAD:",
      payload
    );

    try {
      setSaving(true);

      if (sessionId) {
        /*
         * UPDATE
         */

        const response = await API.put(
          `/sessions/${sessionId}`,
          payload
        );

        console.log(
          "SESSION UPDATE RESPONSE:",
          response.data
        );
      } else {
        /*
         * CREATE
         */

        const response = await API.post(
          "/sessions/institute",
          payload
        );

        console.log(
          "SESSION CREATE RESPONSE:",
          response.data
        );
      }

      closeModal();

      await fetchSessions();
    } catch (error) {
      console.error(
        "Save Session Error:",
        error
      );

      console.error(
        "Backend Response:",
        error?.response?.data
      );

      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Unable to save session.";

      alert(message);
    } finally {
      setSaving(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Delete Session
  |--------------------------------------------------------------------------
  */

  const handleDelete = async (session) => {
    const sessionId = getSessionId(session);

    if (!sessionId) {
      alert("Session ID not found.");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this session?"
    );

    if (!confirmed) return;

    try {
      await API.delete(
        `/sessions/${sessionId}`
      );

      await fetchSessions();
    } catch (error) {
      console.error(
        "Delete Session Error:",
        error
      );

      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Unable to delete session.";

      alert(message);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Search
  |--------------------------------------------------------------------------
  */

  const filteredSessions = useMemo(() => {
    const keyword =
      search.trim().toLowerCase();

    if (!keyword) return sessions;

    return sessions.filter((session) => {
      const className =
        getClassName(session).toLowerCase();

      const time = getISTTime(
        session?.start_time ||
          session?.startTime
      ).toLowerCase();

      return (
        className.includes(keyword) ||
        time.includes(keyword)
      );
    });
  }, [sessions, search, classes]);

  /*
  |--------------------------------------------------------------------------
  | Format Time
  |--------------------------------------------------------------------------
  */

  const formatTime = (session) => {
    const time = getISTTime(
      session?.start_time ||
        session?.startTime
    );

    if (!time) return "--:--";

    const [hourString, minute] =
      time.split(":");

    let hour = Number(hourString);

    const period =
      hour >= 12 ? "PM" : "AM";

    hour = hour % 12 || 12;

    return `${String(hour).padStart(
      2,
      "0"
    )}:${minute} ${period}`;
  };

  /*
  |--------------------------------------------------------------------------
  | Loading
  |--------------------------------------------------------------------------
  */

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09080D] text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-[#A842DF] border-t-transparent animate-spin" />

          <p className="text-gray-400">
            Loading sessions...
          </p>
        </div>
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | UI
  |--------------------------------------------------------------------------
  */

  return (
    <div className="min-h-screen bg-[#09080D] text-white p-6 md:p-8">

      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">

        <div>
          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-[#A842DF] to-[#EE68E0] bg-clip-text text-transparent">
            Institute Sessions
          </h1>

          <p className="text-gray-400 mt-2 text-lg">
            Manage sessions for your institute classes.
          </p>
        </div>

        <div className="flex items-center gap-3">

          <button
            type="button"
            onClick={handleRefresh}
            className="px-5 py-3 rounded-xl bg-[#17151D] border border-white/10 hover:border-[#A842DF]/50 transition-all flex items-center gap-2"
          >
            <FaSyncAlt />

            Refresh
          </button>

          <button
            type="button"
            onClick={openCreateModal}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#A842DF] to-[#EE68E0] font-bold flex items-center gap-2 hover:scale-[1.02] transition-all shadow-lg shadow-purple-900/30"
          >
            <FaPlus />

            Add Session
          </button>

        </div>
      </div>

      {/* ======================================================
          SEARCH
      ====================================================== */}

      <div className="mb-6">

        <input
          type="text"
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
          placeholder="Search by class or time..."
          className="w-full bg-[#17151D] border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-500 outline-none focus:border-[#A842DF]"
        />

      </div>

      {/* ======================================================
          SESSIONS TABLE
      ====================================================== */}

      <div className="bg-[#15141B] border border-white/10 rounded-2xl overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[750px]">

            <thead className="bg-[#201E28]">

              <tr>

                <th className="text-left px-6 py-5 text-sm font-bold text-gray-300">
                  Class
                </th>

                <th className="text-left px-6 py-5 text-sm font-bold text-gray-300">
                  Start Time
                </th>

                <th className="text-left px-6 py-5 text-sm font-bold text-gray-300">
                  Date
                </th>

                <th className="text-right px-6 py-5 text-sm font-bold text-gray-300">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredSessions.length === 0 ? (

                <tr>

                  <td
                    colSpan="4"
                    className="px-6 py-16 text-center"
                  >

                    <FaGraduationCap className="mx-auto text-5xl text-[#A842DF] mb-4" />

                    <p className="text-xl font-bold text-white">
                      No sessions found
                    </p>

                    <p className="text-gray-500 mt-2">
                      Create a session for one of your classes.
                    </p>

                  </td>

                </tr>

              ) : (

                filteredSessions.map(
                  (session, index) => {

                    const startDate =
                      session?.start_time ||
                      session?.startTime;

                    let formattedDate = "--";

                    if (startDate) {
                      const date =
                        new Date(startDate);

                      if (
                        !Number.isNaN(
                          date.getTime()
                        )
                      ) {
                        formattedDate =
                          new Intl.DateTimeFormat(
                            "en-IN",
                            {
                              timeZone:
                                "Asia/Kolkata",
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          ).format(date);
                      }
                    }

                    return (
                      <tr
                        key={
                          getSessionId(
                            session
                          ) ||
                          `session-${index}`
                        }
                        className="border-t border-white/10 hover:bg-white/[0.025] transition-colors"
                      >

                        {/* CLASS */}

                        <td className="px-6 py-5">

                          <div className="flex items-center gap-3">

                            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#A842DF] to-[#EE68E0] flex items-center justify-center">

                              <FaGraduationCap />

                            </div>

                            <div>

                              <p className="font-bold text-white">
                                {getClassName(
                                  session
                                )}
                              </p>

                            </div>

                          </div>

                        </td>

                        {/* TIME */}

                        <td className="px-6 py-5">

                          <div className="flex items-center gap-2 text-white">

                            <FaClock className="text-[#A842DF]" />

                            <span>
                              {formatTime(
                                session
                              )}
                            </span>

                          </div>

                        </td>

                        {/* DATE */}

                        <td className="px-6 py-5 text-gray-300">

                          {formattedDate}

                        </td>

                        {/* ACTIONS */}

                        <td className="px-6 py-5">

                          <div className="flex justify-end items-center gap-3">

                            <button
                              type="button"
                              onClick={() =>
                                openEditModal(
                                  session
                                )
                              }
                              title="Edit Session"
                              className="w-10 h-10 rounded-lg bg-white/5 hover:bg-[#A842DF]/20 text-gray-300 hover:text-[#D878FF] flex items-center justify-center transition-all"
                            >
                              <FaEdit />
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                handleDelete(
                                  session
                                )
                              }
                              title="Delete Session"
                              className="w-10 h-10 rounded-lg bg-white/5 hover:bg-red-500/20 text-gray-300 hover:text-red-400 flex items-center justify-center transition-all"
                            >
                              <FaTrash />
                            </button>

                          </div>

                        </td>

                      </tr>
                    );
                  }
                )

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* ======================================================
          MODAL
      ====================================================== */}

      {showModal && (

        <div className="fixed inset-0 z-[9999] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">

          <div className="w-full max-w-2xl bg-[#211D32] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">

            {/* ==================================================
                MODAL HEADER
            ================================================== */}

            <div className="px-7 py-6 border-b border-white/10 flex items-center justify-between">

              <div>

                <h2 className="text-2xl md:text-3xl font-black text-white">

                  {editingSession
                    ? "Edit Session"
                    : "Add Session"}

                </h2>

                <p className="text-gray-400 mt-1">
                  {editingSession
                    ? "Update session information."
                    : "Create a new session for your class."}
                </p>

              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
                className="w-10 h-10 rounded-lg hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all"
              >
                <FaTimes size={20} />
              </button>

            </div>

            {/* ==================================================
                FORM
            ================================================== */}

            <form
              onSubmit={handleSubmit}
              className="p-7"
            >

              {/* CLASS */}

              <div className="mb-7">

                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Class
                </label>

                <select
                  name="class_id"
                  value={form.class_id}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#302B40] border border-white/10 rounded-xl px-4 py-4 text-white outline-none focus:border-[#A842DF]"
                >

                  <option value="">
                    Select Class
                  </option>

                  {classes.map((item) => (

                    <option
                      key={item?.id}
                      value={item?.id}
                    >
                      {item?.name ||
                        item?.class_name ||
                        `Class ${item?.id}`}
                    </option>

                  ))}

                </select>

                {classes.length === 0 && (

                  <p className="text-sm text-yellow-400 mt-2">
                    No institute classes found.
                  </p>

                )}

              </div>

              {/* START TIME */}

              <div className="mb-8">

                <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-2">

                  <FaClock className="text-[#A842DF]" />

                  Start Time
                  <span className="text-gray-500 font-normal">
                    (IST)
                  </span>

                </label>

                <input
                  type="time"
                  name="start_time"
                  value={form.start_time}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#302B40] border border-white/10 rounded-xl px-4 py-4 text-white outline-none focus:border-[#A842DF]"
                />

                <p className="text-xs text-gray-500 mt-2">
                  Time is entered in IST. It will automatically
                  be converted to UTC before being sent to the
                  backend.
                </p>

              </div>

              {/* ==================================================
                  BUTTONS
              ================================================== */}

              <div className="flex justify-end gap-3 pt-5 border-t border-white/10">

                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="px-6 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="px-7 py-3 rounded-xl bg-gradient-to-r from-[#A842DF] to-[#EE68E0] font-bold text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >

                  {saving && (
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  )}

                  {saving
                    ? "Saving..."
                    : editingSession
                    ? "Update Session"
                    : "Create Session"}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
};

export default Sessions;