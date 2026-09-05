import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useSidebar } from "../../context/SidebarContext";

export default function Layout() {
  const { isSidebarOpen, isMobileSidebarOpen } = useSidebar();

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:block transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <Sidebar />
      </aside>

      {/* Mobile Sidebar */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/60" onClick={() => {}} />
          <aside className="fixed left-0 top-0 h-full w-64 z-50">
            <Sidebar />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 bg-background-dark">
          <Outlet />
        </main>
      </div>
    </div>
  );
}


