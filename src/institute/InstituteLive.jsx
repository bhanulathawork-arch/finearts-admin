import { useEffect, useMemo, useState } from "react";
import { getAuth } from "firebase/auth";
import {
  BookOpen,
  Search,
  Video,
  RefreshCw,
} from "lucide-react";
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
   HELPERS
========================================================= */
const getClassType = (item) => {
  return String(
    item?.class_type ??
      item?.classType ??
      item?.type ??
      "LIVE"
  )
    .trim()
    .toUpperCase();
};
const getCategoryName = (item) => {
  return (
    item?.category_name ??
    item?.categoryName ??
    item?.category?.name ??
    item?.category ??
    "General"
  );
};

const getTrainerName = (item) => {
  const name =
    item?.trainer_name ??
    item?.trainerName ??
    item?.trainer?.full_name ??
    item?.trainer?.name ??
    item?.instructor_name ??
    item?.instructorName ??
    item?.instructor?.full_name ??
    item?.instructor?.name;

  return name ? String(name) : "Trainer not assigned";
};
const getImage = (item) => {
  return (
    item?.image ??
    item?.image_url ??
    item?.imageUrl ??
    item?.thumbnail ??
    item?.thumbnail_url ??
    ""
  );
};
const getClassId = (item) => {
  return item?.id ?? item?.class_id;
};
const getClassTitle = (item) => {
  return (
    item?.title ??
    item?.name ??
    "Untitled Class"
  );
};
/* =========================================================
   COMPONENT
========================================================= */
export default function InstituteLive() {
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  /* =======================================================
     FETCH CLASSES
  ======================================================= */
  const fetchClasses = async () => {
    try {
      setLoading(true);
      const response = await API.get(
        "/classes/institute/my-classes",
        await getAuthConfig()
      );
      const allClasses = normalizeClasses(response.data);
      const liveClasses = allClasses.filter(
        (item) => getClassType(item) === "LIVE"
      );
      setClasses(liveClasses);
    } catch (error) {
      console.error(
        "FETCH INSTITUTE LIVE CLASSES ERROR:",
        error
      );
      toast.error(
        error?.response?.data?.message ||
          "Failed to load institute live classes."
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
     SEARCH
  ======================================================= */
  const filteredClasses = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) {
      return classes;
    }
    return classes.filter((item) => {
      const title = String(
        getClassTitle(item)
      ).toLowerCase();
      const category = String(
        getCategoryName(item)
      ).toLowerCase();
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
    if (!classId) {
      toast.error("Class ID not found.");
      return;
    }
    navigate(`/institute/lms/${classId}`);
  };
  /* =======================================================
     RENDER
  ======================================================= */
  return (
    <div className="min-h-screen bg-[#07070b] px-5 py-7 text-white sm:px-7 lg:px-8">
      <div className="mx-auto max-w-[1450px]">
        {/* =================================================
            HEADER
        ================================================= */}
        <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-500 bg-clip-text text-4xl font-extrabold text-transparent sm:text-5xl">
              Live Classes
            </h1>
            <p className="mt-2 text-sm text-white sm:text-base">
              Manage your institute live classes and open their LMS.
            </p>
          </div>
          {/* REFRESH */}
          <button
            type="button"
            onClick={fetchClasses}
            disabled={loading}
            className="
              flex h-11 items-center justify-center gap-2
              rounded-xl border border-white/10
              bg-white/5 px-5
              font-semibold text-gray-200
              transition
              hover:bg-white/10
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <RefreshCw
              size={17}
              className={
                loading ? "animate-spin" : ""
              }
            />
            Refresh
          </button>
        </div>
        {/* =================================================
            SEARCH
        ================================================= */}
        <div className="mb-7 bg-transparent p-0">
          <div className="relative">
            <Search
              size={20}
              className="
                pointer-events-none
                absolute left-4 top-1/2
                -translate-y-1/2
                text-white
              "
            />
            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search live classes..."
              className="
                h-14 w-full rounded-xl
                border border-white/10
                bg-[#15121f]
                pl-12 pr-4
                text-white
                outline-none
                placeholder:text-white
                transition
                focus:border-purple-500/60
                focus:ring-2
                focus:ring-purple-500/10
              "
            />
          </div>
        </div>
        {/* =================================================
            LOADING
        ================================================= */}
        {loading && (
          <div className="rounded-2xl border border-white/10 bg-[#101019] py-20 text-center">
            <RefreshCw
              size={32}
              className="mx-auto mb-4 animate-spin text-blue-400"
            />
            <p className="text-sm text-white">
              Loading live classes...
            </p>
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
                No live classes found
              </h3>
              <p className="mt-2 text-sm text-white">
                {search
                  ? "Try a different search."
                  : "You do not have any institute live classes yet."}
              </p>
            </div>
          )}
        {/* =================================================
            CLASS GRID
        ================================================= */}
        {!loading &&
          filteredClasses.length > 0 && (
            <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredClasses.map((item) => {
                const classId = getClassId(item);
                const title = getClassTitle(item);
                const image = getImage(item);
                const category =
                  getCategoryName(item);
                const trainerName = getTrainerName(item);
                return (
                  <div
                    key={classId}
                    className="
                      flex h-full min-w-0
                      flex-col overflow-hidden
                      rounded-2xl
                      border border-white/10
                      bg-[#111118]
                      shadow-xl
                      transition duration-300
                      hover:-translate-y-1
                      hover:border-blue-500/30
                    "
                  >
                    {/* =====================================
                        SECTION 1 — IMAGE
                    ====================================== */}
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
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-purple-900/40 via-[#191523] to-blue-900/30">
                          <BookOpen
                            size={48}
                            className="text-purple-300/50"
                          />
                        </div>
                      )}
                      {/* LIVE BADGE */}
                      <div
                        className="
                          absolute left-3 top-3
                          rounded-lg
                          border border-blue-400/20
                          bg-black/60
                          px-3 py-1.5
                          text-xs font-bold
                          text-blue-300
                          backdrop-blur
                        "
                      >
                        LIVE
                      </div>
                    </div>
                    {/* =====================================
                        SECTION 2 — CLASS DETAILS
                    ====================================== */}
                    <div className="flex flex-1 flex-col border-t border-white/5 p-5">
                      <h3
                        className="line-clamp-2 text-lg font-bold leading-7 text-white"
                        title={title}
                      >
                        {title}
                      </h3>
                      <div className="mt-5 space-y-3">
                        <div className="flex items-center justify-between gap-4">
                          <p className="shrink-0 text-xs font-semibold uppercase tracking-wider text-white">
                            Category
                          </p>
                          <p
                            className="min-w-0 truncate text-right text-sm font-semibold text-white"
                            title={category}
                          >
                            {category}
                          </p>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <p className="shrink-0 text-xs font-semibold uppercase tracking-wider text-white">
                            Trainer
                          </p>
                          <p className="min-w-0 truncate text-right text-sm font-semibold text-white">
                            {trainerName}
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* =====================================
                        SECTION 3 — OPEN LMS
                    ====================================== */}
                    <div className="border-t border-white/5 p-4">
                      <button
                        type="button"
                        onClick={() => openLMS(item)}
                        className="flex h-11 w-full items-center justify-center gap-2 rounded-xl font-bold text-white transition hover:scale-[1.01] active:scale-[0.99]"
                        style={{
                          background:
                            "linear-gradient(135deg,#9b2cff,#2878ff)",
                        }}
                      >
                        <BookOpen size={18} />
                        Open LMS
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
      </div>
    </div>
  );
}
