
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// import PaymentTable from "../../components/payments/PaymentTable";
// import PaymentFilter from "../../components/payments/PaymentFilter";

// import {
//   getPaymentList,
//   deletePayment,
// } from "../../services/paymentService";

// import { getInstituteBatches } from "../../services/batchService";

// export default function PaymentList() {
//   const navigate = useNavigate();

//   const [payments, setPayments] = useState([]);
//   const [batches, setBatches] = useState([]);
//   const [filters, setFilters] = useState({});
//   const [loading, setLoading] = useState(true);

//   const fetchData = async () => {
//     try {
//       setLoading(true);

//       const paymentData = await getPaymentList(filters);
//       setPayments(paymentData || []);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to load payments");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchBatches = async () => {
//     try {
//       const batchData = await getInstituteBatches();
//       setBatches(batchData || []);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//     fetchBatches();
//   }, [filters]);

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this payment record?")) return;

//     try {
//       await deletePayment(id);
//       toast.success("Payment deleted");
//       fetchData();
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to delete payment");
//     }
//   };

//   return (
//     <div className="p-8 text-white">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-4xl font-bold text-purple-400">
//           Payment List
//         </h1>

//         <button
//           onClick={() => navigate("/institute/payments/collect")}
//           className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold"
//         >
//           + Collect Payment
//         </button>
//       </div>

//       <PaymentFilter
//         filters={filters}
//         setFilters={setFilters}
//         batches={batches}
//       />

//       <div className="mt-6 bg-[#151519] border border-[#2c2c35] rounded-2xl p-4">
//         <PaymentTable
//           payments={payments}
//           loading={loading}
//           onView={(id) =>
//             navigate(`/institute/payments/history/${id}`)
//           }
//           onDelete={handleDelete}
//         />
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
    <div className="w-full min-w-0 text-white">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-500 bg-clip-text text-4xl font-extrabold text-transparent sm:text-4xl">
          Payment List
        </h1>

        <button
          type="button"
          onClick={() => navigate("/institute/payments/collect")}
          className="inline-flex w-fit items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 font-bold transition-all duration-200 hover:from-purple-600 hover:to-pink-600"
        >
          + Collect Payment
        </button>
      </div>

      <PaymentFilter
        filters={filters}
        setFilters={setFilters}
        batches={batches}
      />

      <div className="mt-5 rounded-2xl border border-[#2c2c35] bg-[#151519] p-4">
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
