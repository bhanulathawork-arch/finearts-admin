import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import StudentForm from "../../components/students/StudentForm";
import { registerStudentOffline, getCategories, getSubcategories, getTrainersByInstitute } from "../../services/studentService";

export default function StudentRegistration() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const prefillPhone = searchParams.get("phone") || "";

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const [cats, subs, trs] = await Promise.all([getCategories(), getSubcategories(), getTrainersByInstitute()]);
        setCategories(cats); setSubcategories(subs); setTrainers(trs || []);
      } catch (err) { toast.error("Failed to load form options"); }
    };
    fetchDropdowns();
  }, []);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      const data = new FormData();
      data.append("registration_source", "OFFLINE");
      data.append("platform", "WEB");
      
      // Append all fields dynamically
      Object.entries(formData).forEach(([key, val]) => {
        if (val !== null && val !== undefined && val !== "") {
          data.append(key, val);
        }
      });

      // Prefill phone if came from search modal
      if (prefillPhone && !formData.phone_number) {
        data.append("phone_number", prefillPhone);
      }

      await registerStudentOffline(data);
      toast.success("Student registered successfully!");
      navigate("/institute/students");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally { setLoading(false); }
  };

  return (
    <div className="p-8 text-white">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-purple-400">Register Student</h1>
        <p className="text-gray-400 mt-2">Add a new student to your institute</p>
      </div>
      <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-6 max-w-4xl">
        <StudentForm 
          initialData={prefillPhone ? { account: { phone_number: prefillPhone } } : null} 
          categories={categories} 
          subcategories={subcategories} 
          trainers={trainers} 
          onSubmit={handleSubmit} 
          loading={loading} 
          submitText="Register Student" 
        />
      </div>
    </div>
  );
}