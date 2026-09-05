// src/components/website/TemplateCard.jsx

import {
  Check,
  Eye,
  LayoutTemplate,
} from "lucide-react";

export default function TemplateCard({
  template,
  selected = false,
  onSelect,
  onPreview,
  disabled = false,
}) {
  if (!template) {
    return null;
  }

  const {
    id,
    name,
    description,
    thumbnail,
    style,
    popularity,
  } = template;

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border transition-all duration-200 ${
        selected
          ? "border-purple-500 ring-2 ring-purple-500/20 bg-purple-500/5"
          : "border-[#2c2c35] bg-[#151519] hover:border-[#49445a]"
      }`}
    >
      {/* =====================================================
          SELECTED BADGE
      ===================================================== */}

      {selected && (
        <div className="absolute left-3 top-3 z-20 flex items-center gap-1.5 rounded-full bg-purple-500 px-3 py-1 text-xs font-semibold text-white">
          <Check size={13} />
          Selected
        </div>
      )}

      {/* =====================================================
          PREVIEW IMAGE
      ===================================================== */}

      <div className="relative h-48 overflow-hidden bg-[#202027]">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <TemplatePlaceholder
            style={style}
          />
        )}

        {/* Overlay */}

        <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/35" />

        {/* Preview button */}

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();

            if (onPreview) {
              onPreview(template);
            }
          }}
          disabled={disabled}
          className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-xl bg-black/75 px-4 py-2.5 text-sm font-medium text-white opacity-0 backdrop-blur-sm transition group-hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Eye size={17} />
          Preview
        </button>
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="p-5">

        <div className="flex items-start justify-between gap-3">

          <div className="min-w-0">

            <h3 className="truncate text-lg font-bold text-white">
              {name || "Website Template"}
            </h3>

            {style && (
              <span className="mt-1 inline-block text-xs capitalize text-gray-500">
                {style} design
              </span>
            )}

          </div>

          {popularity !== undefined &&
            popularity !== null && (
              <div className="shrink-0 rounded-lg bg-[#24212f] px-2.5 py-1 text-xs text-gray-400">
                {popularity}% popular
              </div>
            )}

        </div>

        <p className="mt-3 min-h-[42px] text-sm leading-6 text-gray-500">
          {description ||
            "A professional website template for your institute."}
        </p>

        {/* ===================================================
            SELECT BUTTON
        =================================================== */}

        <button
          type="button"
          onClick={() => {
            if (onSelect) {
              onSelect(template);
            }
          }}
          disabled={disabled}
          className={`mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${
            selected
              ? "bg-green-500/10 text-green-400 border border-green-500/20"
              : "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90"
          }`}
        >
          {selected ? (
            <>
              <Check size={17} />
              Selected Template
            </>
          ) : (
            <>
              <LayoutTemplate size={17} />
              Use This Template
            </>
          )}
        </button>

      </div>
    </div>
  );
}


/* =========================================================
   TEMPLATE PLACEHOLDER
========================================================= */

function TemplatePlaceholder({
  style = "modern",
}) {
  const layouts = {
    modern: {
      hero: "bg-gradient-to-br from-purple-600/40 to-blue-500/20",
      accent: "bg-purple-400",
    },

    classic: {
      hero: "bg-gradient-to-br from-blue-600/40 to-gray-700/30",
      accent: "bg-blue-400",
    },

    creative: {
      hero: "bg-gradient-to-br from-pink-500/40 to-orange-400/20",
      accent: "bg-pink-400",
    },

    tech: {
      hero: "bg-gradient-to-br from-cyan-500/30 to-indigo-600/30",
      accent: "bg-cyan-400",
    },

    minimal: {
      hero: "bg-gradient-to-br from-gray-500/20 to-gray-700/20",
      accent: "bg-gray-300",
    },

    bold: {
      hero: "bg-gradient-to-br from-orange-500/40 to-red-500/20",
      accent: "bg-orange-400",
    },
  };

  const layout =
    layouts[style] ||
    layouts.modern;

  return (
    <div
      className={`relative h-full w-full ${layout.hero} p-5`}
    >

      {/* Fake browser */}

      <div className="h-full overflow-hidden rounded-xl border border-white/10 bg-[#111116]">

        {/* Navbar */}

        <div className="flex h-8 items-center gap-1.5 border-b border-white/10 px-3">

          <span className="h-2 w-2 rounded-full bg-red-400/60" />
          <span className="h-2 w-2 rounded-full bg-yellow-400/60" />
          <span className="h-2 w-2 rounded-full bg-green-400/60" />

        </div>

        {/* Hero */}

        <div className="grid h-[calc(100%-32px)] grid-cols-2 gap-4 p-4">

          <div className="flex flex-col justify-center">

            <div
              className={`mb-2 h-2 w-12 rounded ${layout.accent}`}
            />

            <div className="h-4 w-28 rounded bg-white/20" />

            <div className="mt-2 h-2 w-36 rounded bg-white/10" />

            <div className="mt-1 h-2 w-24 rounded bg-white/10" />

            <div
              className={`mt-4 h-6 w-20 rounded ${layout.accent} opacity-70`}
            />

          </div>

          <div className="flex items-center justify-center">

            <div className="h-28 w-full rounded-lg bg-white/10" />

          </div>

        </div>

      </div>

    </div>
  );
}