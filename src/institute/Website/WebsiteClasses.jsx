
import React, { useEffect, useMemo, useState } from "react";

import {
  useNavigate,
  useOutletContext,
  useLocation,
} from "react-router-dom";

import {
  FaArrowRight,
  FaCalendarAlt,
  FaCalendarWeek,
  FaClock,
  FaSearch,
  FaUsers,
  FaTimes,
} from "react-icons/fa";
import WebsiteBooking from "./WebsiteBooking";
import API from "../../services/api";

/* =========================================================
   BLACK + RADIANT BLUE THEME
========================================================= */

const COLORS = {
  black: "#000000",
  page: "#000000",
  pageSecondary: "#02050A",

  card: "#071426",
  cardSecondary: "#06111F",
  cardHover: "#0A1B30",

  blue: "#008CFF",
  radiantBlue: "#38D7FF",
  blueLight: "#60A5FA",

  white: "#FFFFFF",
  heading: "#F8FAFC",
  text: "#FFFFFF",
  textBright: "#E2E8F0",
  muted: "#FFFFFF",

  border: "rgba(0,140,255,0.35)",
  borderSoft: "rgba(0,140,255,0.18)",
  borderStrong: "rgba(56,215,255,0.55)",

  blueGlow: "rgba(0,140,255,0.35)",
  radiantGlow: "rgba(56,215,255,0.30)",
};

/* =========================================================
   DEFAULT BRANDING
========================================================= */

const DEFAULT_BRANDING = {
  navbarColor: COLORS.black,
  navbarTextColor: COLORS.white,

  headingColor: COLORS.heading,
  subheadingColor: COLORS.radiantBlue,
  textColor: COLORS.text,
  iconColor: COLORS.radiantBlue,

  buttonColor: COLORS.blue,
  buttonTextColor: COLORS.white,

  cardBackgroundColor: COLORS.card,

  fontHeading: "Inter",
  fontSubheading: "Inter",
  fontBody: "Inter",

  headingWeight: 700,
  headingLineHeight: 1.15,
  headingLetterSpacing: "0px",

  subheadingWeight: 500,
  subheadingLineHeight: 1.4,

  bodyWeight: 400,
  bodyLineHeight: 1.6,
  bodyLetterSpacing: "0px",

  roundedButtons: true,
};

/* =========================================================
   BRANDING HELPER
========================================================= */

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

/* =========================================================
   GET BRANDING
   IMPORTANT:
   Text colors are FORCE-LOCKED to visible colors.
========================================================= */

const getBranding = (
  branding = {}
) => {
  const result = {
    ...DEFAULT_BRANDING,

    fontHeading:
      getBrandingValue(
        branding,
        "fontHeading",
        "font_heading",
        DEFAULT_BRANDING.fontHeading
      ),

    fontSubheading:
      getBrandingValue(
        branding,
        "fontSubheading",
        "font_subheading",
        DEFAULT_BRANDING.fontSubheading
      ),

    fontBody:
      getBrandingValue(
        branding,
        "fontBody",
        "font_body",
        DEFAULT_BRANDING.fontBody
      ),

    headingWeight:
      getBrandingValue(
        branding,
        "headingWeight",
        "heading_weight",
        DEFAULT_BRANDING.headingWeight
      ),

    headingLineHeight:
      getBrandingValue(
        branding,
        "headingLineHeight",
        "heading_line_height",
        DEFAULT_BRANDING.headingLineHeight
      ),

    headingLetterSpacing:
      getBrandingValue(
        branding,
        "headingLetterSpacing",
        "heading_letter_spacing",
        DEFAULT_BRANDING.headingLetterSpacing
      ),

    subheadingWeight:
      getBrandingValue(
        branding,
        "subheadingWeight",
        "subheading_weight",
        DEFAULT_BRANDING.subheadingWeight
      ),

    subheadingLineHeight:
      getBrandingValue(
        branding,
        "subheadingLineHeight",
        "subheading_line_height",
        DEFAULT_BRANDING.subheadingLineHeight
      ),

    bodyWeight:
      getBrandingValue(
        branding,
        "bodyWeight",
        "body_weight",
        DEFAULT_BRANDING.bodyWeight
      ),

    bodyLineHeight:
      getBrandingValue(
        branding,
        "bodyLineHeight",
        "body_line_height",
        DEFAULT_BRANDING.bodyLineHeight
      ),

    bodyLetterSpacing:
      getBrandingValue(
        branding,
        "bodyLetterSpacing",
        "body_letter_spacing",
        DEFAULT_BRANDING.bodyLetterSpacing
      ),
  };

  /*
   * IMPORTANT:
   * Never allow old database branding to make text
   * invisible on the black website.
   */

  result.pageBackgroundColor =
    COLORS.black;

  result.headingColor =
    COLORS.heading;

  result.subheadingColor =
    COLORS.radiantBlue;

  result.textColor =
    COLORS.text;

  result.iconColor =
    COLORS.radiantBlue;

  result.buttonColor =
    COLORS.blue;

  result.buttonTextColor =
    COLORS.white;

  result.cardBackgroundColor =
    COLORS.card;

  return result;
};

/* =========================================================
   FONT
========================================================= */

const fontFamily = (
  font
) =>
  font
    ? `'${font}', sans-serif`
    : "Inter, sans-serif";

/* =========================================================
   OPACITY HELPER
========================================================= */

const withOpacity = (
  color,
  opacity = "18"
) => {
  if (
    typeof color === "string" &&
    /^#[0-9a-fA-F]{6}$/.test(color)
  ) {
    return `${color}${opacity}`;
  }

  return color;
};

/* =========================================================
   VALUE HELPER
========================================================= */

const getValue = (
  ...values
) =>
  values.find(
    (value) =>
      value !== undefined &&
      value !== null &&
      String(value).trim() !== ""
  );

/* =========================================================
   ENABLED HELPER
========================================================= */

const isEnabled = (
  value,
  defaultValue = true
) => {
  if (
    value === undefined ||
    value === null
  ) {
    return defaultValue;
  }

  if (
    [
      true,
      1,
      "1",
      "true",
      "TRUE",
    ].includes(value)
  ) {
    return true;
  }

  if (
    [
      false,
      0,
      "0",
      "false",
      "FALSE",
    ].includes(value)
  ) {
    return false;
  }

  return defaultValue;
};

/* =========================================================
   SECTION HELPER
========================================================= */

const findSection = (
  sections,
  ...keys
) => {
  if (!Array.isArray(sections)) {
    return null;
  }

  const normalizedKeys =
    keys.map((key) =>
      String(key)
        .trim()
        .toLowerCase()
        .replace(
          /[\s-]+/g,
          "_"
        )
    );

  return (
    sections.find(
      (section) => {
        const candidates = [
          section?.section_key,
          section?.sectionKey,
          section?.section_name,
          section?.sectionName,
          section?.key,
          section?.name,
          section?.slug,
          section?.page_section,
          section?.pageSection,
        ];

        return candidates.some(
          (candidate) => {
            if (
              candidate ===
                undefined ||
              candidate === null
            ) {
              return false;
            }

            const normalized =
              String(candidate)
                .trim()
                .toLowerCase()
                .replace(
                  /[\s-]+/g,
                  "_"
                );

            return normalizedKeys.includes(
              normalized
            );
          }
        );
      }
    ) || null
  );
};

/* =========================================================
   CONTENT HELPER
========================================================= */

const findContent = (
  content,
  keys
) => {
  if (
    !content ||
    typeof content !== "object"
  ) {
    return "";
  }

  for (const key of keys) {
    const value =
      content?.[key];

    if (
      value !== undefined &&
      value !== null &&
      String(value).trim() !== ""
    ) {
      return value;
    }
  }

  return "";
};

/* =========================================================
   CLASS HELPERS
========================================================= */

const getClassId = (
  item
) =>
  item?.id ??
  item?.class_id ??
  item?.classId;

const getClassTitle = (
  item
) =>
  item?.title ||
  item?.class_title ||
  item?.classTitle ||
  item?.name ||
  "Class";

const getClassImage = (
  item
) =>
  item?.image ||
  item?.class_image ||
  item?.classImage ||
  item?.image_url ||
  item?.thumbnail ||
  item?.thumbnail_url ||
  "";

const getInstituteName = (
  item
) =>
  item?.institute_name ||
  item?.institute?.name ||
  item?.instituteName ||
  "Institute";

const getCategoryName = (
  item
) =>
  item?.category_name ||
  item?.category?.name ||
  item?.categoryName ||
  "Category";

const getSubcategoryName = (
  item
) =>
  item?.subcategory_name ||
  item?.subcategory?.name ||
  item?.subcategoryName ||
  "General";

const getTrainerName = (
  item
) =>
  item?.trainer_name ||
  item?.trainerName ||
  item?.trainer?.name ||
  "Expert Trainer";

const getTrainerImage = (
  item
) =>
  item?.trainer_image ||
  item?.trainerImage ||
  item?.trainer?.image ||
  item?.trainer?.image_url ||
  "";

const getLevel = (
  item
) =>
  item?.level ||
  item?.class_level ||
  item?.difficulty ||
  "All Levels";

const getDuration = (
  item
) =>
  item?.duration ||
  item?.class_duration ||
  item?.duration_minutes ||
  "--";

/* =========================================================
   DAYS
========================================================= */

const getAvailableDays = (
  item
) => {
  const value =
    item?.available_days ??
    item?.availableDays ??
    item?.days ??
    item?.schedule_days;

  if (Array.isArray(value)) {
    return value.filter(Boolean);
  }

  if (typeof value === "string") {
    const trimmed =
      value.trim();

    if (!trimmed) {
      return [];
    }

    try {
      const parsed =
        JSON.parse(trimmed);

      if (Array.isArray(parsed)) {
        return parsed.filter(
          Boolean
        );
      }
    } catch {
      // fallback
    }

    return trimmed
      .split(",")
      .map((day) =>
        day.trim()
      )
      .filter(Boolean);
  }

  return [];
};

/* =========================================================
   DATE
========================================================= */

const formatDate = (
  dateValue
) => {
  if (!dateValue) {
    return "--";
  }

  const date =
    new Date(dateValue);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return String(
      dateValue
    );
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
   TIME
========================================================= */

const formatTime = (
  timeValue
) => {
  if (!timeValue) {
    return "--";
  }

  const value =
    String(timeValue);

  if (
    /am|pm/i.test(value)
  ) {
    return value;
  }

  const parts =
    value.split(":");

  if (parts.length < 2) {
    return value;
  }

  const hours =
    Number(parts[0]);

  const minutes =
    Number(parts[1]);

  if (
    Number.isNaN(hours) ||
    Number.isNaN(minutes)
  ) {
    return value;
  }

  const period =
    hours >= 12
      ? "PM"
      : "AM";

  const hour12 =
    hours % 12 || 12;

  return `${hour12}:${String(
    minutes
  ).padStart(
    2,
    "0"
  )} ${period}`;
};

/* =========================================================
   TIMEZONE
========================================================= */

const formatTimeWithTimezone = (
  date,
  time,
  timezone
) => {
  if (!date || !time) {
    return "--";
  }

  try {
    const dateTime =
      new Date(
        `${date}T${time}`
      );

    if (
      Number.isNaN(
        dateTime.getTime()
      )
    ) {
      return `${formatTime(
        time
      )} ${timezone || ""}`.trim();
    }

    return dateTime.toLocaleTimeString(
      "en-IN",
      {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone:
          timezone ||
          "Asia/Kolkata",
        timeZoneName: "short",
      }
    );
  } catch {
    return `${formatTime(
      time
    )} ${timezone || ""}`.trim();
  }
};

/* =========================================================
   IMAGE HELPER
========================================================= */

const getImage = (
  item,
  type = "category"
) => {
  if (!item) {
    return "";
  }

  if (
    type ===
    "subcategory"
  ) {
    return (
      item?.image ||
      item?.subcategory_image ||
      item?.subcategoryImage ||
      item?.image_url ||
      item?.thumbnail ||
      item?.thumbnail_url ||
      ""
    );
  }

  return (
    item?.image ||
    item?.category_image ||
    item?.categoryImage ||
    item?.image_url ||
    item?.thumbnail ||
    item?.thumbnail_url ||
    ""
  );
};

/* =========================================================
   ID HELPERS
========================================================= */

const getId = (
  item
) =>
  item?.id ??
  item?.category_id ??
  item?.categoryId;

const getSubcategoryId = (
  item
) =>
  item?.id ??
  item?.subcategory_id ??
  item?.subcategoryId;

const getCategoryIdFromSubcategory =
  (item) =>
    item?.category_id ??
    item?.categoryId ??
    item?.category?.id;

const getItemCategoryId = (
  item
) =>
  item?.category_id ??
  item?.categoryId ??
  item?.category?.id;

const getItemSubcategoryId = (
  item
) =>
  item?.subcategory_id ??
  item?.subcategoryId ??
  item?.subcategory?.id;

/* =========================================================
   SECTION HEADING
========================================================= */

const SectionHeading = ({
  eyebrow,
  heading,
  subheading,
  branding,
}) => (
  <div className="mx-0 mb-4 max-w-3xl text-left">

    {eyebrow && (
      <p
        className="mb-3 text-xs font-bold uppercase tracking-[0.28em]"
        style={{
          color:
            COLORS.radiantBlue,

          fontFamily:
            fontFamily(
              branding.fontSubheading
            ),

          textShadow:
            "0 0 12px rgba(56,215,255,0.3)",
        }}
      >
        {eyebrow}
      </p>
    )}

   <div className="flex items-center justify-start">
  <h2
    className="text-3xl sm:text-4xl"
    style={{
      color: COLORS.white,
      fontFamily: fontFamily(branding.fontHeading),
      fontWeight: branding.headingWeight,
      lineHeight: branding.headingLineHeight,
      letterSpacing: branding.headingLetterSpacing,
      textShadow: "0 0 25px rgba(0,140,255,0.15)",
    }}
  >
    {heading}
  </h2>
</div>

    {subheading && (
      <p
        className="mt-2 max-w-2xl text-left text-sm leading-6 sm:text-base"
        style={{
          color:
            COLORS.textBright,

          fontFamily:
            fontFamily(
              branding.fontBody
            ),

          fontWeight:
            branding.bodyWeight,
        }}
      >
        {subheading}
      </p>
    )}

  </div>
);

/* =========================================================
   STARS
========================================================= */

const Stars = ({
  rating,
}) => {
  const value =
    Math.max(
      0,
      Math.min(
        5,
        Number(rating) || 0
      )
    );

  return (
    <div className="flex items-center gap-2">

      <span className="text-xs tracking-[2px]">

        {[1, 2, 3, 4, 5].map(
          (star) => (
            <span
              key={star}
              style={{
                color:
                  star <=
                  Math.round(
                    value
                  )
                    ? COLORS.radiantBlue
                    : "rgba(148,163,184,0.35)",
              }}
            >
              ★
            </span>
          )
        )}

      </span>

      <span
        className="text-xs font-semibold"
        style={{
          color:
            COLORS.radiantBlue,
        }}
      >
        {value.toFixed(1)}
      </span>

    </div>
  );
};

/* =========================================================
   CATEGORY CARD
========================================================= */

const CategoryCard = ({
  category,
  count,
  active,
  onClick,
}) => {
  const name =
    category?.name ||
    category?.category_name ||
    category?.title ||
    "Category";

  const image =
    getImage(
      category,
      "category"
    );

  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative overflow-hidden rounded-lg border text-left transition-all duration-300 hover:-translate-y-1"
      style={{
        background:
          "#000000",

        borderColor:
          active
            ? COLORS.radiantBlue
            : COLORS.border,

        boxShadow:
          active
            ? "0 0 0 1px rgba(0,140,255,0.35),0 0 35px rgba(0,140,255,0.16)"
            : "0 12px 35px rgba(0,0,0,0.35)",
      }}
    >

      <div className="relative h-44 w-full overflow-hidden bg-black">

        {image ? (
          <img
            src={image}
            alt={name}
            className="h-full w-full bg-black object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center"
            style={{
              background:
                "#000000",
            }}
          >
            <span
              className="text-5xl font-bold"
              style={{
                color:
                  COLORS.radiantBlue,

                textShadow:
                  "0 0 25px rgba(56,215,255,0.45)",
              }}
            >
              {String(name)
                .charAt(0)
                .toUpperCase()}
            </span>
          </div>
        )}

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top,rgba(0,0,0,0.95),transparent 60%)",
          }}
        />

        {active && (
          <span
            className="absolute right-3 top-3 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
            style={{
              background:
                COLORS.blue,

              color:
                COLORS.white,

              boxShadow:
                "0 0 18px rgba(0,140,255,0.55)",
            }}
          >
            Selected
          </span>
        )}

      </div>

      <div className="flex items-center justify-between gap-3 p-4">

        <div className="min-w-0">

          <h3
            className="truncate text-base"
            style={{
              color:
                COLORS.white,

              fontWeight: 700,
            }}
          >
            {name}
          </h3>

          <p
            className="mt-1 text-xs"
            style={{
              color:
                COLORS.text,
            }}
          >
            {count}{" "}
            {count === 1
              ? "Class"
              : "Classes"}
          </p>

        </div>

        <FaArrowRight
          size={13}
          className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
          style={{
            color:
              COLORS.radiantBlue,

            filter:
              "drop-shadow(0 0 6px rgba(56,215,255,0.5))",
          }}
        />

      </div>

    </button>
  );
};

/* =========================================================
   SUBCATEGORY CARD
========================================================= */

const SubcategoryCard = ({
  subcategory,
  count,
  active,
  onClick,
}) => {
  const name =
    subcategory?.name ||
    subcategory?.subcategory_name ||
    subcategory?.title ||
    "Subcategory";

  const image =
    getImage(
      subcategory,
      "subcategory"
    );

  return (
    <button
      type="button"
      onClick={onClick}
      className="group overflow-hidden rounded-lg border text-left transition-all duration-300 hover:-translate-y-1"
      style={{
        background:
          "#000000",

        borderColor:
          active
            ? COLORS.radiantBlue
            : COLORS.border,

        boxShadow:
          active
            ? "0 0 30px rgba(0,140,255,0.15)"
            : "none",
      }}
    >

      <div className="relative h-36 w-full overflow-hidden bg-black">

        {image ? (
          <img
            src={image}
            alt={name}
            className="h-full w-full bg-black object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center"
            style={{
              background:
                "#000000",
            }}
          >
            <span
              className="text-4xl font-bold"
              style={{
                color:
                  COLORS.radiantBlue,

                textShadow:
                  "0 0 20px rgba(56,215,255,0.4)",
              }}
            >
              {String(name)
                .charAt(0)
                .toUpperCase()}
            </span>
          </div>
        )}

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top,rgba(0,0,0,0.9),transparent 60%)",
          }}
        />

        {active && (
          <span
            className="absolute right-3 top-3 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
            style={{
              background:
                COLORS.blue,

              color:
                COLORS.white,

              boxShadow:
                "0 0 16px rgba(0,140,255,0.5)",
            }}
          >
            Selected
          </span>
        )}

      </div>

      <div className="flex items-center justify-between gap-3 p-4">

        <div className="min-w-0">

          <h3
            className="truncate text-sm sm:text-base"
            style={{
              color:
                COLORS.white,

              fontWeight: 700,
            }}
          >
            {name}
          </h3>

          <p
            className="mt-1 text-xs"
            style={{
              color:
                COLORS.text,
            }}
          >
            {count}{" "}
            {count === 1
              ? "Class"
              : "Classes"}
          </p>

        </div>

        <FaArrowRight
          size={12}
          className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
          style={{
            color:
              COLORS.radiantBlue,
          }}
        />

      </div>

    </button>
  );
};

/* =========================================================
   INFO
========================================================= */

const Info = ({
  icon,
  label,
  value,
}) => (
  <div className="flex min-w-0 items-start gap-2">

    <span
      className="mt-0.5 shrink-0"
      style={{
        color:
          COLORS.radiantBlue,

        filter:
          "drop-shadow(0 0 5px rgba(56,215,255,0.35))",
      }}
    >
      {icon}
    </span>

    <div className="min-w-0">

      <p
        className="text-[10px]"
        style={{
          color:
            COLORS.muted,
        }}
      >
        {label}
      </p>

      <p
        className="truncate text-xs font-semibold"
        style={{
          color:
            COLORS.textBright,
        }}
        title={String(value)}
      >
        {value}
      </p>

    </div>

  </div>
);

/* =========================================================
   CLASS CARD
========================================================= */

const ClassCard = ({
  item,
  onBook,
}) => {
  const navigate = useNavigate();

  const classId = getClassId(item);
  const title = getClassTitle(item);
  const image = getClassImage(item) || "";
  const category = getCategoryName(item) || item?.category?.name || "--";
  const subcategory = getSubcategoryName(item) || "--";
  const trainerName = getTrainerName(item) || "Trainer";
  const trainerImage = getTrainerImage(item) || "";
  const level = getLevel(item) || "--";
  const duration = getDuration(item) || "--";

  const trainerRating = Number(
    item?.trainer_rating ??
    item?.trainerRating ??
    item?.trainer?.rating ??
    item?.rating ??
    0
  );

  const trainerReviews = Number(
    item?.trainer_total_reviews ??
    item?.trainerTotalReviews ??
    item?.trainer?.total_reviews ??
    item?.trainer?.totalReviews ??
    0
  );

  const startDate = item?.start_date ?? item?.startDate ?? item?.date ?? null;
  const startTime = item?.start_time ?? item?.startTime ?? item?.time ?? null;
  const timezone = item?.timezone ?? item?.class_timezone ?? "Asia/Kolkata";
  const price = Number(item?.price ?? 0);
  const students = Number(
    item?.students_count ??
    item?.students ??
    item?.studentsCount ??
    0
  );

  const classType = String(
    item?.class_type ??
    item?.classType ??
    item?.class_type_name ??
    item?.classTypeName ??
    item?.delivery_type ??
    item?.deliveryType ??
    item?.session_type ??
    item?.sessionType ??
    item?.mode ??
    item?.type ??
    "--"
  );

  const formattedTime = startDate && startTime
    ? formatTimeWithTimezone(startDate, startTime, timezone)
    : formatTime(startTime);

  const handleDetails = () => {
    if (!classId) return;
    navigate(`/institute/website/preview/classes/${classId}`);
  };

  const handleBook = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (typeof onBook === "function") onBook(item);
  };

  return (
    <article
      className="group flex h-full min-w-0 flex-col overflow-hidden rounded-lg border transition-all duration-300 hover:-translate-y-1"
      style={{
        background: "#000000",
        borderColor: COLORS.border,
        boxShadow: "0 10px 28px rgba(0,0,0,0.32)",
      }}
    >
      {/* Compact class image */}
      <button
        type="button"
        onClick={handleDetails}
        className="relative block h-32 w-full shrink-0 overflow-hidden rounded-t-lg bg-black text-left sm:h-36"
        aria-label={`View details for ${title}`}
      >
        {image ? (
          <img
            src={image}
            alt={title}
            className="h-full w-full bg-black object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-black text-sm" style={{ color: COLORS.muted }}>
            No class image
          </div>
        )}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top,rgba(0,0,0,0.88),rgba(0,0,0,0.02) 70%)" }}
        />
        <span
          className="absolute left-2 top-2 max-w-[85%] truncate rounded-lg px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide"
          style={{
            background: "rgba(0,140,255,0.94)",
            color: COLORS.white,
            boxShadow: "0 0 12px rgba(0,140,255,0.28)",
          }}
        >
          {classType}
        </span>
      </button>

      <div className="flex flex-1 flex-col p-3">
        <h3
          className="line-clamp-2 text-base font-bold leading-snug"
          style={{ color: COLORS.white, minHeight: "2.5rem" }}
          title={title}
        >
          {title}
        </h3>

        {/* Category and subcategory */}
        <div className="mt-1 flex flex-wrap gap-x-2 gap-y-1 text-[11px]">
          <span className="truncate" style={{ color: COLORS.radiantBlue }}>{category}</span>
          <span style={{ color: COLORS.muted }}>·</span>
          <span className="truncate" style={{ color: COLORS.text }}>{subcategory}</span>
        </div>

        {/* Compact details grid */}
        <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-xs">
          <Info icon={<FaClock />} label="Duration" value={duration} />
          <Info icon={<span className="text-[11px]">◈</span>} label="Level" value={level} />
          <Info icon={<FaClock />} label="Time" value={formattedTime || "--"} />
          <Info icon={<FaCalendarAlt />} label="Date" value={formatDate(startDate)} />
          <Info icon={<FaUsers />} label="Students" value={students.toLocaleString("en-IN")} />
          <Info icon={<span className="text-[11px]">₹</span>} label="Price" value={`₹${price.toLocaleString("en-IN")}`} />
        </div>

        {/* Trainer row */}
        <div className="mt-3 flex min-w-0 items-center gap-2 border-t pt-2.5" style={{ borderColor: COLORS.borderSoft }}>
          {trainerImage ? (
            <img
              src={trainerImage}
              alt={trainerName}
              className="h-8 w-8 shrink-0 rounded-full bg-black object-cover"
              style={{ border: `1px solid ${COLORS.blue}` }}
              loading="lazy"
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black text-xs font-bold" style={{ color: COLORS.radiantBlue, border: `1px solid ${COLORS.blue}` }}>
              {trainerName.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold" style={{ color: COLORS.white }}>{trainerName}</p>
            <div className="flex items-center gap-1">
              <Stars rating={trainerRating} />
              <span className="text-[10px]" style={{ color: COLORS.muted }}>
                {trainerRating ? trainerRating.toFixed(1) : "No rating"}
                {trainerReviews > 0 ? ` (${trainerReviews})` : ""}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-3 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={handleBook}
            className="rounded-lg px-2 py-2 text-xs font-bold transition-all hover:brightness-110"
            style={{
              background: `linear-gradient(135deg, ${COLORS.blue}, ${COLORS.radiantBlue})`,
              color: COLORS.black,
              boxShadow: "0 0 14px rgba(0,140,255,0.2)",
            }}
          >
            Book Now
          </button>
          <button
            type="button"
            onClick={handleDetails}
            className="rounded-lg border px-2 py-2 text-xs font-bold transition-colors hover:bg-blue-500/10"
            style={{ color: COLORS.white, borderColor: COLORS.blue, background: "#000000" }}
          >
            View Details
          </button>
        </div>
      </div>
    </article>
  );
};

/* =========================================================
   EMPTY STATE
========================================================= */

const EmptyState = ({
  title,
  text,
  action,
}) => (
  <div
    className="rounded-lg border border-dashed px-6 py-10 text-center"
    style={{
      background:
        "#000000",

      borderColor:
        COLORS.border,

      boxShadow:
        "0 15px 50px rgba(0,0,0,0.4)",
    }}
  >

    <div
      className="mx-auto flex h-14 w-14 items-center justify-center rounded-full"
      style={{
        background:
          "rgba(0,140,255,0.1)",

        color:
          COLORS.radiantBlue,

        boxShadow:
          "0 0 25px rgba(0,140,255,0.15)",
      }}
    >
      <FaSearch
        size={19}
      />
    </div>

    <h3
      className="mt-5 text-xl"
      style={{
        color:
          COLORS.white,

        fontWeight:
          700,
      }}
    >
      {title}
    </h3>

    <p
      className="mx-auto mt-2 max-w-md text-sm"
      style={{
        color:
          COLORS.text,
      }}
    >
      {text}
    </p>

    {action}

  </div>
);

/* =========================================================
   MAIN WEBSITE CLASSES
========================================================= */

const WebsiteClasses = () => {
  const outlet =
    useOutletContext() || {};

  const location =
    useLocation();

  /* =======================================================
     WEBSITE DATA
  ======================================================= */

  const website =
    outlet?.website ||
    outlet?.websiteData ||
    {};

  const classes =
    outlet?.classes ||
    website?.classes ||
    [];

  const categories =
    outlet?.categories ||
    website?.categories ||
    [];

  const subcategories =
    outlet?.subcategories ||
    website?.subcategories ||
    [];

  /* =======================================================
     BANNERS
  ======================================================= */

  const outletBanners =
    outlet?.banners ||
    website?.banners ||
    [];

  /* =======================================================
     BRANDING
  ======================================================= */

  const rawBranding =
    outlet?.branding ||
    website?.branding ||
    {};

  const branding =
    useMemo(
      () =>
        getBranding(
          rawBranding
        ),
      [rawBranding]
    );

  /* =======================================================
     SECTIONS
  ======================================================= */

  const rawSections =
    outlet?.sections ||
    website?.sections ||
    website?.websiteSections ||
    website?.website_sections ||
    [];

  const sections =
    Array.isArray(
      rawSections
    )
      ? rawSections
      : [];

  /* =======================================================
     CONTENT
  ======================================================= */

  const rawContent =
    outlet?.content ||
    website?.content ||
    website?.websiteContent ||
    website?.website_content ||
    {};

  const classesContent =
    rawContent?.classes ||
    rawContent?.Classes ||
    website?.content
      ?.classes ||
    website?.content
      ?.Classes ||
    {};

  const pageHeading =
    findContent(
      classesContent,
      [
        "heading",
        "page_heading",
        "pageHeading",
        "title",
        "main_heading",
        "mainHeading",
      ]
    ) ||
    "Explore Classes";

  const pageSubheading =
    findContent(
      classesContent,
      [
        "subheading",
        "sub_heading",
        "subHeading",
        "page_subheading",
        "pageSubheading",
      ]
    ) ||
    "Choose a category, explore its subcategories, and find the right class for you.";

  const categoriesContent =
    classesContent?.categories ||
    classesContent?.Categories ||
    {};

  const categoriesHeading =
    findContent(
      categoriesContent,
      [
        "heading",
        "title",
        "main_heading",
        "mainHeading",
      ]
    ) ||
    "Explore Categories";

  const categoriesSubheading =
    findContent(
      categoriesContent,
      [
        "subheading",
        "sub_heading",
        "subHeading",
      ]
    ) ||
    "Discover creative categories and choose where you want to learn.";

  const subcategoriesContent =
    classesContent?.subcategories ||
    classesContent?.subCategories ||
    classesContent?.subcategory ||
    {};

  const subcategoriesHeading =
    findContent(
      subcategoriesContent,
      [
        "heading",
        "title",
        "main_heading",
        "mainHeading",
      ]
    ) ||
    "Explore Subcategories";

  const subcategoriesSubheading =
    findContent(
      subcategoriesContent,
      [
        "subheading",
        "sub_heading",
        "subHeading",
      ]
    ) ||
    "Choose a specialized area within your selected category.";

  const classesListContent =
    classesContent?.classes ||
    classesContent?.class_list ||
    classesContent?.classList ||
    classesContent?.list ||
    {};

  const classesListHeading =
    findContent(
      classesListContent,
      [
        "heading",
        "title",
        "main_heading",
        "mainHeading",
      ]
    ) ||
    "Available Classes";

  const classesListSubheading =
    findContent(
      classesListContent,
      [
        "subheading",
        "sub_heading",
        "subHeading",
      ]
    ) ||
    "Choose from expert-led classes and start your creative journey.";

  const [
    fetchedClasses,
    setFetchedClasses,
  ] = useState([]);

  const [
    classesLoading,
    setClassesLoading,
  ] = useState(false);

  /* =======================================================
     NORMALIZE DATA
  ======================================================= */

  const classData =
    useMemo(() => {
      if (fetchedClasses.length > 0) {
        return fetchedClasses;
      }

      return Array.isArray(classes)
        ? classes
        : [];
    }, [
      fetchedClasses,
      classes,
    ]);

  const categoryData =
    useMemo(() => {
      const source =
        Array.isArray(
          categories
        )
          ? categories
          : [];

      const seen =
        new Set();

      return source.filter(
        (category) => {
          const id =
            getId(
              category
            );

          if (
            id === undefined ||
            id === null
          ) {
            return false;
          }

          const key =
            String(id);

          if (
            seen.has(key)
          ) {
            return false;
          }

          seen.add(key);

          return true;
        }
      );
    }, [categories]);

  const subcategoryData =
    useMemo(() => {
      const source =
        Array.isArray(
          subcategories
        )
          ? subcategories
          : [];

      const seen =
        new Set();

      return source.filter(
        (subcategory) => {
          const id =
            getSubcategoryId(
              subcategory
            );

          const categoryId =
            getCategoryIdFromSubcategory(
              subcategory
            );

          if (
            id === undefined ||
            id === null ||
            categoryId ===
              undefined ||
            categoryId === null
          ) {
            return false;
          }

          const key =
            `${categoryId}-${id}`;

          if (
            seen.has(key)
          ) {
            return false;
          }

          seen.add(key);

          return true;
        }
      );
    }, [subcategories]);

  /* =======================================================
     SECTION VISIBILITY
  ======================================================= */

  const bannerSection =
    findSection(
      sections,
      "classes_banner",
      "class_banner",
      "classes_hero",
      "class_hero",
      "banner"
    );

  const categoriesSection =
    findSection(
      sections,
      "classes_categories",
      "class_categories",
      "categories"
    );

  const classesSection =
    findSection(
      sections,
      "classes_list",
      "class_list",
      "classes"
    );

  const showBanner =
    isEnabled(
      bannerSection?.is_visible ??
        bannerSection?.isVisible ??
        bannerSection?.visible ??
        bannerSection?.enabled,
      true
    );

  const showCategories =
    isEnabled(
      categoriesSection?.is_visible ??
        categoriesSection?.isVisible ??
        categoriesSection?.visible ??
        categoriesSection?.enabled,
      true
    );

  const showClasses =
    isEnabled(
      classesSection?.is_visible ??
        classesSection?.isVisible ??
        classesSection?.visible ??
        classesSection?.enabled,
      true
    );

  /* =======================================================
     INSTITUTE ID
  ======================================================= */

  const resolveInstituteId =
    () => {
      const candidates = [
        outlet?.instituteId,
        outlet?.institute_id,

        outlet?.institute?.id,
        outlet?.institute
          ?.institute_id,

        website?.institute_id,
        website?.instituteId,

        outlet?.websiteData
          ?.institute?.id,

        outlet?.websiteData
          ?.institute
          ?.institute_id,

        localStorage.getItem(
          "previewInstituteId"
        ),

        sessionStorage.getItem(
          "previewInstituteId"
        ),

        localStorage.getItem(
          "instituteId"
        ),

        sessionStorage.getItem(
          "instituteId"
        ),

        new URLSearchParams(
          location.search
        ).get(
          "institute_id"
        ),
      ];

      for (
        const value of
          candidates
      ) {
        if (
          value !==
            undefined &&
          value !== null &&
          String(value).trim() !==
            ""
        ) {
          const id =
            Number(value);

          if (
            Number.isInteger(id) &&
            id > 0
          ) {
            return id;
          }
        }
      }

      return null;
    };

  /* =======================================================
     BANNER STATE
  ======================================================= */

  const [
    fetchedBanners,
    setFetchedBanners,
  ] = useState([]);

  const [
    bannersLoading,
    setBannersLoading,
  ] = useState(false);

  useEffect(() => {
    let cancelled =
      false;

    const loadBanners =
      async () => {
        const instituteId =
          resolveInstituteId();

        if (!instituteId) {
          return;
        }

        try {
          setBannersLoading(
            true
          );

          const response =
            await API.get(
              `/websites/public/${instituteId}`,
              {
                params: {
                  preview: true,
                },
              }
            );

          if (
            cancelled
          ) {
            return;
          }

          const result =
            response?.data
              ?.data ??
            response?.data ??
            {};

          const apiBanners =
            Array.isArray(
              result?.banners
            )
              ? result.banners
              : [];

          setFetchedBanners(
            apiBanners
          );
        } catch (
          error
        ) {
          if (
            cancelled
          ) {
            return;
          }

          console.error(
            "WebsiteClasses banner error:",
            error?.response
              ?.data ||
              error
          );

          setFetchedBanners(
            []
          );
        } finally {
          if (
            !cancelled
          ) {
            setBannersLoading(
              false
            );
          }
        }
      };

    loadBanners();

    return () => {
      cancelled = true;
    };
  }, [location.search]);

  /* =======================================================
     BANNER DATA
  ======================================================= */

  const bannerData =
    useMemo(() => {
      const source =
        fetchedBanners.length >
        0
          ? fetchedBanners
          : Array.isArray(
                outletBanners
            )
            ? outletBanners
            : [];

      return source
        .filter(Boolean)
        .filter(
          (banner) => {
            const type =
              String(
                banner?.banner_type ??
                  banner?.bannerType ??
                  banner?.type ??
                  ""
              )
                .trim()
                .toUpperCase();

            const active =
              banner?.is_active ??
              banner?.isActive ??
              banner?.active ??
              true;

            const isActive =
              active === true ||
              active === 1 ||
              active === "1" ||
              active === "true" ||
              active === "TRUE";

            const isClasses =
  [
    "CLASS",
    "CLASSES",
    "CLASS_PAGE",
    "CLASSES_PAGE",
  ].includes(type);

return isActive && isClasses;
          }
        )
        .sort(
          (a, b) =>
            Number(
              a?.display_order ??
                a?.displayOrder ??
                999
            ) -
            Number(
              b?.display_order ??
                b?.displayOrder ??
                999
            )
        );
    }, [
      fetchedBanners,
      outletBanners,
    ]);

  const currentBanner =
    bannerData[0] ||
    null;

  const bannerImage =
    currentBanner?.image_url ||
    currentBanner?.image ||
    currentBanner?.banner_image ||
    currentBanner?.bannerImage ||
    "";

  const bannerTitle =
    currentBanner?.title ||
    currentBanner?.heading ||
    currentBanner?.name ||
    pageHeading;

  const bannerSubtitle =
    currentBanner?.subtitle ||
    currentBanner?.subheading ||
    currentBanner?.description ||
    "";

  /* =======================================================
     CATEGORY-BASED CLASS FETCH
     When a category is clicked, refresh the public website
     data and use the latest classes returned by the API.
  ======================================================= */

  /* =======================================================
     CATEGORY STATE
  ======================================================= */

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("all");

  const [
    selectedSubcategory,
    setSelectedSubcategory,
  ] = useState("all");

  const [
    searchQuery,
    setSearchQuery,
  ] = useState("");

  const [
    selectedClassType,
    setSelectedClassType,
  ] = useState("all");

  const [
    debouncedSearch,
    setDebouncedSearch,
  ] = useState("");

  useEffect(() => {
    const timer =
      setTimeout(() => {
        setDebouncedSearch(
          searchQuery
        );
      }, 300);

    return () =>
      clearTimeout(
        timer
      );
  }, [searchQuery]);

  /* =======================================================
     SELECTED CATEGORY
  ======================================================= */

  const selectedCategoryObject =
    useMemo(
      () =>
        categoryData.find(
          (category) =>
            String(
              getId(category)
            ) ===
            String(
              selectedCategory
            )
        ) || null,
      [
        categoryData,
        selectedCategory,
      ]
    );

  /* =======================================================
     VISIBLE SUBCATEGORIES
  ======================================================= */

  const visibleSubcategories =
    useMemo(() => {
      if (
        selectedCategory ===
        "all"
      ) {
        return [];
      }

      return subcategoryData.filter(
        (subcategory) =>
          String(
            getCategoryIdFromSubcategory(
              subcategory
            )
          ) ===
          String(
            selectedCategory
          )
      );
    }, [
      subcategoryData,
      selectedCategory,
    ]);

  /* =======================================================
     CATEGORY COUNTS
  ======================================================= */

  const categoryCounts =
    useMemo(() => {
      const counts = {};

      classData.forEach(
        (item) => {
          const id =
            getItemCategoryId(
              item
            );

          if (
            id !== undefined &&
            id !== null
          ) {
            const key =
              String(id);

            counts[key] =
              (counts[key] ||
                0) + 1;
          }
        }
      );

      return counts;
    }, [classData]);

  /* =======================================================
     SUBCATEGORY COUNTS
  ======================================================= */

  const subcategoryCounts =
    useMemo(() => {
      const counts = {};

      classData.forEach(
        (item) => {
          const categoryId =
            getItemCategoryId(
              item
            );

          const subcategoryId =
            getItemSubcategoryId(
              item
            );

          if (
            categoryId ===
              undefined ||
            categoryId === null ||
            subcategoryId ===
              undefined ||
            subcategoryId === null ||
            String(
              categoryId
            ) !==
              String(
                selectedCategory
              )
          ) {
            return;
          }

          const key =
            String(
              subcategoryId
            );

          counts[key] =
            (counts[key] ||
              0) + 1;
        }
      );

      return counts;
    }, [
      classData,
      selectedCategory,
    ]);

  /* =======================================================
     FILTER CLASSES

     DEFAULT  -> ALL CLASSES
     CATEGORY -> CATEGORY CLASSES
     SUBCATEGORY -> SUBCATEGORY CLASSES
  ======================================================= */

  const filteredClasses = useMemo(() => {
    const search = debouncedSearch.trim().toLowerCase();

    return classData.filter((item) => {
      // No category selected = show every class
      if (
        selectedCategory !== "all" &&
        String(getItemCategoryId(item)) !== String(selectedCategory)
      ) {
        return false;
      }

      // Subcategory filter is only applied after a category is selected
      if (
        selectedSubcategory !== "all" &&
        String(getItemSubcategoryId(item)) !== String(selectedSubcategory)
      ) {
        return false;
      }

      // Filter by class delivery type: All, Recorded, or Live.
      if (selectedClassType !== "all") {
        const rawType = String(
          item?.class_type ??
          item?.classType ??
          item?.class_type_name ??
          item?.classTypeName ??
          item?.delivery_type ??
          item?.deliveryType ??
          item?.session_type ??
          item?.sessionType ??
          item?.mode ??
          item?.type ??
          ""
        ).trim().toLowerCase();

        const isRecorded = /record|on.?demand|pre.?record|video/.test(rawType);
        const isLive = /live|offline|in.?person|real.?time/.test(rawType);

        if (selectedClassType === "recorded" && !isRecorded) return false;
        if (selectedClassType === "live" && !isLive) return false;
      }

      if (!search) {
        return true;
      }

      const searchable = [
        getClassTitle(item),
        getSubcategoryName(item),
        getCategoryName(item),
        getInstituteName(item),
        getTrainerName(item),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchable.includes(search);
    });
  }, [
    classData,
    debouncedSearch,
    selectedCategory,
    selectedSubcategory,
    selectedClassType,
  ]);

  /* =======================================================
     FETCH LATEST CLASSES FOR SELECTED CATEGORY
  ======================================================= */

  const fetchClassesForCategory =
    async (categoryId) => {
      const instituteId =
        resolveInstituteId();

      if (!instituteId) {
        return;
      }

      try {
        setClassesLoading(true);

        const response =
          await API.get(
            `/websites/public/${instituteId}`,
            {
              params: {
                preview: true,
              },
            }
          );

        const result =
          response?.data?.data ??
          response?.data ??
          {};

        const apiClasses =
          Array.isArray(
            result?.classes
          )
            ? result.classes
            : Array.isArray(
                result?.website?.classes
              )
              ? result.website.classes
              : [];

        if (
          apiClasses.length > 0
        ) {
          setFetchedClasses(
            apiClasses
          );
        }

        return apiClasses;
      } catch (error) {
        console.error(
          "WebsiteClasses category class fetch error:",
          error?.response?.data ||
            error
        );
        return [];
      } finally {
        setClassesLoading(false);
      }
    };

  /* =======================================================
     CATEGORY CLICK
  ======================================================= */

  const handleCategoryClick =
    (categoryId) => {
      const id =
        String(categoryId);

      if (
        String(
          selectedCategory
        ) === id
      ) {
        setSelectedCategory(
          "all"
        );

        setSelectedSubcategory(
          "all"
        );

        setSearchQuery(
          ""
        );

        setFetchedClasses(
          []
        );

        return;
      }

      setSelectedCategory(
        id
      );

      setSelectedSubcategory(
        "all"
      );

      setSearchQuery(
        ""
      );

      fetchClassesForCategory(
        id
      );

      setTimeout(() => {
        document
          .getElementById(
            "classes-section"
          )
          ?.scrollIntoView({
            behavior:
              "smooth",
            block:
              "start",
          });
      }, 120);
    };

  /* =======================================================
     SUBCATEGORY CLICK
  ======================================================= */

  const handleSubcategoryClick =
    (subcategoryId) => {
      const id =
        String(
          subcategoryId
        );

      setSelectedSubcategory(
        (current) =>
          String(current) ===
          id
            ? "all"
            : id
      );

      setTimeout(() => {
        document
          .getElementById(
            "classes-section"
          )
          ?.scrollIntoView({
            behavior:
              "smooth",
            block:
              "start",
          });
      }, 50);
    };

  /* =======================================================
     BOOKING
  ======================================================= */

  const [
    showBookingModal,
    setShowBookingModal,
  ] = useState(false);

  const [
    selectedClass,
    setSelectedClass,
  ] = useState(null);

  const handleOpenBooking =
    (classItem) => {
      setSelectedClass(
        classItem
      );

      setShowBookingModal(
        true
      );
    };

  const handleCloseBooking =
    () => {
      setShowBookingModal(
        false
      );

      setTimeout(() => {
        setSelectedClass(
          null
        );
      }, 200);
    };

  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <>
      <div
        className="website-classes-page min-h-screen w-full overflow-x-hidden"
        style={{
          background:
            COLORS.black,

          color:
            COLORS.text,

          fontFamily:
            fontFamily(
              branding.fontBody
            ),

          fontWeight:
            branding.bodyWeight,

          lineHeight:
            branding.bodyLineHeight,

          letterSpacing:
            branding.bodyLetterSpacing,
        }}
      >

        {/* =================================================
            TOP RADIANT LINE
        ================================================= */}

        <div
          className="h-[2px] w-full"
          style={{
            background:
              "linear-gradient(90deg,transparent,#008CFF,#38D7FF,#008CFF,transparent)",

            boxShadow:
              "0 0 18px rgba(0,140,255,0.7)",
          }}
        />

        {/* =================================================
            BANNER
        ================================================= */}

       {/* =================================================
    CLASS BANNER
================================================= */}

{showBanner && (
  <section
    className="relative w-full h-130 overflow-hidden"
    style={{
      background: "#000000",
    }}
  >
    {/* LOADING */}

    {bannersLoading &&
      bannerData.length === 0 && (
        <div
          className="relative flex h-[350px] items-center justify-center overflow-hidden sm:h-[450px] lg:h-[550px]"
          style={{
            background:
              "#000000",
          }}
        >
          <div
            className="h-10 w-10 animate-spin rounded-full border-2"
            style={{
              borderColor:
                "rgba(56,215,255,0.2)",
              borderTopColor:
                COLORS.radiantBlue,
            }}
          />
        </div>
      )}

    {/* CLASS BANNER IMAGE */}

    {!bannersLoading &&
      bannerData.length > 0 &&
      bannerImage && (
        <div
          className="
            relative
            h-[350px]
            w-full
            overflow-hidden
            bg-black
            sm:h-[450px]
            lg:h-[550px]
            xl:h-[600px]
          "
          style={{ backgroundColor: "#000000" }}
        >
          <img
            src={bannerImage}
            alt="Classes Banner"
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
            "
            loading="eager"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.style.display = "none";
            }}
          />

          {/* DARK OVERLAY */}

          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom,rgba(0,0,0,0.05),rgba(0,0,0,0.35))",
            }}
          />
</div>
      )}

    {/* FALLBACK */}

    {!bannersLoading &&
      (!bannerData.length ||
        !bannerImage) && (
        <div
          className="
            relative
            flex
            h-[350px]
            items-center
            justify-center
            overflow-hidden
            sm:h-[450px]
            lg:h-[550px]
            xl:h-[600px]
          "
          style={{
            background:
              "#000000",
          }}
        >
</div>
      )}
  </section>
)}

        {/* =================================================
            CATEGORIES
        ================================================= */}

        {showCategories && (
          <section
            className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8"
            style={{
              background:
                COLORS.black,
              borderColor:
                COLORS.borderSoft,
            }}
          >

            <div className="mx-auto max-w-7xl">

              <SectionHeading
            
                heading={
                  categoriesHeading
                }
                subheading={
                  categoriesSubheading
                }
                branding={
                  branding
                }
              />

              {categoryData.length >
              0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                  {categoryData.map(
                    (
                      category
                    ) => {
                      const id =
                        getId(
                          category
                        );

                      return (
                        <CategoryCard
                          key={
                            id
                          }
                          category={
                            category
                          }
                          count={
                            categoryCounts[
                              String(
                                id
                              )
                            ] || 0
                          }
                          active={
                            String(
                              selectedCategory
                            ) ===
                            String(
                              id
                            )
                          }
                          onClick={() =>
                            handleCategoryClick(
                              id
                            )
                          }
                        />
                      );
                    }
                  )}

                </div>
              ) : (
                <EmptyState
                  title="No Categories Available"
                  text="Categories will appear here when they are added."
                />
              )}

            </div>

          </section>
        )}

        {/* =================================================
            SUBCATEGORIES
        ================================================= */}

        {showCategories &&
          selectedCategory !==
            "all" && (
            <section
              id="subcategories-section"
              className="border-y px-4 py-6 sm:px-6 sm:py-8 lg:px-8"
              style={{
                background:
                  COLORS.black,

                borderColor:
                  COLORS.borderSoft,
              }}
            >

              <div className="mx-auto max-w-7xl">

                <SectionHeading
                 
                  heading={
                    subcategoriesHeading
                  }
                  subheading={
                    subcategoriesSubheading
                  }
                  branding={
                    branding
                  }
                />

                {visibleSubcategories.length >
                0 ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                    {/* ALL */}

                    <button
                      type="button"
                      onClick={() =>
                        setSelectedSubcategory(
                          "all"
                        )
                      }
                      className="group overflow-hidden rounded-lg border text-left transition-all duration-300 hover:-translate-y-1"
                      style={{
                        background:
                          "#000000",

                        borderColor:
                          selectedSubcategory ===
                          "all"
                            ? COLORS.radiantBlue
                            : COLORS.border,
                      }}
                    >

                      <div
                        className="relative flex h-36 items-center justify-center"
                        style={{
                          background:
                            "#000000",
                        }}
                      >

                        <span
                          className="text-4xl font-bold"
                          style={{
                            color:
                              COLORS.radiantBlue,

                            textShadow:
                              "0 0 20px rgba(56,215,255,0.45)",
                          }}
                        >
                          All
                        </span>

                      </div>

                      <div className="p-4">

                        <h3
                          className="text-base"
                          style={{
                            color:
                              COLORS.white,

                            fontWeight:
                              700,
                          }}
                        >
                          All Subcategories
                        </h3>

                        <p
                          className="mt-1 text-xs"
                          style={{
                            color:
                              COLORS.text,
                          }}
                        >
                          {
                            categoryCounts[
                              String(
                                selectedCategory
                              )
                            ] || 0
                          }{" "}
                          Classes
                        </p>

                      </div>

                    </button>

                    {visibleSubcategories.map(
                      (
                        subcategory
                      ) => {
                        const id =
                          getSubcategoryId(
                            subcategory
                          );

                        return (
                          <SubcategoryCard
                            key={
                              id
                            }
                            subcategory={
                              subcategory
                            }
                            count={
                              subcategoryCounts[
                                String(
                                  id
                                )
                              ] || 0
                            }
                            active={
                              String(
                                selectedSubcategory
                              ) ===
                              String(
                                id
                              )
                            }
                            onClick={() =>
                              handleSubcategoryClick(
                                id
                              )
                            }
                          />
                        );
                      }
                    )}

                  </div>
                ) : (
                  <EmptyState
                    title="No Subcategories Available"
                    text="There are no subcategories configured for this category yet."
                  />
                )}

              </div>

            </section>
          )}

        {/* =================================================
            CLASSES
        ================================================= */}

        {showClasses && (
            <section
              id="classes-section"
              className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8"
              style={{
                background:
                  "#000000",
                borderColor:
                  COLORS.borderSoft,
              }}
            >

              <div className="mx-auto max-w-7xl">

                {/* HEADER + SEARCH: row one, two columns */}
                <div className="mb-4 grid grid-cols-1 gap-5 lg:grid-cols-2 lg:items-center">
                  <div className="min-w-0">
                    <SectionHeading
                      heading={classesListHeading}
                      subheading={classesListSubheading}
                      branding={branding}
                    />
                  </div>

                  <div className="min-w-0">
                    <div className="relative">
                      <FaSearch
                        className="absolute left-4 top-1/2 -translate-y-1/2"
                        style={{
                          color: COLORS.radiantBlue,
                          filter: "drop-shadow(0 0 5px rgba(56,215,255,0.4))",
                        }}
                      />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                        placeholder="Search classes..."
                        aria-label="Search classes"
                        className="w-full rounded-lg border bg-black py-3.5 pl-11 pr-11 text-sm outline-none transition focus:ring-2 focus:ring-sky-500/30"
                        style={{
                          background: "#000000",
                          color: COLORS.white,
                          caretColor: COLORS.radiantBlue,
                          borderColor: COLORS.border,
                          fontFamily: fontFamily(branding.fontBody),
                          boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
                        }}
                      />
                      {searchQuery && (
                        <button
                          type="button"
                          onClick={() => setSearchQuery("")}
                          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-lg"
                          style={{ color: COLORS.radiantBlue }}
                          aria-label="Clear search"
                        >
                          <FaTimes />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* CLASS TYPE FILTERS: centered against the full page width */}
                <div className="mb-6 flex w-full flex-wrap items-center justify-center gap-3">
                  {[
                    { value: "all", label: "All" },
                    { value: "recorded", label: "Recorded" },
                    { value: "live", label: "Live" },
                  ].map((option) => {
                    const active = selectedClassType === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setSelectedClassType(option.value)}
                        aria-pressed={active}
                        className="rounded-lg border px-7 py-3 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
                        style={{
                          color: active ? COLORS.black : COLORS.radiantBlue,
                          background: active
                            ? `linear-gradient(135deg, ${COLORS.blue}, ${COLORS.radiantBlue})`
                            : "#000000",
                          borderColor: active ? COLORS.radiantBlue : COLORS.border,
                          boxShadow: active ? "0 0 18px rgba(0,140,255,0.22)" : "none",
                        }}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>

                {/* RESULT COUNT */}

                {classesLoading && (
                  <div
                    className="mb-3 flex items-center gap-2 text-xs"
                    style={{
                      color:
                        COLORS.radiantBlue,
                    }}
                  >
                    <span
                      className="inline-block h-3 w-3 animate-spin rounded-full border-2"
                      style={{
                        borderColor:
                          "rgba(56,215,255,0.25)",
                        borderTopColor:
                          COLORS.radiantBlue,
                      }}
                    />
                    Loading classes...
                  </div>
                )}

                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">

                  <p
                    className="text-xs"
                    style={{
                      color:
                        COLORS.text,
                    }}
                  >
                    Showing{" "}
                    <span
                      className="font-bold"
                      style={{
                        color:
                          COLORS.radiantBlue,
                      }}
                    >
                      {
                        filteredClasses.length
                      }
                    </span>{" "}
                    {filteredClasses.length ===
                    1
                      ? "class"
                      : "classes"}
                  </p>

                  {(selectedSubcategory !== "all" ||
                    selectedClassType !== "all" ||
                    debouncedSearch) && (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedSubcategory("all");
                        setSelectedClassType("all");
                        setSearchQuery("");
                      }}
                      className="inline-flex items-center gap-2 text-xs font-semibold"
                      style={{
                        color:
                          COLORS.radiantBlue,
                      }}
                    >
                      <FaTimes />
                      Clear Filter
                    </button>
                  )}

                </div>

                {/* CLASS RESULTS */}

                {filteredClasses.length >
                0 ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                    {filteredClasses.map(
                      (item) => (
                        <ClassCard
                          key={getClassId(
                            item
                          )}
                          item={
                            item
                          }
                          onBook={
                            handleOpenBooking
                          }
                        />
                      )
                    )}

                  </div>
                ) : (
                  <EmptyState
                    title="No Classes Found"
                    text={
                      debouncedSearch
                        ? "No classes match your search."
                        : selectedSubcategory !==
                            "all"
                          ? "No classes are available in this subcategory."
                          : "No classes are available for the selected category."
                    }
                    action={
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedSubcategory(
                            "all"
                          );

                          setSearchQuery(
                            ""
                          );
                        }}
                        className="mt-5 rounded-full px-5 py-2.5 text-xs font-bold"
                        style={{
                          background:
                            `linear-gradient(135deg, ${COLORS.blue}, ${COLORS.radiantBlue})`,

                          color:
                            COLORS.black,

                          boxShadow:
                            "0 0 20px rgba(0,140,255,0.3)",
                        }}
                      >
                        Clear Selection
                      </button>
                    }
                  />
                )}

              </div>

            </section>
          )}

        {/* =================================================
            BOTTOM BLUE LINE
        ================================================= */}

        <div
          className="h-[2px] w-full"
          style={{
            background:
              "linear-gradient(90deg,transparent,#008CFF,#38D7FF,#008CFF,transparent)",

            boxShadow:
              "0 0 18px rgba(0,140,255,0.65)",
          }}
        />

      </div>

      {/* =================================================
          BOOKING MODAL
      ================================================= */}

      <WebsiteBooking
        isOpen={
          showBookingModal
        }
        selectedClass={
          selectedClass
        }
        onClose={
          handleCloseBooking
        }
      />

      {/* =================================================
          FORCE INPUT TEXT VISIBILITY
      ================================================= */}

      <style>
        {`
          .website-classes-page input::placeholder {
            color: #FFFFFF !important;
            opacity: 1 !important;
          }

          input::placeholder {
            color: #FFFFFF !important;
            opacity: 1 !important;
          }

          input {
            color: #FFFFFF !important;
            caret-color: #38D7FF !important;
          }

          button {
            -webkit-tap-highlight-color: transparent;
          }

          button:focus-visible,
          input:focus-visible {
            outline: 2px solid #38D7FF;
            outline-offset: 2px;
          }

          @media (max-width: 640px) {
            .website-classes-page {
              overflow-x: hidden;
            }
          }
        `}
      </style>

    </>
  );
};

export default WebsiteClasses;