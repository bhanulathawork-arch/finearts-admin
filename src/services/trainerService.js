
import API from "./api";

/* =========================================================
   ADMIN TRAINERS
========================================================= */

// GET ALL TRAINERS
export const getAdminTrainers = (token) =>
  API.get("/trainers/admin/all", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

// CREATE TRAINER
export const createAdminTrainer = (data, token) =>
  API.post("/trainers/admin-create", data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

// UPDATE TRAINER
export const updateAdminTrainer = (id, data, token) =>
  API.put(`/trainers/admin-update/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

// DELETE TRAINER
export const deleteAdminTrainer = (id, token) =>
  API.delete(`/trainers/admin/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });


/* =========================================================
   LOGGED-IN TRAINER PROFILE
========================================================= */

// GET LOGGED-IN TRAINER PROFILE
export const getProfile = (token) =>
  API.get("/trainers/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });


// UPDATE LOGGED-IN TRAINER PROFILE
export const updateTrainerProfile = (data, token) =>
  API.put("/trainers/me", data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });


// UPDATE TRAINER QR
export const updateTrainerQR = (data, token) =>
  API.put("/trainers/update-qr", data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });


/* =========================================================
   PENDING / REJECTED TRAINERS
========================================================= */

// GET PENDING TRAINERS
export const getPendingTrainers = (token) =>
  API.get("/trainers/admin/pending", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

// GET REJECTED TRAINERS
export const getRejectedTrainers = (token) =>
  API.get("/trainers/admin/rejected", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });


/* =========================================================
   APPROVE / REJECT
========================================================= */

// APPROVE TRAINER
export const approveTrainer = (id, token) =>
  API.patch(
    `/trainers/admin/approve/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

// REJECT TRAINER
export const rejectTrainer = (id, reason, token) =>
  API.patch(
    `/trainers/admin/reject/${id}`,
    { reason },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

// UPDATE TRAINER APPROVAL STATUS
export const updateTrainerApproval = (trainerId, status, token) => {
  if (status === "APPROVED") {
    return approveTrainer(trainerId, token);
  }

  return rejectTrainer(trainerId, "", token);
};


/* =========================================================
   DROPDOWNS
========================================================= */

// GET CATEGORIES
export const getCategories = () =>
  API.get("/categories");

// GET SUBCATEGORIES
export const getSubcategories = () =>
  API.get("/subcategories");

// GET INSTITUTES
export const getInstitutes = () =>
  API.get("/institutes");


/* =========================================================
   TRAINER DETAILS
========================================================= */

// GET TRAINER BY ID
export const getTrainerById = async (trainerId) => {
  const response = await API.get(
    `/trainers/${trainerId}`
  );

  return response.data;
};

// GET TRAINER CLASSES
export const getTrainerClasses = async (trainerId) => {
  const response = await API.get(
    `/trainers/${trainerId}/classes`
  );

  return response.data;
};


/* =========================================================
   TRAINER STUDENTS
========================================================= */

// GET LOGGED-IN TRAINER STUDENTS
export const getTrainerStudents = (token) =>
  API.get("/trainers/students", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });


/* =========================================================
   TRAINER SPECIALIZATIONS
========================================================= */

// GET MY SPECIALIZATIONS
export const getMyTrainerSpecializations = (token) =>
  API.get("/trainers/my-specializations", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });