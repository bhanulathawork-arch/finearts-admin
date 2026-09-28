

// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { getProfile } from "../services/trainerService";

// export default function TrainerProfile() {
//   const [loading, setLoading] = useState(true);
//   const [profile, setProfile] = useState(null);

//   useEffect(() => {
//     loadProfile();
//   }, []);

//   const loadProfile = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         toast.error("Please login again");
//         setLoading(false);
//         return;
//       }

//       const res = await getProfile(token);

//       console.log("PROFILE RESPONSE:", res.data);

//       if (res.data.success) {
//         setProfile(res.data.data);
//       } else {
//         setProfile(null);
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to load profile");
//       setProfile(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#0a0a0f] p-6 text-white">
//         <div className="max-w-6xl mx-auto animate-pulse">
//           <div className="h-8 w-52 bg-white/10 rounded-lg mb-3" />
//           <div className="h-4 w-72 bg-white/10 rounded-lg mb-8" />

//           <div className="h-96 bg-white/5 border border-white/10 rounded-3xl" />
//         </div>
//       </div>
//     );
//   }

//   if (!profile) {
//     return (
//       <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-6">
//         <div className="text-center">
//           <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-600/20 flex items-center justify-center mb-4">
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
//                 d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7-7h14a7 7 0 00-7 7z"
//               />
//             </svg>
//           </div>

//           <h2 className="text-xl font-semibold text-white">
//             Profile not found
//           </h2>

//           <p className="text-white/40 mt-2">
//             Unable to load trainer profile.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   const isApproved = profile.approval_status === "APPROVED";
//   const isRejected = profile.approval_status === "REJECTED";

//   return (
//     <div className="min-h-screen bg-[#0a0a0f] text-white p-4 sm:p-6 lg:p-8">
//       <div className="max-w-6xl mx-auto">

//         {/* HEADER */}
//         <div className="mb-8">
//           <div className="flex items-center gap-2 text-purple-400 text-sm font-medium">
//             <span className="w-2 h-2 rounded-full bg-purple-500" />
//             TRAINER ACCOUNT
//           </div>

//           <h1 className="text-3xl sm:text-4xl font-bold mt-2">
//             Trainer Profile
//           </h1>

//           <p className="text-white/40 mt-2">
//             View your trainer details
//           </p>
//         </div>

//         {/* MAIN PROFILE */}
//         <div className="glass-effect border border-white/10 rounded-3xl overflow-hidden">

//           {/* TOP PURPLE STRIP */}
//           <div className="h-2 bg-purple-600" />

//           <div className="p-6 sm:p-8 lg:p-10">

//             <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10">

//               {/* LEFT PROFILE */}
//               <div className="flex flex-col items-center lg:items-start">

//                 <div className="relative">
//                   <img
//                     src={
//                       profile.profile_image ||
//                       "https://via.placeholder.com/200"
//                     }
//                     alt="Trainer"
//                     className="w-48 h-48 rounded-3xl object-cover border border-white/10 shadow-2xl"
//                   />

//                   {/* STATUS DOT */}
//                   <span
//                     className={`absolute bottom-3 right-3 w-5 h-5 rounded-full border-4 border-[#0a0a0f] ${
//                       isApproved
//                         ? "bg-green-400"
//                         : isRejected
//                         ? "bg-red-400"
//                         : "bg-yellow-400"
//                     }`}
//                   />
//                 </div>

//                 <h2 className="text-2xl font-bold mt-5 text-center lg:text-left">
//                   {profile.full_name || "-"}
//                 </h2>

//                 <p className="text-white/40 text-sm mt-1">
//                   Trainer
//                 </p>

//                 {/* STATUS */}
//                 <div
//                   className={`mt-5 px-4 py-2 rounded-xl border text-sm font-semibold ${
//                     isApproved
//                       ? "bg-green-500/10 text-green-400 border-green-500/20"
//                       : isRejected
//                       ? "bg-red-500/10 text-red-400 border-red-500/20"
//                       : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
//                   }`}
//                 >
//                   {profile.approval_status || "PENDING"}
//                 </div>
//               </div>

//               {/* RIGHT DETAILS */}
//               <div>

//                 <div className="flex items-center justify-between mb-6">
//                   <div>
//                     <p className="text-purple-400 text-xs font-semibold uppercase tracking-widest">
//                       Personal Details
//                     </p>

//                     <h3 className="text-xl font-semibold mt-1">
//                       Contact Information
//                     </h3>
//                   </div>
//                 </div>

//                 <div className="divide-y divide-white/10 border-y border-white/10">

//                   {/* EMAIL */}
//                   <div className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
//                     <span className="text-white/40 text-sm">
//                       Email
//                     </span>

//                     <span className="text-white font-medium break-all sm:text-right">
//                       {profile.email || "-"}
//                     </span>
//                   </div>

//                   {/* PHONE */}
//                   <div className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
//                     <span className="text-white/40 text-sm">
//                       Phone
//                     </span>

//                     <span className="text-white font-medium sm:text-right">
//                       {profile.phone_number || "-"}
//                     </span>
//                   </div>

//                   {/* TIMING */}
//                   <div className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
//                     <span className="text-white/40 text-sm">
//                       Timing
//                     </span>

//                     <span className="text-white font-medium sm:text-right">
//                       {profile.timing || "-"}
//                     </span>
//                   </div>

//                 </div>

//                 {/* LOCATION */}
//                 <div className="mt-8">

//                   <p className="text-purple-400 text-xs font-semibold uppercase tracking-widest mb-4">
//                     Location
//                   </p>

//                   <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

//                     <div className="bg-white/5 rounded-xl px-4 py-4 border border-white/10">
//                       <p className="text-white/30 text-xs">
//                         CITY
//                       </p>

//                       <p className="text-white mt-1">
//                         {profile.city || "-"}
//                       </p>
//                     </div>

//                     <div className="bg-white/5 rounded-xl px-4 py-4 border border-white/10">
//                       <p className="text-white/30 text-xs">
//                         STATE
//                       </p>

//                       <p className="text-white mt-1">
//                         {profile.state || "-"}
//                       </p>
//                     </div>

//                     <div className="bg-white/5 rounded-xl px-4 py-4 border border-white/10">
//                       <p className="text-white/30 text-xs">
//                         PINCODE
//                       </p>

//                       <p className="text-white mt-1">
//                         {profile.pincode || "-"}
//                       </p>
//                     </div>

//                   </div>
//                 </div>

//               </div>
//             </div>
//           </div>
//         </div>

//         {/* LOWER INFORMATION */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

//           {/* ADDRESS */}
//           <div className="glass-effect border border-white/10 rounded-3xl p-6 sm:p-8">

//             <div className="flex items-center gap-3 mb-6">

//               <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/20 flex items-center justify-center">
//                 <svg
//                   className="w-5 h-5 text-purple-400"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={1.5}
//                     d="M12 21s8-4.5 8-11a8 8 0 10-16 0c0 6.5 8 11 8 11z"
//                   />
//                   <circle
//                     cx="12"
//                     cy="10"
//                     r="2.5"
//                     strokeWidth={1.5}
//                   />
//                 </svg>
//               </div>

//               <div>
//                 <p className="text-white/30 text-xs uppercase tracking-wider">
//                   Location
//                 </p>

//                 <h3 className="text-lg font-semibold">
//                   Address
//                 </h3>
//               </div>

//             </div>

//             <p className="text-white/60 leading-7">
//               {profile.address || "-"}
//             </p>

//           </div>

//           {/* DESCRIPTION */}
//           <div className="glass-effect border border-white/10 rounded-3xl p-6 sm:p-8">

//             <div className="flex items-center gap-3 mb-6">

//               <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/20 flex items-center justify-center">
//                 <svg
//                   className="w-5 h-5 text-purple-400"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={1.5}
//                     d="M4 6h16M4 12h16M4 18h10"
//                   />
//                 </svg>
//               </div>

//               <div>
//                 <p className="text-white/30 text-xs uppercase tracking-wider">
//                   About
//                 </p>

//                 <h3 className="text-lg font-semibold">
//                   Description
//                 </h3>
//               </div>

//             </div>

//             <p className="text-white/60 leading-7">
//               {profile.bio || "-"}
//             </p>

//           </div>

//         </div>

//       </div>
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { getProfile } from "../services/trainerService";

// export default function TrainerProfile() {
//   const [loading, setLoading] = useState(true);
//   const [profile, setProfile] = useState(null);

//   // =====================================================
//   // LOAD PROFILE
//   // =====================================================

//   useEffect(() => {
//     loadProfile();
//   }, []);

//   const loadProfile = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         toast.error("Please login again");
//         setLoading(false);
//         return;
//       }

//       const res = await getProfile(token);

//       console.log("PROFILE RESPONSE:", res.data);

//       if (res.data?.success) {
//         setProfile(res.data.data);
//       } else {
//         setProfile(null);
//       }
//     } catch (err) {
//       console.error("TRAINER PROFILE ERROR:", err);

//       toast.error(
//         err?.response?.data?.message ||
//           "Failed to load profile"
//       );

//       setProfile(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // =====================================================
//   // LOADING
//   // =====================================================

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#0a0a0f] p-6 text-white">
//         <div className="max-w-6xl mx-auto animate-pulse">

//           <div className="h-8 w-52 bg-white/10 rounded-lg mb-3" />

//           <div className="h-4 w-72 bg-white/10 rounded-lg mb-8" />

//           <div className="h-96 bg-white/5 border border-white/10 rounded-3xl" />

//         </div>
//       </div>
//     );
//   }

//   // =====================================================
//   // PROFILE NOT FOUND
//   // =====================================================

//   if (!profile) {
//     return (
//       <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-6">

//         <div className="text-center">

//           <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-600/20 flex items-center justify-center mb-4">

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
//                 d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7-7h14a7 7 0 00-7 7z"
//               />
//             </svg>

//           </div>

//           <h2 className="text-xl font-semibold text-white">
//             Profile not found
//           </h2>

//           <p className="text-white/40 mt-2">
//             Unable to load trainer profile.
//           </p>

//         </div>

//       </div>
//     );
//   }

//   // =====================================================
//   // TRAINER NAME
//   // =====================================================

//   const trainerName =
//     profile.full_name ||
//     profile.name ||
//     "-";

//   // =====================================================
//   // MAIN UI
//   // =====================================================

//   return (
//     <div className="min-h-screen bg-[#0a0a0f] text-white p-4 sm:p-6 lg:p-8">

//       <div className="max-w-6xl mx-auto">

//         {/* =================================================
//             HEADER
//         ================================================= */}

//         <div className="mb-8">

       

//           <h1 className="text-3xl sm:text-4xl font-bold mt-2">
//             Trainer Profile
//           </h1>

      
//         </div>

//         {/* =================================================
//             MAIN PROFILE
//         ================================================= */}

//         <div className="glass-effect border border-white/10 rounded-3xl overflow-hidden">

//           {/* TOP PURPLE STRIP */}

//           <div className="h-2 bg-purple-600" />

//           <div className="p-6 sm:p-8 lg:p-10">

//             <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10">

//               {/* =================================================
//                   LEFT PROFILE
//               ================================================= */}

//               <div className="flex flex-col items-center lg:items-start">

//                 {/* PROFILE IMAGE */}

//                 <div className="relative">

//                   <img
//                     src={
//                       profile.profile_image ||
//                       "https://via.placeholder.com/200"
//                     }
//                     alt={trainerName}
//                     className="w-48 h-48 rounded-3xl object-cover border border-white/10 shadow-2xl"
//                     onError={(event) => {
//                       event.currentTarget.src =
//                         "https://via.placeholder.com/200";
//                     }}
//                   />

//                 </div>

//                 {/* TRAINER NAME */}

//                 <h2 className="text-2xl font-bold mt-5 text-center lg:text-left">
//                   Trainer: {trainerName}
//                 </h2>

//               </div>

//               {/* =================================================
//                   RIGHT DETAILS
//               ================================================= */}

//               <div>

//                 <div className="flex items-center justify-between mb-6">

//                   <div>

//                     <p className="text-purple-400 text-xs font-semibold uppercase tracking-widest">
//                       Personal Details
//                     </p>

                 

//                   </div>

//                 </div>

//                 {/* CONTACT INFORMATION */}

//                 <div className="divide-y divide-white/10 border-y border-white/10">

//                   {/* EMAIL */}

//                   <div className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">

//                     <span className="text-white/40 text-sm">
//                       Email
//                     </span>

//                     <span className="text-white font-medium break-all sm:text-right">
//                       {profile.email || "-"}
//                     </span>

//                   </div>

//                   {/* PHONE */}

//                   <div className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">

//                     <span className="text-white/40 text-sm">
//                       Phone
//                     </span>

//                     <span className="text-white font-medium sm:text-right">
//                       {profile.phone_number || "-"}
//                     </span>

//                   </div>

//                 </div>

//                 {/* =================================================
//                     LOCATION
//                 ================================================= */}

//                 <div className="mt-8">

//                   <p className="text-purple-400 text-xs font-semibold uppercase tracking-widest mb-4">
//                     Location
//                   </p>

//                   <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

//                     {/* CITY */}

//                     <div className="bg-white/5 rounded-xl px-4 py-4 border border-white/10">

//                       <p className="text-white/30 text-xs">
//                         CITY
//                       </p>

//                       <p className="text-white mt-1">
//                         {profile.city || "-"}
//                       </p>

//                     </div>

//                     {/* STATE */}

//                     <div className="bg-white/5 rounded-xl px-4 py-4 border border-white/10">

//                       <p className="text-white/30 text-xs">
//                         STATE
//                       </p>

//                       <p className="text-white mt-1">
//                         {profile.state || "-"}
//                       </p>

//                     </div>

//                     {/* PINCODE */}

//                     <div className="bg-white/5 rounded-xl px-4 py-4 border border-white/10">

//                       <p className="text-white/30 text-xs">
//                         PINCODE
//                       </p>

//                       <p className="text-white mt-1">
//                         {profile.pincode || "-"}
//                       </p>

//                     </div>

//                   </div>

//                 </div>

//               </div>

//             </div>

//           </div>

//         </div>

//         {/* =================================================
//             LOWER INFORMATION
//         ================================================= */}

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

//           {/* =================================================
//               ADDRESS
//           ================================================= */}

//           <div className="glass-effect border border-white/10 rounded-3xl p-6 sm:p-8">

//             <div className="flex items-center gap-3 mb-6">

//               <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/20 flex items-center justify-center">

//                 <svg
//                   className="w-5 h-5 text-purple-400"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={1.5}
//                     d="M12 21s8-4.5 8-11a8 8 0 10-16 0c0 6.5 8 11 8 11z"
//                   />

//                   <circle
//                     cx="12"
//                     cy="10"
//                     r="2.5"
//                     strokeWidth={1.5}
//                   />

//                 </svg>

//               </div>

//               <div>

               

//                 <h3 className="text-lg font-semibold">
//                   Address
//                 </h3>

//               </div>

//             </div>

//             <p className="text-white/60 leading-7">
//               {profile.address || "-"}
//             </p>

//           </div>

//           {/* =================================================
//               DESCRIPTION
//           ================================================= */}

//           <div className="glass-effect border border-white/10 rounded-3xl p-6 sm:p-8">

//             <div className="flex items-center gap-3 mb-6">

//               <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/20 flex items-center justify-center">

//                 <svg
//                   className="w-5 h-5 text-purple-400"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={1.5}
//                     d="M4 6h16M4 12h16M4 18h10"
//                   />
//                 </svg>

//               </div>

//               <div>

//                 <p className="text-white/30 text-xs uppercase tracking-wider">
//                   About
//                 </p>

               

//               </div>

//             </div>

//             <p className="text-white/60 leading-7">
//               {profile.bio || "-"}
//             </p>

//           </div>

//         </div>

//       </div>

//     </div>
//   );
// }


import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getProfile,
  updateTrainerProfile,
} from "../services/trainerService";

export default function TrainerProfile() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  /* =========================================================
     LOAD PROFILE
  ========================================================= */

  const loadProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login again");
        setLoading(false);
        return;
      }

      const res = await getProfile(token);

      console.log("PROFILE RESPONSE:", res.data);

      if (res.data?.success) {
        const data = res.data.data;

        setProfile(data);

        setFormData({
          full_name: data?.full_name || "",
          email: data?.email || "",
          phone_number: data?.phone_number || "",
          city: data?.city || "",
          state: data?.state || "",
          pincode: data?.pincode || "",
          address: data?.address || "",
          bio: data?.bio || "",
          profile_image: null,
        });

        setImagePreview(data?.profile_image || "");
      } else {
        setProfile(null);
      }
    } catch (error) {
      console.error("PROFILE ERROR:", error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to load trainer profile"
      );

      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     EDIT
  ========================================================= */

  const handleEdit = () => {
    if (!profile) return;

    setFormData({
      full_name: profile?.full_name || "",
      email: profile?.email || "",
      phone_number: profile?.phone_number || "",
      city: profile?.city || "",
      state: profile?.state || "",
      pincode: profile?.pincode || "",
      address: profile?.address || "",
      bio: profile?.bio || "",
      profile_image: null,
    });

    setImagePreview(profile?.profile_image || "");
    setEditMode(true);
  };

  /* =========================================================
     CANCEL
  ========================================================= */

  const handleCancel = () => {
    if (!profile) return;

    setFormData({
      full_name: profile?.full_name || "",
      email: profile?.email || "",
      phone_number: profile?.phone_number || "",
      city: profile?.city || "",
      state: profile?.state || "",
      pincode: profile?.pincode || "",
      address: profile?.address || "",
      bio: profile?.bio || "",
      profile_image: null,
    });

    setImagePreview(profile?.profile_image || "");
    setEditMode(false);
  };

  /* =========================================================
     INPUT CHANGE
  ========================================================= */

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =========================================================
     IMAGE CHANGE
  ========================================================= */

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      profile_image: file,
    }));

    const preview = URL.createObjectURL(file);
    setImagePreview(preview);
  };

  /* =========================================================
     SAVE
  ========================================================= */

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login again");
        return;
      }

      setSaving(true);

      const data = new FormData();

      data.append("full_name", formData.full_name || "");
      data.append("email", formData.email || "");
      data.append("phone_number", formData.phone_number || "");
      data.append("city", formData.city || "");
      data.append("state", formData.state || "");
      data.append("pincode", formData.pincode || "");
      data.append("address", formData.address || "");
      data.append("bio", formData.bio || "");

      if (formData.profile_image) {
        data.append(
          "profile_image",
          formData.profile_image
        );
      }

      const res = await updateTrainerProfile(data, token);

      console.log("UPDATE PROFILE RESPONSE:", res.data);

      if (res.data?.success) {
        toast.success("Profile updated successfully");

        const updatedProfile =
          res.data.data || {
            ...profile,
            ...formData,
          };

        setProfile(updatedProfile);

        setFormData({
          full_name: updatedProfile?.full_name || "",
          email: updatedProfile?.email || "",
          phone_number:
            updatedProfile?.phone_number || "",
          city: updatedProfile?.city || "",
          state: updatedProfile?.state || "",
          pincode: updatedProfile?.pincode || "",
          address: updatedProfile?.address || "",
          bio: updatedProfile?.bio || "",
          profile_image: null,
        });

        setImagePreview(
          updatedProfile?.profile_image || ""
        );

        setEditMode(false);
      } else {
        toast.error(
          res.data?.message ||
            "Failed to update profile"
        );
      }
    } catch (error) {
      console.error("UPDATE PROFILE ERROR:", error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to update profile"
      );
    } finally {
      setSaving(false);
    }
  };

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070711] text-white p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">

            <div className="flex justify-between items-center">
              <div>
                <div className="h-10 w-64 bg-white/10 rounded-xl" />
                <div className="h-4 w-80 bg-white/5 rounded mt-3" />
              </div>

              <div className="h-14 w-40 bg-white/10 rounded-xl" />
            </div>

            <div className="h-[650px] bg-white/[0.03] border border-white/10 rounded-[30px]" />

          </div>
        </div>
      </div>
    );
  }

  /* =========================================================
     PROFILE NOT FOUND
  ========================================================= */

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#070711] flex items-center justify-center p-6">
        <div className="text-center">

          <div className="w-20 h-20 mx-auto rounded-3xl bg-purple-600/20 border border-purple-500/20 flex items-center justify-center mb-5">
            <svg
              className="w-10 h-10 text-purple-400"
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

          <h2 className="text-2xl font-bold text-white">
            Profile not found
          </h2>

          <p className="text-white mt-2">
            Unable to load trainer profile.
          </p>

        </div>
      </div>
    );
  }

  /* =========================================================
     REUSABLE FIELD
  ========================================================= */

  const displayValue = (value) => {
    return value || "-";
  };

  return (
    <div className="min-h-screen bg-[#070711] text-white p-4 sm:p-6 lg:p-8">

      <div className="max-w-7xl mx-auto">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-6">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-violet-800 flex items-center justify-center shadow-lg shadow-purple-600/20">

              <svg
                className="w-7 h-7 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M15.75 6.75a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a7.5 7.5 0 0115 0"
                />
              </svg>

            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Trainer Profile
              </h1>

              <p className="text-white text-sm sm:text-base mt-1">
                Your profile details and information
              </p>
            </div>

          </div>

          {/* =================================================
              HEADER BUTTONS
          ================================================= */}

          {!editMode ? (
            <button
              type="button"
              onClick={handleEdit}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-semibold shadow-lg shadow-purple-600/20 transition-all duration-200"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M16.862 3.487a2.1 2.1 0 013.65 2.1L8.2 17.9l-4.7 1.05 1.05-4.7L16.862 3.487z"
                />
              </svg>

              Edit Profile
            </button>
          ) : (
            <div className="flex items-center gap-3">

              <button
                type="button"
                onClick={handleCancel}
                disabled={saving}
                className="px-5 py-3 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] text-white font-semibold transition disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-semibold shadow-lg shadow-purple-600/20 transition disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <svg
                      className="w-5 h-5 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>

                    Saving...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>

                    Save Changes
                  </>
                )}
              </button>

            </div>
          )}

        </div>

        {/* =====================================================
            MAIN CARD
        ===================================================== */}

        <div className="relative overflow-hidden rounded-[28px] border border-purple-500/50 bg-gradient-to-br from-[#111127] via-[#0d0d1b] to-[#080811] shadow-2xl shadow-purple-950/30">

          {/* TOP GLOW */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-fuchsia-500 to-purple-600" />

          <div className="p-5 sm:p-6 lg:p-7">

            {/* =================================================
                FIRST ROW
                IMAGE + PERSONAL INFORMATION
            ================================================= */}

            <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">

              {/* =================================================
                  TRAINER IMAGE
              ================================================= */}

              <div className="flex flex-col items-center justify-start">

                <div className="relative group">

                  <div className="absolute -inset-1 rounded-[25px] bg-gradient-to-br from-purple-500 to-fuchsia-500 opacity-70 blur-sm" />

                  <div className="relative w-[230px] h-[260px] sm:w-[250px] sm:h-[280px] rounded-[22px] overflow-hidden border-2 border-purple-400/80 bg-[#121222]">

                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Trainer"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">

                        <svg
                          className="w-20 h-20 text-purple-400/50"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.3}
                            d="M15.75 6.75a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a7.5 7.5 0 0115 0"
                          />
                        </svg>

                      </div>
                    )}

                    {/* IMAGE EDIT BUTTON */}

                    {editMode && (
                      <label className="absolute bottom-3 right-3 w-11 h-11 rounded-full bg-purple-600 hover:bg-purple-500 flex items-center justify-center cursor-pointer shadow-lg shadow-purple-900/50 transition">

                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.8}
                            d="M3 7h3l2-3h8l2 3h3v12H3V7z"
                          />

                          <circle
                            cx="12"
                            cy="13"
                            r="3"
                            stroke="currentColor"
                            strokeWidth="1.8"
                          />
                        </svg>

                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />

                      </label>
                    )}

                  </div>

                </div>

                {/* TRAINER NAME */}

                {!editMode ? (
                  <h2 className="text-2xl sm:text-3xl font-bold mt-4 text-center break-words">
                    {displayValue(profile.full_name)}
                  </h2>
                ) : (
                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    placeholder="Trainer Name"
                    className="mt-4 w-full max-w-[280px] px-4 py-3 rounded-xl bg-white/[0.05] border border-purple-500/30 text-white text-center font-semibold outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10"
                  />
                )}

                <div className="mt-2 px-4 py-1.5 rounded-full bg-purple-600/20 border border-purple-500/20 text-purple-300 text-sm">
                  Trainer
                </div>

              </div>

              {/* =================================================
                  PERSONAL INFORMATION
              ================================================= */}

              <div className="rounded-[22px] border border-white/10 bg-white/[0.025] p-5 sm:p-6">

                {/* SECTION TITLE */}

                <div className="flex items-center gap-3 mb-5">

                  <div className="w-11 h-11 rounded-xl bg-purple-600/20 border border-purple-500/20 flex items-center justify-center">

                    <svg
                      className="w-5 h-5 text-purple-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.7}
                        d="M15.75 6.75a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a7.5 7.5 0 0115 0"
                      />
                    </svg>

                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold">
                      Personal Information
                    </h3>

                    <div className="w-14 h-1 rounded-full bg-purple-500 mt-2" />
                  </div>

                </div>

                <div className="space-y-3">

                  {/* TRAINER NAME */}

                  <div className="flex items-center min-h-[58px] rounded-xl border border-white/10 bg-[#101021] overflow-hidden">

                    <div className="w-12 sm:w-14 h-full min-h-[58px] flex items-center justify-center bg-purple-600/10 border-r border-white/10">

                      <svg
                        className="w-5 h-5 text-purple-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.7}
                          d="M15.75 6.75a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a7.5 7.5 0 0115 0"
                        />
                      </svg>

                    </div>

                    <div className="px-4 py-3 flex-1">

                      <span className="text-white text-sm">
                        Trainer Name
                      </span>

                      {!editMode ? (
                        <p className="text-white font-medium mt-0.5 break-words">
                          {displayValue(profile.full_name)}
                        </p>
                      ) : (
                        <input
                          type="text"
                          name="full_name"
                          value={formData.full_name}
                          onChange={handleChange}
                          className="w-full mt-1 bg-transparent text-white outline-none"
                        />
                      )}

                    </div>

                  </div>

                  {/* EMAIL */}

                  <div className="flex items-center min-h-[58px] rounded-xl border border-white/10 bg-[#101021] overflow-hidden">

                    <div className="w-12 sm:w-14 min-h-[58px] flex items-center justify-center bg-purple-600/10 border-r border-white/10">

                      <svg
                        className="w-5 h-5 text-purple-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.7}
                          d="M3 7.5L12 13l9-5.5M4.5 5.25h15A1.5 1.5 0 0121 6.75v10.5a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 17.25V6.75a1.5 1.5 0 011.5-1.5z"
                        />
                      </svg>

                    </div>

                    <div className="px-4 py-3 flex-1">

                      <span className="text-white text-sm">
                        Email
                      </span>

                      {!editMode ? (
                        <p className="text-white font-medium mt-0.5 break-all">
                          {displayValue(profile.email)}
                        </p>
                      ) : (
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full mt-1 bg-transparent text-white outline-none"
                        />
                      )}

                    </div>

                  </div>

                  {/* PHONE */}

                  <div className="flex items-center min-h-[58px] rounded-xl border border-white/10 bg-[#101021] overflow-hidden">

                    <div className="w-12 sm:w-14 min-h-[58px] flex items-center justify-center bg-purple-600/10 border-r border-white/10">

                      <svg
                        className="w-5 h-5 text-purple-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.7}
                          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.09l-4.423-1.106a1.125 1.125 0 00-1.173.417l-.97 1.293a1.125 1.125 0 01-1.21.38 12.035 12.035 0 01-7.243-7.243 1.125 1.125 0 01.38-1.21l1.293-.97c.363-.272.52-.739.417-1.173L6.864 3.852A1.125 1.125 0 005.774 3H4.5A2.25 2.25 0 002.25 5.25v1.5z"
                        />
                      </svg>

                    </div>

                    <div className="px-4 py-3 flex-1">

                      <span className="text-white text-sm">
                        Phone
                      </span>

                      {!editMode ? (
                        <p className="text-white font-medium mt-0.5">
                          {displayValue(
                            profile.phone_number
                          )}
                        </p>
                      ) : (
                        <input
                          type="text"
                          name="phone_number"
                          value={formData.phone_number}
                          onChange={handleChange}
                          className="w-full mt-1 bg-transparent text-white outline-none"
                        />
                      )}

                    </div>

                  </div>

                </div>

              </div>

            </div>

            {/* =================================================
                SECOND ROW
                LOCATION + ABOUT
            ================================================= */}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

              {/* =================================================
                  LOCATION DETAILS
              ================================================= */}

              <div className="rounded-[22px] border border-white/10 bg-white/[0.025] p-5 sm:p-6">

                <div className="flex items-center gap-3 mb-5">

                  <div className="w-11 h-11 rounded-xl bg-purple-600/20 border border-purple-500/20 flex items-center justify-center">

                    <svg
                      className="w-5 h-5 text-purple-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.7}
                        d="M12 21s7-5.686 7-12a7 7 0 10-14 0c0 6.314 7 12 7 12z"
                      />

                      <circle
                        cx="12"
                        cy="9"
                        r="2.2"
                        stroke="currentColor"
                        strokeWidth="1.7"
                      />
                    </svg>

                  </div>

                  <div>

                    <h3 className="text-xl sm:text-2xl font-bold">
                      Location Details
                    </h3>

                    <div className="w-14 h-1 rounded-full bg-purple-500 mt-2" />

                  </div>

                </div>

                {/* 2 ROW × 2 COLUMN */}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                  {/* CITY */}

                  <LocationField
                    label="City"
                    value={formData.city}
                    editMode={editMode}
                    name="city"
                    onChange={handleChange}
                    icon={
                      <svg
                        className="w-5 h-5 text-purple-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.7}
                          d="M3 21h18M5 21V6.5L12 3l7 3.5V21M8 21v-4h3v4m2 0v-4h3v4M8 9h1m6 0h1M8 12h1m6 0h1"
                        />
                      </svg>
                    }
                  />

                  {/* STATE */}

                  <LocationField
                    label="State"
                    value={formData.state}
                    editMode={editMode}
                    name="state"
                    onChange={handleChange}
                    icon={
                      <svg
                        className="w-5 h-5 text-purple-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.7}
                          d="M12 3l7 4v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V7l7-4z"
                        />
                      </svg>
                    }
                  />

                  {/* PINCODE */}

                  <LocationField
                    label="Pincode"
                    value={formData.pincode}
                    editMode={editMode}
                    name="pincode"
                    onChange={handleChange}
                    icon={
                      <svg
                        className="w-5 h-5 text-purple-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <rect
                          x="4"
                          y="4"
                          width="16"
                          height="16"
                          rx="2"
                          stroke="currentColor"
                          strokeWidth="1.7"
                        />

                        <path
                          d="M8 8h2M14 8h2M8 12h2M14 12h2M8 16h2M14 16h2"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                        />
                      </svg>
                    }
                  />

                  {/* ADDRESS */}

                  <LocationField
                    label="Address"
                    value={formData.address}
                    editMode={editMode}
                    name="address"
                    onChange={handleChange}
                    fullHeight
                    icon={
                      <svg
                        className="w-5 h-5 text-purple-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.7}
                          d="M3 10.5L12 3l9 7.5M5.25 9.5V21h13.5V9.5M9 21v-6h6v6"
                        />
                      </svg>
                    }
                  />

                </div>

              </div>

              {/* =================================================
                  ABOUT TRAINER
              ================================================= */}

              <div className="rounded-[22px] border border-white/10 bg-white/[0.025] p-5 sm:p-6">

                <div className="flex items-center gap-3 mb-5">

                  <div className="w-11 h-11 rounded-xl bg-purple-600/20 border border-purple-500/20 flex items-center justify-center">

                    <svg
                      className="w-5 h-5 text-purple-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.7}
                        d="M6 3h9l3 3v15H6V3z"
                      />

                      <path
                        d="M9 10h6M9 14h6M9 18h4"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                      />
                    </svg>

                  </div>

                  <div>

                    <h3 className="text-xl sm:text-2xl font-bold">
                      About Trainer
                    </h3>

                    <div className="w-14 h-1 rounded-full bg-purple-500 mt-2" />

                  </div>

                </div>

                {!editMode ? (
                  <div className="min-h-[190px] rounded-xl border border-white/10 bg-[#101021] p-5">

                    <p className="text-white leading-7 whitespace-pre-wrap break-words">
                      {displayValue(profile.bio)}
                    </p>

                  </div>
                ) : (
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={7}
                    placeholder="Write something about yourself..."
                    className="w-full min-h-[190px] resize-none rounded-xl border border-purple-500/30 bg-[#101021] p-5 text-white placeholder:text-white/25 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10 leading-7"
                  />
                )}

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

/* =============================================================
   LOCATION FIELD COMPONENT
============================================================= */

function LocationField({
  label,
  value,
  editMode,
  name,
  onChange,
  icon,
}) {
  return (
    <div className="min-h-[70px] rounded-xl border border-white/10 bg-[#101021] overflow-hidden flex">

      <div className="w-12 shrink-0 flex items-center justify-center bg-purple-600/10 border-r border-white/10">
        {icon}
      </div>

      <div className="px-3 py-3 flex-1 min-w-0">

        <span className="text-white text-xs sm:text-sm block">
          {label}
        </span>

        {!editMode ? (
          <p className="text-white font-medium mt-1 break-words">
            {value || "-"}
          </p>
        ) : (
          <input
            type="text"
            name={name}
            value={value || ""}
            onChange={onChange}
            placeholder={`Enter ${label.toLowerCase()}`}
            className="w-full mt-1 bg-transparent text-white text-sm outline-none placeholder:text-white"
          />
        )}

      </div>

    </div>
  );
}