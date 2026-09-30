
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Edit, Trash2, Search } from "lucide-react";
import { FaTrash, FaTimes } from "react-icons/fa";

import {
  getInstituteBanners,
  createInstituteBanner,
  updateInstituteBanner,
  deleteInstituteBanner,
} from "../services/bannerService";

/* =========================================================
   PAGE OPTIONS
========================================================= */

const PAGE_OPTIONS = [
  { value: "HOME", label: "Home" },
  { value: "CLASS", label: "Class" },
  { value: "SESSION", label: "Session" },
  { value: "TRAINER", label: "Trainer" },
  { value: "TESTIMONIAL", label: "Testimonials" },
  { value: "ABOUT", label: "About" },
];

/* =========================================================
   HELPERS
========================================================= */

const getPageLabel = (type) =>
  PAGE_OPTIONS.find((page) => page.value === type)?.label ||
  type ||
  "-";

const isActive = (value) =>
  value === true ||
  value === 1 ||
  value === "1" ||
  value === "true";

const truncate = (text, max = 45) => {
  if (!text) return "-";
  return text.length > max ? `${text.slice(0, max)}...` : text;
};

const getImageUrl = (image) => {
  if (!image) return "";

  if (typeof image !== "string") return "";

  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }

  return `https://finearts-backend.onrender.com${image}`;
};

const extractBanners = (response) => {
  const possible = [
    response?.data?.data,
    response?.data?.banners,
    response?.data,
    response?.banners,
    response,
  ];

  for (const item of possible) {
    if (Array.isArray(item)) {
      return item;
    }
  }

  return [];
};

/* =========================================================
   DEFAULT FORM
========================================================= */

const DEFAULT_FORM = {
  banner_type: "HOME",
  title: "",
  display_order: 1,
  is_active: true,
};

/* =========================================================
   COMPONENT
========================================================= */

export default function InstituteBanners() {
  const [banners, setBanners] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingBanner, setDeletingBanner] = useState(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  const [formData, setFormData] = useState(DEFAULT_FORM);

  /* =========================================================
     FETCH BANNERS
  ========================================================= */

  const fetchBanners = async () => {
    try {
      setLoading(true);

      const response = await getInstituteBanners();

      console.log("INSTITUTE BANNERS RESPONSE:", response);

      const data = extractBanners(response);

      console.log("INSTITUTE BANNERS:", data);

      setBanners(data);
    } catch (error) {
      console.error("Fetch banners error:", error);

      setBanners([]);

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to fetch banners"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  /* =========================================================
     SEARCH
  ========================================================= */

  const filteredBanners = banners.filter((banner) => {
    const query = searchQuery.toLowerCase().trim();

    if (!query) return true;

    return (
      String(banner?.id || "").includes(query) ||
      banner?.title?.toLowerCase().includes(query) ||
      banner?.banner_type?.toLowerCase().includes(query) ||
      getPageLabel(banner?.banner_type)
        .toLowerCase()
        .includes(query) ||
      String(banner?.display_order || "").includes(query)
    );
  });

  /* =========================================================
     CREATE
  ========================================================= */

  const handleCreate = () => {
    setEditingBanner(null);

    setFormData({
      ...DEFAULT_FORM,
      display_order: banners.length + 1,
    });

    setSelectedFile(null);
    setPreviewImage("");

    setShowModal(true);
  };

  /* =========================================================
     EDIT
  ========================================================= */

  const handleEdit = (banner) => {
    setEditingBanner(banner);

    setFormData({
      banner_type: banner?.banner_type || "HOME",
      title: banner?.title || "",
      display_order: Number(banner?.display_order) || 1,
      is_active: isActive(banner?.is_active),
    });

    setSelectedFile(null);

    setPreviewImage(
      banner?.image ||
        banner?.image_url ||
        ""
    );

    setShowModal(true);
  };

  /* =========================================================
     FILE CHANGE
  ========================================================= */

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Please select PNG, JPG or WEBP image");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      event.target.value = "";
      return;
    }

    setSelectedFile(file);

    setPreviewImage(URL.createObjectURL(file));
  };

  /* =========================================================
     SUBMIT
  ========================================================= */

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.banner_type) {
      toast.error("Please select a page");
      return;
    }

    if (!formData.title.trim()) {
      toast.error("Banner title is required");
      return;
    }

    if (!editingBanner && !selectedFile) {
      toast.error("Banner image is required");
      return;
    }

    try {
      setSubmitting(true);

      const payload = new FormData();

      payload.append("banner_type", formData.banner_type);
      payload.append("title", formData.title.trim());
      payload.append(
        "display_order",
        String(Number(formData.display_order) || 1)
      );
      payload.append(
        "is_active",
        String(Boolean(formData.is_active))
      );

      if (selectedFile) {
        payload.append("image", selectedFile);
      }

      if (editingBanner?.id) {
        await updateInstituteBanner(
          editingBanner.id,
          payload
        );

        toast.success("Banner updated successfully");
      } else {
        await createInstituteBanner(payload);

        toast.success("Banner created successfully");
      }

      await fetchBanners();

      closeModal();
    } catch (error) {
      console.error("Save banner error:", error);

      toast.error(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          error?.message ||
          "Failed to save banner"
      );
    } finally {
      setSubmitting(false);
    }
  };

  /* =========================================================
     DELETE
  ========================================================= */

  const handleDelete = (banner) => {
    setDeletingBanner(banner);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!deletingBanner?.id) return;

    try {
      await deleteInstituteBanner(deletingBanner.id);

      toast.success("Banner deleted successfully");

      setBanners((previous) =>
        previous.filter(
          (banner) =>
            banner.id !== deletingBanner.id
        )
      );
    } catch (error) {
      console.error("Delete banner error:", error);

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Delete failed"
      );
    } finally {
      setShowDeleteModal(false);
      setDeletingBanner(null);
    }
  };

  /* =========================================================
     CLOSE MODAL
  ========================================================= */

  const closeModal = () => {
    if (submitting) return;

    setShowModal(false);
    setEditingBanner(null);
    setSelectedFile(null);
    setPreviewImage("");
    setFormData(DEFAULT_FORM);
  };

  /* =========================================================
     INPUT STYLES
  ========================================================= */

  const inputClass =
    "w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors";

  const labelClass =
    "block text-sm text-white mb-1";

  /* =========================================================
     JSX
  ========================================================= */

  return (
    <div className="p-8 text-white">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">

        <div>
          <h1 className="text-4xl font-bold text-purple-400">
            Institute Banners
          </h1>

          <p className="text-white mt-2">
            Manage your website banners
          </p>
        </div>

        <button
          onClick={handleCreate}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition-opacity"
        >
          + Add Banner
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
            placeholder="Search by page, title or ID..."
            value={searchQuery}
            onChange={(event) =>
              setSearchQuery(event.target.value)
            }
            className="w-full pl-12 pr-10 py-3.5 rounded-xl bg-[#151519] border border-[#2c2c35] text-white placeholder-white focus:outline-none focus:border-purple-500/60 transition-colors text-sm"
          />

          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
            >
              <FaTimes size={14} />
            </button>
          )}

        </div>

      </div>

      {/* =====================================================
          TABLE
          IMPORTANT: NO CARD / GRID VIEW HERE
      ===================================================== */}

      <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-[#202027] text-white">

              <tr>

                <th className="p-4 text-left whitespace-nowrap">
                  ID
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Image
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Page
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Banner Title
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Display Order
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

              {loading ? (

                <tr>

                  <td
                    colSpan={7}
                    className="p-12 text-center text-gray-500"
                  >
                    Loading banners...
                  </td>

                </tr>

              ) : filteredBanners.length === 0 ? (

                <tr>

                  <td
                    colSpan={7}
                    className="p-12 text-center"
                  >

                    <div className="flex flex-col items-center gap-3">

                      <Search
                        size={40}
                        className="text-gray-600"
                      />

                      <p className="text-gray-500 text-lg">
                        {searchQuery
                          ? "No banners found matching your search"
                          : "No banners available"}
                      </p>

                      {searchQuery && (
                        <button
                          type="button"
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

                filteredBanners.map((banner) => (

                  <tr
                    key={banner.id}
                    className="border-t border-[#2c2c35] hover:bg-[#1a1a20] transition-colors"
                  >

                    {/* ID */}
                    <td className="p-4 text-white whitespace-nowrap">
                      {banner.id}
                    </td>

                    {/* IMAGE */}
                    <td className="p-4">

                      {banner?.image ||
                      banner?.image_url ? (

                        <img
                          src={getImageUrl(
                            banner.image ||
                              banner.image_url
                          )}
                          alt={
                            banner.title ||
                            "Banner"
                          }
                          className="w-16 h-11 rounded-lg object-cover border border-[#333]"
                          onError={(event) => {
                            event.currentTarget.style.display =
                              "none";
                          }}
                        />

                      ) : (

                        <div className="w-16 h-11 bg-[#26262b] rounded-lg flex items-center justify-center text-gray-600 text-xs">
                          N/A
                        </div>

                      )}

                    </td>

                    {/* PAGE */}
                    <td className="p-4 whitespace-nowrap">

                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300">
                        {getPageLabel(
                          banner.banner_type
                        )}
                      </span>

                    </td>

                    {/* TITLE */}
                    <td
                      className="p-4 font-medium whitespace-nowrap max-w-[220px] truncate"
                      title={banner.title || ""}
                    >
                      {truncate(
                        banner.title,
                        35
                      )}
                    </td>

                    {/* DISPLAY ORDER */}
                    <td className="p-4 font-semibold whitespace-nowrap">
                      {banner.display_order ?? 1}
                    </td>

                    {/* STATUS */}
                    <td className="p-4 whitespace-nowrap">

                      {isActive(
                        banner.is_active
                      ) ? (

                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-300">
                          Active
                        </span>

                      ) : (

                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-500/20 text-gray-300">
                          Inactive
                        </span>

                      )}

                    </td>

                    {/* ACTIONS */}
                    <td className="p-4">

                      <div className="flex items-center gap-2">

                        <button
                          type="button"
                          onClick={() =>
                            handleEdit(banner)
                          }
                          className="p-2 rounded-lg hover:bg-[#2a2a35] transition-colors group"
                          title="Edit"
                        >
                          <Edit
                            size={16}
                            className="text-white group-hover:text-purple-300"
                          />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(banner)
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

                ))

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

            <div className="flex justify-between items-center p-6 border-b border-[#3a3448]">

              <h2 className="text-2xl font-bold text-white">
                {editingBanner
                  ? "Edit Banner"
                  : "Add Banner"}
              </h2>

              <button
                type="button"
                onClick={closeModal}
                disabled={submitting}
                className="text-white hover:text-purple-300"
              >
                <FaTimes size={20} />
              </button>

            </div>

            <div className="overflow-y-auto max-h-[75vh] p-6">

              <form
                onSubmit={handleSubmit}
                className="space-y-1"
              >

                {/* PAGE */}
                <div>
                  <label className={labelClass}>
                    Page *
                  </label>

                  <select
                    value={formData.banner_type}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        banner_type:
                          event.target.value,
                      })
                    }
                    className={inputClass}
                    disabled={submitting}
                  >
                    {PAGE_OPTIONS.map(
                      (page) => (
                        <option
                          key={page.value}
                          value={page.value}
                        >
                          {page.label}
                        </option>
                      )
                    )}
                  </select>
                </div>

                {/* TITLE */}
                <div>
                  <label className={labelClass}>
                    Banner Title *
                  </label>

                  <input
                    value={formData.title}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        title:
                          event.target.value,
                      })
                    }
                    className={inputClass}
                    placeholder="Enter banner title"
                    disabled={submitting}
                    required
                  />
                </div>

                {/* IMAGE */}
                <div>

                  <label className={labelClass}>
                    Banner Image
                    {!editingBanner && (
                      <span className="text-red-500">
                        {" "}*
                      </span>
                    )}
                  </label>

                  {previewImage && (
                    <img
                      src={
                        previewImage.startsWith(
                          "blob:"
                        )
                          ? previewImage
                          : getImageUrl(
                              previewImage
                            )
                      }
                      alt="Preview"
                      className="w-full h-40 object-cover rounded-xl mb-3 border border-[#333]"
                    />
                  )}

                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    onChange={
                      handleFileChange
                    }
                    disabled={submitting}
                    className="w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-500/20 file:text-purple-300"
                  />

                </div>

                {/* DISPLAY ORDER */}
                <div>

                  <label className={labelClass}>
                    Display Order
                  </label>

                  <input
                    type="number"
                    min="1"
                    value={formData.display_order}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        display_order:
                          event.target.value,
                      })
                    }
                    className={inputClass}
                    disabled={submitting}
                  />

                </div>

                {/* STATUS */}
                <div>

                  <label className={labelClass}>
                    Status
                  </label>

                  <select
                    value={
                      formData.is_active
                        ? "true"
                        : "false"
                    }
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        is_active:
                          event.target.value ===
                          "true",
                      })
                    }
                    className={inputClass}
                    disabled={submitting}
                  >
                    <option value="true">
                      Active
                    </option>

                    <option value="false">
                      Inactive
                    </option>
                  </select>

                </div>

                {/* BUTTONS */}
                <div className="flex justify-end gap-3 pt-4 border-t border-[#3a3448]">

                  <button
                    type="button"
                    onClick={closeModal}
                    disabled={submitting}
                    className="px-5 py-3 rounded-xl border border-gray-600 text-gray-300 hover:bg-[#2b2638]"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 disabled:opacity-50"
                  >
                    {submitting
                      ? "Saving..."
                      : editingBanner
                      ? "Update Banner"
                      : "Add Banner"}
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
                Delete Banner
              </h2>

              <p className="text-white text-center text-sm leading-relaxed mb-8">
                Are you sure you want to delete this banner?
              </p>

              <div className="flex gap-3 w-full">

                <button
                  type="button"
                  onClick={() => {
                    setShowDeleteModal(false);
                    setDeletingBanner(null);
                  }}
                  className="flex-1 px-5 py-3 rounded-xl border border-[#3a3650] text-gray-300 hover:bg-[#2a2640]"
                >
                  Cancel
                </button>

                <button
                  type="button"
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