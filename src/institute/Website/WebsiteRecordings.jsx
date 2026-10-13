

import { useEffect, useMemo, useState } from "react";



import { useNavigate } from "react-router-dom";





import {



  HiPlay,



  HiCalendar,



  HiDownload,



  HiEye,



  HiSearch,



  HiVideoCamera,



  HiChevronDown,



  HiChevronLeft,



  HiChevronRight,



  HiUser,



  HiRefresh,



  HiX,



  HiBookOpen,



  HiClock,



  HiLocationMarker,



} from "react-icons/hi";







import API from "../../services/api";







/* =========================================================



   RESPONSE HELPERS



\========================================================= */







const getArrayFromResponse = (response) => {



  const data = response?.data;







  if (Array.isArray(data)) {



    return data;



  }







  if (Array.isArray(data?.data)) {



    return data.data;



  }







  if (Array.isArray(data?.data?.courses)) {



    return data.data.courses;



  }







  if (Array.isArray(data?.courses)) {



    return data.courses;



  }







  if (Array.isArray(data?.data?.classes)) {



    return data.data.classes;



  }







  if (Array.isArray(data?.classes)) {



    return data.classes;



  }







  if (Array.isArray(data?.items)) {



    return data.items;



  }







  if (Array.isArray(data?.data?.items)) {



    return data.data.items;



  }







  return [];



};







/* =========================================================



   GENERIC VALUE HELPERS



\========================================================= */







const firstValue = (



  object,



  keys,



  fallback = ""



) => {



  for (const key of keys) {



    const value = object?.[key];







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







const firstNestedValue = (



  object,



  paths,



  fallback = ""



) => {



  for (const path of paths) {



    let value = object;







    for (const key of path) {



      value = value?.[key];



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



   CLASS DATA



\========================================================= */







const getClassId = (item) => {



  return firstValue(



    item,



    [



      "class_id",



      "classId",



      "course_id",



      "courseId",



      "id",



    ],



    null



  ) ??



    firstNestedValue(



      item,



      [



        ["class", "id"],



        ["course", "id"],



        ["class_details", "id"],



      ],



      null



    );



};







const getClassName = (item) => {



  return (



    firstValue(



      item,



      [



        "class_title",



        "class_name",



        "course_title",



        "course_name",



        "title",



        "name",



      ],



      ""



    ) ||



    firstNestedValue(



      item,



      [



        ["class", "title"],



        ["class", "name"],



        ["course", "title"],



        ["course", "name"],



        ["class_details", "title"],



        ["class_details", "name"],



      ],



      "Untitled Class"



    )



  );



};







const getClassImage = (item) => {



  return (



    firstValue(



      item,



      [



        "class_image",



        "class_image_url",



        "classImage",



        "classImageUrl",



        "course_image",



        "course_image_url",



        "image_url",



        "image",



        "thumbnail",



        "thumbnail_url",



        "cover_image",



      ],



      ""



    ) ||



    firstNestedValue(



      item,



      [



        ["class", "image"],



        ["class", "image_url"],



        ["class", "thumbnail"],



        ["class", "thumbnail_url"],



        ["class_details", "image"],



        ["class_details", "image_url"],



        ["course", "image"],



        ["course", "image_url"],



      ],



      ""



    )



  );



};







const getMode = (item) => {



  const value =



    firstValue(



      item,



      [



        "mode",



        "class_mode",



        "learning_mode",



        "delivery_mode",



        "session_mode",



        "class_type",



      ],



      ""



    ) ||



    firstNestedValue(



      item,



      [



        ["class", "mode"],



        ["class", "class_mode"],



        ["class_details", "mode"],



        ["course", "mode"],



      ],



      ""



    );







  return String(value || "")



    .trim()



    .toUpperCase();



};







const getCategory = (item) => {



  const category =



    item?.category ||



    item?.category_details ||



    item?.class?.category ||



    item?.class_details?.category;







  return (



    firstValue(



      item,



      [



        "category_name",



        "categoryName",



      ],



      ""



    ) ||



    (typeof category === "string"



      ? category



      : "") ||



    firstValue(



      category,



      [



        "name",



        "title",



      ],



      ""



    )



  );



};







const getSubcategory = (item) => {



  const subcategory =



    item?.subcategory ||



    item?.subcategory_details ||



    item?.class?.subcategory ||



    item?.class_details?.subcategory;







  return (



    firstValue(



      item,



      [



        "subcategory_name",



        "subcategoryName",



      ],



      ""



    ) ||



    (typeof subcategory === "string"



      ? subcategory



      : "") ||



    firstValue(



      subcategory,



      [



        "name",



        "title",



      ],



      ""



    )



  );



};







const getTrainer = (item) => {



  const trainer =



    item?.trainer ||



    item?.trainer_details ||



    item?.class?.trainer ||



    item?.class_details?.trainer ||



    item?.course?.trainer;







  return (



    firstValue(



      item,



      [



        "trainer_name",



        "trainerName",



        "trainer_full_name",



      ],



      ""



    ) ||



    firstValue(



      trainer,



      [



        "full_name",



        "fullName",



        "name",



        "trainer_name",



      ],



      ""



    ) ||



    [



      trainer?.first_name,



      trainer?.last_name,



    ]



      .filter(Boolean)



      .join(" ") ||



    "Trainer"



  );



};







const getTrainerImage = (item) => {



  const trainer =



    item?.trainer ||



    item?.trainer_details ||



    item?.class?.trainer ||



    item?.class_details?.trainer;







  return (



    firstValue(



      item,



      [



        "trainer_image",



        "trainer_image_url",



        "trainerImage",



        "trainer_profile_image",



        "trainer_profile_image_url",



      ],



      ""



    ) ||



    firstValue(



      trainer,



      [



        "image",



        "image_url",



        "profile_image",



        "profileImage",



        "profile_image_url",



        "avatar",



        "avatar_url",



      ],



      ""



    )



  );



};







const getDuration = (item) => {



  return (



    firstValue(



      item,



      [



        "duration",



        "duration_weeks",



        "course_duration",



        "weeks",



      ],



      ""



    ) ||



    firstNestedValue(



      item,



      [



        ["class", "duration"],



        ["class_details", "duration"],



        ["course", "duration"],



      ],



      ""



    )



  );



};







const getLevel = (item) => {



  return (



    firstValue(



      item,



      [



        "level",



        "difficulty",



        "class_level",



      ],



      ""



    ) ||



    firstNestedValue(



      item,



      [



        ["class", "level"],



        ["class_details", "level"],



        ["course", "level"],



      ],



      ""



    ) ||



    "Beginner"



  );



};







const getAvailableDays = (item) => {



  const value =



    firstValue(



      item,



      [



        "available_days",



        "availableDays",



        "days",



        "class_days",



        "week_days",



      ],



      ""



    ) ||



    firstNestedValue(



      item,



      [



        ["class", "available_days"],



        ["class", "days"],



        ["class_details", "available_days"],



        ["course", "available_days"],



      ],



      ""



    );







  if (Array.isArray(value)) {



    return value.join(", ");



  }







  return value;



};







const getStartDate = (item) => {



  return (



    firstValue(



      item,



      [



        "start_date",



        "startDate",



        "class_start_date",



        "course_start_date",



      ],



      ""



    ) ||



    firstNestedValue(



      item,



      [



        ["class", "start_date"],



        ["class_details", "start_date"],



        ["course", "start_date"],



      ],



      ""



    )



  );



};







const getStartTime = (item) => {



  return (



    firstValue(



      item,



      [



        "start_time",



        "startTime",



        "class_start_time",



      ],



      ""



    ) ||



    firstNestedValue(



      item,



      [



        ["class", "start_time"],



        ["class_details", "start_time"],



        ["course", "start_time"],



      ],



      ""



    )



  );



};







const getPrice = (item) => {



  return firstValue(



    item,



    [



      "price",



      "class_price",



      "course_price",



      "amount",



    ],



    null



  );



};







const getLessons = (item) => {



  const value =



    firstValue(



      item,



      [



        "total_lessons",



        "lesson_count",



        "lessons_count",



      ],



      null



    ) ??



    firstNestedValue(



      item,



      [



        ["class", "total_lessons"],



        ["class", "lesson_count"],



        ["class_details", "total_lessons"],



      ],



      null



    );







  if (value !== null) {



    return Number(value) || 0;



  }







  const lessons =



    item?.lessons ||



    item?.class?.lessons ||



    item?.class_details?.lessons;







  return Array.isArray(lessons)



    ? lessons.length



    : 0;



};







/* =========================================================



   MEDIA URL



\========================================================= */







const resolveMediaUrl = (value) => {



  if (!value) {



    return "";



  }







  const url = String(value).trim();







  if (!url) {



    return "";



  }







  if (



    url.startsWith("http\://") ||



    url.startsWith("https\://") ||



    url.startsWith("data:") ||



    url.startsWith("blob:")



  ) {



    return url;



  }







  try {



    const base =



      API?.defaults?.baseURL ||



      window.location.origin;







    const origin = new URL(



      base,



      window.location.origin



    ).origin;







    return url.startsWith("/")



      ? `${origin}${url}`



      : `${origin}/${url}`;



  } catch {



    return url;



  }



};







/* =========================================================



   DATE FORMAT



\========================================================= */







const formatDate = (value) => {



  if (!value) {



    return "";



  }







  const date = new Date(value);







  if (Number.isNaN(date.getTime())) {



    return String(value);



  }







  return date.toLocaleDateString(



    "en-IN",



    {



      day: "2-digit",



      month: "short",



      year: "numeric",



    }



  );



};







/* =========================================================



   RECORDING HELPERS



\========================================================= */







const getRecordingUrl = (item) => {



  return (



    item?.recording_url ||



    item?.recordingUrl ||



    item?.url ||



    item?.video_url ||



    item?.videoUrl ||



    item?.recording?.recording_url ||



    item?.recording?.recordingUrl ||



    item?.recording?.url ||



    item?.session?.recording_url ||



    item?.session?.recordingUrl ||



    item?.session?.recording?.url ||



    null



  );



};







const getRecordingClassId = (item) => {



  return (



    item?.class_id ||



    item?.classId ||



    item?.course_id ||



    item?.courseId ||



    item?.class?.id ||



    item?.class_details?.id ||



    item?.session?.class_id ||



    item?.session?.classId ||



    item?.session?.class?.id ||



    null



  );



};







const getRecordingClassName = (item) => {



  return (



    item?.class_title ||



    item?.class_name ||



    item?.class?.title ||



    item?.class?.name ||



    item?.class_details?.title ||



    item?.class_details?.name ||



    item?.session?.class_title ||



    item?.session?.class_name ||



    item?.session?.class?.title ||



    item?.session?.class?.name ||



    null



  );



};







const normalizeRecording = (



  item,



  index



) => {



  return {



    id:



      item?.id ||



      item?.recording_id ||



      item?.recordingId ||



      item?.session_id ||



      item?.sessionId ||



      `recording-${index}`,







    title:



      item?.title ||



      item?.session_title ||



      item?.session_name ||



      item?.recording_title ||



      item?.recordingTitle ||



      "Recorded Session",







    classId:



      getRecordingClassId(item),







    className:



      getRecordingClassName(item),







    trainer:



      item?.trainer_name ||



      item?.trainerName ||



      item?.trainer?.name ||



      item?.trainer?.full_name ||



      "Trainer",







    trainerImage:



      item?.trainer_image ||



      item?.trainerImage ||



      item?.trainer?.image ||



      item?.trainer?.image_url ||



      item?.trainer?.profile_image ||



      "",







    image:



      item?.class_image ||



      item?.class_image_url ||



      item?.class?.image ||



      item?.class?.image_url ||



      "",







    date:



      item?.session_date ||



      item?.sessionDate ||



      item?.recording_date ||



      item?.recordingDate ||



      item?.date ||



      item?.created_at ||



      item?.createdAt ||



      null,







    duration:



      item?.recording_duration ||



      item?.recordingDuration ||



      item?.duration ||



      null,







    views:



      item?.recording_views ??



      item?.recordingViews ??



      item?.views ??



      item?.view_count ??



      null,







    url:



      getRecordingUrl(item),







    downloadUrl:



      item?.recording_download_url ||



      item?.recordingDownloadUrl ||



      item?.download_url ||



      item?.downloadUrl ||



      null,







    recordingType:



      item?.recording_type ||



      item?.recordingType ||



      item?.type ||



      "VIDEO",



  };



};







/* =========================================================



   API



\========================================================= */









const fetchUserOfflineClasses = async () => {

  try {

    const response = await API.get("/bookings/my-bookings");



    console.log(

      "MY BOOKINGS API RESPONSE:",

      response?.data

    );



    const bookings = getArrayFromResponse(response);



    console.log(

      "MY BOOKINGS:",

      bookings

    );



    /*

     * IMPORTANT:

     * This page must show ONLY classes that the

     * currently logged-in student has actually booked.

     */

    const activeBookings = bookings.filter((booking) => {

      const status = String(

        booking?.status ??

          booking?.booking_status ??

          ""

      )

        .trim()

        .toUpperCase();



      const paymentStatus = String(

        booking?.payment_status ??

          booking?.paymentStatus ??

          booking?.payment?.status ??

          ""

      )

        .trim()

        .toUpperCase();



      const validBookingStatus =

        status === "" ||

        ["CONFIRMED", "ACTIVE", "COMPLETED"].includes(

          status

        );



      const validPayment =

        paymentStatus === "" ||

        ["PAID", "SUCCESS", "COMPLETED"].includes(

          paymentStatus

        );



      return validBookingStatus && validPayment;

    });



    /*

     * Convert each booking into the class shape used by

     * OfflineClassCard, then keep ONLY OFFLINE classes.

     */

    const offlineClasses = activeBookings

      .map((booking) => {

        const classData =

          booking?.class ||

          booking?.course ||

          booking?.class_details ||

          booking?.course_details ||

          {};



        const classId =

          booking?.class_id ??

          booking?.classId ??

          booking?.course_id ??

          booking?.courseId ??

          classData?.id ??

          null;



        if (

          classId === null ||

          classId === undefined ||

          classId === ""

        ) {

          return null;

        }



        const mode = String(

          classData?.mode ??

            classData?.class_mode ??

            booking?.mode ??

            booking?.class_mode ??

            booking?.booking_mode ??

            ""

        )

          .trim()

          .toUpperCase();



        if (mode !== "OFFLINE") {

          return null;

        }



        return {

          ...classData,



          id: Number(classId),

          class_id: Number(classId),



          title:

            classData?.title ||

            classData?.name ||

            booking?.class_title ||

            booking?.class_name ||

            booking?.course_title ||

            booking?.course_name ||

            "Untitled Class",



          image:

            classData?.image ||

            classData?.image_url ||

            booking?.class_image ||

            booking?.class_image_url ||

            booking?.course_image ||

            booking?.course_image_url ||

            null,



          class_image:

            classData?.image ||

            classData?.image_url ||

            booking?.class_image ||

            booking?.class_image_url ||

            booking?.course_image ||

            booking?.course_image_url ||

            null,



          mode: "OFFLINE",



          trainer_id:

            classData?.trainer_id ??

            booking?.trainer_id ??

            null,



          trainer_name:

            classData?.trainer_name ||

            booking?.trainer_name ||

            booking?.trainer?.full_name ||

            booking?.trainer?.name ||

            "Trainer",



          trainer_image:

            classData?.trainer_image ||

            booking?.trainer_image ||

            booking?.trainer?.profile_image ||

            booking?.trainer?.image ||

            null,



          booking_id:

            booking?.id ??

            booking?.booking_id ??

            null,



          enrollment_id:

            booking?.id ??

            booking?.booking_id ??

            null,



          booking_status:

            booking?.status ||

            booking?.booking_status ||

            null,



          payment_status:

            booking?.payment_status ||

            booking?.paymentStatus ||

            null,



          enrolled_on:

            booking?.created_at ||

            booking?.booked_at ||

            booking?.enrolled_on ||

            null,



          booking,

        };

      })

      .filter(Boolean);



    /*

     * One card per class.

     * If duplicate booking records exist for the same class,

     * show that class only once.

     */

    const uniqueOfflineClasses = Array.from(

      new Map(

        offlineClasses.map((course) => [

          String(course.id),

          course,

        ])

      ).values()

    );



    console.log(

      "FINAL BOOKED OFFLINE CLASSES:",

      uniqueOfflineClasses

    );



    return uniqueOfflineClasses;

  } catch (error) {

    console.error(

      "FAILED TO LOAD BOOKED OFFLINE CLASSES:",

      error?.response?.data ||

        error?.message ||

        error

    );



    throw error;

  }

};



const fetchUserRecordings =



  async () => {



    const response =



      await API.get(



        "/recordings/users"



      );







    const recordings =



      getArrayFromResponse(



        response



      );







    console.log(



      "USER RECORDINGS:",



      recordings



    );







    return recordings;



  };







/* =========================================================



   CLASS CARD



\========================================================= */







function OfflineClassCard({



  course,



  recordings,



  onViewRecordings,



}) {



  const navigate = useNavigate();



  const classId =



    getClassId(course);







  const className =



    getClassName(course);







  const image =



    resolveMediaUrl(



      getClassImage(course)



    );







  const trainer =



    getTrainer(course);







  const trainerImage =



    resolveMediaUrl(



      getTrainerImage(course)



    );







  const category =



    getCategory(course);







  const subcategory =



    getSubcategory(course);







  const duration =



    getDuration(course);







  const level =



    getLevel(course);







  const days =



    getAvailableDays(course);







  const startDate =



    getStartDate(course);







  const startTime =



    getStartTime(course);







  const price =



    getPrice(course);







  const lessons =



    getLessons(course);







  const classRecordings =



    recordings.filter(



      (recording) => {



        if (



          recording.classId !==



            null &&



          recording.classId !==



            undefined &&



          classId !== null &&



          classId !== undefined



        ) {



          return (



            String(



              recording.classId



            ) ===



            String(classId)



          );



        }







        return (



          String(



            recording.className ||



              ""



          )



            .trim()



            .toLowerCase() ===



          String(className || "")



            .trim()



            .toLowerCase()



        );



      }



    );







  return (



    <article

      onClick={() => {

        const id = getClassId(course);

        if (id === null || id === undefined || id === "") {

          console.error("Cannot navigate: class ID is missing", course);

          return;

        }

        navigate(`/institute/website/preview/lms/my-learning/${id}`);

      }}

      className="group cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-[#050505] transition duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-950/20"

    >







      {/* IMAGE */}







      <div className="relative h-[200px] overflow-hidden bg-[#050b14]">







        {image ? (



          <img



            src={image}



            alt={className}



            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"



            onError={(event) => {



              event.currentTarget.style.display =



                "none";



            }}



          />



        ) : (



          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#24102b] via-[#11111a] to-[#17101e]">



            <HiBookOpen



              size={55}



              className="text-blue-400/50"



            />



          </div>



        )}







        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />







        {/* OFFLINE */}







        <span className="absolute left-4 top-4 rounded-full bg-orange-500 px-3 py-1.5 text-xs font-bold text-white shadow-lg">



          OFFLINE



        </span>







        {/* BOOKED */}







        <span className="absolute right-4 top-4 rounded-full bg-green-500/90 px-3 py-1.5 text-xs font-bold text-white shadow-lg">



          BOOKED



        </span>







      </div>







      {/* CONTENT */}







      <div className="p-5">







        {/* TITLE */}







        <h3 className="min-h-[50px] text-xl font-bold leading-6 text-white">



          {className}



        </h3>







        {/* CATEGORY */}







        {(category ||



          subcategory) && (



          <div className="mt-2 flex flex-wrap gap-2">







            {category && (



              <span className="rounded-full bg-blue-500/15 px-3 py-1 text-xs text-blue-300">



                {category}



              </span>



            )}







            {subcategory && (



              <span className="rounded-full bg-blue-500/15 px-3 py-1 text-xs text-blue-300">



                {subcategory}



              </span>



            )}







          </div>



        )}







        {/* TRAINER */}







        <div className="mt-4 flex items-center gap-3">







          {trainerImage ? (



            <img



              src={trainerImage}



              alt={trainer}



              className="h-9 w-9 rounded-full object-cover"



            />



          ) : (



            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-blue-500">



              <HiUser size={17} />



            </div>



          )}







          <div>



            <p className="text-[11px] text-white/50">



              Trainer



            </p>







            <p className="text-sm font-medium text-white">



              {trainer}



            </p>



          </div>







        </div>







        {/* DETAILS */}







        <div className="mt-5 grid grid-cols-2 gap-3">







          <DetailItem



            icon={<HiBookOpen />}



            label="Lessons"



            value={



              lessons



                ? lessons



                : "N/A"



            }



          />







          <DetailItem



            icon={<HiClock />}



            label="Duration"



            value={



              duration ||



              "Flexible"



            }



          />







          <DetailItem



            icon={<HiCalendar />}



            label="Start Date"



            value={



              startDate



                ? formatDate(



                    startDate



                  )



                : "N/A"



            }



          />







          <DetailItem



            icon={<HiClock />}



            label="Start Time"



            value={



              startTime ||



              "N/A"



            }



          />







        </div>







        {/* DAYS */}







        {days && (



          <div className="mt-4 flex items-center gap-2 text-sm text-white/70">







            <HiCalendar



              size={17}



              className="text-blue-400"



            />







            <span>



              {days}



            </span>







          </div>



        )}







        {/* LEVEL */}







        <div className="mt-3 flex items-center gap-2 text-sm text-white/70">







          <span className="text-blue-400">



            Level:



          </span>







          <span className="text-white">



            {level}



          </span>







        </div>







        {/* PRICE */}







        {price !== null &&



          price !== undefined &&



          price !== "" && (



            <div className="mt-4 text-xl font-bold text-white">



              ₹{price}



            </div>



          )}







        {/* RECORDING COUNT */}







        <div className="mt-4 flex items-center justify-between rounded-lg bg-white/[0.04] px-3 py-2">







          <span className="text-xs text-white/60">



            Available Recordings



          </span>







          <span className="font-semibold text-blue-300">



            {classRecordings.length}



          </span>







        </div>







        {/* BUTTON */}





{/*&#x20;

        <button

          type="button"

          onClick={(event) => {

            event.stopPropagation();

            onViewRecordings(classId, className);

          }}



          className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-sm font-semibold text-white transition hover:brightness-110"





        > */}



<button

  type="button"

  onClick={(event) => {

    event.stopPropagation();



    if (

      classId === null ||

      classId === undefined ||

      classId === ""

    ) {

      console.error("Class ID is missing:", classId);

      return;

    }



    navigate(`/institute/website/preview/lms/my-learning/${classId}`);

  }}

  className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-sm font-semibold text-white transition hover:brightness-110"

>

  <HiPlay className="text-lg" />

  {classRecordings.length > 0

    ? "View Recordings"

    : "Open My Learning"}

</button>

{/*&#x20;

          <HiPlay size={17} />







          {classRecordings.length >



          0



            ? "View Recordings"



            : "No Recordings Yet"} */}



{/*         </button> */}







      </div>



    </article>



  );



}







/* =========================================================



   DETAIL ITEM



\========================================================= */







function DetailItem({



  icon,



  label,



  value,



}) {



  return (



    <div className="rounded-lg bg-white/[0.03] p-3">







      <div className="flex items-center gap-2 text-xs text-white/50">



        <span className="text-blue-400">



          {icon}



        </span>







        {label}



      </div>







      <p className="mt-1 text-sm font-medium text-white">



        {value}



      </p>







    </div>



  );



}







/* =========================================================



   RECORDING CARD



\========================================================= */







function RecordingCard({



  recording,



  onPlay,



  onDownload,



}) {



  const initials =



    recording.trainer



      ? recording.trainer



          .split(" ")



          .filter(Boolean)



          .map(



            (word) =>



              word[0]



          )



          .join("")



          .slice(0, 2)



          .toUpperCase()



      : null;







  return (



    <article className="group overflow-hidden rounded-xl border border-white/10 bg-[#050505] transition duration-300 hover:-translate-y-1 hover:border-blue-500/40">







      <div className="relative h-[170px] overflow-hidden">







        {recording.image ? (



          <img



            src={resolveMediaUrl(



              recording.image



            )}



            alt={



              recording.title ||



              "Recording"



            }



            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"



          />



        ) : (



          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#17101E] via-[#0F1119] to-[#24102B]">



            <HiVideoCamera



              size={42}



              className="text-blue-400/40"



            />



          </div>



        )}







        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />







        <div className="absolute left-2 top-2 rounded-md bg-black/70 px-2 py-1 text-[10px] font-semibold uppercase text-blue-300">



          {recording.recordingType}



        </div>







      </div>







      <div className="p-4">







        <h3 className="min-h-[44px] text-[16px] font-bold leading-[22px] text-white">



          {recording.title}



        </h3>







        {recording.trainer && (



          <div className="mt-3 flex items-center gap-2">







            {recording.trainerImage ? (



              <img



                src={resolveMediaUrl(



                  recording.trainerImage



                )}



                alt={



                  recording.trainer



                }



                className="h-7 w-7 rounded-full object-cover"



              />



            ) : (



              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-500/15 text-[9px] font-bold text-blue-300">



                {initials || (



                  <HiUser size={14} />



                )}



              </div>



            )}







            <span className="text-[13px] text-white/75">



              {recording.trainer}



            </span>







          </div>



        )}







        <div className="mt-3">



          <span className="inline-flex rounded-full bg-[#492b58] px-3 py-1 text-[11px] text-[#ead9f2]">



            {recording.className}



          </span>



        </div>







        <div className="mt-4 flex items-center justify-between text-[11px] text-white">







          {recording.date ? (



            <span className="flex items-center gap-1.5">



              <HiCalendar size={15} />



              {formatDate(



                recording.date



              )}



            </span>



          ) : (



            <span />



          )}







          {recording.views !== null &&



            recording.views !== undefined && (



              <span className="flex items-center gap-1.5">



                <HiEye size={15} />



                {recording.views} views



              </span>



            )}







        </div>







        <div className="mt-4 flex gap-2">







          <button



            type="button"



            onClick={() =>



              onPlay(recording)



            }



            className="flex h-10 flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-[12px] font-semibold hover:brightness-110"



          >



            <HiPlay size={15} />



            Play Recording



          </button>







          {recording.downloadUrl && (



            <button



              type="button"



              onClick={() =>



                onDownload(



                  recording



                )



              }



              className="flex h-10 w-11 items-center justify-center rounded-lg border border-blue-500/50 bg-[#050505] hover:bg-blue-500/10"



              title="Download recording"



            >



              <HiDownload size={18} />



            </button>



          )}







        </div>







      </div>



    </article>



  );



}







/* =========================================================



   MAIN COMPONENT



\========================================================= */







export default function WebsiteRecordings() {



  const navigate = useNavigate();



  const [



    offlineClasses,



    setOfflineClasses,



  ] = useState([]);







  const [



    recordings,



    setRecordings,



  ] = useState([]);







  const [loading, setLoading] =



    useState(true);







  const [refreshing, setRefreshing] =



    useState(false);







  const [error, setError] =



    useState("");







  const [search, setSearch] =



    useState("");







  const [selectedClassId, setSelectedClassId] =



    useState("ALL");







  const [



    selectedRecording,



    setSelectedRecording,



  ] = useState(null);







  const [page, setPage] =



    useState(1);







  const pageSize = 8;







  /* =======================================================



     LOAD USER OFFLINE CLASSES + RECORDINGS



  ======================================================= */







  const loadData = async (



    isRefresh = false



  ) => {



    try {



      if (isRefresh) {



        setRefreshing(true);



      } else {



        setLoading(true);



      }







      setError("");







      const [



        classes,



        recordingData,



      ] = await Promise.all([



        fetchUserOfflineClasses(),



        fetchUserRecordings(),



      ]);







      const normalizedRecordings =



        recordingData.map(



          (item, index) =>



            normalizeRecording(



              item,



              index



            )



        );







      setOfflineClasses(



        classes



      );







      setRecordings(



        normalizedRecordings



      );







    } catch (err) {



      console.error(



        "RECORDINGS PAGE ERROR:",



        err



      );







      setOfflineClasses([]);



      setRecordings([]);







      setError(



        err?.response?.data



          ?.message ||



          err?.response?.data



            ?.error ||



          err?.message ||



          "Failed to load your offline classes."



      );



    } finally {



      setLoading(false);



      setRefreshing(false);



    }



  };







  useEffect(() => {



    loadData();



  }, []);







  /* =======================================================



     FILTER CLASSES



  ======================================================= */







  const filteredClasses =



    useMemo(() => {



      const query =



        search



          .trim()



          .toLowerCase();







      return offlineClasses.filter(



        (course) => {



          const classId =



            getClassId(course);







          const className =



            getClassName(course);







          const trainer =



            getTrainer(course);







          const category =



            getCategory(course);







          const matchesSearch =



            !query ||



            [



              className,



              trainer,



              category,



              getSubcategory(



                course



              ),



            ].some(



              (value) =>



                String(



                  value || ""



                )



                  .toLowerCase()



                  .includes(query)



            );







          const matchesClass =



            selectedClassId ===



              "ALL" ||



            String(classId) ===



              String(



                selectedClassId



              );







          return (



            matchesSearch &&



            matchesClass



          );



        }



      );



    }, [



      offlineClasses,



      search,



      selectedClassId,



    ]);







  /* =======================================================



     CLASS OPTIONS



  ======================================================= */







  const classOptions =



    useMemo(() => {



      return offlineClasses.map(



        (course) => ({



          id:



            getClassId(course),



          name:



            getClassName(course),



        })



      );



    }, [offlineClasses]);







  /* =======================================================



     PAGINATION



  ======================================================= */







  const totalPages =



    Math.max(



      1,



      Math.ceil(



        filteredClasses.length /



          pageSize



      )



    );







  const currentPage =



    Math.min(



      page,



      totalPages



    );







  const visibleClasses =



    filteredClasses.slice(



      (currentPage - 1) *



        pageSize,



      currentPage * pageSize



    );







  useEffect(() => {



    setPage(1);



  }, [



    search,



    selectedClassId,



  ]);







  /* =======================================================



     VIEW RECORDINGS



  ======================================================= */







//   const viewClassRecordings = (



//     classId,



//     className



//   ) => {



//     setSelectedClassId(



//       classId ??



//         "ALL"



//     );







//     setSearch(



//       className || ""



//     );







//     setTimeout(() => {



//       document



//         .getElementById(



//           "recordings-section"



//         )



//         ?.scrollIntoView({



//           behavior:



//             "smooth",



//           block: "start",



//         });



//     }, 100);



//   };



const viewClassRecordings = (classId) => {

  if (

    classId === null ||

    classId === undefined ||

    classId === ""

  ) {

    console.error(

      "Cannot navigate: class ID is missing",

      classId

    );

    return;

  }



  console.log(

    "Navigating to My Learning:",

    `/my-learning/${classId}`

  );



  navigate(`/institute/website/preview/lms/my-learning/${classId}`);

};



  /* =======================================================



     SELECTED CLASS RECORDINGS



  ======================================================= */







  const selectedClassRecordings =



    useMemo(() => {



      if (



        selectedClassId ===



        "ALL"



      ) {



        return [];



      }







      const selectedClass =



        offlineClasses.find(



          (course) =>



            String(



              getClassId(course)



            ) ===



            String(



              selectedClassId



            )



        );







      if (!selectedClass) {



        return [];



      }







      const classId =



        getClassId(



          selectedClass



        );







      const className =



        getClassName(



          selectedClass



        );







      return recordings.filter(



        (recording) => {



          if (



            recording.classId !==



              null &&



            recording.classId !==



              undefined &&



            classId !== null &&



            classId !== undefined



          ) {



            return (



              String(



                recording.classId



              ) ===



              String(classId)



            );



          }







          return (



            String(



              recording.className ||



                ""



            )



              .trim()



              .toLowerCase() ===



            String(



              className || ""



            )



              .trim()



              .toLowerCase()



          );



        }



      );



    }, [



      selectedClassId,



      offlineClasses,



      recordings,



    ]);







  /* =======================================================



     PLAY RECORDING



  ======================================================= */







  const openRecording = (



    recording



  ) => {



    if (!recording?.url) {



      return;



    }







    setSelectedRecording(



      recording



    );







    setTimeout(() => {



      document



        .getElementById(



          "recording-player"



        )



        ?.scrollIntoView({



          behavior:



            "smooth",



          block: "start",



        });



    }, 50);



  };







  /* =======================================================



     CLOSE PLAYER



  ======================================================= */







  const closeRecording = () => {



    setSelectedRecording(



      null



    );



  };







  /* =======================================================



     DOWNLOAD



  ======================================================= */







  const downloadRecording =



    async (recording) => {



      const url =



        recording?.downloadUrl;







      if (!url) {



        alert(



          "Download is not available for this recording."



        );



        return;



      }







      try {



        const response =



          await fetch(url);







        if (!response.ok) {



          throw new Error(



            `Download failed: ${response.status}`



          );



        }







        const blob =



          await response.blob();







        const blobUrl =



          window.URL.createObjectURL(



            blob



          );







        const anchor =



          document.createElement(



            "a"



          );







        anchor.href =



          blobUrl;







        anchor.download =



          `${



            recording.title ||



            "recording"



          }.mp4`;







        document.body.appendChild(



          anchor



        );







        anchor.click();







        anchor.remove();







        window.URL.revokeObjectURL(



          blobUrl



        );



      } catch (err) {



        console.error(



          "DOWNLOAD ERROR:",



          err



        );







        alert(



          "This recording cannot be downloaded."



        );



      }



    };







  /* =======================================================



     LOADING



  ======================================================= */







  if (loading) {



    return (



      <State



        title="Loading Your Classes..."



        icon={



          <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-blue-500" />



        }



      />



    );



  }







  /* =======================================================



     ERROR



  ======================================================= */







  if (



    error &&



    offlineClasses.length === 0



  ) {



    return (



      <div className="min-h-screen bg-black text-white">



        <State



          title="Unable to Load Classes"



          message={error}



          icon={



            <HiBookOpen



              size={38}



            />



          }



        />







        <div className="flex justify-center pb-10">



          <button



            type="button"



            onClick={() =>



              loadData(true)



            }



            className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3 text-sm font-semibold"



          >



            Try Again



          </button>



        </div>



      </div>



    );



  }







  /* =======================================================



     UI



  ======================================================= */







  return (



    <div className="min-h-screen bg-black text-white">







      <main className="mx-auto max-w-[1600px] px-5 py-7 xl:px-8">







        {/* =================================================



            HEADER



        ================================================= */}







        <div className="mb-7 flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">







          <div>







            <h1 className="text-[40px] font-bold leading-none tracking-tight">







              My{" "}







              <span className="bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent">



                Offline Classes



              </span>







            </h1>







            <p className="mt-3 text-[17px] text-white">



              Your booked offline classes and recordings.



            </p>







            <p className="mt-2 text-sm text-white/70">



              {offlineClasses.length} offline class



              {offlineClasses.length !==



              1



                ? "es"



                : ""}{" "}



              booked



            </p>







          </div>







          {/* SEARCH + FILTER */}







          <div className="grid w-full gap-3 sm:grid-cols-[minmax(260px,1fr)_220px] xl:w-auto">







            <div className="relative">







              <HiSearch



                size={22}



                className="absolute left-4 top-1/2 -translate-y-1/2 text-white"



              />







              <input



                value={search}



                onChange={(event) =>



                  setSearch(



                    event.target



                      .value



                  )



                }



                placeholder="Search offline classes..."



                className="h-12 w-full rounded-xl border border-white/10 bg-[#050505] pl-11 pr-4 text-sm text-white outline-none placeholder:text-white focus:border-blue-500/60"



              />







            </div>







            <div className="relative">







              <select



                value={



                  selectedClassId



                }



                onChange={(



                  event



                ) =>



                  setSelectedClassId(



                    event.target



                      .value



                  )



                }



                className="h-12 w-full appearance-none rounded-xl border border-white/10 bg-[#050505] px-4 pr-10 text-sm text-white outline-none focus:border-blue-500/60"



              >







                <option



                  value="ALL"



                  className="bg-[#050505]"



                >



                  All Classes



                </option>







                {classOptions.map(



                  (option) => (



                    <option



                      key={



                        option.id



                      }



                      value={



                        option.id



                      }



                      className="bg-[#050505]"



                    >



                      {



                        option.name



                      }



                    </option>



                  )



                )}







              </select>







              <HiChevronDown



                size={18}



                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white"



              />







            </div>







          </div>







        </div>







        {/* =================================================



            OFFLINE CLASS CARDS



        ================================================= */}







        {visibleClasses.length >



        0 ? (



          <section>







            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">







              {visibleClasses.map(



                (



                  course,



                  index



                ) => (



                  <OfflineClassCard



                    key={



                      getClassId(



                        course



                      ) ??



                      index



                    }



                    course={



                      course



                    }



                    recordings={



                      recordings



                    }



                    onViewRecordings={



                      viewClassRecordings



                    }



                  />



                )



              )}







            </div>







            {/* PAGINATION */}







            {filteredClasses.length >



              pageSize && (



              <div className="mt-7 flex items-center justify-center gap-2">







                <PageButton



                  disabled={



                    currentPage ===



                    1



                  }



                  onClick={() =>



                    setPage(



                      (value) =>



                        Math.max(



                          1,



                          value -



                            1



                        )



                    )



                  }



                >



                  <HiChevronLeft />



                </PageButton>







                {Array.from(



                  {



                    length:



                      totalPages,



                  },



                  (



                    _,



                    index



                  ) =>



                    index + 1



                ).map(



                  (number) => (



                    <PageButton



                      key={



                        number



                      }



                      active={



                        currentPage ===



                        number



                      }



                      onClick={() =>



                        setPage(



                          number



                        )



                      }



                    >



                      {



                        number



                      }



                    </PageButton>



                  )



                )}







                <PageButton



                  disabled={



                    currentPage ===



                    totalPages



                  }



                  onClick={() =>



                    setPage(



                      (value) =>



                        Math.min(



                          totalPages,



                          value +



                            1



                        )



                    )



                  }



                >



                  <HiChevronRight />



                </PageButton>







              </div>



            )}







          </section>



        ) : (







          <div className="flex min-h-[350px] items-center justify-center rounded-2xl border border-white/10 bg-[#050505]">







            <div className="max-w-md px-6 text-center">







              <HiBookOpen



                size={50}



                className="mx-auto text-blue-400"



              />







              <h3 className="mt-4 text-lg font-semibold">



                No Offline Classes Found



              </h3>







              <p className="mt-2 text-sm text-white/60">



                You don't have any booked offline classes matching your search.



              </p>







              {(search ||



                selectedClassId !==



                  "ALL") && (



                <button



                  type="button"



                  onClick={() => {



                    setSearch(



                      ""



                    );







                    setSelectedClassId(



                      "ALL"



                    );



                  }}



                  className="mt-5 rounded-xl border border-blue-500/40 px-5 py-2.5 text-sm text-blue-300 hover:bg-blue-500/10"



                >



                  Clear Filters



                </button>



              )}







            </div>







          </div>







        )}







        {/* =================================================



            RECORDINGS SECTION



        ================================================= */}







        {selectedClassId !==



          "ALL" && (



          <section



            id="recordings-section"



            className="mt-12"



          >







            <div className="mb-5 flex items-center justify-between">







              <div>







                <h2 className="text-2xl font-bold">



                  Class Recordings



                </h2>







                <p className="mt-1 text-sm text-white/60">



                  Recordings available for this offline class.



                </p>







              </div>







              <button



                type="button"



                onClick={() => {



                  setSelectedClassId(



                    "ALL"



                  );







                  setSelectedRecording(



                    null



                  );



                }}



                className="rounded-lg border border-white/10 px-4 py-2 text-sm text-white hover:bg-white/5"



              >



                Show All Classes



              </button>







            </div>







            {selectedRecording && (



              <section



                id="recording-player"



                className="mb-8 overflow-hidden rounded-2xl border border-blue-500/30 bg-[#0b0c12] shadow-2xl"



              >







                <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">







                  <div>







                    <h2 className="text-lg font-bold">



                      {



                        selectedRecording.title



                      }



                    </h2>







                    <p className="mt-1 text-xs text-white/60">



                      {



                        selectedRecording.className



                      }



                    </p>







                  </div>







                  <button



                    type="button"



                    onClick={



                      closeRecording



                    }



                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5"



                  >



                    <HiX size={20} />



                  </button>







                </div>







                <div className="w-full bg-black">







                  {selectedRecording.url?.includes(



                    "youtube.com"



                  ) ||



                  selectedRecording.url?.includes(



                    "youtu.be"



                  ) ? (







                    <iframe



                      src={



                        selectedRecording.url



                          .replace(



                            "watch?v=",



                            "embed/"



                          )



                      }



                      title={



                        selectedRecording.title



                      }



                      className="aspect-video w-full"



                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"



                      allowFullScreen



                    />







                  ) : (







                    <video



                      src={



                        selectedRecording.url



                      }



                      controls



                      autoPlay



                      playsInline



                      className="aspect-video w-full bg-black object-contain"



                    >



                      Your browser does not support video playback.



                    </video>







                  )}







                </div>







              </section>



            )}







            {selectedClassRecordings.length >



            0 ? (







              <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">







                {selectedClassRecordings.map(



                  (



                    recording



                  ) => (



                    <RecordingCard



                      key={



                        recording.id



                      }



                      recording={



                        recording



                      }



                      onPlay={



                        openRecording



                      }



                      onDownload={



                        downloadRecording



                      }



                    />



                  )



                )}







              </div>







            ) : (







              <div className="flex min-h-[280px] items-center justify-center rounded-2xl border border-white/10 bg-[#050505]">







                <div className="text-center">







                  <HiVideoCamera



                    size={48}



                    className="mx-auto text-white/40"



                  />







                  <h3 className="mt-4 text-lg font-semibold">



                    No Recordings Yet



                  </h3>







                  <p className="mt-2 text-sm text-white/60">



                    Recordings for this class will appear here when available.



                  </p>







                </div>







              </div>







            )}







          </section>



        )}







        {/* REFRESH */}







        <div className="mt-8 flex justify-center">







          <button



            type="button"



            onClick={() =>



              loadData(true)



            }



            disabled={



              refreshing



            }



            className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#050505] px-5 py-3 text-sm font-semibold text-white hover:border-blue-500/40"



          >







            <HiRefresh



              className={



                refreshing



                  ? "animate-spin"



                  : ""



              }



            />







            Refresh Classes







          </button>







        </div>







      </main>







    </div>



  );



}







/* =========================================================



   PAGE BUTTON



\========================================================= */







function PageButton({



  children,



  active,



  disabled,



  onClick,



}) {



  return (



    <button



      type="button"



      disabled={disabled}



      onClick={onClick}



      className={`flex h-10 min-w-10 items-center justify-center rounded-lg border px-3 text-sm transition ${



        active



          ? "border-transparent bg-gradient-to-r from-[#8d22ed] to-[#d82be9] text-white"



          : "border-white/10 bg-[#050505] text-white hover:border-blue-500/40"



      } ${



        disabled



          ? "cursor-not-allowed opacity-30"



          : ""



      }`}



    >



      {children}



    </button>



  );



}







/* =========================================================



   STATE



\========================================================= */







function State({



  icon,



  title,



  message,



}) {



  return (



    <div className="flex min-h-screen items-center justify-center bg-black px-5 text-white">







      <div className="max-w-md text-center">







        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-blue-500/10 text-blue-400">



          {icon}



        </div>







        <h1 className="mt-6 text-3xl font-bold">



          {title}



        </h1>







        {message && (



          <p className="mt-4 text-white/70">



            {message}



          </p>



        )}







      </div>







    </div>



  );



}