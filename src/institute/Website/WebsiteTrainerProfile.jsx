

import React, { useEffect, useMemo, useState } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaArrowRight,
  FaBriefcase,
  FaCheckCircle,
  FaComment,
  FaGraduationCap,
  FaPlay,
  FaStar,
  FaUsers,
} from "react-icons/fa";
import { getTrainerById, getTrainerClasses } from "../../services/trainerService";

const BLUE = "#079BFF";
const CYAN = "#39D8FF";
const WHITE = "#F8FAFC";
const MUTED = "#A9BCD1";

const firstValue = (...values) => values.find((v) => v !== undefined && v !== null && String(v).trim() !== "");
const number = (v) => Number.isFinite(Number(v)) ? Number(v) : 0;
const fmt = (v) => number(v).toLocaleString();
const fontFamily = (font) => font ? `'${font}', Inter, sans-serif` : "Inter, Arial, sans-serif";

const trainerNameOf = (t) => firstValue(t?.full_name, t?.fullName, t?.name, t?.trainer_name, t?.trainerName, "Professional Trainer");
const trainerImageOf = (t) => firstValue(t?.profile_image, t?.profileImage, t?.image, t?.image_url, t?.imageUrl, t?.photo);
const specialtyOf = (t) => firstValue(t?.specialty, t?.specialization, t?.designation, t?.role, "Expert Trainer");
const categoryOf = (t) => firstValue(t?.category_name, t?.categoryName, t?.category, t?.category_name_text);
const subcategoryOf = (t) => firstValue(t?.subcategory_name, t?.subcategoryName, t?.subcategory, t?.sub_category, t?.subcategories, t?.specialization, t?.specialty);
const aboutOf = (t) => firstValue(t?.bio, t?.description, t?.about, t?.about_trainer, t?.aboutTrainer, "Trainer information is not available.");
const classTitle = (c) => firstValue(c?.title, c?.name, c?.class_name, c?.className, "Class");
const classImage = (c) => firstValue(c?.image, c?.image_url, c?.imageUrl, c?.banner_image, c?.bannerImage);
const classDescription = (c) => firstValue(c?.description, c?.about, c?.short_description, c?.shortDescription, "Explore this class and learn with your trainer.");
const classDuration = (c) => firstValue(c?.duration, c?.duration_text, c?.durationText);
const classLevel = (c) => firstValue(c?.level, c?.class_level, c?.classLevel, c?.difficulty);
const classDays = (c) => firstValue(c?.available_days, c?.availableDays, c?.days, c?.schedule_days);
const normalizeCertifications = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value.map((item) => typeof item === "string" ? item.trim() : firstValue(item?.name, item?.title, item?.certificate, item?.certification)).filter(Boolean);
  return String(value).split(",").map((x) => x.trim()).filter(Boolean);
};

function SectionHeading({ icon, children }) {
  return <div className="mb-5 flex items-center gap-3"><span className="text-xl" style={{ color: CYAN }}>{icon}</span><h2 className="text-xl font-bold sm:text-2xl" style={{ color: WHITE }}>{children}</h2></div>;
}

function Stat({ icon, value, label, gold = false }) {
  return <div className="flex min-w-0 items-center gap-3 border-r border-white/10 px-3 py-2 last:border-r-0 sm:px-4"><span className="shrink-0 text-xl sm:text-2xl" style={{ color: gold ? "#FFC247" : BLUE }}>{icon}</span><div className="min-w-0"><div className="text-lg font-bold sm:text-xl" style={{ color: WHITE }}>{value}</div><div className="mt-0.5 text-xs sm:text-sm" style={{ color: MUTED }}>{label}</div></div></div>;
}

function ClassCard({ item, branding }) {
  const id = item?.id ?? item?.class_id ?? item?.classId;
  const title = classTitle(item);
  const image = classImage(item);
  const details = [classDuration(item), classLevel(item), classDays(item)].filter(Boolean);
  return <article className="group flex h-full flex-col overflow-hidden border border-sky-500/50 bg-black transition duration-300 hover:-translate-y-1 hover:border-cyan-300" style={{ borderRadius: 14 }}>
    <div className="relative h-48 overflow-hidden bg-black sm:h-52">
      {image ? <img src={image} alt={title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" onError={(e) => { e.currentTarget.style.display = "none"; }} /> : <div className="flex h-full items-center justify-center"><FaGraduationCap className="text-5xl text-sky-400" /></div>}
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black to-transparent" />
      {classLevel(item) && <span className="absolute left-3 top-3 rounded-full bg-sky-500 px-3 py-1 text-xs font-semibold text-white">{classLevel(item)}</span>}
    </div>
    <div className="flex flex-1 flex-col p-4">
      <h3 className="line-clamp-2 text-lg font-bold" style={{ color: WHITE }}>{title}</h3>
      <p className="mt-2 line-clamp-3 flex-1 text-sm leading-6" style={{ color: MUTED }}>{classDescription(item)}</p>
      {details.length > 0 && <div className="mt-4 space-y-2 text-sm" style={{ color: MUTED }}>{classDuration(item) && <p><FaBriefcase className="mr-2 inline text-sky-400" />{classDuration(item)}</p>}{classLevel(item) && <p><FaCheckCircle className="mr-2 inline text-sky-400" />{classLevel(item)}</p>}{classDays(item) && <p><FaGraduationCap className="mr-2 inline text-sky-400" />{Array.isArray(classDays(item)) ? classDays(item).join(", ") : classDays(item)}</p>}</div>}
      <Link to={id ? `/institute/website/preview/classes/${id}` : "/institute/website/preview/classes"} className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg border border-sky-500 px-4 py-3 text-sm font-semibold text-cyan-300 transition hover:bg-sky-500 hover:text-white">View Class Details <FaArrowRight /></Link>
    </div>
  </article>;
}

export default function WebsiteTrainerProfile() {
  const { trainerId } = useParams();
  const context = useOutletContext() || {};
  const branding = useMemo(() => context?.branding || context?.websiteBranding || context?.brand || {}, [context?.branding, context?.websiteBranding, context?.brand]);
  const [trainer, setTrainer] = useState(null);
  const [trainerClasses, setTrainerClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showAllCerts, setShowAllCerts] = useState(false);

  useEffect(() => {
    let active = true;
    const load = async () => {
      if (!trainerId) { setTrainer(null); setTrainerClasses([]); setError(true); setLoading(false); return; }
      setLoading(true); setError(false);
      try {
        const data = await getTrainerById(trainerId);
        if (!active) return;
        setTrainer(data || null);
        try {
          const classes = await getTrainerClasses(trainerId);
          if (active) setTrainerClasses(Array.isArray(classes) ? classes : []);
        } catch (e) { console.error("Failed to load trainer classes:", e); if (active) setTrainerClasses([]); }
      } catch (e) { console.error("Failed to load trainer profile:", e); if (active) { setTrainer(null); setTrainerClasses([]); setError(true); } }
      finally { if (active) setLoading(false); }
    };
    load();
    return () => { active = false; };
  }, [trainerId]);

  const name = trainerNameOf(trainer);
  const image = trainerImageOf(trainer);
  const specialty = specialtyOf(trainer);
  const category = categoryOf(trainer);
  const subcategory = subcategoryOf(trainer);
  const about = aboutOf(trainer);
  const rating = number(firstValue(trainer?.rating, trainer?.average_rating, trainer?.averageRating, 0));
  const reviews = number(firstValue(trainer?.total_reviews, trainer?.totalReviews, trainer?.reviews_count, trainer?.reviewsCount, 0));
  const students = number(firstValue(trainer?.total_students, trainer?.totalStudents, trainer?.students_count, trainer?.studentsCount, 0));
  const experience = number(firstValue(trainer?.experience_years, trainer?.experienceYears, trainer?.years_experience, trainer?.yearsExperience, 0));
  const certifications = normalizeCertifications(trainer?.certifications);
  const initials = name.trim().split(/\s+/).map((w) => w[0]?.toUpperCase() || "").slice(0, 2).join("");
  const bodyFont = fontFamily(firstValue(branding?.fontBody, branding?.font_body, "Inter"));
  const headingFont = fontFamily(firstValue(branding?.fontHeading, branding?.font_heading, "Inter"));

  if (loading) return <main className="flex min-h-screen items-center justify-center bg-black text-white" style={{ fontFamily: bodyFont }}><div className="text-center"><div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-sky-900 border-t-cyan-300" /><p className="mt-4 text-sm text-slate-300">Loading trainer profile...</p></div></main>;
  if (error || !trainer) return <main className="flex min-h-screen items-center justify-center bg-black px-5 text-center" style={{ fontFamily: bodyFont }}><div><h1 className="text-3xl font-bold text-white">Trainer Not Found</h1><p className="mt-3 text-slate-400">We could not load the requested trainer profile.</p><Link to="/institute/website/preview/trainers" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-sky-500 px-5 py-3 font-semibold text-white"><FaArrowLeft /> Back to Trainers</Link></div></main>;

  return <main className="min-h-screen w-full overflow-hidden bg-black pb-16 text-white" style={{ background: "#000000", color: WHITE, fontFamily: bodyFont }}>
    <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
      <Link to="/institute/website/preview/trainers" className="inline-flex items-center gap-2 text-sm text-slate-300 transition hover:text-cyan-300"><FaArrowLeft /> Trainers <span className="text-slate-600">/</span> <span className="text-white">Trainer Profile</span></Link>

      {/* Profile hero */}
      <section className="relative mt-6 grid gap-7 overflow-hidden border-b border-sky-900/70 pb-8 pt-2 md:grid-cols-[280px_minmax(0,1fr)] md:gap-8 lg:grid-cols-[300px_minmax(0,1fr)]">
        <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="relative mx-auto w-full max-w-[300px] md:mx-0">
          <div className="aspect-[4/5] overflow-hidden rounded-xl border border-sky-500 shadow-[0_0_28px_rgba(0,140,255,0.18)] bg-black">
            {image ? <img src={image} alt={name} className="h-full w-full object-cover" onError={(e) => { e.currentTarget.style.display = "none"; }} /> : <div className="flex h-full items-center justify-center text-5xl font-black text-cyan-300">{initials}</div>}
          </div>
          {firstValue(trainer?.intro_video, trainer?.introVideo, trainer?.video_url, trainer?.videoUrl) && <a href={firstValue(trainer?.intro_video, trainer?.introVideo, trainer?.video_url, trainer?.videoUrl)} target="_blank" rel="noreferrer" className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-lg border border-sky-400 bg-black/85 px-3 py-2 text-sm font-medium"><FaPlay className="text-cyan-300" /> Watch Introduction</a>}
        </div>

        <div className="relative flex min-w-0 flex-col justify-center py-2">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-sky-500/40 bg-sky-500/10 px-3 py-1.5 text-xs font-semibold text-cyan-200"><FaCheckCircle className="text-cyan-300" /> Trainer Profile</div>
          <h1 className="mt-4 break-words text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl" style={{ fontFamily: headingFont }}>{name}</h1>
          <p className="mt-2 text-base sm:text-lg" style={{ color: "#B8D7F7" }}>{specialty}</p>
          <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
            {category && <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/60 px-3 py-2"><span className="text-violet-300">Category</span><span>{category}</span></span>}
            {subcategory && <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/60 px-3 py-2"><span className="text-cyan-300">Subcategory</span><span>{Array.isArray(subcategory) ? subcategory.join(", ") : subcategory}</span></span>}
          </div>
          <div className="mt-6 grid grid-cols-2 gap-y-4 border-y border-white/10 py-4 sm:grid-cols-4 sm:gap-y-0">
            <Stat icon={<FaUsers />} value={`${fmt(students)}${students >= 1000 ? "+" : ""}`} label="Students" />
            <Stat icon={<FaStar />} value={rating > 0 ? rating.toFixed(1) : "0.0"} label="Rating" gold />
            <Stat icon={<FaComment />} value={fmt(reviews)} label="Reviews" />
            <Stat icon={<FaBriefcase />} value={`${fmt(experience)}${experience ? "+" : ""}`} label="Years Experience" />
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#trainer-classes" className="inline-flex items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-3 text-sm font-bold text-white shadow-[0_0_24px_rgba(0,140,255,0.25)] transition hover:brightness-110">View Classes <FaArrowRight /></a>
            {firstValue(trainer?.contact_link, trainer?.contactLink, trainer?.phone, trainer?.email) && <a href={firstValue(trainer?.contact_link, trainer?.contactLink, trainer?.phone ? `tel:${trainer.phone}` : null, trainer?.email ? `mailto:${trainer.email}` : null)} className="inline-flex items-center justify-center gap-2 rounded-lg border border-sky-500/70 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-500/10"><FaComment /> Message Trainer</a>}
          </div>
        </div>
      </section>

      {/* About and certifications */}
      <section className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(300px,0.9fr)]">
        <div className="min-w-0 py-2">
          <SectionHeading icon={<FaUsers />}>About the Trainer</SectionHeading>
          <p className="max-w-4xl whitespace-pre-line text-sm leading-7 sm:text-base" style={{ color: "#C1CEDD" }}>{about}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {["Personalized Guidance", "Traditional & Modern Approach", "Regular Practice Opportunities"].map((item) => <div key={item} className="flex items-center gap-3 border-l-2 border-sky-500/70 py-2 pl-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-sky-500/60 text-cyan-300"><FaCheckCircle /></span><span className="text-sm text-slate-200">{item}</span></div>)}
          </div>
        </div>
        <div className="min-w-0 py-2">
          <div className="mb-5 flex items-center justify-between gap-3"><SectionHeading icon={<FaGraduationCap />}>Certifications</SectionHeading>{certifications.length > 3 && <button type="button" onClick={() => setShowAllCerts((v) => !v)} className="shrink-0 text-sm font-semibold text-cyan-300 hover:text-white">{showAllCerts ? "Show Less" : "View All"}</button>}</div>
          {certifications.length ? <ul className="divide-y divide-sky-900/70">{certifications.slice(0, showAllCerts ? certifications.length : 4).map((cert, i) => <li key={`${cert}-${i}`} className="flex items-start gap-3 py-3"><span className="mt-0.5 text-lg text-cyan-300"><FaCheckCircle /></span><span className="text-sm leading-6 text-slate-200">{cert}</span></li>)}</ul> : <p className="text-sm text-slate-400">No certifications listed.</p>}
        </div>
      </section>

      {/* Classes */}
      <section id="trainer-classes" className="mt-10 scroll-mt-6">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3"><div><SectionHeading icon={<FaGraduationCap />}>Classes by {name}</SectionHeading><p className="-mt-2 text-sm text-slate-400">Explore classes associated with this trainer.</p></div>{trainerClasses.length > 0 && <span className="text-sm text-cyan-300">{trainerClasses.length} {trainerClasses.length === 1 ? "class" : "classes"}</span>}</div>
        {trainerClasses.length ? <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">{trainerClasses.map((item, index) => <ClassCard key={item?.id || item?.class_id || `${classTitle(item)}-${index}`} item={item} branding={branding} />)}</div> : <div className=" py-10 text-center"><FaGraduationCap className="mx-auto text-3xl text-sky-400" /><p className="mt-3 font-semibold text-white">No classes found</p><p className="mt-1 text-sm text-slate-400">No classes are currently associated with this trainer.</p></div>}
      </section>

 
    </div>
  </main>;
}
