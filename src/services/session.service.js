


import axios from "axios";
import { getTimezone } from "../utils/timezone";

/* ═══════════════════════════════════════════════════════════════════════════
   AXIOS INSTANCE
   ═══════════════════════════════════════════════════════════════════════════ */

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://finearts-backend.onrender.com/api";

const api = axios.create({
  baseURL: API_URL,
  timeout: 120000,
});

/* ── Auth Token ── */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ── Timezone ── */
api.interceptors.request.use(
  (config) => {
    config.headers = config.headers || {};
    config.headers["X-Timezone"] = getTimezone();

    return config;
  },
  (error) => Promise.reject(error)
);

/* ── Response ── */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Pass through — components handle errors with toast
    return Promise.reject(error);
  }
);

export default api;

/* ═══════════════════════════════════════════════════════════════════════════
   SESSIONS
   ═══════════════════════════════════════════════════════════════════════════ */

/**
 * Get all sessions for a class.
 */
export const getClassSessions = async (classId) => {
  const res = await api.get(`/sessions/class/${classId}`);
  return res.data;
};

/**
 * Get sessions for booking.
 */
export const getClassSessionsForBooking = async (classId) => {
  const res = await api.get(`/sessions/class/${classId}/booking`);
  return res.data.data;
};

/**
 * Get a single session by ID.
 */
export const getSessionById = async (id) => {
  const res = await api.get(`/sessions/${id}`);
  return res.data;
};

/**
 * Create session templates.
 */
export const createSession = async (payload) => {
  const res = await api.post("/sessions/create", payload);
  return res.data;
};

/**
 * Update a session template.
 */
export const updateSession = async (id, payload) => {
  const res = await api.put(`/sessions/${id}`, payload);
  return res.data;
};

/**
 * Delete a session.
 */
export const deleteSession = async (id) => {
  const res = await api.delete(`/sessions/${id}`);
  return res.data;
};

/**
 * Get user's sessions for today.
 */
export const getTodaySessions = async () => {
  const res = await api.get("/sessions/user/today");
  return res.data;
};

/**
 * Get user's upcoming sessions.
 */
export const getUpcomingSessions = async () => {
  const res = await api.get("/sessions/user/upcoming");
  return res.data;
};