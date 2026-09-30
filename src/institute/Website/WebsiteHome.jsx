import { useEffect, useMemo, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";

import {
  ArrowRight,
  BookOpen,
  Star,
  Users,
  Palette,
  Music,
  Camera,
  Drama,
  Monitor,
  Clock3,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";


/* =========================================================
   BRANDING
========================================================= */

const getBranding = (branding = {}) => {
  return {
    navbarColor:
      branding?.navbarColor ??
      branding?.navbar_color ??
      "#020617",

    navbarTextColor:
      branding?.navbarTextColor ??
      branding?.navbar_text_color ??
      branding?.navbarText ??
      branding?.navbar_text ??
      "#FFFFFF",

    navbarIconColor:
      branding?.navbarIconColor ??
      branding?.navbar_icon_color ??
      branding?.navbarIcons ??
      branding?.navbar_icons ??
      "#FFFFFF",

    navbarButtonColor:
      branding?.navbarButtonColor ??
      branding?.navbar_button_color ??
      "#0EA5E9",

    navbarButtonTextColor:
      branding?.navbarButtonTextColor ??
      branding?.navbar_button_text_color ??
      "#FFFFFF",

    headingColor:
      branding?.headingColor ??
      branding?.heading_color ??
      "#F8FAFC",

    subheadingColor:
      branding?.subheadingColor ??
      branding?.subheading_color ??
      "#38BDF8",

    textColor:
      branding?.textColor ??
      branding?.text_color ??
      "#CBD5E1",

    iconColor:
      branding?.iconColor ??
      branding?.icon_color ??
      "#38BDF8",

    buttonColor:
      branding?.buttonColor ??
      branding?.button_color ??
      "#0EA5E9",

    buttonTextColor:
      branding?.buttonTextColor ??
      branding?.button_text_color ??
      "#FFFFFF",

    pageBackgroundColor:
      branding?.pageBackgroundColor ??
      branding?.page_background_color ??
      "#020617",

    cardBackgroundColor:
      branding?.cardBackgroundColor ??
      branding?.card_background_color ??
      "#071426",

    footerBackgroundColor:
      branding?.footerBackgroundColor ??
      branding?.footer_background_color ??
      "#020617",

    footerHeadingColor:
      branding?.footerHeadingColor ??
      branding?.footer_heading_color ??
      "#FFFFFF",

    footerTextColor:
      branding?.footerTextColor ??
      branding?.footer_text_color ??
      "#FAFAF9",

    fontHeading:
      branding?.fontHeading ??
      branding?.font_heading ??
      "Inter",

    fontSubheading:
      branding?.fontSubheading ??
      branding?.font_subheading ??
      "Inter",

    fontBody:
      branding?.fontBody ??
      branding?.font_body ??
      "Inter",

    headingWeight:
      branding?.headingWeight ??
      branding?.heading_weight ??
      700,

    headingLineHeight:
      branding?.headingLineHeight ??
      branding?.heading_line_height ??
      1.15,

    headingLetterSpacing:
      branding?.headingLetterSpacing ??
      branding?.heading_letter_spacing ??
      0,

    subheadingWeight:
      branding?.subheadingWeight ??
      branding?.subheading_weight ??
      600,

    subheadingLineHeight:
      branding?.subheadingLineHeight ??
      branding?.subheading_line_height ??
      1.4,

    bodyWeight:
      branding?.bodyWeight ??
      branding?.body_weight ??
      400,

    bodyLineHeight:
      branding?.bodyLineHeight ??
      branding?.body_line_height ??
      1.6,

    bodyLetterSpacing:
      branding?.bodyLetterSpacing ??
      branding?.body_letter_spacing ??
      0,

    roundedButtons:
      branding?.roundedButtons ??
      branding?.rounded_buttons ??
      true,
  };
};


/* =========================================================
   NORMALIZE SECTION TYPE
========================================================= */

const normalizeSectionType = (value) => {
  if (
    value === null ||
    value === undefined
  ) {
    return "";
  }

  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[\s_-]+/g, "");
};


/* =========================================================
   SECTION ALIASES
========================================================= */

const SECTION_ALIASES = {
  home: "home",

  hero: "hero",
  banner: "hero",

  about: "about",
  aboutus: "about",

  courses: "classes",
  course: "classes",

  classes: "classes",
  class: "classes",

  popularclasses: "classes",
  popularclass: "classes",

  categories: "categories",
  category: "categories",

  trainers: "trainers",
  trainer: "trainers",

  testimonials: "testimonials",
  testimonial: "testimonials",

  sessions: "sessions",
  session: "sessions",

  dashboard: "dashboard",

  studentlogin: "studentlogin",
};


/* =========================================================
   GET NORMALIZED SECTION
========================================================= */

const getNormalizedSectionType = (value) => {
  const normalized =
    normalizeSectionType(value);

  return (
    SECTION_ALIASES[normalized] ||
    normalized
  );
};


/* =========================================================
   NORMALIZE BOOLEAN
========================================================= */

const normalizeBoolean = (
  value,
  defaultValue = false
) => {
  if (
    value === undefined ||
    value === null
  ) {
    return defaultValue;
  }

  if (value === true) {
    return true;
  }

  if (value === false) {
    return false;
  }

  if (value === 1) {
    return true;
  }

  if (value === 0) {
    return false;
  }

  const normalized =
    String(value)
      .trim()
      .toLowerCase();

  if (
    normalized === "true" ||
    normalized === "1" ||
    normalized === "yes" ||
    normalized === "on"
  ) {
    return true;
  }

  if (
    normalized === "false" ||
    normalized === "0" ||
    normalized === "no" ||
    normalized === "off" ||
    normalized === ""
  ) {
    return false;
  }

  return defaultValue;
};


/* =========================================================
   HEX OPACITY
========================================================= */

const hexWithOpacity = (
  color,
  opacity = "10"
) => {
  if (!color) {
    return "#00000010";
  }

  if (
    typeof color === "string" &&
    /^#[0-9a-fA-F]{6}$/.test(color)
  ) {
    return `${color}${opacity}`;
  }

  return color;
};


/* =========================================================
   BUTTON RADIUS
========================================================= */

const buttonRadius = (branding) => {
  return branding?.roundedButtons
    ? "999px"
    : "6px";
};


/* =========================================================
   FONT
========================================================= */

const fontValue = (font) => {
  if (!font) {
    return "Inter, sans-serif";
  }

  return `'${font}', sans-serif`;
};


/* =========================================================
   CONTENT VALUE EXTRACTION
========================================================= */

const getContentValue = (
  content,
  key,
  fallback = ""
) => {
  if (
    content === null ||
    content === undefined
  ) {
    return fallback;
  }

  const wantedKey =
    String(key)
      .trim()
      .toLowerCase();


  /* ARRAY */

  if (Array.isArray(content)) {
    const row =
      content.find((item) => {
        if (!item) {
          return false;
        }

        const itemKey =
          item?.content_key ??
          item?.contentKey ??
          item?.key ??
          item?.field ??
          item?.name;

        return (
          String(itemKey ?? "")
            .trim()
            .toLowerCase() ===
          wantedKey
        );
      });

    if (row) {
      const value =
        row?.content_value ??
        row?.contentValue ??
        row?.value ??
        row?.text ??
        row?.content ??
        row?.data;

      if (
        value !== undefined &&
        value !== null &&
        String(value).trim() !== ""
      ) {
        return String(value);
      }
    }

    return fallback;
  }


  /* OBJECT */

  if (
    typeof content === "object"
  ) {
    if (
      Object.prototype.hasOwnProperty.call(
        content,
        key
      )
    ) {
      const direct =
        content[key];

      if (
        typeof direct === "string" &&
        direct.trim()
      ) {
        return direct;
      }

      if (
        typeof direct === "number"
      ) {
        return String(direct);
      }

      if (
        direct &&
        typeof direct === "object"
      ) {
        const nested =
          direct?.content_value ??
          direct?.contentValue ??
          direct?.value ??
          direct?.text ??
          direct?.content;

        if (
          nested !== undefined &&
          nested !== null &&
          String(nested).trim()
        ) {
          return String(nested);
        }
      }
    }


    const matchingKey =
      Object.keys(content).find(
        (itemKey) =>
          String(itemKey)
            .trim()
            .toLowerCase() ===
          wantedKey
      );

    if (matchingKey) {
      const value =
        content[matchingKey];

      if (
        typeof value === "string" ||
        typeof value === "number"
      ) {
        return String(value);
      }

      if (
        value &&
        typeof value === "object"
      ) {
        const nested =
          value?.content_value ??
          value?.contentValue ??
          value?.value ??
          value?.text ??
          value?.content;

        if (
          nested !== undefined &&
          nested !== null
        ) {
          return String(nested);
        }
      }
    }


    if (
      content?.content !== undefined
    ) {
      const nestedValue =
        getContentValue(
          content.content,
          key,
          ""
        );

      if (
        nestedValue !== ""
      ) {
        return nestedValue;
      }
    }


    if (
      content?.data !== undefined
    ) {
      const nestedValue =
        getContentValue(
          content.data,
          key,
          ""
        );

      if (
        nestedValue !== ""
      ) {
        return nestedValue;
      }
    }
  }


  return fallback;
};


/* =========================================================
   NORMALIZE CONTENT
========================================================= */

const normalizeContent = (
  content
) => {
  if (!content) {
    return {};
  }


  /* ARRAY */

  if (
    Array.isArray(content)
  ) {
    const result = {};

    content.forEach((item) => {
      if (!item) {
        return;
      }

      const key =
        item?.content_key ??
        item?.contentKey ??
        item?.key ??
        item?.field;

      const value =
        item?.content_value ??
        item?.contentValue ??
        item?.value ??
        item?.text ??
        item?.content ??
        "";

      if (
        key !== undefined &&
        key !== null
      ) {
        result[
          String(key)
            .trim()
            .toLowerCase()
        ] = value;
      }
    });

    return result;
  }


  /* OBJECT WITH CONTENT ARRAY */

  if (
    content?.content &&
    Array.isArray(content.content)
  ) {
    return normalizeContent(
      content.content
    );
  }


  /* OBJECT WITH DATA ARRAY */

  if (
    content?.data &&
    Array.isArray(content.data)
  ) {
    return normalizeContent(
      content.data
    );
  }


  /* DIRECT OBJECT */

  if (
    typeof content === "object"
  ) {
    const result = {
      ...content,
    };

    if (
      content?.content_key
    ) {
      result[
        String(
          content.content_key
        )
          .trim()
          .toLowerCase()
      ] =
        content?.content_value ??
        content?.contentValue ??
        content?.value ??
        content?.text ??
        "";
    }

    return result;
  }


  return {};
};


/* =========================================================
   EXTRACT SECTION CONTENT
========================================================= */

const extractSectionContent = (
  response,
  requestedKeys = []
) => {
  if (!response) {
    return null;
  }

  const normalizedRequestedKeys =
    requestedKeys.map(
      (key) =>
        getNormalizedSectionType(
          key
        )
    );


  /* ARRAY RESPONSE */

  if (
    Array.isArray(response)
  ) {
    const rows =
      response;

    const sectionRows =
      rows.filter((row) => {
        if (!row) {
          return false;
        }

        const sectionKey =
          row?.section_key ??
          row?.sectionKey ??
          row?.section ??
          row?.section_type ??
          row?.sectionType;

        if (!sectionKey) {
          return false;
        }

        const normalized =
          getNormalizedSectionType(
            sectionKey
          );

        return normalizedRequestedKeys.includes(
          normalized
        );
      });

    if (
      sectionRows.length > 0
    ) {
      return normalizeContent(
        sectionRows
      );
    }

    const direct =
      normalizeContent(rows);

    if (
      Object.keys(direct).length > 0
    ) {
      return direct;
    }
  }


  /* OBJECT RESPONSE */

  if (
    typeof response === "object"
  ) {
    if (
      response?.data !== undefined
    ) {
      const extracted =
        extractSectionContent(
          response.data,
          requestedKeys
        );

      if (extracted) {
        return extracted;
      }
    }


    if (
      response?.content !== undefined
    ) {
      const extracted =
        extractSectionContent(
          response.content,
          requestedKeys
        );

      if (extracted) {
        return extracted;
      }
    }


    for (
      const requestedKey of requestedKeys
    ) {
      const normalizedRequested =
        getNormalizedSectionType(
          requestedKey
        );

      for (
        const objectKey of Object.keys(
          response
        )
      ) {
        if (
          getNormalizedSectionType(
            objectKey
          ) === normalizedRequested
        ) {
          const section =
            response[objectKey];

          const normalized =
            normalizeContent(
              section
            );

          if (
            Object.keys(
              normalized
            ).length > 0
          ) {
            return normalized;
          }
        }
      }
    }


    const direct =
      normalizeContent(
        response
      );

    if (
      Object.keys(direct).length > 0
    ) {
      return direct;
    }
  }


  return null;
};


/* =========================================================
   HOME SECTION CONTENT
========================================================= */

const getHomeSectionContent = (
  getContent,
  section,
  aliases = []
) => {
  if (
    typeof getContent !==
    "function"
  ) {
    return {};
  }

  const keys = [
    section,
    ...aliases,
  ];


  /* PREFERRED */

  for (
    const key of keys
  ) {
    try {
      const response =
        getContent(
          "home",
          key
        );

      if (
        response !== undefined &&
        response !== null
      ) {
        const extracted =
          extractSectionContent(
            response,
            [
              key,
              ...keys,
            ]
          );

        if (
          extracted &&
          Object.keys(extracted)
            .length > 0
        ) {
          return extracted;
        }
      }
    } catch (error) {
      console.warn(
        `[WebsiteHome] getContent("home", "${key}") failed`,
        error
      );
    }
  }


  /* FALLBACK */

  for (
    const key of keys
  ) {
    try {
      const response =
        getContent(key);

      if (
        response !== undefined &&
        response !== null
      ) {
        const extracted =
          extractSectionContent(
            response,
            [
              key,
              ...keys,
            ]
          );

        if (
          extracted &&
          Object.keys(extracted)
            .length > 0
        ) {
          return extracted;
        }
      }
    } catch (error) {
      console.warn(
        `[WebsiteHome] getContent("${key}") failed`,
        error
      );
    }
  }


  return {};
};


/* =========================================================
   MAIN WEBSITE HOME
========================================================= */


/* =========================================================
   MAIN WEBSITE HOME
   ========================================================= */

export default function WebsiteHome() {
  const context = useOutletContext() || {};

  const {
    institute = {},
    branding: rawBranding = {},
    banners = [],
    bannersLoading = false,
    categories = [],
    classes = [],
    trainers = [],
    testimonials = [],
    sectionEnabled,
    getContent,
  } = context;

  const branding = useMemo(
    () => ({
      ...getBranding(rawBranding),
      /* Dark / black + gradient-blue defaults */
      pageBackgroundColor:
        rawBranding?.pageBackgroundColor ??
        rawBranding?.page_background_color ??
        "#020617",
      cardBackgroundColor:
        rawBranding?.cardBackgroundColor ??
        rawBranding?.card_background_color ??
        "#071426",
      headingColor:
        rawBranding?.headingColor ??
        rawBranding?.heading_color ??
        "#F8FAFC",
      subheadingColor:
        rawBranding?.subheadingColor ??
        rawBranding?.subheading_color ??
        "#38BDF8",
      textColor:
        rawBranding?.textColor ??
        rawBranding?.text_color ??
        "#CBD5E1",
      iconColor:
        rawBranding?.iconColor ??
        rawBranding?.icon_color ??
        "#38BDF8",
      buttonColor:
        rawBranding?.buttonColor ??
        rawBranding?.button_color ??
        "#0EA5E9",
      buttonTextColor:
        rawBranding?.buttonTextColor ??
        rawBranding?.button_text_color ??
        "#FFFFFF",
    }),
    [rawBranding]
  );

  useEffect(() => {
    const previous = {
      htmlBackground: document.documentElement.style.backgroundColor,
      bodyBackground: document.body.style.backgroundColor,
      bodyMargin: document.body.style.margin,
    };

    document.documentElement.style.backgroundColor = "#020617";
    document.body.style.backgroundColor = "#020617";
    document.body.style.margin = "0";

    return () => {
      document.documentElement.style.backgroundColor = previous.htmlBackground;
      document.body.style.backgroundColor = previous.bodyBackground;
      document.body.style.margin = previous.bodyMargin;
    };
  }, []);

  const categoryList = Array.isArray(categories) ? categories : [];
  const classList = Array.isArray(classes) ? classes : [];
  const trainerList = Array.isArray(trainers) ? trainers : [];
  const testimonialList = Array.isArray(testimonials) ? testimonials : [];
  const bannerList = Array.isArray(banners) ? banners : [];

  const popularClassesContent = useMemo(
    () =>
      getHomeSectionContent(getContent, "classes", [
        "courses",
        "popularClasses",
        "popular_classes",
      ]),
    [getContent]
  );

  const categoriesContent = useMemo(
    () =>
      getHomeSectionContent(getContent, "categories", ["category"]),
    [getContent]
  );

  const trainersContent = useMemo(
    () =>
      getHomeSectionContent(getContent, "trainers", ["trainer"]),
    [getContent]
  );

  const testimonialsContent = useMemo(
    () =>
      getHomeSectionContent(getContent, "testimonials", ["testimonial"]),
    [getContent]
  );

  const popularClassesHeading = getContentValue(
    popularClassesContent,
    "heading",
    "Popular Classes"
  );

  const popularClassesSubheading = getContentValue(
    popularClassesContent,
    "subheading",
    "Find the perfect class for your learning journey."
  );

  const categoriesHeading = getContentValue(
    categoriesContent,
    "heading",
    "Explore Categories"
  );

  const categoriesSubheading = getContentValue(
    categoriesContent,
    "subheading",
    "Discover a wide range of fine arts categories."
  );

  const trainersHeading = getContentValue(
    trainersContent,
    "heading",
    "Our Expert Trainers"
  );

  const trainersSubheading = getContentValue(
    trainersContent,
    "subheading",
    "Learn from experienced and professional trainers."
  );

  const testimonialsHeading = getContentValue(
    testimonialsContent,
    "heading",
    "Student Testimonials"
  );

  const testimonialsSubheading = getContentValue(
    testimonialsContent,
    "subheading",
    "Real stories. Real learning. Real growth."
  );

  const isSectionEnabled = (requestedSection) => {
    if (typeof sectionEnabled !== "function") return true;

    try {
      return normalizeBoolean(
        sectionEnabled(getNormalizedSectionType(requestedSection)),
        true
      );
    } catch (error) {
      console.warn(
        `[WebsiteHome] sectionEnabled failed for ${requestedSection}`,
        error
      );
      return true;
    }
  };

  const homeBanners = useMemo(
    () =>
      bannerList
        .map((banner) => {
          if (!banner) return null;

          const type = String(
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

          const image =
            banner?.image_url ||
            banner?.image ||
            banner?.imageUrl ||
            banner?.url ||
            "";

          return {
            ...banner,
            banner_type: type,
            is_active: normalizeBoolean(active, true),
            image_url: image,
            display_order: Number(
              banner?.display_order ?? banner?.displayOrder ?? 1
            ),
          };
        })
        .filter(
          (banner) =>
            banner &&
            (!banner.banner_type || banner.banner_type === "HOME") &&
            banner.is_active &&
            banner.image_url
        )
        .sort((a, b) => a.display_order - b.display_order),
    [bannerList]
  );

  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    if (currentBanner >= homeBanners.length) {
      setCurrentBanner(0);
    }
  }, [currentBanner, homeBanners.length]);

  useEffect(() => {
    if (homeBanners.length <= 1) return undefined;

    const timer = setInterval(() => {
      setCurrentBanner((previous) =>
        previous >= homeBanners.length - 1 ? 0 : previous + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [homeBanners.length]);

  return (
    <main
      className="w-full overflow-hidden"
      style={{
        backgroundColor: branding.pageBackgroundColor,
        color: branding.textColor,
        fontFamily: fontValue(branding.fontBody),
        fontWeight: branding.bodyWeight,
        lineHeight: branding.bodyLineHeight,
        letterSpacing: branding.bodyLetterSpacing,
      }}
    >
      {isSectionEnabled("home") && (
        <HeroSection
          banners={homeBanners}
          bannersLoading={bannersLoading}
          currentBanner={currentBanner}
          setCurrentBanner={setCurrentBanner}
          branding={branding}
        />
      )}

      {isSectionEnabled("categories") && categoryList.length > 0 && (
        <CategoriesSection
          categories={categoryList}
          branding={branding}
          heading={categoriesHeading}
          subheading={categoriesSubheading}
        />
      )}

      {isSectionEnabled("trainers") && trainerList.length > 0 && (
        <TrainersSection
          trainers={trainerList}
          branding={branding}
          heading={trainersHeading}
          subheading={trainersSubheading}
        />
      )}

      {isSectionEnabled("classes") && classList.length > 0 && (
        <PopularClasses
          classes={classList}
          branding={branding}
          heading={popularClassesHeading}
          subheading={popularClassesSubheading}
        />
      )}

      {isSectionEnabled("testimonials") && testimonialList.length > 0 && (
        <TestimonialsSection
          testimonials={testimonialList}
          branding={branding}
          heading={testimonialsHeading}
          subheading={testimonialsSubheading}
        />
      )}
    </main>
  );
}


/* =========================================================
   HERO / BANNER
   ========================================================= */

function HeroSection({
  banners,
  bannersLoading,
  currentBanner,
  setCurrentBanner,
  branding,
}) {
  if (bannersLoading && banners.length === 0) {
    return (
      <section className="w-full bg-slate-950">
        <div className="h-[360px] w-full animate-pulse bg-slate-900 sm:h-[500px]" />
      </section>
    );
  }

  if (banners.length === 0) {
    return (
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(120deg, #020617 0%, #071426 45%, #075985 100%)",
        }}
      >
        <div className="mx-auto flex min-h-[360px] max-w-7xl items-center px-5 py-16 sm:min-h-[500px]">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-sky-400">
              Unleash Your Creativity
            </p>
            <h1 className="text-4xl font-black leading-tight text-white sm:text-6xl">
              Learn. Create.
              <br />
              <span className="text-sky-400">Master Your Skills.</span>
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
              Learn from expert trainers and discover classes designed for
              every skill level.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const banner = banners[currentBanner] || banners[0];
  const image =
    banner?.image_url ||
    banner?.image ||
    banner?.imageUrl ||
    banner?.url ||
    "";

  return (
    <section className="relative w-full overflow-hidden bg-slate-950">
      {image ? (
        <img
          src={image}
          alt=""
          aria-hidden="true"
          className="block h-[360px] w-full object-cover sm:h-[500px]"
        />
      ) : null}

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-blue-950/40" />

      <div className="absolute inset-0 mx-auto flex max-w-7xl items-center px-5">
        <div className="max-w-xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-sky-400">
            Unleash Your Creativity
          </p>

          <h1 className="text-4xl font-black leading-tight text-white sm:text-6xl">
            Learn. Create.
            <br />
            <span className="text-sky-400">Master Your Skills.</span>
          </h1>

          <p className="mt-4 max-w-lg text-sm leading-7 text-slate-200 sm:text-base">
            Learn from expert trainers, explore diverse classes and turn your
            passion into a skill for life.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to="/institute/website/preview/classes"
              className="rounded-full px-6 py-3 text-sm font-bold shadow-lg transition hover:-translate-y-0.5"
              style={{
                backgroundColor: branding.buttonColor,
                color: branding.buttonTextColor,
              }}
            >
              Explore Classes <ArrowRight className="ml-1 inline" size={15} />
            </Link>

            <Link
              to="/institute/website/preview/trainers"
              className="rounded-full border border-sky-400 px-6 py-3 text-sm font-bold text-white transition hover:bg-sky-400/10"
            >
              Find a Trainer
            </Link>
          </div>
        </div>
      </div>

      {banners.length > 1 && (
        <>
          <button
            type="button"
            onClick={() =>
              setCurrentBanner(
                currentBanner === 0 ? banners.length - 1 : currentBanner - 1
              )
            }
            aria-label="Previous banner"
            className="absolute left-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-sky-400/40 bg-black/50 text-white backdrop-blur transition hover:bg-sky-500"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            type="button"
            onClick={() =>
              setCurrentBanner(
                currentBanner >= banners.length - 1 ? 0 : currentBanner + 1
              )
            }
            aria-label="Next banner"
            className="absolute right-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-sky-400/40 bg-black/50 text-white backdrop-blur transition hover:bg-sky-500"
          >
            <ChevronRight size={20} />
          </button>

          <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
            {banners.map((bannerItem, index) => (
              <button
                key={bannerItem?.id || index}
                type="button"
                onClick={() => setCurrentBanner(index)}
                aria-label={`Go to banner ${index + 1}`}
                className="h-2 rounded-full transition-all"
                style={{
                  width: currentBanner === index ? 24 : 8,
                  backgroundColor:
                    currentBanner === index ? branding.buttonColor : "#fff",
                }}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}


/* =========================================================
   SECTION HEADING
   ========================================================= */

function SectionHeading({ eyebrow, title, branding }) {
  return (
    <div className="mb-7">
      <p
        className="mb-1 text-xs font-bold uppercase tracking-[0.18em]"
        style={{ color: branding.subheadingColor }}
      >
        {eyebrow}
      </p>

      <h2
        className="text-2xl font-black sm:text-3xl"
        style={{
          color: branding.headingColor,
          fontFamily: fontValue(branding.fontHeading),
          fontWeight: branding.headingWeight,
        }}
      >
        {title}
      </h2>
    </div>
  );
}


/* =========================================================
   CENTERED VIEW MORE
   ========================================================= */

function ViewMoreButton({ to, label, branding }) {
  return (
    <div className="mt-8 flex justify-center">
      <Link
        to={to}
        className="inline-flex items-center gap-2 rounded-full border px-7 py-3 text-xs font-bold transition hover:-translate-y-0.5 hover:bg-sky-500/10"
        style={{
          color: branding.buttonColor,
          borderColor: branding.buttonColor,
        }}
      >
        {label}
        <ArrowRight size={15} />
      </Link>
    </div>
  );
}


/* =========================================================
   COMMON CARD STYLE
   ========================================================= */

const cardStyle = (branding) => ({
  background:
    "linear-gradient(145deg, rgba(7,20,38,0.98), rgba(2,15,30,0.98))",
  borderColor: "rgba(14,165,233,0.45)",
  borderRadius: "16px",
  boxShadow: "0 12px 35px rgba(0,0,0,0.22)",
});


/* =========================================================
   CATEGORIES
   ========================================================= */

function CategoriesSection({
  categories,
  branding,
  heading,
  subheading,
}) {
  return (
    <section className="bg-slate-950 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading
          eyebrow={subheading}
          title={heading}
          branding={branding}
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.slice(0, 4).map((category, index) => {
            const id = category?.id;
            const name =
              category?.name ||
              category?.category_name ||
              category?.categoryName ||
              category?.title ||
              "Category";

            const image =
              category?.image ||
              category?.image_url ||
              category?.imageUrl ||
              category?.category_image ||
              category?.categoryImage ||
              "";

            return (
              <Link
                key={id || index}
                to="/institute/website/preview/classes"
                className="group overflow-hidden border transition hover:-translate-y-1 hover:border-sky-400"
                style={cardStyle(branding)}
              >
                <div className="h-48 overflow-hidden bg-slate-900">
                  {image ? (
                    <img
                      src={image}
                      alt={name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sky-400">
                      <Palette size={50} />
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between p-4">
                  <h3 className="text-base font-bold text-white">{name}</h3>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-sky-400/50 text-sky-400">
                    <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <ViewMoreButton
          to="/institute/website/preview/classes"
          label="View More Categories"
          branding={branding}
        />
      </div>
    </section>
  );
}


/* =========================================================
   TRAINERS
   ========================================================= */

function TrainersSection({
  trainers,
  branding,
  heading,
  subheading,
}) {
  return (
    <section className="border-y border-sky-500/10 bg-[#030b17] py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading
          eyebrow={subheading}
          title={heading}
          branding={branding}
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {trainers.slice(0, 4).map((trainer, index) => (
            <TrainerCard
              key={trainer?.id || index}
              trainer={trainer}
              branding={branding}
            />
          ))}
        </div>

        <ViewMoreButton
          to="/institute/website/preview/trainers"
          label="View More Trainers"
          branding={branding}
        />
      </div>
    </section>
  );
}


/* =========================================================
   TRAINER CARD
   ========================================================= */

function TrainerCard({ trainer, branding }) {
  const id = trainer?.id;

  const name =
    typeof trainer?.full_name === "string"
      ? trainer.full_name
      : trainer?.name || "Trainer";

  const image =
    trainer?.profile_image ||
    trainer?.profileImage ||
    trainer?.image ||
    "";

  const specialty =
    trainer?.subcategory ||
    trainer?.sub_category ||
    trainer?.subCategory ||
    trainer?.specialty ||
    trainer?.specialization ||
    "Expert Instructor";

  const rating = Number(trainer?.rating || 0);

  const totalReviews = Number(
    trainer?.total_reviews ?? trainer?.totalReviews ?? trainer?.reviews ?? 0
  );

  const totalStudents = Number(
    trainer?.total_students ??
      trainer?.totalStudents ??
      trainer?.students ??
      0
  );

  return (
    <article
      className="overflow-hidden border transition hover:-translate-y-1 hover:border-sky-400"
      style={cardStyle(branding)}
    >
      <Link to={`/institute/website/preview/trainers/${id || ""}`}>
        <div className="h-52 overflow-hidden bg-slate-900">
          {image ? (
            <img
              src={image}
              alt={name}
              className="h-full w-full object-cover object-top transition duration-500 hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-5xl font-black text-sky-400">
              {name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
      </Link>

      <div className="p-5">
        <h3 className="truncate text-lg font-bold text-white">{name}</h3>

        <p className="mt-1 truncate text-xs text-sky-400">{specialty}</p>

        <div className="mt-4 flex items-center gap-1">
          <Star
            size={15}
            fill="#FACC15"
            className="text-yellow-400"
          />
          <span className="text-sm font-bold text-white">
            {rating > 0 ? rating.toFixed(1) : "0.0"}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="rounded-xl bg-white/5 p-3">
            <p className="text-sm font-bold text-white">{totalReviews}</p>
            <p className="text-[11px] text-slate-400">Reviews</p>
          </div>

          <div className="rounded-xl bg-white/5 p-3">
            <p className="text-sm font-bold text-white">
              {totalStudents.toLocaleString()}
            </p>
            <p className="text-[11px] text-slate-400">Students</p>
          </div>
        </div>
      </div>
    </article>
  );
}


/* =========================================================
   POPULAR CLASSES
   ========================================================= */

function PopularClasses({
  classes,
  branding,
  heading,
  subheading,
}) {
  return (
    <section className="bg-slate-950 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading
          eyebrow={subheading}
          title={heading}
          branding={branding}
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {classes.slice(0, 4).map((item, index) => (
            <ClassCard
              key={item?.id || index}
              item={item}
              branding={branding}
            />
          ))}
        </div>

        <ViewMoreButton
          to="/institute/website/preview/classes"
          label="View More Classes"
          branding={branding}
        />
      </div>
    </section>
  );
}


/* =========================================================
   CLASS CARD
   ========================================================= */

function ClassCard({ item, branding }) {
  const id = item?.id;

  const title =
    item?.title ||
    item?.name ||
    item?.class_name ||
    "Class";

  const image =
    item?.image ||
    item?.image_url ||
    item?.imageUrl ||
    "";

  const trainer =
    item?.trainer_name ||
    item?.trainerName ||
    item?.trainer?.name ||
    item?.trainer?.full_name ||
    "";

  const trainerImage =
    item?.trainer_image ||
    item?.trainerImage ||
    item?.trainer?.image ||
    item?.trainer?.profile_image ||
    "";

  const trainerRating = Number(
    item?.trainer_rating ??
      item?.trainerRating ??
      item?.trainer?.rating ??
      item?.rating ??
      0
  );

  const availableDays = Array.isArray(item?.available_days)
    ? item.available_days
    : Array.isArray(item?.availableDays)
      ? item.availableDays
      : item?.available_days
        ? [item.available_days]
        : [];

  const startDate = item?.start_date ?? item?.startDate;
  const startTime = item?.start_time ?? item?.startTime;
  const students = item?.students ?? item?.student_count;
  const price = item?.price;
  const duration = item?.duration;
  const level = item?.level;

  return (
    <article
      className="overflow-hidden border transition hover:-translate-y-1 hover:border-sky-400"
      style={cardStyle(branding)}
    >
      <Link to={`/institute/website/preview/classes/${id || ""}`}>
        <div className="relative h-48 overflow-hidden bg-slate-900">
          {image ? (
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover transition duration-500 hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sky-400">
              <BookOpen size={50} />
            </div>
          )}

          {level && (
            <span className="absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 text-[10px] font-bold text-sky-300 backdrop-blur">
              {level}
            </span>
          )}
        </div>
      </Link>

      <div className="p-4">
        <h3 className="truncate text-base font-bold text-white">{title}</h3>

        <div className="mt-4 space-y-2 text-[11px] text-slate-300">
          <InfoRow icon={<Clock3 size={13} />} label="Duration" value={duration} />
          <InfoRow icon={<BookOpen size={13} />} label="Level" value={level} />
          <InfoRow
            icon={<ChevronRight size={13} />}
            label="Days"
            value={availableDays.join(", ") || "Not specified"}
          />
          <InfoRow
            icon={<Clock3 size={13} />}
            label="Start Time"
            value={startTime || "Not specified"}
          />
          <InfoRow
            icon={<ChevronRight size={13} />}
            label="Start Date"
            value={startDate || "Not specified"}
          />
          <InfoRow
            icon={<Users size={13} />}
            label="Students"
            value={students ?? 0}
          />
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
          <span className="text-lg font-black text-sky-400">
            {price !== undefined && price !== null && price !== ""
              ? `₹${price}`
              : "Free"}
          </span>

          <span className="text-[11px] text-slate-400">
            {students ?? 0} Students
          </span>
        </div>

        <div className="mt-4 flex items-center gap-3 rounded-xl bg-white/5 p-3">
          {trainerImage ? (
            <img
              src={trainerImage}
              alt={trainer}
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500 font-bold text-white">
              {String(trainer || "T").charAt(0).toUpperCase()}
            </div>
          )}

          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-bold text-white">
              {trainer || "Trainer"}
            </p>

            <div className="mt-1 flex items-center gap-1">
              <Star size={12} fill="#FACC15" className="text-yellow-400" />
              <span className="text-[11px] font-semibold text-slate-200">
                {trainerRating > 0 ? trainerRating.toFixed(1) : "0.0"}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <Link
            to={`/institute/website/preview/classes/${id || ""}`}
            className="rounded-lg px-3 py-2.5 text-center text-xs font-bold transition hover:opacity-90"
            style={{
              backgroundColor: branding.buttonColor,
              color: branding.buttonTextColor,
            }}
          >
            Book
          </Link>

          <Link
            to={`/institute/website/preview/classes/${id || ""}`}
            className="rounded-lg border border-sky-400/60 px-3 py-2.5 text-center text-xs font-bold text-sky-300 transition hover:bg-sky-400/10"
          >
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}


/* =========================================================
   INFO ROW
   ========================================================= */

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="flex items-center gap-1.5 text-slate-500">
        <span className="text-sky-400">{icon}</span>
        {label}
      </span>

      <span className="truncate text-right font-semibold text-slate-200">
        {value || "Not specified"}
      </span>
    </div>
  );
}


/* =========================================================
   MIXED TESTIMONIALS
   Video + Image testimonials are intentionally mixed
   in ONE 4-column row.
   ========================================================= */

function TestimonialsSection({
  testimonials,
  branding,
  heading,
  subheading,
}) {
  const mixedTestimonials = testimonials.slice(0, 4);

  return (
    <section id="student-testimonials" className="border-t border-sky-500/10 bg-[#030b17] py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading
          eyebrow={subheading}
          title={heading}
          branding={branding}
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {mixedTestimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial?.id || index}
              testimonial={testimonial}
              branding={branding}
            />
          ))}
        </div>

        <ViewMoreButton
          to="#student-testimonials"
          label="View More Testimonials"
          branding={branding}
        />
      </div>
    </section>
  );
}


/* =========================================================
   TESTIMONIAL CARD
   ========================================================= */

function TestimonialCard({ testimonial, branding }) {
  const name =
    testimonial?.student_name ||
    testimonial?.studentName ||
    testimonial?.name ||
    "Student";

  const subcategory =
    testimonial?.subcategory ||
    testimonial?.sub_category ||
    testimonial?.subCategory ||
    testimonial?.role ||
    testimonial?.designation ||
    "Student";

  const text =
    testimonial?.testimonial_text ||
    testimonial?.testimonialText ||
    testimonial?.review ||
    testimonial?.comment ||
    testimonial?.message ||
    "The classes are well structured and the trainers are very supportive.";

  const avatar =
    testimonial?.avatar ||
    testimonial?.student_image ||
    testimonial?.studentImage ||
    testimonial?.profile_image ||
    testimonial?.profileImage;

  const rating = Math.min(
    5,
    Math.max(0, Number(testimonial?.rating ?? 5))
  );

  const video =
    testimonial?.video ||
    testimonial?.video_url ||
    testimonial?.videoUrl ||
    testimonial?.video_link ||
    testimonial?.videoLink ||
    testimonial?.media_url ||
    "";

  const image =
    testimonial?.image ||
    testimonial?.image_url ||
    testimonial?.imageUrl ||
    testimonial?.testimonial_image ||
    testimonial?.testimonialImage ||
    "";

  const isVideo =
    Boolean(video) ||
    String(
      testimonial?.type ||
        testimonial?.testimonial_type ||
        testimonial?.testimonialType ||
        testimonial?.media_type ||
        testimonial?.mediaType ||
        ""
    )
      .toLowerCase()
      .includes("video");

  return (
    <article
      className="overflow-hidden border transition hover:-translate-y-1 hover:border-sky-400"
      style={cardStyle(branding)}
    >
      <div className="relative h-48 overflow-hidden bg-slate-900">
        {isVideo && video ? (
          <>
            <video
              src={video}
              controls
              preload="metadata"
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute left-3 top-3 rounded-full bg-sky-500 px-3 py-1 text-[10px] font-bold text-white">
              Video
            </div>
          </>
        ) : image ? (
          <>
            <img
              src={image}
              alt={name}
              className="h-full w-full object-cover"
            />
            <div className="absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 text-[10px] font-bold text-white">
              Image
            </div>
          </>
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-slate-900 to-sky-950 text-sky-400">
            <Users size={50} />
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center gap-3">
          {avatar ? (
            <img
              src={avatar}
              alt={name}
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500 text-sm font-bold text-white">
              {String(name).charAt(0).toUpperCase()}
            </div>
          )}

          <div className="min-w-0">
            <h3 className="truncate text-sm font-bold text-white">{name}</h3>
            <p className="truncate text-[11px] text-sky-400">
              {subcategory}
            </p>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={13}
              fill={star <= rating ? "#FACC15" : "none"}
              className="text-yellow-400"
            />
          ))}
          <span className="ml-1 text-[11px] font-semibold text-slate-300">
            {rating.toFixed(1)}
          </span>
        </div>

        <p className="mt-3 min-h-[72px] text-xs leading-6 text-slate-300">
          "{text}"
        </p>
      </div>
    </article>
  );
}
