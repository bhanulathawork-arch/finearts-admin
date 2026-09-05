// import { HiTrendingUp, HiTrendingDown } from "react-icons/hi";

// export default function StatCard({
//   title,
//   value,
//   change,
//   changeType,
//   icon: Icon,
//   color,
// }) {
//   const colorClasses = {
//     purple: "from-purple-500/20 to-pink-500/20 border-purple-500/30",
//     pink: "from-pink-500/20 to-rose-500/20 border-pink-500/30",
//     gold: "from-yellow-500/20 to-orange-500/20 border-yellow-500/30",
//     blue: "from-blue-500/20 to-cyan-500/20 border-blue-500/30",
//     green: "from-green-500/20 to-emerald-500/20 border-green-500/30",
//   };

//   const iconColors = {
//     purple: "text-purple-400",
//     pink: "text-pink-400",
//     gold: "text-yellow-400",
//     blue: "text-blue-400",
//     green: "text-green-400",
//   };

//   return (
//     <div
//       className={`glass-effect rounded-2xl p-6 card-glow border ${colorClasses[color]}`}
//     >
//       <div className="flex items-start justify-between mb-4">
//         <div
//           className={`p-3 rounded-xl bg-gradient-to-br ${colorClasses[color]}`}
//         >
//           <Icon className={`w-6 h-6 ${iconColors[color]}`} />
//         </div>
//         {change && (
//           <div
//             className={`flex items-center gap-1 text-sm font-medium ${
//               changeType === "positive" ? "text-green-400" : "text-red-400"
//             }`}
//           >
//             {changeType === "positive" ? (
//               <HiTrendingUp className="w-4 h-4" />
//             ) : (
//               <HiTrendingDown className="w-4 h-4" />
//             )}
//             {change}
//           </div>
//         )}
//       </div>

//       <h3 className="text-3xl font-bold mb-1">{value}</h3>
//       <p className="text-sm text-white">{title}</p>
//     </div>
//   );
// }



import { HiTrendingUp, HiTrendingDown } from "react-icons/hi";

export default function StatCard({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  color,
  onClick, // <-- Add this
}) {
  const colorClasses = {
    purple: "from-purple-500/20 to-pink-500/20 border-purple-500/30",
    pink: "from-pink-500/20 to-rose-500/20 border-pink-500/30",
    gold: "from-yellow-500/20 to-orange-500/20 border-yellow-500/30",
    blue: "from-blue-500/20 to-cyan-500/20 border-blue-500/30",
    green: "from-green-500/20 to-emerald-500/20 border-green-500/30",
  };

  const iconColors = {
    purple: "text-purple-400",
    pink: "text-pink-400",
    gold: "text-yellow-400",
    blue: "text-blue-400",
    green: "text-green-400",
  };

  return (
    <div
      onClick={onClick}
      className={`glass-effect rounded-2xl p-6 card-glow border ${
        colorClasses[color]
      } cursor-pointer hover:scale-[1.02] hover:shadow-xl transition-all duration-300`}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className={`p-3 rounded-xl bg-gradient-to-br ${colorClasses[color]}`}
        >
          <Icon className={`w-6 h-6 ${iconColors[color]}`} />
        </div>

        {change && (
          <div
            className={`flex items-center gap-1 text-sm font-medium ${
              changeType === "positive"
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {changeType === "positive" ? (
              <HiTrendingUp className="w-4 h-4" />
            ) : (
              <HiTrendingDown className="w-4 h-4" />
            )}
            {change}
          </div>
        )}
      </div>

      <h3 className="text-3xl font-bold mb-1">{value}</h3>

      <p className="text-sm text-white">{title}</p>
    </div>
  );
}