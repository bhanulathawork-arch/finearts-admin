// import API from "./api";

// // =========================================================
// // GET ALL INSTITUTE STUDENTS
// // =========================================================

// // export const getInstituteStudents = async () => {
// //   const res = await API.get("/students/institute");
// //   return res.data;
// // };

// export const getInstituteStudents = async () => {
//   const res = await API.get("/students/institute");

//   const students = res.data?.data || [];

//   return students.map((item) => ({
//     id: item.student?.id,
//     full_name: item.user?.full_name || "Unknown Student",
//     phone_number: item.account?.phone_number || "No phone",
//     email: item.account?.email || "",
//     batch_id: item.student?.batch_id || null,

//     student: item.student,
//     user: item.user,
//     account: item.account,
//   }));
// };


// // =========================================================
// // GET STUDENTS AVAILABLE FOR BATCH ASSIGNMENT
// // - ACTIVE students
// // - Current institute
// // - batch_id IS NULL
// // =========================================================

// export const getStudentsAvailableForBatch = async (search = "") => {
//   const res = await API.get(
//     "/students/available-for-batch",
//     {
//       params: {
//         search,
//       },
//     }
//   );

//   return res.data;
// };


// // =========================================================
// // SEARCH STUDENT BY MOBILE
// // =========================================================

// export const searchStudentByMobile = async (phone) => {
//   const res = await API.get(
//     `/students/institute/search/${phone}`
//   );

//   return res.data;
// };


// // =========================================================
// // GET STUDENT BY ID
// // =========================================================

// export const getStudentById = async (id) => {
//   const res = await API.get(
//     `/students/institute/${id}`
//   );

//   return res.data.data;
// };


// // =========================================================
// // REGISTER STUDENT OFFLINE
// // =========================================================

// export const registerStudentOffline = async (formData) => {
//   const res = await API.post(
//     "/students/institute-create",
//     formData,
//     {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     }
//   );

//   return res.data;
// };


// // =========================================================
// // UPDATE STUDENT
// // =========================================================

// export const updateStudentByInstitute = async (
//   id,
//   formData
// ) => {
//   const res = await API.put(
//     `/students/institute-update/${id}`,
//     formData,
//     {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     }
//   );

//   return res.data;
// };


// // =========================================================
// // DELETE STUDENT
// // =========================================================

// export const deleteStudentByInstitute = async (id) => {
//   const res = await API.delete(
//     `/students/institute-delete/${id}`
//   );

//   return res.data;
// };


// // =========================================================
// // TRAINERS
// // =========================================================

// export const getTrainersByInstitute = async () => {
//   const res = await API.get(
//     "/trainers/institute"
//   );

//   return res.data.data;
// };


// // =========================================================
// // CATEGORIES
// // =========================================================

// export const getCategories = async () => {
//   const res = await API.get(
//     "/categories"
//   );

//   return res.data.data || [];
// };


// // =========================================================
// // SUBCATEGORIES
// // =========================================================

// export const getSubcategories = async () => {
//   const res = await API.get(
//     "/subcategories"
//   );

//   return res.data.data || [];
// };


import API from "./api";

/*
=========================================================
STUDENT SERVICE
=========================================================

STUDENT WEBSITE FLOW
--------------------

GOOGLE LOGIN
    ↓
Firebase Google Authentication
    ↓
Firebase User
    ↓
POST /students/login
    ↓
Backend checks institute + email
    ↓
Existing student?
    ├── YES → Login
    └── NO  → Create ONLINE student
    ↓
Student Dashboard


MOBILE OTP LOGIN
----------------

Mobile Number
    ↓
Firebase Phone Authentication
    ↓
Firebase User
    ↓
POST /students/login
    ↓
Backend checks institute + phone
    ↓
Existing student?
    ├── YES → Login
    └── NO  → Create ONLINE student
    ↓
Student Dashboard


OFFLINE STUDENT
---------------

Institute Dashboard
    ↓
Register Student
    ↓
POST /students/institute-create
    ↓
OFFLINE student


IMPORTANT
---------

There is NO online registration function here.

Website login itself is the entry point for ONLINE students.

=========================================================
*/


/* =========================================================
   STUDENT LOGIN
=========================================================

Supported methods:

    GOOGLE
    PHONE

IMPORTANT:

Firebase authentication must already be completed
before calling this function.

For Google:
    signInWithPopup() must already succeed.

For Phone:
    confirm() / Firebase phone OTP verification
    must already succeed.

This function only sends the authenticated Firebase
user information to the backend.

The backend decides whether to:

    1. Find existing student
    2. Create ONLINE student
    3. Return login information

========================================================= */

export const studentLogin = async ({
  loginMethod,
  instituteId,
  email = null,
  phoneNumber = null,
  firebaseUid = null,
}) => {
  try {
    const method = String(loginMethod || "")
      .trim()
      .toUpperCase();

    /* -----------------------------------------------------
       VALIDATE LOGIN METHOD
    ----------------------------------------------------- */

    if (!["GOOGLE", "PHONE"].includes(method)) {
      throw new Error(
        "Invalid login method. Use GOOGLE or PHONE."
      );
    }

    /* -----------------------------------------------------
       VALIDATE INSTITUTE
    ----------------------------------------------------- */

    if (
      instituteId === null ||
      instituteId === undefined ||
      instituteId === ""
    ) {
      throw new Error(
        "Institute ID is required"
      );
    }

    /* -----------------------------------------------------
       GET FIREBASE USER
       
       We intentionally do not import Firebase auth here.
       
       The login component should pass the Firebase UID
       after successful Google / Phone authentication.
       
       This keeps this service independent from the
       Firebase UI implementation.
    ----------------------------------------------------- */

    if (!firebaseUid) {
      console.warn(
        "studentLogin called without firebaseUid. " +
        "The Firebase authentication component should pass it."
      );
    }

    /* -----------------------------------------------------
       BASE PAYLOAD
    ----------------------------------------------------- */

    const payload = {
      login_method: method,
      institute_id: Number(instituteId),
    };

    /* -----------------------------------------------------
       FIREBASE UID
       
       Backend firebaseAuth middleware also receives the
       Firebase token.

       Sending UID in body gives the backend the same
       identity explicitly and is useful for logging /
       matching.
    ----------------------------------------------------- */

    if (firebaseUid) {
      payload.firebase_uid = String(
        firebaseUid
      ).trim();
    }

    /* =====================================================
       GOOGLE LOGIN
    ===================================================== */

    if (method === "GOOGLE") {
      if (!email) {
        throw new Error(
          "Google email is required"
        );
      }

      payload.email = String(email)
        .trim()
        .toLowerCase();

      /*
       Google authentication does NOT require a phone
       number.

       Backend should search:

           students
              ↓
           accounts
              ↓
           email
              +
           institute_id

       If no student exists:

           CREATE ONLINE STUDENT
      */
    }

    /* =====================================================
       MOBILE OTP LOGIN
    ===================================================== */

    if (method === "PHONE") {
      if (!phoneNumber) {
        throw new Error(
          "Phone number is required"
        );
      }

      let phone = String(phoneNumber)
        .replace(/\D/g, "");

      /*
       Accept:

           9876543210
           +919876543210
           919876543210
      */

      if (
        phone.length === 12 &&
        phone.startsWith("91")
      ) {
        phone = phone.substring(2);
      }

      if (phone.length !== 10) {
        throw new Error(
          "Phone number must contain exactly 10 digits"
        );
      }

      payload.phone_number = phone;

      /*
       Backend should search:

           students
              ↓
           accounts
              ↓
           phone_number
              +
           institute_id

       If no student exists:

           CREATE ONLINE STUDENT
      */
    }

    /* =====================================================
       DEBUG
    ===================================================== */

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
      "Institute ID:",
      payload.institute_id
    );

    console.log(
      "Firebase UID:",
      payload.firebase_uid || "NOT PROVIDED"
    );

    console.log(
      "Email:",
      payload.email || null
    );

    console.log(
      "Phone:",
      payload.phone_number || null
    );

    console.log(
      "=========================================="
    );

    /* =====================================================
       BACKEND LOGIN
    ===================================================== */

    const res = await API.post(
      "/students/login",
      payload
    );

    /* =====================================================
       NORMALIZE RESPONSE
    ===================================================== */

    const responseData =
      res.data || {};

    /*
       Return complete backend response.

       This allows the login component to access:

           student
           account
           institute
           token
           etc.

       depending on your backend response.
    */

    return responseData;

  } catch (error) {
    console.error(
      "studentLogin error:",
      error
    );

    /*
       Preserve backend error response so UI can show
       the actual reason.

       Example:

       403
       409
       401
       500
    */

    const backendMessage =
      error?.response?.data?.message;

    if (backendMessage) {
      throw new Error(
        backendMessage
      );
    }

    throw error;
  }
};


/* =========================================================
   GET MY STUDENT PROFILE
=========================================================

GET:

    /students/me

This must only be called AFTER Firebase authentication
and successful student login.

========================================================= */

export const getMyStudentProfile = async (
  instituteId = null
) => {
  try {
    const config = {};

    if (
      instituteId !== null &&
      instituteId !== undefined &&
      instituteId !== ""
    ) {
      config.params = {
        institute_id: Number(
          instituteId
        ),
      };
    }

    const res = await API.get(
      "/students/me",
      config
    );

    return (
      res.data?.data ||
      res.data ||
      null
    );

  } catch (error) {
    console.error(
      "getMyStudentProfile error:",
      error
    );

    throw error;
  }
};


/* =========================================================
   GET INSTITUTE STUDENTS
=========================================================

Used by:

    Institute Dashboard
    Student Listing

Supported:

    ALL
    ONLINE
    OFFLINE

Examples:

    getInstituteStudents()

    getInstituteStudents("ALL")

    getInstituteStudents("ONLINE")

    getInstituteStudents("OFFLINE")

========================================================= */

export const getInstituteStudents = async (
  source = "ALL"
) => {
  try {
    const normalizedSource =
      String(source || "ALL")
        .trim()
        .toUpperCase();

    if (
      ![
        "ALL",
        "ONLINE",
        "OFFLINE",
      ].includes(normalizedSource)
    ) {
      throw new Error(
        "Invalid student source"
      );
    }

    const res = await API.get(
      "/students/institute",
      {
        params: {
          source: normalizedSource,
        },
      }
    );

    const students =
      res.data?.data || [];

    if (!Array.isArray(students)) {
      return [];
    }

    return students.map(
      (item) => {
        const student =
          item?.student || {};

        const user =
          item?.user || {};

        const account =
          item?.account || {};

        return {
          /* =========================
             PRIMARY ID
          ========================= */

          id:
            student?.id ||
            item?.id ||
            null,

          student_id:
            student?.id ||
            null,

          account_id:
            student?.account_id ||
            account?.id ||
            null,

          /* =========================
             BASIC INFORMATION
          ========================= */

          full_name:
            user?.full_name ||
            student?.full_name ||
            account?.full_name ||
            "Unknown Student",

          phone_number:
            account?.phone_number ||
            "No phone",

          email:
            account?.email ||
            "",

          /* =========================
             BATCH
          ========================= */

          batch_id:
            student?.batch_id ||
            null,

          /* =========================
             STATUS
          ========================= */

          status:
            student?.status ||
            null,

          is_active:
            account?.is_active ??
            null,

          /* =========================
             REGISTRATION SOURCE
          ========================= */

          registration_source:
            student?.registration_source ||
            null,

          /* =========================
             LEARNING MODE
          ========================= */

          learning_mode:
            student?.learning_mode ||
            null,

          /* =========================
             CATEGORY
          ========================= */

          category:
            item?.category ||
            null,

          subcategory:
            item?.subcategory ||
            null,

          /* =========================
             COMPLETE OBJECTS
          ========================= */

          student,

          user,

          account,

          institute:
            item?.institute ||
            null,
        };
      }
    );

  } catch (error) {
    console.error(
      "getInstituteStudents error:",
      error
    );

    throw error;
  }
};


/* =========================================================
   GET STUDENTS AVAILABLE FOR BATCH
=========================================================

Returns active students who can be assigned to a batch.

========================================================= */

export const getStudentsAvailableForBatch =
  async (
    search = ""
  ) => {
    try {
      const normalizedSearch =
        String(search || "")
          .trim();

      const res = await API.get(
        "/students/available-for-batch",
        {
          params: {
            search:
              normalizedSearch,
          },
        }
      );

      return (
        res.data?.data ||
        res.data ||
        []
      );

    } catch (error) {
      console.error(
        "getStudentsAvailableForBatch error:",
        error
      );

      throw error;
    }
  };


/* =========================================================
   SEARCH STUDENT BY MOBILE
=========================================================

Used by institute dashboard.

========================================================= */

export const searchStudentByMobile =
  async (
    phone
  ) => {
    try {
      if (!phone) {
        throw new Error(
          "Phone number is required"
        );
      }

      let normalizedPhone =
        String(phone)
          .replace(/\D/g, "");

      if (
        normalizedPhone.length === 12 &&
        normalizedPhone.startsWith("91")
      ) {
        normalizedPhone =
          normalizedPhone.substring(2);
      }

      if (
        normalizedPhone.length !== 10
      ) {
        throw new Error(
          "Phone number must contain exactly 10 digits"
        );
      }

      const res = await API.get(
        `/students/institute/search/${normalizedPhone}`
      );

      return (
        res.data?.data ||
        res.data ||
        null
      );

    } catch (error) {
      console.error(
        "searchStudentByMobile error:",
        error
      );

      throw error;
    }
  };


/* =========================================================
   GET STUDENT BY ID
========================================================= */

export const getStudentById =
  async (
    id
  ) => {
    try {
      if (
        id === null ||
        id === undefined ||
        id === ""
      ) {
        throw new Error(
          "Student ID is required"
        );
      }

      const res = await API.get(
        `/students/institute/${id}`
      );

      return (
        res.data?.data ||
        res.data ||
        null
      );

    } catch (error) {
      console.error(
        "getStudentById error:",
        error
      );

      throw error;
    }
  };


/* =========================================================
   REGISTER STUDENT OFFLINE
=========================================================

IMPORTANT:

This is ONLY for institute dashboard.

This has NOTHING to do with:

    Google Login
    Mobile OTP Login
    Website Student Login

Flow:

    Institute Dashboard
          ↓
    Student Registration
          ↓
    /students/institute-create
          ↓
    OFFLINE student

========================================================= */

export const registerStudentOffline =
  async (
    formData
  ) => {
    try {
      if (!formData) {
        throw new Error(
          "Student form data is required"
        );
      }

      const res = await API.post(
        "/students/institute-create",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      return (
        res.data ||
        {}
      );

    } catch (error) {
      console.error(
        "registerStudentOffline error:",
        error
      );

      throw error;
    }
  };


/* =========================================================
   UPDATE STUDENT
========================================================= */

export const updateStudentByInstitute =
  async (
    id,
    formData
  ) => {
    try {
      if (
        id === null ||
        id === undefined ||
        id === ""
      ) {
        throw new Error(
          "Student ID is required"
        );
      }

      if (!formData) {
        throw new Error(
          "Student form data is required"
        );
      }

      const res = await API.put(
        `/students/institute-update/${id}`,
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      return (
        res.data ||
        {}
      );

    } catch (error) {
      console.error(
        "updateStudentByInstitute error:",
        error
      );

      throw error;
    }
  };


/* =========================================================
   DELETE / DEACTIVATE STUDENT
=========================================================

Soft delete / deactivate.

========================================================= */

export const deleteStudentByInstitute =
  async (
    id
  ) => {
    try {
      if (
        id === null ||
        id === undefined ||
        id === ""
      ) {
        throw new Error(
          "Student ID is required"
        );
      }

      const res = await API.delete(
        `/students/institute-delete/${id}`
      );

      return (
        res.data ||
        {}
      );

    } catch (error) {
      console.error(
        "deleteStudentByInstitute error:",
        error
      );

      throw error;
    }
  };


/* =========================================================
   TRAINERS
========================================================= */

export const getTrainersByInstitute =
  async () => {
    try {
      const res = await API.get(
        "/trainers/institute"
      );

      return (
        res.data?.data ||
        []
      );

    } catch (error) {
      console.error(
        "getTrainersByInstitute error:",
        error
      );

      throw error;
    }
  };


/* =========================================================
   CATEGORIES
========================================================= */

export const getCategories =
  async () => {
    try {
      const res = await API.get(
        "/categories"
      );

      return (
        res.data?.data ||
        []
      );

    } catch (error) {
      console.error(
        "getCategories error:",
        error
      );

      throw error;
    }
  };


/* =========================================================
   SUBCATEGORIES
========================================================= */

export const getSubcategories =
  async () => {
    try {
      const res = await API.get(
        "/subcategories"
      );

      return (
        res.data?.data ||
        []
      );

    } catch (error) {
      console.error(
        "getSubcategories error:",
        error
      );

      throw error;
    }
  };