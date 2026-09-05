// src/components/website/SectionManager.jsx

import { useEffect, useState } from "react";

import {
  Check,
  GripVertical,
  Eye,
  EyeOff,
  RotateCcw,
  Save,
} from "lucide-react";

import toast from "react-hot-toast";

import {
  updateSections,
} from "../../services/websiteService";


/* =========================================================
   SECTION LABELS
========================================================= */

const SECTION_LABELS = {
  hero: "Hero",
  about: "About Us",
  courses: "Courses",
  trainers: "Trainers",
  batches: "Batches & Classes",
  testimonials: "Testimonials",
  gallery: "Gallery",
  contact: "Contact",
  studentLogin: "Student Login",
};


/* =========================================================
   DEFAULT SECTIONS
========================================================= */

const DEFAULT_SECTIONS = [
  {
    id: "hero",
    label: "Hero",
    visible: true,
    order: 0,
    content: {},
  },

  {
    id: "about",
    label: "About Us",
    visible: true,
    order: 1,
    content: {},
  },

  {
    id: "courses",
    label: "Courses",
    visible: true,
    order: 2,
    content: {},
  },

  {
    id: "trainers",
    label: "Trainers",
    visible: true,
    order: 3,
    content: {},
  },

  {
    id: "batches",
    label: "Batches & Classes",
    visible: false,
    order: 4,
    content: {},
  },

  {
    id: "testimonials",
    label: "Testimonials",
    visible: true,
    order: 5,
    content: {},
  },

  {
    id: "gallery",
    label: "Gallery",
    visible: false,
    order: 6,
    content: {},
  },

  {
    id: "contact",
    label: "Contact",
    visible: true,
    order: 7,
    content: {},
  },

  {
    id: "studentLogin",
    label: "Student Login",
    visible: true,
    order: 8,
    content: {},
  },
];


/* =========================================================
   COMPONENT
========================================================= */

export default function SectionManager({
  sections: initialSections = [],
  onSaved,
  onChange,
}) {
  const [sections, setSections] =
    useState([]);

  const [saving, setSaving] =
    useState(false);

  const [draggedIndex, setDraggedIndex] =
    useState(null);

  const [hasChanges, setHasChanges] =
    useState(false);


  /* =========================================================
     NORMALIZE SECTIONS
  ========================================================= */

  useEffect(() => {
    const source =
      initialSections?.length
        ? initialSections
        : DEFAULT_SECTIONS;

    const normalized =
      source
        .map((section, index) => ({
          ...section,

          id:
            section.id ||
            section.section_type ||
            `section-${index}`,

          label:
            section.label ||
            SECTION_LABELS[
              section.id ||
                section.section_type
            ] ||
            "Section",

          visible:
            section.visible ??
            section.is_enabled === 1 ??
            true,

          order:
            section.order ??
            section.section_order ??
            index,

          content:
            section.content ||
            {},
        }))
        .sort(
          (a, b) =>
            Number(a.order) -
            Number(b.order)
        )
        .map(
          (section, index) => ({
            ...section,
            order: index,
          })
        );

    setSections(normalized);

    setHasChanges(false);
  }, [initialSections]);


  /* =========================================================
     TOGGLE VISIBILITY
  ========================================================= */

  const toggleVisibility = (
    index
  ) => {
    setSections((previous) => {
      const updated = [
        ...previous,
      ];

      updated[index] = {
        ...updated[index],
        visible:
          !updated[index]
            .visible,
      };

      return updated;
    });

    setHasChanges(true);
  };


  /* =========================================================
     DRAG START
  ========================================================= */

  const handleDragStart = (
    index
  ) => {
    setDraggedIndex(index);
  };


  /* =========================================================
     DRAG OVER
  ========================================================= */

  const handleDragOver = (
    event
  ) => {
    event.preventDefault();
  };


  /* =========================================================
     DROP
  ========================================================= */

  const handleDrop = (
    targetIndex
  ) => {
    if (
      draggedIndex === null ||
      draggedIndex === targetIndex
    ) {
      return;
    }

    setSections((previous) => {
      const updated = [
        ...previous,
      ];

      const [
        draggedItem,
      ] = updated.splice(
        draggedIndex,
        1
      );

      updated.splice(
        targetIndex,
        0,
        draggedItem
      );

      return updated.map(
        (section, index) => ({
          ...section,
          order: index,
        })
      );
    });

    setDraggedIndex(null);

    setHasChanges(true);
  };


  /* =========================================================
     DRAG END
  ========================================================= */

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };


  /* =========================================================
     SAVE
  ========================================================= */

  const handleSave = async () => {
    try {
      setSaving(true);

      const payload =
        sections.map(
          (section, index) => ({
            ...section,

            order: index,

            // Backend-friendly format
            is_enabled:
              section.visible
                ? 1
                : 0,

            section_order:
              index,
          })
        );

      console.log(
        "Saving sections:",
        payload
      );

      const response =
        await updateSections(
          payload
        );

      console.log(
        "Sections saved:",
        response
      );

      setSections(payload);

      setHasChanges(false);

      toast.success(
        "Website sections updated"
      );

      if (onSaved) {
        onSaved(
          response ||
            payload
        );
      }

    } catch (error) {
      console.error(
        "Failed to save sections:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to save sections"
      );
    } finally {
      setSaving(false);
    }
  };


  /* =========================================================
     RESET
  ========================================================= */

  const handleReset = () => {
    const source =
      initialSections?.length
        ? initialSections
        : DEFAULT_SECTIONS;

    const normalized =
      source
        .map((section, index) => ({
          ...section,

          id:
            section.id ||
            section.section_type ||
            `section-${index}`,

          label:
            section.label ||
            SECTION_LABELS[
              section.id ||
                section.section_type
            ] ||
            "Section",

          visible:
            section.visible ??
            section.is_enabled === 1 ??
            true,

          order:
            section.order ??
            section.section_order ??
            index,

          content:
            section.content ||
            {},
        }))
        .sort(
          (a, b) =>
            Number(a.order) -
            Number(b.order)
        )
        .map(
          (section, index) => ({
            ...section,
            order: index,
          })
        );

    setSections(normalized);

    setHasChanges(false);

    toast.success(
      "Changes reset"
    );

    if (onChange) {
      onChange(normalized);
    }
  };


  /* =========================================================
     CHANGE CALLBACK
  ========================================================= */

  useEffect(() => {
    if (onChange) {
      onChange(sections);
    }
  }, [sections]);


  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="space-y-5">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <div>

          <h2 className="text-lg font-semibold text-white">
            Website Sections
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Choose which sections appear on your public website and arrange their order.
          </p>

        </div>


        <div className="flex items-center gap-2">

          <button
            type="button"
            onClick={handleReset}
            disabled={
              saving ||
              !hasChanges
            }
            className="px-4 py-2.5 rounded-xl border border-[#34313f] text-gray-400 hover:bg-[#24212f] transition flex items-center gap-2 disabled:opacity-40"
          >

            <RotateCcw
              size={16}
            />

            Reset

          </button>


          <button
            type="button"
            onClick={
              handleSave
            }
            disabled={
              saving ||
              !hasChanges
            }
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold flex items-center gap-2 disabled:opacity-40"
          >

            {saving ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                Saving...
              </>
            ) : (
              <>
                <Save
                  size={16}
                />

                Save Changes
              </>
            )}

          </button>

        </div>

      </div>


      {/* =====================================================
          INFO
      ===================================================== */}

      <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">

        <p className="text-sm text-blue-300">

          <strong>
            Tip:
          </strong>{" "}
          Drag sections to change their order. Turn the eye icon on or off to control what visitors see.

        </p>

      </div>


      {/* =====================================================
          SECTIONS
      ===================================================== */}

      <div className="space-y-3">

        {sections.map(
          (
            section,
            index
          ) => {

            const isDragging =
              draggedIndex ===
              index;

            return (
              <div
                key={
                  section.id ||
                  index
                }
                draggable
                onDragStart={() =>
                  handleDragStart(
                    index
                  )
                }
                onDragOver={
                  handleDragOver
                }
                onDrop={() =>
                  handleDrop(
                    index
                  )
                }
                onDragEnd={
                  handleDragEnd
                }
                className={`group flex items-center gap-4 rounded-2xl border p-4 transition-all ${
                  isDragging
                    ? "border-purple-500 bg-purple-500/10 opacity-50"
                    : section.visible
                    ? "border-[#2c2c35] bg-[#151519]"
                    : "border-[#25252d] bg-[#111114] opacity-60"
                }`}
              >

                {/* DRAG */}

                <div
                  className="cursor-grab text-gray-600 hover:text-gray-300 active:cursor-grabbing"
                  title="Drag to reorder"
                >

                  <GripVertical
                    size={21}
                  />

                </div>


                {/* ORDER */}

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#24212f] text-sm font-semibold text-gray-500">

                  {index + 1}

                </div>


                {/* SECTION ICON */}

                <div
                  className={`hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                    section.visible
                      ? "bg-purple-500/10 text-purple-400"
                      : "bg-gray-500/10 text-gray-600"
                  }`}
                >

                  {section.visible ? (
                    <Eye
                      size={18}
                    />
                  ) : (
                    <EyeOff
                      size={18}
                    />
                  )}

                </div>


                {/* DETAILS */}

                <div className="min-w-0 flex-1">

                  <h3 className="truncate text-sm font-semibold text-white">
                    {section.label ||
                      SECTION_LABELS[
                        section.id
                      ] ||
                      "Section"}
                  </h3>

                  <p className="mt-1 text-xs text-gray-600">
                    {section.visible
                      ? "Visible on public website"
                      : "Hidden from public website"}
                  </p>

                </div>


                {/* VISIBILITY */}

                <button
                  type="button"
                  onClick={() =>
                    toggleVisibility(
                      index
                    )
                  }
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition ${
                    section.visible
                      ? "bg-green-500/10 text-green-400 hover:bg-green-500/20"
                      : "bg-[#24212f] text-gray-600 hover:text-gray-300"
                  }`}
                  title={
                    section.visible
                      ? "Hide section"
                      : "Show section"
                  }
                >

                  {section.visible ? (
                    <Eye
                      size={18}
                    />
                  ) : (
                    <EyeOff
                      size={18}
                    />
                  )}

                </button>

              </div>
            );
          }
        )}

      </div>


      {/* =====================================================
          EMPTY
      ===================================================== */}

      {sections.length === 0 && (
        <div className="rounded-2xl border border-dashed border-[#34313f] py-12 text-center">

          <p className="text-sm text-gray-500">
            No website sections configured.
          </p>

        </div>
      )}


      {/* =====================================================
          FOOTER STATUS
      ===================================================== */}

      {hasChanges && (
        <div className="flex items-center justify-end gap-2 text-xs text-yellow-400">

          <span className="h-2 w-2 rounded-full bg-yellow-400" />

          You have unsaved changes.

        </div>
      )}

    </div>
  );
}