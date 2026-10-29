

import API from "./api";

/**
 * Main-admin domain management API.
 * The shared API interceptor handles admin authentication.
 */
export const getAdminWebsiteDomains = async () => {
  const response = await API.get("/websites/admin/domains");
  return response.data;
};

export const checkAdminSubdomain = async (subdomain, instituteId) => {
  const response = await API.get("/websites/admin/domains/check", {
    params: { subdomain, instituteId },
  });
  return response.data;
};

export const assignAdminSubdomain = async (instituteId, subdomain) => {
  const response = await API.put(
    `/websites/admin/domains/${encodeURIComponent(instituteId)}`,
    { subdomain }
  );
  return response.data;
};
