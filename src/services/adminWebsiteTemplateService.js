import API from "./api";

export const getAdminWebsiteTemplates = async () => {
  const res = await API.get("/website-templates");
  return res.data.data;
};

export const getAdminWebsiteTemplate = async (id) => {
  const res = await API.get(`/website-templates/${id}`);
  return res.data.data;
};

export const uploadTemplatePreview = async (file) => {
  const formData = new FormData();

  formData.append("preview_image", file);

  const res = await API.post(
    "/website-templates/upload-preview",
    formData
  );

  return res.data.data;
};

export const createAdminWebsiteTemplate = async (data) => {
  const res = await API.post(
    "/website-templates",
    data
  );

  return res.data.data;
};

export const updateAdminWebsiteTemplate = async (id, data) => {
  const res = await API.put(
    `/website-templates/${id}`,
    data
  );

  return res.data.data;
};

export const toggleAdminWebsiteTemplateStatus = async (id) => {
  const res = await API.patch(
    `/website-templates/${id}/status`
  );

  return res.data.data;
};

export const deleteAdminWebsiteTemplate = async (id) => {
  const res = await API.delete(
    `/website-templates/${id}`
  );

  return res.data;
};