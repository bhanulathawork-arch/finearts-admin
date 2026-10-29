

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  HiUserGroup,
  HiCalendar,
  HiAcademicCap,
  HiOfficeBuilding,
} from "react-icons/hi";

import StatCard from "../components/ui/StatCard";
import API from "../services/api";

export default function InstituteDashboard() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  /* =========================================================
     DASHBOARD STATS
  ========================================================= */

  const [stats, setStats] = useState({
    total_trainers: 0,
    total_classes: 0,
    total_students: 0,
    total_bookings: 0,
    total_sessions: 0,
    total_revenue: 0,
  });

  const [institute, setInstitute] = useState({
    name: "Institute",
    approval_status: "",
  });

  /* =========================================================
     FETCH DASHBOARD

     IMPORTANT:
     Do NOT manually read instituteToken/token here.

     The central API interceptor in ../services/api attaches
     the Firebase ID token to protected Institute requests.
  ========================================================= */

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const dashboardRes = await API.get(
        "/dashboard/institute"
      );

      console.log(
        "INSTITUTE DASHBOARD RESPONSE:",
        dashboardRes.data
      );

      /* =====================================================
         BACKEND RESPONSE:

         {
           success: true,
           data: {
             institute: {...},
             stats: {...},
             recent_bookings: [...]
           }
         }
      ===================================================== */

      const dashboardData =
        dashboardRes?.data?.data || {};

      /* =====================================================
         STATS
      ===================================================== */

      const dashboardStats =
        dashboardData?.stats || {};

      setStats({
        total_trainers:
          Number(
            dashboardStats.total_trainers || 0
          ),

        total_classes:
          Number(
            dashboardStats.total_classes || 0
          ),

        total_students:
          Number(
            dashboardStats.total_students || 0
          ),

        total_bookings:
          Number(
            dashboardStats.total_bookings || 0
          ),

        total_sessions:
          Number(
            dashboardStats.total_sessions || 0
          ),

        total_revenue:
          Number(
            dashboardStats.total_revenue || 0
          ),
      });

      /* =====================================================
         INSTITUTE INFORMATION
      ===================================================== */

      setInstitute({
        name:
          dashboardData?.institute?.name ||
          "Institute",

        approval_status:
          dashboardData?.institute?.approval_status ||
          "",
      });

    } catch (err) {
      console.error(
        "INSTITUTE DASHBOARD ERROR:",
        err
      );

      console.error(
        "BACKEND RESPONSE:",
        err?.response?.data
      );

      /*
       * Do not show "Authentication token missing"
       * from this component.
       *
       * Authentication is handled centrally by api.js.
       */

      toast.error(
        err?.response?.data?.message ||
        err?.message ||
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     LOAD DASHBOARD
  ========================================================= */

  useEffect(() => {
    let mounted = true;

    const loadDashboard = async () => {
      if (!mounted) return;

      await fetchDashboard();
    };

    loadDashboard();

    return () => {
      mounted = false;
    };
  }, []);

  /* =========================================================
     STAT CARDS
  ========================================================= */

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

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <div className="min-h-full p-6 text-white">
        <div className="animate-pulse">
          Loading Dashboard...
        </div>
      </div>
    );
  }

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="space-y-6 animate-slide-up">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div>
                <h1 className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-500 bg-clip-text text-4xl font-extrabold text-transparent sm:text-4xl">

  Dashboard
</h1>

        <p className="text-white mt-1">
          Welcome back{" "}
          {institute.name &&
          institute.name !== "Institute"
            ? institute.name
            : "Institute"}
        </p>
      </div>

      {/* =====================================================
          STATISTICS
      ===================================================== */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {statCards.map((card) => (
          <StatCard
            key={card.title}
            title={card.title}
            value={card.value}
            icon={card.icon}
            color={card.color}
            onClick={() =>
              navigate(card.path)
            }
          />
        ))}

      </div>

    </div>
  );
}
