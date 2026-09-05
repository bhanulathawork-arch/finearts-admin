

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

// export default function InstituteClasses() {
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
//       cls.trainer_name?.toLowerCase().includes(query) ||
//       cls.category_name?.toLowerCase().includes(query) ||
//       cls.level?.toLowerCase().includes(query) ||
//       String(cls.id).includes(query) ||
//       String(cls.price).includes(query)
//     );
//   });

//   // ================= MISSING AUTH CONFIG FUNCTION =================
//   const getConfig = () => {
//     const token = localStorage.getItem("instituteToken");
//     if (!token) {
//       return {}; // Fallback if using global axios interceptor
//     }
//     return {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };
//   };

//   // ================= FETCH FUNCTIONS =================
//   const fetchClasses = async () => {
//     try {
//       const res = await API.get("/classes/institute/my-classes", getConfig());
//       setClasses(res?.data?.data || []);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to fetch classes");
//     }
//   };

//  const fetchDropdowns = async () => {
//   try {
//     console.log("Loading Categories...");
//     const categoryRes = await API.get("/categories");
//     console.log(categoryRes);

//     console.log("Loading Subcategories...");
//     const subcategoryRes = await API.get("/subcategories");
//     console.log(subcategoryRes);

//     console.log("Loading Trainers...");
//     const trainerRes = await API.get("/trainers/institute");
//     console.log(trainerRes);

//     setCategories(categoryRes.data.data || []);
//     setSubcategories(subcategoryRes.data.data || []);
//     setTrainers(trainerRes.data.data || []);
//   } catch (err) {
//     console.log("============== ERROR ==============");
//     console.log("URL :", err.config?.url);
//     console.log("STATUS :", err.response?.status);
//     console.log("DATA :", err.response?.data);
//     console.log(err);
//   }
// };

//   useEffect(() => {
//     fetchClasses();
//     fetchDropdowns();
//   }, []);

//   // ================= IMAGE HELPER =================
//   const getImageUrl = (item) => {
//     if (!item) return "";
//     if (typeof item === "string") {
//       if (item.startsWith("http")) return item;
//       return `http://localhost:5000${item}`;
//     }
//     if (item.startsWith("http")) return item;
//     return `http://localhost:5000${item}`;
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
//       await API.delete(`/classes/institute/${deletingClass.id}`, getConfig());
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
//       payload.append("start_time", formData.start_time);
//     if (formData.end_time)
//       payload.append("end_time", formData.end_time);
//     formData.available_days.forEach((day) => {
//       payload.append("available_days[]", day);
//     });

//     try {
//       if (editingClass?.id) {
//         await API.put(`/classes/institute/${editingClass.id}`, payload, {
//           headers: { 
//             ...getConfig().headers, 
//             "Content-Type": "multipart/form-data" 
//           },
//         });
//         toast.success("Class updated successfully");
//       } else {
//         await API.post("/classes/institute/create", payload, {
//           headers: { 
//             ...getConfig().headers, 
//             "Content-Type": "multipart/form-data" 
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

//   // ================= SELECT STYLES =================
//   const selectClass =
//     "w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors";
//   const inputClass =
//     "w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors";
//   const labelClass = "block text-sm text-white mb-1";

//   // ================= JSX =================
//   return (
//     <div className="p-8 text-white">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//         <div>
//           <h1 className="text-4xl font-bold text-purple-400">Institute Classes</h1>
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
//             <thead className="bg-[#202027] text-white">
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
//                     <td className="p-4 text-white whitespace-nowrap">
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
//                     <td className="p-4 text-white whitespace-nowrap">
//                       {cls.trainer_name || "N/A"}
//                     </td>
//                     <td className="p-4 text-white whitespace-nowrap">
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
//                       {cls.students_count ?? 0}
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

//                 {/* Trainer Dropdown Only */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
//                   <div></div>
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
//                           className={`flex items-center justify-center gap-1.5 p-2.5 rounded-xl cursor-pointer text-xs font-medium transition-all border ${
//                             isChecked
//                               ? "bg-purple-500/20 border-purple-500/50 text-purple-300"
//                               : "bg-[#2b2638] border-transparent text-white hover:border-purple-500/30 hover:text-gray-300"
//                           }`}
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
//                               <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
//                                 <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
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
//                         setFormData({ ...formData, students_count: e.target.value })
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
//                         setFormData({ ...formData, max_students: e.target.value })
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
//                       onChange={(e) => setFormData({ ...formData, level: e.target.value })}
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
//                       onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
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
//                   <button type="button" onClick={closeModal} className="px-5 py-3 rounded-xl border border-gray-600 text-gray-300 hover:bg-[#2b2638] transition-colors">
//                     Cancel
//                   </button>
//                   <button type="submit" className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition-opacity">
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

//               <h2 className="text-xl font-bold text-white mb-3 text-center">Delete Class</h2>

//               <p className="text-white text-center text-sm leading-relaxed mb-8">
//                 Are you sure you want to delete this class?
//               </p>

//               <div className="flex gap-3 w-full">
//                 <button
//                   onClick={() => { setShowDeleteModal(false); setDeletingClass(null); }}
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

// export default function InstituteClasses() {
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
//       cls.trainer_name?.toLowerCase().includes(query) ||
//       cls.category_name?.toLowerCase().includes(query) ||
//       cls.subcategory_name?.toLowerCase().includes(query) ||
//       cls.level?.toLowerCase().includes(query) ||
//       cls.mode?.toLowerCase().includes(query) ||
//       String(cls.id).includes(query) ||
//       String(cls.price).includes(query) ||
//       String(cls.duration).includes(query)
//     );
//   });

//   // ================= MISSING AUTH CONFIG FUNCTION =================
//   const getConfig = () => {
//     const token = localStorage.getItem("instituteToken");
//     if (!token) {
//       return {}; // Fallback if using global axios interceptor
//     }
//     return {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };
//   };

//   // ================= FETCH FUNCTIONS =================
//   const fetchClasses = async () => {
//     try {
//       const res = await API.get("/classes/institute/my-classes", getConfig());
//       setClasses(res?.data?.data || []);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to fetch classes");
//     }
//   };

//   const fetchDropdowns = async () => {
//     try {
//       const [categoryRes, subcategoryRes, trainerRes] = await Promise.all([
//         API.get("/categories"),
//         API.get("/subcategories"),
//         API.get("/trainers/institute"),
//       ]);

//       setCategories(categoryRes.data.data || []);
//       setSubcategories(subcategoryRes.data.data || []);
//       setTrainers(trainerRes.data.data || []);
//     } catch (err) {
//       console.log("============== ERROR ==============");
//       console.log("URL :", err.config?.url);
//       console.log("STATUS :", err.response?.status);
//       console.log("DATA :", err.response?.data);
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     fetchClasses();
//     fetchDropdowns();
//   }, []);

//   // ================= IMAGE HELPER =================
//   const getImageUrl = (item) => {
//     if (!item) return "";
//     if (typeof item === "string") {
//       if (item.startsWith("http")) return item;
//       return `http://localhost:5000${item}`;
//     }
//     if (item.startsWith("http")) return item;
//     return `http://localhost:5000${item}`;
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
//       await API.delete(`/classes/institute/${deletingClass.id}`, getConfig());
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
//       payload.append("start_time", formData.start_time);
//     if (formData.end_time)
//       payload.append("end_time", formData.end_time);
//     formData.available_days.forEach((day) => {
//       payload.append("available_days[]", day);
//     });

//     try {
//       if (editingClass?.id) {
//         await API.put(`/classes/institute/${editingClass.id}`, payload, {
//           headers: { 
//             ...getConfig().headers, 
//             "Content-Type": "multipart/form-data" 
//           },
//         });
//         toast.success("Class updated successfully");
//       } else {
//         await API.post("/classes/institute/create", payload, {
//           headers: { 
//             ...getConfig().headers, 
//             "Content-Type": "multipart/form-data" 
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

//   // Total columns (19 because Institute doesn't need "Institute" column)
//   const totalColumns = 19;

//   // ================= SELECT STYLES =================
//   const selectClass =
//     "w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors";
//   const inputClass =
//     "w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors";
//   const labelClass = "block text-sm text-white mb-1";

//   // ================= JSX =================
//   return (
//     <div className="p-8 text-white">
//       {/* Custom Scrollbar Styles */}
//       <style>{`
//         .custom-table-scroll::-webkit-scrollbar {
//           height: 6px;
//         }
//         .custom-table-scroll::-webkit-scrollbar-track {
//           background: transparent;
//         }
//         .custom-table-scroll::-webkit-scrollbar-thumb {
//           background: rgba(255, 255, 255, 0.08);
//           border-radius: 10px;
//         }
//         .custom-table-scroll::-webkit-scrollbar-thumb:hover {
//           background: rgba(255, 255, 255, 0.15);
//         }
//       `}</style>

//       {/* Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//         <div>
//           <h1 className="text-4xl font-bold text-purple-400">Institute Classes</h1>
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
//             placeholder="Search by name, description, highlights, trainer, category, level, mode..."
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
//         <div className="overflow-x-auto custom-table-scroll">
//           <table className="w-full min-w-[2000px]">
//             <thead className="bg-[#202027] text-white">
//               <tr>
//                 <th className="p-4 text-left whitespace-nowrap">ID</th>
//                 <th className="p-4 text-left whitespace-nowrap">Image</th>
//                 <th className="p-4 text-left whitespace-nowrap">Class Name</th>
//                 <th className="p-4 text-left whitespace-nowrap">Description</th>
//                 <th className="p-4 text-left whitespace-nowrap">Highlights</th>
//                 <th className="p-4 text-left whitespace-nowrap">Trainer</th>
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
//                 <th className="p-4 text-left whitespace-nowrap">End Time</th>
//                 <th className="p-4 text-left whitespace-nowrap">Available Days</th>
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

//                     {/* Highlights */}
//                     <td
//                       className="p-4 text-white max-w-[130px] truncate"
//                       title={cls.highlights || ""}
//                     >
//                       {truncate(cls.highlights, 30)}
//                     </td>

//                     {/* Trainer */}
//                     <td className="p-4 text-white whitespace-nowrap">
//                       {cls.trainer_name || "-"}
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
//                       {formatDate(cls.course_start_date)}
//                     </td>

//                     {/* End Date */}
//                     <td className="p-4 text-white whitespace-nowrap">
//                       {formatDate(cls.course_end_date)}
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

//                 {/* Trainer Dropdown Only */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
//                   <div></div>
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
//                           className={`flex items-center justify-center gap-1.5 p-2.5 rounded-xl cursor-pointer text-xs font-medium transition-all border ${
//                             isChecked
//                               ? "bg-purple-500/20 border-purple-500/50 text-purple-300"
//                               : "bg-[#2b2638] border-transparent text-white hover:border-purple-500/30 hover:text-gray-300"
//                           }`}
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
//                               <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
//                                 <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
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
//                         setFormData({ ...formData, students_count: e.target.value })
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
//                         setFormData({ ...formData, max_students: e.target.value })
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
//                       onChange={(e) => setFormData({ ...formData, level: e.target.value })}
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
//                       onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
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
//                   <button type="button" onClick={closeModal} className="px-5 py-3 rounded-xl border border-gray-600 text-gray-300 hover:bg-[#2b2638] transition-colors">
//                     Cancel
//                   </button>
//                   <button type="submit" className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition-opacity">
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

//               <h2 className="text-xl font-bold text-white mb-3 text-center">Delete Class</h2>

//               <p className="text-white text-center text-sm leading-relaxed mb-8">
//                 Are you sure you want to delete this class?
//               </p>

//               <div className="flex gap-3 w-full">
//                 <button
//                   onClick={() => { setShowDeleteModal(false); setDeletingClass(null); }}
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

// export default function InstituteClasses() {
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
//     price: "",
//     duration: "",
//     level: "BEGINNER",
//     mode: "ONLINE",
//     students_count: "",
//     course_start_date: "",
//     course_end_date: "",
//     start_time: "",
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
//       cls.trainer_name?.toLowerCase().includes(query) ||
//       cls.category_name?.toLowerCase().includes(query) ||
//       cls.subcategory_name?.toLowerCase().includes(query) ||
//       cls.level?.toLowerCase().includes(query) ||
//       cls.mode?.toLowerCase().includes(query) ||
//       String(cls.id).includes(query) ||
//       String(cls.price).includes(query) ||
//       String(cls.duration).includes(query)
//     );
//   });

//   // ================= AUTH CONFIG =================
//   const getConfig = () => {
//     const token = localStorage.getItem("instituteToken");
//     if (!token) {
//       return {};
//     }
//     return {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };
//   };

//   // ================= FETCH FUNCTIONS =================
//   const fetchClasses = async () => {
//     try {
//       const res = await API.get("/classes/institute/my-classes", getConfig());
//       setClasses(res?.data?.data || []);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to fetch classes");
//     }
//   };

//   const fetchDropdowns = async () => {
//     try {
//       const [categoryRes, subcategoryRes, trainerRes] = await Promise.all([
//         API.get("/categories"),
//         API.get("/subcategories"),
//         API.get("/trainers/institute"),
//       ]);

//       setCategories(categoryRes.data.data || []);
//       setSubcategories(subcategoryRes.data.data || []);
//       setTrainers(trainerRes.data.data || []);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to load dropdown data");
//     }
//   };

//   useEffect(() => {
//     fetchClasses();
//     fetchDropdowns();
//   }, []);

//   // ================= IMAGE HELPER =================
//   const getImageUrl = (item) => {
//     if (!item) return "";
//     if (typeof item === "string") {
//       if (item.startsWith("http")) return item;
//       return `http://localhost:5000${item}`;
//     }
//     if (item.startsWith("http")) return item;
//     return `http://localhost:5000${item}`;
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
//       await API.delete(`/classes/institute/${deletingClass.id}`, getConfig());
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
//       price: cls.price || "",
//       duration: cls.duration || "",
//       level: cls.level || "BEGINNER",
//       mode: cls.mode || "ONLINE",
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
//     payload.append("students_count", formData.students_count || 0);
//     payload.append("price", formData.price || 0);
//     payload.append("duration", formData.duration || 60);
//     payload.append("level", formData.level || "BEGINNER");
//     payload.append("mode", formData.mode || "ONLINE");
//     if (formData.image) payload.append("image", formData.image);

//     if (formData.course_start_date)
//       payload.append("start_date", formData.course_start_date);
//     if (formData.course_end_date)
//       payload.append("end_date", formData.course_end_date);
//     if (formData.start_time)
//       payload.append("start_time", formData.start_time);

//     formData.available_days.forEach((day) => {
//       payload.append("available_days[]", day);
//     });

//     try {
//       if (editingClass?.id) {
//         await API.put(`/classes/institute/${editingClass.id}`, payload, {
//           headers: {
//             ...getConfig().headers,
//             "Content-Type": "multipart/form-data",
//           },
//         });
//         toast.success("Class updated successfully");
//       } else {
//         await API.post("/classes/institute/create", payload, {
//           headers: {
//             ...getConfig().headers,
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

//   const totalColumns = 20;

//   // ================= SELECT STYLES =================
//   const selectClass =
//     "w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors";
//   const inputClass =
//     "w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors";
//   const labelClass = "block text-sm text-white mb-1";

//   // ================= JSX =================
//   return (
//     <div className="p-8 text-white">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//         <div>
//           <h1 className="text-4xl font-bold text-purple-400">
//             Institute Classes
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
//             className="absolute left-4 top-1/2 -translate-y-1/2 text-white pointer-events-none"
//             size={18}
//           />
//           <input
//             type="text"
//             placeholder="Search by name, description, highlights, trainer, category, level, mode..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full pl-12 pr-10 py-3.5 rounded-xl bg-[#151519] border border-[#2c2c35] text-white placeholder-white focus:outline-none focus:border-purple-500/60 transition-colors text-sm"
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
//                 <th className="p-4 text-left whitespace-nowrap">Trainer</th>
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

//                     {/* Trainer */}
//                     <td className="p-4 text-white whitespace-nowrap">
//                       {cls.trainer_name || "-"}
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

//                 {/* Trainer Only */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
//                   <div></div>
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

//                 {/* Start Time (MUI TimePicker) */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className={labelClass}>Start Time</label>
//                     <LocalizationProvider dateAdapter={AdapterDayjs}>
//                       <TimePicker
//                         label="Start Time"
//                         ampm
//                         value={
//                           formData.start_time
//                             ? dayjs(`2000-01-01 ${formData.start_time}`)
//                             : null
//                         }
//                         onChange={(value) =>
//                           setFormData({
//                             ...formData,
//                             start_time: value
//                               ? value.format("HH:mm:ss")
//                               : "",
//                           })
//                         }
//                         slotProps={{
//                           textField: {
//                             fullWidth: true,
//                           },
//                         }}
//                       />
//                     </LocalizationProvider>
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



import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Edit, Trash2, Search } from "lucide-react";
import { FaTrash, FaTimes } from "react-icons/fa";

import {
  LocalizationProvider,
} from "@mui/x-date-pickers/LocalizationProvider";
import {
  AdapterDayjs,
} from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";

import API from "../services/api";

/* =========================================================
   HELPERS
========================================================= */

const formatTime = (timeStr) => {
  if (!timeStr) return "-";

  const value = String(timeStr);

  if (
    value.includes("AM") ||
    value.includes("PM") ||
    value.includes("am") ||
    value.includes("pm")
  ) {
    return value;
  }

  const parts = value.split(":");

  const hours = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1] || "0", 10);

  if (Number.isNaN(hours)) {
    return value;
  }

  const period = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 || 12;

  return `${hour12}:${String(minutes).padStart(2, "0")} ${period}`;
};

const formatDate = (dateStr) => {
  if (!dateStr) return "-";

  try {
    const date = new Date(dateStr);

    if (Number.isNaN(date.getTime())) {
      return dateStr;
    }

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
};

const formatDays = (days) => {
  if (!days) return "-";

  let parsedDays = [];

  try {
    parsedDays = Array.isArray(days)
      ? days
      : JSON.parse(days || "[]");
  } catch {
    return "-";
  }

  if (!Array.isArray(parsedDays) || parsedDays.length === 0) {
    return "-";
  }

  const shortNames = {
    MONDAY: "Mon",
    TUESDAY: "Tue",
    WEDNESDAY: "Wed",
    THURSDAY: "Thu",
    FRIDAY: "Fri",
    SATURDAY: "Sat",
    SUNDAY: "Sun",
  };

  return parsedDays
    .map((day) => shortNames[day] || day)
    .join(", ");
};

const truncate = (text, maxLen = 40) => {
  if (!text) return "-";

  const value = String(text);

  return value.length > maxLen
    ? `${value.slice(0, maxLen)}...`
    : value;
};

const extractArray = (response) => {
  if (Array.isArray(response)) {
    return response;
  }

  if (Array.isArray(response?.data)) {
    return response.data;
  }

  if (Array.isArray(response?.data?.data)) {
    return response.data.data;
  }

  return [];
};

const getImageUrl = (item) => {
  if (!item) return "";

  if (typeof item === "string") {
    if (item.startsWith("http")) {
      return item;
    }

    return `http://localhost:5000${item}`;
  }

  return "";
};

/* =========================================================
   INSTITUTE CATEGORY ID EXTRACTION
========================================================= */

const extractInstituteCategoryIds = (profile) => {
  if (!profile) {
    return [];
  }

  const possibleSources = [
    profile.categories,
    profile.category_ids,
    profile.categoryIds,
    profile.institute_categories,
    profile.instituteCategories,
    profile.selectedCategories,
    profile.selected_categories,
  ];

  let source = [];

  for (const item of possibleSources) {
    if (Array.isArray(item) && item.length > 0) {
      source = item;
      break;
    }
  }

  if (
    source.length === 0 &&
    profile.category_id !== undefined &&
    profile.category_id !== null
  ) {
    source = [profile.category_id];
  }

  const ids = source
    .map((item) => {
      if (
        typeof item === "number" ||
        typeof item === "string"
      ) {
        const id = Number(item);

        return Number.isNaN(id) ? null : id;
      }

      if (!item || typeof item !== "object") {
        return null;
      }

      const id = Number(
        item.category_id ??
          item.categoryId ??
          item.id ??
          item.category?.id
      );

      return Number.isNaN(id) ? null : id;
    })
    .filter(
      (id) =>
        id !== null &&
        id !== undefined
    );

  return [...new Set(ids)];
};

/* =========================================================
   DAYS
========================================================= */

const DAYS_LIST = [
  {
    label: "Monday",
    value: "MONDAY",
  },
  {
    label: "Tuesday",
    value: "TUESDAY",
  },
  {
    label: "Wednesday",
    value: "WEDNESDAY",
  },
  {
    label: "Thursday",
    value: "THURSDAY",
  },
  {
    label: "Friday",
    value: "FRIDAY",
  },
  {
    label: "Saturday",
    value: "SATURDAY",
  },
  {
    label: "Sunday",
    value: "SUNDAY",
  },
];

/* =========================================================
   DEFAULT FORM
========================================================= */

const createDefaultForm = () => ({
  title: "",
  description: "",
  highlights: "",
  image: null,

  category_id: "",
  subcategory_id: "",
  trainer_id: "",

  price: "",
  duration: "60",

  level: "BEGINNER",
  mode: "ONLINE",

  students_count: "",

  course_start_date: "",
  course_end_date: "",

  start_time: "",

  available_days: [],
});

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function InstituteClasses() {
  /* =======================================================
     CLASS STATES
  ======================================================= */

  const [classes, setClasses] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [editingClass, setEditingClass] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [deletingClass, setDeletingClass] = useState(null);

  /* =======================================================
     DROPDOWN STATES
  ======================================================= */

  const [categories, setCategories] = useState([]);

  const [subcategories, setSubcategories] = useState([]);

  const [trainers, setTrainers] = useState([]);

  const [instituteProfile, setInstituteProfile] = useState(null);

  const [dropdownLoading, setDropdownLoading] = useState(true);

  /* =======================================================
     FORM STATE
  ======================================================= */

  const [formData, setFormData] = useState(
    createDefaultForm()
  );

  /* =======================================================
     AUTH CONFIG
     
     IMPORTANT:
     InstituteLogin stores Firebase token as:
     
     localStorage.setItem("token", firebaseToken);
     
     Therefore this file MUST use "token".
  ======================================================= */

  const getConfig = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      return {};
    }

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  /* =======================================================
     CHECK TOKEN
  ======================================================= */

  const hasInstituteToken = () => {
    const token = localStorage.getItem("token");

    return Boolean(token);
  };

  /* =======================================================
     FILTER CLASSES
  ======================================================= */

  const filteredClasses = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return classes;
    }

    return classes.filter((cls) => {
      return (
        cls.title
          ?.toLowerCase()
          .includes(query) ||
        cls.description
          ?.toLowerCase()
          .includes(query) ||
        cls.highlights
          ?.toLowerCase()
          .includes(query) ||
        cls.trainer_name
          ?.toLowerCase()
          .includes(query) ||
        cls.category_name
          ?.toLowerCase()
          .includes(query) ||
        cls.subcategory_name
          ?.toLowerCase()
          .includes(query) ||
        cls.level
          ?.toLowerCase()
          .includes(query) ||
        cls.mode
          ?.toLowerCase()
          .includes(query) ||
        String(cls.id).includes(query) ||
        String(cls.price).includes(query) ||
        String(cls.duration).includes(query)
      );
    });
  }, [classes, searchQuery]);

  /* =======================================================
     FETCH CLASSES
  ======================================================= */

  const fetchClasses = async () => {
    try {
      if (!hasInstituteToken()) {
        console.error(
          "Institute Firebase token not found."
        );
        return;
      }

      const config = getConfig();

      const response = await API.get(
        "/classes/institute/my-classes",
        config
      );

      console.log(
        "CLASSES RESPONSE:",
        response.data
      );

      const data =
        response?.data?.data ??
        response?.data ??
        [];

      setClasses(
        Array.isArray(data)
          ? data
          : []
      );
    } catch (error) {
      console.error(
        "FETCH CLASSES ERROR:",
        error
      );

      console.error(
        "BACKEND RESPONSE:",
        error?.response?.data
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to fetch classes"
      );
    }
  };

  /* =======================================================
     FETCH INSTITUTE PROFILE
  ======================================================= */

  const fetchInstituteProfile = async () => {
    if (!hasInstituteToken()) {
      throw new Error(
        "Institute token missing"
      );
    }

    const config = getConfig();

    const response = await API.get(
      "/institutes/profile",
      config
    );

    console.log(
      "INSTITUTE PROFILE RESPONSE:",
      response.data
    );

    const profile =
      response?.data?.data ??
      response?.data ??
      null;

    setInstituteProfile(profile);

    return profile;
  };

  /* =======================================================
     FETCH ALL CATEGORIES
     
     Then filter them according to
     institute profile selections.
  ======================================================= */

  const fetchCategoriesForInstitute = async (
    profile
  ) => {
    try {
      const response = await API.get(
        "/categories"
      );

      console.log(
        "ALL CATEGORIES RESPONSE:",
        response.data
      );

      const allCategories =
        extractArray(response);

      const instituteCategoryIds =
        extractInstituteCategoryIds(
          profile
        );

      console.log(
        "INSTITUTE CATEGORY IDS:",
        instituteCategoryIds
      );

      /*
        Only categories selected while
        creating the institute profile.
      */

      let allowedCategories =
        allCategories.filter(
          (category) =>
            instituteCategoryIds.includes(
              Number(category.id)
            )
        );

      /*
        Fallback:
        If the profile itself contains
        complete category objects.
      */

      if (
        allowedCategories.length === 0 &&
        instituteCategoryIds.length === 0
      ) {
        const profileCategories =
          profile?.categories;

        if (
          Array.isArray(profileCategories)
        ) {
          allowedCategories =
            profileCategories
              .map((item) => {
                if (
                  !item ||
                  typeof item !== "object"
                ) {
                  return null;
                }

                return {
                  id:
                    item.id ??
                    item.category_id ??
                    item.categoryId,
                  name:
                    item.name ??
                    item.category_name ??
                    item.categoryName,
                };
              })
              .filter(
                (item) =>
                  item?.id &&
                  item?.name
              );
        }
      }

      console.log(
        "ALLOWED INSTITUTE CATEGORIES:",
        allowedCategories
      );

      setCategories(
        allowedCategories
      );

      return allowedCategories;
    } catch (error) {
      console.error(
        "FETCH CATEGORIES ERROR:",
        error
      );

      throw error;
    }
  };

  /* =======================================================
     FETCH SUBCATEGORIES
  ======================================================= */

  const fetchSubcategories = async () => {
    try {
      const response = await API.get(
        "/subcategories"
      );

      console.log(
        "SUBCATEGORIES RESPONSE:",
        response.data
      );

      const data =
        extractArray(response);

      setSubcategories(data);

      return data;
    } catch (error) {
      console.error(
        "FETCH SUBCATEGORIES ERROR:",
        error
      );

      throw error;
    }
  };

  /* =======================================================
     FETCH INSTITUTE TRAINERS
  ======================================================= */

  const fetchTrainers = async () => {
    try {
      if (!hasInstituteToken()) {
        throw new Error(
          "Institute token missing"
        );
      }

      const config = getConfig();

      const response = await API.get(
        "/trainers/institute",
        config
      );

      console.log(
        "INSTITUTE TRAINERS RESPONSE:",
        response.data
      );

      const data =
        extractArray(response);

      setTrainers(data);

      return data;
    } catch (error) {
      console.error(
        "FETCH TRAINERS ERROR:",
        error
      );

      throw error;
    }
  };

  /* =======================================================
     FETCH DROPDOWNS
  ======================================================= */

  const fetchDropdowns = async () => {
    try {
      setDropdownLoading(true);

      if (!hasInstituteToken()) {
        console.error(
          "Institute token not found."
        );

        return;
      }

      /*
        First fetch institute profile.
      */

      const profile =
        await fetchInstituteProfile();

      /*
        Then load:
        1. Institute categories
        2. Subcategories
        3. Institute trainers
      */

      await Promise.all([
        fetchCategoriesForInstitute(
          profile
        ),
        fetchSubcategories(),
        fetchTrainers(),
      ]);
    } catch (error) {
      console.error(
        "FETCH DROPDOWNS ERROR:",
        error
      );

      console.error(
        "BACKEND RESPONSE:",
        error?.response?.data
      );

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to load dropdown data"
      );
    } finally {
      setDropdownLoading(false);
    }
  };

  /* =======================================================
     INITIAL LOAD
  ======================================================= */

  useEffect(() => {
    fetchClasses();
    fetchDropdowns();
  }, []);

  /* =======================================================
     OPEN ADD MODAL
  ======================================================= */

  const openAddModal = () => {
    setEditingClass(null);

    const newForm =
      createDefaultForm();

    /*
      If only one institute category
      exists, select it automatically.
    */

    if (categories.length === 1) {
      newForm.category_id =
        String(categories[0].id);
    }

    setFormData(newForm);

    setShowModal(true);
  };

  /* =======================================================
     CLOSE MODAL
  ======================================================= */

  const closeModal = () => {
    setShowModal(false);

    setEditingClass(null);

    setFormData(
      createDefaultForm()
    );
  };

  /* =======================================================
     CATEGORY CHANGE
  ======================================================= */

  const handleCategoryChange = (e) => {
    const categoryId =
      e.target.value;

    setFormData((previous) => ({
      ...previous,
      category_id: categoryId,

      /*
        Important:
        Clear subcategory whenever
        category changes.
      */

      subcategory_id: "",
    }));
  };

  /* =======================================================
     RELATED SUBCATEGORIES
  ======================================================= */

  const relatedSubcategories =
    useMemo(() => {
      if (!formData.category_id) {
        return [];
      }

      return subcategories.filter(
        (subcategory) => {
          const categoryId =
            subcategory.category_id ??
            subcategory.categoryId ??
            subcategory.category?.id;

          return (
            String(categoryId) ===
            String(
              formData.category_id
            )
          );
        }
      );
    }, [
      subcategories,
      formData.category_id,
    ]);

  /* =======================================================
     TRAINER CHANGE
  ======================================================= */

  const handleTrainerChange = (e) => {
    setFormData((previous) => ({
      ...previous,
      trainer_id: e.target.value,
    }));
  };

  /* =======================================================
     TOGGLE DAY
  ======================================================= */

  const toggleDay = (dayValue) => {
    setFormData((previous) => {
      const exists =
        previous.available_days.includes(
          dayValue
        );

      return {
        ...previous,

        available_days: exists
          ? previous.available_days.filter(
              (day) =>
                day !== dayValue
            )
          : [
              ...previous.available_days,
              dayValue,
            ],
      };
    });
  };

  /* =======================================================
     EDIT CLASS
  ======================================================= */

  const handleEdit = (cls) => {
    setEditingClass(cls);

    let availableDays = [];

    try {
      availableDays =
        Array.isArray(
          cls.available_days
        )
          ? cls.available_days
          : JSON.parse(
              cls.available_days ||
                "[]"
            );
    } catch {
      availableDays = [];
    }

    const categoryId =
      cls.category_id ??
      cls.categoryId ??
      cls.category?.id ??
      "";

    const subcategoryId =
      cls.subcategory_id ??
      cls.subcategoryId ??
      cls.subcategory?.id ??
      "";

    const trainerId =
      cls.trainer_id ??
      cls.trainerId ??
      cls.trainer?.id ??
      "";

    setFormData({
      title:
        cls.title || "",

      description:
        cls.description || "",

      highlights:
        cls.highlights || "",

      image: null,

      category_id:
        categoryId
          ? String(categoryId)
          : "",

      subcategory_id:
        subcategoryId
          ? String(subcategoryId)
          : "",

      trainer_id:
        trainerId
          ? String(trainerId)
          : "",

      price:
        cls.price ?? "",

      duration:
        cls.duration ?? "60",

      level:
        cls.level ||
        "BEGINNER",

      mode:
        cls.mode ||
        "ONLINE",

      students_count:
        cls.students_count ?? "",

      course_start_date:
        cls.start_date ||
        cls.course_start_date ||
        "",

      course_end_date:
        cls.end_date ||
        cls.course_end_date ||
        "",

      start_time:
        cls.default_start_time ||
        cls.start_time ||
        "",

      available_days:
        Array.isArray(
          availableDays
        )
          ? availableDays
          : [],
    });

    setShowModal(true);
  };

  /* =======================================================
     DELETE CLASS
  ======================================================= */

  const handleDelete = (cls) => {
    setDeletingClass(cls);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!deletingClass) {
      return;
    }

    try {
      if (!hasInstituteToken()) {
        toast.error(
          "Institute session expired. Please login again."
        );

        return;
      }

      const config = getConfig();

      await API.delete(
        `/classes/institute/${deletingClass.id}`,
        config
      );

      toast.success(
        "Class deleted successfully"
      );

      await fetchClasses();
    } catch (error) {
      console.error(
        "DELETE CLASS ERROR:",
        error
      );

      console.error(
        "BACKEND RESPONSE:",
        error?.response?.data
      );

      toast.error(
        error?.response?.data?.message ||
          "Delete failed"
      );
    } finally {
      setShowDeleteModal(false);
      setDeletingClass(null);
    }
  };

  /* =======================================================
     SUBMIT CLASS
  ======================================================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    /* =====================================================
       VALIDATION
    ===================================================== */

    if (!formData.title?.trim()) {
      toast.error(
        "Class Name is required"
      );

      return;
    }

    if (!formData.category_id) {
      toast.error(
        "Please select a Category"
      );

      return;
    }

    /*
      Verify that selected category
      belongs to this institute.
    */

    const categoryAllowed =
      categories.some(
        (category) =>
          String(category.id) ===
          String(
            formData.category_id
          )
      );

    if (!categoryAllowed) {
      toast.error(
        "Selected category is not available for this institute"
      );

      return;
    }

    if (!formData.trainer_id) {
      toast.error(
        "Please select a Trainer"
      );

      return;
    }

    if (!hasInstituteToken()) {
      toast.error(
        "Institute session expired. Please login again."
      );

      return;
    }

    /*
      If a subcategory is selected,
      make sure it belongs to the selected
      category.
    */

    if (formData.subcategory_id) {
      const validSubcategory =
        relatedSubcategories.some(
          (subcategory) =>
            String(
              subcategory.id
            ) ===
            String(
              formData.subcategory_id
            )
        );

      if (!validSubcategory) {
        toast.error(
          "Selected subcategory does not belong to this category"
        );

        return;
      }
    }

    /* =====================================================
       CREATE FORMDATA
    ===================================================== */

    const payload = new FormData();

    payload.append(
      "title",
      formData.title.trim()
    );

    payload.append(
      "description",
      formData.description?.trim() ||
        ""
    );

    payload.append(
      "highlights",
      formData.highlights || ""
    );

    payload.append(
      "category_id",
      formData.category_id
    );

    if (formData.subcategory_id) {
      payload.append(
        "subcategory_id",
        formData.subcategory_id
      );
    }

    payload.append(
      "trainer_id",
      formData.trainer_id
    );

    payload.append(
      "students_count",
      formData.students_count ||
        "0"
    );

    payload.append(
      "price",
      formData.price || "0"
    );

    payload.append(
      "duration",
      formData.duration || "60"
    );

    payload.append(
      "level",
      formData.level || "BEGINNER"
    );

    payload.append(
      "mode",
      formData.mode || "ONLINE"
    );

    if (formData.image) {
      payload.append(
        "image",
        formData.image
      );
    }

    if (formData.course_start_date) {
      payload.append(
        "start_date",
        formData.course_start_date
      );
    }

    if (formData.course_end_date) {
      payload.append(
        "end_date",
        formData.course_end_date
      );
    }

    if (formData.start_time) {
      payload.append(
        "start_time",
        formData.start_time
      );
    }

    formData.available_days.forEach(
      (day) => {
        payload.append(
          "available_days[]",
          day
        );
      }
    );

    /* =====================================================
       DEBUG
    ===================================================== */

    console.log(
      "CLASS FORM DATA:"
    );

    for (const [
      key,
      value,
    ] of payload.entries()) {
      console.log(
        key,
        value
      );
    }

    /* =====================================================
       API REQUEST
    ===================================================== */

    try {
      const config = getConfig();

      if (
        !config.headers?.Authorization
      ) {
        throw new Error(
          "Institute token missing"
        );
      }

      if (editingClass?.id) {
        await API.put(
          `/classes/institute/${editingClass.id}`,
          payload,
          {
            headers: {
              ...config.headers,
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

        toast.success(
          "Class updated successfully"
        );
      } else {
        await API.post(
          "/classes/institute/create",
          payload,
          {
            headers: {
              ...config.headers,
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

        toast.success(
          "Class created successfully"
        );
      }

      await fetchClasses();

      closeModal();
    } catch (error) {
      console.error(
        "CLASS SAVE ERROR:",
        error
      );

      console.error(
        "BACKEND RESPONSE:",
        error?.response?.data
      );

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong"
      );
    }
  };

  /* =======================================================
     MODE COLOR
  ======================================================= */

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

  /* =======================================================
     STYLES
  ======================================================= */

  const selectClass =
    "w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

  const inputClass =
    "w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors";

  const labelClass =
    "block text-sm text-white mb-1";

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="p-8 text-white">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">

        <div>
          <h1 className="text-4xl font-bold text-purple-400">
            Institute Classes
          </h1>

          <p className="text-white mt-2">
            Manage your classes
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition-opacity"
        >
          + Add Class
        </button>

      </div>

      {/* =================================================
          SEARCH
      ================================================= */}

      <div className="mb-6">

        <div className="relative w-full">

          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white pointer-events-none"
            size={18}
          />

          <input
            type="text"
            placeholder="Search by name, description, trainer, category, level, mode..."
            value={searchQuery}
            onChange={(e) =>
              setSearchQuery(
                e.target.value
              )
            }
            className="w-full pl-12 pr-10 py-3.5 rounded-xl bg-[#151519] border border-[#2c2c35] text-white placeholder-white focus:outline-none focus:border-purple-500/60 transition-colors text-sm"
          />

          {searchQuery && (
            <button
              onClick={() =>
                setSearchQuery("")
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
            >
              <FaTimes size={14} />
            </button>
          )}

        </div>

      </div>

      {/* =================================================
          TABLE
      ================================================= */}

      <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-[#202027] text-white">

              <tr>

                <th className="p-4 text-left whitespace-nowrap">
                  ID
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Image
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Class Name
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Description
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Trainer
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Category
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Subcategory
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Level
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Mode
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Price
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Duration
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Students
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Start Date
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  End Date
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Start Time
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Available Days
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredClasses.length ===
              0 ? (
                <tr>

                  <td
                    colSpan={17}
                    className="p-12 text-center"
                  >

                    <div className="flex flex-col items-center gap-3">

                      <Search
                        size={40}
                        className="text-gray-600"
                      />

                      <p className="text-gray-500 text-lg">
                        {searchQuery
                          ? "No classes found matching your search"
                          : "No classes available"}
                      </p>

                      {searchQuery && (
                        <button
                          onClick={() =>
                            setSearchQuery("")
                          }
                          className="text-purple-400 hover:text-purple-300 text-sm mt-1"
                        >
                          Clear search
                        </button>
                      )}

                    </div>

                  </td>

                </tr>
              ) : (
                filteredClasses.map(
                  (cls) => (
                    <tr
                      key={cls.id}
                      className="border-t border-[#2c2c35] hover:bg-[#1a1a20] transition-colors"
                    >

                      {/* ID */}

                      <td className="p-4 text-white whitespace-nowrap">
                        {cls.id}
                      </td>

                      {/* IMAGE */}

                      <td className="p-4">

                        {cls.image ? (
                          <img
                            src={getImageUrl(
                              cls.image
                            )}
                            alt={
                              cls.title
                            }
                            className="w-11 h-11 rounded-xl object-cover border border-[#333]"
                            onError={(
                              e
                            ) => {
                              e.currentTarget.style.display =
                                "none";
                            }}
                          />
                        ) : (
                          <div className="w-11 h-11 bg-[#26262b] rounded-xl flex items-center justify-center text-gray-600 text-xs">
                            N/A
                          </div>
                        )}

                      </td>

                      {/* CLASS NAME */}

                      <td className="p-4 font-medium whitespace-nowrap">
                        {cls.title}
                      </td>

                      {/* DESCRIPTION */}

                      <td
                        className="p-4 text-white max-w-[130px] truncate"
                        title={
                          cls.description ||
                          ""
                        }
                      >
                        {truncate(
                          cls.description,
                          30
                        )}
                      </td>

                      {/* TRAINER */}

                      <td className="p-4 text-white whitespace-nowrap">
                        {cls.trainer_name ||
                          "-"}
                      </td>

                      {/* CATEGORY */}

                      <td className="p-4 text-white whitespace-nowrap">
                        {cls.category_name ||
                          "-"}
                      </td>

                      {/* SUBCATEGORY */}

                      <td className="p-4 text-white whitespace-nowrap">
                        {cls.subcategory_name ||
                          "-"}
                      </td>

                      {/* LEVEL */}

                      <td className="p-4 whitespace-nowrap">

                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300">
                          {cls.level ||
                            "-"}
                        </span>

                      </td>

                      {/* MODE */}

                      <td className="p-4 whitespace-nowrap">

                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getModeColor(
                            cls.mode
                          )}`}
                        >
                          {cls.mode ||
                            "-"}
                        </span>

                      </td>

                      {/* PRICE */}

                      <td className="p-4 font-semibold whitespace-nowrap">
                        ₹
                        {cls.price ??
                          0}
                      </td>

                      {/* DURATION */}

                      <td className="p-4 text-white whitespace-nowrap">
                        {cls.duration
                          ? `${cls.duration} min`
                          : "-"}
                      </td>

                      {/* STUDENTS */}

                      <td className="p-4 font-semibold whitespace-nowrap">
                        {cls.students_count ??
                          0}
                      </td>

                      {/* START DATE */}

                      <td className="p-4 text-white whitespace-nowrap">
                        {formatDate(
                          cls.start_date
                        )}
                      </td>

                      {/* END DATE */}

                      <td className="p-4 text-white whitespace-nowrap">
                        {formatDate(
                          cls.end_date
                        )}
                      </td>

                      {/* START TIME */}

                      <td className="p-4 text-white whitespace-nowrap">
                        {formatTime(
                          cls.start_time
                        )}
                      </td>

                      {/* AVAILABLE DAYS */}

                      <td
                        className="p-4 text-white whitespace-nowrap"
                        title={formatDays(
                          cls.available_days
                        )}
                      >
                        {formatDays(
                          cls.available_days
                        )}
                      </td>

                      {/* ACTIONS */}

                      <td className="p-4">

                        <div className="flex items-center gap-2">

                          <button
                            onClick={() =>
                              handleEdit(
                                cls
                              )
                            }
                            className="p-2 rounded-lg hover:bg-[#2a2a35] transition-colors"
                            title="Edit"
                          >
                            <Edit
                              size={16}
                              className="text-white"
                            />
                          </button>

                          <button
                            onClick={() =>
                              handleDelete(
                                cls
                              )
                            }
                            className="p-2 rounded-lg hover:bg-red-500/10 transition-colors"
                            title="Delete"
                          >
                            <Trash2
                              size={16}
                              className="text-red-500/70 hover:text-red-400"
                            />
                          </button>

                        </div>

                      </td>

                    </tr>
                  )
                )
              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* =================================================
          ADD / EDIT CLASS MODAL
      ================================================= */}

      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">

          <div className="w-full max-w-[650px] max-h-[90vh] bg-[#211c30] rounded-2xl overflow-hidden shadow-2xl">

            {/* HEADER */}

            <div className="flex justify-between items-center p-6 border-b border-[#3a3448]">

              <h2 className="text-2xl font-bold text-white">
                {editingClass
                  ? "Edit Class"
                  : "Add Class"}
              </h2>

              <button
                onClick={
                  closeModal
                }
                className="text-white hover:text-purple-300 transition-colors"
              >
                <FaTimes size={20} />
              </button>

            </div>

            {/* BODY */}

            <div className="overflow-y-auto max-h-[75vh] p-6">

              <form
                onSubmit={
                  handleSubmit
                }
                className="space-y-1"
              >

                {/* CLASS NAME */}

                <div>

                  <label
                    className={
                      labelClass
                    }
                  >
                    Class Name *
                  </label>

                  <input
                    value={
                      formData.title
                    }
                    onChange={(
                      e
                    ) =>
                      setFormData(
                        (previous) => ({
                          ...previous,
                          title:
                            e.target
                              .value,
                        })
                      )
                    }
                    className={
                      inputClass
                    }
                    placeholder="Enter class name"
                    required
                  />

                </div>

                {/* DESCRIPTION */}

                <div>

                  <label
                    className={
                      labelClass
                    }
                  >
                    Description
                  </label>

                  <textarea
                    value={
                      formData.description
                    }
                    onChange={(
                      e
                    ) =>
                      setFormData(
                        (previous) => ({
                          ...previous,
                          description:
                            e.target
                              .value,
                        })
                      )
                    }
                    rows="3"
                    className={
                      inputClass
                    }
                    placeholder="Enter description"
                  />

                </div>

                {/* IMAGE */}

                <div>

                  <label
                    className={
                      labelClass
                    }
                  >
                    Class Image
                  </label>

                  {editingClass?.image && (
                    <img
                      src={getImageUrl(
                        editingClass.image
                      )}
                      alt="Current"
                      className="w-20 h-20 object-cover rounded-xl mb-2 border border-[#333]"
                    />
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(
                      e
                    ) =>
                      setFormData(
                        (previous) => ({
                          ...previous,
                          image:
                            e.target
                              .files?.[0] ||
                            null,
                        })
                      )
                    }
                    className="w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-500/20 file:text-purple-300"
                  />

                </div>

                {/* TRAINER */}

                <div>

                  <label
                    className={
                      labelClass
                    }
                  >
                    Trainer *
                  </label>

                  <select
                    value={
                      formData.trainer_id
                    }
                    onChange={
                      handleTrainerChange
                    }
                    className={
                      selectClass
                    }
                    required
                    disabled={
                      dropdownLoading
                    }
                  >

                    <option value="">
                      {dropdownLoading
                        ? "Loading trainers..."
                        : "Select Trainer"}
                    </option>

                    {trainers.map(
                      (trainer) => (
                        <option
                          key={
                            trainer.id
                          }
                          value={
                            trainer.id
                          }
                        >
                          {trainer.full_name ||
                            trainer.name ||
                            trainer.email ||
                            `Trainer ${trainer.id}`}
                        </option>
                      )
                    )}

                  </select>

                </div>

                {/* CATEGORY + SUBCATEGORY */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  {/* CATEGORY */}

                  <div>

                    <label
                      className={
                        labelClass
                      }
                    >
                      Category *
                    </label>

                    <select
                      value={
                        formData.category_id
                      }
                      onChange={
                        handleCategoryChange
                      }
                      className={
                        selectClass
                      }
                      required
                      disabled={
                        dropdownLoading ||
                        categories.length ===
                          0
                      }
                    >

                      <option value="">
                        {dropdownLoading
                          ? "Loading categories..."
                          : categories.length ===
                            0
                          ? "No categories available"
                          : "Select Category"}
                      </option>

                      {categories.map(
                        (
                          category
                        ) => (
                          <option
                            key={
                              category.id
                            }
                            value={
                              category.id
                            }
                          >
                            {
                              category.name
                            }
                          </option>
                        )
                      )}

                    </select>

                    {!dropdownLoading &&
                      categories.length >
                        0 && (
                        <p className="text-xs text-purple-300 -mt-3 mb-4">
                          Only categories selected for your institute are shown.
                        </p>
                      )}

                  </div>

                  {/* SUBCATEGORY */}

                  <div>

                    <label
                      className={
                        labelClass
                      }
                    >
                      Subcategory
                    </label>

                    <select
                      value={
                        formData.subcategory_id
                      }
                      onChange={(
                        e
                      ) =>
                        setFormData(
                          (previous) => ({
                            ...previous,
                            subcategory_id:
                              e.target
                                .value,
                          })
                        )
                      }
                      disabled={
                        !formData.category_id ||
                        relatedSubcategories.length ===
                          0
                      }
                      className={
                        selectClass
                      }
                    >

                      <option value="">
                        {!formData.category_id
                          ? "Select Category First"
                          : relatedSubcategories.length ===
                            0
                          ? "No Subcategories"
                          : "Select Subcategory"}
                      </option>

                      {relatedSubcategories.map(
                        (
                          subcategory
                        ) => (
                          <option
                            key={
                              subcategory.id
                            }
                            value={
                              subcategory.id
                            }
                          >
                            {
                              subcategory.name
                            }
                          </option>
                        )
                      )}

                    </select>

                    {formData.category_id &&
                      relatedSubcategories.length >
                        0 && (
                        <p className="text-xs text-gray-400 -mt-3 mb-4">
                          Showing subcategories related to the selected category.
                        </p>
                      )}

                  </div>

                </div>

                {/* PRICE + DURATION */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  <div>

                    <label
                      className={
                        labelClass
                      }
                    >
                      Price
                    </label>

                    <input
                      type="number"
                      min="0"
                      value={
                        formData.price
                      }
                      onChange={(
                        e
                      ) =>
                        setFormData(
                          (previous) => ({
                            ...previous,
                            price:
                              e.target
                                .value,
                          })
                        )
                      }
                      className={
                        inputClass
                      }
                      placeholder="0"
                    />

                  </div>

                  <div>

                    <label
                      className={
                        labelClass
                      }
                    >
                      Duration (Minutes)
                    </label>

                    <input
                      type="number"
                      min="1"
                      value={
                        formData.duration
                      }
                      onChange={(
                        e
                      ) =>
                        setFormData(
                          (previous) => ({
                            ...previous,
                            duration:
                              e.target
                                .value,
                          })
                        )
                      }
                      className={
                        inputClass
                      }
                      placeholder="60"
                    />

                  </div>

                </div>

                {/* DATES */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  <div>

                    <label
                      className={
                        labelClass
                      }
                    >
                      Course Start Date
                    </label>

                    <input
                      type="date"
                      value={
                        formData.course_start_date
                      }
                      onChange={(
                        e
                      ) =>
                        setFormData(
                          (previous) => ({
                            ...previous,
                            course_start_date:
                              e.target
                                .value,
                          })
                        )
                      }
                      className={
                        inputClass
                      }
                    />

                  </div>

                  <div>

                    <label
                      className={
                        labelClass
                      }
                    >
                      Course End Date
                    </label>

                    <input
                      type="date"
                      value={
                        formData.course_end_date
                      }
                      onChange={(
                        e
                      ) =>
                        setFormData(
                          (previous) => ({
                            ...previous,
                            course_end_date:
                              e.target
                                .value,
                          })
                        )
                      }
                      className={
                        inputClass
                      }
                    />

                  </div>

                </div>

                {/* START TIME */}

                <div>

                  <label
                    className={
                      labelClass
                    }
                  >
                    Start Time
                  </label>

                  <LocalizationProvider
                    dateAdapter={
                      AdapterDayjs
                    }
                  >

                    <TimePicker
                      ampm
                      value={
                        formData.start_time
                          ? dayjs(
                              `2000-01-01 ${formData.start_time}`
                            )
                          : null
                      }
                      onChange={(
                        value
                      ) =>
                        setFormData(
                          (previous) => ({
                            ...previous,
                            start_time:
                              value
                                ? value.format(
                                    "HH:mm:ss"
                                  )
                                : "",
                          })
                        )
                      }
                      slotProps={{
                        textField: {
                          fullWidth:
                            true,

                          sx: {
                            marginTop:
                              "8px",

                            marginBottom:
                              "16px",

                            "& .MuiInputBase-root":
                              {
                                backgroundColor:
                                  "#2b2638",

                                borderRadius:
                                  "12px",

                                color:
                                  "white",
                              },

                            "& .MuiInputBase-input":
                              {
                                color:
                                  "white",
                              },

                            "& .MuiInputLabel-root":
                              {
                                color:
                                  "#9ca3af",
                              },

                            "& .MuiSvgIcon-root":
                              {
                                color:
                                  "white",
                              },

                            "& fieldset":
                              {
                                borderColor:
                                  "transparent",
                              },

                            "&:hover fieldset":
                              {
                                borderColor:
                                  "rgba(168,85,247,0.5)",
                              },

                            "&.Mui-focused fieldset":
                              {
                                borderColor:
                                  "#a855f7",
                              },
                          },
                        },
                      }}
                    />

                  </LocalizationProvider>

                </div>

                {/* AVAILABLE DAYS */}

                <div>

                  <label
                    className={
                      labelClass
                    }
                  >
                    Available Days
                  </label>

                  <div className="mt-2 mb-4 grid grid-cols-4 sm:grid-cols-7 gap-2">

                    {DAYS_LIST.map(
                      (day) => {
                        const isChecked =
                          formData.available_days.includes(
                            day.value
                          );

                        return (
                          <label
                            key={
                              day.value
                            }
                            className={`
                              flex
                              items-center
                              justify-center
                              gap-1.5
                              p-2.5
                              rounded-xl
                              cursor-pointer
                              text-xs
                              font-medium
                              transition-all
                              border
                              ${
                                isChecked
                                  ? "bg-purple-500/20 border-purple-500/50 text-purple-300"
                                  : "bg-[#2b2638] border-transparent text-white hover:border-purple-500/30"
                              }
                            `}
                          >

                            <input
                              type="checkbox"
                              checked={
                                isChecked
                              }
                              onChange={() =>
                                toggleDay(
                                  day.value
                                )
                              }
                              className="sr-only"
                            />

                            <span
                              className={`
                                w-4
                                h-4
                                rounded
                                border
                                flex
                                items-center
                                justify-center
                                ${
                                  isChecked
                                    ? "bg-purple-500 border-purple-500"
                                    : "border-gray-500"
                                }
                              `}
                            >
                              {isChecked && (
                                <svg
                                  className="w-3 h-3 text-white"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={
                                    3
                                  }
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              )}
                            </span>

                            {day.label.slice(
                              0,
                              3
                            )}

                          </label>
                        );
                      }
                    )}

                  </div>

                </div>

                {/* STUDENTS COUNT */}

                <div>

                  <label
                    className={
                      labelClass
                    }
                  >
                    Students Count
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={
                      formData.students_count
                    }
                    onChange={(
                      e
                    ) =>
                      setFormData(
                        (previous) => ({
                          ...previous,
                          students_count:
                            e.target
                              .value,
                        })
                      )
                    }
                    className={
                      inputClass
                    }
                    placeholder="0"
                  />

                </div>

                {/* LEVEL + MODE */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  <div>

                    <label
                      className={
                        labelClass
                      }
                    >
                      Level
                    </label>

                    <select
                      value={
                        formData.level
                      }
                      onChange={(
                        e
                      ) =>
                        setFormData(
                          (previous) => ({
                            ...previous,
                            level:
                              e.target
                                .value,
                          })
                        )
                      }
                      className={
                        selectClass
                      }
                    >

                      <option value="BEGINNER">
                        Beginner
                      </option>

                      <option value="INTERMEDIATE">
                        Intermediate
                      </option>

                      <option value="ADVANCED">
                        Advanced
                      </option>

                    </select>

                  </div>

                  <div>

                    <label
                      className={
                        labelClass
                      }
                    >
                      Mode
                    </label>

                    <select
                      value={
                        formData.mode
                      }
                      onChange={(
                        e
                      ) =>
                        setFormData(
                          (previous) => ({
                            ...previous,
                            mode:
                              e.target
                                .value,
                          })
                        )
                      }
                      className={
                        selectClass
                      }
                    >

                      <option value="ONLINE">
                        Online
                      </option>

                      <option value="OFFLINE">
                        Offline
                      </option>

                      <option value="HYBRID">
                        Hybrid
                      </option>

                    </select>

                  </div>

                </div>

                {/* BUTTONS */}

                <div className="flex justify-end gap-3 pt-4 border-t border-[#3a3448]">

                  <button
                    type="button"
                    onClick={
                      closeModal
                    }
                    className="px-5 py-3 rounded-xl border border-gray-600 text-gray-300 hover:bg-[#2b2638] transition-colors"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={
                      dropdownLoading ||
                      categories.length ===
                        0
                    }
                    className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {editingClass
                      ? "Update Class"
                      : "Add Class"}
                  </button>

                </div>

              </form>

            </div>

          </div>

        </div>
      )}

      {/* =================================================
          DELETE CONFIRMATION MODAL
      ================================================= */}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">

          <div className="w-full max-w-[400px] bg-[#1e1b2e] border border-[#2e2a42] rounded-2xl shadow-2xl overflow-hidden">

            <div className="p-8 flex flex-col items-center">

              <div className="w-14 h-14 rounded-full bg-red-500/15 flex items-center justify-center mb-5">

                <FaTrash className="text-red-400 text-lg" />

              </div>

              <h2 className="text-xl font-bold text-white mb-3 text-center">
                Delete Class
              </h2>

              <p className="text-white text-center text-sm leading-relaxed mb-8">
                Are you sure you want to
                delete this class?
              </p>

              <div className="flex gap-3 w-full">

                <button
                  onClick={() => {
                    setShowDeleteModal(
                      false
                    );

                    setDeletingClass(
                      null
                    );
                  }}
                  className="flex-1 px-5 py-3 rounded-xl border border-[#3a3650] text-gray-300 hover:bg-[#2a2640] transition-colors font-medium text-sm"
                >
                  Cancel
                </button>

                <button
                  onClick={
                    confirmDelete
                  }
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