// import { useEffect, useState } from "react";
// import Select from "react-select";
// import toast from "react-hot-toast";

// import { getInstituteStudents } from "../../services/studentService";
// import { collectPayment } from "../../services/batchService";

// export default function CollectPayment() {
//   const [students, setStudents] = useState([]);
//   const [selectedStudent, setSelectedStudent] = useState(null);

//   const [loadingStudents, setLoadingStudents] = useState(false);
//   const [loadingPayment, setLoadingPayment] = useState(false);

//   const [form, setForm] = useState({
//     batch_id: "",
//     amount: "",
//     discount: "",
//     paid_amount: "",
//     due_amount: "",
//     payment_method: "CASH",
//     payment_status: "PAID",
//     transaction_id: "",
//     payment_date: new Date().toISOString().split("T")[0],
//     next_due_date: "",
//     remarks: "",
//   });

//   /* =========================================================
//      LOAD INSTITUTE STUDENTS
//   ========================================================= */

//   useEffect(() => {
//     loadStudents();
//   }, []);

//   const loadStudents = async () => {
//     try {
//       setLoadingStudents(true);

//       const studentList = await getInstituteStudents();

//       console.log("Students received:", studentList);

//       if (!Array.isArray(studentList)) {
//         console.error(
//           "Expected student array but received:",
//           studentList
//         );

//         setStudents([]);

//         toast.error("Invalid student data received");

//         return;
//       }

//       const options = studentList
//         .filter((student) => student?.id)
//         .map((student) => ({
//           value: student.id,

//           label: `${student.full_name || "Unknown Student"} - ${
//             student.phone_number || "No phone"
//           }`,

//           student,
//         }));

//       setStudents(options);
//     } catch (error) {
//       console.error(
//         "Failed to load students:",
//         error
//       );

//       setStudents([]);

//       toast.error(
//         error?.response?.data?.message ||
//           "Failed to load students"
//       );
//     } finally {
//       setLoadingStudents(false);
//     }
//   };

//   /* =========================================================
//      STUDENT SELECTION
//   ========================================================= */

//   const handleStudentChange = (option) => {
//     setSelectedStudent(option);

//     /*
//       Reset payment fields whenever
//       a different student is selected.
//     */

//     setForm({
//       batch_id: "",
//       amount: "",
//       discount: "",
//       paid_amount: "",
//       due_amount: "",
//       payment_method: "CASH",
//       payment_status: "PAID",
//       transaction_id: "",
//       payment_date: new Date()
//         .toISOString()
//         .split("T")[0],
//       next_due_date: "",
//       remarks: "",
//     });
//   };

//   /* =========================================================
//      FORM CHANGE
//   ========================================================= */

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     if (
//       name === "amount" ||
//       name === "discount" ||
//       name === "paid_amount"
//     ) {
//       calculateDueAmount(name, value);
//     }
//   };

//   /* =========================================================
//      CALCULATE DUE AMOUNT
//   ========================================================= */

//   const calculateDueAmount = (
//     changedField,
//     changedValue
//   ) => {
//     const amount =
//       changedField === "amount"
//         ? Number(changedValue || 0)
//         : Number(form.amount || 0);

//     const discount =
//       changedField === "discount"
//         ? Number(changedValue || 0)
//         : Number(form.discount || 0);

//     const paid =
//       changedField === "paid_amount"
//         ? Number(changedValue || 0)
//         : Number(form.paid_amount || 0);

//     const finalAmount = Math.max(
//       amount - discount,
//       0
//     );

//     const dueAmount = Math.max(
//       finalAmount - paid,
//       0
//     );

//     setForm((prev) => ({
//       ...prev,
//       due_amount: dueAmount,
//     }));
//   };

//   /* =========================================================
//      COLLECT PAYMENT
//   ========================================================= */

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     /* -----------------------------------------
//        STUDENT VALIDATION
//     ----------------------------------------- */

//     if (!selectedStudent) {
//       toast.error("Please select a student");
//       return;
//     }

//     /* -----------------------------------------
//        BATCH VALIDATION
//     ----------------------------------------- */

//     if (!form.batch_id) {
//       toast.error("Please enter batch ID");
//       return;
//     }

//     /* -----------------------------------------
//        AMOUNT VALIDATION
//     ----------------------------------------- */

//     if (!form.amount || Number(form.amount) <= 0) {
//       toast.error("Please enter a valid amount");
//       return;
//     }

//     /* -----------------------------------------
//        PAID AMOUNT VALIDATION
//     ----------------------------------------- */

//     if (
//       form.paid_amount === "" ||
//       Number(form.paid_amount) < 0
//     ) {
//       toast.error("Please enter a valid paid amount");
//       return;
//     }

//     /* -----------------------------------------
//        PAID AMOUNT CANNOT EXCEED FINAL AMOUNT
//     ----------------------------------------- */

//     const totalAmount = Number(form.amount || 0);

//     const discountAmount = Number(
//       form.discount || 0
//     );

//     const paidAmount = Number(
//       form.paid_amount || 0
//     );

//     const finalAmount = Math.max(
//       totalAmount - discountAmount,
//       0
//     );

//     if (discountAmount > totalAmount) {
//       toast.error(
//         "Discount cannot be greater than total amount"
//       );
//       return;
//     }

//     if (paidAmount > finalAmount) {
//       toast.error(
//         "Paid amount cannot be greater than final amount"
//       );
//       return;
//     }

//     try {
//       setLoadingPayment(true);

//       const paymentData = {
//         student_id: selectedStudent.value,

//         batch_id: form.batch_id,

//         amount: totalAmount,

//         discount: discountAmount,

//         paid_amount: paidAmount,

//         due_amount: Number(
//           form.due_amount || 0
//         ),

//         payment_method:
//           form.payment_method,

//         payment_status:
//           form.payment_status,

//         transaction_id:
//           form.transaction_id || null,

//         payment_date:
//           form.payment_date,

//         next_due_date:
//           form.next_due_date || null,

//         remarks:
//           form.remarks || null,
//       };

//       console.log(
//         "Payment data:",
//         paymentData
//       );

//       const response =
//         await collectPayment(paymentData);

//       console.log(
//         "Payment response:",
//         response
//       );

//       toast.success(
//         response?.message ||
//           "Payment collected successfully"
//       );

//       /* -----------------------------------------
//          RESET
//       ----------------------------------------- */

//       setSelectedStudent(null);

//       setForm({
//         batch_id: "",
//         amount: "",
//         discount: "",
//         paid_amount: "",
//         due_amount: "",
//         payment_method: "CASH",
//         payment_status: "PAID",
//         transaction_id: "",
//         payment_date: new Date()
//           .toISOString()
//           .split("T")[0],
//         next_due_date: "",
//         remarks: "",
//       });
//     } catch (error) {
//       console.error(
//         "Collect payment error:",
//         error
//       );

//       toast.error(
//         error?.response?.data?.message ||
//           error?.message ||
//           "Failed to collect payment"
//       );
//     } finally {
//       setLoadingPayment(false);
//     }
//   };

//   /* =========================================================
//      SELECT STYLES
//   ========================================================= */

//   const selectStyles = {
//     control: (base, state) => ({
//       ...base,

//       backgroundColor: "#2b2638",

//       borderColor: state.isFocused
//         ? "#a855f7"
//         : "#7c3aed",

//       boxShadow: state.isFocused
//         ? "0 0 0 1px #a855f7"
//         : "none",

//       minHeight: "52px",

//       "&:hover": {
//         borderColor: "#a855f7",
//       },
//     }),

//     menu: (base) => ({
//       ...base,

//       backgroundColor: "#2b2638",

//       zIndex: 9999,
//     }),

//     menuList: (base) => ({
//       ...base,

//       backgroundColor: "#2b2638",

//       padding: 0,

//       maxHeight: "300px",
//     }),

//     option: (base, state) => ({
//       ...base,

//       backgroundColor: state.isFocused
//         ? "#7c3aed"
//         : "#2b2638",

//       color: "#ffffff",

//       padding: "12px 14px",

//       cursor: "pointer",
//     }),

//     singleValue: (base) => ({
//       ...base,

//       color: "#ffffff",
//     }),

//     input: (base) => ({
//       ...base,

//       color: "#ffffff",
//     }),

//     placeholder: (base) => ({
//       ...base,

//       color: "#9ca3af",
//     }),

//     indicatorSeparator: (base) => ({
//       ...base,

//       backgroundColor: "#4b445c",
//     }),

//     dropdownIndicator: (base) => ({
//       ...base,

//       color: "#a855f7",

//       "&:hover": {
//         color: "#c084fc",
//       },
//     }),

//     clearIndicator: (base) => ({
//       ...base,

//       color: "#9ca3af",

//       "&:hover": {
//         color: "#ffffff",
//       },
//     }),
//   };

//   /* =========================================================
//      RENDER
//   ========================================================= */

//   return (
//     <div className="min-h-screen p-6">

//       {/* =====================================================
//           PAGE TITLE
//       ===================================================== */}

//       <div className="mb-8">
//         <h1 className="text-4xl font-bold text-purple-400">
//           Collect Payment
//         </h1>

//         <p className="text-gray-400 mt-2">
//           Select a student and record their payment.
//         </p>
//       </div>

//       {/* =====================================================
//           PAYMENT CARD
//       ===================================================== */}

//       <div className="max-w-3xl mx-auto bg-[#151519] border border-[#2c2c35] rounded-2xl p-8">

//         {/* ===================================================
//             STUDENT SELECT
//         =================================================== */}

//         <div className="mb-6">

//           <label className="block text-white font-medium mb-2">
//             Select Student
//           </label>

//           <Select
//             options={students}
//             value={selectedStudent}
//             onChange={handleStudentChange}

//             isSearchable
//             isClearable

//             isLoading={loadingStudents}

//             placeholder="Search student by name or phone..."

//             noOptionsMessage={() =>
//               loadingStudents
//                 ? "Loading students..."
//                 : "No students found"
//             }

//             loadingMessage={() =>
//               "Loading students..."
//             }

//             styles={selectStyles}

//             formatOptionLabel={(option) => (
//               <div className="py-1">

//                 <div className="font-semibold text-white">
//                   {option.student?.full_name ||
//                     "Unknown Student"}
//                 </div>

//                 <div className="text-sm text-gray-400 mt-1">
//                   {option.student?.phone_number ||
//                     "No phone"}
//                 </div>

//               </div>
//             )}

//             filterOption={(
//               option,
//               inputValue
//             ) => {
//               const search =
//                 inputValue
//                   .toLowerCase()
//                   .trim();

//               const name =
//                 option.student?.full_name
//                   ?.toLowerCase() || "";

//               const phone =
//                 option.student?.phone_number
//                   ?.toLowerCase() || "";

//               return (
//                 name.includes(search) ||
//                 phone.includes(search)
//               );
//             }}
//           />

//         </div>

//         {/* ===================================================
//             SELECTED STUDENT
//         =================================================== */}

//         {selectedStudent && (
//           <div className="bg-[#2b2638] border border-[#3b354d] rounded-xl p-5 mb-6">

//             <p className="text-xs text-gray-400 mb-2">
//               Selected Student
//             </p>

//             <h3 className="text-xl font-semibold text-white">
//               {selectedStudent.student?.full_name ||
//                 "Unknown Student"}
//             </h3>

//             <p className="text-gray-400 mt-1">
//               {selectedStudent.student?.phone_number ||
//                 "No phone"}
//             </p>

//           </div>
//         )}

//         {/* ===================================================
//             PAYMENT FORM
//         =================================================== */}

//         {selectedStudent && (
//           <form
//             onSubmit={handleSubmit}
//             className="space-y-5"
//           >

//             {/* =================================================
//                 BATCH
//             ================================================= */}

//             <div>
//               <label className="block text-gray-300 mb-2">
//                 Batch ID
//               </label>

//               <input
//                 type="text"
//                 name="batch_id"
//                 value={form.batch_id}
//                 onChange={handleChange}
//                 placeholder="Enter batch ID"
//                 className="w-full p-3 rounded-xl bg-[#2b2638] text-white border border-[#3b354d] outline-none focus:border-purple-500"
//               />
//             </div>

//             {/* =================================================
//                 TOTAL AMOUNT
//             ================================================= */}

//             <div>
//               <label className="block text-gray-300 mb-2">
//                 Total Amount
//               </label>

//               <input
//                 type="number"
//                 min="0"
//                 name="amount"
//                 value={form.amount}
//                 onChange={handleChange}
//                 placeholder="Enter total amount"
//                 className="w-full p-3 rounded-xl bg-[#2b2638] text-white border border-[#3b354d] outline-none focus:border-purple-500"
//               />
//             </div>

//             {/* =================================================
//                 DISCOUNT
//             ================================================= */}

//             <div>
//               <label className="block text-gray-300 mb-2">
//                 Discount
//               </label>

//               <input
//                 type="number"
//                 min="0"
//                 name="discount"
//                 value={form.discount}
//                 onChange={handleChange}
//                 placeholder="Enter discount"
//                 className="w-full p-3 rounded-xl bg-[#2b2638] text-white border border-[#3b354d] outline-none focus:border-purple-500"
//               />
//             </div>

//             {/* =================================================
//                 PAID AMOUNT
//             ================================================= */}

//             <div>
//               <label className="block text-gray-300 mb-2">
//                 Paid Amount
//               </label>

//               <input
//                 type="number"
//                 min="0"
//                 name="paid_amount"
//                 value={form.paid_amount}
//                 onChange={handleChange}
//                 placeholder="Enter paid amount"
//                 className="w-full p-3 rounded-xl bg-[#2b2638] text-white border border-[#3b354d] outline-none focus:border-purple-500"
//               />
//             </div>

//             {/* =================================================
//                 DUE AMOUNT
//             ================================================= */}

//             <div>
//               <label className="block text-gray-300 mb-2">
//                 Due Amount
//               </label>

//               <input
//                 type="number"
//                 value={form.due_amount}
//                 readOnly
//                 className="w-full p-3 rounded-xl bg-[#211d2b] text-gray-300 border border-[#3b354d] outline-none"
//               />
//             </div>

//             {/* =================================================
//                 PAYMENT METHOD
//             ================================================= */}

//             <div>
//               <label className="block text-gray-300 mb-2">
//                 Payment Method
//               </label>

//               <select
//                 name="payment_method"
//                 value={form.payment_method}
//                 onChange={handleChange}
//                 className="w-full p-3 rounded-xl bg-[#2b2638] text-white border border-[#3b354d] outline-none focus:border-purple-500"
//               >
//                 <option value="CASH">
//                   Cash
//                 </option>

//                 <option value="UPI">
//                   UPI
//                 </option>

//                 <option value="CARD">
//                   Card
//                 </option>

//                 <option value="BANK_TRANSFER">
//                   Bank Transfer
//                 </option>
//               </select>
//             </div>

//             {/* =================================================
//                 TRANSACTION ID
//             ================================================= */}

//             <div>
//               <label className="block text-gray-300 mb-2">
//                 Transaction ID
//               </label>

//               <input
//                 type="text"
//                 name="transaction_id"
//                 value={form.transaction_id}
//                 onChange={handleChange}
//                 placeholder="Enter transaction ID"
//                 className="w-full p-3 rounded-xl bg-[#2b2638] text-white border border-[#3b354d] outline-none focus:border-purple-500"
//               />
//             </div>

//             {/* =================================================
//                 PAYMENT DATE
//             ================================================= */}

//             <div>
//               <label className="block text-gray-300 mb-2">
//                 Payment Date
//               </label>

//               <input
//                 type="date"
//                 name="payment_date"
//                 value={form.payment_date}
//                 onChange={handleChange}
//                 className="w-full p-3 rounded-xl bg-[#2b2638] text-white border border-[#3b354d] outline-none focus:border-purple-500"
//               />
//             </div>

//             {/* =================================================
//                 NEXT DUE DATE
//             ================================================= */}

//             <div>
//               <label className="block text-gray-300 mb-2">
//                 Next Due Date
//               </label>

//               <input
//                 type="date"
//                 name="next_due_date"
//                 value={form.next_due_date}
//                 onChange={handleChange}
//                 className="w-full p-3 rounded-xl bg-[#2b2638] text-white border border-[#3b354d] outline-none focus:border-purple-500"
//               />
//             </div>

//             {/* =================================================
//                 REMARKS
//             ================================================= */}

//             <div>
//               <label className="block text-gray-300 mb-2">
//                 Remarks
//               </label>

//               <textarea
//                 name="remarks"
//                 value={form.remarks}
//                 onChange={handleChange}
//                 placeholder="Optional remarks"
//                 rows={3}
//                 className="w-full p-3 rounded-xl bg-[#2b2638] text-white border border-[#3b354d] outline-none focus:border-purple-500 resize-none"
//               />
//             </div>

//             {/* =================================================
//                 SUBMIT
//             ================================================= */}

//             <button
//               type="submit"
//               disabled={loadingPayment}
//               className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {loadingPayment
//                 ? "Collecting Payment..."
//                 : "Collect Payment"}
//             </button>

//           </form>
//         )}

//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import Select from "react-select";
import toast from "react-hot-toast";

import { getInstituteStudents } from "../../services/studentService";
import { collectPayment } from "../../services/batchService";

export default function CollectPayment() {
  /* =========================================================
     STUDENTS
  ========================================================= */

  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [loadingStudents, setLoadingStudents] = useState(false);
  const [loadingPayment, setLoadingPayment] = useState(false);

  /* =========================================================
     PAYMENT FORM
  ========================================================= */

  const getToday = () => {
    return new Date().toISOString().split("T")[0];
  };

  const initialForm = {
    batch_id: "",
    total_amount: "",
    discount: "",
    paid_amount: "",
    due_amount: "",
    payment_method: "CASH",
    transaction_id: "",
    payment_date: getToday(),
    next_due_date: "",
    remarks: "",
  };

  const [form, setForm] = useState(initialForm);

  /* =========================================================
     LOAD STUDENTS
  ========================================================= */

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      setLoadingStudents(true);

      const response = await getInstituteStudents();

      console.log("Institute students response:", response);

      /*
        Support both:

        1. [
             {
               id,
               full_name,
               phone_number,
               batch_id
             }
           ]

        2. {
             success: true,
             data: [...]
           }
      */

      let studentList = [];

      if (Array.isArray(response)) {
        studentList = response;
      } else if (Array.isArray(response?.data)) {
        studentList = response.data;
      } else if (Array.isArray(response?.students)) {
        studentList = response.students;
      }

      console.log("Normalized student list:", studentList);

      const options = studentList
        .filter((student) => student?.id)
        .map((student) => ({
          value: student.id,

          /*
            This is used internally by react-select
            for searching.
          */
          label: `${student.full_name || "Unknown Student"} ${
            student.phone_number || ""
          }`,

          student,
        }));

      setStudents(options);

    } catch (error) {
      console.error(
        "Failed to load institute students:",
        error
      );

      setStudents([]);

      toast.error(
        error?.response?.data?.message ||
          "Failed to load students"
      );
    } finally {
      setLoadingStudents(false);
    }
  };

  /* =========================================================
     STUDENT SELECTED
  ========================================================= */

  const handleStudentChange = (option) => {
    setSelectedStudent(option);

    /*
      When a student is selected, automatically
      get the batch ID from the student record.
    */

    const batchId =
      option?.student?.batch_id ||
      option?.student?.student?.batch_id ||
      null;

    console.log("Selected student:", option?.student);
    console.log("Selected batch ID:", batchId);

    /*
      Reset payment fields whenever another student
      is selected.
    */

    setForm({
      ...initialForm,
      batch_id: batchId || "",
    });

    if (!batchId) {
      toast.error(
        "This student is not assigned to any batch."
      );
    }
  };

  /* =========================================================
     FORM CHANGE
  ========================================================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    /*
      Recalculate due amount whenever
      amount / discount / paid amount changes.
    */

    if (
      name === "total_amount" ||
      name === "discount" ||
      name === "paid_amount"
    ) {
      calculateDueAmount(name, value);
    }
  };

  /* =========================================================
     CALCULATE DUE AMOUNT
  ========================================================= */

  const calculateDueAmount = (
    changedField,
    changedValue
  ) => {
    const totalAmount =
      changedField === "total_amount"
        ? Number(changedValue || 0)
        : Number(form.total_amount || 0);

    const discount =
      changedField === "discount"
        ? Number(changedValue || 0)
        : Number(form.discount || 0);

    const paidAmount =
      changedField === "paid_amount"
        ? Number(changedValue || 0)
        : Number(form.paid_amount || 0);

    const finalAmount = Math.max(
      totalAmount - discount,
      0
    );

    const dueAmount = Math.max(
      finalAmount - paidAmount,
      0
    );

    setForm((prev) => ({
      ...prev,
      due_amount: dueAmount,
    }));
  };

  /* =========================================================
     COLLECT PAYMENT
  ========================================================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    /* -------------------------------------------------------
       STUDENT VALIDATION
    ------------------------------------------------------- */

    if (!selectedStudent) {
      toast.error("Please select a student");
      return;
    }

    /* -------------------------------------------------------
       BATCH VALIDATION
    ------------------------------------------------------- */

    const batchId =
      selectedStudent?.student?.batch_id ||
      selectedStudent?.student?.student?.batch_id ||
      form.batch_id;

    if (!batchId) {
      toast.error(
        "Selected student is not assigned to a batch."
      );
      return;
    }

    /* -------------------------------------------------------
       TOTAL AMOUNT VALIDATION
    ------------------------------------------------------- */

    const totalAmount = Number(
      form.total_amount || 0
    );

    if (totalAmount <= 0) {
      toast.error(
        "Please enter a valid total amount"
      );
      return;
    }

    /* -------------------------------------------------------
       DISCOUNT
    ------------------------------------------------------- */

    const discountAmount = Number(
      form.discount || 0
    );

    if (discountAmount < 0) {
      toast.error(
        "Discount cannot be negative"
      );
      return;
    }

    if (discountAmount > totalAmount) {
      toast.error(
        "Discount cannot be greater than total amount"
      );
      return;
    }

    /* -------------------------------------------------------
       PAID AMOUNT
    ------------------------------------------------------- */

    const paidAmount = Number(
      form.paid_amount || 0
    );

    if (paidAmount <= 0) {
      toast.error(
        "Paid amount must be greater than zero"
      );
      return;
    }

    const finalAmount = Math.max(
      totalAmount - discountAmount,
      0
    );

    if (paidAmount > finalAmount) {
      toast.error(
        "Paid amount cannot be greater than final amount"
      );
      return;
    }

    /* -------------------------------------------------------
       COLLECT PAYMENT
    ------------------------------------------------------- */

    try {
      setLoadingPayment(true);

      /*
        IMPORTANT:

        Your backend expects:

        total_amount

        NOT:

        amount
      */

      const paymentData = {
        student_id: selectedStudent.value,

        batch_id: batchId,

        total_amount: totalAmount,

        discount: discountAmount,

        paid_amount: paidAmount,

        payment_method:
          form.payment_method || "CASH",

        transaction_id:
          form.transaction_id || null,

        payment_date:
          form.payment_date || getToday(),

        next_due_date:
          form.next_due_date || null,

        remarks:
          form.remarks || null,
      };

      console.log(
        "Submitting payment:",
        paymentData
      );

      const response =
        await collectPayment(paymentData);

      console.log(
        "Payment response:",
        response
      );

      toast.success(
        response?.message ||
          "Payment collected successfully"
      );

      /* -----------------------------------------------------
         RESET FORM
      ----------------------------------------------------- */

      setSelectedStudent(null);

      setForm({
        ...initialForm,
        payment_date: getToday(),
      });

    } catch (error) {
      console.error(
        "Collect payment error:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to collect payment"
      );
    } finally {
      setLoadingPayment(false);
    }
  };

  /* =========================================================
     REACT SELECT STYLES
  ========================================================= */

  const selectStyles = {
    control: (base, state) => ({
      ...base,

      backgroundColor: "#2b2638",

      borderColor: state.isFocused
        ? "#a855f7"
        : "#7c3aed",

      boxShadow: state.isFocused
        ? "0 0 0 1px #a855f7"
        : "none",

      minHeight: "52px",

      borderRadius: "8px",

      "&:hover": {
        borderColor: "#a855f7",
      },
    }),

    menu: (base) => ({
      ...base,

      backgroundColor: "#2b2638",

      zIndex: 9999,

      borderRadius: "8px",

      overflow: "hidden",
    }),

    menuList: (base) => ({
      ...base,

      backgroundColor: "#2b2638",

      padding: 0,

      maxHeight: "300px",
    }),

    option: (base, state) => ({
      ...base,

      backgroundColor: state.isFocused
        ? "#7c3aed"
        : "#2b2638",

      color: "#ffffff",

      padding: "12px 14px",

      cursor: "pointer",

      "&:active": {
        backgroundColor: "#6d28d9",
      },
    }),

    singleValue: (base) => ({
      ...base,

      color: "#ffffff",
    }),

    input: (base) => ({
      ...base,

      color: "#ffffff",
    }),

    placeholder: (base) => ({
      ...base,

      color: "#9ca3af",
    }),

    indicatorSeparator: (base) => ({
      ...base,

      backgroundColor: "#4b445c",
    }),

    dropdownIndicator: (base) => ({
      ...base,

      color: "#a855f7",

      "&:hover": {
        color: "#c084fc",
      },
    }),

    clearIndicator: (base) => ({
      ...base,

      color: "#9ca3af",

      "&:hover": {
        color: "#ffffff",
      },
    }),
  };

  /* =========================================================
     CUSTOM STUDENT OPTION
     
     Shows:

     Student Name
     Phone Number
  ========================================================= */

  const formatStudentOption = ({
    student,
  }) => {
    return (
      <div className="py-1">
        <div className="font-medium">
          {student?.full_name ||
            "Unknown Student"}
        </div>

        <div className="text-sm opacity-70">
          {student?.phone_number ||
            "No phone number"}
        </div>
      </div>
    );
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="min-h-screen p-6">

      {/* =====================================================
          PAGE TITLE
      ===================================================== */}

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-purple-400">
          Collect Payment
        </h1>

        <p className="text-gray-400 mt-2">
          Select a student and record their payment.
        </p>

      </div>

      {/* =====================================================
          PAYMENT CARD
      ===================================================== */}

      <div className="max-w-3xl mx-auto bg-[#151519] border border-[#2c2c35] rounded-2xl p-8">

        {/* ===================================================
            STUDENT SELECT
        =================================================== */}

        <div className="mb-6">

          <label className="block text-white font-medium mb-2">
            Select Student
          </label>

          <Select
            options={students}

            value={selectedStudent}

            onChange={handleStudentChange}

            isSearchable

            isClearable

            isLoading={loadingStudents}

            placeholder={
              loadingStudents
                ? "Loading students..."
                : "Search student by name or phone..."
            }

            noOptionsMessage={() =>
              loadingStudents
                ? "Loading students..."
                : "No students found"
            }

            formatOptionLabel={
              formatStudentOption
            }

            /*
              Search using both name and phone.
            */

            filterOption={(option, inputValue) => {
              const search =
                inputValue
                  .toLowerCase()
                  .trim();

              const name =
                option?.data?.student?.full_name
                  ?.toLowerCase() || "";

              const phone =
                option?.data?.student?.phone_number
                  ?.toLowerCase() || "";

              return (
                name.includes(search) ||
                phone.includes(search)
              );
            }}

            styles={selectStyles}

            className="text-black"

            classNamePrefix="student-select"
          />

        </div>

        {/* ===================================================
            SELECTED STUDENT
        =================================================== */}

        {selectedStudent && (

          <div className="mb-6 rounded-xl bg-[#2b2638] border border-[#3a3450] p-4">

            <p className="text-xs text-gray-500 mb-1">
              Selected Student
            </p>

            <h3 className="text-white font-semibold text-lg">
              {selectedStudent?.student?.full_name ||
                "Unknown Student"}
            </h3>

            <p className="text-gray-400 text-sm mt-1">
              {selectedStudent?.student?.phone_number ||
                "No phone number"}
            </p>

            {(
              selectedStudent?.student?.email
            ) && (
              <p className="text-gray-500 text-sm mt-1">
                {selectedStudent.student.email}
              </p>
            )}

            {/* Batch information */}

            <div className="mt-3 pt-3 border-t border-[#3a3450]">

              <p className="text-xs text-gray-500">
                Batch
              </p>

              <p className="text-purple-300 text-sm font-medium">
                {selectedStudent?.student?.batch_id ||
                  "Not assigned"}
              </p>

            </div>

          </div>

        )}

        {/* ===================================================
            PAYMENT FORM
        =================================================== */}

        <form onSubmit={handleSubmit}>

          {/* =================================================
              TOTAL AMOUNT
          ================================================= */}

          <div className="mb-5">

            <label className="block text-white font-medium mb-2">
              Total Amount
            </label>

            <input
              type="number"
              name="total_amount"
              value={form.total_amount}
              onChange={handleChange}
              min="0"
              step="0.01"
              placeholder="Enter total amount"
              className="w-full rounded-xl bg-[#2b2638] border border-[#3b3550] px-4 py-3 text-white outline-none focus:border-purple-500"
            />

          </div>

          {/* =================================================
              DISCOUNT
          ================================================= */}

          <div className="mb-5">

            <label className="block text-white font-medium mb-2">
              Discount
            </label>

            <input
              type="number"
              name="discount"
              value={form.discount}
              onChange={handleChange}
              min="0"
              step="0.01"
              placeholder="Enter discount"
              className="w-full rounded-xl bg-[#2b2638] border border-[#3b3550] px-4 py-3 text-white outline-none focus:border-purple-500"
            />

          </div>

          {/* =================================================
              FINAL AMOUNT
          ================================================= */}

          <div className="mb-5 rounded-xl bg-[#241f32] border border-[#3a3450] p-4">

            <div className="flex justify-between">

              <span className="text-gray-400">
                Final Amount
              </span>

              <span className="text-white font-semibold">
                ₹
                {Math.max(
                  Number(form.total_amount || 0) -
                    Number(form.discount || 0),
                  0
                ).toFixed(2)}
              </span>

            </div>

          </div>

          {/* =================================================
              PAID AMOUNT
          ================================================= */}

          <div className="mb-5">

            <label className="block text-white font-medium mb-2">
              Paid Amount
            </label>

            <input
              type="number"
              name="paid_amount"
              value={form.paid_amount}
              onChange={handleChange}
              min="0"
              step="0.01"
              placeholder="Enter paid amount"
              className="w-full rounded-xl bg-[#2b2638] border border-[#3b3550] px-4 py-3 text-white outline-none focus:border-purple-500"
            />

          </div>

          {/* =================================================
              DUE AMOUNT
          ================================================= */}

          <div className="mb-5 rounded-xl bg-[#241f32] border border-[#3a3450] p-4">

            <div className="flex justify-between">

              <span className="text-gray-400">
                Due Amount
              </span>

              <span className="text-yellow-400 font-semibold">
                ₹
                {Number(
                  form.due_amount || 0
                ).toFixed(2)}
              </span>

            </div>

          </div>

          {/* =================================================
              PAYMENT METHOD
          ================================================= */}

          <div className="mb-5">

            <label className="block text-white font-medium mb-2">
              Payment Method
            </label>

            <select
              name="payment_method"
              value={form.payment_method}
              onChange={handleChange}
              className="w-full rounded-xl bg-[#2b2638] border border-[#3b3550] px-4 py-3 text-white outline-none focus:border-purple-500"
            >

              <option value="CASH">
                Cash
              </option>

              <option value="UPI">
                UPI
              </option>

              <option value="CARD">
                Card
              </option>

              <option value="BANK_TRANSFER">
                Bank Transfer
              </option>

              <option value="OTHER">
                Other
              </option>

            </select>

          </div>

          {/* =================================================
              TRANSACTION ID
          ================================================= */}

          <div className="mb-5">

            <label className="block text-white font-medium mb-2">
              Transaction ID
              <span className="text-gray-500 text-sm ml-2">
                Optional
              </span>
            </label>

            <input
              type="text"
              name="transaction_id"
              value={form.transaction_id}
              onChange={handleChange}
              placeholder="Enter transaction ID"
              className="w-full rounded-xl bg-[#2b2638] border border-[#3b3550] px-4 py-3 text-white outline-none focus:border-purple-500"
            />

          </div>

          {/* =================================================
              PAYMENT DATE
          ================================================= */}

          <div className="mb-5">

            <label className="block text-white font-medium mb-2">
              Payment Date
            </label>

            <input
              type="date"
              name="payment_date"
              value={form.payment_date}
              onChange={handleChange}
              className="w-full rounded-xl bg-[#2b2638] border border-[#3b3550] px-4 py-3 text-white outline-none focus:border-purple-500"
            />

          </div>

          {/* =================================================
              NEXT DUE DATE
          ================================================= */}

          <div className="mb-5">

            <label className="block text-white font-medium mb-2">
              Next Due Date
              <span className="text-gray-500 text-sm ml-2">
                Optional
              </span>
            </label>

            <input
              type="date"
              name="next_due_date"
              value={form.next_due_date}
              onChange={handleChange}
              className="w-full rounded-xl bg-[#2b2638] border border-[#3b3550] px-4 py-3 text-white outline-none focus:border-purple-500"
            />

          </div>

          {/* =================================================
              REMARKS
          ================================================= */}

          <div className="mb-6">

            <label className="block text-white font-medium mb-2">
              Remarks
              <span className="text-gray-500 text-sm ml-2">
                Optional
              </span>
            </label>

            <textarea
              name="remarks"
              value={form.remarks}
              onChange={handleChange}
              rows={3}
              placeholder="Enter remarks"
              className="w-full rounded-xl bg-[#2b2638] border border-[#3b3550] px-4 py-3 text-white outline-none focus:border-purple-500 resize-none"
            />

          </div>

          {/* =================================================
              SUBMIT
          ================================================= */}

          <button
            type="submit"
            disabled={
              loadingPayment ||
              loadingStudents ||
              !selectedStudent
            }
            className="w-full rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 py-3.5 font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >

            {loadingPayment
              ? "Collecting Payment..."
              : "Collect Payment"}

          </button>

        </form>

      </div>

    </div>
  );
}