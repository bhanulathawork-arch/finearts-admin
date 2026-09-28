
// import React, { useEffect, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";

// import toast from "react-hot-toast";

// import {
//   BookOpen,
//   Edit,
//   Trash2,
//   Search,
//   X,
//   Clock,
//   Image as ImageIcon,
// } from "lucide-react";

// import { FaTrash } from "react-icons/fa";

// import API from "../services/api";

// /* =========================================================
//    HELPERS
// ========================================================= */

// const DAYS = [
//   { label: "Monday", value: "MONDAY" },
//   { label: "Tuesday", value: "TUESDAY" },
//   { label: "Wednesday", value: "WEDNESDAY" },
//   { label: "Thursday", value: "THURSDAY" },
//   { label: "Friday", value: "FRIDAY" },
//   { label: "Saturday", value: "SATURDAY" },
//   { label: "Sunday", value: "SUNDAY" },
// ];

// const DEFAULT_FORM = {
//   title: "",
//   description: "",
//   highlights: "",
//   image: null,
//   category_id: "",
//   subcategory_id: "",
//   trainer_id: "",
//   price: "",
//   duration: "60",
//   level: "BEGINNER",
//   mode: "ONLINE",
//   students_count: "",
//   course_start_date: "",
//   course_end_date: "",
//   start_time: "",
//   available_days: [],
// };

// const getArray = (response) => {
//   if (Array.isArray(response)) return response;
//   if (Array.isArray(response?.data)) return response.data;
//   if (Array.isArray(response?.data?.data)) return response.data.data;
//   return [];
// };

// const getData = (response) => response?.data?.data ?? response?.data ?? null;

// const getToken = () => {
//   return (
//     localStorage.getItem("token") ||
//     localStorage.getItem("firebaseToken") ||
//     localStorage.getItem("accessToken") ||
//     ""
//   );
// };

// const getAuthConfig = () => {
//   const token = getToken();

//   return token
//     ? {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     : {};
// };

// const hasToken = () => Boolean(getToken());

// const formatDate = (value) => {
//   if (!value) return "-";

//   const date = new Date(value);
//   if (Number.isNaN(date.getTime())) return String(value);

//   return date.toLocaleDateString("en-IN", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });
// };

// const formatTime = (value) => {
//   if (!value) return "-";

//   const text = String(value);

//   if (/am|pm/i.test(text)) return text;

//   const [hourText, minuteText = "00"] = text.split(":");
//   const hour = Number(hourText);
//   const minute = Number(minuteText);

//   if (Number.isNaN(hour)) return text;

//   const period = hour >= 12 ? "PM" : "AM";
//   const hour12 = hour % 12 || 12;

//   return `${hour12}:${String(minute).padStart(2, "0")} ${period}`;
// };

// const parseDays = (value) => {
//   if (Array.isArray(value)) return value;

//   if (!value) return [];

//   try {
//     const parsed = JSON.parse(value);
//     return Array.isArray(parsed) ? parsed : [];
//   } catch {
//     return String(value)
//       .split(",")
//       .map((item) => item.trim().toUpperCase())
//       .filter(Boolean);
//   }
// };

// const formatDays = (value) => {
//   const days = parseDays(value);

//   if (!days.length) return "-";

//   const shortNames = {
//     MONDAY: "Mon",
//     TUESDAY: "Tue",
//     WEDNESDAY: "Wed",
//     THURSDAY: "Thu",
//     FRIDAY: "Fri",
//     SATURDAY: "Sat",
//     SUNDAY: "Sun",
//   };

//   return days.map((day) => shortNames[day] || day).join(", ");
// };

// const truncate = (value, length = 35) => {
//   if (!value) return "-";

//   const text = String(value);
//   return text.length > length ? `${text.slice(0, length)}...` : text;
// };

// /*
//   IMPORTANT:
//   No Render URL is used here.

//   If backend returns:
//     /uploads/classes/image.jpg
//   the browser will request it from the same origin as the frontend.

//   If backend returns:
//     http://localhost:5000/uploads/classes/image.jpg
//   it is used directly.

//   If API.defaults.baseURL is localhost, relative paths are resolved
//   against that API base URL.
// */
// const getImageUrl = (value) => {
//   if (!value) return "";

//   if (typeof value === "object") {
//     value =
//       value.url ||
//       value.image_url ||
//       value.imageUrl ||
//       value.path ||
//       value.src ||
//       "";
//   }

//   if (!value) return "";

//   const text = String(value);

//   if (/^https?:\/\//i.test(text)) {
//     return text;
//   }

//   const baseUrl = String(API?.defaults?.baseURL || "").replace(/\/+$/, "");

//   if (text.startsWith("/")) {
//     return baseUrl ? `${baseUrl}${text}` : text;
//   }

//   return baseUrl ? `${baseUrl}/${text}` : text;
// };

// const getCategoryIdsFromProfile = (profile) => {
//   if (!profile) return [];

//   const sources = [
//     profile.categories,
//     profile.category_ids,
//     profile.categoryIds,
//     profile.institute_categories,
//     profile.instituteCategories,
//     profile.selectedCategories,
//     profile.selected_categories,
//   ];

//   let source = sources.find(
//     (item) => Array.isArray(item) && item.length > 0
//   );

//   if (!source && profile.category_id != null) {
//     source = [profile.category_id];
//   }

//   if (!Array.isArray(source)) return [];

//   return [
//     ...new Set(
//       source
//         .map((item) => {
//           if (typeof item === "number" || typeof item === "string") {
//             const id = Number(item);
//             return Number.isNaN(id) ? null : id;
//           }

//           if (!item || typeof item !== "object") return null;

//           const id = Number(
//             item.category_id ??
//               item.categoryId ??
//               item.id ??
//               item.category?.id
//           );

//           return Number.isNaN(id) ? null : id;
//         })
//         .filter((id) => id !== null)
//     ),
//   ];
// };

// const getTrainerId = (trainer) =>
//   trainer?.id ??
//   trainer?.trainer_id ??
//   trainer?.trainerId ??
//   trainer?.account_id ??
//   "";

// const getTrainerName = (trainer) =>
//   trainer?.full_name ||
//   trainer?.name ||
//   trainer?.trainer_name ||
//   trainer?.email ||
//   `Trainer ${getTrainerId(trainer)}`;

// const getCategoryId = (category) =>
//   category?.id ?? category?.category_id ?? category?.categoryId ?? "";

// const getSubcategoryCategoryId = (subcategory) =>
//   subcategory?.category_id ??
//   subcategory?.categoryId ??
//   subcategory?.category?.id ??
//   "";

// const getClassCategoryId = (item) =>
//   item?.category_id ?? item?.categoryId ?? item?.category?.id ?? "";

// const getClassSubcategoryId = (item) =>
//   item?.subcategory_id ??
//   item?.subcategoryId ??
//   item?.subcategory?.id ??
//   "";

// const getClassTrainerId = (item) =>
//   item?.trainer_id ??
//   item?.trainerId ??
//   item?.trainer?.id ??
//   "";

// const getDefaultForm = (categories = []) => ({
//   ...DEFAULT_FORM,
//   category_id:
//     categories.length === 1 ? String(getCategoryId(categories[0])) : "",
// });

// /* =========================================================
//    COMPONENT
// ========================================================= */

// export default function InstituteClasses() {
//   const navigate = useNavigate();

//   /* ------------------------- STATE ------------------------- */

//   const [classes, setClasses] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);
//   const [trainers, setTrainers] = useState([]);
//   const [instituteProfile, setInstituteProfile] = useState(null);

//   const [searchQuery, setSearchQuery] = useState("");

//   const [loading, setLoading] = useState(true);
//   const [dropdownLoading, setDropdownLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [deleting, setDeleting] = useState(false);

//   const [showModal, setShowModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);

//   const [editingClass, setEditingClass] = useState(null);
//   const [deletingClass, setDeletingClass] = useState(null);

//   const [formData, setFormData] = useState(getDefaultForm());

//   /* =========================================================
//      AUTH
//   ========================================================= */

//   const requireToken = () => {
//     if (!hasToken()) {
//       toast.error("Institute session expired. Please login again.");
//       return false;
//     }

//     return true;
//   };

//   /* =========================================================
//      FETCH CLASSES
//   ========================================================= */

//   const fetchClasses = async () => {
//     if (!hasToken()) {
//       setLoading(false);
//       console.error("Institute Firebase token not found.");
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await API.get(
//         "/classes/institute/my-classes",
//         getAuthConfig()
//       );

//       console.log("Institute Classes API Response:", response.data);

//       const data = getArray(response);
//       setClasses(data);
//     } catch (error) {
//       console.error("Fetch Institute Classes Error:", error);
//       console.error("Backend Response:", error?.response?.data);

//       toast.error(
//         error?.response?.data?.message || "Failed to fetch institute classes"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* =========================================================
//      FETCH INSTITUTE PROFILE
//   ========================================================= */

//   const fetchInstituteProfile = async () => {
//     if (!requireToken()) return null;

//     const response = await API.get(
//       "/institutes/profile",
//       getAuthConfig()
//     );

//     console.log("Institute Profile API Response:", response.data);

//     const profile = getData(response);
//     setInstituteProfile(profile);

//     return profile;
//   };

//   /* =========================================================
//      FETCH CATEGORIES
//   ========================================================= */

//   const fetchCategories = async (profile) => {
//     try {
//       const response = await API.get("/categories");
//       const allCategories = getArray(response);

//       const allowedIds = getCategoryIdsFromProfile(profile);

//       let allowedCategories = allCategories;

//       if (allowedIds.length > 0) {
//         allowedCategories = allCategories.filter((category) =>
//           allowedIds.includes(Number(getCategoryId(category)))
//         );
//       } else if (Array.isArray(profile?.categories)) {
//         allowedCategories = profile.categories
//           .map((item) => ({
//             id: item?.id ?? item?.category_id ?? item?.categoryId,
//             name:
//               item?.name ??
//               item?.category_name ??
//               item?.categoryName ??
//               "",
//           }))
//           .filter((item) => item.id && item.name);
//       }

//       setCategories(allowedCategories);

//       return allowedCategories;
//     } catch (error) {
//       console.error("Fetch Categories Error:", error);
//       throw error;
//     }
//   };

//   /* =========================================================
//      FETCH SUBCATEGORIES
//   ========================================================= */

//   const fetchSubcategories = async () => {
//     try {
//       const response = await API.get("/subcategories");

//       console.log("Subcategories API Response:", response.data);

//       const data = getArray(response);
//       setSubcategories(data);

//       return data;
//     } catch (error) {
//       console.error("Fetch Subcategories Error:", error);
//       throw error;
//     }
//   };

//   /* =========================================================
//      FETCH INSTITUTE TRAINERS
//   ========================================================= */

//   const fetchTrainers = async () => {
//     if (!requireToken()) return [];

//     try {
//       const response = await API.get(
//         "/trainers/institute",
//         getAuthConfig()
//       );

//       console.log("Institute Trainers API Response:", response.data);

//       const data = getArray(response);
//       setTrainers(data);

//       return data;
//     } catch (error) {
//       console.error("Fetch Institute Trainers Error:", error);
//       throw error;
//     }
//   };

//   /* =========================================================
//      FETCH DROPDOWNS
//   ========================================================= */

//   const fetchDropdowns = async () => {
//     if (!hasToken()) {
//       setDropdownLoading(false);
//       return;
//     }

//     try {
//       setDropdownLoading(true);

//       const profile = await fetchInstituteProfile();

//       await Promise.all([
//         fetchCategories(profile),
//         fetchSubcategories(),
//         fetchTrainers(),
//       ]);
//     } catch (error) {
//       console.error("Fetch Institute Dropdowns Error:", error);
//       console.error("Backend Response:", error?.response?.data);

//       toast.error(
//         error?.response?.data?.message ||
//           error?.message ||
//           "Failed to load class form data"
//       );
//     } finally {
//       setDropdownLoading(false);
//     }
//   };

//   /* =========================================================
//      INITIAL LOAD
//   ========================================================= */

//   useEffect(() => {
//     fetchClasses();
//     fetchDropdowns();
//   }, []);

//   /* =========================================================
//      FILTERS
//   ========================================================= */

//   const filteredClasses = useMemo(() => {
//     const query = searchQuery.trim().toLowerCase();

//     if (!query) return classes;

//     return classes.filter((item) => {
//       const values = [
//         item?.title,
//         item?.description,
//         item?.highlights,
//         item?.trainer_name,
//         item?.category_name,
//         item?.subcategory_name,
//         item?.level,
//         item?.mode,
//         item?.id,
//         item?.price,
//         item?.duration,
//       ];

//       return values.some((value) =>
//         String(value ?? "")
//           .toLowerCase()
//           .includes(query)
//       );
//     });
//   }, [classes, searchQuery]);

//   const relatedSubcategories = useMemo(() => {
//     if (!formData.category_id) return [];

//     return subcategories.filter(
//       (subcategory) =>
//         String(getSubcategoryCategoryId(subcategory)) ===
//         String(formData.category_id)
//     );
//   }, [subcategories, formData.category_id]);

//   /* =========================================================
//      FORM
//   ========================================================= */

//   const updateForm = (field, value) => {
//     setFormData((previous) => ({
//       ...previous,
//       [field]: value,
//     }));
//   };

//   const handleCategoryChange = (event) => {
//     updateForm("category_id", event.target.value);
//     updateForm("subcategory_id", "");
//   };

//   const toggleDay = (day) => {
//     setFormData((previous) => {
//       const exists = previous.available_days.includes(day);

//       return {
//         ...previous,
//         available_days: exists
//           ? previous.available_days.filter((item) => item !== day)
//           : [...previous.available_days, day],
//       };
//     });
//   };

//   /* =========================================================
//      ADD
//   ========================================================= */

//   const openAddModal = () => {
//     setEditingClass(null);
//     setFormData(getDefaultForm(categories));
//     setShowModal(true);
//   };

//   /* =========================================================
//      EDIT
//   ========================================================= */

//   const openEditModal = (item) => {
//     const availableDays = parseDays(item?.available_days);

//     setEditingClass(item);

//     setFormData({
//       title: item?.title || "",
//       description: item?.description || "",
//       highlights: item?.highlights || "",
//       image: null,

//       category_id: getClassCategoryId(item)
//         ? String(getClassCategoryId(item))
//         : "",

//       subcategory_id: getClassSubcategoryId(item)
//         ? String(getClassSubcategoryId(item))
//         : "",

//       trainer_id: getClassTrainerId(item)
//         ? String(getClassTrainerId(item))
//         : "",

//       price: item?.price ?? "",
//       duration: item?.duration ?? "60",

//       level: item?.level || "BEGINNER",
//       mode: item?.mode || "ONLINE",

//       students_count: item?.students_count ?? "",

//       course_start_date:
//         item?.start_date || item?.course_start_date || "",

//       course_end_date:
//         item?.end_date || item?.course_end_date || "",

//       start_time:
//         item?.start_time ||
//         item?.default_start_time ||
//         "",

//       available_days: availableDays,
//     });

//     setShowModal(true);
//   };

//   const closeModal = () => {
//     if (saving) return;

//     setShowModal(false);
//     setEditingClass(null);
//     setFormData(getDefaultForm(categories));
//   };

//   /* =========================================================
//      DELETE
//   ========================================================= */

//   const openDeleteModal = (item) => {
//     setDeletingClass(item);
//     setShowDeleteModal(true);
//   };

//   const closeDeleteModal = () => {
//     if (deleting) return;

//     setShowDeleteModal(false);
//     setDeletingClass(null);
//   };

//   const confirmDelete = async () => {
//     if (!deletingClass?.id) return;
//     if (!requireToken()) return;

//     try {
//       setDeleting(true);

//       await API.delete(
//         `/classes/institute/${deletingClass.id}`,
//         getAuthConfig()
//       );

//       toast.success("Class deleted successfully");

//       closeDeleteModal();
//       await fetchClasses();
//     } catch (error) {
//       console.error("Delete Institute Class Error:", error);
//       console.error("Backend Response:", error?.response?.data);

//       toast.error(
//         error?.response?.data?.message || "Failed to delete class"
//       );
//     } finally {
//       setDeleting(false);
//     }
//   };

//   /* =========================================================
//      SUBMIT
//   ========================================================= */

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (saving) return;

//     if (!requireToken()) return;

//     if (!formData.title.trim()) {
//       toast.error("Class Name is required");
//       return;
//     }

//     if (!formData.category_id) {
//       toast.error("Please select a Category");
//       return;
//     }

//     const categoryExists = categories.some(
//       (category) =>
//         String(getCategoryId(category)) === String(formData.category_id)
//     );

//     if (!categoryExists) {
//       toast.error("Selected category is not available for this institute");
//       return;
//     }

//     if (!formData.trainer_id) {
//       toast.error("Please select a Trainer");
//       return;
//     }

//     if (formData.subcategory_id) {
//       const validSubcategory = relatedSubcategories.some(
//         (subcategory) =>
//           String(subcategory.id) === String(formData.subcategory_id)
//       );

//       if (!validSubcategory) {
//         toast.error(
//           "Selected subcategory does not belong to the selected category"
//         );
//         return;
//       }
//     }

//     if (
//       formData.course_start_date &&
//       formData.course_end_date &&
//       formData.course_end_date < formData.course_start_date
//     ) {
//       toast.error("End date cannot be before start date");
//       return;
//     }

//     const payload = new FormData();

//     payload.append("title", formData.title.trim());
//     payload.append("description", formData.description.trim());
//     payload.append("highlights", formData.highlights.trim());

//     payload.append("category_id", formData.category_id);

//     if (formData.subcategory_id) {
//       payload.append("subcategory_id", formData.subcategory_id);
//     }

//     payload.append("trainer_id", formData.trainer_id);
//     payload.append("price", formData.price || "0");
//     payload.append("duration", formData.duration || "60");
//     payload.append("level", formData.level || "BEGINNER");
//     payload.append("mode", formData.mode || "ONLINE");
//     payload.append("students_count", formData.students_count || "0");

//     if (formData.image) {
//       payload.append("image", formData.image);
//     }

//     if (formData.course_start_date) {
//       payload.append("start_date", formData.course_start_date);
//     }

//     if (formData.course_end_date) {
//       payload.append("end_date", formData.course_end_date);
//     }

//     if (formData.start_time) {
//       payload.append("start_time", formData.start_time);
//     }

//     formData.available_days.forEach((day) => {
//       payload.append("available_days[]", day);
//     });

//     try {
//       setSaving(true);

//       console.log(
//         "Saving Institute Class:",
//         Object.fromEntries(payload.entries())
//       );

//       if (editingClass?.id) {
//         await API.put(
//           `/classes/institute/${editingClass.id}`,
//           payload,
//           {
//             headers: {
//               ...getAuthConfig().headers,
//               // Let Axios/browser set the multipart boundary.
//             },
//           }
//         );

//         toast.success("Class updated successfully");
//       } else {
//         await API.post(
//           "/classes/institute/create",
//           payload,
//           {
//             headers: {
//               ...getAuthConfig().headers,
//               // Do not manually set Content-Type for FormData.
//             },
//           }
//         );

//         toast.success("Class created successfully");
//       }

//       closeModal();
//       await fetchClasses();
//     } catch (error) {
//       console.error("Save Institute Class Error:", error);
//       console.error("Backend Response:", error?.response?.data);

//       toast.error(
//         error?.response?.data?.message ||
//           error?.message ||
//           "Failed to save class"
//       );
//     } finally {
//       setSaving(false);
//     }
//   };

//   /* =========================================================
//      UI HELPERS
//   ========================================================= */

//   const modeClass = (mode) => {
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

//   const inputClass =
//     "w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/60 transition-colors";

//   const selectClass =
//     "w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/60 disabled:opacity-50";

//   const labelClass = "block text-sm text-white mb-1";

//   /* =========================================================
//      RENDER
//   ========================================================= */

//   return (
//     <div className="p-8 text-white min-h-full">
//       {/* HEADER */}
//       <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-7">
//         <div>
//           <h1 className="text-4xl font-bold text-purple-400">
//             Institute Classes
//           </h1>

//           <p className="text-gray-400 mt-2">
//             Manage classes, trainers and LMS access for your institute.
//           </p>
//         </div>

//         <div className="flex gap-3">
//           <button
//             type="button"
//             onClick={fetchClasses}
//             className="px-5 py-3 rounded-xl bg-[#1b1b22] border border-[#30303a] hover:bg-[#24242c] transition-colors"
//           >
//             Refresh
//           </button>

//           <button
//             type="button"
//             onClick={openAddModal}
//             className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition-opacity"
//           >
//             + Add Class
//           </button>
//         </div>
//       </div>

//       {/* SEARCH */}
//       <div className="mb-6 relative">
//         <Search
//           size={18}
//           className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
//         />

//         <input
//           type="text"
//           value={searchQuery}
//           onChange={(event) => setSearchQuery(event.target.value)}
//           placeholder="Search by class, trainer, category, level or mode..."
//           className="w-full pl-12 pr-12 py-3.5 rounded-xl bg-[#151519] border border-[#2c2c35] text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/60"
//         />

//         {searchQuery && (
//           <button
//             type="button"
//             onClick={() => setSearchQuery("")}
//             className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
//           >
//             <X size={16} />
//           </button>
//         )}
//       </div>

//       {/* TABLE */}
//       <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full min-w-[1700px]">
//             <thead className="bg-[#202027]">
//               <tr>
//                 {[
//                   "ID",
//                   "Image",
//                   "Class Name",
//                   "Description",
//                   "Trainer",
//                   "Category",
//                   "Subcategory",
//                   "Level",
//                   "Mode",
//                   "Price",
//                   "Duration",
//                   "Students",
//                   "Start Date",
//                   "End Date",
//                   "Start Time",
//                   "Available Days",
//                   "Actions",
//                 ].map((heading) => (
//                   <th
//                     key={heading}
//                     className="p-4 text-left whitespace-nowrap text-sm"
//                   >
//                     {heading}
//                   </th>
//                 ))}
//               </tr>
//             </thead>

//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan={17} className="p-16 text-center text-gray-400">
//                     Loading classes...
//                   </td>
//                 </tr>
//               ) : filteredClasses.length === 0 ? (
//                 <tr>
//                   <td colSpan={17} className="p-16 text-center">
//                     <Search
//                       size={40}
//                       className="mx-auto text-gray-700 mb-3"
//                     />

//                     <p className="text-gray-400 text-lg">
//                       {searchQuery
//                         ? "No classes found matching your search"
//                         : "No classes available"}
//                     </p>
//                   </td>
//                 </tr>
//               ) : (
//                 filteredClasses.map((item) => (
//                   <tr
//                     key={item.id}
//                     className="border-t border-[#2c2c35] hover:bg-[#1b1b21] transition-colors"
//                   >
//                     <td className="p-4 whitespace-nowrap">{item.id}</td>

//                     <td className="p-4">
//                       {item.image ? (
//                         <img
//                           src={getImageUrl(item.image)}
//                           alt={item.title || "Class"}
//                           className="w-12 h-12 rounded-xl object-cover border border-[#333]"
//                           onError={(event) => {
//                             event.currentTarget.style.display = "none";
//                           }}
//                         />
//                       ) : (
//                         <div className="w-12 h-12 rounded-xl bg-[#26262b] flex items-center justify-center">
//                           <ImageIcon size={18} className="text-gray-600" />
//                         </div>
//                       )}
//                     </td>

//                     <td className="p-4 font-semibold whitespace-nowrap">
//                       {item.title || "-"}
//                     </td>

//                     <td
//                       className="p-4 text-gray-300 max-w-[180px]"
//                       title={item.description || ""}
//                     >
//                       {truncate(item.description, 35)}
//                     </td>

//                     <td className="p-4 whitespace-nowrap">
//                       {item.trainer_name || "-"}
//                     </td>

//                     <td className="p-4 whitespace-nowrap">
//                       {item.category_name || "-"}
//                     </td>

//                     <td className="p-4 whitespace-nowrap">
//                       {item.subcategory_name || "-"}
//                     </td>

//                     <td className="p-4 whitespace-nowrap">
//                       <span className="px-2.5 py-1 rounded-full text-xs bg-purple-500/20 text-purple-300">
//                         {item.level || "-"}
//                       </span>
//                     </td>

//                     <td className="p-4 whitespace-nowrap">
//                       <span
//                         className={`px-2.5 py-1 rounded-full text-xs ${modeClass(
//                           item.mode
//                         )}`}
//                       >
//                         {item.mode || "-"}
//                       </span>
//                     </td>

//                     <td className="p-4 font-semibold whitespace-nowrap">
//                       ₹{item.price ?? 0}
//                     </td>

//                     <td className="p-4 whitespace-nowrap">
//                       {item.duration ? `${item.duration} min` : "-"}
//                     </td>

//                     <td className="p-4 font-semibold whitespace-nowrap">
//                       {item.students_count ?? 0}
//                     </td>

//                     <td className="p-4 whitespace-nowrap">
//                       {formatDate(item.start_date)}
//                     </td>

//                     <td className="p-4 whitespace-nowrap">
//                       {formatDate(item.end_date)}
//                     </td>

//                     <td className="p-4 whitespace-nowrap">
//                       <span className="inline-flex items-center gap-1">
//                         <Clock size={14} className="text-gray-500" />
//                         {formatTime(item.start_time)}
//                       </span>
//                     </td>

//                     <td
//                       className="p-4 whitespace-nowrap"
//                       title={formatDays(item.available_days)}
//                     >
//                       {formatDays(item.available_days)}
//                     </td>

//                     <td className="p-4">
//                       <div className="flex items-center gap-2">
//                         {/* LMS */}
//                         <button
//                           type="button"
//                           onClick={() =>
//                             navigate(`/institute/lms/${item.id}`)
//                           }
//                           className="p-2 rounded-lg hover:bg-purple-500/10 transition-colors"
//                           title="Manage LMS"
//                         >
//                           <BookOpen
//                             size={17}
//                             className="text-purple-300"
//                           />
//                         </button>

//                         {/* EDIT */}
//                         <button
//                           type="button"
//                           onClick={() => openEditModal(item)}
//                           className="p-2 rounded-lg hover:bg-white/5 transition-colors"
//                           title="Edit"
//                         >
//                           <Edit size={17} className="text-white" />
//                         </button>

//                         {/* DELETE */}
//                         <button
//                           type="button"
//                           onClick={() => openDeleteModal(item)}
//                           className="p-2 rounded-lg hover:bg-red-500/10 transition-colors"
//                           title="Delete"
//                         >
//                           <Trash2
//                             size={17}
//                             className="text-red-400"
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

//       {/* =====================================================
//           ADD / EDIT MODAL
//       ===================================================== */}

//       {showModal && (
//         <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
//           <div className="w-full max-w-[720px] max-h-[92vh] bg-[#211c30] rounded-2xl shadow-2xl overflow-hidden">
//             <div className="flex items-center justify-between p-6 border-b border-[#3a3448]">
//               <div>
//                 <h2 className="text-2xl font-bold">
//                   {editingClass ? "Edit Class" : "Add Class"}
//                 </h2>

//                 <p className="text-sm text-gray-400 mt-1">
//                   Assign a trainer to the class for LMS management.
//                 </p>
//               </div>

//               <button
//                 type="button"
//                 onClick={closeModal}
//                 disabled={saving}
//                 className="text-gray-400 hover:text-white disabled:opacity-50"
//               >
//                 <X size={22} />
//               </button>
//             </div>

//             <div className="overflow-y-auto max-h-[78vh] p-6">
//               <form onSubmit={handleSubmit}>
//                 {/* NAME */}
//                 <label className={labelClass}>Class Name *</label>
//                 <input
//                   value={formData.title}
//                   onChange={(event) =>
//                     updateForm("title", event.target.value)
//                   }
//                   className={inputClass}
//                   placeholder="Enter class name"
//                   required
//                 />

//                 {/* DESCRIPTION */}
//                 <label className={labelClass}>Description</label>
//                 <textarea
//                   value={formData.description}
//                   onChange={(event) =>
//                     updateForm("description", event.target.value)
//                   }
//                   className={inputClass}
//                   rows={3}
//                   placeholder="Enter class description"
//                 />

//                 {/* HIGHLIGHTS */}
//                 <label className={labelClass}>Highlights</label>
//                 <textarea
//                   value={formData.highlights}
//                   onChange={(event) =>
//                     updateForm("highlights", event.target.value)
//                   }
//                   className={inputClass}
//                   rows={2}
//                   placeholder="Enter class highlights"
//                 />

//                 {/* IMAGE */}
//                 <label className={labelClass}>Class Image</label>

//                 {editingClass?.image && (
//                   <img
//                     src={getImageUrl(editingClass.image)}
//                     alt="Current class"
//                     className="w-24 h-24 object-cover rounded-xl mb-2 border border-[#333]"
//                     onError={(event) => {
//                       event.currentTarget.style.display = "none";
//                     }}
//                   />
//                 )}

//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={(event) =>
//                     updateForm(
//                       "image",
//                       event.target.files?.[0] || null
//                     )
//                   }
//                   className="w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white file:mr-4 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-purple-500/20 file:text-purple-300"
//                 />

//                 {/* TRAINER */}
//                 <label className={labelClass}>Trainer *</label>
//                 <select
//                   value={formData.trainer_id}
//                   onChange={(event) =>
//                     updateForm("trainer_id", event.target.value)
//                   }
//                   className={selectClass}
//                   required
//                   disabled={dropdownLoading}
//                 >
//                   <option value="">
//                     {dropdownLoading
//                       ? "Loading trainers..."
//                       : trainers.length
//                       ? "Select Trainer"
//                       : "No trainers available"}
//                   </option>

//                   {trainers.map((trainer) => (
//                     <option
//                       key={getTrainerId(trainer)}
//                       value={getTrainerId(trainer)}
//                     >
//                       {getTrainerName(trainer)}
//                     </option>
//                   ))}
//                 </select>

//                 {/* CATEGORY / SUBCATEGORY */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className={labelClass}>
//                       Category *
//                     </label>

//                     <select
//                       value={formData.category_id}
//                       onChange={handleCategoryChange}
//                       className={selectClass}
//                       required
//                       disabled={
//                         dropdownLoading || categories.length === 0
//                       }
//                     >
//                       <option value="">
//                         {dropdownLoading
//                           ? "Loading categories..."
//                           : categories.length
//                           ? "Select Category"
//                           : "No categories available"}
//                       </option>

//                       {categories.map((category) => (
//                         <option
//                           key={getCategoryId(category)}
//                           value={getCategoryId(category)}
//                         >
//                           {category.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div>
//                     <label className={labelClass}>
//                       Subcategory
//                     </label>

//                     <select
//                       value={formData.subcategory_id}
//                       onChange={(event) =>
//                         updateForm(
//                           "subcategory_id",
//                           event.target.value
//                         )
//                       }
//                       className={selectClass}
//                       disabled={
//                         !formData.category_id ||
//                         relatedSubcategories.length === 0
//                       }
//                     >
//                       <option value="">
//                         {!formData.category_id
//                           ? "Select Category First"
//                           : relatedSubcategories.length
//                           ? "Select Subcategory"
//                           : "No Subcategories"}
//                       </option>

//                       {relatedSubcategories.map((subcategory) => (
//                         <option
//                           key={subcategory.id}
//                           value={subcategory.id}
//                         >
//                           {subcategory.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>

//                 {/* PRICE / DURATION */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className={labelClass}>Price</label>

//                     <input
//                       type="number"
//                       min="0"
//                       value={formData.price}
//                       onChange={(event) =>
//                         updateForm("price", event.target.value)
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
//                       type="number"
//                       min="1"
//                       value={formData.duration}
//                       onChange={(event) =>
//                         updateForm("duration", event.target.value)
//                       }
//                       className={inputClass}
//                       placeholder="60"
//                     />
//                   </div>
//                 </div>

//                 {/* DATES */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className={labelClass}>
//                       Course Start Date
//                     </label>

//                     <input
//                       type="date"
//                       value={formData.course_start_date}
//                       onChange={(event) =>
//                         updateForm(
//                           "course_start_date",
//                           event.target.value
//                         )
//                       }
//                       className={inputClass}
//                     />
//                   </div>

//                   <div>
//                     <label className={labelClass}>
//                       Course End Date
//                     </label>

//                     <input
//                       type="date"
//                       value={formData.course_end_date}
//                       onChange={(event) =>
//                         updateForm(
//                           "course_end_date",
//                           event.target.value
//                         )
//                       }
//                       className={inputClass}
//                     />
//                   </div>
//                 </div>

//                 {/* START TIME */}
//                 <label className={labelClass}>Start Time</label>

//                 <input
//                   type="time"
//                   value={formData.start_time}
//                   onChange={(event) =>
//                     updateForm("start_time", event.target.value)
//                   }
//                   className={inputClass}
//                 />

//                 {/* AVAILABLE DAYS */}
//                 <label className={labelClass}>
//                   Available Days
//                 </label>

//                 <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 mt-2 mb-4">
//                   {DAYS.map((day) => {
//                     const checked =
//                       formData.available_days.includes(day.value);

//                     return (
//                       <label
//                         key={day.value}
//                         className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border cursor-pointer text-xs transition-colors ${
//                           checked
//                             ? "bg-purple-500/20 border-purple-500/50 text-purple-300"
//                             : "bg-[#2b2638] border-transparent text-gray-300 hover:border-purple-500/30"
//                         }`}
//                       >
//                         <input
//                           type="checkbox"
//                           className="sr-only"
//                           checked={checked}
//                           onChange={() => toggleDay(day.value)}
//                         />

//                         <span
//                           className={`w-4 h-4 rounded border flex items-center justify-center ${
//                             checked
//                               ? "bg-purple-500 border-purple-500"
//                               : "border-gray-500"
//                           }`}
//                         >
//                           {checked && (
//                             <span className="text-white text-[10px]">
//                               ✓
//                             </span>
//                           )}
//                         </span>

//                         {day.label.slice(0, 3)}
//                       </label>
//                     );
//                   })}
//                 </div>

//                 {/* STUDENTS */}
//                 <label className={labelClass}>
//                   Students Count
//                 </label>

//                 <input
//                   type="number"
//                   min="0"
//                   value={formData.students_count}
//                   onChange={(event) =>
//                     updateForm(
//                       "students_count",
//                       event.target.value
//                     )
//                   }
//                   className={inputClass}
//                   placeholder="0"
//                 />

//                 {/* LEVEL / MODE */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className={labelClass}>Level</label>

//                     <select
//                       value={formData.level}
//                       onChange={(event) =>
//                         updateForm("level", event.target.value)
//                       }
//                       className={selectClass}
//                     >
//                       <option value="BEGINNER">Beginner</option>
//                       <option value="INTERMEDIATE">
//                         Intermediate
//                       </option>
//                       <option value="ADVANCED">Advanced</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label className={labelClass}>Mode</label>

//                     <select
//                       value={formData.mode}
//                       onChange={(event) =>
//                         updateForm("mode", event.target.value)
//                       }
//                       className={selectClass}
//                     >
//                       <option value="ONLINE">Online</option>
//                       <option value="OFFLINE">Offline</option>
//                       <option value="HYBRID">Hybrid</option>
//                     </select>
//                   </div>
//                 </div>

//                 {/* BUTTONS */}
//                 <div className="flex justify-end gap-3 pt-5 mt-2 border-t border-[#3a3448]">
//                   <button
//                     type="button"
//                     onClick={closeModal}
//                     disabled={saving}
//                     className="px-5 py-3 rounded-xl border border-gray-600 text-gray-300 hover:bg-[#2b2638] disabled:opacity-50"
//                   >
//                     Cancel
//                   </button>

//                   <button
//                     type="submit"
//                     disabled={saving || dropdownLoading}
//                     className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold disabled:opacity-50"
//                   >
//                     {saving
//                       ? "Saving..."
//                       : editingClass
//                       ? "Update Class"
//                       : "Add Class"}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* =====================================================
//           DELETE MODAL
//       ===================================================== */}

//       {showDeleteModal && (
//         <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
//           <div className="w-full max-w-[420px] bg-[#1e1b2e] border border-[#2e2a42] rounded-2xl shadow-2xl">
//             <div className="p-8 text-center">
//               <div className="w-14 h-14 mx-auto rounded-full bg-red-500/15 flex items-center justify-center mb-5">
//                 <FaTrash className="text-red-400 text-lg" />
//               </div>

//               <h2 className="text-xl font-bold mb-3">
//                 Delete Class
//               </h2>

//               <p className="text-gray-400 text-sm leading-relaxed mb-7">
//                 Are you sure you want to delete{" "}
//                 <span className="text-white font-semibold">
//                   {deletingClass?.title || "this class"}
//                 </span>
//                 ?
//               </p>

//               <div className="flex gap-3">
//                 <button
//                   type="button"
//                   onClick={closeDeleteModal}
//                   disabled={deleting}
//                   className="flex-1 px-5 py-3 rounded-xl border border-[#3a3650] text-gray-300 hover:bg-[#2a2640] disabled:opacity-50"
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   type="button"
//                   onClick={confirmDelete}
//                   disabled={deleting}
//                   className="flex-1 px-5 py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 font-bold disabled:opacity-50"
//                 >
//                   {deleting ? "Deleting..." : "Delete"}
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
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  BookOpen,
  Edit,
  Trash2,
  Search,
  X,
  Clock,
  Image as ImageIcon,
} from "lucide-react";

import { FaTrash } from "react-icons/fa";
import API from "../services/api";

/* =========================================================
   CONSTANTS
========================================================= */

const DAYS = [
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

  price: "",
  duration: "60",

  level: "BEGINNER",
  mode: "ONLINE",

  students_count: "",

  course_start_date: "",
  course_end_date: "",

  start_time: "",

  available_days: [],
};

/* =========================================================
   GENERAL HELPERS
========================================================= */

const getArray = (response) => {
  if (Array.isArray(response)) return response;

  if (Array.isArray(response?.data)) {
    return response.data;
  }

  if (Array.isArray(response?.data?.data)) {
    return response.data.data;
  }

  return [];
};

const getData = (response) => {
  return response?.data?.data ?? response?.data ?? null;
};

/* =========================================================
   AUTH
========================================================= */

const getToken = () => {
  return (
    localStorage.getItem("token") ||
    localStorage.getItem("firebaseToken") ||
    localStorage.getItem("accessToken") ||
    ""
  );
};

const getAuthConfig = () => {
  const token = getToken();

  if (!token) {
    return {};
  }

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const hasToken = () => Boolean(getToken());

/* =========================================================
   DATE HELPERS
========================================================= */

/*
  IMPORTANT FIX

  Backend/MySQL may return:

  2026-09-28T00:00:00.000Z

  But <input type="date"> requires:

  2026-09-28
*/

const normalizeDateForInput = (value) => {
  if (!value) return "";

  const text = String(value).trim();

  // Already correct YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(text)) {
    return text;
  }

  // ISO format:
  // 2026-09-28T00:00:00.000Z
  if (/^\d{4}-\d{2}-\d{2}T/.test(text)) {
    return text.substring(0, 10);
  }

  // MySQL datetime:
  // 2026-09-28 00:00:00
  if (/^\d{4}-\d{2}-\d{2}\s/.test(text)) {
    return text.substring(0, 10);
  }

  // Fallback
  const date = new Date(text);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

/* =========================================================
   DISPLAY DATE
========================================================= */

const formatDate = (value) => {
  const normalized = normalizeDateForInput(value);

  if (!normalized) return "-";

  const date = new Date(`${normalized}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

/* =========================================================
   TIME
========================================================= */

const formatTime = (value) => {
  if (!value) return "-";

  const text = String(value);

  if (/am|pm/i.test(text)) {
    return text;
  }

  const [hourText, minuteText = "00"] = text.split(":");

  const hour = Number(hourText);
  const minute = Number(minuteText);

  if (Number.isNaN(hour)) {
    return text;
  }

  const period = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;

  return `${hour12}:${String(minute).padStart(2, "0")} ${period}`;
};

/* =========================================================
   DAYS
========================================================= */

const parseDays = (value) => {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).toUpperCase());
  }

  if (!value) {
    return [];
  }

  try {
    const parsed = JSON.parse(value);

    if (Array.isArray(parsed)) {
      return parsed.map((item) => String(item).toUpperCase());
    }
  } catch {
    // Ignore JSON error and try comma-separated value
  }

  return String(value)
    .split(",")
    .map((item) => item.trim().toUpperCase())
    .filter(Boolean);
};

const formatDays = (value) => {
  const days = parseDays(value);

  if (!days.length) {
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

  return days
    .map((day) => shortNames[day] || day)
    .join(", ");
};

/* =========================================================
   IMAGE
========================================================= */

const getImageUrl = (value) => {
  if (!value) {
    return "";
  }

  if (typeof value === "object") {
    value =
      value.url ||
      value.image_url ||
      value.imageUrl ||
      value.path ||
      value.src ||
      "";
  }

  if (!value) {
    return "";
  }

  const text = String(value);

  if (/^https?:\/\//i.test(text)) {
    return text;
  }

  const baseUrl = String(API?.defaults?.baseURL || "").replace(/\/+$/, "");

  if (text.startsWith("/")) {
    return baseUrl ? `${baseUrl}${text}` : text;
  }

  return baseUrl ? `${baseUrl}/${text}` : text;
};

/* =========================================================
   CATEGORY HELPERS
========================================================= */

const getCategoryId = (category) => {
  return (
    category?.id ??
    category?.category_id ??
    category?.categoryId ??
    ""
  );
};

const getSubcategoryCategoryId = (subcategory) => {
  return (
    subcategory?.category_id ??
    subcategory?.categoryId ??
    subcategory?.category?.id ??
    ""
  );
};

/* =========================================================
   INSTITUTE CATEGORY IDS
========================================================= */

const getCategoryIdsFromProfile = (profile) => {
  if (!profile) {
    return [];
  }

  const sources = [
    profile.categories,
    profile.category_ids,
    profile.categoryIds,
    profile.institute_categories,
    profile.instituteCategories,
    profile.selectedCategories,
    profile.selected_categories,
  ];

  let source = sources.find(
    (item) => Array.isArray(item) && item.length > 0
  );

  if (!source && profile.category_id != null) {
    source = [profile.category_id];
  }

  if (!Array.isArray(source)) {
    return [];
  }

  return [
    ...new Set(
      source
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
        .filter((id) => id !== null)
    ),
  ];
};

/* =========================================================
   TRAINER HELPERS
========================================================= */

const getTrainerId = (trainer) => {
  return (
    trainer?.id ??
    trainer?.trainer_id ??
    trainer?.trainerId ??
    trainer?.account_id ??
    ""
  );
};

const getTrainerName = (trainer) => {
  return (
    trainer?.full_name ||
    trainer?.name ||
    trainer?.trainer_name ||
    trainer?.email ||
    `Trainer ${getTrainerId(trainer)}`
  );
};

/* =========================================================
   CLASS HELPERS
========================================================= */

const getClassCategoryId = (item) => {
  return (
    item?.category_id ??
    item?.categoryId ??
    item?.category?.id ??
    ""
  );
};

const getClassSubcategoryId = (item) => {
  return (
    item?.subcategory_id ??
    item?.subcategoryId ??
    item?.subcategory?.id ??
    ""
  );
};

const getClassTrainerId = (item) => {
  return (
    item?.trainer_id ??
    item?.trainerId ??
    item?.trainer?.id ??
    ""
  );
};

/* =========================================================
   DEFAULT FORM
========================================================= */

const getDefaultForm = (categories = []) => {
  return {
    ...DEFAULT_FORM,

    category_id:
      categories.length === 1
        ? String(getCategoryId(categories[0]))
        : "",
  };
};

/* =========================================================
   TRUNCATE
========================================================= */

const truncate = (value, length = 35) => {
  if (!value) {
    return "-";
  }

  const text = String(value);

  return text.length > length
    ? `${text.slice(0, length)}...`
    : text;
};

/* =========================================================
   COMPONENT
========================================================= */

export default function InstituteClasses() {
  const navigate = useNavigate();

  /* =======================================================
     STATE
  ======================================================= */

  const [classes, setClasses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [trainers, setTrainers] = useState([]);

  const [instituteProfile, setInstituteProfile] =
    useState(null);

  const [searchQuery, setSearchQuery] = useState("");

  const [loading, setLoading] = useState(true);
  const [dropdownLoading, setDropdownLoading] =
    useState(true);

  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [editingClass, setEditingClass] = useState(null);
  const [deletingClass, setDeletingClass] = useState(null);

  const [formData, setFormData] =
    useState(getDefaultForm());

  /* =======================================================
     AUTH
  ======================================================= */

  const requireToken = () => {
    if (!hasToken()) {
      toast.error(
        "Institute session expired. Please login again."
      );

      return false;
    }

    return true;
  };

  /* =======================================================
     FETCH CLASSES
  ======================================================= */

  const fetchClasses = async () => {
    if (!hasToken()) {
      setLoading(false);

      console.error(
        "Institute Firebase token not found."
      );

      return;
    }

    try {
      setLoading(true);

      const response = await API.get(
        "/classes/institute/my-classes",
        getAuthConfig()
      );

      console.log(
        "Institute Classes API Response:",
        response.data
      );

      const data = getArray(response);

      setClasses(data);
    } catch (error) {
      console.error(
        "Fetch Institute Classes Error:",
        error
      );

      console.error(
        "Backend Response:",
        error?.response?.data
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to fetch institute classes"
      );
    } finally {
      setLoading(false);
    }
  };

  /* =======================================================
     FETCH INSTITUTE PROFILE
  ======================================================= */

  const fetchInstituteProfile = async () => {
    if (!requireToken()) {
      return null;
    }

    try {
      const response = await API.get(
        "/institutes/profile",
        getAuthConfig()
      );

      console.log(
        "Institute Profile API Response:",
        response.data
      );

      const profile = getData(response);

      setInstituteProfile(profile);

      return profile;
    } catch (error) {
      console.error(
        "Fetch Institute Profile Error:",
        error
      );

      throw error;
    }
  };

  /* =======================================================
     FETCH CATEGORIES
     
     IMPORTANT:
     Only categories selected by the institute
     are displayed.
  ======================================================= */

  const fetchCategories = async (profile) => {
    try {
      const response = await API.get("/categories");

      const allCategories = getArray(response);

      const allowedIds =
        getCategoryIdsFromProfile(profile);

      let allowedCategories = [];

      if (allowedIds.length > 0) {
        allowedCategories = allCategories.filter(
          (category) =>
            allowedIds.includes(
              Number(getCategoryId(category))
            )
        );
      } else if (Array.isArray(profile?.categories)) {
        allowedCategories = profile.categories
          .map((item) => ({
            id:
              item?.id ??
              item?.category_id ??
              item?.categoryId,

            name:
              item?.name ??
              item?.category_name ??
              item?.categoryName ??
              "",
          }))
          .filter(
            (item) => item.id && item.name
          );
      }

      setCategories(allowedCategories);

      return allowedCategories;
    } catch (error) {
      console.error(
        "Fetch Categories Error:",
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
        "Subcategories API Response:",
        response.data
      );

      const data = getArray(response);

      setSubcategories(data);

      return data;
    } catch (error) {
      console.error(
        "Fetch Subcategories Error:",
        error
      );

      throw error;
    }
  };

  /* =======================================================
     FETCH INSTITUTE TRAINERS
  ======================================================= */

  const fetchTrainers = async () => {
    if (!requireToken()) {
      return [];
    }

    try {
      const response = await API.get(
        "/trainers/institute",
        getAuthConfig()
      );

      console.log(
        "Institute Trainers API Response:",
        response.data
      );

      const data = getArray(response);

      setTrainers(data);

      return data;
    } catch (error) {
      console.error(
        "Fetch Institute Trainers Error:",
        error
      );

      throw error;
    }
  };

  /* =======================================================
     FETCH ALL DROPDOWNS
  ======================================================= */

  const fetchDropdowns = async () => {
    if (!hasToken()) {
      setDropdownLoading(false);

      return;
    }

    try {
      setDropdownLoading(true);

      const profile =
        await fetchInstituteProfile();

      await Promise.all([
        fetchCategories(profile),
        fetchSubcategories(),
        fetchTrainers(),
      ]);
    } catch (error) {
      console.error(
        "Fetch Institute Dropdowns Error:",
        error
      );

      console.error(
        "Backend Response:",
        error?.response?.data
      );

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to load class form data"
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
     SEARCH
  ======================================================= */

  const filteredClasses = useMemo(() => {
    const query = searchQuery
      .trim()
      .toLowerCase();

    if (!query) {
      return classes;
    }

    return classes.filter((item) => {
      const values = [
        item?.title,
        item?.description,
        item?.highlights,
        item?.trainer_name,
        item?.category_name,
        item?.subcategory_name,
        item?.level,
        item?.mode,
        item?.id,
        item?.price,
        item?.duration,
      ];

      return values.some((value) =>
        String(value ?? "")
          .toLowerCase()
          .includes(query)
      );
    });
  }, [classes, searchQuery]);

  /* =======================================================
     RELATED SUBCATEGORIES
  ======================================================= */

  const relatedSubcategories = useMemo(() => {
    if (!formData.category_id) {
      return [];
    }

    return subcategories.filter(
      (subcategory) =>
        String(
          getSubcategoryCategoryId(subcategory)
        ) === String(formData.category_id)
    );
  }, [
    subcategories,
    formData.category_id,
  ]);

  /* =======================================================
     FORM UPDATE
  ======================================================= */

  const updateForm = (field, value) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  /* =======================================================
     CATEGORY CHANGE
  ======================================================= */

  const handleCategoryChange = (event) => {
    const categoryId = event.target.value;

    setFormData((previous) => ({
      ...previous,
      category_id: categoryId,
      subcategory_id: "",
    }));
  };

  /* =======================================================
     TOGGLE DAY
  ======================================================= */

  const toggleDay = (day) => {
    setFormData((previous) => {
      const exists =
        previous.available_days.includes(day);

      return {
        ...previous,

        available_days: exists
          ? previous.available_days.filter(
              (item) => item !== day
            )
          : [
              ...previous.available_days,
              day,
            ],
      };
    });
  };

  /* =======================================================
     ADD CLASS
  ======================================================= */

  const openAddModal = () => {
    setEditingClass(null);

    setFormData(
      getDefaultForm(categories)
    );

    setShowModal(true);
  };

  /* =======================================================
     EDIT CLASS
     
     IMPORTANT FIX:
     Normalize ISO dates before placing them
     into <input type="date">
  ======================================================= */

  const openEditModal = (item) => {
    const availableDays = parseDays(
      item?.available_days
    );

    const startDate = normalizeDateForInput(
      item?.start_date ||
        item?.course_start_date
    );

    const endDate = normalizeDateForInput(
      item?.end_date ||
        item?.course_end_date
    );

    console.log(
      "Original Start Date:",
      item?.start_date
    );

    console.log(
      "Normalized Start Date:",
      startDate
    );

    console.log(
      "Original End Date:",
      item?.end_date
    );

    console.log(
      "Normalized End Date:",
      endDate
    );

    setEditingClass(item);

    setFormData({
      title: item?.title || "",

      description:
        item?.description || "",

      highlights:
        item?.highlights || "",

      image: null,

      category_id:
        getClassCategoryId(item)
          ? String(
              getClassCategoryId(item)
            )
          : "",

      subcategory_id:
        getClassSubcategoryId(item)
          ? String(
              getClassSubcategoryId(item)
            )
          : "",

      trainer_id:
        getClassTrainerId(item)
          ? String(
              getClassTrainerId(item)
            )
          : "",

      price:
        item?.price ?? "",

      duration:
        item?.duration ?? "60",

      level:
        item?.level || "BEGINNER",

      mode:
        item?.mode || "ONLINE",

      students_count:
        item?.students_count ?? "",

      // FIXED
      course_start_date: startDate,

      // FIXED
      course_end_date: endDate,

      start_time:
        item?.start_time ||
        item?.default_start_time ||
        "",

      available_days:
        availableDays,
    });

    setShowModal(true);
  };

  /* =======================================================
     CLOSE MODAL
  ======================================================= */

  const closeModal = () => {
    if (saving) {
      return;
    }

    setShowModal(false);

    setEditingClass(null);

    setFormData(
      getDefaultForm(categories)
    );
  };

  /* =======================================================
     DELETE
  ======================================================= */

  const openDeleteModal = (item) => {
    setDeletingClass(item);

    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    if (deleting) {
      return;
    }

    setShowDeleteModal(false);

    setDeletingClass(null);
  };

  const confirmDelete = async () => {
    if (!deletingClass?.id) {
      return;
    }

    if (!requireToken()) {
      return;
    }

    try {
      setDeleting(true);

      await API.delete(
        `/classes/institute/${deletingClass.id}`,
        getAuthConfig()
      );

      toast.success(
        "Class deleted successfully"
      );

      closeDeleteModal();

      await fetchClasses();
    } catch (error) {
      console.error(
        "Delete Institute Class Error:",
        error
      );

      console.error(
        "Backend Response:",
        error?.response?.data
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to delete class"
      );
    } finally {
      setDeleting(false);
    }
  };

  /* =======================================================
     SUBMIT
  ======================================================= */

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (saving) {
      return;
    }

    if (!requireToken()) {
      return;
    }

    /* -----------------------------------------------
       CLASS NAME
    ------------------------------------------------ */

    if (!formData.title.trim()) {
      toast.error(
        "Class Name is required"
      );

      return;
    }

    /* -----------------------------------------------
       CATEGORY
    ------------------------------------------------ */

    if (!formData.category_id) {
      toast.error(
        "Please select a Category"
      );

      return;
    }

    /* -----------------------------------------------
       CHECK CATEGORY BELONGS TO INSTITUTE
    ------------------------------------------------ */

    const categoryExists =
      categories.some(
        (category) =>
          String(
            getCategoryId(category)
          ) ===
          String(formData.category_id)
      );

    if (!categoryExists) {
      toast.error(
        "Selected category is not available for this institute"
      );

      return;
    }

    /* -----------------------------------------------
       TRAINER
    ------------------------------------------------ */

    if (!formData.trainer_id) {
      toast.error(
        "Please select a Trainer"
      );

      return;
    }

    /* -----------------------------------------------
       SUBCATEGORY
    ------------------------------------------------ */

    if (formData.subcategory_id) {
      const validSubcategory =
        relatedSubcategories.some(
          (subcategory) =>
            String(subcategory.id) ===
            String(
              formData.subcategory_id
            )
        );

      if (!validSubcategory) {
        toast.error(
          "Selected subcategory does not belong to the selected category"
        );

        return;
      }
    }

    /* -----------------------------------------------
       DATE VALIDATION
    ------------------------------------------------ */

    if (
      formData.course_start_date &&
      formData.course_end_date &&
      formData.course_end_date <
        formData.course_start_date
    ) {
      toast.error(
        "End date cannot be before start date"
      );

      return;
    }

    /* -----------------------------------------------
       FORM DATA
    ------------------------------------------------ */

    const payload = new FormData();

    payload.append(
      "title",
      formData.title.trim()
    );

    payload.append(
      "description",
      formData.description.trim()
    );

    payload.append(
      "highlights",
      formData.highlights.trim()
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

    payload.append(
      "students_count",
      formData.students_count || "0"
    );

    /* -----------------------------------------------
       IMAGE
    ------------------------------------------------ */

    if (formData.image) {
      payload.append(
        "image",
        formData.image
      );
    }

    /* -----------------------------------------------
       START DATE

       IMPORTANT:
       Always send YYYY-MM-DD
    ------------------------------------------------ */

    if (formData.course_start_date) {
      payload.append(
        "start_date",
        normalizeDateForInput(
          formData.course_start_date
        )
      );
    }

    /* -----------------------------------------------
       END DATE
    ------------------------------------------------ */

    if (formData.course_end_date) {
      payload.append(
        "end_date",
        normalizeDateForInput(
          formData.course_end_date
        )
      );
    }

    /* -----------------------------------------------
       START TIME
    ------------------------------------------------ */

    if (formData.start_time) {
      payload.append(
        "start_time",
        formData.start_time
      );
    }

    /* -----------------------------------------------
       AVAILABLE DAYS
    ------------------------------------------------ */

    formData.available_days.forEach(
      (day) => {
        payload.append(
          "available_days[]",
          day
        );
      }
    );

    try {
      setSaving(true);

      console.log(
        "================================="
      );

      console.log(
        "Saving Institute Class"
      );

      console.log(
        Object.fromEntries(
          payload.entries()
        )
      );

      console.log(
        "================================="
      );

      /* ---------------------------------------------
         EDIT
      ---------------------------------------------- */

      if (editingClass?.id) {
        await API.put(
          `/classes/institute/${editingClass.id}`,
          payload,
          {
            headers: {
              ...getAuthConfig().headers,
            },
          }
        );

        toast.success(
          "Class updated successfully"
        );
      }

      /* ---------------------------------------------
         CREATE
      ---------------------------------------------- */

      else {
        await API.post(
          "/classes/institute/create",
          payload,
          {
            headers: {
              ...getAuthConfig().headers,
            },
          }
        );

        toast.success(
          "Class created successfully"
        );
      }

      closeModal();

      await fetchClasses();
    } catch (error) {
      console.error(
        "Save Institute Class Error:",
        error
      );

      console.error(
        "Backend Response:",
        error?.response?.data
      );

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to save class"
      );
    } finally {
      setSaving(false);
    }
  };

  /* =======================================================
     UI HELPERS
  ======================================================= */

  const modeClass = (mode) => {
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

  const inputClass =
    "w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/60 transition-colors";

  const selectClass =
    "w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/60 disabled:opacity-50";

  const labelClass =
    "block text-sm text-white mb-1";

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="p-8 text-white min-h-full">

      {/* ===================================================
          HEADER
      =================================================== */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-7">

        <div>
          <h1 className="text-4xl font-bold text-purple-400">
            Institute Classes
          </h1>

          <p className="text-gray-400 mt-2">
            Manage classes, trainers and LMS access
            for your institute.
          </p>
        </div>

        <div className="flex gap-3">

          <button
            type="button"
            onClick={fetchClasses}
            className="px-5 py-3 rounded-xl bg-[#1b1b22] border border-[#30303a] hover:bg-[#24242c] transition-colors"
          >
            Refresh
          </button>

          <button
            type="button"
            onClick={openAddModal}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition-opacity"
          >
            + Add Class
          </button>

        </div>
      </div>

      {/* ===================================================
          SEARCH
      =================================================== */}

      <div className="mb-6 relative">

        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
        />

        <input
          type="text"
          value={searchQuery}
          onChange={(event) =>
            setSearchQuery(
              event.target.value
            )
          }
          placeholder="Search by class, trainer, category, level or mode..."
          className="w-full pl-12 pr-12 py-3.5 rounded-xl bg-[#151519] border border-[#2c2c35] text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/60"
        />

        {searchQuery && (
          <button
            type="button"
            onClick={() =>
              setSearchQuery("")
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
          >
            <X size={16} />
          </button>
        )}

      </div>

      {/* ===================================================
          TABLE
      =================================================== */}

      <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[1700px]">

            <thead className="bg-[#202027]">

              <tr>

                {[
                  "ID",
                  "Image",
                  "Class Name",
                  "Description",
                  "Trainer",
                  "Category",
                  "Subcategory",
                  "Level",
                  "Mode",
                  "Price",
                  "Duration",
                  "Students",
                  "Start Date",
                  "End Date",
                  "Start Time",
                  "Available Days",
                  "Actions",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="p-4 text-left whitespace-nowrap text-sm"
                  >
                    {heading}
                  </th>
                ))}

              </tr>

            </thead>

            <tbody>

              {loading ? (
                <tr>
                  <td
                    colSpan={17}
                    className="p-16 text-center text-gray-400"
                  >
                    Loading classes...
                  </td>
                </tr>
              ) : filteredClasses.length === 0 ? (
                <tr>
                  <td
                    colSpan={17}
                    className="p-16 text-center"
                  >
                    <Search
                      size={40}
                      className="mx-auto text-gray-700 mb-3"
                    />

                    <p className="text-gray-400 text-lg">
                      {searchQuery
                        ? "No classes found matching your search"
                        : "No classes available"}
                    </p>
                  </td>
                </tr>
              ) : (
                filteredClasses.map(
                  (item) => (
                    <tr
                      key={item.id}
                      className="border-t border-[#2c2c35] hover:bg-[#1b1b21] transition-colors"
                    >

                      {/* ID */}
                      <td className="p-4 whitespace-nowrap">
                        {item.id}
                      </td>

                      {/* IMAGE */}
                      <td className="p-4">

                        {item.image ? (
                          <img
                            src={getImageUrl(
                              item.image
                            )}
                            alt={
                              item.title ||
                              "Class"
                            }
                            className="w-12 h-12 rounded-xl object-cover border border-[#333]"
                            onError={(event) => {
                              event.currentTarget.style.display =
                                "none";
                            }}
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-xl bg-[#26262b] flex items-center justify-center">
                            <ImageIcon
                              size={18}
                              className="text-gray-600"
                            />
                          </div>
                        )}

                      </td>

                      {/* CLASS NAME */}
                      <td className="p-4 font-semibold whitespace-nowrap">
                        {item.title || "-"}
                      </td>

                      {/* DESCRIPTION */}
                      <td
                        className="p-4 text-gray-300 max-w-[180px]"
                        title={
                          item.description ||
                          ""
                        }
                      >
                        {truncate(
                          item.description,
                          35
                        )}
                      </td>

                      {/* TRAINER */}
                      <td className="p-4 whitespace-nowrap">
                        {item.trainer_name ||
                          "-"}
                      </td>

                      {/* CATEGORY */}
                      <td className="p-4 whitespace-nowrap">
                        {item.category_name ||
                          "-"}
                      </td>

                      {/* SUBCATEGORY */}
                      <td className="p-4 whitespace-nowrap">
                        {item.subcategory_name ||
                          "-"}
                      </td>

                      {/* LEVEL */}
                      <td className="p-4 whitespace-nowrap">

                        <span className="px-2.5 py-1 rounded-full text-xs bg-purple-500/20 text-purple-300">
                          {item.level || "-"}
                        </span>

                      </td>

                      {/* MODE */}
                      <td className="p-4 whitespace-nowrap">

                        <span
                          className={`px-2.5 py-1 rounded-full text-xs ${modeClass(
                            item.mode
                          )}`}
                        >
                          {item.mode || "-"}
                        </span>

                      </td>

                      {/* PRICE */}
                      <td className="p-4 font-semibold whitespace-nowrap">
                        ₹{item.price ?? 0}
                      </td>

                      {/* DURATION */}
                      <td className="p-4 whitespace-nowrap">
                        {item.duration
                          ? `${item.duration} min`
                          : "-"}
                      </td>

                      {/* STUDENTS */}
                      <td className="p-4 font-semibold whitespace-nowrap">
                        {item.students_count ??
                          0}
                      </td>

                      {/* START DATE */}
                      <td className="p-4 whitespace-nowrap">
                        {formatDate(
                          item.start_date
                        )}
                      </td>

                      {/* END DATE */}
                      <td className="p-4 whitespace-nowrap">
                        {formatDate(
                          item.end_date
                        )}
                      </td>

                      {/* START TIME */}
                      <td className="p-4 whitespace-nowrap">

                        <span className="inline-flex items-center gap-1">

                          <Clock
                            size={14}
                            className="text-gray-500"
                          />

                          {formatTime(
                            item.start_time
                          )}

                        </span>

                      </td>

                      {/* DAYS */}
                      <td
                        className="p-4 whitespace-nowrap"
                        title={formatDays(
                          item.available_days
                        )}
                      >
                        {formatDays(
                          item.available_days
                        )}
                      </td>

                      {/* ACTIONS */}
                      <td className="p-4">

                        <div className="flex items-center gap-2">

                          {/* LMS */}
                          <button
                            type="button"
                            onClick={() =>
                              navigate(
                                `/institute/lms/${item.id}`
                              )
                            }
                            className="p-2 rounded-lg hover:bg-purple-500/10 transition-colors"
                            title="Manage LMS"
                          >
                            <BookOpen
                              size={17}
                              className="text-purple-300"
                            />
                          </button>

                          {/* EDIT */}
                          <button
                            type="button"
                            onClick={() =>
                              openEditModal(
                                item
                              )
                            }
                            className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                            title="Edit"
                          >
                            <Edit
                              size={17}
                              className="text-white"
                            />
                          </button>

                          {/* DELETE */}
                          <button
                            type="button"
                            onClick={() =>
                              openDeleteModal(
                                item
                              )
                            }
                            className="p-2 rounded-lg hover:bg-red-500/10 transition-colors"
                            title="Delete"
                          >
                            <Trash2
                              size={17}
                              className="text-red-400"
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

      {/* ===================================================
          ADD / EDIT MODAL
      =================================================== */}

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">

          <div className="w-full max-w-[720px] max-h-[92vh] bg-[#211c30] rounded-2xl shadow-2xl overflow-hidden">

            {/* HEADER */}
            <div className="flex items-center justify-between p-6 border-b border-[#3a3448]">

              <div>

                <h2 className="text-2xl font-bold">
                  {editingClass
                    ? "Edit Class"
                    : "Add Class"}
                </h2>

                <p className="text-sm text-gray-400 mt-1">
                  Assign a trainer to the class
                  for LMS management.
                </p>

              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
                className="text-gray-400 hover:text-white disabled:opacity-50"
              >
                <X size={22} />
              </button>

            </div>

            {/* FORM */}
            <div className="overflow-y-auto max-h-[78vh] p-6">

              <form onSubmit={handleSubmit}>

                {/* CLASS NAME */}
                <label className={labelClass}>
                  Class Name *
                </label>

                <input
                  type="text"
                  value={formData.title}
                  onChange={(event) =>
                    updateForm(
                      "title",
                      event.target.value
                    )
                  }
                  className={inputClass}
                  placeholder="Enter class name"
                  required
                />

                {/* DESCRIPTION */}
                <label className={labelClass}>
                  Description
                </label>

                <textarea
                  value={
                    formData.description
                  }
                  onChange={(event) =>
                    updateForm(
                      "description",
                      event.target.value
                    )
                  }
                  className={inputClass}
                  rows={3}
                  placeholder="Enter class description"
                />

                {/* HIGHLIGHTS */}
                <label className={labelClass}>
                  Highlights
                </label>

                <textarea
                  value={
                    formData.highlights
                  }
                  onChange={(event) =>
                    updateForm(
                      "highlights",
                      event.target.value
                    )
                  }
                  className={inputClass}
                  rows={2}
                  placeholder="Enter class highlights"
                />

                {/* IMAGE */}
                <label className={labelClass}>
                  Class Image
                </label>

                {editingClass?.image && (
                  <img
                    src={getImageUrl(
                      editingClass.image
                    )}
                    alt="Current class"
                    className="w-24 h-24 object-cover rounded-xl mb-2 border border-[#333]"
                    onError={(event) => {
                      event.currentTarget.style.display =
                        "none";
                    }}
                  />
                )}

                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) =>
                    updateForm(
                      "image",
                      event.target.files?.[0] ||
                        null
                    )
                  }
                  className="w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white file:mr-4 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-purple-500/20 file:text-purple-300"
                />

                {/* TRAINER */}
                <label className={labelClass}>
                  Trainer *
                </label>

                <select
                  value={
                    formData.trainer_id
                  }
                  onChange={(event) =>
                    updateForm(
                      "trainer_id",
                      event.target.value
                    )
                  }
                  className={selectClass}
                  required
                  disabled={
                    dropdownLoading
                  }
                >

                  <option value="">
                    {dropdownLoading
                      ? "Loading trainers..."
                      : trainers.length
                      ? "Select Trainer"
                      : "No trainers available"}
                  </option>

                  {trainers.map(
                    (trainer) => (
                      <option
                        key={getTrainerId(
                          trainer
                        )}
                        value={getTrainerId(
                          trainer
                        )}
                      >
                        {getTrainerName(
                          trainer
                        )}
                      </option>
                    )
                  )}

                </select>

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
                          : categories.length
                          ? "Select Category"
                          : "No categories available"}
                      </option>

                      {categories.map(
                        (category) => (
                          <option
                            key={getCategoryId(
                              category
                            )}
                            value={getCategoryId(
                              category
                            )}
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
                      value={
                        formData.subcategory_id
                      }
                      onChange={(event) =>
                        updateForm(
                          "subcategory_id",
                          event.target.value
                        )
                      }
                      className={
                        selectClass
                      }
                      disabled={
                        !formData.category_id ||
                        relatedSubcategories.length ===
                          0
                      }
                    >

                      <option value="">
                        {!formData.category_id
                          ? "Select Category First"
                          : relatedSubcategories.length
                          ? "Select Subcategory"
                          : "No Subcategories"}
                      </option>

                      {relatedSubcategories.map(
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
                      onChange={(event) =>
                        updateForm(
                          "price",
                          event.target.value
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
                      onChange={(event) =>
                        updateForm(
                          "duration",
                          event.target.value
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
                      onChange={(event) =>
                        updateForm(
                          "course_start_date",
                          event.target.value
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
                      min={
                        formData.course_start_date ||
                        undefined
                      }
                      onChange={(event) =>
                        updateForm(
                          "course_end_date",
                          event.target.value
                        )
                      }
                      className={
                        inputClass
                      }
                    />

                  </div>

                </div>

                {/* START TIME */}
                <label className={labelClass}>
                  Start Time
                </label>

                <input
                  type="time"
                  value={
                    formData.start_time
                  }
                  onChange={(event) =>
                    updateForm(
                      "start_time",
                      event.target.value
                    )
                  }
                  className={inputClass}
                />

                {/* AVAILABLE DAYS */}
                <label className={labelClass}>
                  Available Days
                </label>

                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 mt-2 mb-4">

                  {DAYS.map((day) => {
                    const checked =
                      formData.available_days.includes(
                        day.value
                      );

                    return (
                      <label
                        key={day.value}
                        className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border cursor-pointer text-xs transition-colors ${
                          checked
                            ? "bg-purple-500/20 border-purple-500/50 text-purple-300"
                            : "bg-[#2b2638] border-transparent text-gray-300 hover:border-purple-500/30"
                        }`}
                      >

                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={checked}
                          onChange={() =>
                            toggleDay(
                              day.value
                            )
                          }
                        />

                        <span
                          className={`w-4 h-4 rounded border flex items-center justify-center ${
                            checked
                              ? "bg-purple-500 border-purple-500"
                              : "border-gray-500"
                          }`}
                        >
                          {checked && (
                            <span className="text-white text-[10px]">
                              ✓
                            </span>
                          )}
                        </span>

                        {day.label.slice(
                          0,
                          3
                        )}

                      </label>
                    );
                  })}

                </div>

                {/* STUDENTS */}
                <label className={labelClass}>
                  Students Count
                </label>

                <input
                  type="number"
                  min="0"
                  value={
                    formData.students_count
                  }
                  onChange={(event) =>
                    updateForm(
                      "students_count",
                      event.target.value
                    )
                  }
                  className={inputClass}
                  placeholder="0"
                />

                {/* LEVEL + MODE */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  {/* LEVEL */}
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
                      onChange={(event) =>
                        updateForm(
                          "level",
                          event.target.value
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

                  {/* MODE */}
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
                      onChange={(event) =>
                        updateForm(
                          "mode",
                          event.target.value
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
                <div className="flex justify-end gap-3 pt-5 mt-2 border-t border-[#3a3448]">

                  <button
                    type="button"
                    onClick={closeModal}
                    disabled={saving}
                    className="px-5 py-3 rounded-xl border border-gray-600 text-gray-300 hover:bg-[#2b2638] disabled:opacity-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={
                      saving ||
                      dropdownLoading
                    }
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold disabled:opacity-50"
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

      {/* ===================================================
          DELETE MODAL
      =================================================== */}

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">

          <div className="w-full max-w-[420px] bg-[#1e1b2e] border border-[#2e2a42] rounded-2xl shadow-2xl">

            <div className="p-8 text-center">

              <div className="w-14 h-14 mx-auto rounded-full bg-red-500/15 flex items-center justify-center mb-5">

                <FaTrash className="text-red-400 text-lg" />

              </div>

              <h2 className="text-xl font-bold mb-3">
                Delete Class
              </h2>

              <p className="text-gray-400 text-sm leading-relaxed mb-7">

                Are you sure you want to
                delete{" "}

                <span className="text-white font-semibold">

                  {deletingClass?.title ||
                    "this class"}

                </span>

                ?

              </p>

              <div className="flex gap-3">

                <button
                  type="button"
                  onClick={
                    closeDeleteModal
                  }
                  disabled={deleting}
                  className="flex-1 px-5 py-3 rounded-xl border border-[#3a3650] text-gray-300 hover:bg-[#2a2640] disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={
                    confirmDelete
                  }
                  disabled={deleting}
                  className="flex-1 px-5 py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 font-bold disabled:opacity-50"
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