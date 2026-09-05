import { useState, useEffect } from "react";

export default function StudentForm({ initialData, categories, subcategories, trainers, onSubmit, loading, submitText = "Submit" }) {
  const [formData, setFormData] = useState({
    full_name: "", phone_number: "", email: "", gender: "", date_of_birth: "",
    address: "", city: "", state: "", country: "", student_photo: null,
    guardian_name: "", guardian_mobile: "", emergency_contact: "",
    category_id: "", subcategory_id: "", trainer_id: "", learning_mode: "OFFLINE", joining_date: new Date().toISOString().split('T')[0]
  });
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({
        ...prev,
        full_name: initialData.user?.full_name || "",
        phone_number: initialData.account?.phone_number || "",
        email: initialData.account?.email || "",
        gender: initialData.user?.gender || "",
        date_of_birth: initialData.user?.date_of_birth || "",
        address: initialData.user?.address || "",
        city: initialData.user?.city || "",
        state: initialData.user?.state || "",
        country: initialData.user?.country || "",
        guardian_name: initialData.student?.guardian_name || "",
        guardian_mobile: initialData.student?.guardian_mobile || "",
        emergency_contact: initialData.student?.emergency_contact || "",
        category_id: initialData.student?.category_id || "",
        subcategory_id: initialData.student?.subcategory_id || "",
        trainer_id: initialData.student?.trainer_id || "",
        learning_mode: initialData.student?.learning_mode || "OFFLINE",
        joining_date: initialData.student?.joining_date || new Date().toISOString().split('T')[0]
      }));
      if (initialData.student?.student_photo) setImagePreview(initialData.student.student_photo);
    }
  }, [initialData]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, student_photo: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const inputClass = "w-full mt-1 mb-3 p-2.5 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 text-sm";
  const labelClass = "block text-xs text-gray-400 mb-1";
  const fileClass = "w-full mt-1 mb-3 p-2.5 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none text-sm file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-500/20 file:text-purple-300";

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
      <div className="md:col-span-2"><label className={labelClass}>Full Name *</label><input name="full_name" value={formData.full_name} onChange={handleChange} className={inputClass} required /></div>
      
      <div><label className={labelClass}>Mobile *</label><input name="phone_number" value={formData.phone_number} onChange={e => setFormData({...formData, phone_number: e.target.value.replace(/[^0-9]/g, "").slice(0, 10)})} className={inputClass} required /></div>
      <div><label className={labelClass}>Email</label><input name="email" type="email" value={formData.email} onChange={handleChange} className={inputClass} /></div>
      
      <div><label className={labelClass}>Gender</label>
        <select name="gender" value={formData.gender} onChange={handleChange} className={inputClass}>
          <option value="">Select</option><option>Male</option><option>Female</option><option>Other</option>
        </select>
      </div>
      <div><label className={labelClass}>Date of Birth</label><input name="date_of_birth" type="date" value={formData.date_of_birth} onChange={handleChange} className={inputClass} /></div>
      
      <div className="md:col-span-2"><label className={labelClass}>Address</label><input name="address" value={formData.address} onChange={handleChange} className={inputClass} /></div>
      <div><label className={labelClass}>City</label><input name="city" value={formData.city} onChange={handleChange} className={inputClass} /></div>
      <div><label className={labelClass}>State</label><input name="state" value={formData.state} onChange={handleChange} className={inputClass} /></div>
      <div className="md:col-span-2"><label className={labelClass}>Country</label><input name="country" value={formData.country} onChange={handleChange} className={inputClass} /></div>

      <div className="md:col-span-2 border-t border-[#3a3448] pt-4 mt-2"><h3 className="text-sm font-semibold text-purple-400 mb-3">Guardian & Emergency Details</h3></div>
      <div><label className={labelClass}>Guardian Name</label><input name="guardian_name" value={formData.guardian_name} onChange={handleChange} className={inputClass} /></div>
      <div><label className={labelClass}>Guardian Mobile</label><input name="guardian_mobile" value={formData.guardian_mobile} onChange={e => setFormData({...formData, guardian_mobile: e.target.value.replace(/[^0-9]/g, "")})} className={inputClass} /></div>
      <div><label className={labelClass}>Emergency Contact</label><input name="emergency_contact" value={formData.emergency_contact} onChange={e => setFormData({...formData, emergency_contact: e.target.value.replace(/[^0-9]/g, "")})} className={inputClass} /></div>
      <div><label className={labelClass}>Joining Date *</label><input name="joining_date" type="date" value={formData.joining_date} onChange={handleChange} className={inputClass} required /></div>
      <div className="md:col-span-2">
        <label className={labelClass}>Student Photo</label>
        {imagePreview && <img src={imagePreview} alt="Preview" className="w-24 h-24 object-cover rounded-xl mb-2 border border-[#333]" />}
        <input type="file" accept="image/*" onChange={handleImageChange} className={fileClass} />
      </div>

      {/* <div className="md:col-span-2 border-t border-[#3a3448] pt-4 mt-2"><h3 className="text-sm font-semibold text-purple-400 mb-3">Institute Enrollment Details</h3></div> */}
      
      {/* <div><label className={labelClass}>Category</label>
        <select name="category_id" value={formData.category_id} onChange={e => setFormData({...formData, category_id: e.target.value, subcategory_id: ""})} className={inputClass} required>
          <option value="">Select</option>{categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>
      <div><label className={labelClass}>Subcategory</label>
        <select name="subcategory_id" value={formData.subcategory_id} onChange={handleChange} className={inputClass} disabled={!formData.category_id}>
          <option value="">Select</option>{subcategories.filter(s => String(s.category_id) === String(formData.category_id)).map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
      </div>
      <div><label className={labelClass}>Trainer</label>
        <select name="trainer_id" value={formData.trainer_id} onChange={handleChange} className={inputClass}>
          <option value="">Select</option>{trainers.map(t => <option key={t.id} value={t.id}>{t.full_name}</option>)}
        </select>
      </div>
      <div><label className={labelClass}>Learning Mode</label>
        <select name="learning_mode" value={formData.learning_mode} onChange={handleChange} className={inputClass}>
          <option value="OFFLINE">Offline</option><option value="ONLINE">Online</option>
        </select>
      </div>
      <div><label className={labelClass}>Joining Date *</label><input name="joining_date" type="date" value={formData.joining_date} onChange={handleChange} className={inputClass} required /></div> */}

      <div className="md:col-span-2 flex justify-end gap-3 mt-4 pt-4 border-t border-[#3a3448]">
        <button type="button" onClick={() => window.history.back()} className="px-5 py-2.5 rounded-xl border border-gray-600 text-gray-300 hover:bg-[#2b2638] transition-colors">Cancel</button>
        <button type="submit" disabled={loading} className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 disabled:opacity-50 transition-opacity">
          {loading ? "Saving..." : submitText}
        </button>
      </div>
    </form>
  );
}
