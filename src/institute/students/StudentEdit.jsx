import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import StudentForm from "../../components/students/StudentForm";
import { getStudentById, updateStudentByInstitute, getCategories, getSubcategories, getTrainersByInstitute } from "../../services/studentService";

export default function StudentEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [student, cats, subs, trs] = await Promise.all([
          getStudentById(id), getCategories(), getSubcategories(), getTrainersByInstitute()
        ]);
        setInitialData(student);
        setCategories(cats); setSubcategories(subs); setTrainers(trs || []);
      } catch (err) { toast.error("Failed to load student data"); } 
      finally { setFetching(false); }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, val]) => {
        if (val !== null && val !== undefined && val !== "") {
          data.append(key, val);
        }
      });

      await updateStudentByInstitute(id, data);
      toast.success("Student updated successfully!");
      navigate(`/institute/students/${id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally { setLoading(false); }
  };

  if (fetching) return <div className="p-8 text-white">Loading student data...</div>;

  return (
    <div className="p-8 text-white">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-purple-400">Edit Student</h1>
        <p className="text-gray-400 mt-2">Update student information</p>
      </div>
      <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-6 max-w-4xl">
        {initialData && (
          <StudentForm 
            initialData={initialData} 
            categories={categories} 
            subcategories={subcategories} 
            trainers={trainers} 
            onSubmit={handleSubmit} 
            loading={loading} 
            submitText="Update Student" 
          />
        )}
      </div>
    </div>
  );
}