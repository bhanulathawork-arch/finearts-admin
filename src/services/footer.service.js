// import API from "./api";

// /* =========================================================
//    GET FOOTER
// ========================================================= */

// export const getFooter = async () => {
//   try {
//     const response = await API.get("/footer");

//     console.log(
//       "GET FOOTER RESPONSE:",
//       response.data
//     );

//     return response.data?.data || null;
//   } catch (error) {
//     console.error(
//       "GET FOOTER ERROR:",
//       error
//     );

//     throw error;
//   }
// };


// /* =========================================================
//    UPDATE FOOTER
// ========================================================= */

// export const updateFooter = async (data) => {
//   try {
//     const response = await API.put(
//       "/footer",
//       data
//     );

//     console.log(
//       "UPDATE FOOTER RESPONSE:",
//       response.data
//     );

//     return response.data?.data || null;
//   } catch (error) {
//     console.error(
//       "UPDATE FOOTER ERROR:",
//       error
//     );

//     throw error;
//   }
// };


// export default {
//   getFooter,
//   updateFooter,
// };



import API from "./api";

let footerRequestPromise = null;

/* =========================================================
   GET FOOTER
========================================================= */

export const getFooter = async () => {
  if (footerRequestPromise) {
    return footerRequestPromise;
  }

  footerRequestPromise = (async () => {
    try {
      const response = await API.get("/footer");

      console.log("GET FOOTER RESPONSE:", response.data);

      return response.data?.data || null;
    } catch (error) {
      console.error(
        "GET FOOTER ERROR:",
        error?.response?.data || error.message
      );

      throw error;
    } finally {
      footerRequestPromise = null;
    }
  })();

  return footerRequestPromise;
};

/* =========================================================
   UPDATE FOOTER
========================================================= */

export const updateFooter = async (data) => {
  try {
    const response = await API.put("/footer", data);

    console.log("UPDATE FOOTER RESPONSE:", response.data);

    return response.data?.data || null;
  } catch (error) {
    console.error(
      "UPDATE FOOTER ERROR:",
      error?.response?.data || error.message
    );

    throw error;
  }
};

export default {
  getFooter,
  updateFooter,
};
