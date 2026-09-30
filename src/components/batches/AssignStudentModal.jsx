


import { useEffect, useState } from "react";
import { X } from "lucide-react";
import Select from "react-select";
import toast from "react-hot-toast";

import {
  getStudentsAvailableForBatch,
} from "../../services/studentService";

import {
  assignStudentToBatch,
} from "../../services/batchService";

export default function AssignStudentModal({
  isOpen,
  onClose,
  batchId,
  onSuccess,
}) {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingStudents, setLoadingStudents] = useState(false);

  /* =========================================================
     LOAD AVAILABLE STUDENTS
  ========================================================= */

  useEffect(() => {
    if (!isOpen) {
      setStudents([]);
      setSelectedStudent(null);
      return;
    }

    loadStudents();
  }, [isOpen]);

  const loadStudents = async () => {
    try {
      setLoadingStudents(true);

      const response =
        await getStudentsAvailableForBatch();

      console.log(
        "Available students:",
        response
      );

      const studentList =
        response?.students || [];

      const options = studentList.map(
        (student) => ({
          value: student.student_id,

          label: `${student.full_name} (${student.phone_number || "No phone"})`,

          student,
        })
      );

      setStudents(options);

    } catch (error) {
      console.error(
        "Failed to load available students:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
        "Failed to load students"
      );

      setStudents([]);

    } finally {
      setLoadingStudents(false);
    }
  };

  /* =========================================================
     ASSIGN STUDENT
  ========================================================= */

  const handleAssign = async () => {
    if (!selectedStudent) {
      toast.error("Please select a student");
      return;
    }

    if (!batchId) {
      toast.error("Batch ID is missing");
      return;
    }

    try {
      setLoading(true);

      console.log(
        "Assigning student:",
        selectedStudent.value,
        "to batch:",
        batchId
      );

      await assignStudentToBatch(
        batchId,
        selectedStudent.value
      );

      toast.success(
        "Student assigned successfully"
      );

      setSelectedStudent(null);

      onClose();

      if (onSuccess) {
        onSuccess();
      }

    } catch (error) {
      console.error(
        "Student assignment error:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
        "Assignment failed"
      );

    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     CLOSE MODAL
  ========================================================= */

  const handleClose = () => {
    if (loading) return;

    setSelectedStudent(null);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">

      <div className="relative w-full max-w-lg rounded-2xl bg-[#1f1b2e] p-6 shadow-2xl">

        {/* CLOSE */}

        <button
          type="button"
          onClick={handleClose}
          disabled={loading}
          className="absolute right-5 top-5 text-gray-400 hover:text-white disabled:opacity-50"
        >
          <X size={24} />
        </button>

        {/* TITLE */}

        <h2 className="mb-2 text-3xl font-bold text-white">
          Assign Student
        </h2>

        <p className="mb-6 text-sm text-gray-400">
          Select an active student who is not already
          assigned to another batch.
        </p>

        {/* STUDENT SELECT */}

        <Select
          options={students}
          value={selectedStudent}
          onChange={setSelectedStudent}
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
              ? "Loading..."
              : "No available students found"
          }
          className="mb-5"
          classNamePrefix="student-select"
        />

        {/* SELECTED STUDENT */}

        {selectedStudent && (
          <div className="mb-5 rounded-xl bg-[#2b2638] p-4">

            <h3 className="font-semibold text-white">
              {selectedStudent.student.full_name}
            </h3>

            <p className="mt-1 text-sm text-gray-400">
              {selectedStudent.student.phone_number ||
                "Phone number not available"}
            </p>

            {selectedStudent.student.email && (
              <p className="mt-1 text-sm text-gray-500">
                {selectedStudent.student.email}
              </p>
            )}

          </div>
        )}

        {/* ASSIGN */}

        <button
          type="button"
          onClick={handleAssign}
          disabled={
            !selectedStudent ||
            loading ||
            loadingStudents
          }
          className="w-full rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 py-3 font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Assigning..."
            : "Confirm Assignment"}
        </button>

      </div>
    </div>
  );
}