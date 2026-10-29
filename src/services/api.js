
import axios from "axios";
import {
  getAuth,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

/* =========================================================
   API BASE URL
========================================================= */
// const API_BASE_URL = (
//   import.meta.env.VITE_API_URL || "http://localhost:5000/api"
// ).replace(/\/+$/, "");

// const API = axios.create({
//   baseURL: API_BASE_URL,
//   timeout: 120000,
//   headers: { "Content-Type": "application/json" },
// });


const API_BASE_URL = (
  import.meta.env.VITE_API_URL ||
  "https://finearts-backend.onrender.com/api"
).replace(/\/+$/, "");

const API = axios.create({
  baseURL: API_BASE_URL,
  timeout: 120000,
  headers: { "Content-Type": "application/json" },
});
/* =========================================================
   PATH / ROUTE HELPERS
========================================================= */
const getPath = () =>
  typeof window === "undefined" ? "/" : window.location.pathname || "/";

const getRequestUrl = (config = {}) =>
  String(config.url || "")
    .split("?")[0]
    .replace(/\/+$/, "")
    .toLowerCase();

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
  return path === "/institute" || path.startsWith("/institute/");
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
  return path === "/trainer-login" || path === "/trainer" || path.startsWith("/trainer/");
};

const isPublicWebsiteApiRoute = (config = {}) => {
  const url = getRequestUrl(config);
  return url === "/websites/public" || url.startsWith("/websites/public/");
};

const isAdminLoginRequest = (config = {}) => {
  const url = getRequestUrl(config);
  return [
    "/admin-auth/login",
    "/admin/login",
    "/admin/signin",
    "/auth/admin/login",
    "/auth/admin/signin",
  ].includes(url);
};

const isFirebaseLoginRequest = (config = {}) => {
  const url = getRequestUrl(config);
  return ["/institutes/login", "/trainers/login", "/students/login"].includes(url);
};

/* =========================================================
   ADMIN API ROUTES
   IMPORTANT: check certificate admin routes before Firebase routes.
========================================================= */
const isAdminApiRoute = (config = {}) => {
  const url = getRequestUrl(config);

  if (isPublicWebsiteApiRoute(config) || isAdminLoginRequest(config) || isFirebaseLoginRequest(config)) {
    return false;
  }

  if (url === "/certificates/admin" || url.startsWith("/certificates/admin/")) {
    return true;
  }

  if (url === "/users/admin" || url.startsWith("/users/admin/")) {
    return true;
  }

  if (/^\/users\/\d+\/status$/.test(url)) {
    return true;
  }

  if (url === "/admin" || url.startsWith("/admin/")) {
    return true;
  }

  // These API prefixes are used by the admin panel. Firebase-owned routes
  // are excluded below to avoid sending the admin JWT to Firebase endpoints.
  const adminPrefixes = [
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
    "/lms",
    "/attendance",
    "/assignments",
    "/websites/admin",
    "/recordings",
  ];

  const matchesAdminPrefix = adminPrefixes.some(
    (prefix) => url === prefix || url.startsWith(`${prefix}/`)
  );

  if (!matchesAdminPrefix) return false;
  if (isInstituteRoute() || isTrainerPage()) return false;

  // Known Firebase-specific API paths should not be treated as admin APIs.
  if (
    url === "/trainers/institute" ||
    url.startsWith("/trainers/institute/") ||
    url === "/testimonials/institute" ||
    url.startsWith("/testimonials/institute/")
  ) {
    return false;
  }

  return true;
};

/* =========================================================
   FIREBASE API ROUTES
========================================================= */
const isFirebaseApiRoute = (config = {}) => {
  const url = getRequestUrl(config);

  if (isPublicWebsiteApiRoute(config) || isAdminLoginRequest(config)) return false;
  if (isAdminApiRoute(config)) return false;
  if (isFirebaseLoginRequest(config)) return true;

  const exactRoutes = ["/trainers/institute", "/testimonials/institute"];
  const prefixes = [
    "/trainers/institute/",
    "/testimonials/institute/",
    "/users/",
    "/students/",
    "/lms/trainer/",
    "/lms/users/",
    "/lms/user/",
    "/lms/students/",
    "/attendance/",
    "/recordings/",
    "/certificates/",
  ];

  if (exactRoutes.includes(url)) return true;
  if (prefixes.some((prefix) => url.startsWith(prefix))) return true;
  if (url === "/users" || url === "/students") return true;

  if (isInstituteRoute() || isTrainerPage()) return true;
  return false;
};

/* =========================================================
   FIREBASE TOKEN HELPERS
========================================================= */
let firebaseTokenPromise = null;
let firebaseAuthReadyPromise = null;
let lastFirebaseTokenFailureAt = 0;
const FIREBASE_TOKEN_FAILURE_COOLDOWN = 30000;

const waitForFirebaseAuth = () => {
  const auth = getAuth();
  if (auth.currentUser) return Promise.resolve(auth.currentUser);

  if (!firebaseAuthReadyPromise) {
    firebaseAuthReadyPromise = new Promise((resolve) => {
      let unsubscribe;
      unsubscribe = onAuthStateChanged(auth, (user) => {
        if (unsubscribe) unsubscribe();
        resolve(user);
        firebaseAuthReadyPromise = null;
      });
    });
  }
  return firebaseAuthReadyPromise;
};

const getStoredFirebaseToken = () => {
  if (typeof window === "undefined") return null;
  const candidates = [
    localStorage.getItem("studentToken"),
    localStorage.getItem("token"),
  ];
  return candidates.find(
    (value) => value && value !== "undefined" && value !== "null" && value.trim()
  )?.trim() || null;
};

const saveFirebaseToken = (token) => {
  if (typeof window === "undefined" || !token) return;
  localStorage.setItem("token", token);
  if (isWebsitePreviewRoute() || localStorage.getItem("studentToken")) {
    localStorage.setItem("studentToken", token);
  }
};

const getFirebaseToken = async ({ forceRefresh = false } = {}) => {
  const auth = getAuth();
  let user = auth.currentUser;
  if (!user) user = await waitForFirebaseAuth();

  if (user) {
    try {
      if (!forceRefresh && firebaseTokenPromise) return await firebaseTokenPromise;
      if (!forceRefresh && Date.now() - lastFirebaseTokenFailureAt < FIREBASE_TOKEN_FAILURE_COOLDOWN) {
        return getStoredFirebaseToken();
      }

      firebaseTokenPromise = user.getIdToken(forceRefresh);
      const token = await firebaseTokenPromise;
      firebaseTokenPromise = null;
      lastFirebaseTokenFailureAt = 0;
      if (token) saveFirebaseToken(token);
      return token || null;
    } catch (error) {
      firebaseTokenPromise = null;
      lastFirebaseTokenFailureAt = Date.now();
      console.error("Firebase token retrieval failed:", error?.message || error);
    }
  }
  return getStoredFirebaseToken();
};

/* =========================================================
   ADMIN TOKEN HELPER
========================================================= */
const getAdminToken = () => {
  if (typeof window === "undefined") return null;
  const keys = ["adminToken", "admin_token", "adminAccessToken", "admin_access_token", "adminAuthToken", "admin_auth_token"];

  for (const storage of [localStorage, sessionStorage]) {
    for (const key of keys) {
      const value = storage.getItem(key);
      if (value && value !== "undefined" && value !== "null" && value.trim()) {
        return value.trim();
      }
    }
  }

  const role = localStorage.getItem("role") || sessionStorage.getItem("role");
  if (String(role).toUpperCase() === "ADMIN") {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token && token !== "undefined" && token !== "null" && token.trim()) return token.trim();
  }
  return null;
};

/* =========================================================
   REQUEST INTERCEPTOR
========================================================= */
API.interceptors.request.use(
  async (config) => {
    config.headers = config.headers || {};

    // Let Axios set the multipart boundary for FormData uploads.
    if (typeof FormData !== "undefined" && config.data instanceof FormData) {
      delete config.headers["Content-Type"];
      delete config.headers["content-type"];
    }

    const method = (config.method || "GET").toUpperCase();
    const url = config.url || "";

    // Admin login is public and must not inherit an old Authorization header.
    if (isAdminLoginRequest(config)) {
      delete config.headers.Authorization;
      delete config.headers.authorization;
      return config;
    }

    // Firebase login routes may use their own supplied authorization, otherwise
    // the login endpoint itself is handled without attaching an admin token.
    if (isFirebaseLoginRequest(config)) {
      if (!config.headers.Authorization && !config.headers.authorization) {
        const token = await getFirebaseToken();
        if (token) config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    }

    if (isPublicWebsiteApiRoute(config)) {
      delete config.headers.Authorization;
      delete config.headers.authorization;
      return config;
    }

    // This branch must come before Firebase routing, especially for
    // /certificates/admin/* endpoints.
    if (isAdminApiRoute(config)) {
      const adminToken = getAdminToken();
      if (!adminToken) {
        console.error(`Admin token missing for ${method} ${url}. Log in again.`);
        return Promise.reject(new Error("Admin token missing. Please log in again."));
      }
      config.headers.Authorization = `Bearer ${adminToken}`;
      return config;
    }

    if (isFirebaseApiRoute(config)) {
      const token = await getFirebaseToken();
      if (!token) {
        return Promise.reject(new Error("Firebase user not authenticated. Please log in again."));
      }
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    }

    // Public endpoints should not accidentally receive a stale token.
    delete config.headers.Authorization;
    delete config.headers.authorization;
    return config;
  },
  (error) => Promise.reject(error)
);

/* =========================================================
   RESPONSE INTERCEPTOR
========================================================= */
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (!originalRequest) return Promise.reject(error);

    if (isAdminLoginRequest(originalRequest) || isFirebaseLoginRequest(originalRequest) || isPublicWebsiteApiRoute(originalRequest)) {
      return Promise.reject(error);
    }

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }
    originalRequest._retry = true;

    if (isAdminApiRoute(originalRequest)) {
      // Admin JWTs are issued by your backend; Firebase refresh cannot repair them.
      // Keep the stored token for diagnosis and require a fresh admin login.
      console.error("Admin API returned 401:", originalRequest.url, error.response?.data);
      for (const key of ["adminToken", "admin_token", "adminAccessToken", "admin_access_token", "adminAuthToken", "admin_auth_token"]) {
        localStorage.removeItem(key);
        sessionStorage.removeItem(key);
      }
      if (isAdminPage()) window.location.replace("/admin-login");
      return Promise.reject(error);
    }

    if (isFirebaseApiRoute(originalRequest)) {
      try {
        const auth = getAuth();
        let user = auth.currentUser;
        if (!user) user = await waitForFirebaseAuth();
        if (!user) return Promise.reject(error);

        const freshToken = await getFirebaseToken({ forceRefresh: true });
        if (!freshToken) throw new Error("Fresh Firebase token not generated");

        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${freshToken}`;
        return API(originalRequest);
      } catch (refreshError) {
        console.error("Firebase token refresh failed:", refreshError?.message || refreshError);
        try {
          await signOut(getAuth());
        } catch (signOutError) {
          console.error("Firebase signOut failed:", signOutError?.message || signOutError);
        }

        for (const key of ["token", "studentToken", "studentUser", "studentProfile", "studentRole"]) {
          localStorage.removeItem(key);
        }

        if (isWebsitePreviewRoute()) {
          window.location.replace("/institute/website/preview");
        } else if (isTrainerPage()) {
          window.location.replace("/trainer-login");
        } else if (isInstituteRoute()) {
          window.location.replace("/institute-login");
        } else {
          window.location.replace("/institute/login");
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

/* =========================================================
   EXPORTS
========================================================= */
const api = API;
export { API, api };
export default API;
