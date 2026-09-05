
// import { useEffect } from "react";
// import { HiX } from "react-icons/hi";

// export default function Modal({
//   isOpen,
//   onClose,
//   title,
//   children,
// }) {

//   /* ─────────────────────────────────────────────
//      DISABLE BODY SCROLL
//   ───────────────────────────────────────────── */
//   useEffect(() => {

//     if (isOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }

//     return () => {
//       document.body.style.overflow = "auto";
//     };

//   }, [isOpen]);

//   if (!isOpen) return null;

//  return (
//   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
    
//     {/* MODAL BOX */}
//     <div
//       className="relative w-full  max-w-lg rounded-2xl bg-[#1f1b2e] border border-white/10 shadow-2xl"
//       onClick={(e) => e.stopPropagation()}
//     >

//       {/* HEADER */}
//       <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
//         <h2 className="text-xl font-semibold text-white">
//           {title}
//         </h2>

//         <button
//           onClick={onClose}
//           className="text-gray-400 hover:text-white text-xl"
//         >
//           ✕
//         </button>
//       </div>

//       {/* BODY */}
//       <div className="p-4 max-h-[55vh] overflow-y-auto">
//         {children}
//       </div>

//     </div>

//   </div>
// );
// }

import { useEffect } from "react";
import { createPortal } from "react-dom";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}) {
  useEffect(() => {
    document.body.style.overflow = isOpen
      ? "hidden"
      : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl mx-4 rounded-2xl bg-[#1f1b2e] border border-white/10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h2 className="text-xl font-semibold text-white">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-xl"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}