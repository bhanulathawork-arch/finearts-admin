
import { useEffect, useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { getAuth } from "firebase/auth";

const API =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

export default function TrainerStudents() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

//   async function fetchStudents() {
//   try {
//     const auth = getAuth();

//     const token =
//       await auth.currentUser?.getIdToken(true);

//     const res = await fetch(
//       `${API}/trainers/students`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     const data = await res.json();

//     setStudents(data.data || []);
//   } catch (err) {
//     console.error(err);
//   }
// }

async function fetchStudents() {
  try {
    const auth = getAuth();

    let token = null;

    if (auth.currentUser) {
      token = await auth.currentUser.getIdToken(true);
    } else {
      token = localStorage.getItem("token");
    }

    console.log("TOKEN =", token);

    if (!token) {
      console.error("No Firebase token found");
      return;
    }

    const res = await fetch(
      `${API}/trainers/students`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    console.log(data);

    setStudents(data.data || []);
  } catch (err) {
    console.error(err);
  }
}

  const filteredStudents = students.filter(
  (student) =>
    (`User #${student.id}`)
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
    student.email
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
    student.phone_number
      ?.includes(searchTerm) ||
    student.role
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase())
);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold gradient-text">
        My Students
      </h1>

<div className="w-full mb-6">
  <div className="relative w-full">
    <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />

    <input
      type="text"
      placeholder="Search my students..."
      value={searchTerm}
      onChange={(e) =>
        setSearchTerm(e.target.value)
      }
      className="w-full h-14 pl-12 pr-4 rounded-2xl bg-[#14141c] border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
    />
  </div>
</div>
    <div className="glass-effect rounded-2xl overflow-hidden">

  <table className="w-full">

    <thead>
      <tr className="bg-white/5">

        <th className="px-6 py-5 text-left">
          Name
        </th>

        <th className="px-6 py-5 text-left">
          Email
        </th>

        <th className="px-6 py-5 text-left">
          Phone
        </th>

        <th className="px-6 py-5 text-left">
          Role
        </th>

        <th className="px-6 py-5 text-left">
          Status
        </th>

        <th className="px-6 py-5 text-left">
          Joined
        </th>

      </tr>
    </thead>

    <tbody>
  {filteredStudents.length === 0 ? (
    <tr>
      <td
        colSpan={6}
        className="text-center py-8 text-gray-400"
      >
        No students found
      </td>
    </tr>
  ) : (
    filteredStudents.map((student) => (
      <tr
        key={student.id}
        className="border-t border-white/10 hover:bg-white/5"
      >
        <td className="px-6 py-4">
          User #{student.id}
        </td>

        <td className="px-6 py-4">
          {student.email}
        </td>

        <td className="px-6 py-4">
          {student.phone_number || "-"}
        </td>

        <td className="px-6 py-4">
          {student.role}
        </td>

        <td className="px-6 py-4">
          <span
            className={
              student.is_active
                ? "text-green-400 font-medium"
                : "text-red-400 font-medium"
            }
          >
            {student.is_active
              ? "Active"
              : "Inactive"}
          </span>
        </td>

        <td className="px-6 py-4">
          {new Date(
            student.created_at
          ).toLocaleDateString()}
        </td>
      </tr>
    ))
  )}
</tbody>

  </table>

</div>
    </div>
  );
}