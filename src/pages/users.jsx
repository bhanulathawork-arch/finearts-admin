
// import { useEffect, useState } from "react";

// import { HiEye } from "react-icons/hi";

// import DataTable from "../components/ui/DataTable";
// import Button from "../components/ui/Button";
// import Badge from "../components/ui/Badge";
// import Modal from "../components/ui/Modal";

// import toast from "react-hot-toast";

// import { getAllUsers } from "../services/userService";

// export default function Users() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [viewingUser, setViewingUser] = useState(null);

//   /* FETCH USERS */
//   const fetchUsers = async () => {
//     try {
//       setLoading(true);

//       const response = await getAllUsers();

//       setUsers(response?.data || []);
//     } catch (error) {
//       toast.error(
//         error?.response?.data?.message ||
//           error?.message ||
//           "Failed to fetch users"
//       );

//       setUsers([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   /* TABLE COLUMNS */
//   const columns = [
//     {
//       key: "full_name",
//       label: "Name",
//       render: (value) => (
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center">
//             <span className="text-white font-bold text-sm">
//               {value?.charAt(0)?.toUpperCase() || "U"}
//             </span>
//           </div>

//           <span className="font-medium">{value || "N/A"}</span>
//         </div>
//       ),
//     },

//     {
//       key: "email",
//       label: "Email",
//     },

//     {
//       key: "phone_number",
//       label: "Phone",
//       render: (value) => value || "-",
//     },

//     {
//       key: "role",
//       label: "Role",
//       render: (value) => <Badge variant="purple">{value || "USER"}</Badge>,
//     },

//     {
//       key: "is_active",
//       label: "Status",
//       render: (value) => (
//         <Badge variant={value ? "active" : "blocked"}>
//           {value ? "Active" : "Blocked"}
//         </Badge>
//       ),
//     },
//   ];

//   return (
//     <div className="space-y-6 animate-slide-up">
//       {/* HEADER */}
//       <div>
//         <h1 className="text-3xl font-bold gradient-text">Users</h1>
//         <p className="text-gray-400 mt-1">
//           Manage all registered users
//         </p>
//       </div>

//       {/* TABLE (ONLY PROFILE ACTION) */}
//       <DataTable
//         columns={columns}
//         data={users}
//         loading={loading}
//         filterable
//         actions={(row) => (
//           <div className="flex gap-2">
//             <Button
//               variant="ghost"
//               size="sm"
//               icon={HiEye}
//               onClick={() => setViewingUser(row)}
//             />
//           </div>
//         )}
//       />

//       {/* MODAL */}
//       <Modal
//         isOpen={!!viewingUser}
//         onClose={() => setViewingUser(null)}
//         title="User Details"
//       >
//         {viewingUser && (
//           <div className="space-y-4">
//             <div className="glass-effect rounded-xl p-4">
//               <p className="text-sm text-gray-400">Name</p>
//               <p className="font-medium">
//                 {viewingUser.full_name || "N/A"}
//               </p>
//             </div>

//             <div className="glass-effect rounded-xl p-4">
//               <p className="text-sm text-gray-400">Email</p>
//               <p className="font-medium">{viewingUser.email}</p>
//             </div>

//             <div className="glass-effect rounded-xl p-4">
//               <p className="text-sm text-gray-400">Phone</p>
//               <p className="font-medium">
//                 {viewingUser.phone_number || "-"}
//               </p>
//             </div>

//             <div className="glass-effect rounded-xl p-4">
//               <p className="text-sm text-gray-400">Role</p>
//               <Badge variant="purple">{viewingUser.role}</Badge>
//             </div>

//             <div className="glass-effect rounded-xl p-4">
//               <p className="text-sm text-gray-400">Status</p>
//               <Badge variant={viewingUser.is_active ? "active" : "blocked"}>
//                 {viewingUser.is_active ? "Active" : "Blocked"}
//               </Badge>
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

// import { getAllUsers } from "../services/userService";

// export default function Users() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [viewingUser, setViewingUser] = useState(null);

//   // --- Filtered users ---
//   const filteredUsers = users.filter((u) => {
//     const query = searchQuery.toLowerCase();
//     return (
//       u.full_name?.toLowerCase().includes(query) ||
//       u.email?.toLowerCase().includes(query) ||
//       u.phone_number?.includes(query) ||
//       u.role?.toLowerCase().includes(query) ||
//       (u.is_active ? "active" : "blocked").includes(query) ||
//       String(u.id).includes(query)
//     );
//   });

//   // --- Fetch ---
//   const fetchUsers = async () => {
//     try {
//       setLoading(true);
//       const response = await getAllUsers();
//       setUsers(response?.data || []);
//     } catch (error) {
//       toast.error(
//         error?.response?.data?.message || error?.message || "Failed to fetch users"
//       );
//       setUsers([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   return (
//     <div className="p-8 text-white">
//       {/* Header */}
//       <div className="mb-6">
//         <h1 className="text-4xl font-bold text-purple-400">Users</h1>
//         <p className="text-gray-400 mt-2">Manage all registered users</p>
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
//             placeholder="Search users..."
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
//                 <th className="p-4 text-left whitespace-nowrap">Name</th>
//                 <th className="p-4 text-left whitespace-nowrap">Email</th>
//                 <th className="p-4 text-left whitespace-nowrap">Phone</th>
//                 <th className="p-4 text-left whitespace-nowrap">Role</th>
//                 <th className="p-4 text-left whitespace-nowrap">Status</th>
//                 <th className="p-4 text-left whitespace-nowrap">Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan={6} className="p-12 text-center">
//                     <div className="flex flex-col items-center gap-3">
//                       <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
//                       <p className="text-gray-500">Loading users...</p>
//                     </div>
//                   </td>
//                 </tr>
//               ) : filteredUsers.length === 0 ? (
//                 <tr>
//                   <td colSpan={6} className="p-12 text-center">
//                     <div className="flex flex-col items-center gap-3">
//                       <Search size={40} className="text-gray-600" />
//                       <p className="text-gray-500 text-lg">
//                         {searchQuery
//                           ? "No users found matching your search"
//                           : "No users available"}
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
//                 filteredUsers.map((user) => (
//                   <tr
//                     key={user.id}
//                     className="border-t border-[#2c2c35] hover:bg-[#1a1a20] transition-colors"
//                   >
//                     <td className="p-4">
//                       <div className="flex items-center gap-3">
//                         <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
//                           <span className="text-white font-bold text-sm">
//                             {user.full_name?.charAt(0)?.toUpperCase() || "U"}
//                           </span>
//                         </div>
//                         <span className="font-medium whitespace-nowrap">
//                           {user.full_name || "N/A"}
//                         </span>
//                       </div>
//                     </td>

//                     <td className="p-4 text-gray-400 whitespace-nowrap">
//                       {user.email || "-"}
//                     </td>
//                     <td className="p-4 text-gray-400 whitespace-nowrap">
//                       {user.phone_number || "-"}
//                     </td>

//                     <td className="p-4 whitespace-nowrap">
//                       <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300">
//                         {user.role || "USER"}
//                       </span>
//                     </td>

//                     <td className="p-4 whitespace-nowrap">
//                       {user.is_active ? (
//                         <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400">
//                           Active
//                         </span>
//                       ) : (
//                         <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-red-500/20 text-red-400">
//                           Blocked
//                         </span>
//                       )}
//                     </td>

//                     <td className="p-4">
//                       <div className="flex items-center gap-3">
//                         <button
//                           onClick={() => setViewingUser(user)}
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

//       {/* ==================== View User Details Modal ==================== */}
//       {viewingUser && (
//         <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50">
//           <div className="w-full max-w-[480px] bg-[#211c30] rounded-2xl overflow-hidden shadow-2xl">
//             {/* Header */}
//             <div className="flex justify-between items-center p-6 border-b border-[#3a3448]">
//               <h2 className="text-2xl font-bold text-white">User Details</h2>
//               <button
//                 onClick={() => setViewingUser(null)}
//                 className="text-gray-400 hover:text-white transition-colors"
//               >
//                 <FaTimes size={20} />
//               </button>
//             </div>

//             {/* Body */}
//             <div className="p-6 space-y-4">
//               {/* Avatar & Name */}
//               <div className="flex items-center gap-4 pb-4 border-b border-[#3a3448]">
//                 <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
//                   <span className="text-white font-bold text-2xl">
//                     {viewingUser.full_name?.charAt(0)?.toUpperCase() || "U"}
//                   </span>
//                 </div>
//                 <div>
//                   <p className="text-lg font-semibold text-white">
//                     {viewingUser.full_name || "N/A"}
//                   </p>
//                   <p className="text-gray-400 text-sm">{viewingUser.email}</p>
//                 </div>
//               </div>

//               {/* Detail Rows */}
//               <div className="space-y-3">
//                 <div className="flex items-center justify-between p-3 rounded-xl bg-[#2b2638]">
//                   <span className="text-sm text-gray-400">Phone</span>
//                   <span className="font-medium">
//                     {viewingUser.phone_number || "-"}
//                   </span>
//                 </div>

//                 <div className="flex items-center justify-between p-3 rounded-xl bg-[#2b2638]">
//                   <span className="text-sm text-gray-400">Role</span>
//                   <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300">
//                     {viewingUser.role || "USER"}
//                   </span>
//                 </div>

//                 <div className="flex items-center justify-between p-3 rounded-xl bg-[#2b2638]">
//                   <span className="text-sm text-gray-400">Status</span>
//                   {viewingUser.is_active ? (
//                     <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400">
//                       Active
//                     </span>
//                   ) : (
//                     <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-red-500/20 text-red-400">
//                       Blocked
//                     </span>
//                   )}
//                 </div>
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

// import { getAllUsers } from "../services/userService";
// import API from "../services/api";

// export default function Users() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
  
//   // Delete states
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [userToDelete, setUserToDelete] = useState(null);

//   const totalColumns = 6;

//   // --- Filtered users ---
//   const filteredUsers = users.filter((u) => {
//     const query = searchQuery.toLowerCase();
//     return (
//       u.full_name?.toLowerCase().includes(query) ||
//       u.email?.toLowerCase().includes(query) ||
//       u.phone_number?.includes(query) ||
//       u.role?.toLowerCase().includes(query) ||
//       (u.is_active ? "active" : "blocked").includes(query) ||
//       String(u.id).includes(query)
//     );
//   });

//   // --- Fetch ---
//   const fetchUsers = async () => {
//     try {
//       setLoading(true);
//       const response = await getAllUsers();
//       setUsers(response?.data || []);
//     } catch (error) {
//       toast.error(
//         error?.response?.data?.message || error?.message || "Failed to fetch users"
//       );
//       setUsers([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // --- Delete Handlers ---
//   const handleDeleteClick = (user) => {
//     setUserToDelete(user);
//     setShowDeleteModal(true);
//   };

//   const confirmDelete = async () => {
//     if (!userToDelete) return;
//     try {
//       await API.delete(`/users/admin/${userToDelete.id}`);
//       toast.success("User deleted successfully");
//       fetchUsers();
//       setShowDeleteModal(false);
//       setUserToDelete(null);
//     } catch (error) {
//       console.error(error);
//       toast.error(error?.response?.data?.message || "Failed to delete user");
//     }
//   };

//   return (
//     <div className="p-8 text-white">
//       {/* Header */}
//       <div className="mb-6">
//         <h1 className="text-4xl font-bold text-purple-400">Users</h1>
//         <p className="text-gray-400 mt-2">Manage all registered users</p>
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
//             placeholder="Search users..."
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
//           <table className="w-full min-w-max">
//             <thead className="bg-[#202027] text-gray-400">
//               <tr>
//                 <th className="p-4 text-left whitespace-nowrap">Name</th>
//                 <th className="p-4 text-left whitespace-nowrap">Email</th>
//                 <th className="p-4 text-left whitespace-nowrap">Phone</th>
//                 <th className="p-4 text-left whitespace-nowrap">Role</th>
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
//                       <p className="text-gray-500">Loading users...</p>
//                     </div>
//                   </td>
//                 </tr>
//               ) : filteredUsers.length === 0 ? (
//                 <tr>
//                   <td colSpan={totalColumns} className="p-12 text-center">
//                     <div className="flex flex-col items-center gap-3">
//                       <Search size={40} className="text-gray-600" />
//                       <p className="text-gray-500 text-lg">
//                         {searchQuery
//                           ? "No users found matching your search"
//                           : "No users available"}
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
//                 filteredUsers.map((user) => (
//                   <tr
//                     key={user.id}
//                     className="border-t border-[#2c2c35] hover:bg-[#1a1a20] transition-colors"
//                   >
//                     <td className="p-4 whitespace-nowrap">
//                       <div className="flex items-center gap-3">
//                         <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
//                           <span className="text-white font-bold text-sm">
//                             {user.full_name?.charAt(0)?.toUpperCase() || "U"}
//                           </span>
//                         </div>
//                         <span className="font-medium whitespace-nowrap">
//                           {user.full_name || "N/A"}
//                         </span>
//                       </div>
//                     </td>

//                     <td className="p-4 text-gray-400 whitespace-nowrap">
//                       {user.email || "-"}
//                     </td>
//                     <td className="p-4 text-gray-400 whitespace-nowrap">
//                       {user.phone_number || "-"}
//                     </td>

//                     <td className="p-4 whitespace-nowrap">
//                       <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300">
//                         {user.role || "USER"}
//                       </span>
//                     </td>

//                     <td className="p-4 whitespace-nowrap">
//                       {user.is_active ? (
//                         <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400">
//                           Active
//                         </span>
//                       ) : (
//                         <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-red-500/20 text-red-400">
//                           Blocked
//                         </span>
//                       )}
//                     </td>

//                     {/* Actions */}
//                     <td className="p-4 whitespace-nowrap">
//                       <div className="flex items-center gap-2">
//                         <button
//                           onClick={() => handleDeleteClick(user)}
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
//                 Delete User
//               </h2>

//               <p className="text-gray-400 text-center text-sm leading-relaxed mb-8">
//                 Are you sure you want to delete{" "}
//                 <span className="text-white font-medium">
//                   {userToDelete?.full_name || `User #${userToDelete?.id}`}
//                 </span>
//                 ? This action cannot be undone.
//               </p>

//               {/* Buttons */}
//               <div className="flex gap-3 w-full">
//                 <button
//                   onClick={() => {
//                     setShowDeleteModal(false);
//                     setUserToDelete(null);
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


// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { Search, Trash2 } from "lucide-react";
// import { FaTrash, FaTimes } from "react-icons/fa";

// import { getAllUsers } from "../services/userService";
// import API from "../services/api";

// export default function Users() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
  
//   // Delete states
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [userToDelete, setUserToDelete] = useState(null);

//   // Status toggle states
//   const [showStatusModal, setShowStatusModal] = useState(false);
//   const [userToToggle, setUserToToggle] = useState(null);

//   const totalColumns = 6;

//   // --- Filtered users ---
//   const filteredUsers = users.filter((u) => {
//     const query = searchQuery.toLowerCase();
//     return (
//       u.full_name?.toLowerCase().includes(query) ||
//       u.email?.toLowerCase().includes(query) ||
//       u.phone_number?.includes(query) ||
//       u.role?.toLowerCase().includes(query) ||
//       (u.is_active ? "active" : "blocked").includes(query) ||
//       String(u.id).includes(query)
//     );
//   });

//   // --- Fetch ---
//   const fetchUsers = async () => {
//     try {
//       setLoading(true);
//       const response = await getAllUsers();
//       setUsers(response?.data || []);
//     } catch (error) {
//       toast.error(
//         error?.response?.data?.message || error?.message || "Failed to fetch users"
//       );
//       setUsers([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // --- Delete Handlers ---
//   const handleDeleteClick = (user) => {
//     setUserToDelete(user);
//     setShowDeleteModal(true);
//   };

//   const confirmDelete = async () => {
//     if (!userToDelete) return;
//     try {
//       await API.delete(`/users/admin/${userToDelete.id}`);
//       toast.success("User deleted successfully");
//       fetchUsers();
//       setShowDeleteModal(false);
//       setUserToDelete(null);
//     } catch (error) {
//       console.error(error);
//       toast.error(error?.response?.data?.message || "Failed to delete user");
//     }
//   };

//   // --- Status Toggle Handlers ---
//   const handleToggleStatusClick = (user) => {
//     setUserToToggle(user);
//     setShowStatusModal(true);
//   };

//   const confirmToggleStatus = async () => {
//     if (!userToToggle) return;
//     try {
//       await API.patch(`/users/${userToToggle.id}/status`, {
//         is_active: !userToToggle.is_active,
//       });

//       toast.success(
//         `User ${
//           userToToggle.is_active ? "deactivated" : "activated"
//         } successfully`
//       );

//       fetchUsers();
//       setShowStatusModal(false);
//       setUserToToggle(null);
//     } catch (error) {
//       toast.error(
//         error?.response?.data?.message ||
//           "Failed to update user status"
//       );
//     }
//   };

//   return (
//     <div className="p-8 text-white">
//       {/* Header */}
//       <div className="mb-6">
//         <h1 className="text-4xl font-bold text-purple-400">Users</h1>
//         <p className="text-white mt-2">Manage all registered users</p>
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
//             placeholder="Search users..."
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

//       {/* Table - Exact same wrapper structure as Classes */}
//       <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full min-w-max">
//             <thead className="bg-[#202027] text-white">
//               <tr>
//                 <th className="p-4 text-left whitespace-nowrap">Name</th>
//                 <th className="p-4 text-left whitespace-nowrap">Email</th>
//                 <th className="p-4 text-left whitespace-nowrap">Phone</th>
//                 <th className="p-4 text-left whitespace-nowrap">Role</th>
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
//                       <p className="text-gray-500">Loading users...</p>
//                     </div>
//                   </td>
//                 </tr>
//               ) : filteredUsers.length === 0 ? (
//                 <tr>
//                   <td colSpan={totalColumns} className="p-12 text-center">
//                     <div className="flex flex-col items-center gap-3">
//                       <Search size={40} className="text-gray-600" />
//                       <p className="text-gray-500 text-lg">
//                         {searchQuery
//                           ? "No users found matching your search"
//                           : "No users available"}
//                       </p>
//                       {searchQuery && (
//                         <button
//                           onClick={() => setSearchQuery("")}
//                           className="text-white hover:text-purple-300 text-sm mt-1 transition-colors"
//                         >
//                           Clear search
//                         </button>
//                       )}
//                     </div>
//                   </td>
//                 </tr>
//               ) : (
//                 filteredUsers.map((user) => (
//                   <tr
//                     key={user.id}
//                     className="border-t border-[#2c2c35] hover:bg-[#1a1a20] transition-colors"
//                   >
//                     <td className="p-4 whitespace-nowrap">
//                       <div className="flex items-center gap-3">
//                         <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
//                           <span className="text-white font-bold text-sm">
//                             {user.full_name?.charAt(0)?.toUpperCase() || "U"}
//                           </span>
//                         </div>
//                         <span className="font-medium whitespace-nowrap">
//                           {user.full_name || "N/A"}
//                         </span>
//                       </div>
//                     </td>

//                     <td className="p-4 text-white whitespace-nowrap">
//                       {user.email || "-"}
//                     </td>
//                     <td className="p-4 text-white whitespace-nowrap">
//                       {user.phone_number || "-"}
//                     </td>

//                     <td className="p-4 whitespace-nowrap">
                      
//                         {user.role || "USER"}
                     
//                     </td>

//                     <td className="p-4 whitespace-nowrap">
//                       <button
//                         onClick={() => handleToggleStatusClick(user)}
//                         className={`px-3 py-1 rounded-full text-xs font-semibold transition-all
//                           ${
//                             user.is_active
//                               ? "bg-green-500/20 text-green-400 hover:bg-red-500 hover:text-white"
//                               : "bg-red-500/20 text-red-400 hover:bg-green-500 hover:text-white"
//                           }`}
//                       >
//                         {user.is_active ? "Active" : "Inactive"}
//                       </button>
//                     </td>

//                     {/* Actions */}
//                     <td className="p-4 whitespace-nowrap">
//                       <div className="flex items-center gap-2">
//                         <button
//                           onClick={() => handleDeleteClick(user)}
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
//                 Delete User
//               </h2>

//               <p className="text-gray-400 text-center text-sm leading-relaxed mb-8">
//                 Are you sure you want to delete{" "}
//                 <span className="text-white font-medium">
//                   {userToDelete?.full_name || `User #${userToDelete?.id}`}
//                 </span>
//                 ? This action cannot be undone.
//               </p>

//               {/* Buttons */}
//               <div className="flex gap-3 w-full">
//                 <button
//                   onClick={() => {
//                     setShowDeleteModal(false);
//                     setUserToDelete(null);
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

//       {/* ==================== Status Toggle Confirmation Modal ==================== */}
//       {showStatusModal && userToToggle && (
//         <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50">
//           <div className="w-full max-w-[400px] bg-[#1e1b2e] border border-[#2e2a42] rounded-2xl shadow-2xl overflow-hidden">
//             <div className="p-8 flex flex-col items-center">
//               {/* Status Icon */}
//               <div
//                 className={`w-14 h-14 rounded-full flex items-center justify-center mb-5 ${
//                   userToToggle.is_active
//                     ? "bg-orange-500/15"
//                     : "bg-green-500/15"
//                 }`}
//               >
//                 {userToToggle.is_active ? (
//                   <FaTimes className="text-orange-400 text-lg" />
//                 ) : (
//                   <Search className="text-green-400 text-lg" />
//                 )}
//               </div>

//               <h2 className="text-xl font-bold text-white mb-3 text-center">
//                 {userToToggle.is_active ? "Deactivate User?" : "Activate User?"}
//               </h2>

//               <p className="text-gray-400 text-center text-sm leading-relaxed mb-8">
//                 {userToToggle.is_active
//                   ? `This user won't be able to log in until activated again.`
//                   : `This user will be able to access the platform again.`}
//               </p>

//               {/* Buttons */}
//               <div className="flex gap-3 w-full">
//                 <button
//                   onClick={() => {
//                     setShowStatusModal(false);
//                     setUserToToggle(null);
//                   }}
//                   className="flex-1 px-5 py-3 rounded-xl border border-[#3a3650] text-gray-300 hover:bg-[#2a2640] transition-colors font-medium text-sm"
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   onClick={confirmToggleStatus}
//                   className={`flex-1 px-5 py-3 rounded-xl text-white font-bold hover:opacity-90 transition-opacity text-sm ${
//                     userToToggle.is_active
//                       ? "bg-gradient-to-r from-orange-500 to-red-500"
//                       : "bg-gradient-to-r from-green-500 to-emerald-500"
//                   }`}
//                 >
//                   {userToToggle.is_active ? "Deactivate" : "Activate"}
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

import { getAllUsers } from "../services/userService";
import API from "../services/api";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Delete states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Status toggle states
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [userToToggle, setUserToToggle] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const totalColumns = 6;

  /* =========================================================
     ADMIN TOKEN
  ========================================================= */

  const getAdminToken = () => {
    const token =
      localStorage.getItem("adminToken") ||
      sessionStorage.getItem("adminToken");

    if (
      !token ||
      typeof token !== "string" ||
      token === "undefined" ||
      token === "null"
    ) {
      return null;
    }

    return token.trim();
  };

  /* =========================================================
     FILTERED USERS
  ========================================================= */

  const filteredUsers = users.filter((u) => {
    const query = searchQuery.toLowerCase();

    return (
      u.full_name?.toLowerCase().includes(query) ||
      u.email?.toLowerCase().includes(query) ||
      u.phone_number?.includes(query) ||
      u.role?.toLowerCase().includes(query) ||
      (u.is_active ? "active" : "blocked").includes(query) ||
      String(u.id).includes(query)
    );
  });

  /* =========================================================
     FETCH USERS
  ========================================================= */

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const adminToken = getAdminToken();

      if (!adminToken) {
        throw new Error("Admin token missing");
      }

      console.log("USERS PAGE - ADMIN TOKEN FOUND");

      /*
       * getAllUsers receives the Admin token.
       */
      const response = await getAllUsers(adminToken);

      setUsers(response?.data || []);
    } catch (error) {
      console.error("FETCH USERS ERROR:", error);

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to fetch users"
      );

      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  /* =========================================================
     DELETE HANDLERS
  ========================================================= */

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!userToDelete || deleting) {
      return;
    }

    try {
      setDeleting(true);

      const adminToken = getAdminToken();

      if (!adminToken) {
        toast.error("Admin token missing");
        return;
      }

      console.log(
        "DELETE USER:",
        userToDelete.id
      );

      await API.delete(
        `/users/admin/${userToDelete.id}`,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      toast.success("User deleted successfully");

      setShowDeleteModal(false);
      setUserToDelete(null);

      await fetchUsers();
    } catch (error) {
      console.error("DELETE USER ERROR:", error);

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to delete user"
      );
    } finally {
      setDeleting(false);
    }
  };

  /* =========================================================
     STATUS TOGGLE HANDLERS
  ========================================================= */

  const handleToggleStatusClick = (user) => {
    setUserToToggle(user);
    setShowStatusModal(true);
  };

  const confirmToggleStatus = async () => {
    if (!userToToggle || updatingStatus) {
      return;
    }

    try {
      setUpdatingStatus(true);

      const adminToken = getAdminToken();

      if (!adminToken) {
        toast.error("Admin token missing");
        return;
      }

      const newStatus = !userToToggle.is_active;

      console.log(
        "UPDATE USER STATUS:",
        userToToggle.id,
        newStatus
      );

      await API.patch(
        `/users/${userToToggle.id}/status`,
        {
          is_active: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      toast.success(
        `User ${
          userToToggle.is_active
            ? "deactivated"
            : "activated"
        } successfully`
      );

      setShowStatusModal(false);
      setUserToToggle(null);

      await fetchUsers();
    } catch (error) {
      console.error(
        "UPDATE USER STATUS ERROR:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to update user status"
      );
    } finally {
      setUpdatingStatus(false);
    }
  };

  /* =========================================================
     CLOSE DELETE MODAL
  ========================================================= */

  const closeDeleteModal = () => {
    if (deleting) {
      return;
    }

    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  /* =========================================================
     CLOSE STATUS MODAL
  ========================================================= */

  const closeStatusModal = () => {
    if (updatingStatus) {
      return;
    }

    setShowStatusModal(false);
    setUserToToggle(null);
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="p-8 text-white">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="mb-6">
        <h1 className="text-4xl font-bold text-purple-400">
          Users
        </h1>

        <p className="text-white mt-2">
          Manage all registered users
        </p>
      </div>

      {/* =====================================================
          SEARCH BAR
      ===================================================== */}

      <div className="mb-6">
        <div className="relative w-full">

          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white pointer-events-none"
            size={18}
          />

          <input
            type="text"
            placeholder="Search users..."
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
          USERS TABLE
      ===================================================== */}

      <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full min-w-max">

            <thead className="bg-[#202027] text-white">

              <tr>

                <th className="p-4 text-left whitespace-nowrap">
                  Name
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Email
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Phone
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Role
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

              {/* =================================================
                  LOADING
              ================================================= */}

              {loading ? (

                <tr>

                  <td
                    colSpan={totalColumns}
                    className="p-12 text-center"
                  >

                    <div className="flex flex-col items-center gap-3">

                      <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>

                      <p className="text-gray-500">
                        Loading users...
                      </p>

                    </div>

                  </td>

                </tr>

              ) : filteredUsers.length === 0 ? (

                /* =================================================
                   EMPTY
                ================================================= */

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
                          ? "No users found matching your search"
                          : "No users available"}

                      </p>

                      {searchQuery && (

                        <button
                          onClick={() =>
                            setSearchQuery("")
                          }
                          className="text-white hover:text-purple-300 text-sm mt-1 transition-colors"
                        >
                          Clear search
                        </button>

                      )}

                    </div>

                  </td>

                </tr>

              ) : (

                /* =================================================
                   USERS
                ================================================= */

                filteredUsers.map((user) => (

                  <tr
                    key={user.id}
                    className="border-t border-[#2c2c35] hover:bg-[#1a1a20] transition-colors"
                  >

                    {/* NAME */}

                    <td className="p-4 whitespace-nowrap">

                      <div className="flex items-center gap-3">

                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">

                          <span className="text-white font-bold text-sm">

                            {user.full_name
                              ?.charAt(0)
                              ?.toUpperCase() || "U"}

                          </span>

                        </div>

                        <span className="font-medium whitespace-nowrap">

                          {user.full_name || "N/A"}

                        </span>

                      </div>

                    </td>

                    {/* EMAIL */}

                    <td className="p-4 text-white whitespace-nowrap">
                      {user.email || "-"}
                    </td>

                    {/* PHONE */}

                    <td className="p-4 text-white whitespace-nowrap">
                      {user.phone_number || "-"}
                    </td>

                    {/* ROLE */}

                    <td className="p-4 whitespace-nowrap">
                      {user.role || "USER"}
                    </td>

                    {/* STATUS */}

                    <td className="p-4 whitespace-nowrap">

                      <button
                        onClick={() =>
                          handleToggleStatusClick(user)
                        }
                        disabled={updatingStatus}
                        className={`px-3 py-1 rounded-full text-xs font-semibold transition-all disabled:opacity-50 ${
                          user.is_active
                            ? "bg-green-500/20 text-green-400 hover:bg-red-500 hover:text-white"
                            : "bg-red-500/20 text-red-400 hover:bg-green-500 hover:text-white"
                        }`}
                      >

                        {user.is_active
                          ? "Active"
                          : "Inactive"}

                      </button>

                    </td>

                    {/* ACTIONS */}

                    <td className="p-4 whitespace-nowrap">

                      <div className="flex items-center gap-2">

                        <button
                          onClick={() =>
                            handleDeleteClick(user)
                          }
                          disabled={deleting}
                          className="p-2 rounded-lg hover:bg-red-500/10 transition-colors group disabled:opacity-50"
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

      {/* =====================================================
          DELETE CONFIRMATION MODAL
      ===================================================== */}

      {showDeleteModal && (

        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50">

          <div className="w-full max-w-[400px] bg-[#1e1b2e] border border-[#2e2a42] rounded-2xl shadow-2xl overflow-hidden">

            <div className="p-8 flex flex-col items-center">

              {/* ICON */}

              <div className="w-14 h-14 rounded-full bg-red-500/15 flex items-center justify-center mb-5">

                <FaTrash className="text-red-400 text-lg" />

              </div>

              {/* TITLE */}

              <h2 className="text-xl font-bold text-white mb-3 text-center">
                Delete User
              </h2>

              {/* MESSAGE */}

              <p className="text-gray-400 text-center text-sm leading-relaxed mb-8">

                Are you sure you want to delete{" "}

                <span className="text-white font-medium">

                  {userToDelete?.full_name ||
                    `User #${userToDelete?.id}`}

                </span>

                ? This action cannot be undone.

              </p>

              {/* BUTTONS */}

              <div className="flex gap-3 w-full">

                <button
                  onClick={closeDeleteModal}
                  disabled={deleting}
                  className="flex-1 px-5 py-3 rounded-xl border border-[#3a3650] text-gray-300 hover:bg-[#2a2640] transition-colors font-medium text-sm disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  onClick={confirmDelete}
                  disabled={deleting}
                  className="flex-1 px-5 py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold hover:opacity-90 transition-opacity text-sm disabled:opacity-50"
                >

                  {deleting
                    ? "Deleting..."
                    : "Delete"}

                </button>

              </div>

            </div>

          </div>

        </div>

      )}

      {/* =====================================================
          STATUS TOGGLE CONFIRMATION MODAL
      ===================================================== */}

      {showStatusModal && userToToggle && (

        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50">

          <div className="w-full max-w-[400px] bg-[#1e1b2e] border border-[#2e2a42] rounded-2xl shadow-2xl overflow-hidden">

            <div className="p-8 flex flex-col items-center">

              {/* STATUS ICON */}

              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center mb-5 ${
                  userToToggle.is_active
                    ? "bg-orange-500/15"
                    : "bg-green-500/15"
                }`}
              >

                {userToToggle.is_active ? (

                  <FaTimes className="text-orange-400 text-lg" />

                ) : (

                  <Search className="text-green-400" size={20} />

                )}

              </div>

              {/* TITLE */}

              <h2 className="text-xl font-bold text-white mb-3 text-center">

                {userToToggle.is_active
                  ? "Deactivate User?"
                  : "Activate User?"}

              </h2>

              {/* MESSAGE */}

              <p className="text-gray-400 text-center text-sm leading-relaxed mb-8">

                {userToToggle.is_active
                  ? "This user won't be able to log in until activated again."
                  : "This user will be able to access the platform again."}

              </p>

              {/* BUTTONS */}

              <div className="flex gap-3 w-full">

                <button
                  onClick={closeStatusModal}
                  disabled={updatingStatus}
                  className="flex-1 px-5 py-3 rounded-xl border border-[#3a3650] text-gray-300 hover:bg-[#2a2640] transition-colors font-medium text-sm disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  onClick={confirmToggleStatus}
                  disabled={updatingStatus}
                  className={`flex-1 px-5 py-3 rounded-xl text-white font-bold hover:opacity-90 transition-opacity text-sm disabled:opacity-50 ${
                    userToToggle.is_active
                      ? "bg-gradient-to-r from-orange-500 to-red-500"
                      : "bg-gradient-to-r from-green-500 to-emerald-500"
                  }`}
                >

                  {updatingStatus
                    ? "Updating..."
                    : userToToggle.is_active
                    ? "Deactivate"
                    : "Activate"}

                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}