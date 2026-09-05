// import { useState } from "react";
// import { NavLink, useLocation } from "react-router-dom";

// import {
// HiOutlineHome,
// HiOutlineViewGrid,
// HiOutlineCollection,
// HiOutlineAcademicCap,
// HiOutlineUserGroup,
// HiOutlineOfficeBuilding,
// HiOutlineCalendar,
// HiOutlineUsers,
// HiOutlineMenuAlt2,
// HiOutlineChatAlt,
// HiChevronDown,
// HiChevronRight,
// HiOutlineDocumentText,
// HiOutlineInformationCircle,
// HiX,
//  HiClipboardCheck,
//    HiChartBar,
//    HiOutlinePhotograph,
//    HiOutlineClock,
//    HiOutlineCurrencyRupee,
//    HiOutlineGlobeAlt,
    
// } from "react-icons/hi";

// import { useSidebar } from "../../context/SidebarContext";

// // /* =========================
// // ADMIN MENU
// // ========================= */
// // const adminMenuItems = [
// // {
// // path: "/dashboard",
// // icon: HiOutlineHome,
// // label: "Dashboard",
// // },
// // {
// // path: "/categories",
// // icon: HiOutlineViewGrid,
// // label: "Categories",
// // },
// // {
// // path: "/subcategories",
// // icon: HiOutlineCollection,
// // label: "Subcategories",
// // },

// // {
// //   label: "Trainers",
// //   icon: HiOutlineUserGroup,
// //   children: [
// //     {
// //       path: "/trainers",
// //       label: "All Trainers",
// //     },
// //     {
// //       path: "/trainers/pending",
// //       label: "Pending Trainers",
// //     },
// //     {
// //       path: "/trainers/rejected",
// //       label: "Rejected Trainers",
// //     },
// //   ],
// // },
// // {
// // label: "Institutes",
// // icon: HiOutlineOfficeBuilding,
// // children: [
// // {
// // path: "/institutes",
// // label: "All Institutes",
// // },
// // {
// // path: "/institutes/pending",
// // label: "Pending Institutes",
// // },
// // {
// // path: "/institutes/rejected",
// // label: "Rejected Institutes",
// // },
// // ],
// // },
// // {
// // path: "/classes",
// // icon: HiOutlineAcademicCap,
// // label: "Classes",
// // },
// // {
// // path: "/sessions",
// // icon: HiOutlineAcademicCap,
// // label: "sessions",
// // },
// // {
// // path: "/bookings",
// // icon: HiOutlineCalendar,
// // label: "Bookings",
// // },
// // {
// // path: "/students",
// // icon: HiOutlineUsers,
// // label: "Students",
// // },
// // {
// // path: "/testimonials",
// // icon: HiOutlineChatAlt,
// // label: "Testimonials",
// // },
// // ];

// /* =========================
// ADMIN MENU
// ========================= */

// const adminMenuItems = [
//   {
//     path: "/dashboard",
//     icon: HiOutlineHome,
//     label: "Dashboard",
//   },
//   {
//     path: "/categories",
//     icon: HiOutlineViewGrid,
//     label: "Categories",
//   },
//   {
//     path: "/subcategories",
//     icon: HiOutlineCollection,
//     label: "Subcategories",
//   },
//   {
//     path: "/banners",
//     icon: HiOutlinePhotograph,
//     label: "Banners",
//   },
//   {
//     label: "Trainers",
//     icon: HiOutlineUserGroup,
//     children: [
//       {
//         path: "/trainers",
//         label: "All Trainers",
//       },
//       {
//         path: "/trainers/pending",
//         label: "Pending Trainers",
//       },
//       {
//         path: "/trainers/rejected",
//         label: "Rejected Trainers",
//       },
//     ],
//   },
//   {
//     label: "Institutes",
//     icon: HiOutlineOfficeBuilding,
//     children: [
//       {
//         path: "/institutes",
//         label: "All Institutes",
//       },
//       {
//         path: "/institutes/pending",
//         label: "Pending Institutes",
//       },
//       {
//         path: "/institutes/rejected",
//         label: "Rejected Institutes",
//       },
//     ],
//   },
//   {
//     path: "/classes",
//     icon: HiOutlineAcademicCap,
//     label: "Classes",
//   },
//   {
//     path: "/sessions",
//     icon: HiOutlineClock,
//     label: "Sessions",
//   },
//   {
//     path: "/bookings",
//     icon: HiOutlineCalendar,
//     label: "Bookings",
//   },
//   {
//     path: "/students",
//     icon: HiOutlineUsers,
//     label: "Students",
//   },
//   {
//     path: "/testimonials",
//     icon: HiOutlineChatAlt,
//     label: "Testimonials",
//   },
//   {
//   path: "/admin/website-templates",
//   icon: HiOutlineGlobeAlt,
//   label: "Website Templates",
// },
// ];

// /* =========================
// INSTITUTE MENU
// ========================= */
// const instituteMenuItems = [
//   {
//     path: "/institute/dashboard",
//     icon: HiOutlineHome,
//     label: "Dashboard",
//   },

//   {
//     path: "/institute/trainers",
//     icon: HiOutlineUserGroup,
//     label: "Trainers",
//   },

//   {
//     path: "/institute/classes",
//     icon: HiOutlineAcademicCap,
//     label: "Classes",
//   },

//   {
//     path: "/institute/sessions",
//     icon: HiOutlineAcademicCap,
//     label: "Sessions",
//   },

//   {
//     path: "/institute/banners",
//     icon: HiOutlinePhotograph,
//     label: "Banners",
//   },

//   {
//     path: "/institute/bookings",
//     icon: HiOutlineCalendar,
//     label: "Bookings",
//   },

//   {
//     path: "/institute/testimonials",
//     icon: HiOutlineChatAlt,
//     label: "Testimonials",
//   },

//   {
//     path: "/institute/profile",
//     icon: HiOutlineOfficeBuilding,
//     label: "Institute Profile",
//   },

//   {
//     path: "/institute/batches",
//     icon: HiOutlineCollection,
//     label: "Batches",
//   },

//   {
//     path: "/institute/payments",
//     icon: HiOutlineCurrencyRupee,
//     label: "Payments",
//   },

//   {
//     path: "/institute/students",
//     icon: HiOutlineUsers,
//     label: "Students",
//   },

//   {
//     path: "/institute/about",
//     icon: HiOutlineInformationCircle,
//     label: "About",
//   },

//   /* =======================================================
//      FOOTER
//   ======================================================= */

//   {
//     path: "/institute/footer",
//     icon: HiOutlineDocumentText,
//     label: "Footer",
//   },

//   {
//     path: "/institute/website",
//     icon: HiOutlineGlobeAlt,
//     label: "Website",
//   },
// ];
// /* =========================
// TRAINER MENU
// ========================= */
// const trainerMenuItems = [
// {
// path: "/trainer/dashboard",
// icon: HiOutlineHome,
// label: "Dashboard",
// },
// {
// path: "/trainer/classes",
// icon: HiOutlineAcademicCap,
// label: "My Classes",
// },
// {
// path: "/trainer/sessions",
// icon: HiOutlineAcademicCap,
// label: "Sessions",
// },
// {
// path: "/trainer/bookings",
// icon: HiOutlineCalendar,
// label: "Bookings",
// },
// // {
// // path: "/trainer/students",
// // icon: HiOutlineUsers,
// // label: "Students",
// // },
// {
// path: "/trainer/profile",
// icon: HiOutlineUserGroup,
// label: "Profile",
// },
// ];

// export default function Sidebar({
// role = "ADMIN",
// }) {
// const location = useLocation();

// const {
// isSidebarOpen,
// toggleSidebar,
// toggleMobileSidebar,
// } = useSidebar();

// const [openMenus, setOpenMenus] =
// useState({
// institutes: true,
// trainers: true,
// });

// const menuItems =
// role === "INSTITUTE"
// ? instituteMenuItems
// : role === "TRAINER"
// ? trainerMenuItems
// : adminMenuItems;

// const handleLogout = () => {
// localStorage.clear();
// window.location.href = "/";
// };

// return (

//   <div
//     className={`sidebar-hide-scrollbar h-screen overflow-y-auto flex flex-col glass-effect ${
//       isSidebarOpen ? "px-4" : "px-2"
//     } py-6`}
//     style={{
//       scrollbarWidth: "none",
//       msOverflowStyle: "none",
//     }}
//   >

// {/* LOGO */} <div className="flex items-center justify-between mb-8 px-2">
// {isSidebarOpen ? ( <div className="flex items-center gap-3"> <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center"> <span className="text-white font-bold text-lg">
// DP </span> </div>


//         <span className="text-lg font-bold gradient-text">
//           {role === "INSTITUTE"
//             ? "Institute"
//             : role === "TRAINER"
//             ? "Trainer"
//             : "Admin"}
//         </span>
//       </div>
//     ) : (
//       <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center mx-auto">
//         <span className="text-white font-bold text-lg">
//           DP
//         </span>
//       </div>
//     )}

//     <button
//       onClick={toggleMobileSidebar}
//       className="lg:hidden p-2 rounded-lg hover:bg-white/10"
//     >
//       <HiX className="w-5 h-5" />
//     </button>

//     <button
//       onClick={toggleSidebar}
//       className="hidden lg:block p-2 rounded-lg hover:bg-white/10"
//     >
//       <HiOutlineMenuAlt2 className="w-5 h-5" />
//     </button>
//   </div>

//   {/* MENU */}
//   <nav className="flex-1 space-y-1">
//     {menuItems.map((item) => {
//       const Icon = item.icon;

//       if (item.children) {
//         const menuKey =
//           item.label.toLowerCase();

//         const isOpen =
//           openMenus[menuKey];

//         return (
//           <div key={item.label}>
//             <button
//               onClick={() =>
//                 setOpenMenus((prev) => ({
//                   ...prev,
//                   [menuKey]:
//                     !prev[menuKey],
//                 }))
//               }
//               className="w-full flex items-center justify-between px-3 py-3 rounded-xl text-white hover:text-white hover:bg-white/5"
//             >
//               <div className="flex items-center gap-3">
//                 <Icon className="w-5 h-5" />

//                 {isSidebarOpen && (
//                   <span className="font-medium text-sm">
//                     {item.label}
//                   </span>
//                 )}
//               </div>

//               {isSidebarOpen &&
//                 (isOpen ? (
//                   <HiChevronDown />
//                 ) : (
//                   <HiChevronRight />
//                 ))}
//             </button>

//            {isOpen && (
//   <div className="ml-8 mt-1 space-y-1">
//     {item.children.map((child) => {
//       const isChildActive =
//         location.pathname === child.path;

//       return (
//         <NavLink
//           key={child.path}
//           to={child.path}
//           className={`block px-3 py-2 rounded-lg text-sm ${
//             isChildActive
//               ? "bg-purple-600 text-white"
//               : "text-white hover:bg-white/5 hover:text-white"
//           }`}
//         >
//           {child.label}
//         </NavLink>
//       );
//     })}
//   </div>
// )}
//           </div>
//         );
//       }

//       const isActive =
//         location.pathname ===
//         item.path;

//       return (
//         <NavLink
//           key={item.path}
//           to={item.path}
//           className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
//             isActive
//               ? "gradient-bg text-white shadow-lg shadow-purple-500/25"
//               : "text-white hover:text-white hover:bg-white/5"
//           }`}
//         >
//           <Icon
//             className={`w-5 h-5 ${
//               isActive
//                 ? "text-white"
//                 : "group-hover:text-neon-pink"
//             }`}
//           />

//           {isSidebarOpen && (
//             <span className="font-medium text-sm">
//               {item.label}
//             </span>
//           )}
//         </NavLink>
//       );
//     })}
//   </nav>

//   {/* LOGOUT */}
//   <button
//     onClick={handleLogout}
//     className="w-full mt-4 px-3 py-3 rounded-xl bg-red-600 text-white hover:bg-red-700 transition-all text-sm font-semibold flex items-center justify-center gap-2"
//   >
//     <HiX className="w-4 h-4" />
//     Logout
//   </button>
// </div>


// );
// }




// import { useEffect, useState } from "react";
// import { NavLink, useLocation } from "react-router-dom";

// import {
//   HiOutlineHome,
//   HiOutlineViewGrid,
//   HiOutlineCollection,
//   HiOutlineAcademicCap,
//   HiOutlineUserGroup,
//   HiOutlineOfficeBuilding,
//   HiOutlineCalendar,
//   HiOutlineUsers,
//   HiOutlineMenuAlt2,
//   HiOutlineChatAlt,
//   HiChevronDown,
//   HiChevronRight,
//   HiOutlineDocumentText,
//   HiOutlineInformationCircle,
//   HiX,
//   HiOutlinePhotograph,
//   HiOutlineClock,
//   HiOutlineCurrencyRupee,
//   HiOutlineGlobeAlt,
// } from "react-icons/hi";

// import { useSidebar } from "../../context/SidebarContext";
// import { getProfile } from "../../services/instituteService";

// /* =========================================================
//    ADMIN MENU
// ========================================================= */

// const adminMenuItems = [
//   {
//     path: "/dashboard",
//     icon: HiOutlineHome,
//     label: "Dashboard",
//   },
//   {
//     path: "/categories",
//     icon: HiOutlineViewGrid,
//     label: "Categories",
//   },
//   {
//     path: "/subcategories",
//     icon: HiOutlineCollection,
//     label: "Subcategories",
//   },
//   {
//     path: "/banners",
//     icon: HiOutlinePhotograph,
//     label: "Banners",
//   },
//   {
//     label: "Trainers",
//     icon: HiOutlineUserGroup,
//     children: [
//       {
//         path: "/trainers",
//         label: "All Trainers",
//       },
//       {
//         path: "/trainers/pending",
//         label: "Pending Trainers",
//       },
//       {
//         path: "/trainers/rejected",
//         label: "Rejected Trainers",
//       },
//     ],
//   },
//   {
//     label: "Institutes",
//     icon: HiOutlineOfficeBuilding,
//     children: [
//       {
//         path: "/institutes",
//         label: "All Institutes",
//       },
//       {
//         path: "/institutes/pending",
//         label: "Pending Institutes",
//       },
//       {
//         path: "/institutes/rejected",
//         label: "Rejected Institutes",
//       },
//     ],
//   },
//   {
//     path: "/classes",
//     icon: HiOutlineAcademicCap,
//     label: "Classes",
//   },
//   {
//     path: "/sessions",
//     icon: HiOutlineClock,
//     label: "Sessions",
//   },
//   {
//     path: "/bookings",
//     icon: HiOutlineCalendar,
//     label: "Bookings",
//   },
//   {
//     path: "/students",
//     icon: HiOutlineUsers,
//     label: "Students",
//   },
//   {
//     path: "/testimonials",
//     icon: HiOutlineChatAlt,
//     label: "Testimonials",
//   },
//   // {
//   //   path: "/admin/website-templates",
//   //   icon: HiOutlineGlobeAlt,
//   //   label: "Website Templates",
//   // },
// ];

// /* =========================================================
//    INSTITUTE MENU
// ========================================================= */

// const instituteMenuItems = [
//   {
//     path: "/institute/dashboard",
//     icon: HiOutlineHome,
//     label: "Dashboard",
//   },
//   {
//     path: "/institute/trainers",
//     icon: HiOutlineUserGroup,
//     label: "Trainers",
//   },
//   {
//     path: "/institute/classes",
//     icon: HiOutlineAcademicCap,
//     label: "Classes",
//   },
//   {
//     path: "/institute/sessions",
//     icon: HiOutlineAcademicCap,
//     label: "Sessions",
//   },
//   {
//     path: "/institute/banners",
//     icon: HiOutlinePhotograph,
//     label: "Banners",
//   },
//   {
//     path: "/institute/bookings",
//     icon: HiOutlineCalendar,
//     label: "Bookings",
//   },
//   {
//     path: "/institute/testimonials",
//     icon: HiOutlineChatAlt,
//     label: "Testimonials",
//   },
//   {
//     path: "/institute/profile",
//     icon: HiOutlineOfficeBuilding,
//     label: "Institute Profile",
//   },
//   {
//     path: "/institute/batches",
//     icon: HiOutlineCollection,
//     label: "Batches",
//   },
//   {
//     path: "/institute/payments",
//     icon: HiOutlineCurrencyRupee,
//     label: "Payments",
//   },
//   {
//     path: "/institute/students",
//     icon: HiOutlineUsers,
//     label: "Students",
//   },
//   {
//     path: "/institute/about",
//     icon: HiOutlineInformationCircle,
//     label: "About",
//   },
//   {
//     path: "/institute/footer",
//     icon: HiOutlineDocumentText,
//     label: "Footer",
//   },
//   {
//     path: "/institute/website",
//     icon: HiOutlineGlobeAlt,
//     label: "Website",
//   },
// ];

// /* =========================================================
//    TRAINER MENU
// ========================================================= */

// const trainerMenuItems = [
//   {
//     path: "/trainer/dashboard",
//     icon: HiOutlineHome,
//     label: "Dashboard",
//   },
//   {
//     path: "/trainer/classes",
//     icon: HiOutlineAcademicCap,
//     label: "My Classes",
//   },
//   {
//     path: "/trainer/sessions",
//     icon: HiOutlineAcademicCap,
//     label: "Sessions",
//   },
//   {
//     path: "/trainer/bookings",
//     icon: HiOutlineCalendar,
//     label: "Bookings",
//   },
//   {
//     path: "/trainer/profile",
//     icon: HiOutlineUserGroup,
//     label: "Profile",
//   },
// ];

// /* =========================================================
//    GET STORED INSTITUTE DATA
// ========================================================= */

// const getStoredInstituteData = () => {
//   try {
//     const storedInstitute =
//       localStorage.getItem("institute");

//     if (!storedInstitute) {
//       return null;
//     }

//     return JSON.parse(storedInstitute);
//   } catch (error) {
//     console.error(
//       "SIDEBAR: Failed to parse institute data:",
//       error
//     );

//     return null;
//   }
// };

// /* =========================================================
//    GET STORED INSTITUTE NAME
// ========================================================= */

// const getStoredInstituteName = () => {
//   const data =
//     getStoredInstituteData();

//   return (
//     data?.institute?.name ||
//     data?.institute?.institute_name ||
//     data?.institute?.institution_name ||
//     data?.name ||
//     ""
//   );
// };

// /* =========================================================
//    GET INITIALS
// ========================================================= */

// const getInitials = (name) => {
//   if (!name) {
//     return "IN";
//   }

//   const words = name
//     .trim()
//     .split(/\s+/)
//     .filter(Boolean);

//   if (words.length === 0) {
//     return "IN";
//   }

//   if (words.length === 1) {
//     return words[0]
//       .substring(0, 2)
//       .toUpperCase();
//   }

//   return (
//     words[0][0] +
//     words[1][0]
//   ).toUpperCase();
// };

// /* =========================================================
//    SIDEBAR
// ========================================================= */

// export default function Sidebar({
//   role = "ADMIN",
// }) {
//   const location = useLocation();

//   const {
//     isSidebarOpen,
//     toggleSidebar,
//     toggleMobileSidebar,
//   } = useSidebar();

//   const [openMenus, setOpenMenus] =
//     useState({
//       institutes: true,
//       trainers: true,
//     });

//   /* =======================================================
//      INSTITUTE NAME STATE
//   ======================================================= */

//   const [
//     instituteName,
//     setInstituteName,
//   ] = useState(() => {
//     if (role === "INSTITUTE") {
//       return getStoredInstituteName();
//     }

//     return "";
//   });

//   /* =======================================================
//      LOAD REAL INSTITUTE PROFILE
//   ======================================================= */

//   useEffect(() => {
//     if (role !== "INSTITUTE") {
//       return;
//     }

//     let mounted = true;

//     const loadInstituteProfile = async () => {
//       try {
//         console.log(
//           "================================="
//         );

//         console.log(
//           "SIDEBAR: LOADING INSTITUTE PROFILE"
//         );

//         console.log(
//           "================================="
//         );

//         /* =========================================
//            GET FIREBASE TOKEN
//         ========================================= */

//         const token =
//           localStorage.getItem("token");

//         console.log(
//           "SIDEBAR TOKEN:",
//           token
//             ? "FOUND"
//             : "NOT FOUND"
//         );

//         /* =========================================
//            IF TOKEN EXISTS, FETCH LATEST PROFILE
//         ========================================= */

//         if (token) {
//           const response =
//             await getProfile(token);

//           console.log(
//             "SIDEBAR PROFILE RESPONSE:",
//             response
//           );

//           /*
//            * getProfile() returns response.data
//            *
//            * InstituteProfile.jsx uses:
//            *
//            * setProfile(res.data)
//            *
//            * So support:
//            *
//            * response.data
//            * response
//            */

//           const profile =
//             response?.data ||
//             response;

//           console.log(
//             "SIDEBAR PROFILE:",
//             profile
//           );

//           /* =======================================
//              GET ACTUAL NAME
//           ======================================= */

//           const name =
//             profile?.name ||
//             profile?.institute_name ||
//             profile?.institution_name ||
//             profile?.institute?.name ||
//             "";

//           console.log(
//             "SIDEBAR ACTUAL INSTITUTE NAME:",
//             name
//           );

//           if (
//             name &&
//             mounted
//           ) {
//             setInstituteName(name);

//             /* =====================================
//                UPDATE LOCAL STORAGE
//             ===================================== */

//             try {
//               const existing =
//                 getStoredInstituteData() ||
//                 {};

//               const updated = {
//                 ...existing,
//                 institute: {
//                   ...(existing?.institute ||
//                     {}),
//                   name,
//                 },
//               };

//               localStorage.setItem(
//                 "institute",
//                 JSON.stringify(updated)
//               );

//             } catch (storageError) {
//               console.error(
//                 "SIDEBAR STORAGE UPDATE ERROR:",
//                 storageError
//               );
//             }

//             return;
//           }
//         }

//         /* =========================================
//            FALLBACK TO LOCAL STORAGE
//         ========================================= */

//         const storedName =
//           getStoredInstituteName();

//         if (
//           storedName &&
//           mounted
//         ) {
//           console.log(
//             "SIDEBAR USING STORED NAME:",
//             storedName
//           );

//           setInstituteName(
//             storedName
//           );
//         }

//       } catch (error) {
//         console.error(
//           "SIDEBAR PROFILE ERROR:",
//           error
//         );

//         console.error(
//           "SIDEBAR STATUS:",
//           error?.response?.status
//         );

//         console.error(
//           "SIDEBAR BACKEND RESPONSE:",
//           error?.response?.data
//         );

//         /* =========================================
//            FALLBACK
//         ========================================= */

//         const storedName =
//           getStoredInstituteName();

//         if (
//           storedName &&
//           mounted
//         ) {
//           setInstituteName(
//             storedName
//           );
//         }
//       }
//     };

//     loadInstituteProfile();

//     return () => {
//       mounted = false;
//     };
//   }, [role]);

//   /* =======================================================
//      FINAL DISPLAY NAME
//   ======================================================= */

//   const finalInstituteName =
//     instituteName ||
//     "Institute";

//   /* =======================================================
//      INITIALS
//   ======================================================= */

//   const instituteInitials =
//     getInitials(
//       finalInstituteName
//     );

//   /* =======================================================
//      MENU
//   ======================================================= */

//   const menuItems =
//     role === "INSTITUTE"
//       ? instituteMenuItems
//       : role === "TRAINER"
//       ? trainerMenuItems
//       : adminMenuItems;

//   /* =======================================================
//      LOGOUT
//   ======================================================= */

//   const handleLogout = () => {
//     localStorage.clear();

//     window.location.href = "/";
//   };

//   /* =======================================================
//      RENDER
//   ======================================================= */

//   return (
//     <div
//       className={`sidebar-hide-scrollbar h-screen overflow-y-auto flex flex-col glass-effect ${
//         isSidebarOpen
//           ? "px-4"
//           : "px-2"
//       } py-6`}
//       style={{
//         scrollbarWidth: "none",
//         msOverflowStyle: "none",
//       }}
//     >

//       {/* =====================================================
//           HEADER / LOGO
//       ===================================================== */}

//       <div className="flex items-center justify-between mb-8 px-2">

//         {isSidebarOpen ? (

//           <div className="flex items-center gap-3 min-w-0">

//             {/* ===============================================
//                 INSTITUTE INITIALS
//             =============================================== */}

//             <div className="w-10 h-10 flex-shrink-0 rounded-xl gradient-bg flex items-center justify-center">

//               <span className="text-white font-bold text-sm">
//                 {role === "INSTITUTE"
//                   ? instituteInitials
//                   : role === "TRAINER"
//                   ? "TR"
//                   : "DP"}
//               </span>

//             </div>

//             {/* ===============================================
//                 NAME
//             =============================================== */}

//             <span
//               className="text-lg font-bold gradient-text truncate"
//               title={
//                 role === "INSTITUTE"
//                   ? finalInstituteName
//                   : role === "TRAINER"
//                   ? "Trainer"
//                   : "Admin"
//               }
//             >
//               {role === "INSTITUTE"
//                 ? finalInstituteName
//                 : role === "TRAINER"
//                 ? "Trainer"
//                 : "Admin"}
//             </span>

//           </div>

//         ) : (

//           /* ===============================================
//              COLLAPSED SIDEBAR
//           =============================================== */

//           <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center mx-auto">

//             <span className="text-white font-bold text-sm">
//               {role === "INSTITUTE"
//                 ? instituteInitials
//                 : role === "TRAINER"
//                 ? "TR"
//                 : "DP"}
//             </span>

//           </div>

//         )}

//         {/* =================================================
//             MOBILE BUTTON
//         ================================================= */}

//         <button
//           onClick={toggleMobileSidebar}
//           className="lg:hidden p-2 rounded-lg hover:bg-white/10"
//         >
//           <HiX className="w-5 h-5" />
//         </button>

//         {/* =================================================
//             DESKTOP BUTTON
//         ================================================= */}

//         <button
//           onClick={toggleSidebar}
//           className="hidden lg:block p-2 rounded-lg hover:bg-white/10"
//         >
//           <HiOutlineMenuAlt2 className="w-5 h-5" />
//         </button>

//       </div>

//       {/* =====================================================
//           MENU
//       ===================================================== */}

//       <nav className="flex-1 space-y-1">

//         {menuItems.map((item) => {

//           const Icon = item.icon;

//           /* =================================================
//              CHILD MENU
//           ================================================= */

//           if (item.children) {

//             const menuKey =
//               item.label.toLowerCase();

//             const isOpen =
//               openMenus[menuKey];

//             return (
//               <div
//                 key={item.label}
//               >

//                 <button
//                   onClick={() =>
//                     setOpenMenus(
//                       (prev) => ({
//                         ...prev,
//                         [menuKey]:
//                           !prev[
//                             menuKey
//                           ],
//                       })
//                     )
//                   }
//                   className="w-full flex items-center justify-between px-3 py-3 rounded-xl text-white hover:text-white hover:bg-white/5"
//                 >

//                   <div className="flex items-center gap-3">

//                     <Icon className="w-5 h-5" />

//                     {isSidebarOpen && (
//                       <span className="font-medium text-sm">
//                         {item.label}
//                       </span>
//                     )}

//                   </div>

//                   {isSidebarOpen &&
//                     (isOpen ? (
//                       <HiChevronDown />
//                     ) : (
//                       <HiChevronRight />
//                     ))}

//                 </button>

//                 {isOpen &&
//                   isSidebarOpen && (

//                     <div className="ml-8 mt-1 space-y-1">

//                       {item.children.map(
//                         (child) => {

//                           const isChildActive =
//                             location.pathname ===
//                             child.path;

//                           return (
//                             <NavLink
//                               key={
//                                 child.path
//                               }
//                               to={
//                                 child.path
//                               }
//                               className={`block px-3 py-2 rounded-lg text-sm ${
//                                 isChildActive
//                                   ? "bg-purple-600 text-white"
//                                   : "text-white hover:bg-white/5 hover:text-white"
//                               }`}
//                             >
//                               {
//                                 child.label
//                               }
//                             </NavLink>
//                           );
//                         }
//                       )}

//                     </div>

//                   )}

//               </div>
//             );
//           }

//           /* =================================================
//              NORMAL MENU ITEM
//           ================================================= */

//           const isActive =
//             location.pathname ===
//             item.path;

//           return (
//             <NavLink
//               key={item.path}
//               to={item.path}
//               className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
//                 isActive
//                   ? "gradient-bg text-white shadow-lg shadow-purple-500/25"
//                   : "text-white hover:text-white hover:bg-white/5"
//               }`}
//             >

//               <Icon
//                 className={`w-5 h-5 ${
//                   isActive
//                     ? "text-white"
//                     : "group-hover:text-neon-pink"
//                 }`}
//               />

//               {isSidebarOpen && (
//                 <span className="font-medium text-sm">
//                   {item.label}
//                 </span>
//               )}

//             </NavLink>
//           );
//         })}

//       </nav>

//       {/* =====================================================
//           LOGOUT
//       ===================================================== */}

//       <button
//         onClick={handleLogout}
//         className="w-full mt-4 px-3 py-3 rounded-xl bg-red-600 text-white hover:bg-red-700 transition-all text-sm font-semibold flex items-center justify-center gap-2"
//       >

//         <HiX className="w-4 h-4" />

//         {isSidebarOpen &&
//           "Logout"}

//       </button>

//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import {
  HiOutlineHome,
  HiOutlineViewGrid,
  HiOutlineCollection,
  HiOutlineAcademicCap,
  HiOutlineUserGroup,
  HiOutlineOfficeBuilding,
  HiOutlineCalendar,
  HiOutlineUsers,
  HiOutlineMenuAlt2,
  HiOutlineChatAlt,
  HiChevronDown,
  HiChevronRight,
  HiOutlineDocumentText,
  HiOutlineInformationCircle,
  HiX,
  HiOutlinePhotograph,
  HiOutlineClock,
  HiOutlineCurrencyRupee,
  HiOutlineGlobeAlt,
} from "react-icons/hi";

import { useSidebar } from "../../context/SidebarContext";

import {
  getProfile as getInstituteProfile,
} from "../../services/instituteService";

import {
  getProfile as getTrainerProfile,
} from "../../services/trainerService";

/* =========================================================
   ADMIN MENU
========================================================= */

const adminMenuItems = [
  {
    path: "/dashboard",
    icon: HiOutlineHome,
    label: "Dashboard",
  },
  {
    path: "/categories",
    icon: HiOutlineViewGrid,
    label: "Categories",
  },
  {
    path: "/subcategories",
    icon: HiOutlineCollection,
    label: "Subcategories",
  },
  {
    path: "/banners",
    icon: HiOutlinePhotograph,
    label: "Banners",
  },
  {
    label: "Trainers",
    icon: HiOutlineUserGroup,
    children: [
      {
        path: "/trainers",
        label: "All Trainers",
      },
      {
        path: "/trainers/pending",
        label: "Pending Trainers",
      },
      {
        path: "/trainers/rejected",
        label: "Rejected Trainers",
      },
    ],
  },
  {
    label: "Institutes",
    icon: HiOutlineOfficeBuilding,
    children: [
      {
        path: "/institutes",
        label: "All Institutes",
      },
      {
        path: "/institutes/pending",
        label: "Pending Institutes",
      },
      {
        path: "/institutes/rejected",
        label: "Rejected Institutes",
      },
    ],
  },
  {
    path: "/classes",
    icon: HiOutlineAcademicCap,
    label: "Classes",
  },
  {
    path: "/sessions",
    icon: HiOutlineClock,
    label: "Sessions",
  },
  {
    path: "/bookings",
    icon: HiOutlineCalendar,
    label: "Bookings",
  },
  {
    path: "/students",
    icon: HiOutlineUsers,
    label: "Students",
  },
  {
    path: "/testimonials",
    icon: HiOutlineChatAlt,
    label: "Testimonials",
  },
];

/* =========================================================
   INSTITUTE MENU
========================================================= */

const instituteMenuItems = [
  {
    path: "/institute/dashboard",
    icon: HiOutlineHome,
    label: "Dashboard",
  },
  {
    path: "/institute/trainers",
    icon: HiOutlineUserGroup,
    label: "Trainers",
  },
  {
    path: "/institute/classes",
    icon: HiOutlineAcademicCap,
    label: "Classes",
  },
  {
    path: "/institute/sessions",
    icon: HiOutlineAcademicCap,
    label: "Sessions",
  },
  {
    path: "/institute/banners",
    icon: HiOutlinePhotograph,
    label: "Banners",
  },
  {
    path: "/institute/bookings",
    icon: HiOutlineCalendar,
    label: "Bookings",
  },
  {
    path: "/institute/testimonials",
    icon: HiOutlineChatAlt,
    label: "Testimonials",
  },
  {
    path: "/institute/profile",
    icon: HiOutlineOfficeBuilding,
    label: "Institute Profile",
  },
  {
    path: "/institute/batches",
    icon: HiOutlineCollection,
    label: "Batches",
  },
  {
    path: "/institute/payments",
    icon: HiOutlineCurrencyRupee,
    label: "Payments",
  },
  {
    path: "/institute/students",
    icon: HiOutlineUsers,
    label: "Students",
  },
  {
    path: "/institute/about",
    icon: HiOutlineInformationCircle,
    label: "About",
  },
  {
    path: "/institute/footer",
    icon: HiOutlineDocumentText,
    label: "Footer",
  },
  {
    path: "/institute/website",
    icon: HiOutlineGlobeAlt,
    label: "Website",
  },
];

/* =========================================================
   TRAINER MENU
========================================================= */

const trainerMenuItems = [
  {
    path: "/trainer/dashboard",
    icon: HiOutlineHome,
    label: "Dashboard",
  },
  {
    path: "/trainer/classes",
    icon: HiOutlineAcademicCap,
    label: "My Classes",
  },
  {
    path: "/trainer/sessions",
    icon: HiOutlineAcademicCap,
    label: "Sessions",
  },
  {
    path: "/trainer/bookings",
    icon: HiOutlineCalendar,
    label: "Bookings",
  },
  {
    path: "/trainer/profile",
    icon: HiOutlineUserGroup,
    label: "Profile",
  },
];

/* =========================================================
   GET STORED INSTITUTE DATA
========================================================= */

const getStoredInstituteData = () => {
  try {
    const storedInstitute = localStorage.getItem("institute");

    if (!storedInstitute) {
      return null;
    }

    return JSON.parse(storedInstitute);
  } catch (error) {
    console.error(
      "SIDEBAR: Failed to parse institute data:",
      error
    );

    return null;
  }
};

/* =========================================================
   GET STORED INSTITUTE NAME
========================================================= */

const getStoredInstituteName = () => {
  const data = getStoredInstituteData();

  return (
    data?.institute?.name ||
    data?.institute?.institute_name ||
    data?.institute?.institution_name ||
    data?.name ||
    ""
  );
};

/* =========================================================
   GET INITIALS
========================================================= */

const getInitials = (name, fallback = "IN") => {
  if (!name) {
    return fallback;
  }

  const words = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (words.length === 0) {
    return fallback;
  }

  if (words.length === 1) {
    return words[0]
      .substring(0, 2)
      .toUpperCase();
  }

  return (
    words[0][0] +
    words[1][0]
  ).toUpperCase();
};

/* =========================================================
   SIDEBAR
========================================================= */

export default function Sidebar({
  role = "ADMIN",
}) {
  const location = useLocation();

  const {
    isSidebarOpen,
    toggleSidebar,
    toggleMobileSidebar,
  } = useSidebar();

  const [openMenus, setOpenMenus] = useState({
    institutes: true,
    trainers: true,
  });

  /* =======================================================
     INSTITUTE NAME STATE
  ======================================================= */

  const [
    instituteName,
    setInstituteName,
  ] = useState(() => {
    if (role === "INSTITUTE") {
      return getStoredInstituteName();
    }

    return "";
  });

  /* =======================================================
     TRAINER NAME STATE
  ======================================================= */

  const [
    trainerName,
    setTrainerName,
  ] = useState(() => {
    if (role === "TRAINER") {
      return localStorage.getItem("trainerName") || "";
    }

    return "";
  });

  /* =======================================================
     LOAD REAL INSTITUTE PROFILE
  ======================================================= */

  useEffect(() => {
    if (role !== "INSTITUTE") {
      return;
    }

    let mounted = true;

    const loadInstituteProfile = async () => {
      try {
        console.log(
          "================================="
        );

        console.log(
          "SIDEBAR: LOADING INSTITUTE PROFILE"
        );

        console.log(
          "================================="
        );

        const token =
          localStorage.getItem("token");

        console.log(
          "SIDEBAR TOKEN:",
          token ? "FOUND" : "NOT FOUND"
        );

        if (token) {
          const response =
            await getInstituteProfile(token);

          console.log(
            "SIDEBAR PROFILE RESPONSE:",
            response
          );

          const profile =
            response?.data ||
            response;

          console.log(
            "SIDEBAR PROFILE:",
            profile
          );

          const name =
            profile?.name ||
            profile?.institute_name ||
            profile?.institution_name ||
            profile?.institute?.name ||
            "";

          console.log(
            "SIDEBAR ACTUAL INSTITUTE NAME:",
            name
          );

          if (name && mounted) {
            setInstituteName(name);

            try {
              const existing =
                getStoredInstituteData() ||
                {};

              const updated = {
                ...existing,
                institute: {
                  ...(existing?.institute || {}),
                  name,
                },
              };

              localStorage.setItem(
                "institute",
                JSON.stringify(updated)
              );
            } catch (storageError) {
              console.error(
                "SIDEBAR STORAGE UPDATE ERROR:",
                storageError
              );
            }

            return;
          }
        }

        const storedName =
          getStoredInstituteName();

        if (storedName && mounted) {
          console.log(
            "SIDEBAR USING STORED NAME:",
            storedName
          );

          setInstituteName(storedName);
        }
      } catch (error) {
        console.error(
          "SIDEBAR PROFILE ERROR:",
          error
        );

        console.error(
          "SIDEBAR STATUS:",
          error?.response?.status
        );

        console.error(
          "SIDEBAR BACKEND RESPONSE:",
          error?.response?.data
        );

        const storedName =
          getStoredInstituteName();

        if (storedName && mounted) {
          setInstituteName(storedName);
        }
      }
    };

    loadInstituteProfile();

    return () => {
      mounted = false;
    };
  }, [role]);

  /* =======================================================
     LOAD REAL TRAINER PROFILE
  ======================================================= */

  useEffect(() => {
    if (role !== "TRAINER") {
      return;
    }

    let mounted = true;

    const loadTrainerProfile = async () => {
      try {
        console.log(
          "================================="
        );

        console.log(
          "SIDEBAR: LOADING TRAINER PROFILE"
        );

        console.log(
          "================================="
        );

        const token =
          localStorage.getItem("token");

        console.log(
          "SIDEBAR TRAINER TOKEN:",
          token ? "FOUND" : "NOT FOUND"
        );

        if (!token) {
          console.warn(
            "SIDEBAR: Trainer token not found"
          );

          return;
        }

        const response =
          await getTrainerProfile(token);

        console.log(
          "SIDEBAR TRAINER PROFILE RESPONSE:",
          response
        );

        /*
         * Support both possible axios structures:
         *
         * response.data.data
         * response.data
         */

        const profile =
          response?.data?.data ||
          response?.data ||
          response;

        console.log(
          "SIDEBAR TRAINER PROFILE:",
          profile
        );

        /* =========================================
           GET ACTUAL TRAINER NAME
        ========================================= */

        const name =
          profile?.full_name ||
          profile?.name ||
          profile?.trainer?.full_name ||
          profile?.trainer?.name ||
          "";

        console.log(
          "SIDEBAR ACTUAL TRAINER NAME:",
          name
        );

        if (name && mounted) {
          setTrainerName(name);

          /* =====================================
             SAVE TRAINER NAME
          ===================================== */

          try {
            localStorage.setItem(
              "trainerName",
              name
            );
          } catch (storageError) {
            console.error(
              "SIDEBAR TRAINER STORAGE ERROR:",
              storageError
            );
          }
        }
      } catch (error) {
        console.error(
          "SIDEBAR TRAINER PROFILE ERROR:",
          error
        );

        console.error(
          "SIDEBAR TRAINER STATUS:",
          error?.response?.status
        );

        console.error(
          "SIDEBAR TRAINER BACKEND RESPONSE:",
          error?.response?.data
        );

        /* =========================================
           FALLBACK TO LOCAL STORAGE
        ========================================= */

        const storedName =
          localStorage.getItem("trainerName");

        if (storedName && mounted) {
          setTrainerName(storedName);
        }
      }
    };

    loadTrainerProfile();

    return () => {
      mounted = false;
    };
  }, [role]);

  /* =======================================================
     FINAL DISPLAY NAMES
  ======================================================= */

  const finalInstituteName =
    instituteName || "Institute";

  const finalTrainerName =
    trainerName || "Trainer";

  /* =======================================================
     INITIALS
  ======================================================= */

  const instituteInitials =
    getInitials(
      finalInstituteName,
      "IN"
    );

  const trainerInitials =
    getInitials(
      finalTrainerName,
      "TR"
    );

  /* =======================================================
     MENU
  ======================================================= */

  const menuItems =
    role === "INSTITUTE"
      ? instituteMenuItems
      : role === "TRAINER"
      ? trainerMenuItems
      : adminMenuItems;

  /* =======================================================
     LOGOUT
  ======================================================= */

  const handleLogout = () => {
    localStorage.clear();

    window.location.href = "/";
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div
      className={`sidebar-hide-scrollbar h-screen overflow-y-auto flex flex-col glass-effect ${
        isSidebarOpen
          ? "px-4"
          : "px-2"
      } py-6`}
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >

      {/* =====================================================
          HEADER / LOGO
      ===================================================== */}

      <div className="flex items-center justify-between mb-8 px-2">

        {isSidebarOpen ? (

          <div className="flex items-center gap-3 min-w-0">

            {/* =================================================
                PROFILE INITIALS
            ================================================= */}

            <div className="w-10 h-10 flex-shrink-0 rounded-xl gradient-bg flex items-center justify-center">

              <span className="text-white font-bold text-sm">

                {role === "INSTITUTE"
                  ? instituteInitials
                  : role === "TRAINER"
                  ? trainerInitials
                  : "DP"}

              </span>

            </div>

            {/* =================================================
                PROFILE NAME
            ================================================= */}

            <span
              className="text-lg font-bold gradient-text truncate"
              title={
                role === "INSTITUTE"
                  ? finalInstituteName
                  : role === "TRAINER"
                  ? finalTrainerName
                  : "Admin"
              }
            >

              {role === "INSTITUTE"
                ? finalInstituteName
                : role === "TRAINER"
                ? finalTrainerName
                : "Admin"}

            </span>

          </div>

        ) : (

          /* =================================================
             COLLAPSED SIDEBAR
          ================================================= */

          <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center mx-auto">

            <span className="text-white font-bold text-sm">

              {role === "INSTITUTE"
                ? instituteInitials
                : role === "TRAINER"
                ? trainerInitials
                : "DP"}

            </span>

          </div>

        )}

        {/* =================================================
            MOBILE BUTTON
        ================================================= */}

        <button
          onClick={toggleMobileSidebar}
          className="lg:hidden p-2 rounded-lg hover:bg-white/10"
        >
          <HiX className="w-5 h-5" />
        </button>

        {/* =================================================
            DESKTOP BUTTON
        ================================================= */}

        <button
          onClick={toggleSidebar}
          className="hidden lg:block p-2 rounded-lg hover:bg-white/10"
        >
          <HiOutlineMenuAlt2 className="w-5 h-5" />
        </button>

      </div>

      {/* =====================================================
          MENU
      ===================================================== */}

      <nav className="flex-1 space-y-1">

        {menuItems.map((item) => {

          const Icon = item.icon;

          /* =================================================
             CHILD MENU
          ================================================= */

          if (item.children) {

            const menuKey =
              item.label.toLowerCase();

            const isOpen =
              openMenus[menuKey];

            return (
              <div
                key={item.label}
              >

                <button
                  onClick={() =>
                    setOpenMenus(
                      (prev) => ({
                        ...prev,
                        [menuKey]:
                          !prev[
                            menuKey
                          ],
                      })
                    )
                  }
                  className="w-full flex items-center justify-between px-3 py-3 rounded-xl text-white hover:text-white hover:bg-white/5"
                >

                  <div className="flex items-center gap-3">

                    <Icon className="w-5 h-5" />

                    {isSidebarOpen && (
                      <span className="font-medium text-sm">
                        {item.label}
                      </span>
                    )}

                  </div>

                  {isSidebarOpen &&
                    (isOpen ? (
                      <HiChevronDown />
                    ) : (
                      <HiChevronRight />
                    ))}

                </button>

                {isOpen &&
                  isSidebarOpen && (

                    <div className="ml-8 mt-1 space-y-1">

                      {item.children.map(
                        (child) => {

                          const isChildActive =
                            location.pathname ===
                            child.path;

                          return (
                            <NavLink
                              key={
                                child.path
                              }
                              to={
                                child.path
                              }
                              className={`block px-3 py-2 rounded-lg text-sm ${
                                isChildActive
                                  ? "bg-purple-600 text-white"
                                  : "text-white hover:bg-white/5 hover:text-white"
                              }`}
                            >
                              {child.label}
                            </NavLink>
                          );
                        }
                      )}

                    </div>

                  )}

              </div>
            );
          }

          /* =================================================
             NORMAL MENU ITEM
          ================================================= */

          const isActive =
            location.pathname ===
            item.path;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? "gradient-bg text-white shadow-lg shadow-purple-500/25"
                  : "text-white hover:text-white hover:bg-white/5"
              }`}
            >

              <Icon
                className={`w-5 h-5 ${
                  isActive
                    ? "text-white"
                    : "group-hover:text-neon-pink"
                }`}
              />

              {isSidebarOpen && (
                <span className="font-medium text-sm">
                  {item.label}
                </span>
              )}

            </NavLink>
          );
        })}

      </nav>

      {/* =====================================================
          LOGOUT
      ===================================================== */}

      <button
        onClick={handleLogout}
        className="w-full mt-4 px-3 py-3 rounded-xl bg-red-600 text-white hover:bg-red-700 transition-all text-sm font-semibold flex items-center justify-center gap-2"
      >

        <HiX className="w-4 h-4" />

        {isSidebarOpen &&
          "Logout"}

      </button>

    </div>
  );
}