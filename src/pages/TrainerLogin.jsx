

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import toast from "react-hot-toast";

import { auth } from "../config/firebase";
import API from "../services/api";

export default function TrainerLogin() {
  const navigate = useNavigate();

  const [loginMethod, setLoginMethod] = useState("phone");

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  const [confirmationResult, setConfirmationResult] =
    useState(null);

  const [loading, setLoading] = useState(false);

  /* =========================================================
     CLEANUP RECAPTCHA
  ========================================================= */

  useEffect(() => {
    return () => {
      try {
        if (window.trainerRecaptchaVerifier) {
          window.trainerRecaptchaVerifier.clear();
          window.trainerRecaptchaVerifier = null;
        }
      } catch (error) {
        console.error(
          "TRAINER RECAPTCHA CLEANUP ERROR:",
          error
        );
      }
    };
  }, []);

  /* =========================================================
     SETUP RECAPTCHA
  ========================================================= */

  const setupRecaptcha = async () => {
    try {
      if (window.trainerRecaptchaVerifier) {
        try {
          window.trainerRecaptchaVerifier.clear();
        } catch (error) {
          console.warn(
            "Old trainer recaptcha cleanup failed:",
            error
          );
        }

        window.trainerRecaptchaVerifier = null;
      }

      const verifier = new RecaptchaVerifier(
        auth,
        "trainer-recaptcha-container",
        {
          size: "invisible",

          callback: () => {
            console.log(
              "Trainer reCAPTCHA verified"
            );
          },

          "expired-callback": () => {
            console.log(
              "Trainer reCAPTCHA expired"
            );
          },
        }
      );

      window.trainerRecaptchaVerifier =
        verifier;

      await verifier.render();

      return verifier;
    } catch (error) {
      console.error(
        "TRAINER RECAPTCHA SETUP ERROR:",
        error
      );

      throw error;
    }
  };

  /* =========================================================
     PROCESS TRAINER LOGIN
     
     Shared by:
     - Google
     - Mobile OTP
  ========================================================= */

  const processTrainerLogin = async (
    firebaseUser
  ) => {
    if (!firebaseUser) {
      throw new Error(
        "Firebase user was not created"
      );
    }

    console.log(
      "================================="
    );

    console.log(
      "TRAINER FIREBASE AUTHENTICATION"
    );

    console.log(
      "Firebase UID:",
      firebaseUser.uid
    );

    console.log(
      "Firebase Email:",
      firebaseUser.email
    );

    console.log(
      "Firebase Phone:",
      firebaseUser.phoneNumber
    );

    /* =====================================================
       GET FRESH FIREBASE TOKEN
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
       TRAINER LOGIN API
    ===================================================== */

    console.log(
      "Calling POST /trainers/login"
    );

    const response =
      await API.post(
        "/trainers/login",
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
      "TRAINER LOGIN RESPONSE"
    );

    console.log(
      response?.data
    );

    console.log(
      "================================="
    );

    /* =====================================================
       READ RESPONSE
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
       SAVE TRAINER SESSION
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

    localStorage.setItem(
      "firebaseUser",
      JSON.stringify({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        phoneNumber:
          firebaseUser.phoneNumber,
        displayName:
          firebaseUser.displayName,
        photoURL:
          firebaseUser.photoURL,
      })
    );

    /*
     * Remove sessions belonging to other roles.
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

    console.log(
      "TRAINER AUTHENTICATION SUCCESSFUL"
    );

    console.log(
      "Next Step:",
      nextStep
    );

    /* =====================================================
       SUCCESS
    ===================================================== */

    toast.success(
      "Login successful"
    );

    /* =====================================================
       NAVIGATION
    ===================================================== */

    switch (nextStep) {
      case "COMPLETE_PROFILE":

        navigate(
          "/trainer/create-profile",
          {
            replace: true,
          }
        );

        break;

      case "WAITING_APPROVAL":

        navigate(
          "/trainer/pending",
          {
            replace: true,
          }
        );

        break;

      case "DASHBOARD":

        navigate(
          "/trainer/dashboard",
          {
            replace: true,
          }
        );

        break;

      default:

        navigate(
          "/trainer/create-profile",
          {
            replace: true,
          }
        );
    }
  };

  /* =========================================================
     SEND OTP
  ========================================================= */

  const handleSendOtp = async () => {
    if (loading) {
      return;
    }

    if (phone.length !== 10) {
      toast.error(
        "Enter a valid 10 digit mobile number"
      );

      return;
    }

    try {
      setLoading(true);

      console.log(
        "================================="
      );

      console.log(
        "TRAINER PHONE LOGIN"
      );

      console.log(
        "Phone:",
        phone
      );

      /* =====================================================
         RECAPTCHA
      ===================================================== */

      const appVerifier =
        await setupRecaptcha();

      /* =====================================================
         SEND OTP
      ===================================================== */

      const result =
        await signInWithPhoneNumber(
          auth,
          `+91${phone}`,
          appVerifier
        );

      setConfirmationResult(
        result
      );

      setOtp("");

      toast.success(
        "OTP sent successfully"
      );

      console.log(
        "Trainer OTP sent successfully"
      );

    } catch (error) {
      console.error(
        "TRAINER SEND OTP ERROR:",
        error
      );

      console.error(
        "Error code:",
        error?.code
      );

      console.error(
        "Error message:",
        error?.message
      );

      /* =====================================================
         CLEAN RECAPTCHA
      ===================================================== */

      try {
        if (
          window.trainerRecaptchaVerifier
        ) {
          window.trainerRecaptchaVerifier.clear();

          window.trainerRecaptchaVerifier =
            null;
        }
      } catch (cleanupError) {
        console.error(
          "RECAPTCHA CLEANUP ERROR:",
          cleanupError
        );
      }

      toast.error(
        error?.message ||
          "Failed to send OTP"
      );

    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     VERIFY OTP
  ========================================================= */

  const handleVerifyOtp = async () => {
    if (loading) {
      return;
    }

    if (!confirmationResult) {
      toast.error(
        "Please send OTP first"
      );

      return;
    }

    if (otp.length !== 6) {
      toast.error(
        "Enter a valid 6 digit OTP"
      );

      return;
    }

    try {
      setLoading(true);

      console.log(
        "================================="
      );

      console.log(
        "VERIFYING TRAINER OTP"
      );

      /* =====================================================
         CONFIRM OTP
      ===================================================== */

      const result =
        await confirmationResult.confirm(
          otp
        );

      const firebaseUser =
        result?.user;

      if (!firebaseUser) {
        throw new Error(
          "Firebase user was not created"
        );
      }

      console.log(
        "Trainer phone authentication successful"
      );

      /* =====================================================
         LOGIN TO TRAINER BACKEND
      ===================================================== */

      await processTrainerLogin(
        firebaseUser
      );

    } catch (error) {
      console.error(
        "TRAINER VERIFY OTP ERROR:",
        error
      );

      console.error(
        "Backend response:",
        error?.response?.data
      );

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "OTP verification failed"
      );

    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     GOOGLE LOGIN
  ========================================================= */

  const handleGoogleLogin = async () => {
    if (loading) {
      return;
    }

    try {
      setLoading(true);

      console.log(
        "================================="
      );

      console.log(
        "TRAINER GOOGLE LOGIN"
      );

      /* =====================================================
         GOOGLE PROVIDER
      ===================================================== */

      const provider =
        new GoogleAuthProvider();

      provider.setCustomParameters({
        prompt: "select_account",
      });

      /* =====================================================
         GOOGLE FIREBASE LOGIN
      ===================================================== */

      const result =
        await signInWithPopup(
          auth,
          provider
        );

      const firebaseUser =
        result?.user;

      if (!firebaseUser) {
        throw new Error(
          "Firebase user was not created"
        );
      }

      console.log(
        "Google Firebase authentication successful"
      );

      /* =====================================================
         SAME BACKEND LOGIN
      ===================================================== */

      await processTrainerLogin(
        firebaseUser
      );

    } catch (error) {
      console.error(
        "TRAINER GOOGLE LOGIN ERROR:",
        error
      );

      console.error(
        "Backend response:",
        error?.response?.data
      );

      console.error(
        "Status:",
        error?.response?.status
      );

      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Trainer Login Failed";

      toast.error(message);

      /*
       * Only clear session when backend
       * explicitly rejects authentication.
       */

      if (
        error?.response?.status === 401 ||
        error?.response?.status === 403
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
     CHANGE LOGIN METHOD
  ========================================================= */

  const changeLoginMethod = (
    method
  ) => {
    if (loading) {
      return;
    }

    setLoginMethod(
      method
    );

    setConfirmationResult(
      null
    );

    setOtp("");

    try {
      if (
        window.trainerRecaptchaVerifier
      ) {
        window.trainerRecaptchaVerifier.clear();

        window.trainerRecaptchaVerifier =
          null;
      }
    } catch (error) {
      console.warn(
        "RECAPTCHA CLEANUP ERROR:",
        error
      );
    }
  };

  /* =========================================================
     CHANGE MOBILE NUMBER
  ========================================================= */

  const handleChangeNumber = () => {
    if (loading) {
      return;
    }

    setConfirmationResult(
      null
    );

    setOtp("");

    try {
      if (
        window.trainerRecaptchaVerifier
      ) {
        window.trainerRecaptchaVerifier.clear();

        window.trainerRecaptchaVerifier =
          null;
      }
    } catch (error) {
      console.warn(
        "RECAPTCHA CLEANUP ERROR:",
        error
      );
    }
  };

  /* =========================================================
     UI
  ========================================================= */

  return (
    <div className="min-h-screen bg-[#08080c] flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-[440px]">

        {/* =================================================
            LOGIN CARD
        ================================================= */}

        <div className="bg-[#18181d] border border-[#33333a] rounded-3xl p-8 sm:p-10 shadow-2xl">

          {/* =================================================
              TRAINER ICON
          ================================================= */}

          <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-4xl font-bold mb-6 shadow-lg shadow-purple-500/20">
            TR
          </div>

          {/* =================================================
              TITLE
          ================================================= */}

          <h1 className="text-3xl sm:text-4xl font-bold text-center text-purple-400 mb-2">
            Trainer Login
          </h1>

          <p className="text-center text-gray-400 mb-8">
            Login using your mobile number or Google
          </p>

          {/* =================================================
              LOGIN METHOD TABS
          ================================================= */}

          <div className="grid grid-cols-2 gap-2 p-1 bg-[#0e0e12] border border-[#2b2b32] rounded-xl mb-7">

            <button
              type="button"
              onClick={() =>
                changeLoginMethod(
                  "phone"
                )
              }
              disabled={loading}
              className={`py-3 rounded-lg font-semibold transition ${
                loginMethod === "phone"
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Mobile + OTP
            </button>

            <button
              type="button"
              onClick={() =>
                changeLoginMethod(
                  "google"
                )
              }
              disabled={loading}
              className={`py-3 rounded-lg font-semibold transition ${
                loginMethod === "google"
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Google
            </button>

          </div>

          {/* =================================================
              PHONE LOGIN
          ================================================= */}

          {loginMethod === "phone" && (

            <>
              {!confirmationResult ? (

                <div className="space-y-5">

                  {/* MOBILE NUMBER */}

                  <div>

                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Mobile Number
                    </label>

                    <div className="flex">

                      <div className="flex items-center justify-center px-4 bg-[#0e0e12] border border-r-0 border-[#33333a] rounded-l-xl text-gray-300">
                        +91
                      </div>

                      <input
                        type="tel"
                        value={phone}
                        maxLength={10}
                        placeholder="Enter 10 digit number"
                        disabled={loading}
                        onChange={(e) =>
                          setPhone(
                            e.target.value.replace(
                              /\D/g,
                              ""
                            )
                          )
                        }
                        className="flex-1 px-4 py-3.5 rounded-r-xl bg-[#0e0e12] border border-[#33333a] text-white placeholder-gray-600 outline-none focus:border-purple-500 transition disabled:opacity-50"
                      />

                    </div>

                  </div>

                  {/* SEND OTP */}

                  <button
                    type="button"
                    onClick={
                      handleSendOtp
                    }
                    disabled={
                      loading ||
                      phone.length !==
                        10
                    }
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading
                      ? "Sending OTP..."
                      : "Send OTP"}
                  </button>

                </div>

              ) : (

                /* =================================================
                   OTP SCREEN
                ================================================= */

                <div className="space-y-5">

                  <div className="text-center">

                    <p className="text-gray-400 text-sm">
                      OTP sent to
                    </p>

                    <p className="text-white font-semibold mt-1">
                      +91 {phone}
                    </p>

                  </div>

                  {/* OTP */}

                  <div>

                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Enter OTP
                    </label>

                    <input
                      type="tel"
                      value={otp}
                      maxLength={6}
                      placeholder="Enter 6 digit OTP"
                      disabled={loading}
                      onChange={(e) =>
                        setOtp(
                          e.target.value.replace(
                            /\D/g,
                            ""
                          )
                        )
                      }
                      className="w-full px-4 py-4 rounded-xl bg-[#0e0e12] border border-[#33333a] text-white text-center text-xl tracking-[0.5em] placeholder-gray-600 outline-none focus:border-purple-500 transition disabled:opacity-50"
                    />

                  </div>

                  {/* VERIFY */}

                  <button
                    type="button"
                    onClick={
                      handleVerifyOtp
                    }
                    disabled={
                      loading ||
                      otp.length !==
                        6
                    }
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading
                      ? "Verifying..."
                      : "Verify & Login"}
                  </button>

                  {/* CHANGE NUMBER */}

                  <button
                    type="button"
                    onClick={
                      handleChangeNumber
                    }
                    disabled={loading}
                    className="w-full text-sm text-purple-400 hover:text-purple-300 transition disabled:opacity-50"
                  >
                    Change mobile number
                  </button>

                </div>
              )}
            </>
          )}

          {/* =================================================
              GOOGLE LOGIN
          ================================================= */}

          {loginMethod === "google" && (

            <div className="space-y-5">

              <div className="text-center">

                <p className="text-gray-400 text-sm">
                  Continue with your Google account
                </p>

              </div>

              <button
                type="button"
                onClick={
                  handleGoogleLogin
                }
                disabled={loading}
                className="w-full py-4 rounded-xl bg-white text-black font-semibold flex items-center justify-center gap-3 hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
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
          )}

          {/* =================================================
              SECURITY MESSAGE
          ================================================= */}

          <div className="mt-7 pt-6 border-t border-[#2d2d33]">

            <p className="text-center text-xs text-gray-500">
              Your login is securely handled by Firebase
              Authentication.
            </p>

          </div>

        </div>

        {/* =================================================
            RECAPTCHA
        ================================================= */}

        <div
          id="trainer-recaptcha-container"
          className="hidden"
        />

      </div>

    </div>
  );
}