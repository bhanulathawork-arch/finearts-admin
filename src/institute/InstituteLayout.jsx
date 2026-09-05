// import { Outlet } from "react-router-dom";

// import Sidebar from "../components/layout/Sidebar";
// import Header from "../components/layout/Header";

// export default function InstituteLayout() {
//   return (
//     <div className="flex h-screen bg-background-dark">
//       <Sidebar role="INSTITUTE" />

//       <div className="flex-1 flex flex-col">
//         <Header />

//         <main className="flex-1 overflow-auto p-6">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }


// import { Outlet } from "react-router-dom";
// import Sidebar from "../components/layout/Sidebar";
// import Header from "../components/layout/Header";
// import { useSidebar } from "../context/SidebarContext";

// export default function InstituteLayout() {
//   const { isSidebarOpen, isMobileSidebarOpen } = useSidebar();

//   return (
//     <div className="flex h-screen overflow-hidden">
//       {/* Desktop Sidebar */}
//       <aside
//         className={`hidden lg:block transition-all duration-300 ${
//           isSidebarOpen ? "w-64" : "w-20"
//         }`}
//       >
//         <Sidebar role="INSTITUTE" />
//       </aside>

//       {/* Mobile Sidebar */}
//       {isMobileSidebarOpen && (
//         <div className="fixed inset-0 z-50 lg:hidden">
//           <div className="fixed inset-0 bg-black/60" />
//           <aside className="fixed left-0 top-0 h-full w-64 z-50">
//             <Sidebar role="INSTITUTE" />
//           </aside>
//         </div>
//       )}

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Header />

//         <main className="flex-1 overflow-y-auto p-6 bg-background-dark">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }




import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import { useSidebar } from "../context/SidebarContext";

export default function InstituteLayout() {
  const {
    isSidebarOpen,
    isMobileSidebarOpen,
  } = useSidebar();

  const location = useLocation();

  /*
   * Website preview should use the full available
   * content area without the normal admin page padding.
   */
  const isWebsitePreview =
    location.pathname === "/institute/website/preview";

  return (
    <div className="flex h-screen overflow-hidden">
      {/* =====================================================
          DESKTOP SIDEBAR
      ===================================================== */}
      <aside
        className={`hidden lg:block transition-all duration-300 ${
          isSidebarOpen
            ? "w-64"
            : "w-20"
        }`}
      >
        <Sidebar role="INSTITUTE" />
      </aside>

      {/* =====================================================
          MOBILE SIDEBAR
      ===================================================== */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Overlay */}
          <div className="fixed inset-0 bg-black/60" />

          {/* Sidebar */}
          <aside className="fixed left-0 top-0 h-full w-64 z-50">
            <Sidebar role="INSTITUTE" />
          </aside>
        </div>
      )}

      {/* =====================================================
          MAIN AREA
      ===================================================== */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Admin Header */}
        <Header />

        {/* ===================================================
            CONTENT AREA

            Normal admin pages:
              - padding
              - dark background

            Website preview:
              - NO padding
              - NO dark background
              - full available width
        =================================================== */}
        <main
          className={
            isWebsitePreview
              ? "flex-1 overflow-y-auto overflow-x-hidden p-0 m-0 bg-white"
              : "flex-1 overflow-y-auto p-6 bg-background-dark"
          }
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}