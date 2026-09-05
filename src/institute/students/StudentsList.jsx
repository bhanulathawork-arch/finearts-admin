// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Plus, Search, Trash2, X } from "lucide-react";
// import toast from "react-hot-toast";
// import { getInstituteStudents, deleteStudentByInstitute } from "../../services/studentService";
// import StudentTable from "../../components/students/StudentTable";
// import StudentSearch from "../../components/students/StudentSearch";

// export default function StudentsList() {
//   const navigate = useNavigate();
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showSearchModal, setShowSearchModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [deleteId, setDeleteId] = useState(null);
//   const [deleting, setDeleting] = useState(false);

//   // const fetchStudents = async () => {
//   //   try {
//   //     setLoading(true);
//   //     const res = await getInstituteStudents();
//   //     setStudents(res.data || []);
//   //   } catch (err) { toast.error("Failed to load students"); } 
//   //   finally { setLoading(false); }
//   // };

//   const fetchStudents = async () => {
//   try {
//     setLoading(true);

//     const res = await getInstituteStudents();

//     console.log("Students API result:", res);

//     // getInstituteStudents() should return an array
//     if (Array.isArray(res)) {
//       setStudents(res);
//     } else if (Array.isArray(res?.data)) {
//       setStudents(res.data);
//     } else if (Array.isArray(res?.students)) {
//       setStudents(res.students);
//     } else {
//       setStudents([]);
//     }

//   } catch (err) {
//     console.error("Failed to load students:", err);

//     setStudents([]);

//     toast.error(
//       err?.response?.data?.message ||
//       "Failed to load students"
//     );
//   } finally {
//     setLoading(false);
//   }
// };

//   useEffect(() => { fetchStudents(); }, []);

//   const handleDelete = async () => {
//     if (!deleteId) return;
//     setDeleting(true);
//     try {
//       await deleteStudentByInstitute(deleteId);
//       toast.success("Student deactivated successfully");
//       setShowDeleteModal(false);
//       fetchStudents();
//     } catch (err) { toast.error(err.response?.data?.message || "Delete failed"); } 
//     finally { setDeleting(false); }
//   };

//   return (
//     <div className="p-8 text-white">
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//         <div>
//           <h1 className="text-4xl font-bold text-purple-400">Students</h1>
//           <p className="text-gray-400 mt-2">Manage your institute students</p>
//         </div>
//         <div className="flex gap-3">
//           <button onClick={() => setShowSearchModal(true)} className="px-4 py-3 rounded-xl border border-[#2c2c35] text-gray-300 hover:bg-[#1a1a20] transition-colors flex items-center gap-2"><Search size={18} /> Search Mobile</button>
//           <button onClick={() => navigate("/institute/students/register")} className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition-opacity flex items-center gap-2"><Plus size={20} /> Register Student</button>
//         </div>
//       </div>

//       <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl overflow-hidden">
//         <StudentTable students={students} loading={loading} onView={(id) => navigate(`/institute/students/${id}`)} onEdit={(id) => navigate(`/institute/students/${id}/edit`)} onDelete={(id) => { setDeleteId(id); setShowDeleteModal(true); }} />
//       </div>

//       <StudentSearch isOpen={showSearchModal} onClose={() => setShowSearchModal(false)} onSuccess={fetchStudents} />

//       {showDeleteModal && (
//         <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50">
//           <div className="w-full max-w-[400px] bg-[#1e1b2e] border border-[#2e2a42] rounded-2xl shadow-2xl p-8 text-center">
//             <div className="w-14 h-14 rounded-full bg-red-500/15 flex items-center justify-center mb-5 mx-auto"><Trash2 className="text-red-400" size={20} /></div>
//             <h2 className="text-xl font-bold text-white mb-3">Deactivate Student</h2>
//             <p className="text-gray-400 text-sm mb-8">Are you sure? The student will be marked as inactive.</p>
//             <div className="flex gap-3">
//               <button onClick={() => setShowDeleteModal(false)} className="flex-1 px-5 py-3 rounded-xl border border-[#3a3650] text-gray-300 hover:bg-[#2a2640] transition-colors font-medium text-sm">Cancel</button>
//               <button onClick={handleDelete} disabled={deleting} className="flex-1 px-5 py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold hover:opacity-90 disabled:opacity-50 text-sm">{deleting ? "..." : "Yes, Deactivate"}</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



// import { useEffect, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Plus,
//   Search,
//   Trash2,
//   Globe,
//   Building2,
// } from "lucide-react";
// import toast from "react-hot-toast";

// import {
//   getInstituteStudents,
//   deleteStudentByInstitute,
// } from "../../services/studentService";

// import StudentTable from "../../components/students/StudentTable";
// import StudentSearch from "../../components/students/StudentSearch";


// export default function StudentsList() {
//   const navigate = useNavigate();

//   /* =====================================================
//      STATE
//   ===================================================== */

//   const [students, setStudents] = useState([]);

//   const [loading, setLoading] = useState(true);

//   const [showSearchModal, setShowSearchModal] =
//     useState(false);

//   const [showDeleteModal, setShowDeleteModal] =
//     useState(false);

//   const [deleteId, setDeleteId] =
//     useState(null);

//   const [deleting, setDeleting] =
//     useState(false);

//   /*
//    * ALL is the default.
//    *
//    * Available:
//    * ALL
//    * ONLINE
//    * OFFLINE
//    */
//   const [studentType, setStudentType] =
//     useState("ALL");


//   /* =====================================================
//      FETCH STUDENTS
//   ===================================================== */

//   const fetchStudents = async () => {
//     try {
//       setLoading(true);

//       const res =
//         await getInstituteStudents();

//       console.log(
//         "Institute Students API:",
//         res
//       );


//       let data = [];


//       /* =================================================
//          HANDLE DIFFERENT API RESPONSE FORMATS
//       ================================================= */

//       if (Array.isArray(res)) {
//         data = res;

//       } else if (
//         Array.isArray(res?.data)
//       ) {
//         data = res.data;

//       } else if (
//         Array.isArray(res?.students)
//       ) {
//         data = res.students;
//       }


//       console.log(
//         "Normalized students:",
//         data
//       );


//       setStudents(data);

//     } catch (err) {

//       console.error(
//         "Failed to load students:",
//         err
//       );

//       setStudents([]);

//       toast.error(
//         err?.response?.data?.message ||
//         err?.message ||
//         "Failed to load students"
//       );

//     } finally {

//       setLoading(false);

//     }
//   };


//   /* =====================================================
//      INITIAL LOAD
//   ===================================================== */

//   useEffect(() => {
//     fetchStudents();
//   }, []);


//   /* =====================================================
//      GET STUDENT TYPE
     
//      IMPORTANT:
     
//      Students table:
     
//      registration_source
//        ONLINE
//        OFFLINE
     
//      learning_mode
//        ONLINE
//        OFFLINE
     
//      We use registration_source because
//      the buttons are for registration source.
//   ===================================================== */

//   const getStudentType = (student) => {

//     /*
//      * First check the nested student object.
//      *
//      * Your studentService maps:
//      *
//      * student: item.student
//      */

//     const nestedStudent =
//       student?.student || {};


//     const registrationSource =
//       String(
//         student?.registration_source ||
//         nestedStudent?.registration_source ||
//         student?.registrationSource ||
//         nestedStudent?.registrationSource ||
//         ""
//       )
//         .trim()
//         .toUpperCase();


//     /* =================================================
//        ONLINE
//     ================================================= */

//     if (
//       registrationSource ===
//       "ONLINE"
//     ) {
//       return "ONLINE";
//     }


//     /* =================================================
//        OFFLINE
//     ================================================= */

//     if (
//       registrationSource ===
//       "OFFLINE"
//     ) {
//       return "OFFLINE";
//     }


//     /*
//      * Fallback.
//      *
//      * If old records do not have
//      * registration_source, use
//      * learning_mode.
//      */

//     const learningMode =
//       String(
//         student?.learning_mode ||
//         nestedStudent?.learning_mode ||
//         student?.learningMode ||
//         nestedStudent?.learningMode ||
//         ""
//       )
//         .trim()
//         .toUpperCase();


//     if (
//       learningMode ===
//       "ONLINE"
//     ) {
//       return "ONLINE";
//     }


//     /*
//      * Existing institute registrations
//      * are treated as OFFLINE by default.
//      */

//     return "OFFLINE";
//   };


//   /* =====================================================
//      COUNTS
//   ===================================================== */

//   const counts = useMemo(() => {

//     let online = 0;

//     let offline = 0;


//     students.forEach(
//       (student) => {

//         const type =
//           getStudentType(
//             student
//           );


//         if (
//           type === "ONLINE"
//         ) {
//           online++;
//         } else {
//           offline++;
//         }

//       }
//     );


//     return {
//       all:
//         students.length,

//       online,

//       offline,
//     };

//   }, [students]);


//   /* =====================================================
//      FILTER STUDENTS
//   ===================================================== */

//   const filteredStudents =
//     useMemo(() => {

//       if (
//         studentType ===
//         "ALL"
//       ) {
//         return students;
//       }


//       return students.filter(
//         (student) =>
//           getStudentType(
//             student
//           ) === studentType
//       );

//     }, [
//       students,
//       studentType,
//     ]);


//   /* =====================================================
//      DELETE STUDENT
//   ===================================================== */

//   const handleDelete = async () => {

//     if (!deleteId) {
//       return;
//     }


//     try {

//       setDeleting(true);


//       await deleteStudentByInstitute(
//         deleteId
//       );


//       toast.success(
//         "Student deactivated successfully"
//       );


//       setShowDeleteModal(
//         false
//       );

//       setDeleteId(
//         null
//       );


//       /*
//        * Reload current data.
//        */
//       await fetchStudents();

//     } catch (err) {

//       console.error(
//         "Delete student error:",
//         err
//       );


//       toast.error(
//         err?.response?.data?.message ||
//         err?.message ||
//         "Delete failed"
//       );

//     } finally {

//       setDeleting(false);

//     }
//   };


//   /* =====================================================
//      OPEN DELETE MODAL
//   ===================================================== */

//   const openDeleteModal = (
//     id
//   ) => {

//     setDeleteId(id);

//     setShowDeleteModal(
//       true
//     );

//   };


//   /* =====================================================
//      CLOSE DELETE MODAL
//   ===================================================== */

//   const closeDeleteModal = () => {

//     if (deleting) {
//       return;
//     }


//     setShowDeleteModal(
//       false
//     );

//     setDeleteId(
//       null
//     );

//   };


//   /* =====================================================
//      CURRENT FILTER LABEL
//   ===================================================== */

//   const currentFilterLabel =
//     studentType === "ALL"
//       ? "All Students"
//       : studentType === "ONLINE"
//       ? "Online Students"
//       : "Offline Students";


//   /* =====================================================
//      CURRENT FILTER DESCRIPTION
//   ===================================================== */

//   const currentFilterDescription =
//     studentType === "ONLINE"
//       ? "Students registered through the Website Preview"
//       : studentType === "OFFLINE"
//       ? "Students registered manually by the institute"
//       : "All students registered with this institute";


//   /* =====================================================
//      RENDER
//   ===================================================== */

//   return (
//     <div className="p-8 text-white">

//       {/* =================================================
//          HEADER
//       ================================================= */}

//       <div
//         className="
//           flex
//           flex-col
//           xl:flex-row
//           justify-between
//           items-start
//           xl:items-center
//           gap-4
//           mb-6
//         "
//       >

//         <div>

//           <h1
//             className="
//               text-4xl
//               font-bold
//               text-purple-400
//             "
//           >
//             Students
//           </h1>


//           <p
//             className="
//               text-gray-400
//               mt-2
//             "
//           >
//             Manage your institute students
//           </p>

//         </div>


//         {/* =================================================
//            ACTIONS
//         ================================================= */}

//         <div
//           className="
//             flex
//             flex-wrap
//             gap-3
//           "
//         >

//           {/* SEARCH */}

//           <button
//             type="button"
//             onClick={() =>
//               setShowSearchModal(
//                 true
//               )
//             }
//             className="
//               px-4
//               py-3
//               rounded-xl
//               border
//               border-[#2c2c35]
//               text-gray-300
//               hover:bg-[#1a1a20]
//               transition-colors
//               flex
//               items-center
//               gap-2
//             "
//           >

//             <Search
//               size={18}
//             />

//             Search Mobile

//           </button>


//           {/* REGISTER */}

//           <button
//             type="button"
//             onClick={() =>
//               navigate(
//                 "/institute/students/register"
//               )
//             }
//             className="
//               px-6
//               py-3
//               rounded-xl
//               bg-gradient-to-r
//               from-purple-500
//               to-pink-500
//               font-bold
//               hover:opacity-90
//               transition-opacity
//               flex
//               items-center
//               gap-2
//             "
//           >

//             <Plus
//               size={20}
//             />

//             Register Student

//           </button>

//         </div>

//       </div>


//       {/* =================================================
//          ONLINE / OFFLINE FILTER BUTTONS
//       ================================================= */}

//       <div
//         className="
//           flex
//           flex-wrap
//           gap-3
//           mb-6
//         "
//       >

//         {/* =================================================
//            ALL
//         ================================================= */}

//         <button
//           type="button"
//           onClick={() =>
//             setStudentType(
//               "ALL"
//             )
//           }
//           className={`
//             px-5
//             py-3
//             rounded-xl
//             border
//             font-semibold
//             transition-all
//             duration-200

//             ${
//               studentType === "ALL"
//                 ? `
//                   bg-purple-500/20
//                   border-purple-500
//                   text-purple-300
//                 `
//                 : `
//                   bg-[#151519]
//                   border-[#2c2c35]
//                   text-gray-400
//                   hover:border-purple-500/40
//                   hover:text-white
//                 `
//             }
//           `}
//         >

//           All Students

//           <span className="ml-2">
//             ({counts.all})
//           </span>

//         </button>


//         {/* =================================================
//            ONLINE
//         ================================================= */}

//         <button
//           type="button"
//           onClick={() =>
//             setStudentType(
//               "ONLINE"
//             )
//           }
//           className={`
//             px-5
//             py-3
//             rounded-xl
//             border
//             font-semibold
//             transition-all
//             duration-200
//             flex
//             items-center
//             gap-2

//             ${
//               studentType === "ONLINE"
//                 ? `
//                   bg-green-500/15
//                   border-green-500
//                   text-green-300
//                   shadow-lg
//                   shadow-green-500/10
//                 `
//                 : `
//                   bg-[#151519]
//                   border-[#2c2c35]
//                   text-gray-400
//                   hover:border-green-500/40
//                   hover:text-white
//                 `
//             }
//           `}
//         >

//           <Globe
//             size={18}
//           />

//           Online

//           <span>
//             ({counts.online})
//           </span>

//         </button>


//         {/* =================================================
//            OFFLINE
//         ================================================= */}

//         <button
//           type="button"
//           onClick={() =>
//             setStudentType(
//               "OFFLINE"
//             )
//           }
//           className={`
//             px-5
//             py-3
//             rounded-xl
//             border
//             font-semibold
//             transition-all
//             duration-200
//             flex
//             items-center
//             gap-2

//             ${
//               studentType === "OFFLINE"
//                 ? `
//                   bg-orange-500/15
//                   border-orange-500
//                   text-orange-300
//                   shadow-lg
//                   shadow-orange-500/10
//                 `
//                 : `
//                   bg-[#151519]
//                   border-[#2c2c35]
//                   text-gray-400
//                   hover:border-orange-500/40
//                   hover:text-white
//                 `
//             }
//           `}
//         >

//           <Building2
//             size={18}
//           />

//           Offline

//           <span>
//             ({counts.offline})
//           </span>

//         </button>

//       </div>


//       {/* =================================================
//          CURRENT FILTER INFO
//       ================================================= */}

//       <div
//         className="
//           flex
//           flex-col
//           sm:flex-row
//           sm:items-center
//           sm:justify-between
//           gap-3
//           mb-4
//         "
//       >

//         <div>

//           <h2
//             className="
//               text-xl
//               font-semibold
//               text-white
//             "
//           >
//             {currentFilterLabel}
//           </h2>


//           <p
//             className="
//               text-sm
//               text-gray-500
//               mt-1
//             "
//           >
//             {currentFilterDescription}
//           </p>

//         </div>


//         {/* COUNT */}

//         {!loading && (

//           <div
//             className="
//               px-4
//               py-2
//               rounded-xl
//               bg-[#202027]
//               border
//               border-[#2c2c35]
//               text-sm
//               text-gray-300
//               w-fit
//             "
//           >

//             Showing{" "}

//             <span
//               className="
//                 font-bold
//                 text-white
//               "
//             >
//               {filteredStudents.length}
//             </span>

//           </div>

//         )}

//       </div>


//       {/* =================================================
//          TABLE
//       ================================================= */}

//       <div
//         className="
//           bg-[#151519]
//           border
//           border-[#2c2c35]
//           rounded-2xl
//           overflow-hidden
//         "
//       >

//         <StudentTable
//           students={
//             filteredStudents
//           }

//           loading={
//             loading
//           }

//           onView={(id) =>
//             navigate(
//               `/institute/students/${id}`
//             )
//           }

//           onEdit={(id) =>
//             navigate(
//               `/institute/students/${id}/edit`
//             )
//           }

//           onDelete={
//             openDeleteModal
//           }
//         />

//       </div>


//       {/* =================================================
//          SEARCH MODAL
//       ================================================= */}

//       <StudentSearch
//         isOpen={
//           showSearchModal
//         }

//         onClose={() =>
//           setShowSearchModal(
//             false
//           )
//         }

//         onSuccess={() => {

//           setShowSearchModal(
//             false
//           );

//           fetchStudents();

//         }}
//       />


//       {/* =================================================
//          DELETE MODAL
//       ================================================= */}

//       {showDeleteModal && (

//         <div
//           className="
//             fixed
//             inset-0
//             bg-black/70
//             backdrop-blur-sm
//             flex
//             justify-center
//             items-center
//             z-50
//             p-4
//           "
//         >

//           <div
//             className="
//               w-full
//               max-w-[400px]
//               bg-[#1e1b2e]
//               border
//               border-[#2e2a42]
//               rounded-2xl
//               shadow-2xl
//               p-8
//               text-center
//             "
//           >

//             {/* ICON */}

//             <div
//               className="
//                 w-14
//                 h-14
//                 rounded-full
//                 bg-red-500/15
//                 flex
//                 items-center
//                 justify-center
//                 mb-5
//                 mx-auto
//               "
//             >

//               <Trash2
//                 className="
//                   text-red-400
//                 "
//                 size={20}
//               />

//             </div>


//             {/* TITLE */}

//             <h2
//               className="
//                 text-xl
//                 font-bold
//                 text-white
//                 mb-3
//               "
//             >
//               Deactivate Student
//             </h2>


//             {/* DESCRIPTION */}

//             <p
//               className="
//                 text-gray-400
//                 text-sm
//                 mb-8
//               "
//             >
//               Are you sure? The student
//               will be marked as inactive.
//             </p>


//             {/* BUTTONS */}

//             <div
//               className="
//                 flex
//                 gap-3
//               "
//             >

//               {/* CANCEL */}

//               <button
//                 type="button"
//                 onClick={
//                   closeDeleteModal
//                 }
//                 disabled={
//                   deleting
//                 }
//                 className="
//                   flex-1
//                   px-5
//                   py-3
//                   rounded-xl
//                   border
//                   border-[#3a3650]
//                   text-gray-300
//                   hover:bg-[#2a2640]
//                   transition-colors
//                   font-medium
//                   text-sm
//                   disabled:opacity-50
//                 "
//               >
//                 Cancel
//               </button>


//               {/* CONFIRM */}

//               <button
//                 type="button"
//                 onClick={
//                   handleDelete
//                 }
//                 disabled={
//                   deleting
//                 }
//                 className="
//                   flex-1
//                   px-5
//                   py-3
//                   rounded-xl
//                   bg-gradient-to-r
//                   from-red-500
//                   to-pink-500
//                   text-white
//                   font-bold
//                   hover:opacity-90
//                   disabled:opacity-50
//                   text-sm
//                 "
//               >

//                 {deleting
//                   ? "Deactivating..."
//                   : "Yes, Deactivate"}

//               </button>

//             </div>

//           </div>

//         </div>

//       )}

//     </div>
//   );
// }



import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  Trash2,
  Globe,
  Building2,
} from "lucide-react";
import toast from "react-hot-toast";

import {
  getInstituteStudents,
  deleteStudentByInstitute,
} from "../../services/studentService";

import StudentTable from "../../components/students/StudentTable";
import StudentSearch from "../../components/students/StudentSearch";


/* =========================================================
   STUDENTS LIST
========================================================= */

export default function StudentsList() {
  const navigate = useNavigate();

  /* =======================================================
     STATE
  ======================================================= */

  const [students, setStudents] = useState([]);

  const [loading, setLoading] = useState(true);

  const [studentType, setStudentType] = useState("ALL");

  const [showSearchModal, setShowSearchModal] =
    useState(false);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [deleteId, setDeleteId] = useState(null);

  const [deleting, setDeleting] = useState(false);


  /* =======================================================
     NORMALIZE API RESPONSE
  ======================================================= */

  const normalizeStudentsResponse = useCallback((response) => {
    /*
     * studentService.getInstituteStudents()
     * already returns an array.
     *
     * But this also supports:
     *
     * {
     *   data: [...]
     * }
     *
     * and:
     *
     * {
     *   students: [...]
     * }
     */

    if (Array.isArray(response)) {
      return response;
    }

    if (Array.isArray(response?.data)) {
      return response.data;
    }

    if (Array.isArray(response?.students)) {
      return response.students;
    }

    return [];
  }, []);


  /* =======================================================
     GET REGISTRATION SOURCE
  ======================================================= */

  const getRegistrationSource = useCallback((student) => {
    const nestedStudent = student?.student || {};

    const source =
      student?.registration_source ??
      nestedStudent?.registration_source ??
      student?.registrationSource ??
      nestedStudent?.registrationSource ??
      "";

    return String(source)
      .trim()
      .toUpperCase();
  }, []);


  /* =======================================================
     GET LEARNING MODE
  ======================================================= */

  const getLearningMode = useCallback((student) => {
    const nestedStudent = student?.student || {};

    const mode =
      student?.learning_mode ??
      nestedStudent?.learning_mode ??
      student?.learningMode ??
      nestedStudent?.learningMode ??
      "";

    return String(mode)
      .trim()
      .toUpperCase();
  }, []);


  /* =======================================================
     GET STUDENT TYPE
     
     IMPORTANT:
     
     ONLINE / OFFLINE buttons are based on
     registration_source.
     
     registration_source:
     
       ONLINE  = Website Preview registration
       OFFLINE = Institute registration
     
     learning_mode is NOT used to convert an
     unknown registration source into ONLINE.
  ======================================================= */

  const getStudentType = useCallback(
    (student) => {
      const registrationSource =
        getRegistrationSource(student);

      if (registrationSource === "ONLINE") {
        return "ONLINE";
      }

      if (registrationSource === "OFFLINE") {
        return "OFFLINE";
      }

      /*
       * Legacy records:
       *
       * If registration_source is missing,
       * we use learning_mode only when it is
       * explicitly OFFLINE.
       *
       * We DO NOT assume ONLINE merely because
       * learning_mode is ONLINE.
       *
       * This prevents old/malformed records from
       * incorrectly appearing as Website Preview
       * registrations.
       */

      const learningMode =
        getLearningMode(student);

      if (learningMode === "OFFLINE") {
        return "OFFLINE";
      }

      /*
       * Existing institute records are treated
       * as OFFLINE when source is missing.
       */

      return "OFFLINE";
    },
    [
      getRegistrationSource,
      getLearningMode,
    ]
  );


  /* =======================================================
     FETCH STUDENTS
  ======================================================= */

  const fetchStudents = useCallback(async () => {
    try {
      setLoading(true);

      console.log(
        "================================================"
      );

      console.log(
        "FETCHING INSTITUTE STUDENTS"
      );

      console.log(
        "Requested source:",
        studentType
      );

      console.log(
        "================================================"
      );


      /*
       * IMPORTANT:
       *
       * Fetch ALL students from backend.
       *
       * The backend will return only students
       * belonging to the logged-in institute.
       *
       * Then the frontend calculates:
       *
       * ALL
       * ONLINE
       * OFFLINE
       *
       * from registration_source.
       */

      const response =
        await getInstituteStudents("ALL");


      console.log(
        "RAW STUDENTS RESPONSE:",
        response
      );


      const normalized =
        normalizeStudentsResponse(
          response
        );


      console.log(
        "NORMALIZED STUDENTS:",
        normalized
      );


      normalized.forEach(
        (student, index) => {
          console.log(
            `Student ${index + 1}:`,
            {
              id:
                student?.student?.id ??
                student?.id ??
                null,

              name:
                student?.user?.full_name ??
                student?.full_name ??
                "Unknown",

              registration_source:
                getRegistrationSource(
                  student
                ),

              learning_mode:
                getLearningMode(
                  student
                ),

              institute_id:
                student?.student?.institute_id ??
                student?.institute?.id ??
                null,

              status:
                student?.student?.status ??
                student?.status ??
                null,
            }
          );
        }
      );


      setStudents(normalized);

    } catch (error) {
      console.error(
        "================================================"
      );

      console.error(
        "FAILED TO LOAD INSTITUTE STUDENTS"
      );

      console.error(
        "Error:",
        error
      );

      console.error(
        "Response:",
        error?.response?.data
      );

      console.error(
        "================================================"
      );


      setStudents([]);


      toast.error(
        error?.response?.data?.message ||
        error?.message ||
        "Failed to load students"
      );

    } finally {
      setLoading(false);
    }
  }, [
    studentType,
    normalizeStudentsResponse,
    getRegistrationSource,
    getLearningMode,
  ]);


  /* =======================================================
     INITIAL / TAB LOAD
  ======================================================= */

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);


  /* =======================================================
     STUDENT COUNTS
  ======================================================= */

  const counts = useMemo(() => {
    let online = 0;
    let offline = 0;

    students.forEach((student) => {
      const type =
        getStudentType(student);

      if (type === "ONLINE") {
        online += 1;
      } else {
        offline += 1;
      }
    });

    return {
      all: students.length,
      online,
      offline,
    };
  }, [
    students,
    getStudentType,
  ]);


  /* =======================================================
     FILTER STUDENTS
  ======================================================= */

  const filteredStudents = useMemo(() => {
    if (studentType === "ALL") {
      return students;
    }

    return students.filter(
      (student) =>
        getStudentType(student) ===
        studentType
    );
  }, [
    students,
    studentType,
    getStudentType,
  ]);


  /* =======================================================
     CHANGE STUDENT TYPE
  ======================================================= */

  const handleStudentTypeChange = (
    type
  ) => {
    const normalizedType =
      String(type || "ALL")
        .trim()
        .toUpperCase();

    if (
      ![
        "ALL",
        "ONLINE",
        "OFFLINE",
      ].includes(normalizedType)
    ) {
      return;
    }

    console.log(
      "Changing student filter:",
      normalizedType
    );

    setStudentType(
      normalizedType
    );
  };


  /* =======================================================
     DELETE STUDENT
  ======================================================= */

  const handleDelete = async () => {
    if (!deleteId) {
      return;
    }

    try {
      setDeleting(true);

      console.log(
        "Deactivating student:",
        deleteId
      );

      await deleteStudentByInstitute(
        deleteId
      );

      toast.success(
        "Student deactivated successfully"
      );

      setShowDeleteModal(false);
      setDeleteId(null);

      /*
       * Reload students after deletion.
       */
      await fetchStudents();

    } catch (error) {
      console.error(
        "Delete student error:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
        error?.message ||
        "Failed to deactivate student"
      );

    } finally {
      setDeleting(false);
    }
  };


  /* =======================================================
     OPEN DELETE MODAL
  ======================================================= */

  const openDeleteModal = (id) => {
    if (!id) {
      toast.error(
        "Student ID is missing"
      );

      return;
    }

    setDeleteId(id);

    setShowDeleteModal(true);
  };


  /* =======================================================
     CLOSE DELETE MODAL
  ======================================================= */

  const closeDeleteModal = () => {
    if (deleting) {
      return;
    }

    setShowDeleteModal(false);

    setDeleteId(null);
  };


  /* =======================================================
     CURRENT FILTER TITLE
  ======================================================= */

  const currentFilterLabel =
    studentType === "ONLINE"
      ? "Online Students"
      : studentType === "OFFLINE"
      ? "Offline Students"
      : "All Students";


  /* =======================================================
     CURRENT FILTER DESCRIPTION
  ======================================================= */

  const currentFilterDescription =
    studentType === "ONLINE"
      ? "Students registered through the Website Preview"
      : studentType === "OFFLINE"
      ? "Students registered manually by the institute"
      : "All students registered with this institute";


  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="p-8 text-white">


      {/* ===================================================
          HEADER
      =================================================== */}

      <div
        className="
          flex
          flex-col
          xl:flex-row
          justify-between
          items-start
          xl:items-center
          gap-4
          mb-6
        "
      >

        {/* TITLE */}

        <div>

          <h1
            className="
              text-4xl
              font-bold
              text-purple-400
            "
          >
            Students
          </h1>

          <p
            className="
              text-gray-400
              mt-2
            "
          >
            Manage your institute students
          </p>

        </div>


        {/* ACTION BUTTONS */}

        <div
          className="
            flex
            flex-wrap
            gap-3
          "
        >

          {/* SEARCH */}

          <button
            type="button"
            onClick={() =>
              setShowSearchModal(true)
            }
            className="
              px-4
              py-3
              rounded-xl
              border
              border-[#2c2c35]
              text-gray-300
              hover:bg-[#1a1a20]
              transition-colors
              flex
              items-center
              gap-2
            "
          >

            <Search size={18} />

            Search Mobile

          </button>


          {/* REGISTER */}

          <button
            type="button"
            onClick={() =>
              navigate(
                "/institute/students/register"
              )
            }
            className="
              px-6
              py-3
              rounded-xl
              bg-gradient-to-r
              from-purple-500
              to-pink-500
              font-bold
              hover:opacity-90
              transition-opacity
              flex
              items-center
              gap-2
            "
          >

            <Plus size={20} />

            Register Student

          </button>

        </div>

      </div>


      {/* ===================================================
          FILTER BUTTONS
      =================================================== */}

      <div
        className="
          flex
          flex-wrap
          gap-3
          mb-6
        "
      >

        {/* ALL */}

        <button
          type="button"
          onClick={() =>
            handleStudentTypeChange(
              "ALL"
            )
          }
          className={`
            px-5
            py-3
            rounded-xl
            border
            font-semibold
            transition-all
            duration-200

            ${
              studentType === "ALL"
                ? `
                  bg-purple-500/20
                  border-purple-500
                  text-purple-300
                `
                : `
                  bg-[#151519]
                  border-[#2c2c35]
                  text-gray-400
                  hover:border-purple-500/40
                  hover:text-white
                `
            }
          `}
        >

          All Students

          <span className="ml-2">
            ({counts.all})
          </span>

        </button>


        {/* ONLINE */}

        <button
          type="button"
          onClick={() =>
            handleStudentTypeChange(
              "ONLINE"
            )
          }
          className={`
            px-5
            py-3
            rounded-xl
            border
            font-semibold
            transition-all
            duration-200
            flex
            items-center
            gap-2

            ${
              studentType === "ONLINE"
                ? `
                  bg-green-500/15
                  border-green-500
                  text-green-300
                  shadow-lg
                  shadow-green-500/10
                `
                : `
                  bg-[#151519]
                  border-[#2c2c35]
                  text-gray-400
                  hover:border-green-500/40
                  hover:text-white
                `
            }
          `}
        >

          <Globe size={18} />

          Online

          <span>
            ({counts.online})
          </span>

        </button>


        {/* OFFLINE */}

        <button
          type="button"
          onClick={() =>
            handleStudentTypeChange(
              "OFFLINE"
            )
          }
          className={`
            px-5
            py-3
            rounded-xl
            border
            font-semibold
            transition-all
            duration-200
            flex
            items-center
            gap-2

            ${
              studentType === "OFFLINE"
                ? `
                  bg-orange-500/15
                  border-orange-500
                  text-orange-300
                  shadow-lg
                  shadow-orange-500/10
                `
                : `
                  bg-[#151519]
                  border-[#2c2c35]
                  text-gray-400
                  hover:border-orange-500/40
                  hover:text-white
                `
            }
          `}
        >

          <Building2 size={18} />

          Offline

          <span>
            ({counts.offline})
          </span>

        </button>

      </div>


      {/* ===================================================
          CURRENT FILTER INFORMATION
      =================================================== */}

      <div
        className="
          flex
          flex-col
          sm:flex-row
          sm:items-center
          sm:justify-between
          gap-3
          mb-4
        "
      >

        <div>

          <h2
            className="
              text-xl
              font-semibold
              text-white
            "
          >
            {currentFilterLabel}
          </h2>

          <p
            className="
              text-sm
              text-gray-500
              mt-1
            "
          >
            {currentFilterDescription}
          </p>

        </div>


        {!loading && (
          <div
            className="
              px-4
              py-2
              rounded-xl
              bg-[#202027]
              border
              border-[#2c2c35]
              text-sm
              text-gray-300
              w-fit
            "
          >

            Showing{" "}

            <span
              className="
                font-bold
                text-white
              "
            >
              {filteredStudents.length}
            </span>

          </div>
        )}

      </div>


      {/* ===================================================
          STUDENT TABLE
      =================================================== */}

      <div
        className="
          bg-[#151519]
          border
          border-[#2c2c35]
          rounded-2xl
          overflow-hidden
        "
      >

        <StudentTable
          students={
            filteredStudents
          }

          loading={
            loading
          }

          onView={(id) =>
            navigate(
              `/institute/students/${id}`
            )
          }

          onEdit={(id) =>
            navigate(
              `/institute/students/${id}/edit`
            )
          }

          onDelete={
            openDeleteModal
          }
        />

      </div>


      {/* ===================================================
          SEARCH MODAL
      =================================================== */}

      <StudentSearch
        isOpen={
          showSearchModal
        }

        onClose={() =>
          setShowSearchModal(false)
        }

        onSuccess={async () => {

          setShowSearchModal(
            false
          );

          await fetchStudents();

        }}
      />


      {/* ===================================================
          DELETE MODAL
      =================================================== */}

      {showDeleteModal && (

        <div
          className="
            fixed
            inset-0
            bg-black/70
            backdrop-blur-sm
            flex
            justify-center
            items-center
            z-50
            p-4
          "
        >

          <div
            className="
              w-full
              max-w-[400px]
              bg-[#1e1b2e]
              border
              border-[#2e2a42]
              rounded-2xl
              shadow-2xl
              p-8
              text-center
            "
          >

            {/* ICON */}

            <div
              className="
                w-14
                h-14
                rounded-full
                bg-red-500/15
                flex
                items-center
                justify-center
                mb-5
                mx-auto
              "
            >

              <Trash2
                className="text-red-400"
                size={20}
              />

            </div>


            {/* TITLE */}

            <h2
              className="
                text-xl
                font-bold
                text-white
                mb-3
              "
            >
              Deactivate Student
            </h2>


            {/* DESCRIPTION */}

            <p
              className="
                text-gray-400
                text-sm
                mb-8
              "
            >
              Are you sure? The student
              will be marked as inactive.
            </p>


            {/* BUTTONS */}

            <div
              className="
                flex
                gap-3
              "
            >

              {/* CANCEL */}

              <button
                type="button"
                onClick={
                  closeDeleteModal
                }
                disabled={
                  deleting
                }
                className="
                  flex-1
                  px-5
                  py-3
                  rounded-xl
                  border
                  border-[#3a3650]
                  text-gray-300
                  hover:bg-[#2a2640]
                  transition-colors
                  font-medium
                  text-sm
                  disabled:opacity-50
                "
              >
                Cancel
              </button>


              {/* CONFIRM */}

              <button
                type="button"
                onClick={
                  handleDelete
                }
                disabled={
                  deleting
                }
                className="
                  flex-1
                  px-5
                  py-3
                  rounded-xl
                  bg-gradient-to-r
                  from-red-500
                  to-pink-500
                  text-white
                  font-bold
                  hover:opacity-90
                  disabled:opacity-50
                  text-sm
                "
              >

                {deleting
                  ? "Deactivating..."
                  : "Yes, Deactivate"}

              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}