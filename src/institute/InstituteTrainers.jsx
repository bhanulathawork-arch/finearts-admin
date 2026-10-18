
// import { useEffect, useState } from "react";

// import toast from "react-hot-toast";

// import { Edit, Trash2, Search } from "lucide-react";

// import { FaTrash, FaTimes } from "react-icons/fa";

// import API from "../services/api";

// import {

//   getInstituteTrainers,

//   createInstituteTrainer,

//   updateInstituteTrainer,

//   deleteInstituteTrainer,

// } from "../services/instituteService";



// const inputClass =

//   "w-full mt-2 mb-2 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors";

// const selectClass =

//   "w-full mt-2 mb-2 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors";

// const labelClass = "block text-sm text-white mb-1";

// const errorClass = "text-red-400 text-xs mb-3";



// const emptyForm = {

//   full_name: "",

//   email: "",

//   phone_number: "",

//   bio: "",

//   experience_years: "",

//   languages: "",

//   rating: "",

//   total_reviews: "",

//   certifications: "",

//   total_students: "",

//   category_id: "",

//   subcategory_id: "",

//   profile_image: null,

// };



// export default function InstituteTrainers() {

//   const [trainers, setTrainers] = useState([]);

//   const [searchQuery, setSearchQuery] = useState("");

//   const [showModal, setShowModal] = useState(false);

//   const [editingTrainer, setEditingTrainer] = useState(null);

//   const [showDeleteModal, setShowDeleteModal] = useState(false);

//   const [trainerToDelete, setTrainerToDelete] = useState(null);

//   const [categories, setCategories] = useState([]);

//   const [subcategories, setSubcategories] = useState([]);

//   const [dropdownLoading, setDropdownLoading] = useState(true);

//   const [errors, setErrors] = useState({});

//   const [formData, setFormData] = useState({ ...emptyForm });



//   const token =

//     localStorage.getItem("token") ||

//     localStorage.getItem("instituteToken") ||

//     "";



//   // ---------------------------------------------------------

//   // VALIDATION

//   // ---------------------------------------------------------

//   const validateEmail = (email) => {

//     const value = String(email || "").trim();

//     if (!value) return "Email is required";

//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {

//       return "Please enter a valid email address";

//     }

//     return "";

//   };



//   const validatePhone = (phone) => {

//     const value = String(phone || "").trim();

//     if (!value) return "Phone number is required";

//     if (!/^\d+$/.test(value)) return "Phone number must contain only digits";

//     if (value.length !== 10) return "Phone number must be exactly 10 digits";

//     if (!/^[6-9]/.test(value)) {

//       return "Phone number must start with 6, 7, 8, or 9";

//     }

//     return "";

//   };



//   const validateLanguages = (languages) => {

//     const value = String(languages ?? "").trim();

//     if (!value) return "";

//     if (!/^[\p{L}\p{M}\s,.'-]+$/u.test(value)) {

//       return "Languages must contain letters only (commas, spaces and hyphens are allowed)";

//     }

//     return "";

//   };



//   const validateNonNegativeInteger = (value, label) => {

//     const text = String(value ?? "").trim();

//     if (!text) return "";

//     if (!/^\d+$/.test(text)) return `${label} must contain only whole numbers`;

//     return "";

//   };



//   const validateRating = (value) => {

//     const text = String(value ?? "").trim();

//     if (!text) return "";

//     if (!/^\d+(\.\d{1,2})?$/.test(text)) {

//       return "Rating must be a number between 0 and 5";

//     }

//     const number = Number(text);

//     if (number < 0 || number > 5) return "Rating must be between 0 and 5";

//     return "";

//   };



//   const validateUniqueContactDetails = () => {

//     const email = String(formData.email || "").trim().toLowerCase();

//     const phone = String(formData.phone_number || "").replace(/\D/g, "");

//     const duplicateEmail = trainers.some((trainer) => {

//       if (editingTrainer && String(trainer.id) === String(editingTrainer.id)) {

//         return false;

//       }

//       return String(trainer.email || "").trim().toLowerCase() === email;

//     });

//     const duplicatePhone = trainers.some((trainer) => {

//       if (editingTrainer && String(trainer.id) === String(editingTrainer.id)) {

//         return false;

//       }

//       return String(trainer.phone_number || "").replace(/\D/g, "") === phone;

//     });

//     return { duplicateEmail, duplicatePhone };

//   };



//   const validateForm = () => {

//     const newErrors = {};

//     if (!String(formData.full_name || "").trim()) {

//       newErrors.full_name = "Full name is required";

//     }



//     const emailError = validateEmail(formData.email);

//     const phoneError = validatePhone(formData.phone_number);

//     const languageError = validateLanguages(formData.languages);

//     const experienceError = validateNonNegativeInteger(

//       formData.experience_years,

//       "Experience"

//     );

//     const studentsError = validateNonNegativeInteger(

//       formData.total_students,

//       "Total students"

//     );

//     const reviewsError = validateNonNegativeInteger(

//       formData.total_reviews,

//       "Total reviews"

//     );

//     const ratingError = validateRating(formData.rating);



//     if (emailError) newErrors.email = emailError;

//     if (phoneError) newErrors.phone_number = phoneError;

//     if (languageError) newErrors.languages = languageError;

//     if (experienceError) newErrors.experience_years = experienceError;

//     if (studentsError) newErrors.total_students = studentsError;

//     if (reviewsError) newErrors.total_reviews = reviewsError;

//     if (ratingError) newErrors.rating = ratingError;

//     if (!formData.category_id) newErrors.category_id = "Please select a category";

//     if (!formData.subcategory_id) {

//       newErrors.subcategory_id = "Please select a subcategory";

//     }



//     const { duplicateEmail, duplicatePhone } = validateUniqueContactDetails();

//     if (duplicateEmail) {

//       newErrors.email = "A trainer with this email already exists";

//     }

//     if (duplicatePhone) {

//       newErrors.phone_number = "A trainer with this mobile number already exists";

//     }



//     setErrors(newErrors);

//     return Object.keys(newErrors).length === 0;

//   };



//   // ---------------------------------------------------------

//   // HELPERS

//   // ---------------------------------------------------------

//   const getImageUrl = (img) => {

//     if (!img) return "";

//     if (img.startsWith("http://") || img.startsWith("https://")) return img;

//     return `https://finearts-backend.onrender.com${img}`;

//   };



//   const StatusBadge = ({ status }) => {

//     const normalizedStatus = status?.toLowerCase();

//     let colors = "bg-gray-500/20 text-white";

//     if (normalizedStatus === "approved") {

//       colors = "bg-green-500/20 text-green-400";

//     } else if (normalizedStatus === "pending") {

//       colors = "bg-yellow-500/20 text-yellow-400";

//     } else if (normalizedStatus === "rejected") {

//       colors = "bg-red-500/20 text-red-400";

//     }

//     return (

//       <span className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${colors}`}>

//         {status || "N/A"}

//       </span>

//     );

//   };



//   // ---------------------------------------------------------

//   // FETCH TRAINERS AND INSTITUTE CATEGORIES

//   // ---------------------------------------------------------

//   const fetchTrainers = async () => {

//     try {

//       const res = await getInstituteTrainers(token);

//       const data = Array.isArray(res?.data?.data)

//         ? res.data.data

//         : Array.isArray(res?.data)

//         ? res.data

//         : [];

//       setTrainers(data);

//     } catch (error) {

//       console.error("FETCH TRAINERS ERROR:", error);

//       toast.error(error?.response?.data?.message || "Failed to load trainers");

//     }

//   };



//   const fetchInstituteProfile = async () => {

//     try {

//       const response = await API.get("/institutes/profile", {

//         params: { _t: Date.now() },

//       });

//       return response?.data?.data || response?.data || null;

//     } catch (error) {

//       console.error("FETCH INSTITUTE PROFILE ERROR:", error);

//       toast.error(

//         error?.response?.data?.message || "Failed to load institute profile"

//       );

//       return null;

//     }

//   };



//   const extractInstituteCategoryIds = (profile) => {

//     const profileCategories = Array.isArray(profile?.categories)

//       ? profile.categories

//       : [];



//     const ids = profileCategories

//       .map((item) => {

//         if (typeof item === "number" || typeof item === "string") {

//           return Number(item);

//         }

//         return Number(item?.category_id ?? item?.id ?? item?.category?.id);

//       })

//       .filter((id) => Number.isFinite(id) && id > 0);



//     return [...new Set(ids)];

//   };



//   const fetchDropdowns = async () => {

//     setDropdownLoading(true);

//     try {

//       const profile = await fetchInstituteProfile();

//       if (!profile) {

//         setCategories([]);

//         setSubcategories([]);

//         return;

//       }



//       const [catRes, subRes] = await Promise.all([

//         API.get("/categories"),

//         API.get("/subcategories"),

//       ]);



//       const categoryData = Array.isArray(catRes?.data?.data)

//         ? catRes.data.data

//         : Array.isArray(catRes?.data)

//         ? catRes.data

//         : [];

//       const subcategoryData = Array.isArray(subRes?.data?.data)

//         ? subRes.data.data

//         : Array.isArray(subRes?.data)

//         ? subRes.data

//         : [];



//       const instituteCategoryIds = extractInstituteCategoryIds(profile);

//       const allowedCategories = categoryData.filter((category) =>

//         instituteCategoryIds.includes(Number(category.id))

//       );

//       const allowedSubcategories = subcategoryData.filter((subcategory) =>

//         instituteCategoryIds.includes(Number(subcategory.category_id))

//       );



//       setCategories(allowedCategories);

//       setSubcategories(allowedSubcategories);

//     } catch (error) {

//       console.error("FETCH DROPDOWNS ERROR:", error);

//       setCategories([]);

//       setSubcategories([]);

//       toast.error(error?.response?.data?.message || "Failed to load categories");

//     } finally {

//       setDropdownLoading(false);

//     }

//   };



//   useEffect(() => {

//     fetchTrainers();

//     fetchDropdowns();

//     // Initial load only.

//     // eslint-disable-next-line react-hooks/exhaustive-deps

//   }, []);



//   // ---------------------------------------------------------
//   // CATEGORY / SUBCATEGORY RESOLUTION FOR EDITING
//   // ---------------------------------------------------------
//   const getSavedName = (value) => {
//     if (Array.isArray(value)) value = value[0];

//     if (value && typeof value === "object") {
//       return String(
//         value.name ??
//         value.category_name ??
//         value.subcategory_name ??
//         ""
//       ).trim();
//     }

//     return String(value ?? "").split(",")[0].trim();
//   };

//   const resolveCategoryId = (trainer) => {
//     const directId =
//       trainer?.category_id ??
//       trainer?.categoryId ??
//       trainer?.category?.id ??
//       trainer?.category?.category_id;

//     if (directId !== undefined && directId !== null && String(directId).trim()) {
//       const directMatch = categories.find(
//         (category) => String(category?.id) === String(directId)
//       );
//       if (directMatch) return String(directMatch.id);
//     }

//     const categoryName = getSavedName(
//       trainer?.category_name ??
//       trainer?.category?.name ??
//       trainer?.categories ??
//       trainer?.category
//     ).toLowerCase();

//     if (!categoryName) return "";

//     const matched = categories.find(
//       (category) =>
//         String(category?.name ?? "").trim().toLowerCase() === categoryName
//     );

//     return matched?.id != null ? String(matched.id) : "";
//   };

//   const resolveSubcategoryId = (trainer, categoryId) => {
//     const directId =
//       trainer?.subcategory_id ??
//       trainer?.subcategoryId ??
//       trainer?.subcategory?.id ??
//       trainer?.subcategory?.subcategory_id;

//     if (directId !== undefined && directId !== null && String(directId).trim()) {
//       const directMatch = subcategories.find(
//         (subcategory) =>
//           String(subcategory?.id) === String(directId) &&
//           String(subcategory?.category_id) === String(categoryId)
//       );
//       if (directMatch) return String(directMatch.id);
//     }

//     const subcategoryName = getSavedName(
//       trainer?.subcategory_name ??
//       trainer?.subcategory?.name ??
//       trainer?.subcategories ??
//       trainer?.subcategory
//     ).toLowerCase();

//     if (!subcategoryName || !categoryId) return "";

//     const matched = subcategories.find(
//       (subcategory) =>
//         String(subcategory?.category_id) === String(categoryId) &&
//         String(subcategory?.name ?? "").trim().toLowerCase() === subcategoryName
//     );

//     return matched?.id != null ? String(matched.id) : "";
//   };

//   // ---------------------------------------------------------

//   // CREATE / EDIT / DELETE

//   // ---------------------------------------------------------

//   const handleCreate = () => {

//     setEditingTrainer(null);

//     setFormData({ ...emptyForm });

//     setErrors({});

//     setShowModal(true);

//   };



//   const handleEdit = (trainer) => {
//     setEditingTrainer(trainer);

//     const categoryId = resolveCategoryId(trainer);
//     const subcategoryId = resolveSubcategoryId(trainer, categoryId);

//     setFormData({
//       ...emptyForm,
//       full_name: trainer?.full_name ?? "",
//       email: trainer?.email ?? "",
//       phone_number: trainer?.phone_number ?? "",
//       bio: trainer?.bio ?? "",
//       experience_years: trainer?.experience_years ?? "",
//       languages: trainer?.languages ?? "",
//       rating: trainer?.rating ?? "",
//       total_reviews: trainer?.total_reviews ?? "",
//       certifications: trainer?.certifications ?? "",
//       total_students: trainer?.total_students ?? "",
//       category_id: categoryId,
//       subcategory_id: subcategoryId,
//       profile_image: null,
//     });

//     setErrors({});
//     setShowModal(true);
//   };

//   useEffect(() => {

//     if (!editingTrainer || dropdownLoading) return;

//     const categoryId = resolveCategoryId(editingTrainer);

//     const subcategoryId = resolveSubcategoryId(editingTrainer, categoryId);

//     setFormData((previous) => ({

//       ...previous,

//       category_id: categoryId,

//       subcategory_id: subcategoryId,

//     }));

//     // The dropdown data must be loaded before resolving IDs.

//     // eslint-disable-next-line react-hooks/exhaustive-deps

//   }, [editingTrainer, categories, subcategories, dropdownLoading]);



//   const handleDeleteClick = (trainer) => {

//     setTrainerToDelete(trainer);

//     setShowDeleteModal(true);

//   };



//   const confirmDelete = async () => {

//     if (!trainerToDelete) return;

//     try {

//       await deleteInstituteTrainer(trainerToDelete.id, token);

//       toast.success("Trainer deleted");

//       await fetchTrainers();

//       setShowDeleteModal(false);

//       setTrainerToDelete(null);

//     } catch (error) {

//       console.error("DELETE TRAINER ERROR:", error);

//       toast.error(error?.response?.data?.message || "Delete failed");

//     }

//   };



//   const closeModal = () => {

//     setShowModal(false);

//     setEditingTrainer(null);

//     setErrors({});

//   };



//   const updateField = (field, value) => {

//     setFormData((previous) => ({ ...previous, [field]: value }));

//     if (errors[field]) {

//       setErrors((previous) => ({ ...previous, [field]: "" }));

//     }

//   };



//   const handleEmailChange = (event) => {

//     const value = event.target.value;

//     updateField("email", value);

//     if (value.trim()) {

//       setErrors((previous) => ({ ...previous, email: validateEmail(value) }));

//     }

//   };



//   const handlePhoneChange = (event) => {

//     const value = event.target.value.replace(/\D/g, "").slice(0, 10);

//     updateField("phone_number", value);

//     if (!value) {

//       setErrors((previous) => ({

//         ...previous,

//         phone_number: "Phone number is required",

//       }));

//     } else if (value.length < 10) {

//       setErrors((previous) => ({

//         ...previous,

//         phone_number: "Phone number must be exactly 10 digits",

//       }));

//     } else {

//       setErrors((previous) => ({

//         ...previous,

//         phone_number: validatePhone(value),

//       }));

//     }

//   };



//   const handleCategoryChange = (event) => {

//     setFormData((previous) => ({

//       ...previous,

//       category_id: event.target.value,

//       subcategory_id: "",

//     }));

//     setErrors((previous) => ({

//       ...previous,

//       category_id: "",

//       subcategory_id: "",

//     }));

//   };



//   const handleSubmit = async (event) => {

//     event.preventDefault();

//     if (!validateForm()) {

//       toast.error("Please correct the highlighted fields");

//       return;

//     }



//     try {

//       const formDataToSend = new FormData();

//       Object.entries(formData).forEach(([key, value]) => {

//         if (value !== null && value !== undefined && value !== "") {

//           formDataToSend.append(key, value);

//         }

//       });



//       if (editingTrainer) {

//         await updateInstituteTrainer(editingTrainer.id, formDataToSend, token);

//         toast.success("Trainer updated successfully");

//       } else {

//         await createInstituteTrainer(formDataToSend, token);

//         toast.success("Trainer created successfully");

//       }



//       closeModal();

//       await fetchTrainers();

//     } catch (error) {

//       console.error("TRAINER OPERATION ERROR:", error);

//       const serverMessage =

//         error?.response?.data?.message || error?.response?.data?.error || "";

//       toast.error(serverMessage || "Operation failed");

//     }

//   };



//   // ---------------------------------------------------------

//   // FILTER TRAINERS

//   // ---------------------------------------------------------

//   const query = searchQuery.trim().toLowerCase();

//   const filteredTrainers = trainers.filter((trainer) => {

//     if (!query) return true;

//     return (

//       trainer.full_name?.toLowerCase().includes(query) ||

//       trainer.email?.toLowerCase().includes(query) ||

//       trainer.bio?.toLowerCase().includes(query) ||

//       trainer.phone_number?.includes(query) ||

//       trainer.languages?.toLowerCase().includes(query) ||

//       String(trainer.rating ?? "").includes(query) ||

//       String(trainer.total_reviews ?? "").includes(query) ||

//       trainer.certifications?.toLowerCase().includes(query) ||

//       trainer.categories?.toLowerCase().includes(query) ||

//       trainer.subcategories?.toLowerCase().includes(query) ||

//       trainer.approval_status?.toLowerCase().includes(query) ||

//       String(trainer.id ?? "").includes(query) ||

//       String(trainer.experience_years ?? "").includes(query)

//     );

//   });



//   const currentSubcategories = subcategories.filter(

//     (subcategory) =>

//       String(subcategory.category_id) === String(formData.category_id)

//   );



//   const tableColumns = 15;



//   return (

//     <div className="min-h-screen p-6 md:p-8 text-white">

//       {/* PAGE HEADER */}

//       <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

//         <div>

//           <h1 className="text-3xl md:text-4xl font-bold text-purple-400">

//             Institute Trainers

//           </h1>

//           <p className="mt-2 text-sm md:text-base text-white">

//             Manage Institute Trainers

//           </p>

//         </div>

//         <button

//           type="button"

//           onClick={handleCreate}

//           className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 font-bold transition-opacity hover:opacity-90"

//         >

//           + Add Trainer

//         </button>

//       </div>



//       {/* SEARCH */}

//       <div className="mb-5">

//         <div className="relative w-full">

//           <Search

//             className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white"

//             size={18}

//           />

//           <input

//             type="text"

//             placeholder="Search trainers..."

//             value={searchQuery}

//             onChange={(event) => setSearchQuery(event.target.value)}

//             className="w-full rounded-xl border border-[#2c2c35] bg-[#151519] py-3.5 pl-12 pr-10 text-sm text-white placeholder:text-gray-400 transition-colors focus:border-purple-500/60 focus:outline-none"

//           />

//           {searchQuery && (

//             <button

//               type="button"

//               onClick={() => setSearchQuery("")}

//               aria-label="Clear search"

//               className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-white"

//             >

//               <FaTimes size={14} />

//             </button>

//           )}

//         </div>

//       </div>



//       {/* TRAINERS TABLE */}

//       <div className="overflow-hidden rounded-2xl border border-[#2c2c35] bg-[#151519]">

//         <div className="overflow-x-auto">

//           <table className="w-full min-w-[1450px] border-collapse text-sm">

//             <thead className="bg-[#202027] text-white">

//               <tr>

//                 {[

//                   "Image",

//                   "Name",

//                   "Email",

//                   "Bio",

//                   "Experience",

//                   "Phone",

//                   "Languages",

//                   "Certifications",

//                   "Category",

//                   "Subcategory",

//                   "Students",

//                   "Rating",

//                   "Reviews",

//                   "Status",

//                   "Actions",

//                 ].map((heading) => (

//                   <th

//                     key={heading}

//                     className="whitespace-nowrap px-4 py-4 text-left font-semibold"

//                   >

//                     {heading}

//                   </th>

//                 ))}

//               </tr>

//             </thead>

//             <tbody>

//               {filteredTrainers.length === 0 ? (

//                 <tr>

//                   <td colSpan={tableColumns} className="p-12 text-center">

//                     <div className="flex flex-col items-center gap-3">

//                       <Search size={40} className="text-gray-600" />

//                       <p className="text-lg text-gray-400">

//                         {searchQuery

//                           ? "No trainers found matching your search"

//                           : "No trainers available"}

//                       </p>

//                       {searchQuery && (

//                         <button

//                           type="button"

//                           onClick={() => setSearchQuery("")}

//                           className="text-sm text-purple-400 hover:text-purple-300"

//                         >

//                           Clear search

//                         </button>

//                       )}

//                     </div>

//                   </td>

//                 </tr>

//               ) : (

//                 filteredTrainers.map((trainer) => (

//                   <tr

//                     key={trainer.id}

//                     className="border-t border-[#2c2c35] transition-colors hover:bg-[#1a1a20]"

//                   >

//                     <td className="px-4 py-3.5">

//                       {trainer.profile_image ? (

//                         <img

//                           src={getImageUrl(trainer.profile_image)}

//                           alt={trainer.full_name || "Trainer"}

//                           className="h-11 w-11 rounded-xl border border-[#333] object-cover"

//                           onError={(event) => {

//                             event.currentTarget.style.display = "none";

//                           }}

//                         />

//                       ) : (

//                         <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#26262b] text-xs text-gray-500">

//                           N/A

//                         </div>

//                       )}

//                     </td>

//                     <td className="whitespace-nowrap px-4 py-3.5 font-medium">

//                       {trainer.full_name || "-"}

//                     </td>

//                     <td className="whitespace-nowrap px-4 py-3.5 text-white">

//                       {trainer.email || "-"}

//                     </td>

//                     <td className="max-w-[180px] truncate px-4 py-3.5 text-white" title={trainer.bio || ""}>

//                       {trainer.bio || "-"}

//                     </td>

//                     <td className="whitespace-nowrap px-4 py-3.5 text-white">

//                       {trainer.experience_years !== null && trainer.experience_years !== undefined && trainer.experience_years !== ""

//                         ? `${trainer.experience_years} yrs`

//                         : "-"}

//                     </td>

//                     <td className="whitespace-nowrap px-4 py-3.5 text-white">

//                       {trainer.phone_number || "-"}

//                     </td>

//                     <td className="whitespace-nowrap px-4 py-3.5 text-white">

//                       {trainer.languages || "-"}

//                     </td>

//                     <td className="max-w-[180px] truncate px-4 py-3.5 text-white" title={trainer.certifications || ""}>

//                       {trainer.certifications || "-"}

//                     </td>

//                     <td className="whitespace-nowrap px-4 py-3.5 text-white">

//                       {trainer.categories || trainer.category_name || "-"}

//                     </td>

//                     <td className="whitespace-nowrap px-4 py-3.5 text-white">

//                       {trainer.subcategories || trainer.subcategory_name || "-"}

//                     </td>

//                     <td className="whitespace-nowrap px-4 py-3.5 font-semibold">

//                       {trainer.total_students ?? 0}

//                     </td>

//                     <td className="whitespace-nowrap px-4 py-3.5 font-semibold">

//                       {trainer.rating !== null && trainer.rating !== undefined && trainer.rating !== ""

//                         ? Math.round(Number(trainer.rating))

//                         : "-"}

//                     </td>

//                     <td className="whitespace-nowrap px-4 py-3.5 font-semibold">

//                       {trainer.total_reviews ?? "-"}

//                     </td>

//                     <td className="whitespace-nowrap px-4 py-3.5">

//                       <StatusBadge status={trainer.approval_status} />

//                     </td>

//                     <td className="px-4 py-3.5">

//                       <div className="flex items-center gap-2">

//                         <button

//                           type="button"

//                           onClick={() => handleEdit(trainer)}

//                           className="rounded-lg p-2 transition-colors hover:bg-[#2a2a35]"

//                           title="Edit"

//                           aria-label={`Edit ${trainer.full_name || "trainer"}`}

//                         >

//                           <Edit size={16} className="text-white" />

//                         </button>

//                         <button

//                           type="button"

//                           onClick={() => handleDeleteClick(trainer)}

//                           className="group rounded-lg p-2 transition-colors hover:bg-red-500/10"

//                           title="Delete"

//                           aria-label={`Delete ${trainer.full_name || "trainer"}`}

//                         >

//                           <Trash2 size={16} className="text-red-500/70 group-hover:text-red-400" />

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



//       {/* ADD / EDIT MODAL */}

//       {showModal && (

//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">

//           <div className="flex max-h-[90vh] w-full max-w-[720px] flex-col overflow-hidden rounded-2xl bg-[#211c30] shadow-2xl">

//             <div className="flex items-center justify-between border-b border-[#3a3448] p-5 md:p-6">

//               <h2 className="text-xl font-bold text-white md:text-2xl">

//                 {editingTrainer ? "Edit Trainer" : "Add Trainer"}

//               </h2>

//               <button

//                 type="button"

//                 onClick={closeModal}

//                 aria-label="Close form"

//                 className="text-white transition-colors hover:text-purple-400"

//               >

//                 <FaTimes size={20} />

//               </button>

//             </div>



//             <div className="overflow-y-auto p-5 md:p-6">

//               <form onSubmit={handleSubmit} className="space-y-4" noValidate>

//                 {/* FULL NAME + EMAIL */}

//                 <div className="grid grid-cols-1 gap-x-4 gap-y-1 md:grid-cols-2">

//                   <div>

//                     <label className={labelClass}>

//                       Full Name <span className="text-red-500">\*</span>

//                     </label>

//                     <input

//                       type="text"

//                       value={formData.full_name}

//                       onChange={(event) => updateField("full_name", event.target.value)}

//                       className={`${inputClass} ${errors.full_name ? "border border-red-500" : ""}`}

//                       placeholder="Enter full name"

//                       autoComplete="name"

//                     />

//                     {errors.full_name && <p className={errorClass}>{errors.full_name}</p>}

//                   </div>

//                   <div>

//                     <label className={labelClass}>

//                       Email <span className="text-red-500">\*</span>

//                     </label>

//                     <input

//                       type="email"

//                       value={formData.email}

//                       onChange={handleEmailChange}

//                       onBlur={() => {

//                         const emailError = validateEmail(formData.email);

//                         const { duplicateEmail } = validateUniqueContactDetails();

//                         setErrors((previous) => ({

//                           ...previous,

//                           email: duplicateEmail

//                             ? "A trainer with this email already exists"

//                             : emailError,

//                         }));

//                       }}

//                       className={`${inputClass} ${errors.email ? "border border-red-500" : ""}`}

//                       placeholder="Enter email"

//                       autoComplete="email"

//                     />

//                     {errors.email && <p className={errorClass}>{errors.email}</p>}

//                   </div>

//                 </div>



//                 {/* PHONE + EXPERIENCE */}

//                 <div className="grid grid-cols-1 gap-x-4 gap-y-1 md:grid-cols-2">

//                   <div>

//                     <label className={labelClass}>

//                       Phone Number <span className="text-red-500">\*</span>

//                     </label>

//                     <input

//                       type="tel"

//                       inputMode="numeric"

//                       maxLength={10}

//                       value={formData.phone_number}

//                       onChange={handlePhoneChange}

//                       onBlur={() => {

//                         const phoneError = validatePhone(formData.phone_number);

//                         const { duplicatePhone } = validateUniqueContactDetails();

//                         setErrors((previous) => ({

//                           ...previous,

//                           phone_number: duplicatePhone

//                             ? "A trainer with this mobile number already exists"

//                             : phoneError,

//                         }));

//                       }}

//                       className={`${inputClass} ${errors.phone_number ? "border border-red-500" : ""}`}

//                       placeholder="Enter 10-digit phone number"

//                       autoComplete="tel"

//                     />

//                     {errors.phone_number && <p className={errorClass}>{errors.phone_number}</p>}

//                   </div>

//                   <div>

//                     <label className={labelClass}>Experience Years</label>

//                     <input

//                       type="number"

//                       min="0"

//                       step="1"

//                       value={formData.experience_years}

//                       onChange={(event) => {

//                         const value = event.target.value;

//                         updateField("experience_years", value);

//                         setErrors((previous) => ({

//                           ...previous,

//                           experience_years: validateNonNegativeInteger(value, "Experience"),

//                         }));

//                       }}

//                       className={`${inputClass} ${errors.experience_years ? "border border-red-500" : ""}`}

//                       placeholder="0"

//                     />

//                     {errors.experience_years && <p className={errorClass}>{errors.experience_years}</p>}

//                   </div>

//                 </div>



//                 {/* BIO */}

//                 <div>

//                   <label className={labelClass}>Bio</label>

//                   <textarea

//                     value={formData.bio}

//                     onChange={(event) => updateField("bio", event.target.value)}

//                     rows={3}

//                     className={inputClass}

//                     placeholder="Enter bio"

//                   />

//                 </div>



//                 {/* LANGUAGES */}

//                 <div>

//                   <label className={labelClass}>Languages</label>

//                   <input

//                     type="text"

//                     value={formData.languages}

//                     onChange={(event) => {

//                       const cleanedValue = event.target.value.replace(

//                         /[^\p{L}\p{M}\s,'-]/gu,

//                         ""

//                       );

//                       updateField("languages", cleanedValue);

//                       setErrors((previous) => ({

//                         ...previous,

//                         languages: validateLanguages(cleanedValue),

//                       }));

//                     }}

//                     className={`${inputClass} ${errors.languages ? "border border-red-500" : ""}`}

//                     placeholder="e.g. English, Hindi"

//                   />

//                   {errors.languages && <p className={errorClass}>{errors.languages}</p>}

//                 </div>



//                 {/* CERTIFICATIONS */}

//                 <div>

//                   <label className={labelClass}>Certifications</label>

//                   <textarea

//                     value={formData.certifications}

//                     onChange={(event) => updateField("certifications", event.target.value)}

//                     rows={2}

//                     className={inputClass}

//                     placeholder="Enter certifications"

//                   />

//                 </div>



//                 {/* STUDENTS + IMAGE */}

//                 <div className="grid grid-cols-1 gap-x-4 gap-y-1 md:grid-cols-2">

//                   <div>

//                     <label className={labelClass}>Total Students</label>

//                     <input

//                       type="number"

//                       min="0"

//                       step="1"

//                       value={formData.total_students}

//                       onChange={(event) => {

//                         const value = event.target.value;

//                         updateField("total_students", value);

//                         setErrors((previous) => ({

//                           ...previous,

//                           total_students: validateNonNegativeInteger(value, "Total students"),

//                         }));

//                       }}

//                       className={`${inputClass} ${errors.total_students ? "border border-red-500" : ""}`}

//                       placeholder="0"

//                     />

//                     {errors.total_students && <p className={errorClass}>{errors.total_students}</p>}

//                   </div>

//                   <div>

//                     <label className={labelClass}>Profile Image</label>

//                     {editingTrainer?.profile_image && (

//                       <div className="mb-2">

//                         <img

//                           src={getImageUrl(editingTrainer.profile_image)}

//                           alt="Current trainer"

//                           className="h-20 w-20 rounded-xl border border-[#333] object-cover"

//                           onError={(event) => {

//                             event.currentTarget.style.display = "none";

//                           }}

//                         />

//                         <p className="mt-1 text-xs text-gray-400">Current profile image</p>

//                       </div>

//                     )}

//                     <input

//                       type="file"

//                       accept="image/jpeg,image/png,image/webp,image/jpg"

//                       onChange={(event) =>

//                         updateField("profile_image", event.target.files?.[0] || null)

//                       }

//                       className={inputClass}

//                     />

//                     {editingTrainer && (

//                       <p className="mt-1 text-xs text-gray-400">

//                         Select a new image only if you want to replace the current image.

//                       </p>

//                     )}

//                   </div>

//                 </div>



//                 {/* RATING + REVIEWS */}

//                 <div className="grid grid-cols-1 gap-x-4 gap-y-1 md:grid-cols-2">

//                   <div>

//                     <label className={labelClass}>Rating</label>

//                     <input

//                       type="number"

//                       min="0"

//                       max="5"

//                       step="0.1"

//                       value={formData.rating}

//                       onChange={(event) => {

//                         const value = event.target.value;

//                         updateField("rating", value);

//                         setErrors((previous) => ({

//                           ...previous,

//                           rating: validateRating(value),

//                         }));

//                       }}

//                       className={`${inputClass} ${errors.rating ? "border border-red-500" : ""}`}

//                       placeholder="0"

//                     />

//                     {errors.rating && <p className={errorClass}>{errors.rating}</p>}

//                   </div>

//                   <div>

//                     <label className={labelClass}>Reviews</label>

//                     <input

//                       type="number"

//                       min="0"

//                       step="1"

//                       value={formData.total_reviews}

//                       onChange={(event) => {

//                         const value = event.target.value;

//                         updateField("total_reviews", value);

//                         setErrors((previous) => ({

//                           ...previous,

//                           total_reviews: validateNonNegativeInteger(value, "Total reviews"),

//                         }));

//                       }}

//                       className={`${inputClass} ${errors.total_reviews ? "border border-red-500" : ""}`}

//                       placeholder="0"

//                     />

//                     {errors.total_reviews && <p className={errorClass}>{errors.total_reviews}</p>}

//                   </div>

//                 </div>



//                 {/* CATEGORY + SUBCATEGORY */}

//                 <div className="grid grid-cols-1 gap-x-4 gap-y-1 md:grid-cols-2">

//                   <div>

//                     <label className={labelClass}>

//                       Category <span className="text-red-500">\*</span>

//                     </label>

//                     <select

//                       value={formData.category_id || ""}

//                       onChange={handleCategoryChange}

//                       disabled={dropdownLoading || categories.length === 0}

//                       className={`${selectClass} ${errors.category_id ? "border border-red-500" : ""} disabled:opacity-50`}

//                     >

//                       <option value="">

//                         {dropdownLoading

//                           ? "Loading Categories..."

//                           : categories.length === 0

//                           ? "No Categories Available"

//                           : "Select Category"}

//                       </option>

//                       {categories.map((category) => (

//                         <option key={category.id} value={String(category.id)}>

//                           {category.name}

//                         </option>

//                       ))}

//                     </select>

//                     {errors.category_id && <p className={errorClass}>{errors.category_id}</p>}

//                   </div>

//                   <div>

//                     <label className={labelClass}>

//                       Subcategory <span className="text-red-500">\*</span>

//                     </label>

//                     <select

//                       value={formData.subcategory_id || ""}

//                       onChange={(event) => updateField("subcategory_id", event.target.value)}

//                       disabled={!formData.category_id || dropdownLoading}

//                       className={`${selectClass} ${errors.subcategory_id ? "border border-red-500" : ""} disabled:opacity-50`}

//                     >

//                       <option value="">

//                         {!formData.category_id

//                           ? "Select Category First"

//                           : currentSubcategories.length === 0

//                           ? "No Subcategories Available"

//                           : "Select Subcategory"}

//                       </option>

//                       {currentSubcategories.map((subcategory) => (

//                         <option key={subcategory.id} value={String(subcategory.id)}>

//                           {subcategory.name}

//                         </option>

//                       ))}

//                     </select>

//                     {errors.subcategory_id && <p className={errorClass}>{errors.subcategory_id}</p>}

//                   </div>

//                 </div>



//                 {/* FORM ACTIONS */}

//                 <div className="flex flex-col-reverse gap-3 border-t border-[#3a3448] pt-4 sm:flex-row sm:justify-end">

//                   <button

//                     type="button"

//                     onClick={closeModal}

//                     className="rounded-xl border border-gray-600 px-5 py-3 text-gray-300 transition-colors hover:bg-[#2b2638]"

//                   >

//                     Cancel

//                   </button>

//                   <button

//                     type="submit"

//                     className="rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-5 py-3 font-bold text-white transition-opacity hover:opacity-90"

//                   >

//                     {editingTrainer ? "Update Trainer" : "Create Trainer"}

//                   </button>

//                 </div>

//               </form>

//             </div>

//           </div>

//         </div>

//       )}



//       {/* DELETE CONFIRMATION MODAL */}

//       {showDeleteModal && (

//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">

//           <div className="w-full max-w-[400px] overflow-hidden rounded-2xl border border-[#2e2a42] bg-[#1e1b2e] shadow-2xl">

//             <div className="flex flex-col items-center p-8">

//               <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-500/15">

//                 <FaTrash className="text-lg text-red-400" />

//               </div>

//               <h2 className="mb-3 text-center text-xl font-bold text-white">

//                 Delete Trainer

//               </h2>

//               <p className="mb-8 text-center text-sm leading-relaxed text-white">

//                 Are you sure you want to delete this trainer?

//                 {trainerToDelete?.full_name ? ` (${trainerToDelete.full_name})` : ""}

//               </p>

//               <div className="flex w-full gap-3">

//                 <button

//                   type="button"

//                   onClick={() => {

//                     setShowDeleteModal(false);

//                     setTrainerToDelete(null);

//                   }}

//                   className="flex-1 rounded-xl border border-[#3a3650] px-5 py-3 text-gray-300 transition-colors hover:bg-[#2a2640]"

//                 >

//                   Cancel

//                 </button>

//                 <button

//                   type="button"

//                   onClick={confirmDelete}

//                   className="flex-1 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 px-5 py-3 font-bold text-white transition-opacity hover:opacity-90"

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




import { useEffect, useRef, useState } from "react";

import toast from "react-hot-toast";

import { Edit, Trash2, Search } from "lucide-react";

import { FaTrash, FaTimes } from "react-icons/fa";

import API from "../services/api";

import {

  getInstituteTrainers,

  createInstituteTrainer,

  updateInstituteTrainer,

  deleteInstituteTrainer,

} from "../services/instituteService";

const inputClass =

  "w-full mt-2 mb-2 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors";

const selectClass =

  "w-full mt-2 mb-2 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors";

const labelClass = "block text-sm text-white mb-1";

const errorClass = "text-red-400 text-xs mb-3";

const emptyForm = {

  full_name: "",

  email: "",

  phone_number: "",

  bio: "",

  experience_years: "",

  languages: "",

  rating: "",

  total_reviews: "",

  certifications: "",

  total_students: "",

  category_id: "",

  subcategory_id: "",

  profile_image: null,

  remove_profile_image: false,

};

export default function InstituteTrainers() {

  const [trainers, setTrainers] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [editingTrainer, setEditingTrainer] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [trainerToDelete, setTrainerToDelete] = useState(null);

  const [categories, setCategories] = useState([]);

  const [subcategories, setSubcategories] = useState([]);

  const [dropdownLoading, setDropdownLoading] = useState(true);

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({ ...emptyForm });
  const profileImageInputRef = useRef(null);

  const token =

    localStorage.getItem("token") ||

    localStorage.getItem("instituteToken") ||

    "";

  // ---------------------------------------------------------

  // VALIDATION

  // ---------------------------------------------------------

  const validateEmail = (email) => {

    const value = String(email || "").trim();

    if (!value) return "Email is required";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {

      return "Please enter a valid email address";

    }

    return "";

  };

  const validatePhone = (phone) => {

    const value = String(phone || "").trim();

    if (!value) return "Phone number is required";

    if (!/^\d+$/.test(value)) return "Phone number must contain only digits";

    if (value.length !== 10) return "Phone number must be exactly 10 digits";

    if (!/^[6-9]/.test(value)) {

      return "Phone number must start with 6, 7, 8, or 9";

    }

    return "";

  };

  const validateLanguages = (languages) => {

    const value = String(languages ?? "").trim();

    if (!value) return "";

    if (!/^[\p{L}\p{M}\s,.'-]+$/u.test(value)) {

      return "Languages must contain letters only (commas, spaces and hyphens are allowed)";

    }

    return "";

  };

  const validateNonNegativeInteger = (value, label) => {

    const text = String(value ?? "").trim();

    if (!text) return "";

    if (!/^\d+$/.test(text)) return `${label} must contain only whole numbers`;

    return "";

  };

  const validateRating = (value) => {

    const text = String(value ?? "").trim();

    if (!text) return "";

    if (!/^\d+(\.\d{1,2})?$/.test(text)) {

      return "Rating must be a number between 0 and 5";

    }

    const number = Number(text);

    if (number < 0 || number > 5) return "Rating must be between 0 and 5";

    return "";

  };

  const validateUniqueContactDetails = () => {

    const email = String(formData.email || "").trim().toLowerCase();

    const phone = String(formData.phone_number || "").replace(/\D/g, "");

    const duplicateEmail = trainers.some((trainer) => {

      if (editingTrainer && String(trainer.id) === String(editingTrainer.id)) {

        return false;

      }

      return String(trainer.email || "").trim().toLowerCase() === email;

    });

    const duplicatePhone = trainers.some((trainer) => {

      if (editingTrainer && String(trainer.id) === String(editingTrainer.id)) {

        return false;

      }

      return String(trainer.phone_number || "").replace(/\D/g, "") === phone;

    });

    return { duplicateEmail, duplicatePhone };

  };

  const validateForm = () => {

    const newErrors = {};

    if (!String(formData.full_name || "").trim()) {

      newErrors.full_name = "Full name is required";

    }

    const emailError = validateEmail(formData.email);

    const phoneError = validatePhone(formData.phone_number);

    const languageError = validateLanguages(formData.languages);

    const experienceError = validateNonNegativeInteger(

      formData.experience_years,

      "Experience"

    );

    const studentsError = validateNonNegativeInteger(

      formData.total_students,

      "Total students"

    );

    const reviewsError = validateNonNegativeInteger(

      formData.total_reviews,

      "Total reviews"

    );

    const ratingError = validateRating(formData.rating);

    if (emailError) newErrors.email = emailError;

    if (phoneError) newErrors.phone_number = phoneError;

    if (languageError) newErrors.languages = languageError;

    if (experienceError) newErrors.experience_years = experienceError;

    if (studentsError) newErrors.total_students = studentsError;

    if (reviewsError) newErrors.total_reviews = reviewsError;

    if (ratingError) newErrors.rating = ratingError;

    if (!formData.category_id) newErrors.category_id = "Please select a category";

    if (!formData.subcategory_id) {

      newErrors.subcategory_id = "Please select a subcategory";

    }

    const { duplicateEmail, duplicatePhone } = validateUniqueContactDetails();

    if (duplicateEmail) {

      newErrors.email = "A trainer with this email already exists";

    }

    if (duplicatePhone) {

      newErrors.phone_number = "A trainer with this mobile number already exists";

    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;

  };

  // ---------------------------------------------------------

  // HELPERS

  // ---------------------------------------------------------

  const getImageUrl = (img) => {

    if (!img) return "";

    if (img.startsWith("http://") || img.startsWith("https://")) return img;

    return `https://finearts-backend.onrender.com${img}`;

  };

  const StatusBadge = ({ status }) => {

    const normalizedStatus = status?.toLowerCase();

    let colors = "bg-gray-500/20 text-white";

    if (normalizedStatus === "approved") {

      colors = "bg-green-500/20 text-green-400";

    } else if (normalizedStatus === "pending") {

      colors = "bg-yellow-500/20 text-yellow-400";

    } else if (normalizedStatus === "rejected") {

      colors = "bg-red-500/20 text-red-400";

    }

    return (

      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${colors}`}>

        {status || "N/A"}

      </span>

    );

  };

  // ---------------------------------------------------------

  // FETCH TRAINERS AND INSTITUTE CATEGORIES

  // ---------------------------------------------------------

  const fetchTrainers = async () => {

    try {

      const res = await getInstituteTrainers(token);

      const data = Array.isArray(res?.data?.data)

        ? res.data.data

        : Array.isArray(res?.data)

        ? res.data

        : [];

      setTrainers(data);

    } catch (error) {

      console.error("FETCH TRAINERS ERROR:", error);

      toast.error(error?.response?.data?.message || "Failed to load trainers");

    }

  };

  const fetchInstituteProfile = async () => {

    try {

      const response = await API.get("/institutes/profile", {

        params: { _t: Date.now() },

      });

      return response?.data?.data || response?.data || null;

    } catch (error) {

      console.error("FETCH INSTITUTE PROFILE ERROR:", error);

      toast.error(

        error?.response?.data?.message || "Failed to load institute profile"

      );

      return null;

    }

  };

  const extractInstituteCategoryIds = (profile) => {

    const profileCategories = Array.isArray(profile?.categories)

      ? profile.categories

      : [];

    const ids = profileCategories

      .map((item) => {

        if (typeof item === "number" || typeof item === "string") {

          return Number(item);

        }

        return Number(item?.category_id ?? item?.id ?? item?.category?.id);

      })

      .filter((id) => Number.isFinite(id) && id > 0);

    return [...new Set(ids)];

  };

  const fetchDropdowns = async () => {

    setDropdownLoading(true);

    try {

      const profile = await fetchInstituteProfile();

      const [catRes, subRes] = await Promise.all([

        API.get("/categories"),

        API.get("/subcategories"),

      ]);

      const categoryData = Array.isArray(catRes?.data?.data)

        ? catRes.data.data

        : Array.isArray(catRes?.data)

        ? catRes.data

        : [];

      const subcategoryData = Array.isArray(subRes?.data?.data)

        ? subRes.data.data

        : Array.isArray(subRes?.data)

        ? subRes.data

        : [];

      const instituteCategoryIds = extractInstituteCategoryIds(profile);

      const getCategoryId = (item) =>
        item?.category_id ?? item?.categoryId ?? item?.category?.id;
      const getItemId = (item) => item?.id ?? item?.category_id ?? item?.subcategory_id;

      // If the institute profile does not define category restrictions, show all categories.
      const allowedCategories =
        instituteCategoryIds.length > 0
          ? categoryData.filter((category) =>
              instituteCategoryIds.includes(Number(getItemId(category)))
            )
          : categoryData;

      const allowedSubcategories = subcategoryData.filter((subcategory) => {
        const parentCategoryId = getCategoryId(subcategory);
        return (
          parentCategoryId != null &&
          allowedCategories.some(
            (category) => String(getItemId(category)) === String(parentCategoryId)
          )
        );
      });

      setCategories(allowedCategories);

      setSubcategories(allowedSubcategories);

    } catch (error) {

      console.error("FETCH DROPDOWNS ERROR:", error);

      setCategories([]);

      setSubcategories([]);

      toast.error(error?.response?.data?.message || "Failed to load categories");

    } finally {

      setDropdownLoading(false);

    }

  };

  useEffect(() => {

    fetchTrainers();

    fetchDropdowns();

    // Initial load only.

    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, []);

  // ---------------------------------------------------------

  // CATEGORY / SUBCATEGORY RESOLUTION FOR EDITING

  // ---------------------------------------------------------

  const getSavedName = (value) => {

    if (Array.isArray(value)) value = value[0];

    if (value && typeof value === "object") {

      return String(

        value.name ??

        value.category_name ??

        value.subcategory_name ??

        ""

      ).trim();

    }

    return String(value ?? "").split(",")[0].trim();

  };

  const resolveCategoryId = (trainer) => {

    const specialization = Array.isArray(trainer?.specializations)
      ? trainer.specializations[0]
      : null;

    const directId =
      trainer?.category_id ??
      trainer?.categoryId ??
      trainer?.category?.id ??
      trainer?.category?.category_id ??
      specialization?.category_id;

    if (directId !== undefined && directId !== null && String(directId).trim()) {

      const directMatch = categories.find(

        (category) => String(category?.id) === String(directId)

      );

      if (directMatch) return String(directMatch.id);

    }

    const categoryName = getSavedName(

      trainer?.category_name ??
      trainer?.category?.name ??
      trainer?.categories ??
      trainer?.category ??
      specialization?.category_name

    ).toLowerCase();

    if (!categoryName) return "";

    const matched = categories.find(

      (category) =>

        String(category?.name ?? category?.category_name ?? "").trim().toLowerCase() === categoryName

    );

    return matched?.id != null ? String(matched.id) : "";

  };

  const resolveSubcategoryId = (trainer, categoryId) => {

    const specialization = Array.isArray(trainer?.specializations)
      ? trainer.specializations[0]
      : null;

    const directId =
      trainer?.subcategory_id ??
      trainer?.subcategoryId ??
      trainer?.subcategory?.id ??
      trainer?.subcategory?.subcategory_id ??
      specialization?.subcategory_id;

    if (directId !== undefined && directId !== null && String(directId).trim()) {

      const directMatch = subcategories.find(

        (subcategory) =>

          String(subcategory?.id) === String(directId) &&

          String(subcategory?.category_id ?? subcategory?.categoryId ?? subcategory?.category?.id ?? "") === String(categoryId)

      );

      if (directMatch) return String(directMatch.id);

    }

    const subcategoryName = getSavedName(

      trainer?.subcategory_name ??
      trainer?.subcategory?.name ??
      trainer?.subcategories ??
      trainer?.subcategory ??
      specialization?.subcategory_name

    ).toLowerCase();

    if (!subcategoryName || !categoryId) return "";

    const matched = subcategories.find(

      (subcategory) =>

        String(subcategory?.category_id ?? subcategory?.categoryId ?? subcategory?.category?.id ?? "") === String(categoryId) &&

        String(subcategory?.name ?? subcategory?.subcategory_name ?? "").trim().toLowerCase() === subcategoryName

    );

    return matched?.id != null ? String(matched.id) : "";

  };

  // ---------------------------------------------------------

  // CREATE / EDIT / DELETE

  // ---------------------------------------------------------

  const handleCreate = () => {

    setEditingTrainer(null);

    setFormData({ ...emptyForm });

    if (profileImageInputRef.current) profileImageInputRef.current.value = "";

    setErrors({});

    setShowModal(true);

  };

  const handleEdit = (trainer) => {

    setEditingTrainer(trainer);

    if (profileImageInputRef.current) profileImageInputRef.current.value = "";

    const categoryId = resolveCategoryId(trainer);

    const subcategoryId = resolveSubcategoryId(trainer, categoryId);

    setFormData({

      ...emptyForm,

      full_name: trainer?.full_name ?? "",

      email: trainer?.email ?? "",

      phone_number: trainer?.phone_number ?? "",

      bio: trainer?.bio ?? "",

      experience_years: trainer?.experience_years ?? "",

      languages: trainer?.languages ?? "",

      rating: trainer?.rating ?? "",

      total_reviews: trainer?.total_reviews ?? "",

      certifications: trainer?.certifications ?? "",

      total_students: trainer?.total_students ?? "",

      category_id: categoryId,

      subcategory_id: subcategoryId,

      profile_image: null,

      remove_profile_image: false,

    });

    setErrors({});

    setShowModal(true);

  };

  useEffect(() => {

    if (!editingTrainer || dropdownLoading) return;

    const categoryId = resolveCategoryId(editingTrainer);

    const subcategoryId = resolveSubcategoryId(editingTrainer, categoryId);

    setFormData((previous) => ({

      ...previous,

      category_id: categoryId,

      subcategory_id: subcategoryId,

    }));

    // The dropdown data must be loaded before resolving IDs.

    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [editingTrainer, categories, subcategories, dropdownLoading]);

  const handleDeleteClick = (trainer) => {

    setTrainerToDelete(trainer);

    setShowDeleteModal(true);

  };

  const confirmDelete = async () => {

    if (!trainerToDelete) return;

    try {

      await deleteInstituteTrainer(trainerToDelete.id, token);

      toast.success("Trainer deleted");

      await fetchTrainers();

      setShowDeleteModal(false);

      setTrainerToDelete(null);

    } catch (error) {

      console.error("DELETE TRAINER ERROR:", error);

      toast.error(error?.response?.data?.message || "Delete failed");

    }

  };

  const closeModal = () => {

    setShowModal(false);

    setEditingTrainer(null);

    if (profileImageInputRef.current) profileImageInputRef.current.value = "";

    setFormData({ ...emptyForm });

    setErrors({});

  };

  const updateField = (field, value) => {

    setFormData((previous) => ({ ...previous, [field]: value }));

    if (errors[field]) {

      setErrors((previous) => ({ ...previous, [field]: "" }));

    }

  };

  const handleEmailChange = (event) => {

    const value = event.target.value;

    updateField("email", value);

    if (value.trim()) {

      setErrors((previous) => ({ ...previous, email: validateEmail(value) }));

    }

  };

  const handlePhoneChange = (event) => {

    const value = event.target.value.replace(/\D/g, "").slice(0, 10);

    updateField("phone_number", value);

    if (!value) {

      setErrors((previous) => ({

        ...previous,

        phone_number: "Phone number is required",

      }));

    } else if (value.length < 10) {

      setErrors((previous) => ({

        ...previous,

        phone_number: "Phone number must be exactly 10 digits",

      }));

    } else {

      setErrors((previous) => ({

        ...previous,

        phone_number: validatePhone(value),

      }));

    }

  };

  const handleCategoryChange = (event) => {

    setFormData((previous) => ({

      ...previous,

      category_id: event.target.value,

      subcategory_id: "",

    }));

    setErrors((previous) => ({

      ...previous,

      category_id: "",

      subcategory_id: "",

    }));

  };

  const handleSubmit = async (event) => {

    event.preventDefault();

    if (!validateForm()) {

      toast.error("Please correct the highlighted fields");

      return;

    }

    try {

      const formDataToSend = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (key === "remove_profile_image") {
          if (value === true) formDataToSend.append(key, "true");
          return;
        }

        if (value !== null && value !== undefined && value !== "") {
          formDataToSend.append(key, value);
        }
      });

      if (editingTrainer) {

        await updateInstituteTrainer(editingTrainer.id, formDataToSend, token);

        toast.success("Trainer updated successfully");

      } else {

        await createInstituteTrainer(formDataToSend, token);

        toast.success("Trainer created successfully");

      }

      closeModal();

      await fetchTrainers();

    } catch (error) {

      console.error("TRAINER OPERATION ERROR:", error);

      const serverMessage =

        error?.response?.data?.message || error?.response?.data?.error || "";

      toast.error(serverMessage || "Operation failed");

    }

  };

  // ---------------------------------------------------------

  // FILTER TRAINERS

  // ---------------------------------------------------------

  const query = searchQuery.trim().toLowerCase();

  const filteredTrainers = trainers.filter((trainer) => {

    if (!query) return true;

    return (

      trainer.full_name?.toLowerCase().includes(query) ||

      trainer.email?.toLowerCase().includes(query) ||

      trainer.bio?.toLowerCase().includes(query) ||

      trainer.phone_number?.includes(query) ||

      trainer.languages?.toLowerCase().includes(query) ||

      String(trainer.rating ?? "").includes(query) ||

      String(trainer.total_reviews ?? "").includes(query) ||

      trainer.certifications?.toLowerCase().includes(query) ||

      trainer.categories?.toLowerCase().includes(query) ||

      trainer.subcategories?.toLowerCase().includes(query) ||

      trainer.approval_status?.toLowerCase().includes(query) ||

      String(trainer.id ?? "").includes(query) ||

      String(trainer.experience_years ?? "").includes(query)

    );

  });

  const currentSubcategories = subcategories.filter((subcategory) =>
    String(
      subcategory.category_id ??
      subcategory.categoryId ??
      subcategory.category?.id ??
      ""
    ) === String(formData.category_id)
  );

  const tableColumns = 15;

  return (

    <div className="min-h-screen p-6 md:p-8 text-white">

      {/* PAGE HEADER */}

      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <h1 className="text-3xl md:text-4xl font-bold text-purple-400">

            Institute Trainers

          </h1>

          <p className="mt-2 text-sm md:text-base text-white">

            Manage Institute Trainers

          </p>

        </div>

        <button

          type="button"

          onClick={handleCreate}

          className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 font-bold transition-opacity hover:opacity-90"

        >

          + Add Trainer

        </button>

      </div>

      {/* SEARCH */}

      <div className="mb-5">

        <div className="relative w-full">

          <Search

            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white"

            size={18}

          />

          <input

            type="text"

            placeholder="Search trainers..."

            value={searchQuery}

            onChange={(event) => setSearchQuery(event.target.value)}

            className="w-full rounded-xl border border-[#2c2c35] bg-[#151519] py-3.5 pl-12 pr-10 text-sm text-white placeholder:text-gray-400 transition-colors focus:border-purple-500/60 focus:outline-none"

          />

          {searchQuery && (

            <button

              type="button"

              onClick={() => setSearchQuery("")}

              aria-label="Clear search"

              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-white"

            >

              <FaTimes size={14} />

            </button>

          )}

        </div>

      </div>

      {/* TRAINERS TABLE */}

      <div className="overflow-hidden rounded-2xl border border-[#2c2c35] bg-[#151519]">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[1450px] border-collapse text-sm">

            <thead className="bg-[#202027] text-white">

              <tr>

                {[

                  "Image",

                  "Name",

                  "Email",

                  "Bio",

                  "Experience",

                  "Phone",

                  "Languages",

                  "Certifications",

                  "Category",

                  "Subcategory",

                  "Students",

                  "Rating",

                  "Reviews",

                  "Status",

                  "Actions",

                ].map((heading) => (

                  <th

                    key={heading}

                    className="whitespace-nowrap px-4 py-4 text-left font-semibold"

                  >

                    {heading}

                  </th>

                ))}

              </tr>

            </thead>

            <tbody>

              {filteredTrainers.length === 0 ? (

                <tr>

                  <td colSpan={tableColumns} className="p-12 text-center">

                    <div className="flex flex-col items-center gap-3">

                      <Search size={40} className="text-gray-600" />

                      <p className="text-lg text-gray-400">

                        {searchQuery

                          ? "No trainers found matching your search"

                          : "No trainers available"}

                      </p>

                      {searchQuery && (

                        <button

                          type="button"

                          onClick={() => setSearchQuery("")}

                          className="text-sm text-purple-400 hover:text-purple-300"

                        >

                          Clear search

                        </button>

                      )}

                    </div>

                  </td>

                </tr>

              ) : (

                filteredTrainers.map((trainer) => (

                  <tr

                    key={trainer.id}

                    className="border-t border-[#2c2c35] transition-colors hover:bg-[#1a1a20]"

                  >

                    <td className="px-4 py-3.5">

                      {trainer.profile_image ? (

                        <img

                          src={getImageUrl(trainer.profile_image)}

                          alt={trainer.full_name || "Trainer"}

                          className="h-11 w-11 rounded-xl border border-[#333] object-cover"

                          onError={(event) => {

                            event.currentTarget.style.display = "none";

                          }}

                        />

                      ) : (

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#26262b] text-xs text-gray-500">

                          N/A

                        </div>

                      )}

                    </td>

                    <td className="whitespace-nowrap px-4 py-3.5 font-medium">

                      {trainer.full_name || "-"}

                    </td>

                    <td className="whitespace-nowrap px-4 py-3.5 text-white">

                      {trainer.email || "-"}

                    </td>

                    <td className="max-w-[180px] truncate px-4 py-3.5 text-white" title={trainer.bio || ""}>

                      {trainer.bio || "-"}

                    </td>

                    <td className="whitespace-nowrap px-4 py-3.5 text-white">

                      {trainer.experience_years !== null && trainer.experience_years !== undefined && trainer.experience_years !== ""

                        ? `${trainer.experience_years} yrs`

                        : "-"}

                    </td>

                    <td className="whitespace-nowrap px-4 py-3.5 text-white">

                      {trainer.phone_number || "-"}

                    </td>

                    <td className="whitespace-nowrap px-4 py-3.5 text-white">

                      {trainer.languages || "-"}

                    </td>

                    <td className="max-w-[180px] truncate px-4 py-3.5 text-white" title={trainer.certifications || ""}>

                      {trainer.certifications || "-"}

                    </td>

                    <td className="whitespace-nowrap px-4 py-3.5 text-white">
                      {Array.isArray(trainer.specializations) && trainer.specializations.length > 0
                        ? trainer.specializations
                            .map((item) => item.category_name || item.category?.name)
                            .filter(Boolean)
                            .join(", ") || "-"
                        : trainer.categories || trainer.category_name || "-"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3.5 text-white">
                      {Array.isArray(trainer.specializations) && trainer.specializations.length > 0
                        ? trainer.specializations
                            .map((item) => item.subcategory_name || item.subcategory?.name)
                            .filter(Boolean)
                            .join(", ") || "-"
                        : trainer.subcategories || trainer.subcategory_name || "-"}
                    </td>

                    <td className="whitespace-nowrap px-4 py-3.5 font-semibold">

                      {trainer.total_students ?? 0}

                    </td>

                    <td className="whitespace-nowrap px-4 py-3.5 font-semibold">

                      {trainer.rating !== null && trainer.rating !== undefined && trainer.rating !== ""

                        ? Math.round(Number(trainer.rating))

                        : "-"}

                    </td>

                    <td className="whitespace-nowrap px-4 py-3.5 font-semibold">

                      {trainer.total_reviews ?? "-"}

                    </td>

                    <td className="whitespace-nowrap px-4 py-3.5">

                      <StatusBadge status={trainer.approval_status} />

                    </td>

                    <td className="px-4 py-3.5">

                      <div className="flex items-center gap-2">

                        <button

                          type="button"

                          onClick={() => handleEdit(trainer)}

                          className="rounded-lg p-2 transition-colors hover:bg-[#2a2a35]"

                          title="Edit"

                          aria-label={`Edit ${trainer.full_name || "trainer"}`}

                        >

                          <Edit size={16} className="text-white" />

                        </button>

                        <button

                          type="button"

                          onClick={() => handleDeleteClick(trainer)}

                          className="group rounded-lg p-2 transition-colors hover:bg-red-500/10"

                          title="Delete"

                          aria-label={`Delete ${trainer.full_name || "trainer"}`}

                        >

                          <Trash2 size={16} className="text-red-500/70 group-hover:text-red-400" />

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

      {/* ADD / EDIT MODAL */}

      {showModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">

          <div className="flex max-h-[90vh] w-full max-w-[720px] flex-col overflow-hidden rounded-2xl bg-[#211c30] shadow-2xl">

            <div className="flex items-center justify-between border-b border-[#3a3448] p-5 md:p-6">

              <h2 className="text-xl font-bold text-white md:text-2xl">

                {editingTrainer ? "Edit Trainer" : "Add Trainer"}

              </h2>

              <button

                type="button"

                onClick={closeModal}

                aria-label="Close form"

                className="text-white transition-colors hover:text-purple-400"

              >

                <FaTimes size={20} />

              </button>

            </div>

            <div className="overflow-y-auto p-5 md:p-6">

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>

                {/* FULL NAME + EMAIL */}

                <div className="grid grid-cols-1 gap-x-4 gap-y-1 md:grid-cols-2">

                  <div>

                    <label className={labelClass}>

                      Full Name <span className="text-red-500">*</span>

                    </label>

                    <input

                      type="text"

                      value={formData.full_name}

                      onChange={(event) => updateField("full_name", event.target.value)}

                      className={`${inputClass} ${errors.full_name ? "border border-red-500" : ""}`}

                      placeholder="Enter full name"

                      autoComplete="name"

                    />

                    {errors.full_name && <p className={errorClass}>{errors.full_name}</p>}

                  </div>

                  <div>

                    <label className={labelClass}>

                      Email <span className="text-red-500">*</span>

                    </label>

                    <input

                      type="email"

                      value={formData.email}

                      onChange={handleEmailChange}

                      onBlur={() => {

                        const emailError = validateEmail(formData.email);

                        const { duplicateEmail } = validateUniqueContactDetails();

                        setErrors((previous) => ({

                          ...previous,

                          email: duplicateEmail

                            ? "A trainer with this email already exists"

                            : emailError,

                        }));

                      }}

                      className={`${inputClass} ${errors.email ? "border border-red-500" : ""}`}

                      placeholder="Enter email"

                      autoComplete="email"

                    />

                    {errors.email && <p className={errorClass}>{errors.email}</p>}

                  </div>

                </div>

                {/* PHONE + EXPERIENCE */}

                <div className="grid grid-cols-1 gap-x-4 gap-y-1 md:grid-cols-2">

                  <div>

                    <label className={labelClass}>

                      Phone Number <span className="text-red-500">*</span>

                    </label>

                    <input

                      type="tel"

                      inputMode="numeric"

                      maxLength={10}

                      value={formData.phone_number}

                      onChange={handlePhoneChange}

                      onBlur={() => {

                        const phoneError = validatePhone(formData.phone_number);

                        const { duplicatePhone } = validateUniqueContactDetails();

                        setErrors((previous) => ({

                          ...previous,

                          phone_number: duplicatePhone

                            ? "A trainer with this mobile number already exists"

                            : phoneError,

                        }));

                      }}

                      className={`${inputClass} ${errors.phone_number ? "border border-red-500" : ""}`}

                      placeholder="Enter 10-digit phone number"

                      autoComplete="tel"

                    />

                    {errors.phone_number && <p className={errorClass}>{errors.phone_number}</p>}

                  </div>

                  <div>

                    <label className={labelClass}>Experience Years</label>

                    <input

                      type="number"

                      min="0"

                      step="1"

                      value={formData.experience_years}

                      onChange={(event) => {

                        const value = event.target.value;

                        updateField("experience_years", value);

                        setErrors((previous) => ({

                          ...previous,

                          experience_years: validateNonNegativeInteger(value, "Experience"),

                        }));

                      }}

                      className={`${inputClass} ${errors.experience_years ? "border border-red-500" : ""}`}

                      placeholder="0"

                    />

                    {errors.experience_years && <p className={errorClass}>{errors.experience_years}</p>}

                  </div>

                </div>

                {/* BIO */}

                <div>

                  <label className={labelClass}>Bio</label>

                  <textarea

                    value={formData.bio}

                    onChange={(event) => updateField("bio", event.target.value)}

                    rows={3}

                    className={inputClass}

                    placeholder="Enter bio"

                  />

                </div>

                {/* LANGUAGES */}

                <div>

                  <label className={labelClass}>Languages</label>

                  <input

                    type="text"

                    value={formData.languages}

                    onChange={(event) => {

                      const cleanedValue = event.target.value.replace(

                        /[^\p{L}\p{M}\s,'-]/gu,

                        ""

                      );

                      updateField("languages", cleanedValue);

                      setErrors((previous) => ({

                        ...previous,

                        languages: validateLanguages(cleanedValue),

                      }));

                    }}

                    className={`${inputClass} ${errors.languages ? "border border-red-500" : ""}`}

                    placeholder="e.g. English, Hindi"

                  />

                  {errors.languages && <p className={errorClass}>{errors.languages}</p>}

                </div>

                {/* CERTIFICATIONS */}

                <div>

                  <label className={labelClass}>Certifications</label>

                  <textarea

                    value={formData.certifications}

                    onChange={(event) => updateField("certifications", event.target.value)}

                    rows={2}

                    className={inputClass}

                    placeholder="Enter certifications"

                  />

                </div>

                {/* STUDENTS + IMAGE */}

                <div className="grid grid-cols-1 gap-x-4 gap-y-1 md:grid-cols-2">

                  <div>

                    <label className={labelClass}>Total Students</label>

                    <input

                      type="number"

                      min="0"

                      step="1"

                      value={formData.total_students}

                      onChange={(event) => {

                        const value = event.target.value;

                        updateField("total_students", value);

                        setErrors((previous) => ({

                          ...previous,

                          total_students: validateNonNegativeInteger(value, "Total students"),

                        }));

                      }}

                      className={`${inputClass} ${errors.total_students ? "border border-red-500" : ""}`}

                      placeholder="0"

                    />

                    {errors.total_students && <p className={errorClass}>{errors.total_students}</p>}

                  </div>

                  <div>

                    <label className={labelClass}>Profile Image</label>

                    {editingTrainer?.profile_image && !formData.remove_profile_image && !formData.profile_image && (
                      <div className="mb-3 flex items-center gap-3">
                        <img
                          src={getImageUrl(editingTrainer.profile_image)}
                          alt="Current trainer profile"
                          className="h-20 w-20 rounded-xl border border-[#333] object-cover"
                          onError={(event) => {
                            event.currentTarget.style.display = "none";
                          }}
                        />
                        <div className="flex flex-col gap-2">
                          <p className="text-xs text-gray-400">Current profile image</p>
                          <button
                            type="button"
                            onClick={() => updateField("remove_profile_image", true)}
                            className="inline-flex items-center gap-2 self-start rounded-lg border border-red-500/40 px-3 py-2 text-xs font-semibold text-red-300 transition-colors hover:bg-red-500/10"
                          >
                            <Trash2 size={14} /> Remove current image
                          </button>
                        </div>
                      </div>
                    )}

                    {formData.remove_profile_image && (
                      <div className="mb-3 flex items-center justify-between rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-3">
                        <span className="text-xs text-yellow-200">Current image will be removed when you save.</span>
                        <button
                          type="button"
                          onClick={() => updateField("remove_profile_image", false)}
                          className="text-xs font-semibold text-white underline"
                        >
                          Undo
                        </button>
                      </div>
                    )}

                    <input
                      ref={profileImageInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/jpg"
                      onChange={(event) => {
                        const file = event.target.files?.[0] || null;
                        updateField("profile_image", file);
                        if (file) updateField("remove_profile_image", false);
                      }}
                      className={inputClass}
                    />

                    {formData.profile_image && (
                      <div className="mt-2 flex items-center justify-between rounded-lg border border-purple-500/30 bg-purple-500/10 p-3">
                        <span className="max-w-[75%] truncate text-xs text-purple-200">
                          Selected: {formData.profile_image.name}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            updateField("profile_image", null);
                            if (profileImageInputRef.current) profileImageInputRef.current.value = "";
                          }}
                          className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold text-red-300 hover:bg-red-500/10"
                        >
                          <FaTimes size={12} /> Remove selection
                        </button>
                      </div>
                    )}

                    {editingTrainer && (

                      <p className="mt-1 text-xs text-gray-400">

                        Select a new image only if you want to replace the current image.

                      </p>

                    )}

                  </div>

                </div>

                {/* RATING + REVIEWS */}

                <div className="grid grid-cols-1 gap-x-4 gap-y-1 md:grid-cols-2">

                  <div>

                    <label className={labelClass}>Rating</label>

                    <input

                      type="number"

                      min="0"

                      max="5"

                      step="0.1"

                      value={formData.rating}

                      onChange={(event) => {

                        const value = event.target.value;

                        updateField("rating", value);

                        setErrors((previous) => ({

                          ...previous,

                          rating: validateRating(value),

                        }));

                      }}

                      className={`${inputClass} ${errors.rating ? "border border-red-500" : ""}`}

                      placeholder="0"

                    />

                    {errors.rating && <p className={errorClass}>{errors.rating}</p>}

                  </div>

                  <div>

                    <label className={labelClass}>Reviews</label>

                    <input

                      type="number"

                      min="0"

                      step="1"

                      value={formData.total_reviews}

                      onChange={(event) => {

                        const value = event.target.value;

                        updateField("total_reviews", value);

                        setErrors((previous) => ({

                          ...previous,

                          total_reviews: validateNonNegativeInteger(value, "Total reviews"),

                        }));

                      }}

                      className={`${inputClass} ${errors.total_reviews ? "border border-red-500" : ""}`}

                      placeholder="0"

                    />

                    {errors.total_reviews && <p className={errorClass}>{errors.total_reviews}</p>}

                  </div>

                </div>

                {/* CATEGORY + SUBCATEGORY */}

                <div className="grid grid-cols-1 gap-x-4 gap-y-1 md:grid-cols-2">

                  <div>

                    <label className={labelClass}>

                      Category <span className="text-red-500">*</span>

                    </label>

                    <select

                      value={formData.category_id || ""}

                      onChange={handleCategoryChange}

                      disabled={dropdownLoading || categories.length === 0}

                      className={`${selectClass} ${errors.category_id ? "border border-red-500" : ""} disabled:opacity-50`}

                    >

                      <option value="">

                        {dropdownLoading

                          ? "Loading Categories..."

                          : categories.length === 0

                          ? "No Categories Available"

                          : "Select Category"}

                      </option>

                      {categories.map((category) => (

                        <option key={category.id} value={String(category.id)}>

                          {category.name || category.category_name}

                        </option>

                      ))}

                    </select>

                    {errors.category_id && <p className={errorClass}>{errors.category_id}</p>}

                  </div>

                  <div>

                    <label className={labelClass}>

                      Subcategory <span className="text-red-500">*</span>

                    </label>

                    <select

                      value={formData.subcategory_id || ""}

                      onChange={(event) => updateField("subcategory_id", event.target.value)}

                      disabled={!formData.category_id || dropdownLoading}

                      className={`${selectClass} ${errors.subcategory_id ? "border border-red-500" : ""} disabled:opacity-50`}

                    >

                      <option value="">

                        {!formData.category_id

                          ? "Select Category First"

                          : currentSubcategories.length === 0

                          ? "No Subcategories Available"

                          : "Select Subcategory"}

                      </option>

                      {currentSubcategories.map((subcategory) => (

                        <option key={subcategory.id} value={String(subcategory.id)}>

                          {subcategory.name || subcategory.subcategory_name}

                        </option>

                      ))}

                    </select>

                    {errors.subcategory_id && <p className={errorClass}>{errors.subcategory_id}</p>}

                  </div>

                </div>

                {/* FORM ACTIONS */}

                <div className="flex flex-col-reverse gap-3 border-t border-[#3a3448] pt-4 sm:flex-row sm:justify-end">

                  <button

                    type="button"

                    onClick={closeModal}

                    className="rounded-xl border border-gray-600 px-5 py-3 text-gray-300 transition-colors hover:bg-[#2b2638]"

                  >

                    Cancel

                  </button>

                  <button

                    type="submit"

                    className="rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-5 py-3 font-bold text-white transition-opacity hover:opacity-90"

                  >

                    {editingTrainer ? "Update Trainer" : "Create Trainer"}

                  </button>

                </div>

              </form>

            </div>

          </div>

        </div>

      )}

      {/* DELETE CONFIRMATION MODAL */}

      {showDeleteModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">

          <div className="w-full max-w-[400px] overflow-hidden rounded-2xl border border-[#2e2a42] bg-[#1e1b2e] shadow-2xl">

            <div className="flex flex-col items-center p-8">

              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-500/15">

                <FaTrash className="text-lg text-red-400" />

              </div>

              <h2 className="mb-3 text-center text-xl font-bold text-white">

                Delete Trainer

              </h2>

              <p className="mb-8 text-center text-sm leading-relaxed text-white">

                Are you sure you want to delete this trainer?

                {trainerToDelete?.full_name ? ` (${trainerToDelete.full_name})` : ""}

              </p>

              <div className="flex w-full gap-3">

                <button

                  type="button"

                  onClick={() => {

                    setShowDeleteModal(false);

                    setTrainerToDelete(null);

                  }}

                  className="flex-1 rounded-xl border border-[#3a3650] px-5 py-3 text-gray-300 transition-colors hover:bg-[#2a2640]"

                >

                  Cancel

                </button>

                <button

                  type="button"

                  onClick={confirmDelete}

                  className="flex-1 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 px-5 py-3 font-bold text-white transition-opacity hover:opacity-90"

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
