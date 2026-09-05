// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   Edit,
//   ArrowLeft,
//   UserPlus,
//   RefreshCw,
//   Trash2,
//   X,
// } from "lucide-react";
// import toast from "react-hot-toast";

// import {
//   getBatchById,
//   getBatchStudents,
//   getInstituteBatches,
//   removeStudentFromBatch,
//   changeStudentBatch,
// } from "../../services/batchService";

// export default function BatchDetails() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [batch, setBatch] = useState(null);
//   const [students, setStudents] = useState([]);
//   const [batches, setBatches] = useState([]);

//   const [loading, setLoading] = useState(true);
//   const [studentLoading, setStudentLoading] = useState(false);

//   // Change batch modal
//   const [changeModal, setChangeModal] = useState(false);
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [selectedBatch, setSelectedBatch] = useState("");
//   const [changingBatch, setChangingBatch] = useState(false);

//   // Remove student modal
//   const [removeModal, setRemoveModal] = useState(false);
//   const [studentToRemove, setStudentToRemove] = useState(null);
//   const [removingStudent, setRemovingStudent] = useState(false);

//   /* =========================================================
//      LOAD BATCH DETAILS
//   ========================================================= */

//   const fetchBatchDetails = async () => {
//     try {
//       setLoading(true);

//       const batchResponse = await getBatchById(id);

//       const batchData =
//         batchResponse?.data ||
//         batchResponse;

//       setBatch(batchData);

//       const studentResponse =
//         await getBatchStudents(id);

//       console.log(
//         "Batch students response:",
//         studentResponse
//       );

//       let studentList = [];

//       if (Array.isArray(studentResponse)) {
//         studentList = studentResponse;
//       } else if (
//         Array.isArray(studentResponse?.students)
//       ) {
//         studentList =
//           studentResponse.students;
//       } else if (
//         Array.isArray(studentResponse?.data)
//       ) {
//         studentList =
//           studentResponse.data;
//       }

//       setStudents(studentList);

//     } catch (error) {
//       console.error(
//         "Failed to load batch details:",
//         error
//       );

//       setStudents([]);

//       toast.error(
//         error?.response?.data?.message ||
//           "Failed to load batch details"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* =========================================================
//      LOAD BATCHES FOR CHANGE-BATCH DROPDOWN
//   ========================================================= */

//   const fetchBatches = async () => {
//     try {
//       const response =
//         await getInstituteBatches();

//       const batchList =
//         Array.isArray(response)
//           ? response
//           : response?.data || [];

//       // Don't show current batch
//       const otherBatches = batchList.filter(
//         (item) =>
//           String(item.id) !== String(id) &&
//           item.status === "ACTIVE"
//       );

//       setBatches(otherBatches);

//     } catch (error) {
//       console.error(
//         "Failed to load batches:",
//         error
//       );

//       toast.error(
//         "Failed to load available batches"
//       );
//     }
//   };

//   /* =========================================================
//      INITIAL LOAD
//   ========================================================= */

//   useEffect(() => {
//     if (!id) return;

//     fetchBatchDetails();
//     fetchBatches();
//   }, [id]);

//   /* =========================================================
//      OPEN CHANGE BATCH MODAL
//   ========================================================= */

//   const openChangeBatchModal = (student) => {
//     setSelectedStudent(student);
//     setSelectedBatch("");
//     setChangeModal(true);
//   };

//   /* =========================================================
//      CHANGE STUDENT BATCH
//   ========================================================= */

//   const handleChangeBatch = async () => {
//     if (!selectedStudent) {
//       toast.error("Student not selected");
//       return;
//     }

//     if (!selectedBatch) {
//       toast.error("Please select a new batch");
//       return;
//     }

//     if (String(selectedBatch) === String(id)) {
//       toast.error(
//         "Student is already in this batch"
//       );
//       return;
//     }

//     try {
//       setChangingBatch(true);

//       await changeStudentBatch(
//         id,
//         selectedStudent.student_id,
//         selectedBatch
//       );

//       toast.success(
//         "Student batch changed successfully"
//       );

//       setChangeModal(false);
//       setSelectedStudent(null);
//       setSelectedBatch("");

//       await fetchBatchDetails();

//     } catch (error) {
//       console.error(
//         "Change batch error:",
//         error
//       );

//       toast.error(
//         error?.response?.data?.message ||
//           "Failed to change student batch"
//       );
//     } finally {
//       setChangingBatch(false);
//     }
//   };

//   /* =========================================================
//      OPEN REMOVE MODAL
//   ========================================================= */

//   const openRemoveModal = (student) => {
//     setStudentToRemove(student);
//     setRemoveModal(true);
//   };

//   /* =========================================================
//      REMOVE STUDENT
//   ========================================================= */

//   const handleRemoveStudent = async () => {
//     if (!studentToRemove) {
//       return;
//     }

//     try {
//       setRemovingStudent(true);

//       await removeStudentFromBatch(
//         id,
//         studentToRemove.student_id
//       );

//       toast.success(
//         "Student removed from batch successfully"
//       );

//       setRemoveModal(false);
//       setStudentToRemove(null);

//       await fetchBatchDetails();

//     } catch (error) {
//       console.error(
//         "Remove student error:",
//         error
//       );

//       toast.error(
//         error?.response?.data?.message ||
//           "Failed to remove student"
//       );
//     } finally {
//       setRemovingStudent(false);
//     }
//   };

//   /* =========================================================
//      LOADING
//   ========================================================= */

//   if (loading) {
//     return (
//       <div className="flex min-h-[400px] items-center justify-center text-white">
//         Loading...
//       </div>
//     );
//   }

//   /* =========================================================
//      NOT FOUND
//   ========================================================= */

//   if (!batch) {
//     return (
//       <div className="p-6 text-white">
//         Batch not found
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">

//       {/* =====================================================
//           HEADER
//       ===================================================== */}

//       <div className="mb-6 flex items-center justify-between">

//         <div className="flex items-center gap-4">

//           <button
//             onClick={() =>
//               navigate("/institute/batches")
//             }
//             className="rounded-xl p-2 text-gray-400 hover:bg-[#2a2a35] hover:text-white"
//           >
//             <ArrowLeft size={22} />
//           </button>

//           <div>

//             <h1 className="text-2xl font-bold text-white">
//               {batch.batch_name}
//             </h1>

//             <p className="mt-1 text-sm text-gray-400">
//               Code: {batch.batch_code || "-"}
//               {" | "}
//               Mode: {batch.learning_mode || "-"}
//             </p>

//           </div>

//         </div>

//         <button
//           onClick={() =>
//             navigate(
//               `/institute/batches/${id}/edit`
//             )
//           }
//           className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-5 py-2.5 font-bold text-white"
//         >
//           <Edit size={18} />
//           Edit
//         </button>

//       </div>

//       {/* =====================================================
//           CONTENT
//       ===================================================== */}

//       <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

//         {/* ===================================================
//             BATCH INFORMATION
//         =================================================== */}

//         <div className="space-y-4 rounded-2xl border border-[#2c2c35] bg-[#151519] p-6">

//           <div>
//             <p className="text-xs text-gray-500">
//               Trainer
//             </p>

//             <p className="font-medium text-white">
//               {batch.trainer_name ||
//                 "Unassigned"}
//             </p>
//           </div>

//           <div>
//             <p className="text-xs text-gray-500">
//               Capacity
//             </p>

//             <p className="font-medium text-white">
//               {batch.current_students || 0}
//               {" / "}
//               {batch.max_students || 0}
//             </p>
//           </div>

//           <div>
//             <p className="text-xs text-gray-500">
//               Timings
//             </p>

//             <p className="font-medium text-white">
//               {batch.start_time || "-"}
//               {" - "}
//               {batch.end_time || "-"}
//             </p>
//           </div>

//           <div>
//             <p className="text-xs text-gray-500">
//               Duration
//             </p>

//             <p className="font-medium text-white">
//               {batch.start_date || "-"}
//               {" to "}
//               {batch.end_date || "-"}
//             </p>
//           </div>

//         </div>

//         {/* ===================================================
//             ASSIGNED STUDENTS
//         =================================================== */}

//         <div className="rounded-2xl border border-[#2c2c35] bg-[#151519] p-6 lg:col-span-2">

//           {/* HEADER */}

//           <div className="mb-5 flex items-center justify-between">

//             <div>

//               <h3 className="text-lg font-semibold text-white">
//                 Assigned Students
//               </h3>

//               <p className="mt-1 text-sm text-gray-500">
//                 {students.length} student
//                 {students.length !== 1
//                   ? "s"
//                   : ""}{" "}
//                 assigned
//               </p>

//             </div>

//             <button
//               onClick={() => {
//                 // This can later open your AssignStudentModal
//                 toast(
//                   "Use the Assign Student button from the batch page."
//                 );
//               }}
//               className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 text-sm font-semibold text-white"
//             >
//               <UserPlus size={17} />
//               Assign Student
//             </button>

//           </div>

//           {/* TABLE */}

//           <div className="overflow-x-auto">

//             <table className="w-full">

//               <thead className="border-b border-[#2c2c35] text-sm text-gray-400">

//                 <tr>

//                   <th className="p-3 text-left">
//                     Name
//                   </th>

//                   <th className="p-3 text-left">
//                     Mobile
//                   </th>

//                   <th className="p-3 text-left">
//                     Actions
//                   </th>

//                 </tr>

//               </thead>

//               <tbody>

//                 {students.length === 0 ? (

//                   <tr>

//                     <td
//                       colSpan={3}
//                       className="p-8 text-center text-gray-500"
//                     >
//                       No students assigned to
//                       this batch yet.
//                     </td>

//                   </tr>

//                 ) : (

//                   students.map((student) => (

//                     <tr
//                       key={student.student_id}
//                       className="border-b border-[#2c2c35] hover:bg-[#1c1c22]"
//                     >

//                       <td className="p-3">

//                         <p className="font-medium text-white">
//                           {student.full_name ||
//                             student.student_name ||
//                             "-"}
//                         </p>

//                       </td>

//                       <td className="p-3 text-gray-300">
//                         {student.phone_number ||
//                           "-"}
//                       </td>

//                       <td className="p-3">

//                         <div className="flex items-center gap-2">

//                           {/* CHANGE BATCH */}

//                           <button
//                             onClick={() =>
//                               openChangeBatchModal(
//                                 student
//                               )
//                             }
//                             className="flex items-center gap-1 rounded-lg bg-blue-500/10 px-3 py-2 text-xs font-medium text-blue-400 hover:bg-blue-500/20"
//                           >
//                             <RefreshCw size={14} />
//                             Change
//                           </button>

//                           {/* REMOVE */}

//                           <button
//                             onClick={() =>
//                               openRemoveModal(
//                                 student
//                               )
//                             }
//                             className="flex items-center gap-1 rounded-lg bg-red-500/10 px-3 py-2 text-xs font-medium text-red-400 hover:bg-red-500/20"
//                           >
//                             <Trash2 size={14} />
//                             Remove
//                           </button>

//                         </div>

//                       </td>

//                     </tr>

//                   ))

//                 )}

//               </tbody>

//             </table>

//           </div>

//         </div>

//       </div>

//       {/* =====================================================
//           CHANGE BATCH MODAL
//       ===================================================== */}

//       {changeModal && selectedStudent && (

//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">

//           <div className="relative w-full max-w-md rounded-2xl border border-[#2c2c35] bg-[#18181f] p-6">

//             <button
//               onClick={() =>
//                 setChangeModal(false)
//               }
//               disabled={changingBatch}
//               className="absolute right-4 top-4 text-gray-400 hover:text-white"
//             >
//               <X size={20} />
//             </button>

//             <h2 className="mb-2 text-xl font-bold text-white">
//               Change Student Batch
//             </h2>

//             <p className="mb-6 text-sm text-gray-400">
//               Move this student to another
//               active batch.
//             </p>

//             {/* STUDENT */}

//             <div className="mb-5 rounded-xl bg-[#25232e] p-4">

//               <p className="font-semibold text-white">
//                 {selectedStudent.full_name}
//               </p>

//               <p className="mt-1 text-sm text-gray-400">
//                 {selectedStudent.phone_number ||
//                   "No phone number"}
//               </p>

//             </div>

//             {/* CURRENT BATCH */}

//             <div className="mb-4">

//               <label className="mb-2 block text-sm text-gray-400">
//                 Current Batch
//               </label>

//               <div className="rounded-xl bg-[#25232e] px-4 py-3 text-white">
//                 {batch.batch_name}
//               </div>

//             </div>

//             {/* NEW BATCH */}

//             <div className="mb-6">

//               <label className="mb-2 block text-sm text-gray-400">
//                 New Batch
//               </label>

//               <select
//                 value={selectedBatch}
//                 onChange={(e) =>
//                   setSelectedBatch(
//                     e.target.value
//                   )
//                 }
//                 disabled={changingBatch}
//                 className="w-full rounded-xl border border-[#3a3845] bg-[#25232e] px-4 py-3 text-white outline-none focus:border-purple-500"
//               >

//                 <option value="">
//                   Select new batch
//                 </option>

//                 {batches.map((item) => (

//                   <option
//                     key={item.id}
//                     value={item.id}
//                   >
//                     {item.batch_name}
//                     {" - "}
//                     {item.current_students || 0}
//                     /
//                     {item.max_students || 0}
//                   </option>

//                 ))}

//               </select>

//             </div>

//             {/* BUTTONS */}

//             <div className="flex gap-3">

//               <button
//                 onClick={() => {
//                   setChangeModal(false);
//                   setSelectedStudent(null);
//                 }}
//                 disabled={changingBatch}
//                 className="flex-1 rounded-xl border border-[#3a3845] py-3 font-semibold text-gray-300 hover:bg-[#25232e]"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={handleChangeBatch}
//                 disabled={
//                   !selectedBatch ||
//                   changingBatch
//                 }
//                 className="flex-1 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 py-3 font-bold text-white disabled:opacity-50"
//               >
//                 {changingBatch
//                   ? "Changing..."
//                   : "Change Batch"}
//               </button>

//             </div>

//           </div>

//         </div>

//       )}

//       {/* =====================================================
//           REMOVE STUDENT MODAL
//       ===================================================== */}

//       {removeModal && studentToRemove && (

//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">

//           <div className="w-full max-w-md rounded-2xl border border-[#2c2c35] bg-[#18181f] p-6">

//             <h2 className="mb-2 text-xl font-bold text-white">
//               Remove Student
//             </h2>

//             <p className="mb-6 text-sm text-gray-400">
//               Are you sure you want to remove
//               this student from the batch?
//             </p>

//             <div className="mb-6 rounded-xl bg-[#25232e] p-4">

//               <p className="font-semibold text-white">
//                 {studentToRemove.full_name}
//               </p>

//               <p className="mt-1 text-sm text-gray-400">
//                 {studentToRemove.phone_number ||
//                   "No phone number"}
//               </p>

//             </div>

//             <div className="flex gap-3">

//               <button
//                 onClick={() => {
//                   setRemoveModal(false);
//                   setStudentToRemove(null);
//                 }}
//                 disabled={removingStudent}
//                 className="flex-1 rounded-xl border border-[#3a3845] py-3 font-semibold text-gray-300 hover:bg-[#25232e]"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={handleRemoveStudent}
//                 disabled={removingStudent}
//                 className="flex-1 rounded-xl bg-red-500 py-3 font-bold text-white hover:bg-red-600 disabled:opacity-50"
//               >
//                 {removingStudent
//                   ? "Removing..."
//                   : "Remove Student"}
//               </button>

//             </div>

//           </div>

//         </div>

//       )}

//     </div>
//   );
// }


// // BatchDetails.jsx

// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// import {
//   Edit,
//   ArrowLeft,
//   UserPlus,
//   RefreshCw,
//   Trash2,
//   X,
// } from "lucide-react";

// import toast from "react-hot-toast";

// import {
//   getBatchById,
//   getBatchStudents,
//   getInstituteBatches,
//   removeStudentFromBatch,
//   changeStudentBatch,
// } from "../../services/batchService";

// import AssignStudentModal from "../../components/batches/AssignStudentModal";


// export default function BatchDetails() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   /* =========================================================
//      STATE
//   ========================================================= */

//   const [batch, setBatch] = useState(null);
//   const [students, setStudents] = useState([]);
//   const [batches, setBatches] = useState([]);

//   const [loading, setLoading] = useState(true);

//   /* =========================================================
//      ASSIGN STUDENT MODAL
//   ========================================================= */

//   const [assignModal, setAssignModal] = useState(false);

//   /* =========================================================
//      CHANGE BATCH MODAL
//   ========================================================= */

//   const [changeModal, setChangeModal] = useState(false);

//   const [selectedStudent, setSelectedStudent] =
//     useState(null);

//   const [selectedBatch, setSelectedBatch] =
//     useState("");

//   const [changingBatch, setChangingBatch] =
//     useState(false);

//   /* =========================================================
//      REMOVE STUDENT MODAL
//   ========================================================= */

//   const [removeModal, setRemoveModal] =
//     useState(false);

//   const [studentToRemove, setStudentToRemove] =
//     useState(null);

//   const [removingStudent, setRemovingStudent] =
//     useState(false);


//   /* =========================================================
//      FETCH BATCH DETAILS
//   ========================================================= */

//   const fetchBatchDetails = async () => {
//     try {
//       setLoading(true);

//       /* =========================
//          GET BATCH
//       ========================= */

//       const batchResponse =
//         await getBatchById(id);

//       const batchData =
//         batchResponse?.data ||
//         batchResponse;

//       setBatch(batchData);


//       /* =========================
//          GET ASSIGNED STUDENTS
//       ========================= */

//       const studentResponse =
//         await getBatchStudents(id);

//       console.log(
//         "Batch students response:",
//         studentResponse
//       );

//       let studentList = [];


//       if (Array.isArray(studentResponse)) {
//         studentList = studentResponse;
//       }

//       else if (
//         Array.isArray(
//           studentResponse?.students
//         )
//       ) {
//         studentList =
//           studentResponse.students;
//       }

//       else if (
//         Array.isArray(
//           studentResponse?.data
//         )
//       ) {
//         studentList =
//           studentResponse.data;
//       }


//       setStudents(studentList);

//     } catch (error) {

//       console.error(
//         "Failed to load batch details:",
//         error
//       );

//       setStudents([]);

//       toast.error(
//         error?.response?.data?.message ||
//         "Failed to load batch details"
//       );

//     } finally {

//       setLoading(false);

//     }
//   };


//   /* =========================================================
//      FETCH OTHER BATCHES
//      Used for Change Batch
//   ========================================================= */

//   const fetchBatches = async () => {
//     try {

//       const response =
//         await getInstituteBatches();

//       const batchList =
//         Array.isArray(response)
//           ? response
//           : response?.data || [];


//       const otherBatches =
//         batchList.filter(
//           (item) =>
//             String(item.id) !==
//               String(id) &&
//             item.status === "ACTIVE"
//         );


//       setBatches(otherBatches);

//     } catch (error) {

//       console.error(
//         "Failed to load batches:",
//         error
//       );

//       toast.error(
//         "Failed to load available batches"
//       );

//     }
//   };


//   /* =========================================================
//      INITIAL LOAD
//   ========================================================= */

//   useEffect(() => {

//     if (!id) return;

//     fetchBatchDetails();
//     fetchBatches();

//   }, [id]);


//   /* =========================================================
//      OPEN CHANGE BATCH MODAL
//   ========================================================= */

//   const openChangeBatchModal = (
//     student
//   ) => {

//     setSelectedStudent(student);
//     setSelectedBatch("");
//     setChangeModal(true);

//   };


//   /* =========================================================
//      CHANGE STUDENT BATCH
//   ========================================================= */

//   const handleChangeBatch = async () => {

//     if (!selectedStudent) {

//       toast.error(
//         "Student not selected"
//       );

//       return;
//     }


//     if (!selectedBatch) {

//       toast.error(
//         "Please select a new batch"
//       );

//       return;
//     }


//     if (
//       String(selectedBatch) ===
//       String(id)
//     ) {

//       toast.error(
//         "Student is already in this batch"
//       );

//       return;
//     }


//     try {

//       setChangingBatch(true);


//       await changeStudentBatch(
//         id,
//         selectedStudent.student_id,
//         selectedBatch
//       );


//       toast.success(
//         "Student batch changed successfully"
//       );


//       setChangeModal(false);

//       setSelectedStudent(null);

//       setSelectedBatch("");


//       await fetchBatchDetails();

//       await fetchBatches();

//     } catch (error) {

//       console.error(
//         "Change batch error:",
//         error
//       );

//       toast.error(
//         error?.response?.data?.message ||
//         "Failed to change student batch"
//       );

//     } finally {

//       setChangingBatch(false);

//     }
//   };


//   /* =========================================================
//      OPEN REMOVE MODAL
//   ========================================================= */

//   const openRemoveModal = (
//     student
//   ) => {

//     setStudentToRemove(student);
//     setRemoveModal(true);

//   };


//   /* =========================================================
//      REMOVE STUDENT
//   ========================================================= */

//   const handleRemoveStudent = async () => {

//     if (!studentToRemove) {
//       return;
//     }


//     try {

//       setRemovingStudent(true);


//       await removeStudentFromBatch(
//         id,
//         studentToRemove.student_id
//       );


//       toast.success(
//         "Student removed from batch successfully"
//       );


//       setRemoveModal(false);

//       setStudentToRemove(null);


//       await fetchBatchDetails();

//     } catch (error) {

//       console.error(
//         "Remove student error:",
//         error
//       );

//       toast.error(
//         error?.response?.data?.message ||
//         "Failed to remove student"
//       );

//     } finally {

//       setRemovingStudent(false);

//     }
//   };


//   /* =========================================================
//      ASSIGN SUCCESS
//   ========================================================= */

//   const handleAssignSuccess = async () => {

//     setAssignModal(false);

//     await fetchBatchDetails();

//     await fetchBatches();

//   };


//   /* =========================================================
//      LOADING
//   ========================================================= */

//   if (loading) {

//     return (
//       <div className="flex min-h-[400px] items-center justify-center text-white">
//         Loading...
//       </div>
//     );

//   }


//   /* =========================================================
//      NOT FOUND
//   ========================================================= */

//   if (!batch) {

//     return (
//       <div className="p-6 text-white">
//         Batch not found
//       </div>
//     );

//   }


//   /* =========================================================
//      UI
//   ========================================================= */

//   return (

//     <div className="p-6">

//       {/* =====================================================
//           HEADER
//       ===================================================== */}

//       <div className="mb-6 flex items-center justify-between">

//         <div className="flex items-center gap-4">

//           <button
//             type="button"
//             onClick={() =>
//               navigate(
//                 "/institute/batches"
//               )
//             }
//             className="rounded-xl p-2 text-gray-400 hover:bg-[#2a2a35] hover:text-white"
//           >
//             <ArrowLeft size={22} />
//           </button>


//           <div>

//             <h1 className="text-2xl font-bold text-white">
//               {batch.batch_name}
//             </h1>


//             <p className="mt-1 text-sm text-gray-400">

//               Code:{" "}
//               {batch.batch_code || "-"}

//               {" | "}

//               Mode:{" "}
//               {batch.learning_mode || "-"}

//             </p>

//           </div>

//         </div>


//         {/* EDIT BATCH */}

//         <button
//           type="button"
//           onClick={() =>
//             navigate(
//               `/institute/batches/${id}/edit`
//             )
//           }
//           className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-5 py-2.5 font-bold text-white hover:opacity-90"
//         >

//           <Edit size={18} />

//           Edit

//         </button>

//       </div>


//       {/* =====================================================
//           CONTENT
//       ===================================================== */}

//       <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">


//         {/* ===================================================
//             BATCH INFORMATION
//         =================================================== */}

//         <div className="space-y-4 rounded-2xl border border-[#2c2c35] bg-[#151519] p-6">

//           <div>

//             <p className="text-xs text-gray-500">
//               Trainer
//             </p>

//             <p className="font-medium text-white">
//               {batch.trainer_name ||
//                 "Unassigned"}
//             </p>

//           </div>


//           <div>

//             <p className="text-xs text-gray-500">
//               Capacity
//             </p>

//             <p className="font-medium text-white">

//               {batch.current_students || 0}

//               {" / "}

//               {batch.max_students || 0}

//             </p>

//           </div>


//           <div>

//             <p className="text-xs text-gray-500">
//               Timings
//             </p>

//             <p className="font-medium text-white">

//               {batch.start_time || "-"}

//               {" - "}

//               {batch.end_time || "-"}

//             </p>

//           </div>


//           <div>

//             <p className="text-xs text-gray-500">
//               Duration
//             </p>

//             <p className="font-medium text-white">

//               {batch.start_date || "-"}

//               {" to "}

//               {batch.end_date || "-"}

//             </p>

//           </div>

//         </div>


//         {/* ===================================================
//             ASSIGNED STUDENTS
//         =================================================== */}

//         <div className="rounded-2xl border border-[#2c2c35] bg-[#151519] p-6 lg:col-span-2">


//           {/* STUDENT HEADER */}

//           <div className="mb-5 flex items-center justify-between">

//             <div>

//               <h3 className="text-lg font-semibold text-white">
//                 Assigned Students
//               </h3>


//               <p className="mt-1 text-sm text-gray-500">

//                 {students.length} student
//                 {students.length !== 1
//                   ? "s"
//                   : ""}{" "}
//                 assigned

//               </p>

//             </div>


//             {/* =================================================
//                 IMPORTANT:
//                 CLICKING THIS OPENS MODAL
//                 NO TOAST
//                 NO NAVIGATION
//             ================================================= */}

//             <button
//               type="button"
//               onClick={() =>
//                 setAssignModal(true)
//               }
//               className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
//             >

//               <UserPlus size={17} />

//               Assign Student

//             </button>

//           </div>


//           {/* STUDENT TABLE */}

//           <div className="overflow-x-auto">

//             <table className="w-full">

//               <thead className="border-b border-[#2c2c35] text-sm text-gray-400">

//                 <tr>

//                   <th className="p-3 text-left">
//                     Name
//                   </th>

//                   <th className="p-3 text-left">
//                     Mobile
//                   </th>

//                   <th className="p-3 text-left">
//                     Actions
//                   </th>

//                 </tr>

//               </thead>


//               <tbody>

//                 {students.length === 0 ? (

//                   <tr>

//                     <td
//                       colSpan={3}
//                       className="p-8 text-center text-gray-500"
//                     >
//                       No students assigned to
//                       this batch yet.
//                     </td>

//                   </tr>

//                 ) : (

//                   students.map(
//                     (student) => (

//                       <tr
//                         key={
//                           student.student_id
//                         }
//                         className="border-b border-[#2c2c35] hover:bg-[#1c1c22]"
//                       >


//                         {/* NAME */}

//                         <td className="p-3">

//                           <p className="font-medium text-white">

//                             {student.full_name ||
//                               student.student_name ||
//                               "-"}

//                           </p>

//                         </td>


//                         {/* MOBILE */}

//                         <td className="p-3 text-gray-300">

//                           {student.phone_number ||
//                             "-"}

//                         </td>


//                         {/* ACTIONS */}

//                         <td className="p-3">

//                           <div className="flex items-center gap-2">


//                             {/* CHANGE */}

//                             <button
//                               type="button"
//                               onClick={() =>
//                                 openChangeBatchModal(
//                                   student
//                                 )
//                               }
//                               className="flex items-center gap-1 rounded-lg bg-blue-500/10 px-3 py-2 text-xs font-medium text-blue-400 hover:bg-blue-500/20"
//                             >

//                               <RefreshCw
//                                 size={14}
//                               />

//                               Change

//                             </button>


//                             {/* REMOVE */}

//                             <button
//                               type="button"
//                               onClick={() =>
//                                 openRemoveModal(
//                                   student
//                                 )
//                               }
//                               className="flex items-center gap-1 rounded-lg bg-red-500/10 px-3 py-2 text-xs font-medium text-red-400 hover:bg-red-500/20"
//                             >

//                               <Trash2
//                                 size={14}
//                               />

//                               Remove

//                             </button>

//                           </div>

//                         </td>

//                       </tr>

//                     )
//                   )

//                 )}

//               </tbody>

//             </table>

//           </div>

//         </div>

//       </div>


//       {/* =====================================================
//           ASSIGN STUDENT MODAL
//       ===================================================== */}

//       <AssignStudentModal
//         isOpen={assignModal}
//         onClose={() =>
//           setAssignModal(false)
//         }
//         batchId={id}
//         onSuccess={handleAssignSuccess}
//       />


//       {/* =====================================================
//           CHANGE BATCH MODAL
//       ===================================================== */}

//       {changeModal &&
//         selectedStudent && (

//           <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">

//             <div className="relative w-full max-w-md rounded-2xl border border-[#2c2c35] bg-[#18181f] p-6">

//               {/* CLOSE */}

//               <button
//                 type="button"
//                 onClick={() =>
//                   setChangeModal(false)
//                 }
//                 disabled={
//                   changingBatch
//                 }
//                 className="absolute right-4 top-4 text-gray-400 hover:text-white"
//               >

//                 <X size={20} />

//               </button>


//               <h2 className="mb-2 text-xl font-bold text-white">
//                 Change Student Batch
//               </h2>


//               <p className="mb-6 text-sm text-gray-400">
//                 Move this student to another
//                 active batch.
//               </p>


//               {/* STUDENT */}

//               <div className="mb-5 rounded-xl bg-[#25232e] p-4">

//                 <p className="font-semibold text-white">

//                   {selectedStudent.full_name ||
//                     selectedStudent.student_name ||
//                     "Student"}

//                 </p>


//                 <p className="mt-1 text-sm text-gray-400">

//                   {selectedStudent.phone_number ||
//                     "No phone number"}

//                 </p>

//               </div>


//               {/* CURRENT BATCH */}

//               <div className="mb-4">

//                 <label className="mb-2 block text-sm text-gray-400">
//                   Current Batch
//                 </label>


//                 <div className="rounded-xl bg-[#25232e] px-4 py-3 text-white">

//                   {batch.batch_name}

//                 </div>

//               </div>


//               {/* NEW BATCH */}

//               <div className="mb-6">

//                 <label className="mb-2 block text-sm text-gray-400">
//                   New Batch
//                 </label>


//                 <select
//                   value={
//                     selectedBatch
//                   }
//                   onChange={(e) =>
//                     setSelectedBatch(
//                       e.target.value
//                     )
//                   }
//                   disabled={
//                     changingBatch
//                   }
//                   className="w-full rounded-xl border border-[#3a3845] bg-[#25232e] px-4 py-3 text-white outline-none focus:border-purple-500"
//                 >

//                   <option value="">
//                     Select new batch
//                   </option>


//                   {batches.map(
//                     (item) => (

//                       <option
//                         key={item.id}
//                         value={item.id}
//                       >

//                         {item.batch_name}

//                         {" - "}

//                         {item.current_students ||
//                           0}

//                         /

//                         {item.max_students ||
//                           0}

//                       </option>

//                     )
//                   )}

//                 </select>

//               </div>


//               {/* BUTTONS */}

//               <div className="flex gap-3">

//                 <button
//                   type="button"
//                   onClick={() => {

//                     setChangeModal(
//                       false
//                     );

//                     setSelectedStudent(
//                       null
//                     );

//                     setSelectedBatch(
//                       ""
//                     );

//                   }}
//                   disabled={
//                     changingBatch
//                   }
//                   className="flex-1 rounded-xl border border-[#3a3845] py-3 font-semibold text-gray-300 hover:bg-[#25232e]"
//                 >
//                   Cancel
//                 </button>


//                 <button
//                   type="button"
//                   onClick={
//                     handleChangeBatch
//                   }
//                   disabled={
//                     !selectedBatch ||
//                     changingBatch
//                   }
//                   className="flex-1 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 py-3 font-bold text-white disabled:opacity-50"
//                 >

//                   {changingBatch
//                     ? "Changing..."
//                     : "Change Batch"}

//                 </button>

//               </div>

//             </div>

//           </div>

//         )}


//       {/* =====================================================
//           REMOVE STUDENT MODAL
//       ===================================================== */}

//       {removeModal &&
//         studentToRemove && (

//           <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">

//             <div className="w-full max-w-md rounded-2xl border border-[#2c2c35] bg-[#18181f] p-6">


//               <h2 className="mb-2 text-xl font-bold text-white">
//                 Remove Student
//               </h2>


//               <p className="mb-6 text-sm text-gray-400">

//                 Are you sure you want to
//                 remove this student from
//                 the batch?

//               </p>


//               {/* STUDENT */}

//               <div className="mb-6 rounded-xl bg-[#25232e] p-4">

//                 <p className="font-semibold text-white">

//                   {studentToRemove.full_name ||
//                     studentToRemove.student_name ||
//                     "Student"}

//                 </p>


//                 <p className="mt-1 text-sm text-gray-400">

//                   {studentToRemove.phone_number ||
//                     "No phone number"}

//                 </p>

//               </div>


//               {/* BUTTONS */}

//               <div className="flex gap-3">

//                 <button
//                   type="button"
//                   onClick={() => {

//                     setRemoveModal(
//                       false
//                     );

//                     setStudentToRemove(
//                       null
//                     );

//                   }}
//                   disabled={
//                     removingStudent
//                   }
//                   className="flex-1 rounded-xl border border-[#3a3845] py-3 font-semibold text-gray-300 hover:bg-[#25232e]"
//                 >
//                   Cancel
//                 </button>


//                 <button
//                   type="button"
//                   onClick={
//                     handleRemoveStudent
//                   }
//                   disabled={
//                     removingStudent
//                   }
//                   className="flex-1 rounded-xl bg-red-500 py-3 font-bold text-white hover:bg-red-600 disabled:opacity-50"
//                 >

//                   {removingStudent
//                     ? "Removing..."
//                     : "Remove Student"}

//                 </button>

//               </div>

//             </div>

//           </div>

//         )}

//     </div>
//   );
// }


// BatchDetails.jsx

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  Edit,
  ArrowLeft,
  UserPlus,
  RefreshCw,
  Trash2,
  X,
} from "lucide-react";

import toast from "react-hot-toast";

import {
  getBatchById,
  getBatchStudents,
  getInstituteBatches,
  removeStudentFromBatch,
  changeStudentBatch,
} from "../../services/batchService";

export default function BatchDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  /* =========================================================
     STATE
  ========================================================= */

  const [batch, setBatch] = useState(null);
  const [students, setStudents] = useState([]);
  const [batches, setBatches] = useState([]);

  const [loading, setLoading] = useState(true);

  /* =========================================================
     CHANGE BATCH MODAL
  ========================================================= */

  const [changeModal, setChangeModal] = useState(false);

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedBatch, setSelectedBatch] = useState("");
  const [changingBatch, setChangingBatch] = useState(false);

  /* =========================================================
     REMOVE STUDENT MODAL
  ========================================================= */

  const [removeModal, setRemoveModal] = useState(false);
  const [studentToRemove, setStudentToRemove] = useState(null);
  const [removingStudent, setRemovingStudent] = useState(false);

  /* =========================================================
     FETCH BATCH DETAILS
  ========================================================= */

  const fetchBatchDetails = async () => {
    try {
      setLoading(true);

      /* =========================
         GET BATCH
      ========================= */

      const batchResponse = await getBatchById(id);

      const batchData =
        batchResponse?.data || batchResponse;

      setBatch(batchData);

      /* =========================
         GET ASSIGNED STUDENTS
      ========================= */

      const studentResponse = await getBatchStudents(id);

      console.log(
        "Batch students response:",
        studentResponse
      );

      let studentList = [];

      if (Array.isArray(studentResponse)) {
        studentList = studentResponse;
      } else if (
        Array.isArray(studentResponse?.students)
      ) {
        studentList = studentResponse.students;
      } else if (
        Array.isArray(studentResponse?.data)
      ) {
        studentList = studentResponse.data;
      }

      setStudents(studentList);
    } catch (error) {
      console.error(
        "Failed to load batch details:",
        error
      );

      setStudents([]);

      toast.error(
        error?.response?.data?.message ||
          "Failed to load batch details"
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     FETCH OTHER BATCHES
     Used for Change Batch
  ========================================================= */

  const fetchBatches = async () => {
    try {
      const response = await getInstituteBatches();

      const batchList = Array.isArray(response)
        ? response
        : response?.data || [];

      const otherBatches = batchList.filter(
        (item) =>
          String(item.id) !== String(id) &&
          item.status === "ACTIVE"
      );

      setBatches(otherBatches);
    } catch (error) {
      console.error(
        "Failed to load batches:",
        error
      );

      toast.error(
        "Failed to load available batches"
      );
    }
  };

  /* =========================================================
     INITIAL LOAD
  ========================================================= */

  useEffect(() => {
    if (!id) return;

    fetchBatchDetails();
    fetchBatches();
  }, [id]);

  /* =========================================================
     NAVIGATE TO ASSIGN STUDENT PAGE
  ========================================================= */

  const handleAssignStudent = () => {
    navigate(
      `/institute/batches/assign?batchId=${id}`
    );
  };

  /* =========================================================
     OPEN CHANGE BATCH MODAL
  ========================================================= */

  const openChangeBatchModal = (student) => {
    setSelectedStudent(student);
    setSelectedBatch("");
    setChangeModal(true);
  };

  /* =========================================================
     CHANGE STUDENT BATCH
  ========================================================= */

  const handleChangeBatch = async () => {
    if (!selectedStudent) {
      toast.error("Student not selected");
      return;
    }

    if (!selectedBatch) {
      toast.error("Please select a new batch");
      return;
    }

    if (
      String(selectedBatch) === String(id)
    ) {
      toast.error(
        "Student is already in this batch"
      );
      return;
    }

    try {
      setChangingBatch(true);

      await changeStudentBatch(
        id,
        selectedStudent.student_id,
        selectedBatch
      );

      toast.success(
        "Student batch changed successfully"
      );

      setChangeModal(false);
      setSelectedStudent(null);
      setSelectedBatch("");

      await fetchBatchDetails();
      await fetchBatches();
    } catch (error) {
      console.error(
        "Change batch error:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to change student batch"
      );
    } finally {
      setChangingBatch(false);
    }
  };

  /* =========================================================
     OPEN REMOVE MODAL
  ========================================================= */

  const openRemoveModal = (student) => {
    setStudentToRemove(student);
    setRemoveModal(true);
  };

  /* =========================================================
     REMOVE STUDENT
  ========================================================= */

  const handleRemoveStudent = async () => {
    if (!studentToRemove) {
      return;
    }

    try {
      setRemovingStudent(true);

      await removeStudentFromBatch(
        id,
        studentToRemove.student_id
      );

      toast.success(
        "Student removed from batch successfully"
      );

      setRemoveModal(false);
      setStudentToRemove(null);

      await fetchBatchDetails();
    } catch (error) {
      console.error(
        "Remove student error:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to remove student"
      );
    } finally {
      setRemovingStudent(false);
    }
  };

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  /* =========================================================
     NOT FOUND
  ========================================================= */

  if (!batch) {
    return (
      <div className="p-6 text-white">
        Batch not found
      </div>
    );
  }

  /* =========================================================
     UI
  ========================================================= */

  return (
    <div className="p-6">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="mb-6 flex items-center justify-between">

        <div className="flex items-center gap-4">

          <button
            type="button"
            onClick={() =>
              navigate("/institute/batches")
            }
            className="rounded-xl p-2 text-gray-400 hover:bg-[#2a2a35] hover:text-white"
          >
            <ArrowLeft size={22} />
          </button>

          <div>

            <h1 className="text-2xl font-bold text-white">
              {batch.batch_name}
            </h1>

            <p className="mt-1 text-sm text-gray-400">
              Code: {batch.batch_code || "-"}
              {" | "}
              Mode: {batch.learning_mode || "-"}
            </p>

          </div>

        </div>

        {/* EDIT BATCH */}

        <button
          type="button"
          onClick={() =>
            navigate(
              `/institute/batches/${id}/edit`
            )
          }
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-5 py-2.5 font-bold text-white hover:opacity-90"
        >
          <Edit size={18} />
          Edit
        </button>

      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* ===================================================
            BATCH INFORMATION
        =================================================== */}

        <div className="space-y-4 rounded-2xl border border-[#2c2c35] bg-[#151519] p-6">

          <div>
            <p className="text-xs text-gray-500">
              Trainer
            </p>

            <p className="font-medium text-white">
              {batch.trainer_name ||
                "Unassigned"}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500">
              Capacity
            </p>

            <p className="font-medium text-white">
              {batch.current_students || 0}
              {" / "}
              {batch.max_students || 0}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500">
              Timings
            </p>

            <p className="font-medium text-white">
              {batch.start_time || "-"}
              {" - "}
              {batch.end_time || "-"}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500">
              Duration
            </p>

            <p className="font-medium text-white">
              {batch.start_date || "-"}
              {" to "}
              {batch.end_date || "-"}
            </p>
          </div>

        </div>

        {/* ===================================================
            ASSIGNED STUDENTS
        =================================================== */}

        <div className="rounded-2xl border border-[#2c2c35] bg-[#151519] p-6 lg:col-span-2">

          {/* STUDENT HEADER */}

          <div className="mb-5 flex items-center justify-between">

            <div>

              <h3 className="text-lg font-semibold text-white">
                Assigned Students
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                {students.length} student
                {students.length !== 1
                  ? "s"
                  : ""}{" "}
                assigned
              </p>

            </div>

            {/* =================================================
                NAVIGATE TO ASSIGNMENT PAGE
            ================================================= */}

            <button
              type="button"
              onClick={handleAssignStudent}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
            >
              <UserPlus size={17} />
              Assign Student
            </button>

          </div>

          {/* STUDENT TABLE */}

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="border-b border-[#2c2c35] text-sm text-gray-400">

                <tr>

                  <th className="p-3 text-left">
                    Name
                  </th>

                  <th className="p-3 text-left">
                    Mobile
                  </th>

                  <th className="p-3 text-left">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {students.length === 0 ? (

                  <tr>

                    <td
                      colSpan={3}
                      className="p-8 text-center text-gray-500"
                    >
                      No students assigned to
                      this batch yet.
                    </td>

                  </tr>

                ) : (

                  students.map((student) => (

                    <tr
                      key={student.student_id}
                      className="border-b border-[#2c2c35] hover:bg-[#1c1c22]"
                    >

                      {/* NAME */}

                      <td className="p-3">

                        <p className="font-medium text-white">
                          {student.full_name ||
                            student.student_name ||
                            "-"}
                        </p>

                      </td>

                      {/* MOBILE */}

                      <td className="p-3 text-gray-300">
                        {student.phone_number ||
                          "-"}
                      </td>

                      {/* ACTIONS */}

                      <td className="p-3">

                        <div className="flex items-center gap-2">

                          {/* CHANGE */}

                          <button
                            type="button"
                            onClick={() =>
                              openChangeBatchModal(
                                student
                              )
                            }
                            className="flex items-center gap-1 rounded-lg bg-blue-500/10 px-3 py-2 text-xs font-medium text-blue-400 hover:bg-blue-500/20"
                          >
                            <RefreshCw
                              size={14}
                            />
                            Change
                          </button>

                          {/* REMOVE */}

                          <button
                            type="button"
                            onClick={() =>
                              openRemoveModal(
                                student
                              )
                            }
                            className="flex items-center gap-1 rounded-lg bg-red-500/10 px-3 py-2 text-xs font-medium text-red-400 hover:bg-red-500/20"
                          >
                            <Trash2
                              size={14}
                            />
                            Remove
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

      </div>

      {/* =====================================================
          CHANGE BATCH MODAL
      ===================================================== */}

      {changeModal &&
        selectedStudent && (

          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">

            <div className="relative w-full max-w-md rounded-2xl border border-[#2c2c35] bg-[#18181f] p-6">

              {/* CLOSE */}

              <button
                type="button"
                onClick={() =>
                  setChangeModal(false)
                }
                disabled={changingBatch}
                className="absolute right-4 top-4 text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>

              <h2 className="mb-2 text-xl font-bold text-white">
                Change Student Batch
              </h2>

              <p className="mb-6 text-sm text-gray-400">
                Move this student to another
                active batch.
              </p>

              {/* STUDENT */}

              <div className="mb-5 rounded-xl bg-[#25232e] p-4">

                <p className="font-semibold text-white">
                  {selectedStudent.full_name ||
                    selectedStudent.student_name ||
                    "Student"}
                </p>

                <p className="mt-1 text-sm text-gray-400">
                  {selectedStudent.phone_number ||
                    "No phone number"}
                </p>

              </div>

              {/* CURRENT BATCH */}

              <div className="mb-4">

                <label className="mb-2 block text-sm text-gray-400">
                  Current Batch
                </label>

                <div className="rounded-xl bg-[#25232e] px-4 py-3 text-white">
                  {batch.batch_name}
                </div>

              </div>

              {/* NEW BATCH */}

              <div className="mb-6">

                <label className="mb-2 block text-sm text-gray-400">
                  New Batch
                </label>

                <select
                  value={selectedBatch}
                  onChange={(e) =>
                    setSelectedBatch(
                      e.target.value
                    )
                  }
                  disabled={changingBatch}
                  className="w-full rounded-xl border border-[#3a3845] bg-[#25232e] px-4 py-3 text-white outline-none focus:border-purple-500"
                >

                  <option value="">
                    Select new batch
                  </option>

                  {batches.map((item) => (

                    <option
                      key={item.id}
                      value={item.id}
                    >
                      {item.batch_name}
                      {" - "}
                      {item.current_students ||
                        0}
                      /
                      {item.max_students ||
                        0}
                    </option>

                  ))}

                </select>

              </div>

              {/* BUTTONS */}

              <div className="flex gap-3">

                <button
                  type="button"
                  onClick={() => {
                    setChangeModal(false);
                    setSelectedStudent(null);
                    setSelectedBatch("");
                  }}
                  disabled={changingBatch}
                  className="flex-1 rounded-xl border border-[#3a3845] py-3 font-semibold text-gray-300 hover:bg-[#25232e]"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleChangeBatch}
                  disabled={
                    !selectedBatch ||
                    changingBatch
                  }
                  className="flex-1 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 py-3 font-bold text-white disabled:opacity-50"
                >
                  {changingBatch
                    ? "Changing..."
                    : "Change Batch"}
                </button>

              </div>

            </div>

          </div>

        )}

      {/* =====================================================
          REMOVE STUDENT MODAL
      ===================================================== */}

      {removeModal &&
        studentToRemove && (

          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">

            <div className="w-full max-w-md rounded-2xl border border-[#2c2c35] bg-[#18181f] p-6">

              <h2 className="mb-2 text-xl font-bold text-white">
                Remove Student
              </h2>

              <p className="mb-6 text-sm text-gray-400">
                Are you sure you want to
                remove this student from
                the batch?
              </p>

              {/* STUDENT */}

              <div className="mb-6 rounded-xl bg-[#25232e] p-4">

                <p className="font-semibold text-white">
                  {studentToRemove.full_name ||
                    studentToRemove.student_name ||
                    "Student"}
                </p>

                <p className="mt-1 text-sm text-gray-400">
                  {studentToRemove.phone_number ||
                    "No phone number"}
                </p>

              </div>

              {/* BUTTONS */}

              <div className="flex gap-3">

                <button
                  type="button"
                  onClick={() => {
                    setRemoveModal(false);
                    setStudentToRemove(null);
                  }}
                  disabled={removingStudent}
                  className="flex-1 rounded-xl border border-[#3a3845] py-3 font-semibold text-gray-300 hover:bg-[#25232e]"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleRemoveStudent}
                  disabled={removingStudent}
                  className="flex-1 rounded-xl bg-red-500 py-3 font-bold text-white hover:bg-red-600 disabled:opacity-50"
                >
                  {removingStudent
                    ? "Removing..."
                    : "Remove Student"}
                </button>

              </div>

            </div>

          </div>

        )}

    </div>
  );
}