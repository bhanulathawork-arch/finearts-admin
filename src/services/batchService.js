import API from "./api";

/* =========================================================
   BATCHES
========================================================= */

export const getInstituteBatches = async () => {
  const res = await API.get("/batches/institute");

  return res.data.data || [];
};


export const createBatch = async (data) => {
  const res = await API.post(
    "/batches/institute-create",
    data
  );

  return res.data;
};


export const getBatchById = async (id) => {
  const res = await API.get(
    `/batches/institute/${id}`
  );

  return res.data;
};


export const updateBatch = async (id, data) => {
  const res = await API.put(
    `/batches/institute-update/${id}`,
    data
  );

  return res.data;
};


export const deleteBatch = async (id) => {
  const res = await API.delete(
    `/batches/institute-delete/${id}`
  );

  return res.data;
};


/* =========================================================
   BATCH STUDENTS
========================================================= */

export const getBatchStudents = async (batchId) => {
  const res = await API.get(
    `/batches/${batchId}/students`
  );

  /*
    Backend may return:

    {
      success: true,
      data: [...]
    }

    OR:

    {
      success: true,
      students: [...]
    }

    OR directly:

    [...]
  */

  if (Array.isArray(res.data)) {
    return res.data;
  }

  if (Array.isArray(res.data?.students)) {
    return res.data.students;
  }

  if (Array.isArray(res.data?.data)) {
    return res.data.data;
  }

  return [];
};


/* =========================================================
   ASSIGN STUDENT TO BATCH
========================================================= */

export const assignStudentToBatch = async (
  batchId,
  studentId
) => {
  const res = await API.post(
    `/batches/${batchId}/assign-student`,
    {
      studentId,
    }
  );

  return res.data;
};


/* =========================================================
   PAYMENTS
========================================================= */

export const collectPayment = async (data) => {
  const res = await API.post(
    "/payments/collect",
    data
  );

  return res.data;
};


export const removeStudentFromBatch = async (
  batchId,
  studentId
) => {
  const res = await API.delete(
    `/batches/${batchId}/students/${studentId}`
  );

  return res.data;
};

export const changeStudentBatch = async (
  batchId,
  studentId,
  newBatchId
) => {
  const res = await API.put(
    `/batches/${batchId}/students/${studentId}`,
    {
      newBatchId,
    }
  );

  return res.data;
};