import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";

export default function TrainerLayout() {
  return (
    <div className="flex h-screen bg-background-dark">
      {/* TRAINER SIDEBAR */}
      <div className="w-56 shrink-0 border-r border-white/10">
        <Sidebar role="TRAINER" />
      </div>

      {/* TRAINER CONTENT */}
      <main className="flex-1 overflow-y-auto">
        <div className="min-h-full p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}