import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  Users,
  Layers,
  CheckCircle2,
  UserPlus,
  Loader2,
  UserCheck,
} from "lucide-react";
import toast from "react-hot-toast";

import { getInstituteStudents } from "../../services/studentService";
import {
  getInstituteBatches,
  assignStudentToBatch,
} from "../../services/batchService";

export default function BatchStudentAssignment() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [batches, setBatches] = useState([]);

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedBatch, setSelectedBatch] = useState(null);

  const [studentSearch, setStudentSearch] = useState("");
  const [batchSearch, setBatchSearch] = useState("");

  const [loadingStudents, setLoadingStudents] = useState(true);
  const [loadingBatches, setLoadingBatches] = useState(true);
  const [assigning, setAssigning] = useState(false);

  /* =========================================================
     SAFE HELPERS
  ========================================================= */

  const getStudentId = (student) => {
    if (!student || typeof student !== "object") {
      return null;
    }

    return (
      student.student_id ??
      student.id ??
      student.studentId ??
      null
    );
  };

  const getStudentName = (student) => {
    if (!student || typeof student !== "object") {
      return "Unknown Student";
    }

    return (
      student.full_name ??
      student.name ??
      student.student_name ??
      "Unknown Student"
    );
  };

  const getStudentPhone = (student) => {
    if (!student || typeof student !== "object") {
      return "";
    }

    return String(
      student.phone_number ??
        student.phone ??
        student.mobile ??
        ""
    );
  };

  const getStudentEmail = (student) => {
    if (!student || typeof student !== "object") {
      return "";
    }

    return (
      student.email ??
      student.email_address ??
      ""
    );
  };

  const getStudentBatchId = (student) => {
    if (!student || typeof student !== "object") {
      return null;
    }

    /*
     * Database:
     *
     * students.batch_id
     *
     * We also support nested API responses.
     */

    return (
      student.batch_id ??
      student.batchId ??
      student.batch?.batch_id ??
      student.batch?.id ??
      student.current_batch?.batch_id ??
      student.current_batch?.id ??
      null
    );
  };

  const getBatchId = (batch) => {
    if (!batch || typeof batch !== "object") {
      return null;
    }

    return (
      batch.batch_id ??
      batch.id ??
      batch.batchId ??
      null
    );
  };

  const getBatchName = (batch) => {
    if (!batch || typeof batch !== "object") {
      return "Unnamed Batch";
    }

    return (
      batch.batch_name ??
      batch.name ??
      batch.batchName ??
      batch.code ??
      `Batch #${getBatchId(batch) ?? "-"}`
    );
  };

  const getBatchCode = (batch) => {
    if (!batch || typeof batch !== "object") {
      return "";
    }

    return (
      batch.code ??
      batch.batch_code ??
      batch.batchCode ??
      `Batch #${getBatchId(batch) ?? "-"}`
    );
  };

  const getBatchCapacity = (batch) => {
    if (!batch || typeof batch !== "object") {
      return null;
    }

    return (
      batch.capacity ??
      batch.max_students ??
      batch.maxStudents ??
      null
    );
  };

  const getBatchStudentCount = (batch) => {
    if (!batch || typeof batch !== "object") {
      return 0;
    }

    return (
      batch.student_count ??
      batch.students_count ??
      batch.current_students ??
      batch.enrolled_students ??
      (Array.isArray(batch.students)
        ? batch.students.length
        : 0)
    );
  };

  /* =========================================================
     NORMALIZE API RESPONSE
  ========================================================= */

  const extractList = (response, possibleKeys = []) => {
    if (Array.isArray(response)) {
      return response.filter(
        (item) =>
          item &&
          typeof item === "object"
      );
    }

    if (
      response &&
      typeof response === "object"
    ) {
      for (const key of possibleKeys) {
        if (Array.isArray(response[key])) {
          return response[key].filter(
            (item) =>
              item &&
              typeof item === "object"
          );
        }
      }

      if (
        response.data &&
        typeof response.data === "object"
      ) {
        for (const key of possibleKeys) {
          if (Array.isArray(response.data[key])) {
            return response.data[key].filter(
              (item) =>
                item &&
                typeof item === "object"
            );
          }
        }
      }

      if (Array.isArray(response.data)) {
        return response.data.filter(
          (item) =>
            item &&
            typeof item === "object"
        );
      }

      if (Array.isArray(response.results)) {
        return response.results.filter(
          (item) =>
            item &&
            typeof item === "object"
        );
      }
    }

    return [];
  };

  /* =========================================================
     LOAD STUDENTS
  ========================================================= */

  const loadStudents = async () => {
    try {
      setLoadingStudents(true);

      const response =
        await getInstituteStudents();

      console.log(
        "Institute students API response:",
        response
      );

      const studentList = extractList(
        response,
        [
          "students",
          "studentList",
          "results",
          "rows",
          "data",
        ]
      );

      console.log(
        "Normalized students:",
        studentList
      );

      setStudents(studentList);
    } catch (error) {
      console.error(
        "Failed to load institute students:",
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
     LOAD BATCHES
  ========================================================= */

  const loadBatches = async () => {
    try {
      setLoadingBatches(true);

      const response =
        await getInstituteBatches();

      console.log(
        "Institute batches API response:",
        response
      );

      const batchList = extractList(
        response,
        [
          "batches",
          "batchList",
          "results",
          "rows",
          "data",
        ]
      );

      console.log(
        "Normalized batches:",
        batchList
      );

      setBatches(batchList);
    } catch (error) {
      console.error(
        "Failed to load institute batches:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to load batches"
      );

      setBatches([]);
    } finally {
      setLoadingBatches(false);
    }
  };

  /* =========================================================
     INITIAL LOAD
  ========================================================= */

  useEffect(() => {
    loadStudents();
    loadBatches();
  }, []);

  /* =========================================================
     CURRENT BATCH
  ========================================================= */

  const getStudentCurrentBatch = (student) => {
    if (!student) {
      return null;
    }

    const studentBatchId =
      getStudentBatchId(student);

    /*
     * IMPORTANT:
     *
     * A student is assigned if students.batch_id
     * contains a valid ID.
     *
     * We don't require the batch object to be
     * found in the batches array.
     */

    if (
      studentBatchId !== null &&
      studentBatchId !== undefined &&
      String(studentBatchId).trim() !== ""
    ) {
      const foundBatch = batches.find(
        (batch) => {
          const batchId =
            getBatchId(batch);

          if (
            batchId === null ||
            batchId === undefined
          ) {
            return false;
          }

          return (
            String(batchId) ===
            String(studentBatchId)
          );
        }
      );

      /*
       * If batch exists, return complete
       * batch object.
       */

      if (foundBatch) {
        return foundBatch;
      }

      /*
       * If batch wasn't returned by API,
       * still return a safe fallback object.
       *
       * This prevents null errors and correctly
       * marks the student as already assigned.
       */

      return {
        id: studentBatchId,
        batch_id: studentBatchId,
        batch_name: `Batch #${studentBatchId}`,
      };
    }

    return null;
  };

  /* =========================================================
     STUDENT STATUS
  ========================================================= */

  const isStudentAssigned = (student) => {
    return !!getStudentCurrentBatch(student);
  };

  /* =========================================================
     FILTER STUDENTS
  ========================================================= */

  const filteredStudents = useMemo(() => {
    const search =
      studentSearch
        .trim()
        .toLowerCase();

    if (!search) {
      return students;
    }

    return students.filter(
      (student) => {
        const name =
          getStudentName(student)
            .toLowerCase();

        const phone =
          getStudentPhone(student)
            .toLowerCase();

        const email =
          getStudentEmail(student)
            .toLowerCase();

        return (
          name.includes(search) ||
          phone.includes(search) ||
          email.includes(search)
        );
      }
    );
  }, [students, studentSearch]);

  /* =========================================================
     FILTER BATCHES
  ========================================================= */

  const filteredBatches = useMemo(() => {
    const search =
      batchSearch
        .trim()
        .toLowerCase();

    if (!search) {
      return batches;
    }

    return batches.filter(
      (batch) => {
        const name =
          getBatchName(batch)
            .toLowerCase();

        const code =
          getBatchCode(batch)
            .toLowerCase();

        return (
          name.includes(search) ||
          code.includes(search)
        );
      }
    );
  }, [batches, batchSearch]);

  /* =========================================================
     AVAILABLE / ASSIGNED COUNTS
  ========================================================= */

  const availableStudentsCount =
    useMemo(() => {
      return students.filter(
        (student) =>
          !isStudentAssigned(student)
      ).length;
    }, [students, batches]);

  const assignedStudentsCount =
    students.length -
    availableStudentsCount;

  /* =========================================================
     SELECT STUDENT
  ========================================================= */

  const handleStudentSelect = (student) => {
    if (!student || assigning) {
      return;
    }

    const currentBatch =
      getStudentCurrentBatch(student);

    if (currentBatch) {
      toast.error(
        `Student is already assigned to ${getBatchName(
          currentBatch
        )}`
      );

      return;
    }

    setSelectedStudent(student);
  };

  /* =========================================================
     SELECT BATCH
  ========================================================= */

  const handleBatchSelect = (batch) => {
    if (!batch || assigning) {
      return;
    }

    const batchId =
      getBatchId(batch);

    if (!batchId) {
      toast.error("Invalid batch");
      return;
    }

    const capacity =
      getBatchCapacity(batch);

    const studentCount =
      Number(
        getBatchStudentCount(batch)
      );

    if (
      capacity !== null &&
      capacity !== undefined &&
      Number(capacity) > 0 &&
      studentCount >= Number(capacity)
    ) {
      toast.error(
        "This batch is already full"
      );
      return;
    }

    setSelectedBatch(batch);
  };

  /* =========================================================
     ASSIGN STUDENT
  ========================================================= */

  const handleAssign = async () => {
    if (!selectedStudent) {
      toast.error(
        "Please select a student"
      );
      return;
    }

    if (!selectedBatch) {
      toast.error(
        "Please select a batch"
      );
      return;
    }

    const studentId =
      getStudentId(selectedStudent);

    const batchId =
      getBatchId(selectedBatch);

    if (!studentId) {
      toast.error(
        "Student ID is missing"
      );
      return;
    }

    if (!batchId) {
      toast.error(
        "Batch ID is missing"
      );
      return;
    }

    /*
     * FINAL FRONTEND SAFETY CHECK
     */

    const currentBatch =
      getStudentCurrentBatch(
        selectedStudent
      );

    if (currentBatch) {
      toast.error(
        `Student is already assigned to ${getBatchName(
          currentBatch
        )}`
      );

      return;
    }

    try {
      setAssigning(true);

      console.log(
        "Assigning student:",
        {
          studentId,
          batchId,
        }
      );

      await assignStudentToBatch(
        batchId,
        studentId
      );

      toast.success(
        "Student assigned successfully"
      );

      setSelectedStudent(null);
      setSelectedBatch(null);

      /*
       * Reload both lists so the assigned
       * student immediately changes status.
       */

      await Promise.all([
        loadStudents(),
        loadBatches(),
      ]);
    } catch (error) {
      console.error(
        "Student assignment error:",
        error
      );

      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Assignment failed";

      toast.error(message);
    } finally {
      setAssigning(false);
    }
  };

  /* =========================================================
     CLEAR SELECTION
  ========================================================= */

  const clearSelection = () => {
    if (assigning) {
      return;
    }

    setSelectedStudent(null);
    setSelectedBatch(null);
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="min-h-full p-8 text-white">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="mb-8 flex items-center gap-4">

        <button
          type="button"
          onClick={() =>
            navigate("/institute/batches")
          }
          disabled={assigning}
          className="
            flex h-11 w-11
            items-center justify-center
            rounded-xl
            border border-[#2c2c35]
            bg-[#151519]
            text-gray-400
            transition
            hover:bg-[#202027]
            hover:text-white
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          <ArrowLeft size={21} />
        </button>

        <div>
          <h1 className="
            text-4xl
            font-bold
            text-purple-400
          ">
            Assign Students
          </h1>

          <p className="
            mt-2
            text-gray-400
          ">
            Select an available student and assign
            them to a batch.
          </p>
        </div>

      </div>

      {/* =====================================================
          STATS
      ====================================================== */}

      <div className="
        mb-6
        grid
        grid-cols-1
        gap-4
        sm:grid-cols-3
      ">

        <div className="
          rounded-2xl
          border border-[#2c2c35]
          bg-[#151519]
          p-5
        ">
          <div className="
            flex
            items-center
            justify-between
          ">
            <div>
              <p className="
                text-sm
                text-gray-500
              ">
                Total Students
              </p>

              <p className="
                mt-1
                text-2xl
                font-bold
              ">
                {students.length}
              </p>
            </div>

            <Users
              size={25}
              className="text-purple-400"
            />
          </div>
        </div>

        <div className="
          rounded-2xl
          border border-[#2c2c35]
          bg-[#151519]
          p-5
        ">
          <div className="
            flex
            items-center
            justify-between
          ">
            <div>
              <p className="
                text-sm
                text-gray-500
              ">
                Available
              </p>

              <p className="
                mt-1
                text-2xl
                font-bold
                text-green-400
              ">
                {availableStudentsCount}
              </p>
            </div>

            <UserPlus
              size={25}
              className="text-green-400"
            />
          </div>
        </div>

        <div className="
          rounded-2xl
          border border-[#2c2c35]
          bg-[#151519]
          p-5
        ">
          <div className="
            flex
            items-center
            justify-between
          ">
            <div>
              <p className="
                text-sm
                text-gray-500
              ">
                Already Assigned
              </p>

              <p className="
                mt-1
                text-2xl
                font-bold
                text-orange-400
              ">
                {assignedStudentsCount}
              </p>
            </div>

            <UserCheck
              size={25}
              className="text-orange-400"
            />
          </div>
        </div>

      </div>

      {/* =====================================================
          TWO COLUMNS
      ====================================================== */}

      <div className="
        grid
        grid-cols-1
        gap-6
        xl:grid-cols-2
      ">

        {/* ===================================================
            STUDENTS
        ==================================================== */}

        <div className="
          overflow-hidden
          rounded-2xl
          border border-[#2c2c35]
          bg-[#151519]
        ">

          <div className="
            border-b
            border-[#2c2c35]
            p-6
          ">

            <div className="
              mb-5
              flex
              items-center
              justify-between
            ">

              <div className="
                flex
                items-center
                gap-3
              ">

                <div className="
                  flex h-11 w-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-purple-500/10
                  text-purple-400
                ">
                  <Users size={22} />
                </div>

                <div>
                  <h2 className="
                    text-xl
                    font-bold
                  ">
                    Students
                  </h2>

                  <p className="
                    text-sm
                    text-gray-500
                  ">
                    Select an unassigned student
                  </p>
                </div>

              </div>

              <span className="
                rounded-full
                bg-purple-500/10
                px-3 py-1
                text-sm
                font-semibold
                text-purple-400
              ">
                {students.length}
              </span>

            </div>

            {/* SEARCH */}

            <div className="relative">

              <Search
                size={19}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-gray-500
                "
              />

              <input
                type="text"
                value={studentSearch}
                onChange={(e) =>
                  setStudentSearch(
                    e.target.value
                  )
                }
                placeholder="Search student by name, phone or email..."
                className="
                  w-full
                  rounded-xl
                  border
                  border-[#30303a]
                  bg-[#101014]
                  py-3
                  pl-11
                  pr-4
                  text-white
                  outline-none
                  placeholder:text-gray-600
                  focus:border-purple-500
                "
              />

            </div>

          </div>

          {/* STUDENT LIST */}

          <div className="
            max-h-[560px]
            overflow-y-auto
            p-4
          ">

            {loadingStudents ? (

              <div className="
                flex
                h-60
                items-center
                justify-center
              ">
                <Loader2
                  size={28}
                  className="
                    animate-spin
                    text-purple-400
                  "
                />
              </div>

            ) : filteredStudents.length === 0 ? (

              <div className="
                flex
                h-60
                flex-col
                items-center
                justify-center
                text-center
              ">

                <Users
                  size={42}
                  className="
                    mb-3
                    text-gray-700
                  "
                />

                <p className="
                  font-semibold
                  text-gray-400
                ">
                  No students found
                </p>

                <p className="
                  mt-1
                  text-sm
                  text-gray-600
                ">
                  Try another search
                </p>

              </div>

            ) : (

              <div className="space-y-2">

                {filteredStudents.map(
                  (student) => {

                    const studentId =
                      getStudentId(student);

                    /*
                     * Never render a list item
                     * without a valid ID.
                     */

                    if (!studentId) {
                      return null;
                    }

                    const currentBatch =
                      getStudentCurrentBatch(
                        student
                      );

                    const isAssigned =
                      !!currentBatch;

                    const selectedStudentId =
                      getStudentId(
                        selectedStudent
                      );

                    const isSelected =
                      String(
                        selectedStudentId
                      ) ===
                      String(studentId);

                    return (
                      <button
                        key={studentId}
                        type="button"
                        onClick={() =>
                          handleStudentSelect(
                            student
                          )
                        }
                        disabled={
                          assigning ||
                          isAssigned
                        }
                        className={`
                          w-full
                          rounded-xl
                          border
                          p-4
                          text-left
                          transition
                          ${
                            isAssigned
                              ? "cursor-not-allowed border-[#292931] bg-[#0d0d10] opacity-60"
                              : isSelected
                              ? "border-purple-500 bg-purple-500/10"
                              : "border-[#292931] bg-[#101014] hover:border-purple-500/50"
                          }
                        `}
                      >

                        <div className="
                          flex
                          items-center
                          justify-between
                          gap-4
                        ">

                          <div className="
                            flex
                            min-w-0
                            items-center
                            gap-3
                          ">

                            <div className={`
                              flex
                              h-11
                              w-11
                              shrink-0
                              items-center
                              justify-center
                              rounded-full
                              text-sm
                              font-bold
                              ${
                                isSelected
                                  ? "bg-purple-500 text-white"
                                  : isAssigned
                                  ? "bg-orange-500/10 text-orange-400"
                                  : "bg-[#292331] text-purple-300"
                              }
                            `}>
                              {getStudentName(
                                student
                              )
                                .charAt(0)
                                .toUpperCase()}
                            </div>

                            <div className="min-w-0">

                              <h3 className="
                                truncate
                                font-semibold
                                text-white
                              ">
                                {getStudentName(
                                  student
                                )}
                              </h3>

                              <p className="
                                mt-1
                                text-sm
                                text-gray-500
                              ">
                                {getStudentPhone(
                                  student
                                ) ||
                                  "Phone not available"}
                              </p>

                              {getStudentEmail(
                                student
                              ) && (
                                <p className="
                                  mt-1
                                  truncate
                                  text-xs
                                  text-gray-600
                                ">
                                  {getStudentEmail(
                                    student
                                  )}
                                </p>
                              )}

                            </div>

                          </div>

                          <div className="shrink-0">

                            {isAssigned ? (

                              <span className="
                                rounded-full
                                bg-orange-500/10
                                px-3
                                py-1
                                text-xs
                                font-semibold
                                text-orange-400
                              ">
                                Assigned
                              </span>

                            ) : isSelected ? (

                              <CheckCircle2
                                size={22}
                                className="
                                  text-purple-400
                                "
                              />

                            ) : (

                              <span className="
                                rounded-full
                                bg-green-500/10
                                px-3
                                py-1
                                text-xs
                                font-semibold
                                text-green-400
                              ">
                                Available
                              </span>

                            )}

                          </div>

                        </div>

                        {isAssigned && (
                          <div className="
                            mt-3
                            border-t
                            border-[#292931]
                            pt-3
                            text-xs
                            text-gray-500
                          ">
                            Current batch:{" "}
                            <span className="
                              font-semibold
                              text-orange-400
                            ">
                              {getBatchName(
                                currentBatch
                              )}
                            </span>
                          </div>
                        )}

                      </button>
                    );
                  }
                )}

              </div>

            )}

          </div>

        </div>

        {/* ===================================================
            BATCHES
        ==================================================== */}

        <div className="
          overflow-hidden
          rounded-2xl
          border border-[#2c2c35]
          bg-[#151519]
        ">

          <div className="
            border-b
            border-[#2c2c35]
            p-6
          ">

            <div className="
              mb-5
              flex
              items-center
              justify-between
            ">

              <div className="
                flex
                items-center
                gap-3
              ">

                <div className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-pink-500/10
                  text-pink-400
                ">
                  <Layers size={22} />
                </div>

                <div>
                  <h2 className="
                    text-xl
                    font-bold
                  ">
                    Batches
                  </h2>

                  <p className="
                    text-sm
                    text-gray-500
                  ">
                    Select destination batch
                  </p>
                </div>

              </div>

              <span className="
                rounded-full
                bg-pink-500/10
                px-3
                py-1
                text-sm
                font-semibold
                text-pink-400
              ">
                {batches.length}
              </span>

            </div>

            {/* SEARCH */}

            <div className="relative">

              <Search
                size={19}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-gray-500
                "
              />

              <input
                type="text"
                value={batchSearch}
                onChange={(e) =>
                  setBatchSearch(
                    e.target.value
                  )
                }
                placeholder="Search batch by name or code..."
                className="
                  w-full
                  rounded-xl
                  border
                  border-[#30303a]
                  bg-[#101014]
                  py-3
                  pl-11
                  pr-4
                  text-white
                  outline-none
                  placeholder:text-gray-600
                  focus:border-pink-500
                "
              />

            </div>

          </div>

          {/* BATCH LIST */}

          <div className="
            max-h-[560px]
            overflow-y-auto
            p-4
          ">

            {loadingBatches ? (

              <div className="
                flex
                h-60
                items-center
                justify-center
              ">
                <Loader2
                  size={28}
                  className="
                    animate-spin
                    text-pink-400
                  "
                />
              </div>

            ) : filteredBatches.length === 0 ? (

              <div className="
                flex
                h-60
                flex-col
                items-center
                justify-center
                text-center
              ">

                <Layers
                  size={42}
                  className="
                    mb-3
                    text-gray-700
                  "
                />

                <p className="
                  font-semibold
                  text-gray-400
                ">
                  No batches found
                </p>

              </div>

            ) : (

              <div className="space-y-2">

                {filteredBatches.map(
                  (batch) => {

                    if (!batch) {
                      return null;
                    }

                    const batchId =
                      getBatchId(batch);

                    if (!batchId) {
                      return null;
                    }

                    const selectedBatchId =
                      getBatchId(
                        selectedBatch
                      );

                    const isSelected =
                      String(
                        selectedBatchId
                      ) ===
                      String(batchId);

                    const capacity =
                      getBatchCapacity(
                        batch
                      );

                    const studentCount =
                      Number(
                        getBatchStudentCount(
                          batch
                        )
                      );

                    const isFull =
                      capacity !== null &&
                      capacity !== undefined &&
                      Number(capacity) > 0 &&
                      studentCount >=
                        Number(capacity);

                    return (
                      <button
                        key={batchId}
                        type="button"
                        onClick={() =>
                          handleBatchSelect(
                            batch
                          )
                        }
                        disabled={
                          assigning ||
                          isFull
                        }
                        className={`
                          w-full
                          rounded-xl
                          border
                          p-4
                          text-left
                          transition
                          ${
                            isFull
                              ? "cursor-not-allowed border-[#292931] bg-[#0d0d10] opacity-50"
                              : isSelected
                              ? "border-pink-500 bg-pink-500/10"
                              : "border-[#292931] bg-[#101014] hover:border-pink-500/50"
                          }
                        `}
                      >

                        <div className="
                          flex
                          items-center
                          justify-between
                          gap-4
                        ">

                          <div className="
                            flex
                            min-w-0
                            items-center
                            gap-3
                          ">

                            <div className={`
                              flex
                              h-11
                              w-11
                              shrink-0
                              items-center
                              justify-center
                              rounded-xl
                              ${
                                isSelected
                                  ? "bg-pink-500 text-white"
                                  : "bg-[#292331] text-pink-300"
                              }
                            `}>
                              <Layers
                                size={20}
                              />
                            </div>

                            <div className="min-w-0">

                              <h3 className="
                                truncate
                                font-semibold
                                text-white
                              ">
                                {getBatchName(
                                  batch
                                )}
                              </h3>

                              <p className="
                                mt-1
                                text-sm
                                text-gray-500
                              ">
                                {getBatchCode(
                                  batch
                                )}
                              </p>

                              <div className="
                                mt-2
                                flex
                                flex-wrap
                                gap-3
                                text-xs
                                text-gray-600
                              ">

                                <span>
                                  Students:{" "}
                                  <span className="
                                    text-gray-400
                                  ">
                                    {studentCount}
                                    {capacity
                                      ? ` / ${capacity}`
                                      : ""}
                                  </span>
                                </span>

                              </div>

                            </div>

                          </div>

                          <div className="shrink-0">

                            {isFull ? (

                              <span className="
                                rounded-full
                                bg-red-500/10
                                px-3
                                py-1
                                text-xs
                                font-semibold
                                text-red-400
                              ">
                                Full
                              </span>

                            ) : isSelected ? (

                              <CheckCircle2
                                size={22}
                                className="
                                  text-pink-400
                                "
                              />

                            ) : (

                              <span className="
                                rounded-full
                                bg-green-500/10
                                px-3
                                py-1
                                text-xs
                                font-semibold
                                text-green-400
                              ">
                                Available
                              </span>

                            )}

                          </div>

                        </div>

                      </button>
                    );
                  }
                )}

              </div>

            )}

          </div>

        </div>

      </div>

      {/* =====================================================
          ASSIGN SUMMARY
      ====================================================== */}

      <div className="
        mt-6
        rounded-2xl
        border
        border-[#2c2c35]
        bg-[#151519]
        p-6
      ">

        <div className="
          grid
          grid-cols-1
          gap-6
          lg:grid-cols-[1fr_auto_1fr]
          lg:items-center
        ">

          {/* STUDENT */}

          <div>

            <p className="
              mb-2
              text-xs
              font-semibold
              uppercase
              tracking-wider
              text-gray-500
            ">
              Selected Student
            </p>

            {selectedStudent ? (

              <div className="
                flex
                items-center
                gap-3
              ">

                <div className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  bg-purple-500
                  font-bold
                ">
                  {getStudentName(
                    selectedStudent
                  )
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <div className="min-w-0">

                  <p className="
                    truncate
                    font-semibold
                  ">
                    {getStudentName(
                      selectedStudent
                    )}
                  </p>

                  <p className="
                    text-sm
                    text-gray-500
                  ">
                    {getStudentPhone(
                      selectedStudent
                    )}
                  </p>

                </div>

              </div>

            ) : (

              <p className="
                text-gray-600
              ">
                Select a student
              </p>

            )}

          </div>

          {/* ICON */}

          <div className="
            hidden
            lg:block
          ">
            <UserPlus
              size={26}
              className={
                selectedStudent &&
                selectedBatch
                  ? "text-purple-400"
                  : "text-gray-700"
              }
            />
          </div>

          {/* BATCH */}

          <div>

            <p className="
              mb-2
              text-xs
              font-semibold
              uppercase
              tracking-wider
              text-gray-500
            ">
              Selected Batch
            </p>

            {selectedBatch ? (

              <div className="
                flex
                items-center
                gap-3
              ">

                <div className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-pink-500
                ">
                  <Layers size={20} />
                </div>

                <div>

                  <p className="
                    font-semibold
                  ">
                    {getBatchName(
                      selectedBatch
                    )}
                  </p>

                  <p className="
                    text-sm
                    text-gray-500
                  ">
                    {getBatchCode(
                      selectedBatch
                    )}
                  </p>

                </div>

              </div>

            ) : (

              <p className="
                text-gray-600
              ">
                Select a batch
              </p>

            )}

          </div>

        </div>

        {/* ACTIONS */}

        <div className="
          mt-6
          flex
          flex-col
          gap-3
          border-t
          border-[#2c2c35]
          pt-6
          sm:flex-row
        ">

          <button
            type="button"
            onClick={clearSelection}
            disabled={
              assigning ||
              (!selectedStudent &&
                !selectedBatch)
            }
            className="
              rounded-xl
              border
              border-[#30303a]
              bg-[#101014]
              px-6
              py-3.5
              font-semibold
              text-gray-400
              transition
              hover:border-gray-500
              hover:text-white
              disabled:cursor-not-allowed
              disabled:opacity-40
              sm:w-auto
            "
          >
            Clear
          </button>

          <button
            type="button"
            onClick={handleAssign}
            disabled={
              !selectedStudent ||
              !selectedBatch ||
              assigning
            }
            className="
              flex
              flex-1
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-gradient-to-r
              from-purple-500
              to-pink-500
              py-3.5
              font-bold
              text-white
              transition
              hover:opacity-90
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >

            {assigning ? (
              <>
                <Loader2
                  size={20}
                  className="
                    animate-spin
                  "
                />
                Assigning Student...
              </>
            ) : (
              <>
                <UserPlus size={20} />
                Assign Student to Batch
              </>
            )}

          </button>

        </div>

      </div>

    </div>
  );
}