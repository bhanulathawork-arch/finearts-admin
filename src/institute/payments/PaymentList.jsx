// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import PaymentTable from "../../components/payments/PaymentTable";
// import PaymentFilter from "../../components/payments/PaymentFilter";
// import { getPaymentList, deletePayment, getInstituteBatches } from "../../services/paymentService";

// export default function PaymentList() {
//   const navigate = useNavigate();
//   const [payments, setPayments] = useState([]);
//   const [batches, setBatches] = useState([]);
//   const [filters, setFilters] = useState({});
//   const [loading, setLoading] = useState(true);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const data = await getPaymentList(filters);
//       setPayments(data);
//     } catch { toast.error("Failed"); } finally { setLoading(false); }
//   };

//   useEffect(() => { fetchData(); getInstituteBatches().then(setBatches).catch(()=>{}); }, [filters]);

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this payment record?")) return;
//     try { await deletePayment(id); toast.success("Deleted"); fetchData(); } catch { toast.error("Failed"); }
//   };

//   return (
//     <div className="p-8 text-white">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-4xl font-bold text-purple-400">Payment List</h1>
//         <button onClick={() => navigate("/institute/payments/collect")} className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold">+ Collect Payment</button>
//       </div>
//       <PaymentFilter filters={filters} setFilters={setFilters} batches={batches} />
//       <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-4">
//         <PaymentTable payments={payments} loading={loading} onView={(id) => navigate(`/institute/payments/history/${id}`)} onDelete={handleDelete} />
//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import PaymentTable from "../../components/payments/PaymentTable";
import PaymentFilter from "../../components/payments/PaymentFilter";

import {
  getPaymentList,
  deletePayment,
} from "../../services/paymentService";

import { getInstituteBatches } from "../../services/batchService";

export default function PaymentList() {
  const navigate = useNavigate();

  const [payments, setPayments] = useState([]);
  const [batches, setBatches] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);

      const paymentData = await getPaymentList(filters);
      setPayments(paymentData || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load payments");
    } finally {
      setLoading(false);
    }
  };

  const fetchBatches = async () => {
    try {
      const batchData = await getInstituteBatches();
      setBatches(batchData || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
    fetchBatches();
  }, [filters]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this payment record?")) return;

    try {
      await deletePayment(id);
      toast.success("Payment deleted");
      fetchData();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete payment");
    }
  };

  return (
    <div className="p-8 text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-purple-400">
          Payment List
        </h1>

        <button
          onClick={() => navigate("/institute/payments/collect")}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold"
        >
          + Collect Payment
        </button>
      </div>

      <PaymentFilter
        filters={filters}
        setFilters={setFilters}
        batches={batches}
      />

      <div className="mt-6 bg-[#151519] border border-[#2c2c35] rounded-2xl p-4">
        <PaymentTable
          payments={payments}
          loading={loading}
          onView={(id) =>
            navigate(`/institute/payments/history/${id}`)
          }
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}