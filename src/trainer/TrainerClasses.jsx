
// import { useEffect, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import {
//   BookOpen,
//   CalendarDays,
//   Clock3,
//   Edit,
//   ImagePlus,
//   Loader2,
//   Plus,
//   RefreshCw,
//   Search,
//   Trash2,
//   Users,
//   X,
// } from "lucide-react";
// import toast from "react-hot-toast";

// import API from "../services/api";

// /* =========================================================
//    DAYS
// ========================================================= */

// const DAYS_LIST = [
//   { value: "MONDAY", label: "Mon" },
//   { value: "TUESDAY", label: "Tue" },
//   { value: "WEDNESDAY", label: "Wed" },
//   { value: "THURSDAY", label: "Thu" },
//   { value: "FRIDAY", label: "Fri" },
//   { value: "SATURDAY", label: "Sat" },
//   { value: "SUNDAY", label: "Sun" },
// ];

// /* =========================================================
//    CLASS TYPE
// ========================================================= */

// const CLASS_TYPES = [
//   {
//     value: "LIVE",
//     label: "Live Class",
//   },
//   {
//     value: "RECORDING",
//     label: "Recorded Class",
//   },
// ];

// /* =========================================================
//    MODE
// ========================================================= */

// const MODE_OPTIONS = [
//   {
//     value: "ONLINE",
//     label: "Online",
//   },
//   {
//     value: "OFFLINE",
//     label: "Offline",
//   },
// ];

// /* =========================================================
//    DEFAULT FORM
// ========================================================= */

// const DEFAULT_FORM = {
//   title: "",
//   description: "",

//   image: null,

//   category_id: "",
//   subcategory_id: "",

//   price: "",
//   duration: "60",
//   students_count: "",

//   level: "BEGINNER",

//   mode: "ONLINE",

//   class_type: "LIVE",

//   course_start_date: "",
//   course_end_date: "",

//   start_time: "",
//   end_time: "",

//   available_days: [],
// };

// /* =========================================================
//    TODAY
// ========================================================= */

// const getTodayLocalDate = () => {
//   const now = new Date();

//   const year = now.getFullYear();
//   const month = String(now.getMonth() + 1).padStart(2, "0");
//   const day = String(now.getDate()).padStart(2, "0");

//   return `${year}-${month}-${day}`;
// };

// /* =========================================================
//    DEFAULT FORM FACTORY
// ========================================================= */

// const getDefaultForm = () => {
//   const today = getTodayLocalDate();

//   return {
//     ...DEFAULT_FORM,
//     course_start_date: today,
//     course_end_date: today,
//   };
// };

// /* =========================================================
//    DATE HELPERS
// ========================================================= */

// const normalizeDateForInput = (value) => {
//   if (!value) return "";

//   if (value instanceof Date && !Number.isNaN(value.getTime())) {
//     const year = value.getFullYear();

//     const month = String(value.getMonth() + 1).padStart(
//       2,
//       "0"
//     );

//     const day = String(value.getDate()).padStart(
//       2,
//       "0"
//     );

//     return `${year}-${month}-${day}`;
//   }

//   const stringValue = String(value).trim();

//   if (!stringValue) return "";

//   const match = stringValue.match(
//     /^(\d{4})[-/](\d{1,2})[-/](\d{1,2})/
//   );

//   if (!match) return "";

//   const year = match[1];

//   const month = String(match[2]).padStart(
//     2,
//     "0"
//   );

//   const day = String(match[3]).padStart(
//     2,
//     "0"
//   );

//   return `${year}-${month}-${day}`;
// };

// const normalizeCurrentOrFutureDate = (value) => {
//   const normalized = normalizeDateForInput(value);

//   if (!normalized) {
//     return getTodayLocalDate();
//   }

//   const today = getTodayLocalDate();

//   if (normalized < today) {
//     return today;
//   }

//   return normalized;
// };

// const formatDate = (value) => {
//   const normalized = normalizeDateForInput(value);

//   if (!normalized) return "-";

//   const [year, month, day] = normalized.split("-");

//   return `${day}/${month}/${year}`;
// };

// /* =========================================================
//    TIME HELPERS
// ========================================================= */

// const normalizeTimeForInput = (value) => {
//   if (!value) return "";

//   if (
//     value instanceof Date &&
//     !Number.isNaN(value.getTime())
//   ) {
//     const hours = String(value.getHours()).padStart(
//       2,
//       "0"
//     );

//     const minutes = String(value.getMinutes()).padStart(
//       2,
//       "0"
//     );

//     return `${hours}:${minutes}`;
//   }

//   let time = String(value)
//     .trim()
//     .toUpperCase();

//   if (!time) return "";

//   const embeddedTime = time.match(
//     /(?:T|\s)(\d{1,2}:\d{2}(?::\d{2}(?:.\d+)?)?(?:\s*(?:AM|PM))?)/i
//   );

//   if (embeddedTime) {
//     time = embeddedTime[1];
//   }

//   time = time
//     .replace(/Z$/i, "")
//     .replace(/[+-]\d{2}:?\d{2}$/, "")
//     .trim();

//   const twelveHour = time.match(
//     /^(\d{1,2}):(\d{2})(?::\d{2}(?:.\d+)?)?\s*(AM|PM)$/i
//   );

//   if (twelveHour) {
//     let hour = Number(twelveHour[1]);

//     const minute = Number(twelveHour[2]);

//     const period = twelveHour[3].toUpperCase();

//     if (
//       hour < 1 ||
//       hour > 12 ||
//       minute > 59
//     ) {
//       return "";
//     }

//     if (
//       period === "AM" &&
//       hour === 12
//     ) {
//       hour = 0;
//     }

//     if (
//       period === "PM" &&
//       hour !== 12
//     ) {
//       hour += 12;
//     }

//     return `${String(hour).padStart(
//       2,
//       "0"
//     )}:${String(minute).padStart(
//       2,
//       "0"
//     )}`;
//   }

//   const twentyFourHour = time.match(
//     /^(\d{1,2}):(\d{2})(?::\d{2}(?:.\d+)?)?$/
//   );

//   if (twentyFourHour) {
//     const hour = Number(
//       twentyFourHour[1]
//     );

//     const minute = Number(
//       twentyFourHour[2]
//     );

//     if (
//       hour > 23 ||
//       minute > 59
//     ) {
//       return "";
//     }

//     return `${String(hour).padStart(
//       2,
//       "0"
//     )}:${String(minute).padStart(
//       2,
//       "0"
//     )}`;
//   }

//   return "";
// };

// const formatTime = (value) => {
//   const normalized =
//     normalizeTimeForInput(value);

//   if (!normalized) return "-";

//   const [
//     hoursString,
//     minutes,
//   ] = normalized.split(":");

//   let hours = Number(
//     hoursString
//   );

//   const period =
//     hours >= 12
//       ? "PM"
//       : "AM";

//   hours = hours % 12;

//   if (hours === 0) {
//     hours = 12;
//   }

//   return `${String(hours).padStart(
//     2,
//     "0"
//   )}:${minutes} ${period}`;
// };

// const getTimeParts = (value) => {
//   const normalized =
//     normalizeTimeForInput(value);

//   if (!normalized) {
//     return {
//       hour: "",
//       minute: "",
//       period: "AM",
//     };
//   }

//   const [
//     hoursString,
//     minute,
//   ] = normalized.split(":");

//   let hours = Number(
//     hoursString
//   );

//   const period =
//     hours >= 12
//       ? "PM"
//       : "AM";

//   hours = hours % 12;

//   if (hours === 0) {
//     hours = 12;
//   }

//   return {
//     hour: String(hours).padStart(
//       2,
//       "0"
//     ),
//     minute,
//     period,
//   };
// };

// const convertTimePartsTo24Hour = (
//   hour,
//   minute,
//   period
// ) => {
//   let hours = Number(
//     hour || 12
//   );

//   const minutes = Number(
//     minute || 0
//   );

//   if (
//     period === "AM" &&
//     hours === 12
//   ) {
//     hours = 0;
//   }

//   if (
//     period === "PM" &&
//     hours !== 12
//   ) {
//     hours += 12;
//   }

//   return `${String(hours).padStart(
//     2,
//     "0"
//   )}:${String(minutes).padStart(
//     2,
//     "0"
//   )}:00`;
// };

// /* =========================================================
//    ARRAY HELPERS
// ========================================================= */

// const normalizeArray = (value) => {
//   if (Array.isArray(value)) {
//     return value;
//   }

//   if (typeof value === "string") {
//     try {
//       const parsed = JSON.parse(value);

//       if (Array.isArray(parsed)) {
//         return parsed;
//       }
//     } catch {
//       return value
//         .split(",")
//         .map((item) =>
//           item.trim()
//         )
//         .filter(Boolean);
//     }
//   }

//   return [];
// };

// const normalizeAvailableDays = (
//   value
// ) => {
//   const days = normalizeArray(value);

//   return days
//     .map((day) => {
//       if (
//         typeof day === "object" &&
//         day !== null
//       ) {
//         return String(
//           day.day ||
//             day.day_name ||
//             day.name ||
//             day.value ||
//             ""
//         )
//           .trim()
//           .toUpperCase();
//       }

//       return String(day)
//         .trim()
//         .toUpperCase();
//     })
//     .filter((day) =>
//       DAYS_LIST.some(
//         (item) =>
//           item.value === day
//       )
//     );
// };

// /* =========================================================
//    CLASS FIELD HELPERS
// ========================================================= */

// const getClassStartDate = (
//   cls
// ) =>
//   normalizeDateForInput(
//     cls?.start_date ??
//       cls?.course_start_date ??
//       cls?.courseStartDate ??
//       cls?.startDate ??
//       ""
//   );

// const getClassEndDate = (
//   cls
// ) =>
//   normalizeDateForInput(
//     cls?.end_date ??
//       cls?.course_end_date ??
//       cls?.courseEndDate ??
//       cls?.endDate ??
//       ""
//   );

// const getClassStartTime = (
//   cls
// ) =>
//   normalizeTimeForInput(
//     cls?.start_time ??
//       cls?.default_start_time ??
//       cls?.startTime ??
//       cls?.defaultStartTime ??
//       cls?.course_start_time ??
//       cls?.courseStartTime ??
//       cls?.class_start_time ??
//       ""
//   );

// const getClassDays = (cls) =>
//   normalizeAvailableDays(
//     cls?.available_days ??
//       cls?.availableDays ??
//       cls?.days ??
//       cls?.class_days ??
//       []
//   );

// const getClassType = (cls) => {
//   const value =
//     cls?.class_type ??
//     cls?.classType ??
//     cls?.type ??
//     "LIVE";

//   const normalized = String(value).trim().toUpperCase();
//   // Backend API accepts LIVE or RECORDING (not RECORDED).
//   return normalized === "RECORDED" ? "RECORDING" : normalized;
// };

// /* =========================================================
//    SPECIALIZATION NORMALIZER
// ========================================================= */

// const normalizeSpecializations = (
//   responseData
// ) => {
//   const root =
//     responseData?.data ??
//     responseData ??
//     {};

//   let rawCategories = [];
//   let rawSubcategories = [];

//   if (Array.isArray(root)) {
//     rawCategories = root;
//   } else {
//     rawCategories =
//       root?.categories ||
//       root?.specializations ||
//       root?.data ||
//       [];

//     rawSubcategories =
//       root?.subcategories ||
//       [];
//   }

//   const categoriesMap =
//     new Map();

//   const subcategoriesMap =
//     new Map();

//   const addCategory = (
//     category
//   ) => {
//     if (!category) return;

//     const id =
//       category?.id ??
//       category?.category_id;

//     if (
//       id === undefined ||
//       id === null
//     ) {
//       return;
//     }

//     categoriesMap.set(
//       String(id),
//       {
//         id,
//         name:
//           category?.name ||
//           category?.category_name ||
//           `Category ${id}`,
//       }
//     );
//   };

//   const addSubcategory = (
//     subcategory
//   ) => {
//     if (!subcategory) return;

//     const id =
//       subcategory?.id ??
//       subcategory?.subcategory_id;

//     if (
//       id === undefined ||
//       id === null
//     ) {
//       return;
//     }

//     const categoryId =
//       subcategory?.category_id ??
//       subcategory?.categoryId;

//     subcategoriesMap.set(
//       String(id),
//       {
//         id,
//         category_id:
//           categoryId,
//         name:
//           subcategory?.name ||
//           subcategory?.subcategory_name ||
//           `Subcategory ${id}`,
//       }
//     );
//   };

//   rawCategories.forEach(
//     (item) => {
//       if (!item) return;

//       if (
//         item?.category ||
//         item?.category_id
//       ) {
//         addCategory(
//           item?.category ||
//             item
//         );
//       }

//       if (
//         item?.subcategory ||
//         item?.subcategory_id
//       ) {
//         addSubcategory(
//           item?.subcategory ||
//             item
//         );
//       }

//       if (
//         Array.isArray(
//           item?.subcategories
//         )
//       ) {
//         addCategory(item);

//         item.subcategories.forEach(
//           addSubcategory
//         );
//       }
//     }
//   );

//   rawSubcategories.forEach(
//     addSubcategory
//   );

//   return {
//     categories:
//       Array.from(
//         categoriesMap.values()
//       ),
//     subcategories:
//       Array.from(
//         subcategoriesMap.values()
//       ),
//   };
// };

// /* =========================================================
//    COMPONENT
// ========================================================= */

// export default function TrainerClasses() {
//   const auth = getAuth();
//   const navigate = useNavigate();

//   /* =======================================================
//      STATE
//   ======================================================= */

//   const [classes, setClasses] =
//     useState([]);

//   const [categories, setCategories] =
//     useState([]);

//   const [
//     subcategories,
//     setSubcategories,
//   ] = useState([]);

//   const [loading, setLoading] =
//     useState(true);

//   const [
//     refreshing,
//     setRefreshing,
//   ] = useState(false);

//   const [
//     specializationsLoading,
//     setSpecializationsLoading,
//   ] = useState(true);

//   const [saving, setSaving] =
//     useState(false);

//   const [deleting, setDeleting] =
//     useState(false);

//   const [
//     searchQuery,
//     setSearchQuery,
//   ] = useState("");

//   const [
//     showModal,
//     setShowModal,
//   ] = useState(false);

//   const [
//     editingClass,
//     setEditingClass,
//   ] = useState(null);

//   const [
//     deleteConfirmClass,
//     setDeleteConfirmClass,
//   ] = useState(null);

//   const [
//     formData,
//     setFormData,
//   ] = useState(
//     getDefaultForm()
//   );

//   /* =======================================================
//      AUTH CONFIG
//   ======================================================= */

//   const getConfig = async () => {
//     let token =
//       localStorage.getItem(
//         "token"
//       );

//     const currentUser =
//       auth.currentUser;

//     if (currentUser) {
//       try {
//         token =
//           await currentUser.getIdToken(
//             true
//           );
//       } catch (error) {
//         console.error(
//           "Firebase token error:",
//           error
//         );
//       }
//     }

//     if (!token) {
//       throw new Error(
//         "Authentication token not found."
//       );
//     }

//     return {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };
//   };

//   /* =======================================================
//      FETCH CLASSES
//   ======================================================= */

//   const fetchClasses = async (
//     showError = true
//   ) => {
//     try {
//       const config =
//         await getConfig();

//       const response =
//         await API.get(
//           "/classes/trainer/my-classes",
//           config
//         );

//       const responseData =
//         response?.data;

//       /*
//        * Backend response:
//        *
//        * {
//        *   success: true,
//        *   data: [...]
//        * }
//        */

//       const classList =
//         Array.isArray(
//           responseData?.data
//         )
//           ? responseData.data
//           : Array.isArray(
//               responseData?.classes
//             )
//           ? responseData.classes
//           : Array.isArray(
//               responseData
//             )
//           ? responseData
//           : [];

//       setClasses(classList);

//       return classList;
//     } catch (error) {
//       console.error(
//         "FETCH TRAINER CLASSES ERROR:",
//         error?.response?.data ||
//           error?.message ||
//           error
//       );

//       setClasses([]);

//       if (showError) {
//         toast.error(
//           error?.response?.data
//             ?.message ||
//             "Failed to load classes."
//         );
//       }

//       return [];
//     }
//   };

//   /* =======================================================
//      FETCH SPECIALIZATIONS
//   ======================================================= */

//   const fetchTrainerSpecializations =
//     async (
//       showError = true
//     ) => {
//       setSpecializationsLoading(
//         true
//       );

//       try {
//         const config =
//           await getConfig();

//         const response =
//           await API.get(
//             "/trainers/my-specializations",
//             config
//           );

//         const normalized =
//           normalizeSpecializations(
//             response?.data
//           );

//         setCategories(
//           normalized.categories
//         );

//         setSubcategories(
//           normalized.subcategories
//         );

//         return normalized;
//       } catch (error) {
//         console.error(
//           "FETCH TRAINER SPECIALIZATIONS ERROR:",
//           error?.response?.data ||
//             error?.message ||
//             error
//         );

//         setCategories([]);
//         setSubcategories([]);

//         if (showError) {
//           toast.error(
//             error?.response?.data
//               ?.message ||
//               "Failed to load trainer specializations."
//           );
//         }

//         return {
//           categories: [],
//           subcategories: [],
//         };
//       } finally {
//         setSpecializationsLoading(
//           false
//         );
//       }
//     };

//   /* =======================================================
//      REFRESH EVERYTHING
//   ======================================================= */

//   const handleRefresh = async () => {
//     if (refreshing) return;

//     setRefreshing(true);

//     try {
//       await Promise.all([
//         fetchClasses(false),
//         fetchTrainerSpecializations(
//           false
//         ),
//       ]);

//       toast.success(
//         "Classes refreshed."
//       );
//     } catch (error) {
//       console.error(
//         "REFRESH ERROR:",
//         error
//       );

//       toast.error(
//         "Failed to refresh classes."
//       );
//     } finally {
//       setRefreshing(false);
//     }
//   };

//   /* =======================================================
//      INITIAL LOAD
//   ======================================================= */

//   useEffect(() => {
//     let unsubscribe;

//     const loadData =
//       async () => {
//         setLoading(true);

//         try {
//           await fetchClasses();

//           /*
//            * Specializations are loaded
//            * independently.
//            */
//           fetchTrainerSpecializations();
//         } finally {
//           setLoading(false);
//         }
//       };

//     unsubscribe =
//       onAuthStateChanged(
//         auth,
//         (firebaseUser) => {
//           if (firebaseUser) {
//             loadData();
//           } else if (
//             localStorage.getItem(
//               "token"
//             )
//           ) {
//             loadData();
//           } else {
//             setClasses([]);
//             setLoading(false);
//             setSpecializationsLoading(
//               false
//             );
//           }
//         }
//       );

//     return () => {
//       if (unsubscribe) {
//         unsubscribe();
//       }
//     };

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   /* =======================================================
//      AVAILABLE SUBCATEGORIES
//   ======================================================= */

//   const availableSubcategories =
//     useMemo(() => {
//       if (
//         !formData.category_id
//       ) {
//         return [];
//       }

//       return subcategories.filter(
//         (subcategory) =>
//           String(
//             subcategory.category_id
//           ) ===
//           String(
//             formData.category_id
//           )
//       );
//     }, [
//       subcategories,
//       formData.category_id,
//     ]);

//   /* =======================================================
//      USED DAYS
     
//      SAME SUBCATEGORY:
//      Allowed.

//      SAME DAY:
//      Not allowed.
//   ======================================================= */

//   const usedDaysByOtherClasses =
//     useMemo(() => {
//       const used = new Set();

//       classes.forEach((cls) => {
//         if (
//           editingClass &&
//           String(cls?.id) ===
//             String(
//               editingClass?.id
//             )
//         ) {
//           return;
//         }

//         const days =
//           getClassDays(cls);

//         days.forEach((day) => {
//           used.add(day);
//         });
//       });

//       return used;
//     }, [
//       classes,
//       editingClass,
//     ]);

//   /* =======================================================
//      FILTER CLASSES
//   ======================================================= */

//   const filteredClasses =
//     useMemo(() => {
//       const query =
//         searchQuery
//           .trim()
//           .toLowerCase();

//       if (!query) {
//         return classes;
//       }

//       return classes.filter(
//         (cls) => {
//           const values = [
//             cls?.id,
//             cls?.title,
//             cls?.description,
//             cls?.category_name,
//             cls?.subcategory_name,
//             cls?.category,
//             cls?.subcategory,
//             cls?.level,
//             cls?.mode,
//             cls?.class_type,
//           ];

//           return values.some(
//             (value) =>
//               String(value || "")
//                 .toLowerCase()
//                 .includes(query)
//           );
//         }
//       );
//     }, [
//       classes,
//       searchQuery,
//     ]);

//   /* =======================================================
//      FORM CHANGE
//   ======================================================= */

//   const handleChange = (
//     event
//   ) => {
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

//   /* =======================================================
//      CATEGORY CHANGE
//   ======================================================= */

//   const handleCategoryChange = (
//     event
//   ) => {
//     const categoryId =
//       event.target.value;

//     setFormData(
//       (previous) => ({
//         ...previous,
//         category_id:
//           categoryId,
//         subcategory_id:
//           "",
//       })
//     );
//   };

//   /* =======================================================
//      START DATE
//   ======================================================= */

//   const handleStartDateChange =
//     (event) => {
//       const value =
//         event.target.value;

//       if (!value) {
//         setFormData(
//           (previous) => ({
//             ...previous,
//             course_start_date:
//               "",
//           })
//         );

//         return;
//       }

//       const today =
//         getTodayLocalDate();

//       if (value < today) {
//         toast.error(
//           "Course start date cannot be before today."
//         );

//         return;
//       }

//       setFormData(
//         (previous) => {
//           let endDate =
//             previous.course_end_date;

//           if (
//             !endDate ||
//             endDate < value
//           ) {
//             endDate = value;
//           }

//           return {
//             ...previous,
//             course_start_date:
//               value,
//             course_end_date:
//               endDate,
//           };
//         }
//       );
//     };

//   /* =======================================================
//      END DATE
//   ======================================================= */

//   const handleEndDateChange =
//     (event) => {
//       const value =
//         event.target.value;

//       if (!value) {
//         setFormData(
//           (previous) => ({
//             ...previous,
//             course_end_date:
//               "",
//           })
//         );

//         return;
//       }

//       const today =
//         getTodayLocalDate();

//       if (value < today) {
//         toast.error(
//           "Course end date cannot be before today."
//         );

//         return;
//       }

//       if (
//         formData.course_start_date &&
//         value <
//           formData.course_start_date
//       ) {
//         toast.error(
//           "Course end date cannot be before course start date."
//         );

//         return;
//       }

//       setFormData(
//         (previous) => ({
//           ...previous,
//           course_end_date:
//             value,
//         })
//       );
//     };

//   /* =======================================================
//      IMAGE
//   ======================================================= */

//   const handleImageChange =
//     (event) => {
//       const file =
//         event.target.files?.[0];

//       if (!file) return;

//       if (
//         !file.type ||
//         !file.type.startsWith(
//           "image/"
//         )
//       ) {
//         toast.error(
//           "Please select an image file only."
//         );

//         event.target.value = "";

//         return;
//       }

//       const maxSize =
//         10 * 1024 * 1024;

//       if (file.size > maxSize) {
//         toast.error(
//           "Image must be smaller than 10 MB."
//         );

//         event.target.value = "";

//         return;
//       }

//       setFormData(
//         (previous) => ({
//           ...previous,
//           image: file,
//         })
//       );
//     };

//   /* =======================================================
//      DAY TOGGLE
//   ======================================================= */

//   const toggleDay = (day) => {
//     if (
//       usedDaysByOtherClasses.has(
//         day
//       )
//     ) {
//       const label =
//         DAYS_LIST.find(
//           (item) =>
//             item.value === day
//         )?.label ||
//         day;

//       toast.error(
//         `${label} is already assigned to another class.`
//       );

//       return;
//     }

//     setFormData(
//       (previous) => {
//         const current =
//           previous.available_days ||
//           [];

//         if (
//           current.includes(day)
//         ) {
//           return {
//             ...previous,
//             available_days:
//               current.filter(
//                 (item) =>
//                   item !== day
//               ),
//           };
//         }

//         return {
//           ...previous,
//           available_days: [
//             ...current,
//             day,
//           ],
//         };
//       }
//     );
//   };

//   /* =======================================================
//      TIME
//   ======================================================= */

//   const setTimePart = (
//     part,
//     value,
//     fieldName = "start_time"
//   ) => {
//     const current =
//       getTimeParts(
//         formData[fieldName]
//       );

//     let hour =
//       current.hour || "12";

//     let minute =
//       current.minute || "00";

//     let period =
//       current.period || "AM";

//     if (part === "hour") {
//       hour = value;
//     }

//     if (part === "minute") {
//       minute = value;
//     }

//     if (part === "period") {
//       period = value;
//     }

//     const newTime =
//       convertTimePartsTo24Hour(
//         hour,
//         minute,
//         period
//       );

//     setFormData(
//       (previous) => ({
//         ...previous,
//         [fieldName]:
//           newTime,
//       })
//     );
//   };

//   /* =======================================================
//      CREATE MODAL
//   ======================================================= */

//   const openCreateModal =
//     () => {
//       if (
//         specializationsLoading
//       ) {
//         toast.error(
//           "Trainer specializations are still loading."
//         );

//         return;
//       }

//       if (
//         categories.length === 0
//       ) {
//         toast.error(
//           "No trainer categories are available."
//         );

//         return;
//       }

//       setEditingClass(null);

//       setFormData(
//         getDefaultForm()
//       );

//       setShowModal(true);
//     };

//   /* =======================================================
//      EDIT
//   ======================================================= */

//   const handleEdit = (
//     cls
//   ) => {
//     const rawStartDate =
//       cls?.start_date ??
//       cls?.course_start_date ??
//       cls?.courseStartDate ??
//       cls?.startDate ??
//       "";

//     const rawEndDate =
//       cls?.end_date ??
//       cls?.course_end_date ??
//       cls?.courseEndDate ??
//       cls?.endDate ??
//       "";

//     const rawTime =
//       cls?.start_time ??
//       cls?.default_start_time ??
//       cls?.startTime ??
//       cls?.defaultStartTime ??
//       cls?.course_start_time ??
//       cls?.courseStartTime ??
//       cls?.class_start_time ??
//       "";

//     const startDate =
//       normalizeCurrentOrFutureDate(
//         rawStartDate
//       );

//     let endDate =
//       normalizeCurrentOrFutureDate(
//         rawEndDate
//       );

//     if (
//       !endDate ||
//       endDate < startDate
//     ) {
//       endDate =
//         startDate;
//     }

//     const categoryId =
//       cls?.category_id ??
//       cls?.categoryId ??
//       "";

//     const subcategoryId =
//       cls?.subcategory_id ??
//       cls?.subcategoryId ??
//       "";

//     const classType =
//       getClassType(cls);

//     setEditingClass(cls);

//     setFormData({
//       title:
//         cls?.title || "",

//       description:
//         cls?.description || "",

//       image: null,

//       category_id:
//         categoryId,

//       subcategory_id:
//         subcategoryId,

//       price:
//         cls?.price ?? "",

//       duration:
//         cls?.duration ??
//         "60",

//       students_count:
//         cls?.students_count ??
//         cls?.max_students ??
//         "",

//       level:
//         cls?.level ||
//         "BEGINNER",

//       mode:
//         cls?.mode ||
//         "ONLINE",

//       class_type:
//         classType === "RECORDING" ? "RECORDING" : "LIVE",

//       course_start_date:
//         startDate,

//       course_end_date:
//         endDate,

//       start_time:
//         normalizeTimeForInput(
//           rawTime
//         ),
//       end_time:
//         normalizeTimeForInput(
//           cls?.end_time ?? cls?.endTime ?? cls?.default_end_time ?? ""
//         ),

//       available_days:
//         getClassDays(cls),
//     });

//     setShowModal(true);
//   };

//   /* =======================================================
//      DELETE CONFIRMATION
//   ======================================================= */

//   const handleDelete = (cls) => {
//     if (!cls?.id) return;
//     setDeleteConfirmClass(cls);
//   };

//   const confirmDeleteClass = async () => {
//     if (!deleteConfirmClass?.id) return;

//     setDeleting(true);

//     try {
//       const config = await getConfig();

//       await API.delete(
//         `/classes/trainer/${deleteConfirmClass.id}`,
//         config
//       );

//       toast.success("Class deleted successfully.");
//       setDeleteConfirmClass(null);

//       await fetchClasses();
//     } catch (error) {
//       console.error(
//         "DELETE CLASS ERROR:",
//         error?.response?.data ||
//           error?.message ||
//           error
//       );

//       toast.error(
//         error?.response?.data?.message ||
//           "Failed to delete class."
//       );
//     } finally {
//       setDeleting(false);
//     }
//   };

//   /* =======================================================
//      SUBMIT
//   ======================================================= */

//   const handleSubmit =
//     async (event) => {
//       event.preventDefault();

//       const title =
//         formData.title.trim();

//       if (!title) {
//         toast.error(
//           "Class name is required."
//         );

//         return;
//       }

//       if (
//         !formData.category_id
//       ) {
//         toast.error(
//           "Please select a category."
//         );

//         return;
//       }

//       if (
//         !formData.subcategory_id
//       ) {
//         toast.error(
//           "Please select a subcategory."
//         );

//         return;
//       }

//       if (
//         formData.price === "" ||
//         formData.price === null ||
//         formData.price ===
//           undefined
//       ) {
//         toast.error(
//           "Price is required."
//         );

//         return;
//       }

//       const price = Number(
//         formData.price
//       );

//       if (
//         Number.isNaN(price) ||
//         price < 0
//       ) {
//         toast.error(
//           "Please enter a valid price."
//         );

//         return;
//       }

//       if (
//         formData.duration ===
//           "" ||
//         formData.duration ===
//           null ||
//         formData.duration ===
//           undefined
//       ) {
//         toast.error(
//           "Duration is required."
//         );

//         return;
//       }

//       const duration =
//         Number(
//           formData.duration
//         );

//       if (
//         Number.isNaN(duration) ||
//         duration <= 0
//       ) {
//         toast.error(
//           "Duration must be greater than 0."
//         );

//         return;
//       }

//       if (
//         !formData.course_start_date
//       ) {
//         toast.error(
//           "Course start date is required."
//         );

//         return;
//       }

//       if (
//         !formData.course_end_date
//       ) {
//         toast.error(
//           "Course end date is required."
//         );

//         return;
//       }

//       const today =
//         getTodayLocalDate();

//       if (
//         formData.course_start_date <
//         today
//       ) {
//         toast.error(
//           "Course start date cannot be before today."
//         );

//         return;
//       }

//       if (
//         formData.course_end_date <
//         today
//       ) {
//         toast.error(
//           "Course end date cannot be before today."
//         );

//         return;
//       }

//       if (
//         formData.course_end_date <
//         formData.course_start_date
//       ) {
//         toast.error(
//           "Course end date cannot be before start date."
//         );

//         return;
//       }

//       if (
//         !formData.start_time
//       ) {
//         toast.error(
//           "Start time is required."
//         );

//         return;
//       }

//       if (!formData.end_time) {
//         toast.error("End time is required.");
//         return;
//       }

//       if (formData.end_time <= formData.start_time) {
//         toast.error("End time must be later than start time.");
//         return;
//       }

//       if (
//         !formData.available_days ||
//         formData.available_days
//           .length === 0
//       ) {
//         toast.error(
//           "Please select at least one available day."
//         );

//         return;
//       }

//       if (
//         !formData.class_type
//       ) {
//         toast.error(
//           "Please select class type."
//         );

//         return;
//       }

//       /* ============================================
//          SAME DAY CHECK
//       ============================================ */

//       for (const day of
//         formData.available_days) {
//         if (
//           usedDaysByOtherClasses.has(
//             day
//           )
//         ) {
//           const label =
//             DAYS_LIST.find(
//               (item) =>
//                 item.value ===
//                 day
//             )?.label ||
//             day;

//           toast.error(
//             `${label} is already assigned to another class.`
//           );

//           return;
//         }
//       }

//       setSaving(true);

//       try {
//         const config =
//           await getConfig();

//         const payload =
//           new FormData();

//         payload.append(
//           "title",
//           title
//         );

//         payload.append(
//           "description",
//           formData.description?.trim() ||
//             ""
//         );

//         payload.append(
//           "category_id",
//           String(
//             formData.category_id
//           )
//         );

//         payload.append(
//           "subcategory_id",
//           String(
//             formData.subcategory_id
//           )
//         );

//         payload.append(
//           "price",
//           String(price)
//         );

//         payload.append(
//           "duration",
//           String(duration)
//         );

//         payload.append(
//           "students_count",
//           formData.students_count ===
//             ""
//             ? "0"
//             : String(
//                 Number(
//                   formData.students_count
//                 ) || 0
//               )
//         );

//         payload.append(
//           "level",
//           formData.level
//         );

//         /* ==========================================
//            MODE
//         ========================================== */

//         payload.append(
//           "mode",
//           formData.mode
//         );

//         /* ==========================================
//            CLASS TYPE
//         ========================================== */

//         payload.append(
//           "class_type",
//           formData.class_type
//         );

//         /* ==========================================
//            DATES
//         ========================================== */

//         payload.append(
//           "start_date",
//           formData.course_start_date
//         );

//         payload.append(
//           "end_date",
//           formData.course_end_date
//         );

//         /*
//          * Compatibility aliases
//          */

//         payload.append(
//           "course_start_date",
//           formData.course_start_date
//         );

//         payload.append(
//           "course_end_date",
//           formData.course_end_date
//         );

//         /* ==========================================
//            TIME
//         ========================================== */

//         payload.append(
//           "start_time",
//           normalizeTimeForInput(
//             formData.start_time
//           ) + ":00"
//         );

//         payload.append(
//           "end_time",
//           normalizeTimeForInput(formData.end_time) + ":00"
//         );

//         /* ==========================================
//            DAYS
//         ========================================== */

//         payload.append(
//           "available_days",
//           JSON.stringify(
//             formData.available_days
//           )
//         );

//         /* ==========================================
//            IMAGE
//         ========================================== */

//         if (
//           formData.image &&
//           formData.image.type?.startsWith(
//             "image/"
//           )
//         ) {
//           payload.append(
//             "image",
//             formData.image
//           );
//         }

//         let response;

//         if (
//           editingClass?.id
//         ) {
//           response =
//             await API.put(
//               `/classes/trainer/${editingClass.id}`,
//               payload,
//               {
//                 ...config,
//                 headers: {
//                   ...config.headers,
//                   "Content-Type":
//                     "multipart/form-data",
//                 },
//               }
//             );
//         } else {
//           response =
//             await API.post(
//               "/classes/trainer/create",
//               payload,
//               {
//                 ...config,
//                 headers: {
//                   ...config.headers,
//                   "Content-Type":
//                     "multipart/form-data",
//                 },
//               }
//             );
//         }

//         console.log(
//           "CLASS SAVE RESPONSE:",
//           response?.data
//         );

//         toast.success(
//           editingClass
//             ? "Class updated successfully."
//             : "Class created successfully."
//         );

//         setShowModal(false);

//         setEditingClass(null);

//         setFormData(
//           getDefaultForm()
//         );

//         await fetchClasses();
//       } catch (error) {
//         console.error(
//           "SAVE CLASS ERROR:",
//           error?.response?.data ||
//             error?.message ||
//             error
//         );

//         toast.error(
//           error?.response?.data
//             ?.message ||
//             "Failed to save class."
//         );
//       } finally {
//         setSaving(false);
//       }
//     };

//   /* =======================================================
//      IMAGE URL
//   ======================================================= */

//   const getImageUrl = (
//     cls
//   ) => {
//     return (
//       cls?.image ||
//       cls?.image_url ||
//       cls?.class_image ||
//       cls?.class_image_url ||
//       ""
//     );
//   };

//   /* =======================================================
//      CLOSE MODAL
//   ======================================================= */

//   const closeModal = () => {
//     if (saving) return;

//     setShowModal(false);

//     setEditingClass(null);

//     setFormData(
//       getDefaultForm()
//     );
//   };

//   /* =======================================================
//      TIME SELECTOR
//   ======================================================= */

//   const TimeSelector =
//     ({ fieldName = "start_time", label = "Start Time" }) => {
//       const parts =
//         getTimeParts(
//           formData[fieldName]
//         );

//       return (
//         <div>
//           <label className="block text-sm font-semibold text-white mb-2">
//             <span className="inline-flex items-center gap-2">
//               <Clock3
//                 size={16}
//                 className="text-purple-400"
//               />

//               {label}

//               <span className="text-pink-400">
//                 *
//               </span>
//             </span>
//           </label>

//           <div className="flex items-center gap-2">
//             <select
//               value={parts.hour}
//               onChange={(
//                 event
//               ) =>
//                 setTimePart(
//                   "hour",
//                   event.target.value,
//                   fieldName
//                 )
//               }
//               required
//               className="w-full h-11 rounded-xl border border-white/10 bg-[#15121f] px-3 text-sm font-semibold text-white outline-none focus:border-purple-500"
//             >
//               <option value="">
//                 Hour
//               </option>

//               {Array.from(
//                 {
//                   length: 12,
//                 },
//                 (
//                   _,
//                   index
//                 ) => {
//                   const value =
//                     String(
//                       index + 1
//                     ).padStart(
//                       2,
//                       "0"
//                     );

//                   return (
//                     <option
//                       key={
//                         value
//                       }
//                       value={
//                         value
//                       }
//                     >
//                       {value}
//                     </option>
//                   );
//                 }
//               )}
//             </select>

//             <span className="text-lg font-bold text-white">
//               :
//             </span>

//             <select
//               value={
//                 parts.minute
//               }
//               onChange={(
//                 event
//               ) =>
//                 setTimePart(
//                   "minute",
//                   event.target.value,
//                   fieldName
//                 )
//               }
//               required
//               className="w-full h-11 rounded-xl border border-white/10 bg-[#15121f] px-3 text-sm font-semibold text-white outline-none focus:border-purple-500"
//             >
//               <option value="">
//                 Min
//               </option>

//               {Array.from(
//                 {
//                   length: 60,
//                 },
//                 (
//                   _,
//                   index
//                 ) => {
//                   const value =
//                     String(
//                       index
//                     ).padStart(
//                       2,
//                       "0"
//                     );

//                   return (
//                     <option
//                       key={
//                         value
//                       }
//                       value={
//                         value
//                       }
//                     >
//                       {value}
//                     </option>
//                   );
//                 }
//               )}
//             </select>

//             <select
//               value={
//                 parts.period
//               }
//               onChange={(
//                 event
//               ) =>
//                 setTimePart(
//                   "period",
//                   event.target.value,
//                   fieldName
//                 )
//               }
//               required
//               className="w-full h-11 rounded-xl border border-white/10 bg-[#15121f] px-3 text-sm font-semibold text-white outline-none focus:border-purple-500"
//             >
//               <option value="AM">
//                 AM
//               </option>

//               <option value="PM">
//                 PM
//               </option>
//             </select>
//           </div>
//         </div>
//       );
//     };

//   /* =======================================================
//      LOADING
//   ======================================================= */

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#07080d] text-white flex items-center justify-center">
//         <div className="flex items-center gap-3 text-white">
//           <Loader2
//             size={22}
//             className="animate-spin text-white"
//           />

//           Loading classes...
//         </div>
//       </div>
//     );
//   }

//   /* =======================================================
//      UI
//   ======================================================= */

//   return (
//     <>
//       {/* ===================================================
//           STYLES
//       =================================================== */}

//       <style>{`
//         input[type="date"] {
//           color-scheme: dark;
//           accent-color: #a855f7;
//         }

//         input[type="date"]::-webkit-calendar-picker-indicator {
//           cursor: pointer;
//           opacity: 1;
//           filter:
//             invert(48%)
//             sepia(90%)
//             saturate(1800%)
//             hue-rotate(245deg)
//             brightness(105%)
//             contrast(105%);
//         }

//         input[type="date"]::-webkit-calendar-picker-indicator:hover {
//           filter:
//             invert(55%)
//             sepia(95%)
//             saturate(2200%)
//             hue-rotate(245deg)
//             brightness(115%)
//             contrast(110%);
//         }

//         input[type="file"] {
//           color: #9ca3af;
//         }

//         input[type="file"]::file-selector-button {
//           margin-right: 12px;
//           border: 0;
//           border-radius: 10px;
//           padding: 8px 14px;
//           background: linear-gradient(
//             135deg,
//             #9b2cff,
//             #ff2aae
//           );
//           color: white;
//           font-weight: 700;
//           cursor: pointer;
//         }

//         input[type="file"]::file-selector-button:hover {
//           opacity: 0.9;
//         }
//       `}</style>

//       <div className="min-h-screen bg-[#07080d] text-white px-4 py-6 md:px-8">
//         <div className="max-w-[1500px] mx-auto">

//           {/* =================================================
//               HEADER
//           ================================================= */}

//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-7">
//             <div>
//               <div className="flex items-center gap-3">
//                 <BookOpen
//                   size={32}
//                   className="text-white"
//                 />

//                 <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-300 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
//                   My Classes
//                 </h1>
//               </div>

//               <p className="text-white mt-2">
//                 Create and manage your
//                 trainer classes.
//               </p>
//             </div>

//             <div className="flex items-center gap-3">

//               {/* REFRESH */}

//               <button
//                 type="button"
//                 onClick={
//                   handleRefresh
//                 }
//                 disabled={
//                   refreshing
//                 }
//                 className="h-12 px-4 rounded-xl border border-white/10 bg-[#15121f] text-white font-semibold flex items-center gap-2 hover:border-purple-500/50 hover:text-white transition disabled:opacity-50"
//                 title="Refresh classes"
//               >
//                 <RefreshCw
//                   size={18}
//                   className={
//                     refreshing
//                       ? "animate-spin"
//                       : ""
//                   }
//                 />

//                 <span className="hidden sm:inline">
//                   Refresh
//                 </span>
//               </button>

//               {/* CREATE */}

//               <button
//                 type="button"
//                 onClick={
//                   openCreateModal
//                 }
//                 className="h-12 inline-flex items-center justify-center gap-2 rounded-xl px-6 font-bold text-white shadow-lg transition hover:scale-[1.02]"
//                 style={{
//                   background:
//                     "linear-gradient(135deg,#9b2cff,#ff2aae)",
//                 }}
//               >
//                 <Plus
//                   size={20}
//                 />

//                 Create Class
//               </button>
//             </div>
//           </div>

//           {/* =================================================
//               SEARCH
//           ================================================= */}

//           <div className="mb-6">
//             <div className="relative w-full">
//               <Search
//                 size={20}
//                 className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white"
//               />

//               <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={(event) => setSearchQuery(event.target.value)}
//                 placeholder="Search classes..."
//                 className="h-12 w-full rounded-xl border border-white/10 bg-[#15121f] pl-12 pr-12 text-sm text-white placeholder:text-white outline-none transition focus:border-purple-500"
//               />

//               {searchQuery && (
//                 <button
//                   type="button"
//                   onClick={() => setSearchQuery("")}
//                   className="absolute right-4 top-1/2 -translate-y-1/2 text-white transition hover:text-white"
//                   title="Clear search"
//                 >
//                   <X size={17} />
//                 </button>
//               )}
//             </div>
//           </div>

//           {/* =================================================
//               TABLE
//           ================================================= */}

//           <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#10121a]">
//             <div className="overflow-x-auto">
//               <table className="w-full min-w-[1700px] border-collapse">
//                 <thead>
//                   <tr className="border-b border-white/10 bg-[#15121f]">
//                     <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-bold text-white">
//                       ID
//                     </th>
//                     <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-bold text-white">
//                       Image
//                     </th>
//                     <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-bold text-white">
//                       Class Name
//                     </th>
//                     <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-bold text-white">
//                       Description
//                     </th>
//                     <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-bold text-white">
//                       Category
//                     </th>
//                     <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-bold text-white">
//                       Subcategory
//                     </th>
//                     <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-bold text-white">
//                       Class Type
//                     </th>
//                     <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-bold text-white">
//                       Price
//                     </th>
//                     <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-bold text-white">
//                       Duration
//                     </th>
//                     <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-bold text-white">
//                       Level
//                     </th>
//                     <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-bold text-white">
//                       Mode
//                     </th>
//                     <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-bold text-white">
//                       Students
//                     </th>
//                     <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-bold text-white">
//                       Start Date
//                     </th>
//                     <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-bold text-white">
//                       End Date
//                     </th>
//                     <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-bold text-white">
//                       Start Time
//                     </th>
//                     <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-bold text-white">
//                       Days
//                     </th>
//                     <th className="whitespace-nowrap px-4 py-4 text-right text-sm font-bold text-white">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {filteredClasses.length === 0 ? (
//                     <tr>
//                       <td
//                         colSpan={17}
//                         className="px-6 py-16 text-center"
//                       >
//                         <div className="flex flex-col items-center justify-center">
//                           <BookOpen
//                             size={42}
//                             className="mb-3 text-white"
//                           />

//                           <p className="font-semibold text-white">
//                             {searchQuery
//                               ? "No classes found."
//                               : "No classes created yet."}
//                           </p>
//                         </div>
//                       </td>
//                     </tr>
//                   ) : (
//                     filteredClasses.map((cls) => {
//                       const imageUrl = getImageUrl(cls);
//                       const days = getClassDays(cls);
//                       const classType = getClassType(cls);

//                       return (
//                         <tr
//                           key={cls.id}
//                           className="border-b border-white/5 transition last:border-b-0 hover:bg-white/[0.025]"
//                         >
//                           <td className="whitespace-nowrap px-4 py-5 text-sm text-white">
//                             {cls.id}
//                           </td>

//                           <td className="whitespace-nowrap px-4 py-5">
//                             {imageUrl ? (
//                               <img
//                                 src={imageUrl}
//                                 alt={cls.title || "Class"}
//                                 className="h-12 w-12 rounded-xl border border-white/10 object-cover"
//                                 onError={(event) => {
//                                   event.currentTarget.style.display = "none";
//                                 }}
//                               />
//                             ) : (
//                               <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-purple-500/20 bg-purple-500/10">
//                                 <BookOpen
//                                   size={20}
//                                   className="text-white"
//                                 />
//                               </div>
//                             )}
//                           </td>

//                           <td className="whitespace-nowrap px-4 py-5 text-sm font-bold text-white">
//                             {cls.title || "-"}
//                           </td>

//                           <td className="max-w-[260px] whitespace-nowrap px-4 py-5 text-sm text-white">
//                             <div className="max-w-[260px] overflow-hidden text-ellipsis whitespace-nowrap">
//                               {cls.description || "-"}
//                             </div>
//                           </td>

//                           <td className="whitespace-nowrap px-4 py-5 text-sm text-white">
//                             {cls.category_name || cls.category || "-"}
//                           </td>

//                           <td className="whitespace-nowrap px-4 py-5 text-sm text-white">
//                             {cls.subcategory_name || cls.subcategory || "-"}
//                           </td>

//                           <td className="whitespace-nowrap px-4 py-5">
//                             <span
//                               className={[
//                                 "inline-flex whitespace-nowrap items-center rounded-lg border px-3 py-1.5 text-xs font-bold",
//                                 classType === "RECORDING"
//                                   ? "border-pink-500/20 bg-pink-500/10 text-pink-300"
//                                   : "border-purple-500/20 bg-purple-500/10 text-purple-300",
//                               ].join(" ")}
//                             >
//                               {classType === "RECORDING"
//                                 ? "Recorded Class"
//                                 : "Live Class"}
//                             </span>
//                           </td>

//                           <td className="whitespace-nowrap px-4 py-5 text-sm font-semibold text-white">
//                             {cls.price !== undefined && cls.price !== null
//                               ? Number(cls.price).toFixed(2)
//                               : "-"}
//                           </td>

//                           <td className="whitespace-nowrap px-4 py-5 text-sm text-white">
//                             {cls.duration ? `${cls.duration} min` : "-"}
//                           </td>

//                           <td className="whitespace-nowrap px-4 py-5 text-sm text-white">
//                             {cls.level || "BEGINNER"}
//                           </td>

//                           <td className="whitespace-nowrap px-4 py-5 text-sm text-white">
//                             {String(cls.mode || "ONLINE").toUpperCase() ===
//                             "OFFLINE"
//                               ? "Offline"
//                               : "Online"}
//                           </td>

//                           <td className="whitespace-nowrap px-4 py-5 text-sm text-white">
//                             {cls.students_count ?? cls.max_students ?? 0}
//                           </td>

//                           <td className="whitespace-nowrap px-4 py-5 text-sm text-white">
//                             {formatDate(getClassStartDate(cls))}
//                           </td>

//                           <td className="whitespace-nowrap px-4 py-5 text-sm text-white">
//                             {formatDate(getClassEndDate(cls))}
//                           </td>

//                           <td className="whitespace-nowrap px-4 py-5 text-sm font-semibold text-white">
//                             {formatTime(getClassStartTime(cls))}
//                           </td>

//                           <td className="whitespace-nowrap px-4 py-5">
//                             <div className="flex flex-nowrap items-center gap-1">
//                               {days.length > 0
//                                 ? days.map((day) => {
//                                     const item = DAYS_LIST.find(
//                                       (d) => d.value === day
//                                     );

//                                     return (
//                                       <span
//                                         key={day}
//                                         className="inline-flex shrink-0 whitespace-nowrap rounded-lg border border-purple-500/20 bg-purple-500/10 px-2 py-1 text-xs font-semibold text-purple-300"
//                                       >
//                                         {item?.label || day}
//                                       </span>
//                                     );
//                                   })
//                                 : "-"}
//                             </div>
//                           </td>

//                           <td className="whitespace-nowrap px-4 py-5">
//                             <div className="flex items-center justify-end gap-2">
//                               <button
//                                 type="button"
//                                 onClick={() => {
//                                   if (!cls?.id) {
//                                     toast.error("Class ID is missing. Cannot open LMS.");
//                                     return;
//                                   }
//                                   navigate(`/trainer/lms/${cls.id}`);
//                                 }}
//                                 className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/10 text-blue-300 transition hover:bg-blue-500/20"
//                                 title="Open LMS"
//                               >
//                                 <BookOpen size={17} />
//                               </button>

//                               <button
//                                 type="button"
//                                 onClick={() => handleEdit(cls)}
//                                 className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-purple-500/30 bg-purple-500/10 text-purple-300 transition hover:bg-purple-500/20"
//                                 title="Edit"
//                               >
//                                 <Edit size={17} />
//                               </button>

//                               <button
//                                 type="button"
//                                 disabled={deleting}
//                                 onClick={() => handleDelete(cls)}
//                                 className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 transition hover:bg-red-500/20 disabled:opacity-50"
//                                 title="Delete"
//                               >
//                                 <Trash2 size={17} />
//                               </button>
//                             </div>
//                           </td>
//                         </tr>
//                       );
//                     })
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//         </div>
//       </div>

//       {/* ===================================================
//           CREATE / EDIT MODAL
//       =================================================== */}

//       {showModal && (
//         <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
//           <div className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#10121a] shadow-2xl">
//             {/* HEADER */}
//             <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-5 py-4">
//               <div>
//                 <h2 className="text-xl font-bold text-white">
//                   {editingClass ? "Edit Class" : "Create Class"}
//                 </h2>
//                 <p className="mt-1 text-sm text-white">
//                   {editingClass
//                     ? "Update your class details."
//                     : "Create a new trainer class."}
//                 </p>
//               </div>

//               <button
//                 type="button"
//                 onClick={closeModal}
//                 disabled={saving}
//                 className="flex h-9 w-9 items-center justify-center rounded-xl text-white transition hover:bg-white/5 hover:text-white disabled:opacity-50"
//               >
//                 <X size={20} />
//               </button>
//             </div>

//             {/* FORM */}
//             <form
//               onSubmit={handleSubmit}
//               className="overflow-y-auto p-5"
//             >
//               <div className="space-y-5">
//                 {/* ROW 1 - CLASS NAME */}
//                 <div>
//                   <label className="mb-2 block text-sm font-semibold text-white">
//                     Class Name
//                     <span className="ml-1 text-pink-400">*</span>
//                   </label>

//                   <input
//                     type="text"
//                     name="title"
//                     value={formData.title}
//                     onChange={handleChange}
//                     required
//                     placeholder="Enter class name"
//                     className="h-11 w-full rounded-xl border border-white/10 bg-[#15121f] px-4 text-white outline-none placeholder:text-gray-600 focus:border-purple-500"
//                   />
//                 </div>

//                 {/* ROW 2 - DESCRIPTION */}
//                 <div>
//                   <label className="mb-2 block text-sm font-semibold text-white">
//                     Description
//                   </label>

//                   <textarea
//                     name="description"
//                     value={formData.description}
//                     onChange={handleChange}
//                     rows={3}
//                     placeholder="Enter class description"
//                     className="w-full resize-none rounded-xl border border-white/10 bg-[#15121f] px-4 py-3 text-white outline-none placeholder:text-white focus:border-purple-500"
//                   />
//                 </div>

//                 {/* ROW 3 - CATEGORY / SUBCATEGORY */}
//                 <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                   <div>
//                     <label className="mb-2 block text-sm font-semibold text-white">
//                       Category
//                       <span className="ml-1 text-pink-400">*</span>
//                     </label>

//                     <select
//                       name="category_id"
//                       value={formData.category_id}
//                       onChange={handleCategoryChange}
//                       required
//                       className="h-11 w-full rounded-xl border border-white/10 bg-[#15121f] px-4 text-white outline-none focus:border-purple-500"
//                     >
//                       <option value="">Select Category</option>

//                       {categories.map((category) => (
//                         <option
//                           key={category.id}
//                           value={category.id}
//                         >
//                           {category.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div>
//                     <label className="mb-2 block text-sm font-semibold text-white">
//                       Subcategory
//                       <span className="ml-1 text-pink-400">*</span>
//                     </label>

//                     <select
//                       name="subcategory_id"
//                       value={formData.subcategory_id}
//                       onChange={handleChange}
//                       required
//                       disabled={!formData.category_id}
//                       className="h-11 w-full rounded-xl border border-white/10 bg-[#15121f] px-4 text-white outline-none focus:border-purple-500 disabled:opacity-50"
//                     >
//                       <option value="">Select Subcategory</option>

//                       {availableSubcategories.map((subcategory) => (
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

//                 {/* ROW 4 - STUDENT COUNT / DURATION / PRICE */}
//                 <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
//                   <div>
//                     <label className="mb-2 block text-sm font-semibold text-white">
//                       Student Count
//                     </label>

//                     <input
//                       type="number"
//                       name="students_count"
//                       min="0"
//                       value={formData.students_count}
//                       onChange={handleChange}
//                       placeholder="0"
//                       className="h-11 w-full rounded-xl border border-white/10 bg-[#15121f] px-4 text-white outline-none placeholder:text-white focus:border-purple-500"
//                     />
//                   </div>

//                   <div>
//                     <label className="mb-2 block text-sm font-semibold text-white">
//                       Duration
//                       <span className="ml-1 text-pink-400">*</span>
//                     </label>

//                     <div className="relative">
//                       <input
//                         type="number"
//                         name="duration"
//                         min="1"
//                         value={formData.duration}
//                         onChange={handleChange}
//                         required
//                         className="h-11 w-full rounded-xl border border-white/10 bg-[#15121f] px-4 pr-14 text-white outline-none focus:border-purple-500"
//                       />

//                       <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-white">
//                         min
//                       </span>
//                     </div>
//                   </div>

//                   <div>
//                     <label className="mb-2 block text-sm font-semibold text-white">
//                       Price
//                       <span className="ml-1 text-pink-400">*</span>
//                     </label>

//                     <input
//                       type="number"
//                       name="price"
//                       min="0"
//                       step="0.01"
//                       value={formData.price}
//                       onChange={handleChange}
//                       required
//                       placeholder="0.00"
//                       className="h-11 w-full rounded-xl border border-white/10 bg-[#15121f] px-4 text-white outline-none placeholder:text-white focus:border-purple-500"
//                     />
//                   </div>
//                 </div>

//                 {/* ROW 5 - START / END DATE */}
//                 <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                   <div>
//                     <label className="mb-2 block text-sm font-semibold text-white">
//                       <span className="inline-flex items-center gap-2">
//                         <CalendarDays
//                           size={16}
//                           className="text-purple-400"
//                         />
//                         Course Start Date
//                         <span className="text-pink-400">*</span>
//                       </span>
//                     </label>

//                     <input
//                       type="date"
//                       name="course_start_date"
//                       value={formData.course_start_date}
//                       onChange={handleStartDateChange}
//                       min={getTodayLocalDate()}
//                       required
//                       className="h-11 w-full rounded-xl border border-white/10 bg-[#15121f] px-4 text-white outline-none focus:border-purple-500"
//                     />
//                   </div>

//                   <div>
//                     <label className="mb-2 block text-sm font-semibold text-white">
//                       <span className="inline-flex items-center gap-2">
//                         <CalendarDays
//                           size={16}
//                           className="text-pink-400"
//                         />
//                         Course End Date
//                         <span className="text-pink-400">*</span>
//                       </span>
//                     </label>

//                     <input
//                       type="date"
//                       name="course_end_date"
//                       value={formData.course_end_date}
//                       onChange={handleEndDateChange}
//                       min={
//                         formData.course_start_date ||
//                         getTodayLocalDate()
//                       }
//                       required
//                       className="h-11 w-full rounded-xl border border-white/10 bg-[#15121f] px-4 text-white outline-none focus:border-purple-500"
//                     />
//                   </div>
//                 </div>

//                 {/* ROW 6 - CLASS TYPE / START TIME */}
//                 <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                   <div>
//                     <label className="mb-2 block text-sm font-semibold text-white">
//                       Class Type
//                       <span className="ml-1 text-pink-400">*</span>
//                     </label>

//                     <select
//                       name="class_type"
//                       value={formData.class_type}
//                       onChange={handleChange}
//                       required
//                       className="h-11 w-full rounded-xl border border-white/10 bg-[#15121f] px-4 text-white outline-none focus:border-purple-500"
//                     >
//                       {CLASS_TYPES.map((option) => (
//                         <option
//                           key={option.value}
//                           value={option.value}
//                         >
//                           {option.label}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <TimeSelector />
//                   <TimeSelector fieldName="end_time" label="End Time" />
//                 </div>

//                 {/* ROW 7 - IMAGE / AVAILABLE DAYS */}
//                 <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                   <div>
//                     <label className="mb-2 block text-sm font-semibold text-white">
//                       Class Image
//                     </label>

//                     <div className="rounded-xl border border-dashed border-white/15 bg-[#15121f] p-3">
//                       {editingClass && getImageUrl(editingClass) && (
//                         <div className="mb-3 flex items-center gap-3">
//                           <img
//                             src={getImageUrl(editingClass)}
//                             alt={formData.title || "Current class"}
//                             className="h-14 w-14 rounded-xl border border-white/10 object-cover"
//                           />

//                           <div className="min-w-0">
//                             <p className="text-xs font-semibold text-white">
//                               Current image
//                             </p>
//                             <p className="truncate text-xs text-white">
//                               Choose a new image to replace it.
//                             </p>
//                           </div>
//                         </div>
//                       )}

//                       <div className="flex items-center gap-3">
//                         <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-purple-500/20 bg-purple-500/10">
//                           <ImagePlus
//                             size={18}
//                             className="text-purple-400"
//                           />
//                         </div>

//                         <input
//                           type="file"
//                           name="image"
//                           accept="image/*"
//                           onChange={handleImageChange}
//                           className="min-w-0 w-full text-sm"
//                         />
//                       </div>

//                       {formData.image && (
//                         <p className="mt-2 truncate text-xs text-purple-300">
//                           Selected: {formData.image.name}
//                         </p>
//                       )}
//                     </div>
//                   </div>

//                   <div>
//                     <label className="mb-2 block text-sm font-semibold text-white">
//                       Available Days
//                       <span className="ml-1 text-pink-400">*</span>
//                     </label>

//                     <div className="grid grid-cols-4 gap-2 sm:grid-cols-4">
//                       {DAYS_LIST.map((day) => {
//                         const selected =
//                           formData.available_days.includes(day.value);

//                         const alreadyUsed =
//                           usedDaysByOtherClasses.has(day.value);

//                         return (
//                           <button
//                             key={day.value}
//                             type="button"
//                             disabled={alreadyUsed}
//                             onClick={() => toggleDay(day.value)}
//                             className={[
//                               "h-10 rounded-xl border text-xs font-semibold transition",
//                               selected
//                                 ? "border-transparent text-white"
//                                 : alreadyUsed
//                                 ? "cursor-not-allowed border-white/5 bg-[#111118] text-white"
//                                 : "border-white/10 bg-[#15121f] text-white hover:border-purple-500/50 hover:text-white",
//                             ].join(" ")}
//                             style={
//                               selected
//                                 ? {
//                                     background:
//                                       "linear-gradient(135deg,#9b2cff,#ff2aae)",
//                                   }
//                                 : undefined
//                             }
//                             title={
//                               alreadyUsed
//                                 ? `${day.label} is already assigned to another class`
//                                 : ""
//                             }
//                           >
//                             {day.label}
//                           </button>
//                         );
//                       })}
//                     </div>

//                     <p className="mt-2 text-xs text-white">
//                       A weekday can belong to only one class.
//                     </p>
//                   </div>
//                 </div>

//                 {/* Keep existing defaults for fields that are not shown in
//                     the requested UI: level and mode. They are still sent
//                     by handleSubmit. */}
//               </div>

//               {/* FOOTER */}
//               <div className="mt-5 flex justify-end gap-3 border-t border-white/10 pt-4">
//                 <button
//                   type="button"
//                   onClick={closeModal}
//                   disabled={saving}
//                   className="h-11 rounded-xl border border-white/10 px-5 font-semibold text-white transition hover:bg-white/5 disabled:opacity-50"
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   type="submit"
//                   disabled={saving}
//                   className="flex h-11 items-center gap-2 rounded-xl px-6 font-bold text-white transition disabled:opacity-50"
//                   style={{
//                     background:
//                       "linear-gradient(135deg,#9b2cff,#ff2aae)",
//                   }}
//                 >
//                   {saving ? (
//                     <Loader2
//                       size={18}
//                       className="animate-spin"
//                     />
//                   ) : (
//                     <Plus size={18} />
//                   )}

//                   {saving
//                     ? "Saving..."
//                     : editingClass
//                     ? "Update Class"
//                     : "Create Class"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* ===================================================
//           DELETE CONFIRMATION MODAL
//       =================================================== */}

//       {deleteConfirmClass && (
//         <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
//           <div className="w-full max-w-md rounded-2xl border border-red-500/20 bg-[#10121a] shadow-2xl">
//             <div className="p-5">
//               <div className="flex items-start gap-4">
//                 <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10">
//                   <Trash2
//                     size={21}
//                     className="text-red-400"
//                   />
//                 </div>

//                 <div className="min-w-0">
//                   <h3 className="text-lg font-bold text-white">
//                     Delete Class?
//                   </h3>

//                   <p className="mt-2 text-sm leading-6 text-white">
//                     Are you sure you want to delete{" "}
//                     <span className="font-semibold text-white">
//                       "{deleteConfirmClass.title || "this class"}"
//                     </span>
//                     ? This action cannot be undone.
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="flex justify-end gap-3 border-t border-white/10 px-5 py-4">
//               <button
//                 type="button"
//                 onClick={() => setDeleteConfirmClass(null)}
//                 disabled={deleting}
//                 className="h-11 rounded-xl border border-white/10 px-5 font-semibold text-white transition hover:bg-white/5 disabled:opacity-50"
//               >
//                 Cancel
//               </button>

//               <button
//                 type="button"
//                 onClick={confirmDeleteClass}
//                 disabled={deleting}
//                 className="flex h-11 items-center gap-2 rounded-xl bg-red-600 px-5 font-bold text-white transition hover:bg-red-500 disabled:opacity-50"
//               >
//                 {deleting ? (
//                   <Loader2
//                     size={17}
//                     className="animate-spin"
//                   />
//                 ) : (
//                   <Trash2 size={17} />
//                 )}

//                 {deleting ? "Deleting..." : "Delete Class"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//     </>
//   );
// }






import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  BookOpen,
  CalendarDays,
  Clock3,
  Edit,
  ImagePlus,
  Loader2,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  Users,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

import API from "../services/api";

/* =========================================================
   DAYS
========================================================= */

const DAYS_LIST = [
  { value: "MONDAY", label: "Mon" },
  { value: "TUESDAY", label: "Tue" },
  { value: "WEDNESDAY", label: "Wed" },
  { value: "THURSDAY", label: "Thu" },
  { value: "FRIDAY", label: "Fri" },
  { value: "SATURDAY", label: "Sat" },
  { value: "SUNDAY", label: "Sun" },
];

/* =========================================================
   CLASS TYPE
========================================================= */

const CLASS_TYPES = [
  {
    value: "LIVE",
    label: "Live Class",
  },
  {
    value: "RECORDING",
    label: "Recorded Class",
  },
];

/* =========================================================
   MODE
========================================================= */

const MODE_OPTIONS = [
  {
    value: "ONLINE",
    label: "Online",
  },
  {
    value: "OFFLINE",
    label: "Offline",
  },
];

/* =========================================================
   DEFAULT FORM
========================================================= */

const DEFAULT_FORM = {
  title: "",
  description: "",

  image: null,

  category_id: "",
  subcategory_id: "",

  price: "",
  duration: "60",
  students_count: "",

  level: "BEGINNER",

  mode: "ONLINE",

  class_type: "LIVE",

  course_start_date: "",
  course_end_date: "",

  start_time: "",
  end_time: "",

  available_days: [],
};

/* =========================================================
   TODAY
========================================================= */

const getTodayLocalDate = () => {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

/* =========================================================
   DEFAULT FORM FACTORY
========================================================= */

const getDefaultForm = () => {
  const today = getTodayLocalDate();

  return {
    ...DEFAULT_FORM,
    course_start_date: today,
    course_end_date: today,
  };
};

/* =========================================================
   DATE HELPERS
========================================================= */

const normalizeDateForInput = (value) => {
  if (!value) return "";

  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    const year = value.getFullYear();

    const month = String(value.getMonth() + 1).padStart(
      2,
      "0"
    );

    const day = String(value.getDate()).padStart(
      2,
      "0"
    );

    return `${year}-${month}-${day}`;
  }

  const stringValue = String(value).trim();

  if (!stringValue) return "";

  const match = stringValue.match(
    /^(\d{4})[-/](\d{1,2})[-/](\d{1,2})/
  );

  if (!match) return "";

  const year = match[1];

  const month = String(match[2]).padStart(
    2,
    "0"
  );

  const day = String(match[3]).padStart(
    2,
    "0"
  );

  return `${year}-${month}-${day}`;
};

const normalizeCurrentOrFutureDate = (value) => {
  const normalized = normalizeDateForInput(value);

  if (!normalized) {
    return getTodayLocalDate();
  }

  const today = getTodayLocalDate();

  if (normalized < today) {
    return today;
  }

  return normalized;
};

const formatDate = (value) => {
  const normalized = normalizeDateForInput(value);

  if (!normalized) return "-";

  const [year, month, day] = normalized.split("-");

  return `${day}/${month}/${year}`;
};

/* =========================================================
   TIME HELPERS
========================================================= */

const normalizeTimeForInput = (value) => {
  if (!value) return "";

  if (
    value instanceof Date &&
    !Number.isNaN(value.getTime())
  ) {
    const hours = String(value.getHours()).padStart(
      2,
      "0"
    );

    const minutes = String(value.getMinutes()).padStart(
      2,
      "0"
    );

    return `${hours}:${minutes}`;
  }

  let time = String(value)
    .trim()
    .toUpperCase();

  if (!time) return "";

  const embeddedTime = time.match(
    /(?:T|\s)(\d{1,2}:\d{2}(?::\d{2}(?:.\d+)?)?(?:\s*(?:AM|PM))?)/i
  );

  if (embeddedTime) {
    time = embeddedTime[1];
  }

  time = time
    .replace(/Z$/i, "")
    .replace(/[+-]\d{2}:?\d{2}$/, "")
    .trim();

  const twelveHour = time.match(
    /^(\d{1,2}):(\d{2})(?::\d{2}(?:.\d+)?)?\s*(AM|PM)$/i
  );

  if (twelveHour) {
    let hour = Number(twelveHour[1]);

    const minute = Number(twelveHour[2]);

    const period = twelveHour[3].toUpperCase();

    if (
      hour < 1 ||
      hour > 12 ||
      minute > 59
    ) {
      return "";
    }

    if (
      period === "AM" &&
      hour === 12
    ) {
      hour = 0;
    }

    if (
      period === "PM" &&
      hour !== 12
    ) {
      hour += 12;
    }

    return `${String(hour).padStart(
      2,
      "0"
    )}:${String(minute).padStart(
      2,
      "0"
    )}`;
  }

  const twentyFourHour = time.match(
    /^(\d{1,2}):(\d{2})(?::\d{2}(?:.\d+)?)?$/
  );

  if (twentyFourHour) {
    const hour = Number(
      twentyFourHour[1]
    );

    const minute = Number(
      twentyFourHour[2]
    );

    if (
      hour > 23 ||
      minute > 59
    ) {
      return "";
    }

    return `${String(hour).padStart(
      2,
      "0"
    )}:${String(minute).padStart(
      2,
      "0"
    )}`;
  }

  return "";
};

const formatTime = (value) => {
  const normalized =
    normalizeTimeForInput(value);

  if (!normalized) return "-";

  const [
    hoursString,
    minutes,
  ] = normalized.split(":");

  let hours = Number(
    hoursString
  );

  const period =
    hours >= 12
      ? "PM"
      : "AM";

  hours = hours % 12;

  if (hours === 0) {
    hours = 12;
  }

  return `${String(hours).padStart(
    2,
    "0"
  )}:${minutes} ${period}`;
};

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

  const [
    hoursString,
    minute,
  ] = normalized.split(":");

  let hours = Number(
    hoursString
  );

  const period =
    hours >= 12
      ? "PM"
      : "AM";

  hours = hours % 12;

  if (hours === 0) {
    hours = 12;
  }

  return {
    hour: String(hours).padStart(
      2,
      "0"
    ),
    minute,
    period,
  };
};

const convertTimePartsTo24Hour = (
  hour,
  minute,
  period
) => {
  let hours = Number(
    hour || 12
  );

  const minutes = Number(
    minute || 0
  );

  if (
    period === "AM" &&
    hours === 12
  ) {
    hours = 0;
  }

  if (
    period === "PM" &&
    hours !== 12
  ) {
    hours += 12;
  }

  return `${String(hours).padStart(
    2,
    "0"
  )}:${String(minutes).padStart(
    2,
    "0"
  )}:00`;
};

/* =========================================================
   ARRAY HELPERS
========================================================= */

const normalizeArray = (value) => {
  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);

      if (Array.isArray(parsed)) {
        return parsed;
      }
    } catch {
      return value
        .split(",")
        .map((item) =>
          item.trim()
        )
        .filter(Boolean);
    }
  }

  return [];
};

const normalizeAvailableDays = (
  value
) => {
  const days = normalizeArray(value);

  return days
    .map((day) => {
      if (
        typeof day === "object" &&
        day !== null
      ) {
        return String(
          day.day ||
            day.day_name ||
            day.name ||
            day.value ||
            ""
        )
          .trim()
          .toUpperCase();
      }

      return String(day)
        .trim()
        .toUpperCase();
    })
    .filter((day) =>
      DAYS_LIST.some(
        (item) =>
          item.value === day
      )
    );
};

/* =========================================================
   CLASS FIELD HELPERS
========================================================= */

const getClassStartDate = (
  cls
) =>
  normalizeDateForInput(
    cls?.start_date ??
      cls?.course_start_date ??
      cls?.courseStartDate ??
      cls?.startDate ??
      ""
  );

const getClassEndDate = (
  cls
) =>
  normalizeDateForInput(
    cls?.end_date ??
      cls?.course_end_date ??
      cls?.courseEndDate ??
      cls?.endDate ??
      ""
  );

const getClassStartTime = (
  cls
) =>
  normalizeTimeForInput(
    cls?.start_time ??
      cls?.default_start_time ??
      cls?.startTime ??
      cls?.defaultStartTime ??
      cls?.course_start_time ??
      cls?.courseStartTime ??
      cls?.class_start_time ??
      ""
  );

const getClassDays = (cls) =>
  normalizeAvailableDays(
    cls?.available_days ??
      cls?.availableDays ??
      cls?.days ??
      cls?.class_days ??
      []
  );

const getClassType = (cls) => {
  const value =
    cls?.class_type ??
    cls?.classType ??
    cls?.type ??
    "LIVE";

  const normalized = String(value).trim().toUpperCase();
  // Backend API accepts LIVE or RECORDING (not RECORDED).
  return normalized === "RECORDED" ? "RECORDING" : normalized;
};

/* =========================================================
   SPECIALIZATION NORMALIZER
========================================================= */

const normalizeSpecializations = (
  responseData
) => {
  const root =
    responseData?.data ??
    responseData ??
    {};

  let rawCategories = [];
  let rawSubcategories = [];

  if (Array.isArray(root)) {
    rawCategories = root;
  } else {
    rawCategories =
      root?.categories ||
      root?.specializations ||
      root?.data ||
      [];

    rawSubcategories =
      root?.subcategories ||
      [];
  }

  const categoriesMap =
    new Map();

  const subcategoriesMap =
    new Map();

  const addCategory = (
    category
  ) => {
    if (!category) return;

    const id =
      category?.id ??
      category?.category_id;

    if (
      id === undefined ||
      id === null
    ) {
      return;
    }

    categoriesMap.set(
      String(id),
      {
        id,
        name:
          category?.name ||
          category?.category_name ||
          `Category ${id}`,
      }
    );
  };

  const addSubcategory = (
    subcategory
  ) => {
    if (!subcategory) return;

    const id =
      subcategory?.id ??
      subcategory?.subcategory_id;

    if (
      id === undefined ||
      id === null
    ) {
      return;
    }

    const categoryId =
      subcategory?.category_id ??
      subcategory?.categoryId;

    subcategoriesMap.set(
      String(id),
      {
        id,
        category_id:
          categoryId,
        name:
          subcategory?.name ||
          subcategory?.subcategory_name ||
          `Subcategory ${id}`,
      }
    );
  };

  rawCategories.forEach(
    (item) => {
      if (!item) return;

      if (
        item?.category ||
        item?.category_id
      ) {
        addCategory(
          item?.category ||
            item
        );
      }

      if (
        item?.subcategory ||
        item?.subcategory_id
      ) {
        addSubcategory(
          item?.subcategory ||
            item
        );
      }

      if (
        Array.isArray(
          item?.subcategories
        )
      ) {
        addCategory(item);

        item.subcategories.forEach(
          addSubcategory
        );
      }
    }
  );

  rawSubcategories.forEach(
    addSubcategory
  );

  return {
    categories:
      Array.from(
        categoriesMap.values()
      ),
    subcategories:
      Array.from(
        subcategoriesMap.values()
      ),
  };
};

/* =========================================================
   COMPONENT
========================================================= */

export default function TrainerClasses() {
  const auth = getAuth();
  const navigate = useNavigate();

  /* =======================================================
     STATE
  ======================================================= */

  const [classes, setClasses] =
    useState([]);

  const [categories, setCategories] =
    useState([]);

  const [
    subcategories,
    setSubcategories,
  ] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [
    refreshing,
    setRefreshing,
  ] = useState(false);

  const [
    specializationsLoading,
    setSpecializationsLoading,
  ] = useState(true);

  const [saving, setSaving] =
    useState(false);

  const [deleting, setDeleting] =
    useState(false);

  const [
    searchQuery,
    setSearchQuery,
  ] = useState("");

  const [
    showModal,
    setShowModal,
  ] = useState(false);

  const [
    editingClass,
    setEditingClass,
  ] = useState(null);

  const [
    deleteConfirmClass,
    setDeleteConfirmClass,
  ] = useState(null);

  const [
    formData,
    setFormData,
  ] = useState(
    getDefaultForm()
  );

  /* =======================================================
     AUTH CONFIG
  ======================================================= */

  const getConfig = async () => {
    let token =
      localStorage.getItem(
        "token"
      );

    const currentUser =
      auth.currentUser;

    if (currentUser) {
      try {
        token =
          await currentUser.getIdToken(
            true
          );
      } catch (error) {
        console.error(
          "Firebase token error:",
          error
        );
      }
    }

    if (!token) {
      throw new Error(
        "Authentication token not found."
      );
    }

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  /* =======================================================
     FETCH CLASSES
  ======================================================= */

  const fetchClasses = async (
    showError = true
  ) => {
    try {
      const config =
        await getConfig();

      const response =
        await API.get(
          "/classes/trainer/my-classes",
          config
        );

      const responseData =
        response?.data;

      /*
       * Backend response:
       *
       * {
       *   success: true,
       *   data: [...]
       * }
       */

      const classList =
        Array.isArray(
          responseData?.data
        )
          ? responseData.data
          : Array.isArray(
              responseData?.classes
            )
          ? responseData.classes
          : Array.isArray(
              responseData
            )
          ? responseData
          : [];

      setClasses(classList);

      return classList;
    } catch (error) {
      console.error(
        "FETCH TRAINER CLASSES ERROR:",
        error?.response?.data ||
          error?.message ||
          error
      );

      setClasses([]);

      if (showError) {
        toast.error(
          error?.response?.data
            ?.message ||
            "Failed to load classes."
        );
      }

      return [];
    }
  };

  /* =======================================================
     FETCH SPECIALIZATIONS
  ======================================================= */

  const fetchTrainerSpecializations =
    async (
      showError = true
    ) => {
      setSpecializationsLoading(
        true
      );

      try {
        const config =
          await getConfig();

        const response =
          await API.get(
            "/trainers/my-specializations",
            config
          );

        const normalized =
          normalizeSpecializations(
            response?.data
          );

        setCategories(
          normalized.categories
        );

        setSubcategories(
          normalized.subcategories
        );

        return normalized;
      } catch (error) {
        console.error(
          "FETCH TRAINER SPECIALIZATIONS ERROR:",
          error?.response?.data ||
            error?.message ||
            error
        );

        setCategories([]);
        setSubcategories([]);

        if (showError) {
          toast.error(
            error?.response?.data
              ?.message ||
              "Failed to load trainer specializations."
          );
        }

        return {
          categories: [],
          subcategories: [],
        };
      } finally {
        setSpecializationsLoading(
          false
        );
      }
    };

  /* =======================================================
     REFRESH EVERYTHING
  ======================================================= */

  const handleRefresh = async () => {
    if (refreshing) return;

    setRefreshing(true);

    try {
      await Promise.all([
        fetchClasses(false),
        fetchTrainerSpecializations(
          false
        ),
      ]);

      toast.success(
        "Classes refreshed."
      );
    } catch (error) {
      console.error(
        "REFRESH ERROR:",
        error
      );

      toast.error(
        "Failed to refresh classes."
      );
    } finally {
      setRefreshing(false);
    }
  };

  /* =======================================================
     INITIAL LOAD
  ======================================================= */

  useEffect(() => {
    let unsubscribe;

    const loadData =
      async () => {
        setLoading(true);

        try {
          await fetchClasses();

          /*
           * Specializations are loaded
           * independently.
           */
          fetchTrainerSpecializations();
        } finally {
          setLoading(false);
        }
      };

    unsubscribe =
      onAuthStateChanged(
        auth,
        (firebaseUser) => {
          if (firebaseUser) {
            loadData();
          } else if (
            localStorage.getItem(
              "token"
            )
          ) {
            loadData();
          } else {
            setClasses([]);
            setLoading(false);
            setSpecializationsLoading(
              false
            );
          }
        }
      );

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* =======================================================
     AVAILABLE SUBCATEGORIES
  ======================================================= */

  const availableSubcategories =
    useMemo(() => {
      if (
        !formData.category_id
      ) {
        return [];
      }

      return subcategories.filter(
        (subcategory) =>
          String(
            subcategory.category_id
          ) ===
          String(
            formData.category_id
          )
      );
    }, [
      subcategories,
      formData.category_id,
    ]);

  /* =======================================================
     USED DAYS
     
     SAME SUBCATEGORY:
     Allowed.

     SAME DAY:
     Not allowed.
  ======================================================= */

  const usedDaysByOtherClasses =
    useMemo(() => {
      const used = new Set();

      classes.forEach((cls) => {
        if (
          editingClass &&
          String(cls?.id) ===
            String(
              editingClass?.id
            )
        ) {
          return;
        }

        const days =
          getClassDays(cls);

        days.forEach((day) => {
          used.add(day);
        });
      });

      return used;
    }, [
      classes,
      editingClass,
    ]);

  /* =======================================================
     FILTER CLASSES
  ======================================================= */

  const filteredClasses =
    useMemo(() => {
      const query =
        searchQuery
          .trim()
          .toLowerCase();

      if (!query) {
        return classes;
      }

      return classes.filter(
        (cls) => {
          const values = [
            cls?.id,
            cls?.title,
            cls?.description,
            cls?.category_name,
            cls?.subcategory_name,
            cls?.category,
            cls?.subcategory,
            cls?.level,
            cls?.mode,
            cls?.class_type,
          ];

          return values.some(
            (value) =>
              String(value || "")
                .toLowerCase()
                .includes(query)
          );
        }
      );
    }, [
      classes,
      searchQuery,
    ]);

  /* =======================================================
     FORM CHANGE
  ======================================================= */

  const handleChange = (
    event
  ) => {
    const {
      name,
      value,
    } = event.target;

    setFormData(
      (previous) => ({
        ...previous,
        [name]: value,
      })
    );
  };

  /* =======================================================
     CATEGORY CHANGE
  ======================================================= */

  const handleCategoryChange = (
    event
  ) => {
    const categoryId =
      event.target.value;

    setFormData(
      (previous) => ({
        ...previous,
        category_id:
          categoryId,
        subcategory_id:
          "",
      })
    );
  };

  /* =======================================================
     START DATE
  ======================================================= */

  const handleStartDateChange =
    (event) => {
      const value =
        event.target.value;

      if (!value) {
        setFormData(
          (previous) => ({
            ...previous,
            course_start_date:
              "",
          })
        );

        return;
      }

      const today =
        getTodayLocalDate();

      if (value < today) {
        toast.error(
          "Course start date cannot be before today."
        );

        return;
      }

      setFormData(
        (previous) => {
          let endDate =
            previous.course_end_date;

          if (
            !endDate ||
            endDate < value
          ) {
            endDate = value;
          }

          return {
            ...previous,
            course_start_date:
              value,
            course_end_date:
              endDate,
          };
        }
      );
    };

  /* =======================================================
     END DATE
  ======================================================= */

  const handleEndDateChange =
    (event) => {
      const value =
        event.target.value;

      if (!value) {
        setFormData(
          (previous) => ({
            ...previous,
            course_end_date:
              "",
          })
        );

        return;
      }

      const today =
        getTodayLocalDate();

      if (value < today) {
        toast.error(
          "Course end date cannot be before today."
        );

        return;
      }

      if (
        formData.course_start_date &&
        value <
          formData.course_start_date
      ) {
        toast.error(
          "Course end date cannot be before course start date."
        );

        return;
      }

      setFormData(
        (previous) => ({
          ...previous,
          course_end_date:
            value,
        })
      );
    };

  /* =======================================================
     IMAGE
  ======================================================= */

  const handleImageChange =
    (event) => {
      const file =
        event.target.files?.[0];

      if (!file) return;

      if (
        !file.type ||
        !file.type.startsWith(
          "image/"
        )
      ) {
        toast.error(
          "Please select an image file only."
        );

        event.target.value = "";

        return;
      }

      const maxSize =
        10 * 1024 * 1024;

      if (file.size > maxSize) {
        toast.error(
          "Image must be smaller than 10 MB."
        );

        event.target.value = "";

        return;
      }

      setFormData(
        (previous) => ({
          ...previous,
          image: file,
        })
      );
    };

  /* =======================================================
     DAY TOGGLE
  ======================================================= */

  const toggleDay = (day) => {
    if (
      usedDaysByOtherClasses.has(
        day
      )
    ) {
      const label =
        DAYS_LIST.find(
          (item) =>
            item.value === day
        )?.label ||
        day;

      toast.error(
        `${label} is already assigned to another class.`
      );

      return;
    }

    setFormData(
      (previous) => {
        const current =
          previous.available_days ||
          [];

        if (
          current.includes(day)
        ) {
          return {
            ...previous,
            available_days:
              current.filter(
                (item) =>
                  item !== day
              ),
          };
        }

        return {
          ...previous,
          available_days: [
            ...current,
            day,
          ],
        };
      }
    );
  };

  /* =======================================================
     TIME
  ======================================================= */

  const setTimePart = (
    part,
    value,
    fieldName = "start_time"
  ) => {
    const current =
      getTimeParts(
        formData[fieldName]
      );

    let hour =
      current.hour || "12";

    let minute =
      current.minute || "00";

    let period =
      current.period || "AM";

    if (part === "hour") {
      hour = value;
    }

    if (part === "minute") {
      minute = value;
    }

    if (part === "period") {
      period = value;
    }

    const newTime =
      convertTimePartsTo24Hour(
        hour,
        minute,
        period
      );

    setFormData(
      (previous) => ({
        ...previous,
        [fieldName]:
          newTime,
      })
    );
  };

  /* =======================================================
     CREATE MODAL
  ======================================================= */

  const openCreateModal =
    () => {
      if (
        specializationsLoading
      ) {
        toast.error(
          "Trainer specializations are still loading."
        );

        return;
      }

      if (
        categories.length === 0
      ) {
        toast.error(
          "No trainer categories are available."
        );

        return;
      }

      setEditingClass(null);

      setFormData(
        getDefaultForm()
      );

      setShowModal(true);
    };

  /* =======================================================
     EDIT
  ======================================================= */

  const handleEdit = (
    cls
  ) => {
    const rawStartDate =
      cls?.start_date ??
      cls?.course_start_date ??
      cls?.courseStartDate ??
      cls?.startDate ??
      "";

    const rawEndDate =
      cls?.end_date ??
      cls?.course_end_date ??
      cls?.courseEndDate ??
      cls?.endDate ??
      "";

    const rawTime =
      cls?.start_time ??
      cls?.default_start_time ??
      cls?.startTime ??
      cls?.defaultStartTime ??
      cls?.course_start_time ??
      cls?.courseStartTime ??
      cls?.class_start_time ??
      "";

    const startDate =
      normalizeCurrentOrFutureDate(
        rawStartDate
      );

    let endDate =
      normalizeCurrentOrFutureDate(
        rawEndDate
      );

    if (
      !endDate ||
      endDate < startDate
    ) {
      endDate =
        startDate;
    }

    const categoryId =
      cls?.category_id ??
      cls?.categoryId ??
      "";

    const subcategoryId =
      cls?.subcategory_id ??
      cls?.subcategoryId ??
      "";

    const classType =
      getClassType(cls);

    setEditingClass(cls);

    setFormData({
      title:
        cls?.title || "",

      description:
        cls?.description || "",

      image: null,

      category_id:
        categoryId,

      subcategory_id:
        subcategoryId,

      price:
        cls?.price ?? "",

      duration:
        cls?.duration ??
        "60",

      students_count:
        cls?.students_count ??
        cls?.max_students ??
        "",

      level:
        cls?.level ||
        "BEGINNER",

      mode:
        cls?.mode ||
        "ONLINE",

      class_type:
        classType === "RECORDING" ? "RECORDING" : "LIVE",

      course_start_date:
        startDate,

      course_end_date:
        endDate,

      start_time:
        normalizeTimeForInput(
          rawTime
        ),
      end_time:
        normalizeTimeForInput(
          cls?.end_time ?? cls?.endTime ?? cls?.default_end_time ?? ""
        ),

      available_days:
        getClassDays(cls),
    });

    setShowModal(true);
  };

  /* =======================================================
     DELETE CONFIRMATION
  ======================================================= */

  const handleDelete = (cls) => {
    if (!cls?.id) return;
    setDeleteConfirmClass(cls);
  };

  const confirmDeleteClass = async () => {
    if (!deleteConfirmClass?.id) return;

    setDeleting(true);

    try {
      const config = await getConfig();

      await API.delete(
        `/classes/trainer/${deleteConfirmClass.id}`,
        config
      );

      toast.success("Class deleted successfully.");
      setDeleteConfirmClass(null);

      await fetchClasses();
    } catch (error) {
      console.error(
        "DELETE CLASS ERROR:",
        error?.response?.data ||
          error?.message ||
          error
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to delete class."
      );
    } finally {
      setDeleting(false);
    }
  };

  /* =======================================================
     SUBMIT
  ======================================================= */

  const handleSubmit =
    async (event) => {
      event.preventDefault();

      const title =
        formData.title.trim();

      if (!title) {
        toast.error(
          "Class name is required."
        );

        return;
      }

      if (
        !formData.category_id
      ) {
        toast.error(
          "Please select a category."
        );

        return;
      }

      if (
        !formData.subcategory_id
      ) {
        toast.error(
          "Please select a subcategory."
        );

        return;
      }

      if (
        formData.price === "" ||
        formData.price === null ||
        formData.price ===
          undefined
      ) {
        toast.error(
          "Price is required."
        );

        return;
      }

      const price = Number(
        formData.price
      );

      if (
        Number.isNaN(price) ||
        price < 0
      ) {
        toast.error(
          "Please enter a valid price."
        );

        return;
      }

      if (
        formData.duration ===
          "" ||
        formData.duration ===
          null ||
        formData.duration ===
          undefined
      ) {
        toast.error(
          "Duration is required."
        );

        return;
      }

      const duration =
        Number(
          formData.duration
        );

      if (
        Number.isNaN(duration) ||
        duration <= 0
      ) {
        toast.error(
          "Duration must be greater than 0."
        );

        return;
      }

      if (
        !formData.course_start_date
      ) {
        toast.error(
          "Course start date is required."
        );

        return;
      }

      if (
        !formData.course_end_date
      ) {
        toast.error(
          "Course end date is required."
        );

        return;
      }

      const today =
        getTodayLocalDate();

      if (
        formData.course_start_date <
        today
      ) {
        toast.error(
          "Course start date cannot be before today."
        );

        return;
      }

      if (
        formData.course_end_date <
        today
      ) {
        toast.error(
          "Course end date cannot be before today."
        );

        return;
      }

      if (
        formData.course_end_date <
        formData.course_start_date
      ) {
        toast.error(
          "Course end date cannot be before start date."
        );

        return;
      }

      if (
        !formData.start_time
      ) {
        toast.error(
          "Start time is required."
        );

        return;
      }

      if (!formData.end_time) {
        toast.error("End time is required.");
        return;
      }

      if (formData.end_time <= formData.start_time) {
        toast.error("End time must be later than start time.");
        return;
      }

      if (
        !formData.available_days ||
        formData.available_days
          .length === 0
      ) {
        toast.error(
          "Please select at least one available day."
        );

        return;
      }

      if (
        !formData.class_type
      ) {
        toast.error(
          "Please select class type."
        );

        return;
      }

      /* ============================================
         SAME DAY CHECK
      ============================================ */

      for (const day of
        formData.available_days) {
        if (
          usedDaysByOtherClasses.has(
            day
          )
        ) {
          const label =
            DAYS_LIST.find(
              (item) =>
                item.value ===
                day
            )?.label ||
            day;

          toast.error(
            `${label} is already assigned to another class.`
          );

          return;
        }
      }

      setSaving(true);

      try {
        const config =
          await getConfig();

        const payload =
          new FormData();

        payload.append(
          "title",
          title
        );

        payload.append(
          "description",
          formData.description?.trim() ||
            ""
        );

        payload.append(
          "category_id",
          String(
            formData.category_id
          )
        );

        payload.append(
          "subcategory_id",
          String(
            formData.subcategory_id
          )
        );

        payload.append(
          "price",
          String(price)
        );

        payload.append(
          "duration",
          String(duration)
        );

        payload.append(
          "students_count",
          formData.students_count ===
            ""
            ? "0"
            : String(
                Number(
                  formData.students_count
                ) || 0
              )
        );

        payload.append(
          "level",
          formData.level
        );

        /* ==========================================
           MODE
        ========================================== */

        payload.append(
          "mode",
          formData.mode
        );

        /* ==========================================
           CLASS TYPE
        ========================================== */

        payload.append(
          "class_type",
          formData.class_type
        );

        /* ==========================================
           DATES
        ========================================== */

        payload.append(
          "start_date",
          formData.course_start_date
        );

        payload.append(
          "end_date",
          formData.course_end_date
        );

        /*
         * Compatibility aliases
         */

        payload.append(
          "course_start_date",
          formData.course_start_date
        );

        payload.append(
          "course_end_date",
          formData.course_end_date
        );

        /* ==========================================
           TIME
        ========================================== */

        payload.append(
          "start_time",
          normalizeTimeForInput(
            formData.start_time
          ) + ":00"
        );

        payload.append(
          "end_time",
          normalizeTimeForInput(formData.end_time) + ":00"
        );

        /* ==========================================
           DAYS
        ========================================== */

        payload.append(
          "available_days",
          JSON.stringify(
            formData.available_days
          )
        );

        /* ==========================================
           IMAGE
        ========================================== */

        if (
          formData.image &&
          formData.image.type?.startsWith(
            "image/"
          )
        ) {
          payload.append(
            "image",
            formData.image
          );
        }

        let response;

        if (
          editingClass?.id
        ) {
          response =
            await API.put(
              `/classes/trainer/${editingClass.id}`,
              payload,
              {
                ...config,
                headers: {
                  ...config.headers,
                  "Content-Type":
                    "multipart/form-data",
                },
              }
            );
        } else {
          response =
            await API.post(
              "/classes/trainer/create",
              payload,
              {
                ...config,
                headers: {
                  ...config.headers,
                  "Content-Type":
                    "multipart/form-data",
                },
              }
            );
        }

        console.log(
          "CLASS SAVE RESPONSE:",
          response?.data
        );

        toast.success(
          editingClass
            ? "Class updated successfully."
            : "Class created successfully."
        );

        setShowModal(false);

        setEditingClass(null);

        setFormData(
          getDefaultForm()
        );

        await fetchClasses();
      } catch (error) {
        console.error(
          "SAVE CLASS ERROR:",
          error?.response?.data ||
            error?.message ||
            error
        );

        toast.error(
          error?.response?.data
            ?.message ||
            "Failed to save class."
        );
      } finally {
        setSaving(false);
      }
    };

  /* =======================================================
     IMAGE URL
  ======================================================= */

  const getImageUrl = (
    cls
  ) => {
    return (
      cls?.image ||
      cls?.image_url ||
      cls?.class_image ||
      cls?.class_image_url ||
      ""
    );
  };

  /* =======================================================
     CLOSE MODAL
  ======================================================= */

  const closeModal = () => {
    if (saving) return;

    setShowModal(false);

    setEditingClass(null);

    setFormData(
      getDefaultForm()
    );
  };

  /* =======================================================
     TIME SELECTOR
  ======================================================= */

  const TimeSelector =
    ({ fieldName = "start_time", label = "Start Time" }) => {
      const parts =
        getTimeParts(
          formData[fieldName]
        );

      return (
        <div>
          <label className="block text-sm font-semibold text-white mb-2">
            <span className="inline-flex items-center gap-2">
              <Clock3
                size={16}
                className="text-purple-400"
              />

              {label}

              <span className="text-pink-400">
                *
              </span>
            </span>
          </label>

          <div className="flex items-center gap-2">
            <select
              value={parts.hour}
              onChange={(
                event
              ) =>
                setTimePart(
                  "hour",
                  event.target.value,
                  fieldName
                )
              }
              required
              className="w-full h-11 rounded-xl border border-white/10 bg-[#15121f] px-3 text-sm font-semibold text-white outline-none focus:border-purple-500"
            >
              <option value="">
                Hour
              </option>

              {Array.from(
                {
                  length: 12,
                },
                (
                  _,
                  index
                ) => {
                  const value =
                    String(
                      index + 1
                    ).padStart(
                      2,
                      "0"
                    );

                  return (
                    <option
                      key={
                        value
                      }
                      value={
                        value
                      }
                    >
                      {value}
                    </option>
                  );
                }
              )}
            </select>

            <span className="text-lg font-bold text-white">
              :
            </span>

            <select
              value={
                parts.minute
              }
              onChange={(
                event
              ) =>
                setTimePart(
                  "minute",
                  event.target.value,
                  fieldName
                )
              }
              required
              className="w-full h-11 rounded-xl border border-white/10 bg-[#15121f] px-3 text-sm font-semibold text-white outline-none focus:border-purple-500"
            >
              <option value="">
                Min
              </option>

              {Array.from(
                {
                  length: 60,
                },
                (
                  _,
                  index
                ) => {
                  const value =
                    String(
                      index
                    ).padStart(
                      2,
                      "0"
                    );

                  return (
                    <option
                      key={
                        value
                      }
                      value={
                        value
                      }
                    >
                      {value}
                    </option>
                  );
                }
              )}
            </select>

            <select
              value={
                parts.period
              }
              onChange={(
                event
              ) =>
                setTimePart(
                  "period",
                  event.target.value,
                  fieldName
                )
              }
              required
              className="w-full h-11 rounded-xl border border-white/10 bg-[#15121f] px-3 text-sm font-semibold text-white outline-none focus:border-purple-500"
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
      );
    };

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <div className="min-h-screen bg-[#07080d] text-white flex items-center justify-center">
        <div className="flex items-center gap-3 text-white">
          <Loader2
            size={22}
            className="animate-spin text-white"
          />

          Loading classes...
        </div>
      </div>
    );
  }

  /* =======================================================
     UI
  ======================================================= */

  return (
    <>
      {/* ===================================================
          STYLES
      =================================================== */}

      <style>{`
        input[type="date"] {
          color-scheme: dark;
          accent-color: #a855f7;
        }

        input[type="date"]::-webkit-calendar-picker-indicator {
          cursor: pointer;
          opacity: 1;
          filter:
            invert(48%)
            sepia(90%)
            saturate(1800%)
            hue-rotate(245deg)
            brightness(105%)
            contrast(105%);
        }

        input[type="date"]::-webkit-calendar-picker-indicator:hover {
          filter:
            invert(55%)
            sepia(95%)
            saturate(2200%)
            hue-rotate(245deg)
            brightness(115%)
            contrast(110%);
        }

        input[type="file"] {
          color: #9ca3af;
        }

        input[type="file"]::file-selector-button {
          margin-right: 12px;
          border: 0;
          border-radius: 10px;
          padding: 8px 14px;
          background: linear-gradient(
            135deg,
            #9b2cff,
            #ff2aae
          );
          color: white;
          font-weight: 700;
          cursor: pointer;
        }

        input[type="file"]::file-selector-button:hover {
          opacity: 0.9;
        }
      `}</style>

      <div className="min-h-screen bg-[#07080d] text-white px-4 py-6 md:px-8">
        <div className="max-w-[1500px] mx-auto">

          {/* =================================================
              HEADER
          ================================================= */}

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-7">
            <div>
              <div className="flex items-center gap-3">
                <BookOpen
                  size={32}
                  className="text-white"
                />

                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-300 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                  My Classes
                </h1>
              </div>

              <p className="text-white mt-2">
                Create and manage your
                trainer classes.
              </p>
            </div>

            <div className="flex items-center gap-3">

              {/* REFRESH */}

              <button
                type="button"
                onClick={
                  handleRefresh
                }
                disabled={
                  refreshing
                }
                className="h-12 px-4 rounded-xl border border-white/10 bg-[#15121f] text-white font-semibold flex items-center gap-2 hover:border-purple-500/50 hover:text-white transition disabled:opacity-50"
                title="Refresh classes"
              >
                <RefreshCw
                  size={18}
                  className={
                    refreshing
                      ? "animate-spin"
                      : ""
                  }
                />

                <span className="hidden sm:inline">
                  Refresh
                </span>
              </button>

              {/* CREATE */}

              <button
                type="button"
                onClick={
                  openCreateModal
                }
                className="h-12 inline-flex items-center justify-center gap-2 rounded-xl px-6 font-bold text-white shadow-lg transition hover:scale-[1.02]"
                style={{
                  background:
                    "linear-gradient(135deg,#9b2cff,#ff2aae)",
                }}
              >
                <Plus
                  size={20}
                />

                Create Class
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
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white"
              />

              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search classes..."
                className="h-12 w-full rounded-xl border border-white/10 bg-[#15121f] pl-12 pr-12 text-sm text-white placeholder:text-white outline-none transition focus:border-purple-500"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white transition hover:text-white"
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
              <table className="w-full min-w-[1700px] border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-[#15121f]">
                    <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-bold text-white">
                      ID
                    </th>
                    <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-bold text-white">
                      Image
                    </th>
                    <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-bold text-white">
                      Class Name
                    </th>
                    <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-bold text-white">
                      Description
                    </th>
                    <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-bold text-white">
                      Category
                    </th>
                    <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-bold text-white">
                      Subcategory
                    </th>
                    <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-bold text-white">
                      Class Type
                    </th>
                    <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-bold text-white">
                      Price
                    </th>
                    <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-bold text-white">
                      Duration
                    </th>
                    <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-bold text-white">
                      Level
                    </th>
                    <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-bold text-white">
                      Mode
                    </th>
                    <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-bold text-white">
                      Students
                    </th>
                    <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-bold text-white">
                      Start Date
                    </th>
                    <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-bold text-white">
                      End Date
                    </th>
                    <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-bold text-white">
                      Start Time
                    </th>
                    <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-bold text-white">
                      Days
                    </th>
                    <th className="whitespace-nowrap px-4 py-4 text-right text-sm font-bold text-white">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredClasses.length === 0 ? (
                    <tr>
                      <td
                        colSpan={17}
                        className="px-6 py-16 text-center"
                      >
                        <div className="flex flex-col items-center justify-center">
                          <BookOpen
                            size={42}
                            className="mb-3 text-white"
                          />

                          <p className="font-semibold text-white">
                            {searchQuery
                              ? "No classes found."
                              : "No classes created yet."}
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredClasses.map((cls) => {
                      const imageUrl = getImageUrl(cls);
                      const days = getClassDays(cls);
                      const classType = getClassType(cls);

                      return (
                        <tr
                          key={cls.id}
                          className="border-b border-white/5 transition last:border-b-0 hover:bg-white/[0.025]"
                        >
                          <td className="whitespace-nowrap px-4 py-5 text-sm text-white">
                            {cls.id}
                          </td>

                          <td className="whitespace-nowrap px-4 py-5">
                            {imageUrl ? (
                              <img
                                src={imageUrl}
                                alt={cls.title || "Class"}
                                className="h-12 w-12 rounded-xl border border-white/10 object-cover"
                                onError={(event) => {
                                  event.currentTarget.style.display = "none";
                                }}
                              />
                            ) : (
                              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-purple-500/20 bg-purple-500/10">
                                <BookOpen
                                  size={20}
                                  className="text-white"
                                />
                              </div>
                            )}
                          </td>

                          <td className="whitespace-nowrap px-4 py-5 text-sm font-bold text-white">
                            {cls.title || "-"}
                          </td>

                          <td className="max-w-[260px] whitespace-nowrap px-4 py-5 text-sm text-white">
                            <div className="max-w-[260px] overflow-hidden text-ellipsis whitespace-nowrap">
                              {cls.description || "-"}
                            </div>
                          </td>

                          <td className="whitespace-nowrap px-4 py-5 text-sm text-white">
                            {cls.category_name || cls.category || "-"}
                          </td>

                          <td className="whitespace-nowrap px-4 py-5 text-sm text-white">
                            {cls.subcategory_name || cls.subcategory || "-"}
                          </td>

                          <td className="whitespace-nowrap px-4 py-5">
                            <span
                              className={[
                                "inline-flex whitespace-nowrap items-center rounded-lg border px-3 py-1.5 text-xs font-bold",
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

                          <td className="whitespace-nowrap px-4 py-5 text-sm font-semibold text-white">
                            {cls.price !== undefined && cls.price !== null
                              ? Number(cls.price).toFixed(2)
                              : "-"}
                          </td>

                          <td className="whitespace-nowrap px-4 py-5 text-sm text-white">
                            {cls.duration ? `${cls.duration} min` : "-"}
                          </td>

                          <td className="whitespace-nowrap px-4 py-5 text-sm text-white">
                            {cls.level || "BEGINNER"}
                          </td>

                          <td className="whitespace-nowrap px-4 py-5 text-sm text-white">
                            {String(cls.mode || "ONLINE").toUpperCase() ===
                            "OFFLINE"
                              ? "Offline"
                              : "Online"}
                          </td>

                          <td className="whitespace-nowrap px-4 py-5 text-sm text-white">
                            {cls.students_count ?? cls.max_students ?? 0}
                          </td>

                          <td className="whitespace-nowrap px-4 py-5 text-sm text-white">
                            {formatDate(getClassStartDate(cls))}
                          </td>

                          <td className="whitespace-nowrap px-4 py-5 text-sm text-white">
                            {formatDate(getClassEndDate(cls))}
                          </td>

                          <td className="whitespace-nowrap px-4 py-5 text-sm font-semibold text-white">
                            {formatTime(getClassStartTime(cls))}
                          </td>

                          <td className="whitespace-nowrap px-4 py-5">
                            <div className="flex flex-nowrap items-center gap-1">
                              {days.length > 0
                                ? days.map((day) => {
                                    const item = DAYS_LIST.find(
                                      (d) => d.value === day
                                    );

                                    return (
                                      <span
                                        key={day}
                                        className="inline-flex shrink-0 whitespace-nowrap rounded-lg border border-purple-500/20 bg-purple-500/10 px-2 py-1 text-xs font-semibold text-purple-300"
                                      >
                                        {item?.label || day}
                                      </span>
                                    );
                                  })
                                : "-"}
                            </div>
                          </td>

                          <td className="whitespace-nowrap px-4 py-5">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                type="button"
                                onClick={() => {
                                  if (!cls?.id) {
                                    toast.error("Class ID is missing. Cannot open LMS.");
                                    return;
                                  }
                                  navigate(`/trainer/lms/${cls.id}`);
                                }}
                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/10 text-blue-300 transition hover:bg-blue-500/20"
                                title="Open LMS"
                              >
                                <BookOpen size={17} />
                              </button>

                              <button
                                type="button"
                                onClick={() => handleEdit(cls)}
                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-purple-500/30 bg-purple-500/10 text-purple-300 transition hover:bg-purple-500/20"
                                title="Edit"
                              >
                                <Edit size={17} />
                              </button>

                              <button
                                type="button"
                                disabled={deleting}
                                onClick={() => handleDelete(cls)}
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
      </div>

      {/* ===================================================
          CREATE / EDIT MODAL
      =================================================== */}

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <div className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#10121a] shadow-2xl">
            {/* HEADER */}
            <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-5 py-4">
              <div>
                <h2 className="text-xl font-bold text-white">
                  {editingClass ? "Edit Class" : "Create Class"}
                </h2>
                <p className="mt-1 text-sm text-white">
                  {editingClass
                    ? "Update your class details."
                    : "Create a new trainer class."}
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-white transition hover:bg-white/5 hover:text-white disabled:opacity-50"
              >
                <X size={20} />
              </button>
            </div>

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="overflow-y-auto p-5"
            >
              <div className="space-y-5">
                {/* ROW 1 - CLASS NAME */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-white">
                    Class Name <span className="ml-1 text-pink-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    placeholder="Enter class name"
                    className="h-11 w-full rounded-xl border border-white/10 bg-[#15121f] px-4 text-white outline-none placeholder:text-gray-600 focus:border-purple-500"
                  />
                </div>

                {/* ROW 2 - CLASS TYPE + CLASS IMAGE */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-white">
                      Class Type <span className="ml-1 text-pink-400">*</span>
                    </label>
                    <select
                      name="class_type"
                      value={formData.class_type}
                      onChange={handleChange}
                      required
                      className="h-11 w-full rounded-xl border border-white/10 bg-[#15121f] px-4 text-white outline-none focus:border-purple-500"
                    >
                      {CLASS_TYPES.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-white">
                      Class Image
                    </label>
                    <div className="rounded-xl border border-white/10 bg-[#15121f] p-2">
                      {editingClass && getImageUrl(editingClass) && (
                        <div className="mb-2 flex items-center gap-2">
                          <img
                            src={getImageUrl(editingClass)}
                            alt={formData.title || "Current class"}
                            className="h-10 w-10 rounded-lg border border-white/10 object-cover"
                          />
                          <span className="text-xs text-white">Current image</span>
                        </div>
                      )}
                      <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full min-w-0 text-xs text-white"
                      />
                      {formData.image && (
                        <p className="mt-1 truncate text-xs text-purple-300">
                          Selected: {formData.image.name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* ROW 3 - DESCRIPTION */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-white">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Enter class description"
                    className="w-full resize-none rounded-xl border border-white/10 bg-[#15121f] px-4 py-3 text-white outline-none placeholder:text-white focus:border-purple-500"
                  />
                </div>

                {/* ROW 4 - CATEGORY / SUBCATEGORY */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-white">
                      Category <span className="ml-1 text-pink-400">*</span>
                    </label>
                    <select
                      name="category_id"
                      value={formData.category_id}
                      onChange={handleCategoryChange}
                      required
                      className="h-11 w-full rounded-xl border border-white/10 bg-[#15121f] px-4 text-white outline-none focus:border-purple-500"
                    >
                      <option value="">Select Category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-white">
                      Subcategory <span className="ml-1 text-pink-400">*</span>
                    </label>
                    <select
                      name="subcategory_id"
                      value={formData.subcategory_id}
                      onChange={handleChange}
                      required
                      disabled={!formData.category_id}
                      className="h-11 w-full rounded-xl border border-white/10 bg-[#15121f] px-4 text-white outline-none focus:border-purple-500 disabled:opacity-50"
                    >
                      <option value="">Select Subcategory</option>
                      {availableSubcategories.map((subcategory) => (
                        <option key={subcategory.id} value={subcategory.id}>{subcategory.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* ROW 5 - STUDENT COUNT / DURATION / PRICE */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-white">Student Count</label>
                    <input
                      type="number"
                      name="students_count"
                      min="0"
                      value={formData.students_count}
                      onChange={handleChange}
                      placeholder="0"
                      className="h-11 w-full rounded-xl border border-white/10 bg-[#15121f] px-4 text-white outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-white">
                      Duration <span className="ml-1 text-pink-400">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="duration"
                        min="1"
                        value={formData.duration}
                        onChange={handleChange}
                        required
                        className="h-11 w-full rounded-xl border border-white/10 bg-[#15121f] px-4 pr-14 text-white outline-none focus:border-purple-500"
                      />
                      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-white">min</span>
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-white">
                      Price <span className="ml-1 text-pink-400">*</span>
                    </label>
                    <input
                      type="number"
                      name="price"
                      min="0"
                      step="0.01"
                      value={formData.price}
                      onChange={handleChange}
                      required
                      placeholder="0.00"
                      className="h-11 w-full rounded-xl border border-white/10 bg-[#15121f] px-4 text-white outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                {/* ROW 6 - START TIME / END TIME */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <TimeSelector fieldName="start_time" label="Start Time" />
                  <TimeSelector fieldName="end_time" label="End Time" />
                </div>

                {/* COURSE DATES - PRESERVED FOR EXISTING VALIDATION/API */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-white">
                      <span className="inline-flex items-center gap-2">
                        <CalendarDays size={16} className="text-purple-400" />
                        Course Start Date <span className="text-pink-400">*</span>
                      </span>
                    </label>
                    <input
                      type="date"
                      name="course_start_date"
                      value={formData.course_start_date}
                      onChange={handleStartDateChange}
                      min={getTodayLocalDate()}
                      required
                      className="h-11 w-full rounded-xl border border-white/10 bg-[#15121f] px-4 text-white outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-white">
                      <span className="inline-flex items-center gap-2">
                        <CalendarDays size={16} className="text-pink-400" />
                        Course End Date <span className="text-pink-400">*</span>
                      </span>
                    </label>
                    <input
                      type="date"
                      name="course_end_date"
                      value={formData.course_end_date}
                      onChange={handleEndDateChange}
                      min={formData.course_start_date || getTodayLocalDate()}
                      required
                      className="h-11 w-full rounded-xl border border-white/10 bg-[#15121f] px-4 text-white outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                {/* ROW 7 - AVAILABLE DAYS */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-white">
                    Available Days <span className="ml-1 text-pink-400">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-7">
                    {DAYS_LIST.map((day) => {
                      const selected = formData.available_days.includes(day.value);
                      const alreadyUsed = usedDaysByOtherClasses.has(day.value);
                      return (
                        <button
                          key={day.value}
                          type="button"
                          disabled={alreadyUsed}
                          onClick={() => toggleDay(day.value)}
                          className={[
                            "h-10 rounded-xl border text-xs font-semibold transition",
                            selected
                              ? "border-transparent text-white"
                              : alreadyUsed
                              ? "cursor-not-allowed border-white/5 bg-[#111118] text-white"
                              : "border-white/10 bg-[#15121f] text-white hover:border-purple-500/50",
                          ].join(" ")}
                          style={selected ? { background: "linear-gradient(135deg,#9b2cff,#ff2aae)" } : undefined}
                          title={alreadyUsed ? `${day.label} is already assigned to another class` : ""}
                        >
                          {day.label}
                        </button>
                      );
                    })}
                  </div>
                  <p className="mt-2 text-xs text-white">A weekday can belong to only one class.</p>
                </div>
              </div>

              {/* FOOTER */}
              <div className="mt-5 flex justify-end gap-3 border-t border-white/10 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="h-11 rounded-xl border border-white/10 px-5 font-semibold text-white transition hover:bg-white/5 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="flex h-11 items-center gap-2 rounded-xl px-6 font-bold text-white transition disabled:opacity-50"
                  style={{
                    background:
                      "linear-gradient(135deg,#9b2cff,#ff2aae)",
                  }}
                >
                  {saving ? (
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />
                  ) : (
                    <Plus size={18} />
                  )}

                  {saving
                    ? "Saving..."
                    : editingClass
                    ? "Update Class"
                    : "Create Class"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================================================
          DELETE CONFIRMATION MODAL
      =================================================== */}

      {deleteConfirmClass && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-red-500/20 bg-[#10121a] shadow-2xl">
            <div className="p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10">
                  <Trash2
                    size={21}
                    className="text-red-400"
                  />
                </div>

                <div className="min-w-0">
                  <h3 className="text-lg font-bold text-white">
                    Delete Class?
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-white">
                    Are you sure you want to delete{" "}
                    <span className="font-semibold text-white">
                      "{deleteConfirmClass.title || "this class"}"
                    </span>
                    ? This action cannot be undone.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-white/10 px-5 py-4">
              <button
                type="button"
                onClick={() => setDeleteConfirmClass(null)}
                disabled={deleting}
                className="h-11 rounded-xl border border-white/10 px-5 font-semibold text-white transition hover:bg-white/5 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={confirmDeleteClass}
                disabled={deleting}
                className="flex h-11 items-center gap-2 rounded-xl bg-red-600 px-5 font-bold text-white transition hover:bg-red-500 disabled:opacity-50"
              >
                {deleting ? (
                  <Loader2
                    size={17}
                    className="animate-spin"
                  />
                ) : (
                  <Trash2 size={17} />
                )}

                {deleting ? "Deleting..." : "Delete Class"}
              </button>
            </div>
          </div>
        </div>
      )}

    </>
  );
}