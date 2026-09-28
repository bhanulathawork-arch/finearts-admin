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

// export default function InstituteTrainers() {
//   const [trainers, setTrainers] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");

//   const [showModal, setShowModal] = useState(false);
//   const [editingTrainer, setEditingTrainer] = useState(null);

//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [trainerToDelete, setTrainerToDelete] = useState(null);

//   const [categories, setCategories] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);

//   const [errors, setErrors] = useState({});

//   const emptyForm = {
//     full_name: "",
//     email: "",
//     phone_number: "",
//     bio: "",
//     experience_years: "",
//     specialty: "",
//     languages: "",
//     skills: "",
//     rating: "",
//     total_reviews: "",
//     certifications: "",
//     response_rate: "",
//     total_students: "",
//     category_id: "",
//     subcategory_id: "",
//     profile_image: null,
//   };

//   const [formData, setFormData] = useState(emptyForm);

//   const token = localStorage.getItem("token");

//   const totalColumns = 16;

//   // =========================================================
//   // VALIDATION HELPERS
//   // =========================================================

//   const validateEmail = (email) => {
//     const value = String(email || "").trim();

//     if (!value) {
//       return "Email is required";
//     }

//     const emailRegex =
//       /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;

//     if (!emailRegex.test(value)) {
//       return "Please enter a valid email address";
//     }

//     return "";
//   };

//   const validatePhone = (phone) => {
//     const value = String(phone || "").trim();

//     if (!value) {
//       return "Phone number is required";
//     }

//     if (!/^\d+$/.test(value)) {
//       return "Phone number must contain only digits";
//     }

//     if (value.length !== 10) {
//       return "Phone number must be exactly 10 digits";
//     }

//     if (!/^[6-9]/.test(value)) {
//       return "Phone number must start with 6, 7, 8, or 9";
//     }

//     return "";
//   };

//   const validateResponseRate = (rate) => {
//     const value = String(rate ?? "").trim();

//     if (value === "") {
//       return "";
//     }

//     if (!/^\d+(\.\d{1,2})?$/.test(value)) {
//       return "Response rate must contain only numbers";
//     }

//     const numericValue = Number(value);

//     if (Number.isNaN(numericValue)) {
//       return "Please enter a valid response rate";
//     }

//     if (numericValue < 0 || numericValue > 100) {
//       return "Response rate must be between 0 and 100";
//     }

//     return "";
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     const emailError = validateEmail(formData.email);
//     const phoneError = validatePhone(formData.phone_number);
//     const responseRateError = validateResponseRate(formData.response_rate);

//     if (emailError) {
//       newErrors.email = emailError;
//     }

//     if (phoneError) {
//       newErrors.phone_number = phoneError;
//     }

//     if (responseRateError) {
//       newErrors.response_rate = responseRateError;
//     }

//     if (!String(formData.full_name || "").trim()) {
//       newErrors.full_name = "Full name is required";
//     }

//     setErrors(newErrors);

//     return Object.keys(newErrors).length === 0;
//   };

//   // =========================================================
//   // FORMAT HELPERS
//   // =========================================================

//   const formatResponseRate = (value) => {
//     if (value === null || value === undefined || value === "") {
//       return "-";
//     }

//     const stringValue = String(value);

//     if (stringValue.endsWith("%")) {
//       return stringValue;
//     }

//     return `${stringValue}%`;
//   };

//   // =========================================================
//   // FILTERED TRAINERS
//   // =========================================================

//   const filteredTrainers = trainers.filter((t) => {
//     const query = searchQuery.toLowerCase();

//     return (
//       t.full_name?.toLowerCase().includes(query) ||
//       t.email?.toLowerCase().includes(query) ||
//       t.specialty?.toLowerCase().includes(query) ||
//       t.bio?.toLowerCase().includes(query) ||
//       t.phone_number?.includes(query) ||
//       t.languages?.toLowerCase().includes(query) ||
//       t.skills?.toLowerCase().includes(query) ||
//       String(t.rating ?? "").includes(query) ||
//       String(t.total_reviews ?? "").includes(query) ||
//       t.certifications?.toLowerCase().includes(query) ||
//       String(t.response_rate ?? "")
//         .toLowerCase()
//         .includes(query) ||
//       t.categories?.toLowerCase().includes(query) ||
//       t.subcategories?.toLowerCase().includes(query) ||
//       t.approval_status?.toLowerCase().includes(query) ||
//       String(t.id).includes(query) ||
//       String(t.experience_years ?? "").includes(query)
//     );
//   });

//   // =========================================================
//   // IMAGE HELPER
//   // =========================================================

//   const getImageUrl = (img) => {
//     if (!img) return "";

//     if (img.startsWith("http")) {
//       return img;
//     }

//     return `https://finearts-backend.onrender.com${img}`;
//   };

//   // =========================================================
//   // STATUS BADGE
//   // =========================================================

//   const StatusBadge = ({ status }) => {
//     const s = status?.toLowerCase();

//     let bg = "bg-gray-500/20";
//     let text = "text-white";

//     if (s === "approved") {
//       bg = "bg-green-500/20";
//       text = "text-green-400";
//     } else if (s === "pending") {
//       bg = "bg-yellow-500/20";
//       text = "text-yellow-400";
//     } else if (s === "rejected") {
//       bg = "bg-red-500/20";
//       text = "text-red-400";
//     }

//     return (
//       <span
//         className={`px-2.5 py-1 rounded-full text-xs font-semibold ${bg} ${text}`}
//       >
//         {status || "N/A"}
//       </span>
//     );
//   };

//   // =========================================================
//   // FETCH TRAINERS
//   // =========================================================

//   const fetchTrainers = async () => {
//     try {
//       const res = await getInstituteTrainers(token);

//       console.log("API Response:", res);

//       setTrainers(res.data || []);
//     } catch (e) {
//       toast.error(
//         e.response?.data?.message || "Failed to load trainers"
//       );
//     }
//   };

//   // =========================================================
//   // FETCH CATEGORIES / SUBCATEGORIES
//   // =========================================================

//   const fetchDropdowns = async () => {
//     try {
//       const [catRes, subRes] = await Promise.all([
//         API.get("/categories"),
//         API.get("/subcategories"),
//       ]);

//       setCategories(catRes.data?.data || []);
//       setSubcategories(subRes.data?.data || []);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     fetchTrainers();
//     fetchDropdowns();
//   }, []);

//   // =========================================================
//   // CREATE
//   // =========================================================

//   const handleCreate = () => {
//     setEditingTrainer(null);
//     setFormData({ ...emptyForm });
//     setErrors({});
//     setShowModal(true);
//   };

//   // =========================================================
//   // EDIT
//   // =========================================================

//   const handleEdit = (trainer) => {
//     setEditingTrainer(trainer);

//     setFormData({
//       ...emptyForm,
//       ...trainer,

//       email: trainer.email || "",
//       phone_number: trainer.phone_number || "",
//       response_rate:
//         trainer.response_rate !== null &&
//         trainer.response_rate !== undefined
//           ? String(trainer.response_rate).replace("%", "")
//           : "",

//       rating: trainer.rating || "",
//       total_reviews: trainer.total_reviews || "",
//       profile_image: null,
//     });

//     setErrors({});
//     setShowModal(true);
//   };

//   // =========================================================
//   // DELETE
//   // =========================================================

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
//     } catch (e) {
//       toast.error(
//         e.response?.data?.message || "Delete failed"
//       );
//     }
//   };

//   // =========================================================
//   // CLOSE MODAL
//   // =========================================================

//   const closeModal = () => {
//     setShowModal(false);
//     setEditingTrainer(null);
//     setErrors({});
//   };

//   // =========================================================
//   // FORM CHANGE HELPERS
//   // =========================================================

//   const updateField = (field, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));

//     if (errors[field]) {
//       setErrors((prev) => ({
//         ...prev,
//         [field]: "",
//       }));
//     }
//   };

//   // =========================================================
//   // EMAIL CHANGE
//   // =========================================================

//   const handleEmailChange = (e) => {
//     const value = e.target.value;

//     updateField("email", value);

//     if (value.trim() !== "") {
//       const error = validateEmail(value);

//       if (error) {
//         setErrors((prev) => ({
//           ...prev,
//           email: error,
//         }));
//       }
//     }
//   };

//   // =========================================================
//   // PHONE CHANGE
//   // =========================================================

//   const handlePhoneChange = (e) => {
//     // Remove everything except numbers
//     let value = e.target.value.replace(/\D/g, "");

//     // Maximum 10 digits
//     value = value.slice(0, 10);

//     updateField("phone_number", value);

//     if (value.length > 0) {
//       if (value.length === 10) {
//         const error = validatePhone(value);

//         if (error) {
//           setErrors((prev) => ({
//             ...prev,
//             phone_number: error,
//           }));
//         }
//       } else {
//         setErrors((prev) => ({
//           ...prev,
//           phone_number: "Phone number must be exactly 10 digits",
//         }));
//       }
//     }
//   };

//   // =========================================================
//   // RESPONSE RATE CHANGE
//   // =========================================================

//   const handleResponseRateChange = (e) => {
//     let value = e.target.value;

//     // Remove letters and special characters.
//     // Allow only numbers and one decimal point.
//     value = value.replace(/[^\d.]/g, "");

//     const firstDotIndex = value.indexOf(".");

//     if (firstDotIndex !== -1) {
//       value =
//         value.slice(0, firstDotIndex + 1) +
//         value.slice(firstDotIndex + 1).replace(/\./g, "");
//     }

//     // Maximum 2 decimal places
//     if (value.includes(".")) {
//       const [whole, decimal] = value.split(".");
//       value = `${whole}.${decimal.slice(0, 2)}`;
//     }

//     // Do not allow greater than 100
//     if (value !== "") {
//       const numericValue = Number(value);

//       if (numericValue > 100) {
//         value = "100";
//       }
//     }

//     updateField("response_rate", value);

//     if (value !== "") {
//       const error = validateResponseRate(value);

//       if (error) {
//         setErrors((prev) => ({
//           ...prev,
//           response_rate: error,
//         }));
//       }
//     }
//   };

//   // =========================================================
//   // FORM SUBMIT
//   // =========================================================

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate before sending to backend
//     if (!validateForm()) {
//       toast.error("Please correct the highlighted fields");
//       return;
//     }

//     try {
//       const fd = new FormData();

//       Object.entries(formData).forEach(([key, value]) => {
//         if (
//           value !== null &&
//           value !== undefined &&
//           value !== ""
//         ) {
//           fd.append(key, value);
//         }
//       });

//       if (editingTrainer) {
//         await updateInstituteTrainer(
//           editingTrainer.id,
//           fd,
//           token
//         );

//         toast.success("Trainer updated successfully");
//       } else {
//         await createInstituteTrainer(fd, token);

//         toast.success("Trainer created successfully");
//       }

//       closeModal();

//       await fetchTrainers();
//     } catch (e) {
//       console.error("Trainer operation error:", e);

//       toast.error(
//         e.response?.data?.message || "Operation failed"
//       );
//     }
//   };

//   // =========================================================
//   // JSX
//   // =========================================================

//   return (
//     <div className="p-8 text-white">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//         <div>
//           <h1 className="text-4xl font-bold text-purple-400">
//             Institute Trainers
//           </h1>

//           <p className="text-white mt-2">
//             Manage Institute Trainers
//           </p>
//         </div>

//         <button
//           onClick={handleCreate}
//           className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition-opacity"
//         >
//           + Add Trainer
//         </button>
//       </div>

//       {/* Search */}
//       <div className="mb-6">
//         <div className="relative w-full">
//           <Search
//             className="absolute left-4 top-1/2 -translate-y-1/2 text-white pointer-events-none"
//             size={18}
//           />

//           <input
//             type="text"
//             placeholder="Search trainers..."
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
//                 <th className="p-4 text-left whitespace-nowrap">
//                   Image
//                 </th>

//                 <th className="p-4 text-left whitespace-nowrap">
//                   Name
//                 </th>

//                 <th className="p-4 text-left whitespace-nowrap">
//                   Email
//                 </th>

//                 <th className="p-4 text-left whitespace-nowrap">
//                   Bio
//                 </th>

//                 <th className="p-4 text-left whitespace-nowrap">
//                   Experience
//                 </th>

//                 <th className="p-4 text-left whitespace-nowrap">
//                   Phone
//                 </th>

//                 <th className="p-4 text-left whitespace-nowrap">
//                   Languages
//                 </th>

//                 <th className="p-4 text-left whitespace-nowrap">
//                   Certifications
//                 </th>

//                 <th className="p-4 text-left whitespace-nowrap">
//                   Response Rate
//                 </th>

//                 <th className="p-4 text-left whitespace-nowrap">
//                   Category
//                 </th>

//                 <th className="p-4 text-left whitespace-nowrap">
//                   Subcategory
//                 </th>

//                 <th className="p-4 text-left whitespace-nowrap">
//                   Students
//                 </th>

//                 <th className="p-4 text-left whitespace-nowrap">
//                   Rating
//                 </th>

//                 <th className="p-4 text-left whitespace-nowrap">
//                   Reviews
//                 </th>

//                 <th className="p-4 text-left whitespace-nowrap">
//                   Status
//                 </th>

//                 <th className="p-4 text-left whitespace-nowrap">
//                   Actions
//                 </th>
//               </tr>
//             </thead>

//             <tbody>
//               {filteredTrainers.length === 0 ? (
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
//                           ? "No trainers found matching your search"
//                           : "No trainers available"}
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
//                 filteredTrainers.map((trainer) => (
//                   <tr
//                     key={trainer.id}
//                     className="border-t border-[#2c2c35] hover:bg-[#1a1a20] transition-colors"
//                   >
//                     {/* Image */}
//                     <td className="p-4">
//                       {trainer.profile_image ? (
//                         <img
//                           src={getImageUrl(
//                             trainer.profile_image
//                           )}
//                           alt={trainer.full_name}
//                           className="w-11 h-11 rounded-xl object-cover border border-[#333]"
//                           onError={(e) => {
//                             e.currentTarget.style.display =
//                               "none";
//                           }}
//                         />
//                       ) : (
//                         <div className="w-11 h-11 bg-[#26262b] rounded-xl flex items-center justify-center text-gray-600 text-xs">
//                           N/A
//                         </div>
//                       )}
//                     </td>

//                     {/* Name */}
//                     <td className="p-4 font-medium whitespace-nowrap">
//                       {trainer.full_name}
//                     </td>

//                     {/* Email */}
//                     <td className="p-4 text-white whitespace-nowrap">
//                       {trainer.email || "-"}
//                     </td>

//                     {/* Bio */}
//                     <td className="p-4 text-white max-w-[130px] truncate">
//                       {trainer.bio || "-"}
//                     </td>

//                     {/* Experience */}
//                     <td className="p-4 text-white whitespace-nowrap">
//                       {trainer.experience_years
//                         ? `${trainer.experience_years} yrs`
//                         : "-"}
//                     </td>

//                     {/* Phone */}
//                     <td className="p-4 text-white whitespace-nowrap">
//                       {trainer.phone_number || "-"}
//                     </td>

//                     {/* Languages */}
//                     <td className="p-4 text-white whitespace-nowrap">
//                       {trainer.languages || "-"}
//                     </td>

//                     {/* Certifications */}
//                     <td className="p-4 text-white max-w-[140px] truncate">
//                       {trainer.certifications || "-"}
//                     </td>

//                     {/* Response Rate */}
//                     <td className="p-4 whitespace-nowrap">
//                       {formatResponseRate(
//                         trainer.response_rate
//                       )}
//                     </td>

//                     {/* Category */}
//                     <td className="p-4 text-white whitespace-nowrap">
//                       {trainer.categories || "-"}
//                     </td>

//                     {/* Subcategory */}
//                     <td className="p-4 text-white whitespace-nowrap">
//                       {trainer.subcategories || "-"}
//                     </td>

//                     {/* Students */}
//                     <td className="p-4 font-semibold whitespace-nowrap">
//                       {trainer.total_students ?? 0}
//                     </td>

//                     {/* Rating */}
//                     <td className="p-4 font-semibold whitespace-nowrap">
//                       {trainer.rating
//                         ? Math.round(Number(trainer.rating))
//                         : "-"}
//                     </td>

//                     {/* Reviews */}
//                     <td className="p-4 font-semibold whitespace-nowrap">
//                       {trainer.total_reviews ?? "-"}
//                     </td>

//                     {/* Status */}
//                     <td className="p-4 whitespace-nowrap">
//                       <StatusBadge
//                         status={trainer.approval_status}
//                       />
//                     </td>

//                     {/* Actions */}
//                     <td className="p-4">
//                       <div className="flex items-center gap-2">
//                         <button
//                           onClick={() =>
//                             handleEdit(trainer)
//                           }
//                           className="p-2 rounded-lg hover:bg-[#2a2a35] transition-colors group"
//                           title="Edit"
//                         >
//                           <Edit
//                             size={16}
//                             className="text-white"
//                           />
//                         </button>

//                         <button
//                           onClick={() =>
//                             handleDeleteClick(trainer)
//                           }
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

//       {/* =====================================================
//           ADD / EDIT TRAINER MODAL
//       ====================================================== */}

//       {showModal && (
//         <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
//           <div className="w-full max-w-[650px] max-h-[90vh] bg-[#211c30] rounded-2xl overflow-hidden shadow-2xl">
//             {/* Header */}
//             <div className="flex justify-between items-center p-6 border-b border-[#3a3448]">
//               <h2 className="text-2xl font-bold text-white">
//                 {editingTrainer
//                   ? "Edit Trainer"
//                   : "Add Trainer"}
//               </h2>

//               <button
//                 onClick={closeModal}
//                 className="text-white hover:text-purple-400 transition-colors"
//               >
//                 <FaTimes size={20} />
//               </button>
//             </div>

//             {/* Body */}
//             <div className="overflow-y-auto max-h-[75vh] p-6">
//               <form
//                 onSubmit={handleSubmit}
//                 className="space-y-1"
//                 noValidate
//               >
//                 {/* Full Name + Email */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {/* Full Name */}
//                   <div>
//                     <label className={labelClass}>
//                       Full Name
//                     </label>

//                     <input
//                       type="text"
//                       value={formData.full_name}
//                       onChange={(e) =>
//                         updateField(
//                           "full_name",
//                           e.target.value
//                         )
//                       }
//                       className={`${inputClass} ${
//                         errors.full_name
//                           ? "border-red-500"
//                           : ""
//                       }`}
//                       placeholder="Enter full name"
//                     />

//                     {errors.full_name && (
//                       <p className={errorClass}>
//                         {errors.full_name}
//                       </p>
//                     )}
//                   </div>

//                   {/* Email */}
//                   <div>
//                     <label className={labelClass}>
//                       Email
//                     </label>

//                     <input
//                       type="email"
//                       value={formData.email}
//                       onChange={handleEmailChange}
//                       onBlur={() => {
//                         const error = validateEmail(
//                           formData.email
//                         );

//                         setErrors((prev) => ({
//                           ...prev,
//                           email: error,
//                         }));
//                       }}
//                       className={`${inputClass} ${
//                         errors.email
//                           ? "border border-red-500"
//                           : ""
//                       }`}
//                       placeholder="Enter email"
//                       autoComplete="email"
//                     />

//                     {errors.email && (
//                       <p className={errorClass}>
//                         {errors.email}
//                       </p>
//                     )}
//                   </div>
//                 </div>

//                 {/* Phone + Experience */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {/* Phone */}
//                   <div>
//                     <label className={labelClass}>
//                       Phone Number
//                     </label>

//                     <input
//                       type="tel"
//                       inputMode="numeric"
//                       maxLength={10}
//                       value={formData.phone_number}
//                       onChange={handlePhoneChange}
//                       onBlur={() => {
//                         const error = validatePhone(
//                           formData.phone_number
//                         );

//                         setErrors((prev) => ({
//                           ...prev,
//                           phone_number: error,
//                         }));
//                       }}
//                       className={`${inputClass} ${
//                         errors.phone_number
//                           ? "border border-red-500"
//                           : ""
//                       }`}
//                       placeholder="Enter 10-digit phone number"
//                       autoComplete="tel"
//                     />

//                     {errors.phone_number && (
//                       <p className={errorClass}>
//                         {errors.phone_number}
//                       </p>
//                     )}
//                   </div>

//                   {/* Experience */}
//                   <div>
//                     <label className={labelClass}>
//                       Experience Years
//                     </label>

//                     <input
//                       type="number"
//                       min="0"
//                       value={formData.experience_years}
//                       onChange={(e) =>
//                         updateField(
//                           "experience_years",
//                           e.target.value
//                         )
//                       }
//                       className={inputClass}
//                       placeholder="0"
//                     />
//                   </div>
//                 </div>

//                 {/* Bio */}
//                 <div>
//                   <label className={labelClass}>
//                     Bio
//                   </label>

//                   <textarea
//                     value={formData.bio}
//                     onChange={(e) =>
//                       updateField("bio", e.target.value)
//                     }
//                     rows="3"
//                     className={inputClass}
//                     placeholder="Enter bio"
//                   />
//                 </div>

//                 {/* Languages */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className={labelClass}>
//                       Languages
//                     </label>

//                     <input
//                       type="text"
//                       value={formData.languages}
//                       onChange={(e) =>
//                         updateField(
//                           "languages",
//                           e.target.value
//                         )
//                       }
//                       className={inputClass}
//                       placeholder="e.g. English, Hindi"
//                     />
//                   </div>
//                 </div>

//                 {/* Certifications */}
//                 <div>
//                   <label className={labelClass}>
//                     Certifications
//                   </label>

//                   <textarea
//                     value={formData.certifications}
//                     onChange={(e) =>
//                       updateField(
//                         "certifications",
//                         e.target.value
//                       )
//                     }
//                     rows="3"
//                     className={inputClass}
//                     placeholder="Enter certifications"
//                   />
//                 </div>

//                 {/* Response Rate + Students */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {/* Response Rate */}
//                   <div>
//                     <label className={labelClass}>
//                       Response Rate
//                     </label>

//                     <input
//                       type="text"
//                       inputMode="decimal"
//                       value={formData.response_rate}
//                       onChange={handleResponseRateChange}
//                       onBlur={() => {
//                         const error =
//                           validateResponseRate(
//                             formData.response_rate
//                           );

//                         setErrors((prev) => ({
//                           ...prev,
//                           response_rate: error,
//                         }));
//                       }}
//                       className={`${inputClass} ${
//                         errors.response_rate
//                           ? "border border-red-500"
//                           : ""
//                       }`}
//                       placeholder="0 - 100"
//                     />

//                     {errors.response_rate && (
//                       <p className={errorClass}>
//                         {errors.response_rate}
//                       </p>
//                     )}

//                     <p className="text-gray-500 text-xs mb-3">
//                       Enter a value between 0 and 100
//                     </p>
//                   </div>

//                   {/* Total Students */}
//                   <div>
//                     <label className={labelClass}>
//                       Total Students
//                     </label>

//                     <input
//                       type="number"
//                       min="0"
//                       value={formData.total_students}
//                       onChange={(e) =>
//                         updateField(
//                           "total_students",
//                           e.target.value
//                         )
//                       }
//                       className={inputClass}
//                       placeholder="0"
//                     />
//                   </div>
//                 </div>

//                 {/* Rating + Reviews */}
//                 <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
//                   {/* Rating */}
//                   <div>
//                     <label className={labelClass}>
//                       Rating
//                     </label>

//                     <input
//                       type="number"
//                       min="0"
//                       max="5"
//                       step="0.1"
//                       value={formData.rating}
//                       onChange={(e) =>
//                         updateField(
//                           "rating",
//                           e.target.value
//                         )
//                       }
//                       className={inputClass}
//                       placeholder="0"
//                     />
//                   </div>

//                   {/* Reviews */}
//                   <div>
//                     <label className={labelClass}>
//                       Reviews
//                     </label>

//                     <input
//                       type="number"
//                       min="0"
//                       value={formData.total_reviews}
//                       onChange={(e) =>
//                         updateField(
//                           "total_reviews",
//                           e.target.value
//                         )
//                       }
//                       className={inputClass}
//                       placeholder="0"
//                     />
//                   </div>
//                 </div>

//                 {/* Category + Subcategory */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {/* Category */}
//                   <div>
//                     <label className={labelClass}>
//                       Category
//                     </label>

//                     <select
//                       value={formData.category_id || ""}
//                       onChange={(e) => {
//                         setFormData((prev) => ({
//                           ...prev,
//                           category_id: e.target.value,
//                           subcategory_id: "",
//                         }));
//                       }}
//                       className={selectClass}
//                     >
//                       <option value="">
//                         Select Category
//                       </option>

//                       {categories.map((cat) => (
//                         <option
//                           key={cat.id}
//                           value={cat.id}
//                         >
//                           {cat.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   {/* Subcategory */}
//                   <div>
//                     <label className={labelClass}>
//                       Subcategory
//                     </label>

//                     <select
//                       value={
//                         formData.subcategory_id || ""
//                       }
//                       onChange={(e) =>
//                         updateField(
//                           "subcategory_id",
//                           e.target.value
//                         )
//                       }
//                       disabled={!formData.category_id}
//                       className={`${selectClass} disabled:opacity-50`}
//                     >
//                       <option value="">
//                         Select Subcategory
//                       </option>

//                       {subcategories
//                         .filter(
//                           (sub) =>
//                             String(sub.category_id) ===
//                             String(formData.category_id)
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

//                 {/* Profile Image */}
//                 <div>
//                   <label className={labelClass}>
//                     Profile Image
//                   </label>

//                   {editingTrainer?.profile_image && (
//                     <img
//                       src={getImageUrl(
//                         editingTrainer.profile_image
//                       )}
//                       alt="Current"
//                       className="w-20 h-20 object-cover rounded-xl mb-2 border border-[#333]"
//                     />
//                   )}

//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) =>
//                       updateField(
//                         "profile_image",
//                         e.target.files?.[0] || null
//                       )
//                     }
//                     className="w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-500/20 file:text-purple-300 hover:file:bg-purple-500/30"
//                   />
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
//                     {editingTrainer
//                       ? "Update Trainer"
//                       : "Create Trainer"}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* =====================================================
//           DELETE CONFIRMATION MODAL
//       ====================================================== */}

//       {showDeleteModal && (
//         <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50">
//           <div className="w-full max-w-[400px] bg-[#1e1b2e] border border-[#2e2a42] rounded-2xl shadow-2xl overflow-hidden">
//             <div className="p-8 flex flex-col items-center">
//               <div className="w-14 h-14 rounded-full bg-red-500/15 flex items-center justify-center mb-5">
//                 <FaTrash className="text-red-400 text-lg" />
//               </div>

//               <h2 className="text-xl font-bold text-white mb-3 text-center">
//                 Delete Trainer
//               </h2>

//               <p className="text-white text-center text-sm leading-relaxed mb-8">
//                 Are you sure you want to delete this
//                 trainer?
//               </p>

//               <div className="flex gap-3 w-full">
//                 <button
//                   onClick={() => {
//                     setShowDeleteModal(false);
//                     setTrainerToDelete(null);
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

export default function InstituteTrainers() {
  // =========================================================
  // STATE
  // =========================================================

  const [trainers, setTrainers] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [editingTrainer, setEditingTrainer] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [trainerToDelete, setTrainerToDelete] = useState(null);

  // ALL categories from backend
  const [allCategories, setAllCategories] = useState([]);

  // ONLY categories selected by this institute
  const [categories, setCategories] = useState([]);

  // All subcategories belonging to allowed categories
  const [subcategories, setSubcategories] = useState([]);

  const [instituteProfile, setInstituteProfile] = useState(null);

  const [dropdownLoading, setDropdownLoading] = useState(true);

  const [errors, setErrors] = useState({});

  // =========================================================
  // EMPTY FORM
  // =========================================================

  const emptyForm = {
    full_name: "",
    email: "",
    phone_number: "",
    bio: "",
    experience_years: "",
    specialty: "",
    languages: "",
    skills: "",
    rating: "",
    total_reviews: "",
    certifications: "",
    response_rate: "",
    total_students: "",
    category_id: "",
    subcategory_id: "",
    profile_image: null,
  };

  const [formData, setFormData] = useState(emptyForm);

  // =========================================================
  // AUTH TOKEN
  // =========================================================

  const token =
    localStorage.getItem("token") ||
    localStorage.getItem("instituteToken") ||
    "";

  const totalColumns = 16;

  // =========================================================
  // EMAIL VALIDATION
  // =========================================================

  const validateEmail = (email) => {
    const value = String(email || "").trim();

    if (!value) {
      return "Email is required";
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!emailRegex.test(value)) {
      return "Please enter a valid email address";
    }

    return "";
  };

  // =========================================================
  // PHONE VALIDATION
  // =========================================================

  const validatePhone = (phone) => {
    const value = String(phone || "").trim();

    if (!value) {
      return "Phone number is required";
    }

    if (!/^\d+$/.test(value)) {
      return "Phone number must contain only digits";
    }

    if (value.length !== 10) {
      return "Phone number must be exactly 10 digits";
    }

    if (!/^[6-9]/.test(value)) {
      return "Phone number must start with 6, 7, 8, or 9";
    }

    return "";
  };

  // =========================================================
  // RESPONSE RATE VALIDATION
  // =========================================================

  const validateResponseRate = (rate) => {
    const value = String(rate ?? "").trim();

    if (value === "") {
      return "";
    }

    if (!/^\d+(\.\d{1,2})?$/.test(value)) {
      return "Response rate must contain only numbers";
    }

    const numericValue = Number(value);

    if (Number.isNaN(numericValue)) {
      return "Please enter a valid response rate";
    }

    if (numericValue < 0 || numericValue > 100) {
      return "Response rate must be between 0 and 100";
    }

    return "";
  };

  // =========================================================
  // FORM VALIDATION
  // =========================================================

  const validateForm = () => {
    const newErrors = {};

    const emailError = validateEmail(formData.email);

    const phoneError = validatePhone(
      formData.phone_number
    );

    const responseRateError =
      validateResponseRate(formData.response_rate);

    if (!String(formData.full_name || "").trim()) {
      newErrors.full_name = "Full name is required";
    }

    if (emailError) {
      newErrors.email = emailError;
    }

    if (phoneError) {
      newErrors.phone_number = phoneError;
    }

    if (responseRateError) {
      newErrors.response_rate = responseRateError;
    }

    if (!formData.category_id) {
      newErrors.category_id =
        "Please select a category";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // =========================================================
  // RESPONSE RATE FORMAT
  // =========================================================

  const formatResponseRate = (value) => {
    if (
      value === null ||
      value === undefined ||
      value === ""
    ) {
      return "-";
    }

    const stringValue = String(value);

    if (stringValue.endsWith("%")) {
      return stringValue;
    }

    return `${stringValue}%`;
  };

  // =========================================================
  // IMAGE URL
  // =========================================================

  const getImageUrl = (img) => {
    if (!img) return "";

    if (
      img.startsWith("http://") ||
      img.startsWith("https://")
    ) {
      return img;
    }

    return `https://finearts-backend.onrender.com${img}`;
  };

  // =========================================================
  // STATUS BADGE
  // =========================================================

  const StatusBadge = ({ status }) => {
    const s = status?.toLowerCase();

    let bg = "bg-gray-500/20";
    let text = "text-white";

    if (s === "approved") {
      bg = "bg-green-500/20";
      text = "text-green-400";
    } else if (s === "pending") {
      bg = "bg-yellow-500/20";
      text = "text-yellow-400";
    } else if (s === "rejected") {
      bg = "bg-red-500/20";
      text = "text-red-400";
    }

    return (
      <span
        className={`px-2.5 py-1 rounded-full text-xs font-semibold ${bg} ${text}`}
      >
        {status || "N/A"}
      </span>
    );
  };

  // =========================================================
  // FETCH TRAINERS
  // =========================================================

  const fetchTrainers = async () => {
    try {
      const res = await getInstituteTrainers(token);

      console.log(
        "TRAINERS API RESPONSE:",
        res
      );

      setTrainers(res.data || []);
    } catch (error) {
      console.error(
        "FETCH TRAINERS ERROR:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to load trainers"
      );
    }
  };

  // =========================================================
  // FETCH INSTITUTE PROFILE
  //
  // IMPORTANT:
  // This gets the categories selected by THIS institute.
  // =========================================================

  const fetchInstituteProfile = async () => {
    try {
      const response = await API.get(
        "/institutes/profile",
        {
          params: {
            _t: Date.now(),
          },
        }
      );

      console.log(
        "INSTITUTE PROFILE RESPONSE:",
        response.data
      );

      const profile =
        response?.data?.data ||
        response?.data ||
        null;

      setInstituteProfile(profile);

      return profile;
    } catch (error) {
      console.error(
        "FETCH INSTITUTE PROFILE ERROR:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to load institute profile"
      );

      return null;
    }
  };

  // =========================================================
  // EXTRACT INSTITUTE CATEGORY IDS
  // =========================================================

  const extractInstituteCategoryIds = (
    profile
  ) => {
    const profileCategories =
      Array.isArray(profile?.categories)
        ? profile.categories
        : [];

    const ids = profileCategories
      .map((item) => {
        if (
          typeof item === "number" ||
          typeof item === "string"
        ) {
          return Number(item);
        }

        return Number(
          item?.category_id ??
            item?.id ??
            item?.category?.id
        );
      })
      .filter(
        (id) => Number.isFinite(id) && id > 0
      );

    return [...new Set(ids)];
  };

  // =========================================================
  // FETCH CATEGORIES FOR THIS INSTITUTE
  // =========================================================

  const fetchDropdowns = async () => {
    try {
      setDropdownLoading(true);

      // -----------------------------------------------------
      // 1. FIRST GET CURRENT INSTITUTE PROFILE
      // -----------------------------------------------------

      const profile =
        await fetchInstituteProfile();

      if (!profile) {
        setCategories([]);
        setSubcategories([]);
        return;
      }

      // -----------------------------------------------------
      // 2. GET ALL CATEGORIES + ALL SUBCATEGORIES
      // -----------------------------------------------------

      const [catRes, subRes] =
        await Promise.all([
          API.get("/categories"),
          API.get("/subcategories"),
        ]);

      console.log(
        "ALL CATEGORIES RESPONSE:",
        catRes.data
      );

      console.log(
        "ALL SUBCATEGORIES RESPONSE:",
        subRes.data
      );

      // -----------------------------------------------------
      // 3. NORMALIZE ALL CATEGORIES
      // -----------------------------------------------------

      const categoryData = Array.isArray(
        catRes?.data?.data
      )
        ? catRes.data.data
        : Array.isArray(catRes?.data)
        ? catRes.data
        : [];

      setAllCategories(categoryData);

      // -----------------------------------------------------
      // 4. GET INSTITUTE'S SELECTED CATEGORY IDS
      // -----------------------------------------------------

      const instituteCategoryIds =
        extractInstituteCategoryIds(profile);

      console.log(
        "================================="
      );

      console.log(
        "INSTITUTE CATEGORY IDS:",
        instituteCategoryIds
      );

      console.log(
        "================================="
      );

      // -----------------------------------------------------
      // 5. FILTER GLOBAL CATEGORIES
      //
      // ONLY categories selected by institute
      // will appear.
      // -----------------------------------------------------

      const allowedCategories =
        categoryData.filter((category) =>
          instituteCategoryIds.includes(
            Number(category.id)
          )
        );

      console.log(
        "ALLOWED INSTITUTE CATEGORIES:",
        allowedCategories
      );

      setCategories(
        allowedCategories
      );

      // -----------------------------------------------------
      // 6. NORMALIZE SUBCATEGORIES
      // -----------------------------------------------------

      const subcategoryData =
        Array.isArray(
          subRes?.data?.data
        )
          ? subRes.data.data
          : Array.isArray(subRes?.data)
          ? subRes.data
          : [];

      // -----------------------------------------------------
      // 7. ONLY SUBCATEGORIES OF ALLOWED CATEGORIES
      // -----------------------------------------------------

      const allowedSubcategories =
        subcategoryData.filter((sub) =>
          instituteCategoryIds.includes(
            Number(sub.category_id)
          )
        );

      console.log(
        "ALLOWED INSTITUTE SUBCATEGORIES:",
        allowedSubcategories
      );

      setSubcategories(
        allowedSubcategories
      );
    } catch (error) {
      console.error(
        "FETCH DROPDOWNS ERROR:",
        error
      );

      setCategories([]);
      setSubcategories([]);

      toast.error(
        error?.response?.data?.message ||
          "Failed to load categories"
      );
    } finally {
      setDropdownLoading(false);
    }
  };

  // =========================================================
  // INITIAL LOAD
  // =========================================================

  useEffect(() => {
    fetchTrainers();
    fetchDropdowns();
  }, []);

  // =========================================================
  // CREATE
  // =========================================================

  const handleCreate = () => {
    setEditingTrainer(null);

    setFormData({
      ...emptyForm,
    });

    setErrors({});

    setShowModal(true);
  };

  // =========================================================
  // EDIT
  // =========================================================

  const handleEdit = (trainer) => {
    setEditingTrainer(trainer);

    setFormData({
      ...emptyForm,
      ...trainer,

      email: trainer.email || "",

      phone_number:
        trainer.phone_number || "",

      response_rate:
        trainer.response_rate !== null &&
        trainer.response_rate !== undefined
          ? String(
              trainer.response_rate
            ).replace("%", "")
          : "",

      rating: trainer.rating || "",

      total_reviews:
        trainer.total_reviews || "",

      category_id:
        trainer.category_id
          ? String(trainer.category_id)
          : "",

      subcategory_id:
        trainer.subcategory_id
          ? String(
              trainer.subcategory_id
            )
          : "",

      profile_image: null,
    });

    setErrors({});

    setShowModal(true);
  };

  // =========================================================
  // DELETE
  // =========================================================

  const handleDeleteClick = (trainer) => {
    setTrainerToDelete(trainer);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!trainerToDelete) return;

    try {
      await deleteInstituteTrainer(
        trainerToDelete.id,
        token
      );

      toast.success(
        "Trainer deleted"
      );

      await fetchTrainers();

      setShowDeleteModal(false);

      setTrainerToDelete(null);
    } catch (error) {
      console.error(
        "DELETE TRAINER ERROR:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Delete failed"
      );
    }
  };

  // =========================================================
  // CLOSE MODAL
  // =========================================================

  const closeModal = () => {
    setShowModal(false);

    setEditingTrainer(null);

    setErrors({});
  };

  // =========================================================
  // UPDATE FIELD
  // =========================================================

  const updateField = (
    field,
    value
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  // =========================================================
  // EMAIL CHANGE
  // =========================================================

  const handleEmailChange = (e) => {
    const value =
      e.target.value;

    updateField(
      "email",
      value
    );

    if (value.trim()) {
      const error =
        validateEmail(value);

      setErrors((prev) => ({
        ...prev,
        email: error,
      }));
    }
  };

  // =========================================================
  // PHONE CHANGE
  // =========================================================

  const handlePhoneChange = (e) => {
    let value =
      e.target.value.replace(
        /\D/g,
        ""
      );

    value = value.slice(
      0,
      10
    );

    updateField(
      "phone_number",
      value
    );

    if (!value) {
      setErrors((prev) => ({
        ...prev,
        phone_number:
          "Phone number is required",
      }));

      return;
    }

    if (value.length < 10) {
      setErrors((prev) => ({
        ...prev,
        phone_number:
          "Phone number must be exactly 10 digits",
      }));

      return;
    }

    const error =
      validatePhone(value);

    setErrors((prev) => ({
      ...prev,
      phone_number: error,
    }));
  };

  // =========================================================
  // RESPONSE RATE CHANGE
  // =========================================================

  const handleResponseRateChange = (
    e
  ) => {
    let value =
      e.target.value;

    // Only numbers and decimal point
    value = value.replace(
      /[^\d.]/g,
      ""
    );

    // Keep only first decimal point
    const firstDot =
      value.indexOf(".");

    if (firstDot !== -1) {
      value =
        value.slice(
          0,
          firstDot + 1
        ) +
        value
          .slice(firstDot + 1)
          .replace(/\./g, "");
    }

    // Maximum 2 decimal places
    if (value.includes(".")) {
      const [
        whole,
        decimal,
      ] = value.split(".");

      value = `${whole}.${decimal.slice(
        0,
        2
      )}`;
    }

    // Maximum 100
    if (
      value !== "" &&
      Number(value) > 100
    ) {
      value = "100";
    }

    updateField(
      "response_rate",
      value
    );

    const error =
      validateResponseRate(
        value
      );

    setErrors((prev) => ({
      ...prev,
      response_rate: error,
    }));
  };

  // =========================================================
  // CATEGORY CHANGE
  // =========================================================

  const handleCategoryChange = (
    e
  ) => {
    const categoryId =
      e.target.value;

    setFormData((prev) => ({
      ...prev,
      category_id:
        categoryId,
      subcategory_id: "",
    }));

    setErrors((prev) => ({
      ...prev,
      category_id: "",
      subcategory_id: "",
    }));
  };

  // =========================================================
  // SUBCATEGORY CHANGE
  // =========================================================

  const handleSubcategoryChange = (
    e
  ) => {
    updateField(
      "subcategory_id",
      e.target.value
    );
  };

  // =========================================================
  // SUBMIT
  // =========================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error(
        "Please correct the highlighted fields"
      );

      return;
    }

    try {
      const fd =
        new FormData();

      Object.entries(
        formData
      ).forEach(
        ([key, value]) => {
          if (
            value !== null &&
            value !== undefined &&
            value !== ""
          ) {
            fd.append(
              key,
              value
            );
          }
        }
      );

      console.log(
        "TRAINER FORM DATA:",
        formData
      );

      if (editingTrainer) {
        await updateInstituteTrainer(
          editingTrainer.id,
          fd,
          token
        );

        toast.success(
          "Trainer updated successfully"
        );
      } else {
        await createInstituteTrainer(
          fd,
          token
        );

        toast.success(
          "Trainer created successfully"
        );
      }

      closeModal();

      await fetchTrainers();
    } catch (error) {
      console.error(
        "TRAINER OPERATION ERROR:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Operation failed"
      );
    }
  };

  // =========================================================
  // FILTER TRAINERS
  // =========================================================

  const filteredTrainers =
    trainers.filter((trainer) => {
      const query =
        searchQuery
          .trim()
          .toLowerCase();

      if (!query) {
        return true;
      }

      return (
        trainer.full_name
          ?.toLowerCase()
          .includes(query) ||
        trainer.email
          ?.toLowerCase()
          .includes(query) ||
        trainer.specialty
          ?.toLowerCase()
          .includes(query) ||
        trainer.bio
          ?.toLowerCase()
          .includes(query) ||
        trainer.phone_number?.includes(
          query
        ) ||
        trainer.languages
          ?.toLowerCase()
          .includes(query) ||
        trainer.skills
          ?.toLowerCase()
          .includes(query) ||
        String(
          trainer.rating ?? ""
        ).includes(query) ||
        String(
          trainer.total_reviews ?? ""
        ).includes(query) ||
        trainer.certifications
          ?.toLowerCase()
          .includes(query) ||
        String(
          trainer.response_rate ?? ""
        )
          .toLowerCase()
          .includes(query) ||
        trainer.categories
          ?.toLowerCase()
          .includes(query) ||
        trainer.subcategories
          ?.toLowerCase()
          .includes(query) ||
        trainer.approval_status
          ?.toLowerCase()
          .includes(query) ||
        String(
          trainer.id
        ).includes(query) ||
        String(
          trainer.experience_years ?? ""
        ).includes(query)
      );
    });

  // =========================================================
  // CURRENT SUBCATEGORIES
  // =========================================================

  const currentSubcategories =
    subcategories.filter(
      (sub) =>
        String(
          sub.category_id
        ) ===
        String(
          formData.category_id
        )
    );

  // =========================================================
  // JSX
  // =========================================================

  return (
    <div className="p-8 text-white">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">

        <div>
          <h1 className="text-4xl font-bold text-purple-400">
            Institute Trainers
          </h1>

          <p className="text-white mt-2">
            Manage Institute Trainers
          </p>
        </div>

        <button
          onClick={handleCreate}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition-opacity"
        >
          + Add Trainer
        </button>
      </div>

      {/* =====================================================
          SEARCH
      ===================================================== */}

      <div className="mb-6">
        <div className="relative w-full">

          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white pointer-events-none"
            size={18}
          />

          <input
            type="text"
            placeholder="Search trainers..."
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

      {/* =====================================================
          TABLE
      ===================================================== */}

      <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-[#202027] text-white">

              <tr>

                <th className="p-4 text-left whitespace-nowrap">
                  Image
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Name
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Email
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Bio
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Experience
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Phone
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Languages
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Certifications
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Response Rate
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Category
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Subcategory
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Students
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Rating
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Reviews
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Status
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredTrainers.length === 0 ? (

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
                          ? "No trainers found matching your search"
                          : "No trainers available"}
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

                filteredTrainers.map(
                  (trainer) => (

                    <tr
                      key={trainer.id}
                      className="border-t border-[#2c2c35] hover:bg-[#1a1a20] transition-colors"
                    >

                      {/* IMAGE */}

                      <td className="p-4">

                        {trainer.profile_image ? (

                          <img
                            src={getImageUrl(
                              trainer.profile_image
                            )}
                            alt={
                              trainer.full_name
                            }
                            className="w-11 h-11 rounded-xl object-cover border border-[#333]"
                            onError={(e) => {
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

                      {/* NAME */}

                      <td className="p-4 font-medium whitespace-nowrap">
                        {trainer.full_name}
                      </td>

                      {/* EMAIL */}

                      <td className="p-4 text-white whitespace-nowrap">
                        {trainer.email || "-"}
                      </td>

                      {/* BIO */}

                      <td className="p-4 text-white max-w-[130px] truncate">
                        {trainer.bio || "-"}
                      </td>

                      {/* EXPERIENCE */}

                      <td className="p-4 text-white whitespace-nowrap">
                        {trainer.experience_years
                          ? `${trainer.experience_years} yrs`
                          : "-"}
                      </td>

                      {/* PHONE */}

                      <td className="p-4 text-white whitespace-nowrap">
                        {trainer.phone_number || "-"}
                      </td>

                      {/* LANGUAGES */}

                      <td className="p-4 text-white whitespace-nowrap">
                        {trainer.languages || "-"}
                      </td>

                      {/* CERTIFICATIONS */}

                      <td className="p-4 text-white max-w-[140px] truncate">
                        {trainer.certifications || "-"}
                      </td>

                      {/* RESPONSE RATE */}

                      <td className="p-4 whitespace-nowrap">
                        {formatResponseRate(
                          trainer.response_rate
                        )}
                      </td>

                      {/* CATEGORY */}

                      <td className="p-4 text-white whitespace-nowrap">
                        {trainer.categories || "-"}
                      </td>

                      {/* SUBCATEGORY */}

                      <td className="p-4 text-white whitespace-nowrap">
                        {trainer.subcategories || "-"}
                      </td>

                      {/* STUDENTS */}

                      <td className="p-4 font-semibold whitespace-nowrap">
                        {trainer.total_students ?? 0}
                      </td>

                      {/* RATING */}

                      <td className="p-4 font-semibold whitespace-nowrap">
                        {trainer.rating
                          ? Math.round(
                              Number(
                                trainer.rating
                              )
                            )
                          : "-"}
                      </td>

                      {/* REVIEWS */}

                      <td className="p-4 font-semibold whitespace-nowrap">
                        {trainer.total_reviews ?? "-"}
                      </td>

                      {/* STATUS */}

                      <td className="p-4 whitespace-nowrap">
                        <StatusBadge
                          status={
                            trainer.approval_status
                          }
                        />
                      </td>

                      {/* ACTIONS */}

                      <td className="p-4">

                        <div className="flex items-center gap-2">

                          <button
                            onClick={() =>
                              handleEdit(
                                trainer
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
                              handleDeleteClick(
                                trainer
                              )
                            }
                            className="p-2 rounded-lg hover:bg-red-500/10 transition-colors group"
                            title="Delete"
                          >
                            <Trash2
                              size={16}
                              className="text-red-500/70 group-hover:text-red-400"
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

      {/* =====================================================
          ADD / EDIT MODAL
      ===================================================== */}

      {showModal && (

        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">

          <div className="w-full max-w-[650px] max-h-[90vh] bg-[#211c30] rounded-2xl overflow-hidden shadow-2xl">

            {/* HEADER */}

            <div className="flex justify-between items-center p-6 border-b border-[#3a3448]">

              <h2 className="text-2xl font-bold text-white">
                {editingTrainer
                  ? "Edit Trainer"
                  : "Add Trainer"}
              </h2>

              <button
                onClick={closeModal}
                className="text-white hover:text-purple-400"
              >
                <FaTimes size={20} />
              </button>

            </div>

            {/* BODY */}

            <div className="overflow-y-auto max-h-[75vh] p-6">

              <form
                onSubmit={handleSubmit}
                className="space-y-1"
                noValidate
              >

                {/* FULL NAME + EMAIL */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  {/* FULL NAME */}

                  <div>

                    <label className={labelClass}>
                      Full Name
                    </label>

                    <input
                      type="text"
                      value={
                        formData.full_name
                      }
                      onChange={(e) =>
                        updateField(
                          "full_name",
                          e.target.value
                        )
                      }
                      className={`${inputClass} ${
                        errors.full_name
                          ? "border border-red-500"
                          : ""
                      }`}
                      placeholder="Enter full name"
                    />

                    {errors.full_name && (
                      <p className={errorClass}>
                        {errors.full_name}
                      </p>
                    )}

                  </div>

                  {/* EMAIL */}

                  <div>

                    <label className={labelClass}>
                      Email
                    </label>

                    <input
                      type="email"
                      value={
                        formData.email
                      }
                      onChange={
                        handleEmailChange
                      }
                      onBlur={() =>
                        setErrors(
                          (prev) => ({
                            ...prev,
                            email:
                              validateEmail(
                                formData.email
                              ),
                          })
                        )
                      }
                      className={`${inputClass} ${
                        errors.email
                          ? "border border-red-500"
                          : ""
                      }`}
                      placeholder="Enter email"
                      autoComplete="email"
                    />

                    {errors.email && (
                      <p className={errorClass}>
                        {errors.email}
                      </p>
                    )}

                  </div>

                </div>

                {/* PHONE + EXPERIENCE */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  {/* PHONE */}

                  <div>

                    <label className={labelClass}>
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      value={
                        formData.phone_number
                      }
                      onChange={
                        handlePhoneChange
                      }
                      onBlur={() =>
                        setErrors(
                          (prev) => ({
                            ...prev,
                            phone_number:
                              validatePhone(
                                formData.phone_number
                              ),
                          })
                        )
                      }
                      className={`${inputClass} ${
                        errors.phone_number
                          ? "border border-red-500"
                          : ""
                      }`}
                      placeholder="Enter 10-digit phone number"
                      autoComplete="tel"
                    />

                    {errors.phone_number && (
                      <p className={errorClass}>
                        {errors.phone_number}
                      </p>
                    )}

                  </div>

                  {/* EXPERIENCE */}

                  <div>

                    <label className={labelClass}>
                      Experience Years
                    </label>

                    <input
                      type="number"
                      min="0"
                      value={
                        formData.experience_years
                      }
                      onChange={(e) =>
                        updateField(
                          "experience_years",
                          e.target.value
                        )
                      }
                      className={inputClass}
                      placeholder="0"
                    />

                  </div>

                </div>

                {/* BIO */}

                <div>

                  <label className={labelClass}>
                    Bio
                  </label>

                  <textarea
                    value={formData.bio}
                    onChange={(e) =>
                      updateField(
                        "bio",
                        e.target.value
                      )
                    }
                    rows="3"
                    className={inputClass}
                    placeholder="Enter bio"
                  />

                </div>

                {/* LANGUAGES */}

                <div>

                  <label className={labelClass}>
                    Languages
                  </label>

                  <input
                    type="text"
                    value={
                      formData.languages
                    }
                    onChange={(e) =>
                      updateField(
                        "languages",
                        e.target.value
                      )
                    }
                    className={inputClass}
                    placeholder="e.g. English, Hindi"
                  />

                </div>

                {/* SKILLS */}

                <div>

                  <label className={labelClass}>
                    Skills
                  </label>

                  <input
                    type="text"
                    value={
                      formData.skills
                    }
                    onChange={(e) =>
                      updateField(
                        "skills",
                        e.target.value
                      )
                    }
                    className={inputClass}
                    placeholder="Enter skills"
                  />

                </div>

                {/* CERTIFICATIONS */}

                <div>

                  <label className={labelClass}>
                    Certifications
                  </label>

                  <textarea
                    value={
                      formData.certifications
                    }
                    onChange={(e) =>
                      updateField(
                        "certifications",
                        e.target.value
                      )
                    }
                    rows="3"
                    className={inputClass}
                    placeholder="Enter certifications"
                  />

                </div>

                {/* RESPONSE RATE + STUDENTS */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  {/* RESPONSE RATE */}

                  <div>

                    <label className={labelClass}>
                      Response Rate
                    </label>

                    <input
                      type="text"
                      inputMode="decimal"
                      value={
                        formData.response_rate
                      }
                      onChange={
                        handleResponseRateChange
                      }
                      onBlur={() =>
                        setErrors(
                          (prev) => ({
                            ...prev,
                            response_rate:
                              validateResponseRate(
                                formData.response_rate
                              ),
                          })
                        )
                      }
                      className={`${inputClass} ${
                        errors.response_rate
                          ? "border border-red-500"
                          : ""
                      }`}
                      placeholder="0 - 100"
                    />

                    {errors.response_rate && (
                      <p className={errorClass}>
                        {
                          errors.response_rate
                        }
                      </p>
                    )}

                    <p className="text-gray-500 text-xs mb-3">
                      Enter a value between 0 and
                      100
                    </p>

                  </div>

                  {/* STUDENTS */}

                  <div>

                    <label className={labelClass}>
                      Total Students
                    </label>

                    <input
                      type="number"
                      min="0"
                      value={
                        formData.total_students
                      }
                      onChange={(e) =>
                        updateField(
                          "total_students",
                          e.target.value
                        )
                      }
                      className={inputClass}
                      placeholder="0"
                    />

                  </div>

                </div>

                {/* RATING + REVIEWS */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  {/* RATING */}

                  <div>

                    <label className={labelClass}>
                      Rating
                    </label>

                    <input
                      type="number"
                      min="0"
                      max="5"
                      step="0.1"
                      value={
                        formData.rating
                      }
                      onChange={(e) =>
                        updateField(
                          "rating",
                          e.target.value
                        )
                      }
                      className={inputClass}
                      placeholder="0"
                    />

                  </div>

                  {/* REVIEWS */}

                  <div>

                    <label className={labelClass}>
                      Reviews
                    </label>

                    <input
                      type="number"
                      min="0"
                      value={
                        formData.total_reviews
                      }
                      onChange={(e) =>
                        updateField(
                          "total_reviews",
                          e.target.value
                        )
                      }
                      className={inputClass}
                      placeholder="0"
                    />

                  </div>

                </div>

                {/* =================================================
                    CATEGORY + SUBCATEGORY

                    ONLY INSTITUTE CATEGORIES
                ================================================= */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  {/* CATEGORY */}

                  <div>

                    <label className={labelClass}>
                      Category
                    </label>

                    <select
                      value={
                        formData.category_id ||
                        ""
                      }
                      onChange={
                        handleCategoryChange
                      }
                      disabled={
                        dropdownLoading ||
                        categories.length === 0
                      }
                      className={`${selectClass} ${
                        errors.category_id
                          ? "border border-red-500"
                          : ""
                      } disabled:opacity-50`}
                    >

                      <option value="">
                        {dropdownLoading
                          ? "Loading Categories..."
                          : categories.length ===
                            0
                          ? "No Categories Available"
                          : "Select Category"}
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

                    {errors.category_id && (
                      <p className={errorClass}>
                        {
                          errors.category_id
                        }
                      </p>
                    )}

                  </div>

                  {/* SUBCATEGORY */}

                  <div>

                    <label className={labelClass}>
                      Subcategory
                    </label>

                    <select
                      value={
                        formData.subcategory_id ||
                        ""
                      }
                      onChange={
                        handleSubcategoryChange
                      }
                      disabled={
                        !formData.category_id ||
                        dropdownLoading
                      }
                      className={`${selectClass} disabled:opacity-50`}
                    >

                      <option value="">
                        Select Subcategory
                      </option>

                      {currentSubcategories.map(
                        (sub) => (
                          <option
                            key={sub.id}
                            value={sub.id}
                          >
                            {sub.name}
                          </option>
                        )
                      )}

                    </select>

                  </div>

                </div>

                {/* =================================================
                    PROFILE IMAGE
                ================================================= */}

                <div>

                  <label className={labelClass}>
                    Profile Image
                  </label>

                  {editingTrainer?.profile_image && (
                    <img
                      src={getImageUrl(
                        editingTrainer.profile_image
                      )}
                      alt="Current"
                      className="w-20 h-20 object-cover rounded-xl mb-2 border border-[#333]"
                    />
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      updateField(
                        "profile_image",
                        e.target.files?.[0] ||
                          null
                      )
                    }
                    className="w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-500/20 file:text-purple-300"
                  />

                </div>

                {/* =================================================
                    BUTTONS
                ================================================= */}

                <div className="flex justify-end gap-3 pt-4 border-t border-[#3a3448]">

                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-5 py-3 rounded-xl border border-gray-600 text-gray-300 hover:bg-[#2b2638]"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90"
                  >
                    {editingTrainer
                      ? "Update Trainer"
                      : "Create Trainer"}
                  </button>

                </div>

              </form>

            </div>

          </div>

        </div>
      )}

      {/* =====================================================
          DELETE MODAL
      ===================================================== */}

      {showDeleteModal && (

        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50">

          <div className="w-full max-w-[400px] bg-[#1e1b2e] border border-[#2e2a42] rounded-2xl shadow-2xl overflow-hidden">

            <div className="p-8 flex flex-col items-center">

              <div className="w-14 h-14 rounded-full bg-red-500/15 flex items-center justify-center mb-5">

                <FaTrash className="text-red-400 text-lg" />

              </div>

              <h2 className="text-xl font-bold text-white mb-3 text-center">
                Delete Trainer
              </h2>

              <p className="text-white text-center text-sm leading-relaxed mb-8">
                Are you sure you want to delete
                this trainer?
              </p>

              <div className="flex gap-3 w-full">

                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setTrainerToDelete(null);
                  }}
                  className="flex-1 px-5 py-3 rounded-xl border border-[#3a3650] text-gray-300 hover:bg-[#2a2640]"
                >
                  Cancel
                </button>

                <button
                  onClick={confirmDelete}
                  className="flex-1 px-5 py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold hover:opacity-90"
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