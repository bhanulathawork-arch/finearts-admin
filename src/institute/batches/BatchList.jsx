
// // BatchList.jsx
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Plus } from "lucide-react";
// import toast from "react-hot-toast";

// import {
//   getInstituteBatches,
//   deleteBatch,
// } from "../../services/batchService";

// import BatchTable from "../../components/batches/BatchTable";

// export default function BatchList() {
//   const navigate = useNavigate();

//   const [batches, setBatches] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchBatches = async () => {
//     try {
//       setLoading(true);

//       const data = await getInstituteBatches();

//       setBatches(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error("Failed to load batches:", err);
//       toast.error("Failed to load batches");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBatches();
//   }, []);

//   const handleDelete = async (id) => {
//     const confirmed = window.confirm(
//       "Are you sure you want to delete this batch?"
//     );

//     if (!confirmed) return;

//     try {
//       await deleteBatch(id);

//       toast.success("Batch deleted successfully");

//       await fetchBatches();
//     } catch (err) {
//       console.error("Failed to delete batch:", err);
//       toast.error("Failed to delete batch");
//     }
//   };

//   /**
//    * Opens the dedicated student-batch assignment page.
//    *
//    * We intentionally do NOT pass a batchId here because
//    * the new assignment page will contain:
//    *
//    * LEFT  -> Students
//    * RIGHT -> Batches
//    *
//    * The user can select both and then assign.
//    */
//   const handleAssign = () => {
//     navigate("/institute/batches/assign");
//   };

//   return (
//     <div className="min-h-full p-8 text-white">
//       {/* =========================
//           PAGE HEADER
//       ========================== */}
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h1 className="text-4xl font-bold text-purple-400">
//             Batches
//           </h1>

//           <p className="mt-2 text-gray-400">
//             Create, manage and assign students to batches.
//           </p>
//         </div>

//         <button
//           type="button"
//           onClick={() => navigate("/institute/batches/create")}
//           className="
//             px-6
//             py-3
//             rounded-xl
//             bg-gradient-to-r
//             from-purple-500
//             to-pink-500
//             hover:from-purple-600
//             hover:to-pink-600
//             font-bold
//             flex
//             items-center
//             gap-2
//             transition-all
//             duration-200
//             shadow-lg
//             shadow-purple-500/20
//           "
//         >
//           <Plus size={20} />
//           Create Batch
//         </button>
//       </div>

//       {/* =========================
//           BATCH TABLE
//       ========================== */}
//       <div
//         className="
//           bg-[#151519]
//           border
//           border-[#2c2c35]
//           rounded-2xl
//           p-4
//         "
//       >
//         <BatchTable
//           batches={batches}
//           loading={loading}
//           onView={(id) =>
//             navigate(`/institute/batches/${id}`)
//           }
//           onEdit={(id) =>
//             navigate(`/institute/batches/${id}/edit`)
//           }
//           onDelete={handleDelete}
//           onAssign={handleAssign}
//         />
//       </div>
//     </div>
//   );
// }



// BatchList.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";

import {
  getInstituteBatches,
  deleteBatch,
} from "../../services/batchService";

import BatchTable from "../../components/batches/BatchTable";

export default function BatchList() {
  const navigate = useNavigate();

  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBatches = async () => {
    try {
      setLoading(true);

      const data = await getInstituteBatches();

      setBatches(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load batches:", err);
      toast.error("Failed to load batches");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBatches();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this batch?"
    );

    if (!confirmed) return;

    try {
      await deleteBatch(id);

      toast.success("Batch deleted successfully");

      await fetchBatches();
    } catch (err) {
      console.error("Failed to delete batch:", err);
      toast.error("Failed to delete batch");
    }
  };

  /**
   * Opens the dedicated student-batch assignment page.
   *
   * We intentionally do NOT pass a batchId here because
   * the assignment page contains:
   *
   * LEFT  -> Students
   * RIGHT -> Batches
   *
   * The user can select both and then assign.
   */
  const handleAssign = () => {
    navigate("/institute/batches/assign");
  };

  return (
    // Let InstituteLayout provide the page's horizontal and top spacing.
    // Avoid adding p-8 here, which creates excess padding compared with
    // the Institute Dashboard and other institute pages.
    <div className="w-full min-w-0 text-white">
      {/* PAGE HEADER */}
      <div className="mb-5 flex items-center justify-between gap-4">
        <div className="min-w-0">
            <h1 className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-500 bg-clip-text text-4xl font-extrabold text-transparent sm:text-4xl">
            Batches
          </h1>

          <p className="mt-2 text-gray-400">
            Create, manage and assign students to batches.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/institute/batches/create")}
          className="flex shrink-0 items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 font-bold shadow-lg shadow-purple-500/20 transition-all duration-200 hover:from-purple-600 hover:to-pink-600"
        >
          <Plus size={20} />
          Create Batch
        </button>
      </div>

      {/* BATCH TABLE */}
      <div className="rounded-2xl border border-[#2c2c35] bg-[#151519] p-4">
        <BatchTable
          batches={batches}
          loading={loading}
          onView={(id) => navigate(`/institute/batches/${id}`)}
          onEdit={(id) => navigate(`/institute/batches/${id}/edit`)}
          onDelete={handleDelete}
          onAssign={handleAssign}
        />
      </div>
    </div>
  );
}
