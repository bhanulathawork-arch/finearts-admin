

import { useEffect, useMemo, useState } from "react";

import { getAuth } from "firebase/auth";

import { BookOpen, Search, Video, RefreshCw } from "lucide-react";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import API from "../services/api";



/* =========================================================

   AUTH CONFIG

========================================================= */



const getAuthConfig = async () => {

  let token = localStorage.getItem("token");



  try {

    const auth = getAuth();



    if (auth.currentUser) {

      token = await auth.currentUser.getIdToken(true);

    }

  } catch (error) {

    console.warn("Firebase token error:", error);

  }



  return {

    headers: token

      ? {

          Authorization: `Bearer ${token}`,

        }

      : {},

  };

};



/* =========================================================

   NORMALIZE API RESPONSE

========================================================= */



const normalizeClasses = (payload) => {

  const root = payload?.data ?? payload ?? {};



  const data =

    root?.classes ??

    root?.data?.classes ??

    root?.rows ??

    root?.data ??

    root;



  return Array.isArray(data) ? data : [];

};



/* =========================================================

   SAFE TEXT

========================================================= */



const safeText = (value, fallback = "") => {

  if (value === null || value === undefined) {

    return fallback;

  }



  if (value instanceof RegExp) {

    return value.toString();

  }



  if (typeof value === "object") {

    if (value.name !== undefined && value.name !== null) {

      return String(value.name);

    }



    if (value.full_name !== undefined && value.full_name !== null) {

      return String(value.full_name);

    }



    return fallback;

  }



  return String(value);

};



/* =========================================================

   CLASS TYPE

========================================================= */



const getClassType = (item) => {

  const value =

    item?.class_type ??

    item?.classType ??

    item?.type ??

    item?.content_type ??

    item?.contentType ??

    "LIVE";



  const normalized = safeText(value, "LIVE")

    .trim()

    .toUpperCase();



  /*

    Support old database/API value RECORDED.



    Current standard:

    LIVE

    RECORDING

  */



  if (

    normalized === "RECORDING" ||

    normalized === "RECORDED" ||

    normalized === "RECORDING CLASS" ||

    normalized.includes("RECORD")

  ) {

    return "RECORDING";

  }



  if (

    normalized === "LIVE" ||

    normalized === "LIVE CLASS" ||

    normalized.includes("LIVE")

  ) {

    return "LIVE";

  }



  return normalized || "LIVE";

};



/* =========================================================

   CATEGORY NAME

========================================================= */



const getCategoryName = (item) => {

  const value =

    item?.category_name ??

    item?.categoryName ??

    item?.category?.name ??

    item?.category ??

    "General";



  return safeText(value, "General");

};



/* =========================================================

   CLASS TITLE

========================================================= */



/* =========================================================
   TRAINER NAME
========================================================= */

const getTrainerName = (item) => {
  const value =
    item?.trainer_name ??
    item?.trainerName ??
    item?.assigned_trainer_name ??
    item?.assignedTrainerName ??
    item?.trainer_full_name ??
    item?.trainerFullName ??
    item?.trainer?.full_name ??
    item?.trainer?.fullName ??
    item?.trainer?.name ??
    item?.assigned_trainer?.full_name ??
    item?.assigned_trainer?.name ??
    item?.instructor_name ??
    item?.instructorName ??
    item?.instructor?.name ??
    item?.trainer;

  return safeText(value, "Trainer not assigned");
};

const getClassTitle = (item) => {

  const value = item?.title ?? item?.name ?? "Untitled Class";



  return safeText(value, "Untitled Class");

};



/* =========================================================

   IMAGE

========================================================= */



const getImage = (item) => {

  const value =

    item?.image ??

    item?.image_url ??

    item?.imageUrl ??

    item?.thumbnail ??

    item?.thumbnail_url ??

    "";



  /*

    Never use an object or RegExp as an image src.

  */



  if (value instanceof RegExp) {

    return "";

  }



  if (typeof value === "object") {

    return "";

  }



  return String(value || "");

};



/* =========================================================

   CLASS ID

========================================================= */



const getClassId = (item) => {

  if (!item || typeof item !== "object") {

    return "";

  }



  const value =

    item?.id ??

    item?.class_id ??

    item?.classId ??

    "";



  if (

    value === null ||

    value === undefined ||

    value === ""

  ) {

    return "";

  }



  /*

    Very important:

    Never allow an object to become [object Object]

    inside the URL.

  */



  if (typeof value === "object") {

    if (

      value.id !== undefined &&

      value.id !== null &&

      value.id !== ""

    ) {

      return String(value.id);

    }



    return "";

  }



  const stringValue = String(value).trim();



  if (!stringValue) {

    return "";

  }



  return stringValue;

};



/* =========================================================

   COMPONENT

========================================================= */



export default function InstituteRecordings() {

  const navigate = useNavigate();



  const [classes, setClasses] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);



  /* =======================================================

     FETCH RECORDING CLASSES

  ======================================================= */



  const fetchClasses = async () => {

    try {

      setLoading(true);



      const authConfig = await getAuthConfig();



      const response = await API.get(

        "/classes/institute/my-classes",

        authConfig

      );



      console.log(

        "INSTITUTE RECORDING CLASSES RESPONSE:",

        response.data

      );



      const allClasses = normalizeClasses(response.data);



      console.log(

        "ALL INSTITUTE CLASSES:",

        allClasses

      );



      /*

        CURRENT CLASS TYPE:



        LIVE

        RECORDING



        We also support old RECORDED values

        through getClassType().

      */



      const recordingClasses = allClasses.filter(

        (item) => getClassType(item) === "RECORDING"

      );



      console.log(

        "FILTERED RECORDING CLASSES:",

        recordingClasses

      );



      setClasses(recordingClasses);

    } catch (error) {

      console.error(

        "FETCH RECORDING CLASSES ERROR:",

        error

      );



      console.error(

        "FETCH RECORDING CLASSES RESPONSE:",

        error?.response?.data

      );



      toast.error(

        error?.response?.data?.message ||

          "Failed to load recording classes."

      );



      setClasses([]);

    } finally {

      setLoading(false);

    }

  };



  /* =======================================================

     INITIAL LOAD

  ======================================================= */



  useEffect(() => {

    fetchClasses();

  }, []);



  /* =======================================================

     SEARCH FILTER

  ======================================================= */



  const filteredClasses = useMemo(() => {

    const query = search.trim().toLowerCase();



    if (!query) {

      return classes;

    }



    return classes.filter((item) => {

      const title = getClassTitle(item).toLowerCase();



      const category = getCategoryName(item).toLowerCase();



      const trainer = getTrainerName(item).toLowerCase();

      return (
        title.includes(query) ||
        category.includes(query) ||
        trainer.includes(query)
      );

    });

  }, [classes, search]);



  /* =======================================================

     OPEN LMS

  ======================================================= */



  const openLMS = (classItem) => {

    const classId = getClassId(classItem);



    console.log(

      "OPEN LMS CLASS ITEM:",

      classItem

    );



    console.log(

      "OPEN LMS CLASS ID:",

      classId

    );



    if (!classId) {

      toast.error("Class ID not found.");

      return;

    }



    /*

      classId is guaranteed to be a string.

      This prevents:



      /api/[object Object]

    */



    navigate(

      `/institute/lms/${encodeURIComponent(classId)}`

    );

  };



  /* =======================================================

     RENDER

  ======================================================= */



  return (

    <div className="w-full bg-[#07070b] p-0 text-white">

      <div className="mx-0 w-full max-w-none">



        {/* =================================================

            HEADER

        ================================================= */}



        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">



          <div>

            <h1 className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-500 bg-clip-text text-4xl font-extrabold text-transparent sm:text-4xl">

              Recording Classes

            </h1>



            <p className="mt-2 text-sm text-white sm:text-base">

              Manage your recorded classes and open their LMS.

            </p>

          </div>



          <button

            type="button"

            onClick={fetchClasses}

            disabled={loading}

            className="flex h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 font-semibold text-white transition hover:bg-white/10 disabled:opacity-50"

          >

            <RefreshCw

              size={17}

              className={

                loading

                  ? "animate-spin"

                  : ""

              }

            />



            Refresh

          </button>

        </div>



        {/* =================================================

            SEARCH

        ================================================= */}



        <div className="mb-5 bg-transparent p-0">

          <div className="relative">



            <Search

              size={20}

              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white"

            />



            <input

              type="text"

              value={search}

              onChange={(event) =>

                setSearch(event.target.value)

              }

              placeholder="Search recording classes..."

              className="h-14 w-full rounded-xl border border-white/10 bg-[#15121f] pl-12 pr-4 text-white outline-none placeholder:text-white transition focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/10"

            />



          </div>

        </div>



        {/* =================================================

            COUNT

        ================================================= */}



        {!loading && (

          <div className="mb-5 text-sm font-semibold text-white/70">

            {filteredClasses.length} recording{" "}

            {filteredClasses.length === 1

              ? "class"

              : "classes"}

          </div>

        )}



        {/* =================================================

            LOADING

        ================================================= */}



        {loading && (

          <div className="py-20 text-center text-white">

            Loading recording classes...

          </div>

        )}



        {/* =================================================

            EMPTY

        ================================================= */}



        {!loading &&

          filteredClasses.length === 0 && (

            <div className="rounded-2xl border border-white/10 bg-[#101019] py-20 text-center">



              <Video

                size={42}

                className="mx-auto mb-4 text-white"

              />



              <h3 className="text-lg font-bold text-white">

                No recording classes found

              </h3>



              <p className="mt-2 text-sm text-white">

                {search

                  ? "Try a different search."

                  : "You do not have any recording classes yet."}

              </p>



            </div>

          )}



        {/* =================================================

            CLASS CARDS

        ================================================= */}



        {!loading &&

          filteredClasses.length > 0 && (

            <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3">



              {filteredClasses.map(

                (item, index) => {

                  const classId =

                    getClassId(item);



                  /*

                    Use class ID as primary key.

                    Use index only as final fallback.

                  */



                  const cardKey =

                    classId ||

                    `recording-class-${index}`;



                  const title =

                    getClassTitle(item);



                  const image =

                    getImage(item);



                  const category =

                    getCategoryName(item);



                  return (

                    <div

                      key={cardKey}

                      className="flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#111118] shadow-xl transition duration-300 hover:-translate-y-1 hover:border-pink-500/30"

                    >



                      {/* ===================================

                          IMAGE

                      =================================== */}



                      <div className="relative h-40 w-full shrink-0 overflow-hidden bg-[#191523]">



                        {image ? (

                          <img

                            src={image}

                            alt={title}

                            className="h-full w-full object-cover"

                            onError={(event) => {

                              event.currentTarget.style.display =

                                "none";

                            }}

                          />

                        ) : (

                          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-purple-900/40 via-[#191523] to-pink-900/30">



                            <BookOpen

                              size={48}

                              className="text-purple-300/50"

                            />



                          </div>

                        )}



                        {/* RECORDING BADGE */}



                        <div className="absolute left-3 top-3 rounded-lg border border-pink-400/20 bg-black/60 px-3 py-1.5 text-xs font-bold text-pink-300 backdrop-blur">

                          RECORDING

                        </div>



                      </div>



                      {/* ===================================

                          CONTENT

                      =================================== */}



                      <div className="flex flex-1 flex-col p-5">



                        {/* TITLE */}



                        <h3 className="min-h-[28px] truncate text-lg font-bold leading-7 text-white">

                          {title}

                        </h3>



                        {/* CATEGORY */}



                        <div className="mt-4 flex items-center justify-between gap-4">



                          <p className="text-xs font-semibold uppercase tracking-wider text-white">

                            Category

                          </p>



                          <p className="truncate text-sm font-semibold text-white">

                            {category}

                          </p>



                        </div>



                        {/* TRAINER NAME */}

                        <div className="mt-3 flex items-center justify-between gap-4">
                          <p className="text-xs font-semibold uppercase tracking-wider text-white">
                            Trainer
                          </p>
                          <p
                            className="min-w-0 truncate text-right text-sm font-semibold text-white"
                            title={getTrainerName(item)}
                          >
                            {getTrainerName(item)}
                          </p>
                        </div>

                        {/* OPEN LMS */}



                        <div className="mt-auto pt-5">



                          <button

                            type="button"

                            onClick={() =>

                              openLMS(item)

                            }

                            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl font-bold text-white transition hover:scale-[1.01]"

                            style={{

                              background:

                                "linear-gradient(135deg,#9b2cff,#ff2aae)",

                            }}

                          >

                            <BookOpen size={18} />



                            Open LMS

                          </button>



                        </div>



                      </div>



                    </div>

                  );

                }

              )}



            </div>

          )}



      </div>

    </div>

  );

}
