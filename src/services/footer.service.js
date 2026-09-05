import API from "./api";

/* =========================================================
   GET FOOTER
========================================================= */

export const getFooter = async () => {
  try {
    const response = await API.get("/footer");

    console.log(
      "GET FOOTER RESPONSE:",
      response.data
    );

    return response.data?.data || null;
  } catch (error) {
    console.error(
      "GET FOOTER ERROR:",
      error
    );

    throw error;
  }
};


/* =========================================================
   UPDATE FOOTER
========================================================= */

export const updateFooter = async (data) => {
  try {
    const response = await API.put(
      "/footer",
      data
    );

    console.log(
      "UPDATE FOOTER RESPONSE:",
      response.data
    );

    return response.data?.data || null;
  } catch (error) {
    console.error(
      "UPDATE FOOTER ERROR:",
      error
    );

    throw error;
  }
};


export default {
  getFooter,
  updateFooter,
};