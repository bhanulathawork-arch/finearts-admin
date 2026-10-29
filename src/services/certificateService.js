

import API from "./api";

// Certificate requests
export const getCertificateRequests = async () =>
  (await API.get("/certificates/requests")).data;

export const getIssuedCertificates = async () =>
  (await API.get("/certificates/issued")).data;

export const submitCertificateRequest = async (payload) =>
  (await API.post("/certificates/requests", payload)).data;

export const reviewCertificateRequest = async (id, payload) =>
  (await API.patch(`/certificates/requests/${id}/review`, payload)).data;

export const issueCertificate = async (request_id) =>
  (await API.post("/certificates/issue", { request_id })).data;

// Admin certificate APIs
export const getAdminCertificateStats = async () =>
  (await API.get("/certificates/admin/stats")).data;

export const getAdminCertificateRequests = async () =>
  (await API.get("/certificates/admin/requests")).data;

export const getAdminIssuedCertificates = async () =>
  (await API.get("/certificates/admin/issued")).data;

export const createCertificateTemplate = async (payload) =>
  (await API.post("/certificates/admin/templates", payload)).data;

// Student dropdown: existing user API
export const getCertificateStudents = async () =>
  (await API.get("/users/admin/certificate-users")).data;

// Class dropdown: existing classes API
export const getCertificateClasses = async () =>
  (await API.get("/classes")).data;
