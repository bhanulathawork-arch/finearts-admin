
// import { useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";

// import {
//   HiPencil,
//   HiTrash,
//   HiCheckCircle,
//   HiXCircle,
//   HiPlus,
// } from "react-icons/hi";
// import API from "../services/api";
// import DataTable from "../components/ui/DataTable";
// import Modal from "../components/ui/Modal";
// import Button from "../components/ui/Button";
// import Badge from "../components/ui/Badge";
// import FormInput from "../components/ui/FormInput";

// import {
//   getAllInstitutes,
//   getPendingInstitutes,
//   getApprovedInstitutes,
//   getRejectedInstitutes,
//   adminCreateInstitute,
//   updateInstitute,
//   updateInstituteApproval,
//   deleteInstitute,
// } from "../services/instituteService";

// export default function Institutes() {
//   const [institutes, setInstitutes] = useState([]);

//   const location = useLocation();

//   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [editingInstitute, setEditingInstitute] = useState(null);

//   const [deleteModal, setDeleteModal] = useState({
//     open: false,
//     institute: null,
//   });
//   const [categories, setCategories] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);
  
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     email: "",
//     phone_number: "",
//     city: "",
//     state: "",
//     timing: "",
//     rating: "",
//     reviews: "",
//     distance: "",
//     courses: "",
//     category_id: "",
//     subcategory_id: "",
//     image: null,
//   });

//   const token = localStorage.getItem("adminToken");
//   console.log("ADMIN TOKEN FROM INSTITUTES:", token);

//   /* FETCH */
//   const fetchInstitutes = async () => {
//     try {
//       let response;

//       if (location.pathname === "/institutes/pending") {
//         response = await getPendingInstitutes(token);
//       } else if (location.pathname === "/institutes/rejected") {
//         response = await getRejectedInstitutes(token);
//       } else {
//         response = await getAllInstitutes();
//       }

//       setInstitutes(response?.data || []);
//     } catch (e) {
//       console.error(e);
//       toast.error(
//         e?.response?.data?.message || "Failed to fetch institutes"
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

//   // FIX: Added "|| [] safety check in case institutes is briefly undefined
//   const filteredInstitutes = (institutes || []).filter((institute) => {
//     const status = institute?.approval_status?.toUpperCase();

//     if (location.pathname === "/institutes") {
//       return true;
//     }

//     if (location.pathname === "/institutes/pending") {
//       return status === "PENDING";
//     }

//     if (location.pathname === "/institutes/rejected") {
//       return status === "REJECTED";
//     }

//     return true;
//   });

//   useEffect(() => {
//     fetchInstitutes();
//     fetchDropdowns();
//   }, [location.pathname]);

//   /* APPROVE */
//   const handleApprove = async (institute) => {
//     try {
//       await updateInstituteApproval(
//         institute.id,
//         "APPROVED",
//         token
//       );

//       toast.success("Institute approved successfully");
//       fetchInstitutes();
//     } catch (e) {
//       console.error(e);
//       toast.error(e?.response?.data?.message || "Approval failed");
//     }
//   };

//   /* DELETE */
//   const handleDelete = async () => {
//     try {
//       await deleteInstitute(deleteModal.institute.id, token);
//       toast.success("Institute deleted");
//       setDeleteModal({
//         open: false,
//         institute: null,
//       });
//       fetchInstitutes();
//     } catch (e) {
//       toast.error(e?.response?.data?.message || "Delete failed");
//     }
//   };

//   /* CREATE */
//   const handleCreate = async (e) => {
//     e.preventDefault();

//     console.log("TOKEN INSIDE HANDLE CREATE:", token);
//     console.log(
//       "LOCAL STORAGE TOKEN:",
//       localStorage.getItem("adminToken")
//     );
//     try {
//       const payload = new FormData();
//       payload.append("name", formData.name);
//       payload.append("description", formData.description);
//       payload.append("email", formData.email);
//       payload.append("phone_number", formData.phone_number);
//       payload.append("city", formData.city);
//       payload.append("state", formData.state);
//       payload.append("timing", formData.timing);
//       payload.append("rating", formData.rating);
//       payload.append("reviews", formData.reviews);
//       payload.append("distance", formData.distance);
//       payload.append("courses", formData.courses);
//       payload.append("category_id", formData.category_id);
//       payload.append("subcategory_id", formData.subcategory_id);

//       if (formData.image) {
//         payload.append("image", formData.image);
//       }

//       await adminCreateInstitute(payload, token);

//       toast.success("Institute created successfully");
//       setIsCreateModalOpen(false);
//       fetchInstitutes();
//     } catch (e) {
//       toast.error(e?.response?.data?.message || "Create failed");
//     }
//   };

//   /* EDIT */
//   const handleEdit = (institute) => {
//     setEditingInstitute(institute);
//     setFormData({
//       name: institute.name || "",
//       description: institute.description || "",
//       email: institute.email || "",
//       phone_number: institute.phone_number || "",
//       city: institute.city || "",
//       state: institute.state || "",
//       timing: institute.timing || "",
//       rating: institute.rating || "",
//       reviews: institute.reviews || "",
//       distance: institute.distance || "",
//       courses: institute.courses || "",
//       category_id: institute.category_id || "",
//       subcategory_id: institute.subcategory_id || "",
//       image: null,
//     });
//     setIsEditModalOpen(true);
//   };

//   /* UPDATE */
//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       const payload = new FormData();
//       Object.keys(formData).forEach((key) => {
//         if (formData[key] !== null && formData[key] !== "") {
//           payload.append(key, formData[key]);
//         }
//       });

//       await updateInstitute(editingInstitute.id, payload, token);

//       toast.success("Institute updated successfully");
//       setIsEditModalOpen(false);
//       fetchInstitutes();
//     } catch (e) {
//       toast.error(e?.response?.data?.message || "Update failed");
//     }
//   };

//   const columns = [
//     {
//       key: "image_url",
//       label: "Image",
//       sortable: false,
//       render: (_, row) => (
//         <img
//           src={row.image_url || "https://via.placeholder.com/60"}
//           alt={row.name}
//           className="w-14 h-14 rounded-xl object-cover"
//         />
//       ),
//     },
//     {
//       key: "name",
//       label: "Name",
//     },
//     {
//       key: "description",
//       label: "Description",
//       render: (value) => (
//         <div className="max-w-[250px] truncate">{value}</div>
//       ),
//     },
//    {
//   key: "email",
//   label: "Email",
// },
//     {
//       key: "phone_number",
//       label: "Phone Number",
//     },
//     {
//       key: "city",
//       label: "City",
//     },
//     {
//       key: "state",
//       label: "State",
//     },
//     {
//       key: "timing",
//       label: "Timing",
//     },
//     {
//       key: "rating",
//       label: "Rating",
//     },
//     {
//       key: "reviews",
//       label: "Reviews",
//     },
//     {
//       key: "distance",
//       label: "Distance",
//     },
//     {
//       key: "courses",
//       label: "Courses",
//     },
//     {
//       key: "category",
//       label: "Category",
//       render: (_, row) =>
//         row.categories?.length
//           ? row.categories
//               .map((c) => c.category_name)
//               .filter(Boolean)
//               .join(", ")
//           : "-",
//     },
//     {
//       key: "subcategory",
//       label: "Subcategory",
//       render: (_, row) =>
//         row.categories?.length
//           ? row.categories
//               .map((c) => c.subcategory_name)
//               .filter(Boolean)
//               .join(", ")
//           : "-",
//     },
//     {
//       key: "approval_status",
//       label: "Status",
//       render: (value) => (
//         <Badge variant={value?.toLowerCase() || "pending"}>
//           {value || "Pending"}
//         </Badge>
//       ),
//     },
//   ];

//   const handleReject = async (institute) => {
//     try {
//       await updateInstituteApproval(
//         institute.id,
//         "REJECTED",
//         token
//       );

//       toast.success("Institute rejected");
//       fetchInstitutes();
//     } catch (e) {
//       toast.error(
//         e?.response?.data?.message ||
//         "Reject failed"
//       );
//     }
//   };

//   return (
//     <div className="space-y-6 animate-slide-up">
//       {/* HEADER */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold gradient-text">Institutes</h1>
//           <p className="text-gray-400 mt-1">Manage all institutes</p>
//         </div>

//         <Button
//           icon={HiPlus}
//           onClick={() => {
//             setFormData({
//               name: "",
//               description: "",
//               email: "",
//               phone_number: "",
//               city: "",
//               state: "",
//               timing: "",
//               rating: "",
//               reviews: "",
//               distance: "",
//               courses: "",
//               category_id: "",
//               subcategory_id: "",
//               image: null,
//             });
//             setIsCreateModalOpen(true);
//           }}
//         >
//           Add Institute
//         </Button>
//       </div>

//       {/* TABLE */}
//       <DataTable
//         columns={columns}
//         data={filteredInstitutes}
//         actions={(row) => (
//           <div className="flex items-center gap-2">

//             {/* APPROVE */}
//             {row.approval_status === "PENDING" && (
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 icon={HiCheckCircle}
//                 className="text-green-500 hover:text-green-400"
//                 onClick={() => handleApprove(row)}
//               />
//             )}

//             {/* REJECT */}
//             {row.approval_status === "PENDING" && (
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 icon={HiXCircle}
//                 className="text-red-500 hover:text-red-400"
//                 onClick={() => handleReject(row)}
//               />
//             )}

//             {/* EDIT */}
//             <Button
//               variant="ghost"
//               size="sm"
//               icon={HiPencil}
//               className="text-blue-400 hover:text-blue-300"
//               onClick={() => handleEdit(row)}
//             />

//             {/* DELETE */}
//             <Button
//               variant="ghost"
//               size="sm"
//               icon={HiTrash}
//               className="text-red-400 hover:text-red-300"
//               onClick={() =>
//                 setDeleteModal({
//                   open: true,
//                   institute: row,
//                 })
//               }
//             />
//           </div>
//         )}
//       />

//       {/* CREATE MODAL */}
//       <Modal
//         isOpen={isCreateModalOpen}
//         onClose={() => setIsCreateModalOpen(false)}
//         title="Create Institute"
//       >
//         <form onSubmit={handleCreate} className="space-y-4">

//           <FormInput
//             label="Institute Name"
//             value={formData.name}
//             onChange={(e) =>
//               setFormData({
//                 ...formData,
//                 name: e.target.value,
//               })
//             }
//           />

//           <FormInput
//             label="Description"
//             type="textarea"
//             value={formData.description}
//             onChange={(e) =>
//               setFormData({
//                 ...formData,
//                 description: e.target.value,
//               })
//             }
//           />

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

//             <FormInput
//               label="Email"
//               value={formData.email}
//               onChange={(e) =>
//                 setFormData({
//                   ...formData,
//                   email: e.target.value,
//                 })
//               }
//             />

//             <FormInput
//               label="Phone"
//               value={formData.phone_number}
//               onChange={(e) =>
//                 setFormData({
//                   ...formData,
//                   phone_number: e.target.value,
//                 })
//               }
//             />

//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

//             <FormInput
//               label="City"
//               value={formData.city}
//               onChange={(e) =>
//                 setFormData({
//                   ...formData,
//                   city: e.target.value,
//                 })
//               }
//             />

//             <FormInput
//               label="State"
//               value={formData.state}
//               onChange={(e) =>
//                 setFormData({
//                   ...formData,
//                   state: e.target.value,
//                 })
//               }
//             />

//             <FormInput
//               label="Timing"
//               value={formData.timing}
//               onChange={(e) =>
//                 setFormData({
//                   ...formData,
//                   timing: e.target.value,
//                 })
//               }
//             />

//           </div>

//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

//             <FormInput
//               label="Rating"
//               type="number"
//               step="0.1"
//               value={formData.rating}
//               onChange={(e) =>
//                 setFormData({
//                   ...formData,
//                   rating: e.target.value,
//                 })
//               }
//             />

//             <FormInput
//               label="Reviews"
//               type="number"
//               value={formData.reviews}
//               onChange={(e) =>
//                 setFormData({
//                   ...formData,
//                   reviews: e.target.value,
//                 })
//               }
//             />

//             <FormInput
//               label="Distance"
//               value={formData.distance}
//               onChange={(e) =>
//                 setFormData({
//                   ...formData,
//                   distance: e.target.value,
//                 })
//               }
//             />

//             <FormInput
//               label="Courses"
//               type="number"
//               value={formData.courses}
//               onChange={(e) =>
//                 setFormData({
//                   ...formData,
//                   courses: e.target.value,
//                 })
//               }
//             />

//           </div>

//           {/* Category & Subcategory */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

//             <div>
//               <label className="block text-sm font-medium text-white mb-2">
//                 Category
//               </label>

//               <select
//                 value={formData.category_id}
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
//                 value={formData.subcategory_id}
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

//           {/* Institute Image */}
//           <div>
//             <label className="block text-sm font-medium text-white mb-2">
//               Institute Image
//             </label>

//             <input
//               type="file"
//               accept="image/*"
//               onChange={(e) =>
//                 setFormData({
//                   ...formData,
//                   image: e.target.files[0],
//                 })
//               }
//               className="block w-full text-sm text-white
//               file:mr-4
//               file:py-2
//               file:px-4
//               file:rounded-lg
//               file:border-0
//               file:bg-purple-600
//               file:text-white
//               hover:file:bg-purple-700"
//             />
//           </div>

//           <div className="flex justify-end gap-3 pt-4">

//             <Button
//               type="button"
//               variant="secondary"
//               onClick={() => setIsCreateModalOpen(false)}
//             >
//               Cancel
//             </Button>

//             <Button type="submit">
//               Create Institute
//             </Button>

//           </div>

//         </form>
//       </Modal>

//       {/* EDIT MODAL */}
//       <Modal
//         isOpen={isEditModalOpen}
//         onClose={() => setIsEditModalOpen(false)}
//         title="Edit Institute"
//       >
//         <form onSubmit={handleUpdate} className="space-y-4">

//           <FormInput
//             label="Institute Name"
//             value={formData.name}
//             onChange={(e) =>
//               setFormData({
//                 ...formData,
//                 name: e.target.value,
//               })
//             }
//           />

//           <FormInput
//             label="Description"
//             type="textarea"
//             value={formData.description}
//             onChange={(e) =>
//               setFormData({
//                 ...formData,
//                 description: e.target.value,
//               })
//             }
//           />

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

//             <FormInput
//               label="Email"
//               value={formData.email}
//               onChange={(e) =>
//                 setFormData({
//                   ...formData,
//                   email: e.target.value,
//                 })
//               }
//             />

//             <FormInput
//               label="Phone"
//               value={formData.phone_number}
//               onChange={(e) =>
//                 setFormData({
//                   ...formData,
//                   phone_number: e.target.value,
//                 })
//               }
//             />

//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

//             <FormInput
//               label="City"
//               value={formData.city}
//               onChange={(e) =>
//                 setFormData({
//                   ...formData,
//                   city: e.target.value,
//                 })
//               }
//             />

//             <FormInput
//               label="State"
//               value={formData.state}
//               onChange={(e) =>
//                 setFormData({
//                   ...formData,
//                   state: e.target.value,
//                 })
//               }
//             />

//             <FormInput
//               label="Timing"
//               value={formData.timing}
//               onChange={(e) =>
//                 setFormData({
//                   ...formData,
//                   timing: e.target.value,
//                 })
//               }
//             />

//           </div>

//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

//             <FormInput
//               label="Rating"
//               type="number"
//               step="0.1"
//               value={formData.rating}
//               onChange={(e) =>
//                 setFormData({
//                   ...formData,
//                   rating: e.target.value,
//                 })
//               }
//             />

//             <FormInput
//               label="Reviews"
//               type="number"
//               value={formData.reviews}
//               onChange={(e) =>
//                 setFormData({
//                   ...formData,
//                   reviews: e.target.value,
//                 })
//               }
//             />

//             <FormInput
//               label="Distance"
//               value={formData.distance}
//               onChange={(e) =>
//                 setFormData({
//                   ...formData,
//                   distance: e.target.value,
//                 })
//               }
//             />

//             <FormInput
//               label="Courses"
//               type="number"
//               value={formData.courses}
//               onChange={(e) =>
//                 setFormData({
//                   ...formData,
//                   courses: e.target.value,
//                 })
//               }
//             />

//           </div>

//           {/* Category & Subcategory Dropdowns */}
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

//           {/* Image Upload */}
//           <div className="space-y-3">

//             <label className="block text-sm font-medium text-white">
//               Institute Image
//             </label>

//             <div className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-4">

//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) =>
//                   setFormData({
//                     ...formData,
//                     image: e.target.files[0],
//                   })
//                 }
//                 className="w-full text-white file:mr-4 file:px-4 file:py-2 file:rounded-lg file:border-0 file:bg-primary-purple file:text-white file:cursor-pointer"
//               />

//             </div>

//             {(formData.image || editingInstitute?.image_url) && (
//               <img
//                 src={
//                   formData.image
//                     ? URL.createObjectURL(formData.image)
//                     : editingInstitute?.image_url
//                 }
//                 alt="Preview"
//                 className="w-full h-64 object-cover rounded-xl border border-white/10"
//               />
//             )}

//           </div>

//           <div className="flex justify-end gap-3 pt-4">

//             <Button
//               variant="secondary"
//               type="button"
//               onClick={() => setIsEditModalOpen(false)}
//             >
//               Cancel
//             </Button>

//             <Button type="submit">
//               Update Institute
//             </Button>

//           </div>

//         </form>
//       </Modal>

//       {/* DELETE MODAL */}
//       <Modal
//         isOpen={deleteModal.open}
//         onClose={() => setDeleteModal({ open: false, institute: null })}
//         title="Delete Institute"
//       >
//         <p>
//           Are you sure you want to delete{" "}
//           <b>{deleteModal.institute?.name}</b>?
//         </p>
//         <div className="flex justify-end gap-3 mt-5">
//           <Button
//             variant="secondary"
//             onClick={() => setDeleteModal({ open: false, institute: null })}
//           >
//             Cancel
//           </Button>
//           <Button variant="danger" onClick={handleDelete}>
//             Delete
//           </Button>
//         </div>
//       </Modal>
//     </div>
//   );
// }


// import { useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { Edit, Trash2, Search } from "lucide-react";
// import { FaTrash, FaTimes, FaCheck, FaBan } from "react-icons/fa";

// import API from "../services/api";
// import {
//   getAllInstitutes,
//   getPendingInstitutes,
//   getRejectedInstitutes,
//   adminCreateInstitute,
//   updateInstitute,
//   updateInstituteApproval,
//   deleteInstitute,
// } from "../services/instituteService";

// const inputClass =
//   "w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors";
// const selectClass =
//   "w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors";
// const labelClass = "block text-sm text-gray-400 mb-1";

// const defaultForm = {
//   name: "",
//   description: "",
//   email: "",
//   phone_number: "",
//   city: "",
//   state: "",
//   timing: "",
//   rating: "",
//   reviews: "",
//   distance: "",
//   courses: "",
//   category_id: "",
//   subcategory_id: "",
//   image: null,
// };

// export default function Institutes() {
//   const [institutes, setInstitutes] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const location = useLocation();

//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [editingInstitute, setEditingInstitute] = useState(null);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [instituteToDelete, setInstituteToDelete] = useState(null);

//   const [categories, setCategories] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);
//   const [formData, setFormData] = useState(defaultForm);

//   const token = localStorage.getItem("adminToken");

//   // --- Route-aware status filter ---
//   const routeFiltered = (institutes || []).filter((inst) => {
//     const status = inst?.approval_status?.toUpperCase();
//     if (location.pathname === "/institutes/pending") return status === "PENDING";
//     if (location.pathname === "/institutes/rejected") return status === "REJECTED";
//     return true;
//   });

//   // --- Search filter ---
//   const filteredInstitutes = routeFiltered.filter((inst) => {
//     const query = searchQuery.toLowerCase();
//     return (
//       inst.name?.toLowerCase().includes(query) ||
//       inst.description?.toLowerCase().includes(query) ||
//       inst.email?.toLowerCase().includes(query) ||
//       inst.phone_number?.includes(query) ||
//       inst.city?.toLowerCase().includes(query) ||
//       inst.state?.toLowerCase().includes(query) ||
//       inst.timing?.toLowerCase().includes(query) ||
//       String(inst.id).includes(query) ||
//       String(inst.rating).includes(query) ||
//       String(inst.reviews).includes(query) ||
//       String(inst.distance).includes(query) ||
//       String(inst.courses).includes(query) ||
//       inst.categories?.some(
//         (c) =>
//           c.category_name?.toLowerCase().includes(query) ||
//           c.subcategory_name?.toLowerCase().includes(query)
//       )
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
//       <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${bg} ${text}`}>
//         {status || "Pending"}
//       </span>
//     );
//   };

//   // --- Page title ---
//   const getPageTitle = () => {
//     if (location.pathname === "/institutes/pending") return "Pending Institutes";
//     if (location.pathname === "/institutes/rejected") return "Rejected Institutes";
//     return "Institutes";
//   };

//   const getPageSubtitle = () => {
//     if (location.pathname === "/institutes/pending") return "Review and approve institute applications";
//     if (location.pathname === "/institutes/rejected") return "Institutes rejected by admin";
//     return "Manage all institutes";
//   };

//   // --- Fetch ---
//   const fetchInstitutes = async () => {
//     try {
//       setLoading(true);
//       let response;
//       if (location.pathname === "/institutes/pending") {
//         response = await getPendingInstitutes(token);
//       } else if (location.pathname === "/institutes/rejected") {
//         response = await getRejectedInstitutes(token);
//       } else {
//         response = await getAllInstitutes();
//       }
//       setInstitutes(response?.data || []);
//     } catch (e) {
//       console.error(e);
//       toast.error(e?.response?.data?.message || "Failed to fetch institutes");
//     } finally {
//       setLoading(false);
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
//     fetchInstitutes();
//     fetchDropdowns();
//   }, [location.pathname]);

//   // --- Approve ---
//   const handleApprove = async (institute) => {
//     try {
//       await updateInstituteApproval(institute.id, "APPROVED", token);
//       toast.success("Institute approved successfully");
//       fetchInstitutes();
//     } catch (e) {
//       console.error(e);
//       toast.error(e?.response?.data?.message || "Approval failed");
//     }
//   };

//   // --- Reject ---
//   const handleReject = async (institute) => {
//     try {
//       await updateInstituteApproval(institute.id, "REJECTED", token);
//       toast.success("Institute rejected");
//       fetchInstitutes();
//     } catch (e) {
//       toast.error(e?.response?.data?.message || "Reject failed");
//     }
//   };

//   // --- Delete ---
//   const handleDeleteClick = (institute) => {
//     setInstituteToDelete(institute);
//     setShowDeleteModal(true);
//   };

//   const confirmDelete = async () => {
//     if (!instituteToDelete) return;
//     try {
//       await deleteInstitute(instituteToDelete.id, token);
//       toast.success("Institute deleted");
//       setShowDeleteModal(false);
//       setInstituteToDelete(null);
//       fetchInstitutes();
//     } catch (e) {
//       toast.error(e?.response?.data?.message || "Delete failed");
//     }
//   };

//   // --- Create ---
//   const handleCreate = async (e) => {
//     e.preventDefault();
//     try {
//       const payload = new FormData();
//       Object.entries(formData).forEach(([key, val]) => {
//         if (val !== null && val !== undefined && val !== "") {
//           payload.append(key, val);
//         }
//       });

//       await adminCreateInstitute(payload, token);
//       toast.success("Institute created successfully");
//       setShowCreateModal(false);
//       setFormData(defaultForm);
//       fetchInstitutes();
//     } catch (e) {
//       toast.error(e?.response?.data?.message || "Create failed");
//     }
//   };

//   // --- Edit ---
//   const handleEdit = (institute) => {
//     setEditingInstitute(institute);
//     setFormData({
//       name: institute.name || "",
//       description: institute.description || "",
//       email: institute.email || "",
//       phone_number: institute.phone_number || "",
//       city: institute.city || "",
//       state: institute.state || "",
//       timing: institute.timing || "",
//       rating: institute.rating || "",
//       reviews: institute.reviews || "",
//       distance: institute.distance || "",
//       courses: institute.courses || "",
//       category_id: institute.category_id || "",
//       subcategory_id: institute.subcategory_id || "",
//       image: null,
//     });
//     setShowEditModal(true);
//   };

//   // --- Update ---
//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       const payload = new FormData();
//       Object.keys(formData).forEach((key) => {
//         if (formData[key] !== null && formData[key] !== "") {
//           payload.append(key, formData[key]);
//         }
//       });

//       await updateInstitute(editingInstitute.id, payload, token);
//       toast.success("Institute updated successfully");
//       setShowEditModal(false);
//       setEditingInstitute(null);
//       fetchInstitutes();
//     } catch (e) {
//       toast.error(e?.response?.data?.message || "Update failed");
//     }
//   };

//   // --- Shared form fields component ---
//   const FormFields = () => (
//     <>
//       <div>
//         <label className={labelClass}>Institute Name</label>
//         <input
//           value={formData.name}
//           onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//           className={inputClass}
//           placeholder="Enter institute name"
//           required
//         />
//       </div>

//       <div>
//         <label className={labelClass}>Description</label>
//         <textarea
//           value={formData.description}
//           onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//           rows="3"
//           className={inputClass}
//           placeholder="Enter description"
//         />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div>
//           <label className={labelClass}>Email</label>
//           <input
//             type="email"
//             value={formData.email}
//             onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//             className={inputClass}
//             placeholder="Enter email"
//           />
//         </div>
//         <div>
//           <label className={labelClass}>Phone</label>
//           <input
//             value={formData.phone_number}
//             onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
//             className={inputClass}
//             placeholder="Enter phone number"
//           />
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <div>
//           <label className={labelClass}>City</label>
//           <input
//             value={formData.city}
//             onChange={(e) => setFormData({ ...formData, city: e.target.value })}
//             className={inputClass}
//             placeholder="Enter city"
//           />
//         </div>
//         <div>
//           <label className={labelClass}>State</label>
//           <input
//             value={formData.state}
//             onChange={(e) => setFormData({ ...formData, state: e.target.value })}
//             className={inputClass}
//             placeholder="Enter state"
//           />
//         </div>
//         <div>
//           <label className={labelClass}>Timing</label>
//           <input
//             value={formData.timing}
//             onChange={(e) => setFormData({ ...formData, timing: e.target.value })}
//             className={inputClass}
//             placeholder="e.g. 9 AM - 6 PM"
//           />
//         </div>
//       </div>

//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         <div>
//           <label className={labelClass}>Rating</label>
//           <input
//             type="number"
//             step="0.1"
//             value={formData.rating}
//             onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
//             className={inputClass}
//             placeholder="0"
//           />
//         </div>
//         <div>
//           <label className={labelClass}>Reviews</label>
//           <input
//             type="number"
//             value={formData.reviews}
//             onChange={(e) => setFormData({ ...formData, reviews: e.target.value })}
//             className={inputClass}
//             placeholder="0"
//           />
//         </div>
//         <div>
//           <label className={labelClass}>Distance</label>
//           <input
//             value={formData.distance}
//             onChange={(e) => setFormData({ ...formData, distance: e.target.value })}
//             className={inputClass}
//             placeholder="e.g. 5 km"
//           />
//         </div>
//         <div>
//           <label className={labelClass}>Courses</label>
//           <input
//             type="number"
//             value={formData.courses}
//             onChange={(e) => setFormData({ ...formData, courses: e.target.value })}
//             className={inputClass}
//             placeholder="0"
//           />
//         </div>
//       </div>

//       {/* Category & Subcategory */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div>
//           <label className={labelClass}>Category</label>
//           <select
//             value={formData.category_id || ""}
//             onChange={(e) =>
//               setFormData({ ...formData, category_id: e.target.value, subcategory_id: "" })
//             }
//             className={selectClass}
//           >
//             <option value="">Select Category</option>
//             {categories.map((cat) => (
//               <option key={cat.id} value={cat.id}>{cat.name}</option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label className={labelClass}>Subcategory</label>
//           <select
//             value={formData.subcategory_id || ""}
//             onChange={(e) => setFormData({ ...formData, subcategory_id: e.target.value })}
//             disabled={!formData.category_id}
//             className={`${selectClass} disabled:opacity-50`}
//           >
//             <option value="">Select Subcategory</option>
//             {subcategories
//               .filter((sub) => String(sub.category_id) === String(formData.category_id))
//               .map((sub) => (
//                 <option key={sub.id} value={sub.id}>{sub.name}</option>
//               ))}
//           </select>
//         </div>
//       </div>

//       {/* Image */}
//       <div>
//         <label className={labelClass}>Institute Image</label>
//         {editingInstitute?.image_url && !formData.image && (
//           <img
//             src={getImageUrl(editingInstitute.image_url)}
//             alt="Current"
//             className="w-full h-48 object-cover rounded-xl mb-2 border border-[#333]"
//           />
//         )}
//         {formData.image && (
//           <img
//             src={URL.createObjectURL(formData.image)}
//             alt="Preview"
//             className="w-full h-48 object-cover rounded-xl mb-2 border border-[#333]"
//           />
//         )}
//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] })}
//           className="w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-500/20 file:text-purple-300 hover:file:bg-purple-500/30"
//         />
//       </div>
//     </>
//   );

//   const isPendingPage = location.pathname === "/institutes/pending";
//   const isRejectedPage = location.pathname === "/institutes/rejected";

//   return (
//     <div className="p-8 text-white">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//         <div>
//           <h1 className="text-4xl font-bold text-purple-400">{getPageTitle()}</h1>
//           <p className="text-gray-400 mt-2">{getPageSubtitle()}</p>
//         </div>

//         {!isPendingPage && !isRejectedPage && (
//           <button
//             onClick={() => {
//               setFormData(defaultForm);
//               setShowCreateModal(true);
//             }}
//             className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition-opacity"
//           >
//             + Add Institute
//           </button>
//         )}
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
//             placeholder="Search institutes..."
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
//                 <th className="p-4 text-left whitespace-nowrap">Image</th>
//                 <th className="p-4 text-left whitespace-nowrap">Name</th>
//                 <th className="p-4 text-left whitespace-nowrap">Description</th>
//                 <th className="p-4 text-left whitespace-nowrap">Email</th>
//                 <th className="p-4 text-left whitespace-nowrap">Phone</th>
//                 <th className="p-4 text-left whitespace-nowrap">City</th>
//                 <th className="p-4 text-left whitespace-nowrap">State</th>
//                 <th className="p-4 text-left whitespace-nowrap">Timing</th>
//                 <th className="p-4 text-left whitespace-nowrap">Rating</th>
//                 <th className="p-4 text-left whitespace-nowrap">Reviews</th>
//                 <th className="p-4 text-left whitespace-nowrap">Courses</th>
//                 <th className="p-4 text-left whitespace-nowrap">Category</th>
//                 <th className="p-4 text-left whitespace-nowrap">Subcategory</th>
//                 <th className="p-4 text-left whitespace-nowrap">Status</th>
//                 <th className="p-4 text-left whitespace-nowrap">Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan={15} className="p-12 text-center">
//                     <div className="flex flex-col items-center gap-3">
//                       <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
//                       <p className="text-gray-500">Loading institutes...</p>
//                     </div>
//                   </td>
//                 </tr>
//               ) : filteredInstitutes.length === 0 ? (
//                 <tr>
//                   <td colSpan={15} className="p-12 text-center">
//                     <div className="flex flex-col items-center gap-3">
//                       <Search size={40} className="text-gray-600" />
//                       <p className="text-gray-500 text-lg">
//                         {searchQuery
//                           ? "No institutes found matching your search"
//                           : "No institutes available"}
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
//                 filteredInstitutes.map((inst) => (
//                   <tr
//                     key={inst.id}
//                     className="border-t border-[#2c2c35] hover:bg-[#1a1a20] transition-colors"
//                   >
//                     <td className="p-4">
//                       {inst.image_url ? (
//                         <img
//                           src={getImageUrl(inst.image_url)}
//                           alt={inst.name}
//                           className="w-11 h-11 rounded-xl object-cover border border-[#333]"
//                           onError={(e) => { e.currentTarget.style.display = "none"; }}
//                         />
//                       ) : (
//                         <div className="w-11 h-11 bg-[#26262b] rounded-xl flex items-center justify-center text-gray-600 text-xs">
//                           N/A
//                         </div>
//                       )}
//                     </td>

//                     <td className="p-4 font-medium whitespace-nowrap">{inst.name}</td>
//                     <td className="p-4 text-gray-400 max-w-[180px] truncate">{inst.description || "-"}</td>
//                     <td className="p-4 text-gray-400 whitespace-nowrap">{inst.email || "-"}</td>
//                     <td className="p-4 text-gray-400 whitespace-nowrap">{inst.phone_number || "-"}</td>
//                     <td className="p-4 text-gray-400 whitespace-nowrap">{inst.city || "-"}</td>
//                     <td className="p-4 text-gray-400 whitespace-nowrap">{inst.state || "-"}</td>
//                     <td className="p-4 text-gray-400 whitespace-nowrap">{inst.timing || "-"}</td>
//                     <td className="p-4 whitespace-nowrap">
//                       <span className="text-yellow-400 font-semibold">
//                         {inst.rating ? ` ${inst.rating}` : "-"}
//                       </span>
//                     </td>
//                     <td className="p-4 font-semibold whitespace-nowrap">{inst.reviews ?? "-"}</td>
//                     <td className="p-4 font-semibold whitespace-nowrap">{inst.courses ?? "-"}</td>
//                     <td className="p-4 text-gray-400 max-w-[130px] truncate">
//                       {inst.categories?.length
//                         ? inst.categories.map((c) => c.category_name).filter(Boolean).join(", ")
//                         : "-"}
//                     </td>
//                     <td className="p-4 text-gray-400 max-w-[130px] truncate">
//                       {inst.categories?.length
//                         ? inst.categories.map((c) => c.subcategory_name).filter(Boolean).join(", ")
//                         : "-"}
//                     </td>
//                     <td className="p-4 whitespace-nowrap">
//                       <StatusBadge status={inst.approval_status} />
//                     </td>

//                     <td className="p-4">
//                       <div className="flex items-center gap-2">
//                         {/* Approve / Reject for pending */}
//                         {inst.approval_status === "PENDING" && (
//                           <>
//                             <button
//                               onClick={() => handleApprove(inst)}
//                               className="p-2 rounded-lg hover:bg-green-500/10 transition-colors group"
//                               title="Approve"
//                             >
//                               <FaCheck size={14} className="text-green-500/70 group-hover:text-green-400 transition-colors" />
//                             </button>
//                             <button
//                               onClick={() => handleReject(inst)}
//                               className="p-2 rounded-lg hover:bg-red-500/10 transition-colors group"
//                               title="Reject"
//                             >
//                               <FaBan size={14} className="text-red-500/70 group-hover:text-red-400 transition-colors" />
//                             </button>
//                           </>
//                         )}

//                         {/* Edit & Delete for non-pending */}
//                         {inst.approval_status !== "PENDING" && (
//                           <>
//                             <button
//                               onClick={() => handleEdit(inst)}
//                               className="p-2 rounded-lg hover:bg-[#2a2a35] transition-colors group"
//                               title="Edit"
//                             >
//                               <Edit size={16} className="text-gray-400 group-hover:text-white transition-colors" />
//                             </button>
//                             <button
//                               onClick={() => handleDeleteClick(inst)}
//                               className="p-2 rounded-lg hover:bg-red-500/10 transition-colors group"
//                               title="Delete"
//                             >
//                               <Trash2 size={16} className="text-red-500/70 group-hover:text-red-400 transition-colors" />
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

//       {/* ==================== Create Institute Modal ==================== */}
//       {showCreateModal && (
//         <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
//           <div className="w-full max-w-[700px] max-h-[90vh] bg-[#211c30] rounded-2xl overflow-hidden shadow-2xl">
//             <div className="flex justify-between items-center p-6 border-b border-[#3a3448]">
//               <h2 className="text-2xl font-bold text-white">Create Institute</h2>
//               <button onClick={() => setShowCreateModal(false)} className="text-gray-400 hover:text-white transition-colors">
//                 <FaTimes size={20} />
//               </button>
//             </div>
//             <div className="overflow-y-auto max-h-[75vh] p-6">
//               <form onSubmit={handleCreate}>
//                 <FormFields />
//                 <div className="flex justify-end gap-3 pt-4 border-t border-[#3a3448]">
//                   <button
//                     type="button"
//                     onClick={() => setShowCreateModal(false)}
//                     className="px-5 py-3 rounded-xl border border-gray-600 text-gray-300 hover:bg-[#2b2638] transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition-opacity"
//                   >
//                     Create Institute
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ==================== Edit Institute Modal ==================== */}
//       {showEditModal && (
//         <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
//           <div className="w-full max-w-[700px] max-h-[90vh] bg-[#211c30] rounded-2xl overflow-hidden shadow-2xl">
//             <div className="flex justify-between items-center p-6 border-b border-[#3a3448]">
//               <h2 className="text-2xl font-bold text-white">Edit Institute</h2>
//               <button
//                 onClick={() => { setShowEditModal(false); setEditingInstitute(null); }}
//                 className="text-gray-400 hover:text-white transition-colors"
//               >
//                 <FaTimes size={20} />
//               </button>
//             </div>
//             <div className="overflow-y-auto max-h-[75vh] p-6">
//               <form onSubmit={handleUpdate}>
//                 <FormFields />
//                 <div className="flex justify-end gap-3 pt-4 border-t border-[#3a3448]">
//                   <button
//                     type="button"
//                     onClick={() => { setShowEditModal(false); setEditingInstitute(null); }}
//                     className="px-5 py-3 rounded-xl border border-gray-600 text-gray-300 hover:bg-[#2b2638] transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition-opacity"
//                   >
//                     Update Institute
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
//               <h2 className="text-xl font-bold text-white mb-3 text-center">Delete Institute</h2>
//               <p className="text-gray-400 text-center text-sm leading-relaxed mb-8">
//                 Are you sure you want to delete this institute?
//               </p>
//               <div className="flex gap-3 w-full">
//                 <button
//                   onClick={() => { setShowDeleteModal(false); setInstituteToDelete(null); }}
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



// import { useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { Edit, Trash2, Search } from "lucide-react";
// import { FaTrash, FaTimes, FaCheck, FaBan } from "react-icons/fa";

// import API from "../services/api";
// import {
//   getAllInstitutes,
//   getPendingInstitutes,
//   getRejectedInstitutes,
//   adminCreateInstitute,
//   updateInstitute,
//   updateInstituteApproval,
//   deleteInstitute,
// } from "../services/instituteService";

// const inputClass =
//   "w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors";
// const selectClass =
//   "w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors";
// const labelClass = "block text-sm text-white mb-1";

// const defaultForm = {
//   name: "",
//   description: "",
//   email: "",
//   phone_number: "",
//   city: "",
//   state: "",
//   timing: "",
//   rating: "",
//   reviews: "",
//   distance: "",
//   courses: "",
//   category_id: "",
//   subcategory_id: "",
//   image: null,
// };

// // --- Shared form fields component ---
//   const FormFields = ({
//   formData,
//   setFormData,
//   categories,
//   subcategories,
//   editingInstitute,
//   getImageUrl,
// }) => (
//     <>
//       <div>
//         <label className={labelClass}>Institute Name</label>
//         <input
//           value={formData.name}
//           onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//           className={inputClass}
//           placeholder="Enter institute name"
//           required
//         />
//       </div>

//       <div>
//         <label className={labelClass}>Description</label>
//         <textarea
//           value={formData.description}
//           onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//           rows="3"
//           className={inputClass}
//           placeholder="Enter description"
//         />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div>
//           <label className={labelClass}>Email</label>
//           <input
//             type="email"
//             value={formData.email}
//             onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//             className={inputClass}
//             placeholder="Enter email"
//           />
//         </div>
//         <div>
//           <label className={labelClass}>Phone</label>
//           <input
//             value={formData.phone_number}
//             onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
//             className={inputClass}
//             placeholder="Enter phone number"
//           />
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <div>
//           <label className={labelClass}>City</label>
//           <input
//             value={formData.city}
//             onChange={(e) => setFormData({ ...formData, city: e.target.value })}
//             className={inputClass}
//             placeholder="Enter city"
//           />
//         </div>
//         <div>
//           <label className={labelClass}>State</label>
//           <input
//             value={formData.state}
//             onChange={(e) => setFormData({ ...formData, state: e.target.value })}
//             className={inputClass}
//             placeholder="Enter state"
//           />
//         </div>
//         <div>
//           <label className={labelClass}>Timing</label>
//           <input
//             value={formData.timing}
//             onChange={(e) => setFormData({ ...formData, timing: e.target.value })}
//             className={inputClass}
//             placeholder="e.g. 9 AM - 6 PM"
//           />
//         </div>
//       </div>

//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         <div>
//           <label className={labelClass}>Rating</label>
//           <input
//             type="number"
//             step="1"
//             value={formData.rating}
//             onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
//             className={inputClass}
//             placeholder="0"
//           />
//         </div>
//         <div>
//           <label className={labelClass}>Reviews</label>
//           <input
//             type="number"
//             value={formData.reviews}
//             onChange={(e) => setFormData({ ...formData, reviews: e.target.value })}
//             className={inputClass}
//             placeholder="0"
//           />
//         </div>
//         <div>
//           <label className={labelClass}>Distance</label>
//           <input
//             value={formData.distance}
//             onChange={(e) => setFormData({ ...formData, distance: e.target.value })}
//             className={inputClass}
//             placeholder="e.g. 5 km"
//           />
//         </div>
//         <div>
//           <label className={labelClass}>Courses</label>
//           <input
//             type="number"
//             value={formData.courses}
//             onChange={(e) => setFormData({ ...formData, courses: e.target.value })}
//             className={inputClass}
//             placeholder="0"
//           />
//         </div>
//       </div>

//       {/* Category & Subcategory */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div>
//           <label className={labelClass}>Category</label>
//           <select
//             value={formData.category_id || ""}
//             onChange={(e) =>
//               setFormData({ ...formData, category_id: e.target.value, subcategory_id: "" })
//             }
//             className={selectClass}
//           >
//             <option value="">Select Category</option>
//             {categories.map((cat) => (
//               <option key={cat.id} value={cat.id}>{cat.name}</option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label className={labelClass}>Subcategory</label>
//           <select
//             value={formData.subcategory_id || ""}
//             onChange={(e) => setFormData({ ...formData, subcategory_id: e.target.value })}
//             disabled={!formData.category_id}
//             className={`${selectClass} disabled:opacity-50`}
//           >
//             <option value="">Select Subcategory</option>
//             {subcategories
//               .filter((sub) => String(sub.category_id) === String(formData.category_id))
//               .map((sub) => (
//                 <option key={sub.id} value={sub.id}>{sub.name}</option>
//               ))}
//           </select>
//         </div>
//       </div>

//       {/* Image */}
//       <div>
//         <label className={labelClass}>Institute Image</label>
//         {editingInstitute?.image_url && !formData.image && (
//           <img
//             src={getImageUrl(editingInstitute.image_url)}
//             alt="Current"
//             className="w-full h-48 object-cover rounded-xl mb-2 border border-[#333]"
//           />
//         )}
//         {formData.image && (
//           <img
//             src={URL.createObjectURL(formData.image)}
//             alt="Preview"
//             className="w-full h-48 object-cover rounded-xl mb-2 border border-[#333]"
//           />
//         )}
//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] })}
//           className="w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-500/20 file:text-purple-300 hover:file:bg-purple-500/30"
//         />
//       </div>
//     </>
//   );

// export default function Institutes() {
//   const [institutes, setInstitutes] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const location = useLocation();

//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [editingInstitute, setEditingInstitute] = useState(null);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [instituteToDelete, setInstituteToDelete] = useState(null);

//   const [categories, setCategories] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);
//   const [formData, setFormData] = useState(defaultForm);

//   const token = localStorage.getItem("adminToken");

//   // --- Route-aware status filter ---
//   const routeFiltered = (institutes || []).filter((inst) => {
//     const status = inst?.approval_status?.toUpperCase();
//     if (location.pathname === "/institutes/pending") return status === "PENDING";
//     if (location.pathname === "/institutes/rejected") return status === "REJECTED";
//     return true;
//   });

//   // --- Search filter ---
//   const filteredInstitutes = routeFiltered.filter((inst) => {
//     const query = searchQuery.toLowerCase();
//     return (
//       inst.name?.toLowerCase().includes(query) ||
//       inst.description?.toLowerCase().includes(query) ||
//       inst.email?.toLowerCase().includes(query) ||
//       inst.phone_number?.includes(query) ||
//       inst.city?.toLowerCase().includes(query) ||
//       inst.state?.toLowerCase().includes(query) ||
//       inst.timing?.toLowerCase().includes(query) ||
//       String(inst.id).includes(query) ||
//       String(inst.rating).includes(query) ||
//       String(inst.reviews).includes(query) ||
//       String(inst.distance).includes(query) ||
//       String(inst.courses).includes(query) ||
//       inst.categories?.some(
//         (c) =>
//           c.category_name?.toLowerCase().includes(query) ||
//           c.subcategory_name?.toLowerCase().includes(query)
//       )
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
//       <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${bg} ${text}`}>
//         {status || "Pending"}
//       </span>
//     );
//   };

//   // --- Page title ---
//   const getPageTitle = () => {
//     if (location.pathname === "/institutes/pending") return "Pending Institutes";
//     if (location.pathname === "/institutes/rejected") return "Rejected Institutes";
//     return "Institutes";
//   };

//   const getPageSubtitle = () => {
//     if (location.pathname === "/institutes/pending") return "Review and approve institute applications";
//     if (location.pathname === "/institutes/rejected") return "Institutes rejected by admin";
//     return "Manage all institutes";
//   };

//   // --- Fetch ---
//   const fetchInstitutes = async () => {
//     try {
//       setLoading(true);
//       let response;
//       if (location.pathname === "/institutes/pending") {
//         response = await getPendingInstitutes(token);
//       } else if (location.pathname === "/institutes/rejected") {
//         response = await getRejectedInstitutes(token);
//       } else {
//         response = await getAllInstitutes();
//       }
//       setInstitutes(response?.data || []);
//     } catch (e) {
//       console.error(e);
//       toast.error(e?.response?.data?.message || "Failed to fetch institutes");
//     } finally {
//       setLoading(false);
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
//     fetchInstitutes();
//     fetchDropdowns();
//   }, [location.pathname]);

//   // --- Approve ---
//   const handleApprove = async (institute) => {
//     try {
//       await updateInstituteApproval(institute.id, "APPROVED", token);
//       toast.success("Institute approved successfully");
//       fetchInstitutes();
//     } catch (e) {
//       console.error(e);
//       toast.error(e?.response?.data?.message || "Approval failed");
//     }
//   };

//   // --- Reject ---
//   const handleReject = async (institute) => {
//     try {
//       await updateInstituteApproval(institute.id, "REJECTED", token);
//       toast.success("Institute rejected");
//       fetchInstitutes();
//     } catch (e) {
//       toast.error(e?.response?.data?.message || "Reject failed");
//     }
//   };

//   // --- Delete ---
//   const handleDeleteClick = (institute) => {
//     setInstituteToDelete(institute);
//     setShowDeleteModal(true);
//   };

//   const confirmDelete = async () => {
//     if (!instituteToDelete) return;
//     try {
//       await deleteInstitute(instituteToDelete.id, token);
//       toast.success("Institute deleted");
//       setShowDeleteModal(false);
//       setInstituteToDelete(null);
//       fetchInstitutes();
//     } catch (e) {
//       toast.error(e?.response?.data?.message || "Delete failed");
//     }
//   };

//   // --- Create ---
//   const handleCreate = async (e) => {
//     e.preventDefault();
//     try {
//       const payload = new FormData();
//       Object.entries(formData).forEach(([key, val]) => {
//         if (val !== null && val !== undefined && val !== "") {
//           payload.append(key, val);
//         }
//       });

//       await adminCreateInstitute(payload, token);
//       toast.success("Institute created successfully");
//       setShowCreateModal(false);
//       setFormData(defaultForm);
//       fetchInstitutes();
//     } catch (e) {
//       toast.error(e?.response?.data?.message || "Create failed");
//     }
//   };

//   // --- Edit ---
//   const handleEdit = (institute) => {
//     setEditingInstitute(institute);
//     setFormData({
//       name: institute.name || "",
//       description: institute.description || "",
//       email: institute.email || "",
//       phone_number: institute.phone_number || "",
//       city: institute.city || "",
//       state: institute.state || "",
//       timing: institute.timing || "",
//       rating: institute.rating || "",
//       reviews: institute.reviews || "",
//       distance: institute.distance || "",
//       courses: institute.courses || "",
//       category_id: institute.category_id || "",
//       subcategory_id: institute.subcategory_id || "",
//       image: null,
//     });
//     setShowEditModal(true);
//   };

//   // --- Update ---
//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       const payload = new FormData();
//       Object.keys(formData).forEach((key) => {
//         if (formData[key] !== null && formData[key] !== "") {
//           payload.append(key, formData[key]);
//         }
//       });

//       await updateInstitute(editingInstitute.id, payload, token);
//       toast.success("Institute updated successfully");
//       setShowEditModal(false);
//       setEditingInstitute(null);
//       fetchInstitutes();
//     } catch (e) {
//       toast.error(e?.response?.data?.message || "Update failed");
//     }
//   };

  

//   const isPendingPage = location.pathname === "/institutes/pending";
//   const isRejectedPage = location.pathname === "/institutes/rejected";

//   return (
//     <div className="p-8 text-white">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//         <div>
//           <h1 className="text-4xl font-bold text-purple-400">{getPageTitle()}</h1>
//           <p className="text-gray-400 mt-2">{getPageSubtitle()}</p>
//         </div>

//         {!isPendingPage && !isRejectedPage && (
//           <button
//             onClick={() => {
//               setFormData(defaultForm);
//               setShowCreateModal(true);
//             }}
//             className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition-opacity"
//           >
//             + Add Institute
//           </button>
//         )}
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
//             placeholder="Search institutes..."
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
//                 <th className="p-4 text-left whitespace-nowrap">Description</th>
//                 <th className="p-4 text-left whitespace-nowrap">Email</th>
//                 <th className="p-4 text-left whitespace-nowrap">Phone</th>
//                 <th className="p-4 text-left whitespace-nowrap">City</th>
//                 <th className="p-4 text-left whitespace-nowrap">State</th>
//                 <th className="p-4 text-left whitespace-nowrap">Timing</th>
//                 <th className="p-4 text-left whitespace-nowrap">Rating</th>
//                 <th className="p-4 text-left whitespace-nowrap">Reviews</th>
//                 <th className="p-4 text-left whitespace-nowrap">Courses</th>
//                 <th className="p-4 text-left whitespace-nowrap">Category</th>
//                 <th className="p-4 text-left whitespace-nowrap">Subcategory</th>
//                 <th className="p-4 text-left whitespace-nowrap">Status</th>
//                 <th className="p-4 text-left whitespace-nowrap">Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan={15} className="p-12 text-center">
//                     <div className="flex flex-col items-center gap-3">
//                       <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
//                       <p className="text-white">Loading institutes...</p>
//                     </div>
//                   </td>
//                 </tr>
//               ) : filteredInstitutes.length === 0 ? (
//                 <tr>
//                   <td colSpan={15} className="p-12 text-center">
//                     <div className="flex flex-col items-center gap-3">
//                       <Search size={40} className="text-white" />
//                       <p className="text-white text-lg">
//                         {searchQuery
//                           ? "No institutes found matching your search"
//                           : "No institutes available"}
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
//                 filteredInstitutes.map((inst) => (
//                   <tr
//                     key={inst.id}
//                     className="border-t border-[#2c2c35] hover:bg-[#1a1a20] transition-colors"
//                   >
//                     <td className="p-4">
//                       {inst.image_url ? (
//                         <img
//                           src={getImageUrl(inst.image_url)}
//                           alt={inst.name}
//                           className="w-11 h-11 rounded-xl object-cover border border-[#333]"
//                           onError={(e) => { e.currentTarget.style.display = "none"; }}
//                         />
//                       ) : (
//                         <div className="w-11 h-11 bg-[#26262b] rounded-xl flex items-center justify-center text-white text-xs">
//                           N/A
//                         </div>
//                       )}
//                     </td>

//                     <td className="p-4 font-medium whitespace-nowrap">{inst.name}</td>
//                     <td className="p-4 text-white max-w-[180px] truncate">{inst.description || "-"}</td>
//                     <td className="p-4 text-white whitespace-nowrap">{inst.email || "-"}</td>
//                     <td className="p-4 text-white whitespace-nowrap">{inst.phone_number || "-"}</td>
//                     <td className="p-4 text-white whitespace-nowrap">{inst.city || "-"}</td>
//                     <td className="p-4 text-white whitespace-nowrap">{inst.state || "-"}</td>
//                     <td className="p-4 text-white whitespace-nowrap">{inst.timing || "-"}</td>

//                     {/* Rating - now white font-semibold like Reviews & Courses, whole numbers only */}
//                     <td className="p-4 font-semibold whitespace-nowrap">
//                       {inst.rating ? Math.round(Number(inst.rating)) : "-"}
//                     </td>

//                     <td className="p-4 font-semibold whitespace-nowrap">{inst.reviews ?? "-"}</td>
//                     <td className="p-4 font-semibold whitespace-nowrap">{inst.courses ?? "-"}</td>
//                     <td className="p-4 text-white max-w-[130px] truncate">
//                       {inst.categories?.length
//                         ? inst.categories.map((c) => c.category_name).filter(Boolean).join(", ")
//                         : "-"}
//                     </td>
//                     <td className="p-4 text-white max-w-[130px] truncate">
//                       {inst.categories?.length
//                         ? inst.categories.map((c) => c.subcategory_name).filter(Boolean).join(", ")
//                         : "-"}
//                     </td>
//                     <td className="p-4 whitespace-nowrap">
//                       <StatusBadge status={inst.approval_status} />
//                     </td>

//                     <td className="p-4">
//                       <div className="flex items-center gap-2">
//                         {/* Approve / Reject for pending */}
//                         {inst.approval_status === "PENDING" && (
//                           <>
//                             <button
//                               onClick={() => handleApprove(inst)}
//                               className="p-2 rounded-lg hover:bg-green-500/10 transition-colors group"
//                               title="Approve"
//                             >
//                               <FaCheck size={14} className="text-green-500/70 group-hover:text-green-400 transition-colors" />
//                             </button>
//                             <button
//                               onClick={() => handleReject(inst)}
//                               className="p-2 rounded-lg hover:bg-red-500/10 transition-colors group"
//                               title="Reject"
//                             >
//                               <FaBan size={14} className="text-red-500/70 group-hover:text-red-400 transition-colors" />
//                             </button>
//                           </>
//                         )}

//                         {/* Edit & Delete for non-pending */}
//                         {inst.approval_status !== "PENDING" && (
//                           <>
//                             <button
//                               onClick={() => handleEdit(inst)}
//                               className="p-2 rounded-lg hover:bg-[#2a2a35] transition-colors group"
//                               title="Edit"
//                             >
//                               <Edit size={16} className="text-white group-hover:text-white transition-colors" />
//                             </button>
//                             <button
//                               onClick={() => handleDeleteClick(inst)}
//                               className="p-2 rounded-lg hover:bg-red-500/10 transition-colors group"
//                               title="Delete"
//                             >
//                               <Trash2 size={16} className="text-red-500/70 group-hover:text-red-400 transition-colors" />
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

//       {/* ==================== Create Institute Modal ==================== */}
//       {showCreateModal && (
//         <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
//           <div className="w-full max-w-[700px] max-h-[90vh] bg-[#211c30] rounded-2xl overflow-hidden shadow-2xl">
//             <div className="flex justify-between items-center p-6 border-b border-[#3a3448]">
//               <h2 className="text-2xl font-bold text-white">Create Institute</h2>
//               <button onClick={() => setShowCreateModal(false)} className="text-white hover:text-white transition-colors">
//                 <FaTimes size={20} />
//               </button>
//             </div>
//             <div className="overflow-y-auto max-h-[75vh] p-6">
//               <form onSubmit={handleCreate}>
//                 <FormFields
//     formData={formData}
//     setFormData={setFormData}
//     categories={categories}
//     subcategories={subcategories}
//     editingInstitute={editingInstitute}
//     getImageUrl={getImageUrl}
// />
//                 <div className="flex justify-end gap-3 pt-4 border-t border-[#3a3448]">
//                   <button
//                     type="button"
//                     onClick={() => setShowCreateModal(false)}
//                     className="px-5 py-3 rounded-xl border border-gray-600 text-white hover:bg-[#2b2638] transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition-opacity"
//                   >
//                     Create Institute
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ==================== Edit Institute Modal ==================== */}
//       {showEditModal && (
//         <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
//           <div className="w-full max-w-[700px] max-h-[90vh] bg-[#211c30] rounded-2xl overflow-hidden shadow-2xl">
//             <div className="flex justify-between items-center p-6 border-b border-[#3a3448]">
//               <h2 className="text-2xl font-bold text-white">Edit Institute</h2>
//               <button
//                 onClick={() => { setShowEditModal(false); setEditingInstitute(null); }}
//                 className="text-gray-400 hover:text-white transition-colors"
//               >
//                 <FaTimes size={20} />
//               </button>
//             </div>
//             <div className="overflow-y-auto max-h-[75vh] p-6">
//               <form onSubmit={handleUpdate}>
//                 <FormFields />
//                 <div className="flex justify-end gap-3 pt-4 border-t border-[#3a3448]">
//                   <button
//                     type="button"
//                     onClick={() => { setShowEditModal(false); setEditingInstitute(null); }}
//                     className="px-5 py-3 rounded-xl border border-gray-600 text-gray-300 hover:bg-[#2b2638] transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition-opacity"
//                   >
//                     Update Institute
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
//               <h2 className="text-xl font-bold text-white mb-3 text-center">Delete Institute</h2>
//               <p className="text-gray-400 text-center text-sm leading-relaxed mb-8">
//                 Are you sure you want to delete this institute?
//               </p>
//               <div className="flex gap-3 w-full">
//                 <button
//                   onClick={() => { setShowDeleteModal(false); setInstituteToDelete(null); }}
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



// import { useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { Edit, Trash2, Search } from "lucide-react";
// import { FaTrash, FaTimes, FaCheck, FaBan } from "react-icons/fa";

// import API from "../services/api";
// import {
//   getAllInstitutes,
//   getPendingInstitutes,
//   getRejectedInstitutes,
//   adminCreateInstitute,
//   updateInstitute,
//   updateInstituteApproval,
//   deleteInstitute,
// } from "../services/instituteService";

// const inputClass =
//   "w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors";
// const selectClass =
//   "w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors";
// const labelClass = "block text-sm text-white mb-1";

// const defaultForm = {
//   name: "",
//   description: "",
//   email: "",
//   phone_number: "",
//   city: "",
//   state: "",
//   timing: "",
//   start_time: "",
//   end_time: "",
//   timezone: "Asia/Kolkata",
//   rating: "",
//   reviews: "",
//   distance: "",
//   courses: "",
//   category_id: "",
//   subcategory_id: "",
//   image: null,
// };

// // --- Shared form fields component ---
// const FormFields = ({
//   formData,
//   setFormData,
//   categories,
//   subcategories,
//   editingInstitute,
//   getImageUrl,
// }) => (
//   <>
//     <div>
//       <label className={labelClass}>Institute Name</label>
//       <input
//         value={formData.name}
//         onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//         className={inputClass}
//         placeholder="Enter institute name"
//         required
//       />
//     </div>

//     <div>
//       <label className={labelClass}>Description</label>
//       <textarea
//         value={formData.description}
//         onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//         rows="3"
//         className={inputClass}
//         placeholder="Enter description"
//       />
//     </div>

//     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//       <div>
//         <label className={labelClass}>Email</label>
//         <input
//           type="email"
//           value={formData.email}
//           onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//           className={inputClass}
//           placeholder="Enter email"
//         />
//       </div>
//       <div>
//         <label className={labelClass}>Phone</label>
//         <input
//           value={formData.phone_number}
//           onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
//           className={inputClass}
//           placeholder="Enter phone number"
//         />
//       </div>
//     </div>

//     <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//       <div>
//         <label className={labelClass}>Timing</label>
//         <input
//           value={formData.timing}
//           onChange={(e) =>
//             setFormData({
//               ...formData,
//               timing: e.target.value,
//             })
//           }
//           className={inputClass}
//           placeholder="9 AM - 6 PM"
//         />
//       </div>

//       <div>
//         <label className={labelClass}>Start Time</label>
//         <input
//           type="time"
//           value={formData.start_time}
//           onChange={(e) =>
//             setFormData({
//               ...formData,
//               start_time: e.target.value,
//             })
//           }
//           className={inputClass}
//         />
//       </div>

//       <div>
//         <label className={labelClass}>End Time</label>
//         <input
//           type="time"
//           value={formData.end_time}
//           onChange={(e) =>
//             setFormData({
//               ...formData,
//               end_time: e.target.value,
//             })
//           }
//           className={inputClass}
//         />
//       </div>

//       <div>
//         <label className={labelClass}>Timezone</label>
//         <select
//           value={formData.timezone}
//           onChange={(e) =>
//             setFormData({
//               ...formData,
//               timezone: e.target.value,
//             })
//           }
//           className={selectClass}
//         >
//           <option value="Asia/Kolkata">India (IST)</option>
//           <option value="America/New_York">USA (New York)</option>
//           <option value="America/Chicago">USA (Chicago)</option>
//           <option value="America/Denver">USA (Denver)</option>
//           <option value="America/Los_Angeles">USA (Los Angeles)</option>
//           <option value="Europe/London">United Kingdom</option>
//           <option value="Europe/Paris">France</option>
//           <option value="Europe/Berlin">Germany</option>
//           <option value="Asia/Dubai">UAE</option>
//           <option value="Asia/Singapore">Singapore</option>
//           <option value="Asia/Tokyo">Japan</option>
//           <option value="Australia/Sydney">Australia</option>
//         </select>
//       </div>
//     </div>

//     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//       <div>
//         <label className={labelClass}>Rating</label>
//         <input
//           type="number"
//           step="1"
//           value={formData.rating}
//           onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
//           className={inputClass}
//           placeholder="0"
//         />
//       </div>
//       <div>
//         <label className={labelClass}>Reviews</label>
//         <input
//           type="number"
//           value={formData.reviews}
//           onChange={(e) => setFormData({ ...formData, reviews: e.target.value })}
//           className={inputClass}
//           placeholder="0"
//         />
//       </div>
//       <div>
//         <label className={labelClass}>Distance</label>
//         <input
//           value={formData.distance}
//           onChange={(e) => setFormData({ ...formData, distance: e.target.value })}
//           className={inputClass}
//           placeholder="e.g. 5 km"
//         />
//       </div>
//       <div>
//         <label className={labelClass}>Courses</label>
//         <input
//           type="number"
//           value={formData.courses}
//           onChange={(e) => setFormData({ ...formData, courses: e.target.value })}
//           className={inputClass}
//           placeholder="0"
//         />
//       </div>
//     </div>

//     {/* Category & Subcategory */}
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//       <div>
//         <label className={labelClass}>Category</label>
//         <select
//           value={formData.category_id || ""}
//           onChange={(e) =>
//             setFormData({ ...formData, category_id: e.target.value, subcategory_id: "" })
//           }
//           className={selectClass}
//         >
//           <option value="">Select Category</option>
//           {categories.map((cat) => (
//             <option key={cat.id} value={cat.id}>{cat.name}</option>
//           ))}
//         </select>
//       </div>
//       <div>
//         <label className={labelClass}>Subcategory</label>
//         <select
//           value={formData.subcategory_id || ""}
//           onChange={(e) => setFormData({ ...formData, subcategory_id: e.target.value })}
//           disabled={!formData.category_id}
//           className={`${selectClass} disabled:opacity-50`}
//         >
//           <option value="">Select Subcategory</option>
//           {subcategories
//             .filter((sub) => String(sub.category_id) === String(formData.category_id))
//             .map((sub) => (
//               <option key={sub.id} value={sub.id}>{sub.name}</option>
//             ))}
//         </select>
//       </div>
//     </div>

//     {/* Image */}
//     <div>
//       <label className={labelClass}>Institute Image</label>
//       {editingInstitute?.image_url && !formData.image && (
//         <img
//           src={getImageUrl(editingInstitute.image_url)}
//           alt="Current"
//           className="w-full h-48 object-cover rounded-xl mb-2 border border-[#333]"
//         />
//       )}
//       {formData.image && (
//         <img
//           src={URL.createObjectURL(formData.image)}
//           alt="Preview"
//           className="w-full h-48 object-cover rounded-xl mb-2 border border-[#333]"
//         />
//       )}
//       <input
//         type="file"
//         accept="image/*"
//         onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] })}
//         className="w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-500/20 file:text-purple-300 hover:file:bg-purple-500/30"
//       />
//     </div>
//   </>
// );

// export default function Institutes() {
//   const [institutes, setInstitutes] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const location = useLocation();

//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [editingInstitute, setEditingInstitute] = useState(null);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [instituteToDelete, setInstituteToDelete] = useState(null);

//   const [categories, setCategories] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);
//   const [formData, setFormData] = useState(defaultForm);

//   const token = localStorage.getItem("adminToken");

//   // --- Route-aware status filter ---
//   const routeFiltered = (institutes || []).filter((inst) => {
//     const status = inst?.approval_status?.toUpperCase();
//     if (location.pathname === "/institutes/pending") return status === "PENDING";
//     if (location.pathname === "/institutes/rejected") return status === "REJECTED";
//     return true;
//   });

//   // --- Search filter ---
//   const filteredInstitutes = routeFiltered.filter((inst) => {
//     const query = searchQuery.toLowerCase();
//     return (
//       inst.name?.toLowerCase().includes(query) ||
//       inst.description?.toLowerCase().includes(query) ||
//       inst.email?.toLowerCase().includes(query) ||
//       inst.phone_number?.includes(query) ||
//       inst.city?.toLowerCase().includes(query) ||
//       inst.state?.toLowerCase().includes(query) ||
//       inst.timing?.toLowerCase().includes(query) ||
//       String(inst.id).includes(query) ||
//       String(inst.rating).includes(query) ||
//       String(inst.reviews).includes(query) ||
//       String(inst.distance).includes(query) ||
//       String(inst.courses).includes(query) ||
//       inst.categories?.some(
//         (c) =>
//           c.category_name?.toLowerCase().includes(query) ||
//           c.subcategory_name?.toLowerCase().includes(query)
//       )
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
//       <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${bg} ${text}`}>
//         {status || "Pending"}
//       </span>
//     );
//   };

//   // --- Page title ---
//   const getPageTitle = () => {
//     if (location.pathname === "/institutes/pending") return "Pending Institutes";
//     if (location.pathname === "/institutes/rejected") return "Rejected Institutes";
//     return "Institutes";
//   };

//   const getPageSubtitle = () => {
//     if (location.pathname === "/institutes/pending") return "Review and approve institute applications";
//     if (location.pathname === "/institutes/rejected") return "Institutes rejected by admin";
//     return "Manage all institutes";
//   };

//   // --- Fetch ---
//   const fetchInstitutes = async () => {
//     try {
//       setLoading(true);
//       let response;
//       if (location.pathname === "/institutes/pending") {
//         response = await getPendingInstitutes(token);
//       } else if (location.pathname === "/institutes/rejected") {
//         response = await getRejectedInstitutes(token);
//       } else {
//         response = await getAllInstitutes();
//       }
//       setInstitutes(response?.data || []);
//     } catch (e) {
//       console.error(e);
//       toast.error(e?.response?.data?.message || "Failed to fetch institutes");
//     } finally {
//       setLoading(false);
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
//     fetchInstitutes();
//     fetchDropdowns();
//   }, [location.pathname]);

//   // --- Approve ---
//   const handleApprove = async (institute) => {
//     try {
//       await updateInstituteApproval(institute.id, "APPROVED", token);
//       toast.success("Institute approved successfully");
//       fetchInstitutes();
//     } catch (e) {
//       console.error(e);
//       toast.error(e?.response?.data?.message || "Approval failed");
//     }
//   };

//   // --- Reject ---
//   const handleReject = async (institute) => {
//     try {
//       await updateInstituteApproval(institute.id, "REJECTED", token);
//       toast.success("Institute rejected");
//       fetchInstitutes();
//     } catch (e) {
//       toast.error(e?.response?.data?.message || "Reject failed");
//     }
//   };

//   // --- Delete ---
//   const handleDeleteClick = (institute) => {
//     setInstituteToDelete(institute);
//     setShowDeleteModal(true);
//   };

//   const confirmDelete = async () => {
//     if (!instituteToDelete) return;
//     try {
//       await deleteInstitute(instituteToDelete.id, token);
//       toast.success("Institute deleted");
//       setShowDeleteModal(false);
//       setInstituteToDelete(null);
//       fetchInstitutes();
//     } catch (e) {
//       toast.error(e?.response?.data?.message || "Delete failed");
//     }
//   };

//   // --- Create ---
//   const handleCreate = async (e) => {
//     e.preventDefault();
//     try {
//       const payload = new FormData();
//       Object.entries(formData).forEach(([key, val]) => {
//         if (val !== null && val !== undefined && val !== "") {
//           payload.append(key, val);
//         }
//       });

//       await adminCreateInstitute(payload, token);
//       toast.success("Institute created successfully");
//       setShowCreateModal(false);
//       setFormData(defaultForm);
//       fetchInstitutes();
//     } catch (e) {
//       toast.error(e?.response?.data?.message || "Create failed");
//     }
//   };

//   // --- Edit ---
//   const handleEdit = (institute) => {
//     setEditingInstitute(institute);
//     setFormData({
//       name: institute.name || "",
//       description: institute.description || "",
//       email: institute.email || "",
//       phone_number: institute.phone_number || "",
//       city: institute.city || "",
//       state: institute.state || "",
//       timing: institute.timing || "",
//       start_time: institute.start_time || "",
//       end_time: institute.end_time || "",
//       timezone: institute.timezone || "Asia/Kolkata",
//       rating: institute.rating || "",
//       reviews: institute.reviews || "",
//       distance: institute.distance || "",
//       courses: institute.courses || "",
//       category_id: institute.category_id || "",
//       subcategory_id: institute.subcategory_id || "",
//       image: null,
//     });
//     setShowEditModal(true);
//   };

//   // --- Update ---
//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       const payload = new FormData();
//       Object.keys(formData).forEach((key) => {
//         if (formData[key] !== null && formData[key] !== "") {
//           payload.append(key, formData[key]);
//         }
//       });

//       await updateInstitute(editingInstitute.id, payload, token);
//       toast.success("Institute updated successfully");
//       setShowEditModal(false);
//       setEditingInstitute(null);
//       fetchInstitutes();
//     } catch (e) {
//       toast.error(e?.response?.data?.message || "Update failed");
//     }
//   };

//   const isPendingPage = location.pathname === "/institutes/pending";
//   const isRejectedPage = location.pathname === "/institutes/rejected";

//   return (
//     <div className="p-8 text-white">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//         <div>
//           <h1 className="text-4xl font-bold text-purple-400">{getPageTitle()}</h1>
//           <p className="text-gray-400 mt-2">{getPageSubtitle()}</p>
//         </div>

//         {!isPendingPage && !isRejectedPage && (
//           <button
//             onClick={() => {
//               setFormData(defaultForm);
//               setShowCreateModal(true);
//             }}
//             className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition-opacity"
//           >
//             + Add Institute
//           </button>
//         )}
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
//             placeholder="Search institutes..."
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
//                 <th className="p-4 text-left whitespace-nowrap">Description</th>
//                 <th className="p-4 text-left whitespace-nowrap">Email</th>
//                 <th className="p-4 text-left whitespace-nowrap">Phone</th>
//                 <th className="p-4 text-left whitespace-nowrap">City</th>
//                 <th className="p-4 text-left whitespace-nowrap">State</th>
//                 <th className="p-4 text-left whitespace-nowrap">Timing</th>
//                 <th className="p-4 text-left whitespace-nowrap">Rating</th>
//                 <th className="p-4 text-left whitespace-nowrap">Reviews</th>
//                 <th className="p-4 text-left whitespace-nowrap">Courses</th>
//                 <th className="p-4 text-left whitespace-nowrap">Category</th>
//                 <th className="p-4 text-left whitespace-nowrap">Subcategory</th>
//                 <th className="p-4 text-left whitespace-nowrap">Status</th>
//                 <th className="p-4 text-left whitespace-nowrap">Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan={15} className="p-12 text-center">
//                     <div className="flex flex-col items-center gap-3">
//                       <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
//                       <p className="text-white">Loading institutes...</p>
//                     </div>
//                   </td>
//                 </tr>
//               ) : filteredInstitutes.length === 0 ? (
//                 <tr>
//                   <td colSpan={15} className="p-12 text-center">
//                     <div className="flex flex-col items-center gap-3">
//                       <Search size={40} className="text-white" />
//                       <p className="text-white text-lg">
//                         {searchQuery
//                           ? "No institutes found matching your search"
//                           : "No institutes available"}
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
//                 filteredInstitutes.map((inst) => (
//                   <tr
//                     key={inst.id}
//                     className="border-t border-[#2c2c35] hover:bg-[#1a1a20] transition-colors"
//                   >
//                     <td className="p-4">
//                       {inst.image_url ? (
//                         <img
//                           src={getImageUrl(inst.image_url)}
//                           alt={inst.name}
//                           className="w-11 h-11 rounded-xl object-cover border border-[#333]"
//                           onError={(e) => { e.currentTarget.style.display = "none"; }}
//                         />
//                       ) : (
//                         <div className="w-11 h-11 bg-[#26262b] rounded-xl flex items-center justify-center text-white text-xs">
//                           N/A
//                         </div>
//                       )}
//                     </td>

//                     <td className="p-4 font-medium whitespace-nowrap">{inst.name}</td>
//                     <td className="p-4 text-white max-w-[180px] truncate">{inst.description || "-"}</td>
//                     <td className="p-4 text-white whitespace-nowrap">{inst.email || "-"}</td>
//                     <td className="p-4 text-white whitespace-nowrap">{inst.phone_number || "-"}</td>
//                     <td className="p-4 text-white whitespace-nowrap">{inst.city || "-"}</td>
//                     <td className="p-4 text-white whitespace-nowrap">{inst.state || "-"}</td>
//                     <td className="p-4 text-white whitespace-nowrap">{inst.timing || "-"}</td>

//                     <td className="p-4 font-semibold whitespace-nowrap">
//                       {inst.rating ? Math.round(Number(inst.rating)) : "-"}
//                     </td>

//                     <td className="p-4 font-semibold whitespace-nowrap">{inst.reviews ?? "-"}</td>
//                     <td className="p-4 font-semibold whitespace-nowrap">{inst.courses ?? "-"}</td>
//                     <td className="p-4 text-white max-w-[130px] truncate">
//                       {inst.categories?.length
//                         ? inst.categories.map((c) => c.category_name).filter(Boolean).join(", ")
//                         : "-"}
//                     </td>
//                     <td className="p-4 text-white max-w-[130px] truncate">
//                       {inst.categories?.length
//                         ? inst.categories.map((c) => c.subcategory_name).filter(Boolean).join(", ")
//                         : "-"}
//                     </td>
//                     <td className="p-4 whitespace-nowrap">
//                       <StatusBadge status={inst.approval_status} />
//                     </td>

//                     <td className="p-4">
//                       <div className="flex items-center gap-2">
//                         {inst.approval_status === "PENDING" && (
//                           <>
//                             <button
//                               onClick={() => handleApprove(inst)}
//                               className="p-2 rounded-lg hover:bg-green-500/10 transition-colors group"
//                               title="Approve"
//                             >
//                               <FaCheck size={14} className="text-green-500/70 group-hover:text-green-400 transition-colors" />
//                             </button>
//                             <button
//                               onClick={() => handleReject(inst)}
//                               className="p-2 rounded-lg hover:bg-red-500/10 transition-colors group"
//                               title="Reject"
//                             >
//                               <FaBan size={14} className="text-red-500/70 group-hover:text-red-400 transition-colors" />
//                             </button>
//                           </>
//                         )}

//                         {inst.approval_status !== "PENDING" && (
//                           <>
//                             <button
//                               onClick={() => handleEdit(inst)}
//                               className="p-2 rounded-lg hover:bg-[#2a2a35] transition-colors group"
//                               title="Edit"
//                             >
//                               <Edit size={16} className="text-white group-hover:text-white transition-colors" />
//                             </button>
//                             <button
//                               onClick={() => handleDeleteClick(inst)}
//                               className="p-2 rounded-lg hover:bg-red-500/10 transition-colors group"
//                               title="Delete"
//                             >
//                               <Trash2 size={16} className="text-red-500/70 group-hover:text-red-400 transition-colors" />
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

//       {/* ==================== Create Institute Modal ==================== */}
//       {showCreateModal && (
//         <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
//           <div className="w-full max-w-[700px] max-h-[90vh] bg-[#211c30] rounded-2xl overflow-hidden shadow-2xl">
//             <div className="flex justify-between items-center p-6 border-b border-[#3a3448]">
//               <h2 className="text-2xl font-bold text-white">Create Institute</h2>
//               <button onClick={() => setShowCreateModal(false)} className="text-white hover:text-white transition-colors">
//                 <FaTimes size={20} />
//               </button>
//             </div>
//             <div className="overflow-y-auto max-h-[75vh] p-6">
//               <form onSubmit={handleCreate}>
//                 <FormFields
//                   formData={formData}
//                   setFormData={setFormData}
//                   categories={categories}
//                   subcategories={subcategories}
//                   editingInstitute={editingInstitute}
//                   getImageUrl={getImageUrl}
//                 />
//                 <div className="flex justify-end gap-3 pt-4 border-t border-[#3a3448]">
//                   <button
//                     type="button"
//                     onClick={() => setShowCreateModal(false)}
//                     className="px-5 py-3 rounded-xl border border-gray-600 text-white hover:bg-[#2b2638] transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition-opacity"
//                   >
//                     Create Institute
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ==================== Edit Institute Modal ==================== */}
//       {showEditModal && (
//         <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
//           <div className="w-full max-w-[700px] max-h-[90vh] bg-[#211c30] rounded-2xl overflow-hidden shadow-2xl">
//             <div className="flex justify-between items-center p-6 border-b border-[#3a3448]">
//               <h2 className="text-2xl font-bold text-white">Edit Institute</h2>
//               <button
//                 onClick={() => { setShowEditModal(false); setEditingInstitute(null); }}
//                 className="text-gray-400 hover:text-white transition-colors"
//               >
//                 <FaTimes size={20} />
//               </button>
//             </div>
//             <div className="overflow-y-auto max-h-[75vh] p-6">
//               <form onSubmit={handleUpdate}>
//                 <FormFields
//                   formData={formData}
//                   setFormData={setFormData}
//                   categories={categories}
//                   subcategories={subcategories}
//                   editingInstitute={editingInstitute}
//                   getImageUrl={getImageUrl}
//                 />
//                 <div className="flex justify-end gap-3 pt-4 border-t border-[#3a3448]">
//                   <button
//                     type="button"
//                     onClick={() => { setShowEditModal(false); setEditingInstitute(null); }}
//                     className="px-5 py-3 rounded-xl border border-gray-600 text-gray-300 hover:bg-[#2b2638] transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition-opacity"
//                   >
//                     Update Institute
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
//               <h2 className="text-xl font-bold text-white mb-3 text-center">Delete Institute</h2>
//               <p className="text-gray-400 text-center text-sm leading-relaxed mb-8">
//                 Are you sure you want to delete this institute?
//               </p>
//               <div className="flex gap-3 w-full">
//                 <button
//                   onClick={() => { setShowDeleteModal(false); setInstituteToDelete(null); }}
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


import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Edit, Trash2, Search } from "lucide-react";
import { FaTrash, FaTimes, FaCheck, FaBan } from "react-icons/fa";

import API from "../services/api";
import {
  getAllInstitutes,
  getPendingInstitutes,
  getRejectedInstitutes,
  adminCreateInstitute,
  updateInstitute,
  updateInstituteApproval,
  deleteInstitute,
} from "../services/instituteService";

const inputClass =
  "w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors";
const selectClass =
  "w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors";
const labelClass = "block text-sm text-white mb-1";

const defaultForm = {
  name: "",
  description: "",
  email: "",
  phone_number: "",
  city: "",
  state: "",
  timing: "",
  start_time: "",
  end_time: "",
  timezone: "Asia/Kolkata",
  rating: "",
  reviews: "",
  distance: "",
  courses: "",
  category_id: "",
  subcategory_id: "",
  image: null,
  logo: null,
};

// --- Shared form fields component ---
const FormFields = ({
  formData,
  setFormData,
  categories,
  subcategories,
  editingInstitute,
  getImageUrl,
}) => (
  <>
    <div>
      <label className={labelClass}>Institute Name</label>
      <input
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className={inputClass}
        placeholder="Enter institute name"
        required
      />
    </div>

    <div>
      <label className={labelClass}>Description</label>
      <textarea
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        rows="3"
        className={inputClass}
        placeholder="Enter description"
      />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className={labelClass}>Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={inputClass}
          placeholder="Enter email"
        />
      </div>
      <div>
        <label className={labelClass}>Phone</label>
        <input
          value={formData.phone_number}
          onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
          className={inputClass}
          placeholder="Enter phone number"
        />
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div>
        <label className={labelClass}>Timing</label>
        <input
          value={formData.timing}
          onChange={(e) =>
            setFormData({
              ...formData,
              timing: e.target.value,
            })
          }
          className={inputClass}
          placeholder="9 AM - 6 PM"
        />
      </div>

      <div>
        <label className={labelClass}>Start Time</label>
        <input
          type="time"
          value={formData.start_time}
          onChange={(e) =>
            setFormData({
              ...formData,
              start_time: e.target.value,
            })
          }
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>End Time</label>
        <input
          type="time"
          value={formData.end_time}
          onChange={(e) =>
            setFormData({
              ...formData,
              end_time: e.target.value,
            })
          }
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Timezone</label>
        <select
          value={formData.timezone}
          onChange={(e) =>
            setFormData({
              ...formData,
              timezone: e.target.value,
            })
          }
          className={selectClass}
        >
          <option value="Asia/Kolkata">India (IST)</option>
          <option value="America/New_York">USA (New York)</option>
          <option value="America/Chicago">USA (Chicago)</option>
          <option value="America/Denver">USA (Denver)</option>
          <option value="America/Los_Angeles">USA (Los Angeles)</option>
          <option value="Europe/London">United Kingdom</option>
          <option value="Europe/Paris">France</option>
          <option value="Europe/Berlin">Germany</option>
          <option value="Asia/Dubai">UAE</option>
          <option value="Asia/Singapore">Singapore</option>
          <option value="Asia/Tokyo">Japan</option>
          <option value="Australia/Sydney">Australia</option>
        </select>
      </div>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div>
        <label className={labelClass}>Rating</label>
        <input
          type="number"
          step="1"
          value={formData.rating}
          onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
          className={inputClass}
          placeholder="0"
        />
      </div>
      <div>
        <label className={labelClass}>Reviews</label>
        <input
          type="number"
          value={formData.reviews}
          onChange={(e) => setFormData({ ...formData, reviews: e.target.value })}
          className={inputClass}
          placeholder="0"
        />
      </div>
      <div>
        <label className={labelClass}>Distance</label>
        <input
          value={formData.distance}
          onChange={(e) => setFormData({ ...formData, distance: e.target.value })}
          className={inputClass}
          placeholder="e.g. 5 km"
        />
      </div>
      <div>
        <label className={labelClass}>Courses</label>
        <input
          type="number"
          value={formData.courses}
          onChange={(e) => setFormData({ ...formData, courses: e.target.value })}
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
            setFormData({ ...formData, category_id: e.target.value, subcategory_id: "" })
          }
          className={selectClass}
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className={labelClass}>Subcategory</label>
        <select
          value={formData.subcategory_id || ""}
          onChange={(e) => setFormData({ ...formData, subcategory_id: e.target.value })}
          disabled={!formData.category_id}
          className={`${selectClass} disabled:opacity-50`}
        >
          <option value="">Select Subcategory</option>
          {subcategories
            .filter((sub) => String(sub.category_id) === String(formData.category_id))
            .map((sub) => (
              <option key={sub.id} value={sub.id}>{sub.name}</option>
            ))}
        </select>
      </div>
    </div>

    {/* Logo */}
    <div>
      <label className={labelClass}>Institute Logo</label>
      {editingInstitute?.logo && !formData.logo && (
        <img
          src={getImageUrl(editingInstitute.logo)}
          alt="Current Logo"
          className="w-24 h-24 object-contain rounded-xl mb-2 border border-[#333] bg-[#1a1a20] p-1"
        />
      )}
      {formData.logo && (
        <img
          src={URL.createObjectURL(formData.logo)}
          alt="Logo Preview"
          className="w-24 h-24 object-contain rounded-xl mb-2 border border-[#333] bg-[#1a1a20] p-1"
        />
      )}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFormData({ ...formData, logo: e.target.files?.[0] })}
        className="w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-500/20 file:text-purple-300 hover:file:bg-purple-500/30"
      />
    </div>

    {/* Image */}
    <div>
      <label className={labelClass}>Institute Image</label>
      {editingInstitute?.image_url && !formData.image && (
        <img
          src={getImageUrl(editingInstitute.image_url)}
          alt="Current"
          className="w-full h-48 object-cover rounded-xl mb-2 border border-[#333]"
        />
      )}
      {formData.image && (
        <img
          src={URL.createObjectURL(formData.image)}
          alt="Preview"
          className="w-full h-48 object-cover rounded-xl mb-2 border border-[#333]"
        />
      )}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] })}
        className="w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-500/20 file:text-purple-300 hover:file:bg-purple-500/30"
      />
    </div>
  </>
);

export default function Institutes() {
  const [institutes, setInstitutes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingInstitute, setEditingInstitute] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [instituteToDelete, setInstituteToDelete] = useState(null);

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [formData, setFormData] = useState(defaultForm);

  const token = localStorage.getItem("adminToken");

  // --- Route-aware status filter ---
  const routeFiltered = (institutes || []).filter((inst) => {
    const status = inst?.approval_status?.toUpperCase();
    if (location.pathname === "/institutes/pending") return status === "PENDING";
    if (location.pathname === "/institutes/rejected") return status === "REJECTED";
    return true;
  });

  // --- Search filter ---
  const filteredInstitutes = routeFiltered.filter((inst) => {
    const query = searchQuery.toLowerCase();
    return (
      inst.name?.toLowerCase().includes(query) ||
      inst.description?.toLowerCase().includes(query) ||
      inst.email?.toLowerCase().includes(query) ||
      inst.phone_number?.includes(query) ||
      inst.city?.toLowerCase().includes(query) ||
      inst.state?.toLowerCase().includes(query) ||
      inst.timing?.toLowerCase().includes(query) ||
      String(inst.id).includes(query) ||
      String(inst.rating).includes(query) ||
      String(inst.reviews).includes(query) ||
      String(inst.distance).includes(query) ||
      String(inst.courses).includes(query) ||
      inst.categories?.some(
        (c) =>
          c.category_name?.toLowerCase().includes(query) ||
          c.subcategory_name?.toLowerCase().includes(query)
      )
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
      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${bg} ${text}`}>
        {status || "Pending"}
      </span>
    );
  };

  // --- Page title ---
  const getPageTitle = () => {
    if (location.pathname === "/institutes/pending") return "Pending Institutes";
    if (location.pathname === "/institutes/rejected") return "Rejected Institutes";
    return "Institutes";
  };

  const getPageSubtitle = () => {
    if (location.pathname === "/institutes/pending") return "Review and approve institute applications";
    if (location.pathname === "/institutes/rejected") return "Institutes rejected by admin";
    return "Manage all institutes";
  };

  // --- Fetch ---
  const fetchInstitutes = async () => {
    try {
      setLoading(true);
      let response;
      if (location.pathname === "/institutes/pending") {
        response = await getPendingInstitutes(token);
      } else if (location.pathname === "/institutes/rejected") {
        response = await getRejectedInstitutes(token);
      } else {
        response = await getAllInstitutes();
      }
      setInstitutes(response?.data || []);
    } catch (e) {
      console.error(e);
      toast.error(e?.response?.data?.message || "Failed to fetch institutes");
    } finally {
      setLoading(false);
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
    fetchInstitutes();
    fetchDropdowns();
  }, [location.pathname]);

  // --- Approve ---
  const handleApprove = async (institute) => {
    try {
      await updateInstituteApproval(institute.id, "APPROVED", token);
      toast.success("Institute approved successfully");
      fetchInstitutes();
    } catch (e) {
      console.error(e);
      toast.error(e?.response?.data?.message || "Approval failed");
    }
  };

  // --- Reject ---
  const handleReject = async (institute) => {
    try {
      await updateInstituteApproval(institute.id, "REJECTED", token);
      toast.success("Institute rejected");
      fetchInstitutes();
    } catch (e) {
      toast.error(e?.response?.data?.message || "Reject failed");
    }
  };

  // --- Delete ---
  const handleDeleteClick = (institute) => {
    setInstituteToDelete(institute);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!instituteToDelete) return;
    try {
      await deleteInstitute(instituteToDelete.id, token);
      toast.success("Institute deleted");
      setShowDeleteModal(false);
      setInstituteToDelete(null);
      fetchInstitutes();
    } catch (e) {
      toast.error(e?.response?.data?.message || "Delete failed");
    }
  };

  // --- Create ---
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, val]) => {
        if (val !== null && val !== undefined && val !== "") {
          payload.append(key, val);
        }
      });

      await adminCreateInstitute(payload, token);
      toast.success("Institute created successfully");
      setShowCreateModal(false);
      setFormData(defaultForm);
      fetchInstitutes();
    } catch (e) {
      toast.error(e?.response?.data?.message || "Create failed");
    }
  };

  // --- Edit ---
  const handleEdit = (institute) => {
    setEditingInstitute(institute);
    setFormData({
      name: institute.name || "",
      description: institute.description || "",
      email: institute.email || "",
      phone_number: institute.phone_number || "",
      city: institute.city || "",
      state: institute.state || "",
      timing: institute.timing || "",
      start_time: institute.start_time || "",
      end_time: institute.end_time || "",
      timezone: institute.timezone || "Asia/Kolkata",
      rating: institute.rating || "",
      reviews: institute.reviews || "",
      distance: institute.distance || "",
      courses: institute.courses || "",
      category_id: institute.category_id || "",
      subcategory_id: institute.subcategory_id || "",
      image: null,
      logo: null,
    });
    setShowEditModal(true);
  };

  // --- Update ---
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const payload = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null && formData[key] !== "") {
          payload.append(key, formData[key]);
        }
      });

      await updateInstitute(editingInstitute.id, payload, token);
      toast.success("Institute updated successfully");
      setShowEditModal(false);
      setEditingInstitute(null);
      fetchInstitutes();
    } catch (e) {
      toast.error(e?.response?.data?.message || "Update failed");
    }
  };

  const isPendingPage = location.pathname === "/institutes/pending";
  const isRejectedPage = location.pathname === "/institutes/rejected";

  return (
    <div className="p-8 text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-4xl font-bold text-purple-400">{getPageTitle()}</h1>
          <p className="text-gray-400 mt-2">{getPageSubtitle()}</p>
        </div>

        {!isPendingPage && !isRejectedPage && (
          <button
            onClick={() => {
              setFormData(defaultForm);
              setShowCreateModal(true);
            }}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition-opacity"
          >
            + Add Institute
          </button>
        )}
      </div>

      {/* Full-width Search Bar */}
      <div className="mb-6">
        <div className="relative w-full">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
            size={18}
          />
          <input
            type="text"
            placeholder="Search institutes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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

      {/* Table */}
      <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#202027] text-white">
              <tr>
                <th className="p-4 text-left whitespace-nowrap">Logo</th>
                <th className="p-4 text-left whitespace-nowrap">Image</th>
                <th className="p-4 text-left whitespace-nowrap">Name</th>
                <th className="p-4 text-left whitespace-nowrap">Description</th>
                <th className="p-4 text-left whitespace-nowrap">Email</th>
                <th className="p-4 text-left whitespace-nowrap">Phone</th>
                <th className="p-4 text-left whitespace-nowrap">City</th>
                <th className="p-4 text-left whitespace-nowrap">State</th>
                <th className="p-4 text-left whitespace-nowrap">Timing</th>
                <th className="p-4 text-left whitespace-nowrap">Rating</th>
                <th className="p-4 text-left whitespace-nowrap">Reviews</th>
                <th className="p-4 text-left whitespace-nowrap">Courses</th>
                <th className="p-4 text-left whitespace-nowrap">Category</th>
                <th className="p-4 text-left whitespace-nowrap">Subcategory</th>
                <th className="p-4 text-left whitespace-nowrap">Status</th>
                <th className="p-4 text-left whitespace-nowrap">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={16} className="p-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                      <p className="text-white">Loading institutes...</p>
                    </div>
                  </td>
                </tr>
              ) : filteredInstitutes.length === 0 ? (
                <tr>
                  <td colSpan={16} className="p-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <Search size={40} className="text-white" />
                      <p className="text-white text-lg">
                        {searchQuery
                          ? "No institutes found matching your search"
                          : "No institutes available"}
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
                filteredInstitutes.map((inst) => (
                  <tr
                    key={inst.id}
                    className="border-t border-[#2c2c35] hover:bg-[#1a1a20] transition-colors"
                  >
                    {/* Logo Column */}
                    <td className="p-4">
                      {inst.logo ? (
                        <img
                          src={getImageUrl(inst.logo)}
                          alt={`${inst.name} logo`}
                          className="w-11 h-11 rounded-xl object-contain border border-[#333] bg-[#1a1a20] p-0.5"
                          onError={(e) => { e.currentTarget.style.display = "none"; }}
                        />
                      ) : (
                        <div className="w-11 h-11 bg-[#26262b] rounded-xl flex items-center justify-center text-white text-[10px] leading-tight text-center">
                          No<br />Logo
                        </div>
                      )}
                    </td>

                    {/* Image Column */}
                    <td className="p-4">
                      {inst.image_url ? (
                        <img
                          src={getImageUrl(inst.image_url)}
                          alt={inst.name}
                          className="w-11 h-11 rounded-xl object-cover border border-[#333]"
                          onError={(e) => { e.currentTarget.style.display = "none"; }}
                        />
                      ) : (
                        <div className="w-11 h-11 bg-[#26262b] rounded-xl flex items-center justify-center text-white text-xs">
                          N/A
                        </div>
                      )}
                    </td>

                    <td className="p-4 font-medium whitespace-nowrap">{inst.name}</td>
                    <td className="p-4 text-white max-w-[180px] truncate">{inst.description || "-"}</td>
                    <td className="p-4 text-white whitespace-nowrap">{inst.email || "-"}</td>
                    <td className="p-4 text-white whitespace-nowrap">{inst.phone_number || "-"}</td>
                    <td className="p-4 text-white whitespace-nowrap">{inst.city || "-"}</td>
                    <td className="p-4 text-white whitespace-nowrap">{inst.state || "-"}</td>
                    <td className="p-4 text-white whitespace-nowrap">{inst.timing || "-"}</td>

                    <td className="p-4 font-semibold whitespace-nowrap">
                      {inst.rating ? Math.round(Number(inst.rating)) : "-"}
                    </td>

                    <td className="p-4 font-semibold whitespace-nowrap">{inst.reviews ?? "-"}</td>
                    <td className="p-4 font-semibold whitespace-nowrap">{inst.courses ?? "-"}</td>
                    <td className="p-4 text-white max-w-[130px] truncate">
                      {inst.categories?.length
                        ? inst.categories.map((c) => c.category_name).filter(Boolean).join(", ")
                        : "-"}
                    </td>
                    <td className="p-4 text-white max-w-[130px] truncate">
                      {inst.categories?.length
                        ? inst.categories.map((c) => c.subcategory_name).filter(Boolean).join(", ")
                        : "-"}
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <StatusBadge status={inst.approval_status} />
                    </td>

                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {inst.approval_status === "PENDING" && (
                          <>
                            <button
                              onClick={() => handleApprove(inst)}
                              className="p-2 rounded-lg hover:bg-green-500/10 transition-colors group"
                              title="Approve"
                            >
                              <FaCheck size={14} className="text-green-500/70 group-hover:text-green-400 transition-colors" />
                            </button>
                            <button
                              onClick={() => handleReject(inst)}
                              className="p-2 rounded-lg hover:bg-red-500/10 transition-colors group"
                              title="Reject"
                            >
                              <FaBan size={14} className="text-red-500/70 group-hover:text-red-400 transition-colors" />
                            </button>
                          </>
                        )}

                        {inst.approval_status !== "PENDING" && (
                          <>
                            <button
                              onClick={() => handleEdit(inst)}
                              className="p-2 rounded-lg hover:bg-[#2a2a35] transition-colors group"
                              title="Edit"
                            >
                              <Edit size={16} className="text-white group-hover:text-white transition-colors" />
                            </button>
                            <button
                              onClick={() => handleDeleteClick(inst)}
                              className="p-2 rounded-lg hover:bg-red-500/10 transition-colors group"
                              title="Delete"
                            >
                              <Trash2 size={16} className="text-red-500/70 group-hover:text-red-400 transition-colors" />
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

      {/* ==================== Create Institute Modal ==================== */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="w-full max-w-[700px] max-h-[90vh] bg-[#211c30] rounded-2xl overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-[#3a3448]">
              <h2 className="text-2xl font-bold text-white">Create Institute</h2>
              <button onClick={() => setShowCreateModal(false)} className="text-white hover:text-white transition-colors">
                <FaTimes size={20} />
              </button>
            </div>
            <div className="overflow-y-auto max-h-[75vh] p-6">
              <form onSubmit={handleCreate}>
                <FormFields
                  formData={formData}
                  setFormData={setFormData}
                  categories={categories}
                  subcategories={subcategories}
                  editingInstitute={editingInstitute}
                  getImageUrl={getImageUrl}
                />
                <div className="flex justify-end gap-3 pt-4 border-t border-[#3a3448]">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-5 py-3 rounded-xl border border-gray-600 text-white hover:bg-[#2b2638] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition-opacity"
                  >
                    Create Institute
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ==================== Edit Institute Modal ==================== */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="w-full max-w-[700px] max-h-[90vh] bg-[#211c30] rounded-2xl overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-[#3a3448]">
              <h2 className="text-2xl font-bold text-white">Edit Institute</h2>
              <button
                onClick={() => { setShowEditModal(false); setEditingInstitute(null); }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaTimes size={20} />
              </button>
            </div>
            <div className="overflow-y-auto max-h-[75vh] p-6">
              <form onSubmit={handleUpdate}>
                <FormFields
                  formData={formData}
                  setFormData={setFormData}
                  categories={categories}
                  subcategories={subcategories}
                  editingInstitute={editingInstitute}
                  getImageUrl={getImageUrl}
                />
                <div className="flex justify-end gap-3 pt-4 border-t border-[#3a3448]">
                  <button
                    type="button"
                    onClick={() => { setShowEditModal(false); setEditingInstitute(null); }}
                    className="px-5 py-3 rounded-xl border border-gray-600 text-gray-300 hover:bg-[#2b2638] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition-opacity"
                  >
                    Update Institute
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
              <h2 className="text-xl font-bold text-white mb-3 text-center">Delete Institute</h2>
              <p className="text-gray-400 text-center text-sm leading-relaxed mb-8">
                Are you sure you want to delete this institute?
              </p>
              <div className="flex gap-3 w-full">
                <button
                  onClick={() => { setShowDeleteModal(false); setInstituteToDelete(null); }}
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