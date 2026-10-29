

// import { useEffect, useState } from "react";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "../config/firebase";
// import toast from "react-hot-toast";
// import {
//   getProfile,
//   updateInstituteProfile,
// } from "../services/instituteService";

// import {
//   Building2,
//   Mail,
//   Phone,
//   MapPin,
//   Clock3,
//   Globe2,
//   FileText,
//   Pencil,
//   Save,
//   X,
//   Upload,
//   ShieldCheck,
//   MapPinned,
//   Image as ImageIcon,
// } from "lucide-react";


// /* =========================================================
//    GET CURRENT INSTITUTE USER'S FIREBASE ID TOKEN
//    Wait for Firebase to restore the login session if needed.
// ========================================================= */

// const getInstituteFirebaseToken = async () => {
//   let user = auth.currentUser;

//   if (!user) {
//     user = await new Promise((resolve) => {
//       const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//         unsubscribe();
//         resolve(currentUser);
//       });
//     });
//   }

//   if (!user) {
//     throw new Error("Institute session expired. Please login again.");
//   }

//   return user.getIdToken(true);
// };

// /* =========================================================
//    TIME FORMATTER
//    Backend:
//    12:08:00
//    16:08:00

//    UI:
//    12:08 PM
//    4:08 PM
// ========================================================= */

// const formatTime = (time) => {
//   if (!time) return "-";

//   try {
//     const value = String(time).trim();

//     if (!value) return "-";

//     // Already formatted
//     if (
//       value.toUpperCase().includes("AM") ||
//       value.toUpperCase().includes("PM")
//     ) {
//       return value;
//     }

//     const parts = value.split(":");

//     if (parts.length < 2) {
//       return value;
//     }

//     const hours = Number(parts[0]);
//     const minutes = Number(parts[1]);

//     if (
//       Number.isNaN(hours) ||
//       Number.isNaN(minutes)
//     ) {
//       return value;
//     }

//     const period = hours >= 12 ? "PM" : "AM";
//     const hour12 = hours % 12 || 12;

//     return `${hour12}:${String(minutes).padStart(
//       2,
//       "0"
//     )} ${period}`;
//   } catch (error) {
//     console.error("TIME FORMAT ERROR:", error);
//     return String(time);
//   }
// };

// /* =========================================================
//    CONVERT BACKEND TIME TO HTML TIME INPUT

//    Backend:
//    12:08:00

//    Input:
//    12:08
// ========================================================= */

// const normalizeTimeForInput = (time) => {
//   if (!time) return "";

//   const value = String(time).trim();

//   if (!value) return "";

//   // If backend returns 12:08:00
//   const parts = value.split(":");

//   if (parts.length >= 2) {
//     return `${parts[0].padStart(2, "0")}:${parts[1].padStart(
//       2,
//       "0"
//     )}`;
//   }

//   return value;
// };

// /* =========================================================
//    IMAGE URL HELPER
// ========================================================= */

// const getImageUrl = (img) => {
//   if (!img) return "";

//   const value = String(img).trim();

//   if (!value) return "";

//   // S3 / external URL
//   if (
//     value.startsWith("http://") ||
//     value.startsWith("https://")
//   ) {
//     return value;
//   }

//   // Backend relative path
//   return `https://finearts-backend.onrender.com${value.startsWith("/") ? "" : "/"}${value}`;
// };

// /* =========================================================
//    MAIN COMPONENT
// ========================================================= */

// export default function InstituteProfile() {
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [editing, setEditing] = useState(false);

//   const [profile, setProfile] = useState(null);

//   const [image, setImage] = useState(null);
//   const [logo, setLogo] = useState(null);

//   /* =========================================================
//      FORM DATA

//      IMPORTANT:
//      UI names:
//      open_time
//      close_time

//      Backend names:
//      start_time
//      end_time
//   ========================================================= */

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone_number: "",
//     address: "",
//     city: "",
//     state: "",
//     pincode: "",
//     open_time: "",
//     close_time: "",
//     timezone: "",
//     description: "",
//   });

//   /* =========================================================
//      LOAD PROFILE
//   ========================================================= */

//   useEffect(() => {
//     loadProfile();
//   }, []);

//   const loadProfile = async () => {
//     try {
//       setLoading(true);

//       const token = await getInstituteFirebaseToken();
//       const response = await getProfile(token);

//       /*
//         Depending on your service response,
//         profile can be:

//         response.data

//         OR

//         response
//       */
//       const data = response?.data || response;

//       console.log(
//         "=============================="
//       );

//       console.log(
//         "INSTITUTE PROFILE FROM API:",
//         data
//       );

//       console.log(
//         "LOGO:",
//         data?.logo
//       );

//       console.log(
//         "START TIME:",
//         data?.start_time
//       );

//       console.log(
//         "END TIME:",
//         data?.end_time
//       );

//       console.log(
//         "ADDRESS:",
//         data?.address
//       );

//       console.log(
//         "=============================="
//       );

//       setProfile(data);

//       /* =====================================================
//          IMPORTANT FIELD MAPPING

//          API:
//          start_time -> UI open_time
//          end_time   -> UI close_time
//          logo       -> profile.logo
//       ===================================================== */

//       setFormData({
//         name: data?.name || "",
//         email: data?.email || "",
//         phone_number: data?.phone_number || "",
//         address: data?.address || "",
//         city: data?.city || "",
//         state: data?.state || "",
//         pincode: data?.pincode || "",

//         // BACKEND start_time -> OPEN TIME UI
//         open_time: normalizeTimeForInput(
//           data?.start_time
//         ),

//         // BACKEND end_time -> CLOSE TIME UI
//         close_time: normalizeTimeForInput(
//           data?.end_time
//         ),

//         timezone: data?.timezone || "",
//         description: data?.description || "",
//       });
//     } catch (error) {
//       console.error(
//         "LOAD PROFILE ERROR:",
//         error
//       );

//       console.error(
//         "BACKEND RESPONSE:",
//         error?.response?.data
//       );

//       toast.error(
//         error?.response?.data?.message ||
//           "Failed to load profile"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

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
//      START EDIT
//   ========================================================= */

//   const handleEdit = () => {
//     /*
//       Refresh form values from actual API profile
//       before opening edit mode.
//     */

//     if (profile) {
//       setFormData({
//         name: profile?.name || "",
//         email: profile?.email || "",
//         phone_number:
//           profile?.phone_number || "",
//         address: profile?.address || "",
//         city: profile?.city || "",
//         state: profile?.state || "",
//         pincode: profile?.pincode || "",

//         open_time: normalizeTimeForInput(
//           profile?.start_time
//         ),

//         close_time: normalizeTimeForInput(
//           profile?.end_time
//         ),

//         timezone: profile?.timezone || "",
//         description:
//           profile?.description || "",
//       });
//     }

//     setImage(null);
//     setLogo(null);
//     setEditing(true);
//   };

//   /* =========================================================
//      CANCEL EDIT
//   ========================================================= */

//   const handleCancel = () => {
//     if (!profile) return;

//     setFormData({
//       name: profile?.name || "",
//       email: profile?.email || "",
//       phone_number:
//         profile?.phone_number || "",
//       address: profile?.address || "",
//       city: profile?.city || "",
//       state: profile?.state || "",
//       pincode: profile?.pincode || "",

//       // API -> UI
//       open_time: normalizeTimeForInput(
//         profile?.start_time
//       ),

//       // API -> UI
//       close_time: normalizeTimeForInput(
//         profile?.end_time
//       ),

//       timezone: profile?.timezone || "",
//       description:
//         profile?.description || "",
//     });

//     setImage(null);
//     setLogo(null);
//     setEditing(false);
//   };

//   /* =========================================================
//      SAVE PROFILE
//   ========================================================= */

//   const handleSave = async () => {
//     try {
//       setSaving(true);

//       // Institute Panel must use the signed-in institute user's
//       // Firebase ID token, not an admin/application JWT.
//       const token = await getInstituteFirebaseToken();

//       /* =====================================================
//          VALIDATION
//       ===================================================== */

//       if (!formData.name.trim()) {
//         toast.error(
//           "Institute name is required"
//         );
//         return;
//       }

//       if (!formData.email.trim()) {
//         toast.error("Email is required");
//         return;
//       }

//       if (!formData.phone_number.trim()) {
//         toast.error("Phone number is required");
//         return;
//       }

//       /* =====================================================
//          FORM DATA
//       ===================================================== */

//       const data = new FormData();

//       data.append(
//         "name",
//         formData.name.trim()
//       );

//       data.append(
//         "email",
//         formData.email.trim()
//       );

//       data.append(
//         "phone_number",
//         formData.phone_number.trim()
//       );

//       data.append(
//         "address",
//         formData.address.trim()
//       );

//       data.append(
//         "city",
//         formData.city.trim()
//       );

//       data.append(
//         "state",
//         formData.state.trim()
//       );

//       data.append(
//         "pincode",
//         formData.pincode.trim()
//       );

//       /* =====================================================
//          IMPORTANT BACKEND FIELD MAPPING

//          UI:
//          open_time

//          BACKEND:
//          start_time
//       ===================================================== */

//       data.append(
//         "start_time",
//         formData.open_time || ""
//       );

//       /* =====================================================
//          UI:
//          close_time

//          BACKEND:
//          end_time
//       ===================================================== */

//       data.append(
//         "end_time",
//         formData.close_time || ""
//       );

//       data.append(
//         "timezone",
//         formData.timezone || ""
//       );

//       data.append(
//         "description",
//         formData.description || ""
//       );

//       /* =====================================================
//          IMAGE
//       ===================================================== */

//       if (image) {
//         data.append("image", image);
//       }

//       /* =====================================================
//          LOGO
//       ===================================================== */

//       if (logo) {
//         data.append("logo", logo);
//       }

//       console.log(
//         "=============================="
//       );

//       console.log(
//         "UPDATING INSTITUTE PROFILE"
//       );

//       console.log(
//         "open_time UI:",
//         formData.open_time
//       );

//       console.log(
//         "close_time UI:",
//         formData.close_time
//       );

//       console.log(
//         "Sending start_time:",
//         formData.open_time
//       );

//       console.log(
//         "Sending end_time:",
//         formData.close_time
//       );

//       console.log(
//         "address:",
//         formData.address
//       );

//       console.log(
//         "logo:",
//         logo
//       );

//       console.log(
//         "image:",
//         image
//       );

//       console.log(
//         "=============================="
//       );

//       /* =====================================================
//          API
//       ===================================================== */

//       const response =
//         await updateInstituteProfile(
//           data,
//           token
//         );

//       console.log(
//         "UPDATE PROFILE RESPONSE:",
//         response
//       );

//       toast.success(
//         "Profile updated successfully"
//       );

//       setEditing(false);
//       setImage(null);
//       setLogo(null);

//       /* =====================================================
//          RELOAD PROFILE
//       ===================================================== */

//       await loadProfile();
//     } catch (error) {
//       console.error(
//         "UPDATE PROFILE ERROR:",
//         error
//       );

//       console.error(
//         "BACKEND RESPONSE:",
//         error?.response?.data
//       );

//       toast.error(
//         error?.response?.data?.message ||
//           error?.message ||
//           "Failed to update profile"
//       );
//     } finally {
//       setSaving(false);
//     }
//   };

//   /* =========================================================
//      LOADING UI
//   ========================================================= */

//   if (loading) {
//     return (
//       <div className="
//         min-h-[70vh]
//         flex
//         items-center
//         justify-center
//         bg-[#08080c]
//       ">
//         <div className="
//           flex
//           flex-col
//           items-center
//           gap-4
//         ">
//           <div className="
//             w-12
//             h-12
//             rounded-full
//             border-4
//             border-purple-500/20
//             border-t-purple-500
//             animate-spin
//           " />

//           <p className="
//             text-gray-400
//             text-sm
//           ">
//             Loading institute profile...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   /* =========================================================
//      PROFILE NOT FOUND
//   ========================================================= */

//   if (!profile) {
//     return (
//       <div className="w-full min-w-0">
//         <div className="
//           rounded-2xl
//           border
//           border-red-500/20
//           bg-red-500/5
//           p-6
//         ">
//           <p className="text-red-400">
//             Profile not found
//           </p>
//         </div>
//       </div>
//     );
//   }

//   const isApproved =
//     profile.approval_status === "APPROVED";

//   /* =========================================================
//      MAIN UI
//   ========================================================= */

//   return (
//     <div className="
//       min-h-full
//       w-full
//       min-w-0
//       bg-[#08080c]
//       text-white
//     ">

//       {/* =====================================================
//           PAGE HEADER
//       ===================================================== */}

//       <div className="
//         flex
//         flex-col
//         md:flex-row
//         md:items-center
//         md:justify-between
//         gap-5
//         mb-8
//       ">

//         <div>

//           <div className="
//             flex
//             items-center
//             gap-3
//             mb-2
//           ">

//             <div className="
//               w-10
//               h-10
//               rounded-xl
//               bg-gradient-to-br
//               from-purple-500
//               to-pink-500
//               flex
//               items-center
//               justify-center
//               shadow-lg
//               shadow-purple-500/20
//             ">
//               <Building2 size={20} />
//             </div>

//             <h1 className="
//               text-3xl
//               md:text-4xl
//               font-extrabold
//               tracking-tight
//               bg-gradient-to-r
//               from-purple-400
//               via-fuchsia-400
//               to-pink-500
//               bg-clip-text
//               text-transparent
//             ">
//               Institute Profile
//             </h1>

//           </div>

//           <p className="
//             text-gray-500
//             text-sm
//             ml-0
//             md:ml-[52px]
//           ">
//             Manage your institute information
//             and profile details
//           </p>

//         </div>

//         {/* ===================================================
//             ACTION BUTTONS
//         =================================================== */}

//         {!editing ? (

//           <button
//             type="button"
//             onClick={handleEdit}
//             className="
//               group
//               flex
//               items-center
//               justify-center
//               gap-2
//               px-6
//               py-3
//               rounded-xl
//               bg-gradient-to-r
//               from-purple-500
//               to-pink-500
//               text-white
//               font-semibold
//               shadow-lg
//               shadow-purple-500/20
//               hover:shadow-purple-500/30
//               hover:scale-[1.02]
//               transition-all
//             "
//           >
//             <Pencil
//               size={17}
//               className="
//                 group-hover:rotate-[-8deg]
//                 transition
//               "
//             />

//             Edit Profile
//           </button>

//         ) : (

//           <div className="
//             flex
//             flex-wrap
//             items-center
//             gap-3
//           ">

//             <button
//               type="button"
//               onClick={handleCancel}
//               disabled={saving}
//               className="
//                 flex
//                 items-center
//                 gap-2
//                 px-5
//                 py-3
//                 rounded-xl
//                 bg-[#17171c]
//                 border
//                 border-white/10
//                 text-gray-300
//                 hover:bg-[#202026]
//                 transition
//                 disabled:opacity-50
//               "
//             >
//               <X size={17} />
//               Cancel
//             </button>

//             <button
//               type="button"
//               onClick={handleSave}
//               disabled={saving}
//               className="
//                 flex
//                 items-center
//                 gap-2
//                 px-5
//                 py-3
//                 rounded-xl
//                 bg-gradient-to-r
//                 from-purple-500
//                 to-pink-500
//                 text-white
//                 font-semibold
//                 shadow-lg
//                 shadow-purple-500/20
//                 disabled:opacity-50
//               "
//             >
//               <Save size={17} />

//               {saving
//                 ? "Saving..."
//                 : "Save Changes"}
//             </button>

//           </div>

//         )}

//       </div>

//       {/* =====================================================
//           HERO CARD
//       ===================================================== */}

//       <div className="
//         relative
//         overflow-hidden
//         rounded-[28px]
//         border
//         border-white/[0.08]
//         bg-[#141419]
//         shadow-2xl
//       ">

//         {/* DECORATIVE GLOW */}

//         <div className="
//           absolute
//           -top-32
//           -right-32
//           w-96
//           h-96
//           rounded-full
//           bg-purple-600/10
//           blur-3xl
//           pointer-events-none
//         " />

//         <div className="
//           absolute
//           -bottom-40
//           left-1/3
//           w-96
//           h-96
//           rounded-full
//           bg-pink-500/[0.06]
//           blur-3xl
//           pointer-events-none
//         " />

//         {/* TOP GRADIENT */}

//         <div className="
//           h-1
//           bg-gradient-to-r
//           from-purple-500
//           via-fuchsia-500
//           to-pink-500
//         " />

//         <div className="
//           relative
//           p-4
//           sm:p-6
//           lg:p-8
//         ">

//           <div className="
//             flex
//             flex-col
//             lg:flex-row
//             gap-8
//             lg:gap-10
//           ">

//             {/* =================================================
//                 INSTITUTE IMAGE
//             ================================================= */}

//             <div className="w-full shrink-0 lg:w-[280px]">

//               <div className="
//                 relative
//                 w-full
//               ">

//                 <div className="
//                   relative
//                   w-full
//                   h-[250px]
//                   md:h-[280px]
//                   lg:h-[280px]
//                   rounded-[24px]
//                   overflow-hidden
//                   bg-[#202026]
//                   border
//                   border-white/10
//                   shadow-2xl
//                 ">

//                   {image ? (

//                     <img
//                       src={URL.createObjectURL(
//                         image
//                       )}
//                       alt="Institute"
//                       className="
//                         w-full
//                         h-full
//                         object-cover
//                       "
//                     />

//                   ) : profile.image_url ? (

//                     <img
//                       src={getImageUrl(
//                         profile.image_url
//                       )}
//                       alt="Institute"
//                       className="
//                         w-full
//                         h-full
//                         object-cover
//                       "
//                       onError={(e) => {
//                         e.currentTarget.style.display =
//                           "none";
//                       }}
//                     />

//                   ) : (

//                     <div className="
//                       w-full
//                       h-full
//                       flex
//                       flex-col
//                       items-center
//                       justify-center
//                       gap-3
//                       text-gray-600
//                     ">
//                       <ImageIcon size={50} />

//                       <span className="text-sm">
//                         No Institute Image
//                       </span>
//                     </div>

//                   )}

//                   {/* IMAGE OVERLAY */}

//                   <div className="
//                     absolute
//                     inset-x-0
//                     bottom-0
//                     h-24
//                     bg-gradient-to-t
//                     from-black/70
//                     to-transparent
//                     pointer-events-none
//                   " />

//                 </div>

//                 {/* IMAGE UPLOAD */}

//                 {editing && (

//                   <label className="
//                     absolute
//                     bottom-4
//                     right-4
//                     w-11
//                     h-11
//                     rounded-xl
//                     bg-gradient-to-r
//                     from-purple-500
//                     to-pink-500
//                     flex
//                     items-center
//                     justify-center
//                     cursor-pointer
//                     shadow-xl
//                     hover:scale-105
//                     transition
//                   ">

//                     <Upload size={18} />

//                     <input
//                       type="file"
//                       accept="image/*"
//                       className="hidden"
//                       onChange={(e) =>
//                         setImage(
//                           e.target.files?.[0] ||
//                             null
//                         )
//                       }
//                     />

//                   </label>

//                 )}

//               </div>

//             </div>

//             {/* =================================================
//                 DETAILS
//             ================================================= */}

//             <div className="
//               flex-1
//               min-w-0
//             ">

//               {/* NAME + LOGO */}

//               <div className="
//                 flex
//                 flex-col
//                 sm:flex-row
//                 sm:items-start
//                 justify-between
//                 gap-6
//               ">

//                 <div className="
//                   flex
//                   items-center
//                   gap-4
//                 ">

//                   {/* =================================================
//                       LOGO

//                       IMPORTANT:
//                       API RETURNS `logo`
//                       NOT `logo_url`
//                   ================================================= */}

//                   <div className="
//                     relative
//                     w-20
//                     h-20
//                     shrink-0
//                     rounded-2xl
//                     bg-[#0c0c10]
//                     border
//                     border-white/10
//                     flex
//                     items-center
//                     justify-center
//                     overflow-hidden
//                     shadow-xl
//                   ">

//                     {logo ? (

//                       <img
//                         src={URL.createObjectURL(
//                           logo
//                         )}
//                         alt="Institute Logo"
//                         className="
//                           w-full
//                           h-full
//                           object-contain
//                           p-2
//                         "
//                       />

//                     ) : profile.logo ? (

//                       <img
//                         src={getImageUrl(
//                           profile.logo
//                         )}
//                         alt="Institute Logo"
//                         className="
//                           w-full
//                           h-full
//                           object-contain
//                           p-2
//                         "
//                         onError={(e) => {
//                           console.error(
//                             "LOGO LOAD ERROR:",
//                             profile.logo
//                           );

//                           e.currentTarget.style.display =
//                             "none";
//                         }}
//                       />

//                     ) : (

//                       <Building2
//                         size={28}
//                         className="text-gray-600"
//                       />

//                     )}

//                   </div>

//                   <div className="min-w-0">

//                     {editing ? (

//                       <input
//                         type="text"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleChange}
//                         placeholder="Institute name"
//                         className="
//                           w-full
//                           max-w-[500px]
//                           px-4
//                           py-3
//                           rounded-xl
//                           bg-[#202026]
//                           border
//                           border-white/10
//                           text-white
//                           text-xl
//                           font-bold
//                           outline-none
//                           focus:border-purple-500
//                         "
//                       />

//                     ) : (

//                       <h2 className="
//                         text-3xl
//                         md:text-4xl
//                         font-bold
//                         text-white
//                         truncate
//                       ">
//                         {profile.name || "-"}
//                       </h2>

//                     )}

//                     {/* STATUS */}

//                     <div className="mt-3">

//                       <span
//                         className={`
//                           inline-flex
//                           items-center
//                           gap-1.5
//                           px-3
//                           py-1.5
//                           rounded-full
//                           text-xs
//                           font-bold
//                           border
//                           ${
//                             isApproved
//                               ? "bg-green-500/10 text-green-400 border-green-500/20"
//                               : profile.approval_status ===
//                                 "REJECTED"
//                               ? "bg-red-500/10 text-red-400 border-red-500/20"
//                               : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
//                           }
//                         `}
//                       >

//                         <ShieldCheck size={14} />

//                         {profile.approval_status ||
//                           "PENDING"}

//                       </span>

//                     </div>

//                   </div>

//                 </div>

//                 {/* =================================================
//                     CHANGE LOGO
//                 ================================================= */}

//                 {editing && (

//                   <label className="
//                     flex
//                     items-center
//                     justify-center
//                     gap-2
//                     px-4
//                     py-2.5
//                     rounded-xl
//                     bg-white/5
//                     border
//                     border-white/10
//                     text-purple-300
//                     text-sm
//                     cursor-pointer
//                     hover:bg-white/10
//                     transition
//                   ">

//                     <Upload size={15} />

//                     Change Logo

//                     <input
//                       type="file"
//                       accept="image/*"
//                       className="hidden"
//                       onChange={(e) =>
//                         setLogo(
//                           e.target.files?.[0] ||
//                             null
//                         )
//                       }
//                     />

//                   </label>

//                 )}

//               </div>

//               {/* DIVIDER */}

//               <div className="
//                 h-px
//                 bg-white/[0.07]
//                 my-7
//               " />

//               {/* =================================================
//                   CONTACT INFORMATION
//               ================================================= */}

//               <div className="
//                 grid
//                 grid-cols-1
//                 md:grid-cols-2
//                 gap-4
//               ">

//                 <ContactCard
//                   icon={<Mail size={18} />}
//                   label="Email Address"
//                   value={formData.email}
//                   editing={editing}
//                   name="email"
//                   onChange={handleChange}
//                 />

//                 <ContactCard
//                   icon={<Phone size={18} />}
//                   label="Phone Number"
//                   value={formData.phone_number}
//                   editing={editing}
//                   name="phone_number"
//                   onChange={handleChange}
//                 />

//                 <ContactCard
//                   icon={<Globe2 size={18} />}
//                   label="Timezone"
//                   value={formData.timezone}
//                   editing={editing}
//                   name="timezone"
//                   onChange={handleChange}
//                 />

//                 <ContactCard
//                   icon={<Building2 size={18} />}
//                   label="Institute Status"
//                   value={
//                     profile.approval_status ||
//                     "PENDING"
//                   }
//                   editing={false}
//                 />

//               </div>

//             </div>

//           </div>

//         </div>

//       </div>

//       {/* =====================================================
//           LOCATION + WORKING HOURS
//       ===================================================== */}

//       <div className="
//         grid
//         grid-cols-1
//         xl:grid-cols-3
//         gap-6
//         mt-6
//       ">

//         {/* ===================================================
//             LOCATION
//         =================================================== */}

//         <div className="
//           xl:col-span-2
//           rounded-[26px]
//           border
//           border-white/[0.08]
//           bg-[#141419]
//           p-4
//           sm:p-6
//           md:p-7
//         ">

//           <CardHeader
//             icon={<MapPinned size={19} />}
//             title="Institute Location"
//             subtitle="Your institute address and location"
//           />

//           {/* ADDRESS */}

//           <div className="mt-6">

//             <label className="
//               flex
//               items-center
//               gap-2
//               text-xs
//               font-medium
//               text-gray-500
//               mb-2
//             ">
//               <MapPin size={14} />
//               Address
//             </label>

//             {editing ? (

//               <textarea
//                 name="address"
//                 value={formData.address}
//                 onChange={handleChange}
//                 rows={3}
//                 placeholder="Enter complete institute address"
//                 className="
//                   w-full
//                   px-4
//                   py-4
//                   rounded-2xl
//                   bg-[#202026]
//                   border
//                   border-white/10
//                   text-white
//                   placeholder-gray-600
//                   outline-none
//                   resize-none
//                   focus:border-purple-500
//                   transition
//                 "
//               />

//             ) : (

//               <div className="
//                 rounded-2xl
//                 bg-[#1b1b20]
//                 border
//                 border-white/[0.06]
//                 p-5
//               ">

//                 <div className="
//                   flex
//                   items-start
//                   gap-3
//                 ">

//                   <div className="
//                     w-9
//                     h-9
//                     shrink-0
//                     rounded-xl
//                     bg-purple-500/10
//                     text-purple-400
//                     flex
//                     items-center
//                     justify-center
//                   ">
//                     <MapPin size={17} />
//                   </div>

//                   <p className="
//                     text-gray-300
//                     text-sm
//                     leading-6
//                   ">
//                     {formData.address ||
//                       "No address added."}
//                   </p>

//                 </div>

//               </div>

//             )}

//           </div>

//           {/* CITY / STATE / PINCODE */}

//           <div className="
//             grid
//             grid-cols-1
//             md:grid-cols-3
//             gap-4
//             mt-5
//           ">

//             <SimpleField
//               icon={<MapPin size={15} />}
//               label="City"
//               name="city"
//               value={formData.city}
//               editing={editing}
//               onChange={handleChange}
//             />

//             <SimpleField
//               icon={<MapPin size={15} />}
//               label="State"
//               name="state"
//               value={formData.state}
//               editing={editing}
//               onChange={handleChange}
//             />

//             <SimpleField
//               icon={<MapPin size={15} />}
//               label="Pincode"
//               name="pincode"
//               value={formData.pincode}
//               editing={editing}
//               onChange={handleChange}
//             />

//           </div>

//         </div>

//         {/* ===================================================
//             WORKING HOURS
//         =================================================== */}

//         <div className="
//           rounded-[26px]
//           border
//           border-white/[0.08]
//           bg-[#141419]
//           p-4
//           sm:p-6
//           md:p-7
//         ">

//           <CardHeader
//             icon={<Clock3 size={19} />}
//             title="Working Hours"
//             subtitle="Institute operating hours"
//           />

//           <div className="
//             grid
//             grid-cols-1
//             gap-4
//             mt-6
//           ">

//             {/* OPEN TIME */}

//             <TimeCard
//               label="Open Time"
//               value={formData.open_time}
//               editing={editing}
//               name="open_time"
//               onChange={handleChange}
//             />

//             {/* CLOSE TIME */}

//             <TimeCard
//               label="Close Time"
//               value={formData.close_time}
//               editing={editing}
//               name="close_time"
//               onChange={handleChange}
//             />

//           </div>

//           {!editing && (
//             <div className="
//               mt-4
//               flex
//               items-center
//               gap-2
//               text-xs
//               text-gray-500
//             ">
//               <Clock3 size={14} />
//               Institute operating hours
//             </div>
//           )}

//         </div>

//       </div>

//       {/* =====================================================
//           ABOUT INSTITUTE
//       ===================================================== */}

//       <div className="
//         mt-6
//         rounded-[26px]
//         border
//         border-white/[0.08]
//         bg-[#141419]
//         p-4
//         sm:p-6
//         md:p-7
//       ">

//         <CardHeader
//           icon={<FileText size={19} />}
//           title="About Institute"
//           subtitle="Tell students about your institute"
//         />

//         <div className="mt-6">

//           {editing ? (

//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               rows={6}
//               placeholder="Write a short description about your institute..."
//               className="
//                 w-full
//                 px-5
//                 py-4
//                 rounded-2xl
//                 bg-[#202026]
//                 border
//                 border-white/10
//                 text-white
//                 placeholder-gray-600
//                 outline-none
//                 resize-none
//                 focus:border-purple-500
//                 transition
//                 leading-7
//               "
//             />

//           ) : (

//             <div className="
//               rounded-2xl
//               bg-[#1b1b20]
//               border
//               border-white/[0.06]
//               p-5
//               md:p-6
//             ">

//               <p className="
//                 text-gray-300
//                 leading-7
//                 text-sm
//                 md:text-base
//                 whitespace-pre-line
//               ">
//                 {profile.description ||
//                   "No institute description has been added yet."}
//               </p>

//             </div>

//           )}

//         </div>

//       </div>

//     </div>
//   );
// }

// /* =========================================================
//    CARD HEADER
// ========================================================= */

// function CardHeader({
//   icon,
//   title,
//   subtitle,
// }) {
//   return (
//     <div className="
//       flex
//       items-center
//       gap-3
//     ">

//       <div className="
//         w-10
//         h-10
//         shrink-0
//         rounded-xl
//         bg-gradient-to-br
//         from-purple-500/15
//         to-pink-500/10
//         border
//         border-purple-500/20
//         text-purple-400
//         flex
//         items-center
//         justify-center
//       ">
//         {icon}
//       </div>

//       <div>

//         <h3 className="
//           text-lg
//           font-semibold
//           text-white
//         ">
//           {title}
//         </h3>

//         <p className="
//           text-xs
//           text-gray-500
//           mt-0.5
//         ">
//           {subtitle}
//         </p>

//       </div>

//     </div>
//   );
// }

// /* =========================================================
//    CONTACT CARD
// ========================================================= */

// function ContactCard({
//   icon,
//   label,
//   value,
//   editing,
//   name,
//   onChange,
// }) {
//   return (
//     <div className="
//       group
//       rounded-2xl
//       bg-[#1b1b20]
//       border
//       border-white/[0.06]
//       p-4
//       hover:border-purple-500/20
//       transition
//     ">

//       <div className="
//         flex
//         items-center
//         gap-3
//       ">

//         <div className="
//           w-9
//           h-9
//           shrink-0
//           rounded-xl
//           bg-purple-500/10
//           text-purple-400
//           flex
//           items-center
//           justify-center
//           group-hover:bg-purple-500/15
//           transition
//         ">
//           {icon}
//         </div>

//         <div className="
//           min-w-0
//           flex-1
//         ">

//           <p className="
//             text-[11px]
//             uppercase
//             tracking-wider
//             text-gray-500
//             mb-1
//           ">
//             {label}
//           </p>

//           {editing && name ? (

//             <input
//               type="text"
//               name={name}
//               value={value || ""}
//               onChange={onChange}
//               className="
//                 w-full
//                 bg-transparent
//                 border-b
//                 border-white/10
//                 focus:border-purple-500
//                 text-white
//                 text-sm
//                 outline-none
//                 pb-1
//               "
//             />

//           ) : (

//             <p className="
//               text-white
//               text-sm
//               font-medium
//               truncate
//             ">
//               {value || "-"}
//             </p>

//           )}

//         </div>

//       </div>

//     </div>
//   );
// }

// /* =========================================================
//    SIMPLE FIELD
// ========================================================= */

// function SimpleField({
//   icon,
//   label,
//   name,
//   value,
//   editing,
//   onChange,
// }) {
//   return (
//     <div>

//       <label className="
//         flex
//         items-center
//         gap-2
//         text-xs
//         text-gray-500
//         mb-2
//       ">
//         {icon}
//         {label}
//       </label>

//       {editing ? (

//         <input
//           type="text"
//           name={name}
//           value={value || ""}
//           onChange={onChange}
//           className="
//             w-full
//             px-4
//             py-3
//             rounded-xl
//             bg-[#202026]
//             border
//             border-white/10
//             text-white
//             outline-none
//             focus:border-purple-500
//             transition
//           "
//         />

//       ) : (

//         <div className="
//           px-4
//           py-3
//           rounded-xl
//           bg-[#1b1b20]
//           border
//           border-white/[0.06]
//           min-h-[46px]
//           flex
//           items-center
//         ">

//           <p className="
//             text-white
//             text-sm
//           ">
//             {value || "-"}
//           </p>

//         </div>

//       )}

//     </div>
//   );
// }

// /* =========================================================
//    TIME CARD
// ========================================================= */

// function TimeCard({
//   label,
//   value,
//   editing,
//   name,
//   onChange,
// }) {
//   return (
//     <div className="
//       relative
//       overflow-hidden
//       rounded-2xl
//       bg-[#1b1b20]
//       border
//       border-white/[0.06]
//       p-5
//     ">

//       {/* DECORATIVE GLOW */}

//       <div className="
//         absolute
//         -right-8
//         -top-8
//         w-24
//         h-24
//         rounded-full
//         bg-purple-500/5
//         blur-2xl
//       " />

//       <div className="
//         relative
//         flex
//         items-center
//         gap-4
//       ">

//         <div className="
//           w-11
//           h-11
//           shrink-0
//           rounded-xl
//           bg-gradient-to-br
//           from-purple-500/15
//           to-pink-500/10
//           border
//           border-purple-500/20
//           flex
//           items-center
//           justify-center
//           text-purple-400
//         ">
//           <Clock3 size={20} />
//         </div>

//         <div className="flex-1">

//           <p className="
//             text-xs
//             text-gray-500
//             mb-1
//           ">
//             {label}
//           </p>

//           {editing ? (

//             <input
//               type="time"
//               name={name}
//               value={value || ""}
//               onChange={onChange}
//               className="
//                 w-full
//                 px-3
//                 py-2
//                 rounded-lg
//                 bg-[#25252b]
//                 border
//                 border-white/10
//                 text-white
//                 outline-none
//                 focus:border-purple-500
//                 [color-scheme:dark]
//               "
//             />

//           ) : (

//             <p className="
//               text-xl
//               font-bold
//               text-white
//             ">
//               {formatTime(value)}
//             </p>

//           )}

//         </div>

//       </div>

//     </div>
//   );
// }






import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import toast from "react-hot-toast";
import {
  getProfile,
  updateInstituteProfile,
} from "../services/instituteService";

import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Clock3,
  Globe2,
  FileText,
  Pencil,
  Save,
  X,
  Upload,
  ShieldCheck,
  MapPinned,
  Image as ImageIcon,
} from "lucide-react";


/* =========================================================
   GET CURRENT INSTITUTE USER'S FIREBASE ID TOKEN
   Wait for Firebase to restore the login session if needed.
========================================================= */

const getInstituteFirebaseToken = async () => {
  let user = auth.currentUser;

  if (!user) {
    user = await new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        unsubscribe();
        resolve(currentUser);
      });
    });
  }

  if (!user) {
    throw new Error("Institute session expired. Please login again.");
  }

  return user.getIdToken(true);
};

/* =========================================================
   TIME FORMATTER
   Backend:
   12:08:00
   16:08:00

   UI:
   12:08 PM
   4:08 PM
========================================================= */

const formatTime = (time) => {
  if (!time) return "-";

  try {
    const value = String(time).trim();

    if (!value) return "-";

    // Already formatted
    if (
      value.toUpperCase().includes("AM") ||
      value.toUpperCase().includes("PM")
    ) {
      return value;
    }

    const parts = value.split(":");

    if (parts.length < 2) {
      return value;
    }

    const hours = Number(parts[0]);
    const minutes = Number(parts[1]);

    if (
      Number.isNaN(hours) ||
      Number.isNaN(minutes)
    ) {
      return value;
    }

    const period = hours >= 12 ? "PM" : "AM";
    const hour12 = hours % 12 || 12;

    return `${hour12}:${String(minutes).padStart(
      2,
      "0"
    )} ${period}`;
  } catch (error) {
    console.error("TIME FORMAT ERROR:", error);
    return String(time);
  }
};

/* =========================================================
   CONVERT BACKEND TIME TO HTML TIME INPUT

   Backend:
   12:08:00

   Input:
   12:08
========================================================= */

const normalizeTimeForInput = (time) => {
  if (!time) return "";

  const value = String(time).trim();

  if (!value) return "";

  // If backend returns 12:08:00
  const parts = value.split(":");

  if (parts.length >= 2) {
    return `${parts[0].padStart(2, "0")}:${parts[1].padStart(
      2,
      "0"
    )}`;
  }

  return value;
};

/* =========================================================
   INSTITUTE PROFILE VALIDATION
========================================================= */

const validateInstituteProfile = (formData, files = {}) => {
  const {
    name,
    email,
    phone_number,
    address,
    city,
    state,
    pincode,
    open_time,
    close_time,
    timezone,
    description,
  } = formData;

  const cleanName = String(name || "").trim();
  const cleanEmail = String(email || "").trim();
  const cleanPhone = String(phone_number || "").trim();
  const cleanAddress = String(address || "").trim();
  const cleanCity = String(city || "").trim();
  const cleanState = String(state || "").trim();
  const cleanPincode = String(pincode || "").trim();
  const cleanTimezone = String(timezone || "Asia/Kolkata").trim();
  const cleanDescription = String(description || "").trim();

  if (!cleanName) return "Institute name is required.";
  if (cleanName.length < 2 || cleanName.length > 100) {
    return "Institute name must be between 2 and 100 characters.";
  }
  if (!/^[\\p{L}\\p{N}][\\p{L}\\p{N} .,&'()/-]*$/u.test(cleanName)) {
    return "Institute name contains invalid characters.";
  }

  if (!cleanEmail) return "Email address is required.";
  if (cleanEmail.length > 254 ||
      !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$/.test(cleanEmail)) {
    return "Enter a valid email address.";
  }

  if (!cleanPhone) return "Phone number is required.";
  const normalizedPhone = cleanPhone.replace(/[\\s()-]/g, "");
  if (!/^(?:\\+91)?[6-9]\\d{9}$/.test(normalizedPhone)) {
    return "Enter a valid 10-digit Indian mobile number, optionally starting with +91.";
  }

  if (!cleanAddress) return "Institute address is required.";
  if (cleanAddress.length < 5 || cleanAddress.length > 250) {
    return "Address must be between 5 and 250 characters.";
  }
  if (/[<>]/.test(cleanAddress)) {
    return "Address cannot contain < or > characters.";
  }

  if (!cleanCity) return "City is required.";
  if (cleanCity.length < 2 || cleanCity.length > 80 ||
      !/^[\\p{L}\\p{M} .'-]+$/u.test(cleanCity)) {
    return "Enter a valid city name (2–80 characters).";
  }

  if (!cleanState) return "State is required.";
  if (cleanState.length < 2 || cleanState.length > 80 ||
      !/^[\\p{L}\\p{M} .'-]+$/u.test(cleanState)) {
    return "Enter a valid state name (2–80 characters).";
  }

  if (!cleanPincode) return "Pincode is required.";
  if (!/^[1-9]\\d{5}$/.test(cleanPincode)) {
    return "Enter a valid 6-digit Indian pincode.";
  }

  if (!open_time) return "Institute opening time is required.";
  if (!/^([01]\\d|2[0-3]):[0-5]\\d$/.test(open_time)) {
    return "Enter a valid opening time.";
  }

  if (!close_time) return "Institute closing time is required.";
  if (!/^([01]\\d|2[0-3]):[0-5]\\d$/.test(close_time)) {
    return "Enter a valid closing time.";
  }
  if (close_time <= open_time) {
    return "Closing time must be later than opening time.";
  }

  if (cleanTimezone.length > 100) {
    return "Timezone must be 100 characters or fewer.";
  }
  try {
    new Intl.DateTimeFormat("en-US", {
      timeZone: cleanTimezone || "Asia/Kolkata",
    }).format(new Date());
  } catch {
    return "Enter a valid timezone, for example Asia/Kolkata.";
  }

  if (cleanDescription.length > 2000) {
    return "Institute description cannot exceed 2,000 characters.";
  }
  if (/[<>]/.test(cleanDescription)) {
    return "Description cannot contain < or > characters.";
  }

  const validateImage = (file, label) => {
    if (!file) return null;
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    const maxBytes = 5 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      return `${label} must be a JPG, PNG, or WEBP image.`;
    }
    if (file.size > maxBytes) {
      return `${label} must be 5 MB or smaller.`;
    }
    if (file.size === 0) {
      return `${label} file is empty.`;
    }
    return null;
  };

  return (
    validateImage(files.image, "Institute image") ||
    validateImage(files.logo, "Institute logo")
  );
};

/* =========================================================
   IMAGE URL HELPER
========================================================= */

const getImageUrl = (img) => {
  if (!img) return "";

  const value = String(img).trim();

  if (!value) return "";

  // S3 / external URL
  if (
    value.startsWith("http://") ||
    value.startsWith("https://")
  ) {
    return value;
  }

  // Backend relative path
  return `https://finearts-backend.onrender.com${value.startsWith("/") ? "" : "/"}${value}`;
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function InstituteProfile() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);

  const [profile, setProfile] = useState(null);

  const [image, setImage] = useState(null);
  const [logo, setLogo] = useState(null);

  /* =========================================================
     FORM DATA

     IMPORTANT:
     UI names:
     open_time
     close_time

     Backend names:
     start_time
     end_time
  ========================================================= */

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    open_time: "",
    close_time: "",
    timezone: "",
    description: "",
  });

  /* =========================================================
     LOAD PROFILE
  ========================================================= */

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);

      const token = await getInstituteFirebaseToken();
      const response = await getProfile(token);

      /*
        Depending on your service response,
        profile can be:

        response.data

        OR

        response
      */
      const data = response?.data || response;

      console.log(
        "=============================="
      );

      console.log(
        "INSTITUTE PROFILE FROM API:",
        data
      );

      console.log(
        "LOGO:",
        data?.logo
      );

      console.log(
        "START TIME:",
        data?.start_time
      );

      console.log(
        "END TIME:",
        data?.end_time
      );

      console.log(
        "ADDRESS:",
        data?.address
      );

      console.log(
        "=============================="
      );

      setProfile(data);

      /* =====================================================
         IMPORTANT FIELD MAPPING

         API:
         start_time -> UI open_time
         end_time   -> UI close_time
         logo       -> profile.logo
      ===================================================== */

      setFormData({
        name: data?.name || "",
        email: data?.email || "",
        phone_number: data?.phone_number || "",
        address: data?.address || "",
        city: data?.city || "",
        state: data?.state || "",
        pincode: data?.pincode || "",

        // BACKEND start_time -> OPEN TIME UI
        open_time: normalizeTimeForInput(
          data?.start_time
        ),

        // BACKEND end_time -> CLOSE TIME UI
        close_time: normalizeTimeForInput(
          data?.end_time
        ),

        timezone: data?.timezone || "",
        description: data?.description || "",
      });
    } catch (error) {
      console.error(
        "LOAD PROFILE ERROR:",
        error
      );

      console.error(
        "BACKEND RESPONSE:",
        error?.response?.data
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to load profile"
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     HANDLE INPUT
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
     START EDIT
  ========================================================= */

  const handleEdit = () => {
    /*
      Refresh form values from actual API profile
      before opening edit mode.
    */

    if (profile) {
      setFormData({
        name: profile?.name || "",
        email: profile?.email || "",
        phone_number:
          profile?.phone_number || "",
        address: profile?.address || "",
        city: profile?.city || "",
        state: profile?.state || "",
        pincode: profile?.pincode || "",

        open_time: normalizeTimeForInput(
          profile?.start_time
        ),

        close_time: normalizeTimeForInput(
          profile?.end_time
        ),

        timezone: profile?.timezone || "",
        description:
          profile?.description || "",
      });
    }

    setImage(null);
    setLogo(null);
    setEditing(true);
  };

  /* =========================================================
     CANCEL EDIT
  ========================================================= */

  const handleCancel = () => {
    if (!profile) return;

    setFormData({
      name: profile?.name || "",
      email: profile?.email || "",
      phone_number:
        profile?.phone_number || "",
      address: profile?.address || "",
      city: profile?.city || "",
      state: profile?.state || "",
      pincode: profile?.pincode || "",

      // API -> UI
      open_time: normalizeTimeForInput(
        profile?.start_time
      ),

      // API -> UI
      close_time: normalizeTimeForInput(
        profile?.end_time
      ),

      timezone: profile?.timezone || "",
      description:
        profile?.description || "",
    });

    setImage(null);
    setLogo(null);
    setEditing(false);
  };

  /* =========================================================
     SAVE PROFILE
  ========================================================= */

  const handleSave = async () => {
    try {
      setSaving(true);

      // Institute Panel must use the signed-in institute user's
      // Firebase ID token, not an admin/application JWT.
      const token = await getInstituteFirebaseToken();

      /* =====================================================
         VALIDATE EVERY PROFILE FIELD BEFORE SENDING
      ===================================================== */

      const validationError = validateInstituteProfile(
        formData,
        { image, logo }
      );

      if (validationError) {
        toast.error(validationError);
        return;
      }

      /* =====================================================
         FORM DATA
      ===================================================== */

      const data = new FormData();

      data.append(
        "name",
        formData.name.trim()
      );

      data.append(
        "email",
        formData.email.trim()
      );

      data.append(
        "phone_number",
        formData.phone_number.trim()
      );

      data.append(
        "address",
        formData.address.trim()
      );

      data.append(
        "city",
        formData.city.trim()
      );

      data.append(
        "state",
        formData.state.trim()
      );

      data.append(
        "pincode",
        formData.pincode.trim()
      );

      /* =====================================================
         IMPORTANT BACKEND FIELD MAPPING

         UI:
         open_time

         BACKEND:
         start_time
      ===================================================== */

      data.append(
        "start_time",
        formData.open_time || ""
      );

      /* =====================================================
         UI:
         close_time

         BACKEND:
         end_time
      ===================================================== */

      data.append(
        "end_time",
        formData.close_time || ""
      );

      data.append(
        "timezone",
        formData.timezone || ""
      );

      data.append(
        "description",
        formData.description || ""
      );

      /* =====================================================
         IMAGE
      ===================================================== */

      if (image) {
        data.append("image", image);
      }

      /* =====================================================
         LOGO
      ===================================================== */

      if (logo) {
        data.append("logo", logo);
      }

      console.log(
        "=============================="
      );

      console.log(
        "UPDATING INSTITUTE PROFILE"
      );

      console.log(
        "open_time UI:",
        formData.open_time
      );

      console.log(
        "close_time UI:",
        formData.close_time
      );

      console.log(
        "Sending start_time:",
        formData.open_time
      );

      console.log(
        "Sending end_time:",
        formData.close_time
      );

      console.log(
        "address:",
        formData.address
      );

      console.log(
        "logo:",
        logo
      );

      console.log(
        "image:",
        image
      );

      console.log(
        "=============================="
      );

      /* =====================================================
         API
      ===================================================== */

      const response =
        await updateInstituteProfile(
          data,
          token
        );

      console.log(
        "UPDATE PROFILE RESPONSE:",
        response
      );

      toast.success(
        "Profile updated successfully"
      );

      setEditing(false);
      setImage(null);
      setLogo(null);

      /* =====================================================
         RELOAD PROFILE
      ===================================================== */

      await loadProfile();
    } catch (error) {
      console.error(
        "UPDATE PROFILE ERROR:",
        error
      );

      console.error(
        "BACKEND RESPONSE:",
        error?.response?.data
      );

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to update profile"
      );
    } finally {
      setSaving(false);
    }
  };

  /* =========================================================
     LOADING UI
  ========================================================= */

  if (loading) {
    return (
      <div className="
        min-h-[70vh]
        flex
        items-center
        justify-center
        bg-[#08080c]
      ">
        <div className="
          flex
          flex-col
          items-center
          gap-4
        ">
          <div className="
            w-12
            h-12
            rounded-full
            border-4
            border-purple-500/20
            border-t-purple-500
            animate-spin
          " />

          <p className="
            text-gray-400
            text-sm
          ">
            Loading institute profile...
          </p>
        </div>
      </div>
    );
  }

  /* =========================================================
     PROFILE NOT FOUND
  ========================================================= */

  if (!profile) {
    return (
      <div className="w-full min-w-0">
        <div className="
          rounded-2xl
          border
          border-red-500/20
          bg-red-500/5
          p-6
        ">
          <p className="text-red-400">
            Profile not found
          </p>
        </div>
      </div>
    );
  }

  const isApproved =
    profile.approval_status === "APPROVED";

  /* =========================================================
     MAIN UI
  ========================================================= */

  return (
    <div className="
      min-h-full
      w-full
      min-w-0
      bg-[#08080c]
      text-white
    ">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="
        flex
        flex-col
        md:flex-row
        md:items-center
        md:justify-between
        gap-5
        mb-8
      ">

        <div>

          <div className="
            flex
            items-center
            gap-3
            mb-2
          ">

            <div className="
              w-10
              h-10
              rounded-xl
              bg-gradient-to-br
              from-purple-500
              to-pink-500
              flex
              items-center
              justify-center
              shadow-lg
              shadow-purple-500/20
            ">
              <Building2 size={20} />
            </div>

            <h1 className="
              text-3xl
              md:text-4xl
              font-extrabold
              tracking-tight
              bg-gradient-to-r
              from-purple-400
              via-fuchsia-400
              to-pink-500
              bg-clip-text
              text-transparent
            ">
              Institute Profile
            </h1>

          </div>

          <p className="
            text-gray-500
            text-sm
            ml-0
            md:ml-[52px]
          ">
            Manage your institute information
            and profile details
          </p>

        </div>

        {/* ===================================================
            ACTION BUTTONS
        =================================================== */}

        {!editing ? (

          <button
            type="button"
            onClick={handleEdit}
            className="
              group
              flex
              items-center
              justify-center
              gap-2
              px-6
              py-3
              rounded-xl
              bg-gradient-to-r
              from-purple-500
              to-pink-500
              text-white
              font-semibold
              shadow-lg
              shadow-purple-500/20
              hover:shadow-purple-500/30
              hover:scale-[1.02]
              transition-all
            "
          >
            <Pencil
              size={17}
              className="
                group-hover:rotate-[-8deg]
                transition
              "
            />

            Edit Profile
          </button>

        ) : (

          <div className="
            flex
            flex-wrap
            items-center
            gap-3
          ">

            <button
              type="button"
              onClick={handleCancel}
              disabled={saving}
              className="
                flex
                items-center
                gap-2
                px-5
                py-3
                rounded-xl
                bg-[#17171c]
                border
                border-white/10
                text-gray-300
                hover:bg-[#202026]
                transition
                disabled:opacity-50
              "
            >
              <X size={17} />
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="
                flex
                items-center
                gap-2
                px-5
                py-3
                rounded-xl
                bg-gradient-to-r
                from-purple-500
                to-pink-500
                text-white
                font-semibold
                shadow-lg
                shadow-purple-500/20
                disabled:opacity-50
              "
            >
              <Save size={17} />

              {saving
                ? "Saving..."
                : "Save Changes"}
            </button>

          </div>

        )}

      </div>

      {/* =====================================================
          HERO CARD
      ===================================================== */}

      <div className="
        relative
        overflow-hidden
        rounded-[28px]
        border
        border-white/[0.08]
        bg-[#141419]
        shadow-2xl
      ">

        {/* DECORATIVE GLOW */}

        <div className="
          absolute
          -top-32
          -right-32
          w-96
          h-96
          rounded-full
          bg-purple-600/10
          blur-3xl
          pointer-events-none
        " />

        <div className="
          absolute
          -bottom-40
          left-1/3
          w-96
          h-96
          rounded-full
          bg-pink-500/[0.06]
          blur-3xl
          pointer-events-none
        " />

        {/* TOP GRADIENT */}

        <div className="
          h-1
          bg-gradient-to-r
          from-purple-500
          via-fuchsia-500
          to-pink-500
        " />

        <div className="
          relative
          p-4
          sm:p-6
          lg:p-8
        ">

          <div className="
            flex
            flex-col
            lg:flex-row
            gap-8
            lg:gap-10
          ">

            {/* =================================================
                INSTITUTE IMAGE
            ================================================= */}

            <div className="w-full shrink-0 lg:w-[280px]">

              <div className="
                relative
                w-full
              ">

                <div className="
                  relative
                  w-full
                  h-[250px]
                  md:h-[280px]
                  lg:h-[280px]
                  rounded-[24px]
                  overflow-hidden
                  bg-[#202026]
                  border
                  border-white/10
                  shadow-2xl
                ">

                  {image ? (

                    <img
                      src={URL.createObjectURL(
                        image
                      )}
                      alt="Institute"
                      className="
                        w-full
                        h-full
                        object-cover
                      "
                    />

                  ) : profile.image_url ? (

                    <img
                      src={getImageUrl(
                        profile.image_url
                      )}
                      alt="Institute"
                      className="
                        w-full
                        h-full
                        object-cover
                      "
                      onError={(e) => {
                        e.currentTarget.style.display =
                          "none";
                      }}
                    />

                  ) : (

                    <div className="
                      w-full
                      h-full
                      flex
                      flex-col
                      items-center
                      justify-center
                      gap-3
                      text-gray-600
                    ">
                      <ImageIcon size={50} />

                      <span className="text-sm">
                        No Institute Image
                      </span>
                    </div>

                  )}

                  {/* IMAGE OVERLAY */}

                  <div className="
                    absolute
                    inset-x-0
                    bottom-0
                    h-24
                    bg-gradient-to-t
                    from-black/70
                    to-transparent
                    pointer-events-none
                  " />

                </div>

                {/* IMAGE UPLOAD */}

                {editing && (

                  <label className="
                    absolute
                    bottom-4
                    right-4
                    w-11
                    h-11
                    rounded-xl
                    bg-gradient-to-r
                    from-purple-500
                    to-pink-500
                    flex
                    items-center
                    justify-center
                    cursor-pointer
                    shadow-xl
                    hover:scale-105
                    transition
                  ">

                    <Upload size={18} />

                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      className="hidden"
                      onChange={(e) =>
                        setImage(
                          e.target.files?.[0] ||
                            null
                        )
                      }
                    />

                  </label>

                )}

              </div>

            </div>

            {/* =================================================
                DETAILS
            ================================================= */}

            <div className="
              flex-1
              min-w-0
            ">

              {/* NAME + LOGO */}

              <div className="
                flex
                flex-col
                sm:flex-row
                sm:items-start
                justify-between
                gap-6
              ">

                <div className="
                  flex
                  items-center
                  gap-4
                ">

                  {/* =================================================
                      LOGO

                      IMPORTANT:
                      API RETURNS `logo`
                      NOT `logo_url`
                  ================================================= */}

                  <div className="
                    relative
                    w-20
                    h-20
                    shrink-0
                    rounded-2xl
                    bg-[#0c0c10]
                    border
                    border-white/10
                    flex
                    items-center
                    justify-center
                    overflow-hidden
                    shadow-xl
                  ">

                    {logo ? (

                      <img
                        src={URL.createObjectURL(
                          logo
                        )}
                        alt="Institute Logo"
                        className="
                          w-full
                          h-full
                          object-contain
                          p-2
                        "
                      />

                    ) : profile.logo ? (

                      <img
                        src={getImageUrl(
                          profile.logo
                        )}
                        alt="Institute Logo"
                        className="
                          w-full
                          h-full
                          object-contain
                          p-2
                        "
                        onError={(e) => {
                          console.error(
                            "LOGO LOAD ERROR:",
                            profile.logo
                          );

                          e.currentTarget.style.display =
                            "none";
                        }}
                      />

                    ) : (

                      <Building2
                        size={28}
                        className="text-gray-600"
                      />

                    )}

                  </div>

                  <div className="min-w-0">

                    {editing ? (

                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Institute name"
                        className="
                          w-full
                          max-w-[500px]
                          px-4
                          py-3
                          rounded-xl
                          bg-[#202026]
                          border
                          border-white/10
                          text-white
                          text-xl
                          font-bold
                          outline-none
                          focus:border-purple-500
                        "
                      />

                    ) : (

                      <h2 className="
                        text-3xl
                        md:text-4xl
                        font-bold
                        text-white
                        truncate
                      ">
                        {profile.name || "-"}
                      </h2>

                    )}

                    {/* STATUS */}

                    <div className="mt-3">

                      <span
                        className={`
                          inline-flex
                          items-center
                          gap-1.5
                          px-3
                          py-1.5
                          rounded-full
                          text-xs
                          font-bold
                          border
                          ${
                            isApproved
                              ? "bg-green-500/10 text-green-400 border-green-500/20"
                              : profile.approval_status ===
                                "REJECTED"
                              ? "bg-red-500/10 text-red-400 border-red-500/20"
                              : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                          }
                        `}
                      >

                        <ShieldCheck size={14} />

                        {profile.approval_status ||
                          "PENDING"}

                      </span>

                    </div>

                  </div>

                </div>

                {/* =================================================
                    CHANGE LOGO
                ================================================= */}

                {editing && (

                  <label className="
                    flex
                    items-center
                    justify-center
                    gap-2
                    px-4
                    py-2.5
                    rounded-xl
                    bg-white/5
                    border
                    border-white/10
                    text-purple-300
                    text-sm
                    cursor-pointer
                    hover:bg-white/10
                    transition
                  ">

                    <Upload size={15} />

                    Change Logo

                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      className="hidden"
                      onChange={(e) =>
                        setLogo(
                          e.target.files?.[0] ||
                            null
                        )
                      }
                    />

                  </label>

                )}

              </div>

              {/* DIVIDER */}

              <div className="
                h-px
                bg-white/[0.07]
                my-7
              " />

              {/* =================================================
                  CONTACT INFORMATION
              ================================================= */}

              <div className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-4
              ">

                <ContactCard
                  icon={<Mail size={18} />}
                  label="Email Address"
                  value={formData.email}
                  editing={editing}
                  name="email"
                  onChange={handleChange}
                />

                <ContactCard
                  icon={<Phone size={18} />}
                  label="Phone Number"
                  value={formData.phone_number}
                  editing={editing}
                  name="phone_number"
                  onChange={handleChange}
                />

                <ContactCard
                  icon={<Globe2 size={18} />}
                  label="Timezone"
                  value={formData.timezone}
                  editing={editing}
                  name="timezone"
                  onChange={handleChange}
                />

                <ContactCard
                  icon={<Building2 size={18} />}
                  label="Institute Status"
                  value={
                    profile.approval_status ||
                    "PENDING"
                  }
                  editing={false}
                />

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          LOCATION + WORKING HOURS
      ===================================================== */}

      <div className="
        grid
        grid-cols-1
        xl:grid-cols-3
        gap-6
        mt-6
      ">

        {/* ===================================================
            LOCATION
        =================================================== */}

        <div className="
          xl:col-span-2
          rounded-[26px]
          border
          border-white/[0.08]
          bg-[#141419]
          p-4
          sm:p-6
          md:p-7
        ">

          <CardHeader
            icon={<MapPinned size={19} />}
            title="Institute Location"
            subtitle="Your institute address and location"
          />

          {/* ADDRESS */}

          <div className="mt-6">

            <label className="
              flex
              items-center
              gap-2
              text-xs
              font-medium
              text-gray-500
              mb-2
            ">
              <MapPin size={14} />
              Address
            </label>

            {editing ? (

              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={3}
                placeholder="Enter complete institute address"
                className="
                  w-full
                  px-4
                  py-4
                  rounded-2xl
                  bg-[#202026]
                  border
                  border-white/10
                  text-white
                  placeholder-gray-600
                  outline-none
                  resize-none
                  focus:border-purple-500
                  transition
                "
              />

            ) : (

              <div className="
                rounded-2xl
                bg-[#1b1b20]
                border
                border-white/[0.06]
                p-5
              ">

                <div className="
                  flex
                  items-start
                  gap-3
                ">

                  <div className="
                    w-9
                    h-9
                    shrink-0
                    rounded-xl
                    bg-purple-500/10
                    text-purple-400
                    flex
                    items-center
                    justify-center
                  ">
                    <MapPin size={17} />
                  </div>

                  <p className="
                    text-gray-300
                    text-sm
                    leading-6
                  ">
                    {formData.address ||
                      "No address added."}
                  </p>

                </div>

              </div>

            )}

          </div>

          {/* CITY / STATE / PINCODE */}

          <div className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-4
            mt-5
          ">

            <SimpleField
              icon={<MapPin size={15} />}
              label="City"
              name="city"
              value={formData.city}
              editing={editing}
              onChange={handleChange}
            />

            <SimpleField
              icon={<MapPin size={15} />}
              label="State"
              name="state"
              value={formData.state}
              editing={editing}
              onChange={handleChange}
            />

            <SimpleField
              icon={<MapPin size={15} />}
              label="Pincode"
              name="pincode"
              value={formData.pincode}
              editing={editing}
              onChange={handleChange}
            />

          </div>

        </div>

        {/* ===================================================
            WORKING HOURS
        =================================================== */}

        <div className="
          rounded-[26px]
          border
          border-white/[0.08]
          bg-[#141419]
          p-4
          sm:p-6
          md:p-7
        ">

          <CardHeader
            icon={<Clock3 size={19} />}
            title="Working Hours"
            subtitle="Institute operating hours"
          />

          <div className="
            grid
            grid-cols-1
            gap-4
            mt-6
          ">

            {/* OPEN TIME */}

            <TimeCard
              label="Open Time"
              value={formData.open_time}
              editing={editing}
              name="open_time"
              onChange={handleChange}
            />

            {/* CLOSE TIME */}

            <TimeCard
              label="Close Time"
              value={formData.close_time}
              editing={editing}
              name="close_time"
              onChange={handleChange}
            />

          </div>

          {!editing && (
            <div className="
              mt-4
              flex
              items-center
              gap-2
              text-xs
              text-gray-500
            ">
              <Clock3 size={14} />
              Institute operating hours
            </div>
          )}

        </div>

      </div>

      {/* =====================================================
          ABOUT INSTITUTE
      ===================================================== */}

      <div className="
        mt-6
        rounded-[26px]
        border
        border-white/[0.08]
        bg-[#141419]
        p-4
        sm:p-6
        md:p-7
      ">

        <CardHeader
          icon={<FileText size={19} />}
          title="About Institute"
          subtitle="Tell students about your institute"
        />

        <div className="mt-6">

          {editing ? (

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={6}
              placeholder="Write a short description about your institute..."
              className="
                w-full
                px-5
                py-4
                rounded-2xl
                bg-[#202026]
                border
                border-white/10
                text-white
                placeholder-gray-600
                outline-none
                resize-none
                focus:border-purple-500
                transition
                leading-7
              "
            />

          ) : (

            <div className="
              rounded-2xl
              bg-[#1b1b20]
              border
              border-white/[0.06]
              p-5
              md:p-6
            ">

              <p className="
                text-gray-300
                leading-7
                text-sm
                md:text-base
                whitespace-pre-line
              ">
                {profile.description ||
                  "No institute description has been added yet."}
              </p>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

/* =========================================================
   CARD HEADER
========================================================= */

function CardHeader({
  icon,
  title,
  subtitle,
}) {
  return (
    <div className="
      flex
      items-center
      gap-3
    ">

      <div className="
        w-10
        h-10
        shrink-0
        rounded-xl
        bg-gradient-to-br
        from-purple-500/15
        to-pink-500/10
        border
        border-purple-500/20
        text-purple-400
        flex
        items-center
        justify-center
      ">
        {icon}
      </div>

      <div>

        <h3 className="
          text-lg
          font-semibold
          text-white
        ">
          {title}
        </h3>

        <p className="
          text-xs
          text-gray-500
          mt-0.5
        ">
          {subtitle}
        </p>

      </div>

    </div>
  );
}

/* =========================================================
   CONTACT CARD
========================================================= */

function ContactCard({
  icon,
  label,
  value,
  editing,
  name,
  onChange,
}) {
  return (
    <div className="
      group
      rounded-2xl
      bg-[#1b1b20]
      border
      border-white/[0.06]
      p-4
      hover:border-purple-500/20
      transition
    ">

      <div className="
        flex
        items-center
        gap-3
      ">

        <div className="
          w-9
          h-9
          shrink-0
          rounded-xl
          bg-purple-500/10
          text-purple-400
          flex
          items-center
          justify-center
          group-hover:bg-purple-500/15
          transition
        ">
          {icon}
        </div>

        <div className="
          min-w-0
          flex-1
        ">

          <p className="
            text-[11px]
            uppercase
            tracking-wider
            text-gray-500
            mb-1
          ">
            {label}
          </p>

          {editing && name ? (

            <input
              type="text"
              name={name}
              value={value || ""}
              onChange={onChange}
              className="
                w-full
                bg-transparent
                border-b
                border-white/10
                focus:border-purple-500
                text-white
                text-sm
                outline-none
                pb-1
              "
            />

          ) : (

            <p className="
              text-white
              text-sm
              font-medium
              truncate
            ">
              {value || "-"}
            </p>

          )}

        </div>

      </div>

    </div>
  );
}

/* =========================================================
   SIMPLE FIELD
========================================================= */

function SimpleField({
  icon,
  label,
  name,
  value,
  editing,
  onChange,
}) {
  return (
    <div>

      <label className="
        flex
        items-center
        gap-2
        text-xs
        text-gray-500
        mb-2
      ">
        {icon}
        {label}
      </label>

      {editing ? (

        <input
          type="text"
          name={name}
          value={value || ""}
          onChange={onChange}
          className="
            w-full
            px-4
            py-3
            rounded-xl
            bg-[#202026]
            border
            border-white/10
            text-white
            outline-none
            focus:border-purple-500
            transition
          "
        />

      ) : (

        <div className="
          px-4
          py-3
          rounded-xl
          bg-[#1b1b20]
          border
          border-white/[0.06]
          min-h-[46px]
          flex
          items-center
        ">

          <p className="
            text-white
            text-sm
          ">
            {value || "-"}
          </p>

        </div>

      )}

    </div>
  );
}

/* =========================================================
   TIME CARD
========================================================= */

function TimeCard({
  label,
  value,
  editing,
  name,
  onChange,
}) {
  return (
    <div className="
      relative
      overflow-hidden
      rounded-2xl
      bg-[#1b1b20]
      border
      border-white/[0.06]
      p-5
    ">

      {/* DECORATIVE GLOW */}

      <div className="
        absolute
        -right-8
        -top-8
        w-24
        h-24
        rounded-full
        bg-purple-500/5
        blur-2xl
      " />

      <div className="
        relative
        flex
        items-center
        gap-4
      ">

        <div className="
          w-11
          h-11
          shrink-0
          rounded-xl
          bg-gradient-to-br
          from-purple-500/15
          to-pink-500/10
          border
          border-purple-500/20
          flex
          items-center
          justify-center
          text-purple-400
        ">
          <Clock3 size={20} />
        </div>

        <div className="flex-1">

          <p className="
            text-xs
            text-gray-500
            mb-1
          ">
            {label}
          </p>

          {editing ? (

            <input
              type="time"
              name={name}
              value={value || ""}
              onChange={onChange}
              className="
                w-full
                px-3
                py-2
                rounded-lg
                bg-[#25252b]
                border
                border-white/10
                text-white
                outline-none
                focus:border-purple-500
                [color-scheme:dark]
              "
            />

          ) : (

            <p className="
              text-xl
              font-bold
              text-white
            ">
              {formatTime(value)}
            </p>

          )}

        </div>

      </div>

    </div>
  );
}