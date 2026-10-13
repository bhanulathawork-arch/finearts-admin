

import api from "./api";

/* ===========================
   Classes
=========================== */

export const getClasses = async (params = {}) => {
  const res = await api.get("/classes", { params });
  return res.data;
};

export const getClassById = async (id) => {
  const res = await api.get(`/classes/${id}`);
  return res.data;
};

export const createClass = async (payload) => {
  const res = await api.post("/classes", payload);
  return res.data;
};

export const updateClass = async (id, payload) => {
  const res = await api.put(`/classes/${id}`, payload);
  return res.data;
};

export const deleteClass = async (id) => {
  const res = await api.delete(`/classes/${id}`);
  return res.data;
};

export const getClassDays = async (classId) => {
  const res = await api.get(`/classes/${classId}/days`);
  return res.data;
};