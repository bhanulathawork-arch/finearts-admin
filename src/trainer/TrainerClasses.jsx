// // import { useEffect, useState } from "react";
// // import toast from "react-hot-toast";
// // import {
// //   HiPlus,
// //   HiPencil,
// //   HiTrash,
// //   HiCalendar,
// // } from "react-icons/hi";

// // import DataTable from "../components/ui/DataTable";
// // import Modal from "../components/ui/Modal";
// // import Button from "../components/ui/Button";
// // import Badge from "../components/ui/Badge";
// // import FormInput from "../components/ui/FormInput";
// // import { getAuth, onAuthStateChanged } from "firebase/auth";

// // import API from "../services/api";

// // export default function TrainerClasses() {

// //   /* ================= CLASS STATES ================= */
// //   const [classes, setClasses] = useState([]);
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [editingClass, setEditingClass] = useState(null);
// //   const [deleteClass, setDeleteClass] = useState(null);
// //   const [openDelete, setOpenDelete] = useState(false);

// //   /* ================= SESSION STATES ================= */
// //   const [sessions, setSessions] = useState([]);
// //   const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);
// //   const [showEditSessionModal, setShowEditSessionModal] = useState(false);
// //   const [showDeleteSessionModal, setShowDeleteSessionModal] = useState(false);
// //   const [selectedSession, setSelectedSession] = useState(null);
// //   const [searchSessions, setSearchSessions] = useState("");

// //   /* ================= DROPDOWNS ================= */
// //   const [categories, setCategories] = useState([]);
// //   const [subcategories, setSubcategories] = useState([]);

// //   /* ================= FORM DATA ================= */
// //   const defaultForm = {
// //     title: "",
// //     description: "",
// //     highlights: "",
// //     image: null,
// //     category_id: "",
// //     subcategory_id: "",
// //     price: "",
// //     duration: "",
// //     level: "BEGINNER",
// //     mode: "ONLINE",
// //     max_students: "",
// //     students_count: "",
// //     meeting_link: "",
// //   };

// //   const defaultSession = {
// //     class_id: "",
// //     title: "",
// //     session_date: "",
// //     start_time: "",
// //     end_time: "",
// //     zoom_link: "",
// //   };

// //   const [formData, setFormData] = useState(defaultForm);
// //   const [sessionData, setSessionData] = useState(defaultSession);

// //   /* ================= CONFIG ================= */
// //   const getConfig = async () => {
// //     const auth = getAuth();
// //     let token = null;

// //     if (auth.currentUser) {
// //       token = await auth.currentUser.getIdToken(true);
// //     } else {
// //       token = localStorage.getItem("token");
// //     }

// //     return {
// //       headers: {
// //         Authorization: `Bearer ${token}`,
// //       },
// //     };
// //   };

// //   /* ================= FETCH FUNCTIONS ================= */
// //   const fetchClasses = async () => {
// //     try {
// //       const config = await getConfig();
// //       const res = await API.get("/classes/trainer/my-classes", config);
// //       setClasses(res?.data?.data || []);
// //     } catch (err) {
// //       console.error(err);
// //       toast.error("Failed to fetch classes");
// //     }
// //   };

// //   const fetchSessions = async () => {
// //   try {
// //     const config = await getConfig();

// //     const res = await API.get(
// //       "/sessions/trainer/upcoming",
// //       config
// //     );

// //     console.log("SESSION API:", res.data);

// //     const data =
// //       res.data?.data ??
// //       res.data?.sessions ??
// //       res.data ??
// //       [];

// //     setSessions(Array.isArray(data) ? data : []);
// //   } catch (err) {
// //     console.error(err);
// //     setSessions([]);
// //   }
// // };

// //   const fetchDropdowns = async () => {
// //     try {
// //       const config = await getConfig();
// //       const [categoryRes, subcategoryRes] = await Promise.all([
// //         API.get("/categories", config),
// //         API.get("/subcategories", config),
// //       ]);

// //       setCategories(categoryRes.data.data || []);
// //       setSubcategories(subcategoryRes.data.data || []);
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };

// //   /* ================= USEEFFECT ================= */
// //   useEffect(() => {
// //     const auth = getAuth();
// //     const unsubscribe = onAuthStateChanged(auth, (user) => {
// //       if (user) {
// //         fetchClasses();
// //         fetchSessions();
// //         fetchDropdowns();
// //       } else {
// //         console.log("User is not authenticated");
// //       }
// //     });

// //     return () => unsubscribe();
// //   }, []);

// //   /* ================= CLASS HANDLERS ================= */
// //   const handleDelete = (cls) => {
// //     setDeleteClass(cls);
// //     setOpenDelete(true);
// //   };

// //   const confirmDelete = async () => {
// //     try {
// //       const config = await getConfig();
// //       await API.delete(`/classes/trainer/${deleteClass.id}`, config);
// //       toast.success("Class deleted successfully");
// //       fetchClasses();
// //     } catch (err) {
// //       toast.error(err?.response?.data?.message || "Delete failed");
// //     } finally {
// //       setOpenDelete(false);
// //       setDeleteClass(null);
// //     }
// //   };

// //   const handleEdit = (cls) => {
// //     setEditingClass(cls);
// //     setFormData({
// //       title: cls.title || "",
// //       description: cls.description || "",
// //       highlights: cls.highlights || "",
// //       category_id: cls.category_id || "",
// //       subcategory_id: cls.subcategory_id || "",
// //       price: cls.price || "",
// //       duration: cls.duration || "",
// //       level: cls.level || "BEGINNER",
// //       mode: cls.mode || "ONLINE",
// //       max_students: cls.max_students || "",
// //       students_count: cls.students_count || "",
// //       meeting_link: cls.meeting_link || "",
// //       image: null,
// //     });
// //     setIsModalOpen(true);
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     if (!formData.title?.trim()) {
// //       toast.error("Class Name is required");
// //       return;
// //     }
// //     if (!formData.category_id) {
// //       toast.error("Please select a Category");
// //       return;
// //     }

// //     const payload = new FormData();
// //     payload.append("title", formData.title.trim());
// //     payload.append("description", formData.description?.trim() || "");
// //     payload.append("highlights", formData.highlights || "");
// //     payload.append("category_id", formData.category_id);

// //     if (formData.subcategory_id) {
// //       payload.append("subcategory_id", formData.subcategory_id);
// //     }

// //     payload.append("students_count", formData.students_count || 0);
// //     payload.append("price", formData.price || 0);
// //     payload.append("duration", formData.duration || 60);
// //     payload.append("level", formData.level || "BEGINNER");
// //     payload.append("mode", formData.mode || "ONLINE");

// //     if (formData.max_students) {
// //       payload.append("max_students", formData.max_students);
// //     }
// //     if (formData.meeting_link) {
// //       payload.append("meeting_link", formData.meeting_link);
// //     }
// //     if (formData.image) {
// //       payload.append("image", formData.image);
// //     }

// //     try {
// //       const config = await getConfig();

// //       if (editingClass?.id) {
// //         await API.put(
// //           `/classes/trainer/${editingClass.id}`,
// //           payload,
// //           {
// //             headers: {
// //               ...config.headers,
// //               "Content-Type": "multipart/form-data",
// //             },
// //           }
// //         );
// //         toast.success("Class updated successfully");
// //       } else {
// //         await API.post(
// //           "/classes/trainer/create",
// //           payload,
// //           {
// //             headers: {
// //               ...config.headers,
// //               "Content-Type": "multipart/form-data",
// //             },
// //           }
// //         );
// //         toast.success("Class created successfully");
// //       }

// //       fetchClasses();
// //       closeModal();
// //     } catch (err) {
// //       console.log("Backend Error:", err.response?.data);
// //       toast.error(
// //         err?.response?.data?.message || "Something went wrong"
// //       );
// //     }
// //   };

// //   const closeModal = () => {
// //     setIsModalOpen(false);
// //     setEditingClass(null);
// //     setFormData(defaultForm);
// //   };

// //   /* ================= SESSION HANDLERS ================= */
// //   const handleSessionSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!sessionData.class_id) {
// //       toast.error("Please select a Class");
// //       return;
// //     }
// //     try {
// //       const config = await getConfig();

// //       await API.post(
// //         "/sessions/trainer/create",
// //         sessionData,
// //         config
// //       );

// //       toast.success("Session created");
// //       fetchSessions();
// //       setIsSessionModalOpen(false);
// //       setSessionData(defaultSession);
// //     } catch (err) {
// //       console.error(err);
// //       toast.error(
// //         err?.response?.data?.message || "Failed to create session"
// //       );
// //     }
// //   };

// //   const handleEditSession = (session) => {
// //     setSelectedSession(session);
// //     setSessionData({
// //       class_id: session.class_id || "",
// //       title: session.title || "",
// //       session_date: session.session_date ? session.session_date.split("T")[0] : "",
// //       start_time: session.start_time || "",
// //       end_time: session.end_time || "",
// //       zoom_link: session.zoom_link || "",
// //     });
// //     setShowEditSessionModal(true);
// //   };

// //   const handleUpdateSession = async (e) => {
// //     e.preventDefault();
// //     try {
// //       if (!selectedSession?.session_id) {
// //         toast.error("Session not selected");
// //         return;
// //       }

// //       const config = await getConfig();

// //       await API.put(
// //         `/sessions/${selectedSession.session_id}`,
// //         sessionData,
// //         config
// //       );

// //       fetchSessions();
// //       toast.success("Session updated successfully");
// //       setShowEditSessionModal(false);
// //       setSelectedSession(null);
// //       setSessionData(defaultSession);
// //     } catch (err) {
// //       console.error("UPDATE SESSION ERROR:", err);
// //       toast.error(
// //         err?.response?.data?.message || "Failed to update session"
// //       );
// //     }
// //   };

// //   const handleDeleteSessionClick = (session) => {
// //     setSelectedSession(session);
// //     setShowDeleteSessionModal(true);
// //   };

// //   const confirmDeleteSession = async () => {
// //     try {
// //       const config = await getConfig();

// //       await API.patch(
// //         `/sessions/${selectedSession.session_id}/cancel`,
// //         {},
// //         config
// //       );

// //       toast.success("Session cancelled successfully");
// //       setSessions((prev) =>
// //         prev.filter((s) => String(s.id) !== String(selectedSession.id))
// //       );
// //       setShowDeleteSessionModal(false);
// //       setSelectedSession(null);
// //     } catch (error) {
// //       console.error(error);
// //       toast.error(
// //         error?.response?.data?.message || "Failed to cancel session"
// //       );
// //     }
// //   };

// //   /* ================= COLUMNS ================= */
// //   const columns = [
// //     { key: "id", label: "ID" },
// //     {
// //       key: "image",
// //       label: "Image",
// //       render: (v) =>
// //         v ? (
// //           <img
// //             src={v.startsWith("http") ? v : `/${v}`}
// //             alt="Class Thumbnail"
// //             className="h-10 w-10 rounded-md object-cover border border-gray-600"
// //           />
// //         ) : (
// //           <span className="text-gray-500 text-xs">No Img</span>
// //         ),
// //     },
// //     {
// //       key: "title",
// //       label: "Class Name",
// //       render: (v) => <span className="font-semibold">{v || "-"}</span>,
// //     },
// //     {
// //       key: "trainer_name",
// //       label: "Trainer",
// //       render: (v) => v || "N/A",
// //     },
// //     {
// //       key: "category_name",
// //       label: "Category",
// //       render: (v) => v || "N/A",
// //     },
// //     {
// //       key: "subcategory_name",
// //       label: "Subcategory",
// //       render: (v) => v || "N/A",
// //     },
// //     {
// //       key: "level",
// //       label: "Level",
// //       render: (v) => <Badge variant="purple">{v || "-"}</Badge>,
// //     },
// //     {
// //       key: "price",
// //       label: "Price",
// //       render: (v) => (
// //         <span className="text-green-400 font-semibold">₹{v ?? 0}</span>
// //       ),
// //     },
// //     {
// //       key: "students_count",
// //       label: "Student Count",
// //       render: (v) => <span className="font-semibold">{v ?? 0}</span>,
// //     },
// //     {
// //       key: "created_at",
// //       label: "Created At",
// //       render: (v) => (v ? new Date(v).toLocaleString() : "-"),
// //     },
// //   ];

// // const filteredSessions = (
// //   Array.isArray(sessions) ? sessions : []
// // ).filter(
// //     (s) =>
// //       s.title?.toLowerCase().includes(searchSessions.toLowerCase()) ||
// //       s.class_title?.toLowerCase().includes(searchSessions.toLowerCase())
// //   );

// //   /* ================= JSX ================= */
// //   return (
// //     <div className="space-y-8 animate-slide-up pb-10">
// //       {/* HEADER */}
// //       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
// //         <div>
// //           <h1 className="text-3xl font-bold gradient-text">My Classes</h1>
// //           <p className="text-white mt-1">
// //             Manage classes and schedule sessions
// //           </p>
// //         </div>

// //         <div className="flex gap-3">
// //           <Button
// //             icon={HiCalendar}
// //             onClick={() => setIsSessionModalOpen(true)}
// //           >
// //             Add Session
// //           </Button>
// //           <Button
// //             icon={HiPlus}
// //             onClick={() => setIsModalOpen(true)}
// //           >
// //             Add Class
// //           </Button>
// //         </div>
// //       </div>

// //       {/* CLASSES TABLE */}
// //       <div>
// //         <h2 className="text-xl font-semibold text-white mb-4">All Classes</h2>
// //         <DataTable
// //           columns={columns}
// //           data={classes}
// //           actions={(row) => (
// //             <>
// //               <Button
// //                 variant="ghost"
// //                 size="sm"
// //                 icon={HiPencil}
// //                 onClick={() => handleEdit(row)}
// //               />
// //               <Button
// //                 variant="ghost"
// //                 size="sm"
// //                 icon={HiTrash}
// //                 className="text-red-400"
// //                 onClick={() => handleDelete(row)}
// //               />
// //             </>
// //           )}
// //         />
// //       </div>

// //       {/* SESSIONS TABLE */}
// //       <div className="space-y-4">
// //         <div className="flex items-center justify-between">
// //           <h2 className="text-xl font-semibold text-white">
// //             Upcoming Sessions
// //           </h2>
// //         </div>

// //         <div className="mb-2">
// //           <input
// //             type="text"
// //             placeholder="Search Sessions by title or class name..."
// //             value={searchSessions}
// //             onChange={(e) => setSearchSessions(e.target.value)}
// //             className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white focus:outline-none focus:border-purple-500"
// //           />
// //         </div>

// //         <div className="glass-effect rounded-2xl overflow-hidden border border-white/10">
// //           <div className="overflow-x-auto">
// //             <table className="w-full">
// //               <thead>
// //                 <tr className="bg-white/5 border-b border-white/10 text-left text-white text-sm uppercase">
// //                   <th className="px-6 py-4">Class</th>
// //                   <th className="px-6 py-4">Title</th>
// //                   <th className="px-6 py-4">Date</th>
// //                   <th className="px-6 py-4">Start Time</th>
// //                   <th className="px-6 py-4">End Time</th>
// //                   <th className="px-6 py-4">Zoom Link</th>
// //                   <th className="px-6 py-4 text-right">Actions</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {filteredSessions.length > 0 ? (
// //                   filteredSessions.map((session) => (
// //                     <tr
// //                       key={session.id}
// //                       className="border-b border-white/5 hover:bg-white/5 transition-colors"
// //                     >
// //                       <td className="px-6 py-4 font-medium">
// //                         {session.class_title || "N/A"}
// //                       </td>
// //                       <td className="px-6 py-4 text-gray-300">
// //                         {session.title}
// //                       </td>
// //                       <td className="px-6 py-4 text-gray-300">
// //                         {session.session_date}
// //                       </td>
// //                       <td className="px-6 py-4 text-gray-300">
// //                         {session.start_time || "-"}
// //                       </td>
// //                       <td className="px-6 py-4 text-gray-300">
// //                         {session.end_time || "-"}
// //                       </td>
// //                       <td className="px-6 py-4">
// //                         {session.zoom_link ? (
// //                           <a
// //                             href={session.zoom_link}
// //                             target="_blank"
// //                             rel="noreferrer"
// //                             className="text-purple-400 hover:underline"
// //                           >
// //                             Join
// //                           </a>
// //                         ) : (
// //                           <span className="text-gray-500">-</span>
// //                         )}
// //                       </td>
// //                       <td className="px-6 py-4 text-right">
// //                         <div className="flex justify-end gap-2">
// //                           <button
// //                             onClick={() => handleEditSession(session)}
// //                             className="p-2 text-white hover:text-white transition"
// //                           >
// //                             <HiPencil size={18} />
// //                           </button>
// //                           <button
// //                             onClick={() => handleDeleteSessionClick(session)}
// //                             className="p-2 text-red-500 hover:text-red-400 transition"
// //                           >
// //                             <HiTrash size={18} />
// //                           </button>
// //                         </div>
// //                       </td>
// //                     </tr>
// //                   ))
// //                 ) : (
// //                   <tr>
// //                     <td
// //                       colSpan="7"
// //                       className="px-6 py-8 text-center text-gray-500"
// //                     >
// //                       {searchSessions
// //                         ? "No sessions found matching your search."
// //                         : "No sessions found."}
// //                     </td>
// //                   </tr>
// //                 )}
// //               </tbody>
// //             </table>
// //           </div>
// //         </div>
// //       </div>

// //       {/* DELETE CLASS MODAL */}
// //       <Modal
// //         isOpen={openDelete}
// //         onClose={() => setOpenDelete(false)}
// //         title="Confirm Delete"
// //       >
// //         <p>Are you sure you want to delete this class?</p>
// //         <div className="flex justify-end gap-3 mt-6">
// //           <Button variant="secondary" onClick={() => setOpenDelete(false)}>
// //             Cancel
// //           </Button>
// //           <Button className="bg-red-500" onClick={confirmDelete}>
// //             Delete
// //           </Button>
// //         </div>
// //       </Modal>

// //       {/* ADD/EDIT CLASS MODAL */}
// //       <Modal
// //         isOpen={isModalOpen}
// //         onClose={closeModal}
// //         title={editingClass ? "Edit Class" : "Add Class"}
// //       >
// //         <form
// //           onSubmit={handleSubmit}
// //           className="space-y-4 max-h-[70vh] overflow-y-auto pr-2"
// //         >
// //           <FormInput
// //             label="Class Name *"
// //             required
// //             value={formData.title}
// //             onChange={(e) =>
// //               setFormData({ ...formData, title: e.target.value })
// //             }
// //           />

// //           <div>
// //             <label className="block text-sm font-medium mb-2 text-gray-300">
// //               Description
// //             </label>
// //             <textarea
// //               value={formData.description}
// //               onChange={(e) =>
// //                 setFormData({ ...formData, description: e.target.value })
// //               }
// //               rows="3"
// //               className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
// //             />
// //           </div>

// //           <div>
// //             <label className="block text-sm font-medium mb-2 text-gray-300">
// //               What You'll Learn
// //             </label>
// //             <textarea
// //               rows="5"
// //               value={formData.highlights}
// //               onChange={(e) =>
// //                 setFormData({ ...formData, highlights: e.target.value })
// //               }
// //               placeholder={`Breathing techniques
// // Pitch control
// // Song practice
// // Range expansion`}
// //               className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
// //             />
// //           </div>

// //           <div>
// //             <label className="block text-sm font-medium mb-2 text-gray-300">
// //               Class Image
// //             </label>
// //             {editingClass?.image && (
// //               <img
// //                 src={
// //                   editingClass.image.startsWith("http")
// //                     ? editingClass.image
// //                     : `/${editingClass.image}`
// //                 }
// //                 alt="Current"
// //                 className="h-20 w-20 object-cover rounded mb-2 border border-gray-600"
// //               />
// //             )}
// //             <input
// //               type="file"
// //               accept="image/*"
// //               onChange={(e) =>
// //                 setFormData({ ...formData, image: e.target.files[0] })
// //               }
// //               className="w-full text-gray-300 file:mr-4 file:py-1 file:px-2 file:rounded file:border-0 file:bg-purple-600 file:text-white"
// //             />
// //           </div>

// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //             <div>
// //               <label className="block text-sm font-medium mb-2 text-gray-300">
// //                 Category *
// //               </label>
// //               <select
// //                 value={formData.category_id}
// //                 onChange={(e) =>
// //                   setFormData({
// //                     ...formData,
// //                     category_id: e.target.value,
// //                     subcategory_id: "",
// //                   })
// //                 }
// //                 className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
// //                 required
// //               >
// //                 <option value="">Select Category</option>
// //                 {categories?.map((cat) => (
// //                   <option key={cat.id} value={cat.id}>
// //                     {cat.name}
// //                   </option>
// //                 ))}
// //               </select>
// //             </div>
// //             <div>
// //               <label className="block text-sm font-medium mb-2 text-gray-300">
// //                 Subcategory
// //               </label>
// //               <select
// //                 value={formData.subcategory_id}
// //                 onChange={(e) =>
// //                   setFormData({ ...formData, subcategory_id: e.target.value })
// //                 }
// //                 disabled={!formData.category_id}
// //                 className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 disabled:opacity-50 text-white"
// //               >
// //                 <option value="">Select Subcategory</option>
// //                 {subcategories
// //                   ?.filter(
// //                     (s) =>
// //                       String(s.category_id) ===
// //                       String(formData.category_id)
// //                   )
// //                   .map((sub) => (
// //                     <option key={sub.id} value={sub.id}>
// //                       {sub.name}
// //                     </option>
// //                   ))}
// //               </select>
// //             </div>
// //           </div>

// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //             <FormInput
// //               label="Price"
// //               type="number"
// //               value={formData.price}
// //               onChange={(e) =>
// //                 setFormData({ ...formData, price: e.target.value })
// //               }
// //             />
// //             <FormInput
// //               label="Duration (Minutes)"
// //               type="number"
// //               value={formData.duration}
// //               onChange={(e) =>
// //                 setFormData({ ...formData, duration: e.target.value })
// //               }
// //             />
// //             <FormInput
// //               label="Students Count"
// //               type="number"
// //               value={formData.students_count}
// //               onChange={(e) =>
// //                 setFormData({ ...formData, students_count: e.target.value })
// //               }
// //             />
// //           </div>

// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //             <div>
// //               <label className="block text-sm font-medium mb-2 text-gray-300">
// //                 Level
// //               </label>
// //               <select
// //                 value={formData.level}
// //                 onChange={(e) =>
// //                   setFormData({ ...formData, level: e.target.value })
// //                 }
// //                 className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
// //               >
// //                 <option value="BEGINNER">Beginner</option>
// //                 <option value="INTERMEDIATE">Intermediate</option>
// //                 <option value="ADVANCED">Advanced</option>
// //               </select>
// //             </div>
// //             <div>
// //               <label className="block text-sm font-medium mb-2 text-gray-300">
// //                 Mode
// //               </label>
// //               <select
// //                 value={formData.mode}
// //                 onChange={(e) =>
// //                   setFormData({ ...formData, mode: e.target.value })
// //                 }
// //                 className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
// //               >
// //                 <option value="ONLINE">Online</option>
// //                 <option value="OFFLINE">Offline</option>
// //                 <option value="HYBRID">Hybrid</option>
// //               </select>
// //             </div>
// //           </div>

// //           <div className="flex justify-end gap-3 pt-4">
// //             <Button type="button" variant="secondary" onClick={closeModal}>
// //               Cancel
// //             </Button>
// //             <Button type="submit">
// //               {editingClass ? "Update Class" : "Add Class"}
// //             </Button>
// //           </div>
// //         </form>
// //       </Modal>

// //       {/* ADD SESSION MODAL */}
// //       <Modal
// //         isOpen={isSessionModalOpen}
// //         onClose={() => {
// //           setIsSessionModalOpen(false);
// //           setSessionData(defaultSession);
// //         }}
// //         title="Add Session"
// //       >
// //         <form onSubmit={handleSessionSubmit} className="space-y-4">
// //           <div>
// //             <label className="block text-sm font-medium mb-2 text-gray-300">
// //               Select Class *
// //             </label>
// //             <select
// //               value={sessionData.class_id}
// //               onChange={(e) => {
// //                 const selectedClass = classes.find(
// //                   (c) => String(c.id) === e.target.value
// //                 );

// //                 let defaultStart = selectedClass?.start_time || "";
// //                 let defaultEnd = selectedClass?.end_time || "";

// //                 if (!defaultStart && selectedClass?.duration) {
// //                   defaultStart = "10:00";
// //                   const [hours, minutes] = defaultStart.split(":").map(Number);
// //                   const totalMinutes = hours * 60 + minutes + Number(selectedClass.duration);
// //                   const endHours = Math.floor(totalMinutes / 60) % 24;
// //                   const endMinutes = totalMinutes % 60;
// //                   defaultEnd = `${String(endHours).padStart(2, "0")}:${String(endMinutes).padStart(2, "0")}`;
// //                 }

// //                 setSessionData({
// //                   ...sessionData,
// //                   class_id: e.target.value,
// //                   title: selectedClass?.title || "",
// //                   start_time: defaultStart,
// //                   end_time: defaultEnd,
// //                 });
// //               }}
// //               className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
// //               required
// //             >
// //               <option value="">Select Class</option>
// //               {classes.map((cls) => (
// //                 <option key={cls.id} value={cls.id}>
// //                   {cls.title}
// //                   {cls.start_time && cls.end_time
// //                     ? ` (${cls.start_time} - ${cls.end_time})`
// //                     : cls.duration
// //                     ? ` (${cls.duration} min)`
// //                     : ""}
// //                 </option>
// //               ))}
// //             </select>
// //           </div>

// //           <FormInput
// //             label="Session Title"
// //             value={sessionData.title}
// //             onChange={(e) =>
// //               setSessionData({ ...sessionData, title: e.target.value })
// //             }
// //           />
// //           <FormInput
// //             type="date"
// //             label="Date"
// //             value={sessionData.session_date}
// //             onChange={(e) =>
// //               setSessionData({ ...sessionData, session_date: e.target.value })
// //             }
// //           />

// //           <div className="grid grid-cols-2 gap-4">
// //             <FormInput
// //               type="time"
// //               label="Start Time"
// //               value={sessionData.start_time}
// //               onChange={(e) =>
// //                 setSessionData({ ...sessionData, start_time: e.target.value })
// //               }
// //             />
// //             <FormInput
// //               type="time"
// //               label="End Time"
// //               value={sessionData.end_time}
// //               onChange={(e) =>
// //                 setSessionData({ ...sessionData, end_time: e.target.value })
// //               }
// //             />
// //           </div>

// //           <FormInput
// //             label="Zoom Link"
// //             value={sessionData.zoom_link}
// //             onChange={(e) =>
// //               setSessionData({ ...sessionData, zoom_link: e.target.value })
// //             }
// //           />

// //           <div className="flex justify-end gap-3 pt-4">
// //             <Button
// //               type="button"
// //               variant="secondary"
// //               onClick={() => {
// //                 setIsSessionModalOpen(false);
// //                 setSessionData(defaultSession);
// //               }}
// //             >
// //               Cancel
// //             </Button>
// //             <Button type="submit">Create Session</Button>
// //           </div>
// //         </form>
// //       </Modal>

// //       {/* EDIT SESSION MODAL */}
// //       <Modal
// //         isOpen={showEditSessionModal}
// //         onClose={() => {
// //           setShowEditSessionModal(false);
// //           setSelectedSession(null);
// //           setSessionData(defaultSession);
// //         }}
// //         title="Edit Session"
// //       >
// //         <form onSubmit={handleUpdateSession} className="space-y-4">
// //           <div>
// //             <label className="block text-sm font-medium mb-2 text-gray-300">
// //               Class
// //             </label>
// //             <input
// //               type="text"
// //               value={
// //                 classes.find(
// //                   (cls) => String(cls.id) === String(sessionData.class_id)
// //                 )?.title || ""
// //               }
// //               readOnly
// //               className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white cursor-not-allowed"
// //             />
// //           </div>

// //           <FormInput
// //             label="Title"
// //             value={sessionData.title}
// //             onChange={(e) =>
// //               setSessionData({ ...sessionData, title: e.target.value })
// //             }
// //           />

// //           <FormInput
// //             type="date"
// //             label="Date"
// //             value={sessionData.session_date}
// //             onChange={(e) =>
// //               setSessionData({ ...sessionData, session_date: e.target.value })
// //             }
// //           />

// //           <div className="grid grid-cols-2 gap-4">
// //             <FormInput
// //               type="time"
// //               label="Start Time"
// //               value={sessionData.start_time}
// //               onChange={(e) =>
// //                 setSessionData({ ...sessionData, start_time: e.target.value })
// //               }
// //             />
// //             <FormInput
// //               type="time"
// //               label="End Time"
// //               value={sessionData.end_time}
// //               onChange={(e) =>
// //                 setSessionData({ ...sessionData, end_time: e.target.value })
// //               }
// //             />
// //           </div>

// //           <FormInput
// //             label="Zoom Link"
// //             value={sessionData.zoom_link}
// //             onChange={(e) =>
// //               setSessionData({ ...sessionData, zoom_link: e.target.value })
// //             }
// //           />

// //           <div className="flex justify-end gap-3 pt-4">
// //             <Button
// //               type="button"
// //               variant="secondary"
// //               onClick={() => {
// //                 setShowEditSessionModal(false);
// //                 setSelectedSession(null);
// //                 setSessionData(defaultSession);
// //               }}
// //             >
// //               Cancel
// //             </Button>
// //             <Button type="submit">Update Session</Button>
// //           </div>
// //         </form>
// //       </Modal>

// //       {/* DELETE SESSION MODAL */}
// //       <Modal
// //         isOpen={showDeleteSessionModal}
// //         onClose={() => setShowDeleteSessionModal(false)}
// //         title="Cancel Session"
// //       >
// //         <p className="text-gray-300">
// //           Are you sure you want to cancel this session?
// //         </p>
// //         <p className="mt-2 font-bold text-white">{selectedSession?.title}</p>
// //         <div className="flex justify-end gap-3 mt-6">
// //           <Button
// //             variant="secondary"
// //             onClick={() => setShowDeleteSessionModal(false)}
// //           >
// //             No, Keep it
// //           </Button>
// //           <Button className="bg-red-500" onClick={confirmDeleteSession}>
// //             Yes, Cancel
// //           </Button>
// //         </div>
// //       </Modal>
// //     </div>
// //   );
// // }


// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import {
//   HiPlus,
//   HiPencil,
//   HiTrash,
//   HiCalendar,
// } from "react-icons/hi";

// import DataTable from "../components/ui/DataTable";
// import Modal from "../components/ui/Modal";
// import Button from "../components/ui/Button";
// import Badge from "../components/ui/Badge";
// import FormInput from "../components/ui/FormInput";
// import { getAuth, onAuthStateChanged } from "firebase/auth";

// import API from "../services/api";

// // =============================================
// // DAYS LIST FOR CHECKBOXES (From Admin)
// // =============================================
// const DAYS_LIST = [
//   { label: "Monday", value: "MONDAY" },
//   { label: "Tuesday", value: "TUESDAY" },
//   { label: "Wednesday", value: "WEDNESDAY" },
//   { label: "Thursday", value: "THURSDAY" },
//   { label: "Friday", value: "FRIDAY" },
//   { label: "Saturday", value: "SATURDAY" },
//   { label: "Sunday", value: "SUNDAY" },
// ];

// // =============================================
// // ADMIN MATCHING STYLES (From Admin)
// // =============================================
// const selectClass =
//   "w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors";
// const inputClass =
//   "w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors";
// const labelClass = "block text-sm text-white mb-1";

// export default function TrainerClasses() {
//   /* ================= CLASS STATES ================= */
//   const [classes, setClasses] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingClass, setEditingClass] = useState(null);
//   const [deleteClass, setDeleteClass] = useState(null);
//   const [openDelete, setOpenDelete] = useState(false);

//   /* ================= SESSION STATES ================= */
//   const [sessions, setSessions] = useState([]);
//   const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);
//   const [showEditSessionModal, setShowEditSessionModal] = useState(false);
//   const [showDeleteSessionModal, setShowDeleteSessionModal] = useState(false);
//   const [selectedSession, setSelectedSession] = useState(null);
//   const [searchSessions, setSearchSessions] = useState("");

//   /* ================= DROPDOWNS ================= */
//   const [categories, setCategories] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);

//   /* ================= FORM DATA (Matching Admin) ================= */
//   const defaultForm = {
//     title: "",
//     description: "",
//     highlights: "",
//     image: null,
//     category_id: "",
//     subcategory_id: "",
//     price: "",
//     duration: "",
//     level: "BEGINNER",
//     mode: "ONLINE",
//     max_students: "",
//     students_count: "",
//     course_start_date: "",
//     course_end_date: "",
//     start_time: "",
//     end_time: "",
//     available_days: [],
//   };

//   const defaultSession = {
//     class_id: "",
//     title: "",
//     session_date: "",
//     start_time: "",
//     end_time: "",
//     zoom_link: "",
//   };

//   const [formData, setFormData] = useState(defaultForm);
//   const [sessionData, setSessionData] = useState(defaultSession);

//   /* ================= CONFIG ================= */
//   const getConfig = async () => {
//     const auth = getAuth();
//     let token = null;

//     if (auth.currentUser) {
//       token = await auth.currentUser.getIdToken(true);
//     } else {
//       token = localStorage.getItem("token");
//     }

//     return {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };
//   };

//   /* ================= FETCH FUNCTIONS ================= */
//   const fetchClasses = async () => {
//     try {
//       const config = await getConfig();
//       const res = await API.get("/classes/trainer/my-classes", config);
//       setClasses(res?.data?.data || []);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to fetch classes");
//     }
//   };

//   const fetchSessions = async () => {
//     try {
//       const config = await getConfig();
//       const res = await API.get("/sessions/trainer/upcoming", config);
//       console.log("SESSION API:", res.data);

//       const data = res.data?.data ?? res.data?.sessions ?? res.data ?? [];
//       setSessions(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error(err);
//       setSessions([]);
//     }
//   };

//   const fetchDropdowns = async () => {
//     try {
//       const config = await getConfig();
//       const [categoryRes, subcategoryRes] = await Promise.all([
//         API.get("/categories", config),
//         API.get("/subcategories", config),
//       ]);

//       setCategories(categoryRes.data.data || []);
//       setSubcategories(subcategoryRes.data.data || []);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   /* ================= USEEFFECT ================= */
//   useEffect(() => {
//     const auth = getAuth();
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         fetchClasses();
//         fetchSessions();
//         fetchDropdowns();
//       } else {
//         console.log("User is not authenticated");
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   /* ================= TOGGLE DAY HELPER (From Admin) ================= */
//   const toggleDay = (dayValue) => {
//     setFormData((prev) => {
//       const exists = prev.available_days.includes(dayValue);
//       return {
//         ...prev,
//         available_days: exists
//           ? prev.available_days.filter((d) => d !== dayValue)
//           : [...prev.available_days, dayValue],
//       };
//     });
//   };

//   /* ================= CLASS HANDLERS ================= */
//   const handleDelete = (cls) => {
//     setDeleteClass(cls);
//     setOpenDelete(true);
//   };

//   const confirmDelete = async () => {
//     try {
//       const config = await getConfig();
//       await API.delete(`/classes/trainer/${deleteClass.id}`, config);
//       toast.success("Class deleted successfully");
//       fetchClasses();
//     } catch (err) {
//       toast.error(err?.response?.data?.message || "Delete failed");
//     } finally {
//       setOpenDelete(false);
//       setDeleteClass(null);
//     }
//   };

//   const handleEdit = (cls) => {
//     setEditingClass(cls);
//     setFormData({
//       title: cls.title || "",
//       description: cls.description || "",
//       highlights: cls.highlights || "",
//       category_id: cls.category_id || "",
//       subcategory_id: cls.subcategory_id || "",
//       price: cls.price || "",
//       duration: cls.duration || "",
//       level: cls.level || "BEGINNER",
//       mode: cls.mode || "ONLINE",
//       max_students: cls.max_students || "",
//       students_count: cls.students_count || "",
//       course_start_date: cls.course_start_date || "",
//       course_end_date: cls.course_end_date || "",
//       start_time: cls.default_start_time || cls.start_time || "",
//       end_time: cls.default_end_time || cls.end_time || "",
//       available_days: cls.available_days
//         ? Array.isArray(cls.available_days)
//           ? cls.available_days
//           : JSON.parse(cls.available_days || "[]")
//         : [],
//       image: null,
//     });
//     setIsModalOpen(true);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.title?.trim()) {
//       toast.error("Class Name is required");
//       return;
//     }
//     if (!formData.category_id) {
//       toast.error("Please select a Category");
//       return;
//     }

//     const payload = new FormData();
//     payload.append("title", formData.title.trim());
//     payload.append("description", formData.description?.trim() || "");
//     payload.append("highlights", formData.highlights || "");
//     payload.append("category_id", formData.category_id);

//     if (formData.subcategory_id) {
//       payload.append("subcategory_id", formData.subcategory_id);
//     }

//     payload.append("students_count", formData.students_count || 0);
//     payload.append("price", formData.price || 0);
//     payload.append("duration", formData.duration || 60);
//     payload.append("level", formData.level || "BEGINNER");
//     payload.append("mode", formData.mode || "ONLINE");

//     if (formData.max_students) {
//       payload.append("max_students", formData.max_students);
//     }
//     if (formData.image) {
//       payload.append("image", formData.image);
//     }

//     // ✅ New fields matching Admin payload structure
//     if (formData.course_start_date)
//       payload.append("start_date", formData.course_start_date);
//     if (formData.course_end_date)
//       payload.append("end_date", formData.course_end_date);
//     if (formData.start_time)
//       payload.append("default_start_time", formData.start_time);
//     if (formData.end_time)
//       payload.append("default_end_time", formData.end_time);
      
//     formData.available_days.forEach((day) => {
//       payload.append("available_days[]", day);
//     });

//     try {
//       const config = await getConfig();

//       if (editingClass?.id) {
//         await API.put(`/classes/trainer/${editingClass.id}`, payload, {
//           headers: {
//             ...config.headers,
//             "Content-Type": "multipart/form-data",
//           },
//         });
//         toast.success("Class updated successfully");
//       } else {
//         await API.post("/classes/trainer/create", payload, {
//           headers: {
//             ...config.headers,
//             "Content-Type": "multipart/form-data",
//           },
//         });
//         toast.success("Class created successfully");
//       }

//       fetchClasses();
//       closeModal();
//     } catch (err) {
//       console.log("Backend Error:", err.response?.data);
//       toast.error(err?.response?.data?.message || "Something went wrong");
//     }
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setEditingClass(null);
//     setFormData(defaultForm);
//   };

//   /* ================= SESSION HANDLERS ================= */
//   const handleSessionSubmit = async (e) => {
//     e.preventDefault();
//     if (!sessionData.class_id) {
//       toast.error("Please select a Class");
//       return;
//     }
//     try {
//       const config = await getConfig();
//       await API.post("/sessions/trainer/create", sessionData, config);
//       toast.success("Session created");
//       fetchSessions();
//       setIsSessionModalOpen(false);
//       setSessionData(defaultSession);
//     } catch (err) {
//       console.error(err);
//       toast.error(err?.response?.data?.message || "Failed to create session");
//     }
//   };

//   const handleEditSession = (session) => {
//     setSelectedSession(session);
//     setSessionData({
//       class_id: session.class_id || "",
//       title: session.title || "",
//       session_date: session.session_date ? session.session_date.split("T")[0] : "",
//       start_time: session.start_time || "",
//       end_time: session.end_time || "",
//       zoom_link: session.zoom_link || "",
//     });
//     setShowEditSessionModal(true);
//   };

//   const handleUpdateSession = async (e) => {
//     e.preventDefault();
//     try {
//       if (!selectedSession?.session_id) {
//         toast.error("Session not selected");
//         return;
//       }
//       const config = await getConfig();
//       await API.put(`/sessions/${selectedSession.session_id}`, sessionData, config);
//       fetchSessions();
//       toast.success("Session updated successfully");
//       setShowEditSessionModal(false);
//       setSelectedSession(null);
//       setSessionData(defaultSession);
//     } catch (err) {
//       console.error("UPDATE SESSION ERROR:", err);
//       toast.error(err?.response?.data?.message || "Failed to update session");
//     }
//   };

//   const handleDeleteSessionClick = (session) => {
//     setSelectedSession(session);
//     setShowDeleteSessionModal(true);
//   };

//   const confirmDeleteSession = async () => {
//     try {
//       const config = await getConfig();
//       await API.patch(`/sessions/${selectedSession.session_id}/cancel`, {}, config);
//       toast.success("Session cancelled successfully");
//       setSessions((prev) => prev.filter((s) => String(s.id) !== String(selectedSession.id)));
//       setShowDeleteSessionModal(false);
//       setSelectedSession(null);
//     } catch (error) {
//       console.error(error);
//       toast.error(error?.response?.data?.message || "Failed to cancel session");
//     }
//   };

//   /* ================= COLUMNS ================= */
//   const columns = [
//     { key: "id", label: "ID" },
//     {
//       key: "image",
//       label: "Image",
//       render: (v) =>
//         v ? (
//           <img src={v.startsWith("http") ? v : `/${v}`} alt="Class Thumbnail" className="h-10 w-10 rounded-md object-cover border border-gray-600" />
//         ) : (
//           <span className="text-gray-500 text-xs">No Img</span>
//         ),
//     },
//     { key: "title", label: "Class Name", render: (v) => <span className="font-semibold">{v || "-"}</span> },
//     { key: "trainer_name", label: "Trainer", render: (v) => v || "N/A" },
//     { key: "category_name", label: "Category", render: (v) => v || "N/A" },
//     { key: "subcategory_name", label: "Subcategory", render: (v) => v || "N/A" },
//     { key: "level", label: "Level", render: (v) => <Badge variant="purple">{v || "-"}</Badge> },
//     { key: "price", label: "Price", render: (v) => <span className="text-green-400 font-semibold">₹{v ?? 0}</span> },
//     { key: "students_count", label: "Student Count", render: (v) => <span className="font-semibold">{v ?? 0}</span> },
//     { key: "created_at", label: "Created At", render: (v) => (v ? new Date(v).toLocaleString() : "-") },
//   ];

//   const filteredSessions = (Array.isArray(sessions) ? sessions : []).filter(
//     (s) =>
//       s.title?.toLowerCase().includes(searchSessions.toLowerCase()) ||
//       s.class_title?.toLowerCase().includes(searchSessions.toLowerCase())
//   );

//   /* ================= JSX ================= */
//   return (
//     <div className="space-y-8 animate-slide-up pb-10">
//       {/* HEADER */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//         <div>
//           <h1 className="text-3xl font-bold gradient-text">My Classes</h1>
//           <p className="text-white mt-1">Manage classes and schedule sessions</p>
//         </div>
//         <div className="flex gap-3">
//           <Button icon={HiCalendar} onClick={() => setIsSessionModalOpen(true)}>Add Session</Button>
//           <Button icon={HiPlus} onClick={() => setIsModalOpen(true)}>Add Class</Button>
//         </div>
//       </div>

//       {/* CLASSES TABLE */}
//       <div>
//         <h2 className="text-xl font-semibold text-white mb-4">All Classes</h2>
//         <DataTable
//           columns={columns}
//           data={classes}
//           actions={(row) => (
//             <>
//               <Button variant="ghost" size="sm" icon={HiPencil} onClick={() => handleEdit(row)} />
//               <Button variant="ghost" size="sm" icon={HiTrash} className="text-red-400" onClick={() => handleDelete(row)} />
//             </>
//           )}
//         />
//       </div>

//       {/* SESSIONS TABLE */}
//       <div className="space-y-4">
//         <div className="flex items-center justify-between">
//           <h2 className="text-xl font-semibold text-white">Upcoming Sessions</h2>
//         </div>
//         <div className="mb-2">
//           <input
//             type="text"
//             placeholder="Search Sessions by title or class name..."
//             value={searchSessions}
//             onChange={(e) => setSearchSessions(e.target.value)}
//             className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white focus:outline-none focus:border-purple-500"
//           />
//         </div>

//         <div className="glass-effect rounded-2xl overflow-hidden border border-white/10">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="bg-white/5 border-b border-white/10 text-left text-white text-sm uppercase">
//                   <th className="px-6 py-4">Class</th>
//                   <th className="px-6 py-4">Title</th>
//                   <th className="px-6 py-4">Date</th>
//                   <th className="px-6 py-4">Start Time</th>
//                   <th className="px-6 py-4">End Time</th>
//                   <th className="px-6 py-4">Zoom Link</th>
//                   <th className="px-6 py-4 text-right">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredSessions.length > 0 ? (
//                   filteredSessions.map((session) => (
//                     <tr key={session.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
//                       <td className="px-6 py-4 font-medium">{session.class_title || "N/A"}</td>
//                       <td className="px-6 py-4 text-gray-300">{session.title}</td>
//                       <td className="px-6 py-4 text-gray-300">{session.session_date}</td>
//                       <td className="px-6 py-4 text-gray-300">{session.start_time || "-"}</td>
//                       <td className="px-6 py-4 text-gray-300">{session.end_time || "-"}</td>
//                       <td className="px-6 py-4">
//                         {session.zoom_link ? (
//                           <a href={session.zoom_link} target="_blank" rel="noreferrer" className="text-purple-400 hover:underline">Join</a>
//                         ) : (
//                           <span className="text-gray-500">-</span>
//                         )}
//                       </td>
//                       <td className="px-6 py-4 text-right">
//                         <div className="flex justify-end gap-2">
//                           <button onClick={() => handleEditSession(session)} className="p-2 text-white hover:text-white transition"><HiPencil size={18} /></button>
//                           <button onClick={() => handleDeleteSessionClick(session)} className="p-2 text-red-500 hover:text-red-400 transition"><HiTrash size={18} /></button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
//                       {searchSessions ? "No sessions found matching your search." : "No sessions found."}
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       {/* DELETE CLASS MODAL */}
//       <Modal isOpen={openDelete} onClose={() => setOpenDelete(false)} title="Confirm Delete">
//         <p>Are you sure you want to delete this class?</p>
//         <div className="flex justify-end gap-3 mt-6">
//           <Button variant="secondary" onClick={() => setOpenDelete(false)}>Cancel</Button>
//           <Button className="bg-red-500" onClick={confirmDelete}>Delete</Button>
//         </div>
//       </Modal>

//       {/* ==================== ADD/EDIT CLASS MODAL (Exact Admin Layout) ==================== */}
//       <Modal isOpen={isModalOpen} onClose={closeModal} title={editingClass ? "Edit Class" : "Add Class"}>
//         <form onSubmit={handleSubmit} className="space-y-1">
//           {/* Class Name */}
//           <div>
//             <label className={labelClass}>Class Name *</label>
//             <input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className={inputClass} placeholder="Enter class name" required />
//           </div>

//           {/* Description */}
//           <div>
//             <label className={labelClass}>Description</label>
//             <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows="3" className={inputClass} placeholder="Enter description" />
//           </div>

//           {/* Highlights */}
//           <div>
//             <label className={labelClass}>What You'll Learn</label>
//             <textarea rows="4" value={formData.highlights} onChange={(e) => setFormData({ ...formData, highlights: e.target.value })} placeholder={`Breathing techniques\nPitch control\nSong practice`} className={inputClass} />
//           </div>

//           {/* Image */}
//           <div>
//             <label className={labelClass}>Class Image</label>
//             {editingClass?.image && (
//               <img src={editingClass.image.startsWith("http") ? editingClass.image : `https://finearts-backend.onrender.com/${editingClass.image}`} alt="Current" className="w-20 h-20 object-cover rounded-xl mb-2 border border-[#333]" />
//             )}
//             <input type="file" accept="image/*" onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })} className="w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-500/20 file:text-purple-300 hover:file:bg-purple-500/30" />
//           </div>

//           {/* Category & Subcategory */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className={labelClass}>Category *</label>
//               <select value={formData.category_id} onChange={(e) => setFormData({ ...formData, category_id: e.target.value, subcategory_id: "" })} className={selectClass} required>
//                 <option value="">Select Category</option>
//                 {categories?.map((cat) => (<option key={cat.id} value={cat.id}>{cat.name}</option>))}
//               </select>
//             </div>
//             <div>
//               <label className={labelClass}>Subcategory</label>
//               <select value={formData.subcategory_id} onChange={(e) => setFormData({ ...formData, subcategory_id: e.target.value })} disabled={!formData.category_id} className={`${selectClass} disabled:opacity-50`}>
//                 <option value="">Select Subcategory</option>
//                 {subcategories?.filter((s) => String(s.category_id) === String(formData.category_id)).map((sub) => (<option key={sub.id} value={sub.id}>{sub.name}</option>))}
//               </select>
//             </div>
//           </div>

//           {/* Price & Duration */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className={labelClass}>Price</label>
//               <input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className={inputClass} placeholder="0" />
//             </div>
//             <div>
//               <label className={labelClass}>Duration (Minutes)</label>
//               <input type="number" value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} className={inputClass} placeholder="60" />
//             </div>
//           </div>

//           {/* ✅ Course Start Date & End Date */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className={labelClass}>Course Start Date</label>
//               <input type="date" value={formData.course_start_date} onChange={(e) => setFormData({ ...formData, course_start_date: e.target.value })} className={inputClass} />
//             </div>
//             <div>
//               <label className={labelClass}>Course End Date</label>
//               <input type="date" value={formData.course_end_date} onChange={(e) => setFormData({ ...formData, course_end_date: e.target.value })} className={inputClass} />
//             </div>
//           </div>

//           {/* ✅ Default Start Time & End Time */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className={labelClass}>Default Start Time</label>
//               <input type="time" value={formData.start_time} onChange={(e) => setFormData({ ...formData, start_time: e.target.value })} className={inputClass} />
//             </div>
//             <div>
//               <label className={labelClass}>Default End Time</label>
//               <input type="time" value={formData.end_time} onChange={(e) => setFormData({ ...formData, end_time: e.target.value })} className={inputClass} />
//             </div>
//           </div>

//           {/* ✅ Available Days Checkboxes */}
//           <div>
//             <label className={labelClass}>Available Days</label>
//             <div className="mt-2 mb-4 grid grid-cols-4 sm:grid-cols-7 gap-2">
//               {DAYS_LIST.map((day) => {
//                 const isChecked = formData.available_days.includes(day.value);
//                 return (
//                   <label key={day.value} className={`flex items-center justify-center gap-1.5 p-2.5 rounded-xl cursor-pointer text-xs font-medium transition-all border ${isChecked ? "bg-purple-500/20 border-purple-500/50 text-purple-300" : "bg-[#2b2638] border-transparent text-white hover:border-purple-500/30 hover:text-gray-300"}`}>
//                     <input type="checkbox" checked={isChecked} onChange={() => toggleDay(day.value)} className="sr-only" />
//                     <span className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${isChecked ? "bg-purple-500 border-purple-500" : "border-gray-500"}`}>
//                       {isChecked && (
//                         <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
//                           <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
//                         </svg>
//                       )}
//                     </span>
//                     {day.label.slice(0, 3)}
//                   </label>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Students Count & Max Students */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className={labelClass}>Students Count</label>
//               <input type="number" value={formData.students_count} onChange={(e) => setFormData({ ...formData, students_count: e.target.value })} className={inputClass} placeholder="0" />
//             </div>
//             <div>
//               <label className={labelClass}>Max Students</label>
//               <input type="number" value={formData.max_students} onChange={(e) => setFormData({ ...formData, max_students: e.target.value })} className={inputClass} placeholder="Unlimited" />
//             </div>
//           </div>

//           {/* Level & Mode */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className={labelClass}>Level</label>
//               <select value={formData.level} onChange={(e) => setFormData({ ...formData, level: e.target.value })} className={selectClass}>
//                 <option value="BEGINNER">Beginner</option>
//                 <option value="INTERMEDIATE">Intermediate</option>
//                 <option value="ADVANCED">Advanced</option>
//               </select>
//             </div>
//             <div>
//               <label className={labelClass}>Mode</label>
//               <select value={formData.mode} onChange={(e) => setFormData({ ...formData, mode: e.target.value })} className={selectClass}>
//                 <option value="ONLINE">Online</option>
//                 <option value="OFFLINE">Offline</option>
//                 <option value="HYBRID">Hybrid</option>
//               </select>
//             </div>
//           </div>

//           {/* Buttons */}
//           <div className="flex justify-end gap-3 pt-4 border-t border-[#3a3448]">
//             <button type="button" onClick={closeModal} className="px-5 py-3 rounded-xl border border-gray-600 text-gray-300 hover:bg-[#2b2638] transition-colors">Cancel</button>
//             <button type="submit" className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition-opacity">
//               {editingClass ? "Update Class" : "Add Class"}
//             </button>
//           </div>
//         </form>
//       </Modal>

//       {/* ADD SESSION MODAL */}
//       <Modal isOpen={isSessionModalOpen} onClose={() => { setIsSessionModalOpen(false); setSessionData(defaultSession); }} title="Add Session">
//         <form onSubmit={handleSessionSubmit} className="space-y-4">
//           <div>
//             <label className={labelClass}>Select Class *</label>
//             <select
//               value={sessionData.class_id}
//               onChange={(e) => {
//                 const selectedClass = classes.find((c) => String(c.id) === e.target.value);
//                 let defaultStart = selectedClass?.default_start_time || selectedClass?.start_time || "";
//                 let defaultEnd = selectedClass?.default_end_time || selectedClass?.end_time || "";

//                 if (!defaultStart && selectedClass?.duration) {
//                   defaultStart = "10:00";
//                   const [hours, minutes] = defaultStart.split(":").map(Number);
//                   const totalMinutes = hours * 60 + minutes + Number(selectedClass.duration);
//                   const endHours = Math.floor(totalMinutes / 60) % 24;
//                   const endMinutes = totalMinutes % 60;
//                   defaultEnd = `${String(endHours).padStart(2, "0")}:${String(endMinutes).padStart(2, "0")}`;
//                 }

//                 setSessionData({
//                   ...sessionData,
//                   class_id: e.target.value,
//                   title: selectedClass?.title || "",
//                   start_time: defaultStart,
//                   end_time: defaultEnd,
//                 });
//               }}
//               className={selectClass}
//               required
//             >
//               <option value="">Select Class</option>
//               {classes.map((cls) => (
//                 <option key={cls.id} value={cls.id}>
//                   {cls.title} {cls.default_start_time && cls.default_end_time ? `(${cls.default_start_time} - ${cls.default_end_time})` : cls.duration ? `(${cls.duration} min)` : ""}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <FormInput label="Session Title" value={sessionData.title} onChange={(e) => setSessionData({ ...sessionData, title: e.target.value })} />
//           <FormInput type="date" label="Date" value={sessionData.session_date} onChange={(e) => setSessionData({ ...sessionData, session_date: e.target.value })} />

//           <div className="grid grid-cols-2 gap-4">
//             <FormInput type="time" label="Start Time" value={sessionData.start_time} onChange={(e) => setSessionData({ ...sessionData, start_time: e.target.value })} />
//             <FormInput type="time" label="End Time" value={sessionData.end_time} onChange={(e) => setSessionData({ ...sessionData, end_time: e.target.value })} />
//           </div>

//           <FormInput label="Zoom Link" value={sessionData.zoom_link} onChange={(e) => setSessionData({ ...sessionData, zoom_link: e.target.value })} />

//           <div className="flex justify-end gap-3 pt-4">
//             <Button type="button" variant="secondary" onClick={() => { setIsSessionModalOpen(false); setSessionData(defaultSession); }}>Cancel</Button>
//             <Button type="submit">Create Session</Button>
//           </div>
//         </form>
//       </Modal>

//       {/* EDIT SESSION MODAL */}
//       <Modal isOpen={showEditSessionModal} onClose={() => { setShowEditSessionModal(false); setSelectedSession(null); setSessionData(defaultSession); }} title="Edit Session">
//         <form onSubmit={handleUpdateSession} className="space-y-4">
//           <div>
//             <label className={labelClass}>Class</label>
//             <input type="text" value={classes.find((cls) => String(cls.id) === String(sessionData.class_id))?.title || ""} readOnly className="w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors cursor-not-allowed" />
//           </div>

//           <FormInput label="Title" value={sessionData.title} onChange={(e) => setSessionData({ ...sessionData, title: e.target.value })} />
//           <FormInput type="date" label="Date" value={sessionData.session_date} onChange={(e) => setSessionData({ ...sessionData, session_date: e.target.value })} />

//           <div className="grid grid-cols-2 gap-4">
//             <FormInput type="time" label="Start Time" value={sessionData.start_time} onChange={(e) => setSessionData({ ...sessionData, start_time: e.target.value })} />
//             <FormInput type="time" label="End Time" value={sessionData.end_time} onChange={(e) => setSessionData({ ...sessionData, end_time: e.target.value })} />
//           </div>

//           <FormInput label="Zoom Link" value={sessionData.zoom_link} onChange={(e) => setSessionData({ ...sessionData, zoom_link: e.target.value })} />

//           <div className="flex justify-end gap-3 pt-4">
//             <Button type="button" variant="secondary" onClick={() => { setShowEditSessionModal(false); setSelectedSession(null); setSessionData(defaultSession); }}>Cancel</Button>
//             <Button type="submit">Update Session</Button>
//           </div>
//         </form>
//       </Modal>

//       {/* DELETE SESSION MODAL */}
//       <Modal isOpen={showDeleteSessionModal} onClose={() => setShowDeleteSessionModal(false)} title="Cancel Session">
//         <p className="text-gray-300">Are you sure you want to cancel this session?</p>
//         <p className="mt-2 font-bold text-white">{selectedSession?.title}</p>
//         <div className="flex justify-end gap-3 mt-6">
//           <Button variant="secondary" onClick={() => setShowDeleteSessionModal(false)}>No, Keep it</Button>
//           <Button className="bg-red-500" onClick={confirmDeleteSession}>Yes, Cancel</Button>
//         </div>
//       </Modal>
//     </div>
//   );
// }



// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import {
//   HiPlus,
//   HiPencil,
//   HiTrash,
// } from "react-icons/hi";

// import Modal from "../components/ui/Modal";
// import Button from "../components/ui/Button";
// import { getAuth, onAuthStateChanged } from "firebase/auth";

// import API from "../services/api";

// // =============================================
// // DAYS LIST FOR CHECKBOXES
// // =============================================
// const DAYS_LIST = [
//   { label: "Monday", value: "MONDAY" },
//   { label: "Tuesday", value: "TUESDAY" },
//   { label: "Wednesday", value: "WEDNESDAY" },
//   { label: "Thursday", value: "THURSDAY" },
//   { label: "Friday", value: "FRIDAY" },
//   { label: "Saturday", value: "SATURDAY" },
//   { label: "Sunday", value: "SUNDAY" },
// ];

// // =============================================
// // STYLES
// // =============================================
// const selectClass =
//   "w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors";
// const inputClass =
//   "w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors";
// const labelClass = "block text-sm text-white mb-1";

// export default function TrainerClasses() {
//   /* ================= CLASS STATES ================= */
//   const [classes, setClasses] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingClass, setEditingClass] = useState(null);
//   const [deleteClass, setDeleteClass] = useState(null);
//   const [openDelete, setOpenDelete] = useState(false);

//   /* ================= SEARCH ================= */
//   const [searchQuery, setSearchQuery] = useState("");

//   /* ================= DROPDOWNS ================= */
//   const [categories, setCategories] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);

//   /* ================= FORM DATA ================= */
//   const defaultForm = {
//     title: "",
//     description: "",
//     highlights: "",
//     image: null,
//     category_id: "",
//     subcategory_id: "",
//     price: "",
//     duration: "",
//     level: "BEGINNER",
//     mode: "ONLINE",
//     max_students: "",
//     students_count: "",
//     course_start_date: "",
//     course_end_date: "",
//     start_time: "",
//     end_time: "",
//     available_days: [],
//   };

//   const [formData, setFormData] = useState(defaultForm);

//   /* ================= CONFIG ================= */
//   const getConfig = async () => {
//     const auth = getAuth();
//     let token = null;

//     if (auth.currentUser) {
//       token = await auth.currentUser.getIdToken(true);
//     } else {
//       token = localStorage.getItem("token");
//     }

//     return {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };
//   };

//   /* ================= FETCH FUNCTIONS ================= */
//   const fetchClasses = async () => {
//     try {
//       const config = await getConfig();
//       const res = await API.get("/classes/trainer/my-classes", config);
//       setClasses(res?.data?.data || []);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to fetch classes");
//     }
//   };

//   const fetchDropdowns = async () => {
//     try {
//       const config = await getConfig();
//       const [categoryRes, subcategoryRes] = await Promise.all([
//         API.get("/categories", config),
//         API.get("/subcategories", config),
//       ]);

//       setCategories(categoryRes.data.data || []);
//       setSubcategories(subcategoryRes.data.data || []);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   /* ================= USEEFFECT ================= */
//   useEffect(() => {
//     const auth = getAuth();
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         fetchClasses();
//         fetchDropdowns();
//       } else {
//         console.log("User is not authenticated");
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   /* ================= FILTERED CLASSES ================= */
//   const filteredClasses = classes.filter((cls) => {
//     const query = searchQuery.toLowerCase();
//     return (
//       cls.title?.toLowerCase().includes(query) ||
//       cls.category_name?.toLowerCase().includes(query) ||
//       cls.subcategory_name?.toLowerCase().includes(query) ||
//       cls.level?.toLowerCase().includes(query) ||
//       String(cls.id).includes(query) ||
//       String(cls.price).includes(query)
//     );
//   });

//   /* ================= TOGGLE DAY HELPER ================= */
//   const toggleDay = (dayValue) => {
//     setFormData((prev) => {
//       const exists = prev.available_days.includes(dayValue);
//       return {
//         ...prev,
//         available_days: exists
//           ? prev.available_days.filter((d) => d !== dayValue)
//           : [...prev.available_days, dayValue],
//       };
//     });
//   };

//   /* ================= CLASS HANDLERS ================= */
//   const handleDelete = (cls) => {
//     setDeleteClass(cls);
//     setOpenDelete(true);
//   };

//   const confirmDelete = async () => {
//     try {
//       const config = await getConfig();
//       await API.delete(`/classes/trainer/${deleteClass.id}`, config);
//       toast.success("Class deleted successfully");
//       fetchClasses();
//     } catch (err) {
//       toast.error(err?.response?.data?.message || "Delete failed");
//     } finally {
//       setOpenDelete(false);
//       setDeleteClass(null);
//     }
//   };

//   const handleEdit = (cls) => {
//     setEditingClass(cls);
//     setFormData({
//       title: cls.title || "",
//       description: cls.description || "",
//       highlights: cls.highlights || "",
//       category_id: cls.category_id || "",
//       subcategory_id: cls.subcategory_id || "",
//       price: cls.price || "",
//       duration: cls.duration || "",
//       level: cls.level || "BEGINNER",
//       mode: cls.mode || "ONLINE",
//       max_students: cls.max_students || "",
//       students_count: cls.students_count || "",
//       course_start_date: cls.course_start_date || "",
//       course_end_date: cls.course_end_date || "",
//       start_time: cls.default_start_time || cls.start_time || "",
//       end_time: cls.default_end_time || cls.end_time || "",
//       available_days: cls.available_days
//         ? Array.isArray(cls.available_days)
//           ? cls.available_days
//           : JSON.parse(cls.available_days || "[]")
//         : [],
//       image: null,
//     });
//     setIsModalOpen(true);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.title?.trim()) {
//       toast.error("Class Name is required");
//       return;
//     }
//     if (!formData.category_id) {
//       toast.error("Please select a Category");
//       return;
//     }

//     const payload = new FormData();
//     payload.append("title", formData.title.trim());
//     payload.append("description", formData.description?.trim() || "");
//     payload.append("highlights", formData.highlights || "");
//     payload.append("category_id", formData.category_id);

//     if (formData.subcategory_id) {
//       payload.append("subcategory_id", formData.subcategory_id);
//     }

//     payload.append("students_count", formData.students_count || 0);
//     payload.append("price", formData.price || 0);
//     payload.append("duration", formData.duration || 60);
//     payload.append("level", formData.level || "BEGINNER");
//     payload.append("mode", formData.mode || "ONLINE");

//     if (formData.max_students) {
//       payload.append("max_students", formData.max_students);
//     }
//     if (formData.image) {
//       payload.append("image", formData.image);
//     }

//     if (formData.course_start_date)
//       payload.append("start_date", formData.course_start_date);
//     if (formData.course_end_date)
//       payload.append("end_date", formData.course_end_date);
//     if (formData.start_time)
//       payload.append("default_start_time", formData.start_time);
//     if (formData.end_time)
//       payload.append("default_end_time", formData.end_time);

//     formData.available_days.forEach((day) => {
//       payload.append("available_days[]", day);
//     });

//     try {
//       const config = await getConfig();

//       if (editingClass?.id) {
//         await API.put(`/classes/trainer/${editingClass.id}`, payload, {
//           headers: {
//             ...config.headers,
//             "Content-Type": "multipart/form-data",
//           },
//         });
//         toast.success("Class updated successfully");
//       } else {
//         await API.post("/classes/trainer/create", payload, {
//           headers: {
//             ...config.headers,
//             "Content-Type": "multipart/form-data",
//           },
//         });
//         toast.success("Class created successfully");
//       }

//       fetchClasses();
//       closeModal();
//     } catch (err) {
//       console.log("Backend Error:", err.response?.data);
//       toast.error(err?.response?.data?.message || "Something went wrong");
//     }
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setEditingClass(null);
//     setFormData(defaultForm);
//   };

//   /* ================= LEVEL BADGE COLOR ================= */
//   const getLevelStyle = (level) => {
//     switch (level) {
//       case "BEGINNER":
//         return "bg-emerald-500/15 text-emerald-400";
//       case "INTERMEDIATE":
//         return "bg-yellow-500/15 text-yellow-400";
//       case "ADVANCED":
//         return "bg-red-500/15 text-red-400";
//       default:
//         return "bg-gray-500/15 text-white";
//     }
//   };

//   /* ================= JSX ================= */
//   return (
//     <div className="space-y-6 pb-10">
//       {/* HEADER */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-white">My Classes</h1>
//           <p className="text-gray-500 text-sm mt-1">
//             Manage classes and schedule sessions
//           </p>
//         </div>

//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium transition-colors"
//         >
//           + Add Class
//         </button>
//       </div>

//       {/* SEARCH BAR - Exact match with bookings */}
//       <div>
//         <input
//           type="text"
//           placeholder="Search classes..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="w-full px-4 py-3 rounded-xl bg-[#151519] border border-[#2c2c35] text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/60 transition-colors text-sm"
//         />
//       </div>

//       {/* TABLE */}
//       <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-[#202027] text-white text-xs">
//               <tr>
//                 <th className="p-4 text-left whitespace-nowrap">ID</th>
//                 <th className="p-4 text-left whitespace-nowrap">Image</th>
//                 <th className="p-4 text-left whitespace-nowrap">Class Name</th>
//                 <th className="p-4 text-left whitespace-nowrap">Category</th>
//                 <th className="p-4 text-left whitespace-nowrap">Subcategory</th>
//                 <th className="p-4 text-left whitespace-nowrap">Level</th>
//                 <th className="p-4 text-left whitespace-nowrap">Price</th>
//                 <th className="p-4 text-left whitespace-nowrap">Students</th>
//                 <th className="p-4 text-left whitespace-nowrap">Created At</th>
//                 <th className="p-4 text-right whitespace-nowrap">Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {filteredClasses.length === 0 ? (
//                 <tr>
//                   <td colSpan={10} className="p-16 text-center text-gray-500 text-sm">
//                     No classes found
//                   </td>
//                 </tr>
//               ) : (
//                 filteredClasses.map((cls) => (
//                   <tr
//                     key={cls.id}
//                     className="border-t border-[#2c2c35] hover:bg-[#1a1a20] transition-colors"
//                   >
//                     <td className="p-4 text-white text-sm whitespace-nowrap">
//                       #{cls.id}
//                     </td>

//                     <td className="p-4">
//                       {cls.image ? (
//                         <img
//                           src={
//                             cls.image.startsWith("http")
//                               ? cls.image
//                               : `https://finearts-backend.onrender.com/${cls.image}`
//                           }
//                           alt={cls.title}
//                           className="w-10 h-10 rounded-lg object-cover border border-[#333]"
//                           onError={(e) => {
//                             e.currentTarget.style.display = "none";
//                           }}
//                         />
//                       ) : (
//                         <div className="w-10 h-10 bg-[#26262b] rounded-lg flex items-center justify-center text-gray-600 text-[10px]">
//                           No Img
//                         </div>
//                       )}
//                     </td>

//                     <td className="p-4 text-white text-sm font-medium whitespace-nowrap">
//                       {cls.title || "-"}
//                     </td>

//                     <td className="p-4 text-white text-sm whitespace-nowrap">
//                       {cls.category_name || "N/A"}
//                     </td>

//                     <td className="p-4 text-white text-sm whitespace-nowrap">
//                       {cls.subcategory_name || "N/A"}
//                     </td>

//                     <td className="p-4 whitespace-nowrap">
//                       <span
//                         className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${getLevelStyle(
//                           cls.level
//                         )}`}
//                       >
//                         {cls.level || "-"}
//                       </span>
//                     </td>

//                     <td className="p-4 text-green-400 text-sm font-semibold whitespace-nowrap">
//                       ₹{cls.price ?? 0}
//                     </td>

//                     <td className="p-4 text-white text-sm font-semibold whitespace-nowrap">
//                       {cls.students_count ?? 0}
//                     </td>

//                     <td className="p-4 text-white text-sm whitespace-nowrap">
//                       {cls.created_at
//                         ? new Date(cls.created_at).toLocaleDateString("en-IN", {
//                             day: "2-digit",
//                             month: "short",
//                             year: "numeric",
//                           })
//                         : "-"}
//                     </td>

//                     <td className="p-4">
//                       <div className="flex items-center justify-end gap-2">
//                         <button
//                           onClick={() => handleEdit(cls)}
//                           className="p-2 rounded-lg hover:bg-[#2a2a35] transition-colors group"
//                           title="Edit"
//                         >
//                           <HiPencil
//                             size={16}
//                             className="text-white group-hover:text-white transition-colors"
//                           />
//                         </button>

//                         <button
//                           onClick={() => handleDelete(cls)}
//                           className="p-2 rounded-lg hover:bg-red-500/10 transition-colors group"
//                           title="Delete"
//                         >
//                           <HiTrash
//                             size={16}
//                             className="text-red-500/70 group-hover:text-red-400 transition-colors"
//                           />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* DELETE CLASS MODAL */}
//       <Modal
//         isOpen={openDelete}
//         onClose={() => setOpenDelete(false)}
//         title="Confirm Delete"
//       >
//         <p className="text-gray-300">
//           Are you sure you want to delete this class?
//         </p>
//         <p className="mt-2 font-bold text-white">{deleteClass?.title}</p>
//         <div className="flex justify-end gap-3 mt-6">
//           <Button
//             variant="secondary"
//             onClick={() => setOpenDelete(false)}
//           >
//             Cancel
//           </Button>
//           <Button className="bg-red-500" onClick={confirmDelete}>
//             Delete
//           </Button>
//         </div>
//       </Modal>

//       {/* ADD/EDIT CLASS MODAL */}
//       <Modal
//         isOpen={isModalOpen}
//         onClose={closeModal}
//         title={editingClass ? "Edit Class" : "Add Class"}
//       >
//         <form onSubmit={handleSubmit} className="space-y-1">
//           {/* Class Name */}
//           <div>
//             <label className={labelClass}>Class Name *</label>
//             <input
//               value={formData.title}
//               onChange={(e) =>
//                 setFormData({ ...formData, title: e.target.value })
//               }
//               className={inputClass}
//               placeholder="Enter class name"
//               required
//             />
//           </div>

//           {/* Description */}
//           <div>
//             <label className={labelClass}>Description</label>
//             <textarea
//               value={formData.description}
//               onChange={(e) =>
//                 setFormData({ ...formData, description: e.target.value })
//               }
//               rows="3"
//               className={inputClass}
//               placeholder="Enter description"
//             />
//           </div>

//           {/* Highlights */}
//           <div>
//             <label className={labelClass}>What You'll Learn</label>
//             <textarea
//               rows="4"
//               value={formData.highlights}
//               onChange={(e) =>
//                 setFormData({ ...formData, highlights: e.target.value })
//               }
//               placeholder={`Breathing techniques\nPitch control\nSong practice`}
//               className={inputClass}
//             />
//           </div>

//           {/* Image */}
//           <div>
//             <label className={labelClass}>Class Image</label>
//             {editingClass?.image && (
//               <img
//                 src={
//                   editingClass.image.startsWith("http")
//                     ? editingClass.image
//                     : `https://finearts-backend.onrender.com/${editingClass.image}`
//                 }
//                 alt="Current"
//                 className="w-20 h-20 object-cover rounded-xl mb-2 border border-[#333]"
//               />
//             )}
//             <input
//               type="file"
//               accept="image/*"
//               onChange={(e) =>
//                 setFormData({ ...formData, image: e.target.files[0] })
//               }
//               className="w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-500/20 file:text-purple-300 hover:file:bg-purple-500/30"
//             />
//           </div>

//           {/* Category & Subcategory */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className={labelClass}>Category *</label>
//               <select
//                 value={formData.category_id}
//                 onChange={(e) =>
//                   setFormData({
//                     ...formData,
//                     category_id: e.target.value,
//                     subcategory_id: "",
//                   })
//                 }
//                 className={selectClass}
//                 required
//               >
//                 <option value="">Select Category</option>
//                 {categories?.map((cat) => (
//                   <option key={cat.id} value={cat.id}>
//                     {cat.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className={labelClass}>Subcategory</label>
//               <select
//                 value={formData.subcategory_id}
//                 onChange={(e) =>
//                   setFormData({ ...formData, subcategory_id: e.target.value })
//                 }
//                 disabled={!formData.category_id}
//                 className={`${selectClass} disabled:opacity-50`}
//               >
//                 <option value="">Select Subcategory</option>
//                 {subcategories
//                   ?.filter(
//                     (s) =>
//                       String(s.category_id) === String(formData.category_id)
//                   )
//                   .map((sub) => (
//                     <option key={sub.id} value={sub.id}>
//                       {sub.name}
//                     </option>
//                   ))}
//               </select>
//             </div>
//           </div>

//           {/* Price & Duration */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className={labelClass}>Price</label>
//               <input
//                 type="number"
//                 value={formData.price}
//                 onChange={(e) =>
//                   setFormData({ ...formData, price: e.target.value })
//                 }
//                 className={inputClass}
//                 placeholder="0"
//               />
//             </div>
//             <div>
//               <label className={labelClass}>Duration (Minutes)</label>
//               <input
//                 type="number"
//                 value={formData.duration}
//                 onChange={(e) =>
//                   setFormData({ ...formData, duration: e.target.value })
//                 }
//                 className={inputClass}
//                 placeholder="60"
//               />
//             </div>
//           </div>

//           {/* Course Start Date & End Date */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className={labelClass}>Course Start Date</label>
//               <input
//                 type="date"
//                 value={formData.course_start_date}
//                 onChange={(e) =>
//                   setFormData({
//                     ...formData,
//                     course_start_date: e.target.value,
//                   })
//                 }
//                 className={inputClass}
//               />
//             </div>
//             <div>
//               <label className={labelClass}>Course End Date</label>
//               <input
//                 type="date"
//                 value={formData.course_end_date}
//                 onChange={(e) =>
//                   setFormData({
//                     ...formData,
//                     course_end_date: e.target.value,
//                   })
//                 }
//                 className={inputClass}
//               />
//             </div>
//           </div>

//           {/* Default Start Time & End Time */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className={labelClass}>Default Start Time</label>
//               <input
//                 type="time"
//                 value={formData.start_time}
//                 onChange={(e) =>
//                   setFormData({ ...formData, start_time: e.target.value })
//                 }
//                 className={inputClass}
//               />
//             </div>
//             <div>
//               <label className={labelClass}>Default End Time</label>
//               <input
//                 type="time"
//                 value={formData.end_time}
//                 onChange={(e) =>
//                   setFormData({ ...formData, end_time: e.target.value })
//                 }
//                 className={inputClass}
//               />
//             </div>
//           </div>

//           {/* Available Days Checkboxes */}
//           <div>
//             <label className={labelClass}>Available Days</label>
//             <div className="mt-2 mb-4 grid grid-cols-4 sm:grid-cols-7 gap-2">
//               {DAYS_LIST.map((day) => {
//                 const isChecked = formData.available_days.includes(day.value);
//                 return (
//                   <label
//                     key={day.value}
//                     className={`flex items-center justify-center gap-1.5 p-2.5 rounded-xl cursor-pointer text-xs font-medium transition-all border ${
//                       isChecked
//                         ? "bg-purple-500/20 border-purple-500/50 text-purple-300"
//                         : "bg-[#2b2638] border-transparent text-white hover:border-purple-500/30 hover:text-gray-300"
//                     }`}
//                   >
//                     <input
//                       type="checkbox"
//                       checked={isChecked}
//                       onChange={() => toggleDay(day.value)}
//                       className="sr-only"
//                     />
//                     <span
//                       className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
//                         isChecked
//                           ? "bg-purple-500 border-purple-500"
//                           : "border-gray-500"
//                       }`}
//                     >
//                       {isChecked && (
//                         <svg
//                           className="w-3 h-3 text-white"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                           strokeWidth={3}
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             d="M5 13l4 4L19 7"
//                           />
//                         </svg>
//                       )}
//                     </span>
//                     {day.label.slice(0, 3)}
//                   </label>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Students Count & Max Students */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className={labelClass}>Students Count</label>
//               <input
//                 type="number"
//                 value={formData.students_count}
//                 onChange={(e) =>
//                   setFormData({ ...formData, students_count: e.target.value })
//                 }
//                 className={inputClass}
//                 placeholder="0"
//               />
//             </div>
//             <div>
//               <label className={labelClass}>Max Students</label>
//               <input
//                 type="number"
//                 value={formData.max_students}
//                 onChange={(e) =>
//                   setFormData({ ...formData, max_students: e.target.value })
//                 }
//                 className={inputClass}
//                 placeholder="Unlimited"
//               />
//             </div>
//           </div>

//           {/* Level & Mode */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className={labelClass}>Level</label>
//               <select
//                 value={formData.level}
//                 onChange={(e) =>
//                   setFormData({ ...formData, level: e.target.value })
//                 }
//                 className={selectClass}
//               >
//                 <option value="BEGINNER">Beginner</option>
//                 <option value="INTERMEDIATE">Intermediate</option>
//                 <option value="ADVANCED">Advanced</option>
//               </select>
//             </div>
//             <div>
//               <label className={labelClass}>Mode</label>
//               <select
//                 value={formData.mode}
//                 onChange={(e) =>
//                   setFormData({ ...formData, mode: e.target.value })
//                 }
//                 className={selectClass}
//               >
//                 <option value="ONLINE">Online</option>
//                 <option value="OFFLINE">Offline</option>
//                 <option value="HYBRID">Hybrid</option>
//               </select>
//             </div>
//           </div>

//           {/* Buttons */}
//           <div className="flex justify-end gap-3 pt-4 border-t border-[#3a3448]">
//             <button
//               type="button"
//               onClick={closeModal}
//               className="px-5 py-3 rounded-xl border border-gray-600 text-gray-300 hover:bg-[#2b2638] transition-colors"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition-opacity"
//             >
//               {editingClass ? "Update Class" : "Add Class"}
//             </button>
//           </div>
//         </form>
//       </Modal>
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { Edit, Trash2, Search } from "lucide-react";
// import { FaTrash, FaTimes } from "react-icons/fa";

// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import API from "../services/api";

// // =============================================
// // FORMAT TIME HELPER (24h to 12h)
// // =============================================
// const formatTime = (timeStr) => {
//   if (!timeStr) return "-";
//   if (
//     timeStr.includes("AM") ||
//     timeStr.includes("PM") ||
//     timeStr.includes("am") ||
//     timeStr.includes("pm")
//   )
//     return timeStr;
//   const [hours, minutes] = timeStr.split(":");
//   const h = parseInt(hours, 10);
//   const m = minutes?.split(":")[0] || "00";
//   const period = h >= 12 ? "PM" : "AM";
//   const h12 = h % 12 || 12;
//   return `${h12}:${m.padStart(2, "0")} ${period}`;
// };

// // =============================================
// // FORMAT DATE HELPER
// // =============================================
// const formatDate = (dateStr) => {
//   if (!dateStr) return "-";
//   try {
//     const d = new Date(dateStr);
//     if (isNaN(d.getTime())) return dateStr;
//     return d.toLocaleDateString("en-IN", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     });
//   } catch {
//     return dateStr;
//   }
// };

// // =============================================
// // FORMAT AVAILABLE DAYS HELPER
// // =============================================
// const formatDays = (days) => {
//   if (!days) return "-";
//   let arr = Array.isArray(days) ? days : JSON.parse(days || "[]");
//   if (arr.length === 0) return "-";
//   return arr
//     .map((d) => {
//       const short = {
//         MONDAY: "Mon",
//         TUESDAY: "Tue",
//         WEDNESDAY: "Wed",
//         THURSDAY: "Thu",
//         FRIDAY: "Fri",
//         SATURDAY: "Sat",
//         SUNDAY: "Sun",
//       };
//       return short[d] || d;
//     })
//     .join(", ");
// };

// // =============================================
// // TRUNCATE TEXT HELPER
// // =============================================
// const truncate = (text, maxLen = 40) => {
//   if (!text) return "-";
//   return text.length > maxLen ? text.slice(0, maxLen) + "..." : text;
// };

// // =============================================
// // DAYS LIST FOR CHECKBOXES
// // =============================================
// const DAYS_LIST = [
//   { label: "Monday", value: "MONDAY" },
//   { label: "Tuesday", value: "TUESDAY" },
//   { label: "Wednesday", value: "WEDNESDAY" },
//   { label: "Thursday", value: "THURSDAY" },
//   { label: "Friday", value: "FRIDAY" },
//   { label: "Saturday", value: "SATURDAY" },
//   { label: "Sunday", value: "SUNDAY" },
// ];

// // =============================================
// // STYLES
// // =============================================
// const selectClass =
//   "w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors";
// const inputClass =
//   "w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors";
// const labelClass = "block text-sm text-white mb-1";

// export default function TrainerClasses() {
//   /* ================= CLASS STATES ================= */
//   const [classes, setClasses] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [editingClass, setEditingClass] = useState(null);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [deletingClass, setDeletingClass] = useState(null);

//   /* ================= DROPDOWNS ================= */
//   const [categories, setCategories] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);

//   /* ================= FORM DATA ================= */
//   const defaultForm = {
//     title: "",
//     description: "",
//     highlights: "",
//     image: null,
//     category_id: "",
//     subcategory_id: "",
//     price: "",
//     duration: "",
//     level: "BEGINNER",
//     mode: "ONLINE",
//     max_students: "",
//     students_count: "",
//     course_start_date: "",
//     course_end_date: "",
//     start_time: "",
   
//     available_days: [],
//   };

//   const [formData, setFormData] = useState(defaultForm);

//   /* ================= CONFIG ================= */
//   const getConfig = async () => {
//     const auth = getAuth();
//     let token = null;

//     if (auth.currentUser) {
//       token = await auth.currentUser.getIdToken(true);
//     } else {
//       token = localStorage.getItem("token");
//     }

//     return {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };
//   };

//   /* ================= FETCH FUNCTIONS ================= */
//   const fetchClasses = async () => {
//     try {
//       const config = await getConfig();
//       const res = await API.get("/classes/trainer/my-classes", config);
//       setClasses(res?.data?.data || []);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to fetch classes");
//     }
//   };

//   const fetchDropdowns = async () => {
//     try {
//       const config = await getConfig();
//       const [categoryRes, subcategoryRes] = await Promise.all([
//         API.get("/categories", config),
//         API.get("/subcategories", config),
//       ]);

//       setCategories(categoryRes.data.data || []);
//       setSubcategories(subcategoryRes.data.data || []);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   /* ================= USEEFFECT ================= */
//   useEffect(() => {
//     const auth = getAuth();
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         fetchClasses();
//         fetchDropdowns();
//       } else {
//         console.log("User is not authenticated");
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   /* ================= FILTERED CLASSES ================= */
//   const filteredClasses = classes.filter((cls) => {
//     const query = searchQuery.toLowerCase();
//     return (
//       cls.title?.toLowerCase().includes(query) ||
//       cls.description?.toLowerCase().includes(query) ||
//       cls.highlights?.toLowerCase().includes(query) ||
//       cls.category_name?.toLowerCase().includes(query) ||
//       cls.subcategory_name?.toLowerCase().includes(query) ||
//       cls.level?.toLowerCase().includes(query) ||
//       cls.mode?.toLowerCase().includes(query) ||
//       String(cls.id).includes(query) ||
//       String(cls.price).includes(query) ||
//       String(cls.duration).includes(query)
//     );
//   });

//   /* ================= IMAGE HELPER ================= */
//   const getImageUrl = (item) => {
//     if (!item) return "";
//     if (typeof item === "string") {
//       if (item.startsWith("http")) return item;
//       return `https://finearts-backend.onrender.com${item}`;
//     }
//     if (item.startsWith("http")) return item;
//     return `https://finearts-backend.onrender.com${item}`;
//   };

//   /* ================= TOGGLE DAY HELPER ================= */
//   const toggleDay = (dayValue) => {
//     setFormData((prev) => {
//       const exists = prev.available_days.includes(dayValue);
//       return {
//         ...prev,
//         available_days: exists
//           ? prev.available_days.filter((d) => d !== dayValue)
//           : [...prev.available_days, dayValue],
//       };
//     });
//   };

//   /* ================= CLASS HANDLERS ================= */
//   const handleDelete = (cls) => {
//     setDeletingClass(cls);
//     setShowDeleteModal(true);
//   };

//   const confirmDelete = async () => {
//     if (!deletingClass) return;
//     try {
//       const config = await getConfig();
//       await API.delete(`/classes/trainer/${deletingClass.id}`, config);
//       toast.success("Class deleted successfully");
//       fetchClasses();
//     } catch (err) {
//       toast.error(err?.response?.data?.message || "Delete failed");
//     } finally {
//       setShowDeleteModal(false);
//       setDeletingClass(null);
//     }
//   };

//   const handleEdit = (cls) => {
//     setEditingClass(cls);
//     setFormData({
//       title: cls.title || "",
//       description: cls.description || "",
//       highlights: cls.highlights || "",
//       category_id: cls.category_id || "",
//       subcategory_id: cls.subcategory_id || "",
//       price: cls.price || "",
//       duration: cls.duration || "",
//       level: cls.level || "BEGINNER",
//       mode: cls.mode || "ONLINE",
//       max_students: cls.max_students || "",
//       students_count: cls.students_count || "",
//       course_start_date: cls.course_start_date || "",
//       course_end_date: cls.course_end_date || "",
//       start_time: cls.default_start_time || cls.start_time || "",
     
//       available_days: cls.available_days
//         ? Array.isArray(cls.available_days)
//           ? cls.available_days
//           : JSON.parse(cls.available_days || "[]")
//         : [],
//       image: null,
//     });
//     setShowModal(true);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.title?.trim()) {
//       toast.error("Class Name is required");
//       return;
//     }
//     if (!formData.category_id) {
//       toast.error("Please select a Category");
//       return;
//     }

//     const payload = new FormData();
//     payload.append("title", formData.title.trim());
//     payload.append("description", formData.description?.trim() || "");
//     payload.append("highlights", formData.highlights || "");
//     payload.append("category_id", formData.category_id);

//     if (formData.subcategory_id) {
//       payload.append("subcategory_id", formData.subcategory_id);
//     }

//     payload.append("students_count", formData.students_count || 0);
//     payload.append("price", formData.price || 0);
//     payload.append("duration", formData.duration || 60);
//     payload.append("level", formData.level || "BEGINNER");
//     payload.append("mode", formData.mode || "ONLINE");

//     if (formData.max_students) {
//       payload.append("max_students", formData.max_students);
//     }
//     if (formData.image) {
//       payload.append("image", formData.image);
//     }

//     if (formData.course_start_date)
//       payload.append("start_date", formData.course_start_date);
//     if (formData.course_end_date)
//       payload.append("end_date", formData.course_end_date);
//     if (formData.start_time)
//       payload.append("default_start_time", formData.start_time);
  

//     formData.available_days.forEach((day) => {
//       payload.append("available_days[]", day);
//     });

//     try {
//       const config = await getConfig();

//       if (editingClass?.id) {
//         await API.put(`/classes/trainer/${editingClass.id}`, payload, {
//           headers: {
//             ...config.headers,
//             "Content-Type": "multipart/form-data",
//           },
//         });
//         toast.success("Class updated successfully");
//       } else {
//         await API.post("/classes/trainer/create", payload, {
//           headers: {
//             ...config.headers,
//             "Content-Type": "multipart/form-data",
//           },
//         });
//         toast.success("Class created successfully");
//       }

//       fetchClasses();
//       closeModal();
//     } catch (err) {
//       console.log("Backend Error:", err.response?.data);
//       toast.error(err?.response?.data?.message || "Something went wrong");
//     }
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setEditingClass(null);
//     setFormData(defaultForm);
//   };

//   /* ================= MODE BADGE COLOR ================= */
//   const getModeColor = (mode) => {
//     switch (mode) {
//       case "ONLINE":
//         return "bg-blue-500/20 text-blue-300";
//       case "OFFLINE":
//         return "bg-orange-500/20 text-orange-300";
//       case "HYBRID":
//         return "bg-green-500/20 text-green-300";
//       default:
//         return "bg-gray-500/20 text-gray-300";
//     }
//   };

//   const totalColumns = 18;

//   /* ================= JSX ================= */
//   return (
//     <div className="p-8 text-white">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//         <div>
//           <h1 className="text-4xl font-bold text-purple-400">
//             Trainer Classes
//           </h1>
//           <p className="text-white mt-2">Manage your classes</p>
//         </div>

//         <button
//           onClick={() => setShowModal(true)}
//           className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition-opacity"
//         >
//           + Add Class
//         </button>
//       </div>

//       {/* Full-width Search Bar */}
//       <div className="mb-6">
//         <div className="relative w-full">
//           <Search
//             className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
//             size={18}
//           />
//           <input
//             type="text"
//             placeholder="Search by name, description, highlights, category, level, mode..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full pl-12 pr-10 py-3.5 rounded-xl bg-[#151519] border border-[#2c2c35] text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/60 transition-colors text-sm"
//           />
//           {searchQuery && (
//             <button
//               onClick={() => setSearchQuery("")}
//               className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
//             >
//               <FaTimes size={14} />
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Table */}
//       <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-[#202027] text-white">
//               <tr>
//                 <th className="p-4 text-left whitespace-nowrap">ID</th>
//                 <th className="p-4 text-left whitespace-nowrap">Image</th>
//                 <th className="p-4 text-left whitespace-nowrap">Class Name</th>
//                 <th className="p-4 text-left whitespace-nowrap">Description</th>
//                 <th className="p-4 text-left whitespace-nowrap">Category</th>
//                 <th className="p-4 text-left whitespace-nowrap">Subcategory</th>
//                 <th className="p-4 text-left whitespace-nowrap">Level</th>
//                 <th className="p-4 text-left whitespace-nowrap">Mode</th>
//                 <th className="p-4 text-left whitespace-nowrap">Price</th>
//                 <th className="p-4 text-left whitespace-nowrap">Duration</th>
//                 <th className="p-4 text-left whitespace-nowrap">Students</th>
//                 <th className="p-4 text-left whitespace-nowrap">Start Date</th>
//                 <th className="p-4 text-left whitespace-nowrap">End Date</th>
//                 <th className="p-4 text-left whitespace-nowrap">Start Time</th>
                
//                 <th className="p-4 text-left whitespace-nowrap">
//                   Available Days
//                 </th>
//                 <th className="p-4 text-left whitespace-nowrap">Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {filteredClasses.length === 0 ? (
//                 <tr>
//                   <td colSpan={totalColumns} className="p-12 text-center">
//                     <div className="flex flex-col items-center gap-3">
//                       <Search size={40} className="text-gray-600" />
//                       <p className="text-gray-500 text-lg">
//                         {searchQuery
//                           ? "No classes found matching your search"
//                           : "No classes available"}
//                       </p>
//                       {searchQuery && (
//                         <button
//                           onClick={() => setSearchQuery("")}
//                           className="text-purple-400 hover:text-purple-300 text-sm mt-1 transition-colors"
//                         >
//                           Clear search
//                         </button>
//                       )}
//                     </div>
//                   </td>
//                 </tr>
//               ) : (
//                 filteredClasses.map((cls) => (
//                   <tr
//                     key={cls.id}
//                     className="border-t border-[#2c2c35] hover:bg-[#1a1a20] transition-colors"
//                   >
//                     {/* ID */}
//                     <td className="p-4 text-white whitespace-nowrap">
//                       {cls.id}
//                     </td>

//                     {/* Image */}
//                     <td className="p-4">
//                       {cls.image ? (
//                         <img
//                           src={getImageUrl(cls.image)}
//                           alt={cls.title}
//                           className="w-11 h-11 rounded-xl object-cover border border-[#333]"
//                           onError={(e) => {
//                             e.currentTarget.style.display = "none";
//                           }}
//                         />
//                       ) : (
//                         <div className="w-11 h-11 bg-[#26262b] rounded-xl flex items-center justify-center text-gray-600 text-xs">
//                           N/A
//                         </div>
//                       )}
//                     </td>

//                     {/* Class Name */}
//                     <td className="p-4 font-medium whitespace-nowrap">
//                       {cls.title}
//                     </td>

//                     {/* Description */}
//                     <td
//                       className="p-4 text-white max-w-[130px] truncate"
//                       title={cls.description || ""}
//                     >
//                       {truncate(cls.description, 30)}
//                     </td>

//                     {/* Category */}
//                     <td className="p-4 text-white whitespace-nowrap">
//                       {cls.category_name || "-"}
//                     </td>

//                     {/* Subcategory */}
//                     <td className="p-4 text-white whitespace-nowrap">
//                       {cls.subcategory_name || "-"}
//                     </td>

//                     {/* Level */}
//                     <td className="p-4 whitespace-nowrap">
//                       <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300">
//                         {cls.level || "-"}
//                       </span>
//                     </td>

//                     {/* Mode */}
//                     <td className="p-4 whitespace-nowrap">
//                       <span
//                         className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getModeColor(
//                           cls.mode
//                         )}`}
//                       >
//                         {cls.mode || "-"}
//                       </span>
//                     </td>

//                     {/* Price */}
//                     <td className="p-4 font-semibold whitespace-nowrap">
//                       ₹{cls.price ?? 0}
//                     </td>

//                     {/* Duration */}
//                     <td className="p-4 text-white whitespace-nowrap">
//                       {cls.duration ? `${cls.duration} min` : "-"}
//                     </td>

//                     {/* Students */}
//                     <td className="p-4 font-semibold whitespace-nowrap">
//                       {cls.students_count ?? 0}
//                     </td>

//                     {/* Start Date */}
//                     <td className="p-4 text-white whitespace-nowrap">
//                       {formatDate(cls.start_date)}
//                     </td>

//                     {/* End Date */}
//                     <td className="p-4 text-white whitespace-nowrap">
//                       {formatDate(cls.end_date)}
//                     </td>

//                     {/* Start Time */}
//                     <td className="p-4 text-white whitespace-nowrap">
//                       {formatTime(cls.default_start_time || cls.start_time)}
//                     </td>

//                     {/* End Time */}
//                     <td className="p-4 text-white whitespace-nowrap">
//                       {formatTime(cls.default_end_time || cls.end_time)}
//                     </td>

//                     {/* Available Days */}
//                     <td
//                       className="p-4 text-white whitespace-nowrap"
//                       title={formatDays(cls.available_days)}
//                     >
//                       {formatDays(cls.available_days)}
//                     </td>

//                     {/* Actions */}
//                     <td className="p-4">
//                       <div className="flex items-center gap-2">
//                         <button
//                           onClick={() => handleEdit(cls)}
//                           className="p-2 rounded-lg hover:bg-[#2a2a35] transition-colors group"
//                           title="Edit"
//                         >
//                           <Edit
//                             size={16}
//                             className="text-white group-hover:text-white transition-colors"
//                           />
//                         </button>
//                         <button
//                           onClick={() => handleDelete(cls)}
//                           className="p-2 rounded-lg hover:bg-red-500/10 transition-colors group"
//                           title="Delete"
//                         >
//                           <Trash2
//                             size={16}
//                             className="text-red-500/70 group-hover:text-red-400 transition-colors"
//                           />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* ==================== Add/Edit Class Modal ==================== */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
//           <div className="w-full max-w-[650px] max-h-[90vh] bg-[#211c30] rounded-2xl overflow-hidden shadow-2xl">
//             {/* Header */}
//             <div className="flex justify-between items-center p-6 border-b border-[#3a3448]">
//               <h2 className="text-2xl font-bold text-white">
//                 {editingClass ? "Edit Class" : "Add Class"}
//               </h2>
//               <button
//                 onClick={closeModal}
//                 className="text-white hover:text-white transition-colors"
//               >
//                 <FaTimes size={20} />
//               </button>
//             </div>

//             {/* Scrollable Body */}
//             <div className="overflow-y-auto max-h-[75vh] p-6">
//               <form onSubmit={handleSubmit} className="space-y-1">
//                 {/* Class Name */}
//                 <div>
//                   <label className={labelClass}>Class Name *</label>
//                   <input
//                     value={formData.title}
//                     onChange={(e) =>
//                       setFormData({ ...formData, title: e.target.value })
//                     }
//                     className={inputClass}
//                     placeholder="Enter class name"
//                     required
//                   />
//                 </div>

//                 {/* Description */}
//                 <div>
//                   <label className={labelClass}>Description</label>
//                   <textarea
//                     value={formData.description}
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         description: e.target.value,
//                       })
//                     }
//                     rows="3"
//                     className={inputClass}
//                     placeholder="Enter description"
//                   />
//                 </div>

//                 {/* Image */}
//                 <div>
//                   <label className={labelClass}>Class Image</label>
//                   {editingClass?.image && (
//                     <img
//                       src={getImageUrl(editingClass.image)}
//                       alt="Current"
//                       className="w-20 h-20 object-cover rounded-xl mb-2 border border-[#333]"
//                     />
//                   )}
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) =>
//                       setFormData({ ...formData, image: e.target.files[0] })
//                     }
//                     className="w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-500/20 file:text-purple-300 hover:file:bg-purple-500/30"
//                   />
//                 </div>

//                 {/* Category & Subcategory */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className={labelClass}>Category *</label>
//                     <select
//                       value={formData.category_id}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           category_id: e.target.value,
//                           subcategory_id: "",
//                         })
//                       }
//                       className={selectClass}
//                       required
//                     >
//                       <option value="">Select Category</option>
//                       {categories?.map((cat) => (
//                         <option key={cat.id} value={cat.id}>
//                           {cat.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div>
//                     <label className={labelClass}>Subcategory</label>
//                     <select
//                       value={formData.subcategory_id}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           subcategory_id: e.target.value,
//                         })
//                       }
//                       disabled={!formData.category_id}
//                       className={`${selectClass} disabled:opacity-50`}
//                     >
//                       <option value="">Select Subcategory</option>
//                       {subcategories
//                         ?.filter(
//                           (s) =>
//                             String(s.category_id) ===
//                             String(formData.category_id)
//                         )
//                         .map((sub) => (
//                           <option key={sub.id} value={sub.id}>
//                             {sub.name}
//                           </option>
//                         ))}
//                     </select>
//                   </div>
//                 </div>

//                 {/* Price & Duration */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className={labelClass}>Price</label>
//                     <input
//                       type="number"
//                       value={formData.price}
//                       onChange={(e) =>
//                         setFormData({ ...formData, price: e.target.value })
//                       }
//                       className={inputClass}
//                       placeholder="0"
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Duration (Minutes)</label>
//                     <input
//                       type="number"
//                       value={formData.duration}
//                       onChange={(e) =>
//                         setFormData({ ...formData, duration: e.target.value })
//                       }
//                       className={inputClass}
//                       placeholder="60"
//                     />
//                   </div>
//                 </div>

//                 {/* Course Start Date & End Date */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className={labelClass}>Course Start Date</label>
//                     <input
//                       type="date"
//                       value={formData.course_start_date}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           course_start_date: e.target.value,
//                         })
//                       }
//                       className={inputClass}
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Course End Date</label>
//                     <input
//                       type="date"
//                       value={formData.course_end_date}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           course_end_date: e.target.value,
//                         })
//                       }
//                       className={inputClass}
//                     />
//                   </div>
//                 </div>

//                 {/* Start Time & End Time */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className={labelClass}>Start Time</label>
//                     <input
//                       type="time"
//                       value={formData.start_time}
//                       onChange={(e) =>
//                         setFormData({ ...formData, start_time: e.target.value })
//                       }
//                       className={inputClass}
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>End Time</label>
//                     <input
//                       type="time"
//                       value={formData.end_time}
//                       onChange={(e) =>
//                         setFormData({ ...formData, end_time: e.target.value })
//                       }
//                       className={inputClass}
//                     />
//                   </div>
//                 </div>

//                 {/* Available Days Checkboxes */}
//                 <div>
//                   <label className={labelClass}>Available Days</label>
//                   <div className="mt-2 mb-4 grid grid-cols-4 sm:grid-cols-7 gap-2">
//                     {DAYS_LIST.map((day) => {
//                       const isChecked = formData.available_days.includes(
//                         day.value
//                       );
//                       return (
//                         <label
//                           key={day.value}
//                           className={`
//                             flex items-center justify-center gap-1.5 p-2.5 rounded-xl cursor-pointer text-xs font-medium transition-all border
//                             ${
//                               isChecked
//                                 ? "bg-purple-500/20 border-purple-500/50 text-purple-300"
//                                 : "bg-[#2b2638] border-transparent text-white hover:border-purple-500/30 hover:text-gray-300"
//                             }
//                           `}
//                         >
//                           <input
//                             type="checkbox"
//                             checked={isChecked}
//                             onChange={() => toggleDay(day.value)}
//                             className="sr-only"
//                           />
//                           <span
//                             className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
//                               isChecked
//                                 ? "bg-purple-500 border-purple-500"
//                                 : "border-gray-500"
//                             }`}
//                           >
//                             {isChecked && (
//                               <svg
//                                 className="w-3 h-3 text-white"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 stroke="currentColor"
//                                 strokeWidth={3}
//                               >
//                                 <path
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                   d="M5 13l4 4L19 7"
//                                 />
//                               </svg>
//                             )}
//                           </span>
//                           {day.label.slice(0, 3)}
//                         </label>
//                       );
//                     })}
//                   </div>
//                 </div>

//                 {/* Students Count & Max Students */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className={labelClass}>Students Count</label>
//                     <input
//                       type="number"
//                       value={formData.students_count}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           students_count: e.target.value,
//                         })
//                       }
//                       className={inputClass}
//                       placeholder="0"
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Max Students</label>
//                     <input
//                       type="number"
//                       value={formData.max_students}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           max_students: e.target.value,
//                         })
//                       }
//                       className={inputClass}
//                       placeholder="Unlimited"
//                     />
//                   </div>
//                 </div>

//                 {/* Level & Mode */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className={labelClass}>Level</label>
//                     <select
//                       value={formData.level}
//                       onChange={(e) =>
//                         setFormData({ ...formData, level: e.target.value })
//                       }
//                       className={selectClass}
//                     >
//                       <option value="BEGINNER">Beginner</option>
//                       <option value="INTERMEDIATE">Intermediate</option>
//                       <option value="ADVANCED">Advanced</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className={labelClass}>Mode</label>
//                     <select
//                       value={formData.mode}
//                       onChange={(e) =>
//                         setFormData({ ...formData, mode: e.target.value })
//                       }
//                       className={selectClass}
//                     >
//                       <option value="ONLINE">Online</option>
//                       <option value="OFFLINE">Offline</option>
//                       <option value="HYBRID">Hybrid</option>
//                     </select>
//                   </div>
//                 </div>

//                 {/* Buttons */}
//                 <div className="flex justify-end gap-3 pt-4 border-t border-[#3a3448]">
//                   <button
//                     type="button"
//                     onClick={closeModal}
//                     className="px-5 py-3 rounded-xl border border-gray-600 text-gray-300 hover:bg-[#2b2638] transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition-opacity"
//                   >
//                     {editingClass ? "Update Class" : "Add Class"}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ==================== Delete Confirmation Modal ==================== */}
//       {showDeleteModal && (
//         <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50">
//           <div className="w-full max-w-[400px] bg-[#1e1b2e] border border-[#2e2a42] rounded-2xl shadow-2xl overflow-hidden">
//             <div className="p-8 flex flex-col items-center">
//               <div className="w-14 h-14 rounded-full bg-red-500/15 flex items-center justify-center mb-5">
//                 <FaTrash className="text-red-400 text-lg" />
//               </div>

//               <h2 className="text-xl font-bold text-white mb-3 text-center">
//                 Delete Class
//               </h2>

//               <p className="text-white text-center text-sm leading-relaxed mb-2">
//                 Are you sure you want to delete this class?
//               </p>
//               <p className="font-bold text-white text-center text-sm mb-8">
//                 {deletingClass?.title}
//               </p>

//               <div className="flex gap-3 w-full">
//                 <button
//                   onClick={() => {
//                     setShowDeleteModal(false);
//                     setDeletingClass(null);
//                   }}
//                   className="flex-1 px-5 py-3 rounded-xl border border-[#3a3650] text-gray-300 hover:bg-[#2a2640] transition-colors font-medium text-sm"
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   onClick={confirmDelete}
//                   className="flex-1 px-5 py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold hover:opacity-90 transition-opacity text-sm"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { Edit, Trash2, Search } from "lucide-react";
// import { FaTrash, FaTimes } from "react-icons/fa";
// import { getAuth, onAuthStateChanged } from "firebase/auth";

// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { TimePicker } from "@mui/x-date-pickers/TimePicker";
// import dayjs from "dayjs";

// import API from "../services/api";

// // =============================================
// // FORMAT TIME HELPER (24h to 12h)
// // =============================================
// const formatTime = (timeStr) => {
//   if (!timeStr) return "-";
//   if (
//     timeStr.includes("AM") ||
//     timeStr.includes("PM") ||
//     timeStr.includes("am") ||
//     timeStr.includes("pm")
//   )
//     return timeStr;
//   const [hours, minutes] = timeStr.split(":");
//   const h = parseInt(hours, 10);
//   const m = minutes?.split(":")[0] || "00";
//   const period = h >= 12 ? "PM" : "AM";
//   const h12 = h % 12 || 12;
//   return `${h12}:${m.padStart(2, "0")} ${period}`;
// };

// // =============================================
// // FORMAT DATE HELPER
// // =============================================
// const formatDate = (dateStr) => {
//   if (!dateStr) return "-";
//   try {
//     const d = new Date(dateStr);
//     if (isNaN(d.getTime())) return dateStr;
//     return d.toLocaleDateString("en-IN", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     });
//   } catch {
//     return dateStr;
//   }
// };

// // =============================================
// // FORMAT AVAILABLE DAYS HELPER
// // =============================================
// const formatDays = (days) => {
//   if (!days) return "-";
//   let arr = Array.isArray(days) ? days : JSON.parse(days || "[]");
//   if (arr.length === 0) return "-";
//   return arr
//     .map((d) => {
//       const short = {
//         MONDAY: "Mon",
//         TUESDAY: "Tue",
//         WEDNESDAY: "Wed",
//         THURSDAY: "Thu",
//         FRIDAY: "Fri",
//         SATURDAY: "Sat",
//         SUNDAY: "Sun",
//       };
//       return short[d] || d;
//     })
//     .join(", ");
// };

// // =============================================
// // TRUNCATE TEXT HELPER
// // =============================================
// const truncate = (text, maxLen = 40) => {
//   if (!text) return "-";
//   return text.length > maxLen ? text.slice(0, maxLen) + "..." : text;
// };

// // =============================================
// // DAYS LIST FOR CHECKBOXES
// // =============================================
// const DAYS_LIST = [
//   { label: "Monday", value: "MONDAY" },
//   { label: "Tuesday", value: "TUESDAY" },
//   { label: "Wednesday", value: "WEDNESDAY" },
//   { label: "Thursday", value: "THURSDAY" },
//   { label: "Friday", value: "FRIDAY" },
//   { label: "Saturday", value: "SATURDAY" },
//   { label: "Sunday", value: "SUNDAY" },
// ];

// // =============================================
// // STYLES
// // =============================================
// const selectClass =
//   "w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors";
// const inputClass =
//   "w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors";
// const labelClass = "block text-sm text-white mb-1";

// export default function TrainerClasses() {
//   // ================= CLASS STATES =================
//   const [classes, setClasses] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [editingClass, setEditingClass] = useState(null);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [deletingClass, setDeletingClass] = useState(null);

//   // ================= DROPDOWNS =================
//   const [categories, setCategories] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);

//   // ================= FORM DATA =================
//   const defaultForm = {
//     title: "",
//     description: "",
//     highlights: "",
//     image: null,
//     category_id: "",
//     subcategory_id: "",
//     price: "",
//     duration: "",
//     level: "BEGINNER",
//     mode: "ONLINE",
//     students_count: "",
//     course_start_date: "",
//     course_end_date: "",
//     start_time: "",
//     end_time: "",
//     available_days: [],
//   };

//   const [formData, setFormData] = useState(defaultForm);

//   // ================= CONFIG (Firebase) =================
//   const getConfig = async () => {
//     const auth = getAuth();
//     let token = null;

//     if (auth.currentUser) {
//       token = await auth.currentUser.getIdToken(true);
//     } else {
//       token = localStorage.getItem("token");
//     }

//     return {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };
//   };

//   // ================= FILTERED CLASSES =================
//   const filteredClasses = classes.filter((cls) => {
//     const query = searchQuery.toLowerCase();
//     return (
//       cls.title?.toLowerCase().includes(query) ||
//       cls.description?.toLowerCase().includes(query) ||
//       cls.highlights?.toLowerCase().includes(query) ||
//       cls.category_name?.toLowerCase().includes(query) ||
//       cls.subcategory_name?.toLowerCase().includes(query) ||
//       cls.level?.toLowerCase().includes(query) ||
//       cls.mode?.toLowerCase().includes(query) ||
//       String(cls.id).includes(query) ||
//       String(cls.price).includes(query) ||
//       String(cls.duration).includes(query)
//     );
//   });

//   // ================= FETCH FUNCTIONS =================
//   const fetchClasses = async () => {
//     try {
//       const config = await getConfig();
//       const res = await API.get("/classes/trainer/my-classes", config);
//       setClasses(res?.data?.data || []);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to fetch classes");
//     }
//   };

//   const fetchDropdowns = async () => {
//     try {
//       const config = await getConfig();
//       const [categoryRes, subcategoryRes] = await Promise.all([
//         API.get("/categories", config),
//         API.get("/subcategories", config),
//       ]);

//       setCategories(categoryRes.data.data || []);
//       setSubcategories(subcategoryRes.data.data || []);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to load dropdown data");
//     }
//   };

//   useEffect(() => {
//     const auth = getAuth();
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         fetchClasses();
//         fetchDropdowns();
//       } else {
//         console.log("User is not authenticated");
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   // ================= IMAGE HELPER =================
//   const getImageUrl = (item) => {
//     if (!item) return "";
//     if (typeof item === "string") {
//       if (item.startsWith("http")) return item;
//       return `https://finearts-backend.onrender.com${item}`;
//     }
//     if (item.startsWith("http")) return item;
//     return `https://finearts-backend.onrender.com${item}`;
//   };

//   // ================= TOGGLE DAY HELPER =================
//   const toggleDay = (dayValue) => {
//     setFormData((prev) => {
//       const exists = prev.available_days.includes(dayValue);
//       return {
//         ...prev,
//         available_days: exists
//           ? prev.available_days.filter((d) => d !== dayValue)
//           : [...prev.available_days, dayValue],
//       };
//     });
//   };

//   // ================= CLASS HANDLERS =================
//   const handleDelete = (cls) => {
//     setDeletingClass(cls);
//     setShowDeleteModal(true);
//   };

//   const confirmDelete = async () => {
//     if (!deletingClass) return;
//     try {
//       const config = await getConfig();
//       await API.delete(`/classes/trainer/${deletingClass.id}`, config);
//       toast.success("Class deleted successfully");
//       fetchClasses();
//     } catch (err) {
//       toast.error(err?.response?.data?.message || "Delete failed");
//     } finally {
//       setShowDeleteModal(false);
//       setDeletingClass(null);
//     }
//   };

//   const handleEdit = (cls) => {
//     setEditingClass(cls);
//     setFormData({
//       title: cls.title || "",
//       description: cls.description || "",
//       highlights: cls.highlights || "",
//       category_id: cls.category_id || "",
//       subcategory_id: cls.subcategory_id || "",
//       price: cls.price || "",
//       duration: cls.duration || "",
//       level: cls.level || "BEGINNER",
//       mode: cls.mode || "ONLINE",
//       students_count: cls.students_count || "",
//       course_start_date: cls.course_start_date || "",
//       start_time: cls.default_start_time || cls.start_time || "",
//       available_days: cls.available_days
//         ? Array.isArray(cls.available_days)
//           ? cls.available_days
//           : JSON.parse(cls.available_days || "[]")
//         : [],
//       image: null,
//     });
//     setShowModal(true);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.title?.trim()) {
//       toast.error("Class Name is required");
//       return;
//     }
//     if (!formData.category_id) {
//       toast.error("Please select a Category");
//       return;
//     }

//     const payload = new FormData();
//     payload.append("title", formData.title.trim());
//     payload.append("description", formData.description?.trim() || "");
//     payload.append("highlights", formData.highlights || "");
//     payload.append("category_id", formData.category_id);
//     if (formData.subcategory_id)
//       payload.append("subcategory_id", formData.subcategory_id);
//     payload.append("students_count", formData.students_count || 0);
//     payload.append("price", formData.price || 0);
//     payload.append("duration", formData.duration || 60);
//     payload.append("level", formData.level || "BEGINNER");
//     payload.append("mode", formData.mode || "ONLINE");
//     if (formData.image) payload.append("image", formData.image);

//     if (formData.course_start_date)
//       payload.append("start_date", formData.course_start_date);
//     if (formData.start_time)
//       payload.append("start_time", formData.start_time);

//     formData.available_days.forEach((day) => {
//       payload.append("available_days[]", day);
//     });

//     try {
//       const config = await getConfig();

//       if (editingClass?.id) {
//         await API.put(`/classes/trainer/${editingClass.id}`, payload, {
//           headers: {
//             ...config.headers,
//             "Content-Type": "multipart/form-data",
//           },
//         });
//         toast.success("Class updated successfully");
//       } else {
//         await API.post("/classes/trainer/create", payload, {
//           headers: {
//             ...config.headers,
//             "Content-Type": "multipart/form-data",
//           },
//         });
//         toast.success("Class created successfully");
//       }

//       fetchClasses();
//       closeModal();
//     } catch (err) {
//       console.log("Backend Error:", err.response?.data);
//       toast.error(err?.response?.data?.message || "Something went wrong");
//     }
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setEditingClass(null);
//     setFormData(defaultForm);
//   };

//   // ================= MODE BADGE COLOR =================
//   const getModeColor = (mode) => {
//     switch (mode) {
//       case "ONLINE":
//         return "bg-blue-500/20 text-blue-300";
//       case "OFFLINE":
//         return "bg-orange-500/20 text-orange-300";
//       case "HYBRID":
//         return "bg-green-500/20 text-green-300";
//       default:
//         return "bg-gray-500/20 text-gray-300";
//     }
//   };

//   const totalColumns = 15;

//   // ================= JSX =================
//   return (
//     <div className="p-8 text-white">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//         <div>
//           <h1 className="text-4xl font-bold text-purple-400">
//             Trainer Classes
//           </h1>
//           <p className="text-white mt-2">Manage your classes</p>
//         </div>

//         <button
//           onClick={() => setShowModal(true)}
//           className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition-opacity"
//         >
//           + Add Class
//         </button>
//       </div>

//       {/* Full-width Search Bar */}
//       <div className="mb-6">
//         <div className="relative w-full">
//           <Search
//             className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
//             size={18}
//           />
//           <input
//             type="text"
//             placeholder="Search by name, description, highlights, category, level, mode..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full pl-12 pr-10 py-3.5 rounded-xl bg-[#151519] border border-[#2c2c35] text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/60 transition-colors text-sm"
//           />
//           {searchQuery && (
//             <button
//               onClick={() => setSearchQuery("")}
//               className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
//             >
//               <FaTimes size={14} />
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Table */}
//       <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-[#202027] text-white">
//               <tr>
//                 <th className="p-4 text-left whitespace-nowrap">ID</th>
//                 <th className="p-4 text-left whitespace-nowrap">Image</th>
//                 <th className="p-4 text-left whitespace-nowrap">Class Name</th>
//                 <th className="p-4 text-left whitespace-nowrap">Description</th>
//                 <th className="p-4 text-left whitespace-nowrap">Category</th>
//                 <th className="p-4 text-left whitespace-nowrap">Subcategory</th>
//                 <th className="p-4 text-left whitespace-nowrap">Level</th>
//                 <th className="p-4 text-left whitespace-nowrap">Mode</th>
//                 <th className="p-4 text-left whitespace-nowrap">Price</th>
//                 <th className="p-4 text-left whitespace-nowrap">Duration</th>
//                 <th className="p-4 text-left whitespace-nowrap">Students</th>
//                 <th className="p-4 text-left whitespace-nowrap">Start Date</th>
//                 <th className="p-4 text-left whitespace-nowrap">Start Time</th>
//                 <th className="p-4 text-left whitespace-nowrap">
//                   Available Days
//                 </th>
//                 <th className="p-4 text-left whitespace-nowrap">Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {filteredClasses.length === 0 ? (
//                 <tr>
//                   <td colSpan={totalColumns} className="p-12 text-center">
//                     <div className="flex flex-col items-center gap-3">
//                       <Search size={40} className="text-gray-600" />
//                       <p className="text-gray-500 text-lg">
//                         {searchQuery
//                           ? "No classes found matching your search"
//                           : "No classes available"}
//                       </p>
//                       {searchQuery && (
//                         <button
//                           onClick={() => setSearchQuery("")}
//                           className="text-purple-400 hover:text-purple-300 text-sm mt-1 transition-colors"
//                         >
//                           Clear search
//                         </button>
//                       )}
//                     </div>
//                   </td>
//                 </tr>
//               ) : (
//                 filteredClasses.map((cls) => (
//                   <tr
//                     key={cls.id}
//                     className="border-t border-[#2c2c35] hover:bg-[#1a1a20] transition-colors"
//                   >
//                     {/* ID */}
//                     <td className="p-4 text-white whitespace-nowrap">
//                       {cls.id}
//                     </td>

//                     {/* Image */}
//                     <td className="p-4">
//                       {cls.image ? (
//                         <img
//                           src={getImageUrl(cls.image)}
//                           alt={cls.title}
//                           className="w-11 h-11 rounded-xl object-cover border border-[#333]"
//                           onError={(e) => {
//                             e.currentTarget.style.display = "none";
//                           }}
//                         />
//                       ) : (
//                         <div className="w-11 h-11 bg-[#26262b] rounded-xl flex items-center justify-center text-gray-600 text-xs">
//                           N/A
//                         </div>
//                       )}
//                     </td>

//                     {/* Class Name */}
//                     <td className="p-4 font-medium whitespace-nowrap">
//                       {cls.title}
//                     </td>

//                     {/* Description */}
//                     <td
//                       className="p-4 text-white max-w-[130px] truncate"
//                       title={cls.description || ""}
//                     >
//                       {truncate(cls.description, 30)}
//                     </td>

//                     {/* Category */}
//                     <td className="p-4 text-white whitespace-nowrap">
//                       {cls.category_name || "-"}
//                     </td>

//                     {/* Subcategory */}
//                     <td className="p-4 text-white whitespace-nowrap">
//                       {cls.subcategory_name || "-"}
//                     </td>

//                     {/* Level */}
//                     <td className="p-4 whitespace-nowrap">
//                       <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300">
//                         {cls.level || "-"}
//                       </span>
//                     </td>

//                     {/* Mode */}
//                     <td className="p-4 whitespace-nowrap">
//                       <span
//                         className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getModeColor(
//                           cls.mode
//                         )}`}
//                       >
//                         {cls.mode || "-"}
//                       </span>
//                     </td>

//                     {/* Price */}
//                     <td className="p-4 font-semibold whitespace-nowrap">
//                       ₹{cls.price ?? 0}
//                     </td>

//                     {/* Duration */}
//                     <td className="p-4 text-white whitespace-nowrap">
//                       {cls.duration ? `${cls.duration} min` : "-"}
//                     </td>

//                     {/* Students */}
//                     <td className="p-4 font-semibold whitespace-nowrap">
//                       {cls.students_count ?? 0}
//                     </td>

//                     {/* Start Date */}
//                     <td className="p-4 text-white whitespace-nowrap">
//                       {formatDate(cls.start_date)}
//                     </td>

//                     {/* Start Time */}
//                     <td className="p-4 text-white whitespace-nowrap">
//                       {formatTime(cls.start_time)}
//                     </td>

//                     {/* Available Days */}
//                     <td
//                       className="p-4 text-white whitespace-nowrap"
//                       title={formatDays(cls.available_days)}
//                     >
//                       {formatDays(cls.available_days)}
//                     </td>

//                     {/* Actions */}
//                     <td className="p-4">
//                       <div className="flex items-center gap-2">
//                         <button
//                           onClick={() => handleEdit(cls)}
//                           className="p-2 rounded-lg hover:bg-[#2a2a35] transition-colors group"
//                           title="Edit"
//                         >
//                           <Edit
//                             size={16}
//                             className="text-white group-hover:text-white transition-colors"
//                           />
//                         </button>
//                         <button
//                           onClick={() => handleDelete(cls)}
//                           className="p-2 rounded-lg hover:bg-red-500/10 transition-colors group"
//                           title="Delete"
//                         >
//                           <Trash2
//                             size={16}
//                             className="text-red-500/70 group-hover:text-red-400 transition-colors"
//                           />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* ==================== Add/Edit Class Modal ==================== */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
//           <div className="w-full max-w-[650px] max-h-[90vh] bg-[#211c30] rounded-2xl overflow-hidden shadow-2xl">
//             {/* Header */}
//             <div className="flex justify-between items-center p-6 border-b border-[#3a3448]">
//               <h2 className="text-2xl font-bold text-white">
//                 {editingClass ? "Edit Class" : "Add Class"}
//               </h2>
//               <button
//                 onClick={closeModal}
//                 className="text-white hover:text-white transition-colors"
//               >
//                 <FaTimes size={20} />
//               </button>
//             </div>

//             {/* Scrollable Body */}
//             <div className="overflow-y-auto max-h-[75vh] p-6">
//               <form onSubmit={handleSubmit} className="space-y-1">
//                 {/* Class Name */}
//                 <div>
//                   <label className={labelClass}>Class Name *</label>
//                   <input
//                     value={formData.title}
//                     onChange={(e) =>
//                       setFormData({ ...formData, title: e.target.value })
//                     }
//                     className={inputClass}
//                     placeholder="Enter class name"
//                     required
//                   />
//                 </div>

//                 {/* Description */}
//                 <div>
//                   <label className={labelClass}>Description</label>
//                   <textarea
//                     value={formData.description}
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         description: e.target.value,
//                       })
//                     }
//                     rows="3"
//                     className={inputClass}
//                     placeholder="Enter description"
//                   />
//                 </div>

//                 {/* Image */}
//                 <div>
//                   <label className={labelClass}>Class Image</label>
//                   {editingClass?.image && (
//                     <img
//                       src={getImageUrl(editingClass.image)}
//                       alt="Current"
//                       className="w-20 h-20 object-cover rounded-xl mb-2 border border-[#333]"
//                     />
//                   )}
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) =>
//                       setFormData({ ...formData, image: e.target.files[0] })
//                     }
//                     className="w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-500/20 file:text-purple-300 hover:file:bg-purple-500/30"
//                   />
//                 </div>

//                 {/* Category & Subcategory */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className={labelClass}>Category *</label>
//                     <select
//                       value={formData.category_id}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           category_id: e.target.value,
//                           subcategory_id: "",
//                         })
//                       }
//                       className={selectClass}
//                       required
//                     >
//                       <option value="">Select Category</option>
//                       {categories?.map((cat) => (
//                         <option key={cat.id} value={cat.id}>
//                           {cat.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div>
//                     <label className={labelClass}>Subcategory</label>
//                     <select
//                       value={formData.subcategory_id}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           subcategory_id: e.target.value,
//                         })
//                       }
//                       disabled={!formData.category_id}
//                       className={`${selectClass} disabled:opacity-50`}
//                     >
//                       <option value="">Select Subcategory</option>
//                       {subcategories
//                         ?.filter(
//                           (s) =>
//                             String(s.category_id) ===
//                             String(formData.category_id)
//                         )
//                         .map((sub) => (
//                           <option key={sub.id} value={sub.id}>
//                             {sub.name}
//                           </option>
//                         ))}
//                     </select>
//                   </div>
//                 </div>

//                 {/* Price & Duration */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className={labelClass}>Price</label>
//                     <input
//                       type="number"
//                       value={formData.price}
//                       onChange={(e) =>
//                         setFormData({ ...formData, price: e.target.value })
//                       }
//                       className={inputClass}
//                       placeholder="0"
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Duration (Minutes)</label>
//                     <input
//                       type="number"
//                       value={formData.duration}
//                       onChange={(e) =>
//                         setFormData({ ...formData, duration: e.target.value })
//                       }
//                       className={inputClass}
//                       placeholder="60"
//                     />
//                   </div>
//                 </div>

//                 {/* Course Start Date */}
//                 <div>
//                   <label className={labelClass}>Course Start Date</label>
//                   <input
//                     type="date"
//                     value={formData.course_start_date}
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         course_start_date: e.target.value,
//                       })
//                     }
//                     className={inputClass}
//                   />
//                 </div>

//                 {/* Start Time (MUI TimePicker — matches admin) */}
//                 <div>
//                   <label className={labelClass}>Start Time</label>
//                   <LocalizationProvider dateAdapter={AdapterDayjs}>
//                     <TimePicker
//                       label="Start Time"
//                       ampm
//                       value={
//                         formData.start_time
//                           ? dayjs(`2000-01-01 ${formData.start_time}`)
//                           : null
//                       }
//                       onChange={(value) =>
//                         setFormData({
//                           ...formData,
//                           start_time: value ? value.format("HH:mm:ss") : "",
//                         })
//                       }
//                       slotProps={{
//                         textField: {
//                           fullWidth: true,
//                         },
//                       }}
//                     />
//                   </LocalizationProvider>
//                 </div>

//                 {/* Available Days Checkboxes */}
//                 <div>
//                   <label className={labelClass}>Available Days</label>
//                   <div className="mt-2 mb-4 grid grid-cols-4 sm:grid-cols-7 gap-2">
//                     {DAYS_LIST.map((day) => {
//                       const isChecked = formData.available_days.includes(
//                         day.value
//                       );
//                       return (
//                         <label
//                           key={day.value}
//                           className={`
//                             flex items-center justify-center gap-1.5 p-2.5 rounded-xl cursor-pointer text-xs font-medium transition-all border
//                             ${
//                               isChecked
//                                 ? "bg-purple-500/20 border-purple-500/50 text-purple-300"
//                                 : "bg-[#2b2638] border-transparent text-white hover:border-purple-500/30 hover:text-gray-300"
//                             }
//                           `}
//                         >
//                           <input
//                             type="checkbox"
//                             checked={isChecked}
//                             onChange={() => toggleDay(day.value)}
//                             className="sr-only"
//                           />
//                           <span
//                             className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
//                               isChecked
//                                 ? "bg-purple-500 border-purple-500"
//                                 : "border-gray-500"
//                             }`}
//                           >
//                             {isChecked && (
//                               <svg
//                                 className="w-3 h-3 text-white"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 stroke="currentColor"
//                                 strokeWidth={3}
//                               >
//                                 <path
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                   d="M5 13l4 4L19 7"
//                                 />
//                               </svg>
//                             )}
//                           </span>
//                           {day.label.slice(0, 3)}
//                         </label>
//                       );
//                     })}
//                   </div>
//                 </div>

//                 {/* Students Count */}
//                 <div>
//                   <label className={labelClass}>Students Count</label>
//                   <input
//                     type="number"
//                     value={formData.students_count}
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         students_count: e.target.value,
//                       })
//                     }
//                     className={inputClass}
//                     placeholder="0"
//                   />
//                 </div>

//                 {/* Level & Mode */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className={labelClass}>Level</label>
//                     <select
//                       value={formData.level}
//                       onChange={(e) =>
//                         setFormData({ ...formData, level: e.target.value })
//                       }
//                       className={selectClass}
//                     >
//                       <option value="BEGINNER">Beginner</option>
//                       <option value="INTERMEDIATE">Intermediate</option>
//                       <option value="ADVANCED">Advanced</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className={labelClass}>Mode</label>
//                     <select
//                       value={formData.mode}
//                       onChange={(e) =>
//                         setFormData({ ...formData, mode: e.target.value })
//                       }
//                       className={selectClass}
//                     >
//                       <option value="ONLINE">Online</option>
//                       <option value="OFFLINE">Offline</option>
//                       <option value="HYBRID">Hybrid</option>
//                     </select>
//                   </div>
//                 </div>

//                 {/* Buttons */}
//                 <div className="flex justify-end gap-3 pt-4 border-t border-[#3a3448]">
//                   <button
//                     type="button"
//                     onClick={closeModal}
//                     className="px-5 py-3 rounded-xl border border-gray-600 text-gray-300 hover:bg-[#2b2638] transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition-opacity"
//                   >
//                     {editingClass ? "Update Class" : "Add Class"}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ==================== Delete Confirmation Modal ==================== */}
//       {showDeleteModal && (
//         <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50">
//           <div className="w-full max-w-[400px] bg-[#1e1b2e] border border-[#2e2a42] rounded-2xl shadow-2xl overflow-hidden">
//             <div className="p-8 flex flex-col items-center">
//               <div className="w-14 h-14 rounded-full bg-red-500/15 flex items-center justify-center mb-5">
//                 <FaTrash className="text-red-400 text-lg" />
//               </div>

//               <h2 className="text-xl font-bold text-white mb-3 text-center">
//                 Delete Class
//               </h2>

//               <p className="text-white text-center text-sm leading-relaxed mb-8">
//                 Are you sure you want to delete this class?
//               </p>

//               <div className="flex gap-3 w-full">
//                 <button
//                   onClick={() => {
//                     setShowDeleteModal(false);
//                     setDeletingClass(null);
//                   }}
//                   className="flex-1 px-5 py-3 rounded-xl border border-[#3a3650] text-gray-300 hover:bg-[#2a2640] transition-colors font-medium text-sm"
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   onClick={confirmDelete}
//                   className="flex-1 px-5 py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold hover:opacity-90 transition-opacity text-sm"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Edit, Trash2, Search } from "lucide-react";
import { FaTrash, FaTimes } from "react-icons/fa";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";

import API from "../services/api";

// =============================================
// FORMAT TIME HELPER (24h to 12h)
// =============================================
const formatTime = (timeStr) => {
  if (!timeStr) return "-";
  if (
    timeStr.includes("AM") ||
    timeStr.includes("PM") ||
    timeStr.includes("am") ||
    timeStr.includes("pm")
  )
    return timeStr;
  const [hours, minutes] = timeStr.split(":");
  const h = parseInt(hours, 10);
  const m = minutes?.split(":")[0] || "00";
  const period = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;
  return `${h12}:${m.padStart(2, "0")} ${period}`;
};

// =============================================
// FORMAT DATE HELPER
// =============================================
const formatDate = (dateStr) => {
  if (!dateStr) return "-";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
};

// =============================================
// FORMAT AVAILABLE DAYS HELPER
// =============================================
const formatDays = (days) => {
  if (!days) return "-";
  let arr = Array.isArray(days) ? days : JSON.parse(days || "[]");
  if (arr.length === 0) return "-";
  return arr
    .map((d) => {
      const short = {
        MONDAY: "Mon",
        TUESDAY: "Tue",
        WEDNESDAY: "Wed",
        THURSDAY: "Thu",
        FRIDAY: "Fri",
        SATURDAY: "Sat",
        SUNDAY: "Sun",
      };
      return short[d] || d;
    })
    .join(", ");
};

// =============================================
// TRUNCATE TEXT HELPER
// =============================================
const truncate = (text, maxLen = 40) => {
  if (!text) return "-";
  return text.length > maxLen ? text.slice(0, maxLen) + "..." : text;
};

// =============================================
// DAYS LIST FOR CHECKBOXES
// =============================================
const DAYS_LIST = [
  { label: "Monday", value: "MONDAY" },
  { label: "Tuesday", value: "TUESDAY" },
  { label: "Wednesday", value: "WEDNESDAY" },
  { label: "Thursday", value: "THURSDAY" },
  { label: "Friday", value: "FRIDAY" },
  { label: "Saturday", value: "SATURDAY" },
  { label: "Sunday", value: "SUNDAY" },
];

// =============================================
// STYLES
// =============================================
const selectClass =
  "w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors";
const inputClass =
  "w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors";
const labelClass = "block text-sm text-white mb-1";

export default function TrainerClasses() {
  // ================= CLASS STATES =================
  const [classes, setClasses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingClass, setDeletingClass] = useState(null);

  // ================= DROPDOWNS =================
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  // ================= FORM DATA =================
  const defaultForm = {
    title: "",
    description: "",
    highlights: "",
    image: null,
    category_id: "",
    subcategory_id: "",
    price: "",
    duration: "",
    level: "BEGINNER",
    mode: "ONLINE",
    students_count: "",
    course_start_date: "",
    course_end_date: "",
    start_time: "",
    end_time: "",
    available_days: [],
  };

  const [formData, setFormData] = useState(defaultForm);

  // ================= CONFIG (Firebase) =================
  const getConfig = async () => {
    const auth = getAuth();
    let token = null;

    if (auth.currentUser) {
      token = await auth.currentUser.getIdToken(true);
    } else {
      token = localStorage.getItem("token");
    }

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  // ================= FILTERED CLASSES =================
  const filteredClasses = classes.filter((cls) => {
    const query = searchQuery.toLowerCase();
    return (
      cls.title?.toLowerCase().includes(query) ||
      cls.description?.toLowerCase().includes(query) ||
      cls.highlights?.toLowerCase().includes(query) ||
      cls.category_name?.toLowerCase().includes(query) ||
      cls.subcategory_name?.toLowerCase().includes(query) ||
      cls.level?.toLowerCase().includes(query) ||
      cls.mode?.toLowerCase().includes(query) ||
      String(cls.id).includes(query) ||
      String(cls.price).includes(query) ||
      String(cls.duration).includes(query)
    );
  });

  // ================= FETCH FUNCTIONS =================
  const fetchClasses = async () => {
    try {
      const config = await getConfig();
      const res = await API.get("/classes/trainer/my-classes", config);
      setClasses(res?.data?.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch classes");
    }
  };

  const fetchDropdowns = async () => {
    try {
      const config = await getConfig();
      const [categoryRes, subcategoryRes] = await Promise.all([
        API.get("/categories", config),
        API.get("/subcategories", config),
      ]);

      setCategories(categoryRes.data.data || []);
      setSubcategories(subcategoryRes.data.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load dropdown data");
    }
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchClasses();
        fetchDropdowns();
      } else {
        console.log("User is not authenticated");
      }
    });

    return () => unsubscribe();
  }, []);

  // ================= IMAGE HELPER =================
  const getImageUrl = (item) => {
    if (!item) return "";
    if (typeof item === "string") {
      if (item.startsWith("http")) return item;
      return `https://finearts-backend.onrender.com${item}`;
    }
    if (item.startsWith("http")) return item;
    return `https://finearts-backend.onrender.com${item}`;
  };

  // ================= TOGGLE DAY HELPER =================
  const toggleDay = (dayValue) => {
    setFormData((prev) => {
      const exists = prev.available_days.includes(dayValue);
      return {
        ...prev,
        available_days: exists
          ? prev.available_days.filter((d) => d !== dayValue)
          : [...prev.available_days, dayValue],
      };
    });
  };

  // ================= CLASS HANDLERS =================
  const handleDelete = (cls) => {
    setDeletingClass(cls);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!deletingClass) return;
    try {
      const config = await getConfig();
      await API.delete(`/classes/trainer/${deletingClass.id}`, config);
      toast.success("Class deleted successfully");
      fetchClasses();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Delete failed");
    } finally {
      setShowDeleteModal(false);
      setDeletingClass(null);
    }
  };

  const handleEdit = (cls) => {
    setEditingClass(cls);
    setFormData({
      title: cls.title || "",
      description: cls.description || "",
      highlights: cls.highlights || "",
      category_id: cls.category_id || "",
      subcategory_id: cls.subcategory_id || "",
      price: cls.price || "",
      duration: cls.duration || "",
      level: cls.level || "BEGINNER",
      mode: cls.mode || "ONLINE",
      students_count: cls.students_count || "",
      course_start_date: cls.course_start_date || "",
      course_end_date: cls.course_end_date || "",
      start_time: cls.default_start_time || cls.start_time || "",
      available_days: cls.available_days
        ? Array.isArray(cls.available_days)
          ? cls.available_days
          : JSON.parse(cls.available_days || "[]")
        : [],
      image: null,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title?.trim()) {
      toast.error("Class Name is required");
      return;
    }
    if (!formData.category_id) {
      toast.error("Please select a Category");
      return;
    }

    const payload = new FormData();
    payload.append("title", formData.title.trim());
    payload.append("description", formData.description?.trim() || "");
    payload.append("highlights", formData.highlights || "");
    payload.append("category_id", formData.category_id);
    if (formData.subcategory_id)
      payload.append("subcategory_id", formData.subcategory_id);
    payload.append("students_count", formData.students_count || 0);
    payload.append("price", formData.price || 0);
    payload.append("duration", formData.duration || 60);
    payload.append("level", formData.level || "BEGINNER");
    payload.append("mode", formData.mode || "ONLINE");
    if (formData.image) payload.append("image", formData.image);

    if (formData.course_start_date)
      payload.append("start_date", formData.course_start_date);
    if (formData.course_end_date)
      payload.append("end_date", formData.course_end_date);
    if (formData.start_time)
      payload.append("start_time", formData.start_time);

    formData.available_days.forEach((day) => {
      payload.append("available_days[]", day);
    });

    try {
      const config = await getConfig();

      if (editingClass?.id) {
        await API.put(`/classes/trainer/${editingClass.id}`, payload, {
          headers: {
            ...config.headers,
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Class updated successfully");
      } else {
        await API.post("/classes/trainer/create", payload, {
          headers: {
            ...config.headers,
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Class created successfully");
      }

      fetchClasses();
      closeModal();
    } catch (err) {
      console.log("Backend Error:", err.response?.data);
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingClass(null);
    setFormData(defaultForm);
  };

  // ================= MODE BADGE COLOR =================
  const getModeColor = (mode) => {
    switch (mode) {
      case "ONLINE":
        return "bg-blue-500/20 text-blue-300";
      case "OFFLINE":
        return "bg-orange-500/20 text-orange-300";
      case "HYBRID":
        return "bg-green-500/20 text-green-300";
      default:
        return "bg-gray-500/20 text-gray-300";
    }
  };

  const totalColumns = 16;

  // ================= JSX =================
  return (
    <div className="p-8 text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-4xl font-bold text-purple-400">
            Trainer Classes
          </h1>
          <p className="text-white mt-2">Manage your classes</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition-opacity"
        >
          + Add Class
        </button>
      </div>

      {/* Full-width Search Bar */}
      <div className="mb-6">
        <div className="relative w-full">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white pointer-events-none"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by name, description, highlights, category, level, mode..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-10 py-3.5 rounded-xl bg-[#151519] border border-[#2c2c35] text-white placeholder-white focus:outline-none focus:border-purple-500/60 transition-colors text-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
            >
              <FaTimes size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#202027] text-white">
              <tr>
                <th className="p-4 text-left whitespace-nowrap">ID</th>
                <th className="p-4 text-left whitespace-nowrap">Image</th>
                <th className="p-4 text-left whitespace-nowrap">Class Name</th>
                <th className="p-4 text-left whitespace-nowrap">Description</th>
                <th className="p-4 text-left whitespace-nowrap">Category</th>
                <th className="p-4 text-left whitespace-nowrap">Subcategory</th>
                <th className="p-4 text-left whitespace-nowrap">Level</th>
                <th className="p-4 text-left whitespace-nowrap">Mode</th>
                <th className="p-4 text-left whitespace-nowrap">Price</th>
                <th className="p-4 text-left whitespace-nowrap">Duration</th>
                <th className="p-4 text-left whitespace-nowrap">Students</th>
                <th className="p-4 text-left whitespace-nowrap">Start Date</th>
                <th className="p-4 text-left whitespace-nowrap">End Date</th>
                <th className="p-4 text-left whitespace-nowrap">Start Time</th>
                <th className="p-4 text-left whitespace-nowrap">
                  Available Days
                </th>
                <th className="p-4 text-left whitespace-nowrap">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredClasses.length === 0 ? (
                <tr>
                  <td colSpan={totalColumns} className="p-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <Search size={40} className="text-gray-600" />
                      <p className="text-gray-500 text-lg">
                        {searchQuery
                          ? "No classes found matching your search"
                          : "No classes available"}
                      </p>
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery("")}
                          className="text-purple-400 hover:text-purple-300 text-sm mt-1 transition-colors"
                        >
                          Clear search
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                filteredClasses.map((cls) => (
                  <tr
                    key={cls.id}
                    className="border-t border-[#2c2c35] hover:bg-[#1a1a20] transition-colors"
                  >
                    {/* ID */}
                    <td className="p-4 text-white whitespace-nowrap">
                      {cls.id}
                    </td>

                    {/* Image */}
                    <td className="p-4">
                      {cls.image ? (
                        <img
                          src={getImageUrl(cls.image)}
                          alt={cls.title}
                          className="w-11 h-11 rounded-xl object-cover border border-[#333]"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      ) : (
                        <div className="w-11 h-11 bg-[#26262b] rounded-xl flex items-center justify-center text-gray-600 text-xs">
                          N/A
                        </div>
                      )}
                    </td>

                    {/* Class Name */}
                    <td className="p-4 font-medium whitespace-nowrap">
                      {cls.title}
                    </td>

                    {/* Description */}
                    <td
                      className="p-4 text-white max-w-[130px] truncate"
                      title={cls.description || ""}
                    >
                      {truncate(cls.description, 30)}
                    </td>

                    {/* Category */}
                    <td className="p-4 text-white whitespace-nowrap">
                      {cls.category_name || "-"}
                    </td>

                    {/* Subcategory */}
                    <td className="p-4 text-white whitespace-nowrap">
                      {cls.subcategory_name || "-"}
                    </td>

                    {/* Level */}
                    <td className="p-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300">
                        {cls.level || "-"}
                      </span>
                    </td>

                    {/* Mode */}
                    <td className="p-4 whitespace-nowrap">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getModeColor(
                          cls.mode
                        )}`}
                      >
                        {cls.mode || "-"}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="p-4 font-semibold whitespace-nowrap">
                      ₹{cls.price ?? 0}
                    </td>

                    {/* Duration */}
                    <td className="p-4 text-white whitespace-nowrap">
                      {cls.duration ? `${cls.duration} min` : "-"}
                    </td>

                    {/* Students */}
                    <td className="p-4 font-semibold whitespace-nowrap">
                      {cls.students_count ?? 0}
                    </td>

                    {/* Start Date */}
                    <td className="p-4 text-white whitespace-nowrap">
                      {formatDate(cls.start_date)}
                    </td>

                    {/* End Date */}
                    <td className="p-4 text-white whitespace-nowrap">
                      {formatDate(cls.end_date)}
                    </td>

                    {/* Start Time */}
                    <td className="p-4 text-white whitespace-nowrap">
                      {formatTime(cls.start_time)}
                    </td>

                    {/* Available Days */}
                    <td
                      className="p-4 text-white whitespace-nowrap"
                      title={formatDays(cls.available_days)}
                    >
                      {formatDays(cls.available_days)}
                    </td>

                    {/* Actions */}
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(cls)}
                          className="p-2 rounded-lg hover:bg-[#2a2a35] transition-colors group"
                          title="Edit"
                        >
                          <Edit
                            size={16}
                            className="text-white group-hover:text-white transition-colors"
                          />
                        </button>
                        <button
                          onClick={() => handleDelete(cls)}
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ==================== Add/Edit Class Modal ==================== */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="w-full max-w-[650px] max-h-[90vh] bg-[#211c30] rounded-2xl overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-[#3a3448]">
              <h2 className="text-2xl font-bold text-white">
                {editingClass ? "Edit Class" : "Add Class"}
              </h2>
              <button
                onClick={closeModal}
                className="text-white hover:text-white transition-colors"
              >
                <FaTimes size={20} />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="overflow-y-auto max-h-[75vh] p-6">
              <form onSubmit={handleSubmit} className="space-y-1">
                {/* Class Name */}
                <div>
                  <label className={labelClass}>Class Name *</label>
                  <input
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className={inputClass}
                    placeholder="Enter class name"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className={labelClass}>Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      })
                    }
                    rows="3"
                    className={inputClass}
                    placeholder="Enter description"
                  />
                </div>

                {/* Image */}
                <div>
                  <label className={labelClass}>Class Image</label>
                  {editingClass?.image && (
                    <img
                      src={getImageUrl(editingClass.image)}
                      alt="Current"
                      className="w-20 h-20 object-cover rounded-xl mb-2 border border-[#333]"
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.files[0] })
                    }
                    className="w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-500/20 file:text-purple-300 hover:file:bg-purple-500/30"
                  />
                </div>

                {/* Category & Subcategory */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Category *</label>
                    <select
                      value={formData.category_id}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          category_id: e.target.value,
                          subcategory_id: "",
                        })
                      }
                      className={selectClass}
                      required
                    >
                      <option value="">Select Category</option>
                      {categories?.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Subcategory</label>
                    <select
                      value={formData.subcategory_id}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          subcategory_id: e.target.value,
                        })
                      }
                      disabled={!formData.category_id}
                      className={`${selectClass} disabled:opacity-50`}
                    >
                      <option value="">Select Subcategory</option>
                      {subcategories
                        ?.filter(
                          (s) =>
                            String(s.category_id) ===
                            String(formData.category_id)
                        )
                        .map((sub) => (
                          <option key={sub.id} value={sub.id}>
                            {sub.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                {/* Price & Duration */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Price</label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      className={inputClass}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Duration (Minutes)</label>
                    <input
                      type="number"
                      value={formData.duration}
                      onChange={(e) =>
                        setFormData({ ...formData, duration: e.target.value })
                      }
                      className={inputClass}
                      placeholder="60"
                    />
                  </div>
                </div>

                {/* Course Start Date & End Date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Course Start Date</label>
                    <input
                      type="date"
                      value={formData.course_start_date}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          course_start_date: e.target.value,
                        })
                      }
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Course End Date</label>
                    <input
                      type="date"
                      value={formData.course_end_date}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          course_end_date: e.target.value,
                        })
                      }
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Start Time (MUI TimePicker — matches admin) */}
                <div>
                  <label className={labelClass}>Start Time</label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      label="Start Time"
                      ampm
                      value={
                        formData.start_time
                          ? dayjs(`2000-01-01 ${formData.start_time}`)
                          : null
                      }
                      onChange={(value) =>
                        setFormData({
                          ...formData,
                          start_time: value ? value.format("HH:mm:ss") : "",
                        })
                      }
                      slotProps={{
                        textField: {
                          fullWidth: true,
                        },
                      }}
                    />
                  </LocalizationProvider>
                </div>

                {/* Available Days Checkboxes */}
                <div>
                  <label className={labelClass}>Available Days</label>
                  <div className="mt-2 mb-4 grid grid-cols-4 sm:grid-cols-7 gap-2">
                    {DAYS_LIST.map((day) => {
                      const isChecked = formData.available_days.includes(
                        day.value
                      );
                      return (
                        <label
                          key={day.value}
                          className={`
                            flex items-center justify-center gap-1.5 p-2.5 rounded-xl cursor-pointer text-xs font-medium transition-all border
                            ${
                              isChecked
                                ? "bg-purple-500/20 border-purple-500/50 text-purple-300"
                                : "bg-[#2b2638] border-transparent text-white hover:border-purple-500/30 hover:text-gray-300"
                            }
                          `}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleDay(day.value)}
                            className="sr-only"
                          />
                          <span
                            className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                              isChecked
                                ? "bg-purple-500 border-purple-500"
                                : "border-gray-500"
                            }`}
                          >
                            {isChecked && (
                              <svg
                                className="w-3 h-3 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={3}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            )}
                          </span>
                          {day.label.slice(0, 3)}
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Students Count */}
                <div>
                  <label className={labelClass}>Students Count</label>
                  <input
                    type="number"
                    value={formData.students_count}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        students_count: e.target.value,
                      })
                    }
                    className={inputClass}
                    placeholder="0"
                  />
                </div>

                {/* Level & Mode */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Level</label>
                    <select
                      value={formData.level}
                      onChange={(e) =>
                        setFormData({ ...formData, level: e.target.value })
                      }
                      className={selectClass}
                    >
                      <option value="BEGINNER">Beginner</option>
                      <option value="INTERMEDIATE">Intermediate</option>
                      <option value="ADVANCED">Advanced</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Mode</label>
                    <select
                      value={formData.mode}
                      onChange={(e) =>
                        setFormData({ ...formData, mode: e.target.value })
                      }
                      className={selectClass}
                    >
                      <option value="ONLINE">Online</option>
                      <option value="OFFLINE">Offline</option>
                      <option value="HYBRID">Hybrid</option>
                    </select>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3 pt-4 border-t border-[#3a3448]">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-5 py-3 rounded-xl border border-gray-600 text-gray-300 hover:bg-[#2b2638] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition-opacity"
                  >
                    {editingClass ? "Update Class" : "Add Class"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ==================== Delete Confirmation Modal ==================== */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="w-full max-w-[400px] bg-[#1e1b2e] border border-[#2e2a42] rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-8 flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-red-500/15 flex items-center justify-center mb-5">
                <FaTrash className="text-red-400 text-lg" />
              </div>

              <h2 className="text-xl font-bold text-white mb-3 text-center">
                Delete Class
              </h2>

              <p className="text-white text-center text-sm leading-relaxed mb-8">
                Are you sure you want to delete this class?
              </p>

              <div className="flex gap-3 w-full">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setDeletingClass(null);
                  }}
                  className="flex-1 px-5 py-3 rounded-xl border border-[#3a3650] text-gray-300 hover:bg-[#2a2640] transition-colors font-medium text-sm"
                >
                  Cancel
                </button>

                <button
                  onClick={confirmDelete}
                  className="flex-1 px-5 py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold hover:opacity-90 transition-opacity text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}