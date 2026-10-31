

// import { useEffect, useState } from "react";

// import toast from "react-hot-toast";

// import { useLocation } from "react-router-dom";

// import { Edit, Trash2, Search } from "lucide-react";

// import { FaTrash, FaTimes, FaCheck, FaBan } from "react-icons/fa";

// import API from "../services/api";

// import {

//   getAdminTrainers,

//   createAdminTrainer,

//   updateAdminTrainer,

//   deleteAdminTrainer,

//   getPendingTrainers,

//   getRejectedTrainers,

// } from "../services/trainerService";

// /* =========================================================

//    STYLES

// ========================================================= */

// const inputClass =

//   "w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors";

// const selectClass =

//   "w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors";

// const labelClass = "block text-sm text-gray-400 mb-1";

// /* =========================================================

//    COMPONENT

// ========================================================= */

// export default function Trainers() {

//   const [trainers, setTrainers] = useState([]);

//   const [searchQuery, setSearchQuery] = useState("");

//   const [showModal, setShowModal] = useState(false);

//   const [editingTrainer, setEditingTrainer] = useState(null);

//   const [showDeleteModal, setShowDeleteModal] = useState(false);

//   const [trainerToDelete, setTrainerToDelete] = useState(null);

//   const [categories, setCategories] = useState([]);

//   const [subcategories, setSubcategories] = useState([]);

//   /* =========================================================

//      FORM DATA

//   ========================================================= */

//   const [formData, setFormData] = useState({

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

//     total_students: "",

//     category_id: "",

//     subcategory_id: "",

//     profile_image: null,

//   });

//   const token = localStorage.getItem("adminToken");

//   const location = useLocation();

//   /* =========================================================

//      FILTERED TRAINERS

//   ========================================================= */

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

//       t.categories?.toLowerCase().includes(query) ||

//       t.subcategories?.toLowerCase().includes(query) ||

//       t.approval_status?.toLowerCase().includes(query) ||

//       String(t.id ?? "").includes(query) ||

//       String(t.experience_years ?? "").includes(query)

//     );

//   });

//   /* =========================================================

//      IMAGE HELPER

//   ========================================================= */

//   const getImageUrl = (img) => {

//     if (!img) return "";

//     if (img.startsWith("http")) {

//       return img;

//     }

//     // return `https://finearts-backend.onrender.com${img}`;
//     return `http://localhost:5000${img}`;

//   };

//   /* =========================================================

//      STATUS BADGE

//   ========================================================= */

//   const StatusBadge = ({ status }) => {

//     const s = status?.toLowerCase();

//     let bg = "bg-gray-500/20";

//     let text = "text-gray-400";

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

//   /* =========================================================

//      FETCH TRAINERS

//   ========================================================= */

//   const fetchTrainers = async () => {

//     try {

//       let res;

//       if (location.pathname === "/trainers/pending") {

//         res = await getPendingTrainers(token);

//       } else if (location.pathname === "/trainers/rejected") {

//         res = await getRejectedTrainers(token);

//       } else {

//         res = await getAdminTrainers(token);

//       }

//       setTrainers(res.data?.data || []);

//     } catch (e) {

//       toast.error(

//         e.response?.data?.message || "Failed to load trainers"

//       );

//     }

//   };

//   /* =========================================================

//      FETCH CATEGORIES / SUBCATEGORIES

//   ========================================================= */

//   const fetchDropdowns = async () => {

//     try {

//       const [catRes, subRes] = await Promise.all([

//         API.get("/categories"),

//         API.get("/subcategories"),

//       ]);

//       setCategories(catRes.data.data || []);

//       setSubcategories(subRes.data.data || []);

//     } catch (err) {

//       console.log(err);

//     }

//   };

//   /* =========================================================

//      INITIAL FETCH

//   ========================================================= */

//   useEffect(() => {

//     fetchTrainers();

//     fetchDropdowns();

//   }, [location.pathname]);

//   /* =========================================================

//      PAGE TITLE

//   ========================================================= */

//   const getPageTitle = () => {

//     if (location.pathname === "/trainers/pending") {

//       return "Pending Trainers";

//     }

//     if (location.pathname === "/trainers/rejected") {

//       return "Rejected Trainers";

//     }

//     return "Admin Trainers";

//   };

//   const getPageSubtitle = () => {

//     if (location.pathname === "/trainers/pending") {

//       return "Review and approve trainer applications";

//     }

//     if (location.pathname === "/trainers/rejected") {

//       return "Manage rejected trainer applications";

//     }

//     return "Manage Admin Trainers";

//   };

//   /* =========================================================

//      RESET FORM

//   ========================================================= */

//   const getEmptyForm = () => ({

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

//     total_students: "",

//     category_id: "",

//     subcategory_id: "",

//     profile_image: null,

//   });

//   /* =========================================================

//      CREATE

//   ========================================================= */

//   const handleCreate = () => {

//     setEditingTrainer(null);

//     setFormData(getEmptyForm());

//     setShowModal(true);

//   };

//   /* =========================================================

//      EDIT

//   ========================================================= */

//   const handleEdit = (trainer) => {
//     setEditingTrainer(trainer);

//     // The list API may return category/subcategory names without their IDs.
//     // Resolve the IDs from dropdown data so saved values appear in Edit.
//     const normalize = (value) =>
//       String(value ?? "").trim().toLowerCase();

//     const categoryName =
//       trainer.category_name ??
//       trainer.categoryName ??
//       trainer.category?.name ??
//       trainer.categories ??
//       trainer.category ??
//       "";

//     const matchedCategory = categories.find(
//       (cat) =>
//         normalize(cat.id) === normalize(trainer.category_id ?? trainer.categoryId) ||
//         normalize(cat.name) === normalize(categoryName)
//     );

//     const categoryId =
//       trainer.category_id ??
//       trainer.categoryId ??
//       trainer.category?.id ??
//       matchedCategory?.id ??
//       "";

//     const subcategoryName =
//       trainer.subcategory_name ??
//       trainer.subcategoryName ??
//       trainer.subcategory?.name ??
//       trainer.subcategories ??
//       trainer.subcategory ??
//       "";

//     const matchedSubcategory = subcategories.find((sub) => {
//       const sameCategory =
//         !categoryId || normalize(sub.category_id) === normalize(categoryId);
//       return (
//         sameCategory &&
//         (normalize(sub.id) === normalize(trainer.subcategory_id ?? trainer.subcategoryId) ||
//           normalize(sub.name) === normalize(subcategoryName))
//       );
//     });

//     const subcategoryId =
//       trainer.subcategory_id ??
//       trainer.subcategoryId ??
//       trainer.subcategory?.id ??
//       matchedSubcategory?.id ??
//       "";

//     setFormData({
//       full_name: trainer.full_name || "",
//       email: trainer.email || "",
//       phone_number: trainer.phone_number || "",
//       bio: trainer.bio || "",
//       experience_years: trainer.experience_years ?? "",
//       specialty: trainer.specialty || "",
//       languages: trainer.languages || "",
//       skills: trainer.skills || "",
//       rating: trainer.rating ?? "",
//       total_reviews: trainer.total_reviews ?? "",
//       certifications: trainer.certifications || "",
//       total_students: trainer.total_students ?? "",
//       category_id: String(categoryId || ""),
//       subcategory_id: String(subcategoryId || ""),
//       profile_image: null,
//     });

//     setShowModal(true);
//   };

//   const handleDeleteClick = (trainer) => {

//     setTrainerToDelete(trainer);

//     setShowDeleteModal(true);

//   };

//   const confirmDelete = async () => {

//     if (!trainerToDelete) return;

//     try {

//       await deleteAdminTrainer(trainerToDelete.id, token);

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

//   /* =========================================================

//      CLOSE MODAL

//   ========================================================= */

//   const closeModal = () => {

//     setShowModal(false);

//     setEditingTrainer(null);

//     setFormData(getEmptyForm());

//   };

//   /* =========================================================

//      DUPLICATE EMAIL / MOBILE VALIDATION

//   ========================================================= */

//   const validateUniqueContactDetails = () => {

//     const email = String(formData.email || "")

//       .trim()

//       .toLowerCase();

//     const phone = String(formData.phone_number || "")

//       .replace(/\D/g, "");

//     const duplicateEmail = trainers.some((trainer) => {

//       if (

//         editingTrainer &&

//         String(trainer.id) === String(editingTrainer.id)

//       ) {

//         return false;

//       }

//       return (

//         String(trainer.email || "")

//           .trim()

//           .toLowerCase() === email

//       );

//     });

//     const duplicatePhone = trainers.some((trainer) => {

//       if (

//         editingTrainer &&

//         String(trainer.id) === String(editingTrainer.id)

//       ) {

//         return false;

//       }

//       return (

//         String(trainer.phone_number || "")

//           .replace(/\D/g, "") === phone

//       );

//     });

//     return {

//       duplicateEmail,

//       duplicatePhone,

//     };

//   };

//   /* =========================================================

//      SUBMIT

//   ========================================================= */

//   const handleSubmit = async (e) => {

//     e.preventDefault();

//     /* -------------------------------------------------------

//        MANDATORY FIELD VALIDATION

//     ------------------------------------------------------- */

//     if (!formData.full_name?.trim()) {

//       toast.error("Name is required");

//       return;

//     }

//     if (!formData.email?.trim()) {

//       toast.error("Email is required");

//       return;

//     }

//     if (!formData.phone_number?.trim()) {

//       toast.error("Phone number is required");

//       return;

//     }

//     if (!formData.category_id) {

//       toast.error("Category is required");

//       return;

//     }

//     if (!formData.subcategory_id) {

//       toast.error("Subcategory is required");

//       return;

//     }

//     // -------------------------------------------------------

//     // DUPLICATE EMAIL / MOBILE VALIDATION

//     // -------------------------------------------------------

//     const {

//       duplicateEmail,

//       duplicatePhone,

//     } = validateUniqueContactDetails();

//     if (duplicateEmail) {

//       toast.error(

//         "A trainer with this email already exists"

//       );

//       return;

//     }

//     if (duplicatePhone) {

//       toast.error(

//         "A trainer with this mobile number already exists"

//       );

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

//         await updateAdminTrainer(

//           editingTrainer.id,

//           fd,

//           token

//         );

//         toast.success("Trainer updated successfully");

//       } else {

//         await createAdminTrainer(fd, token);

//         toast.success("Trainer created successfully");

//       }

//       closeModal();

//       await fetchTrainers();

//     } catch (e) {

//       toast.error(

//         e.response?.data?.message || "Operation failed"

//       );

//     }

//   };

//   const isPendingPage =

//     location.pathname === "/trainers/pending";

//   /*

//     Response Rate removed.

//     Total columns = 15.

//   */

//   const totalColumns = 15;

//   /* =========================================================

//      RENDER

//   ========================================================= */

//   return (

//     <div className="p-0 text-white">

//       {/* =====================================================

//           HEADER

//       ===================================================== */}

//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5">

//         <div>

//           <h1 className="text-4xl font-bold text-purple-400 leading-tight">

//             {getPageTitle()}

//           </h1>

//           <p className="text-white mt-1">

//             {getPageSubtitle()}

//           </p>

//         </div>

//         {!isPendingPage && (

//           <button

//             onClick={handleCreate}

//             className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition-opacity"

//           >

//             + Add Trainer

//           </button>

//         )}

//       </div>

//       {/* =====================================================

//           SEARCH

//       ===================================================== */}

//       <div className="mb-4">

//         <div className="relative w-full">

//           <Search

//             className="absolute left-4 top-1/2 -translate-y-1/2 text-white pointer-events-none"

//             size={18}

//           />

//           <input

//             type="text"

//             placeholder="Search trainers..."

//             value={searchQuery}

//             onChange={(e) =>

//               setSearchQuery(e.target.value)

//             }

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

//       {/* =====================================================

//           TABLE

//       ===================================================== */}

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

//                         className="text-white"

//                       />

//                       <p className="text-white text-lg">

//                         {searchQuery

//                           ? "No trainers found matching your search"

//                           : "No trainers available"}

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

//                 filteredTrainers.map((trainer) => (

//                   <tr

//                     key={trainer.id}

//                     className="border-t border-[#2c2c35] hover:bg-[#1a1a20] transition-colors"

//                   >

//                     {/* IMAGE */}

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

//                         <div className="w-11 h-11 bg-[#26262b] rounded-xl flex items-center justify-center text-white text-xs">

//                           N/A

//                         </div>

//                       )}

//                     </td>

//                     {/* NAME */}

//                     <td className="p-4 font-medium whitespace-nowrap">

//                       {trainer.full_name || "-"}

//                     </td>

//                     {/* EMAIL */}

//                     <td className="p-4 text-white whitespace-nowrap">

//                       {trainer.email ? (

//                         <span

//                           className="text-white hover:text-purple-300 transition-colors"

//                           title={trainer.email}

//                         >

//                           {trainer.email.length > 22

//                             ? trainer.email.substring(

//                                 0,

//                                 22

//                               ) + "..."

//                             : trainer.email}

//                         </span>

//                       ) : (

//                         "-"

//                       )}

//                     </td>

//                     {/* BIO */}

//                     <td className="p-4 text-white max-w-[130px] truncate">

//                       {trainer.bio || "-"}

//                     </td>

//                     {/* EXPERIENCE */}

//                     <td className="p-4 text-white whitespace-nowrap">

//                       {trainer.experience_years

//                         ? `${trainer.experience_years} yrs`

//                         : "-"}

//                     </td>

//                     {/* PHONE */}

//                     <td className="p-4 text-white whitespace-nowrap">

//                       {trainer.phone_number || "-"}

//                     </td>

//                     {/* LANGUAGES */}

//                     <td className="p-4 text-white whitespace-nowrap">

//                       {trainer.languages || "-"}

//                     </td>

//                     {/* CERTIFICATIONS */}

//                     <td

//                       className="p-4 text-white max-w-[140px] truncate"

//                       title={

//                         trainer.certifications || ""

//                       }

//                     >

//                       {trainer.certifications ? (

//                         <span className="inline-flex items-center gap-1.5">

//                           <span className="w-1.5 h-1.5 shrink-0"></span>

//                           {trainer.certifications.length >

//                           20

//                             ? trainer.certifications.substring(

//                                 0,

//                                 20

//                               ) + "..."

//                             : trainer.certifications}

//                         </span>

//                       ) : (

//                         "-"

//                       )}

//                     </td>

//                     {/* CATEGORY */}

//                     <td className="p-4 text-white whitespace-nowrap">

//                       {trainer.categories || "-"}

//                     </td>

//                     {/* SUBCATEGORY */}

//                     <td className="p-4 text-white whitespace-nowrap">

//                       {trainer.subcategories || "-"}

//                     </td>

//                     {/* STUDENTS */}

//                     <td className="p-4 font-semibold whitespace-nowrap">

//                       {trainer.total_students ?? 0}

//                     </td>

//                     {/* RATING */}

//                     <td className="p-4 font-semibold whitespace-nowrap">

//                       {trainer.rating

//                         ? Math.round(

//                             Number(trainer.rating)

//                           )

//                         : "-"}

//                     </td>

//                     {/* REVIEWS */}

//                     <td className="p-4 font-semibold whitespace-nowrap">

//                       {trainer.total_reviews ?? "-"}

//                     </td>

//                     {/* STATUS */}

//                     <td className="p-4 whitespace-nowrap">

//                       <StatusBadge

//                         status={

//                           trainer.approval_status

//                         }

//                       />

//                     </td>

//                     {/* ACTIONS */}

//                     <td className="p-4">

//                       <div className="flex items-center gap-2">

//                         {/* PENDING ACTIONS */}

//                         {isPendingPage && (

//                           <>

//                             <button

//                               onClick={() => {

//                                 toast(

//                                   "Approve function not connected"

//                                 );

//                               }}

//                               className="p-2 rounded-lg hover:bg-green-500/10 transition-colors group"

//                               title="Approve"

//                             >

//                               <FaCheck

//                                 size={14}

//                                 className="text-green-500/70 group-hover:text-green-400 transition-colors"

//                               />

//                             </button>

//                             <button

//                               onClick={() => {

//                                 toast(

//                                   "Reject function not connected"

//                                 );

//                               }}

//                               className="p-2 rounded-lg hover:bg-orange-500/10 transition-colors group"

//                               title="Reject"

//                             >

//                               <FaBan

//                                 size={14}

//                                 className="text-orange-500/70 group-hover:text-orange-400 transition-colors"

//                               />

//                             </button>

//                           </>

//                         )}

//                         {/* NORMAL ACTIONS */}

//                         {!isPendingPage && (

//                           <>

//                             <button

//                               onClick={() =>

//                                 handleEdit(trainer)

//                               }

//                               className="p-2 rounded-lg hover:bg-[#2a2a35] transition-colors group"

//                               title="Edit"

//                             >

//                               <Edit

//                                 size={16}

//                                 className="text-gray-400 group-hover:text-white transition-colors"

//                               />

//                             </button>

//                             <button

//                               onClick={() =>

//                                 handleDeleteClick(

//                                   trainer

//                                 )

//                               }

//                               className="p-2 rounded-lg hover:bg-red-500/10 transition-colors group"

//                               title="Delete"

//                             >

//                               <Trash2

//                                 size={16}

//                                 className="text-red-500/70 group-hover:text-red-400 transition-colors"

//                               />

//                             </button>

//                           </>

//                         )}

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

//       ===================================================== */}

//       {showModal && (

//         <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">

//           <div className="w-full max-w-[650px] max-h-[90vh] bg-[#211c30] rounded-2xl overflow-hidden shadow-2xl">

//             {/* HEADER */}

//             <div className="flex justify-between items-center p-6 border-b border-[#3a3448]">

//               <h2 className="text-2xl font-bold text-white">

//                 {editingTrainer

//                   ? "Edit Trainer"

//                   : "Add Trainer"}

//               </h2>

//               <button

//                 onClick={closeModal}

//                 className="text-gray-400 hover:text-white transition-colors"

//               >

//                 <FaTimes size={20} />

//               </button>

//             </div>

//             {/* SCROLLABLE BODY */}

//             <div className="overflow-y-auto max-h-[75vh] p-6">

//               <form

//                 onSubmit={handleSubmit}

//                 className="space-y-1"

//               >

//                 {/* =================================================

//                     NAME + EMAIL

//                 ================================================= */}

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

//                   {/* NAME */}

//                   <div>

//                     <label className={labelClass}>

//                       Name{" "}

//                       <span className="text-red-400">

//                         *

//                       </span>

//                     </label>

//                     <input

//                       value={formData.full_name}

//                       onChange={(e) =>

//                         setFormData({

//                           ...formData,

//                           full_name: e.target.value,

//                         })

//                       }

//                       className={inputClass}

//                       placeholder="Enter full name"

//                       required

//                     />

//                   </div>

//                   {/* EMAIL */}

//                   <div>

//                     <label className={labelClass}>

//                       Email{" "}

//                       <span className="text-red-400">

//                         *

//                       </span>

//                     </label>

//                     <input

//                       type="email"

//                       value={formData.email}

//                       onChange={(e) =>

//                         setFormData({

//                           ...formData,

//                           email: e.target.value,

//                         })

//                       }

//                       onBlur={() => {

//                         const { duplicateEmail } =

//                           validateUniqueContactDetails();

//                         if (duplicateEmail) {

//                           toast.error(

//                             "A trainer with this email already exists"

//                           );

//                         }

//                       }}

//                       className={inputClass}

//                       placeholder="Enter email"

//                       required

//                     />

//                   </div>

//                 </div>

//                 {/* =================================================

//                     PHONE + EXPERIENCE

//                 ================================================= */}

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

//                   {/* PHONE */}

//                   <div>

//                     <label className={labelClass}>

//                       Phone Number{" "}

//                       <span className="text-red-400">

//                         *

//                       </span>

//                     </label>

//                     <input

//                       type="tel"

//                       inputMode="numeric"

//                       maxLength={10}

//                       value={formData.phone_number}

//                       onChange={(e) => {

//                         const value = e.target.value

//                           .replace(/\D/g, "")

//                           .slice(0, 10);

//                         setFormData({

//                           ...formData,

//                           phone_number: value,

//                         });

//                       }}

//                       onBlur={() => {

//                         const { duplicatePhone } =

//                           validateUniqueContactDetails();

//                         if (duplicatePhone) {

//                           toast.error(

//                             "A trainer with this mobile number already exists"

//                           );

//                         }

//                       }}

//                       className={inputClass}

//                       placeholder="Enter 10-digit phone number"

//                       required

//                     />

//                   </div>

//                   {/* EXPERIENCE */}

//                   <div>

//                     <label className={labelClass}>

//                       Experience Years

//                     </label>

//                     <input

//                       type="number"

//                       min="0"

//                       value={

//                         formData.experience_years

//                       }

//                       onChange={(e) =>

//                         setFormData({

//                           ...formData,

//                           experience_years:

//                             e.target.value,

//                         })

//                       }

//                       className={inputClass}

//                       placeholder="0"

//                     />

//                   </div>

//                 </div>

//                 {/* =================================================

//                     BIO

//                 ================================================= */}

//                 <div>

//                   <label className={labelClass}>

//                     Bio

//                   </label>

//                   <textarea

//                     value={formData.bio}

//                     onChange={(e) =>

//                       setFormData({

//                         ...formData,

//                         bio: e.target.value,

//                       })

//                     }

//                     rows="3"

//                     className={inputClass}

//                     placeholder="Enter bio"

//                   />

//                 </div>

//                 {/* =================================================

//                     LANGUAGES

//                 ================================================= */}

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

//                   <div>

//                     <label className={labelClass}>

//                       Languages

//                     </label>

//                     <input

//                       value={formData.languages}

//                       onChange={(e) =>

//                         setFormData({

//                           ...formData,

//                           languages:

//                             e.target.value,

//                         })

//                       }

//                       className={inputClass}

//                       placeholder="e.g. English, Hindi"

//                     />

//                   </div>

//                 </div>

//                 {/* =================================================

//                     CERTIFICATIONS

//                 ================================================= */}

//                 <div>

//                   <label className={labelClass}>

//                     Certifications

//                   </label>

//                   <textarea

//                     value={formData.certifications}

//                     onChange={(e) =>

//                       setFormData({

//                         ...formData,

//                         certifications:

//                           e.target.value,

//                       })

//                     }

//                     rows="3"

//                     className={inputClass}

//                     placeholder="Enter certifications"

//                   />

//                 </div>

//                 {/* =================================================

//                     TOTAL STUDENTS

//                 ================================================= */}

//                 <div>

//                   <label className={labelClass}>

//                     Total Students

//                   </label>

//                   <input

//                     type="number"

//                     min="0"

//                     value={formData.total_students}

//                     onChange={(e) =>

//                       setFormData({

//                         ...formData,

//                         total_students:

//                           e.target.value,

//                       })

//                     }

//                     className={inputClass}

//                     placeholder="0"

//                   />

//                 </div>

//                 {/* =================================================

//                     RATING + REVIEWS

//                 ================================================= */}

//                 <div className="grid grid-cols-2 md:grid-cols-2 gap-4">

//                   {/* RATING */}

//                   <div>

//                     <label className={labelClass}>

//                       Rating

//                     </label>

//                     <input

//                       type="number"

//                       step="1"

//                       value={formData.rating}

//                       onChange={(e) =>

//                         setFormData({

//                           ...formData,

//                           rating: e.target.value,

//                         })

//                       }

//                       className={inputClass}

//                       placeholder="0"

//                     />

//                   </div>

//                   {/* REVIEWS */}

//                   <div>

//                     <label className={labelClass}>

//                       Reviews

//                     </label>

//                     <input

//                       type="number"

//                       min="0"

//                       value={formData.total_reviews}

//                       onChange={(e) =>

//                         setFormData({

//                           ...formData,

//                           total_reviews:

//                             e.target.value,

//                         })

//                       }

//                       className={inputClass}

//                       placeholder="0"

//                     />

//                   </div>

//                 </div>

//                 {/* =================================================

//                     CATEGORY + SUBCATEGORY

//                 ================================================= */}

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

//                   {/* CATEGORY */}

//                   <div>

//                     <label className={labelClass}>

//                       Category{" "}

//                       <span className="text-red-400">

//                         *

//                       </span>

//                     </label>

//                     <select

//                       value={

//                         formData.category_id || ""

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

//                   {/* SUBCATEGORY */}

//                   <div>

//                     <label className={labelClass}>

//                       Subcategory{" "}

//                       <span className="text-red-400">

//                         *

//                       </span>

//                     </label>

//                     <select

//                       value={

//                         formData.subcategory_id || ""

//                       }

//                       onChange={(e) =>

//                         setFormData({

//                           ...formData,

//                           subcategory_id:

//                             e.target.value,

//                         })

//                       }

//                       disabled={!formData.category_id}

//                       className={`${selectClass} disabled:opacity-50`}

//                       required

//                     >

//                       <option value="">

//                         Select Subcategory

//                       </option>

//                       {subcategories

//                         .filter(

//                           (sub) =>

//                             String(

//                               sub.category_id

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

//                 {/* =================================================

//                     PROFILE IMAGE

//                 ================================================= */}

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

//                       setFormData({

//                         ...formData,

//                         profile_image:

//                           e.target.files?.[0],

//                       })

//                     }

//                     className="w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-500/20 file:text-purple-300 hover:file:bg-purple-500/30"

//                   />

//                 </div>

//                 {/* =================================================

//                     BUTTONS

//                 ================================================= */}

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

//       ===================================================== */}

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

//               <p className="text-gray-400 text-center text-sm leading-relaxed mb-8">

//                 Are you sure you want to delete this trainer?

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

import { useLocation } from "react-router-dom";

import { Edit, Trash2, Search } from "lucide-react";

import { FaTrash, FaTimes, FaCheck, FaBan } from "react-icons/fa";

import API from "../services/api";

import {

  getAdminTrainers,

  createAdminTrainer,

  updateAdminTrainer,

  deleteAdminTrainer,

  getPendingTrainers,

  getRejectedTrainers,

} from "../services/trainerService";

/* =========================================================

   STYLES

========================================================= */

const inputClass =

  "w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors";

const selectClass =

  "w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors";

const labelClass = "block text-sm text-gray-400 mb-1";

/* =========================================================

   COMPONENT

========================================================= */

export default function Trainers() {

  const [trainers, setTrainers] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [editingTrainer, setEditingTrainer] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [trainerToDelete, setTrainerToDelete] = useState(null);

  const [categories, setCategories] = useState([]);

  const [subcategories, setSubcategories] = useState([]);

  /* =========================================================

     FORM DATA

  ========================================================= */

  const [formData, setFormData] = useState({

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

    total_students: "",

    category_id: "",

    subcategory_id: "",

    profile_image: null,

  });

  const token = localStorage.getItem("adminToken");

  const location = useLocation();

  /* =========================================================

     FILTERED TRAINERS

  ========================================================= */

  const filteredTrainers = trainers.filter((t) => {

    const query = searchQuery.toLowerCase();

    return (

      t.full_name?.toLowerCase().includes(query) ||

      t.email?.toLowerCase().includes(query) ||

      t.specialty?.toLowerCase().includes(query) ||

      t.bio?.toLowerCase().includes(query) ||

      t.phone_number?.includes(query) ||

      t.languages?.toLowerCase().includes(query) ||

      t.skills?.toLowerCase().includes(query) ||

      String(t.rating ?? "").includes(query) ||

      String(t.total_reviews ?? "").includes(query) ||

      t.certifications?.toLowerCase().includes(query) ||

      t.categories?.toLowerCase().includes(query) ||

      t.subcategories?.toLowerCase().includes(query) ||

      t.approval_status?.toLowerCase().includes(query) ||

      String(t.id ?? "").includes(query) ||

      String(t.experience_years ?? "").includes(query)

    );

  });

  /* =========================================================

     IMAGE HELPER

  ========================================================= */

  const getImageUrl = (img) => {

    if (!img) return "";

    if (img.startsWith("http")) {

      return img;

    }

    // return `https://finearts-backend.onrender.com${img}`;
    return `http://localhost:5000${img}`;

  };

  /* =========================================================

     STATUS BADGE

  ========================================================= */

  const StatusBadge = ({ status }) => {

    const s = status?.toLowerCase();

    let bg = "bg-gray-500/20";

    let text = "text-gray-400";

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

  /* =========================================================

     FETCH TRAINERS

  ========================================================= */

  const fetchTrainers = async () => {

    try {

      let res;

      if (location.pathname === "/trainers/pending") {

        res = await getPendingTrainers(token);

      } else if (location.pathname === "/trainers/rejected") {

        res = await getRejectedTrainers(token);

      } else {

        res = await getAdminTrainers(token);

      }

      setTrainers(res.data?.data || []);

    } catch (e) {

      toast.error(

        e.response?.data?.message || "Failed to load trainers"

      );

    }

  };

  /* =========================================================

     FETCH CATEGORIES / SUBCATEGORIES

  ========================================================= */

  const fetchDropdowns = async () => {
    try {
      // Match the Categories page: use its admin endpoint, which returns
      // the is_active field required for filtering inactive categories.
      const config = token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : {};

      const [catRes, subRes] = await Promise.all([
        API.get("/categories/admin/all", config),
        API.get("/subcategories", config),
      ]);

      const isActive = (item) => {
        const value = item?.is_active ?? item?.isActive ?? item?.active;
        if (typeof value === "boolean") return value;
        if (typeof value === "number") return value === 1;
        if (typeof value === "string") {
          return ["1", "true", "active"].includes(value.trim().toLowerCase());
        }
        return false;
      };

      const allCategories = catRes.data?.data || [];
      const activeCategories = allCategories.filter(isActive);
      const activeCategoryIds = new Set(
        activeCategories.map((category) => String(category.id))
      );

      const allSubcategories = [
        ...(subRes.data?.data || []),
        ...allCategories.flatMap((category) =>
          (category.subcategories || []).map((subcategory) => ({
            ...subcategory,
            category_id: subcategory.category_id ?? category.id,
          }))
        ),
      ];

      const uniqueSubcategories = Array.from(
        new Map(allSubcategories.map((sub) => [String(sub.id), sub])).values()
      );

      const activeSubcategories = uniqueSubcategories.filter(
        (subcategory) =>
          isActive(subcategory) &&
          activeCategoryIds.has(String(subcategory.category_id))
      );

      setCategories(activeCategories);
      setSubcategories(activeSubcategories);
    } catch (err) {
      console.error("Failed to fetch active categories/subcategories:", err);
      toast.error("Failed to load categories and subcategories");
    }
  };

  /* =========================================================

     INITIAL FETCH

  ========================================================= */

  useEffect(() => {

    fetchTrainers();

    fetchDropdowns();

  }, [location.pathname]);

  /* =========================================================

     PAGE TITLE

  ========================================================= */

  const getPageTitle = () => {

    if (location.pathname === "/trainers/pending") {

      return "Pending Trainers";

    }

    if (location.pathname === "/trainers/rejected") {

      return "Rejected Trainers";

    }

    return "Admin Trainers";

  };

  const getPageSubtitle = () => {

    if (location.pathname === "/trainers/pending") {

      return "Review and approve trainer applications";

    }

    if (location.pathname === "/trainers/rejected") {

      return "Manage rejected trainer applications";

    }

    return "Manage Admin Trainers";

  };

  /* =========================================================

     RESET FORM

  ========================================================= */

  const getEmptyForm = () => ({

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

    total_students: "",

    category_id: "",

    subcategory_id: "",

    profile_image: null,

  });

  /* =========================================================

     CREATE

  ========================================================= */

  const handleCreate = async () => {
    await fetchDropdowns();
    setEditingTrainer(null);
    setFormData(getEmptyForm());
    setShowModal(true);
  };

  /* =========================================================

     EDIT

  ========================================================= */

  const handleEdit = (trainer) => {
    setEditingTrainer(trainer);

    // The list API may return category/subcategory names without their IDs.
    // Resolve the IDs from dropdown data so saved values appear in Edit.
    const normalize = (value) =>
      String(value ?? "").trim().toLowerCase();

    const categoryName =
      trainer.category_name ??
      trainer.categoryName ??
      trainer.category?.name ??
      trainer.categories ??
      trainer.category ??
      "";

    const matchedCategory = categories.find(
      (cat) =>
        normalize(cat.id) === normalize(trainer.category_id ?? trainer.categoryId) ||
        normalize(cat.name) === normalize(categoryName)
    );

    const categoryId =
      trainer.category_id ??
      trainer.categoryId ??
      trainer.category?.id ??
      matchedCategory?.id ??
      "";

    const subcategoryName =
      trainer.subcategory_name ??
      trainer.subcategoryName ??
      trainer.subcategory?.name ??
      trainer.subcategories ??
      trainer.subcategory ??
      "";

    const matchedSubcategory = subcategories.find((sub) => {
      const sameCategory =
        !categoryId || normalize(sub.category_id) === normalize(categoryId);
      return (
        sameCategory &&
        (normalize(sub.id) === normalize(trainer.subcategory_id ?? trainer.subcategoryId) ||
          normalize(sub.name) === normalize(subcategoryName))
      );
    });

    const subcategoryId =
      trainer.subcategory_id ??
      trainer.subcategoryId ??
      trainer.subcategory?.id ??
      matchedSubcategory?.id ??
      "";

    setFormData({
      full_name: trainer.full_name || "",
      email: trainer.email || "",
      phone_number: trainer.phone_number || "",
      bio: trainer.bio || "",
      experience_years: trainer.experience_years ?? "",
      specialty: trainer.specialty || "",
      languages: trainer.languages || "",
      skills: trainer.skills || "",
      rating: trainer.rating ?? "",
      total_reviews: trainer.total_reviews ?? "",
      certifications: trainer.certifications || "",
      total_students: trainer.total_students ?? "",
      category_id: String(categoryId || ""),
      subcategory_id: String(subcategoryId || ""),
      profile_image: null,
    });

    setShowModal(true);
  };

  const handleDeleteClick = (trainer) => {

    setTrainerToDelete(trainer);

    setShowDeleteModal(true);

  };

  const confirmDelete = async () => {

    if (!trainerToDelete) return;

    try {

      await deleteAdminTrainer(trainerToDelete.id, token);

      toast.success("Trainer deleted");

      await fetchTrainers();

      setShowDeleteModal(false);

      setTrainerToDelete(null);

    } catch (e) {

      toast.error(

        e.response?.data?.message || "Delete failed"

      );

    }

  };

  /* =========================================================

     CLOSE MODAL

  ========================================================= */

  const closeModal = () => {

    setShowModal(false);

    setEditingTrainer(null);

    setFormData(getEmptyForm());

  };

  /* =========================================================

     DUPLICATE EMAIL / MOBILE VALIDATION

  ========================================================= */

  const validateUniqueContactDetails = () => {

    const email = String(formData.email || "")

      .trim()

      .toLowerCase();

    const phone = String(formData.phone_number || "")

      .replace(/\D/g, "");

    const duplicateEmail = trainers.some((trainer) => {

      if (

        editingTrainer &&

        String(trainer.id) === String(editingTrainer.id)

      ) {

        return false;

      }

      return (

        String(trainer.email || "")

          .trim()

          .toLowerCase() === email

      );

    });

    const duplicatePhone = trainers.some((trainer) => {

      if (

        editingTrainer &&

        String(trainer.id) === String(editingTrainer.id)

      ) {

        return false;

      }

      return (

        String(trainer.phone_number || "")

          .replace(/\D/g, "") === phone

      );

    });

    return {

      duplicateEmail,

      duplicatePhone,

    };

  };

  /* =========================================================

     SUBMIT

  ========================================================= */

  const handleSubmit = async (e) => {

    e.preventDefault();

    /* -------------------------------------------------------

       MANDATORY FIELD VALIDATION

    ------------------------------------------------------- */

    if (!formData.full_name?.trim()) {

      toast.error("Name is required");

      return;

    }

    if (!formData.email?.trim()) {

      toast.error("Email is required");

      return;

    }

    if (!formData.phone_number?.trim()) {

      toast.error("Phone number is required");

      return;

    }

    if (!formData.category_id) {

      toast.error("Category is required");

      return;

    }

    if (!formData.subcategory_id) {

      toast.error("Subcategory is required");

      return;

    }

    const selectedCategory = categories.find(
      (category) => String(category.id) === String(formData.category_id)
    );
    if (!selectedCategory) {
      toast.error("Selected category is inactive or unavailable. Please select an active category.");
      return;
    }

    const selectedSubcategory = subcategories.find(
      (subcategory) =>
        String(subcategory.id) === String(formData.subcategory_id) &&
        String(subcategory.category_id) === String(formData.category_id)
    );
    if (!selectedSubcategory) {
      toast.error("Selected subcategory is inactive or does not belong to the selected category.");
      return;
    }

    // -------------------------------------------------------

    // DUPLICATE EMAIL / MOBILE VALIDATION

    // -------------------------------------------------------

    const {

      duplicateEmail,

      duplicatePhone,

    } = validateUniqueContactDetails();

    if (duplicateEmail) {

      toast.error(

        "A trainer with this email already exists"

      );

      return;

    }

    if (duplicatePhone) {

      toast.error(

        "A trainer with this mobile number already exists"

      );

      return;

    }

    try {

      const fd = new FormData();

      Object.entries(formData).forEach(([key, value]) => {

        if (

          value !== null &&

          value !== undefined &&

          value !== ""

        ) {

          fd.append(key, value);

        }

      });

      if (editingTrainer) {

        await updateAdminTrainer(

          editingTrainer.id,

          fd,

          token

        );

        toast.success("Trainer updated successfully");

      } else {

        await createAdminTrainer(fd, token);

        toast.success("Trainer created successfully");

      }

      closeModal();

      await fetchTrainers();

    } catch (e) {

      toast.error(

        e.response?.data?.message || "Operation failed"

      );

    }

  };

  const isPendingPage =

    location.pathname === "/trainers/pending";

  /*

    Response Rate removed.

    Total columns = 15.

  */

  const totalColumns = 15;

  /* =========================================================

     RENDER

  ========================================================= */

  return (

    <div className="p-0 text-white">

      {/* =====================================================

          HEADER

      ===================================================== */}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5">

        <div>

          <h1 className="text-4xl font-bold text-purple-400 leading-tight">

            {getPageTitle()}

          </h1>

          <p className="text-white mt-1">

            {getPageSubtitle()}

          </p>

        </div>

        {!isPendingPage && (

          <button

            onClick={handleCreate}

            className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition-opacity"

          >

            + Add Trainer

          </button>

        )}

      </div>

      {/* =====================================================

          SEARCH

      ===================================================== */}

      <div className="mb-4">

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

              setSearchQuery(e.target.value)

            }

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

                        className="text-white"

                      />

                      <p className="text-white text-lg">

                        {searchQuery

                          ? "No trainers found matching your search"

                          : "No trainers available"}

                      </p>

                      {searchQuery && (

                        <button

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

                filteredTrainers.map((trainer) => (

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

                          alt={trainer.full_name}

                          className="w-11 h-11 rounded-xl object-cover border border-[#333]"

                          onError={(e) => {

                            e.currentTarget.style.display =

                              "none";

                          }}

                        />

                      ) : (

                        <div className="w-11 h-11 bg-[#26262b] rounded-xl flex items-center justify-center text-white text-xs">

                          N/A

                        </div>

                      )}

                    </td>

                    {/* NAME */}

                    <td className="p-4 font-medium whitespace-nowrap">

                      {trainer.full_name || "-"}

                    </td>

                    {/* EMAIL */}

                    <td className="p-4 text-white whitespace-nowrap">

                      {trainer.email ? (

                        <span

                          className="text-white hover:text-purple-300 transition-colors"

                          title={trainer.email}

                        >

                          {trainer.email.length > 22

                            ? trainer.email.substring(

                                0,

                                22

                              ) + "..."

                            : trainer.email}

                        </span>

                      ) : (

                        "-"

                      )}

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

                    <td

                      className="p-4 text-white max-w-[140px] truncate"

                      title={

                        trainer.certifications || ""

                      }

                    >

                      {trainer.certifications ? (

                        <span className="inline-flex items-center gap-1.5">

                          <span className="w-1.5 h-1.5 shrink-0"></span>

                          {trainer.certifications.length >

                          20

                            ? trainer.certifications.substring(

                                0,

                                20

                              ) + "..."

                            : trainer.certifications}

                        </span>

                      ) : (

                        "-"

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

                            Number(trainer.rating)

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

                        {/* PENDING ACTIONS */}

                        {isPendingPage && (

                          <>

                            <button

                              onClick={() => {

                                toast(

                                  "Approve function not connected"

                                );

                              }}

                              className="p-2 rounded-lg hover:bg-green-500/10 transition-colors group"

                              title="Approve"

                            >

                              <FaCheck

                                size={14}

                                className="text-green-500/70 group-hover:text-green-400 transition-colors"

                              />

                            </button>

                            <button

                              onClick={() => {

                                toast(

                                  "Reject function not connected"

                                );

                              }}

                              className="p-2 rounded-lg hover:bg-orange-500/10 transition-colors group"

                              title="Reject"

                            >

                              <FaBan

                                size={14}

                                className="text-orange-500/70 group-hover:text-orange-400 transition-colors"

                              />

                            </button>

                          </>

                        )}

                        {/* NORMAL ACTIONS */}

                        {!isPendingPage && (

                          <>

                            <button

                              onClick={() =>

                                handleEdit(trainer)

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

                                className="text-red-500/70 group-hover:text-red-400 transition-colors"

                              />

                            </button>

                          </>

                        )}

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* =====================================================

          ADD / EDIT TRAINER MODAL

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

                className="text-gray-400 hover:text-white transition-colors"

              >

                <FaTimes size={20} />

              </button>

            </div>

            {/* SCROLLABLE BODY */}

            <div className="overflow-y-auto max-h-[75vh] p-6">

              <form

                onSubmit={handleSubmit}

                className="space-y-1"

              >

                {/* =================================================

                    NAME + EMAIL

                ================================================= */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  {/* NAME */}

                  <div>

                    <label className={labelClass}>

                      Name{" "}

                      <span className="text-red-400">

                        *

                      </span>

                    </label>

                    <input

                      value={formData.full_name}

                      onChange={(e) =>

                        setFormData({

                          ...formData,

                          full_name: e.target.value,

                        })

                      }

                      className={inputClass}

                      placeholder="Enter full name"

                      required

                    />

                  </div>

                  {/* EMAIL */}

                  <div>

                    <label className={labelClass}>

                      Email{" "}

                      <span className="text-red-400">

                        *

                      </span>

                    </label>

                    <input

                      type="email"

                      value={formData.email}

                      onChange={(e) =>

                        setFormData({

                          ...formData,

                          email: e.target.value,

                        })

                      }

                      onBlur={() => {

                        const { duplicateEmail } =

                          validateUniqueContactDetails();

                        if (duplicateEmail) {

                          toast.error(

                            "A trainer with this email already exists"

                          );

                        }

                      }}

                      className={inputClass}

                      placeholder="Enter email"

                      required

                    />

                  </div>

                </div>

                {/* =================================================

                    PHONE + EXPERIENCE

                ================================================= */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  {/* PHONE */}

                  <div>

                    <label className={labelClass}>

                      Phone Number{" "}

                      <span className="text-red-400">

                        *

                      </span>

                    </label>

                    <input

                      type="tel"

                      inputMode="numeric"

                      maxLength={10}

                      value={formData.phone_number}

                      onChange={(e) => {

                        const value = e.target.value

                          .replace(/\D/g, "")

                          .slice(0, 10);

                        setFormData({

                          ...formData,

                          phone_number: value,

                        });

                      }}

                      onBlur={() => {

                        const { duplicatePhone } =

                          validateUniqueContactDetails();

                        if (duplicatePhone) {

                          toast.error(

                            "A trainer with this mobile number already exists"

                          );

                        }

                      }}

                      className={inputClass}

                      placeholder="Enter 10-digit phone number"

                      required

                    />

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

                        setFormData({

                          ...formData,

                          experience_years:

                            e.target.value,

                        })

                      }

                      className={inputClass}

                      placeholder="0"

                    />

                  </div>

                </div>

                {/* =================================================

                    BIO

                ================================================= */}

                <div>

                  <label className={labelClass}>

                    Bio

                  </label>

                  <textarea

                    value={formData.bio}

                    onChange={(e) =>

                      setFormData({

                        ...formData,

                        bio: e.target.value,

                      })

                    }

                    rows="3"

                    className={inputClass}

                    placeholder="Enter bio"

                  />

                </div>

                {/* =================================================

                    LANGUAGES

                ================================================= */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  <div>

                    <label className={labelClass}>

                      Languages

                    </label>

                    <input

                      value={formData.languages}

                      onChange={(e) =>

                        setFormData({

                          ...formData,

                          languages:

                            e.target.value,

                        })

                      }

                      className={inputClass}

                      placeholder="e.g. English, Hindi"

                    />

                  </div>

                </div>

                {/* =================================================

                    CERTIFICATIONS

                ================================================= */}

                <div>

                  <label className={labelClass}>

                    Certifications

                  </label>

                  <textarea

                    value={formData.certifications}

                    onChange={(e) =>

                      setFormData({

                        ...formData,

                        certifications:

                          e.target.value,

                      })

                    }

                    rows="3"

                    className={inputClass}

                    placeholder="Enter certifications"

                  />

                </div>

                {/* =================================================

                    TOTAL STUDENTS

                ================================================= */}

                <div>

                  <label className={labelClass}>

                    Total Students

                  </label>

                  <input

                    type="number"

                    min="0"

                    value={formData.total_students}

                    onChange={(e) =>

                      setFormData({

                        ...formData,

                        total_students:

                          e.target.value,

                      })

                    }

                    className={inputClass}

                    placeholder="0"

                  />

                </div>

                {/* =================================================

                    RATING + REVIEWS

                ================================================= */}

                <div className="grid grid-cols-2 md:grid-cols-2 gap-4">

                  {/* RATING */}

                  <div>

                    <label className={labelClass}>

                      Rating

                    </label>

                    <input

                      type="number"

                      step="1"

                      value={formData.rating}

                      onChange={(e) =>

                        setFormData({

                          ...formData,

                          rating: e.target.value,

                        })

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

                      value={formData.total_reviews}

                      onChange={(e) =>

                        setFormData({

                          ...formData,

                          total_reviews:

                            e.target.value,

                        })

                      }

                      className={inputClass}

                      placeholder="0"

                    />

                  </div>

                </div>

                {/* =================================================

                    CATEGORY + SUBCATEGORY

                ================================================= */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  {/* CATEGORY */}

                  <div>

                    <label className={labelClass}>

                      Category{" "}

                      <span className="text-red-400">

                        *

                      </span>

                    </label>

                    <select

                      value={

                        formData.category_id || ""

                      }

                      onChange={(e) =>

                        setFormData({

                          ...formData,

                          category_id:

                            e.target.value,

                          subcategory_id: "",

                        })

                      }

                      className={selectClass}

                      required

                    >

                      <option value="">

                        Select Category

                      </option>

                      {categories.map((cat) => (

                        <option

                          key={cat.id}

                          value={cat.id}

                        >

                          {cat.name}

                        </option>

                      ))}

                    </select>

                  </div>

                  {/* SUBCATEGORY */}

                  <div>

                    <label className={labelClass}>

                      Subcategory{" "}

                      <span className="text-red-400">

                        *

                      </span>

                    </label>

                    <select

                      value={

                        formData.subcategory_id || ""

                      }

                      onChange={(e) =>

                        setFormData({

                          ...formData,

                          subcategory_id:

                            e.target.value,

                        })

                      }

                      disabled={!formData.category_id}

                      className={`${selectClass} disabled:opacity-50`}

                      required

                    >

                      <option value="">

                        Select Subcategory

                      </option>

                      {subcategories

                        .filter(

                          (sub) =>

                            String(

                              sub.category_id

                            ) ===

                            String(

                              formData.category_id

                            )

                        )

                        .map((sub) => (

                          <option

                            key={sub.id}

                            value={sub.id}

                          >

                            {sub.name}

                          </option>

                        ))}

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

                      setFormData({

                        ...formData,

                        profile_image:

                          e.target.files?.[0],

                      })

                    }

                    className="w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-500/20 file:text-purple-300 hover:file:bg-purple-500/30"

                  />

                </div>

                {/* =================================================

                    BUTTONS

                ================================================= */}

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

          DELETE CONFIRMATION MODAL

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

              <p className="text-gray-400 text-center text-sm leading-relaxed mb-8">

                Are you sure you want to delete this trainer?

              </p>

              <div className="flex gap-3 w-full">

                <button

                  onClick={() => {

                    setShowDeleteModal(false);

                    setTrainerToDelete(null);

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