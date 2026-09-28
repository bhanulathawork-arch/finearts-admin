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

//   return `https://finearts-backend.onrender.com${image}`;
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

//     const [rawHour, rawMinute] = String(time).split(":");

//     let h = Number(rawHour);
//     const m = Number(rawMinute);

//     if (Number.isNaN(h) || Number.isNaN(m)) {
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

//     const [rawHour, rawMinute] = String(value).split(":");

//     let h = Number(rawHour);
//     const m = Number(rawMinute);

//     if (Number.isNaN(h) || Number.isNaN(m)) {
//       return "Select time";
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
//       `${String(finalHour).padStart(2, "0")}:${String(minute).padStart(
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

//   const selectMinute = (selectedMinute) => {
//     setMinute(selectedMinute);
//   };

//   /* =======================================================
//      CLOCK POSITION
//   ======================================================= */

//   const getPosition = (number, isMinute = false) => {
//     const angle =
//       (isMinute ? number / 5 : number % 12) * 30 - 90;

//     const radius = 40;

//     return {
//       left: `${
//         50 +
//         Math.cos((angle * Math.PI) / 180) * radius
//       }%`,

//       top: `${
//         50 +
//         Math.sin((angle * Math.PI) / 180) * radius
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
//         aria-label={`Select ${label || "time"}`}
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
//                 onClick={() => setStep("hour")}
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
//                 {String(hour).padStart(2, "0")}
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
//                 onClick={() => setStep("minute")}
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
//                 {String(minute).padStart(2, "0")}
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
//                   onClick={() => setPeriod("AM")}
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
//                   onClick={() => setPeriod("PM")}
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
//                 Array.from({ length: 12 }, (_, index) => {
//                   const number = index + 1;
//                   const selected = hour === number;

//                   return (
//                     <button
//                       key={number}
//                       type="button"
//                       onClick={() => selectHour(number)}
//                       className={`
//                         absolute
//                         -translate-x-1/2
//                         -translate-y-1/2
//                         w-8
//                         h-8
//                         rounded-full
//                         flex
//                         items-center
//                         justify-center
//                         text-xs
//                         font-semibold
//                         z-10
//                         transition
//                         ${
//                           selected
//                             ? "bg-purple-500 text-white shadow-md"
//                             : "text-gray-300 hover:bg-white/10"
//                         }
//                       `}
//                       style={getPosition(number)}
//                     >
//                       {number}
//                     </button>
//                   );
//                 })}

//               {/* MINUTES */}

//               {step === "minute" &&
//                 Array.from({ length: 12 }, (_, index) => {
//                   const number = index * 5;
//                   const selected = minute === number;

//                   return (
//                     <button
//                       key={number}
//                       type="button"
//                       onClick={() => selectMinute(number)}
//                       className={`
//                         absolute
//                         -translate-x-1/2
//                         -translate-y-1/2
//                         w-8
//                         h-8
//                         rounded-full
//                         flex
//                         items-center
//                         justify-center
//                         text-[10px]
//                         font-semibold
//                         z-10
//                         transition
//                         ${
//                           selected
//                             ? "bg-purple-500 text-white shadow-md"
//                             : "text-gray-300 hover:bg-white/10"
//                         }
//                       `}
//                       style={getPosition(number, true)}
//                     >
//                       {String(number).padStart(2, "0")}
//                     </button>
//                   );
//                 })}
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
//                 onClick={() => setStep("hour")}
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
//                 onClick={() => setStep("minute")}
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
//               onClick={() => setOpen(false)}
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

//   const [categories, setCategories] = useState([]);

//   const [loading, setLoading] = useState(false);

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

//   const [formData, setFormData] = useState({
//     name: "",

//     email: "",
//     phone_number: "",

//     address: "",

//     city: "",
//     state: "",
//     pincode: "",

//     start_time: "",
//     end_time: "",

//     timezone: "Asia/Kolkata",

//     selectedCategories: [],
//   });

//   /* =========================================================
//      LOAD LOGGED-IN ACCOUNT DETAILS

//      Priority:

//      1. Backend account data
//      2. Firebase email / phone
//      3. Existing form value
//   ========================================================= */

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(
//       auth,
//       (user) => {
//         console.log(
//           "================================="
//         );

//         console.log(
//           "FIREBASE AUTH USER"
//         );

//         console.log(
//           "================================="
//         );

//         /* ===================================================
//            USER NOT LOGGED IN
//         =================================================== */

//         if (!user) {
//           setAuthLoading(false);

//           toast.error(
//             "Please login before creating profile"
//           );

//           navigate(
//             "/institute-login",
//             {
//               replace: true,
//             }
//           );

//           return;
//         }

//         /* ===================================================
//            FIREBASE DATA
//         =================================================== */

//         const firebaseEmail =
//           user?.email || "";

//         const firebasePhone =
//           user?.phoneNumber || "";

//         /* ===================================================
//            BACKEND ACCOUNT DATA
           
//            InstituteLogin stores the logged-in institute
//            object in localStorage.
//         =================================================== */

//         let storedInstitute = null;

//         try {
//           const storedData =
//             localStorage.getItem(
//               "institute"
//             );

//           if (storedData) {
//             storedInstitute =
//               JSON.parse(
//                 storedData
//               );
//           }
//         } catch (error) {
//           console.warn(
//             "Unable to parse stored institute data:",
//             error
//           );
//         }

//         /* ===================================================
//            ACCOUNT OBJECT
//         =================================================== */

//         const storedAccount =
//           storedInstitute?.account || {};

//         const accountEmail =
//           storedAccount?.email ||
//           storedInstitute?.email ||
//           "";

//         const accountPhone =
//           storedAccount?.phone_number ||
//           storedAccount?.phone ||
//           storedInstitute?.phone_number ||
//           storedInstitute?.phone ||
//           "";

//         /* ===================================================
//            FINAL VALUES
//         =================================================== */

//         const finalEmail =
//           accountEmail ||
//           firebaseEmail ||
//           "";

//         const finalPhone =
//           accountPhone ||
//           firebasePhone ||
//           "";

//         /* ===================================================
//            DEBUG
//         =================================================== */

//         console.log(
//           "Firebase UID:",
//           user?.uid
//         );

//         console.log(
//           "Firebase Email:",
//           firebaseEmail
//         );

//         console.log(
//           "Firebase Phone:",
//           firebasePhone
//         );

//         console.log(
//           "Backend Account:",
//           storedAccount
//         );

//         console.log(
//           "Backend Account Email:",
//           accountEmail
//         );

//         console.log(
//           "Backend Account Phone:",
//           accountPhone
//         );

//         console.log(
//           "FINAL EMAIL:",
//           finalEmail
//         );

//         console.log(
//           "FINAL PHONE:",
//           finalPhone
//         );

//         /* ===================================================
//            AUTO-FILL FORM

//            IMPORTANT:
//            Email and phone are NOT readOnly.
//            User can edit them.
//         =================================================== */

//         setFormData((prev) => ({
//           ...prev,

//           email:
//             finalEmail ||
//             prev.email ||
//             "",

//           phone_number:
//             finalPhone ||
//             prev.phone_number ||
//             "",
//         }));

//         setAuthLoading(false);
//       }
//     );

//     return () => {
//       unsubscribe();
//     };
//   }, [navigate]);

//   /* =========================================================
//      FETCH CATEGORIES
//   ========================================================= */

//   const fetchCategories = async () => {
//     try {
//       setCategoriesLoading(true);

//       const response =
//         await API.get(
//           "/categories"
//         );

//       console.log(
//         "Categories API Response:",
//         response.data
//       );

//       let categoryData = [];

//       if (
//         Array.isArray(
//           response?.data?.data
//         )
//       ) {
//         categoryData =
//           response.data.data;
//       } else if (
//         Array.isArray(
//           response?.data
//         )
//       ) {
//         categoryData =
//           response.data;
//       }

//       setCategories(categoryData);
//     } catch (error) {
//       console.error(
//         "FETCH CATEGORIES ERROR:",
//         error
//       );

//       toast.error(
//         error?.response?.data
//           ?.message ||
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
//      HANDLE NORMAL INPUT
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
//      CATEGORY SELECT
//   ========================================================= */

//   const toggleCategory = (categoryId) => {
//     const id = Number(categoryId);

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

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     /* =====================================================
//        CATEGORY VALIDATION
//     ===================================================== */

//     if (
//       formData.selectedCategories
//         .length === 0
//     ) {
//       toast.error(
//         "Please select at least one category"
//       );

//       return;
//     }

//     /* =====================================================
//        TIME VALIDATION
//     ===================================================== */

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

//     /* =====================================================
//        EMAIL VALIDATION
//     ===================================================== */

//     if (!formData.email.trim()) {
//       toast.error(
//         "Please enter email"
//       );

//       return;
//     }

//     /* =====================================================
//        PHONE VALIDATION
//     ===================================================== */

//     if (!formData.phone_number.trim()) {
//       toast.error(
//         "Please enter phone number"
//       );

//       return;
//     }

//     /* =====================================================
//        FIREBASE USER
//     ===================================================== */

//     const currentUser =
//       auth.currentUser;

//     if (!currentUser) {
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

//     setLoading(true);

//     try {
//       /* ===================================================
//          FIREBASE TOKEN
//       =================================================== */

//       const firebaseToken =
//         await currentUser.getIdToken(
//           true
//         );

//       if (!firebaseToken) {
//         throw new Error(
//           "Firebase authentication token missing"
//         );
//       }

//       /* ===================================================
//          FORM DATA
//       =================================================== */

//       const payload =
//         new FormData();

//       /* ===================================================
//          INSTITUTE NAME
//       =================================================== */

//       payload.append(
//         "name",
//         formData.name.trim()
//       );

//       /* ===================================================
//          EMAIL

//          IMPORTANT:
//          This is the CURRENT edited value.
//       =================================================== */

//       payload.append(
//         "email",
//         formData.email.trim()
//       );

//       /* ===================================================
//          PHONE

//          IMPORTANT:
//          This is the CURRENT edited value.
//       =================================================== */

//       payload.append(
//         "phone_number",
//         formData.phone_number.trim()
//       );

//       /* ===================================================
//          ADDRESS
//       =================================================== */

//       payload.append(
//         "address",
//         formData.address.trim()
//       );

//       /* ===================================================
//          CITY
//       =================================================== */

//       payload.append(
//         "city",
//         formData.city.trim()
//       );

//       /* ===================================================
//          STATE
//       =================================================== */

//       payload.append(
//         "state",
//         formData.state.trim()
//       );

//       /* ===================================================
//          PINCODE
//       =================================================== */

//       payload.append(
//         "pincode",
//         formData.pincode.trim()
//       );

//       /* ===================================================
//          OPEN TIME
//       =================================================== */

//       payload.append(
//         "start_time",
//         formData.start_time
//       );

//       /* ===================================================
//          CLOSE TIME
//       =================================================== */

//       payload.append(
//         "end_time",
//         formData.end_time
//       );

//       /* ===================================================
//          TIMEZONE
//       =================================================== */

//       payload.append(
//         "timezone",
//         formData.timezone
//       );

//       /* ===================================================
//          CATEGORIES
//       =================================================== */

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

//       /* ===================================================
//          DEBUG
//       =================================================== */

//       console.log(
//         "================================="
//       );

//       console.log(
//         "SUBMITTING INSTITUTE PROFILE"
//       );

//       console.log(
//         "================================="
//       );

//       console.log(
//         "Institute:",
//         formData.name
//       );

//       console.log(
//         "Email:",
//         formData.email
//       );

//       console.log(
//         "Phone:",
//         formData.phone_number
//       );

//       console.log(
//         "Address:",
//         formData.address
//       );

//       console.log(
//         "City:",
//         formData.city
//       );

//       console.log(
//         "State:",
//         formData.state
//       );

//       console.log(
//         "Pincode:",
//         formData.pincode
//       );

//       console.log(
//         "Open Time:",
//         formData.start_time
//       );

//       console.log(
//         "Close Time:",
//         formData.end_time
//       );

//       console.log(
//         "Timezone:",
//         formData.timezone
//       );

//       console.log(
//         "Categories:",
//         categoryPayload
//       );

//       /* ===================================================
//          API
//       =================================================== */

//       const response =
//         await completeInstituteProfile(
//           payload,
//           firebaseToken
//         );

//       console.log(
//         "CREATE PROFILE RESPONSE:",
//         response
//       );

//       /* ===================================================
//          PROFILE CREATED
//       =================================================== */

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
//         error?.response?.data
//           ?.message ||
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
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Enter institute name"
//               required
//               autoComplete="organization"
//               className={inputClass}
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
//             {/* =================================================
//                 EMAIL
//             ================================================= */}

//             <div>
//               <label
//                 className={labelClass}
//               >
//                 Email
//               </label>

//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Enter email"
//                 required
//                 autoComplete="email"
//                 className={inputClass}
//               />

//               {formData.email && (
//                 <p
//                   className="
//                     text-[11px]
//                     text-purple-400
//                     mt-1.5
//                   "
//                 >
//                   ✓ Automatically fetched from your login account
//                 </p>
//               )}
//             </div>

//             {/* =================================================
//                 PHONE
//             ================================================= */}

//             <div>
//               <label
//                 className={labelClass}
//               >
//                 Phone
//               </label>

//               <input
//                 type="tel"
//                 name="phone_number"
//                 value={formData.phone_number}
//                 onChange={handleChange}
//                 placeholder="Enter mobile number"
//                 required
//                 autoComplete="tel"
//                 inputMode="tel"
//                 className={inputClass}
//               />

//               {formData.phone_number && (
//                 <p
//                   className="
//                     text-[11px]
//                     text-purple-400
//                     mt-1.5
//                   "
//                 >
//                   ✓ Automatically fetched from your login account
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
//               value={formData.address}
//               onChange={handleChange}
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
//                 className={labelClass}
//               >
//                 City
//               </label>

//               <input
//                 type="text"
//                 name="city"
//                 value={formData.city}
//                 onChange={handleChange}
//                 placeholder="City"
//                 required
//                 autoComplete="address-level2"
//                 className={inputClass}
//               />
//             </div>

//             {/* STATE */}

//             <div>
//               <label
//                 className={labelClass}
//               >
//                 State
//               </label>

//               <input
//                 type="text"
//                 name="state"
//                 value={formData.state}
//                 onChange={handleChange}
//                 placeholder="State"
//                 required
//                 autoComplete="address-level1"
//                 className={inputClass}
//               />
//             </div>

//             {/* PINCODE */}

//             <div>
//               <label
//                 className={labelClass}
//               >
//                 Pincode
//               </label>

//               <input
//                 type="text"
//                 name="pincode"
//                 value={formData.pincode}
//                 onChange={handleChange}
//                 placeholder="Pincode"
//                 required
//                 inputMode="numeric"
//                 autoComplete="postal-code"
//                 className={inputClass}
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
//                 className={labelClass}
//               >
//                 Open Time
//               </label>

//               <TimePicker
//                 label="Open Time"
//                 value={formData.start_time}
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
//               <label
//                 className={labelClass}
//               >
//                 Close Time
//               </label>

//               <TimePicker
//                 label="Close Time"
//                 value={formData.end_time}
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
//               <label
//                 className={labelClass}
//               >
//                 Timezone
//               </label>

//               <select
//                 name="timezone"
//                 value={formData.timezone}
//                 onChange={handleChange}
//                 className={`
//                   ${inputClass}
//                   cursor-pointer
//                 `}
//                 style={{
//                   colorScheme: "dark",
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

//               {formData.selectedCategories.length >
//                 0 && (
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
//             ) : categories.length === 0 ? (
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
//                   onClick={fetchCategories}
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
//                 {categories.map((category) => {
//                   const categoryId =
//                     Number(category.id);

//                   const selected =
//                     formData.selectedCategories.includes(
//                       categoryId
//                     );

//                   const imageUrl =
//                     getCategoryImage(
//                       category
//                     );

//                   return (
//                     <button
//                       key={category.id}
//                       type="button"
//                       onClick={() =>
//                         toggleCategory(
//                           categoryId
//                         )
//                       }
//                       className={`
//                         group
//                         relative
//                         overflow-hidden
//                         rounded-2xl
//                         border
//                         text-left
//                         transition-all
//                         duration-200
//                         ${
//                           selected
//                             ? "border-purple-500 ring-2 ring-purple-500/30 bg-purple-500/10"
//                             : "border-white/10 bg-[#242428] hover:border-purple-500/50 hover:-translate-y-1"
//                         }
//                       `}
//                     >
//                       {/* IMAGE */}

//                       <div
//                         className="
//                           relative
//                           w-full
//                           h-32
//                           bg-[#303036]
//                           overflow-hidden
//                         "
//                       >
//                         {imageUrl ? (
//                           <img
//                             src={imageUrl}
//                             alt={category.name}
//                             className="
//                               w-full
//                               h-full
//                               object-cover
//                               transition
//                               duration-300
//                               group-hover:scale-105
//                             "
//                             onError={(e) => {
//                               e.currentTarget.style.display =
//                                 "none";
//                             }}
//                           />
//                         ) : (
//                           <div
//                             className="
//                               w-full
//                               h-full
//                               flex
//                               items-center
//                               justify-center
//                               text-4xl
//                             "
//                           >
//                             🎨
//                           </div>
//                         )}

//                         {/* IMAGE GRADIENT */}

//                         <div
//                           className="
//                             absolute
//                             inset-0
//                             bg-gradient-to-t
//                             from-black/70
//                             via-transparent
//                             to-transparent
//                           "
//                         />

//                         {/* SELECT CHECK */}

//                         <div
//                           className={`
//                             absolute
//                             top-3
//                             right-3
//                             w-7
//                             h-7
//                             rounded-full
//                             border
//                             flex
//                             items-center
//                             justify-center
//                             transition
//                             ${
//                               selected
//                                 ? "bg-purple-500 border-purple-400 text-white"
//                                 : "bg-black/40 border-white/40 text-transparent"
//                             }
//                           `}
//                         >
//                           ✓
//                         </div>
//                       </div>

//                       {/* CATEGORY TEXT */}

//                       <div
//                         className="
//                           px-4
//                           py-3
//                         "
//                       >
//                         <p
//                           className={`
//                             font-semibold
//                             truncate
//                             ${
//                               selected
//                                 ? "text-purple-300"
//                                 : "text-white"
//                             }
//                           `}
//                         >
//                           {category.name}
//                         </p>

//                         <p
//                           className="
//                             text-[11px]
//                             text-gray-500
//                             mt-1
//                           "
//                         >
//                           {selected
//                             ? "Selected"
//                             : "Click to select"}
//                         </p>
//                       </div>
//                     </button>
//                   );
//                 })}
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
//                 formData.selectedCategories.length ===
//                   0
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

  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }

  return `https://finearts-backend.onrender.com${image}`;
};

/* =========================================================
   TIME PICKER
========================================================= */

function TimePicker({ value, onChange, label }) {
  const [open, setOpen] = useState(false);
  const [hour, setHour] = useState(12);
  const [minute, setMinute] = useState(0);
  const [period, setPeriod] = useState("AM");
  const [step, setStep] = useState("hour");

  /* -------------------------------------------------------
     LOAD EXISTING TIME
  ------------------------------------------------------- */

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

  /* -------------------------------------------------------
     OPEN PICKER
  ------------------------------------------------------- */

  const openPicker = () => {
    loadValue(value);
    setStep("hour");
    setOpen((prev) => !prev);
  };

  /* -------------------------------------------------------
     DISPLAY TIME
  ------------------------------------------------------- */

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

  /* -------------------------------------------------------
     SET TIME
  ------------------------------------------------------- */

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

    const formattedTime = `${String(finalHour).padStart(
      2,
      "0"
    )}:${String(minute).padStart(2, "0")}`;

    onChange(formattedTime);
    setOpen(false);
  };

  /* -------------------------------------------------------
     SELECT HOUR
  ------------------------------------------------------- */

  const selectHour = (selectedHour) => {
    setHour(selectedHour);
    setStep("minute");
  };

  /* -------------------------------------------------------
     SELECT MINUTE
  ------------------------------------------------------- */

  const selectMinute = (selectedMinute) => {
    setMinute(selectedMinute);
  };

  /* -------------------------------------------------------
     CLOCK POSITION
  ------------------------------------------------------- */

  const getPosition = (number, isMinute = false) => {
    const angle =
      (isMinute ? number / 5 : number % 12) * 30 - 90;

    const radius = 40;

    return {
      left: `${
        50 + Math.cos((angle * Math.PI) / 180) * radius
      }%`,
      top: `${
        50 + Math.sin((angle * Math.PI) / 180) * radius
      }%`,
    };
  };

  return (
    <div className="relative w-full">
      {/* TIME FIELD */}

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

      {/* TIME POPUP */}

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
                  transform: `translateX(-50%) translateY(-100%) rotate(${
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
  const [categoriesLoading, setCategoriesLoading] =
    useState(true);
  const [authLoading, setAuthLoading] = useState(true);

  const [loginMethod, setLoginMethod] = useState("");

  const [emailAutoFetched, setEmailAutoFetched] =
    useState(false);

  const [phoneAutoFetched, setPhoneAutoFetched] =
    useState(false);

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

  /* =======================================================
     ERRORS
  ======================================================= */

  const [errors, setErrors] = useState({
    email: "",
    phone_number: "",
    pincode: "",
  });

  /* =======================================================
     EMAIL VALIDATION
  ======================================================= */

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      email.trim()
    );
  };

  /* =======================================================
     PHONE VALIDATION
  ======================================================= */

  const isValidPhone = (phone) => {
    return /^[6-9]\d{9}$/.test(phone);
  };

  /* =======================================================
     PINCODE VALIDATION
  ======================================================= */

  const isValidPincode = (pincode) => {
    return /^\d{6}$/.test(pincode);
  };

  /* =======================================================
     NORMALIZE PHONE NUMBER
     
     Firebase phone can be:
     
     +918945678900
     +91 8945678900
     8945678900
     
     We store only 10 digits.
  ======================================================= */

  const normalizePhoneNumber = (phone) => {
    if (!phone) return "";

    const digits = String(phone).replace(/\D/g, "");

    if (digits.length >= 10) {
      return digits.slice(-10);
    }

    return digits;
  };

  /* =======================================================
     LOAD LOGGED-IN ACCOUNT DETAILS
     
     Priority:
     
     1. Firebase login information
     2. localStorage account information
     3. Existing form value
     
     Both email and phone remain editable.
  ======================================================= */

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        console.log(
          "================================="
        );

        console.log("FIREBASE AUTH USER");

        console.log(
          "================================="
        );

        /* -------------------------------------------------
           USER NOT LOGGED IN
        ------------------------------------------------- */

        if (!user) {
          setAuthLoading(false);

          toast.error(
            "Please login before creating profile"
          );

          navigate("/institute-login", {
            replace: true,
          });

          return;
        }

        /* -------------------------------------------------
           FIREBASE EMAIL
        ------------------------------------------------- */

        const firebaseEmail =
          user.email || "";

        /* -------------------------------------------------
           FIREBASE PHONE
        ------------------------------------------------- */

        const firebasePhone =
          normalizePhoneNumber(
            user.phoneNumber || ""
          );

        /* -------------------------------------------------
           DETECT LOGIN METHOD
        ------------------------------------------------- */

        const providerIds =
          user.providerData?.map(
            (provider) => provider.providerId
          ) || [];

        const isPhoneLogin =
          providerIds.includes("phone");

        const isEmailLogin =
          providerIds.includes("password") ||
          providerIds.includes("google.com");

        if (isPhoneLogin) {
          setLoginMethod("phone");
        } else if (isEmailLogin) {
          setLoginMethod("email");
        } else {
          setLoginMethod("");
        }

        /* -------------------------------------------------
           LOCAL STORAGE ACCOUNT
        ------------------------------------------------- */

        let storedInstitute = null;

        try {
          const storedData =
            localStorage.getItem("institute");

          if (storedData) {
            storedInstitute =
              JSON.parse(storedData);
          }
        } catch (error) {
          console.warn(
            "Unable to parse stored institute:",
            error
          );
        }

        const storedAccount =
          storedInstitute?.account || {};

        /* -------------------------------------------------
           ACCOUNT EMAIL
        ------------------------------------------------- */

        const accountEmail =
          storedAccount?.email ||
          storedInstitute?.email ||
          "";

        /* -------------------------------------------------
           ACCOUNT PHONE
        ------------------------------------------------- */

        const accountPhone =
          normalizePhoneNumber(
            storedAccount?.phone_number ||
              storedAccount?.phone ||
              storedInstitute?.phone_number ||
              storedInstitute?.phone ||
              ""
          );

        /* -------------------------------------------------
           FINAL EMAIL
           
           Firebase is preferred for login.
        ------------------------------------------------- */

        const finalEmail =
          firebaseEmail ||
          accountEmail ||
          "";

        /* -------------------------------------------------
           FINAL PHONE
           
           Firebase phone is preferred for mobile login.
        ------------------------------------------------- */

        const finalPhone =
          firebasePhone ||
          accountPhone ||
          "";

        console.log(
          "Firebase UID:",
          user.uid
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
          "Account Email:",
          accountEmail
        );

        console.log(
          "Account Phone:",
          accountPhone
        );

        console.log(
          "Login Method:",
          isPhoneLogin
            ? "PHONE"
            : isEmailLogin
            ? "EMAIL"
            : "UNKNOWN"
        );

        console.log(
          "Final Email:",
          finalEmail
        );

        console.log(
          "Final Phone:",
          finalPhone
        );

        /* -------------------------------------------------
           AUTO FILL FORM
           
           IMPORTANT:
           
           These fields are NOT readOnly.
           User can edit them.
        ------------------------------------------------- */

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

        if (finalEmail) {
          setEmailAutoFetched(true);
        }

        if (finalPhone) {
          setPhoneAutoFetched(true);
        }

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

      const response = await API.get(
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
        Array.isArray(response?.data)
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
        error?.response?.data?.message ||
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
     HANDLE INPUT
  ========================================================= */

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    /* -------------------------------------------------------
       PHONE
       
       ONLY NUMBERS
       MAX 10 DIGITS
    ------------------------------------------------------- */

    if (name === "phone_number") {
      const cleanedValue = value
        .replace(/\D/g, "")
        .slice(0, 10);

      setFormData((prev) => ({
        ...prev,
        phone_number: cleanedValue,
      }));

      setPhoneAutoFetched(false);

      if (
        cleanedValue &&
        !/^[6-9]/.test(cleanedValue)
      ) {
        setErrors((prev) => ({
          ...prev,
          phone_number:
            "Mobile number must start with 6, 7, 8 or 9",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          phone_number: "",
        }));
      }

      return;
    }

    /* -------------------------------------------------------
       PINCODE
       
       ONLY NUMBERS
       MAX 6 DIGITS
    ------------------------------------------------------- */

    if (name === "pincode") {
      const cleanedValue = value
        .replace(/\D/g, "")
        .slice(0, 6);

      setFormData((prev) => ({
        ...prev,
        pincode: cleanedValue,
      }));

      if (
        cleanedValue &&
        cleanedValue.length !== 6
      ) {
        setErrors((prev) => ({
          ...prev,
          pincode:
            "Pincode must contain exactly 6 digits",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          pincode: "",
        }));
      }

      return;
    }

    /* -------------------------------------------------------
       EMAIL
    ------------------------------------------------------- */

    if (name === "email") {
      setFormData((prev) => ({
        ...prev,
        email: value,
      }));

      setEmailAutoFetched(false);

      if (
        value &&
        !isValidEmail(value)
      ) {
        setErrors((prev) => ({
          ...prev,
          email:
            "Please enter a valid email address",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          email: "",
        }));
      }

      return;
    }

    /* -------------------------------------------------------
       NORMAL INPUT
    ------------------------------------------------------- */

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =========================================================
     CATEGORY SELECT
  ========================================================= */

  const toggleCategory = (
    categoryId
  ) => {
    const id = Number(categoryId);

    setFormData((prev) => {
      const alreadySelected =
        prev.selectedCategories.includes(id);

      if (alreadySelected) {
        return {
          ...prev,

          selectedCategories:
            prev.selectedCategories.filter(
              (item) => item !== id
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
     VALIDATE FORM
  ========================================================= */

  const validateForm = () => {
    const newErrors = {
      email: "",
      phone_number: "",
      pincode: "",
    };

    let valid = true;

    /* -------------------------------------------------------
       EMAIL
    ------------------------------------------------------- */

    if (!formData.email.trim()) {
      newErrors.email =
        "Email is required";

      valid = false;
    } else if (
      !isValidEmail(formData.email)
    ) {
      newErrors.email =
        "Please enter a valid email address";

      valid = false;
    }

    /* -------------------------------------------------------
       PHONE
    ------------------------------------------------------- */

    if (!formData.phone_number.trim()) {
      newErrors.phone_number =
        "Mobile number is required";

      valid = false;
    } else if (
      !isValidPhone(
        formData.phone_number
      )
    ) {
      newErrors.phone_number =
        "Enter a valid 10-digit mobile number";

      valid = false;
    }

    /* -------------------------------------------------------
       PINCODE
    ------------------------------------------------------- */

    if (!formData.pincode.trim()) {
      newErrors.pincode =
        "Pincode is required";

      valid = false;
    } else if (
      !isValidPincode(
        formData.pincode
      )
    ) {
      newErrors.pincode =
        "Pincode must contain exactly 6 digits";

      valid = false;
    }

    setErrors(newErrors);

    if (!valid) {
      toast.error(
        "Please correct the highlighted fields"
      );
    }

    return valid;
  };

  /* =========================================================
     SUBMIT PROFILE
  ========================================================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    /* -------------------------------------------------------
       REQUIRED BASIC FIELDS
    ------------------------------------------------------- */

    if (!formData.name.trim()) {
      toast.error(
        "Please enter institute name"
      );
      return;
    }

    if (!formData.address.trim()) {
      toast.error(
        "Please enter institute address"
      );
      return;
    }

    if (!formData.city.trim()) {
      toast.error(
        "Please enter city"
      );
      return;
    }

    if (!formData.state.trim()) {
      toast.error(
        "Please enter state"
      );
      return;
    }

    /* -------------------------------------------------------
       EMAIL / PHONE / PINCODE VALIDATION
    ------------------------------------------------------- */

    if (!validateForm()) {
      return;
    }

    /* -------------------------------------------------------
       CATEGORY VALIDATION
    ------------------------------------------------------- */

    if (
      formData.selectedCategories.length ===
      0
    ) {
      toast.error(
        "Please select at least one category"
      );

      return;
    }

    /* -------------------------------------------------------
       TIME VALIDATION
    ------------------------------------------------------- */

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

    /* -------------------------------------------------------
       FIREBASE USER
    ------------------------------------------------------- */

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
      /* -----------------------------------------------------
         FIREBASE TOKEN
      ----------------------------------------------------- */

      const firebaseToken =
        await currentUser.getIdToken(
          true
        );

      if (!firebaseToken) {
        throw new Error(
          "Firebase authentication token missing"
        );
      }

      /* -----------------------------------------------------
         FORM DATA
      ----------------------------------------------------- */

      const payload =
        new FormData();

      /* -----------------------------------------------------
         NAME
      ----------------------------------------------------- */

      payload.append(
        "name",
        formData.name.trim()
      );

      /* -----------------------------------------------------
         EMAIL
      ----------------------------------------------------- */

      payload.append(
        "email",
        formData.email.trim()
      );

      /* -----------------------------------------------------
         PHONE
      ----------------------------------------------------- */

      payload.append(
        "phone_number",
        formData.phone_number.trim()
      );

      /* -----------------------------------------------------
         ADDRESS
      ----------------------------------------------------- */

      payload.append(
        "address",
        formData.address.trim()
      );

      /* -----------------------------------------------------
         CITY
      ----------------------------------------------------- */

      payload.append(
        "city",
        formData.city.trim()
      );

      /* -----------------------------------------------------
         STATE
      ----------------------------------------------------- */

      payload.append(
        "state",
        formData.state.trim()
      );

      /* -----------------------------------------------------
         PINCODE
      ----------------------------------------------------- */

      payload.append(
        "pincode",
        formData.pincode.trim()
      );

      /* -----------------------------------------------------
         OPEN TIME
      ----------------------------------------------------- */

      payload.append(
        "start_time",
        formData.start_time
      );

      /* -----------------------------------------------------
         CLOSE TIME
      ----------------------------------------------------- */

      payload.append(
        "end_time",
        formData.end_time
      );

      /* -----------------------------------------------------
         TIMEZONE
      ----------------------------------------------------- */

      payload.append(
        "timezone",
        formData.timezone
      );

      /* -----------------------------------------------------
         CATEGORIES
      ----------------------------------------------------- */

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

      /* -----------------------------------------------------
         DEBUG
      ----------------------------------------------------- */

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

      /* -----------------------------------------------------
         API
      ----------------------------------------------------- */

      const response =
        await completeInstituteProfile(
          payload,
          firebaseToken
        );

      console.log(
        "CREATE PROFILE RESPONSE:",
        response
      );

      /* -----------------------------------------------------
         PROFILE CREATED
      ----------------------------------------------------- */

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

  const errorClass =
    "text-red-400 text-xs mt-1.5";

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
     MAIN UI
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
              text-center
            "
          >
            Complete institute details
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
          noValidate
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
              className={inputClass}
            />
          </div>

          {/* =================================================
              EMAIL + PHONE
          ================================================= */}

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-4
            "
          >
            {/* EMAIL */}

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
                onBlur={() => {
                  if (
                    formData.email &&
                    !isValidEmail(
                      formData.email
                    )
                  ) {
                    setErrors((prev) => ({
                      ...prev,
                      email:
                        "Please enter a valid email address",
                    }));
                  }
                }}
                placeholder="Enter email"
                required
                autoComplete="email"
                className={`${inputClass} ${
                  errors.email
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : ""
                }`}
              />

              {emailAutoFetched &&
                formData.email && (
                  <p
                    className="
                      text-[11px]
                      text-purple-400
                      mt-1.5
                    "
                  >
                    ✓ Email automatically fetched
                    from your login account
                  </p>
                )}

              {errors.email && (
                <p
                  className={errorClass}
                >
                  {errors.email}
                </p>
              )}
            </div>

            {/* PHONE */}

            <div>
              <label
                className={labelClass}
              >
                Phone
              </label>

              <input
                type="tel"
                name="phone_number"
                value={
                  formData.phone_number
                }
                onChange={handleChange}
                onBlur={() => {
                  if (
                    formData.phone_number &&
                    !isValidPhone(
                      formData.phone_number
                    )
                  ) {
                    setErrors((prev) => ({
                      ...prev,
                      phone_number:
                        "Enter a valid 10-digit mobile number",
                    }));
                  }
                }}
                placeholder="Enter 10-digit mobile number"
                required
                maxLength={10}
                inputMode="numeric"
                autoComplete="tel"
                className={`${inputClass} ${
                  errors.phone_number
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : ""
                }`}
              />

              {phoneAutoFetched &&
                formData.phone_number && (
                  <p
                    className="
                      text-[11px]
                      text-purple-400
                      mt-1.5
                    "
                  >
                    ✓ Mobile number automatically
                    fetched from your login account
                  </p>
                )}

              {errors.phone_number && (
                <p
                  className={errorClass}
                >
                  {errors.phone_number}
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
                onBlur={() => {
                  if (
                    formData.pincode &&
                    !isValidPincode(
                      formData.pincode
                    )
                  ) {
                    setErrors((prev) => ({
                      ...prev,
                      pincode:
                        "Pincode must contain exactly 6 digits",
                    }));
                  }
                }}
                placeholder="6-digit Pincode"
                required
                maxLength={6}
                inputMode="numeric"
                autoComplete="postal-code"
                className={`${inputClass} ${
                  errors.pincode
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : ""
                }`}
              />

              {errors.pincode && (
                <p
                  className={errorClass}
                >
                  {errors.pincode}
                </p>
              )}
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
                value={
                  formData.start_time
                }
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
                value={
                  formData.end_time
                }
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
                value={
                  formData.timezone
                }
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

              {formData.selectedCategories
                .length > 0 && (
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
                  onClick={
                    fetchCategories
                  }
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
                {categories.map(
                  (category) => {
                    const categoryId =
                      Number(
                        category.id
                      );

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
                        key={
                          category.id
                        }
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
                              src={
                                imageUrl
                              }
                              alt={
                                category.name
                              }
                              className="
                                w-full
                                h-full
                                object-cover
                                transition
                                duration-300
                                group-hover:scale-105
                              "
                              onError={(
                                e
                              ) => {
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

                          {/* CHECK */}

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

                        {/* CATEGORY CONTENT */}

                        <div className="p-4">
                          <h3
                            className="
                              text-white
                              font-semibold
                              text-sm
                            "
                          >
                            {category.name ||
                              "Category"}
                          </h3>

                          {category.description && (
                            <p
                              className="
                                text-gray-400
                                text-xs
                                mt-1
                                line-clamp-2
                              "
                            >
                              {
                                category.description
                              }
                            </p>
                          )}
                        </div>
                      </button>
                    );
                  }
                )}
              </div>
            )}
          </div>

          {/* =================================================
              SUBMIT BUTTON
          ================================================= */}

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              mt-6
              py-4
              rounded-xl
              bg-gradient-to-r
              from-purple-600
              to-pink-500
              hover:from-purple-700
              hover:to-pink-600
              disabled:opacity-50
              disabled:cursor-not-allowed
              text-white
              font-bold
              text-base
              transition
              shadow-lg
              shadow-purple-500/20
            "
          >
            {loading
              ? "Submitting..."
              : "Send For Approval"}
          </button>
        </form>
      </div>
    </div>
  );
}