import { useCallback, useEffect, useMemo, useState } from "react";
import { Globe, Search, RefreshCw, ExternalLink, Pencil, CheckCircle2, AlertCircle, Building2, Link2, X } from "lucide-react";
import toast from "react-hot-toast";
import { getAllInstitutes } from "../services/instituteService";
import { assignAdminSubdomain, checkAdminSubdomain, getAdminWebsiteDomains } from "../services/adminDomainService";

const RESERVED = new Set(["www", "admin", "api", "mail", "support", "ftp", "webmail", "dashboard", "localhost"]);
const normalize = (value) => String(value ?? "").trim().toLowerCase();
const getArray = (response) => {
  const candidates = [response?.data?.institutes, response?.institutes, response?.data?.data, response?.data, response];
  return candidates.find(Array.isArray) || [];
};
const getId = (institute) => institute?.id ?? institute?.institute_id ?? institute?.instituteId ?? institute?.institute?.id;
const getName = (institute) => institute?.institute_name ?? institute?.instituteName ?? institute?.name ?? institute?.institute?.name ?? `Institute ${getId(institute) ?? ""}`;
const getDomainRows = (response) => {
  const candidates = [response?.data?.domains, response?.domains, response?.data?.data, response?.data, response];
  return candidates.find(Array.isArray) || [];
};
const getSubdomain = (row) => row?.subdomain ?? row?.website?.subdomain ?? row?.domain?.subdomain ?? "";
const getStatus = (row) => String(row?.status ?? row?.website_status ?? row?.website?.status ?? (row?.is_published ? "PUBLISHED" : "NOT ASSIGNED")).toUpperCase();
const inputClass = "w-full rounded-xl border border-white/10 bg-[#211d2c] px-4 py-3 text-sm text-white outline-none transition focus:border-purple-400";
const buttonClass = "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50";

export default function AdminWebsiteDomains() {
  const [institutes, setInstitutes] = useState([]);
  const [domains, setDomains] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [checking, setChecking] = useState(false);
  const [apiReady, setApiReady] = useState(true);
  const [editing, setEditing] = useState(null);
  const [subdomain, setSubdomain] = useState("");
  const [availability, setAvailability] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const rootDomain = String(import.meta.env.VITE_PUBLIC_ROOT_DOMAIN || "yourdomain.com").replace(/^\*\./, "").replace(/^https?:\/\//, "").replace(/\/$/, "");

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [instituteResult, domainResult] = await Promise.all([
        getAllInstitutes(),
        getAdminWebsiteDomains(),
      ]);
      setInstitutes(getArray(instituteResult));
      setDomains(getDomainRows(domainResult));
      setApiReady(true);
    } catch (error) {
      const status = error?.response?.status;
      if (status === 404 || status === 405) {
        setApiReady(false);
        // Keep the page informative when the admin domain API has not been added to the backend yet.
        try {
          const instituteResult = await getAllInstitutes();
          setInstitutes(getArray(instituteResult));
        } catch (instituteError) {
          toast.error(instituteError?.response?.data?.message || "Could not load institutes.");
        }
      } else {
        toast.error(error?.response?.data?.message || "Could not load website domains. Check admin login and API connection.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData, refreshKey]);

  const rows = useMemo(() => {
    const domainByInstitute = new Map();
    domains.forEach((row) => {
      const id = row?.institute_id ?? row?.instituteId ?? row?.institute?.id ?? row?.id;
      if (id != null) domainByInstitute.set(String(id), row);
    });
    const merged = institutes.map((institute) => {
      const id = getId(institute);
      const domain = domainByInstitute.get(String(id)) || {};
      return { institute, id, name: getName(institute), domain, subdomain: normalize(getSubdomain(domain) || institute?.subdomain), status: getStatus(domain) };
    });
    const q = normalize(search);
    return merged.filter((row) => !q || normalize(row.name).includes(q) || String(row.id ?? "").includes(q) || row.subdomain.includes(q));
  }, [institutes, domains, search]);

  const assignedCount = rows.filter((row) => row.subdomain).length;
  const publishedCount = rows.filter((row) => row.subdomain && row.status === "PUBLISHED").length;

  const openEditor = (row) => {
    setEditing(row);
    setSubdomain(row.subdomain || "");
    setAvailability(null);
  };
  const closeEditor = () => { setEditing(null); setSubdomain(""); setAvailability(null); };

  const validateSubdomain = (value) => {
    const candidate = normalize(value);
    if (!candidate) return "Enter a subdomain.";
    if (candidate.length > 63) return "Subdomain must be 63 characters or fewer.";
    if (!/^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(candidate)) return "Use lowercase letters, numbers, and hyphens; do not start or end with a hyphen.";
    if (RESERVED.has(candidate)) return "This subdomain is reserved. Choose another name.";
    return "";
  };

  const checkAvailability = async () => {
    const candidate = normalize(subdomain);
    const validation = validateSubdomain(candidate);
    if (validation) { setAvailability({ available: false, message: validation }); return; }
    if (!apiReady) {
      setAvailability({ available: false, message: "The backend admin-domain endpoints are not deployed yet. Add the domain API before assigning a subdomain." });
      return;
    }
    setChecking(true);
    try {
      const result = await checkAdminSubdomain(candidate, editing?.id);
      const data = result?.data ?? result;
      const available = Boolean(data?.available ?? data?.isAvailable);
      setAvailability({ available, message: data?.message || (available ? "This subdomain is available." : "This subdomain is already in use.") });
    } catch (error) {
      setAvailability({ available: false, message: error?.response?.data?.message || "Availability check failed. Confirm the backend domain API is deployed." });
    } finally { setChecking(false); }
  };

  const saveAssignment = async (event) => {
    event.preventDefault();
    const candidate = normalize(subdomain);
    const validation = validateSubdomain(candidate);
    if (validation) { toast.error(validation); return; }
    if (!apiReady) { toast.error("Backend domain management endpoints are not deployed yet."); return; }
    if (availability?.available !== true) { toast.error("Check subdomain availability before saving."); return; }
    if (!editing?.id) { toast.error("Institute ID is missing. Refresh the institute list."); return; }
    setSaving(true);
    try {
      await assignAdminSubdomain(editing.id, candidate);
      toast.success("Subdomain assigned successfully.");
      closeEditor();
      setRefreshKey((key) => key + 1);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to assign subdomain.");
    } finally { setSaving(false); }
  };

  return (
    <div className="min-h-screen space-y-6 bg-[#171421] p-4 text-white sm:p-6 lg:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-purple-300"><Globe size={17} /> PLATFORM MANAGEMENT</div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Institute Domain Management</h1>
          <p className="mt-2 max-w-2xl text-sm text-white/60">Assign each institute a unique subdomain and manage its public website address from one place.</p>
        </div>
        <button type="button" onClick={() => setRefreshKey((key) => key + 1)} className={`${buttonClass} bg-white/10 text-white hover:bg-white/15`}><RefreshCw size={16} /> Refresh</button>
      </div>

      {!apiReady && <div className="flex items-start gap-3 rounded-2xl border border-amber-400/30 bg-amber-400/10 p-4 text-sm text-amber-100"><AlertCircle className="mt-0.5 shrink-0" size={19} /><div><p className="font-semibold">Backend integration required</p><p className="mt-1 text-amber-100/80">The admin domain API is not available yet. This page can display the institute list, but assignment and availability checking will work only after the matching protected backend endpoints are deployed.</p></div></div>}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"><div className="flex items-center justify-between"><span className="text-sm text-white/60">Total institutes</span><Building2 className="text-purple-300" size={21} /></div><div className="mt-3 text-3xl font-bold">{loading ? "—" : institutes.length}</div><p className="mt-1 text-xs text-white/40">From the admin institute directory</p></div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"><div className="flex items-center justify-between"><span className="text-sm text-white/60">Subdomains assigned</span><Link2 className="text-cyan-300" size={21} /></div><div className="mt-3 text-3xl font-bold">{loading ? "—" : assignedCount}</div><p className="mt-1 text-xs text-white/40">Institute URLs reserved</p></div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:col-span-2 xl:col-span-1"><div className="flex items-center justify-between"><span className="text-sm text-white/60">Published websites</span><CheckCircle2 className="text-emerald-300" size={21} /></div><div className="mt-3 text-3xl font-bold">{loading ? "—" : publishedCount}</div><p className="mt-1 text-xs text-white/40">Publicly available websites</p></div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.04]">
        <div className="flex flex-col gap-3 border-b border-white/10 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div><h2 className="font-semibold">Institute subdomains</h2><p className="mt-1 text-xs text-white/50">Base domain: {rootDomain}</p></div>
          <label className="relative block w-full sm:max-w-xs"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={17} /><input className={`${inputClass} pl-10`} value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search institute or subdomain" /></label>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-white/[0.025] text-xs uppercase tracking-wide text-white/45"><tr><th className="px-5 py-4 font-medium">Institute</th><th className="px-5 py-4 font-medium">Subdomain / URL</th><th className="px-5 py-4 font-medium">Website status</th><th className="px-5 py-4 text-right font-medium">Action</th></tr></thead>
            <tbody className="divide-y divide-white/[0.07]">
              {loading ? <tr><td colSpan="4" className="px-5 py-12 text-center text-white/50">Loading institutes…</td></tr> : rows.length === 0 ? <tr><td colSpan="4" className="px-5 py-12 text-center text-white/50">No institutes found.</td></tr> : rows.map((row) => {
                const published = row.status === "PUBLISHED";
                const url = row.subdomain ? `https://${row.subdomain}.${rootDomain}` : "";
                return <tr key={String(row.id ?? row.name)} className="hover:bg-white/[0.025]"><td className="px-5 py-4"><div className="font-semibold">{row.name}</div><div className="mt-1 text-xs text-white/40">Institute ID: {row.id ?? "—"}</div></td><td className="px-5 py-4">{url ? <><div className="font-medium text-purple-200">{row.subdomain}</div><div className="mt-1 text-xs text-white/45">{url}</div></> : <span className="text-white/40">Not assigned</span>}</td><td className="px-5 py-4"><span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${published ? "bg-emerald-400/10 text-emerald-300" : row.subdomain ? "bg-amber-400/10 text-amber-200" : "bg-white/10 text-white/50"}`}><span className={`h-1.5 w-1.5 rounded-full ${published ? "bg-emerald-300" : row.subdomain ? "bg-amber-200" : "bg-white/40"}`} />{row.subdomain ? row.status.replaceAll("_", " ") : "NOT ASSIGNED"}</span></td><td className="px-5 py-4"><div className="flex justify-end gap-2">{url && published && <a href={url} target="_blank" rel="noreferrer" className={`${buttonClass} bg-white/10 text-white hover:bg-white/15`} title="Open public website"><ExternalLink size={15} /><span className="hidden lg:inline">Open</span></a>}<button type="button" onClick={() => openEditor(row)} className={`${buttonClass} bg-purple-500/15 text-purple-200 hover:bg-purple-500/25`}><Pencil size={15} />{row.subdomain ? "Edit" : "Assign"}</button></div></td></tr>;
              })}
            </tbody>
          </table>
        </div>
        <div className="border-t border-white/10 px-5 py-3 text-xs text-white/40">Showing {rows.length} of {institutes.length} institutes. A subdomain assignment does not publish a draft website by itself.</div>
      </div>

      {editing && <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4" role="dialog" aria-modal="true" aria-labelledby="domain-modal-title"><div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#201b2b] shadow-2xl"><div className="flex items-start justify-between border-b border-white/10 p-5"><div><h2 id="domain-modal-title" className="text-lg font-bold">{editing.subdomain ? "Edit institute subdomain" : "Assign institute subdomain"}</h2><p className="mt-1 text-sm text-white/55">{editing.name}</p></div><button type="button" onClick={closeEditor} className="rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-white" aria-label="Close"><X size={18} /></button></div><form onSubmit={saveAssignment} className="space-y-4 p-5"><div><label htmlFor="subdomain" className="mb-2 block text-sm font-medium">Subdomain name</label><div className="flex items-center gap-2"><input id="subdomain" autoFocus maxLength={63} className={inputClass} value={subdomain} onChange={(event) => { setSubdomain(event.target.value.toLowerCase().replace(/\s/g, "")); setAvailability(null); }} placeholder="e.g. kalaa"/><span className="shrink-0 text-sm text-white/50">.{rootDomain}</span></div><p className="mt-2 break-all text-xs text-white/40">Full URL: https://{normalize(subdomain) || "your-subdomain"}.{rootDomain}</p><p className="mt-1 text-xs text-white/40">Use lowercase letters, numbers and hyphens. Reserved names cannot be used.</p></div>{availability && <div className={`flex items-start gap-2 rounded-xl p-3 text-sm ${availability.available ? "bg-emerald-400/10 text-emerald-200" : "bg-rose-400/10 text-rose-200"}`}><AlertCircle size={17} className="mt-0.5 shrink-0"/><span>{availability.message}</span></div>}<div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end"><button type="button" onClick={closeEditor} className={`${buttonClass} bg-white/10 text-white hover:bg-white/15`}>Cancel</button><button type="button" onClick={checkAvailability} disabled={checking || saving || !normalize(subdomain)} className={`${buttonClass} bg-cyan-500/15 text-cyan-200 hover:bg-cyan-500/25`}>{checking ? "Checking…" : "Check availability"}</button><button type="submit" disabled={saving || checking || availability?.available !== true} className={`${buttonClass} bg-purple-600 text-white hover:bg-purple-500`}>{saving ? "Saving…" : "Save subdomain"}</button></div></form></div></div>}
    </div>
  );
}
