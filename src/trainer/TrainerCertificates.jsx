// import { useCallback, useEffect, useMemo, useState } from "react";
// import toast from "react-hot-toast";
// import {
//   Award,
//   RefreshCw,
//   CheckCircle2,
//   CircleX,
//   FileCheck2,
//   Users,
//   Clock3,
//   Search,
//   Send,
//   Eye,
//   X,
//   FileBadge,
// } from "lucide-react";
// import {
//   getCertificateRequests,
//   getIssuedCertificates,
//   submitCertificateRequest,
//   getCertificateStudents,
//   getCertificateClasses,
// } from "../services/certificateService";

// const inputClass =
//   "w-full min-w-0 rounded-lg border border-white/10 bg-[#141416] px-3 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-purple-500 disabled:cursor-not-allowed disabled:opacity-60";
// const norm = (v) => String(v ?? "").toLowerCase();
// const show = (v, fallback = "—") => (v === null || v === undefined || v === "" ? fallback : String(v));
// const dateOnly = (v) => (v ? String(v).slice(0, 10) : "—");

// function itemsFrom(response) {
//   const root = response?.data;
//   if (Array.isArray(root)) return root;
//   if (Array.isArray(root?.data)) return root.data;
//   if (Array.isArray(root?.students)) return root.students;
//   if (Array.isArray(root?.classes)) return root.classes;
//   if (Array.isArray(root?.requests)) return root.requests;
//   if (Array.isArray(root?.certificates)) return root.certificates;
//   return [];
// }
// function studentName(s) {
//   return s.full_name || s.name || s.student_name || s.display_name || s.account_name || `Student #${s.id}`;
// }
// function className(c) {
//   return c.title || c.class_name || c.name || `Class #${c.id}`;
// }
// function StatCard({ title, value, subtitle, icon: Icon }) {
//   return <div className="min-w-0 rounded-lg border border-white/10 bg-[#141416] p-4">
//     <div className="flex items-center gap-3">
//       <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-purple-500/15 text-purple-300"><Icon size={24} /></div>
//       <p className="truncate text-base font-semibold text-white">{title}</p>
//     </div>
//     <p className="mt-3 text-3xl font-bold leading-none text-white">{value}</p>
//     <p className="mt-2 text-sm text-gray-400">{subtitle}</p>
//   </div>;
// }
// function StatusBadge({ status }) {
//   const s = norm(status);
//   const cls = s === "issued" ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300" : s === "approved" ? "border-blue-500/30 bg-blue-500/10 text-blue-300" : s === "pending" ? "border-amber-500/30 bg-amber-500/10 text-amber-300" : s === "revoked" || s === "rejected" ? "border-red-500/30 bg-red-500/10 text-red-300" : "border-white/10 bg-white/5 text-gray-300";
//   return <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${cls}`}>{show(status, "Unknown")}</span>;
// }
// function PreviewModal({ record, onClose }) {
//   useEffect(() => {
//     const key = (e) => e.key === "Escape" && onClose();
//     window.addEventListener("keydown", key);
//     return () => window.removeEventListener("keydown", key);
//   }, [onClose]);
//   const student = record.student_name_snapshot || record.student_name || record.student || (record.student_id ? `Student #${record.student_id}` : "Student name");
//   const course = record.course_name_snapshot || record.class_name || record.course || (record.class_id ? `Class #${record.class_id}` : "Course name");
//   return <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/80 p-3 backdrop-blur-sm sm:p-6" role="dialog" aria-modal="true" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
//     <div className="my-auto w-full max-w-5xl overflow-hidden rounded-lg border border-white/10 bg-[#141416] shadow-2xl">
//       <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-6"><div><h2 className="font-bold text-white">Certificate Preview</h2><p className="mt-1 text-sm text-gray-400">Review the student and course details before submitting the request.</p></div><button type="button" onClick={onClose} className="rounded-lg p-2 text-gray-300 hover:bg-white/10" aria-label="Close preview"><X size={21}/></button></div>
//       <div className="bg-[#09090b] p-3 sm:p-7"><div className="relative mx-auto aspect-[1.414/1] w-full max-w-4xl overflow-hidden border-[6px] border-double border-amber-500/70 bg-[#fffaf0] p-3 text-center text-[#352616] sm:border-[8px] sm:p-8"><div className="pointer-events-none absolute inset-2 border border-amber-700/50 sm:inset-3"/><div className="relative flex h-full flex-col items-center justify-center"><div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full border-2 border-amber-700 text-amber-800 sm:mb-4 sm:h-14 sm:w-14"><Award size={27}/></div><p className="text-[8px] font-bold uppercase tracking-[.25em] text-amber-800 sm:text-xs sm:tracking-[.35em]">FineArts Institute Certificate</p><h3 className="mt-2 font-serif text-lg font-bold sm:mt-3 sm:text-4xl">Certificate of Completion</h3><p className="mt-3 text-[10px] italic text-[#6b5a45] sm:mt-5 sm:text-base">This certificate is presented to</p><p className="mt-2 max-w-full break-words font-serif text-lg font-bold text-[#7b4a12] sm:mt-3 sm:text-3xl">{student}</p><p className="mt-2 text-[9px] text-[#6b5a45] sm:mt-3 sm:text-sm">for successfully completing</p><p className="mt-1 max-w-full break-words text-sm font-semibold sm:text-xl">{course}</p><div className="mt-4 flex w-full items-end justify-around gap-3 sm:mt-8"><div className="min-w-0 border-t border-[#9a7b4f] px-2 pt-1 sm:min-w-36 sm:pt-2"><p className="text-[9px] font-semibold sm:text-xs">Course Trainer</p><p className="text-[8px] text-[#6b5a45] sm:text-[10px]">Authorized Requester</p></div><div className="min-w-0 border-t border-[#9a7b4f] px-2 pt-1 sm:min-w-36 sm:pt-2"><p className="text-[9px] font-semibold sm:text-xs">{dateOnly(record.completion_date)}</p><p className="text-[8px] text-[#6b5a45] sm:text-[10px]">Completion Date</p></div></div></div></div><p className="mx-auto mt-3 max-w-4xl text-xs text-gray-400">Preview only. The institute reviews the request and issues the official certificate after approval.</p></div>
//       <div className="flex justify-end border-t border-white/10 px-4 py-3 sm:px-6"><button type="button" onClick={onClose} className="rounded-lg border border-white/15 px-4 py-2.5 text-sm font-semibold text-gray-200 hover:bg-white/10">Close Preview</button></div>
//     </div>
//   </div>;
// }

// export default function TrainerCertificates() {
//   const [requests, setRequests] = useState([]);
//   const [issued, setIssued] = useState([]);
//   const [students, setStudents] = useState([]);
//   const [classes, setClasses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [optionsLoading, setOptionsLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [studentId, setStudentId] = useState("");
//   const [classId, setClassId] = useState("");
//   const [completionDate, setCompletionDate] = useState("");
//   const [activeTab, setActiveTab] = useState("requests");
//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [preview, setPreview] = useState(null);

//   const load = useCallback(async () => {
//     setLoading(true);
//     try {
//       const [reqRes, issuedRes] = await Promise.all([getCertificateRequests(), getIssuedCertificates()]);
//       setRequests(itemsFrom(reqRes));
//       setIssued(itemsFrom(issuedRes));
//     } catch (error) {
//       console.error("Trainer certificates load failed:", error);
//       toast.error(error?.response?.data?.message || "Could not load certificate requests.");
//     } finally { setLoading(false); }
//   }, []);
//   const loadOptions = useCallback(async () => {
//     setOptionsLoading(true);
//     try {
//       const [studentRes, classRes] = await Promise.all([getCertificateStudents(), getCertificateClasses()]);
//       setStudents(itemsFrom(studentRes).filter((x) => x.id != null));
//       setClasses(itemsFrom(classRes).filter((x) => x.id != null));
//     } catch (error) {
//       console.error("Trainer certificate options load failed:", error);
//       toast.error(error?.response?.data?.message || "Could not load students or classes.");
//     } finally { setOptionsLoading(false); }
//   }, []);
//   useEffect(() => { load(); loadOptions(); }, [load, loadOptions]);

//   const pendingCount = requests.filter((x) => norm(x.request_status) === "pending").length;
//   const issuedCount = issued.filter((x) => norm(x.status) === "issued").length;
//   const revokedCount = issued.filter((x) => norm(x.status) === "revoked").length;
//   const filteredRequests = useMemo(() => requests.filter((x) => {
//     const q = search.trim().toLowerCase();
//     const hit = [x.id, x.student_name_snapshot, x.student_name, x.student_id, x.course_name_snapshot, x.class_name, x.class_id, x.request_status].join(" ").toLowerCase().includes(q);
//     return hit && (statusFilter === "all" || norm(x.request_status) === statusFilter);
//   }), [requests, search, statusFilter]);
//   const filteredIssued = useMemo(() => issued.filter((x) => {
//     const q = search.trim().toLowerCase();
//     const hit = [x.certificate_number, x.student_name_snapshot, x.student_name, x.student_id, x.course_name_snapshot, x.class_name, x.class_id, x.status].join(" ").toLowerCase().includes(q);
//     return hit && (statusFilter === "all" || norm(x.status) === statusFilter);
//   }), [issued, search, statusFilter]);

//   const submit = async (event) => {
//     event.preventDefault();
//     if (!studentId || !classId) { toast.error("Select a student and course first."); return; }
//     setSubmitting(true);
//     try {
//       await submitCertificateRequest({ student_id: Number(studentId), class_id: Number(classId), completion_date: completionDate || null });
//       toast.success("Certificate request submitted to the institute.");
//       setStudentId(""); setClassId(""); setCompletionDate(""); setActiveTab("requests");
//       await load();
//     } catch (error) {
//       console.error("Certificate request submission failed:", error);
//       toast.error(error?.response?.data?.message || "Could not submit certificate request.");
//     } finally { setSubmitting(false); }
//   };

//   return <div className="min-h-full space-y-6 bg-[#09090b] p-4 text-white sm:p-6 lg:p-8">
//     <header className="flex flex-wrap items-center justify-between gap-4"><div><h1 className="bg-gradient-to-r from-violet-400 via-purple-400 to-pink-500 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">Certificate Management</h1><p className="mt-1 text-base text-white sm:text-lg">Verify course completion and submit certificate requests.</p></div><button type="button" onClick={() => { load(); loadOptions(); }} className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-[#141416] px-4 py-3 text-sm font-semibold text-white hover:border-purple-500/50"><RefreshCw size={16}/> Refresh</button></header>
//     <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"><StatCard title="My Requests" value={requests.length} subtitle="Submitted to institute" icon={FileBadge}/><StatCard title="Pending Review" value={pendingCount} subtitle="Awaiting institute review" icon={Clock3}/><StatCard title="Certificates Issued" value={issuedCount} subtitle="Active certificates" icon={FileCheck2}/><StatCard title="Revoked" value={revokedCount} subtitle="Revoked certificates" icon={CircleX}/></section>

//     <form onSubmit={submit} className="space-y-4 rounded-lg border border-white/10 bg-[#141416] p-4 sm:p-5"><div><h2 className="text-lg font-bold text-white">Create certificate request</h2><p className="mt-1 text-sm text-gray-400">Choose the student, course, and completion date. The institute must review and issue the official certificate.</p></div><div className="grid grid-cols-1 gap-3 md:grid-cols-4"><select required value={studentId} onChange={(e) => setStudentId(e.target.value)} disabled={optionsLoading} className={inputClass}><option value="">{optionsLoading ? "Loading students..." : students.length ? "Select student" : "No students available"}</option>{students.map((s) => <option key={s.id} value={s.id}>{studentName(s)}</option>)}</select><select required value={classId} onChange={(e) => setClassId(e.target.value)} disabled={optionsLoading} className={inputClass}><option value="">{optionsLoading ? "Loading courses..." : "Select course"}</option>{classes.map((c) => <option key={c.id} value={c.id}>{className(c)}</option>)}</select><input type="date" value={completionDate} onChange={(e) => setCompletionDate(e.target.value)} aria-label="Course completion date" className={inputClass}/><button type="submit" disabled={submitting || optionsLoading || !students.length || !classes.length} className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-pink-500 px-4 py-3 text-sm font-semibold text-white hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"><Send size={16}/>{submitting ? "Submitting..." : "Submit Request"}</button></div>{!optionsLoading && !students.length && <p className="text-sm text-amber-300">No students were returned by the student API. Check the trainer-authorized student endpoint.</p>}{!optionsLoading && !classes.length && <p className="text-sm text-amber-300">No courses were returned by the classes API.</p>}</form>

//     <section className="space-y-4"><div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between"><div className="flex flex-wrap gap-2"><button type="button" onClick={() => { setActiveTab("requests"); setStatusFilter("all"); }} className={`inline-flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold ${activeTab === "requests" ? "bg-gradient-to-r from-violet-600 to-pink-500 text-white" : "border border-white/10 bg-[#141416] text-gray-300 hover:bg-white/5"}`}><Users size={17}/> Certificate Requests ({requests.length})</button><button type="button" onClick={() => { setActiveTab("issued"); setStatusFilter("all"); }} className={`inline-flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold ${activeTab === "issued" ? "bg-gradient-to-r from-violet-600 to-pink-500 text-white" : "border border-white/10 bg-[#141416] text-gray-300 hover:bg-white/5"}`}><FileCheck2 size={17}/> Issued Certificates ({issued.length})</button></div><div className="flex flex-col gap-3 sm:flex-row"><div className="relative min-w-0 flex-1 lg:w-80"><Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"/><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={activeTab === "requests" ? "Search students or courses..." : "Search certificate number..."} className={`${inputClass} pl-10`}/></div><select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className={`${inputClass} sm:w-44`}><option value="all">All Statuses</option><option value="pending">Pending</option><option value="approved">Approved</option><option value="rejected">Rejected</option><option value="issued">Issued</option><option value="revoked">Revoked</option></select></div></div>

//       <div className="overflow-hidden rounded-lg border border-white/10 bg-[#09090b]"><div className="border-b border-white/10 px-4 py-4 sm:px-6"><h2 className="text-lg font-bold text-white">{activeTab === "requests" ? "Certificate Requests" : "Issued Certificates"}</h2><p className="mt-1 text-sm text-gray-400">{activeTab === "requests" ? "Track the review status of certificates requested for your students." : "Certificates issued for your requested courses."}</p></div>{loading ? <div className="p-10 text-center text-gray-400">Loading certificate data...</div> : activeTab === "requests" ? <div className="overflow-x-auto"><table className="w-full min-w-[850px] text-left text-sm"><thead className="bg-[#1c1c1f] text-xs uppercase tracking-wide text-gray-300"><tr>{["#", "Student", "Course", "Completion Date", "Status", "Action"].map((h) => <th key={h} className="px-5 py-4">{h}</th>)}</tr></thead><tbody className="divide-y divide-white/10">{filteredRequests.map((r, i) => <tr key={r.id} className="hover:bg-white/[0.025]"><td className="px-5 py-5 text-gray-400">{i + 1}</td><td className="px-5 py-5"><p className="font-semibold text-white">{show(r.student_name_snapshot || r.student_name, r.student_id ? `Student #${r.student_id}` : "—")}</p><p className="mt-1 text-gray-400">{show(r.student_email)}</p></td><td className="px-5 py-5"><p className="font-semibold text-white">{show(r.course_name_snapshot || r.class_name, r.class_id ? `Class #${r.class_id}` : "—")}</p><p className="mt-1 text-gray-400">{show(r.category_name || r.subcategory_name, "Course")}</p></td><td className="px-5 py-5 text-gray-300">{dateOnly(r.completion_date)}</td><td className="px-5 py-5"><StatusBadge status={r.request_status}/></td><td className="px-5 py-5"><button type="button" onClick={() => setPreview(r)} className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 font-semibold text-white hover:border-purple-500/50 hover:bg-purple-500/10"><Eye size={15}/> Preview</button></td></tr>)}{!filteredRequests.length && <tr><td colSpan={6} className="px-5 py-12 text-center text-gray-400">{requests.length ? "No requests match your search or filter." : "No certificate requests yet."}</td></tr>}</tbody></table></div> : <div className="overflow-x-auto"><table className="w-full min-w-[850px] text-left text-sm"><thead className="bg-[#1c1c1f] text-xs uppercase tracking-wide text-gray-300"><tr>{["#", "Certificate No.", "Student", "Course", "Issue Date", "Status"].map((h) => <th key={h} className="px-5 py-4">{h}</th>)}</tr></thead><tbody className="divide-y divide-white/10">{filteredIssued.map((c, i) => <tr key={c.id || c.certificate_number} className="hover:bg-white/[0.025]"><td className="px-5 py-5 text-gray-400">{i + 1}</td><td className="px-5 py-5 font-semibold text-white">{show(c.certificate_number)}</td><td className="px-5 py-5"><p className="font-semibold text-white">{show(c.student_name_snapshot || c.student_name, c.student_id ? `Student #${c.student_id}` : "—")}</p><p className="mt-1 text-gray-400">{show(c.student_email)}</p></td><td className="px-5 py-5 text-gray-300">{show(c.course_name_snapshot || c.class_name, c.class_id ? `Class #${c.class_id}` : "—")}</td><td className="px-5 py-5 text-gray-300">{dateOnly(c.issued_at || c.issue_date || c.created_at)}</td><td className="px-5 py-5"><StatusBadge status={c.status}/></td></tr>)}{!filteredIssued.length && <tr><td colSpan={6} className="px-5 py-12 text-center text-gray-400">{issued.length ? "No certificates match your search or filter." : "No issued certificates yet."}</td></tr>}</tbody></table></div>}</div>
//       <p className="text-sm text-gray-500">Trainers can submit and track requests. The institute or authorized administrator approves requests and issues the official certificate.</p>
//     </section>
//     {preview && <PreviewModal record={preview} onClose={() => setPreview(null)}/>}
//   </div>;
// }


import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  Award,
  RefreshCw,
  CheckCircle2,
  CircleX,
  FileCheck2,
  Users,
  Clock3,
  Search,
  Eye,
  X,
  FileBadge,
} from "lucide-react";
import {
  getCertificateRequests,
  getIssuedCertificates,
} from "../services/certificateService";

const inputClass =
  "w-full min-w-0 rounded-lg border border-white/10 bg-[#141416] px-3 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-purple-500 disabled:cursor-not-allowed disabled:opacity-60";
const norm = (v) => String(v ?? "").toLowerCase();
const show = (v, fallback = "—") => (v === null || v === undefined || v === "" ? fallback : String(v));
const dateOnly = (v) => (v ? String(v).slice(0, 10) : "—");

function itemsFrom(response) {
  const root = response?.data;
  if (Array.isArray(root)) return root;
  if (Array.isArray(root?.data)) return root.data;
  if (Array.isArray(root?.students)) return root.students;
  if (Array.isArray(root?.classes)) return root.classes;
  if (Array.isArray(root?.requests)) return root.requests;
  if (Array.isArray(root?.certificates)) return root.certificates;
  return [];
}
function StatCard({ title, value, subtitle, icon: Icon }) {
  return <div className="min-w-0 rounded-lg border border-white/10 bg-[#141416] p-4">
    <div className="flex items-center gap-3">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-purple-500/15 text-purple-300"><Icon size={24} /></div>
      <p className="truncate text-base font-semibold text-white">{title}</p>
    </div>
    <p className="mt-3 text-3xl font-bold leading-none text-white">{value}</p>
    {subtitle ? <p className="mt-2 text-sm text-gray-400">{subtitle}</p> : null}
  </div>;
}
function StatusBadge({ status }) {
  const s = norm(status);
  const cls = s === "issued" ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300" : s === "approved" ? "border-blue-500/30 bg-blue-500/10 text-blue-300" : s === "pending" ? "border-amber-500/30 bg-amber-500/10 text-amber-300" : s === "revoked" || s === "rejected" ? "border-red-500/30 bg-red-500/10 text-red-300" : "border-white/10 bg-white/5 text-gray-300";
  return <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${cls}`}>{show(status, "Unknown")}</span>;
}
function PreviewModal({ record, onClose }) {
  useEffect(() => {
    const key = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [onClose]);
  const student = record.student_name_snapshot || record.student_name || record.student || (record.student_id ? `Student #${record.student_id}` : "Student name");
  const course = record.course_name_snapshot || record.class_name || record.course || (record.class_id ? `Class #${record.class_id}` : "Course name");
  return <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/80 p-3 backdrop-blur-sm sm:p-6" role="dialog" aria-modal="true" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
    <div className="my-auto w-full max-w-5xl overflow-hidden rounded-lg border border-white/10 bg-[#141416] shadow-2xl">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-6"><div><h2 className="font-bold text-white">Certificate Preview</h2><p className="mt-1 text-sm text-gray-400">Review the student and course details before submitting the request.</p></div><button type="button" onClick={onClose} className="rounded-lg p-2 text-gray-300 hover:bg-white/10" aria-label="Close preview"><X size={21}/></button></div>
      <div className="bg-[#09090b] p-3 sm:p-7"><div className="relative mx-auto aspect-[1.414/1] w-full max-w-4xl overflow-hidden border-[6px] border-double border-amber-500/70 bg-[#fffaf0] p-3 text-center text-[#352616] sm:border-[8px] sm:p-8"><div className="pointer-events-none absolute inset-2 border border-amber-700/50 sm:inset-3"/><div className="relative flex h-full flex-col items-center justify-center"><div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full border-2 border-amber-700 text-amber-800 sm:mb-4 sm:h-14 sm:w-14"><Award size={27}/></div><p className="text-[8px] font-bold uppercase tracking-[.25em] text-amber-800 sm:text-xs sm:tracking-[.35em]">FineArts Institute Certificate</p><h3 className="mt-2 font-serif text-lg font-bold sm:mt-3 sm:text-4xl">Certificate of Completion</h3><p className="mt-3 text-[10px] italic text-[#6b5a45] sm:mt-5 sm:text-base">This certificate is presented to</p><p className="mt-2 max-w-full break-words font-serif text-lg font-bold text-[#7b4a12] sm:mt-3 sm:text-3xl">{student}</p><p className="mt-2 text-[9px] text-[#6b5a45] sm:mt-3 sm:text-sm">for successfully completing</p><p className="mt-1 max-w-full break-words text-sm font-semibold sm:text-xl">{course}</p><div className="mt-4 flex w-full items-end justify-around gap-3 sm:mt-8"><div className="min-w-0 border-t border-[#9a7b4f] px-2 pt-1 sm:min-w-36 sm:pt-2"><p className="text-[9px] font-semibold sm:text-xs">Course Trainer</p><p className="text-[8px] text-[#6b5a45] sm:text-[10px]">Authorized Requester</p></div><div className="min-w-0 border-t border-[#9a7b4f] px-2 pt-1 sm:min-w-36 sm:pt-2"><p className="text-[9px] font-semibold sm:text-xs">{dateOnly(record.completion_date)}</p><p className="text-[8px] text-[#6b5a45] sm:text-[10px]">Completion Date</p></div></div></div></div><p className="mx-auto mt-3 max-w-4xl text-xs text-gray-400">Preview only. The institute reviews the request and issues the official certificate after approval.</p></div>
      <div className="flex justify-end border-t border-white/10 px-4 py-3 sm:px-6"><button type="button" onClick={onClose} className="rounded-lg border border-white/15 px-4 py-2.5 text-sm font-semibold text-gray-200 hover:bg-white/10">Close Preview</button></div>
    </div>
  </div>;
}

export default function TrainerCertificates() {
  const [requests, setRequests] = useState([]);
  const [issued, setIssued] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("requests");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [preview, setPreview] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [reqRes, issuedRes] = await Promise.all([getCertificateRequests(), getIssuedCertificates()]);
      setRequests(itemsFrom(reqRes));
      setIssued(itemsFrom(issuedRes));
    } catch (error) {
      console.error("Trainer certificates load failed:", error);
      toast.error(error?.response?.data?.message || "Could not load certificate requests.");
    } finally { setLoading(false); }
  }, []);
  useEffect(() => { load(); }, [load]);

  const pendingCount = requests.filter((x) => norm(x.request_status) === "pending").length;
  const issuedCount = issued.filter((x) => norm(x.status) === "issued").length;
  const revokedCount = issued.filter((x) => norm(x.status) === "revoked").length;
  const filteredRequests = useMemo(() => requests.filter((x) => {
    const q = search.trim().toLowerCase();
    const hit = [x.id, x.student_name_snapshot, x.student_name, x.student_id, x.course_name_snapshot, x.class_name, x.class_id, x.request_status].join(" ").toLowerCase().includes(q);
    return hit && (statusFilter === "all" || norm(x.request_status) === statusFilter);
  }), [requests, search, statusFilter]);
  const filteredIssued = useMemo(() => issued.filter((x) => {
    const q = search.trim().toLowerCase();
    const hit = [x.certificate_number, x.student_name_snapshot, x.student_name, x.student_id, x.course_name_snapshot, x.class_name, x.class_id, x.status].join(" ").toLowerCase().includes(q);
    return hit && (statusFilter === "all" || norm(x.status) === statusFilter);
  }), [issued, search, statusFilter]);



  return <div className="min-h-full space-y-6 bg-[#09090b] p-4 text-white sm:p-6 lg:p-8">
    <header className="flex flex-wrap items-center justify-between gap-4"><div><h1 className="bg-gradient-to-r from-violet-400 via-purple-400 to-pink-500 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">Certificate Management</h1><p className="mt-1 text-base text-white sm:text-lg">Manage certificate requests using live backend data for your assigned courses.</p></div></header>
    <section className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4"><StatCard title="My Requests" value={requests.length} icon={FileBadge}/><StatCard title="Pending Requests" value={pendingCount} icon={Clock3}/><StatCard title="Certificates Issued" value={issuedCount} icon={FileCheck2}/><StatCard title="Revoked" value={revokedCount} icon={CircleX}/></section>



    <section className="space-y-4"><div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between"><div className="flex flex-wrap gap-2"><button type="button" onClick={() => { setActiveTab("requests"); setStatusFilter("all"); }} className={`inline-flex items-center gap-2 rounded-lg px-3 py-3 text-sm font-semibold transition ${activeTab === "requests" ? "bg-gradient-to-r from-violet-600 to-pink-500 text-white" : "border border-white/10 bg-[#141416] text-gray-300 hover:bg-white/5"}`}><Users size={17}/> Certificate Requests ({requests.length})</button><button type="button" onClick={() => { setActiveTab("issued"); setStatusFilter("all"); }} className={`inline-flex items-center gap-2 rounded-lg px-3 py-3 text-sm font-semibold transition ${activeTab === "issued" ? "bg-gradient-to-r from-violet-600 to-pink-500 text-white" : "border border-white/10 bg-[#141416] text-gray-300 hover:bg-white/5"}`}><FileCheck2 size={17}/> Issued Certificates ({issued.length})</button></div><div className="flex flex-col gap-3 sm:flex-row"><div className="relative min-w-0 flex-1 lg:w-80"><Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"/><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={activeTab === "requests" ? "Search students or courses..." : "Search certificate number..."} className={`${inputClass} pl-10`}/></div>{activeTab === "issued" && <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className={`${inputClass} sm:w-44`}><option value="all">All Statuses</option><option value="issued">Issued</option><option value="revoked">Revoked</option></select>}</div></div>

      <div className="overflow-hidden rounded-lg border border-white/10 bg-[#09090b]"><div className="border-b border-white/10 px-4 py-4 sm:px-6"><h2 className="text-lg font-bold text-white">{activeTab === "requests" ? "Certificate Requests" : "Issued Certificates"}</h2><p className="mt-1 text-sm text-gray-400">{activeTab === "requests" ? "Track the review status of certificates requested for your students." : "Certificates issued for your requested courses."}</p></div>{loading ? <div className="p-10 text-center text-gray-400">Loading certificate data...</div> : activeTab === "requests" ? <div className="overflow-x-auto"><table className="w-full min-w-[850px] text-left text-sm"><thead className="bg-[#1c1c1f] text-xs uppercase tracking-wide text-gray-300"><tr>{["#", "Student", "Course", "Completion Date", "Status", "Action"].map((h) => <th key={h} className="px-5 py-4">{h}</th>)}</tr></thead><tbody className="divide-y divide-white/10">{filteredRequests.map((r, i) => <tr key={r.id} className="hover:bg-white/[0.025]"><td className="px-5 py-5 text-gray-400">{i + 1}</td><td className="px-5 py-5"><p className="font-semibold text-white">{show(r.student_name_snapshot || r.student_name, r.student_id ? `Student #${r.student_id}` : "—")}</p><p className="mt-1 text-gray-400">{show(r.student_email)}</p></td><td className="px-5 py-5"><p className="font-semibold text-white">{show(r.course_name_snapshot || r.class_name, r.class_id ? `Class #${r.class_id}` : "—")}</p><p className="mt-1 text-gray-400">{show(r.category_name || r.subcategory_name, "Course")}</p></td><td className="px-5 py-5 text-gray-300">{dateOnly(r.completion_date)}</td><td className="px-5 py-5"><StatusBadge status={r.request_status}/></td><td className="px-5 py-5"><button type="button" onClick={() => setPreview(r)} className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 font-semibold text-white hover:border-purple-500/50 hover:bg-purple-500/10"><Eye size={15}/> Preview</button></td></tr>)}{!filteredRequests.length && <tr><td colSpan={6} className="px-5 py-12 text-center text-gray-400">{requests.length ? "No requests match your search or filter." : "No certificate requests yet."}</td></tr>}</tbody></table></div> : <div className="overflow-x-auto"><table className="w-full min-w-[850px] text-left text-sm"><thead className="bg-[#1c1c1f] text-xs uppercase tracking-wide text-gray-300"><tr>{["#", "Certificate No.", "Student", "Course", "Issue Date", "Status"].map((h) => <th key={h} className="px-5 py-4">{h}</th>)}</tr></thead><tbody className="divide-y divide-white/10">{filteredIssued.map((c, i) => <tr key={c.id || c.certificate_number} className="hover:bg-white/[0.025]"><td className="px-5 py-5 text-gray-400">{i + 1}</td><td className="px-5 py-5 font-semibold text-white">{show(c.certificate_number)}</td><td className="px-5 py-5"><p className="font-semibold text-white">{show(c.student_name_snapshot || c.student_name, c.student_id ? `Student #${c.student_id}` : "—")}</p><p className="mt-1 text-gray-400">{show(c.student_email)}</p></td><td className="px-5 py-5 text-gray-300">{show(c.course_name_snapshot || c.class_name, c.class_id ? `Class #${c.class_id}` : "—")}</td><td className="px-5 py-5 text-gray-300">{dateOnly(c.issued_at || c.issue_date || c.created_at)}</td><td className="px-5 py-5"><StatusBadge status={c.status}/></td></tr>)}{!filteredIssued.length && <tr><td colSpan={6} className="px-5 py-12 text-center text-gray-400">{issued.length ? "No certificates match your search or filter." : "No issued certificates yet."}</td></tr>}</tbody></table></div>}</div>
    </section>
    {preview && <PreviewModal record={preview} onClose={() => setPreview(null)}/>}
  </div>;
}
