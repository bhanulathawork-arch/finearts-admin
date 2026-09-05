// // BatchList.jsx
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Plus } from "lucide-react";
// import toast from "react-hot-toast";
// import { getInstituteBatches, deleteBatch } from "../../services/batchService";
// import BatchTable from "../../components/batches/BatchTable";
// import AssignStudentModal from "../../components/batches/AssignStudentModal";

// export default function BatchList() {
//   const navigate = useNavigate();
//   const [batches, setBatches] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [assignModal, setAssignModal] = useState({ open: false, id: null });


// const fetchBatches = async () => {
//   try {
//  const data = await getInstituteBatches();

// setBatches(data);
//   } catch (err) {
//     console.error(err);
//     toast.error("Failed to load batches");
//   } finally {
//     setLoading(false);
//   }
// };
//   useEffect(() => { fetchBatches(); }, []);

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this batch?")) return;
//     try { await deleteBatch(id); toast.success("Deleted"); fetchBatches(); } catch { toast.error("Failed"); }
//   };

//   return (
//     <div className="p-8 text-white">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-4xl font-bold text-purple-400">Batches</h1>
//         <button onClick={() => navigate("/institute/batches/create")} className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold flex items-center gap-2"><Plus size={20} /> Create Batch</button>
//       </div>
//       <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-4">
//         <BatchTable batches={batches} loading={loading} onView={(id) => navigate(`/institute/batches/${id}`)} onEdit={(id) => navigate(`/institute/batches/${id}/edit`)} onDelete={handleDelete} onAssign={(id) => setAssignModal({ open: true, id })} />
//       </div>
//       <AssignStudentModal isOpen={assignModal.open} onClose={() => setAssignModal({ open: false, id: null })} batchId={assignModal.id} onSuccess={fetchBatches} />
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
   * the new assignment page will contain:
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
    <div className="min-h-full p-8 text-white">
      {/* =========================
          PAGE HEADER
      ========================== */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-4xl font-bold text-purple-400">
            Batches
          </h1>

          <p className="mt-2 text-gray-400">
            Create, manage and assign students to batches.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/institute/batches/create")}
          className="
            px-6
            py-3
            rounded-xl
            bg-gradient-to-r
            from-purple-500
            to-pink-500
            hover:from-purple-600
            hover:to-pink-600
            font-bold
            flex
            items-center
            gap-2
            transition-all
            duration-200
            shadow-lg
            shadow-purple-500/20
          "
        >
          <Plus size={20} />
          Create Batch
        </button>
      </div>

      {/* =========================
          BATCH TABLE
      ========================== */}
      <div
        className="
          bg-[#151519]
          border
          border-[#2c2c35]
          rounded-2xl
          p-4
        "
      >
        <BatchTable
          batches={batches}
          loading={loading}
          onView={(id) =>
            navigate(`/institute/batches/${id}`)
          }
          onEdit={(id) =>
            navigate(`/institute/batches/${id}/edit`)
          }
          onDelete={handleDelete}
          onAssign={handleAssign}
        />
      </div>
    </div>
  );
}