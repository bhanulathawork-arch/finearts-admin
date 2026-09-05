// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { HiPencil, HiTrash, HiPlus } from "react-icons/hi";

// import API from "../services/api";

// import DataTable from "../components/ui/DataTable";
// import Button from "../components/ui/Button";
// import Badge from "../components/ui/Badge";

// export default function Classes() {

//   const [classes, setClasses] = useState([]);

//   /* FETCH CLASSES */
//   const fetchClasses = async () => {
//     try {

//       const res = await API.get("/classes");

//       setClasses(res.data.data || []);

//     } catch (err) {

//       console.log(err);

//       toast.error("Failed to fetch classes");
//     }
//   };

//   useEffect(() => {
//     fetchClasses();
//   }, []);

//   /* TABLE COLUMNS */
//   const columns = [

//     {
//       key: "title",
//       label: "Title",
//       render: (value) => (
//         <span className="font-medium">
//           {value}
//         </span>
//       ),
//     },

//     {
//       key: "category_name",
//       label: "Category",
//     },

//     {
//       key: "trainer_name",
//       label: "Trainer",
//     },

//     {
//       key: "price",
//       label: "Price",
//       render: (value) => `$${value}`,
//     },

//     {
//       key: "status",
//       label: "Status",
//       render: (value) => (
//         <Badge
//           variant={
//             value === "ACTIVE"
//               ? "success"
//               : "warning"
//           }
//         >
//           {value}
//         </Badge>
//       ),
//     },

//     {
//       key: "rating",
//       label: "Rating",
//       render: () => "4.8",
//     },

//   ];

//   return (
//     <div className="space-y-6 animate-slide-up">

//       {/* HEADER */}
//       <div className="flex items-center justify-between">

//         <div>
//           <h1 className="text-3xl font-bold gradient-text">
//             Classes
//           </h1>

//           <p className="text-gray-400 mt-1">
//             Manage all your course listings
//           </p>
//         </div>

//         <Button icon={HiPlus}>
//           Add Class
//         </Button>

//       </div>

//       {/* TABLE */}
//       <DataTable
//         columns={columns}
//         data={classes}
//         actions={(row) => (
//           <>

//             <Button
//               variant="ghost"
//               size="sm"
//               icon={HiPencil}
//             />

//             <Button
//               variant="ghost"
//               size="sm"
//               icon={HiTrash}
//               className="text-red-400 hover:text-red-300"
//             />

//           </>
//         )}
//       />

//     </div>
//   );
// }


import api from "./api";

/* ===========================
   Classes
=========================== */

export const getClasses = async (params = {}) => {
  const res = await api.get("/classes", { params });
  return res.data;
};

export const getClassById = async (id) => {
  const res = await api.get(`/classes/${id}`);
  return res.data;
};

export const createClass = async (payload) => {
  const res = await api.post("/classes", payload);
  return res.data;
};

export const updateClass = async (id, payload) => {
  const res = await api.put(`/classes/${id}`, payload);
  return res.data;
};

export const deleteClass = async (id) => {
  const res = await api.delete(`/classes/${id}`);
  return res.data;
};

export const getClassDays = async (classId) => {
  const res = await api.get(`/classes/${classId}/days`);
  return res.data;
};