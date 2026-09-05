
// import api from "./api";

// /* =====================================================
//    FIREBASE INSTITUTE FLOW
// ===================================================== */

// /* LOGIN */
// export const instituteLogin = async (firebaseToken) => {
//   const res = await api.post(
//     "/institutes/login",
//     {},
//     {
//       headers: {
//         Authorization: `Bearer ${firebaseToken}`,
//       },
//     }
//   );

//   return res.data;
// };

// /* CREATE INSTITUTE */
// export const createInstitute = async (formData) => {
//   const res = await api.post(
//     "/institutes/create-test",
//     formData,
//     {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     }
//   );

//   return res.data;
// };

// /* COMPLETE PROFILE */
// export const completeInstituteProfile = async (
//   formData,
//   firebaseToken
// ) => {
//   const res = await api.post(
//     "/institutes/create-profile",
//     formData,
//     {
//       headers: {
//         Authorization: `Bearer ${firebaseToken}`,
//       },
//     }
//   );

//   return res.data;
// };

// /* GET PROFILE */
// export const getInstituteProfile = async (
//   firebaseToken
// ) => {
//   const res = await api.get(
//     "/institutes/profile",
//     {
//       headers: {
//         Authorization: `Bearer ${firebaseToken}`,
//       },
//     }
//   );

//   return res.data;
// };

// /* REQUEST APPROVAL */
// export const requestApproval = async (
//   firebaseToken
// ) => {
//   const res = await api.post(
//     "/institutes/request-approval",
//     {},
//     {
//       headers: {
//         Authorization: `Bearer ${firebaseToken}`,
//       },
//     }
//   );

//   return res.data;
// };

// /* =====================================================
//    ADMIN FLOW
// ===================================================== */

// /* CREATE */
// export const adminCreateInstitute = async (
//   formData,
//   adminToken
// ) => {
//   const res = await api.post(
//     "/institutes/admin/create",
//     formData,
//     {
//       headers: {
//         Authorization: `Bearer ${adminToken}`,
//         "Content-Type": "multipart/form-data",
//       },
//     }
//   );

//   return res.data;
// };

// /* UPDATE */
// export const updateInstitute = async (
//   id,
//   formData,
//   adminToken
// ) => {
//   const res = await api.put(
//     `/institutes/${id}`,
//     formData,
//     {
//       headers: {
//         Authorization: `Bearer ${adminToken}`,
//         "Content-Type": "multipart/form-data",
//       },
//     }
//   );

//   return res.data;
// };

// /* DELETE */
// export const deleteInstitute = async (
//   id,
//   adminToken
// ) => {
//   const res = await api.delete(
//     `/institutes/${id}`,
//     {
//       headers: {
//         Authorization: `Bearer ${adminToken}`,
//       },
//     }
//   );

//   return res.data;
// };

// /* APPROVE */
// export const approveInstitute = async (
//   id,
//   adminToken
// ) => {
//   const res = await api.patch(
//     `/institutes/admin/${id}/approve`,
//     {},
//     {
//       headers: {
//         Authorization: `Bearer ${adminToken}`,
//       },
//     }
//   );

//   return res.data;
// };

// /* REJECT */
// export const rejectInstitute = async (
//   id,
//   adminToken
// ) => {
//   const res = await api.patch(
//     `/institutes/admin/${id}/reject`,
//     {},
//     {
//       headers: {
//         Authorization: `Bearer ${adminToken}`,
//       },
//     }
//   );

//   return res.data;
// };

// /* COMPATIBILITY FUNCTION */
// export const updateInstituteApproval = async (
//   id,
//   status,
//   adminToken
// ) => {
//   const endpoint =
//     status === "APPROVED"
//       ? `/institutes/admin/${id}/approve`
//       : `/institutes/admin/${id}/reject`;

//   const res = await api.patch(
//     endpoint,
//     {},
//     {
//       headers: {
//         Authorization: `Bearer ${adminToken}`,
//       },
//     }
//   );

//   return res.data;
// };

// /* PENDING */
// export const getPendingInstitutes = async (
//   adminToken
// ) => {
//   const res = await api.get(
//     "/institutes/admin/pending",
//     {
//       headers: {
//         Authorization: `Bearer ${adminToken}`,
//       },
//     }
//   );

//   return res.data;
// };

// /* APPROVED */
// export const getApprovedInstitutes = async (
//   adminToken
// ) => {
//   const res = await api.get(
//     "/institutes/admin/approved",
//     {
//       headers: {
//         Authorization: `Bearer ${adminToken}`,
//       },
//     }
//   );

//   return res.data;
// };

// /* REJECTED */
// export const getRejectedInstitutes = async (
//   adminToken
// ) => {
//   const res = await api.get(
//     "/institutes/admin/rejected",
//     {
//       headers: {
//         Authorization: `Bearer ${adminToken}`,
//       },
//     }
//   );

//   return res.data;
// };

// /* =====================================================
//    COMMON
// ===================================================== */

// export const getAllInstitutes = async (
//   params = {}
// ) => {
//   const res = await api.get(
//     "/institutes",
//     {
//       params,
//     }
//   );

//   return res.data;
// };

// export const getInstituteById = async (
//   id
// ) => {
//   const res = await api.get(
//     `/institutes/${id}`
//   );

//   return res.data;
// };


// /* =====================================================
//    DASHBOARD
// ===================================================== */

// export const getDashboard = async (
//   token
// ) => {
//   const res = await api.get(
//     "/institutes/dashboard",
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );

//   return res.data;
// };

// /* =====================================================
//    PROFILE
// ===================================================== */

// export const getProfile = async (
//   token
// ) => {
//   const res = await api.get(
//     "/institutes/profile",
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );

//   return res.data;
// };

// /* =====================================================
//    STUDENTS
// ===================================================== */

// export const getStudents = async (
//   token
// ) => {
//   const res = await api.get(
//     "/institutes/students",
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );

//   return res.data;
// };

// /* =====================================================
//    BOOKINGS
// ===================================================== */

// export const getBookings = async (
//   token
// ) => {
//   const res = await api.get(
//     "/institutes/bookings",
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );

//   return res.data;
// };


// /* =====================================================
//    INSTITUTE TRAINERS
// ===================================================== */

// export const getInstituteTrainers = async (
//   token
// ) => {
//   const res = await api.get(
//     "/trainers/institute",
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );

//   return res.data;
// };

// export const createInstituteTrainer = async (
//   formData,
//   token
// ) => {
//   const res = await api.post(
//     "/trainers/institute-create",
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

// export const updateInstituteTrainer = async (
//   id,
//   formData,
//   token
// ) => {
//   const res = await api.put(
//     `/trainers/institute-update/${id}`,
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

// export const deleteInstituteTrainer = async (
//   id,
//   token
// ) => {
//   const res = await api.delete(
//     `/trainers/institute-delete/${id}`,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );

//   return res.data;
// };

// export const getPendingTrainers = async (
//   token
// ) => {
//   const res = await api.get(
//     "/trainers/institute/pending",
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );

//   return res.data.data || [];
// };

// export const getRejectedTrainers = async (
//   token
// ) => {
//   const res = await api.get(
//     "/trainers/institute/rejected",
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );

//   return res.data;
// };

// export const approveTrainer = async (
//   id,
//   token
// ) => {
//   const res = await api.patch(
//     `/trainers/institute-approve/${id}`,
//     {},
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );

//   return res.data;
// };

// export const rejectTrainer = async (
//   id,
//   token
// ) => {
//   const res = await api.patch(
//     `/trainers/institute-reject/${id}`,
//     {},
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );

//   return res.data;
// };



// /* =====================================================
//    UPDATE INSTITUTE PROFILE
// ===================================================== */

// export const updateInstituteProfile = async (
//   formData,
//   token
// ) => {
//   const res = await api.put(
//     "/institutes/profile",
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



import api from "./api";

/* =====================================================
   FIREBASE INSTITUTE FLOW
===================================================== */

/* -----------------------------------------------------
   LOGIN
----------------------------------------------------- */

export const instituteLogin = async (firebaseToken) => {
  const res = await api.post(
    "/institutes/login",
    {},
    {
      headers: {
        Authorization: `Bearer ${firebaseToken}`,
      },
    }
  );

  return res.data;
};

/* -----------------------------------------------------
   CREATE INSTITUTE
----------------------------------------------------- */

export const createInstitute = async (formData) => {
  const res = await api.post(
    "/institutes/create-test",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
};

/* -----------------------------------------------------
   COMPLETE PROFILE
----------------------------------------------------- */

export const completeInstituteProfile = async (
  formData,
  firebaseToken
) => {
  const res = await api.post(
    "/institutes/create-profile",
    formData,
    {
      headers: {
        Authorization: `Bearer ${firebaseToken}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
};

/* -----------------------------------------------------
   GET PROFILE
----------------------------------------------------- */

export const getInstituteProfile = async (
  firebaseToken
) => {
  const res = await api.get(
    "/institutes/profile",
    {
      headers: {
        Authorization: `Bearer ${firebaseToken}`,
      },
    }
  );

  return res.data;
};

/* -----------------------------------------------------
   REQUEST APPROVAL
----------------------------------------------------- */

export const requestApproval = async (
  firebaseToken
) => {
  const res = await api.post(
    "/institutes/request-approval",
    {},
    {
      headers: {
        Authorization: `Bearer ${firebaseToken}`,
      },
    }
  );

  return res.data;
};

/* =====================================================
   ADMIN INSTITUTE FLOW
===================================================== */

/* -----------------------------------------------------
   ADMIN CREATE
----------------------------------------------------- */

export const adminCreateInstitute = async (
  formData,
  adminToken
) => {
  const res = await api.post(
    "/institutes/admin/create",
    formData,
    {
      headers: {
        Authorization: `Bearer ${adminToken}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
};

/* -----------------------------------------------------
   ADMIN UPDATE
----------------------------------------------------- */

export const updateInstitute = async (
  id,
  formData,
  adminToken
) => {
  if (!id) {
    throw new Error("Institute ID is required");
  }

  const res = await api.put(
    `/institutes/${id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${adminToken}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
};

/* -----------------------------------------------------
   ADMIN DELETE
----------------------------------------------------- */

export const deleteInstitute = async (
  id,
  adminToken
) => {
  if (!id) {
    throw new Error("Institute ID is required");
  }

  const res = await api.delete(
    `/institutes/${id}`,
    {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    }
  );

  return res.data;
};

/* -----------------------------------------------------
   APPROVE
----------------------------------------------------- */

export const approveInstitute = async (
  id,
  adminToken
) => {
  const res = await api.patch(
    `/institutes/admin/${id}/approve`,
    {},
    {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    }
  );

  return res.data;
};

/* -----------------------------------------------------
   REJECT
----------------------------------------------------- */

export const rejectInstitute = async (
  id,
  adminToken
) => {
  const res = await api.patch(
    `/institutes/admin/${id}/reject`,
    {},
    {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    }
  );

  return res.data;
};

/* -----------------------------------------------------
   APPROVAL COMPATIBILITY FUNCTION
----------------------------------------------------- */

export const updateInstituteApproval = async (
  id,
  status,
  adminToken
) => {
  const normalizedStatus =
    String(status || "").toUpperCase();

  let endpoint;

  if (normalizedStatus === "APPROVED") {
    endpoint = `/institutes/admin/${id}/approve`;
  } else if (normalizedStatus === "REJECTED") {
    endpoint = `/institutes/admin/${id}/reject`;
  } else {
    throw new Error(
      "Invalid institute approval status"
    );
  }

  const res = await api.patch(
    endpoint,
    {},
    {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    }
  );

  return res.data;
};

/* =====================================================
   ADMIN INSTITUTE LISTS
===================================================== */

/* -----------------------------------------------------
   ALL
----------------------------------------------------- */

export const getAllInstitutes = async (
  adminToken
) => {
  const res = await api.get(
    "/institutes/admin/all",
    {
      headers: {
        Authorization: `Bearer ${
          adminToken ||
          localStorage.getItem("adminToken")
        }`,
      },
    }
  );

  return res.data;
};

/* -----------------------------------------------------
   PENDING
----------------------------------------------------- */

export const getPendingInstitutes = async (
  adminToken
) => {
  const res = await api.get(
    "/institutes/admin/pending",
    {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    }
  );

  return res.data;
};

/* -----------------------------------------------------
   APPROVED
----------------------------------------------------- */

export const getApprovedInstitutes = async (
  adminToken
) => {
  const res = await api.get(
    "/institutes/admin/approved",
    {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    }
  );

  return res.data;
};

/* -----------------------------------------------------
   REJECTED
----------------------------------------------------- */

export const getRejectedInstitutes = async (
  adminToken
) => {
  const res = await api.get(
    "/institutes/admin/rejected",
    {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    }
  );

  return res.data;
};

/* =====================================================
   PUBLIC / COMMON
===================================================== */

/* -----------------------------------------------------
   PUBLIC INSTITUTES
----------------------------------------------------- */

export const getPublicInstitutes = async (
  params = {}
) => {
  const res = await api.get(
    "/institutes",
    {
      params,
    }
  );

  return res.data;
};

/* -----------------------------------------------------
   INSTITUTE BY ID
----------------------------------------------------- */

export const getInstituteById = async (
  id
) => {
  if (!id) {
    throw new Error("Institute ID is required");
  }

  const res = await api.get(
    `/institutes/${id}`
  );

  return res.data;
};

/* =====================================================
   DASHBOARD
===================================================== */

export const getDashboard = async (
  token
) => {
  const res = await api.get(
    "/institutes/dashboard",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

/* =====================================================
   INSTITUTE PROFILE
===================================================== */

export const getProfile = async (
  token
) => {
  const res = await api.get(
    "/institutes/profile",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

/* =====================================================
   STUDENTS
===================================================== */

export const getStudents = async (
  token
) => {
  const res = await api.get(
    "/institutes/students",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

/* =====================================================
   BOOKINGS
===================================================== */

export const getBookings = async (
  token
) => {
  const res = await api.get(
    "/institutes/bookings",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

/* =====================================================
   INSTITUTE TRAINERS
===================================================== */

/* -----------------------------------------------------
   GET TRAINERS
----------------------------------------------------- */

export const getInstituteTrainers = async (
  token
) => {
  const res = await api.get(
    "/trainers/institute",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

/* -----------------------------------------------------
   CREATE TRAINER
----------------------------------------------------- */

export const createInstituteTrainer = async (
  formData,
  token
) => {
  const res = await api.post(
    "/trainers/institute-create",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
};

/* -----------------------------------------------------
   UPDATE TRAINER
----------------------------------------------------- */

export const updateInstituteTrainer = async (
  id,
  formData,
  token
) => {
  const res = await api.put(
    `/trainers/institute-update/${id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
};

/* -----------------------------------------------------
   DELETE TRAINER
----------------------------------------------------- */

export const deleteInstituteTrainer = async (
  id,
  token
) => {
  const res = await api.delete(
    `/trainers/institute-delete/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

/* -----------------------------------------------------
   PENDING TRAINERS
----------------------------------------------------- */

export const getPendingTrainers = async (
  token
) => {
  const res = await api.get(
    "/trainers/institute/pending",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data.data || [];
};

/* -----------------------------------------------------
   REJECTED TRAINERS
----------------------------------------------------- */

export const getRejectedTrainers = async (
  token
) => {
  const res = await api.get(
    "/trainers/institute/rejected",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

/* -----------------------------------------------------
   APPROVE TRAINER
----------------------------------------------------- */

export const approveTrainer = async (
  id,
  token
) => {
  const res = await api.patch(
    `/trainers/institute-approve/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

/* -----------------------------------------------------
   REJECT TRAINER
----------------------------------------------------- */

export const rejectTrainer = async (
  id,
  token
) => {
  const res = await api.patch(
    `/trainers/institute-reject/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

/* =====================================================
   UPDATE INSTITUTE PROFILE
===================================================== */

export const updateInstituteProfile = async (
  formData,
  token
) => {
  const res = await api.put(
    "/institutes/profile",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
};