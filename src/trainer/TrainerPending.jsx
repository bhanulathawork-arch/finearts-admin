// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import {
//   completeTrainerProfile,
//   getCategories,
//   getSubcategories,
//   getInstitutes,
// } from "../services/trainerApi";

// export default function TrainerCreateProfile() {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);
//   const [institutes, setInstitutes] = useState([]);
//   const [workType, setWorkType] = useState("individual"); // "individual" | "institute"

//   const [form, setForm] = useState({
//     full_name: "",
//     email: "",
//     phone_number: "",
//     bio: "",
//     experience_years: "",
//     institute_id: "",
//     specializations: [{ category_id: "", subcategory_id: "" }],
//   });

//   useEffect(() => {
//     getCategories().then((r) => setCategories(r.data.data || [])).catch(console.error);
//     getSubcategories().then((r) => setSubcategories(r.data.data || [])).catch(console.error);
//     getInstitutes().then((r) => setInstitutes(r.data.data || [])).catch(console.error);
//   }, []);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSpecChange = (i, field, val) => {
//     const updated = [...form.specializations];
//     updated[i] = { ...updated[i], [field]: val };
//     setForm({ ...form, specializations: updated });
//   };

//   const addSpec = () => {
//     if (form.specializations.length < 3) {
//       setForm({ ...form, specializations: [...form.specializations, { category_id: "", subcategory_id: "" }] });
//     }
//   };

//   const removeSpec = (i) => {
//     const updated = form.specializations.filter((_, idx) => idx !== i);
//     setForm({ ...form, specializations: updated });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!form.full_name || !form.email || !form.phone_number) {
//       return toast.error("Please fill all required fields");
//     }
//     if (form.specializations.length === 0 || !form.specializations[0].category_id) {
//       return toast.error("At least 1 specialization required");
//     }

//     setLoading(true);
//     try {
//       const payload = {
//         ...form,
//         experience_years: parseInt(form.experience_years) || 0,
//         institute_id: workType === "institute" ? form.institute_id : null,
//         specializations: form.specializations.filter((s) => s.category_id),
//       };
//       await completeTrainerProfile(payload);
//       toast.success("Profile created! Waiting for admin approval.");

//       // Save profile complete flag
//       const trainer = JSON.parse(localStorage.getItem("trainer") || "{}");
//       localStorage.setItem("trainer", JSON.stringify({ ...trainer, is_profile_completed: 1, approval_status: "PENDING" }));

//       navigate("/trainer/pending");
//     } catch (err) {
//       toast.error(err?.response?.data?.message || "Failed to create profile");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-6">
//       <div className="w-full max-w-2xl">
//         {/* Header */}
//         <div className="mb-8 text-center">
//           <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-purple-600/20 border border-purple-500/30 mb-4">
//             <svg className="w-8 h-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//             </svg>
//           </div>
//           <h1 className="text-3xl font-bold text-white">Complete Your Profile</h1>
//           <p className="text-white/50 mt-2">Fill in your details to apply as a trainer</p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Basic Info */}
//           <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
//             <h2 className="text-white font-semibold text-sm uppercase tracking-widest opacity-50">Basic Info</h2>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div>
//                 <label className="text-white/60 text-sm mb-1 block">Full Name *</label>
//                 <input
//                   name="full_name"
//                   value={form.full_name}
//                   onChange={handleChange}
//                   placeholder="John Doe"
//                   className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-purple-500 transition"
//                 />
//               </div>
//               <div>
//                 <label className="text-white/60 text-sm mb-1 block">Phone Number *</label>
//                 <input
//                   name="phone_number"
//                   value={form.phone_number}
//                   onChange={handleChange}
//                   placeholder="+91 9999999999"
//                   className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-purple-500 transition"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="text-white/60 text-sm mb-1 block">Email *</label>
//               <input
//                 name="email"
//                 type="email"
//                 value={form.email}
//                 onChange={handleChange}
//                 placeholder="you@email.com"
//                 className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-purple-500 transition"
//               />
//             </div>

//             <div>
//               <label className="text-white/60 text-sm mb-1 block">Experience (Years)</label>
//               <input
//                 name="experience_years"
//                 type="number"
//                 value={form.experience_years}
//                 onChange={handleChange}
//                 placeholder="3"
//                 className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-purple-500 transition"
//               />
//             </div>

//             <div>
//               <label className="text-white/60 text-sm mb-1 block">Bio</label>
//               <textarea
//                 name="bio"
//                 value={form.bio}
//                 onChange={handleChange}
//                 rows={3}
//                 placeholder="Tell students about yourself..."
//                 className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-purple-500 transition resize-none"
//               />
//             </div>
//           </div>

//           {/* Work Type */}
//           <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
//             <h2 className="text-white font-semibold text-sm uppercase tracking-widest opacity-50">Work Preference</h2>
//             <div className="grid grid-cols-2 gap-3">
//               {["individual", "institute"].map((type) => (
//                 <button
//                   key={type}
//                   type="button"
//                   onClick={() => setWorkType(type)}
//                   className={`py-3 rounded-xl border text-sm font-medium transition capitalize ${
//                     workType === type
//                       ? "bg-purple-600 border-purple-500 text-white"
//                       : "bg-white/5 border-white/10 text-white/50 hover:border-white/30"
//                   }`}
//                 >
//                   {type === "individual" ? "🧑 Work Independently" : "🏫 Join an Institute"}
//                 </button>
//               ))}
//             </div>

//             {workType === "institute" && (
//               <div>
//                 <label className="text-white/60 text-sm mb-1 block">Select Institute</label>
//                 <select
//                   name="institute_id"
//                   value={form.institute_id}
//                   onChange={handleChange}
//                   className="w-full bg-[#0a0a0f] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition"
//                 >
//                   <option value="">-- Choose Institute --</option>
//                   {institutes.map((inst) => (
//                     <option key={inst.id} value={inst.id}>{inst.name}</option>
//                   ))}
//                 </select>
//               </div>
//             )}
//           </div>

//           {/* Specializations */}
//           <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
//             <div className="flex items-center justify-between">
//               <h2 className="text-white font-semibold text-sm uppercase tracking-widest opacity-50">Specializations</h2>
//               {form.specializations.length < 3 && (
//                 <button type="button" onClick={addSpec} className="text-purple-400 text-sm hover:text-purple-300 transition">
//                   + Add More
//                 </button>
//               )}
//             </div>

//             {form.specializations.map((spec, i) => (
//               <div key={i} className="flex gap-3 items-start">
//                 <div className="flex-1 grid grid-cols-2 gap-3">
//                   <select
//                     value={spec.category_id}
//                     onChange={(e) => handleSpecChange(i, "category_id", e.target.value)}
//                     className="bg-[#0a0a0f] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition"
//                   >
//                     <option value="">Category *</option>
//                     {categories.map((c) => (
//                       <option key={c.id} value={c.id}>{c.name}</option>
//                     ))}
//                   </select>
//                   <select
//                     value={spec.subcategory_id}
//                     onChange={(e) => handleSpecChange(i, "subcategory_id", e.target.value)}
//                     className="bg-[#0a0a0f] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition"
//                   >
//                     <option value="">Subcategory</option>
//                     {subcategories
//                       .filter((s) => !spec.category_id || s.category_id == spec.category_id)
//                       .map((s) => (
//                         <option key={s.id} value={s.id}>{s.name}</option>
//                       ))}
//                   </select>
//                 </div>
//                 {i > 0 && (
//                   <button type="button" onClick={() => removeSpec(i)} className="text-red-400/60 hover:text-red-400 mt-3 transition">✕</button>
//                 )}
//               </div>
//             ))}
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-4 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-2xl transition disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {loading ? "Submitting..." : "Submit for Approval →"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }


import { HiClock } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export default function TrainerPending() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#08080c] flex items-center justify-center px-4">

      <div className="w-full max-w-xl bg-[#18181d] border border-[#33333a] rounded-3xl p-10 shadow-2xl text-center">

        {/* Icon */}
        <div className="w-24 h-24 mx-auto rounded-full bg-yellow-500/20 flex items-center justify-center mb-6">
          <HiClock className="text-yellow-400 text-5xl" />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-white mb-3">
          Approval Pending
        </h1>

        {/* Message */}
        <p className="text-gray-400 text-lg leading-8">
          Your trainer profile has been submitted successfully.
        </p>

        <p className="text-gray-500 mt-3">
          Admin is reviewing your application.
          Once approved, you will be able to manage
          your courses, schedules, students and bookings.
        </p>

        {/* Status */}
        <div className="mt-8 bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-4">
          <span className="text-yellow-400 font-semibold">
            Status : Pending Approval
          </span>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex gap-4">

          <button
            onClick={() => navigate("/")}
            className="flex-1 py-3 rounded-xl bg-gray-700 hover:bg-gray-600 text-white"
          >
            Back Home
          </button>

          <button
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold"
          >
            Contact Admin
          </button>

        </div>

      </div>

    </div>
  );
}