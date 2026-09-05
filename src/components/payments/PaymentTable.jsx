// import { Eye, Trash2 } from "lucide-react";


// const StatusBadge = ({ status }) => {
//   const c = status === 'PAID' ? 'bg-green-500/20 text-green-400' : status === 'PARTIAL' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400';
//   return <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${c}`}>{status}</span>;
// };

// export default function PaymentTable({ payments, onView, onDelete }) {
//   if (!payments?.length) return <div className="text-center py-12 text-gray-500">No payments found.</div>;
//   return (
//     <div className="overflow-x-auto">
//       <table className="w-full">
//         <thead className="bg-[#202027] text-white text-sm">
//           <tr>
//             <th className="p-4 text-left">Student</th>
//             <th className="p-4 text-left">Batch</th>
//             <th className="p-4 text-left">Total</th>
//             <th className="p-4 text-left">Paid</th>
//             <th className="p-4 text-left">Due</th>
//             <th className="p-4 text-left">Status</th>
//             <th className="p-4 text-left">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {payments.map((p) => (
//             <tr key={p.id} className="border-t border-[#2c2c35] hover:bg-[#1a1a20] transition-colors">
//               <td className="p-4"><div className="text-white font-medium">{p.student_name}</div><div className="text-gray-500 text-xs">{p.phone_number}</div></td>
//               <td className="p-4 text-gray-300">{p.batch_name}</td>
//               <td className="p-4 text-white">₹{p.total_amount}</td>
//               <td className="p-4 text-green-400">₹{p.paid_amount}</td>
//               <td className="p-4 text-red-400">₹{p.due_amount}</td>
//               <td className="p-4"><StatusBadge status={p.payment_status} /></td>
//               <td className="p-4 flex gap-2">
//                 <button onClick={() => onView(p.student_id)} className="p-2 rounded-lg hover:bg-[#2a2a35] text-gray-400 hover:text-white"><Eye size={16} /></button>
//                 <button onClick={() => onDelete(p.id)} className="p-2 rounded-lg hover:bg-red-500/10 text-red-500/70 hover:text-red-400"><Trash2 size={16} /></button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }


import { Eye, Trash2 } from "lucide-react";

const getStatusBadge = (status) => {
  switch (status) {
    case "PAID":
      return "bg-green-500/20 text-green-400";

    case "PARTIAL":
      return "bg-yellow-500/20 text-yellow-400";

    case "PENDING":
      return "bg-red-500/20 text-red-400";

    default:
      return "bg-gray-500/20 text-gray-300";
  }
};

export default function PaymentTable({
  payments = [],
  onView,
  onDelete,
}) {
  if (payments.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No payments found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-[#202027] text-white text-sm">
          <tr>
            <th className="p-4 text-left">Student</th>
            <th className="p-4 text-left">Batch</th>
            <th className="p-4 text-left">Total</th>
            <th className="p-4 text-left">Paid</th>
            <th className="p-4 text-left">Due</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {payments.map((p) => (
            <tr
              key={p.id}
              className="border-t border-[#2c2c35] hover:bg-[#1a1a20] transition-colors"
            >
              <td className="p-4">
                <div className="text-white font-medium">
                  {p.student_name}
                </div>
                <div className="text-xs text-gray-400">
                  {p.phone_number}
                </div>
              </td>

              <td className="p-4 text-gray-300">
                {p.batch_name}
              </td>

              <td className="p-4 text-white">
                ₹{p.total_amount}
              </td>

              <td className="p-4 text-green-400">
                ₹{p.paid_amount}
              </td>

              <td className="p-4 text-red-400">
                ₹{p.due_amount}
              </td>

              <td className="p-4">
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusBadge(
                    p.payment_status
                  )}`}
                >
                  {p.payment_status}
                </span>
              </td>

              <td className="p-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onView(p.student_id)}
                    className="p-2 rounded-lg hover:bg-[#2a2a35] text-gray-400 hover:text-white"
                  >
                    <Eye size={16} />
                  </button>

                  <button
                    onClick={() => onDelete(p.id)}
                    className="p-2 rounded-lg hover:bg-red-500/10 text-red-500/70 hover:text-red-400"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}