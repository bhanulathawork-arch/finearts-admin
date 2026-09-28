// import api from "./api";

// /* ===========================
//    Sessions
// =========================== */

// export const getClassSessions = async (classId) => {
//   const res = await api.get(`/sessions/class/${classId}`);
//   return res.data;
// };

// export const createSession = async (payload) => {
//   const res = await api.post("/sessions/create", payload);
//   return res.data;
// };

// export const updateSession = async (id, payload) => {
//   const res = await api.put(`/sessions/${id}`, payload);
//   return res.data;
// };

// export const deleteSession = async (id) => {
//   const res = await api.delete(`/sessions/${id}`);
//   return res.data;
// };

// export const getSessionById = async (id) => {
//   const res = await api.get(`/sessions/${id}`);
//   return res.data;
// };

// /* ===========================
//    Zoom
// =========================== */

// export const generateZoomMeeting = async (id) => {
//   const res = await api.post(`/sessions/${id}/generate-zoom`);
//   return res.data;
// };

// export const updateZoomMeeting = async (id) => {
//   const res = await api.patch(`/sessions/${id}/update-zoom`);
//   return res.data;
// };

// export const deleteZoomMeeting = async (id) => {
//   const res = await api.delete(`/sessions/${id}/delete-zoom`);
//   return res.data;
// };

// export const endZoomMeeting = async (id) => {
//   const res = await api.patch(`/sessions/${id}/end-zoom`);
//   return res.data;
// };


// import axios from "axios";
// import { getTimezone } from "../utils/timezone";

// /* ═══════════════════════════════════════════════════════════════════════════
//    AXIOS INSTANCE
//    ═══════════════════════════════════════════════════════════════════════════
//    Every request (sessions + zoom) automatically gets:
//      • Authorization header (token or adminToken)
//      • X-Timezone header (browser's auto-detected IANA timezone)
//    ═══════════════════════════════════════════════════════════════════════════ */

// const api = axios.create({
//   baseURL: "http://localhost:5000/api",
// });

// /* ── Auth: supports both user and admin tokens ── */
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token") || localStorage.getItem("adminToken");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// /* ── Timezone: auto-detect, auto-send ── */
// api.interceptors.request.use((config) => {
//   config.headers["X-Timezone"] = getTimezone();
//   return config;
// });

// export default api;


// /* ═══════════════════════════════════════════════════════════════════════════
//    SESSIONS
//    ═══════════════════════════════════════════════════════════════════════════ */

// /**
//  * Get all session templates for a class (public).
//  * X-Timezone lets the backend format times if needed.
//  */
// export const getClassSessions = async (classId) => {
//   const res = await api.get(`/sessions/class/${classId}`);
//   return res.data;
// };

// /**
//  * Get a single session template by ID.
//  */
// export const getSessionById = async (id) => {
//   const res = await api.get(`/sessions/${id}`);
//   return res.data;
// };

// /**
//  * Create session templates.
//  *
//  * Each session in the payload should include `timezone` so the backend
//  * knows what "14:00:00" means. Components get this from `useTimezone()`.
//  *
//  * @param {Object} payload
//  * @param {Array}  payload.sessions - Array of session objects
//  * @param {string} payload.sessions[].class_id
//  * @param {string} payload.sessions[].title
//  * @param {string} payload.sessions[].start_time - "14:00:00" or UTC ISO
//  * @param {string} payload.sessions[].end_time   - "15:00:00" or UTC ISO
//  * @param {string} payload.sessions[].timezone  - "Asia/Kolkata"
//  */
// export const createSession = async (payload) => {
//   const res = await api.post("/sessions/create", payload);
//   return res.data;
// };

// /**
//  * Update a session template.
//  * Can include `timezone` to update the stored timezone.
//  */
// export const updateSession = async (id, payload) => {
//   const res = await api.put(`/sessions/${id}`, payload);
//   return res.data;
// };

// /**
//  * Delete a session template and its Zoom meeting.
//  */
// export const deleteSession = async (id) => {
//   const res = await api.delete(`/sessions/${id}`);
//   return res.data;
// };


// /* ═══════════════════════════════════════════════════════════════════════════
//    ZOOM MEETINGS
//    ═══════════════════════════════════════════════════════════════════════════
//    X-Timezone is sent automatically. The backend reads the session's
//    stored timezone and passes it to the Zoom API, so each participant
//    sees the meeting time in their own timezone.
//    ═══════════════════════════════════════════════════════════════════════════ */

// /**
//  * Generate a Zoom meeting for a session template.
//  * Uses the session's stored timezone + times to create the meeting.
//  */
// export const generateZoomMeeting = async (id) => {
//   const res = await api.post(`/sessions/${id}/generate-zoom`);
//   return res.data;
// };

// /**
//  * Update an existing Zoom meeting (time/topic).
//  */
// export const updateZoomMeeting = async (id) => {
//   const res = await api.patch(`/sessions/${id}/update-zoom`);
//   return res.data;
// };

// /**
//  * Delete a Zoom meeting and clear the link from the session.
//  */
// export const deleteZoomMeeting = async (id) => {
//   const res = await api.delete(`/sessions/${id}/delete-zoom`);
//   return res.data;
// };

// /**
//  * End an active Zoom meeting (ejects all participants).
//  */
// export const endZoomMeeting = async (id) => {
//   const res = await api.patch(`/sessions/${id}/end-zoom`);
//   return res.data;
// };


// import API from "./api";
// import { getTimezone } from "../utils/timezone";

// /* ==========================================================
//    TIMEZONE INTERCEPTOR
// ========================================================== */

// API.interceptors.request.use((config) => {
//   config.headers = config.headers || {};
//   config.headers["X-Timezone"] = getTimezone();
//   return config;
// });

// /* ==========================================================
//    SESSIONS
// ========================================================== */

// // Get all sessions for a class
// export const getClassSessions = async (classId) => {
//   const res = await API.get(`/sessions/class/${classId}`);
//   return res.data;
// };

// // Get institute sessions
// export const getInstituteSessions = async () => {
//   const res = await API.get("/sessions/institute/my-sessions");
//   return res.data;
// };

// // Get single session
// export const getSessionById = async (id) => {
//   const res = await API.get(`/sessions/${id}`);
//   return res.data;
// };

// // Create session
// export const createSession = async (payload) => {
//   const res = await API.post("/sessions/create", payload);
//   return res.data;
// };

// // Update session
// export const updateSession = async (id, payload) => {
//   const res = await API.put(`/sessions/${id}`, payload);
//   return res.data;
// };

// // Delete session
// export const deleteSession = async (id) => {
//   const res = await API.delete(`/sessions/${id}`);
//   return res.data;
// };

// /* ==========================================================
//    ZOOM
// ========================================================== */

// // Generate Zoom Meeting
// export const generateZoomMeeting = async (sessionId) => {
//   const res = await API.post(`/sessions/${sessionId}/generate-zoom`);
//   return res.data;
// };

// // Update Zoom Meeting
// export const updateZoomMeeting = async (sessionId) => {
//   const res = await API.patch(`/sessions/${sessionId}/update-zoom`);
//   return res.data;
// };

// // End Zoom Meeting
// export const endZoomMeeting = async (sessionId) => {
//   const res = await API.patch(`/sessions/${sessionId}/end-zoom`);
//   return res.data;
// };

// // Delete Zoom Meeting
// export const deleteZoomMeeting = async (sessionId) => {
//   const res = await API.delete(`/sessions/${sessionId}/delete-zoom`);
//   return res.data;
// };




import axios from "axios";
import { getTimezone } from "../utils/timezone";

/* ═══════════════════════════════════════════════════════════════════════════
   AXIOS INSTANCE
   ═══════════════════════════════════════════════════════════════════════════
   Every request automatically gets:
     • Authorization header (from localStorage)
     • X-Timezone header (from browser's Intl API)

   This means NO component needs to manually pass timezone headers.
   The backend reads X-Timezone to know what "today" means for the user.
   ═══════════════════════════════════════════════════════════════════════════ */

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

/* ── Auth Token ── */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* ── Timezone ── */
api.interceptors.request.use((config) => {
  config.headers["X-Timezone"] = getTimezone();
  return config;
});

/* ── Response: unwrap data ── */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Pass through — let components handle errors with toast
    return Promise.reject(error);
  }
);

export default api;


/* ═══════════════════════════════════════════════════════════════════════════
   SESSIONS
   ═══════════════════════════════════════════════════════════════════════════ */

export const getClassSessions = async (classId) => {
  const res = await api.get(`/sessions/class/${classId}`);
  return res.data;
};

export const getClassSessionsForBooking = async (classId) => {
  const res = await api.get(`/sessions/class/${classId}/booking`);
  return res.data.data;
};

export const getSessionById = async (id) => {
  const res = await api.get(`/sessions/${id}`);
  return res.data;
};

/**
 * Create session templates.
 * Payload should include `timezone` (from useTimezone()) alongside
 * each session's start_time/end_time so the backend stores it.
 *
 * Example payload:
 * {
 *   sessions: [
 *     { class_id: 1, title: "Session A", start_time: "14:00:00", end_time: "15:00:00", timezone: "Asia/Kolkata" }
 *   ]
 * }
 */
export const createSession = async (payload) => {
  const res = await api.post("/sessions/create", payload);
  return res.data;
};

/**
 * Update a session template.
 * Payload can include `timezone` to update the stored timezone.
 */
export const updateSession = async (id, payload) => {
  const res = await api.put(`/sessions/${id}`, payload);
  return res.data;
};

export const deleteSession = async (id) => {
  const res = await api.delete(`/sessions/${id}`);
  return res.data;
};

/**
 * Get user's sessions for today.
 * X-Timezone header (auto-sent) tells the backend which "today" to use.
 */
export const getTodaySessions = async () => {
  const res = await api.get("/sessions/user/today");
  return res.data;
};

/**
 * Get user's upcoming sessions.
 * X-Timezone header determines the day ordering and range.
 */
export const getUpcomingSessions = async () => {
  const res = await api.get("/sessions/user/upcoming");
  return res.data;
};