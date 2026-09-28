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


import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";

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
} from "lucide-react";

import { useTimezone, getTimezone } from "../utils/timezone";

/* ============================================================
   API
============================================================ */

const API_URL = "https://finearts-backend.onrender.com/api";

/* ============================================================
   AUTH HEADER
============================================================ */

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "X-Timezone": getTimezone(),
  },
});

/* ============================================================
   TIME HELPERS
============================================================ */

/*
  Converts:
  10:04 PM
  ->
  22:04
*/
const convertTo24Hour = (time, ampm) => {
  if (!time) return "";

  let [hour, minute] = time.split(":").map(Number);

  if (
    Number.isNaN(hour) ||
    Number.isNaN(minute) ||
    hour < 0 ||
    hour > 23 ||
    minute < 0 ||
    minute > 59
  ) {
    return "";
  }

  if (ampm === "PM" && hour !== 12) {
    hour += 12;
  }

  if (ampm === "AM" && hour === 12) {
    hour = 0;
  }

  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(
    2,
    "0"
  )}`;
};

/*
  Converts:
  22:04
  ->
  10:04 PM

  Also supports ISO strings such as:
  2026-09-28T16:34:00.000Z
*/
const convertTo12Hour = (value) => {
  if (!value) {
    return {
      time: "",
      ampm: "AM",
    };
  }

  let hour;
  let minute;

  /*
    ISO / Date value
  */
  if (
    typeof value === "string" &&
    (value.includes("T") || value.includes("Z"))
  ) {
    const date = new Date(value);

    if (!Number.isNaN(date.getTime())) {
      hour = date.getHours();
      minute = date.getMinutes();
    }
  }

  /*
    HH:mm value
  */
  if (hour === undefined) {
    const match = String(value).match(/(\d{1,2}):(\d{2})/);

    if (!match) {
      return {
        time: "",
        ampm: "AM",
      };
    }

    hour = Number(match[1]);
    minute = Number(match[2]);
  }

  const ampm = hour >= 12 ? "PM" : "AM";

  hour = hour % 12;

  if (hour === 0) {
    hour = 12;
  }

  return {
    time: `${String(hour).padStart(2, "0")}:${String(minute).padStart(
      2,
      "0"
    )}`,
    ampm,
  };
};

/*
  Gets timezone offset for a specific date.

  Example:
  Asia/Kolkata = +05:30
*/
const getTimezoneOffsetMs = (date, timeZone) => {
  try {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h23",
    });

    const parts = formatter.formatToParts(date);

    const values = {};

    parts.forEach((part) => {
      if (part.type !== "literal") {
        values[part.type] = part.value;
      }
    });

    const asUTC = Date.UTC(
      Number(values.year),
      Number(values.month) - 1,
      Number(values.day),
      Number(values.hour),
      Number(values.minute),
      Number(values.second)
    );

    return asUTC - date.getTime();
  } catch (error) {
    console.error("Timezone offset error:", error);

    return 0;
  }
};

/*
  IMPORTANT:

  Backend requires:

  2026-09-28T16:34:00.000Z

  NOT:

  22:04

  This function takes the user's selected local time
  and converts it into UTC ISO format.
*/
const convertTimeToUTCISO = (time, ampm, timeZone) => {
  const time24 = convertTo24Hour(time, ampm);

  if (!time24) {
    return "";
  }

  const [hour, minute] = time24.split(":").map(Number);

  if (
    Number.isNaN(hour) ||
    Number.isNaN(minute) ||
    hour < 0 ||
    hour > 23 ||
    minute < 0 ||
    minute > 59
  ) {
    return "";
  }

  const now = new Date();

  /*
    Use today's date.

    The backend can use the time portion for the recurring
    session while receiving a valid UTC ISO string.
  */
  const year = now.getFullYear();
  const month = now.getMonth();
  const day = now.getDate();

  /*
    First create a UTC guess using the requested wall-clock time.
  */
  const utcGuess = new Date(
    Date.UTC(year, month, day, hour, minute, 0, 0)
  );

  /*
    Find timezone offset.
  */
  const offset = getTimezoneOffsetMs(
    utcGuess,
    timeZone || getTimezone()
  );

  /*
    Convert local wall-clock time -> UTC.
  */
  const utcDate = new Date(utcGuess.getTime() - offset);

  return utcDate.toISOString();
};

/*
  Returns a safe session ID regardless of whether backend
  returns `id` or `session_id`.
*/
const getSessionId = (session) => {
  return session?.id ?? session?.session_id ?? null;
};

/* ============================================================
   STYLES
============================================================ */

const inputClass =
  "w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors";

const selectClass =
  "w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors";

const labelClass = "block text-sm text-white mb-1";

const gridInputClass =
  "w-full p-2.5 rounded-lg bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors text-sm";

/* ============================================================
   MAIN COMPONENT
============================================================ */

export default function InstituteSessions() {
  const tz = useTimezone();

  /* ==========================================================
     STATE
  ========================================================== */

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

  /* ==========================================================
     CREATE FORM
  ========================================================== */

  const [form, setForm] = useState({
    class_id: "",
    title: "",
    start_time: "",
    start_ampm: "AM",
    notes: "",
  });

  /* ==========================================================
     EDIT FORM
  ========================================================== */

  const [editForm, setEditForm] = useState({
    session_id: "",
    class_id: "",
    title: "",
    start_time: "",
    start_ampm: "AM",
  });

  const [selectedSession, setSelectedSession] = useState(null);

  /* ==========================================================
     RESET CREATE FORM
  ========================================================== */

  const resetCreateForm = () => {
    setForm({
      class_id: "",
      title: "",
      start_time: "",
      start_ampm: "AM",
      notes: "",
    });
  };

  /* ==========================================================
     FETCH CLASSES
  ========================================================== */

  const fetchClasses = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/classes/institute/my-classes`,
        authHeader()
      );

      const data = res.data?.data || res.data || [];

      setClasses(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch Classes Error:", err);

      toast.error(
        err.response?.data?.message || "Failed to load classes"
      );
    }
  };

  /* ==========================================================
     FETCH SESSIONS
  ========================================================== */

  const fetchSessions = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${API_URL}/sessions/institute/my-sessions`,
        authHeader()
      );

      let data = [];

      if (Array.isArray(res.data)) {
        data = res.data;
      } else if (Array.isArray(res.data?.data)) {
        data = res.data.data;
      } else if (Array.isArray(res.data?.sessions)) {
        data = res.data.sessions;
      }

      setSessions(data);
    } catch (err) {
      console.error("Fetch Sessions Error:", err);
      console.error("Backend Response:", err.response?.data);

      setSessions([]);

      toast.error(
        err.response?.data?.message || "Failed to load sessions"
      );
    } finally {
      setLoading(false);
    }
  };

  /* ==========================================================
     INITIAL LOAD
  ========================================================== */

  useEffect(() => {
    fetchClasses();
    fetchSessions();
  }, []);

  /* ==========================================================
     FILTER
  ========================================================== */

  const filteredSessions = useMemo(() => {
    let data = Array.isArray(sessions) ? [...sessions] : [];

    if (statusFilter !== "ALL") {
      data = data.filter((item) => {
        const status = String(
          item.live_status || item.status || ""
        ).toUpperCase();

        return status === statusFilter;
      });
    }

    if (search.trim()) {
      const keyword = search.toLowerCase().trim();

      data = data.filter((item) => {
        return (
          String(item.title || "")
            .toLowerCase()
            .includes(keyword) ||
          String(item.class_title || "")
            .toLowerCase()
            .includes(keyword) ||
          String(item.trainer_name || "")
            .toLowerCase()
            .includes(keyword)
        );
      });
    }

    return data;
  }, [sessions, search, statusFilter]);

  /* ==========================================================
     PAGINATION
  ========================================================== */

  const totalPages = Math.ceil(
    filteredSessions.length / PAGE_SIZE
  );

  const paginatedSessions = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;

    return filteredSessions.slice(
      start,
      start + PAGE_SIZE
    );
  }, [filteredSessions, page]);

  useEffect(() => {
    if (page > totalPages && totalPages > 0) {
      setPage(1);
    }
  }, [page, totalPages]);

  /* ==========================================================
     STATS
  ========================================================== */

  const stats = useMemo(() => {
    const list = Array.isArray(sessions) ? sessions : [];

    const getStatus = (session) =>
      String(
        session?.live_status ||
          session?.status ||
          ""
      ).toUpperCase();

    return {
      total: list.length,

      scheduled: list.filter((session) => {
        const status = getStatus(session);

        return (
          status === "SCHEDULED" ||
          status === "UPCOMING"
        );
      }).length,

      live: list.filter(
        (session) => getStatus(session) === "LIVE"
      ).length,

      completed: list.filter(
        (session) => getStatus(session) === "COMPLETED"
      ).length,
    };
  }, [sessions]);

  /* ==========================================================
     CREATE SESSION
  ========================================================== */

  const createSession = async () => {
    try {
      setCreating(true);

      /* -----------------------------
         VALIDATION
      ----------------------------- */

      if (!form.class_id) {
        toast.error("Please select a class");
        return;
      }

      if (!form.title.trim()) {
        toast.error("Please enter session title");
        return;
      }

      if (form.title.trim().length < 2) {
        toast.error(
          "Session title must contain at least 2 characters"
        );
        return;
      }

      if (!form.start_time) {
        toast.error("Please select start time");
        return;
      }

      const utcStartTime = convertTimeToUTCISO(
        form.start_time,
        form.start_ampm,
        tz.timezone
      );

      if (!utcStartTime) {
        toast.error("Invalid start time");
        return;
      }

      const payload = {
        class_id: form.class_id,
        title: form.title.trim(),
        start_time: utcStartTime,
        notes: form.notes?.trim() || "",
        timezone: tz.timezone,
      };

      console.log("CREATE SESSION PAYLOAD:", payload);

      /*
        Keep the existing backend contract:
        sessions: [single session]

        This removes the template UI while maintaining
        compatibility with the existing create endpoint.
      */
      await axios.post(
        `${API_URL}/sessions/institute/create`,
        {
          sessions: [payload],
        },
        authHeader()
      );

      toast.success("Session created successfully");

      setShowCreateModal(false);

      resetCreateForm();

      await fetchSessions();
    } catch (err) {
      console.error("Create Session Error:", err);
      console.error(
        "Backend Response:",
        err.response?.data
      );

      toast.error(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Unable to create session"
      );
    } finally {
      setCreating(false);
    }
  };

  /* ==========================================================
     OPEN EDIT MODAL
  ========================================================== */

  const openEditModal = (session) => {
    if (!session) {
      toast.error("Session data is missing");
      return;
    }

    const sessionId = getSessionId(session);

    if (!sessionId) {
      toast.error("Session ID is missing");
      console.error("Invalid session:", session);
      return;
    }

    setSelectedSession(session);

    const start = convertTo12Hour(
      session.start_time
    );

    setEditForm({
      session_id: sessionId,
      class_id:
        session.class_id ||
        session.classId ||
        "",
      title: session.title || "",
      start_time: start.time,
      start_ampm: start.ampm,
    });

    setShowEditModal(true);
  };

  /* ==========================================================
     UPDATE SESSION
  ========================================================== */

  const updateSession = async () => {
    try {
      setEditing(true);

      /* -----------------------------
         VALIDATION
      ----------------------------- */

      if (!editForm.session_id) {
        toast.error("Session ID is missing");
        return;
      }

      if (!editForm.class_id) {
        toast.error("Please select a class");
        return;
      }

      if (!editForm.title.trim()) {
        toast.error("Please enter session title");
        return;
      }

      if (editForm.title.trim().length < 2) {
        toast.error(
          "Session title must contain at least 2 characters"
        );
        return;
      }

      if (!editForm.start_time) {
        toast.error("Please select start time");
        return;
      }

      /*
        IMPORTANT FIX:

        Backend requires:

        2026-09-28T16:34:00.000Z

        NOT:

        22:04
      */
      const utcStartTime = convertTimeToUTCISO(
        editForm.start_time,
        editForm.start_ampm,
        tz.timezone
      );

      if (!utcStartTime) {
        toast.error("Invalid start time");
        return;
      }

      const payload = {
        class_id: editForm.class_id,
        title: editForm.title.trim(),
        start_time: utcStartTime,
        timezone: tz.timezone,
      };

      console.log(
        "================================="
      );

      console.log("UPDATE SESSION");

      console.log("Session ID:", editForm.session_id);

      console.log("Payload:", payload);

      console.log(
        "================================="
      );

      await axios.put(
        `${API_URL}/sessions/institute/${editForm.session_id}`,
        payload,
        authHeader()
      );

      toast.success("Session updated successfully");

      setShowEditModal(false);

      setSelectedSession(null);

      await fetchSessions();
    } catch (err) {
      console.error("Update Session Error:", err);

      console.error(
        "Backend Response:",
        err.response?.data
      );

      toast.error(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Unable to update session"
      );
    } finally {
      setEditing(false);
    }
  };

  /* ==========================================================
     OPEN DELETE MODAL
  ========================================================== */

  const openDeleteModal = (session) => {
    if (!session) {
      toast.error("Session data is missing");
      return;
    }

    const sessionId = getSessionId(session);

    if (!sessionId) {
      toast.error("Session ID is missing");
      console.error("Invalid session:", session);
      return;
    }

    setSelectedSession(session);

    setShowDeleteModal(true);
  };

  /* ==========================================================
     DELETE SESSION
  ========================================================== */

  const deleteSession = async () => {
    try {
      setDeleting(true);

      const sessionId = getSessionId(
        selectedSession
      );

      if (!sessionId) {
        toast.error("Session ID is missing");
        return;
      }

      await axios.delete(
        `${API_URL}/sessions/institute/${sessionId}`,
        authHeader()
      );

      toast.success("Session deleted successfully");

      setShowDeleteModal(false);

      setSelectedSession(null);

      await fetchSessions();
    } catch (err) {
      console.error("Delete Session Error:", err);

      toast.error(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Unable to delete session"
      );
    } finally {
      setDeleting(false);
    }
  };

  /* ==========================================================
     OPEN ZOOM MODAL
  ========================================================== */

  const openZoomModal = (session) => {
    if (!session) {
      toast.error("Session data is missing");
      return;
    }

    const sessionId = getSessionId(session);

    if (!sessionId) {
      toast.error("Session ID is missing");
      return;
    }

    setSelectedSession(session);

    setShowZoomModal(true);
  };

  /* ==========================================================
     GENERATE ZOOM
  ========================================================== */

  const generateZoomMeeting = async () => {
    try {
      setGeneratingZoom(true);

      const sessionId = getSessionId(
        selectedSession
      );

      if (!sessionId) {
        toast.error("Session ID is missing");
        return;
      }

      await axios.post(
        `${API_URL}/sessions/institute/${sessionId}/generate-zoom`,
        {},
        authHeader()
      );

      toast.success(
        "Zoom meeting generated successfully"
      );

      await fetchSessions();

      setShowZoomModal(false);
    } catch (err) {
      console.error(
        "Generate Zoom Error:",
        err
      );

      toast.error(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Unable to generate Zoom meeting"
      );
    } finally {
      setGeneratingZoom(false);
    }
  };

  /* ==========================================================
     COPY ZOOM LINK
  ========================================================== */

  const copyZoomLink = async (link) => {
    if (!link) {
      toast.error("Zoom link not available");
      return;
    }

    try {
      await navigator.clipboard.writeText(link);

      toast.success("Zoom link copied");
    } catch (error) {
      console.error(
        "Clipboard error:",
        error
      );

      try {
        const textArea =
          document.createElement("textarea");

        textArea.value = link;

        document.body.appendChild(textArea);

        textArea.select();

        document.execCommand("copy");

        document.body.removeChild(
          textArea
        );

        toast.success("Zoom link copied");
      } catch {
        toast.error(
          "Unable to copy Zoom link"
        );
      }
    }
  };

  /* ==========================================================
     RENDER
  ========================================================== */

  return (
    <div className="p-8 text-white min-h-full">

      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">

        <div>
          <h1 className="text-4xl font-bold text-purple-400">
            Institute Sessions
          </h1>

          <p className="text-white mt-2">
            Manage sessions for your institute classes.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            resetCreateForm();
            setShowCreateModal(true);
          }}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          <Plus size={18} />

          Create Session
        </button>
      </div>

      {/* ======================================================
          STATS
      ====================================================== */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

        <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-5">
          <p className="text-white text-sm">
            Total Sessions
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {stats.total}
          </h2>
        </div>

        <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-5">
          <p className="text-white text-sm">
            Scheduled
          </p>

          <h2 className="text-4xl font-bold text-white mt-2">
            {stats.scheduled}
          </h2>
        </div>

        <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-5">
          <p className="text-white text-sm">
            Live
          </p>

          <h2 className="text-4xl font-bold text-white mt-2">
            {stats.live}
          </h2>
        </div>

        <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-5">
          <p className="text-white text-sm">
            Completed
          </p>

          <h2 className="text-4xl font-bold text-white mt-2">
            {stats.completed}
          </h2>
        </div>

      </div>

      {/* ======================================================
          SEARCH + FILTER
      ====================================================== */}

      <div className="mb-6">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          <div className="relative w-full">

            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white pointer-events-none"
              size={18}
            />

            <input
              type="text"
              placeholder="Search sessions..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full pl-12 pr-10 py-3.5 rounded-xl bg-[#151519] border border-[#2c2c35] text-white placeholder-white focus:outline-none focus:border-purple-500/60 transition-colors text-sm"
            />

            {search && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setPage(1);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-purple-300"
              >
                <X size={14} />
              </button>
            )}

          </div>

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="w-full py-3.5 px-4 rounded-xl bg-[#151519] border border-[#2c2c35] text-white focus:outline-none focus:border-purple-500/60 transition-colors text-sm"
          >
            <option value="ALL">
              All Status
            </option>

            <option value="SCHEDULED">
              Scheduled
            </option>

            <option value="UPCOMING">
              Upcoming
            </option>

            <option value="LIVE">
              Live
            </option>

            <option value="COMPLETED">
              Completed
            </option>
          </select>

        </div>

      </div>

      {/* ======================================================
          TABLE
      ====================================================== */}

      <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl overflow-hidden">

        <div className="overflow-x-auto">

          {loading ? (

            <div className="p-24 flex flex-col items-center justify-center">

              <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />

              <p className="mt-5 text-gray-500">
                Loading Sessions...
              </p>

            </div>

          ) : paginatedSessions.length === 0 ? (

            <div className="p-12 text-center">

              <BookOpen
                size={40}
                className="text-gray-600 mx-auto"
              />

              <p className="text-gray-500 text-lg mt-3">

                {search
                  ? "No sessions found"
                  : "No sessions available right now"}

              </p>

            </div>

          ) : (

            <table className="w-full">

              <thead className="bg-[#202027] text-white">

                <tr>

                  <th className="p-4 text-left whitespace-nowrap">
                    Session
                  </th>

                  <th className="p-4 text-left whitespace-nowrap">
                    Class
                  </th>

                  <th className="p-4 text-left whitespace-nowrap">
                    Trainer
                  </th>

                  <th className="p-4 text-left whitespace-nowrap">
                    Start Time
                  </th>

                  <th className="p-4 text-left whitespace-nowrap">
                    Status
                  </th>

                  <th className="p-4 text-left whitespace-nowrap">
                    Zoom
                  </th>

                  <th className="p-4 text-left whitespace-nowrap">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {paginatedSessions.map(
                  (session) => {

                    const sessionId =
                      getSessionId(session);

                    const hasZoom =
                      !!session.zoom_link;

                    const start12 =
                      convertTo12Hour(
                        session.start_time
                      );

                    const currentStatus =
                      String(
                        session.live_status ||
                          session.status ||
                          "SCHEDULED"
                      ).toUpperCase();

                    return (
                      <tr
                        key={sessionId}
                        className="border-t border-[#2c2c35] hover:bg-[#1a1a20] transition-colors"
                      >

                        {/* SESSION */}

                        <td className="p-4 text-white whitespace-nowrap">

                          <div className="font-semibold">
                            {session.title ||
                              "Untitled Session"}
                          </div>

                        </td>

                        {/* CLASS */}

                        <td className="p-4 text-white whitespace-nowrap">

                          {session.class_title ||
                            session.class_name ||
                            "-"}

                        </td>

                        {/* TRAINER */}

                        <td className="p-4 text-white whitespace-nowrap">

                          {session.trainer_name ||
                            "-"}

                        </td>

                        {/* TIME */}

                        <td className="p-4 text-white whitespace-nowrap">

                          <div className="flex items-center gap-2">

                            <Clock
                              size={14}
                              className="text-purple-400"
                            />

                            <span>
                              {start12.time}{" "}
                              {start12.ampm}
                            </span>

                          </div>

                          {session.session_timezone &&
                            session.session_timezone !==
                              tz.timezone && (
                              <span className="ml-5 text-[10px] text-purple-400/70 bg-purple-500/10 px-1.5 py-0.5 rounded">
                                {
                                  session.session_timezone
                                }
                              </span>
                            )}

                        </td>

                        {/* STATUS */}

                        <td className="p-4 whitespace-nowrap">

                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                              currentStatus ===
                              "LIVE"
                                ? "bg-green-500/20 text-green-400"
                                : currentStatus ===
                                  "COMPLETED"
                                ? "bg-blue-500/20 text-blue-400"
                                : currentStatus ===
                                  "UPCOMING"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-yellow-500/20 text-yellow-400"
                            }`}
                          >

                            {currentStatus ===
                              "LIVE" && (
                              <CheckCircle
                                size={12}
                              />
                            )}

                            {currentStatus}

                          </span>

                        </td>

                        {/* ZOOM */}

                        <td className="p-4 whitespace-nowrap">

                          {hasZoom ? (

                            <button
                              type="button"
                              onClick={() =>
                                copyZoomLink(
                                  session.zoom_link
                                )
                              }
                              className="flex items-center gap-1.5 text-purple-300/80 hover:text-purple-300 transition-colors"
                            >
                              <Copy size={14} />

                              Copy Link
                            </button>

                          ) : (

                            <button
                              type="button"
                              onClick={() =>
                                openZoomModal(
                                  session
                                )
                              }
                              className="flex items-center gap-1.5 text-gray-500 hover:text-white transition-colors"
                            >
                              <RefreshCcw
                                size={14}
                              />

                              Generate
                            </button>

                          )}

                        </td>

                        {/* ACTIONS */}

                        <td className="p-4">

                          <div className="flex items-center gap-2">

                            <button
                              type="button"
                              onClick={() =>
                                openEditModal(
                                  session
                                )
                              }
                              className="p-2 rounded-lg hover:bg-[#2a2a35] transition-colors group"
                              title="Edit Session"
                            >
                              <Edit
                                size={16}
                                className="text-white group-hover:text-purple-300"
                              />
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                openDeleteModal(
                                  session
                                )
                              }
                              className="p-2 rounded-lg hover:bg-red-500/10 transition-colors group"
                              title="Delete Session"
                            >
                              <Trash2
                                size={16}
                                className="text-red-500/70 group-hover:text-red-400"
                              />
                            </button>

                          </div>

                        </td>

                      </tr>
                    );
                  }
                )}

              </tbody>

            </table>

          )}

        </div>

      </div>

      {/* ======================================================
          PAGINATION
      ====================================================== */}

      {totalPages > 1 && (

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 text-sm">

          <p className="text-white">

            Showing{" "}
            {(page - 1) * PAGE_SIZE + 1}{" "}
            to{" "}
            {Math.min(
              page * PAGE_SIZE,
              filteredSessions.length
            )}{" "}
            of{" "}
            {filteredSessions.length} entries

          </p>

          <div className="flex gap-2">

            <button
              type="button"
              onClick={() =>
                setPage((p) =>
                  Math.max(1, p - 1)
                )
              }
              disabled={page === 1}
              className="px-4 py-2 rounded-xl bg-[#151519] border border-[#2c2c35] text-gray-300 hover:bg-[#1a1a20] disabled:opacity-50 transition-colors"
            >
              Prev
            </button>

            <button
              type="button"
              onClick={() =>
                setPage((p) =>
                  Math.min(
                    totalPages,
                    p + 1
                  )
                )
              }
              disabled={
                page === totalPages
              }
              className="px-4 py-2 rounded-xl bg-[#151519] border border-[#2c2c35] text-gray-300 hover:bg-[#1a1a20] disabled:opacity-50 transition-colors"
            >
              Next
            </button>

          </div>

        </div>

      )}

      {/* ======================================================
          CREATE SESSION MODAL
      ====================================================== */}

      {showCreateModal && (

        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">

          <div className="w-full max-w-[650px] max-h-[90vh] bg-[#211c30] rounded-2xl overflow-hidden shadow-2xl">

            {/* HEADER */}

            <div className="flex justify-between items-center p-6 border-b border-[#3a3448]">

              <div>

                <h2 className="text-2xl font-bold text-white">
                  Create Session
                </h2>

                <p className="text-white mt-1 text-sm">
                  Create a session for your class.
                  Time is saved as{" "}
                  <span className="text-purple-300">
                    {tz.label}
                  </span>
                  .
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  setShowCreateModal(false)
                }
                className="text-white hover:text-purple-300 transition-colors"
              >
                <X size={20} />
              </button>

            </div>

            {/* BODY */}

            <div className="overflow-y-auto max-h-[75vh] p-6">

              {/* CLASS */}

              <div>

                <label className={labelClass}>
                  Class
                </label>

                <select
                  className={selectClass}
                  value={form.class_id}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      class_id:
                        e.target.value,
                    })
                  }
                >

                  <option value="">
                    Select Class
                  </option>

                  {classes.map((cls) => (

                    <option
                      key={cls.id}
                      value={cls.id}
                    >
                      {cls.title ||
                        cls.class_title ||
                        cls.name}
                    </option>

                  ))}

                </select>

              </div>

              {/* SESSION TITLE */}

              <div>

                <label className={labelClass}>
                  Session Title
                </label>

                <input
                  type="text"
                  className={inputClass}
                  placeholder="e.g. Introduction to Painting"
                  value={form.title}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      title: e.target.value,
                    })
                  }
                />

              </div>

              {/* TIME */}

              <div className="border-t border-[#3a3448] pt-6 mt-4">

                <h3 className="text-lg font-bold flex items-center gap-2 mb-4 text-white">

                  <Clock
                    size={18}
                    className="text-purple-400"
                  />

                  Start Time

                  <span className="text-xs font-normal text-gray-500 ml-1">
                    ({tz.abbr})
                  </span>

                </h3>

                <div className="bg-[#151519] border border-[#2c2c35] rounded-xl p-4">

                  <div className="flex gap-2 max-w-sm">

                    <input
                      type="time"
                      className={`${gridInputClass} flex-1`}
                      value={form.start_time}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          start_time:
                            e.target.value,
                        })
                      }
                    />

                    <select
                      className="w-24 p-2.5 rounded-lg bg-[#2b2638] text-white border border-transparent focus:outline-none text-sm"
                      value={form.start_ampm}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          start_ampm:
                            e.target.value,
                        })
                      }
                    >

                      <option value="AM">
                        AM
                      </option>

                      <option value="PM">
                        PM
                      </option>

                    </select>

                  </div>

                </div>

              </div>

              {/* NOTES */}

              <div className="mt-6">

                <label className={labelClass}>
                  Notes
                </label>

                <textarea
                  rows={4}
                  className={`${inputClass} resize-none`}
                  placeholder="Optional notes..."
                  value={form.notes}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      notes: e.target.value,
                    })
                  }
                />

              </div>

            </div>

            {/* FOOTER */}

            <div className="flex justify-end gap-3 p-6 border-t border-[#3a3448]">

              <button
                type="button"
                onClick={() =>
                  setShowCreateModal(false)
                }
                className="px-5 py-3 rounded-xl border border-[#4a4359] text-white hover:bg-[#2b2638] transition-colors"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={createSession}
                disabled={creating}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center gap-2"
              >

                {creating ? (
                  <>
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />

                    Creating...
                  </>
                ) : (
                  <>
                    <Plus size={18} />

                    Create Session
                  </>
                )}

              </button>

            </div>

          </div>

        </div>

      )}

      {/* ======================================================
          EDIT SESSION MODAL
      ====================================================== */}

      {showEditModal && (

        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">

          <div className="w-full max-w-[650px] max-h-[90vh] bg-[#211c30] rounded-2xl overflow-hidden shadow-2xl">

            {/* HEADER */}

            <div className="flex justify-between items-center p-6 border-b border-[#3a3448]">

              <div>

                <h2 className="text-2xl font-bold text-white">
                  Edit Session
                </h2>

                <p className="text-white mt-1 text-sm">
                  Update session information.{" "}
                  <span className="text-purple-300">
                    ({tz.abbr})
                  </span>
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  setShowEditModal(false)
                }
                className="text-white hover:text-purple-300 transition-colors"
              >
                <X size={20} />
              </button>

            </div>

            {/* BODY */}

            <div className="overflow-y-auto max-h-[75vh] p-6">

              {/* CLASS */}

              <div>

                <label className={labelClass}>
                  Class
                </label>

                <select
                  className={selectClass}
                  value={editForm.class_id}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      class_id:
                        e.target.value,
                    })
                  }
                >

                  <option value="">
                    Select Class
                  </option>

                  {classes.map((cls) => (

                    <option
                      key={cls.id}
                      value={cls.id}
                    >
                      {cls.title ||
                        cls.class_title ||
                        cls.name}
                    </option>

                  ))}

                </select>

              </div>

              {/* SESSION TITLE */}

              <div>

                <label className={labelClass}>
                  Session Title
                </label>

                <input
                  type="text"
                  className={inputClass}
                  value={editForm.title}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      title: e.target.value,
                    })
                  }
                />

              </div>

              {/* TIME */}

              <div className="border-t border-[#3a3448] pt-6 mt-4">

                <h3 className="text-lg font-bold flex items-center gap-2 mb-4 text-white">

                  <Clock
                    size={18}
                    className="text-purple-400"
                  />

                  Start Time

                </h3>

                <div className="bg-[#151519] border border-[#2c2c35] rounded-xl p-4">

                  <div className="flex gap-2 max-w-sm">

                    <input
                      type="time"
                      className={`${gridInputClass} flex-1`}
                      value={editForm.start_time}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          start_time:
                            e.target.value,
                        })
                      }
                    />

                    <select
                      className="w-24 p-2.5 rounded-lg bg-[#2b2638] text-white border border-transparent focus:outline-none text-sm"
                      value={editForm.start_ampm}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          start_ampm:
                            e.target.value,
                        })
                      }
                    >

                      <option value="AM">
                        AM
                      </option>

                      <option value="PM">
                        PM
                      </option>

                    </select>

                  </div>

                </div>

              </div>

            </div>

            {/* FOOTER */}

            <div className="flex justify-end gap-3 p-6 border-t border-[#3a3448]">

              <button
                type="button"
                onClick={() =>
                  setShowEditModal(false)
                }
                className="px-5 py-3 rounded-xl border border-[#4a4359] text-white hover:bg-[#2b2638] transition-colors"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={updateSession}
                disabled={editing}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center gap-2"
              >

                {editing ? (
                  <>
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />

                    Updating...
                  </>
                ) : (
                  <>
                    <Edit size={18} />

                    Update Session
                  </>
                )}

              </button>

            </div>

          </div>

        </div>

      )}

      {/* ======================================================
          DELETE CONFIRMATION MODAL
      ====================================================== */}

      {showDeleteModal && (

        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">

          <div className="w-full max-w-[420px] bg-[#1e1b2e] border border-[#2e2a42] rounded-2xl shadow-2xl overflow-hidden">

            <div className="p-8 flex flex-col items-center">

              <div className="w-14 h-14 rounded-full bg-red-500/15 flex items-center justify-center mb-5">

                <FaTrash className="text-red-400 text-lg" />

              </div>

              <h2 className="text-xl font-bold text-white mb-3 text-center">
                Delete Session
              </h2>

              <p className="text-white text-center text-sm leading-relaxed mb-4">
                Are you sure you want to delete this session?
              </p>

              {selectedSession && (

                <div className="w-full bg-[#151519] rounded-xl p-4 mb-6 border border-[#2c2c35] text-sm">

                  <p className="text-gray-500 text-xs">
                    Session
                  </p>

                  <p className="font-semibold text-white">
                    {selectedSession.title ||
                      "Untitled Session"}
                  </p>

                  <div className="mt-3">

                    <p className="text-gray-500 text-xs">
                      Start Time
                    </p>

                    <p className="text-gray-300">

                      {
                        convertTo12Hour(
                          selectedSession.start_time
                        ).time
                      }{" "}

                      {
                        convertTo12Hour(
                          selectedSession.start_time
                        ).ampm
                      }

                    </p>

                  </div>

                </div>

              )}

              <div className="flex gap-3 w-full">

                <button
                  type="button"
                  onClick={() =>
                    setShowDeleteModal(false)
                  }
                  className="flex-1 px-5 py-3 rounded-xl border border-[#4a4359] text-white hover:bg-[#2b2638] transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={deleteSession}
                  disabled={deleting}
                  className="flex-1 px-5 py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2"
                >

                  {deleting ? (
                    <>
                      <Loader2
                        size={16}
                        className="animate-spin"
                      />

                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 size={16} />

                      Delete
                    </>
                  )}

                </button>

              </div>

            </div>

          </div>

        </div>

      )}

      {/* ======================================================
          ZOOM MODAL
      ====================================================== */}

      {showZoomModal && (

        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">

          <div className="w-full max-w-[600px] max-h-[90vh] bg-[#211c30] rounded-2xl overflow-hidden shadow-2xl">

            {/* HEADER */}

            <div className="flex justify-between items-center p-6 border-b border-[#3a3448]">

              <div>

                <h2 className="text-2xl font-bold text-white flex items-center gap-2">

                  <Video
                    className="text-white"
                    size={22}
                  />

                  Zoom Meeting

                </h2>

                <p className="text-white mt-1 text-sm">
                  Manage the Zoom link for this session.
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  setShowZoomModal(false)
                }
                className="text-white hover:text-purple-300 transition-colors"
              >
                <X size={20} />
              </button>

            </div>

            {/* BODY */}

            <div className="overflow-y-auto max-h-[75vh] p-6">

              {selectedSession?.zoom_link ? (

                <div className="space-y-4">

                  <div>

                    <label className={labelClass}>
                      Meeting ID
                    </label>

                    <div className="w-full p-3 rounded-xl bg-[#2b2638] text-white">
                      {selectedSession.zoom_meeting_id ||
                        "-"}
                    </div>

                  </div>

                  <div>

                    <label className={labelClass}>
                      Password
                    </label>

                    <div className="w-full p-3 rounded-xl bg-[#2b2638] text-white">
                      {selectedSession.zoom_password ||
                        "-"}
                    </div>

                  </div>

                  <div>

                    <label className={labelClass}>
                      Join URL
                    </label>

                    <div className="flex gap-3 mt-2">

                      <input
                        readOnly
                        value={
                          selectedSession.zoom_link
                        }
                        className="w-full p-3 rounded-xl bg-[#2b2638] text-white border border-transparent"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          copyZoomLink(
                            selectedSession.zoom_link
                          )
                        }
                        className="px-5 py-3 rounded-xl bg-[#151519] border border-[#2c2c35] hover:bg-[#1a1a20] transition-colors"
                      >
                        <Copy size={18} />
                      </button>

                    </div>

                  </div>

                </div>

              ) : (

                <div className="text-center py-14">

                  <Video
                    size={60}
                    className="mx-auto text-white"
                  />

                  <h3 className="text-2xl font-bold mt-6">
                    No Zoom Meeting
                  </h3>

                  <p className="text-white mt-2">
                    Generate a Zoom link for this session.
                  </p>

                </div>

              )}

              {/* ZOOM ACTION */}

              <div className="flex justify-end pt-4 border-t border-[#3a3448] mt-6">

                <button
                  type="button"
                  onClick={generateZoomMeeting}
                  disabled={generatingZoom}
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center gap-2"
                >

                  {generatingZoom ? (
                    <>
                      <Loader2
                        size={18}
                        className="animate-spin"
                      />

                      Generating...
                    </>
                  ) : (
                    <>
                      <RefreshCcw size={18} />

                      {selectedSession?.zoom_link
                        ? "Regenerate Zoom"
                        : "Generate Zoom"}
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