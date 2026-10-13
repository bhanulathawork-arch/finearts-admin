
import React, { useState } from "react";
import {
  ArrowLeft,
  FileText,
  Link as LinkIcon,
  Send,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../../services/api";

const ASSIGNMENTS_ROUTE = "/institute/website/preview/lms/assignments";

const getAssignment = (location) => location?.state?.assignment || null;

const getTitle = (assignment) =>
  assignment?.title || assignment?.assignment_title || "Assignment";

const getClassName = (assignment) =>
  assignment?.class_name ||
  assignment?.class_title ||
  assignment?.class?.name ||
  assignment?.class?.title ||
  assignment?.course_name ||
  "Class";

const getDescription = (assignment) =>
  assignment?.description || assignment?.instructions || assignment?.details || "";

const getDueDate = (assignment) => {
  const value = assignment?.due_date || assignment?.dueDate || assignment?.deadline;
  if (!value) return "No deadline";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function WebsiteAssignmentSubmit() {
  const navigate = useNavigate();
  const location = useLocation();
  const assignment = getAssignment(location);

  const [submissionText, setSubmissionText] = useState("");
  const [submissionUrl, setSubmissionUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  if (!assignment) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
        <div className="w-full max-w-lg rounded-2xl border border-blue-500/25 bg-[#050505] p-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-red-300">
            <AlertCircle size={28} />
          </div>
          <h1 className="mt-5 text-2xl font-bold">Assignment not selected</h1>
          <p className="mt-2 text-sm text-white/50">
            Please open an assignment first and then click Submit Assignment.
          </p>
          <button
            type="button"
            onClick={() => navigate(ASSIGNMENTS_ROUTE)}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-700 to-blue-500 px-6 py-3 text-sm font-bold text-white transition hover:brightness-110"
          >
            <ArrowLeft size={17} /> Back to Assignments
          </button>
        </div>
      </div>
    );
  }

  const assignmentId =
    assignment?.id ?? assignment?.assignment_id ?? assignment?.assignmentId;

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    if (!assignmentId) {
      setError("Assignment ID is missing.");
      return;
    }

    if (!submissionText.trim() && !submissionUrl.trim()) {
      setError("Please enter your answer or provide a submission URL.");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        submission_text: submissionText.trim() || null,
        submission_url: submissionUrl.trim() || null,
      };

      await API.post(`/assignments/${assignmentId}/submit`, payload);
      setSuccess(true);
      setTimeout(() => navigate(ASSIGNMENTS_ROUTE), 1200);
    } catch (submitError) {
      console.error("Website assignment submission error:", submitError);
      setError(
        submitError?.response?.data?.message ||
          submitError?.response?.data?.error ||
          submitError?.message ||
          "Unable to submit assignment."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header: same structure as the original Submit Assignment page */}
      <header className="sticky top-0 z-50 border-b border-blue-500/20 bg-black/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between px-6">
          <button
            type="button"
            onClick={() => navigate(ASSIGNMENTS_ROUTE)}
            className="flex items-center gap-3 text-sm font-medium text-white/75 transition hover:text-blue-400"
          >
            <ArrowLeft size={18} /> Back to Assignments
          </button>
          <div className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-xl font-semibold text-transparent">
            FineArts
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[900px] px-6 py-10">
        {/* Title */}
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
            Submit Assignment
          </p>
          <h1 className="mt-2 text-3xl font-bold md:text-4xl">
            {getTitle(assignment)}
          </h1>
          <p className="mt-2 text-sm text-white/50">{getClassName(assignment)}</p>
        </div>

        {/* Assignment information */}
        <section className="mb-6 rounded-2xl border border-blue-500/25 bg-[#050505] p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
              <FileText size={22} />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-lg font-bold">Assignment Details</h2>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-white/65">
                {getDescription(assignment) || "No additional instructions provided."}
              </p>
              <div className="mt-5 inline-flex rounded-lg border border-blue-500/15 bg-blue-500/[0.06] px-4 py-2 text-xs text-white/60">
                Due: <span className="ml-1 font-semibold text-white/85">{getDueDate(assignment)}</span>
              </div>
            </div>
          </div>
        </section>

        {success && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-emerald-300">
            <CheckCircle2 size={20} />
            <div>
              <p className="font-semibold">Assignment submitted successfully.</p>
              <p className="mt-1 text-xs text-emerald-300/70">Redirecting to assignments...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-300">
            <AlertCircle size={20} className="mt-0.5 shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Submission form */}
        <form onSubmit={submit} className="rounded-2xl border border-blue-500/25 bg-[#050505] p-6">
          <div>
            <label className="mb-2 block text-sm font-semibold text-white/80">Your Answer</label>
            <textarea
              value={submissionText}
              onChange={(event) => setSubmissionText(event.target.value)}
              rows={10}
              placeholder="Write your answer or describe your work..."
              className="w-full resize-y rounded-xl border border-blue-500/20 bg-black px-4 py-4 text-sm leading-6 text-white outline-none placeholder:text-white/30 focus:border-blue-500/70"
            />
            <p className="mt-2 text-xs text-white/35">You can enter your answer here.</p>
          </div>

          <div className="mt-6">
            <label className="mb-2 block text-sm font-semibold text-white/80">
              Submission File / Link
              <span className="ml-2 font-normal text-white/35">Optional</span>
            </label>
            <div className="relative">
              <LinkIcon size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35" />
              <input
                type="url"
                value={submissionUrl}
                onChange={(event) => setSubmissionUrl(event.target.value)}
                placeholder="https://drive.google.com/..."
                className="h-[52px] w-full rounded-xl border border-blue-500/20 bg-black pl-11 pr-4 text-sm text-white outline-none placeholder:text-white/30 focus:border-blue-500/70"
              />
            </div>
            <p className="mt-2 text-xs text-white/35">
              Add a Google Drive, OneDrive, Dropbox or other publicly accessible submission link.
            </p>
          </div>

          <div className="mt-8 flex flex-col-reverse gap-3 border-t border-blue-500/15 pt-6 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => navigate(ASSIGNMENTS_ROUTE)}
              disabled={submitting}
              className="rounded-xl border border-blue-500/30 bg-transparent px-6 py-3 text-sm font-semibold text-white/70 transition hover:bg-blue-500/10 hover:text-white disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || success}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-700 to-blue-500 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send size={17} /> Submit Assignment
                </>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
