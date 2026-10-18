

// import React, { useEffect, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// import {
//   BookOpen,
//   Edit,
//   Trash2,
//   Search,
//   RefreshCw,
//   X,
//   Clock,
//   Image as ImageIcon,
// } from "lucide-react";

// import { FaTrash } from "react-icons/fa";
// import API from "../services/api";

// /* =========================================================
//    CONSTANTS
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
//   image: null,

//   category_id: "",
//   subcategory_id: "",
//   trainer_id: "",

//   price: "",
//   duration: "60",

//   level: "BEGINNER",
//   mode: "ONLINE",
//   class_type: "LIVE",

//   students_count: "",

//   course_start_date: "",
//   course_end_date: "",

//   start_time: "",
//   end_time: "",

//   available_days: [],
// };

// /* =========================================================
//    GENERAL HELPERS
// ========================================================= */

// const getArray = (response) => {
//   if (Array.isArray(response)) return response;

//   if (Array.isArray(response?.data)) {
//     return response.data;
//   }

//   if (Array.isArray(response?.data?.data)) {
//     return response.data.data;
//   }

//   return [];
// };

// const getData = (response) => {
//   return response?.data?.data ?? response?.data ?? null;
// };

// /* =========================================================
//    AUTH
// ========================================================= */

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

//   if (!token) {
//     return {};
//   }

//   return {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
// };

// const hasToken = () => Boolean(getToken());

// /* =========================================================
//    DATE HELPERS
// ========================================================= */

// /*
//   IMPORTANT FIX

//   Backend/MySQL may return:

//   2026-09-28T00:00:00.000Z

//   But <input type="date"> requires:

//   2026-09-28
// */

// const normalizeDateForInput = (value) => {
//   if (!value) return "";

//   const text = String(value).trim();

//   // Already correct YYYY-MM-DD
//   if (/^\d{4}-\d{2}-\d{2}$/.test(text)) {
//     return text;
//   }

//   // ISO format:
//   // 2026-09-28T00:00:00.000Z
//   if (/^\d{4}-\d{2}-\d{2}T/.test(text)) {
//     return text.substring(0, 10);
//   }

//   // MySQL datetime:
//   // 2026-09-28 00:00:00
//   if (/^\d{4}-\d{2}-\d{2}\s/.test(text)) {
//     return text.substring(0, 10);
//   }

//   // Fallback
//   const date = new Date(text);

//   if (Number.isNaN(date.getTime())) {
//     return "";
//   }

//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const day = String(date.getDate()).padStart(2, "0");

//   return `${year}-${month}-${day}`;
// };

// /* =========================================================
//    DISPLAY DATE
// ========================================================= */

// const getTodayDateInput = () => {
//   const today = new Date();
//   const year = today.getFullYear();
//   const month = String(today.getMonth() + 1).padStart(2, "0");
//   const day = String(today.getDate()).padStart(2, "0");
//   return `${year}-${month}-${day}`;
// };

// const formatDate = (value) => {
//   const normalized = normalizeDateForInput(value);

//   if (!normalized) return "-";

//   const date = new Date(`${normalized}T00:00:00`);

//   if (Number.isNaN(date.getTime())) {
//     return String(value);
//   }

//   return date.toLocaleDateString("en-IN", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });
// };

// /* =========================================================
//    TIME
// ========================================================= */

// const formatTime = (value) => {
//   if (!value) return "-";

//   const text = String(value);

//   if (/am|pm/i.test(text)) {
//     return text;
//   }

//   const [hourText, minuteText = "00"] = text.split(":");

//   const hour = Number(hourText);
//   const minute = Number(minuteText);

//   if (Number.isNaN(hour)) {
//     return text;
//   }

//   const period = hour >= 12 ? "PM" : "AM";
//   const hour12 = hour % 12 || 12;

//   return `${hour12}:${String(minute).padStart(2, "0")} ${period}`;
// };

// /* =========================================================
//    DAYS
// ========================================================= */

// const parseDays = (value) => {
//   if (Array.isArray(value)) {
//     return value.map((item) => String(item).toUpperCase());
//   }

//   if (!value) {
//     return [];
//   }

//   try {
//     const parsed = JSON.parse(value);

//     if (Array.isArray(parsed)) {
//       return parsed.map((item) => String(item).toUpperCase());
//     }
//   } catch {
//     // Ignore JSON error and try comma-separated value
//   }

//   return String(value)
//     .split(",")
//     .map((item) => item.trim().toUpperCase())
//     .filter(Boolean);
// };

// const formatDays = (value) => {
//   const days = parseDays(value);

//   if (!days.length) {
//     return "-";
//   }

//   const shortNames = {
//     MONDAY: "Mon",
//     TUESDAY: "Tue",
//     WEDNESDAY: "Wed",
//     THURSDAY: "Thu",
//     FRIDAY: "Fri",
//     SATURDAY: "Sat",
//     SUNDAY: "Sun",
//   };

//   return days
//     .map((day) => shortNames[day] || day)
//     .join(", ");
// };

// /* =========================================================
//    IMAGE
// ========================================================= */

// const getImageUrl = (value) => {
//   if (!value) {
//     return "";
//   }

//   if (typeof value === "object") {
//     value =
//       value.url ||
//       value.image_url ||
//       value.imageUrl ||
//       value.path ||
//       value.src ||
//       "";
//   }

//   if (!value) {
//     return "";
//   }

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

// /* =========================================================
//    CATEGORY HELPERS
// ========================================================= */

// const getCategoryId = (category) => {
//   return (
//     category?.id ??
//     category?.category_id ??
//     category?.categoryId ??
//     ""
//   );
// };

// const getSubcategoryCategoryId = (subcategory) => {
//   return (
//     subcategory?.category_id ??
//     subcategory?.categoryId ??
//     subcategory?.category?.id ??
//     ""
//   );
// };

// /* =========================================================
//    INSTITUTE CATEGORY IDS
// ========================================================= */

// const getCategoryIdsFromProfile = (profile) => {
//   if (!profile) {
//     return [];
//   }

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

//   if (!Array.isArray(source)) {
//     return [];
//   }

//   return [
//     ...new Set(
//       source
//         .map((item) => {
//           if (
//             typeof item === "number" ||
//             typeof item === "string"
//           ) {
//             const id = Number(item);

//             return Number.isNaN(id) ? null : id;
//           }

//           if (!item || typeof item !== "object") {
//             return null;
//           }

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

// /* =========================================================
//    TRAINER HELPERS
// ========================================================= */

// const getTrainerId = (trainer) => {
//   return (
//     trainer?.id ??
//     trainer?.trainer_id ??
//     trainer?.trainerId ??
//     trainer?.account_id ??
//     ""
//   );
// };

// const getTrainerName = (trainer) => {
//   return (
//     trainer?.full_name ||
//     trainer?.name ||
//     trainer?.trainer_name ||
//     trainer?.email ||
//     `Trainer ${getTrainerId(trainer)}`
//   );
// };

// /* Trainer specialization helpers. The /trainers/institute API must return
//    specializations: [{ category_id, subcategory_id }], or category_ids and
//    subcategory_ids, for the selected trainer. */
// const getTrainerSpecializations = (trainer) => {
//   const raw =
//     trainer?.specializations ??
//     trainer?.specialization_pairs ??
//     trainer?.trainer_specializations;

//   if (Array.isArray(raw)) {
//     return raw.map((item) => ({
//       category_id: String(
//         item?.category_id ?? item?.categoryId ?? item?.category?.id ?? ""
//       ),
//       subcategory_id: String(
//         item?.subcategory_id ?? item?.subcategoryId ?? item?.subcategory?.id ?? ""
//       ),
//     })).filter((item) => item.category_id && item.subcategory_id);
//   }

//   const categoryIds = Array.isArray(trainer?.category_ids)
//     ? trainer.category_ids
//     : Array.isArray(trainer?.categoryIds)
//     ? trainer.categoryIds
//     : [];
//   const subcategoryIds = Array.isArray(trainer?.subcategory_ids)
//     ? trainer.subcategory_ids
//     : Array.isArray(trainer?.subcategoryIds)
//     ? trainer.subcategoryIds
//     : [];

//   return subcategoryIds.map((subcategoryId, index) => ({
//     category_id: String(categoryIds[index] ?? ""),
//     subcategory_id: String(subcategoryId ?? ""),
//   })).filter((item) => item.category_id && item.subcategory_id);
// };

// /* =========================================================
//    CLASS HELPERS
// ========================================================= */

// const getClassCategoryId = (item) => {
//   return (
//     item?.category_id ??
//     item?.categoryId ??
//     item?.category?.id ??
//     ""
//   );
// };

// const getClassSubcategoryId = (item) => {
//   return (
//     item?.subcategory_id ??
//     item?.subcategoryId ??
//     item?.subcategory?.id ??
//     ""
//   );
// };

// const getClassTrainerId = (item) => {
//   return (
//     item?.trainer_id ??
//     item?.trainerId ??
//     item?.trainer?.id ??
//     ""
//   );
// };

// const getClassType = (item) => {
//   const value =
//     item?.class_type ??
//     item?.classType ??
//     item?.type ??
//     "LIVE";

//   const normalized = String(value).trim().toUpperCase();

//   // Backend accepts LIVE or RECORDING. Map legacy RECORDED values
//   // to RECORDING so editing older classes remains compatible.
//   return normalized === "RECORDED" ? "RECORDING" : normalized;
// };

// /* =========================================================
//    DEFAULT FORM
// ========================================================= */

// const getDefaultForm = (categories = []) => {
//   return {
//     ...DEFAULT_FORM,

//     category_id:
//       categories.length === 1
//         ? String(getCategoryId(categories[0]))
//         : "",
//   };
// };

// /* =========================================================
//    TRUNCATE
// ========================================================= */

// const truncate = (value, length = 35) => {
//   if (!value) {
//     return "-";
//   }

//   const text = String(value);

//   return text.length > length
//     ? `${text.slice(0, length)}...`
//     : text;
// };

// /* =========================================================
//    COMPONENT
// ========================================================= */

// export default function InstituteClasses() {
//   const navigate = useNavigate();

//   /* =======================================================
//      STATE
//   ======================================================= */

//   const [classes, setClasses] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);
//   const [trainers, setTrainers] = useState([]);

//   const [instituteProfile, setInstituteProfile] =
//     useState(null);

//   const [searchQuery, setSearchQuery] = useState("");

//   const [loading, setLoading] = useState(true);
//   const [dropdownLoading, setDropdownLoading] =
//     useState(true);

//   const [saving, setSaving] = useState(false);
//   const [deleting, setDeleting] = useState(false);

//   const [showModal, setShowModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] =
//     useState(false);

//   const [editingClass, setEditingClass] = useState(null);
//   const [deletingClass, setDeletingClass] = useState(null);

//   const [formData, setFormData] =
//     useState(getDefaultForm());

//   /* =======================================================
//      AUTH
//   ======================================================= */

//   const requireToken = () => {
//     if (!hasToken()) {
//       toast.error(
//         "Institute session expired. Please login again."
//       );

//       return false;
//     }

//     return true;
//   };

//   /* =======================================================
//      FETCH CLASSES
//   ======================================================= */

//   const fetchClasses = async () => {
//     if (!hasToken()) {
//       setLoading(false);

//       console.error(
//         "Institute Firebase token not found."
//       );

//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await API.get(
//         "/classes/institute/my-classes",
//         getAuthConfig()
//       );

//       console.log(
//         "Institute Classes API Response:",
//         response.data
//       );

//       const data = getArray(response);

//       setClasses(data);
//     } catch (error) {
//       console.error(
//         "Fetch Institute Classes Error:",
//         error
//       );

//       console.error(
//         "Backend Response:",
//         error?.response?.data
//       );

//       toast.error(
//         error?.response?.data?.message ||
//           "Failed to fetch institute classes"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* =======================================================
//      FETCH INSTITUTE PROFILE
//   ======================================================= */

//   const fetchInstituteProfile = async () => {
//     if (!requireToken()) {
//       return null;
//     }

//     try {
//       const response = await API.get(
//         "/institutes/profile",
//         getAuthConfig()
//       );

//       console.log(
//         "Institute Profile API Response:",
//         response.data
//       );

//       const profile = getData(response);

//       setInstituteProfile(profile);

//       return profile;
//     } catch (error) {
//       console.error(
//         "Fetch Institute Profile Error:",
//         error
//       );

//       throw error;
//     }
//   };

//   /* =======================================================
//      FETCH CATEGORIES
     
//      IMPORTANT:
//      Only categories selected by the institute
//      are displayed.
//   ======================================================= */

//   const fetchCategories = async (profile) => {
//     try {
//       const response = await API.get("/categories");

//       const allCategories = getArray(response);

//       const allowedIds =
//         getCategoryIdsFromProfile(profile);

//       let allowedCategories = [];

//       if (allowedIds.length > 0) {
//         allowedCategories = allCategories.filter(
//           (category) =>
//             allowedIds.includes(
//               Number(getCategoryId(category))
//             )
//         );
//       } else if (Array.isArray(profile?.categories)) {
//         allowedCategories = profile.categories
//           .map((item) => ({
//             id:
//               item?.id ??
//               item?.category_id ??
//               item?.categoryId,

//             name:
//               item?.name ??
//               item?.category_name ??
//               item?.categoryName ??
//               "",
//           }))
//           .filter(
//             (item) => item.id && item.name
//           );
//       }

//       setCategories(allowedCategories);

//       return allowedCategories;
//     } catch (error) {
//       console.error(
//         "Fetch Categories Error:",
//         error
//       );

//       throw error;
//     }
//   };

//   /* =======================================================
//      FETCH SUBCATEGORIES
//   ======================================================= */

//   const fetchSubcategories = async () => {
//     try {
//       const response = await API.get(
//         "/subcategories"
//       );

//       console.log(
//         "Subcategories API Response:",
//         response.data
//       );

//       const data = getArray(response);

//       setSubcategories(data);

//       return data;
//     } catch (error) {
//       console.error(
//         "Fetch Subcategories Error:",
//         error
//       );

//       throw error;
//     }
//   };

//   /* =======================================================
//      FETCH INSTITUTE TRAINERS
//   ======================================================= */

//   const fetchTrainers = async () => {
//     if (!requireToken()) {
//       return [];
//     }

//     try {
//       const response = await API.get(
//         "/trainers/institute",
//         getAuthConfig()
//       );

//       console.log(
//         "Institute Trainers API Response:",
//         response.data
//       );

//       const data = getArray(response);

//       setTrainers(data);

//       return data;
//     } catch (error) {
//       console.error(
//         "Fetch Institute Trainers Error:",
//         error
//       );

//       throw error;
//     }
//   };

//   /* =======================================================
//      FETCH ALL DROPDOWNS
//   ======================================================= */

//   const fetchDropdowns = async () => {
//     if (!hasToken()) {
//       setDropdownLoading(false);

//       return;
//     }

//     try {
//       setDropdownLoading(true);

//       const profile =
//         await fetchInstituteProfile();

//       await Promise.all([
//         fetchCategories(profile),
//         fetchSubcategories(),
//         fetchTrainers(),
//       ]);
//     } catch (error) {
//       console.error(
//         "Fetch Institute Dropdowns Error:",
//         error
//       );

//       console.error(
//         "Backend Response:",
//         error?.response?.data
//       );

//       toast.error(
//         error?.response?.data?.message ||
//           error?.message ||
//           "Failed to load class form data"
//       );
//     } finally {
//       setDropdownLoading(false);
//     }
//   };

//   /* =======================================================
//      INITIAL LOAD
//   ======================================================= */

//   useEffect(() => {
//     fetchClasses();
//     fetchDropdowns();
//   }, []);

//   /* =======================================================
//      SEARCH
//   ======================================================= */

//   const filteredClasses = useMemo(() => {
//     const query = searchQuery
//       .trim()
//       .toLowerCase();

//     if (!query) {
//       return classes;
//     }

//     return classes.filter((item) => {
//       const values = [
//         item?.title,
//         item?.description,
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

//   /* =======================================================
//      TRAINER-SPECIFIC CATEGORY / SUBCATEGORY OPTIONS
//   ======================================================= */

//   const selectedTrainer = useMemo(
//     () => trainers.find((trainer) =>
//       String(getTrainerId(trainer)) === String(formData.trainer_id)
//     ),
//     [trainers, formData.trainer_id]
//   );

//   const trainerSpecializations = useMemo(
//     () => getTrainerSpecializations(selectedTrainer),
//     [selectedTrainer]
//   );

//   const trainerCategoryOptions = useMemo(() => {
//     const ids = new Set(trainerSpecializations.map((item) => item.category_id));
//     return categories.filter((category) => ids.has(String(getCategoryId(category))));
//   }, [categories, trainerSpecializations]);

//   const relatedSubcategories = useMemo(() => {
//     if (!formData.trainer_id || !formData.category_id) return [];

//     const allowedIds = new Set(
//       trainerSpecializations
//         .filter((item) => item.category_id === String(formData.category_id))
//         .map((item) => item.subcategory_id)
//     );

//     return subcategories.filter((subcategory) =>
//       allowedIds.has(String(subcategory?.id ?? subcategory?.subcategory_id ?? subcategory?.subcategoryId ?? "")) &&
//       String(getSubcategoryCategoryId(subcategory)) === String(formData.category_id)
//     );
//   }, [subcategories, formData.category_id, formData.trainer_id, trainerSpecializations]);

//   // Automatically select the category when the selected trainer
//   // has exactly one category. This also covers opening/editing a class
//   // after the trainer records have loaded.
//   useEffect(() => {
//     if (!formData.trainer_id || trainerCategoryOptions.length !== 1) {
//       return;
//     }

//     const onlyCategoryId = String(
//       getCategoryId(trainerCategoryOptions[0])
//     );

//     if (String(formData.category_id) !== onlyCategoryId) {
//       setFormData((previous) => ({
//         ...previous,
//         category_id: onlyCategoryId,
//         subcategory_id: "",
//       }));
//     }
//   }, [
//     formData.trainer_id,
//     formData.category_id,
//     trainerCategoryOptions,
//   ]);

//   // Automatically select the only subcategory available for the
//   // selected trainer and category. This also works when editing a class
//   // and the trainer/category data becomes available after the modal opens.
//   useEffect(() => {
//     if (
//       !formData.trainer_id ||
//       !formData.category_id ||
//       relatedSubcategories.length !== 1
//     ) {
//       return;
//     }

//     const onlySubcategory = relatedSubcategories[0];
//     const onlySubcategoryId = String(
//       onlySubcategory?.id ??
//         onlySubcategory?.subcategory_id ??
//         onlySubcategory?.subcategoryId ??
//         ""
//     );

//     if (
//       onlySubcategoryId &&
//       String(formData.subcategory_id) !== onlySubcategoryId
//     ) {
//       setFormData((previous) => ({
//         ...previous,
//         subcategory_id: onlySubcategoryId,
//       }));
//     }
//   }, [
//     formData.trainer_id,
//     formData.category_id,
//     formData.subcategory_id,
//     relatedSubcategories,
//   ]);

//   /* =======================================================
//      FORM UPDATE
//   ======================================================= */

//   const updateForm = (field, value) => {
//     setFormData((previous) => ({
//       ...previous,
//       [field]: value,
//     }));
//   };

//   const handleTrainerChange = (event) => {
//     const trainerId = event.target.value;
//     const trainer = trainers.find(
//       (item) => String(getTrainerId(item)) === String(trainerId)
//     );
//     const specializations = getTrainerSpecializations(trainer);

//     // Use distinct categories assigned to this trainer.
//     const trainerCategoryIds = [
//       ...new Set(
//         specializations
//           .map((item) => String(item.category_id || ""))
//           .filter(Boolean)
//       ),
//     ];

//     // If the trainer has exactly one category, select it immediately.
//     const nextCategoryId =
//       trainerCategoryIds.length === 1 &&
//       categories.some(
//         (category) =>
//           String(getCategoryId(category)) === trainerCategoryIds[0]
//       )
//         ? trainerCategoryIds[0]
//         : "";

//     setFormData((previous) => ({
//       ...previous,
//       trainer_id: trainerId,
//       category_id: nextCategoryId,
//       subcategory_id: "",
//     }));
//   };

//   /* =======================================================
//      CATEGORY CHANGE
//   ======================================================= */

//   const handleCategoryChange = (event) => {
//     const categoryId = event.target.value;

//     setFormData((previous) => ({
//       ...previous,
//       category_id: categoryId,
//       subcategory_id: "",
//     }));
//   };

//   /* =======================================================
//      TOGGLE DAY
//   ======================================================= */

//   const toggleDay = (day) => {
//     setFormData((previous) => {
//       const exists =
//         previous.available_days.includes(day);

//       return {
//         ...previous,

//         available_days: exists
//           ? previous.available_days.filter(
//               (item) => item !== day
//             )
//           : [
//               ...previous.available_days,
//               day,
//             ],
//       };
//     });
//   };

//   /* =======================================================
//      ADD CLASS
//   ======================================================= */

//   const openAddModal = () => {
//     setEditingClass(null);

//     setFormData(
//       getDefaultForm(categories)
//     );

//     setShowModal(true);
//   };

//   /* =======================================================
//      EDIT CLASS
     
//      IMPORTANT FIX:
//      Normalize ISO dates before placing them
//      into <input type="date">
//   ======================================================= */

//   const openEditModal = (item) => {
//     const availableDays = parseDays(
//       item?.available_days
//     );

//     const startDate = normalizeDateForInput(
//       item?.start_date ||
//         item?.course_start_date
//     );

//     const endDate = normalizeDateForInput(
//       item?.end_date ||
//         item?.course_end_date
//     );

//     console.log(
//       "Original Start Date:",
//       item?.start_date
//     );

//     console.log(
//       "Normalized Start Date:",
//       startDate
//     );

//     console.log(
//       "Original End Date:",
//       item?.end_date
//     );

//     console.log(
//       "Normalized End Date:",
//       endDate
//     );

//     setEditingClass(item);

//     setFormData({
//       title: item?.title || "",

//       description:
//         item?.description || "",

//       image: null,

//       category_id:
//         getClassCategoryId(item)
//           ? String(
//               getClassCategoryId(item)
//             )
//           : "",

//       subcategory_id:
//         getClassSubcategoryId(item)
//           ? String(
//               getClassSubcategoryId(item)
//             )
//           : "",

//       trainer_id:
//         getClassTrainerId(item)
//           ? String(
//               getClassTrainerId(item)
//             )
//           : "",

//       price:
//         item?.price ?? "",

//       duration:
//         item?.duration ?? "60",

//       level:
//         item?.level || "BEGINNER",

//       mode:
//         item?.mode || "ONLINE",

//       class_type: getClassType(item),

//       students_count:
//         item?.students_count ?? "",

//       // FIXED
//       course_start_date: startDate,

//       // FIXED
//       course_end_date: endDate,

//       start_time:
//         item?.start_time ||
//         item?.default_start_time ||
//         "",

//       end_time:
//         item?.end_time ||
//         item?.default_end_time ||
//         "",

//       available_days:
//         availableDays,
//     });

//     setShowModal(true);
//   };

//   /* =======================================================
//      CLOSE MODAL
//   ======================================================= */

//   const closeModal = () => {
//     if (saving) {
//       return;
//     }

//     setShowModal(false);

//     setEditingClass(null);

//     setFormData(
//       getDefaultForm(categories)
//     );
//   };

//   /* =======================================================
//      DELETE
//   ======================================================= */

//   const openDeleteModal = (item) => {
//     setDeletingClass(item);

//     setShowDeleteModal(true);
//   };

//   const closeDeleteModal = () => {
//     if (deleting) {
//       return;
//     }

//     setShowDeleteModal(false);

//     setDeletingClass(null);
//   };

//   const confirmDelete = async () => {
//     if (!deletingClass?.id) {
//       return;
//     }

//     if (!requireToken()) {
//       return;
//     }

//     try {
//       setDeleting(true);

//       await API.delete(
//         `/classes/institute/${deletingClass.id}`,
//         getAuthConfig()
//       );

//       toast.success(
//         "Class deleted successfully"
//       );

//       closeDeleteModal();

//       await fetchClasses();
//     } catch (error) {
//       console.error(
//         "Delete Institute Class Error:",
//         error
//       );

//       console.error(
//         "Backend Response:",
//         error?.response?.data
//       );

//       toast.error(
//         error?.response?.data?.message ||
//           "Failed to delete class"
//       );
//     } finally {
//       setDeleting(false);
//     }
//   };

//   /* =======================================================
//      SUBMIT
//   ======================================================= */

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (saving) {
//       return;
//     }

//     if (!requireToken()) {
//       return;
//     }

//     /* -----------------------------------------------
//        CLASS NAME
//     ------------------------------------------------ */

//     if (!formData.title.trim()) {
//       toast.error(
//         "Class Name is required"
//       );

//       return;
//     }

//     /* -----------------------------------------------
//        CATEGORY
//     ------------------------------------------------ */

//     if (!formData.category_id) {
//       toast.error(
//         "Please select a Category"
//       );

//       return;
//     }

//     /* -----------------------------------------------
//        CHECK CATEGORY BELONGS TO INSTITUTE
//     ------------------------------------------------ */

//     const categoryExists =
//       trainerCategoryOptions.some(
//         (category) =>
//           String(
//             getCategoryId(category)
//           ) ===
//           String(formData.category_id)
//       );

//     if (!categoryExists) {
//       toast.error(
//         "Selected category is not assigned to this trainer"
//       );

//       return;
//     }

//     /* -----------------------------------------------
//        TRAINER
//     ------------------------------------------------ */

//     if (!formData.trainer_id) {
//       toast.error(
//         "Please select a Trainer"
//       );

//       return;
//     }

//     /* -----------------------------------------------
//        SUBCATEGORY
//     ------------------------------------------------ */

//     if (formData.subcategory_id) {
//       const validSubcategory =
//         relatedSubcategories.some(
//           (subcategory) =>
//             String(subcategory.id) ===
//             String(
//               formData.subcategory_id
//             )
//         );

//       if (!validSubcategory) {
//         toast.error(
//           "Selected subcategory does not belong to the selected category"
//         );

//         return;
//       }
//     }

//     /* -----------------------------------------------
//        DATE VALIDATION
//     ------------------------------------------------ */

//     const todayDate = getTodayDateInput();

//     if (formData.course_start_date && formData.course_start_date < todayDate) {
//       toast.error("Course start date cannot be before today");
//       return;
//     }

//     if (formData.course_end_date && formData.course_end_date < todayDate) {
//       toast.error("Course end date cannot be before today");
//       return;
//     }

//     if (
//       formData.course_start_date &&
//       formData.course_end_date &&
//       formData.course_end_date <
//         formData.course_start_date
//     ) {
//       toast.error(
//         "End date cannot be before start date"
//       );

//       return;
//     }

//     /* -----------------------------------------------
//        FORM DATA
//     ------------------------------------------------ */

//     const payload = new FormData();

//     payload.append(
//       "title",
//       formData.title.trim()
//     );

//     payload.append(
//       "description",
//       formData.description.trim()
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
//       "trainer_id",
//       formData.trainer_id
//     );

//     payload.append(
//       "price",
//       formData.price || "0"
//     );

//     payload.append(
//       "duration",
//       formData.duration || "60"
//     );

//     payload.append(
//       "level",
//       formData.level || "BEGINNER"
//     );

//     payload.append(
//       "mode",
//       formData.mode || "ONLINE"
//     );

//     payload.append(
//       "class_type",
//       formData.class_type || "LIVE"
//     );

//     payload.append(
//       "students_count",
//       formData.students_count || "0"
//     );

//     /* -----------------------------------------------
//        IMAGE
//     ------------------------------------------------ */

//     if (formData.image) {
//       payload.append(
//         "image",
//         formData.image
//       );
//     }

//     /* -----------------------------------------------
//        START DATE

//        IMPORTANT:
//        Always send YYYY-MM-DD
//     ------------------------------------------------ */

//     if (formData.course_start_date) {
//       payload.append(
//         "start_date",
//         normalizeDateForInput(
//           formData.course_start_date
//         )
//       );
//     }

//     /* -----------------------------------------------
//        END DATE
//     ------------------------------------------------ */

//     if (formData.course_end_date) {
//       payload.append(
//         "end_date",
//         normalizeDateForInput(
//           formData.course_end_date
//         )
//       );
//     }

//     /* -----------------------------------------------
//        START TIME
//     ------------------------------------------------ */

//     if (formData.start_time) {
//       payload.append(
//         "start_time",
//         formData.start_time
//       );
//     }

//     /* -----------------------------------------------
//        END TIME
//     ------------------------------------------------ */

//     if (formData.end_time) {
//       payload.append(
//         "end_time",
//         formData.end_time
//       );
//     }

//     /* -----------------------------------------------
//        AVAILABLE DAYS
//     ------------------------------------------------ */

//     formData.available_days.forEach(
//       (day) => {
//         payload.append(
//           "available_days[]",
//           day
//         );
//       }
//     );

//     try {
//       setSaving(true);

//       console.log(
//         "================================="
//       );

//       console.log(
//         "Saving Institute Class"
//       );

//       console.log(
//         Object.fromEntries(
//           payload.entries()
//         )
//       );

//       console.log(
//         "================================="
//       );

//       /* ---------------------------------------------
//          EDIT
//       ---------------------------------------------- */

//       if (editingClass?.id) {
//         await API.put(
//           `/classes/institute/${editingClass.id}`,
//           payload,
//           {
//             headers: {
//               ...getAuthConfig().headers,
//             },
//           }
//         );

//         toast.success(
//           "Class updated successfully"
//         );
//       }

//       /* ---------------------------------------------
//          CREATE
//       ---------------------------------------------- */

//       else {
//         await API.post(
//           "/classes/institute/create",
//           payload,
//           {
//             headers: {
//               ...getAuthConfig().headers,
//             },
//           }
//         );

//         toast.success(
//           "Class created successfully"
//         );
//       }

//       closeModal();

//       await fetchClasses();
//     } catch (error) {
//       console.error(
//         "Save Institute Class Error:",
//         error
//       );

//       console.error(
//         "Backend Response:",
//         error?.response?.data
//       );

//       toast.error(
//         error?.response?.data?.message ||
//           error?.message ||
//           "Failed to save class"
//       );
//     } finally {
//       setSaving(false);
//     }
//   };

//   /* =======================================================
//      UI HELPERS
//   ======================================================= */

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

//   const labelClass =
//     "block text-sm text-white mb-1";

//   /* =======================================================
//      RENDER
//   ======================================================= */

//   return (
//     <div className="min-h-screen bg-[#07080d] px-4 py-6 text-white md:px-8">
//       <div className="mx-auto max-w-[1500px]">

//         {/* =================================================
//             HEADER
//         ================================================= */}

//         <div className="mb-7 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
//           <div>
//             <div className="flex items-center gap-3">
//               <BookOpen
//                 size={32}
//                 className="text-purple-400"
//               />

//               <h1 className="text-3xl font-bold md:text-4xl">
//                 Institute Classes
//               </h1>
//             </div>

//             <p className="mt-2 text-gray-500">
//               Create and manage classes, trainers and LMS access for your institute.
//             </p>
//           </div>

//           <div className="flex items-center gap-3">

//             {/* REFRESH */}
//             <button
//               type="button"
//               onClick={fetchClasses}
//               disabled={loading}
//               className="flex h-12 items-center gap-2 rounded-xl border border-white/10 bg-[#15121f] px-4 font-semibold text-gray-300 transition hover:border-purple-500/50 hover:text-white disabled:opacity-50"
//               title="Refresh classes"
//             >
//               <RefreshCw
//                 size={18}
//                 className={loading ? "animate-spin" : ""}
//               />

//               <span className="hidden sm:inline">
//                 Refresh
//               </span>
//             </button>

//             {/* CREATE */}
//             <button
//               type="button"
//               onClick={openAddModal}
//               className="inline-flex h-12 items-center justify-center gap-2 rounded-xl px-6 font-bold text-white shadow-lg transition hover:scale-[1.02]"
//               style={{
//                 background:
//                   "linear-gradient(135deg,#9b2cff,#ff2aae)",
//               }}
//             >
//               <span className="text-xl leading-none">
//                 +
//               </span>

//               Add Class
//             </button>
//           </div>
//         </div>

//         {/* =================================================
//             SEARCH
//         ================================================= */}

//         <div className="mb-6">
//           <div className="relative w-full">
//             <Search
//               size={20}
//               className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
//             />

//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(event) =>
//                 setSearchQuery(event.target.value)
//               }
//               placeholder="Search classes..."
//               className="h-12 w-full rounded-xl border border-white/10 bg-[#15121f] pl-12 pr-12 text-sm text-white placeholder:text-gray-600 outline-none transition focus:border-purple-500"
//             />

//             {searchQuery && (
//               <button
//                 type="button"
//                 onClick={() => setSearchQuery("")}
//                 className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-white"
//                 title="Clear search"
//               >
//                 <X size={17} />
//               </button>
//             )}
//           </div>
//         </div>

//         {/* =================================================
//             TABLE
//         ================================================= */}

//         <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#10121a]">
//           <div className="overflow-x-auto">
//             <table className="w-full min-w-[1800px] border-collapse">
//               <thead>
//                 <tr className="border-b border-white/10 bg-[#15121f]">
//                   <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-bold text-gray-400">
//                     ID
//                   </th>

//                   <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-bold text-gray-400">
//                     Image
//                   </th>

//                   <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-bold text-gray-400">
//                     Class Name
//                   </th>

//                   <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-bold text-gray-400">
//                     Description
//                   </th>

//                   <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-bold text-gray-400">
//                     Trainer
//                   </th>

//                   <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-bold text-gray-400">
//                     Category
//                   </th>

//                   <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-bold text-gray-400">
//                     Subcategory
//                   </th>

//                   <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-bold text-gray-400">
//                     Class Type
//                   </th>

//                   <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-bold text-gray-400">
//                     Price
//                   </th>

//                   <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-bold text-gray-400">
//                     Duration
//                   </th>

//                   <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-bold text-gray-400">
//                     Level
//                   </th>

//                   <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-bold text-gray-400">
//                     Mode
//                   </th>

//                   <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-bold text-gray-400">
//                     Students
//                   </th>

//                   <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-bold text-gray-400">
//                     Start Date
//                   </th>

//                   <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-bold text-gray-400">
//                     End Date
//                   </th>

//                   <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-bold text-gray-400">
//                     Start Time
//                   </th>

//                   <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-bold text-gray-400">
//                     End Time
//                   </th>

//                   <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-bold text-gray-400">
//                     Days
//                   </th>

//                   <th className="whitespace-nowrap px-4 py-4 text-right text-sm font-bold text-gray-400">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {loading ? (
//                   <tr>
//                     <td
//                       colSpan={19}
//                       className="px-6 py-16 text-center text-gray-400"
//                     >
//                       Loading classes...
//                     </td>
//                   </tr>
//                 ) : filteredClasses.length === 0 ? (
//                   <tr>
//                     <td
//                       colSpan={19}
//                       className="px-6 py-16 text-center"
//                     >
//                       <div className="flex flex-col items-center justify-center">
//                         <BookOpen
//                           size={42}
//                           className="mb-3 text-gray-700"
//                         />

//                         <p className="font-semibold text-gray-400">
//                           {searchQuery
//                             ? "No classes found."
//                             : "No classes created yet."}
//                         </p>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   filteredClasses.map((item) => {
//                     const imageUrl = getImageUrl(item?.image);
//                     const days = parseDays(item?.available_days);
//                     const classType = getClassType(item);

//                     return (
//                       <tr
//                         key={item.id}
//                         className="border-b border-white/5 transition last:border-b-0 hover:bg-white/[0.025]"
//                       >
//                         {/* ID */}
//                         <td className="whitespace-nowrap px-4 py-5 text-sm text-gray-400">
//                           {item.id}
//                         </td>

//                         {/* IMAGE */}
//                         <td className="whitespace-nowrap px-4 py-5">
//                           {imageUrl ? (
//                             <img
//                               src={imageUrl}
//                               alt={item.title || "Class"}
//                               className="h-12 w-12 rounded-xl border border-white/10 object-cover"
//                               onError={(event) => {
//                                 event.currentTarget.style.display =
//                                   "none";
//                               }}
//                             />
//                           ) : (
//                             <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-purple-500/20 bg-purple-500/10">
//                               <BookOpen
//                                 size={20}
//                                 className="text-purple-400"
//                               />
//                             </div>
//                           )}
//                         </td>

//                         {/* CLASS NAME */}
//                         <td className="whitespace-nowrap px-4 py-5 text-sm font-bold text-white">
//                           {item.title || "-"}
//                         </td>

//                         {/* DESCRIPTION */}
//                         <td className="max-w-[260px] whitespace-nowrap px-4 py-5 text-sm text-gray-400">
//                           <div className="max-w-[260px] overflow-hidden text-ellipsis whitespace-nowrap">
//                             {item.description || "-"}
//                           </div>
//                         </td>

//                         {/* TRAINER */}
//                         <td className="whitespace-nowrap px-4 py-5 text-sm text-gray-300">
//                           {item.trainer_name || "-"}
//                         </td>

//                         {/* CATEGORY */}
//                         <td className="whitespace-nowrap px-4 py-5 text-sm text-gray-300">
//                           {item.category_name || item.category || "-"}
//                         </td>

//                         {/* SUBCATEGORY */}
//                         <td className="whitespace-nowrap px-4 py-5 text-sm text-gray-300">
//                           {item.subcategory_name ||
//                             item.subcategory ||
//                             "-"}
//                         </td>

//                         {/* CLASS TYPE */}
//                         <td className="whitespace-nowrap px-4 py-5">
//                           <span
//                             className={[
//                               "inline-flex items-center whitespace-nowrap rounded-lg border px-3 py-1.5 text-xs font-bold",
//                               classType === "RECORDING"
//                                 ? "border-pink-500/20 bg-pink-500/10 text-pink-300"
//                                 : "border-purple-500/20 bg-purple-500/10 text-purple-300",
//                             ].join(" ")}
//                           >
//                             {classType === "RECORDING"
//                               ? "Recorded Class"
//                               : "Live Class"}
//                           </span>
//                         </td>

//                         {/* PRICE */}
//                         <td className="whitespace-nowrap px-4 py-5 text-sm font-semibold text-white">
//                           {item.price !== undefined &&
//                           item.price !== null
//                             ? `₹${Number(item.price).toFixed(2)}`
//                             : "-"}
//                         </td>

//                         {/* DURATION */}
//                         <td className="whitespace-nowrap px-4 py-5 text-sm text-gray-300">
//                           {item.duration
//                             ? `${item.duration} min`
//                             : "-"}
//                         </td>

//                         {/* LEVEL */}
//                         <td className="whitespace-nowrap px-4 py-5 text-sm text-gray-300">
//                           {item.level || "BEGINNER"}
//                         </td>

//                         {/* MODE */}
//                         <td className="whitespace-nowrap px-4 py-5 text-sm text-gray-300">
//                           {String(item.mode || "ONLINE").toUpperCase() ===
//                           "OFFLINE"
//                             ? "Offline"
//                             : "Online"}
//                         </td>

//                         {/* STUDENTS */}
//                         <td className="whitespace-nowrap px-4 py-5 text-sm text-gray-300">
//                           {item.students_count ??
//                             item.max_students ??
//                             0}
//                         </td>

//                         {/* START DATE */}
//                         <td className="whitespace-nowrap px-4 py-5 text-sm text-gray-300">
//                           {formatDate(item.start_date)}
//                         </td>

//                         {/* END DATE */}
//                         <td className="whitespace-nowrap px-4 py-5 text-sm text-gray-300">
//                           {formatDate(item.end_date)}
//                         </td>

//                         {/* START TIME */}
//                         <td className="whitespace-nowrap px-4 py-5 text-sm font-semibold text-gray-300">
//                           <span className="inline-flex items-center gap-1">
//                             <Clock
//                               size={14}
//                               className="text-gray-500"
//                             />
//                             {formatTime(item.start_time)}
//                           </span>
//                         </td>

//                         {/* END TIME */}
//                         <td className="whitespace-nowrap px-4 py-5 text-sm font-semibold text-gray-300">
//                           <span className="inline-flex items-center gap-1">
//                             <Clock size={14} className="text-gray-500" />
//                             {formatTime(item.end_time || item.default_end_time)}
//                           </span>
//                         </td>

//                         {/* DAYS */}
//                         <td className="whitespace-nowrap px-4 py-5">
//                           <div className="flex flex-nowrap items-center gap-1">
//                             {days.length > 0
//                               ? days.map((day) => (
//                                   <span
//                                     key={day}
//                                     className="inline-flex shrink-0 whitespace-nowrap rounded-lg border border-purple-500/20 bg-purple-500/10 px-2 py-1 text-xs font-semibold text-purple-300"
//                                   >
//                                     {DAYS.find(
//                                       (entry) =>
//                                         entry.value === day
//                                     )?.label || day}
//                                   </span>
//                                 ))
//                               : "-"}
//                           </div>
//                         </td>

//                         {/* ACTIONS */}
//                         <td className="whitespace-nowrap px-4 py-5">
//                           <div className="flex items-center justify-end gap-2">

//                             {/* LMS */}
//                             <button
//                               type="button"
//                               onClick={() =>
//                                 navigate(
//                                   `/institute/lms/${item.id}`
//                                 )
//                               }
//                               className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/10 text-blue-300 transition hover:bg-blue-500/20"
//                               title="Manage LMS"
//                             >
//                               <BookOpen size={17} />
//                             </button>

//                             {/* EDIT */}
//                             <button
//                               type="button"
//                               onClick={() =>
//                                 openEditModal(item)
//                               }
//                               className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-purple-500/30 bg-purple-500/10 text-purple-300 transition hover:bg-purple-500/20"
//                               title="Edit"
//                             >
//                               <Edit size={17} />
//                             </button>

//                             {/* DELETE */}
//                             <button
//                               type="button"
//                               disabled={deleting}
//                               onClick={() =>
//                                 openDeleteModal(item)
//                               }
//                               className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 transition hover:bg-red-500/20 disabled:opacity-50"
//                               title="Delete"
//                             >
//                               <Trash2 size={17} />
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     );
//                   })
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//       {/* ===================================================
//           ADD / EDIT MODAL
//       =================================================== */}

//       {showModal && (
//         <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">

//           <div className="w-full max-w-[720px] max-h-[92vh] bg-[#211c30] rounded-2xl shadow-2xl overflow-hidden">

//             {/* HEADER */}
//             <div className="flex items-center justify-between p-6 border-b border-[#3a3448]">

//               <div>

//                 <h2 className="text-2xl font-bold">
//                   {editingClass
//                     ? "Edit Class"
//                     : "Add Class"}
//                 </h2>

//                 <p className="text-sm text-gray-400 mt-1">
//                   Assign a trainer to the class
//                   for LMS management.
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

//             {/* FORM */}
//             <div className="overflow-y-auto max-h-[78vh] p-6">

//               <form onSubmit={handleSubmit}>

//                 {/* CLASS NAME */}
//                 <label className={labelClass}>
//                   Class Name *
//                 </label>

//                 <input
//                   type="text"
//                   value={formData.title}
//                   onChange={(event) =>
//                     updateForm(
//                       "title",
//                       event.target.value
//                     )
//                   }
//                   className={inputClass}
//                   placeholder="Enter class name"
//                   required
//                 />

//                 {/* DESCRIPTION */}
//                 <label className={labelClass}>
//                   Description
//                 </label>

//                 <textarea
//                   value={
//                     formData.description
//                   }
//                   onChange={(event) =>
//                     updateForm(
//                       "description",
//                       event.target.value
//                     )
//                   }
//                   className={inputClass}
//                   rows={3}
//                   placeholder="Enter class description"
//                 />
// {/* IMAGE */}
//                 <label className={labelClass}>
//                   Class Image
//                 </label>

//                 {editingClass?.image && (
//                   <img
//                     src={getImageUrl(
//                       editingClass.image
//                     )}
//                     alt="Current class"
//                     className="w-24 h-24 object-cover rounded-xl mb-2 border border-[#333]"
//                     onError={(event) => {
//                       event.currentTarget.style.display =
//                         "none";
//                     }}
//                   />
//                 )}

//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={(event) =>
//                     updateForm(
//                       "image",
//                       event.target.files?.[0] ||
//                         null
//                     )
//                   }
//                   className="w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white file:mr-4 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-purple-500/20 file:text-purple-300"
//                 />

//                 {/* TRAINER */}
//                 <label className={labelClass}>
//                   Trainer *
//                 </label>

//                 <select
//                   value={
//                     formData.trainer_id
//                   }
//                   onChange={handleTrainerChange}
//                   className={selectClass}
//                   required
//                   disabled={
//                     dropdownLoading
//                   }
//                 >

//                   <option value="">
//                     {dropdownLoading
//                       ? "Loading trainers..."
//                       : trainers.length
//                       ? "Select Trainer"
//                       : "No trainers available"}
//                   </option>

//                   {trainers.map(
//                     (trainer) => (
//                       <option
//                         key={getTrainerId(
//                           trainer
//                         )}
//                         value={getTrainerId(
//                           trainer
//                         )}
//                       >
//                         {getTrainerName(
//                           trainer
//                         )}
//                       </option>
//                     )
//                   )}

//                 </select>

//                 {/* CATEGORY + SUBCATEGORY */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

//                   {/* CATEGORY */}
//                   <div>

//                     <label
//                       className={
//                         labelClass
//                       }
//                     >
//                       Category *
//                     </label>

//                     <select
//                       value={
//                         formData.category_id
//                       }
//                       onChange={
//                         handleCategoryChange
//                       }
//                       className={
//                         selectClass
//                       }
//                       required
//                       disabled={
//                         dropdownLoading ||
//                         !formData.trainer_id ||
//                         trainerCategoryOptions.length === 0
//                       }
//                     >

//                       <option value="">
//                         {dropdownLoading
//                           ? "Loading categories..."
//                           : !formData.trainer_id
//                           ? "Select Trainer First"
//                           : trainerCategoryOptions.length
//                           ? "Select Category"
//                           : "No categories assigned to this trainer"}
//                       </option>

//                       {trainerCategoryOptions.map(
//                         (category) => (
//                           <option
//                             key={getCategoryId(
//                               category
//                             )}
//                             value={getCategoryId(
//                               category
//                             )}
//                           >
//                             {category.name}
//                           </option>
//                         )
//                       )}

//                     </select>

//                   </div>

//                   {/* SUBCATEGORY */}
//                   <div>

//                     <label
//                       className={
//                         labelClass
//                       }
//                     >
//                       Subcategory
//                     </label>

//                     <select
//                       value={
//                         formData.subcategory_id
//                       }
//                       onChange={(event) =>
//                         updateForm(
//                           "subcategory_id",
//                           event.target.value
//                         )
//                       }
//                       className={
//                         selectClass
//                       }
//                       disabled={
//                         !formData.category_id ||
//                         relatedSubcategories.length ===
//                           0
//                       }
//                     >

//                       <option value="">
//                         {!formData.category_id
//                           ? "Select Category First"
//                           : relatedSubcategories.length
//                           ? "Select Subcategory"
//                           : "No Subcategories"}
//                       </option>

//                       {relatedSubcategories.map(
//                         (subcategory) => (
//                           <option
//                             key={
//                               subcategory.id
//                             }
//                             value={
//                               subcategory.id
//                             }
//                           >
//                             {
//                               subcategory.name
//                             }
//                           </option>
//                         )
//                       )}

//                     </select>

//                   </div>

//                 </div>

//                 {/* CLASS TYPE */}
//                 <label className={labelClass}>
//                   Class Type *
//                 </label>
//                 <select
//                   value={formData.class_type}
//                   onChange={(event) =>
//                     updateForm("class_type", event.target.value)
//                   }
//                   className={selectClass}
//                   required
//                 >
//                   <option value="LIVE">Live Class</option>
//                   <option value="RECORDING">Recorded Class</option>
//                 </select>

//                 {/* PRICE + DURATION */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

//                   <div>

//                     <label
//                       className={
//                         labelClass
//                       }
//                     >
//                       Price
//                     </label>

//                     <input
//                       type="number"
//                       min="0"
//                       value={
//                         formData.price
//                       }
//                       onChange={(event) =>
//                         updateForm(
//                           "price",
//                           event.target.value
//                         )
//                       }
//                       className={
//                         inputClass
//                       }
//                       placeholder="0"
//                     />

//                   </div>

//                   <div>

//                     <label
//                       className={
//                         labelClass
//                       }
//                     >
//                       Duration (Minutes)
//                     </label>

//                     <input
//                       type="number"
//                       min="1"
//                       value={
//                         formData.duration
//                       }
//                       onChange={(event) =>
//                         updateForm(
//                           "duration",
//                           event.target.value
//                         )
//                       }
//                       className={
//                         inputClass
//                       }
//                       placeholder="60"
//                     />

//                   </div>

//                 </div>

//                 {/* DATES */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

//                   <div>

//                     <label
//                       className={
//                         labelClass
//                       }
//                     >
//                       Course Start Date
//                     </label>

//                     <input
//                       type="date"
//                       min={getTodayDateInput()}
//                       value={
//                         formData.course_start_date
//                       }
//                       onChange={(event) =>
//                         updateForm(
//                           "course_start_date",
//                           event.target.value
//                         )
//                       }
//                       className={
//                         inputClass
//                       }
//                     />

//                   </div>

//                   <div>

//                     <label
//                       className={
//                         labelClass
//                       }
//                     >
//                       Course End Date
//                     </label>

//                     <input
//                       type="date"
//                       value={
//                         formData.course_end_date
//                       }
//                       min={
//                         formData.course_start_date &&
//                         formData.course_start_date > getTodayDateInput()
//                           ? formData.course_start_date
//                           : getTodayDateInput()
//                       }
//                       onChange={(event) =>
//                         updateForm(
//                           "course_end_date",
//                           event.target.value
//                         )
//                       }
//                       className={
//                         inputClass
//                       }
//                     />

//                   </div>

//                 </div>

//                 {/* START TIME */}
//                 <label className={labelClass}>
//                   Start Time
//                 </label>

//                 <input
//                   type="time"
//                   value={
//                     formData.start_time
//                   }
//                   onChange={(event) =>
//                     updateForm(
//                       "start_time",
//                       event.target.value
//                     )
//                   }
//                   className={inputClass}
//                 />

//                 {/* END TIME */}
//                 <label className={labelClass}>
//                   End Time
//                 </label>

//                 <input
//                   type="time"
//                   value={formData.end_time}
//                   min={formData.start_time || undefined}
//                   onChange={(event) => updateForm("end_time", event.target.value)}
//                   className={inputClass}
//                 />

//                 {/* AVAILABLE DAYS */}
//                 <label className={labelClass}>
//                   Available Days
//                 </label>

//                 <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 mt-2 mb-4">

//                   {DAYS.map((day) => {
//                     const checked =
//                       formData.available_days.includes(
//                         day.value
//                       );

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
//                           onChange={() =>
//                             toggleDay(
//                               day.value
//                             )
//                           }
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

//                         {day.label.slice(
//                           0,
//                           3
//                         )}

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
//                   value={
//                     formData.students_count
//                   }
//                   onChange={(event) =>
//                     updateForm(
//                       "students_count",
//                       event.target.value
//                     )
//                   }
//                   className={inputClass}
//                   placeholder="0"
//                 />

//                 {/* LEVEL + MODE */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

//                   {/* LEVEL */}
//                   <div>

//                     <label
//                       className={
//                         labelClass
//                       }
//                     >
//                       Level
//                     </label>

//                     <select
//                       value={
//                         formData.level
//                       }
//                       onChange={(event) =>
//                         updateForm(
//                           "level",
//                           event.target.value
//                         )
//                       }
//                       className={
//                         selectClass
//                       }
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
//                       className={
//                         labelClass
//                       }
//                     >
//                       Mode
//                     </label>

//                     <select
//                       value={
//                         formData.mode
//                       }
//                       onChange={(event) =>
//                         updateForm(
//                           "mode",
//                           event.target.value
//                         )
//                       }
//                       className={
//                         selectClass
//                       }
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
//                     disabled={
//                       saving ||
//                       dropdownLoading
//                     }
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

//       {/* ===================================================
//           DELETE MODAL
//       =================================================== */}

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

//                 Are you sure you want to
//                 delete{" "}

//                 <span className="text-white font-semibold">

//                   {deletingClass?.title ||
//                     "this class"}

//                 </span>

//                 ?

//               </p>

//               <div className="flex gap-3">

//                 <button
//                   type="button"
//                   onClick={
//                     closeDeleteModal
//                   }
//                   disabled={deleting}
//                   className="flex-1 px-5 py-3 rounded-xl border border-[#3a3650] text-gray-300 hover:bg-[#2a2640] disabled:opacity-50"
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   type="button"
//                   onClick={
//                     confirmDelete
//                   }
//                   disabled={deleting}
//                   className="flex-1 px-5 py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 font-bold disabled:opacity-50"
//                 >
//                   {deleting
//                     ? "Deleting..."
//                     : "Delete"}
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
  RefreshCw,
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
  image: null,

  category_id: "",
  subcategory_id: "",
  trainer_id: "",

  price: "",
  duration: "60",

  level: "BEGINNER",
  mode: "ONLINE",
  class_type: "LIVE",

  students_count: "",

  course_start_date: "",
  course_end_date: "",

  start_time: "",
  end_time: "",

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

const getTodayDateInput = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

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

/* Trainer specialization helpers. The /trainers/institute API must return
   specializations: [{ category_id, subcategory_id }], or category_ids and
   subcategory_ids, for the selected trainer. */
const getTrainerSpecializations = (trainer) => {
  const raw =
    trainer?.specializations ??
    trainer?.specialization_pairs ??
    trainer?.trainer_specializations;

  if (Array.isArray(raw)) {
    return raw.map((item) => ({
      category_id: String(
        item?.category_id ?? item?.categoryId ?? item?.category?.id ?? ""
      ),
      subcategory_id: String(
        item?.subcategory_id ?? item?.subcategoryId ?? item?.subcategory?.id ?? ""
      ),
    })).filter((item) => item.category_id && item.subcategory_id);
  }

  const categoryIds = Array.isArray(trainer?.category_ids)
    ? trainer.category_ids
    : Array.isArray(trainer?.categoryIds)
    ? trainer.categoryIds
    : [];
  const subcategoryIds = Array.isArray(trainer?.subcategory_ids)
    ? trainer.subcategory_ids
    : Array.isArray(trainer?.subcategoryIds)
    ? trainer.subcategoryIds
    : [];

  return subcategoryIds.map((subcategoryId, index) => ({
    category_id: String(categoryIds[index] ?? ""),
    subcategory_id: String(subcategoryId ?? ""),
  })).filter((item) => item.category_id && item.subcategory_id);
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

const getClassType = (item) => {
  const value =
    item?.class_type ??
    item?.classType ??
    item?.type ??
    "LIVE";

  const normalized = String(value).trim().toUpperCase();

  // Backend accepts LIVE or RECORDING. Map legacy RECORDED values
  // to RECORDING so editing older classes remains compatible.
  return normalized === "RECORDED" ? "RECORDING" : normalized;
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
     TRAINER-SPECIFIC CATEGORY / SUBCATEGORY OPTIONS
  ======================================================= */

  const selectedTrainer = useMemo(
    () => trainers.find((trainer) =>
      String(getTrainerId(trainer)) === String(formData.trainer_id)
    ),
    [trainers, formData.trainer_id]
  );

  const trainerSpecializations = useMemo(
    () => getTrainerSpecializations(selectedTrainer),
    [selectedTrainer]
  );

  const trainerCategoryOptions = useMemo(() => {
    const ids = new Set(trainerSpecializations.map((item) => item.category_id));
    return categories.filter((category) => ids.has(String(getCategoryId(category))));
  }, [categories, trainerSpecializations]);

  const relatedSubcategories = useMemo(() => {
    if (!formData.trainer_id || !formData.category_id) return [];

    const allowedIds = new Set(
      trainerSpecializations
        .filter((item) => item.category_id === String(formData.category_id))
        .map((item) => item.subcategory_id)
    );

    return subcategories.filter((subcategory) =>
      allowedIds.has(String(subcategory?.id ?? subcategory?.subcategory_id ?? subcategory?.subcategoryId ?? "")) &&
      String(getSubcategoryCategoryId(subcategory)) === String(formData.category_id)
    );
  }, [subcategories, formData.category_id, formData.trainer_id, trainerSpecializations]);

  // Automatically select the category when the selected trainer
  // has exactly one category. This also covers opening/editing a class
  // after the trainer records have loaded.
  useEffect(() => {
    if (!formData.trainer_id || trainerCategoryOptions.length !== 1) {
      return;
    }

    const onlyCategoryId = String(
      getCategoryId(trainerCategoryOptions[0])
    );

    if (String(formData.category_id) !== onlyCategoryId) {
      setFormData((previous) => ({
        ...previous,
        category_id: onlyCategoryId,
        subcategory_id: "",
      }));
    }
  }, [
    formData.trainer_id,
    formData.category_id,
    trainerCategoryOptions,
  ]);

  // Automatically select the only subcategory available for the
  // selected trainer and category. This also works when editing a class
  // and the trainer/category data becomes available after the modal opens.
  useEffect(() => {
    if (
      !formData.trainer_id ||
      !formData.category_id ||
      relatedSubcategories.length !== 1
    ) {
      return;
    }

    const onlySubcategory = relatedSubcategories[0];
    const onlySubcategoryId = String(
      onlySubcategory?.id ??
        onlySubcategory?.subcategory_id ??
        onlySubcategory?.subcategoryId ??
        ""
    );

    if (
      onlySubcategoryId &&
      String(formData.subcategory_id) !== onlySubcategoryId
    ) {
      setFormData((previous) => ({
        ...previous,
        subcategory_id: onlySubcategoryId,
      }));
    }
  }, [
    formData.trainer_id,
    formData.category_id,
    formData.subcategory_id,
    relatedSubcategories,
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

  const handleTrainerChange = (event) => {
    const trainerId = event.target.value;
    const trainer = trainers.find(
      (item) => String(getTrainerId(item)) === String(trainerId)
    );
    const specializations = getTrainerSpecializations(trainer);

    // Use distinct categories assigned to this trainer.
    const trainerCategoryIds = [
      ...new Set(
        specializations
          .map((item) => String(item.category_id || ""))
          .filter(Boolean)
      ),
    ];

    // If the trainer has exactly one category, select it immediately.
    const nextCategoryId =
      trainerCategoryIds.length === 1 &&
      categories.some(
        (category) =>
          String(getCategoryId(category)) === trainerCategoryIds[0]
      )
        ? trainerCategoryIds[0]
        : "";

    setFormData((previous) => ({
      ...previous,
      trainer_id: trainerId,
      category_id: nextCategoryId,
      subcategory_id: "",
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

      class_type: getClassType(item),

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

      end_time:
        item?.end_time ||
        item?.default_end_time ||
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

    if (!formData.trainer_id) {
      toast.error("Please select a Trainer Name");
      return;
    }

    if (!formData.category_id) {
      toast.error("Please select a Category");
      return;
    }

    if (!formData.subcategory_id) {
      toast.error("Please select a Subcategory");
      return;
    }

    if (!formData.class_type) {
      toast.error("Please select a Class Type");
      return;
    }

    if (!formData.course_start_date || !formData.course_end_date) {
      toast.error("Start Date and End Date are required");
      return;
    }

    if (!formData.start_time || !formData.end_time) {
      toast.error("Start Time and End Time are required");
      return;
    }

    if (formData.end_time <= formData.start_time) {
      toast.error("End Time must be later than Start Time");
      return;
    }

    if (formData.price === "" || Number(formData.price) < 0) {
      toast.error("Please enter a valid Price");
      return;
    }

    if (!formData.available_days.length) {
      toast.error("Please select at least one Available Day");
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
      trainerCategoryOptions.some(
        (category) =>
          String(
            getCategoryId(category)
          ) ===
          String(formData.category_id)
      );

    if (!categoryExists) {
      toast.error(
        "Selected category is not assigned to this trainer"
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

    const todayDate = getTodayDateInput();

    if (formData.course_start_date && formData.course_start_date < todayDate) {
      toast.error("Course start date cannot be before today");
      return;
    }

    if (formData.course_end_date && formData.course_end_date < todayDate) {
      toast.error("Course end date cannot be before today");
      return;
    }

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
       DUPLICATE / SCHEDULE CONFLICT CHECK
       Prevent the same trainer from being assigned to
       overlapping classes on any of the same weekdays.
       When editing, ignore the class currently being edited.
    ------------------------------------------------ */

    const selectedDays = new Set(
      (formData.available_days || []).map((day) => String(day).toUpperCase())
    );
    const newStartDate = normalizeDateForInput(formData.course_start_date);
    const newEndDate = normalizeDateForInput(formData.course_end_date);
    const newStartTime = String(formData.start_time || "");
    const newEndTime = String(formData.end_time || "");

    const hasScheduleConflict = classes.some((existingClass) => {
      if (
        editingClass?.id != null &&
        String(existingClass?.id) === String(editingClass.id)
      ) {
        return false;
      }

      const existingTrainerId = getClassTrainerId(existingClass);
      if (String(existingTrainerId) !== String(formData.trainer_id)) {
        return false;
      }

      const existingDays = new Set(
        parseDays(existingClass?.available_days).map((day) => String(day).toUpperCase())
      );
      const sharesDay = [...selectedDays].some((day) => existingDays.has(day));
      if (!sharesDay) return false;

      const existingStartDate = normalizeDateForInput(
        existingClass?.start_date ?? existingClass?.course_start_date
      );
      const existingEndDate = normalizeDateForInput(
        existingClass?.end_date ?? existingClass?.course_end_date
      );

      // Date ranges overlap when each class starts before the other ends.
      const datesOverlap = Boolean(
        existingStartDate && existingEndDate &&
        newStartDate && newEndDate &&
        newStartDate <= existingEndDate &&
        existingStartDate <= newEndDate
      );
      if (!datesOverlap) return false;

      const existingStartTime = String(
        existingClass?.start_time ?? existingClass?.default_start_time ?? ""
      ).slice(0, 5);
      const existingEndTime = String(
        existingClass?.end_time ?? existingClass?.default_end_time ?? ""
      ).slice(0, 5);

      // Only block if the time ranges overlap, allowing separate classes
      // on the same day when they have different time slots.
      const timesOverlap = Boolean(
        existingStartTime && existingEndTime &&
        newStartTime < existingEndTime &&
        existingStartTime < newEndTime
      );

      return timesOverlap;
    });

    if (hasScheduleConflict) {
      toast.error(
        "This trainer already has a class on one or more selected days during the same date and time range. Choose different days or a different time."
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
      "class_type",
      formData.class_type || "LIVE"
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
       END TIME
    ------------------------------------------------ */

    if (formData.end_time) {
      payload.append(
        "end_time",
        formData.end_time
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
    <div className="min-h-screen bg-[#07080d] px-4 py-6 text-white md:px-8">
      <div className="mx-auto max-w-[1500px]">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-7 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <BookOpen
                size={32}
                className="text-purple-400"
              />

              <h1 className="text-3xl font-bold md:text-4xl">
                Institute Classes
              </h1>
            </div>

            <p className="mt-2 text-gray-500">
              Create and manage classes, trainers and LMS access for your institute.
            </p>
          </div>

          <div className="flex items-center gap-3">

            {/* REFRESH */}
            <button
              type="button"
              onClick={fetchClasses}
              disabled={loading}
              className="flex h-12 items-center gap-2 rounded-xl border border-white/10 bg-[#15121f] px-4 font-semibold text-gray-300 transition hover:border-purple-500/50 hover:text-white disabled:opacity-50"
              title="Refresh classes"
            >
              <RefreshCw
                size={18}
                className={loading ? "animate-spin" : ""}
              />

              <span className="hidden sm:inline">
                Refresh
              </span>
            </button>

            {/* CREATE */}
            <button
              type="button"
              onClick={openAddModal}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl px-6 font-bold text-white shadow-lg transition hover:scale-[1.02]"
              style={{
                background:
                  "linear-gradient(135deg,#9b2cff,#ff2aae)",
              }}
            >
              <span className="text-xl leading-none">
                +
              </span>

              Add Class
            </button>
          </div>
        </div>

        {/* =================================================
            SEARCH
        ================================================= */}

        <div className="mb-6">
          <div className="relative w-full">
            <Search
              size={20}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            />

            <input
              type="text"
              value={searchQuery}
              onChange={(event) =>
                setSearchQuery(event.target.value)
              }
              placeholder="Search classes..."
              className="h-12 w-full rounded-xl border border-white/10 bg-[#15121f] pl-12 pr-12 text-sm text-white placeholder:text-gray-600 outline-none transition focus:border-purple-500"
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-white"
                title="Clear search"
              >
                <X size={17} />
              </button>
            )}
          </div>
        </div>

        {/* =================================================
            TABLE
        ================================================= */}

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#10121a]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1800px] border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-[#15121f]">
                  <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-bold text-gray-400">
                    ID
                  </th>

                  <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-bold text-gray-400">
                    Image
                  </th>

                  <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-bold text-gray-400">
                    Class Name
                  </th>

                  <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-bold text-gray-400">
                    Description
                  </th>

                  <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-bold text-gray-400">
                    Trainer
                  </th>

                  <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-bold text-gray-400">
                    Category
                  </th>

                  <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-bold text-gray-400">
                    Subcategory
                  </th>

                  <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-bold text-gray-400">
                    Class Type
                  </th>

                  <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-bold text-gray-400">
                    Price
                  </th>

                  <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-bold text-gray-400">
                    Duration
                  </th>

                  <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-bold text-gray-400">
                    Level
                  </th>

                  <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-bold text-gray-400">
                    Mode
                  </th>

                  <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-bold text-gray-400">
                    Students
                  </th>

                  <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-bold text-gray-400">
                    Start Date
                  </th>

                  <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-bold text-gray-400">
                    End Date
                  </th>

                  <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-bold text-gray-400">
                    Start Time
                  </th>

                  <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-bold text-gray-400">
                    End Time
                  </th>

                  <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-bold text-gray-400">
                    Days
                  </th>

                  <th className="whitespace-nowrap px-4 py-4 text-right text-sm font-bold text-gray-400">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan={19}
                      className="px-6 py-16 text-center text-gray-400"
                    >
                      Loading classes...
                    </td>
                  </tr>
                ) : filteredClasses.length === 0 ? (
                  <tr>
                    <td
                      colSpan={19}
                      className="px-6 py-16 text-center"
                    >
                      <div className="flex flex-col items-center justify-center">
                        <BookOpen
                          size={42}
                          className="mb-3 text-gray-700"
                        />

                        <p className="font-semibold text-gray-400">
                          {searchQuery
                            ? "No classes found."
                            : "No classes created yet."}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredClasses.map((item) => {
                    const imageUrl = getImageUrl(item?.image);
                    const days = parseDays(item?.available_days);
                    const classType = getClassType(item);

                    return (
                      <tr
                        key={item.id}
                        className="border-b border-white/5 transition last:border-b-0 hover:bg-white/[0.025]"
                      >
                        {/* ID */}
                        <td className="whitespace-nowrap px-4 py-5 text-sm text-gray-400">
                          {item.id}
                        </td>

                        {/* IMAGE */}
                        <td className="whitespace-nowrap px-4 py-5">
                          {imageUrl ? (
                            <img
                              src={imageUrl}
                              alt={item.title || "Class"}
                              className="h-12 w-12 rounded-xl border border-white/10 object-cover"
                              onError={(event) => {
                                event.currentTarget.style.display =
                                  "none";
                              }}
                            />
                          ) : (
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-purple-500/20 bg-purple-500/10">
                              <BookOpen
                                size={20}
                                className="text-purple-400"
                              />
                            </div>
                          )}
                        </td>

                        {/* CLASS NAME */}
                        <td className="whitespace-nowrap px-4 py-5 text-sm font-bold text-white">
                          {item.title || "-"}
                        </td>

                        {/* DESCRIPTION */}
                        <td className="max-w-[260px] whitespace-nowrap px-4 py-5 text-sm text-gray-400">
                          <div className="max-w-[260px] overflow-hidden text-ellipsis whitespace-nowrap">
                            {item.description || "-"}
                          </div>
                        </td>

                        {/* TRAINER */}
                        <td className="whitespace-nowrap px-4 py-5 text-sm text-gray-300">
                          {item.trainer_name || "-"}
                        </td>

                        {/* CATEGORY */}
                        <td className="whitespace-nowrap px-4 py-5 text-sm text-gray-300">
                          {item.category_name || item.category || "-"}
                        </td>

                        {/* SUBCATEGORY */}
                        <td className="whitespace-nowrap px-4 py-5 text-sm text-gray-300">
                          {item.subcategory_name ||
                            item.subcategory ||
                            "-"}
                        </td>

                        {/* CLASS TYPE */}
                        <td className="whitespace-nowrap px-4 py-5">
                          <span
                            className={[
                              "inline-flex items-center whitespace-nowrap rounded-lg border px-3 py-1.5 text-xs font-bold",
                              classType === "RECORDING"
                                ? "border-pink-500/20 bg-pink-500/10 text-pink-300"
                                : "border-purple-500/20 bg-purple-500/10 text-purple-300",
                            ].join(" ")}
                          >
                            {classType === "RECORDING"
                              ? "Recorded Class"
                              : "Live Class"}
                          </span>
                        </td>

                        {/* PRICE */}
                        <td className="whitespace-nowrap px-4 py-5 text-sm font-semibold text-white">
                          {item.price !== undefined &&
                          item.price !== null
                            ? `₹${Number(item.price).toFixed(2)}`
                            : "-"}
                        </td>

                        {/* DURATION */}
                        <td className="whitespace-nowrap px-4 py-5 text-sm text-gray-300">
                          {item.duration
                            ? `${item.duration} min`
                            : "-"}
                        </td>

                        {/* LEVEL */}
                        <td className="whitespace-nowrap px-4 py-5 text-sm text-gray-300">
                          {item.level || "BEGINNER"}
                        </td>

                        {/* MODE */}
                        <td className="whitespace-nowrap px-4 py-5 text-sm text-gray-300">
                          {String(item.mode || "ONLINE").toUpperCase() ===
                          "OFFLINE"
                            ? "Offline"
                            : "Online"}
                        </td>

                        {/* STUDENTS */}
                        <td className="whitespace-nowrap px-4 py-5 text-sm text-gray-300">
                          {item.students_count ??
                            item.max_students ??
                            0}
                        </td>

                        {/* START DATE */}
                        <td className="whitespace-nowrap px-4 py-5 text-sm text-gray-300">
                          {formatDate(item.start_date)}
                        </td>

                        {/* END DATE */}
                        <td className="whitespace-nowrap px-4 py-5 text-sm text-gray-300">
                          {formatDate(item.end_date)}
                        </td>

                        {/* START TIME */}
                        <td className="whitespace-nowrap px-4 py-5 text-sm font-semibold text-gray-300">
                          <span className="inline-flex items-center gap-1">
                            <Clock
                              size={14}
                              className="text-gray-500"
                            />
                            {formatTime(item.start_time)}
                          </span>
                        </td>

                        {/* END TIME */}
                        <td className="whitespace-nowrap px-4 py-5 text-sm font-semibold text-gray-300">
                          <span className="inline-flex items-center gap-1">
                            <Clock size={14} className="text-gray-500" />
                            {formatTime(item.end_time || item.default_end_time)}
                          </span>
                        </td>

                        {/* DAYS */}
                        <td className="whitespace-nowrap px-4 py-5">
                          <div className="flex flex-nowrap items-center gap-1">
                            {days.length > 0
                              ? days.map((day) => (
                                  <span
                                    key={day}
                                    className="inline-flex shrink-0 whitespace-nowrap rounded-lg border border-purple-500/20 bg-purple-500/10 px-2 py-1 text-xs font-semibold text-purple-300"
                                  >
                                    {DAYS.find(
                                      (entry) =>
                                        entry.value === day
                                    )?.label || day}
                                  </span>
                                ))
                              : "-"}
                          </div>
                        </td>

                        {/* ACTIONS */}
                        <td className="whitespace-nowrap px-4 py-5">
                          <div className="flex items-center justify-end gap-2">

                            {/* LMS */}
                            <button
                              type="button"
                              onClick={() =>
                                navigate(
                                  `/institute/lms/${item.id}`
                                )
                              }
                              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/10 text-blue-300 transition hover:bg-blue-500/20"
                              title="Manage LMS"
                            >
                              <BookOpen size={17} />
                            </button>

                            {/* EDIT */}
                            <button
                              type="button"
                              onClick={() =>
                                openEditModal(item)
                              }
                              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-purple-500/30 bg-purple-500/10 text-purple-300 transition hover:bg-purple-500/20"
                              title="Edit"
                            >
                              <Edit size={17} />
                            </button>

                            {/* DELETE */}
                            <button
                              type="button"
                              disabled={deleting}
                              onClick={() =>
                                openDeleteModal(item)
                              }
                              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 transition hover:bg-red-500/20 disabled:opacity-50"
                              title="Delete"
                            >
                              <Trash2 size={17} />
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
                  Class Name <span className="text-red-500">*</span>
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
{/* IMAGE */}
                <label className={labelClass}>
                  Class Image
                </label>

                {editingClass?.image && !formData.image && (
                  <div className="mb-3 flex items-start gap-3">
                    <img
                      src={getImageUrl(editingClass.image)}
                      alt="Current class"
                      className="h-24 w-24 rounded-xl border border-[#333] object-cover"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />
                    <span className="pt-1 text-sm text-gray-400">
                      Current class image
                    </span>
                  </div>
                )}

                {formData.image && (
                  <div className="mb-3 flex items-start gap-3 rounded-xl border border-purple-500/30 bg-[#2b2638] p-3">
                    <img
                      src={URL.createObjectURL(formData.image)}
                      alt="Selected class preview"
                      className="h-24 w-24 rounded-lg object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="break-all text-sm text-gray-200">
                        {formData.image.name}
                      </p>
                      <button
                        type="button"
                        onClick={() => updateForm("image", null)}
                        className="mt-2 inline-flex items-center gap-2 rounded-lg border border-red-500/30 px-3 py-2 text-sm font-semibold text-red-300 transition hover:bg-red-500/10"
                      >
                        <Trash2 size={14} />
                        Remove selection
                      </button>
                    </div>
                  </div>
                )}

                <input
                  key={formData.image ? `${formData.image.name}-${formData.image.size}` : "class-image-empty"}
                  type="file"
                  accept="image/*"
                  onChange={(event) =>
                    updateForm("image", event.target.files?.[0] || null)
                  }
                  className="w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white file:mr-4 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-purple-500/20 file:text-purple-300"
                />

                {/* TRAINER */}
                <label className={labelClass}>
                  Trainer Name <span className="text-red-500">*</span>
                </label>

                <select
                  value={
                    formData.trainer_id
                  }
                  onChange={handleTrainerChange}
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

                    <label className={labelClass}>
                  Category <span className="text-red-500">*</span>
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
                        !formData.trainer_id ||
                        trainerCategoryOptions.length === 0
                      }
                    >

                      <option value="">
                        {dropdownLoading
                          ? "Loading categories..."
                          : !formData.trainer_id
                          ? "Select Trainer First"
                          : trainerCategoryOptions.length
                          ? "Select Category"
                          : "No categories assigned to this trainer"}
                      </option>

                      {trainerCategoryOptions.map(
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

                    <label className={labelClass}>
                  Subcategory <span className="text-red-500">*</span>
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
                      required
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

                {/* CLASS TYPE */}
                <label className={labelClass}>
                  Class Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.class_type}
                  onChange={(event) =>
                    updateForm("class_type", event.target.value)
                  }
                  className={selectClass}
                  required
                >
                  <option value="LIVE">Live Class</option>
                  <option value="RECORDING">Recorded Class</option>
                </select>

                {/* PRICE + DURATION */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  <div>

                    <label className={labelClass}>
                  Price <span className="text-red-500">*</span>
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
                      required
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

                    <label className={labelClass}>
                  Start Date <span className="text-red-500">*</span>
                </label>

                    <input
                      type="date"
                      min={getTodayDateInput()}
                      value={
                        formData.course_start_date
                      }
                      required
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

                    <label className={labelClass}>
                  End Date <span className="text-red-500">*</span>
                </label>

                    <input
                      type="date"
                      value={
                        formData.course_end_date
                      }
                      required
                      min={
                        formData.course_start_date &&
                        formData.course_start_date > getTodayDateInput()
                          ? formData.course_start_date
                          : getTodayDateInput()
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

                {/* START TIME + END TIME */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>
                      Start Time <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="time"
                      value={formData.start_time}
                      onChange={(event) =>
                        updateForm("start_time", event.target.value)
                      }
                      className={inputClass}
                      required
                    />
                  </div>
                  <div>
                    <label className={labelClass}>
                      End Time <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="time"
                      value={formData.end_time}
                      min={formData.start_time || undefined}
                      onChange={(event) =>
                        updateForm("end_time", event.target.value)
                      }
                      className={inputClass}
                      required
                    />
                  </div>
                </div>

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