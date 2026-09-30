

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  Loader2,
  FileText,
  BookOpen,
  Users,
  MessageSquare,
  CalendarDays,
  Home,
  Eye,
  AlertCircle,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import toast from "react-hot-toast";

import {
  getWebsiteData,
  updateSectionContent,
} from "../../services/websiteService";

/* =========================================================
   BRANDING
========================================================= */

const BRANDING = {
  primary: "#7C3AED",
  gold: "#F59E0B",
  background: "#FAFAF9",
  text: "#111827",
  cards: "#FFFFFF",
  heading: "#111827",
  subheading: "#374151",
  bodyText: "#4B5562",
  icon: "#0D9488",
  button: "#9333EA",
};

/* =========================================================
   SECTION CONFIG
========================================================= */

const SECTION_CONFIG = {
  popularClasses: {
    key: "popularClasses",
    pageKey: "home",
    sectionKey: "popular_classes",
    label: "Popular Classes",
    icon: BookOpen,
    dynamic: true,
    description:
      "Manage the heading and subheading displayed above Popular Classes on the Home page.",
    fields: [
      {
        key: "heading",
        label: "Heading",
        type: "text",
        placeholder: "Explore Our Classes",
        description:
          "Main heading displayed above Popular Classes.",
      },
      {
        key: "subheading",
        label: "Subheading",
        type: "text",
        placeholder: "POPULAR CLASSES",
        description:
          "Small text displayed above the main heading.",
      },
    ],
  },

  homeCategories: {
    key: "homeCategories",
    pageKey: "home",
    sectionKey: "categories",
    label: "Categories",
    icon: BookOpen,
    dynamic: true,
    description:
      "Manage the heading and subheading displayed above Categories on the Home page.",
    fields: [
      {
        key: "heading",
        label: "Heading",
        type: "text",
        placeholder: "Explore Our Categories",
        description:
          "Main heading displayed above Categories.",
      },
      {
        key: "subheading",
        label: "Subheading",
        type: "text",
        placeholder: "CATEGORIES",
        description:
          "Small text displayed above the category heading.",
      },
    ],
  },

  homeTrainers: {
    key: "homeTrainers",
    pageKey: "home",
    sectionKey: "trainers",
    label: "Trainers",
    icon: Users,
    dynamic: true,
    description:
      "Manage the heading and subheading displayed above Trainers on the Home page.",
    fields: [
      {
        key: "heading",
        label: "Heading",
        type: "text",
        placeholder: "Meet Our Expert Trainers",
        description:
          "Main heading displayed above Trainers.",
      },
      {
        key: "subheading",
        label: "Subheading",
        type: "text",
        placeholder: "OUR TRAINERS",
        description:
          "Small text displayed above the main heading.",
      },
    ],
  },

  homeTestimonials: {
    key: "homeTestimonials",
    pageKey: "home",
    sectionKey: "testimonials",
    label: "Testimonials",
    icon: MessageSquare,
    dynamic: true,
    description:
      "Manage the heading and subheading displayed above Testimonials on the Home page.",
    fields: [
      {
        key: "heading",
        label: "Heading",
        type: "text",
        placeholder: "What Our Students Say",
        description:
          "Main heading displayed above Testimonials.",
      },
      {
        key: "subheading",
        label: "Subheading",
        type: "text",
        placeholder: "TESTIMONIALS",
        description:
          "Small text displayed above the main heading.",
      },
    ],
  },

  /* =======================================================
     IMPORTANT:
     CLASSES PAGE HAS TWO DIFFERENT RECORDS
  ======================================================= */

  classCategories: {
    key: "classCategories",
    pageKey: "classes",
    sectionKey: "categories",
    label: "Categories",
    icon: BookOpen,
    dynamic: true,
    description:
      "Manage the heading and subheading displayed above the category section on the Classes page.",
    fields: [
      {
        key: "heading",
        label: "Heading",
        type: "text",
        placeholder: "Browse by Category",
        description:
          "Main heading displayed above the category section.",
      },
      {
        key: "subheading",
        label: "Subheading",
        type: "text",
        placeholder: "CATEGORIES",
        description:
          "Small text displayed above the category heading.",
      },
    ],
  },

  classListing: {
    key: "classListing",
    pageKey: "classes",
    sectionKey: "classes",
    label: "Class Listing",
    icon: BookOpen,
    dynamic: true,
    description:
      "Manage the heading and subheading displayed above the class listing on the Classes page.",
    fields: [
      {
        key: "heading",
        label: "Heading",
        type: "text",
        placeholder: "Choose Your Class",
        description:
          "Main heading displayed above the class listing.",
      },
      {
        key: "subheading",
        label: "Subheading",
        type: "text",
        placeholder: "OUR CLASSES",
        description:
          "Small text displayed above the class listing.",
      },
    ],
  },

  sessions: {
    key: "sessions",
    pageKey: "sessions",
    sectionKey: "sessions",
    label: "Sessions",
    icon: CalendarDays,
    dynamic: true,
    description:
      "Manage the heading and subheading displayed on the Sessions page.",
    fields: [
      {
        key: "heading",
        label: "Heading",
        type: "text",
        placeholder: "Upcoming Sessions",
        description:
          "Main heading displayed on the Sessions page.",
      },
      {
        key: "subheading",
        label: "Subheading",
        type: "text",
        placeholder: "UPCOMING SESSIONS",
        description:
          "Small text displayed above the Sessions heading.",
      },
    ],
  },

  trainers: {
    key: "trainers",
    pageKey: "trainers",
    sectionKey: "trainers",
    label: "Trainers",
    icon: Users,
    dynamic: true,
    description:
      "Manage the heading and subheading displayed on the Trainers page.",
    fields: [
      {
        key: "heading",
        label: "Heading",
        type: "text",
        placeholder: "Meet Our Trainers",
        description:
          "Main heading displayed on the Trainers page.",
      },
      {
        key: "subheading",
        label: "Subheading",
        type: "text",
        placeholder: "OUR TRAINERS",
        description:
          "Small text displayed above the Trainers heading.",
      },
    ],
  },

  testimonials: {
    key: "testimonials",
    pageKey: "testimonials",
    sectionKey: "testimonials",
    label: "Testimonials",
    icon: MessageSquare,
    dynamic: true,
    description:
      "Manage the heading and subheading displayed on the Testimonials page.",
    fields: [
      {
        key: "heading",
        label: "Heading",
        type: "text",
        placeholder: "What Our Students Say",
        description:
          "Main heading displayed on the Testimonials page.",
      },
      {
        key: "subheading",
        label: "Subheading",
        type: "text",
        placeholder: "TESTIMONIALS",
        description:
          "Small text displayed above the Testimonials heading.",
      },
    ],
  },
};

/* =========================================================
   DEFAULT CONTENT
========================================================= */

const DEFAULT_CONTENT = {
  popularClasses: {
    heading: "Explore Our Classes",
    subheading: "POPULAR CLASSES",
  },

  homeCategories: {
    heading: "Explore Our Categories",
    subheading: "CATEGORIES",
  },

  homeTrainers: {
    heading: "Meet Our Expert Trainers",
    subheading: "OUR TRAINERS",
  },

  homeTestimonials: {
    heading: "What Our Students Say",
    subheading: "TESTIMONIALS",
  },

  classCategories: {
    heading: "Browse by Category",
    subheading: "CATEGORIES",
  },

  classListing: {
    heading: "Choose Your Class",
    subheading: "OUR CLASSES",
  },

  sessions: {
    heading: "Upcoming Sessions",
    subheading: "UPCOMING SESSIONS",
  },

  trainers: {
    heading: "Meet Our Trainers",
    subheading: "OUR TRAINERS",
  },

  testimonials: {
    heading: "What Our Students Say",
    subheading: "TESTIMONIALS",
  },
};

/* =========================================================
   PAGE CONFIG
========================================================= */

const PAGE_CONFIG = [
  {
    key: "home",
    label: "Home",
    icon: Home,
    sections: [
      "popularClasses",
      "homeCategories",
      "homeTrainers",
      "homeTestimonials",
    ],
  },

  {
    key: "classes",
    label: "Classes",
    icon: BookOpen,
    sections: [
      "classCategories",
      "classListing",
    ],
  },

  {
    key: "sessions",
    label: "Sessions",
    icon: CalendarDays,
    sections: ["sessions"],
  },

  {
    key: "trainers",
    label: "Trainers",
    icon: Users,
    sections: ["trainers"],
  },

  {
    key: "testimonials",
    label: "Testimonials",
    icon: MessageSquare,
    sections: ["testimonials"],
  },
];

/* =========================================================
   HELPERS
========================================================= */

const normalizeKey = (value) =>
  String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[\s_-]+/g, "");

const getBackendPageKey = (section) =>
  String(
    section?.pageKey ??
      section?.page_key ??
      section?.page ??
      ""
  )
    .trim()
    .toLowerCase();

const getBackendSectionKey = (section) =>
  String(
    section?.sectionKey ??
      section?.section_key ??
      ""
  )
    .trim()
    .toLowerCase();

const parseContent = (raw) => {
  if (
    raw &&
    typeof raw === "object" &&
    !Array.isArray(raw)
  ) {
    return raw;
  }

  if (typeof raw === "string") {
    try {
      const parsed = JSON.parse(raw);

      if (
        parsed &&
        typeof parsed === "object" &&
        !Array.isArray(parsed)
      ) {
        return parsed;
      }
    } catch {
      return {};
    }
  }

  return {};
};

const normalizeContent = (
  configKey,
  rawContent
) => {
  const defaults =
    DEFAULT_CONTENT[configKey] || {};

  const existing = parseContent(
    rawContent
  );

  return {
    ...defaults,
    ...existing,

    heading:
      existing.heading ??
      existing.title ??
      defaults.heading ??
      "",

    subheading:
      existing.subheading ??
      existing.subtitle ??
      defaults.subheading ??
      "",
  };
};

const makeMapKey = (
  pageKey,
  sectionKey
) =>
  `${String(pageKey).trim().toLowerCase()}:${normalizeKey(
    sectionKey
  )}`;

/* =========================================================
   BUILD SECTIONS
========================================================= */

const buildWebsiteSections = (
  backendSections
) => {
  const source = Array.isArray(
    backendSections
  )
    ? backendSections
    : [];

  const backendMap = new Map();

  /*
   * IMPORTANT:
   * We ONLY use explicit page + section keys
   * when available.
   *
   * This prevents:
   *
   * home:categories
   *
   * from being confused with:
   *
   * classes:categories
   *
   * and prevents:
   *
   * classes:classes
   *
   * from being confused with anything else.
   */
  source.forEach((section) => {
    const pageKey =
      getBackendPageKey(section);

    const sectionKey =
      getBackendSectionKey(section);

    if (!pageKey || !sectionKey) {
      return;
    }

    const mapKey = makeMapKey(
      pageKey,
      sectionKey
    );

    /*
     * Keep the latest backend record.
     * This is safer when old duplicate records
     * exist in the database.
     */
    backendMap.set(
      mapKey,
      section
    );
  });

  const result = [];

  PAGE_CONFIG.forEach((page) => {
    page.sections.forEach(
      (configKey) => {
        const config =
          SECTION_CONFIG[configKey];

        if (!config) {
          return;
        }

        const mapKey = makeMapKey(
          config.pageKey,
          config.sectionKey
        );

        const backendSection =
          backendMap.get(mapKey);

        result.push({
          ...(backendSection || {}),

          id:
            backendSection?.id ?? null,

          __configKey:
            configKey,

          __pageKey:
            config.pageKey,

          __sectionKey:
            config.sectionKey,

          __virtual:
            !backendSection,

          content:
            normalizeContent(
              configKey,
              backendSection?.content
            ),
        });
      }
    );
  });

  return result;
};

/* =========================================================
   COMPONENT
========================================================= */

export default function WebsiteContent() {
  const navigate = useNavigate();

  const [sections, setSections] =
    useState([]);

  const [activeSection, setActiveSection] =
    useState(null);

  const [content, setContent] =
    useState({});

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [hasChanges, setHasChanges] =
    useState(false);

  const [
    expandedPages,
    setExpandedPages,
  ] = useState({
    home: true,
    about: true,
    classes: true,
    sessions: true,
    trainers: true,
    testimonials: true,
  });

  /* =======================================================
     LOAD
  ======================================================= */

  const loadWebsite = async (
    preserveConfigKey = null
  ) => {
    try {
      setLoading(true);

      const response =
        await getWebsiteData();

      console.log(
        "WEBSITE CONTENT RESPONSE:",
        response
      );

      let data = response;

      if (
        data?.data &&
        typeof data.data === "object"
      ) {
        data = data.data;
      }

      const backendSections =
        Array.isArray(data?.sections)
          ? data.sections
          : [];

      console.log(
        "BACKEND WEBSITE SECTIONS:",
        backendSections
      );

      const websiteSections =
        buildWebsiteSections(
          backendSections
        );

      console.log(
        "RESOLVED WEBSITE SECTIONS:",
        websiteSections
      );

      setSections(
        websiteSections
      );

      let selected = null;

      if (preserveConfigKey) {
        selected =
          websiteSections.find(
            (section) =>
              section.__configKey ===
              preserveConfigKey
          );
      }

      if (!selected) {
        selected =
          websiteSections[0] || null;
      }

      if (selected) {
        setActiveSection(
          selected
        );

        setContent(
          normalizeContent(
            selected.__configKey,
            selected.content
          )
        );
      }
    } catch (error) {
      console.error(
        "LOAD WEBSITE CONTENT ERROR:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to load website content"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWebsite();
  }, []);

  /* =======================================================
     ACTIVE CONFIG
  ======================================================= */

  const activeConfig =
    useMemo(() => {
      if (!activeSection) {
        return null;
      }

      return (
        SECTION_CONFIG[
          activeSection.__configKey
        ] || null
      );
    }, [activeSection]);

  /* =======================================================
     SELECT
  ======================================================= */

  const selectSection = (
    section
  ) => {
    if (!section) {
      return;
    }

    setActiveSection(
      section
    );

    setContent(
      normalizeContent(
        section.__configKey,
        section.content
      )
    );

    setHasChanges(false);
  };

  /* =======================================================
     CHANGE
  ======================================================= */

  const handleChange = (
    key,
    value
  ) => {
    setContent(
      (previous) => ({
        ...previous,
        [key]: value,
      })
    );

    setHasChanges(true);
  };

  /* =======================================================
     SAVE
  ======================================================= */

  const handleSave = async () => {
    if (!activeSection) {
      return;
    }

    const pageKey =
      activeSection.__pageKey;

    const sectionKey =
      activeSection.__sectionKey;

    const configKey =
      activeSection.__configKey;

    if (!pageKey || !sectionKey) {
      toast.error(
        "Page key or section key is missing"
      );
      return;
    }

    try {
      setSaving(true);

      console.log(
        "================================="
      );

      console.log(
        "SAVING WEBSITE CONTENT"
      );

      console.log({
        pageKey,
        sectionKey,
        configKey,
        content,
      });

      console.log(
        "================================="
      );

      await updateSectionContent({
        pageKey,
        sectionKey,
        content: {
          ...content,
        },
      });

      toast.success(
        `${activeConfig?.label || "Section"} saved successfully`
      );

      setHasChanges(false);

      /*
       * Reload from backend.
       *
       * This is important because it proves
       * that the saved value is actually being
       * returned by the API.
       */
      await loadWebsite(
        configKey
      );
    } catch (error) {
      console.error(
        "SAVE WEBSITE CONTENT ERROR:",
        error
      );

      console.error(
        "STATUS:",
        error?.response?.status
      );

      console.error(
        "BACKEND:",
        error?.response?.data
      );

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to save website content"
      );
    } finally {
      setSaving(false);
    }
  };

  /* =======================================================
     TOGGLE PAGE
  ======================================================= */

  const togglePage = (
    pageKey
  ) => {
    setExpandedPages(
      (previous) => ({
        ...previous,
        [pageKey]:
          !previous[pageKey],
      })
    );
  };

  /* =======================================================
     GET SECTION
  ======================================================= */

  const getPageSection = (
    configKey
  ) =>
    sections.find(
      (section) =>
        section.__configKey ===
        configKey
    );

  /* =======================================================
     ENABLED
  ======================================================= */

  const isSectionEnabled = (
    section
  ) => {
    const value =
      section?.is_enabled ??
      section?.isEnabled ??
      section?.enabled ??
      true;

    return (
      value === true ||
      value === 1 ||
      value === "1" ||
      String(value).toLowerCase() ===
        "true"
    );
  };

  /* =======================================================
     FIELD
  ======================================================= */

  const renderField = (
    field
  ) => {
    const value =
      content?.[field.key] ?? "";

    return (
      <div
        key={field.key}
        className="space-y-2"
      >
        <label
          className="block text-sm font-semibold"
          style={{
            color:
              BRANDING.heading,
          }}
        >
          {field.label}
        </label>

        {field.description && (
          <p
            className="text-xs"
            style={{
              color:
                BRANDING.bodyText,
            }}
          >
            {field.description}
          </p>
        )}

        {field.type ===
        "textarea" ? (
          <textarea
            value={value}
            onChange={(event) =>
              handleChange(
                field.key,
                event.target.value
              )
            }
            placeholder={
              field.placeholder
            }
            rows={5}
            className="w-full rounded-xl px-4 py-3 outline-none resize-y transition"
            style={{
              backgroundColor:
                "#FFFFFF",
              color:
                BRANDING.text,
              border:
                "1px solid #D1D5DB",
            }}
            onFocus={(event) => {
              event.currentTarget.style.borderColor =
                BRANDING.primary;
            }}
            onBlur={(event) => {
              event.currentTarget.style.borderColor =
                "#D1D5DB";
            }}
          />
        ) : (
          <input
            type="text"
            value={value}
            onChange={(event) =>
              handleChange(
                field.key,
                event.target.value
              )
            }
            placeholder={
              field.placeholder
            }
            className="w-full rounded-xl px-4 py-3 outline-none transition"
            style={{
              backgroundColor:
                "#FFFFFF",
              color:
                BRANDING.text,
              border:
                "1px solid #D1D5DB",
            }}
            onFocus={(event) => {
              event.currentTarget.style.borderColor =
                BRANDING.primary;
            }}
            onBlur={(event) => {
              event.currentTarget.style.borderColor =
                "#D1D5DB";
            }}
          />
        )}
      </div>
    );
  };

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <div
        className="min-h-[400px] flex items-center justify-center"
        style={{
          backgroundColor:
            BRANDING.background,
        }}
      >
        <div
          className="flex items-center gap-3"
          style={{
            color:
              BRANDING.bodyText,
          }}
        >
          <Loader2
            size={22}
            className="animate-spin"
            style={{
              color:
                BRANDING.primary,
            }}
          />

          <span>
            Loading website content...
          </span>
        </div>
      </div>
    );
  }

  /* =======================================================
     UI
  ======================================================= */

  return (
    <div
      className="space-y-6 pb-28"
      style={{
        fontFamily: "inherit",
      }}
    >
      {/* HEADER */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() =>
              navigate(
                "/institute/website"
              )
            }
            className="w-10 h-10 rounded-xl flex items-center justify-center transition hover:bg-gray-100"
            style={{
              color:
                BRANDING.bodyText,
            }}
          >
            <ArrowLeft
              size={21}
            />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <FileText
                size={23}
                style={{
                  color:
                    BRANDING.primary,
                }}
              />

              <h1
                className="text-2xl font-bold"
                style={{
                  color:
                    BRANDING.heading,
                }}
              >
                Website Content
              </h1>
            </div>

            <p
              className="text-sm mt-1"
              style={{
                color:
                  BRANDING.bodyText,
              }}
            >
              Manage headings, subheadings
              and page content displayed on
              your institute website.
            </p>
          </div>
        </div>

        {activeSection && (
          <button
            type="button"
            onClick={
              handleSave
            }
            disabled={
              saving ||
              !hasChanges
            }
            className="px-5 py-2.5 rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor:
                BRANDING.button,
            }}
          >
            {saving ? (
              <>
                <Loader2
                  size={18}
                  className="animate-spin"
                />
                Saving...
              </>
            ) : (
              <>
                <Save size={18} />
                Save Changes
              </>
            )}
          </button>
        )}
      </div>

      {/* MAIN */}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* LEFT */}

        <aside className="lg:col-span-1">
          <div
            className="rounded-2xl border p-3 lg:sticky lg:top-6"
            style={{
              backgroundColor:
                BRANDING.cards,
              borderColor:
                "#E5E7EB",
            }}
          >
            <p
              className="px-3 py-2 text-xs font-semibold uppercase tracking-wider"
              style={{
                color:
                  BRANDING.subheading,
              }}
            >
              Website Content
            </p>

            <div className="space-y-2">
              {PAGE_CONFIG.map(
                (page) => {
                  const PageIcon =
                    page.icon;

                  const expanded =
                    expandedPages[
                      page.key
                    ];

                  return (
                    <div
                      key={page.key}
                      className="rounded-xl overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          togglePage(
                            page.key
                          )
                        }
                        className="w-full flex items-center gap-3 px-3 py-3 text-left transition"
                        style={{
                          backgroundColor:
                            "#F8FAFC",
                        }}
                      >
                        <PageIcon
                          size={18}
                          style={{
                            color:
                              BRANDING.primary,
                          }}
                        />

                        <span
                          className="flex-1 text-sm font-bold"
                          style={{
                            color:
                              BRANDING.heading,
                          }}
                        >
                          {
                            page.label
                          }
                        </span>

                        {expanded ? (
                          <ChevronDown
                            size={17}
                          />
                        ) : (
                          <ChevronRight
                            size={17}
                          />
                        )}
                      </button>

                      {expanded && (
                        <div className="mt-1 space-y-1">
                          {page.sections.map(
                            (configKey) => {
                              const config =
                                SECTION_CONFIG[
                                  configKey
                                ];

                              const section =
                                getPageSection(
                                  configKey
                                );

                              if (
                                !config ||
                                !section
                              ) {
                                return null;
                              }

                              const Icon =
                                config.icon;

                              const isActive =
                                activeSection?.__configKey ===
                                configKey;

                              const enabled =
                                isSectionEnabled(
                                  section
                                );

                              return (
                                <button
                                  key={
                                    configKey
                                  }
                                  type="button"
                                  onClick={() =>
                                    selectSection(
                                      section
                                    )
                                  }
                                  className="w-full text-left rounded-xl px-3 py-3 ml-1 flex items-center gap-3 transition"
                                  style={{
                                    width:
                                      "calc(100% - 0.25rem)",
                                    backgroundColor:
                                      isActive
                                        ? `${BRANDING.primary}12`
                                        : "transparent",
                                    border:
                                      isActive
                                        ? `1px solid ${BRANDING.primary}30`
                                        : "1px solid transparent",
                                  }}
                                >
                                  <div
                                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                                    style={{
                                      backgroundColor:
                                        isActive
                                          ? `${BRANDING.primary}15`
                                          : "#F3F4F6",
                                    }}
                                  >
                                    <Icon
                                      size={16}
                                      style={{
                                        color:
                                          isActive
                                            ? BRANDING.primary
                                            : BRANDING.subheading,
                                      }}
                                    />
                                  </div>

                                  <div className="flex-1 min-w-0">
                                    <p
                                      className="text-sm font-semibold truncate"
                                      style={{
                                        color:
                                          isActive
                                            ? BRANDING.heading
                                            : BRANDING.bodyText,
                                      }}
                                    >
                                      {
                                        config.label
                                      }
                                    </p>

                                    {config.dynamic && (
                                      <p
                                        className="text-[10px] mt-0.5"
                                        style={{
                                          color:
                                            BRANDING.icon,
                                        }}
                                      >
                                        Data automatic
                                      </p>
                                    )}

                                    {!enabled && (
                                      <p
                                        className="text-[10px] mt-0.5"
                                        style={{
                                          color:
                                            BRANDING.gold,
                                        }}
                                      >
                                        Hidden
                                      </p>
                                    )}
                                  </div>
                                </button>
                              );
                            }
                          )}
                        </div>
                      )}
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </aside>

        {/* RIGHT */}

        <main className="lg:col-span-3">
          {!activeSection ? (
            <div className="rounded-2xl border p-10 text-center">
              <FileText
                size={40}
                className="mx-auto mb-4"
              />

              <h2 className="text-lg font-semibold">
                Select a section
              </h2>

              <p className="text-sm mt-2">
                Select a page and section
                from the left.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {/* SECTION HEADER */}

              <div
                className="rounded-2xl border p-6"
                style={{
                  backgroundColor:
                    BRANDING.cards,
                  borderColor:
                    "#E5E7EB",
                }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{
                      backgroundColor:
                        `${BRANDING.primary}12`,
                    }}
                  >
                    {(() => {
                      const Icon =
                        activeConfig?.icon ||
                        FileText;

                      return (
                        <Icon
                          size={23}
                          style={{
                            color:
                              BRANDING.primary,
                          }}
                        />
                      );
                    })()}
                  </div>

                  <div>
                    <h2
                      className="text-xl font-semibold"
                      style={{
                        color:
                          BRANDING.heading,
                      }}
                    >
                      {
                        activeConfig?.label
                      }
                    </h2>

                    <p
                      className="text-sm mt-1"
                      style={{
                        color:
                          BRANDING.bodyText,
                      }}
                    >
                      {
                        activeConfig?.description
                      }
                    </p>

                    {/* DEBUG / IDENTIFICATION */}

                    <p
                      className="text-[11px] mt-2"
                      style={{
                        color:
                          BRANDING.icon,
                      }}
                    >
                      Page:{" "}
                      {
                        activeSection.__pageKey
                      }{" "}
                      • Section:{" "}
                      {
                        activeSection.__sectionKey
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* FORM */}

              <div
                className="rounded-2xl border"
                style={{
                  backgroundColor:
                    BRANDING.cards,
                  borderColor:
                    "#E5E7EB",
                }}
              >
                <div className="p-6 sm:p-8">
                  <div className="space-y-6">
                    {(
                      activeConfig?.fields ||
                      []
                    ).map(
                      renderField
                    )}
                  </div>
                </div>

                {activeConfig?.dynamic && (
                  <div
                    className="mx-6 sm:mx-8 mb-6 rounded-xl border p-4 flex items-start gap-3"
                    style={{
                      backgroundColor:
                        "#F8FAFC",
                      borderColor:
                        "#E5E7EB",
                    }}
                  >
                    <Eye
                      size={18}
                      className="shrink-0 mt-0.5"
                      style={{
                        color:
                          BRANDING.icon,
                      }}
                    />

                    <div>
                      <p
                        className="text-sm font-semibold"
                        style={{
                          color:
                            BRANDING.heading,
                        }}
                      >
                        Content and data are
                        separate
                      </p>

                      <p
                        className="text-xs mt-1"
                        style={{
                          color:
                            BRANDING.bodyText,
                        }}
                      >
                        The heading and
                        subheading are managed
                        here. The actual data
                        records continue to
                        come from their
                        respective modules.
                      </p>
                    </div>
                  </div>
                )}

                <div
                  className="px-6 sm:px-8 py-5 border-t flex justify-end"
                  style={{
                    borderColor:
                      "#E5E7EB",
                  }}
                >
                  <button
                    type="button"
                    onClick={
                      handleSave
                    }
                    disabled={
                      saving ||
                      !hasChanges
                    }
                    className="px-5 py-2.5 rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor:
                        BRANDING.button,
                    }}
                  >
                    {saving ? (
                      <>
                        <Loader2
                          size={18}
                          className="animate-spin"
                        />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save size={18} />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* PREVIEW */}

              <div
                className="rounded-2xl border p-5 flex items-start gap-3"
                style={{
                  backgroundColor:
                    `${BRANDING.primary}08`,
                  borderColor:
                    `${BRANDING.primary}20`,
                }}
              >
                <Eye
                  size={20}
                  className="shrink-0 mt-0.5"
                  style={{
                    color:
                      BRANDING.primary,
                  }}
                />

                <div>
                  <p
                    className="text-sm font-semibold"
                    style={{
                      color:
                        BRANDING.heading,
                    }}
                  >
                    Preview your changes
                  </p>

                  <p
                    className="text-sm mt-1"
                    style={{
                      color:
                        BRANDING.bodyText,
                    }}
                  >
                    Save your changes and
                    refresh the website preview
                    to see the updated content.
                  </p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* UNSAVED BAR */}

      {hasChanges && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-3xl">
          <div
            className="rounded-2xl border p-4 shadow-2xl"
            style={{
              backgroundColor:
                BRANDING.cards,
              borderColor:
                `${BRANDING.primary}40`,
            }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-start gap-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor:
                      `${BRANDING.gold}15`,
                  }}
                >
                  <AlertCircle
                    size={18}
                    style={{
                      color:
                        BRANDING.gold,
                    }}
                  />
                </div>

                <div>
                  <p
                    className="text-sm font-semibold"
                    style={{
                      color:
                        BRANDING.heading,
                    }}
                  >
                    Unsaved changes
                  </p>

                  <p
                    className="text-xs mt-1"
                    style={{
                      color:
                        BRANDING.bodyText,
                    }}
                  >
                    Save your changes before
                    leaving this page.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={
                  handleSave
                }
                disabled={saving}
                className="px-5 py-2.5 rounded-xl text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                style={{
                  backgroundColor:
                    BRANDING.button,
                }}
              >
                {saving ? (
                  <>
                    <Loader2
                      size={17}
                      className="animate-spin"
                    />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={17} />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}