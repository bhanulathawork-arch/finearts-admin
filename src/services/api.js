// import axios from "axios";
// import { getAuth, signOut } from "firebase/auth";

// /* =========================================================
//    API BASE URL
// ========================================================= */

// const API_BASE_URL =
//   import.meta.env.VITE_API_URL ||
//   "https://finearts-backend.onrender.com/api";

// /* =========================================================
//    AXIOS INSTANCE
// ========================================================= */

// const API = axios.create({
//   baseURL: API_BASE_URL,
//   timeout: 120000,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// /* =========================================================
//    PATH HELPERS
// ========================================================= */

// const getPath = () => {
//   return window.location.pathname || "/";
// };

// const getRequestUrl = (config = {}) => {
//   return String(config.url || "")
//     .split("?")[0]
//     .replace(/\/+$/, "")
//     .toLowerCase();
// };

// /* =========================================================
//    PAGE TYPES
// ========================================================= */

// const isAdminPage = () => {
//   const path = getPath();

//   return (
//     path === "/admin-login" ||
//     path === "/admin" ||
//     path.startsWith("/admin/") ||
//     path === "/dashboard" ||
//     path.startsWith("/dashboard/")
//   );
// };

// const isInstituteRoute = () => {
//   const path = getPath();

//   return (
//     path === "/institute" ||
//     path.startsWith("/institute/")
//   );
// };

// const isWebsitePreviewRoute = () => {
//   const path = getPath();

//   return (
//     path === "/institute/website/preview" ||
//     path.startsWith("/institute/website/preview/")
//   );
// };

// const isTrainerPage = () => {
//   const path = getPath();

//   return (
//     path === "/trainer-login" ||
//     path === "/trainer" ||
//     path.startsWith("/trainer/")
//   );
// };

// /* =========================================================
//    PUBLIC WEBSITE API
// ========================================================= */

// const isPublicWebsiteApiRoute = (config = {}) => {
//   const url = getRequestUrl(config);

//   return (
//     url === "/websites/public" ||
//     url.startsWith("/websites/public/") ||
//     url === "/footer" ||
//     url.startsWith("/footer/")
//   );
// };

// /* =========================================================
//    ADMIN LOGIN REQUEST
// ========================================================= */

// const isAdminLoginRequest = (config = {}) => {
//   const url = getRequestUrl(config);

//   return (
//     url === "/admin-auth/login" ||
//     url === "/admin/login" ||
//     url === "/admin/signin" ||
//     url === "/auth/admin/login" ||
//     url === "/auth/admin/signin"
//   );
// };

// /* =========================================================
//    FIREBASE LOGIN REQUESTS
// ========================================================= */

// const isFirebaseLoginRequest = (config = {}) => {
//   const url = getRequestUrl(config);

//   return (
//     url === "/institutes/login" ||
//     url === "/trainers/login" ||
//     url === "/students/login"
//   );
// };

// /* =========================================================
//    FIREBASE API ROUTES
// ========================================================= */

// const isFirebaseApiRoute = (config = {}) => {
//   const url = getRequestUrl(config);

//   /* -------------------------------------------------------
//      PUBLIC WEBSITE MUST NEVER BE FIREBASE
//   ------------------------------------------------------- */

//   if (isPublicWebsiteApiRoute(config)) {
//     return false;
//   }

//   /* -------------------------------------------------------
//      FIREBASE LOGIN
//   ------------------------------------------------------- */

//   if (isFirebaseLoginRequest(config)) {
//     return true;
//   }

//   /* -------------------------------------------------------
//      EXPLICIT FIREBASE ROUTES
//   ------------------------------------------------------- */

//   const firebaseExactRoutes = [
//     "/trainers/institute",
//     "/testimonials/institute",
//   ];

//   const firebasePrefixes = [
//     "/trainers/institute/",
//     "/testimonials/institute/",
//   ];

//   if (
//     firebaseExactRoutes.includes(url) ||
//     firebasePrefixes.some((prefix) =>
//       url.startsWith(prefix)
//     )
//   ) {
//     return true;
//   }

//   /* -------------------------------------------------------
//      INSTITUTE APPLICATION
//   ------------------------------------------------------- */

//   if (isInstituteRoute()) {
//     return true;
//   }

//   /* -------------------------------------------------------
//      TRAINER APPLICATION
//   ------------------------------------------------------- */

//   if (isTrainerPage()) {
//     return true;
//   }

//   /* -------------------------------------------------------
//      USER / STUDENT APPLICATION
//   ------------------------------------------------------- */

//   if (
//     url === "/users" ||
//     url.startsWith("/users/") ||
//     url === "/students" ||
//     url.startsWith("/students/")
//   ) {
//     return true;
//   }

//   /* -------------------------------------------------------
//      LMS TRAINER / USER / STUDENT
//   ------------------------------------------------------- */

//   if (
//     url.startsWith("/lms/trainer/") ||
//     url.startsWith("/lms/users/") ||
//     url.startsWith("/lms/user/") ||
//     url.startsWith("/lms/students/")
//   ) {
//     return true;
//   }

//   /* -------------------------------------------------------
//      ATTENDANCE
//   ------------------------------------------------------- */

//   if (url.startsWith("/attendance/")) {
//     return true;
//   }

//   /* -------------------------------------------------------
//      RECORDINGS
//   ------------------------------------------------------- */

//   if (url.startsWith("/recordings/")) {
//     return true;
//   }

//   return false;
// };

// /* =========================================================
//    ADMIN API ROUTES
// ========================================================= */

// const isAdminApiRoute = (config = {}) => {
//   const url = getRequestUrl(config);

//   /* -------------------------------------------------------
//      PUBLIC WEBSITE IS NOT ADMIN
//   ------------------------------------------------------- */

//   if (isPublicWebsiteApiRoute(config)) {
//     return false;
//   }

//   /* -------------------------------------------------------
//      ADMIN LOGIN IS PUBLIC
//   ------------------------------------------------------- */

//   if (isAdminLoginRequest(config)) {
//     return false;
//   }

//   /* -------------------------------------------------------
//      FIREBASE LOGIN IS NOT ADMIN
//   ------------------------------------------------------- */

//   if (isFirebaseLoginRequest(config)) {
//     return false;
//   }

//   /* -------------------------------------------------------
//      USERS ADMIN APIs
//   ------------------------------------------------------- */

//   if (
//     url === "/users/admin" ||
//     url.startsWith("/users/admin/")
//   ) {
//     return true;
//   }

//   /* -------------------------------------------------------
//      USER STATUS
//   ------------------------------------------------------- */

//   if (/^\/users\/\d+\/status$/.test(url)) {
//     return true;
//   }

//   /* -------------------------------------------------------
//      FIREBASE ROUTES ARE NOT ADMIN
//   ------------------------------------------------------- */

//   if (isFirebaseApiRoute(config)) {
//     return false;
//   }

//   /* -------------------------------------------------------
//      EXPLICIT ADMIN ROUTES
//   ------------------------------------------------------- */

//   if (
//     url === "/admin" ||
//     url.startsWith("/admin/")
//   ) {
//     return true;
//   }

//   /* -------------------------------------------------------
//      ADMIN API PREFIXES
//   ------------------------------------------------------- */

//   const adminApiPrefixes = [
//     "/dashboard",
//     "/categories",
//     "/subcategories",
//     "/banners",
//     "/classes",
//     "/sessions",
//     "/trainers",
//     "/institutes",
//     "/students",
//     "/bookings",
//     "/testimonials",
//   ];

//   const matchesAdminPrefix =
//     adminApiPrefixes.some((prefix) => {
//       return (
//         url === prefix ||
//         url.startsWith(`${prefix}/`)
//       );
//     });

//   /* -------------------------------------------------------
//      SAFETY
//   ------------------------------------------------------- */

//   if (
//     isInstituteRoute() ||
//     isTrainerPage()
//   ) {
//     return false;
//   }

//   return matchesAdminPrefix;
// };

// /* =========================================================
//    GET FIREBASE TOKEN
// ========================================================= */

// const getFirebaseToken = async () => {
//   const auth = getAuth();

//   /* -------------------------------------------------------
//      CURRENT FIREBASE USER
//   ------------------------------------------------------- */

//   if (auth.currentUser) {
//     try {
//       /*
//         IMPORTANT:
//         Do NOT force-refresh the token on every request.
//         Using getIdToken() allows Firebase to use the
//         existing cached token when it is still valid.
//       */

//       const token =
//         await auth.currentUser.getIdToken();

//       if (!token) {
//         return null;
//       }

//       /* Normal Firebase token */

//       localStorage.setItem(
//         "token",
//         token
//       );

//       /* Website Preview / Student */

//       if (
//         isWebsitePreviewRoute() ||
//         localStorage.getItem("studentToken")
//       ) {
//         localStorage.setItem(
//           "studentToken",
//           token
//         );
//       }

//       return token;

//     } catch (error) {
//       console.error(
//         "Firebase token retrieval failed:",
//         error
//       );
//     }
//   }

//   /* -------------------------------------------------------
//      STUDENT TOKEN
//   ------------------------------------------------------- */

//   const studentToken =
//     localStorage.getItem("studentToken");

//   if (studentToken) {
//     return studentToken;
//   }

//   /* -------------------------------------------------------
//      FIREBASE TOKEN FALLBACK
//   ------------------------------------------------------- */

//   const storedToken =
//     localStorage.getItem("token");

//   if (storedToken) {
//     return storedToken;
//   }

//   return null;
// };

// /* =========================================================
//    GET ADMIN TOKEN
// ========================================================= */

// const getAdminToken = () => {
//   const possibleKeys = [
//     "adminToken",
//     "admin_token",
//     "adminAccessToken",
//     "admin_access_token",
//     "adminAuthToken",
//     "admin_auth_token",
//   ];

//   /* -------------------------------------------------------
//      CHECK LOCAL STORAGE ADMIN KEYS
//   ------------------------------------------------------- */

//   for (const key of possibleKeys) {
//     const value =
//       localStorage.getItem(key);

//     if (
//       value &&
//       typeof value === "string" &&
//       value !== "undefined" &&
//       value !== "null" &&
//       value.trim()
//     ) {
//       return value.trim();
//     }
//   }

//   /* -------------------------------------------------------
//      CHECK SESSION STORAGE ADMIN KEYS
//   ------------------------------------------------------- */

//   for (const key of possibleKeys) {
//     const value =
//       sessionStorage.getItem(key);

//     if (
//       value &&
//       typeof value === "string" &&
//       value !== "undefined" &&
//       value !== "null" &&
//       value.trim()
//     ) {
//       return value.trim();
//     }
//   }

//   /* -------------------------------------------------------
//      FALLBACK:
//      Some Admin login implementations store JWT as token.
//   ------------------------------------------------------- */

//   const adminUserKeys = [
//     "adminUser",
//     "admin_user",
//     "admin",
//     "adminProfile",
//     "admin_profile",
//   ];

//   const hasAdminUser =
//     adminUserKeys.some((key) => {
//       const localValue =
//         localStorage.getItem(key);

//       const sessionValue =
//         sessionStorage.getItem(key);

//       return (
//         !!localValue ||
//         !!sessionValue
//       );
//     });

//   if (hasAdminUser) {
//     const genericToken =
//       localStorage.getItem("token") ||
//       sessionStorage.getItem("token");

//     if (
//       genericToken &&
//       genericToken !== "undefined" &&
//       genericToken !== "null"
//     ) {
//       return genericToken.trim();
//     }
//   }

//   return null;
// };

// /* =========================================================
//    REQUEST INTERCEPTOR
// ========================================================= */

// API.interceptors.request.use(
//   async (config) => {
//     config.headers =
//       config.headers || {};

//     const method =
//       config.method?.toUpperCase() ||
//       "GET";

//     const url =
//       config.url || "";

//     /* =====================================================
//        1. ADMIN LOGIN
//     ===================================================== */

//     if (isAdminLoginRequest(config)) {
//       console.log(
//         "================================="
//       );

//       console.log(
//         "ADMIN LOGIN REQUEST"
//       );

//       console.log(
//         "Page:",
//         getPath()
//       );

//       console.log(
//         "Request:",
//         method,
//         url
//       );

//       console.log(
//         "Authentication:",
//         "NO ADMIN TOKEN REQUIRED"
//       );

//       console.log(
//         "================================="
//       );

//       delete config.headers.Authorization;
//       delete config.headers.authorization;

//       return config;
//     }

//     /* =====================================================
//        2. FIREBASE LOGIN
//     ===================================================== */

//     if (isFirebaseLoginRequest(config)) {
//       console.log(
//         "================================="
//       );

//       console.log(
//         "FIREBASE LOGIN REQUEST"
//       );

//       console.log(
//         "Page:",
//         getPath()
//       );

//       console.log(
//         "Request:",
//         method,
//         url
//       );

//       const existingAuthorization =
//         config.headers.Authorization ||
//         config.headers.authorization;

//       if (existingAuthorization) {
//         console.log(
//           "Firebase Authorization:",
//           "PROVIDED"
//         );

//         return config;
//       }

//       const firebaseToken =
//         await getFirebaseToken();

//       console.log(
//         "Firebase Token:",
//         firebaseToken
//           ? "FOUND"
//           : "NOT FOUND"
//       );

//       if (!firebaseToken) {
//         return Promise.reject(
//           new Error(
//             "Firebase authentication token not found"
//           )
//         );
//       }

//       config.headers.Authorization =
//         `Bearer ${firebaseToken}`;

//       return config;
//     }

//     /* =====================================================
//        3. PUBLIC WEBSITE API
//     ===================================================== */

//     if (isPublicWebsiteApiRoute(config)) {
//       console.log(
//         "================================="
//       );

//       console.log(
//         "PUBLIC WEBSITE API REQUEST"
//       );

//       console.log(
//         "Page:",
//         getPath()
//       );

//       console.log(
//         "Request:",
//         method,
//         url
//       );

//       console.log(
//         "Authentication:",
//         "NOT REQUIRED"
//       );

//       console.log(
//         "Website Preview:",
//         isWebsitePreviewRoute()
//           ? "YES"
//           : "NO"
//       );

//       console.log(
//         "================================="
//       );

//       delete config.headers.Authorization;
//       delete config.headers.authorization;

//       return config;
//     }

//     /* =====================================================
//        4. ADMIN PROTECTED API
//     ===================================================== */

//     if (isAdminApiRoute(config)) {
//       const adminToken =
//         getAdminToken();

//       console.log(
//         "================================="
//       );

//       console.log(
//         "ADMIN API REQUEST"
//       );

//       console.log(
//         "Page:",
//         getPath()
//       );

//       console.log(
//         "Request:",
//         method,
//         url
//       );

//       console.log(
//         "Admin Token:",
//         adminToken
//           ? "FOUND"
//           : "NOT FOUND"
//       );

//       console.log(
//         "================================="
//       );

//       if (!adminToken) {
//         return Promise.reject(
//           new Error(
//             "Admin token missing. Please login again."
//           )
//         );
//       }

//       config.headers.Authorization =
//         `Bearer ${adminToken}`;

//       return config;
//     }

//     /* =====================================================
//        5. FIREBASE PROTECTED API
//     ===================================================== */

//     if (isFirebaseApiRoute(config)) {
//       console.log(
//         "================================="
//       );

//       console.log(
//         "FIREBASE PROTECTED API REQUEST"
//       );

//       console.log(
//         "Page:",
//         getPath()
//       );

//       console.log(
//         "Request:",
//         method,
//         url
//       );

//       console.log(
//         "Authentication:",
//         "FIREBASE"
//       );

//       const token =
//         await getFirebaseToken();

//       console.log(
//         "Firebase Token:",
//         token
//           ? "FOUND"
//           : "NOT FOUND"
//       );

//       console.log(
//         "================================="
//       );

//       if (!token) {
//         return Promise.reject(
//           new Error(
//             "Firebase user not authenticated"
//           )
//         );
//       }

//       config.headers.Authorization =
//         `Bearer ${token}`;

//       return config;
//     }

//     /* =====================================================
//        6. PUBLIC API
//     ===================================================== */

//     console.log(
//       "================================="
//     );

//     console.log(
//       "PUBLIC API REQUEST"
//     );

//     console.log(
//       "Page:",
//       getPath()
//     );

//     console.log(
//       "Request:",
//       method,
//       url
//     );

//     console.log(
//       "Authentication:",
//       "NOT REQUIRED"
//     );

//     console.log(
//       "================================="
//     );

//     delete config.headers.Authorization;
//     delete config.headers.authorization;

//     return config;
//   },

//   (error) => {
//     return Promise.reject(error);
//   }
// );

// /* =========================================================
//    RESPONSE INTERCEPTOR
// ========================================================= */

// API.interceptors.response.use(
//   (response) => {
//     console.log(
//       "API RESPONSE:",
//       response.status,
//       response.config?.url
//     );

//     return response;
//   },

//   async (error) => {
//     const originalRequest =
//       error.config;

//     console.error(
//       "API ERROR:",
//       error.response?.status ||
//         "NO RESPONSE",
//       originalRequest?.url,
//       error.message
//     );

//     if (!originalRequest) {
//       return Promise.reject(error);
//     }

//     /* =====================================================
//        LOGIN FAILURE
//     ===================================================== */

//     if (
//       isAdminLoginRequest(
//         originalRequest
//       ) ||
//       isFirebaseLoginRequest(
//         originalRequest
//       )
//     ) {
//       console.error(
//         "LOGIN REQUEST FAILED"
//       );

//       console.error(
//         "Response:",
//         error.response?.data
//       );

//       return Promise.reject(error);
//     }

//     /* =====================================================
//        PUBLIC WEBSITE FAILURE
//     ===================================================== */

//     if (
//       isPublicWebsiteApiRoute(
//         originalRequest
//       )
//     ) {
//       console.error(
//         "PUBLIC WEBSITE API FAILED"
//       );

//       console.error(
//         "Response:",
//         error.response?.data
//       );

//       return Promise.reject(error);
//     }

//     /* =====================================================
//        ONLY RETRY 401 ONCE
//     ===================================================== */

//     if (
//       error.response?.status !== 401 ||
//       originalRequest._retry
//     ) {
//       return Promise.reject(error);
//     }

//     originalRequest._retry = true;

//     /* =====================================================
//        ADMIN 401
//     ===================================================== */

//     if (
//       isAdminApiRoute(
//         originalRequest
//       )
//     ) {
//       console.error(
//         "ADMIN SESSION INVALID OR EXPIRED"
//       );

//       console.error(
//         "Response:",
//         error.response?.data
//       );

//       /* ---------------------------------------------------
//          CLEAR ADMIN SESSION ONLY
//       --------------------------------------------------- */

//       localStorage.removeItem(
//         "adminToken"
//       );

//       localStorage.removeItem(
//         "admin_token"
//       );

//       localStorage.removeItem(
//         "adminAccessToken"
//       );

//       localStorage.removeItem(
//         "admin_access_token"
//       );

//       localStorage.removeItem(
//         "adminAuthToken"
//       );

//       localStorage.removeItem(
//         "admin_auth_token"
//       );

//       sessionStorage.removeItem(
//         "adminToken"
//       );

//       sessionStorage.removeItem(
//         "admin_token"
//       );

//       sessionStorage.removeItem(
//         "adminAccessToken"
//       );

//       sessionStorage.removeItem(
//         "admin_access_token"
//       );

//       sessionStorage.removeItem(
//         "adminAuthToken"
//       );

//       sessionStorage.removeItem(
//         "admin_auth_token"
//       );

//       localStorage.removeItem(
//         "adminUser"
//       );

//       localStorage.removeItem(
//         "admin_user"
//       );

//       /* ---------------------------------------------------
//          DO NOT REMOVE FIREBASE TOKEN
//       --------------------------------------------------- */

//       if (isAdminPage()) {
//         window.location.replace(
//           "/admin-login"
//         );
//       }

//       return Promise.reject(error);
//     }

//     /* =====================================================
//        FIREBASE 401
//     ===================================================== */

//     if (
//       isFirebaseApiRoute(
//         originalRequest
//       )
//     ) {
//       try {
//         const auth =
//           getAuth();

//         if (!auth.currentUser) {
//           console.error(
//             "Firebase user no longer exists"
//           );

//           return Promise.reject(error);
//         }

//         /*
//           IMPORTANT:
//           Force refresh ONLY after an actual 401.
//           This is intentionally getIdToken(true).
//         */

//         const freshToken =
//           await auth.currentUser.getIdToken(
//             true
//           );

//         if (!freshToken) {
//           throw new Error(
//             "Fresh Firebase token not generated"
//           );
//         }

//         /* -------------------------------------------------
//            SAVE FIREBASE TOKEN
//         ------------------------------------------------- */

//         localStorage.setItem(
//           "token",
//           freshToken
//         );

//         if (
//           isWebsitePreviewRoute() ||
//           localStorage.getItem(
//             "studentToken"
//           )
//         ) {
//           localStorage.setItem(
//             "studentToken",
//             freshToken
//           );
//         }

//         /* -------------------------------------------------
//            RETRY REQUEST
//         ------------------------------------------------- */

//         originalRequest.headers =
//           originalRequest.headers ||
//           {};

//         originalRequest.headers.Authorization =
//           `Bearer ${freshToken}`;

//         console.log(
//           "Retrying Firebase request with refreshed token"
//         );

//         return API(
//           originalRequest
//         );

//       } catch (refreshError) {
//         console.error(
//           "Firebase token refresh failed:",
//           refreshError
//         );

//         /* ---------------------------------------------------
//            FIREBASE SIGN OUT
//         --------------------------------------------------- */

//         try {
//           await signOut(
//             getAuth()
//           );
//         } catch (signOutError) {
//           console.error(
//             "Firebase signOut failed:",
//             signOutError
//           );
//         }

//         /* ---------------------------------------------------
//            CLEAR FIREBASE SESSION
//         --------------------------------------------------- */

//         localStorage.removeItem(
//           "token"
//         );

//         localStorage.removeItem(
//           "studentToken"
//         );

//         localStorage.removeItem(
//           "studentUser"
//         );

//         localStorage.removeItem(
//           "studentProfile"
//         );

//         localStorage.removeItem(
//           "studentRole"
//         );

//         /* ---------------------------------------------------
//            DO NOT CLEAR ADMIN TOKEN
//         --------------------------------------------------- */

//         /* ---------------------------------------------------
//            REDIRECT
//         --------------------------------------------------- */

//         if (
//           isWebsitePreviewRoute()
//         ) {
//           window.location.replace(
//             "/institute/website/preview"
//           );
//         } else if (
//           isTrainerPage()
//         ) {
//           window.location.replace(
//             "/trainer-login"
//           );
//         } else if (
//           isInstituteRoute()
//         ) {
//           window.location.replace(
//             "/institute-login"
//           );
//         } else {
//           window.location.replace(
//             "/institute/login"
//           );
//         }

//         return Promise.reject(
//           refreshError
//         );
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// /* =========================================================
//    IMPORTANT COMPATIBILITY FIX
// ========================================================= */

// /*
//    Your application has some files using:

//       api.get(...)
//       api.post(...)
//       api.put(...)
//       api.delete(...)

//    while this Axios instance was originally named:

//       API

//    Therefore expose BOTH names.
// */

// const api = API;

// /* =========================================================
//    EXPORT
// ========================================================= */

// export {
//   API,
//   api,
// };

// export default API;



import axios from "axios";
import { getAuth, signOut } from "firebase/auth";

/* =========================================================
   API BASE URL
========================================================= */

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://finearts-backend.onrender.com/api";

/* =========================================================
   AXIOS INSTANCE
========================================================= */

const API = axios.create({
  baseURL: API_BASE_URL,
  timeout: 120000,
  headers: {
    "Content-Type": "application/json",
  },
});

/* =========================================================
   FIREBASE TOKEN CONTROL
========================================================= */

let firebaseTokenPromise = null;

/*
  Prevent repeated Firebase refresh attempts when Firebase
  itself is temporarily returning quota errors.
*/
let lastFirebaseTokenFailureAt = 0;

const FIREBASE_TOKEN_FAILURE_COOLDOWN = 30000;

/* =========================================================
   PATH HELPERS
========================================================= */

const getPath = () => {
  if (typeof window === "undefined") {
    return "/";
  }

  return window.location.pathname || "/";
};

const getRequestUrl = (config = {}) => {
  return String(config.url || "")
    .split("?")[0]
    .replace(/\/+$/, "")
    .toLowerCase();
};

/* =========================================================
   PAGE TYPES
========================================================= */

const isAdminPage = () => {
  const path = getPath();

  return (
    path === "/admin-login" ||
    path === "/admin" ||
    path.startsWith("/admin/") ||
    path === "/dashboard" ||
    path.startsWith("/dashboard/")
  );
};

const isInstituteRoute = () => {
  const path = getPath();

  return (
    path === "/institute" ||
    path.startsWith("/institute/")
  );
};

const isWebsitePreviewRoute = () => {
  const path = getPath();

  return (
    path === "/institute/website/preview" ||
    path.startsWith("/institute/website/preview/")
  );
};

const isTrainerPage = () => {
  const path = getPath();

  return (
    path === "/trainer-login" ||
    path === "/trainer" ||
    path.startsWith("/trainer/")
  );
};

/* =========================================================
   PUBLIC WEBSITE API
========================================================= */

const isPublicWebsiteApiRoute = (config = {}) => {
  const url = getRequestUrl(config);

  return (
    url === "/websites/public" ||
    url.startsWith("/websites/public/") ||
    url === "/footer" ||
    url.startsWith("/footer/")
  );
};

/* =========================================================
   ADMIN LOGIN REQUEST
========================================================= */

const isAdminLoginRequest = (config = {}) => {
  const url = getRequestUrl(config);

  return (
    url === "/admin-auth/login" ||
    url === "/admin/login" ||
    url === "/admin/signin" ||
    url === "/auth/admin/login" ||
    url === "/auth/admin/signin"
  );
};

/* =========================================================
   FIREBASE LOGIN REQUESTS
========================================================= */

const isFirebaseLoginRequest = (config = {}) => {
  const url = getRequestUrl(config);

  return (
    url === "/institutes/login" ||
    url === "/trainers/login" ||
    url === "/students/login"
  );
};

/* =========================================================
   FIREBASE API ROUTES
========================================================= */

const isFirebaseApiRoute = (config = {}) => {
  const url = getRequestUrl(config);

  /* -------------------------------------------------------
     PUBLIC WEBSITE MUST NEVER USE FIREBASE
  ------------------------------------------------------- */

  if (isPublicWebsiteApiRoute(config)) {
    return false;
  }

  /* -------------------------------------------------------
     FIREBASE LOGIN
  ------------------------------------------------------- */

  if (isFirebaseLoginRequest(config)) {
    return true;
  }

  /* -------------------------------------------------------
     EXPLICIT FIREBASE ROUTES
  ------------------------------------------------------- */

  const firebaseExactRoutes = [
    "/trainers/institute",
    "/testimonials/institute",
  ];

  const firebasePrefixes = [
    "/trainers/institute/",
    "/testimonials/institute/",
  ];

  if (
    firebaseExactRoutes.includes(url) ||
    firebasePrefixes.some((prefix) =>
      url.startsWith(prefix)
    )
  ) {
    return true;
  }

  /* -------------------------------------------------------
     INSTITUTE APPLICATION
  ------------------------------------------------------- */

  if (isInstituteRoute()) {
    return true;
  }

  /* -------------------------------------------------------
     TRAINER APPLICATION
  ------------------------------------------------------- */

  if (isTrainerPage()) {
    return true;
  }

  /* -------------------------------------------------------
     USER / STUDENT APPLICATION
  ------------------------------------------------------- */

  if (
    url === "/users" ||
    url.startsWith("/users/") ||
    url === "/students" ||
    url.startsWith("/students/")
  ) {
    return true;
  }

  /* -------------------------------------------------------
     LMS TRAINER / USER / STUDENT
  ------------------------------------------------------- */

  if (
    url.startsWith("/lms/trainer/") ||
    url.startsWith("/lms/users/") ||
    url.startsWith("/lms/user/") ||
    url.startsWith("/lms/students/")
  ) {
    return true;
  }

  /* -------------------------------------------------------
     ATTENDANCE
  ------------------------------------------------------- */

  if (url.startsWith("/attendance/")) {
    return true;
  }

  /* -------------------------------------------------------
     RECORDINGS
  ------------------------------------------------------- */

  if (url.startsWith("/recordings/")) {
    return true;
  }

  return false;
};

/* =========================================================
   ADMIN API ROUTES
========================================================= */

const isAdminApiRoute = (config = {}) => {
  const url = getRequestUrl(config);

  /* -------------------------------------------------------
     PUBLIC WEBSITE IS NOT ADMIN
  ------------------------------------------------------- */

  if (isPublicWebsiteApiRoute(config)) {
    return false;
  }

  /* -------------------------------------------------------
     ADMIN LOGIN IS PUBLIC
  ------------------------------------------------------- */

  if (isAdminLoginRequest(config)) {
    return false;
  }

  /* -------------------------------------------------------
     FIREBASE LOGIN IS NOT ADMIN
  ------------------------------------------------------- */

  if (isFirebaseLoginRequest(config)) {
    return false;
  }

  /* -------------------------------------------------------
     USERS ADMIN APIs
  ------------------------------------------------------- */

  if (
    url === "/users/admin" ||
    url.startsWith("/users/admin/")
  ) {
    return true;
  }

  /* -------------------------------------------------------
     USER STATUS
  ------------------------------------------------------- */

  if (/^\/users\/\d+\/status$/.test(url)) {
    return true;
  }

  /* -------------------------------------------------------
     FIREBASE ROUTES ARE NOT ADMIN
  ------------------------------------------------------- */

  if (isFirebaseApiRoute(config)) {
    return false;
  }

  /* -------------------------------------------------------
     EXPLICIT ADMIN ROUTES
  ------------------------------------------------------- */

  if (
    url === "/admin" ||
    url.startsWith("/admin/")
  ) {
    return true;
  }

  /* -------------------------------------------------------
     ADMIN API PREFIXES
  ------------------------------------------------------- */

  const adminApiPrefixes = [
    "/dashboard",
    "/categories",
    "/subcategories",
    "/banners",
    "/classes",
    "/sessions",
    "/trainers",
    "/institutes",
    "/students",
    "/bookings",
    "/testimonials",
  ];

  const matchesAdminPrefix =
    adminApiPrefixes.some((prefix) => {
      return (
        url === prefix ||
        url.startsWith(`${prefix}/`)
      );
    });

  /* -------------------------------------------------------
     SAFETY
  ------------------------------------------------------- */

  if (
    isInstituteRoute() ||
    isTrainerPage()
  ) {
    return false;
  }

  return matchesAdminPrefix;
};

/* =========================================================
   STORED FIREBASE TOKEN
========================================================= */

const getStoredFirebaseToken = () => {
  if (typeof window === "undefined") {
    return null;
  }

  /* -------------------------------------------------------
     STUDENT TOKEN
  ------------------------------------------------------- */

  const studentToken =
    localStorage.getItem("studentToken");

  if (
    studentToken &&
    studentToken !== "undefined" &&
    studentToken !== "null" &&
    studentToken.trim()
  ) {
    return studentToken.trim();
  }

  /* -------------------------------------------------------
     GENERIC TOKEN
  ------------------------------------------------------- */

  const storedToken =
    localStorage.getItem("token");

  if (
    storedToken &&
    storedToken !== "undefined" &&
    storedToken !== "null" &&
    storedToken.trim()
  ) {
    return storedToken.trim();
  }

  return null;
};

/* =========================================================
   SAVE FIREBASE TOKEN
========================================================= */

const saveFirebaseToken = (token) => {
  if (
    typeof window === "undefined" ||
    !token
  ) {
    return;
  }

  localStorage.setItem(
    "token",
    token
  );

  /*
    Keep studentToken synchronized when the student
    or preview flow is active.
  */

  if (
    isWebsitePreviewRoute() ||
    localStorage.getItem("studentToken")
  ) {
    localStorage.setItem(
      "studentToken",
      token
    );
  }
};

/* =========================================================
   GET FIREBASE TOKEN
========================================================= */

/*
  IMPORTANT:

  Normal API requests:

      Stored token
          ↓
      API request

  They DO NOT unnecessarily call Firebase.

  Firebase is called only when:

      1. No stored token exists
      2. OR a real 401 requires forceRefresh
*/

const getFirebaseToken = async ({
  forceRefresh = false,
} = {}) => {
  const auth = getAuth();

  /* -------------------------------------------------------
     1. USE STORED TOKEN FIRST
  ------------------------------------------------------- */

  if (!forceRefresh) {
    const storedToken =
      getStoredFirebaseToken();

    if (storedToken) {
      console.log(
        "Firebase Token: USING STORED TOKEN"
      );

      return storedToken;
    }
  }

  /* -------------------------------------------------------
     2. CHECK FIREBASE USER
  ------------------------------------------------------- */

  if (!auth.currentUser) {
    console.warn(
      "Firebase Token: NO CURRENT USER"
    );

    return getStoredFirebaseToken();
  }

  /* -------------------------------------------------------
     3. PREVENT RAPID FAILED REFRESHES
  ------------------------------------------------------- */

  const now = Date.now();

  if (
    !forceRefresh &&
    lastFirebaseTokenFailureAt > 0 &&
    now - lastFirebaseTokenFailureAt <
      FIREBASE_TOKEN_FAILURE_COOLDOWN
  ) {
    const storedToken =
      getStoredFirebaseToken();

    if (storedToken) {
      console.warn(
        "Firebase refresh recently failed. Using stored token."
      );

      return storedToken;
    }

    return null;
  }

  /* -------------------------------------------------------
     4. SHARE ONE FIREBASE REQUEST
  ------------------------------------------------------- */

  try {
    if (
      !forceRefresh &&
      firebaseTokenPromise
    ) {
      return await firebaseTokenPromise;
    }

    firebaseTokenPromise =
      auth.currentUser.getIdToken(
        forceRefresh
      );

    const token =
      await firebaseTokenPromise;

    firebaseTokenPromise = null;

    lastFirebaseTokenFailureAt = 0;

    /* -----------------------------------------------------
       5. VALIDATE TOKEN
    ----------------------------------------------------- */

    if (!token) {
      return null;
    }

    /* -----------------------------------------------------
       6. SAVE TOKEN
    ----------------------------------------------------- */

    saveFirebaseToken(token);

    console.log(
      "Firebase Token: FIREBASE TOKEN GENERATED"
    );

    return token;

  } catch (error) {
    firebaseTokenPromise = null;

    lastFirebaseTokenFailureAt =
      Date.now();

    console.error(
      "Firebase token retrieval failed:",
      error
    );

    /* -----------------------------------------------------
       7. FALLBACK TO EXISTING TOKEN
    ----------------------------------------------------- */

    const fallbackToken =
      getStoredFirebaseToken();

    if (fallbackToken) {
      console.warn(
        "Firebase failed. Using stored token."
      );

      return fallbackToken;
    }

    return null;
  }
};

/* =========================================================
   GET ADMIN TOKEN
========================================================= */

const getAdminToken = () => {
  if (typeof window === "undefined") {
    return null;
  }

  const possibleKeys = [
    "adminToken",
    "admin_token",
    "adminAccessToken",
    "admin_access_token",
    "adminAuthToken",
    "admin_auth_token",
  ];

  /* -------------------------------------------------------
     LOCAL STORAGE
  ------------------------------------------------------- */

  for (const key of possibleKeys) {
    const value =
      localStorage.getItem(key);

    if (
      value &&
      typeof value === "string" &&
      value !== "undefined" &&
      value !== "null" &&
      value.trim()
    ) {
      return value.trim();
    }
  }

  /* -------------------------------------------------------
     SESSION STORAGE
  ------------------------------------------------------- */

  for (const key of possibleKeys) {
    const value =
      sessionStorage.getItem(key);

    if (
      value &&
      typeof value === "string" &&
      value !== "undefined" &&
      value !== "null" &&
      value.trim()
    ) {
      return value.trim();
    }
  }

  /* -------------------------------------------------------
     ADMIN USER FALLBACK
  ------------------------------------------------------- */

  const adminUserKeys = [
    "adminUser",
    "admin_user",
    "admin",
    "adminProfile",
    "admin_profile",
  ];

  const hasAdminUser =
    adminUserKeys.some((key) => {
      const localValue =
        localStorage.getItem(key);

      const sessionValue =
        sessionStorage.getItem(key);

      return (
        !!localValue ||
        !!sessionValue
      );
    });

  if (hasAdminUser) {
    const genericToken =
      localStorage.getItem("token") ||
      sessionStorage.getItem("token");

    if (
      genericToken &&
      genericToken !== "undefined" &&
      genericToken !== "null" &&
      genericToken.trim()
    ) {
      return genericToken.trim();
    }
  }

  return null;
};

/* =========================================================
   REQUEST INTERCEPTOR
========================================================= */

API.interceptors.request.use(
  async (config) => {
    config.headers =
      config.headers || {};

    const method =
      config.method?.toUpperCase() ||
      "GET";

    const url =
      config.url || "";

    /* =====================================================
       1. ADMIN LOGIN
    ===================================================== */

    if (isAdminLoginRequest(config)) {
      console.log(
        "================================="
      );

      console.log(
        "ADMIN LOGIN REQUEST"
      );

      console.log(
        "Page:",
        getPath()
      );

      console.log(
        "Request:",
        method,
        url
      );

      console.log(
        "Authentication:",
        "NO ADMIN TOKEN REQUIRED"
      );

      console.log(
        "================================="
      );

      delete config.headers.Authorization;
      delete config.headers.authorization;

      return config;
    }

    /* =====================================================
       2. FIREBASE LOGIN
    ===================================================== */

    if (isFirebaseLoginRequest(config)) {
      console.log(
        "================================="
      );

      console.log(
        "FIREBASE LOGIN REQUEST"
      );

      console.log(
        "Page:",
        getPath()
      );

      console.log(
        "Request:",
        method,
        url
      );

      const existingAuthorization =
        config.headers.Authorization ||
        config.headers.authorization;

      if (existingAuthorization) {
        console.log(
          "Firebase Authorization:",
          "PROVIDED"
        );

        return config;
      }

      const firebaseToken =
        await getFirebaseToken();

      console.log(
        "Firebase Token:",
        firebaseToken
          ? "FOUND"
          : "NOT FOUND"
      );

      if (!firebaseToken) {
        return Promise.reject(
          new Error(
            "Firebase authentication token not found"
          )
        );
      }

      config.headers.Authorization =
        `Bearer ${firebaseToken}`;

      return config;
    }

    /* =====================================================
       3. PUBLIC WEBSITE API

       /footer and /websites/public do NOT need Firebase.
    ===================================================== */

    if (isPublicWebsiteApiRoute(config)) {
      console.log(
        "================================="
      );

      console.log(
        "PUBLIC WEBSITE API REQUEST"
      );

      console.log(
        "Page:",
        getPath()
      );

      console.log(
        "Request:",
        method,
        url
      );

      console.log(
        "Authentication:",
        "NOT REQUIRED"
      );

      console.log(
        "Website Preview:",
        isWebsitePreviewRoute()
          ? "YES"
          : "NO"
      );

      console.log(
        "================================="
      );

      delete config.headers.Authorization;
      delete config.headers.authorization;

      return config;
    }

    /* =====================================================
       4. ADMIN PROTECTED API
    ===================================================== */

    if (isAdminApiRoute(config)) {
      const adminToken =
        getAdminToken();

      console.log(
        "================================="
      );

      console.log(
        "ADMIN API REQUEST"
      );

      console.log(
        "Page:",
        getPath()
      );

      console.log(
        "Request:",
        method,
        url
      );

      console.log(
        "Admin Token:",
        adminToken
          ? "FOUND"
          : "NOT FOUND"
      );

      console.log(
        "================================="
      );

      if (!adminToken) {
        return Promise.reject(
          new Error(
            "Admin token missing. Please login again."
          )
        );
      }

      config.headers.Authorization =
        `Bearer ${adminToken}`;

      return config;
    }

    /* =====================================================
       5. FIREBASE PROTECTED API
    ===================================================== */

    if (isFirebaseApiRoute(config)) {
      console.log(
        "================================="
      );

      console.log(
        "FIREBASE PROTECTED API REQUEST"
      );

      console.log(
        "Page:",
        getPath()
      );

      console.log(
        "Request:",
        method,
        url
      );

      console.log(
        "Authentication:",
        "FIREBASE"
      );

      const token =
        await getFirebaseToken();

      console.log(
        "Firebase Token:",
        token
          ? "FOUND"
          : "NOT FOUND"
      );

      console.log(
        "================================="
      );

      if (!token) {
        return Promise.reject(
          new Error(
            "Firebase user not authenticated"
          )
        );
      }

      config.headers.Authorization =
        `Bearer ${token}`;

      return config;
    }

    /* =====================================================
       6. PUBLIC API
    ===================================================== */

    console.log(
      "================================="
    );

    console.log(
      "PUBLIC API REQUEST"
    );

    console.log(
      "Page:",
      getPath()
    );

    console.log(
      "Request:",
      method,
      url
    );

    console.log(
      "Authentication:",
      "NOT REQUIRED"
    );

    console.log(
      "================================="
    );

    delete config.headers.Authorization;
    delete config.headers.authorization;

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

/* =========================================================
   RESPONSE INTERCEPTOR
========================================================= */

API.interceptors.response.use(
  (response) => {
    console.log(
      "API RESPONSE:",
      response.status,
      response.config?.url
    );

    return response;
  },

  async (error) => {
    const originalRequest =
      error.config;

    console.error(
      "API ERROR:",
      error.response?.status ||
        "NO RESPONSE",
      originalRequest?.url,
      error.message
    );

    if (!originalRequest) {
      return Promise.reject(error);
    }

    /* =====================================================
       LOGIN FAILURE
    ===================================================== */

    if (
      isAdminLoginRequest(
        originalRequest
      ) ||
      isFirebaseLoginRequest(
        originalRequest
      )
    ) {
      console.error(
        "LOGIN REQUEST FAILED"
      );

      console.error(
        "Response:",
        error.response?.data
      );

      return Promise.reject(error);
    }

    /* =====================================================
       PUBLIC WEBSITE FAILURE

       Never attempt Firebase refresh for these requests.
    ===================================================== */

    if (
      isPublicWebsiteApiRoute(
        originalRequest
      )
    ) {
      console.error(
        "PUBLIC WEBSITE API FAILED"
      );

      console.error(
        "Response:",
        error.response?.data
      );

      return Promise.reject(error);
    }

    /* =====================================================
       ONLY RETRY 401 ONCE
    ===================================================== */

    if (
      error.response?.status !== 401 ||
      originalRequest._retry
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    /* =====================================================
       ADMIN 401
    ===================================================== */

    if (
      isAdminApiRoute(
        originalRequest
      )
    ) {
      console.error(
        "ADMIN SESSION INVALID OR EXPIRED"
      );

      console.error(
        "Response:",
        error.response?.data
      );

      /* ---------------------------------------------------
         CLEAR ADMIN SESSION ONLY
      --------------------------------------------------- */

      const adminKeys = [
        "adminToken",
        "admin_token",
        "adminAccessToken",
        "admin_access_token",
        "adminAuthToken",
        "admin_auth_token",
        "adminUser",
        "admin_user",
      ];

      for (const key of adminKeys) {
        localStorage.removeItem(key);
        sessionStorage.removeItem(key);
      }

      /*
        DO NOT REMOVE FIREBASE TOKEN
      */

      if (isAdminPage()) {
        window.location.replace(
          "/admin-login"
        );
      }

      return Promise.reject(error);
    }

    /* =====================================================
       FIREBASE 401
    ===================================================== */

    if (
      isFirebaseApiRoute(
        originalRequest
      )
    ) {
      try {
        const auth =
          getAuth();

        if (!auth.currentUser) {
          console.error(
            "Firebase user no longer exists"
          );

          return Promise.reject(error);
        }

        /*
          A REAL 401 occurred.

          This is the only normal situation where
          Firebase is force-refreshed.
        */

        const freshToken =
          await getFirebaseToken({
            forceRefresh: true,
          });

        if (!freshToken) {
          throw new Error(
            "Fresh Firebase token not generated"
          );
        }

        /* -------------------------------------------------
           SAVE FIREBASE TOKEN
        ------------------------------------------------- */

        saveFirebaseToken(
          freshToken
        );

        /* -------------------------------------------------
           RETRY REQUEST
        ------------------------------------------------- */

        originalRequest.headers =
          originalRequest.headers ||
          {};

        originalRequest.headers.Authorization =
          `Bearer ${freshToken}`;

        console.log(
          "Retrying Firebase request with refreshed token"
        );

        return API(
          originalRequest
        );

      } catch (refreshError) {
        console.error(
          "Firebase token refresh failed:",
          refreshError
        );

        /* -------------------------------------------------
           FIREBASE SIGN OUT
        ------------------------------------------------- */

        try {
          await signOut(
            getAuth()
          );
        } catch (signOutError) {
          console.error(
            "Firebase signOut failed:",
            signOutError
          );
        }

        /* -------------------------------------------------
           CLEAR FIREBASE SESSION
        ------------------------------------------------- */

        localStorage.removeItem(
          "token"
        );

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

        /* -------------------------------------------------
           DO NOT CLEAR ADMIN TOKEN
        ------------------------------------------------- */

        /* -------------------------------------------------
           REDIRECT
        ------------------------------------------------- */

        if (
          isWebsitePreviewRoute()
        ) {
          window.location.replace(
            "/institute/website/preview"
          );

        } else if (
          isTrainerPage()
        ) {
          window.location.replace(
            "/trainer-login"
          );

        } else if (
          isInstituteRoute()
        ) {
          window.location.replace(
            "/institute-login"
          );

        } else {
          window.location.replace(
            "/institute/login"
          );
        }

        return Promise.reject(
          refreshError
        );
      }
    }

    return Promise.reject(error);
  }
);

/* =========================================================
   COMPATIBILITY EXPORT
========================================================= */

const api = API;

/* =========================================================
   EXPORT
========================================================= */

export {
  API,
  api,
};

export default API;