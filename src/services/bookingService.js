
// import axios from "axios";

// const API_URL = "https://finearts-backend.onrender.com/api/bookings";

// /* GET ADMIN TOKEN */
// const getAdminConfig = () => {

//   const token = localStorage.getItem("token");

//   if (!token) {
//     throw new Error("Admin token not found");
//   }

//   return {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
// };

// /* GET ALL BOOKINGS */
// export const getAllBookings = async () => {

//   const config = getAdminConfig();

//   const response = await axios.get(
//     API_URL,
//     config
//   );

//   return response.data;
// };

// /* CONFIRM BOOKING */
// export const confirmBooking = async (id) => {

//   const config = getAdminConfig();

//   const response = await axios.patch(
//     `${API_URL}/${id}/confirm`,
//     {},
//     config
//   );

//   return response.data;
// };

// /* CANCEL BOOKING */
// export const cancelBooking = async (id) => {

//   const config = getAdminConfig();

//   const response = await axios.patch(
//     `${API_URL}/${id}/cancel`,
//     {},
//     config
//   );

//   return response.data;
// };

// /* COMPLETE BOOKING */
// export const completeBooking = async (id) => {

//   const config = getAdminConfig();

//   const response = await axios.patch(
//     `${API_URL}/${id}/complete`,
//     {},
//     config
//   );

//   return response.data;
// };


// import axios from "axios";

// const API_URL = "https://finearts-backend.onrender.com/api/bookings";

// /* GET ADMIN TOKEN */
// const getAdminConfig = () => {
//   const token = localStorage.getItem("token");

//   if (!token) {
//     throw new Error("Admin token not found");
//   }

//   return {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
// };

// /* GET ALL BOOKINGS */
// export const getAllBookings = async () => {
//   const config = getAdminConfig();

//   const response = await axios.get(
//     `${API_URL}/admin/all`,
//     config
//   );

//   return response.data;
// };

// /* GET BOOKING BY ID */
// export const getBookingById = async (id) => {
//   const config = getAdminConfig();

//   const response = await axios.get(
//     `${API_URL}/${id}`,
//     config
//   );

//   return response.data;
// };

// /* CONFIRM BOOKING */
// export const confirmBooking = async (id) => {
//   const config = getAdminConfig();

//   const response = await axios.patch(
//     `${API_URL}/${id}/confirm`,
//     {},
//     config
//   );

//   return response.data;
// };

// /* CANCEL BOOKING */
// export const cancelBooking = async (id) => {
//   const config = getAdminConfig();

//   const response = await axios.patch(
//     `${API_URL}/${id}/cancel`,
//     {},
//     config
//   );

//   return response.data;
// };

// /* COMPLETE BOOKING */
// export const completeBooking = async (id) => {
//   const config = getAdminConfig();

//   const response = await axios.patch(
//     `${API_URL}/${id}/complete`,
//     {},
//     config
//   );

//   return response.data;
// };

// /* TRAINER BOOKINGS */
// export const getTrainerBookings = async () => {
//   const config = getAdminConfig();

//   const response = await axios.get(
//     `${API_URL}/trainer/my-bookings`,
//     config
//   );

//   return response.data;
// };

// /* INSTITUTE BOOKINGS */
// export const getInstituteBookings = async () => {
//   const config = getAdminConfig();

//   const response = await axios.get(
//     `${API_URL}/institute/my-bookings`,
//     config
//   );

//   return response.data;
// };

// /* ADMIN CLASS BOOKINGS */
// export const getAdminClassBookings = async () => {
//   const config = getAdminConfig();

//   const response = await axios.get(
//     `${API_URL}/admin/classes`,
//     config
//   );

//   return response.data;
// };


// /* ==========================================================
//    STUDENT / WEBSITE BOOKING
// ========================================================== */

// /* CREATE BOOKING */
// export const createBooking = async (payload, token) => {
//   if (!token) {
//     throw new Error("Student token not found");
//   }

//   const response = await axios.post(
//     `${API_URL}/create`,
//     payload,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     }
//   );

//   return response.data;
// };



import axios from "axios";

const API_URL =
  "https://finearts-backend.onrender.com/api/bookings";


/* =========================================================
   ADMIN TOKEN
========================================================= */

const getAdminConfig = () => {
  const token =
    localStorage.getItem("token");

  if (!token) {
    throw new Error(
      "Admin token not found"
    );
  }

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};


/* =========================================================
   ADMIN - ALL BOOKINGS
========================================================= */

export const getAllBookings =
  async () => {

    const config =
      getAdminConfig();

    const response =
      await axios.get(
        `${API_URL}/admin/all`,
        config
      );

    return response.data;
  };


/* =========================================================
   BOOKING BY ID
========================================================= */

export const getBookingById =
  async (id) => {

    const config =
      getAdminConfig();

    const response =
      await axios.get(
        `${API_URL}/${id}`,
        config
      );

    return response.data;
  };


/* =========================================================
   CONFIRM BOOKING
========================================================= */

export const confirmBooking =
  async (id) => {

    const config =
      getAdminConfig();

    const response =
      await axios.patch(
        `${API_URL}/${id}/confirm`,
        {},
        config
      );

    return response.data;
  };


/* =========================================================
   CANCEL BOOKING
========================================================= */

export const cancelBooking =
  async (id) => {

    const config =
      getAdminConfig();

    const response =
      await axios.patch(
        `${API_URL}/${id}/cancel`,
        {},
        config
      );

    return response.data;
  };


/* =========================================================
   COMPLETE BOOKING
========================================================= */

export const completeBooking =
  async (id) => {

    const config =
      getAdminConfig();

    const response =
      await axios.patch(
        `${API_URL}/${id}/complete`,
        {},
        config
      );

    return response.data;
  };


/* =========================================================
   TRAINER BOOKINGS
========================================================= */

export const getTrainerBookings =
  async () => {

    const config =
      getAdminConfig();

    const response =
      await axios.get(
        `${API_URL}/trainer/my-bookings`,
        config
      );

    return response.data;
  };


/* =========================================================
   INSTITUTE BOOKINGS
========================================================= */

export const getInstituteBookings =
  async () => {

    const config =
      getAdminConfig();

    const response =
      await axios.get(
        `${API_URL}/institute/my-bookings`,
        config
      );

    return response.data;
  };


/* =========================================================
   ADMIN CLASS BOOKINGS
========================================================= */

export const getAdminClassBookings =
  async () => {

    const config =
      getAdminConfig();

    const response =
      await axios.get(
        `${API_URL}/admin/classes`,
        config
      );

    return response.data;
  };


/* =========================================================
   STUDENT / WEBSITE
   CREATE BOOKING
========================================================= */

export const createBooking =
  async (
    payload,
    token
  ) => {

    if (!token) {
      throw new Error(
        "Student token not found"
      );
    }


    console.log(
      "CREATE BOOKING PAYLOAD:",
      payload
    );


    const response =
      await axios.post(
        API_URL,
        payload,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,

            "Content-Type":
              "application/json",
          },
        }
      );


    return response.data;
  };


/* =========================================================
   STUDENT - MY BOOKINGS
========================================================= */

export const getMyBookings =
  async (token) => {

    if (!token) {
      throw new Error(
        "Student token not found"
      );
    }


    const response =
      await axios.get(
        `${API_URL}/my`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );


    return response.data;
  };


/* =========================================================
   STUDENT - CHECK ELIGIBILITY
========================================================= */

export const checkBookingEligibility =
  async (
    payload,
    token
  ) => {

    if (!token) {
      throw new Error(
        "Student token not found"
      );
    }


    const response =
      await axios.post(
        `${API_URL}/check-eligibility`,
        payload,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,

            "Content-Type":
              "application/json",
          },
        }
      );


    return response.data;
  };


/* =========================================================
   STUDENT - BOOKING BY ID
========================================================= */

export const getStudentBookingById =
  async (
    id,
    token
  ) => {

    if (!token) {
      throw new Error(
        "Student token not found"
      );
    }


    const response =
      await axios.get(
        `${API_URL}/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );


    return response.data;
  };


/* =========================================================
   PUBLIC - BOOKINGS BY CLASS
========================================================= */

export const getClassBookings =
  async (classId) => {

    const response =
      await axios.get(
        `${API_URL}/class/${classId}`
      );

    return response.data;
  };


/* =========================================================
   PUBLIC - BOOKINGS BY TRAINER
========================================================= */

export const getTrainerClassBookings =
  async (trainerId) => {

    const response =
      await axios.get(
        `${API_URL}/trainer/${trainerId}`
      );

    return response.data;
  };


/* =========================================================
   PUBLIC - BOOKINGS BY INSTITUTE
========================================================= */

export const getInstituteClassBookings =
  async (instituteId) => {

    const response =
      await axios.get(
        `${API_URL}/institute/${instituteId}`
      );

    return response.data;
  };