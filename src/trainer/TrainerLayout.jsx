import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";

export default function TrainerLayout() {
  return (
    <div className="flex h-screen bg-background-dark">
      <div className="w-72 border-r border-white/10">
        <Sidebar role="TRAINER" />
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </div>
    </div>
  );
}