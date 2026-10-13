
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { useSidebar } from "../../context/SidebarContext";

export default function Header() {
  const { toggleMobileSidebar } = useSidebar();

  return (
    <header className="glass-effect border-b border-white/10 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left Side */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleMobileSidebar}
            className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <HiOutlineMenuAlt2 className="w-6 h-6" />
          </button>

      
        </div>
      </div>
    </header>
  );
}
