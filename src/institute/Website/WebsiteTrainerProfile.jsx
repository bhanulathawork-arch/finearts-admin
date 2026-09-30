
import {
  Link,
  useOutletContext,
  useParams,
} from "react-router-dom";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  FaArrowLeft,
  FaArrowRight,
  FaCheck,
  FaComment,
  FaBriefcase,
  FaStar,
  FaUsers,
} from "react-icons/fa";

import {
  getTrainerById,
  getTrainerClasses,
} from "../../services/trainerService";


/* =========================================================
   DEFAULT BRANDING
   Dark navy + radiant blue trainer profile
========================================================= */

const DEFAULT_BRANDING = {
  pageBackgroundColor: "#050B16",
  cardBackgroundColor: "#0B1424",
  navbarColor: "#07101E",

  headingColor: "#F8FAFC",
  subheadingColor: "#60A5FA",
  textColor: "#CBD5E1",

  iconColor: "#60A5FA",
  buttonColor: "#2563EB",
  buttonTextColor: "#FFFFFF",

  fontHeading: "Inter",
  fontSubheading: "Inter",
  fontBody: "Inter",

  headingWeight: 700,
  headingLineHeight: 1.15,
  headingLetterSpacing: 0,

  subheadingWeight: 600,
  subheadingLineHeight: 1.4,

  bodyWeight: 400,
  bodyLineHeight: 1.65,
  bodyLetterSpacing: 0,

  roundedButtons: true,
};


/* =========================================================
   HELPERS
========================================================= */

const firstValue = (...values) =>
  values.find(
    (value) =>
      value !== undefined &&
      value !== null &&
      String(value).trim() !== ""
  );


const getBrandingValue = (
  branding,
  camelKey,
  snakeKey,
  fallback
) => {
  const value =
    branding?.[camelKey] ??
    branding?.[snakeKey];

  return value !== undefined &&
    value !== null &&
    value !== ""
    ? value
    : fallback;
};


const normalizeBranding = (branding = {}) => ({
  pageBackgroundColor: getBrandingValue(
    branding,
    "pageBackgroundColor",
    "page_background_color",
    DEFAULT_BRANDING.pageBackgroundColor
  ),

  cardBackgroundColor: getBrandingValue(
    branding,
    "cardBackgroundColor",
    "card_background_color",
    DEFAULT_BRANDING.cardBackgroundColor
  ),

  navbarColor: getBrandingValue(
    branding,
    "navbarColor",
    "navbar_color",
    DEFAULT_BRANDING.navbarColor
  ),

  headingColor: getBrandingValue(
    branding,
    "headingColor",
    "heading_color",
    DEFAULT_BRANDING.headingColor
  ),

  subheadingColor: getBrandingValue(
    branding,
    "subheadingColor",
    "subheading_color",
    DEFAULT_BRANDING.subheadingColor
  ),

  textColor: getBrandingValue(
    branding,
    "textColor",
    "text_color",
    DEFAULT_BRANDING.textColor
  ),

  iconColor: getBrandingValue(
    branding,
    "iconColor",
    "icon_color",
    DEFAULT_BRANDING.iconColor
  ),

  buttonColor: getBrandingValue(
    branding,
    "buttonColor",
    "button_color",
    DEFAULT_BRANDING.buttonColor
  ),

  buttonTextColor: getBrandingValue(
    branding,
    "buttonTextColor",
    "button_text_color",
    DEFAULT_BRANDING.buttonTextColor
  ),

  fontHeading: getBrandingValue(
    branding,
    "fontHeading",
    "font_heading",
    DEFAULT_BRANDING.fontHeading
  ),

  fontSubheading: getBrandingValue(
    branding,
    "fontSubheading",
    "font_subheading",
    DEFAULT_BRANDING.fontSubheading
  ),

  fontBody: getBrandingValue(
    branding,
    "fontBody",
    "font_body",
    DEFAULT_BRANDING.fontBody
  ),

  headingWeight: getBrandingValue(
    branding,
    "headingWeight",
    "heading_weight",
    DEFAULT_BRANDING.headingWeight
  ),

  headingLineHeight: getBrandingValue(
    branding,
    "headingLineHeight",
    "heading_line_height",
    DEFAULT_BRANDING.headingLineHeight
  ),

  headingLetterSpacing: getBrandingValue(
    branding,
    "headingLetterSpacing",
    "heading_letter_spacing",
    DEFAULT_BRANDING.headingLetterSpacing
  ),

  subheadingWeight: getBrandingValue(
    branding,
    "subheadingWeight",
    "subheading_weight",
    DEFAULT_BRANDING.subheadingWeight
  ),

  subheadingLineHeight: getBrandingValue(
    branding,
    "subheadingLineHeight",
    "subheading_line_height",
    DEFAULT_BRANDING.subheadingLineHeight
  ),

  bodyWeight: getBrandingValue(
    branding,
    "bodyWeight",
    "body_weight",
    DEFAULT_BRANDING.bodyWeight
  ),

  bodyLineHeight: getBrandingValue(
    branding,
    "bodyLineHeight",
    "body_line_height",
    DEFAULT_BRANDING.bodyLineHeight
  ),

  bodyLetterSpacing: getBrandingValue(
    branding,
    "bodyLetterSpacing",
    "body_letter_spacing",
    DEFAULT_BRANDING.bodyLetterSpacing
  ),

  roundedButtons: getBrandingValue(
    branding,
    "roundedButtons",
    "rounded_buttons",
    DEFAULT_BRANDING.roundedButtons
  ),
});


const fontFamily = (font) =>
  font
    ? `'${font}', sans-serif`
    : "Inter, sans-serif";


const hexToRgba = (color, alpha) => {
  if (typeof color !== "string") {
    return color;
  }

  const hex = color.replace("#", "");

  if (!/^[0-9A-Fa-f]{6}$/.test(hex)) {
    return color;
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};


const getButtonRadius = (branding) =>
  branding.roundedButtons
    ? "9999px"
    : "10px";


const formatNumber = (value) => {
  const number = Number(value || 0);

  return Number.isFinite(number)
    ? number.toLocaleString()
    : "0";
};


const getTrainerName = (trainer) =>
  firstValue(
    trainer?.full_name,
    trainer?.name,
    trainer?.trainer_name,
    "Professional Trainer"
  );


const getTrainerImage = (trainer) =>
  firstValue(
    trainer?.profile_image,
    trainer?.profileImage,
    trainer?.image,
    trainer?.image_url,
    trainer?.imageUrl
  );


const getTrainerSpecialty = (trainer) =>
  firstValue(
    trainer?.specialty,
    trainer?.specialization,
    trainer?.designation,
    trainer?.role,
    "Expert Trainer"
  );


const getTrainerSubcategory = (trainer) =>
  firstValue(
    trainer?.subcategory_name,
    trainer?.subcategory,
    trainer?.sub_category,
    trainer?.subcategories,
    trainer?.specialization,
    trainer?.specialty
  );


const getTrainerDescription = (trainer) =>
  firstValue(
    trainer?.bio,
    trainer?.description,
    trainer?.about,
    trainer?.about_trainer,
    "Trainer information is not available."
  );


const normalizeCertifications = (value) => {
  if (!value) {
    return [];
  }

  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (typeof item === "string") {
          return item.trim();
        }

        return firstValue(
          item?.name,
          item?.title,
          item?.certificate,
          item?.certification
        );
      })
      .filter(Boolean);
  }

  return String(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};


const getClassTitle = (item) =>
  firstValue(
    item?.title,
    item?.name,
    item?.class_name,
    item?.className,
    "Class"
  );


const getClassImage = (item) =>
  firstValue(
    item?.image,
    item?.image_url,
    item?.imageUrl,
    item?.banner_image,
    item?.bannerImage
  );


/* =========================================================
   STAT CARD
========================================================= */

const StatCard = ({
  icon,
  value,
  label,
  branding,
}) => (
  <div
    className="
      group
      relative
      overflow-hidden
      rounded-2xl
      border
      px-4
      py-5
      transition-all
      duration-300
      hover:-translate-y-1
    "
    style={{
      background:
        `linear-gradient(145deg, ${hexToRgba(
          branding.cardBackgroundColor,
          0.98
        )}, ${hexToRgba("#071A33", 0.95)})`,

      borderColor:
        hexToRgba(branding.buttonColor, 0.28),

      boxShadow:
        `0 0 0 1px ${hexToRgba(
          branding.buttonColor,
          0.04
        )}, 0 12px 35px ${hexToRgba(
          "#000000",
          0.18
        )}`,
    }}
  >
    <div
      className="
        absolute
        -right-6
        -top-6
        h-20
        w-20
        rounded-full
        blur-2xl
      "
      style={{
        backgroundColor:
          hexToRgba(branding.buttonColor, 0.18),
      }}
    />

    <div
      className="
        relative
        flex
        items-center
        gap-2
      "
    >
      <span
        className="
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-xl
        "
        style={{
          color: branding.iconColor,
          backgroundColor:
            hexToRgba(branding.buttonColor, 0.12),
          border:
            `1px solid ${hexToRgba(
              branding.buttonColor,
              0.2
            )}`,
        }}
      >
        {icon}
      </span>

      <span
        className="text-2xl font-bold"
        style={{
          color: branding.headingColor,
          fontFamily:
            fontFamily(branding.fontHeading),
        }}
      >
        {value}
      </span>
    </div>

    <p
      className="
        relative
        mt-3
        text-[10px]
        font-semibold
        uppercase
        tracking-[0.16em]
      "
      style={{
        color: branding.textColor,
        opacity: 0.58,
        fontFamily:
          fontFamily(branding.fontBody),
      }}
    >
      {label}
    </p>
  </div>
);


/* =========================================================
   SECTION TITLE
========================================================= */

const SectionTitle = ({
  title,
  branding,
}) => (
  <div className="mb-6 flex items-center gap-3">
    <span
      className="
        h-8
        w-1
        rounded-full
      "
      style={{
        background:
          `linear-gradient(
            to bottom,
            ${branding.buttonColor},
            ${branding.iconColor}
          )`,
        boxShadow:
          `0 0 14px ${hexToRgba(
            branding.buttonColor,
            0.55
          )}`,
      }}
    />

    <h2
      className="
        text-xl
        font-bold
        sm:text-2xl
      "
      style={{
        color: branding.headingColor,
        fontFamily:
          fontFamily(branding.fontHeading),
        fontWeight:
          branding.headingWeight,
      }}
    >
      {title}
    </h2>
  </div>
);


/* =========================================================
   CLASS CARD
========================================================= */

const TrainerClassCard = ({
  item,
  branding,
}) => {
  const classId = item?.id;
  const title = getClassTitle(item);
  const image = getClassImage(item);

  const level = firstValue(
    item?.level,
    item?.class_level,
    item?.difficulty
  );

  return (
    <Link
      to={
        classId
          ? `/institute/website/preview/classes/${classId}`
          : "#"
      }
      onClick={(event) => {
        if (!classId) {
          event.preventDefault();
        }
      }}
      className="
        group
        block
        overflow-hidden
        rounded-2xl
        border
        transition-all
        duration-300
        hover:-translate-y-1
      "
      style={{
        background:
          `linear-gradient(
            145deg,
            ${branding.cardBackgroundColor},
            #071426
          )`,

        borderColor:
          hexToRgba(branding.buttonColor, 0.22),

        boxShadow:
          `0 12px 35px ${hexToRgba(
            "#000000",
            0.2
          )}`,
      }}
    >
      <div
        className="
          relative
          h-48
          overflow-hidden
          sm:h-56
        "
        style={{
          background:
            `linear-gradient(
              135deg,
              ${hexToRgba(
                branding.buttonColor,
                0.2
              )},
              #071426
            )`,
        }}
      >
        {image ? (
          <img
            src={image}
            alt={title}
            className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-500
              group-hover:scale-105
            "
            onError={(event) => {
              event.currentTarget.style.display =
                "none";
            }}
          />
        ) : (
          <div
            className="
              flex
              h-full
              w-full
              items-center
              justify-center
            "
          >
            <span
              className="
                text-5xl
                font-black
              "
              style={{
                color:
                  hexToRgba(
                    branding.iconColor,
                    0.75
                  ),
                fontFamily:
                  fontFamily(
                    branding.fontHeading
                  ),
              }}
            >
              {String(title)
                .charAt(0)
                .toUpperCase()}
            </span>
          </div>
        )}

        <div
          className="
            absolute
            inset-x-0
            bottom-0
            h-28
            bg-gradient-to-t
            from-[#050B16]
            to-transparent
          "
        />

        {level && (
          <span
            className="
              absolute
              left-4
              top-4
              rounded-full
              border
              px-3
              py-1.5
              text-[10px]
              font-bold
              uppercase
              tracking-wider
            "
            style={{
              color: branding.buttonTextColor,
              backgroundColor:
                hexToRgba(
                  branding.buttonColor,
                  0.78
                ),
              borderColor:
                hexToRgba(
                  branding.buttonTextColor,
                  0.2
                ),
            }}
          >
            {level}
          </span>
        )}
      </div>

      <div className="p-5">
        <div
          className="
            flex
            items-center
            justify-between
            gap-4
          "
        >
          <h3
            className="
              line-clamp-2
              text-base
              font-bold
              sm:text-lg
            "
            style={{
              color: branding.headingColor,
              fontFamily:
                fontFamily(
                  branding.fontHeading
                ),
            }}
          >
            {title}
          </h3>

          <span
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-full
              border
              transition-transform
              duration-300
              group-hover:translate-x-1
            "
            style={{
              color: branding.iconColor,
              borderColor:
                hexToRgba(
                  branding.buttonColor,
                  0.3
                ),
              backgroundColor:
                hexToRgba(
                  branding.buttonColor,
                  0.08
                ),
            }}
          >
            <FaArrowRight className="text-xs" />
          </span>
        </div>

        <p
          className="
            mt-2
            text-xs
            leading-5
          "
          style={{
            color: branding.textColor,
            opacity: 0.58,
            fontFamily:
              fontFamily(branding.fontBody),
          }}
        >
          View class details
        </p>
      </div>
    </Link>
  );
};


/* =========================================================
   MAIN
========================================================= */

const WebsiteTrainerProfile = () => {
  const { trainerId } = useParams();
  const context = useOutletContext() || {};

  const branding = useMemo(
    () =>
      normalizeBranding(
        context?.branding ||
        context?.websiteBranding ||
        context?.brand ||
        {}
      ),
    [
      context?.branding,
      context?.websiteBranding,
      context?.brand,
    ]
  );

  const [trainer, setTrainer] =
    useState(null);

  const [trainerClasses, setTrainerClasses] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(false);


  /* =======================================================
     FETCH TRAINER
  ======================================================= */

  useEffect(() => {
    let isMounted = true;

    const fetchTrainer = async () => {
      if (!trainerId) {
        if (isMounted) {
          setTrainer(null);
          setTrainerClasses([]);
          setLoading(false);
          setError(true);
        }

        return;
      }

      try {
        setLoading(true);
        setError(false);

        const trainerData =
          await getTrainerById(trainerId);

        if (!isMounted) {
          return;
        }

        setTrainer(trainerData || null);

        try {
          const classesData =
            await getTrainerClasses(
              trainerId
            );

          if (!isMounted) {
            return;
          }

          setTrainerClasses(
            Array.isArray(classesData)
              ? classesData
              : []
          );
        } catch (classesError) {
          console.error(
            "Failed to load trainer classes:",
            classesError
          );

          if (isMounted) {
            setTrainerClasses([]);
          }
        }
      } catch (fetchError) {
        console.error(
          "Failed to load trainer profile:",
          fetchError
        );

        if (isMounted) {
          setTrainer(null);
          setTrainerClasses([]);
          setError(true);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchTrainer();

    return () => {
      isMounted = false;
    };
  }, [trainerId]);


  /* =======================================================
     NORMALIZED TRAINER VALUES
  ======================================================= */

  const trainerName =
    getTrainerName(trainer);

  const trainerImage =
    getTrainerImage(trainer);

  const specialty =
    getTrainerSpecialty(trainer);

  const subcategory =
    getTrainerSubcategory(trainer);

  const description =
    getTrainerDescription(trainer);

  const rating =
    Number(trainer?.rating || 0);

  const totalReviews =
    Number(
      trainer?.total_reviews ??
      trainer?.totalReviews ??
      0
    );

  const totalStudents =
    Number(
      trainer?.total_students ??
      trainer?.totalStudents ??
      0
    );

  const experience =
    Number(
      trainer?.experience_years ??
      trainer?.experienceYears ??
      0
    );

  const certifications =
    normalizeCertifications(
      trainer?.certifications
    );

  const initials =
    String(trainerName)
      .trim()
      .split(/\s+/)
      .map((word) =>
        word.charAt(0).toUpperCase()
      )
      .slice(0, 2)
      .join("");


  /* =======================================================
     STYLES
  ======================================================= */

  const headingStyle = {
    color: branding.headingColor,
    fontFamily:
      fontFamily(branding.fontHeading),
    fontWeight:
      branding.headingWeight,
    lineHeight:
      branding.headingLineHeight,
    letterSpacing:
      branding.headingLetterSpacing,
  };

  const bodyStyle = {
    color: branding.textColor,
    fontFamily:
      fontFamily(branding.fontBody),
    fontWeight:
      branding.bodyWeight,
    lineHeight:
      branding.bodyLineHeight,
    letterSpacing:
      branding.bodyLetterSpacing,
  };


  const cardStyle = {
    background:
      `linear-gradient(
        145deg,
        ${branding.cardBackgroundColor},
        #071426
      )`,

    border:
      `1px solid ${hexToRgba(
        branding.buttonColor,
        0.18
      )}`,

    borderRadius: "22px",

    boxShadow:
      `0 20px 60px ${hexToRgba(
        "#000000",
        0.24
      )}`,
  };


  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <div
        className="
          flex
          min-h-screen
          items-center
          justify-center
          px-4
        "
        style={{
          backgroundColor:
            branding.pageBackgroundColor,
        }}
      >
        <div className="text-center">
          <div
            className="
              mx-auto
              h-12
              w-12
              animate-spin
              rounded-full
              border-4
            "
            style={{
              borderColor:
                hexToRgba(
                  branding.buttonColor,
                  0.18
                ),
              borderTopColor:
                branding.iconColor,
            }}
          />

          <p
            className="mt-5 text-sm"
            style={{
              ...bodyStyle,
              opacity: 0.65,
            }}
          >
            Loading trainer profile...
          </p>
        </div>
      </div>
    );
  }


  /* =======================================================
     NOT FOUND
  ======================================================= */

  if (error || !trainer) {
    return (
      <div
        className="
          flex
          min-h-screen
          items-center
          justify-center
          px-4
        "
        style={{
          backgroundColor:
            branding.pageBackgroundColor,
        }}
      >
        <div
          className="
            w-full
            max-w-md
            rounded-3xl
            border
            p-8
            text-center
          "
          style={cardStyle}
        >
          <div
            className="
              mx-auto
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full
              border
            "
            style={{
              color: branding.iconColor,
              borderColor:
                hexToRgba(
                  branding.buttonColor,
                  0.3
                ),
              backgroundColor:
                hexToRgba(
                  branding.buttonColor,
                  0.1
                ),
            }}
          >
            <FaUsers />
          </div>

          <h2
            className="mt-5 text-2xl"
            style={headingStyle}
          >
            Trainer Not Found
          </h2>

          <p
            className="mt-2 text-sm"
            style={{
              ...bodyStyle,
              opacity: 0.62,
            }}
          >
            We could not load the requested
            trainer profile.
          </p>

          <Link
            to="/institute/website/preview/trainers"
            className="
              mt-7
              inline-flex
              items-center
              gap-2
              px-5
              py-3
              text-sm
              font-semibold
            "
            style={{
              backgroundColor:
                branding.buttonColor,
              color:
                branding.buttonTextColor,
              borderRadius:
                getButtonRadius(branding),
            }}
          >
            <FaArrowLeft />
            Back To Trainers
          </Link>
        </div>
      </div>
    );
  }


  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <div
      className="
        min-h-screen
        overflow-hidden
        pb-20
      "
      style={{
        background:
          `radial-gradient(
            circle at 50% -10%,
            ${hexToRgba(
              branding.buttonColor,
              0.18
            )},
            transparent 35%
          ),
          linear-gradient(
            180deg,
            ${branding.pageBackgroundColor},
            #030712
          )`,
        color: branding.textColor,
        fontFamily:
          fontFamily(branding.fontBody),
      }}
    >
      {/* ===================================================
          TOP GLOW
      =================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-72
          w-[700px]
          -translate-x-1/2
          rounded-full
          blur-3xl
        "
        style={{
          background:
            `radial-gradient(
              circle,
              ${hexToRgba(
                branding.buttonColor,
                0.16
              )},
              transparent 65%
            )`,
        }}
      />


      <div
        className="
          relative
          mx-auto
          max-w-7xl
          px-4
          pt-6
          sm:px-6
          lg:px-8
        "
      >

        {/* =================================================
            BACK
        ================================================= */}

        <Link
          to="/institute/website/preview/trainers"
          className="
            group
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            px-4
            py-2
            text-xs
            font-semibold
            transition-all
            duration-300
            hover:-translate-x-1
          "
          style={{
            color: branding.textColor,
            borderColor:
              hexToRgba(
                branding.buttonColor,
                0.24
              ),
            backgroundColor:
              hexToRgba(
                branding.cardBackgroundColor,
                0.55
              ),
          }}
        >
          <FaArrowLeft
            className="
              transition-transform
              duration-300
              group-hover:-translate-x-0.5
            "
          />
          Back To Trainers
        </Link>


        {/* =================================================
            HERO
        ================================================= */}

        <section
          className="
            relative
            mt-6
            overflow-hidden
            rounded-[28px]
            border
          "
          style={{
            background:
              `linear-gradient(
                120deg,
                #0A1527 0%,
                #071426 45%,
                #081A35 100%
              )`,

            borderColor:
              hexToRgba(
                branding.buttonColor,
                0.3
              ),

            boxShadow:
              `0 30px 90px ${hexToRgba(
                "#000000",
                0.35
              )}, inset 0 1px 0 ${hexToRgba(
                "#FFFFFF",
                0.05
              )}`,
          }}
        >
          {/* HERO GLOW */}
          <div
            className="
              pointer-events-none
              absolute
              -right-32
              -top-32
              h-80
              w-80
              rounded-full
              blur-3xl
            "
            style={{
              backgroundColor:
                hexToRgba(
                  branding.buttonColor,
                  0.22
                ),
            }}
          />

          <div
            className="
              pointer-events-none
              absolute
              -bottom-40
              left-1/3
              h-72
              w-72
              rounded-full
              blur-3xl
            "
            style={{
              backgroundColor:
                hexToRgba(
                  branding.iconColor,
                  0.08
                ),
            }}
          />

          <div
            className="
              relative
              grid
              gap-8
              p-6
              sm:p-8
              lg:grid-cols-[280px_1fr]
              lg:gap-10
              lg:p-10
            "
          >

            {/* =============================================
                PROFILE IMAGE
            ============================================= */}

            <div
              className="
                flex
                flex-col
                items-center
                justify-center
              "
            >
              <div className="relative">
                <div
                  className="
                    absolute
                    -inset-5
                    rounded-full
                    blur-2xl
                  "
                  style={{
                    background:
                      `linear-gradient(
                        135deg,
                        ${hexToRgba(
                          branding.buttonColor,
                          0.55
                        )},
                        ${hexToRgba(
                          branding.iconColor,
                          0.22
                        )}
                      )`,
                  }}
                />

                <div
                  className="
                    relative
                    h-52
                    w-52
                    overflow-hidden
                    rounded-full
                    border-4
                    sm:h-60
                    sm:w-60
                  "
                  style={{
                    borderColor:
                      hexToRgba(
                        branding.iconColor,
                        0.65
                      ),
                    boxShadow:
                      `0 0 45px ${hexToRgba(
                        branding.buttonColor,
                        0.35
                      )}`,
                    background:
                      `linear-gradient(
                        135deg,
                        ${branding.buttonColor},
                        #0B2E63
                      )`,
                  }}
                >
                  {trainerImage ? (
                    <img
                      src={trainerImage}
                      alt={trainerName}
                      className="
                        h-full
                        w-full
                        object-cover
                      "
                      onError={(event) => {
                        event.currentTarget.style.display =
                          "none";

                        const fallback =
                          event.currentTarget
                            .parentElement
                            ?.querySelector(
                              "[data-avatar-fallback]"
                            );

                        if (fallback) {
                          fallback.style.display =
                            "flex";
                        }
                      }}
                    />
                  ) : null}

                  <div
                    data-avatar-fallback
                    className={`
                      ${
                        trainerImage
                          ? "hidden"
                          : "flex"
                      }
                      h-full
                      w-full
                      items-center
                      justify-center
                      text-5xl
                      font-black
                    `}
                    style={{
                      color:
                        branding.buttonTextColor,
                      fontFamily:
                        fontFamily(
                          branding.fontHeading
                        ),
                    }}
                  >
                    {initials}
                  </div>
                </div>
              </div>

              {/* SUBCATEGORY */}
              {subcategory && (
                <span
                  className="
                    mt-7
                    rounded-full
                    border
                    px-4
                    py-2
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.16em]
                  "
                  style={{
                    color:
                      branding.iconColor,
                    backgroundColor:
                      hexToRgba(
                        branding.buttonColor,
                        0.1
                      ),
                    borderColor:
                      hexToRgba(
                        branding.buttonColor,
                        0.28
                      ),
                  }}
                >
                  {subcategory}
                </span>
              )}
            </div>


            {/* =============================================
                PROFILE DETAILS
            ============================================= */}

            <div
              className="
                flex
                min-w-0
                flex-col
                justify-center
              "
            >
              <p
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.25em]
                "
                style={{
                  color:
                    branding.iconColor,
                }}
              >
                EXPERT TRAINER
              </p>

              <h1
                className="
                  mt-3
                  break-words
                  text-4xl
                  font-black
                  leading-tight
                  sm:text-5xl
                "
                style={{
                  ...headingStyle,
                  textShadow:
                    `0 0 28px ${hexToRgba(
                      branding.buttonColor,
                      0.18
                    )}`,
                }}
              >
                {trainerName}
              </h1>

              <p
                className="
                  mt-3
                  text-base
                  font-semibold
                  sm:text-lg
                "
                style={{
                  color:
                    branding.subheadingColor,
                }}
              >
                {specialty}
              </p>

              <p
                className="
                  mt-6
                  max-w-3xl
                  text-sm
                  sm:text-base
                "
                style={{
                  ...bodyStyle,
                  opacity: 0.76,
                }}
              >
                {description}
              </p>


              {/* STATS */}
              <div
                className="
                  mt-8
                  grid
                  grid-cols-2
                  gap-3
                  sm:grid-cols-4
                  sm:gap-4
                "
              >
                <StatCard
                  branding={branding}
                  icon={<FaStar />}
                  value={
                    rating > 0
                      ? rating.toFixed(1)
                      : "0.0"
                  }
                  label="Rating"
                />

                <StatCard
                  branding={branding}
                  icon={<FaComment />}
                  value={formatNumber(
                    totalReviews
                  )}
                  label="Reviews"
                />

                <StatCard
                  branding={branding}
                  icon={<FaUsers />}
                  value={formatNumber(
                    totalStudents
                  )}
                  label="Students"
                />

                <StatCard
                  branding={branding}
                  icon={<FaBriefcase />}
                  value={formatNumber(
                    experience
                  )}
                  label="Years Exp"
                />
              </div>
            </div>
          </div>
        </section>


        {/* =================================================
            MAIN CONTENT
        ================================================= */}

        <div
          className="
            mt-8
            grid
            gap-8
            lg:grid-cols-[minmax(0,1fr)_320px]
          "
        >

          {/* ===============================================
              LEFT CONTENT
          =============================================== */}

          <div className="space-y-8">

            {/* =============================================
                DESCRIPTION
            ============================================= */}

            <section
              className="p-6 sm:p-8"
              style={cardStyle}
            >
              <SectionTitle
                title="About The Trainer"
                branding={branding}
              />

              <p
                className="
                  max-w-4xl
                  text-sm
                  sm:text-base
                "
                style={{
                  ...bodyStyle,
                  opacity: 0.72,
                }}
              >
                {description}
              </p>
            </section>


            {/* =============================================
                CERTIFICATIONS
            ============================================= */}

            <section
              className="p-6 sm:p-8"
              style={cardStyle}
            >
              <SectionTitle
                title="Certifications"
                branding={branding}
              />

              {certifications.length > 0 ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  {certifications.map(
                    (certification, index) => (
                      <div
                        key={`${certification}-${index}`}
                        className="
                          flex
                          items-center
                          gap-3
                          rounded-xl
                          border
                          p-4
                        "
                        style={{
                          backgroundColor:
                            hexToRgba(
                              branding.buttonColor,
                              0.055
                            ),
                          borderColor:
                            hexToRgba(
                              branding.buttonColor,
                              0.16
                            ),
                        }}
                      >
                        <span
                          className="
                            flex
                            h-9
                            w-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            border
                          "
                          style={{
                            color:
                              branding.iconColor,
                            backgroundColor:
                              hexToRgba(
                                branding.buttonColor,
                                0.12
                              ),
                            borderColor:
                              hexToRgba(
                                branding.buttonColor,
                                0.22
                              ),
                          }}
                        >
                          <FaCheck className="text-xs" />
                        </span>

                        <span
                          className="text-sm"
                          style={{
                            ...bodyStyle,
                            color:
                              branding.headingColor,
                            opacity: 0.86,
                          }}
                        >
                          {certification}
                        </span>
                      </div>
                    )
                  )}
                </div>
              ) : (
                <p
                  className="text-sm"
                  style={{
                    ...bodyStyle,
                    opacity: 0.55,
                  }}
                >
                  No certifications listed.
                </p>
              )}
            </section>


            {/* =============================================
                TRAINER CLASSES
            ============================================= */}

            <section
              className="p-6 sm:p-8"
              style={cardStyle}
            >
              <div
                className="
                  mb-6
                  flex
                  flex-col
                  gap-2
                  sm:flex-row
                  sm:items-end
                  sm:justify-between
                "
              >
                <div>
                  <SectionTitle
                    title={`Classes by ${trainerName}`}
                    branding={branding}
                  />

                  <p
                    className="
                      -mt-3
                      text-xs
                    "
                    style={{
                      ...bodyStyle,
                      opacity: 0.52,
                    }}
                  >
                    Classes currently associated
                    with this trainer.
                  </p>
                </div>

                {trainerClasses.length > 0 && (
                  <span
                    className="
                      rounded-full
                      border
                      px-3
                      py-1.5
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-wider
                    "
                    style={{
                      color:
                        branding.iconColor,
                      borderColor:
                        hexToRgba(
                          branding.buttonColor,
                          0.2
                        ),
                      backgroundColor:
                        hexToRgba(
                          branding.buttonColor,
                          0.08
                        ),
                    }}
                  >
                    {trainerClasses.length}{" "}
                    {trainerClasses.length === 1
                      ? "Class"
                      : "Classes"}
                  </span>
                )}
              </div>

              {trainerClasses.length > 0 ? (
                <div
                  className="
                    grid
                    gap-5
                    sm:grid-cols-2
                  "
                >
                  {trainerClasses.map(
                    (classItem, index) => (
                      <TrainerClassCard
                        key={
                          classItem?.id ||
                          `${getClassTitle(
                            classItem
                          )}-${index}`
                        }
                        item={classItem}
                        branding={branding}
                      />
                    )
                  )}
                </div>
              ) : (
                <div
                  className="
                    rounded-2xl
                    border
                    px-6
                    py-10
                    text-center
                  "
                  style={{
                    borderColor:
                      hexToRgba(
                        branding.buttonColor,
                        0.14
                      ),
                    backgroundColor:
                      hexToRgba(
                        branding.buttonColor,
                        0.035
                      ),
                  }}
                >
                  <div
                    className="
                      mx-auto
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-full
                      border
                    "
                    style={{
                      color:
                        branding.iconColor,
                      borderColor:
                        hexToRgba(
                          branding.buttonColor,
                          0.2
                        ),
                      backgroundColor:
                        hexToRgba(
                          branding.buttonColor,
                          0.08
                        ),
                    }}
                  >
                    <FaUsers />
                  </div>

                  <p
                    className="mt-4 text-sm"
                    style={{
                      ...bodyStyle,
                      opacity: 0.58,
                    }}
                  >
                    No classes are currently
                    listed for this trainer.
                  </p>
                </div>
              )}
            </section>
          </div>


          {/* ===============================================
              RIGHT SIDEBAR
          =============================================== */}

          <aside className="lg:sticky lg:top-6 lg:self-start">
            <div
              className="space-y-5"
            >

              {/* PROFILE SUMMARY */}
              <section
                className="p-6"
                style={cardStyle}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="
                      h-14
                      w-14
                      overflow-hidden
                      rounded-full
                      border-2
                    "
                    style={{
                      borderColor:
                        hexToRgba(
                          branding.iconColor,
                          0.55
                        ),
                      background:
                        `linear-gradient(
                          135deg,
                          ${branding.buttonColor},
                          #0B2E63
                        )`,
                    }}
                  >
                    {trainerImage ? (
                      <img
                        src={trainerImage}
                        alt={trainerName}
                        className="
                          h-full
                          w-full
                          object-cover
                        "
                        onError={(event) => {
                          event.currentTarget.style.display =
                            "none";
                        }}
                      />
                    ) : (
                      <div
                        className="
                          flex
                          h-full
                          w-full
                          items-center
                          justify-center
                          text-sm
                          font-black
                        "
                        style={{
                          color:
                            branding.buttonTextColor,
                        }}
                      >
                        {initials}
                      </div>
                    )}
                  </div>

                  <div className="min-w-0">
                    <p
                      className="
                        truncate
                        text-sm
                        font-bold
                      "
                      style={headingStyle}
                    >
                      {trainerName}
                    </p>

                    <p
                      className="
                        mt-1
                        truncate
                        text-[10px]
                        uppercase
                        tracking-wider
                      "
                      style={{
                        color:
                          branding.subheadingColor,
                      }}
                    >
                      {specialty}
                    </p>
                  </div>
                </div>

                {subcategory && (
                  <div
                    className="
                      mt-5
                      rounded-xl
                      border
                      px-4
                      py-3
                    "
                    style={{
                      backgroundColor:
                        hexToRgba(
                          branding.buttonColor,
                          0.06
                        ),
                      borderColor:
                        hexToRgba(
                          branding.buttonColor,
                          0.15
                        ),
                    }}
                  >
                    <p
                      className="
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-[0.16em]
                      "
                      style={{
                        color:
                          branding.iconColor,
                      }}
                    >
                      Subcategory
                    </p>

                    <p
                      className="
                        mt-1
                        text-sm
                        font-semibold
                      "
                      style={{
                        color:
                          branding.headingColor,
                      }}
                    >
                      {subcategory}
                    </p>
                  </div>
                )}
              </section>


              {/* EXPERIENCE */}
              <section
                className="p-6"
                style={cardStyle}
              >
                <SectionTitle
                  title="Experience"
                  branding={branding}
                />

                <div
                  className="
                    flex
                    items-center
                    gap-4
                    rounded-2xl
                    border
                    p-4
                  "
                  style={{
                    borderColor:
                      hexToRgba(
                        branding.buttonColor,
                        0.18
                      ),
                    backgroundColor:
                      hexToRgba(
                        branding.buttonColor,
                        0.055
                      ),
                  }}
                >
                  <span
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-xl
                    "
                    style={{
                      color:
                        branding.iconColor,
                      backgroundColor:
                        hexToRgba(
                          branding.buttonColor,
                          0.12
                        ),
                    }}
                  >
                    <FaBriefcase />
                  </span>

                  <div>
                    <p
                      className="
                        text-2xl
                        font-black
                      "
                      style={{
                        color:
                          branding.headingColor,
                      }}
                    >
                      {formatNumber(
                        experience
                      )}
                    </p>

                    <p
                      className="
                        text-[10px]
                        uppercase
                        tracking-wider
                      "
                      style={{
                        color:
                          branding.textColor,
                        opacity: 0.55,
                      }}
                    >
                      Years of Experience
                    </p>
                  </div>
                </div>
              </section>


              {/* RATING */}
              <section
                className="p-6"
                style={cardStyle}
              >
                <SectionTitle
                  title="Trainer Rating"
                  branding={branding}
                />

                <div className="text-center">
                  <div
                    className="
                      flex
                      items-center
                      justify-center
                      gap-2
                    "
                  >
                    <FaStar
                      className="text-xl"
                      style={{
                        color:
                          branding.iconColor,
                      }}
                    />

                    <span
                      className="
                        text-4xl
                        font-black
                      "
                      style={{
                        color:
                          branding.headingColor,
                      }}
                    >
                      {rating > 0
                        ? rating.toFixed(1)
                        : "0.0"}
                    </span>
                  </div>

                  <p
                    className="
                      mt-2
                      text-xs
                    "
                    style={{
                      color:
                        branding.textColor,
                      opacity: 0.55,
                    }}
                  >
                    Based on{" "}
                    {formatNumber(
                      totalReviews
                    )}{" "}
                    reviews
                  </p>
                </div>
              </section>

            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};


export default WebsiteTrainerProfile;
