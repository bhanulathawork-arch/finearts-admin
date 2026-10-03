

// import { useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { Trash2 } from "lucide-react";
// import {
//   FaSearch,
//   FaCheck,
//   FaBan,
//   FaTimes,
//   FaTrash,
// } from "react-icons/fa";

// import {
//   updateInstituteApproval,
// } from "../services/instituteService";

// export default function PendingInstitutesAdmin() {
//   const [institutes, setInstitutes] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [instituteToDelete, setInstituteToDelete] = useState(null);

//   const token = localStorage.getItem("adminToken");

//   // --- Filtered institutes ---
//   const filteredInstitutes = institutes.filter((inst) => {
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
//     return `https://finearts-backend.onrender.com${img}`;
//   };

//   const fetchInstitutes = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(
//         "https://finearts-backend.onrender.com/api/institutes/admin/pending",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setInstitutes(res.data.data || []);
//     } catch (error) {
//       toast.error(error?.response?.data?.message || "Failed to fetch institutes");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchInstitutes();
//   }, []);

//   /* APPROVE */
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

//   /* REJECT */
//   const handleReject = async (institute) => {
//     try {
//       await updateInstituteApproval(institute.id, "REJECTED", token);
//       toast.success("Institute rejected");
//       fetchInstitutes();
//     } catch (e) {
//       toast.error(e?.response?.data?.message || "Reject failed");
//     }
//   };

//   /* DELETE */
//   const handleDeleteClick = (institute) => {
//     setInstituteToDelete(institute);
//     setShowDeleteModal(true);
//   };

 
//   const confirmDelete = async () => {
//   if (!instituteToDelete) return;

//   try {
//     await axios.delete(
//       `https://finearts-backend.onrender.com/api/institutes/${instituteToDelete.id}`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     toast.success("Institute deleted successfully");

//     fetchInstitutes();

//     setShowDeleteModal(false);
//     setInstituteToDelete(null);

//   } catch (e) {
//     console.error(e);
//     toast.error(
//       e?.response?.data?.message || "Delete failed"
//     );
//   }
// };

//   return (
//     <div className="p-8 text-white">
//       {/* Header */}
//       <div className="mb-6">
//         <h1 className="text-4xl font-bold text-purple-400">
//           Pending Institutes
//         </h1>
//         <p className="text-white mt-2">
//           Review and approve institute applications
//         </p>
//       </div>

//       {/* Full-width Search Bar */}
//       <div className="mb-6">
//         <div className="relative w-full">
//           <FaSearch
//             className="absolute left-4 top-1/2 -translate-y-1/2 text-white pointer-events-none"
//             size={18}
//           />
//           <input
//             type="text"
//             placeholder="Search pending institutes..."
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
//                       <FaSearch size={40} className="text-white" />
//                       <p className="text-white text-lg">
//                         {searchQuery
//                           ? "No institutes found matching your search"
//                           : "No pending institutes"}
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
//                       {inst.name}
//                     </td>
//                     <td className="p-4 text-white max-w-[180px] truncate">
//                       {inst.description || "-"}
//                     </td>
//                     <td className="p-4 text-white whitespace-nowrap">
//                       {inst.email || "-"}
//                     </td>
//                     <td className="p-4 text-white whitespace-nowrap">
//                       {inst.phone_number || "-"}
//                     </td>
//                     <td className="p-4 text-white whitespace-nowrap">
//                       {inst.city || "-"}
//                     </td>
//                     <td className="p-4 text-white whitespace-nowrap">
//                       {inst.state || "-"}
//                     </td>
//                     <td className="p-4 text-white whitespace-nowrap">
//                       {inst.timing || "-"}
//                     </td>
//                     <td className="p-4 whitespace-nowrap">
//                       <span className="text-white font-semibold">
//                         {inst.rating ? ` ${inst.rating}` : "-"}
//                       </span>
//                     </td>
//                     <td className="p-4 font-semibold whitespace-nowrap">
//                       {inst.reviews ?? "-"}
//                     </td>
//                     <td className="p-4 font-semibold whitespace-nowrap">
//                       {inst.courses ?? "-"}
//                     </td>
//                     <td className="p-4 text-white max-w-[130px] truncate">
//                       {inst.categories?.length
//                         ? inst.categories
//                             .map((c) => c.category_name)
//                             .filter(Boolean)
//                             .join(", ")
//                         : "-"}
//                     </td>
//                     <td className="p-4 text-white max-w-[130px] truncate">
//                       {inst.categories?.length
//                         ? inst.categories
//                             .map((c) => c.subcategory_name)
//                             .filter(Boolean)
//                             .join(", ")
//                         : "-"}
//                     </td>
//                     <td className="p-4 whitespace-nowrap">
//                       <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-500/20 text-yellow-400">
//                         {inst.approval_status || "Pending"}
//                       </span>
//                     </td>

//                     <td className="p-4">
//                       <div className="flex items-center gap-2">
//                         {/* Approve */}
//                         <button
//                           onClick={() => handleApprove(inst)}
//                           className="p-2 rounded-lg hover:bg-green-500/10 transition-colors group"
//                           title="Approve"
//                         >
//                           <FaCheck
//                             size={16}
//                             className="text-green-500/70 group-hover:text-green-400 transition-colors"
//                           />
//                         </button>

//                         {/* Reject */}
//                         <button
//                           onClick={() => handleReject(inst)}
//                           className="p-2 rounded-lg hover:bg-red-500/10 transition-colors group"
//                           title="Reject"
//                         >
//                           <FaBan
//                             size={16}
//                             className="text-red-500/70 group-hover:text-red-400 transition-colors"
//                           />
//                         </button>

//                         {/* Delete */}
//                         <button
//                           onClick={() => handleDeleteClick(inst)}
//                           className="p-2 rounded-lg hover:bg-red-500/10 transition-colors group"
//                           title="Delete"
//                         >
//                           <Trash2
//                             size={15}
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
//                 Delete Institute
//               </h2>

//               {/* Description */}
//               <p className="text-white text-center text-sm leading-relaxed mb-8">
//                 Are you sure you want to delete{" "}
//                 <span className="text-white font-medium">
//                   {instituteToDelete?.name}
//                 </span>
//                 ? This action cannot be undone.
//               </p>

//               {/* Buttons */}
//               <div className="flex gap-3 w-full">
//                 <button
//                   onClick={() => {
//                     setShowDeleteModal(false);
//                     setInstituteToDelete(null);
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
import axios from "axios";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";
import {
  FaSearch,
  FaCheck,
  FaBan,
  FaTimes,
  FaTrash,
} from "react-icons/fa";

import {
  updateInstituteApproval,
} from "../services/instituteService";

export default function PendingInstitutesAdmin() {
  const [institutes, setInstitutes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // =========================================================
  // CONFIRMATION MODAL
  // =========================================================
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [instituteToAction, setInstituteToAction] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const token = localStorage.getItem("adminToken");

  // =========================================================
  // FILTERED INSTITUTES
  // =========================================================
  const filteredInstitutes = institutes.filter((inst) => {
    const query = searchQuery.toLowerCase();

    const categorySearch = inst.categories?.some(
      (item) =>
        item.category_name
          ?.toLowerCase()
          .includes(query) ||
        item.subcategory_name
          ?.toLowerCase()
          .includes(query)
    );

    return (
      inst.name?.toLowerCase().includes(query) ||
      inst.description?.toLowerCase().includes(query) ||
      inst.email?.toLowerCase().includes(query) ||
      inst.phone_number?.includes(query) ||
      inst.city?.toLowerCase().includes(query) ||
      inst.state?.toLowerCase().includes(query) ||
      String(inst.id).includes(query) ||
      String(inst.rating).includes(query) ||
      String(inst.reviews).includes(query) ||
      categorySearch
    );
  });

  // =========================================================
  // IMAGE HELPER
  // =========================================================
  const getImageUrl = (img) => {
    if (!img) return "";

    if (img.startsWith("http")) {
      return img;
    }

    return `https://finearts-backend.onrender.com${img}`;
  };

  // =========================================================
  // FETCH INSTITUTES
  // =========================================================
  const fetchInstitutes = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "https://finearts-backend.onrender.com/api/institutes/admin/pending",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setInstitutes(res.data.data || []);
    } catch (error) {
      console.error("Fetch pending institutes error:", error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to fetch institutes"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // INITIAL LOAD
  // =========================================================
  useEffect(() => {
    fetchInstitutes();
  }, []);

  // =========================================================
  // OPEN CONFIRMATION MODAL
  // =========================================================
  const openConfirmModal = (institute, action) => {
    setInstituteToAction(institute);
    setConfirmAction(action);
    setShowConfirmModal(true);
  };

  // =========================================================
  // CLOSE CONFIRMATION MODAL
  // =========================================================
  const closeConfirmModal = () => {
    if (actionLoading) return;

    setShowConfirmModal(false);
    setInstituteToAction(null);
    setConfirmAction(null);
  };

  // =========================================================
  // APPROVE
  // =========================================================
  const handleApprove = (institute) => {
    openConfirmModal(institute, "approve");
  };

  // =========================================================
  // REJECT
  // =========================================================
  const handleReject = (institute) => {
    openConfirmModal(institute, "reject");
  };

  // =========================================================
  // DELETE
  // =========================================================
  const handleDelete = (institute) => {
    openConfirmModal(institute, "delete");
  };

  // =========================================================
  // CONFIRM ACTION
  // =========================================================
  const confirmActionHandler = async () => {
    if (
      !instituteToAction ||
      !confirmAction ||
      actionLoading
    ) {
      return;
    }

    try {
      setActionLoading(true);

      // -----------------------------------------------------
      // APPROVE
      // -----------------------------------------------------
      if (confirmAction === "approve") {
        await updateInstituteApproval(
          instituteToAction.id,
          "APPROVED",
          token
        );

        toast.success(
          "Institute approved successfully"
        );
      }

      // -----------------------------------------------------
      // REJECT
      // -----------------------------------------------------
      else if (confirmAction === "reject") {
        await updateInstituteApproval(
          instituteToAction.id,
          "REJECTED",
          token
        );

        toast.success(
          "Institute rejected successfully"
        );
      }

      // -----------------------------------------------------
      // DELETE
      // -----------------------------------------------------
      else if (confirmAction === "delete") {
        await axios.delete(
          `https://finearts-backend.onrender.com/api/institutes/${instituteToAction.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success(
          "Institute deleted successfully"
        );
      }

      // -----------------------------------------------------
      // REFRESH
      // -----------------------------------------------------
      await fetchInstitutes();

      // -----------------------------------------------------
      // CLOSE MODAL
      // -----------------------------------------------------
      setShowConfirmModal(false);
      setInstituteToAction(null);
      setConfirmAction(null);

    } catch (error) {
      console.error(
        "Institute action error:",
        error
      );

      if (confirmAction === "approve") {
        toast.error(
          error?.response?.data?.message ||
            "Approval failed"
        );
      } else if (confirmAction === "reject") {
        toast.error(
          error?.response?.data?.message ||
            "Reject failed"
        );
      } else if (confirmAction === "delete") {
        toast.error(
          error?.response?.data?.message ||
            "Delete failed"
        );
      }
    } finally {
      setActionLoading(false);
    }
  };

  // =========================================================
  // CONFIRMATION MODAL CONFIGURATION
  // =========================================================
  const getConfirmModalConfig = () => {
    switch (confirmAction) {
      // =====================================================
      // APPROVE
      // =====================================================
      case "approve":
        return {
          title: "Approve Institute",

          description: (
            <>
              Are you sure you want to approve{" "}
              <span className="text-white font-semibold">
                {instituteToAction?.name}
              </span>
              ?
              <br />

              <span className="text-green-400 mt-2 inline-block">
                This institute will be approved.
              </span>
            </>
          ),

          icon: (
            <div className="w-14 h-14 rounded-full bg-green-500/15 flex items-center justify-center">
              <FaCheck className="text-green-400 text-xl" />
            </div>
          ),

          buttonText: actionLoading
            ? "Approving..."
            : "Approve",

          buttonClass:
            "bg-gradient-to-r from-green-500 to-emerald-500 hover:opacity-90",
        };

      // =====================================================
      // REJECT
      // =====================================================
      case "reject":
        return {
          title: "Reject Institute",

          description: (
            <>
              Are you sure you want to reject{" "}
              <span className="text-white font-semibold">
                {instituteToAction?.name}
              </span>
              ?
              <br />

              <span className="text-orange-400 mt-2 inline-block">
                This institute application will be rejected.
              </span>
            </>
          ),

          icon: (
            <div className="w-14 h-14 rounded-full bg-orange-500/15 flex items-center justify-center">
              <FaBan className="text-orange-400 text-xl" />
            </div>
          ),

          buttonText: actionLoading
            ? "Rejecting..."
            : "Reject",

          buttonClass:
            "bg-gradient-to-r from-orange-500 to-amber-500 hover:opacity-90",
        };

      // =====================================================
      // DELETE
      // =====================================================
      case "delete":
        return {
          title: "Delete Institute",

          description: (
            <>
              Are you sure you want to delete{" "}
              <span className="text-white font-semibold">
                {instituteToAction?.name}
              </span>
              ?
              <br />

              <span className="text-red-400 mt-2 inline-block">
                This action cannot be undone.
              </span>
            </>
          ),

          icon: (
            <div className="w-14 h-14 rounded-full bg-red-500/15 flex items-center justify-center">
              <FaTrash className="text-red-400 text-xl" />
            </div>
          ),

          buttonText: actionLoading
            ? "Deleting..."
            : "Delete",

          buttonClass:
            "bg-gradient-to-r from-red-500 to-pink-500 hover:opacity-90",
        };

      // =====================================================
      // DEFAULT
      // =====================================================
      default:
        return {
          title: "Confirm Action",

          description:
            "Are you sure you want to continue?",

          icon: (
            <div className="w-14 h-14 rounded-full bg-purple-500/15 flex items-center justify-center">
              <FaCheck className="text-purple-400 text-xl" />
            </div>
          ),

          buttonText: actionLoading
            ? "Processing..."
            : "Confirm",

          buttonClass:
            "bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90",
        };
    }
  };

  const modalConfig =
    getConfirmModalConfig();

  // =========================================================
  // RENDER CATEGORY / SUBCATEGORY TAGS
  // =========================================================
  const renderCategoryTags = () => {
    if (
      !Array.isArray(instituteToAction?.categories) ||
      instituteToAction.categories.length === 0
    ) {
      return null;
    }

    return null;
  };

  // =========================================================
  // GET UNIQUE CATEGORIES
  // =========================================================
  const getCategories = (institute) => {
    if (!Array.isArray(institute?.categories)) {
      return [];
    }

    return [
      ...new Set(
        institute.categories
          .map((item) => item.category_name)
          .filter(Boolean)
      ),
    ];
  };

  // =========================================================
  // GET UNIQUE SUBCATEGORIES
  // =========================================================
  const getSubcategories = (institute) => {
    if (!Array.isArray(institute?.categories)) {
      return [];
    }

    return [
      ...new Set(
        institute.categories
          .map((item) => item.subcategory_name)
          .filter(Boolean)
      ),
    ];
  };

  // =========================================================
  // RENDER TAGS
  // =========================================================
  const renderTags = (items, type) => {
    if (!items || items.length === 0) {
      return (
        <span className="text-white">
          -
        </span>
      );
    }

    return (
      <div className="flex flex-wrap gap-1.5 min-w-[180px] max-w-[300px]">
        {items.map((item, index) => (
          <span
            key={`${type}-${item}-${index}`}
            className={
              type === "category"
                ? "inline-flex items-center rounded-full bg-blue-500/15 border border-blue-500/20 px-2.5 py-1 text-xs font-medium text-blue-300"
                : "inline-flex items-center rounded-full bg-purple-500/15 border border-purple-500/20 px-2.5 py-1 text-xs font-medium text-purple-300"
            }
          >
            {item}
          </span>
        ))}
      </div>
    );
  };

  // =========================================================
  // RETURN
  // =========================================================
  return (
    <div className="p-8 text-white">

      {/* =====================================================
          HEADER
      ====================================================== */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-purple-400">
          Pending Institutes
        </h1>

        <p className="text-white mt-2">
          Review and approve institute applications
        </p>
      </div>

      {/* =====================================================
          SEARCH BAR
      ====================================================== */}
      <div className="mb-6">
        <div className="relative w-full">

          <FaSearch
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white pointer-events-none"
            size={18}
          />

          <input
            type="text"
            placeholder="Search pending institutes..."
            value={searchQuery}
            onChange={(e) =>
              setSearchQuery(e.target.value)
            }
            className="w-full pl-12 pr-10 py-3.5 rounded-xl bg-[#151519] border border-[#2c2c35] text-white placeholder-white focus:outline-none focus:border-purple-500/60 transition-colors text-sm"
          />

          {searchQuery && (
            <button
              onClick={() =>
                setSearchQuery("")
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-white transition-colors"
            >
              <FaTimes size={14} />
            </button>
          )}

        </div>
      </div>

      {/* =====================================================
          TABLE
      ====================================================== */}
      <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            {/* =================================================
                TABLE HEADER
            ================================================== */}
            <thead className="bg-[#202027] text-white">

              <tr>

                <th className="p-4 text-left whitespace-nowrap">
                  Image
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Name
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Description
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Email
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Phone
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  City
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  State
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Rating
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Reviews
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Category
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Subcategory
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Status
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Actions
                </th>

              </tr>

            </thead>

            {/* =================================================
                TABLE BODY
            ================================================== */}
            <tbody>

              {/* =================================================
                  LOADING
              ================================================== */}
              {loading ? (

                <tr>

                  <td
                    colSpan={13}
                    className="p-12 text-center"
                  >

                    <div className="flex flex-col items-center gap-3">

                      <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>

                      <p className="text-white">
                        Loading institutes...
                      </p>

                    </div>

                  </td>

                </tr>

              ) : filteredInstitutes.length === 0 ? (

                /* ===============================================
                   EMPTY STATE
                ================================================ */
                <tr>

                  <td
                    colSpan={13}
                    className="p-12 text-center"
                  >

                    <div className="flex flex-col items-center gap-3">

                      <FaSearch
                        size={40}
                        className="text-white"
                      />

                      <p className="text-white text-lg">

                        {searchQuery
                          ? "No institutes found matching your search"
                          : "No pending institutes"}

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

                /* ===============================================
                   INSTITUTE ROWS
                ================================================ */
                filteredInstitutes.map((inst) => {

                  const categories =
                    getCategories(inst);

                  const subcategories =
                    getSubcategories(inst);

                  return (
                    <tr
                      key={inst.id}
                      className="border-t border-[#2c2c35] hover:bg-[#1a1a20] transition-colors"
                    >

                      {/* =======================================
                          IMAGE
                      ======================================== */}
                      <td className="p-4">

                        {inst.image_url ? (

                          <img
                            src={getImageUrl(
                              inst.image_url
                            )}
                            alt={inst.name}
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

                      {/* =======================================
                          NAME
                      ======================================== */}
                      <td className="p-4 font-medium whitespace-nowrap">
                        {inst.name}
                      </td>

                      {/* =======================================
                          DESCRIPTION
                      ======================================== */}
                      <td className="p-4 text-white max-w-[180px] truncate">
                        {inst.description || "-"}
                      </td>

                      {/* =======================================
                          EMAIL
                      ======================================== */}
                      <td className="p-4 text-white whitespace-nowrap">
                        {inst.email || "-"}
                      </td>

                      {/* =======================================
                          PHONE
                      ======================================== */}
                      <td className="p-4 text-white whitespace-nowrap">
                        {inst.phone_number || "-"}
                      </td>

                      {/* =======================================
                          CITY
                      ======================================== */}
                      <td className="p-4 text-white whitespace-nowrap">
                        {inst.city || "-"}
                      </td>

                      {/* =======================================
                          STATE
                      ======================================== */}
                      <td className="p-4 text-white whitespace-nowrap">
                        {inst.state || "-"}
                      </td>

                      {/* =======================================
                          RATING
                      ======================================== */}
                      <td className="p-4 whitespace-nowrap">

                        <span className="text-white font-semibold">
                          {inst.rating
                            ? inst.rating
                            : "-"}
                        </span>

                      </td>

                      {/* =======================================
                          REVIEWS
                      ======================================== */}
                      <td className="p-4 font-semibold whitespace-nowrap">
                        {inst.reviews ?? "-"}
                      </td>

                      {/* =======================================
                          CATEGORIES
                      ======================================== */}
                      <td className="p-4 align-top">
                        {renderTags(
                          categories,
                          "category"
                        )}
                      </td>

                      {/* =======================================
                          SUBCATEGORIES
                      ======================================== */}
                      <td className="p-4 align-top">
                        {renderTags(
                          subcategories,
                          "subcategory"
                        )}
                      </td>

                      {/* =======================================
                          STATUS
                      ======================================== */}
                      <td className="p-4 whitespace-nowrap">

                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-500/20 text-yellow-400">
                          {inst.approval_status ||
                            "Pending"}
                        </span>

                      </td>

                      {/* =======================================
                          ACTIONS
                      ======================================== */}
                      <td className="p-4">

                        <div className="flex items-center gap-2">

                          {/* -----------------------------------
                              APPROVE
                          ------------------------------------ */}
                          <button
                            onClick={() =>
                              handleApprove(inst)
                            }
                            disabled={actionLoading}
                            className="p-2 rounded-lg hover:bg-green-500/10 transition-colors group disabled:opacity-40 disabled:cursor-not-allowed"
                            title="Approve"
                          >

                            <FaCheck
                              size={16}
                              className="text-green-500/70 group-hover:text-green-400 transition-colors"
                            />

                          </button>

                          {/* -----------------------------------
                              REJECT
                          ------------------------------------ */}
                          <button
                            onClick={() =>
                              handleReject(inst)
                            }
                            disabled={actionLoading}
                            className="p-2 rounded-lg hover:bg-orange-500/10 transition-colors group disabled:opacity-40 disabled:cursor-not-allowed"
                            title="Reject"
                          >

                            <FaBan
                              size={16}
                              className="text-orange-500/70 group-hover:text-orange-400 transition-colors"
                            />

                          </button>

                          {/* -----------------------------------
                              DELETE
                          ------------------------------------ */}
                          <button
                            onClick={() =>
                              handleDelete(inst)
                            }
                            disabled={actionLoading}
                            className="p-2 rounded-lg hover:bg-red-500/10 transition-colors group disabled:opacity-40 disabled:cursor-not-allowed"
                            title="Delete"
                          >

                            <Trash2
                              size={15}
                              className="text-red-500/70 group-hover:text-red-400 transition-colors"
                            />

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

      {/* =====================================================
          UNIVERSAL CONFIRMATION MODAL
      ====================================================== */}
      {showConfirmModal && (

        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 px-4"
          onClick={() => {
            if (!actionLoading) {
              closeConfirmModal();
            }
          }}
        >

          <div
            className="w-full max-w-[420px] bg-[#1e1b2e] border border-[#2e2a42] rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="p-8 flex flex-col items-center">

              {/* =============================================
                  ICON
              ============================================== */}
              <div className="mb-5">
                {modalConfig.icon}
              </div>

              {/* =============================================
                  TITLE
              ============================================== */}
              <h2 className="text-xl font-bold text-white mb-3 text-center">
                {modalConfig.title}
              </h2>

              {/* =============================================
                  DESCRIPTION
              ============================================== */}
              <p className="text-white text-center text-sm leading-relaxed mb-8">
                {modalConfig.description}
              </p>

              {/* =============================================
                  BUTTONS
              ============================================== */}
              <div className="flex gap-3 w-full">

                {/* CANCEL */}
                <button
                  onClick={closeConfirmModal}
                  disabled={actionLoading}
                  className="flex-1 px-5 py-3 rounded-xl border border-[#3a3650] text-gray-300 hover:bg-[#2a2640] transition-colors font-medium text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>

                {/* CONFIRM */}
                <button
                  onClick={confirmActionHandler}
                  disabled={actionLoading}
                  className={`flex-1 px-5 py-3 rounded-xl text-white font-bold transition-opacity text-sm disabled:opacity-60 disabled:cursor-not-allowed ${modalConfig.buttonClass}`}
                >

                  {actionLoading && (
                    <span className="inline-block w-4 h-4 mr-2 border-2 border-white/40 border-t-white rounded-full animate-spin align-middle"></span>
                  )}

                  {modalConfig.buttonText}

                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

