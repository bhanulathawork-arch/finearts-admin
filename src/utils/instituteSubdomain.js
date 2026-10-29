/**
 * Resolve an institute subdomain from the current hostname.
 * Configure VITE_ROOT_DOMAIN to the purchased root domain, e.g. example.com.
 * Local development can use institute.localhost.
 */
export function getInstituteSubdomain(hostname = window.location.hostname) {
  const host = String(hostname || "").toLowerCase().split(":")[0].replace(/\.$/, "");
  if (!host) return "";

  // Convenient local test: kalaa.localhost
  if (host.endsWith(".localhost")) {
    const candidate = host.slice(0, -".localhost".length);
    return /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(candidate) ? candidate : "";
  }

  const configuredRoot = String(import.meta.env.VITE_ROOT_DOMAIN || "")
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .split("/")[0]
    .replace(/\.$/, "");

  if (!configuredRoot || host === configuredRoot || host === `www.${configuredRoot}`) return "";
  if (!host.endsWith(`.${configuredRoot}`)) return "";

  const candidate = host.slice(0, -(configuredRoot.length + 1));
  // Exactly one label is allowed before the root domain.
  if (candidate.includes(".")) return "";
  return /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(candidate) ? candidate : "";
}

export function isInstituteSubdomainHost(hostname = window.location.hostname) {
  return Boolean(getInstituteSubdomain(hostname));
}
