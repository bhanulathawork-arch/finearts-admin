// src/pages/institute/Website/WebsiteTemplate.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  Eye,
  LayoutTemplate,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";

import {
  getTemplates,
  getWebsiteData,
  updateTemplate,
} from "../../services/websiteService";

export default function WebsiteTemplate() {
  const navigate = useNavigate();

  const [templates, setTemplates] = useState([]);
  const [selectedTemplateId, setSelectedTemplateId] =
    useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [previewTemplate, setPreviewTemplate] =
    useState(null);

  /* =========================================================
     LOAD TEMPLATES + CURRENT WEBSITE
  ========================================================= */

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);

      const [templateData, websiteData] =
        await Promise.all([
          getTemplates(),
          getWebsiteData(),
        ]);

      console.log(
        "Website templates:",
        templateData
      );

      console.log(
        "Website data:",
        websiteData
      );

      setTemplates(
        Array.isArray(templateData)
          ? templateData
          : []
      );

      /*
        Backend structure:

        websiteData = {
          institute: {...},
          website: {
            template_id: 1,
            template_name: "...",
            template_key: "..."
          },
          sections: [...],
          branding: {...}
        }
      */

      const currentTemplateId =
        websiteData?.website?.template_id ??
        websiteData?.website?.templateId ??
        null;

      setSelectedTemplateId(
        currentTemplateId
      );

    } catch (error) {
      console.error(
        "Failed to load website templates:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to load website templates"
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     SELECT TEMPLATE
  ========================================================= */

  const handleSelectTemplate = async (
    template
  ) => {
    if (!template?.id) {
      toast.error("Invalid template");
      return;
    }

    /*
      If already selected, don't call API again.
    */

    if (
      Number(selectedTemplateId) ===
      Number(template.id)
    ) {
      toast.success(
        "This template is already selected"
      );

      return;
    }

    try {
      setSaving(true);

      await updateTemplate(
        template.id
      );

      setSelectedTemplateId(
        template.id
      );

      toast.success(
        "Template selected successfully"
      );

    } catch (error) {
      console.error(
        "Template selection error:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to select template"
      );
    } finally {
      setSaving(false);
    }
  };

  /* =========================================================
     PREVIEW
  ========================================================= */

  const handlePreview = (template) => {
    setPreviewTemplate(template);
  };

  /* =========================================================
     CLOSE PREVIEW
  ========================================================= */

  const closePreview = () => {
    setPreviewTemplate(null);
  };

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">

        <div className="flex items-center gap-3 text-gray-400">

          <Loader2
            size={22}
            className="animate-spin"
          />

          <span>
            Loading templates...
          </span>

        </div>

      </div>
    );
  }

  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <div className="space-y-6">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div className="flex items-center gap-4">

          <button
            type="button"
            onClick={() =>
              navigate("/institute/website")
            }
            className="p-2 rounded-xl text-gray-400 hover:bg-[#2a2a35] hover:text-white transition"
          >
            <ArrowLeft size={22} />
          </button>

          <div>

            <div className="flex items-center gap-2">

              <LayoutTemplate
                size={22}
                className="text-purple-400"
              />

              <h1 className="text-2xl font-bold text-white">
                Website Template
              </h1>

            </div>

            <p className="text-sm text-gray-400 mt-1">
              Choose a design template for your institute website
            </p>

          </div>

        </div>

        <button
          type="button"
          onClick={() =>
            navigate(
              "/institute/website/sections"
            )
          }
          disabled={!selectedTemplateId}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>

      </div>


      {/* =====================================================
          CURRENT TEMPLATE
      ===================================================== */}

      {selectedTemplateId && (
        <div className="bg-[#151519] border border-green-500/20 rounded-2xl p-5">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">

              <Check
                size={20}
                className="text-green-400"
              />

            </div>

            <div>

              <p className="text-xs text-gray-500">
                Current Template
              </p>

              <p className="text-white font-semibold">

                {templates.find(
                  (template) =>
                    Number(template.id) ===
                    Number(selectedTemplateId)
                )?.name ||
                  "Selected Template"}

              </p>

            </div>

          </div>

        </div>
      )}


      {/* =====================================================
          EMPTY STATE
      ===================================================== */}

      {templates.length === 0 ? (

        <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-10 text-center">

          <LayoutTemplate
            size={40}
            className="mx-auto text-gray-600 mb-4"
          />

          <h2 className="text-lg font-semibold text-white">
            No templates available
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            No active website templates are currently available.
          </p>

        </div>

      ) : (

        /* =====================================================
           TEMPLATE GRID
        ===================================================== */

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {templates.map((template) => {

            const isSelected =
              Number(selectedTemplateId) ===
              Number(template.id);

            return (
              <div
                key={template.id}
                className={`relative overflow-hidden rounded-2xl border transition-all duration-200 ${
                  isSelected
                    ? "border-purple-500 ring-1 ring-purple-500/40"
                    : "border-[#2c2c35] hover:border-[#4b4560]"
                } bg-[#151519]`}
              >

                {/* =========================================
                    SELECTED BADGE
                ========================================= */}

                {isSelected && (
                  <div className="absolute top-4 right-4 z-10">

                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/15 border border-green-500/20">

                      <Check
                        size={14}
                        className="text-green-400"
                      />

                      <span className="text-xs font-semibold text-green-400">
                        Selected
                      </span>

                    </div>

                  </div>
                )}


                {/* =========================================
                    TEMPLATE PREVIEW
                ========================================= */}

                <div className="relative h-48 bg-gradient-to-br from-[#27233a] to-[#16151d] overflow-hidden">

                  {template.preview_image ? (

                    <img
                      src={template.preview_image}
                      alt={template.name}
                      className="w-full h-full object-cover"
                    />

                  ) : (

                    <TemplatePlaceholder
                      template={template}
                    />

                  )}

                  {/* Preview overlay */}

                  <div className="absolute inset-0 bg-black/0 hover:bg-black/40 transition flex items-center justify-center">

                    <button
                      type="button"
                      onClick={() =>
                        handlePreview(
                          template
                        )
                      }
                      className="opacity-0 hover:opacity-100 group-hover:opacity-100 px-4 py-2 rounded-xl bg-black/70 text-white text-sm font-medium flex items-center gap-2 transition"
                    >
                      <Eye size={16} />
                      Preview
                    </button>

                  </div>

                </div>


                {/* =========================================
                    TEMPLATE INFORMATION
                ========================================= */}

                <div className="p-5">

                  <h3 className="text-lg font-semibold text-white">

                    {template.name ||
                      "Untitled Template"}

                  </h3>

                  <p className="text-sm text-gray-500 mt-2 min-h-[40px]">

                    {template.description ||
                      "No description available."}

                  </p>


                  {/* Template key */}

                  {template.template_key && (
                    <div className="mt-3">

                      <span className="inline-flex px-2.5 py-1 rounded-lg bg-[#24212f] text-xs text-gray-400">

                        {template.template_key}

                      </span>

                    </div>
                  )}


                  {/* Buttons */}

                  <div className="flex gap-3 mt-5">

                    <button
                      type="button"
                      onClick={() =>
                        handlePreview(
                          template
                        )
                      }
                      className="flex-1 px-4 py-2.5 rounded-xl border border-[#34313f] text-gray-300 hover:bg-[#211f29] transition flex items-center justify-center gap-2 text-sm font-medium"
                    >

                      <Eye size={16} />

                      Preview

                    </button>


                    <button
                      type="button"
                      onClick={() =>
                        handleSelectTemplate(
                          template
                        )
                      }
                      disabled={
                        saving ||
                        isSelected
                      }
                      className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
                        isSelected
                          ? "bg-green-500/10 text-green-400 border border-green-500/20"
                          : "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90"
                      } disabled:opacity-60 disabled:cursor-not-allowed`}
                    >

                      {saving &&
                      !isSelected ? (
                        <span className="flex items-center justify-center gap-2">

                          <Loader2
                            size={16}
                            className="animate-spin"
                          />

                          Saving...

                        </span>
                      ) : isSelected ? (
                        <span className="flex items-center justify-center gap-2">

                          <Check size={16} />

                          Selected

                        </span>
                      ) : (
                        "Select Template"
                      )}

                    </button>

                  </div>

                </div>

              </div>
            );
          })}

        </div>
      )}


      {/* =====================================================
          PREVIEW MODAL
      ===================================================== */}

      {previewTemplate && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closePreview}
        >

          <div
            className="w-full max-w-5xl max-h-[90vh] bg-[#151519] border border-[#2c2c35] rounded-2xl overflow-hidden shadow-2xl"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* Modal Header */}

            <div className="flex items-center justify-between px-6 py-4 border-b border-[#2c2c35]">

              <div>

                <h2 className="text-lg font-semibold text-white">
                  {previewTemplate.name}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Template Preview
                </p>

              </div>

              <button
                type="button"
                onClick={closePreview}
                className="px-4 py-2 rounded-xl border border-[#34313f] text-gray-300 hover:bg-[#24212f]"
              >
                Close
              </button>

            </div>


            {/* Preview Content */}

            <div className="overflow-y-auto max-h-[calc(90vh-80px)]">

              {previewTemplate.preview_image ? (

                <img
                  src={
                    previewTemplate.preview_image
                  }
                  alt={
                    previewTemplate.name
                  }
                  className="w-full object-contain"
                />

              ) : (

                <TemplateLargePreview
                  template={
                    previewTemplate
                  }
                />

              )}

            </div>

          </div>

        </div>
      )}

    </div>
  );
}


/* =========================================================
   TEMPLATE PLACEHOLDER
========================================================= */

function TemplatePlaceholder({
  template,
}) {
  const style =
    template?.template_key ||
    template?.style ||
    "modern";

  const styles = {
    "modern-academy": {
      hero:
        "from-purple-600 via-indigo-500 to-blue-500",
      card: "bg-white/10",
      text: "MODERN ACADEMY",
    },

    "classic-education": {
      hero:
        "from-amber-700 via-orange-600 to-yellow-500",
      card: "bg-white/10",
      text: "CLASSIC EDUCATION",
    },

    "creative-studio": {
      hero:
        "from-pink-600 via-purple-600 to-indigo-600",
      card: "bg-white/10",
      text: "CREATIVE STUDIO",
    },

    "tech-hub": {
      hero:
        "from-slate-800 via-cyan-700 to-blue-700",
      card: "bg-white/10",
      text: "TECH HUB",
    },

    minimalist: {
      hero:
        "from-gray-700 via-gray-600 to-gray-500",
      card: "bg-white/10",
      text: "MINIMALIST",
    },

    "bold-impact": {
      hero:
        "from-red-600 via-orange-500 to-yellow-500",
      card: "bg-white/10",
      text: "BOLD IMPACT",
    },
  };

  const selected =
    styles[style] ||
    styles["modern-academy"];

  return (
    <div
      className={`w-full h-full bg-gradient-to-br ${selected.hero} p-6 flex flex-col justify-between`}
    >

      <div className="flex items-center justify-between">

        <div className="w-8 h-8 rounded-lg bg-white/20" />

        <div className="w-16 h-2 rounded-full bg-white/30" />

      </div>

      <div>

        <div className="w-24 h-2 rounded-full bg-white/30 mb-3" />

        <h4 className="text-white text-xl font-bold tracking-wide">
          {selected.text}
        </h4>

        <div className="flex gap-2 mt-4">

          <div
            className={`w-16 h-5 rounded ${selected.card}`}
          />

          <div
            className={`w-16 h-5 rounded ${selected.card}`}
          />

        </div>

      </div>

    </div>
  );
}


/* =========================================================
   LARGE PREVIEW
========================================================= */

function TemplateLargePreview({
  template,
}) {
  const style =
    template?.template_key ||
    template?.style ||
    "modern";

  const gradients = {
    "modern-academy":
      "from-purple-700 via-indigo-600 to-blue-600",

    "classic-education":
      "from-amber-700 via-orange-600 to-yellow-500",

    "creative-studio":
      "from-pink-700 via-purple-700 to-indigo-700",

    "tech-hub":
      "from-slate-900 via-cyan-800 to-blue-800",

    minimalist:
      "from-gray-800 via-gray-700 to-gray-600",

    "bold-impact":
      "from-red-700 via-orange-600 to-yellow-500",
  };

  const gradient =
    gradients[style] ||
    gradients["modern-academy"];

  return (
    <div>

      {/* Hero */}

      <div
        className={`min-h-[420px] bg-gradient-to-br ${gradient} flex flex-col items-center justify-center text-center px-6`}
      >

        <div className="w-20 h-20 rounded-2xl bg-white/20 mb-8" />

        <p className="text-white/70 uppercase tracking-[0.3em] text-sm mb-4">
          Your Institute
        </p>

        <h1 className="text-4xl md:text-6xl font-bold text-white">
          {template.name}
        </h1>

        <p className="max-w-2xl text-white/80 mt-5 text-lg">
          Professional education and training
          for your students.
        </p>

        <button
          type="button"
          className="mt-8 px-7 py-3 rounded-xl bg-white text-gray-900 font-semibold"
        >
          Explore Courses
        </button>

      </div>


      {/* About */}

      <div className="bg-white p-10 md:p-16">

        <div className="max-w-5xl mx-auto">

          <div className="w-20 h-2 bg-gray-300 rounded mb-5" />

          <h2 className="text-3xl font-bold text-gray-900">
            About Our Institute
          </h2>

          <p className="text-gray-600 mt-4 max-w-3xl leading-7">
            Build your institute website using
            your existing institute information,
            courses, trainers and batches.
          </p>

        </div>

      </div>


      {/* Courses */}

      <div className="bg-gray-100 p-10 md:p-16">

        <div className="max-w-5xl mx-auto">

          <h2 className="text-3xl font-bold text-gray-900 text-center">
            Our Courses
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">

            {[1, 2, 3].map(
              (item) => (
                <div
                  key={item}
                  className="bg-white rounded-2xl p-6 shadow-sm"
                >

                  <div className="w-full h-28 rounded-xl bg-gray-200" />

                  <div className="w-24 h-3 rounded bg-gray-300 mt-5" />

                  <div className="w-full h-2 rounded bg-gray-200 mt-3" />

                  <div className="w-3/4 h-2 rounded bg-gray-200 mt-2" />

                </div>
              )
            )}

          </div>

        </div>

      </div>


      {/* Contact */}

      <div className="bg-gray-900 p-10 md:p-16">

        <div className="max-w-5xl mx-auto text-center">

          <h2 className="text-3xl font-bold text-white">
            Get In Touch
          </h2>

          <p className="text-gray-400 mt-3">
            Contact your institute for more
            information.
          </p>

        </div>

      </div>

    </div>
  );
}