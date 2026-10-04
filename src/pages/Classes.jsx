
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
//     if (formData.image) payload.append("image", formData.image);

//     if (formData.course_start_date)
//       payload.append("start_date", formData.course_start_date);
   
//     if (formData.start_time)
//       payload.append("start_time", formData.start_time);
  
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

//   const totalColumns = 20;

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

//       {/* Table */}
//       <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-[#202027] text-gray-400">
//               <tr>
//                 <th className="p-4 text-left whitespace-nowrap">ID</th>
//                 <th className="p-4 text-left whitespace-nowrap">Image</th>
//                 <th className="p-4 text-left whitespace-nowrap">Class Name</th>
//                 <th className="p-4 text-left whitespace-nowrap">Description</th>
                
//                 <th className="p-4 text-left whitespace-nowrap">Institute</th>
//                 <th className="p-4 text-left whitespace-nowrap">Trainer</th>
//                 <th className="p-4 text-left whitespace-nowrap">Category</th>
//                 <th className="p-4 text-left whitespace-nowrap">Subcategory</th>
//                 <th className="p-4 text-left whitespace-nowrap">Level</th>
//                 <th className="p-4 text-left whitespace-nowrap">Mode</th>
//                 <th className="p-4 text-left whitespace-nowrap">Price</th>
//                 <th className="p-4 text-left whitespace-nowrap">Duration</th>
//                 <th className="p-4 text-left whitespace-nowrap">Students</th>
//                 <th className="p-4 text-left whitespace-nowrap">Start Date</th>
        
//                 <th className="p-4 text-left whitespace-nowrap">Start Time</th>
    
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
//                     <td className="p-4 text-gray-400 whitespace-nowrap">
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
//                       className="p-4 text-gray-400 max-w-[130px] truncate"
//                       title={cls.description || ""}
//                     >
//                       {truncate(cls.description, 30)}
//                     </td>

                 
                 
//                     {/* Institute */}
//                     <td className="p-4 text-gray-400 whitespace-nowrap">
//                       {cls.institute?.name  || "-"}
//                     </td>

//                     {/* Trainer */}
//                     <td className="p-4 text-gray-400 whitespace-nowrap">
//                       {cls.trainer?.name || "-"}
//                     </td>

//                     {/* Category */}
//                     <td className="p-4 text-gray-400 whitespace-nowrap">
//                       {cls.category_name || "-"}
//                     </td>

//                     {/* Subcategory */}
//                     <td className="p-4 text-gray-400 whitespace-nowrap">
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
//                     <td className="p-4 text-gray-400 whitespace-nowrap">
//                       {cls.duration ? `${cls.duration} min` : "-"}
//                     </td>

//                     {/* Students */}
//                     <td className="p-4 font-semibold whitespace-nowrap">
//                       {cls.studentsCount ?? 0}
//                     </td>

//                     {/* Start Date */}
//                     <td className="p-4 text-gray-400 whitespace-nowrap">
//                         {formatDate(cls.start_date)}
//                     </td>

                   
                   

//                     {/* Start Time */}
//                     <td className="p-4 text-gray-400 whitespace-nowrap">
//                     {formatTime(cls.start_time)}
//                     </td>

                  

//                     {/* Available Days */}
//                     <td
//                       className="p-4 text-gray-400 whitespace-nowrap"
//                       title={formatDays(cls.availableDays)}
//                     >
//                      {formatDays(cls.availableDays)}
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
//                   {/* <div>
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
//                   </div> */}
//                 </div>

//                 {/* Default Start Time & End Time */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className={labelClass}> Start Time</label>
//                    <LocalizationProvider dateAdapter={AdapterDayjs}>
//   <TimePicker
//     label="Start Time"
//     ampm
//     value={
//       formData.start_time
//         ? dayjs(`2000-01-01 ${formData.start_time}`)
//         : null
//     }
//     onChange={(value) =>
//       setFormData({
//         ...formData,
//         start_time: value ? value.format("HH:mm:ss") : "",
//       })
//     }
//     slotProps={{
//       textField: {
//         fullWidth: true,
//       },
//     }}
//   />
// </LocalizationProvider>
//                   </div>
//                   {/* <div>
//                     <label className={labelClass}>Default End Time</label>
//                     <input
//                       type="time"
//                       value={formData.end_time}
//                       onChange={(e) =>
//                         setFormData({ ...formData, end_time: e.target.value })
//                       }
//                       className={inputClass}
//                     />
//                   </div> */}
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

import {
  LocalizationProvider,
} from "@mui/x-date-pickers/LocalizationProvider";
import {
  AdapterDayjs,
} from "@mui/x-date-pickers/AdapterDayjs";
import {
  TimePicker,
} from "@mui/x-date-pickers/TimePicker";

import dayjs from "dayjs";
import API from "../services/api";

/* =========================================================
   CONSTANTS
========================================================= */

const BACKEND_URL =
  "https://finearts-backend.onrender.com";

const DAYS_LIST = [
  { label: "Monday", value: "MONDAY" },
  { label: "Tuesday", value: "TUESDAY" },
  { label: "Wednesday", value: "WEDNESDAY" },
  { label: "Thursday", value: "THURSDAY" },
  { label: "Friday", value: "FRIDAY" },
  { label: "Saturday", value: "SATURDAY" },
  { label: "Sunday", value: "SUNDAY" },
];

const DEFAULT_FORM = {
  title: "",
  description: "",
  highlights: "",
  image: null,

  category_id: "",
  subcategory_id: "",

  trainer_id: "",
  institute_id: "",

  price: "",
  duration: "60",

  level: "BEGINNER",
  mode: "ONLINE",

  students_count: "",

  course_start_date: "",
  course_end_date: "",

  start_time: "",
  end_time: "",

  available_days: [],
};


/* =========================================================
   HELPERS
========================================================= */

const safeArray = (value) => {
  if (!value) return [];

  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);

      return Array.isArray(parsed)
        ? parsed
        : [];
    } catch {
      return [];
    }
  }

  return [];
};


/* =========================================================
   FORMAT TIME
   Converts:
   14:30
   14:30:00
   2:30 PM

   Into:
   2:30 PM
========================================================= */

const formatTime = (timeStr) => {
  if (!timeStr) return "-";

  const value = String(timeStr).trim();

  if (!value) return "-";

  if (
    value.toUpperCase().includes("AM") ||
    value.toUpperCase().includes("PM")
  ) {
    return value;
  }

  const parts = value.split(":");

  const hours = parseInt(parts[0], 10);

  if (Number.isNaN(hours)) {
    return value;
  }

  const minutes = parts[1] || "00";

  const h12 = hours % 12 || 12;

  const period = hours >= 12
    ? "PM"
    : "AM";

  return `${h12}:${String(minutes).padStart(
    2,
    "0"
  )} ${period}`;
};


/* =========================================================
   NORMALIZE TIME FOR MUI DAYJS
========================================================= */

const normalizeTimeForPicker = (time) => {
  if (!time) return null;

  const value = String(time).trim();

  if (!value) return null;

  let parsed = dayjs(
    `2000-01-01 ${value}`
  );

  if (parsed.isValid()) {
    return parsed;
  }

  parsed = dayjs(
    `2000-01-01 ${value}`,
    [
      "YYYY-MM-DD HH:mm:ss",
      "YYYY-MM-DD HH:mm",
      "YYYY-MM-DD h:mm A",
      "YYYY-MM-DD hh:mm A",
    ]
  );

  return parsed.isValid()
    ? parsed
    : null;
};


/* =========================================================
   FORMAT DATE
========================================================= */

const formatDate = (dateStr) => {
  if (!dateStr) return "-";

  try {
    const date = new Date(dateStr);

    if (Number.isNaN(date.getTime())) {
      return String(dateStr);
    }

    return date.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  } catch {
    return String(dateStr);
  }
};


/* =========================================================
   FORMAT AVAILABLE DAYS
========================================================= */

const formatDays = (days) => {
  const arr = safeArray(days);

  if (arr.length === 0) {
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

  return arr
    .map(
      (day) =>
        shortNames[String(day).toUpperCase()] ||
        day
    )
    .join(", ");
};


/* =========================================================
   TRUNCATE
========================================================= */

const truncate = (
  text,
  maxLen = 40
) => {
  if (!text) return "-";

  const value = String(text);

  return value.length > maxLen
    ? `${value.slice(0, maxLen)}...`
    : value;
};


/* =========================================================
   IMAGE URL
========================================================= */

const getImageUrl = (item) => {
  if (!item) return "";

  let value = item;

  if (
    typeof item === "object"
  ) {
    value =
      item.url ||
      item.location ||
      item.path ||
      item.key ||
      "";
  }

  if (!value) return "";

  value = String(value);

  if (
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("data:")
  ) {
    return value;
  }

  if (value.startsWith("//")) {
    return `https:${value}`;
  }

  if (!value.startsWith("/")) {
    value = `/${value}`;
  }

  return `${BACKEND_URL}${value}`;
};


/* =========================================================
   GET CLASS CATEGORY NAME
========================================================= */

const getClassCategoryName = (cls) => {
  return (
    cls?.category_name ||
    cls?.category?.name ||
    "-"
  );
};


/* =========================================================
   GET CLASS SUBCATEGORY NAME
========================================================= */

const getClassSubcategoryName = (cls) => {
  return (
    cls?.subcategory_name ||
    cls?.subcategory?.name ||
    "-"
  );
};


/* =========================================================
   GET INSTITUTE NAME
========================================================= */

const getInstituteName = (cls) => {
  return (
    cls?.institute?.name ||
    cls?.institute_name ||
    "-"
  );
};


/* =========================================================
   GET TRAINER NAME
========================================================= */

const getTrainerName = (cls) => {
  return (
    cls?.trainer?.name ||
    cls?.trainer?.full_name ||
    cls?.trainer_name ||
    "-"
  );
};


/* =========================================================
   GET START DATE
========================================================= */

const getStartDate = (cls) => {
  return (
    cls?.start_date ||
    cls?.course_start_date ||
    "-"
  );
};


/* =========================================================
   GET START TIME
========================================================= */

const getStartTime = (cls) => {
  return (
    cls?.start_time ||
    cls?.default_start_time ||
    ""
  );
};


/* =========================================================
   GET AVAILABLE DAYS
========================================================= */

const getAvailableDays = (cls) => {
  return (
    cls?.availableDays ||
    cls?.available_days ||
    []
  );
};


/* =========================================================
   GET STUDENTS COUNT
========================================================= */

const getStudentsCount = (cls) => {
  return (
    cls?.studentsCount ??
    cls?.students_count ??
    0
  );
};


/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function Classes() {
  /* =======================================================
     CLASS STATE
  ======================================================= */

  const [classes, setClasses] =
    useState([]);

  const [searchQuery, setSearchQuery] =
    useState("");

  const [showModal, setShowModal] =
    useState(false);

  const [editingClass, setEditingClass] =
    useState(null);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [deletingClass, setDeletingClass] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [submitting, setSubmitting] =
    useState(false);

  const [deleting, setDeleting] =
    useState(false);


  /* =======================================================
     DROPDOWN STATE
  ======================================================= */

  const [institutes, setInstitutes] =
    useState([]);

  const [categories, setCategories] =
    useState([]);

  const [subcategories, setSubcategories] =
    useState([]);

  const [trainers, setTrainers] =
    useState([]);


  /* =======================================================
     FORM STATE
  ======================================================= */

  const [formData, setFormData] =
    useState(DEFAULT_FORM);


  /* =======================================================
     FILTER CLASSES
  ======================================================= */

  const filteredClasses =
    classes.filter((cls) => {
      const query =
        searchQuery
          .trim()
          .toLowerCase();

      if (!query) {
        return true;
      }

      const searchableValues = [
        cls?.title,
        cls?.description,
        cls?.highlights,

        getTrainerName(cls),
        getInstituteName(cls),

        getClassCategoryName(cls),
        getClassSubcategoryName(cls),

        cls?.level,
        cls?.mode,

        cls?.id,
        cls?.price,
        cls?.duration,

        getStartDate(cls),
        getStartTime(cls),

        formatDays(
          getAvailableDays(cls)
        ),
      ];

      return searchableValues.some(
        (value) =>
          String(value ?? "")
            .toLowerCase()
            .includes(query)
      );
    });


  /* =======================================================
     FETCH CLASSES
  ======================================================= */

  const fetchClasses = async () => {
    try {
      setLoading(true);

      const response =
        await API.get("/classes");

      const data =
        response?.data?.data;

      setClasses(
        Array.isArray(data)
          ? data
          : []
      );
    } catch (error) {
      console.error(
        "Fetch classes error:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to fetch classes"
      );
    } finally {
      setLoading(false);
    }
  };


  /* =======================================================
     FETCH DROPDOWNS
  ======================================================= */

  const fetchDropdowns = async () => {
    try {
      const [
        instituteResponse,
        categoryResponse,
        subcategoryResponse,
        trainerResponse,
      ] = await Promise.all([
        API.get(
          "/institutes/admin/all"
        ),
        API.get("/categories"),
        API.get("/subcategories"),
        API.get("/trainers"),
      ]);

      setInstitutes(
        instituteResponse?.data?.data || []
      );

      setCategories(
        categoryResponse?.data?.data || []
      );

      setSubcategories(
        subcategoryResponse?.data?.data || []
      );

      setTrainers(
        trainerResponse?.data?.data || []
      );
    } catch (error) {
      console.error(
        "Fetch dropdowns error:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to load dropdown data"
      );
    }
  };


  /* =======================================================
     INITIAL LOAD
  ======================================================= */

  useEffect(() => {
    const token =
      localStorage.getItem(
        "adminToken"
      );

    if (!token) {
      return;
    }

    fetchClasses();
    fetchDropdowns();
  }, []);


  /* =======================================================
     RESET FORM
  ======================================================= */

  const resetForm = () => {
    setFormData({
      ...DEFAULT_FORM,
      available_days: [],
    });
  };


  /* =======================================================
     OPEN ADD MODAL
  ======================================================= */

  const handleAdd = () => {
    setEditingClass(null);

    resetForm();

    setShowModal(true);
  };


  /* =======================================================
     TOGGLE DAY
  ======================================================= */

  const toggleDay = (dayValue) => {
    setFormData((previous) => {
      const currentDays =
        safeArray(
          previous.available_days
        );

      const exists =
        currentDays.includes(
          dayValue
        );

      return {
        ...previous,

        available_days: exists
          ? currentDays.filter(
              (day) =>
                day !== dayValue
            )
          : [
              ...currentDays,
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

    const availableDays =
      safeArray(
        getAvailableDays(cls)
      );

    const startTime =
      getStartTime(cls);

    setFormData({
      title: cls?.title || "",

      description:
        cls?.description || "",

      highlights:
        cls?.highlights || "",

      category_id:
        cls?.category_id || "",

      subcategory_id:
        cls?.subcategory_id || "",

      trainer_id:
        cls?.trainer_id || "",

      institute_id:
        cls?.institute_id || "",

      price:
        cls?.price ?? "",

      duration:
        cls?.duration ?? "60",

      level:
        cls?.level || "BEGINNER",

      mode:
        cls?.mode || "ONLINE",

      students_count:
        cls?.students_count ??
        cls?.studentsCount ??
        "",

      course_start_date:
        cls?.course_start_date ||
        cls?.start_date ||
        "",

      course_end_date:
        cls?.course_end_date ||
        cls?.end_date ||
        "",

      start_time:
        startTime || "",

      end_time:
        cls?.end_time ||
        cls?.default_end_time ||
        "",

      available_days:
        availableDays,

      image: null,
    });

    setShowModal(true);
  };


  /* =======================================================
     DELETE
  ======================================================= */

  const handleDelete = (cls) => {
    setDeletingClass(cls);
    setShowDeleteModal(true);
  };


  /* =======================================================
     CONFIRM DELETE
  ======================================================= */

  const confirmDelete = async () => {
    if (
      !deletingClass?.id ||
      deleting
    ) {
      return;
    }

    try {
      setDeleting(true);

      await API.delete(
        `/classes/admin/${deletingClass.id}`
      );

      toast.success(
        "Class deleted successfully"
      );

      setShowDeleteModal(false);
      setDeletingClass(null);

      await fetchClasses();
    } catch (error) {
      console.error(
        "Delete class error:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Delete failed"
      );
    } finally {
      setDeleting(false);
    }
  };


  /* =======================================================
     CLOSE MODAL
  ======================================================= */

  const closeModal = () => {
    if (submitting) {
      return;
    }

    setShowModal(false);

    setEditingClass(null);

    resetForm();
  };


  /* =======================================================
     HANDLE FORM INPUT
  ======================================================= */

  const handleInputChange = (
    event
  ) => {
    const {
      name,
      value,
      files,
    } = event.target;

    if (name === "image") {
      setFormData(
        (previous) => ({
          ...previous,
          image:
            files?.[0] || null,
        })
      );

      return;
    }

    setFormData(
      (previous) => ({
        ...previous,
        [name]: value,
      })
    );
  };


  /* =======================================================
     HANDLE CATEGORY CHANGE
  ======================================================= */

  const handleCategoryChange = (
    event
  ) => {
    setFormData(
      (previous) => ({
        ...previous,

        category_id:
          event.target.value,

        subcategory_id: "",
      })
    );
  };


  /* =======================================================
     HANDLE START TIME
  ======================================================= */

  const handleStartTimeChange = (
    value
  ) => {
    setFormData(
      (previous) => ({
        ...previous,

        start_time:
          value &&
          value.isValid()
            ? value.format(
                "HH:mm:ss"
              )
            : "",
      })
    );
  };


  /* =======================================================
     HANDLE SUBMIT
  ======================================================= */

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    if (submitting) {
      return;
    }


    /* =====================================================
       VALIDATION
    ===================================================== */

    if (
      !formData.title?.trim()
    ) {
      toast.error(
        "Class Name is required"
      );
      return;
    }

    if (!formData.institute_id) {
      toast.error(
        "Please select an Institute"
      );
      return;
    }

    if (!formData.trainer_id) {
      toast.error(
        "Please select a Trainer"
      );
      return;
    }

    if (!formData.category_id) {
      toast.error(
        "Please select a Category"
      );
      return;
    }


    /* =====================================================
       FORM DATA
    ===================================================== */

    const payload =
      new FormData();

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
      formData.highlights?.trim() ||
        ""
    );

    payload.append(
      "category_id",
      String(formData.category_id)
    );

    if (
      formData.subcategory_id
    ) {
      payload.append(
        "subcategory_id",
        String(
          formData.subcategory_id
        )
      );
    }

    payload.append(
      "trainer_id",
      String(formData.trainer_id)
    );

    payload.append(
      "institute_id",
      String(formData.institute_id)
    );

    payload.append(
      "students_count",
      String(
        formData.students_count || 0
      )
    );

    payload.append(
      "price",
      String(
        formData.price || 0
      )
    );

    payload.append(
      "duration",
      String(
        formData.duration || 60
      )
    );

    payload.append(
      "level",
      formData.level ||
        "BEGINNER"
    );

    payload.append(
      "mode",
      formData.mode ||
        "ONLINE"
    );


    /* =====================================================
       IMAGE
    ===================================================== */

    if (formData.image) {
      payload.append(
        "image",
        formData.image
      );
    }


    /* =====================================================
       START DATE
    ===================================================== */

    if (
      formData.course_start_date
    ) {
      payload.append(
        "start_date",
        formData.course_start_date
      );

      /*
       * Also send course_start_date
       * for backends using that name.
       */
      payload.append(
        "course_start_date",
        formData.course_start_date
      );
    }


    /* =====================================================
       END DATE
    ===================================================== */

    if (
      formData.course_end_date
    ) {
      payload.append(
        "end_date",
        formData.course_end_date
      );

      payload.append(
        "course_end_date",
        formData.course_end_date
      );
    }


    /* =====================================================
       START TIME
    ===================================================== */

    if (formData.start_time) {
      payload.append(
        "start_time",
        formData.start_time
      );
    }


    /* =====================================================
       END TIME
    ===================================================== */

    if (formData.end_time) {
      payload.append(
        "end_time",
        formData.end_time
      );
    }


    /* =====================================================
       AVAILABLE DAYS

       Send both:
         available_days[]
       and
         available_days

       The first matches your existing backend.
       The second helps backends expecting JSON.
    ===================================================== */

    const availableDays =
      safeArray(
        formData.available_days
      );

    availableDays.forEach(
      (day) => {
        payload.append(
          "available_days[]",
          day
        );
      }
    );

    payload.append(
      "available_days",
      JSON.stringify(
        availableDays
      )
    );


    /* =====================================================
       API REQUEST
    ===================================================== */

    try {
      setSubmitting(true);

      if (editingClass?.id) {
        await API.put(
          `/classes/admin/${editingClass.id}`,
          payload,
          {
            headers: {
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
          "/classes/admin/create",
          payload,
          {
            headers: {
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

      setShowModal(false);
      setEditingClass(null);
      resetForm();
    } catch (error) {
      console.error(
        "Class save error:",
        error
      );

      console.error(
        "Backend error:",
        error?.response?.data
      );

      toast.error(
        error?.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setSubmitting(false);
    }
  };


  /* =======================================================
     MODE BADGE
  ======================================================= */

  const getModeColor = (
    mode
  ) => {
    switch (
      String(mode || "")
        .toUpperCase()
    ) {
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
     FILTER SUBCATEGORIES
  ======================================================= */

  const filteredSubcategories =
    subcategories.filter(
      (subcategory) =>
        String(
          subcategory?.category_id
        ) ===
        String(
          formData.category_id
        )
    );


  /* =======================================================
     STYLES
  ======================================================= */

  const selectClass =
    "w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors";

  const inputClass =
    "w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors";

  const labelClass =
    "block text-sm text-gray-400 mb-1";


  /* =======================================================
     TABLE COLUMN COUNT

     Actual columns:
     1 ID
     2 Image
     3 Class Name
     4 Description
     5 Institute
     6 Trainer
     7 Category
     8 Subcategory
     9 Level
     10 Mode
     11 Price
     12 Duration
     13 Students
     14 Start Date
     15 Start Time
     16 Available Days
     17 Actions
  ======================================================= */

  const totalColumns = 17;


  /* =======================================================
     JSX
  ======================================================= */

  return (
    <div className="p-8 text-white min-h-screen">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">

        <div>
          <h1 className="text-4xl font-bold text-purple-400">
            Admin Classes
          </h1>

          <p className="text-gray-400 mt-2">
            Manage your classes
          </p>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition-opacity"
        >
          + Add Class
        </button>
      </div>


      {/* =====================================================
          SEARCH
      ===================================================== */}

      <div className="mb-6">
        <div className="relative w-full">

          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
            size={18}
          />

          <input
            type="text"
            placeholder="Search by name, description, trainer, category, institute, level, mode..."
            value={searchQuery}
            onChange={(event) =>
              setSearchQuery(
                event.target.value
              )
            }
            className="w-full pl-12 pr-10 py-3.5 rounded-xl bg-[#151519] border border-[#2c2c35] text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/60 transition-colors text-sm"
          />

          {searchQuery && (
            <button
              type="button"
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


      {/* =====================================================
          TABLE
      ===================================================== */}

      <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-[#202027] text-gray-400">

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
                  Institute
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

              {loading ? (

                <tr>
                  <td
                    colSpan={totalColumns}
                    className="p-12 text-center text-gray-500"
                  >
                    Loading classes...
                  </td>
                </tr>

              ) : filteredClasses.length === 0 ? (

                <tr>

                  <td
                    colSpan={totalColumns}
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
                          type="button"
                          onClick={() =>
                            setSearchQuery("")
                          }
                          className="text-purple-400 hover:text-purple-300 text-sm mt-1 transition-colors"
                        >
                          Clear search
                        </button>
                      )}

                    </div>

                  </td>

                </tr>

              ) : (

                filteredClasses.map(
                  (cls) => {

                    const imageUrl =
                      getImageUrl(
                        cls?.image
                      );

                    const availableDays =
                      getAvailableDays(
                        cls
                      );

                    return (
                      <tr
                        key={cls.id}
                        className="border-t border-[#2c2c35] hover:bg-[#1a1a20] transition-colors"
                      >

                        {/* ID */}
                        <td className="p-4 text-gray-400 whitespace-nowrap">
                          {cls.id}
                        </td>


                        {/* IMAGE */}
                        <td className="p-4">

                          {imageUrl ? (

                            <img
                              src={imageUrl}
                              alt={
                                cls.title ||
                                "Class"
                              }
                              className="w-11 h-11 rounded-xl object-cover border border-[#333]"
                              onError={(event) => {
                                event.currentTarget.style.display =
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
                          {cls.title || "-"}
                        </td>


                        {/* DESCRIPTION */}
                        <td
                          className="p-4 text-gray-400 max-w-[180px] truncate"
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


                        {/* INSTITUTE */}
                        <td className="p-4 text-gray-400 whitespace-nowrap">
                          {getInstituteName(
                            cls
                          )}
                        </td>


                        {/* TRAINER */}
                        <td className="p-4 text-gray-400 whitespace-nowrap">
                          {getTrainerName(
                            cls
                          )}
                        </td>


                        {/* CATEGORY */}
                        <td className="p-4 text-gray-400 whitespace-nowrap">
                          {getClassCategoryName(
                            cls
                          )}
                        </td>


                        {/* SUBCATEGORY */}
                        <td className="p-4 text-gray-400 whitespace-nowrap">
                          {getClassSubcategoryName(
                            cls
                          )}
                        </td>


                        {/* LEVEL */}
                        <td className="p-4 whitespace-nowrap">

                          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300">
                            {cls.level || "-"}
                          </span>

                        </td>


                        {/* MODE */}
                        <td className="p-4 whitespace-nowrap">

                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getModeColor(
                              cls.mode
                            )}`}
                          >
                            {cls.mode || "-"}
                          </span>

                        </td>


                        {/* PRICE */}
                        <td className="p-4 font-semibold whitespace-nowrap">
                          ₹
                          {cls.price ??
                            0}
                        </td>


                        {/* DURATION */}
                        <td className="p-4 text-gray-400 whitespace-nowrap">
                          {cls.duration
                            ? `${cls.duration} min`
                            : "-"}
                        </td>


                        {/* STUDENTS */}
                        <td className="p-4 font-semibold whitespace-nowrap">
                          {getStudentsCount(
                            cls
                          )}
                        </td>


                        {/* START DATE */}
                        <td className="p-4 text-gray-400 whitespace-nowrap">
                          {formatDate(
                            getStartDate(
                              cls
                            )
                          )}
                        </td>


                        {/* START TIME */}
                        <td className="p-4 text-gray-400 whitespace-nowrap">
                          {formatTime(
                            getStartTime(
                              cls
                            )
                          )}
                        </td>


                        {/* AVAILABLE DAYS */}
                        <td
                          className="p-4 text-gray-400 whitespace-nowrap"
                          title={formatDays(
                            availableDays
                          )}
                        >
                          {formatDays(
                            availableDays
                          )}
                        </td>


                        {/* ACTIONS */}
                        <td className="p-4">

                          <div className="flex items-center gap-2">

                            <button
                              type="button"
                              onClick={() =>
                                handleEdit(
                                  cls
                                )
                              }
                              className="p-2 rounded-lg hover:bg-[#2a2a35] transition-colors group"
                              title="Edit"
                            >
                              <Edit
                                size={16}
                                className="text-gray-400 group-hover:text-white transition-colors"
                              />
                            </button>


                            <button
                              type="button"
                              onClick={() =>
                                handleDelete(
                                  cls
                                )
                              }
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
                  }
                )

              )}

            </tbody>

          </table>

        </div>

      </div>


      {/* =====================================================
          ADD / EDIT MODAL
      ===================================================== */}

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
                type="button"
                onClick={closeModal}
                disabled={submitting}
                className="text-gray-400 hover:text-white transition-colors disabled:opacity-40"
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

                {/* =================================================
                    CLASS NAME
                ================================================= */}

                <div>

                  <label
                    className={
                      labelClass
                    }
                  >
                    Class Name *
                  </label>

                  <input
                    name="title"
                    value={
                      formData.title
                    }
                    onChange={
                      handleInputChange
                    }
                    className={
                      inputClass
                    }
                    placeholder="Enter class name"
                    required
                  />

                </div>


                {/* =================================================
                    DESCRIPTION
                ================================================= */}

                <div>

                  <label
                    className={
                      labelClass
                    }
                  >
                    Description
                  </label>

                  <textarea
                    name="description"
                    value={
                      formData.description
                    }
                    onChange={
                      handleInputChange
                    }
                    rows={3}
                    className={
                      inputClass
                    }
                    placeholder="Enter description"
                  />

                </div>


                {/* =================================================
                    HIGHLIGHTS
                ================================================= */}

                <div>

                  <label
                    className={
                      labelClass
                    }
                  >
                    Highlights
                  </label>

                  <textarea
                    name="highlights"
                    value={
                      formData.highlights
                    }
                    onChange={
                      handleInputChange
                    }
                    rows={3}
                    className={
                      inputClass
                    }
                    placeholder="Enter class highlights"
                  />

                </div>


                {/* =================================================
                    IMAGE
                ================================================= */}

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
                      alt="Current class"
                      className="w-20 h-20 object-cover rounded-xl mb-2 border border-[#333]"
                    />

                  )}


                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={
                      handleInputChange
                    }
                    className="w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-500/20 file:text-purple-300 hover:file:bg-purple-500/30"
                  />

                </div>


                {/* =================================================
                    INSTITUTE / TRAINER
                ================================================= */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  {/* INSTITUTE */}

                  <div>

                    <label
                      className={
                        labelClass
                      }
                    >
                      Institute *
                    </label>

                    <select
                      name="institute_id"
                      value={
                        formData.institute_id
                      }
                      onChange={
                        handleInputChange
                      }
                      className={
                        selectClass
                      }
                      required
                    >

                      <option value="">
                        Select Institute
                      </option>

                      {institutes.map(
                        (item) => (
                          <option
                            key={item.id}
                            value={item.id}
                          >
                            {item.name}
                          </option>
                        )
                      )}

                    </select>

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
                      name="trainer_id"
                      value={
                        formData.trainer_id
                      }
                      onChange={
                        handleInputChange
                      }
                      className={
                        selectClass
                      }
                      required
                    >

                      <option value="">
                        Select Trainer
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
                              `Trainer #${trainer.id}`}
                          </option>
                        )
                      )}

                    </select>

                  </div>

                </div>


                {/* =================================================
                    CATEGORY / SUBCATEGORY
                ================================================= */}

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
                      name="category_id"
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
                    >

                      <option value="">
                        Select Category
                      </option>

                      {categories.map(
                        (category) => (
                          <option
                            key={
                              category.id
                            }
                            value={
                              category.id
                            }
                          >
                            {category.name}
                          </option>
                        )
                      )}

                    </select>

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
                      name="subcategory_id"
                      value={
                        formData.subcategory_id
                      }
                      onChange={
                        handleInputChange
                      }
                      disabled={
                        !formData.category_id
                      }
                      className={`${selectClass} disabled:opacity-50`}
                    >

                      <option value="">
                        Select Subcategory
                      </option>

                      {filteredSubcategories.map(
                        (subcategory) => (
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

                  </div>

                </div>


                {/* =================================================
                    PRICE / DURATION
                ================================================= */}

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
                      name="price"
                      min="0"
                      value={
                        formData.price
                      }
                      onChange={
                        handleInputChange
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
                      name="duration"
                      min="1"
                      value={
                        formData.duration
                      }
                      onChange={
                        handleInputChange
                      }
                      className={
                        inputClass
                      }
                      placeholder="60"
                    />

                  </div>

                </div>


                {/* =================================================
                    START DATE / END DATE
                ================================================= */}

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
                      name="course_start_date"
                      value={
                        formData.course_start_date
                      }
                      onChange={
                        handleInputChange
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
                      name="course_end_date"
                      value={
                        formData.course_end_date
                      }
                      onChange={
                        handleInputChange
                      }
                      className={
                        inputClass
                      }
                    />

                  </div>

                </div>


                {/* =================================================
                    START / END TIME
                ================================================= */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

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
                        label="Start Time"
                        ampm
                        value={normalizeTimeForPicker(
                          formData.start_time
                        )}
                        onChange={
                          handleStartTimeChange
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

                              "& .MuiInputLabel-root.Mui-focused":
                                {
                                  color:
                                    "#a855f7",
                                },

                              "& .MuiOutlinedInput-notchedOutline":
                                {
                                  borderColor:
                                    "transparent",
                                },

                              "&:hover .MuiOutlinedInput-notchedOutline":
                                {
                                  borderColor:
                                    "rgba(168,85,247,.5)",
                                },

                              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                                {
                                  borderColor:
                                    "rgba(168,85,247,.6)",
                                },

                              "& .MuiSvgIcon-root":
                                {
                                  color:
                                    "#9ca3af",
                                },
                            },
                          },
                        }}
                      />

                    </LocalizationProvider>

                  </div>


                  <div>

                    <label
                      className={
                        labelClass
                      }
                    >
                      End Time
                    </label>

                    <LocalizationProvider
                      dateAdapter={
                        AdapterDayjs
                      }
                    >

                      <TimePicker
                        label="End Time"
                        ampm
                        value={normalizeTimeForPicker(
                          formData.end_time
                        )}
                        onChange={(value) =>
                          setFormData(
                            (previous) => ({
                              ...previous,

                              end_time:
                                value &&
                                value.isValid()
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

                              "& .MuiInputLabel-root.Mui-focused":
                                {
                                  color:
                                    "#a855f7",
                                },

                              "& .MuiOutlinedInput-notchedOutline":
                                {
                                  borderColor:
                                    "transparent",
                                },

                              "&:hover .MuiOutlinedInput-notchedOutline":
                                {
                                  borderColor:
                                    "rgba(168,85,247,.5)",
                                },

                              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                                {
                                  borderColor:
                                    "rgba(168,85,247,.6)",
                                },

                              "& .MuiSvgIcon-root":
                                {
                                  color:
                                    "#9ca3af",
                                },
                            },
                          },
                        }}
                      />

                    </LocalizationProvider>

                  </div>

                </div>


                {/* =================================================
                    AVAILABLE DAYS
                ================================================= */}

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
                          safeArray(
                            formData.available_days
                          ).includes(
                            day.value
                          );

                        return (
                          <label
                            key={
                              day.value
                            }
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
                                w-4 h-4 rounded border flex items-center justify-center transition-colors
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


                {/* =================================================
                    STUDENTS COUNT
                ================================================= */}

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
                    name="students_count"
                    min="0"
                    value={
                      formData.students_count
                    }
                    onChange={
                      handleInputChange
                    }
                    className={
                      inputClass
                    }
                    placeholder="0"
                  />

                </div>


                {/* =================================================
                    LEVEL / MODE
                ================================================= */}

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
                      name="level"
                      value={
                        formData.level
                      }
                      onChange={
                        handleInputChange
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
                      name="mode"
                      value={
                        formData.mode
                      }
                      onChange={
                        handleInputChange
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


                {/* =================================================
                    BUTTONS
                ================================================= */}

                <div className="flex justify-end gap-3 pt-4 border-t border-[#3a3448]">

                  <button
                    type="button"
                    onClick={
                      closeModal
                    }
                    disabled={
                      submitting
                    }
                    className="px-5 py-3 rounded-xl border border-gray-600 text-gray-300 hover:bg-[#2b2638] transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={
                      submitting
                    }
                    className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting
                      ? editingClass
                        ? "Updating..."
                        : "Creating..."
                      : editingClass
                      ? "Update Class"
                      : "Add Class"}
                  </button>

                </div>

              </form>

            </div>

          </div>

        </div>
      )}


      {/* =====================================================
          DELETE CONFIRMATION MODAL
      ===================================================== */}

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


              <p className="text-gray-400 text-center text-sm leading-relaxed mb-3">
                Are you sure you want to
                delete this class?
              </p>


              {deletingClass?.title && (

                <p className="text-white font-semibold text-center mb-8">
                  "{deletingClass.title}"
                </p>

              )}


              <div className="flex gap-3 w-full">

                <button
                  type="button"
                  onClick={() => {
                    if (deleting) {
                      return;
                    }

                    setShowDeleteModal(
                      false
                    );

                    setDeletingClass(
                      null
                    );
                  }}
                  disabled={
                    deleting
                  }
                  className="flex-1 px-5 py-3 rounded-xl border border-[#3a3650] text-gray-300 hover:bg-[#2a2640] transition-colors font-medium text-sm disabled:opacity-50"
                >
                  Cancel
                </button>


                <button
                  type="button"
                  onClick={
                    confirmDelete
                  }
                  disabled={
                    deleting
                  }
                  className="flex-1 px-5 py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold hover:opacity-90 transition-opacity text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {deleting
                    ? "Deleting..."
                    : "Delete"}
                </button>

              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}