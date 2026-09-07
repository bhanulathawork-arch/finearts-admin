// import { useEffect, useRef, useState } from "react";

// import {
//   Plus,
//   Pencil,
//   Trash2,
//   Image as ImageIcon,
//   X,
//   Upload,
//   GripVertical,
//   Eye,
//   EyeOff,
//   Loader2,
//   Save,
// } from "lucide-react";

// import {
//   getInstituteBanners,
//   createInstituteBanner,
//   updateInstituteBanner,
//   deleteInstituteBanner,
// } from "../services/bannerService";


// /* =========================================================
//    PAGE OPTIONS
// ========================================================= */

// const PAGE_OPTIONS = [
//   {
//     value: "HOME",
//     label: "Home",
//   },
//   {
//     value: "CLASS",
//     label: "Class",
//   },
//   {
//     value: "TRAINER",
//     label: "Trainer",
//   },
//   {
//     value: "TESTIMONIAL",
//     label: "Testimonials",
//   },
// ];


// /* =========================================================
//    INITIAL FORM
// ========================================================= */

// const INITIAL_FORM = {
//   banner_type: "HOME",
//   display_order: 1,
//   is_active: true,
// };


// /* =========================================================
//    NORMALIZE ACTIVE STATUS
// ========================================================= */

// const isBannerActive = (value) => {
//   return (
//     value === true ||
//     value === 1 ||
//     value === "1" ||
//     value === "true"
//   );
// };


// /* =========================================================
//    GET PAGE LABEL
// ========================================================= */

// const getPageLabel = (type) => {
//   return (
//     PAGE_OPTIONS.find(
//       (page) => page.value === type
//     )?.label ||
//     type ||
//     "Unknown"
//   );
// };


// /* =========================================================
//    EXTRACT BANNER ARRAY FROM API RESPONSE
// ========================================================= */

// const extractBanners = (response) => {
//   /*
//     Depending on your api.js / backend response,
//     the banners may be available as:

//     response.data
//     response.data.data
//     response.data.banners
//     response.banners
//     response
//   */

//   const possibleData = [
//     response?.data?.data,
//     response?.data?.banners,
//     response?.data,
//     response?.banners,
//     response,
//   ];

//   for (const item of possibleData) {
//     if (Array.isArray(item)) {
//       return item;
//     }
//   }

//   return [];
// };


// /* =========================================================
//    MAIN COMPONENT
// ========================================================= */

// export default function InstituteBanners() {
//   const fileInputRef = useRef(null);

//   const previewUrlRef = useRef(null);


//   /* =======================================================
//      STATE
//   ======================================================= */

//   const [banners, setBanners] = useState([]);

//   const [loading, setLoading] = useState(true);

//   const [submitting, setSubmitting] =
//     useState(false);

//   const [deletingId, setDeletingId] =
//     useState(null);

//   const [error, setError] = useState("");

//   const [success, setSuccess] = useState("");

//   const [showModal, setShowModal] =
//     useState(false);

//   const [editingBanner, setEditingBanner] =
//     useState(null);

//   const [previewImage, setPreviewImage] =
//     useState(null);

//   const [selectedFile, setSelectedFile] =
//     useState(null);

//   const [pageFilter, setPageFilter] =
//     useState("ALL");

//   const [form, setForm] =
//     useState(INITIAL_FORM);


//   /* =========================================================
//      CLEANUP PREVIEW URL
//   ========================================================= */

//   useEffect(() => {
//     return () => {
//       if (previewUrlRef.current) {
//         URL.revokeObjectURL(
//           previewUrlRef.current
//         );
//       }
//     };
//   }, []);


//   /* =========================================================
//      FETCH BANNERS
//   ========================================================= */

//   const fetchBanners = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const response =
//         await getInstituteBanners();

//       console.log(
//         "================================="
//       );

//       console.log(
//         "INSTITUTE BANNERS API RESPONSE:"
//       );

//       console.log(response);

//       console.log(
//         "================================="
//       );


//       const bannerList =
//         extractBanners(response);


//       console.log(
//         "PARSED INSTITUTE BANNERS:",
//         bannerList
//       );


//       setBanners(bannerList);
//     } catch (err) {
//       console.error(
//         "Fetch institute banners error:",
//         err
//       );

//       setBanners([]);

//       setError(
//         err?.response?.data?.message ||
//           err?.message ||
//           "Failed to load banners."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };


//   /* =========================================================
//      INITIAL LOAD
//   ========================================================= */

//   useEffect(() => {
//     fetchBanners();
//   }, []);


//   /* =========================================================
//      RESET PREVIEW URL
//   ========================================================= */

//   const clearPreviewUrl = () => {
//     if (previewUrlRef.current) {
//       URL.revokeObjectURL(
//         previewUrlRef.current
//       );

//       previewUrlRef.current = null;
//     }
//   };


//   /* =========================================================
//      RESET FORM
//   ========================================================= */

//   const resetForm = () => {
//     clearPreviewUrl();

//     setForm({
//       ...INITIAL_FORM,
//       display_order:
//         banners.length + 1,
//     });

//     setSelectedFile(null);

//     setPreviewImage(null);

//     setEditingBanner(null);

//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//   };


//   /* =========================================================
//      CREATE
//   ========================================================= */

//   const handleCreate = () => {
//     clearPreviewUrl();

//     setEditingBanner(null);

//     setSelectedFile(null);

//     setPreviewImage(null);

//     setForm({
//       banner_type: "HOME",
//       display_order:
//         banners.length + 1,
//       is_active: true,
//     });

//     setShowModal(true);

//     setError("");

//     setSuccess("");

//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//   };


//   /* =========================================================
//      EDIT
//   ========================================================= */

//   const handleEdit = (banner) => {
//     clearPreviewUrl();

//     setEditingBanner(banner);

//     setForm({
//       banner_type:
//         banner?.banner_type ||
//         "HOME",

//       display_order:
//         Number(
//           banner?.display_order
//         ) || 1,

//       is_active:
//         isBannerActive(
//           banner?.is_active
//         ),
//     });


//     setSelectedFile(null);


//     setPreviewImage(
//       banner?.image ||
//         banner?.image_url ||
//         null
//     );


//     setShowModal(true);

//     setError("");

//     setSuccess("");


//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//   };


//   /* =========================================================
//      CLOSE MODAL
//   ========================================================= */

//   const closeModal = () => {
//     if (submitting) {
//       return;
//     }

//     setShowModal(false);

//     clearPreviewUrl();

//     setSelectedFile(null);

//     setPreviewImage(null);

//     setEditingBanner(null);

//     setError("");

//     setSuccess("");

//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//   };


//   /* =========================================================
//      INPUT CHANGE
//   ========================================================= */

//   const handleChange = (e) => {
//     const {
//       name,
//       value,
//     } = e.target;


//     setForm((prev) => ({
//       ...prev,

//       [name]:
//         name === "display_order"
//           ? Number(value)
//           : value,
//     }));
//   };


//   /* =========================================================
//      FILE CHANGE
//   ========================================================= */

//   const handleFileChange = (e) => {
//     const file =
//       e.target.files?.[0];


//     if (!file) {
//       return;
//     }


//     /* -------------------------------------------------------
//        FILE TYPE
//     ------------------------------------------------------- */

//     if (
//       ![
//         "image/png",
//         "image/jpeg",
//         "image/jpg",
//         "image/webp",
//       ].includes(file.type)
//     ) {
//       setError(
//         "Please select a PNG, JPG or WEBP image."
//       );

//       e.target.value = "";

//       return;
//     }


//     /* -------------------------------------------------------
//        FILE SIZE
//     ------------------------------------------------------- */

//     const maxSize =
//       5 * 1024 * 1024;


//     if (file.size > maxSize) {
//       setError(
//         "Image size must be less than 5MB."
//       );

//       e.target.value = "";

//       return;
//     }


//     /* -------------------------------------------------------
//        CLEAN OLD PREVIEW
//     ------------------------------------------------------- */

//     clearPreviewUrl();


//     /* -------------------------------------------------------
//        CREATE PREVIEW
//     ------------------------------------------------------- */

//     const preview =
//       URL.createObjectURL(file);


//     previewUrlRef.current = preview;


//     setSelectedFile(file);

//     setPreviewImage(preview);

//     setError("");
//   };


//   /* =========================================================
//      TOGGLE ACTIVE STATUS
//   ========================================================= */

//   const toggleActive = () => {
//     setForm((prev) => ({
//       ...prev,
//       is_active:
//         !prev.is_active,
//     }));
//   };


//   /* =========================================================
//      SUBMIT
//   ========================================================= */

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setError("");

//     setSuccess("");


//     /* -------------------------------------------------------
//        IMAGE VALIDATION
//     ------------------------------------------------------- */

//     if (
//       !editingBanner &&
//       !selectedFile
//     ) {
//       setError(
//         "Please select a banner image."
//       );

//       return;
//     }


//     /* -------------------------------------------------------
//        PAGE VALIDATION
//     ------------------------------------------------------- */

//     if (!form.banner_type) {
//       setError(
//         "Please select a page."
//       );

//       return;
//     }


//     /* -------------------------------------------------------
//        DISPLAY ORDER VALIDATION
//     ------------------------------------------------------- */

//     if (
//       !form.display_order ||
//       Number(form.display_order) < 1
//     ) {
//       setError(
//         "Display order must be at least 1."
//       );

//       return;
//     }


//     try {
//       setSubmitting(true);


//       const formData =
//         new FormData();


//       /* -----------------------------------------------------
//          PAGE TYPE
//       ----------------------------------------------------- */

//       formData.append(
//         "banner_type",
//         form.banner_type
//       );


//       /* -----------------------------------------------------
//          DISPLAY ORDER
//       ----------------------------------------------------- */

//       formData.append(
//         "display_order",
//         String(
//           Number(
//             form.display_order
//           )
//         )
//       );


//       /* -----------------------------------------------------
//          ACTIVE STATUS
//       ----------------------------------------------------- */

//       formData.append(
//         "is_active",
//         String(
//           Boolean(
//             form.is_active
//           )
//         )
//       );


//       /* -----------------------------------------------------
//          TITLE
         
//          Your backend currently requires title.
//          Generate it automatically because the institute
//          user does not need to enter a title.
//       ----------------------------------------------------- */

//       const pageLabel =
//         getPageLabel(
//           form.banner_type
//         );


//       formData.append(
//         "title",
//         `${pageLabel} Banner`
//       );


//       /* -----------------------------------------------------
//          IMAGE
//       ----------------------------------------------------- */

//       if (selectedFile) {
//         formData.append(
//           "image",
//           selectedFile
//         );
//       }


//       /* -----------------------------------------------------
//          DEBUG
//       ----------------------------------------------------- */

//       console.log(
//         "================================="
//       );

//       console.log(
//         editingBanner
//           ? "UPDATING INSTITUTE BANNER"
//           : "CREATING INSTITUTE BANNER"
//       );

//       console.log(
//         "Banner Type:",
//         form.banner_type
//       );

//       console.log(
//         "Display Order:",
//         form.display_order
//       );

//       console.log(
//         "Active:",
//         form.is_active
//       );

//       console.log(
//         "Selected File:",
//         selectedFile
//       );

//       console.log(
//         "================================="
//       );


//       /* -----------------------------------------------------
//          UPDATE
//       ----------------------------------------------------- */

//       if (editingBanner) {
//         await updateInstituteBanner(
//           editingBanner.id,
//           formData
//         );


//         setSuccess(
//           "Banner updated successfully."
//         );
//       }


//       /* -----------------------------------------------------
//          CREATE
//       ----------------------------------------------------- */

//       else {
//         await createInstituteBanner(
//           formData
//         );


//         setSuccess(
//           "Banner created successfully."
//         );
//       }


//       /* -----------------------------------------------------
//          REFRESH
//       ----------------------------------------------------- */

//       await fetchBanners();


//       /* -----------------------------------------------------
//          CLOSE AFTER SUCCESS
//       ----------------------------------------------------- */

//       setTimeout(() => {
//         setShowModal(false);

//         clearPreviewUrl();

//         setSelectedFile(null);

//         setPreviewImage(null);

//         setEditingBanner(null);

//         setSuccess("");

//         if (
//           fileInputRef.current
//         ) {
//           fileInputRef.current.value =
//             "";
//         }
//       }, 700);
//     } catch (err) {
//       console.error(
//         "Save banner error:",
//         err
//       );


//       setError(
//         err?.response?.data?.message ||
//           err?.response?.data?.error ||
//           err?.message ||
//           "Failed to save banner."
//       );
//     } finally {
//       setSubmitting(false);
//     }
//   };


//   /* =========================================================
//      DELETE
//   ========================================================= */

//   const handleDelete = async (id) => {
//     const confirmed =
//       window.confirm(
//         "Are you sure you want to delete this banner?"
//       );


//     if (!confirmed) {
//       return;
//     }


//     try {
//       setDeletingId(id);

//       setError("");

//       setSuccess("");


//       await deleteInstituteBanner(
//         id
//       );


//       /* -----------------------------------------------------
//          REMOVE FROM UI IMMEDIATELY
//       ----------------------------------------------------- */

//       setBanners((prev) =>
//         prev.filter(
//           (banner) =>
//             banner.id !== id
//         )
//       );


//       setSuccess(
//         "Banner deleted successfully."
//       );


//       setTimeout(() => {
//         setSuccess("");
//       }, 2500);
//     } catch (err) {
//       console.error(
//         "Delete banner error:",
//         err
//       );


//       setError(
//         err?.response?.data?.message ||
//           err?.response?.data?.error ||
//           err?.message ||
//           "Failed to delete banner."
//       );
//     } finally {
//       setDeletingId(null);
//     }
//   };


//   /* =========================================================
//      FILTER BANNERS
//   ========================================================= */

//   const filteredBanners =
//     pageFilter === "ALL"
//       ? banners
//       : banners.filter(
//           (banner) =>
//             String(
//               banner?.banner_type
//             ).toUpperCase() ===
//             pageFilter
//         );


//   /* =========================================================
//      SORT BANNERS
//   ========================================================= */

//   const sortedBanners = [
//     ...filteredBanners,
//   ].sort(
//     (a, b) =>
//       Number(
//         a?.display_order || 1
//       ) -
//       Number(
//         b?.display_order || 1
//       )
//   );


//   /* =========================================================
//      RENDER
//   ========================================================= */

//   return (
//     <div className="min-h-screen bg-gray-50 p-5 md:p-7">

//       {/* =====================================================
//           HEADER
//       ===================================================== */}

//       <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

//         <div>

//           <h1 className="text-2xl font-bold text-gray-900">
//             Website Banners
//           </h1>

//           <p className="mt-1 text-sm text-gray-500">
//             Manage banners for your Home, Class,
//             Trainer and Testimonials pages.
//           </p>

//         </div>


//         <button
//           type="button"
//           onClick={handleCreate}
//           className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
//         >
//           <Plus size={18} />

//           Create Banner
//         </button>

//       </div>


//       {/* =====================================================
//           ALERTS
//       ===================================================== */}

//       {error && !showModal && (
//         <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
//           {error}
//         </div>
//       )}


//       {success && !showModal && (
//         <div className="mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
//           {success}
//         </div>
//       )}


//       {/* =====================================================
//           FILTERS
//       ===================================================== */}

//       <div className="mb-6 overflow-x-auto">

//         <div className="inline-flex min-w-full rounded-lg border border-gray-200 bg-white p-1 sm:min-w-0">

//           <FilterButton
//             active={
//               pageFilter === "ALL"
//             }
//             onClick={() =>
//               setPageFilter("ALL")
//             }
//           >
//             All
//           </FilterButton>


//           {PAGE_OPTIONS.map(
//             (page) => (
//               <FilterButton
//                 key={page.value}
//                 active={
//                   pageFilter ===
//                   page.value
//                 }
//                 onClick={() =>
//                   setPageFilter(
//                     page.value
//                   )
//                 }
//               >
//                 {page.label}
//               </FilterButton>
//             )
//           )}

//         </div>

//       </div>


//       {/* =====================================================
//           LOADING
//       ===================================================== */}

//       {loading ? (

//         <div className="flex min-h-[350px] items-center justify-center rounded-xl border border-gray-200 bg-white">

//           <div className="flex flex-col items-center">

//             <Loader2
//               size={32}
//               className="animate-spin text-blue-600"
//             />

//             <p className="mt-3 text-sm text-gray-500">
//               Loading banners...
//             </p>

//           </div>

//         </div>

//       ) : sortedBanners.length === 0 ? (

//         /* ===================================================
//            EMPTY STATE
//         =================================================== */

//         <div className="rounded-xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">

//           <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-600">

//             <ImageIcon size={27} />

//           </div>


//           <h2 className="mt-4 text-lg font-semibold text-gray-900">
//             No banners found
//           </h2>


//           <p className="mx-auto mt-1 max-w-md text-sm text-gray-500">

//             {pageFilter === "ALL"
//               ? "Create a banner to display it on your institute website."
//               : `No ${getPageLabel(
//                   pageFilter
//                 )} banners have been created yet.`}

//           </p>


//           <button
//             type="button"
//             onClick={handleCreate}
//             className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
//           >
//             <Plus size={17} />

//             Create Banner
//           </button>

//         </div>

//       ) : (

//         /* ===================================================
//            BANNER LIST
//         =================================================== */

//         <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

//           {sortedBanners.map(
//             (banner) => (
//               <BannerCard
//                 key={banner.id}
//                 banner={banner}
//                 pageLabel={getPageLabel(
//                   banner?.banner_type
//                 )}
//                 onEdit={() =>
//                   handleEdit(
//                     banner
//                   )
//                 }
//                 onDelete={() =>
//                   handleDelete(
//                     banner.id
//                   )
//                 }
//                 deleting={
//                   deletingId ===
//                   banner.id
//                 }
//               />
//             )
//           )}

//         </div>

//       )}


//       {/* =====================================================
//           CREATE / EDIT MODAL
//       ===================================================== */}

//       {showModal && (

//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

//           <div className="max-h-[95vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

//             {/* =================================================
//                 MODAL HEADER
//             ================================================= */}

//             <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">

//               <div>

//                 <h2 className="text-lg font-bold text-gray-900">

//                   {editingBanner
//                     ? "Edit Banner"
//                     : "Create Banner"}

//                 </h2>


//                 <p className="mt-0.5 text-xs text-gray-500">
//                   Add a banner to your institute website.
//                 </p>

//               </div>


//               <button
//                 type="button"
//                 onClick={closeModal}
//                 disabled={submitting}
//                 className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
//               >
//                 <X size={20} />
//               </button>

//             </div>


//             {/* =================================================
//                 FORM
//             ================================================= */}

//             <form
//               onSubmit={
//                 handleSubmit
//               }
//               className="p-6"
//             >

//               {/* -------------------------------------------------
//                   ERROR
//               ------------------------------------------------- */}

//               {error && (
//                 <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
//                   {error}
//                 </div>
//               )}


//               {/* -------------------------------------------------
//                   SUCCESS
//               ------------------------------------------------- */}

//               {success && (
//                 <div className="mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
//                   {success}
//                 </div>
//               )}


//               {/* =================================================
//                   PAGE
//               ================================================= */}

//               <div className="mb-5">

//                 <label className="mb-2 block text-sm font-semibold text-gray-700">
//                   Page
//                 </label>


//                 <select
//                   name="banner_type"
//                   value={
//                     form.banner_type
//                   }
//                   onChange={
//                     handleChange
//                   }
//                   disabled={
//                     submitting
//                   }
//                   className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
//                 >

//                   {PAGE_OPTIONS.map(
//                     (page) => (
//                       <option
//                         key={
//                           page.value
//                         }
//                         value={
//                           page.value
//                         }
//                       >
//                         {page.label}
//                       </option>
//                     )
//                   )}

//                 </select>

//               </div>


//               {/* =================================================
//                   IMAGE
//               ================================================= */}

//               <div className="mb-5">

//                 <label className="mb-2 block text-sm font-semibold text-gray-700">

//                   Banner Image

//                   {!editingBanner && (
//                     <span className="ml-1 text-red-500">
//                       *
//                     </span>
//                   )}

//                 </label>


//                 <div
//                   onClick={() =>
//                     !submitting &&
//                     fileInputRef.current?.click()
//                   }
//                   className={`group relative flex min-h-[230px] items-center justify-center overflow-hidden rounded-xl border-2 border-dashed bg-gray-50 transition ${
//                     submitting
//                       ? "cursor-not-allowed border-gray-200"
//                       : "cursor-pointer border-gray-300 hover:border-blue-400 hover:bg-blue-50"
//                   }`}
//                 >

//                   {previewImage ? (

//                     <>
//                       <img
//                         src={
//                           previewImage
//                         }
//                         alt="Banner preview"
//                         className="absolute inset-0 h-full w-full object-cover"
//                       />


//                       {!submitting && (
//                         <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition group-hover:opacity-100">

//                           <div className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-gray-800 shadow">
//                             Change Image
//                           </div>

//                         </div>
//                       )}

//                     </>

//                   ) : (

//                     <div className="text-center">

//                       <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">

//                         <Upload
//                           size={23}
//                         />

//                       </div>


//                       <p className="mt-3 text-sm font-semibold text-gray-700">
//                         Upload Banner Image
//                       </p>


//                       <p className="mt-1 text-xs text-gray-500">
//                         PNG, JPG or WEBP · Max 5MB
//                       </p>

//                     </div>

//                   )}

//                 </div>


//                 <input
//                   ref={
//                     fileInputRef
//                   }
//                   type="file"
//                   accept="image/png,image/jpeg,image/jpg,image/webp"
//                   onChange={
//                     handleFileChange
//                   }
//                   disabled={
//                     submitting
//                   }
//                   className="hidden"
//                 />


//                 {selectedFile && (
//                   <p className="mt-2 text-xs text-gray-500">

//                     Selected:

//                     <span className="ml-1 font-medium text-gray-700">
//                       {
//                         selectedFile.name
//                       }
//                     </span>

//                   </p>
//                 )}

//               </div>


//               {/* =================================================
//                   DISPLAY ORDER
//               ================================================= */}

//               <div className="mb-5">

//                 <label className="mb-2 block text-sm font-semibold text-gray-700">
//                   Display Order
//                 </label>


//                 <input
//                   type="number"
//                   name="display_order"
//                   min="1"
//                   value={
//                     form.display_order
//                   }
//                   onChange={
//                     handleChange
//                   }
//                   disabled={
//                     submitting
//                   }
//                   className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
//                 />


//                 <p className="mt-1 text-xs text-gray-500">
//                   Lower numbers appear first.
//                 </p>

//               </div>


//               {/* =================================================
//                   STATUS
//               ================================================= */}

//               <div className="mb-6">

//                 <label className="mb-2 block text-sm font-semibold text-gray-700">
//                   Status
//                 </label>


//                 <button
//                   type="button"
//                   onClick={
//                     toggleActive
//                   }
//                   disabled={
//                     submitting
//                   }
//                   className={`flex w-full items-center justify-between rounded-lg border px-4 py-3 text-left transition ${
//                     form.is_active
//                       ? "border-green-200 bg-green-50"
//                       : "border-gray-200 bg-gray-50"
//                   } disabled:cursor-not-allowed disabled:opacity-60`}
//                 >

//                   <div className="flex items-center gap-3">

//                     <div
//                       className={`flex h-9 w-9 items-center justify-center rounded-full ${
//                         form.is_active
//                           ? "bg-green-100 text-green-600"
//                           : "bg-gray-200 text-gray-500"
//                       }`}
//                     >

//                       {form.is_active ? (
//                         <Eye size={17} />
//                       ) : (
//                         <EyeOff size={17} />
//                       )}

//                     </div>


//                     <div>

//                       <p className="text-sm font-semibold text-gray-800">

//                         {form.is_active
//                           ? "Active"
//                           : "Inactive"}

//                       </p>


//                       <p className="text-xs text-gray-500">

//                         {form.is_active
//                           ? "Banner will be visible on the website."
//                           : "Banner will be hidden from the website."}

//                       </p>

//                     </div>

//                   </div>


//                   {/* Toggle */}

//                   <div
//                     className={`relative h-6 w-11 rounded-full transition ${
//                       form.is_active
//                         ? "bg-green-500"
//                         : "bg-gray-300"
//                     }`}
//                   >

//                     <span
//                       className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${
//                         form.is_active
//                           ? "left-[22px]"
//                           : "left-0.5"
//                       }`}
//                     />

//                   </div>

//                 </button>

//               </div>


//               {/* =================================================
//                   ACTIONS
//               ================================================= */}

//               <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-5 sm:flex-row sm:justify-end">

//                 <button
//                   type="button"
//                   onClick={
//                     closeModal
//                   }
//                   disabled={
//                     submitting
//                   }
//                   className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
//                 >
//                   Cancel
//                 </button>


//                 <button
//                   type="submit"
//                   disabled={
//                     submitting
//                   }
//                   className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
//                 >

//                   {submitting ? (

//                     <>
//                       <Loader2
//                         size={17}
//                         className="animate-spin"
//                       />

//                       Saving...
//                     </>

//                   ) : (

//                     <>
//                       {editingBanner ? (
//                         <Save
//                           size={17}
//                         />
//                       ) : (
//                         <Plus
//                           size={17}
//                         />
//                       )}


//                       {editingBanner
//                         ? "Update Banner"
//                         : "Create Banner"}

//                     </>

//                   )}

//                 </button>

//               </div>

//             </form>

//           </div>

//         </div>

//       )}

//     </div>
//   );
// }


// /* ===========================================================
//    FILTER BUTTON
// =========================================================== */

// function FilterButton({
//   active,
//   onClick,
//   children,
// }) {
//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       className={`whitespace-nowrap rounded-md px-4 py-2 text-xs font-semibold transition ${
//         active
//           ? "bg-blue-600 text-white shadow-sm"
//           : "text-gray-600 hover:bg-gray-100"
//       }`}
//     >
//       {children}
//     </button>
//   );
// }


// /* ===========================================================
//    BANNER CARD
// =========================================================== */

// function BannerCard({
//   banner,
//   pageLabel,
//   onEdit,
//   onDelete,
//   deleting,
// }) {
//   const image =
//     banner?.image ||
//     banner?.image_url ||
//     null;


//   const active =
//     isBannerActive(
//       banner?.is_active
//     );


//   return (
//     <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">

//       {/* =====================================================
//           IMAGE
//       ===================================================== */}

//       <div className="relative h-[210px] bg-gray-100">

//         {image ? (

//           <img
//             src={image}
//             alt={
//               banner?.title ||
//               `${pageLabel} Banner`
//             }
//             className="h-full w-full object-cover"
//           />

//         ) : (

//           <div className="flex h-full items-center justify-center text-gray-400">

//             <ImageIcon
//               size={42}
//             />

//           </div>

//         )}


//         {/* ---------------------------------------------------
//             PAGE BADGE
//         --------------------------------------------------- */}

//         <div className="absolute left-3 top-3 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-gray-800 shadow-sm">

//           {pageLabel}

//         </div>


//         {/* ---------------------------------------------------
//             STATUS
//         --------------------------------------------------- */}

//         <div
//           className={`absolute right-3 top-3 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold shadow-sm ${
//             active
//               ? "bg-green-100 text-green-700"
//               : "bg-gray-100 text-gray-600"
//           }`}
//         >

//           <span
//             className={`h-1.5 w-1.5 rounded-full ${
//               active
//                 ? "bg-green-500"
//                 : "bg-gray-400"
//             }`}
//           />


//           {active
//             ? "Active"
//             : "Inactive"}

//         </div>

//       </div>


//       {/* =====================================================
//           CONTENT
//       ===================================================== */}

//       <div className="p-4">

//         <div className="flex items-center justify-between gap-4">

//           {/* -------------------------------------------------
//               DISPLAY ORDER
//           ------------------------------------------------- */}

//           <div>

//             <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
//               Display Order
//             </p>


//             <div className="mt-1 flex items-center gap-2">

//               <GripVertical
//                 size={15}
//                 className="text-gray-400"
//               />


//               <span className="text-lg font-bold text-gray-900">
//                 {Number(
//                   banner?.display_order
//                 ) || 1}
//               </span>

//             </div>

//           </div>


//           {/* -------------------------------------------------
//               PAGE
//           ------------------------------------------------- */}

//           <div className="text-right">

//             <p className="text-xs text-gray-400">
//               Page
//             </p>


//             <p className="mt-1 text-sm font-semibold text-gray-800">
//               {pageLabel}
//             </p>

//           </div>

//         </div>


//         {/* ===================================================
//             ACTIONS
//         =================================================== */}

//         <div className="mt-4 flex gap-2 border-t border-gray-100 pt-4">

//           {/* EDIT */}

//           <button
//             type="button"
//             onClick={onEdit}
//             disabled={deleting}
//             className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
//           >

//             <Pencil size={14} />

//             Edit

//           </button>


//           {/* DELETE */}

//           <button
//             type="button"
//             onClick={onDelete}
//             disabled={deleting}
//             className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
//           >

//             {deleting ? (

//               <Loader2
//                 size={14}
//                 className="animate-spin"
//               />

//             ) : (

//               <Trash2
//                 size={14}
//               />

//             )}


//             Delete

//           </button>

//         </div>

//       </div>

//     </div>
//   );
// }


import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Edit, Trash2, Search } from "lucide-react";
import { FaTrash, FaTimes } from "react-icons/fa";

import {
  getInstituteBanners,
  createInstituteBanner,
  updateInstituteBanner,
  deleteInstituteBanner,
} from "../services/bannerService";

/* =========================================================
   PAGE OPTIONS
========================================================= */

const PAGE_OPTIONS = [
  { value: "HOME", label: "Home" },
  { value: "CLASS", label: "Class" },
  { value: "SESSION", label: "Session" },
  { value: "TRAINER", label: "Trainer" },
  { value: "TESTIMONIAL", label: "Testimonials" },
  { value: "ABOUT", label: "About" },
];

/* =========================================================
   HELPERS
========================================================= */

const getPageLabel = (type) =>
  PAGE_OPTIONS.find((page) => page.value === type)?.label ||
  type ||
  "-";

const isActive = (value) =>
  value === true ||
  value === 1 ||
  value === "1" ||
  value === "true";

const truncate = (text, max = 45) => {
  if (!text) return "-";
  return text.length > max ? `${text.slice(0, max)}...` : text;
};

const getImageUrl = (image) => {
  if (!image) return "";

  if (typeof image !== "string") return "";

  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }

  return `https://finearts-backend.onrender.com${image}`;
};

const extractBanners = (response) => {
  const possible = [
    response?.data?.data,
    response?.data?.banners,
    response?.data,
    response?.banners,
    response,
  ];

  for (const item of possible) {
    if (Array.isArray(item)) {
      return item;
    }
  }

  return [];
};

/* =========================================================
   DEFAULT FORM
========================================================= */

const DEFAULT_FORM = {
  banner_type: "HOME",
  title: "",
  display_order: 1,
  is_active: true,
};

/* =========================================================
   COMPONENT
========================================================= */

export default function InstituteBanners() {
  const [banners, setBanners] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingBanner, setDeletingBanner] = useState(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  const [formData, setFormData] = useState(DEFAULT_FORM);

  /* =========================================================
     FETCH BANNERS
  ========================================================= */

  const fetchBanners = async () => {
    try {
      setLoading(true);

      const response = await getInstituteBanners();

      console.log("INSTITUTE BANNERS RESPONSE:", response);

      const data = extractBanners(response);

      console.log("INSTITUTE BANNERS:", data);

      setBanners(data);
    } catch (error) {
      console.error("Fetch banners error:", error);

      setBanners([]);

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to fetch banners"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  /* =========================================================
     SEARCH
  ========================================================= */

  const filteredBanners = banners.filter((banner) => {
    const query = searchQuery.toLowerCase().trim();

    if (!query) return true;

    return (
      String(banner?.id || "").includes(query) ||
      banner?.title?.toLowerCase().includes(query) ||
      banner?.banner_type?.toLowerCase().includes(query) ||
      getPageLabel(banner?.banner_type)
        .toLowerCase()
        .includes(query) ||
      String(banner?.display_order || "").includes(query)
    );
  });

  /* =========================================================
     CREATE
  ========================================================= */

  const handleCreate = () => {
    setEditingBanner(null);

    setFormData({
      ...DEFAULT_FORM,
      display_order: banners.length + 1,
    });

    setSelectedFile(null);
    setPreviewImage("");

    setShowModal(true);
  };

  /* =========================================================
     EDIT
  ========================================================= */

  const handleEdit = (banner) => {
    setEditingBanner(banner);

    setFormData({
      banner_type: banner?.banner_type || "HOME",
      title: banner?.title || "",
      display_order: Number(banner?.display_order) || 1,
      is_active: isActive(banner?.is_active),
    });

    setSelectedFile(null);

    setPreviewImage(
      banner?.image ||
        banner?.image_url ||
        ""
    );

    setShowModal(true);
  };

  /* =========================================================
     FILE CHANGE
  ========================================================= */

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Please select PNG, JPG or WEBP image");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      event.target.value = "";
      return;
    }

    setSelectedFile(file);

    setPreviewImage(URL.createObjectURL(file));
  };

  /* =========================================================
     SUBMIT
  ========================================================= */

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.banner_type) {
      toast.error("Please select a page");
      return;
    }

    if (!formData.title.trim()) {
      toast.error("Banner title is required");
      return;
    }

    if (!editingBanner && !selectedFile) {
      toast.error("Banner image is required");
      return;
    }

    try {
      setSubmitting(true);

      const payload = new FormData();

      payload.append("banner_type", formData.banner_type);
      payload.append("title", formData.title.trim());
      payload.append(
        "display_order",
        String(Number(formData.display_order) || 1)
      );
      payload.append(
        "is_active",
        String(Boolean(formData.is_active))
      );

      if (selectedFile) {
        payload.append("image", selectedFile);
      }

      if (editingBanner?.id) {
        await updateInstituteBanner(
          editingBanner.id,
          payload
        );

        toast.success("Banner updated successfully");
      } else {
        await createInstituteBanner(payload);

        toast.success("Banner created successfully");
      }

      await fetchBanners();

      closeModal();
    } catch (error) {
      console.error("Save banner error:", error);

      toast.error(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          error?.message ||
          "Failed to save banner"
      );
    } finally {
      setSubmitting(false);
    }
  };

  /* =========================================================
     DELETE
  ========================================================= */

  const handleDelete = (banner) => {
    setDeletingBanner(banner);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!deletingBanner?.id) return;

    try {
      await deleteInstituteBanner(deletingBanner.id);

      toast.success("Banner deleted successfully");

      setBanners((previous) =>
        previous.filter(
          (banner) =>
            banner.id !== deletingBanner.id
        )
      );
    } catch (error) {
      console.error("Delete banner error:", error);

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Delete failed"
      );
    } finally {
      setShowDeleteModal(false);
      setDeletingBanner(null);
    }
  };

  /* =========================================================
     CLOSE MODAL
  ========================================================= */

  const closeModal = () => {
    if (submitting) return;

    setShowModal(false);
    setEditingBanner(null);
    setSelectedFile(null);
    setPreviewImage("");
    setFormData(DEFAULT_FORM);
  };

  /* =========================================================
     INPUT STYLES
  ========================================================= */

  const inputClass =
    "w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors";

  const labelClass =
    "block text-sm text-white mb-1";

  /* =========================================================
     JSX
  ========================================================= */

  return (
    <div className="p-8 text-white">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">

        <div>
          <h1 className="text-4xl font-bold text-purple-400">
            Institute Banners
          </h1>

          <p className="text-white mt-2">
            Manage your website banners
          </p>
        </div>

        <button
          onClick={handleCreate}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition-opacity"
        >
          + Add Banner
        </button>

      </div>

      {/* =====================================================
          SEARCH
      ===================================================== */}

      <div className="mb-6">

        <div className="relative w-full">

          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white pointer-events-none"
            size={18}
          />

          <input
            type="text"
            placeholder="Search by page, title or ID..."
            value={searchQuery}
            onChange={(event) =>
              setSearchQuery(event.target.value)
            }
            className="w-full pl-12 pr-10 py-3.5 rounded-xl bg-[#151519] border border-[#2c2c35] text-white placeholder-white focus:outline-none focus:border-purple-500/60 transition-colors text-sm"
          />

          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
            >
              <FaTimes size={14} />
            </button>
          )}

        </div>

      </div>

      {/* =====================================================
          TABLE
          IMPORTANT: NO CARD / GRID VIEW HERE
      ===================================================== */}

      <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-[#202027] text-white">

              <tr>

                <th className="p-4 text-left whitespace-nowrap">
                  ID
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Image
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Page
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Banner Title
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Display Order
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Status
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {loading ? (

                <tr>

                  <td
                    colSpan={7}
                    className="p-12 text-center text-gray-500"
                  >
                    Loading banners...
                  </td>

                </tr>

              ) : filteredBanners.length === 0 ? (

                <tr>

                  <td
                    colSpan={7}
                    className="p-12 text-center"
                  >

                    <div className="flex flex-col items-center gap-3">

                      <Search
                        size={40}
                        className="text-gray-600"
                      />

                      <p className="text-gray-500 text-lg">
                        {searchQuery
                          ? "No banners found matching your search"
                          : "No banners available"}
                      </p>

                      {searchQuery && (
                        <button
                          type="button"
                          onClick={() =>
                            setSearchQuery("")
                          }
                          className="text-purple-400 hover:text-purple-300 text-sm"
                        >
                          Clear search
                        </button>
                      )}

                    </div>

                  </td>

                </tr>

              ) : (

                filteredBanners.map((banner) => (

                  <tr
                    key={banner.id}
                    className="border-t border-[#2c2c35] hover:bg-[#1a1a20] transition-colors"
                  >

                    {/* ID */}
                    <td className="p-4 text-white whitespace-nowrap">
                      {banner.id}
                    </td>

                    {/* IMAGE */}
                    <td className="p-4">

                      {banner?.image ||
                      banner?.image_url ? (

                        <img
                          src={getImageUrl(
                            banner.image ||
                              banner.image_url
                          )}
                          alt={
                            banner.title ||
                            "Banner"
                          }
                          className="w-16 h-11 rounded-lg object-cover border border-[#333]"
                          onError={(event) => {
                            event.currentTarget.style.display =
                              "none";
                          }}
                        />

                      ) : (

                        <div className="w-16 h-11 bg-[#26262b] rounded-lg flex items-center justify-center text-gray-600 text-xs">
                          N/A
                        </div>

                      )}

                    </td>

                    {/* PAGE */}
                    <td className="p-4 whitespace-nowrap">

                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300">
                        {getPageLabel(
                          banner.banner_type
                        )}
                      </span>

                    </td>

                    {/* TITLE */}
                    <td
                      className="p-4 font-medium whitespace-nowrap max-w-[220px] truncate"
                      title={banner.title || ""}
                    >
                      {truncate(
                        banner.title,
                        35
                      )}
                    </td>

                    {/* DISPLAY ORDER */}
                    <td className="p-4 font-semibold whitespace-nowrap">
                      {banner.display_order ?? 1}
                    </td>

                    {/* STATUS */}
                    <td className="p-4 whitespace-nowrap">

                      {isActive(
                        banner.is_active
                      ) ? (

                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-300">
                          Active
                        </span>

                      ) : (

                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-500/20 text-gray-300">
                          Inactive
                        </span>

                      )}

                    </td>

                    {/* ACTIONS */}
                    <td className="p-4">

                      <div className="flex items-center gap-2">

                        <button
                          type="button"
                          onClick={() =>
                            handleEdit(banner)
                          }
                          className="p-2 rounded-lg hover:bg-[#2a2a35] transition-colors group"
                          title="Edit"
                        >
                          <Edit
                            size={16}
                            className="text-white group-hover:text-purple-300"
                          />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(banner)
                          }
                          className="p-2 rounded-lg hover:bg-red-500/10 transition-colors group"
                          title="Delete"
                        >
                          <Trash2
                            size={16}
                            className="text-red-500/70 group-hover:text-red-400"
                          />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* =====================================================
          ADD / EDIT MODAL
      ===================================================== */}

      {showModal && (

        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">

          <div className="w-full max-w-[650px] max-h-[90vh] bg-[#211c30] rounded-2xl overflow-hidden shadow-2xl">

            <div className="flex justify-between items-center p-6 border-b border-[#3a3448]">

              <h2 className="text-2xl font-bold text-white">
                {editingBanner
                  ? "Edit Banner"
                  : "Add Banner"}
              </h2>

              <button
                type="button"
                onClick={closeModal}
                disabled={submitting}
                className="text-white hover:text-purple-300"
              >
                <FaTimes size={20} />
              </button>

            </div>

            <div className="overflow-y-auto max-h-[75vh] p-6">

              <form
                onSubmit={handleSubmit}
                className="space-y-1"
              >

                {/* PAGE */}
                <div>
                  <label className={labelClass}>
                    Page *
                  </label>

                  <select
                    value={formData.banner_type}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        banner_type:
                          event.target.value,
                      })
                    }
                    className={inputClass}
                    disabled={submitting}
                  >
                    {PAGE_OPTIONS.map(
                      (page) => (
                        <option
                          key={page.value}
                          value={page.value}
                        >
                          {page.label}
                        </option>
                      )
                    )}
                  </select>
                </div>

                {/* TITLE */}
                <div>
                  <label className={labelClass}>
                    Banner Title *
                  </label>

                  <input
                    value={formData.title}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        title:
                          event.target.value,
                      })
                    }
                    className={inputClass}
                    placeholder="Enter banner title"
                    disabled={submitting}
                    required
                  />
                </div>

                {/* IMAGE */}
                <div>

                  <label className={labelClass}>
                    Banner Image
                    {!editingBanner && (
                      <span className="text-red-500">
                        {" "}*
                      </span>
                    )}
                  </label>

                  {previewImage && (
                    <img
                      src={
                        previewImage.startsWith(
                          "blob:"
                        )
                          ? previewImage
                          : getImageUrl(
                              previewImage
                            )
                      }
                      alt="Preview"
                      className="w-full h-40 object-cover rounded-xl mb-3 border border-[#333]"
                    />
                  )}

                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    onChange={
                      handleFileChange
                    }
                    disabled={submitting}
                    className="w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-500/20 file:text-purple-300"
                  />

                </div>

                {/* DISPLAY ORDER */}
                <div>

                  <label className={labelClass}>
                    Display Order
                  </label>

                  <input
                    type="number"
                    min="1"
                    value={formData.display_order}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        display_order:
                          event.target.value,
                      })
                    }
                    className={inputClass}
                    disabled={submitting}
                  />

                </div>

                {/* STATUS */}
                <div>

                  <label className={labelClass}>
                    Status
                  </label>

                  <select
                    value={
                      formData.is_active
                        ? "true"
                        : "false"
                    }
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        is_active:
                          event.target.value ===
                          "true",
                      })
                    }
                    className={inputClass}
                    disabled={submitting}
                  >
                    <option value="true">
                      Active
                    </option>

                    <option value="false">
                      Inactive
                    </option>
                  </select>

                </div>

                {/* BUTTONS */}
                <div className="flex justify-end gap-3 pt-4 border-t border-[#3a3448]">

                  <button
                    type="button"
                    onClick={closeModal}
                    disabled={submitting}
                    className="px-5 py-3 rounded-xl border border-gray-600 text-gray-300 hover:bg-[#2b2638]"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 disabled:opacity-50"
                  >
                    {submitting
                      ? "Saving..."
                      : editingBanner
                      ? "Update Banner"
                      : "Add Banner"}
                  </button>

                </div>

              </form>

            </div>

          </div>

        </div>

      )}

      {/* =====================================================
          DELETE MODAL
      ===================================================== */}

      {showDeleteModal && (

        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50">

          <div className="w-full max-w-[400px] bg-[#1e1b2e] border border-[#2e2a42] rounded-2xl shadow-2xl overflow-hidden">

            <div className="p-8 flex flex-col items-center">

              <div className="w-14 h-14 rounded-full bg-red-500/15 flex items-center justify-center mb-5">
                <FaTrash className="text-red-400 text-lg" />
              </div>

              <h2 className="text-xl font-bold text-white mb-3 text-center">
                Delete Banner
              </h2>

              <p className="text-white text-center text-sm leading-relaxed mb-8">
                Are you sure you want to delete this banner?
              </p>

              <div className="flex gap-3 w-full">

                <button
                  type="button"
                  onClick={() => {
                    setShowDeleteModal(false);
                    setDeletingBanner(null);
                  }}
                  className="flex-1 px-5 py-3 rounded-xl border border-[#3a3650] text-gray-300 hover:bg-[#2a2640]"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={confirmDelete}
                  className="flex-1 px-5 py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold hover:opacity-90"
                >
                  Delete
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}