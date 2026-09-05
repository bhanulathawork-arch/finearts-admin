import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, IndianRupee } from "lucide-react";
import toast from "react-hot-toast";
import ReceiptModal from "../../components/payments/ReceiptModal";
import { getStudentHistory } from "../../services/paymentService";

export default function PaymentHistory() {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStudentHistory(studentId).then(setData).catch(() => toast.error("Not found")).finally(() => setLoading(false));
  }, [studentId]);

  if (loading) return <div className="p-8 text-white">Loading...</div>;
  if (!data) return <div className="p-8 text-red-400">Payment history not found.</div>;

  return (
    <div className="p-8 text-white">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="p-2 rounded-xl hover:bg-[#2a2a35] text-gray-400 hover:text-white"><ArrowLeft size={24} /></button>
        <div>
          <h1 className="text-3xl font-bold">{data.payments.full_name}</h1>
          <p className="text-gray-400">{data.payments.phone_number} • {data.payments.batch_name}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-5 text-center">
          <IndianRupee className="mx-auto text-gray-500 mb-2" size={24} />
          <p className="text-gray-400 text-xs">Total Fee</p>
          <p className="text-white text-2xl font-bold">₹{data.payments.total_amount}</p>
        </div>
        <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-5 text-center">
          <p className="text-gray-400 text-xs">Paid</p>
          <p className="text-green-400 text-2xl font-bold">₹{data.payments.paid_amount}</p>
        </div>
        <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-5 text-center">
          <p className="text-gray-400 text-xs">Due</p>
          <p className="text-red-400 text-2xl font-bold">₹{data.payments.due_amount}</p>
        </div>
        <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-5 text-center">
          <p className="text-gray-400 text-xs">Discount</p>
          <p className="text-yellow-400 text-2xl font-bold">₹{data.payments.discount}</p>
        </div>
      </div>

      <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4">Transaction Timeline</h2>
        <div className="space-y-4">
          {data.transactions.map((t) => (
            <div key={t.id} className="flex items-center justify-between border-b border-[#2c2c35] pb-4 cursor-pointer hover:bg-[#1a1a20] p-2 rounded-lg" onClick={() => setReceipt(t)}>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold text-sm">₹</div>
                <div>
                  <p className="text-white font-medium">₹{Number(t.amount).toLocaleString()}</p>
                  <p className="text-gray-500 text-xs">{t.payment_date} • {t.method || 'Cash'}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-purple-400 text-sm font-mono cursor-pointer hover:underline">{t.receipt_number}</p>
                {t.remarks && <p className="text-gray-600 text-xs mt-1">{t.remarks}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <ReceiptModal isOpen={!!receipt} onClose={() => setReceipt(null)} receipt={receipt} />
    </div>
  );
}