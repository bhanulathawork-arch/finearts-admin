// import API from "./api";

// // =========================================================
// // WEBSITE
// // =========================================================

// export const getWebsiteStatus = async () => {
//   const res = await API.get("/websites/status");
//   return res.data.data;
// };

// export const getWebsiteData = async () => {
//   const res = await API.get("/websites");
//   return res.data.data;
// };

// // =========================================================
// // TEMPLATES
// // =========================================================

// export const getTemplates = async () => {
//   const res = await API.get("/websites/templates");
//   return res.data.data;
// };

// export const getTemplate = async (templateId) => {
//   const res = await API.get(
//     `/websites/templates/${templateId}`
//   );

//   return res.data.data;
// };

// export const updateTemplate = async (templateId) => {
//   const res = await API.put(
//     "/websites/template",
//     {
//       templateId,
//     }
//   );

//   return res.data.data;
// };

// // =========================================================
// // SECTIONS
// // =========================================================

// export const updateSections = async (sections) => {
//   const res = await API.put(
//     "/websites/sections",
//     {
//       sections,
//     }
//   );

//   return res.data.data;
// };

// // =========================================================
// // SECTION CONTENT
// // =========================================================

// export const updateSectionContent = async (
//   sectionId,
//   content
// ) => {
//   const res = await API.put(
//     `/websites/sections/${sectionId}/content`,
//     {
//       content,
//     }
//   );

//   return res.data.data;
// };

// // =========================================================
// // BRANDING
// // =========================================================

// export const updateBranding = async (
//   branding
// ) => {
//   const res = await API.put(
//     "/websites/branding",
//     {
//       branding,
//     }
//   );

//   return res.data.data;
// };

// // =========================================================
// // PUBLISH
// // =========================================================

// export const publishWebsite = async () => {
//   const res = await API.post(
//     "/websites/publish"
//   );

//   return res.data.data;
// };

// export const unpublishWebsite = async () => {
//   const res = await API.post(
//     "/websites/unpublish"
//   );

//   return res.data.data;
// };

// // =========================================================
// // MEDIA
// // =========================================================

// export const uploadMedia = async (
//   file,
//   purpose = "general"
// ) => {
//   const formData = new FormData();

//   formData.append("file", file);
//   formData.append("purpose", purpose);

//   const res = await API.post(
//     "/websites/media",
//     formData,
//     {
//       headers: {
//         "Content-Type":
//           "multipart/form-data",
//       },
//     }
//   );

//   return res.data.data;
// };

// export const deleteMedia = async (url) => {
//   const res = await API.delete(
//     "/websites/media",
//     {
//       data: {
//         url,
//       },
//     }
//   );

//   return res.data.data;
// };


// import API from "./api";

// // =========================================================
// // PREVIEW INSTITUTE ID
// // =========================================================

// export const getPreviewInstituteId = () => {
//   return (
//     localStorage.getItem("previewInstituteId") ||
//     localStorage.getItem("instituteId") ||
//     null
//   );
// };

// export const setPreviewInstituteId = (instituteId) => {
//   if (!instituteId) {
//     console.error("Cannot set empty preview institute ID");
//     return;
//   }

//   localStorage.setItem(
//     "previewInstituteId",
//     String(instituteId)
//   );

//   console.log(
//     "Preview institute ID saved:",
//     instituteId
//   );
// };

// export const clearPreviewInstituteId = () => {
//   localStorage.removeItem("previewInstituteId");
// };

// // =========================================================
// // WEBSITE
// // =========================================================

// export const getWebsiteStatus = async () => {
//   const res = await API.get("/websites/status");

//   return res.data?.data ?? res.data;
// };

// export const getWebsiteData = async () => {
//   const res = await API.get("/websites");

//   return res.data?.data ?? res.data;
// };

// // =========================================================
// // PUBLIC WEBSITE PREVIEW
// // =========================================================

// export const getPublicWebsiteData = async (
//   instituteId = null
// ) => {
//   const id =
//     instituteId ||
//     getPreviewInstituteId();

//   if (!id) {
//     throw new Error(
//       "Preview institute ID not found"
//     );
//   }

//   console.log(
//     "Loading public website for institute:",
//     id
//   );

//   const res = await API.get(
//     `/websites/public/${id}`
//   );

//   return res.data?.data ?? res.data;
// };

// // =========================================================
// // TEMPLATES
// // =========================================================

// export const getTemplates = async () => {
//   const res = await API.get(
//     "/websites/templates"
//   );

//   return res.data?.data ?? res.data;
// };

// export const getTemplate = async (templateId) => {
//   const res = await API.get(
//     `/websites/templates/${templateId}`
//   );

//   return res.data?.data ?? res.data;
// };

// export const updateTemplate = async (
//   templateId
// ) => {
//   const res = await API.put(
//     "/websites/template",
//     {
//       templateId,
//     }
//   );

//   return res.data?.data ?? res.data;
// };

// // =========================================================
// // SECTIONS
// // =========================================================

// export const updateSections = async (
//   sections
// ) => {
//   const res = await API.put(
//     "/websites/sections",
//     {
//       sections,
//     }
//   );

//   return res.data?.data ?? res.data;
// };

// // =========================================================
// // SECTION CONTENT
// // =========================================================

// export const updateSectionContent = async (
//   sectionId,
//   content
// ) => {
//   const res = await API.put(
//     `/websites/sections/${sectionId}/content`,
//     {
//       content,
//     }
//   );

//   return res.data?.data ?? res.data;
// };

// // =========================================================
// // BRANDING
// // =========================================================

// export const updateBranding = async (
//   branding
// ) => {
//   const res = await API.put(
//     "/websites/branding",
//     {
//       branding,
//     }
//   );

//   return res.data?.data ?? res.data;
// };

// // =========================================================
// // PUBLISH
// // =========================================================

// export const publishWebsite = async () => {
//   const res = await API.post(
//     "/websites/publish"
//   );

//   return res.data?.data ?? res.data;
// };

// export const unpublishWebsite = async () => {
//   const res = await API.post(
//     "/websites/unpublish"
//   );

//   return res.data?.data ?? res.data;
// };

// // =========================================================
// // MEDIA
// // =========================================================

// export const uploadMedia = async (
//   file,
//   purpose = "general"
// ) => {
//   const formData = new FormData();

//   formData.append("file", file);
//   formData.append(
//     "purpose",
//     purpose
//   );

//   const res = await API.post(
//     "/websites/media",
//     formData,
//     {
//       headers: {
//         "Content-Type":
//           "multipart/form-data",
//       },
//     }
//   );

//   return res.data?.data ?? res.data;
// };

// export const deleteMedia = async (url) => {
//   const res = await API.delete(
//     "/websites/media",
//     {
//       data: {
//         url,
//       },
//     }
//   );

//   return res.data?.data ?? res.data;
// };


// import API from "./api";

// /* =========================================================
//    PREVIEW INSTITUTE ID
// ========================================================= */

// /**
//  * Get the institute ID used for website preview.
//  *
//  * Priority:
//  * 1. previewInstituteId
//  * 2. instituteId
//  * 3. institute object saved during institute login
//  */
// export const getPreviewInstituteId = () => {
//   /* -------------------------------------------------------
//      1. Explicit preview ID
//   ------------------------------------------------------- */

//   const previewInstituteId =
//     localStorage.getItem(
//       "previewInstituteId"
//     );

//   if (previewInstituteId) {
//     return previewInstituteId;
//   }

//   /* -------------------------------------------------------
//      2. Generic institute ID
//   ------------------------------------------------------- */

//   const instituteId =
//     localStorage.getItem(
//       "instituteId"
//     );

//   if (instituteId) {
//     return instituteId;
//   }

//   /* -------------------------------------------------------
//      3. Logged-in institute object
//   ------------------------------------------------------- */

//   const storedInstitute =
//     localStorage.getItem(
//       "institute"
//     );

//   if (!storedInstitute) {
//     return null;
//   }

//   try {
//     const parsed =
//       JSON.parse(
//         storedInstitute
//       );

//     /*
//      * Your InstituteLogin stores:
//      *
//      * {
//      *   account,
//      *   institute
//      * }
//      */

//     const id =
//       parsed?.institute?.id ||
//       parsed?.institute?.institute_id ||
//       parsed?.instituteId ||
//       parsed?.id ||
//       null;

//     if (id) {
//       return String(id);
//     }

//     return null;
//   } catch (error) {
//     console.error(
//       "Failed to parse stored institute:",
//       error
//     );

//     return null;
//   }
// };


// /* =========================================================
//    SET PREVIEW INSTITUTE ID
// ========================================================= */

// export const setPreviewInstituteId = (
//   instituteId
// ) => {
//   if (
//     instituteId === undefined ||
//     instituteId === null ||
//     instituteId === ""
//   ) {
//     console.error(
//       "Cannot set empty preview institute ID"
//     );

//     return;
//   }

//   const id =
//     String(instituteId);

//   localStorage.setItem(
//     "previewInstituteId",
//     id
//   );

//   /*
//    * Also keep instituteId synchronized.
//    */

//   localStorage.setItem(
//     "instituteId",
//     id
//   );

//   console.log(
//     "=========================================="
//   );

//   console.log(
//     "Preview institute ID saved:",
//     id
//   );

//   console.log(
//     "=========================================="
//   );
// };


// /* =========================================================
//    CLEAR PREVIEW INSTITUTE ID
// ========================================================= */

// export const clearPreviewInstituteId = () => {
//   localStorage.removeItem(
//     "previewInstituteId"
//   );
// };


// /* =========================================================
//    WEBSITE
// ========================================================= */

// /**
//  * Get logged-in institute website data.
//  *
//  * Authentication:
//  * Firebase
//  */
// export const getWebsiteData = async () => {
//   console.log(
//     "GETTING INSTITUTE WEBSITE DATA"
//   );

//   const res =
//     await API.get(
//       "/websites"
//     );

//   console.log(
//     "WEBSITE DATA RESPONSE:",
//     res.data
//   );

//   return (
//     res.data?.data ??
//     res.data
//   );
// };


// /* =========================================================
//    WEBSITE STATUS
// ========================================================= */

// /**
//  * Get logged-in institute website status.
//  *
//  * Authentication:
//  * Firebase
//  */
// export const getWebsiteStatus = async () => {
//   console.log(
//     "GETTING WEBSITE STATUS"
//   );

//   const res =
//     await API.get(
//       "/websites/status"
//     );

//   console.log(
//     "WEBSITE STATUS RESPONSE:",
//     res.data
//   );

//   return (
//     res.data?.data ??
//     res.data
//   );
// };


// /* =========================================================
//    PUBLIC WEBSITE / PREVIEW
// ========================================================= */

// /**
//  * Get website data for:
//  *
//  * 1. Website Preview
//  * 2. Published Public Website
//  *
//  * IMPORTANT:
//  *
//  * Preview:
//  *   /websites/public/14?preview=true
//  *
//  * Public:
//  *   /websites/public/14
//  *
//  * The backend decides whether the website must be published.
//  */
// export const getPublicWebsiteData = async (
//   instituteId = null,
//   isPreview = true
// ) => {
//   /* -------------------------------------------------------
//      Resolve institute ID
//   ------------------------------------------------------- */

//   const id =
//     instituteId ||
//     getPreviewInstituteId();

//   if (!id) {
//     throw new Error(
//       "Preview institute ID not found"
//     );
//   }

//   /* -------------------------------------------------------
//      Normalize ID
//   ------------------------------------------------------- */

//   const parsedId =
//     String(id).trim();

//   if (!parsedId) {
//     throw new Error(
//       "Invalid preview institute ID"
//     );
//   }

//   /* -------------------------------------------------------
//      Debug
//   ------------------------------------------------------- */

//   console.log(
//     "=========================================="
//   );

//   console.log(
//     "PUBLIC WEBSITE REQUEST"
//   );

//   console.log(
//     "Institute ID:",
//     parsedId
//   );

//   console.log(
//     "Preview:",
//     isPreview
//   );

//   console.log(
//     "URL:",
//     `/websites/public/${parsedId}`
//   );

//   console.log(
//     "=========================================="
//   );

//   /* -------------------------------------------------------
//      API REQUEST
//   ------------------------------------------------------- */

//   const res =
//     await API.get(
//       `/websites/public/${parsedId}`,
//       {
//         params: {
//           preview:
//             Boolean(isPreview),
//         },
//       }
//     );

//   /* -------------------------------------------------------
//      Debug response
//   ------------------------------------------------------- */

//   console.log(
//     "=========================================="
//   );

//   console.log(
//     "PUBLIC WEBSITE RESPONSE"
//   );

//   console.log(
//     res.data
//   );

//   console.log(
//     "=========================================="
//   );

//   return (
//     res.data?.data ??
//     res.data
//   );
// };


// /* =========================================================
//    TEMPLATES
// ========================================================= */

// /**
//  * Get all active website templates.
//  */
// export const getTemplates = async () => {
//   const res =
//     await API.get(
//       "/websites/templates"
//     );

//   return (
//     res.data?.data ??
//     res.data
//   );
// };


// /* =========================================================
//    GET SINGLE TEMPLATE
// ========================================================= */

// /**
//  * Get one website template.
//  */
// export const getTemplate = async (
//   templateId
// ) => {
//   if (
//     templateId === undefined ||
//     templateId === null ||
//     templateId === ""
//   ) {
//     throw new Error(
//       "Template ID is required"
//     );
//   }

//   const res =
//     await API.get(
//       `/websites/templates/${templateId}`
//     );

//   return (
//     res.data?.data ??
//     res.data
//   );
// };


// /* =========================================================
//    UPDATE TEMPLATE
// ========================================================= */

// /**
//  * Select/change the institute website template.
//  */
// export const updateTemplate = async (
//   templateId
// ) => {
//   if (
//     templateId === undefined ||
//     templateId === null ||
//     templateId === ""
//   ) {
//     throw new Error(
//       "Template ID is required"
//     );
//   }

//   const res =
//     await API.put(
//       "/websites/template",
//       {
//         templateId,
//       }
//     );

//   return (
//     res.data?.data ??
//     res.data
//   );
// };


// /* =========================================================
//    SECTIONS
// ========================================================= */

// /**
//  * Update complete website section configuration.
//  */
// export const updateSections = async (
//   sections
// ) => {
//   if (!Array.isArray(sections)) {
//     throw new Error(
//       "Sections must be an array"
//     );
//   }

//   const res =
//     await API.put(
//       "/websites/sections",
//       {
//         sections,
//       }
//     );

//   return (
//     res.data?.data ??
//     res.data
//   );
// };


// /* =========================================================
//    SECTION CONTENT
// ========================================================= */

// /**
//  * Update content for a single website section.
//  */
// export const updateSectionContent = async (
//   sectionId,
//   content
// ) => {
//   if (
//     sectionId === undefined ||
//     sectionId === null ||
//     sectionId === ""
//   ) {
//     throw new Error(
//       "Section ID is required"
//     );
//   }

//   const res =
//     await API.put(
//       `/websites/sections/${sectionId}/content`,
//       {
//         content,
//       }
//     );

//   return (
//     res.data?.data ??
//     res.data
//   );
// };


// /* =========================================================
//    BRANDING
// ========================================================= */

// /**
//  * Update website branding.
//  */
// export const updateBranding = async (
//   branding
// ) => {
//   const res =
//     await API.put(
//       "/websites/branding",
//       {
//         branding:
//           branding || {},
//       }
//     );

//   return (
//     res.data?.data ??
//     res.data
//   );
// };


// /* =========================================================
//    PUBLISH
// ========================================================= */

// /**
//  * Publish website.
//  */
// export const publishWebsite = async () => {
//   const res =
//     await API.post(
//       "/websites/publish"
//     );

//   return (
//     res.data?.data ??
//     res.data
//   );
// };


// /* =========================================================
//    UNPUBLISH
// ========================================================= */

// /**
//  * Unpublish website.
//  */
// export const unpublishWebsite = async () => {
//   const res =
//     await API.post(
//       "/websites/unpublish"
//     );

//   return (
//     res.data?.data ??
//     res.data
//   );
// };


// /* =========================================================
//    MEDIA UPLOAD
// ========================================================= */

// /**
//  * Upload website media.
//  */
// export const uploadMedia = async (
//   file,
//   purpose = "general"
// ) => {
//   if (!file) {
//     throw new Error(
//       "File is required"
//     );
//   }

//   const formData =
//     new FormData();

//   formData.append(
//     "file",
//     file
//   );

//   formData.append(
//     "purpose",
//     purpose
//   );

//   const res =
//     await API.post(
//       "/websites/media",
//       formData,
//       {
//         headers: {
//           "Content-Type":
//             "multipart/form-data",
//         },
//       }
//     );

//   return (
//     res.data?.data ??
//     res.data
//   );
// };


// /* =========================================================
//    DELETE MEDIA
// ========================================================= */

// /**
//  * Delete website media.
//  */
// export const deleteMedia = async (
//   url
// ) => {
//   if (!url) {
//     throw new Error(
//       "Media URL is required"
//     );
//   }

//   const res =
//     await API.delete(
//       "/websites/media",
//       {
//         data: {
//           url,
//         },
//       }
//     );

//   return (
//     res.data?.data ??
//     res.data
//   );
// };



// import API from "./api";

// /* =========================================================
//    PREVIEW INSTITUTE ID
// ========================================================= */

// export const getPreviewInstituteId = () => {
//   const previewInstituteId =
//     localStorage.getItem("previewInstituteId");

//   if (previewInstituteId) {
//     return previewInstituteId;
//   }

//   const instituteId =
//     localStorage.getItem("instituteId");

//   if (instituteId) {
//     return instituteId;
//   }

//   const storedInstitute =
//     localStorage.getItem("institute");

//   if (!storedInstitute) {
//     return null;
//   }

//   try {
//     const parsed = JSON.parse(storedInstitute);

//     const id =
//       parsed?.institute?.id ||
//       parsed?.institute?.institute_id ||
//       parsed?.instituteId ||
//       parsed?.id ||
//       null;

//     return id ? String(id) : null;
//   } catch (error) {
//     console.error(
//       "FAILED TO PARSE STORED INSTITUTE:",
//       error
//     );

//     return null;
//   }
// };


// /* =========================================================
//    SET PREVIEW INSTITUTE ID
// ========================================================= */

// export const setPreviewInstituteId = (instituteId) => {
//   if (
//     instituteId === undefined ||
//     instituteId === null ||
//     instituteId === ""
//   ) {
//     console.error(
//       "Cannot set empty preview institute ID"
//     );
//     return;
//   }

//   const id = String(instituteId).trim();

//   if (!id) {
//     console.error(
//       "Invalid preview institute ID"
//     );
//     return;
//   }

//   localStorage.setItem(
//     "previewInstituteId",
//     id
//   );

//   localStorage.setItem(
//     "instituteId",
//     id
//   );

//   console.log(
//     "PREVIEW INSTITUTE ID SAVED:",
//     id
//   );
// };


// /* =========================================================
//    CLEAR PREVIEW INSTITUTE ID
// ========================================================= */

// export const clearPreviewInstituteId = () => {
//   localStorage.removeItem(
//     "previewInstituteId"
//   );
// };


// /* =========================================================
//    WEBSITE
// ========================================================= */

// export const getWebsiteData = async () => {
//   try {
//     console.log(
//       "GETTING INSTITUTE WEBSITE DATA"
//     );

//     const res = await API.get(
//       "/websites"
//     );

//     console.log(
//       "WEBSITE DATA RESPONSE:",
//       res.data
//     );

//     return (
//       res.data?.data ??
//       res.data
//     );
//   } catch (error) {
//     console.error(
//       "GET WEBSITE DATA ERROR:",
//       error
//     );

//     throw error;
//   }
// };


// /* =========================================================
//    WEBSITE STATUS
// ========================================================= */

// export const getWebsiteStatus = async () => {
//   try {
//     console.log(
//       "GETTING WEBSITE STATUS"
//     );

//     const res = await API.get(
//       "/websites/status"
//     );

//     console.log(
//       "WEBSITE STATUS RESPONSE:",
//       res.data
//     );

//     return (
//       res.data?.data ??
//       res.data
//     );
//   } catch (error) {
//     console.error(
//       "GET WEBSITE STATUS ERROR:",
//       error
//     );

//     throw error;
//   }
// };


// /* =========================================================
//    PUBLIC WEBSITE / PREVIEW
// ========================================================= */

// export const getPublicWebsiteData = async (
//   instituteId = null,
//   isPreview = true
// ) => {
//   const id =
//     instituteId ||
//     getPreviewInstituteId();

//   if (!id) {
//     throw new Error(
//       "Preview institute ID not found"
//     );
//   }

//   const parsedId =
//     String(id).trim();

//   if (!parsedId) {
//     throw new Error(
//       "Invalid preview institute ID"
//     );
//   }

//   console.log(
//     "=========================================="
//   );

//   console.log(
//     "PUBLIC WEBSITE REQUEST"
//   );

//   console.log(
//     "Institute ID:",
//     parsedId
//   );

//   console.log(
//     "Preview:",
//     Boolean(isPreview)
//   );

//   console.log(
//     "=========================================="
//   );

//   try {
//     const res =
//       await API.get(
//         `/websites/public/${parsedId}`,
//         {
//           params: {
//             preview:
//               Boolean(isPreview),
//           },
//         }
//       );

//     console.log(
//       "PUBLIC WEBSITE RESPONSE:",
//       res.data
//     );

//     return (
//       res.data?.data ??
//       res.data
//     );
//   } catch (error) {
//     console.error(
//       "GET PUBLIC WEBSITE DATA ERROR:",
//       error
//     );

//     throw error;
//   }
// };


// /* =========================================================
//    TEMPLATES
// ========================================================= */

// export const getTemplates = async () => {
//   try {
//     const res =
//       await API.get(
//         "/websites/templates"
//       );

//     return (
//       res.data?.data ??
//       res.data
//     );
//   } catch (error) {
//     console.error(
//       "GET TEMPLATES ERROR:",
//       error
//     );

//     throw error;
//   }
// };


// /* =========================================================
//    GET SINGLE TEMPLATE
// ========================================================= */

// export const getTemplate = async (
//   templateId
// ) => {
//   if (
//     templateId === undefined ||
//     templateId === null ||
//     templateId === ""
//   ) {
//     throw new Error(
//       "Template ID is required"
//     );
//   }

//   try {
//     const res =
//       await API.get(
//         `/websites/templates/${templateId}`
//       );

//     return (
//       res.data?.data ??
//       res.data
//     );
//   } catch (error) {
//     console.error(
//       "GET TEMPLATE ERROR:",
//       error
//     );

//     throw error;
//   }
// };


// /* =========================================================
//    UPDATE TEMPLATE
// ========================================================= */

// export const updateTemplate = async (
//   templateId
// ) => {
//   if (
//     templateId === undefined ||
//     templateId === null ||
//     templateId === ""
//   ) {
//     throw new Error(
//       "Template ID is required"
//     );
//   }

//   try {
//     const res =
//       await API.put(
//         "/websites/template",
//         {
//           templateId,
//         }
//       );

//     return (
//       res.data?.data ??
//       res.data
//     );
//   } catch (error) {
//     console.error(
//       "UPDATE TEMPLATE ERROR:",
//       error
//     );

//     throw error;
//   }
// };


// /* =========================================================
//    WEBSITE SECTIONS
// ========================================================= */

// export const updateSections = async (
//   sections
// ) => {
//   if (!Array.isArray(sections)) {
//     throw new Error(
//       "Sections must be an array"
//     );
//   }

//   try {
//     const res =
//       await API.put(
//         "/websites/sections",
//         {
//           sections,
//         }
//       );

//     return (
//       res.data?.data ??
//       res.data
//     );
//   } catch (error) {
//     console.error(
//       "UPDATE SECTIONS ERROR:",
//       error
//     );

//     throw error;
//   }
// };


// /* =========================================================
//    GET WEBSITE CONTENT
// ========================================================= */

// export const getWebsiteContent = async () => {
//   try {
//     console.log(
//       "GETTING WEBSITE CONTENT"
//     );

//     const res =
//       await API.get(
//         "/websites/content"
//       );

//     console.log(
//       "WEBSITE CONTENT RESPONSE:",
//       res.data
//     );

//     return (
//       res.data?.data ??
//       res.data
//     );
//   } catch (error) {
//     console.error(
//       "GET WEBSITE CONTENT ERROR:",
//       error
//     );

//     throw error;
//   }
// };


// /* =========================================================
//    UPDATE COMPLETE WEBSITE CONTENT
// ========================================================= */

// export const updateWebsiteContent = async (
//   content
// ) => {
//   if (
//     !content ||
//     typeof content !== "object" ||
//     Array.isArray(content)
//   ) {
//     throw new Error(
//       "Website content must be an object"
//     );
//   }

//   try {
//     console.log(
//       "=========================================="
//     );

//     console.log(
//       "UPDATING COMPLETE WEBSITE CONTENT"
//     );

//     console.log(
//       JSON.stringify(
//         content,
//         null,
//         2
//       )
//     );

//     console.log(
//       "=========================================="
//     );

//     const res =
//       await API.put(
//         "/websites/content",
//         {
//           content,
//         }
//       );

//     console.log(
//       "WEBSITE CONTENT UPDATE RESPONSE:",
//       res.data
//     );

//     return (
//       res.data?.data ??
//       res.data
//     );
//   } catch (error) {
//     console.error(
//       "UPDATE WEBSITE CONTENT ERROR:",
//       error
//     );

//     throw error;
//   }
// };


// /* =========================================================
//    SECTION KEY NORMALIZER
// ========================================================= */

// const normalizePageKey = (
//   pageKey
// ) => {
//   const value =
//     String(
//       pageKey ?? ""
//     ).trim();

//   const map = {
//     Home: "home",
//     home: "home",

//     About: "about",
//     about: "about",

//     Classes: "classes",
//     classes: "classes",

//     Sessions: "sessions",
//     sessions: "sessions",

//     Trainers: "trainers",
//     trainers: "trainers",

//     Testimonials: "testimonials",
//     testimonials: "testimonials",

//     Contact: "contact",
//     contact: "contact",

//     Gallery: "gallery",
//     gallery: "gallery",

//     Batches: "batches",
//     batches: "batches",

//     Categories: "categories",
//     categories: "categories",

//     "Student Login": "studentLogin",
//     studentLogin: "studentLogin",
//     studentlogin: "studentLogin",
//   };

//   return (
//     map[value] ||
//     value
//   );
// };


// const normalizeSectionKey = (
//   sectionKey
// ) => {
//   const value =
//     String(
//       sectionKey ?? ""
//     ).trim();

//   const map = {
//     Hero: "hero",
//     hero: "hero",

//     "Popular Classes":
//       "popularClasses",

//     "Popular classes":
//       "popularClasses",

//     "popular classes":
//       "popularClasses",

//     popular_classes:
//       "popularClasses",

//     popularClasses:
//       "popularClasses",

//     Categories:
//       "categories",

//     categories:
//       "categories",

//     Trainers:
//       "trainers",

//     trainers:
//       "trainers",

//     Testimonials:
//       "testimonials",

//     testimonials:
//       "testimonials",

//     About:
//       "about",

//     about:
//       "about",

//     Classes:
//       "classes",

//     classes:
//       "classes",

//     Sessions:
//       "sessions",

//     sessions:
//       "sessions",

//     Contact:
//       "contact",

//     contact:
//       "contact",

//     Gallery:
//       "gallery",

//     gallery:
//       "gallery",

//     Batches:
//       "batches",

//     batches:
//       "batches",

//     "Student Login":
//       "studentLogin",

//     studentLogin:
//       "studentLogin",

//     studentlogin:
//       "studentLogin",
//   };

//   return (
//     map[value] ||
//     value
//   );
// };


// /* =========================================================
//    DEFAULT SECTION KEY
// ========================================================= */

// /*
//  * For normal pages the section key is the same
//  * as the page key.
//  *
//  * Example:
//  *
//  * testimonials -> testimonials
//  * about        -> about
//  * classes      -> classes
//  * sessions     -> sessions
//  * trainers     -> trainers
//  *
//  * Home is different because Home contains
//  * multiple sections.
//  */

// const getDefaultSectionKey = (
//   pageKey
// ) => {
//   const page =
//     normalizePageKey(
//       pageKey
//     );

//   if (
//     page === "home"
//   ) {
//     return null;
//   }

//   return page;
// };


// /* =========================================================
//    UPDATE SINGLE SECTION CONTENT
// ========================================================= */

// /**
//  * Supports BOTH:
//  *
//  * 1.
//  * updateSectionContent(
//  *   "testimonials",
//  *   "testimonials",
//  *   {
//  *     heading: "...",
//  *     subheading: "..."
//  *   }
//  * )
//  *
//  * 2.
//  * updateSectionContent(
//  *   "testimonials",
//  *   {
//  *     heading: "...",
//  *     subheading: "..."
//  *   }
//  * )
//  *
//  * 3.
//  * updateSectionContent({
//  *   pageKey: "testimonials",
//  *   sectionKey: "testimonials",
//  *   content: {
//  *     heading: "...",
//  *     subheading: "..."
//  *   }
//  * })
//  */

// export const updateSectionContent = async (
//   pageKey,
//   sectionKey,
//   sectionContent
// ) => {

//   /* =====================================================
//      SUPPORT OBJECT ARGUMENT
//   ===================================================== */

//   if (
//     pageKey &&
//     typeof pageKey === "object" &&
//     !Array.isArray(pageKey)
//   ) {
//     const options =
//       pageKey;

//     pageKey =
//       options.pageKey ??
//       options.page_key ??
//       options.page ??
//       "";

//     sectionKey =
//       options.sectionKey ??
//       options.section_key ??
//       options.section ??
//       null;

//     sectionContent =
//       options.content ??
//       options.sectionContent ??
//       options.section_content ??
//       {};
//   }

//   /* =====================================================
//      SUPPORT TWO-ARGUMENT CALL
//   ===================================================== */

//   /*
//    * If the second argument is an object,
//    * then the caller did:
//    *
//    * updateSectionContent(
//    *   pageKey,
//    *   content
//    * )
//    *
//    * Automatically determine the section key.
//    */

//   if (
//     sectionKey &&
//     typeof sectionKey === "object" &&
//     !Array.isArray(sectionKey)
//   ) {
//     sectionContent =
//       sectionKey;

//     sectionKey = null;
//   }

//   /* =====================================================
//      NORMALIZE PAGE
//   ===================================================== */

//   const normalizedPageKey =
//     normalizePageKey(
//       pageKey
//     );

//   /* =====================================================
//      NORMALIZE SECTION
//   ===================================================== */

//   let normalizedSectionKey =
//     normalizeSectionKey(
//       sectionKey
//     );

//   /* =====================================================
//      AUTOMATIC SECTION KEY
//   ===================================================== */

//   if (
//     !normalizedSectionKey
//   ) {
//     normalizedSectionKey =
//       getDefaultSectionKey(
//         normalizedPageKey
//       );
//   }

//   /*
//    * Home needs an actual child section.
//    *
//    * If caller forgot sectionKey,
//    * try to determine it from content.
//    */

//   if (
//     normalizedPageKey === "home" &&
//     !normalizedSectionKey &&
//     sectionContent &&
//     typeof sectionContent === "object"
//   ) {
//     const possibleKeys = [
//       "hero",
//       "popularClasses",
//       "categories",
//       "trainers",
//       "testimonials",
//     ];

//     const found =
//       possibleKeys.find(
//         (key) =>
//           Object.prototype.hasOwnProperty.call(
//             sectionContent,
//             key
//           )
//       );

//     if (found) {
//       normalizedSectionKey =
//         found;

//       sectionContent =
//         sectionContent[
//           found
//         ];
//     }
//   }

//   /* =====================================================
//      VALIDATION
//   ===================================================== */

//   if (!normalizedPageKey) {
//     throw new Error(
//       "Page key is required"
//     );
//   }

//   if (!normalizedSectionKey) {
//     throw new Error(
//       `Section key is required for page "${normalizedPageKey}".`
//     );
//   }

//   if (
//     !sectionContent ||
//     typeof sectionContent !== "object" ||
//     Array.isArray(sectionContent)
//   ) {
//     throw new Error(
//       "Section content must be an object"
//     );
//   }

//   /* =====================================================
//      DEBUG
//   ===================================================== */

//   console.log(
//     "=========================================="
//   );

//   console.log(
//     "UPDATING WEBSITE SECTION"
//   );

//   console.log(
//     "Page:",
//     normalizedPageKey
//   );

//   console.log(
//     "Section:",
//     normalizedSectionKey
//   );

//   console.log(
//     "Content:",
//     sectionContent
//   );

//   console.log(
//     "=========================================="
//   );

//   try {

//     /* ===================================================
//        GET CURRENT CONTENT
//     =================================================== */

//     const currentResponse =
//       await getWebsiteContent();

//     let currentContent =
//       currentResponse?.content ??
//       currentResponse ??
//       {};

//     /* ===================================================
//        SAFE CLONE
//     =================================================== */

//     let content = {};

//     try {
//       content =
//         JSON.parse(
//           JSON.stringify(
//             currentContent
//           )
//         );
//     } catch (error) {
//       console.error(
//         "FAILED TO CLONE WEBSITE CONTENT:",
//         error
//       );

//       content = {};
//     }

//     /* ===================================================
//        ENSURE PAGE OBJECT
//     =================================================== */

//     if (
//       !content[
//         normalizedPageKey
//       ] ||
//       typeof content[
//         normalizedPageKey
//       ] !== "object" ||
//       Array.isArray(
//         content[
//           normalizedPageKey
//         ]
//       )
//     ) {
//       content[
//         normalizedPageKey
//       ] = {};
//     }

//     /* ===================================================
//        HOME PAGE
//     =================================================== */

//     if (
//       normalizedPageKey === "home"
//     ) {

//       if (
//         !content.home[
//           normalizedSectionKey
//         ] ||
//         typeof content.home[
//           normalizedSectionKey
//         ] !== "object" ||
//         Array.isArray(
//           content.home[
//             normalizedSectionKey
//           ]
//         )
//       ) {
//         content.home[
//           normalizedSectionKey
//         ] = {};
//       }

//       content.home[
//         normalizedSectionKey
//       ] = {
//         ...content.home[
//           normalizedSectionKey
//         ],
//         ...sectionContent,
//       };

//     }

//     /* ===================================================
//        NORMAL PAGE
//     =================================================== */

//     else {

//       content[
//         normalizedPageKey
//       ] = {
//         ...content[
//           normalizedPageKey
//         ],
//         ...sectionContent,
//       };

//     }

//     /* ===================================================
//        SAVE
//     =================================================== */

//     const result =
//       await updateWebsiteContent(
//         content
//       );

//     /* ===================================================
//        SUCCESS
//     =================================================== */

//     console.log(
//       "=========================================="
//     );

//     console.log(
//       "WEBSITE SECTION UPDATED SUCCESSFULLY"
//     );

//     console.log(
//       "Page:",
//       normalizedPageKey
//     );

//     console.log(
//       "Section:",
//       normalizedSectionKey
//     );

//     console.log(
//       "=========================================="
//     );

//     return result;

//   } catch (error) {

//     console.error(
//       "UPDATE SINGLE WEBSITE SECTION ERROR:",
//       error
//     );

//     throw error;
//   }
// };


// /* =========================================================
//    BRANDING
// ========================================================= */

// export const updateBranding = async (
//   branding
// ) => {

//   if (
//     !branding ||
//     typeof branding !== "object" ||
//     Array.isArray(branding)
//   ) {
//     throw new Error(
//       "Branding must be an object"
//     );
//   }

//   try {

//     console.log(
//       "UPDATING WEBSITE BRANDING:",
//       branding
//     );

//     const res =
//       await API.put(
//         "/websites/branding",
//         {
//           branding,
//         }
//       );

//     console.log(
//       "BRANDING UPDATE RESPONSE:",
//       res.data
//     );

//     return (
//       res.data?.data ??
//       res.data
//     );

//   } catch (error) {

//     console.error(
//       "UPDATE BRANDING ERROR:",
//       error
//     );

//     throw error;
//   }
// };


// /* =========================================================
//    PUBLISH WEBSITE
// ========================================================= */

// export const publishWebsite = async () => {

//   try {

//     const res =
//       await API.post(
//         "/websites/publish"
//       );

//     return (
//       res.data?.data ??
//       res.data
//     );

//   } catch (error) {

//     console.error(
//       "PUBLISH WEBSITE ERROR:",
//       error
//     );

//     throw error;
//   }
// };


// /* =========================================================
//    UNPUBLISH WEBSITE
// ========================================================= */

// export const unpublishWebsite = async () => {

//   try {

//     const res =
//       await API.post(
//         "/websites/unpublish"
//       );

//     return (
//       res.data?.data ??
//       res.data
//     );

//   } catch (error) {

//     console.error(
//       "UNPUBLISH WEBSITE ERROR:",
//       error
//     );

//     throw error;
//   }
// };


// /* =========================================================
//    MEDIA UPLOAD
// ========================================================= */

// export const uploadMedia = async (
//   file,
//   purpose = "general"
// ) => {

//   if (!file) {
//     throw new Error(
//       "File is required"
//     );
//   }

//   const formData =
//     new FormData();

//   formData.append(
//     "file",
//     file
//   );

//   formData.append(
//     "purpose",
//     purpose
//   );

//   try {

//     const res =
//       await API.post(
//         "/websites/media",
//         formData,
//         {
//           headers: {
//             "Content-Type":
//               "multipart/form-data",
//           },
//         }
//       );

//     return (
//       res.data?.data ??
//       res.data
//     );

//   } catch (error) {

//     console.error(
//       "UPLOAD WEBSITE MEDIA ERROR:",
//       error
//     );

//     throw error;
//   }
// };


// /* =========================================================
//    DELETE MEDIA
// ========================================================= */

// export const deleteMedia = async (
//   url
// ) => {

//   if (!url) {
//     throw new Error(
//       "Media URL is required"
//     );
//   }

//   try {

//     const res =
//       await API.delete(
//         "/websites/media",
//         {
//           data: {
//             url,
//           },
//         }
//       );

//     return (
//       res.data?.data ??
//       res.data
//     );

//   } catch (error) {

//     console.error(
//       "DELETE WEBSITE MEDIA ERROR:",
//       error
//     );

//     throw error;
//   }
// };

import API from "./api";


/* =========================================================
   HELPERS
========================================================= */

const isValidId = (value) => {
  if (
    value === undefined ||
    value === null
  ) {
    return false;
  }

  const id = String(value).trim();

  if (
    !id ||
    id === "null" ||
    id === "undefined"
  ) {
    return false;
  }

  return true;
};


const normalizeId = (value) => {
  if (!isValidId(value)) {
    return null;
  }

  return String(value).trim();
};


/* =========================================================
   GET INSTITUTE ID FROM URL
========================================================= */

const getInstituteIdFromUrl = () => {
  try {
    if (
      typeof window === "undefined"
    ) {
      return null;
    }

    const params =
      new URLSearchParams(
        window.location.search
      );

    const urlInstituteId =
      params.get("institute_id");

    if (
      isValidId(
        urlInstituteId
      )
    ) {
      return normalizeId(
        urlInstituteId
      );
    }

    const urlInstituteIdCamel =
      params.get("instituteId");

    if (
      isValidId(
        urlInstituteIdCamel
      )
    ) {
      return normalizeId(
        urlInstituteIdCamel
      );
    }

    const urlId =
      params.get("id");

    if (
      isValidId(urlId)
    ) {
      return normalizeId(
        urlId
      );
    }

    return null;

  } catch (error) {

    console.error(
      "FAILED TO READ INSTITUTE ID FROM URL:",
      error
    );

    return null;
  }
};


/* =========================================================
   GET CURRENT INSTITUTE FROM STORAGE
========================================================= */

const getStoredCurrentInstituteId = () => {

  /* -------------------------------------------------------
     1. Normal institute ID
  ------------------------------------------------------- */

  const instituteId =
    normalizeId(
      localStorage.getItem(
        "instituteId"
      )
    );

  if (instituteId) {
    return instituteId;
  }


  const sessionInstituteId =
    normalizeId(
      sessionStorage.getItem(
        "instituteId"
      )
    );

  if (sessionInstituteId) {
    return sessionInstituteId;
  }


  /* -------------------------------------------------------
     2. institute_id
  ------------------------------------------------------- */

  const instituteIdSnake =
    normalizeId(
      localStorage.getItem(
        "institute_id"
      )
    );

  if (instituteIdSnake) {
    return instituteIdSnake;
  }


  const sessionInstituteIdSnake =
    normalizeId(
      sessionStorage.getItem(
        "institute_id"
      )
    );

  if (sessionInstituteIdSnake) {
    return sessionInstituteIdSnake;
  }


  /* -------------------------------------------------------
     3. currentInstituteId
  ------------------------------------------------------- */

  const currentInstituteId =
    normalizeId(
      localStorage.getItem(
        "currentInstituteId"
      )
    );

  if (currentInstituteId) {
    return currentInstituteId;
  }


  const sessionCurrentInstituteId =
    normalizeId(
      sessionStorage.getItem(
        "currentInstituteId"
      )
    );

  if (sessionCurrentInstituteId) {
    return sessionCurrentInstituteId;
  }


  /* -------------------------------------------------------
     4. current_institute_id
  ------------------------------------------------------- */

  const currentInstituteIdSnake =
    normalizeId(
      localStorage.getItem(
        "current_institute_id"
      )
    );

  if (currentInstituteIdSnake) {
    return currentInstituteIdSnake;
  }


  const sessionCurrentInstituteIdSnake =
    normalizeId(
      sessionStorage.getItem(
        "current_institute_id"
      )
    );

  if (sessionCurrentInstituteIdSnake) {
    return sessionCurrentInstituteIdSnake;
  }


  /* -------------------------------------------------------
     5. Stored institute object
  ------------------------------------------------------- */

  const storedInstitute =
    localStorage.getItem(
      "institute"
    );

  if (
    storedInstitute
  ) {

    try {

      const parsed =
        JSON.parse(
          storedInstitute
        );


      const id =
        parsed?.institute?.id ||
        parsed?.institute?.institute_id ||
        parsed?.institute?.instituteId ||
        parsed?.instituteId ||
        parsed?.id ||
        parsed?.institute_id ||
        null;


      if (
        isValidId(id)
      ) {

        return normalizeId(
          id
        );
      }

    } catch (error) {

      console.error(
        "FAILED TO PARSE STORED INSTITUTE:",
        error
      );
    }
  }


  return null;
};


/* =========================================================
   PREVIEW INSTITUTE ID

   IMPORTANT:
   NEVER prefer old previewInstituteId first.

   Priority:
   1. URL
   2. current institute
   3. preview storage
========================================================= */

export const getPreviewInstituteId = () => {

  const urlId =
    getInstituteIdFromUrl();

  if (urlId) {

    console.log(
      "PREVIEW ID FROM URL:",
      urlId
    );

    return urlId;
  }


  const currentInstituteId =
    getStoredCurrentInstituteId();

  if (currentInstituteId) {

    console.log(
      "PREVIEW ID FROM CURRENT INSTITUTE:",
      currentInstituteId
    );

    return currentInstituteId;
  }


  /* -------------------------------------------------------
     Preview ID is ONLY a fallback.
  ------------------------------------------------------- */

  const previewInstituteId =
    normalizeId(
      localStorage.getItem(
        "previewInstituteId"
      )
    );

  if (previewInstituteId) {

    console.warn(
      "USING FALLBACK PREVIEW INSTITUTE ID:",
      previewInstituteId
    );

    return previewInstituteId;
  }


  const sessionPreviewInstituteId =
    normalizeId(
      sessionStorage.getItem(
        "previewInstituteId"
      )
    );

  if (sessionPreviewInstituteId) {

    console.warn(
      "USING FALLBACK SESSION PREVIEW INSTITUTE ID:",
      sessionPreviewInstituteId
    );

    return sessionPreviewInstituteId;
  }


  return null;
};


/* =========================================================
   SET PREVIEW INSTITUTE ID
========================================================= */

export const setPreviewInstituteId = (
  instituteId
) => {

  const id =
    normalizeId(
      instituteId
    );


  if (!id) {

    console.error(
      "Cannot set empty preview institute ID"
    );

    return;
  }


  /* -------------------------------------------------------
     Preview storage
  ------------------------------------------------------- */

  localStorage.setItem(
    "previewInstituteId",
    id
  );

  sessionStorage.setItem(
    "previewInstituteId",
    id
  );


  /* -------------------------------------------------------
     Current institute storage
  ------------------------------------------------------- */

  localStorage.setItem(
    "instituteId",
    id
  );

  sessionStorage.setItem(
    "instituteId",
    id
  );


  console.log(
    "PREVIEW INSTITUTE ID SAVED:",
    id
  );
};


/* =========================================================
   CLEAR PREVIEW INSTITUTE ID
========================================================= */

export const clearPreviewInstituteId = () => {

  localStorage.removeItem(
    "previewInstituteId"
  );

  sessionStorage.removeItem(
    "previewInstituteId"
  );

  console.log(
    "PREVIEW INSTITUTE ID CLEARED"
  );
};


/* =========================================================
   CLEAR ALL POSSIBLE OLD INSTITUTE IDS

   Useful when changing accounts/institutes.
========================================================= */

export const clearStoredInstituteIds = () => {

  localStorage.removeItem(
    "previewInstituteId"
  );

  sessionStorage.removeItem(
    "previewInstituteId"
  );

  localStorage.removeItem(
    "instituteId"
  );

  sessionStorage.removeItem(
    "instituteId"
  );

  localStorage.removeItem(
    "institute_id"
  );

  sessionStorage.removeItem(
    "institute_id"
  );

  localStorage.removeItem(
    "currentInstituteId"
  );

  sessionStorage.removeItem(
    "currentInstituteId"
  );

  localStorage.removeItem(
    "current_institute_id"
  );

  sessionStorage.removeItem(
    "current_institute_id"
  );

  console.log(
    "ALL STORED INSTITUTE IDS CLEARED"
  );
};


/* =========================================================
   WEBSITE
========================================================= */

export const getWebsiteData = async () => {

  try {

    console.log(
      "=========================================="
    );

    console.log(
      "GETTING INSTITUTE WEBSITE DATA"
    );

    console.log(
      "=========================================="
    );


    const res =
      await API.get(
        "/websites"
      );


    console.log(
      "WEBSITE DATA RESPONSE:",
      res.data
    );


    return (
      res.data?.data ??
      res.data
    );

  } catch (error) {

    console.error(
      "GET WEBSITE DATA ERROR:",
      error
    );

    throw error;
  }
};


/* =========================================================
   WEBSITE STATUS
========================================================= */

export const getWebsiteStatus = async () => {

  try {

    console.log(
      "GETTING WEBSITE STATUS"
    );


    const res =
      await API.get(
        "/websites/status"
      );


    console.log(
      "WEBSITE STATUS RESPONSE:",
      res.data
    );


    return (
      res.data?.data ??
      res.data
    );

  } catch (error) {

    console.error(
      "GET WEBSITE STATUS ERROR:",
      error
    );

    throw error;
  }
};


/* =========================================================
   PUBLIC WEBSITE / PREVIEW
========================================================= */

export const getPublicWebsiteData = async (
  instituteId = null,
  isPreview = true
) => {

  /* -------------------------------------------------------
     If caller explicitly gives ID, ALWAYS use it.
  ------------------------------------------------------- */

  let id =
    normalizeId(
      instituteId
    );


  /* -------------------------------------------------------
     Otherwise resolve automatically.
  ------------------------------------------------------- */

  if (!id) {

    id =
      getPreviewInstituteId();
  }


  /* -------------------------------------------------------
     Validate
  ------------------------------------------------------- */

  if (!id) {

    throw new Error(
      "Preview institute ID not found. Please open the preview from the institute dashboard."
    );
  }


  const parsedId =
    normalizeId(id);


  if (!parsedId) {

    throw new Error(
      "Invalid preview institute ID"
    );
  }


  console.log(
    "=========================================="
  );

  console.log(
    "PUBLIC WEBSITE REQUEST"
  );

  console.log(
    "Institute ID:",
    parsedId
  );

  console.log(
    "Preview:",
    Boolean(isPreview)
  );

  console.log(
    "=========================================="
  );


  try {

    const res =
      await API.get(
        `/websites/public/${parsedId}`,
        {
          params: {
            preview:
              Boolean(isPreview),
          },
        }
      );


    console.log(
      "PUBLIC WEBSITE RESPONSE:",
      res.data
    );


    const result =
      res.data?.data ??
      res.data;


    /* -----------------------------------------------------
       If server returns an institute ID,
       save that ID as the authoritative ID.
    ----------------------------------------------------- */

    const serverInstituteId =
      normalizeId(
        result?.instituteId ??
        result?.institute_id ??
        result?.institute?.id ??
        result?.institute?.institute_id
      );


    if (
      serverInstituteId
    ) {

      localStorage.setItem(
        "instituteId",
        serverInstituteId
      );

      sessionStorage.setItem(
        "instituteId",
        serverInstituteId
      );

      localStorage.setItem(
        "previewInstituteId",
        serverInstituteId
      );

      sessionStorage.setItem(
        "previewInstituteId",
        serverInstituteId
      );


      console.log(
        "SERVER INSTITUTE ID:",
        serverInstituteId
      );
    }


    return result;

  } catch (error) {

    console.error(
      "GET PUBLIC WEBSITE DATA ERROR:",
      error?.response?.data ||
      error
    );

    throw error;
  }
};


/* =========================================================
   TEMPLATES
========================================================= */

export const getTemplates = async () => {

  try {

    const res =
      await API.get(
        "/websites/templates"
      );

    return (
      res.data?.data ??
      res.data
    );

  } catch (error) {

    console.error(
      "GET TEMPLATES ERROR:",
      error
    );

    throw error;
  }
};


/* =========================================================
   GET SINGLE TEMPLATE
========================================================= */

export const getTemplate = async (
  templateId
) => {

  if (
    templateId === undefined ||
    templateId === null ||
    templateId === ""
  ) {

    throw new Error(
      "Template ID is required"
    );
  }


  try {

    const res =
      await API.get(
        `/websites/templates/${templateId}`
      );


    return (
      res.data?.data ??
      res.data
    );

  } catch (error) {

    console.error(
      "GET TEMPLATE ERROR:",
      error
    );

    throw error;
  }
};


/* =========================================================
   UPDATE TEMPLATE
========================================================= */

export const updateTemplate = async (
  templateId
) => {

  if (
    templateId === undefined ||
    templateId === null ||
    templateId === ""
  ) {

    throw new Error(
      "Template ID is required"
    );
  }


  try {

    const res =
      await API.put(
        "/websites/template",
        {
          templateId,
        }
      );


    return (
      res.data?.data ??
      res.data
    );

  } catch (error) {

    console.error(
      "UPDATE TEMPLATE ERROR:",
      error
    );

    throw error;
  }
};


/* =========================================================
   WEBSITE SECTIONS
========================================================= */

export const updateSections = async (
  sections
) => {

  if (
    !Array.isArray(
      sections
    )
  ) {

    throw new Error(
      "Sections must be an array"
    );
  }


  try {

    const res =
      await API.put(
        "/websites/sections",
        {
          sections,
        }
      );


    return (
      res.data?.data ??
      res.data
    );

  } catch (error) {

    console.error(
      "UPDATE SECTIONS ERROR:",
      error
    );

    throw error;
  }
};


/* =========================================================
   GET WEBSITE CONTENT
========================================================= */

export const getWebsiteContent = async () => {

  try {

    console.log(
      "GETTING WEBSITE CONTENT"
    );


    const res =
      await API.get(
        "/websites/content"
      );


    console.log(
      "WEBSITE CONTENT RESPONSE:",
      res.data
    );


    return (
      res.data?.data ??
      res.data
    );

  } catch (error) {

    console.error(
      "GET WEBSITE CONTENT ERROR:",
      error
    );

    throw error;
  }
};


/* =========================================================
   UPDATE COMPLETE WEBSITE CONTENT
========================================================= */

export const updateWebsiteContent = async (
  content
) => {

  if (
    !content ||
    typeof content !== "object" ||
    Array.isArray(content)
  ) {

    throw new Error(
      "Website content must be an object"
    );
  }


  try {

    console.log(
      "=========================================="
    );

    console.log(
      "UPDATING COMPLETE WEBSITE CONTENT"
    );

    console.log(
      JSON.stringify(
        content,
        null,
        2
      )
    );

    console.log(
      "=========================================="
    );


    const res =
      await API.put(
        "/websites/content",
        {
          content,
        }
      );


    console.log(
      "WEBSITE CONTENT UPDATE RESPONSE:",
      res.data
    );


    return (
      res.data?.data ??
      res.data
    );

  } catch (error) {

    console.error(
      "UPDATE WEBSITE CONTENT ERROR:",
      error
    );

    throw error;
  }
};


/* =========================================================
   PAGE KEY NORMALIZER
========================================================= */

const normalizePageKey = (
  pageKey
) => {

  const value =
    String(
      pageKey ?? ""
    ).trim();


  const map = {

    Home:
      "home",

    home:
      "home",

    About:
      "about",

    about:
      "about",

    Classes:
      "classes",

    classes:
      "classes",

    Sessions:
      "sessions",

    sessions:
      "sessions",

    Trainers:
      "trainers",

    trainers:
      "trainers",

    Testimonials:
      "testimonials",

    testimonials:
      "testimonials",

    Contact:
      "contact",

    contact:
      "contact",

    Gallery:
      "gallery",

    gallery:
      "gallery",

    Batches:
      "batches",

    batches:
      "batches",

    Categories:
      "categories",

    categories:
      "categories",

    "Student Login":
      "studentLogin",

    studentLogin:
      "studentLogin",

    studentlogin:
      "studentLogin",
  };


  return (
    map[value] ||
    value
  );
};


/* =========================================================
   SECTION KEY NORMALIZER
========================================================= */

const normalizeSectionKey = (
  sectionKey
) => {

  const value =
    String(
      sectionKey ?? ""
    ).trim();


  const map = {

    Hero:
      "hero",

    hero:
      "hero",

    "Popular Classes":
      "popularClasses",

    "Popular classes":
      "popularClasses",

    "popular classes":
      "popularClasses",

    popular_classes:
      "popularClasses",

    popularClasses:
      "popularClasses",

    Categories:
      "categories",

    categories:
      "categories",

    Trainers:
      "trainers",

    trainers:
      "trainers",

    Testimonials:
      "testimonials",

    testimonials:
      "testimonials",

    About:
      "about",

    about:
      "about",

    Classes:
      "classes",

    classes:
      "classes",

    Sessions:
      "sessions",

    sessions:
      "sessions",

    Contact:
      "contact",

    contact:
      "contact",

    Gallery:
      "gallery",

    gallery:
      "gallery",

    Batches:
      "batches",

    batches:
      "batches",

    "Student Login":
      "studentLogin",

    studentLogin:
      "studentLogin",

    studentlogin:
      "studentLogin",
  };


  return (
    map[value] ||
    value
  );
};


/* =========================================================
   DEFAULT SECTION KEY
========================================================= */

const getDefaultSectionKey = (
  pageKey
) => {

  const page =
    normalizePageKey(
      pageKey
    );


  if (
    page === "home"
  ) {
    return null;
  }


  return page;
};


/* =========================================================
   UPDATE SINGLE SECTION CONTENT
========================================================= */

export const updateSectionContent = async (
  pageKey,
  sectionKey,
  sectionContent
) => {

  /* -------------------------------------------------------
     OBJECT ARGUMENT
  ------------------------------------------------------- */

  if (
    pageKey &&
    typeof pageKey === "object" &&
    !Array.isArray(pageKey)
  ) {

    const options =
      pageKey;


    pageKey =
      options.pageKey ??
      options.page_key ??
      options.page ??
      "";


    sectionKey =
      options.sectionKey ??
      options.section_key ??
      options.section ??
      null;


    sectionContent =
      options.content ??
      options.sectionContent ??
      options.section_content ??
      {};
  }


  /* -------------------------------------------------------
     TWO ARGUMENT CALL
  ------------------------------------------------------- */

  if (
    sectionKey &&
    typeof sectionKey === "object" &&
    !Array.isArray(sectionKey)
  ) {

    sectionContent =
      sectionKey;

    sectionKey =
      null;
  }


  /* -------------------------------------------------------
     NORMALIZE
  ------------------------------------------------------- */

  const normalizedPageKey =
    normalizePageKey(
      pageKey
    );


  let normalizedSectionKey =
    normalizeSectionKey(
      sectionKey
    );


  if (
    !normalizedSectionKey
  ) {

    normalizedSectionKey =
      getDefaultSectionKey(
        normalizedPageKey
      );
  }


  /* -------------------------------------------------------
     HOME SECTION AUTO-DETECTION
  ------------------------------------------------------- */

  if (
    normalizedPageKey === "home" &&
    !normalizedSectionKey &&
    sectionContent &&
    typeof sectionContent === "object"
  ) {

    const possibleKeys = [
      "hero",
      "popularClasses",
      "categories",
      "trainers",
      "testimonials",
    ];


    const found =
      possibleKeys.find(
        (key) =>
          Object.prototype.hasOwnProperty.call(
            sectionContent,
            key
          )
      );


    if (found) {

      normalizedSectionKey =
        found;


      sectionContent =
        sectionContent[
          found
        ];
    }
  }


  /* -------------------------------------------------------
     VALIDATION
  ------------------------------------------------------- */

  if (!normalizedPageKey) {

    throw new Error(
      "Page key is required"
    );
  }


  if (!normalizedSectionKey) {

    throw new Error(
      `Section key is required for page "${normalizedPageKey}".`
    );
  }


  if (
    !sectionContent ||
    typeof sectionContent !== "object" ||
    Array.isArray(sectionContent)
  ) {

    throw new Error(
      "Section content must be an object"
    );
  }


  console.log(
    "=========================================="
  );

  console.log(
    "UPDATING WEBSITE SECTION"
  );

  console.log(
    "Page:",
    normalizedPageKey
  );

  console.log(
    "Section:",
    normalizedSectionKey
  );

  console.log(
    "Content:",
    sectionContent
  );

  console.log(
    "=========================================="
  );


  try {

    const currentResponse =
      await getWebsiteContent();


    let currentContent =
      currentResponse?.content ??
      currentResponse ??
      {};


    let content = {};


    try {

      content =
        JSON.parse(
          JSON.stringify(
            currentContent
          )
        );

    } catch (error) {

      console.error(
        "FAILED TO CLONE WEBSITE CONTENT:",
        error
      );

      content = {};
    }


    /* -----------------------------------------------------
       Ensure page
    ----------------------------------------------------- */

    if (
      !content[
        normalizedPageKey
      ] ||
      typeof content[
        normalizedPageKey
      ] !== "object" ||
      Array.isArray(
        content[
          normalizedPageKey
        ]
      )
    ) {

      content[
        normalizedPageKey
      ] = {};
    }


    /* -----------------------------------------------------
       Home
    ----------------------------------------------------- */

    if (
      normalizedPageKey === "home"
    ) {

      if (
        !content.home[
          normalizedSectionKey
        ] ||
        typeof content.home[
          normalizedSectionKey
        ] !== "object" ||
        Array.isArray(
          content.home[
            normalizedSectionKey
          ]
        )
      ) {

        content.home[
          normalizedSectionKey
        ] = {};
      }


      content.home[
        normalizedSectionKey
      ] = {

        ...content.home[
          normalizedSectionKey
        ],

        ...sectionContent,
      };

    }


    /* -----------------------------------------------------
       Normal page
    ----------------------------------------------------- */

    else {

      content[
        normalizedPageKey
      ] = {

        ...content[
          normalizedPageKey
        ],

        ...sectionContent,
      };
    }


    /* -----------------------------------------------------
       SAVE
    ----------------------------------------------------- */

    const result =
      await updateWebsiteContent(
        content
      );


    console.log(
      "=========================================="
    );

    console.log(
      "WEBSITE SECTION UPDATED SUCCESSFULLY"
    );

    console.log(
      "Page:",
      normalizedPageKey
    );

    console.log(
      "Section:",
      normalizedSectionKey
    );

    console.log(
      "=========================================="
    );


    return result;

  } catch (error) {

    console.error(
      "UPDATE SINGLE WEBSITE SECTION ERROR:",
      error
    );

    throw error;
  }
};


/* =========================================================
   BRANDING
========================================================= */

export const updateBranding = async (
  branding
) => {

  if (
    !branding ||
    typeof branding !== "object" ||
    Array.isArray(branding)
  ) {

    throw new Error(
      "Branding must be an object"
    );
  }


  try {

    console.log(
      "UPDATING WEBSITE BRANDING:",
      branding
    );


    const res =
      await API.put(
        "/websites/branding",
        {
          branding,
        }
      );


    console.log(
      "BRANDING UPDATE RESPONSE:",
      res.data
    );


    return (
      res.data?.data ??
      res.data
    );

  } catch (error) {

    console.error(
      "UPDATE BRANDING ERROR:",
      error
    );

    throw error;
  }
};


/* =========================================================
   PUBLISH WEBSITE
========================================================= */

export const publishWebsite = async () => {

  try {

    const res =
      await API.post(
        "/websites/publish"
      );


    return (
      res.data?.data ??
      res.data
    );

  } catch (error) {

    console.error(
      "PUBLISH WEBSITE ERROR:",
      error
    );

    throw error;
  }
};


/* =========================================================
   UNPUBLISH WEBSITE
========================================================= */

export const unpublishWebsite = async () => {

  try {

    const res =
      await API.post(
        "/websites/unpublish"
      );


    return (
      res.data?.data ??
      res.data
    );

  } catch (error) {

    console.error(
      "UNPUBLISH WEBSITE ERROR:",
      error
    );

    throw error;
  }
};


/* =========================================================
   MEDIA UPLOAD
========================================================= */

export const uploadMedia = async (
  file,
  purpose = "general"
) => {

  if (!file) {

    throw new Error(
      "File is required"
    );
  }


  const formData =
    new FormData();


  formData.append(
    "file",
    file
  );


  formData.append(
    "purpose",
    purpose
  );


  try {

    const res =
      await API.post(
        "/websites/media",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );


    return (
      res.data?.data ??
      res.data
    );

  } catch (error) {

    console.error(
      "UPLOAD WEBSITE MEDIA ERROR:",
      error
    );

    throw error;
  }
};


/* =========================================================
   DELETE MEDIA
========================================================= */

export const deleteMedia = async (
  url
) => {

  if (!url) {

    throw new Error(
      "Media URL is required"
    );
  }


  try {

    const res =
      await API.delete(
        "/websites/media",
        {
          data: {
            url,
          },
        }
      );


    return (
      res.data?.data ??
      res.data
    );

  } catch (error) {

    console.error(
      "DELETE WEBSITE MEDIA ERROR:",
      error
    );

    throw error;
  }
};