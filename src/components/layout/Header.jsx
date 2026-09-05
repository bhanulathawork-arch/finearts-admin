import { useSelector } from "react-redux";
import {
  HiOutlineBell,
  HiOutlineSearch,
  HiOutlineMenuAlt2,
} from "react-icons/hi";
import { useSidebar } from "../../context/SidebarContext";


export default function Header() {
  const { user } = useSelector((state) => state.auth);
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

          {/* Search Bar */}
          {/* <div className="hidden md:flex items-center gap-2 bg-white/5 rounded-xl px-4 py-2.5 w-80 border border-white/10 focus-within:border-primary-purple/50 transition-colors">
            <HiOutlineSearch className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search anything..."
              className="bg-transparent border-none outline-none text-sm text-white placeholder-gray-500 w-full"
            />
          </div> */}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          {/* <button className="relative p-2.5 rounded-xl hover:bg-white/10 transition-colors group">
            <HiOutlineBell className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-neon-pink rounded-full border-2 border-background-dark" />
          </button> */}

          {/* User Avatar */}
          <div className="flex items-center gap-3 pl-4 border-l border-white/10">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center cursor-pointer hover:shadow-lg hover:shadow-purple-500/25 transition-all">
              <span className="text-white font-semibold text-sm">
                {user?.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </span>
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-gray-400 capitalize">
                {user?.role?.replace("_", " ")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

