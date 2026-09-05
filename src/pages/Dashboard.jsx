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

export default function Dashboard() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    total_users: 0,
    total_trainers: 0,
    total_institutes: 0,
    total_classes: 0,
    total_bookings: 0,
  });

  const [bookingSummary, setBookingSummary] = useState([]);
  const [usersSummary, setUsersSummary] = useState([]);

  /* ===========================
      AUTH CONFIG
  =========================== */

  const getConfig = () => {
    const token = localStorage.getItem("adminToken");

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

      const [
        dashboardRes,
        bookingRes,
        usersRes,
      ] = await Promise.allSettled([
        axios.get(`${API_URL}/admin`, config),
        axios.get(`${API_URL}/admin/bookings-summary`, config),
        axios.get(`${API_URL}/admin/users-summary`, config),
      ]);

      if (dashboardRes.status === "fulfilled") {
        setStats(dashboardRes.value.data.data);
      }

      if (bookingRes.status === "fulfilled") {
        setBookingSummary(bookingRes.value.data.data || []);
      }

      if (usersRes.status === "fulfilled") {
        setUsersSummary(usersRes.value.data.data || []);
      }

      if (
        dashboardRes.status === "rejected" &&
        bookingRes.status === "rejected" &&
        usersRes.status === "rejected"
      ) {
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
      STAT CARDS
  =========================== */

  const statCards = [
    {
      title: "Total Institutes",
      value: stats.total_institutes,
      icon: HiOfficeBuilding,
      color: "blue",
      path: "/institutes",
    },
    {
      title: "Total Trainers",
      value: stats.total_trainers,
      icon: HiUserGroup,
      color: "pink",
      path: "/trainers",
    },
    {
      title: "Total Students",
      value: stats.total_users,
      icon: HiUsers,
      color: "purple",
      path: "/students",
    },
    {
      title: "Total Classes",
      value: stats.total_classes,
      icon: HiAcademicCap,
      color: "green",
      path: "/classes",
    },
    {
      title: "Total Bookings",
      value: stats.total_bookings,
      icon: HiCalendar,
      color: "gold",
      path: "/bookings",
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
          Welcome back Admin
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