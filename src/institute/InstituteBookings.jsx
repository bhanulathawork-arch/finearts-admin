// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { Search, Trash2 } from "lucide-react";
// import { FaTrash, FaTimes } from "react-icons/fa";

// import API from "../services/api";

// const PaymentBadge = ({ status }) => {
//   const s = status?.toUpperCase();
//   let bg = "bg-gray-500/20";
//   let text = "text-white";
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
//   let text = "text-white";
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

// export default function InstituteBookings() {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
  
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [bookingToDelete, setBookingToDelete] = useState(null);

//   const getConfig = () => ({
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("instituteToken")}`,
//     },
//   });

//   // --- Filtered bookings ---
//   const filteredBookings = bookings.filter((b) => {
//     const query = searchQuery.toLowerCase();
//     return (
//       String(b.id).includes(query) ||
//       (b.student_name || b.full_name || "").toLowerCase().includes(query) ||
//       b.class_title?.toLowerCase().includes(query) ||
//       b.trainer_name?.toLowerCase().includes(query) ||
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
//       const response = await API.get("/institutes/bookings", getConfig());

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
//       await API.delete(`/institutes/bookings/${bookingToDelete.id}`, getConfig());
//       toast.success("Booking deleted successfully");
//       fetchBookings();
//       setShowDeleteModal(false);
//       setBookingToDelete(null);
//     } catch (error) {
//       console.error(error);
//       toast.error(error?.response?.data?.message || "Failed to delete booking");
//     }
//   };

//   const totalColumns = 10;

//   return (
//     <div className="p-8 text-white">
//       {/* Header */}
//       <div className="mb-6">
//         <h1 className="text-4xl font-bold text-purple-400">Institute Bookings</h1>
//         <p className="text-white mt-2">
//           Manage your institute bookings
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
//             placeholder="Search by student, class, trainer, email..."
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
//                 <th className="p-4 text-left whitespace-nowrap">ID</th>
//                 <th className="p-4 text-left whitespace-nowrap">Student</th>
//                 <th className="p-4 text-left whitespace-nowrap">Class</th>
//                 <th className="p-4 text-left whitespace-nowrap">Trainer</th>
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
//                     <td className="p-4 text-white whitespace-nowrap">
//                       {booking.id}
//                     </td>
//                     <td className="p-4 text-white font-medium whitespace-nowrap">
//                       {booking.student_name || booking.full_name || "-"}
//                     </td>
//                     <td className="p-4 text-white whitespace-nowrap">
//                       {booking.class_title || "-"}
//                     </td>
//                     <td className="p-4 text-white whitespace-nowrap">
//                       {booking.trainer_name || "-"}
//                     </td>

//                     <td className="p-4 text-white whitespace-nowrap">
//                       {booking.email || "-"}
//                     </td>

//                     <td className="p-4 text-white whitespace-nowrap">
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
//               <div className="w-14 h-14 rounded-full bg-red-500/15 flex items-center justify-center mb-5">
//                 <FaTrash className="text-red-400 text-lg" />
//               </div>

//               <h2 className="text-xl font-bold text-white mb-3 text-center">
//                 Delete Booking
//               </h2>

//               <p className="text-white text-center text-sm leading-relaxed mb-8">
//                 Are you sure you want to delete booking <span className="text-white font-medium">#{bookingToDelete?.id}</span>? This action cannot be undone.
//               </p>

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


import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import {
  Search,
  Trash2,
  Eye,
  Globe,
  Smartphone,
} from "lucide-react";

import { FaTrash, FaTimes } from "react-icons/fa";

import API from "../services/api";

/* =========================================================
   PAYMENT BADGE
========================================================= */

const PaymentBadge = ({ status }) => {
  const s = String(status || "").toUpperCase();

  let bg = "bg-gray-500/20";
  let text = "text-white";

  if (
    s === "COMPLETED" ||
    s === "PAID" ||
    s === "SUCCESS"
  ) {
    bg = "bg-green-500/20";
    text = "text-green-400";
  } else if (s === "PENDING") {
    bg = "bg-yellow-500/20";
    text = "text-yellow-400";
  } else if (
    s === "FAILED" ||
    s === "CANCELLED"
  ) {
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

/* =========================================================
   STATUS BADGE
========================================================= */

const StatusBadge = ({ status }) => {
  const s = String(status || "").toUpperCase();

  let bg = "bg-gray-500/20";
  let text = "text-white";

  if (
    s === "CONFIRMED" ||
    s === "ACTIVE" ||
    s === "COMPLETED"
  ) {
    bg = "bg-green-500/20";
    text = "text-green-400";
  } else if (s === "PENDING") {
    bg = "bg-yellow-500/20";
    text = "text-yellow-400";
  } else if (
    s === "CANCELLED" ||
    s === "EXPIRED"
  ) {
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

/* =========================================================
   SOURCE NORMALIZER
========================================================= */

const normalizeSource = (booking) => {
  const source = String(
    booking?.booking_source ||
      booking?.bookingSource ||
      booking?.source ||
      "USER_APP"
  )
    .trim()
    .toUpperCase();

  if (
    source === "WEBSITE" ||
    source === "WEBSITE_PREVIEW"
  ) {
    return "WEBSITE";
  }

  return "USER_APP";
};

/* =========================================================
   SOURCE BADGE
========================================================= */

const SourceBadge = ({ source }) => {
  const normalized = String(
    source || "USER_APP"
  )
    .trim()
    .toUpperCase();

  const isWebsite =
    normalized === "WEBSITE" ||
    normalized === "WEBSITE_PREVIEW";

  if (isWebsite) {
    return (
      <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-purple-500/15 text-purple-300 border border-purple-500/20 whitespace-nowrap">
        <Globe size={12} />
        Website Preview
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-500/15 text-blue-300 border border-blue-500/20 whitespace-nowrap">
      <Smartphone size={12} />
      User Application
    </span>
  );
};

/* =========================================================
   MODE NORMALIZER
========================================================= */

const normalizeMode = (booking) => {
  const mode = String(
    booking?.booking_mode ||
      booking?.bookingMode ||
      "ONLINE"
  )
    .trim()
    .toUpperCase();

  /*
   * ONLINE is the default.
   *
   * Only an explicit OFFLINE value
   * should be displayed as Offline.
   */
  if (mode === "OFFLINE") {
    return "OFFLINE";
  }

  return "ONLINE";
};

/* =========================================================
   MODE BADGE
========================================================= */

const ModeBadge = ({ mode }) => {
  const normalized = String(
    mode || "ONLINE"
  )
    .trim()
    .toUpperCase();

  const isOnline =
    normalized !== "OFFLINE";

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap ${
        isOnline
          ? "bg-green-500/15 text-green-300 border border-green-500/20"
          : "bg-orange-500/15 text-orange-300 border border-orange-500/20"
      }`}
    >
      <span
        className={`w-2 h-2 rounded-full ${
          isOnline
            ? "bg-green-400"
            : "bg-orange-400"
        }`}
      />

      {isOnline
        ? "Online"
        : "Offline"}
    </span>
  );
};

/* =========================================================
   FORMAT DATE
========================================================= */

const formatDate = (value) => {
  if (!value) {
    return "-";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return date.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
};

/* =========================================================
   DETAIL ROW
========================================================= */

const DetailRow = ({
  label,
  value,
}) => {
  return (
    <div className="flex items-start justify-between gap-6 py-2.5 border-b border-[#2c2c35] last:border-b-0">
      <span className="text-sm text-gray-400">
        {label}
      </span>

      <span className="text-sm text-white font-medium text-right break-all">
        {value !== undefined &&
        value !== null &&
        String(value).trim() !== ""
          ? value
          : "-"}
      </span>
    </div>
  );
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function InstituteBookings() {
  /* =======================================================
     BOOKINGS
  ======================================================= */

  const [bookings, setBookings] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  /* =======================================================
     SEARCH
  ======================================================= */

  const [searchQuery, setSearchQuery] =
    useState("");

  /* =======================================================
     SOURCE FILTER
  ======================================================= */

  const [sourceFilter, setSourceFilter] =
    useState("ALL");

  /* =======================================================
     DETAILS MODAL
  ======================================================= */

  const [
    selectedBooking,
    setSelectedBooking,
  ] = useState(null);

  const [
    showDetailsModal,
    setShowDetailsModal,
  ] = useState(false);

  /* =======================================================
     DELETE MODAL
  ======================================================= */

  const [
    showDeleteModal,
    setShowDeleteModal,
  ] = useState(false);

  const [
    bookingToDelete,
    setBookingToDelete,
  ] = useState(null);

  /* =======================================================
     AUTH
  ======================================================= */

  const getConfig = () => {
    const token =
      localStorage.getItem(
        "instituteToken"
      ) ||
      localStorage.getItem(
        "token"
      );

    if (!token) {
      throw new Error(
        "Institute authentication token missing"
      );
    }

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  /* =======================================================
     FETCH BOOKINGS
  ======================================================= */

  const fetchBookings =
    async () => {
      try {
        setLoading(true);

        const response =
          await API.get(
            "/institutes/bookings",
            getConfig()
          );

        const data =
          response?.data?.data ||
          response?.data ||
          [];

        setBookings(
          Array.isArray(data)
            ? data
            : []
        );
      } catch (error) {
        console.error(
          "Fetch institute bookings error:",
          error
        );

        toast.error(
          error?.response?.data
            ?.message ||
            error?.message ||
            "Failed to fetch bookings"
        );

        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchBookings();
  }, []);

  /* =======================================================
     COUNTS
  ======================================================= */

  const counts =
    useMemo(() => {
      let userApp = 0;
      let website = 0;

      bookings.forEach(
        (booking) => {
          const source =
            normalizeSource(
              booking
            );

          if (
            source === "WEBSITE"
          ) {
            website++;
          } else {
            userApp++;
          }
        }
      );

      return {
        all: bookings.length,
        userApp,
        website,
      };
    }, [bookings]);

  /* =======================================================
     FILTERED BOOKINGS
  ======================================================= */

  const filteredBookings =
    useMemo(() => {
      const query =
        searchQuery
          .trim()
          .toLowerCase();

      return bookings.filter(
        (booking) => {
          /* ---------------------------------------------
             SOURCE FILTER
          --------------------------------------------- */

          const source =
            normalizeSource(
              booking
            );

          if (
            sourceFilter !==
              "ALL" &&
            source !==
              sourceFilter
          ) {
            return false;
          }

          /* ---------------------------------------------
             SEARCH
          --------------------------------------------- */

          if (!query) {
            return true;
          }

          const searchable = [
            booking.id,

            booking.user_id,

            booking.student_name,

            booking.full_name,

            booking.student?.name,

            booking.student?.email,

            booking.class_title,

            booking.class_name,

            booking.trainer_name,

            booking.institute_name,

            booking.email,

            booking.student_email,

            booking.phone_number,

            booking.student_phone,

            booking.amount,

            booking.payment_status,

            booking.status,

            booking.booking_type,

            booking.booking_source,

            booking.booking_mode,

            booking.bookingMode,
          ]
            .filter(
              (value) =>
                value !==
                  undefined &&
                value !== null
            )
            .join(" ")
            .toLowerCase();

          return searchable.includes(
            query
          );
        }
      );
    }, [
      bookings,
      searchQuery,
      sourceFilter,
    ]);

  /* =======================================================
     VIEW DETAILS
  ======================================================= */

  const handleViewDetails =
    (booking) => {
      setSelectedBooking(
        booking
      );

      setShowDetailsModal(
        true
      );
    };

  const closeDetails = () => {
    setShowDetailsModal(
      false
    );

    setTimeout(() => {
      setSelectedBooking(
        null
      );
    }, 200);
  };

  /* =======================================================
     DELETE CLICK
  ======================================================= */

  const handleDeleteClick =
    (booking) => {
      setBookingToDelete(
        booking
      );

      setShowDeleteModal(
        true
      );
    };

  /* =======================================================
     DELETE BOOKING
  ======================================================= */

  const confirmDelete =
    async () => {
      if (
        !bookingToDelete
      ) {
        return;
      }

      try {
        /*
         * NOTE:
         * This endpoint must exist on the backend:
         *
         * DELETE
         * /api/institutes/bookings/:id
         */

        await API.delete(
          `/institutes/bookings/${bookingToDelete.id}`,
          getConfig()
        );

        toast.success(
          "Booking deleted successfully"
        );

        setShowDeleteModal(
          false
        );

        setBookingToDelete(
          null
        );

        await fetchBookings();
      } catch (error) {
        console.error(
          "Delete booking error:",
          error
        );

        toast.error(
          error?.response?.data
            ?.message ||
            error?.message ||
            "Failed to delete booking"
        );
      }
    };

  /* =======================================================
     CLEAR SEARCH
  ======================================================= */

  const clearSearch = () => {
    setSearchQuery("");
  };

  /* =======================================================
     TABLE COLUMNS
  ======================================================= */

  const totalColumns = 12;

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="p-8 text-white">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="mb-6">

        <h1 className="text-4xl font-bold text-purple-400">
          Institute Bookings
        </h1>

        <p className="text-white mt-2">
          Manage bookings from your
          User Application and Website
          Preview.
        </p>

      </div>

      {/* =================================================
          SOURCE FILTER BUTTONS
      ================================================= */}

      <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-3">

        {/* ALL */}

        <button
          type="button"
          onClick={() =>
            setSourceFilter(
              "ALL"
            )
          }
          className={`rounded-xl border px-5 py-4 text-left transition-all ${
            sourceFilter ===
            "ALL"
              ? "border-purple-500 bg-purple-500/15"
              : "border-[#2c2c35] bg-[#151519] hover:border-purple-500/40"
          }`}
        >
          <div className="flex items-center justify-between">

            <span className="text-sm font-semibold text-white">
              All Bookings
            </span>

            <span className="text-lg font-bold text-purple-400">
              {counts.all}
            </span>

          </div>

          <p className="text-xs text-gray-500 mt-1">
            User App + Website
          </p>
        </button>

        {/* USER APP */}

        <button
          type="button"
          onClick={() =>
            setSourceFilter(
              "USER_APP"
            )
          }
          className={`rounded-xl border px-5 py-4 text-left transition-all ${
            sourceFilter ===
            "USER_APP"
              ? "border-blue-500 bg-blue-500/15"
              : "border-[#2c2c35] bg-[#151519] hover:border-blue-500/40"
          }`}
        >
          <div className="flex items-center justify-between">

            <span className="flex items-center gap-2 text-sm font-semibold text-white">
              <Smartphone
                size={15}
              />

              User Application
            </span>

            <span className="text-lg font-bold text-blue-400">
              {counts.userApp}
            </span>

          </div>

          <p className="text-xs text-gray-500 mt-1">
            Bookings from User App
          </p>
        </button>

        {/* WEBSITE */}

        <button
          type="button"
          onClick={() =>
            setSourceFilter(
              "WEBSITE"
            )
          }
          className={`rounded-xl border px-5 py-4 text-left transition-all ${
            sourceFilter ===
            "WEBSITE"
              ? "border-purple-500 bg-purple-500/15"
              : "border-[#2c2c35] bg-[#151519] hover:border-purple-500/40"
          }`}
        >
          <div className="flex items-center justify-between">

            <span className="flex items-center gap-2 text-sm font-semibold text-white">
              <Globe
                size={15}
              />

              Website Preview
            </span>

            <span className="text-lg font-bold text-purple-400">
              {counts.website}
            </span>

          </div>

          <p className="text-xs text-gray-500 mt-1">
            Bookings from Institute
            Website
          </p>
        </button>

      </div>

      {/* =================================================
          ACTIVE FILTER
      ================================================= */}

      <div className="mb-4 flex flex-wrap items-center gap-2">

        <span className="text-sm text-gray-400">
          Showing:
        </span>

        <span className="px-3 py-1.5 rounded-full bg-[#202027] border border-[#2c2c35] text-sm text-white">
          {sourceFilter ===
          "ALL"
            ? "All Bookings"
            : sourceFilter ===
              "USER_APP"
            ? "User Application"
            : "Website Preview"}
        </span>

        <span className="text-sm text-gray-500">
          ({filteredBookings.length})
        </span>

      </div>

      {/* =================================================
          SEARCH
      ================================================= */}

      <div className="mb-6">

        <div className="relative w-full">

          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white pointer-events-none"
            size={18}
          />

          <input
            type="text"
            placeholder="Search by student, class, trainer, email..."
            value={
              searchQuery
            }
            onChange={(e) =>
              setSearchQuery(
                e.target.value
              )
            }
            className="w-full pl-12 pr-10 py-3.5 rounded-xl bg-[#151519] border border-[#2c2c35] text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/60 transition-colors text-sm"
          />

          {searchQuery && (
            <button
              type="button"
              onClick={
                clearSearch
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <FaTimes
                size={14}
              />
            </button>
          )}

        </div>

      </div>

      {/* =================================================
          TABLE
      ================================================= */}

      <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-[#202027] text-white">

              <tr>

                <th className="p-4 text-left whitespace-nowrap">
                  ID
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Student
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Class
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Trainer
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Amount
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Payment
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Status
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Source
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Mode
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Booking Date
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Details
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {/* LOADING */}

              {loading ? (
                <tr>

                  <td
                    colSpan={
                      totalColumns
                    }
                    className="p-12 text-center"
                  >

                    <div className="flex flex-col items-center gap-3">

                      <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />

                      <p className="text-gray-500">
                        Loading bookings...
                      </p>

                    </div>

                  </td>

                </tr>
              ) : filteredBookings.length ===
                0 ? (

                /* EMPTY */

                <tr>

                  <td
                    colSpan={
                      totalColumns
                    }
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
                          type="button"
                          onClick={
                            clearSearch
                          }
                          className="text-purple-400 hover:text-purple-300 text-sm mt-1"
                        >
                          Clear search
                        </button>
                      )}

                    </div>

                  </td>

                </tr>
              ) : (

                /* BOOKINGS */

                filteredBookings.map(
                  (booking) => (
                    <tr
                      key={
                        booking.id
                      }
                      className="border-t border-[#2c2c35] hover:bg-[#1a1a20] transition-colors"
                    >

                      {/* ID */}

                      <td className="p-4 text-white whitespace-nowrap">
                        #
                        {
                          booking.id
                        }
                      </td>

                      {/* STUDENT */}

                      <td className="p-4 text-white font-medium whitespace-nowrap">
                        {
                          booking.student_name ||
                          booking.full_name ||
                          booking.student?.name ||
                          booking.student_email ||
                          "-"
                        }
                      </td>

                      {/* CLASS */}

                      <td className="p-4 text-white whitespace-nowrap">
                        {
                          booking.class_title ||
                          booking.class_name ||
                          "-"
                        }
                      </td>

                      {/* TRAINER */}

                      <td className="p-4 text-white whitespace-nowrap">
                        {
                          booking.trainer_name ||
                          "-"
                        }
                      </td>

                      {/* AMOUNT */}

                      <td className="p-4 font-semibold whitespace-nowrap">
                        ₹
                        {Number(
                          booking.amount ||
                            0
                        ).toLocaleString(
                          "en-IN"
                        )}
                      </td>

                      {/* PAYMENT */}

                      <td className="p-4 whitespace-nowrap">

                        <PaymentBadge
                          status={
                            booking.payment_status
                          }
                        />

                      </td>

                      {/* STATUS */}

                      <td className="p-4 whitespace-nowrap">

                        <StatusBadge
                          status={
                            booking.status
                          }
                        />

                      </td>

                      {/* SOURCE */}

                      <td className="p-4 whitespace-nowrap">

                        <SourceBadge
                          source={
                            booking.booking_source ||
                            booking.bookingSource
                          }
                        />

                      </td>

                      {/* MODE */}

                      <td className="p-4 whitespace-nowrap">

                        <ModeBadge
                          mode={normalizeMode(
                            booking
                          )}
                        />

                      </td>

                      {/* BOOKING DATE */}

                      <td className="p-4 text-gray-300 whitespace-nowrap">
                        {formatDate(
                          booking.created_at
                        )}
                      </td>

                      {/* DETAILS */}

                      <td className="p-4 whitespace-nowrap">

                        <button
                          type="button"
                          onClick={() =>
                            handleViewDetails(
                              booking
                            )
                          }
                          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/20 hover:bg-purple-500/20 transition"
                        >

                          <Eye
                            size={15}
                          />

                          View

                        </button>

                      </td>

                      {/* DELETE */}

                      <td className="p-4 whitespace-nowrap">

                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteClick(
                              booking
                            )
                          }
                          className="p-2 rounded-lg hover:bg-red-500/10 transition-colors group"
                          title="Delete"
                        >

                          <Trash2
                            size={16}
                            className="text-red-500/70 group-hover:text-red-400 transition-colors"
                          />

                        </button>

                      </td>

                    </tr>
                  )
                )
              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* =================================================
          BOOKING DETAILS MODAL
      ================================================= */}

      {showDetailsModal &&
        selectedBooking && (
          <div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={(e) => {
              if (
                e.target ===
                e.currentTarget
              ) {
                closeDetails();
              }
            }}
          >

            <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#1e1b2e] border border-[#2e2a42] rounded-2xl shadow-2xl">

              {/* HEADER */}

              <div className="flex items-center justify-between p-6 border-b border-[#2e2a42]">

                <div>

                  <h2 className="text-2xl font-bold text-white">
                    Booking Details
                  </h2>

                  <p className="text-sm text-gray-400 mt-1">
                    Booking #
                    {
                      selectedBooking.id
                    }
                  </p>

                </div>

                <button
                  type="button"
                  onClick={
                    closeDetails
                  }
                  className="w-9 h-9 rounded-full bg-[#2a2640] hover:bg-[#352f4e] flex items-center justify-center text-gray-300 hover:text-white"
                >
                  <FaTimes />
                </button>

              </div>

              {/* BODY */}

              <div className="p-6 space-y-6">

                {/* SOURCE + MODE */}

                <div className="rounded-xl bg-[#151519] border border-[#2c2c35] p-5">

                  <p className="text-xs uppercase tracking-wider text-gray-500 mb-3">
                    Booking Source & Mode
                  </p>

                  <div className="flex flex-wrap items-center gap-3">

                    <SourceBadge
                      source={
                        selectedBooking.booking_source ||
                        selectedBooking.bookingSource
                      }
                    />

                    <ModeBadge
                      mode={normalizeMode(
                        selectedBooking
                      )}
                    />

                  </div>

                </div>

                {/* STUDENT */}

                <div className="rounded-xl bg-[#151519] border border-[#2c2c35] p-5">

                  <h3 className="text-base font-semibold text-white mb-3">
                    Student Information
                  </h3>

                  <DetailRow
                    label="Name"
                    value={
                      selectedBooking.student_name ||
                      selectedBooking.full_name ||
                      selectedBooking.student?.name
                    }
                  />

                  <DetailRow
                    label="Email"
                    value={
                      selectedBooking.email ||
                      selectedBooking.student_email ||
                      selectedBooking.student?.email
                    }
                  />

                  <DetailRow
                    label="Phone"
                    value={
                      selectedBooking.phone_number ||
                      selectedBooking.student_phone ||
                      selectedBooking.student?.phone
                    }
                  />

                  <DetailRow
                    label="Student ID"
                    value={
                      selectedBooking.user_id
                    }
                  />

                </div>

                {/* CLASS */}

                <div className="rounded-xl bg-[#151519] border border-[#2c2c35] p-5">

                  <h3 className="text-base font-semibold text-white mb-3">
                    Class Information
                  </h3>

                  <DetailRow
                    label="Class"
                    value={
                      selectedBooking.class_title ||
                      selectedBooking.class_name
                    }
                  />

                  <DetailRow
                    label="Trainer"
                    value={
                      selectedBooking.trainer_name
                    }
                  />

                  <DetailRow
                    label="Session ID"
                    value={
                      selectedBooking.session_id
                    }
                  />

                  <DetailRow
                    label="Booking Type"
                    value={
                      selectedBooking.booking_type
                    }
                  />

                  <DetailRow
                    label="Source"
                    value={
                      normalizeSource(
                        selectedBooking
                      ) ===
                      "WEBSITE"
                        ? "Website Preview"
                        : "User Application"
                    }
                  />

                  <DetailRow
                    label="Mode"
                    value={
                      normalizeMode(
                        selectedBooking
                      ) ===
                      "ONLINE"
                        ? "Online"
                        : "Offline"
                    }
                  />

                </div>

                {/* PAYMENT */}

                <div className="rounded-xl bg-[#151519] border border-[#2c2c35] p-5">

                  <h3 className="text-base font-semibold text-white mb-3">
                    Payment Information
                  </h3>

                  <DetailRow
                    label="Amount"
                    value={`₹${Number(
                      selectedBooking.amount ||
                        0
                    ).toLocaleString(
                      "en-IN"
                    )}`}
                  />

                  <DetailRow
                    label="Payment Status"
                    value={
                      selectedBooking.payment_status
                    }
                  />

                  <DetailRow
                    label="Booking Status"
                    value={
                      selectedBooking.status
                    }
                  />

                  <DetailRow
                    label="Payment ID"
                    value={
                      selectedBooking.payment_id
                    }
                  />

                </div>

                {/* DATES */}

                <div className="rounded-xl bg-[#151519] border border-[#2c2c35] p-5">

                  <h3 className="text-base font-semibold text-white mb-3">
                    Booking Dates
                  </h3>

                  <DetailRow
                    label="Booking Date"
                    value={formatDate(
                      selectedBooking.created_at
                    )}
                  />

                  <DetailRow
                    label="Start Date"
                    value={formatDate(
                      selectedBooking.start_date
                    )}
                  />

                  <DetailRow
                    label="End Date"
                    value={formatDate(
                      selectedBooking.end_date
                    )}
                  />

                </div>

              </div>

              {/* FOOTER */}

              <div className="p-6 border-t border-[#2e2a42] flex justify-end">

                <button
                  type="button"
                  onClick={
                    closeDetails
                  }
                  className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold transition"
                >
                  Close
                </button>

              </div>

            </div>

          </div>
        )}

      {/* =================================================
          DELETE MODAL
      ================================================= */}

      {showDeleteModal &&
        bookingToDelete && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50">

            <div className="w-full max-w-[400px] bg-[#1e1b2e] border border-[#2e2a42] rounded-2xl shadow-2xl overflow-hidden">

              <div className="p-8 flex flex-col items-center">

                <div className="w-14 h-14 rounded-full bg-red-500/15 flex items-center justify-center mb-5">

                  <FaTrash className="text-red-400 text-lg" />

                </div>

                <h2 className="text-xl font-bold text-white mb-3 text-center">
                  Delete Booking
                </h2>

                <p className="text-gray-300 text-center text-sm leading-relaxed mb-8">

                  Are you sure you want
                  to delete booking{" "}

                  <span className="text-white font-medium">
                    #
                    {
                      bookingToDelete.id
                    }
                  </span>

                  ?

                  <br />

                  This action cannot be
                  undone.

                </p>

                <div className="flex gap-3 w-full">

                  <button
                    type="button"
                    onClick={() => {
                      setShowDeleteModal(
                        false
                      );

                      setBookingToDelete(
                        null
                      );
                    }}
                    className="flex-1 px-5 py-3 rounded-xl border border-[#3a3650] text-gray-300 hover:bg-[#2a2640] transition-colors font-medium text-sm"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={
                      confirmDelete
                    }
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