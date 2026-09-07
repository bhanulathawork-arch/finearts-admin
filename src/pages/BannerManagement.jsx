// import { useEffect, useState } from "react";

// import { getAllBanners } from "../services/bannerService";

// const BannerManagement = () => {
//   const [banners, setBanners] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadBanners();
//   }, []);

//   const loadBanners = async () => {
//     try {
//       setLoading(true);

//       const res = await getAllBanners();

//       const data =
//         res.data?.data ||
//         res.data?.banners ||
//         res.data ||
//         [];

//       setBanners(data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return <h2>Loading...</h2>;
//   }

//   return (
//     <div className="p-6">

//       <div className="flex justify-between items-center mb-6">

//         <h1 className="text-2xl font-bold">
//           Banner Management
//         </h1>

//         <button
//           className="bg-purple-600 text-white px-5 py-2 rounded-lg"
//         >
//           + Add Banner
//         </button>

//       </div>

//       <div className="overflow-x-auto">

//         <table className="w-full border">

//           <thead>

//             <tr className="bg-gray-100">

//               <th className="p-3">Image</th>

//               <th className="p-3">Title</th>

//               <th className="p-3">Type</th>

//               <th className="p-3">Order</th>

//               <th className="p-3">Status</th>

//               <th className="p-3">Actions</th>

//             </tr>

//           </thead>

//           <tbody>

//             {banners.map((banner) => (

//               <tr key={banner.id} className="border-t">

//                 <td className="p-3">

//                   <img
//                     src={banner.image}
//                     alt={banner.title}
//                     className="w-24 h-14 rounded object-cover"
//                   />

//                 </td>

//                 <td className="p-3">

//                   {banner.title}

//                 </td>

//                 <td className="p-3">

//                   {banner.banner_type}

//                 </td>

//                 <td className="p-3">

//                   {banner.display_order}

//                 </td>

//                 <td className="p-3">

//                   {banner.is_active ? "Active" : "Inactive"}

//                 </td>

//                 <td className="p-3 flex gap-2">

//                   <button
//                     className="bg-blue-500 text-white px-3 py-1 rounded"
//                   >
//                     Edit
//                   </button>

//                   <button
//                     className="bg-red-500 text-white px-3 py-1 rounded"
//                   >
//                     Delete
//                   </button>

//                 </td>

//               </tr>

//             ))}

//           </tbody>

//         </table>

//       </div>

//     </div>
//   );
// };

// export default BannerManagement;



import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Edit, Trash2, Search } from "lucide-react";
import { FaTrash, FaTimes } from "react-icons/fa";

// Import Service Functions
import {
  getAllBanners,
  createBanner,
  updateBanner,
  deleteBanner,
} from "../services/bannerService";

const BannerManagement = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Add Modal States
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [bannerType, setBannerType] = useState("");
  const [displayOrder, setDisplayOrder] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");

  // Delete Modal States
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);

  // Edit Modal States
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    id: "",
    title: "",
    banner_type: "",
    display_order: "",
    is_active: true,
  });
  const [editImageFile, setEditImageFile] = useState(null);
  const [editPreview, setEditPreview] = useState("");

  const token = localStorage.getItem("token");
  const totalColumns = 6;

  const bannerTypeOptions = [
    { value: "HOME", label: "Home Banner" },
    { value: "CATEGORY", label: "Category Banner" },
    { value: "INSTITUTE", label: "Institute Banner" },
  ];

  const getImageUrl = (item) => {
    const img = item?.image;
    if (!img) return "";
    if (img.startsWith("http")) return img;
    return `https://finearts-backend.onrender.com${img}`;
  };

  // --- Filtered Banners ---
  const filteredBanners = banners.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      String(item.id).includes(query) ||
      item.title?.toLowerCase().includes(query) ||
      item.banner_type?.toLowerCase().includes(query) ||
      String(item.display_order).includes(query) ||
      (item.is_active ? "active" : "inactive").includes(query)
    );
  });

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const res = await getAllBanners();
      const data =
        res.data?.data ||
        res.data?.banners ||
        res.data ||
        [];
      setBanners(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch banners");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
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
    formData.append("title", title);
    formData.append("banner_type", bannerType);
    formData.append("display_order", displayOrder);
    formData.append("is_active", isActive);

    if (imageFile) {
      formData.append("image", imageFile);
    } else {
      toast.error("Banner image is required");
      return;
    }

    try {
      await createBanner(formData, token);
      toast.success("Banner added successfully");
      setShowModal(false);
      setTitle("");
      setBannerType("");
      setDisplayOrder("");
      setIsActive(true);
      setImageFile(null);
      setPreview("");
      fetchBanners();
    } catch (error) {
      toast.error("Failed to add banner");
    }
  };

  // --- Edit Logic ---
  const handleEdit = (item) => {
    setEditForm({
      id: item.id,
      title: item.title || "",
      banner_type: item.banner_type || "",
      display_order: item.display_order || "",
      is_active: item.is_active ?? true,
    });
    setEditPreview(getImageUrl(item));
    setEditImageFile(null);
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
    formData.append("title", editForm.title);
    formData.append("banner_type", editForm.banner_type);
    formData.append("display_order", editForm.display_order);
    formData.append("is_active", editForm.is_active);

    if (editImageFile) {
      formData.append("image", editImageFile);
    }

    try {
      await updateBanner(editForm.id, formData, token);
      toast.success("Banner updated successfully");
      setShowEditModal(false);
      fetchBanners();
    } catch (error) {
      toast.error("Failed to update banner");
    }
  };

  // --- Delete Logic ---
  const handleDelete = (item) => {
    setSelectedBanner(item);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedBanner) return;
    try {
      await deleteBanner(selectedBanner.id, token);
      toast.success("Banner deleted successfully");
      setShowDeleteModal(false);
      setSelectedBanner(null);
      fetchBanners();
    } catch (error) {
      toast.error("Failed to delete banner");
    }
  };

  // --- Helpers ---
  const formatBannerType = (type) => {
    const found = bannerTypeOptions.find((opt) => opt.value === type);
    return found ? found.label : type;
  };

  // --- Loading State ---
  if (loading) {
    return (
      <div className="p-8 text-white flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
          <p className="text-gray-400 text-sm">Loading banners...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-4xl font-bold text-purple-400">Banner Management</h1>
          <p className="text-white mt-2">Manage your website banners</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition-opacity"
        >
          + Add Banner
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
            placeholder="Search by title, type, or status..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-10 py-3.5 rounded-xl bg-[#151519] border border-[#2c2c35] text-white placeholder-white focus:outline-none focus:border-purple-500/60 transition-colors text-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-white transition-colors"
            >
              <FaTimes size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-max">
            <thead className="bg-[#202027] text-white">
              <tr>
                <th className="p-4 text-left whitespace-nowrap">Image</th>
                <th className="p-4 text-left whitespace-nowrap">Title</th>
                <th className="p-4 text-left whitespace-nowrap">Type</th>
                <th className="p-4 text-left whitespace-nowrap">Order</th>
                <th className="p-4 text-left whitespace-nowrap">Status</th>
                <th className="p-4 text-left whitespace-nowrap">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredBanners.length === 0 ? (
                <tr>
                  <td colSpan={totalColumns} className="p-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <Search size={40} className="text-white" />
                      <p className="text-gray-500 text-lg">
                        {searchQuery
                          ? "No banners found matching your search"
                          : "No banners available"}
                      </p>
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery("")}
                          className="text-purple-400 hover:text-white text-sm mt-1 transition-colors"
                        >
                          Clear search
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                filteredBanners.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t border-[#2c2c35] hover:bg-[#1a1a20] transition-colors"
                  >
                    <td className="p-4 whitespace-nowrap">
                      {getImageUrl(item) ? (
                        <img
                          src={getImageUrl(item)}
                          alt={item.title}
                          className="w-24 h-14 rounded-xl object-cover border border-[#333]"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      ) : (
                        <div className="w-24 h-14 bg-[#26262b] rounded-xl flex items-center justify-center text-white text-xs">
                          N/A
                        </div>
                      )}
                    </td>

                    <td className="p-4 font-medium whitespace-nowrap">
                      {item.title}
                    </td>

                    <td className="p-4 text-white whitespace-nowrap">
                      {formatBannerType(item.banner_type)}
                    </td>

                    <td className="p-4 text-white whitespace-nowrap">
                      {item.display_order}
                    </td>

                    <td className="p-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          item.is_active
                            ? "bg-green-500/15 text-green-400 border border-green-500/20"
                            : "bg-red-500/15 text-red-400 border border-red-500/20"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full mr-2 ${
                            item.is_active ? "bg-green-400" : "bg-red-400"
                          }`}
                        ></span>
                        {item.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className="p-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-2 rounded-lg hover:bg-[#2a2a35] transition-colors group"
                          title="Edit"
                        >
                          <Edit
                            size={16}
                            className="text-white group-hover:text-white transition-colors"
                          />
                        </button>
                        <button
                          onClick={() => handleDelete(item)}
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

      {/* ==================== Add Banner Modal ==================== */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="w-full max-w-[520px] max-h-[90vh] bg-[#211c30] rounded-2xl overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-[#3a3448]">
              <h2 className="text-2xl font-bold text-white">Add Banner</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaTimes size={20} />
              </button>
            </div>

            <div className="overflow-y-auto max-h-[75vh] p-6">
              <form onSubmit={handleSubmit} className="space-y-1">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Title</label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors"
                    placeholder="Enter banner title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">Banner Type</label>
                  <select
                    value={bannerType}
                    onChange={(e) => setBannerType(e.target.value)}
                    className="w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors"
                    required
                  >
                    <option value="">Select Type</option>
                    {bannerTypeOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">Display Order</label>
                  <input
                    type="number"
                    min="0"
                    value={displayOrder}
                    onChange={(e) => setDisplayOrder(e.target.value)}
                    className="w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors"
                    placeholder="e.g. 1"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">Status</label>
                  <select
                    value={isActive ? "true" : "false"}
                    onChange={(e) => setIsActive(e.target.value === "true")}
                    className="w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors"
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">Upload Banner Image</label>
                  {preview && (
                    <img
                      src={preview}
                      alt="preview"
                      className="w-full h-40 object-cover rounded-xl mb-2 border border-[#333]"
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                    className="w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-500/20 file:text-purple-300 hover:file:bg-purple-500/30"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-[#3a3448]">
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
                    Add Banner
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ==================== Edit Banner Modal ==================== */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="w-full max-w-[520px] max-h-[90vh] bg-[#211c30] rounded-2xl overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-[#3a3448]">
              <h2 className="text-2xl font-bold text-white">Edit Banner</h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaTimes size={20} />
              </button>
            </div>

            <div className="overflow-y-auto max-h-[75vh] p-6">
              <form onSubmit={handleUpdate} className="space-y-1">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Title</label>
                  <input
                    value={editForm.title}
                    onChange={(e) =>
                      setEditForm({ ...editForm, title: e.target.value })
                    }
                    className="w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">Banner Type</label>
                  <select
                    value={editForm.banner_type}
                    onChange={(e) =>
                      setEditForm({ ...editForm, banner_type: e.target.value })
                    }
                    className="w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors"
                    required
                  >
                    <option value="">Select Type</option>
                    {bannerTypeOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">Display Order</label>
                  <input
                    type="number"
                    min="0"
                    value={editForm.display_order}
                    onChange={(e) =>
                      setEditForm({ ...editForm, display_order: e.target.value })
                    }
                    className="w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">Status</label>
                  <select
                    value={editForm.is_active ? "true" : "false"}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        is_active: e.target.value === "true",
                      })
                    }
                    className="w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors"
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">Replace Banner Image</label>
                  {editPreview && (
                    <img
                      src={editPreview}
                      alt="preview"
                      className="w-full h-40 object-cover rounded-xl mb-2 border border-[#333]"
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleEditImageChange}
                    className="w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-500/20 file:text-purple-300 hover:file:bg-purple-500/30"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-[#3a3448]">
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
                    Update Banner
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
                Delete Banner
              </h2>

              <p className="text-gray-400 text-center text-sm leading-relaxed mb-8">
                Are you sure you want to delete the banner{" "}
                <span className="text-white font-medium">
                  "{selectedBanner?.title}"
                </span>
                ? This action cannot be undone.
              </p>

              <div className="flex gap-3 w-full">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedBanner(null);
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
};

export default BannerManagement;