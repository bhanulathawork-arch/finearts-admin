
import { useState } from "react";
import {
  useNavigate,
  useOutletContext,
} from "react-router-dom";

import {
  GoogleAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import {
  Phone,
  ArrowLeft,
  ShieldCheck,
  Loader2,
  Sparkles,
} from "lucide-react";

import { auth } from "../../config/firebase";
import API from "../../services/api";

/*
============================================================
 WEBSITE STUDENT LOGIN
============================================================

 LOGIN METHODS:

 1. GOOGLE
 2. MOBILE OTP

 BUSINESS RULE:

 Website student login can create a new ONLINE student.

 Existing student
      ↓
 Login

 New website user
      ↓
 Create ONLINE student
      ↓
 Login

 IMPORTANT:

 The account role may remain:

     INSTITUTE

 Therefore DO NOT change:

     localStorage.role

 to STUDENT.

 Website student authentication is maintained separately.

============================================================
*/

export default function WebsiteLogin() {

  const navigate = useNavigate();

  const outletContext =
    useOutletContext() || {};

  const {
    website = {},
    institute = {},
    branding = {},
    instituteId: contextInstituteId = null,
  } = outletContext;


  /*
  ==========================================================
  INSTITUTE ID
  ==========================================================
  */

  const instituteId =
    contextInstituteId ||
    institute?.id ||
    institute?.institute_id ||
    institute?.instituteId ||
    website?.institute?.id ||
    website?.institute?.institute_id ||
    website?.institute?.instituteId ||
    website?.id ||
    website?.institute_id ||
    website?.instituteId ||
    localStorage.getItem(
      "studentInstituteId"
    ) ||
    localStorage.getItem(
      "websiteInstituteId"
    ) ||
    localStorage.getItem(
      "instituteId"
    ) ||
    null;

  const numericInstituteId =
    Number(instituteId);


  /*
  ==========================================================
  BRANDING
  ==========================================================
  */

  const primaryColor =
    branding?.primaryColor ||
    branding?.primary_color ||
    branding?.buttonColor ||
    branding?.button_color ||
    "#7C3AED";

  const secondaryColor =
    branding?.secondaryColor ||
    branding?.secondary_color ||
    "#111827";

  const accentColor =
    branding?.accentColor ||
    branding?.accent_color ||
    "#DB2777";


  /*
  ==========================================================
  INSTITUTE NAME
  ==========================================================
  */

  const instituteName =
    institute?.name ||
    institute?.institute_name ||
    website?.institute?.name ||
    website?.institute?.institute_name ||
    website?.name ||
    website?.website_name ||
    "Your Institute";


  /*
  ==========================================================
  LOGO
  ==========================================================
  */

  const instituteLogo =
    institute?.logo ||
    institute?.logo_url ||
    institute?.image ||
    institute?.image_url ||
    website?.institute?.logo ||
    website?.institute?.logo_url ||
    website?.logo ||
    website?.logo_url ||
    null;


  /*
  ==========================================================
  LOGIN STATE
  ==========================================================
  */

  const [loginMethod, setLoginMethod] =
    useState("phone");

  const [phone, setPhone] =
    useState("");

  const [otp, setOtp] =
    useState("");

  const [confirmationResult, setConfirmationResult] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");


  /*
  ==========================================================
  CLEAR ERROR
  ==========================================================
  */

  const clearError = () => {
    setError("");
  };


  /*
  ==========================================================
  VALIDATE INSTITUTE
  ==========================================================
  */

  const validateInstitute = () => {

    if (
      !instituteId ||
      !Number.isInteger(
        numericInstituteId
      ) ||
      numericInstituteId <= 0
    ) {

      console.error(
        "INVALID INSTITUTE ID:",
        instituteId
      );

      setError(
        "Institute information is missing. Please reopen the institute website."
      );

      return false;
    }

    return true;
  };


  /*
  ==========================================================
  CLEAR WEBSITE STUDENT SESSION
  ==========================================================
  */

  const clearStudentSession = () => {

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

    localStorage.removeItem(
      "studentLoggedIn"
    );

    localStorage.removeItem(
      "isStudentLoggedIn"
    );

    /*
    --------------------------------------------------------
    IMPORTANT WEBSITE STUDENT SESSION KEYS
    --------------------------------------------------------
    */

    localStorage.removeItem(
      "websiteStudentAuthenticated"
    );

    localStorage.removeItem(
      "websiteStudentId"
    );

    localStorage.removeItem(
      "websiteStudentInstituteId"
    );
  };


  /*
  ==========================================================
  SAVE WEBSITE STUDENT SESSION
  ==========================================================
  */

  const saveStudentSession = async (
    firebaseUser,
    studentProfile,
    backendResponse = null
  ) => {

    if (!firebaseUser?.uid) {
      throw new Error(
        "Firebase authentication user is missing."
      );
    }


    /*
    ========================================================
    FIREBASE TOKEN
    ========================================================
    */

    const firebaseToken =
      await firebaseUser.getIdToken(
        true
      );

    if (!firebaseToken) {
      throw new Error(
        "Unable to generate Firebase authentication token."
      );
    }


    /*
    ========================================================
    BACKEND TOKEN
    ========================================================
    */

    const backendToken =
      backendResponse?.token ||
      backendResponse?.data?.token ||
      backendResponse?.access_token ||
      backendResponse?.data?.access_token ||
      firebaseToken;


    /*
    ========================================================
    SAVE TOKENS
    ========================================================
    */

    localStorage.setItem(
      "studentToken",
      backendToken
    );

    localStorage.setItem(
      "token",
      backendToken
    );


    /*
    ========================================================
    STUDENT ROLE

    Keep this separate from:

        localStorage.role

    because the account itself may still be INSTITUTE.
    ========================================================
    */

    localStorage.setItem(
      "studentRole",
      "STUDENT"
    );

    localStorage.setItem(
      "studentLoggedIn",
      "true"
    );

    localStorage.setItem(
      "isStudentLoggedIn",
      "true"
    );


    /*
    ========================================================
    IMPORTANT WEBSITE STUDENT AUTH SESSION
    ========================================================

    THESE ARE THE KEYS USED BY:

        StudentProtectedRoute
    ========================================================
    */

    localStorage.setItem(
      "websiteStudentAuthenticated",
      "true"
    );


    /*
    ========================================================
    GET STUDENT ID
    ========================================================
    */

    const studentId =
      studentProfile?.id ||
      studentProfile?.student_id ||
      studentProfile?.studentId ||
      studentProfile?.student?.id ||
      backendResponse?.student?.id ||
      backendResponse?.data?.student?.id ||
      backendResponse?.student_id ||
      backendResponse?.data?.student_id ||
      null;


    /*
    ========================================================
    SAVE STUDENT ID
    ========================================================
    */

    if (studentId) {

      localStorage.setItem(
        "websiteStudentId",
        String(studentId)
      );

      localStorage.setItem(
        "studentId",
        String(studentId)
      );
    }


    /*
    ========================================================
    SAVE INSTITUTE ID
    ========================================================
    */

    localStorage.setItem(
      "studentInstituteId",
      String(
        numericInstituteId
      )
    );

    localStorage.setItem(
      "websiteInstituteId",
      String(
        numericInstituteId
      )
    );

    localStorage.setItem(
      "websiteStudentInstituteId",
      String(
        numericInstituteId
      )
    );


    /*
    ========================================================
    FIREBASE USER
    ========================================================
    */

    localStorage.setItem(
      "studentUser",
      JSON.stringify({

        uid:
          firebaseUser.uid,

        email:
          firebaseUser.email || "",

        phoneNumber:
          firebaseUser.phoneNumber || "",

        displayName:
          firebaseUser.displayName || "",

        photoURL:
          firebaseUser.photoURL || "",

      })
    );


    /*
    ========================================================
    STUDENT PROFILE
    ========================================================
    */

    if (studentProfile) {

      localStorage.setItem(
        "studentProfile",
        JSON.stringify(
          studentProfile
        )
      );
    }


    /*
    ========================================================
    DEBUG
    ========================================================
    */

    console.log(
      "=========================================="
    );

    console.log(
      "WEBSITE STUDENT SESSION SAVED"
    );

    console.log(
      "Firebase UID:",
      firebaseUser.uid
    );

    console.log(
      "Institute ID:",
      numericInstituteId
    );

    console.log(
      "Student ID:",
      studentId
    );

    console.log(
      "websiteStudentAuthenticated:",
      localStorage.getItem(
        "websiteStudentAuthenticated"
      )
    );

    console.log(
      "websiteStudentId:",
      localStorage.getItem(
        "websiteStudentId"
      )
    );

    console.log(
      "websiteStudentInstituteId:",
      localStorage.getItem(
        "websiteStudentInstituteId"
      )
    );

    console.log(
      "Account Role:",
      localStorage.getItem(
        "role"
      )
    );

    console.log(
      "=========================================="
    );


    return {
      backendToken,
      studentId,
    };
  };


  /*
  ==========================================================
  BACKEND STUDENT LOGIN
  ==========================================================
  */

  const loginStudentWithBackend =
    async (
      firebaseUser,
      method
    ) => {

      if (!validateInstitute()) {
        return null;
      }

      if (!firebaseUser?.uid) {
        throw new Error(
          "Firebase authentication user is missing."
        );
      }


      /*
      ========================================================
      PAYLOAD
      ========================================================
      */

      const payload = {

        institute_id:
          numericInstituteId,

        login_method:
          method,

        firebase_uid:
          firebaseUser.uid,

      };


      /*
      ========================================================
      GOOGLE
      ========================================================
      */

      if (
        method === "GOOGLE"
      ) {

        const email =
          firebaseUser.email
            ?.trim()
            .toLowerCase();

        if (!email) {
          throw new Error(
            "Your Google account does not have an email address."
          );
        }

        payload.email =
          email;
      }


      /*
      ========================================================
      PHONE
      ========================================================
      */

      if (
        method === "PHONE"
      ) {

        const firebasePhone =
          firebaseUser.phoneNumber ||
          "";

        if (!firebasePhone) {
          throw new Error(
            "Firebase phone number is missing."
          );
        }

        const normalizedPhone =
          firebasePhone
            .replace(/\D/g, "")
            .slice(-10);

        if (
          normalizedPhone.length !==
          10
        ) {
          throw new Error(
            "Invalid Firebase phone number."
          );
        }

        payload.phone_number =
          normalizedPhone;
      }


      /*
      ========================================================
      DEBUG
      ========================================================
      */

      console.log(
        "=========================================="
      );

      console.log(
        "WEBSITE STUDENT LOGIN"
      );

      console.log(
        "Login Method:",
        method
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

      console.log(
        "Institute ID:",
        numericInstituteId
      );

      console.log(
        "Request Payload:",
        payload
      );

      console.log(
        "=========================================="
      );


      /*
      ========================================================
      API
      ========================================================
      */

      const response =
        await API.post(
          "/students/login",
          payload
        );

      const data =
        response?.data || {};


      /*
      ========================================================
      EXTRACT STUDENT

      Backend may return:

        {
          student: {...}
        }

      OR:

        {
          data: {
            student: {...}
          }
        }

      OR:

        {
          profile: {...}
        }
      ========================================================
      */

      const student =
        data?.student ||
        data?.data?.student ||
        data?.profile ||
        null;


      /*
      ========================================================
      EXTRACT STUDENT ID
      ========================================================
      */

      const studentId =
        student?.id ||
        student?.student_id ||
        data?.student_id ||
        data?.data?.student_id ||
        null;


      /*
      ========================================================
      SUCCESS
      ========================================================
      */

      if (
        response?.status >= 200 &&
        response?.status < 300
      ) {

        return {

          success: true,

          message:
            data?.message ||
            "Student login successful.",

          student,

          studentId,

          response:
            data,

        };
      }


      throw new Error(
        data?.message ||
        "Student login failed."
      );
    };


  /*
  ==========================================================
  COMPLETE STUDENT LOGIN
  ==========================================================
  */

  const completeStudentLogin =
    async (
      firebaseUser,
      method
    ) => {

      if (!firebaseUser?.uid) {
        throw new Error(
          "Firebase authentication failed."
        );
      }

      if (!validateInstitute()) {
        return false;
      }


      try {

        /*
        ======================================================
        STEP 1
        FIREBASE TOKEN
        ======================================================
        */

        const firebaseToken =
          await firebaseUser.getIdToken(
            true
          );

        if (!firebaseToken) {
          throw new Error(
            "Unable to get Firebase authentication token."
          );
        }


        /*
        ------------------------------------------------------
        Save temporary Firebase token
        ------------------------------------------------------
        */

        localStorage.setItem(
          "token",
          firebaseToken
        );


        /*
        ======================================================
        STEP 2
        BACKEND LOGIN
        ======================================================
        */

        const loginResult =
          await loginStudentWithBackend(
            firebaseUser,
            method
          );


        if (
          !loginResult?.success
        ) {

          throw new Error(
            loginResult?.message ||
            "Student login failed."
          );
        }


        /*
        ======================================================
        STEP 3
        STUDENT PROFILE
        ======================================================
        */

        const studentProfile =
          loginResult.student;


        /*
        ======================================================
        STEP 4
        SAVE WEBSITE STUDENT SESSION
        ======================================================
        */

        const session =
          await saveStudentSession(
            firebaseUser,
            studentProfile,
            loginResult.response
          );


        /*
        ======================================================
        STEP 5
        EXTRA SAFETY

        Make absolutely sure student ID exists.
        ======================================================
        */

        if (
          loginResult.studentId &&
          !localStorage.getItem(
            "websiteStudentId"
          )
        ) {

          localStorage.setItem(
            "websiteStudentId",
            String(
              loginResult.studentId
            )
          );
        }


        /*
        ======================================================
        STEP 6
        FIRE AUTH EVENT
        ======================================================
        */

        window.dispatchEvent(
          new Event(
            "studentAuthChanged"
          )
        );


        /*
        ======================================================
        DEBUG BEFORE NAVIGATION
        ======================================================
        */

        console.log(
          "=========================================="
        );

        console.log(
          "WEBSITE STUDENT LOGIN SUCCESS"
        );

        console.log(
          "Method:",
          method
        );

        console.log(
          "Institute:",
          numericInstituteId
        );

        console.log(
          "Firebase UID:",
          firebaseUser.uid
        );

        console.log(
          "Student ID:",
          localStorage.getItem(
            "websiteStudentId"
          )
        );

        console.log(
          "Website Student Auth:",
          localStorage.getItem(
            "websiteStudentAuthenticated"
          )
        );

        console.log(
          "Website Institute:",
          localStorage.getItem(
            "websiteStudentInstituteId"
          )
        );

        console.log(
          "Current Account Role:",
          localStorage.getItem(
            "role"
          )
        );

        console.log(
          "=========================================="
        );


        /*
        ======================================================
        STEP 7
        GO TO WEBSITE DASHBOARD

        IMPORTANT:
        Do NOT navigate to:

            /dashboard

        That is the ADMIN dashboard.

        Correct:

            /institute/website/preview/dashboard
        ======================================================
        */

        navigate(
          "/institute/website/preview/dashboard",
          {
            replace: true,

            state: {

              studentLoggedIn:
                true,

              student:
                true,

              preview:
                true,

              instituteId:
                numericInstituteId,

              studentId:
                loginResult.studentId ||
                session.studentId ||
                null,

              studentProfile:
                studentProfile,

            },
          }
        );


        return true;

      } catch (error) {

        console.error(
          "=========================================="
        );

        console.error(
          "STUDENT LOGIN FAILED"
        );

        console.error(
          error?.response?.data ||
          error?.message ||
          error
        );

        console.error(
          "=========================================="
        );


        /*
        ======================================================
        CLEAR WEBSITE STUDENT SESSION
        ======================================================
        */

        clearStudentSession();

        localStorage.removeItem(
          "token"
        );


        /*
        ======================================================
        FIREBASE SIGNOUT

        Only when application login fails.
        ======================================================
        */

        try {
          await signOut(auth);
        } catch {}


        throw error;
      }
    };


  /*
  ==========================================================
  GOOGLE LOGIN
  ==========================================================
  */

  const handleGoogleLogin =
    async () => {

      clearError();

      if (!validateInstitute()) {
        return;
      }


      try {

        setLoading(true);


        const provider =
          new GoogleAuthProvider();

        provider.setCustomParameters({
          prompt:
            "select_account",
        });


        console.log(
          "STARTING GOOGLE LOGIN"
        );


        /*
        ======================================================
        FIREBASE
        ======================================================
        */

        const result =
          await signInWithPopup(
            auth,
            provider
          );

        const firebaseUser =
          result?.user;


        if (!firebaseUser?.uid) {
          throw new Error(
            "Google authentication failed."
          );
        }


        if (!firebaseUser.email) {
          throw new Error(
            "Your Google account does not have an email address."
          );
        }


        console.log(
          "GOOGLE FIREBASE AUTH SUCCESS"
        );

        console.log(
          "UID:",
          firebaseUser.uid
        );

        console.log(
          "Email:",
          firebaseUser.email
        );


        /*
        ======================================================
        BACKEND LOGIN
        ======================================================
        */

        await completeStudentLogin(
          firebaseUser,
          "GOOGLE"
        );

      } catch (error) {

        console.error(
          "GOOGLE LOGIN ERROR:",
          error
        );

        setError(
          error?.response?.data?.message ||
          error?.message ||
          "Google login failed."
        );

      } finally {

        setLoading(false);
      }
    };


  /*
  ==========================================================
  SEND OTP
  ==========================================================
  */

  const sendOtp = async () => {

    clearError();

    if (!validateInstitute()) {
      return;
    }


    const cleanPhone =
      phone.replace(
        /\D/g,
        ""
      );


    if (
      cleanPhone.length !==
      10
    ) {

      setError(
        "Please enter a valid 10 digit mobile number."
      );

      return;
    }


    try {

      setLoading(true);


      /*
      ======================================================
      CLEAR OLD RECAPTCHA
      ======================================================
      */

      if (
        window.recaptchaVerifier
      ) {

        try {
          window.recaptchaVerifier.clear();
        } catch {}

        window.recaptchaVerifier =
          null;
      }


      /*
      ======================================================
      RECAPTCHA
      ======================================================
      */

      const verifier =
        new RecaptchaVerifier(
          auth,
          "website-recaptcha-container",
          {

            size: "invisible",

            callback: () => {

              console.log(
                "Recaptcha verified."
              );

            },

            "expired-callback":
              () => {

                try {
                  window.recaptchaVerifier?.clear();
                } catch {}

                window.recaptchaVerifier =
                  null;
              },

          }
        );


      window.recaptchaVerifier =
        verifier;


      await verifier.render();


      /*
      ======================================================
      SEND OTP
      ======================================================
      */

      const confirmation =
        await signInWithPhoneNumber(
          auth,
          `+91${cleanPhone}`,
          verifier
        );


      setPhone(
        cleanPhone
      );

      setConfirmationResult(
        confirmation
      );

      setOtp("");


      console.log(
        "=========================================="
      );

      console.log(
        "OTP SENT"
      );

      console.log(
        "Phone:",
        `+91${cleanPhone}`
      );

      console.log(
        "Institute:",
        numericInstituteId
      );

      console.log(
        "=========================================="
      );

    } catch (error) {

      console.error(
        "SEND OTP ERROR:",
        error
      );

      setError(
        error?.message ||
        "Unable to send OTP. Please try again."
      );


      try {
        window.recaptchaVerifier?.clear();
      } catch {}

      window.recaptchaVerifier =
        null;

    } finally {

      setLoading(false);
    }
  };


  /*
  ==========================================================
  VERIFY OTP
  ==========================================================
  */

  const verifyOtp = async () => {

    clearError();


    if (!confirmationResult) {

      setError(
        "Please send OTP first."
      );

      return;
    }


    const cleanOtp =
      otp.replace(
        /\D/g,
        ""
      );


    if (
      cleanOtp.length !==
      6
    ) {

      setError(
        "Please enter a valid 6 digit OTP."
      );

      return;
    }


    try {

      setLoading(true);


      /*
      ======================================================
      FIREBASE OTP
      ======================================================
      */

      const result =
        await confirmationResult.confirm(
          cleanOtp
        );


      const firebaseUser =
        result?.user;


      if (!firebaseUser?.uid) {

        throw new Error(
          "Firebase phone authentication failed."
        );
      }


      console.log(
        "=========================================="
      );

      console.log(
        "PHONE FIREBASE AUTH SUCCESS"
      );

      console.log(
        "UID:",
        firebaseUser.uid
      );

      console.log(
        "Phone:",
        firebaseUser.phoneNumber
      );

      console.log(
        "=========================================="
      );


      /*
      ======================================================
      BACKEND LOGIN
      ======================================================
      */

      await completeStudentLogin(
        firebaseUser,
        "PHONE"
      );

    } catch (error) {

      console.error(
        "OTP LOGIN ERROR:",
        error
      );

      setError(
        error?.response?.data?.message ||
        error?.message ||
        "Mobile OTP login failed."
      );

    } finally {

      setLoading(false);
    }
  };


  /*
  ==========================================================
  CHANGE PHONE NUMBER
  ==========================================================
  */

  const changeNumber = () => {

    clearError();

    setConfirmationResult(
      null
    );

    setOtp("");


    try {
      window.recaptchaVerifier?.clear();
    } catch {}

    window.recaptchaVerifier =
      null;
  };


  /*
  ==========================================================
  SWITCH LOGIN METHOD
  ==========================================================
  */

  const switchLoginMethod = (
    method
  ) => {

    if (loading) {
      return;
    }

    clearError();

    setLoginMethod(
      method
    );

    setConfirmationResult(
      null
    );

    setOtp("");


    try {
      window.recaptchaVerifier?.clear();
    } catch {}

    window.recaptchaVerifier =
      null;
  };


  /*
  ==========================================================
  BACK TO WEBSITE
  ==========================================================
  */

  const goBack = () => {

    navigate(
      "/institute/website/preview",
      {
        replace: true,

        state: {

          instituteId:
            numericInstituteId,

          preview:
            true,

        },
      }
    );
  };


  /*
  ==========================================================
  UI
  ==========================================================
  */

  return (
    <main
      className="
        min-h-screen
        flex
        items-center
        justify-center
        relative
        overflow-hidden
        py-10
      "
      style={{
        backgroundColor:
          secondaryColor,
      }}
    >

      {/* BACKGROUND */}

      <div
        className="
          absolute
          -top-40
          -right-40
          w-96
          h-96
          rounded-full
          blur-3xl
          opacity-30
        "
        style={{
          backgroundColor:
            primaryColor,
        }}
      />

      <div
        className="
          absolute
          -bottom-40
          -left-40
          w-96
          h-96
          rounded-full
          blur-3xl
          opacity-20
        "
        style={{
          backgroundColor:
            accentColor,
        }}
      />


      <div
        className="
          relative
          z-10
          w-full
          max-w-md
          px-5
        "
      >

        {/* BACK */}

        <button
          type="button"
          onClick={goBack}
          disabled={loading}
          className="
            flex
            items-center
            gap-2
            text-white/70
            hover:text-white
            transition
            mb-6
          "
        >

          <ArrowLeft
            size={18}
          />

          Back to website

        </button>


        {/* CARD */}

        <div
          className="
            bg-white
            rounded-3xl
            shadow-2xl
            overflow-hidden
          "
        >

          {/* HEADER */}

          <div
            className="
              px-8
              py-8
              text-center
            "
            style={{
              backgroundColor:
                primaryColor,
            }}
          >

            <div className="flex justify-center">

              {instituteLogo ? (

                <img
                  src={instituteLogo}
                  alt={
                    instituteName
                  }
                  className="
                    w-20
                    h-20
                    rounded-2xl
                    object-cover
                    bg-white
                    p-1
                    shadow-lg
                  "
                />

              ) : (

                <div
                  className="
                    w-20
                    h-20
                    rounded-2xl
                    bg-white
                    flex
                    items-center
                    justify-center
                    text-2xl
                    font-bold
                    shadow-lg
                  "
                  style={{
                    color:
                      primaryColor,
                  }}
                >

                  {instituteName
                    .charAt(0)
                    .toUpperCase()}

                </div>

              )}

            </div>


            <h1
              className="
                text-2xl
                font-bold
                text-white
                mt-5
              "
            >
              Welcome Back
            </h1>


            <p
              className="
                text-white/80
                mt-2
              "
            >
              Login to{" "}
              {instituteName}
            </p>

          </div>


          {/* BODY */}

          <div
            className="p-8"
          >

            {/* ERROR */}

            {error && (

              <div
                className="
                  mb-5
                  px-4
                  py-3
                  rounded-xl
                  bg-red-50
                  border
                  border-red-200
                  text-red-600
                  text-sm
                "
              >
                {error}
              </div>

            )}


            {/* LOGIN TABS */}

            {!confirmationResult && (

              <div
                className="
                  grid
                  grid-cols-2
                  gap-2
                  p-1
                  bg-gray-100
                  rounded-xl
                  mb-7
                "
              >

                <button
                  type="button"
                  disabled={loading}
                  onClick={() =>
                    switchLoginMethod(
                      "phone"
                    )
                  }
                  className={`
                    py-2.5
                    rounded-lg
                    text-sm
                    font-semibold
                    transition
                    ${
                      loginMethod ===
                      "phone"
                        ? "bg-white shadow text-gray-900"
                        : "text-gray-500"
                    }
                  `}
                >
                  Mobile OTP
                </button>


                <button
                  type="button"
                  disabled={loading}
                  onClick={() =>
                    switchLoginMethod(
                      "google"
                    )
                  }
                  className={`
                    py-2.5
                    rounded-lg
                    text-sm
                    font-semibold
                    transition
                    ${
                      loginMethod ===
                      "google"
                        ? "bg-white shadow text-gray-900"
                        : "text-gray-500"
                    }
                  `}
                >
                  Google
                </button>

              </div>

            )}


            {/* =================================================
                MOBILE LOGIN
            ================================================= */}

            {loginMethod ===
              "phone" &&
              !confirmationResult && (

                <>

                  <h2
                    className="
                      text-xl
                      font-bold
                      text-gray-900
                    "
                  >
                    Student Login
                  </h2>


                  <p
                    className="
                      text-sm
                      text-gray-500
                      mt-1
                      mb-6
                    "
                  >
                    Login with your
                    mobile number
                  </p>


                  <label
                    className="
                      block
                      text-sm
                      font-medium
                      text-gray-700
                      mb-2
                    "
                  >
                    Mobile Number
                  </label>


                  <div
                    className="
                      flex
                      items-center
                      border
                      border-gray-300
                      rounded-xl
                      overflow-hidden
                      focus-within:border-purple-500
                    "
                  >

                    <div
                      className="
                        px-4
                        py-3
                        text-gray-500
                        border-r
                        bg-gray-50
                      "
                    >
                      +91
                    </div>


                    <input
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      value={phone}
                      placeholder="Enter 10-digit number"
                      disabled={loading}
                      onChange={(
                        event
                      ) => {

                        clearError();

                        setPhone(
                          event.target.value.replace(
                            /\D/g,
                            ""
                          )
                        );

                      }}
                      className="
                        flex-1
                        px-4
                        py-3
                        outline-none
                        text-gray-900
                      "
                    />


                    <Phone
                      size={19}
                      className="
                        mr-4
                        text-gray-400
                      "
                    />

                  </div>


                  <button
                    type="button"
                    onClick={
                      sendOtp
                    }
                    disabled={
                      loading ||
                      phone.length !==
                        10
                    }
                    className="
                      w-full
                      mt-5
                      py-3.5
                      rounded-xl
                      text-white
                      font-semibold
                      flex
                      items-center
                      justify-center
                      gap-2
                      disabled:opacity-50
                    "
                    style={{
                      backgroundColor:
                        primaryColor,
                    }}
                  >

                    {loading ? (

                      <>
                        <Loader2
                          size={19}
                          className="animate-spin"
                        />

                        Sending OTP...
                      </>

                    ) : (

                      <>
                        <Phone
                          size={18}
                        />

                        Send OTP
                      </>

                    )}

                  </button>

                </>

              )}


            {/* =================================================
                GOOGLE LOGIN
            ================================================= */}

            {loginMethod ===
              "google" &&
              !confirmationResult && (

                <>

                  <h2
                    className="
                      text-xl
                      font-bold
                      text-gray-900
                    "
                  >
                    Student Login
                  </h2>


                  <p
                    className="
                      text-sm
                      text-gray-500
                      mt-1
                      mb-6
                    "
                  >
                    Login with Google
                  </p>


                  <button
                    type="button"
                    onClick={
                      handleGoogleLogin
                    }
                    disabled={
                      loading
                    }
                    className="
                      w-full
                      py-3.5
                      rounded-xl
                      border
                      border-gray-300
                      text-gray-800
                      font-semibold
                      flex
                      items-center
                      justify-center
                      gap-3
                      hover:bg-gray-50
                      transition
                      disabled:opacity-50
                    "
                  >

                    {loading ? (

                      <>
                        <Loader2
                          size={19}
                          className="animate-spin"
                        />

                        Signing in...
                      </>

                    ) : (

                      <>
                        <span
                          className="
                            text-lg
                            font-bold
                          "
                        >
                          G
                        </span>

                        Continue
                        with Google
                      </>

                    )}

                  </button>


                  <div
                    className="
                      flex
                      items-center
                      gap-3
                      my-6
                    "
                  >

                    <div
                      className="
                        flex-1
                        h-px
                        bg-gray-200
                      "
                    />

                    <span
                      className="
                        text-xs
                        text-gray-400
                      "
                    >
                      OR
                    </span>

                    <div
                      className="
                        flex-1
                        h-px
                        bg-gray-200
                      "
                    />

                  </div>


                  <button
                    type="button"
                    onClick={() =>
                      switchLoginMethod(
                        "phone"
                      )
                    }
                    disabled={
                      loading
                    }
                    className="
                      w-full
                      py-3
                      rounded-xl
                      border
                      border-gray-200
                      text-gray-600
                      text-sm
                      font-medium
                      hover:bg-gray-50
                    "
                  >
                    Login with
                    Mobile OTP
                  </button>

                </>

              )}


            {/* =================================================
                OTP VERIFICATION
            ================================================= */}

            {confirmationResult && (

              <>

                <h2
                  className="
                    text-xl
                    font-bold
                    text-gray-900
                  "
                >
                  Verify OTP
                </h2>


                <p
                  className="
                    text-sm
                    text-gray-500
                    mt-1
                  "
                >
                  Enter the 6-digit OTP
                  sent to
                </p>


                <p
                  className="
                    font-semibold
                    mt-1
                    mb-6
                  "
                  style={{
                    color:
                      primaryColor,
                  }}
                >
                  +91{" "}
                  {phone}
                </p>


                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={otp}
                  placeholder="Enter 6-digit OTP"
                  disabled={loading}
                  autoComplete="one-time-code"
                  onChange={(
                    event
                  ) => {

                    clearError();

                    setOtp(
                      event.target.value.replace(
                        /\D/g,
                        ""
                      )
                    );

                  }}
                  className="
                    w-full
                    px-4
                    py-3
                    border
                    border-gray-300
                    rounded-xl
                    outline-none
                    text-center
                    tracking-[0.5em]
                    text-xl
                    text-gray-900
                  "
                />


                <button
                  type="button"
                  onClick={
                    verifyOtp
                  }
                  disabled={
                    loading ||
                    otp.length !==
                      6
                  }
                  className="
                    w-full
                    mt-5
                    py-3.5
                    rounded-xl
                    text-white
                    font-semibold
                    flex
                    items-center
                    justify-center
                    gap-2
                    disabled:opacity-50
                  "
                  style={{
                    backgroundColor:
                      primaryColor,
                  }}
                >

                  {loading ? (

                    <>
                      <Loader2
                        size={19}
                        className="animate-spin"
                      />

                      Signing in...
                    </>

                  ) : (

                    <>
                      <ShieldCheck
                        size={19}
                      />

                      Verify &
                      Login
                    </>

                  )}

                </button>


                <button
                  type="button"
                  onClick={
                    changeNumber
                  }
                  disabled={
                    loading
                  }
                  className="
                    w-full
                    mt-3
                    py-2
                    text-sm
                    text-gray-500
                    hover:text-gray-700
                  "
                >
                  Change mobile
                  number
                </button>

              </>

            )}


            {/* SECURITY */}

            <div
              className="
                flex
                items-center
                justify-center
                gap-3
                mt-7
                pt-6
                border-t
                border-gray-200
              "
            >

              <ShieldCheck
                size={17}
                style={{
                  color:
                    primaryColor,
                }}
              />

              <span
                className="
                  text-xs
                  text-gray-400
                "
              >
                Secure student
                login
              </span>

            </div>


            {/* BUSINESS MESSAGE */}

            <p
              className="
                text-center
                text-xs
                text-gray-400
                mt-3
              "
            >
              New website users can
              create their online
              student account through
              Google or Mobile OTP.
            </p>

          </div>

        </div>


        {/* INSTITUTE */}

        <div
          className="
            flex
            items-center
            justify-center
            gap-2
            mt-6
            text-white/50
            text-sm
          "
        >

          <Sparkles
            size={15}
          />

          {instituteName}

        </div>

      </div>


      {/* FIREBASE RECAPTCHA */}

      <div
        id="website-recaptcha-container"
      />

    </main>
  );
}