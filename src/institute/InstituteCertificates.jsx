
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Award, Users, FileCheck2, Clock3, CircleX, Search, Filter,
  Download, Ban, CheckCircle2, CalendarDays, Eye, X, RefreshCw,
} from "lucide-react";
import API from "../services/api";

const unwrap = (response) => {
  const body = response?.data ?? response;
  if (body?.success === false) throw new Error(body.message || "Request failed.");
  return Array.isArray(body?.data) ? body.data : Array.isArray(body) ? body : body?.data ?? [];
};
const dateLabel = (value) => {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
};
const normalizeEligible = (row) => ({
  ...row,
  id: row.student_id ?? row.id,
  studentId: row.student_id ?? row.id,
  classId: row.class_id,
  student: row.student_name ?? row.student ?? row.full_name ?? row.email ?? "Student",
  email: row.email ?? "",
  course: row.class_name ?? row.course_name ?? row.title ?? "Course",
  category: row.category_name ?? row.category ?? "",
  completionDate: row.completion_date ?? row.completed_at ?? row.completionDate ?? null,
  trainer: row.trainer_name ?? row.trainer ?? "—",
});
const normalizeCertificate = (row) => ({
  ...row,
  id: row.id,
  number: row.certificate_number ?? row.number ?? "—",
  student: row.student_display_name ?? row.student_name_snapshot ?? row.student_name ?? row.student ?? "Student",
  email: row.email ?? "",
  course: row.course_display_name ?? row.course_name_snapshot ?? row.class_name ?? row.course_name ?? "Course",
  category: row.category_name ?? row.category ?? "",
  issueDate: row.issued_at ?? row.issue_date ?? row.created_at,
  status: String(row.status ?? "issued").toLowerCase(),
});
function StatCard({ title, value, icon: Icon, subtitle }) {
  return <div className="min-w-0 rounded-lg border border-white/10 bg-[#141416] p-3"><div className="flex items-center gap-3"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-purple-500/15 text-purple-300"><Icon size={25} /></div><p className="truncate text-base font-semibold text-white sm:text-lg">{title}</p></div><p className="mt-2 text-3xl font-bold leading-none text-white">{value}</p>{subtitle && <p className="mt-2 text-sm text-gray-400">{subtitle}</p>}</div>;
}
function StatusBadge({ status }) {
  const revoked = status === "revoked";
  return <span className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium ${revoked ? "border-red-500/40 bg-red-500/10 text-red-300" : "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"}`}>{revoked ? <CircleX size={13} /> : <CheckCircle2 size={13} />}{revoked ? "Revoked" : "Issued"}</span>;
}

export default function InstituteCertificates() {
  const [activeTab, setActiveTab] = useState("eligible");
  const [eligible, setEligible] = useState([]);
  const [issued, setIssued] = useState([]);
  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [previewStudent, setPreviewStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const loadData = useCallback(async () => {
    setLoading(true); setError("");
    try {
      const [eligibleResponse, issuedResponse, requestsResponse] = await Promise.all([
        API.get("/certificates/eligible-students"),
        API.get("/certificates/issued"),
        API.get("/certificates/requests"),
      ]);
      setEligible(unwrap(eligibleResponse).map(normalizeEligible));
      setIssued(unwrap(issuedResponse).map(normalizeCertificate));
      setRequests(unwrap(requestsResponse));
    } catch (e) {
      setError(e?.response?.data?.message || e?.message || "Could not load certificate data from the backend.");
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);
  useEffect(() => {
    if (!previewStudent) return undefined;
    const onKeyDown = (event) => { if (event.key === "Escape") setPreviewStudent(null); };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [previewStudent]);

  const issuedCount = issued.filter((c) => c.status === "issued").length;
  const revokedCount = issued.filter((c) => c.status === "revoked").length;
  const eligibleFiltered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return eligible.filter((s) => [s.student, s.email, s.course, s.trainer].join(" ").toLowerCase().includes(q));
  }, [eligible, search]);
  const issuedFiltered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return issued.filter((c) => [c.number, c.student, c.email, c.course].join(" ").toLowerCase().includes(q) && (statusFilter === "all" || c.status === statusFilter));
  }, [issued, search, statusFilter]);

  async function handleIssue(student) {
    if (!student.studentId || !student.classId) { setError("The backend did not return a student ID or class ID for this row."); return; }
    if (!window.confirm(`Create and issue a certificate for ${student.student} for ${student.course}?`)) return;
    setBusyId(`student-${student.studentId}-${student.classId}`); setError(""); setNotice("");
    try {
      // Use the real backend workflow: create request -> approve request -> issue certificate.
      const requestResponse = await API.post("/certificates/requests", {
        student_id: student.studentId,
        class_id: student.classId,
        completion_date: student.completionDate || null,
      });
      const requestData = requestResponse?.data?.data ?? requestResponse?.data;
      const requestId = requestData?.id ?? requestData?.request_id;
      if (!requestId) throw new Error("The backend did not return the new certificate request ID.");
      await API.patch(`/certificates/requests/${requestId}/review`, { status: "approved", review_notes: "Verified by institute before issuance." });
      await API.post("/certificates/issue", { request_id: requestId });
      setNotice(`Certificate issued for ${student.student}.`);
      setPreviewStudent(null); setActiveTab("issued"); setSearch("");
      await loadData();
    } catch (e) {
      setError(e?.response?.data?.message || e?.message || "Certificate could not be issued.");
    } finally { setBusyId(null); }
  }

  async function handleRevoke(certificate) {
    if (certificate.status === "revoked") return;
    const reason = window.prompt(`Enter a reason to revoke ${certificate.number}:`);
    if (reason === null) return;
    if (!reason.trim()) { setError("A revocation reason is required."); return; }
    setBusyId(`certificate-${certificate.id}`); setError(""); setNotice("");
    try {
      await API.post(`/certificates/${certificate.id}/revoke`, { reason: reason.trim() });
      setNotice(`Certificate ${certificate.number} was revoked.`);
      await loadData();
    } catch (e) { setError(e?.response?.data?.message || e?.message || "Could not revoke certificate."); }
    finally { setBusyId(null); }
  }

  async function handleDownload(certificate) {
    if (certificate.status === "revoked") { setError("This certificate is revoked and cannot be downloaded."); return; }
    setBusyId(`download-${certificate.id}`); setError("");
    try {
      const response = await API.get(`/certificates/${certificate.id}/download`, { responseType: "blob" });
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url; anchor.download = `${certificate.number || `certificate-${certificate.id}`}.pdf`;
      document.body.appendChild(anchor); anchor.click(); anchor.remove(); URL.revokeObjectURL(url);
    } catch (e) { setError(e?.response?.data?.message || "Could not download certificate PDF."); }
    finally { setBusyId(null); }
  }

  return <div className="min-h-full space-y-6 p-4 text-white sm:p-6 lg:p-8">
    <header className="flex flex-wrap items-center justify-between gap-3"><div><h1 className="bg-gradient-to-r from-violet-400 via-purple-400 to-pink-500 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">Certificate Management</h1><p className="mt-1 text-base text-white sm:text-lg">Manage certificates using live backend data for your institute.</p></div><button type="button" onClick={loadData} disabled={loading} className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-[#141416] px-4 py-3 text-sm font-semibold hover:bg-white/10 disabled:opacity-50"><RefreshCw size={16} className={loading ? "animate-spin" : ""}/> Refresh</button></header>
    {error && <div role="alert" className="flex items-start justify-between gap-3 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"><span>{error}</span><button type="button" onClick={() => setError("")} aria-label="Dismiss error"><X size={16}/></button></div>}
    {notice && <div role="status" className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">{notice}</div>}
    <section className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4"><StatCard title="Eligible Students" value={loading ? "—" : eligible.length} icon={Users}/><StatCard title="Certificates Issued" value={loading ? "—" : issuedCount} icon={FileCheck2}/><StatCard title="Pending Requests" value={loading ? "—" : requests.filter((r) => String(r.request_status ?? r.status ?? "").toLowerCase() === "pending").length} icon={Clock3}/><StatCard title="Revoked" value={loading ? "—" : revokedCount} icon={CircleX}/></section>
    <section className="space-y-4"><div className="flex flex-col justify-between gap-3 xl:flex-row xl:items-center"><div className="flex flex-wrap gap-2"><button type="button" onClick={() => setActiveTab("eligible")} className={`inline-flex items-center gap-2 rounded-lg border px-4 py-3 text-sm font-semibold ${activeTab === "eligible" ? "border-purple-400/50 bg-gradient-to-r from-violet-600 to-pink-500" : "border-white/10 bg-[#141416] text-gray-300 hover:bg-white/10"}`}><Users size={17}/>Eligible Students ({eligible.length})</button><button type="button" onClick={() => setActiveTab("issued")} className={`inline-flex items-center gap-2 rounded-lg border px-4 py-3 text-sm font-semibold ${activeTab === "issued" ? "border-purple-400/50 bg-gradient-to-r from-violet-600 to-pink-500" : "border-white/10 bg-[#141416] text-gray-300 hover:bg-white/10"}`}><FileCheck2 size={17}/>Issued Certificates ({issued.length})</button></div><div className="flex flex-col gap-2 sm:flex-row"><label className="flex min-w-0 items-center gap-2 rounded-lg border border-white/10 bg-[#141416] px-3 sm:min-w-72"><Search size={17} className="shrink-0 text-gray-400"/><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={activeTab === "eligible" ? "Search students or courses..." : "Search certificate number..."} className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-gray-500"/></label>{activeTab === "issued" && <label className="flex items-center gap-2 rounded-lg border border-white/10 bg-[#141416] px-3"><Filter size={16} className="text-gray-400"/><select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="bg-transparent py-3 text-sm outline-none"><option className="bg-[#141416]" value="all">All statuses</option><option className="bg-[#141416]" value="issued">Issued</option><option className="bg-[#141416]" value="revoked">Revoked</option></select></label>}</div></div>
    {activeTab === "eligible" ? <div className="overflow-hidden rounded-lg border border-white/10"><div className="border-b border-white/10 px-5 py-4"><h2 className="text-lg font-bold">Eligible Students for Certificate</h2><p className="mt-1 text-sm text-gray-300">Records are loaded from the authenticated backend endpoint.</p></div><div className="overflow-x-auto"><table className="w-full min-w-[850px] text-left text-sm"><thead className="bg-[#1c1c1f] text-xs uppercase tracking-wide text-gray-300"><tr>{["#","Student","Course","Completion Date","Trainer","Action"].map((h) => <th key={h} className="px-4 py-4">{h}</th>)}</tr></thead><tbody>{loading ? <tr><td colSpan={6} className="px-4 py-12 text-center text-gray-400">Loading eligible students…</td></tr> : eligibleFiltered.map((s,i) => <tr key={`${s.studentId}-${s.classId}`} className="border-t border-white/[0.07] hover:bg-white/[0.025]"><td className="px-4 py-4 text-gray-400">{i+1}</td><td className="px-4 py-4"><p className="font-semibold">{s.student}</p><p className="mt-1 text-xs text-gray-400">{s.email || "Email unavailable"}</p></td><td className="px-4 py-4"><p className="font-medium">{s.course}</p>{s.category && <p className="mt-1 text-xs text-gray-400">{s.category}</p>}</td><td className="whitespace-nowrap px-4 py-4 text-gray-300"><span className="inline-flex items-center gap-2"><CalendarDays size={14} className="text-gray-500"/>{dateLabel(s.completionDate)}</span></td><td className="px-4 py-4">{s.trainer || "—"}</td><td className="px-4 py-4"><div className="flex items-center gap-2"><button type="button" onClick={() => setPreviewStudent(s)} className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-white/15 bg-[#1c1c1f] px-3 py-2.5 text-xs font-semibold hover:bg-white/10"><Eye size={15}/>Preview</button><button type="button" disabled={Boolean(busyId)} onClick={() => handleIssue(s)} className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg bg-gradient-to-r from-violet-600 to-pink-500 px-3 py-2.5 text-xs font-semibold disabled:opacity-50"><Award size={15}/>{busyId === `student-${s.studentId}-${s.classId}` ? "Issuing…" : "Issue Certificate"}</button></div></td></tr>)}{!loading && eligibleFiltered.length === 0 && <tr><td colSpan={6} className="px-4 py-12 text-center text-gray-400">No eligible students returned by the backend.</td></tr>}</tbody></table></div></div> : <div className="overflow-hidden rounded-lg border border-white/10"><div className="border-b border-white/10 px-5 py-4"><h2 className="text-lg font-bold">Issued Certificates</h2><p className="mt-1 text-sm text-gray-300">Certificates loaded from your institute's backend scope.</p></div><div className="overflow-x-auto"><table className="w-full min-w-[850px] text-left text-sm"><thead className="bg-[#1c1c1f] text-xs uppercase tracking-wide text-gray-300"><tr>{["#","Certificate No.","Student","Course","Issue Date","Status","Actions"].map((h) => <th key={h} className="px-4 py-4">{h}</th>)}</tr></thead><tbody>{loading ? <tr><td colSpan={7} className="px-4 py-12 text-center text-gray-400">Loading certificates…</td></tr> : issuedFiltered.map((c,i) => <tr key={c.id} className="border-t border-white/[0.07] hover:bg-white/[0.025]"><td className="px-4 py-4 text-gray-400">{i+1}</td><td className="whitespace-nowrap px-4 py-4 font-mono text-xs text-amber-200">{c.number}</td><td className="px-4 py-4"><p className="font-semibold">{c.student}</p>{c.email && <p className="mt-1 text-xs text-gray-400">{c.email}</p>}</td><td className="px-4 py-4"><p className="font-medium">{c.course}</p>{c.category && <p className="mt-1 text-xs text-gray-400">{c.category}</p>}</td><td className="whitespace-nowrap px-4 py-4 text-gray-300">{dateLabel(c.issueDate)}</td><td className="px-4 py-4"><StatusBadge status={c.status}/></td><td className="px-4 py-4"><div className="flex items-center gap-2"><button type="button" disabled={Boolean(busyId) || c.status === "revoked"} onClick={() => handleDownload(c)} className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-[#142038] px-3 py-2 text-xs font-medium hover:bg-white/10 disabled:opacity-40"><Download size={14}/>{busyId === `download-${c.id}` ? "Downloading…" : "Download"}</button><button type="button" disabled={Boolean(busyId) || c.status === "revoked"} onClick={() => handleRevoke(c)} className="inline-flex items-center gap-1.5 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs font-medium text-red-300 hover:bg-red-500/20 disabled:opacity-40"><Ban size={14}/>Revoke</button></div></td></tr>)}{!loading && issuedFiltered.length === 0 && <tr><td colSpan={7} className="px-4 py-12 text-center text-gray-400">No certificates returned by the backend for this filter.</td></tr>}</tbody></table></div></div>}</section>
    {previewStudent && <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/80 p-3 backdrop-blur-sm sm:p-5" role="dialog" aria-modal="true" aria-labelledby="certificate-preview-title" onMouseDown={(e) => { if (e.target === e.currentTarget) setPreviewStudent(null); }}><div className="relative my-2 max-h-[calc(100dvh-2rem)] w-full max-w-4xl overflow-y-auto rounded-lg border border-white/15 bg-[#141416] shadow-2xl"><div className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-white/10 bg-[#141416] px-4 py-3 sm:px-5 sm:py-4"><div><h2 id="certificate-preview-title" className="text-lg font-bold">Certificate Preview</h2><p className="mt-1 text-sm text-gray-400">Preview uses the student and course data returned by the backend.</p></div><button type="button" onClick={() => setPreviewStudent(null)} className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-gray-300 hover:bg-red-500 hover:text-white" aria-label="Close preview"><X size={22}/></button></div><div className="bg-[#09090b] p-4 sm:p-7"><div className="relative mx-auto aspect-[1.414/1] w-full max-w-3xl overflow-hidden border-[8px] border-double border-amber-500/70 bg-[#fffaf0] p-4 text-center text-[#352616] shadow-xl sm:p-8"><div className="pointer-events-none absolute inset-2 border border-amber-700/50 sm:inset-3"/><div className="relative flex h-full flex-col items-center justify-center"><div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full border-2 border-amber-700 text-amber-800 sm:mb-4 sm:h-14 sm:w-14"><Award size={28}/></div><p className="text-[9px] font-bold uppercase tracking-[0.2em] text-amber-800 sm:text-xs sm:tracking-[0.35em]">Institute Certificate</p><h3 className="mt-2 font-serif text-xl font-bold sm:mt-3 sm:text-4xl">Certificate of Completion</h3><p className="mt-3 text-xs italic text-[#6b5a45] sm:mt-5 sm:text-base">This certificate is presented to</p><p className="mt-2 max-w-full break-words font-serif text-lg font-bold text-[#7b4a12] sm:mt-3 sm:text-3xl">{previewStudent.student}</p><p className="mt-2 text-[10px] text-[#6b5a45] sm:mt-3 sm:text-sm">for completing</p><p className="mt-1 max-w-full break-words text-sm font-semibold sm:text-xl">{previewStudent.course}</p><p className="mt-1 text-[10px] text-[#6b5a45] sm:text-sm">Completion date: {dateLabel(previewStudent.completionDate)}</p><div className="mt-4 flex w-full items-end justify-around gap-4 sm:mt-8"><div className="min-w-0 border-t border-[#9a7b4f] px-2 pt-1 sm:min-w-36 sm:pt-2"><p className="truncate text-[9px] font-semibold sm:text-xs">{previewStudent.trainer || "Institute Representative"}</p><p className="text-[8px] text-[#6b5a45] sm:text-[10px]">Trainer / Representative</p></div><div className="min-w-0 border-t border-[#9a7b4f] px-2 pt-1 sm:min-w-36 sm:pt-2"><p className="text-[9px] font-semibold sm:text-xs">Generated on issuance</p><p className="text-[8px] text-[#6b5a45] sm:text-[10px]">Issue Date</p></div></div></div></div><p className="mx-auto mt-3 max-w-3xl text-xs text-gray-400">This is a preview only. The official certificate number and PDF are generated by the backend when issued.</p></div><div className="sticky bottom-0 z-20 flex flex-col-reverse justify-end gap-2 border-t border-white/10 bg-[#141416] px-4 py-3 sm:flex-row sm:px-5 sm:py-4"><button type="button" onClick={() => setPreviewStudent(null)} className="rounded-lg border border-white/15 px-4 py-2.5 text-sm font-semibold text-gray-200 hover:bg-white/10">Close Preview</button><button type="button" disabled={Boolean(busyId)} onClick={() => handleIssue(previewStudent)} className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-pink-500 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50"><Award size={16}/>{busyId ? "Processing…" : "Approve & Issue Certificate"}</button></div></div></div>}
  </div>;
}
