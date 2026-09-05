import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, UserCheck, UserX } from "lucide-react";
import { searchStudentByMobile, registerStudentOffline, getCategories, getSubcategories, getTrainersByInstitute } from "../../services/studentService";
import toast from "react-hot-toast";

export default function StudentSearch({ isOpen, onClose, onSuccess }) {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState("");
  const [searching, setSearching] = useState(false);
  const [result, setResult] = useState(null);
  const [notFound, setNotFound] = useState(false);
  
  // Quick Enroll State
  const [enrolling, setEnrolling] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [enrollData, setEnrollData] = useState({ category_id: "", subcategory_id: "", trainer_id: "", learning_mode: "OFFLINE", joining_date: new Date().toISOString().split('T')[0] });

  const handleSearch = async (e) => {
    e.preventDefault();
    if (mobile.length !== 10) return toast.error("Enter a valid 10-digit number");
    setSearching(true); setNotFound(false); setResult(null);
    try {
      const res = await searchStudentByMobile(mobile);
      setResult(res.data);
      // Fetch dropdowns for quick enroll
      const [cats, subs, trs] = await Promise.all([getCategories(), getSubcategories(), getTrainersByInstitute()]);
      setCategories(cats); setSubcategories(subs); setTrainers(trs);
    } catch (err) {
      if (err.response?.status === 404) setNotFound(true);
      else toast.error(err.response?.data?.message || "Search failed");
    } finally { setSearching(false); }
  };

  const handleQuickEnroll = async (e) => {
    e.preventDefault();
    setEnrolling(true);
    try {
      const formData = new FormData();
      formData.append("phone_number", result.account.phone_number);
      formData.append("registration_source", "OFFLINE");
      formData.append("platform", "WEB");
      Object.entries(enrollData).forEach(([key, val]) => { if (val) formData.append(key, val); });

      await registerStudentOffline(formData);
      toast.success("Student enrolled successfully!");
      handleClose();
      if (onSuccess) onSuccess();
    } catch (err) {
      toast.error(err.response?.data?.message || "Enrollment failed");
    } finally { setEnrolling(false); }
  };

  const handleClose = () => {
    setMobile(""); setResult(null); setNotFound(false); setEnrollData({ category_id: "", subcategory_id: "", trainer_id: "", learning_mode: "OFFLINE", joining_date: new Date().toISOString().split('T')[0] });
    onClose();
  };

  if (!isOpen) return null;

  const inputClass = "w-full mt-1 mb-3 p-2.5 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 text-sm";
  const labelClass = "block text-xs text-gray-400 mb-1";

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="w-full max-w-lg bg-[#211c30] border border-[#3a3448] rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-5 border-b border-[#3a3448]">
          <h2 className="text-xl font-bold text-white">Search Student by Mobile</h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-white"><X size={18} /></button>
        </div>

        <form onSubmit={handleSearch} className="p-5 border-b border-[#3a3448] flex-shrink-0">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value.replace(/[^0-9]/g, "").slice(0, 10))} placeholder="Enter 10-digit mobile" className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors" autoFocus />
            </div>
            <button type="submit" disabled={searching} className="px-6 py-3 rounded-xl bg-purple-500 text-white font-semibold hover:bg-purple-600 disabled:opacity-50 transition-colors">{searching ? "..." : "Search"}</button>
          </div>
        </form>

        <div className="p-5 overflow-y-auto">
          {notFound && (
            <div className="text-center py-6">
              <UserX className="mx-auto text-gray-500 mb-3" size={40} />
              <p className="text-gray-300 mb-4">No account found with this number.</p>
              <button onClick={() => { handleClose(); navigate(`/institute/students/register?phone=${mobile}`); }} className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold hover:opacity-90 transition-opacity">Register New Student</button>
            </div>
          )}

          {result && (
            <form onSubmit={handleQuickEnroll}>
              <div className="bg-[#2b2638] rounded-xl p-4 mb-4">
                <div className="flex items-center gap-2 text-green-400 font-semibold mb-3"><UserCheck size={18} /> Existing Student Found</div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><p className="text-gray-500 text-xs">Name</p><p className="text-white">{result.user.full_name}</p></div>
                  <div><p className="text-gray-500 text-xs">Mobile</p><p className="text-white">{result.account.phone_number}</p></div>
                  <div><p className="text-gray-500 text-xs">Email</p><p className="text-white truncate">{result.account.email || "-"}</p></div>
                  <div><p className="text-gray-500 text-xs">City</p><p className="text-white">{result.user.city || "-"}</p></div>
                </div>
              </div>

              {/* Quick Enroll Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Category</label>
                  <select value={enrollData.category_id} onChange={e => setEnrollData({...enrollData, category_id: e.target.value, subcategory_id: ""})} className={inputClass} required>
                    <option value="">Select</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Subcategory</label>
                  <select value={enrollData.subcategory_id} onChange={e => setEnrollData({...enrollData, subcategory_id: e.target.value})} className={inputClass} disabled={!enrollData.category_id}>
                    <option value="">Select</option>
                    {subcategories.filter(s => String(s.category_id) === String(enrollData.category_id)).map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Trainer</label>
                  <select value={enrollData.trainer_id} onChange={e => setEnrollData({...enrollData, trainer_id: e.target.value})} className={inputClass}>
                    <option value="">Select</option>
                    {trainers.map(t => <option key={t.id} value={t.id}>{t.full_name}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Learning Mode</label>
                  <select value={enrollData.learning_mode} onChange={e => setEnrollData({...enrollData, learning_mode: e.target.value})} className={inputClass}>
                    <option value="OFFLINE">Offline</option>
                    <option value="ONLINE">Online</option>
                  </select>
                </div>
              </div>
              <div className="mt-3">
                <label className={labelClass}>Joining Date</label>
                <input type="date" value={enrollData.joining_date} onChange={e => setEnrollData({...enrollData, joining_date: e.target.value})} className={inputClass} required />
              </div>

              <button type="submit" disabled={enrolling} className="w-full mt-4 px-5 py-2.5 rounded-xl bg-purple-500 text-white font-bold hover:bg-purple-600 disabled:opacity-50 transition-colors">
                {enrolling ? "Enrolling..." : "Enroll Student"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}