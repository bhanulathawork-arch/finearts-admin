import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Edit, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { getStudentById } from "../../services/studentService";

export default function StudentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const data = await getStudentById(id);
        setStudent(data);
      } catch (err) { toast.error("Failed to load student details"); } 
      finally { setLoading(false); }
    };
    fetchStudent();
  }, [id]);

  if (loading) return <div className="p-8 text-white">Loading...</div>;
  if (!student) return <div className="p-8 text-red-400">Student not found</div>;

  const DetailRow = ({ label, value }) => (
    <div>
      <p className="text-gray-500 text-xs mb-1">{label}</p>
      <p className="text-white text-sm font-medium">{value || "-"}</p>
    </div>
  );

  return (
    <div className="p-8 text-white">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate("/institute/students")} className="p-2 rounded-xl hover:bg-[#2a2a35] text-gray-400 hover:text-white transition-colors"><ArrowLeft size={24} /></button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-purple-400">{student.user.full_name}</h1>
          <p className="text-gray-400 text-sm mt-1">Code: {student.student.student_code} | Adm: {student.student.admission_number}</p>
        </div>
        <button onClick={() => navigate(`/institute/students/${id}/edit`)} className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold flex items-center gap-2 hover:opacity-90 transition-opacity"><Edit size={18} /> Edit</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Photo & Quick Info */}
        <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-6 flex flex-col items-center">
          {student.student.student_photo ? (
            <img src={student.student.student_photo} alt="" className="w-32 h-32 rounded-2xl object-cover border-2 border-[#333] mb-4" />
          ) : (
            <div className="w-32 h-32 rounded-2xl bg-[#26262b] flex items-center justify-center text-gray-600 text-4xl mb-4">?</div>
          )}
          <span className={`px-3 py-1 rounded-full text-xs font-bold mb-4 ${student.student.status === 'ACTIVE' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>{student.student.status}</span>
          <DetailRow label="Learning Mode" value={student.student.learning_mode} />
          <DetailRow label="Joining Date" value={student.student.joining_date} />
          <DetailRow label="Registration" value={student.student.registration_source} />
        </div>

        {/* Right Column: Full Details */}
        <div className="lg:col-span-2 bg-[#151519] border border-[#2c2c35] rounded-2xl p-6 space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-purple-400 border-b border-[#2c2c35] pb-2 mb-4">Personal Information</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <DetailRow label="Full Name" value={student.user.full_name} />
              <DetailRow label="Email" value={student.account.email} />
              <DetailRow label="Mobile" value={student.account.phone_number} />
              <DetailRow label="Gender" value={student.user.gender} />
              <DetailRow label="Date of Birth" value={student.user.date_of_birth} />
              <DetailRow label="City" value={student.user.city} />
              <DetailRow label="State" value={student.user.state} />
              <DetailRow label="Country" value={student.user.country} />
              <DetailRow label="Address" value={student.user.address} />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-purple-400 border-b border-[#2c2c35] pb-2 mb-4">Guardian & Emergency</h3>
            <div className="grid grid-cols-3 gap-4">
              <DetailRow label="Guardian Name" value={student.student.guardian_name} />
              <DetailRow label="Guardian Mobile" value={student.student.guardian_mobile} />
              <DetailRow label="Emergency Contact" value={student.student.emergency_contact} />
            </div>
          </div>

         
          
        </div>
      </div>
    </div>
  );
}