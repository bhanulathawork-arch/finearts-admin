

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import {
  HiUsers,
  HiUserGroup,
  HiCalendar,
  HiAcademicCap,
  HiOfficeBuilding,
} from "react-icons/hi";

import StatCard from "../components/ui/StatCard";

const API_URL = "http://localhost:5000/api/dashboard";

export default function InstituteDashboard() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    total_trainers: 0,
    total_classes: 0,
    total_students: 0,
    total_bookings: 0,
    total_sessions: 0,
  });

  const [bookingSummary, setBookingSummary] = useState([]);
  const [usersSummary, setUsersSummary] = useState([]);

  /* ===========================
      AUTH CONFIG (Institute)
  =========================== */
  const getConfig = () => {
  const token =
    localStorage.getItem("instituteToken") ||
    localStorage.getItem("token");

  if (!token) {
    throw new Error("Authentication token missing");
  }

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

  /* ===========================
      FETCH DASHBOARD
  =========================== */

  const fetchDashboard = async () => {
  try {
    setLoading(true);

    const config = getConfig();
const dashboardRes = await axios.get(
  `${API_URL}/institute`,
  config
);

    setStats(dashboardRes.data.data);

  } catch (err) {
    console.error(err);
    toast.error(err.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchDashboard();
  }, []);

  /* ===========================
      STAT CARDS (Institute Specific)
  =========================== */

  const statCards = [
    {
      title: "Total Trainers",
      value: stats.total_trainers,
      icon: HiUserGroup,
      color: "blue",
      path: "/institute/trainers",
    },
    {
      title: "Total Classes",
      value: stats.total_classes,
      icon: HiAcademicCap,
      color: "pink",
      path: "/institute/classes",
    },

    {
      title: "Total Bookings",
      value: stats.total_bookings,
      icon: HiCalendar,
      color: "green",
      path: "/institute/bookings",
    },
    {
      title: "Total Sessions",
      value: stats.total_sessions,
      icon: HiOfficeBuilding,
      color: "gold",
      path: "/institute/sessions",
    },
  ];

  if (loading) {
    return (
      <div className="p-6 text-white">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-slide-up">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold gradient-text">
          Dashboard
        </h1>

        <p className="text-white mt-1">
          Welcome back Institute
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {statCards.map((card) => (
          <StatCard
            key={card.title}
            title={card.title}
            value={card.value}
            icon={card.icon}
            color={card.color}
            onClick={() => navigate(card.path)}
          />
        ))}

      </div>

    </div>
  );
}