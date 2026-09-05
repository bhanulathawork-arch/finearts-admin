// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import { auth } from "../config/firebase";
// import { completeInstituteProfile } from "../services/instituteService";
// import API from "../services/api";

// export default function CreateProfile() {
//   const navigate = useNavigate();

//   const [categories, setCategories] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     name: "",
//   description: "",
//   email: "",
//   phone_number: "",
//   city: "",
//   state: "",
 
//   pincode: "",
//   timing: "",
//   rating: "",
//   reviews: "",
//   distance: "",
//   courses: "",
//   category_id: "",
//   subcategory_id: "",
//   image: null,
// });

//   const fetchDropdowns = async () => {
//     try {
//       const [catRes, subRes] = await Promise.all([
//         API.get("/categories"),
//         API.get("/subcategories"),
//       ]);

//       setCategories(catRes.data.data || []);
//       setSubcategories(subRes.data.data || []);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     fetchDropdowns();
//   }, []);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleImage = (e) => {
//     const file = e.target.files[0];

//     if (file) {
//       setFormData({
//         ...formData,
//         image: file,
//       });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       if (!auth.currentUser) {
//         toast.error("Please login again");
//         setLoading(false);
//         return;
//       }

//       const firebaseToken = await auth.currentUser.getIdToken();

//     const payload = new FormData();

// payload.append("name", formData.name);
// payload.append("description", formData.description);
// payload.append("email", formData.email);
// payload.append("phone_number", formData.phone_number);
// payload.append("city", formData.city);
// payload.append("state", formData.state);

// payload.append("pincode", formData.pincode);
// payload.append("timing", formData.timing);
// payload.append("rating", formData.rating);
// payload.append("reviews", formData.reviews);
// payload.append("distance", formData.distance);

// payload.append(
//   "categories",
//   JSON.stringify([
//     {
//       category_id: formData.category_id
//         ? Number(formData.category_id)
//         : null,

//       subcategory_id: formData.subcategory_id
//         ? Number(formData.subcategory_id)
//         : null,
//     },
//   ])
// );

// if (formData.image) {
//   payload.append("image", formData.image);
// }

// await completeInstituteProfile(
//   payload,
//   firebaseToken
// );
     

//       localStorage.setItem("profileCreated", "true");

//       toast.success("Profile submitted successfully");

//       navigate("/institute/pending");
//     } catch (err) {
//       console.error(err);

//       toast.error(
//         err?.response?.data?.message ||
//           err?.message ||
//           "Failed to submit profile"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const inputClass =
//     "w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition";

//   const selectClass =
//     "w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition";

//   const labelClass =
//     "block text-sm font-medium text-white mb-2";

//   return (
//     <div className="min-h-screen bg-[#08080c] flex items-center justify-center px-4 py-10">
//       <div className="w-full max-w-3xl bg-[#18181d] border border-[#33333a] rounded-3xl p-8 shadow-2xl">
        
//         {/* ── Header (IN upload removed) ── */}
//         <div className="flex flex-col items-center mb-8">
//           <h1 className="text-4xl font-bold text-purple-400">
//             Create Institute Profile
//           </h1>

//           <p className="text-white mt-2">
//             Complete institute details
//           </p>
//         </div>

//         {/* ── Form ── */}
//         <form onSubmit={handleSubmit} className="space-y-4">

//           {/* ① Institute Name */}
//           <div>
//             <label className={labelClass}>Institute Name</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className={inputClass}
//             />
//           </div>

//           {/* ② Description */}
//           <div>
//             <label className={labelClass}>Description</label>
//             <textarea
//               rows="4"
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               className={inputClass}
//             />
//           </div>

//           {/* ③ Email + Phone */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className={labelClass}>Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className={inputClass}
//               />
//             </div>
//             <div>
//               <label className={labelClass}>Phone</label>
//               <input
//                 type="text"
//                 name="phone_number"
//                 value={formData.phone_number}
//                 onChange={handleChange}
//                 className={inputClass}
//               />
//             </div>
//           </div>

//           {/* ④ City + State + Timing */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div>
//               <label className={labelClass}>City</label>
//               <input
//                 type="text"
//                 name="city"
//                 value={formData.city}
//                 onChange={handleChange}
//                 className={inputClass}
//               />
//             </div>
//             <div>
//               <label className={labelClass}>State</label>
//               <input
//                 type="text"
//                 name="state"
//                 value={formData.state}
//                 onChange={handleChange}
//                 className={inputClass}
//               />
//             </div>
//             <div>
//               <label className={labelClass}>Timing</label>
//               <input
//                 type="text"
//                 name="timing"
//                 value={formData.timing}
//                 onChange={handleChange}
//                 className={inputClass}
//               />
//             </div>
//           </div>

// <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//   {/* <div>
//     <label className={labelClass}>Address</label>
//     <textarea
//       name="address"
//       value={formData.address}
//       onChange={handleChange}
//       className={inputClass}
//       rows="3"
//     />
//   </div> */}

//   <div>
//     <label className={labelClass}>Pincode</label>
//     <input
//       type="text"
//       name="pincode"
//       value={formData.pincode}
//       onChange={handleChange}
//       className={inputClass}
//     />
//   </div>
// </div>



//           {/* ⑤ Rating + Reviews + Distance + Courses */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             <div>
//               <label className={labelClass}>Rating</label>
//               <input
//                 type="number"
//                 name="rating"
//                 step="0.1"
//                 value={formData.rating}
//                 onChange={handleChange}
//                 className={inputClass}
//               />
//             </div>
//             <div>
//               <label className={labelClass}>Reviews</label>
//               <input
//                 type="number"
//                 name="reviews"
//                 value={formData.reviews}
//                 onChange={handleChange}
//                 className={inputClass}
//               />
//             </div>
//             <div>
//               <label className={labelClass}>Distance</label>
//               <input
//                 type="text"
//                 name="distance"
//                 value={formData.distance}
//                 onChange={handleChange}
//                 className={inputClass}
//               />
//             </div>
//             <div>
//               <label className={labelClass}>Courses</label>
//               <input
//                 type="number"
//                 name="courses"
//                 value={formData.courses}
//                 onChange={handleChange}
//                 className={inputClass}
//               />
//             </div>
//           </div>

//           {/* ⑥ Category + Subcategory */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className={labelClass}>Category</label>
//               <select
//                 name="category_id"
//                 value={formData.category_id}
//                 onChange={(e) =>
//                   setFormData({
//                     ...formData,
//                     category_id: e.target.value,
//                     subcategory_id: "",
//                   })
//                 }
//                 className={selectClass}
//               >
//                 <option value="">Select Category</option>
//                 {categories.map((cat) => (
//                   <option
//                     key={cat.id}
//                     value={cat.id}
//                     className="bg-[#1f1f2e]"
//                   >
//                     {cat.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className={labelClass}>Subcategory</label>
//               <select
//                 name="subcategory_id"
//                 value={formData.subcategory_id}
//                 onChange={(e) =>
//                   setFormData({
//                     ...formData,
//                     subcategory_id: e.target.value,
//                   })
//                 }
//                 className={selectClass}
//                 disabled={!formData.category_id}
//               >
//                 <option value="">
//                   {formData.category_id
//                     ? "Select Subcategory"
//                     : "Select category first"}
//                 </option>
//                 {subcategories
//                   .filter(
//                     (sub) =>
//                       String(sub.category_id) ===
//                       String(formData.category_id)
//                   )
//                   .map((sub) => (
//                     <option
//                       key={sub.id}
//                       value={sub.id}
//                       className="bg-[#1f1f2e]"
//                     >
//                       {sub.name}
//                     </option>
//                   ))}
//               </select>
//             </div>
//           </div>

//           {/* ⑦ Institute Image */}
//           <div>
//             <label className={labelClass}>Institute Image</label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImage}
//               className="block w-full text-sm text-white
//                 file:mr-4
//                 file:py-2
//                 file:px-4
//                 file:rounded-lg
//                 file:border-0
//                 file:bg-purple-600
//                 file:text-white
//                 hover:file:bg-purple-700"
//             />
//           </div>

//           {/* ⑧ Submit */}
//           <div className="flex justify-end pt-4">
//             <button
//               type="submit"
//               disabled={loading}
//               className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold
//                 hover:from-purple-600 hover:to-pink-600
//                 disabled:opacity-50 disabled:cursor-not-allowed
//                 transition-all duration-300"
//             >
//               {loading ? (
//                 <span className="flex items-center gap-2">
//                   <svg
//                     className="animate-spin h-5 w-5 text-white"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                     />
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
//                     />
//                   </svg>
//                   Submitting...
//                 </span>
//               ) : (
//                 "Send For Approval"
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }



// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import { auth } from "../config/firebase";
// import { completeInstituteProfile } from "../services/instituteService";
// import API from "../services/api";

// export default function CreateProfile() {
//   const navigate = useNavigate();

//   const [categories, setCategories] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     email: "",
//     phone_number: "",
//     city: "",
//     state: "",
//     pincode: "",
//     timing: "",
//     start_time: "",
//     end_time: "",
//     timezone: "Asia/Kolkata",
//     rating: "",
//     reviews: "",
//     distance: "",
//     courses: "",
//     category_id: "",
//     subcategory_id: "",
//     image: null,
//   });

//   const fetchDropdowns = async () => {
//     try {
//       const [catRes, subRes] = await Promise.all([
//         API.get("/categories"),
//         API.get("/subcategories"),
//       ]);

//       setCategories(catRes.data.data || []);
//       setSubcategories(subRes.data.data || []);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     fetchDropdowns();
//   }, []);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleImage = (e) => {
//     const file = e.target.files[0];

//     if (file) {
//       setFormData({
//         ...formData,
//         image: file,
//       });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       if (!auth.currentUser) {
//         toast.error("Please login again");
//         setLoading(false);
//         return;
//       }

//       const firebaseToken = await auth.currentUser.getIdToken();

//       const payload = new FormData();

//       payload.append("name", formData.name);
//       payload.append("description", formData.description);
//       payload.append("email", formData.email);
//       payload.append("phone_number", formData.phone_number);
//       payload.append("city", formData.city);
//       payload.append("state", formData.state);
//       payload.append("pincode", formData.pincode);
//       payload.append("timing", formData.timing);
//       payload.append("start_time", formData.start_time);
//       payload.append("end_time", formData.end_time);
//       payload.append("timezone", formData.timezone);
//       payload.append("rating", formData.rating);
//       payload.append("reviews", formData.reviews);
//       payload.append("distance", formData.distance);
//       payload.append(
//         "categories",
//         JSON.stringify([
//           {
//             category_id: formData.category_id
//               ? Number(formData.category_id)
//               : null,

//             subcategory_id: formData.subcategory_id
//               ? Number(formData.subcategory_id)
//               : null,
//           },
//         ])
//       );

//       if (formData.image) {
//         payload.append("image", formData.image);
//       }

//       await completeInstituteProfile(payload, firebaseToken);

//       localStorage.setItem("profileCreated", "true");

//       toast.success("Profile submitted successfully");

//       navigate("/institute/pending");
//     } catch (err) {
//       console.error(err);

//       toast.error(
//         err?.response?.data?.message ||
//           err?.message ||
//           "Failed to submit profile"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const inputClass =
//     "w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition";

//   const selectClass =
//     "w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition";

//   const labelClass = "block text-sm font-medium text-white mb-2";

//   return (
//     <div className="min-h-screen bg-[#08080c] flex items-center justify-center px-4 py-10">
//       <div className="w-full max-w-3xl bg-[#18181d] border border-[#33333a] rounded-3xl p-8 shadow-2xl">
//         {/* ── Header ── */}
//         <div className="flex flex-col items-center mb-8">
//           <h1 className="text-4xl font-bold text-purple-400">
//             Create Institute Profile
//           </h1>

//           <p className="text-white mt-2">
//             Complete institute details
//           </p>
//         </div>

//         {/* ── Form ── */}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* ① Institute Name */}
//           <div>
//             <label className={labelClass}>Institute Name</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className={inputClass}
//             />
//           </div>

//           {/* ② Description */}
//           <div>
//             <label className={labelClass}>Description</label>
//             <textarea
//               rows="4"
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               className={inputClass}
//             />
//           </div>

//           {/* ③ Email + Phone */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className={labelClass}>Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className={inputClass}
//               />
//             </div>
//             <div>
//               <label className={labelClass}>Phone</label>
//               <input
//                 type="text"
//                 name="phone_number"
//                 value={formData.phone_number}
//                 onChange={handleChange}
//                 className={inputClass}
//               />
//             </div>
//           </div>

//           {/* ④ City + State + Timing */}
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             <div>
//               <label className={labelClass}>City</label>
//               <input
//                 type="text"
//                 name="city"
//                 value={formData.city}
//                 onChange={handleChange}
//                 className={inputClass}
//               />
//             </div>

//             <div>
//               <label className={labelClass}>State</label>
//               <input
//                 type="text"
//                 name="state"
//                 value={formData.state}
//                 onChange={handleChange}
//                 className={inputClass}
//               />
//             </div>

//             <div>
//               <label className={labelClass}>Timing</label>
//               <input
//                 type="text"
//                 name="timing"
//                 value={formData.timing}
//                 onChange={handleChange}
//                 className={inputClass}
//                 placeholder="9 AM - 6 PM"
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div>
//               <label className={labelClass}>Start Time</label>
//               <input
//                 type="time"
//                 name="start_time"
//                 value={formData.start_time}
//                 onChange={handleChange}
//                 className={inputClass}
//               />
//             </div>

//             <div>
//               <label className={labelClass}>End Time</label>
//               <input
//                 type="time"
//                 name="end_time"
//                 value={formData.end_time}
//                 onChange={handleChange}
//                 className={inputClass}
//               />
//             </div>

//             <div>
//               <label className={labelClass}>Timezone</label>
//               <select
//                 name="timezone"
//                 value={formData.timezone}
//                 onChange={handleChange}
//                 className={selectClass}
//               >
//                 <option value="Asia/Kolkata">India (IST)</option>
//                 <option value="America/New_York">USA - New York</option>
//                 <option value="America/Chicago">USA - Chicago</option>
//                 <option value="America/Denver">USA - Denver</option>
//                 <option value="America/Los_Angeles">USA - Los Angeles</option>
//                 <option value="Europe/London">United Kingdom</option>
//                 <option value="Europe/Paris">France</option>
//                 <option value="Europe/Berlin">Germany</option>
//                 <option value="Asia/Dubai">UAE</option>
//                 <option value="Asia/Singapore">Singapore</option>
//                 <option value="Asia/Tokyo">Japan</option>
//                 <option value="Australia/Sydney">Australia</option>
//               </select>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className={labelClass}>Pincode</label>
//               <input
//                 type="text"
//                 name="pincode"
//                 value={formData.pincode}
//                 onChange={handleChange}
//                 className={inputClass}
//               />
//             </div>
//           </div>

//           {/* ⑤ Rating + Reviews + Distance + Courses */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             <div>
//               <label className={labelClass}>Rating</label>
//               <input
//                 type="number"
//                 name="rating"
//                 step="0.1"
//                 value={formData.rating}
//                 onChange={handleChange}
//                 className={inputClass}
//               />
//             </div>
//             <div>
//               <label className={labelClass}>Reviews</label>
//               <input
//                 type="number"
//                 name="reviews"
//                 value={formData.reviews}
//                 onChange={handleChange}
//                 className={inputClass}
//               />
//             </div>
//             <div>
//               <label className={labelClass}>Distance</label>
//               <input
//                 type="text"
//                 name="distance"
//                 value={formData.distance}
//                 onChange={handleChange}
//                 className={inputClass}
//               />
//             </div>
//             <div>
//               <label className={labelClass}>Courses</label>
//               <input
//                 type="number"
//                 name="courses"
//                 value={formData.courses}
//                 onChange={handleChange}
//                 className={inputClass}
//               />
//             </div>
//           </div>

//           {/* ⑥ Category + Subcategory */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className={labelClass}>Category</label>
//               <select
//                 name="category_id"
//                 value={formData.category_id}
//                 onChange={(e) =>
//                   setFormData({
//                     ...formData,
//                     category_id: e.target.value,
//                     subcategory_id: "",
//                   })
//                 }
//                 className={selectClass}
//               >
//                 <option value="">Select Category</option>
//                 {categories.map((cat) => (
//                   <option
//                     key={cat.id}
//                     value={cat.id}
//                     className="bg-[#1f1f2e]"
//                   >
//                     {cat.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className={labelClass}>Subcategory</label>
//               <select
//                 name="subcategory_id"
//                 value={formData.subcategory_id}
//                 onChange={(e) =>
//                   setFormData({
//                     ...formData,
//                     subcategory_id: e.target.value,
//                   })
//                 }
//                 className={selectClass}
//                 disabled={!formData.category_id}
//               >
//                 <option value="">
//                   {formData.category_id
//                     ? "Select Subcategory"
//                     : "Select category first"}
//                 </option>
//                 {subcategories
//                   .filter(
//                     (sub) =>
//                       String(sub.category_id) ===
//                       String(formData.category_id)
//                   )
//                   .map((sub) => (
//                     <option
//                       key={sub.id}
//                       value={sub.id}
//                       className="bg-[#1f1f2e]"
//                     >
//                       {sub.name}
//                     </option>
//                   ))}
//               </select>
//             </div>
//           </div>

//           {/* ⑦ Institute Image */}
//           <div>
//             <label className={labelClass}>Institute Image</label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImage}
//               className="block w-full text-sm text-white
//                 file:mr-4
//                 file:py-2
//                 file:px-4
//                 file:rounded-lg
//                 file:border-0
//                 file:bg-purple-600
//                 file:text-white
//                 hover:file:bg-purple-700"
//             />
//           </div>

//           {/* ⑧ Submit */}
//           <div className="flex justify-end pt-4">
//             <button
//               type="submit"
//               disabled={loading}
//               className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold
//                 hover:from-purple-600 hover:to-pink-600
//                 disabled:opacity-50 disabled:cursor-not-allowed
//                 transition-all duration-300"
//             >
//               {loading ? (
//                 <span className="flex items-center gap-2">
//                   <svg
//                     className="animate-spin h-5 w-5 text-white"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                     />
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
//                     />
//                   </svg>
//                   Submitting...
//                 </span>
//               ) : (
//                 "Send For Approval"
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }




// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import { auth } from "../config/firebase";
// import { completeInstituteProfile } from "../services/instituteService";
// import API from "../services/api";

// export default function CreateProfile() {
//   const navigate = useNavigate();

//   const [categories, setCategories] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     email: "",
//     phone_number: "",
//     city: "",
//     state: "",
//     pincode: "",
//     timing: "",
//     start_time: "",
//     end_time: "",
//     timezone: "Asia/Kolkata",
//     rating: "",
//     reviews: "",
//     distance: "",
//     courses: "",
//     category_id: "",
//     subcategory_id: "",
//     image: null,
//     logo: null,
//   });

//   const fetchDropdowns = async () => {
//     try {
//       const [catRes, subRes] = await Promise.all([
//         API.get("/categories"),
//         API.get("/subcategories"),
//       ]);

//       setCategories(catRes.data.data || []);
//       setSubcategories(subRes.data.data || []);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     fetchDropdowns();
//   }, []);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleImage = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData({
//         ...formData,
//         image: file,
//       });
//     }
//   };

//   const handleLogo = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData({
//         ...formData,
//         logo: file,
//       });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       if (!auth.currentUser) {
//         toast.error("Please login again");
//         setLoading(false);
//         return;
//       }

//       const firebaseToken = await auth.currentUser.getIdToken();

//       const payload = new FormData();

//       payload.append("name", formData.name);
//       payload.append("description", formData.description);
//       payload.append("email", formData.email);
//       payload.append("phone_number", formData.phone_number);
//       payload.append("city", formData.city);
//       payload.append("state", formData.state);
//       payload.append("pincode", formData.pincode);
//       payload.append("timing", formData.timing);
//       payload.append("start_time", formData.start_time);
//       payload.append("end_time", formData.end_time);
//       payload.append("timezone", formData.timezone);
//       payload.append("rating", formData.rating);
//       payload.append("reviews", formData.reviews);
//       payload.append("distance", formData.distance);
//       payload.append(
//         "categories",
//         JSON.stringify([
//           {
//             category_id: formData.category_id
//               ? Number(formData.category_id)
//               : null,

//             subcategory_id: formData.subcategory_id
//               ? Number(formData.subcategory_id)
//               : null,
//           },
//         ])
//       );

//       if (formData.logo) {
//         payload.append("logo", formData.logo);
//       }

//       if (formData.image) {
//         payload.append("image", formData.image);
//       }

//       await completeInstituteProfile(payload, firebaseToken);

//       localStorage.setItem("profileCreated", "true");

//       toast.success("Profile submitted successfully");

//       navigate("/institute/pending");
//     } catch (err) {
//       console.error(err);

//       toast.error(
//         err?.response?.data?.message ||
//           err?.message ||
//           "Failed to submit profile"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const inputClass =
//     "w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition";

//   const selectClass =
//     "w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition";

//   const labelClass = "block text-sm font-medium text-white mb-2";

//   return (
//     <div className="min-h-screen bg-[#08080c] flex items-center justify-center px-4 py-10">
//       <div className="w-full max-w-3xl bg-[#18181d] border border-[#33333a] rounded-3xl p-8 shadow-2xl">
//         {/* ── Header ── */}
//         <div className="flex flex-col items-center mb-8">
//           <h1 className="text-4xl font-bold text-purple-400">
//             Create Institute Profile
//           </h1>

//           <p className="text-white mt-2">
//             Complete institute details
//           </p>
//         </div>

//         {/* ── Form ── */}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* ① Institute Name */}
//           <div>
//             <label className={labelClass}>Institute Name</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className={inputClass}
//             />
//           </div>

//           {/* ② Description */}
//           <div>
//             <label className={labelClass}>Description</label>
//             <textarea
//               rows="4"
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               className={inputClass}
//             />
//           </div>

//           {/* ③ Email + Phone */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className={labelClass}>Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className={inputClass}
//               />
//             </div>
//             <div>
//               <label className={labelClass}>Phone</label>
//               <input
//                 type="text"
//                 name="phone_number"
//                 value={formData.phone_number}
//                 onChange={handleChange}
//                 className={inputClass}
//               />
//             </div>
//           </div>

//           {/* ④ City + State + Timing */}
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             <div>
//               <label className={labelClass}>City</label>
//               <input
//                 type="text"
//                 name="city"
//                 value={formData.city}
//                 onChange={handleChange}
//                 className={inputClass}
//               />
//             </div>

//             <div>
//               <label className={labelClass}>State</label>
//               <input
//                 type="text"
//                 name="state"
//                 value={formData.state}
//                 onChange={handleChange}
//                 className={inputClass}
//               />
//             </div>

//             <div>
//               <label className={labelClass}>Timing</label>
//               <input
//                 type="text"
//                 name="timing"
//                 value={formData.timing}
//                 onChange={handleChange}
//                 className={inputClass}
//                 placeholder="9 AM - 6 PM"
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div>
//               <label className={labelClass}>Start Time</label>
//               <input
//                 type="time"
//                 name="start_time"
//                 value={formData.start_time}
//                 onChange={handleChange}
//                 className={inputClass}
//               />
//             </div>

//             <div>
//               <label className={labelClass}>End Time</label>
//               <input
//                 type="time"
//                 name="end_time"
//                 value={formData.end_time}
//                 onChange={handleChange}
//                 className={inputClass}
//               />
//             </div>

//             <div>
//               <label className={labelClass}>Timezone</label>
//               <select
//                 name="timezone"
//                 value={formData.timezone}
//                 onChange={handleChange}
//                 className={selectClass}
//               >
//                 <option value="Asia/Kolkata">India (IST)</option>
//                 <option value="America/New_York">USA - New York</option>
//                 <option value="America/Chicago">USA - Chicago</option>
//                 <option value="America/Denver">USA - Denver</option>
//                 <option value="America/Los_Angeles">USA - Los Angeles</option>
//                 <option value="Europe/London">United Kingdom</option>
//                 <option value="Europe/Paris">France</option>
//                 <option value="Europe/Berlin">Germany</option>
//                 <option value="Asia/Dubai">UAE</option>
//                 <option value="Asia/Singapore">Singapore</option>
//                 <option value="Asia/Tokyo">Japan</option>
//                 <option value="Australia/Sydney">Australia</option>
//               </select>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className={labelClass}>Pincode</label>
//               <input
//                 type="text"
//                 name="pincode"
//                 value={formData.pincode}
//                 onChange={handleChange}
//                 className={inputClass}
//               />
//             </div>
//           </div>

//           {/* ⑤ Rating + Reviews + Distance + Courses */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             <div>
//               <label className={labelClass}>Rating</label>
//               <input
//                 type="number"
//                 name="rating"
//                 step="0.1"
//                 value={formData.rating}
//                 onChange={handleChange}
//                 className={inputClass}
//               />
//             </div>
//             <div>
//               <label className={labelClass}>Reviews</label>
//               <input
//                 type="number"
//                 name="reviews"
//                 value={formData.reviews}
//                 onChange={handleChange}
//                 className={inputClass}
//               />
//             </div>
//             <div>
//               <label className={labelClass}>Distance</label>
//               <input
//                 type="text"
//                 name="distance"
//                 value={formData.distance}
//                 onChange={handleChange}
//                 className={inputClass}
//               />
//             </div>
//             <div>
//               <label className={labelClass}>Courses</label>
//               <input
//                 type="number"
//                 name="courses"
//                 value={formData.courses}
//                 onChange={handleChange}
//                 className={inputClass}
//               />
//             </div>
//           </div>

//           {/* ⑥ Category + Subcategory */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className={labelClass}>Category</label>
//               <select
//                 name="category_id"
//                 value={formData.category_id}
//                 onChange={(e) =>
//                   setFormData({
//                     ...formData,
//                     category_id: e.target.value,
//                     subcategory_id: "",
//                   })
//                 }
//                 className={selectClass}
//               >
//                 <option value="">Select Category</option>
//                 {categories.map((cat) => (
//                   <option
//                     key={cat.id}
//                     value={cat.id}
//                     className="bg-[#1f1f2e]"
//                   >
//                     {cat.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className={labelClass}>Subcategory</label>
//               <select
//                 name="subcategory_id"
//                 value={formData.subcategory_id}
//                 onChange={(e) =>
//                   setFormData({
//                     ...formData,
//                     subcategory_id: e.target.value,
//                   })
//                 }
//                 className={selectClass}
//                 disabled={!formData.category_id}
//               >
//                 <option value="">
//                   {formData.category_id
//                     ? "Select Subcategory"
//                     : "Select category first"}
//                 </option>
//                 {subcategories
//                   .filter(
//                     (sub) =>
//                       String(sub.category_id) ===
//                       String(formData.category_id)
//                   )
//                   .map((sub) => (
//                     <option
//                       key={sub.id}
//                       value={sub.id}
//                       className="bg-[#1f1f2e]"
//                     >
//                       {sub.name}
//                     </option>
//                   ))}
//               </select>
//             </div>
//           </div>

//           {/* ⑦ Institute Logo */}
//           <div>
//             <label className={labelClass}>Institute Logo</label>
//             {formData.logo && (
//               <img
//                 src={URL.createObjectURL(formData.logo)}
//                 alt="Logo Preview"
//                 className="w-24 h-24 object-contain rounded-xl mb-3 border border-white/10 bg-[#0e0e12] p-1"
//               />
//             )}
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleLogo}
//               className="block w-full text-sm text-white
//                 file:mr-4
//                 file:py-2
//                 file:px-4
//                 file:rounded-lg
//                 file:border-0
//                 file:bg-purple-600
//                 file:text-white
//                 hover:file:bg-purple-700"
//             />
//           </div>

//           {/* ⑧ Institute Image */}
//           <div>
//             <label className={labelClass}>Institute Image</label>
//             {formData.image && (
//               <img
//                 src={URL.createObjectURL(formData.image)}
//                 alt="Image Preview"
//                 className="w-full h-48 object-cover rounded-xl mb-3 border border-white/10"
//               />
//             )}
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImage}
//               className="block w-full text-sm text-white
//                 file:mr-4
//                 file:py-2
//                 file:px-4
//                 file:rounded-lg
//                 file:border-0
//                 file:bg-purple-600
//                 file:text-white
//                 hover:file:bg-purple-700"
//             />
//           </div>

//           {/* ⑨ Submit */}
//           <div className="flex justify-end pt-4">
//             <button
//               type="submit"
//               disabled={loading}
//               className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold
//                 hover:from-purple-600 hover:to-pink-600
//                 disabled:opacity-50 disabled:cursor-not-allowed
//                 transition-all duration-300"
//             >
//               {loading ? (
//                 <span className="flex items-center gap-2">
//                   <svg
//                     className="animate-spin h-5 w-5 text-white"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                     />
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
//                     />
//                   </svg>
//                   Submitting...
//                 </span>
//               ) : (
//                 "Send For Approval"
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }


// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import { auth } from "../config/firebase";
// import { completeInstituteProfile } from "../services/instituteService";
// import API from "../services/api";

// export default function CreateProfile() {
//   const navigate = useNavigate();

//   const [categories, setCategories] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone_number: "",
//     city: "",
//     state: "",
//     pincode: "",
//     start_time: "",
//     end_time: "",
//     timezone: "Asia/Kolkata",
//     selectedCategories: [],
//     selectedSubcategories: [],
//   });

//   const fetchDropdowns = async () => {
//     try {
//       const [catRes, subRes] = await Promise.all([
//         API.get("/categories"),
//         API.get("/subcategories"),
//       ]);

//       setCategories(catRes.data.data || []);
//       setSubcategories(subRes.data.data || []);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     fetchDropdowns();
//   }, []);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleCategoryChange = (e) => {
//     const catId = Number(e.target.value);
//     setFormData((prev) => {
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
//     setFormData((prev) => ({
//       ...prev,
//       selectedSubcategories: e.target.checked
//         ? [...prev.selectedSubcategories, subId]
//         : prev.selectedSubcategories.filter((id) => id !== subId),
//     }));
//   };

//   // Filter subcategories based on selected categories
//   const filteredSubcategories = subcategories.filter((sub) =>
//     formData.selectedCategories.includes(sub.category_id)
//   );

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       if (!auth.currentUser) {
//         toast.error("Please login again");
//         setLoading(false);
//         return;
//       }

//       const firebaseToken = await auth.currentUser.getIdToken();

//       const payload = new FormData();

//       payload.append("name", formData.name);
//       payload.append("email", formData.email);
//       payload.append("phone_number", formData.phone_number);
//       payload.append("city", formData.city);
//       payload.append("state", formData.state);
//       payload.append("pincode", formData.pincode);
//       payload.append("start_time", formData.start_time);
//       payload.append("end_time", formData.end_time);
//       payload.append("timezone", formData.timezone);

//       // Construct the categories array payload dynamically based on selections
//       const categoryPayload = formData.selectedCategories.flatMap((catId) => {
//         const relatedSubs = formData.selectedSubcategories.filter((subId) => {
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

//       payload.append("categories", JSON.stringify(categoryPayload));

//       await completeInstituteProfile(payload, firebaseToken);

//       localStorage.setItem("profileCreated", "true");

//       toast.success("Profile submitted successfully");

//       navigate("/institute/pending");
//     } catch (err) {
//       console.error(err);

//       toast.error(
//         err?.response?.data?.message ||
//           err?.message ||
//           "Failed to submit profile"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const inputClass =
//     "w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition";

//   const selectClass =
//     "w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition";

//   const labelClass = "block text-sm font-medium text-white mb-2";

//   const checkboxContainerClass =
//     "w-full rounded-xl bg-white/5 border border-white/10 p-3 max-h-48 overflow-y-auto focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500 transition";

//   return (
//     <div className="min-h-screen bg-[#08080c] flex items-center justify-center px-4 py-10">
//       <div className="w-full max-w-3xl bg-[#18181d] border border-[#33333a] rounded-3xl p-8 shadow-2xl">
//         {/* ── Header ── */}
//         <div className="flex flex-col items-center mb-8">
//           <h1 className="text-4xl font-bold text-purple-400">
//             Create Institute Profile
//           </h1>
//           <p className="text-white mt-2">Complete institute details</p>
//         </div>

//         {/* ── Form ── */}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* ① Institute Name */}
//           <div>
//             <label className={labelClass}>Institute Name</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className={inputClass}
//             />
//           </div>

//           {/* ② Email + Phone */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className={labelClass}>Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className={inputClass}
//               />
//             </div>
//             <div>
//               <label className={labelClass}>Phone</label>
//               <input
//                 type="text"
//                 name="phone_number"
//                 value={formData.phone_number}
//                 onChange={handleChange}
//                 className={inputClass}
//               />
//             </div>
//           </div>

//           {/* ③ City + State + Pincode */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div>
//               <label className={labelClass}>City</label>
//               <input
//                 type="text"
//                 name="city"
//                 value={formData.city}
//                 onChange={handleChange}
//                 className={inputClass}
//               />
//             </div>

//             <div>
//               <label className={labelClass}>State</label>
//               <input
//                 type="text"
//                 name="state"
//                 value={formData.state}
//                 onChange={handleChange}
//                 className={inputClass}
//               />
//             </div>

//             <div>
//               <label className={labelClass}>Pincode</label>
//               <input
//                 type="text"
//                 name="pincode"
//                 value={formData.pincode}
//                 onChange={handleChange}
//                 className={inputClass}
//               />
//             </div>
//           </div>

//           {/* ④ Start Time + End Time + Timezone */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div>
//               <label className={labelClass}>Start Time</label>
//               <input
//                 type="time"
//                 name="start_time"
//                 value={formData.start_time}
//                 onChange={handleChange}
//                 className={inputClass}
//               />
//             </div>

//             <div>
//               <label className={labelClass}>End Time</label>
//               <input
//                 type="time"
//                 name="end_time"
//                 value={formData.end_time}
//                 onChange={handleChange}
//                 className={inputClass}
//               />
//             </div>

//             <div>
//               <label className={labelClass}>Timezone</label>
//               <select
//                 name="timezone"
//                 value={formData.timezone}
//                 onChange={handleChange}
//                 className={selectClass}
//               >
//                 <option value="Asia/Kolkata">India (IST)</option>
//                 <option value="America/New_York">USA - New York</option>
//                 <option value="America/Chicago">USA - Chicago</option>
//                 <option value="America/Denver">USA - Denver</option>
//                 <option value="America/Los_Angeles">USA - Los Angeles</option>
//                 <option value="Europe/London">United Kingdom</option>
//                 <option value="Europe/Paris">France</option>
//                 <option value="Europe/Berlin">Germany</option>
//                 <option value="Asia/Dubai">UAE</option>
//                 <option value="Asia/Singapore">Singapore</option>
//                 <option value="Asia/Tokyo">Japan</option>
//                 <option value="Australia/Sydney">Australia</option>
//               </select>
//             </div>
//           </div>

//           {/* ⑤ Categories + Subcategories (Multiple Select) */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className={labelClass}>Categories</label>
//               <div className={checkboxContainerClass}>
//                 {categories.length === 0 ? (
//                   <p className="text-gray-500 text-sm">Loading...</p>
//                 ) : (
//                   categories.map((cat) => (
//                     <label
//                       key={cat.id}
//                       className="flex items-center gap-3 py-1.5 px-2 rounded-lg hover:bg-white/5 cursor-pointer"
//                     >
//                       <input
//                         type="checkbox"
//                         value={cat.id}
//                         onChange={handleCategoryChange}
//                         checked={formData.selectedCategories.includes(cat.id)}
//                         className="w-4 h-4 accent-purple-500"
//                       />
//                       <span className="text-white text-sm">{cat.name}</span>
//                     </label>
//                   ))
//                 )}
//               </div>
//             </div>
            
//             <div>
//               <label className={labelClass}>Subcategories</label>
//               <div className={checkboxContainerClass}>
//                 {formData.selectedCategories.length === 0 ? (
//                   <p className="text-gray-500 text-sm">Select a category first</p>
//                 ) : filteredSubcategories.length === 0 ? (
//                   <p className="text-gray-500 text-sm">No subcategories available</p>
//                 ) : (
//                   filteredSubcategories.map((sub) => (
//                     <label
//                       key={sub.id}
//                       className="flex items-center gap-3 py-1.5 px-2 rounded-lg hover:bg-white/5 cursor-pointer"
//                     >
//                       <input
//                         type="checkbox"
//                         value={sub.id}
//                         onChange={handleSubcategoryChange}
//                         checked={formData.selectedSubcategories.includes(sub.id)}
//                         className="w-4 h-4 accent-purple-500"
//                       />
//                       <span className="text-white text-sm">{sub.name}</span>
//                     </label>
//                   ))
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* ⑥ Submit */}
//           <div className="flex justify-end pt-4">
//             <button
//               type="submit"
//               disabled={loading}
//               className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold
//                 hover:from-purple-600 hover:to-pink-600
//                 disabled:opacity-50 disabled:cursor-not-allowed
//                 transition-all duration-300"
//             >
//               {loading ? (
//                 <span className="flex items-center gap-2">
//                   <svg
//                     className="animate-spin h-5 w-5 text-white"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                     />
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
//                     />
//                   </svg>
//                   Submitting...
//                 </span>
//               ) : (
//                 "Send For Approval"
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }


// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import { auth } from "../config/firebase";
// import { completeInstituteProfile } from "../services/instituteService";
// import API from "../services/api";

// export default function CreateProfile() {
//   const navigate = useNavigate();

//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [categoriesLoading, setCategoriesLoading] = useState(true);

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone_number: "",
//     city: "",
//     state: "",
//     pincode: "",
//     start_time: "",
//     end_time: "",
//     timezone: "Asia/Kolkata",
//     selectedCategories: [],
//   });

//   /* =========================================================
//      FETCH CATEGORIES ONLY
//   ========================================================= */

//   const fetchCategories = async () => {
//     try {
//       setCategoriesLoading(true);

//       const response = await API.get("/categories");

//       console.log(
//         "CATEGORIES RESPONSE:",
//         response.data
//       );

//       setCategories(
//         response?.data?.data || []
//       );
//     } catch (error) {
//       console.error(
//         "FETCH CATEGORIES ERROR:",
//         error
//       );

//       toast.error(
//         error?.response?.data?.message ||
//           "Failed to load categories"
//       );
//     } finally {
//       setCategoriesLoading(false);
//     }
//   };

//   /* =========================================================
//      LOAD CATEGORIES
//   ========================================================= */

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   /* =========================================================
//      NORMAL INPUT CHANGE
//   ========================================================= */

//   const handleChange = (e) => {
//     const {
//       name,
//       value,
//     } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   /* =========================================================
//      CATEGORY CHANGE
//   ========================================================= */

//   const handleCategoryChange = (e) => {
//     const categoryId = Number(
//       e.target.value
//     );

//     setFormData((prev) => {
//       let selectedCategories;

//       if (e.target.checked) {
//         selectedCategories = [
//           ...prev.selectedCategories,
//           categoryId,
//         ];
//       } else {
//         selectedCategories =
//           prev.selectedCategories.filter(
//             (id) => id !== categoryId
//           );
//       }

//       return {
//         ...prev,
//         selectedCategories,
//       };
//     });
//   };

//   /* =========================================================
//      SUBMIT
//   ========================================================= */

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (
//       formData.selectedCategories.length === 0
//     ) {
//       toast.error(
//         "Please select at least one category"
//       );

//       return;
//     }

//     setLoading(true);

//     try {
//       /* =====================================================
//          FIREBASE USER
//       ===================================================== */

//       if (!auth.currentUser) {
//         toast.error(
//           "Please login again"
//         );

//         return;
//       }

//       /* =====================================================
//          FIREBASE TOKEN
//       ===================================================== */

//       const firebaseToken =
//         await auth.currentUser.getIdToken(
//           true
//         );

//       if (!firebaseToken) {
//         throw new Error(
//           "Firebase authentication token missing"
//         );
//       }

//       /* =====================================================
//          FORM DATA
//       ===================================================== */

//       const payload =
//         new FormData();

//       payload.append(
//         "name",
//         formData.name
//       );

//       payload.append(
//         "email",
//         formData.email
//       );

//       payload.append(
//         "phone_number",
//         formData.phone_number
//       );

//       payload.append(
//         "city",
//         formData.city
//       );

//       payload.append(
//         "state",
//         formData.state
//       );

//       payload.append(
//         "pincode",
//         formData.pincode
//       );

//       payload.append(
//         "start_time",
//         formData.start_time
//       );

//       payload.append(
//         "end_time",
//         formData.end_time
//       );

//       payload.append(
//         "timezone",
//         formData.timezone
//       );

//       /* =====================================================
//          CATEGORIES ONLY
         
//          NO SUBCATEGORY
//       ===================================================== */

//       const categoryPayload =
//         formData.selectedCategories.map(
//           (categoryId) => ({
//             category_id: categoryId,
//           })
//         );

//       console.log(
//         "CATEGORY PAYLOAD:",
//         categoryPayload
//       );

//       payload.append(
//         "categories",
//         JSON.stringify(
//           categoryPayload
//         )
//       );

//       /* =====================================================
//          API
//       ===================================================== */

//       console.log(
//         "SUBMITTING INSTITUTE PROFILE..."
//       );

//       const response =
//         await completeInstituteProfile(
//           payload,
//           firebaseToken
//         );

//       console.log(
//         "CREATE PROFILE RESPONSE:",
//         response
//       );

//       /* =====================================================
//          SUCCESS
//       ===================================================== */

//       localStorage.setItem(
//         "profileCreated",
//         "true"
//       );

//       toast.success(
//         "Profile submitted successfully"
//       );

//       navigate(
//         "/institute/pending",
//         {
//           replace: true,
//         }
//       );

//     } catch (error) {
//       console.error(
//         "CREATE PROFILE ERROR:",
//         error
//       );

//       console.error(
//         "BACKEND RESPONSE:",
//         error?.response?.data
//       );

//       toast.error(
//         error?.response?.data?.message ||
//           error?.message ||
//           "Failed to submit profile"
//       );

//     } finally {
//       setLoading(false);
//     }
//   };

//   /* =========================================================
//      STYLES
//   ========================================================= */

//   const inputClass =
//     "w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition";

//   const labelClass =
//     "block text-sm font-medium text-white mb-2";

//   const checkboxContainerClass =
//     "w-full rounded-xl bg-white/5 border border-white/10 p-3 max-h-56 overflow-y-auto focus-within:border-purple-500 transition";

//   /* =========================================================
//      UI
//   ========================================================= */

//   return (
//     <div className="min-h-screen bg-[#08080c] flex items-center justify-center px-4 py-10">

//       <div className="w-full max-w-3xl bg-[#18181d] border border-[#33333a] rounded-3xl p-8 shadow-2xl">

//         {/* ===================================================
//             HEADER
//         =================================================== */}

//         <div className="flex flex-col items-center mb-8">

//           <h1 className="text-4xl font-bold text-purple-400">
//             Create Institute Profile
//           </h1>

//           <p className="text-white mt-2">
//             Complete institute details
//           </p>

//         </div>

//         {/* ===================================================
//             FORM
//         =================================================== */}

//         <form
//           onSubmit={handleSubmit}
//           className="space-y-5"
//         >

//           {/* =================================================
//               INSTITUTE NAME
//           ================================================= */}

//           <div>

//             <label className={labelClass}>
//               Institute Name
//             </label>

//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Enter institute name"
//               required
//               className={inputClass}
//             />

//           </div>

//           {/* =================================================
//               EMAIL + PHONE
//           ================================================= */}

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

//             <div>

//               <label className={labelClass}>
//                 Email
//               </label>

//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Enter email"
//                 required
//                 className={inputClass}
//               />

//             </div>

//             <div>

//               <label className={labelClass}>
//                 Phone
//               </label>

//               <input
//                 type="text"
//                 name="phone_number"
//                 value={
//                   formData.phone_number
//                 }
//                 onChange={handleChange}
//                 placeholder="Enter phone number"
//                 required
//                 className={inputClass}
//               />

//             </div>

//           </div>

//           {/* =================================================
//               CITY / STATE / PINCODE
//           ================================================= */}

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

//             <div>

//               <label className={labelClass}>
//                 City
//               </label>

//               <input
//                 type="text"
//                 name="city"
//                 value={formData.city}
//                 onChange={handleChange}
//                 placeholder="City"
//                 required
//                 className={inputClass}
//               />

//             </div>

//             <div>

//               <label className={labelClass}>
//                 State
//               </label>

//               <input
//                 type="text"
//                 name="state"
//                 value={formData.state}
//                 onChange={handleChange}
//                 placeholder="State"
//                 required
//                 className={inputClass}
//               />

//             </div>

//             <div>

//               <label className={labelClass}>
//                 Pincode
//               </label>

//               <input
//                 type="text"
//                 name="pincode"
//                 value={formData.pincode}
//                 onChange={handleChange}
//                 placeholder="Pincode"
//                 required
//                 className={inputClass}
//               />

//             </div>

//           </div>

//           {/* =================================================
//               TIME
//           ================================================= */}

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

//             <div>

//               <label className={labelClass}>
//                 Start Time
//               </label>

//               <input
//                 type="time"
//                 name="start_time"
//                 value={
//                   formData.start_time
//                 }
//                 onChange={handleChange}
//                 required
//                 className={inputClass}
//               />

//             </div>

//             <div>

//               <label className={labelClass}>
//                 End Time
//               </label>

//               <input
//                 type="time"
//                 name="end_time"
//                 value={
//                   formData.end_time
//                 }
//                 onChange={handleChange}
//                 required
//                 className={inputClass}
//               />

//             </div>

//             <div>

//               <label className={labelClass}>
//                 Timezone
//               </label>

//               <select
//                 name="timezone"
//                 value={
//                   formData.timezone
//                 }
//                 onChange={handleChange}
//                 className={inputClass}
//               >

//                 <option value="Asia/Kolkata">
//                   India (IST)
//                 </option>

//                 <option value="America/New_York">
//                   USA - New York
//                 </option>

//                 <option value="America/Chicago">
//                   USA - Chicago
//                 </option>

//                 <option value="America/Denver">
//                   USA - Denver
//                 </option>

//                 <option value="America/Los_Angeles">
//                   USA - Los Angeles
//                 </option>

//                 <option value="Europe/London">
//                   United Kingdom
//                 </option>

//                 <option value="Europe/Paris">
//                   France
//                 </option>

//                 <option value="Europe/Berlin">
//                   Germany
//                 </option>

//                 <option value="Asia/Dubai">
//                   UAE
//                 </option>

//                 <option value="Asia/Singapore">
//                   Singapore
//                 </option>

//                 <option value="Asia/Tokyo">
//                   Japan
//                 </option>

//                 <option value="Australia/Sydney">
//                   Australia
//                 </option>

//               </select>

//             </div>

//           </div>

//           {/* =================================================
//               CATEGORIES ONLY
//           ================================================= */}

//           <div>

//             <label className={labelClass}>
//               Categories
//             </label>

//             <div
//               className={
//                 checkboxContainerClass
//               }
//             >

//               {categoriesLoading ? (

//                 <p className="text-gray-500 text-sm">
//                   Loading categories...
//                 </p>

//               ) : categories.length === 0 ? (

//                 <p className="text-gray-500 text-sm">
//                   No categories available
//                 </p>

//               ) : (

//                 categories.map(
//                   (category) => (

//                     <label
//                       key={category.id}
//                       className="flex items-center gap-3 py-2 px-2 rounded-lg hover:bg-white/5 cursor-pointer"
//                     >

//                       <input
//                         type="checkbox"
//                         value={
//                           category.id
//                         }
//                         checked={formData.selectedCategories.includes(
//                           category.id
//                         )}
//                         onChange={
//                           handleCategoryChange
//                         }
//                         className="w-4 h-4 accent-purple-500"
//                       />

//                       <span className="text-white text-sm">
//                         {category.name}
//                       </span>

//                     </label>

//                   )
//                 )

//               )}

//             </div>

//             <p className="text-gray-500 text-xs mt-2">
//               Select the categories offered by your institute.
//             </p>

//           </div>

//           {/* =================================================
//               SELECTED CATEGORY COUNT
//           ================================================= */}

//           {formData.selectedCategories.length >
//             0 && (

//             <div className="rounded-xl bg-purple-500/10 border border-purple-500/20 px-4 py-3">

//               <p className="text-purple-300 text-sm">

//                 {formData.selectedCategories.length}{" "}
//                 {formData.selectedCategories.length ===
//                 1
//                   ? "category"
//                   : "categories"}{" "}
//                 selected

//               </p>

//             </div>

//           )}

//           {/* =================================================
//               SUBMIT
//           ================================================= */}

//           <div className="flex justify-end pt-4">

//             <button
//               type="submit"
//               disabled={
//                 loading ||
//                 formData.selectedCategories
//                   .length === 0
//               }
//               className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
//             >

//               {loading ? (

//                 <span className="flex items-center gap-2">

//                   <svg
//                     className="animate-spin h-5 w-5 text-white"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >

//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                     />

//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
//                     />

//                   </svg>

//                   Submitting...

//                 </span>

//               ) : (

//                 "Send For Approval"

//               )}

//             </button>

//           </div>

//         </form>

//       </div>

//     </div>
//   );
// }


// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// import { auth } from "../config/firebase";
// import { completeInstituteProfile } from "../services/instituteService";
// import API from "../services/api";

// /* =========================================================
//    TIME PICKER
// ========================================================= */

// function TimePicker({
//   value,
//   onChange,
//   label,
// }) {
//   const [open, setOpen] = useState(false);

//   const [hour, setHour] = useState(12);
//   const [minute, setMinute] = useState(0);
//   const [period, setPeriod] = useState("AM");

//   const [step, setStep] = useState("hour");

//   /* =======================================================
//      LOAD EXISTING VALUE
//   ======================================================= */

//   useEffect(() => {
//     if (!value) return;

//     const parts = value.split(":");

//     if (parts.length < 2) return;

//     let h = Number(parts[0]);
//     const m = Number(parts[1]);

//     if (Number.isNaN(h) || Number.isNaN(m)) return;

//     const selectedPeriod = h >= 12 ? "PM" : "AM";

//     if (h === 0) {
//       h = 12;
//     } else if (h > 12) {
//       h -= 12;
//     }

//     setHour(h);
//     setMinute(m);
//     setPeriod(selectedPeriod);
//   }, [value]);

//   /* =======================================================
//      OPEN PICKER
//   ======================================================= */

//   const openPicker = () => {
//     if (value) {
//       const parts = value.split(":");

//       if (parts.length >= 2) {
//         let h = Number(parts[0]);
//         const m = Number(parts[1]);

//         if (!Number.isNaN(h)) {
//           const selectedPeriod = h >= 12 ? "PM" : "AM";

//           if (h === 0) {
//             h = 12;
//           } else if (h > 12) {
//             h -= 12;
//           }

//           setHour(h);
//           setMinute(Number.isNaN(m) ? 0 : m);
//           setPeriod(selectedPeriod);
//         }
//       }
//     }

//     setStep("hour");
//     setOpen(true);
//   };

//   /* =======================================================
//      FORMAT TIME
//   ======================================================= */

//   const formatDisplay = () => {
//     if (!value) return "Select time";

//     const parts = value.split(":");

//     if (parts.length < 2) return value;

//     let h = Number(parts[0]);
//     const m = Number(parts[1]);

//     if (Number.isNaN(h) || Number.isNaN(m)) {
//       return value;
//     }

//     const p = h >= 12 ? "PM" : "AM";

//     if (h === 0) {
//       h = 12;
//     } else if (h > 12) {
//       h -= 12;
//     }

//     return `${h}:${String(m).padStart(2, "0")} ${p}`;
//   };

//   /* =======================================================
//      SET FINAL TIME
//   ======================================================= */

//   const handleSet = () => {
//     let finalHour = hour;

//     if (period === "AM") {
//       if (finalHour === 12) {
//         finalHour = 0;
//       }
//     } else {
//       if (finalHour !== 12) {
//         finalHour += 12;
//       }
//     }

//     const formattedHour = String(finalHour).padStart(2, "0");
//     const formattedMinute = String(minute).padStart(2, "0");

//     onChange(`${formattedHour}:${formattedMinute}`);

//     setOpen(false);
//   };

//   /* =======================================================
//      HOUR SELECTION
//   ======================================================= */

//   const selectHour = (selectedHour) => {
//     setHour(selectedHour);
//     setStep("minute");
//   };

//   /* =======================================================
//      MINUTE SELECTION
//   ======================================================= */

//   const selectMinute = (selectedMinute) => {
//     setMinute(selectedMinute);
//   };

//   /* =======================================================
//      CLOCK POSITIONS
//   ======================================================= */

//   const getHourPosition = (number) => {
//     const angle = ((number % 12) * 30) - 90;

//     const radius = 105;

//     const x =
//       50 +
//       (Math.cos((angle * Math.PI) / 180) *
//         radius) /
//         2.2;

//     const y =
//       50 +
//       (Math.sin((angle * Math.PI) / 180) *
//         radius) /
//         2.2;

//     return {
//       left: `${x}%`,
//       top: `${y}%`,
//     };
//   };

//   const getMinutePosition = (number) => {
//     const angle = ((number / 5) * 30) - 90;

//     const radius = 105;

//     const x =
//       50 +
//       (Math.cos((angle * Math.PI) / 180) *
//         radius) /
//         2.2;

//     const y =
//       50 +
//       (Math.sin((angle * Math.PI) / 180) *
//         radius) /
//         2.2;

//     return {
//       left: `${x}%`,
//       top: `${y}%`,
//     };
//   };

//   /* =======================================================
//      DISPLAY
//   ======================================================= */

//   return (
//     <>
//       {/* FIELD */}

//       <button
//         type="button"
//         onClick={openPicker}
//         className="
//           w-full
//           rounded-xl
//           bg-[#242428]
//           border
//           border-white/10
//           px-4
//           py-3
//           text-left
//           text-white
//           hover:border-purple-500
//           focus:border-purple-500
//           transition
//         "
//       >
//         {value ? (
//           <span className="text-white">
//             {formatDisplay()}
//           </span>
//         ) : (
//           <span className="text-gray-500">
//             Select time
//           </span>
//         )}
//       </button>

//       {/* =================================================
//           MODAL
//       ================================================= */}

//       {open && (
//         <div
//           className="
//             fixed
//             inset-0
//             z-[9999]
//             flex
//             items-center
//             justify-center
//             bg-black/70
//             backdrop-blur-sm
//             px-4
//           "
//           onClick={() => setOpen(false)}
//         >
//           <div
//             className="
//               w-full
//               max-w-[390px]
//               rounded-3xl
//               overflow-hidden
//               bg-[#18181d]
//               shadow-2xl
//               border
//               border-white/10
//             "
//             onClick={(e) =>
//               e.stopPropagation()
//             }
//           >

//             {/* =========================================
//                 HEADER
//             ========================================= */}

//             <div
//               className="
//                 bg-gradient-to-r
//                 from-purple-600
//                 to-pink-500
//                 px-6
//                 py-5
//               "
//             >

//               <div className="text-white/80 text-sm mb-1">
//                 {label}
//               </div>

//               <div className="flex items-center gap-4">

//                 <button
//                   type="button"
//                   onClick={() => setStep("hour")}
//                   className={`
//                     text-4xl
//                     font-bold
//                     transition
//                     ${
//                       step === "hour"
//                         ? "text-white"
//                         : "text-white/60"
//                     }
//                   `}
//                 >
//                   {String(hour).padStart(2, "0")}
//                 </button>

//                 <span className="text-4xl font-bold text-white">
//                   :
//                 </span>

//                 <button
//                   type="button"
//                   onClick={() => setStep("minute")}
//                   className={`
//                     text-4xl
//                     font-bold
//                     transition
//                     ${
//                       step === "minute"
//                         ? "text-white"
//                         : "text-white/60"
//                     }
//                   `}
//                 >
//                   {String(minute).padStart(2, "0")}
//                 </button>

//                 <div className="flex flex-col gap-1 ml-auto">

//                   <button
//                     type="button"
//                     onClick={() =>
//                       setPeriod("AM")
//                     }
//                     className={`
//                       px-3
//                       py-1
//                       rounded-lg
//                       text-sm
//                       font-bold
//                       ${
//                         period === "AM"
//                           ? "bg-white text-purple-600"
//                           : "text-white/70"
//                       }
//                     `}
//                   >
//                     AM
//                   </button>

//                   <button
//                     type="button"
//                     onClick={() =>
//                       setPeriod("PM")
//                     }
//                     className={`
//                       px-3
//                       py-1
//                       rounded-lg
//                       text-sm
//                       font-bold
//                       ${
//                         period === "PM"
//                           ? "bg-white text-purple-600"
//                           : "text-white/70"
//                       }
//                     `}
//                   >
//                     PM
//                   </button>

//                 </div>

//               </div>

//             </div>

//             {/* =========================================
//                 CLOCK
//             ========================================= */}

//             <div className="px-6 py-7">

//               <div
//                 className="
//                   relative
//                   mx-auto
//                   w-[270px]
//                   h-[270px]
//                   rounded-full
//                   bg-[#27272c]
//                   border
//                   border-white/10
//                 "
//               >

//                 {/* CENTER */}

//                 <div
//                   className="
//                     absolute
//                     left-1/2
//                     top-1/2
//                     -translate-x-1/2
//                     -translate-y-1/2
//                     w-4
//                     h-4
//                     rounded-full
//                     bg-purple-500
//                     z-20
//                   "
//                 />

//                 {/* =================================================
//                     HOUR CLOCK
//                 ================================================= */}

//                 {step === "hour" &&
//                   Array.from(
//                     { length: 12 },
//                     (_, index) => {
//                       const number =
//                         index + 1;

//                       const position =
//                         getHourPosition(
//                           number
//                         );

//                       const selected =
//                         hour === number;

//                       return (
//                         <button
//                           key={number}
//                           type="button"
//                           onClick={() =>
//                             selectHour(
//                               number
//                             )
//                           }
//                           className={`
//                             absolute
//                             -translate-x-1/2
//                             -translate-y-1/2
//                             w-11
//                             h-11
//                             rounded-full
//                             flex
//                             items-center
//                             justify-center
//                             text-sm
//                             font-semibold
//                             transition
//                             z-10
//                             ${
//                               selected
//                                 ? "bg-purple-500 text-white shadow-lg shadow-purple-500/40"
//                                 : "text-gray-300 hover:bg-white/10"
//                             }
//                           `}
//                           style={position}
//                         >
//                           {number}
//                         </button>
//                       );
//                     }
//                   )}

//                 {/* =================================================
//                     MINUTE CLOCK
//                 ================================================= */}

//                 {step === "minute" &&
//                   Array.from(
//                     { length: 12 },
//                     (_, index) => {
//                       const number =
//                         index * 5;

//                       const display =
//                         String(number).padStart(
//                           2,
//                           "0"
//                         );

//                       const position =
//                         getMinutePosition(
//                           number
//                         );

//                       const selected =
//                         minute === number;

//                       return (
//                         <button
//                           key={number}
//                           type="button"
//                           onClick={() =>
//                             selectMinute(
//                               number
//                             )
//                           }
//                           className={`
//                             absolute
//                             -translate-x-1/2
//                             -translate-y-1/2
//                             w-11
//                             h-11
//                             rounded-full
//                             flex
//                             items-center
//                             justify-center
//                             text-sm
//                             font-semibold
//                             transition
//                             z-10
//                             ${
//                               selected
//                                 ? "bg-purple-500 text-white shadow-lg shadow-purple-500/40"
//                                 : "text-gray-300 hover:bg-white/10"
//                             }
//                           `}
//                           style={position}
//                         >
//                           {display}
//                         </button>
//                       );
//                     }
//                   )}

//               </div>

//               {/* ===============================================
//                   STEP INDICATOR
//               =============================================== */}

//               <div className="flex justify-center gap-2 mt-5">

//                 <button
//                   type="button"
//                   onClick={() => setStep("hour")}
//                   className={`
//                     px-4
//                     py-2
//                     rounded-lg
//                     text-xs
//                     font-semibold
//                     ${
//                       step === "hour"
//                         ? "bg-purple-500/20 text-purple-300"
//                         : "text-gray-500"
//                     }
//                   `}
//                 >
//                   Hour
//                 </button>

//                 <button
//                   type="button"
//                   onClick={() => setStep("minute")}
//                   className={`
//                     px-4
//                     py-2
//                     rounded-lg
//                     text-xs
//                     font-semibold
//                     ${
//                       step === "minute"
//                         ? "bg-purple-500/20 text-purple-300"
//                         : "text-gray-500"
//                     }
//                   `}
//                 >
//                   Minute
//                 </button>

//               </div>

//             </div>

//             {/* =========================================
//                 FOOTER
//             ========================================= */}

//             <div
//               className="
//                 border-t
//                 border-white/10
//                 px-6
//                 py-4
//                 flex
//                 items-center
//                 justify-between
//               "
//             >

//               <button
//                 type="button"
//                 onClick={() =>
//                   setOpen(false)
//                 }
//                 className="
//                   px-5
//                   py-2.5
//                   rounded-xl
//                   text-gray-400
//                   hover:text-white
//                   hover:bg-white/5
//                   transition
//                 "
//               >
//                 CANCEL
//               </button>

//               <button
//                 type="button"
//                 onClick={handleSet}
//                 className="
//                   px-6
//                   py-2.5
//                   rounded-xl
//                   bg-purple-500
//                   hover:bg-purple-600
//                   text-white
//                   font-bold
//                   transition
//                 "
//               >
//                 SET
//               </button>

//             </div>

//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// /* =========================================================
//    CREATE PROFILE
// ========================================================= */

// export default function CreateProfile() {
//   const navigate = useNavigate();

//   /* =========================================================
//      STATE
//   ========================================================= */

//   const [categories, setCategories] =
//     useState([]);

//   const [loading, setLoading] =
//     useState(false);

//   const [categoriesLoading, setCategoriesLoading] =
//     useState(true);

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone_number: "",
//     city: "",
//     state: "",
//     pincode: "",

//     /* BACKEND FIELD NAMES */

//     start_time: "",
//     end_time: "",

//     timezone: "Asia/Kolkata",

//     selectedCategories: [],
//   });

//   /* =========================================================
//      FETCH CATEGORIES
//   ========================================================= */

//   const fetchCategories = async () => {
//     try {
//       setCategoriesLoading(true);

//       const response =
//         await API.get("/categories");

//       console.log(
//         "Categories API Response:",
//         response.data
//       );

//       const categoryData =
//         response?.data?.data;

//       if (Array.isArray(categoryData)) {
//         setCategories(categoryData);
//       } else if (
//         Array.isArray(response?.data)
//       ) {
//         setCategories(response.data);
//       } else {
//         setCategories([]);
//       }
//     } catch (error) {
//       console.error(
//         "FETCH CATEGORIES ERROR:",
//         error
//       );

//       toast.error(
//         error?.response?.data?.message ||
//           "Failed to load categories"
//       );

//       setCategories([]);
//     } finally {
//       setCategoriesLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   /* =========================================================
//      HANDLE INPUT
//   ========================================================= */

//   const handleChange = (e) => {
//     const {
//       name,
//       value,
//     } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   /* =========================================================
//      CATEGORY CHANGE
//   ========================================================= */

//   const handleCategoryChange = (e) => {
//     const categoryId =
//       Number(e.target.value);

//     const checked =
//       e.target.checked;

//     setFormData((prev) => {
//       if (checked) {
//         if (
//           prev.selectedCategories.includes(
//             categoryId
//           )
//         ) {
//           return prev;
//         }

//         return {
//           ...prev,
//           selectedCategories: [
//             ...prev.selectedCategories,
//             categoryId,
//           ],
//         };
//       }

//       return {
//         ...prev,
//         selectedCategories:
//           prev.selectedCategories.filter(
//             (id) =>
//               id !== categoryId
//           ),
//       };
//     });
//   };

//   /* =========================================================
//      SUBMIT
//   ========================================================= */

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (
//       formData.selectedCategories
//         .length === 0
//     ) {
//       toast.error(
//         "Please select at least one category"
//       );

//       return;
//     }

//     if (!auth.currentUser) {
//       toast.error(
//         "Your session has expired. Please login again."
//       );

//       navigate(
//         "/institute-login",
//         {
//           replace: true,
//         }
//       );

//       return;
//     }

//     if (!formData.start_time) {
//       toast.error(
//         "Please select Open Time"
//       );

//       return;
//     }

//     if (!formData.end_time) {
//       toast.error(
//         "Please select Close Time"
//       );

//       return;
//     }

//     setLoading(true);

//     try {
//       const firebaseToken =
//         await auth.currentUser.getIdToken(
//           true
//         );

//       if (!firebaseToken) {
//         throw new Error(
//           "Firebase authentication token missing"
//         );
//       }

//       /* ===============================================
//          FORM DATA
//       =============================================== */

//       const payload =
//         new FormData();

//       payload.append(
//         "name",
//         formData.name.trim()
//       );

//       payload.append(
//         "email",
//         formData.email.trim()
//       );

//       payload.append(
//         "phone_number",
//         formData.phone_number.trim()
//       );

//       payload.append(
//         "city",
//         formData.city.trim()
//       );

//       payload.append(
//         "state",
//         formData.state.trim()
//       );

//       payload.append(
//         "pincode",
//         formData.pincode.trim()
//       );

//       /* ===============================================
//          OPEN TIME
         
//          UI = Open Time
//          DB/API = start_time
//       =============================================== */

//       payload.append(
//         "start_time",
//         formData.start_time
//       );

//       /* ===============================================
//          CLOSE TIME
         
//          UI = Close Time
//          DB/API = end_time
//       =============================================== */

//       payload.append(
//         "end_time",
//         formData.end_time
//       );

//       payload.append(
//         "timezone",
//         formData.timezone
//       );

//       /* ===============================================
//          CATEGORIES ONLY
//       =============================================== */

//       const categoryPayload =
//         formData.selectedCategories.map(
//           (categoryId) => ({
//             category_id:
//               Number(categoryId),
//           })
//         );

//       payload.append(
//         "categories",
//         JSON.stringify(
//           categoryPayload
//         )
//       );

//       /* ===============================================
//          API
//       =============================================== */

//       const response =
//         await completeInstituteProfile(
//           payload,
//           firebaseToken
//         );

//       console.log(
//         "CREATE PROFILE RESPONSE:",
//         response
//       );

//       localStorage.setItem(
//         "profileCreated",
//         "true"
//       );

//       toast.success(
//         "Profile submitted successfully"
//       );

//       navigate(
//         "/institute/pending",
//         {
//           replace: true,
//         }
//       );
//     } catch (error) {
//       console.error(
//         "CREATE PROFILE ERROR:",
//         error
//       );

//       console.error(
//         "BACKEND RESPONSE:",
//         error?.response?.data
//       );

//       toast.error(
//         error?.response?.data?.message ||
//           error?.message ||
//           "Failed to submit profile"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* =========================================================
//      STYLES
//   ========================================================= */

//   const inputClass = `
//     w-full
//     rounded-xl
//     bg-[#242428]
//     border
//     border-white/10
//     px-4
//     py-3
//     text-white
//     placeholder-gray-500
//     outline-none
//     transition
//     focus:border-purple-500
//     focus:ring-1
//     focus:ring-purple-500
//   `;

//   const labelClass =
//     "block text-sm font-semibold text-white mb-2";

//   /* =========================================================
//      UI
//   ========================================================= */

//   return (
//     <div
//       className="
//         min-h-screen
//         bg-[#08080c]
//         flex
//         items-center
//         justify-center
//         px-4
//         py-10
//       "
//     >

//       <div
//         className="
//           w-full
//           max-w-3xl
//           bg-[#18181d]
//           border
//           border-[#33333a]
//           rounded-3xl
//           p-8
//           shadow-2xl
//         "
//       >

//         {/* ===============================================
//             HEADER
//         =============================================== */}

//         <div className="flex flex-col items-center mb-8">

//           <h1
//             className="
//               text-4xl
//               font-bold
//               text-purple-400
//               text-center
//             "
//           >
//             Create Institute Profile
//           </h1>

//           <p className="text-gray-400 mt-2">
//             Complete institute details
//           </p>

//         </div>

//         {/* ===============================================
//             FORM
//         =============================================== */}

//         <form
//           onSubmit={handleSubmit}
//           className="space-y-5"
//         >

//           {/* =============================================
//               NAME
//           ============================================= */}

//           <div>

//             <label className={labelClass}>
//               Institute Name
//             </label>

//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Enter institute name"
//               required
//               className={inputClass}
//             />

//           </div>

//           {/* =============================================
//               EMAIL / PHONE
//           ============================================= */}

//           <div
//             className="
//               grid
//               grid-cols-1
//               md:grid-cols-2
//               gap-4
//             "
//           >

//             <div>

//               <label className={labelClass}>
//                 Email
//               </label>

//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Enter email"
//                 required
//                 className={inputClass}
//               />

//             </div>

//             <div>

//               <label className={labelClass}>
//                 Phone
//               </label>

//               <input
//                 type="tel"
//                 name="phone_number"
//                 value={
//                   formData.phone_number
//                 }
//                 onChange={handleChange}
//                 placeholder="Enter phone number"
//                 required
//                 className={inputClass}
//               />

//             </div>

//           </div>

//           {/* =============================================
//               CITY / STATE / PINCODE
//           ============================================= */}

//           <div
//             className="
//               grid
//               grid-cols-1
//               md:grid-cols-3
//               gap-4
//             "
//           >

//             <div>

//               <label className={labelClass}>
//                 City
//               </label>

//               <input
//                 type="text"
//                 name="city"
//                 value={formData.city}
//                 onChange={handleChange}
//                 placeholder="City"
//                 required
//                 className={inputClass}
//               />

//             </div>

//             <div>

//               <label className={labelClass}>
//                 State
//               </label>

//               <input
//                 type="text"
//                 name="state"
//                 value={formData.state}
//                 onChange={handleChange}
//                 placeholder="State"
//                 required
//                 className={inputClass}
//               />

//             </div>

//             <div>

//               <label className={labelClass}>
//                 Pincode
//               </label>

//               <input
//                 type="text"
//                 name="pincode"
//                 value={formData.pincode}
//                 onChange={handleChange}
//                 placeholder="Pincode"
//                 required
//                 className={inputClass}
//               />

//             </div>

//           </div>

//           {/* =============================================
//               OPEN / CLOSE / TIMEZONE
//           ============================================= */}

//           <div
//             className="
//               grid
//               grid-cols-1
//               md:grid-cols-3
//               gap-4
//             "
//           >

//             {/* OPEN TIME */}

//             <div>

//               <label className={labelClass}>
//                 Open Time
//               </label>

//               <TimePicker
//                 label="Open Time"
//                 value={
//                   formData.start_time
//                 }
//                 onChange={(value) =>
//                   setFormData((prev) => ({
//                     ...prev,
//                     start_time: value,
//                   }))
//                 }
//               />

//             </div>

//             {/* CLOSE TIME */}

//             <div>

//               <label className={labelClass}>
//                 Close Time
//               </label>

//               <TimePicker
//                 label="Close Time"
//                 value={
//                   formData.end_time
//                 }
//                 onChange={(value) =>
//                   setFormData((prev) => ({
//                     ...prev,
//                     end_time: value,
//                   }))
//                 }
//               />

//             </div>

//             {/* TIMEZONE */}

//             <div>

//               <label className={labelClass}>
//                 Timezone
//               </label>

//               <select
//                 name="timezone"
//                 value={
//                   formData.timezone
//                 }
//                 onChange={handleChange}
//                 className={`${inputClass} cursor-pointer`}
//                 style={{
//                   colorScheme: "dark",
//                 }}
//               >

//                 <option
//                   value="Asia/Kolkata"
//                   style={{
//                     background: "#242428",
//                     color: "#fff",
//                   }}
//                 >
//                   India (IST)
//                 </option>

//                 <option
//                   value="Asia/Dubai"
//                   style={{
//                     background: "#242428",
//                     color: "#fff",
//                   }}
//                 >
//                   UAE
//                 </option>

//                 <option
//                   value="Asia/Riyadh"
//                   style={{
//                     background: "#242428",
//                     color: "#fff",
//                   }}
//                 >
//                   Saudi Arabia
//                 </option>

//                 <option
//                   value="Asia/Singapore"
//                   style={{
//                     background: "#242428",
//                     color: "#fff",
//                   }}
//                 >
//                   Singapore
//                 </option>

//                 <option
//                   value="Asia/Tokyo"
//                   style={{
//                     background: "#242428",
//                     color: "#fff",
//                   }}
//                 >
//                   Japan
//                 </option>

//                 <option
//                   value="Europe/London"
//                   style={{
//                     background: "#242428",
//                     color: "#fff",
//                   }}
//                 >
//                   United Kingdom
//                 </option>

//                 <option
//                   value="Europe/Paris"
//                   style={{
//                     background: "#242428",
//                     color: "#fff",
//                   }}
//                 >
//                   France
//                 </option>

//                 <option
//                   value="Europe/Berlin"
//                   style={{
//                     background: "#242428",
//                     color: "#fff",
//                   }}
//                 >
//                   Germany
//                 </option>

//                 <option
//                   value="America/New_York"
//                   style={{
//                     background: "#242428",
//                     color: "#fff",
//                   }}
//                 >
//                   USA - New York
//                 </option>

//                 <option
//                   value="America/Los_Angeles"
//                   style={{
//                     background: "#242428",
//                     color: "#fff",
//                   }}
//                 >
//                   USA - Los Angeles
//                 </option>

//                 <option
//                   value="Australia/Sydney"
//                   style={{
//                     background: "#242428",
//                     color: "#fff",
//                   }}
//                 >
//                   Australia - Sydney
//                 </option>

//               </select>

//             </div>

//           </div>

//           {/* =============================================
//               CATEGORIES
//           ============================================= */}

//           <div>

//             <label className={labelClass}>
//               Categories
//             </label>

//             <div
//               className="
//                 w-full
//                 rounded-xl
//                 bg-[#242428]
//                 border
//                 border-white/10
//                 p-3
//                 max-h-56
//                 overflow-y-auto
//               "
//             >

//               {categoriesLoading && (
//                 <p className="text-gray-400 p-3">
//                   Loading categories...
//                 </p>
//               )}

//               {!categoriesLoading &&
//                 categories.length === 0 && (
//                   <div className="p-3">

//                     <p className="text-red-400 text-sm">
//                       No categories available.
//                     </p>

//                     <button
//                       type="button"
//                       onClick={
//                         fetchCategories
//                       }
//                       className="
//                         mt-2
//                         text-purple-400
//                         text-sm
//                       "
//                     >
//                       Try again
//                     </button>

//                   </div>
//                 )}

//               {!categoriesLoading &&
//                 categories.length > 0 && (

//                   <div className="space-y-1">

//                     {categories.map(
//                       (category) => {

//                         const categoryId =
//                           Number(
//                             category.id
//                           );

//                         return (
//                           <label
//                             key={
//                               category.id
//                             }
//                             className="
//                               flex
//                               items-center
//                               gap-3
//                               py-3
//                               px-3
//                               rounded-lg
//                               hover:bg-white/5
//                               cursor-pointer
//                             "
//                           >

//                             <input
//                               type="checkbox"
//                               value={
//                                 category.id
//                               }
//                               checked={formData.selectedCategories.includes(
//                                 categoryId
//                               )}
//                               onChange={
//                                 handleCategoryChange
//                               }
//                               className="
//                                 w-5
//                                 h-5
//                                 accent-purple-500
//                                 cursor-pointer
//                               "
//                             />

//                             <span className="text-white">
//                               {
//                                 category.name
//                               }
//                             </span>

//                           </label>
//                         );
//                       }
//                     )}

//                   </div>

//                 )}

//             </div>

//             <p className="text-gray-500 text-xs mt-2">
//               Select the categories offered by your institute.
//             </p>

//           </div>

//           {/* =============================================
//               SUBMIT
//           ============================================= */}

//           <div className="flex justify-end pt-4">

//             <button
//               type="submit"
//               disabled={
//                 loading ||
//                 categoriesLoading ||
//                 formData.selectedCategories
//                   .length === 0
//               }
//               className="
//                 px-8
//                 py-3
//                 rounded-xl
//                 bg-gradient-to-r
//                 from-purple-500
//                 to-pink-500
//                 text-white
//                 font-bold
//                 disabled:opacity-50
//                 disabled:cursor-not-allowed
//               "
//             >

//               {loading
//                 ? "Submitting..."
//                 : "Send For Approval"}

//             </button>

//           </div>

//         </form>

//       </div>

//     </div>
//   );
// }




// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import { onAuthStateChanged } from "firebase/auth";

// import { auth } from "../config/firebase";
// import { completeInstituteProfile } from "../services/instituteService";
// import API from "../services/api";

// /* =========================================================
//    CATEGORY IMAGE HELPER
// ========================================================= */

// const getCategoryImage = (category) => {
//   const image =
//     category?.image_url ||
//     category?.image ||
//     category?.thumbnail ||
//     category?.thumbnail_url ||
//     "";

//   if (!image) return "";

//   if (
//     image.startsWith("http://") ||
//     image.startsWith("https://")
//   ) {
//     return image;
//   }

//   return `http://localhost:5000${image}`;
// };

// /* =========================================================
//    COMPACT INLINE TIME PICKER
// ========================================================= */

// function TimePicker({ value, onChange, label }) {
//   const [open, setOpen] = useState(false);

//   const [hour, setHour] = useState(12);
//   const [minute, setMinute] = useState(0);
//   const [period, setPeriod] = useState("AM");

//   const [step, setStep] = useState("hour");

//   /* =======================================================
//      LOAD EXISTING VALUE
//   ======================================================= */

//   const loadValue = (time) => {
//     if (!time) return;

//     const [rawHour, rawMinute] =
//       String(time).split(":");

//     let h = Number(rawHour);
//     const m = Number(rawMinute);

//     if (
//       Number.isNaN(h) ||
//       Number.isNaN(m)
//     ) {
//       return;
//     }

//     setPeriod(h >= 12 ? "PM" : "AM");

//     if (h === 0) {
//       h = 12;
//     } else if (h > 12) {
//       h -= 12;
//     }

//     setHour(h);
//     setMinute(m);
//   };

//   useEffect(() => {
//     loadValue(value);
//   }, [value]);

//   /* =======================================================
//      OPEN PICKER
//   ======================================================= */

//   const openPicker = () => {
//     loadValue(value);
//     setStep("hour");
//     setOpen((prev) => !prev);
//   };

//   /* =======================================================
//      DISPLAY VALUE
//   ======================================================= */

//   const formatDisplay = () => {
//     if (!value) {
//       return "Select time";
//     }

//     const [rawHour, rawMinute] =
//       String(value).split(":");

//     let h = Number(rawHour);
//     const m = Number(rawMinute);

//     if (
//       Number.isNaN(h) ||
//       Number.isNaN(m)
//     ) {
//       return "Select time";
//     }

//     const p = h >= 12 ? "PM" : "AM";

//     if (h === 0) {
//       h = 12;
//     } else if (h > 12) {
//       h -= 12;
//     }

//     return `${h}:${String(m).padStart(
//       2,
//       "0"
//     )} ${p}`;
//   };

//   /* =======================================================
//      SET TIME
//   ======================================================= */

//   const handleSet = () => {
//     let finalHour = hour;

//     if (period === "AM") {
//       if (finalHour === 12) {
//         finalHour = 0;
//       }
//     } else {
//       if (finalHour !== 12) {
//         finalHour += 12;
//       }
//     }

//     const formattedTime =
//       `${String(finalHour).padStart(
//         2,
//         "0"
//       )}:${String(minute).padStart(
//         2,
//         "0"
//       )}`;

//     onChange(formattedTime);

//     setOpen(false);
//   };

//   /* =======================================================
//      SELECT HOUR
//   ======================================================= */

//   const selectHour = (selectedHour) => {
//     setHour(selectedHour);
//     setStep("minute");
//   };

//   /* =======================================================
//      SELECT MINUTE
//   ======================================================= */

//   const selectMinute = (
//     selectedMinute
//   ) => {
//     setMinute(selectedMinute);
//   };

//   /* =======================================================
//      CLOCK POSITION
//   ======================================================= */

//   const getPosition = (
//     number,
//     isMinute = false
//   ) => {
//     const angle =
//       (isMinute
//         ? number / 5
//         : number % 12) *
//         30 -
//       90;

//     const radius = 40;

//     return {
//       left: `${
//         50 +
//         Math.cos(
//           (angle * Math.PI) / 180
//         ) *
//           radius
//       }%`,

//       top: `${
//         50 +
//         Math.sin(
//           (angle * Math.PI) / 180
//         ) *
//           radius
//       }%`,
//     };
//   };

//   return (
//     <div className="relative w-full">
//       {/* =================================================
//           TIME FIELD
//       ================================================= */}

//       <button
//         type="button"
//         onClick={openPicker}
//         aria-label={`Select ${
//           label || "time"
//         }`}
//         className="
//           w-full
//           h-[50px]
//           rounded-xl
//           bg-[#242428]
//           border
//           border-white/10
//           px-4
//           text-left
//           text-white
//           hover:border-purple-500
//           focus:outline-none
//           focus:border-purple-500
//           transition
//         "
//       >
//         {value ? (
//           <span className="text-white">
//             {formatDisplay()}
//           </span>
//         ) : (
//           <span className="text-gray-500">
//             Select time
//           </span>
//         )}
//       </button>

//       {/* =================================================
//           INLINE TIME POPUP
//       ================================================= */}

//       {open && (
//         <div
//           className="
//             absolute
//             left-0
//             top-[58px]
//             z-[1000]
//             w-[300px]
//             max-w-[calc(100vw-32px)]
//             rounded-2xl
//             overflow-hidden
//             bg-[#18181d]
//             border
//             border-white/10
//             shadow-2xl
//           "
//         >
//           {/* HEADER */}

//           <div
//             className="
//               bg-gradient-to-r
//               from-purple-600
//               to-pink-500
//               px-4
//               py-3
//             "
//           >
//             <div
//               className="
//                 text-white/70
//                 text-[11px]
//                 font-medium
//                 mb-1
//               "
//             >
//               {label || "Select Time"}
//             </div>

//             <div className="flex items-center">
//               {/* HOUR */}

//               <button
//                 type="button"
//                 onClick={() =>
//                   setStep("hour")
//                 }
//                 className={`
//                   text-2xl
//                   leading-none
//                   font-bold
//                   ${
//                     step === "hour"
//                       ? "text-white"
//                       : "text-white/50"
//                   }
//                 `}
//               >
//                 {String(hour).padStart(
//                   2,
//                   "0"
//                 )}
//               </button>

//               <span
//                 className="
//                   text-2xl
//                   leading-none
//                   font-bold
//                   text-white
//                   mx-1
//                 "
//               >
//                 :
//               </span>

//               {/* MINUTE */}

//               <button
//                 type="button"
//                 onClick={() =>
//                   setStep("minute")
//                 }
//                 className={`
//                   text-2xl
//                   leading-none
//                   font-bold
//                   ${
//                     step === "minute"
//                       ? "text-white"
//                       : "text-white/50"
//                   }
//                 `}
//               >
//                 {String(minute).padStart(
//                   2,
//                   "0"
//                 )}
//               </button>

//               {/* AM / PM */}

//               <div
//                 className="
//                   ml-auto
//                   flex
//                   items-center
//                   gap-1
//                 "
//               >
//                 <button
//                   type="button"
//                   onClick={() =>
//                     setPeriod("AM")
//                   }
//                   className={`
//                     px-2
//                     py-1
//                     rounded-md
//                     text-[11px]
//                     font-bold
//                     ${
//                       period === "AM"
//                         ? "bg-white text-purple-600"
//                         : "text-white/70 hover:bg-white/10"
//                     }
//                   `}
//                 >
//                   AM
//                 </button>

//                 <button
//                   type="button"
//                   onClick={() =>
//                     setPeriod("PM")
//                   }
//                   className={`
//                     px-2
//                     py-1
//                     rounded-md
//                     text-[11px]
//                     font-bold
//                     ${
//                       period === "PM"
//                         ? "bg-white text-purple-600"
//                         : "text-white/70 hover:bg-white/10"
//                     }
//                   `}
//                 >
//                   PM
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* CLOCK */}

//           <div className="px-4 py-4">
//             <div
//               className="
//                 relative
//                 mx-auto
//                 w-[190px]
//                 h-[190px]
//                 rounded-full
//                 bg-[#27272c]
//                 border
//                 border-white/10
//               "
//             >
//               {/* CENTER */}

//               <div
//                 className="
//                   absolute
//                   left-1/2
//                   top-1/2
//                   -translate-x-1/2
//                   -translate-y-1/2
//                   w-3
//                   h-3
//                   rounded-full
//                   bg-purple-500
//                   z-20
//                 "
//               />

//               {/* HAND */}

//               <div
//                 className="
//                   absolute
//                   left-1/2
//                   top-1/2
//                   w-[2px]
//                   h-[70px]
//                   origin-bottom
//                   bg-purple-500
//                   -translate-x-1/2
//                   -translate-y-full
//                   z-[5]
//                 "
//                 style={{
//                   transform:
//                     `translateX(-50%) translateY(-100%) rotate(${
//                       step === "hour"
//                         ? (hour % 12) * 30
//                         : (minute / 5) * 30
//                     }deg)`,
//                 }}
//               />

//               {/* HOURS */}

//               {step === "hour" &&
//                 Array.from(
//                   { length: 12 },
//                   (_, index) => {
//                     const number =
//                       index + 1;

//                     const selected =
//                       hour === number;

//                     return (
//                       <button
//                         key={number}
//                         type="button"
//                         onClick={() =>
//                           selectHour(
//                             number
//                           )
//                         }
//                         className={`
//                           absolute
//                           -translate-x-1/2
//                           -translate-y-1/2
//                           w-8
//                           h-8
//                           rounded-full
//                           flex
//                           items-center
//                           justify-center
//                           text-xs
//                           font-semibold
//                           z-10
//                           transition
//                           ${
//                             selected
//                               ? "bg-purple-500 text-white shadow-md"
//                               : "text-gray-300 hover:bg-white/10"
//                           }
//                         `}
//                         style={getPosition(
//                           number
//                         )}
//                       >
//                         {number}
//                       </button>
//                     );
//                   }
//                 )}

//               {/* MINUTES */}

//               {step === "minute" &&
//                 Array.from(
//                   { length: 12 },
//                   (_, index) => {
//                     const number =
//                       index * 5;

//                     const selected =
//                       minute === number;

//                     return (
//                       <button
//                         key={number}
//                         type="button"
//                         onClick={() =>
//                           selectMinute(
//                             number
//                           )
//                         }
//                         className={`
//                           absolute
//                           -translate-x-1/2
//                           -translate-y-1/2
//                           w-8
//                           h-8
//                           rounded-full
//                           flex
//                           items-center
//                           justify-center
//                           text-[10px]
//                           font-semibold
//                           z-10
//                           transition
//                           ${
//                             selected
//                               ? "bg-purple-500 text-white shadow-md"
//                               : "text-gray-300 hover:bg-white/10"
//                           }
//                         `}
//                         style={getPosition(
//                           number,
//                           true
//                         )}
//                       >
//                         {String(
//                           number
//                         ).padStart(
//                           2,
//                           "0"
//                         )}
//                       </button>
//                     );
//                   }
//                 )}
//             </div>

//             {/* STEP BUTTONS */}

//             <div
//               className="
//                 flex
//                 justify-center
//                 gap-2
//                 mt-3
//               "
//             >
//               <button
//                 type="button"
//                 onClick={() =>
//                   setStep("hour")
//                 }
//                 className={`
//                   px-3
//                   py-1.5
//                   rounded-lg
//                   text-[11px]
//                   font-semibold
//                   ${
//                     step === "hour"
//                       ? "bg-purple-500/20 text-purple-300"
//                       : "text-gray-500"
//                   }
//                 `}
//               >
//                 Hour
//               </button>

//               <button
//                 type="button"
//                 onClick={() =>
//                   setStep("minute")
//                 }
//                 className={`
//                   px-3
//                   py-1.5
//                   rounded-lg
//                   text-[11px]
//                   font-semibold
//                   ${
//                     step === "minute"
//                       ? "bg-purple-500/20 text-purple-300"
//                       : "text-gray-500"
//                   }
//                 `}
//               >
//                 Minute
//               </button>
//             </div>
//           </div>

//           {/* FOOTER */}

//           <div
//             className="
//               border-t
//               border-white/10
//               px-4
//               py-2.5
//               flex
//               justify-end
//               gap-2
//             "
//           >
//             <button
//               type="button"
//               onClick={() =>
//                 setOpen(false)
//               }
//               className="
//                 px-3
//                 py-2
//                 rounded-lg
//                 text-[11px]
//                 font-semibold
//                 text-gray-400
//                 hover:text-white
//                 hover:bg-white/5
//               "
//             >
//               CANCEL
//             </button>

//             <button
//               type="button"
//               onClick={handleSet}
//               className="
//                 px-4
//                 py-2
//                 rounded-lg
//                 bg-purple-500
//                 hover:bg-purple-600
//                 text-white
//                 text-[11px]
//                 font-bold
//               "
//             >
//               SET
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// /* =========================================================
//    CREATE INSTITUTE PROFILE
// ========================================================= */

// export default function CreateProfile() {
//   const navigate = useNavigate();

//   /* =======================================================
//      STATE
//   ======================================================= */

//   const [categories, setCategories] =
//     useState([]);

//   const [loading, setLoading] =
//     useState(false);

//   const [
//     categoriesLoading,
//     setCategoriesLoading,
//   ] = useState(true);

//   const [
//     authLoading,
//     setAuthLoading,
//   ] = useState(true);

//   /* =======================================================
//      FORM DATA
//   ======================================================= */

//   const [formData, setFormData] =
//     useState({
//       name: "",

//       /* Firebase login details */

//       email: "",
//       phone_number: "",

//       /* Institute address */

//       address: "",

//       city: "",
//       state: "",
//       pincode: "",

//       /* Backend field names */

//       start_time: "",
//       end_time: "",

//       timezone: "Asia/Kolkata",

//       selectedCategories: [],
//     });

//   /* =========================================================
//      FIREBASE AUTH USER
     
//      Google:
//        user.email

//      Mobile:
//        user.phoneNumber
//   ========================================================= */

//   useEffect(() => {
//     const unsubscribe =
//       onAuthStateChanged(
//         auth,
//         (user) => {
//           console.log(
//             "================================="
//           );

//           console.log(
//             "FIREBASE AUTH USER:",
//             user
//           );

//           console.log(
//             "================================="
//           );

//           if (!user) {
//             setAuthLoading(false);

//             toast.error(
//               "Please login before creating profile"
//             );

//             navigate(
//               "/institute-login",
//               {
//                 replace: true,
//               }
//             );

//             return;
//           }

//           console.log(
//             "Firebase UID:",
//             user.uid
//           );

//           console.log(
//             "Firebase Email:",
//             user.email
//           );

//           console.log(
//             "Firebase Phone:",
//             user.phoneNumber
//           );

//           console.log(
//             "Provider Data:",
//             user.providerData
//           );

//           /* =============================================
//              AUTO-FILL LOGIN DETAILS
//           ============================================= */

//           setFormData((prev) => ({
//             ...prev,

//             email:
//               user.email ||
//               prev.email ||
//               "",

//             phone_number:
//               user.phoneNumber ||
//               prev.phone_number ||
//               "",
//           }));

//           setAuthLoading(false);
//         }
//       );

//     return () => {
//       unsubscribe();
//     };
//   }, [navigate]);

//   /* =========================================================
//      FETCH CATEGORIES
//   ========================================================= */

//   const fetchCategories =
//     async () => {
//       try {
//         setCategoriesLoading(
//           true
//         );

//         const response =
//           await API.get(
//             "/categories"
//           );

//         console.log(
//           "Categories API Response:",
//           response.data
//         );

//         let categoryData = [];

//         if (
//           Array.isArray(
//             response?.data?.data
//           )
//         ) {
//           categoryData =
//             response.data.data;
//         } else if (
//           Array.isArray(
//             response?.data
//           )
//         ) {
//           categoryData =
//             response.data;
//         }

//         setCategories(
//           categoryData
//         );
//       } catch (error) {
//         console.error(
//           "FETCH CATEGORIES ERROR:",
//           error
//         );

//         toast.error(
//           error?.response?.data
//             ?.message ||
//             "Failed to load categories"
//         );

//         setCategories([]);
//       } finally {
//         setCategoriesLoading(
//           false
//         );
//       }
//     };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   /* =========================================================
//      HANDLE NORMAL INPUT
//   ========================================================= */

//   const handleChange = (
//     e
//   ) => {
//     const {
//       name,
//       value,
//     } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   /* =========================================================
//      CATEGORY SELECT
//   ========================================================= */

//   const toggleCategory = (
//     categoryId
//   ) => {
//     const id =
//       Number(categoryId);

//     setFormData((prev) => {
//       const alreadySelected =
//         prev.selectedCategories.includes(
//           id
//         );

//       if (alreadySelected) {
//         return {
//           ...prev,

//           selectedCategories:
//             prev.selectedCategories.filter(
//               (item) =>
//                 item !== id
//             ),
//         };
//       }

//       return {
//         ...prev,

//         selectedCategories: [
//           ...prev.selectedCategories,
//           id,
//         ],
//       };
//     });
//   };

//   /* =========================================================
//      SUBMIT PROFILE
//   ========================================================= */

//   const handleSubmit =
//     async (e) => {
//       e.preventDefault();

//       /* ===============================================
//          CATEGORY VALIDATION
//       =============================================== */

//       if (
//         formData
//           .selectedCategories
//           .length === 0
//       ) {
//         toast.error(
//           "Please select at least one category"
//         );

//         return;
//       }

//       /* ===============================================
//          TIME VALIDATION
//       =============================================== */

//       if (
//         !formData.start_time
//       ) {
//         toast.error(
//           "Please select Open Time"
//         );

//         return;
//       }

//       if (
//         !formData.end_time
//       ) {
//         toast.error(
//           "Please select Close Time"
//         );

//         return;
//       }

//       /* ===============================================
//          FIREBASE USER
//       =============================================== */

//       const currentUser =
//         auth.currentUser;

//       if (!currentUser) {
//         toast.error(
//           "Your session has expired. Please login again."
//         );

//         navigate(
//           "/institute-login",
//           {
//             replace: true,
//           }
//         );

//         return;
//       }

//       setLoading(true);

//       try {
//         /* =============================================
//            FIREBASE TOKEN
//         ============================================= */

//         const firebaseToken =
//           await currentUser.getIdToken(
//             true
//           );

//         if (!firebaseToken) {
//           throw new Error(
//             "Firebase authentication token missing"
//           );
//         }

//         /* =============================================
//            FORM DATA
//         ============================================= */

//         const payload =
//           new FormData();

//         /* Institute name */

//         payload.append(
//           "name",
//           formData.name.trim()
//         );

//         /* Login email */

//         payload.append(
//           "email",
//           formData.email.trim()
//         );

//         /* Login phone */

//         payload.append(
//           "phone_number",
//           formData.phone_number.trim()
//         );

//         /* Address */

//         payload.append(
//           "address",
//           formData.address.trim()
//         );

//         /* City */

//         payload.append(
//           "city",
//           formData.city.trim()
//         );

//         /* State */

//         payload.append(
//           "state",
//           formData.state.trim()
//         );

//         /* Pincode */

//         payload.append(
//           "pincode",
//           formData.pincode.trim()
//         );

//         /* =============================================
//            OPEN TIME
           
//            UI:
//            Open Time

//            Backend:
//            start_time
//         ============================================= */

//         payload.append(
//           "start_time",
//           formData.start_time
//         );

//         /* =============================================
//            CLOSE TIME

//            UI:
//            Close Time

//            Backend:
//            end_time
//         ============================================= */

//         payload.append(
//           "end_time",
//           formData.end_time
//         );

//         /* Timezone */

//         payload.append(
//           "timezone",
//           formData.timezone
//         );

//         /* =============================================
//            CATEGORIES ONLY
//         ============================================= */

//         const categoryPayload =
//           formData
//             .selectedCategories
//             .map(
//               (categoryId) => ({
//                 category_id:
//                   Number(
//                     categoryId
//                   ),
//               })
//             );

//         payload.append(
//           "categories",
//           JSON.stringify(
//             categoryPayload
//           )
//         );

//         /* =============================================
//            DEBUG
//         ============================================= */

//         console.log(
//           "================================="
//         );

//         console.log(
//           "SUBMITTING INSTITUTE PROFILE"
//         );

//         console.log(
//           "================================="
//         );

//         console.log(
//           "Institute:",
//           formData.name
//         );

//         console.log(
//           "Email:",
//           formData.email
//         );

//         console.log(
//           "Phone:",
//           formData.phone_number
//         );

//         console.log(
//           "Address:",
//           formData.address
//         );

//         console.log(
//           "City:",
//           formData.city
//         );

//         console.log(
//           "State:",
//           formData.state
//         );

//         console.log(
//           "Pincode:",
//           formData.pincode
//         );

//         console.log(
//           "Open Time:",
//           formData.start_time
//         );

//         console.log(
//           "Close Time:",
//           formData.end_time
//         );

//         console.log(
//           "Timezone:",
//           formData.timezone
//         );

//         console.log(
//           "Categories:",
//           categoryPayload
//         );

//         /* =============================================
//            API
//         ============================================= */

//         const response =
//           await completeInstituteProfile(
//             payload,
//             firebaseToken
//           );

//         console.log(
//           "CREATE PROFILE RESPONSE:",
//           response
//         );

//         /* =============================================
//            PROFILE CREATED
//         ============================================= */

//         localStorage.setItem(
//           "profileCreated",
//           "true"
//         );

//         toast.success(
//           "Profile submitted successfully"
//         );

//         navigate(
//           "/institute/pending",
//           {
//             replace: true,
//           }
//         );
//       } catch (error) {
//         console.error(
//           "CREATE PROFILE ERROR:",
//           error
//         );

//         console.error(
//           "BACKEND RESPONSE:",
//           error?.response?.data
//         );

//         toast.error(
//           error?.response?.data
//             ?.message ||
//             error?.message ||
//             "Failed to submit profile"
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//   /* =========================================================
//      STYLES
//   ========================================================= */

//   const inputClass = `
//     w-full
//     rounded-xl
//     bg-[#242428]
//     border
//     border-white/10
//     px-4
//     py-3
//     text-white
//     placeholder-gray-500
//     outline-none
//     transition
//     focus:border-purple-500
//     focus:ring-1
//     focus:ring-purple-500
//   `;

//   const readOnlyClass = `
//     w-full
//     rounded-xl
//     bg-[#202024]
//     border
//     border-white/10
//     px-4
//     py-3
//     text-gray-300
//     outline-none
//     cursor-not-allowed
//   `;

//   const labelClass =
//     "block text-sm font-semibold text-white mb-2";

//   /* =========================================================
//      AUTH LOADING
//   ========================================================= */

//   if (authLoading) {
//     return (
//       <div
//         className="
//           min-h-screen
//           bg-[#08080c]
//           flex
//           items-center
//           justify-center
//         "
//       >
//         <div className="text-center">
//           <div
//             className="
//               w-10
//               h-10
//               rounded-full
//               border-4
//               border-purple-500/20
//               border-t-purple-500
//               animate-spin
//               mx-auto
//             "
//           />

//           <p
//             className="
//               text-gray-400
//               mt-4
//             "
//           >
//             Loading account...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   /* =========================================================
//      UI
//   ========================================================= */

//   return (
//     <div
//       className="
//         min-h-screen
//         bg-[#08080c]
//         flex
//         items-center
//         justify-center
//         px-4
//         py-10
//       "
//     >
//       <div
//         className="
//           w-full
//           max-w-3xl
//           bg-[#18181d]
//           border
//           border-[#33333a]
//           rounded-3xl
//           p-8
//           shadow-2xl
//         "
//       >
//         {/* =================================================
//             HEADER
//         ================================================= */}

//         <div
//           className="
//             flex
//             flex-col
//             items-center
//             mb-8
//           "
//         >
//           <h1
//             className="
//               text-4xl
//               font-bold
//               text-purple-400
//               text-center
//             "
//           >
//             Create Institute Profile
//           </h1>

//           <p
//             className="
//               text-gray-400
//               mt-2
//             "
//           >
//             Complete institute details
//           </p>
//         </div>

//         {/* =================================================
//             FORM
//         ================================================= */}

//         <form
//           onSubmit={handleSubmit}
//           className="space-y-5"
//         >
//           {/* =================================================
//               INSTITUTE NAME
//           ================================================= */}

//           <div>
//             <label
//               className={labelClass}
//             >
//               Institute Name
//             </label>

//             <input
//               type="text"
//               name="name"
//               value={
//                 formData.name
//               }
//               onChange={
//                 handleChange
//               }
//               placeholder="Enter institute name"
//               required
//               className={
//                 inputClass
//               }
//             />
//           </div>

//           {/* =================================================
//               EMAIL / PHONE
//           ================================================= */}

//           <div
//             className="
//               grid
//               grid-cols-1
//               md:grid-cols-2
//               gap-4
//             "
//           >
//             {/* EMAIL */}

//             <div>
//               <label
//                 className={
//                   labelClass
//                 }
//               >
//                 Email
//               </label>

//               <input
//                 type="email"
//                 value={
//                   formData.email
//                 }
//                 readOnly
//                 placeholder="Logged-in email"
//                 className={
//                   readOnlyClass
//                 }
//               />

//               {formData.email && (
//                 <p
//                   className="
//                     text-[11px]
//                     text-purple-400
//                     mt-1.5
//                   "
//                 >
//                   ✓ From your login account
//                 </p>
//               )}
//             </div>

//             {/* PHONE */}

//             <div>
//               <label
//                 className={
//                   labelClass
//                 }
//               >
//                 Phone
//               </label>

//               <input
//                 type="tel"
//                 value={
//                   formData.phone_number
//                 }
//                 readOnly
//                 placeholder="Logged-in mobile number"
//                 className={
//                   readOnlyClass
//                 }
//               />

//               {formData.phone_number && (
//                 <p
//                   className="
//                     text-[11px]
//                     text-purple-400
//                     mt-1.5
//                   "
//                 >
//                   ✓ From your login account
//                 </p>
//               )}
//             </div>
//           </div>

//           {/* =================================================
//               ADDRESS
//           ================================================= */}

//           <div>
//             <label
//               className={labelClass}
//             >
//               Address
//             </label>

//             <textarea
//               name="address"
//               value={
//                 formData.address
//               }
//               onChange={
//                 handleChange
//               }
//               placeholder="Enter institute address"
//               required
//               rows={3}
//               className={`
//                 ${inputClass}
//                 resize-none
//               `}
//             />
//           </div>

//           {/* =================================================
//               CITY / STATE / PINCODE
//           ================================================= */}

//           <div
//             className="
//               grid
//               grid-cols-1
//               md:grid-cols-3
//               gap-4
//             "
//           >
//             {/* CITY */}

//             <div>
//               <label
//                 className={
//                   labelClass
//                 }
//               >
//                 City
//               </label>

//               <input
//                 type="text"
//                 name="city"
//                 value={
//                   formData.city
//                 }
//                 onChange={
//                   handleChange
//                 }
//                 placeholder="City"
//                 required
//                 className={
//                   inputClass
//                 }
//               />
//             </div>

//             {/* STATE */}

//             <div>
//               <label
//                 className={
//                   labelClass
//                 }
//               >
//                 State
//               </label>

//               <input
//                 type="text"
//                 name="state"
//                 value={
//                   formData.state
//                 }
//                 onChange={
//                   handleChange
//                 }
//                 placeholder="State"
//                 required
//                 className={
//                   inputClass
//                 }
//               />
//             </div>

//             {/* PINCODE */}

//             <div>
//               <label
//                 className={
//                   labelClass
//                 }
//               >
//                 Pincode
//               </label>

//               <input
//                 type="text"
//                 name="pincode"
//                 value={
//                   formData.pincode
//                 }
//                 onChange={
//                   handleChange
//                 }
//                 placeholder="Pincode"
//                 required
//                 className={
//                   inputClass
//                 }
//               />
//             </div>
//           </div>

//           {/* =================================================
//               OPEN / CLOSE / TIMEZONE
//           ================================================= */}

//           <div
//             className="
//               grid
//               grid-cols-1
//               md:grid-cols-3
//               gap-4
//             "
//           >
//             {/* OPEN TIME */}

//             <div>
//               <label
//                 className={
//                   labelClass
//                 }
//               >
//                 Open Time
//               </label>

//               <TimePicker
//                 label="Open Time"
//                 value={
//                   formData.start_time
//                 }
//                 onChange={(
//                   value
//                 ) =>
//                   setFormData(
//                     (prev) => ({
//                       ...prev,
//                       start_time:
//                         value,
//                     })
//                   )
//                 }
//               />
//             </div>

//             {/* CLOSE TIME */}

//             <div>
//               <label
//                 className={
//                   labelClass
//                 }
//               >
//                 Close Time
//               </label>

//               <TimePicker
//                 label="Close Time"
//                 value={
//                   formData.end_time
//                 }
//                 onChange={(
//                   value
//                 ) =>
//                   setFormData(
//                     (prev) => ({
//                       ...prev,
//                       end_time:
//                         value,
//                     })
//                   )
//                 }
//               />
//             </div>

//             {/* TIMEZONE */}

//             <div>
//               <label
//                 className={
//                   labelClass
//                 }
//               >
//                 Timezone
//               </label>

//               <select
//                 name="timezone"
//                 value={
//                   formData.timezone
//                 }
//                 onChange={
//                   handleChange
//                 }
//                 className={`
//                   ${inputClass}
//                   cursor-pointer
//                 `}
//                 style={{
//                   colorScheme:
//                     "dark",
//                 }}
//               >
//                 <option value="Asia/Kolkata">
//                   India (IST)
//                 </option>

//                 <option value="Asia/Dubai">
//                   UAE
//                 </option>

//                 <option value="Asia/Riyadh">
//                   Saudi Arabia
//                 </option>

//                 <option value="Asia/Singapore">
//                   Singapore
//                 </option>

//                 <option value="Asia/Tokyo">
//                   Japan
//                 </option>

//                 <option value="Europe/London">
//                   United Kingdom
//                 </option>

//                 <option value="Europe/Paris">
//                   France
//                 </option>

//                 <option value="Europe/Berlin">
//                   Germany
//                 </option>

//                 <option value="America/New_York">
//                   USA - New York
//                 </option>

//                 <option value="America/Los_Angeles">
//                   USA - Los Angeles
//                 </option>

//                 <option value="Australia/Sydney">
//                   Australia - Sydney
//                 </option>
//               </select>
//             </div>
//           </div>

//           {/* =================================================
//               CATEGORIES
//           ================================================= */}

//           <div>
//             <div
//               className="
//                 flex
//                 items-center
//                 justify-between
//                 mb-3
//               "
//             >
//               <label
//                 className="
//                   text-sm
//                   font-semibold
//                   text-white
//                 "
//               >
//                 Categories
//               </label>

//               {formData
//                 .selectedCategories
//                 .length > 0 && (
//                 <span
//                   className="
//                     text-xs
//                     font-semibold
//                     text-purple-400
//                   "
//                 >
//                   {
//                     formData
//                       .selectedCategories
//                       .length
//                   }{" "}
//                   selected
//                 </span>
//               )}
//             </div>

//             {/* LOADING */}

//             {categoriesLoading ? (
//               <div
//                 className="
//                   rounded-2xl
//                   border
//                   border-white/10
//                   bg-[#242428]
//                   p-8
//                   text-center
//                   text-gray-400
//                 "
//               >
//                 Loading categories...
//               </div>
//             ) : categories.length ===
//               0 ? (
//               /* NO CATEGORIES */

//               <div
//                 className="
//                   rounded-2xl
//                   border
//                   border-white/10
//                   bg-[#242428]
//                   p-8
//                   text-center
//                 "
//               >
//                 <p
//                   className="
//                     text-red-400
//                     text-sm
//                   "
//                 >
//                   No categories available.
//                 </p>

//                 <button
//                   type="button"
//                   onClick={
//                     fetchCategories
//                   }
//                   className="
//                     mt-3
//                     text-purple-400
//                     text-sm
//                   "
//                 >
//                   Try again
//                 </button>
//               </div>
//             ) : (
//               /* CATEGORY CARDS */

//               <div
//                 className="
//                   grid
//                   grid-cols-2
//                   sm:grid-cols-3
//                   md:grid-cols-4
//                   gap-4
//                 "
//               >
//                 {categories.map(
//                   (category) => {
//                     const categoryId =
//                       Number(
//                         category.id
//                       );

//                     const selected =
//                       formData.selectedCategories.includes(
//                         categoryId
//                       );

//                     const imageUrl =
//                       getCategoryImage(
//                         category
//                       );

//                     return (
//                       <button
//                         key={
//                           category.id
//                         }
//                         type="button"
//                         onClick={() =>
//                           toggleCategory(
//                             categoryId
//                           )
//                         }
//                         className={`
//                           group
//                           relative
//                           overflow-hidden
//                           rounded-2xl
//                           border
//                           text-left
//                           transition-all
//                           duration-200
//                           ${
//                             selected
//                               ? "border-purple-500 ring-2 ring-purple-500/30 bg-purple-500/10"
//                               : "border-white/10 bg-[#242428] hover:border-purple-500/50 hover:-translate-y-1"
//                           }
//                         `}
//                       >
//                         {/* IMAGE */}

//                         <div
//                           className="
//                             relative
//                             w-full
//                             h-32
//                             bg-[#303036]
//                             overflow-hidden
//                           "
//                         >
//                           {imageUrl ? (
//                             <img
//                               src={
//                                 imageUrl
//                               }
//                               alt={
//                                 category.name
//                               }
//                               className="
//                                 w-full
//                                 h-full
//                                 object-cover
//                                 transition
//                                 duration-300
//                                 group-hover:scale-105
//                               "
//                               onError={(
//                                 e
//                               ) => {
//                                 e.currentTarget.style.display =
//                                   "none";
//                               }}
//                             />
//                           ) : (
//                             <div
//                               className="
//                                 w-full
//                                 h-full
//                                 flex
//                                 items-center
//                                 justify-center
//                                 text-4xl
//                               "
//                             >
//                               🎨
//                             </div>
//                           )}

//                           {/* IMAGE GRADIENT */}

//                           <div
//                             className="
//                               absolute
//                               inset-0
//                               bg-gradient-to-t
//                               from-black/70
//                               via-transparent
//                               to-transparent
//                             "
//                           />

//                           {/* SELECT CHECK */}

//                           <div
//                             className={`
//                               absolute
//                               top-3
//                               right-3
//                               w-7
//                               h-7
//                               rounded-full
//                               border
//                               flex
//                               items-center
//                               justify-center
//                               transition
//                               ${
//                                 selected
//                                   ? "bg-purple-500 border-purple-400 text-white"
//                                   : "bg-black/40 border-white/40 text-transparent"
//                               }
//                             `}
//                           >
//                             ✓
//                           </div>
//                         </div>

//                         {/* CATEGORY TEXT */}

//                         <div
//                           className="
//                             px-4
//                             py-3
//                           "
//                         >
//                           <p
//                             className={`
//                               font-semibold
//                               truncate
//                               ${
//                                 selected
//                                   ? "text-purple-300"
//                                   : "text-white"
//                               }
//                             `}
//                           >
//                             {
//                               category.name
//                             }
//                           </p>

//                           <p
//                             className="
//                               text-[11px]
//                               text-gray-500
//                               mt-1
//                             "
//                           >
//                             {selected
//                               ? "Selected"
//                               : "Click to select"}
//                           </p>
//                         </div>
//                       </button>
//                     );
//                   }
//                 )}
//               </div>
//             )}

//             <p
//               className="
//                 text-gray-500
//                 text-xs
//                 mt-3
//               "
//             >
//               Select the categories offered by your institute.
//             </p>
//           </div>

//           {/* =================================================
//               SUBMIT
//           ================================================= */}

//           <div
//             className="
//               flex
//               justify-end
//               pt-5
//             "
//           >
//             <button
//               type="submit"
//               disabled={
//                 loading ||
//                 categoriesLoading ||
//                 formData
//                   .selectedCategories
//                   .length === 0
//               }
//               className="
//                 px-8
//                 py-3
//                 rounded-xl
//                 bg-gradient-to-r
//                 from-purple-500
//                 to-pink-500
//                 text-white
//                 font-bold
//                 transition
//                 hover:opacity-90
//                 disabled:opacity-50
//                 disabled:cursor-not-allowed
//               "
//             >
//               {loading
//                 ? "Submitting..."
//                 : "Send For Approval"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../config/firebase";
import { completeInstituteProfile } from "../services/instituteService";
import API from "../services/api";

/* =========================================================
   CATEGORY IMAGE HELPER
========================================================= */

const getCategoryImage = (category) => {
  const image =
    category?.image_url ||
    category?.image ||
    category?.thumbnail ||
    category?.thumbnail_url ||
    "";

  if (!image) return "";

  if (
    image.startsWith("http://") ||
    image.startsWith("https://")
  ) {
    return image;
  }

  return `http://localhost:5000${image}`;
};

/* =========================================================
   COMPACT INLINE TIME PICKER
========================================================= */

function TimePicker({ value, onChange, label }) {
  const [open, setOpen] = useState(false);

  const [hour, setHour] = useState(12);
  const [minute, setMinute] = useState(0);
  const [period, setPeriod] = useState("AM");

  const [step, setStep] = useState("hour");

  /* =======================================================
     LOAD EXISTING VALUE
  ======================================================= */

  const loadValue = (time) => {
    if (!time) return;

    const [rawHour, rawMinute] = String(time).split(":");

    let h = Number(rawHour);
    const m = Number(rawMinute);

    if (Number.isNaN(h) || Number.isNaN(m)) {
      return;
    }

    setPeriod(h >= 12 ? "PM" : "AM");

    if (h === 0) {
      h = 12;
    } else if (h > 12) {
      h -= 12;
    }

    setHour(h);
    setMinute(m);
  };

  useEffect(() => {
    loadValue(value);
  }, [value]);

  /* =======================================================
     OPEN PICKER
  ======================================================= */

  const openPicker = () => {
    loadValue(value);
    setStep("hour");
    setOpen((prev) => !prev);
  };

  /* =======================================================
     DISPLAY VALUE
  ======================================================= */

  const formatDisplay = () => {
    if (!value) {
      return "Select time";
    }

    const [rawHour, rawMinute] = String(value).split(":");

    let h = Number(rawHour);
    const m = Number(rawMinute);

    if (Number.isNaN(h) || Number.isNaN(m)) {
      return "Select time";
    }

    const p = h >= 12 ? "PM" : "AM";

    if (h === 0) {
      h = 12;
    } else if (h > 12) {
      h -= 12;
    }

    return `${h}:${String(m).padStart(2, "0")} ${p}`;
  };

  /* =======================================================
     SET TIME
  ======================================================= */

  const handleSet = () => {
    let finalHour = hour;

    if (period === "AM") {
      if (finalHour === 12) {
        finalHour = 0;
      }
    } else {
      if (finalHour !== 12) {
        finalHour += 12;
      }
    }

    const formattedTime =
      `${String(finalHour).padStart(2, "0")}:${String(minute).padStart(
        2,
        "0"
      )}`;

    onChange(formattedTime);
    setOpen(false);
  };

  /* =======================================================
     SELECT HOUR
  ======================================================= */

  const selectHour = (selectedHour) => {
    setHour(selectedHour);
    setStep("minute");
  };

  /* =======================================================
     SELECT MINUTE
  ======================================================= */

  const selectMinute = (selectedMinute) => {
    setMinute(selectedMinute);
  };

  /* =======================================================
     CLOCK POSITION
  ======================================================= */

  const getPosition = (number, isMinute = false) => {
    const angle =
      (isMinute ? number / 5 : number % 12) * 30 - 90;

    const radius = 40;

    return {
      left: `${
        50 +
        Math.cos((angle * Math.PI) / 180) * radius
      }%`,

      top: `${
        50 +
        Math.sin((angle * Math.PI) / 180) * radius
      }%`,
    };
  };

  return (
    <div className="relative w-full">
      {/* =================================================
          TIME FIELD
      ================================================= */}

      <button
        type="button"
        onClick={openPicker}
        aria-label={`Select ${label || "time"}`}
        className="
          w-full
          h-[50px]
          rounded-xl
          bg-[#242428]
          border
          border-white/10
          px-4
          text-left
          text-white
          hover:border-purple-500
          focus:outline-none
          focus:border-purple-500
          transition
        "
      >
        {value ? (
          <span className="text-white">
            {formatDisplay()}
          </span>
        ) : (
          <span className="text-gray-500">
            Select time
          </span>
        )}
      </button>

      {/* =================================================
          INLINE TIME POPUP
      ================================================= */}

      {open && (
        <div
          className="
            absolute
            left-0
            top-[58px]
            z-[1000]
            w-[300px]
            max-w-[calc(100vw-32px)]
            rounded-2xl
            overflow-hidden
            bg-[#18181d]
            border
            border-white/10
            shadow-2xl
          "
        >
          {/* HEADER */}

          <div
            className="
              bg-gradient-to-r
              from-purple-600
              to-pink-500
              px-4
              py-3
            "
          >
            <div
              className="
                text-white/70
                text-[11px]
                font-medium
                mb-1
              "
            >
              {label || "Select Time"}
            </div>

            <div className="flex items-center">
              {/* HOUR */}

              <button
                type="button"
                onClick={() => setStep("hour")}
                className={`
                  text-2xl
                  leading-none
                  font-bold
                  ${
                    step === "hour"
                      ? "text-white"
                      : "text-white/50"
                  }
                `}
              >
                {String(hour).padStart(2, "0")}
              </button>

              <span
                className="
                  text-2xl
                  leading-none
                  font-bold
                  text-white
                  mx-1
                "
              >
                :
              </span>

              {/* MINUTE */}

              <button
                type="button"
                onClick={() => setStep("minute")}
                className={`
                  text-2xl
                  leading-none
                  font-bold
                  ${
                    step === "minute"
                      ? "text-white"
                      : "text-white/50"
                  }
                `}
              >
                {String(minute).padStart(2, "0")}
              </button>

              {/* AM / PM */}

              <div
                className="
                  ml-auto
                  flex
                  items-center
                  gap-1
                "
              >
                <button
                  type="button"
                  onClick={() => setPeriod("AM")}
                  className={`
                    px-2
                    py-1
                    rounded-md
                    text-[11px]
                    font-bold
                    ${
                      period === "AM"
                        ? "bg-white text-purple-600"
                        : "text-white/70 hover:bg-white/10"
                    }
                  `}
                >
                  AM
                </button>

                <button
                  type="button"
                  onClick={() => setPeriod("PM")}
                  className={`
                    px-2
                    py-1
                    rounded-md
                    text-[11px]
                    font-bold
                    ${
                      period === "PM"
                        ? "bg-white text-purple-600"
                        : "text-white/70 hover:bg-white/10"
                    }
                  `}
                >
                  PM
                </button>
              </div>
            </div>
          </div>

          {/* CLOCK */}

          <div className="px-4 py-4">
            <div
              className="
                relative
                mx-auto
                w-[190px]
                h-[190px]
                rounded-full
                bg-[#27272c]
                border
                border-white/10
              "
            >
              {/* CENTER */}

              <div
                className="
                  absolute
                  left-1/2
                  top-1/2
                  -translate-x-1/2
                  -translate-y-1/2
                  w-3
                  h-3
                  rounded-full
                  bg-purple-500
                  z-20
                "
              />

              {/* HAND */}

              <div
                className="
                  absolute
                  left-1/2
                  top-1/2
                  w-[2px]
                  h-[70px]
                  origin-bottom
                  bg-purple-500
                  -translate-x-1/2
                  -translate-y-full
                  z-[5]
                "
                style={{
                  transform:
                    `translateX(-50%) translateY(-100%) rotate(${
                      step === "hour"
                        ? (hour % 12) * 30
                        : (minute / 5) * 30
                    }deg)`,
                }}
              />

              {/* HOURS */}

              {step === "hour" &&
                Array.from({ length: 12 }, (_, index) => {
                  const number = index + 1;
                  const selected = hour === number;

                  return (
                    <button
                      key={number}
                      type="button"
                      onClick={() => selectHour(number)}
                      className={`
                        absolute
                        -translate-x-1/2
                        -translate-y-1/2
                        w-8
                        h-8
                        rounded-full
                        flex
                        items-center
                        justify-center
                        text-xs
                        font-semibold
                        z-10
                        transition
                        ${
                          selected
                            ? "bg-purple-500 text-white shadow-md"
                            : "text-gray-300 hover:bg-white/10"
                        }
                      `}
                      style={getPosition(number)}
                    >
                      {number}
                    </button>
                  );
                })}

              {/* MINUTES */}

              {step === "minute" &&
                Array.from({ length: 12 }, (_, index) => {
                  const number = index * 5;
                  const selected = minute === number;

                  return (
                    <button
                      key={number}
                      type="button"
                      onClick={() => selectMinute(number)}
                      className={`
                        absolute
                        -translate-x-1/2
                        -translate-y-1/2
                        w-8
                        h-8
                        rounded-full
                        flex
                        items-center
                        justify-center
                        text-[10px]
                        font-semibold
                        z-10
                        transition
                        ${
                          selected
                            ? "bg-purple-500 text-white shadow-md"
                            : "text-gray-300 hover:bg-white/10"
                        }
                      `}
                      style={getPosition(number, true)}
                    >
                      {String(number).padStart(2, "0")}
                    </button>
                  );
                })}
            </div>

            {/* STEP BUTTONS */}

            <div
              className="
                flex
                justify-center
                gap-2
                mt-3
              "
            >
              <button
                type="button"
                onClick={() => setStep("hour")}
                className={`
                  px-3
                  py-1.5
                  rounded-lg
                  text-[11px]
                  font-semibold
                  ${
                    step === "hour"
                      ? "bg-purple-500/20 text-purple-300"
                      : "text-gray-500"
                  }
                `}
              >
                Hour
              </button>

              <button
                type="button"
                onClick={() => setStep("minute")}
                className={`
                  px-3
                  py-1.5
                  rounded-lg
                  text-[11px]
                  font-semibold
                  ${
                    step === "minute"
                      ? "bg-purple-500/20 text-purple-300"
                      : "text-gray-500"
                  }
                `}
              >
                Minute
              </button>
            </div>
          </div>

          {/* FOOTER */}

          <div
            className="
              border-t
              border-white/10
              px-4
              py-2.5
              flex
              justify-end
              gap-2
            "
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="
                px-3
                py-2
                rounded-lg
                text-[11px]
                font-semibold
                text-gray-400
                hover:text-white
                hover:bg-white/5
              "
            >
              CANCEL
            </button>

            <button
              type="button"
              onClick={handleSet}
              className="
                px-4
                py-2
                rounded-lg
                bg-purple-500
                hover:bg-purple-600
                text-white
                text-[11px]
                font-bold
              "
            >
              SET
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   CREATE INSTITUTE PROFILE
========================================================= */

export default function CreateProfile() {
  const navigate = useNavigate();

  /* =======================================================
     STATE
  ======================================================= */

  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(false);

  const [
    categoriesLoading,
    setCategoriesLoading,
  ] = useState(true);

  const [
    authLoading,
    setAuthLoading,
  ] = useState(true);

  /* =======================================================
     FORM DATA
  ======================================================= */

  const [formData, setFormData] = useState({
    name: "",

    email: "",
    phone_number: "",

    address: "",

    city: "",
    state: "",
    pincode: "",

    start_time: "",
    end_time: "",

    timezone: "Asia/Kolkata",

    selectedCategories: [],
  });

  /* =========================================================
     LOAD LOGGED-IN ACCOUNT DETAILS

     Priority:

     1. Backend account data
     2. Firebase email / phone
     3. Existing form value
  ========================================================= */

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        console.log(
          "================================="
        );

        console.log(
          "FIREBASE AUTH USER"
        );

        console.log(
          "================================="
        );

        /* ===================================================
           USER NOT LOGGED IN
        =================================================== */

        if (!user) {
          setAuthLoading(false);

          toast.error(
            "Please login before creating profile"
          );

          navigate(
            "/institute-login",
            {
              replace: true,
            }
          );

          return;
        }

        /* ===================================================
           FIREBASE DATA
        =================================================== */

        const firebaseEmail =
          user?.email || "";

        const firebasePhone =
          user?.phoneNumber || "";

        /* ===================================================
           BACKEND ACCOUNT DATA
           
           InstituteLogin stores the logged-in institute
           object in localStorage.
        =================================================== */

        let storedInstitute = null;

        try {
          const storedData =
            localStorage.getItem(
              "institute"
            );

          if (storedData) {
            storedInstitute =
              JSON.parse(
                storedData
              );
          }
        } catch (error) {
          console.warn(
            "Unable to parse stored institute data:",
            error
          );
        }

        /* ===================================================
           ACCOUNT OBJECT
        =================================================== */

        const storedAccount =
          storedInstitute?.account || {};

        const accountEmail =
          storedAccount?.email ||
          storedInstitute?.email ||
          "";

        const accountPhone =
          storedAccount?.phone_number ||
          storedAccount?.phone ||
          storedInstitute?.phone_number ||
          storedInstitute?.phone ||
          "";

        /* ===================================================
           FINAL VALUES
        =================================================== */

        const finalEmail =
          accountEmail ||
          firebaseEmail ||
          "";

        const finalPhone =
          accountPhone ||
          firebasePhone ||
          "";

        /* ===================================================
           DEBUG
        =================================================== */

        console.log(
          "Firebase UID:",
          user?.uid
        );

        console.log(
          "Firebase Email:",
          firebaseEmail
        );

        console.log(
          "Firebase Phone:",
          firebasePhone
        );

        console.log(
          "Backend Account:",
          storedAccount
        );

        console.log(
          "Backend Account Email:",
          accountEmail
        );

        console.log(
          "Backend Account Phone:",
          accountPhone
        );

        console.log(
          "FINAL EMAIL:",
          finalEmail
        );

        console.log(
          "FINAL PHONE:",
          finalPhone
        );

        /* ===================================================
           AUTO-FILL FORM

           IMPORTANT:
           Email and phone are NOT readOnly.
           User can edit them.
        =================================================== */

        setFormData((prev) => ({
          ...prev,

          email:
            finalEmail ||
            prev.email ||
            "",

          phone_number:
            finalPhone ||
            prev.phone_number ||
            "",
        }));

        setAuthLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [navigate]);

  /* =========================================================
     FETCH CATEGORIES
  ========================================================= */

  const fetchCategories = async () => {
    try {
      setCategoriesLoading(true);

      const response =
        await API.get(
          "/categories"
        );

      console.log(
        "Categories API Response:",
        response.data
      );

      let categoryData = [];

      if (
        Array.isArray(
          response?.data?.data
        )
      ) {
        categoryData =
          response.data.data;
      } else if (
        Array.isArray(
          response?.data
        )
      ) {
        categoryData =
          response.data;
      }

      setCategories(categoryData);
    } catch (error) {
      console.error(
        "FETCH CATEGORIES ERROR:",
        error
      );

      toast.error(
        error?.response?.data
          ?.message ||
          "Failed to load categories"
      );

      setCategories([]);
    } finally {
      setCategoriesLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  /* =========================================================
     HANDLE NORMAL INPUT
  ========================================================= */

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =========================================================
     CATEGORY SELECT
  ========================================================= */

  const toggleCategory = (categoryId) => {
    const id = Number(categoryId);

    setFormData((prev) => {
      const alreadySelected =
        prev.selectedCategories.includes(
          id
        );

      if (alreadySelected) {
        return {
          ...prev,

          selectedCategories:
            prev.selectedCategories.filter(
              (item) =>
                item !== id
            ),
        };
      }

      return {
        ...prev,

        selectedCategories: [
          ...prev.selectedCategories,
          id,
        ],
      };
    });
  };

  /* =========================================================
     SUBMIT PROFILE
  ========================================================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    /* =====================================================
       CATEGORY VALIDATION
    ===================================================== */

    if (
      formData.selectedCategories
        .length === 0
    ) {
      toast.error(
        "Please select at least one category"
      );

      return;
    }

    /* =====================================================
       TIME VALIDATION
    ===================================================== */

    if (!formData.start_time) {
      toast.error(
        "Please select Open Time"
      );

      return;
    }

    if (!formData.end_time) {
      toast.error(
        "Please select Close Time"
      );

      return;
    }

    /* =====================================================
       EMAIL VALIDATION
    ===================================================== */

    if (!formData.email.trim()) {
      toast.error(
        "Please enter email"
      );

      return;
    }

    /* =====================================================
       PHONE VALIDATION
    ===================================================== */

    if (!formData.phone_number.trim()) {
      toast.error(
        "Please enter phone number"
      );

      return;
    }

    /* =====================================================
       FIREBASE USER
    ===================================================== */

    const currentUser =
      auth.currentUser;

    if (!currentUser) {
      toast.error(
        "Your session has expired. Please login again."
      );

      navigate(
        "/institute-login",
        {
          replace: true,
        }
      );

      return;
    }

    setLoading(true);

    try {
      /* ===================================================
         FIREBASE TOKEN
      =================================================== */

      const firebaseToken =
        await currentUser.getIdToken(
          true
        );

      if (!firebaseToken) {
        throw new Error(
          "Firebase authentication token missing"
        );
      }

      /* ===================================================
         FORM DATA
      =================================================== */

      const payload =
        new FormData();

      /* ===================================================
         INSTITUTE NAME
      =================================================== */

      payload.append(
        "name",
        formData.name.trim()
      );

      /* ===================================================
         EMAIL

         IMPORTANT:
         This is the CURRENT edited value.
      =================================================== */

      payload.append(
        "email",
        formData.email.trim()
      );

      /* ===================================================
         PHONE

         IMPORTANT:
         This is the CURRENT edited value.
      =================================================== */

      payload.append(
        "phone_number",
        formData.phone_number.trim()
      );

      /* ===================================================
         ADDRESS
      =================================================== */

      payload.append(
        "address",
        formData.address.trim()
      );

      /* ===================================================
         CITY
      =================================================== */

      payload.append(
        "city",
        formData.city.trim()
      );

      /* ===================================================
         STATE
      =================================================== */

      payload.append(
        "state",
        formData.state.trim()
      );

      /* ===================================================
         PINCODE
      =================================================== */

      payload.append(
        "pincode",
        formData.pincode.trim()
      );

      /* ===================================================
         OPEN TIME
      =================================================== */

      payload.append(
        "start_time",
        formData.start_time
      );

      /* ===================================================
         CLOSE TIME
      =================================================== */

      payload.append(
        "end_time",
        formData.end_time
      );

      /* ===================================================
         TIMEZONE
      =================================================== */

      payload.append(
        "timezone",
        formData.timezone
      );

      /* ===================================================
         CATEGORIES
      =================================================== */

      const categoryPayload =
        formData.selectedCategories.map(
          (categoryId) => ({
            category_id:
              Number(categoryId),
          })
        );

      payload.append(
        "categories",
        JSON.stringify(
          categoryPayload
        )
      );

      /* ===================================================
         DEBUG
      =================================================== */

      console.log(
        "================================="
      );

      console.log(
        "SUBMITTING INSTITUTE PROFILE"
      );

      console.log(
        "================================="
      );

      console.log(
        "Institute:",
        formData.name
      );

      console.log(
        "Email:",
        formData.email
      );

      console.log(
        "Phone:",
        formData.phone_number
      );

      console.log(
        "Address:",
        formData.address
      );

      console.log(
        "City:",
        formData.city
      );

      console.log(
        "State:",
        formData.state
      );

      console.log(
        "Pincode:",
        formData.pincode
      );

      console.log(
        "Open Time:",
        formData.start_time
      );

      console.log(
        "Close Time:",
        formData.end_time
      );

      console.log(
        "Timezone:",
        formData.timezone
      );

      console.log(
        "Categories:",
        categoryPayload
      );

      /* ===================================================
         API
      =================================================== */

      const response =
        await completeInstituteProfile(
          payload,
          firebaseToken
        );

      console.log(
        "CREATE PROFILE RESPONSE:",
        response
      );

      /* ===================================================
         PROFILE CREATED
      =================================================== */

      localStorage.setItem(
        "profileCreated",
        "true"
      );

      toast.success(
        "Profile submitted successfully"
      );

      navigate(
        "/institute/pending",
        {
          replace: true,
        }
      );
    } catch (error) {
      console.error(
        "CREATE PROFILE ERROR:",
        error
      );

      console.error(
        "BACKEND RESPONSE:",
        error?.response?.data
      );

      toast.error(
        error?.response?.data
          ?.message ||
          error?.message ||
          "Failed to submit profile"
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     STYLES
  ========================================================= */

  const inputClass = `
    w-full
    rounded-xl
    bg-[#242428]
    border
    border-white/10
    px-4
    py-3
    text-white
    placeholder-gray-500
    outline-none
    transition
    focus:border-purple-500
    focus:ring-1
    focus:ring-purple-500
  `;

  const labelClass =
    "block text-sm font-semibold text-white mb-2";

  /* =========================================================
     AUTH LOADING
  ========================================================= */

  if (authLoading) {
    return (
      <div
        className="
          min-h-screen
          bg-[#08080c]
          flex
          items-center
          justify-center
        "
      >
        <div className="text-center">
          <div
            className="
              w-10
              h-10
              rounded-full
              border-4
              border-purple-500/20
              border-t-purple-500
              animate-spin
              mx-auto
            "
          />

          <p
            className="
              text-gray-400
              mt-4
            "
          >
            Loading account...
          </p>
        </div>
      </div>
    );
  }

  /* =========================================================
     UI
  ========================================================= */

  return (
    <div
      className="
        min-h-screen
        bg-[#08080c]
        flex
        items-center
        justify-center
        px-4
        py-10
      "
    >
      <div
        className="
          w-full
          max-w-3xl
          bg-[#18181d]
          border
          border-[#33333a]
          rounded-3xl
          p-8
          shadow-2xl
        "
      >
        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className="
            flex
            flex-col
            items-center
            mb-8
          "
        >
          <h1
            className="
              text-4xl
              font-bold
              text-purple-400
              text-center
            "
          >
            Create Institute Profile
          </h1>

          <p
            className="
              text-gray-400
              mt-2
            "
          >
            Complete institute details
          </p>
        </div>

        {/* =================================================
            FORM
        ================================================= */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* =================================================
              INSTITUTE NAME
          ================================================= */}

          <div>
            <label
              className={labelClass}
            >
              Institute Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter institute name"
              required
              autoComplete="organization"
              className={inputClass}
            />
          </div>

          {/* =================================================
              EMAIL / PHONE
          ================================================= */}

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-4
            "
          >
            {/* =================================================
                EMAIL
            ================================================= */}

            <div>
              <label
                className={labelClass}
              >
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                required
                autoComplete="email"
                className={inputClass}
              />

              {formData.email && (
                <p
                  className="
                    text-[11px]
                    text-purple-400
                    mt-1.5
                  "
                >
                  ✓ Automatically fetched from your login account
                </p>
              )}
            </div>

            {/* =================================================
                PHONE
            ================================================= */}

            <div>
              <label
                className={labelClass}
              >
                Phone
              </label>

              <input
                type="tel"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                placeholder="Enter mobile number"
                required
                autoComplete="tel"
                inputMode="tel"
                className={inputClass}
              />

              {formData.phone_number && (
                <p
                  className="
                    text-[11px]
                    text-purple-400
                    mt-1.5
                  "
                >
                  ✓ Automatically fetched from your login account
                </p>
              )}
            </div>
          </div>

          {/* =================================================
              ADDRESS
          ================================================= */}

          <div>
            <label
              className={labelClass}
            >
              Address
            </label>

            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter institute address"
              required
              rows={3}
              className={`
                ${inputClass}
                resize-none
              `}
            />
          </div>

          {/* =================================================
              CITY / STATE / PINCODE
          ================================================= */}

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-3
              gap-4
            "
          >
            {/* CITY */}

            <div>
              <label
                className={labelClass}
              >
                City
              </label>

              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                required
                autoComplete="address-level2"
                className={inputClass}
              />
            </div>

            {/* STATE */}

            <div>
              <label
                className={labelClass}
              >
                State
              </label>

              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="State"
                required
                autoComplete="address-level1"
                className={inputClass}
              />
            </div>

            {/* PINCODE */}

            <div>
              <label
                className={labelClass}
              >
                Pincode
              </label>

              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="Pincode"
                required
                inputMode="numeric"
                autoComplete="postal-code"
                className={inputClass}
              />
            </div>
          </div>

          {/* =================================================
              OPEN / CLOSE / TIMEZONE
          ================================================= */}

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-3
              gap-4
            "
          >
            {/* OPEN TIME */}

            <div>
              <label
                className={labelClass}
              >
                Open Time
              </label>

              <TimePicker
                label="Open Time"
                value={formData.start_time}
                onChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    start_time: value,
                  }))
                }
              />
            </div>

            {/* CLOSE TIME */}

            <div>
              <label
                className={labelClass}
              >
                Close Time
              </label>

              <TimePicker
                label="Close Time"
                value={formData.end_time}
                onChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    end_time: value,
                  }))
                }
              />
            </div>

            {/* TIMEZONE */}

            <div>
              <label
                className={labelClass}
              >
                Timezone
              </label>

              <select
                name="timezone"
                value={formData.timezone}
                onChange={handleChange}
                className={`
                  ${inputClass}
                  cursor-pointer
                `}
                style={{
                  colorScheme: "dark",
                }}
              >
                <option value="Asia/Kolkata">
                  India (IST)
                </option>

                <option value="Asia/Dubai">
                  UAE
                </option>

                <option value="Asia/Riyadh">
                  Saudi Arabia
                </option>

                <option value="Asia/Singapore">
                  Singapore
                </option>

                <option value="Asia/Tokyo">
                  Japan
                </option>

                <option value="Europe/London">
                  United Kingdom
                </option>

                <option value="Europe/Paris">
                  France
                </option>

                <option value="Europe/Berlin">
                  Germany
                </option>

                <option value="America/New_York">
                  USA - New York
                </option>

                <option value="America/Los_Angeles">
                  USA - Los Angeles
                </option>

                <option value="Australia/Sydney">
                  Australia - Sydney
                </option>
              </select>
            </div>
          </div>

          {/* =================================================
              CATEGORIES
          ================================================= */}

          <div>
            <div
              className="
                flex
                items-center
                justify-between
                mb-3
              "
            >
              <label
                className="
                  text-sm
                  font-semibold
                  text-white
                "
              >
                Categories
              </label>

              {formData.selectedCategories.length >
                0 && (
                <span
                  className="
                    text-xs
                    font-semibold
                    text-purple-400
                  "
                >
                  {
                    formData
                      .selectedCategories
                      .length
                  }{" "}
                  selected
                </span>
              )}
            </div>

            {/* LOADING */}

            {categoriesLoading ? (
              <div
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-[#242428]
                  p-8
                  text-center
                  text-gray-400
                "
              >
                Loading categories...
              </div>
            ) : categories.length === 0 ? (
              /* NO CATEGORIES */

              <div
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-[#242428]
                  p-8
                  text-center
                "
              >
                <p
                  className="
                    text-red-400
                    text-sm
                  "
                >
                  No categories available.
                </p>

                <button
                  type="button"
                  onClick={fetchCategories}
                  className="
                    mt-3
                    text-purple-400
                    text-sm
                  "
                >
                  Try again
                </button>
              </div>
            ) : (
              /* CATEGORY CARDS */

              <div
                className="
                  grid
                  grid-cols-2
                  sm:grid-cols-3
                  md:grid-cols-4
                  gap-4
                "
              >
                {categories.map((category) => {
                  const categoryId =
                    Number(category.id);

                  const selected =
                    formData.selectedCategories.includes(
                      categoryId
                    );

                  const imageUrl =
                    getCategoryImage(
                      category
                    );

                  return (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() =>
                        toggleCategory(
                          categoryId
                        )
                      }
                      className={`
                        group
                        relative
                        overflow-hidden
                        rounded-2xl
                        border
                        text-left
                        transition-all
                        duration-200
                        ${
                          selected
                            ? "border-purple-500 ring-2 ring-purple-500/30 bg-purple-500/10"
                            : "border-white/10 bg-[#242428] hover:border-purple-500/50 hover:-translate-y-1"
                        }
                      `}
                    >
                      {/* IMAGE */}

                      <div
                        className="
                          relative
                          w-full
                          h-32
                          bg-[#303036]
                          overflow-hidden
                        "
                      >
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt={category.name}
                            className="
                              w-full
                              h-full
                              object-cover
                              transition
                              duration-300
                              group-hover:scale-105
                            "
                            onError={(e) => {
                              e.currentTarget.style.display =
                                "none";
                            }}
                          />
                        ) : (
                          <div
                            className="
                              w-full
                              h-full
                              flex
                              items-center
                              justify-center
                              text-4xl
                            "
                          >
                            🎨
                          </div>
                        )}

                        {/* IMAGE GRADIENT */}

                        <div
                          className="
                            absolute
                            inset-0
                            bg-gradient-to-t
                            from-black/70
                            via-transparent
                            to-transparent
                          "
                        />

                        {/* SELECT CHECK */}

                        <div
                          className={`
                            absolute
                            top-3
                            right-3
                            w-7
                            h-7
                            rounded-full
                            border
                            flex
                            items-center
                            justify-center
                            transition
                            ${
                              selected
                                ? "bg-purple-500 border-purple-400 text-white"
                                : "bg-black/40 border-white/40 text-transparent"
                            }
                          `}
                        >
                          ✓
                        </div>
                      </div>

                      {/* CATEGORY TEXT */}

                      <div
                        className="
                          px-4
                          py-3
                        "
                      >
                        <p
                          className={`
                            font-semibold
                            truncate
                            ${
                              selected
                                ? "text-purple-300"
                                : "text-white"
                            }
                          `}
                        >
                          {category.name}
                        </p>

                        <p
                          className="
                            text-[11px]
                            text-gray-500
                            mt-1
                          "
                        >
                          {selected
                            ? "Selected"
                            : "Click to select"}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            <p
              className="
                text-gray-500
                text-xs
                mt-3
              "
            >
              Select the categories offered by your institute.
            </p>
          </div>

          {/* =================================================
              SUBMIT
          ================================================= */}

          <div
            className="
              flex
              justify-end
              pt-5
            "
          >
            <button
              type="submit"
              disabled={
                loading ||
                categoriesLoading ||
                formData.selectedCategories.length ===
                  0
              }
              className="
                px-8
                py-3
                rounded-xl
                bg-gradient-to-r
                from-purple-500
                to-pink-500
                text-white
                font-bold
                transition
                hover:opacity-90
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              {loading
                ? "Submitting..."
                : "Send For Approval"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}