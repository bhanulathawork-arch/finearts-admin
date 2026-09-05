// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { Edit, Trash2, Search } from "lucide-react";
// import { FaTrash, FaTimes, FaStar } from "react-icons/fa";


// import {
//   getTestimonials,
//   createTestimonial,
//   updateTestimonial,
//   deleteTestimonial,
// } from "../services/testimonialService";

// function Testimonials() {
//   const [testimonials, setTestimonials] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Add Modal States
//   const [showModal, setShowModal] = useState(false);
//   const [name, setName] = useState("");
//   const [course, setCourse] = useState("");
//   const [rating, setRating] = useState("");
//   const [text, setText] = useState("");
//   const [imageFile, setImageFile] = useState(null);
//   const [preview, setPreview] = useState("");
//   const [videoFile, setVideoFile] = useState(null);
//   const [videoPreview, setVideoPreview] = useState("");

//   // Delete Modal States
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [selectedTestimonial, setSelectedTestimonial] = useState(null);

//   // Edit Modal States
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [editForm, setEditForm] = useState({
//     id: "",
//     name: "",
//     role: "",
//     rating: "",
//     text: "",
//   });
//   const [editImageFile, setEditImageFile] = useState(null);
//   const [editPreview, setEditPreview] = useState("");
//   const [editVideoFile, setEditVideoFile] = useState(null);
//   const [editVideoPreview, setEditVideoPreview] = useState("");

//   // ── No more localStorage token ──
//   // Axios interceptor in api.js attaches the Firebase token automatically.
//   // The backend auth middleware decodes it → sets req.instituteId.
//   // The controller/service filters by that instituteId.
//   // Institute A can NEVER see Institute B's testimonials.

//   const totalColumns = 8;

//   const getAvatarUrl = (item) => {
//     const img = item?.avatar || item?.image;
//     if (!img) return "";
//     if (img.startsWith("http")) return img;
//     return `${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"}${img}`;
//   };

//   const getVideoUrl = (item) => {
//     const url = item?.video_url || item?.video;
//     if (!url) return "";
//     if (url.startsWith("http")) return url;
//     return `${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"}${url}`;
//   };

//   // --- Filtered Testimonials ---
//   const filteredTestimonials = testimonials.filter((item) => {
//     const query = searchQuery.toLowerCase();
//     return (
//       String(item.id).includes(query) ||
//       item.student_name?.toLowerCase().includes(query) ||
//       item.role?.toLowerCase().includes(query) ||
//       String(item.rating).includes(query) ||
//       item.testimonial_text?.toLowerCase().includes(query)
//     );
//   });

//   const fetchTestimonials = async () => {
//     setLoading(true);
//     try {
//       const data = await getTestimonials();
//       setTestimonials(data || []);
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to fetch testimonials");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTestimonials();
//   }, []);

//   // --- Add Logic ---
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImageFile(file);
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleVideoChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setVideoFile(file);
//       setVideoPreview(URL.createObjectURL(file));
//     }
//   };

//   const resetAddForm = () => {
//     setName("");
//     setCourse("");
//     setRating("");
//     setText("");
//     setImageFile(null);
//     setPreview("");
//     setVideoFile(null);
//     setVideoPreview("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("student_name", name);
//     formData.append("role", course);
//     formData.append("rating", rating);
//     formData.append("testimonial_text", text);
//     if (imageFile) {
//       formData.append("avatar", imageFile);
//     }
//     if (videoFile) {
//       formData.append("video", videoFile);
//     } else {
//       toast.error("Video is required");
//       return;
//     }

//     try {
//       await createTestimonial(formData);
//       toast.success("Testimonial added successfully");
//       setShowModal(false);
//       resetAddForm();
//       fetchTestimonials();
//     } catch (error) {
//       toast.error("Failed to add testimonial");
//     }
//   };

//   // --- Edit Logic ---
//   const handleEdit = (item) => {
//     setEditForm({
//       id: item.id,
//       name: item.student_name || "",
//       role: item.role || "",
//       rating: item.rating || "",
//       text: item.testimonial_text || "",
//     });
//     setEditPreview(getAvatarUrl(item));
//     setEditVideoPreview(getVideoUrl(item));
//     setEditImageFile(null);
//     setEditVideoFile(null);
//     setShowEditModal(true);
//   };

//   const handleEditImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setEditImageFile(file);
//       setEditPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleEditVideoChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setEditVideoFile(file);
//       setEditVideoPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("student_name", editForm.name);
//     formData.append("role", editForm.role);
//     formData.append("rating", editForm.rating);
//     formData.append("testimonial_text", editForm.text);

//     if (editImageFile) {
//       formData.append("avatar", editImageFile);
//     }

//     if (editVideoFile) {
//       formData.append("video", editVideoFile);
//     }

//     try {
//       await updateTestimonial(editForm.id, formData);
//       toast.success("Testimonial updated successfully");
//       setShowEditModal(false);
//       fetchTestimonials();
//     } catch (error) {
//       toast.error("Failed to update testimonial");
//     }
//   };

//   // --- Delete Logic ---
//   const handleDelete = (item) => {
//     setSelectedTestimonial(item);
//     setShowDeleteModal(true);
//   };

//   const confirmDelete = async () => {
//     if (!selectedTestimonial) return;
//     try {
//       await deleteTestimonial(selectedTestimonial.id);
//       toast.success("Testimonial deleted successfully");
//       setShowDeleteModal(false);
//       setSelectedTestimonial(null);
//       fetchTestimonials();
//     } catch (error) {
//       toast.error("Failed to delete testimonial");
//     }
//   };

//   return (
//     <div className="p-8 text-white">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//         <div>
//           <h1 className="text-4xl font-bold text-purple-400">Testimonials</h1>
//           <p className="text-white mt-2">Manage student reviews</p>
//         </div>

//         <button
//           onClick={() => setShowModal(true)}
//           className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition-opacity"
//         >
//           + Add Testimonial
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
//             placeholder="Search by name, role, or text..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full pl-12 pr-10 py-3.5 rounded-xl bg-[#151519] border border-[#2c2c35] text-white placeholder-white focus:outline-none focus:border-purple-500/60 transition-colors text-sm"
//           />
//           {searchQuery && (
//             <button
//               onClick={() => setSearchQuery("")}
//               className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-white transition-colors"
//             >
//               <FaTimes size={14} />
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Table */}
//       <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full min-w-max">
//             <thead className="bg-[#202027] text-white">
//               <tr>
//                 <th className="p-4 text-left whitespace-nowrap">ID</th>
//                 <th className="p-4 text-left whitespace-nowrap">Avatar</th>
//                 <th className="p-4 text-left whitespace-nowrap">Student Name</th>
//                 <th className="p-4 text-left whitespace-nowrap">Course</th>
//                 <th className="p-4 text-left whitespace-nowrap">Rating</th>
//                 <th className="p-4 text-left whitespace-nowrap">Testimonial</th>
//                 <th className="p-4 text-left whitespace-nowrap">Video</th>
//                 <th className="p-4 text-left whitespace-nowrap">Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan={totalColumns} className="p-12 text-center">
//                     <div className="flex flex-col items-center gap-3">
//                       <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
//                       <p className="text-gray-500 text-lg">Loading testimonials...</p>
//                     </div>
//                   </td>
//                 </tr>
//               ) : filteredTestimonials.length === 0 ? (
//                 <tr>
//                   <td colSpan={totalColumns} className="p-12 text-center">
//                     <div className="flex flex-col items-center gap-3">
//                       <Search size={40} className="text-white" />
//                       <p className="text-gray-500 text-lg">
//                         {searchQuery
//                           ? "No testimonials found matching your search"
//                           : "No testimonials available"}
//                       </p>
//                       {searchQuery && (
//                         <button
//                           onClick={() => setSearchQuery("")}
//                           className="text-purple-400 hover:text-white text-sm mt-1 transition-colors"
//                         >
//                           Clear search
//                         </button>
//                       )}
//                     </div>
//                   </td>
//                 </tr>
//               ) : (
//                 filteredTestimonials.map((item) => (
//                   <tr
//                     key={item.id}
//                     className="border-t border-[#2c2c35] hover:bg-[#1a1a20] transition-colors"
//                   >
//                     <td className="p-4 text-white whitespace-nowrap">
//                       {item.id}
//                     </td>

//                     <td className="p-4 whitespace-nowrap">
//                       {getAvatarUrl(item) ? (
//                         <img
//                           src={getAvatarUrl(item)}
//                           alt={item.student_name}
//                           className="w-11 h-11 rounded-xl object-cover border border-[#333]"
//                           onError={(e) => {
//                             e.currentTarget.style.display = "none";
//                           }}
//                         />
//                       ) : (
//                         <div className="w-11 h-11 bg-[#26262b] rounded-xl flex items-center justify-center text-white text-xs">
//                           N/A
//                         </div>
//                       )}
//                     </td>

//                     <td className="p-4 font-medium whitespace-nowrap">
//                       {item.student_name}
//                     </td>

//                     <td className="p-4 text-white whitespace-nowrap">
//                       {item.role}
//                     </td>

//                     <td className="p-4 whitespace-nowrap">
//                       <div className="flex items-center gap-1">
//                         {[1, 2, 3, 4, 5].map((star) => (
//                           <FaStar
//                             key={star}
//                             size={12}
//                             className={
//                               star <= Number(item.rating)
//                                 ? "text-yellow-400"
//                                 : "text-gray-600"
//                             }
//                           />
//                         ))}
//                         <span className="text-gray-400 text-xs ml-1">
//                           {item.rating}
//                         </span>
//                       </div>
//                     </td>

//                     <td
//                       className="p-4 text-white max-w-[200px] truncate whitespace-nowrap"
//                       title={item.testimonial_text}
//                     >
//                       {item.testimonial_text}
//                     </td>

//                     <td className="p-4">
//                       {getVideoUrl(item) ? (
//                         <video
//                           controls
//                           className="w-28 rounded-lg"
//                         >
//                           <source src={getVideoUrl(item)} />
//                         </video>
//                       ) : (
//                         "N/A"
//                       )}
//                     </td>

//                     <td className="p-4 whitespace-nowrap">
//                       <div className="flex items-center gap-2">
//                         <button
//                           onClick={() => handleEdit(item)}
//                           className="p-2 rounded-lg hover:bg-[#2a2a35] transition-colors group"
//                           title="Edit"
//                         >
//                           <Edit
//                             size={16}
//                             className="text-white group-hover:text-white transition-colors"
//                           />
//                         </button>
//                         <button
//                           onClick={() => handleDelete(item)}
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

//       {/* ==================== Add Testimonial Modal ==================== */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
//           <div className="w-full max-w-[520px] max-h-[90vh] bg-[#211c30] rounded-2xl overflow-hidden shadow-2xl">
//             <div className="flex justify-between items-center p-6 border-b border-[#3a3448]">
//               <h2 className="text-2xl font-bold text-white">Add Testimonial</h2>
//               <button
//                 onClick={() => {
//                   setShowModal(false);
//                   resetAddForm();
//                 }}
//                 className="text-gray-400 hover:text-white transition-colors"
//               >
//                 <FaTimes size={20} />
//               </button>
//             </div>

//             <div className="overflow-y-auto max-h-[75vh] p-6">
//               <form onSubmit={handleSubmit} className="space-y-1">
//                 <div>
//                   <label className="block text-sm text-gray-400 mb-1">Student Name</label>
//                   <input
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     className="w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm text-gray-400 mb-1">Course</label>
//                   <input
//                     value={course}
//                     onChange={(e) => setCourse(e.target.value)}
//                     className="w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm text-gray-400 mb-1">Rating</label>
//                   <select
//                     value={rating}
//                     onChange={(e) => setRating(e.target.value)}
//                     className="w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors"
//                     required
//                   >
//                     <option value="">Select Rating</option>
//                     {[1, 2, 3, 4, 5].map((star) => (
//                       <option key={star} value={star}>
//                         {star} Star{star > 1 ? "s" : ""}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm text-gray-400 mb-1">Testimonial Text</label>
//                   <textarea
//                     value={text}
//                     onChange={(e) => setText(e.target.value)}
//                     rows={4}
//                     className="w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm text-gray-400 mb-1">Upload Avatar</label>
//                   {preview && (
//                     <img
//                       src={preview}
//                       alt="preview"
//                       className="w-full h-40 object-cover rounded-xl mb-2 border border-[#333]"
//                     />
//                   )}
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageChange}
//                     className="w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-500/20 file:text-purple-300 hover:file:bg-purple-500/30"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm text-gray-400 mb-1">
//                     Upload Testimonial Video
//                   </label>

//                   {videoPreview && (
//                     <video
//                       controls
//                       className="w-full h-48 rounded-xl mb-2"
//                     >
//                       <source src={videoPreview} />
//                     </video>
//                   )}

//                   <input
//                     type="file"
//                     accept="video/mp4,video/webm,video/quicktime"
//                     onChange={handleVideoChange}
//                     required
//                     className="w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-500/20 file:text-purple-300 hover:file:bg-purple-500/30"
//                   />
//                 </div>

//                 <div className="flex justify-end gap-3 pt-4 border-t border-[#3a3448]">
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setShowModal(false);
//                       resetAddForm();
//                     }}
//                     className="px-5 py-3 rounded-xl border border-gray-600 text-gray-300 hover:bg-[#2b2638] transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition-opacity"
//                   >
//                     Add Testimonial
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ==================== Edit Testimonial Modal ==================== */}
//       {showEditModal && (
//         <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
//           <div className="w-full max-w-[520px] max-h-[90vh] bg-[#211c30] rounded-2xl overflow-hidden shadow-2xl">
//             <div className="flex justify-between items-center p-6 border-b border-[#3a3448]">
//               <h2 className="text-2xl font-bold text-white">Edit Testimonial</h2>
//               <button
//                 onClick={() => setShowEditModal(false)}
//                 className="text-gray-400 hover:text-white transition-colors"
//               >
//                 <FaTimes size={20} />
//               </button>
//             </div>

//             <div className="overflow-y-auto max-h-[75vh] p-6">
//               <form onSubmit={handleUpdate} className="space-y-1">
//                 <div>
//                   <label className="block text-sm text-gray-400 mb-1">Student Name</label>
//                   <input
//                     value={editForm.name}
//                     onChange={(e) =>
//                       setEditForm({ ...editForm, name: e.target.value })
//                     }
//                     className="w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm text-gray-400 mb-1">Course</label>
//                   <input
//                     value={editForm.role}
//                     onChange={(e) =>
//                       setEditForm({ ...editForm, role: e.target.value })
//                     }
//                     className="w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm text-gray-400 mb-1">Rating</label>
//                   <select
//                     value={editForm.rating}
//                     onChange={(e) =>
//                       setEditForm({ ...editForm, rating: e.target.value })
//                     }
//                     className="w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors"
//                     required
//                   >
//                     <option value="">Select Rating</option>
//                     {[1, 2, 3, 4, 5].map((star) => (
//                       <option key={star} value={star}>
//                         {star} Star{star > 1 ? "s" : ""}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm text-gray-400 mb-1">Testimonial Text</label>
//                   <textarea
//                     value={editForm.text}
//                     onChange={(e) =>
//                       setEditForm({ ...editForm, text: e.target.value })
//                     }
//                     rows={4}
//                     className="w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm text-gray-400 mb-1">Update Avatar</label>
//                   {editPreview && (
//                     <img
//                       src={editPreview}
//                       alt="preview"
//                       className="w-full h-40 object-cover rounded-xl mb-2 border border-[#333]"
//                     />
//                   )}
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleEditImageChange}
//                     className="w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-500/20 file:text-purple-300 hover:file:bg-purple-500/30"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm text-gray-400 mb-1">
//                     Replace Video
//                   </label>

//                   {editVideoPreview && (
//                     <video
//                       controls
//                       className="w-full h-48 rounded-xl mb-2"
//                     >
//                       <source src={editVideoPreview} />
//                     </video>
//                   )}

//                   <input
//                     type="file"
//                     accept="video/mp4,video/webm,video/quicktime"
//                     onChange={handleEditVideoChange}
//                     className="w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-500/20 file:text-purple-300 hover:file:bg-purple-500/30"
//                   />
//                 </div>

//                 <div className="flex justify-end gap-3 pt-4 border-t border-[#3a3448]">
//                   <button
//                     type="button"
//                     onClick={() => setShowEditModal(false)}
//                     className="px-5 py-3 rounded-xl border border-gray-600 text-gray-300 hover:bg-[#2b2638] transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition-opacity"
//                   >
//                     Update Testimonial
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
//                 Delete Testimonial
//               </h2>

//               <p className="text-gray-400 text-center text-sm leading-relaxed mb-8">
//                 Are you sure you want to delete the testimonial from{" "}
//                 <span className="text-white font-medium">
//                   {selectedTestimonial?.student_name}
//                 </span>
//                 ?
//               </p>

//               <div className="flex gap-3 w-full">
//                 <button
//                   onClick={() => {
//                     setShowDeleteModal(false);
//                     setSelectedTestimonial(null);
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

// export default Testimonials;



// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { Edit, Trash2, Search } from "lucide-react";
// import { FaTrash, FaTimes, FaStar } from "react-icons/fa";

// import {
//   getInstituteTestimonials,
//   createInstituteTestimonial,
//   updateInstituteTestimonial,
//   deleteInstituteTestimonial,
// } from "../services/testimonialService";


// function InstituteTestimonials() {
//   /* =========================================================
//      DATA
//   ========================================================= */

//   const [testimonials, setTestimonials] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [loading, setLoading] = useState(false);


//   /* =========================================================
//      ADD MODAL
//   ========================================================= */

//   const [showModal, setShowModal] = useState(false);

//   const [name, setName] = useState("");
//   const [course, setCourse] = useState("");
//   const [rating, setRating] = useState("");
//   const [text, setText] = useState("");

//   const [imageFile, setImageFile] = useState(null);
//   const [preview, setPreview] = useState("");

//   const [videoFile, setVideoFile] = useState(null);
//   const [videoPreview, setVideoPreview] = useState("");


//   /* =========================================================
//      DELETE MODAL
//   ========================================================= */

//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [selectedTestimonial, setSelectedTestimonial] =
//     useState(null);


//   /* =========================================================
//      EDIT MODAL
//   ========================================================= */

//   const [showEditModal, setShowEditModal] = useState(false);

//   const [editForm, setEditForm] = useState({
//     id: "",
//     name: "",
//     role: "",
//     rating: "",
//     text: "",
//   });

//   const [editImageFile, setEditImageFile] = useState(null);
//   const [editPreview, setEditPreview] = useState("");

//   const [editVideoFile, setEditVideoFile] = useState(null);
//   const [editVideoPreview, setEditVideoPreview] = useState("");


//   /* =========================================================
//      HELPERS
//   ========================================================= */

//   const totalColumns = 8;


//   const getAvatarUrl = (item) => {
//     const img =
//       item?.avatar ||
//       item?.image ||
//       "";

//     if (!img) {
//       return "";
//     }

//     if (
//       img.startsWith("http://") ||
//       img.startsWith("https://")
//     ) {
//       return img;
//     }

//     return `${
//       import.meta.env.VITE_API_BASE_URL ||
//       "http://localhost:5000"
//     }${img}`;
//   };


//   const getVideoUrl = (item) => {
//     const url =
//       item?.video_url ||
//       item?.video ||
//       "";

//     if (!url) {
//       return "";
//     }

//     if (
//       url.startsWith("http://") ||
//       url.startsWith("https://")
//     ) {
//       return url;
//     }

//     return `${
//       import.meta.env.VITE_API_BASE_URL ||
//       "http://localhost:5000"
//     }${url}`;
//   };


//   /* =========================================================
//      SEARCH
//   ========================================================= */

//   const filteredTestimonials =
//     testimonials.filter((item) => {
//       const query =
//         searchQuery.toLowerCase().trim();

//       if (!query) {
//         return true;
//       }

//       return (
//         String(item.id)
//           .toLowerCase()
//           .includes(query) ||

//         item.student_name
//           ?.toLowerCase()
//           .includes(query) ||

//         item.role
//           ?.toLowerCase()
//           .includes(query) ||

//         String(item.rating)
//           .toLowerCase()
//           .includes(query) ||

//         item.testimonial_text
//           ?.toLowerCase()
//           .includes(query)
//       );
//     });


//   /* =========================================================
//      FETCH INSTITUTE TESTIMONIALS
//   ========================================================= */

//   // const fetchTestimonials = async () => {
//   //   setLoading(true);

//   //   try {
//   //     const data =
//   //       await getInstituteTestimonials();

//   //     setTestimonials(
//   //       Array.isArray(data)
//   //         ? data
//   //         : []
//   //     );

//   //   } catch (error) {
//   //     console.error(
//   //       "Fetch Institute Testimonials Error:",
//   //       error
//   //     );

//   //     toast.error(
//   //       error?.response?.data?.message ||
//   //       "Failed to fetch testimonials"
//   //     );

//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

// const fetchTestimonials = async () => {
//   try {
//     console.log("========== TESTIMONIAL FETCH START ==========");

//     setLoading(true);

//     const result = await getInstituteTestimonials();

//     console.log("RAW API RESULT:", result);
//     console.log("IS ARRAY:", Array.isArray(result));
//     console.log("RESULT LENGTH:", result?.length);

//     if (Array.isArray(result)) {
//       console.log("SETTING TESTIMONIALS:", result);

//       setTestimonials(result);
//     } else {
//       console.error(
//         "API DID NOT RETURN ARRAY:",
//         result
//       );

//       setTestimonials([]);
//     }

//     console.log("========== TESTIMONIAL FETCH END ==========");

//   } catch (error) {
//     console.error(
//       "========== TESTIMONIAL FETCH ERROR =========="
//     );

//     console.error("ERROR:", error);
//     console.error("RESPONSE:", error?.response);
//     console.error("RESPONSE DATA:", error?.response?.data);
//     console.error("STATUS:", error?.response?.status);
//     console.error("MESSAGE:", error?.message);

//     setTestimonials([]);

//   } finally {
//     setLoading(false);
//   }
// };
//   useEffect(() => {
//     fetchTestimonials();
//   }, []);


//   /* =========================================================
//      ADD IMAGE
//   ========================================================= */

//   const handleImageChange = (e) => {
//     const file =
//       e.target.files?.[0];

//     if (!file) {
//       return;
//     }

//     setImageFile(file);

//     setPreview(
//       URL.createObjectURL(file)
//     );
//   };


//   /* =========================================================
//      ADD VIDEO
//   ========================================================= */

//   const handleVideoChange = (e) => {
//     const file =
//       e.target.files?.[0];

//     if (!file) {
//       return;
//     }

//     setVideoFile(file);

//     setVideoPreview(
//       URL.createObjectURL(file)
//     );
//   };


//   /* =========================================================
//      RESET ADD FORM
//   ========================================================= */

//   const resetAddForm = () => {
//     setName("");
//     setCourse("");
//     setRating("");
//     setText("");

//     setImageFile(null);
//     setPreview("");

//     setVideoFile(null);
//     setVideoPreview("");
//   };


//   /* =========================================================
//      ADD TESTIMONIAL
//   ========================================================= */

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!name.trim()) {
//       toast.error("Student name is required");
//       return;
//     }

//     if (!course.trim()) {
//       toast.error("Course is required");
//       return;
//     }

//     if (!rating) {
//       toast.error("Please select a rating");
//       return;
//     }

//     if (!text.trim()) {
//       toast.error(
//         "Testimonial text is required"
//       );
//       return;
//     }

//     if (!videoFile) {
//       toast.error(
//         "Testimonial video is required"
//       );
//       return;
//     }


//     const formData = new FormData();

//     formData.append(
//       "student_name",
//       name.trim()
//     );

//     formData.append(
//       "role",
//       course.trim()
//     );

//     formData.append(
//       "rating",
//       rating
//     );

//     formData.append(
//       "testimonial_text",
//       text.trim()
//     );


//     if (imageFile) {
//       formData.append(
//         "avatar",
//         imageFile
//       );
//     }

//     formData.append(
//       "video",
//       videoFile
//     );


//     try {
//       await createInstituteTestimonial(
//         formData
//       );

//       toast.success(
//         "Testimonial added successfully"
//       );

//       setShowModal(false);

//       resetAddForm();

//       await fetchTestimonials();

//     } catch (error) {
//       console.error(
//         "Create Institute Testimonial Error:",
//         error
//       );

//       toast.error(
//         error?.response?.data?.message ||
//         "Failed to add testimonial"
//       );
//     }
//   };


//   /* =========================================================
//      OPEN EDIT MODAL
//   ========================================================= */

//   const handleEdit = (item) => {
//     setEditForm({
//       id: item.id,

//       name:
//         item.student_name ||
//         "",

//       role:
//         item.role ||
//         "",

//       rating:
//         item.rating ||
//         "",

//       text:
//         item.testimonial_text ||
//         "",
//     });


//     setEditPreview(
//       getAvatarUrl(item)
//     );

//     setEditVideoPreview(
//       getVideoUrl(item)
//     );

//     setEditImageFile(null);
//     setEditVideoFile(null);

//     setShowEditModal(true);
//   };


//   /* =========================================================
//      EDIT IMAGE
//   ========================================================= */

//   const handleEditImageChange = (e) => {
//     const file =
//       e.target.files?.[0];

//     if (!file) {
//       return;
//     }

//     setEditImageFile(file);

//     setEditPreview(
//       URL.createObjectURL(file)
//     );
//   };


//   /* =========================================================
//      EDIT VIDEO
//   ========================================================= */

//   const handleEditVideoChange = (e) => {
//     const file =
//       e.target.files?.[0];

//     if (!file) {
//       return;
//     }

//     setEditVideoFile(file);

//     setEditVideoPreview(
//       URL.createObjectURL(file)
//     );
//   };


//   /* =========================================================
//      UPDATE TESTIMONIAL
//   ========================================================= */

//   const handleUpdate = async (e) => {
//     e.preventDefault();


//     if (!editForm.name.trim()) {
//       toast.error(
//         "Student name is required"
//       );
//       return;
//     }

//     if (!editForm.role.trim()) {
//       toast.error(
//         "Course is required"
//       );
//       return;
//     }

//     if (!editForm.rating) {
//       toast.error(
//         "Please select a rating"
//       );
//       return;
//     }

//     if (!editForm.text.trim()) {
//       toast.error(
//         "Testimonial text is required"
//       );
//       return;
//     }


//     const formData =
//       new FormData();


//     formData.append(
//       "student_name",
//       editForm.name.trim()
//     );

//     formData.append(
//       "role",
//       editForm.role.trim()
//     );

//     formData.append(
//       "rating",
//       editForm.rating
//     );

//     formData.append(
//       "testimonial_text",
//       editForm.text.trim()
//     );


//     /*
//      * Send the existing avatar/video URL
//      * when no replacement file is selected.
//      */

//     if (editPreview) {
//       formData.append(
//         "avatar",
//         editPreview
//       );
//     }


//     if (editVideoPreview) {
//       formData.append(
//         "video_url",
//         editVideoPreview
//       );
//     }


//     if (editImageFile) {
//       formData.delete("avatar");

//       formData.append(
//         "avatar",
//         editImageFile
//       );
//     }


//     if (editVideoFile) {
//       formData.delete(
//         "video_url"
//       );

//       formData.append(
//         "video",
//         editVideoFile
//       );
//     }


//     try {
//       await updateInstituteTestimonial(
//         editForm.id,
//         formData
//       );

//       toast.success(
//         "Testimonial updated successfully"
//       );

//       setShowEditModal(false);

//       await fetchTestimonials();

//     } catch (error) {
//       console.error(
//         "Update Institute Testimonial Error:",
//         error
//       );

//       toast.error(
//         error?.response?.data?.message ||
//         "Failed to update testimonial"
//       );
//     }
//   };


//   /* =========================================================
//      DELETE
//   ========================================================= */

//   const handleDelete = (item) => {
//     setSelectedTestimonial(item);
//     setShowDeleteModal(true);
//   };


//   const confirmDelete = async () => {
//     if (!selectedTestimonial) {
//       return;
//     }


//     try {
//       await deleteInstituteTestimonial(
//         selectedTestimonial.id
//       );

//       toast.success(
//         "Testimonial deleted successfully"
//       );

//       setShowDeleteModal(false);

//       setSelectedTestimonial(null);

//       await fetchTestimonials();

//     } catch (error) {
//       console.error(
//         "Delete Institute Testimonial Error:",
//         error
//       );

//       toast.error(
//         error?.response?.data?.message ||
//         "Failed to delete testimonial"
//       );
//     }
//   };


//   /* =========================================================
//      RENDER
//   ========================================================= */

//   return (
//     <div className="p-8 text-white">

//       {/* =====================================================
//           HEADER
//       ===================================================== */}

//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">

//         <div>
//           <h1 className="text-4xl font-bold text-purple-400">
//             Testimonials
//           </h1>

//           <p className="text-white mt-2">
//             Manage your student reviews
//           </p>
//         </div>


//         <button
//           onClick={() =>
//             setShowModal(true)
//           }
//           className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition-opacity"
//         >
//           + Add Testimonial
//         </button>

//       </div>


//       {/* =====================================================
//           SEARCH
//       ===================================================== */}

//       <div className="mb-6">

//         <div className="relative w-full">

//           <Search
//             className="absolute left-4 top-1/2 -translate-y-1/2 text-white pointer-events-none"
//             size={18}
//           />

//           <input
//             type="text"
//             placeholder="Search by name, role, or text..."
//             value={searchQuery}
//             onChange={(e) =>
//               setSearchQuery(
//                 e.target.value
//               )
//             }
//             className="w-full pl-12 pr-10 py-3.5 rounded-xl bg-[#151519] border border-[#2c2c35] text-white placeholder-white focus:outline-none focus:border-purple-500/60 transition-colors text-sm"
//           />


//           {searchQuery && (
//             <button
//               onClick={() =>
//                 setSearchQuery("")
//               }
//               className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-purple-400 transition-colors"
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

//           <table className="w-full min-w-max">

//             <thead className="bg-[#202027] text-white">

//               <tr>

//                 <th className="p-4 text-left whitespace-nowrap">
//                   ID
//                 </th>

//                 <th className="p-4 text-left whitespace-nowrap">
//                   Avatar
//                 </th>

//                 <th className="p-4 text-left whitespace-nowrap">
//                   Student Name
//                 </th>

//                 <th className="p-4 text-left whitespace-nowrap">
//                   Course
//                 </th>

//                 <th className="p-4 text-left whitespace-nowrap">
//                   Rating
//                 </th>

//                 <th className="p-4 text-left whitespace-nowrap">
//                   Testimonial
//                 </th>

//                 <th className="p-4 text-left whitespace-nowrap">
//                   Video
//                 </th>

//                 <th className="p-4 text-left whitespace-nowrap">
//                   Actions
//                 </th>

//               </tr>

//             </thead>


//             <tbody>

//               {/* LOADING */}

//               {loading ? (

//                 <tr>

//                   <td
//                     colSpan={totalColumns}
//                     className="p-12 text-center"
//                   >

//                     <div className="flex flex-col items-center gap-3">

//                       <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />

//                       <p className="text-gray-500 text-lg">
//                         Loading testimonials...
//                       </p>

//                     </div>

//                   </td>

//                 </tr>

//               ) : filteredTestimonials.length === 0 ? (

//                 /* EMPTY */

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

//                       <p className="text-gray-500 text-lg">

//                         {searchQuery
//                           ? "No testimonials found matching your search"
//                           : "No testimonials available"}

//                       </p>


//                       {searchQuery && (
//                         <button
//                           onClick={() =>
//                             setSearchQuery("")
//                           }
//                           className="text-purple-400 hover:text-white text-sm mt-1 transition-colors"
//                         >
//                           Clear search
//                         </button>
//                       )}

//                     </div>

//                   </td>

//                 </tr>

//               ) : (

//                 /* DATA */

//                 filteredTestimonials.map(
//                   (item) => (

//                     <tr
//                       key={item.id}
//                       className="border-t border-[#2c2c35] hover:bg-[#1a1a20] transition-colors"
//                     >

//                       {/* ID */}

//                       <td className="p-4 text-white whitespace-nowrap">
//                         {item.id}
//                       </td>


//                       {/* AVATAR */}

//                       <td className="p-4 whitespace-nowrap">

//                         {getAvatarUrl(item) ? (

//                           <img
//                             src={getAvatarUrl(item)}
//                             alt={
//                               item.student_name
//                             }
//                             className="w-11 h-11 rounded-xl object-cover border border-[#333]"
//                             onError={(e) => {
//                               e.currentTarget.style.display =
//                                 "none";
//                             }}
//                           />

//                         ) : (

//                           <div className="w-11 h-11 bg-[#26262b] rounded-xl flex items-center justify-center text-white text-xs">
//                             N/A
//                           </div>

//                         )}

//                       </td>


//                       {/* NAME */}

//                       <td className="p-4 font-medium whitespace-nowrap">
//                         {item.student_name}
//                       </td>


//                       {/* COURSE */}

//                       <td className="p-4 text-white whitespace-nowrap">
//                         {item.role}
//                       </td>


//                       {/* RATING */}

//                       <td className="p-4 whitespace-nowrap">

//                         <div className="flex items-center gap-1">

//                           {[1, 2, 3, 4, 5].map(
//                             (star) => (

//                               <FaStar
//                                 key={star}
//                                 size={12}
//                                 className={
//                                   star <=
//                                   Number(
//                                     item.rating
//                                   )
//                                     ? "text-yellow-400"
//                                     : "text-gray-600"
//                                 }
//                               />

//                             )
//                           )}

//                           <span className="text-gray-400 text-xs ml-1">
//                             {item.rating}
//                           </span>

//                         </div>

//                       </td>


//                       {/* TEXT */}

//                       <td
//                         className="p-4 text-white max-w-[200px] truncate whitespace-nowrap"
//                         title={
//                           item.testimonial_text
//                         }
//                       >
//                         {item.testimonial_text}
//                       </td>


//                       {/* VIDEO */}

//                       <td className="p-4">

//                         {getVideoUrl(item) ? (

//                           <video
//                             controls
//                             className="w-28 rounded-lg"
//                           >
//                             <source
//                               src={getVideoUrl(item)}
//                             />
//                           </video>

//                         ) : (

//                           "N/A"

//                         )}

//                       </td>


//                       {/* ACTIONS */}

//                       <td className="p-4 whitespace-nowrap">

//                         <div className="flex items-center gap-2">

//                           <button
//                             onClick={() =>
//                               handleEdit(item)
//                             }
//                             className="p-2 rounded-lg hover:bg-[#2a2a35] transition-colors group"
//                             title="Edit"
//                           >

//                             <Edit
//                               size={16}
//                               className="text-white group-hover:text-purple-400 transition-colors"
//                             />

//                           </button>


//                           <button
//                             onClick={() =>
//                               handleDelete(item)
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

//                   )
//                 )

//               )}

//             </tbody>

//           </table>

//         </div>

//       </div>


//       {/* =====================================================
//           ADD TESTIMONIAL MODAL
//       ===================================================== */}

//       {showModal && (

//         <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">

//           <div className="w-full max-w-[520px] max-h-[90vh] bg-[#211c30] rounded-2xl overflow-hidden shadow-2xl">

//             {/* HEADER */}

//             <div className="flex justify-between items-center p-6 border-b border-[#3a3448]">

//               <h2 className="text-2xl font-bold text-white">
//                 Add Testimonial
//               </h2>

//               <button
//                 onClick={() => {
//                   setShowModal(false);
//                   resetAddForm();
//                 }}
//                 className="text-gray-400 hover:text-white transition-colors"
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

//                 {/* NAME */}

//                 <div>

//                   <label className="block text-sm text-gray-400 mb-1">
//                     Student Name
//                   </label>

//                   <input
//                     value={name}
//                     onChange={(e) =>
//                       setName(
//                         e.target.value
//                       )
//                     }
//                     className="w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors"
//                     required
//                   />

//                 </div>


//                 {/* COURSE */}

//                 <div>

//                   <label className="block text-sm text-gray-400 mb-1">
//                     Course
//                   </label>

//                   <input
//                     value={course}
//                     onChange={(e) =>
//                       setCourse(
//                         e.target.value
//                       )
//                     }
//                     className="w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors"
//                     required
//                   />

//                 </div>


//                 {/* RATING */}

//                 <div>

//                   <label className="block text-sm text-gray-400 mb-1">
//                     Rating
//                   </label>

//                   <select
//                     value={rating}
//                     onChange={(e) =>
//                       setRating(
//                         e.target.value
//                       )
//                     }
//                     className="w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors"
//                     required
//                   >

//                     <option value="">
//                       Select Rating
//                     </option>

//                     {[1, 2, 3, 4, 5].map(
//                       (star) => (

//                         <option
//                           key={star}
//                           value={star}
//                         >
//                           {star} Star
//                           {star > 1
//                             ? "s"
//                             : ""}
//                         </option>

//                       )
//                     )}

//                   </select>

//                 </div>


//                 {/* TEXT */}

//                 <div>

//                   <label className="block text-sm text-gray-400 mb-1">
//                     Testimonial Text
//                   </label>

//                   <textarea
//                     value={text}
//                     onChange={(e) =>
//                       setText(
//                         e.target.value
//                       )
//                     }
//                     rows={4}
//                     className="w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors"
//                     required
//                   />

//                 </div>


//                 {/* AVATAR */}

//                 <div>

//                   <label className="block text-sm text-gray-400 mb-1">
//                     Upload Avatar
//                   </label>


//                   {preview && (

//                     <img
//                       src={preview}
//                       alt="preview"
//                       className="w-full h-40 object-cover rounded-xl mb-2 border border-[#333]"
//                     />

//                   )}


//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={
//                       handleImageChange
//                     }
//                     className="w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-500/20 file:text-purple-300 hover:file:bg-purple-500/30"
//                   />

//                 </div>


//                 {/* VIDEO */}

//                 <div>

//                   <label className="block text-sm text-gray-400 mb-1">
//                     Upload Testimonial Video
//                   </label>


//                   {videoPreview && (

//                     <video
//                       controls
//                       className="w-full h-48 rounded-xl mb-2"
//                     >
//                       <source
//                         src={videoPreview}
//                       />
//                     </video>

//                   )}


//                   <input
//                     type="file"
//                     accept="video/mp4,video/webm,video/quicktime"
//                     onChange={
//                       handleVideoChange
//                     }
//                     required
//                     className="w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-500/20 file:text-purple-300 hover:file:bg-purple-500/30"
//                   />

//                 </div>


//                 {/* BUTTONS */}

//                 <div className="flex justify-end gap-3 pt-4 border-t border-[#3a3448]">

//                   <button
//                     type="button"
//                     onClick={() => {
//                       setShowModal(false);
//                       resetAddForm();
//                     }}
//                     className="px-5 py-3 rounded-xl border border-gray-600 text-gray-300 hover:bg-[#2b2638] transition-colors"
//                   >
//                     Cancel
//                   </button>


//                   <button
//                     type="submit"
//                     className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition-opacity"
//                   >
//                     Add Testimonial
//                   </button>

//                 </div>

//               </form>

//             </div>

//           </div>

//         </div>

//       )}


//       {/* =====================================================
//           EDIT TESTIMONIAL MODAL
//       ===================================================== */}

//       {showEditModal && (

//         <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">

//           <div className="w-full max-w-[520px] max-h-[90vh] bg-[#211c30] rounded-2xl overflow-hidden shadow-2xl">

//             {/* HEADER */}

//             <div className="flex justify-between items-center p-6 border-b border-[#3a3448]">

//               <h2 className="text-2xl font-bold text-white">
//                 Edit Testimonial
//               </h2>

//               <button
//                 onClick={() =>
//                   setShowEditModal(false)
//                 }
//                 className="text-gray-400 hover:text-white transition-colors"
//               >
//                 <FaTimes size={20} />
//               </button>

//             </div>


//             {/* BODY */}

//             <div className="overflow-y-auto max-h-[75vh] p-6">

//               <form
//                 onSubmit={handleUpdate}
//                 className="space-y-1"
//               >

//                 {/* NAME */}

//                 <div>

//                   <label className="block text-sm text-gray-400 mb-1">
//                     Student Name
//                   </label>

//                   <input
//                     value={editForm.name}
//                     onChange={(e) =>
//                       setEditForm({
//                         ...editForm,
//                         name: e.target.value,
//                       })
//                     }
//                     className="w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors"
//                     required
//                   />

//                 </div>


//                 {/* COURSE */}

//                 <div>

//                   <label className="block text-sm text-gray-400 mb-1">
//                     Course
//                   </label>

//                   <input
//                     value={editForm.role}
//                     onChange={(e) =>
//                       setEditForm({
//                         ...editForm,
//                         role: e.target.value,
//                       })
//                     }
//                     className="w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors"
//                     required
//                   />

//                 </div>


//                 {/* RATING */}

//                 <div>

//                   <label className="block text-sm text-gray-400 mb-1">
//                     Rating
//                   </label>

//                   <select
//                     value={editForm.rating}
//                     onChange={(e) =>
//                       setEditForm({
//                         ...editForm,
//                         rating: e.target.value,
//                       })
//                     }
//                     className="w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors"
//                     required
//                   >

//                     <option value="">
//                       Select Rating
//                     </option>

//                     {[1, 2, 3, 4, 5].map(
//                       (star) => (

//                         <option
//                           key={star}
//                           value={star}
//                         >
//                           {star} Star
//                           {star > 1
//                             ? "s"
//                             : ""}
//                         </option>

//                       )
//                     )}

//                   </select>

//                 </div>


//                 {/* TEXT */}

//                 <div>

//                   <label className="block text-sm text-gray-400 mb-1">
//                     Testimonial Text
//                   </label>

//                   <textarea
//                     value={editForm.text}
//                     onChange={(e) =>
//                       setEditForm({
//                         ...editForm,
//                         text: e.target.value,
//                       })
//                     }
//                     rows={4}
//                     className="w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors"
//                     required
//                   />

//                 </div>


//                 {/* AVATAR */}

//                 <div>

//                   <label className="block text-sm text-gray-400 mb-1">
//                     Update Avatar
//                   </label>


//                   {editPreview && (

//                     <img
//                       src={editPreview}
//                       alt="preview"
//                       className="w-full h-40 object-cover rounded-xl mb-2 border border-[#333]"
//                     />

//                   )}


//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={
//                       handleEditImageChange
//                     }
//                     className="w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-500/20 file:text-purple-300 hover:file:bg-purple-500/30"
//                   />

//                 </div>


//                 {/* VIDEO */}

//                 <div>

//                   <label className="block text-sm text-gray-400 mb-1">
//                     Replace Video
//                   </label>


//                   {editVideoPreview && (

//                     <video
//                       controls
//                       className="w-full h-48 rounded-xl mb-2"
//                     >
//                       <source
//                         src={editVideoPreview}
//                       />
//                     </video>

//                   )}


//                   <input
//                     type="file"
//                     accept="video/mp4,video/webm,video/quicktime"
//                     onChange={
//                       handleEditVideoChange
//                     }
//                     className="w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-500/20 file:text-purple-300 hover:file:bg-purple-500/30"
//                   />

//                 </div>


//                 {/* BUTTONS */}

//                 <div className="flex justify-end gap-3 pt-4 border-t border-[#3a3448]">

//                   <button
//                     type="button"
//                     onClick={() =>
//                       setShowEditModal(false)
//                     }
//                     className="px-5 py-3 rounded-xl border border-gray-600 text-gray-300 hover:bg-[#2b2638] transition-colors"
//                   >
//                     Cancel
//                   </button>


//                   <button
//                     type="submit"
//                     className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition-opacity"
//                   >
//                     Update Testimonial
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

//         <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50">

//           <div className="w-full max-w-[400px] bg-[#1e1b2e] border border-[#2e2a42] rounded-2xl shadow-2xl overflow-hidden">

//             <div className="p-8 flex flex-col items-center">

//               <div className="w-14 h-14 rounded-full bg-red-500/15 flex items-center justify-center mb-5">

//                 <FaTrash className="text-red-400 text-lg" />

//               </div>


//               <h2 className="text-xl font-bold text-white mb-3 text-center">
//                 Delete Testimonial
//               </h2>


//               <p className="text-gray-400 text-center text-sm leading-relaxed mb-8">

//                 Are you sure you want to delete the testimonial from{" "}

//                 <span className="text-white font-medium">

//                   {
//                     selectedTestimonial?.student_name
//                   }

//                 </span>

//                 ?

//               </p>


//               <div className="flex gap-3 w-full">

//                 <button
//                   onClick={() => {
//                     setShowDeleteModal(false);
//                     setSelectedTestimonial(null);
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


// export default InstituteTestimonials;


import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  Plus,
  X,
  Edit,
  Trash2,
  Play,
  Star,
  MessageSquareQuote,
} from "lucide-react";
import toast from "react-hot-toast";

import {
  getInstituteTestimonials,
  createInstituteTestimonial,
  updateInstituteTestimonial,
  deleteInstituteTestimonial,
} from "../services/testimonialService";


/* =========================================================
   INSTITUTE TESTIMONIALS
========================================================= */

const InstituteTestimonials = () => {

  /* =======================================================
     STATE
  ======================================================= */

  const [testimonials, setTestimonials] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    type: "text",
    student_name: "",
    role: "",
    testimonial_text: "",
    rating: 5,
    avatar: null,
    video: null,
  });


  /* =======================================================
     FETCH TESTIMONIALS
  ======================================================= */

  const fetchTestimonials = async () => {
    try {

      setLoading(true);

      console.log(
        "===================================="
      );

      console.log(
        "FETCHING INSTITUTE TESTIMONIALS"
      );

      const data =
        await getInstituteTestimonials();

      console.log(
        "Testimonials received:",
        data
      );

      console.log(
        "Total testimonials:",
        Array.isArray(data)
          ? data.length
          : 0
      );

      if (Array.isArray(data)) {
        setTestimonials(data);
      } else {
        setTestimonials([]);
      }

    } catch (error) {

      console.error(
        "GET INSTITUTE TESTIMONIALS ERROR:",
        error
      );

      console.error(
        "Status:",
        error?.response?.status
      );

      console.error(
        "Backend response:",
        error?.response?.data
      );

      setTestimonials([]);

      /*
        Do not show authentication toast
        repeatedly if the API interceptor
        already handles authentication.
      */

      if (
        error?.response?.status !== 401 &&
        error?.response?.status !== 403
      ) {
        toast.error(
          error?.response?.data?.message ||
          "Failed to load testimonials"
        );
      }

    } finally {

      setLoading(false);
    }
  };


  /* =======================================================
     INITIAL LOAD
  ======================================================= */

  useEffect(() => {

    fetchTestimonials();

  }, []);


  /* =======================================================
     SEARCH
  ======================================================= */

  const filteredTestimonials = useMemo(() => {

    const keyword =
      search.trim().toLowerCase();

    if (!keyword) {
      return testimonials;
    }

    return testimonials.filter((item) => {

      return (
        item?.student_name
          ?.toLowerCase()
          .includes(keyword) ||

        item?.role
          ?.toLowerCase()
          .includes(keyword) ||

        item?.testimonial_text
          ?.toLowerCase()
          .includes(keyword)
      );

    });

  }, [testimonials, search]);


  /* =======================================================
     OPEN CREATE MODAL
  ======================================================= */

  const openCreateModal = () => {

    setEditingId(null);

    setForm({
      type: "text",
      student_name: "",
      role: "",
      testimonial_text: "",
      rating: 5,
      avatar: null,
      video: null,
    });

    setShowModal(true);
  };


  /* =======================================================
     OPEN EDIT MODAL
  ======================================================= */

  const openEditModal = (item) => {

    setEditingId(item.id);

    setForm({
      type:
        item.video_url
          ? "video"
          : "text",

      student_name:
        item.student_name || "",

      role:
        item.role || "",

      testimonial_text:
        item.testimonial_text || "",

      rating:
        item.rating || 5,

      avatar: null,

      video: null,
    });

    setShowModal(true);
  };


  /* =======================================================
     CLOSE MODAL
  ======================================================= */

  const closeModal = () => {

    if (submitting) {
      return;
    }

    setShowModal(false);

    setEditingId(null);

    setForm({
      type: "text",
      student_name: "",
      role: "",
      testimonial_text: "",
      rating: 5,
      avatar: null,
      video: null,
    });
  };


  /* =======================================================
     FORM CHANGE
  ======================================================= */

  const handleChange = (e) => {

    const {
      name,
      value,
      files,
    } = e.target;

    if (files) {

      setForm((previous) => ({
        ...previous,
        [name]: files[0] || null,
      }));

      return;
    }

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };


  /* =======================================================
     TYPE CHANGE
  ======================================================= */

  const handleTypeChange = (type) => {

    setForm((previous) => ({
      ...previous,
      type,
      video:
        type === "video"
          ? previous.video
          : null,
    }));
  };


  /* =======================================================
     SUBMIT
  ======================================================= */

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!form.student_name.trim()) {

      toast.error(
        "Student name is required."
      );

      return;
    }

    /*
      Text testimonial requires text.
    */

    if (
      form.type === "text" &&
      !form.testimonial_text.trim()
    ) {

      toast.error(
        "Testimonial text is required."
      );

      return;
    }

    /*
      Video testimonial requires video
      when creating a new testimonial.
    */

    if (
      form.type === "video" &&
      !editingId &&
      !form.video
    ) {

      toast.error(
        "Testimonial video is required."
      );

      return;
    }

    try {

      setSubmitting(true);

      const formData =
        new FormData();

      formData.append(
        "student_name",
        form.student_name
      );

      formData.append(
        "role",
        form.role
      );

      formData.append(
        "testimonial_text",
        form.testimonial_text
      );

      formData.append(
        "rating",
        String(form.rating)
      );

      /*
        IMPORTANT:
        Text testimonial does not need video.
        Video testimonial uses video_url
        generated by backend from uploaded file.
      */

      if (form.avatar) {

        formData.append(
          "avatar",
          form.avatar
        );
      }

      if (
        form.type === "video" &&
        form.video
      ) {

        formData.append(
          "video",
          form.video
        );
      }

      /*
        Send testimonial type as well.
        This is harmless even if backend
        currently does not store it.
      */

      formData.append(
        "type",
        form.type
      );


      let response;

      if (editingId) {

        response =
          await updateInstituteTestimonial(
            editingId,
            formData
          );

        toast.success(
          "Testimonial updated successfully."
        );

      } else {

        response =
          await createInstituteTestimonial(
            formData
          );

        toast.success(
          "Testimonial created successfully."
        );
      }

      console.log(
        "Save testimonial response:",
        response
      );

      closeModal();

      /*
        Fetch again from database.
        This guarantees UI shows the
        actual backend data.
      */

      await fetchTestimonials();

    } catch (error) {

      console.error(
        "SAVE TESTIMONIAL ERROR:",
        error
      );

      console.error(
        "Status:",
        error?.response?.status
      );

      console.error(
        "Backend:",
        error?.response?.data
      );

      toast.error(
        error?.response?.data?.message ||
        "Failed to save testimonial."
      );

    } finally {

      setSubmitting(false);
    }
  };


  /* =======================================================
     DELETE
  ======================================================= */

  const handleDelete = async (id) => {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this testimonial?"
      );

    if (!confirmed) {
      return;
    }

    try {

      await deleteInstituteTestimonial(
        id
      );

      toast.success(
        "Testimonial deleted successfully."
      );

      await fetchTestimonials();

    } catch (error) {

      console.error(
        "DELETE TESTIMONIAL ERROR:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
        "Failed to delete testimonial."
      );
    }
  };


  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div
      style={{
        padding: "40px 70px",
        minHeight: "100vh",
        background: "#09090b",
        color: "#fff",
      }}
    >

      {/* ===================================================
          HEADER
      =================================================== */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >

        <div>

          <h1
            style={{
              margin: 0,
              fontSize: "48px",
              fontWeight: 700,
              background:
                "linear-gradient(90deg,#b85cff,#ef3ba9)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Testimonials
          </h1>

          <p
            style={{
              marginTop: "8px",
              color: "#fff",
              fontSize: "18px",
            }}
          >
            Manage your student reviews
          </p>

        </div>


        <button
          onClick={openCreateModal}
          style={{
            border: "none",
            borderRadius: "14px",
            padding: "17px 28px",
            color: "#fff",
            fontSize: "18px",
            fontWeight: 700,
            cursor: "pointer",
            background:
              "linear-gradient(90deg,#a63cff,#ef3ba9)",
          }}
        >
          <Plus
            size={20}
            style={{
              verticalAlign: "middle",
              marginRight: "7px",
            }}
          />

          Add Testimonial
        </button>

      </div>


      {/* ===================================================
          SEARCH
      =================================================== */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          background: "#151519",
          border: "1px solid #29292f",
          borderRadius: "14px",
          padding: "16px 20px",
          marginBottom: "30px",
        }}
      >

        <Search
          size={24}
          color="#9ca3af"
        />

        <input
          type="text"
          placeholder="Search by name, course, or testimonial..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={{
            width: "100%",
            border: "none",
            outline: "none",
            background: "transparent",
            color: "#fff",
            fontSize: "17px",
          }}
        />

      </div>


      {/* ===================================================
          COUNT
      =================================================== */}

      <div
        style={{
          marginBottom: "20px",
          color: "#9ca3af",
          fontSize: "16px",
        }}
      >
        {filteredTestimonials.length}{" "}
        testimonial
        {filteredTestimonials.length !== 1
          ? "s"
          : ""}{" "}
        found
      </div>


      {/* ===================================================
          TABLE
      =================================================== */}

      <div
        style={{
          background: "#151519",
          border: "1px solid #29292f",
          borderRadius: "18px",
          overflow: "hidden",
        }}
      >

        <div
          style={{
            overflowX: "auto",
          }}
        >

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: "1050px",
            }}
          >

            <thead>

              <tr
                style={{
                  background: "#222229",
                }}
              >

                <th style={thStyle}>
                  ID
                </th>

                <th style={thStyle}>
                  Type
                </th>

                <th style={thStyle}>
                  Avatar
                </th>

                <th style={thStyle}>
                  Student Name
                </th>

                <th style={thStyle}>
                  Course
                </th>

                <th style={thStyle}>
                  Rating
                </th>

                <th style={thStyle}>
                  Testimonial
                </th>

                <th style={thStyle}>
                  Video
                </th>

                <th style={thStyle}>
                  Actions
                </th>

              </tr>

            </thead>


            <tbody>

              {loading ? (

                <tr>

                  <td
                    colSpan="9"
                    style={{
                      textAlign: "center",
                      padding: "70px",
                      color: "#9ca3af",
                    }}
                  >
                    Loading testimonials...
                  </td>

                </tr>

              ) : filteredTestimonials.length === 0 ? (

                <tr>

                  <td
                    colSpan="9"
                    style={{
                      textAlign: "center",
                      padding: "80px",
                      color: "#64748b",
                    }}
                  >

                    <Search
                      size={50}
                      style={{
                        marginBottom: "15px",
                      }}
                    />

                    <div
                      style={{
                        fontSize: "20px",
                      }}
                    >
                      No testimonials available
                    </div>

                  </td>

                </tr>

              ) : (

                filteredTestimonials.map(
                  (item) => {

                    const isVideo =
                      !!item.video_url;

                    return (
                      <tr
                        key={item.id}
                        style={{
                          borderTop:
                            "1px solid #29292f",
                        }}
                      >

                        <td style={tdStyle}>
                          {item.id}
                        </td>


                        <td style={tdStyle}>

                          <span
                            style={{
                              padding:
                                "7px 12px",
                              borderRadius:
                                "20px",
                              background:
                                isVideo
                                  ? "#3b1d54"
                                  : "#1e3a5f",
                              color:
                                isVideo
                                  ? "#d98aff"
                                  : "#7db5ff",
                              fontWeight: 600,
                            }}
                          >
                            {isVideo
                              ? "Video"
                              : "Text"}
                          </span>

                        </td>


                        <td style={tdStyle}>

                          {item.avatar ? (

                            <img
                              src={item.avatar}
                              alt={
                                item.student_name ||
                                "Student"
                              }
                              style={{
                                width: "48px",
                                height: "48px",
                                borderRadius:
                                  "50%",
                                objectFit:
                                  "cover",
                              }}
                            />

                          ) : (

                            <div
                              style={{
                                width: "48px",
                                height: "48px",
                                borderRadius:
                                  "50%",
                                display: "flex",
                                alignItems:
                                  "center",
                                justifyContent:
                                  "center",
                                background:
                                  "#282832",
                                color: "#c084fc",
                                fontWeight: 700,
                              }}
                            >
                              {(
                                item.student_name ||
                                "S"
                              )
                                .charAt(0)
                                .toUpperCase()}
                            </div>

                          )}

                        </td>


                        <td style={tdStyle}>

                          <div
                            style={{
                              fontWeight: 600,
                            }}
                          >
                            {item.student_name ||
                              "-"}
                          </div>

                          {item.role && (
                            <div
                              style={{
                                marginTop:
                                  "4px",
                                color:
                                  "#8b8b98",
                                fontSize:
                                  "13px",
                              }}
                            >
                              {item.role}
                            </div>
                          )}

                        </td>


                        <td style={tdStyle}>
                          {item.course ||
                            item.class_name ||
                            "-"}
                        </td>


                        <td style={tdStyle}>

                          <div
                            style={{
                              display: "flex",
                              alignItems:
                                "center",
                              gap: "4px",
                            }}
                          >

                            <Star
                              size={16}
                              fill="#fbbf24"
                              color="#fbbf24"
                            />

                            {item.rating ||
                              0}

                          </div>

                        </td>


                        <td
                          style={{
                            ...tdStyle,
                            maxWidth: "300px",
                          }}
                        >

                          <div
                            style={{
                              overflow: "hidden",
                              textOverflow:
                                "ellipsis",
                              whiteSpace:
                                "nowrap",
                            }}
                          >
                            {item.testimonial_text ||
                              "-"}
                          </div>

                        </td>


                        <td style={tdStyle}>

                          {item.video_url ? (

                            <a
                              href={
                                item.video_url
                              }
                              target="_blank"
                              rel="noreferrer"
                              style={{
                                display:
                                  "inline-flex",
                                alignItems:
                                  "center",
                                gap: "5px",
                                color:
                                  "#c084fc",
                                textDecoration:
                                  "none",
                              }}
                            >

                              <Play
                                size={17}
                              />

                              View

                            </a>

                          ) : (
                            "-"
                          )}

                        </td>


                        <td style={tdStyle}>

                          <div
                            style={{
                              display: "flex",
                              gap: "8px",
                            }}
                          >

                            <button
                              onClick={() =>
                                openEditModal(item)
                              }
                              style={
                                actionButtonStyle
                              }
                            >
                              <Edit
                                size={17}
                              />
                            </button>

                            <button
                              onClick={() =>
                                handleDelete(
                                  item.id
                                )
                              }
                              style={{
                                ...actionButtonStyle,
                                color: "#f87171",
                              }}
                            >
                              <Trash2
                                size={17}
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


      {/* ===================================================
          MODAL
      =================================================== */}

      {showModal && (

        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background:
              "rgba(0,0,0,0.75)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >

          <div
            style={{
              width: "100%",
              maxWidth: "680px",
              maxHeight: "90vh",
              overflowY: "auto",
              background: "#211d32",
              borderRadius: "18px",
              border:
                "1px solid #38314d",
            }}
          >

            {/* MODAL HEADER */}

            <div
              style={{
                padding: "25px 30px",
                borderBottom:
                  "1px solid #38314d",
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems: "center",
              }}
            >

              <div>

                <h2
                  style={{
                    margin: 0,
                    fontSize: "28px",
                  }}
                >
                  {editingId
                    ? "Edit Testimonial"
                    : "Add Testimonial"}
                </h2>

                <p
                  style={{
                    margin:
                      "6px 0 0",
                    color: "#a1a1aa",
                  }}
                >
                  Create a text or video testimonial
                </p>

              </div>

              <button
                onClick={closeModal}
                style={{
                  border: "none",
                  background:
                    "transparent",
                  color: "#a1a1aa",
                  cursor: "pointer",
                }}
              >
                <X size={26} />
              </button>

            </div>


            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >

              <div
                style={{
                  padding: "30px",
                }}
              >

                {/* TYPE */}

                <label
                  style={labelStyle}
                >
                  Testimonial Type
                </label>

                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    marginBottom: "22px",
                  }}
                >

                  <button
                    type="button"
                    onClick={() =>
                      handleTypeChange(
                        "text"
                      )
                    }
                    style={{
                      ...typeButtonStyle,
                      background:
                        form.type === "text"
                          ? "linear-gradient(90deg,#a63cff,#ef3ba9)"
                          : "#2b2738",
                      color: "#fff",
                    }}
                  >
                    <MessageSquareQuote
                      size={18}
                    />

                    Text Testimonial
                  </button>


                  <button
                    type="button"
                    onClick={() =>
                      handleTypeChange(
                        "video"
                      )
                    }
                    style={{
                      ...typeButtonStyle,
                      background:
                        form.type === "video"
                          ? "linear-gradient(90deg,#a63cff,#ef3ba9)"
                          : "#2b2738",
                      color: "#fff",
                    }}
                  >
                    <Play size={18} />

                    Video Testimonial
                  </button>

                </div>


                {/* STUDENT NAME */}

                <label
                  style={labelStyle}
                >
                  Student Name
                </label>

                <input
                  name="student_name"
                  value={
                    form.student_name
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Enter student name"
                  style={inputStyle}
                  required
                />


                {/* ROLE */}

                <label
                  style={labelStyle}
                >
                  Course / Role
                </label>

                <input
                  name="role"
                  value={form.role}
                  onChange={
                    handleChange
                  }
                  placeholder="Example: Music Student"
                  style={inputStyle}
                />


                {/* RATING */}

                <label
                  style={labelStyle}
                >
                  Rating
                </label>

                <select
                  name="rating"
                  value={form.rating}
                  onChange={
                    handleChange
                  }
                  style={inputStyle}
                >

                  <option value="5">
                    5 Stars
                  </option>

                  <option value="4">
                    4 Stars
                  </option>

                  <option value="3">
                    3 Stars
                  </option>

                  <option value="2">
                    2 Stars
                  </option>

                  <option value="1">
                    1 Star
                  </option>

                </select>


                {/* TEXT */}

                <label
                  style={labelStyle}
                >
                  Testimonial Text
                  {form.type === "text"
                    ? " *"
                    : " (Optional)"}
                </label>

                <textarea
                  name="testimonial_text"
                  value={
                    form.testimonial_text
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Write the student's testimonial..."
                  rows={5}
                  style={{
                    ...inputStyle,
                    resize: "vertical",
                  }}
                  required={
                    form.type === "text"
                  }
                />


                {/* AVATAR */}

                <label
                  style={labelStyle}
                >
                  Upload Avatar
                  {" "}
                  <span
                    style={{
                      color: "#8b8b98",
                    }}
                  >
                    (Optional)
                  </span>
                </label>

                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={
                    handleChange
                  }
                  style={fileInputStyle}
                />


                {/* VIDEO */}

                {form.type ===
                  "video" && (

                  <>
                    <label
                      style={labelStyle}
                    >
                      Upload Testimonial Video
                      {" "}
                      {!editingId && (
                        <span>
                          *
                        </span>
                      )}
                    </label>

                    <input
                      type="file"
                      name="video"
                      accept="video/*"
                      onChange={
                        handleChange
                      }
                      style={
                        fileInputStyle
                      }
                      required={
                        !editingId
                      }
                    />

                    {editingId && (
                      <p
                        style={{
                          color:
                            "#8b8b98",
                          fontSize:
                            "13px",
                          marginTop:
                            "6px",
                        }}
                      >
                        Leave empty to keep the
                        existing video.
                      </p>
                    )}

                  </>

                )}

              </div>


              {/* FOOTER */}

              <div
                style={{
                  padding:
                    "20px 30px",
                  borderTop:
                    "1px solid #38314d",
                  display: "flex",
                  justifyContent:
                    "flex-end",
                  gap: "12px",
                }}
              >

                <button
                  type="button"
                  onClick={closeModal}
                  disabled={submitting}
                  style={{
                    padding:
                      "13px 24px",
                    borderRadius:
                      "10px",
                    border:
                      "1px solid #4b455b",
                    background:
                      "transparent",
                    color: "#fff",
                    cursor:
                      submitting
                        ? "not-allowed"
                        : "pointer",
                  }}
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    padding:
                      "13px 25px",
                    border: "none",
                    borderRadius:
                      "10px",
                    background:
                      "linear-gradient(90deg,#a63cff,#ef3ba9)",
                    color: "#fff",
                    fontSize:
                      "16px",
                    fontWeight: 700,
                    cursor:
                      submitting
                        ? "not-allowed"
                        : "pointer",
                    opacity:
                      submitting
                        ? 0.7
                        : 1,
                  }}
                >
                  {submitting
                    ? "Saving..."
                    : editingId
                    ? "Update Testimonial"
                    : "Add Testimonial"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
};


/* =========================================================
   STYLES
========================================================= */

const thStyle = {
  padding: "20px",
  textAlign: "left",
  fontSize: "16px",
  fontWeight: 700,
  whiteSpace: "nowrap",
};

const tdStyle = {
  padding: "18px 20px",
  fontSize: "15px",
  color: "#e5e7eb",
  verticalAlign: "middle",
};

const labelStyle = {
  display: "block",
  marginBottom: "8px",
  marginTop: "18px",
  color: "#c4c4cc",
  fontSize: "15px",
  fontWeight: 600,
};

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "13px 15px",
  borderRadius: "10px",
  border: "1px solid #40394f",
  outline: "none",
  background: "#2b2738",
  color: "#fff",
  fontSize: "15px",
};

const fileInputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #40394f",
  background: "#2b2738",
  color: "#fff",
  cursor: "pointer",
};

const typeButtonStyle = {
  flex: 1,
  minHeight: "48px",
  border: "none",
  borderRadius: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  fontSize: "14px",
  fontWeight: 600,
  cursor: "pointer",
};

const actionButtonStyle = {
  width: "38px",
  height: "38px",
  borderRadius: "8px",
  border: "1px solid #3b3548",
  background: "#25222e",
  color: "#c084fc",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
};


export default InstituteTestimonials;