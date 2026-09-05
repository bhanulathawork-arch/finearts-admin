// src/services/dashboardService.js

import axios from "axios";

const API_URL = "http://localhost:5000/api/dashboard";

/* ─────────────────────────────────────────────
   GET ADMIN TOKEN
───────────────────────────────────────────── */
const getAuthConfig = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Admin token not found");
  }

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

/* ─────────────────────────────────────────────
   ADMIN DASHBOARD
───────────────────────────────────────────── */
export const getAdminDashboard = async () => {
  const config = getAuthConfig();

  const response = await axios.get(
    `${API_URL}/admin`,
    config
  );

  return response.data;
};

/* ─────────────────────────────────────────────
   ADMIN REVENUE
───────────────────────────────────────────── */
export const getAdminRevenue = async () => {
  const config = getAuthConfig();

  const response = await axios.get(
    `${API_URL}/admin/revenue`,
    config
  );

  return response.data;
};

/* ─────────────────────────────────────────────
   BOOKINGS SUMMARY
───────────────────────────────────────────── */
export const getAdminBookingsSummary = async () => {
  const config = getAuthConfig();

  const response = await axios.get(
    `${API_URL}/admin/bookings-summary`,
    config
  );

  return response.data;
};

/* ─────────────────────────────────────────────
   USERS SUMMARY
───────────────────────────────────────────── */
export const getAdminUsersSummary = async () => {
  const config = getAuthConfig();

  const response = await axios.get(
    `${API_URL}/admin/users-summary`,
    config
  );

  return response.data;
};