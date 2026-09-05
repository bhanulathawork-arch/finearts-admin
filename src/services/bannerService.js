// import api from "./api";

// /* ===========================
//    GET ALL BANNERS
// =========================== */

// export const getAllBanners = () => {
//   return api.get("/banners");
// };

// /* ===========================
//    GET BANNER BY ID
// =========================== */

// export const getBannerById = (id) => {
//   return api.get(`/banners/${id}`);
// };

// /* ===========================
//    GET BANNERS BY TYPE
// =========================== */

// export const getBannersByType = (type) => {
//   return api.get(`/banners/type/${type}`);
// };

// /* ===========================
//    CREATE BANNER
// =========================== */

// export const createBanner = (formData) => {
//   return api.post("/banners", formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });
// };

// /* ===========================
//    UPDATE BANNER
// =========================== */

// export const updateBanner = (id, formData) => {
//   return api.put(`/banners/${id}`, formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });
// };

// /* ===========================
//    DELETE BANNER
// =========================== */

// export const deleteBanner = (id) => {
//   return api.delete(`/banners/${id}`);
// };


import api from "./api";

/* =========================================================
   ADMIN PANEL
========================================================= */

/* ===========================
   GET ALL BANNERS
=========================== */

export const getAllBanners = () => {
  return api.get("/banners");
};


/* ===========================
   GET BANNER BY ID
=========================== */

export const getBannerById = (id) => {
  return api.get(`/banners/${id}`);
};


/* ===========================
   GET BANNERS BY TYPE
=========================== */

export const getBannersByType = (
  type
) => {
  return api.get(
    `/banners/type/${type}`
  );
};


/* ===========================
   CREATE BANNER
=========================== */

export const createBanner = (
  formData
) => {
  return api.post(
    "/banners",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );
};


/* ===========================
   UPDATE BANNER
=========================== */

export const updateBanner = (
  id,
  formData
) => {
  return api.put(
    `/banners/${id}`,
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );
};


/* ===========================
   DELETE BANNER
=========================== */

export const deleteBanner = (
  id
) => {
  return api.delete(
    `/banners/${id}`
  );
};


/* =========================================================
   INSTITUTE PANEL
========================================================= */

/* ===========================
   GET INSTITUTE BANNERS
=========================== */

export const getInstituteBanners =
  () => {
    return api.get(
      "/banners/institute"
    );
  };


/* ===========================
   CREATE INSTITUTE BANNER
=========================== */

export const createInstituteBanner =
  (formData) => {
    return api.post(
      "/banners/institute",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );
  };


/* ===========================
   UPDATE INSTITUTE BANNER
=========================== */

export const updateInstituteBanner =
  (
    id,
    formData
  ) => {
    return api.put(
      `/banners/institute/${id}`,
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );
  };


/* ===========================
   DELETE INSTITUTE BANNER
=========================== */

export const deleteInstituteBanner =
  (id) => {
    return api.delete(
      `/banners/institute/${id}`
    );
  };