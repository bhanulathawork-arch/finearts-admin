
// import axios from "axios";
// import { getAuth } from "firebase/auth";

// const API = axios.create({
// baseURL: "https://finearts-backend.onrender.com/api",
// });

// API.interceptors.request.use(
// async (config) => {
// try {
// config.headers = config.headers || {};

//   const currentPath =
//     window.location.pathname;

//   // ADMIN PAGES
//   if (
//     currentPath.startsWith("/dashboard") ||
//     currentPath.startsWith("/categories") ||
//     currentPath.startsWith("/subcategories") ||
//     currentPath.startsWith("/classes") ||
//     currentPath.startsWith("/trainers") ||
//     currentPath.startsWith("/institutes") ||
//     currentPath.startsWith("/students") ||
//     currentPath.startsWith("/bookings") ||
//     currentPath.startsWith("/testimonials")
//   ) {
//     const adminToken =
//       localStorage.getItem("adminToken");

//     if (adminToken) {
//       config.headers.Authorization =
//         `Bearer ${adminToken}`;

//       return config;
//     }
//   }

//   // TRAINER / INSTITUTE / USER
//   const user = getAuth().currentUser;

//   if (user) {
//     const firebaseToken =
//       await user.getIdToken(true);

//     config.headers.Authorization =
//       `Bearer ${firebaseToken}`;
//   }

//   return config;
// } catch (error) {
//   console.error(
//     "AUTH INTERCEPTOR ERROR:",
//     error
//   );

//   return config;
// }


// },
// (error) => Promise.reject(error)
// );

// export default API;




// import axios from "axios";
// import { getAuth, signOut } from "firebase/auth";

// const API = axios.create({
//   baseURL: "https://finearts-backend.onrender.com/api",
// });

// API.interceptors.request.use(
//   async (config) => {
//     config.headers = config.headers || {};

//     const currentPath = window.location.pathname;

//     // Admin
//     if (
//       currentPath.startsWith("/dashboard") ||
//       currentPath.startsWith("/categories") ||
//       currentPath.startsWith("/subcategories") ||
//       currentPath.startsWith("/classes") ||
//       currentPath.startsWith("/trainers") ||
//       currentPath.startsWith("/institutes") ||
//       currentPath.startsWith("/students") ||
//       currentPath.startsWith("/bookings") ||
//       currentPath.startsWith("/testimonials")
//     ) {
//       const adminToken = localStorage.getItem("adminToken");

//       if (adminToken) {
//         config.headers.Authorization = `Bearer ${adminToken}`;
//         return config;
//       }
//     }

//     const auth = getAuth();
//     const user = auth.currentUser;

//     if (user) {
//       try {
//         const token = await user.getIdToken();
//         config.headers.Authorization = `Bearer ${token}`;
//       } catch (err) {
//         console.error("Token Error:", err);

//         await signOut(auth);

//         localStorage.clear();

//         window.location.href = "/login";
//       }
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default API;


// import axios from "axios";
// import { getAuth, signOut } from "firebase/auth";

// const API = axios.create({
//   baseURL: "https://finearts-backend.onrender.com/api",
// });

// /* =========================
//    ADMIN ROUTES
// ========================= */

// const adminRoutes = [
//   "/dashboard",
//   "/categories",
//   "/subcategories",
//   "/banners",
//   "/classes",
//   "/sessions",
//   "/trainers",
//   "/institutes",
//   "/students",
//   "/bookings",
//   "/testimonials",
// ];

// /* =========================
//    REQUEST INTERCEPTOR
// ========================= */

// API.interceptors.request.use(
//   async (config) => {
//     config.headers = config.headers || {};

//     const currentPath = window.location.pathname;

//     const isAdminRoute = adminRoutes.some((route) =>
//       currentPath.startsWith(route)
//     );

//     /* =========================
//        ADMIN TOKEN
//     ========================= */

//     if (isAdminRoute) {
//       const adminToken = localStorage.getItem("adminToken");

//       if (adminToken) {
//         config.headers.Authorization = `Bearer ${adminToken}`;
//       }

//       return config;
//     }

//     /* =========================
//        FIREBASE TOKEN
//     ========================= */

//     const auth = getAuth();
//     const user = auth.currentUser;

//     if (user) {
//       try {
//         const firebaseToken = await user.getIdToken();

//         config.headers.Authorization = `Bearer ${firebaseToken}`;
//       } catch (err) {
//         console.error("Firebase Token Error:", err);

//         await signOut(auth);

//         localStorage.clear();

//         window.location.href = "/";
//       }
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default API;


// import axios from "axios";
// import { getAuth, signOut } from "firebase/auth";

// const API = axios.create({
//   baseURL: "https://finearts-backend.onrender.com/api",
//   timeout: 30000,
// });

// /* =========================
//    ADMIN ROUTES
// ========================= */

// const adminRoutes = [
//   "/dashboard",
//   "/categories",
//   "/subcategories",
//   "/banners",
//   "/classes",
//   "/sessions",
//   "/trainers",
//   "/institutes",
//   "/students",
//   "/bookings",
//   "/testimonials",
//    "/website-templates",
// ];

// /* =========================
//    REQUEST INTERCEPTOR
// ========================= */

// API.interceptors.request.use(
//   async (config) => {
//     config.headers = config.headers || {};

//     const currentPath = window.location.pathname;

//     const isAdminRoute = adminRoutes.some((route) =>
//       currentPath.startsWith(route)
//     );

//     /* =========================
//        ADMIN TOKEN
//     ========================= */

//     if (isAdminRoute) {
//       const adminToken = localStorage.getItem("adminToken");

//       if (adminToken) {
//         config.headers.Authorization = `Bearer ${adminToken}`;
//       }

//       return config;
//     }

//     /* =========================
//        FIREBASE TOKEN
//     ========================= */

//     const auth = getAuth();
//     const user = auth.currentUser;

//     if (!user) {
//       return config;
//     }

//     try {
//       // Force refresh if token is expired
//       const firebaseToken = await user.getIdToken(true);

//       config.headers.Authorization = `Bearer ${firebaseToken}`;
//     } catch (error) {
//       console.error("Failed to refresh Firebase token:", error);

//       try {
//         await signOut(auth);
//       } catch {}

//       localStorage.clear();

//       window.location.replace("/");
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// /* =========================
//    RESPONSE INTERCEPTOR
// ========================= */

// API.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response?.status === 401) {
//       const auth = getAuth();

//       try {
//         const user = auth.currentUser;

//         if (user) {
//           const freshToken = await user.getIdToken(true);

//           error.config.headers.Authorization = `Bearer ${freshToken}`;

//           return API(error.config);
//         }
//       } catch (err) {
//         console.error("Token refresh failed:", err);

//         try {
//           await signOut(auth);
//         } catch {}

//         localStorage.clear();

//         window.location.replace("/");
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default API;


// import axios from "axios";
// import {
//   getAuth,
//   signOut,
// } from "firebase/auth";

// const API = axios.create({
//   baseURL: "https://finearts-backend.onrender.com/api",
//   timeout: 30000,
// });


// /* =========================================================
//    ADMIN ROUTE CHECK
// ========================================================= */

// const isAdminRoute = () => {
//   const path = window.location.pathname;

//   // IMPORTANT:
//   // Everything under /institute uses Firebase authentication
//   if (path.startsWith("/institute")) {
//     return false;
//   }

//   return (
//     path.startsWith("/admin") ||
//     path.startsWith("/dashboard") ||
//     path.startsWith("/categories") ||
//     path.startsWith("/subcategories") ||
//     path.startsWith("/banners") ||
//     path.startsWith("/classes") ||
//     path.startsWith("/sessions") ||
//     path.startsWith("/trainers") ||
//     path.startsWith("/institutes") ||
//     path.startsWith("/students") ||
//     path.startsWith("/bookings") ||
//     path.startsWith("/testimonials")
//   );
// };


// /* =========================================================
//    GET FIREBASE TOKEN
// ========================================================= */

// const getFirebaseToken = async () => {
//   const auth = getAuth();

//   /*
//    * First preference:
//    * Current Firebase user
//    */

//   if (auth.currentUser) {
//     try {
//       const token =
//         await auth.currentUser.getIdToken(true);

//       // Keep localStorage synchronized
//       localStorage.setItem("token", token);

//       return token;
//     } catch (error) {
//       console.error(
//         "Firebase token refresh failed:",
//         error
//       );
//     }
//   }


//   /*
//    * Second preference:
//    * Token saved during Institute login
//    */

//   const storedToken =
//     localStorage.getItem("token");

//   if (storedToken) {
//     return storedToken;
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


//     /* =====================================================
//        ADMIN
//     ===================================================== */

//     if (isAdminRoute()) {

//       const adminToken =
//         localStorage.getItem(
//           "adminToken"
//         );

//       console.log(
//         "================================="
//       );

//       console.log(
//         "ADMIN API REQUEST"
//       );

//       console.log(
//         "Path:",
//         window.location.pathname
//       );

//       console.log(
//         "Request:",
//         config.method?.toUpperCase(),
//         config.url
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
//             "Admin token missing"
//           )
//         );
//       }


//       config.headers.Authorization =
//         `Bearer ${adminToken}`;

//       return config;
//     }


//     /* =====================================================
//        INSTITUTE / FIREBASE
//     ===================================================== */

//     console.log(
//       "================================="
//     );

//     console.log(
//       "FIREBASE API REQUEST"
//     );

//     console.log(
//       "Path:",
//       window.location.pathname
//     );

//     console.log(
//       "Request:",
//       config.method?.toUpperCase(),
//       config.url
//     );


//     const token =
//       await getFirebaseToken();


//     console.log(
//       "Firebase Token:",
//       token
//         ? "FOUND"
//         : "NOT FOUND"
//     );


//     console.log(
//       "================================="
//     );


//     if (!token) {

//       console.error(
//         "Firebase authentication token not found"
//       );

//       return Promise.reject(
//         new Error(
//           "Firebase user not authenticated"
//         )
//       );
//     }


//     config.headers.Authorization =
//       `Bearer ${token}`;


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


//     /*
//      * Only retry 401 once
//      */

//     if (
//       error.response?.status !== 401 ||
//       originalRequest?._retry
//     ) {
//       return Promise.reject(error);
//     }


//     originalRequest._retry = true;


//     /* =====================================================
//        ADMIN 401
//     ===================================================== */

//     if (isAdminRoute()) {

//       console.error(
//         "ADMIN SESSION EXPIRED",
//         error.response?.data
//       );

//       return Promise.reject(error);
//     }


//     /* =====================================================
//        FIREBASE 401
//     ===================================================== */

//     try {

//       const auth = getAuth();

//       if (!auth.currentUser) {
//         return Promise.reject(error);
//       }


//       const freshToken =
//         await auth.currentUser.getIdToken(
//           true
//         );


//       /*
//        * Save fresh token
//        */

//       localStorage.setItem(
//         "token",
//         freshToken
//       );


//       /*
//        * Update failed request
//        */

//       originalRequest.headers =
//         originalRequest.headers || {};

//       originalRequest.headers.Authorization =
//         `Bearer ${freshToken}`;


//       console.log(
//         "Retrying request with refreshed Firebase token"
//       );


//       return API(originalRequest);

//     } catch (refreshError) {

//       console.error(
//         "Firebase token refresh failed:",
//         refreshError
//       );


//       try {
//         await signOut(getAuth());
//       } catch {}


//       localStorage.removeItem(
//         "token"
//       );

//       localStorage.removeItem(
//         "institute"
//       );

//       localStorage.removeItem(
//         "role"
//       );


//       window.location.replace(
//         "/institute/login"
//       );


//       return Promise.reject(
//         refreshError
//       );
//     }
//   }
// );


// export default API;


// import axios from "axios";
// import { getAuth, signOut } from "firebase/auth";

// /* =========================================================
//    API CONFIG
// ========================================================= */

// const API = axios.create({
//   baseURL:
//     import.meta.env.VITE_API_URL ||
//     "https://finearts-backend.onrender.com/api",

//   timeout: 30000,
// });

// /* =========================================================
//    ROUTE HELPERS
// ========================================================= */

// const isAdminRoute = () => {
//   const path = window.location.pathname;

//   /*
//    * IMPORTANT:
//    * Everything under /institute uses Firebase auth.
//    */
//   if (path.startsWith("/institute")) {
//     return false;
//   }

//   return (
//     path.startsWith("/admin") ||
//     path.startsWith("/dashboard") ||
//     path.startsWith("/categories") ||
//     path.startsWith("/subcategories") ||
//     path.startsWith("/banners") ||
//     path.startsWith("/classes") ||
//     path.startsWith("/sessions") ||
//     path.startsWith("/trainers") ||
//     path.startsWith("/institutes") ||
//     path.startsWith("/students") ||
//     path.startsWith("/bookings") ||
//     path.startsWith("/testimonials")
//   );
// };

// /* =========================================================
//    WEBSITE PREVIEW ROUTE
// ========================================================= */

// const isWebsitePreviewRoute = () => {
//   const path = window.location.pathname;

//   return (
//     path === "/institute/website/preview" ||
//     path.startsWith(
//       "/institute/website/preview/"
//     )
//   );
// };

// /* =========================================================
//    GET FIREBASE TOKEN
// ========================================================= */

// const getFirebaseToken = async () => {
//   const auth = getAuth();

//   /*
//    * Current Firebase user has highest priority.
//    */

//   if (auth.currentUser) {
//     try {
//       const token =
//         await auth.currentUser.getIdToken(true);

//       /*
//        * Keep both token locations synchronized.
//        *
//        * token:
//        * Existing institute application token.
//        *
//        * studentToken:
//        * Website Preview student session.
//        */

//       localStorage.setItem(
//         "token",
//         token
//       );

//       return token;
//     } catch (error) {
//       console.error(
//         "Firebase token refresh failed:",
//         error
//       );
//     }
//   }

//   /*
//    * Student token fallback.
//    */

//   const studentToken =
//     localStorage.getItem(
//       "studentToken"
//     );

//   if (studentToken) {
//     return studentToken;
//   }

//   /*
//    * Normal Firebase token fallback.
//    */

//   const storedToken =
//     localStorage.getItem("token");

//   if (storedToken) {
//     return storedToken;
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

//     /* =====================================================
//        ADMIN REQUEST
//     ===================================================== */

//     if (isAdminRoute()) {
//       const adminToken =
//         localStorage.getItem(
//           "adminToken"
//         );

//       console.log(
//         "================================="
//       );

//       console.log(
//         "ADMIN API REQUEST"
//       );

//       console.log(
//         "Path:",
//         window.location.pathname
//       );

//       console.log(
//         "Request:",
//         config.method?.toUpperCase(),
//         config.url
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
//             "Admin token missing"
//           )
//         );
//       }

//       config.headers.Authorization =
//         `Bearer ${adminToken}`;

//       return config;
//     }

//     /* =====================================================
//        FIREBASE / INSTITUTE / WEBSITE PREVIEW
//     ===================================================== */

//     console.log(
//       "================================="
//     );

//     console.log(
//       "FIREBASE API REQUEST"
//     );

//     console.log(
//       "Path:",
//       window.location.pathname
//     );

//     console.log(
//       "Request:",
//       config.method?.toUpperCase(),
//       config.url
//     );

//     if (
//       isWebsitePreviewRoute()
//     ) {
//       console.log(
//         "Website Preview Request: YES"
//       );

//       console.log(
//         "Student Token:",
//         localStorage.getItem(
//           "studentToken"
//         )
//           ? "FOUND"
//           : "NOT FOUND"
//       );
//     }

//     const token =
//       await getFirebaseToken();

//     console.log(
//       "Firebase Token:",
//       token
//         ? "FOUND"
//         : "NOT FOUND"
//     );

//     console.log(
//       "================================="
//     );

//     if (!token) {
//       console.error(
//         "Firebase authentication token not found"
//       );

//       return Promise.reject(
//         new Error(
//           "Firebase user not authenticated"
//         )
//       );
//     }

//     config.headers.Authorization =
//       `Bearer ${token}`;

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

//     /*
//      * Only retry 401 once.
//      */

//     if (
//       error.response?.status !== 401 ||
//       originalRequest?._retry
//     ) {
//       return Promise.reject(error);
//     }

//     originalRequest._retry = true;

//     /* =====================================================
//        ADMIN 401
//     ===================================================== */

//     if (isAdminRoute()) {
//       console.error(
//         "ADMIN SESSION EXPIRED",
//         error.response?.data
//       );

//       return Promise.reject(error);
//     }

//     /* =====================================================
//        FIREBASE 401
//     ===================================================== */

//     try {
//       const auth = getAuth();

//       if (!auth.currentUser) {
//         return Promise.reject(error);
//       }

//       const freshToken =
//         await auth.currentUser.getIdToken(
//           true
//         );

//       /*
//        * Keep tokens synchronized.
//        */

//       localStorage.setItem(
//         "token",
//         freshToken
//       );

//       /*
//        * If this is Website Preview,
//        * also keep the student token.
//        */

//       if (
//         isWebsitePreviewRoute() ||
//         localStorage.getItem(
//           "studentToken"
//         )
//       ) {
//         localStorage.setItem(
//           "studentToken",
//           freshToken
//         );
//       }

//       originalRequest.headers =
//         originalRequest.headers || {};

//       originalRequest.headers.Authorization =
//         `Bearer ${freshToken}`;

//       console.log(
//         "Retrying request with refreshed Firebase token"
//       );

//       return API(originalRequest);

//     } catch (refreshError) {
//       console.error(
//         "Firebase token refresh failed:",
//         refreshError
//       );

//       try {
//         await signOut(getAuth());
//       } catch {}

//       /*
//        * Clear Firebase session.
//        */

//       localStorage.removeItem(
//         "token"
//       );

//       localStorage.removeItem(
//         "studentToken"
//       );

//       localStorage.removeItem(
//         "studentUser"
//       );

//       localStorage.removeItem(
//         "studentProfile"
//       );

//       localStorage.removeItem(
//         "studentRole"
//       );

//       localStorage.removeItem(
//         "institute"
//       );

//       localStorage.removeItem(
//         "role"
//       );

//       /*
//        * IMPORTANT:
//        *
//        * Do NOT redirect to the normal
//        * institute login page when the user
//        * was using Website Preview.
//        */

//       if (
//         isWebsitePreviewRoute()
//       ) {
//         window.location.replace(
//           "/institute/website/preview"
//         );
//       } else {
//         window.location.replace(
//           "/institute/login"
//         );
//       }

//       return Promise.reject(
//         refreshError
//       );
//     }
//   }
// );

// export default API;


// import axios from "axios";
// import { getAuth, signOut } from "firebase/auth";

// /* =========================================================
//    API CONFIG
// ========================================================= */

// const API = axios.create({
//   baseURL:
//     import.meta.env.VITE_API_URL ||
//     "https://finearts-backend.onrender.com/api",

//   timeout: 30000,
// });

// /* =========================================================
//    PATH HELPERS
// ========================================================= */

// const getPath = () => {
//   return window.location.pathname || "/";
// };

// /* =========================================================
//    ADMIN PAGE
// ========================================================= */

// const isAdminPage = () => {
//   const path = getPath();

//   return (
//     path === "/admin-login" ||
//     path.startsWith("/admin/") ||
//     path.startsWith("/admin")
//   );
// };

// /* =========================================================
//    INSTITUTE / WEBSITE PAGE
// ========================================================= */

// const isInstituteRoute = () => {
//   const path = getPath();

//   return path.startsWith("/institute");
// };

// /* =========================================================
//    WEBSITE PREVIEW
// ========================================================= */

// const isWebsitePreviewRoute = () => {
//   const path = getPath();

//   return (
//     path === "/institute/website/preview" ||
//     path.startsWith("/institute/website/preview/")
//   );
// };

// /* =========================================================
//    ADMIN API ROUTES
// =========================================================

//    These are API endpoints that require adminToken.

//    NOTE:
//    /admin-login itself is NOT an authenticated API request.
//    The login endpoint is handled separately below.
// ========================================================= */

// const isAdminApiRoute = (config = {}) => {
//   const url = String(config.url || "").toLowerCase();

//   /*
//    * Never treat authentication/login endpoints as
//    * authenticated admin requests.
//    */
//   if (isPublicAuthRequest(config)) {
//     return false;
//   }

//   /*
//    * Explicit admin API endpoints.
//    */
//   if (
//     url.startsWith("/admin") ||
//     url.includes("/admin/")
//   ) {
//     return true;
//   }

//   /*
//    * Existing normal admin dashboard API endpoints.
//    *
//    * These are used by the admin application.
//    */
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

//   return adminApiPrefixes.some((prefix) =>
//     url.startsWith(prefix)
//   );
// };

// /* =========================================================
//    PUBLIC AUTH REQUEST
// =========================================================

//    IMPORTANT:

//    Login endpoints must NOT require a token.

//    Otherwise:

//        admin login
//           ↓
//        api.js
//           ↓
//        asks for adminToken
//           ↓
//        adminToken does not exist yet
//           ↓
//        "Admin token missing"

//    That is the problem you were hitting.
// ========================================================= */

// const isPublicAuthRequest = (config = {}) => {
//   const url = String(config.url || "").toLowerCase();

//   const method = String(
//     config.method || "get"
//   ).toLowerCase();

//   /*
//    * Login/auth endpoints.
//    *
//    * Add/remove endpoint names here if your backend
//    * uses a different login URL.
//    */
//   const authPatterns = [
//     "/login",
//     "/signin",
//     "/auth/login",
//     "/auth/signin",
//     "/admin/login",
//     "/admin/signin",
//   ];

//   const isAuthEndpoint =
//     authPatterns.some((pattern) =>
//       url.includes(pattern)
//     );

//   /*
//    * Authentication should generally be POST.
//    *
//    * We also allow the request when it is clearly an
//    * auth endpoint regardless of method, because some
//    * projects use GET during auth/session initialization.
//    */
//   if (isAuthEndpoint) {
//     return true;
//   }

//   /*
//    * Explicit admin-login browser page.
//    *
//    * This prevents accidental Firebase/admin-token
//    * enforcement while the login screen is initializing.
//    */
//   if (
//     getPath() === "/admin-login" &&
//     method === "post"
//   ) {
//     return true;
//   }

//   return false;
// };

// /* =========================================================
//    FIREBASE TOKEN
// ========================================================= */

// const getFirebaseToken = async () => {
//   const auth = getAuth();

//   /*
//    * Current Firebase user has highest priority.
//    */
//   if (auth.currentUser) {
//     try {
//       const token =
//         await auth.currentUser.getIdToken(true);

//       /*
//        * Store Firebase token for the normal
//        * institute application.
//        */
//       localStorage.setItem(
//         "token",
//         token
//       );

//       /*
//        * If the website student session exists,
//        * keep studentToken synchronized.
//        */
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
//         "Firebase token refresh failed:",
//         error
//       );
//     }
//   }

//   /* =======================================================
//      WEBSITE STUDENT TOKEN
//   ======================================================= */

//   const studentToken =
//     localStorage.getItem(
//       "studentToken"
//     );

//   if (studentToken) {
//     return studentToken;
//   }

//   /* =======================================================
//      NORMAL FIREBASE TOKEN
//   ======================================================= */

//   const storedToken =
//     localStorage.getItem(
//       "token"
//     );

//   if (storedToken) {
//     return storedToken;
//   }

//   return null;
// };

// /* =========================================================
//    GET ADMIN TOKEN
// ========================================================= */

// const getAdminToken = () => {
//   return localStorage.getItem(
//     "adminToken"
//   );
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
//        PUBLIC AUTH REQUEST
//     ===================================================== */

//     if (isPublicAuthRequest(config)) {

//       console.log(
//         "================================="
//       );

//       console.log(
//         "PUBLIC AUTH REQUEST"
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
//         "================================="
//       );

//       /*
//        * VERY IMPORTANT:
//        *
//        * Do not attach an old admin token or Firebase
//        * token to a login request.
//        *
//        * The backend should authenticate the credentials
//        * supplied by the login request itself.
//        */

//       delete config.headers.Authorization;

//       return config;
//     }

//     /* =====================================================
//        ADMIN API
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
//             "Admin token missing"
//           )
//         );
//       }

//       config.headers.Authorization =
//         `Bearer ${adminToken}`;

//       return config;
//     }

//     /* =====================================================
//        INSTITUTE / FIREBASE / WEBSITE PREVIEW
//     ===================================================== */

//     if (isInstituteRoute()) {

//       console.log(
//         "================================="
//       );

//       console.log(
//         "FIREBASE API REQUEST"
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

//       if (
//         isWebsitePreviewRoute()
//       ) {

//         console.log(
//           "Website Preview: YES"
//         );

//         console.log(
//           "Student Token:",
//           localStorage.getItem(
//             "studentToken"
//           )
//             ? "FOUND"
//             : "NOT FOUND"
//         );
//       }

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

//         console.error(
//           "Firebase authentication token not found"
//         );

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
//        FALLBACK
//     =====================================================

//        For non-institute/non-admin public APIs,
//        do not force authentication.
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

//     /*
//      * Do not accidentally send an admin/Firebase token
//      * to a public endpoint.
//      */
//     delete config.headers.Authorization;

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

//     /* =====================================================
//        NO CONFIG
//     ===================================================== */

//     if (!originalRequest) {
//       return Promise.reject(error);
//     }

//     /* =====================================================
//        NEVER RETRY AUTH/LOGIN REQUESTS
//     ===================================================== */

//     if (
//       isPublicAuthRequest(
//         originalRequest
//       )
//     ) {
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
//         "ADMIN SESSION EXPIRED",
//         error.response?.data
//       );

//       /*
//        * Do NOT try Firebase refresh for admin.
//        */
//       localStorage.removeItem(
//         "adminToken"
//       );

//       localStorage.removeItem(
//         "adminUser"
//       );

//       /*
//        * Only redirect if currently inside the
//        * admin application.
//        */
//       if (
//         isAdminPage()
//       ) {

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
//       isInstituteRoute()
//     ) {

//       try {

//         const auth =
//           getAuth();

//         if (!auth.currentUser) {

//           console.error(
//             "Firebase user no longer exists"
//           );

//           return Promise.reject(
//             error
//           );
//         }

//         const freshToken =
//           await auth.currentUser.getIdToken(
//             true
//           );

//         /* ===============================================
//            NORMAL FIREBASE TOKEN
//         =============================================== */

//         localStorage.setItem(
//           "token",
//           freshToken
//         );

//         /* ===============================================
//            WEBSITE STUDENT TOKEN
//         =============================================== */

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

//         originalRequest.headers =
//           originalRequest.headers || {};

//         originalRequest.headers.Authorization =
//           `Bearer ${freshToken}`;

//         console.log(
//           "Retrying Firebase request with refreshed token"
//         );

//         return API(
//           originalRequest
//         );

//       } catch (
//         refreshError
//       ) {

//         console.error(
//           "Firebase token refresh failed:",
//           refreshError
//         );

//         /*
//          * Sign out Firebase.
//          */
//         try {

//           await signOut(
//             getAuth()
//           );

//         } catch (
//           signOutError
//         ) {

//           console.error(
//             "Firebase signOut failed:",
//             signOutError
//           );
//         }

//         /* ===============================================
//            CLEAR STUDENT SESSION
//         =============================================== */

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

//         /*
//          * IMPORTANT:
//          *
//          * Do NOT remove adminToken here.
//          *
//          * Admin and student sessions are independent.
//          */

//         /*
//          * Website preview should go back to
//          * website preview, not admin login.
//          */
//         if (
//           isWebsitePreviewRoute()
//         ) {

//           window.location.replace(
//             "/institute/website/preview"
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
//    EXPORT
// ========================================================= */

// export default API;



// import axios from "axios";
// import { getAuth, signOut } from "firebase/auth";

// /* =========================================================
//    API CONFIG
// ========================================================= */

// const API = axios.create({
//   baseURL:
//     import.meta.env.VITE_API_URL ||
//     "https://finearts-backend.onrender.com/api",

//   timeout: 30000,
// });

// /* =========================================================
//    PATH HELPERS
// ========================================================= */

// const getPath = () => {
//   return window.location.pathname || "/";
// };

// /* =========================================================
//    PAGE TYPES
// ========================================================= */

// const isAdminPage = () => {
//   const path = getPath();

//   return (
//     path === "/admin-login" ||
//     path.startsWith("/admin/")
//   );
// };

// const isInstituteRoute = () => {
//   const path = getPath();

//   return path.startsWith("/institute");
// };

// const isWebsitePreviewRoute = () => {
//   const path = getPath();

//   return (
//     path === "/institute/website/preview" ||
//     path.startsWith("/institute/website/preview/")
//   );
// };

// /* =========================================================
//    URL HELPER
// ========================================================= */

// const getRequestUrl = (config = {}) => {
//   return String(config.url || "")
//     .split("?")[0]
//     .toLowerCase();
// };

// /* =========================================================
//    ADMIN TOKENLESS LOGIN REQUEST
// =========================================================

//    Admin login is different.

//    Admin login:
//        email/password
//           ↓
//        /admin/login
//           ↓
//        backend creates admin session/token

//    Therefore admin login itself does NOT require
//    adminToken.
// ========================================================= */

// const isAdminLoginRequest = (config = {}) => {
//   const url = getRequestUrl(config);

//   return (
//     url === "/admin/login" ||
//     url === "/admin/signin" ||
//     url === "/auth/admin/login" ||
//     url === "/auth/admin/signin"
//   );
// };

// /* =========================================================
//    FIREBASE LOGIN REQUEST
// =========================================================

//    IMPORTANT:

//    These login endpoints DO require a Firebase ID token.

//    Flow:

//    Google Login
//        ↓
//    Firebase
//        ↓
//    Firebase ID Token
//        ↓
//    /institutes/login
//    OR
//    /trainers/login
//        ↓
//    Backend verifies Firebase token

//    DO NOT remove Authorization from these requests.
// ========================================================= */

// const isFirebaseLoginRequest = (config = {}) => {
//   const url = getRequestUrl(config);

//   return (
//     url === "/institutes/login" ||
//     url === "/trainers/login"
//   );
// };

// /* =========================================================
//    ADMIN API REQUEST
// ========================================================= */

// const isAdminApiRoute = (config = {}) => {
//   const url = getRequestUrl(config);

//   /*
//    * Admin login does not require adminToken.
//    */
//   if (isAdminLoginRequest(config)) {
//     return false;
//   }

//   /*
//    * Firebase-based institute/trainer login is NOT
//    * an admin API request.
//    */
//   if (isFirebaseLoginRequest(config)) {
//     return false;
//   }

//   /*
//    * Explicit admin endpoints.
//    */
//   if (
//     url === "/admin" ||
//     url.startsWith("/admin/")
//   ) {
//     return true;
//   }

//   /*
//    * Existing admin API endpoints.
//    *
//    * NOTE:
//    * /trainers and /institutes are included because
//    * admin manages trainers/institutes.
//    *
//    * Their LOGIN endpoints were already excluded above.
//    */
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

//   return adminApiPrefixes.some((prefix) => {
//     return (
//       url === prefix ||
//       url.startsWith(`${prefix}/`)
//     );
//   });
// };

// /* =========================================================
//    FIREBASE TOKEN
// ========================================================= */

// const getFirebaseToken = async () => {
//   const auth = getAuth();

//   /* =======================================================
//      1. CURRENT FIREBASE USER
//   ======================================================= */

//   if (auth.currentUser) {
//     try {
//       const token =
//         await auth.currentUser.getIdToken(true);

//       if (!token) {
//         return null;
//       }

//       /*
//        * Keep the normal Firebase token.
//        */
//       localStorage.setItem(
//         "token",
//         token
//       );

//       /*
//        * Website student session.
//        */
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
//         "Firebase token refresh failed:",
//         error
//       );
//     }
//   }

//   /* =======================================================
//      2. STUDENT TOKEN
//   ======================================================= */

//   const studentToken =
//     localStorage.getItem(
//       "studentToken"
//     );

//   if (studentToken) {
//     return studentToken;
//   }

//   /* =======================================================
//      3. STORED FIREBASE TOKEN
//   ======================================================= */

//   const storedToken =
//     localStorage.getItem(
//       "token"
//     );

//   if (storedToken) {
//     return storedToken;
//   }

//   return null;
// };

// /* =========================================================
//    ADMIN TOKEN
// ========================================================= */

// const getAdminToken = () => {
//   return localStorage.getItem(
//     "adminToken"
//   );
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
//     =====================================================

//        No adminToken required.
//     */

//     if (
//       isAdminLoginRequest(config)
//     ) {
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
//         "ADMIN TOKEN NOT REQUIRED"
//       );

//       console.log(
//         "================================="
//       );

//       /*
//        * Remove stale Authorization only from
//        * admin login.
//        */
//       delete config.headers.Authorization;

//       return config;
//     }

//     /* =====================================================
//        2. FIREBASE TRAINER / INSTITUTE LOGIN
//     =====================================================

//        VERY IMPORTANT.

//        /trainers/login
//        /institutes/login

//        require Firebase Authorization header.
//     */

//     if (
//       isFirebaseLoginRequest(config)
//     ) {
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

//       console.log(
//         "Firebase Login:",
//         "YES"
//       );

//       /*
//        * IMPORTANT:
//        *
//        * First check whether the caller already
//        * supplied the Firebase Authorization header.
//        */

//       const existingAuthorization =
//         config.headers.Authorization ||
//         config.headers.authorization;

//       if (
//         existingAuthorization
//       ) {
//         console.log(
//           "Firebase Authorization:",
//           "ALREADY PROVIDED"
//         );

//         console.log(
//           "================================="
//         );

//         return config;
//       }

//       /*
//        * If caller did not provide the token,
//        * get it automatically from Firebase.
//        */

//       const firebaseToken =
//         await getFirebaseToken();

//       console.log(
//         "Firebase Token:",
//         firebaseToken
//           ? "FOUND"
//           : "NOT FOUND"
//       );

//       console.log(
//         "================================="
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
//        3. ADMIN API
//     ===================================================== */

//     if (
//       isAdminApiRoute(config)
//     ) {
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
//             "Admin token missing"
//           )
//         );
//       }

//       config.headers.Authorization =
//         `Bearer ${adminToken}`;

//       return config;
//     }

//     /* =====================================================
//        4. INSTITUTE / WEBSITE / FIREBASE
//     ===================================================== */

//     if (
//       isInstituteRoute()
//     ) {
//       console.log(
//         "================================="
//       );

//       console.log(
//         "FIREBASE API REQUEST"
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

//       if (
//         isWebsitePreviewRoute()
//       ) {
//         console.log(
//           "Website Preview:",
//           "YES"
//         );

//         console.log(
//           "Student Token:",
//           localStorage.getItem(
//             "studentToken"
//           )
//             ? "FOUND"
//             : "NOT FOUND"
//         );
//       }

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
//         console.error(
//           "Firebase authentication token not found"
//         );

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
//        5. PUBLIC API
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

//     /*
//      * Public endpoints should not accidentally
//      * receive admin/Firebase authorization.
//      */
//     delete config.headers.Authorization;

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

//     /* =====================================================
//        NO REQUEST CONFIG
//     ===================================================== */

//     if (!originalRequest) {
//       return Promise.reject(error);
//     }

//     /* =====================================================
//        NEVER RETRY LOGIN REQUESTS
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
//         "ADMIN SESSION EXPIRED",
//         error.response?.data
//       );

//       localStorage.removeItem(
//         "adminToken"
//       );

//       localStorage.removeItem(
//         "adminUser"
//       );

//       if (
//         isAdminPage()
//       ) {
//         window.location.replace(
//           "/admin-login"
//         );
//       }

//       return Promise.reject(
//         error
//       );
//     }

//     /* =====================================================
//        FIREBASE 401
//     ===================================================== */

//     if (
//       isInstituteRoute()
//     ) {
//       try {
//         const auth =
//           getAuth();

//         if (!auth.currentUser) {
//           console.error(
//             "Firebase user no longer exists"
//           );

//           return Promise.reject(
//             error
//           );
//         }

//         const freshToken =
//           await auth.currentUser.getIdToken(
//             true
//           );

//         if (!freshToken) {
//           throw new Error(
//             "Fresh Firebase token not generated"
//           );
//         }

//         /* ===============================================
//            NORMAL FIREBASE TOKEN
//         =============================================== */

//         localStorage.setItem(
//           "token",
//           freshToken
//         );

//         /* ===============================================
//            STUDENT TOKEN
//         =============================================== */

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

//         originalRequest.headers =
//           originalRequest.headers || {};

//         originalRequest.headers.Authorization =
//           `Bearer ${freshToken}`;

//         console.log(
//           "Retrying Firebase request with refreshed token"
//         );

//         return API(
//           originalRequest
//         );

//       } catch (
//         refreshError
//       ) {
//         console.error(
//           "Firebase token refresh failed:",
//           refreshError
//         );

//         /* ===============================================
//            SIGN OUT FIREBASE
//         =============================================== */

//         try {
//           await signOut(
//             getAuth()
//           );
//         } catch (
//           signOutError
//         ) {
//           console.error(
//             "Firebase signOut failed:",
//             signOutError
//           );
//         }

//         /* ===============================================
//            CLEAR FIREBASE/STUDENT SESSION
//         =============================================== */

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

//         /*
//          * IMPORTANT:
//          *
//          * Never remove adminToken here.
//          *
//          * Admin authentication is independent.
//          */

//         /* ===============================================
//            REDIRECT
//         =============================================== */

//         if (
//           isWebsitePreviewRoute()
//         ) {
//           window.location.replace(
//             "/institute/website/preview"
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

//     return Promise.reject(
//       error
//     );
//   }
// );

// /* =========================================================
//    EXPORT
// ========================================================= */

// export default API;



// import axios from "axios";
// import { getAuth, signOut } from "firebase/auth";

// /* =========================================================
//    API CONFIG
// ========================================================= */

// const API = axios.create({
//   baseURL:
//     import.meta.env.VITE_API_URL ||
//     "https://finearts-backend.onrender.com/api",

//   timeout: 30000,
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

// /*
//  * IMPORTANT:
//  *
//  * /institute
//  * /institute/...
//  *
//  * are Firebase institute pages.
//  *
//  * /institutes
//  * /institutes/...
//  *
//  * are ADMIN institute-management APIs/pages.
//  *
//  * NEVER use:
//  *
//  * path.startsWith("/institute")
//  *
//  * because "/institutes" also starts with "/institute".
//  */

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

// /* =========================================================
//    INSTITUTE PAGE
// ========================================================= */

// const isInstituteRoute = () => {
//   const path = getPath();

//   return (
//     path === "/institute" ||
//     path.startsWith("/institute/")
//   );
// };

// /* =========================================================
//    WEBSITE PREVIEW
// ========================================================= */

// const isWebsitePreviewRoute = () => {
//   const path = getPath();

//   return (
//     path === "/institute/website/preview" ||
//     path.startsWith("/institute/website/preview/")
//   );
// };

// /* =========================================================
//    TRAINER PAGE
// ========================================================= */

// const isTrainerPage = () => {
//   const path = getPath();

//   return (
//     path === "/trainer-login" ||
//     path === "/trainer" ||
//     path.startsWith("/trainer/")
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
//      Firebase login endpoints
//   ------------------------------------------------------- */

//   if (isFirebaseLoginRequest(config)) {
//     return true;
//   }

//   /* -------------------------------------------------------
//      Explicit Firebase institute/trainer endpoints
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
//      Institute application
//   ------------------------------------------------------- */

//   if (isInstituteRoute()) {
//     return true;
//   }

//   /* -------------------------------------------------------
//      Trainer application
//   ------------------------------------------------------- */

//   if (isTrainerPage()) {
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
//      Admin login itself is public
//   ------------------------------------------------------- */

//   if (isAdminLoginRequest(config)) {
//     return false;
//   }

//   /* -------------------------------------------------------
//      Firebase login is NOT Admin
//   ------------------------------------------------------- */

//   if (isFirebaseLoginRequest(config)) {
//     return false;
//   }

//   /* -------------------------------------------------------
//      Firebase routes are NOT Admin
//   ------------------------------------------------------- */

//   if (isFirebaseApiRoute(config)) {
//     return false;
//   }

//   /* -------------------------------------------------------
//      Explicit Admin namespace
//   ------------------------------------------------------- */

//   if (
//     url === "/admin" ||
//     url.startsWith("/admin/")
//   ) {
//     return true;
//   }

//   /* -------------------------------------------------------
//      Admin API prefixes
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

//   /*
//    * IMPORTANT:
//    *
//    * Only the exact /institute application
//    * is Firebase.
//    *
//    * /institutes is Admin.
//    */

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
//      Current Firebase user
//   ------------------------------------------------------- */

//   if (auth.currentUser) {
//     try {
//       const token =
//         await auth.currentUser.getIdToken(true);

//       if (!token) {
//         return null;
//       }

//       /* Save normal Firebase token */

//       localStorage.setItem(
//         "token",
//         token
//       );

//       /* Website Preview / Student session */

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
//         "Firebase token refresh failed:",
//         error
//       );
//     }
//   }

//   /* -------------------------------------------------------
//      Student token fallback
//   ------------------------------------------------------- */

//   const studentToken =
//     localStorage.getItem(
//       "studentToken"
//     );

//   if (studentToken) {
//     return studentToken;
//   }

//   /* -------------------------------------------------------
//      Normal Firebase token fallback
//   ------------------------------------------------------- */

//   const storedToken =
//     localStorage.getItem(
//       "token"
//     );

//   if (storedToken) {
//     return storedToken;
//   }

//   return null;
// };

// /* =========================================================
//    GET ADMIN TOKEN
// ========================================================= */

// const getAdminToken = () => {
//   const token =
//     localStorage.getItem(
//       "adminToken"
//     );

//   if (
//     !token ||
//     typeof token !== "string" ||
//     token === "undefined" ||
//     token === "null"
//   ) {
//     return null;
//   }

//   return token.trim();
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

//     if (
//       isAdminLoginRequest(config)
//     ) {
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

//       /*
//        * Do not send old Admin token
//        */

//       delete config.headers.Authorization;
//       delete config.headers.authorization;

//       return config;
//     }

//     /* =====================================================
//        2. FIREBASE LOGIN
//     ===================================================== */

//     if (
//       isFirebaseLoginRequest(config)
//     ) {
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

//       console.log(
//         "================================="
//       );

//       /*
//        * Login components may already provide
//        * the Firebase Authorization header.
//        */

//       const existingAuthorization =
//         config.headers.Authorization ||
//         config.headers.authorization;

//       if (
//         existingAuthorization
//       ) {
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
//        3. FIREBASE PROTECTED API
//     ===================================================== */

//     if (
//       isFirebaseApiRoute(config)
//     ) {
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

//       if (
//         isWebsitePreviewRoute()
//       ) {
//         console.log(
//           "Website Preview:",
//           "YES"
//         );

//         console.log(
//           "Student Token:",
//           localStorage.getItem(
//             "studentToken"
//           )
//             ? "FOUND"
//             : "NOT FOUND"
//         );
//       }

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
//        4. ADMIN PROTECTED API
//     ===================================================== */

//     if (
//       isAdminApiRoute(config)
//     ) {
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
//             "Admin token missing"
//           )
//         );
//       }

//       /*
//        * IMPORTANT:
//        *
//        * Admin APIs ALWAYS receive adminToken.
//        *
//        * This includes:
//        *
//        * DELETE /institutes/:id
//        * PUT /institutes/:id
//        * GET /institutes/admin/all
//        */

//       config.headers.Authorization =
//         `Bearer ${adminToken}`;

//       return config;
//     }

//     /* =====================================================
//        5. PUBLIC API
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

//     /*
//      * Do not inherit stale authentication
//      */

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
//        LOGIN REQUEST FAILURE
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

//       return Promise.reject(
//         error
//       );
//     }

//     /* =====================================================
//        ONLY RETRY 401 ONCE
//     ===================================================== */

//     if (
//       error.response?.status !== 401 ||
//       originalRequest._retry
//     ) {
//       return Promise.reject(
//         error
//       );
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

//       /*
//        * Clear ONLY Admin authentication.
//        */

//       localStorage.removeItem(
//         "adminToken"
//       );

//       localStorage.removeItem(
//         "adminUser"
//       );

//       /*
//        * Never remove Firebase session here.
//        */

//       if (
//         isAdminPage()
//       ) {
//         window.location.replace(
//           "/admin-login"
//         );
//       }

//       return Promise.reject(
//         error
//       );
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

//         if (
//           !auth.currentUser
//         ) {
//           console.error(
//             "Firebase user no longer exists"
//           );

//           return Promise.reject(
//             error
//           );
//         }

//         const freshToken =
//           await auth.currentUser.getIdToken(
//             true
//           );

//         if (!freshToken) {
//           throw new Error(
//             "Fresh Firebase token not generated"
//           );
//         }

//         /* Save Firebase token */

//         localStorage.setItem(
//           "token",
//           freshToken
//         );

//         /* Student token */

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

//         /* Retry original request */

//         originalRequest.headers =
//           originalRequest.headers || {};

//         originalRequest.headers.Authorization =
//           `Bearer ${freshToken}`;

//         console.log(
//           "Retrying Firebase request with refreshed token"
//         );

//         return API(
//           originalRequest
//         );

//       } catch (
//         refreshError
//       ) {
//         console.error(
//           "Firebase token refresh failed:",
//           refreshError
//         );

//         /* Firebase sign out */

//         try {
//           await signOut(
//             getAuth()
//           );
//         } catch (
//           signOutError
//         ) {
//           console.error(
//             "Firebase signOut failed:",
//             signOutError
//           );
//         }

//         /* Clear Firebase session */

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

//         /*
//          * IMPORTANT:
//          *
//          * NEVER remove adminToken here.
//          */

//         /* Redirect */

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

//     return Promise.reject(
//       error
//     );
//   }
// );

// /* =========================================================
//    EXPORT
// ========================================================= */

// export default API;


// import axios from "axios";
// import { getAuth, signOut } from "firebase/auth";

// /* =========================================================
//    API CONFIG
// ========================================================= */

// const API = axios.create({
//   baseURL:
//     import.meta.env.VITE_API_URL ||
//     "https://finearts-backend.onrender.com/api",

//   timeout: 30000,
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

// /* ---------------------------------------------------------
//    ADMIN PAGE
// --------------------------------------------------------- */

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

// /* ---------------------------------------------------------
//    INSTITUTE PAGE

//    IMPORTANT:
//    /institute     = Firebase
//    /institutes    = Admin
// --------------------------------------------------------- */

// const isInstituteRoute = () => {
//   const path = getPath();

//   return (
//     path === "/institute" ||
//     path.startsWith("/institute/")
//   );
// };

// /* ---------------------------------------------------------
//    WEBSITE PREVIEW PAGE
// --------------------------------------------------------- */

// const isWebsitePreviewRoute = () => {
//   const path = getPath();

//   return (
//     path === "/institute/website/preview" ||
//     path.startsWith("/institute/website/preview/")
//   );
// };

// /* ---------------------------------------------------------
//    TRAINER PAGE
// --------------------------------------------------------- */

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

// /*
//  * IMPORTANT
//  *
//  * These endpoints are PUBLIC even when the browser is
//  * currently inside:
//  *
//  *     /institute/website/preview
//  *
//  * Example:
//  *
//  *     GET /websites/public/14
//  *
//  * MUST NOT become a Firebase request.
//  */

// const isPublicWebsiteApiRoute = (config = {}) => {
//   const url = getRequestUrl(config);

//   return (
//     url === "/websites/public" ||
//     url.startsWith("/websites/public/")
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
//      Firebase login endpoints
//   ------------------------------------------------------- */

//   if (isFirebaseLoginRequest(config)) {
//     return true;
//   }

//   /* -------------------------------------------------------
//      Explicit Firebase institute/trainer endpoints
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
//      Institute application
     
//      /institute = Firebase
//      /institutes = Admin
//   ------------------------------------------------------- */

//   if (isInstituteRoute()) {
//     return true;
//   }

//   /* -------------------------------------------------------
//      Trainer application
//   ------------------------------------------------------- */

//   if (isTrainerPage()) {
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
//      Public website is NOT Admin
//   ------------------------------------------------------- */

//   if (isPublicWebsiteApiRoute(config)) {
//     return false;
//   }

//   /* -------------------------------------------------------
//      Admin login is public
//   ------------------------------------------------------- */

//   if (isAdminLoginRequest(config)) {
//     return false;
//   }

//   /* -------------------------------------------------------
//      Firebase login is NOT Admin
//   ------------------------------------------------------- */

//   if (isFirebaseLoginRequest(config)) {
//     return false;
//   }

//   /* -------------------------------------------------------
//      Users Admin APIs
//   ------------------------------------------------------- */

//   /*
//    * GET /users/admin/all
//    * DELETE /users/admin/:id
//    */

//   if (
//     url === "/users/admin" ||
//     url.startsWith("/users/admin/")
//   ) {
//     return true;
//   }

//   /*
//    * PATCH /users/:id/status
//    */

//   if (
//     /^\/users\/\d+\/status$/.test(url)
//   ) {
//     return true;
//   }

//   /* -------------------------------------------------------
//      Firebase routes are NOT Admin
//   ------------------------------------------------------- */

//   if (isFirebaseApiRoute(config)) {
//     return false;
//   }

//   /* -------------------------------------------------------
//      Explicit Admin namespace
//   ------------------------------------------------------- */

//   if (
//     url === "/admin" ||
//     url.startsWith("/admin/")
//   ) {
//     return true;
//   }

//   /* -------------------------------------------------------
//      Admin API prefixes
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
//      Safety:
     
//      /institute/... = Firebase
//      /trainer/...   = Firebase
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
//      Current Firebase user
//   ------------------------------------------------------- */

//   if (auth.currentUser) {
//     try {
//       const token =
//         await auth.currentUser.getIdToken(true);

//       if (!token) {
//         return null;
//       }

//       /* Normal Firebase token */

//       localStorage.setItem(
//         "token",
//         token
//       );

//       /* Website Preview / Student session */

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
//         "Firebase token refresh failed:",
//         error
//       );
//     }
//   }

//   /* -------------------------------------------------------
//      Student token fallback
//   ------------------------------------------------------- */

//   const studentToken =
//     localStorage.getItem(
//       "studentToken"
//     );

//   if (studentToken) {
//     return studentToken;
//   }

//   /* -------------------------------------------------------
//      Normal Firebase token fallback
//   ------------------------------------------------------- */

//   const storedToken =
//     localStorage.getItem(
//       "token"
//     );

//   if (storedToken) {
//     return storedToken;
//   }

//   return null;
// };

// /* =========================================================
//    GET ADMIN TOKEN
// ========================================================= */

// const getAdminToken = () => {
//   const token =
//     localStorage.getItem(
//       "adminToken"
//     );

//   if (
//     !token ||
//     typeof token !== "string" ||
//     token === "undefined" ||
//     token === "null"
//   ) {
//     return null;
//   }

//   return token.trim();
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

//     if (
//       isAdminLoginRequest(config)
//     ) {
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

//     if (
//       isFirebaseLoginRequest(config)
//     ) {
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

//       console.log(
//         "================================="
//       );

//       const existingAuthorization =
//         config.headers.Authorization ||
//         config.headers.authorization;

//       if (
//         existingAuthorization
//       ) {
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
       
//        THIS MUST COME BEFORE FIREBASE.

//        Example:
       
//        GET /websites/public/14
       
//        Authentication:
//        NONE
//     ===================================================== */

//     if (
//       isPublicWebsiteApiRoute(config)
//     ) {
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

//       /*
//        * VERY IMPORTANT:
//        *
//        * Remove any Firebase/Admin token that
//        * may already exist on the Axios config.
//        */

//       delete config.headers.Authorization;
//       delete config.headers.authorization;

//       return config;
//     }

//     /* =====================================================
//        4. ADMIN PROTECTED API
       
//        IMPORTANT:
//        Admin is checked before Firebase.
//     ===================================================== */

//     if (
//       isAdminApiRoute(config)
//     ) {
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
//             "Admin token missing"
//           )
//         );
//       }

//       /*
//        * ALWAYS send Admin token.
//        */

//       config.headers.Authorization =
//         `Bearer ${adminToken}`;

//       return config;
//     }

//     /* =====================================================
//        5. FIREBASE PROTECTED API
//     ===================================================== */

//     if (
//       isFirebaseApiRoute(config)
//     ) {
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

//       if (
//         isWebsitePreviewRoute()
//       ) {
//         console.log(
//           "Website Preview:",
//           "YES"
//         );

//         console.log(
//           "Student Token:",
//           localStorage.getItem(
//             "studentToken"
//           )
//             ? "FOUND"
//             : "NOT FOUND"
//         );
//       }

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

//     /*
//      * Remove stale authentication.
//      */

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
//        LOGIN REQUEST FAILURE
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

//       return Promise.reject(
//         error
//       );
//     }

//     /* =====================================================
//        PUBLIC WEBSITE FAILURE
       
//        NEVER try Firebase refresh for this.
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

//       return Promise.reject(
//         error
//       );
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

//       /*
//        * Clear ONLY Admin authentication.
//        */

//       localStorage.removeItem(
//         "adminToken"
//       );

//       localStorage.removeItem(
//         "adminUser"
//       );

//       /*
//        * Never remove Firebase session here.
//        */

//       if (
//         isAdminPage()
//       ) {
//         window.location.replace(
//           "/admin-login"
//         );
//       }

//       return Promise.reject(
//         error
//       );
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

//         if (
//           !auth.currentUser
//         ) {
//           console.error(
//             "Firebase user no longer exists"
//           );

//           return Promise.reject(
//             error
//           );
//         }

//         const freshToken =
//           await auth.currentUser.getIdToken(
//             true
//           );

//         if (!freshToken) {
//           throw new Error(
//             "Fresh Firebase token not generated"
//           );
//         }

//         /* Save Firebase token */

//         localStorage.setItem(
//           "token",
//           freshToken
//         );

//         /* Student token */

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

//         /* Retry original request */

//         originalRequest.headers =
//           originalRequest.headers || {};

//         originalRequest.headers.Authorization =
//           `Bearer ${freshToken}`;

//         console.log(
//           "Retrying Firebase request with refreshed token"
//         );

//         return API(
//           originalRequest
//         );
//       } catch (
//         refreshError
//       ) {
//         console.error(
//           "Firebase token refresh failed:",
//           refreshError
//         );

//         /* Firebase sign out */

//         try {
//           await signOut(
//             getAuth()
//           );
//         } catch (
//           signOutError
//         ) {
//           console.error(
//             "Firebase signOut failed:",
//             signOutError
//           );
//         }

//         /* Clear Firebase session */

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

//         /*
//          * IMPORTANT:
//          *
//          * Do NOT remove adminToken.
//          */

//         /* Redirect */

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

//     return Promise.reject(
//       error
//     );
//   }
// );

// /* =========================================================
//    EXPORT
// ========================================================= */

// export default API;



import axios from "axios";
import { getAuth, signOut } from "firebase/auth";


/* =========================================================
   API CONFIG
========================================================= */

const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://finearts-backend.onrender.com/api",

  timeout: 120000,
});


/* =========================================================
   PATH HELPERS
========================================================= */

const getPath = () => {
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


/* =========================================================
   INSTITUTE PAGE
========================================================= */

const isInstituteRoute = () => {
  const path = getPath();

  return (
    path === "/institute" ||
    path.startsWith("/institute/")
  );
};


/* =========================================================
   WEBSITE PREVIEW PAGE
========================================================= */

const isWebsitePreviewRoute = () => {
  const path = getPath();

  return (
    path === "/institute/website/preview" ||
    path.startsWith("/institute/website/preview/")
  );
};


/* =========================================================
   TRAINER PAGE
========================================================= */

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
    url.startsWith("/websites/public/")
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
     PUBLIC WEBSITE MUST NEVER BE FIREBASE
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

  if (
    /^\/users\/\d+\/status$/.test(url)
  ) {
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
   GET FIREBASE TOKEN
========================================================= */

const getFirebaseToken = async () => {
  const auth = getAuth();


  /* -------------------------------------------------------
     CURRENT FIREBASE USER
  ------------------------------------------------------- */

  if (auth.currentUser) {
    try {
      const token =
        await auth.currentUser.getIdToken(true);

      if (!token) {
        return null;
      }


      /* Normal Firebase token */

      localStorage.setItem(
        "token",
        token
      );


      /* Website Preview / Student */

      if (
        isWebsitePreviewRoute() ||
        localStorage.getItem("studentToken")
      ) {
        localStorage.setItem(
          "studentToken",
          token
        );
      }


      return token;

    } catch (error) {
      console.error(
        "Firebase token refresh failed:",
        error
      );
    }
  }


  /* -------------------------------------------------------
     STUDENT TOKEN
  ------------------------------------------------------- */

  const studentToken =
    localStorage.getItem(
      "studentToken"
    );

  if (studentToken) {
    return studentToken;
  }


  /* -------------------------------------------------------
     FIREBASE TOKEN FALLBACK
  ------------------------------------------------------- */

  const storedToken =
    localStorage.getItem(
      "token"
    );

  if (storedToken) {
    return storedToken;
  }


  return null;
};


/* =========================================================
   GET ADMIN TOKEN
========================================================= */

/*
 * IMPORTANT
 *
 * Different versions of the Admin login may store the
 * token under different localStorage keys.
 *
 * We check all known Admin keys first.
 */

const getAdminToken = () => {
  const possibleKeys = [
    "adminToken",
    "admin_token",
    "adminAccessToken",
    "admin_access_token",
    "adminAuthToken",
    "admin_auth_token",
  ];


  /* -------------------------------------------------------
     CHECK LOCAL STORAGE ADMIN KEYS
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
     CHECK SESSION STORAGE ADMIN KEYS
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
     FALLBACK:
     Some Admin login implementations store the JWT as
     "token".

     We only use it when an Admin user/session marker
     exists, to avoid accidentally sending a Firebase token
     as an Admin token.
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
      genericToken !== "null"
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

    if (
      isAdminLoginRequest(config)
    ) {
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

    if (
      isFirebaseLoginRequest(config)
    ) {
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
    ===================================================== */

    if (
      isPublicWebsiteApiRoute(config)
    ) {
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

    if (
      isAdminApiRoute(config)
    ) {

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

    if (
      isFirebaseApiRoute(config)
    ) {

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

      return Promise.reject(
        error
      );
    }


    /* =====================================================
       PUBLIC WEBSITE FAILURE
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

      return Promise.reject(
        error
      );
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

      localStorage.removeItem(
        "adminToken"
      );

      localStorage.removeItem(
        "admin_token"
      );

      localStorage.removeItem(
        "adminAccessToken"
      );

      localStorage.removeItem(
        "admin_access_token"
      );

      localStorage.removeItem(
        "adminAuthToken"
      );

      localStorage.removeItem(
        "admin_auth_token"
      );

      sessionStorage.removeItem(
        "adminToken"
      );

      sessionStorage.removeItem(
        "admin_token"
      );

      sessionStorage.removeItem(
        "adminAccessToken"
      );

      sessionStorage.removeItem(
        "admin_access_token"
      );

      sessionStorage.removeItem(
        "adminAuthToken"
      );

      sessionStorage.removeItem(
        "admin_auth_token"
      );


      localStorage.removeItem(
        "adminUser"
      );

      localStorage.removeItem(
        "admin_user"
      );


      /* ---------------------------------------------------
         DO NOT REMOVE FIREBASE TOKEN
      --------------------------------------------------- */

      if (isAdminPage()) {
        window.location.replace(
          "/admin-login"
        );
      }


      return Promise.reject(
        error
      );
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


        if (
          !auth.currentUser
        ) {

          console.error(
            "Firebase user no longer exists"
          );

          return Promise.reject(
            error
          );
        }


        const freshToken =
          await auth.currentUser.getIdToken(
            true
          );


        if (!freshToken) {
          throw new Error(
            "Fresh Firebase token not generated"
          );
        }


        /* -------------------------------------------------
           SAVE FIREBASE TOKEN
        ------------------------------------------------- */

        localStorage.setItem(
          "token",
          freshToken
        );


        if (
          isWebsitePreviewRoute() ||
          localStorage.getItem(
            "studentToken"
          )
        ) {

          localStorage.setItem(
            "studentToken",
            freshToken
          );
        }


        /* -------------------------------------------------
           RETRY REQUEST
        ------------------------------------------------- */

        originalRequest.headers =
          originalRequest.headers || {};


        originalRequest.headers.Authorization =
          `Bearer ${freshToken}`;


        console.log(
          "Retrying Firebase request with refreshed token"
        );


        return API(
          originalRequest
        );

      } catch (
        refreshError
      ) {

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
        } catch (
          signOutError
        ) {
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


    return Promise.reject(
      error
    );
  }
);


/* =========================================================
   EXPORT
========================================================= */

export default API;