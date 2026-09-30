


// import { useEffect, useState } from "react";
// import {
//   Globe,
//   Palette,
//   Eye,
//   Settings,
//   ExternalLink,
//   CheckCircle,
//   Clock,
//   AlertCircle,
// } from "lucide-react";

// import toast from "react-hot-toast";

// import {
//   getWebsiteData,
//   getWebsiteStatus,
// } from "../../services/websiteService";

// export default function WebsiteDashboard() {
//   const [website, setWebsite] = useState(null);
//   const [status, setStatus] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const loadWebsite = async () => {
//     try {
//       setLoading(true);

//       const [websiteData, websiteStatus] =
//         await Promise.all([
//           getWebsiteData(),
//           getWebsiteStatus(),
//         ]);

//       setWebsite(websiteData);
//       setStatus(websiteStatus);
//     } catch (error) {
//       console.error(
//         "Website dashboard error:",
//         error
//       );

//       toast.error(
//         error?.response?.data?.message ||
//           "Failed to load website"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadWebsite();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px]">
//         <div className="text-gray-400">
//           Loading website...
//         </div>
//       </div>
//     );
//   }

//   const websiteStatus =
//     status?.status || "DRAFT";

//   const isPublished =
//     websiteStatus === "PUBLISHED";

//   return (
//     <div className="space-y-6">

//       {/* =================================================
//           HEADER
//       ================================================= */}

//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

//         <div>
//           <h1 className="text-2xl font-bold text-white">
//             Website
//           </h1>

//           <p className="text-gray-400 mt-1">
//             Create and manage your institute website
//           </p>
//         </div>

//         <div className="flex items-center gap-3">

//           {isPublished &&
//             status?.publishedUrl && (
//               <a
//                 href={status.publishedUrl}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="px-4 py-2.5 rounded-xl border border-[#2c2c35] text-gray-300 hover:bg-[#1a1a20] flex items-center gap-2"
//               >
//                 <ExternalLink size={17} />
//                 View Website
//               </a>
//             )}

//         </div>

//       </div>


//       {/* =================================================
//           STATUS CARD
//       ================================================= */}

//       <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-6">

//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

//           <div className="flex items-center gap-4">

//             <div
//               className={`w-12 h-12 rounded-xl flex items-center justify-center ${
//                 isPublished
//                   ? "bg-green-500/10"
//                   : "bg-yellow-500/10"
//               }`}
//             >

//               {isPublished ? (
//                 <CheckCircle
//                   size={24}
//                   className="text-green-400"
//                 />
//               ) : (
//                 <Clock
//                   size={24}
//                   className="text-yellow-400"
//                 />
//               )}

//             </div>

//             <div>

//               <p className="text-sm text-gray-500">
//                 Website Status
//               </p>

//               <h2 className="text-lg font-semibold text-white">
//                 {isPublished
//                   ? "Published"
//                   : "Draft"}
//               </h2>

//             </div>

//           </div>

//           <div className="text-sm text-gray-400">

//             {status?.visibleSectionCount || 0}
//             {" / "}
//             {status?.totalSectionCount || 0}
//             {" sections enabled"}

//           </div>

//         </div>

//       </div>


//       {/* =================================================
//           WEBSITE SETUP
//       ================================================= */}

//       <div>

//         <h2 className="text-lg font-semibold text-white mb-4">
//           Website Setup
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">


//           {/* =================================================
//               SECTIONS
//           ================================================= */}

//           <a
//             href="/institute/website/sections"
//             className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-6 hover:border-purple-500/50 transition"
//           >

//             <div className="w-11 h-11 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">

//               <Settings
//                 size={22}
//                 className="text-blue-400"
//               />

//             </div>

//             <h3 className="text-white font-semibold">
//               Sections
//             </h3>

//             <p className="text-gray-500 text-sm mt-2">
//               Choose which sections should appear on your website.
//             </p>

//           </a>


//           {/* =================================================
//               CONTENT
//           ================================================= */}

//           <a
//             href="/institute/website/content"
//             className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-6 hover:border-purple-500/50 transition"
//           >

//             <div className="w-11 h-11 rounded-xl bg-pink-500/10 flex items-center justify-center mb-4">

//               <Globe
//                 size={22}
//                 className="text-pink-400"
//               />

//             </div>

//             <h3 className="text-white font-semibold">
//               Content
//             </h3>

//             <p className="text-gray-500 text-sm mt-2">
//               Manage your website text and section content.
//             </p>

//           </a>


//           {/* =================================================
//               BRANDING
//           ================================================= */}

//           <a
//             href="/institute/website/branding"
//             className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-6 hover:border-purple-500/50 transition"
//           >

//             <div className="w-11 h-11 rounded-xl bg-orange-500/10 flex items-center justify-center mb-4">

//               <Palette
//                 size={22}
//                 className="text-orange-400"
//               />

//             </div>

//             <h3 className="text-white font-semibold">
//               Branding
//             </h3>

//             <p className="text-gray-500 text-sm mt-2">
//               Customize logo, colors, fonts and website appearance.
//             </p>

//           </a>


//           {/* =================================================
//               PREVIEW
//           ================================================= */}

//           <a
//             href="/institute/website/preview"
//             className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-6 hover:border-purple-500/50 transition"
//           >

//             <div className="w-11 h-11 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-4">

//               <Eye
//                 size={22}
//                 className="text-cyan-400"
//               />

//             </div>

//             <h3 className="text-white font-semibold">
//               Preview
//             </h3>

//             <p className="text-gray-500 text-sm mt-2">
//               Preview your website before publishing.
//             </p>

//           </a>


//           {/* =================================================
//               PUBLISH
//           ================================================= */}

//           <a
//             href="/institute/website/publish"
//             className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-6 hover:border-purple-500/50 transition"
//           >

//             <div className="w-11 h-11 rounded-xl bg-green-500/10 flex items-center justify-center mb-4">

//               {isPublished ? (
//                 <CheckCircle
//                   size={22}
//                   className="text-green-400"
//                 />
//               ) : (
//                 <AlertCircle
//                   size={22}
//                   className="text-green-400"
//                 />
//               )}

//             </div>

//             <h3 className="text-white font-semibold">
//               Publish
//             </h3>

//             <p className="text-gray-500 text-sm mt-2">
//               Publish or unpublish your institute website.
//             </p>

//           </a>

//         </div>

//       </div>


//       {/* =================================================
//           WEBSITE INFORMATION
//       ================================================= */}

//       {website?.website && (
//         <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-6">

//           <h2 className="text-lg font-semibold text-white mb-5">
//             Website Information
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

//             {/* WEBSITE NAME */}

//             <div>
//               <p className="text-xs text-gray-500">
//                 Website Name
//               </p>

//               <p className="text-white mt-1">
//                 {website.website.website_name ||
//                   "-"}
//               </p>
//             </div>


//             {/* TEMPLATE INFORMATION */}

//             <div>
//               <p className="text-xs text-gray-500">
//                 Template
//               </p>

//               <p className="text-white mt-1">
//                 {website.website.template_name ||
//                   "Not selected"}
//               </p>
//             </div>


//             {/* SLUG */}

//             <div>
//               <p className="text-xs text-gray-500">
//                 Slug
//               </p>

//               <p className="text-white mt-1">
//                 {website.website.slug ||
//                   "-"}
//               </p>
//             </div>


//             {/* STATUS */}

//             <div>
//               <p className="text-xs text-gray-500">
//                 Status
//               </p>

//               <p
//                 className={`mt-1 font-medium ${
//                   isPublished
//                     ? "text-green-400"
//                     : "text-yellow-400"
//                 }`}
//               >
//                 {websiteStatus}
//               </p>
//             </div>

//           </div>

//         </div>
//       )}

//     </div>
//   );
// }



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
} from "lucide-react";

import toast from "react-hot-toast";

import {
  getWebsiteData,
  getWebsiteStatus,
  setPreviewInstituteId,
} from "../../services/websiteService";

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
    const candidates = [
      // Direct website response
      website?.instituteId,
      website?.institute_id,
      website?.institute?.id,
      website?.institute?.instituteId,
      website?.institute?.institute_id,

      // Website nested object
      website?.website?.instituteId,
      website?.website?.institute_id,
      website?.website?.institute?.id,
      website?.website?.institute?.instituteId,
      website?.website?.institute?.institute_id,

      // Other possible response structures
      website?.data?.instituteId,
      website?.data?.institute_id,
      website?.data?.institute?.id,
      website?.data?.institute?.instituteId,
      website?.data?.institute?.institute_id,

      // Local storage
      localStorage.getItem("instituteId"),
      localStorage.getItem("institute_id"),
      localStorage.getItem("currentInstituteId"),
      localStorage.getItem("current_institute_id"),

      // Session storage
      sessionStorage.getItem("instituteId"),
      sessionStorage.getItem("institute_id"),
      sessionStorage.getItem("currentInstituteId"),
      sessionStorage.getItem("current_institute_id"),
    ];

    const instituteId = candidates.find((value) => {
      if (
        value === undefined ||
        value === null ||
        value === ""
      ) {
        return false;
      }

      const normalized = String(value).trim();

      return (
        normalized !== "" &&
        normalized !== "null" &&
        normalized !== "undefined"
      );
    });

    return instituteId
      ? String(instituteId).trim()
      : null;
  };

  /*
   * =========================================================
   * OPEN WEBSITE PREVIEW
   * =========================================================
   */
  const handlePreview = () => {
    const instituteId = getCurrentInstituteId();

    console.log(
      "=========================================="
    );

    console.log(
      "OPENING WEBSITE PREVIEW"
    );

    console.log(
      "Institute ID:",
      instituteId
    );

    console.log(
      "Website data:",
      website
    );

    console.log(
      "=========================================="
    );

    /*
     * No institute ID
     */
    if (!instituteId) {
      console.error(
        "PREVIEW: INSTITUTE ID NOT FOUND"
      );

      console.error(
        "localStorage instituteId:",
        localStorage.getItem("instituteId")
      );

      console.error(
        "localStorage institute_id:",
        localStorage.getItem("institute_id")
      );

      console.error(
        "sessionStorage instituteId:",
        sessionStorage.getItem("instituteId")
      );

      console.error(
        "sessionStorage institute_id:",
        sessionStorage.getItem("institute_id")
      );

      toast.error(
        "Institute ID not found. Please refresh the page and try again."
      );

      return;
    }

    try {
      /*
       * Save the institute ID before navigation.
       *
       * websiteService already saves:
       * - previewInstituteId
       * - instituteId
       *
       * in localStorage and sessionStorage.
       */
      setPreviewInstituteId(instituteId);

      /*
       * Also explicitly save current institute ID.
       *
       * This gives the preview page an additional fallback.
       */
      localStorage.setItem(
        "instituteId",
        String(instituteId)
      );

      sessionStorage.setItem(
        "instituteId",
        String(instituteId)
      );

      console.log(
        "PREVIEW INSTITUTE ID SAVED:",
        instituteId
      );

      /*
       * Navigate using React Router.
       *
       * We intentionally do NOT use:
       *
       * window.location
       * or
       * <a href="">
       *
       * because we need to establish the preview
       * institute ID before navigation.
       */
      navigate(
        "/institute/website/preview",
        {
          state: {
            instituteId: Number(instituteId),
            preview: true,
          },
        }
      );
    } catch (error) {
      console.error(
        "FAILED TO OPEN WEBSITE PREVIEW:",
        error
      );

      toast.error(
        "Unable to open website preview."
      );
    }
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