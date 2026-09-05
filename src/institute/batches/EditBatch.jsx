
// EditBatch.jsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import BatchForm from "../../components/batches/BatchForm";
import { getBatchById, updateBatch, getInstituteBatches } from "../../services/batchService";
import { getCategories, getSubcategories, getTrainersByInstitute } from "../../services/studentService";

export default function EditBatch() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initial, setInitial] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dropdowns, setDropdowns] = useState({ categories: [], subcategories: [], trainers: [] });

  useEffect(() => {
    const fetchData = async () => {
      const [batch, c, s, t] = await Promise.all([getBatchById(id), getCategories(), getSubcategories(), getTrainersByInstitute()]);
      setInitial(batch); setDropdowns({ categories: c, subcategories: s, trainers: t || [] });
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (data) => {
    setLoading(true);
    try { await updateBatch(id, data); toast.success("Updated"); navigate(`/institute/batches/${id}`); }
    catch (err) { toast.error(err.response?.data?.message); }
    finally { setLoading(false); }
  };

  if (!initial) return <div className="p-8 text-white">Loading...</div>;

  return (
    <div className="p-8 text-white">
      <h1 className="text-4xl font-bold text-purple-400 mb-6">Edit Batch</h1>
      <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-6 max-w-4xl">
        <BatchForm initialData={initial} dropdowns={dropdowns} onSubmit={handleSubmit} loading={loading} submitText="Update Batch" />
      </div>
    </div>
  );
}