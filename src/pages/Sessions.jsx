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
//   XCircle,
//   Loader2,
//   Copy,
//   RefreshCcw,
//   BookOpen,
//   X,
// } from "lucide-react";

// const API_URL = "http://localhost:5000/api";

// const authHeader = () => ({
//   headers: {
//     Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
//   },
// });

// /* ═══════════════════════════════════════════════════════
//    TIME HELPERS
// ═══════════════════════════════════════════════════════ */
// const convertTo24Hour = (time, ampm) => {
//   if (!time) return "";
//   let [hour, minute] = time.split(":").map(Number);
//   if (hour > 12) {
//     return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
//   }
//   if (ampm === "PM" && hour !== 12) {
//     hour += 12;
//   }
//   if (ampm === "AM" && hour === 12) {
//     hour = 0;
//   }
//   return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
// };

// const convertTo12Hour = (time24) => {
//   if (!time24) {
//     return { time: "", ampm: "AM" };
//   }
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
// ═══════════════════════════════════════════════════════ */
// const inputClass =
//   "w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors";
// const selectClass =
//   "w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors";
// const labelClass = "block text-sm text-gray-400 mb-1";
// const gridInputClass =
//   "w-full p-2.5 rounded-lg bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors text-sm";

// /* ═══════════════════════════════════════════════════════
//    MAIN COMPONENT
// ═══════════════════════════════════════════════════════ */

// export default function Sessions() {
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

//   /* CREATE FORM */
//   const [form, setForm] = useState({
//     class_id: "",
//     notes: "",
//   });

//   // CHANGED: Removed session_date, added title per slot (for Session A, Session B, etc.)
//   const [slots, setSlots] = useState([
//     {
//       id: Date.now(),
//       title: "",
//       start_time: "",
//       start_ampm: "AM",
//       end_time: "",
//       end_ampm: "AM",
//     },
//   ]);

//   /* EDIT FORM */
//   const [editForm, setEditForm] = useState({
//     session_id: "",
//     class_id: "",
//     title: "",
//     start_time: "",
//     start_ampm: "AM",
//     end_time: "",
//     end_ampm: "AM",
//     notes: "",
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
//         end_time: "",
//         end_ampm: "AM",
//       },
//     ]);
//   };

//   const removeSlot = (slotId) => {
//     if (slots.length <= 1) return toast.error("At least one template is required");
//     setSlots((prev) => prev.filter((s) => s.id !== slotId));
//   };

//   const updateSlot = (slotId, field, value) => {
//     setSlots((prev) => prev.map((s) => (s.id === slotId ? { ...s, [field]: value } : s)));
//   };

//   const resetCreateForm = () => {
//     setForm({ class_id: "", notes: "" });
//     setSlots([{ id: Date.now(), title: "", start_time: "", start_ampm: "AM", end_time: "", end_ampm: "AM" }]);
//   };

//   /* ─────────────────────────────────────────────
//      LOAD CLASSES
//   ───────────────────────────────────────────── */
//   const fetchClasses = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/classes`, authHeader());
//       setClasses(res.data?.data || res.data || []);
//     } catch (err) {
//       toast.error("Failed to load classes");
//     }
//   };

//   /* ─────────────────────────────────────────────
//      LOAD SESSIONS (Dynamic for Today based on new flow)
//   ───────────────────────────────────────────── */
//   const fetchSessions = async () => {
//     try {
//       setLoading(true);
//       // Fetches sessions that are active for TODAY based on DAYNAME and TIME
//       const res = await axios.get(`${API_URL}/sessions/admin/today`, authHeader());
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
//      SEARCH + FILTER
//   ───────────────────────────────────────────── */
//   const filteredSessions = useMemo(() => {
//     let data = Array.isArray(sessions) ? [...sessions] : [];
//     if (statusFilter !== "ALL") {
//       data = data.filter((item) => (item.live_status || item.status) === statusFilter);
//     }
//     if (search.trim()) {
//       const keyword = search.toLowerCase();
//       data = data.filter((item) => {
//         return (
//           item.title?.toLowerCase().includes(keyword) ||
//           item.class_title?.toLowerCase().includes(keyword) ||
//           item.trainer_name?.toLowerCase().includes(keyword) ||
//           item.institute_name?.toLowerCase().includes(keyword)
//         );
//       });
//     }
//     return data;
//   }, [sessions, search, statusFilter]);

//   /* ─────────────────────────────────────────────
//      PAGINATION
//   ───────────────────────────────────────────── */
//   const totalPages = Math.ceil(filteredSessions.length / PAGE_SIZE);
//   const paginatedSessions = useMemo(() => {
//     const start = (page - 1) * PAGE_SIZE;
//     return filteredSessions.slice(start, start + PAGE_SIZE);
//   }, [filteredSessions, page]);

//   useEffect(() => {
//     if (page > totalPages && totalPages > 0) setPage(1);
//   }, [filteredSessions]);

//   /* ─────────────────────────────────────────────
//      DASHBOARD STATS
//   ───────────────────────────────────────────── */
//   const stats = useMemo(() => {
//     const list = Array.isArray(sessions) ? sessions : [];
//     const statusKey = list[0]?.live_status !== undefined ? "live_status" : "status";
//     return {
//       total: list.length,
//       scheduled: list.filter((s) => s[statusKey] === "SCHEDULED").length,
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

//       const invalidSlot = slots.find((s) => !s.title || !s.start_time || !s.end_time);
//       if (invalidSlot) return toast.error("Please fill title, start time and end time for all templates");

//       // CHANGED: Payload no longer sends session_date
//       const payloads = slots.map((slot) => ({
//         class_id: form.class_id,
//         title: slot.title,
//         start_time: convertTo24Hour(slot.start_time, slot.start_ampm),
//         end_time: convertTo24Hour(slot.end_time, slot.end_ampm),
//         notes: form.notes,
//       }));

//       await axios.post(`${API_URL}/sessions/create`, { sessions: payloads }, authHeader());

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
//      OPEN EDIT MODAL
//   ───────────────────────────────────────────── */
//   const openEditModal = (session) => {
//     setSelectedSession(session);
//     const start = convertTo12Hour(session.start_time);
//     const end = convertTo12Hour(session.end_time);
//     // CHANGED: Removed session_date mapping
//     setEditForm({
//       session_id: session.id,
//       class_id: session.class_id,
//       title: session.title || "",
//       start_time: start.time,
//       start_ampm: start.ampm,
//       end_time: end.time,
//       end_ampm: end.ampm,
//       notes: session.notes || "",
//     });
//     setShowEditModal(true);
//   };

//   /* ─────────────────────────────────────────────
//      UPDATE SESSION
//   ───────────────────────────────────────────── */
//   const updateSession = async () => {
//     try {
//       setEditing(true);
//       // CHANGED: Payload no longer sends session_date
//       await axios.put(
//         `${API_URL}/sessions/${editForm.session_id}`,
//         {
//           class_id: editForm.class_id,
//           title: editForm.title,
//           start_time: convertTo24Hour(editForm.start_time, editForm.start_ampm),
//           end_time: convertTo24Hour(editForm.end_time, editForm.end_ampm),
//           notes: editForm.notes,
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
//      DELETE & ZOOM LOGIC (Unchanged conceptually)
//   ───────────────────────────────────────────── */
//   const openDeleteModal = (session) => { setSelectedSession(session); setShowDeleteModal(true); };
//   const deleteSession = async () => {
//     try {
//       setDeleting(true);
//       await axios.delete(`${API_URL}/sessions/${selectedSession.id}`, authHeader());
//       toast.success("Session deleted");
//       setShowDeleteModal(false);
//       fetchSessions();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Unable to delete session");
//     } finally { setDeleting(false); }
//   };

//   const openZoomModal = (session) => { setSelectedSession(session); setShowZoomModal(true); };
//   const generateZoomMeeting = async () => {
//     try {
//       setGeneratingZoom(true);
//       await axios.post(`${API_URL}/sessions/${selectedSession.id}/generate-zoom`, {}, authHeader());
//       toast.success("Zoom meeting generated");
//       fetchSessions();
//       setShowZoomModal(false);
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Unable to generate Zoom meeting");
//     } finally { setGeneratingZoom(false); }
//   };
//   const copyZoomLink = async () => {
//     if (!selectedSession?.zoom_link) return toast.error("Zoom link not available");
//     await navigator.clipboard.writeText(selectedSession.zoom_link);
//     toast.success("Zoom link copied");
//   };

//   /* ============================================================
//       PAGE RENDER
//   ============================================================ */
//   return (
//     <div className="p-8 text-white">
//       {/* HEADER */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//         <div>
//           <h1 className="text-4xl font-bold text-purple-400">Session Templates</h1>
//           <p className="text-gray-400 mt-2">Manage recurring time slots (e.g., Session A, B, C).</p>
//         </div>
//         <button onClick={() => setShowCreateModal(true)} className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition-opacity flex items-center gap-2">
//           <Plus size={18} /> Create Template
//         </button>
//       </div>

//       {/* STATS */}
//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
//         <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-5">
//           <p className="text-gray-400 text-sm">Active Today</p>
//           <h2 className="text-4xl font-bold mt-2">{stats.total}</h2>
//         </div>
//         <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-5">
//           <p className="text-gray-400 text-sm">Scheduled</p>
//           <h2 className="text-4xl font-bold text-blue-400 mt-2">{stats.scheduled}</h2>
//         </div>
//         <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-5">
//           <p className="text-gray-400 text-sm">Live</p>
//           <h2 className="text-4xl font-bold text-green-400 mt-2">{stats.live}</h2>
//         </div>
//         <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-5">
//           <p className="text-gray-400 text-sm">Completed</p>
//           <h2 className="text-4xl font-bold text-cyan-400 mt-2">{stats.completed}</h2>
//         </div>
//       </div>

//       {/* FILTERS */}
//       <div className="mb-6">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//           <div className="relative w-full">
//             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={18} />
//             <input type="text" placeholder="Search templates..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-12 pr-10 py-3.5 rounded-xl bg-[#151519] border border-[#2c2c35] text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/60 transition-colors text-sm" />
//             {search && <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"><X size={14} /></button>}
//           </div>
//           <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-full py-3.5 px-4 rounded-xl bg-[#151519] border border-[#2c2c35] text-white focus:outline-none focus:border-purple-500/60 transition-colors text-sm">
//             <option value="ALL">All Status</option>
//             <option value="SCHEDULED">Scheduled</option>
//             <option value="LIVE">Live</option>
//             <option value="COMPLETED">Completed</option>
//           </select>
//         </div>
//       </div>

//       {/* TABLE */}
//       <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl overflow-hidden">
//         <div className="overflow-x-auto">
//           {loading ? (
//             <div className="p-24 flex flex-col items-center justify-center">
//               <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
//               <p className="mt-5 text-gray-500">Loading Sessions...</p>
//             </div>
//           ) : paginatedSessions.length === 0 ? (
//             <div className="p-12 text-center">
//               <BookOpen size={40} className="text-gray-600 mx-auto" />
//               <p className="text-gray-500 text-lg mt-3">{search ? "No templates found" : "No session templates active right now"}</p>
//             </div>
//           ) : (
//             <table className="w-full">
//               <thead className="bg-[#202027] text-gray-400">
//                 <tr>
//                   <th className="p-4 text-left whitespace-nowrap">ID</th>
//                   <th className="p-4 text-left whitespace-nowrap">Template Name</th>
//                   <th className="p-4 text-left whitespace-nowrap">Class</th>
//                   <th className="p-4 text-left whitespace-nowrap">Trainer</th>
//                   {/* REMOVED DATE COLUMN */}
//                   <th className="p-4 text-left whitespace-nowrap">Time Window</th>
//                   <th className="p-4 text-left whitespace-nowrap">Status</th>
//                   <th className="p-4 text-left whitespace-nowrap">Zoom</th>
//                   <th className="p-4 text-left whitespace-nowrap">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {paginatedSessions.map((session) => {
//                   const hasZoom = !!session.zoom_link;
//                   const start12 = convertTo12Hour(session.start_time);
//                   const end12 = convertTo12Hour(session.end_time);
//                   const currentStatus = session.live_status || session.status;

//                   return (
//                     <tr key={session.id} className="border-t border-[#2c2c35] hover:bg-[#1a1a20] transition-colors">
//                       <td className="p-4 text-gray-400 whitespace-nowrap">#{session.id}</td>
//                       <td className="p-4 font-medium whitespace-nowrap">{session.title || "Untitled Template"}</td>
//                       <td className="p-4 text-gray-400 whitespace-nowrap">{session.class_title || "-"}</td>
//                       <td className="p-4 text-gray-400 whitespace-nowrap">{session.trainer_name || "-"}</td>
                      
//                       <td className="p-4 text-gray-400 whitespace-nowrap">
//                         {start12.time} {start12.ampm} - {end12.time} {end12.ampm}
//                       </td>

//                       <td className="p-4 whitespace-nowrap">
//                         <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
//                             currentStatus === "LIVE" ? "bg-green-500/20 text-green-400" : 
//                             currentStatus === "COMPLETED" ? "bg-blue-500/20 text-blue-400" : 
//                             "bg-yellow-500/20 text-yellow-400"
//                           }`}>
//                           {currentStatus === "LIVE" && <CheckCircle size={12} />}
//                           {currentStatus}
//                         </span>
//                       </td>

//                       <td className="p-4 whitespace-nowrap">
//                         {hasZoom ? (
//                           <button onClick={() => { setSelectedSession(session); copyZoomLink(); }} className="flex items-center gap-1.5 text-purple-300/80 hover:text-purple-300 transition-colors">
//                             <Video size={14} /> Copy Link
//                           </button>
//                         ) : (
//                           <button onClick={() => openZoomModal(session)} className="flex items-center gap-1.5 text-gray-500 hover:text-gray-400 transition-colors">
//                             <RefreshCcw size={14} /> Generate
//                           </button>
//                         )}
//                       </td>

//                       <td className="p-4">
//                         <div className="flex items-center gap-2">
//                           <button onClick={() => openEditModal(session)} className="p-2 rounded-lg hover:bg-[#2a2a35] transition-colors group" title="Edit">
//                             <Edit size={16} className="text-gray-400 group-hover:text-white transition-colors" />
//                           </button>
//                           <button onClick={() => openDeleteModal(session)} className="p-2 rounded-lg hover:bg-red-500/10 transition-colors group" title="Delete">
//                             <Trash2 size={16} className="text-red-500/70 group-hover:text-red-400 transition-colors" />
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

//       {/* PAGINATION */}
//       {totalPages > 1 && (
//         <div className="flex justify-between items-center mt-6 text-sm">
//           <p className="text-gray-400">Showing {(page - 1) * PAGE_SIZE + 1} to {Math.min(page * PAGE_SIZE, filteredSessions.length)} of {filteredSessions.length} entries</p>
//           <div className="flex gap-2">
//             <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="px-4 py-2 rounded-xl bg-[#151519] border border-[#2c2c35] text-gray-300 hover:bg-[#1a1a20] disabled:opacity-50 transition-colors">Prev</button>
//             <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-4 py-2 rounded-xl bg-[#151519] border border-[#2c2c35] text-gray-300 hover:bg-[#1a1a20] disabled:opacity-50 transition-colors">Next</button>
//           </div>
//         </div>
//       )}

//       {/* ==================== CREATE SESSION MODAL ==================== */}
//       {showCreateModal && (
//         <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
//           <div className="w-full max-w-[700px] max-h-[90vh] bg-[#211c30] rounded-2xl overflow-hidden shadow-2xl">
//             <div className="flex justify-between items-center p-6 border-b border-[#3a3448]">
//               <div>
//                 <h2 className="text-2xl font-bold text-white">Create Session Templates</h2>
//                 <p className="text-gray-400 mt-1 text-sm">Define time slots (e.g., Session A, Session B).</p>
//               </div>
//               <button onClick={() => setShowCreateModal(false)} className="text-gray-400 hover:text-white transition-colors"><X size={20} /></button>
//             </div>

//             <div className="overflow-y-auto max-h-[75vh] p-6">
//               <div className="space-y-1">
//                 <div>
//                   <label className={labelClass}>Class</label>
//                   <select className={selectClass} value={form.class_id} onChange={(e) => setForm({ ...form, class_id: e.target.value })}>
//                     <option value="">Select Class</option>
//                     {classes.map((cls) => (<option key={cls.id} value={cls.id}>{cls.title}</option>))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className={labelClass}>Notes</label>
//                   <textarea rows={2} className={inputClass} placeholder="General notes for these templates" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
//                 </div>

//                 <div className="border-t border-[#3a3448] pt-6 mt-4">
//                   <h3 className="text-lg font-bold flex items-center gap-2 mb-4 text-white">
//                     <Clock size={18} className="text-purple-400" />
//                     Time Slots
//                   </h3>

//                   <div className="space-y-3">
//                     {slots.map((slot) => (
//                       <div key={slot.id} className="bg-[#151519] border border-[#2c2c35] rounded-xl p-4">
//                         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
//                           {/* CHANGED: Date input replaced with Title input */}
//                           <div>
//                             <label className="block mb-1.5 text-xs text-gray-400">Template Name</label>
//                             <input type="text" className={gridInputClass} placeholder="e.g. Session B" value={slot.title} onChange={(e) => updateSlot(slot.id, "title", e.target.value)} />
//                           </div>
                          
//                           <div>
//                             <label className="block mb-1.5 text-xs text-gray-400">Start Time</label>
//                             <div className="flex gap-2">
//                               <input type="time" className={`${gridInputClass} flex-1`} value={slot.start_time} onChange={(e) => updateSlot(slot.id, "start_time", e.target.value)} />
//                               <select className="w-20 p-2.5 rounded-lg bg-[#2b2638] text-white border border-transparent focus:outline-none text-sm" value={slot.start_ampm} onChange={(e) => updateSlot(slot.id, "start_ampm", e.target.value)}>
//                                 <option value="AM">AM</option><option value="PM">PM</option>
//                               </select>
//                             </div>
//                           </div>

//                           <div>
//                             <label className="block mb-1.5 text-xs text-gray-400">End Time</label>
//                             <div className="flex gap-2">
//                               <input type="time" className={`${gridInputClass} flex-1`} value={slot.end_time} onChange={(e) => updateSlot(slot.id, "end_time", e.target.value)} />
//                               <select className="w-20 p-2.5 rounded-lg bg-[#2b2638] text-white border border-transparent focus:outline-none text-sm" value={slot.end_ampm} onChange={(e) => updateSlot(slot.id, "end_ampm", e.target.value)}>
//                                 <option value="AM">AM</option><option value="PM">PM</option>
//                               </select>
//                             </div>
//                           </div>

//                           <div className="flex justify-center items-end h-full">
//                             <button onClick={() => removeSlot(slot.id)} className="p-2.5 rounded-lg text-red-500/70 hover:bg-red-500/10 hover:text-red-400 transition-colors" title="Remove slot"><X size={18} /></button>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   <button onClick={addSlot} className="mt-4 w-full py-3 rounded-xl border border-dashed border-[#2c2c35] hover:border-purple-500/50 text-gray-500 hover:text-purple-400 flex items-center justify-center gap-2 transition-colors">
//                     <Plus size={18} /> Add Another Template
//                   </button>
//                 </div>
//               </div>

//               <div className="flex justify-end pt-4 border-t border-[#3a3448] mt-6">
//                 <button onClick={createSession} disabled={creating} className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center gap-2">
//                   {creating ? (<><Loader2 size={18} className="animate-spin" /> Creating...</>) : (<><Plus size={18} /> Create Templates</>)}
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
//                 <h2 className="text-2xl font-bold text-white">Edit Template</h2>
//                 <p className="text-gray-400 mt-1 text-sm">Update session template information.</p>
//               </div>
//               <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-white transition-colors"><X size={20} /></button>
//             </div>

//             <div className="overflow-y-auto max-h-[75vh] p-6">
//               <div className="space-y-1">
//                 <div>
//                   <label className={labelClass}>Class</label>
//                   <select className={selectClass} value={editForm.class_id} onChange={(e) => setEditForm({ ...editForm, class_id: e.target.value })}>
//                     {classes.map((cls) => (<option key={cls.id} value={cls.id}>{cls.title}</option>))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className={labelClass}>Template Title</label>
//                   <input type="text" className={inputClass} value={editForm.title} onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} />
//                 </div>

//                 <div>
//                   <label className={labelClass}>Notes</label>
//                   <textarea rows={2} className={inputClass} value={editForm.notes} onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })} />
//                 </div>

//                 <div className="border-t border-[#3a3448] pt-6 mt-4">
//                   <h3 className="text-lg font-bold flex items-center gap-2 mb-4 text-white">
//                     <Clock size={18} className="text-purple-400" /> Time Slot
//                   </h3>

//                   {/* CHANGED: Removed Date field, only Time fields remain */}
//                   <div className="bg-[#151519] border border-[#2c2c35] rounded-xl p-4">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
//                       <div>
//                         <label className="block mb-1.5 text-xs text-gray-400">Start Time</label>
//                         <div className="flex gap-2">
//                           <input type="time" className={`${gridInputClass} flex-1`} value={editForm.start_time} onChange={(e) => setEditForm({ ...editForm, start_time: e.target.value })} />
//                           <select className="w-20 p-2.5 rounded-lg bg-[#2b2638] text-white border border-transparent focus:outline-none text-sm" value={editForm.start_ampm} onChange={(e) => setEditForm({ ...editForm, start_ampm: e.target.value })}>
//                             <option value="AM">AM</option><option value="PM">PM</option>
//                           </select>
//                         </div>
//                       </div>
//                       <div>
//                         <label className="block mb-1.5 text-xs text-gray-400">End Time</label>
//                         <div className="flex gap-2">
//                           <input type="time" className={`${gridInputClass} flex-1`} value={editForm.end_time} onChange={(e) => setEditForm({ ...editForm, end_time: e.target.value })} />
//                           <select className="w-20 p-2.5 rounded-lg bg-[#2b2638] text-white border border-transparent focus:outline-none text-sm" value={editForm.end_ampm} onChange={(e) => setEditForm({ ...editForm, end_ampm: e.target.value })}>
//                             <option value="AM">AM</option><option value="PM">PM</option>
//                           </select>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex justify-end pt-4 border-t border-[#3a3448] mt-6">
//                 <button onClick={updateSession} disabled={editing} className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center gap-2">
//                   {editing ? (<><Loader2 size={18} className="animate-spin" /> Updating...</>) : (<><Edit size={18} /> Update Template</>)}
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
//               <h2 className="text-xl font-bold text-white mb-3 text-center">Delete Template</h2>
//               <p className="text-gray-400 text-center text-sm leading-relaxed mb-4">Are you sure? This will remove this time slot completely.</p>
              
//               {selectedSession && (
//                 <div className="w-full bg-[#151519] rounded-xl p-4 mb-8 border border-[#2c2c35] text-sm">
//                   <p className="text-gray-500 text-xs">Title</p>
//                   <p className="font-semibold text-white">{selectedSession.title || "Untitled Template"}</p>
//                   {/* CHANGED: Removed Date display from here too */}
//                   <div className="mt-2">
//                     <p className="text-gray-500 text-xs">Time Window</p>
//                     <p className="text-gray-300">
//                       {convertTo12Hour(selectedSession.start_time).time} {convertTo12Hour(selectedSession.start_time).ampm} - {convertTo12Hour(selectedSession.end_time).time} {convertTo12Hour(selectedSession.end_time).ampm}
//                     </p>
//                   </div>
//                 </div>
//               )}

//               <button onClick={deleteSession} disabled={deleting} className="w-full px-5 py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold hover:opacity-90 transition-opacity text-sm disabled:opacity-60 flex items-center justify-center gap-2">
//                 {deleting ? (<><Loader2 size={16} className="animate-spin" /> Deleting...</>) : (<><Trash2 size={16} /> Delete</>)}
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
//                 <h2 className="text-2xl font-bold text-white flex items-center gap-2"><Video className="text-purple-400" size={22} /> Zoom Meeting</h2>
//                 <p className="text-gray-400 mt-1 text-sm">Manage the recurring Zoom link for this template.</p>
//               </div>
//               <button onClick={() => setShowZoomModal(false)} className="text-gray-400 hover:text-white transition-colors"><X size={20} /></button>
//             </div>

//             <div className="overflow-y-auto max-h-[75vh] p-6">
//               {selectedSession?.zoom_link ? (
//                 <div className="space-y-1">
//                   <div>
//                     <label className={labelClass}>Meeting ID</label>
//                     <div className="w-full p-3 rounded-xl bg-[#2b2638] text-white border border-transparent">{selectedSession.zoom_meeting_id || "-"}</div>
//                   </div>
//                   <div>
//                     <label className={labelClass}>Password</label>
//                     <div className="w-full p-3 rounded-xl bg-[#2b2638] text-white border border-transparent">{selectedSession.zoom_password || "-"}</div>
//                   </div>
//                   <div>
//                     <label className={labelClass}>Join URL</label>
//                     <div className="flex gap-3 mt-2">
//                       <input readOnly value={selectedSession.zoom_link} className="w-full p-3 rounded-xl bg-[#2b2638] text-white border border-transparent" />
//                       <button onClick={() => copyZoomLink(selectedSession?.zoom_link)} className="px-5 py-3 rounded-xl bg-[#151519] border border-[#2c2c35] hover:bg-[#1a1a20] transition-colors"><Copy size={18} /></button>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="text-center py-14">
//                   <Video size={60} className="mx-auto text-gray-600" />
//                   <h3 className="text-2xl font-bold mt-6">No Zoom Meeting</h3>
//                   <p className="text-gray-500 mt-2">Generate a recurring Zoom link for this time slot.</p>
//                 </div>
//               )}

//               <div className="flex justify-end pt-4 border-t border-[#3a3448] mt-6">
//                 <button onClick={generateZoomMeeting} disabled={generatingZoom} className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center gap-2">
//                   {generatingZoom ? (<><Loader2 size={18} className="animate-spin" /> Generating...</>) : (<><RefreshCcw size={18} /> {selectedSession?.zoom_link ? "Regenerate Zoom" : "Generate Zoom"}</>)}
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

// import {
//   Plus,
//   Search,
//   Clock,
//   Video,
//   Edit,
//   Trash2,
//   CheckCircle,
//   XCircle,
//   Loader2,
//   Copy,
//   RefreshCcw,
//   BookOpen,
//   X,
//   Globe,
// } from "lucide-react";

// /* ── Timezone Utility ── */
// import { useTimezone, getTimezone } from "../utils/timezone";

// const API_URL = "http://localhost:5000/api";

// /**
//  * Auth headers — now includes X-Timezone automatically.
//  * Uses the pure function getTimezone() (safe outside React render).
//  * The backend reads this header to compute "today" in the admin's timezone.
//  */
// const authHeader = () => ({
//   headers: {
//     Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
//     "X-Timezone": getTimezone(),
//   },
// });


// /* ═══════════════════════════════════════════════════════
//    TIME HELPERS (UI only — for 12h display & input)
// ═══════════════════════════════════════════════════════ */

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
// ═══════════════════════════════════════════════════════ */

// const inputClass =
//   "w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors";
// const selectClass =
//   "w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors";
// const labelClass = "block text-sm text-gray-400 mb-1";
// const gridInputClass =
//   "w-full p-2.5 rounded-lg bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors text-sm";


// /* ═══════════════════════════════════════════════════════
//    MAIN COMPONENT
// ═══════════════════════════════════════════════════════ */

// export default function Sessions() {
//   /* ── Timezone Hook ── */
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

//   /* CREATE FORM */
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
//       end_time: "",
//       end_ampm: "AM",
//     },
//   ]);

//   /* EDIT FORM */
//   const [editForm, setEditForm] = useState({
//     session_id: "",
//     class_id: "",
//     title: "",
//     start_time: "",
//     start_ampm: "AM",
//     end_time: "",
//     end_ampm: "AM",
//     notes: "",
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
//         end_time: "",
//         end_ampm: "AM",
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
//         end_time: "",
//         end_ampm: "AM",
//       },
//     ]);
//   };


//   /* ─────────────────────────────────────────────
//      DATA FETCHING
//   ───────────────────────────────────────────── */

//   const fetchClasses = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/classes`, authHeader());
//       setClasses(res.data?.data || res.data || []);
//     } catch (err) {
//       toast.error("Failed to load classes");
//     }
//   };

//   const fetchSessions = async () => {
//     try {
//       setLoading(true);
//       // X-Timezone header tells the backend what "today" means for this admin
//      const res = await axios.get(
//     `${API_URL}/sessions/admin`,
//     authHeader()
// );
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
//           item.trainer_name?.toLowerCase().includes(keyword) ||
//           item.institute_name?.toLowerCase().includes(keyword)
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
//      Sends timezone so the backend stores it alongside
//      the time window. This makes "14:00" unambiguous.
//   ───────────────────────────────────────────── */

//   const createSession = async () => {
//     try {
//       setCreating(true);
//       if (!form.class_id) return toast.error("Select a class");

//       const invalidSlot = slots.find(
//         (s) => !s.title || !s.start_time || !s.end_time
//       );
//       if (invalidSlot)
//         return toast.error(
//           "Please fill title, start time and end time for all templates"
//         );

//       const payloads = slots.map((slot) => ({
//         class_id: form.class_id,
//         title: slot.title,
//         start_time: convertTo24Hour(slot.start_time, slot.start_ampm),
//         end_time: convertTo24Hour(slot.end_time, slot.end_ampm),
//         notes: form.notes,
//         timezone: tz.timezone, // ← "Asia/Kolkata" etc.
//       }));

//       await axios.post(
//         `${API_URL}/sessions/create`,
//         { sessions: payloads },
//         authHeader()
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
//     const end = convertTo12Hour(session.end_time);
//     setEditForm({
//       session_id: session.id,
//       class_id: session.class_id,
//       title: session.title || "",
//       start_time: start.time,
//       start_ampm: start.ampm,
//       end_time: end.time,
//       end_ampm: end.ampm,
//       notes: session.notes || "",
//     });
//     setShowEditModal(true);
//   };

//   const updateSession = async () => {
//     try {
//       setEditing(true);
//       await axios.put(
//         `${API_URL}/sessions/${editForm.session_id}`,
//         {
//           class_id: editForm.class_id,
//           title: editForm.title,
//           start_time: convertTo24Hour(editForm.start_time, editForm.start_ampm),
//           end_time: convertTo24Hour(editForm.end_time, editForm.end_ampm),
//           notes: editForm.notes,
//           timezone: tz.timezone, // ← Update timezone in case admin moved
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
//         `${API_URL}/sessions/${selectedSession.id}`,
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
//         `${API_URL}/sessions/${selectedSession.id}/generate-zoom`,
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

//   const copyZoomLink = async () => {
//     if (!selectedSession?.zoom_link)
//       return toast.error("Zoom link not available");
//     await navigator.clipboard.writeText(selectedSession.zoom_link);
//     toast.success("Zoom link copied");
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
//             Session Templates
//           </h1>
//           <p className="text-gray-400 mt-2">
//             Manage recurring time slots (e.g., Session A, B, C).
//           </p>
//           {/* ── Timezone Indicator ── */}
//           <div className="flex items-center gap-2 mt-3 px-3 py-1.5 rounded-lg bg-[#151519] border border-[#2c2c35] w-fit">
//             <Globe size={13} className="text-purple-400" />
//             <span className="text-xs text-gray-400">
//               Times shown in{" "}
//               <span className="text-purple-300 font-medium">{tz.label}</span>
//             </span>
//           </div>
//         </div>
//         <button
//           onClick={() => setShowCreateModal(true)}
//           className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition-opacity flex items-center gap-2"
//         >
//           <Plus size={18} /> Create Template
//         </button>
//       </div>

//       {/* ── STATS ── */}
//       {/* <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
//         <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-5">
//           <p className="text-gray-400 text-sm">Active Today</p>
//           <h2 className="text-4xl font-bold mt-2">{stats.total}</h2>
//         </div>
//         <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-5">
//           <p className="text-gray-400 text-sm">Scheduled</p>
//           <h2 className="text-4xl font-bold text-blue-400 mt-2">
//             {stats.scheduled}
//           </h2>
//         </div>
//         <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-5">
//           <p className="text-gray-400 text-sm">Live</p>
//           <h2 className="text-4xl font-bold text-green-400 mt-2">
//             {stats.live}
//           </h2>
//         </div>
//         <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-5">
//           <p className="text-gray-400 text-sm">Completed</p>
//           <h2 className="text-4xl font-bold text-cyan-400 mt-2">
//             {stats.completed}
//           </h2>
//         </div>
//       </div> */}
// <div className="grid grid-cols-4 gap-4 mb-6">
//   <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-5">
//     <p className="text-gray-400 text-sm">Active Today</p>
//     <h2 className="text-4xl font-bold mt-2">{stats.total}</h2>
//   </div>

//   <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-5">
//     <p className="text-gray-400 text-sm">Scheduled</p>
//     <h2 className="text-4xl font-bold text-blue-400 mt-2">
//       {stats.scheduled}
//     </h2>
//   </div>

//   <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-5">
//     <p className="text-gray-400 text-sm">Live</p>
//     <h2 className="text-4xl font-bold text-green-400 mt-2">
//       {stats.live}
//     </h2>
//   </div>

//   <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-5">
//     <p className="text-gray-400 text-sm">Completed</p>
//     <h2 className="text-4xl font-bold text-cyan-400 mt-2">
//       {stats.completed}
//     </h2>
//   </div>
// </div>
//       {/* ── FILTERS ── */}
//       <div className="mb-6">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//           <div className="relative w-full">
//             <Search
//               className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
//               size={18}
//             />
//             <input
//               type="text"
//               placeholder="Search templates..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-full pl-12 pr-10 py-3.5 rounded-xl bg-[#151519] border border-[#2c2c35] text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/60 transition-colors text-sm"
//             />
//             {search && (
//               <button
//                 onClick={() => setSearch("")}
//                 className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
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
//               <thead className="bg-[#202027] text-gray-400">
//                 <tr>
//                   <th className="p-4 text-left whitespace-nowrap">ID</th>
//                   <th className="p-4 text-left whitespace-nowrap">
//                     Template Name
//                   </th>
//                   <th className="p-4 text-left whitespace-nowrap">Class</th>
//                   <th className="p-4 text-left whitespace-nowrap">Trainer</th>
//                   <th className="p-4 text-left whitespace-nowrap">
//                     Time Window
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
//                   const end12 = convertTo12Hour(session.end_time);
//                   const currentStatus =
//                     session.live_status || session.status;

//                   return (
//                     <tr
//                       key={session.id}
//                       className="border-t border-[#2c2c35] hover:bg-[#1a1a20] transition-colors"
//                     >
//                       <td className="p-4 text-gray-400 whitespace-nowrap">
//                         #{session.id}
//                       </td>
//                       <td className="p-4 font-medium whitespace-nowrap">
//                         {session.title || "Untitled Template"}
//                       </td>
//                       <td className="p-4 text-gray-400 whitespace-nowrap">
//                         {session.class_title || "-"}
//                       </td>
//                       <td className="p-4 text-gray-400 whitespace-nowrap">
//                         {session.trainer_name || "-"}
//                       </td>

//                       <td className="p-4 text-gray-400 whitespace-nowrap">
//                         <span>
//                           {start12.time} {start12.ampm} - {end12.time}{" "}
//                           {end12.ampm}
//                         </span>
//                         {/* Show session timezone if different from viewer's */}
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
//                             onClick={() => {
//                               setSelectedSession(session);
//                               copyZoomLink();
//                             }}
//                             className="flex items-center gap-1.5 text-purple-300/80 hover:text-purple-300 transition-colors"
//                           >
//                             <Video size={14} /> Copy Link
//                           </button>
//                         ) : (
//                           <button
//                             onClick={() => openZoomModal(session)}
//                             className="flex items-center gap-1.5 text-gray-500 hover:text-gray-400 transition-colors"
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
//                               className="text-gray-400 group-hover:text-white transition-colors"
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
//           <p className="text-gray-400">
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
//                 <p className="text-gray-400 mt-1 text-sm">
//                   Define time slots (e.g., Session A, Session B). Times are
//                   saved as{" "}
//                   <span className="text-purple-300">{tz.label}</span>.
//                 </p>
//               </div>
//               <button
//                 onClick={() => setShowCreateModal(false)}
//                 className="text-gray-400 hover:text-white transition-colors"
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

//                 <div>
//                   <label className={labelClass}>Notes</label>
//                   <textarea
//                     rows={2}
//                     className={inputClass}
//                     placeholder="General notes for these templates"
//                     value={form.notes}
//                     onChange={(e) =>
//                       setForm({ ...form, notes: e.target.value })
//                     }
//                   />
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
//                         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
//                           <div>
//                             <label className="block mb-1.5 text-xs text-gray-400">
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
//                             <label className="block mb-1.5 text-xs text-gray-400">
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

//                           <div>
//                             <label className="block mb-1.5 text-xs text-gray-400">
//                               End Time
//                             </label>
//                             <div className="flex gap-2">
//                               <input
//                                 type="time"
//                                 className={`${gridInputClass} flex-1`}
//                                 value={slot.end_time}
//                                 onChange={(e) =>
//                                   updateSlot(
//                                     slot.id,
//                                     "end_time",
//                                     e.target.value
//                                   )
//                                 }
//                               />
//                               <select
//                                 className="w-20 p-2.5 rounded-lg bg-[#2b2638] text-white border border-transparent focus:outline-none text-sm"
//                                 value={slot.end_ampm}
//                                 onChange={(e) =>
//                                   updateSlot(
//                                     slot.id,
//                                     "end_ampm",
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
//                 <p className="text-gray-400 mt-1 text-sm">
//                   Update session template information.{" "}
//                   <span className="text-purple-300">({tz.abbr})</span>
//                 </p>
//               </div>
//               <button
//                 onClick={() => setShowEditModal(false)}
//                 className="text-gray-400 hover:text-white transition-colors"
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

//                 <div>
//                   <label className={labelClass}>Notes</label>
//                   <textarea
//                     rows={2}
//                     className={inputClass}
//                     value={editForm.notes}
//                     onChange={(e) =>
//                       setEditForm({ ...editForm, notes: e.target.value })
//                     }
//                   />
//                 </div>

//                 <div className="border-t border-[#3a3448] pt-6 mt-4">
//                   <h3 className="text-lg font-bold flex items-center gap-2 mb-4 text-white">
//                     <Clock size={18} className="text-purple-400" /> Time
//                     Slot
//                   </h3>

//                   <div className="bg-[#151519] border border-[#2c2c35] rounded-xl p-4">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
//                       <div>
//                         <label className="block mb-1.5 text-xs text-gray-400">
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
//                       <div>
//                         <label className="block mb-1.5 text-xs text-gray-400">
//                           End Time
//                         </label>
//                         <div className="flex gap-2">
//                           <input
//                             type="time"
//                             className={`${gridInputClass} flex-1`}
//                             value={editForm.end_time}
//                             onChange={(e) =>
//                               setEditForm({
//                                 ...editForm,
//                                 end_time: e.target.value,
//                               })
//                             }
//                           />
//                           <select
//                             className="w-20 p-2.5 rounded-lg bg-[#2b2638] text-white border border-transparent focus:outline-none text-sm"
//                             value={editForm.end_ampm}
//                             onChange={(e) =>
//                               setEditForm({
//                                 ...editForm,
//                                 end_ampm: e.target.value,
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
//               <p className="text-gray-400 text-center text-sm leading-relaxed mb-4">
//                 Are you sure? This will remove this time slot completely.
//               </p>

//               {selectedSession && (
//                 <div className="w-full bg-[#151519] rounded-xl p-4 mb-8 border border-[#2c2c35] text-sm">
//                   <p className="text-gray-500 text-xs">Title</p>
//                   <p className="font-semibold text-white">
//                     {selectedSession.title || "Untitled Template"}
//                   </p>
//                   <div className="mt-2">
//                     <p className="text-gray-500 text-xs">Time Window</p>
//                     <p className="text-gray-300">
//                       {convertTo12Hour(selectedSession.start_time).time}{" "}
//                       {convertTo12Hour(selectedSession.start_time).ampm} -{" "}
//                       {convertTo12Hour(selectedSession.end_time).time}{" "}
//                       {convertTo12Hour(selectedSession.end_time).ampm}
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
//                 <p className="text-gray-400 mt-1 text-sm">
//                   Manage the recurring Zoom link for this template.
//                 </p>
//               </div>
//               <button
//                 onClick={() => setShowZoomModal(false)}
//                 className="text-gray-400 hover:text-white transition-colors"
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
//                   <Video size={60} className="mx-auto text-gray-600" />
//                   <h3 className="text-2xl font-bold mt-6">No Zoom Meeting</h3>
//                   <p className="text-gray-500 mt-2">
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

// import {
//   Plus,
//   Search,
//   Clock,
//   Video,
//   Edit,
//   Trash2,
//   CheckCircle,
//   XCircle,
//   Loader2,
//   Copy,
//   RefreshCcw,
//   BookOpen,
//   X,
//   Globe,
// } from "lucide-react";

// /* ── Timezone Utility ── */
// import { useTimezone, getTimezone } from "../utils/timezone";

// const API_URL = "http://localhost:5000/api";

// /**
//  * Auth headers — now includes X-Timezone automatically.
//  * Uses the pure function getTimezone() (safe outside React render).
//  * The backend reads this header to compute "today" in the admin's timezone.
//  */
// const authHeader = () => ({
//   headers: {
//     Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
//     "X-Timezone": getTimezone(),
//   },
// });


// /* ═══════════════════════════════════════════════════════════════════
//    TIME HELPERS (UI only — for 12h display & input)
// ════════════════════════════════════════════════════════════════════ */

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


// /* ═══════════════════════════════════════════════════════════════════
//    STYLES
// ════════════════════════════════════════════════════════════════════ */

// const inputClass =
//   "w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors";
// const selectClass =
//   "w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors";
// const labelClass = "block text-sm text-gray-400 mb-1";
// const gridInputClass =
//   "w-full p-2.5 rounded-lg bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors text-sm";


// /* ═══════════════════════════════════════════════════════════════════
//    MAIN COMPONENT
// ════════════════════════════════════════════════════════════════════ */

// export default function Sessions() {
//   /* ── Timezone Hook ── */
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

//   /* CREATE FORM */
//   const [form, setForm] = useState({
//     class_id: "",
//     notes: "",
//   });

//   // ✅ FIXED: Removed end_time and end_ampm
//   const [slots, setSlots] = useState([
//     {
//       id: Date.now(),
//       title: "",
//       start_time: "",
//       start_ampm: "AM",
//     },
//   ]);

//   // ✅ FIXED: Removed end_time and end_ampm
//   const [editForm, setEditForm] = useState({
//     session_id: "",
//     class_id: "",
//     title: "",
//     start_time: "",
//     start_ampm: "AM",
//     notes: "",
//   });

//   const [selectedSession, setSelectedSession] = useState(null);


//   /* ─────────────────────────────────────────────
//      SLOT HELPERS
//   ───────────────────────────────────────────── */

//   // ✅ FIXED: Removed end_time and end_ampm
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

//   // ✅ FIXED: Removed end_time and end_ampm
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
//       const res = await axios.get(`${API_URL}/classes`, authHeader());
//       setClasses(res.data?.data || res.data || []);
//     } catch (err) {
//       toast.error("Failed to load classes");
//     }
//   };

//   const fetchSessions = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(
//         `${API_URL}/sessions/admin`,
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
//           item.trainer_name?.toLowerCase().includes(keyword) ||
//           item.institute_name?.toLowerCase().includes(keyword)
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

//       // ✅ FIXED: Removed !s.end_time from validation
//       const invalidSlot = slots.find(
//         (s) => !s.title || !s.start_time
//       );
//       if (invalidSlot)
//         return toast.error(
//           "Please fill title and start time for all templates"
//         );

//       // ✅ FIXED: Removed end_time from payload
//       const payloads = slots.map((slot) => ({
//         class_id: form.class_id,
//         title: slot.title,
//         start_time: convertTo24Hour(slot.start_time, slot.start_ampm),
//         notes: form.notes,
//         timezone: tz.timezone,
//       }));

//       await axios.post(
//         `${API_URL}/sessions/create`,
//         { sessions: payloads },
//         authHeader()
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
//     // ✅ FIXED: Removed end_time and end_ampm
//     setEditForm({
//       session_id: session.id,
//       class_id: session.class_id,
//       title: session.title || "",
//       start_time: start.time,
//       start_ampm: start.ampm,
//       notes: session.notes || "",
//     });
//     setShowEditModal(true);
//   };

//   const updateSession = async () => {
//     try {
//       setEditing(true);
//       // ✅ FIXED: Removed end_time from payload
//       await axios.put(
//         `${API_URL}/sessions/${editForm.session_id}`,
//         {
//           class_id: editForm.class_id,
//           title: editForm.title,
//           start_time: convertTo24Hour(editForm.start_time, editForm.start_ampm),
//           notes: editForm.notes,
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
//         `${API_URL}/sessions/${selectedSession.id}`,
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
//         `${API_URL}/sessions/${selectedSession.id}/generate-zoom`,
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

//   const copyZoomLink = async () => {
//     if (!selectedSession?.zoom_link)
//       return toast.error("Zoom link not available");
//     await navigator.clipboard.writeText(selectedSession.zoom_link);
//     toast.success("Zoom link copied");
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
//             Session Templates
//           </h1>
//           <p className="text-gray-400 mt-2">
//             Manage recurring time slots (e.g., Session A, B, C).
//           </p>
//           {/* ── Timezone Indicator ── */}
//           <div className="flex items-center gap-2 mt-3 px-3 py-1.5 rounded-lg bg-[#151519] border border-[#2c2c35] w-fit">
//             <Globe size={13} className="text-purple-400" />
//             <span className="text-xs text-gray-400">
//               Times shown in{" "}
//               <span className="text-purple-300 font-medium">{tz.label}</span>
//             </span>
//           </div>
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
//           <p className="text-gray-400 text-sm">Active Today</p>
//           <h2 className="text-4xl font-bold mt-2">{stats.total}</h2>
//         </div>

//         <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-5">
//           <p className="text-gray-400 text-sm">Scheduled</p>
//           <h2 className="text-4xl font-bold text-blue-400 mt-2">
//             {stats.scheduled}
//           </h2>
//         </div>

//         <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-5">
//           <p className="text-gray-400 text-sm">Live</p>
//           <h2 className="text-4xl font-bold text-green-400 mt-2">
//             {stats.live}
//           </h2>
//         </div>

//         <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-5">
//           <p className="text-gray-400 text-sm">Completed</p>
//           <h2 className="text-4xl font-bold text-cyan-400 mt-2">
//             {stats.completed}
//           </h2>
//         </div>
//       </div>

//       {/* ── FILTERS ── */}
//       <div className="mb-6">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//           <div className="relative w-full">
//             <Search
//               className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
//               size={18}
//             />
//             <input
//               type="text"
//               placeholder="Search templates..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-full pl-12 pr-10 py-3.5 rounded-xl bg-[#151519] border border-[#2c2c35] text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/60 transition-colors text-sm"
//             />
//             {search && (
//               <button
//                 onClick={() => setSearch("")}
//                 className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
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
//               <thead className="bg-[#202027] text-gray-400">
//                 <tr>
//                   {/* <th className="p-4 text-left whitespace-nowrap">ID</th> */}
//                   {/* <th className="p-4 text-left whitespace-nowrap">
//                     Template Name
//                   </th> */}
//                   <th className="p-4 text-left whitespace-nowrap">Class</th>
//                   <th className="p-4 text-left whitespace-nowrap">Trainer</th>
//                   {/* ✅ FIXED: Changed column header from "Time Window" to "Start Time" */}
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
//                       {/* <td className="p-4 text-gray-400 whitespace-nowrap">
//                         {session.id}
//                       </td> */}
//                       {/* <td className="p-4 font-medium whitespace-nowrap">
//                         {session.title || "Untitled Template"}
//                       </td> */}
//                       <td className="p-4 text-gray-400 whitespace-nowrap">
//                         {session.class_title || "-"}
//                       </td>
//                       <td className="p-4 text-gray-400 whitespace-nowrap">
//                         {session.trainer_name || "-"}
//                       </td>

//                       {/* ✅ FIXED: Show only start time, not "7:00 PM - 8:00 PM" */}
//                       <td className="p-4 text-gray-400 whitespace-nowrap">
//                         <span>
//                           {start12.time} {start12.ampm}
//                         </span>
//                         {/* Show session timezone if different from viewer's */}
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
//                             onClick={() => {
//                               setSelectedSession(session);
//                               copyZoomLink();
//                             }}
//                             className="flex items-center gap-1.5 text-purple-300/80 hover:text-purple-300 transition-colors"
//                           >
//                             <Video size={14} /> Copy Link
//                           </button>
//                         ) : (
//                           <button
//                             onClick={() => openZoomModal(session)}
//                             className="flex items-center gap-1.5 text-gray-500 hover:text-gray-400 transition-colors"
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
//                               className="text-gray-400 group-hover:text-white transition-colors"
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
//           <p className="text-gray-400">
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
//                 <p className="text-gray-400 mt-1 text-sm">
//                   Define time slots (e.g., Session A, Session B). Times are
//                   saved as{" "}
//                   <span className="text-purple-300">{tz.label}</span>.
//                 </p>
//               </div>
//               <button
//                 onClick={() => setShowCreateModal(false)}
//                 className="text-gray-400 hover:text-white transition-colors"
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

//                 <div>
//                   <label className={labelClass}>Notes</label>
//                   <textarea
//                     rows={2}
//                     className={inputClass}
//                     placeholder="General notes for these templates"
//                     value={form.notes}
//                     onChange={(e) =>
//                       setForm({ ...form, notes: e.target.value })
//                     }
//                   />
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
//                         {/* ✅ FIXED: Changed from 4 columns to 3 columns, removed End Time */}
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
//                           <div>
//                             <label className="block mb-1.5 text-xs text-gray-400">
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
//                             <label className="block mb-1.5 text-xs text-gray-400">
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

//                           {/* ✅ REMOVED: Entire End Time block deleted */}

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
//                 <p className="text-gray-400 mt-1 text-sm">
//                   Update session template information.{" "}
//                   <span className="text-purple-300">({tz.abbr})</span>
//                 </p>
//               </div>
//               <button
//                 onClick={() => setShowEditModal(false)}
//                 className="text-gray-400 hover:text-white transition-colors"
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

//                 <div>
//                   <label className={labelClass}>Notes</label>
//                   <textarea
//                     rows={2}
//                     className={inputClass}
//                     value={editForm.notes}
//                     onChange={(e) =>
//                       setEditForm({ ...editForm, notes: e.target.value })
//                     }
//                   />
//                 </div>

//                 <div className="border-t border-[#3a3448] pt-6 mt-4">
//                   <h3 className="text-lg font-bold flex items-center gap-2 mb-4 text-white">
//                     <Clock size={18} className="text-purple-400" /> Time
//                     Slot
//                   </h3>

//                   <div className="bg-[#151519] border border-[#2c2c35] rounded-xl p-4">
//                     {/* ✅ FIXED: Changed from 2 columns to 1 column, removed End Time */}
//                     <div className="grid grid-cols-1 md:grid-cols-1 gap-4 items-end max-w-xs">
//                       <div>
//                         <label className="block mb-1.5 text-xs text-gray-400">
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

//                       {/* ✅ REMOVED: Entire End Time block deleted */}
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
//               <p className="text-gray-400 text-center text-sm leading-relaxed mb-4">
//                 Are you sure? This will remove this time slot completely.
//               </p>

//               {selectedSession && (
//                 <div className="w-full bg-[#151519] rounded-xl p-4 mb-8 border border-[#2c2c35] text-sm">
//                   <p className="text-gray-500 text-xs">Title</p>
//                   <p className="font-semibold text-white">
//                     {selectedSession.title || "Untitled Template"}
//                   </p>
//                   {/* ✅ FIXED: Show only start time, not time window */}
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
//                 <p className="text-gray-400 mt-1 text-sm">
//                   Manage the recurring Zoom link for this template.
//                 </p>
//               </div>
//               <button
//                 onClick={() => setShowZoomModal(false)}
//                 className="text-gray-400 hover:text-white transition-colors"
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
//                   <Video size={60} className="mx-auto text-gray-600" />
//                   <h3 className="text-2xl font-bold mt-6">No Zoom Meeting</h3>
//                   <p className="text-gray-500 mt-2">
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

// import {
//   Plus,
//   Search,
//   Clock,
//   Video,
//   Edit,
//   Trash2,
//   CheckCircle,
//   XCircle,
//   Loader2,
//   Copy,
//   RefreshCcw,
//   BookOpen,
//   X,
//   Globe,
// } from "lucide-react";

// /* ── Timezone Utility ── */
// import { useTimezone, getTimezone } from "../utils/timezone";

// const API_URL = "http://localhost:5000/api";

// const authHeader = () => ({
//   headers: {
//     Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
//     "X-Timezone": getTimezone(),
//   },
// });


// /* ═══════════════════════════════════════════════════════════════════
//    TIME HELPERS (UI only — for 12h display & input)
// ════════════════════════════════════════════════════════════════════ */

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


// /* ═══════════════════════════════════════════════════════════════════
//    STYLES
// ════════════════════════════════════════════════════════════════════ */

// const inputClass =
//   "w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors";
// const selectClass =
//   "w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors";
// const labelClass = "block text-sm text-gray-400 mb-1";
// const gridInputClass =
//   "w-full p-2.5 rounded-lg bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors text-sm";


// /* ═══════════════════════════════════════════════════════════════════
//    MAIN COMPONENT
// ════════════════════════════════════════════════════════════════════ */

// export default function Sessions() {
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
//     notes: "",
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
//       const res = await axios.get(`${API_URL}/classes`, authHeader());
//       setClasses(res.data?.data || res.data || []);
//     } catch (err) {
//       toast.error("Failed to load classes");
//     }
//   };

//   const fetchSessions = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(
//         `${API_URL}/sessions/admin`,
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
//           item.trainer_name?.toLowerCase().includes(keyword) ||
//           item.institute_name?.toLowerCase().includes(keyword)
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

//       const payloads = slots.map((slot) => ({
//         class_id: form.class_id,
//         title: slot.title,
//         start_time: convertTo24Hour(slot.start_time, slot.start_ampm),
//         notes: form.notes,
//         timezone: tz.timezone,
//       }));

//       await axios.post(
//         `${API_URL}/sessions/create`,
//         { sessions: payloads },
//         authHeader()
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
//       notes: session.notes || "",
//     });
//     setShowEditModal(true);
//   };

//   const updateSession = async () => {
//     try {
//       setEditing(true);
//       await axios.put(
//         `${API_URL}/sessions/${editForm.session_id}`,
//         {
//           class_id: editForm.class_id,
//           title: editForm.title,
//           start_time: convertTo24Hour(editForm.start_time, editForm.start_ampm),
//           notes: editForm.notes,
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
//         `${API_URL}/sessions/${selectedSession.id}`,
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
//         `${API_URL}/sessions/${selectedSession.id}/generate-zoom`,
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

//   // ✅ FIXED: Accept link as parameter instead of reading from state
//   const copyZoomLink = async (link) => {
//     if (!link)
//       return toast.error("Zoom link not available");
//     try {
//       await navigator.clipboard.writeText(link);
//       toast.success("Zoom link copied");
//     } catch {
//       // Fallback for older browsers
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
//             Session Templates
//           </h1>
//           <p className="text-gray-400 mt-2">
//             Manage recurring time slots (e.g., Session A, B, C).
//           </p>
//           <div className="flex items-center gap-2 mt-3 px-3 py-1.5 rounded-lg bg-[#151519] border border-[#2c2c35] w-fit">
//             <Globe size={13} className="text-purple-400" />
//             <span className="text-xs text-gray-400">
//               Times shown in{" "}
//               <span className="text-purple-300 font-medium">{tz.label}</span>
//             </span>
//           </div>
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
//           <p className="text-gray-400 text-sm">Active Today</p>
//           <h2 className="text-4xl font-bold mt-2">{stats.total}</h2>
//         </div>
//         <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-5">
//           <p className="text-gray-400 text-sm">Scheduled</p>
//           <h2 className="text-4xl font-bold text-blue-400 mt-2">
//             {stats.scheduled}
//           </h2>
//         </div>
//         <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-5">
//           <p className="text-gray-400 text-sm">Live</p>
//           <h2 className="text-4xl font-bold text-green-400 mt-2">
//             {stats.live}
//           </h2>
//         </div>
//         <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-5">
//           <p className="text-gray-400 text-sm">Completed</p>
//           <h2 className="text-4xl font-bold text-cyan-400 mt-2">
//             {stats.completed}
//           </h2>
//         </div>
//       </div>

//       {/* ── FILTERS ── */}
//       <div className="mb-6">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//           <div className="relative w-full">
//             <Search
//               className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
//               size={18}
//             />
//             <input
//               type="text"
//               placeholder="Search templates..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-full pl-12 pr-10 py-3.5 rounded-xl bg-[#151519] border border-[#2c2c35] text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/60 transition-colors text-sm"
//             />
//             {search && (
//               <button
//                 onClick={() => setSearch("")}
//                 className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
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
//               <thead className="bg-[#202027] text-gray-400">
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
//                       <td className="p-4 text-gray-400 whitespace-nowrap">
//                         {session.class_title || "-"}
//                       </td>
//                       <td className="p-4 text-gray-400 whitespace-nowrap">
//                         {session.trainer_name || "-"}
//                       </td>

//                       <td className="p-4 text-gray-400 whitespace-nowrap">
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
//                           // ✅ FIXED: Pass link directly instead of relying on state
//                           <button
//                             onClick={() => copyZoomLink(session.zoom_link)}
//                             className="flex items-center gap-1.5 text-purple-300/80 hover:text-purple-300 transition-colors"
//                           >
//                             <Video size={14} /> Copy Link
//                           </button>
//                         ) : (
//                           <button
//                             onClick={() => openZoomModal(session)}
//                             className="flex items-center gap-1.5 text-gray-500 hover:text-gray-400 transition-colors"
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
//                               className="text-gray-400 group-hover:text-white transition-colors"
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
//           <p className="text-gray-400">
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
//                 <p className="text-gray-400 mt-1 text-sm">
//                   Define time slots (e.g., Session A, Session B). Times are
//                   saved as{" "}
//                   <span className="text-purple-300">{tz.label}</span>.
//                 </p>
//               </div>
//               <button
//                 onClick={() => setShowCreateModal(false)}
//                 className="text-gray-400 hover:text-white transition-colors"
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

//                 <div>
//                   <label className={labelClass}>Notes</label>
//                   <textarea
//                     rows={2}
//                     className={inputClass}
//                     placeholder="General notes for these templates"
//                     value={form.notes}
//                     onChange={(e) =>
//                       setForm({ ...form, notes: e.target.value })
//                     }
//                   />
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
//                             <label className="block mb-1.5 text-xs text-gray-400">
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
//                             <label className="block mb-1.5 text-xs text-gray-400">
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
//                 <p className="text-gray-400 mt-1 text-sm">
//                   Update session template information.{" "}
//                   <span className="text-purple-300">({tz.abbr})</span>
//                 </p>
//               </div>
//               <button
//                 onClick={() => setShowEditModal(false)}
//                 className="text-gray-400 hover:text-white transition-colors"
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

//                 <div>
//                   <label className={labelClass}>Notes</label>
//                   <textarea
//                     rows={2}
//                     className={inputClass}
//                     value={editForm.notes}
//                     onChange={(e) =>
//                       setEditForm({ ...editForm, notes: e.target.value })
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
//                         <label className="block mb-1.5 text-xs text-gray-400">
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
//               <p className="text-gray-400 text-center text-sm leading-relaxed mb-4">
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
//                 <p className="text-gray-400 mt-1 text-sm">
//                   Manage the recurring Zoom link for this template.
//                 </p>
//               </div>
//               <button
//                 onClick={() => setShowZoomModal(false)}
//                 className="text-gray-400 hover:text-white transition-colors"
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
//                       {/* ✅ FIXED: Pass link directly from selectedSession */}
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
//                   <Video size={60} className="mx-auto text-gray-600" />
//                   <h3 className="text-2xl font-bold mt-6">No Zoom Meeting</h3>
//                   <p className="text-gray-500 mt-2">
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
  Globe,
} from "lucide-react";

/* ── Timezone Utility ── */
import { useTimezone, getTimezone } from "../utils/timezone";

const API_URL = "http://localhost:5000/api";

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    "X-Timezone": getTimezone(),
  },
});


/* ═══════════════════════════════════════════════════════
   TIME HELPERS (UI only — for 12h display & input)
════════════════════════════════════════════════════════ */

const convertTo24Hour = (time, ampm) => {
  if (!time) return "";
  let [hour, minute] = time.split(":").map(Number);
  if (hour > 12) {
    return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
  }
  if (ampm === "PM" && hour !== 12) hour += 12;
  if (ampm === "AM" && hour === 12) hour = 0;
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
};

const convertTo12Hour = (time24) => {
  if (!time24) return { time: "", ampm: "AM" };
  let [hour, minute] = time24.split(":").map(Number);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12;
  if (hour === 0) hour = 12;
  return {
    time: `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`,
    ampm,
  };
};


/* ═══════════════════════════════════════════════════════
   STYLES
════════════════════════════════════════════════════════ */

const inputClass =
  "w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors";
const selectClass =
  "w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors";
const labelClass = "block text-sm text-gray-400 mb-1";
const gridInputClass =
  "w-full p-2.5 rounded-lg bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors text-sm";


/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════════════════════ */

export default function Sessions() {
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
    notes: "",
  });

  const [slots, setSlots] = useState([
    {
      id: Date.now(),
      title: "",
      start_time: "",
      start_ampm: "AM",
    },
  ]);

  const [editForm, setEditForm] = useState({
    session_id: "",
    class_id: "",
    title: "",
    start_time: "",
    start_ampm: "AM",
  });

  const [selectedSession, setSelectedSession] = useState(null);


  /* ─────────────────────────────────────────────
     SLOT HELPERS
  ───────────────────────────────────────────── */

  const addSlot = () => {
    setSlots((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: "",
        start_time: "",
        start_ampm: "AM",
      },
    ]);
  };

  const removeSlot = (slotId) => {
    if (slots.length <= 1) return toast.error("At least one template is required");
    setSlots((prev) => prev.filter((s) => s.id !== slotId));
  };

  const updateSlot = (slotId, field, value) => {
    setSlots((prev) =>
      prev.map((s) => (s.id === slotId ? { ...s, [field]: value } : s))
    );
  };

  const resetCreateForm = () => {
    setForm({ class_id: "", notes: "" });
    setSlots([
      {
        id: Date.now(),
        title: "",
        start_time: "",
        start_ampm: "AM",
      },
    ]);
  };


  /* ─────────────────────────────────────────────
     DATA FETCHING
  ───────────────────────────────────────────── */

  const fetchClasses = async () => {
    try {
      const res = await axios.get(`${API_URL}/classes`, authHeader());
      setClasses(res.data?.data || res.data || []);
    } catch (err) {
      toast.error("Failed to load classes");
    }
  };

  const fetchSessions = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${API_URL}/sessions/admin`,
        authHeader()
      );
      let data = [];
      if (Array.isArray(res.data)) data = res.data;
      else if (Array.isArray(res.data.data)) data = res.data.data;
      else if (Array.isArray(res.data.sessions)) data = res.data.sessions;
      setSessions(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load sessions");
      setSessions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
    fetchSessions();
  }, []);


  /* ─────────────────────────────────────────────
     SEARCH + FILTER + PAGINATION
  ───────────────────────────────────────────── */

  const filteredSessions = useMemo(() => {
    let data = Array.isArray(sessions) ? [...sessions] : [];
    if (statusFilter !== "ALL") {
      data = data.filter(
        (item) => (item.live_status || item.status) === statusFilter
      );
    }
    if (search.trim()) {
      const keyword = search.toLowerCase();
      data = data.filter((item) => {
        return (
          item.title?.toLowerCase().includes(keyword) ||
          item.class_title?.toLowerCase().includes(keyword) ||
          item.trainer_name?.toLowerCase().includes(keyword)
        );
      });
    }
    return data;
  }, [sessions, search, statusFilter]);

  const totalPages = Math.ceil(filteredSessions.length / PAGE_SIZE);
  const paginatedSessions = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredSessions.slice(start, start + PAGE_SIZE);
  }, [filteredSessions, page]);

  useEffect(() => {
    if (page > totalPages && totalPages > 0) setPage(1);
  }, [filteredSessions, page, totalPages]);


  /* ─────────────────────────────────────────────
     DASHBOARD STATS
  ───────────────────────────────────────────── */

  const stats = useMemo(() => {
    const list = Array.isArray(sessions) ? sessions : [];
    const statusKey =
      list[0]?.live_status !== undefined ? "live_status" : "status";
    return {
      total: list.length,
      scheduled: list.filter((s) => s[statusKey] === "SCHEDULED" || s[statusKey] === "UPCOMING").length,
      live: list.filter((s) => s[statusKey] === "LIVE").length,
      completed: list.filter((s) => s[statusKey] === "COMPLETED").length,
    };
  }, [sessions]);


  /* ─────────────────────────────────────────────
     CREATE SESSION TEMPLATES
  ───────────────────────────────────────────── */

  const createSession = async () => {
    try {
      setCreating(true);
      if (!form.class_id) return toast.error("Select a class");

      const invalidSlot = slots.find(
        (s) => !s.title || !s.start_time
      );
      if (invalidSlot)
        return toast.error(
          "Please fill title and start time for all templates"
        );

      const payloads = slots.map((slot) => ({
        class_id: form.class_id,
        title: slot.title,
        start_time: convertTo24Hour(slot.start_time, slot.start_ampm),
        notes: form.notes,
        timezone: tz.timezone,
      }));

      await axios.post(
        `${API_URL}/sessions/create`,
        { sessions: payloads },
        authHeader()
      );

      toast.success(`${payloads.length} session template(s) created`);
      setShowCreateModal(false);
      resetCreateForm();
      fetchSessions();
    } catch (err) {
      toast.error(err.response?.data?.message || "Unable to create sessions");
    } finally {
      setCreating(false);
    }
  };


  /* ─────────────────────────────────────────────
     EDIT SESSION
  ───────────────────────────────────────────── */

  const openEditModal = (session) => {
    setSelectedSession(session);
    const start = convertTo12Hour(session.start_time);
    setEditForm({
      session_id: session.id,
      class_id: session.class_id,
      title: session.title || "",
      start_time: start.time,
      start_ampm: start.ampm,
    });
    setShowEditModal(true);
  };

  const updateSession = async () => {
    try {
      setEditing(true);
      await axios.put(
        `${API_URL}/sessions/${editForm.session_id}`,
        {
          class_id: editForm.class_id,
          title: editForm.title,
          start_time: convertTo24Hour(editForm.start_time, editForm.start_ampm),
          timezone: tz.timezone,
        },
        authHeader()
      );
      toast.success("Session template updated");
      setShowEditModal(false);
      fetchSessions();
    } catch (err) {
      toast.error(err.response?.data?.message || "Unable to update session");
    } finally {
      setEditing(false);
    }
  };


  /* ─────────────────────────────────────────────
     DELETE & ZOOM
  ───────────────────────────────────────────── */

  const openDeleteModal = (session) => {
    setSelectedSession(session);
    setShowDeleteModal(true);
  };

  const deleteSession = async () => {
    try {
      setDeleting(true);
      await axios.delete(
        `${API_URL}/sessions/${selectedSession.id}`,
        authHeader()
      );
      toast.success("Session deleted");
      setShowDeleteModal(false);
      fetchSessions();
    } catch (err) {
      toast.error(err.response?.data?.message || "Unable to delete session");
    } finally {
      setDeleting(false);
    }
  };

  const openZoomModal = (session) => {
    setSelectedSession(session);
    setShowZoomModal(true);
  };

  const generateZoomMeeting = async () => {
    try {
      setGeneratingZoom(true);
      await axios.post(
        `${API_URL}/sessions/${selectedSession.id}/generate-zoom`,
        {},
        authHeader()
      );
      toast.success("Zoom meeting generated");
      fetchSessions();
      setShowZoomModal(false);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Unable to generate Zoom meeting"
      );
    } finally {
      setGeneratingZoom(false);
    }
  };

  const copyZoomLink = async (link) => {
    if (!link)
      return toast.error("Zoom link not available");
    try {
      await navigator.clipboard.writeText(link);
      toast.success("Zoom link copied");
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = link;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      toast.success("Zoom link copied");
    }
  };


  /* ============================================================
      PAGE RENDER
  ============================================================ */

  return (
    <div className="p-8 text-white">
      {/* ── HEADER ── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-4xl font-bold text-purple-400">
            Admin Session Templates
          </h1>
          <p className="text-white mt-2">
            Manage recurring time slots (e.g., Session A, B, C).
          </p>
          
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          <Plus size={18} /> Create Template
        </button>
      </div>

      {/* ── STATS ── */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-5">
          <p className="text-white text-sm">Active Today</p>
          <h2 className="text-4xl font-bold mt-2">{stats.total}</h2>
        </div>
        <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-5">
          <p className="text-white text-sm">Scheduled</p>
          <h2 className="text-4xl font-bold text-white mt-2">
            {stats.scheduled}
          </h2>
        </div>
        <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-5">
          <p className="text-white text-sm">Live</p>
          <h2 className="text-4xl font-bold text-white mt-2">
            {stats.live}
          </h2>
        </div>
        <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-5">
          <p className="text-white text-sm">Completed</p>
          <h2 className="text-4xl font-bold text-white mt-2">
            {stats.completed}
          </h2>
        </div>
      </div>

      {/* ── FILTERS ── */}
      <div className="mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="relative w-full">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white pointer-events-none"
              size={18}
            />
            <input
              type="text"
              placeholder="Search templates..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-10 py-3.5 rounded-xl bg-[#151519] border border-[#2c2c35] text-white placeholder-white focus:outline-none focus:border-purple-500/60 transition-colors text-sm"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
              >
                <X size={14} />
              </button>
            )}
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full py-3.5 px-4 rounded-xl bg-[#151519] border border-[#2c2c35] text-white focus:outline-none focus:border-purple-500/60 transition-colors text-sm"
          >
            <option value="ALL">All Status</option>
            <option value="SCHEDULED">Scheduled</option>
            <option value="UPCOMING">Upcoming</option>
            <option value="LIVE">Live</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>
      </div>

      {/* ── TABLE ── */}
      <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-24 flex flex-col items-center justify-center">
              <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
              <p className="mt-5 text-gray-500">Loading Sessions...</p>
            </div>
          ) : paginatedSessions.length === 0 ? (
            <div className="p-12 text-center">
              <BookOpen size={40} className="text-white mx-auto" />
              <p className="text-white text-lg mt-3">
                {search
                  ? "No templates found"
                  : "No session templates active right now"}
              </p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-[#202027] text-white">
                <tr>
                  <th className="p-4 text-left whitespace-nowrap">Class</th>
                  <th className="p-4 text-left whitespace-nowrap">Trainer</th>
                  <th className="p-4 text-left whitespace-nowrap">
                    Start Time
                  </th>
                  <th className="p-4 text-left whitespace-nowrap">Status</th>
                  <th className="p-4 text-left whitespace-nowrap">Zoom</th>
                  <th className="p-4 text-left whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedSessions.map((session) => {
                  const hasZoom = !!session.zoom_link;
                  const start12 = convertTo12Hour(session.start_time);
                  const currentStatus =
                    session.live_status || session.status;

                  return (
                    <tr
                      key={session.id}
                      className="border-t border-[#2c2c35] hover:bg-[#1a1a20] transition-colors"
                    >
                      <td className="p-4 text-white whitespace-nowrap">
                        {session.class_title || "-"}
                      </td>
                      <td className="p-4 text-white whitespace-nowrap">
                        {session.trainer_name || "-"}
                      </td>

                      <td className="p-4 text-white whitespace-nowrap">
                        <span>
                          {start12.time} {start12.ampm}
                        </span>
                        {session.session_timezone &&
                          session.session_timezone !== tz.timezone && (
                            <span className="ml-1.5 text-[10px] text-purple-400/70 bg-purple-500/10 px-1.5 py-0.5 rounded">
                              {session.session_timezone}
                            </span>
                          )}
                      </td>

                      <td className="p-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                            currentStatus === "LIVE"
                              ? "bg-green-500/20 text-green-400"
                              : currentStatus === "COMPLETED"
                              ? "bg-blue-500/20 text-blue-400"
                              : currentStatus === "UPCOMING"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          {currentStatus === "LIVE" && (
                            <CheckCircle size={12} />
                          )}
                          {currentStatus}
                        </span>
                      </td>

                      <td className="p-4 whitespace-nowrap">
                        {hasZoom ? (
                          <button
                            onClick={() => copyZoomLink(session.zoom_link)}
                            className="flex items-center gap-1.5 text-purple-300/80 hover:text-purple-300 transition-colors"
                          >
                            <Video size={14} /> Copy Link
                          </button>
                        ) : (
                          <button
                            onClick={() => openZoomModal(session)}
                            className="flex items-center gap-1.5 text-gray-500 hover:text-gray-400 transition-colors"
                          >
                            <RefreshCcw size={14} /> Generate
                          </button>
                        )}
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openEditModal(session)}
                            className="p-2 rounded-lg hover:bg-[#2a2a35] transition-colors group"
                            title="Edit"
                          >
                            <Edit
                              size={16}
                              className="text-gray-400 group-hover:text-white transition-colors"
                            />
                          </button>
                          <button
                            onClick={() => openDeleteModal(session)}
                            className="p-2 rounded-lg hover:bg-red-500/10 transition-colors group"
                            title="Delete"
                          >
                            <Trash2
                              size={16}
                              className="text-red-500/70 group-hover:text-red-400 transition-colors"
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* ── PAGINATION ── */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-6 text-sm">
          <p className="text-gray-400">
            Showing {(page - 1) * PAGE_SIZE + 1} to{" "}
            {Math.min(page * PAGE_SIZE, filteredSessions.length)} of{" "}
            {filteredSessions.length} entries
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded-xl bg-[#151519] border border-[#2c2c35] text-gray-300 hover:bg-[#1a1a20] disabled:opacity-50 transition-colors"
            >
              Prev
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-xl bg-[#151519] border border-[#2c2c35] text-gray-300 hover:bg-[#1a1a20] disabled:opacity-50 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}


      {/* ==================== CREATE SESSION MODAL ==================== */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="w-full max-w-[700px] max-h-[90vh] bg-[#211c30] rounded-2xl overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-[#3a3448]">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Create Session Templates
                </h2>
                <p className="text-gray-400 mt-1 text-sm">
                  Define time slots (e.g., Session A, Session B). Times are
                  saved as{" "}
                  <span className="text-purple-300">{tz.label}</span>.
                </p>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="overflow-y-auto max-h-[75vh] p-6">
              <div className="space-y-1">
                <div>
                  <label className={labelClass}>Class</label>
                  <select
                    className={selectClass}
                    value={form.class_id}
                    onChange={(e) =>
                      setForm({ ...form, class_id: e.target.value })
                    }
                  >
                    <option value="">Select Class</option>
                    {classes.map((cls) => (
                      <option key={cls.id} value={cls.id}>
                        {cls.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="border-t border-[#3a3448] pt-6 mt-4">
                  <h3 className="text-lg font-bold flex items-center gap-2 mb-4 text-white">
                    <Clock size={18} className="text-purple-400" />
                    Time Slots
                    <span className="text-xs font-normal text-gray-500 ml-1">
                      ({tz.abbr})
                    </span>
                  </h3>

                  <div className="space-y-3">
                    {slots.map((slot) => (
                      <div
                        key={slot.id}
                        className="bg-[#151519] border border-[#2c2c35] rounded-xl p-4"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                          <div>
                            <label className="block mb-1.5 text-xs text-gray-400">
                              Template Name
                            </label>
                            <input
                              type="text"
                              className={gridInputClass}
                              placeholder="e.g. Session B"
                              value={slot.title}
                              onChange={(e) =>
                                updateSlot(slot.id, "title", e.target.value)
                              }
                            />
                          </div>

                          <div>
                            <label className="block mb-1.5 text-xs text-gray-400">
                              Start Time
                            </label>
                            <div className="flex gap-2">
                              <input
                                type="time"
                                className={`${gridInputClass} flex-1`}
                                value={slot.start_time}
                                onChange={(e) =>
                                  updateSlot(
                                    slot.id,
                                    "start_time",
                                    e.target.value
                                  )
                                }
                              />
                              <select
                                className="w-20 p-2.5 rounded-lg bg-[#2b2638] text-white border border-transparent focus:outline-none text-sm"
                                value={slot.start_ampm}
                                onChange={(e) =>
                                  updateSlot(
                                    slot.id,
                                    "start_ampm",
                                    e.target.value
                                  )
                                }
                              >
                                <option value="AM">AM</option>
                                <option value="PM">PM</option>
                              </select>
                            </div>
                          </div>

                          <div className="flex justify-center items-end h-full">
                            <button
                              onClick={() => removeSlot(slot.id)}
                              className="p-2.5 rounded-lg text-red-500/70 hover:bg-red-500/10 hover:text-red-400 transition-colors"
                              title="Remove slot"
                            >
                              <X size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={addSlot}
                    className="mt-4 w-full py-3 rounded-xl border border-dashed border-[#2c2c35] hover:border-purple-500/50 text-gray-500 hover:text-purple-400 flex items-center justify-center gap-2 transition-colors"
                  >
                    <Plus size={18} /> Add Another Template
                  </button>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-[#3a3448] mt-6">
                <button
                  onClick={createSession}
                  disabled={creating}
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center gap-2"
                >
                  {creating ? (
                    <>
                      <Loader2 size={18} className="animate-spin" /> Creating...
                    </>
                  ) : (
                    <>
                      <Plus size={18} /> Create Templates
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* ==================== EDIT SESSION MODAL ==================== */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="w-full max-w-[700px] max-h-[90vh] bg-[#211c30] rounded-2xl overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-[#3a3448]">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Edit Template
                </h2>
                <p className="text-gray-400 mt-1 text-sm">
                  Update session template information.{" "}
                  <span className="text-purple-300">({tz.abbr})</span>
                </p>
              </div>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="overflow-y-auto max-h-[75vh] p-6">
              <div className="space-y-1">
                <div>
                  <label className={labelClass}>Class</label>
                  <select
                    className={selectClass}
                    value={editForm.class_id}
                    onChange={(e) =>
                      setEditForm({ ...editForm, class_id: e.target.value })
                    }
                  >
                    {classes.map((cls) => (
                      <option key={cls.id} value={cls.id}>
                        {cls.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Template Title</label>
                  <input
                    type="text"
                    className={inputClass}
                    value={editForm.title}
                    onChange={(e) =>
                      setEditForm({ ...editForm, title: e.target.value })
                    }
                  />
                </div>

                <div className="border-t border-[#3a3448] pt-6 mt-4">
                  <h3 className="text-lg font-bold flex items-center gap-2 mb-4 text-white">
                    <Clock size={18} className="text-purple-400" /> Time
                    Slot
                  </h3>

                  <div className="bg-[#151519] border border-[#2c2c35] rounded-xl p-4">
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-4 items-end max-w-xs">
                      <div>
                        <label className="block mb-1.5 text-xs text-gray-400">
                          Start Time
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="time"
                            className={`${gridInputClass} flex-1`}
                            value={editForm.start_time}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                start_time: e.target.value,
                              })
                            }
                          />
                          <select
                            className="w-20 p-2.5 rounded-lg bg-[#2b2638] text-white border border-transparent focus:outline-none text-sm"
                            value={editForm.start_ampm}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                start_ampm: e.target.value,
                              })
                            }
                          >
                            <option value="AM">AM</option>
                            <option value="PM">PM</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-[#3a3448] mt-6">
                <button
                  onClick={updateSession}
                  disabled={editing}
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center gap-2"
                >
                  {editing ? (
                    <>
                      <Loader2 size={18} className="animate-spin" /> Updating...
                    </>
                  ) : (
                    <>
                      <Edit size={18} /> Update Template
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* ==================== DELETE CONFIRMATION MODAL ==================== */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="w-full max-w-[400px] bg-[#1e1b2e] border border-[#2e2a42] rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-8 flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-red-500/15 flex items-center justify-center mb-5">
                <FaTrash className="text-red-400 text-lg" />
              </div>
              <h2 className="text-xl font-bold text-white mb-3 text-center">
                Delete Template
              </h2>
              <p className="text-gray-400 text-center text-sm leading-relaxed mb-4">
                Are you sure? This will remove this time slot completely.
              </p>

              {selectedSession && (
                <div className="w-full bg-[#151519] rounded-xl p-4 mb-8 border border-[#2c2c35] text-sm">
                  <p className="text-gray-500 text-xs">Title</p>
                  <p className="font-semibold text-white">
                    {selectedSession.title || "Untitled Template"}
                  </p>
                  <div className="mt-2">
                    <p className="text-gray-500 text-xs">Start Time</p>
                    <p className="text-gray-300">
                      {convertTo12Hour(selectedSession.start_time).time}{" "}
                      {convertTo12Hour(selectedSession.start_time).ampm}
                    </p>
                  </div>
                </div>
              )}

              <button
                onClick={deleteSession}
                disabled={deleting}
                className="w-full px-5 py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold hover:opacity-90 transition-opacity text-sm disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {deleting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 size={16} /> Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}


      {/* ==================== ZOOM MEETING MODAL ==================== */}
      {showZoomModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="w-full max-w-[600px] max-h-[90vh] bg-[#211c30] rounded-2xl overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-[#3a3448]">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Video className="text-purple-400" size={22} /> Zoom Meeting
                </h2>
                <p className="text-gray-400 mt-1 text-sm">
                  Manage the recurring Zoom link for this template.
                </p>
              </div>
              <button
                onClick={() => setShowZoomModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="overflow-y-auto max-h-[75vh] p-6">
              {selectedSession?.zoom_link ? (
                <div className="space-y-1">
                  <div>
                    <label className={labelClass}>Meeting ID</label>
                    <div className="w-full p-3 rounded-xl bg-[#2b2638] text-white border border-transparent">
                      {selectedSession.zoom_meeting_id || "-"}
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Password</label>
                    <div className="w-full p-3 rounded-xl bg-[#2b2638] text-white border border-transparent">
                      {selectedSession.zoom_password || "-"}
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Join URL</label>
                    <div className="flex gap-3 mt-2">
                      <input
                        readOnly
                        value={selectedSession.zoom_link}
                        className="w-full p-3 rounded-xl bg-[#2b2638] text-white border border-transparent"
                      />
                      <button
                        onClick={() => copyZoomLink(selectedSession?.zoom_link)}
                        className="px-5 py-3 rounded-xl bg-[#151519] border border-[#2c2c35] hover:bg-[#1a1a20] transition-colors"
                      >
                        <Copy size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-14">
                  <Video size={60} className="mx-auto text-gray-600" />
                  <h3 className="text-2xl font-bold mt-6">No Zoom Meeting</h3>
                  <p className="text-gray-500 mt-2">
                    Generate a recurring Zoom link for this time slot.
                  </p>
                </div>
              )}

              <div className="flex justify-end pt-4 border-t border-[#3a3448] mt-6">
                <button
                  onClick={generateZoomMeeting}
                  disabled={generatingZoom}
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center gap-2"
                >
                  {generatingZoom ? (
                    <>
                      <Loader2 size={18} className="animate-spin" /> Generating...
                    </>
                  ) : (
                    <>
                      <RefreshCcw size={18} />{" "}
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