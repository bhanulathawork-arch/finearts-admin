
// import { useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { Search, Trash2 } from "lucide-react";
// import { FaCheck, FaBan, FaTimes, FaTrash } from "react-icons/fa";

// import {
//   updateTrainerApproval,
//   deleteAdminTrainer,
// } from "../services/trainerService";

// export default function PendingTrainersAdmin() {
//   const [trainers, setTrainers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [trainerToDelete, setTrainerToDelete] = useState(null);

//   const token = localStorage.getItem("adminToken");

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
//       t.category_name?.toLowerCase().includes(query) ||
//       t.subcategory_name?.toLowerCase().includes(query) ||
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
//     return `https://finearts-backend.onrender.com${img}`;
//   };

//   const fetchTrainers = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(
//         "https://finearts-backend.onrender.com/api/admin/trainers/pending",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setTrainers(res.data.data || []);
//     } catch (error) {
//       toast.error(error?.response?.data?.message || "Failed to fetch trainers");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTrainers();
//   }, []);

//   /* APPROVE */
//   const handleApprove = async (trainer) => {
//     try {
//       await updateTrainerApproval(trainer.id, "APPROVED", token);
//       toast.success("Trainer approved successfully");
//       fetchTrainers();
//     } catch (e) {
//       console.error(e);
//       toast.error(e?.response?.data?.message || "Approval failed");
//     }
//   };

//   /* REJECT */
//   const handleReject = async (trainer) => {
//     try {
//       await updateTrainerApproval(trainer.id, "REJECTED", token);
//       toast.success("Trainer rejected");
//       fetchTrainers();
//     } catch (e) {
//       toast.error(e?.response?.data?.message || "Reject failed");
//     }
//   };

//   /* DELETE */
//   const handleDeleteClick = (trainer) => {
//     setTrainerToDelete(trainer);
//     setShowDeleteModal(true);
//   };

//   const confirmDelete = async () => {
//     if (!trainerToDelete) return;
//     try {
//       await deleteAdminTrainer(trainerToDelete.id, token);
//       toast.success("Trainer deleted successfully");
//       fetchTrainers();
//       setShowDeleteModal(false);
//       setTrainerToDelete(null);
//     } catch (e) {
//       toast.error(e?.response?.data?.message || "Delete failed");
//     }
//   };

//   return (
//     <div className="p-8 text-white">
//       {/* Header */}
//       <div className="mb-6">
//         <h1 className="text-4xl font-bold text-purple-400">
//           Pending Trainers
//         </h1>
//         <p className="text-white mt-2">
//           Review and approve trainer applications
//         </p>
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
//             placeholder="Search pending trainers..."
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
//                 <th className="p-4 text-left whitespace-nowrap">Specialty</th>
//                 <th className="p-4 text-left whitespace-nowrap">Bio</th>
//                 <th className="p-4 text-left whitespace-nowrap">Experience</th>
//                 <th className="p-4 text-left whitespace-nowrap">Phone</th>
//                 <th className="p-4 text-left whitespace-nowrap">Languages</th>
//                 <th className="p-4 text-left whitespace-nowrap">Skills</th>
//                 <th className="p-4 text-left whitespace-nowrap">Certifications</th>
//                 <th className="p-4 text-left whitespace-nowrap">Students</th>
//                 <th className="p-4 text-left whitespace-nowrap">Response Rate</th>
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
//                       <p className="text-white">Loading trainers...</p>
//                     </div>
//                   </td>
//                 </tr>
//               ) : filteredTrainers.length === 0 ? (
//                 <tr>
//                   <td colSpan={15} className="p-12 text-center">
//                     <div className="flex flex-col items-center gap-3">
//                       <Search size={40} className="text-white" />
//                       <p className="text-white text-lg">
//                         {searchQuery
//                           ? "No trainers found matching your search"
//                           : "No pending trainers"}
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
//                         <div className="w-11 h-11 bg-[#26262b] rounded-xl flex items-center justify-center text-white text-xs">
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
//                     <td className="p-4 text-white max-w-[130px] truncate">
//                       {trainer.certifications || "-"}
//                     </td>
//                     <td className="p-4 font-semibold whitespace-nowrap">
//                       {trainer.total_students ?? 0}
//                     </td>
//                     <td className="p-4 text-white whitespace-nowrap">
//                       {trainer.response_rate || "-"}
//                     </td>
//                     <td className="p-4 text-white whitespace-nowrap">
//                       {trainer.category_name || "-"}
//                     </td>
//                     <td className="p-4 text-white whitespace-nowrap">
//                       {trainer.subcategory_name || "-"}
//                     </td>
//                     <td className="p-4 whitespace-nowrap">
//                       <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-500/20 text-yellow-400">
//                         {trainer.approval_status || "Pending"}
//                       </span>
//                     </td>

//                     <td className="p-4">
//                       <div className="flex items-center gap-2">
//                         {/* Approve */}
//                         <button
//                           onClick={() => handleApprove(trainer)}
//                           className="p-2 rounded-lg hover:bg-green-500/10 transition-colors group"
//                           title="Approve"
//                         >
//                           <FaCheck
//                             size={14}
//                             className="text-green-500/70 group-hover:text-green-400 transition-colors"
//                           />
//                         </button>

//                         {/* Reject */}
//                         <button
//                           onClick={() => handleReject(trainer)}
//                           className="p-2 rounded-lg hover:bg-orange-500/10 transition-colors group"
//                           title="Reject"
//                         >
//                           <FaBan
//                             size={14}
//                             className="text-orange-500/70 group-hover:text-orange-400 transition-colors"
//                           />
//                         </button>

//                         {/* Delete */}
//                         <button
//                           onClick={() => handleDeleteClick(trainer)}
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
//                 Delete Trainer
//               </h2>

//               {/* Description */}
//               <p className="text-white text-center text-sm leading-relaxed mb-8">
//                 Are you sure you want to delete{" "}
//                 <span className="text-white font-medium">
//                   {trainerToDelete?.full_name}
//                 </span>
//                 ? This action cannot be undone.
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
import axios from "axios";
import toast from "react-hot-toast";
import { Search, Trash2 } from "lucide-react";
import { FaCheck, FaBan, FaTimes, FaTrash } from "react-icons/fa";

import {
  updateTrainerApproval,
  deleteAdminTrainer,
} from "../services/trainerService";

export default function PendingTrainersAdmin() {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Confirmation modal state
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [trainerToAction, setTrainerToAction] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const token = localStorage.getItem("adminToken");

  // =========================================================
  // FILTERED TRAINERS
  // =========================================================
  const filteredTrainers = trainers.filter((t) => {
    const query = searchQuery.toLowerCase();

    return (
      t.full_name?.toLowerCase().includes(query) ||
      t.email?.toLowerCase().includes(query) ||
      t.specialty?.toLowerCase().includes(query) ||
      t.bio?.toLowerCase().includes(query) ||
      t.phone_number?.includes(query) ||
      t.languages?.toLowerCase().includes(query) ||
      t.certifications?.toLowerCase().includes(query) ||
      t.categories?.toLowerCase().includes(query) ||
      t.subcategories?.toLowerCase().includes(query) ||
      t.approval_status?.toLowerCase().includes(query) ||
      String(t.id).includes(query) ||
      String(t.experience_years).includes(query) ||
      String(t.total_students).includes(query)
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
  // FETCH TRAINERS
  // =========================================================
  const fetchTrainers = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "https://finearts-backend.onrender.com/api/admin/trainers/pending",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTrainers(res.data.data || []);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to fetch trainers"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  // =========================================================
  // OPEN CONFIRMATION MODAL
  // =========================================================
  const openConfirmModal = (trainer, action) => {
    setTrainerToAction(trainer);
    setConfirmAction(action);
    setShowConfirmModal(true);
  };

  // =========================================================
  // CLOSE CONFIRMATION MODAL
  // =========================================================
  const closeConfirmModal = () => {
    if (actionLoading) return;

    setShowConfirmModal(false);
    setTrainerToAction(null);
    setConfirmAction(null);
  };

  // =========================================================
  // APPROVE
  // =========================================================
  const handleApprove = (trainer) => {
    openConfirmModal(trainer, "approve");
  };

  // =========================================================
  // REJECT
  // =========================================================
  const handleReject = (trainer) => {
    openConfirmModal(trainer, "reject");
  };

  // =========================================================
  // DELETE
  // =========================================================
  const handleDelete = (trainer) => {
    openConfirmModal(trainer, "delete");
  };

  // =========================================================
  // CONFIRM ACTION
  // =========================================================
  const confirmActionHandler = async () => {
    if (!trainerToAction || !confirmAction || actionLoading) {
      return;
    }

    try {
      setActionLoading(true);

      // -----------------------------------------------------
      // APPROVE
      // -----------------------------------------------------
      if (confirmAction === "approve") {
        await updateTrainerApproval(
          trainerToAction.id,
          "APPROVED",
          token
        );

        toast.success("Trainer approved successfully");
      }

      // -----------------------------------------------------
      // REJECT
      // -----------------------------------------------------
      else if (confirmAction === "reject") {
        await updateTrainerApproval(
          trainerToAction.id,
          "REJECTED",
          token
        );

        toast.success("Trainer rejected successfully");
      }

      // -----------------------------------------------------
      // DELETE
      // -----------------------------------------------------
      else if (confirmAction === "delete") {
        await deleteAdminTrainer(
          trainerToAction.id,
          token
        );

        toast.success("Trainer deleted successfully");
      }

      // Refresh trainer list
      await fetchTrainers();

      // Close modal
      setShowConfirmModal(false);
      setTrainerToAction(null);
      setConfirmAction(null);
    } catch (error) {
      console.error("Trainer action error:", error);

      if (confirmAction === "approve") {
        toast.error(
          error?.response?.data?.message || "Approval failed"
        );
      } else if (confirmAction === "reject") {
        toast.error(
          error?.response?.data?.message || "Reject failed"
        );
      } else if (confirmAction === "delete") {
        toast.error(
          error?.response?.data?.message || "Delete failed"
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
      case "approve":
        return {
          title: "Approve Trainer",

          description: (
            <>
              Are you sure you want to approve{" "}
              <span className="text-white font-semibold">
                {trainerToAction?.full_name}
              </span>
              ?
              <br />

              <span className="text-green-400 mt-2 inline-block">
                This trainer will be approved.
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

      case "reject":
        return {
          title: "Reject Trainer",

          description: (
            <>
              Are you sure you want to reject{" "}
              <span className="text-white font-semibold">
                {trainerToAction?.full_name}
              </span>
              ?
              <br />

              <span className="text-orange-400 mt-2 inline-block">
                This trainer application will be rejected.
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

      case "delete":
        return {
          title: "Delete Trainer",

          description: (
            <>
              Are you sure you want to delete{" "}
              <span className="text-white font-semibold">
                {trainerToAction?.full_name}
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

  const modalConfig = getConfirmModalConfig();

  // =========================================================
  // FORMAT CATEGORIES / SUBCATEGORIES
  // =========================================================
  const renderTags = (value, type) => {
    if (!value) {
      return <span className="text-white">-</span>;
    }

    const items = value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    if (items.length === 0) {
      return <span className="text-white">-</span>;
    }

    return (
      <div className="flex flex-wrap gap-1.5 min-w-[180px] max-w-[280px]">
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
          Pending Trainers
        </h1>

        <p className="text-white mt-2">
          Review and approve trainer applications
        </p>
      </div>

      {/* =====================================================
          SEARCH BAR
      ====================================================== */}
      <div className="mb-6">
        <div className="relative w-full">

          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white pointer-events-none"
            size={18}
          />

          <input
            type="text"
            placeholder="Search pending trainers..."
            value={searchQuery}
            onChange={(e) =>
              setSearchQuery(e.target.value)
            }
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
                  Specialty
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
                  Students
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
                        Loading trainers...
                      </p>

                    </div>

                  </td>

                </tr>

              ) : filteredTrainers.length === 0 ? (

                /* ===============================================
                   EMPTY STATE
                ================================================ */
                <tr>

                  <td
                    colSpan={13}
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
                          : "No pending trainers"}

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
                   TRAINER ROWS
                ================================================ */
                filteredTrainers.map((trainer) => (

                  <tr
                    key={trainer.id}
                    className="border-t border-[#2c2c35] hover:bg-[#1a1a20] transition-colors"
                  >

                    {/* =========================================
                        IMAGE
                    ========================================== */}
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

                    {/* =========================================
                        NAME
                    ========================================== */}
                    <td className="p-4 font-medium whitespace-nowrap">
                      {trainer.full_name}
                    </td>

                    {/* =========================================
                        SPECIALTY
                    ========================================== */}
                    <td className="p-4 text-white whitespace-nowrap">
                      {trainer.specialty || "-"}
                    </td>

                    {/* =========================================
                        BIO
                    ========================================== */}
                    <td className="p-4 text-white max-w-[130px] truncate">
                      {trainer.bio || "-"}
                    </td>

                    {/* =========================================
                        EXPERIENCE
                    ========================================== */}
                    <td className="p-4 text-white whitespace-nowrap">
                      {trainer.experience_years
                        ? `${trainer.experience_years} yrs`
                        : "-"}
                    </td>

                    {/* =========================================
                        PHONE
                    ========================================== */}
                    <td className="p-4 text-white whitespace-nowrap">
                      {trainer.phone_number || "-"}
                    </td>

                    {/* =========================================
                        LANGUAGES
                    ========================================== */}
                    <td className="p-4 text-white whitespace-nowrap">
                      {trainer.languages || "-"}
                    </td>

                    {/* =========================================
                        CERTIFICATIONS
                    ========================================== */}
                    <td className="p-4 text-white max-w-[130px] truncate">
                      {trainer.certifications || "-"}
                    </td>

                    {/* =========================================
                        STUDENTS
                    ========================================== */}
                    <td className="p-4 font-semibold whitespace-nowrap">
                      {trainer.total_students ?? 0}
                    </td>

                    {/* =========================================
                        CATEGORIES
                    ========================================== */}
                    <td className="p-4 align-top">
                      {renderTags(
                        trainer.categories,
                        "category"
                      )}
                    </td>

                    {/* =========================================
                        SUBCATEGORIES
                    ========================================== */}
                    <td className="p-4 align-top">
                      {renderTags(
                        trainer.subcategories,
                        "subcategory"
                      )}
                    </td>

                    {/* =========================================
                        STATUS
                    ========================================== */}
                    <td className="p-4 whitespace-nowrap">

                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-500/20 text-yellow-400">
                        {trainer.approval_status || "Pending"}
                      </span>

                    </td>

                    {/* =========================================
                        ACTIONS
                    ========================================== */}
                    <td className="p-4">

                      <div className="flex items-center gap-2">

                        {/* -------------------------------------
                            APPROVE
                        -------------------------------------- */}
                        <button
                          onClick={() =>
                            handleApprove(trainer)
                          }
                          disabled={actionLoading}
                          className="p-2 rounded-lg hover:bg-green-500/10 transition-colors group disabled:opacity-40 disabled:cursor-not-allowed"
                          title="Approve"
                        >

                          <FaCheck
                            size={14}
                            className="text-green-500/70 group-hover:text-green-400 transition-colors"
                          />

                        </button>

                        {/* -------------------------------------
                            REJECT
                        -------------------------------------- */}
                        <button
                          onClick={() =>
                            handleReject(trainer)
                          }
                          disabled={actionLoading}
                          className="p-2 rounded-lg hover:bg-orange-500/10 transition-colors group disabled:opacity-40 disabled:cursor-not-allowed"
                          title="Reject"
                        >

                          <FaBan
                            size={14}
                            className="text-orange-500/70 group-hover:text-orange-400 transition-colors"
                          />

                        </button>

                        {/* -------------------------------------
                            DELETE
                        -------------------------------------- */}
                        <button
                          onClick={() =>
                            handleDelete(trainer)
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

                ))

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
                  MODAL ICON
              ============================================== */}
              <div className="mb-5">
                {modalConfig.icon}
              </div>

              {/* =============================================
                  MODAL TITLE
              ============================================== */}
              <h2 className="text-xl font-bold text-white mb-3 text-center">
                {modalConfig.title}
              </h2>

              {/* =============================================
                  MODAL DESCRIPTION
              ============================================== */}
              <p className="text-white text-center text-sm leading-relaxed mb-8">
                {modalConfig.description}
              </p>

              {/* =============================================
                  MODAL BUTTONS
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


