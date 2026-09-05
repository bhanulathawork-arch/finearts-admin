import { IndianRupee } from "lucide-react"; // or DollarSign based on locale

export default function PaymentCard({ title, value, icon: Icon, color = "purple" }) {
  const colors = {
    purple: "from-purple-500/20 to-purple-600/10 border-purple-500/20",
    green: "from-green-500/20 to-green-600/10 border-green-500/20",
    red: "from-red-500/20 to-red-600/10 border-red-500/20",
    blue: "from-blue-500/20 to-blue-600/10 border-blue-500/20",
    yellow: "from-yellow-500/20 to-yellow-600/10 border-yellow-500/20"
  };

  return (
    <div className={`bg-gradient-to-br ${colors[color]} border rounded-2xl p-5 flex flex-col justify-between h-full`}>
      <p className="text-gray-400 text-sm">{title}</p>
      <div className="flex items-center justify-between mt-3">
        <h2 className="text-2xl font-bold text-white">₹{Number(value || 0).toLocaleString()}</h2>
        {Icon && <Icon size={24} className="text-white/50" />}
      </div>
    </div>
  );
}