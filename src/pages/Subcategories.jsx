// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { Edit, Trash2 } from "lucide-react";
// import { FaEdit, FaTrash, FaTimes } from "react-icons/fa";

// const SUB_API = "http://localhost:5000/api/subcategories";
// const CAT_API = "http://localhost:5000/api/categories";

// function Subcategories() {
//   const [subcategories, setSubcategories] = useState([]);
//   const [categories, setCategories] = useState([]);

//   // Add Modal States
//   const [showModal, setShowModal] = useState(false);
//   const [categoryId, setCategoryId] = useState("");
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [imageFile, setImageFile] = useState(null);
//   const [preview, setPreview] = useState("");

//   // Delete Modal States
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [selectedSubcategory, setSelectedSubcategory] = useState(null);

//   // Edit Modal States
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [editForm, setEditForm] = useState({
//     id: "",
//     category_id: "",
//     name: "",
//     description: "",
//   });
//   const [editImageFile, setEditImageFile] = useState(null);
//   const [editPreview, setEditPreview] = useState("");

//   const token = localStorage.getItem("adminToken");

//   const fetchData = async () => {
//     try {
//       const subRes = await fetch(SUB_API);
//       const subData = await subRes.json();
//       setSubcategories(subData.data || []);

//       const catRes = await fetch(CAT_API);
//       const catData = await catRes.json();
//       setCategories(catData.data || []);
//     } catch (error) {
//       toast.error("Failed to fetch data");
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // --- Add Logic ---
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImageFile(file);
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("category_id", categoryId);
//     formData.append("name", name);
//     formData.append("description", description);

//     if (imageFile) {
//       formData.append("image", imageFile);
//     }

//     try {
//       const res = await fetch(SUB_API, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         body: formData,
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         toast.error(data.message || "Failed to add subcategory");
//         return;
//       }

//       toast.success("Subcategory added successfully");
//       setShowModal(false);
//       // Reset form
//       setCategoryId("");
//       setName("");
//       setDescription("");
//       setImageFile(null);
//       setPreview("");
//       fetchData();
//     } catch (error) {
//       toast.error("An error occurred");
//     }
//   };

//   // --- Edit Logic ---
//   const handleEdit = (sub) => {
//     setEditForm({
//       id: sub.id,
//       category_id: sub.category_id,
//       name: sub.name || "",
//       description: sub.description || "",
//     });
//     setEditImageFile(null);
//     setEditPreview(getImage(sub));
//     setShowEditModal(true);
//   };

//   const handleEditImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setEditImageFile(file);
//       setEditPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("category_id", editForm.category_id);
//     formData.append("name", editForm.name);
//     formData.append("description", editForm.description);

//     if (editImageFile) {
//       formData.append("image", editImageFile);
//     }

//     try {
//       const res = await fetch(`${SUB_API}/${editForm.id}`, {
//         method: "PUT",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         body: formData,
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         toast.error(data.message || "Failed to update subcategory");
//         return;
//       }

//       toast.success("Subcategory updated successfully");
//       setShowEditModal(false);
//       fetchData();
//     } catch (error) {
//       toast.error("An error occurred");
//     }
//   };

//   // --- Delete Logic ---
//   const handleDelete = (sub) => {
//     setSelectedSubcategory(sub);
//     setShowDeleteModal(true);
//   };

//   const confirmDelete = async () => {
//     if (!selectedSubcategory) return;

//     try {
//       const res = await fetch(`${SUB_API}/${selectedSubcategory.id}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         toast.error(data.message || "Delete failed");
//         return;
//       }

//       toast.success("Subcategory deleted successfully");
//       setShowDeleteModal(false);
//       setSelectedSubcategory(null);
//       fetchData();
//     } catch (error) {
//       toast.error("An error occurred");
//     }
//   };

//   // --- Helpers ---
//   const getImage = (item) => {
//     if (!item.image) return null;
//     if (item.image.startsWith("http")) return item.image;
//     return `http://localhost:5000${item.image}`;
//   };

//   return (
//     <div className="p-8 text-white">
//       <div className="flex justify-between items-center mb-8">
//         <div>
//           <h1 className="text-4xl font-bold text-purple-400">Subcategories</h1>
//           <p className="text-gray-400 mt-2">Manage subcategories</p>
//         </div>

//         <button
//           onClick={() => setShowModal(true)}
//           className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold"
//         >
//           + Add Subcategory
//         </button>
//       </div>

//       <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl overflow-hidden">
//         <table className="w-full">
//           <thead className="bg-[#202027] text-gray-400">
//             <tr>
//               <th className="p-4 text-left">ID</th>
//               <th className="p-4 text-left">Image</th>
//               <th className="p-4 text-left">Name</th>
//               <th className="p-4 text-left">Category</th>
//               <th className="p-4 text-left">Description</th>
//               <th className="p-4 text-left">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {subcategories.map((sub) => (
//               <tr key={sub.id} className="border-t border-[#2c2c35]">
//                 <td className="p-4">{sub.id}</td>

//                 <td className="p-4">
//                   {getImage(sub) ? (
//                     <img
//                       src={getImage(sub)}
//                       alt={sub.name}
//                       className="w-16 h-16 rounded-xl object-cover"
//                     />
//                   ) : (
//                     <div className="w-16 h-16 bg-[#26262b] rounded-xl flex items-center justify-center text-gray-500">
//                       No Img
//                     </div>
//                   )}
//                 </td>

//                 <td className="p-4">{sub.name}</td>
//                 <td className="p-4">{sub.category_name || sub.category_id}</td>
//                 <td className="p-4">{sub.description || "-"}</td>

                
//                     <td className="px-6 py-4">
//   <div className="flex items-center justify-center gap-4">
    
//     <Edit
//       size={16}
//       className="text-slate-400 hover:text-white cursor-pointer transition-colors"
//       onClick={() => handleEdit(sub)}
//     />

//     <Trash2
//       size={16}
//       className="text-red-500 hover:text-red-400 cursor-pointer transition-colors"
//       onClick={() => handleDelete(sub)}
//     />

//   </div>
// </td>
                 
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Add Subcategory Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
//           <div className="w-full max-w-[600px] max-h-[90vh] bg-[#211c30] rounded-2xl overflow-hidden">
//             {/* Header */}
//             <div className="flex justify-between items-center p-6 border-b border-[#3a3448]">
//               <h2 className="text-2xl font-bold text-white">
//                 Add Subcategory
//               </h2>
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="text-gray-400 hover:text-white text-2xl"
//               >
//                 <FaTimes />
//               </button>
//             </div>

//             {/* Scrollable Body */}
//             <div className="overflow-y-auto max-h-[75vh] p-6">
//               <form onSubmit={handleSubmit}>
//                 <label className="block mb-2 text-white">Category</label>
//                 <select
//                   value={categoryId}
//                   onChange={(e) => setCategoryId(e.target.value)}
//                   className="w-full mt-2 mb-6 p-4 rounded-xl bg-[#2b2638] text-white"
//                   required
//                 >
//                   <option value="">Select Category</option>
//                   {categories.map((cat) => (
//                     <option key={cat.id} value={cat.id}>
//                       {cat.name}
//                     </option>
//                   ))}
//                 </select>

//                 <label className="block mb-2 text-white">
//                   Subcategory Name
//                 </label>
//                 <input
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   className="w-full mt-2 mb-6 p-4 rounded-xl bg-[#2b2638] text-white"
//                   required
//                 />

//                 <label className="block mb-2 text-white">Description</label>
//                 <input
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   className="w-full mt-2 mb-6 p-4 rounded-xl bg-[#2b2638] text-white"
//                 />

//                 <label className="block mb-2 text-white">Upload Image</label>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageChange}
//                   className="w-full mt-2 mb-6 p-4 rounded-xl bg-[#2b2638] text-white"
//                 />

//                 {preview && (
//                   <img
//                     src={preview}
//                     alt="preview"
//                     className="w-full h-56 object-cover rounded-xl mb-6"
//                   />
//                 )}

//                 {/* Buttons */}
//                 <div className="flex justify-end gap-4">
//                   <button
//                     type="button"
//                     onClick={() => setShowModal(false)}
//                     className="px-5 py-3 border border-gray-500 rounded-xl"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold"
//                   >
//                     Add Subcategory
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Edit Subcategory Modal */}
//       {showEditModal && (
//         <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
//           <div className="w-full max-w-[600px] max-h-[90vh] bg-[#211c30] rounded-2xl overflow-hidden">
            
//             {/* Header with X */}
//             <div className="flex justify-between items-center p-6 border-b border-[#3a3448]">
//               <h2 className="text-2xl font-bold text-white">
//                 Edit Subcategory
//               </h2>
//               <button
//                 onClick={() => setShowEditModal(false)}
//                 className="text-gray-400 hover:text-white text-2xl"
//               >
//                 <FaTimes />
//               </button>
//             </div>

//             {/* Scrollable Body */}
//             <div className="overflow-y-auto max-h-[75vh] p-6">
//               <form onSubmit={handleUpdate}>
                
//                 <label className="block mb-2 text-white">Category</label>
//                 <select
//                   value={editForm.category_id}
//                   onChange={(e) => setEditForm({ ...editForm, category_id: e.target.value })}
//                   className="w-full mt-2 mb-6 p-4 rounded-xl bg-[#2b2638] text-white"
//                   required
//                 >
//                   <option value="">Select Category</option>
//                   {categories.map((cat) => (
//                     <option key={cat.id} value={cat.id}>
//                       {cat.name}
//                     </option>
//                   ))}
//                 </select>

//                 <label className="block mb-2 text-white">
//                   Subcategory Name
//                 </label>
//                 <input
//                   value={editForm.name}
//                   onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
//                   className="w-full mt-2 mb-6 p-4 rounded-xl bg-[#2b2638] text-white"
//                   required
//                 />

//                 <label className="block mb-2 text-white">Description</label>
//                 <input
//                   value={editForm.description}
//                   onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
//                   className="w-full mt-2 mb-6 p-4 rounded-xl bg-[#2b2638] text-white"
//                 />

//                 <label className="block mb-2 text-white">Upload Image</label>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleEditImageChange}
//                   className="w-full mt-2 mb-6 p-4 rounded-xl bg-[#2b2638] text-white"
//                 />

//                 {editPreview && (
//                   <img
//                     src={editPreview}
//                     alt="preview"
//                     className="w-full h-56 object-cover rounded-xl mb-6"
//                   />
//                 )}

//                 {/* Buttons */}
//                 <div className="flex justify-end gap-4">
//                   <button
//                     type="button"
//                     onClick={() => setShowEditModal(false)}
//                     className="px-5 py-3 border border-gray-500 rounded-xl"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold"
//                   >
//                     Update Subcategory
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Delete Confirmation Modal */}
//       {showDeleteModal && (
//         <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
//           <div className="w-full max-w-md bg-[#221c3d] rounded-3xl p-8">
//             <div className="flex justify-center mb-5">
//               <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
//                 <FaTrash className="text-red-500 text-2xl" />
//               </div>
//             </div>

//             <h2 className="text-2xl font-bold text-center text-white mb-4">
//               Delete Subcategory
//             </h2>

//             <p className="text-center text-gray-300 mb-8">
//               Are you sure you want to delete
//               <span className="text-pink-400 font-semibold">
//                 {" "}
//                 "{selectedSubcategory?.name}"{" "}
//               </span>
//               ?
//             </p>

//             <div className="flex justify-center gap-4">
//               <button
//                 onClick={() => {
//                   setShowDeleteModal(false);
//                   setSelectedSubcategory(null);
//                 }}
//                 className="px-6 py-3 rounded-xl border border-gray-500 text-white"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={confirmDelete}
//                 className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold"
//               >
//                 Delete Subcategory
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Subcategories;



import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Edit, Trash2, Search } from "lucide-react";
import { FaTrash, FaTimes } from "react-icons/fa";

const SUB_API = "http://localhost:5000/api/subcategories";
const CAT_API = "http://localhost:5000/api/categories";

function Subcategories() {
  const [subcategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]);

  // Search State
  const [searchQuery, setSearchQuery] = useState("");

  // Add Modal States
  const [showModal, setShowModal] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");

  // Delete Modal States
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  // Edit Modal States
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    id: "",
    category_id: "",
    name: "",
    description: "",
  });
  const [editImageFile, setEditImageFile] = useState(null);
  const [editPreview, setEditPreview] = useState("");

  const token = localStorage.getItem("adminToken");

  // --- Filtered subcategories based on search ---
  const filteredSubcategories = subcategories.filter((sub) => {
    const query = searchQuery.toLowerCase();
    return (
      sub.name?.toLowerCase().includes(query) ||
      sub.description?.toLowerCase().includes(query) ||
      sub.category_name?.toLowerCase().includes(query) ||
      String(sub.id).includes(query) ||
      String(sub.category_id).includes(query)
    );
  });

  const fetchData = async () => {
    try {
      const subRes = await fetch(SUB_API);
      const subData = await subRes.json();
      setSubcategories(subData.data || []);

      const catRes = await fetch(CAT_API);
      const catData = await catRes.json();
      setCategories(catData.data || []);
    } catch {
      toast.error("Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- Add Logic ---
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("category_id", categoryId);
    formData.append("name", name);
    formData.append("description", description);
    if (imageFile) formData.append("image", imageFile);

    try {
      const res = await fetch(SUB_API, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to add subcategory");
        return;
      }

      toast.success("Subcategory added successfully");
      setShowModal(false);
      setCategoryId("");
      setName("");
      setDescription("");
      setImageFile(null);
      setPreview("");
      fetchData();
    } catch {
      toast.error("An error occurred");
    }
  };

  // --- Edit Logic ---
  const handleEdit = (sub) => {
    setEditForm({
      id: sub.id,
      category_id: sub.category_id,
      name: sub.name || "",
      description: sub.description || "",
    });
    setEditImageFile(null);
    setEditPreview(getImage(sub));
    setShowEditModal(true);
  };

  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditImageFile(file);
      setEditPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("category_id", editForm.category_id);
    formData.append("name", editForm.name);
    formData.append("description", editForm.description);
    if (editImageFile) formData.append("image", editImageFile);

    try {
      const res = await fetch(`${SUB_API}/${editForm.id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to update subcategory");
        return;
      }

      toast.success("Subcategory updated successfully");
      setShowEditModal(false);
      fetchData();
    } catch {
      toast.error("An error occurred");
    }
  };

  // --- Delete Logic ---
  const handleDelete = (sub) => {
    setSelectedSubcategory(sub);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedSubcategory) return;

    try {
      const res = await fetch(`${SUB_API}/${selectedSubcategory.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Delete failed");
        return;
      }

      toast.success("Subcategory deleted successfully");
      setShowDeleteModal(false);
      setSelectedSubcategory(null);
      fetchData();
    } catch {
      toast.error("An error occurred");
    }
  };

  // --- Helpers ---
  const getImage = (item) => {
    if (!item.image) return null;
    if (item.image.startsWith("http")) return item.image;
    return `http://localhost:5000${item.image}`;
  };

  return (
    <div className="p-8 text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-4xl font-bold text-purple-400">Subcategories</h1>
          <p className="text-white mt-2">Manage your subcategories</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition-opacity"
        >
          + Add Subcategory
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
            placeholder="Search subcategories..."
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
        <table className="w-full">
          <thead className="bg-[#202027] text-white">
            <tr>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Image</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Description</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredSubcategories.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-12 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <Search size={40} className="text-white" />
                    <p className="text-gray-500 text-lg">
                      {searchQuery
                        ? "No subcategories found matching your search"
                        : "No subcategories available"}
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
              filteredSubcategories.map((sub) => (
                <tr
                  key={sub.id}
                  className="border-t border-[#2c2c35] hover:bg-[#1a1a20] transition-colors"
                >
                  <td className="p-4 text-white">{sub.id}</td>

                  <td className="p-4">
                    {getImage(sub) ? (
                      <img
                        src={getImage(sub)}
                        alt={sub.name}
                        className="w-12 h-12 rounded-xl object-cover border border-[#333]"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="w-12 h-12 bg-[#26262b] rounded-xl flex items-center justify-center text-white text-xs">
                        No Img
                      </div>
                    )}
                  </td>

                  <td className="p-4 font-medium">{sub.name}</td>
                  <td className="p-4 text-white">
                    {sub.category_name || sub.category_id}
                  </td>
                  <td className="p-4 text-white max-w-[200px] truncate">
                    {sub.description || "-"}
                  </td>

                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleEdit(sub)}
                        className="p-2 rounded-lg hover:bg-[#2a2a35] transition-colors group"
                        title="Edit"
                      >
                        <Edit
                          size={16}
                          className="text-white group-hover:text-white transition-colors"
                        />
                      </button>

                      <button
                        onClick={() => handleDelete(sub)}
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

      {/* ==================== Add Subcategory Modal ==================== */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-[600px] max-h-[90vh] bg-[#211c30] rounded-2xl overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-[#3a3448]">
              <h2 className="text-2xl font-bold text-white">
                Add Subcategory
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaTimes size={20} />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="overflow-y-auto max-h-[75vh] p-6">
              <form onSubmit={handleSubmit}>
                <label className="block mb-2 text-sm text-gray-400">
                  Category
                </label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full mt-2 mb-6 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>

                <label className="block mb-2 text-sm text-gray-400">
                  Subcategory Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full mt-2 mb-6 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors"
                  placeholder="Enter subcategory name"
                  required
                />

                <label className="block mb-2 text-sm text-gray-400">
                  Description
                </label>
                <input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full mt-2 mb-6 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors"
                  placeholder="Enter description (optional)"
                />

                <label className="block mb-2 text-sm text-gray-400">
                  Upload Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full mt-2 mb-6 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-500/20 file:text-purple-300 hover:file:bg-purple-500/30"
                />

                {preview && (
                  <img
                    src={preview}
                    alt="preview"
                    className="w-full h-56 object-cover rounded-xl mb-6 border border-[#333]"
                  />
                )}

                <div className="flex justify-end gap-3 mt-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-5 py-3 rounded-xl border border-gray-600 text-gray-300 hover:bg-[#2b2638] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition-opacity"
                  >
                    Add Subcategory
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ==================== Edit Subcategory Modal ==================== */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-[600px] max-h-[90vh] bg-[#211c30] rounded-2xl overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-[#3a3448]">
              <h2 className="text-2xl font-bold text-white">
                Edit Subcategory
              </h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaTimes size={20} />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="overflow-y-auto max-h-[75vh] p-6">
              <form onSubmit={handleUpdate}>
                <label className="block mb-2 text-sm text-gray-400">
                  Category
                </label>
                <select
                  value={editForm.category_id}
                  onChange={(e) =>
                    setEditForm({ ...editForm, category_id: e.target.value })
                  }
                  className="w-full mt-2 mb-6 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>

                <label className="block mb-2 text-sm text-gray-400">
                  Subcategory Name
                </label>
                <input
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                  className="w-full mt-2 mb-6 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors"
                  required
                />

                <label className="block mb-2 text-sm text-gray-400">
                  Description
                </label>
                <input
                  value={editForm.description}
                  onChange={(e) =>
                    setEditForm({ ...editForm, description: e.target.value })
                  }
                  className="w-full mt-2 mb-6 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors"
                />

                <label className="block mb-2 text-sm text-gray-400">
                  Upload Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleEditImageChange}
                  className="w-full mt-2 mb-6 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-500/20 file:text-purple-300 hover:file:bg-purple-500/30"
                />

                {editPreview && (
                  <img
                    src={editPreview}
                    alt="preview"
                    className="w-full h-56 object-cover rounded-xl mb-6 border border-[#333]"
                  />
                )}

                <div className="flex justify-end gap-3 mt-2">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="px-5 py-3 rounded-xl border border-gray-600 text-gray-300 hover:bg-[#2b2638] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition-opacity"
                  >
                    Update Subcategory
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
              {/* Trash Icon */}
              <div className="w-14 h-14 rounded-full bg-red-500/15 flex items-center justify-center mb-5">
                <FaTrash className="text-red-400 text-lg" />
              </div>

              {/* Title */}
              <h2 className="text-xl font-bold text-white mb-3 text-center">
                Delete Subcategory
              </h2>

              {/* Description */}
              <p className="text-gray-400 text-center text-sm leading-relaxed mb-8">
                Are you sure you want to delete this subcategory?
              </p>

              {/* Buttons */}
              <div className="flex gap-3 w-full">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedSubcategory(null);
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

export default Subcategories;