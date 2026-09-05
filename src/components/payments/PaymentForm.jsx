import { useState, useEffect } from "react";
import { searchStudentByMobile } from "../../services/studentService";
import { getInstituteBatches } from "../../services/batchService";
import toast from "react-hot-toast";

export default function PaymentForm({ onSubmit, loading }) {
  const [step, setStep] = useState(1); // 1: Search, 2: Pay
  const [mobile, setMobile] = useState("");
  const [student, setStudent] = useState(null);
  const [batches, setBatches] = useState([]);
  const [form, setForm] = useState({ batch_id: "", total_amount: "", discount: "", paid_amount: "", payment_method: "CASH", transaction_id: "", remarks: "", next_due_date: "" });

  useEffect(() => { getInstituteBatches().then(setBatches).catch(() => {}); }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (mobile.length !== 10) return toast.error("Invalid number");
    try {
      const res = await searchStudentByMobile(mobile);
      if (res.data.registrations.length === 0) return toast.error("No active student found");
      setStudent({ id: res.data.registrations[0].student.id, name: res.data.user.full_name, mobile: res.data.account.phone_number });
      setStep(2);
    } catch (err) { toast.error(err.response?.data?.message || "Not found"); }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!student) return;
    if (parseFloat(form.paid_amount) <= 0) return toast.error("Paid amount must be > 0");
    onSubmit({ student_id: student.id, ...form });
  };

  const inputClass = "w-full mt-1 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 text-sm";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {step === 1 ? (
        <div>
          <label className="block text-sm text-white mb-2">Search Student by Mobile</label>
          <div className="flex gap-3">
            <input value={mobile} onChange={e => setMobile(e.target.value.replace(/[^0-9]/g, "").slice(0, 10))} placeholder="10-digit number" className={inputClass} />
            <button type="button" onClick={handleSearch} className="px-6 py-3 bg-purple-500 text-white rounded-xl font-semibold hover:bg-purple-600">Search</button>
          </div>
        </div>
      ) : (
        <>
          <div className="bg-[#2b2638] p-4 rounded-xl flex justify-between items-center">
            <div>
              <p className="text-white font-bold">{student.name}</p>
              <p className="text-gray-400 text-sm">{student.mobile}</p>
            </div>
            <button type="button" onClick={() => { setStep(1); setStudent(null); }} className="text-purple-400 text-sm hover:underline">Change</button>
          </div>

          <div>
            <label className="block text-sm text-white mb-2">Select Batch *</label>
            <select value={form.batch_id} onChange={e => setForm({...form, batch_id: e.target.value})} className={inputClass} required>
              <option value="">Select Batch</option>
              {batches.map(b => <option key={b.id} value={b.id}>{b.batch_name}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm text-white mb-2">Total Fee *</label><input type="number" step="0.01" value={form.total_amount} onChange={e => setForm({...form, total_amount: e.target.value})} className={inputClass} required /></div>
            <div><label className="block text-sm text-white mb-2">Discount</label><input type="number" step="0.01" value={form.discount} onChange={e => setForm({...form, discount: e.target.value})} className={inputClass} /></div>
            <div><label className="block text-sm text-white mb-2">Paying Now *</label><input type="number" step="0.01" value={form.paid_amount} onChange={e => setForm({...form, paid_amount: e.target.value})} className={inputClass} required /></div>
            <div><label className="block text-sm text-white mb-2">Payment Method</label>
              <select value={form.payment_method} onChange={e => setForm({...form, payment_method: e.target.value})} className={inputClass}>
                <option value="CASH">Cash</option><option value="UPI">UPI</option><option value="CARD">Card</option><option value="BANK">Bank Transfer</option>
              </select>
            </div>
          </div>

          <div><label className="block text-sm text-white mb-2">Transaction ID</label><input value={form.transaction_id} onChange={e => setForm({...form, transaction_id: e.target.value})} className={inputClass} placeholder="Optional" /></div>
          <div><label className="block text-sm text-white mb-2">Next Due Date</label><input type="date" value={form.next_due_date} onChange={e => setForm({...form, next_due_date: e.target.value})} className={inputClass} /></div>
          <div><label className="block text-sm text-white mb-2">Remarks</label><textarea rows="2" value={form.remarks} onChange={e => setForm({...form, remarks: e.target.value})} className={inputClass} /></div>

          <button type="submit" disabled={loading} className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg disabled:opacity-50">
            {loading ? "Processing..." : "Collect Payment"}
          </button>
        </>
      )}
    </form>
  );
}