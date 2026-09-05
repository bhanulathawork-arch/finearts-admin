import API from "./api";

// Admin Login
export const adminLogin = async (data) => {
  const response = await API.post("/admin-auth/login", data);
  return response.data;
};