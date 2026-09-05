



// import { useEffect, useState } from "react";
// import { HiEye } from "react-icons/hi";

// import DataTable from "../components/ui/DataTable";
// import Button from "../components/ui/Button";
// import Badge from "../components/ui/Badge";
// import Modal from "../components/ui/Modal";

// import toast from "react-hot-toast";
// import API from "../services/api";

// export default function AdminBookings() {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [selectedBooking, setSelectedBooking] = useState(null);

//   const getConfig = () => ({
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("token")}`,
//     },
//   });

//   /* FETCH — Calls the admin endpoint to get ALL platform bookings */
//   const fetchBookings = async () => {
//     try {
//       setLoading(true);
      
//       // ✅ Changed to /bookings/admin to fetch all bookings
//       const response = await API.get(
//         "/bookings/admin/all",
//         getConfig()
//       );

//       if (response?.data?.success || response?.data?.data) {
//         setBookings(response?.data?.data || response.data || []);
//       } else {
//         setBookings([]);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to fetch bookings");
//       setBookings([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   /* COLUMNS — EXACT same layout as Institute Panel */
//   const columns = [
//     { key: "id", label: "ID" },

//     {
//       key: "class_title",
//       label: "Class",
//       render: (v) => v || "-",
//     },

//     {
//       key: "trainer_name",
//       label: "Trainer",
//       render: (v) => v || "-",
//     },

//     {
//       key: "institute_name",
//       label: "Institute",
//       render: (v) => v || "-",
//     },

//     {
//       key: "amount",
//       label: "Amount",
//       render: (v) => `₹${v || 0}`,
//     },

//     {
//       key: "payment_status",
//       label: "Payment",
//       render: (v) => (
//         <Badge variant={v || "PENDING"}>{v || "PENDING"}</Badge>
//       ),
//     },

//     {
//       key: "status",
//       label: "Status",
//       render: (v) => (
//         <Badge variant={v || "PENDING"}>{v || "PENDING"}</Badge>
//       ),
//     },

//     {
//       key: "start_date",
//       label: "Start Date",
//       render: (v) => (v ? new Date(v).toLocaleDateString() : "-"),
//     },

//     {
//       key: "end_date",
//       label: "End Date",
//       render: (v) => (v ? new Date(v).toLocaleDateString() : "-"),
//     },
//   ];

//   return (
//     <div className="space-y-6 animate-slide-up">

//       {/* HEADER */}
//       <div>
//         <h1 className="text-3xl font-bold gradient-text">
//           All Bookings
//         </h1>
//         <p className="text-gray-400 mt-1">
//           Manage all platform bookings (Institute, Trainer & Admin)
//         </p>
//       </div>

//       {/* TABLE */}
//       <DataTable
//         columns={columns}
//         data={bookings}
//         loading={loading}
//         filterable
//         actions={(row) => (
//           <div className="flex items-center gap-2">

//             {/* 👁 VIEW BUTTON */}
//             <Button
//               variant="ghost"
//               size="sm"
//               icon={HiEye}
//               onClick={() => setSelectedBooking(row)}
//             />
//           </div>
//         )}
//       />

//       {/* DETAILS MODAL */}
//       <Modal
//         isOpen={!!selectedBooking}
//         onClose={() => setSelectedBooking(null)}
//         title="Booking Details"
//       >
//         {selectedBooking && (
//           <div className="space-y-4">

//             <div>
//               <p className="text-gray-400 text-sm">Class</p>
//               <p className="font-semibold">
//                 {selectedBooking.class_title}
//               </p>
//             </div>

//             <div>
//               <p className="text-gray-400 text-sm">Trainer</p>
//               <p className="font-semibold">
//                 {selectedBooking.trainer_name}
//               </p>
//             </div>

//             <div>
//               <p className="text-gray-400 text-sm">Institute</p>
//               <p className="font-semibold">
//                 {selectedBooking.institute_name}
//               </p>
//             </div>

//             <div>
//               <p className="text-gray-400 text-sm">Amount</p>
//               <p className="font-semibold text-green-400">
//                 ₹{selectedBooking.amount}
//               </p>
//             </div>

//             <div>
//               <p className="text-gray-400 text-sm">Status</p>
//               <Badge variant={selectedBooking.status}>
//                 {selectedBooking.status}
//               </Badge>
//             </div>

//             <div>
//               <p className="text-gray-400 text-sm">Payment</p>
//               <Badge variant={selectedBooking.payment_status}>
//                 {selectedBooking.payment_status}
//               </Badge>
//             </div>

//             <div>
//               <p className="text-gray-400 text-sm">Start Date</p>
//               <p>
//                 {selectedBooking.start_date
//                   ? new Date(selectedBooking.start_date).toLocaleDateString()
//                   : "-"}
//               </p>
//             </div>

//             <div>
//               <p className="text-gray-400 text-sm">End Date</p>
//               <p>
//                 {selectedBooking.end_date
//                   ? new Date(selectedBooking.end_date).toLocaleDateString()
//                   : "-"}
//               </p>
//             </div>

//           </div>
//         )}
//       </Modal>

//     </div>
//   );
// }



// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { Search, Eye } from "lucide-react";
// import { FaTimes } from "react-icons/fa";

// import API from "../services/api";

// const PaymentBadge = ({ status }) => {
//   const s = status?.toUpperCase();
//   let bg = "bg-gray-500/20";
//   let text = "text-gray-400";
//   if (s === "COMPLETED" || s === "PAID" || s === "SUCCESS") {
//     bg = "bg-green-500/20";
//     text = "text-green-400";
//   } else if (s === "PENDING") {
//     bg = "bg-yellow-500/20";
//     text = "text-yellow-400";
//   } else if (s === "FAILED" || s === "CANCELLED") {
//     bg = "bg-red-500/20";
//     text = "text-red-400";
//   } else if (s === "REFUNDED") {
//     bg = "bg-blue-500/20";
//     text = "text-blue-400";
//   }
//   return (
//     <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${bg} ${text}`}>
//       {status || "PENDING"}
//     </span>
//   );
// };

// const StatusBadge = ({ status }) => {
//   const s = status?.toUpperCase();
//   let bg = "bg-gray-500/20";
//   let text = "text-gray-400";
//   if (s === "CONFIRMED" || s === "ACTIVE" || s === "COMPLETED") {
//     bg = "bg-green-500/20";
//     text = "text-green-400";
//   } else if (s === "PENDING") {
//     bg = "bg-yellow-500/20";
//     text = "text-yellow-400";
//   } else if (s === "CANCELLED" || s === "EXPIRED") {
//     bg = "bg-red-500/20";
//     text = "text-red-400";
//   }
//   return (
//     <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${bg} ${text}`}>
//       {status || "PENDING"}
//     </span>
//   );
// };

// export default function AdminBookings() {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedBooking, setSelectedBooking] = useState(null);

//   const getConfig = () => ({
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("token")}`,
//     },
//   });

//   // --- Filtered bookings ---
//   const filteredBookings = bookings.filter((b) => {
//     const query = searchQuery.toLowerCase();
//     return (
//       String(b.id).includes(query) ||
//       b.class_title?.toLowerCase().includes(query) ||
//       b.trainer_name?.toLowerCase().includes(query) ||
//       b.institute_name?.toLowerCase().includes(query) ||
//       String(b.amount).includes(query) ||
//       b.payment_status?.toLowerCase().includes(query) ||
//       b.status?.toLowerCase().includes(query) ||
//       (b.start_date ? new Date(b.start_date).toLocaleDateString().toLowerCase().includes(query) : false) ||
//       (b.end_date ? new Date(b.end_date).toLocaleDateString().toLowerCase().includes(query) : false)
//     );
//   });

//   // --- Fetch ---
//   const fetchBookings = async () => {
//     try {
//       setLoading(true);
//       const response = await API.get("/bookings/admin/all", getConfig());

//       if (response?.data?.success || response?.data?.data) {
//         setBookings(response?.data?.data || response.data || []);
//       } else {
//         setBookings([]);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to fetch bookings");
//       setBookings([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   return (
//     <div className="p-8 text-white">
//       {/* Header */}
//       <div className="mb-6">
//         <h1 className="text-4xl font-bold text-purple-400">All Bookings</h1>
//         <p className="text-gray-400 mt-2">
//           Manage all platform bookings (Institute, Trainer & Admin)
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
//             placeholder="Search bookings..."
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
//                 <th className="p-4 text-left whitespace-nowrap">ID</th>
//                 <th className="p-4 text-left whitespace-nowrap">Class</th>
//                 <th className="p-4 text-left whitespace-nowrap">Trainer</th>
//                 <th className="p-4 text-left whitespace-nowrap">Institute</th>
//                 <th className="p-4 text-left whitespace-nowrap">Amount</th>
//                 <th className="p-4 text-left whitespace-nowrap">Payment</th>
//                 <th className="p-4 text-left whitespace-nowrap">Status</th>
//                 <th className="p-4 text-left whitespace-nowrap">Start Date</th>
//                 <th className="p-4 text-left whitespace-nowrap">End Date</th>
//                 <th className="p-4 text-left whitespace-nowrap">Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan={10} className="p-12 text-center">
//                     <div className="flex flex-col items-center gap-3">
//                       <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
//                       <p className="text-gray-500">Loading bookings...</p>
//                     </div>
//                   </td>
//                 </tr>
//               ) : filteredBookings.length === 0 ? (
//                 <tr>
//                   <td colSpan={10} className="p-12 text-center">
//                     <div className="flex flex-col items-center gap-3">
//                       <Search size={40} className="text-gray-600" />
//                       <p className="text-gray-500 text-lg">
//                         {searchQuery
//                           ? "No bookings found matching your search"
//                           : "No bookings available"}
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
//                 filteredBookings.map((booking) => (
//                   <tr
//                     key={booking.id}
//                     className="border-t border-[#2c2c35] hover:bg-[#1a1a20] transition-colors"
//                   >
//                     <td className="p-4 text-gray-400 whitespace-nowrap">
//                       #{booking.id}
//                     </td>
//                     <td className="p-4 font-medium whitespace-nowrap">
//                       {booking.class_title || "-"}
//                     </td>
//                     <td className="p-4 text-gray-400 whitespace-nowrap">
//                       {booking.trainer_name || "-"}
//                     </td>
//                     <td className="p-4 text-gray-400 whitespace-nowrap">
//                       {booking.institute_name || "-"}
//                     </td>
//                     <td className="p-4 text-green-400 font-semibold whitespace-nowrap">
//                       ₹{booking.amount ?? 0}
//                     </td>
//                     <td className="p-4 whitespace-nowrap">
//                       <PaymentBadge status={booking.payment_status} />
//                     </td>
//                     <td className="p-4 whitespace-nowrap">
//                       <StatusBadge status={booking.status} />
//                     </td>
//                     <td className="p-4 text-gray-400 whitespace-nowrap">
//                       {booking.start_date
//                         ? new Date(booking.start_date).toLocaleDateString()
//                         : "-"}
//                     </td>
//                     <td className="p-4 text-gray-400 whitespace-nowrap">
//                       {booking.end_date
//                         ? new Date(booking.end_date).toLocaleDateString()
//                         : "-"}
//                     </td>

//                     <td className="p-4">
//                       <div className="flex items-center gap-3">
//                         <button
//                           onClick={() => setSelectedBooking(booking)}
//                           className="p-2 rounded-lg hover:bg-[#2a2a35] transition-colors group"
//                           title="View Details"
//                         >
//                           <Eye
//                             size={16}
//                             className="text-gray-400 group-hover:text-white transition-colors"
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

//       {/* ==================== View Booking Details Modal ==================== */}
//       {selectedBooking && (
//         <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50">
//           <div className="w-full max-w-[480px] bg-[#211c30] rounded-2xl overflow-hidden shadow-2xl">
//             {/* Header */}
//             <div className="flex justify-between items-center p-6 border-b border-[#3a3448]">
//               <h2 className="text-2xl font-bold text-white">Booking Details</h2>
//               <button
//                 onClick={() => setSelectedBooking(null)}
//                 className="text-gray-400 hover:text-white transition-colors"
//               >
//                 <FaTimes size={20} />
//               </button>
//             </div>

//             {/* Body */}
//             <div className="p-6 space-y-3">
//               {/* ID */}
//               <div className="flex items-center justify-between p-3 rounded-xl bg-[#2b2638]">
//                 <span className="text-sm text-gray-400">Booking ID</span>
//                 <span className="font-medium text-gray-300">#{selectedBooking.id}</span>
//               </div>

//               {/* Class */}
//               <div className="flex items-center justify-between p-3 rounded-xl bg-[#2b2638]">
//                 <span className="text-sm text-gray-400">Class</span>
//                 <span className="font-medium">{selectedBooking.class_title || "-"}</span>
//               </div>

//               {/* Trainer */}
//               <div className="flex items-center justify-between p-3 rounded-xl bg-[#2b2638]">
//                 <span className="text-sm text-gray-400">Trainer</span>
//                 <span className="font-medium">{selectedBooking.trainer_name || "-"}</span>
//               </div>

//               {/* Institute */}
//               <div className="flex items-center justify-between p-3 rounded-xl bg-[#2b2638]">
//                 <span className="text-sm text-gray-400">Institute</span>
//                 <span className="font-medium">{selectedBooking.institute_name || "-"}</span>
//               </div>

//               {/* Amount */}
//               <div className="flex items-center justify-between p-3 rounded-xl bg-[#2b2638]">
//                 <span className="text-sm text-gray-400">Amount</span>
//                 <span className="font-semibold text-green-400">
//                   ₹{selectedBooking.amount ?? 0}
//                 </span>
//               </div>

//               {/* Status */}
//               <div className="flex items-center justify-between p-3 rounded-xl bg-[#2b2638]">
//                 <span className="text-sm text-gray-400">Status</span>
//                 <StatusBadge status={selectedBooking.status} />
//               </div>

//               {/* Payment Status */}
//               <div className="flex items-center justify-between p-3 rounded-xl bg-[#2b2638]">
//                 <span className="text-sm text-gray-400">Payment</span>
//                 <PaymentBadge status={selectedBooking.payment_status} />
//               </div>

//               {/* Start Date */}
//               <div className="flex items-center justify-between p-3 rounded-xl bg-[#2b2638]">
//                 <span className="text-sm text-gray-400">Start Date</span>
//                 <span className="font-medium">
//                   {selectedBooking.start_date
//                     ? new Date(selectedBooking.start_date).toLocaleDateString()
//                     : "-"}
//                 </span>
//               </div>

//               {/* End Date */}
//               <div className="flex items-center justify-between p-3 rounded-xl bg-[#2b2638]">
//                 <span className="text-sm text-gray-400">End Date</span>
//                 <span className="font-medium">
//                   {selectedBooking.end_date
//                     ? new Date(selectedBooking.end_date).toLocaleDateString()
//                     : "-"}
//                 </span>
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
// import { Search, Trash2 } from "lucide-react";
// import { FaTrash, FaTimes } from "react-icons/fa";

// import API from "../services/api";

// const PaymentBadge = ({ status }) => {
//   const s = status?.toUpperCase();
//   let bg = "bg-gray-500/20";
//   let text = "text-gray-400";
//   if (s === "COMPLETED" || s === "PAID" || s === "SUCCESS") {
//     bg = "bg-green-500/20";
//     text = "text-green-400";
//   } else if (s === "PENDING") {
//     bg = "bg-yellow-500/20";
//     text = "text-yellow-400";
//   } else if (s === "FAILED" || s === "CANCELLED") {
//     bg = "bg-red-500/20";
//     text = "text-red-400";
//   } else if (s === "REFUNDED") {
//     bg = "bg-blue-500/20";
//     text = "text-blue-400";
//   }
//   return (
//     <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${bg} ${text}`}>
//       {status || "PENDING"}
//     </span>
//   );
// };

// const StatusBadge = ({ status }) => {
//   const s = status?.toUpperCase();
//   let bg = "bg-gray-500/20";
//   let text = "text-gray-400";
//   if (s === "CONFIRMED" || s === "ACTIVE" || s === "COMPLETED") {
//     bg = "bg-green-500/20";
//     text = "text-green-400";
//   } else if (s === "PENDING") {
//     bg = "bg-yellow-500/20";
//     text = "text-yellow-400";
//   } else if (s === "CANCELLED" || s === "EXPIRED") {
//     bg = "bg-red-500/20";
//     text = "text-red-400";
//   }
//   return (
//     <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${bg} ${text}`}>
//       {status || "PENDING"}
//     </span>
//   );
// };

// export default function AdminBookings() {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
  
//   // Delete states
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [bookingToDelete, setBookingToDelete] = useState(null);

//   const getConfig = () => ({
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("token")}`,
//     },
//   });

//   // --- Filtered bookings ---
//   const filteredBookings = bookings.filter((b) => {
//     const query = searchQuery.toLowerCase();
//     return (
//       String(b.id).includes(query) ||
//       b.class_title?.toLowerCase().includes(query) ||
//       b.trainer_name?.toLowerCase().includes(query) ||
//       b.institute_name?.toLowerCase().includes(query) ||
//       b.email?.toLowerCase().includes(query) ||
//       b.phone_number?.includes(query) ||
//       String(b.amount).includes(query) ||
//       b.payment_status?.toLowerCase().includes(query) ||
//       b.status?.toLowerCase().includes(query) ||
//       (b.start_date ? new Date(b.start_date).toLocaleDateString().toLowerCase().includes(query) : false) ||
//       (b.end_date ? new Date(b.end_date).toLocaleDateString().toLowerCase().includes(query) : false)
//     );
//   });

//   // --- Fetch ---
//   const fetchBookings = async () => {
//     try {
//       setLoading(true);
//       const response = await API.get("/bookings/admin/all", getConfig());

//       if (response?.data?.success || response?.data?.data) {
//         setBookings(response?.data?.data || response.data || []);
//       } else {
//         setBookings([]);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to fetch bookings");
//       setBookings([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   // --- Delete Handlers ---
//   const handleDeleteClick = (booking) => {
//     setBookingToDelete(booking);
//     setShowDeleteModal(true);
//   };

//   const confirmDelete = async () => {
//     if (!bookingToDelete) return;
//     try {
//       await API.delete(`/bookings/admin/${bookingToDelete.id}`, getConfig());
//       toast.success("Booking deleted successfully");
//       fetchBookings();
//       setShowDeleteModal(false);
//       setBookingToDelete(null);
//     } catch (error) {
//       console.error(error);
//       toast.error(error?.response?.data?.message || "Failed to delete booking");
//     }
//   };

//   const totalColumns = 12;

//   return (
//     <div className="p-8 text-white">
//       {/* Header */}
//       <div className="mb-6">
//         <h1 className="text-4xl font-bold text-purple-400">All Bookings</h1>
//         <p className="text-gray-400 mt-2">
//           Manage all platform bookings (Institute, Trainer & Admin)
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
//             placeholder="Search bookings..."
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

//       {/* Table - Exact same wrapper structure as Classes */}
//       <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-[#202027] text-gray-400">
//               <tr>
//                 <th className="p-4 text-left whitespace-nowrap">ID</th>
//                 <th className="p-4 text-left whitespace-nowrap">Class</th>
//                 <th className="p-4 text-left whitespace-nowrap">Trainer</th>
//                 <th className="p-4 text-left whitespace-nowrap">Institute</th>
//                 <th className="p-4 text-left whitespace-nowrap">Email</th>
//                 <th className="p-4 text-left whitespace-nowrap">Phone</th>
//                 <th className="p-4 text-left whitespace-nowrap">Amount</th>
//                 <th className="p-4 text-left whitespace-nowrap">Payment</th>
//                 <th className="p-4 text-left whitespace-nowrap">Status</th>
                
//                 <th className="p-4 text-left whitespace-nowrap">Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan={totalColumns} className="p-12 text-center">
//                     <div className="flex flex-col items-center gap-3">
//                       <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
//                       <p className="text-gray-500">Loading bookings...</p>
//                     </div>
//                   </td>
//                 </tr>
//               ) : filteredBookings.length === 0 ? (
//                 <tr>
//                   <td colSpan={totalColumns} className="p-12 text-center">
//                     <div className="flex flex-col items-center gap-3">
//                       <Search size={40} className="text-gray-600" />
//                       <p className="text-gray-500 text-lg">
//                         {searchQuery
//                           ? "No bookings found matching your search"
//                           : "No bookings available"}
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
//                 filteredBookings.map((booking) => (
//                   <tr
//                     key={booking.id}
//                     className="border-t border-[#2c2c35] hover:bg-[#1a1a20] transition-colors"
//                   >
//                     <td className="p-4 text-gray-400 whitespace-nowrap">
//                       {booking.id}
//                     </td>
//                     <td className="p-4 font-medium whitespace-nowrap">
//                       {booking.class_title || "-"}
//                     </td>
//                     <td className="p-4 text-gray-400 whitespace-nowrap">
//                       {booking.trainer_name || "-"}
//                     </td>
//                     <td className="p-4 text-gray-400 whitespace-nowrap">
//                       {booking.institute_name || "-"}
//                     </td>

//                     {/* Email Column */}
//                     <td className="p-4 text-gray-400 whitespace-nowrap">
//                       {booking.email || "-"}
//                     </td>

//                     {/* Phone Column */}
//                     <td className="p-4 text-gray-400 whitespace-nowrap">
//                       {booking.phone_number || "-"}
//                     </td>

//                     <td className="p-4 font-semibold whitespace-nowrap">
//                       ₹{booking.amount ?? 0}
//                     </td>
//                     <td className="p-4 whitespace-nowrap">
//                       <PaymentBadge status={booking.payment_status} />
//                     </td>
//                     <td className="p-4 whitespace-nowrap">
//                       <StatusBadge status={booking.status} />
//                     </td>
                 

//                     {/* Actions */}
//                     <td className="p-4 whitespace-nowrap">
//                       <div className="flex items-center gap-2">
//                         <button
//                           onClick={() => handleDeleteClick(booking)}
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

//       {/* ==================== Delete Confirmation Modal ==================== */}
//       {showDeleteModal && (
//         <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50">
//           <div className="w-full max-w-[400px] bg-[#1e1b2e] border border-[#2e2a42] rounded-2xl shadow-2xl overflow-hidden">
//             <div className="p-8 flex flex-col items-center">
//               {/* Trash Icon */}
//               <div className="w-14 h-14 rounded-full bg-red-500/15 flex items-center justify-center mb-5">
//                 <FaTrash className="text-red-400 text-lg" />
//               </div>

//               <h2 className="text-xl font-bold text-white mb-3 text-center">
//                 Delete Booking
//               </h2>

//               <p className="text-gray-400 text-center text-sm leading-relaxed mb-8">
//                 Are you sure you want to delete booking <span className="text-white font-medium">#{bookingToDelete?.id}</span>? This action cannot be undone.
//               </p>

//               {/* Buttons */}
//               <div className="flex gap-3 w-full">
//                 <button
//                   onClick={() => {
//                     setShowDeleteModal(false);
//                     setBookingToDelete(null);
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
import { Search, Trash2 } from "lucide-react";
import { FaTrash, FaTimes } from "react-icons/fa";

import API from "../services/api";

const PaymentBadge = ({ status }) => {
  const s = status?.toUpperCase();
  let bg = "bg-gray-500/20";
  let text = "text-gray-400";
  if (s === "COMPLETED" || s === "PAID" || s === "SUCCESS") {
    bg = "bg-green-500/20";
    text = "text-green-400";
  } else if (s === "PENDING") {
    bg = "bg-yellow-500/20";
    text = "text-yellow-400";
  } else if (s === "FAILED" || s === "CANCELLED") {
    bg = "bg-red-500/20";
    text = "text-red-400";
  } else if (s === "REFUNDED") {
    bg = "bg-blue-500/20";
    text = "text-blue-400";
  }
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${bg} ${text}`}>
      {status || "PENDING"}
    </span>
  );
};

const StatusBadge = ({ status }) => {
  const s = status?.toUpperCase();
  let bg = "bg-gray-500/20";
  let text = "text-gray-400";
  if (s === "CONFIRMED" || s === "ACTIVE" || s === "COMPLETED") {
    bg = "bg-green-500/20";
    text = "text-green-400";
  } else if (s === "PENDING") {
    bg = "bg-yellow-500/20";
    text = "text-yellow-400";
  } else if (s === "CANCELLED" || s === "EXPIRED") {
    bg = "bg-red-500/20";
    text = "text-red-400";
  }
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${bg} ${text}`}>
      {status || "PENDING"}
    </span>
  );
};

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Delete states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState(null);

  const getConfig = () => ({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  // --- Filtered bookings ---
  const filteredBookings = bookings.filter((b) => {
    const query = searchQuery.toLowerCase();
    return (
      String(b.id).includes(query) ||
      (b.student?.name || "").toLowerCase().includes(query) ||
      (b.class || "").toLowerCase().includes(query) ||
      (b.trainer || "").toLowerCase().includes(query) ||
      (b.institute || "").toLowerCase().includes(query) ||
      (b.student?.email || "").toLowerCase().includes(query) ||
      (b.student?.phone || "").includes(query) ||
      String(b.amount).includes(query) ||
      (b.paymentStatus || "").toLowerCase().includes(query) ||
      (b.status || "").toLowerCase().includes(query) ||
      (b.start_date ? new Date(b.start_date).toLocaleDateString().toLowerCase().includes(query) : false) ||
      (b.end_date ? new Date(b.end_date).toLocaleDateString().toLowerCase().includes(query) : false)
    );
  });

  // --- Fetch ---
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await API.get("/bookings/admin/all", getConfig());

      if (response?.data?.success || response?.data?.data) {
        setBookings(response?.data?.data || response.data || []);
      } else {
        setBookings([]);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch bookings");
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // --- Delete Handlers ---
  const handleDeleteClick = (booking) => {
    setBookingToDelete(booking);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!bookingToDelete) return;
    try {
      await API.delete(`/bookings/admin/${bookingToDelete.id}`, getConfig());
      toast.success("Booking deleted successfully");
      fetchBookings();
      setShowDeleteModal(false);
      setBookingToDelete(null);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to delete booking");
    }
  };

  const totalColumns = 11;

  return (
    <div className="p-8 text-white">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-purple-400">All Bookings</h1>
        <p className="text-white mt-2">
          Manage all platform bookings (Institute, Trainer & Admin)
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
            placeholder="Search by student, class, trainer, institute..."
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

      {/* Table - Exact same wrapper structure as Classes */}
      <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#202027] text-white">
              <tr>
                <th className="p-4 text-left whitespace-nowrap">ID</th>
                <th className="p-4 text-left whitespace-nowrap">Student</th>
                <th className="p-4 text-left whitespace-nowrap">Class</th>
                <th className="p-4 text-left whitespace-nowrap">Trainer</th>
                <th className="p-4 text-left whitespace-nowrap">Institute</th>
                <th className="p-4 text-left whitespace-nowrap">Email</th>
                <th className="p-4 text-left whitespace-nowrap">Phone</th>
                <th className="p-4 text-left whitespace-nowrap">Amount</th>
                <th className="p-4 text-left whitespace-nowrap">Payment</th>
                <th className="p-4 text-left whitespace-nowrap">Status</th>
                <th className="p-4 text-left whitespace-nowrap">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={totalColumns} className="p-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                      <p className="text-white">Loading bookings...</p>
                    </div>
                  </td>
                </tr>
              ) : filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={totalColumns} className="p-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <Search size={40} className="text-white" />
                      <p className="text-white text-lg">
                        {searchQuery
                          ? "No bookings found matching your search"
                          : "No bookings available"}
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
                filteredBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="border-t border-[#2c2c35] hover:bg-[#1a1a20] transition-colors"
                  >
                    <td className="p-4 text-white whitespace-nowrap">
                      {booking.id}
                    </td>
                    <td className="p-4 text-white font-medium whitespace-nowrap">
                      {booking.student?.name || "-"}
                    </td>
                    <td className="p-4 font-medium whitespace-nowrap">
                      {booking.class || "-"}
                    </td>
                    <td className="p-4 text-white whitespace-nowrap">
                      {booking.trainer || "-"}
                    </td>
                    <td className="p-4 text-white whitespace-nowrap">
                      {booking.institute || "-"}
                    </td>

                    {/* Email Column */}
                    <td className="p-4 text-white whitespace-nowrap">
                      {booking.student?.email || "-"}
                    </td>

                    {/* Phone Column */}
                    <td className="p-4 text-white whitespace-nowrap">
                      {booking.student?.phone || "-"}
                    </td>

                    <td className="p-4 font-semibold whitespace-nowrap">
                      ₹{booking.amount ?? 0}
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <PaymentBadge status={booking.paymentStatus} />
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <StatusBadge status={booking.status} />
                    </td>

                    {/* Actions */}
                    <td className="p-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDeleteClick(booking)}
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

      {/* ==================== Delete Confirmation Modal ==================== */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="w-full max-w-[400px] bg-[#1e1b2e] border border-[#2e2a42] rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-8 flex flex-col items-center">
              {/* Trash Icon */}
              <div className="w-14 h-14 rounded-full bg-red-500/15 flex items-center justify-center mb-5">
                <FaTrash className="text-red-400 text-lg" />
              </div>

              <h2 className="text-xl font-bold text-white mb-3 text-center">
                Delete Booking
              </h2>

              <p className="text-gray-400 text-center text-sm leading-relaxed mb-8">
                Are you sure you want to delete booking <span className="text-white font-medium">#{bookingToDelete?.id}</span>? This action cannot be undone.
              </p>

              {/* Buttons */}
              <div className="flex gap-3 w-full">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setBookingToDelete(null);
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