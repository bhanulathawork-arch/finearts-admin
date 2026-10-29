
import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  Award,
  RefreshCw,
  CheckCircle2,
  XCircle,
  FileBadge,
  Search,
  Filter,
  Clock3,
  FileCheck2,
  Users,
  Eye,
  X,
} from "lucide-react";

import {
  getAdminCertificateStats,
  getAdminCertificateRequests,
  getAdminIssuedCertificates,
  reviewCertificateRequest,
  issueCertificate,
} from "../services/certificateService";

const inputClass =
  "w-full min-w-0 rounded-lg border border-white/10 bg-[#141416] px-3 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-purple-500";

const getResponseItems = (response) => {
  const data = response?.data;
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.requests)) return data.requests;
  if (Array.isArray(data?.certificates)) return data.certificates;
  return [];
};

const getPayload = (response) => response?.data?.data ?? response?.data ?? {};
const text = (value, fallback = "—") =>
  value === null || value === undefined || value === "" ? fallback : String(value);
const normalized = (value) => String(value || "").toLowerCase();
const dateOnly = (value) => (value ? String(value).slice(0, 10) : "—");

function StatCard({ title, value, subtitle, icon: Icon }) {
  return (
    <div className="min-w-0 rounded-lg border border-white/10 bg-[#141416] p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-purple-500/15 text-purple-300">
          <Icon size={24} />
        </div>
        <p className="truncate text-base font-semibold text-white">{title}</p>
      </div>
      <p className="mt-3 text-3xl font-bold leading-none text-white">{value}</p>
      {subtitle ? <p className="mt-2 text-sm text-gray-400">{subtitle}</p> : null}
    </div>
  );
}

function StatusBadge({ status }) {
  const value = normalized(status);
  const style =
    value === "issued"
      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
      : value === "approved"
      ? "border-blue-500/30 bg-blue-500/10 text-blue-300"
      : value === "pending"
      ? "border-amber-500/30 bg-amber-500/10 text-amber-300"
      : value === "revoked" || value === "rejected"
      ? "border-red-500/30 bg-red-500/10 text-red-300"
      : "border-white/10 bg-white/5 text-gray-300";
  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${style}`}>
      {text(status, "Unknown")}
    </span>
  );
}

function CertificatePreview({ request, onClose, onIssue, issuing }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const student =
    request.student_name_snapshot || request.student_name ||
    (request.student_id ? `Student #${request.student_id}` : "Student name");
  const course =
    request.course_name_snapshot || request.class_name ||
    (request.class_id ? `Class #${request.class_id}` : "Course name");

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/80 p-3 backdrop-blur-sm sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-certificate-preview-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="relative my-auto w-full max-w-5xl overflow-hidden rounded-lg border border-white/10 bg-[#141416] shadow-2xl">
        <div className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-white/10 bg-[#141416] px-4 py-3 sm:px-6">
          <div>
            <h2 id="admin-certificate-preview-title" className="text-lg font-bold text-white">Certificate Preview</h2>
            <p className="mt-1 text-sm text-gray-400">Review request details before issuing a certificate.</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close preview" title="Close preview" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-gray-300 hover:bg-red-500/15 hover:text-red-300">
            <X size={22} />
          </button>
        </div>
        <div className="max-h-[calc(100vh-190px)] overflow-y-auto bg-[#09090b] p-3 sm:p-7">
          <div className="relative mx-auto aspect-[1.414/1] w-full max-w-4xl overflow-hidden border-[6px] border-double border-amber-500/70 bg-[#fffaf0] p-3 text-center text-[#352616] shadow-xl sm:border-[8px] sm:p-8">
            <div className="pointer-events-none absolute inset-2 border border-amber-700/50 sm:inset-3" />
            <div className="relative flex h-full flex-col items-center justify-center">
              <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full border-2 border-amber-700 text-amber-800 sm:mb-4 sm:h-14 sm:w-14"><Award size={27} /></div>
              <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-amber-800 sm:text-xs sm:tracking-[0.35em]">FineArts Institute Certificate</p>
              <h3 className="mt-2 font-serif text-lg font-bold sm:mt-3 sm:text-4xl">Certificate of Completion</h3>
              <p className="mt-3 text-[10px] italic text-[#6b5a45] sm:mt-5 sm:text-base">This certificate is presented to</p>
              <p className="mt-2 max-w-full break-words font-serif text-lg font-bold text-[#7b4a12] sm:mt-3 sm:text-3xl">{student}</p>
              <p className="mt-2 text-[9px] text-[#6b5a45] sm:mt-3 sm:text-sm">for successfully completing</p>
              <p className="mt-1 max-w-full break-words text-sm font-semibold sm:text-xl">{course}</p>
              <div className="mt-4 flex w-full items-end justify-around gap-3 sm:mt-8">
                <div className="min-w-0 border-t border-[#9a7b4f] px-2 pt-1 sm:min-w-36 sm:pt-2"><p className="text-[9px] font-semibold sm:text-xs">FineArts Admin</p><p className="text-[8px] text-[#6b5a45] sm:text-[10px]">Authorized Issuer</p></div>
                <div className="min-w-0 border-t border-[#9a7b4f] px-2 pt-1 sm:min-w-36 sm:pt-2"><p className="text-[9px] font-semibold sm:text-xs">{dateOnly(request.completion_date)}</p><p className="text-[8px] text-[#6b5a45] sm:text-[10px]">Completion Date</p></div>
              </div>
            </div>
          </div>
          <p className="mx-auto mt-3 max-w-4xl text-xs text-gray-400">Preview only. Final certificate number and downloadable PDF depend on the backend issuance and PDF-generation flow.</p>
        </div>
        <div className="sticky bottom-0 flex flex-col-reverse justify-end gap-2 border-t border-white/10 bg-[#141416] px-4 py-3 sm:flex-row sm:px-6">
          <button type="button" onClick={onClose} className="rounded-lg border border-white/15 px-4 py-2.5 text-sm font-semibold text-gray-200 hover:bg-white/10">Close Preview</button>
          {normalized(request.request_status) === "approved" && (
            <button type="button" disabled={issuing} onClick={() => onIssue(request)} className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-pink-500 px-4 py-2.5 text-sm font-semibold text-white hover:brightness-110 disabled:opacity-50">
              <Award size={16} /> {issuing ? "Issuing..." : "Issue Certificate"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminCertificates() {
  const [requests, setRequests] = useState([]);
  const [issued, setIssued] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("requests");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [previewRequest, setPreviewRequest] = useState(null);
  const [issuingId, setIssuingId] = useState(null);
  const [busyRequestId, setBusyRequestId] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [requestResponse, issuedResponse, statsResponse] = await Promise.all([
        getAdminCertificateRequests(),
        getAdminIssuedCertificates(),
        getAdminCertificateStats(),
      ]);
      setRequests(getResponseItems(requestResponse));
      setIssued(getResponseItems(issuedResponse));
      setStats(getPayload(statsResponse));
    } catch (error) {
      console.error("Admin certificate page load failed:", error);
      toast.error(error?.response?.data?.message || "Could not load certificate data. Check admin authentication and certificate API routes.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const pendingCount = requests.filter((item) => normalized(item.request_status) === "pending").length;
  const approvedCount = requests.filter((item) => normalized(item.request_status) === "approved").length;
  const revokedCount = stats.revoked ?? issued.filter((item) => normalized(item.status) === "revoked").length;
  const issuedCount = stats.issued ?? issued.filter((item) => normalized(item.status) === "issued").length;

  const filteredRequests = useMemo(() => {
    const query = search.trim().toLowerCase();
    return requests.filter((item) => {
      const matchesSearch = [item.id, item.student_name_snapshot, item.student_name, item.student_id, item.course_name_snapshot, item.class_name, item.class_id, item.request_status, item.institute_name, item.institute_id]
        .join(" ").toLowerCase().includes(query);
      const matchesStatus = statusFilter === "all" || normalized(item.request_status) === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [requests, search, statusFilter]);

  const filteredIssued = useMemo(() => {
    const query = search.trim().toLowerCase();
    return issued.filter((item) => {
      const matchesSearch = [item.certificate_number, item.student_name_snapshot, item.student_name, item.student_id, item.course_name_snapshot, item.class_name, item.class_id, item.issuer_type, item.status, item.institute_name, item.institute_id]
        .join(" ").toLowerCase().includes(query);
      const matchesStatus = statusFilter === "all" || normalized(item.status) === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [issued, search, statusFilter]);

  const act = async (id, decision) => {
    setBusyRequestId(id);
    try {
      await reviewCertificateRequest(id, { decision, review_notes: `Reviewed by admin: ${decision}` });
      toast.success(`Request ${decision}.`);
      await load();
    } catch (error) {
      console.error("Certificate review failed:", error);
      toast.error(error?.response?.data?.message || `Could not ${decision} this request.`);
    } finally {
      setBusyRequestId(null);
    }
  };

  const handleIssue = async (request) => {
    setIssuingId(request.id);
    try {
      await issueCertificate(request.id);
      toast.success("Certificate issued successfully.");
      setPreviewRequest(null);
      setActiveTab("issued");
      setSearch("");
      setStatusFilter("all");
      await load();
    } catch (error) {
      console.error("Certificate issuance failed:", error);
      toast.error(error?.response?.data?.message || "Could not issue certificate.");
    } finally {
      setIssuingId(null);
    }
  };



  return (
    <div className="min-h-full space-y-6 bg-[#09090b] p-4 text-white sm:p-6 lg:p-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="bg-gradient-to-r from-violet-400 via-purple-400 to-pink-500 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">Certificate Management</h1>
          <p className="mt-1 text-sm text-gray-300 sm:text-base">Manage platform-wide certificate requests, issuance, and certificate records.</p>
        </div>
        <button type="button" onClick={load} disabled={loading} className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-[#141416] px-4 py-3 text-sm font-semibold text-white hover:bg-white/10 disabled:opacity-50">
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} /> Refresh
        </button>
      </header>

      <section className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Eligible Students" value={stats.total_requests ?? requests.length} icon={Users} />
        <StatCard title="Pending Requests" value={stats.pending ?? pendingCount} icon={Clock3} />
        <StatCard title="Certificates Issued" value={issuedCount} icon={FileCheck2} />
        <StatCard title="Revoked" value={revokedCount} icon={XCircle} />
      </section>

      <section className="space-y-4">
        <div className="flex flex-col justify-between gap-3 xl:flex-row xl:items-center">
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => { setActiveTab("requests"); setSearch(""); }} className={`inline-flex items-center gap-2 rounded-lg border px-4 py-3 text-sm font-semibold transition ${activeTab === "requests" ? "border-purple-400/40 bg-gradient-to-r from-violet-600 to-pink-500 text-white" : "border-white/10 bg-[#141416] text-gray-300 hover:bg-white/10"}`}><Users size={17} /> Eligible Students ({requests.length})</button>
            <button type="button" onClick={() => { setActiveTab("issued"); setSearch(""); }} className={`inline-flex items-center gap-2 rounded-lg border px-4 py-3 text-sm font-semibold transition ${activeTab === "issued" ? "border-purple-400/40 bg-gradient-to-r from-violet-600 to-pink-500 text-white" : "border-white/10 bg-[#141416] text-gray-300 hover:bg-white/10"}`}><FileCheck2 size={17} /> Issued Certificates ({issued.length})</button>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <label className="flex min-w-0 items-center gap-2 rounded-lg border border-white/10 bg-[#141416] px-3 sm:min-w-72"><Search size={17} className="shrink-0 text-gray-400" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={activeTab === "requests" ? "Search student, course or request..." : "Search student, course or certificate no..."} className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-gray-500" /></label>
            {activeTab === "issued" && <label className="flex items-center gap-2 rounded-lg border border-white/10 bg-[#141416] px-3"><Filter size={16} className="text-gray-400" /><select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="bg-transparent py-3 text-sm text-white outline-none"><option className="bg-[#141416]" value="all">All statuses</option><option className="bg-[#141416]" value="pending">Pending</option><option className="bg-[#141416]" value="approved">Approved</option><option className="bg-[#141416]" value="rejected">Rejected</option><option className="bg-[#141416]" value="issued">Issued</option><option className="bg-[#141416]" value="revoked">Revoked</option></select></label>}
          </div>
        </div>

        {activeTab === "requests" ? (
          <div className="overflow-hidden rounded-lg border border-white/10">
            <div className="border-b border-white/10 px-5 py-4"><h2 className="text-lg font-bold">Certificate Requests</h2><p className="mt-1 text-sm text-gray-400">Review certificate requests across the platform, preview certificate details, and issue approved certificates.</p></div>
            {loading ? <p className="p-8 text-center text-sm text-gray-400">Loading certificate requests...</p> : filteredRequests.length === 0 ? <p className="p-8 text-center text-sm text-gray-400">No certificate requests found.</p> : (
              <div className="overflow-x-auto"><table className="w-full min-w-[1180px] text-left text-sm"><thead className="bg-[#1c1c1f] text-xs uppercase tracking-wide text-gray-300"><tr>{["Request", "Institute", "Student", "Course / Class", "Completion Date", "Status", "Actions"].map((heading) => <th key={heading} className="px-4 py-4">{heading}</th>)}</tr></thead><tbody>{filteredRequests.map((request) => { const status = normalized(request.request_status); const student = request.student_name_snapshot || request.student_name || (request.student_id ? `Student #${request.student_id}` : "—"); const course = request.course_name_snapshot || request.class_name || (request.class_id ? `Class #${request.class_id}` : "—"); return <tr key={request.id} className="border-t border-white/[0.07] hover:bg-white/[0.025]"><td className="px-4 py-4 font-mono text-gray-400">#{request.id}</td><td className="px-4 py-4"><p className="font-semibold">{text(request.institute_name, "Not specified by backend")}</p><p className="mt-1 text-xs text-gray-400">ID: {text(request.institute_id)}</p></td><td className="px-4 py-4"><p className="font-semibold">{student}</p><p className="mt-1 text-xs text-gray-400">ID: {text(request.student_id)}</p></td><td className="px-4 py-4"><p className="font-medium">{course}</p><p className="mt-1 text-xs text-gray-400">Class ID: {text(request.class_id)}</p></td><td className="whitespace-nowrap px-4 py-4 text-gray-300">{dateOnly(request.completion_date)}</td><td className="px-4 py-4"><StatusBadge status={request.request_status} /></td><td className="px-4 py-4"><div className="flex flex-wrap items-center gap-2"><button type="button" onClick={() => setPreviewRequest(request)} className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-[#1c1c1f] px-3 py-2 text-xs font-semibold hover:bg-white/10"><Eye size={14} /> Preview</button>{status === "pending" && <><button type="button" disabled={busyRequestId === request.id} onClick={() => act(request.id, "approved")} className="inline-flex items-center gap-1 rounded-lg bg-emerald-500/15 px-3 py-2 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/25 disabled:opacity-50"><CheckCircle2 size={14} /> Approve</button><button type="button" disabled={busyRequestId === request.id} onClick={() => act(request.id, "rejected")} className="inline-flex items-center gap-1 rounded-lg bg-red-500/15 px-3 py-2 text-xs font-semibold text-red-300 hover:bg-red-500/25 disabled:opacity-50"><XCircle size={14} /> Reject</button></>}{status === "approved" && <button type="button" disabled={issuingId === request.id} onClick={() => handleIssue(request)} className="inline-flex items-center gap-1 rounded-lg bg-gradient-to-r from-violet-600 to-pink-500 px-3 py-2 text-xs font-semibold text-white hover:brightness-110 disabled:opacity-50"><Award size={14} /> {issuingId === request.id ? "Issuing..." : "Issue Certificate"}</button>}</div></td></tr>; })}</tbody></table></div>
            )}
          </div>
        ) : (
          <div className="overflow-hidden rounded-lg border border-white/10"><div className="border-b border-white/10 px-5 py-4"><h2 className="text-lg font-bold">Issued Certificates</h2><p className="mt-1 text-sm text-gray-400">Platform-wide issued certificate records and their current status.</p></div>{loading ? <p className="p-8 text-center text-sm text-gray-400">Loading issued certificates...</p> : filteredIssued.length === 0 ? <p className="p-8 text-center text-sm text-gray-400">No issued certificates found.</p> : <div className="overflow-x-auto"><table className="w-full min-w-[1120px] text-left text-sm"><thead className="bg-[#1c1c1f] text-xs uppercase tracking-wide text-gray-300"><tr>{["Certificate No.", "Institute", "Student", "Course / Class", "Issuer", "Issue Date", "Status"].map((heading) => <th key={heading} className="px-4 py-4">{heading}</th>)}</tr></thead><tbody>{filteredIssued.map((certificate) => <tr key={certificate.id} className="border-t border-white/[0.07] hover:bg-white/[0.025]"><td className="whitespace-nowrap px-4 py-4 font-mono text-xs text-purple-200">{text(certificate.certificate_number)}</td><td className="px-4 py-4"><p className="font-semibold">{text(certificate.institute_name, "Not specified by backend")}</p><p className="mt-1 text-xs text-gray-400">ID: {text(certificate.institute_id)}</p></td><td className="px-4 py-4"><p className="font-semibold">{text(certificate.student_name_snapshot || certificate.student_name || (certificate.student_id ? `Student #${certificate.student_id}` : "—"))}</p><p className="mt-1 text-xs text-gray-400">ID: {text(certificate.student_id)}</p></td><td className="px-4 py-4">{text(certificate.course_name_snapshot || certificate.class_name || (certificate.class_id ? `Class #${certificate.class_id}` : "—"))}</td><td className="px-4 py-4">{text(certificate.issuer_type)}</td><td className="whitespace-nowrap px-4 py-4 text-gray-300">{dateOnly(certificate.issued_at)}</td><td className="px-4 py-4"><StatusBadge status={certificate.status} /></td></tr>)}</tbody></table></div>}</div>
        )}
      </section>




      {previewRequest && <CertificatePreview request={previewRequest} onClose={() => setPreviewRequest(null)} onIssue={handleIssue} issuing={issuingId === previewRequest.id} />}
    </div>
  );
}
