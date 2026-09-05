// import { FaTimes, FaDownload } from "lucide-react";

// export default function ReceiptModal({ isOpen, onClose, receipt }) {
//   if (!isOpen || !receipt) return null;
//   return (
//     <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
//       <div className="w-full max-w-lg bg-[#211c30] border border-[#3a3448] rounded-2xl p-6 relative">
//         <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white"><FaTimes size={20} /></button>
        
//         <div className="text-center border-b border-[#3a3448] pb-6 mb-6">
//           <h2 className="text-2xl font-bold text-purple-400">PAYMENT RECEIPT</h2>
//           <p className="text-gray-400 text-sm mt-1">Receipt No: {receipt.receipt_number}</p>
//         </div>

//         <div className="space-y-4 text-sm">
//           <div className="flex justify-between"><span className="text-gray-400">Date:</span><span className="text-white font-medium">{receipt.payment_date}</span></div>
//           <div className="flex justify-between"><span className="text-gray-400">Student:</span><span className="text-white font-medium">{receipt.full_name}</span></div>
//           <div className="flex justify-between"><span className="text-gray-400">Batch:</span><span className="text-white font-medium">{receipt.batch_name}</span></div>
          
//           <div className="border-t border-[#3a3448] pt-4 mt-4 space-y-2">
//             <div className="flex justify-between font-bold text-white text-base"><span>Amount Paid:</span><span className="text-green-400">₹{Number(receipt.amount).toLocaleString()}</span></div>
//             <div className="flex justify-between text-gray-400"><span>Method:</span><span className="text-white uppercase">{receipt.method || 'N/A'}</span></div>
//             {receipt.transaction_id && <div className="flex justify-between text-gray-400"><span>Transaction ID:</span><span className="text-white">{receipt.transaction_id}</span></div>}
//           </div>
//         </div>

//         <button className="w-full mt-6 flex items-center justify-center gap-2 py-3 border border-[#3a3448] rounded-xl text-gray-300 hover:bg-[#2b2638] transition-colors">
//           <FaDownload size={16} /> Download PDF
//         </button>
//       </div>
//     </div>
//   );
// }


import { X, Download } from "lucide-react";

export default function ReceiptModal({
  isOpen,
  onClose,
  receipt,
}) {
  if (!isOpen || !receipt) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-lg bg-[#211c30] border border-[#3a3448] rounded-2xl p-6 relative">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-gray-400 hover:text-white"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="text-center border-b border-[#3a3448] pb-6 mb-6">
          <h2 className="text-2xl font-bold text-purple-400">
            PAYMENT RECEIPT
          </h2>

          <p className="text-gray-400 text-sm mt-1">
            Receipt No: {receipt.receipt_number}
          </p>
        </div>

        {/* Receipt Details */}
        <div className="space-y-4 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Date</span>

            <span className="text-white font-medium">
              {receipt.payment_date}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">Student</span>

            <span className="text-white font-medium">
              {receipt.full_name}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">Batch</span>

            <span className="text-white font-medium">
              {receipt.batch_name}
            </span>
          </div>

          <div className="border-t border-[#3a3448] pt-4 mt-4 space-y-3">

            <div className="flex justify-between text-lg font-bold">
              <span className="text-white">
                Amount Paid
              </span>

              <span className="text-green-400">
                ₹{Number(receipt.amount || 0).toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">
                Payment Method
              </span>

              <span className="text-white uppercase">
                {receipt.method || "N/A"}
              </span>
            </div>

            {receipt.transaction_id && (
              <div className="flex justify-between">
                <span className="text-gray-400">
                  Transaction ID
                </span>

                <span className="text-white">
                  {receipt.transaction_id}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Download Button */}
        <button
          className="w-full mt-6 flex items-center justify-center gap-2 py-3 border border-[#3a3448] rounded-xl text-gray-300 hover:bg-[#2b2638] transition-colors"
        >
          <Download size={18} />
          Download PDF
        </button>

      </div>
    </div>
  );
}