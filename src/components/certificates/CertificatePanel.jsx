// import { useCallback, useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { Award, RefreshCw, CheckCircle, XCircle, Send, FileBadge } from "lucide-react";
// import { getCertificateRequests, getIssuedCertificates, submitCertificateRequest, reviewCertificateRequest, issueCertificate, getAdminCertificateStats, getAdminCertificateRequests, getAdminIssuedCertificates, createCertificateTemplate } from "../../services/certificateService";

// const statusClass = (s) => ({pending:"bg-amber-500/15 text-amber-300",approved:"bg-blue-500/15 text-blue-300",rejected:"bg-red-500/15 text-red-300",issued:"bg-emerald-500/15 text-emerald-300",revoked:"bg-red-500/15 text-red-300"}[String(s||'').toLowerCase()] || "bg-white/10 text-gray-300");
// export default function CertificatePanel({role="TRAINER"}) {
//  const admin=role==="ADMIN", institute=role==="INSTITUTE";
//  const [requests,setRequests]=useState([]),[issued,setIssued]=useState([]),[stats,setStats]=useState({}),[loading,setLoading]=useState(true);
//  const [studentId,setStudentId]=useState(""),[classId,setClassId]=useState(""),[completionDate,setCompletionDate]=useState("");
//  const [templateName,setTemplateName]=useState("FineArts Certificate of Completion");
//  const load=useCallback(async()=>{setLoading(true);try{if(admin){const [r,i,s]=await Promise.all([getAdminCertificateRequests(),getAdminIssuedCertificates(),getAdminCertificateStats()]);setRequests(r.data||[]);setIssued(i.data||[]);setStats(s.data||{});}else{const [r,i]=await Promise.all([getCertificateRequests(),getIssuedCertificates()]);setRequests(r.data||[]);setIssued(i.data||[]);}}catch(e){toast.error(e?.response?.data?.message||"Could not load certificates. Check backend URL and run the SQL migration.");}finally{setLoading(false);}},[admin]);
//  useEffect(()=>{load();},[load]);
//  const act=async(fn,msg)=>{try{await fn();toast.success(msg);await load();}catch(e){toast.error(e?.response?.data?.message||"Action failed.");}};
//  const submit=async(e)=>{e.preventDefault();await act(()=>submitCertificateRequest({student_id:Number(studentId),class_id:Number(classId),completion_date:completionDate||null}),"Certificate request submitted");setStudentId("");setClassId("");setCompletionDate("");};
//  const review=(id,decision)=>act(()=>reviewCertificateRequest(id,{decision,review_notes:"Reviewed from certificate dashboard"}),`Request ${decision}`);
//  const issue=(id)=>act(()=>issueCertificate(id),"Certificate issued");
//  const template=async(e)=>{e.preventDefault();await act(()=>createCertificateTemplate({name:templateName,is_default:true}),"Template created");};
//  return <div className="space-y-6 text-white">
//   <div className="flex flex-wrap items-start justify-between gap-4"><div><div className="flex items-center gap-3"><span className="rounded-xl bg-amber-400/15 p-3 text-amber-300"><Award size={27}/></span><div><h1 className="text-2xl font-bold">Certificate Management</h1><p className="mt-1 text-sm text-gray-400">{admin?"Platform-wide certificate requests, issuance and templates":institute?"Review trainer requests and manage institute certificates":"Verify course completion and submit certificate requests"}</p></div></div></div><button onClick={load} className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2 text-sm hover:bg-white/5"><RefreshCw size={15}/> Refresh</button></div>
//   <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{[{label:"Requests",value:requests.length},{label:"Pending review",value:requests.filter(x=>x.request_status==="pending").length},{label:"Issued certificates",value:issued.length},{label:"Revoked",value:stats.revoked??issued.filter(x=>x.status==="revoked").length}].map(x=><div key={x.label} className="rounded-xl border border-white/10 bg-white/[0.03] p-4"><p className="text-sm text-gray-400">{x.label}</p><p className="mt-2 text-2xl font-semibold">{x.value}</p></div>)}</div>
//   {(role==="TRAINER"||admin)&&<form onSubmit={submit} className="grid gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 md:grid-cols-4"><div className="md:col-span-4"><h2 className="font-semibold">Create certificate request</h2><p className="mt-1 text-xs text-gray-400">Use the numeric student and class IDs from your database. Eligibility is reviewed by the authorized issuer.</p></div><input required type="number" min="1" value={studentId} onChange={e=>setStudentId(e.target.value)} placeholder="Student ID" className="rounded-lg border border-white/10 bg-gray-900 px-3 py-2 text-sm"/><input required type="number" min="1" value={classId} onChange={e=>setClassId(e.target.value)} placeholder="Class ID" className="rounded-lg border border-white/10 bg-gray-900 px-3 py-2 text-sm"/><input type="date" value={completionDate} onChange={e=>setCompletionDate(e.target.value)} className="rounded-lg border border-white/10 bg-gray-900 px-3 py-2 text-sm"/><button className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-4 py-2 font-semibold text-gray-950 hover:bg-amber-400"><Send size={15}/> Submit request</button></form>}
//   {admin&&<form onSubmit={template} className="flex flex-wrap gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4"><div className="min-w-56 flex-1"><h2 className="mb-2 font-semibold">Certificate templates</h2><input value={templateName} onChange={e=>setTemplateName(e.target.value)} className="w-full rounded-lg border border-white/10 bg-gray-900 px-3 py-2 text-sm" placeholder="Template name"/></div><div className="flex items-end"><button className="rounded-lg border border-white/15 px-4 py-2 text-sm hover:bg-white/5">Add template record</button></div><p className="w-full text-xs text-gray-400">This saves template metadata. The designed PDF background and PDF generation are separate integration steps.</p></form>}
//   <section className="overflow-hidden rounded-xl border border-white/10"><div className="flex items-center gap-2 border-b border-white/10 p-4"><FileBadge size={18} className="text-amber-300"/><h2 className="font-semibold">Certificate requests</h2></div>{loading?<p className="p-6 text-sm text-gray-400">Loading...</p>:requests.length===0?<p className="p-6 text-sm text-gray-400">No certificate requests yet.</p>:<div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="bg-white/[0.03] text-xs uppercase text-gray-400"><tr>{["Request","Student ID","Class ID","Status","Completion date","Actions"].map(x=><th key={x} className="px-4 py-3">{x}</th>)}</tr></thead><tbody>{requests.map(r=><tr key={r.id} className="border-t border-white/5"><td className="px-4 py-3">#{r.id}</td><td className="px-4 py-3">{r.student_id}</td><td className="px-4 py-3">{r.class_id}</td><td className="px-4 py-3"><span className={`rounded-full px-2 py-1 text-xs ${statusClass(r.request_status)}`}>{r.request_status}</span></td><td className="px-4 py-3">{r.completion_date?String(r.completion_date).slice(0,10):"—"}</td><td className="px-4 py-3"><div className="flex flex-wrap gap-2">{(admin||institute)&&r.request_status==="pending"&&<><button onClick={()=>review(r.id,"approved")} className="inline-flex items-center gap-1 rounded-md bg-emerald-500/15 px-2 py-1 text-xs text-emerald-300"><CheckCircle size={13}/> Approve</button><button onClick={()=>review(r.id,"rejected")} className="inline-flex items-center gap-1 rounded-md bg-red-500/15 px-2 py-1 text-xs text-red-300"><XCircle size={13}/> Reject</button></>}{(admin||institute)&&r.request_status==="approved"&&<button onClick={()=>issue(r.id)} className="rounded-md bg-amber-500 px-2 py-1 text-xs font-semibold text-gray-950">Issue certificate</button>}</div></td></tr>)}</tbody></table></div>}</section>
//   <section className="overflow-hidden rounded-xl border border-white/10"><div className="border-b border-white/10 p-4"><h2 className="font-semibold">Issued certificates</h2></div>{loading?<p className="p-6 text-sm text-gray-400">Loading...</p>:issued.length===0?<p className="p-6 text-sm text-gray-400">No issued certificates yet.</p>:<div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="bg-white/[0.03] text-xs uppercase text-gray-400"><tr>{["Certificate number","Student","Course","Issuer","Issued on","Status"].map(x=><th key={x} className="px-4 py-3">{x}</th>)}</tr></thead><tbody>{issued.map(c=><tr key={c.id} className="border-t border-white/5"><td className="px-4 py-3 font-mono">{c.certificate_number}</td><td className="px-4 py-3">{c.student_name_snapshot||c.student_id}</td><td className="px-4 py-3">{c.course_name_snapshot||c.class_id}</td><td className="px-4 py-3">{c.issuer_type}</td><td className="px-4 py-3">{c.issued_at?String(c.issued_at).slice(0,10):"—"}</td><td className="px-4 py-3"><span className={`rounded-full px-2 py-1 text-xs ${statusClass(c.status)}`}>{c.status}</span></td></tr>)}</tbody></table></div>}</section>
//   <p className="text-xs text-gray-500">PDF download generation is not yet wired in this build. Apply the SQL migration and validate your actual student/class schema before enabling production issuance.</p>
//  </div>;
// }




import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Award,
  RefreshCw,
  CheckCircle,
  XCircle,
  Send,
  FileBadge,
} from "lucide-react";

import {
  getCertificateRequests,
  getIssuedCertificates,
  submitCertificateRequest,
  reviewCertificateRequest,
  issueCertificate,
  getAdminCertificateStats,
  getAdminCertificateRequests,
  getAdminIssuedCertificates,
  createCertificateTemplate,
  getCertificateStudents,
  getCertificateClasses,
} from "../../services/certificateService";

/* -------------------- Helpers -------------------- */

const statusClass = (status) => {
  const styles = {
    pending: "bg-amber-500/15 text-amber-300",
    approved: "bg-blue-500/15 text-blue-300",
    rejected: "bg-red-500/15 text-red-300",
    issued: "bg-emerald-500/15 text-emerald-300",
    revoked: "bg-red-500/15 text-red-300",
  };

  return (
    styles[String(status || "").toLowerCase()] ||
    "bg-white/10 text-gray-300"
  );
};

const unwrapItems = (response) => {
  let value = response?.data ?? response;

  // Support common API response structures.
  for (let i = 0; i < 4; i += 1) {
    if (Array.isArray(value)) return value;
    if (!value || typeof value !== "object") return [];

    const possibleArrays = [
      value.data,
      value.users,
      value.students,
      value.classes,
      value.results,
      value.requests,
      value.certificates,
      value.rows,
    ];

    const next = possibleArrays.find(Array.isArray);

    if (next) return next;

    if (value.data && typeof value.data === "object") {
      value = value.data;
    } else {
      return [];
    }
  }

  return Array.isArray(value) ? value : [];
};

const normalizeId = (record) =>
  record?.id ??
  record?.account_id ??
  record?.user_id ??
  record?.class_id ??
  record?.classId ??
  null;

const getStudentName = (student) => {
  const name =
    student?.full_name ||
    student?.student_name ||
    student?.display_name ||
    student?.name ||
    student?.account_name ||
    [
      student?.first_name,
      student?.last_name,
    ]
      .filter(Boolean)
      .join(" ");

  return name || `Student #${normalizeId(student)}`;
};

const getClassName = (item) =>
  item?.class_name ||
  item?.title ||
  item?.name ||
  item?.course_name ||
  `Class #${normalizeId(item)}`;

const normalizeRecords = (response) =>
  unwrapItems(response)
    .map((record) => ({
      ...record,
      id: normalizeId(record),
    }))
    .filter(
      (record) =>
        record.id !== null &&
        record.id !== undefined &&
        String(record.id).trim() !== ""
    );

const formatDate = (value) => {
  if (!value) return "—";
  return String(value).slice(0, 10);
};

const getErrorMessage = (error, fallback) =>
  error?.response?.data?.message ||
  error?.response?.data?.error ||
  error?.message ||
  fallback;

/* -------------------- Component -------------------- */

export default function CertificatePanel({ role = "TRAINER" }) {
  const normalizedRole = String(role).toUpperCase();
  const admin = normalizedRole === "ADMIN";
  const institute = normalizedRole === "INSTITUTE";

  const [requests, setRequests] = useState([]);
  const [issued, setIssued] = useState([]);
  const [stats, setStats] = useState({});

  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);

  const [loading, setLoading] = useState(true);
  const [optionsLoading, setOptionsLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [templateSaving, setTemplateSaving] = useState(false);

  const [studentId, setStudentId] = useState("");
  const [classId, setClassId] = useState("");
  const [completionDate, setCompletionDate] = useState("");

  const [templateName, setTemplateName] = useState(
    "FineArts Certificate of Completion"
  );

  /* -------------------- Load dropdown options -------------------- */

  const loadOptions = useCallback(async () => {
    setOptionsLoading(true);

    try {
      // Uses your existing user route, NOT /students.
      const [studentResponse, classResponse] = await Promise.all([
        getCertificateStudents(),
        getCertificateClasses(),
      ]);

      const studentRecords = normalizeRecords(studentResponse);
      const classRecords = normalizeRecords(classResponse);

      setStudents(studentRecords);
      setClasses(classRecords);

      console.log(
        "Certificate dropdown data:",
        {
          students: studentRecords.length,
          classes: classRecords.length,
        }
      );

      if (studentRecords.length === 0) {
        console.warn(
          "No student records returned by /users/admin/certificate-users."
        );
      }

      if (classRecords.length === 0) {
        console.warn(
          "No class records returned by /classes."
        );
      }
    } catch (error) {
      console.error("Certificate dropdown loading error:", error);

      setStudents([]);
      setClasses([]);

      toast.error(
        getErrorMessage(
          error,
          "Could not load students and classes. Check the user and class API routes."
        )
      );
    } finally {
      setOptionsLoading(false);
    }
  }, []);

  /* -------------------- Load certificate data -------------------- */

  const load = useCallback(async () => {
    setLoading(true);

    try {
      if (admin) {
        const [
          requestResponse,
          issuedResponse,
          statsResponse,
        ] = await Promise.all([
          getAdminCertificateRequests(),
          getAdminIssuedCertificates(),
          getAdminCertificateStats(),
        ]);

        setRequests(unwrapItems(requestResponse));
        setIssued(unwrapItems(issuedResponse));

        const statsData =
          statsResponse?.data?.data ??
          statsResponse?.data ??
          statsResponse ??
          {};

        setStats(
          statsData && typeof statsData === "object"
            ? statsData
            : {}
        );
      } else {
        const [requestResponse, issuedResponse] =
          await Promise.all([
            getCertificateRequests(),
            getIssuedCertificates(),
          ]);

        setRequests(unwrapItems(requestResponse));
        setIssued(unwrapItems(issuedResponse));
      }
    } catch (error) {
      console.error("Certificate loading error:", error);

      toast.error(
        getErrorMessage(
          error,
          "Could not load certificates. Check authentication and backend routes."
        )
      );
    } finally {
      setLoading(false);
    }
  }, [admin]);

  useEffect(() => {
    load();
    loadOptions();
  }, [load, loadOptions]);

  /* -------------------- Refresh -------------------- */

  const refreshAll = () => {
    load();
    loadOptions();
  };

  /* -------------------- Submit certificate request -------------------- */

  const submit = async (event) => {
    event.preventDefault();

    if (!studentId || !classId) {
      toast.error("Please select both a student and a class.");
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        student_id: Number(studentId),
        class_id: Number(classId),
        completion_date: completionDate || null,
      };

      await submitCertificateRequest(payload);

      toast.success("Certificate request submitted.");

      setStudentId("");
      setClassId("");
      setCompletionDate("");

      await load();
    } catch (error) {
      console.error("Certificate request submission error:", error);

      toast.error(
        getErrorMessage(
          error,
          "Could not submit certificate request."
        )
      );
    } finally {
      setSubmitting(false);
    }
  };

  /* -------------------- Review request -------------------- */

  const review = async (id, decision) => {
    try {
      await reviewCertificateRequest(id, {
        decision,
        review_notes: "Reviewed from certificate dashboard",
      });

      toast.success(`Request ${decision}.`);
      await load();
    } catch (error) {
      console.error("Certificate review error:", error);

      toast.error(
        getErrorMessage(error, "Could not review certificate request.")
      );
    }
  };

  /* -------------------- Issue certificate -------------------- */

  const issue = async (requestId) => {
    try {
      await issueCertificate(requestId);

      toast.success("Certificate issued.");
      await load();
    } catch (error) {
      console.error("Certificate issuance error:", error);

      toast.error(
        getErrorMessage(error, "Could not issue certificate.")
      );
    }
  };

  /* -------------------- Create template -------------------- */

  const createTemplate = async (event) => {
    event.preventDefault();

    if (!templateName.trim()) {
      toast.error("Enter a certificate template name.");
      return;
    }

    setTemplateSaving(true);

    try {
      await createCertificateTemplate({
        name: templateName.trim(),
        is_default: true,
      });

      toast.success("Certificate template created.");
    } catch (error) {
      console.error("Certificate template error:", error);

      toast.error(
        getErrorMessage(error, "Could not create certificate template.")
      );
    } finally {
      setTemplateSaving(false);
    }
  };

  /* -------------------- Statistics -------------------- */

  const pendingCount = requests.filter(
    (request) =>
      String(request.request_status || "").toLowerCase() === "pending"
  ).length;

  const revokedCount =
    stats.revoked ??
    issued.filter(
      (certificate) =>
        String(certificate.status || "").toLowerCase() === "revoked"
    ).length;

  const inputClass =
    "w-full min-w-0 rounded-lg border border-white/10 bg-gray-900 px-3 py-3 text-sm text-white outline-none focus:border-purple-500 disabled:cursor-not-allowed disabled:opacity-60";

  /* -------------------- UI -------------------- */

  return (
    <div className="space-y-6 text-white">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="rounded-xl bg-amber-400/15 p-3 text-amber-300">
            <Award size={27} />
          </span>

          <div>
            <h1 className="text-2xl font-bold">
              Certificate Management
            </h1>

            <p className="mt-1 text-sm text-gray-400">
              {admin
                ? "Platform-wide certificate requests, issuance and templates"
                : institute
                ? "Review trainer requests and manage institute certificates"
                : "Verify course completion and submit certificate requests"}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={refreshAll}
          disabled={loading || optionsLoading}
          className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2 text-sm hover:bg-white/5 disabled:opacity-60"
        >
          <RefreshCw size={15} />
          Refresh
        </button>
      </div>

      {/* Statistics */}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Requests", value: requests.length },
          { label: "Pending review", value: pendingCount },
          { label: "Issued certificates", value: issued.length },
          { label: "Revoked", value: revokedCount },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
          >
            <p className="text-sm text-gray-400">{item.label}</p>
            <p className="mt-2 text-2xl font-semibold">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Create certificate request */}
      {(normalizedRole === "TRAINER" || admin) && (
        <form
          onSubmit={submit}
          className="grid gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 md:grid-cols-4"
        >
          <div className="md:col-span-4">
            <h2 className="font-semibold">
              Create certificate request
            </h2>

            <p className="mt-1 text-xs text-gray-400">
              Select a student and class by name. Their numeric IDs
              will be submitted automatically.
            </p>
          </div>

          {/* Student dropdown */}
          <select
            required
            value={studentId}
            onChange={(event) => setStudentId(event.target.value)}
            disabled={optionsLoading || students.length === 0}
            className={inputClass}
            aria-label="Select student"
          >
            <option value="">
              {optionsLoading
                ? "Loading students..."
                : students.length === 0
                ? "No students available"
                : "Select student"}
            </option>

            {students.map((student) => (
              <option key={String(student.id)} value={String(student.id)}>
                {getStudentName(student)} (ID: {student.id})
              </option>
            ))}
          </select>

          {/* Class dropdown */}
          <select
            required
            value={classId}
            onChange={(event) => setClassId(event.target.value)}
            disabled={optionsLoading || classes.length === 0}
            className={inputClass}
            aria-label="Select class"
          >
            <option value="">
              {optionsLoading
                ? "Loading classes..."
                : classes.length === 0
                ? "No classes available"
                : "Select class"}
            </option>

            {classes.map((course) => (
              <option key={String(course.id)} value={String(course.id)}>
                {getClassName(course)} (ID: {course.id})
              </option>
            ))}
          </select>

          {/* Completion date */}
          <input
            type="date"
            value={completionDate}
            onChange={(event) => setCompletionDate(event.target.value)}
            className={inputClass}
            aria-label="Completion date"
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={
              submitting ||
              optionsLoading ||
              students.length === 0 ||
              classes.length === 0
            }
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-4 py-3 font-semibold text-gray-950 hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send size={15} />
            {submitting ? "Submitting..." : "Submit request"}
          </button>

          {!optionsLoading && students.length === 0 && (
            <p className="text-xs text-amber-300 md:col-span-4">
              No users were returned by the certificate users API.
              Check GET /api/users/admin/certificate-users.
            </p>
          )}

          {!optionsLoading && classes.length === 0 && (
            <p className="text-xs text-amber-300 md:col-span-4">
              No classes were returned by the classes API.
              Check GET /api/classes.
            </p>
          )}
        </form>
      )}

      {/* Certificate templates */}
      {admin && (
        <form
          onSubmit={createTemplate}
          className="flex flex-wrap gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4"
        >
          <div className="min-w-56 flex-1">
            <h2 className="mb-2 font-semibold">
              Certificate templates
            </h2>

            <input
              value={templateName}
              onChange={(event) => setTemplateName(event.target.value)}
              className={inputClass}
              placeholder="Template name"
              required
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              disabled={templateSaving}
              className="rounded-lg border border-white/15 px-4 py-3 text-sm hover:bg-white/5 disabled:opacity-60"
            >
              {templateSaving ? "Saving..." : "Add template record"}
            </button>
          </div>

          <p className="w-full text-xs text-gray-400">
            This saves template metadata. PDF design and generation
            require a separate integration.
          </p>
        </form>
      )}

      {/* Certificate requests table */}
      <section className="overflow-hidden rounded-xl border border-white/10">
        <div className="flex items-center gap-2 border-b border-white/10 p-4">
          <FileBadge size={18} className="text-amber-300" />
          <h2 className="font-semibold">Certificate requests</h2>
        </div>

        {loading ? (
          <p className="p-6 text-sm text-gray-400">Loading...</p>
        ) : requests.length === 0 ? (
          <p className="p-6 text-sm text-gray-400">
            No certificate requests yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/[0.03] text-xs uppercase text-gray-400">
                <tr>
                  {[
                    "Request",
                    "Student",
                    "Class",
                    "Status",
                    "Completion date",
                    "Actions",
                  ].map((heading) => (
                    <th key={heading} className="px-4 py-3">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {requests.map((request) => {
                  const requestStatus = String(
                    request.request_status || ""
                  ).toLowerCase();

                  return (
                    <tr
                      key={request.id}
                      className="border-t border-white/5"
                    >
                      <td className="px-4 py-3">#{request.id}</td>

                      <td className="px-4 py-3">
                        {request.student_name_snapshot ||
                          request.student_name ||
                          request.student_id}
                      </td>

                      <td className="px-4 py-3">
                        {request.course_name_snapshot ||
                          request.class_name ||
                          request.class_id}
                      </td>

                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-2 py-1 text-xs ${statusClass(
                            requestStatus
                          )}`}
                        >
                          {request.request_status || "—"}
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        {formatDate(request.completion_date)}
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-2">
                          {(admin || institute) &&
                            requestStatus === "pending" && (
                              <>
                                <button
                                  type="button"
                                  onClick={() =>
                                    review(request.id, "approved")
                                  }
                                  className="inline-flex items-center gap-1 rounded-md bg-emerald-500/15 px-2 py-1 text-xs text-emerald-300"
                                >
                                  <CheckCircle size={13} />
                                  Approve
                                </button>

                                <button
                                  type="button"
                                  onClick={() =>
                                    review(request.id, "rejected")
                                  }
                                  className="inline-flex items-center gap-1 rounded-md bg-red-500/15 px-2 py-1 text-xs text-red-300"
                                >
                                  <XCircle size={13} />
                                  Reject
                                </button>
                              </>
                            )}

                          {(admin || institute) &&
                            requestStatus === "approved" && (
                              <button
                                type="button"
                                onClick={() => issue(request.id)}
                                className="rounded-md bg-amber-500 px-2 py-1 text-xs font-semibold text-gray-950"
                              >
                                Issue certificate
                              </button>
                            )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Issued certificates table */}
      <section className="overflow-hidden rounded-xl border border-white/10">
        <div className="border-b border-white/10 p-4">
          <h2 className="font-semibold">Issued certificates</h2>
        </div>

        {loading ? (
          <p className="p-6 text-sm text-gray-400">Loading...</p>
        ) : issued.length === 0 ? (
          <p className="p-6 text-sm text-gray-400">
            No issued certificates yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/[0.03] text-xs uppercase text-gray-400">
                <tr>
                  {[
                    "Certificate number",
                    "Student",
                    "Course",
                    "Issuer",
                    "Issued on",
                    "Status",
                  ].map((heading) => (
                    <th key={heading} className="px-4 py-3">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {issued.map((certificate) => (
                  <tr
                    key={certificate.id}
                    className="border-t border-white/5"
                  >
                    <td className="px-4 py-3 font-mono">
                      {certificate.certificate_number || "—"}
                    </td>

                    <td className="px-4 py-3">
                      {certificate.student_name_snapshot ||
                        certificate.student_name ||
                        certificate.student_id ||
                        "—"}
                    </td>

                    <td className="px-4 py-3">
                      {certificate.course_name_snapshot ||
                        certificate.class_name ||
                        certificate.class_id ||
                        "—"}
                    </td>

                    <td className="px-4 py-3">
                      {certificate.issuer_type || "—"}
                    </td>

                    <td className="px-4 py-3">
                      {formatDate(certificate.issued_at)}
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-1 text-xs ${statusClass(
                          certificate.status
                        )}`}
                      >
                        {certificate.status || "—"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <p className="text-xs text-gray-500">
        PDF download generation is not yet connected. Certificate
        issuance should validate student enrollment and completion
        on the backend.
      </p>
    </div>
  );
}
