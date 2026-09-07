// import { useEffect, useState } from "react";
// import { getTrainerDashboard, getTrainerTodaySessions, getMyNotifications } from "../services/trainerApi";

// const StatCard = ({ label, value, icon, color }) => (
//   <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center gap-4">
//     <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${color}`}>{icon}</div>
//     <div>
//       <p className="text-white/50 text-sm">{label}</p>
//       <p className="text-white text-2xl font-bold">{value ?? "—"}</p>
//     </div>
//   </div>
// );

// export default function TrainerDashboard() {
//   const [stats, setStats] = useState(null);
//   const [todaySessions, setTodaySessions] = useState([]);
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const trainer = JSON.parse(localStorage.getItem("trainer") || "{}");

//   useEffect(() => {
//     Promise.all([
//       getTrainerDashboard().catch(() => ({ data: { data: {} } })),
//       getTrainerTodaySessions().catch(() => ({ data: { data: [] } })),
//       getMyNotifications().catch(() => ({ data: { data: [] } })),
//     ]).then(([dashRes, todayRes, notifRes]) => {
//       setStats(dashRes.data.data);
//       setTodaySessions(Array.isArray(todayRes.data.data) ? todayRes.data.data : []);
//       setNotifications(Array.isArray(notifRes.data.data) ? notifRes.data.data.slice(0, 5) : []);
//     }).finally(() => setLoading(false));
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6 text-white">
//       {/* Greeting */}
//       <div>
//         <h1 className="text-2xl font-bold">
//           Welcome back, {trainer?.trainer?.full_name || trainer?.full_name || "Trainer"} 👋
//         </h1>
//         <p className="text-white/40 text-sm mt-1">Here's your overview for today</p>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//         <StatCard label="Total Classes" value={stats?.total_classes} icon="🎯" color="bg-purple-500/20 text-purple-400" />
//         <StatCard label="Total Bookings" value={stats?.total_bookings} icon="📅" color="bg-blue-500/20 text-blue-400" />
//         <StatCard label="Total Students" value={stats?.total_students} icon="👥" color="bg-green-500/20 text-green-400" />
//       </div>

//       {/* Today's Sessions */}
//       <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
//         <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
//           <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
//           Today's Sessions
//         </h2>

//         {todaySessions.length === 0 ? (
//           <div className="text-white/30 text-sm py-4 text-center">No sessions scheduled for today</div>
//         ) : (
//           <div className="space-y-3">
//             {todaySessions.map((s) => (
//               <div key={s.id} className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-3">
//                 <div>
//                   <p className="text-white text-sm font-medium">{s.class_title || s.title || "Session"}</p>
//                   <p className="text-white/40 text-xs mt-0.5">{new Date(s.date_time || s.session_date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
//                 </div>
//                 {s.zoom_link && (
//                   <a
//                     href={s.zoom_link}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="text-xs bg-blue-600 hover:bg-blue-500 px-3 py-1.5 rounded-lg text-white transition"
//                   >
//                     Join Zoom
//                   </a>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Notifications */}
//       <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
//         <h2 className="text-white font-semibold mb-4">Recent Notifications</h2>
//         {notifications.length === 0 ? (
//           <div className="text-white/30 text-sm py-4 text-center">No notifications yet</div>
//         ) : (
//           <div className="space-y-3">
//             {notifications.map((n) => (
//               <div key={n.id} className={`flex gap-3 p-3 rounded-xl ${n.is_read ? "opacity-50" : "bg-purple-500/10 border border-purple-500/20"}`}>
//                 <span className="text-purple-400 mt-0.5">🔔</span>
//                 <div>
//                   <p className="text-white text-sm font-medium">{n.title}</p>
//                   <p className="text-white/40 text-xs">{n.message}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

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

const API_URL = "https://finearts-backend.onrender.com/api/dashboard";

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
        <h1 className="text-3xl font-bold gradient-text">
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