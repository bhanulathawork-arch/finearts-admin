// import { Eye, Edit, Trash2 } from "lucide-react";

// const getStatusBadge = (status) => {
//   if (status === "ACTIVE") return "bg-green-500/20 text-green-400";
//   return "bg-gray-500/20 text-gray-400";
// };

// export default function StudentTable({ students, loading, onView, onEdit, onDelete }) {
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center py-12">
//         <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   if (!students || students.length === 0) {
//     return <div className="text-center py-12 text-gray-500">No students found.</div>;
//   }

//   return (
//     <div className="overflow-x-auto">
//       <table className="w-full">
//         <thead className="bg-[#202027] text-white text-sm">
//           <tr>
//             <th className="p-4 text-left">Photo</th>
           
//             <th className="p-4 text-left">Name</th>
//             <th className="p-4 text-left">Mobile</th>
//             <th className="p-4 text-left">Category</th>
//             <th className="p-4 text-left">Trainer</th>
//             <th className="p-4 text-left">Status</th>
//             <th className="p-4 text-left">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {students.map((s) => (
//             <tr key={s.student.id} className="border-t border-[#2c2c35] hover:bg-[#1a1a20] transition-colors">
//               <td className="p-4">
//                 {s.student.student_photo ? (
//                   <img src={s.student.student_photo} alt="" className="w-10 h-10 rounded-xl object-cover border border-[#333]" />
//                 ) : (
//                   <div className="w-10 h-10 bg-[#26262b] rounded-xl flex items-center justify-center text-xs text-gray-500">N/A</div>
//                 )}
//               </td>
             
//               <td className="p-4 text-white font-medium">{s.user.full_name}</td>
//               <td className="p-4 text-gray-300">{s.account.phone_number}</td>
//               <td className="p-4 text-gray-300">{s.category?.name || "-"}</td>
//               <td className="p-4 text-gray-300">{s.student.trainer_id || "-"}</td>
//               <td className="p-4">
//                 <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusBadge(s.student.status)}`}>
//                   {s.student.status}
//                 </span>
//               </td>
//               <td className="p-4">
//                 <div className="flex items-center gap-2">
//                   <button onClick={() => onView(s.student.id)} className="p-2 rounded-lg hover:bg-[#2a2a35] text-gray-400 hover:text-white transition-colors" title="View"><Eye size={16} /></button>
//                   <button onClick={() => onEdit(s.student.id)} className="p-2 rounded-lg hover:bg-[#2a2a35] text-gray-400 hover:text-white transition-colors" title="Edit"><Edit size={16} /></button>
//                   <button onClick={() => onDelete(s.student.id)} className="p-2 rounded-lg hover:bg-red-500/10 text-red-500/70 hover:text-red-400 transition-colors" title="Delete"><Trash2 size={16} /></button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }



import { Eye, Edit, Trash2 } from "lucide-react";


/* =========================================================
   STATUS BADGE
========================================================= */

const getStatusBadge = (status) => {
  if (status === "ACTIVE") {
    return "bg-green-500/20 text-green-400";
  }

  if (status === "COMPLETED") {
    return "bg-blue-500/20 text-blue-400";
  }

  return "bg-gray-500/20 text-gray-400";
};


/* =========================================================
   REGISTRATION SOURCE
========================================================= */

const getRegistrationSource = (student) => {
  const source = String(
    student?.student?.registration_source ||
      student?.registration_source ||
      ""
  ).toUpperCase();

  if (source === "ONLINE") {
    return "ONLINE";
  }

  return "OFFLINE";
};


/* =========================================================
   SOURCE BADGE
========================================================= */

const SourceBadge = ({ student }) => {
  const source =
    getRegistrationSource(student);

  if (source === "ONLINE") {
    return (
      <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-green-500/15 text-green-400 border border-green-500/20">
        <span className="w-2 h-2 rounded-full bg-green-400" />
        Online
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-orange-500/15 text-orange-400 border border-orange-500/20">
      <span className="w-2 h-2 rounded-full bg-orange-400" />
      Offline
    </span>
  );
};


/* =========================================================
   LEARNING MODE BADGE
========================================================= */

const LearningModeBadge = ({ student }) => {
  const mode = String(
    student?.student?.learning_mode ||
      student?.learning_mode ||
      ""
  ).toUpperCase();

  if (mode === "ONLINE") {
    return (
      <span className="text-blue-400 text-xs font-medium">
        Online
      </span>
    );
  }

  if (mode === "OFFLINE") {
    return (
      <span className="text-gray-400 text-xs font-medium">
        Offline
      </span>
    );
  }

  return (
    <span className="text-gray-500 text-xs">
      -
    </span>
  );
};


/* =========================================================
   STUDENT TABLE
========================================================= */

export default function StudentTable({
  students,
  loading,
  onView,
  onEdit,
  onDelete,
}) {

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">

        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />

      </div>
    );
  }


  /* =======================================================
     EMPTY
  ======================================================= */

  if (
    !students ||
    students.length === 0
  ) {
    return (
      <div className="text-center py-12 text-gray-500">
        No students found.
      </div>
    );
  }


  /* =======================================================
     TABLE
  ======================================================= */

  return (
    <div className="overflow-x-auto">

      <table className="w-full">

        {/* =================================================
            HEADER
        ================================================= */}

        <thead className="bg-[#202027] text-white text-sm">

          <tr>

            <th className="p-4 text-left">
              Photo
            </th>

            <th className="p-4 text-left">
              Name
            </th>

            <th className="p-4 text-left">
              Mobile
            </th>

            <th className="p-4 text-left">
              Category
            </th>

            <th className="p-4 text-left">
              Trainer
            </th>

            <th className="p-4 text-left">
              Source
            </th>

            <th className="p-4 text-left">
              Learning Mode
            </th>

            <th className="p-4 text-left">
              Status
            </th>

            <th className="p-4 text-left">
              Actions
            </th>

          </tr>

        </thead>


        {/* =================================================
            BODY
        ================================================= */}

        <tbody>

          {students.map((s) => {

            const studentId =
              s?.student?.id ||
              s?.id;

            const fullName =
              s?.user?.full_name ||
              s?.full_name ||
              "Unknown Student";

            const phone =
              s?.account?.phone_number ||
              s?.phone_number ||
              "No phone";

            const category =
              s?.category?.name ||
              "-";

            const trainer =
              s?.student?.trainer_id ||
              "-";

            const status =
              s?.student?.status ||
              "ACTIVE";


            return (
              <tr
                key={studentId}
                className="border-t border-[#2c2c35] hover:bg-[#1a1a20] transition-colors"
              >

                {/* =========================================
                    PHOTO
                ========================================= */}

                <td className="p-4">

                  {s?.student?.student_photo ? (

                    <img
                      src={
                        s.student.student_photo
                      }
                      alt={fullName}
                      className="w-10 h-10 rounded-xl object-cover border border-[#333]"
                    />

                  ) : (

                    <div className="w-10 h-10 bg-[#26262b] rounded-xl flex items-center justify-center text-xs text-gray-500">
                      N/A
                    </div>

                  )}

                </td>


                {/* =========================================
                    NAME
                ========================================= */}

                <td className="p-4">

                  <div className="text-white font-medium">
                    {fullName}
                  </div>

                </td>


                {/* =========================================
                    MOBILE
                ========================================= */}

                <td className="p-4 text-gray-300">
                  {phone}
                </td>


                {/* =========================================
                    CATEGORY
                ========================================= */}

                <td className="p-4 text-gray-300">
                  {category}
                </td>


                {/* =========================================
                    TRAINER
                ========================================= */}

                <td className="p-4 text-gray-300">
                  {trainer}
                </td>


                {/* =========================================
                    SOURCE
                ========================================= */}

                <td className="p-4">

                  <SourceBadge
                    student={s}
                  />

                </td>


                {/* =========================================
                    LEARNING MODE
                ========================================= */}

                <td className="p-4">

                  <LearningModeBadge
                    student={s}
                  />

                </td>


                {/* =========================================
                    STATUS
                ========================================= */}

                <td className="p-4">

                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusBadge(
                      status
                    )}`}
                  >
                    {status}
                  </span>

                </td>


                {/* =========================================
                    ACTIONS
                ========================================= */}

                <td className="p-4">

                  <div className="flex items-center gap-2">

                    {/* VIEW */}

                    <button
                      onClick={() =>
                        onView(studentId)
                      }
                      className="p-2 rounded-lg hover:bg-[#2a2a35] text-gray-400 hover:text-white transition-colors"
                      title="View"
                    >
                      <Eye size={16} />
                    </button>


                    {/* EDIT */}

                    <button
                      onClick={() =>
                        onEdit(studentId)
                      }
                      className="p-2 rounded-lg hover:bg-[#2a2a35] text-gray-400 hover:text-white transition-colors"
                      title="Edit"
                    >
                      <Edit size={16} />
                    </button>


                    {/* DELETE */}

                    <button
                      onClick={() =>
                        onDelete(studentId)
                      }
                      className="p-2 rounded-lg hover:bg-red-500/10 text-red-500/70 hover:text-red-400 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>

                  </div>

                </td>

              </tr>
            );
          })}

        </tbody>

      </table>

    </div>
  );
}