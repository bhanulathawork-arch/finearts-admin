// import { useNavigate } from "react-router-dom";
// import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import toast from "react-hot-toast";
// import { auth } from "../config/firebase";

// export default function InstituteLogin() {
//   const navigate = useNavigate();

//  const handleGoogleLogin = async () => {
//   try {
//     const provider = new GoogleAuthProvider();

//     const result = await signInWithPopup(
//       auth,
//       provider
//     );
// const firebaseToken =
//   await result.user.getIdToken(true);

// localStorage.setItem(
//   "token",
//   firebaseToken
// );

// localStorage.setItem(
//   "firebaseUser",
//   JSON.stringify(result.user)
// );

// localStorage.setItem(
//   "role",
//   "INSTITUTE"
// );
   
//     toast.success(
//       "Login Successful"
//     );


//     try {

//       const res = await fetch(
//         "https://finearts-backend.onrender.com/api/institutes/profile",
//         {
//           headers: {
//             Authorization: `Bearer ${firebaseToken}`,
//           },
//         }
//       );

//       const data = await res.json();

//       if (
//         data.success &&
//         data.data
//       ) {

//         if (
//           data.data.approval_status ===
//           "APPROVED"
//         ) {
//           navigate(
//             "/institute/dashboard"
//           );
//         } else {
//           navigate(
//             "/institute/pending"
//           );
//         }

//       } else {

//         navigate(
//           "/institute/create-profile"
//         );

//       }

//     } catch {

//       navigate(
//         "/institute/create-profile"
//       );

//     }

//   } catch (err) {

//     console.error(err);

//     toast.error(
//       "Google Login Failed"
//     );

//   }
// };

//   return (
//     <div className="min-h-screen bg-[#08080c] flex items-center justify-center">
//       <div className="w-[430px] bg-[#18181d] border border-[#33333a] rounded-3xl p-10">

//         <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-4xl font-bold mb-6">
//           IN
//         </div>

//         <h1 className="text-4xl font-bold text-center text-purple-400 mb-2">
//           Institute Login
//         </h1>

//         <p className="text-center text-gray-400 mb-8">
//           Sign in with Google
//         </p>

//         <button
//           onClick={handleGoogleLogin}
//           className="w-full py-4 rounded-xl bg-white text-black font-semibold flex items-center justify-center gap-3"
//         >
//           <img
//             src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
//             alt="Google"
//             className="w-6 h-6"
//           />
//           Continue with Google
//         </button>

//       </div>
//     </div>
//   );
// }


// // import { useNavigate } from "react-router-dom";
// // import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// // import toast from "react-hot-toast";
// // import { auth } from "../config/firebase";
// // import API from "../services/api";

// // export default function InstituteLogin() {
// //   const navigate = useNavigate();

// //   const handleGoogleLogin = async () => {
// //     try {
// //       const provider = new GoogleAuthProvider();

// //       const result = await signInWithPopup(
// //         auth,
// //         provider
// //       );

// //       const token = await result.user.getIdToken(true);

// //       const response = await API.post(
// //         "/institutes/login",
// //         {},
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );

// //       const { account, institute } =
// //         response.data.data;

// //       const next_step =
// //         response.data.next_step;

// //       localStorage.setItem("token", token);
// //       localStorage.setItem(
// //         "role",
// //         "INSTITUTE"
// //       );

// //       localStorage.setItem(
// //         "institute",
// //         JSON.stringify({
// //           account,
// //           institute,
// //         })
// //       );

// //       toast.success("Login Successful");

// //       switch (next_step) {
// //         case "COMPLETE_PROFILE":
// //           navigate(
// //             "/institute/create-profile"
// //           );
// //           break;

// //         case "WAITING_APPROVAL":
// //           navigate(
// //             "/institute/pending"
// //           );
// //           break;

// //         case "DASHBOARD":
// //           navigate(
// //             "/institute/dashboard"
// //           );
// //           break;

// //         default:
// //           navigate(
// //             "/institute/create-profile"
// //           );
// //       }
// //     } catch (err) {
// //       console.error(err);

// //       toast.error(
// //         err?.response?.data?.message ||
// //           "Google Login Failed"
// //       );
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-[#08080c] flex items-center justify-center">
// //       <div className="w-[430px] bg-[#18181d] border border-[#33333a] rounded-3xl p-10">

// //         <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-4xl font-bold mb-6">
// //           IN
// //         </div>

// //         <h1 className="text-4xl font-bold text-center text-purple-400 mb-2">
// //           Institute Login
// //         </h1>

// //         <p className="text-center text-gray-400 mb-8">
// //           Sign in with Google
// //         </p>

// //         <button
// //           onClick={handleGoogleLogin}
// //           className="w-full py-4 rounded-xl bg-white text-black font-semibold flex items-center justify-center gap-3"
// //         >
// //           <img
// //             src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
// //             alt="Google"
// //             className="w-6 h-6"
// //           />

// //           Continue with Google
// //         </button>

// //       </div>
// //     </div>
// //   );
// // }


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import toast from "react-hot-toast";

import { auth } from "../config/firebase";
import API from "../services/api";

export default function InstituteLogin() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);


  /* =========================================================
     GOOGLE LOGIN
  ========================================================= */

  const handleGoogleLogin = async () => {

    if (loading) return;

    try {

      setLoading(true);

      console.log(
        "================================="
      );

      console.log(
        "INSTITUTE GOOGLE LOGIN START"
      );


      /* =====================================================
         1. FIREBASE GOOGLE LOGIN
      ===================================================== */

      const provider =
        new GoogleAuthProvider();

      provider.setCustomParameters({
        prompt: "select_account",
      });


      const result =
        await signInWithPopup(
          auth,
          provider
        );


      const firebaseUser =
        result.user;


      console.log(
        "Firebase User:",
        firebaseUser
      );

      console.log(
        "Firebase Email:",
        firebaseUser.email
      );


      if (!firebaseUser) {
        throw new Error(
          "Firebase user was not created"
        );
      }


      /* =====================================================
         2. GET FIREBASE ID TOKEN
      ===================================================== */

      const firebaseToken =
        await firebaseUser.getIdToken(
          true
        );


      console.log(
        "Firebase ID Token:",
        firebaseToken
          ? "FOUND"
          : "NOT FOUND"
      );


      if (!firebaseToken) {
        throw new Error(
          "Firebase ID token was not generated"
        );
      }


      /* =====================================================
         3. CALL BACKEND
         
         IMPORTANT:
         Explicitly send Firebase ID token.
      ===================================================== */

      console.log(
        "Calling:",
        "/institutes/login"
      );


      const response =
        await API.post(
          "/institutes/login",
          {},
          {
            headers: {
              Authorization:
                `Bearer ${firebaseToken}`,
            },
          }
        );


      console.log(
        "================================="
      );

      console.log(
        "INSTITUTE LOGIN RESPONSE"
      );

      console.log(
        response.data
      );

      console.log(
        "================================="
      );


      /* =====================================================
         4. READ RESPONSE
      ===================================================== */

      const data =
        response?.data?.data;


      if (!data) {
        throw new Error(
          "Invalid institute login response"
        );
      }


      const {
        account,
        institute,
      } = data;


      const nextStep =
        response?.data?.next_step;


      /* =====================================================
         5. SAVE INSTITUTE DATA
         
         DO NOT SAVE FIREBASE TOKEN
         AS localStorage "token".
      ===================================================== */

      localStorage.setItem(
        "role",
        "INSTITUTE"
      );


      localStorage.setItem(
        "institute",
        JSON.stringify({
          account,
          institute,
        })
      );


      /*
       * Remove old generic token if it exists.
       */

      localStorage.removeItem(
        "token"
      );


      /*
       * IMPORTANT:
       * Never overwrite adminToken.
       */

      console.log(
        "Institute authentication successful"
      );


      toast.success(
        "Login Successful"
      );


      /* =====================================================
         6. NAVIGATION
      ===================================================== */

      switch (nextStep) {

        case "COMPLETE_PROFILE":

          navigate(
            "/institute/create-profile",
            {
              replace: true,
            }
          );

          break;


        case "WAITING_APPROVAL":

          navigate(
            "/institute/pending",
            {
              replace: true,
            }
          );

          break;


        case "DASHBOARD":

          navigate(
            "/institute/dashboard",
            {
              replace: true,
            }
          );

          break;


        default:

          navigate(
            "/institute/create-profile",
            {
              replace: true,
            }
          );
      }

    } catch (err) {

      console.error(
        "================================="
      );

      console.error(
        "INSTITUTE GOOGLE LOGIN ERROR"
      );

      console.error(
        err
      );

      console.error(
        "Response:",
        err?.response?.data
      );

      console.error(
        "Status:",
        err?.response?.status
      );

      console.error(
        "================================="
      );


      /*
       * If backend rejected the Firebase token,
       * sign out Firebase so we don't leave
       * the browser in a half-authenticated state.
       */

      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Google Login Failed";


      toast.error(
        message
      );

    } finally {

      setLoading(false);

    }
  };


  /* =========================================================
     UI
  ========================================================= */

  return (
    <div className="min-h-screen bg-[#08080c] flex items-center justify-center">

      <div className="w-[430px] bg-[#18181d] border border-[#33333a] rounded-3xl p-10">

        {/* LOGO */}

        <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-4xl font-bold mb-6">
          IN
        </div>


        {/* TITLE */}

        <h1 className="text-4xl font-bold text-center text-purple-400 mb-2">
          Institute Login
        </h1>


        <p className="text-center text-gray-400 mb-8">
          Sign in with Google
        </p>


        {/* GOOGLE BUTTON */}

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full py-4 rounded-xl bg-white text-black font-semibold flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >

          {loading ? (
            <span>
              Signing in...
            </span>
          ) : (
            <>
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                className="w-6 h-6"
              />

              <span>
                Continue with Google
              </span>
            </>
          )}

        </button>

      </div>

    </div>
  );
}










// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// import {
//   RecaptchaVerifier,
//   signInWithPhoneNumber,
//   GoogleAuthProvider,
//   signInWithPopup,
// } from "firebase/auth";

// import toast from "react-hot-toast";

// import { auth } from "../config/firebase";
// import API from "../services/api";

// export default function InstituteLogin() {
//   const navigate = useNavigate();

//   const [loginMethod, setLoginMethod] = useState("phone");

//   const [phone, setPhone] = useState("");
//   const [otp, setOtp] = useState("");

//   const [confirmationResult, setConfirmationResult] =
//     useState(null);

//   const [loading, setLoading] = useState(false);

//   /* =========================================================
//      CLEANUP RECAPTCHA
//   ========================================================= */

//   useEffect(() => {
//     return () => {
//       try {
//         if (window.recaptchaVerifier) {
//           window.recaptchaVerifier.clear();
//           window.recaptchaVerifier = null;
//         }
//       } catch (error) {
//         console.error(
//           "RECAPTCHA CLEANUP ERROR:",
//           error
//         );
//       }
//     };
//   }, []);

//   /* =========================================================
//      SETUP RECAPTCHA
//   ========================================================= */

//   const setupRecaptcha = async () => {
//     try {
//       if (window.recaptchaVerifier) {
//         try {
//           window.recaptchaVerifier.clear();
//         } catch (error) {
//           console.warn(
//             "Old recaptcha cleanup failed:",
//             error
//           );
//         }

//         window.recaptchaVerifier = null;
//       }

//       const verifier = new RecaptchaVerifier(
//         auth,
//         "institute-recaptcha-container",
//         {
//           size: "invisible",
//           callback: () => {
//             console.log(
//               "Institute reCAPTCHA verified"
//             );
//           },
//           "expired-callback": () => {
//             console.log(
//               "Institute reCAPTCHA expired"
//             );
//           },
//         }
//       );

//       window.recaptchaVerifier = verifier;

//       await verifier.render();

//       return verifier;
//     } catch (error) {
//       console.error(
//         "RECAPTCHA SETUP ERROR:",
//         error
//       );

//       throw error;
//     }
//   };

//   /* =========================================================
//      PROCESS INSTITUTE LOGIN
     
//      This is shared by:
//      - Phone OTP
//      - Google
//   ========================================================= */

//   const processInstituteLogin = async (
//     firebaseUser
//   ) => {
//     try {
//       if (!firebaseUser) {
//         throw new Error(
//           "Firebase user was not created"
//         );
//       }

//       console.log(
//         "================================="
//       );

//       console.log(
//         "INSTITUTE AUTHENTICATION"
//       );

//       console.log(
//         "Firebase UID:",
//         firebaseUser.uid
//       );

//       console.log(
//         "Firebase Email:",
//         firebaseUser.email
//       );

//       console.log(
//         "Firebase Phone:",
//         firebaseUser.phoneNumber
//       );

//       /* =====================================================
//          GET FIREBASE ID TOKEN
//       ===================================================== */

//       const firebaseToken =
//         await firebaseUser.getIdToken(true);

//       if (!firebaseToken) {
//         throw new Error(
//           "Firebase ID token was not generated"
//         );
//       }

//       console.log(
//         "Firebase token:",
//         "FOUND"
//       );

//       /* =====================================================
//          SEND TOKEN TO BACKEND
         
//          IMPORTANT:
//          Both Google and Phone OTP use the
//          SAME institute login endpoint.
//       ===================================================== */

//       console.log(
//         "Calling /institutes/login..."
//       );

//       const response =
//         await API.post(
//           "/institutes/login",
//           {},
//           {
//             headers: {
//               Authorization:
//                 `Bearer ${firebaseToken}`,
//             },
//           }
//         );

//       console.log(
//         "INSTITUTE LOGIN RESPONSE:",
//         response?.data
//       );

//       /* =====================================================
//          READ BACKEND RESPONSE
//       ===================================================== */

//       const responseData =
//         response?.data;

//       const data =
//         responseData?.data;

//       if (!data) {
//         throw new Error(
//           "Invalid institute login response"
//         );
//       }

//       const {
//         account,
//         institute,
//       } = data;

//       const nextStep =
//         responseData?.next_step;

//       /* =====================================================
//          SAVE INSTITUTE SESSION
//       ===================================================== */

//       localStorage.setItem(
//         "role",
//         "INSTITUTE"
//       );

//       localStorage.setItem(
//         "institute",
//         JSON.stringify({
//           account,
//           institute,
//         })
//       );

//       /*
//        * Store Firebase user as well.
//        */

//       localStorage.setItem(
//         "firebaseUser",
//         JSON.stringify({
//           uid: firebaseUser.uid,
//           email: firebaseUser.email,
//           phoneNumber:
//             firebaseUser.phoneNumber,
//           displayName:
//             firebaseUser.displayName,
//           photoURL:
//             firebaseUser.photoURL,
//         })
//       );

//       /*
//        * Do NOT use the generic "token"
//        * if your institute API uses the
//        * institute session/backend mechanism.
//        */

//       localStorage.removeItem(
//         "token"
//       );

//       console.log(
//         "Institute authentication successful"
//       );

//       console.log(
//         "Next step:",
//         nextStep
//       );

//       console.log(
//         "================================="
//       );

//       /* =====================================================
//          SUCCESS
//       ===================================================== */

//       toast.success(
//         "Login Successful"
//       );

//       /* =====================================================
//          NAVIGATION
//       ===================================================== */

//       switch (nextStep) {
//         case "COMPLETE_PROFILE":

//           navigate(
//             "/institute/create-profile",
//             {
//               replace: true,
//             }
//           );

//           break;

//         case "WAITING_APPROVAL":

//           navigate(
//             "/institute/pending",
//             {
//               replace: true,
//             }
//           );

//           break;

//         case "DASHBOARD":

//           navigate(
//             "/institute/dashboard",
//             {
//               replace: true,
//             }
//           );

//           break;

//         default:

//           /*
//            * If backend doesn't send next_step,
//            * safely send institute to profile.
//            */

//           navigate(
//             "/institute/create-profile",
//             {
//               replace: true,
//             }
//           );
//       }
//     } catch (error) {
//       console.error(
//         "================================="
//       );

//       console.error(
//         "INSTITUTE LOGIN PROCESS ERROR"
//       );

//       console.error(
//         error
//       );

//       console.error(
//         "Backend response:",
//         error?.response?.data
//       );

//       console.error(
//         "Status:",
//         error?.response?.status
//       );

//       console.error(
//         "================================="
//       );

//       throw error;
//     }
//   };

//   /* =========================================================
//      SEND PHONE OTP
//   ========================================================= */

//   const handleSendOtp = async () => {
//     if (loading) {
//       return;
//     }

//     if (phone.length !== 10) {
//       toast.error(
//         "Enter a valid 10 digit mobile number"
//       );

//       return;
//     }

//     try {
//       setLoading(true);

//       console.log(
//         "================================="
//       );

//       console.log(
//         "INSTITUTE PHONE LOGIN"
//       );

//       console.log(
//         "Phone:",
//         phone
//       );

//       /* =====================================================
//          SETUP RECAPTCHA
//       ===================================================== */

//       const appVerifier =
//         await setupRecaptcha();

//       /* =====================================================
//          SEND OTP
//       ===================================================== */

//       const result =
//         await signInWithPhoneNumber(
//           auth,
//           `+91${phone}`,
//           appVerifier
//         );

//       setConfirmationResult(
//         result
//       );

//       setOtp("");

//       toast.success(
//         "OTP sent successfully"
//       );

//       console.log(
//         "Institute OTP sent successfully"
//       );

//       console.log(
//         "================================="
//       );
//     } catch (error) {
//       console.error(
//         "INSTITUTE PHONE OTP ERROR:",
//         error
//       );

//       console.error(
//         "Error code:",
//         error?.code
//       );

//       console.error(
//         "Error message:",
//         error?.message
//       );

//       /*
//        * Clean recaptcha after failure.
//        */

//       try {
//         if (window.recaptchaVerifier) {
//           window.recaptchaVerifier.clear();
//           window.recaptchaVerifier = null;
//         }
//       } catch (cleanupError) {
//         console.error(
//           "RECAPTCHA CLEANUP ERROR:",
//           cleanupError
//         );
//       }

//       toast.error(
//         error?.message ||
//           "Failed to send OTP"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* =========================================================
//      VERIFY OTP
//   ========================================================= */

//   const handleVerifyOtp = async () => {
//     if (loading) {
//       return;
//     }

//     if (!confirmationResult) {
//       toast.error(
//         "Please send OTP first"
//       );

//       return;
//     }

//     if (otp.length !== 6) {
//       toast.error(
//         "Enter a valid 6 digit OTP"
//       );

//       return;
//     }

//     try {
//       setLoading(true);

//       console.log(
//         "================================="
//       );

//       console.log(
//         "VERIFYING INSTITUTE OTP"
//       );

//       /* =====================================================
//          CONFIRM OTP
//       ===================================================== */

//       const result =
//         await confirmationResult.confirm(
//           otp
//         );

//       const firebaseUser =
//         result.user;

//       console.log(
//         "Phone Firebase authentication successful"
//       );

//       /* =====================================================
//          SEND FIREBASE USER TO BACKEND
//       ===================================================== */

//       await processInstituteLogin(
//         firebaseUser
//       );

//       console.log(
//         "================================="
//       );
//     } catch (error) {
//       console.error(
//         "INSTITUTE VERIFY OTP ERROR:",
//         error
//       );

//       console.error(
//         "Backend:",
//         error?.response?.data
//       );

//       toast.error(
//         error?.response?.data?.message ||
//           error?.message ||
//           "OTP verification failed"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* =========================================================
//      GOOGLE LOGIN
//   ========================================================= */

//   const handleGoogleLogin = async () => {
//     if (loading) {
//       return;
//     }

//     try {
//       setLoading(true);

//       console.log(
//         "================================="
//       );

//       console.log(
//         "INSTITUTE GOOGLE LOGIN"
//       );

//       /* =====================================================
//          GOOGLE PROVIDER
//       ===================================================== */

//       const provider =
//         new GoogleAuthProvider();

//       provider.setCustomParameters({
//         prompt: "select_account",
//       });

//       /* =====================================================
//          FIREBASE GOOGLE LOGIN
//       ===================================================== */

//       const result =
//         await signInWithPopup(
//           auth,
//           provider
//         );

//       const firebaseUser =
//         result.user;

//       console.log(
//         "Google Firebase authentication successful"
//       );

//       /* =====================================================
//          SEND TO BACKEND
//       ===================================================== */

//       await processInstituteLogin(
//         firebaseUser
//       );

//       console.log(
//         "================================="
//       );
//     } catch (error) {
//       console.error(
//         "INSTITUTE GOOGLE LOGIN ERROR:",
//         error
//       );

//       console.error(
//         "Backend response:",
//         error?.response?.data
//       );

//       toast.error(
//         error?.response?.data?.message ||
//           error?.message ||
//           "Google Login Failed"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* =========================================================
//      CHANGE LOGIN METHOD
//   ========================================================= */

//   const changeLoginMethod = (
//     method
//   ) => {
//     if (loading) {
//       return;
//     }

//     setLoginMethod(
//       method
//     );

//     setConfirmationResult(
//       null
//     );

//     setOtp("");

//     /*
//      * Clean recaptcha when switching.
//      */

//     try {
//       if (window.recaptchaVerifier) {
//         window.recaptchaVerifier.clear();
//         window.recaptchaVerifier = null;
//       }
//     } catch (error) {
//       console.warn(
//         "RECAPTCHA CLEANUP ERROR:",
//         error
//       );
//     }
//   };

//   /* =========================================================
//      BACK TO PHONE NUMBER
//   ========================================================= */

//   const handleChangeNumber = () => {
//     if (loading) {
//       return;
//     }

//     setConfirmationResult(
//       null
//     );

//     setOtp("");

//     try {
//       if (window.recaptchaVerifier) {
//         window.recaptchaVerifier.clear();
//         window.recaptchaVerifier = null;
//       }
//     } catch (error) {
//       console.warn(
//         "RECAPTCHA CLEANUP ERROR:",
//         error
//       );
//     }
//   };

//   /* =========================================================
//      UI
//   ========================================================= */

//   return (
//     <div className="min-h-screen bg-[#08080c] flex items-center justify-center px-4 py-10">

//       {/* =====================================================
//           CARD
//       ===================================================== */}

//       <div className="w-full max-w-[440px]">

//         <div className="bg-[#18181d] border border-[#33333a] rounded-3xl p-8 sm:p-10 shadow-2xl">

//           {/* =================================================
//               INSTITUTE ICON
//           ================================================= */}

//           <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-4xl font-bold mb-6 shadow-lg shadow-purple-500/20">
//             IN
//           </div>

//           {/* =================================================
//               TITLE
//           ================================================= */}

//           <h1 className="text-3xl sm:text-4xl font-bold text-center text-purple-400 mb-2">
//             Institute Login
//           </h1>

//           <p className="text-center text-gray-400 mb-8">
//             Login using your mobile number or Google
//           </p>

//           {/* =================================================
//               LOGIN METHOD TABS
//           ================================================= */}

//           <div className="grid grid-cols-2 gap-2 p-1 bg-[#0e0e12] border border-[#2b2b32] rounded-xl mb-7">

//             <button
//               type="button"
//               onClick={() =>
//                 changeLoginMethod(
//                   "phone"
//                 )
//               }
//               disabled={loading}
//               className={`py-3 rounded-lg font-semibold transition ${
//                 loginMethod === "phone"
//                   ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
//                   : "text-gray-400 hover:text-white"
//               }`}
//             >
//               Mobile + OTP
//             </button>

//             <button
//               type="button"
//               onClick={() =>
//                 changeLoginMethod(
//                   "google"
//                 )
//               }
//               disabled={loading}
//               className={`py-3 rounded-lg font-semibold transition ${
//                 loginMethod === "google"
//                   ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
//                   : "text-gray-400 hover:text-white"
//               }`}
//             >
//               Google
//             </button>

//           </div>

//           {/* =================================================
//               PHONE LOGIN
//           ================================================= */}

//           {loginMethod === "phone" && (
//             <>
//               {!confirmationResult ? (

//                 <div className="space-y-5">

//                   {/* PHONE */}

//                   <div>

//                     <label className="block text-sm font-medium text-gray-300 mb-2">
//                       Mobile Number
//                     </label>

//                     <div className="flex">

//                       <div className="flex items-center justify-center px-4 bg-[#0e0e12] border border-r-0 border-[#33333a] rounded-l-xl text-gray-300">
//                         +91
//                       </div>

//                       <input
//                         type="tel"
//                         value={phone}
//                         maxLength={10}
//                         placeholder="Enter 10 digit number"
//                         disabled={loading}
//                         onChange={(e) =>
//                           setPhone(
//                             e.target.value.replace(
//                               /\D/g,
//                               ""
//                             )
//                           )
//                         }
//                         className="flex-1 px-4 py-3.5 rounded-r-xl bg-[#0e0e12] border border-[#33333a] text-white placeholder-gray-600 outline-none focus:border-purple-500 transition disabled:opacity-50"
//                       />

//                     </div>

//                   </div>

//                   {/* SEND OTP */}

//                   <button
//                     type="button"
//                     onClick={
//                       handleSendOtp
//                     }
//                     disabled={
//                       loading ||
//                       phone.length !==
//                         10
//                     }
//                     className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     {loading
//                       ? "Sending OTP..."
//                       : "Send OTP"}
//                   </button>

//                 </div>

//               ) : (

//                 /* =================================================
//                    OTP
//                 ================================================= */

//                 <div className="space-y-5">

//                   <div className="text-center">

//                     <p className="text-gray-400 text-sm">
//                       OTP sent to
//                     </p>

//                     <p className="text-white font-semibold mt-1">
//                       +91 {phone}
//                     </p>

//                   </div>

//                   <div>

//                     <label className="block text-sm font-medium text-gray-300 mb-2">
//                       Enter OTP
//                     </label>

//                     <input
//                       type="tel"
//                       value={otp}
//                       maxLength={6}
//                       placeholder="Enter 6 digit OTP"
//                       disabled={loading}
//                       onChange={(e) =>
//                         setOtp(
//                           e.target.value.replace(
//                             /\D/g,
//                             ""
//                           )
//                         )
//                       }
//                       className="w-full px-4 py-4 rounded-xl bg-[#0e0e12] border border-[#33333a] text-white text-center text-xl tracking-[0.5em] placeholder-gray-600 outline-none focus:border-purple-500 transition disabled:opacity-50"
//                     />

//                   </div>

//                   {/* VERIFY */}

//                   <button
//                     type="button"
//                     onClick={
//                       handleVerifyOtp
//                     }
//                     disabled={
//                       loading ||
//                       otp.length !==
//                         6
//                     }
//                     className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     {loading
//                       ? "Verifying..."
//                       : "Verify & Login"}
//                   </button>

//                   {/* CHANGE NUMBER */}

//                   <button
//                     type="button"
//                     onClick={
//                       handleChangeNumber
//                     }
//                     disabled={loading}
//                     className="w-full text-sm text-purple-400 hover:text-purple-300 transition disabled:opacity-50"
//                   >
//                     Change mobile number
//                   </button>

//                 </div>
//               )}
//             </>
//           )}

//           {/* =================================================
//               GOOGLE LOGIN
//           ================================================= */}

//           {loginMethod === "google" && (

//             <div className="space-y-5">

//               <div className="text-center mb-2">

//                 <p className="text-gray-400 text-sm">
//                   Continue with your Google account
//                 </p>

//               </div>

//               <button
//                 type="button"
//                 onClick={
//                   handleGoogleLogin
//                 }
//                 disabled={loading}
//                 className="w-full py-4 rounded-xl bg-white text-black font-semibold flex items-center justify-center gap-3 hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
//               >

//                 {loading ? (

//                   <span>
//                     Signing in...
//                   </span>

//                 ) : (

//                   <>
//                     <img
//                       src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
//                       alt="Google"
//                       className="w-6 h-6"
//                     />

//                     <span>
//                       Continue with Google
//                     </span>
//                   </>

//                 )}

//               </button>

//             </div>
//           )}

//           {/* =================================================
//               SECURITY MESSAGE
//           ================================================= */}

//           <div className="mt-7 pt-6 border-t border-[#2d2d33]">

//             <p className="text-center text-xs text-gray-500">
//               Your login is securely handled by Firebase
//               Authentication.
//             </p>

//           </div>

//         </div>

//         {/* ===================================================
//             RECAPTCHA
//         =================================================== */}

//         <div
//           id="institute-recaptcha-container"
//           className="hidden"
//         />

//       </div>

//     </div>
//   );
// }
