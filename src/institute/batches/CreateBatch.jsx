
// // CreateBatch.jsx
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import BatchForm from "../../components/batches/BatchForm";
// import { createBatch, getInstituteBatches } from "../../services/batchService";
// import { getCategories, getSubcategories, getTrainersByInstitute } from "../../services/studentService";

// export default function CreateBatch() {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [dropdowns, setDropdowns] = useState({ categories: [], subcategories: [], trainers: [] });

//   useEffect(() => {
//     const fetch = async () => {
//       const [c, s, t] = await Promise.all([getCategories(), getSubcategories(), getTrainersByInstitute()]);
//       setDropdowns({ categories: c, subcategories: s, trainers: t || [] });
//     };
//     fetch();
//   }, []);

//   const handleSubmit = async (data) => {
//     setLoading(true);
//     try { await createBatch(data); toast.success("Batch created"); navigate("/institute/batches"); }
//     catch (err) { toast.error(err.response?.data?.message); }
//     finally { setLoading(false); }
//   };

//   return (
//     <div className="p-8 text-white">
//       <h1 className="text-4xl font-bold text-purple-400 mb-6">Create Batch</h1>
//       <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-6 max-w-4xl">
//        <BatchForm
//   categories={dropdowns.categories}
//   subcategories={dropdowns.subcategories}
//   trainers={dropdowns.trainers}
//   onSubmit={handleSubmit}
//   loading={loading}
//   submitText="Create Batch"
// />
//       </div>
//     </div>
//   );
// }


// src/institute/batches/CreateBatch.jsx

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import BatchForm from "../../components/batches/BatchForm";

import { createBatch } from "../../services/batchService";
import {
  getCategories,
  getSubcategories,
  getTrainersByInstitute,
} from "../../services/studentService";

export default function CreateBatch() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    loadDropdowns();
  }, []);

  const loadDropdowns = async () => {
    try {
      setPageLoading(true);

      const [categoryRes, subcategoryRes, trainerRes] =
        await Promise.all([
          getCategories(),
          getSubcategories(),
          getTrainersByInstitute(),
        ]);

      console.log("Categories:", categoryRes);
      console.log("Subcategories:", subcategoryRes);
      console.log("Trainers:", trainerRes);

      setCategories(Array.isArray(categoryRes) ? categoryRes : []);
      setSubcategories(Array.isArray(subcategoryRes) ? subcategoryRes : []);
      setTrainers(Array.isArray(trainerRes) ? trainerRes : []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load dropdown data");
    } finally {
      setPageLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);

      await createBatch(formData);

      toast.success("Batch created successfully");

      navigate("/institute/batches");
    } catch (err) {
      console.error(err);

      toast.error(
        err?.response?.data?.message ||
          "Failed to create batch"
      );
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="flex items-center justify-center h-[70vh] text-white text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-8 text-white">
      <h1 className="text-4xl font-bold text-purple-400 mb-6">
        Create Batch
      </h1>

      <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-6 max-w-5xl">

        <BatchForm
          initialData={null}
          categories={categories}
          subcategories={subcategories}
          trainers={trainers}
          loading={loading}
          submitText="Create Batch"
          onSubmit={handleSubmit}
        />

      </div>
    </div>
  );
}
