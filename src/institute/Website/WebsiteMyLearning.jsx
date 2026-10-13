

import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import {
  FaBookOpen,
  FaCalendarAlt,
  FaCheckCircle,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaClock,
  FaPlay,
  FaSearch,
  FaSyncAlt,
  FaUser,
  FaVideo,
} from "react-icons/fa";
import API from "../../services/api";

const LMS_BASE = "/institute/website/preview";
const PAGE_SIZE = 8;

const getArray = (response) => {
  const data = response?.data;
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.data?.courses)) return data.data.courses;
  if (Array.isArray(data?.courses)) return data.courses;
  if (Array.isArray(data?.data?.classes)) return data.data.classes;
  if (Array.isArray(data?.classes)) return data.classes;
  if (Array.isArray(data?.items)) return data.items;
  if (Array.isArray(data?.data?.items)) return data.data.items;
  return [];
};

const first = (...values) => values.find((value) => value !== undefined && value !== null && String(value).trim() !== "");
const classId = (item) => first(item?.class_id, item?.classId, item?.course_id, item?.courseId, item?.class?.id, item?.course?.id, item?.class_details?.id, item?.id, null);
const className = (item) => first(item?.class_title, item?.class_name, item?.course_title, item?.course_name, item?.class?.title, item?.class?.name, item?.course?.title, item?.course?.name, item?.class_details?.title, item?.class_details?.name, item?.title, item?.name, "Untitled Class");
const classImage = (item) => first(item?.class_image, item?.classImage, item?.class_image_url, item?.classImageUrl, item?.course_image, item?.courseImage, item?.course_image_url, item?.image, item?.image_url, item?.thumbnail, item?.thumbnail_url, item?.class?.image, item?.class?.image_url, item?.course?.image, item?.class_details?.image, "");
const classMode = (item) => String(first(item?.mode, item?.class_mode, item?.learning_mode, item?.delivery_mode, item?.session_mode, item?.class_type, item?.class?.mode, item?.class?.class_mode, item?.course?.mode, item?.class_details?.mode, "") || "").trim().toUpperCase();
const category = (item) => first(item?.category_name, item?.categoryName, item?.category?.name, item?.category?.title, item?.class?.category?.name, item?.class_details?.category?.name, "");
const subcategory = (item) => first(item?.subcategory_name, item?.subcategoryName, item?.subcategory?.name, item?.subcategory?.title, item?.class?.subcategory?.name, item?.class_details?.subcategory?.name, "");
const trainerName = (item) => {
  const trainer = item?.trainer || item?.trainer_details || item?.class?.trainer || item?.class_details?.trainer || item?.course?.trainer;
  return first(item?.trainer_name, item?.trainerName, trainer?.name, trainer?.full_name, trainer?.fullName, [trainer?.first_name, trainer?.last_name].filter(Boolean).join(" "), "Trainer");
};
const trainerImage = (item) => {
  const trainer = item?.trainer || item?.trainer_details || item?.class?.trainer || item?.class_details?.trainer || item?.course?.trainer;
  return first(item?.trainer_image, item?.trainerImage, item?.trainer_image_url, trainer?.image, trainer?.image_url, trainer?.profile_image, trainer?.profileImage, trainer?.avatar, "");
};
const duration = (item) => first(item?.duration, item?.course_duration, item?.duration_weeks, item?.durationWeeks, item?.class?.duration, item?.class_details?.duration, item?.course?.duration, "Flexible");
const level = (item) => first(item?.level, item?.difficulty, item?.class_level, item?.classLevel, item?.class?.level, item?.class_details?.level, "BEGINNER");
const startDate = (item) => first(item?.start_date, item?.startDate, item?.class_start_date, item?.course_start_date, item?.class?.start_date, item?.class_details?.start_date, "");
const startTime = (item) => first(item?.start_time, item?.startTime, item?.class_start_time, item?.classStartTime, item?.class?.start_time, item?.class_details?.start_time, "");
const price = (item) => first(item?.price, item?.class_price, item?.course_price, item?.amount, null);
const lessonsCount = (item) => {
  const count = first(item?.total_lessons, item?.lesson_count, item?.lessons_count, item?.class?.total_lessons, item?.class?.lesson_count, item?.class_details?.total_lessons, null);
  if (count !== null) return Number(count) || 0;
  const lessons = item?.lessons || item?.class?.lessons || item?.class_details?.lessons;
  return Array.isArray(lessons) ? lessons.length : 0;
};
const formatDate = (value) => {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
};
const resolveImage = (value) => {
  if (!value) return "";
  const url = String(value).trim();
  if (/^(https?:|data:|blob:)/i.test(url)) return url;
  try {
    const base = API?.defaults?.baseURL || window.location.origin;
    const origin = new URL(base, window.location.origin).origin;
    return url.startsWith("/") ? `${origin}${url}` : `${origin}/${url}`;
  } catch {
    return url;
  }
};

async function fetchBookedClasses() {
  const response = await API.get("/bookings/my-bookings");
  const bookings = getArray(response);
  const activeBookings = bookings.filter((booking) => {
    const status = String(first(booking?.status, booking?.booking_status, "")).toUpperCase();
    const paymentStatus = String(first(booking?.payment_status, booking?.paymentStatus, "")).toUpperCase();
    return ["CONFIRMED", "ACTIVE"].includes(status) && (!paymentStatus || paymentStatus === "PAID");
  });
  const normalized = activeBookings.map((booking) => {
    const data = booking?.class || booking?.course || booking?.class_details || booking?.course_details || {};
    const id = first(booking?.class_id, booking?.classId, booking?.course_id, booking?.courseId, data?.id, null);
    if (id === null) return null;
    const image = first(data?.image, data?.image_url, booking?.class_image, booking?.class_image_url, booking?.course_image, booking?.course_image_url, null);
    return {
      ...data,
      id: Number(id),
      class_id: Number(id),
      title: first(data?.title, data?.name, booking?.class_title, booking?.class_name, booking?.course_title, booking?.course_name, "Untitled Class"),
      class_image: image,
      image,
      mode: first(data?.mode, booking?.mode, booking?.class_mode, ""),
      trainer_id: first(data?.trainer_id, booking?.trainer_id, null),
      trainer_name: first(data?.trainer_name, booking?.trainer_name, "Trainer"),
      trainer_image: first(data?.trainer_image, booking?.trainer_image, null),
      enrollmentId: first(booking?.id, booking?.booking_id, null),
      bookingStatus: first(booking?.status, booking?.booking_status, null),
      paymentStatus: first(booking?.payment_status, booking?.paymentStatus, null),
      enrolledOn: first(booking?.created_at, booking?.booked_at, null),
      booking,
    };
  }).filter(Boolean);
  return [...new Map(normalized.map((item) => [String(item.id), item])).values()];
}

function Metric({ icon, label, value, accent = "blue" }) {
  const accents = {
    blue: "border-blue-400/20 bg-blue-500/10 text-blue-300",
    cyan: "border-cyan-400/20 bg-cyan-500/10 text-cyan-300",
    green: "border-emerald-400/20 bg-emerald-500/10 text-emerald-300",
  };
  return <div className="rounded-2xl border border-white/[0.08] bg-[#0B111B] p-4 sm:p-5"><div className="flex items-center gap-3"><div className={`flex h-11 w-11 items-center justify-center rounded-xl border ${accents[accent]}`}>{icon}</div><div><p className="text-xs text-white/50">{label}</p><p className="mt-1 text-2xl font-bold text-white">{value}</p></div></div></div>;
}

function ClassCard({ course, onOpen }) {
  const id = classId(course);
  const mode = classMode(course);
  const online = mode === "ONLINE";
  const image = resolveImage(classImage(course));
  const title = className(course);
  const trainer = trainerName(course);
  const avatar = resolveImage(trainerImage(course));
  const lessons = lessonsCount(course);
  return (
    <article onClick={() => onOpen(course)} onKeyDown={(event) => event.key === "Enter" && onOpen(course)} role="button" tabIndex={0} className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0B111B] transition duration-300 hover:-translate-y-1 hover:border-blue-400/40 hover:shadow-xl hover:shadow-blue-950/20">
      <div className="relative h-48 overflow-hidden bg-[#0A1422]">
        {image ? <img src={image} alt={title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" onError={(event) => { event.currentTarget.style.display = "none"; }} /> : <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#102747] to-[#080D16]"><FaBookOpen className="text-5xl text-blue-300/50" /></div>}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
        <span className={`absolute left-4 top-4 rounded-full px-3 py-1.5 text-[10px] font-bold tracking-wider ${online ? "bg-emerald-500 text-white" : "bg-amber-500 text-black"}`}>{online ? "ONLINE" : mode === "OFFLINE" ? "OFFLINE" : "CLASS"}</span>
        <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full border border-emerald-300/20 bg-emerald-500/90 px-3 py-1.5 text-[10px] font-bold text-white"><FaCheckCircle /> ENROLLED</span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="min-h-[3.25rem] text-lg font-bold leading-6 text-white">{title}</h3>
        {(category(course) || subcategory(course)) && <div className="mt-3 flex flex-wrap gap-2">{category(course) && <span className="rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-xs text-blue-200">{category(course)}</span>}{subcategory(course) && <span className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-200">{subcategory(course)}</span>}</div>}
        <div className="mt-4 flex items-center gap-3 border-b border-white/[0.07] pb-4">{avatar ? <img src={avatar} alt={trainer} className="h-10 w-10 rounded-full border border-white/10 object-cover" /> : <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/15 text-blue-200"><FaUser /></div>}<div className="min-w-0"><p className="text-[11px] text-white/45">Trainer</p><p className="truncate text-sm font-semibold text-white/90">{trainer}</p></div></div>
        <div className="mt-4 grid grid-cols-2 gap-3 text-xs"><div className="rounded-xl border border-white/[0.06] bg-black/20 p-3"><p className="flex items-center gap-2 text-white/45"><FaBookOpen className="text-blue-300" /> Lessons</p><p className="mt-2 font-semibold text-white">{lessons || "N/A"}</p></div><div className="rounded-xl border border-white/[0.06] bg-black/20 p-3"><p className="flex items-center gap-2 text-white/45"><FaClock className="text-blue-300" /> Duration</p><p className="mt-2 font-semibold text-white">{duration(course)}</p></div><div className="rounded-xl border border-white/[0.06] bg-black/20 p-3"><p className="flex items-center gap-2 text-white/45"><FaCalendarAlt className="text-blue-300" /> Start date</p><p className="mt-2 font-semibold text-white">{formatDate(startDate(course)) || "To be announced"}</p></div><div className="rounded-xl border border-white/[0.06] bg-black/20 p-3"><p className="flex items-center gap-2 text-white/45"><FaCheckCircle className="text-blue-300" /> Level</p><p className="mt-2 font-semibold text-white">{level(course)}</p></div></div>
        {price(course) !== null && <p className="mt-4 text-sm font-bold text-blue-200">₹{price(course)}</p>}
        <button type="button" onClick={(event) => { event.stopPropagation(); onOpen(course); }} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-3 text-sm font-bold text-white transition hover:brightness-110"><FaPlay /> {online ? "Join Live Class" : mode === "OFFLINE" ? "View Recordings" : "Continue Learning"}</button>
      </div>
      {!id && <p className="px-5 pb-3 text-xs text-amber-300">Class ID is missing from this booking.</p>}
    </article>
  );
}

export default function WebsiteMyLearning() {
  const navigate = useNavigate();
  const location = useLocation();
  const context = useOutletContext() || {};
  const [classes, setClasses] = useState([]);
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("ALL");
  const [activeTab, setActiveTab] = useState("ALL");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const loadData = useCallback(async (refresh = false) => {
    try {
      if (refresh) setRefreshing(true); else setLoading(true);
      setError("");
      const rows = await fetchBookedClasses();
      setClasses(rows);
    } catch (err) {
      console.error("WEBSITE MY LEARNING ERROR:", err?.response?.data || err);
      setClasses([]);
      setError(err?.response?.data?.message || err?.response?.data?.error || err?.message || "Failed to load your booked classes.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const onlineClasses = useMemo(() => classes.filter((item) => classMode(item) === "ONLINE"), [classes]);
  const offlineClasses = useMemo(() => classes.filter((item) => classMode(item) === "OFFLINE"), [classes]);
  const options = useMemo(() => classes.map((item) => ({ id: classId(item), name: className(item) })).filter((item) => item.id !== null && item.id !== undefined), [classes]);

  const filteredClasses = useMemo(() => {
    const query = search.trim().toLowerCase();
    return classes.filter((item) => {
      const id = classId(item);
      const status = String(first(item?.progress_status, item?.status, item?.learning_status, "NOT_STARTED")).toUpperCase().replaceAll(" ", "_");
      const matchesFilter = classFilter === "ALL" || String(id) === String(classFilter);
      const matchesTab = activeTab === "ALL" || (activeTab === "ONLINE" && classMode(item) === "ONLINE") || (activeTab === "OFFLINE" && classMode(item) === "OFFLINE") || (activeTab === "IN_PROGRESS" && ["IN_PROGRESS", "STARTED"].includes(status)) || (activeTab === "COMPLETED" && status === "COMPLETED");
      const searchText = [className(item), trainerName(item), category(item), subcategory(item), classMode(item)].join(" ").toLowerCase();
      return matchesFilter && matchesTab && (!query || searchText.includes(query));
    });
  }, [classes, search, classFilter, activeTab]);

  const totalPages = Math.max(1, Math.ceil(filteredClasses.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visibleClasses = filteredClasses.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  useEffect(() => { setPage(1); }, [search, classFilter, activeTab]);

  const openClass = (course) => {
    const id = classId(course);
    if (id === null || id === undefined || id === "") {
      console.error("Class ID is missing:", course);
      return;
    }
    const mode = classMode(course);
    if (mode === "OFFLINE") navigate(`${LMS_BASE}/recordings`, { state: { classId: id, className: className(course) } });
    else if (mode === "ONLINE") navigate(`${LMS_BASE}/live-sessions`, { state: { classId: id, className: className(course) } });
    else navigate(`${LMS_BASE}/my-learning/${id}`, { state: { course, from: location.pathname } });
  };

  const tabs = [
    { key: "ALL", label: "All Classes", count: classes.length },
    { key: "ONLINE", label: "Live Classes", count: onlineClasses.length },
    { key: "OFFLINE", label: "Recording Classes", count: offlineClasses.length },
  ];

  if (loading) return <div className="min-h-screen bg-[#05080D] px-5 py-16 text-white"><div className="mx-auto flex max-w-6xl items-center justify-center gap-3 rounded-2xl border border-white/10 bg-[#0B111B] p-12"><FaSyncAlt className="animate-spin text-xl text-blue-400" /><span className="text-sm text-white/70">Loading your learning...</span></div></div>;

  return (
    <div className="min-h-screen bg-[#05080D] text-white">
      <main className="mx-auto max-w-[1600px] px-4 py-7 sm:px-6 xl:px-8">
        <header className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div><div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1.5 text-xs font-semibold text-blue-200"><FaBookOpen /> STUDENT LEARNING SPACE</div><h1 className="text-3xl font-bold tracking-tight sm:text-4xl">My <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Learning</span></h1><p className="mt-3 max-w-2xl text-sm leading-6 text-white/55 sm:text-base">Continue your classes, access live sessions, and revisit your learning journey.</p><p className="mt-2 text-xs text-white/40">{classes.length} enrolled class{classes.length === 1 ? "" : "es"} available</p></div>
          <button type="button" onClick={() => loadData(true)} disabled={refreshing} className="inline-flex h-11 items-center justify-center gap-2 self-start rounded-xl border border-white/10 bg-[#0B111B] px-4 text-sm font-semibold text-white/80 transition hover:border-blue-400/40 hover:text-white disabled:opacity-50 lg:self-auto"><FaSyncAlt className={refreshing ? "animate-spin" : ""} /> Refresh classes</button>
        </header>

        <section className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-3"><Metric icon={<FaBookOpen />} label="Total enrolled" value={classes.length} /><Metric icon={<FaVideo />} label="Live classes" value={onlineClasses.length} accent="cyan" /><Metric icon={<FaPlay />} label="Recording classes" value={offlineClasses.length} accent="green" /></section>

        <section className="rounded-2xl border border-white/[0.08] bg-[#0B111B] p-4 sm:p-5">
          <div className="mb-4 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex gap-2 overflow-x-auto pb-1">{tabs.map((tab) => <button key={tab.key} type="button" onClick={() => setActiveTab(tab.key)} className={`shrink-0 rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${activeTab === tab.key ? "border-blue-400/40 bg-blue-500/15 text-blue-200" : "border-white/[0.08] bg-black/20 text-white/55 hover:text-white"}`}>{tab.label}<span className={`ml-2 rounded-full px-2 py-0.5 text-xs ${activeTab === tab.key ? "bg-blue-400/15 text-blue-100" : "bg-white/[0.06] text-white/50"}`}>{tab.count}</span></button>)}</div>
            <div className="grid w-full gap-3 sm:grid-cols-[minmax(220px,1fr)_220px] xl:w-[510px]">
              <label className="relative block"><FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search classes, trainer..." className="h-11 w-full rounded-xl border border-white/10 bg-[#060B12] pl-11 pr-4 text-sm text-white outline-none placeholder:text-white/35 focus:border-blue-400/50" /></label>
              <label className="relative block"><select value={classFilter} onChange={(event) => setClassFilter(event.target.value)} className="h-11 w-full appearance-none rounded-xl border border-white/10 bg-[#060B12] px-4 pr-10 text-sm text-white outline-none focus:border-blue-400/50"><option value="ALL" className="bg-[#0B111B]">All classes</option>{options.map((option) => <option key={option.id} value={option.id} className="bg-[#0B111B]">{option.name}</option>)}</select><FaChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-white/40" /></label>
            </div>
          </div>

          {error && <div className="mb-5 flex flex-col gap-3 rounded-xl border border-rose-400/20 bg-rose-500/[0.07] p-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-semibold text-rose-200">Unable to load your classes</p><p className="mt-1 text-sm text-rose-100/60">{error}</p></div><button type="button" onClick={() => loadData(true)} className="rounded-lg border border-rose-300/20 px-4 py-2 text-sm font-semibold text-rose-100 hover:bg-rose-500/10">Try again</button></div>}

          {visibleClasses.length ? <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">{visibleClasses.map((course, index) => <ClassCard key={classId(course) ?? index} course={course} onOpen={openClass} />)}</div> : <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-black/10 px-6 text-center"><div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10 text-2xl text-blue-300"><FaBookOpen /></div><h2 className="mt-4 text-lg font-bold">{error ? "No classes to show" : "No booked classes found"}</h2><p className="mt-2 max-w-md text-sm leading-6 text-white/45">{search || classFilter !== "ALL" || activeTab !== "ALL" ? "Try changing your search or filters to find your class." : "Your confirmed and paid classes will appear here once they are available."}</p>{(search || classFilter !== "ALL" || activeTab !== "ALL") && <button type="button" onClick={() => { setSearch(""); setClassFilter("ALL"); setActiveTab("ALL"); }} className="mt-4 rounded-xl border border-blue-400/30 px-4 py-2.5 text-sm font-semibold text-blue-200 hover:bg-blue-500/10">Clear filters</button>}</div>}

          {filteredClasses.length > PAGE_SIZE && <div className="mt-7 flex flex-wrap items-center justify-center gap-2"><button type="button" disabled={currentPage === 1} onClick={() => setPage((value) => Math.max(1, value - 1))} className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-black/20 text-white/70 hover:border-blue-400/40 disabled:opacity-30"><FaChevronLeft /></button>{Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => <button key={number} type="button" onClick={() => setPage(number)} className={`h-10 min-w-10 rounded-xl border px-3 text-sm font-semibold ${currentPage === number ? "border-blue-400/40 bg-blue-500/15 text-blue-200" : "border-white/10 bg-black/20 text-white/60 hover:text-white"}`}>{number}</button>)}<button type="button" disabled={currentPage === totalPages} onClick={() => setPage((value) => Math.min(totalPages, value + 1))} className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-black/20 text-white/70 hover:border-blue-400/40 disabled:opacity-30"><FaChevronRight /></button></div>}
        </section>
        <p className="mt-5 text-center text-xs text-white/30">Your learning progress and class access depend on your current booking status.</p>
      </main>
    </div>
  );
}
