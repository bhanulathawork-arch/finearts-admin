// import axios from "axios";

// const API_URL = "http://localhost:5000/api/testimonials";

// export const getTestimonials = async () => {
//   const res = await axios.get(API_URL);
//   return res.data.data;
// };

// export const createTestimonial = async (formData, token) => {
//   const res = await axios.post(API_URL, formData, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "multipart/form-data",
//     },
//   });

//   return res.data;
// };

// export const updateTestimonial = async (
//   id,
//   formData,
//   token
// ) => {
//   const res = await axios.put(
//     `${API_URL}/${id}`,
//     formData,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "multipart/form-data",
//       },
//     }
//   );

//   return res.data;
// };

// export const deleteTestimonial = async (
//   id,
//   token
// ) => {
//   const res = await axios.delete(
//     `${API_URL}/${id}`,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );

//   return res.data;
// };


// import API from "./api";

// const API_URL =
//   "http://localhost:5000/api/testimonials";


// /* =========================================================
//    GET INSTITUTE TOKEN
// ========================================================= */

// const getInstituteToken = () => {
//   const token = localStorage.getItem("token");

//   if (!token) {
//     throw new Error(
//       "Institute authentication token not found. Please login again."
//     );
//   }

//   return token;
// };


// /* =========================================================
//    ADMIN
//    GET ALL TESTIMONIALS
// ========================================================= */

// export const getTestimonials = async (token) => {
//   const res = await axios.get(
//     API_URL,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );

//   return res.data.data;
// };


// /* =========================================================
//    ADMIN
//    CREATE TESTIMONIAL
// ========================================================= */

// export const createTestimonial = async (
//   formData,
//   token
// ) => {
//   const res = await axios.post(
//     API_URL,
//     formData,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "multipart/form-data",
//       },
//     }
//   );

//   return res.data;
// };


// /* =========================================================
//    ADMIN
//    UPDATE TESTIMONIAL
// ========================================================= */

// export const updateTestimonial = async (
//   id,
//   formData,
//   token
// ) => {
//   const res = await axios.put(
//     `${API_URL}/${id}`,
//     formData,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "multipart/form-data",
//       },
//     }
//   );

//   return res.data;
// };


// /* =========================================================
//    ADMIN
//    DELETE TESTIMONIAL
// ========================================================= */

// export const deleteTestimonial = async (
//   id,
//   token
// ) => {
//   const res = await axios.delete(
//     `${API_URL}/${id}`,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );

//   return res.data;
// };


// /* =========================================================
//    INSTITUTE
//    GET OWN TESTIMONIALS
// ========================================================= */

// // export const getInstituteTestimonials =
// //   async () => {

// //     const token =
// //       getInstituteToken();

// //     const res = await axios.get(
// //       `${API_URL}/institute`,
// //       {
// //         headers: {
// //           Authorization:
// //             `Bearer ${token}`,
// //         },
// //       }
// //     );

// //     return res.data.data;
// //   };

// export const getInstituteTestimonials = async () => {
//   try {
//     const res = await API.get(
//       "/testimonials/institute",
//       {
//         params: {
//           _t: Date.now(),
//         },
//       }
//     );

//     console.log(
//       "Institute Testimonials Full Response:",
//       res.data
//     );

//     // Handle normal API response:
//     // { success: true, data: [...] }
//     if (Array.isArray(res.data?.data)) {
//       return res.data.data;
//     }

//     // Handle response where the array itself is returned
//     if (Array.isArray(res.data)) {
//       return res.data;
//     }

//     console.error(
//       "Unexpected testimonials response:",
//       res.data
//     );

//     return [];

//   } catch (error) {
//     console.error(
//       "Get Institute Testimonials API Error:",
//       error
//     );

//     throw error;
//   }
// };
// /* =========================================================
//    INSTITUTE
//    CREATE TESTIMONIAL
// ========================================================= */

// // export const createInstituteTestimonial =
// //   async (formData) => {

// //     const token =
// //       getInstituteToken();

// //     const res = await axios.post(
// //       `${API_URL}/institute`,
// //       formData,
// //       {
// //         headers: {
// //           Authorization:
// //             `Bearer ${token}`,

// //           "Content-Type":
// //             "multipart/form-data",
// //         },
// //       }
// //     );

// //     return res.data;
// //   };
// export const createInstituteTestimonial =
// async (formData) => {

//   const res = await API.post(
//     "/testimonials/institute",
//     formData
//   );

//   return res.data;
// };


// export const updateInstituteTestimonial =
// async (
//   id,
//   formData
// ) => {

//   const res = await API.put(
//     `/testimonials/institute/${id}`,
//     formData
//   );

//   return res.data;
// };


// export const deleteInstituteTestimonial =
// async (id) => {

//   const res = await API.delete(
//     `/testimonials/institute/${id}`
//   );

//   return res.data;
// };

// /* =========================================================
//    INSTITUTE
//    UPDATE OWN TESTIMONIAL
// ========================================================= */

// // export const updateInstituteTestimonial =
// //   async (
// //     id,
// //     formData
// //   ) => {

// //     const token =
// //       getInstituteToken();

// //     const res = await axios.put(
// //       `${API_URL}/institute/${id}`,
// //       formData,
// //       {
// //         headers: {
// //           Authorization:
// //             `Bearer ${token}`,

// //           "Content-Type":
// //             "multipart/form-data",
// //         },
// //       }
// //     );

// //     return res.data;
// //   };


// /* =========================================================
//    INSTITUTE
//    DELETE OWN TESTIMONIAL
// ========================================================= */

// // export const deleteInstituteTestimonial =
// //   async (id) => {

// //     const token =
// //       getInstituteToken();

// //     const res = await axios.delete(
// //       `${API_URL}/institute/${id}`,
// //       {
// //         headers: {
// //           Authorization:
// //             `Bearer ${token}`,
// //         },
// //       }
// //     );

// //     return res.data;
// //   };



// import axios from "axios";
// import API from "./api";

// const API_URL = "http://localhost:5000/api/testimonials";

// /* =========================================================
//    ADMIN
//    GET ALL TESTIMONIALS
// ========================================================= */

// export const getTestimonials = async (token) => {
//   const response = await axios.get(API_URL, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   return response.data?.data || [];
// };


// /* =========================================================
//    ADMIN
//    CREATE TESTIMONIAL
// ========================================================= */

// export const createTestimonial = async (
//   formData,
//   token
// ) => {
//   const response = await axios.post(
//     API_URL,
//     formData,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "multipart/form-data",
//       },
//     }
//   );

//   return response.data;
// };


// /* =========================================================
//    ADMIN
//    UPDATE TESTIMONIAL
// ========================================================= */

// export const updateTestimonial = async (
//   id,
//   formData,
//   token
// ) => {
//   const response = await axios.put(
//     `${API_URL}/${id}`,
//     formData,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "multipart/form-data",
//       },
//     }
//   );

//   return response.data;
// };


// /* =========================================================
//    ADMIN
//    DELETE TESTIMONIAL
// ========================================================= */

// export const deleteTestimonial = async (
//   id,
//   token
// ) => {
//   const response = await axios.delete(
//     `${API_URL}/${id}`,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );

//   return response.data;
// };


// /* =========================================================
//    INSTITUTE
//    GET OWN TESTIMONIALS

//    IMPORTANT:
//    Uses central API instance.

//    DO NOT manually get token here.
// ========================================================= */

// export const getInstituteTestimonials = async () => {
//   try {
//     console.log(
//       "================================="
//     );

//     console.log(
//       "GET INSTITUTE TESTIMONIALS"
//     );

//     console.log(
//       "================================="
//     );

//     const response = await API.get(
//       "/testimonials/institute",
//       {
//         params: {
//           _t: Date.now(),
//         },
//       }
//     );

//     console.log(
//       "Institute Testimonials Response:",
//       response.data
//     );

//     const data = response.data?.data;

//     if (Array.isArray(data)) {
//       return data;
//     }

//     if (Array.isArray(response.data)) {
//       return response.data;
//     }

//     console.warn(
//       "Unexpected testimonials response:",
//       response.data
//     );

//     return [];

//   } catch (error) {

//     console.error(
//       "Get Institute Testimonials API Error:",
//       error
//     );

//     console.error(
//       "Status:",
//       error.response?.status
//     );

//     console.error(
//       "Backend response:",
//       error.response?.data
//     );

//     throw error;
//   }
// };


// /* =========================================================
//    INSTITUTE
//    CREATE TESTIMONIAL
// ========================================================= */

// export const createInstituteTestimonial = async (
//   formData
// ) => {

//   try {

//     console.log(
//       "Creating institute testimonial..."
//     );

//     const response = await API.post(
//       "/testimonials/institute",
//       formData
//     );

//     console.log(
//       "Create testimonial response:",
//       response.data
//     );

//     return response.data;

//   } catch (error) {

//     console.error(
//       "Create Institute Testimonial Error:",
//       error
//     );

//     console.error(
//       "Status:",
//       error.response?.status
//     );

//     console.error(
//       "Backend response:",
//       error.response?.data
//     );

//     throw error;
//   }
// };


// /* =========================================================
//    INSTITUTE
//    UPDATE TESTIMONIAL
// ========================================================= */

// export const updateInstituteTestimonial = async (
//   id,
//   formData
// ) => {

//   try {

//     const response = await API.put(
//       `/testimonials/institute/${id}`,
//       formData
//     );

//     console.log(
//       "Update testimonial response:",
//       response.data
//     );

//     return response.data;

//   } catch (error) {

//     console.error(
//       "Update Institute Testimonial Error:",
//       error
//     );

//     console.error(
//       "Status:",
//       error.response?.status
//     );

//     console.error(
//       "Backend response:",
//       error.response?.data
//     );

//     throw error;
//   }
// };


// /* =========================================================
//    INSTITUTE
//    DELETE TESTIMONIAL
// ========================================================= */

// export const deleteInstituteTestimonial = async (
//   id
// ) => {

//   try {

//     const response = await API.delete(
//       `/testimonials/institute/${id}`
//     );

//     console.log(
//       "Delete testimonial response:",
//       response.data
//     );

//     return response.data;

//   } catch (error) {

//     console.error(
//       "Delete Institute Testimonial Error:",
//       error
//     );

//     console.error(
//       "Status:",
//       error.response?.status
//     );

//     console.error(
//       "Backend response:",
//       error.response?.data
//     );

//     throw error;
//   }
// };


import API from "./api";

/* =========================================================
   ADMIN
   GET ALL TESTIMONIALS
========================================================= */

export const getTestimonials = async () => {
  const response = await API.get(
    "/testimonials"
  );

  return response.data?.data || [];
};


/* =========================================================
   ADMIN
   CREATE TESTIMONIAL
========================================================= */

export const createTestimonial = async (
  formData
) => {
  const response = await API.post(
    "/testimonials",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return response.data;
};


/* =========================================================
   ADMIN
   UPDATE TESTIMONIAL
========================================================= */

export const updateTestimonial = async (
  id,
  formData
) => {
  if (!id) {
    throw new Error(
      "Testimonial ID is required"
    );
  }

  const response = await API.put(
    `/testimonials/${id}`,
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return response.data;
};


/* =========================================================
   ADMIN
   DELETE TESTIMONIAL
========================================================= */

export const deleteTestimonial = async (
  id
) => {
  if (!id) {
    throw new Error(
      "Testimonial ID is required"
    );
  }

  const response = await API.delete(
    `/testimonials/${id}`
  );

  return response.data;
};


/* =========================================================
   INSTITUTE
   GET OWN TESTIMONIALS
========================================================= */

export const getInstituteTestimonials =
  async () => {
    try {
      console.log(
        "================================="
      );

      console.log(
        "GET INSTITUTE TESTIMONIALS"
      );

      console.log(
        "================================="
      );

      const response =
        await API.get(
          "/testimonials/institute",
          {
            params: {
              _t: Date.now(),
            },
          }
        );

      console.log(
        "Institute Testimonials Response:",
        response.data
      );

      const data =
        response.data?.data;

      if (Array.isArray(data)) {
        return data;
      }

      if (
        Array.isArray(
          response.data
        )
      ) {
        return response.data;
      }

      console.warn(
        "Unexpected testimonials response:",
        response.data
      );

      return [];

    } catch (error) {
      console.error(
        "Get Institute Testimonials API Error:",
        error
      );

      console.error(
        "Status:",
        error.response?.status
      );

      console.error(
        "Backend response:",
        error.response?.data
      );

      throw error;
    }
  };


/* =========================================================
   INSTITUTE
   CREATE TESTIMONIAL
========================================================= */

export const createInstituteTestimonial =
  async (
    formData
  ) => {
    try {
      console.log(
        "Creating institute testimonial..."
      );

      const response =
        await API.post(
          "/testimonials/institute",
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

      console.log(
        "Create testimonial response:",
        response.data
      );

      return response.data;

    } catch (error) {
      console.error(
        "Create Institute Testimonial Error:",
        error
      );

      console.error(
        "Status:",
        error.response?.status
      );

      console.error(
        "Backend response:",
        error.response?.data
      );

      throw error;
    }
  };


/* =========================================================
   INSTITUTE
   UPDATE TESTIMONIAL
========================================================= */

export const updateInstituteTestimonial =
  async (
    id,
    formData
  ) => {
    try {
      if (!id) {
        throw new Error(
          "Testimonial ID is required"
        );
      }

      const response =
        await API.put(
          `/testimonials/institute/${id}`,
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

      console.log(
        "Update testimonial response:",
        response.data
      );

      return response.data;

    } catch (error) {
      console.error(
        "Update Institute Testimonial Error:",
        error
      );

      console.error(
        "Status:",
        error.response?.status
      );

      console.error(
        "Backend response:",
        error.response?.data
      );

      throw error;
    }
  };


/* =========================================================
   INSTITUTE
   DELETE TESTIMONIAL
========================================================= */

export const deleteInstituteTestimonial =
  async (
    id
  ) => {
    try {
      if (!id) {
        throw new Error(
          "Testimonial ID is required"
        );
      }

      const response =
        await API.delete(
          `/testimonials/institute/${id}`
        );

      console.log(
        "Delete testimonial response:",
        response.data
      );

      return response.data;

    } catch (error) {
      console.error(
        "Delete Institute Testimonial Error:",
        error
      );

      console.error(
        "Status:",
        error.response?.status
      );

      console.error(
        "Backend response:",
        error.response?.data
      );

      throw error;
    }
  };