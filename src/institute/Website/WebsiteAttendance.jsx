


import React, {

  useEffect,

  useMemo,

  useState,

} from "react";



import {

  FaCalendarAlt,

  FaCheckCircle,

  FaChevronLeft,

  FaChevronRight,

  FaClock,

  FaSearch,

  FaTimes,

  FaBell,

} from "react-icons/fa";



import { useNavigate } from "react-router-dom";



import API from "../../services/api";



/* =========================================================

   HELPERS

========================================================= */



const firstValue = (obj, keys, fallback = "") => {

  for (const key of keys) {

    const value = obj?.[key];



    if (

      value !== undefined &&

      value !== null &&

      value !== ""

    ) {

      return value;

    }

  }



  return fallback;

};



const firstNested = (

  obj,

  paths,

  fallback = ""

) => {

  for (const path of paths) {

    let value = obj;



    for (const part of path) {

      value = value?.[part];

    }



    if (

      value !== undefined &&

      value !== null &&

      value !== ""

    ) {

      return value;

    }

  }



  return fallback;

};



/* =========================================================

   GENERIC LIST NORMALIZER



   Supports:

   [

      {...}

   ]



   {

      data: [...]

   }



   {

      data: {

         courses: [...]

      }

   }



   {

      courses: [...]

   }

========================================================= */



const listFrom = (payload) => {

  const root = payload?.data ?? payload;



  if (Array.isArray(root)) {

    return root;

  }



  if (Array.isArray(root?.data)) {

    return root.data;

  }



  if (Array.isArray(root?.courses)) {

    return root.courses;

  }



  if (Array.isArray(root?.enrolled_courses)) {

    return root.enrolled_courses;

  }



  if (Array.isArray(root?.classes)) {

    return root.classes;

  }



  if (Array.isArray(root?.enrollments)) {

    return root.enrollments;

  }



  if (Array.isArray(root?.items)) {

    return root.items;

  }



  if (Array.isArray(payload?.courses)) {

    return payload.courses;

  }



  return [];

};



/* =========================================================

   COURSE HELPERS

========================================================= */



const getCourseId = (course) => {

  return (

    firstValue(

      course,

      [

        "class_id",

        "course_id",

        "id",

        "classId",

        "courseId",

      ],

      null

    ) ??

    firstNested(

      course,

      [

        ["class", "id"],

        ["course", "id"],

      ],

      null

    )

  );

};



const getCourseTitle = (course) => {

  return firstValue(

    course,

    [

      "title",

      "class_name",

      "class_title",

      "className",

      "course_name",

      "course_title",

      "name",

    ],

    ""

  ) ||

    firstNested(

      course,

      [

        ["class", "title"],

        ["class", "name"],

        ["course", "title"],

        ["course", "name"],

      ],

      ""

    );

};



const getCourseImage = (course) => {

  return (

    firstValue(

      course,

      [

        "image",

        "image_url",

        "class_image",

        "class_image_url",

        "course_image",

        "course_image_url",

      ],

      ""

    ) ||

    firstNested(

      course,

      [

        ["class", "image"],

        ["class", "image_url"],

        ["course", "image"],

        ["course", "image_url"],

      ],

      ""

    )

  );

};



/* =========================================================

   ATTENDANCE HELPERS

========================================================= */



const attendanceClassId = (record) => {

  return (

    firstValue(

      record,

      [

        "class_id",

        "course_id",

        "classId",

        "courseId",

        "classID",

      ],

      null

    ) ??

    firstNested(

      record,

      [

        ["class", "id"],

        ["course", "id"],

      ],

      null

    )

  );

};



const className = (record) => {

  return (

    firstValue(

      record,

      [

        "class_name",

        "class_title",

        "className",

        "course_name",

        "course_title",

        "courseName",

      ],

      ""

    ) ||

    firstNested(

      record,

      [

        ["class", "name"],

        ["class", "title"],

        ["course", "name"],

        ["course", "title"],

      ],

      ""

    ) ||

    "Not available"

  );

};



const trainerName = (record) => {

  return (

    firstValue(

      record,

      [

        "trainer_name",

        "trainer_full_name",

        "trainerName",

      ],

      ""

    ) ||

    firstNested(

      record,

      [

        ["trainer", "name"],

        ["trainer", "full_name"],

        ["trainer", "fullName"],

      ],

      ""

    ) ||

    "Not available"

  );

};



const statusValue = (record) => {

  return String(

    firstValue(

      record,

      [

        "status",

        "attendance_status",

        "attendanceStatus",

      ],

      ""

    )

  ).toUpperCase();

};



const recordDate = (record) => {

  return firstValue(

    record,

    [

      "date",

      "attendance_date",

      "session_date",

      "sessionDate",

      "created_at",

      "createdAt",

    ],

    null

  );

};



const recordTime = (record) => {

  return firstValue(

    record,

    [

      "time",

      "start_time",

      "session_time",

      "startTime",

    ],

    null

  );

};



const recordImage = (record) => {

  return (

    firstValue(

      record,

      [

        "class_image_url",

        "class_image",

        "image_url",

        "image",

      ],

      ""

    ) ||

    firstNested(

      record,

      [

        ["class", "image"],

        ["class", "image_url"],

        ["course", "image"],

        ["course", "image_url"],

      ],

      ""

    ) ||

    ""

  );

};



const isPresent = (status) => {

  return [

    "PRESENT",

    "ATTENDED",

    "COMPLETED",

  ].includes(String(status).toUpperCase());

};



const isAbsent = (status) => {

  return [

    "ABSENT",

    "MISSED",

  ].includes(String(status).toUpperCase());

};



const formatDate = (value) => {

  if (!value) {

    return "-";

  }



  const d = new Date(value);



  if (Number.isNaN(d.getTime())) {

    return String(value);

  }



  return d.toLocaleDateString(

    "en-IN",

    {

      day: "2-digit",

      month: "short",

      year: "numeric",

    }

  );

};



const formatTime = (value) => {

  if (!value) {

    return "-";

  }



  const match = String(value).match(

    /(\d{1,2}):(\d{2})/

  );



  if (!match) {

    return String(value);

  }



  let hours = Number(match[1]);



  const minutes = match[2];



  const period =

    hours >= 12 ? "PM" : "AM";



  hours = hours % 12 || 12;



  return `${hours}:${minutes} ${period}`;

};









/* =========================================================

   STAT CARD

========================================================= */



function Stat({

  icon: Icon,

  label,

  value,

  type = "",

}) {

  return (

    <div className="rounded-xl border border-white/10 bg-[#050505] p-4">



      <div className="flex items-center gap-4">



        <div

          className={`flex h-14 w-14 items-center justify-center rounded-xl ${

            type === "green"

              ? "bg-emerald-500/20 text-emerald-300"

              : type === "orange"

              ? "bg-amber-500/20 text-amber-300"

              : "bg-blue-500/20 text-blue-300"

          }`}

        >

          <Icon size={25} />

        </div>



        <div>

          <p className="text-sm text-white">

            {label}

          </p>



          <p className="mt-1 text-[28px] font-bold">

            {value}

          </p>

        </div>



      </div>

    </div>

  );

}



/* =========================================================

   ATTENDANCE RATE

========================================================= */



function Rate({ value }) {

  return (

    <div className="rounded-xl border border-white/10 bg-[#050505] p-4">



      <div className="flex items-center gap-5">



        <div

          className="relative flex h-[70px] w-[70px] items-center justify-center rounded-full"

          style={{

            background: `conic-gradient(#1687FF ${value}%, #10243A 0)`,

          }}

        >

          <div className="flex h-[54px] w-[54px] items-center justify-center rounded-full bg-[#050505] text-sm font-bold">

            {value}%

          </div>

        </div>



        <div>

          <p className="text-sm text-white">

            Attendance

          </p>



          <p className="font-semibold">

            Rate

          </p>

        </div>



      </div>

    </div>

  );

}



/* =========================================================

   CALENDAR

========================================================= */



function Calendar({

  month,

  setMonth,

  records,

}) {

  const year = month.getFullYear();



  const monthIndex = month.getMonth();



  const firstDay =

    new Date(

      year,

      monthIndex,

      1

    ).getDay();



  const totalDays =

    new Date(

      year,

      monthIndex + 1,

      0

    ).getDate();



  const cells = [

    ...Array(firstDay).fill(null),

    ...Array.from(

      {

        length: totalDays,

      },

      (_, index) => index + 1

    ),

  ];



  while (cells.length % 7 !== 0) {

    cells.push(null);

  }



  const attendanceMap = {};



  records.forEach((record) => {

    const value = recordDate(record);



    if (!value) {

      return;

    }



    const dateObject = new Date(value);



    if (

      !Number.isNaN(

        dateObject.getTime()

      ) &&

      dateObject.getFullYear() === year &&

      dateObject.getMonth() === monthIndex

    ) {

      attendanceMap[

        dateObject.getDate()

      ] = statusValue(record);

    }

  });



  return (

    <div className="rounded-xl border border-white/10 bg-[#050505] p-4">



      <div className="mb-4 flex items-center justify-between">



        <h2 className="text-[17px] font-bold">

          Attendance Calendar

        </h2>



        <div className="flex items-center gap-5">



          <button

            type="button"

            onClick={() =>

              setMonth(

                new Date(

                  year,

                  monthIndex - 1,

                  1

                )

              )

            }

          >

            <FaChevronLeft />

          </button>



          <span className="min-w-[140px] text-center text-sm font-semibold">

            {month.toLocaleDateString(

              "en-US",

              {

                month: "long",

                year: "numeric",

              }

            )}

          </span>



          <button

            type="button"

            onClick={() =>

              setMonth(

                new Date(

                  year,

                  monthIndex + 1,

                  1

                )

              )

            }

          >

            <FaChevronRight />

          </button>



        </div>

      </div>



      <div className="grid grid-cols-7 border-b border-white/10 pb-2 text-center text-xs text-white">

        {[

          "Sun",

          "Mon",

          "Tue",

          "Wed",

          "Thu",

          "Fri",

          "Sat",

        ].map((day) => (

          <span key={day}>

            {day}

          </span>

        ))}

      </div>



      <div className="grid grid-cols-7">



        {cells.map((day, index) => {



          const status =

            day

              ? attendanceMap[day]

              : null;



          const today =

            day &&

            new Date().getFullYear() === year &&

            new Date().getMonth() === monthIndex &&

            new Date().getDate() === day;



          return (

            <div

              key={index}

              className="relative flex h-[48px] items-center justify-center border-b border-r border-white/[.045]"

            >



              {day && (

                <span

                  className={`flex h-9 w-9 items-center justify-center rounded-full ${

                    today

                      ? "bg-gradient-to-br from-[#087CFF] to-[#38BDF8] font-bold"

                      : ""

                  }`}

                >

                  {day}

                </span>

              )}



              {day && status && (

                <span

                  className={`absolute bottom-1.5 h-2 w-2 rounded-full ${

                    isPresent(status)

                      ? "bg-emerald-400"

                      : isAbsent(status)

                      ? "bg-red-400"

                      : "bg-blue-500"

                  }`}

                />

              )}



            </div>

          );

        })}



      </div>



      <div className="mt-4 flex flex-wrap gap-4 text-xs text-white">

        <Legend

          color="bg-emerald-400"

          text="Attended"

        />



        <Legend

          color="bg-red-400"

          text="Missed"

        />



        <Legend

          color="bg-blue-500"

          text="Today"

        />



        <Legend

          color="bg-slate-600"

          text="No Class"

        />

      </div>



    </div>

  );

}



function Legend({

  color,

  text,

}) {

  return (

    <span className="flex items-center gap-2">

      <i

        className={`h-2.5 w-2.5 rounded-full ${color}`}

      />

      {text}

    </span>

  );

}



/* =========================================================

   ATTENDANCE BY CLASS

========================================================= */



function ByClass({

  records,

  onView,

}) {

  const groups = {};



  records.forEach((record) => {

    const name = className(record);



    if (!groups[name]) {

      groups[name] = {

        name,

        rows: [],

        image: recordImage(record),

      };

    }



    groups[name].rows.push(record);

  });



  return (

    <div className="rounded-xl border border-white/10 bg-[#050505] p-4">



      <div className="mb-4 flex items-center justify-between">



        <h2 className="text-[17px] font-bold">

          Attendance by Class

        </h2>



        <button

          type="button"

          className="text-xs text-blue-400"

        >

          View All →

        </button>



      </div>



      <div className="space-y-4">



        {Object.values(groups)

          .slice(0, 4)

          .map((group) => {



            const attended =

              group.rows.filter(

                (record) =>

                  isPresent(

                    statusValue(record)

                  )

              ).length;



            const rate =

              group.rows.length

                ? Math.round(

                    (attended /

                      group.rows.length) *

                      100

                  )

                : 0;



            return (

              <div

                key={group.name}

                className="flex items-center gap-3"

              >



                {group.image ? (

                  <img

                    src={group.image}

                    alt={group.name}

                    onError={(event) => {

                      event.currentTarget.style.display =

                        "none";

                    }}

                    className="h-12 w-[78px] rounded-lg object-cover"

                  />

                ) : (

                  <div className="flex h-12 w-[78px] items-center justify-center rounded-lg bg-white/5 text-[10px] text-white">

                    No image

                  </div>

                )}



                <div className="min-w-0 flex-1">



                  <p className="truncate text-sm font-semibold">

                    {group.name}

                  </p>



                  <div className="mt-2 flex items-center gap-2">



                    <div className="h-2 flex-1 rounded-full bg-white/10">



                      <div

                        className="h-full rounded-full bg-gradient-to-r from-[#087CFF] to-[#38BDF8]"

                        style={{

                          width: `${rate}%`,

                        }}

                      />



                    </div>



                    <span className="text-xs">

                      {rate}%

                    </span>



                  </div>



                </div>



                <button

                  type="button"

                  onClick={() =>

                    onView(group.name)

                  }

                  className="rounded-lg border border-blue-500 px-4 py-2 text-xs"

                >

                  View

                </button>



              </div>

            );

          })}



        {Object.keys(groups).length === 0 && (

          <div className="rounded-lg bg-white/[0.02] p-8 text-center text-sm text-white">

            No attendance records available.

          </div>

        )}



      </div>

    </div>

  );

}



/* =========================================================

   RECENT SESSIONS

========================================================= */



function Recent({

  records,

  onView,

}) {

  return (

    <div className="rounded-xl border border-white/10 bg-[#050505] p-3">



      <div className="mb-2 flex items-center justify-between px-1">



        <h2 className="text-[17px] font-bold">

          Recent Sessions

        </h2>



        <button

          type="button"

          className="text-xs text-blue-400"

        >

          View All →

        </button>



      </div>



      <div className="overflow-x-auto">



        <table className="w-full min-w-[760px] text-left">



          <thead>

            <tr className="border-y border-white/10 text-xs text-white">



              <th className="px-3 py-3">

                Date

              </th>



              <th className="px-3 py-3">

                Class

              </th>



              <th className="px-3 py-3">

                Trainer

              </th>



              <th className="px-3 py-3">

                Time

              </th>



              <th className="px-3 py-3">

                Status

              </th>



              <th className="px-3 py-3">

                Action

              </th>



            </tr>

          </thead>



          <tbody>



            {[

              ...records,

            ]

              .sort(

                (a, b) =>

                  new Date(

                    recordDate(b)

                  ) -

                  new Date(

                    recordDate(a)

                  )

              )

              .slice(0, 5)

              .map((record, index) => {



                const status =

                  statusValue(record);



                const image =

                  recordImage(record);



                return (

                  <tr

                    key={

                      record.id ||

                      record.attendance_id ||

                      index

                    }

                    className="border-b border-white/[.06]"

                  >



                    <td className="px-3 py-3 text-xs">

                      {formatDate(

                        recordDate(record)

                      )}

                    </td>



                    <td className="px-3 py-3">



                      <div className="flex items-center gap-2">



                        {image ? (

                          <img

                            src={image}

                            alt={className(record)}

                            onError={(event) => {

                              event.currentTarget.style.display =

                                "none";

                            }}

                            className="h-9 w-11 rounded-md object-cover"

                          />

                        ) : (

                          <div className="flex h-9 w-11 items-center justify-center rounded-md bg-white/5 text-[8px] text-white">

                            —

                          </div>

                        )}



                        <span className="max-w-[150px] truncate text-xs">

                          {className(record)}

                        </span>



                      </div>



                    </td>



                    <td className="px-3 py-3 text-xs text-white">

                      {trainerName(record)}

                    </td>



                    <td className="whitespace-nowrap px-3 py-3 text-xs">

                      {formatTime(

                        recordTime(record)

                      )}

                    </td>



                    <td className="px-3 py-3">



                      <span

                        className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-semibold ${

                          isPresent(status)

                            ? "bg-emerald-500/15 text-emerald-300"

                            : isAbsent(status)

                            ? "bg-red-500/15 text-red-300"

                            : "bg-blue-500/15 text-blue-300"

                        }`}

                      >



                        <span

                          className={`h-2 w-2 rounded-full ${

                            isPresent(status)

                              ? "bg-emerald-400"

                              : isAbsent(status)

                              ? "bg-red-400"

                              : "bg-blue-400"

                          }`}

                        />



                        {isPresent(status)

                          ? "Present"

                          : isAbsent(status)

                          ? "Absent"

                          : "Not available"}



                      </span>



                    </td>



                    <td className="px-3 py-3">



                      <button

                        type="button"

                        onClick={() =>

                          onView(record)

                        }

                        className="rounded-lg border border-blue-500 px-5 py-2 text-xs"

                      >

                        View

                      </button>



                    </td>



                  </tr>

                );

              })}



          </tbody>



        </table>



        {records.length === 0 && (

          <div className="p-8 text-center text-sm text-white">

            No attendance sessions available.

          </div>

        )}



      </div>

    </div>

  );

}











/* =========================================================

   MAIN ATTENDANCE PAGE

========================================================= */



export default function WebsiteAttendance() {



  const navigate = useNavigate();



  const [

    records,

    setRecords,

  ] = useState([]);



  const [

    courses,

    setCourses,

  ] = useState([]);



  const [

    loading,

    setLoading,

  ] = useState(true);



  const [

    coursesLoading,

    setCoursesLoading,

  ] = useState(true);



  const [

    error,

    setError,

  ] = useState("");



  const [

    coursesError,

    setCoursesError,

  ] = useState("");



  const [

    search,

    setSearch,

  ] = useState("");



  const [

    filter,

    setFilter,

  ] = useState("ALL");



  const [

    month,

    setMonth,

  ] = useState(new Date());



  const [

    selected,

    setSelected,

  ] = useState(null);



  /* =======================================================

     LOAD ATTENDANCE

  ======================================================= */



  useEffect(() => {



    let mounted = true;



    const loadAttendance = async () => {



      try {



        setLoading(true);

        setError("");



        const response =

          await API.get(

            "/attendance/my-attendance"

          );



        if (!mounted) {

          return;

        }



        const attendance =

          listFrom(

            response?.data

          );



        setRecords(

          Array.isArray(attendance)

            ? attendance

            : []

        );



      } catch (err) {



        console.error(

          "Attendance API Error:",

          err

        );



        if (!mounted) {

          return;

        }



        /*

          404 simply means no attendance

          data has been created yet.

        */



        if (

          err?.response?.status === 404

        ) {

          setRecords([]);

        } else {

          setError(

            err?.response?.data?.message ||

              err?.message ||

              "Unable to load attendance."

          );

        }



      } finally {



        if (mounted) {

          setLoading(false);

        }



      }

    };



    loadAttendance();



    return () => {

      mounted = false;

    };



  }, []);







  useEffect(() => {



    let mounted = true;



    const loadCourses = async () => {



      try {



        setCoursesLoading(true);

        setCoursesError("");



        console.log(

          "Attendance: loading user courses..."

        );



        const response =

          await API.get(

            "/lms/user/courses"

          );



        console.log(

          "Attendance courses response:",

          response

        );



        if (!mounted) {

          return;

        }



        const courseList =

          listFrom(

            response?.data

          );



        console.log(

          "Attendance enrolled courses:",

          courseList

        );



        setCourses(

          Array.isArray(courseList)

            ? courseList

            : []

        );



      } catch (err) {



        console.error(

          "Attendance Courses API Error:",

          err

        );



        if (!mounted) {

          return;

        }



        setCourses([]);



        setCoursesError(

          err?.response?.data?.message ||

            err?.message ||

            "Unable to load enrolled classes."

        );



      } finally {



        if (mounted) {

          setCoursesLoading(false);

        }



      }

    };



    loadCourses();



    return () => {

      mounted = false;

    };



  }, []);



  /* =======================================================

     CREATE CLASS DROPDOWN OPTIONS



     Classes come from /lms/user/courses.



     Attendance records are also merged in so that

     any class existing only in attendance is still shown.

  ======================================================= */



  const classOptions = useMemo(() => {



    const map = new Map();



    /* -----------------------------------------------

       FIRST:

       Add enrolled LMS courses

    ------------------------------------------------ */



    courses.forEach((course) => {



      const id =

        getCourseId(course);



      const title =

        getCourseTitle(course);



      if (!title) {

        return;

      }



      const key =

        id !== null &&

        id !== undefined

          ? `id-${id}`

          : `name-${title.toLowerCase()}`;



      map.set(key, {

        key,

        id,

        title,

        image:

          getCourseImage(course),

      });



    });



    /* -----------------------------------------------

       SECOND:

       Add classes from attendance records

    ------------------------------------------------ */



    records.forEach((record) => {



      const id =

        attendanceClassId(record);



      const title =

        className(record);



      if (

        !title ||

        title === "Not available"

      ) {

        return;

      }



      const key =

        id !== null &&

        id !== undefined

          ? `id-${id}`

          : `name-${title.toLowerCase()}`;



      if (!map.has(key)) {



        map.set(key, {

          key,

          id,

          title,

          image:

            recordImage(record),

        });



      }



    });



    return Array.from(

      map.values()

    ).sort((a, b) =>

      String(a.title).localeCompare(

        String(b.title)

      )

    );



  }, [courses, records]);



  /* =======================================================

     FILTER ATTENDANCE

  ======================================================= */



  const filteredRecords = useMemo(() => {



    const query =

      search

        .toLowerCase()

        .trim();



    return records.filter(

      (record) => {



        const recordId =

          attendanceClassId(

            record

          );



        const selectedOption =

          classOptions.find(

            (option) =>

              option.key === filter

          );



        let classMatches =

          filter === "ALL";



        if (

          filter !== "ALL" &&

          selectedOption

        ) {



          const selectedId =

            selectedOption.id;



          const recordClassName =

            className(record)

              .toLowerCase();



          const selectedTitle =

            selectedOption.title

              .toLowerCase();



          classMatches =

            (

              selectedId !== null &&

              selectedId !== undefined &&

              String(recordId) ===

                String(selectedId)

            ) ||

            recordClassName ===

              selectedTitle;



        }



        const searchableText = [

          className(record),

          trainerName(record),

          statusValue(record),

        ]

          .join(" ")

          .toLowerCase();



        const searchMatches =

          !query ||

          searchableText.includes(query);



        return (

          classMatches &&

          searchMatches

        );

      }

    );



  }, [

    records,

    filter,

    search,

    classOptions,

  ]);



  /* =======================================================

     STATISTICS

  ======================================================= */



  const total =

    filteredRecords.length;



  const attended =

    filteredRecords.filter(

      (record) =>

        isPresent(

          statusValue(record)

        )

    ).length;



  const missed =

    filteredRecords.filter(

      (record) =>

        isAbsent(

          statusValue(record)

        )

    ).length;



  const rate =

    total > 0

      ? Math.round(

          (attended / total) * 100

        )

      : 0;



  /* =======================================================

     SELECTED CLASS

  ======================================================= */



  const selectedClass =

    classOptions.find(

      (option) =>

        option.key === filter

    );



  /* =======================================================

     RENDER

  ======================================================= */



  return (

    <div className="min-h-screen bg-[#000000] text-white">







    <main className="pt-0">



  <div className="mx-auto max-w-[1500px] px-6 py-2 2xl:px-8">

          {/* =============================================

              PAGE HEADER

          ============================================= */}



          <div className="mb-5 flex items-start justify-between gap-6">



            <div>



              <h1 className="text-[40px] font-bold leading-none">

                Attend

                <span className="bg-gradient-to-r from-[#087CFF] to-[#38BDF8] bg-clip-text text-transparent">

                  ance

                </span>

              </h1>



              <p className="mt-3 text-[17px] text-white">

                Track your class attendance and stay

                consistent in your learning journey.

              </p>



            </div>



            <div className="hidden items-start gap-8 xl:flex">





              {/* =========================================

                  CLASS DROPDOWN

              ========================================= */}



              <div className="relative">



                <select

                  value={filter}

                  onChange={(event) =>

                    setFilter(

                      event.target.value

                    )

                  }

                  disabled={coursesLoading}

                  className="h-[52px] w-[225px] rounded-xl border border-blue-500/70 bg-[#050505] px-4 text-sm font-medium text-white outline-none transition focus:border-blue-400 disabled:cursor-not-allowed disabled:opacity-60"

                >



                  <option value="ALL">

                    {coursesLoading

                      ? "Loading Classes..."

                      : "All Classes"}

                  </option>



                  {classOptions.map(

                    (option) => (

                      <option

                        key={option.key}

                        value={option.key}

                      >

                        {option.title}

                      </option>

                    )

                  )}



                </select>



                {!coursesLoading &&

                  classOptions.length ===

                    0 && (

                    <p className="absolute left-1 top-[58px] w-[225px] text-[10px] text-white">

                      No enrolled classes found.

                    </p>

                  )}



              </div>



            </div>

          </div>



          {/* =============================================

              MOBILE SEARCH + FILTER

          ============================================= */}



          <div className="mb-4 flex gap-3 xl:hidden">



            <div className="relative flex-1">



              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white" />



              <input

                value={search}

                onChange={(event) =>

                  setSearch(

                    event.target.value

                  )

                }

                placeholder="Search class or trainer..."

                className="h-11 w-full rounded-xl border border-white/10 bg-[#050505] pl-11 pr-4 text-sm outline-none"

              />



            </div>



            <select

              value={filter}

              onChange={(event) =>

                setFilter(

                  event.target.value

                )

              }

              disabled={coursesLoading}

              className="h-11 max-w-[210px] rounded-xl border border-blue-500/70 bg-[#050505] px-4 text-sm outline-none disabled:opacity-60"

            >



              <option value="ALL">

                {coursesLoading

                  ? "Loading..."

                  : "All Classes"}

              </option>



              {classOptions.map(

                (option) => (

                  <option

                    key={option.key}

                    value={option.key}

                  >

                    {option.title}

                  </option>

                )

              )}



            </select>



          </div>



          {/* =============================================

              COURSE API ERROR

          ============================================= */}



          {coursesError && (

            <div className="mb-4 rounded-xl border border-yellow-500/20 bg-yellow-500/5 px-4 py-3 text-xs text-yellow-300">

              Classes could not be loaded:

              {" "}

              {coursesError}

            </div>

          )}



          {/* =============================================

              STAT CARDS

          ============================================= */}



          {!loading && !error && (

            <div className="mb-4 grid grid-cols-4 gap-4">



              <Stat

                icon={FaCalendarAlt}

                label="Total Classes"

                value={total}

              />



              <Stat

                icon={FaCheckCircle}

                label="Attended"

                value={attended}

                type="green"

              />



              <Stat

                icon={FaClock}

                label="Missed"

                value={missed}

                type="orange"

              />



              <Rate

                value={rate}

              />



            </div>

          )}



          {/* =============================================

              LOADING

          ============================================= */}



          {loading ? (



            <div className="space-y-4">



              <div className="h-96 animate-pulse rounded-xl bg-[#050505]" />



              <div className="h-64 animate-pulse rounded-xl bg-[#050505]" />



            </div>



          ) : error ? (



            /* ===========================================

               ERROR

            =========================================== */



            <div className="rounded-xl border border-white/10 bg-[#050505] p-10 text-center">



              <p className="font-semibold text-red-300">

                Unable to load attendance

              </p>



              <p className="mt-2 text-sm text-white">

                {error}

              </p>



              <button

                type="button"

                onClick={() =>

                  window.location.reload()

                }

                className="mt-5 rounded-lg border border-blue-500/50 px-5 py-2 text-xs"

              >

                Retry

              </button>



            </div>



          ) : (



            <>

              {/* =========================================

                  CALENDAR + BY CLASS

              ========================================= */}



              <div className="mb-4 grid grid-cols-1 items-start gap-4 lg:grid-cols-2">



                <Calendar

                  month={month}

                  setMonth={setMonth}

                  records={filteredRecords}

                />



                <ByClass

                  records={filteredRecords}

                  onView={(name) =>

                    setSearch(name)

                  }

                />



              </div>



              {/* =========================================

                  RECENT + INSIGHTS

              ========================================= */}



              <div className="mb-4 grid grid-cols-1 items-start gap-4 2xl:grid-cols-[minmax(0,1fr)_270px]">



                <Recent

                  records={filteredRecords}

                  onView={setSelected}

                />







              </div>

            </>



          )}



        </div>



      </main>



      {/* ===============================================

          SESSION DETAILS MODAL

      =============================================== */}



      {selected && (



        <div

          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"

          onClick={() =>

            setSelected(null)

          }

        >



          <div

            className="w-full max-w-md rounded-2xl border border-white/10 bg-[#050505] p-6"

            onClick={(event) =>

              event.stopPropagation()

            }

          >



            <div className="flex items-center justify-between">



              <h2 className="text-xl font-bold">

                Session Details

              </h2>



              <button

                type="button"

                onClick={() =>

                  setSelected(null)

                }

                className="text-white hover:text-white"

              >

                <FaTimes />

              </button>



            </div>



            <div className="mt-5 space-y-4">



              <div>



                <p className="text-xs text-white">

                  Class

                </p>



                <p className="font-semibold">

                  {className(selected)}

                </p>



              </div>



              <div>



                <p className="text-xs text-white">

                  Trainer

                </p>



                <p className="font-semibold">

                  {trainerName(selected)}

                </p>



              </div>



              <div className="grid grid-cols-2 gap-4">



                <div>



                  <p className="text-xs text-white">

                    Date

                  </p>



                  <p>

                    {formatDate(

                      recordDate(selected)

                    )}

                  </p>



                </div>



                <div>



                  <p className="text-xs text-white">

                    Time

                  </p>



                  <p>

                    {formatTime(

                      recordTime(selected)

                    )}

                  </p>



                </div>



              </div>



              <div>



                <p className="text-xs text-white">

                  Status

                </p>



                <p className="font-semibold">



                  {isPresent(

                    statusValue(selected)

                  )

                    ? "Present"

                    : isAbsent(

                        statusValue(selected)

                      )

                    ? "Absent"

                    : "Not available"}



                </p>



              </div>



            </div>



          </div>



        </div>



      )}



    </div>

  );

}