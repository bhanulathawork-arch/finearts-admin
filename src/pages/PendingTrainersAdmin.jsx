// import { useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import {
//   HiCheckCircle,
//   HiXCircle,
// } from "react-icons/hi";

// import DataTable from "../components/ui/DataTable";
// import Button from "../components/ui/Button";
// import Badge from "../components/ui/Badge";
// import { updateTrainerApproval } from "../services/trainerService";


// export default function PendingTrainersAdmin() {
//   const [trainers, setTrainers] = useState([]);
//   const [loading, setLoading] = useState(false);

//   console.log(trainers)

//   const token = localStorage.getItem("adminToken");

//   const fetchTrainers = async () => {
//     try {
//       setLoading(true);

//       const res = await axios.get(
//         "http://localhost:5000/api/admin/trainers/pending",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setTrainers(res.data.data || []);
//     } catch (error) {
//       toast.error(
//         error?.response?.data?.message ||
//           "Failed to fetch trainers"
//       );
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
//       await updateTrainerApproval(
//         trainer.id,
//         "APPROVED",
//         token
//       );

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
//       await updateTrainerApproval(
//         trainer.id,
//         "REJECTED",
//         token
//       );

//       toast.success("Trainer rejected");
//       fetchTrainers();
//     } catch (e) {
//       toast.error(
//         e?.response?.data?.message ||
//         "Reject failed"
//       );
//     }
//   };

//   /* COLUMNS — EXACT same as main Trainers page */
//   const columns = [
//     {
//       key: "profile_image",
//       label: "IMAGE",
//       render: (value) => (
//         <img
//           src={value}
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

//   return (
//     <div className="space-y-6 animate-slide-up">
//       <h1 className="text-3xl font-bold gradient-text">
//         Pending Trainers
//       </h1>

//       <DataTable
//         columns={columns}
//         data={trainers}
//         loading={loading}
//         filterable
//         actions={(row) => (
//           <div className="flex items-center gap-2">

//             {/* APPROVE */}
//             <Button
//               variant="ghost"
//               size="sm"
//               icon={HiCheckCircle}
//               className="text-green-500 hover:text-green-400"
//               onClick={() => handleApprove(row)}
//             />

//             {/* REJECT */}
//             <Button
//               variant="ghost"
//               size="sm"
//               icon={HiXCircle}
//               className="text-red-500 hover:text-red-400"
//               onClick={() => handleReject(row)}
//             />

//           </div>
//         )}
//       />
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { Search } from "lucide-react";
// import { FaCheck, FaBan, FaTimes } from "react-icons/fa";

// import { updateTrainerApproval } from "../services/trainerService";

// export default function PendingTrainersAdmin() {
//   const [trainers, setTrainers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");

//   const token = localStorage.getItem("adminToken");

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
//     return `http://localhost:5000${img}`;
//   };

//   const fetchTrainers = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(
//         "http://localhost:5000/api/admin/trainers/pending",
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
//             className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
//             size={18}
//           />
//           <input
//             type="text"
//             placeholder="Search pending trainers..."
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
//                       <p className="text-gray-500">Loading trainers...</p>
//                     </div>
//                   </td>
//                 </tr>
//               ) : filteredTrainers.length === 0 ? (
//                 <tr>
//                   <td colSpan={15} className="p-12 text-center">
//                     <div className="flex flex-col items-center gap-3">
//                       <Search size={40} className="text-gray-600" />
//                       <p className="text-gray-500 text-lg">
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
//                         <button
//                           onClick={() => handleReject(trainer)}
//                           className="p-2 rounded-lg hover:bg-red-500/10 transition-colors group"
//                           title="Reject"
//                         >
//                           <FaBan
//                             size={14}
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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [trainerToDelete, setTrainerToDelete] = useState(null);

  const token = localStorage.getItem("adminToken");

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
      t.certifications?.toLowerCase().includes(query) ||
      t.category_name?.toLowerCase().includes(query) ||
      t.subcategory_name?.toLowerCase().includes(query) ||
      t.approval_status?.toLowerCase().includes(query) ||
      String(t.id).includes(query) ||
      String(t.experience_years).includes(query) ||
      String(t.total_students).includes(query) ||
      String(t.response_rate).includes(query)
    );
  });

  // --- Image helper ---
  const getImageUrl = (img) => {
    if (!img) return "";
    if (img.startsWith("http")) return img;
    return `http://localhost:5000${img}`;
  };

  const fetchTrainers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://localhost:5000/api/admin/trainers/pending",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTrainers(res.data.data || []);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch trainers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  /* APPROVE */
  const handleApprove = async (trainer) => {
    try {
      await updateTrainerApproval(trainer.id, "APPROVED", token);
      toast.success("Trainer approved successfully");
      fetchTrainers();
    } catch (e) {
      console.error(e);
      toast.error(e?.response?.data?.message || "Approval failed");
    }
  };

  /* REJECT */
  const handleReject = async (trainer) => {
    try {
      await updateTrainerApproval(trainer.id, "REJECTED", token);
      toast.success("Trainer rejected");
      fetchTrainers();
    } catch (e) {
      toast.error(e?.response?.data?.message || "Reject failed");
    }
  };

  /* DELETE */
  const handleDeleteClick = (trainer) => {
    setTrainerToDelete(trainer);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!trainerToDelete) return;
    try {
      await deleteAdminTrainer(trainerToDelete.id, token);
      toast.success("Trainer deleted successfully");
      fetchTrainers();
      setShowDeleteModal(false);
      setTrainerToDelete(null);
    } catch (e) {
      toast.error(e?.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="p-8 text-white">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-purple-400">
          Pending Trainers
        </h1>
        <p className="text-white mt-2">
          Review and approve trainer applications
        </p>
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
            placeholder="Search pending trainers..."
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
          <table className="w-full">
            <thead className="bg-[#202027] text-white">
              <tr>
                <th className="p-4 text-left whitespace-nowrap">Image</th>
                <th className="p-4 text-left whitespace-nowrap">Name</th>
                <th className="p-4 text-left whitespace-nowrap">Specialty</th>
                <th className="p-4 text-left whitespace-nowrap">Bio</th>
                <th className="p-4 text-left whitespace-nowrap">Experience</th>
                <th className="p-4 text-left whitespace-nowrap">Phone</th>
                <th className="p-4 text-left whitespace-nowrap">Languages</th>
                <th className="p-4 text-left whitespace-nowrap">Skills</th>
                <th className="p-4 text-left whitespace-nowrap">Certifications</th>
                <th className="p-4 text-left whitespace-nowrap">Students</th>
                <th className="p-4 text-left whitespace-nowrap">Response Rate</th>
                <th className="p-4 text-left whitespace-nowrap">Category</th>
                <th className="p-4 text-left whitespace-nowrap">Subcategory</th>
                <th className="p-4 text-left whitespace-nowrap">Status</th>
                <th className="p-4 text-left whitespace-nowrap">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={15} className="p-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                      <p className="text-white">Loading trainers...</p>
                    </div>
                  </td>
                </tr>
              ) : filteredTrainers.length === 0 ? (
                <tr>
                  <td colSpan={15} className="p-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <Search size={40} className="text-white" />
                      <p className="text-white text-lg">
                        {searchQuery
                          ? "No trainers found matching your search"
                          : "No pending trainers"}
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
                        <div className="w-11 h-11 bg-[#26262b] rounded-xl flex items-center justify-center text-white text-xs">
                          N/A
                        </div>
                      )}
                    </td>

                    <td className="p-4 font-medium whitespace-nowrap">
                      {trainer.full_name}
                    </td>
                    <td className="p-4 text-white whitespace-nowrap">
                      {trainer.specialty || "-"}
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
                    <td className="p-4 text-white max-w-[130px] truncate">
                      {trainer.skills || "-"}
                    </td>
                    <td className="p-4 text-white max-w-[130px] truncate">
                      {trainer.certifications || "-"}
                    </td>
                    <td className="p-4 font-semibold whitespace-nowrap">
                      {trainer.total_students ?? 0}
                    </td>
                    <td className="p-4 text-white whitespace-nowrap">
                      {trainer.response_rate || "-"}
                    </td>
                    <td className="p-4 text-white whitespace-nowrap">
                      {trainer.category_name || "-"}
                    </td>
                    <td className="p-4 text-white whitespace-nowrap">
                      {trainer.subcategory_name || "-"}
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-500/20 text-yellow-400">
                        {trainer.approval_status || "Pending"}
                      </span>
                    </td>

                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {/* Approve */}
                        <button
                          onClick={() => handleApprove(trainer)}
                          className="p-2 rounded-lg hover:bg-green-500/10 transition-colors group"
                          title="Approve"
                        >
                          <FaCheck
                            size={14}
                            className="text-green-500/70 group-hover:text-green-400 transition-colors"
                          />
                        </button>

                        {/* Reject */}
                        <button
                          onClick={() => handleReject(trainer)}
                          className="p-2 rounded-lg hover:bg-orange-500/10 transition-colors group"
                          title="Reject"
                        >
                          <FaBan
                            size={14}
                            className="text-orange-500/70 group-hover:text-orange-400 transition-colors"
                          />
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => handleDeleteClick(trainer)}
                          className="p-2 rounded-lg hover:bg-red-500/10 transition-colors group"
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
                Delete Trainer
              </h2>

              {/* Description */}
              <p className="text-white text-center text-sm leading-relaxed mb-8">
                Are you sure you want to delete{" "}
                <span className="text-white font-medium">
                  {trainerToDelete?.full_name}
                </span>
                ? This action cannot be undone.
              </p>

              {/* Buttons */}
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