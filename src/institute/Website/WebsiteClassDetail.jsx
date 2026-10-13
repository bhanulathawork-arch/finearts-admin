

import {

  useEffect,

  useMemo,

  useState,

} from "react";

import {

  useNavigate,

  useOutletContext,

  useParams,

} from "react-router-dom";

import {

  FaArrowLeft,

  FaArrowRight,

  FaCalendarAlt,

  FaCalendarWeek,

  FaClock,

  FaUser,

  FaUsers,

  FaChartBar,

} from "react-icons/fa";

import { getClassById } from "../../services/Classes.js";

import WebsiteBooking from "./WebsiteBooking";

/* =========================================================

   BLACK + RADIANT BLUE

   CLASS DETAIL PAGE

   ROW 1

   LEFT  = CLASS IMAGE

   RIGHT = CLASS INFORMATION

   ROW 2

   CLASS NAME + PRICE + BOOK NOW

   ROW 3

   LEFT  = AVAILABLE DAYS

   RIGHT = TRAINER

\========================================================= */

/* =========================================================

   DEFAULT BRANDING

\========================================================= */

const DEFAULT_BRANDING = {

  fontHeading: "Inter",

  fontBody: "Inter",

  headingWeight: 700,

  bodyWeight: 400,

  roundedButtons: true,

};

/* =========================================================

   GENERAL HELPERS

\========================================================= */

const getValue = (...values) => {

  for (const value of values) {

    if (

      value !== undefined &&

      value !== null &&

      value !== ""

    ) {

      return value;

    }

  }

  return null;

};

const fontFamily = (font) =>

  font

    ? `'${font}', sans-serif`

    : "Inter, sans-serif";

/* =========================================================

   BRANDING

\========================================================= */

const normalizeBranding = (

  branding = {}

) => ({

  ...DEFAULT_BRANDING,

  ...branding,

  fontHeading: getValue(

    branding?.fontHeading,

    branding?.font_heading,

    DEFAULT_BRANDING.fontHeading

  ),

  fontBody: getValue(

    branding?.fontBody,

    branding?.font_body,

    DEFAULT_BRANDING.fontBody

  ),

  headingWeight: getValue(

    branding?.headingWeight,

    branding?.heading_weight,

    DEFAULT_BRANDING.headingWeight

  ),

  bodyWeight: getValue(

    branding?.bodyWeight,

    branding?.body_weight,

    DEFAULT_BRANDING.bodyWeight

  ),

});

/* =========================================================

   CLASS HELPERS

\========================================================= */

const getClassTitle = (data) =>

  getValue(

    data?.title,

    data?.class_title,

    data?.className,

    data?.name,

    "Class"

  );

const getClassImage = (data) =>

  getValue(

    data?.image,

    data?.image_url,

    data?.class_image,

    data?.class_image_url,

    data?.thumbnail,

    data?.thumbnail_url,

    data?.banner_image,

    ""

  );

const getCategory = (data) =>
  getValue(
    data?.category_name,
    data?.categoryName,
    data?.category?.name,
    data?.category?.title,
    data?.category
  ) || "--";

const getSubcategory = (data) =>
  getValue(
    data?.subcategory_name,
    data?.subcategoryName,
    data?.subcategory?.name,
    data?.subcategory?.title,
    data?.subcategory
  ) || "--";

const getClassType = (data) =>
  getValue(
    data?.class_type,
    data?.classType,
    data?.class_type_name,
    data?.classTypeName,
    data?.delivery_type,
    data?.deliveryType,
    data?.session_type,
    data?.sessionType,
    data?.mode,
    data?.type
  ) || "--";

const getTrainerReviews = (data) =>
  Number(
    getValue(
      data?.trainer_total_reviews,
      data?.trainerTotalReviews,
      data?.trainer?.total_reviews,
      data?.trainer?.totalReviews,
      data?.trainer?.reviews_count,
      data?.reviews_count,
      data?.total_reviews,
      data?.reviews,
      0
    )
  ) || 0;

const getDuration = (data) =>

  getValue(

    data?.duration,

    data?.class_duration,

    data?.duration_minutes,

    "--"

  );

const getLevel = (data) =>

  getValue(

    data?.level,

    data?.class_level,

    data?.difficulty,

    "All Levels"

  );

const getStudents = (data) =>

  Number(

    getValue(

      data?.students,

      data?.students_count,

      data?.total_students,

      0

    )

  ) || 0;

const getPrice = (data) =>

  Number(

    getValue(

      data?.price,

      data?.class_price,

      data?.monthly_price,

      0

    )

  ) || 0;

/* =========================================================

   TRAINER HELPERS

\========================================================= */

const getTrainerId = (data) =>

  getValue(

    data?.trainer_id,

    data?.trainerId,

    data?.trainer?.id,

    data?.trainer?.trainer_id,

    null

  );

const getTrainerName = (data) =>

  getValue(

    data?.trainer_name,

    data?.trainerName,

    data?.trainer?.full_name,

    data?.trainer?.name,

    "Trainer"

  );

const getTrainerImage = (data) =>

  getValue(

    data?.trainer_image,

    data?.trainerImage,

    data?.trainer?.profile_image,

    data?.trainer?.image,

    data?.trainer?.image_url,

    ""

  );

const getTrainerRating = (data) =>

  Number(

    getValue(

      data?.trainer_rating,

      data?.trainerRating,

      data?.trainer?.rating,

      data?.rating,

      0

    )

  ) || 0;

/* =========================================================

   AVAILABLE DAYS

\========================================================= */

const getAvailableDays = (data) => {

  const days = getValue(

    data?.available_days,

    data?.availableDays,

    data?.days,

    data?.schedule_days

  );

  if (Array.isArray(days)) {

    return days;

  }

  if (typeof days === "string") {

    return days

      .split(",")

      .map((day) => day.trim())

      .filter(Boolean);

  }

  return [];

};

/* =========================================================

   DATE FORMAT

\========================================================= */

const formatDate = (value) => {

  if (!value) {

    return "--";

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

   TIME FORMAT

\========================================================= */

const formatTime = (value) => {

  if (!value) {

    return "--";

  }

  const text = String(value);

  if (/am|pm/i.test(text)) {

    return text;

  }

  const [

    hoursRaw,

    minutesRaw,

  ] = text.split(":");

  const hours = Number(hoursRaw);

  const minutes = Number(minutesRaw);

  if (

    Number.isNaN(hours) ||

    Number.isNaN(minutes)

  ) {

    return text;

  }

  const period =

    hours >= 12

      ? "PM"

      : "AM";

  const hour =

    hours % 12 || 12;

  return `${hour}:${String(

    minutes

  ).padStart(2, "0")} ${period}`;

};

/* =========================================================

   HEX → RGBA

\========================================================= */

const hexToRgba = (

  hex,

  alpha = 1

) => {

  if (

    typeof hex !== "string"

  ) {

    return hex;

  }

  const clean =

    hex.replace("#", "");

  if (

    !/^[0-9a-fA-F]{6}$/.test(

      clean

    )

  ) {

    return hex;

  }

  const r = parseInt(

    clean.slice(0, 2),

    16

  );

  const g = parseInt(

    clean.slice(2, 4),

    16

  );

  const b = parseInt(

    clean.slice(4, 6),

    16

  );

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;

};

/* =========================================================

   STAR RATING

\========================================================= */

const StarRating = ({

  rating,

}) => {

  const value = Math.max(

    0,

    Math.min(

      5,

      Number(rating) || 0

    )

  );

  return (

    <div className="flex items-center gap-3">

      <div

        className="text-xl tracking-[2px]"

        aria-label={`Rating ${value.toFixed(

          1

        )} out of 5`}

      >

        {[1, 2, 3, 4, 5].map(

          (star) => (

            <span

              key={star}

              className={

                star <=

                Math.round(value)

                  ? "text-yellow-400"

                  : "text-white/20"

              }

              style={{

                textShadow:

                  star <=

                  Math.round(

                    value

                  )

                    ? "0 0 10px rgba(250,204,21,0.35)"

                    : "none",

              }}

            >

              ★

            </span>

          )

        )}

      </div>

      <span className="text-lg font-bold text-white">

        {value.toFixed(1)}

      </span>

    </div>

  );

};

/* =========================================================

   DETAIL ITEM

\========================================================= */

const DetailItem = ({

  icon: Icon,

  label,

  value,

}) => (

  <div

    className="

      group

      flex

      items-center

      gap-4

      rounded-lg

      border

      px-5

      py-4

      transition-all

      duration-300

      hover:-translate-y-0.5

    "

    style={{

      borderColor:

        "rgba(0,140,255,0.28)",

      background:

        "linear-gradient(145deg,rgba(0,140,255,0.055),rgba(0,0,0,0.30))",

      boxShadow:

        "0 0 18px rgba(0,110,255,0.06)",

    }}

  >

    <div

      className="

        flex

        h-12

        w-12

        shrink-0

        items-center

        justify-center

        rounded-lg

      "

      style={{

        background:

          "linear-gradient(135deg,rgba(0,140,255,0.16),rgba(0,198,255,0.05))",

        color:

          "#38BDF8",

        boxShadow:

          "0 0 18px rgba(0,140,255,0.10)",

      }}

    >

      <Icon size={22} />

    </div>

    <div className="min-w-0">

      <p

        className="text-sm"

        style={{

          color:

            "#94A3B8",

        }}

      >

        {label}

      </p>

      <p

        className="

          mt-1

          truncate

          text-lg

          font-bold

        "

        style={{

          color:

            "#F8FAFC",

        }}

      >

        {value || "--"}

      </p>

    </div>

  </div>

);

/* =========================================================

   MAIN COMPONENT

\========================================================= */

const WebsiteClassDetail = () => {

  const {

    classId,

  } = useParams();

  const navigate =

    useNavigate();

  const outletContext =

    useOutletContext() || {};

  /* =======================================================

     BRANDING

  ======================================================= */

  const branding =

    useMemo(

      () =>

        normalizeBranding(

          outletContext?.branding ||

            outletContext?.websiteBranding ||

            outletContext?.brand ||

            {}

        ),

      [

        outletContext?.branding,

        outletContext?.websiteBranding,

        outletContext?.brand,

      ]

    );

  /* =======================================================

     STATE

  ======================================================= */

  const [

    classData,

    setClassData,

  ] = useState(null);

  const [

    loading,

    setLoading,

  ] = useState(true);

  const [

    error,

    setError,

  ] = useState("");

  const [

    showBooking,

    setShowBooking,

  ] = useState(false);

  /* =======================================================

     FETCH CLASS

  ======================================================= */

  useEffect(() => {

    let mounted = true;

    const fetchClass =

      async () => {

        if (!classId) {

          setError(

            "Class ID is missing."

          );

          setLoading(false);

          return;

        }

        try {

          setLoading(true);

          setError("");

          const response =

            await getClassById(

              classId

            );

          let data =

            response?.data?.data ??

            response?.data?.class ??

            response?.data ??

            response?.class ??

            response;

          if (

            data?.data &&

            typeof data.data ===

              "object"

          ) {

            data =

              data.data;

          }

          if (

            !data ||

            typeof data !==

              "object"

          ) {

            throw new Error(

              "Class data was not returned by the server."

            );

          }

          if (mounted) {

            setClassData(data);

          }

        } catch (err) {

          console.error(

            "CLASS DETAIL ERROR:",

            err

          );

          if (mounted) {

            setError(

              err?.response

                ?.data?.message ||

                err?.response

                  ?.data?.error ||

                err?.message ||

                "Failed to load class details."

            );

          }

        } finally {

          if (mounted) {

            setLoading(false);

          }

        }

      };

    fetchClass();

    return () => {

      mounted = false;

    };

  }, [classId]);

  /* =======================================================

     CLASS DATA

  ======================================================= */

  const title =

    getClassTitle(

      classData

    );

  const image =

    getClassImage(

      classData

    );

  const duration =

    getDuration(

      classData

    );

  
  const category = getCategory(classData);
  const subcategory = getSubcategory(classData);
  const classType = getClassType(classData);
const level =

    getLevel(

      classData

    );

  const students =

    getStudents(

      classData

    );

  const price =

    getPrice(

      classData

    );

  /* =======================================================

     TRAINER DATA

  ======================================================= */

  const trainerId =

    getTrainerId(

      classData

    );

  const trainerName =

    getTrainerName(

      classData

    );

  const trainerImage =

    getTrainerImage(

      classData

    );

  const trainerRating =

    getTrainerRating(

      classData

    );

  
  const trainerReviews = getTrainerReviews(classData);
/* =======================================================

     SCHEDULE

  ======================================================= */

  const availableDays =

    getAvailableDays(

      classData

    );

  const startDate =

    getValue(

      classData?.start_date,

      classData?.startDate

    );

  const startTime =

    getValue(

      classData?.start_time,

      classData?.startTime

    );

  const formattedDays =

    availableDays.length > 0

      ? availableDays

          .map((day) =>

            String(day).substring(

              0,

              3

            )

          )

          .join(" • ")

      : "--";

  /* =======================================================

     BOOKING

  ======================================================= */

  const handleBook =

    () => {

      if (!classData) {

        return;

      }

      setShowBooking(true);

    };

  /* =======================================================

     TRAINER PROFILE

  ======================================================= */

  const handleTrainerProfile =

    () => {

      if (!trainerId) {

        return;

      }

      navigate(

        `/institute/website/preview/trainers/${trainerId}`

      );

    };

  /* =======================================================

     BACK TO CLASSES

  ======================================================= */

  const handleBack =

    () => {

      navigate(

        "/institute/website/preview/classes"

      );

    };

  /* =======================================================

     PAGE STYLE

  ======================================================= */

  const pageStyle = {

    fontFamily:

      fontFamily(

        branding.fontBody

      ),

    background:

      `

      radial-gradient(

        circle at 10% 10%,

        rgba(0,140,255,0.18),

        transparent 28%

      ),

      radial-gradient(

        circle at 90% 20%,

        rgba(0,198,255,0.12),

        transparent 25%

      ),

      radial-gradient(

        circle at 50% 100%,

        rgba(0,76,255,0.14),

        transparent 35%

      ),

      #02050A

      `,

    color:

      "#FFFFFF",

    minHeight:

      "100vh",

  };

  /* =======================================================

     LOADING

  ======================================================= */

  if (loading) {

    return (

      <main

        className="

          flex

          min-h-screen

          items-center

          justify-center

          px-6

        "

        style={

          pageStyle

        }

      >

        {/* Background Glow */}

        <div

          className="

            pointer-events-none

            fixed

            left-1/2

            top-1/2

            h-72

            w-72

            -translate-x-1/2

            -translate-y-1/2

            rounded-full

            blur-[120px]

          "

          style={{

            background:

              "rgba(0,140,255,0.12)",

          }}

        />

        <div className="relative z-10 text-center">

          <div

            className="

              mx-auto

              h-14

              w-14

              animate-spin

              rounded-full

              border-4

            "

            style={{

              borderColor:

                "rgba(0,140,255,0.16)",

              borderTopColor:

                "#00B7FF",

              boxShadow:

                "0 0 25px rgba(0,140,255,0.25)",

            }}

          />

          <p

            className="mt-5 text-sm"

            style={{

              color:

                "#CBD5E1",

            }}

          >

            Loading class details...

          </p>

        </div>

      </main>

    );

  }

  /* =======================================================

     ERROR

  ======================================================= */

  if (

    error ||

    !classData

  ) {

    return (

      <main

        className="

          flex

          min-h-screen

          items-center

          justify-center

          px-6

        "

        style={

          pageStyle

        }

      >

        <div

          className="

            relative

            w-full

            max-w-lg

            overflow-hidden

            rounded-lg

            border

            p-8

            text-center

          "

          style={{

            borderColor:

              "rgba(0,140,255,0.35)",

            background:

              "#000000",

            boxShadow:

              "0 0 45px rgba(0,140,255,0.12)",

          }}

        >

          {/* Glow */}

          <div

            className="

              pointer-events-none

              absolute

              -right-20

              -top-20

              h-40

              w-40

              rounded-full

              blur-3xl

            "

            style={{

              background:

                "rgba(0,140,255,0.12)",

            }}

          />

          <div className="relative">

            <div

              className="

                mx-auto

                flex

                h-16

                w-16

                items-center

                justify-center

                rounded-full

              "

              style={{

                background:

                  "rgba(0,140,255,0.10)",

                color:

                  "#38BDF8",

                boxShadow:

                  "0 0 25px rgba(0,140,255,0.15)",

              }}

            >

              <FaChartBar

                size={24}

              />

            </div>

            <h1

              className="

                mt-6

                text-2xl

                font-bold

              "

              style={{

                color:

                  "#FFFFFF",

              }}

            >

              {error

                ? "Unable to Load Class"

                : "Class Not Found"}

            </h1>

            {error && (

              <p

                className="

                  mt-3

                  text-sm

                  leading-6

                "

                style={{

                  color:

                    "#94A3B8",

                }}

              >

                {error}

              </p>

            )}

            <button

              type="button"

              onClick={

                handleBack

              }

              className="

                mt-7

                inline-flex

                items-center

                gap-2

                rounded-full

                px-6

                py-3

                font-semibold

                text-white

                transition-all

                duration-300

                hover:-translate-x-1

              "

              style={{

                background:

                  "linear-gradient(90deg,#0066FF,#00B7FF)",

                boxShadow:

                  "0 0 25px rgba(0,140,255,0.25)",

              }}

            >

              <FaArrowLeft

                size={13}

              />

              Back To Classes

            </button>

          </div>

        </div>

      </main>

    );

  }

  /* =======================================================

     MAIN PAGE

  ======================================================= */

  return (

    <>

      <main

        className="

          min-h-screen

          w-full

          overflow-x-hidden

        "

        style={

          pageStyle

        }

      >

        {/* =================================================

            GLOBAL BACKGROUND GLOW

        ================================================= */}

        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">

          <div

            className="

              absolute

              -left-40

              top-20

              h-96

              w-96

              rounded-full

              blur-[120px]

            "

            style={{

              background:

                "rgba(0,140,255,0.10)",

            }}

          />

          <div

            className="

              absolute

              -right-40

              top-[40%]

              h-[500px]

              w-[500px]

              rounded-full

              blur-[140px]

            "

            style={{

              background:

                "rgba(0,198,255,0.08)",

            }}

          />

          <div

            className="

              absolute

              bottom-0

              left-[35%]

              h-80

              w-80

              rounded-full

              blur-[120px]

            "

            style={{

              background:

                "rgba(0,76,255,0.08)",

            }}

          />

        </div>

        <div

          className="

            mx-auto

            max-w-7xl

            px-4

            py-6

            sm:px-6

            lg:px-8

          "

        >

          {/* =================================================

              BACK BUTTON

          ================================================= */}

          <button

            type="button"

            onClick={

              handleBack

            }

            className="

              group

              mb-7

              inline-flex

              items-center

              gap-3

              rounded-full

              border

              px-5

              py-2.5

              text-sm

              font-semibold

              transition-all

              duration-300

              hover:-translate-x-1

            "

            style={{

              color:

                "#CBD5E1",

              borderColor:

                "rgba(0,140,255,0.35)",

              background:

                "rgba(2,8,18,0.75)",

              boxShadow:

                "0 0 20px rgba(0,140,255,0.06)",

            }}

          >

            <FaArrowLeft

              size={13}

            />

            <span>

              Back To Classes

            </span>

          </button>

          {/* =================================================

              ROW 1

              IMAGE + CLASS INFORMATION

          ================================================= */}

          <section

            className="

              grid

              min-h-[50vh]

              grid-cols-1

              gap-6

              lg:grid-cols-2

            "

          >

            {/* ===============================================

                CLASS IMAGE

            =============================================== */}

            <div

              className="

                group

                relative

                min-h-[420px]

                overflow-hidden

                rounded-lg

                border

              "

              style={{

                borderColor:

                  "rgba(0,140,255,0.55)",

                background:

                  "#000000",

                boxShadow:

                  `

                  0 0 0 1px rgba(0,140,255,0.08),

                  0 0 40px rgba(0,140,255,0.14),

                  inset 0 0 50px rgba(0,140,255,0.04)

                  `,

              }}

            >

              {image ? (

                <img

                  src={image}

                  alt={title}

                  className="

                    h-full

                    min-h-[420px]

                    w-full

                    object-cover

                    transition-transform

                    duration-700

                    group-hover:scale-105

                  "

                  onError={(

                    event

                  ) => {

                    event.currentTarget.onerror =

                      null;

                    event.currentTarget.style.display =

                      "none";

                  }}

                />

              ) : (

                <div

                  className="

                    flex

                    h-full

                    min-h-[420px]

                    items-center

                    justify-center

                  "

                  style={{

                    background:

                      "#000000",

                    color:

                      "#64748B",

                  }}

                >

                  No Class Image

                </div>

              )}

              {/* IMAGE OVERLAY */}

              <div

                className="

                  pointer-events-none

                  absolute

                  inset-0

                "

                style={{

                  background:

                    `

                    linear-gradient(

                      to top,

                      rgba(0,0,0,0.82),

                      rgba(0,0,0,0.10) 55%,

                      rgba(0,140,255,0.08)

                    )

                    `,

                }}

              />

              {/* BLUE GLOW */}

              <div

                className="

                  pointer-events-none

                  absolute

                  -right-20

                  -top-20

                  h-60

                  w-60

                  rounded-full

                  blur-3xl

                "

                style={{

                  background:

                    "rgba(0,140,255,0.15)",

                }}

              />

              {/* IMAGE LABEL */}

              <div

                className="

                  absolute

                  bottom-6

                  left-6

                "

              >

                <div

                  className="

                    inline-flex

                    items-center

                    rounded-full

                    border

                    px-4

                    py-2

                    text-xs

                    font-bold

                    uppercase

                    tracking-[0.18em]

                    backdrop-blur-md

                  "

                  style={{

                    color:

                      "#60A5FA",

                    borderColor:

                      "rgba(56,189,248,0.55)",

                    background:

                      "rgba(0,8,18,0.70)",

                    boxShadow:

                      "0 0 20px rgba(0,140,255,0.12)",

                  }}

                >

                  Fine Arts Class

                </div>

              </div>

            </div>

            {/* ===============================================

                CLASS INFORMATION

            =============================================== */}

            <div

              className="

                grid

                content-center

                gap-4

                rounded-lg

                border

                p-5

                sm:p-7

              "

              style={{

                background:

                  "#000000",

                borderColor:

                  "rgba(0,140,255,0.38)",

                boxShadow:

                  `

                  0 0 35px rgba(0,140,255,0.10),

                  inset 0 0 35px rgba(0,140,255,0.025)

                  `,

              }}

            >

              <DetailItem
                icon={FaChartBar}
                label="Category"
                value={category}
              />

              <DetailItem
                icon={FaChartBar}
                label="Subcategory"
                value={subcategory}
              />

              <DetailItem
                icon={FaChartBar}
                label="Type"
                value={classType}
              />

              <DetailItem

                icon={FaClock}

                label="Duration"

                value={

                  duration

                }

              />

              <DetailItem

                icon={FaChartBar}

                label="Level"

                value={

                  level

                }

              />

              <DetailItem

                icon={FaClock}

                label="Start Time"

                value={

                  formatTime(

                    startTime

                  )

                }

              />

              <DetailItem

                icon={FaCalendarAlt}

                label="Start Date"

                value={

                  formatDate(

                    startDate

                  )

                }

              />

              <DetailItem

                icon={FaUsers}

                label="Students"

                value={`${students} Students`}

              />

            </div>

          </section>

          {/* =================================================

              ROW 2

              CLASS NAME + PRICE + BOOK

          ================================================= */}

          <section

            className="

              mt-6

              rounded-lg

              border

              p-6

              sm:p-8

            "

            style={{

              background:

                "#000000",

              borderColor:

                "rgba(0,140,255,0.40)",

              boxShadow:

                `

                0 0 40px rgba(0,140,255,0.10),

                inset 0 0 30px rgba(0,140,255,0.025)

                `,

            }}

          >

            <div

              className="

                grid

                items-center

                gap-8

                lg:grid-cols-[1fr_320px]

              "

            >

              {/* CLASS NAME */}

              <div>

                <p

                  className="

                    mb-3

                    text-xs

                    font-bold

                    uppercase

                    tracking-[0.25em]

                  "

                  style={{

                    color:

                      "#38BDF8",

                  }}

                >

                  Class Details

                </p>

                <h1

                  className="

                    text-3xl

                    leading-tight

                    sm:text-4xl

                    lg:text-5xl

                  "

                  style={{

                    color:

                      "#F8FAFC",

                    fontFamily:

                      fontFamily(

                        branding.fontHeading

                      ),

                    fontWeight:

                      branding.headingWeight,

                    textShadow:

                      "0 0 35px rgba(0,140,255,0.16)",

                  }}

                >

                  {title}

                </h1>

              </div>

              {/* PRICE + BOOK */}

              <div

                className="

                  border-l-0

                  lg:border-l

                  lg:pl-8

                "

                style={{

                  borderColor:

                    "rgba(0,140,255,0.30)",

                }}

              >

                <p

                  className="text-sm"

                  style={{

                    color:

                      "#94A3B8",

                  }}

                >

                  Course Price

                </p>

                <p

                  className="

                    mt-1

                    text-4xl

                    font-extrabold

                  "

                  style={{

                    color:

                      "#38BDF8",

                    textShadow:

                      "0 0 25px rgba(0,140,255,0.35)",

                  }}

                >

                  ₹

                  {price.toLocaleString(

                    "en-IN"

                  )}

                </p>

                <button

                  type="button"

                  onClick={

                    handleBook

                  }

                  className="

                    mt-5

                    flex

                    w-full

                    items-center

                    justify-center

                    gap-2

                    rounded-lg

                    px-6

                    py-3.5

                    font-bold

                    text-white

                    transition-all

                    duration-300

                    hover:-translate-y-0.5

                    hover:brightness-110

                  "

                  style={{

                    background:

                      "linear-gradient(90deg,#0066FF,#00B7FF,#008CFF)",

                    boxShadow:

                      `

                      0 0 25px rgba(0,140,255,0.32),

                      0 8px 30px rgba(0,0,0,0.30)

                      `,

                  }}

                >

                  Book Now

                  <FaArrowRight

                    size={13}

                  />

                </button>

              </div>

            </div>

          </section>

          {/* =================================================

              ROW 3

              AVAILABLE DAYS + TRAINER

          ================================================= */}

          <section

            className="

              mt-6

              grid

              min-h-[25vh]

              grid-cols-1

              gap-6

              lg:grid-cols-2

            "

          >

            {/* ===============================================

                AVAILABLE DAYS

            =============================================== */}

            <div

              className="

                rounded-lg

                border

                p-6

                sm:p-8

              "

              style={{

                background:

                  "#000000",

                borderColor:

                  "rgba(0,140,255,0.40)",

                boxShadow:

                  "0 0 35px rgba(0,140,255,0.09)",

              }}

            >

              <div

                className="

                  flex

                  items-center

                  gap-4

                "

              >

                <div

                  className="

                    flex

                    h-12

                    w-12

                    items-center

                    justify-center

                    rounded-lg

                  "

                  style={{

                    background:

                      "rgba(0,140,255,0.10)",

                    color:

                      "#38BDF8",

                    boxShadow:

                      "0 0 20px rgba(0,140,255,0.10)",

                  }}

                >

                  <FaCalendarWeek

                    size={22}

                  />

                </div>

                <div>

                  <p

                    className="text-sm"

                    style={{

                      color:

                        "#94A3B8",

                    }}

                  >

                    Available Days

                  </p>

                  <h2

                    className="

                      text-2xl

                      font-bold

                    "

                    style={{

                      color:

                        "#FFFFFF",

                    }}

                  >

                    Class Schedule

                  </h2>

                </div>

              </div>

              <div

                className="

                  mt-6

                  flex

                  flex-wrap

                  gap-3

                "

              >

                {availableDays.length >

                0 ? (

                  availableDays.map(

                    (

                      day,

                      index

                    ) => (

                      <span

                        key={`${day}-${index}`}

                        className="

                          rounded-lg

                          border

                          px-5

                          py-3

                          font-semibold

                        "

                        style={{

                          color:

                            "#60A5FA",

                          borderColor:

                            "rgba(0,140,255,0.50)",

                          background:

                            "linear-gradient(135deg,rgba(0,140,255,0.13),rgba(0,198,255,0.05))",

                          boxShadow:

                            "0 0 15px rgba(0,140,255,0.08)",

                        }}

                      >

                        {String(

                          day

                        ).substring(

                          0,

                          3

                        )}

                      </span>

                    )

                  )

                ) : (

                  <span

                    className="

                      rounded-lg

                      border

                      px-5

                      py-3

                    "

                    style={{

                      color:

                        "#64748B",

                      borderColor:

                        "rgba(0,140,255,0.25)",

                    }}

                  >

                    {formattedDays}

                  </span>

                )}

              </div>

            </div>

            {/* ===============================================

                TRAINER

            =============================================== */}

            <div

              className="

                rounded-lg

                border

                p-6

                sm:p-8

              "

              style={{

                background:

                  "#000000",

                borderColor:

                  "rgba(0,140,255,0.40)",

                boxShadow:

                  "0 0 35px rgba(0,140,255,0.09)",

              }}

            >

              <div

                className="

                  flex

                  h-full

                  flex-col

                  justify-center

                  gap-5

                  sm:flex-row

                  sm:items-center

                "

              >

                {/* TRAINER IMAGE */}

                {trainerImage ? (

                  <img

                    src={

                      trainerImage

                    }

                    alt={

                      trainerName

                    }

                    className="

                      h-28

                      w-28

                      shrink-0

                      rounded-full

                      object-cover

                    "

                    style={{

                      border:

                        "2px solid #008CFF",

                      boxShadow:

                        `

                        0 0 0 5px rgba(0,140,255,0.06),

                        0 0 30px rgba(0,140,255,0.30)

                        `,

                    }}

                    onError={(

                      event

                    ) => {

                      event.currentTarget.onerror =

                        null;

                      event.currentTarget.style.display =

                        "none";

                    }}

                  />

                ) : (

                  <div

                    className="

                      flex

                      h-28

                      w-28

                      shrink-0

                      items-center

                      justify-center

                      rounded-full

                      text-3xl

                      font-bold

                    "

                    style={{

                      border:

                        "2px solid #008CFF",

                      background:

                        "radial-gradient(circle,#0B2A4A,#020817)",

                      color:

                        "#38BDF8",

                      boxShadow:

                        "0 0 30px rgba(0,140,255,0.25)",

                    }}

                  >

                    {String(

                      trainerName

                    )

                      .charAt(0)

                      .toUpperCase()}

                  </div>

                )}

                {/* TRAINER DETAILS */}

                <div

                  className="

                    min-w-0

                    flex-1

                  "

                >

                  <p

                    className="text-sm"

                    style={{

                      color:

                        "#94A3B8",

                    }}

                  >

                    Trainer

                  </p>

                  <h2

                    className="

                      mt-1

                      truncate

                      text-2xl

                      font-bold

                    "

                    style={{

                      color:

                        "#FFFFFF",

                    }}

                  >

                    {trainerName}

                  </h2>

                  <div className="mt-2">

                    <StarRating

                      rating={

                        trainerRating

                      }

                    />
                    <p className="mt-1 text-xs" style={{ color: "#94A3B8" }}>
                      {trainerReviews} reviews
                    </p>

                  </div>

                  <button

                    type="button"

                    onClick={

                      handleTrainerProfile

                    }

                    disabled={

                      !trainerId

                    }

                    className="

                      mt-4

                      inline-flex

                      items-center

                      justify-center

                      gap-2

                      rounded-lg

                      border

                      px-5

                      py-3

                      font-semibold

                      transition-all

                      duration-300

                      hover:-translate-y-0.5

                      hover:bg-blue-500/10

                      disabled:cursor-not-allowed

                      disabled:opacity-50

                    "

                    style={{

                      color:

                        "#60A5FA",

                      borderColor:

                        "rgba(0,140,255,0.60)",

                      background:

                        "rgba(0,140,255,0.04)",

                      boxShadow:

                        "0 0 18px rgba(0,140,255,0.08)",

                    }}

                  >

                    <FaUser

                      size={15}

                    />

                    View Trainer Profile

                  </button>

                </div>

              </div>

            </div>

          </section>

        </div>

        {/* =================================================

            BOOKING MODAL

        ================================================= */}

        <WebsiteBooking

          isOpen={

            showBooking

          }

          selectedClass={

            classData

          }

          onClose={() =>

            setShowBooking(

              false

            )

          }

        />

      </main>

    </>

  );

};

export default WebsiteClassDetail;