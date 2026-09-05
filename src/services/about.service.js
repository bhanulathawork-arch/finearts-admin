import API from "./api";


/* =========================================================
   GET ABOUT PAGE
========================================================= */

async function getAboutPage() {
  try {

    const response =
      await API.get("/about");


    console.log(
      "GET ABOUT PAGE RESPONSE:",
      response.data
    );


    return response.data?.data || null;

  } catch (error) {

    console.error(
      "GET ABOUT PAGE ERROR:",
      error
    );

    throw error;
  }
}


/* =========================================================
   UPDATE ABOUT PAGE
========================================================= */

async function updateAboutPage(data) {
  try {

    const response =
      await API.put(
        "/about",
        data
      );


    console.log(
      "UPDATE ABOUT PAGE RESPONSE:",
      response.data
    );


    return response.data;

  } catch (error) {

    console.error(
      "UPDATE ABOUT PAGE ERROR:",
      error
    );

    throw error;
  }
}


/* =========================================================
   NAMED EXPORTS
========================================================= */

export {
  getAboutPage,
  updateAboutPage,
};


/* =========================================================
   DEFAULT EXPORT
========================================================= */

export default {
  getAboutPage,
  updateAboutPage,
};