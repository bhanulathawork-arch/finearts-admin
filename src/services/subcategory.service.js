import API from "./api";

/* ─────────────────────────────
   GET ALL SUBCATEGORIES
───────────────────────────── */
export const getSubcategories = async () => {
  const res = await API.get("/subcategories");
  return res.data;
};

/* ─────────────────────────────
   GET SUBCATEGORY BY ID
───────────────────────────── */
export const getSubcategoryById = async (id) => {
  const res = await API.get(`/subcategories/${id}`);
  return res.data;
};

/* ─────────────────────────────
   CREATE SUBCATEGORY
───────────────────────────── */
export const createSubcategory = async (data) => {
  const res = await API.post("/subcategories", data);
  return res.data;
};

/* ─────────────────────────────
   UPDATE SUBCATEGORY
───────────────────────────── */
export const updateSubcategory = async (id, data) => {
  const res = await API.put(`/subcategories/${id}`, data);
  return res.data;
};

/* ─────────────────────────────
   DELETE SUBCATEGORY
───────────────────────────── */
export const deleteSubcategory = async (id) => {
  const res = await API.delete(`/subcategories/${id}`);
  return res.data;
};