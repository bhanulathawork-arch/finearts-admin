
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { getAuth } from "firebase/auth";

import {
  HiUserGroup,
  HiCalendar,
  HiAcademicCap,
} from "react-icons/hi";

import StatCard from "../components/ui/StatCard";

// const API_URL = "https://finearts-backend.onrender.com/api/dashboard";

const API_URL = "http://localhost:5000/api/dashboard";

export default function TrainerDashboard() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    total_classes: 0,
    total_sessions: 0,
    total_bookings: 0,
  });

  /* ===========================
      AUTH CONFIG (Trainer - Firebase)
  =========================== */

  const getConfig = async () => {
    const auth = getAuth();
    let token = null;

    if (auth.currentUser) {
      token = await auth.currentUser.getIdToken(true);
    } else {
      token = localStorage.getItem("token");
    }

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

      const config = await getConfig();

      const [dashboardRes] = await Promise.allSettled([
        axios.get(`${API_URL}/trainer`, config),
      ]);

      if (dashboardRes.status === "fulfilled") {
        setStats(dashboardRes.value.data.data);
      }

      if (dashboardRes.status === "rejected") {
        toast.error("Failed to load dashboard");
      }
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
      STAT CARDS (Trainer Specific)
  =========================== */

  const statCards = [
    {
      title: "Total Classes",
      value: stats.total_classes,
      icon: HiAcademicCap,
      color: "blue",
      path: "/trainer/classes",
    },
    {
      title: "Total Sessions",
      value: stats.total_sessions,
      icon: HiCalendar,
      color: "pink",
      path: "/trainer/sessions",
    },
    {
      title: "Total Bookings",
      value: stats.total_bookings,
      icon: HiUserGroup,
      color: "green",
      path: "/trainer/bookings",
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
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-300 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
          Dashboard
        </h1>

        <p className="text-white mt-1">
          Welcome back Trainer
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