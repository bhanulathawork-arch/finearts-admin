

// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import { auth } from "../config/firebase";
// import API from "../services/api";

// export default function TrainerLogin() {
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       const provider = new GoogleAuthProvider();

//       const result = await signInWithPopup(auth, provider);

//       const token = await result.user.getIdToken();

//       const response = await API.post(
//         "/trainers/login",
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const { account, trainer } = response.data.data;
//       const next_step = response.data.next_step;

//       localStorage.setItem("token", token);
//       localStorage.setItem("role", "TRAINER");
//       localStorage.setItem(
//         "trainer",
//         JSON.stringify({
//           account,
//           trainer,
//         })
//       );

//       toast.success("Login successful ✅");

//       switch (next_step) {
//         case "COMPLETE_PROFILE":
//           navigate("/trainer/create-profile");
//           break;

//         case "WAITING_APPROVAL":
//           navigate("/trainer/pending");
//           break;

//         case "DASHBOARD":
//           navigate("/trainer/dashboard");
//           break;

//         default:
//           navigate("/trainer/create-profile");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error(
//         err?.response?.data?.message || "Login failed"
//       );
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-6">
//       <div className="text-center">
//         <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-purple-600/20 border border-purple-500/30 mb-6">
//           <svg
//             className="w-8 h-8 text-purple-400"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={1.5}
//               d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
//             />
//           </svg>
//         </div>

//         <h1 className="text-3xl font-bold text-white mb-2">
//           Trainer Portal
//         </h1>

//         <p className="text-white/40 mb-8">
//           Sign in with your Google account to continue
//         </p>

//         <button
//           onClick={handleLogin}
//           className="flex items-center gap-3 px-8 py-4 bg-white text-gray-800 font-semibold rounded-2xl hover:bg-gray-100 transition mx-auto"
//         >
//           <svg className="w-5 h-5" viewBox="0 0 24 24">
//             <path
//               fill="#4285F4"
//               d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//             />
//             <path
//               fill="#34A853"
//               d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//             />
//             <path
//               fill="#FBBC05"
//               d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//             />
//             <path
//               fill="#EA4335"
//               d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//             />
//           </svg>

//           Continue with Google
//         </button>
//       </div>
//     </div>
//   );
// } 


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { auth } from "../config/firebase";
import API from "../services/api";

export default function TrainerLogin() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  /* =========================================================
     TRAINER GOOGLE LOGIN
  ========================================================= */

  const handleLogin = async () => {
    if (loading) return;

    try {
      setLoading(true);

      console.log("=================================");
      console.log("TRAINER GOOGLE LOGIN START");
      console.log("=================================");

      /* =====================================================
         1. GOOGLE PROVIDER
      ===================================================== */

      const provider = new GoogleAuthProvider();

      provider.setCustomParameters({
        prompt: "select_account",
      });

      /* =====================================================
         2. FIREBASE GOOGLE LOGIN
      ===================================================== */

      const result = await signInWithPopup(
        auth,
        provider
      );

      const firebaseUser = result?.user;

      if (!firebaseUser) {
        throw new Error(
          "Firebase user was not created"
        );
      }

      console.log(
        "Firebase UID:",
        firebaseUser.uid
      );

      console.log(
        "Firebase Email:",
        firebaseUser.email
      );

      /* =====================================================
         3. GET FRESH FIREBASE TOKEN
      ===================================================== */

      const firebaseToken =
        await firebaseUser.getIdToken(true);

      if (!firebaseToken) {
        throw new Error(
          "Firebase ID token was not generated"
        );
      }

      console.log(
        "Firebase Token: FOUND"
      );

      /* =====================================================
         4. SAVE TOKEN BEFORE API REQUEST

         api.js can now also find the token.
      ===================================================== */

      localStorage.setItem(
        "token",
        firebaseToken
      );

      /* =====================================================
         5. TRAINER LOGIN API
      ===================================================== */

      console.log(
        "Calling POST /trainers/login"
      );

      const response = await API.post(
        "/trainers/login",
        {},
        {
          headers: {
            Authorization:
              `Bearer ${firebaseToken}`,
          },
        }
      );

      console.log("=================================");
      console.log("TRAINER LOGIN RESPONSE");
      console.log(response?.data);
      console.log("=================================");

      /* =====================================================
         6. READ RESPONSE
      ===================================================== */

      const data =
        response?.data?.data;

      if (!data) {
        throw new Error(
          "Invalid trainer login response"
        );
      }

      const account =
        data?.account || null;

      const trainer =
        data?.trainer || null;

      const nextStep =
        response?.data?.next_step;

      if (!account) {
        throw new Error(
          "Trainer account information missing"
        );
      }

      /* =====================================================
         7. SAVE TRAINER SESSION
      ===================================================== */

      localStorage.setItem(
        "token",
        firebaseToken
      );

      localStorage.setItem(
        "role",
        "TRAINER"
      );

      localStorage.setItem(
        "trainer",
        JSON.stringify({
          account,
          trainer,
        })
      );

      /*
       * Make sure old institute/student sessions
       * cannot interfere with trainer pages.
       */

      localStorage.removeItem(
        "studentToken"
      );

      localStorage.removeItem(
        "studentUser"
      );

      localStorage.removeItem(
        "studentProfile"
      );

      localStorage.removeItem(
        "studentRole"
      );

      console.log("=================================");
      console.log(
        "TRAINER AUTHENTICATION SUCCESSFUL"
      );
      console.log(
        "Role:",
        "TRAINER"
      );
      console.log(
        "Token:",
        localStorage.getItem("token")
          ? "FOUND"
          : "MISSING"
      );
      console.log(
        "Next Step:",
        nextStep
      );
      console.log("=================================");

      toast.success(
        "Login successful"
      );

      /* =====================================================
         8. NAVIGATION
      ===================================================== */

      if (
        nextStep ===
        "COMPLETE_PROFILE"
      ) {
        navigate(
          "/trainer/create-profile",
          {
            replace: true,
          }
        );

        return;
      }

      if (
        nextStep ===
        "WAITING_APPROVAL"
      ) {
        navigate(
          "/trainer/pending",
          {
            replace: true,
          }
        );

        return;
      }

      if (
        nextStep ===
        "DASHBOARD"
      ) {
        navigate(
          "/trainer/dashboard",
          {
            replace: true,
          }
        );

        return;
      }

      /*
       * Backend did not return a recognized next_step.
       */

      navigate(
        "/trainer/create-profile",
        {
          replace: true,
        }
      );

    } catch (err) {
      console.error(
        "================================="
      );

      console.error(
        "TRAINER GOOGLE LOGIN ERROR"
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

      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Trainer Login Failed";

      toast.error(message);

      /*
       * Do not clear a valid Firebase session
       * for ordinary API errors.
       */

      if (
        err?.response?.status === 401 ||
        err?.response?.status === 403
      ) {
        localStorage.removeItem(
          "token"
        );

        localStorage.removeItem(
          "role"
        );

        localStorage.removeItem(
          "trainer"
        );
      }

    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     UI
  ========================================================= */

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-6">

      <div className="text-center">

        {/* =================================================
            ICON
        ================================================= */}

        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-purple-600/20 border border-purple-500/30 mb-6">

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
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>

        </div>

        {/* =================================================
            TITLE
        ================================================= */}

        <h1 className="text-3xl font-bold text-white mb-2">
          Trainer Portal
        </h1>

        <p className="text-white/40 mb-8">
          Sign in with your Google account to continue
        </p>

        {/* =================================================
            GOOGLE BUTTON
        ================================================= */}

        <button
          type="button"
          onClick={handleLogin}
          disabled={loading}
          className="flex items-center gap-3 px-8 py-4 bg-white text-gray-800 font-semibold rounded-2xl hover:bg-gray-100 transition mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
        >

          {loading ? (
            <span>
              Signing in...
            </span>
          ) : (
            <>
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />

                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />

                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />

                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>

              Continue with Google
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

// export default function TrainerLogin() {
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
//         if (window.trainerRecaptchaVerifier) {
//           window.trainerRecaptchaVerifier.clear();
//           window.trainerRecaptchaVerifier = null;
//         }
//       } catch (error) {
//         console.error(
//           "TRAINER RECAPTCHA CLEANUP ERROR:",
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
//       if (window.trainerRecaptchaVerifier) {
//         try {
//           window.trainerRecaptchaVerifier.clear();
//         } catch (error) {
//           console.warn(
//             "Old trainer recaptcha cleanup failed:",
//             error
//           );
//         }

//         window.trainerRecaptchaVerifier = null;
//       }

//       const verifier = new RecaptchaVerifier(
//         auth,
//         "trainer-recaptcha-container",
//         {
//           size: "invisible",

//           callback: () => {
//             console.log(
//               "Trainer reCAPTCHA verified"
//             );
//           },

//           "expired-callback": () => {
//             console.log(
//               "Trainer reCAPTCHA expired"
//             );
//           },
//         }
//       );

//       window.trainerRecaptchaVerifier =
//         verifier;

//       await verifier.render();

//       return verifier;
//     } catch (error) {
//       console.error(
//         "TRAINER RECAPTCHA SETUP ERROR:",
//         error
//       );

//       throw error;
//     }
//   };

//   /* =========================================================
//      PROCESS TRAINER LOGIN
     
//      Shared by:
//      - Google
//      - Mobile OTP
//   ========================================================= */

//   const processTrainerLogin = async (
//     firebaseUser
//   ) => {
//     if (!firebaseUser) {
//       throw new Error(
//         "Firebase user was not created"
//       );
//     }

//     console.log(
//       "================================="
//     );

//     console.log(
//       "TRAINER FIREBASE AUTHENTICATION"
//     );

//     console.log(
//       "Firebase UID:",
//       firebaseUser.uid
//     );

//     console.log(
//       "Firebase Email:",
//       firebaseUser.email
//     );

//     console.log(
//       "Firebase Phone:",
//       firebaseUser.phoneNumber
//     );

//     /* =====================================================
//        GET FRESH FIREBASE TOKEN
//     ===================================================== */

//     const firebaseToken =
//       await firebaseUser.getIdToken(true);

//     if (!firebaseToken) {
//       throw new Error(
//         "Firebase ID token was not generated"
//       );
//     }

//     console.log(
//       "Firebase Token: FOUND"
//     );

//     /* =====================================================
//        TRAINER LOGIN API
//     ===================================================== */

//     console.log(
//       "Calling POST /trainers/login"
//     );

//     const response =
//       await API.post(
//         "/trainers/login",
//         {},
//         {
//           headers: {
//             Authorization:
//               `Bearer ${firebaseToken}`,
//           },
//         }
//       );

//     console.log(
//       "================================="
//     );

//     console.log(
//       "TRAINER LOGIN RESPONSE"
//     );

//     console.log(
//       response?.data
//     );

//     console.log(
//       "================================="
//     );

//     /* =====================================================
//        READ RESPONSE
//     ===================================================== */

//     const data =
//       response?.data?.data;

//     if (!data) {
//       throw new Error(
//         "Invalid trainer login response"
//       );
//     }

//     const account =
//       data?.account || null;

//     const trainer =
//       data?.trainer || null;

//     const nextStep =
//       response?.data?.next_step;

//     if (!account) {
//       throw new Error(
//         "Trainer account information missing"
//       );
//     }

//     /* =====================================================
//        SAVE TRAINER SESSION
//     ===================================================== */

//     localStorage.setItem(
//       "token",
//       firebaseToken
//     );

//     localStorage.setItem(
//       "role",
//       "TRAINER"
//     );

//     localStorage.setItem(
//       "trainer",
//       JSON.stringify({
//         account,
//         trainer,
//       })
//     );

//     localStorage.setItem(
//       "firebaseUser",
//       JSON.stringify({
//         uid: firebaseUser.uid,
//         email: firebaseUser.email,
//         phoneNumber:
//           firebaseUser.phoneNumber,
//         displayName:
//           firebaseUser.displayName,
//         photoURL:
//           firebaseUser.photoURL,
//       })
//     );

//     /*
//      * Remove sessions belonging to other roles.
//      */

//     localStorage.removeItem(
//       "studentToken"
//     );

//     localStorage.removeItem(
//       "studentUser"
//     );

//     localStorage.removeItem(
//       "studentProfile"
//     );

//     localStorage.removeItem(
//       "studentRole"
//     );

//     console.log(
//       "TRAINER AUTHENTICATION SUCCESSFUL"
//     );

//     console.log(
//       "Next Step:",
//       nextStep
//     );

//     /* =====================================================
//        SUCCESS
//     ===================================================== */

//     toast.success(
//       "Login successful"
//     );

//     /* =====================================================
//        NAVIGATION
//     ===================================================== */

//     switch (nextStep) {
//       case "COMPLETE_PROFILE":

//         navigate(
//           "/trainer/create-profile",
//           {
//             replace: true,
//           }
//         );

//         break;

//       case "WAITING_APPROVAL":

//         navigate(
//           "/trainer/pending",
//           {
//             replace: true,
//           }
//         );

//         break;

//       case "DASHBOARD":

//         navigate(
//           "/trainer/dashboard",
//           {
//             replace: true,
//           }
//         );

//         break;

//       default:

//         navigate(
//           "/trainer/create-profile",
//           {
//             replace: true,
//           }
//         );
//     }
//   };

//   /* =========================================================
//      SEND OTP
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
//         "TRAINER PHONE LOGIN"
//       );

//       console.log(
//         "Phone:",
//         phone
//       );

//       /* =====================================================
//          RECAPTCHA
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
//         "Trainer OTP sent successfully"
//       );

//     } catch (error) {
//       console.error(
//         "TRAINER SEND OTP ERROR:",
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

//       /* =====================================================
//          CLEAN RECAPTCHA
//       ===================================================== */

//       try {
//         if (
//           window.trainerRecaptchaVerifier
//         ) {
//           window.trainerRecaptchaVerifier.clear();

//           window.trainerRecaptchaVerifier =
//             null;
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
//         "VERIFYING TRAINER OTP"
//       );

//       /* =====================================================
//          CONFIRM OTP
//       ===================================================== */

//       const result =
//         await confirmationResult.confirm(
//           otp
//         );

//       const firebaseUser =
//         result?.user;

//       if (!firebaseUser) {
//         throw new Error(
//           "Firebase user was not created"
//         );
//       }

//       console.log(
//         "Trainer phone authentication successful"
//       );

//       /* =====================================================
//          LOGIN TO TRAINER BACKEND
//       ===================================================== */

//       await processTrainerLogin(
//         firebaseUser
//       );

//     } catch (error) {
//       console.error(
//         "TRAINER VERIFY OTP ERROR:",
//         error
//       );

//       console.error(
//         "Backend response:",
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
//         "TRAINER GOOGLE LOGIN"
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
//          GOOGLE FIREBASE LOGIN
//       ===================================================== */

//       const result =
//         await signInWithPopup(
//           auth,
//           provider
//         );

//       const firebaseUser =
//         result?.user;

//       if (!firebaseUser) {
//         throw new Error(
//           "Firebase user was not created"
//         );
//       }

//       console.log(
//         "Google Firebase authentication successful"
//       );

//       /* =====================================================
//          SAME BACKEND LOGIN
//       ===================================================== */

//       await processTrainerLogin(
//         firebaseUser
//       );

//     } catch (error) {
//       console.error(
//         "TRAINER GOOGLE LOGIN ERROR:",
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

//       const message =
//         error?.response?.data?.message ||
//         error?.message ||
//         "Trainer Login Failed";

//       toast.error(message);

//       /*
//        * Only clear session when backend
//        * explicitly rejects authentication.
//        */

//       if (
//         error?.response?.status === 401 ||
//         error?.response?.status === 403
//       ) {
//         localStorage.removeItem(
//           "token"
//         );

//         localStorage.removeItem(
//           "role"
//         );

//         localStorage.removeItem(
//           "trainer"
//         );
//       }

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

//     try {
//       if (
//         window.trainerRecaptchaVerifier
//       ) {
//         window.trainerRecaptchaVerifier.clear();

//         window.trainerRecaptchaVerifier =
//           null;
//       }
//     } catch (error) {
//       console.warn(
//         "RECAPTCHA CLEANUP ERROR:",
//         error
//       );
//     }
//   };

//   /* =========================================================
//      CHANGE MOBILE NUMBER
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
//       if (
//         window.trainerRecaptchaVerifier
//       ) {
//         window.trainerRecaptchaVerifier.clear();

//         window.trainerRecaptchaVerifier =
//           null;
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

//       <div className="w-full max-w-[440px]">

//         {/* =================================================
//             LOGIN CARD
//         ================================================= */}

//         <div className="bg-[#18181d] border border-[#33333a] rounded-3xl p-8 sm:p-10 shadow-2xl">

//           {/* =================================================
//               TRAINER ICON
//           ================================================= */}

//           <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-4xl font-bold mb-6 shadow-lg shadow-purple-500/20">
//             TR
//           </div>

//           {/* =================================================
//               TITLE
//           ================================================= */}

//           <h1 className="text-3xl sm:text-4xl font-bold text-center text-purple-400 mb-2">
//             Trainer Login
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

//                   {/* MOBILE NUMBER */}

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
//                    OTP SCREEN
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

//                   {/* OTP */}

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

//               <div className="text-center">

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

//         {/* =================================================
//             RECAPTCHA
//         ================================================= */}

//         <div
//           id="trainer-recaptcha-container"
//           className="hidden"
//         />

//       </div>

//     </div>
//   );
// }