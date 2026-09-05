
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import {
//   HiPencil,
//   HiTrash,
//   HiPlus,
// } from "react-icons/hi";

// import API from "../services/api";
// import DataTable from "../components/ui/DataTable";
// import Modal from "../components/ui/Modal";
// import Button from "../components/ui/Button";
// import Badge from "../components/ui/Badge";
// import FormInput from "../components/ui/FormInput";

// import {
//   getInstituteTrainers,
//   createInstituteTrainer,
//   updateInstituteTrainer,
//   deleteInstituteTrainer,
// } from "../services/instituteService";

// export default function InstituteTrainers() {
//   const [trainers, setTrainers] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingTrainer, setEditingTrainer] = useState(null);
//   const [deleteModalOpen, setDeleteModalOpen] = useState(false);
//   const [trainerToDelete, setTrainerToDelete] = useState(null);

//   /* ================= DROPDOWNS ================= */
//   const [categories, setCategories] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);

//   /* ================= FORM DATA — EXACT same shape as Admin ================= */
//   const [formData, setFormData] = useState({
//     full_name: "",
//     email: "",
//     phone_number: "",
//     bio: "",
//     experience_years: "",
//     specialty: "",
//     languages: "",
//     skills: "",
//     certifications: "",
//     response_rate: "",
//     total_students: "",
//     category_id: "",
//     subcategory_id: "",
//     profile_image: null,
//   });

//   const token = localStorage.getItem("token");

//   /* ================= FETCH FUNCTIONS ================= */
//   const fetchTrainers = async () => {
//     try {
//       const res = await getInstituteTrainers(token);
//       setTrainers(res.data?.data || res.data || []);
//     } catch (e) {
//       toast.error(
//         e.response?.data?.message || "Failed to load trainers"
//       );
//     }
//   };

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

//   useEffect(() => {
//     fetchTrainers();
//     fetchDropdowns();
//   }, []);

//   /* ================= COLUMNS — EXACT same as Admin ================= */
//   const columns = [
//     {
//       key: "profile_image",
//       label: "IMAGE",
//       render: (value) => (
//         <img
//           src={value || "https://via.placeholder.com/60"}
//           alt=""
//           className="w-14 h-14 rounded-lg object-cover"
//         />
//       ),
//     },
//     {
//       key: "full_name",
//       label: "NAME",
//     },
//     {
//       key: "specialty",
//       label: "SPECIALTY",
//     },
//     {
//       key: "bio",
//       label: "BIO",
//       render: (value) => (
//         <p className="line-clamp-1 max-w-[150px]">{value || "N/A"}</p>
//       ),
//     },
//     {
//       key: "experience_years",
//       label: "EXPERIENCE",
//     },
//     {
//       key: "phone_number",
//       label: "PHONE",
//     },
//     {
//       key: "languages",
//       label: "LANGUAGES",
//     },
//     {
//       key: "skills",
//       label: "SKILLS",
//       render: (value) => (
//         <p className="line-clamp-1 max-w-[150px]">{value || "N/A"}</p>
//       ),
//     },
//     {
//       key: "certifications",
//       label: "CERTIFICATIONS",
//       render: (value) => (
//         <p className="line-clamp-1 max-w-[150px]">{value || "N/A"}</p>
//       ),
//     },
//     {
//       key: "total_students",
//       label: "TOTAL STUDENTS",
//     },
//     {
//       key: "response_rate",
//       label: "RESPONSE RATE",
//     },
//     {
//       key: "categories",
//       label: "CATEGORY",
//       render: (value) => value || "N/A",
//     },
//     {
//       key: "subcategories",
//       label: "SUBCATEGORY",
//       render: (value) => value || "N/A",
//     },
//     {
//       key: "approval_status",
//       label: "STATUS",
//       render: (value) => (
//         <Badge variant={value?.toLowerCase()}>{value}</Badge>
//       ),
//     },
//   ];

//   /* ================= HANDLERS — EXACT same logic as Admin ================= */
//   const handleCreate = () => {
//     setEditingTrainer(null);
//     setFormData({
//       full_name: "",
//       email: "",
//       phone_number: "",
//       bio: "",
//       experience_years: "",
//       specialty: "",
//       languages: "",
//       skills: "",
//       certifications: "",
//       response_rate: "",
//       total_students: "",
//       category_id: "",
//       subcategory_id: "",
//       profile_image: null,
//     });
//     setIsModalOpen(true);
//   };

//   const handleEdit = (trainer) => {
//     setEditingTrainer(trainer);
//     setFormData({
//       ...trainer,
//       profile_image: null,
//     });
//     setIsModalOpen(true);
//   };

//   const handleDeleteClick = (id) => {
//     setTrainerToDelete(id);
//     setDeleteModalOpen(true);
//   };

//   const confirmDelete = async () => {
//     try {
//       await deleteInstituteTrainer(trainerToDelete, token);
//       toast.success("Trainer deleted");
//       fetchTrainers();
//       setDeleteModalOpen(false);
//     } catch (e) {
//       toast.error(
//         e.response?.data?.message || "Delete failed"
//       );
//     }
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setEditingTrainer(null);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       /* EXACT same FormData construction as Admin */
//       const fd = new FormData();

//       Object.entries(formData).forEach(([k, v]) => {
//         if (v !== null && v !== undefined && v !== "") {
//           fd.append(k, v);
//         }
//       });

//       if (editingTrainer) {
//         await updateInstituteTrainer(editingTrainer.id, fd, token);
//         toast.success("Trainer updated successfully");
//       } else {
//         await createInstituteTrainer(fd, token);
//         toast.success("Trainer created successfully");
//       }

//       closeModal();
//       fetchTrainers();
//     } catch (e) {
//       toast.error(
//         e.response?.data?.message || "Operation failed"
//       );
//     }
//   };

//   /* ================= JSX ================= */
//   return (
//     <div className="space-y-6 animate-slide-up w-250">
//       {/* HEADER — EXACT same as Admin */}
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold gradient-text">
//             Institute Trainers
//           </h1>
//           <p className="text-white mt-1">
//             Manage institute trainers
//           </p>
//         </div>

//         <Button
//           icon={HiPlus}
//           onClick={handleCreate}
//         >
//           Add Trainer
//         </Button>
//       </div>

//       {/* TABLE — EXACT same DataTable usage as Admin */}
//       <DataTable
//         columns={columns}
//         data={trainers}
//         filterable
//         actions={(row) => (
//           <div className="flex gap-2">
//             <Button
//               variant="ghost"
//               size="sm"
//               icon={HiPencil}
//               onClick={() => handleEdit(row)}
//             />

//             <Button
//               variant="ghost"
//               size="sm"
//               icon={HiTrash}
//               className="text-red-400"
//               onClick={() => handleDeleteClick(row.id)}
//             />
//           </div>
//         )}
//       />

//       {/* ================= ADD/EDIT MODAL — EXACT same fields & layout as Admin ================= */}
//       <Modal
//         isOpen={isModalOpen}
//         onClose={closeModal}
//         title={editingTrainer ? "Edit Trainer" : "Add Trainer"}
//       >
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <FormInput
//             label="Full Name"
//             value={formData.full_name}
//             onChange={(e) =>
//               setFormData({ ...formData, full_name: e.target.value })
//             }
//           />

//           <FormInput
//             label="Email"
//             value={formData.email}
//             onChange={(e) =>
//               setFormData({ ...formData, email: e.target.value })
//             }
//           />

//           <FormInput
//             label="Phone Number"
//             value={formData.phone_number}
//             onChange={(e) =>
//               setFormData({ ...formData, phone_number: e.target.value })
//             }
//           />

//           <FormInput
//             label="Experience Years"
//             type="number"
//             value={formData.experience_years}
//             onChange={(e) =>
//               setFormData({ ...formData, experience_years: e.target.value })
//             }
//           />

//           <FormInput
//             label="Bio"
//             type="textarea"
//             value={formData.bio}
//             onChange={(e) =>
//               setFormData({ ...formData, bio: e.target.value })
//             }
//           />

//           <FormInput
//             label="Specialty"
//             value={formData.specialty}
//             onChange={(e) =>
//               setFormData({ ...formData, specialty: e.target.value })
//             }
//           />

//           <FormInput
//             label="Languages"
//             value={formData.languages}
//             onChange={(e) =>
//               setFormData({ ...formData, languages: e.target.value })
//             }
//           />

//           <FormInput
//             label="Skills"
//             type="textarea"
//             value={formData.skills}
//             onChange={(e) =>
//               setFormData({ ...formData, skills: e.target.value })
//             }
//           />

//           <FormInput
//             label="Certifications"
//             type="textarea"
//             value={formData.certifications}
//             onChange={(e) =>
//               setFormData({ ...formData, certifications: e.target.value })
//             }
//           />

//           <FormInput
//             label="Response Rate"
//             value={formData.response_rate}
//             onChange={(e) =>
//               setFormData({ ...formData, response_rate: e.target.value })
//             }
//           />

//           <FormInput
//             label="Total Students"
//             type="number"
//             value={formData.total_students}
//             onChange={(e) =>
//               setFormData({ ...formData, total_students: e.target.value })
//             }
//           />

//           {/* Category & Subcategory Dropdowns — EXACT same as Admin */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-white mb-2">
//                 Category
//               </label>
//               <select
//                 value={formData.category_id || ""}
//                 onChange={(e) =>
//                   setFormData({
//                     ...formData,
//                     category_id: e.target.value,
//                     subcategory_id: "",
//                   })
//                 }
//                 className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white"
//               >
//                 <option value="">Select Category</option>
//                 {categories.map((cat) => (
//                   <option
//                     key={cat.id}
//                     value={cat.id}
//                     className="bg-[#1f1f2e]"
//                   >
//                     {cat.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-white mb-2">
//                 Subcategory
//               </label>
//               <select
//                 value={formData.subcategory_id || ""}
//                 onChange={(e) =>
//                   setFormData({
//                     ...formData,
//                     subcategory_id: e.target.value,
//                   })
//                 }
//                 className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white"
//               >
//                 <option value="">Select Subcategory</option>
//                 {subcategories
//                   .filter(
//                     (sub) =>
//                       String(sub.category_id) ===
//                       String(formData.category_id)
//                   )
//                   .map((sub) => (
//                     <option
//                       key={sub.id}
//                       value={sub.id}
//                       className="bg-[#1f1f2e]"
//                     >
//                       {sub.name}
//                     </option>
//                   ))}
//               </select>
//             </div>
//           </div>

//           <FormInput
//             label="Profile Image"
//             type="file"
//             onChange={(e) =>
//               setFormData({ ...formData, profile_image: e.target.files?.[0] })
//             }
//           />

//           <div className="flex justify-end gap-3 pt-4">
//             <Button
//               type="button"
//               variant="secondary"
//               onClick={closeModal}
//             >
//               Cancel
//             </Button>

//             <Button type="submit">
//               {editingTrainer ? "Update Trainer" : "Create Trainer"}
//             </Button>
//           </div>
//         </form>
//       </Modal>

//       {/* ================= DELETE MODAL — EXACT same as Admin ================= */}
//       <Modal
//         isOpen={deleteModalOpen}
//         onClose={() => setDeleteModalOpen(false)}
//         title="Delete Trainer"
//       >
//         <div className="space-y-4">
//           <p className="text-gray-300">
//             Are you sure you want to delete this trainer?
//           </p>

//           <div className="flex justify-end gap-3">
//             <Button
//               variant="secondary"
//               onClick={() => setDeleteModalOpen(false)}
//             >
//               Cancel
//             </Button>

//             <Button variant="danger" onClick={confirmDelete}>
//               Delete
//             </Button>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// }


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
//   "w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors";
// const selectClass =
//   "w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors";
// const labelClass = "block text-sm text-white mb-1";

// export default function InstituteTrainers() {
//   const [trainers, setTrainers] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [editingTrainer, setEditingTrainer] = useState(null);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [trainerToDelete, setTrainerToDelete] = useState(null);

//   const [categories, setCategories] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);

//   const [formData, setFormData] = useState({
//     full_name: "",
//     email: "",
//     phone_number: "",
//     bio: "",
//     experience_years: "",
//     specialty: "",
//     languages: "",
//     skills: "",
//     certifications: "",
//     response_rate: "",
//     total_students: "",
//     category_id: "",
//     subcategory_id: "",
//     profile_image: null,
//   });

//   const token = localStorage.getItem("token");

//   // --- Filtered trainers ---
//   const filteredTrainers = trainers.filter((t) => {
//     const query = searchQuery.toLowerCase();
//     return (
//       t.full_name?.toLowerCase().includes(query) ||
//       t.specialty?.toLowerCase().includes(query) ||
//       t.bio?.toLowerCase().includes(query) ||
//       t.phone_number?.includes(query) ||
//       t.languages?.toLowerCase().includes(query) ||
//       t.skills?.toLowerCase().includes(query) ||
//       t.certifications?.toLowerCase().includes(query) ||
//       t.categories?.toLowerCase().includes(query) ||
//       t.subcategories?.toLowerCase().includes(query) ||
//       t.approval_status?.toLowerCase().includes(query) ||
//       String(t.id).includes(query) ||
//       String(t.experience_years).includes(query) ||
//       String(t.total_students).includes(query) ||
//       String(t.response_rate).includes(query)
//     );
//   });

//   // --- Image helper ---
//   const getImageUrl = (img) => {
//     if (!img) return "";
//     if (img.startsWith("http")) return img;
//     return `http://localhost:5000${img}`;
//   };

//   // --- Status badge ---
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
//       <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${bg} ${text}`}>
//         {status || "N/A"}
//       </span>
//     );
//   };

//   // --- Fetch ---
//   const fetchTrainers = async () => {
//     try {
//       const res = await getInstituteTrainers(token);
//       setTrainers(res.data?.data || res.data || []);
//     } catch (e) {
//       toast.error(e.response?.data?.message || "Failed to load trainers");
//     }
//   };

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

//   useEffect(() => {
//     fetchTrainers();
//     fetchDropdowns();
//   }, []);

//   // --- Handlers ---
//   const handleCreate = () => {
//     setEditingTrainer(null);
//     setFormData({
//       full_name: "",
//       email: "",
//       phone_number: "",
//       bio: "",
//       experience_years: "",
//       specialty: "",
//       languages: "",
//       skills: "",
//       certifications: "",
//       response_rate: "",
//       total_students: "",
//       category_id: "",
//       subcategory_id: "",
//       profile_image: null,
//     });
//     setShowModal(true);
//   };

//   const handleEdit = (trainer) => {
//     setEditingTrainer(trainer);
//     setFormData({
//       ...trainer,
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
//       await deleteInstituteTrainer(trainerToDelete.id, token);
//       toast.success("Trainer deleted");
//       fetchTrainers();
//       setShowDeleteModal(false);
//       setTrainerToDelete(null);
//     } catch (e) {
//       toast.error(e.response?.data?.message || "Delete failed");
//     }
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setEditingTrainer(null);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const fd = new FormData();
//       Object.entries(formData).forEach(([k, v]) => {
//         if (v !== null && v !== undefined && v !== "") {
//           fd.append(k, v);
//         }
//       });

//       if (editingTrainer) {
//         await updateInstituteTrainer(editingTrainer.id, fd, token);
//         toast.success("Trainer updated successfully");
//       } else {
//         await createInstituteTrainer(fd, token);
//         toast.success("Trainer created successfully");
//       }

//       closeModal();
//       fetchTrainers();
//     } catch (e) {
//       toast.error(e.response?.data?.message || "Operation failed");
//     }
//   };

//   return (
//     <div className="p-8 text-white">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//         <div>
//           <h1 className="text-4xl font-bold text-purple-400">
//             Institute Trainers
//           </h1>
//           <p className="text-white mt-2">Manage institute trainers</p>
//         </div>

//         <button
//           onClick={handleCreate}
//           className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition-opacity"
//         >
//           + Add Trainer
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
//             placeholder="Search trainers..."
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
//                 <th className="p-4 text-left whitespace-nowrap">Image</th>
//                 <th className="p-4 text-left whitespace-nowrap">Name</th>
//                 <th className="p-4 text-left whitespace-nowrap">Specialty</th>
//                 <th className="p-4 text-left whitespace-nowrap">Bio</th>
//                 <th className="p-4 text-left whitespace-nowrap">Experience</th>
//                 <th className="p-4 text-left whitespace-nowrap">Phone</th>
//                 <th className="p-4 text-left whitespace-nowrap">Languages</th>
//                 <th className="p-4 text-left whitespace-nowrap">Skills</th>
//                 <th className="p-4 text-left whitespace-nowrap">Category</th>
//                 <th className="p-4 text-left whitespace-nowrap">Subcategory</th>
//                 <th className="p-4 text-left whitespace-nowrap">Students</th>
//                 <th className="p-4 text-left whitespace-nowrap">Status</th>
//                 <th className="p-4 text-left whitespace-nowrap">Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {filteredTrainers.length === 0 ? (
//                 <tr>
//                   <td colSpan={13} className="p-12 text-center">
//                     <div className="flex flex-col items-center gap-3">
//                       <Search size={40} className="text-gray-600" />
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
//                     <td className="p-4">
//                       {trainer.profile_image ? (
//                         <img
//                           src={getImageUrl(trainer.profile_image)}
//                           alt={trainer.full_name}
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

//                     <td className="p-4 font-medium whitespace-nowrap">
//                       {trainer.full_name}
//                     </td>
//                     <td className="p-4 text-white whitespace-nowrap">
//                       {trainer.specialty || "-"}
//                     </td>
//                     <td className="p-4 text-white max-w-[130px] truncate">
//                       {trainer.bio || "-"}
//                     </td>
//                     <td className="p-4 text-white whitespace-nowrap">
//                       {trainer.experience_years
//                         ? `${trainer.experience_years} yrs`
//                         : "-"}
//                     </td>
//                     <td className="p-4 text-white whitespace-nowrap">
//                       {trainer.phone_number || "-"}
//                     </td>
//                     <td className="p-4 text-white whitespace-nowrap">
//                       {trainer.languages || "-"}
//                     </td>
//                     <td className="p-4 text-white max-w-[130px] truncate">
//                       {trainer.skills || "-"}
//                     </td>
//                     <td className="p-4 text-white whitespace-nowrap">
//                       {trainer.categories || "-"}
//                     </td>
//                     <td className="p-4 text-white whitespace-nowrap">
//                       {trainer.subcategories || "-"}
//                     </td>
//                     <td className="p-4 font-semibold whitespace-nowrap">
//                       {trainer.total_students ?? 0}
//                     </td>
//                     <td className="p-4 whitespace-nowrap">
//                       <StatusBadge status={trainer.approval_status} />
//                     </td>

//                     <td className="p-4">
//                       <div className="flex items-center gap-3">
//                         <button
//                           onClick={() => handleEdit(trainer)}
//                           className="p-2 rounded-lg hover:bg-[#2a2a35] transition-colors group"
//                           title="Edit"
//                         >
//                           <Edit
//                             size={16}
//                             className="text-white group-hover:text-white transition-colors"
//                           />
//                         </button>
//                         <button
//                           onClick={() => handleDeleteClick(trainer)}
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

//       {/* ==================== Add/Edit Trainer Modal ==================== */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
//           <div className="w-full max-w-[650px] max-h-[90vh] bg-[#211c30] rounded-2xl overflow-hidden shadow-2xl">
//             {/* Header */}
//             <div className="flex justify-between items-center p-6 border-b border-[#3a3448]">
//               <h2 className="text-2xl font-bold text-white">
//                 {editingTrainer ? "Edit Trainer" : "Add Trainer"}
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
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className={labelClass}>Full Name</label>
//                     <input
//                       value={formData.full_name}
//                       onChange={(e) =>
//                         setFormData({ ...formData, full_name: e.target.value })
//                       }
//                       className={inputClass}
//                       placeholder="Enter full name"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Email</label>
//                     <input
//                       type="email"
//                       value={formData.email}
//                       onChange={(e) =>
//                         setFormData({ ...formData, email: e.target.value })
//                       }
//                       className={inputClass}
//                       placeholder="Enter email"
//                     />
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className={labelClass}>Phone Number</label>
//                     <input
//                       value={formData.phone_number}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           phone_number: e.target.value,
//                         })
//                       }
//                       className={inputClass}
//                       placeholder="Enter phone number"
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Experience Years</label>
//                     <input
//                       type="number"
//                       value={formData.experience_years}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           experience_years: e.target.value,
//                         })
//                       }
//                       className={inputClass}
//                       placeholder="0"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className={labelClass}>Bio</label>
//                   <textarea
//                     value={formData.bio}
//                     onChange={(e) =>
//                       setFormData({ ...formData, bio: e.target.value })
//                     }
//                     rows="3"
//                     className={inputClass}
//                     placeholder="Enter bio"
//                   />
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className={labelClass}>Specialty</label>
//                     <input
//                       value={formData.specialty}
//                       onChange={(e) =>
//                         setFormData({ ...formData, specialty: e.target.value })
//                       }
//                       className={inputClass}
//                       placeholder="Enter specialty"
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Languages</label>
//                     <input
//                       value={formData.languages}
//                       onChange={(e) =>
//                         setFormData({ ...formData, languages: e.target.value })
//                       }
//                       className={inputClass}
//                       placeholder="e.g. English, Hindi"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className={labelClass}>Skills</label>
//                   <textarea
//                     value={formData.skills}
//                     onChange={(e) =>
//                       setFormData({ ...formData, skills: e.target.value })
//                     }
//                     rows="3"
//                     className={inputClass}
//                     placeholder="Enter skills"
//                   />
//                 </div>

//                 <div>
//                   <label className={labelClass}>Certifications</label>
//                   <textarea
//                     value={formData.certifications}
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         certifications: e.target.value,
//                       })
//                     }
//                     rows="3"
//                     className={inputClass}
//                     placeholder="Enter certifications"
//                   />
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className={labelClass}>Response Rate</label>
//                     <input
//                       value={formData.response_rate}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           response_rate: e.target.value,
//                         })
//                       }
//                       className={inputClass}
//                       placeholder="e.g. 95%"
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Total Students</label>
//                     <input
//                       type="number"
//                       value={formData.total_students}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           total_students: e.target.value,
//                         })
//                       }
//                       className={inputClass}
//                       placeholder="0"
//                     />
//                   </div>
//                 </div>

//                 {/* Category & Subcategory */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className={labelClass}>Category</label>
//                     <select
//                       value={formData.category_id || ""}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           category_id: e.target.value,
//                           subcategory_id: "",
//                         })
//                       }
//                       className={selectClass}
//                     >
//                       <option value="">Select Category</option>
//                       {categories.map((cat) => (
//                         <option key={cat.id} value={cat.id}>
//                           {cat.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div>
//                     <label className={labelClass}>Subcategory</label>
//                     <select
//                       value={formData.subcategory_id || ""}
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
//                         .filter(
//                           (sub) =>
//                             String(sub.category_id) ===
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

//                 {/* Profile Image */}
//                 <div>
//                   <label className={labelClass}>Profile Image</label>
//                   {editingTrainer?.profile_image && (
//                     <img
//                       src={getImageUrl(editingTrainer.profile_image)}
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
//                         profile_image: e.target.files?.[0],
//                       })
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
//                     {editingTrainer ? "Update Trainer" : "Create Trainer"}
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
//                 Delete Trainer
//               </h2>

//               {/* Description */}
//               <p className="text-white text-center text-sm leading-relaxed mb-8">
//                 Are you sure you want to delete this trainer?
//               </p>

//               {/* Buttons */}
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
//   "w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors";
// const selectClass =
//   "w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors";
// const labelClass = "block text-sm text-white mb-1";

// export default function InstituteTrainers() {
//   const [trainers, setTrainers] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [editingTrainer, setEditingTrainer] = useState(null);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [trainerToDelete, setTrainerToDelete] = useState(null);

//   const [categories, setCategories] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);

//   const [formData, setFormData] = useState({
//     full_name: "",
//     email: "",
//     phone_number: "",
//     bio: "",
//     experience_years: "",
//     specialty: "",
//     languages: "",
//     skills: "",
//     certifications: "",
//     response_rate: "",
//     total_students: "",
//     category_id: "",
//     subcategory_id: "",
//     profile_image: null,
//   });

//   const token = localStorage.getItem("token");

//   // Updated total column count (16 columns exactly like Admin)
//   const totalColumns = 16;

//   // --- Filtered trainers ---
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
//       t.certifications?.toLowerCase().includes(query) ||
//       t.response_rate?.toLowerCase().includes(query) ||
//       t.categories?.toLowerCase().includes(query) ||
//       t.subcategories?.toLowerCase().includes(query) ||
//       t.approval_status?.toLowerCase().includes(query) ||
//       String(t.id).includes(query) ||
//       String(t.experience_years).includes(query) ||
//       String(t.total_students).includes(query)
//     );
//   });

//   // --- Image helper ---
//   const getImageUrl = (img) => {
//     if (!img) return "";
//     if (img.startsWith("http")) return img;
//     return `http://localhost:5000${img}`;
//   };

//   // --- Status badge ---
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
//       <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${bg} ${text}`}>
//         {status || "N/A"}
//       </span>
//     );
//   };

//   // --- Fetch ---
//   const fetchTrainers = async () => {
//     try {
//       const res = await getInstituteTrainers(token);
//       setTrainers(res.data?.data || res.data || []);
//     } catch (e) {
//       toast.error(e.response?.data?.message || "Failed to load trainers");
//     }
//   };

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

//   useEffect(() => {
//     fetchTrainers();
//     fetchDropdowns();
//   }, []);

//   // --- Handlers ---
//   const handleCreate = () => {
//     setEditingTrainer(null);
//     setFormData({
//       full_name: "",
//       email: "",
//       phone_number: "",
//       bio: "",
//       experience_years: "",
//       specialty: "",
//       languages: "",
//       skills: "",
//       certifications: "",
//       response_rate: "",
//       total_students: "",
//       category_id: "",
//       subcategory_id: "",
//       profile_image: null,
//     });
//     setShowModal(true);
//   };

//   const handleEdit = (trainer) => {
//     setEditingTrainer(trainer);
//     setFormData({
//       ...trainer,
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
//       await deleteInstituteTrainer(trainerToDelete.id, token);
//       toast.success("Trainer deleted");
//       fetchTrainers();
//       setShowDeleteModal(false);
//       setTrainerToDelete(null);
//     } catch (e) {
//       toast.error(e.response?.data?.message || "Delete failed");
//     }
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setEditingTrainer(null);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const fd = new FormData();
//       Object.entries(formData).forEach(([k, v]) => {
//         if (v !== null && v !== undefined && v !== "") {
//           fd.append(k, v);
//         }
//       });

//       if (editingTrainer) {
//         await updateInstituteTrainer(editingTrainer.id, fd, token);
//         toast.success("Trainer updated successfully");
//       } else {
//         await createInstituteTrainer(fd, token);
//         toast.success("Trainer created successfully");
//       }

//       closeModal();
//       fetchTrainers();
//     } catch (e) {
//       toast.error(e.response?.data?.message || "Operation failed");
//     }
//   };

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
//           <h1 className="text-4xl font-bold text-purple-400">
//             Institute Trainers
//           </h1>
//           <p className="text-white mt-2">Manage institute trainers</p>
//         </div>

//         <button
//           onClick={handleCreate}
//           className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition-opacity"
//         >
//           + Add Trainer
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
//             placeholder="Search trainers..."
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
//      <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl overflow-hidden">
//   <div className="overflow-auto max-h-[500px] custom-table-scroll">
//     <table className="w-full min-w-[1600px]">
//             <thead className="bg-[#202027] text-white">
//               <tr>
//                 <th className="p-4 text-left whitespace-nowrap">Image</th>
//                 <th className="p-4 text-left whitespace-nowrap">Name</th>
//                 <th className="p-4 text-left whitespace-nowrap">Email</th>
//                 <th className="p-4 text-left whitespace-nowrap">Specialty</th>
//                 <th className="p-4 text-left whitespace-nowrap">Bio</th>
//                 <th className="p-4 text-left whitespace-nowrap">Experience</th>
//                 <th className="p-4 text-left whitespace-nowrap">Phone</th>
//                 <th className="p-4 text-left whitespace-nowrap">Languages</th>
//                 <th className="p-4 text-left whitespace-nowrap">Skills</th>
//                 <th className="p-4 text-left whitespace-nowrap">Certifications</th>
//                 <th className="p-4 text-left whitespace-nowrap">Response Rate</th>
//                 <th className="p-4 text-left whitespace-nowrap">Category</th>
//                 <th className="p-4 text-left whitespace-nowrap">Subcategory</th>
//                 <th className="p-4 text-left whitespace-nowrap">Students</th>
//                 <th className="p-4 text-left whitespace-nowrap">Status</th>
//                 <th className="p-4 text-left whitespace-nowrap">Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {filteredTrainers.length === 0 ? (
//                 <tr>
//                   <td colSpan={totalColumns} className="p-12 text-center">
//                     <div className="flex flex-col items-center gap-3">
//                       <Search size={40} className="text-gray-600" />
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
//                     <td className="p-4">
//                       {trainer.profile_image ? (
//                         <img
//                           src={getImageUrl(trainer.profile_image)}
//                           alt={trainer.full_name}
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

//                     <td className="p-4 font-medium whitespace-nowrap">
//                       {trainer.full_name}
//                     </td>

//                     {/* EXACT ADMIN EMAIL STYLE */}
//                     <td className="p-4 text-white whitespace-nowrap">
//                       {trainer.email ? (
//                         <span className="text-purple-300/80 hover:text-purple-300 transition-colors" title={trainer.email}>
//                           {trainer.email.length > 22
//                             ? trainer.email.substring(0, 22) + "..."
//                             : trainer.email}
//                         </span>
//                       ) : (
//                         "-"
//                       )}
//                     </td>

//                     <td className="p-4 text-white whitespace-nowrap">
//                       {trainer.specialty || "-"}
//                     </td>
//                     <td className="p-4 text-white max-w-[130px] truncate">
//                       {trainer.bio || "-"}
//                     </td>
//                     <td className="p-4 text-white whitespace-nowrap">
//                       {trainer.experience_years
//                         ? `${trainer.experience_years} yrs`
//                         : "-"}
//                     </td>
//                     <td className="p-4 text-white whitespace-nowrap">
//                       {trainer.phone_number || "-"}
//                     </td>
//                     <td className="p-4 text-white whitespace-nowrap">
//                       {trainer.languages || "-"}
//                     </td>
//                     <td className="p-4 text-white max-w-[130px] truncate">
//                       {trainer.skills || "-"}
//                     </td>

//                     {/* EXACT ADMIN CERTIFICATIONS STYLE (BLUE DOT) */}
//                     <td className="p-4 text-white max-w-[140px] truncate" title={trainer.certifications || ""}>
//                       {trainer.certifications ? (
//                         <span className="inline-flex items-center gap-1.5">
//                           <span className="w-1.5 h-1.5 rounded-full bg-blue-400/70 shrink-0"></span>
//                           {trainer.certifications.length > 20
//                             ? trainer.certifications.substring(0, 20) + "..."
//                             : trainer.certifications}
//                         </span>
//                       ) : (
//                         "-"
//                       )}
//                     </td>

//                     {/* EXACT ADMIN RESPONSE RATE STYLE (CONDITIONAL BADGE) */}
//                     <td className="p-4 whitespace-nowrap">
//                       {trainer.response_rate ? (
//                         <span
//                           className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
//                             parseInt(trainer.response_rate) >= 80
//                               ? "bg-green-500/20 text-green-400"
//                               : parseInt(trainer.response_rate) >= 50
//                               ? "bg-yellow-500/20 text-yellow-400"
//                               : "bg-red-500/20 text-red-400"
//                           }`}
//                         >
//                           {trainer.response_rate}
//                         </span>
//                       ) : (
//                         <span className="text-gray-500">-</span>
//                       )}
//                     </td>

//                     <td className="p-4 text-white whitespace-nowrap">
//                       {trainer.categories || "-"}
//                     </td>
//                     <td className="p-4 text-white whitespace-nowrap">
//                       {trainer.subcategories || "-"}
//                     </td>
//                     <td className="p-4 font-semibold whitespace-nowrap">
//                       {trainer.total_students ?? 0}
//                     </td>
//                     <td className="p-4 whitespace-nowrap">
//                       <StatusBadge status={trainer.approval_status} />
//                     </td>

//                     <td className="p-4">
//                       <div className="flex items-center gap-2">
//                         <button
//                           onClick={() => handleEdit(trainer)}
//                           className="p-2 rounded-lg hover:bg-[#2a2a35] transition-colors group"
//                           title="Edit"
//                         >
//                           <Edit
//                             size={16}
//                             className="text-white group-hover:text-white transition-colors"
//                           />
//                         </button>
//                         <button
//                           onClick={() => handleDeleteClick(trainer)}
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

//       {/* ==================== Add/Edit Trainer Modal ==================== */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
//           <div className="w-full max-w-[650px] max-h-[90vh] bg-[#211c30] rounded-2xl overflow-hidden shadow-2xl">
//             {/* Header */}
//             <div className="flex justify-between items-center p-6 border-b border-[#3a3448]">
//               <h2 className="text-2xl font-bold text-white">
//                 {editingTrainer ? "Edit Trainer" : "Add Trainer"}
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
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className={labelClass}>Full Name</label>
//                     <input
//                       value={formData.full_name}
//                       onChange={(e) =>
//                         setFormData({ ...formData, full_name: e.target.value })
//                       }
//                       className={inputClass}
//                       placeholder="Enter full name"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Email</label>
//                     <input
//                       type="email"
//                       value={formData.email}
//                       onChange={(e) =>
//                         setFormData({ ...formData, email: e.target.value })
//                       }
//                       className={inputClass}
//                       placeholder="Enter email"
//                     />
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className={labelClass}>Phone Number</label>
//                     <input
//                       value={formData.phone_number}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           phone_number: e.target.value,
//                         })
//                       }
//                       className={inputClass}
//                       placeholder="Enter phone number"
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Experience Years</label>
//                     <input
//                       type="number"
//                       value={formData.experience_years}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           experience_years: e.target.value,
//                         })
//                       }
//                       className={inputClass}
//                       placeholder="0"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className={labelClass}>Bio</label>
//                   <textarea
//                     value={formData.bio}
//                     onChange={(e) =>
//                       setFormData({ ...formData, bio: e.target.value })
//                     }
//                     rows="3"
//                     className={inputClass}
//                     placeholder="Enter bio"
//                   />
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className={labelClass}>Specialty</label>
//                     <input
//                       value={formData.specialty}
//                       onChange={(e) =>
//                         setFormData({ ...formData, specialty: e.target.value })
//                       }
//                       className={inputClass}
//                       placeholder="Enter specialty"
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Languages</label>
//                     <input
//                       value={formData.languages}
//                       onChange={(e) =>
//                         setFormData({ ...formData, languages: e.target.value })
//                       }
//                       className={inputClass}
//                       placeholder="e.g. English, Hindi"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className={labelClass}>Skills</label>
//                   <textarea
//                     value={formData.skills}
//                     onChange={(e) =>
//                       setFormData({ ...formData, skills: e.target.value })
//                     }
//                     rows="3"
//                     className={inputClass}
//                     placeholder="Enter skills"
//                   />
//                 </div>

//                 <div>
//                   <label className={labelClass}>Certifications</label>
//                   <textarea
//                     value={formData.certifications}
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         certifications: e.target.value,
//                       })
//                     }
//                     rows="3"
//                     className={inputClass}
//                     placeholder="Enter certifications"
//                   />
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className={labelClass}>Response Rate</label>
//                     <input
//                       value={formData.response_rate}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           response_rate: e.target.value,
//                         })
//                       }
//                       className={inputClass}
//                       placeholder="e.g. 95%"
//                     />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Total Students</label>
//                     <input
//                       type="number"
//                       value={formData.total_students}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           total_students: e.target.value,
//                         })
//                       }
//                       className={inputClass}
//                       placeholder="0"
//                     />
//                   </div>
//                 </div>

//                 {/* Category & Subcategory */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className={labelClass}>Category</label>
//                     <select
//                       value={formData.category_id || ""}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           category_id: e.target.value,
//                           subcategory_id: "",
//                         })
//                       }
//                       className={selectClass}
//                     >
//                       <option value="">Select Category</option>
//                       {categories.map((cat) => (
//                         <option key={cat.id} value={cat.id}>
//                           {cat.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div>
//                     <label className={labelClass}>Subcategory</label>
//                     <select
//                       value={formData.subcategory_id || ""}
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
//                         .filter(
//                           (sub) =>
//                             String(sub.category_id) ===
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

//                 {/* Profile Image */}
//                 <div>
//                   <label className={labelClass}>Profile Image</label>
//                   {editingTrainer?.profile_image && (
//                     <img
//                       src={getImageUrl(editingTrainer.profile_image)}
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
//                         profile_image: e.target.files?.[0],
//                       })
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
//                     {editingTrainer ? "Update Trainer" : "Create Trainer"}
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
//                 Delete Trainer
//               </h2>

//               {/* Description */}
//               <p className="text-white text-center text-sm leading-relaxed mb-8">
//                 Are you sure you want to delete this trainer?
//               </p>

//               {/* Buttons */}
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
  "w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors";
const selectClass =
  "w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors";
const labelClass = "block text-sm text-white mb-1";

export default function InstituteTrainers() {
  const [trainers, setTrainers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingTrainer, setEditingTrainer] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [trainerToDelete, setTrainerToDelete] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

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
    total_reviews : "",
    certifications: "",
    response_rate: "",
    total_students: "",
    category_id: "",
    subcategory_id: "",
    profile_image: null,
  });

  const token = localStorage.getItem("token");

  const totalColumns = 16;

  // --- Filtered trainers ---
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
      String(t.rating).includes(query) ||
      String(t.total_reviews ).includes(query) ||
      t.certifications?.toLowerCase().includes(query) ||
      t.response_rate?.toLowerCase().includes(query) ||
      t.categories?.toLowerCase().includes(query) ||
      t.subcategories?.toLowerCase().includes(query) ||
      t.approval_status?.toLowerCase().includes(query) ||
      String(t.id).includes(query) ||
      String(t.experience_years).includes(query)
    );
  });

  // --- Image helper ---
  const getImageUrl = (img) => {
    if (!img) return "";
    if (img.startsWith("http")) return img;
    return `http://localhost:5000${img}`;
  };

  // --- Status badge ---
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

  const fetchTrainers = async () => {
  try {
    const res = await getInstituteTrainers(token);

    console.log("API Response:", res);

    setTrainers(res.data);

  } catch (e) {
    toast.error(
      e.response?.data?.message || "Failed to load trainers"
    );
  }
};

  const fetchDropdowns = async () => {
    try {
      const [catRes, subRes] = await Promise.all([
        API.get("/categories"),
        API.get("/subcategories"),
      ]);
      setCategories(catRes.data.data || []);
      setSubcategories(subRes.data.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTrainers();
    fetchDropdowns();
  }, []);

  // --- Handlers ---
  const handleCreate = () => {
    setEditingTrainer(null);
    setFormData({
      full_name: "",
      email: "",
      phone_number: "",
      bio: "",
      experience_years: "",
      specialty: "",
      languages: "",
      skills: "",
      rating: "",
      total_reviews : "",
      certifications: "",
      response_rate: "",
      total_students: "",
      category_id: "",
      subcategory_id: "",
      profile_image: null,
    });
    setShowModal(true);
  };

  const handleEdit = (trainer) => {
    setEditingTrainer(trainer);
    setFormData({
      ...trainer,
      rating: trainer.rating || "",
      total_reviews : trainer.total_reviews  || "",
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
      await deleteInstituteTrainer(trainerToDelete.id, token);
      toast.success("Trainer deleted");
      fetchTrainers();
      setShowDeleteModal(false);
      setTrainerToDelete(null);
    } catch (e) {
      toast.error(e.response?.data?.message || "Delete failed");
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingTrainer(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      Object.entries(formData).forEach(([k, v]) => {
        if (v !== null && v !== undefined && v !== "") {
          fd.append(k, v);
        }
      });

      if (editingTrainer) {
        await updateInstituteTrainer(editingTrainer.id, fd, token);
        toast.success("Trainer updated successfully");
      } else {
        await createInstituteTrainer(fd, token);
        toast.success("Trainer created successfully");
      }

      closeModal();
      fetchTrainers();
    } catch (e) {
      toast.error(e.response?.data?.message || "Operation failed");
    }
  };

  return (
    <div className="p-8 text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-4xl font-bold text-purple-400">
            Institute Trainers
          </h1>
          <p className="text-white mt-2">Manage Institute Trainers</p>
        </div>

        <button
          onClick={handleCreate}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition-opacity"
        >
          + Add Trainer
        </button>
      </div>

      {/* Full-width Search Bar */}
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
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-10 py-3.5 rounded-xl bg-[#151519] border border-[#2c2c35] text-white placeholder-white focus:outline-none focus:border-purple-500/60 transition-colors text-sm"
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
            <thead className="bg-[#202027] text-white">
              <tr>
                <th className="p-4 text-left whitespace-nowrap">Image</th>
                <th className="p-4 text-left whitespace-nowrap">Name</th>
                <th className="p-4 text-left whitespace-nowrap">Email</th>
                <th className="p-4 text-left whitespace-nowrap">Bio</th>
                <th className="p-4 text-left whitespace-nowrap">Experience</th>
                <th className="p-4 text-left whitespace-nowrap">Phone</th>
                <th className="p-4 text-left whitespace-nowrap">Languages</th>
                <th className="p-4 text-left whitespace-nowrap">Certifications</th>
                <th className="p-4 text-left whitespace-nowrap">Response Rate</th>
                <th className="p-4 text-left whitespace-nowrap">Category</th>
                <th className="p-4 text-left whitespace-nowrap">Subcategory</th>
                <th className="p-4 text-left whitespace-nowrap">Students</th>
                <th className="p-4 text-left whitespace-nowrap">Rating</th>
                <th className="p-4 text-left whitespace-nowrap">Reviews</th>
                <th className="p-4 text-left whitespace-nowrap">Status</th>
                <th className="p-4 text-left whitespace-nowrap">Actions</th>
              </tr>
            </thead>

            <tbody>
              {console.log(filteredTrainers)}
              {filteredTrainers.length === 0 ? (

                <tr>
                  <td colSpan={totalColumns} className="p-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <Search size={40} className="text-gray-600" />
                      <p className="text-gray-500 text-lg">
                        {searchQuery
                          ? "No trainers found matching your search"
                          : "No trainers available"}
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
                filteredTrainers.map((trainer) => (
                  <tr
                    key={trainer.id}
                    className="border-t border-[#2c2c35] hover:bg-[#1a1a20] transition-colors"
                  >
                    <td className="p-4">
                      {trainer.profile_image ? (
                        <img
                          src={getImageUrl(trainer.profile_image)}
                          alt={trainer.full_name}
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

                    <td className="p-4 font-medium whitespace-nowrap">
                      {trainer.full_name}
                    </td>

                    <td className="p-4 text-white whitespace-nowrap">
                      {trainer.email }
                        
                     
                    </td>

                    <td className="p-4 text-white max-w-[130px] truncate">
                      {trainer.bio || "-"}
                    </td>
                    <td className="p-4 text-white whitespace-nowrap">
                      {trainer.experience_years
                        ? `${trainer.experience_years} yrs`
                        : "-"}
                    </td>
                    <td className="p-4 text-white whitespace-nowrap">
                      {trainer.phone_number || "-"}
                    </td>
                    <td className="p-4 text-white whitespace-nowrap">
                      {trainer.languages || "-"}
                    </td>

                    <td
                      className="p-4 text-white max-w-[140px] truncate">
                     {trainer.certifications || ""}
                  
                     
                    </td>

                    <td className="p-4 whitespace-nowrap">
                      {trainer.response_rate }
                       
                    
                    </td>

                    <td className="p-4 text-white whitespace-nowrap">
                      {trainer.categories || "-"}
                    </td>
                    <td className="p-4 text-white whitespace-nowrap">
                      {trainer.subcategories || "-"}
                    </td>
                    <td className="p-4 font-semibold whitespace-nowrap">
                      {trainer.total_students ?? 0}
                    </td>

                    <td className="p-4 font-semibold whitespace-nowrap">
                      {trainer.rating
                        ? Math.round(Number(trainer.rating))
                        : "-"}
                    </td>

                    <td className="p-4 font-semibold whitespace-nowrap">
                      {trainer.total_reviews  ?? "-"}
                    </td>

                    <td className="p-4 whitespace-nowrap">
                      <StatusBadge status={trainer.approval_status} />
                    </td>

                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(trainer)}
                          className="p-2 rounded-lg hover:bg-[#2a2a35] transition-colors group"
                          title="Edit"
                        >
                          <Edit
                            size={16}
                            className="text-white group-hover:text-white transition-colors"
                          />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(trainer)}
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

      {/* ==================== Add/Edit Trainer Modal ==================== */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="w-full max-w-[650px] max-h-[90vh] bg-[#211c30] rounded-2xl overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-[#3a3448]">
              <h2 className="text-2xl font-bold text-white">
                {editingTrainer ? "Edit Trainer" : "Add Trainer"}
              </h2>
              <button
                onClick={closeModal}
                className="text-white hover:text-white transition-colors"
              >
                <FaTimes size={20} />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="overflow-y-auto max-h-[75vh] p-6">
              <form onSubmit={handleSubmit} className="space-y-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Full Name</label>
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
                  <div>
                    <label className={labelClass}>Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          email: e.target.value,
                        })
                      }
                      className={inputClass}
                      placeholder="Enter email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Phone Number</label>
                    <input
                      value={formData.phone_number}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phone_number: e.target.value,
                        })
                      }
                      className={inputClass}
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Experience Years</label>
                    <input
                      type="number"
                      value={formData.experience_years}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          experience_years: e.target.value,
                        })
                      }
                      className={inputClass}
                      placeholder="0"
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Bio</label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) =>
                      setFormData({ ...formData, bio: e.target.value })
                    }
                    rows="3"
                    className={inputClass}
                    placeholder="Enter bio"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Languages</label>
                    <input
                      value={formData.languages}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          languages: e.target.value,
                        })
                      }
                      className={inputClass}
                      placeholder="e.g. English, Hindi"
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Certifications</label>
                  <textarea
                    value={formData.certifications}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        certifications: e.target.value,
                      })
                    }
                    rows="3"
                    className={inputClass}
                    placeholder="Enter certifications"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Response Rate</label>
                    <input
                      value={formData.response_rate}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          response_rate: e.target.value,
                        })
                      }
                      className={inputClass}
                      placeholder="e.g. 95%"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Total Students</label>
                    <input
                      type="number"
                      value={formData.total_students}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          total_students: e.target.value,
                        })
                      }
                      className={inputClass}
                      placeholder="0"
                    />
                  </div>
                </div>

                {/* Rating & Reviews */}
                <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Rating</label>
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
                  <div>
                    <label className={labelClass}>Reviews</label>
                    <input
                      type="number"
                      value={formData.total_reviews }
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          total_reviews : e.target.value,
                        })
                      }
                      className={inputClass}
                      placeholder="0"
                    />
                  </div>
                </div>

                {/* Category & Subcategory */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Category</label>
                    <select
                      value={formData.category_id || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          category_id: e.target.value,
                          subcategory_id: "",
                        })
                      }
                      className={selectClass}
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Subcategory</label>
                    <select
                      value={formData.subcategory_id || ""}
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
                        .filter(
                          (sub) =>
                            String(sub.category_id) ===
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

                {/* Profile Image */}
                <div>
                  <label className={labelClass}>Profile Image</label>
                  {editingTrainer?.profile_image && (
                    <img
                      src={getImageUrl(editingTrainer.profile_image)}
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
                        profile_image: e.target.files?.[0],
                      })
                    }
                    className="w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-500/20 file:text-purple-300 hover:file:bg-purple-500/30"
                  />
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

      {/* ==================== Delete Confirmation Modal ==================== */}
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