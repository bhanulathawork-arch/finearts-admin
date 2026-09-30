import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getPublicWebsiteData,
  setPreviewInstituteId,
} from "../../services/websiteService";

import WebsiteNavbar from "./WebsiteNavbar";
import WebsiteFooter from "./WebsiteFooter";


/* =========================================================
   DEFAULT BRANDING
========================================================= */

const DEFAULT_BRANDING = {
  navbarColor: "#1F2937",

  headingColor: "#111827",
  subheadingColor: "#5B21B6",
  textColor: "#111827",
  iconColor: "#F59E0B",

  buttonColor: "#7C3AED",
  buttonTextColor: "#FFFFFF",

  pageBackgroundColor: "#FAFAF9",
  cardBackgroundColor: "#FFFFFF",

  footerBackgroundColor: "#1F2937",
  footerHeadingColor: "#FFFFFF",
  footerTextColor: "#FAFAF9",

  fontHeading: "Inter",
  fontSubheading: "Inter",
  fontBody: "Inter",

  headingWeight: 700,
  headingLineHeight: 1.15,
  headingLetterSpacing: 0,

  subheadingWeight: 600,
  subheadingLineHeight: 1.4,

  bodyWeight: 400,
  bodyLineHeight: 1.6,
  bodyLetterSpacing: 0,

  roundedButtons: true,
};


/* =========================================================
   DEFAULT CONTENT
========================================================= */

const DEFAULT_CONTENT = {
  home: {
    hero: {
      heading: "",
      subheading: "",
    },

    popularClasses: {
      heading: "",
      subheading: "",
    },

    categories: {
      heading: "",
      subheading: "",
    },

    trainers: {
      heading: "",
      subheading: "",
    },

    testimonials: {
      heading: "",
      subheading: "",
    },
  },

  about: {
    heading: "",
    subheading: "",
  },

  classes: {
    heading: "",
    subheading: "",
  },

  categories: {
    heading: "",
    subheading: "",
  },

  trainers: {
    heading: "",
    subheading: "",
  },

  sessions: {
    heading: "",
    subheading: "",
  },

  testimonials: {
    heading: "",
    subheading: "",
  },

  studentLogin: {
    heading: "",
    subheading: "",
  },
};


/* =========================================================
   HELPERS
========================================================= */

const getFirstValue = (...values) => {
  return values.find(
    (value) =>
      value !== undefined &&
      value !== null &&
      String(value).trim() !== ""
  );
};


const getFirstArray = (...values) => {
  for (const value of values) {
    if (Array.isArray(value)) {
      return value;
    }
  }

  return [];
};


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

  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "number") {
    return value === 1;
  }

  const normalized =
    String(value)
      .trim()
      .toLowerCase();

  if (
    ["1", "true", "yes", "on"].includes(
      normalized
    )
  ) {
    return true;
  }

  if (
    ["0", "false", "no", "off", ""].includes(
      normalized
    )
  ) {
    return false;
  }

  return defaultValue;
};


const normalizeKey = (value) => {
  if (
    value === undefined ||
    value === null
  ) {
    return "";
  }

  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[\s_-]+/g, "");
};


/* =========================================================
   PAGE ALIASES
========================================================= */

const PAGE_ALIASES = {
  home: "home",
  homepage: "home",

  about: "about",
  aboutus: "about",
  aboutpage: "about",

  classes: "classes",
  class: "classes",
  courses: "classes",
  course: "classes",

  categories: "categories",
  category: "categories",

  trainers: "trainers",
  trainer: "trainers",

  sessions: "sessions",
  session: "sessions",

  testimonials: "testimonials",
  testimonial: "testimonials",

  studentlogin: "studentLogin",
  student: "studentLogin",
  students: "studentLogin",
};


const SECTION_ALIASES = {
  hero: "hero",

  popularclasses: "popularClasses",
  popularclass: "popularClasses",
  popularcourses: "popularClasses",
  popularcourse: "popularClasses",

  categories: "categories",
  category: "categories",

  trainers: "trainers",
  trainer: "trainers",

  testimonials: "testimonials",
  testimonial: "testimonials",

  about: "about",
  aboutus: "about",

  classes: "classes",
  class: "classes",
  courses: "classes",
  course: "classes",

  sessions: "sessions",
  session: "sessions",

  studentlogin: "studentLogin",
  student: "studentLogin",
};


const getCanonicalPage = (value) => {
  const normalized =
    normalizeKey(value);

  return (
    PAGE_ALIASES[normalized] ||
    normalized
  );
};


const getCanonicalSection = (value) => {
  const normalized =
    normalizeKey(value);

  return (
    SECTION_ALIASES[normalized] ||
    normalized
  );
};


/* =========================================================
   BRANDING
========================================================= */

const normalizeBranding = (
  branding = {}
) => {
  const source =
    branding?.branding ||
    branding ||
    {};

  return {
    ...DEFAULT_BRANDING,

    navbarColor:
      getFirstValue(
        source?.navbarColor,
        source?.navbar_color,
        source?.navbarBackground,
        source?.navbar_background
      ) ||
      DEFAULT_BRANDING.navbarColor,

    headingColor:
      getFirstValue(
        source?.headingColor,
        source?.heading_color
      ) ||
      DEFAULT_BRANDING.headingColor,

    subheadingColor:
      getFirstValue(
        source?.subheadingColor,
        source?.subheading_color
      ) ||
      DEFAULT_BRANDING.subheadingColor,

    textColor:
      getFirstValue(
        source?.textColor,
        source?.text_color
      ) ||
      DEFAULT_BRANDING.textColor,

    iconColor:
      getFirstValue(
        source?.iconColor,
        source?.icon_color
      ) ||
      DEFAULT_BRANDING.iconColor,

    buttonColor:
      getFirstValue(
        source?.buttonColor,
        source?.button_color
      ) ||
      DEFAULT_BRANDING.buttonColor,

    buttonTextColor:
      getFirstValue(
        source?.buttonTextColor,
        source?.button_text_color
      ) ||
      DEFAULT_BRANDING.buttonTextColor,

    pageBackgroundColor:
      getFirstValue(
        source?.pageBackgroundColor,
        source?.page_background,
        source?.page_background_color
      ) ||
      DEFAULT_BRANDING.pageBackgroundColor,

    cardBackgroundColor:
      getFirstValue(
        source?.cardBackgroundColor,
        source?.card_background,
        source?.card_background_color
      ) ||
      DEFAULT_BRANDING.cardBackgroundColor,

    footerBackgroundColor:
      getFirstValue(
        source?.footerBackgroundColor,
        source?.footer_background,
        source?.footer_background_color
      ) ||
      DEFAULT_BRANDING.footerBackgroundColor,

    footerHeadingColor:
      getFirstValue(
        source?.footerHeadingColor,
        source?.footer_heading_color
      ) ||
      DEFAULT_BRANDING.footerHeadingColor,

    footerTextColor:
      getFirstValue(
        source?.footerTextColor,
        source?.footer_text_color
      ) ||
      DEFAULT_BRANDING.footerTextColor,

    fontHeading:
      getFirstValue(
        source?.fontHeading,
        source?.heading_font
      ) ||
      DEFAULT_BRANDING.fontHeading,

    fontSubheading:
      getFirstValue(
        source?.fontSubheading,
        source?.subheading_font
      ) ||
      DEFAULT_BRANDING.fontSubheading,

    fontBody:
      getFirstValue(
        source?.fontBody,
        source?.body_font
      ) ||
      DEFAULT_BRANDING.fontBody,

    headingWeight:
      source?.headingWeight ??
      source?.heading_weight ??
      DEFAULT_BRANDING.headingWeight,

    headingLineHeight:
      source?.headingLineHeight ??
      source?.heading_line_height ??
      DEFAULT_BRANDING.headingLineHeight,

    headingLetterSpacing:
      source?.headingLetterSpacing ??
      source?.heading_letter_spacing ??
      DEFAULT_BRANDING.headingLetterSpacing,

    subheadingWeight:
      source?.subheadingWeight ??
      source?.subheading_weight ??
      DEFAULT_BRANDING.subheadingWeight,

    subheadingLineHeight:
      source?.subheadingLineHeight ??
      source?.subheading_line_height ??
      DEFAULT_BRANDING.subheadingLineHeight,

    bodyWeight:
      source?.bodyWeight ??
      source?.body_weight ??
      DEFAULT_BRANDING.bodyWeight,

    bodyLineHeight:
      source?.bodyLineHeight ??
      source?.body_line_height ??
      DEFAULT_BRANDING.bodyLineHeight,

    bodyLetterSpacing:
      source?.bodyLetterSpacing ??
      source?.body_letter_spacing ??
      DEFAULT_BRANDING.bodyLetterSpacing,

    roundedButtons:
      normalizeBoolean(
        getFirstValue(
          source?.roundedButtons,
          source?.rounded_buttons
        ),
        DEFAULT_BRANDING.roundedButtons
      ),
  };
};


/* =========================================================
   RESPONSE HELPERS
========================================================= */

const getResponseData = (
  response
) => {
  if (
    response?.data &&
    typeof response.data === "object"
  ) {
    return response.data;
  }

  return response || {};
};


const parseContent = (
  value
) => {
  if (
    value &&
    typeof value === "object" &&
    !Array.isArray(value)
  ) {
    return value;
  }

  if (
    typeof value === "string"
  ) {
    try {
      const parsed =
        JSON.parse(value);

      if (
        parsed &&
        typeof parsed === "object" &&
        !Array.isArray(parsed)
      ) {
        return parsed;
      }
    } catch (error) {
      console.warn(
        "Failed to parse website content:",
        error
      );
    }
  }

  return {};
};


/* =========================================================
   DEEP MERGE
========================================================= */

const mergeContent = (
  base = {},
  override = {}
) => {
  const result = {
    ...base,
  };

  Object.keys(
    override || {}
  ).forEach((key) => {
    const baseValue =
      result[key];

    const overrideValue =
      override[key];

    if (
      baseValue &&
      typeof baseValue === "object" &&
      !Array.isArray(baseValue) &&
      overrideValue &&
      typeof overrideValue === "object" &&
      !Array.isArray(overrideValue)
    ) {
      result[key] =
        mergeContent(
          baseValue,
          overrideValue
        );
    } else {
      result[key] =
        overrideValue;
    }
  });

  return result;
};


/* =========================================================
   BUILD CONTENT FROM DATABASE ROWS
========================================================= */

const buildContentFromRows = (
  rows = []
) => {
  const result = {};

  if (!Array.isArray(rows)) {
    return result;
  }

  rows.forEach((row) => {
    if (!row) {
      return;
    }

    const rawPage =
      row?.page_key ??
      row?.pageKey ??
      row?.page ??
      "";

    const rawSection =
      row?.section_key ??
      row?.sectionKey ??
      row?.section_type ??
      row?.sectionType ??
      row?.section ??
      "";

    const page =
      getCanonicalPage(
        rawPage
      );

    let section =
      getCanonicalSection(
        rawSection
      );

    if (!section) {
      section = page;
    }

    const jsonContent =
      parseContent(
        row?.content ??
        row?.data ??
        row?.value
      );

    let sectionContent = {
      ...jsonContent,
    };

    if (
      row?.heading !== undefined &&
      row?.heading !== null
    ) {
      sectionContent.heading =
        row.heading;
    }

    if (
      row?.subheading !== undefined &&
      row?.subheading !== null
    ) {
      sectionContent.subheading =
        row.subheading;
    }

    if (
      !result[page] ||
      typeof result[page] !== "object"
    ) {
      result[page] = {};
    }

    if (page === "home") {
      result.home[section] =
        mergeContent(
          result.home[section] || {},
          sectionContent
        );

      return;
    }

    result[page] =
      mergeContent(
        result[page] || {},
        sectionContent
      );
  });

  return result;
};


/* =========================================================
   INSTITUTE CATEGORY HELPERS
========================================================= */

const normalizeCategoryId = (value) => {
  if (
    value === undefined ||
    value === null ||
    String(value).trim() === ""
  ) {
    return null;
  }

  const id = Number(value);

  return Number.isFinite(id) ? id : null;
};

const getCategoryIdsFromValue = (value) => {
  if (!value) return [];

  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (
          item &&
          typeof item === "object"
        ) {
          return normalizeCategoryId(
            item?.category_id ??
            item?.categoryId ??
            item?.id
          );
        }

        return normalizeCategoryId(item);
      })
      .filter(
        (id) => id !== null
      );
  }

  return [
    normalizeCategoryId(value),
  ].filter(
    (id) => id !== null
  );
};

const getInstituteCategoryIds = (
  institute = {},
  currentInstituteId = null
) => {
  const ids = [
    ...getCategoryIdsFromValue(
      institute?.category_id
    ),
    ...getCategoryIdsFromValue(
      institute?.categoryId
    ),
    ...getCategoryIdsFromValue(
      institute?.category_ids
    ),
    ...getCategoryIdsFromValue(
      institute?.categoryIds
    ),
    ...getCategoryIdsFromValue(
      institute?.categories
    ),
    ...getCategoryIdsFromValue(
      institute?.category
    ),
    ...getCategoryIdsFromValue(
      institute?.selectedCategories
    ),
  ];

  if (ids.length > 0) {
    return [...new Set(ids)];
  }


  const instituteId =
    currentInstituteId ||
    institute?.id ||
    institute?.institute_id ||
    null;

  if (instituteId) {
    try {
      const stored =
        localStorage.getItem(
          `instituteCategoryIds_${String(
            instituteId
          )}`
        );

      if (stored) {
        const parsed =
          JSON.parse(stored);

        const storedIds =
          getCategoryIdsFromValue(
            parsed
          );

        if (storedIds.length > 0) {
          return [
            ...new Set(storedIds),
          ];
        }
      }
    } catch (error) {
      console.warn(
        "Could not read institute category IDs:",
        error
      );
    }
  }

  return [];
};

const getInstituteCategories = (
  allCategories = [],
  institute = {},
  currentInstituteId = null
) => {
  if (!Array.isArray(allCategories)) {
    return [];
  }

 
  const instituteCategoryObjects =
    getFirstArray(
      institute?.categories,
      institute?.selectedCategories
    );

  if (
    instituteCategoryObjects.length > 0
  ) {
    return instituteCategoryObjects;
  }

  const categoryObject =
    institute?.category;

  if (
    categoryObject &&
    typeof categoryObject === "object" &&
    !Array.isArray(categoryObject) &&
    (
      categoryObject?.id ||
      categoryObject?.category_id
    )
  ) {
    return [
      categoryObject,
    ];
  }

 
  const selectedIds =
    getInstituteCategoryIds(
      institute,
      currentInstituteId
    );

  if (selectedIds.length === 0) {
    return [];
  }

  return allCategories.filter(
    (category) => {
      const categoryId =
        normalizeCategoryId(
          category?.id ??
          category?.category_id
        );

      return (
        categoryId !== null &&
        selectedIds.includes(
          categoryId
        )
      );
    }
  );
};

/* =========================================================
   NORMALIZE WEBSITE RESPONSE
========================================================= */

const normalizeWebsiteResponse = (
  response
) => {
  const root =
    response || {};

  const data =
    getResponseData(root);

  const website =
    data?.website ||
    root?.website ||
    {};

  const institute =
    data?.institute ||
    root?.institute ||
    {};

  const instituteId =
    data?.instituteId ??
    data?.institute_id ??
    data?.institute?.id ??
    root?.instituteId ??
    root?.institute_id ??
    root?.institute?.id ??
    website?.instituteId ??
    website?.institute_id ??
    website?.institute?.id ??
    institute?.id ??
    institute?.institute_id ??
    null;

  const branding =
    normalizeBranding(
      data?.branding ||
      root?.branding ||
      website?.branding ||
      {}
    );

  const contentRows =
    getFirstArray(
      data?.contentRows,
      data?.content_rows,
      root?.contentRows,
      root?.content_rows
    );

  const serverContent =
    parseContent(
      data?.content ??
      data?.websiteContent ??
      data?.website_content ??
      root?.content ??
      root?.websiteContent ??
      root?.website_content ??
      {}
    );

  const databaseContent =
    buildContentFromRows(
      contentRows
    );

  const content =
    mergeContent(
      mergeContent(
        DEFAULT_CONTENT,
        serverContent
      ),
      databaseContent
    );

  const sections =
    getFirstArray(
      data?.sections,
      data?.websiteSections,
      data?.website_sections,
      website?.sections,
      root?.sections
    );

  const banners =
    getFirstArray(
      data?.banners,
      website?.banners,
      root?.banners
    );

  const categories =
    getFirstArray(
      data?.categories,
      website?.categories,
      root?.categories
    );


  const subcategories =
    getFirstArray(
      data?.subcategories,
      website?.subcategories,
      root?.subcategories,
      data?.institute?.subcategories,
      root?.institute?.subcategories
    );

  const courses =
    getFirstArray(
      data?.courses,
      data?.classes,
      website?.courses,
      website?.classes,
      root?.courses,
      root?.classes
    );

  const trainers =
    getFirstArray(
      data?.trainers,
      website?.trainers,
      root?.trainers
    );

  const sessions =
    getFirstArray(
      data?.sessions,
      website?.sessions,
      root?.sessions
    );

  const testimonials =
    getFirstArray(
      data?.testimonials,
      website?.testimonials,
      root?.testimonials
    );

  const about =
    data?.about ||
    data?.aboutPage ||
    data?.about_page ||
    website?.about ||
    website?.aboutPage ||
    null;

  const instituteName =
    getFirstValue(
      institute?.name,
      institute?.institute_name,
      website?.name,
      website?.institute_name,
      "Our Institute"
    );

  return {
    website,
    institute,

    instituteId,

    instituteName,

    branding,

    content,

    contentRows,

    sections,

    banners,

    about,

    categories,

    subcategories,

    courses,

    classes: courses,

    trainers,

    sessions,

    testimonials,
  };
};


/* =========================================================
   GET LOGGED-IN STUDENT
========================================================= */

const getLoggedInStudent = async (
  firebaseUser = null,
  currentInstituteId = null
) => {
  try {
    const auth =
      getAuth();

    const currentUser =
      firebaseUser ||
      auth.currentUser;

    if (!currentUser) {
      console.log(
        "STUDENT SESSION: Firebase user not ready"
      );

      return null;
    }


    const resolvedInstituteId =
      currentInstituteId ||
      localStorage.getItem(
        "currentInstituteId"
      ) ||
      sessionStorage.getItem(
        "currentInstituteId"
      ) ||
      localStorage.getItem(
        "current_institute_id"
      ) ||
      sessionStorage.getItem(
        "current_institute_id"
      ) ||
      localStorage.getItem(
        "institute_id"
      ) ||
      sessionStorage.getItem(
        "institute_id"
      ) ||
      localStorage.getItem(
        "studentInstituteId"
      ) ||
      sessionStorage.getItem(
        "studentInstituteId"
      );

    console.log(
      "=========================================="
    );

    console.log(
      "GET MY STUDENT PROFILE"
    );

    console.log(
      "Firebase UID:",
      currentUser.uid
    );

    console.log(
      "Firebase Email:",
      currentUser.email ||
      null
    );

    console.log(
      "Firebase Phone:",
      currentUser.phoneNumber ||
      null
    );

    console.log(
      "Institute ID:",
      resolvedInstituteId
    );

    console.log(
      "=========================================="
    );

    if (!resolvedInstituteId) {
      console.error(
        "GET MY STUDENT PROFILE: Institute ID missing"
      );

      return null;
    }

    const response =
      await import("../../services/api")
        .then(
          (module) =>
            module.default.get(
              "/students/me",
              {
                params: {
                  institute_id:
                    String(
                      resolvedInstituteId
                    ),
                },
              }
            )
        );

    const responseData =
      response?.data ||
      {};

    const student =
      responseData?.data ||
      responseData?.student ||
      null;

    if (!student) {
      console.log(
        "STUDENT SESSION: Student profile not found"
      );

      return null;
    }

    localStorage.setItem(
      "studentInstituteId",
      String(
        resolvedInstituteId
      )
    );

    sessionStorage.setItem(
      "studentInstituteId",
      String(
        resolvedInstituteId
      )
    );

    console.log(
      "=========================================="
    );

    console.log(
      "STUDENT PROFILE FOUND"
    );

    console.log(
      student
    );

    console.log(
      "Institute ID:",
      resolvedInstituteId
    );

    console.log(
      "=========================================="
    );

    return student;

  } catch (error) {

    const status =
      error?.response?.status;

    if (
      status === 401 ||
      status === 403 ||
      status === 404
    ) {
      console.log(
        "STUDENT SESSION: No active student profile"
      );

      return null;
    }

    console.error(
      "STUDENT PROFILE ERROR:",
      error?.response?.data ||
      error?.message ||
      error
    );

    return null;
  }
};


/* =========================================================
   COMPONENT
========================================================= */

const WebsitePreview = () => {

  const location =
    useLocation();

  const navigate =
    useNavigate();

  const auth =
    useMemo(
      () => getAuth(),
      []
    );


  /* =======================================================
     STATE
  ======================================================= */

  const [
    websiteData,
    setWebsiteData,
  ] = useState(null);

  const [
    instituteId,
    setInstituteId,
  ] = useState(null);

  const [
    studentUser,
    setStudentUser,
  ] = useState(null);

  const [
    firebaseReady,
    setFirebaseReady,
  ] = useState(false);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");


  /* =======================================================
     LOGIN PAGE
  ======================================================= */

  const isLoginPage =
    location.pathname.endsWith(
      "/login"
    );



const resolveInstituteId = useCallback(() => {
  const searchParams = new URLSearchParams(
    window.location.search
  );

  const normalizeId = (value) => {
    if (value === undefined || value === null) {
      return null;
    }

    const id = String(value).trim();

    if (
      !id ||
      id.toLowerCase() === "null" ||
      id.toLowerCase() === "undefined"
    ) {
      return null;
    }

    return id;
  };

  
  const routeState = location?.state || {};

  const routeStateId =
    normalizeId(routeState?.instituteId) ||
    normalizeId(routeState?.institute_id) ||
    normalizeId(routeState?.institute?.id) ||
    normalizeId(routeState?.institute?.institute_id) ||
    normalizeId(routeState?.website?.instituteId) ||
    normalizeId(routeState?.website?.institute_id);

  // ============================================================
  // 2. URL QUERY PARAMETER
  // ============================================================

  const urlId =
    normalizeId(searchParams.get("institute_id")) ||
    normalizeId(searchParams.get("instituteId")) ||
    normalizeId(searchParams.get("id"));

  // ============================================================
  // 3. STORED INSTITUTE OBJECT
  // ============================================================

  let storedInstitute = null;

  try {
    const rawInstitute = localStorage.getItem("institute");

    if (rawInstitute) {
      storedInstitute = JSON.parse(rawInstitute);
    }
  } catch (parseError) {
    console.warn(
      "Could not parse stored institute object:",
      parseError
    );
  }

  const storedInstituteId =
    normalizeId(storedInstitute?.institute?.id) ||
    normalizeId(
      storedInstitute?.institute?.institute_id
    ) ||
    normalizeId(storedInstitute?.instituteId) ||
    normalizeId(storedInstitute?.institute_id) ||
    normalizeId(storedInstitute?.id) ||
    normalizeId(storedInstitute?.data?.id) ||
    normalizeId(
      storedInstitute?.data?.institute_id
    );

  // ============================================================
  // 4. CURRENT INSTITUTE STORAGE
  // ============================================================

  const currentStorageId =
    normalizeId(
      localStorage.getItem("currentInstituteId")
    ) ||
    normalizeId(
      sessionStorage.getItem("currentInstituteId")
    ) ||
    normalizeId(
      localStorage.getItem("current_institute_id")
    ) ||
    normalizeId(
      sessionStorage.getItem("current_institute_id")
    ) ||
    normalizeId(
      localStorage.getItem("institute_id")
    ) ||
    normalizeId(
      sessionStorage.getItem("institute_id")
    ) ||
    normalizeId(
      localStorage.getItem("websiteInstituteId")
    ) ||
    normalizeId(
      sessionStorage.getItem("websiteInstituteId")
    );

  // ============================================================
  // 5. EXISTING WEBSITE DATA
  // ============================================================

  const websiteDataId =
    normalizeId(websiteData?.instituteId) ||
    normalizeId(websiteData?.institute?.id) ||
    normalizeId(
      websiteData?.institute?.institute_id
    );


  const previewStorageId =
    normalizeId(
      sessionStorage.getItem("previewInstituteId")
    ) ||
    normalizeId(
      localStorage.getItem("previewInstituteId")
    ) ||
    normalizeId(
      sessionStorage.getItem("studentInstituteId")
    ) ||
    normalizeId(
      localStorage.getItem("studentInstituteId")
    );

  // ============================================================
  // FINAL RESOLUTION
  // ============================================================

  const resolved =
    routeStateId ||
    urlId ||
    storedInstituteId ||
    currentStorageId ||
    websiteDataId ||
    previewStorageId ||
    null;

  console.log(
    "=========================================="
  );

  console.log(
    "INSTITUTE ID RESOLUTION"
  );

  console.log(
    "Router state institute ID:",
    routeStateId
  );

  console.log(
    "URL institute ID:",
    urlId
  );

  console.log(
    "Stored institute object ID:",
    storedInstituteId
  );

  console.log(
    "Current institute storage ID:",
    currentStorageId
  );

  console.log(
    "Website data institute ID:",
    websiteDataId
  );

  console.log(
    "Preview/student storage ID:",
    previewStorageId
  );

  console.log(
    "FINAL RESOLVED INSTITUTE:",
    resolved
  );

  console.log(
    "=========================================="
  );

  return normalizeId(resolved);
}, [
  location?.state,
  websiteData?.instituteId,
  websiteData?.institute?.id,
  websiteData?.institute?.institute_id,
]);

const loadWebsite = useCallback(
  async (cancelledCheck = () => false) => {
    try {
      if (!cancelledCheck()) {
        setLoading(true);
        setError("");
      }

      console.log(
        "=========================================="
      );

      console.log(
        "WEBSITE PREVIEW INITIALIZATION"
      );

      // ========================================================
      // STEP 1: RESOLVE INSTITUTE ID
      // ========================================================

      let currentInstituteId =
        resolveInstituteId();

      // ========================================================
      // STEP 2: CHECK INSTITUTE ID
      // ========================================================

      if (!currentInstituteId) {
        throw new Error(
          "Preview institute ID is missing. Please open the website preview from the institute dashboard."
        );
      }

      currentInstituteId =
        String(currentInstituteId).trim();

      // ========================================================
      // STEP 3: SAVE CORRECT INSTITUTE ID
      // ========================================================

      console.log(
        "Final Preview Institute ID:",
        currentInstituteId
      );

      setPreviewInstituteId(
        currentInstituteId
      );

      localStorage.setItem(
        "previewInstituteId",
        currentInstituteId
      );

      sessionStorage.setItem(
        "previewInstituteId",
        currentInstituteId
      );

      if (cancelledCheck()) {
        return;
      }

      setInstituteId(
        currentInstituteId
      );

      // ========================================================
      // STEP 4: LOAD PUBLIC WEBSITE
      // ========================================================

      console.log(
        "Loading PUBLIC website:",
        currentInstituteId
      );

      console.log(
        "Firebase authentication NOT required."
      );

      const response =
        await getPublicWebsiteData(
          currentInstituteId,
          true
        );

      console.log(
        "Public website response:",
        response
      );

      if (cancelledCheck()) {
        return;
      }

      // ========================================================
      // STEP 5: NORMALIZE RESPONSE
      // ========================================================

      const normalized =
        normalizeWebsiteResponse(
          response
        );

      const resolvedWebsiteInstituteId =
        normalized?.instituteId ||
        currentInstituteId;

      setWebsiteData({
        ...normalized,

        instituteId:
          String(
            resolvedWebsiteInstituteId
          ),
      });

      setInstituteId(
        String(
          resolvedWebsiteInstituteId
        )
      );

      console.log(
        "Website loaded successfully for institute:",
        resolvedWebsiteInstituteId
      );

    } catch (error) {
      console.error(
        "Website preview loading error:",
        error
      );

      if (!cancelledCheck()) {
        setError(
          error?.message ||
          "Failed to load website preview."
        );
      }
    } finally {
      if (!cancelledCheck()) {
        setLoading(false);
      }
    }
  },
  [
    resolveInstituteId,
    normalizeWebsiteResponse,
  ]
);

  /* =======================================================
     LOAD WEBSITE
  ======================================================= */

  useEffect(() => {

    let cancelled =
      false;

    loadWebsite(
      () => cancelled
    );

    return () => {
      cancelled = true;
    };

  }, [
    loadWebsite,
  ]);


  /* =======================================================
     FIREBASE AUTH STATE
  ======================================================= */

  useEffect(() => {

    let cancelled =
      false;


    console.log(
      "Waiting for Firebase auth state..."
    );


    const unsubscribe =
      onAuthStateChanged(
        auth,
        async (firebaseUser) => {

          if (
            cancelled
          ) {
            return;
          }


          console.log(
            "=========================================="
          );

          console.log(
            "FIREBASE AUTH STATE"
          );

          console.log(
            firebaseUser
              ? {
                  uid:
                    firebaseUser.uid,

                  email:
                    firebaseUser.email,

                  phone:
                    firebaseUser.phoneNumber,
                }
              : "SIGNED OUT"
          );

          console.log(
            "=========================================="
          );


          setFirebaseReady(
            true
          );


          /* ============================================
             NO FIREBASE USER
          ============================================ */

          if (
            !firebaseUser
          ) {

            setStudentUser(
              null
            );

            return;
          }


          /* ============================================
             LOGIN PAGE
          ============================================ */

          if (
            isLoginPage
          ) {

            console.log(
              "Student login page active."
            );

            return;
          }


          /* ============================================
             GET STUDENT PROFILE
          ============================================ */

          const currentInstituteId =
            resolveInstituteId() ||
            instituteId ||
            websiteData?.instituteId;


          const student =
            await getLoggedInStudent(
              firebaseUser,
              currentInstituteId
            );


          if (
            cancelled
          ) {
            return;
          }


          if (
            student
          ) {

            setStudentUser(
              student
            );


            localStorage.setItem(
              "studentUser",
              JSON.stringify(
                student
              )
            );

            localStorage.setItem(
              "studentRole",
              "STUDENT"
            );

            localStorage.setItem(
              "studentLoggedIn",
              "true"
            );


            const token =
              await firebaseUser.getIdToken();

            localStorage.setItem(
              "studentToken",
              token
            );


            if (
              currentInstituteId
            ) {

              localStorage.setItem(
                "studentInstituteId",
                String(
                  currentInstituteId
                )
              );

              sessionStorage.setItem(
                "studentInstituteId",
                String(
                  currentInstituteId
                )
              );
            }


            console.log(
              "Student session restored successfully."
            );

          } else {

            console.log(
              "Firebase user exists, but student profile was not found."
            );
          }
        }
      );


    return () => {

      cancelled = true;

      unsubscribe();
    };


  }, [
    auth,
    isLoginPage,
    instituteId,
    websiteData?.instituteId,
    resolveInstituteId,
  ]);


  /* =======================================================
     STUDENT LOGIN EVENT
  ======================================================= */

  useEffect(() => {

    const handleStudentAuthChanged =
      async () => {

        console.log(
          "=========================================="
        );

        console.log(
          "studentAuthChanged RECEIVED"
        );

        console.log(
          "=========================================="
        );


        const firebaseUser =
          auth.currentUser;


        if (!firebaseUser) {

          console.log(
            "Firebase user not ready after student login."
          );

          return;
        }


        const currentInstituteId =
          resolveInstituteId() ||
          instituteId ||
          websiteData?.instituteId;


        console.log(
          "Firebase user after login:",
          firebaseUser.uid
        );

        console.log(
          "Institute after login:",
          currentInstituteId
        );


        if (!currentInstituteId) {

          console.error(
            "STUDENT LOGIN: Institute ID missing"
          );

          return;
        }


        const normalizedInstituteId =
          String(
            currentInstituteId
          ).trim();


        /* ===============================================
           PERSIST CORRECT INSTITUTE
        =============================================== */

        setInstituteId(
          normalizedInstituteId
        );

        setPreviewInstituteId(
          normalizedInstituteId
        );


        localStorage.setItem(
          "previewInstituteId",
          normalizedInstituteId
        );

        sessionStorage.setItem(
          "previewInstituteId",
          normalizedInstituteId
        );

        localStorage.setItem(
          "studentInstituteId",
          normalizedInstituteId
        );

        sessionStorage.setItem(
          "studentInstituteId",
          normalizedInstituteId
        );


        /* ===============================================
           REFRESH FIREBASE TOKEN
        =============================================== */

        try {

          const token =
            await firebaseUser.getIdToken(
              true
            );

          localStorage.setItem(
            "studentToken",
            token
          );

        } catch (error) {

          console.error(
            "Could not refresh Firebase token:",
            error
          );
        }


        /* ===============================================
           LOAD STUDENT
        =============================================== */

        const student =
          await getLoggedInStudent(
            firebaseUser,
            normalizedInstituteId
          );


        if (!student) {

          console.error(
            "STUDENT LOGIN: Student profile could not be loaded"
          );

          return;
        }


        setStudentUser(
          student
        );


        localStorage.setItem(
          "studentUser",
          JSON.stringify(
            student
          )
        );

        localStorage.setItem(
          "studentRole",
          "STUDENT"
        );

        localStorage.setItem(
          "studentLoggedIn",
          "true"
        );

        localStorage.setItem(
          "studentInstituteId",
          normalizedInstituteId
        );


        console.log(
          "=========================================="
        );

        console.log(
          "STUDENT LOGIN COMPLETED"
        );

        console.log(
          "Student ID:",
          student?.student?.id ||
          student?.id ||
          null
        );

        console.log(
          "Account ID:",
          student?.account?.id ||
          null
        );

        console.log(
          "Institute ID:",
          normalizedInstituteId
        );

        console.log(
          "=========================================="
        );


        if (
          window.location.pathname.endsWith(
            "/login"
          )
        ) {

          navigate(
            "../dashboard",
            {
              replace: true,
            }
          );
        }
      };


    window.addEventListener(
      "studentAuthChanged",
      handleStudentAuthChanged
    );


    return () => {

      window.removeEventListener(
        "studentAuthChanged",
        handleStudentAuthChanged
      );
    };


  }, [
    auth,
    instituteId,
    websiteData?.instituteId,
    navigate,
    resolveInstituteId,
  ]);


  /* =======================================================
     REFRESH STUDENT AFTER ROUTE CHANGE
  ======================================================= */

  useEffect(() => {

    if (
      isLoginPage
    ) {
      return;
    }


    if (
      !firebaseReady
    ) {
      return;
    }


    let cancelled =
      false;


    const refreshStudent =
      async () => {

        const firebaseUser =
          auth.currentUser;


        if (
          !firebaseUser
        ) {
          return;
        }


        console.log(
          "Refreshing student after route change..."
        );


        const currentInstituteId =
          resolveInstituteId() ||
          instituteId ||
          websiteData?.instituteId;


        if (!currentInstituteId) {

          console.log(
            "No institute ID available for student refresh."
          );

          return;
        }


        const student =
          await getLoggedInStudent(
            firebaseUser,
            currentInstituteId
          );


        if (
          cancelled
        ) {
          return;
        }


        if (
          student
        ) {

          setStudentUser(
            student
          );


          localStorage.setItem(
            "studentUser",
            JSON.stringify(
              student
            )
          );

          localStorage.setItem(
            "studentRole",
            "STUDENT"
          );

          localStorage.setItem(
            "studentLoggedIn",
            "true"
          );


          localStorage.setItem(
            "studentInstituteId",
            String(
              currentInstituteId
            )
          );

          sessionStorage.setItem(
            "studentInstituteId",
            String(
              currentInstituteId
            )
          );
        }
      };


    refreshStudent();


    return () => {
      cancelled = true;
    };


  }, [
    location.pathname,
    auth,
    isLoginPage,
    firebaseReady,
    instituteId,
    websiteData?.instituteId,
    resolveInstituteId,
  ]);


  /* =======================================================
     WINDOW FOCUS REFRESH
  ======================================================= */

  useEffect(() => {

    const handleFocus =
      async () => {

        if (
          document.visibilityState !==
          "visible"
        ) {
          return;
        }


        const currentInstituteId =
          resolveInstituteId();


        if (
          !currentInstituteId
        ) {
          return;
        }


        try {

          const response =
            await getPublicWebsiteData(
              currentInstituteId,
              true
            );


          const normalized =
            normalizeWebsiteResponse(
              response
            );


          const resolvedId =
            String(
              normalized?.instituteId ||
              currentInstituteId
            );


          setWebsiteData({
            ...normalized,

            instituteId:
              resolvedId,
          });


          setInstituteId(
            resolvedId
          );


          setPreviewInstituteId(
            resolvedId
          );

          localStorage.setItem(
            "previewInstituteId",
            resolvedId
          );

          sessionStorage.setItem(
            "previewInstituteId",
            resolvedId
          );

        } catch (error) {

          console.warn(
            "Website focus refresh failed:",
            error
          );
        }
      };


    window.addEventListener(
      "focus",
      handleFocus
    );


    return () => {

      window.removeEventListener(
        "focus",
        handleFocus
      );
    };


  }, [
    resolveInstituteId,
  ]);


  /* =======================================================
     WEBSITE DATA
  ======================================================= */

  const website =
    websiteData?.website ||
    {};

  const institute =
    websiteData?.institute ||
    {};

  const branding =
    websiteData?.branding ||
    DEFAULT_BRANDING;

  const content =
    websiteData?.content ||
    DEFAULT_CONTENT;

  const contentRows =
    websiteData?.contentRows ||
    [];

  const sections =
    websiteData?.sections ||
    [];

  const banners =
    websiteData?.banners ||
    [];

  const about =
    websiteData?.about ||
    null;

  const allCategories =
    websiteData?.categories ||
    [];

  /*
   * Subcategories are intentionally kept separate from
   * categories. The institute profile selects categories,
   * and the public website receives all subcategories that
   * belong to those selected categories.
   */
  const subcategories =
    websiteData?.subcategories ||
    websiteData?.institute?.subcategories ||
    [];

  /*
   * IMPORTANT:
   * Only show categories selected for this institute.
   * Never display the complete master category list
   * in the institute website.
   */
  const categories =
    getInstituteCategories(
      allCategories,
      institute,
      instituteId ||
        websiteData?.instituteId ||
        institute?.id ||
        institute?.institute_id ||
        null
    );

  const courses =
    websiteData?.courses ||
    [];

  const classes =
    websiteData?.classes ||
    courses;

  const trainers =
    websiteData?.trainers ||
    [];

  const sessions =
    websiteData?.sessions ||
    [];

  const testimonials =
    websiteData?.testimonials ||
    [];

  /*
   * DEBUG:
   * This confirms that the normalized public API response
   * actually contains subcategories before they are passed
   * to WebsiteClasses through Outlet context.
   */
  console.log(
    "WEBSITE PREVIEW - CATEGORIES:",
    categories
  );

  console.log(
    "WEBSITE PREVIEW - SUBCATEGORIES:",
    subcategories
  );

  console.log(
    "WEBSITE PREVIEW - CLASSES:",
    classes
  );


  /* =======================================================
     FINAL INSTITUTE ID
  ======================================================= */

  const resolvedInstituteId =
    instituteId ||
    websiteData?.instituteId ||
    institute?.id ||
    institute?.institute_id ||
    null;


  /* =======================================================
     INSTITUTE NAME
  ======================================================= */

  const instituteName =
    websiteData?.instituteName ||
    institute?.name ||
    institute?.institute_name ||
    "Our Institute";


  /* =======================================================
     GET SECTION
  ======================================================= */

  const getSection =
    useCallback(
      (type) => {

        const requested =
          getCanonicalPage(
            type
          );


        const found =
          sections.find(
            (section) => {

              const rawType =
                section?.section_type ??
                section?.sectionType ??
                section?.section_key ??
                section?.sectionKey ??
                section?.type ??
                section?.name ??
                "";


              return (
                getCanonicalPage(
                  rawType
                ) === requested
              );
            }
          );


        return found || null;
      },
      [
        sections,
      ]
    );


  /* =======================================================
     SECTION ENABLED
  ======================================================= */

  const sectionEnabled =
    useCallback(
      (type) => {

        const section =
          getSection(
            type
          );


        if (!section) {
          return true;
        }


        const rawEnabled =
          section?.is_enabled ??
          section?.isEnabled ??
          section?.enabled ??
          true;


        return normalizeBoolean(
          rawEnabled,
          true
        );
      },
      [
        getSection,
      ]
    );


  /* =======================================================
     GET CONTENT
  ======================================================= */

  const getContent =
    useCallback(
      (
        page,
        section = null,
        fallback = {}
      ) => {

        const canonicalPage =
          getCanonicalPage(
            page
          );


        /* ===============================================
           HOME
        =============================================== */

        if (
          canonicalPage === "home"
        ) {

          const homeContent =
            content?.home ||
            {};


          if (section) {

            const canonicalSection =
              getCanonicalSection(
                section
              );


            const value =
              homeContent?.[
                canonicalSection
              ];


            if (
              value &&
              typeof value === "object"
            ) {
              return value;
            }


            const originalValue =
              homeContent?.[
                section
              ];


            if (
              originalValue &&
              typeof originalValue === "object"
            ) {
              return originalValue;
            }


            const row =
              contentRows.find(
                (item) => {

                  const rowPage =
                    getCanonicalPage(
                      item?.page_key ??
                      item?.pageKey
                    );


                  const rowSection =
                    getCanonicalSection(
                      item?.section_key ??
                      item?.sectionKey
                    );


                  return (
                    rowPage === "home" &&
                    rowSection ===
                      canonicalSection
                  );
                }
              );


            if (row) {

              return {
                heading:
                  row?.heading ||
                  "",

                subheading:
                  row?.subheading ||
                  "",
              };
            }


            return fallback;
          }


          return homeContent;
        }


        /* ===============================================
           NORMAL PAGE
        =============================================== */

        const pageContent =
          content?.[
            canonicalPage
          ];


        if (
          pageContent &&
          typeof pageContent === "object"
        ) {
          return pageContent;
        }


        /* ===============================================
           CLASSES
        =============================================== */

        if (
          canonicalPage === "classes"
        ) {

          return (
            content?.classes ||
            content?.courses ||
            fallback
          );
        }


        /* ===============================================
           STUDENT LOGIN
        =============================================== */

        if (
          canonicalPage === "studentLogin"
        ) {

          return (
            content?.studentLogin ||
            content?.studentlogin ||
            fallback
          );
        }


        /* ===============================================
           DATABASE FALLBACK
        =============================================== */

        const matchingRow =
          contentRows.find(
            (row) => {

              const rowPage =
                getCanonicalPage(
                  row?.page_key ??
                  row?.pageKey ??
                  row?.section_type ??
                  row?.sectionType
                );


              return (
                rowPage === canonicalPage
              );
            }
          );


        if (matchingRow) {

          const rowContent =
            parseContent(
              matchingRow?.content
            );


          if (
            Object.keys(
              rowContent
            ).length
          ) {

            return {
              ...rowContent,

              ...(matchingRow?.heading !==
              undefined
                ? {
                    heading:
                      matchingRow.heading,
                  }
                : {}),

              ...(matchingRow?.subheading !==
              undefined
                ? {
                    subheading:
                      matchingRow.subheading,
                  }
                : {}),
            };
          }


          return {
            heading:
              matchingRow?.heading ||
              "",

            subheading:
              matchingRow?.subheading ||
              "",
          };
        }


        return fallback;
      },
      [
        content,
        contentRows,
      ]
    );


  /* =======================================================
     OUTLET CONTEXT
  ======================================================= */

  const outletContext =
    useMemo(
      () => ({
        websiteData,

        website,

        institute,

        instituteId:
          resolvedInstituteId,

        instituteName,

        branding,

        content,

        contentRows,

        sections,

        banners,

        about,

        categories,

        subcategories,

        courses,

        classes,

        trainers,

        sessions,

        testimonials,

        /* =============================================
           STUDENT
        ============================================= */

        studentUser,

        student:
          studentUser?.student ||
          studentUser ||
          null,

        studentAccount:
          studentUser?.account ||
          null,

        studentProfile:
          studentUser?.student ||
          null,

        studentDetails:
          studentUser?.user ||
          null,

        /* =============================================
           AUTH STATE
        ============================================= */

        firebaseReady,

        isStudentLoggedIn:
          Boolean(
            studentUser
          ),

        /* =============================================
           HELPERS
        ============================================= */

        getSection,

        sectionEnabled,

        getContent,

        /* =============================================
           PREVIEW
        ============================================= */

        isPreview: true,
      }),
      [
        websiteData,
        website,
        institute,
        resolvedInstituteId,
        instituteName,
        branding,
        content,
        contentRows,
        sections,
        banners,
        about,
        categories,
        subcategories,
        courses,
        classes,
        trainers,
        sessions,
        testimonials,
        studentUser,
        firebaseReady,
        getSection,
        sectionEnabled,
        getContent,
      ]
    );


  /* =======================================================
     LOGIN PAGE
  ======================================================= */

  if (
    isLoginPage
  ) {

    return (
      <div
        className="website-preview-login-shell"
        style={{
          width: "100%",
          minHeight: "100vh",
          margin: 0,
          padding: 0,
          background:
            branding.pageBackgroundColor,
          boxSizing: "border-box",
        }}
      >

        <style>
          {`
            html,
            body,
            #root {
              margin: 0 !important;
              padding: 0 !important;
              width: 100% !important;
            }

            .website-preview-login-shell {
              width: 100% !important;
              min-height: 100vh !important;
              margin: 0 !important;
              padding: 0 !important;
              box-sizing: border-box !important;
            }
          `}
        </style>


        <Outlet
          context={
            outletContext
          }
        />

      </div>
    );
  }


  /* =======================================================
     LOADING
  ======================================================= */

  if (
    loading
  ) {

    return (
      <div
        style={{
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "14px",
          background:
            DEFAULT_BRANDING.pageBackgroundColor,
          color:
            DEFAULT_BRANDING.textColor,
          boxSizing: "border-box",
        }}
      >

        <div
          style={{
            width: "40px",
            height: "40px",
            border:
              "4px solid #e5e7eb",
            borderTop:
              `4px solid ${DEFAULT_BRANDING.buttonColor}`,
            borderRadius: "50%",
            animation:
              "websitePreviewSpin 0.8s linear infinite",
          }}
        />

        <div
          style={{
            fontSize: "17px",
            fontWeight: "500",
          }}
        >
          Loading website...
        </div>


        <style>
          {`
            @keyframes websitePreviewSpin {
              from {
                transform: rotate(0deg);
              }

              to {
                transform: rotate(360deg);
              }
            }
          `}
        </style>

      </div>
    );
  }


  /* =======================================================
     ERROR
  ======================================================= */

  if (
    error
  ) {

    return (
      <div
        style={{
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "30px",
          background:
            DEFAULT_BRANDING.pageBackgroundColor,
          boxSizing: "border-box",
        }}
      >

        <div
          style={{
            width: "100%",
            maxWidth: "620px",
            padding: "40px",
            textAlign: "center",
            border:
              "1px solid #e5e7eb",
            borderRadius: "16px",
            background: "#FFFFFF",
            boxShadow:
              "0 20px 60px rgba(0,0,0,0.08)",
          }}
        >

          <h2
            style={{
              marginBottom: "12px",
              color: "#dc2626",
              fontSize: "24px",
              fontWeight: "700",
            }}
          >
            Website Preview Failed
          </h2>


          <p
            style={{
              margin: "0 auto",
              maxWidth: "500px",
              color: "#6b7280",
              lineHeight: "1.7",
            }}
          >
            {error}
          </p>


          <button
            type="button"
            onClick={() =>
              window.location.reload()
            }
            style={{
              marginTop: "24px",
              padding: "12px 26px",
              border: "none",
              borderRadius: "8px",
              background:
                DEFAULT_BRANDING.buttonColor,
              color:
                DEFAULT_BRANDING.buttonTextColor,
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Retry
          </button>

        </div>

      </div>
    );
  }


  /* =======================================================
     MAIN WEBSITE
  ======================================================= */

  return (
    <>

      <style>
        {`
          html,
          body,
          #root {
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
          }

          html,
          body {
            overflow-x: hidden;
          }

          .website-preview-shell {
            width: 100% !important;
            min-height: 100vh !important;
            margin: 0 !important;
            padding: 0 !important;
            border: 0 !important;
            box-sizing: border-box !important;
            background:
              var(--page-background-color);
          }

          .website-preview-shell,
          .website-preview-shell *,
          .website-preview-shell *::before,
          .website-preview-shell *::after {
            box-sizing: border-box;
          }

          .website-preview-shell > main {
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            border: 0 !important;
            box-sizing: border-box !important;
          }

          .website-preview-shell img {
            max-width: 100%;
          }
        `}
      </style>


      <div
        className="website-preview-shell"
        style={{
          minHeight: "100vh",
          width: "100%",
          margin: 0,
          padding: 0,
          border: 0,

          background:
            branding.pageBackgroundColor,

          "--page-background-color":
            branding.pageBackgroundColor,

          "--navbar-color":
            branding.navbarColor,

          "--heading-color":
            branding.headingColor,

          "--subheading-color":
            branding.subheadingColor,

          "--text-color":
            branding.textColor,

          "--icon-color":
            branding.iconColor,

          "--button-color":
            branding.buttonColor,

          "--button-text-color":
            branding.buttonTextColor,

          "--footer-background-color":
            branding.footerBackgroundColor,

          "--footer-heading-color":
            branding.footerHeadingColor,

          "--footer-text-color":
            branding.footerTextColor,

          boxSizing: "border-box",
        }}
      >

        {/* =================================================
            NAVBAR
        ================================================= */}

        <WebsiteNavbar
          website={
            website
          }

          institute={
            institute
          }

          branding={
            branding
          }

          instituteName={
            instituteName
          }

          isPreview={
            true
          }

          studentUser={
            studentUser
          }
        />


        {/* =================================================
            CONTENT
        ================================================= */}

        <main
          style={{
            width: "100%",
            margin: 0,
            padding: 0,
            border: 0,
            boxSizing: "border-box",
          }}
        >

          <Outlet
            context={
              outletContext
            }
          />

        </main>


        {/* =================================================
            FOOTER
        ================================================= */}

        <WebsiteFooter
          website={
            website
          }

          institute={
            institute
          }

          branding={
            branding
          }

          instituteName={
            instituteName
          }

          isPreview={
            true
          }

          studentUser={
            studentUser
          }
        />

      </div>

    </>
  );
};

export default WebsitePreview;