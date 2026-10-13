

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Edit, Trash2, Search } from "lucide-react";
import { FaTrash, FaTimes } from "react-icons/fa";

import {
  LocalizationProvider,
} from "@mui/x-date-pickers/LocalizationProvider";
import {
  AdapterDayjs,
} from "@mui/x-date-pickers/AdapterDayjs";
import {
  TimePicker,
} from "@mui/x-date-pickers/TimePicker";

import dayjs from "dayjs";
import API from "../services/api";

/* =========================================================
   CONSTANTS
========================================================= */

const BACKEND_URL =
  "http://localhost:5000";

const DAYS_LIST = [
  { label: "Monday", value: "MONDAY" },
  { label: "Tuesday", value: "TUESDAY" },
  { label: "Wednesday", value: "WEDNESDAY" },
  { label: "Thursday", value: "THURSDAY" },
  { label: "Friday", value: "FRIDAY" },
  { label: "Saturday", value: "SATURDAY" },
  { label: "Sunday", value: "SUNDAY" },
];

const CLASS_TYPES = {
  LIVE: "LIVE",
  RECORDING: "RECORDING",
};

/* =========================================================
   NORMALIZE CLASS TYPE
========================================================= */

const normalizeType = (item) => {
  const value =
    item?.class_type ??
    item?.classType ??
    item?.type ??
    item?.content_type ??
    item?.contentType ??
    item?.class_mode;

  if (!value) return null;

  const normalized = String(value).toUpperCase();

  if (normalized.includes("RECORD")) {
    return CLASS_TYPES.RECORDING;
  }

  if (normalized.includes("LIVE")) {
    return CLASS_TYPES.LIVE;
  }

  return null;
};


const DEFAULT_FORM = {
  title: "",
  description: "",
  image: null,

  category_id: "",
  subcategory_id: "",

  trainer_id: "",
  institute_id: "",

  price: "",
  duration: "60",

  level: "BEGINNER",
  mode: "ONLINE",

  students_count: "",

  course_start_date: "",
  course_end_date: "",

  start_time: "",
  end_time: "",

  available_days: [],
  class_type: CLASS_TYPES.LIVE,
};


/* =========================================================
   HELPERS
========================================================= */

const safeArray = (value) => {
  if (!value) return [];

  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);

      return Array.isArray(parsed)
        ? parsed
        : [];
    } catch {
      return [];
    }
  }

  return [];
};


/* =========================================================
   FORMAT TIME
   Converts:
   14:30
   14:30:00
   2:30 PM

   Into:
   2:30 PM
========================================================= */

const formatTime = (timeStr) => {
  if (!timeStr) return "-";

  const value = String(timeStr).trim();

  if (!value) return "-";

  if (
    value.toUpperCase().includes("AM") ||
    value.toUpperCase().includes("PM")
  ) {
    return value;
  }

  const parts = value.split(":");

  const hours = parseInt(parts[0], 10);

  if (Number.isNaN(hours)) {
    return value;
  }

  const minutes = parts[1] || "00";

  const h12 = hours % 12 || 12;

  const period = hours >= 12
    ? "PM"
    : "AM";

  return `${h12}:${String(minutes).padStart(
    2,
    "0"
  )} ${period}`;
};


/* =========================================================
   NORMALIZE TIME FOR MUI DAYJS
========================================================= */

const normalizeTimeForPicker = (time) => {
  if (!time) return null;

  const value = String(time).trim();

  if (!value) return null;

  let parsed = dayjs(
    `2000-01-01 ${value}`
  );

  if (parsed.isValid()) {
    return parsed;
  }

  parsed = dayjs(
    `2000-01-01 ${value}`,
    [
      "YYYY-MM-DD HH:mm:ss",
      "YYYY-MM-DD HH:mm",
      "YYYY-MM-DD h:mm A",
      "YYYY-MM-DD hh:mm A",
    ]
  );

  return parsed.isValid()
    ? parsed
    : null;
};


/* Returns today's date in local YYYY-MM-DD format for date input min values. */
const getTodayDateInputValue = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};


/* =========================================================
   FORMAT DATE
========================================================= */

const formatDate = (dateStr) => {
  if (!dateStr) return "-";

  try {
    const date = new Date(dateStr);

    if (Number.isNaN(date.getTime())) {
      return String(dateStr);
    }

    return date.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  } catch {
    return String(dateStr);
  }
};


/* Convert database/API dates to the YYYY-MM-DD format required by input[type=date]. */
const toDateInputValue = (value) => {
  if (!value) return "";
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, "0");
    const day = String(value.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const text = String(value).trim();
  const isoMatch = text.match(/^(\d{4}-\d{2}-\d{2})/);
  if (isoMatch) return isoMatch[1];

  const dmyMatch = text.match(/^(\d{2})[-/](\d{2})[-/](\d{4})$/);
  if (dmyMatch) return `${dmyMatch[3]}-${dmyMatch[2]}-${dmyMatch[1]}`;

  const parsed = new Date(text);
  if (Number.isNaN(parsed.getTime())) return "";
  return `${parsed.getFullYear()}-${String(parsed.getMonth() + 1).padStart(2, "0")}-${String(parsed.getDate()).padStart(2, "0")}`;
};


/* =========================================================
   FORMAT AVAILABLE DAYS
========================================================= */

const formatDays = (days) => {
  const arr = safeArray(days);

  if (arr.length === 0) {
    return "-";
  }

  const shortNames = {
    MONDAY: "Mon",
    TUESDAY: "Tue",
    WEDNESDAY: "Wed",
    THURSDAY: "Thu",
    FRIDAY: "Fri",
    SATURDAY: "Sat",
    SUNDAY: "Sun",
  };

  return arr
    .map(
      (day) =>
        shortNames[String(day).toUpperCase()] ||
        day
    )
    .join(", ");
};


/* =========================================================
   TRUNCATE
========================================================= */

const truncate = (
  text,
  maxLen = 40
) => {
  if (!text) return "-";

  const value = String(text);

  return value.length > maxLen
    ? `${value.slice(0, maxLen)}...`
    : value;
};


/* =========================================================
   IMAGE URL
========================================================= */

const getImageUrl = (item) => {
  if (!item) return "";

  let value = item;

  if (
    typeof item === "object"
  ) {
    value =
      item.url ||
      item.location ||
      item.path ||
      item.key ||
      "";
  }

  if (!value) return "";

  value = String(value);

  if (
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("data:")
  ) {
    return value;
  }

  if (value.startsWith("//")) {
    return `https:${value}`;
  }

  if (!value.startsWith("/")) {
    value = `/${value}`;
  }

  return `${BACKEND_URL}${value}`;
};


/* =========================================================
   GET CLASS CATEGORY NAME
========================================================= */

const getClassCategoryName = (cls) => {
  return (
    cls?.category_name ||
    cls?.category?.name ||
    "-"
  );
};


/* =========================================================
   GET CLASS SUBCATEGORY NAME
========================================================= */

const getClassSubcategoryName = (cls) => {
  return (
    cls?.subcategory_name ||
    cls?.subcategory?.name ||
    "-"
  );
};


/* =========================================================
   GET INSTITUTE NAME
========================================================= */

const getInstituteName = (cls) => {
  return (
    cls?.institute?.name ||
    cls?.institute_name ||
    "-"
  );
};


/* =========================================================
   GET TRAINER NAME
========================================================= */

const getTrainerName = (cls) => {
  return (
    cls?.trainer?.name ||
    cls?.trainer?.full_name ||
    cls?.trainer_name ||
    "-"
  );
};


/* =========================================================
   GET START DATE
========================================================= */

const getStartDate = (cls) => {
  return (
    cls?.start_date ||
    cls?.course_start_date ||
    cls?.courseStartDate ||
    cls?.startDate ||
    cls?.course_start ||
    cls?.startDateTime ||
    "-"
  );
};

const getEndDate = (cls) => {
  return (
    cls?.end_date ||
    cls?.course_end_date ||
    cls?.courseEndDate ||
    cls?.endDate ||
    cls?.course_end ||
    cls?.endDateTime ||
    "-"
  );
};


/* =========================================================
   GET START TIME
========================================================= */

const getStartTime = (cls) => {
  return (
    cls?.start_time ||
    cls?.default_start_time ||
    cls?.startTime ||
    ""
  );
};

const getEndTime = (cls) => {
  return (
    cls?.end_time ||
    cls?.default_end_time ||
    cls?.endTime ||
    cls?.defaultEndTime ||
    ""
  );
};


/* =========================================================
   GET AVAILABLE DAYS
========================================================= */

const getAvailableDays = (cls) => {
  return (
    cls?.availableDays ||
    cls?.available_days ||
    []
  );
};


/* =========================================================
   GET STUDENTS COUNT
========================================================= */

const getStudentsCount = (cls) => {
  return (
    cls?.studentsCount ??
    cls?.students_count ??
    0
  );
};


/* =========================================================
   INSTITUTE -> CATEGORY / SUBCATEGORY
   Each institute already has its own category mapping.
   Use that mapping as the default class category.
========================================================= */

const getInstituteCategorySelection = (institute) => {
  if (!institute) {
    return {
      category_id: "",
      subcategory_id: "",
      category_name: "",
      subcategory_name: "",
    };
  }

  const instituteCategories = safeArray(
    institute?.categories
  );

  const firstMapping =
    instituteCategories.find(
      (item) => item?.category_id
    ) || instituteCategories[0] || {};

  return {
    category_id:
      institute?.category_id ||
      firstMapping?.category_id ||
      "",

    subcategory_id:
      institute?.subcategory_id ||
      firstMapping?.subcategory_id ||
      "",

    category_name:
      institute?.category_name ||
      firstMapping?.category_name ||
      institute?.category ||
      "",

    subcategory_name:
      institute?.subcategory_name ||
      firstMapping?.subcategory_name ||
      institute?.subcategory ||
      "",
  };
};


/* =========================================================
   TRAINER CATEGORY / SUBCATEGORY MATCHING

   Trainers are allowed only when:
   1. They belong to the selected institute.
   2. Their category matches the institute category.
   3. Their subcategory matches the institute subcategory
      when the institute has a subcategory.
========================================================= */

const getTrainerCategoryIds = (trainer) => {
  const ids = [];

  if (trainer?.category_id) {
    ids.push(String(trainer.category_id));
  }

  if (trainer?.category?.id) {
    ids.push(String(trainer.category.id));
  }

  if (Array.isArray(trainer?.category_ids)) {
    trainer.category_ids.forEach((id) => {
      if (id !== null && id !== undefined && id !== "") {
        ids.push(String(id));
      }
    });
  }

  return [...new Set(ids)];
};

const getTrainerSubcategoryIds = (trainer) => {
  const ids = [];

  if (trainer?.subcategory_id) {
    ids.push(String(trainer.subcategory_id));
  }

  if (trainer?.subcategory?.id) {
    ids.push(String(trainer.subcategory.id));
  }

  if (Array.isArray(trainer?.subcategory_ids)) {
    trainer.subcategory_ids.forEach((id) => {
      if (id !== null && id !== undefined && id !== "") {
        ids.push(String(id));
      }
    });
  }

  return [...new Set(ids)];
};

const getTrainerCategoryNames = (trainer) => {
  const values = [];

  if (trainer?.category_name) {
    values.push(trainer.category_name);
  }

  if (trainer?.category?.name) {
    values.push(trainer.category.name);
  }

  if (trainer?.categories) {
    values.push(trainer.categories);
  }

  if (trainer?.specialty) {
    values.push(trainer.specialty);
  }

  return values
    .filter(Boolean)
    .flatMap((value) =>
      String(value)
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    )
    .map((value) => value.toLowerCase());
};

const getTrainerSubcategoryNames = (trainer) => {
  const values = [];

  if (trainer?.subcategory_name) {
    values.push(trainer.subcategory_name);
  }

  if (trainer?.subcategory?.name) {
    values.push(trainer.subcategory.name);
  }

  if (trainer?.subcategories) {
    values.push(trainer.subcategories);
  }

  return values
    .filter(Boolean)
    .flatMap((value) =>
      String(value)
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    )
    .map((value) => value.toLowerCase());
};

const trainerMatchesInstituteCategory = (
  trainer,
  institute
) => {
  if (!trainer || !institute) {
    return false;
  }

  /*
   * IMPORTANT:
   * Trainer does NOT need to belong to the selected institute.
   *
   * Required relationship:
   *
   * Selected Institute
   *       ↓
   * Institute Category
   *       ↓
   * Institute Subcategory
   *       ↓
   * Find trainer with same Category + Subcategory
   *
   * Example:
   * Institute: ww
   * Category: Dance
   * Subcategory: Western Dance
   *
   * Trainer:
   * Category: Dance
   * Subcategory: Western Dance
   *
   * => Trainer is shown.
   */

  const selection =
    getInstituteCategorySelection(institute);

  if (!selection.category_id && !selection.category_name) {
    return false;
  }

  /* -------------------------------------------------------
     SPECIALIZATION PAIRS
     -------------------------------------------------------
     If backend provides specialization objects, use them
     first so category/subcategory remain correctly paired.
  */

  const specializations = safeArray(
    trainer?.specializations
  );

  if (specializations.length > 0) {
    return specializations.some((specialization) => {
      const categoryId =
        specialization?.category_id ??
        specialization?.categoryId;

      const subcategoryId =
        specialization?.subcategory_id ??
        specialization?.subcategoryId;

      const categoryName =
        specialization?.category_name ??
        specialization?.categoryName ??
        specialization?.category?.name;

      const subcategoryName =
        specialization?.subcategory_name ??
        specialization?.subcategoryName ??
        specialization?.subcategory?.name;

      const categoryMatches =
        (
          selection.category_id &&
          categoryId &&
          String(categoryId) ===
            String(selection.category_id)
        ) ||
        (
          selection.category_name &&
          categoryName &&
          String(categoryName)
            .trim()
            .toLowerCase() ===
            String(selection.category_name)
              .trim()
              .toLowerCase()
        );

      if (!categoryMatches) {
        return false;
      }

      /*
       * If institute has a subcategory, trainer must have
       * the same subcategory.
       */
      if (selection.subcategory_id || selection.subcategory_name) {
        return (
          (
            selection.subcategory_id &&
            subcategoryId &&
            String(subcategoryId) ===
              String(selection.subcategory_id)
          ) ||
          (
            selection.subcategory_name &&
            subcategoryName &&
            String(subcategoryName)
              .trim()
              .toLowerCase() ===
              String(selection.subcategory_name)
                .trim()
                .toLowerCase()
          )
        );
      }

      return true;
    });
  }

  /* -------------------------------------------------------
     CATEGORY MATCH
  ------------------------------------------------------- */

  const trainerCategoryIds =
    getTrainerCategoryIds(trainer);

  const trainerCategoryNames =
    getTrainerCategoryNames(trainer);

  const categoryIdMatches =
    Boolean(selection.category_id) &&
    trainerCategoryIds.includes(
      String(selection.category_id)
    );

  const categoryNameMatches =
    Boolean(selection.category_name) &&
    trainerCategoryNames.includes(
      String(selection.category_name)
        .trim()
        .toLowerCase()
    );

  const categoryMatches =
    categoryIdMatches ||
    categoryNameMatches;

  if (!categoryMatches) {
    return false;
  }

  /* -------------------------------------------------------
     SUBCATEGORY MATCH
  ------------------------------------------------------- */

  if (
    !selection.subcategory_id &&
    !selection.subcategory_name
  ) {
    return true;
  }

  const trainerSubcategoryIds =
    getTrainerSubcategoryIds(trainer);

  const trainerSubcategoryNames =
    getTrainerSubcategoryNames(trainer);

  const subcategoryIdMatches =
    Boolean(selection.subcategory_id) &&
    trainerSubcategoryIds.includes(
      String(selection.subcategory_id)
    );

  const subcategoryNameMatches =
    Boolean(selection.subcategory_name) &&
    trainerSubcategoryNames.includes(
      String(selection.subcategory_name)
        .trim()
        .toLowerCase()
    );

  return (
    subcategoryIdMatches ||
    subcategoryNameMatches
  );
};


/* =========================================================
   MAIN COMPONENT
========================================================= */


export default function Classes() {
  /* =======================================================
     CLASS STATE
  ======================================================= */

  const [classes, setClasses] =
    useState([]);

  const [searchQuery, setSearchQuery] =
    useState("");

  const [showModal, setShowModal] =
    useState(false);

  const [editingClass, setEditingClass] =
    useState(null);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [deletingClass, setDeletingClass] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [submitting, setSubmitting] =
    useState(false);

  const [deleting, setDeleting] =
    useState(false);


  /* =======================================================
     DROPDOWN STATE
  ======================================================= */

  const [institutes, setInstitutes] =
    useState([]);

  const [categories, setCategories] =
    useState([]);

  const [subcategories, setSubcategories] =
    useState([]);

  const [trainers, setTrainers] =
    useState([]);


  /* =======================================================
     FORM STATE
  ======================================================= */

  const [formData, setFormData] =
    useState(DEFAULT_FORM);


  /* =======================================================
     FILTER CLASSES
  ======================================================= */

  const filteredClasses =
    classes.filter((cls) => {
      const query =
        searchQuery
          .trim()
          .toLowerCase();

      if (!query) {
        return true;
      }

      const searchableValues = [
        cls?.title,
        cls?.class_type,
        cls?.classType,
        normalizeType(cls),
        cls?.description,

        getTrainerName(cls),
        getInstituteName(cls),

        getClassCategoryName(cls),
        getClassSubcategoryName(cls),

        cls?.level,
        cls?.mode,

        cls?.id,
        cls?.price,
        cls?.duration,

        getStartDate(cls),
        getStartTime(cls),

        formatDays(
          getAvailableDays(cls)
        ),
      ];

      return searchableValues.some(
        (value) =>
          String(value ?? "")
            .toLowerCase()
            .includes(query)
      );
    });


  /* =======================================================
     FETCH CLASSES
  ======================================================= */

  const fetchClasses = async () => {
    try {
      setLoading(true);

      const response =
        await API.get("/classes");

      const data =
        response?.data?.data;

      setClasses(
        Array.isArray(data)
          ? data
          : []
      );
    } catch (error) {
      console.error(
        "Fetch classes error:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to fetch classes"
      );
    } finally {
      setLoading(false);
    }
  };


  /* =======================================================
     FETCH DROPDOWNS
  ======================================================= */

  const fetchDropdowns = async () => {
    try {
      const [
        instituteResponse,
        categoryResponse,
        subcategoryResponse,
        trainerResponse,
      ] = await Promise.all([
        API.get(
          "/institutes/admin/all"
        ),
        API.get("/categories"),
        API.get("/subcategories"),
        API.get("/trainers"),
      ]);

      const instituteData =
        instituteResponse?.data?.data ??
        instituteResponse?.data ??
        [];

      const categoryData =
        categoryResponse?.data?.data ??
        categoryResponse?.data ??
        [];

      const subcategoryData =
        subcategoryResponse?.data?.data ??
        subcategoryResponse?.data ??
        [];

      const trainerData =
        trainerResponse?.data?.data ??
        trainerResponse?.data ??
        [];

      setInstitutes(
        Array.isArray(instituteData)
          ? instituteData
          : []
      );

      setCategories(
        Array.isArray(categoryData)
          ? categoryData
          : []
      );

      setSubcategories(
        Array.isArray(subcategoryData)
          ? subcategoryData
          : []
      );

      setTrainers(
        Array.isArray(trainerData)
          ? trainerData
          : []
      );
    } catch (error) {
      console.error(
        "Fetch dropdowns error:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to load dropdown data"
      );
    }
  };


  /* =======================================================
     INITIAL LOAD
  ======================================================= */

  useEffect(() => {
    const token =
      localStorage.getItem(
        "adminToken"
      );

    if (!token) {
      return;
    }

    fetchClasses();
    fetchDropdowns();
  }, []);


  /* =======================================================
     RESET FORM
  ======================================================= */

  const resetForm = () => {
    setFormData({
      ...DEFAULT_FORM,
      available_days: [],
    });
  };


  /* =======================================================
     OPEN ADD MODAL
  ======================================================= */

  const handleAdd = () => {
    setEditingClass(null);

    resetForm();

    setShowModal(true);
  };


  /* =======================================================
     TOGGLE DAY
  ======================================================= */

  const toggleDay = (dayValue) => {
    setFormData((previous) => {
      const currentDays =
        safeArray(
          previous.available_days
        );

      const exists =
        currentDays.includes(
          dayValue
        );

      return {
        ...previous,

        available_days: exists
          ? currentDays.filter(
              (day) =>
                day !== dayValue
            )
          : [
              ...currentDays,
              dayValue,
            ],
      };
    });
  };


  /* =======================================================
     EDIT CLASS
  ======================================================= */

  const handleEdit = (cls) => {
    setEditingClass(cls);

    const availableDays =
      safeArray(
        getAvailableDays(cls)
      );

    const startTime =
      getStartTime(cls);

    const selectedInstitute =
      institutes.find(
        (institute) =>
          String(institute?.id) ===
          String(cls?.institute_id)
      );

    const instituteCategory =
      getInstituteCategorySelection(
        selectedInstitute
      );

    setFormData({
      title: cls?.title || "",

      description:
        cls?.description || "",

      category_id:
        cls?.category_id ??
        cls?.categoryId ??
        instituteCategory.category_id ??
        "",

      subcategory_id:
        cls?.subcategory_id ??
        cls?.subcategoryId ??
        instituteCategory.subcategory_id ??
        "",

      trainer_id:
        cls?.trainer_id ??
        cls?.trainerId ??
        cls?.trainer?.id ??
        "",

      institute_id:
        cls?.institute_id ??
        cls?.instituteId ??
        cls?.institute?.id ??
        "",

      price:
        cls?.price ?? "",

      duration:
        cls?.duration ?? "60",

      level:
        cls?.level || "BEGINNER",

      mode:
        cls?.mode || "ONLINE",

      students_count:
        cls?.students_count ??
        cls?.studentsCount ??
        "",

      course_start_date: toDateInputValue(
        cls?.course_start_date ??
        cls?.courseStartDate ??
        cls?.start_date ??
        cls?.startDate ??
        cls?.course_start ??
        cls?.startDateTime
      ),

      course_end_date: toDateInputValue(
        cls?.course_end_date ??
        cls?.courseEndDate ??
        cls?.end_date ??
        cls?.endDate ??
        cls?.course_end ??
        cls?.endDateTime
      ),

      start_time:
        startTime || "",

      end_time:
        cls?.end_time ??
        cls?.endTime ??
        cls?.default_end_time ??
        cls?.defaultEndTime ??
        "",

      available_days:
        availableDays,

      class_type:
        normalizeType(cls) ||
        CLASS_TYPES.LIVE,

      image: null,
    });

    setShowModal(true);
  };



  /* =======================================================
     HANDLE INSTITUTE CHANGE

     Institute is the first selection.

     Once an institute is selected:
       Institute -> Category -> Subcategory

     Category and Subcategory are fetched from the
     selected institute's own institute_categories mapping.
  ======================================================= */

  const handleInstituteChange = (
    event
  ) => {
    const instituteId =
      event.target.value;

    const selectedInstitute =
      institutes.find(
        (institute) =>
          String(institute?.id) ===
          String(instituteId)
      );

    const selection =
      getInstituteCategorySelection(
        selectedInstitute
      );

    setFormData((previous) => ({
      ...previous,

      institute_id:
        instituteId,

      category_id:
        selection.category_id,

      subcategory_id:
        selection.subcategory_id,

      // Trainer must be selected again
      // for the newly selected institute/category.
      trainer_id: "",
    }));
  };



  /* =======================================================
     DELETE
  ======================================================= */

  const handleDelete = (cls) => {
    setDeletingClass(cls);
    setShowDeleteModal(true);
  };


  /* =======================================================
     CONFIRM DELETE
  ======================================================= */

  const confirmDelete = async () => {
    if (
      !deletingClass?.id ||
      deleting
    ) {
      return;
    }

    try {
      setDeleting(true);

      await API.delete(
        `/classes/admin/${deletingClass.id}`
      );

      toast.success(
        "Class deleted successfully"
      );

      setShowDeleteModal(false);
      setDeletingClass(null);

      await fetchClasses();
    } catch (error) {
      console.error(
        "Delete class error:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Delete failed"
      );
    } finally {
      setDeleting(false);
    }
  };


  /* =======================================================
     CLOSE MODAL
  ======================================================= */

  const closeModal = () => {
    if (submitting) {
      return;
    }

    setShowModal(false);

    setEditingClass(null);

    resetForm();
  };


  /* =======================================================
     HANDLE FORM INPUT
  ======================================================= */

  const handleInputChange = (
    event
  ) => {
    const {
      name,
      value,
      files,
    } = event.target;

    if (name === "image") {
      setFormData(
        (previous) => ({
          ...previous,
          image:
            files?.[0] || null,
        })
      );

      return;
    }

    setFormData(
      (previous) => ({
        ...previous,
        [name]: value,
      })
    );
  };


  /* =======================================================
     CATEGORY / SUBCATEGORY

     These values are intentionally NOT manually editable.
     They come from the selected Institute.
  ======================================================= */



  /* =======================================================
     HANDLE START TIME
  ======================================================= */

  const handleStartTimeChange = (
    value
  ) => {
    setFormData(
      (previous) => ({
        ...previous,

        start_time:
          value &&
          value.isValid()
            ? value.format(
                "HH:mm:ss"
              )
            : "",
      })
    );
  };


  /* =======================================================
     HANDLE SUBMIT
  ======================================================= */

  /* =======================================================
     DUPLICATE CLASS NAME + AVAILABLE DAYS CHECK

     Same class name can be created multiple times, but
     an already-used available day cannot be reused for
     that class name within the same institute.
  ======================================================= */

  const getClassDaysForDuplicateCheck = (cls) => {
    return safeArray(
      cls?.available_days ??
      cls?.availableDays
    ).map((day) =>
      String(day).trim().toUpperCase()
    );
  };

  const findDuplicateClassDays = () => {
    const currentTitle = String(
      formData.title || ""
    ).trim().toLowerCase();

    const currentInstituteId = String(
      formData.institute_id || ""
    );

    const currentDays = new Set(
      safeArray(formData.available_days).map((day) =>
        String(day).trim().toUpperCase()
      )
    );

    if (
      !currentTitle ||
      !currentInstituteId ||
      currentDays.size === 0
    ) {
      return [];
    }

    const duplicateDays = new Set();

    classes.forEach((cls) => {
      // While editing, don't compare the class with itself.
      if (
        editingClass?.id &&
        String(cls?.id) === String(editingClass.id)
      ) {
        return;
      }

      const existingTitle = String(
        cls?.title || ""
      ).trim().toLowerCase();

      const existingInstituteId = String(
        cls?.institute_id ??
        cls?.instituteId ??
        cls?.institute?.id ??
        ""
      );

      // Duplicate rule is scoped to the same institute.
      if (existingTitle !== currentTitle) {
        return;
      }

      if (existingInstituteId !== currentInstituteId) {
        return;
      }

      getClassDaysForDuplicateCheck(cls).forEach((day) => {
        if (currentDays.has(day)) {
          duplicateDays.add(day);
        }
      });
    });

    return [...duplicateDays];
  };

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    if (submitting) {
      return;
    }


    /* =====================================================
       VALIDATION
    ===================================================== */

    if (!formData.class_type) {
      toast.error("Class Type is required");
      return;
    }


    if (
      !formData.title?.trim()
    ) {
      toast.error(
        "Class Name is required"
      );
      return;
    }

    if (!formData.start_time) {
      toast.error("Start Time is required");
      return;
    }

    if (!formData.course_start_date) {
      toast.error("Course Start Date is required");
      return;
    }

    if (!formData.course_end_date) {
      toast.error("Course End Date is required");
      return;
    }

    if (formData.course_end_date < formData.course_start_date) {
      toast.error("Course End Date cannot be before Course Start Date");
      return;
    }

    if (!formData.price || Number(formData.price) <= 0) {
      toast.error("Price must be greater than 0");
      return;
    }

    if (!formData.duration || Number(formData.duration) <= 0) {
      toast.error("Duration is required");
      return;
    }

    if (!safeArray(formData.available_days).length) {
      toast.error("Please select at least one Available Day");
      return;
    }

    /* =====================================================
       PREVENT DUPLICATE DAYS FOR SAME CLASS NAME
    ===================================================== */

    const duplicateClassDays =
      findDuplicateClassDays();

    if (duplicateClassDays.length > 0) {
      const dayLabels = duplicateClassDays
        .map((day) =>
          day.charAt(0) +
          day.slice(1).toLowerCase()
        )
        .join(", ");

      toast.error(
        `This class name is already created for: ${dayLabels}. Please select different days.`
      );
      return;
    }

    if (!formData.institute_id) {
      toast.error(
        "Please select an Institute"
      );
      return;
    }

    if (!formData.category_id) {
      toast.error(
        "Selected Institute does not have a Category"
      );
      return;
    }

    if (
      selectedInstitute &&
      getInstituteCategorySelection(
        selectedInstitute
      ).subcategory_id &&
      !formData.subcategory_id
    ) {
      toast.error(
        "Selected Institute does not have a Subcategory"
      );
      return;
    }

    if (!formData.subcategory_id) {
      toast.error("Please select a Subcategory");
      return;
    }

    if (!formData.trainer_id) {
      toast.error(
        "Please select a Trainer"
      );
      return;
    }

    const selectedTrainer =
      trainers.find(
        (trainer) =>
          String(trainer?.id) ===
          String(formData.trainer_id)
      );

    if (
      !selectedTrainer ||
      !selectedInstitute ||
      !trainerMatchesInstituteCategory(
        selectedTrainer,
        selectedInstitute
      )
    ) {
      toast.error(
        "Please select a trainer matching the selected category and subcategory"
      );
      return;
    }

    if (!formData.category_id) {
      toast.error(
        "Please select a Category"
      );
      return;
    }


    /* =====================================================
       FORM DATA
    ===================================================== */

    const payload =
      new FormData();

    payload.append(
      "title",
      formData.title.trim()
    );

    payload.append(
      "description",
      formData.description?.trim() ||
        ""
    );

    payload.append(
      "category_id",
      String(formData.category_id)
    );

    if (
      formData.subcategory_id
    ) {
      payload.append(
        "subcategory_id",
        String(
          formData.subcategory_id
        )
      );
    }

    payload.append(
      "trainer_id",
      String(formData.trainer_id)
    );

    payload.append(
      "institute_id",
      String(formData.institute_id)
    );

    payload.append(
      "students_count",
      String(
        formData.students_count || 0
      )
    );

    payload.append(
      "price",
      String(formData.price)
    );

    payload.append(
      "duration",
      String(
        formData.duration || 60
      )
    );

    payload.append(
      "level",
      formData.level ||
        "BEGINNER"
    );

    payload.append(
      "mode",
      formData.mode ||
        "ONLINE"
    );

    payload.append(
      "class_type",
      formData.class_type ||
        CLASS_TYPES.LIVE
    );


    /* =====================================================
       IMAGE
    ===================================================== */

    if (formData.image) {
      payload.append(
        "image",
        formData.image
      );
    }


    /* =====================================================
       START DATE
    ===================================================== */

    if (
      formData.course_start_date
    ) {
      payload.append(
        "start_date",
        formData.course_start_date
      );

      /*
       * Also send course_start_date
       * for backends using that name.
       */
      payload.append(
        "course_start_date",
        formData.course_start_date
      );
    }


    /* =====================================================
       END DATE
    ===================================================== */

    if (
      formData.course_end_date
    ) {
      payload.append(
        "end_date",
        formData.course_end_date
      );

      payload.append(
        "course_end_date",
        formData.course_end_date
      );
    }


    /* =====================================================
       START TIME
    ===================================================== */

    if (formData.start_time) {
      payload.append(
        "start_time",
        formData.start_time
      );
    }


    /* =====================================================
       END TIME
    ===================================================== */

    if (formData.end_time) {
      payload.append(
        "end_time",
        formData.end_time
      );
    }


    /* =====================================================
       AVAILABLE DAYS

       Send both:
         available_days[]
       and
         available_days

       The first matches your existing backend.
       The second helps backends expecting JSON.
    ===================================================== */

    // const availableDays =
    //   safeArray(
    //     formData.available_days
    //   );

    // availableDays.forEach(
    //   (day) => {
    //     payload.append(
    //       "available_days[]",
    //       day
    //     );
    //   }
    // );

    // payload.append(
    //   "available_days",
    //   JSON.stringify(
    //     availableDays
    //   )
    // );
const availableDays = safeArray(
  formData.available_days
);

availableDays.forEach((day) => {
  payload.append(
    "available_days[]",
    day
  );
});

    /* =====================================================
       API REQUEST
    ===================================================== */

    try {
      setSubmitting(true);

      if (editingClass?.id) {
        await API.put(
          `/classes/admin/${editingClass.id}`,
          payload,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

        toast.success(
          "Class updated successfully"
        );
      } else {
        await API.post(
          "/classes/admin/create",
          payload,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

        toast.success(
          "Class created successfully"
        );
      }

      await fetchClasses();

      setShowModal(false);
      setEditingClass(null);
      resetForm();
    } catch (error) {
      console.error(
        "Class save error:",
        error
      );

      console.error(
        "Backend error:",
        error?.response?.data
      );

      toast.error(
        error?.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setSubmitting(false);
    }
  };


  /* =======================================================
     MODE BADGE
  ======================================================= */

  const getModeColor = (
    mode
  ) => {
    switch (
      String(mode || "")
        .toUpperCase()
    ) {
      case "ONLINE":
        return "bg-blue-500/20 text-blue-300";

      case "OFFLINE":
        return "bg-orange-500/20 text-orange-300";

      case "HYBRID":
        return "bg-green-500/20 text-green-300";

      default:
        return "bg-gray-500/20 text-gray-300";
    }
  };


  /* =======================================================
     FILTER SUBCATEGORIES
  ======================================================= */

  const filteredSubcategories =
    subcategories.filter(
      (subcategory) =>
        String(
          subcategory?.category_id
        ) ===
        String(
          formData.category_id
        )
    );

  const selectedInstitute =
    institutes.find(
      (institute) =>
        String(institute?.id) ===
        String(formData.institute_id)
    );

  /*
   * IMPORTANT:
   * Trainers are filtered ONLY by the Category +
   * Subcategory assigned to the selected Institute.
   *
   * The trainer's institute_id is NOT required.
   */
  const filteredTrainers =
    selectedInstitute
      ? trainers.filter((trainer) =>
          trainerMatchesInstituteCategory(
            trainer,
            selectedInstitute
          )
        )
      : [];


  /* =======================================================
     STYLES
  ======================================================= */

  const selectClass =
    "w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors";

  const inputClass =
    "w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors";

  const labelClass =
    "block text-sm text-gray-400 mb-1";


  /* =======================================================
     TABLE COLUMN COUNT

     Actual columns:
     1 ID
     2 Image
     3 Class Name
     4 Class Type
     5 Description
     5 Institute
     6 Trainer
     7 Category
     8 Subcategory
     9 Level
     10 Mode
     11 Price
     12 Duration
     13 Students
     14 Start Date
     15 End Date
     16 Start Time
     17 End Time
     18 Available Days
     19 Actions
  ======================================================= */

  const totalColumns = 20;


  /* =======================================================
     JSX
  ======================================================= */

  return (
    <div className="p-8 text-white min-h-screen">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">

        <div>
          <h1 className="text-4xl font-bold text-purple-400">
            Admin Classes
          </h1>

          <p className="text-gray-400 mt-2">
            Manage your classes
          </p>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition-opacity"
        >
          + Add Class
        </button>
      </div>


      {/* =====================================================
          SEARCH
      ===================================================== */}

      <div className="mb-6">
        <div className="relative w-full">

          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
            size={18}
          />

          <input
            type="text"
            placeholder="Search by name, description, trainer, category, institute, level, mode..."
            value={searchQuery}
            onChange={(event) =>
              setSearchQuery(
                event.target.value
              )
            }
            className="w-full pl-12 pr-10 py-3.5 rounded-xl bg-[#151519] border border-[#2c2c35] text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/60 transition-colors text-sm"
          />

          {searchQuery && (
            <button
              type="button"
              onClick={() =>
                setSearchQuery("")
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
            >
              <FaTimes size={14} />
            </button>
          )}
        </div>
      </div>


      {/* =====================================================
          TABLE
      ===================================================== */}

      <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-[#202027] text-gray-400">

              <tr>

                <th className="p-4 text-left whitespace-nowrap">
                  ID
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Image
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Class Name
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Class Type
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Description
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Institute
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Trainer
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Category
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Subcategory
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Level
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Mode
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Price
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Duration
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Students
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Start Date
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  End Date
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Start Time
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  End Time
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Available Days
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  Actions
                </th>

              </tr>

            </thead>


            <tbody>

              {loading ? (

                <tr>
                  <td
                    colSpan={totalColumns}
                    className="p-12 text-center text-gray-500"
                  >
                    Loading classes...
                  </td>
                </tr>

              ) : filteredClasses.length === 0 ? (

                <tr>

                  <td
                    colSpan={totalColumns}
                    className="p-12 text-center"
                  >

                    <div className="flex flex-col items-center gap-3">

                      <Search
                        size={40}
                        className="text-gray-600"
                      />

                      <p className="text-gray-500 text-lg">
                        {searchQuery
                          ? "No classes found matching your search"
                          : "No classes available"}
                      </p>

                      {searchQuery && (
                        <button
                          type="button"
                          onClick={() =>
                            setSearchQuery("")
                          }
                          className="text-purple-400 hover:text-purple-300 text-sm mt-1 transition-colors"
                        >
                          Clear search
                        </button>
                      )}

                    </div>

                  </td>

                </tr>

              ) : (

                filteredClasses.map(
                  (cls) => {

                    const imageUrl =
                      getImageUrl(
                        cls?.image
                      );

                    const availableDays =
                      getAvailableDays(
                        cls
                      );

                    return (
                      <tr
                        key={cls.id}
                        className="border-t border-[#2c2c35] hover:bg-[#1a1a20] transition-colors"
                      >

                        {/* ID */}
                        <td className="p-4 text-gray-400 whitespace-nowrap">
                          {cls.id}
                        </td>


                        {/* IMAGE */}
                        <td className="p-4">

                          {imageUrl ? (

                            <img
                              src={imageUrl}
                              alt={
                                cls.title ||
                                "Class"
                              }
                              className="w-11 h-11 rounded-xl object-cover border border-[#333]"
                              onError={(event) => {
                                event.currentTarget.style.display =
                                  "none";
                              }}
                            />

                          ) : (

                            <div className="w-11 h-11 bg-[#26262b] rounded-xl flex items-center justify-center text-gray-600 text-xs">
                              N/A
                            </div>

                          )}

                        </td>


                        {/* CLASS NAME */}
                        <td className="p-4 font-medium whitespace-nowrap">
                          {cls.title || "-"}
                        </td>


                        {/* CLASS TYPE */}
                        <td className="p-4 whitespace-nowrap">
                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                              normalizeType(cls) === CLASS_TYPES.RECORDING
                                ? "bg-pink-500/20 text-pink-300"
                                : "bg-purple-500/20 text-purple-300"
                            }`}
                          >
                            {normalizeType(cls) === CLASS_TYPES.RECORDING
                              ? "Recording Class"
                              : "Live Class"}
                          </span>
                        </td>


                        {/* DESCRIPTION */}
                        <td
                          className="p-4 text-gray-400 max-w-[180px] truncate"
                          title={
                            cls.description ||
                            ""
                          }
                        >
                          {truncate(
                            cls.description,
                            30
                          )}
                        </td>


                        {/* INSTITUTE */}
                        <td className="p-4 text-gray-400 whitespace-nowrap">
                          {getInstituteName(
                            cls
                          )}
                        </td>


                        {/* TRAINER */}
                        <td className="p-4 text-gray-400 whitespace-nowrap">
                          {getTrainerName(
                            cls
                          )}
                        </td>


                        {/* CATEGORY */}
                        <td className="p-4 text-gray-400 whitespace-nowrap">
                          {getClassCategoryName(
                            cls
                          )}
                        </td>


                        {/* SUBCATEGORY */}
                        <td className="p-4 text-gray-400 whitespace-nowrap">
                          {getClassSubcategoryName(
                            cls
                          )}
                        </td>


                        {/* LEVEL */}
                        <td className="p-4 whitespace-nowrap">

                          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300">
                            {cls.level || "-"}
                          </span>

                        </td>


                        {/* MODE */}
                        <td className="p-4 whitespace-nowrap">

                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getModeColor(
                              cls.mode
                            )}`}
                          >
                            {cls.mode || "-"}
                          </span>

                        </td>


                        {/* PRICE */}
                        <td className="p-4 font-semibold whitespace-nowrap">
                          ₹
                          {cls.price ??
                            0}
                        </td>


                        {/* DURATION */}
                        <td className="p-4 text-gray-400 whitespace-nowrap">
                          {cls.duration
                            ? `${cls.duration} min`
                            : "-"}
                        </td>


                        {/* STUDENTS */}
                        <td className="p-4 font-semibold whitespace-nowrap">
                          {getStudentsCount(
                            cls
                          )}
                        </td>


                        {/* START DATE */}
                        <td className="p-4 text-gray-400 whitespace-nowrap">
                          {formatDate(
                            getStartDate(
                              cls
                            )
                          )}
                        </td>


                        {/* END DATE */}
                        <td className="p-4 text-gray-400 whitespace-nowrap">
                          {formatDate(
                            getEndDate(cls)
                          )}
                        </td>


                        {/* START TIME */}
                        <td className="p-4 text-white whitespace-nowrap">
                          {formatTime(
                            getStartTime(cls)
                          )}
                        </td>


                        {/* END TIME */}
                        <td className="p-4 text-white whitespace-nowrap">
                          {formatTime(
                            getEndTime(cls)
                          )}
                        </td>


                        {/* AVAILABLE DAYS */}
                        <td
                          className="p-4 text-gray-400 whitespace-nowrap"
                          title={formatDays(
                            availableDays
                          )}
                        >
                          {formatDays(
                            availableDays
                          )}
                        </td>


                        {/* ACTIONS */}
                        <td className="p-4">

                          <div className="flex items-center gap-2">

                            <button
                              type="button"
                              onClick={() =>
                                handleEdit(
                                  cls
                                )
                              }
                              className="p-2 rounded-lg hover:bg-[#2a2a35] transition-colors group"
                              title="Edit"
                            >
                              <Edit
                                size={16}
                                className="text-gray-400 group-hover:text-white transition-colors"
                              />
                            </button>


                            <button
                              type="button"
                              onClick={() =>
                                handleDelete(
                                  cls
                                )
                              }
                              className="p-2 rounded-lg hover:bg-red-500/10 transition-colors group"
                              title="Delete"
                            >
                              <Trash2
                                size={16}
                                className="text-red-500/70 group-hover:text-red-400 transition-colors"
                              />
                            </button>

                          </div>

                        </td>

                      </tr>
                    );
                  }
                )

              )}

            </tbody>

          </table>

        </div>

      </div>


      {/* =====================================================
          ADD / EDIT MODAL
      ===================================================== */}

      {showModal && (

        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">

          <div className="w-full max-w-[650px] max-h-[90vh] bg-[#211c30] rounded-2xl overflow-hidden shadow-2xl">

            {/* HEADER */}

            <div className="flex justify-between items-center p-6 border-b border-[#3a3448]">

              <h2 className="text-2xl font-bold text-white">
                {editingClass
                  ? "Edit Class"
                  : "Add Class"}
              </h2>

              <button
                type="button"
                onClick={closeModal}
                disabled={submitting}
                className="text-gray-400 hover:text-white transition-colors disabled:opacity-40"
              >
                <FaTimes size={20} />
              </button>

            </div>


            {/* BODY */}

            <div className="overflow-y-auto max-h-[75vh] p-6">

              <form
                onSubmit={
                  handleSubmit
                }
                className="space-y-1"
              >

                {/* =================================================
                    CLASS TYPE
                ================================================= */}

                <div>
                  <label className={labelClass}>Class Type *</label>

                  <select
                    name="class_type"
                    value={formData.class_type}
                    onChange={handleInputChange}
                    className={selectClass}
                    required
                  >
                    <option value="">Select Class Type</option>
                    <option value={CLASS_TYPES.LIVE}>Live Class</option>
                    <option value={CLASS_TYPES.RECORDING}>
                      Recording Class
                    </option>
                  </select>
                </div>


                {/* =================================================
                    CLASS NAME
                ================================================= */}

                <div>

                  <label
                    className={
                      labelClass
                    }
                  >
                    Class Name *
                  </label>

                  <input
                    name="title"
                    value={
                      formData.title
                    }
                    onChange={
                      handleInputChange
                    }
                    className={
                      inputClass
                    }
                    placeholder="Enter class name"
                    required
                  />

                </div>


                {/* =================================================
                    DESCRIPTION
                ================================================= */}

                <div>

                  <label
                    className={
                      labelClass
                    }
                  >
                    Description
                  </label>

                  <textarea
                    name="description"
                    value={
                      formData.description
                    }
                    onChange={
                      handleInputChange
                    }
                    rows={3}
                    className={
                      inputClass
                    }
                    placeholder="Enter description"
                  />

                </div>

                {/* =================================================
                    IMAGE
                ================================================= */}

                <div>

                  <label
                    className={
                      labelClass
                    }
                  >
                    Class Image
                  </label>


                  {editingClass?.image && (

                    <img
                      src={getImageUrl(
                        editingClass.image
                      )}
                      alt="Current class"
                      className="w-20 h-20 object-cover rounded-xl mb-2 border border-[#333]"
                    />

                  )}


                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={
                      handleInputChange
                    }
                    className="w-full mt-2 mb-4 p-3 rounded-xl bg-[#2b2638] text-white border border-transparent focus:outline-none focus:border-purple-500/50 transition-colors file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-500/20 file:text-purple-300 hover:file:bg-purple-500/30"
                  />

                </div>


                {/* =================================================
                    INSTITUTE / TRAINER
                ================================================= */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  {/* INSTITUTE */}

                  <div>

                    <label
                      className={
                        labelClass
                      }
                    >
                      Institute *
                    </label>

                    <select
                      name="institute_id"
                      value={
                        formData.institute_id
                      }
                      onChange={
                        handleInstituteChange
                      }
                      className={
                        selectClass
                      }
                      required
                    >

                      <option value="">
                        Select Institute
                      </option>

                      {institutes.map(
                        (item) => (
                          <option
                            key={item.id}
                            value={item.id}
                          >
                            {item.name}
                          </option>
                        )
                      )}

                    </select>

                  </div>


                  {/* TRAINER */}

                  <div>

                    <label
                      className={
                        labelClass
                      }
                    >
                      Trainer *
                    </label>

                    <select
                      name="trainer_id"
                      value={
                        formData.trainer_id
                      }
                      onChange={
                        handleInputChange
                      }
                      disabled={
                        !formData.institute_id
                      }
                      className={`${selectClass} disabled:opacity-50`}
                      required
                    >

                      <option value="">
                        {formData.institute_id
                          ? filteredTrainers.length > 0
                            ? "Select Trainer"
                            : "No matching trainers available"
                          : "Select Institute First"}
                      </option>

                      {filteredTrainers.map(
                        (trainer) => (
                          <option
                            key={
                              trainer.id
                            }
                            value={
                              trainer.id
                            }
                          >
                            {trainer.full_name ||
                              trainer.name ||
                              `Trainer #${trainer.id}`}
                          </option>
                        )
                      )}

                    </select>

                  </div>

                </div>


                {/* =================================================
                    CATEGORY / SUBCATEGORY
                ================================================= */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  {/* CATEGORY */}

                  <div>

                    <label
                      className={
                        labelClass
                      }
                    >
                      Category *
                    </label>

                    <select
                      name="category_id"
                      value={
                        formData.category_id
                      }
                      onChange={() => {}}
                      disabled
                      className={`${selectClass} disabled:opacity-70 disabled:cursor-not-allowed`}
                      required
                    >

                      <option value="">
                        Select Category
                      </option>

                      {categories.map(
                        (category) => (
                          <option
                            key={
                              category.id
                            }
                            value={
                              category.id
                            }
                          >
                            {category.name}
                          </option>
                        )
                      )}

                    </select>

                  </div>


                  {/* SUBCATEGORY */}

                  <div>

                    <label
                      className={
                        labelClass
                      }
                    >
                      Subcategory *
                    </label>

                    <select
                      name="subcategory_id"
                      value={
                        formData.subcategory_id
                      }
                      onChange={() => {}}
                      disabled
                      className={`${selectClass} disabled:opacity-70 disabled:cursor-not-allowed`}
                    >

                      <option value="">
                        Select Subcategory
                      </option>

                      {filteredSubcategories.map(
                        (subcategory) => (
                          <option
                            key={
                              subcategory.id
                            }
                            value={
                              subcategory.id
                            }
                          >
                            {
                              subcategory.name
                            }
                          </option>
                        )
                      )}

                    </select>

                  </div>

                </div>


                {/* =================================================
                    PRICE / DURATION
                ================================================= */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  <div>

                    <label
                      className={
                        labelClass
                      }
                    >
                      Price *
                    </label>

                    <input
                      type="number"
                      name="price"
                      min="1"
                      value={
                        formData.price
                      }
                      onChange={
                        handleInputChange
                      }
                      className={
                        inputClass
                      }
                      placeholder="Enter price"
                      required
                    />

                  </div>


                  <div>

                    <label
                      className={
                        labelClass
                      }
                    >
                      Duration (Minutes) *
                    </label>

                    <input
                      type="number"
                      name="duration"
                      min="1"
                      value={
                        formData.duration
                      }
                      onChange={
                        handleInputChange
                      }
                      className={
                        inputClass
                      }
                      placeholder="60"
                      required
                    />

                  </div>

                </div>


                {/* =================================================
                    START DATE / END DATE
                ================================================= */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  <div>

                    <label
                      className={
                        labelClass
                      }
                    >
                      Course Start Date *
                    </label>

                    <input
                      type="date"
                      name="course_start_date"
                      min={getTodayDateInputValue()}
                      value={
                        formData.course_start_date
                      }
                      onChange={
                        handleInputChange
                      }
                      className={
                        inputClass
                      }
                      required
                    />

                  </div>


                  <div>

                    <label
                      className={
                        labelClass
                      }
                    >
                      Course End Date *
                    </label>

                    <input
                      type="date"
                      name="course_end_date"
                      min={formData.course_start_date || getTodayDateInputValue()}
                      value={
                        formData.course_end_date
                      }
                      onChange={
                        handleInputChange
                      }
                      className={
                        inputClass
                      }
                      required
                    />

                  </div>

                </div>


                {/* =================================================
                    START / END TIME
                ================================================= */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  <div>

                    <label
                      className={
                        labelClass
                      }
                    >
                      Start Time *
                    </label>

                    <LocalizationProvider
                      dateAdapter={
                        AdapterDayjs
                      }
                    >

                      <TimePicker
                        label="Start Time"
                        ampm
                        value={normalizeTimeForPicker(
                          formData.start_time
                        )}
                        onChange={
                          handleStartTimeChange
                        }
                        slotProps={{
                          textField: {
                            fullWidth:
                              true,
                            sx: {
                              marginTop:
                                "8px",
                              marginBottom:
                                "16px",

                              "& .MuiInputBase-root":
                                {
                                 
                                   backgroundColor: "#ffffff",
                                  borderRadius:
                                    "12px",
                                  color:
                                    "white",
                                },

                              "& .MuiInputBase-input":
                                {
                                  color: "#ffffff !important",
                                  WebkitTextFillColor: "#ffffff",
                                  opacity: 1,
                                },

                              "& input, & .MuiInputBase-input, & .MuiInputBase-inputAdornedEnd":
                                {
                                  color: "#ffffff !important",
                                  WebkitTextFillColor: "#ffffff !important",
                                  opacity: 1,
                                  caretColor: "#ffffff",
                                },

                              "& .MuiIconButton-root":
                                {
                                  color: "#ffffff !important",
                                },

                              "& .MuiSvgIcon-root":
                                {
                                  color: "#ffffff !important",
                                },

                              "& .MuiInputBase-input.Mui-disabled":
                                {
                                  WebkitTextFillColor: "#ffffff",
                                  opacity: 1,
                                },

                              "& .MuiInputLabel-root":
                                {
                                  color:
                                    "#9ca3af",
                                },

                              "& .MuiInputLabel-root.Mui-focused":
                                {
                                  color:
                                    "#a855f7",
                                },

                              "& .MuiOutlinedInput-notchedOutline":
                                {
                                  borderColor:
                                    "transparent",
                                },

                              "&:hover .MuiOutlinedInput-notchedOutline":
                                {
                                  borderColor:
                                    "rgba(168,85,247,.5)",
                                },

                              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                                {
                                  borderColor:
                                    "rgba(168,85,247,.6)",
                                },

                              "& .MuiSvgIcon-root":
                                {
                                  color:
                                    "#9ca3af",
                                },
                            },
                          },
                        }}
                      />

                    </LocalizationProvider>

                  </div>


                  <div>

                    <label
                      className={
                        labelClass
                      }
                    >
                      End Time
                    </label>

                    <LocalizationProvider
                      dateAdapter={
                        AdapterDayjs
                      }
                    >

                      <TimePicker
                        label="End Time"
                        ampm
                        value={normalizeTimeForPicker(
                          formData.end_time
                        )}
                        onChange={(value) =>
                          setFormData(
                            (previous) => ({
                              ...previous,

                              end_time:
                                value &&
                                value.isValid()
                                  ? value.format(
                                      "HH:mm:ss"
                                    )
                                  : "",
                            })
                          )
                        }
                        slotProps={{
                          textField: {
                            fullWidth:
                              true,
                            sx: {
                              marginTop:
                                "8px",
                              marginBottom:
                                "16px",

                              "& .MuiInputBase-root":
                                {
                                  backgroundColor:
                                    "#2b2638",
                                  borderRadius:
                                    "12px",
                                  color:
                                    "white",
                                },

                              "& .MuiInputBase-input":
                                {
                                  color: "#ffffff !important",
                                  WebkitTextFillColor: "#ffffff",
                                  opacity: 1,
                                },

                              "& input, & .MuiInputBase-input, & .MuiInputBase-inputAdornedEnd":
                                {
                                  color: "#ffffff !important",
                                  WebkitTextFillColor: "#ffffff !important",
                                  opacity: 1,
                                  caretColor: "#ffffff",
                                },

                              "& .MuiIconButton-root":
                                {
                                  color: "#ffffff !important",
                                },

                              "& .MuiSvgIcon-root":
                                {
                                  color: "#ffffff !important",
                                },

                              "& .MuiInputBase-input.Mui-disabled":
                                {
                                  WebkitTextFillColor: "#ffffff",
                                  opacity: 1,
                                },

                              "& .MuiInputLabel-root":
                                {
                                  color:
                                    "#9ca3af",
                                },

                              "& .MuiInputLabel-root.Mui-focused":
                                {
                                  color:
                                    "#a855f7",
                                },

                              "& .MuiOutlinedInput-notchedOutline":
                                {
                                  borderColor:
                                    "transparent",
                                },

                              "&:hover .MuiOutlinedInput-notchedOutline":
                                {
                                  borderColor:
                                    "rgba(168,85,247,.5)",
                                },

                              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                                {
                                  borderColor:
                                    "rgba(168,85,247,.6)",
                                },

                              "& .MuiSvgIcon-root":
                                {
                                  color:
                                    "#9ca3af",
                                },
                            },
                          },
                        }}
                      />

                    </LocalizationProvider>

                  </div>

                </div>


                {/* =================================================
                    AVAILABLE DAYS
                ================================================= */}

                <div>

                  <label
                    className={
                      labelClass
                    }
                  >
                    Available Days *
                  </label>

                  <div className="mt-2 mb-4 grid grid-cols-4 sm:grid-cols-7 gap-2">

                    {DAYS_LIST.map(
                      (day) => {

                        const isChecked =
                          safeArray(
                            formData.available_days
                          ).includes(
                            day.value
                          );

                        return (
                          <label
                            key={
                              day.value
                            }
                            className={`
                              flex items-center justify-center gap-1.5 p-2.5 rounded-xl cursor-pointer text-xs font-medium transition-all border
                              ${
                                isChecked
                                  ? "bg-purple-500/20 border-purple-500/50 text-purple-300"
                                  : "bg-[#2b2638] border-transparent text-gray-400 hover:border-purple-500/30 hover:text-gray-300"
                              }
                            `}
                          >

                            <input
                              type="checkbox"
                              checked={
                                isChecked
                              }
                              onChange={() =>
                                toggleDay(
                                  day.value
                                )
                              }
                              className="sr-only"
                            />

                            <span
                              className={`
                                w-4 h-4 rounded border flex items-center justify-center transition-colors
                                ${
                                  isChecked
                                    ? "bg-purple-500 border-purple-500"
                                    : "border-gray-500"
                                }
                              `}
                            >

                              {isChecked && (
                                <svg
                                  className="w-3 h-3 text-white"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={3}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              )}

                            </span>

                            {day.label.slice(
                              0,
                              3
                            )}

                          </label>
                        );
                      }
                    )}

                  </div>

                </div>


                {/* =================================================
                    STUDENTS COUNT
                ================================================= */}

                <div>

                  <label
                    className={
                      labelClass
                    }
                  >
                    Students Count
                  </label>

                  <input
                    type="number"
                    name="students_count"
                    min="0"
                    value={
                      formData.students_count
                    }
                    onChange={
                      handleInputChange
                    }
                    className={
                      inputClass
                    }
                    placeholder="0"
                  />

                </div>


                {/* =================================================
                    LEVEL / MODE
                ================================================= */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  <div>

                    <label
                      className={
                        labelClass
                      }
                    >
                      Level
                    </label>

                    <select
                      name="level"
                      value={
                        formData.level
                      }
                      onChange={
                        handleInputChange
                      }
                      className={
                        selectClass
                      }
                    >

                      <option value="BEGINNER">
                        Beginner
                      </option>

                      <option value="INTERMEDIATE">
                        Intermediate
                      </option>

                      <option value="ADVANCED">
                        Advanced
                      </option>

                    </select>

                  </div>


                  <div>

                    <label
                      className={
                        labelClass
                      }
                    >
                      Mode
                    </label>

                    <select
                      name="mode"
                      value={
                        formData.mode
                      }
                      onChange={
                        handleInputChange
                      }
                      className={
                        selectClass
                      }
                    >

                      <option value="ONLINE">
                        Online
                      </option>

                      <option value="OFFLINE">
                        Offline
                      </option>

                      <option value="HYBRID">
                        Hybrid
                      </option>

                    </select>

                  </div>

                </div>


                {/* =================================================
                    BUTTONS
                ================================================= */}

                <div className="flex justify-end gap-3 pt-4 border-t border-[#3a3448]">

                  <button
                    type="button"
                    onClick={
                      closeModal
                    }
                    disabled={
                      submitting
                    }
                    className="px-5 py-3 rounded-xl border border-gray-600 text-gray-300 hover:bg-[#2b2638] transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={
                      submitting
                    }
                    className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting
                      ? editingClass
                        ? "Updating..."
                        : "Creating..."
                      : editingClass
                      ? "Update Class"
                      : "Add Class"}
                  </button>

                </div>

              </form>

            </div>

          </div>

        </div>
      )}


      {/* =====================================================
          DELETE CONFIRMATION MODAL
      ===================================================== */}

      {showDeleteModal && (

        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">

          <div className="w-full max-w-[400px] bg-[#1e1b2e] border border-[#2e2a42] rounded-2xl shadow-2xl overflow-hidden">

            <div className="p-8 flex flex-col items-center">

              <div className="w-14 h-14 rounded-full bg-red-500/15 flex items-center justify-center mb-5">

                <FaTrash className="text-red-400 text-lg" />

              </div>


              <h2 className="text-xl font-bold text-white mb-3 text-center">
                Delete Class
              </h2>


              <p className="text-gray-400 text-center text-sm leading-relaxed mb-3">
                Are you sure you want to
                delete this class?
              </p>


              {deletingClass?.title && (

                <p className="text-white font-semibold text-center mb-8">
                  "{deletingClass.title}"
                </p>

              )}


              <div className="flex gap-3 w-full">

                <button
                  type="button"
                  onClick={() => {
                    if (deleting) {
                      return;
                    }

                    setShowDeleteModal(
                      false
                    );

                    setDeletingClass(
                      null
                    );
                  }}
                  disabled={
                    deleting
                  }
                  className="flex-1 px-5 py-3 rounded-xl border border-[#3a3650] text-gray-300 hover:bg-[#2a2640] transition-colors font-medium text-sm disabled:opacity-50"
                >
                  Cancel
                </button>


                <button
                  type="button"
                  onClick={
                    confirmDelete
                  }
                  disabled={
                    deleting
                  }
                  className="flex-1 px-5 py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold hover:opacity-90 transition-opacity text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {deleting
                    ? "Deleting..."
                    : "Delete"}
                </button>

              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
