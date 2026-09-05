// import axios from "axios";

// const API_URL = "http://localhost:5000/api/admin/users";

// /* ───────── GET TOKEN ───────── */
// const getToken = () => {
//   return localStorage.getItem("token");
// };

// /* ───────── GET ALL USERS ───────── */
// export const getAllUsers = async () => {
//   const token = getToken();

//   if (!token) {
//     throw new Error("Admin token not found");
//   }

//   const response = await axios.get(API_URL, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   return response.data;
// };


import axios from "axios";

const API_URL = "http://localhost:5000/api/admin/users";

const getToken = () => {
  return localStorage.getItem("adminToken");
};

export const getAllUsers = async () => {
  const token = getToken();

  if (!token) {
    throw new Error("Admin token not found");
  }

  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};