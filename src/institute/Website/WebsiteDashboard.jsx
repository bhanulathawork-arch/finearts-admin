
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Globe,
  Palette,
  Eye,
  Settings,
  ExternalLink,
  CheckCircle,
  Clock,
  AlertCircle,
  Copy,
  Link2,
} from "lucide-react";

import toast from "react-hot-toast";

import {
  getWebsiteData,
  getWebsiteStatus,
  setPreviewInstituteId,
} from "../../services/websiteService";

const getAssignedSubdomain = (website, status) => {
  const candidates = [
    website?.subdomain,
    website?.website?.subdomain,
    website?.data?.subdomain,
    website?.data?.website?.subdomain,
    status?.subdomain,
    status?.website?.subdomain,
    status?.data?.subdomain,
  ];
  const value = candidates.find((item) => typeof item === "string" && item.trim());
  return value ? value.trim().toLowerCase() : "";
};

const getInstituteWebsiteUrl = (subdomain, status) => {
  const publishedUrl = status?.publishedUrl || status?.published_url || status?.websiteUrl || status?.website_url;
  if (typeof publishedUrl === "string" && /^https?:\/\//i.test(publishedUrl) && !/yourdomain\.com/i.test(publishedUrl)) {
    return publishedUrl;
  }
  const rootDomain = String(
    import.meta.env.VITE_ROOT_DOMAIN || import.meta.env.VITE_PUBLIC_ROOT_DOMAIN || ""
  ).trim().toLowerCase().replace(/^https?:\/\//, "").replace(/^\*\./, "").replace(/^www\./, "").split("/")[0];
  return subdomain && rootDomain ? `https://${subdomain}.${rootDomain}` : "";
};

export default function WebsiteDashboard() {
  const navigate = useNavigate();

  const [website, setWebsite] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  /*
   * =========================================================
   * GET INSTITUTE ID
   * =========================================================
   *
   * Try all possible locations where the institute ID may exist.
   *
   * Priority:
   * 1. Website response
   * 2. Website nested object
   * 3. localStorage
   * 4. sessionStorage
   *
   * =========================================================
   */
const getCurrentInstituteId = () => {
  console.log("==========================================");
  console.log("GET CURRENT INSTITUTE ID");
  console.log("WEBSITE OBJECT:", website);

  const rawInstituteId =
    website?.instituteId ??
    website?.institute_id ??
    website?.institute?.id ??
    website?.institute?.instituteId ??
    website?.institute?.institute_id ??
    null;

  console.log(
    "RAW WEBSITE INSTITUTE ID:",
    rawInstituteId
  );

  const id = Number(rawInstituteId);

  console.log(
    "NORMALIZED INSTITUTE ID:",
    id
  );

  console.log("==========================================");

  if (!Number.isInteger(id) || id <= 0) {
    return null;
  }

  return String(id);
};

  /*
   * =========================================================
   * OPEN WEBSITE PREVIEW
   * =========================================================
   */
const handlePreview = () => {
  const instituteId = getCurrentInstituteId();

  console.log("==========================================");
  console.log("OPENING WEBSITE PREVIEW");
  console.log("Website:", website);
  console.log("Institute ID:", instituteId);
  console.log("==========================================");

  if (!instituteId) {
    console.error(
      "PREVIEW: Institute ID not available from website API response"
    );

    toast.error("Institute ID not found.");
    return;
  }

  const id = Number(instituteId);

  if (!Number.isInteger(id) || id <= 0) {
    toast.error("Invalid Institute ID.");
    return;
  }

  // ONLY preview-specific storage
  setPreviewInstituteId(String(id));

  localStorage.setItem(
    "previewInstituteId",
    String(id)
  );

  sessionStorage.setItem(
    "previewInstituteId",
    String(id)
  );

  console.log(
    "PREVIEW INSTITUTE ID SAVED:",
    id
  );

  navigate(
    "/institute/website/preview",
    {
      state: {
        instituteId: id,
        preview: true,
      },
    }
  );
};

  /*
   * =========================================================
   * LOAD WEBSITE
   * =========================================================
   */
  const loadWebsite = async () => {
    try {
      setLoading(true);

      const [
        websiteData,
        websiteStatus,
      ] = await Promise.all([
        getWebsiteData(),
        getWebsiteStatus(),
      ]);

      console.log(
        "WEBSITE DASHBOARD DATA:",
        websiteData
      );

      console.log(
        "WEBSITE DASHBOARD STATUS:",
        websiteStatus
      );

      setWebsite(websiteData);
      setStatus(websiteStatus);

      /*
       * =====================================================
       * AUTO-SAVE CURRENT INSTITUTE ID
       * =====================================================
       *
       * If the website API already returns the institute ID,
       * save it immediately.
       *
       * This means the Preview button will still work even
       * if the ID is not currently present in localStorage.
       * =====================================================
       */
      const instituteId =
        websiteData?.instituteId ||
        websiteData?.institute_id ||
        websiteData?.institute?.id ||
        websiteData?.institute?.instituteId ||
        websiteData?.institute?.institute_id ||
        websiteData?.website?.instituteId ||
        websiteData?.website?.institute_id ||
        websiteData?.website?.institute?.id ||
        websiteData?.website?.institute?.instituteId ||
        websiteData?.website?.institute?.institute_id ||
        websiteData?.data?.instituteId ||
        websiteData?.data?.institute_id ||
        websiteData?.data?.institute?.id;

      if (
        instituteId !== undefined &&
        instituteId !== null &&
        String(instituteId).trim() !== "" &&
        String(instituteId) !== "null" &&
        String(instituteId) !== "undefined"
      ) {
        console.log(
          "CURRENT WEBSITE INSTITUTE ID:",
          instituteId
        );

        /*
         * Save it so Preview can resolve it.
         */
        setPreviewInstituteId(instituteId);
      } else {
        console.warn(
          "WEBSITE RESPONSE DOES NOT CONTAIN INSTITUTE ID"
        );
      }
    } catch (error) {
      console.error(
        "Website dashboard error:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to load website"
      );
    } finally {
      setLoading(false);
    }
  };

  /*
   * =========================================================
   * INITIAL LOAD
   * =========================================================
   */
  useEffect(() => {
    loadWebsite();
  }, []);

  /*
   * =========================================================
   * LOADING
   * =========================================================
   */
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-400">
          Loading website...
        </div>
      </div>
    );
  }

  /*
   * =========================================================
   * WEBSITE STATUS
   * =========================================================
   */
  const websiteStatus =
    status?.status || "DRAFT";

  const isPublished =
    websiteStatus === "PUBLISHED";

  const assignedSubdomain = getAssignedSubdomain(website, status);
  const assignedWebsiteUrl = getInstituteWebsiteUrl(assignedSubdomain, status);
  const rootDomainConfigured = Boolean(
    import.meta.env.VITE_ROOT_DOMAIN || import.meta.env.VITE_PUBLIC_ROOT_DOMAIN
  );

  const copyWebsiteUrl = async () => {
    if (!assignedWebsiteUrl) return;
    try {
      await navigator.clipboard.writeText(assignedWebsiteUrl);
      toast.success("Website URL copied");
    } catch {
      toast.error("Could not copy URL. Please copy it manually.");
    }
  };

  /*
   * =========================================================
   * UI
   * =========================================================
   */
  return (
    <div className="space-y-6">

      {/* =================================================
          HEADER
      ================================================= */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>
          <h1 className="text-2xl font-bold text-white">
            Website
          </h1>

          <p className="text-gray-400 mt-1">
            Create and manage your institute website
          </p>
        </div>

        <div className="flex items-center gap-3">

          {isPublished &&
            status?.publishedUrl && (
              <a
                href={status.publishedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl border border-[#2c2c35] text-gray-300 hover:bg-[#1a1a20] flex items-center gap-2"
              >
                <ExternalLink size={17} />

                View Website
              </a>
            )}

        </div>
      </div>


      {/* =================================================
          STATUS CARD
      ================================================= */}
      <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-6">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

          <div className="flex items-center gap-4">

            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                isPublished
                  ? "bg-green-500/10"
                  : "bg-yellow-500/10"
              }`}
            >

              {isPublished ? (
                <CheckCircle
                  size={24}
                  className="text-green-400"
                />
              ) : (
                <Clock
                  size={24}
                  className="text-yellow-400"
                />
              )}

            </div>

            <div>

              <p className="text-sm text-gray-500">
                Website Status
              </p>

              <h2 className="text-lg font-semibold text-white">
                {isPublished
                  ? "Published"
                  : "Draft"}
              </h2>

            </div>

          </div>

          <div className="text-sm text-gray-400">

            {status?.visibleSectionCount || 0}

            {" / "}

            {status?.totalSectionCount || 0}

            {" sections enabled"}

          </div>

        </div>

      </div>


      {/* =================================================
          ASSIGNED INSTITUTE WEBSITE URL
      ================================================= */}
      <section className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-6">
        <div className="flex items-start gap-3">
          <div className="w-11 h-11 shrink-0 rounded-xl bg-purple-500/10 flex items-center justify-center">
            <Link2 size={22} className="text-purple-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-semibold text-white">My Institute Website URL</h2>
            <p className="text-sm text-gray-400 mt-1">
              Your main admin assigns this address. Share it with students once the website is published.
            </p>

            {assignedWebsiteUrl ? (
              <>
                <div className="mt-4 rounded-xl border border-[#34343f] bg-[#101014] px-4 py-3 break-all text-cyan-300">
                  {assignedWebsiteUrl}
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <button type="button" onClick={copyWebsiteUrl} className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white flex items-center gap-2">
                    <Copy size={16} /> Copy URL
                  </button>
                  <a href={assignedWebsiteUrl} target="_blank" rel="noopener noreferrer" className={`px-4 py-2 rounded-xl border border-[#34343f] text-gray-200 hover:bg-[#22222a] flex items-center gap-2 ${!isPublished ? "opacity-60" : ""}`}>
                    <ExternalLink size={16} /> Open Website
                  </a>
                  <span className={`text-sm ${isPublished ? "text-green-400" : "text-yellow-400"}`}>
                    {isPublished ? "Published" : "Not published yet"}
                  </span>
                </div>
                {!isPublished && <p className="text-xs text-yellow-400/80 mt-2">The URL is assigned, but visitors may not see the site until the website is published.</p>}
              </>
            ) : assignedSubdomain ? (
              <div className="mt-4 rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4 text-sm text-yellow-300">
                Subdomain assigned: <strong>{assignedSubdomain}</strong>. The production root domain is not configured. Please contact your platform administrator.
              </div>
            ) : (
              <div className="mt-4 rounded-xl border border-[#34343f] bg-[#101014] p-4 text-sm text-gray-300">
                {rootDomainConfigured
                  ? "No subdomain has been assigned to your institute yet. Please contact the main admin."
                  : "No public URL is available yet. The main admin must assign your subdomain and configure the platform's production root domain."}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =================================================
          WEBSITE SETUP
      ================================================= */}
      <div>

        <h2 className="text-lg font-semibold text-white mb-4">
          Website Setup
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">


          {/* =================================================
              SECTIONS
          ================================================= */}
          <a
            href="/institute/website/sections"
            className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-6 hover:border-purple-500/50 transition"
          >

            <div className="w-11 h-11 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">

              <Settings
                size={22}
                className="text-blue-400"
              />

            </div>

            <h3 className="text-white font-semibold">
              Sections
            </h3>

            <p className="text-gray-500 text-sm mt-2">
              Choose which sections should appear on your website.
            </p>

          </a>


          {/* =================================================
              CONTENT
          ================================================= */}
          <a
            href="/institute/website/content"
            className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-6 hover:border-purple-500/50 transition"
          >

            <div className="w-11 h-11 rounded-xl bg-pink-500/10 flex items-center justify-center mb-4">

              <Globe
                size={22}
                className="text-pink-400"
              />

            </div>

            <h3 className="text-white font-semibold">
              Content
            </h3>

            <p className="text-gray-500 text-sm mt-2">
              Manage your website text and section content.
            </p>

          </a>


          {/* =================================================
              BRANDING
          ================================================= */}
          <a
            href="/institute/website/branding"
            className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-6 hover:border-purple-500/50 transition"
          >

            <div className="w-11 h-11 rounded-xl bg-orange-500/10 flex items-center justify-center mb-4">

              <Palette
                size={22}
                className="text-orange-400"
              />

            </div>

            <h3 className="text-white font-semibold">
              Branding
            </h3>

            <p className="text-gray-500 text-sm mt-2">
              Customize logo, colors, fonts and website appearance.
            </p>

          </a>


          {/* =================================================
              PREVIEW
          ================================================= */}
          <button
            type="button"
            onClick={handlePreview}
            className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-6 hover:border-cyan-500/50 transition text-left w-full"
          >

            <div className="w-11 h-11 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-4">

              <Eye
                size={22}
                className="text-cyan-400"
              />

            </div>

            <h3 className="text-white font-semibold">
              Preview
            </h3>

            <p className="text-gray-500 text-sm mt-2">
              Preview your website before publishing.
            </p>

          </button>


          {/* =================================================
              PUBLISH
          ================================================= */}
          <a
            href="/institute/website/publish"
            className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-6 hover:border-purple-500/50 transition"
          >

            <div className="w-11 h-11 rounded-xl bg-green-500/10 flex items-center justify-center mb-4">

              {isPublished ? (
                <CheckCircle
                  size={22}
                  className="text-green-400"
                />
              ) : (
                <AlertCircle
                  size={22}
                  className="text-green-400"
                />
              )}

            </div>

            <h3 className="text-white font-semibold">
              Publish
            </h3>

            <p className="text-gray-500 text-sm mt-2">
              Publish or unpublish your institute website.
            </p>

          </a>

        </div>

      </div>


      {/* =================================================
          WEBSITE INFORMATION
      ================================================= */}
      {website?.website && (
        <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-6">

          <h2 className="text-lg font-semibold text-white mb-5">
            Website Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">


            {/* =================================================
                WEBSITE NAME
            ================================================= */}
            <div>

              <p className="text-xs text-gray-500">
                Website Name
              </p>

              <p className="text-white mt-1">
                {website.website.website_name ||
                  "-"}
              </p>

            </div>


            {/* =================================================
                TEMPLATE INFORMATION
            ================================================= */}
            <div>

              <p className="text-xs text-gray-500">
                Template
              </p>

              <p className="text-white mt-1">
                {website.website.template_name ||
                  "Not selected"}
              </p>

            </div>


            {/* =================================================
                SLUG
            ================================================= */}
            <div>

              <p className="text-xs text-gray-500">
                Slug
              </p>

              <p className="text-white mt-1">
                {website.website.slug ||
                  "-"}
              </p>

            </div>


            {/* =================================================
                STATUS
            ================================================= */}
            <div>

              <p className="text-xs text-gray-500">
                Status
              </p>

              <p
                className={`mt-1 font-medium ${
                  isPublished
                    ? "text-green-400"
                    : "text-yellow-400"
                }`}
              >
                {websiteStatus}
              </p>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}