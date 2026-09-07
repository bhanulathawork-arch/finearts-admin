

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import { auth } from "../config/firebase";
// import axios from "axios";
// import {
//   getCategories,
//   getSubcategories,

// } from "../services/trainerService";

// export default function TrainerCreateProfile() {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);
//   // const [institutes, setInstitutes] = useState([]);
//   // const [workType, setWorkType] = useState("individual"); // "individual" | "institute"
//   // console.log(institutes)

//   // EXACT same fields as Admin "Add Trainer" modal + Price + institute_id
//   const [form, setForm] = useState({
//     full_name: "",
//     email: "",
//     phone_number: "",
//     bio: "",
//     experience_years: "",
//     specialty: "",
//     languages: "",
//     skills: "",
//     certifications: "",
//     response_rate: "",
//     total_students: "",
  
//     category_id: "",
//     subcategory_id: "",
//     // institute_id: "",
//     profile_image: null,
//   });

// // useEffect(() => {
// //   const loadInstitutes = async () => {
// //     try {
// //       const token =
// //         await auth.currentUser?.getIdToken(true);

// //       if (!token) {
// //         console.log("NO FIREBASE TOKEN");
// //         return;
// //       }

// //       const res = await getInstitutes(token);

// //       setInstitutes(res.data.data || []);
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };

// //   loadInstitutes();
// // }, []);
//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setForm({ 
//       ...form, 
//       [name]: files ? files[0] : value 
//     });
//   };


//   useEffect(() => {
//   const loadDropdowns = async () => {
//     try {
//       const [categoryRes, subcategoryRes] =
//         await Promise.all([
//           getCategories(),
//           getSubcategories(),
//         ]);

//       console.log(
//         "CATEGORY API =",
//         categoryRes.data
//       );

//       console.log(
//         "SUBCATEGORY API =",
//         subcategoryRes.data
//       );

//       setCategories(
//         categoryRes.data.data || []
//       );

//       setSubcategories(
//         subcategoryRes.data.data || []
//       );
//     } catch (err) {
//       console.error(
//         "Dropdown Error:",
//         err
//       );
//     }
//   };

//   loadDropdowns();
// }, []);

//   const handleSelectChange = (field, value) => {
//     setForm({ 
//       ...form, 
//       [field]: value,
//       // Reset subcategory if category changes
//       ...(field === "category_id" && { subcategory_id: "" }) 
//     });
//   };

// const handleSubmit = async (e) => {
//   e.preventDefault();

//   if (!form.full_name || !form.email || !form.phone_number) {
//     return toast.error("Please fill all required fields");
//   }

//   setLoading(true);

//   try {
//     // Check Firebase Login
//     if (!auth.currentUser) {
//       toast.error("Please login again");
//       navigate("/trainer/login");
//       return;
//     }

//     // Get Fresh Firebase Token
//     const firebaseToken =
//       await auth.currentUser.getIdToken(true);

//     console.log("FRESH TOKEN =", firebaseToken);

//     // Create FormData
//     const fd = new FormData();

//     Object.entries(form).forEach(([key, value]) => {
//       if (
//         value !== null &&
//         value !== undefined &&
//         value !== ""
//       ) {
//         fd.append(key, value);
//       }
//     });

//     // Work Type
//     // fd.append("work_type", workType);

//     // if (workType === "individual") {
//     //   fd.delete("institute_id");
//     // }

//     // Category + Subcategory
//     fd.append(
//       "specializations",
//       JSON.stringify([
//         {
//           category_id: Number(form.category_id),
//           subcategory_id: form.subcategory_id
//             ? Number(form.subcategory_id)
//             : null,
//         },
//       ])
//     );

//     // API Call
//     const res = await axios.post(
//       "https://finearts-backend.onrender.com/api/trainers/complete-profile",
//       fd,
//       {
//         headers: {
//           Authorization: `Bearer ${firebaseToken}`,
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );

//     console.log("PROFILE RESPONSE =", res.data);

//     toast.success(
//       "Profile created successfully!"
//     );

//     navigate("/trainer/pending");

//   } catch (err) {
//     console.error("PROFILE ERROR =", err);

//     toast.error(
//       err?.response?.data?.message ||
//       err?.message ||
//       "Failed to create profile"
//     );
//   } finally {
//     setLoading(false);
//   }
// };
//   // Reusable classes
//   const inputClass = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-purple-500 transition";
//   const selectClass = "w-full bg-[#0a0a0f] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition";

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
//                 <input name="full_name" value={form.full_name} onChange={handleChange} placeholder="John Doe" className={inputClass} />
//               </div>
//               <div>
//                 <label className="text-white/60 text-sm mb-1 block">Email *</label>
//                 <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@email.com" className={inputClass} />
//               </div>
//               <div>
//                 <label className="text-white/60 text-sm mb-1 block">Phone Number *</label>
//                 <input name="phone_number" value={form.phone_number} onChange={handleChange} placeholder="+91 9999999999" className={inputClass} />
//               </div>
//               <div>
//                 <label className="text-white/60 text-sm mb-1 block">Experience (Years)</label>
//                 <input name="experience_years" type="number" value={form.experience_years} onChange={handleChange} placeholder="3" className={inputClass} />
//               </div>
//               <div>
//                 <label className="text-white/60 text-sm mb-1 block">Specialty</label>
//                 <input name="specialty" value={form.specialty} onChange={handleChange} placeholder="e.g. Yoga, Weightlifting" className={inputClass} />
//               </div>
//               <div>
//                 <label className="text-white/60 text-sm mb-1 block">Languages</label>
//                 <input name="languages" value={form.languages} onChange={handleChange} placeholder="English, Hindi" className={inputClass} />
//               </div>
//               <div>
//                 <label className="text-white/60 text-sm mb-1 block">Response Rate</label>
//                 <input name="response_rate" value={form.response_rate} onChange={handleChange} placeholder="e.g. 90%" className={inputClass} />
//               </div>
//               <div>
//                 <label className="text-white/60 text-sm mb-1 block">Total Students</label>
//                 <input name="total_students" type="number" value={form.total_students} onChange={handleChange} placeholder="50" className={inputClass} />
//               </div>
//               {/* <div>
//                 <label className="text-white/60 text-sm mb-1 block">Price</label>
//                 <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="e.g. 500/hr" className={inputClass} />
//               </div> */}
//             </div>
//           </div>

//           {/* About You */}
//           <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
//             <h2 className="text-white font-semibold text-sm uppercase tracking-widest opacity-50">About You</h2>
//             <div>
//               <label className="text-white/60 text-sm mb-1 block">Bio</label>
//               <textarea name="bio" value={form.bio} onChange={handleChange} rows={3} placeholder="Tell students about yourself..." className={`${inputClass} resize-none`} />
//             </div>
//             <div>
//               <label className="text-white/60 text-sm mb-1 block">Skills</label>
//               <textarea name="skills" value={form.skills} onChange={handleChange} rows={2} placeholder="Communication, Nutrition..." className={`${inputClass} resize-none`} />
//             </div>
//             <div>
//               <label className="text-white/60 text-sm mb-1 block">Certifications</label>
//               <textarea name="certifications" value={form.certifications} onChange={handleChange} rows={2} placeholder="ACE Certified, NASM CPT..." className={`${inputClass} resize-none`} />
//             </div>
//           </div>

//           {/* Category & Expertise */}
//           <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
//             <h2 className="text-white font-semibold text-sm uppercase tracking-widest opacity-50">Expertise</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div>
//                 <label className="text-white/60 text-sm mb-1 block">Category</label>
//                 <select
//                   value={form.category_id}
//                   onChange={(e) => handleSelectChange("category_id", e.target.value)}
//                   className={selectClass}
//                 >
//                   <option value="">Select Category</option>
//                   {categories.map((c) => (
//                     <option key={c.id} value={c.id}>{c.name}</option>
//                   ))}
//                 </select>
//               </div>
//               <div>
//                 <label className="text-white/60 text-sm mb-1 block">Subcategory</label>
//                 <select
//                   value={form.subcategory_id}
//                   onChange={(e) => handleSelectChange("subcategory_id", e.target.value)}
//                   className={selectClass}
//                 >
//                   <option value="">Select Subcategory</option>
//                   {subcategories
//                     .filter((s) => !form.category_id || String(s.category_id) === String(form.category_id))
//                     .map((s) => (
//                       <option key={s.id} value={s.id}>{s.name}</option>
//                     ))}
//                 </select>
//               </div>
//             </div>
//           </div>

//           {/* Work Preference (Requested Block) */}
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

//           {/* Profile Image */}
//           <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
//             <h2 className="text-white font-semibold text-sm uppercase tracking-widest opacity-50">Profile Image</h2>
//             <input 
//               type="file" 
//               name="profile_image" 
//               onChange={handleChange} 
//               accept="image/*"
//               className="w-full text-sm text-white/50 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-purple-600/20 file:text-purple-300 hover:file:bg-purple-600/30 file:cursor-pointer"
//             />
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


// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import { auth } from "../config/firebase";
// import axios from "axios";
// import {
//   getCategories,
//   getSubcategories,
// } from "../services/trainerService";

// export default function TrainerCreateProfile() {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);

//   const [form, setForm] = useState({
//     full_name: "",
//     email: "",
//     phone_number: "",
//     bio: "",
//     experience_years: "",
//     specialty: "",
//     languages: "",
//     skills: "",
//     certifications: "",
//     response_rate: "",
//     total_students: "",
//     category_id: "",
//     subcategory_id: "",
//     profile_image: null,
//   });

//   useEffect(() => {
//     const loadDropdowns = async () => {
//       try {
//         const [categoryRes, subcategoryRes] = await Promise.all([
//           getCategories(),
//           getSubcategories(),
//         ]);

//         console.log("CATEGORY API =", categoryRes.data);
//         console.log("SUBCATEGORY API =", subcategoryRes.data);

//         setCategories(categoryRes.data.data || []);
//         setSubcategories(subcategoryRes.data.data || []);
//       } catch (err) {
//         console.error("Dropdown Error:", err);
//       }
//     };

//     loadDropdowns();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setForm({
//       ...form,
//       [name]: files ? files[0] : value,
//     });
//   };

//   const handleSelectChange = (field, value) => {
//     setForm({
//       ...form,
//       [field]: value,
//       ...(field === "category_id" && { subcategory_id: "" }),
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!form.full_name || !form.email || !form.phone_number) {
//       return toast.error("Please fill all required fields");
//     }

//     setLoading(true);

//     try {
//       if (!auth.currentUser) {
//         toast.error("Please login again");
//         navigate("/trainer/login");
//         return;
//       }

//       const firebaseToken = await auth.currentUser.getIdToken(true);
//       console.log("FRESH TOKEN =", firebaseToken);

//       const fd = new FormData();

//       Object.entries(form).forEach(([key, value]) => {
//         if (value !== null && value !== undefined && value !== "") {
//           fd.append(key, value);
//         }
//       });

//       fd.append(
//         "specializations",
//         JSON.stringify([
//           {
//             category_id: Number(form.category_id),
//             subcategory_id: form.subcategory_id
//               ? Number(form.subcategory_id)
//               : null,
//           },
//         ])
//       );

//       const res = await axios.post(
//         "https://finearts-backend.onrender.com/api/trainers/complete-profile",
//         fd,
//         {
//           headers: {
//             Authorization: `Bearer ${firebaseToken}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       console.log("PROFILE RESPONSE =", res.data);

//       toast.success("Profile created successfully!");
//       navigate("/trainer/pending");
//     } catch (err) {
//       console.error("PROFILE ERROR =", err);

//       toast.error(
//         err?.response?.data?.message ||
//         err?.message ||
//         "Failed to create profile"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const inputClass =
//     "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-purple-500 transition";
//   const selectClass =
//     "w-full bg-[#0a0a0f] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition";

//   return (
//     <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-6">
//       <div className="w-full max-w-2xl">
//         {/* Header */}
//         <div className="mb-8 text-center">
//           <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-purple-600/20 border border-purple-500/30 mb-4">
//             <svg
//               className="w-8 h-8 text-purple-400"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={1.5}
//                 d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//               />
//             </svg>
//           </div>
//           <h1 className="text-3xl font-bold text-white">
//             Complete Your Profile
//           </h1>
//           <p className="text-white/50 mt-2">
//             Fill in your details to apply as a trainer
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Basic Info */}
//           <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
//             <h2 className="text-white font-semibold text-sm uppercase tracking-widest opacity-50">
//               Basic Info
//             </h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div>
//                 <label className="text-white/60 text-sm mb-1 block">
//                   Full Name *
//                 </label>
//                 <input
//                   name="full_name"
//                   value={form.full_name}
//                   onChange={handleChange}
//                   placeholder="John Doe"
//                   className={inputClass}
//                 />
//               </div>
//               <div>
//                 <label className="text-white/60 text-sm mb-1 block">
//                   Email *
//                 </label>
//                 <input
//                   name="email"
//                   type="email"
//                   value={form.email}
//                   onChange={handleChange}
//                   placeholder="you@email.com"
//                   className={inputClass}
//                 />
//               </div>
//               <div>
//                 <label className="text-white/60 text-sm mb-1 block">
//                   Phone Number *
//                 </label>
//                 <input
//                   name="phone_number"
//                   value={form.phone_number}
//                   onChange={handleChange}
//                   placeholder="+91 9999999999"
//                   className={inputClass}
//                 />
//               </div>
//               <div>
//                 <label className="text-white/60 text-sm mb-1 block">
//                   Experience (Years)
//                 </label>
//                 <input
//                   name="experience_years"
//                   type="number"
//                   value={form.experience_years}
//                   onChange={handleChange}
//                   placeholder="3"
//                   className={inputClass}
//                 />
//               </div>
//               <div>
//                 <label className="text-white/60 text-sm mb-1 block">
//                   Specialty
//                 </label>
//                 <input
//                   name="specialty"
//                   value={form.specialty}
//                   onChange={handleChange}
//                   placeholder="e.g. Yoga, Weightlifting"
//                   className={inputClass}
//                 />
//               </div>
//               <div>
//                 <label className="text-white/60 text-sm mb-1 block">
//                   Languages
//                 </label>
//                 <input
//                   name="languages"
//                   value={form.languages}
//                   onChange={handleChange}
//                   placeholder="English, Hindi"
//                   className={inputClass}
//                 />
//               </div>
//               <div>
//                 <label className="text-white/60 text-sm mb-1 block">
//                   Response Rate
//                 </label>
//                 <input
//                   name="response_rate"
//                   value={form.response_rate}
//                   onChange={handleChange}
//                   placeholder="e.g. 90%"
//                   className={inputClass}
//                 />
//               </div>
//               <div>
//                 <label className="text-white/60 text-sm mb-1 block">
//                   Total Students
//                 </label>
//                 <input
//                   name="total_students"
//                   type="number"
//                   value={form.total_students}
//                   onChange={handleChange}
//                   placeholder="50"
//                   className={inputClass}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* About You */}
//           <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
//             <h2 className="text-white font-semibold text-sm uppercase tracking-widest opacity-50">
//               About You
//             </h2>
//             <div>
//               <label className="text-white/60 text-sm mb-1 block">Bio</label>
//               <textarea
//                 name="bio"
//                 value={form.bio}
//                 onChange={handleChange}
//                 rows={3}
//                 placeholder="Tell students about yourself..."
//                 className={`${inputClass} resize-none`}
//               />
//             </div>
//             <div>
//               <label className="text-white/60 text-sm mb-1 block">
//                 Skills
//               </label>
//               <textarea
//                 name="skills"
//                 value={form.skills}
//                 onChange={handleChange}
//                 rows={2}
//                 placeholder="Communication, Nutrition..."
//                 className={`${inputClass} resize-none`}
//               />
//             </div>
//             <div>
//               <label className="text-white/60 text-sm mb-1 block">
//                 Certifications
//               </label>
//               <textarea
//                 name="certifications"
//                 value={form.certifications}
//                 onChange={handleChange}
//                 rows={2}
//                 placeholder="ACE Certified, NASM CPT..."
//                 className={`${inputClass} resize-none`}
//               />
//             </div>
//           </div>

//           {/* Category & Expertise */}
//           <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
//             <h2 className="text-white font-semibold text-sm uppercase tracking-widest opacity-50">
//               Expertise
//             </h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div>
//                 <label className="text-white/60 text-sm mb-1 block">
//                   Category
//                 </label>
//                 <select
//                   value={form.category_id}
//                   onChange={(e) =>
//                     handleSelectChange("category_id", e.target.value)
//                   }
//                   className={selectClass}
//                 >
//                   <option value="">Select Category</option>
//                   {categories.map((c) => (
//                     <option key={c.id} value={c.id}>
//                       {c.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div>
//                 <label className="text-white/60 text-sm mb-1 block">
//                   Subcategory
//                 </label>
//                 <select
//                   value={form.subcategory_id}
//                   onChange={(e) =>
//                     handleSelectChange("subcategory_id", e.target.value)
//                   }
//                   className={selectClass}
//                 >
//                   <option value="">Select Subcategory</option>
//                   {subcategories
//                     .filter(
//                       (s) =>
//                         !form.category_id ||
//                         String(s.category_id) === String(form.category_id)
//                     )
//                     .map((s) => (
//                       <option key={s.id} value={s.id}>
//                         {s.name}
//                       </option>
//                     ))}
//                 </select>
//               </div>
//             </div>
//           </div>

//           {/* Profile Image */}
//           <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
//             <h2 className="text-white font-semibold text-sm uppercase tracking-widest opacity-50">
//               Profile Image
//             </h2>
//             <input
//               type="file"
//               name="profile_image"
//               onChange={handleChange}
//               accept="image/*"
//               className="w-full text-sm text-white/50 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-purple-600/20 file:text-purple-300 hover:file:bg-purple-600/30 file:cursor-pointer"
//             />
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



// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import { auth } from "../config/firebase";
// import axios from "axios";
// import {
//   getCategories,
//   getSubcategories,
// } from "../services/trainerService";

// export default function TrainerCreateProfile() {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);

//   const [form, setForm] = useState({
//     full_name: "",
//     email: "",
//     phone_number: "",
//     bio: "",
//     experience_years: "",
//     languages: "",
//     certifications: "",
//     response_rate: "",
//     total_students: "",
//     category_id: "",
//     subcategory_id: "",
//     profile_image: null,
//   });

//   useEffect(() => {
//     const loadDropdowns = async () => {
//       try {
//         const [categoryRes, subcategoryRes] = await Promise.all([
//           getCategories(),
//           getSubcategories(),
//         ]);

//         console.log("CATEGORY API =", categoryRes.data);
//         console.log("SUBCATEGORY API =", subcategoryRes.data);

//         setCategories(categoryRes.data.data || []);
//         setSubcategories(subcategoryRes.data.data || []);
//       } catch (err) {
//         console.error("Dropdown Error:", err);
//       }
//     };

//     loadDropdowns();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setForm({
//       ...form,
//       [name]: files ? files[0] : value,
//     });
//   };

//   const handleSelectChange = (field, value) => {
//     setForm({
//       ...form,
//       [field]: value,
//       ...(field === "category_id" && { subcategory_id: "" }),
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!form.full_name || !form.email || !form.phone_number) {
//       return toast.error("Please fill all required fields");
//     }

//     setLoading(true);

//     try {
//       if (!auth.currentUser) {
//         toast.error("Please login again");
//         navigate("/trainer/login");
//         return;
//       }

//       const firebaseToken = await auth.currentUser.getIdToken(true);
//       console.log("FRESH TOKEN =", firebaseToken);

//       const fd = new FormData();

//       Object.entries(form).forEach(([key, value]) => {
//         if (value !== null && value !== undefined && value !== "") {
//           fd.append(key, value);
//         }
//       });

//       fd.append(
//         "specializations",
//         JSON.stringify([
//           {
//             category_id: Number(form.category_id),
//             subcategory_id: form.subcategory_id
//               ? Number(form.subcategory_id)
//               : null,
//           },
//         ])
//       );

//       const res = await axios.post(
//         "https://finearts-backend.onrender.com/api/trainers/complete-profile",
//         fd,
//         {
//           headers: {
//             Authorization: `Bearer ${firebaseToken}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       console.log("PROFILE RESPONSE =", res.data);

//       toast.success("Profile created successfully!");
//       navigate("/trainer/pending");
//     } catch (err) {
//       console.error("PROFILE ERROR =", err);

//       toast.error(
//         err?.response?.data?.message ||
//         err?.message ||
//         "Failed to create profile"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const inputClass =
//     "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-purple-500 transition";
//   const selectClass =
//     "w-full bg-[#0a0a0f] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition";

//   return (
//     <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-6">
//       <div className="w-full max-w-2xl">
//         {/* Header */}
//         <div className="mb-8 text-center">
//           <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-purple-600/20 border border-purple-500/30 mb-4">
//             <svg
//               className="w-8 h-8 text-purple-400"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={1.5}
//                 d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//               />
//             </svg>
//           </div>
//           <h1 className="text-3xl font-bold text-white">
//             Complete Your Profile
//           </h1>
//           <p className="text-white/50 mt-2">
//             Fill in your details to apply as a trainer
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Basic Info */}
//           <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
//             <h2 className="text-white font-semibold text-sm uppercase tracking-widest opacity-50">
//               Basic Info
//             </h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div>
//                 <label className="text-white/60 text-sm mb-1 block">
//                   Full Name *
//                 </label>
//                 <input
//                   name="full_name"
//                   value={form.full_name}
//                   onChange={handleChange}
//                   placeholder="John Doe"
//                   className={inputClass}
//                 />
//               </div>
//               <div>
//                 <label className="text-white/60 text-sm mb-1 block">
//                   Email *
//                 </label>
//                 <input
//                   name="email"
//                   type="email"
//                   value={form.email}
//                   onChange={handleChange}
//                   placeholder="you@email.com"
//                   className={inputClass}
//                 />
//               </div>
//               <div>
//                 <label className="text-white/60 text-sm mb-1 block">
//                   Phone Number *
//                 </label>
//                 <input
//                   name="phone_number"
//                   value={form.phone_number}
//                   onChange={handleChange}
//                   placeholder="+91 9999999999"
//                   className={inputClass}
//                 />
//               </div>
//               <div>
//                 <label className="text-white/60 text-sm mb-1 block">
//                   Experience (Years)
//                 </label>
//                 <input
//                   name="experience_years"
//                   type="number"
//                   value={form.experience_years}
//                   onChange={handleChange}
//                   placeholder="3"
//                   className={inputClass}
//                 />
//               </div>
//               <div>
//                 <label className="text-white/60 text-sm mb-1 block">
//                   Languages
//                 </label>
//                 <input
//                   name="languages"
//                   value={form.languages}
//                   onChange={handleChange}
//                   placeholder="English, Hindi"
//                   className={inputClass}
//                 />
//               </div>
//               <div>
//                 <label className="text-white/60 text-sm mb-1 block">
//                   Response Rate
//                 </label>
//                 <input
//                   name="response_rate"
//                   value={form.response_rate}
//                   onChange={handleChange}
//                   placeholder="e.g. 90%"
//                   className={inputClass}
//                 />
//               </div>
//               <div>
//                 <label className="text-white/60 text-sm mb-1 block">
//                   Total Students
//                 </label>
//                 <input
//                   name="total_students"
//                   type="number"
//                   value={form.total_students}
//                   onChange={handleChange}
//                   placeholder="50"
//                   className={inputClass}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* About You */}
//           <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
//             <h2 className="text-white font-semibold text-sm uppercase tracking-widest opacity-50">
//               About You
//             </h2>
//             <div>
//               <label className="text-white/60 text-sm mb-1 block">Bio</label>
//               <textarea
//                 name="bio"
//                 value={form.bio}
//                 onChange={handleChange}
//                 rows={3}
//                 placeholder="Tell students about yourself..."
//                 className={`${inputClass} resize-none`}
//               />
//             </div>
//             <div>
//               <label className="text-white/60 text-sm mb-1 block">
//                 Certifications
//               </label>
//               <textarea
//                 name="certifications"
//                 value={form.certifications}
//                 onChange={handleChange}
//                 rows={2}
//                 placeholder="ACE Certified, NASM CPT..."
//                 className={`${inputClass} resize-none`}
//               />
//             </div>
//           </div>

//           {/* Category & Expertise */}
//           <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
//             <h2 className="text-white font-semibold text-sm uppercase tracking-widest opacity-50">
//               Expertise
//             </h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div>
//                 <label className="text-white/60 text-sm mb-1 block">
//                   Category
//                 </label>
//                 <select
//                   value={form.category_id}
//                   onChange={(e) =>
//                     handleSelectChange("category_id", e.target.value)
//                   }
//                   className={selectClass}
//                 >
//                   <option value="">Select Category</option>
//                   {categories.map((c) => (
//                     <option key={c.id} value={c.id}>
//                       {c.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div>
//                 <label className="text-white/60 text-sm mb-1 block">
//                   Subcategory
//                 </label>
//                 <select
//                   value={form.subcategory_id}
//                   onChange={(e) =>
//                     handleSelectChange("subcategory_id", e.target.value)
//                   }
//                   className={selectClass}
//                 >
//                   <option value="">Select Subcategory</option>
//                   {subcategories
//                     .filter(
//                       (s) =>
//                         !form.category_id ||
//                         String(s.category_id) === String(form.category_id)
//                     )
//                     .map((s) => (
//                       <option key={s.id} value={s.id}>
//                         {s.name}
//                       </option>
//                     ))}
//                 </select>
//               </div>
//             </div>
//           </div>

//           {/* Profile Image */}
//           <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
//             <h2 className="text-white font-semibold text-sm uppercase tracking-widest opacity-50">
//               Profile Image
//             </h2>
//             <input
//               type="file"
//               name="profile_image"
//               onChange={handleChange}
//               accept="image/*"
//               className="w-full text-sm text-white/50 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-purple-600/20 file:text-purple-300 hover:file:bg-purple-600/30 file:cursor-pointer"
//             />
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



// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import { auth } from "../config/firebase";
// import axios from "axios";
// import {
//   getCategories,
//   getSubcategories,
// } from "../services/trainerService";

// export default function TrainerCreateProfile() {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);

//   const [form, setForm] = useState({
//     full_name: "",
//     email: "",
//     phone_number: "",
//     experience_years: "",
//     languages: "",
//     certifications: "",
//     selectedCategories: [],
//     selectedSubcategories: [],
//     profile_image: null,
//     proof_document: null, // Added proof document state
//   });

//   useEffect(() => {
//     const loadDropdowns = async () => {
//       try {
//         const [categoryRes, subcategoryRes] = await Promise.all([
//           getCategories(),
//           getSubcategories(),
//         ]);

//         console.log("CATEGORY API =", categoryRes.data);
//         console.log("SUBCATEGORY API =", subcategoryRes.data);

//         setCategories(categoryRes.data.data || []);
//         setSubcategories(subcategoryRes.data.data || []);
//       } catch (err) {
//         console.error("Dropdown Error:", err);
//       }
//     };

//     loadDropdowns();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setForm({
//       ...form,
//       [name]: files ? files[0] : value,
//     });
//   };

//   const handleCategoryChange = (e) => {
//     const catId = Number(e.target.value);
//     setForm((prev) => {
//       const newSelectedCategories = e.target.checked
//         ? [...prev.selectedCategories, catId]
//         : prev.selectedCategories.filter((id) => id !== catId);

//       // Automatically remove subcategories if their parent category is unchecked
//       const newSelectedSubcategories = prev.selectedSubcategories.filter(
//         (subId) => {
//           const sub = subcategories.find((s) => s.id === subId);
//           return sub && newSelectedCategories.includes(sub.category_id);
//         }
//       );

//       return {
//         ...prev,
//         selectedCategories: newSelectedCategories,
//         selectedSubcategories: newSelectedSubcategories,
//       };
//     });
//   };

//   const handleSubcategoryChange = (e) => {
//     const subId = Number(e.target.value);
//     setForm((prev) => ({
//       ...prev,
//       selectedSubcategories: e.target.checked
//         ? [...prev.selectedSubcategories, subId]
//         : prev.selectedSubcategories.filter((id) => id !== subId),
//     }));
//   };

//   // Filter subcategories based on selected categories
//   const filteredSubcategories = subcategories.filter((sub) =>
//     form.selectedCategories.includes(sub.category_id)
//   );

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!form.full_name || !form.email || !form.phone_number) {
//       return toast.error("Please fill all required fields");
//     }

//     setLoading(true);

//     try {
//       if (!auth.currentUser) {
//         toast.error("Please login again");
//         navigate("/trainer/login");
//         return;
//       }

//       const firebaseToken = await auth.currentUser.getIdToken(true);
//       console.log("FRESH TOKEN =", firebaseToken);

//       const fd = new FormData();

//       Object.entries(form).forEach(([key, value]) => {
//         // Skip array state variables as they are handled in specializations
//         if (key === "selectedCategories" || key === "selectedSubcategories") return;
        
//         if (value !== null && value !== undefined && value !== "") {
//           fd.append(key, value);
//         }
//       });

//       // Construct the specializations array dynamically based on multiple selections
//       const categoryPayload = form.selectedCategories.flatMap((catId) => {
//         const relatedSubs = form.selectedSubcategories.filter((subId) => {
//           const sub = subcategories.find((s) => s.id === subId);
//           return sub && sub.category_id === catId;
//         });

//         if (relatedSubs.length > 0) {
//           return relatedSubs.map((subId) => ({
//             category_id: catId,
//             subcategory_id: subId,
//           }));
//         }
//         return [{ category_id: catId, subcategory_id: null }];
//       });

//       fd.append("specializations", JSON.stringify(categoryPayload));

//       const res = await axios.post(
//         "https://finearts-backend.onrender.com/api/trainers/complete-profile",
//         fd,
//         {
//           headers: {
//             Authorization: `Bearer ${firebaseToken}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       console.log("PROFILE RESPONSE =", res.data);

//       toast.success("Profile created successfully!");
//       navigate("/trainer/pending");
//     } catch (err) {
//       console.error("PROFILE ERROR =", err);

//       toast.error(
//         err?.response?.data?.message ||
//         err?.message ||
//         "Failed to create profile"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const inputClass =
//     "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-purple-500 transition";
  
//   const checkboxContainerClass =
//     "w-full bg-[#0a0a0f] border border-white/10 rounded-xl p-3 max-h-48 overflow-y-auto focus-within:border-purple-500 transition";

//   return (
//     <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-6">
//       <div className="w-full max-w-2xl">
//         {/* Header */}
//         <div className="mb-8 text-center">
//           <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-purple-600/20 border border-purple-500/30 mb-4">
//             <svg
//               className="w-8 h-8 text-purple-400"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={1.5}
//                 d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//               />
//             </svg>
//           </div>
//           <h1 className="text-3xl font-bold text-white">
//             Complete Your Profile
//           </h1>
//           <p className="text-white/50 mt-2">
//             Fill in your details to apply as a trainer
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Basic Info */}
//           <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
//             <h2 className="text-white font-semibold text-sm uppercase tracking-widest opacity-50">
//               Basic Info
//             </h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div>
//                 <label className="text-white/60 text-sm mb-1 block">
//                   Full Name *
//                 </label>
//                 <input
//                   name="full_name"
//                   value={form.full_name}
//                   onChange={handleChange}
//                   placeholder="John Doe"
//                   className={inputClass}
//                 />
//               </div>
//               <div>
//                 <label className="text-white/60 text-sm mb-1 block">
//                   Email *
//                 </label>
//                 <input
//                   name="email"
//                   type="email"
//                   value={form.email}
//                   onChange={handleChange}
//                   placeholder="you@email.com"
//                   className={inputClass}
//                 />
//               </div>
//               <div>
//                 <label className="text-white/60 text-sm mb-1 block">
//                   Phone Number *
//                 </label>
//                 <input
//                   name="phone_number"
//                   value={form.phone_number}
//                   onChange={handleChange}
//                   placeholder="+91 9999999999"
//                   className={inputClass}
//                 />
//               </div>
//               <div>
//                 <label className="text-white/60 text-sm mb-1 block">
//                   Experience (Years)
//                 </label>
//                 <input
//                   name="experience_years"
//                   type="number"
//                   value={form.experience_years}
//                   onChange={handleChange}
//                   placeholder="3"
//                   className={inputClass}
//                 />
//               </div>
//               <div className="sm:col-span-2">
//                 <label className="text-white/60 text-sm mb-1 block">
//                   Languages
//                 </label>
//                 <input
//                   name="languages"
//                   value={form.languages}
//                   onChange={handleChange}
//                   placeholder="English, Hindi"
//                   className={inputClass}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* About You */}
//           <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
//             <h2 className="text-white font-semibold text-sm uppercase tracking-widest opacity-50">
//               About You
//             </h2>
//             <div>
//               <label className="text-white/60 text-sm mb-1 block">
//                 Certifications
//               </label>
//               <textarea
//                 name="certifications"
//                 value={form.certifications}
//                 onChange={handleChange}
//                 rows={2}
//                 placeholder="ACE Certified, NASM CPT..."
//                 className={`${inputClass} resize-none`}
//               />
//             </div>
//           </div>

//           {/* Category & Expertise */}
//           <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
//             <h2 className="text-white font-semibold text-sm uppercase tracking-widest opacity-50">
//               Expertise
//             </h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div>
//                 <label className="text-white/60 text-sm mb-1 block">
//                   Categories
//                 </label>
//                 <div className={checkboxContainerClass}>
//                   {categories.length === 0 ? (
//                     <p className="text-white/20 text-sm p-2">Loading...</p>
//                   ) : (
//                     categories.map((c) => (
//                       <label
//                         key={c.id}
//                         className="flex items-center gap-3 py-1.5 px-2 rounded-lg hover:bg-white/5 cursor-pointer"
//                       >
//                         <input
//                           type="checkbox"
//                           value={c.id}
//                           onChange={handleCategoryChange}
//                           checked={form.selectedCategories.includes(c.id)}
//                           className="w-4 h-4 accent-purple-500"
//                         />
//                         <span className="text-white text-sm">{c.name}</span>
//                       </label>
//                     ))
//                   )}
//                 </div>
//               </div>
//               <div>
//                 <label className="text-white/60 text-sm mb-1 block">
//                   Subcategories
//                 </label>
//                 <div className={checkboxContainerClass}>
//                   {form.selectedCategories.length === 0 ? (
//                     <p className="text-white/20 text-sm p-2">Select a category first</p>
//                   ) : filteredSubcategories.length === 0 ? (
//                     <p className="text-white/20 text-sm p-2">No subcategories available</p>
//                   ) : (
//                     filteredSubcategories.map((s) => (
//                       <label
//                         key={s.id}
//                         className="flex items-center gap-3 py-1.5 px-2 rounded-lg hover:bg-white/5 cursor-pointer"
//                       >
//                         <input
//                           type="checkbox"
//                           value={s.id}
//                           onChange={handleSubcategoryChange}
//                           checked={form.selectedSubcategories.includes(s.id)}
//                           className="w-4 h-4 accent-purple-500"
//                         />
//                         <span className="text-white text-sm">{s.name}</span>
//                       </label>
//                     ))
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Uploads */}
//           <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">
//             <h2 className="text-white font-semibold text-sm uppercase tracking-widest opacity-50">
//               Uploads
//             </h2>
//             <div>
//               <label className="text-white/60 text-sm mb-1 block">
//                 Profile Image
//               </label>
//               <input
//                 type="file"
//                 name="profile_image"
//                 onChange={handleChange}
//                 accept="image/*"
//                 className="w-full text-sm text-white/50 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-purple-600/20 file:text-purple-300 hover:file:bg-purple-600/30 file:cursor-pointer"
//               />
//             </div>
//             <div>
//               <label className="text-white/60 text-sm mb-1 block">
//                 Proof Document (e.g., Certificate, ID)
//               </label>
//               <input
//                 type="file"
//                 name="proof_document"
//                 onChange={handleChange}
//                 accept=".pdf,.jpg,.jpeg,.png"
//                 className="w-full text-sm text-white/50 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-purple-600/20 file:text-purple-300 hover:file:bg-purple-600/30 file:cursor-pointer"
//               />
//             </div>
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




import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import {
  getCategories,
  getSubcategories,
} from "../services/trainerService";

export default function TrainerCreateProfile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    experience_years: "",
    languages: "",
    certifications: "",
    selectedCategories: [],
    selectedSubcategories: [],
    profile_image: null,
    proof_document: null,
  });

  /*
   * Keep track of fields the trainer has manually edited.
   *
   * Firebase auth can finish loading after this page mounts.
   * We therefore populate email/phone from the logged-in account
   * only when the trainer has not already typed something.
   */
  const [userEditedFields, setUserEditedFields] = useState({});

  /* =========================================================
     FETCH LOGGED-IN ACCOUNT DETAILS

     Email and phone are populated from the Firebase account
     automatically, but both fields remain fully editable.

     If the Firebase account does not contain a phone number,
     the phone field stays empty so the trainer can type it.
  ========================================================= */

  useEffect(() => {
    let cancelled = false;

    const populateAccountDetails = (firebaseUser) => {
      if (!firebaseUser || cancelled) {
        return;
      }

      const firebaseEmail =
        firebaseUser.email ||
        "";

      const firebasePhone =
        firebaseUser.phoneNumber ||
        "";

      console.log(
        "=========================================="
      );
      console.log(
        "TRAINER CREATE PROFILE - ACCOUNT DETAILS"
      );
      console.log(
        "Firebase UID:",
        firebaseUser.uid
      );
      console.log(
        "Firebase Email:",
        firebaseEmail || null
      );
      console.log(
        "Firebase Phone:",
        firebasePhone || null
      );
      console.log(
        "=========================================="
      );

      setForm((prev) => ({
        ...prev,

        /*
         * Only auto-fill if the trainer has not manually
         * entered/changed the field.
         */
        email:
          userEditedFields.email
            ? prev.email
            : prev.email || firebaseEmail,

        phone_number:
          userEditedFields.phone_number
            ? prev.phone_number
            : prev.phone_number || firebasePhone,
      }));
    };

    /*
     * Firebase may already be ready.
     */
    if (auth.currentUser) {
      populateAccountDetails(
        auth.currentUser
      );
    }

    /*
     * Also listen for the Firebase auth state because this page
     * can render before Firebase finishes restoring the session.
     */
    const unsubscribe =
      onAuthStateChanged(
        auth,
        (firebaseUser) => {
          populateAccountDetails(
            firebaseUser
          );
        }
      );

    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, [userEditedFields.email, userEditedFields.phone_number]);

  useEffect(() => {
    const loadDropdowns = async () => {
      try {
        const [categoryRes, subcategoryRes] = await Promise.all([
          getCategories(),
          getSubcategories(),
        ]);

        console.log("CATEGORY API =", categoryRes.data);
        console.log("SUBCATEGORY API =", subcategoryRes.data);

        setCategories(categoryRes.data.data || []);
        setSubcategories(subcategoryRes.data.data || []);
      } catch (err) {
        console.error("Dropdown Error:", err);
      }
    };

    loadDropdowns();
  }, []);

  const handleChange = (e) => {
    const {
      name,
      value,
      files,
    } = e.target;

    /*
     * File inputs are also handled here, but only text fields
     * need the "user edited" protection.
     */
    if (
      name === "email" ||
      name === "phone_number"
    ) {
      setUserEditedFields((prev) => ({
        ...prev,
        [name]: true,
      }));
    }

    setForm((prev) => ({
      ...prev,
      [name]: files
        ? files[0]
        : value,
    }));
  };

  const handleCategoryChange = (e) => {
    const catId = Number(e.target.value);
    setForm((prev) => {
      const newSelectedCategories = e.target.checked
        ? [...prev.selectedCategories, catId]
        : prev.selectedCategories.filter((id) => id !== catId);

      // Automatically remove subcategories if their parent category is unchecked
      const newSelectedSubcategories = prev.selectedSubcategories.filter(
        (subId) => {
          const sub = subcategories.find((s) => s.id === subId);
          return sub && newSelectedCategories.includes(sub.category_id);
        }
      );

      return {
        ...prev,
        selectedCategories: newSelectedCategories,
        selectedSubcategories: newSelectedSubcategories,
      };
    });
  };

  const handleSubcategoryChange = (e) => {
    const subId = Number(e.target.value);
    setForm((prev) => ({
      ...prev,
      selectedSubcategories: e.target.checked
        ? [...prev.selectedSubcategories, subId]
        : prev.selectedSubcategories.filter((id) => id !== subId),
    }));
  };

  // Filter subcategories based on selected categories
  const filteredSubcategories = subcategories.filter((sub) =>
    form.selectedCategories.includes(sub.category_id)
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.full_name || !form.email || !form.phone_number) {
      return toast.error("Please fill all required fields");
    }

    setLoading(true);

    try {
      if (!auth.currentUser) {
        toast.error("Please login again");
        navigate("/trainer/login");
        return;
      }

      const firebaseToken = await auth.currentUser.getIdToken(true);
      console.log("FRESH TOKEN =", firebaseToken);

      const fd = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        // Skip array state variables as they are handled in specializations
        if (key === "selectedCategories" || key === "selectedSubcategories") return;
        
        if (value !== null && value !== undefined && value !== "") {
          fd.append(key, value);
        }
      });

      // Construct the specializations array dynamically based on multiple selections
      const categoryPayload = form.selectedCategories.flatMap((catId) => {
        const relatedSubs = form.selectedSubcategories.filter((subId) => {
          const sub = subcategories.find((s) => s.id === subId);
          return sub && sub.category_id === catId;
        });

        if (relatedSubs.length > 0) {
          return relatedSubs.map((subId) => ({
            category_id: catId,
            subcategory_id: subId,
          }));
        }
        return [{ category_id: catId, subcategory_id: null }];
      });

      fd.append("specializations", JSON.stringify(categoryPayload));

      const res = await axios.post(
        "https://finearts-backend.onrender.com/api/trainers/complete-profile",
        fd,
        {
          headers: {
            Authorization: `Bearer ${firebaseToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("PROFILE RESPONSE =", res.data);

      toast.success("Profile created successfully!");
      navigate("/trainer/pending");
    } catch (err) {
      console.error("PROFILE ERROR =", err);

      toast.error(
        err?.response?.data?.message ||
        err?.message ||
        "Failed to create profile"
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-purple-500 transition";
  
  const checkboxContainerClass =
    "w-full bg-[#0a0a0f] border border-white/10 rounded-xl p-3 max-h-48 overflow-y-auto focus-within:border-purple-500 transition";

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-purple-600/20 border border-purple-500/30 mb-4">
            <svg
              className="w-8 h-8 text-purple-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white">
            Complete Your Profile
          </h1>
          <p className="text-white/50 mt-2">
            Fill in your details to apply as a trainer
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
            <h2 className="text-white font-semibold text-sm uppercase tracking-widest opacity-50">
              Basic Info
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-white/60 text-sm mb-1 block">
                  Full Name *
                </label>
                <input
                  name="full_name"
                  value={form.full_name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="text-white/60 text-sm mb-1 block">
                  Email *
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@email.com"
                  autoComplete="email"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="text-white/60 text-sm mb-1 block">
                  Phone Number *
                </label>
                <input
                  name="phone_number"
                  value={form.phone_number}
                  onChange={handleChange}
                  placeholder="+91 9999999999"
                  type="tel"
                  autoComplete="tel"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="text-white/60 text-sm mb-1 block">
                  Experience (Years)
                </label>
                <input
                  name="experience_years"
                  type="number"
                  value={form.experience_years}
                  onChange={handleChange}
                  placeholder="3"
                  className={inputClass}
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-white/60 text-sm mb-1 block">
                  Languages
                </label>
                <input
                  name="languages"
                  value={form.languages}
                  onChange={handleChange}
                  placeholder="English, Hindi"
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* About You */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
            <h2 className="text-white font-semibold text-sm uppercase tracking-widest opacity-50">
              About You
            </h2>
            <div>
              <label className="text-white/60 text-sm mb-1 block">
                Certifications
              </label>
              <textarea
                name="certifications"
                value={form.certifications}
                onChange={handleChange}
                rows={2}
                placeholder="ACE Certified, NASM CPT..."
                className={`${inputClass} resize-none`}
              />
            </div>
          </div>

          {/* Category & Expertise */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
            <h2 className="text-white font-semibold text-sm uppercase tracking-widest opacity-50">
              Expertise
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-white/60 text-sm mb-1 block">
                  Categories
                </label>
                <div className={checkboxContainerClass}>
                  {categories.length === 0 ? (
                    <p className="text-white/20 text-sm p-2">Loading...</p>
                  ) : (
                    categories.map((c) => (
                      <label
                        key={c.id}
                        className="flex items-center gap-3 py-1.5 px-2 rounded-lg hover:bg-white/5 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          value={c.id}
                          onChange={handleCategoryChange}
                          checked={form.selectedCategories.includes(c.id)}
                          className="w-4 h-4 accent-purple-500"
                        />
                        <span className="text-white text-sm">{c.name}</span>
                      </label>
                    ))
                  )}
                </div>
              </div>
              <div>
                <label className="text-white/60 text-sm mb-1 block">
                  Subcategories
                </label>
                <div className={checkboxContainerClass}>
                  {form.selectedCategories.length === 0 ? (
                    <p className="text-white/20 text-sm p-2">Select a category first</p>
                  ) : filteredSubcategories.length === 0 ? (
                    <p className="text-white/20 text-sm p-2">No subcategories available</p>
                  ) : (
                    filteredSubcategories.map((s) => (
                      <label
                        key={s.id}
                        className="flex items-center gap-3 py-1.5 px-2 rounded-lg hover:bg-white/5 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          value={s.id}
                          onChange={handleSubcategoryChange}
                          checked={form.selectedSubcategories.includes(s.id)}
                          className="w-4 h-4 accent-purple-500"
                        />
                        <span className="text-white text-sm">{s.name}</span>
                      </label>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Uploads */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">
            <h2 className="text-white font-semibold text-sm uppercase tracking-widest opacity-50">
              Uploads
            </h2>
            <div>
              <label className="text-white/60 text-sm mb-1 block">
                Profile Image
              </label>
              <input
                type="file"
                name="profile_image"
                onChange={handleChange}
                accept="image/*"
                className="w-full text-sm text-white/50 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-purple-600/20 file:text-purple-300 hover:file:bg-purple-600/30 file:cursor-pointer"
              />
            </div>
            <div>
              <label className="text-white/60 text-sm mb-1 block">
                Proof Document (e.g., Certificate, ID)
              </label>
              <input
                type="file"
                name="proof_document"
                onChange={handleChange}
                accept=".pdf,.jpg,.jpeg,.png"
                className="w-full text-sm text-white/50 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-purple-600/20 file:text-purple-300 hover:file:bg-purple-600/30 file:cursor-pointer"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-2xl transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Submitting..." : "Submit for Approval →"}
          </button>
        </form>
      </div>
    </div>
  );
}
