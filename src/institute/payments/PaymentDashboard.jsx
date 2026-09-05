import { useState, useEffect } from "react";
import { IndianRupee, Users, Clock, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";
import PaymentCard from "../../components/payments/PaymentCard";
import { getPaymentDashboard } from "../../services/paymentService";

export default function PaymentDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPaymentDashboard().then(setData).catch(() => toast.error("Failed to load")).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-8 text-white">Loading...</div>;

  return (
    <div className="p-8 text-white space-y-8">
      <h1 className="text-4xl font-bold text-purple-400">Payment Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <PaymentCard title="Today's Collection" value={data?.stats.today_collection} icon={IndianRupee} color="purple" />
        <PaymentCard title="Monthly Collection" value={data?.stats.monthly_collection} icon={IndianRupee} color="green" />
        <PaymentCard title="Pending Fees" value={data?.stats.total_pending} icon={AlertCircle} color="red" />
        <PaymentCard title="Paid Students" value={data?.stats.paid_students} icon={Users} color="blue" />
        <PaymentCard title="Pending Students" value={data?.stats.pending_students} icon={Clock} color="yellow" />
      </div>

      <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4">Recent Payments</h2>
        <div className="space-y-3">
          {data?.recent_payments.map((r, i) => (
            <div key={i} className="flex items-center justify-between bg-[#1a1a20] p-3 rounded-xl">
              <div>
                <p className="text-white font-medium">{r.full_name}</p>
                <p className="text-gray-500 text-xs">{r.batch_name} • {r.payment_date}</p>
              </div>
              <div className="text-right">
                <p className="text-green-400 font-bold">₹{Number(r.amount).toLocaleString()}</p>
                <p className="text-gray-500 text-xs uppercase">{r.method || 'Cash'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}