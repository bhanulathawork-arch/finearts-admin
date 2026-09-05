
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
//       <div className="text-white p-6">
//         Loading profile...
//       </div>
//     );
//   }

//   if (!profile) {
//     return (
//       <div className="text-white p-6">
//         Profile not found
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold gradient-text">
//           Trainer Profile
//         </h1>

//         <p className="text-white mt-1">
//           View trainer details
//         </p>
//       </div>

//       <div className="glass-effect rounded-3xl p-8">
//         <div className="flex flex-col md:flex-row gap-8">

//           <div>
//             <img
//               src={
//                 profile.profile_image ||
//                 "https://via.placeholder.com/200"
//               }
//               alt="Trainer"
//               className="w-40 h-40 rounded-3xl object-cover border border-gray-700"
//             />
//           </div>

//           <div className="flex-1">

//             <h2 className="text-3xl font-bold text-white">
//               {profile.full_name || "-"}
//             </h2>

//             <div className="mt-3">
//               <span
//                 className={`px-4 py-2 rounded-full text-sm font-semibold ${
//                   profile.approval_status === "APPROVED"
//                     ? "bg-green-500/20 text-green-400"
//                     : profile.approval_status === "REJECTED"
//                     ? "bg-red-500/20 text-red-400"
//                     : "bg-yellow-500/20 text-yellow-400"
//                 }`}
//               >
//                 {profile.approval_status}
//               </span>
//             </div>

//             <div className="grid md:grid-cols-2 gap-4 mt-8">

//               <div>
//                 <p className="text-white">Email</p>
//                 <p className="text-white">{profile.email || "-"}</p>
//               </div>

//               <div>
//                 <p className="text-white">Phone</p>
//                 <p className="text-white">
//                   {profile.phone_number || "-"}
//                 </p>
//               </div>

//               <div>
//                 <p className="text-white">City</p>
//                 <p className="text-white">
//                   {profile.city || "-"}
//                 </p>
//               </div>

//               <div>
//                 <p className="text-white">State</p>
//                 <p className="text-white">
//                   {profile.state || "-"}
//                 </p>
//               </div>

//               <div>
//                 <p className="text-white">Pincode</p>
//                 <p className="text-white">
//                   {profile.pincode || "-"}
//                 </p>
//               </div>

//               <div>
//                 <p className="text-white">Timing</p>
//                 <p className="text-white">
//                   {profile.timing || "-"}
//                 </p>
//               </div>

//             </div>
//           </div>
//         </div>

//         <div className="mt-8">
//           <h3 className="text-xl font-semibold text-white mb-3">
//             Address
//           </h3>

//           <p className="text-white">
//             {profile.address || "-"}
//           </p>
//         </div>

//         <div className="mt-8">
//           <h3 className="text-xl font-semibold text-white mb-3">
//             Description
//           </h3>

//           <p className="text-white">
//             {profile.bio || "-"}
//           </p>
//         </div>

//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getProfile } from "../services/trainerService";

export default function TrainerProfile() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

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

      if (res.data.success) {
        setProfile(res.data.data);
      } else {
        setProfile(null);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load profile");
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] p-6 text-white">
        <div className="max-w-6xl mx-auto animate-pulse">
          <div className="h-8 w-52 bg-white/10 rounded-lg mb-3" />
          <div className="h-4 w-72 bg-white/10 rounded-lg mb-8" />

          <div className="h-96 bg-white/5 border border-white/10 rounded-3xl" />
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-600/20 flex items-center justify-center mb-4">
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
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7-7h14a7 7 0 00-7 7z"
              />
            </svg>
          </div>

          <h2 className="text-xl font-semibold text-white">
            Profile not found
          </h2>

          <p className="text-white/40 mt-2">
            Unable to load trainer profile.
          </p>
        </div>
      </div>
    );
  }

  const isApproved = profile.approval_status === "APPROVED";
  const isRejected = profile.approval_status === "REJECTED";

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-purple-400 text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-purple-500" />
            TRAINER ACCOUNT
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold mt-2">
            Trainer Profile
          </h1>

          <p className="text-white/40 mt-2">
            View your trainer details
          </p>
        </div>

        {/* MAIN PROFILE */}
        <div className="glass-effect border border-white/10 rounded-3xl overflow-hidden">

          {/* TOP PURPLE STRIP */}
          <div className="h-2 bg-purple-600" />

          <div className="p-6 sm:p-8 lg:p-10">

            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10">

              {/* LEFT PROFILE */}
              <div className="flex flex-col items-center lg:items-start">

                <div className="relative">
                  <img
                    src={
                      profile.profile_image ||
                      "https://via.placeholder.com/200"
                    }
                    alt="Trainer"
                    className="w-48 h-48 rounded-3xl object-cover border border-white/10 shadow-2xl"
                  />

                  {/* STATUS DOT */}
                  <span
                    className={`absolute bottom-3 right-3 w-5 h-5 rounded-full border-4 border-[#0a0a0f] ${
                      isApproved
                        ? "bg-green-400"
                        : isRejected
                        ? "bg-red-400"
                        : "bg-yellow-400"
                    }`}
                  />
                </div>

                <h2 className="text-2xl font-bold mt-5 text-center lg:text-left">
                  {profile.full_name || "-"}
                </h2>

                <p className="text-white/40 text-sm mt-1">
                  Trainer
                </p>

                {/* STATUS */}
                <div
                  className={`mt-5 px-4 py-2 rounded-xl border text-sm font-semibold ${
                    isApproved
                      ? "bg-green-500/10 text-green-400 border-green-500/20"
                      : isRejected
                      ? "bg-red-500/10 text-red-400 border-red-500/20"
                      : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                  }`}
                >
                  {profile.approval_status || "PENDING"}
                </div>
              </div>

              {/* RIGHT DETAILS */}
              <div>

                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-purple-400 text-xs font-semibold uppercase tracking-widest">
                      Personal Details
                    </p>

                    <h3 className="text-xl font-semibold mt-1">
                      Contact Information
                    </h3>
                  </div>
                </div>

                <div className="divide-y divide-white/10 border-y border-white/10">

                  {/* EMAIL */}
                  <div className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-white/40 text-sm">
                      Email
                    </span>

                    <span className="text-white font-medium break-all sm:text-right">
                      {profile.email || "-"}
                    </span>
                  </div>

                  {/* PHONE */}
                  <div className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-white/40 text-sm">
                      Phone
                    </span>

                    <span className="text-white font-medium sm:text-right">
                      {profile.phone_number || "-"}
                    </span>
                  </div>

                  {/* TIMING */}
                  <div className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-white/40 text-sm">
                      Timing
                    </span>

                    <span className="text-white font-medium sm:text-right">
                      {profile.timing || "-"}
                    </span>
                  </div>

                </div>

                {/* LOCATION */}
                <div className="mt-8">

                  <p className="text-purple-400 text-xs font-semibold uppercase tracking-widest mb-4">
                    Location
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

                    <div className="bg-white/5 rounded-xl px-4 py-4 border border-white/10">
                      <p className="text-white/30 text-xs">
                        CITY
                      </p>

                      <p className="text-white mt-1">
                        {profile.city || "-"}
                      </p>
                    </div>

                    <div className="bg-white/5 rounded-xl px-4 py-4 border border-white/10">
                      <p className="text-white/30 text-xs">
                        STATE
                      </p>

                      <p className="text-white mt-1">
                        {profile.state || "-"}
                      </p>
                    </div>

                    <div className="bg-white/5 rounded-xl px-4 py-4 border border-white/10">
                      <p className="text-white/30 text-xs">
                        PINCODE
                      </p>

                      <p className="text-white mt-1">
                        {profile.pincode || "-"}
                      </p>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* LOWER INFORMATION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

          {/* ADDRESS */}
          <div className="glass-effect border border-white/10 rounded-3xl p-6 sm:p-8">

            <div className="flex items-center gap-3 mb-6">

              <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/20 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-purple-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 21s8-4.5 8-11a8 8 0 10-16 0c0 6.5 8 11 8 11z"
                  />
                  <circle
                    cx="12"
                    cy="10"
                    r="2.5"
                    strokeWidth={1.5}
                  />
                </svg>
              </div>

              <div>
                <p className="text-white/30 text-xs uppercase tracking-wider">
                  Location
                </p>

                <h3 className="text-lg font-semibold">
                  Address
                </h3>
              </div>

            </div>

            <p className="text-white/60 leading-7">
              {profile.address || "-"}
            </p>

          </div>

          {/* DESCRIPTION */}
          <div className="glass-effect border border-white/10 rounded-3xl p-6 sm:p-8">

            <div className="flex items-center gap-3 mb-6">

              <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/20 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-purple-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 6h16M4 12h16M4 18h10"
                  />
                </svg>
              </div>

              <div>
                <p className="text-white/30 text-xs uppercase tracking-wider">
                  About
                </p>

                <h3 className="text-lg font-semibold">
                  Description
                </h3>
              </div>

            </div>

            <p className="text-white/60 leading-7">
              {profile.bio || "-"}
            </p>

          </div>

        </div>

      </div>
    </div>
  );
}