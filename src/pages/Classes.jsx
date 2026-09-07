
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { Edit, Trash2, Search } from "lucide-react";
// import { FaTrash, FaTimes } from "react-icons/fa";

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

// export default function Classes() {
//   // ================= CLASS STATES =================
//   const [classes, setClasses] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [editingClass, setEditingClass] = useState(null);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [deletingClass, setDeletingClass] = useState(null);

//   // ================= DROPDOWNS =================
//   const [institutes, setInstitutes] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);
//   const [trainers, setTrainers] = useState([]);

//   // ================= FORM DATA =================
//   const defaultForm = {
//     title: "",
//     description: "",
//     highlights: "",
//     image: null,
//     category_id: "",
//     subcategory_id: "",
//     trainer_id: "",
//     institute_id: "",
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

//   // ================= FILTERED CLASSES =================
//   const filteredClasses = classes.filter((cls) => {
//     const query = searchQuery.toLowerCase();
//     return (
//       cls.title?.toLowerCase().includes(query) ||
//       cls.trainer?.name?.toLowerCase().includes(query) ||
//       cls.category_name?.toLowerCase().includes(query) ||
//       cls.level?.toLowerCase().includes(query) ||
//       String(cls.id).includes(query) ||
//       String(cls.price).includes(query)
//     );
//   });

//   // ================= FETCH FUNCTIONS =================
//   const fetchClasses = async () => {
//     try {
//       const res = await API.get("/classes");
//       setClasses(res?.data?.data || []);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to fetch classes");
//     }
//   };

//   const fetchDropdowns = async () => {
//     try {
//       const [instituteRes, categoryRes, subcategoryRes, trainerRes] =
//         await Promise.all([
//           API.get("/institutes/admin/all"),
//           API.get("/categories"),
//           API.get("/subcategories"),
//           API.get("/trainers"),
//         ]);

//       setInstitutes(instituteRes.data.data || []);
//       setCategories(categoryRes.data.data || []);
//       setSubcategories(subcategoryRes.data.data || []);
//       setTrainers(trainerRes.data.data || []);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to load dropdown data");
//     }
//   };

//   useEffect(() => {
//     const token = localStorage.getItem("adminToken");
//     if (!token) return;

//     fetchClasses();
//     fetchDropdowns();
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
//       await API.delete(`/classes/admin/${deletingClass.id}`);
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
//       trainer_id: cls.trainer_id || "",
//       institute_id: cls.institute_id || "",
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
//     setShowModal(true);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.title?.trim()) {
//       toast.error("Class Name is required");
//       return;
//     }
//     if (!formData.institute_id) {
//       toast.error("Please select an Institute");
//       return;
//     }
//     if (!formData.category_id) {
//       toast.error("Please select a Category");
//       return;
//     }
//     if (!formData.trainer_id) {
//       toast.error("Please select a Trainer");
//       return;
//     }

//     const payload = new FormData();
//     payload.append("title", formData.title.trim());
//     payload.append("description", formData.description?.trim() || "");
//     payload.append("highlights", formData.highlights || "");
//     payload.append("category_id", formData.category_id);
//     if (formData.subcategory_id)
//       payload.append("subcategory_id", formData.subcategory_id);
//     payload.append("trainer_id", formData.trainer_id);
//     payload.append("institute_id", formData.institute_id);
//     payload.append("students_count", formData.students_count || 0);
//     payload.append("price", formData.price || 0);
//     payload.append("duration", formData.duration || 60);
//     payload.append("level", formData.level || "BEGINNER");
//     payload.append("mode", formData.mode || "ONLINE");
//     if (formData.max_students)
//       payload.append("max_students", formData.max_students);
//     if (formData.image) payload.append("image", formData.image);

//     // ✅ New fields
//     if (formData.course_start_date)
//       payload.append("start_date", formData.course_start_date);
//     if (formData.course_end_date)
//       payload.append("end_date", formData.course_end_date);
//     if (formData.start_time)
//       payload.append("default_start_time", formData.start_time);
//     if (formData.end_time)
//       payload.append("default_end_time", formData.end_time);
//    formData.available_days.forEach((day) => {
//   payload.append("available_days[]", day);
// });

//     try {
//       if (editingClass?.id) {
//         await API.put(`/classes/admin/${editingClass.id}`, payload, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//         toast.success("Class updated successfully");
//       } else {
//         await API.post("/classes/admin/create", payload, {
//           headers: { "Content-Type": "multipart/form-data" },
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

//   // ================= SELECT STYLES =================
//   const selectClass =
//     "w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors";
//   const inputClass =
//     "w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors";
//   const labelClass = "block text-sm text-gray-400 mb-1";

//   // ================= JSX =================
//   return (
//     <div className="p-8 text-white">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//         <div>
//           <h1 className="text-4xl font-bold text-purple-400">Admin Classes</h1>
//           <p className="text-gray-400 mt-2">Manage your classes</p>
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
//             placeholder="Search classes..."
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
//             <thead className="bg-[#202027] text-gray-400">
//               <tr>
//                 <th className="p-4 text-left whitespace-nowrap">ID</th>
//                 <th className="p-4 text-left whitespace-nowrap">Image</th>
//                 <th className="p-4 text-left whitespace-nowrap">Class Name</th>
//                 <th className="p-4 text-left whitespace-nowrap">Trainer</th>
//                 <th className="p-4 text-left whitespace-nowrap">Category</th>
//                 <th className="p-4 text-left whitespace-nowrap">Level</th>
//                 <th className="p-4 text-left whitespace-nowrap">Price</th>
//                 <th className="p-4 text-left whitespace-nowrap">Students</th>
//                 <th className="p-4 text-left whitespace-nowrap">Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {filteredClasses.length === 0 ? (
//                 <tr>
//                   <td colSpan={9} className="p-12 text-center">
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
//                     <td className="p-4 text-gray-400 whitespace-nowrap">
//                       #{cls.id}
//                     </td>

//                     <td className="p-2">
//                       {cls.image ? (
//                         <img
//                           src={getImageUrl(cls.image)}
//                           alt={cls.title}
//                           className="w-12 h-12 rounded-xl object-cover border border-[#333]"
//                           onError={(e) => {
//                             e.currentTarget.style.display = "none";
//                           }}
//                         />
//                       ) : (
//                         <div className="w-12 h-12 bg-[#26262b] rounded-xl flex items-center justify-center text-gray-600 text-xs">
//                           No Img
//                         </div>
//                       )}
//                     </td>

//                     <td className="p-4 font-medium whitespace-nowrap">
//                       {cls.title}
//                     </td>
//                     <td className="p-4 text-gray-400 whitespace-nowrap">
//                       {cls.trainer?.name || "N/A"}
//                     </td>
//                     <td className="p-4 text-gray-400 whitespace-nowrap">
//                       {cls.category_name || "N/A"}
//                     </td>
//                     <td className="p-4 whitespace-nowrap">
//                       <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300">
//                         {cls.level || "-"}
//                       </span>
//                     </td>
//                     <td className="p-4 text-green-400 font-semibold whitespace-nowrap">
//                       ₹{cls.price ?? 0}
//                     </td>
//                     <td className="p-4 font-semibold whitespace-nowrap">
//                       {cls.studentsCount ?? 0}
//                     </td>

//                     <td className="p-4">
//                       <div className="flex items-center gap-3">
//                         <button
//                           onClick={() => handleEdit(cls)}
//                           className="p-2 rounded-lg hover:bg-[#2a2a35] transition-colors group"
//                           title="Edit"
//                         >
//                           <Edit
//                             size={16}
//                             className="text-gray-400 group-hover:text-white transition-colors"
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
//                 className="text-gray-400 hover:text-white transition-colors"
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
//                       setFormData({ ...formData, description: e.target.value })
//                     }
//                     rows="3"
//                     className={inputClass}
//                     placeholder="Enter description"
//                   />
//                 </div>

//                 {/* Highlights */}
//                 <div>
//                   <label className={labelClass}>What You'll Learn</label>
//                   <textarea
//                     rows="4"
//                     value={formData.highlights}
//                     onChange={(e) =>
//                       setFormData({ ...formData, highlights: e.target.value })
//                     }
//                     placeholder={`Breathing techniques\nPitch control\nSong practice`}
//                     className={inputClass}
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

//                 {/* Institute & Trainer */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className={labelClass}>Institute *</label>
//                     <select
//                       value={formData.institute_id}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           institute_id: e.target.value,
//                         })
//                       }
//                       className={selectClass}
//                       required
//                     >
//                       <option value="">Select Institute</option>
//                       {institutes?.map((item) => (
//                         <option key={item.id} value={item.id}>
//                           {item.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div>
//                     <label className={labelClass}>Trainer *</label>
//                     <select
//                       value={formData.trainer_id}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           trainer_id: e.target.value,
//                         })
//                       }
//                       className={selectClass}
//                       required
//                     >
//                       <option value="">Select Trainer</option>
//                       {trainers?.map((trainer) => (
//                         <option key={trainer.id} value={trainer.id}>
//                           {trainer.full_name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
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

//                 {/* ✅ Course Start Date & End Date */}
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

//                 {/* ✅ Default Start Time & End Time */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className={labelClass}>Default Start Time</label>
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
//                     <label className={labelClass}>Default End Time</label>
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

//                 {/* ✅ Available Days Checkboxes */}
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
//                                 : "bg-[#2b2638] border-transparent text-gray-400 hover:border-purple-500/30 hover:text-gray-300"
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
//               {/* Trash Icon */}
//               <div className="w-14 h-14 rounded-full bg-red-500/15 flex items-center justify-center mb-5">
//                 <FaTrash className="text-red-400 text-lg" />
//               </div>

//               {/* Title */}
//               <h2 className="text-xl font-bold text-white mb-3 text-center">
//                 Delete Class
//               </h2>

//               {/* Description */}
//               <p className="text-gray-400 text-center text-sm leading-relaxed mb-8">
//                 Are you sure you want to delete this class?
//               </p>

//               {/* Buttons */}
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

// export default function Classes() {
//   // ================= CLASS STATES =================
//   const [classes, setClasses] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [editingClass, setEditingClass] = useState(null);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [deletingClass, setDeletingClass] = useState(null);

//   // ================= DROPDOWNS =================
//   const [institutes, setInstitutes] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);
//   const [trainers, setTrainers] = useState([]);

//   // ================= FORM DATA =================
//   const defaultForm = {
//     title: "",
//     description: "",
//     highlights: "",
//     image: null,
//     category_id: "",
//     subcategory_id: "",
//     trainer_id: "",
//     institute_id: "",
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

//   // ================= FILTERED CLASSES =================
//   const filteredClasses = classes.filter((cls) => {
//     const query = searchQuery.toLowerCase();
//     return (
//       cls.title?.toLowerCase().includes(query) ||
//       cls.trainer?.name?.toLowerCase().includes(query) ||
//       cls.category_name?.toLowerCase().includes(query) ||
//       cls.level?.toLowerCase().includes(query) ||
//       String(cls.id).includes(query) ||
//       String(cls.price).includes(query)
//     );
//   });

//   // ================= FETCH FUNCTIONS =================
//   const fetchClasses = async () => {
//     try {
//       const res = await API.get("/classes");
//       setClasses(res?.data?.data || []);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to fetch classes");
//     }
//   };

//   const fetchDropdowns = async () => {
//     try {
//       const [instituteRes, categoryRes, subcategoryRes, trainerRes] =
//         await Promise.all([
//           API.get("/institutes/admin/all"),
//           API.get("/categories"),
//           API.get("/subcategories"),
//           API.get("/trainers"),
//         ]);

//       setInstitutes(instituteRes.data.data || []);
//       setCategories(categoryRes.data.data || []);
//       setSubcategories(subcategoryRes.data.data || []);
//       setTrainers(trainerRes.data.data || []);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to load dropdown data");
//     }
//   };

//   useEffect(() => {
//     const token = localStorage.getItem("adminToken");
//     if (!token) return;

//     fetchClasses();
//     fetchDropdowns();
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
//       await API.delete(`/classes/admin/${deletingClass.id}`);
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
//       trainer_id: cls.trainer_id || "",
//       institute_id: cls.institute_id || "",
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
//     setShowModal(true);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.title?.trim()) {
//       toast.error("Class Name is required");
//       return;
//     }
//     if (!formData.institute_id) {
//       toast.error("Please select an Institute");
//       return;
//     }
//     if (!formData.category_id) {
//       toast.error("Please select a Category");
//       return;
//     }
//     if (!formData.trainer_id) {
//       toast.error("Please select a Trainer");
//       return;
//     }

//     const payload = new FormData();
//     payload.append("title", formData.title.trim());
//     payload.append("description", formData.description?.trim() || "");
//     payload.append("highlights", formData.highlights || "");
//     payload.append("category_id", formData.category_id);
//     if (formData.subcategory_id)
//       payload.append("subcategory_id", formData.subcategory_id);
//     payload.append("trainer_id", formData.trainer_id);
//     payload.append("institute_id", formData.institute_id);
//     payload.append("students_count", formData.students_count || 0);
//     payload.append("price", formData.price || 0);
//     payload.append("duration", formData.duration || 60);
//     payload.append("level", formData.level || "BEGINNER");
//     payload.append("mode", formData.mode || "ONLINE");
//     if (formData.max_students)
//       payload.append("max_students", formData.max_students);
//     if (formData.image) payload.append("image", formData.image);

//     // ✅ New fields
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
//       if (editingClass?.id) {
//         await API.put(`/classes/admin/${editingClass.id}`, payload, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//         toast.success("Class updated successfully");
//       } else {
//         await API.post("/classes/admin/create", payload, {
//           headers: { "Content-Type": "multipart/form-data" },
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

//   // ================= SELECT STYLES =================
//   const selectClass =
//     "w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors";
//   const inputClass =
//     "w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors";
//   const labelClass = "block text-sm text-gray-400 mb-1";

//   // ================= JSX =================
//   return (
//     <div className="p-8 text-white">
//       {/* Custom Scrollbar Styles */}
//       <style>{`
//         .custom-table-scroll::-webkit-scrollbar {
//           height: 8px;
//         }
//         .custom-table-scroll::-webkit-scrollbar-track {
//           background: #151519;
//           border-radius: 4px;
//         }
//         .custom-table-scroll::-webkit-scrollbar-thumb {
//           background: #3b3b4b;
//           border-radius: 4px;
//         }
//         .custom-table-scroll::-webkit-scrollbar-thumb:hover {
//           background: #5a5a6b;
//         }
//       `}</style>

//       {/* Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//         <div>
//           <h1 className="text-4xl font-bold text-purple-400">Admin Classes</h1>
//           <p className="text-gray-400 mt-2">Manage your classes</p>
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
//             placeholder="Search classes..."
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

//       {/* Table with Horizontal Scroll */}
//       <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl overflow-x-auto custom-table-scroll">
//         <table className="w-full min-w-[1000px]">
//           <thead className="bg-[#202027] text-gray-400">
//             <tr>
//               <th className="p-4 text-left whitespace-nowrap">ID</th>
//               <th className="p-4 text-left whitespace-nowrap">Image</th>
//               <th className="p-4 text-left whitespace-nowrap">Class Name</th>
//               <th className="p-4 text-left whitespace-nowrap">Trainer</th>
//               <th className="p-4 text-left whitespace-nowrap">Category</th>
//               <th className="p-4 text-left whitespace-nowrap">Level</th>
//               <th className="p-4 text-left whitespace-nowrap">Price</th>
//               <th className="p-4 text-left whitespace-nowrap">Students</th>
//               <th className="p-4 text-left whitespace-nowrap">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {filteredClasses.length === 0 ? (
//               <tr>
//                 <td colSpan={9} className="p-12 text-center">
//                   <div className="flex flex-col items-center gap-3">
//                     <Search size={40} className="text-gray-600" />
//                     <p className="text-gray-500 text-lg">
//                       {searchQuery
//                         ? "No classes found matching your search"
//                         : "No classes available"}
//                     </p>
//                     {searchQuery && (
//                       <button
//                         onClick={() => setSearchQuery("")}
//                         className="text-purple-400 hover:text-purple-300 text-sm mt-1 transition-colors"
//                       >
//                         Clear search
//                       </button>
//                     )}
//                   </div>
//                 </td>
//               </tr>
//             ) : (
//               filteredClasses.map((cls) => (
//                 <tr
//                   key={cls.id}
//                   className="border-t border-[#2c2c35] hover:bg-[#1a1a20] transition-colors"
//                 >
//                   <td className="p-4 text-gray-400 whitespace-nowrap">
//                     #{cls.id}
//                   </td>

//                   <td className="p-2">
//                     {cls.image ? (
//                       <img
//                         src={getImageUrl(cls.image)}
//                         alt={cls.title}
//                         className="w-12 h-12 rounded-xl object-cover border border-[#333]"
//                         onError={(e) => {
//                           e.currentTarget.style.display = "none";
//                         }}
//                       />
//                     ) : (
//                       <div className="w-12 h-12 bg-[#26262b] rounded-xl flex items-center justify-center text-gray-600 text-xs">
//                         No Img
//                       </div>
//                     )}
//                   </td>

//                   <td className="p-4 font-medium whitespace-nowrap">
//                     {cls.title}
//                   </td>
//                   <td className="p-4 text-gray-400 whitespace-nowrap">
//                     {cls.trainer?.name || "N/A"}
//                   </td>
//                   <td className="p-4 text-gray-400 whitespace-nowrap">
//                     {cls.category_name || "N/A"}
//                   </td>
//                   <td className="p-4 whitespace-nowrap">
//                     <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300">
//                       {cls.level || "-"}
//                     </span>
//                   </td>
//                   <td className="p-4 text-green-400 font-semibold whitespace-nowrap">
//                     ₹{cls.price ?? 0}
//                   </td>
//                   <td className="p-4 font-semibold whitespace-nowrap">
//                     {cls.studentsCount ?? 0}
//                   </td>

//                   <td className="p-4">
//                     <div className="flex items-center gap-3">
//                       <button
//                         onClick={() => handleEdit(cls)}
//                         className="p-2 rounded-lg hover:bg-[#2a2a35] transition-colors group"
//                         title="Edit"
//                       >
//                         <Edit
//                           size={16}
//                           className="text-gray-400 group-hover:text-white transition-colors"
//                         />
//                       </button>

//                       <button
//                         onClick={() => handleDelete(cls)}
//                         className="p-2 rounded-lg hover:bg-red-500/10 transition-colors group"
//                         title="Delete"
//                       >
//                         <Trash2
//                           size={16}
//                           className="text-red-500/70 group-hover:text-red-400 transition-colors"
//                         />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
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
//                 className="text-gray-400 hover:text-white transition-colors"
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
//                       setFormData({ ...formData, description: e.target.value })
//                     }
//                     rows="3"
//                     className={inputClass}
//                     placeholder="Enter description"
//                   />
//                 </div>

//                 {/* Highlights */}
//                 <div>
//                   <label className={labelClass}>What You'll Learn</label>
//                   <textarea
//                     rows="4"
//                     value={formData.highlights}
//                     onChange={(e) =>
//                       setFormData({ ...formData, highlights: e.target.value })
//                     }
//                     placeholder={`Breathing techniques\nPitch control\nSong practice`}
//                     className={inputClass}
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

//                 {/* Institute & Trainer */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className={labelClass}>Institute *</label>
//                     <select
//                       value={formData.institute_id}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           institute_id: e.target.value,
//                         })
//                       }
//                       className={selectClass}
//                       required
//                     >
//                       <option value="">Select Institute</option>
//                       {institutes?.map((item) => (
//                         <option key={item.id} value={item.id}>
//                           {item.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div>
//                     <label className={labelClass}>Trainer *</label>
//                     <select
//                       value={formData.trainer_id}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           trainer_id: e.target.value,
//                         })
//                       }
//                       className={selectClass}
//                       required
//                     >
//                       <option value="">Select Trainer</option>
//                       {trainers?.map((trainer) => (
//                         <option key={trainer.id} value={trainer.id}>
//                           {trainer.full_name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
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

//                 {/* ✅ Course Start Date & End Date */}
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

//                 {/* ✅ Default Start Time & End Time */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className={labelClass}>Default Start Time</label>
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
//                     <label className={labelClass}>Default End Time</label>
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

//                 {/* ✅ Available Days Checkboxes */}
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
//                                 : "bg-[#2b2638] border-transparent text-gray-400 hover:border-purple-500/30 hover:text-gray-300"
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
//               {/* Trash Icon */}
//               <div className="w-14 h-14 rounded-full bg-red-500/15 flex items-center justify-center mb-5">
//                 <FaTrash className="text-red-400 text-lg" />
//               </div>

//               {/* Title */}
//               <h2 className="text-xl font-bold text-white mb-3 text-center">
//                 Delete Class
//               </h2>

//               {/* Description */}
//               <p className="text-gray-400 text-center text-sm leading-relaxed mb-8">
//                 Are you sure you want to delete this class?
//               </p>

//               {/* Buttons */}
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

// // All table column definitions
// const TABLE_COLUMNS = [
//   { key: "id", label: "ID", width: "w-[60px]" },
//   { key: "image", label: "Image", width: "w-[80px]" },
//   { key: "title", label: "Class Name", width: "min-w-[160px]" },
//   { key: "description", label: "Description", width: "min-w-[180px]" },
//   { key: "highlights", label: "Highlights", width: "min-w-[180px]" },
//   { key: "institute_name", label: "Institute", width: "min-w-[140px]" },
//   { key: "trainer_name", label: "Trainer", width: "min-w-[130px]" },
//   { key: "category_name", label: "Category", width: "min-w-[120px]" },
//   { key: "subcategory_name", label: "Subcategory", width: "min-w-[130px]" },
//   { key: "level", label: "Level", width: "w-[100px]" },
//   { key: "mode", label: "Mode", width: "w-[90px]" },
//   { key: "price", label: "Price", width: "w-[90px]" },
//   { key: "duration", label: "Duration", width: "w-[90px]" },
//   { key: "max_students", label: "Max Students", width: "w-[100px]" },
//   { key: "students_count", label: "Students", width: "w-[90px]" },
//   { key: "course_start_date", label: "Start Date", width: "min-w-[120px]" },
//   { key: "course_end_date", label: "End Date", width: "min-w-[120px]" },
//   { key: "default_start_time", label: "Start Time", width: "w-[110px]" },
//   { key: "default_end_time", label: "End Time", width: "w-[110px]" },
//   { key: "available_days", label: "Available Days", width: "min-w-[180px]" },
//   { key: "actions", label: "Actions", width: "w-[100px] sticky right-0 bg-[#151519]" },
// ];

// export default function Classes() {
//   // ================= CLASS STATES =================
//   const [classes, setClasses] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [editingClass, setEditingClass] = useState(null);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [deletingClass, setDeletingClass] = useState(null);

//   // ================= DROPDOWNS =================
//   const [institutes, setInstitutes] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);
//   const [trainers, setTrainers] = useState([]);

//   // ================= FORM DATA =================
//   const defaultForm = {
//     title: "",
//     description: "",
//     highlights: "",
//     image: null,
//     category_id: "",
//     subcategory_id: "",
//     trainer_id: "",
//     institute_id: "",
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

//   // ================= FILTERED CLASSES =================
//   const filteredClasses = classes.filter((cls) => {
//     const query = searchQuery.toLowerCase();
//     return (
//       cls.title?.toLowerCase().includes(query) ||
//       cls.description?.toLowerCase().includes(query) ||
//       cls.highlights?.toLowerCase().includes(query) ||
//       cls.trainer?.name?.toLowerCase().includes(query) ||
//       cls.category_name?.toLowerCase().includes(query) ||
//       cls.subcategory_name?.toLowerCase().includes(query) ||
//       cls.institute?.name ?.toLowerCase().includes(query) ||
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
//       const res = await API.get("/classes");
//       setClasses(res?.data?.data || []);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to fetch classes");
//     }
//   };

//   const fetchDropdowns = async () => {
//     try {
//       const [instituteRes, categoryRes, subcategoryRes, trainerRes] =
//         await Promise.all([
//           API.get("/institutes/admin/all"),
//           API.get("/categories"),
//           API.get("/subcategories"),
//           API.get("/trainers"),
//         ]);

//       setInstitutes(instituteRes.data.data || []);
//       setCategories(categoryRes.data.data || []);
//       setSubcategories(subcategoryRes.data.data || []);
//       setTrainers(trainerRes.data.data || []);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to load dropdown data");
//     }
//   };

//   useEffect(() => {
//     const token = localStorage.getItem("adminToken");
//     if (!token) return;

//     fetchClasses();
//     fetchDropdowns();
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
//       await API.delete(`/classes/admin/${deletingClass.id}`);
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
//       trainer_id: cls.trainer_id || "",
//       institute_id: cls.institute_id || "",
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
//     setShowModal(true);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.title?.trim()) {
//       toast.error("Class Name is required");
//       return;
//     }
//     if (!formData.institute_id) {
//       toast.error("Please select an Institute");
//       return;
//     }
//     if (!formData.category_id) {
//       toast.error("Please select a Category");
//       return;
//     }
//     if (!formData.trainer_id) {
//       toast.error("Please select a Trainer");
//       return;
//     }

//     const payload = new FormData();
//     payload.append("title", formData.title.trim());
//     payload.append("description", formData.description?.trim() || "");
//     payload.append("highlights", formData.highlights || "");
//     payload.append("category_id", formData.category_id);
//     if (formData.subcategory_id)
//       payload.append("subcategory_id", formData.subcategory_id);
//     payload.append("trainer_id", formData.trainer_id);
//     payload.append("institute_id", formData.institute_id);
//     payload.append("students_count", formData.students_count || 0);
//     payload.append("price", formData.price || 0);
//     payload.append("duration", formData.duration || 60);
//     payload.append("level", formData.level || "BEGINNER");
//     payload.append("mode", formData.mode || "ONLINE");
//     if (formData.max_students)
//       payload.append("max_students", formData.max_students);
//     if (formData.image) payload.append("image", formData.image);

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
//       if (editingClass?.id) {
//         await API.put(`/classes/admin/${editingClass.id}`, payload, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//         toast.success("Class updated successfully");
//       } else {
//         await API.post("/classes/admin/create", payload, {
//           headers: { "Content-Type": "multipart/form-data" },
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

//   // ================= RENDER CELL =================
//   const renderCell = (cls, col) => {
//     switch (col.key) {
//       case "id":
//         return (
//           <td className="p-4 text-gray-400 whitespace-nowrap">#{cls.id}</td>
//         );

//       case "image":
//         return (
//           <td className="p-2">
//             {cls.image ? (
//               <img
//                 src={getImageUrl(cls.image)}
//                 alt={cls.title}
//                 className="w-12 h-12 rounded-xl object-cover border border-[#333]"
//                 onError={(e) => {
//                   e.currentTarget.style.display = "none";
//                 }}
//               />
//             ) : (
//               <div className="w-12 h-12 bg-[#26262b] rounded-xl flex items-center justify-center text-gray-600 text-xs">
//                 No Img
//               </div>
//             )}
//           </td>
//         );

//       case "title":
//         return (
//           <td className="p-4 font-medium whitespace-nowrap">{cls.title}</td>
//         );

//       case "description":
//         return (
//           <td
//             className="p-4 text-gray-400 whitespace-nowrap text-xs"
//             title={cls.description || ""}
//           >
//             {truncate(cls.description, 35)}
//           </td>
//         );

//       case "highlights":
//         return (
//           <td
//             className="p-4 text-gray-400 whitespace-nowrap text-xs"
//             title={cls.highlights || ""}
//           >
//             {truncate(cls.highlights, 35)}
//           </td>
//         );

//       case "institute_name":
//         return (
//           <td className="p-4 text-gray-300 whitespace-nowrap text-sm">
//             {cls.institute?.name  || "N/A"}
//           </td>
//         );

//       case "trainer_name":
//         return (
//           <td className="p-4 text-gray-400 whitespace-nowrap text-sm">
//             {cls.trainer?.name || "N/A"}
//           </td>
//         );

//       case "category_name":
//         return (
//           <td className="p-4 text-gray-400 whitespace-nowrap text-sm">
//             {cls.category_name || "N/A"}
//           </td>
//         );

//       case "subcategory_name":
//         return (
//           <td className="p-4 text-gray-400 whitespace-nowrap text-sm">
//             {cls.subcategory_name || "N/A"}
//           </td>
//         );

//       case "level":
//         return (
//           <td className="p-4 whitespace-nowrap">
//             <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300">
//               {cls.level || "-"}
//             </span>
//           </td>
//         );

//       case "mode":
//         return (
//           <td className="p-4 whitespace-nowrap">
//             <span
//               className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getModeColor(
//                 cls.mode
//               )}`}
//             >
//               {cls.mode || "-"}
//             </span>
//           </td>
//         );

//       case "price":
//         return (
//           <td className="p-4 text-green-400 font-semibold whitespace-nowrap text-sm">
//             ₹{cls.price ?? 0}
//           </td>
//         );

//       case "duration":
//         return (
//           <td className="p-4 text-gray-300 whitespace-nowrap text-sm">
//             {cls.duration ? `${cls.duration} min` : "-"}
//           </td>
//         );

//       case "max_students":
//         return (
//           <td className="p-4 text-gray-300 whitespace-nowrap text-sm">
//             {cls.max_students || "Unlimited"}
//           </td>
//         );

//       case "students_count":
//         return (
//           <td className="p-4 font-semibold whitespace-nowrap text-sm">
//             {cls.studentsCount ?? 0}
//           </td>
//         );

//       case "course_start_date":
//         return (
//           <td className="p-4 text-gray-300 whitespace-nowrap text-xs">
//               {formatDate(cls.start_date)}
//           </td>
//         );

//       case "course_end_date":
//         return (
//           <td className="p-4 text-gray-300 whitespace-nowrap text-xs">
//             {formatDate(cls.endDate)}
//           </td>
//         );

//       case "default_start_time":
//         return (
//           <td className="p-4 text-gray-300 whitespace-nowrap text-sm">
//             {formatTime(cls.default_start_time)}
//           </td>
//         );

//       case "default_end_time":
//         return (
//           <td className="p-4 text-gray-300 whitespace-nowrap text-sm">
//             {formatTime(cls.default_end_time)}
//           </td>
//         );

//       case "available_days":
//         return (
//           <td
//             className="p-4 text-gray-300 whitespace-nowrap text-xs"
//             title={formatDays(cls.available_days)}
//           >
//             {formatDays(cls.available_days)}
//           </td>
//         );

//       case "actions":
//         return (
//           <td className="p-4 sticky right-0 bg-[#151519] z-10">
//             <div className="flex items-center gap-3">
//               <button
//                 onClick={() => handleEdit(cls)}
//                 className="p-2 rounded-lg hover:bg-[#2a2a35] transition-colors group"
//                 title="Edit"
//               >
//                 <Edit
//                   size={16}
//                   className="text-gray-400 group-hover:text-white transition-colors"
//                 />
//               </button>

//               <button
//                 onClick={() => handleDelete(cls)}
//                 className="p-2 rounded-lg hover:bg-red-500/10 transition-colors group"
//                 title="Delete"
//               >
//                 <Trash2
//                   size={16}
//                   className="text-red-500/70 group-hover:text-red-400 transition-colors"
//                 />
//               </button>
//             </div>
//           </td>
//         );

//       default:
//         return <td className="p-4 text-gray-400">-</td>;
//     }
//   };

//   // ================= SELECT STYLES =================
//   const selectClass =
//     "w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors";
//   const inputClass =
//     "w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors";
//   const labelClass = "block text-sm text-gray-400 mb-1";

//   // ================= JSX =================
//   return (
//     <div className="p-8 text-white">
//       {/* Custom Scrollbar Styles */}
//       <style>{`
//         .custom-table-scroll::-webkit-scrollbar {
//           height: 8px;
//         }
//         .custom-table-scroll::-webkit-scrollbar-track {
//           background: #151519;
//           border-radius: 4px;
//         }
//         .custom-table-scroll::-webkit-scrollbar-thumb {
//           background: #3b3b4b;
//           border-radius: 4px;
//         }
//         .custom-table-scroll::-webkit-scrollbar-thumb:hover {
//           background: #5a5a6b;
//         }
//         .custom-table-scroll thead th:last-child,
//         .custom-table-scroll tbody td:last-child {
//           position: sticky;
//           right: 0;
//           z-index: 10;
//         }
//         .custom-table-scroll thead th:last-child {
//           background: #202027;
//         }
//         .custom-table-scroll tbody tr:hover td:last-child {
//           background: #1a1a20;
//         }
//       `}</style>

//       {/* Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//         <div>
//           <h1 className="text-4xl font-bold text-purple-400">Admin Classes</h1>
//           <p className="text-gray-400 mt-2">Manage your classes</p>
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
//             placeholder="Search by name, description, highlights, trainer, category, institute, level, mode..."
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

//       {/* Table with Horizontal Scroll */}
//       <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl overflow-x-auto custom-table-scroll">
//         <table className="w-full min-w-[2600px]">
//           <thead className="bg-[#202027] text-gray-400">
//             <tr>
//               {TABLE_COLUMNS.map((col) => (
//                 <th
//                   key={col.key}
//                   className={`p-4 text-left whitespace-nowrap text-xs font-semibold uppercase tracking-wider ${col.width}`}
//                 >
//                   {col.label}
//                 </th>
//               ))}
//             </tr>
//           </thead>

//           <tbody>
//             {filteredClasses.length === 0 ? (
//               <tr>
//                 <td
//                   colSpan={TABLE_COLUMNS.length}
//                   className="p-12 text-center"
//                 >
//                   <div className="flex flex-col items-center gap-3">
//                     <Search size={40} className="text-gray-600" />
//                     <p className="text-gray-500 text-lg">
//                       {searchQuery
//                         ? "No classes found matching your search"
//                         : "No classes available"}
//                     </p>
//                     {searchQuery && (
//                       <button
//                         onClick={() => setSearchQuery("")}
//                         className="text-purple-400 hover:text-purple-300 text-sm mt-1 transition-colors"
//                       >
//                         Clear search
//                       </button>
//                     )}
//                   </div>
//                 </td>
//               </tr>
//             ) : (
//               filteredClasses.map((cls) => (
//                 <tr
//                   key={cls.id}
//                   className="border-t border-[#2c2c35] hover:bg-[#1a1a20] transition-colors"
//                 >
//                   {TABLE_COLUMNS.map((col) => renderCell(cls, col))}
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
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
//                 className="text-gray-400 hover:text-white transition-colors"
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
//                       setFormData({ ...formData, description: e.target.value })
//                     }
//                     rows="3"
//                     className={inputClass}
//                     placeholder="Enter description"
//                   />
//                 </div>

//                 {/* Highlights */}
//                 <div>
//                   <label className={labelClass}>What You'll Learn</label>
//                   <textarea
//                     rows="4"
//                     value={formData.highlights}
//                     onChange={(e) =>
//                       setFormData({ ...formData, highlights: e.target.value })
//                     }
//                     placeholder={`Breathing techniques\nPitch control\nSong practice`}
//                     className={inputClass}
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

//                 {/* Institute & Trainer */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className={labelClass}>Institute *</label>
//                     <select
//                       value={formData.institute_id}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           institute_id: e.target.value,
//                         })
//                       }
//                       className={selectClass}
//                       required
//                     >
//                       <option value="">Select Institute</option>
//                       {institutes?.map((item) => (
//                         <option key={item.id} value={item.id}>
//                           {item.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div>
//                     <label className={labelClass}>Trainer *</label>
//                     <select
//                       value={formData.trainer_id}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           trainer_id: e.target.value,
//                         })
//                       }
//                       className={selectClass}
//                       required
//                     >
//                       <option value="">Select Trainer</option>
//                       {trainers?.map((trainer) => (
//                         <option key={trainer.id} value={trainer.id}>
//                           {trainer.full_name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
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

//                 {/* Default Start Time & End Time */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className={labelClass}>Default Start Time</label>
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
//                     <label className={labelClass}>Default End Time</label>
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
//                                 : "bg-[#2b2638] border-transparent text-gray-400 hover:border-purple-500/30 hover:text-gray-300"
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

//               <p className="text-gray-400 text-center text-sm leading-relaxed mb-8">
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

export default function Classes() {
  // ================= CLASS STATES =================
  const [classes, setClasses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingClass, setDeletingClass] = useState(null);

  // ================= DROPDOWNS =================
  const [institutes, setInstitutes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [trainers, setTrainers] = useState([]);

  // ================= FORM DATA =================
  const defaultForm = {
    title: "",
    description: "",
    highlights: "",
    image: null,
    category_id: "",
    subcategory_id: "",
    trainer_id: "",
    institute_id: "",
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

  // ================= FILTERED CLASSES =================
  const filteredClasses = classes.filter((cls) => {
    const query = searchQuery.toLowerCase();
    return (
      cls.title?.toLowerCase().includes(query) ||
      cls.description?.toLowerCase().includes(query) ||
      cls.highlights?.toLowerCase().includes(query) ||
      cls.trainer?.name?.toLowerCase().includes(query) ||
      cls.category_name?.toLowerCase().includes(query) ||
      cls.subcategory_name?.toLowerCase().includes(query) ||
      cls.institute?.name ?.toLowerCase().includes(query) ||
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
      const res = await API.get("/classes");
      setClasses(res?.data?.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch classes");
    }
  };

  const fetchDropdowns = async () => {
    try {
      const [instituteRes, categoryRes, subcategoryRes, trainerRes] =
        await Promise.all([
          API.get("/institutes/admin/all"),
          API.get("/categories"),
          API.get("/subcategories"),
          API.get("/trainers"),
        ]);

      setInstitutes(instituteRes.data.data || []);
      setCategories(categoryRes.data.data || []);
      setSubcategories(subcategoryRes.data.data || []);
      setTrainers(trainerRes.data.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load dropdown data");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) return;

    fetchClasses();
    fetchDropdowns();
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
      await API.delete(`/classes/admin/${deletingClass.id}`);
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
      trainer_id: cls.trainer_id || "",
      institute_id: cls.institute_id || "",
      price: cls.price || "",
      duration: cls.duration || "",
      level: cls.level || "BEGINNER",
      mode: cls.mode || "ONLINE",
      students_count: cls.students_count || "",
      course_start_date: cls.course_start_date || "",
   
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
    if (!formData.institute_id) {
      toast.error("Please select an Institute");
      return;
    }
    if (!formData.category_id) {
      toast.error("Please select a Category");
      return;
    }
    if (!formData.trainer_id) {
      toast.error("Please select a Trainer");
      return;
    }

    const payload = new FormData();
    payload.append("title", formData.title.trim());
    payload.append("description", formData.description?.trim() || "");
    payload.append("highlights", formData.highlights || "");
    payload.append("category_id", formData.category_id);
    if (formData.subcategory_id)
      payload.append("subcategory_id", formData.subcategory_id);
    payload.append("trainer_id", formData.trainer_id);
    payload.append("institute_id", formData.institute_id);
    payload.append("students_count", formData.students_count || 0);
    payload.append("price", formData.price || 0);
    payload.append("duration", formData.duration || 60);
    payload.append("level", formData.level || "BEGINNER");
    payload.append("mode", formData.mode || "ONLINE");
    if (formData.image) payload.append("image", formData.image);

    if (formData.course_start_date)
      payload.append("start_date", formData.course_start_date);
   
    if (formData.start_time)
      payload.append("start_time", formData.start_time);
  
    formData.available_days.forEach((day) => {
      payload.append("available_days[]", day);
    });

    try {
      if (editingClass?.id) {
        await API.put(`/classes/admin/${editingClass.id}`, payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Class updated successfully");
      } else {
        await API.post("/classes/admin/create", payload, {
          headers: { "Content-Type": "multipart/form-data" },
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

  const totalColumns = 20;

  // ================= SELECT STYLES =================
  const selectClass =
    "w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors";
  const inputClass =
    "w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors";
  const labelClass = "block text-sm text-gray-400 mb-1";

  // ================= JSX =================
  return (
    <div className="p-8 text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-4xl font-bold text-purple-400">Admin Classes</h1>
          <p className="text-gray-400 mt-2">Manage your classes</p>
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
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by name, description, highlights, trainer, category, institute, level, mode..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-10 py-3.5 rounded-xl bg-[#151519] border border-[#2c2c35] text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/60 transition-colors text-sm"
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
            <thead className="bg-[#202027] text-gray-400">
              <tr>
                <th className="p-4 text-left whitespace-nowrap">ID</th>
                <th className="p-4 text-left whitespace-nowrap">Image</th>
                <th className="p-4 text-left whitespace-nowrap">Class Name</th>
                <th className="p-4 text-left whitespace-nowrap">Description</th>
                
                <th className="p-4 text-left whitespace-nowrap">Institute</th>
                <th className="p-4 text-left whitespace-nowrap">Trainer</th>
                <th className="p-4 text-left whitespace-nowrap">Category</th>
                <th className="p-4 text-left whitespace-nowrap">Subcategory</th>
                <th className="p-4 text-left whitespace-nowrap">Level</th>
                <th className="p-4 text-left whitespace-nowrap">Mode</th>
                <th className="p-4 text-left whitespace-nowrap">Price</th>
                <th className="p-4 text-left whitespace-nowrap">Duration</th>
                <th className="p-4 text-left whitespace-nowrap">Students</th>
                <th className="p-4 text-left whitespace-nowrap">Start Date</th>
        
                <th className="p-4 text-left whitespace-nowrap">Start Time</th>
    
                <th className="p-4 text-left whitespace-nowrap">Available Days</th>
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
                    <td className="p-4 text-gray-400 whitespace-nowrap">
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
                      className="p-4 text-gray-400 max-w-[130px] truncate"
                      title={cls.description || ""}
                    >
                      {truncate(cls.description, 30)}
                    </td>

                 
                 
                    {/* Institute */}
                    <td className="p-4 text-gray-400 whitespace-nowrap">
                      {cls.institute?.name  || "-"}
                    </td>

                    {/* Trainer */}
                    <td className="p-4 text-gray-400 whitespace-nowrap">
                      {cls.trainer?.name || "-"}
                    </td>

                    {/* Category */}
                    <td className="p-4 text-gray-400 whitespace-nowrap">
                      {cls.category_name || "-"}
                    </td>

                    {/* Subcategory */}
                    <td className="p-4 text-gray-400 whitespace-nowrap">
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
                    <td className="p-4 text-gray-400 whitespace-nowrap">
                      {cls.duration ? `${cls.duration} min` : "-"}
                    </td>

                    {/* Students */}
                    <td className="p-4 font-semibold whitespace-nowrap">
                      {cls.studentsCount ?? 0}
                    </td>

                    {/* Start Date */}
                    <td className="p-4 text-gray-400 whitespace-nowrap">
                        {formatDate(cls.start_date)}
                    </td>

                   
                   

                    {/* Start Time */}
                    <td className="p-4 text-gray-400 whitespace-nowrap">
                    {formatTime(cls.start_time)}
                    </td>

                  

                    {/* Available Days */}
                    <td
                      className="p-4 text-gray-400 whitespace-nowrap"
                      title={formatDays(cls.availableDays)}
                    >
                     {formatDays(cls.availableDays)}
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
                            className="text-gray-400 group-hover:text-white transition-colors"
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
                className="text-gray-400 hover:text-white transition-colors"
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
                      setFormData({ ...formData, description: e.target.value })
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

                {/* Institute & Trainer */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Institute *</label>
                    <select
                      value={formData.institute_id}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          institute_id: e.target.value,
                        })
                      }
                      className={selectClass}
                      required
                    >
                      <option value="">Select Institute</option>
                      {institutes?.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Trainer *</label>
                    <select
                      value={formData.trainer_id}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          trainer_id: e.target.value,
                        })
                      }
                      className={selectClass}
                      required
                    >
                      <option value="">Select Trainer</option>
                      {trainers?.map((trainer) => (
                        <option key={trainer.id} value={trainer.id}>
                          {trainer.full_name}
                        </option>
                      ))}
                    </select>
                  </div>
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
                  {/* <div>
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
                  </div> */}
                </div>

                {/* Default Start Time & End Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}> Start Time</label>
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
                  {/* <div>
                    <label className={labelClass}>Default End Time</label>
                    <input
                      type="time"
                      value={formData.end_time}
                      onChange={(e) =>
                        setFormData({ ...formData, end_time: e.target.value })
                      }
                      className={inputClass}
                    />
                  </div> */}
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
                                : "bg-[#2b2638] border-transparent text-gray-400 hover:border-purple-500/30 hover:text-gray-300"
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

              <p className="text-gray-400 text-center text-sm leading-relaxed mb-8">
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