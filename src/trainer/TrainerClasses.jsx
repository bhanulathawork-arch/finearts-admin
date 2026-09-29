// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import { Edit, Trash2, Search, BookOpen } from "lucide-react";
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
//   // Uses the same backend URL as the API instance.
//   // Works with both localhost and Render.
//   const getImageUrl = (item) => {
//     if (!item || typeof item !== "string") return "";

//     const value = item.trim();
//     if (!value) return "";

//     // Already a complete URL
//     if (
//       value.startsWith("http://") ||
//       value.startsWith("https://") ||
//       value.startsWith("data:") ||
//       value.startsWith("blob:")
//     ) {
//       return value;
//     }

//     const apiBaseUrl =
//       API?.defaults?.baseURL ||
//       import.meta.env.VITE_API_URL ||
//       "http://localhost:5000/api";

//     const backendBaseUrl = apiBaseUrl.replace(/\/api\/?$/, "");

//     return `${backendBaseUrl}${value.startsWith("/") ? value : `/${value}`}`;
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
//     if (formData.course_end_date)
//       payload.append("end_date", formData.course_end_date);
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

//   const totalColumns = 16;

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
//             className="absolute left-4 top-1/2 -translate-y-1/2 text-white pointer-events-none"
//             size={18}
//           />
//           <input
//             type="text"
//             placeholder="Search by name, description, highlights, category, level, mode..."
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
//                           alt={cls.title || "Class"}
//                           className="w-11 h-11 rounded-xl object-cover border border-[#333] bg-[#26262b]"
//                           onError={(e) => {
//                             e.currentTarget.style.display = "none";
//                             const fallback = e.currentTarget.nextElementSibling;
//                             if (fallback) {
//                               fallback.style.display = "flex";
//                             }
//                           }}
//                         />
//                       ) : null}

//                       <div
//                         className={`w-11 h-11 bg-[#26262b] rounded-xl flex items-center justify-center text-gray-600 text-xs ${
//                           cls.image ? "hidden" : "flex"
//                         }`}
//                       >
//                         N/A
//                       </div>
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



// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import { Edit, Trash2, Search, BookOpen } from "lucide-react";
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
//   ) {
//     return timeStr;
//   }

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

//   let arr = [];

//   try {
//     arr = Array.isArray(days) ? days : JSON.parse(days || "[]");
//   } catch {
//     return "-";
//   }

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

//   return text.length > maxLen
//     ? text.slice(0, maxLen) + "..."
//     : text;
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

// // =============================================
// // MAIN COMPONENT
// // =============================================
// export default function TrainerClasses() {
//   const navigate = useNavigate();

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

//       const res = await API.get(
//         "/classes/trainer/my-classes",
//         config
//       );

//       console.log("Trainer Classes API Response:", res.data);

//       setClasses(res?.data?.data || []);
//     } catch (err) {
//       console.error("Fetch Trainer Classes Error:", err);
//       console.error("Backend Response:", err?.response?.data);

//       toast.error("Failed to fetch classes");
//     }
//   };

//   const fetchDropdowns = async () => {
//     try {
//       const config = await getConfig();

//       const [categoryRes, subcategoryRes] =
//         await Promise.all([
//           API.get("/categories", config),
//           API.get("/subcategories", config),
//         ]);

//       setCategories(categoryRes.data.data || []);
//       setSubcategories(subcategoryRes.data.data || []);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to load dropdown data");
//     }
//   };

//   // ================= AUTH EFFECT =================
//   useEffect(() => {
//     const auth = getAuth();

//     const unsubscribe = onAuthStateChanged(
//       auth,
//       (user) => {
//         if (user) {
//           fetchClasses();
//           fetchDropdowns();
//         } else {
//           console.log("User is not authenticated");
//         }
//       }
//     );

//     return () => unsubscribe();
//   }, []);

//   // ================= IMAGE HELPER =================
//   const getImageUrl = (item) => {
//     if (!item || typeof item !== "string") {
//       return "";
//     }

//     const value = item.trim();

//     if (!value) {
//       return "";
//     }

//     // S3 / CloudFront / external URL
//     if (
//       value.startsWith("http://") ||
//       value.startsWith("https://") ||
//       value.startsWith("data:") ||
//       value.startsWith("blob:")
//     ) {
//       return value;
//     }

//     // Backend/local relative path
//     const apiBaseUrl =
//       API?.defaults?.baseURL ||
//       import.meta.env.VITE_API_URL ||
//       "http://localhost:5000/api";

//     const backendBaseUrl = apiBaseUrl.replace(
//       /\/api\/?$/,
//       ""
//     );

//     return `${backendBaseUrl}${
//       value.startsWith("/") ? value : `/${value}`
//     }`;
//   };

//   // ================= IMAGE ERROR HANDLER =================
//   const handleImageError = (e, imageUrl) => {
//     console.error(
//       "❌ Class image failed to load:",
//       imageUrl
//     );

//     e.currentTarget.style.display = "none";

//     const fallback =
//       e.currentTarget.parentElement?.querySelector(
//         ".image-fallback"
//       );

//     if (fallback) {
//       fallback.style.display = "flex";
//     }
//   };

//   // ================= TOGGLE DAY HELPER =================
//   const toggleDay = (dayValue) => {
//     setFormData((prev) => {
//       const exists =
//         prev.available_days.includes(dayValue);

//       return {
//         ...prev,
//         available_days: exists
//           ? prev.available_days.filter(
//               (d) => d !== dayValue
//             )
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

//       await API.delete(
//         `/classes/trainer/${deletingClass.id}`,
//         config
//       );

//       toast.success("Class deleted successfully");

//       fetchClasses();
//     } catch (err) {
//       console.error("Delete Error:", err);

//       toast.error(
//         err?.response?.data?.message ||
//           "Delete failed"
//       );
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
//       course_end_date: cls.course_end_date || "",
//       start_time:
//         cls.default_start_time ||
//         cls.start_time ||
//         "",
//       available_days: cls.available_days
//         ? Array.isArray(cls.available_days)
//           ? cls.available_days
//           : JSON.parse(
//               cls.available_days || "[]"
//             )
//         : [],
//       image: null,
//     });

//     setShowModal(true);
//   };

//   // ================= SUBMIT =================
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

//     payload.append(
//       "title",
//       formData.title.trim()
//     );

//     payload.append(
//       "description",
//       formData.description?.trim() || ""
//     );

//     payload.append(
//       "highlights",
//       formData.highlights || ""
//     );

//     payload.append(
//       "category_id",
//       formData.category_id
//     );

//     if (formData.subcategory_id) {
//       payload.append(
//         "subcategory_id",
//         formData.subcategory_id
//       );
//     }

//     payload.append(
//       "students_count",
//       formData.students_count || 0
//     );

//     payload.append(
//       "price",
//       formData.price || 0
//     );

//     payload.append(
//       "duration",
//       formData.duration || 60
//     );

//     payload.append(
//       "level",
//       formData.level || "BEGINNER"
//     );

//     payload.append(
//       "mode",
//       formData.mode || "ONLINE"
//     );

//     if (formData.image) {
//       payload.append(
//         "image",
//         formData.image
//       );
//     }

//     if (formData.course_start_date) {
//       payload.append(
//         "start_date",
//         formData.course_start_date
//       );
//     }

//     if (formData.course_end_date) {
//       payload.append(
//         "end_date",
//         formData.course_end_date
//       );
//     }

//     if (formData.start_time) {
//       payload.append(
//         "start_time",
//         formData.start_time
//       );
//     }

//     formData.available_days.forEach((day) => {
//       payload.append(
//         "available_days[]",
//         day
//       );
//     });

//     try {
//       const config = await getConfig();

//       if (editingClass?.id) {
//         await API.put(
//           `/classes/trainer/${editingClass.id}`,
//           payload,
//           {
//             headers: {
//               ...config.headers,
//               "Content-Type":
//                 "multipart/form-data",
//             },
//           }
//         );

//         toast.success(
//           "Class updated successfully"
//         );
//       } else {
//         await API.post(
//           "/classes/trainer/create",
//           payload,
//           {
//             headers: {
//               ...config.headers,
//               "Content-Type":
//                 "multipart/form-data",
//             },
//           }
//         );

//         toast.success(
//           "Class created successfully"
//         );
//       }

//       await fetchClasses();
//       closeModal();
//     } catch (err) {
//       console.log(
//         "Backend Error:",
//         err?.response?.data
//       );

//       toast.error(
//         err?.response?.data?.message ||
//           "Something went wrong"
//       );
//     }
//   };

//   // ================= CLOSE MODAL =================
//   const closeModal = () => {
//     setShowModal(false);
//     setEditingClass(null);
//     setFormData({
//       ...defaultForm,
//       available_days: [],
//     });
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

//   const totalColumns = 16;

//   // ================= JSX =================
//   return (
//     <div className="p-8 text-white">
//       {/* ================= HEADER ================= */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//         <div>
//           <h1 className="text-4xl font-bold text-purple-400">
//             Trainer Classes
//           </h1>

//           <p className="text-white mt-2">
//             Manage your classes
//           </p>
//         </div>

//         <button
//           onClick={() => {
//             setEditingClass(null);
//             setFormData({
//               ...defaultForm,
//               available_days: [],
//             });
//             setShowModal(true);
//           }}
//           className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition-opacity"
//         >
//           + Add Class
//         </button>
//       </div>

//       {/* ================= SEARCH ================= */}
//       <div className="mb-6">
//         <div className="relative w-full">
//           <Search
//             className="absolute left-4 top-1/2 -translate-y-1/2 text-white pointer-events-none"
//             size={18}
//           />

//           <input
//             type="text"
//             placeholder="Search by name, description, highlights, category, level, mode..."
//             value={searchQuery}
//             onChange={(e) =>
//               setSearchQuery(e.target.value)
//             }
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

//       {/* ================= TABLE ================= */}
//       <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-[#202027] text-white">
//               <tr>
//                 <th className="p-4 text-left whitespace-nowrap">
//                   ID
//                 </th>

//                 <th className="p-4 text-left whitespace-nowrap">
//                   Image
//                 </th>

//                 <th className="p-4 text-left whitespace-nowrap">
//                   Class Name
//                 </th>

//                 <th className="p-4 text-left whitespace-nowrap">
//                   Description
//                 </th>

//                 <th className="p-4 text-left whitespace-nowrap">
//                   Category
//                 </th>

//                 <th className="p-4 text-left whitespace-nowrap">
//                   Subcategory
//                 </th>

//                 <th className="p-4 text-left whitespace-nowrap">
//                   Level
//                 </th>

//                 <th className="p-4 text-left whitespace-nowrap">
//                   Mode
//                 </th>

//                 <th className="p-4 text-left whitespace-nowrap">
//                   Price
//                 </th>

//                 <th className="p-4 text-left whitespace-nowrap">
//                   Duration
//                 </th>

//                 <th className="p-4 text-left whitespace-nowrap">
//                   Students
//                 </th>

//                 <th className="p-4 text-left whitespace-nowrap">
//                   Start Date
//                 </th>

//                 <th className="p-4 text-left whitespace-nowrap">
//                   End Date
//                 </th>

//                 <th className="p-4 text-left whitespace-nowrap">
//                   Start Time
//                 </th>

//                 <th className="p-4 text-left whitespace-nowrap">
//                   Available Days
//                 </th>

//                 <th className="p-4 text-left whitespace-nowrap">
//                   Actions
//                 </th>
//               </tr>
//             </thead>

//             <tbody>
//               {filteredClasses.length === 0 ? (
//                 <tr>
//                   <td
//                     colSpan={totalColumns}
//                     className="p-12 text-center"
//                   >
//                     <div className="flex flex-col items-center gap-3">
//                       <Search
//                         size={40}
//                         className="text-gray-600"
//                       />

//                       <p className="text-gray-500 text-lg">
//                         {searchQuery
//                           ? "No classes found matching your search"
//                           : "No classes available"}
//                       </p>

//                       {searchQuery && (
//                         <button
//                           onClick={() =>
//                             setSearchQuery("")
//                           }
//                           className="text-purple-400 hover:text-purple-300 text-sm mt-1 transition-colors"
//                         >
//                           Clear search
//                         </button>
//                       )}
//                     </div>
//                   </td>
//                 </tr>
//               ) : (
//                 filteredClasses.map((cls) => {
//                   const imageUrl = getImageUrl(
//                     cls.image
//                   );

//                   return (
//                     <tr
//                       key={cls.id}
//                       className="border-t border-[#2c2c35] hover:bg-[#1a1a20] transition-colors"
//                     >
//                       {/* ID */}
//                       <td className="p-4 text-white whitespace-nowrap">
//                         {cls.id}
//                       </td>

//                       {/* ================= IMAGE ================= */}
//                       <td className="p-4">
//                         <div className="w-11 h-11 rounded-xl overflow-hidden border border-[#333] bg-[#26262b]">
//                           {imageUrl ? (
//                             <img
//                               src={imageUrl}
//                               alt={
//                                 cls.title ||
//                                 "Class"
//                               }
//                               className="w-full h-full object-cover"
//                               loading="lazy"
//                               onError={(e) =>
//                                 handleImageError(
//                                   e,
//                                   imageUrl
//                                 )
//                               }
//                             />
//                           ) : (
//                             <div className="image-fallback w-full h-full flex items-center justify-center text-gray-600 text-xs">
//                               N/A
//                             </div>
//                           )}

//                           {imageUrl && (
//                             <div className="image-fallback hidden w-full h-full items-center justify-center text-gray-600 text-xs">
//                               N/A
//                             </div>
//                           )}
//                         </div>
//                       </td>

//                       {/* CLASS NAME */}
//                       <td className="p-4 font-medium whitespace-nowrap">
//                         {cls.title || "-"}
//                       </td>

//                       {/* DESCRIPTION */}
//                       <td
//                         className="p-4 text-white max-w-[130px] truncate"
//                         title={cls.description || ""}
//                       >
//                         {truncate(
//                           cls.description,
//                           30
//                         )}
//                       </td>

//                       {/* CATEGORY */}
//                       <td className="p-4 text-white whitespace-nowrap">
//                         {cls.category_name || "-"}
//                       </td>

//                       {/* SUBCATEGORY */}
//                       <td className="p-4 text-white whitespace-nowrap">
//                         {cls.subcategory_name || "-"}
//                       </td>

//                       {/* LEVEL */}
//                       <td className="p-4 whitespace-nowrap">
//                         <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300">
//                           {cls.level || "-"}
//                         </span>
//                       </td>

//                       {/* MODE */}
//                       <td className="p-4 whitespace-nowrap">
//                         <span
//                           className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getModeColor(
//                             cls.mode
//                           )}`}
//                         >
//                           {cls.mode || "-"}
//                         </span>
//                       </td>

//                       {/* PRICE */}
//                       <td className="p-4 font-semibold whitespace-nowrap">
//                         ₹{cls.price ?? 0}
//                       </td>

//                       {/* DURATION */}
//                       <td className="p-4 text-white whitespace-nowrap">
//                         {cls.duration
//                           ? `${cls.duration} min`
//                           : "-"}
//                       </td>

//                       {/* STUDENTS */}
//                       <td className="p-4 font-semibold whitespace-nowrap">
//                         {cls.students_count ?? 0}
//                       </td>

//                       {/* START DATE */}
//                       <td className="p-4 text-white whitespace-nowrap">
//                         {formatDate(
//                           cls.start_date
//                         )}
//                       </td>

//                       {/* END DATE */}
//                       <td className="p-4 text-white whitespace-nowrap">
//                         {formatDate(
//                           cls.end_date
//                         )}
//                       </td>

//                       {/* START TIME */}
//                       <td className="p-4 text-white whitespace-nowrap">
//                         {formatTime(
//                           cls.start_time
//                         )}
//                       </td>

//                       {/* AVAILABLE DAYS */}
//                       <td
//                         className="p-4 text-white whitespace-nowrap"
//                         title={formatDays(
//                           cls.available_days
//                         )}
//                       >
//                         {formatDays(
//                           cls.available_days
//                         )}
//                       </td>

//                       {/* ACTIONS */}
//                       <td className="p-4">
//                         <div className="flex items-center gap-2">
//                           <button
//                             onClick={() => navigate(`/trainer/lms/${cls.id}`)}
//                             className="p-2 rounded-lg hover:bg-purple-500/10 transition-colors group"
//                             title="Manage LMS"
//                           >
//                             <BookOpen
//                               size={16}
//                               className="text-purple-300 group-hover:text-purple-200 transition-colors"
//                             />
//                           </button>

//                           <button
//                             onClick={() =>
//                               handleEdit(cls)
//                             }
//                             className="p-2 rounded-lg hover:bg-[#2a2a35] transition-colors group"
//                             title="Edit"
//                           >
//                             <Edit
//                               size={16}
//                               className="text-white group-hover:text-white transition-colors"
//                             />
//                           </button>

//                           <button
//                             onClick={() =>
//                               handleDelete(cls)
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
//                 })
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* ==================== ADD / EDIT MODAL ==================== */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
//           <div className="w-full max-w-[650px] max-h-[90vh] bg-[#211c30] rounded-2xl overflow-hidden shadow-2xl">
//             {/* HEADER */}
//             <div className="flex justify-between items-center p-6 border-b border-[#3a3448]">
//               <h2 className="text-2xl font-bold text-white">
//                 {editingClass
//                   ? "Edit Class"
//                   : "Add Class"}
//               </h2>

//               <button
//                 onClick={closeModal}
//                 className="text-white hover:text-white transition-colors"
//               >
//                 <FaTimes size={20} />
//               </button>
//             </div>

//             {/* BODY */}
//             <div className="overflow-y-auto max-h-[75vh] p-6">
//               <form
//                 onSubmit={handleSubmit}
//                 className="space-y-1"
//               >
//                 {/* CLASS NAME */}
//                 <div>
//                   <label
//                     className={labelClass}
//                   >
//                     Class Name *
//                   </label>

//                   <input
//                     value={formData.title}
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         title: e.target.value,
//                       })
//                     }
//                     className={inputClass}
//                     placeholder="Enter class name"
//                     required
//                   />
//                 </div>

//                 {/* DESCRIPTION */}
//                 <div>
//                   <label
//                     className={labelClass}
//                   >
//                     Description
//                   </label>

//                   <textarea
//                     value={
//                       formData.description
//                     }
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         description:
//                           e.target.value,
//                       })
//                     }
//                     rows="3"
//                     className={inputClass}
//                     placeholder="Enter description"
//                   />
//                 </div>

//                 {/* IMAGE */}
//                 <div>
//                   <label
//                     className={labelClass}
//                   >
//                     Class Image
//                   </label>

//                   {editingClass?.image && (
//                     <img
//                       src={getImageUrl(
//                         editingClass.image
//                       )}
//                       alt="Current"
//                       className="w-20 h-20 object-cover rounded-xl mb-2 border border-[#333]"
//                       onError={(e) => {
//                         e.currentTarget.style.display =
//                           "none";
//                       }}
//                     />
//                   )}

//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         image:
//                           e.target.files?.[0] ||
//                           null,
//                       })
//                     }
//                     className="w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-500/20 file:text-purple-300 hover:file:bg-purple-500/30"
//                   />
//                 </div>

//                 {/* CATEGORY & SUBCATEGORY */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label
//                       className={labelClass}
//                     >
//                       Category *
//                     </label>

//                     <select
//                       value={
//                         formData.category_id
//                       }
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           category_id:
//                             e.target.value,
//                           subcategory_id: "",
//                         })
//                       }
//                       className={selectClass}
//                       required
//                     >
//                       <option value="">
//                         Select Category
//                       </option>

//                       {categories?.map(
//                         (cat) => (
//                           <option
//                             key={cat.id}
//                             value={cat.id}
//                           >
//                             {cat.name}
//                           </option>
//                         )
//                       )}
//                     </select>
//                   </div>

//                   <div>
//                     <label
//                       className={labelClass}
//                     >
//                       Subcategory
//                     </label>

//                     <select
//                       value={
//                         formData.subcategory_id
//                       }
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           subcategory_id:
//                             e.target.value,
//                         })
//                       }
//                       disabled={
//                         !formData.category_id
//                       }
//                       className={`${selectClass} disabled:opacity-50`}
//                     >
//                       <option value="">
//                         Select Subcategory
//                       </option>

//                       {subcategories
//                         ?.filter(
//                           (s) =>
//                             String(
//                               s.category_id
//                             ) ===
//                             String(
//                               formData.category_id
//                             )
//                         )
//                         .map((sub) => (
//                           <option
//                             key={sub.id}
//                             value={sub.id}
//                           >
//                             {sub.name}
//                           </option>
//                         ))}
//                     </select>
//                   </div>
//                 </div>

//                 {/* PRICE & DURATION */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label
//                       className={labelClass}
//                     >
//                       Price
//                     </label>

//                     <input
//                       type="number"
//                       value={formData.price}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           price: e.target.value,
//                         })
//                       }
//                       className={inputClass}
//                       placeholder="0"
//                     />
//                   </div>

//                   <div>
//                     <label
//                       className={labelClass}
//                     >
//                       Duration (Minutes)
//                     </label>

//                     <input
//                       type="number"
//                       value={
//                         formData.duration
//                       }
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           duration:
//                             e.target.value,
//                         })
//                       }
//                       className={inputClass}
//                       placeholder="60"
//                     />
//                   </div>
//                 </div>

//                 {/* COURSE START / END DATE */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label
//                       className={labelClass}
//                     >
//                       Course Start Date
//                     </label>

//                     <input
//                       type="date"
//                       value={
//                         formData.course_start_date
//                       }
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           course_start_date:
//                             e.target.value,
//                         })
//                       }
//                       className={inputClass}
//                     />
//                   </div>

//                   <div>
//                     <label
//                       className={labelClass}
//                     >
//                       Course End Date
//                     </label>

//                     <input
//                       type="date"
//                       value={
//                         formData.course_end_date
//                       }
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           course_end_date:
//                             e.target.value,
//                         })
//                       }
//                       className={inputClass}
//                     />
//                   </div>
//                 </div>

//                 {/* START TIME */}
//                 <div>
//                   <label
//                     className={labelClass}
//                   >
//                     Start Time
//                   </label>

//                   <LocalizationProvider
//                     dateAdapter={AdapterDayjs}
//                   >
//                     <TimePicker
//                       label="Start Time"
//                       ampm
//                       value={
//                         formData.start_time
//                           ? dayjs(
//                               `2000-01-01 ${formData.start_time}`
//                             )
//                           : null
//                       }
//                       onChange={(value) =>
//                         setFormData({
//                           ...formData,
//                           start_time: value
//                             ? value.format(
//                                 "HH:mm:ss"
//                               )
//                             : "",
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

//                 {/* AVAILABLE DAYS */}
//                 <div>
//                   <label
//                     className={labelClass}
//                   >
//                     Available Days
//                   </label>

//                   <div className="mt-2 mb-4 grid grid-cols-4 sm:grid-cols-7 gap-2">
//                     {DAYS_LIST.map((day) => {
//                       const isChecked =
//                         formData.available_days.includes(
//                           day.value
//                         );

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
//                             onChange={() =>
//                               toggleDay(
//                                 day.value
//                               )
//                             }
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

//                           {day.label.slice(
//                             0,
//                             3
//                           )}
//                         </label>
//                       );
//                     })}
//                   </div>
//                 </div>

//                 {/* STUDENTS COUNT */}
//                 <div>
//                   <label
//                     className={labelClass}
//                   >
//                     Students Count
//                   </label>

//                   <input
//                     type="number"
//                     value={
//                       formData.students_count
//                     }
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         students_count:
//                           e.target.value,
//                       })
//                     }
//                     className={inputClass}
//                     placeholder="0"
//                   />
//                 </div>

//                 {/* LEVEL & MODE */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label
//                       className={labelClass}
//                     >
//                       Level
//                     </label>

//                     <select
//                       value={formData.level}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           level: e.target.value,
//                         })
//                       }
//                       className={selectClass}
//                     >
//                       <option value="BEGINNER">
//                         Beginner
//                       </option>

//                       <option value="INTERMEDIATE">
//                         Intermediate
//                       </option>

//                       <option value="ADVANCED">
//                         Advanced
//                       </option>
//                     </select>
//                   </div>

//                   <div>
//                     <label
//                       className={labelClass}
//                     >
//                       Mode
//                     </label>

//                     <select
//                       value={formData.mode}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           mode: e.target.value,
//                         })
//                       }
//                       className={selectClass}
//                     >
//                       <option value="ONLINE">
//                         Online
//                       </option>

//                       <option value="OFFLINE">
//                         Offline
//                       </option>

//                       <option value="HYBRID">
//                         Hybrid
//                       </option>
//                     </select>
//                   </div>
//                 </div>

//                 {/* BUTTONS */}
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
//                     {editingClass
//                       ? "Update Class"
//                       : "Add Class"}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ==================== DELETE MODAL ==================== */}
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
//                 Are you sure you want to delete this
//                 class?
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
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import { Edit, Trash2, Search, BookOpen, Clock } from "lucide-react";
// import { FaTrash, FaTimes } from "react-icons/fa";
// import { getAuth, onAuthStateChanged } from "firebase/auth";

// import API from "../services/api";

// // =============================================
// // FORMAT TIME HELPER
// // Converts 24h time to 12h display
// // =============================================
// const formatTime = (timeStr) => {
//   if (!timeStr) return "-";

//   const value = String(timeStr).trim();

//   if (!value) return "-";

//   if (
//     value.toUpperCase().includes("AM") ||
//     value.toUpperCase().includes("PM")
//   ) {
//     return value;
//   }

//   const timePart = value.split("T").pop().split(" ")[0];

//   const parts = timePart.split(":");

//   if (parts.length < 2) {
//     return value;
//   }

//   const hours = parseInt(parts[0], 10);
//   const minutes = parts[1] || "00";

//   if (Number.isNaN(hours)) {
//     return value;
//   }

//   const period = hours >= 12 ? "PM" : "AM";
//   const hour12 = hours % 12 || 12;

//   return `${hour12}:${minutes.padStart(2, "0")} ${period}`;
// };

// // =============================================
// // NORMALIZE TIME FOR INPUT
// // Backend:
// // 17:30:00
// // 17:30
// // 2000-01-01T17:30:00
// //
// // Returns:
// // 17:30
// // =============================================
// const normalizeTimeForInput = (timeStr) => {
//   if (!timeStr) return "";

//   let value = String(timeStr).trim();

//   if (!value) return "";

//   // ISO datetime
//   if (value.includes("T")) {
//     value = value.split("T")[1];
//   }

//   // Space separated datetime
//   if (value.includes(" ")) {
//     value = value.split(" ")[1];
//   }

//   // Remove AM / PM
//   const upper = value.toUpperCase();

//   if (upper.includes("AM") || upper.includes("PM")) {
//     const clean = value
//       .replace(/AM/gi, "")
//       .replace(/PM/gi, "")
//       .trim();

//     const parts = clean.split(":");

//     if (parts.length >= 2) {
//       let hours = parseInt(parts[0], 10);
//       const minutes = parts[1] || "00";
//       const isPM = upper.includes("PM");
//       const isAM = upper.includes("AM");

//       if (isAM && hours === 12) {
//         hours = 0;
//       }

//       if (isPM && hours !== 12) {
//         hours += 12;
//       }

//       return `${String(hours).padStart(2, "0")}:${String(
//         minutes
//       ).padStart(2, "0")}`;
//     }
//   }

//   const parts = value.split(":");

//   if (parts.length >= 2) {
//     return `${String(parts[0]).padStart(2, "0")}:${String(
//       parts[1]
//     ).padStart(2, "0")}`;
//   }

//   return "";
// };

// // =============================================
// // FORMAT DATE HELPER
// // =============================================
// const formatDate = (dateStr) => {
//   if (!dateStr) return "-";

//   try {
//     const d = new Date(dateStr);

//     if (isNaN(d.getTime())) {
//       return dateStr;
//     }

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
// // NORMALIZE DATE FOR INPUT
// // Backend may return:
// // 2026-09-24
// // 2026-09-24T00:00:00.000Z
// // =============================================
// const normalizeDateForInput = (dateStr) => {
//   if (!dateStr) return "";

//   const value = String(dateStr).trim();

//   if (!value) return "";

//   if (value.includes("T")) {
//     return value.split("T")[0];
//   }

//   if (value.includes(" ")) {
//     return value.split(" ")[0];
//   }

//   // Already YYYY-MM-DD
//   if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
//     return value;
//   }

//   return value;
// };

// // =============================================
// // FORMAT AVAILABLE DAYS HELPER
// // =============================================
// const formatDays = (days) => {
//   if (!days) return "-";

//   let arr = [];

//   try {
//     if (Array.isArray(days)) {
//       arr = days;
//     } else if (typeof days === "string") {
//       arr = JSON.parse(days || "[]");
//     }
//   } catch {
//     return "-";
//   }

//   if (!Array.isArray(arr) || arr.length === 0) {
//     return "-";
//   }

//   const short = {
//     MONDAY: "Mon",
//     TUESDAY: "Tue",
//     WEDNESDAY: "Wed",
//     THURSDAY: "Thu",
//     FRIDAY: "Fri",
//     SATURDAY: "Sat",
//     SUNDAY: "Sun",
//   };

//   return arr
//     .map((d) => {
//       const value = String(d).toUpperCase();
//       return short[value] || d;
//     })
//     .join(", ");
// };

// // =============================================
// // NORMALIZE AVAILABLE DAYS
// // =============================================
// const normalizeAvailableDays = (days) => {
//   if (!days) return [];

//   try {
//     let parsed = days;

//     if (typeof days === "string") {
//       parsed = JSON.parse(days);
//     }

//     if (!Array.isArray(parsed)) {
//       return [];
//     }

//     return parsed.map((day) => String(day).toUpperCase());
//   } catch (error) {
//     console.error("Available days parse error:", error);
//     return [];
//   }
// };

// // =============================================
// // TRUNCATE TEXT HELPER
// // =============================================
// const truncate = (text, maxLen = 40) => {
//   if (!text) return "-";

//   const value = String(text);

//   return value.length > maxLen
//     ? value.slice(0, maxLen) + "..."
//     : value;
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
//   "w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-[#3b354d] focus:outline-none focus:border-purple-500/70 transition-colors";

// const inputClass =
//   "w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-[#3b354d] focus:outline-none focus:border-purple-500/70 transition-colors";

// const labelClass = "block text-sm text-white mb-1";

// // =============================================
// // MAIN COMPONENT
// // =============================================
// export default function TrainerClasses() {
//   const navigate = useNavigate();

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

//   // =============================================
//   // FIREBASE CONFIG
//   // =============================================
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

//   // =============================================
//   // FILTERED CLASSES
//   // SEARCH ONLY BY CLASS NAME
//   // =============================================
//   const filteredClasses = classes.filter((cls) => {
//     const query = searchQuery.trim().toLowerCase();

//     if (!query) {
//       return true;
//     }

//     const className = String(
//       cls.title || cls.name || ""
//     ).toLowerCase();

//     return className.includes(query);
//   });

//   // =============================================
//   // FETCH CLASSES
//   // =============================================
//   const fetchClasses = async () => {
//     try {
//       const config = await getConfig();

//       const res = await API.get(
//         "/classes/trainer/my-classes",
//         config
//       );

//       console.log(
//         "Trainer Classes API Response:",
//         res.data
//       );

//       setClasses(res?.data?.data || []);
//     } catch (err) {
//       console.error(
//         "Fetch Trainer Classes Error:",
//         err
//       );

//       console.error(
//         "Backend Response:",
//         err?.response?.data
//       );

//       toast.error("Failed to fetch classes");
//     }
//   };

//   // =============================================
//   // FETCH DROPDOWNS
//   // =============================================
//   const fetchDropdowns = async () => {
//     try {
//       const config = await getConfig();

//       const [categoryRes, subcategoryRes] =
//         await Promise.all([
//           API.get("/categories", config),
//           API.get("/subcategories", config),
//         ]);

//       setCategories(
//         categoryRes?.data?.data || []
//       );

//       setSubcategories(
//         subcategoryRes?.data?.data || []
//       );
//     } catch (err) {
//       console.error(
//         "Dropdown Fetch Error:",
//         err
//       );

//       toast.error(
//         "Failed to load dropdown data"
//       );
//     }
//   };

//   // =============================================
//   // AUTH EFFECT
//   // =============================================
//   useEffect(() => {
//     const auth = getAuth();

//     const unsubscribe = onAuthStateChanged(
//       auth,
//       (user) => {
//         if (user) {
//           fetchClasses();
//           fetchDropdowns();
//         } else {
//           console.log(
//             "User is not authenticated"
//           );
//         }
//       }
//     );

//     return () => unsubscribe();
//   }, []);

//   // =============================================
//   // IMAGE URL HELPER
//   // =============================================
//   const getImageUrl = (item) => {
//     if (!item || typeof item !== "string") {
//       return "";
//     }

//     const value = item.trim();

//     if (!value) {
//       return "";
//     }

//     // External / data / blob URL
//     if (
//       value.startsWith("http://") ||
//       value.startsWith("https://") ||
//       value.startsWith("data:") ||
//       value.startsWith("blob:")
//     ) {
//       return value;
//     }

//     const apiBaseUrl =
//       API?.defaults?.baseURL ||
//       import.meta.env.VITE_API_URL ||
//       "http://localhost:5000/api";

//     const backendBaseUrl = apiBaseUrl.replace(
//       /\/api\/?$/,
//       ""
//     );

//     return `${backendBaseUrl}${
//       value.startsWith("/") ? value : `/${value}`
//     }`;
//   };

//   // =============================================
//   // IMAGE ERROR HANDLER
//   // =============================================
//   const handleImageError = (e, imageUrl) => {
//     console.error(
//       "Class image failed to load:",
//       imageUrl
//     );

//     e.currentTarget.style.display = "none";

//     const fallback =
//       e.currentTarget.parentElement?.querySelector(
//         ".image-fallback"
//       );

//     if (fallback) {
//       fallback.style.display = "flex";
//     }
//   };

//   // =============================================
//   // TOGGLE DAY
//   // =============================================
//   const toggleDay = (dayValue) => {
//     setFormData((prev) => {
//       const exists =
//         prev.available_days.includes(dayValue);

//       return {
//         ...prev,
//         available_days: exists
//           ? prev.available_days.filter(
//               (d) => d !== dayValue
//             )
//           : [
//               ...prev.available_days,
//               dayValue,
//             ],
//       };
//     });
//   };

//   // =============================================
//   // HANDLE DELETE
//   // =============================================
//   const handleDelete = (cls) => {
//     setDeletingClass(cls);
//     setShowDeleteModal(true);
//   };

//   // =============================================
//   // CONFIRM DELETE
//   // =============================================
//   const confirmDelete = async () => {
//     if (!deletingClass) return;

//     try {
//       const config = await getConfig();

//       await API.delete(
//         `/classes/trainer/${deletingClass.id}`,
//         config
//       );

//       toast.success(
//         "Class deleted successfully"
//       );

//       await fetchClasses();
//     } catch (err) {
//       console.error(
//         "Delete Error:",
//         err
//       );

//       toast.error(
//         err?.response?.data?.message ||
//           "Delete failed"
//       );
//     } finally {
//       setShowDeleteModal(false);
//       setDeletingClass(null);
//     }
//   };

//   // =============================================
//   // HANDLE EDIT
//   // AUTO-FILL ALL EXISTING DATA
//   // =============================================
//   const handleEdit = (cls) => {
//     console.log(
//       "Editing class:",
//       cls
//     );

//     const availableDays =
//       normalizeAvailableDays(
//         cls.available_days
//       );

//     const startTime = normalizeTimeForInput(
//       cls.start_time ||
//         cls.default_start_time ||
//         ""
//     );

//     const endTime = normalizeTimeForInput(
//       cls.end_time ||
//         cls.default_end_time ||
//         ""
//     );

//     const startDate = normalizeDateForInput(
//       cls.start_date ||
//         cls.course_start_date ||
//         ""
//     );

//     const endDate = normalizeDateForInput(
//       cls.end_date ||
//         cls.course_end_date ||
//         ""
//     );

//     setEditingClass(cls);

//     setFormData({
//       title:
//         cls.title ||
//         cls.name ||
//         "",

//       description:
//         cls.description ||
//         "",

    

//       category_id:
//         cls.category_id !== null &&
//         cls.category_id !== undefined
//           ? String(cls.category_id)
//           : "",

//       subcategory_id:
//         cls.subcategory_id !== null &&
//         cls.subcategory_id !== undefined
//           ? String(cls.subcategory_id)
//           : "",

//       price:
//         cls.price !== null &&
//         cls.price !== undefined
//           ? cls.price
//           : "",

//       duration:
//         cls.duration !== null &&
//         cls.duration !== undefined
//           ? cls.duration
//           : "",

//       level:
//         cls.level ||
//         "BEGINNER",

//       mode:
//         cls.mode ||
//         "ONLINE",

//       students_count:
//         cls.students_count !== null &&
//         cls.students_count !== undefined
//           ? cls.students_count
//           : "",

//       course_start_date:
//         startDate,

//       course_end_date:
//         endDate,

//       start_time:
//         startTime,

//       end_time:
//         endTime,

//       available_days:
//         availableDays,

//       // Important:
//       // Do NOT put existing image URL into file input.
//       // File input must remain null.
//       image: null,
//     });

//     setShowModal(true);
//   };

//   // =============================================
//   // HANDLE CREATE MODAL
//   // =============================================
//   const handleAddClass = () => {
//     setEditingClass(null);

//     setFormData({
//       ...defaultForm,
//       available_days: [],
//     });

//     setShowModal(true);
//   };

//   // =============================================
//   // SUBMIT
//   // =============================================
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.title?.trim()) {
//       toast.error(
//         "Class Name is required"
//       );
//       return;
//     }

//     if (!formData.category_id) {
//       toast.error(
//         "Please select a Category"
//       );
//       return;
//     }

//     const payload = new FormData();

//     // ================= BASIC DATA =================
//     payload.append(
//       "title",
//       formData.title.trim()
//     );

//     payload.append(
//       "description",
//       formData.description?.trim() || ""
//     );



//     // ================= CATEGORY =================
//     payload.append(
//       "category_id",
//       formData.category_id
//     );

//     if (formData.subcategory_id) {
//       payload.append(
//         "subcategory_id",
//         formData.subcategory_id
//       );
//     }

//     // ================= NUMBERS =================
//     payload.append(
//       "students_count",
//       formData.students_count || 0
//     );

//     payload.append(
//       "price",
//       formData.price || 0
//     );

//     payload.append(
//       "duration",
//       formData.duration || 60
//     );

//     // ================= LEVEL / MODE =================
//     payload.append(
//       "level",
//       formData.level || "BEGINNER"
//     );

//     payload.append(
//       "mode",
//       formData.mode || "ONLINE"
//     );

//     // ================= IMAGE =================
//     if (formData.image) {
//       payload.append(
//         "image",
//         formData.image
//       );
//     }

//     // ================= DATES =================
//     if (formData.course_start_date) {
//       payload.append(
//         "start_date",
//         formData.course_start_date
//       );
//     }

//     if (formData.course_end_date) {
//       payload.append(
//         "end_date",
//         formData.course_end_date
//       );
//     }

//     // ================= START TIME =================
//     if (formData.start_time) {
//       payload.append(
//         "start_time",
//         formData.start_time
//       );
//     }

//     // ================= AVAILABLE DAYS =================
//     formData.available_days.forEach(
//       (day) => {
//         payload.append(
//           "available_days[]",
//           day
//         );
//       }
//     );

//     try {
//       const config = await getConfig();

//       // ===========================================
//       // EDIT
//       // ===========================================
//       if (editingClass?.id) {
//         await API.put(
//           `/classes/trainer/${editingClass.id}`,
//           payload,
//           {
//             headers: {
//               ...config.headers,
//               "Content-Type":
//                 "multipart/form-data",
//             },
//           }
//         );

//         toast.success(
//           "Class updated successfully"
//         );
//       }

//       // ===========================================
//       // CREATE
//       // ===========================================
//       else {
//         await API.post(
//           "/classes/trainer/create",
//           payload,
//           {
//             headers: {
//               ...config.headers,
//               "Content-Type":
//                 "multipart/form-data",
//             },
//           }
//         );

//         toast.success(
//           "Class created successfully"
//         );
//       }

//       await fetchClasses();

//       closeModal();
//     } catch (err) {
//       console.error(
//         "Backend Error:",
//         err?.response?.data
//       );

//       toast.error(
//         err?.response?.data?.message ||
//           "Something went wrong"
//       );
//     }
//   };

//   // =============================================
//   // CLOSE MODAL
//   // =============================================
//   const closeModal = () => {
//     setShowModal(false);
//     setEditingClass(null);

//     setFormData({
//       ...defaultForm,
//       available_days: [],
//     });
//   };

//   // =============================================
//   // MODE BADGE COLOR
//   // =============================================
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

//   const totalColumns = 16;

//   // =============================================
//   // JSX
//   // =============================================
//   return (
//     <div className="p-8 text-white">

//       {/* =========================================
//           HEADER
//       ========================================== */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">

//         <div>
//           <h1 className="text-4xl font-bold text-purple-400">
//             Trainer Classes
//           </h1>

//           <p className="text-white mt-2">
//             Manage your classes
//           </p>
//         </div>

//         <button
//           onClick={handleAddClass}
//           className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition-opacity"
//         >
//           + Add Class
//         </button>
//       </div>

//       {/* =========================================
//           SEARCH
//           ONLY CLASS NAME
//       ========================================== */}
//       <div className="mb-6">
//         <div className="relative w-full">

//           <Search
//             className="absolute left-4 top-1/2 -translate-y-1/2 text-white pointer-events-none"
//             size={18}
//           />

//           <input
//             type="text"
//             placeholder="Search by class name..."
//             value={searchQuery}
//             onChange={(e) =>
//               setSearchQuery(e.target.value)
//             }
//             className="w-full pl-12 pr-10 py-3.5 rounded-xl bg-[#151519] border border-[#2c2c35] text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/60 transition-colors text-sm"
//           />

//           {searchQuery && (
//             <button
//               onClick={() =>
//                 setSearchQuery("")
//               }
//               className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
//             >
//               <FaTimes size={14} />
//             </button>
//           )}
//         </div>
//       </div>

//       {/* =========================================
//           TABLE
//       ========================================== */}
//       <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl overflow-hidden">

//         <div className="overflow-x-auto">

//           <table className="w-full">

//             <thead className="bg-[#202027] text-white">

//               <tr>

//                 <th className="p-4 text-left whitespace-nowrap">
//                   ID
//                 </th>

//                 <th className="p-4 text-left whitespace-nowrap">
//                   Image
//                 </th>

//                 <th className="p-4 text-left whitespace-nowrap">
//                   Class Name
//                 </th>

//                 <th className="p-4 text-left whitespace-nowrap">
//                   Description
//                 </th>

//                 <th className="p-4 text-left whitespace-nowrap">
//                   Category
//                 </th>

//                 <th className="p-4 text-left whitespace-nowrap">
//                   Subcategory
//                 </th>

//                 <th className="p-4 text-left whitespace-nowrap">
//                   Level
//                 </th>

//                 <th className="p-4 text-left whitespace-nowrap">
//                   Mode
//                 </th>

//                 <th className="p-4 text-left whitespace-nowrap">
//                   Price
//                 </th>

//                 <th className="p-4 text-left whitespace-nowrap">
//                   Duration
//                 </th>

//                 <th className="p-4 text-left whitespace-nowrap">
//                   Students
//                 </th>

//                 <th className="p-4 text-left whitespace-nowrap">
//                   Start Date
//                 </th>

//                 <th className="p-4 text-left whitespace-nowrap">
//                   End Date
//                 </th>

//                 <th className="p-4 text-left whitespace-nowrap">
//                   Start Time
//                 </th>

//                 <th className="p-4 text-left whitespace-nowrap">
//                   Available Days
//                 </th>

//                 <th className="p-4 text-left whitespace-nowrap">
//                   Actions
//                 </th>

//               </tr>

//             </thead>

//             <tbody>

//               {filteredClasses.length === 0 ? (

//                 <tr>

//                   <td
//                     colSpan={totalColumns}
//                     className="p-12 text-center"
//                   >

//                     <div className="flex flex-col items-center gap-3">

//                       <Search
//                         size={40}
//                         className="text-gray-600"
//                       />

//                       <p className="text-gray-500 text-lg">
//                         {searchQuery
//                           ? "No classes found matching your search"
//                           : "No classes available"}
//                       </p>

//                       {searchQuery && (
//                         <button
//                           onClick={() =>
//                             setSearchQuery("")
//                           }
//                           className="text-purple-400 hover:text-purple-300 text-sm mt-1 transition-colors"
//                         >
//                           Clear search
//                         </button>
//                       )}

//                     </div>

//                   </td>

//                 </tr>

//               ) : (

//                 filteredClasses.map((cls) => {

//                   const imageUrl =
//                     getImageUrl(
//                       cls.image
//                     );

//                   return (

//                     <tr
//                       key={cls.id}
//                       className="border-t border-[#2c2c35] hover:bg-[#1a1a20] transition-colors"
//                     >

//                       {/* ID */}
//                       <td className="p-4 text-white whitespace-nowrap">
//                         {cls.id}
//                       </td>

//                       {/* IMAGE */}
//                       <td className="p-4">

//                         <div className="w-11 h-11 rounded-xl overflow-hidden border border-[#333] bg-[#26262b]">

//                           {imageUrl ? (

//                             <img
//                               src={imageUrl}
//                               alt={
//                                 cls.title ||
//                                 cls.name ||
//                                 "Class"
//                               }
//                               className="w-full h-full object-cover"
//                               loading="lazy"
//                               onError={(e) =>
//                                 handleImageError(
//                                   e,
//                                   imageUrl
//                                 )
//                               }
//                             />

//                           ) : (

//                             <div className="image-fallback w-full h-full flex items-center justify-center text-gray-600 text-xs">
//                               N/A
//                             </div>

//                           )}

//                           {imageUrl && (
//                             <div className="image-fallback hidden w-full h-full items-center justify-center text-gray-600 text-xs">
//                               N/A
//                             </div>
//                           )}

//                         </div>

//                       </td>

//                       {/* CLASS NAME */}
//                       <td className="p-4 font-medium whitespace-nowrap">
//                         {cls.title ||
//                           cls.name ||
//                           "-"}
//                       </td>

//                       {/* DESCRIPTION */}
//                       <td
//                         className="p-4 text-white max-w-[130px] truncate"
//                         title={
//                           cls.description ||
//                           ""
//                         }
//                       >
//                         {truncate(
//                           cls.description,
//                           30
//                         )}
//                       </td>

//                       {/* CATEGORY */}
//                       <td className="p-4 text-white whitespace-nowrap">
//                         {cls.category_name ||
//                           "-"}
//                       </td>

//                       {/* SUBCATEGORY */}
//                       <td className="p-4 text-white whitespace-nowrap">
//                         {cls.subcategory_name ||
//                           "-"}
//                       </td>

//                       {/* LEVEL */}
//                       <td className="p-4 whitespace-nowrap">

//                         <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300">
//                           {cls.level || "-"}
//                         </span>

//                       </td>

//                       {/* MODE */}
//                       <td className="p-4 whitespace-nowrap">

//                         <span
//                           className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getModeColor(
//                             cls.mode
//                           )}`}
//                         >
//                           {cls.mode || "-"}
//                         </span>

//                       </td>

//                       {/* PRICE */}
//                       <td className="p-4 font-semibold whitespace-nowrap">
//                         ₹{cls.price ?? 0}
//                       </td>

//                       {/* DURATION */}
//                       <td className="p-4 text-white whitespace-nowrap">
//                         {cls.duration
//                           ? `${cls.duration} min`
//                           : "-"}
//                       </td>

//                       {/* STUDENTS */}
//                       <td className="p-4 font-semibold whitespace-nowrap">
//                         {cls.students_count ??
//                           0}
//                       </td>

//                       {/* START DATE */}
//                       <td className="p-4 text-white whitespace-nowrap">
//                         {formatDate(
//                           cls.start_date
//                         )}
//                       </td>

//                       {/* END DATE */}
//                       <td className="p-4 text-white whitespace-nowrap">
//                         {formatDate(
//                           cls.end_date
//                         )}
//                       </td>

//                       {/* START TIME */}
//                       <td className="p-4 text-white whitespace-nowrap">

//                         {formatTime(
//                           cls.start_time ||
//                             cls.default_start_time
//                         )}

//                       </td>

//                       {/* AVAILABLE DAYS */}
//                       <td
//                         className="p-4 text-white whitespace-nowrap"
//                         title={formatDays(
//                           cls.available_days
//                         )}
//                       >
//                         {formatDays(
//                           cls.available_days
//                         )}
//                       </td>

//                       {/* ACTIONS */}
//                       <td className="p-4">

//                         <div className="flex items-center gap-2">

//                           {/* LMS */}
//                           <button
//                             onClick={() =>
//                               navigate(
//                                 `/trainer/lms/${cls.id}`
//                               )
//                             }
//                             className="p-2 rounded-lg hover:bg-purple-500/10 transition-colors group"
//                             title="Manage LMS"
//                           >
//                             <BookOpen
//                               size={16}
//                               className="text-purple-300 group-hover:text-purple-200 transition-colors"
//                             />
//                           </button>

//                           {/* EDIT */}
//                           <button
//                             onClick={() =>
//                               handleEdit(cls)
//                             }
//                             className="p-2 rounded-lg hover:bg-[#2a2a35] transition-colors group"
//                             title="Edit"
//                           >
//                             <Edit
//                               size={16}
//                               className="text-white"
//                             />
//                           </button>

//                           {/* DELETE */}
//                           <button
//                             onClick={() =>
//                               handleDelete(cls)
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
//                 })

//               )}

//             </tbody>

//           </table>

//         </div>

//       </div>

//       {/* =========================================
//           ADD / EDIT MODAL
//       ========================================== */}
//       {showModal && (

//         <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">

//           <div className="w-full max-w-[650px] max-h-[90vh] bg-[#211c30] rounded-2xl overflow-hidden shadow-2xl">

//             {/* HEADER */}
//             <div className="flex justify-between items-center p-6 border-b border-[#3a3448]">

//               <div>

//                 <h2 className="text-2xl font-bold text-white">
//                   {editingClass
//                     ? "Edit Class"
//                     : "Add Class"}
//                 </h2>

//                 <p className="text-gray-400 text-sm mt-1">
//                   {editingClass
//                     ? "Update class information"
//                     : "Create a new class"}
//                 </p>

//               </div>

//               <button
//                 onClick={closeModal}
//                 className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
//               >
//                 <FaTimes size={18} />
//               </button>

//             </div>

//             {/* BODY */}
//             <div className="overflow-y-auto max-h-[75vh] p-6">

//               <form
//                 onSubmit={handleSubmit}
//                 className="space-y-1"
//               >

//                 {/* CLASS NAME */}
//                 <div>

//                   <label
//                     className={labelClass}
//                   >
//                     Class Name *
//                   </label>

//                   <input
//                     value={formData.title}
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         title:
//                           e.target.value,
//                       })
//                     }
//                     className={inputClass}
//                     placeholder="Enter class name"
//                     required
//                   />

//                 </div>

//                 {/* DESCRIPTION */}
//                 <div>

//                   <label
//                     className={labelClass}
//                   >
//                     Description
//                   </label>

//                   <textarea
//                     value={
//                       formData.description
//                     }
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         description:
//                           e.target.value,
//                       })
//                     }
//                     rows="3"
//                     className={inputClass}
//                     placeholder="Enter description"
//                   />

//                 </div>

             

//                 {/* IMAGE */}
//                 <div>

//                   <label
//                     className={labelClass}
//                   >
//                     Class Image
//                   </label>

//                   {/* CURRENT IMAGE */}
//                   {editingClass?.image && (

//                     <div className="mb-3">

//                       <p className="text-xs text-gray-400 mb-2">
//                         Current image
//                       </p>

//                       <img
//                         src={getImageUrl(
//                           editingClass.image
//                         )}
//                         alt="Current"
//                         className="w-24 h-24 object-cover rounded-xl border border-[#3b354d]"
//                         onError={(e) => {
//                           e.currentTarget.style.display =
//                             "none";
//                         }}
//                       />

//                     </div>

//                   )}

//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         image:
//                           e.target.files?.[0] ||
//                           null,
//                       })
//                     }
//                     className="w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-[#3b354d] focus:outline-none focus:border-purple-500/50 transition-colors file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-500/20 file:text-purple-300 hover:file:bg-purple-500/30"
//                   />

//                   {formData.image && (
//                     <p className="text-xs text-green-400 -mt-2 mb-4">
//                       New image selected:{" "}
//                       {formData.image.name}
//                     </p>
//                   )}

//                 </div>

//                 {/* CATEGORY & SUBCATEGORY */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

//                   {/* CATEGORY */}
//                   <div>

//                     <label
//                       className={labelClass}
//                     >
//                       Category *
//                     </label>

//                     <select
//                       value={
//                         formData.category_id
//                       }
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           category_id:
//                             e.target.value,
//                           subcategory_id:
//                             "",
//                         })
//                       }
//                       className={selectClass}
//                       required
//                     >

//                       <option value="">
//                         Select Category
//                       </option>

//                       {categories?.map(
//                         (cat) => (

//                           <option
//                             key={cat.id}
//                             value={cat.id}
//                           >
//                             {cat.name}
//                           </option>

//                         )
//                       )}

//                     </select>

//                   </div>

//                   {/* SUBCATEGORY */}
//                   <div>

//                     <label
//                       className={labelClass}
//                     >
//                       Subcategory
//                     </label>

//                     <select
//                       value={
//                         formData.subcategory_id
//                       }
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           subcategory_id:
//                             e.target.value,
//                         })
//                       }
//                       disabled={
//                         !formData.category_id
//                       }
//                       className={`${selectClass} disabled:opacity-50`}
//                     >

//                       <option value="">
//                         Select Subcategory
//                       </option>

//                       {subcategories
//                         ?.filter(
//                           (s) =>
//                             String(
//                               s.category_id
//                             ) ===
//                             String(
//                               formData.category_id
//                             )
//                         )
//                         .map((sub) => (

//                           <option
//                             key={sub.id}
//                             value={sub.id}
//                           >
//                             {sub.name}
//                           </option>

//                         ))}

//                     </select>

//                   </div>

//                 </div>

//                 {/* PRICE & DURATION */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

//                   {/* PRICE */}
//                   <div>

//                     <label
//                       className={labelClass}
//                     >
//                       Price
//                     </label>

//                     <input
//                       type="number"
//                       min="0"
//                       value={formData.price}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           price:
//                             e.target.value,
//                         })
//                       }
//                       className={inputClass}
//                       placeholder="0"
//                     />

//                   </div>

//                   {/* DURATION */}
//                   <div>

//                     <label
//                       className={labelClass}
//                     >
//                       Duration (Minutes)
//                     </label>

//                     <input
//                       type="number"
//                       min="0"
//                       value={
//                         formData.duration
//                       }
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           duration:
//                             e.target.value,
//                         })
//                       }
//                       className={inputClass}
//                       placeholder="60"
//                     />

//                   </div>

//                 </div>

//                 {/* COURSE START / END DATE */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

//                   {/* START DATE */}
//                   <div>

//                     <label
//                       className={labelClass}
//                     >
//                       Course Start Date
//                     </label>

//                     <input
//                       type="date"
//                       value={
//                         formData.course_start_date
//                       }
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           course_start_date:
//                             e.target.value,
//                         })
//                       }
//                       className={`${inputClass} [color-scheme:dark]`}
//                     />

//                   </div>

//                   {/* END DATE */}
//                   <div>

//                     <label
//                       className={labelClass}
//                     >
//                       Course End Date
//                     </label>

//                     <input
//                       type="date"
//                       value={
//                         formData.course_end_date
//                       }
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           course_end_date:
//                             e.target.value,
//                         })
//                       }
//                       className={`${inputClass} [color-scheme:dark]`}
//                     />

//                   </div>

//                 </div>

//                 {/* ===================================
//                     START TIME
//                     CLEAN CUSTOM DARK UI
//                 ==================================== */}
//                 <div>

//                   <label
//                     className={labelClass}
//                   >
//                     Start Time
//                   </label>

//                   <div className="relative mt-2 mb-4">

//                     {/* CLOCK ICON */}
//                     <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none z-10">

//                       <Clock
//                         size={18}
//                         className="text-purple-400"
//                       />

//                     </div>

//                     <input
//                       type="time"
//                       value={
//                         formData.start_time
//                       }
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           start_time:
//                             e.target.value,
//                         })
//                       }
//                       className="w-full h-[50px] pl-12 pr-4 rounded-xl bg-[#2b2638] text-white border border-[#3b354d] focus:outline-none focus:border-purple-500/70 focus:ring-1 focus:ring-purple-500/30 transition-all [color-scheme:dark] text-sm"
//                     />

//                   </div>

//                   {formData.start_time && (
//                     <div className="flex items-center gap-2 -mt-2 mb-4">

//                       <span className="text-xs text-gray-400">
//                         Selected time:
//                       </span>

//                       <span className="px-2.5 py-1 rounded-lg bg-purple-500/15 text-purple-300 text-xs font-medium">
//                         {formatTime(
//                           formData.start_time
//                         )}
//                       </span>

//                     </div>
//                   )}

//                 </div>

//                 {/* AVAILABLE DAYS */}
//                 <div>

//                   <label
//                     className={labelClass}
//                   >
//                     Available Days
//                   </label>

//                   <div className="mt-2 mb-4 grid grid-cols-4 sm:grid-cols-7 gap-2">

//                     {DAYS_LIST.map(
//                       (day) => {

//                         const isChecked =
//                           formData.available_days.includes(
//                             day.value
//                           );

//                         return (

//                           <label
//                             key={day.value}
//                             className={`
//                               flex items-center justify-center gap-1.5 p-2.5 rounded-xl cursor-pointer text-xs font-medium transition-all border
//                               ${
//                                 isChecked
//                                   ? "bg-purple-500/20 border-purple-500/50 text-purple-300"
//                                   : "bg-[#2b2638] border-transparent text-white hover:border-purple-500/30 hover:text-gray-300"
//                               }
//                             `}
//                           >

//                             <input
//                               type="checkbox"
//                               checked={
//                                 isChecked
//                               }
//                               onChange={() =>
//                                 toggleDay(
//                                   day.value
//                                 )
//                               }
//                               className="sr-only"
//                             />

//                             <span
//                               className={`
//                                 w-4 h-4 rounded border flex items-center justify-center transition-colors
//                                 ${
//                                   isChecked
//                                     ? "bg-purple-500 border-purple-500"
//                                     : "border-gray-500"
//                                 }
//                               `}
//                             >

//                               {isChecked && (

//                                 <svg
//                                   className="w-3 h-3 text-white"
//                                   fill="none"
//                                   viewBox="0 0 24 24"
//                                   stroke="currentColor"
//                                   strokeWidth={3}
//                                 >

//                                   <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     d="M5 13l4 4L19 7"
//                                   />

//                                 </svg>

//                               )}

//                             </span>

//                             {day.label.slice(
//                               0,
//                               3
//                             )}

//                           </label>

//                         );
//                       }
//                     )}

//                   </div>

//                 </div>

//                 {/* STUDENTS COUNT */}
//                 <div>

//                   <label
//                     className={labelClass}
//                   >
//                     Students Count
//                   </label>

//                   <input
//                     type="number"
//                     min="0"
//                     value={
//                       formData.students_count
//                     }
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         students_count:
//                           e.target.value,
//                       })
//                     }
//                     className={inputClass}
//                     placeholder="0"
//                   />

//                 </div>

//                 {/* LEVEL & MODE */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

//                   {/* LEVEL */}
//                   <div>

//                     <label
//                       className={labelClass}
//                     >
//                       Level
//                     </label>

//                     <select
//                       value={
//                         formData.level
//                       }
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           level:
//                             e.target.value,
//                         })
//                       }
//                       className={selectClass}
//                     >

//                       <option value="BEGINNER">
//                         Beginner
//                       </option>

//                       <option value="INTERMEDIATE">
//                         Intermediate
//                       </option>

//                       <option value="ADVANCED">
//                         Advanced
//                       </option>

//                     </select>

//                   </div>

//                   {/* MODE */}
//                   <div>

//                     <label
//                       className={labelClass}
//                     >
//                       Mode
//                     </label>

//                     <select
//                       value={
//                         formData.mode
//                       }
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           mode:
//                             e.target.value,
//                         })
//                       }
//                       className={selectClass}
//                     >

//                       <option value="ONLINE">
//                         Online
//                       </option>

//                       <option value="OFFLINE">
//                         Offline
//                       </option>

//                       <option value="HYBRID">
//                         Hybrid
//                       </option>

//                     </select>

//                   </div>

//                 </div>

//                 {/* BUTTONS */}
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
//                     {editingClass
//                       ? "Update Class"
//                       : "Add Class"}
//                   </button>

//                 </div>

//               </form>

//             </div>

//           </div>

//         </div>

//       )}

//       {/* =========================================
//           DELETE MODAL
//       ========================================== */}
//       {showDeleteModal && (

//         <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">

//           <div className="w-full max-w-[400px] bg-[#1e1b2e] border border-[#2e2a42] rounded-2xl shadow-2xl overflow-hidden">

//             <div className="p-8 flex flex-col items-center">

//               <div className="w-14 h-14 rounded-full bg-red-500/15 flex items-center justify-center mb-5">

//                 <FaTrash className="text-red-400 text-lg" />

//               </div>

//               <h2 className="text-xl font-bold text-white mb-3 text-center">
//                 Delete Class
//               </h2>

//               <p className="text-white text-center text-sm leading-relaxed mb-8">
//                 Are you sure you want to delete this
//                 class?
//               </p>

//               <div className="flex gap-3 w-full">

//                 <button
//                   onClick={() => {
//                     setShowDeleteModal(
//                       false
//                     );
//                     setDeletingClass(
//                       null
//                     );
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




// import { useEffect, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import {
//   Edit,
//   Trash2,
//   Search,
//   BookOpen,
//   Clock,
//   Calendar,
// } from "lucide-react";
// import { FaTrash, FaTimes } from "react-icons/fa";
// import { getAuth, onAuthStateChanged } from "firebase/auth";

// import API from "../services/api";

// // =====================================================
// // DAYS
// // =====================================================

// const DAYS_LIST = [
//   { label: "Monday", value: "MONDAY" },
//   { label: "Tuesday", value: "TUESDAY" },
//   { label: "Wednesday", value: "WEDNESDAY" },
//   { label: "Thursday", value: "THURSDAY" },
//   { label: "Friday", value: "FRIDAY" },
//   { label: "Saturday", value: "SATURDAY" },
//   { label: "Sunday", value: "SUNDAY" },
// ];

// // =====================================================
// // DEFAULT FORM
// // =====================================================

// const DEFAULT_FORM = {
//   title: "",
//   description: "",
//   image: null,

//   category_id: "",
//   subcategory_id: "",

//   price: "",
//   duration: "60",

//   level: "BEGINNER",
//   mode: "ONLINE",

//   students_count: "",

//   course_start_date: "",

//   start_time: "",

//   available_days: [],
// };

// // =====================================================
// // STYLES
// // =====================================================

// const inputClass =
//   "w-full mt-2 p-3.5 rounded-xl bg-[#2b2638] text-white border border-white/10 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30 transition";

// const selectClass =
//   "w-full mt-2 p-3.5 rounded-xl bg-[#2b2638] text-white border border-white/10 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30 transition appearance-none";

// const labelClass =
//   "block text-sm font-medium text-white/90";

// // =====================================================
// // ARRAY HELPER
// // =====================================================

// const normalizeArray = (value) => {
//   if (Array.isArray(value)) {
//     return value;
//   }

//   if (Array.isArray(value?.data)) {
//     return value.data;
//   }

//   if (Array.isArray(value?.rows)) {
//     return value.rows;
//   }

//   if (Array.isArray(value?.categories)) {
//     return value.categories;
//   }

//   if (Array.isArray(value?.subcategories)) {
//     return value.subcategories;
//   }

//   if (Array.isArray(value?.specializations)) {
//     return value.specializations;
//   }

//   return [];
// };

// // =====================================================
// // DATE HELPERS
// // =====================================================

// const normalizeDateForInput = (value) => {
//   if (!value) return "";

//   const stringValue = String(value).trim();

//   if (!stringValue) return "";

//   if (/^\d{4}-\d{2}-\d{2}$/.test(stringValue)) {
//     return stringValue;
//   }

//   if (stringValue.includes("T")) {
//     return stringValue.split("T")[0];
//   }

//   if (stringValue.includes(" ")) {
//     return stringValue.split(" ")[0];
//   }

//   const date = new Date(stringValue);

//   if (Number.isNaN(date.getTime())) {
//     return "";
//   }

//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const day = String(date.getDate()).padStart(2, "0");

//   return `${year}-${month}-${day}`;
// };

// // =====================================================
// // TIME HELPERS
// // =====================================================

// const normalizeTimeForInput = (value) => {
//   if (!value) return "";

//   let stringValue = String(value).trim();

//   if (!stringValue) return "";

//   stringValue = stringValue.toUpperCase();

//   // HH:mm:ss
//   if (/^\d{2}:\d{2}:\d{2}$/.test(stringValue)) {
//     stringValue = stringValue.slice(0, 5);
//   }

//   // 12-hour format
//   const ampmMatch = stringValue.match(
//     /^(\d{1,2}):(\d{2})\s*(AM|PM)$/
//   );

//   if (ampmMatch) {
//     let hour = Number(ampmMatch[1]);
//     const minute = ampmMatch[2];
//     const period = ampmMatch[3];

//     if (period === "AM" && hour === 12) {
//       hour = 0;
//     }

//     if (period === "PM" && hour !== 12) {
//       hour += 12;
//     }

//     return `${String(hour).padStart(2, "0")}:${minute}`;
//   }

//   // HH:mm
//   const twentyFourHourMatch = stringValue.match(
//     /^(\d{1,2}):(\d{2})$/
//   );

//   if (twentyFourHourMatch) {
//     const hour = Number(twentyFourHourMatch[1]);
//     const minute = twentyFourHourMatch[2];

//     if (hour >= 0 && hour <= 23) {
//       return `${String(hour).padStart(2, "0")}:${minute}`;
//     }
//   }

//   return "";
// };

// // =====================================================
// // FORMAT TIME
// // =====================================================

// const formatTime = (timeStr) => {
//   if (!timeStr) return "-";

//   const normalized = normalizeTimeForInput(timeStr);

//   if (!normalized) {
//     return String(timeStr);
//   }

//   const [hours, minutes] = normalized.split(":");

//   const hourNumber = Number(hours);

//   const period = hourNumber >= 12 ? "PM" : "AM";

//   const hour12 = hourNumber % 12 || 12;

//   return `${hour12}:${minutes} ${period}`;
// };

// // =====================================================
// // FORMAT DATE
// // =====================================================

// const formatDate = (dateStr) => {
//   if (!dateStr) return "-";

//   const normalized = normalizeDateForInput(dateStr);

//   if (!normalized) {
//     return String(dateStr);
//   }

//   const [year, month, day] = normalized.split("-");

//   const date = new Date(
//     Number(year),
//     Number(month) - 1,
//     Number(day)
//   );

//   if (Number.isNaN(date.getTime())) {
//     return String(dateStr);
//   }

//   return date.toLocaleDateString("en-IN", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });
// };

// // =====================================================
// // AVAILABLE DAYS FORMATTER
// // =====================================================

// const formatDays = (days) => {
//   if (!days) return "-";

//   let arr = [];

//   try {
//     arr = Array.isArray(days)
//       ? days
//       : JSON.parse(days || "[]");
//   } catch {
//     return "-";
//   }

//   if (!Array.isArray(arr) || arr.length === 0) {
//     return "-";
//   }

//   const short = {
//     MONDAY: "Mon",
//     TUESDAY: "Tue",
//     WEDNESDAY: "Wed",
//     THURSDAY: "Thu",
//     FRIDAY: "Fri",
//     SATURDAY: "Sat",
//     SUNDAY: "Sun",
//   };

//   return arr
//     .map((item) => {
//       if (typeof item === "object") {
//         const value =
//           item?.day_name ||
//           item?.day ||
//           item?.name ||
//           "";

//         return (
//           short[String(value).toUpperCase()] ||
//           value
//         );
//       }

//       return (
//         short[String(item).toUpperCase()] ||
//         item
//       );
//     })
//     .filter(Boolean)
//     .join(", ");
// };

// // =====================================================
// // NORMALIZE AVAILABLE DAYS FOR EDIT
// // =====================================================

// const normalizeAvailableDays = (value) => {
//   if (!value) return [];

//   let arr = [];

//   try {
//     arr = Array.isArray(value)
//       ? value
//       : JSON.parse(value || "[]");
//   } catch {
//     return [];
//   }

//   if (!Array.isArray(arr)) {
//     return [];
//   }

//   return arr
//     .map((item) => {
//       if (typeof item === "object") {
//         return String(
//           item?.value ||
//             item?.day ||
//             item?.day_name ||
//             item?.name ||
//             ""
//         ).toUpperCase();
//       }

//       return String(item).toUpperCase();
//     })
//     .filter((item) =>
//       DAYS_LIST.some(
//         (day) => day.value === item
//       )
//     );
// };

// // =====================================================
// // TRUNCATE
// // =====================================================

// const truncate = (text, maxLen = 40) => {
//   if (!text) return "-";

//   const value = String(text);

//   return value.length > maxLen
//     ? `${value.slice(0, maxLen)}...`
//     : value;
// };

// // =====================================================
// // NORMALIZE TRAINER SPECIALIZATIONS
// // =====================================================

// const normalizeSpecializations = (raw) => {
//   if (!Array.isArray(raw)) {
//     return {
//       categories: [],
//       subcategories: [],
//     };
//   }

//   const categoryMap = new Map();
//   const subcategoryMap = new Map();

//   raw.forEach((item) => {
//     if (!item) return;

//     const categoryObject =
//       item.category ||
//       item.category_details ||
//       item.categoryData ||
//       null;

//     const subcategoryObject =
//       item.subcategory ||
//       item.subcategory_details ||
//       item.subcategoryData ||
//       null;

//     const rawCategoryId =
//       item.category_id ??
//       item.categoryId ??
//       categoryObject?.id;

//     const rawSubcategoryId =
//       item.subcategory_id ??
//       item.subcategoryId ??
//       subcategoryObject?.id;

//     const categoryId = Number(rawCategoryId);

//     const subcategoryId =
//       rawSubcategoryId === null ||
//       rawSubcategoryId === undefined ||
//       rawSubcategoryId === ""
//         ? null
//         : Number(rawSubcategoryId);

//     const categoryName =
//       item.category_name ??
//       item.categoryName ??
//       categoryObject?.name ??
//       categoryObject?.title ??
//       "";

//     const subcategoryName =
//       item.subcategory_name ??
//       item.subcategoryName ??
//       subcategoryObject?.name ??
//       subcategoryObject?.title ??
//       "";

//     // CATEGORY
//     if (
//       Number.isInteger(categoryId) &&
//       categoryId > 0
//     ) {
//       if (!categoryMap.has(categoryId)) {
//         categoryMap.set(categoryId, {
//           id: categoryId,
//           name:
//             categoryName ||
//             `Category ${categoryId}`,
//         });
//       }
//     }

//     // SUBCATEGORY
//     if (
//       Number.isInteger(categoryId) &&
//       categoryId > 0 &&
//       Number.isInteger(subcategoryId) &&
//       subcategoryId > 0
//     ) {
//       const key = `${categoryId}-${subcategoryId}`;

//       if (!subcategoryMap.has(key)) {
//         subcategoryMap.set(key, {
//           id: subcategoryId,
//           name:
//             subcategoryName ||
//             `Subcategory ${subcategoryId}`,
//           category_id: categoryId,
//         });
//       }
//     }
//   });

//   return {
//     categories: Array.from(
//       categoryMap.values()
//     ),

//     subcategories: Array.from(
//       subcategoryMap.values()
//     ),
//   };
// };

// // =====================================================
// // GET CLASS SUBCATEGORY ID
// // =====================================================

// const getClassSubcategoryId = (cls) => {
//   if (!cls) return null;

//   const value =
//     cls.subcategory_id ??
//     cls.subcategoryId ??
//     cls.subcategory?.id ??
//     cls.subcategory_details?.id ??
//     null;

//   if (
//     value === null ||
//     value === undefined ||
//     value === ""
//   ) {
//     return null;
//   }

//   const numberValue = Number(value);

//   return Number.isNaN(numberValue)
//     ? null
//     : numberValue;
// };

// // =====================================================
// // MAIN COMPONENT
// // =====================================================

// export default function TrainerClasses() {
//   const navigate = useNavigate();

//   // ===================================================
//   // CLASS STATES
//   // ===================================================

//   const [classes, setClasses] = useState([]);

//   const [searchQuery, setSearchQuery] =
//     useState("");

//   const [showModal, setShowModal] =
//     useState(false);

//   const [editingClass, setEditingClass] =
//     useState(null);

//   const [showDeleteModal, setShowDeleteModal] =
//     useState(false);

//   const [deletingClass, setDeletingClass] =
//     useState(null);

//   // ===================================================
//   // TRAINER SPECIALIZATIONS
//   // ===================================================

//   const [categories, setCategories] =
//     useState([]);

//   const [subcategories, setSubcategories] =
//     useState([]);

//   const [dropdownLoading, setDropdownLoading] =
//     useState(true);

//   // ===================================================
//   // LOADING
//   // ===================================================

//   const [loading, setLoading] =
//     useState(true);

//   const [saving, setSaving] =
//     useState(false);

//   // ===================================================
//   // FORM
//   // ===================================================

//   const [formData, setFormData] =
//     useState({
//       ...DEFAULT_FORM,
//       available_days: [],
//     });

//   // ===================================================
//   // AUTH CONFIG
//   // ===================================================

//   const getConfig = async () => {
//     const auth = getAuth();

//     let token = null;

//     if (auth.currentUser) {
//       token =
//         await auth.currentUser.getIdToken(true);
//     } else {
//       token =
//         localStorage.getItem("token");
//     }

//     if (!token) {
//       throw new Error(
//         "Authentication token missing."
//       );
//     }

//     return {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };
//   };

//   // ===================================================
//   // FETCH TRAINER CLASSES
//   // ===================================================

//   const fetchClasses = async () => {
//     try {
//       const config =
//         await getConfig();

//       const response =
//         await API.get(
//           "/classes/trainer/my-classes",
//           config
//         );

//       console.log(
//         "TRAINER CLASSES API RESPONSE:",
//         response.data
//       );

//       const data =
//         response?.data?.data ||
//         response?.data?.classes ||
//         response?.data ||
//         [];

//       setClasses(
//         Array.isArray(data)
//           ? data
//           : []
//       );
//     } catch (error) {
//       console.error(
//         "FETCH TRAINER CLASSES ERROR:",
//         error
//       );

//       console.error(
//         "BACKEND RESPONSE:",
//         error?.response?.data
//       );

//       toast.error(
//         error?.response?.data?.message ||
//           "Failed to load classes"
//       );

//       setClasses([]);
//     }
//   };

//   // ===================================================
//   // FETCH TRAINER SPECIALIZATIONS
//   // ===================================================

//   const fetchTrainerSpecializations =
//     async () => {
//       try {
//         setDropdownLoading(true);

//         const config =
//           await getConfig();

//         const response =
//           await API.get(
//             "/trainers/my-specializations",
//             config
//           );

//         console.log(
//           "TRAINER SPECIALIZATIONS API RESPONSE:",
//           response.data
//         );

//         const raw =
//           response?.data?.data ||
//           response?.data?.specializations ||
//           response?.data?.rows ||
//           response?.data ||
//           [];

//         const specializations =
//           normalizeArray(raw);

//         const normalized =
//           normalizeSpecializations(
//             specializations
//           );

//         setCategories(
//           normalized.categories
//         );

//         setSubcategories(
//           normalized.subcategories
//         );
//       } catch (error) {
//         console.error(
//           "FETCH TRAINER SPECIALIZATIONS ERROR:",
//           error
//         );

//         console.error(
//           "BACKEND RESPONSE:",
//           error?.response?.data
//         );

//         setCategories([]);
//         setSubcategories([]);

//         toast.error(
//           error?.response?.data?.message ||
//             "Failed to load your trainer profile categories."
//         );
//       } finally {
//         setDropdownLoading(false);
//       }
//     };

//   // ===================================================
//   // INITIAL AUTH LOAD
//   // ===================================================

//   useEffect(() => {
//     const auth = getAuth();

//     const unsubscribe =
//       onAuthStateChanged(
//         auth,
//         async (user) => {
//           if (!user) {
//             setClasses([]);
//             setCategories([]);
//             setSubcategories([]);
//             setLoading(false);
//             setDropdownLoading(false);
//             return;
//           }

//           try {
//             setLoading(true);

//             await Promise.all([
//               fetchClasses(),
//               fetchTrainerSpecializations(),
//             ]);
//           } catch (error) {
//             console.error(
//               "TRAINER CLASSES INITIAL LOAD ERROR:",
//               error
//             );
//           } finally {
//             setLoading(false);
//           }
//         }
//       );

//     return () => unsubscribe();
//   }, []);

//   // ===================================================
//   // SEARCH
//   // ===================================================

//   const filteredClasses = useMemo(() => {
//     const query =
//       searchQuery
//         .trim()
//         .toLowerCase();

//     if (!query) {
//       return classes;
//     }

//     return classes.filter((cls) =>
//       String(cls?.title || "")
//         .toLowerCase()
//         .includes(query)
//     );
//   }, [
//     classes,
//     searchQuery,
//   ]);

//   // ===================================================
//   // AVAILABLE SUBCATEGORIES
//   // ===================================================

//   const availableSubcategories =
//     useMemo(() => {
//       if (!formData.category_id) {
//         return [];
//       }

//       return subcategories.filter(
//         (subcategory) =>
//           Number(
//             subcategory.category_id
//           ) ===
//           Number(
//             formData.category_id
//           )
//       );
//     }, [
//       subcategories,
//       formData.category_id,
//     ]);

//   // ===================================================
//   // USED SUBCATEGORY IDS
//   // ===================================================
//   //
//   // ONE SUBCATEGORY = ONE CLASS
//   //
//   // When editing a class, its own subcategory
//   // is excluded from this list so it can remain
//   // selected.
//   // ===================================================

//   const usedSubcategoryIds =
//     useMemo(() => {
//       const ids = new Set();

//       classes.forEach((cls) => {
//         if (
//           editingClass?.id &&
//           Number(cls.id) ===
//             Number(editingClass.id)
//         ) {
//           return;
//         }

//         const subcategoryId =
//           getClassSubcategoryId(cls);

//         if (subcategoryId) {
//           ids.add(Number(subcategoryId));
//         }
//       });

//       return ids;
//     }, [
//       classes,
//       editingClass,
//     ]);

//   // ===================================================
//   // FORM CHANGE
//   // ===================================================

//   const handleChange = (event) => {
//     const {
//       name,
//       value,
//     } = event.target;

//     setFormData(
//       (previous) => ({
//         ...previous,
//         [name]: value,
//       })
//     );
//   };

//   // ===================================================
//   // CATEGORY CHANGE
//   // ===================================================

//   const handleCategoryChange = (
//     event
//   ) => {
//     const categoryId =
//       event.target.value;

//     setFormData(
//       (previous) => ({
//         ...previous,
//         category_id: categoryId,
//         subcategory_id: "",
//       })
//     );
//   };

//   // ===================================================
//   // SUBCATEGORY CHANGE
//   // ===================================================

//   const handleSubcategoryChange = (
//     event
//   ) => {
//     const subcategoryId =
//       event.target.value;

//     if (!subcategoryId) {
//       setFormData(
//         (previous) => ({
//           ...previous,
//           subcategory_id: "",
//         })
//       );

//       return;
//     }

//     const isAlreadyUsed =
//       usedSubcategoryIds.has(
//         Number(subcategoryId)
//       );

//     if (isAlreadyUsed) {
//       toast.error(
//         "This subcategory already has a class."
//       );

//       return;
//     }

//     setFormData(
//       (previous) => ({
//         ...previous,
//         subcategory_id:
//           subcategoryId,
//       })
//     );
//   };

//   // ===================================================
//   // DAY TOGGLE
//   // ===================================================

//   const toggleDay = (dayValue) => {
//     setFormData(
//       (previous) => {
//         const exists =
//           previous.available_days.includes(
//             dayValue
//           );

//         return {
//           ...previous,

//           available_days: exists
//             ? previous.available_days.filter(
//                 (day) =>
//                   day !== dayValue
//               )
//             : [
//                 ...previous.available_days,
//                 dayValue,
//               ],
//         };
//       }
//     );
//   };

//   // ===================================================
//   // TIME PARTS
//   // ===================================================

//   const getTimeParts = (value) => {
//     const normalized =
//       normalizeTimeForInput(value);

//     if (!normalized) {
//       return {
//         hour: "",
//         minute: "",
//         period: "AM",
//       };
//     }

//     const [
//       hour24String,
//       minute,
//     ] = normalized.split(":");

//     const hour24 =
//       Number(hour24String);

//     return {
//       hour: String(
//         hour24 % 12 || 12
//       ).padStart(2, "0"),

//       minute:
//         minute || "00",

//       period:
//         hour24 >= 12
//           ? "PM"
//           : "AM",
//     };
//   };

//   // ===================================================
//   // SET TIME PART
//   // ===================================================

//   const setTimePart = (
//     field,
//     part,
//     value
//   ) => {
//     const current =
//       getTimeParts(
//         formData[field]
//       );

//     let hour = current.hour;
//     let minute = current.minute;
//     let period = current.period;

//     if (part === "hour") {
//       hour = value;
//     }

//     if (part === "minute") {
//       minute = value;
//     }

//     if (part === "period") {
//       period = value;
//     }

//     if (!hour) {
//       setFormData(
//         (previous) => ({
//           ...previous,
//           [field]: "",
//         })
//       );

//       return;
//     }

//     let hour24 =
//       Number(hour);

//     if (period === "AM") {
//       if (hour24 === 12) {
//         hour24 = 0;
//       }
//     } else {
//       if (hour24 !== 12) {
//         hour24 += 12;
//       }
//     }

//     const finalTime =
//       `${String(hour24).padStart(
//         2,
//         "0"
//       )}:${minute}:00`;

//     setFormData(
//       (previous) => ({
//         ...previous,
//         [field]: finalTime,
//       })
//     );
//   };

//   // ===================================================
//   // TIME SELECTOR
//   // ===================================================

//   const TimeSelector = ({
//     label,
//     field,
//     icon,
//   }) => {
//     const timeParts =
//       getTimeParts(
//         formData[field]
//       );

//     return (
//       <div>
//         <label className={labelClass}>
//           <span className="flex items-center gap-2">
//             {icon}
//             {label}
//           </span>
//         </label>

//         <div className="mt-2 p-3 rounded-xl bg-[#2b2638] border border-white/10">
//           <div className="flex items-center gap-2">

//             {/* HOUR */}

//             <div className="flex-1">
//               <select
//                 value={
//                   timeParts.hour
//                 }
//                 onChange={(event) =>
//                   setTimePart(
//                     field,
//                     "hour",
//                     event.target.value
//                   )
//                 }
//                 className="w-full px-3 py-3 rounded-lg bg-[#211c30] text-white border border-white/10 focus:outline-none focus:border-purple-500 appearance-none text-center font-semibold"
//               >
//                 <option value="">
//                   HH
//                 </option>

//                 {Array.from(
//                   { length: 12 },
//                   (_, index) => {
//                     const hour =
//                       String(
//                         index + 1
//                       ).padStart(2, "0");

//                     return (
//                       <option
//                         key={hour}
//                         value={hour}
//                       >
//                         {hour}
//                       </option>
//                     );
//                   }
//                 )}
//               </select>

//               <p className="text-[10px] text-white/40 text-center mt-1">
//                 Hour
//               </p>
//             </div>

//             <span className="text-white/50 text-xl font-bold">
//               :
//             </span>

//             {/* MINUTE */}

//             <div className="flex-1">
//               <select
//                 value={
//                   timeParts.minute
//                 }
//                 onChange={(event) =>
//                   setTimePart(
//                     field,
//                     "minute",
//                     event.target.value
//                   )
//                 }
//                 className="w-full px-3 py-3 rounded-lg bg-[#211c30] text-white border border-white/10 focus:outline-none focus:border-purple-500 appearance-none text-center font-semibold"
//               >
//                 <option value="">
//                   MM
//                 </option>

//                 {Array.from(
//                   { length: 60 },
//                   (_, index) => {
//                     const minute =
//                       String(
//                         index
//                       ).padStart(2, "0");

//                     return (
//                       <option
//                         key={minute}
//                         value={minute}
//                       >
//                         {minute}
//                       </option>
//                     );
//                   }
//                 )}
//               </select>

//               <p className="text-[10px] text-white/40 text-center mt-1">
//                 Minute
//               </p>
//             </div>

//             {/* AM PM */}

//             <div className="flex-1">
//               <select
//                 value={
//                   timeParts.period
//                 }
//                 onChange={(event) =>
//                   setTimePart(
//                     field,
//                     "period",
//                     event.target.value
//                   )
//                 }
//                 className="w-full px-3 py-3 rounded-lg bg-[#211c30] text-white border border-white/10 focus:outline-none focus:border-purple-500 appearance-none text-center font-semibold"
//               >
//                 <option value="AM">
//                   AM
//                 </option>

//                 <option value="PM">
//                   PM
//                 </option>
//               </select>

//               <p className="text-[10px] text-white/40 text-center mt-1">
//                 Period
//               </p>
//             </div>

//           </div>

//           {formData[field] && (
//             <div className="mt-3 flex items-center justify-center gap-2 text-sm text-purple-300">
//               <Clock size={14} />

//               <span>
//                 {formatTime(
//                   formData[field]
//                 )}
//               </span>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };

//   // ===================================================
//   // OPEN CREATE MODAL
//   // ===================================================

//   const openCreateModal = () => {
//     if (dropdownLoading) {
//       toast.error(
//         "Please wait while your trainer profile categories are loading."
//       );

//       return;
//     }

//     if (categories.length === 0) {
//       toast.error(
//         "No category is assigned to your trainer profile."
//       );

//       return;
//     }

//     setEditingClass(null);

//     setFormData({
//       ...DEFAULT_FORM,
//       available_days: [],
//     });

//     setShowModal(true);
//   };

//   // ===================================================
//   // OPEN EDIT MODAL
//   // ===================================================

//   const handleEdit = (cls) => {
//     const days =
//       normalizeAvailableDays(
//         cls.available_days
//       );

//     const categoryId =
//       cls.category_id ??
//       cls.categoryId ??
//       cls.category?.id ??
//       "";

//     const subcategoryId =
//       cls.subcategory_id ??
//       cls.subcategoryId ??
//       cls.subcategory?.id ??
//       "";

//     const startDate =
//       normalizeDateForInput(
//         cls.course_start_date ||
//           cls.start_date ||
//           cls.courseStartDate
//       );

//     const startTime =
//       normalizeTimeForInput(
//         cls.default_start_time ||
//           cls.start_time ||
//           cls.startTime
//       );

//     console.log(
//       "EDIT CLASS ORIGINAL DATA:",
//       cls
//     );

//     setEditingClass(cls);

//     setFormData({
//       title:
//         cls.title || "",

//       description:
//         cls.description || "",

//       image: null,

//       category_id:
//         categoryId
//           ? String(categoryId)
//           : "",

//       subcategory_id:
//         subcategoryId
//           ? String(subcategoryId)
//           : "",

//       price:
//         cls.price ?? "",

//       duration:
//         cls.duration ?? "60",

//       level:
//         cls.level ||
//         "BEGINNER",

//       mode:
//         cls.mode ||
//         "ONLINE",

//       students_count:
//         cls.students_count ?? "",

//       course_start_date:
//         startDate,

//       start_time:
//         startTime,

//       available_days:
//         days,
//     });

//     setShowModal(true);
//   };

//   // ===================================================
//   // DELETE
//   // ===================================================

//   const handleDelete = (cls) => {
//     setDeletingClass(cls);
//     setShowDeleteModal(true);
//   };

//   // ===================================================
//   // CONFIRM DELETE
//   // ===================================================

//   const confirmDelete = async () => {
//     if (!deletingClass) {
//       return;
//     }

//     try {
//       const config =
//         await getConfig();

//       await API.delete(
//         `/classes/trainer/${deletingClass.id}`,
//         config
//       );

//       toast.success(
//         "Class deleted successfully"
//       );

//       await fetchClasses();
//     } catch (error) {
//       console.error(
//         "DELETE CLASS ERROR:",
//         error
//       );

//       toast.error(
//         error?.response?.data?.message ||
//           "Delete failed"
//       );
//     } finally {
//       setShowDeleteModal(false);
//       setDeletingClass(null);
//     }
//   };

//   // ===================================================
//   // IMAGE URL
//   // ===================================================

//   const getImageUrl = (image) => {
//     if (
//       !image ||
//       typeof image !== "string"
//     ) {
//       return "";
//     }

//     const value =
//       image.trim();

//     if (!value) {
//       return "";
//     }

//     if (
//       value.startsWith("http://") ||
//       value.startsWith("https://") ||
//       value.startsWith("data:") ||
//       value.startsWith("blob:")
//     ) {
//       return value;
//     }

//     const apiBaseUrl =
//       API?.defaults?.baseURL ||
//       import.meta.env.VITE_API_URL ||
//       "http://localhost:5000/api";

//     const backendBaseUrl =
//       apiBaseUrl.replace(
//         /\/api\/?$/,
//         ""
//       );

//     return `${backendBaseUrl}${
//       value.startsWith("/")
//         ? value
//         : `/${value}`
//     }`;
//   };

//   // ===================================================
//   // IMAGE ERROR
//   // ===================================================

//   const handleImageError = (
//     event,
//     imageUrl
//   ) => {
//     console.error(
//       "CLASS IMAGE FAILED:",
//       imageUrl
//     );

//     event.currentTarget.style.display =
//       "none";

//     const fallback =
//       event.currentTarget.parentElement?.querySelector(
//         ".image-fallback"
//       );

//     if (fallback) {
//       fallback.style.display =
//         "flex";
//     }
//   };

//   // ===================================================
//   // SUBMIT
//   // ===================================================

//   const handleSubmit = async (
//     event
//   ) => {
//     event.preventDefault();

//     if (saving) {
//       return;
//     }

//     // CLASS NAME
//     if (
//       !formData.title?.trim()
//     ) {
//       toast.error(
//         "Class Name is required"
//       );

//       return;
//     }

//     // CATEGORY
//     if (
//       !formData.category_id
//     ) {
//       toast.error(
//         "Please select a Category"
//       );

//       return;
//     }

//     // SUBCATEGORY
//     if (
//       !formData.subcategory_id
//     ) {
//       toast.error(
//         "Please select a Subcategory"
//       );

//       return;
//     }

//     // VERIFY CATEGORY
//     const selectedCategory =
//       categories.find(
//         (category) =>
//           Number(category.id) ===
//           Number(
//             formData.category_id
//           )
//       );

//     if (!selectedCategory) {
//       toast.error(
//         "This category is not assigned to your trainer profile."
//       );

//       return;
//     }

//     // VERIFY SUBCATEGORY
//     const selectedSubcategory =
//       availableSubcategories.find(
//         (subcategory) =>
//           Number(
//             subcategory.id
//           ) ===
//           Number(
//             formData.subcategory_id
//           )
//       );

//     if (!selectedSubcategory) {
//       toast.error(
//         "This subcategory is not assigned to your trainer profile."
//       );

//       return;
//     }

//     // =================================================
//     // ONE SUBCATEGORY = ONE CLASS
//     // =================================================

//     const duplicateClass =
//       classes.find((cls) => {
//         if (
//           editingClass?.id &&
//           Number(cls.id) ===
//             Number(editingClass.id)
//         ) {
//           return false;
//         }

//         const existingSubcategoryId =
//           getClassSubcategoryId(cls);

//         return (
//           existingSubcategoryId !== null &&
//           Number(
//             existingSubcategoryId
//           ) ===
//             Number(
//               formData.subcategory_id
//             )
//         );
//       });

//     if (duplicateClass) {
//       toast.error(
//         "This subcategory already has a class. Only one class can be created for each subcategory."
//       );

//       return;
//     }

//     // DATE VALIDATION
//     // Only start date is used now.

//     try {
//       setSaving(true);

//       const config =
//         await getConfig();

//       const payload =
//         new FormData();

//       // BASIC
//       payload.append(
//         "title",
//         formData.title.trim()
//       );

//       payload.append(
//         "description",
//         formData.description?.trim() ||
//           ""
//       );

//       // CATEGORY
//       payload.append(
//         "category_id",
//         String(
//           formData.category_id
//         )
//       );

//       // SUBCATEGORY
//       payload.append(
//         "subcategory_id",
//         String(
//           formData.subcategory_id
//         )
//       );

//       // STUDENTS
//       payload.append(
//         "students_count",
//         String(
//           formData.students_count ||
//             0
//         )
//       );

//       // PRICE
//       payload.append(
//         "price",
//         String(
//           formData.price || 0
//         )
//       );

//       // DURATION
//       payload.append(
//         "duration",
//         String(
//           formData.duration || 60
//         )
//       );

//       // LEVEL
//       payload.append(
//         "level",
//         formData.level ||
//           "BEGINNER"
//       );

//       // MODE
//       payload.append(
//         "mode",
//         formData.mode ||
//           "ONLINE"
//       );

//       // IMAGE
//       if (formData.image) {
//         payload.append(
//           "image",
//           formData.image
//         );
//       }

//       // START DATE
//       if (
//         formData.course_start_date
//       ) {
//         payload.append(
//           "start_date",
//           formData.course_start_date
//         );
//       }

//       // START TIME
//       if (
//         formData.start_time
//       ) {
//         payload.append(
//           "start_time",
//           formData.start_time
//         );
//       }

//       // AVAILABLE DAYS
//       formData.available_days.forEach(
//         (day) => {
//           payload.append(
//             "available_days[]",
//             day
//           );
//         }
//       );

//       // =================================================
//       // UPDATE
//       // =================================================

//       if (editingClass?.id) {
//         await API.put(
//           `/classes/trainer/${editingClass.id}`,
//           payload,
//           {
//             headers: {
//               ...config.headers,
//               "Content-Type":
//                 "multipart/form-data",
//             },
//           }
//         );

//         toast.success(
//           "Class updated successfully"
//         );
//       }

//       // =================================================
//       // CREATE
//       // =================================================

//       else {
//         await API.post(
//           "/classes/trainer/create",
//           payload,
//           {
//             headers: {
//               ...config.headers,
//               "Content-Type":
//                 "multipart/form-data",
//             },
//           }
//         );

//         toast.success(
//           "Class created successfully"
//         );
//       }

//       await fetchClasses();

//       closeModal();
//     } catch (error) {
//       console.error(
//         "CREATE / UPDATE CLASS ERROR:",
//         error
//       );

//       console.error(
//         "BACKEND RESPONSE:",
//         error?.response?.data
//       );

//       toast.error(
//         error?.response?.data?.message ||
//           "Something went wrong"
//       );
//     } finally {
//       setSaving(false);
//     }
//   };

//   // ===================================================
//   // CLOSE MODAL
//   // ===================================================

//   const closeModal = () => {
//     setShowModal(false);

//     setEditingClass(null);

//     setFormData({
//       ...DEFAULT_FORM,
//       available_days: [],
//     });
//   };

//   // ===================================================
//   // MODE COLOR
//   // ===================================================

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

//   // ===================================================
//   // JSX
//   // ===================================================

//   return (
//     <div className="p-8 text-white">

//       {/* =================================================
//           HEADER
//       ================================================= */}

//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">

//         <div>
//           <h1 className="text-4xl font-bold text-purple-400">
//             Trainer Classes
//           </h1>

//           <p className="text-white mt-2">
//             Manage your classes
//           </p>
//         </div>

//         <button
//           onClick={openCreateModal}
//           disabled={
//             dropdownLoading ||
//             categories.length === 0
//           }
//           className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           + Add Class
//         </button>
//       </div>

//       {/* =================================================
//           SEARCH
//       ================================================= */}

//       <div className="mb-6">
//         <div className="relative w-full">

//           <Search
//             className="absolute left-4 top-1/2 -translate-y-1/2 text-white pointer-events-none"
//             size={18}
//           />

//           <input
//             type="text"
//             placeholder="Search by class name..."
//             value={searchQuery}
//             onChange={(event) =>
//               setSearchQuery(
//                 event.target.value
//               )
//             }
//             className="w-full pl-12 pr-10 py-3.5 rounded-xl bg-[#151519] border border-[#2c2c35] text-white placeholder-white focus:outline-none focus:border-purple-500/60 transition-colors text-sm"
//           />

//           {searchQuery && (
//             <button
//               onClick={() =>
//                 setSearchQuery("")
//               }
//               className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
//             >
//               <FaTimes size={14} />
//             </button>
//           )}

//         </div>
//       </div>

//       {/* =================================================
//           TRAINER PROFILE INFO
//       ================================================= */}

//       {!dropdownLoading &&
//         categories.length === 0 && (
//           <div className="mb-6 p-4 rounded-xl border border-yellow-500/20 bg-yellow-500/10">
//             <p className="text-yellow-300 text-sm">
//               No categories are assigned to
//               your trainer profile. Please
//               complete your trainer profile
//               before creating a class.
//             </p>
//           </div>
//         )}

//       {/* =================================================
//           TABLE
//       ================================================= */}

//       <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl overflow-hidden">

//         <div className="overflow-x-auto">

//           <table className="w-full">

//             <thead className="bg-[#202027] text-white">

//               <tr>

//                 <th className="p-4 text-left whitespace-nowrap">
//                   ID
//                 </th>

//                 <th className="p-4 text-left whitespace-nowrap">
//                   Image
//                 </th>

//                 <th className="p-4 text-left whitespace-nowrap">
//                   Class Name
//                 </th>

//                 <th className="p-4 text-left whitespace-nowrap">
//                   Description
//                 </th>

//                 <th className="p-4 text-left whitespace-nowrap">
//                   Category
//                 </th>

//                 <th className="p-4 text-left whitespace-nowrap">
//                   Subcategory
//                 </th>

//                 <th className="p-4 text-left whitespace-nowrap">
//                   Level
//                 </th>

//                 <th className="p-4 text-left whitespace-nowrap">
//                   Mode
//                 </th>

//                 <th className="p-4 text-left whitespace-nowrap">
//                   Price
//                 </th>

//                 <th className="p-4 text-left whitespace-nowrap">
//                   Duration
//                 </th>

//                 <th className="p-4 text-left whitespace-nowrap">
//                   Students
//                 </th>

//                 <th className="p-4 text-left whitespace-nowrap">
//                   Start Date
//                 </th>

//                 <th className="p-4 text-left whitespace-nowrap">
//                   Start Time
//                 </th>

//                 <th className="p-4 text-left whitespace-nowrap">
//                   Available Days
//                 </th>

//                 <th className="p-4 text-left whitespace-nowrap">
//                   Actions
//                 </th>

//               </tr>

//             </thead>

//             <tbody>

//               {loading ? (
//                 <tr>
//                   <td
//                     colSpan={totalColumns}
//                     className="p-12 text-center"
//                   >
//                     <div className="flex flex-col items-center gap-3">

//                       <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />

//                       <p className="text-gray-400">
//                         Loading classes...
//                       </p>

//                     </div>
//                   </td>
//                 </tr>

//               ) : filteredClasses.length === 0 ? (

//                 <tr>

//                   <td
//                     colSpan={totalColumns}
//                     className="p-12 text-center"
//                   >

//                     <div className="flex flex-col items-center gap-3">

//                       <Search
//                         size={40}
//                         className="text-gray-600"
//                       />

//                       <p className="text-gray-500 text-lg">
//                         {searchQuery
//                           ? "No classes found matching your search"
//                           : "No classes available"}
//                       </p>

//                       {searchQuery && (
//                         <button
//                           onClick={() =>
//                             setSearchQuery("")
//                           }
//                           className="text-purple-400 hover:text-purple-300 text-sm"
//                         >
//                           Clear search
//                         </button>
//                       )}

//                     </div>

//                   </td>

//                 </tr>

//               ) : (

//                 filteredClasses.map(
//                   (cls) => {

//                     const imageUrl =
//                       getImageUrl(
//                         cls.image
//                       );

//                     return (
//                       <tr
//                         key={cls.id}
//                         className="border-t border-[#2c2c35] hover:bg-[#1a1a20] transition-colors"
//                       >

//                         {/* ID */}

//                         <td className="p-4 text-white whitespace-nowrap">
//                           {cls.id}
//                         </td>

//                         {/* IMAGE */}

//                         <td className="p-4">

//                           <div className="w-11 h-11 rounded-xl overflow-hidden border border-[#333] bg-[#26262b]">

//                             {imageUrl ? (

//                               <img
//                                 src={imageUrl}
//                                 alt={
//                                   cls.title ||
//                                   "Class"
//                                 }
//                                 className="w-full h-full object-cover"
//                                 loading="lazy"
//                                 onError={(event) =>
//                                   handleImageError(
//                                     event,
//                                     imageUrl
//                                   )
//                                 }
//                               />

//                             ) : (

//                               <div className="image-fallback w-full h-full flex items-center justify-center text-gray-600 text-xs">
//                                 N/A
//                               </div>

//                             )}

//                             {imageUrl && (
//                               <div className="image-fallback hidden w-full h-full items-center justify-center text-gray-600 text-xs">
//                                 N/A
//                               </div>
//                             )}

//                           </div>

//                         </td>

//                         {/* CLASS NAME */}

//                         <td className="p-4 font-medium whitespace-nowrap">
//                           {cls.title || "-"}
//                         </td>

//                         {/* DESCRIPTION */}

//                         <td
//                           className="p-4 text-white max-w-[130px] truncate"
//                           title={
//                             cls.description ||
//                             ""
//                           }
//                         >
//                           {truncate(
//                             cls.description,
//                             30
//                           )}
//                         </td>

//                         {/* CATEGORY */}

//                         <td className="p-4 text-white whitespace-nowrap">
//                           {cls.category_name ||
//                             cls.category?.name ||
//                             "-"}
//                         </td>

//                         {/* SUBCATEGORY */}

//                         <td className="p-4 text-white whitespace-nowrap">
//                           {cls.subcategory_name ||
//                             cls.subcategory?.name ||
//                             "-"}
//                         </td>

//                         {/* LEVEL */}

//                         <td className="p-4 whitespace-nowrap">

//                           <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300">
//                             {cls.level ||
//                               "-"}
//                           </span>

//                         </td>

//                         {/* MODE */}

//                         <td className="p-4 whitespace-nowrap">

//                           <span
//                             className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getModeColor(
//                               cls.mode
//                             )}`}
//                           >
//                             {cls.mode ||
//                               "-"}
//                           </span>

//                         </td>

//                         {/* PRICE */}

//                         <td className="p-4 font-semibold whitespace-nowrap">
//                           ₹
//                           {cls.price ??
//                             0}
//                         </td>

//                         {/* DURATION */}

//                         <td className="p-4 text-white whitespace-nowrap">
//                           {cls.duration
//                             ? `${cls.duration} min`
//                             : "-"}
//                         </td>

//                         {/* STUDENTS */}

//                         <td className="p-4 font-semibold whitespace-nowrap">
//                           {cls.students_count ??
//                             0}
//                         </td>

//                         {/* START DATE */}

//                         <td className="p-4 text-white whitespace-nowrap">
//                           {formatDate(
//                             cls.start_date ||
//                               cls.course_start_date
//                           )}
//                         </td>

//                         {/* START TIME */}

//                         <td className="p-4 text-white whitespace-nowrap">
//                           {formatTime(
//                             cls.start_time ||
//                               cls.default_start_time
//                           )}
//                         </td>

//                         {/* AVAILABLE DAYS */}

//                         <td
//                           className="p-4 text-white whitespace-nowrap"
//                           title={formatDays(
//                             cls.available_days
//                           )}
//                         >
//                           {formatDays(
//                             cls.available_days
//                           )}
//                         </td>

//                         {/* ACTIONS */}

//                         <td className="p-4">

//                           <div className="flex items-center gap-2">

//                             {/* LMS */}

//                             <button
//                               onClick={() =>
//                                 navigate(
//                                   `/trainer/lms/${cls.id}`
//                                 )
//                               }
//                               className="p-2 rounded-lg hover:bg-purple-500/10 transition-colors group"
//                               title="Manage LMS"
//                             >
//                               <BookOpen
//                                 size={16}
//                                 className="text-purple-300"
//                               />
//                             </button>

//                             {/* EDIT */}

//                             <button
//                               onClick={() =>
//                                 handleEdit(
//                                   cls
//                                 )
//                               }
//                               className="p-2 rounded-lg hover:bg-[#2a2a35] transition-colors group"
//                               title="Edit"
//                             >
//                               <Edit
//                                 size={16}
//                                 className="text-white"
//                               />
//                             </button>

//                             {/* DELETE */}

//                             <button
//                               onClick={() =>
//                                 handleDelete(
//                                   cls
//                                 )
//                               }
//                               className="p-2 rounded-lg hover:bg-red-500/10 transition-colors group"
//                               title="Delete"
//                             >
//                               <Trash2
//                                 size={16}
//                                 className="text-red-500/70"
//                               />
//                             </button>

//                           </div>

//                         </td>

//                       </tr>
//                     );
//                   }
//                 )
//               )}

//             </tbody>

//           </table>

//         </div>

//       </div>

//       {/* =================================================
//           ADD / EDIT MODAL
//       ================================================= */}

//       {showModal && (

//         <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex justify-center items-center z-50 p-4">

//           <div className="w-full max-w-[720px] max-h-[92vh] bg-[#211c30] rounded-2xl overflow-hidden shadow-2xl border border-white/5">

//             {/* HEADER */}

//             <div className="flex justify-between items-center px-6 py-5 border-b border-[#3a3448]">

//               <div>

//                 <h2 className="text-2xl font-bold text-white">
//                   {editingClass
//                     ? "Edit Class"
//                     : "Add Class"}
//                 </h2>

//                 <p className="text-sm text-white/50 mt-1">
//                   {editingClass
//                     ? "Update your class information"
//                     : "Create a new class"}
//                 </p>

//               </div>

//               <button
//                 onClick={closeModal}
//                 disabled={saving}
//                 className="w-10 h-10 rounded-xl flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 transition"
//               >
//                 <FaTimes size={19} />
//               </button>

//             </div>

//             {/* BODY */}

//             <div className="overflow-y-auto max-h-[calc(92vh-90px)] p-6">

//               <form
//                 onSubmit={handleSubmit}
//                 className="space-y-5"
//               >

//                 {/* CLASS NAME */}

//                 <div>

//                   <label className={labelClass}>
//                     Class Name *
//                   </label>

//                   <input
//                     name="title"
//                     value={
//                       formData.title
//                     }
//                     onChange={
//                       handleChange
//                     }
//                     className={inputClass}
//                     placeholder="Enter class name"
//                     required
//                   />

//                 </div>

//                 {/* DESCRIPTION */}

//                 <div>

//                   <label className={labelClass}>
//                     Description
//                   </label>

//                   <textarea
//                     name="description"
//                     value={
//                       formData.description
//                     }
//                     onChange={
//                       handleChange
//                     }
//                     rows={3}
//                     className={`${inputClass} resize-none`}
//                     placeholder="Enter class description"
//                   />

//                 </div>

//                 {/* IMAGE */}

//                 <div>

//                   <label className={labelClass}>
//                     Class Image
//                   </label>

//                   {editingClass?.image && (
//                     <div className="mb-3">

//                       <p className="text-xs text-white/40 mb-2">
//                         Current image
//                       </p>

//                       <img
//                         src={getImageUrl(
//                           editingClass.image
//                         )}
//                         alt="Current class"
//                         className="w-24 h-24 object-cover rounded-xl border border-white/10"
//                         onError={(
//                           event
//                         ) => {
//                           event.currentTarget.style.display =
//                             "none";
//                         }}
//                       />

//                     </div>
//                   )}

//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={(
//                       event
//                     ) =>
//                       setFormData(
//                         (
//                           previous
//                         ) => ({
//                           ...previous,
//                           image:
//                             event
//                               .target
//                               .files?.[0] ||
//                             null,
//                         })
//                       )
//                     }
//                     className="w-full p-3 rounded-xl bg-[#2b2638] text-white border border-white/10 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-500/20 file:text-purple-300 file:font-semibold"
//                   />

//                 </div>

//                 {/* CATEGORY + SUBCATEGORY */}

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

//                   {/* CATEGORY */}

//                   <div>

//                     <label className={labelClass}>
//                       Category *
//                     </label>

//                     <select
//                       value={
//                         formData.category_id
//                       }
//                       onChange={
//                         handleCategoryChange
//                       }
//                       className={selectClass}
//                       disabled={
//                         dropdownLoading ||
//                         categories.length ===
//                           0
//                       }
//                       required
//                     >

//                       <option value="">
//                         {dropdownLoading
//                           ? "Loading your categories..."
//                           : categories.length ===
//                               0
//                             ? "No category assigned"
//                             : "Select Category"}
//                       </option>

//                       {categories.map(
//                         (category) => (
//                           <option
//                             key={
//                               category.id
//                             }
//                             value={
//                               category.id
//                             }
//                           >
//                             {
//                               category.name
//                             }
//                           </option>
//                         )
//                       )}

//                     </select>

//                     <p className="text-xs text-purple-300/60 mt-1">
//                       Only categories selected
//                       in your trainer profile
//                       are shown.
//                     </p>

//                   </div>

//                   {/* SUBCATEGORY */}

//                   <div>

//                     <label className={labelClass}>
//                       Subcategory *
//                     </label>

//                     <select
//                       value={
//                         formData.subcategory_id
//                       }
//                       onChange={
//                         handleSubcategoryChange
//                       }
//                       disabled={
//                         !formData.category_id ||
//                         dropdownLoading ||
//                         availableSubcategories.length ===
//                           0
//                       }
//                       className={`${selectClass} disabled:opacity-50 disabled:cursor-not-allowed`}
//                       required
//                     >

//                       <option value="">
//                         {!formData.category_id
//                           ? "Select Category First"
//                           : dropdownLoading
//                             ? "Loading..."
//                             : availableSubcategories.length ===
//                                 0
//                               ? "No subcategory assigned"
//                               : "Select Subcategory"}
//                       </option>

//                       {availableSubcategories.map(
//                         (
//                           subcategory
//                         ) => {
//                           const isUsed =
//                             usedSubcategoryIds.has(
//                               Number(
//                                 subcategory.id
//                               )
//                             );

//                           const isCurrentEditingSubcategory =
//                             editingClass &&
//                             Number(
//                               getClassSubcategoryId(
//                                 editingClass
//                               )
//                             ) ===
//                               Number(
//                                 subcategory.id
//                               );

//                           const disabled =
//                             isUsed &&
//                             !isCurrentEditingSubcategory;

//                           return (
//                             <option
//                               key={`${subcategory.category_id}-${subcategory.id}`}
//                               value={
//                                 subcategory.id
//                               }
//                               disabled={
//                                 disabled
//                               }
//                             >
//                               {subcategory.name}
//                               {disabled
//                                 ? " — Class already created"
//                                 : ""}
//                             </option>
//                           );
//                         }
//                       )}

//                     </select>

//                     <p className="text-xs text-purple-300/60 mt-1">
//                       Only one class can be
//                       created for each
//                       subcategory.
//                     </p>

//                   </div>

//                 </div>

//                 {/* PRICE + DURATION */}

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

//                   <div>

//                     <label className={labelClass}>
//                       Price
//                     </label>

//                     <input
//                       name="price"
//                       type="number"
//                       min="0"
//                       value={
//                         formData.price
//                       }
//                       onChange={
//                         handleChange
//                       }
//                       className={inputClass}
//                       placeholder="0"
//                     />

//                   </div>

//                   <div>

//                     <label className={labelClass}>
//                       Duration (Minutes)
//                     </label>

//                     <input
//                       name="duration"
//                       type="number"
//                       min="1"
//                       value={
//                         formData.duration
//                       }
//                       onChange={
//                         handleChange
//                       }
//                       className={inputClass}
//                       placeholder="60"
//                     />

//                   </div>

//                 </div>

//                 {/* START DATE */}

//                 <div>

//                   <label className={labelClass}>
//                     <span className="flex items-center gap-2">
//                       <Calendar size={15} />
//                       Course Start Date
//                     </span>
//                   </label>

//                   <input
//                     name="course_start_date"
//                     type="date"
//                     value={
//                       formData.course_start_date
//                     }
//                     onChange={
//                       handleChange
//                     }
//                     className={inputClass}
//                   />

//                 </div>

//                 {/* START TIME */}

//                 <div>

//                   <TimeSelector
//                     label="Start Time"
//                     field="start_time"
//                     icon={
//                       <Clock size={15} />
//                     }
//                   />

//                 </div>

//                 {/* AVAILABLE DAYS */}

//                 <div>

//                   <label className={labelClass}>
//                     Available Days
//                   </label>

//                   <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">

//                     {DAYS_LIST.map(
//                       (day) => {

//                         const isChecked =
//                           formData.available_days.includes(
//                             day.value
//                           );

//                         return (
//                           <label
//                             key={
//                               day.value
//                             }
//                             className={`
//                               flex items-center justify-center gap-2 p-3 rounded-xl cursor-pointer text-xs font-medium transition-all border
//                               ${
//                                 isChecked
//                                   ? "bg-purple-500/20 border-purple-500/60 text-purple-300"
//                                   : "bg-[#2b2638] border-white/5 text-white hover:border-purple-500/30 hover:text-purple-200"
//                               }
//                             `}
//                           >

//                             <input
//                               type="checkbox"
//                               checked={
//                                 isChecked
//                               }
//                               onChange={() =>
//                                 toggleDay(
//                                   day.value
//                                 )
//                               }
//                               className="sr-only"
//                             />

//                             <span
//                               className={`
//                                 w-4 h-4 rounded-md border flex items-center justify-center transition
//                                 ${
//                                   isChecked
//                                     ? "bg-purple-500 border-purple-500"
//                                     : "border-gray-500"
//                                 }
//                               `}
//                             >

//                               {isChecked && (
//                                 <svg
//                                   className="w-3 h-3 text-white"
//                                   fill="none"
//                                   viewBox="0 0 24 24"
//                                   stroke="currentColor"
//                                   strokeWidth={3}
//                                 >
//                                   <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     d="M5 13l4 4L19 7"
//                                   />
//                                 </svg>
//                               )}

//                             </span>

//                             {day.label.slice(
//                               0,
//                               3
//                             )}

//                           </label>
//                         );
//                       }
//                     )}

//                   </div>

//                 </div>

//                 {/* STUDENTS */}

//                 <div>

//                   <label className={labelClass}>
//                     Students Count
//                   </label>

//                   <input
//                     name="students_count"
//                     type="number"
//                     min="0"
//                     value={
//                       formData.students_count
//                     }
//                     onChange={
//                       handleChange
//                     }
//                     className={inputClass}
//                     placeholder="0"
//                   />

//                 </div>

//                 {/* LEVEL + MODE */}

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

//                   <div>

//                     <label className={labelClass}>
//                       Level
//                     </label>

//                     <select
//                       name="level"
//                       value={
//                         formData.level
//                       }
//                       onChange={
//                         handleChange
//                       }
//                       className={selectClass}
//                     >

//                       <option value="BEGINNER">
//                         Beginner
//                       </option>

//                       <option value="INTERMEDIATE">
//                         Intermediate
//                       </option>

//                       <option value="ADVANCED">
//                         Advanced
//                       </option>

//                     </select>

//                   </div>

//                   <div>

//                     <label className={labelClass}>
//                       Mode
//                     </label>

//                     <select
//                       name="mode"
//                       value={
//                         formData.mode
//                       }
//                       onChange={
//                         handleChange
//                       }
//                       className={selectClass}
//                     >

//                       <option value="ONLINE">
//                         Online
//                       </option>

//                       <option value="OFFLINE">
//                         Offline
//                       </option>

//                       <option value="HYBRID">
//                         Hybrid
//                       </option>

//                     </select>

//                   </div>

//                 </div>

//                 {/* BUTTONS */}

//                 <div className="flex justify-end gap-3 pt-5 border-t border-[#3a3448]">

//                   <button
//                     type="button"
//                     onClick={
//                       closeModal
//                     }
//                     disabled={saving}
//                     className="px-5 py-3 rounded-xl border border-gray-600 text-gray-300 hover:bg-[#2b2638] transition-colors disabled:opacity-50"
//                   >
//                     Cancel
//                   </button>

//                   <button
//                     type="submit"
//                     disabled={
//                       saving ||
//                       dropdownLoading ||
//                       categories.length ===
//                         0
//                     }
//                     className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
//                   >

//                     {saving
//                       ? "Saving..."
//                       : editingClass
//                         ? "Update Class"
//                         : "Add Class"}

//                   </button>

//                 </div>

//               </form>

//             </div>

//           </div>

//         </div>
//       )}

//       {/* =================================================
//           DELETE MODAL
//       ================================================= */}

//       {showDeleteModal && (

//         <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">

//           <div className="w-full max-w-[400px] bg-[#1e1b2e] border border-[#2e2a42] rounded-2xl shadow-2xl overflow-hidden">

//             <div className="p-8 flex flex-col items-center">

//               <div className="w-14 h-14 rounded-full bg-red-500/15 flex items-center justify-center mb-5">
//                 <FaTrash className="text-red-400 text-lg" />
//               </div>

//               <h2 className="text-xl font-bold text-white mb-3 text-center">
//                 Delete Class
//               </h2>

//               <p className="text-white/70 text-center text-sm leading-relaxed mb-8">
//                 Are you sure you want to
//                 delete this class?
//               </p>

//               <div className="flex gap-3 w-full">

//                 <button
//                   onClick={() => {
//                     setShowDeleteModal(
//                       false
//                     );

//                     setDeletingClass(
//                       null
//                     );
//                   }}
//                   className="flex-1 px-5 py-3 rounded-xl border border-[#3a3650] text-gray-300 hover:bg-[#2a2640] transition-colors font-medium text-sm"
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   onClick={
//                     confirmDelete
//                   }
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
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Edit,
  Trash2,
  Search,
  BookOpen,
  Clock,
  Calendar,
} from "lucide-react";
import { FaTrash, FaTimes } from "react-icons/fa";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import API from "../services/api";

/* =====================================================
   DAYS
===================================================== */

const DAYS_LIST = [
  { label: "Monday", value: "MONDAY" },
  { label: "Tuesday", value: "TUESDAY" },
  { label: "Wednesday", value: "WEDNESDAY" },
  { label: "Thursday", value: "THURSDAY" },
  { label: "Friday", value: "FRIDAY" },
  { label: "Saturday", value: "SATURDAY" },
  { label: "Sunday", value: "SUNDAY" },
];

/* =====================================================
   DEFAULT FORM
===================================================== */

const DEFAULT_FORM = {
  title: "",
  description: "",
  image: null,

  category_id: "",
  subcategory_id: "",

  price: "",
  duration: "60",

  level: "BEGINNER",
  mode: "ONLINE",

  students_count: "",

  course_start_date: "",

  start_time: "",

  available_days: [],
};

/* =====================================================
   STYLES
===================================================== */

const inputClass =
  "w-full mt-2 px-4 py-3.5 rounded-xl bg-[#2b2638] text-white border border-white/10 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10 transition placeholder:text-white/30";

const selectClass =
  "w-full mt-2 px-4 py-3.5 rounded-xl bg-[#2b2638] text-white border border-white/10 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10 transition appearance-none";

const labelClass =
  "block text-sm font-semibold text-white/90";

/* =====================================================
   ARRAY HELPERS
===================================================== */

const normalizeArray = (value) => {
  if (Array.isArray(value)) return value;

  if (Array.isArray(value?.data)) return value.data;

  if (Array.isArray(value?.rows)) return value.rows;

  if (Array.isArray(value?.categories)) {
    return value.categories;
  }

  if (Array.isArray(value?.subcategories)) {
    return value.subcategories;
  }

  if (Array.isArray(value?.specializations)) {
    return value.specializations;
  }

  return [];
};

/* =====================================================
   DATE HELPERS
===================================================== */

const normalizeDateForInput = (value) => {
  if (!value) return "";

  const stringValue = String(value).trim();

  if (!stringValue) return "";

  if (/^\d{4}-\d{2}-\d{2}$/.test(stringValue)) {
    return stringValue;
  }

  if (stringValue.includes("T")) {
    return stringValue.split("T")[0];
  }

  if (stringValue.includes(" ")) {
    return stringValue.split(" ")[0];
  }

  const date = new Date(stringValue);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

/* =====================================================
   TIME HELPERS

   Internal/backend format:
   HH:mm:ss

   UI format:
   hh:mm AM/PM
===================================================== */

const normalizeTimeForInput = (value) => {
  if (!value) return "";

  let stringValue = String(value).trim();

  if (!stringValue) return "";

  stringValue = stringValue.toUpperCase();

  // HH:mm:ss
  if (/^\d{2}:\d{2}:\d{2}$/.test(stringValue)) {
    return stringValue.slice(0, 5);
  }

  // HH:mm
  if (/^\d{1,2}:\d{2}$/.test(stringValue)) {
    const [hourString, minute] = stringValue.split(":");

    const hour = Number(hourString);

    if (hour >= 0 && hour <= 23) {
      return `${String(hour).padStart(2, "0")}:${minute}`;
    }
  }

  // 12-hour format
  const ampmMatch = stringValue.match(
    /^(\d{1,2}):(\d{2})\s*(AM|PM)$/
  );

  if (ampmMatch) {
    let hour = Number(ampmMatch[1]);
    const minute = ampmMatch[2];
    const period = ampmMatch[3];

    if (period === "AM" && hour === 12) {
      hour = 0;
    }

    if (period === "PM" && hour !== 12) {
      hour += 12;
    }

    if (hour >= 0 && hour <= 23) {
      return `${String(hour).padStart(2, "0")}:${minute}`;
    }
  }

  return "";
};

/* =====================================================
   DISPLAY TIME
===================================================== */

const formatTime = (timeStr) => {
  if (!timeStr) return "-";

  const normalized = normalizeTimeForInput(timeStr);

  if (!normalized) {
    return String(timeStr);
  }

  const [hours, minutes] = normalized.split(":");

  const hourNumber = Number(hours);

  const period = hourNumber >= 12 ? "PM" : "AM";

  const hour12 = hourNumber % 12 || 12;

  return `${String(hour12).padStart(2, "0")}:${minutes} ${period}`;
};

/* =====================================================
   DATE FORMAT
===================================================== */

const formatDate = (dateStr) => {
  if (!dateStr) return "-";

  const normalized = normalizeDateForInput(dateStr);

  if (!normalized) {
    return String(dateStr);
  }

  const [year, month, day] = normalized.split("-");

  const date = new Date(
    Number(year),
    Number(month) - 1,
    Number(day)
  );

  if (Number.isNaN(date.getTime())) {
    return String(dateStr);
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

/* =====================================================
   DAYS FORMAT
===================================================== */

const formatDays = (days) => {
  if (!days) return "-";

  let arr = [];

  try {
    arr = Array.isArray(days)
      ? days
      : JSON.parse(days || "[]");
  } catch {
    return "-";
  }

  if (!Array.isArray(arr) || arr.length === 0) {
    return "-";
  }

  const short = {
    MONDAY: "Mon",
    TUESDAY: "Tue",
    WEDNESDAY: "Wed",
    THURSDAY: "Thu",
    FRIDAY: "Fri",
    SATURDAY: "Sat",
    SUNDAY: "Sun",
  };

  return arr
    .map((item) => {
      if (typeof item === "object") {
        const value =
          item?.day_name ||
          item?.day ||
          item?.name ||
          "";

        return (
          short[String(value).toUpperCase()] ||
          value
        );
      }

      return (
        short[String(item).toUpperCase()] ||
        item
      );
    })
    .filter(Boolean)
    .join(", ");
};

/* =====================================================
   NORMALIZE DAYS
===================================================== */

const normalizeAvailableDays = (value) => {
  if (!value) return [];

  let arr = [];

  try {
    arr = Array.isArray(value)
      ? value
      : JSON.parse(value || "[]");
  } catch {
    return [];
  }

  if (!Array.isArray(arr)) {
    return [];
  }

  return arr
    .map((item) => {
      if (typeof item === "object") {
        return String(
          item?.value ||
            item?.day ||
            item?.day_name ||
            item?.name ||
            ""
        ).toUpperCase();
      }

      return String(item).toUpperCase();
    })
    .filter((item) =>
      DAYS_LIST.some((day) => day.value === item)
    );
};

/* =====================================================
   TRUNCATE
===================================================== */

const truncate = (text, maxLen = 40) => {
  if (!text) return "-";

  const value = String(text);

  return value.length > maxLen
    ? `${value.slice(0, maxLen)}...`
    : value;
};

/* =====================================================
   NORMALIZE SPECIALIZATIONS
===================================================== */

const normalizeSpecializations = (raw) => {
  if (!Array.isArray(raw)) {
    return {
      categories: [],
      subcategories: [],
    };
  }

  const categoryMap = new Map();
  const subcategoryMap = new Map();

  raw.forEach((item) => {
    if (!item) return;

    const categoryObject =
      item.category ||
      item.category_details ||
      item.categoryData ||
      null;

    const subcategoryObject =
      item.subcategory ||
      item.subcategory_details ||
      item.subcategoryData ||
      null;

    const rawCategoryId =
      item.category_id ??
      item.categoryId ??
      categoryObject?.id;

    const rawSubcategoryId =
      item.subcategory_id ??
      item.subcategoryId ??
      subcategoryObject?.id;

    const categoryId = Number(rawCategoryId);

    const subcategoryId =
      rawSubcategoryId === null ||
      rawSubcategoryId === undefined ||
      rawSubcategoryId === ""
        ? null
        : Number(rawSubcategoryId);

    const categoryName =
      item.category_name ??
      item.categoryName ??
      categoryObject?.name ??
      categoryObject?.title ??
      "";

    const subcategoryName =
      item.subcategory_name ??
      item.subcategoryName ??
      subcategoryObject?.name ??
      subcategoryObject?.title ??
      "";

    if (
      Number.isInteger(categoryId) &&
      categoryId > 0
    ) {
      if (!categoryMap.has(categoryId)) {
        categoryMap.set(categoryId, {
          id: categoryId,
          name:
            categoryName ||
            `Category ${categoryId}`,
        });
      }
    }

    if (
      Number.isInteger(categoryId) &&
      categoryId > 0 &&
      Number.isInteger(subcategoryId) &&
      subcategoryId > 0
    ) {
      const key = `${categoryId}-${subcategoryId}`;

      if (!subcategoryMap.has(key)) {
        subcategoryMap.set(key, {
          id: subcategoryId,
          name:
            subcategoryName ||
            `Subcategory ${subcategoryId}`,
          category_id: categoryId,
        });
      }
    }
  });

  return {
    categories: Array.from(categoryMap.values()),
    subcategories: Array.from(
      subcategoryMap.values()
    ),
  };
};

/* =====================================================
   GET SUBCATEGORY ID
===================================================== */

const getClassSubcategoryId = (cls) => {
  if (!cls) return null;

  const value =
    cls.subcategory_id ??
    cls.subcategoryId ??
    cls.subcategory?.id ??
    cls.subcategory_details?.id ??
    null;

  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return null;
  }

  const numberValue = Number(value);

  return Number.isNaN(numberValue)
    ? null
    : numberValue;
};

/* =====================================================
   MAIN COMPONENT
===================================================== */

export default function TrainerClasses() {
  const navigate = useNavigate();

  const [classes, setClasses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingClass, setEditingClass] = useState(null);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [deletingClass, setDeletingClass] =
    useState(null);

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] =
    useState([]);

  const [dropdownLoading, setDropdownLoading] =
    useState(true);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    ...DEFAULT_FORM,
    available_days: [],
  });

  /* ===================================================
     AUTH CONFIG
  =================================================== */

  const getConfig = async () => {
    const auth = getAuth();

    let token = null;

    if (auth.currentUser) {
      token = await auth.currentUser.getIdToken(true);
    } else {
      token = localStorage.getItem("token");
    }

    if (!token) {
      throw new Error(
        "Authentication token missing."
      );
    }

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  /* ===================================================
     FETCH CLASSES
  =================================================== */

  const fetchClasses = async () => {
    try {
      const config = await getConfig();

      const response = await API.get(
        "/classes/trainer/my-classes",
        config
      );

      const data =
        response?.data?.data ||
        response?.data?.classes ||
        response?.data ||
        [];

      setClasses(
        Array.isArray(data) ? data : []
      );
    } catch (error) {
      console.error(
        "FETCH TRAINER CLASSES ERROR:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to load classes"
      );

      setClasses([]);
    }
  };

  /* ===================================================
     FETCH SPECIALIZATIONS
  =================================================== */

  const fetchTrainerSpecializations =
    async () => {
      try {
        setDropdownLoading(true);

        const config = await getConfig();

        const response = await API.get(
          "/trainers/my-specializations",
          config
        );

        const raw =
          response?.data?.data ||
          response?.data?.specializations ||
          response?.data?.rows ||
          response?.data ||
          [];

        const specializations =
          normalizeArray(raw);

        const normalized =
          normalizeSpecializations(
            specializations
          );

        setCategories(normalized.categories);
        setSubcategories(
          normalized.subcategories
        );
      } catch (error) {
        console.error(
          "FETCH TRAINER SPECIALIZATIONS ERROR:",
          error
        );

        setCategories([]);
        setSubcategories([]);

        toast.error(
          error?.response?.data?.message ||
            "Failed to load trainer categories."
        );
      } finally {
        setDropdownLoading(false);
      }
    };

  /* ===================================================
     INITIAL LOAD
  =================================================== */

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe =
      onAuthStateChanged(auth, async (user) => {
        if (!user) {
          setClasses([]);
          setCategories([]);
          setSubcategories([]);
          setLoading(false);
          setDropdownLoading(false);
          return;
        }

        try {
          setLoading(true);

          await Promise.all([
            fetchClasses(),
            fetchTrainerSpecializations(),
          ]);
        } catch (error) {
          console.error(
            "INITIAL LOAD ERROR:",
            error
          );
        } finally {
          setLoading(false);
        }
      });

    return () => unsubscribe();
  }, []);

  /* ===================================================
     SEARCH
  =================================================== */

  const filteredClasses = useMemo(() => {
    const query =
      searchQuery.trim().toLowerCase();

    if (!query) return classes;

    return classes.filter((cls) =>
      String(cls?.title || "")
        .toLowerCase()
        .includes(query)
    );
  }, [classes, searchQuery]);

  /* ===================================================
     SUBCATEGORIES
  =================================================== */

  const availableSubcategories = useMemo(() => {
    if (!formData.category_id) return [];

    return subcategories.filter(
      (subcategory) =>
        Number(subcategory.category_id) ===
        Number(formData.category_id)
    );
  }, [
    subcategories,
    formData.category_id,
  ]);

  /* ===================================================
     USED SUBCATEGORIES
  =================================================== */

  const usedSubcategoryIds = useMemo(() => {
    const ids = new Set();

    classes.forEach((cls) => {
      if (
        editingClass?.id &&
        Number(cls.id) ===
          Number(editingClass.id)
      ) {
        return;
      }

      const subcategoryId =
        getClassSubcategoryId(cls);

      if (subcategoryId) {
        ids.add(Number(subcategoryId));
      }
    });

    return ids;
  }, [classes, editingClass]);

  /* ===================================================
     FORM CHANGE
  =================================================== */

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /* ===================================================
     CATEGORY CHANGE
  =================================================== */

  const handleCategoryChange = (event) => {
    setFormData((previous) => ({
      ...previous,
      category_id: event.target.value,
      subcategory_id: "",
    }));
  };

  /* ===================================================
     SUBCATEGORY CHANGE
  =================================================== */

  const handleSubcategoryChange = (event) => {
    const subcategoryId =
      event.target.value;

    if (!subcategoryId) {
      setFormData((previous) => ({
        ...previous,
        subcategory_id: "",
      }));

      return;
    }

    if (
      usedSubcategoryIds.has(
        Number(subcategoryId)
      )
    ) {
      toast.error(
        "This subcategory already has a class."
      );

      return;
    }

    setFormData((previous) => ({
      ...previous,
      subcategory_id: subcategoryId,
    }));
  };

  /* ===================================================
     DAY TOGGLE
  =================================================== */

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
              (day) => day !== dayValue
            )
          : [
              ...previous.available_days,
              dayValue,
            ],
      };
    });
  };

  /* ===================================================
     TIME PARTS
  =================================================== */

  const getTimeParts = (value) => {
    const normalized =
      normalizeTimeForInput(value);

    if (!normalized) {
      return {
        hour: "",
        minute: "",
        period: "AM",
      };
    }

    const [hour24String, minute] =
      normalized.split(":");

    const hour24 = Number(hour24String);

    return {
      hour: String(hour24 % 12 || 12).padStart(
        2,
        "0"
      ),
      minute: minute || "00",
      period: hour24 >= 12 ? "PM" : "AM",
    };
  };

  /* ===================================================
     UPDATE TIME
  =================================================== */

  const setTimePart = (
    field,
    part,
    value
  ) => {
    const current = getTimeParts(
      formData[field]
    );

    let hour = current.hour;
    let minute = current.minute;
    let period = current.period;

    if (part === "hour") hour = value;
    if (part === "minute") minute = value;
    if (part === "period") period = value;

    if (!hour || !minute) {
      setFormData((previous) => ({
        ...previous,
        [field]: "",
      }));

      return;
    }

    let hour24 = Number(hour);

    if (period === "AM") {
      if (hour24 === 12) hour24 = 0;
    } else {
      if (hour24 !== 12) hour24 += 12;
    }

    const finalTime =
      `${String(hour24).padStart(2, "0")}:` +
      `${String(minute).padStart(2, "0")}:00`;

    setFormData((previous) => ({
      ...previous,
      [field]: finalTime,
    }));
  };

  /* ===================================================
     TIME SELECTOR
  =================================================== */

  const TimeSelector = ({
    label,
    field,
    icon,
  }) => {
    const timeParts = getTimeParts(
      formData[field]
    );

    return (
      <div className="w-full">
        <label className={labelClass}>
          <span className="flex items-center gap-2">
            {icon}
            {label}
          </span>
        </label>

        <div className="mt-2 rounded-2xl bg-[#2b2638] border border-white/10 p-4">
          <div className="grid grid-cols-[1fr_auto_1fr_1fr] gap-2 items-start">

            {/* HOUR */}
            <div className="min-w-0">
              <select
                value={timeParts.hour}
                onChange={(event) =>
                  setTimePart(
                    field,
                    "hour",
                    event.target.value
                  )
                }
                className="w-full h-12 px-3 rounded-xl bg-[#211c30] text-white border border-white/10 focus:outline-none focus:border-purple-500 text-center font-semibold cursor-pointer"
              >
                <option value="">HH</option>

                {Array.from(
                  { length: 12 },
                  (_, index) => {
                    const hour =
                      String(index + 1).padStart(
                        2,
                        "0"
                      );

                    return (
                      <option
                        key={hour}
                        value={hour}
                      >
                        {hour}
                      </option>
                    );
                  }
                )}
              </select>

              <p className="text-[10px] text-white/40 text-center mt-1.5">
                Hour
              </p>
            </div>

            {/* COLON */}
            <div className="h-12 flex items-center justify-center">
              <span className="text-white/40 text-xl font-bold">
                :
              </span>
            </div>

            {/* MINUTE */}
            <div className="min-w-0">
              <select
                value={timeParts.minute}
                onChange={(event) =>
                  setTimePart(
                    field,
                    "minute",
                    event.target.value
                  )
                }
                className="w-full h-12 px-3 rounded-xl bg-[#211c30] text-white border border-white/10 focus:outline-none focus:border-purple-500 text-center font-semibold cursor-pointer"
              >
                <option value="">MM</option>

                {Array.from(
                  { length: 60 },
                  (_, index) => {
                    const minute =
                      String(index).padStart(
                        2,
                        "0"
                      );

                    return (
                      <option
                        key={minute}
                        value={minute}
                      >
                        {minute}
                      </option>
                    );
                  }
                )}
              </select>

              <p className="text-[10px] text-white/40 text-center mt-1.5">
                Minute
              </p>
            </div>

            {/* AM / PM */}
            <div className="min-w-0">
              <select
                value={timeParts.period}
                onChange={(event) =>
                  setTimePart(
                    field,
                    "period",
                    event.target.value
                  )
                }
                className="w-full h-12 px-3 rounded-xl bg-[#211c30] text-white border border-white/10 focus:outline-none focus:border-purple-500 text-center font-semibold cursor-pointer"
              >
                <option value="AM">
                  AM
                </option>

                <option value="PM">
                  PM
                </option>
              </select>

              <p className="text-[10px] text-white/40 text-center mt-1.5">
                Period
              </p>
            </div>
          </div>

          {/* PREVIEW */}
          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-center gap-2">
            <Clock
              size={14}
              className="text-purple-400"
            />

            <span className="text-sm font-semibold text-purple-300">
              {formData[field]
                ? formatTime(formData[field])
                : "Select start time"}
            </span>
          </div>
        </div>
      </div>
    );
  };

  /* ===================================================
     CREATE MODAL
  =================================================== */

  const openCreateModal = () => {
    if (dropdownLoading) {
      toast.error(
        "Please wait while categories are loading."
      );
      return;
    }

    if (categories.length === 0) {
      toast.error(
        "No category is assigned to your trainer profile."
      );
      return;
    }

    setEditingClass(null);

    setFormData({
      ...DEFAULT_FORM,
      available_days: [],
    });

    setShowModal(true);
  };

  /* ===================================================
     EDIT
  =================================================== */

  const handleEdit = (cls) => {
    const days =
      normalizeAvailableDays(
        cls.available_days
      );

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

    const startDate =
      normalizeDateForInput(
        cls.course_start_date ||
          cls.start_date ||
          cls.courseStartDate
      );

    const startTime =
      normalizeTimeForInput(
        cls.default_start_time ||
          cls.start_time ||
          cls.startTime
      );

    setEditingClass(cls);

    setFormData({
      title: cls.title || "",
      description: cls.description || "",
      image: null,

      category_id: categoryId
        ? String(categoryId)
        : "",

      subcategory_id: subcategoryId
        ? String(subcategoryId)
        : "",

      price: cls.price ?? "",
      duration: cls.duration ?? "60",

      level: cls.level || "BEGINNER",
      mode: cls.mode || "ONLINE",

      students_count:
        cls.students_count ?? "",

      course_start_date: startDate,

      start_time: startTime,

      available_days: days,
    });

    setShowModal(true);
  };

  /* ===================================================
     DELETE
  =================================================== */

  const handleDelete = (cls) => {
    setDeletingClass(cls);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!deletingClass) return;

    try {
      const config = await getConfig();

      await API.delete(
        `/classes/trainer/${deletingClass.id}`,
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

      toast.error(
        error?.response?.data?.message ||
          "Delete failed"
      );
    } finally {
      setShowDeleteModal(false);
      setDeletingClass(null);
    }
  };

  /* ===================================================
     IMAGE URL
  =================================================== */

  const getImageUrl = (image) => {
    if (
      !image ||
      typeof image !== "string"
    ) {
      return "";
    }

    const value = image.trim();

    if (!value) return "";

    if (
      value.startsWith("http://") ||
      value.startsWith("https://") ||
      value.startsWith("data:") ||
      value.startsWith("blob:")
    ) {
      return value;
    }

    const apiBaseUrl =
      API?.defaults?.baseURL ||
      import.meta.env.VITE_API_URL ||
      "http://localhost:5000/api";

    const backendBaseUrl =
      apiBaseUrl.replace(/\/api\/?$/, "");

    return `${backendBaseUrl}${
      value.startsWith("/")
        ? value
        : `/${value}`
    }`;
  };

  /* ===================================================
     IMAGE ERROR
  =================================================== */

  const handleImageError = (
    event,
    imageUrl
  ) => {
    console.error(
      "CLASS IMAGE FAILED:",
      imageUrl
    );

    event.currentTarget.style.display =
      "none";

    const fallback =
      event.currentTarget.parentElement?.querySelector(
        ".image-fallback"
      );

    if (fallback) {
      fallback.style.display = "flex";
    }
  };

  /* ===================================================
     SUBMIT
  =================================================== */

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (saving) return;

    if (!formData.title?.trim()) {
      toast.error("Class Name is required");
      return;
    }

    if (!formData.category_id) {
      toast.error("Please select a Category");
      return;
    }

    if (!formData.subcategory_id) {
      toast.error(
        "Please select a Subcategory"
      );
      return;
    }

    const selectedCategory =
      categories.find(
        (category) =>
          Number(category.id) ===
          Number(formData.category_id)
      );

    if (!selectedCategory) {
      toast.error(
        "This category is not assigned to your trainer profile."
      );
      return;
    }

    const selectedSubcategory =
      availableSubcategories.find(
        (subcategory) =>
          Number(subcategory.id) ===
          Number(formData.subcategory_id)
      );

    if (!selectedSubcategory) {
      toast.error(
        "This subcategory is not assigned to your trainer profile."
      );
      return;
    }

    const duplicateClass =
      classes.find((cls) => {
        if (
          editingClass?.id &&
          Number(cls.id) ===
            Number(editingClass.id)
        ) {
          return false;
        }

        const existingSubcategoryId =
          getClassSubcategoryId(cls);

        return (
          existingSubcategoryId !== null &&
          Number(existingSubcategoryId) ===
            Number(formData.subcategory_id)
        );
      });

    if (duplicateClass) {
      toast.error(
        "This subcategory already has a class. Only one class can be created for each subcategory."
      );
      return;
    }

    try {
      setSaving(true);

      const config = await getConfig();

      const payload = new FormData();

      /* BASIC */

      payload.append(
        "title",
        formData.title.trim()
      );

      payload.append(
        "description",
        formData.description?.trim() || ""
      );

      /* CATEGORY */

      payload.append(
        "category_id",
        String(formData.category_id)
      );

      payload.append(
        "subcategory_id",
        String(formData.subcategory_id)
      );

      /* STUDENTS */

      payload.append(
        "students_count",
        String(formData.students_count || 0)
      );

      /* PRICE */

      payload.append(
        "price",
        String(formData.price || 0)
      );

      /* DURATION */

      payload.append(
        "duration",
        String(formData.duration || 60)
      );

      /* LEVEL */

      payload.append(
        "level",
        formData.level || "BEGINNER"
      );

      /* MODE */

      payload.append(
        "mode",
        formData.mode || "ONLINE"
      );

      /* IMAGE */

      if (formData.image) {
        payload.append(
          "image",
          formData.image
        );
      }

      /* START DATE */

      if (formData.course_start_date) {
        payload.append(
          "start_date",
          formData.course_start_date
        );
      }

      /* START TIME */

      if (formData.start_time) {
        payload.append(
          "start_time",
          formData.start_time
        );
      }

      /* AVAILABLE DAYS */

      formData.available_days.forEach(
        (day) => {
          payload.append(
            "available_days[]",
            day
          );
        }
      );

      /* UPDATE */

      if (editingClass?.id) {
        await API.put(
          `/classes/trainer/${editingClass.id}`,
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
      }

      /* CREATE */

      else {
        await API.post(
          "/classes/trainer/create",
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
        "CREATE / UPDATE CLASS ERROR:",
        error
      );

      console.error(
        "BACKEND RESPONSE:",
        error?.response?.data
      );

      toast.error(
        error?.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setSaving(false);
    }
  };

  /* ===================================================
     CLOSE MODAL
  =================================================== */

  const closeModal = () => {
    setShowModal(false);
    setEditingClass(null);

    setFormData({
      ...DEFAULT_FORM,
      available_days: [],
    });
  };

  /* ===================================================
     MODE COLOR
  =================================================== */

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

  const totalColumns = 15;

  /* ===================================================
     JSX
  =================================================== */

  return (
    <div className="min-h-screen bg-[#08080c] p-4 sm:p-6 lg:p-8 text-white">

      {/* HEADER */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-7">

        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-purple-400">
            Trainer Classes
          </h1>

          <p className="text-white/50 mt-2">
            Manage your classes, schedules and students
          </p>
        </div>

        <button
          onClick={openCreateModal}
          disabled={
            dropdownLoading ||
            categories.length === 0
          }
          className="w-full lg:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          + Add Class
        </button>
      </div>

      {/* SEARCH */}

      <div className="mb-6">
        <div className="relative w-full">

          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
            size={18}
          />

          <input
            type="text"
            placeholder="Search by class name..."
            value={searchQuery}
            onChange={(event) =>
              setSearchQuery(event.target.value)
            }
            className="w-full pl-12 pr-10 py-3.5 rounded-xl bg-[#151519] border border-[#2c2c35] text-white placeholder:text-white/30 focus:outline-none focus:border-purple-500/60"
          />

          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
            >
              <FaTimes size={14} />
            </button>
          )}
        </div>
      </div>

      {/* PROFILE WARNING */}

      {!dropdownLoading &&
        categories.length === 0 && (
          <div className="mb-6 p-4 rounded-xl border border-yellow-500/20 bg-yellow-500/10">
            <p className="text-yellow-300 text-sm">
              No categories are assigned to
              your trainer profile. Please
              complete your trainer profile
              before creating a class.
            </p>
          </div>
        )}

      {/* TABLE */}

      <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[1800px]">

            <thead className="bg-[#202027] text-white">

              <tr>
                <th className="p-4 text-left">
                  ID
                </th>

                <th className="p-4 text-left">
                  Image
                </th>

                <th className="p-4 text-left">
                  Class Name
                </th>

                <th className="p-4 text-left">
                  Description
                </th>

                <th className="p-4 text-left">
                  Category
                </th>

                <th className="p-4 text-left">
                  Subcategory
                </th>

                <th className="p-4 text-left">
                  Level
                </th>

                <th className="p-4 text-left">
                  Mode
                </th>

                <th className="p-4 text-left">
                  Price
                </th>

                <th className="p-4 text-left">
                  Duration
                </th>

                <th className="p-4 text-left">
                  Students
                </th>

                <th className="p-4 text-left">
                  Start Date
                </th>

                <th className="p-4 text-left">
                  Start Time
                </th>

                <th className="p-4 text-left">
                  Available Days
                </th>

                <th className="p-4 text-left">
                  Actions
                </th>
              </tr>

            </thead>

            <tbody>

              {loading ? (
                <tr>
                  <td
                    colSpan={totalColumns}
                    className="p-12 text-center"
                  >
                    <div className="flex flex-col items-center gap-3">

                      <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />

                      <p className="text-white/40">
                        Loading classes...
                      </p>

                    </div>
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
                        className="text-white/20"
                      />

                      <p className="text-white/40 text-lg">
                        {searchQuery
                          ? "No classes found matching your search"
                          : "No classes available"}
                      </p>

                      {searchQuery && (
                        <button
                          onClick={() =>
                            setSearchQuery("")
                          }
                          className="text-purple-400 hover:text-purple-300 text-sm"
                        >
                          Clear search
                        </button>
                      )}

                    </div>
                  </td>
                </tr>
              ) : (
                filteredClasses.map((cls) => {
                  const imageUrl =
                    getImageUrl(cls.image);

                  return (
                    <tr
                      key={cls.id}
                      className="border-t border-[#2c2c35] hover:bg-[#1a1a20] transition"
                    >

                      <td className="p-4 whitespace-nowrap">
                        {cls.id}
                      </td>

                      <td className="p-4">
                        <div className="w-11 h-11 rounded-xl overflow-hidden border border-[#333] bg-[#26262b]">

                          {imageUrl ? (
                            <img
                              src={imageUrl}
                              alt={
                                cls.title ||
                                "Class"
                              }
                              className="w-full h-full object-cover"
                              loading="lazy"
                              onError={(event) =>
                                handleImageError(
                                  event,
                                  imageUrl
                                )
                              }
                            />
                          ) : (
                            <div className="image-fallback w-full h-full flex items-center justify-center text-gray-600 text-xs">
                              N/A
                            </div>
                          )}

                          {imageUrl && (
                            <div className="image-fallback hidden w-full h-full items-center justify-center text-gray-600 text-xs">
                              N/A
                            </div>
                          )}

                        </div>
                      </td>

                      <td className="p-4 font-medium whitespace-nowrap">
                        {cls.title || "-"}
                      </td>

                      <td
                        className="p-4 text-white max-w-[180px] truncate"
                        title={cls.description || ""}
                      >
                        {truncate(
                          cls.description,
                          30
                        )}
                      </td>

                      <td className="p-4 whitespace-nowrap">
                        {cls.category_name ||
                          cls.category?.name ||
                          "-"}
                      </td>

                      <td className="p-4 whitespace-nowrap">
                        {cls.subcategory_name ||
                          cls.subcategory?.name ||
                          "-"}
                      </td>

                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300">
                          {cls.level || "-"}
                        </span>
                      </td>

                      <td className="p-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getModeColor(
                            cls.mode
                          )}`}
                        >
                          {cls.mode || "-"}
                        </span>
                      </td>

                      <td className="p-4 font-semibold whitespace-nowrap">
                        ₹{cls.price ?? 0}
                      </td>

                      <td className="p-4 whitespace-nowrap">
                        {cls.duration
                          ? `${cls.duration} min`
                          : "-"}
                      </td>

                      <td className="p-4 font-semibold">
                        {cls.students_count ?? 0}
                      </td>

                      <td className="p-4 whitespace-nowrap">
                        {formatDate(
                          cls.start_date ||
                            cls.course_start_date
                        )}
                      </td>

                      <td className="p-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-2">
                          <Clock
                            size={14}
                            className="text-purple-400"
                          />

                          {formatTime(
                            cls.start_time ||
                              cls.default_start_time
                          )}
                        </span>
                      </td>

                      <td className="p-4 whitespace-nowrap">
                        {formatDays(
                          cls.available_days
                        )}
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-2">

                          <button
                            onClick={() =>
                              navigate(
                                `/trainer/lms/${cls.id}`
                              )
                            }
                            className="p-2 rounded-lg hover:bg-purple-500/10"
                            title="Manage LMS"
                          >
                            <BookOpen
                              size={16}
                              className="text-purple-300"
                            />
                          </button>

                          <button
                            onClick={() =>
                              handleEdit(cls)
                            }
                            className="p-2 rounded-lg hover:bg-[#2a2a35]"
                            title="Edit"
                          >
                            <Edit
                              size={16}
                              className="text-white"
                            />
                          </button>

                          <button
                            onClick={() =>
                              handleDelete(cls)
                            }
                            className="p-2 rounded-lg hover:bg-red-500/10"
                            title="Delete"
                          >
                            <Trash2
                              size={16}
                              className="text-red-500/70"
                            />
                          </button>

                        </div>
                      </td>

                    </tr>
                  );
                })
              )}

            </tbody>

          </table>

        </div>
      </div>

      {/* =================================================
          ADD / EDIT MODAL
      ================================================= */}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-5">

          <div className="w-full max-w-3xl max-h-[94vh] bg-[#211c30] rounded-3xl overflow-hidden shadow-2xl border border-white/10">

            {/* MODAL HEADER */}

            <div className="sticky top-0 z-10 flex items-center justify-between px-5 sm:px-7 py-5 bg-[#211c30] border-b border-white/10">

              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  {editingClass
                    ? "Edit Class"
                    : "Add Class"}
                </h2>

                <p className="text-sm text-white/40 mt-1">
                  {editingClass
                    ? "Update your class information"
                    : "Create a new class"}
                </p>
              </div>

              <button
                onClick={closeModal}
                disabled={saving}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition"
              >
                <FaTimes size={18} />
              </button>

            </div>

            {/* MODAL BODY */}

            <div className="overflow-y-auto max-h-[calc(94vh-100px)]">

              <form
                onSubmit={handleSubmit}
                className="p-5 sm:p-7 space-y-6"
              >

                {/* CLASS NAME */}

                <div>
                  <label className={labelClass}>
                    Class Name *
                  </label>

                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Enter class name"
                    required
                  />
                </div>

                {/* DESCRIPTION */}

                <div>
                  <label className={labelClass}>
                    Description
                  </label>

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className={`${inputClass} resize-none`}
                    placeholder="Enter class description"
                  />
                </div>

                {/* IMAGE */}

                <div>
                  <label className={labelClass}>
                    Class Image
                  </label>

                  {editingClass?.image && (
                    <div className="mt-3 mb-3">
                      <p className="text-xs text-white/40 mb-2">
                        Current image
                      </p>

                      <img
                        src={getImageUrl(
                          editingClass.image
                        )}
                        alt="Current class"
                        className="w-24 h-24 object-cover rounded-xl border border-white/10"
                        onError={(event) => {
                          event.currentTarget.style.display =
                            "none";
                        }}
                      />
                    </div>
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) =>
                      setFormData((previous) => ({
                        ...previous,
                        image:
                          event.target.files?.[0] ||
                          null,
                      }))
                    }
                    className="w-full mt-2 p-3 rounded-xl bg-[#2b2638] text-white border border-white/10 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-500/20 file:text-purple-300 file:font-semibold"
                  />
                </div>

                {/* CATEGORY / SUBCATEGORY */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  <div>
                    <label className={labelClass}>
                      Category *
                    </label>

                    <select
                      value={formData.category_id}
                      onChange={handleCategoryChange}
                      className={selectClass}
                      disabled={
                        dropdownLoading ||
                        categories.length === 0
                      }
                      required
                    >
                      <option value="">
                        {dropdownLoading
                          ? "Loading your categories..."
                          : categories.length === 0
                          ? "No category assigned"
                          : "Select Category"}
                      </option>

                      {categories.map(
                        (category) => (
                          <option
                            key={category.id}
                            value={category.id}
                          >
                            {category.name}
                          </option>
                        )
                      )}
                    </select>

                    <p className="text-xs text-purple-300/50 mt-1.5">
                      Only categories from your
                      trainer profile are shown.
                    </p>
                  </div>

                  <div>
                    <label className={labelClass}>
                      Subcategory *
                    </label>

                    <select
                      value={
                        formData.subcategory_id
                      }
                      onChange={
                        handleSubcategoryChange
                      }
                      disabled={
                        !formData.category_id ||
                        dropdownLoading ||
                        availableSubcategories.length ===
                          0
                      }
                      className={`${selectClass} disabled:opacity-50 disabled:cursor-not-allowed`}
                      required
                    >
                      <option value="">
                        {!formData.category_id
                          ? "Select Category First"
                          : dropdownLoading
                          ? "Loading..."
                          : availableSubcategories.length ===
                            0
                          ? "No subcategory assigned"
                          : "Select Subcategory"}
                      </option>

                      {availableSubcategories.map(
                        (subcategory) => {
                          const isUsed =
                            usedSubcategoryIds.has(
                              Number(
                                subcategory.id
                              )
                            );

                          const isCurrentEditing =
                            editingClass &&
                            Number(
                              getClassSubcategoryId(
                                editingClass
                              )
                            ) ===
                              Number(
                                subcategory.id
                              );

                          const disabled =
                            isUsed &&
                            !isCurrentEditing;

                          return (
                            <option
                              key={`${subcategory.category_id}-${subcategory.id}`}
                              value={
                                subcategory.id
                              }
                              disabled={disabled}
                            >
                              {subcategory.name}
                              {disabled
                                ? " — Class already created"
                                : ""}
                            </option>
                          );
                        }
                      )}
                    </select>

                    <p className="text-xs text-purple-300/50 mt-1.5">
                      Only one class per
                      subcategory.
                    </p>
                  </div>

                </div>

                {/* PRICE / DURATION */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  <div>
                    <label className={labelClass}>
                      Price
                    </label>

                    <input
                      name="price"
                      type="number"
                      min="0"
                      value={formData.price}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Duration (Minutes)
                    </label>

                    <input
                      name="duration"
                      type="number"
                      min="1"
                      value={formData.duration}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="60"
                    />
                  </div>

                </div>

                {/* START DATE */}

                <div>
                  <label className={labelClass}>
                    <span className="flex items-center gap-2">
                      <Calendar size={15} />
                      Course Start Date
                    </span>
                  </label>

                  <input
                    name="course_start_date"
                    type="date"
                    value={
                      formData.course_start_date
                    }
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                {/* START TIME */}

                <TimeSelector
                  label="Start Time"
                  field="start_time"
                  icon={<Clock size={15} />}
                />

                {/* AVAILABLE DAYS */}

                <div>
                  <label className={labelClass}>
                    Available Days
                  </label>

                  <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">

                    {DAYS_LIST.map((day) => {
                      const isChecked =
                        formData.available_days.includes(
                          day.value
                        );

                      return (
                        <label
                          key={day.value}
                          className={`
                            min-h-[48px]
                            flex items-center justify-center gap-2
                            rounded-xl cursor-pointer
                            text-xs font-semibold
                            border transition
                            ${
                              isChecked
                                ? "bg-purple-500/20 border-purple-500/60 text-purple-300"
                                : "bg-[#2b2638] border-white/5 text-white/70 hover:border-purple-500/30"
                            }
                          `}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() =>
                              toggleDay(
                                day.value
                              )
                            }
                            className="sr-only"
                          />

                          <span
                            className={`
                              w-4 h-4 rounded-md border
                              flex items-center justify-center
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

                          {day.label.slice(0, 3)}
                        </label>
                      );
                    })}

                  </div>
                </div>

                {/* STUDENTS */}

                <div>
                  <label className={labelClass}>
                    Students Count
                  </label>

                  <input
                    name="students_count"
                    type="number"
                    min="0"
                    value={
                      formData.students_count
                    }
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="0"
                  />
                </div>

                {/* LEVEL / MODE */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  <div>
                    <label className={labelClass}>
                      Level
                    </label>

                    <select
                      name="level"
                      value={formData.level}
                      onChange={handleChange}
                      className={selectClass}
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
                    <label className={labelClass}>
                      Mode
                    </label>

                    <select
                      name="mode"
                      value={formData.mode}
                      onChange={handleChange}
                      className={selectClass}
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

                <div className="sticky bottom-0 bg-[#211c30] pt-5 pb-1 border-t border-white/10 flex flex-col-reverse sm:flex-row justify-end gap-3">

                  <button
                    type="button"
                    onClick={closeModal}
                    disabled={saving}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl border border-gray-600 text-gray-300 hover:bg-[#2b2638] transition disabled:opacity-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={
                      saving ||
                      dropdownLoading ||
                      categories.length === 0
                    }
                    className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving
                      ? "Saving..."
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

      {/* =================================================
          DELETE MODAL
      ================================================= */}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex justify-center items-center z-50 p-4">

          <div className="w-full max-w-[400px] bg-[#1e1b2e] border border-[#2e2a42] rounded-2xl shadow-2xl overflow-hidden">

            <div className="p-8 flex flex-col items-center">

              <div className="w-14 h-14 rounded-full bg-red-500/15 flex items-center justify-center mb-5">
                <FaTrash className="text-red-400 text-lg" />
              </div>

              <h2 className="text-xl font-bold text-white mb-3 text-center">
                Delete Class
              </h2>

              <p className="text-white/60 text-center text-sm leading-relaxed mb-8">
                Are you sure you want to
                delete this class?
              </p>

              <div className="flex gap-3 w-full">

                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setDeletingClass(null);
                  }}
                  className="flex-1 px-5 py-3 rounded-xl border border-[#3a3650] text-gray-300 hover:bg-[#2a2640] transition font-medium"
                >
                  Cancel
                </button>

                <button
                  onClick={confirmDelete}
                  className="flex-1 px-5 py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold hover:opacity-90 transition"
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