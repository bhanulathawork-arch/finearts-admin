


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

// import {
//   updateInstituteApproval,
// } from "../services/instituteService";

// export default function PendingInstitutesAdmin() {
//   const [institutes, setInstitutes] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const token = localStorage.getItem("adminToken");

//   const fetchInstitutes = async () => {
//     try {
//       setLoading(true);

//       const res = await axios.get(
// "https://finearts-backend.onrender.com/api/institutes/admin/pending",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setInstitutes(res.data.data || []);
//     } catch (error) {
//       toast.error(
//         error?.response?.data?.message ||
//           "Failed to fetch institutes"
//       );
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

//   /* REJECT */
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

//   /* COLUMNS — EXACT same as main Institutes page */
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
//     {
//       key: "email",
//       label: "Email",
//     },
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

//   return (
//     <div className="space-y-6 animate-slide-up">
//       <h1 className="text-3xl font-bold gradient-text">
//         Pending Institutes
//       </h1>

//       <DataTable
//         columns={columns}
//         data={institutes}
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
// import {
//   FaSearch,
//   FaCheckCircle,
//   FaTimesCircle,
//   FaCheck,
//   FaBan,
//   FaTimes,
// } from "react-icons/fa";

// import {
//   updateInstituteApproval,
// } from "../services/instituteService";

// export default function PendingInstitutesAdmin() {
//   const [institutes, setInstitutes] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");

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
//             className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
//             size={18}
//           />
//           <input
//             type="text"
//             placeholder="Search pending institutes..."
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
//                       <p className="text-gray-500">Loading institutes...</p>
//                     </div>
//                   </td>
//                 </tr>
//               ) : filteredInstitutes.length === 0 ? (
//                 <tr>
//                   <td colSpan={15} className="p-12 text-center">
//                     <div className="flex flex-col items-center gap-3">
//                       <FaSearch size={40} className="text-gray-600" />
//                       <p className="text-gray-500 text-lg">
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
//                         <div className="w-11 h-11 bg-[#26262b] rounded-xl flex items-center justify-center text-gray-600 text-xs">
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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [instituteToDelete, setInstituteToDelete] = useState(null);

  const token = localStorage.getItem("adminToken");

  // --- Filtered institutes ---
  const filteredInstitutes = institutes.filter((inst) => {
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
    return `https://finearts-backend.onrender.com${img}`;
  };

  const fetchInstitutes = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://finearts-backend.onrender.com/api/institutes/admin/pending",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setInstitutes(res.data.data || []);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch institutes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstitutes();
  }, []);

  /* APPROVE */
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

  /* REJECT */
  const handleReject = async (institute) => {
    try {
      await updateInstituteApproval(institute.id, "REJECTED", token);
      toast.success("Institute rejected");
      fetchInstitutes();
    } catch (e) {
      toast.error(e?.response?.data?.message || "Reject failed");
    }
  };

  /* DELETE */
  const handleDeleteClick = (institute) => {
    setInstituteToDelete(institute);
    setShowDeleteModal(true);
  };

  // const confirmDelete = async () => {
  //   if (!instituteToDelete) return;
  //   try {
  //     await axios.delete(
  //       `https://finearts-backend.onrender.com/api/institutes/admin/${instituteToDelete.id}`,
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );
  //     toast.success("Institute deleted successfully");
  //     fetchInstitutes();
  //     setShowDeleteModal(false);
  //     setInstituteToDelete(null);
  //   } catch (e) {
  //     toast.error(e?.response?.data?.message || "Delete failed");
  //   }
  // };

  const confirmDelete = async () => {
  if (!instituteToDelete) return;

  try {
    await axios.delete(
      `https://finearts-backend.onrender.com/api/institutes/${instituteToDelete.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success("Institute deleted successfully");

    fetchInstitutes();

    setShowDeleteModal(false);
    setInstituteToDelete(null);

  } catch (e) {
    console.error(e);
    toast.error(
      e?.response?.data?.message || "Delete failed"
    );
  }
};

  return (
    <div className="p-8 text-white">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-purple-400">
          Pending Institutes
        </h1>
        <p className="text-white mt-2">
          Review and approve institute applications
        </p>
      </div>

      {/* Full-width Search Bar */}
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
                  <td colSpan={15} className="p-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                      <p className="text-white">Loading institutes...</p>
                    </div>
                  </td>
                </tr>
              ) : filteredInstitutes.length === 0 ? (
                <tr>
                  <td colSpan={15} className="p-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <FaSearch size={40} className="text-white" />
                      <p className="text-white text-lg">
                        {searchQuery
                          ? "No institutes found matching your search"
                          : "No pending institutes"}
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
                    <td className="p-4">
                      {inst.image_url ? (
                        <img
                          src={getImageUrl(inst.image_url)}
                          alt={inst.name}
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
                      {inst.name}
                    </td>
                    <td className="p-4 text-white max-w-[180px] truncate">
                      {inst.description || "-"}
                    </td>
                    <td className="p-4 text-white whitespace-nowrap">
                      {inst.email || "-"}
                    </td>
                    <td className="p-4 text-white whitespace-nowrap">
                      {inst.phone_number || "-"}
                    </td>
                    <td className="p-4 text-white whitespace-nowrap">
                      {inst.city || "-"}
                    </td>
                    <td className="p-4 text-white whitespace-nowrap">
                      {inst.state || "-"}
                    </td>
                    <td className="p-4 text-white whitespace-nowrap">
                      {inst.timing || "-"}
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <span className="text-white font-semibold">
                        {inst.rating ? ` ${inst.rating}` : "-"}
                      </span>
                    </td>
                    <td className="p-4 font-semibold whitespace-nowrap">
                      {inst.reviews ?? "-"}
                    </td>
                    <td className="p-4 font-semibold whitespace-nowrap">
                      {inst.courses ?? "-"}
                    </td>
                    <td className="p-4 text-white max-w-[130px] truncate">
                      {inst.categories?.length
                        ? inst.categories
                            .map((c) => c.category_name)
                            .filter(Boolean)
                            .join(", ")
                        : "-"}
                    </td>
                    <td className="p-4 text-white max-w-[130px] truncate">
                      {inst.categories?.length
                        ? inst.categories
                            .map((c) => c.subcategory_name)
                            .filter(Boolean)
                            .join(", ")
                        : "-"}
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-500/20 text-yellow-400">
                        {inst.approval_status || "Pending"}
                      </span>
                    </td>

                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {/* Approve */}
                        <button
                          onClick={() => handleApprove(inst)}
                          className="p-2 rounded-lg hover:bg-green-500/10 transition-colors group"
                          title="Approve"
                        >
                          <FaCheck
                            size={16}
                            className="text-green-500/70 group-hover:text-green-400 transition-colors"
                          />
                        </button>

                        {/* Reject */}
                        <button
                          onClick={() => handleReject(inst)}
                          className="p-2 rounded-lg hover:bg-red-500/10 transition-colors group"
                          title="Reject"
                        >
                          <FaBan
                            size={16}
                            className="text-red-500/70 group-hover:text-red-400 transition-colors"
                          />
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => handleDeleteClick(inst)}
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
                Delete Institute
              </h2>

              {/* Description */}
              <p className="text-white text-center text-sm leading-relaxed mb-8">
                Are you sure you want to delete{" "}
                <span className="text-white font-medium">
                  {instituteToDelete?.name}
                </span>
                ? This action cannot be undone.
              </p>

              {/* Buttons */}
              <div className="flex gap-3 w-full">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setInstituteToDelete(null);
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