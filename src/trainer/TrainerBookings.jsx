

// import { useEffect, useState } from "react";
// import { getAuth } from "firebase/auth";

// const API =
//   import.meta.env.VITE_API_URL ||
//   "https://finearts-backend.onrender.com/api";

// export default function TrainerBookings() {
//   const [bookings, setBookings] = useState([]);
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   async function fetchBookings() {
//     try {
//       const auth = getAuth();
//       const token =
//         await auth.currentUser?.getIdToken(true);

//       // Updated Endpoint for Trainer
//       const res = await fetch(
//   `${API}/bookings/trainer/my-bookings`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const data = await res.json();

//       setBookings(data.data || []);
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   const filtered = bookings.filter(
//     (b) =>
//       (b.class_title || "")
//         .toLowerCase()
//         .includes(search.toLowerCase()) ||
//       (b.student_email || "")
//         .toLowerCase()
//         .includes(search.toLowerCase())
//   );

//   return (
//     <div className="space-y-6">

//       <div>
//         <h1 className="text-3xl font-bold gradient-text">
//           My Bookings
//         </h1>

//         <p className="text-white mt-2">
//           Manage bookings for your classes
//         </p>
//       </div>

//       {/* Search */}

//       <div className="glass-effect rounded-2xl p-4">
//         <input
//           type="text"
//           placeholder="Search by class or student..."
//           value={search}
//           onChange={(e) =>
//             setSearch(e.target.value)
//           }
//           className="w-full bg-transparent outline-none text-white"
//         />
//       </div>

//       {/* Table */}

//       <div className="glass-effect rounded-2xl overflow-hidden">

//         <table className="w-full">

//           <thead>
//             <tr className="bg-white/5">

//               <th className="px-6 py-5 text-left">
//                 ID
//               </th>

//               <th className="px-6 py-5 text-left">
//                 Student
//               </th>

//               <th className="px-6 py-5 text-left">
//                 Class
//               </th>

//               <th className="px-6 py-5 text-left">
//                 Amount
//               </th>

//               <th className="px-6 py-5 text-left">
//                 Payment
//               </th>

//               <th className="px-6 py-5 text-left">
//                 Status
//               </th>

//               <th className="px-6 py-5 text-left">
//                 Start Date
//               </th>

//               <th className="px-6 py-5 text-left">
//                 End Date
//               </th>

//             </tr>
//           </thead>

//           <tbody>

//             {filtered.length === 0 ? (
//               <tr>
//                 <td
//                   colSpan="8"
//                   className="text-center py-16 text-white"
//                 >
//                   No bookings found
//                 </td>
//               </tr>
//             ) : (
//               filtered.map((booking) => (
//                 <tr
//                   key={booking.id}
//                   className="border-t border-white/10 hover:bg-white/5"
//                 >

//                   <td className="px-6 py-4">
//                     #{booking.id}
//                   </td>

//                   <td className="px-6 py-4">
//                     {booking.student_email}
//                   </td>

//                   <td className="px-6 py-4 font-medium text-white">
//                     {booking.class_title}
//                   </td>

//                   <td className="px-6 py-4 text-green-400">
//                     ₹{booking.amount}
//                   </td>

//                   <td className="px-6 py-4">
//                     <span className={`px-2 py-1 rounded text-xs font-semibold ${
//                         booking.payment_status === 'PAID' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
//                     }`}>
//                         {booking.payment_status}
//                     </span>
//                   </td>

//                   <td className="px-6 py-4">
//                     {booking.status}
//                   </td>

//                   <td className="px-6 py-4">
//                     {booking.start_date
//                       ? new Date(
//                           booking.start_date
//                         ).toLocaleDateString()
//                       : "-"}
//                   </td>

//                   <td className="px-6 py-4">
//                     {booking.end_date
//                       ? new Date(
//                           booking.end_date
//                         ).toLocaleDateString()
//                       : "-"}
//                   </td>

//                 </tr>
//               ))
//             )}

//           </tbody>

//         </table>

//       </div>

//     </div>
//   );
// }


import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Search, Trash2 } from "lucide-react";
import { FaTrash, FaTimes } from "react-icons/fa";
import { getAuth } from "firebase/auth";

import API from "../services/api";

// =============================================
// PAYMENT BADGE
// =============================================
const PaymentBadge = ({ status }) => {
  const s = status?.toUpperCase();
  let bg = "bg-gray-500/20";
  let text = "text-white";
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
    <span
      className={`px-2.5 py-1 rounded-full text-xs font-semibold ${bg} ${text}`}
    >
      {status || "PENDING"}
    </span>
  );
};

// =============================================
// STATUS BADGE
// =============================================
const StatusBadge = ({ status }) => {
  const s = status?.toUpperCase();
  let bg = "bg-gray-500/20";
  let text = "text-white";
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
    <span
      className={`px-2.5 py-1 rounded-full text-xs font-semibold ${bg} ${text}`}
    >
      {status || "PENDING"}
    </span>
  );
};

// =============================================
// MAIN COMPONENT
// =============================================
export default function TrainerBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState(null);

  // =============================================
  // AUTH CONFIG (Firebase)
  // =============================================
  const getConfig = async () => {
    const auth = getAuth();
    let token = null;

    if (auth.currentUser) {
      token = await auth.currentUser.getIdToken(true);
    } else {
      token = localStorage.getItem("token");
    }

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  // =============================================
  // FILTERED BOOKINGS
  // =============================================
  const filteredBookings = bookings.filter((b) => {
    const query = searchQuery.toLowerCase();
    return (
      String(b.id).includes(query) ||
      b.class_title?.toLowerCase().includes(query) ||
      b.student_name?.toLowerCase().includes(query) ||
      b.student_email?.toLowerCase().includes(query) ||
      b.email?.toLowerCase().includes(query) ||
      b.phone_number?.includes(query) ||
      String(b.amount).includes(query) ||
      b.payment_status?.toLowerCase().includes(query) ||
      b.status?.toLowerCase().includes(query) ||
      (b.start_date
        ? new Date(b.start_date)
            .toLocaleDateString()
            .toLowerCase()
            .includes(query)
        : false) ||
      (b.end_date
        ? new Date(b.end_date)
            .toLocaleDateString()
            .toLowerCase()
            .includes(query)
        : false)
    );
  });

  // =============================================
  // FETCH BOOKINGS
  // =============================================
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const config = await getConfig();
      const response = await API.get(
        "/bookings/trainer/my-bookings",
        config
      );

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

  // =============================================
  // DELETE HANDLERS
  // =============================================
  const handleDeleteClick = (booking) => {
    setBookingToDelete(booking);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!bookingToDelete) return;
    try {
      const config = await getConfig();
      await API.delete(
        `/bookings/trainer/${bookingToDelete.id}`,
        config
      );
      toast.success("Booking deleted successfully");
      fetchBookings();
      setShowDeleteModal(false);
      setBookingToDelete(null);
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message || "Failed to delete booking"
      );
    }
  };

  const totalColumns = 9;

  // =============================================
  // JSX
  // =============================================
  return (
    <div className="p-8 text-white">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-purple-400">
          Trainer Bookings
        </h1>
        <p className="text-white mt-2">
          Manage your class bookings
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
            placeholder="Search bookings..."
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
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#202027] text-white">
              <tr>
                <th className="p-4 text-left whitespace-nowrap">ID</th>
                <th className="p-4 text-left whitespace-nowrap">Class</th>
                <th className="p-4 text-left whitespace-nowrap">Student</th>
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
                  <td
                    colSpan={totalColumns}
                    className="p-12 text-center"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                      <p className="text-gray-500">
                        Loading bookings...
                      </p>
                    </div>
                  </td>
                </tr>
              ) : filteredBookings.length === 0 ? (
                <tr>
                  <td
                    colSpan={totalColumns}
                    className="p-12 text-center"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <Search
                        size={40}
                        className="text-gray-600"
                      />
                      <p className="text-gray-500 text-lg">
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

                    <td className="p-4 font-medium whitespace-nowrap">
                      {booking.class_title || "-"}
                    </td>

                    <td className="p-4 text-white whitespace-nowrap">
                      {booking.student_name ||
                        booking.student_email ||
                        "-"}
                    </td>

                    <td className="p-4 text-white whitespace-nowrap">
                      {booking.email ||
                        booking.student_email ||
                        "-"}
                    </td>

                    <td className="p-4 text-white whitespace-nowrap">
                      {booking.phone_number || "-"}
                    </td>

                    <td className="p-4 font-semibold whitespace-nowrap">
                      ₹{booking.amount ?? 0}
                    </td>

                    <td className="p-4 whitespace-nowrap">
                      <PaymentBadge
                        status={booking.payment_status}
                      />
                    </td>

                    <td className="p-4 whitespace-nowrap">
                      <StatusBadge status={booking.status} />
                    </td>

                    <td className="p-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            handleDeleteClick(booking)
                          }
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
              <div className="w-14 h-14 rounded-full bg-red-500/15 flex items-center justify-center mb-5">
                <FaTrash className="text-red-400 text-lg" />
              </div>

              <h2 className="text-xl font-bold text-white mb-3 text-center">
                Delete Booking
              </h2>

              <p className="text-white text-center text-sm leading-relaxed mb-8">
                Are you sure you want to delete booking{" "}
                <span className="text-white font-medium">
                  #{bookingToDelete?.id}
                </span>
                ? This action cannot be undone.
              </p>

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