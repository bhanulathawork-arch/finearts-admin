

import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  ArrowLeft,
  Check,
  Loader2,
  Palette,
  Save,
  Type,
  Layout,
  Navigation,
  MousePointer2,
  FileText,
  Image,
  PanelBottom,
  RotateCcw,
    Eye,
} from "lucide-react";

import toast from "react-hot-toast";

import {
  getWebsiteData,
  updateBranding,
} from "../../services/websiteService";

/* =========================================================
   DEFAULT BRANDING
========================================================= */

const DEFAULT_BRANDING = {
  /* =======================================================
     GLOBAL
  ======================================================= */

  pageBackgroundColor: "#FAFAF9",
  cardBackgroundColor: "#FFFFFF",

  headingColor: "#111827",
  subheadingColor: "#7C3AED",
  textColor: "#374151",
  iconColor: "#F59E0B",

  fontHeading: "Inter",
  headingWeight: 700,
  headingLineHeight: 1.2,
  headingLetterSpacing: "-0.02em",

  fontSubheading: "Inter",
  subheadingWeight: 600,
  subheadingLineHeight: 1.4,

  fontBody: "Inter",
  bodyWeight: 400,
  bodyLineHeight: 1.6,
  bodyLetterSpacing: "0",

  /* =======================================================
     BUTTON
  ======================================================= */

  buttonColor: "#7C3AED",
  buttonTextColor: "#FFFFFF",

  buttonFont: "Inter",
  buttonFontWeight: 600,
  buttonBorderRadius: "999px",

  /* =======================================================
     NAVBAR
  ======================================================= */

  navbarBackgroundColor: "#1F2937",
  navbarTextColor: "#FFFFFF",
  navbarIconColor: "#FFFFFF",

  navbarButtonColor: "#7C3AED",
  navbarButtonTextColor: "#FFFFFF",

  navbarFont: "Inter",
  navbarFontWeight: 500,

  /* =======================================================
     FOOTER
  ======================================================= */

  footerBackgroundColor: "#1F2937",
  footerTextColor: "#F9FAFB",
  footerIconColor: "#F59E0B",
  footerLinkColor: "#F9FAFB",

  footerHeadingColor: "#FFFFFF",

  footerFont: "Inter",
  footerFontWeight: 400,

  footerHeadingFont: "Inter",
  footerHeadingWeight: 700,
};

/* =========================================================
   FONT OPTIONS
========================================================= */

const FONT_OPTIONS = [
  "Inter",
  "Poppins",
  "Roboto",
  "Open Sans",
  "Montserrat",
  "Lato",
  "Nunito",
  "Raleway",
  "Playfair Display",
  "Merriweather",
];

/* =========================================================
   FONT WEIGHTS
========================================================= */

const FONT_WEIGHT_OPTIONS = [
  {
    value: 300,
    label: "Light (300)",
  },
  {
    value: 400,
    label: "Regular (400)",
  },
  {
    value: 500,
    label: "Medium (500)",
  },
  {
    value: 600,
    label: "Semi Bold (600)",
  },
  {
    value: 700,
    label: "Bold (700)",
  },
  {
    value: 800,
    label: "Extra Bold (800)",
  },
];

/* =========================================================
   LINE HEIGHT OPTIONS
========================================================= */

const LINE_HEIGHT_OPTIONS = [
  {
    value: 1.1,
    label: "Tight (1.1)",
  },
  {
    value: 1.2,
    label: "Compact (1.2)",
  },
  {
    value: 1.4,
    label: "Normal (1.4)",
  },
  {
    value: 1.5,
    label: "Relaxed (1.5)",
  },
  {
    value: 1.6,
    label: "Comfortable (1.6)",
  },
  {
    value: 1.8,
    label: "Loose (1.8)",
  },
];

/* =========================================================
   BORDER RADIUS OPTIONS
========================================================= */

const BUTTON_RADIUS_OPTIONS = [
  {
    value: "0px",
    label: "Square",
  },
  {
    value: "6px",
    label: "Small",
  },
  {
    value: "10px",
    label: "Medium",
  },
  {
    value: "16px",
    label: "Large",
  },
  {
    value: "999px",
    label: "Pill",
  },
];

/* =========================================================
   NORMALIZE BRANDING
========================================================= */

const normalizeBranding = (
  branding
) => {
  const source =
    branding || {};

  return {
    ...DEFAULT_BRANDING,

    /* =====================================================
       GLOBAL COLORS
    ===================================================== */

    pageBackgroundColor:
      source.pageBackgroundColor ??
      source.page_background_color ??
      DEFAULT_BRANDING.pageBackgroundColor,

    cardBackgroundColor:
      source.cardBackgroundColor ??
      source.card_background_color ??
      DEFAULT_BRANDING.cardBackgroundColor,

    headingColor:
      source.headingColor ??
      source.heading_color ??
      DEFAULT_BRANDING.headingColor,

    subheadingColor:
      source.subheadingColor ??
      source.subheading_color ??
      DEFAULT_BRANDING.subheadingColor,

    textColor:
      source.textColor ??
      source.text_color ??
      DEFAULT_BRANDING.textColor,

    iconColor:
      source.iconColor ??
      source.icon_color ??
      DEFAULT_BRANDING.iconColor,

    /* =====================================================
       HEADING TYPOGRAPHY
    ===================================================== */

    fontHeading:
      source.fontHeading ??
      source.font_heading ??
      DEFAULT_BRANDING.fontHeading,

    headingWeight:
      Number(
        source.headingWeight ??
        source.heading_weight ??
        DEFAULT_BRANDING.headingWeight
      ),

    headingLineHeight:
      Number(
        source.headingLineHeight ??
        source.heading_line_height ??
        DEFAULT_BRANDING.headingLineHeight
      ),

    headingLetterSpacing:
      source.headingLetterSpacing ??
      source.heading_letter_spacing ??
      DEFAULT_BRANDING.headingLetterSpacing,

    /* =====================================================
       SUBHEADING TYPOGRAPHY
    ===================================================== */

    fontSubheading:
      source.fontSubheading ??
      source.font_subheading ??
      DEFAULT_BRANDING.fontSubheading,

    subheadingWeight:
      Number(
        source.subheadingWeight ??
        source.subheading_weight ??
        DEFAULT_BRANDING.subheadingWeight
      ),

    subheadingLineHeight:
      Number(
        source.subheadingLineHeight ??
        source.subheading_line_height ??
        DEFAULT_BRANDING.subheadingLineHeight
      ),

    /* =====================================================
       BODY TYPOGRAPHY
    ===================================================== */

    fontBody:
      source.fontBody ??
      source.font_body ??
      DEFAULT_BRANDING.fontBody,

    bodyWeight:
      Number(
        source.bodyWeight ??
        source.body_weight ??
        DEFAULT_BRANDING.bodyWeight
      ),

    bodyLineHeight:
      Number(
        source.bodyLineHeight ??
        source.body_line_height ??
        DEFAULT_BRANDING.bodyLineHeight
      ),

    bodyLetterSpacing:
      source.bodyLetterSpacing ??
      source.body_letter_spacing ??
      DEFAULT_BRANDING.bodyLetterSpacing,

    /* =====================================================
       BUTTON
    ===================================================== */

    buttonColor:
      source.buttonColor ??
      source.button_color ??
      DEFAULT_BRANDING.buttonColor,

    buttonTextColor:
      source.buttonTextColor ??
      source.button_text_color ??
      DEFAULT_BRANDING.buttonTextColor,

    buttonFont:
      source.buttonFont ??
      source.button_font ??
      DEFAULT_BRANDING.buttonFont,

    buttonFontWeight:
      Number(
        source.buttonFontWeight ??
        source.button_font_weight ??
        DEFAULT_BRANDING.buttonFontWeight
      ),

    buttonBorderRadius:
      source.buttonBorderRadius ??
      source.button_border_radius ??
      DEFAULT_BRANDING.buttonBorderRadius,

    /* =====================================================
       NAVBAR
    ===================================================== */

    navbarBackgroundColor:
      source.navbarBackgroundColor ??
      source.navbar_background_color ??
      source.navbarColor ??
      source.navbar_color ??
      DEFAULT_BRANDING.navbarBackgroundColor,

    navbarTextColor:
      source.navbarTextColor ??
      source.navbar_text_color ??
      DEFAULT_BRANDING.navbarTextColor,

    navbarIconColor:
      source.navbarIconColor ??
      source.navbar_icon_color ??
      DEFAULT_BRANDING.navbarIconColor,

    navbarButtonColor:
      source.navbarButtonColor ??
      source.navbar_button_color ??
      DEFAULT_BRANDING.navbarButtonColor,

    navbarButtonTextColor:
      source.navbarButtonTextColor ??
      source.navbar_button_text_color ??
      DEFAULT_BRANDING.navbarButtonTextColor,

    navbarFont:
      source.navbarFont ??
      source.navbar_font ??
      DEFAULT_BRANDING.navbarFont,

    navbarFontWeight:
      Number(
        source.navbarFontWeight ??
        source.navbar_font_weight ??
        DEFAULT_BRANDING.navbarFontWeight
      ),

    /* =====================================================
       FOOTER
    ===================================================== */

    footerBackgroundColor:
      source.footerBackgroundColor ??
      source.footer_background_color ??
      DEFAULT_BRANDING.footerBackgroundColor,

    footerTextColor:
      source.footerTextColor ??
      source.footer_text_color ??
      DEFAULT_BRANDING.footerTextColor,

    footerIconColor:
      source.footerIconColor ??
      source.footer_icon_color ??
      DEFAULT_BRANDING.footerIconColor,

    footerLinkColor:
      source.footerLinkColor ??
      source.footer_link_color ??
      DEFAULT_BRANDING.footerLinkColor,

    footerHeadingColor:
      source.footerHeadingColor ??
      source.footer_heading_color ??
      DEFAULT_BRANDING.footerHeadingColor,

    footerFont:
      source.footerFont ??
      source.footer_font ??
      DEFAULT_BRANDING.footerFont,

    footerFontWeight:
      Number(
        source.footerFontWeight ??
        source.footer_font_weight ??
        DEFAULT_BRANDING.footerFontWeight
      ),

    footerHeadingFont:
      source.footerHeadingFont ??
      source.footer_heading_font ??
      DEFAULT_BRANDING.footerHeadingFont,

    footerHeadingWeight:
      Number(
        source.footerHeadingWeight ??
        source.footer_heading_weight ??
        DEFAULT_BRANDING.footerHeadingWeight
      ),
  };
};

/* =========================================================
   CREATE API PAYLOAD
========================================================= */

const createBrandingPayload = (
  branding
) => {
  return {
    /* GLOBAL */

    pageBackgroundColor:
      branding.pageBackgroundColor,

    cardBackgroundColor:
      branding.cardBackgroundColor,

    headingColor:
      branding.headingColor,

    subheadingColor:
      branding.subheadingColor,

    textColor:
      branding.textColor,

    iconColor:
      branding.iconColor,

    /* HEADING */

    fontHeading:
      branding.fontHeading,

    headingWeight:
      branding.headingWeight,

    headingLineHeight:
      branding.headingLineHeight,

    headingLetterSpacing:
      branding.headingLetterSpacing,

    /* SUBHEADING */

    fontSubheading:
      branding.fontSubheading,

    subheadingWeight:
      branding.subheadingWeight,

    subheadingLineHeight:
      branding.subheadingLineHeight,

    /* BODY */

    fontBody:
      branding.fontBody,

    bodyWeight:
      branding.bodyWeight,

    bodyLineHeight:
      branding.bodyLineHeight,

    bodyLetterSpacing:
      branding.bodyLetterSpacing,

    /* BUTTON */

    buttonColor:
      branding.buttonColor,

    buttonTextColor:
      branding.buttonTextColor,

    buttonFont:
      branding.buttonFont,

    buttonFontWeight:
      branding.buttonFontWeight,

    buttonBorderRadius:
      branding.buttonBorderRadius,

    /* NAVBAR */

    navbarBackgroundColor:
      branding.navbarBackgroundColor,

    navbarTextColor:
      branding.navbarTextColor,

    navbarIconColor:
      branding.navbarIconColor,

    navbarButtonColor:
      branding.navbarButtonColor,

    navbarButtonTextColor:
      branding.navbarButtonTextColor,

    navbarFont:
      branding.navbarFont,

    navbarFontWeight:
      branding.navbarFontWeight,

    /* FOOTER */

    footerBackgroundColor:
      branding.footerBackgroundColor,

    footerTextColor:
      branding.footerTextColor,

    footerIconColor:
      branding.footerIconColor,

    footerLinkColor:
      branding.footerLinkColor,

    footerHeadingColor:
      branding.footerHeadingColor,

    footerFont:
      branding.footerFont,

    footerFontWeight:
      branding.footerFontWeight,

    footerHeadingFont:
      branding.footerHeadingFont,

    footerHeadingWeight:
      branding.footerHeadingWeight,
  };
};

/* =========================================================
   COLOR INPUT
========================================================= */

function ColorInput({
  label,
  description,
  value,
  onChange,
}) {
  return (
    <div className="space-y-2">
      <div>
        <label className="text-sm font-medium text-gray-300">
          {label}
        </label>

        {description && (
          <p className="text-xs text-gray-600 mt-1">
            {description}
          </p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <input
          type="color"
          value={
            /^#[0-9A-Fa-f]{6}$/.test(
              value || ""
            )
              ? value
              : "#000000"
          }
          onChange={(event) =>
            onChange(
              event.target.value
            )
          }
          className="w-12 h-12 rounded-xl border border-[#34313f] bg-[#111116] p-1 cursor-pointer"
        />

        <input
          type="text"
          value={value || ""}
          onChange={(event) =>
            onChange(
              event.target.value
            )
          }
          placeholder="#000000"
          className="flex-1 min-w-0 rounded-xl bg-[#111116] border border-[#34313f] px-4 py-3 text-white uppercase placeholder:text-gray-600 outline-none focus:border-purple-500"
        />
      </div>
    </div>
  );
}

/* =========================================================
   SECTION HEADER
========================================================= */

function SectionHeader({
  icon: Icon,
  title,
  description,
}) {
  return (
    <div className="flex items-start gap-3 mb-6">
      {Icon && (
        <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0">
          <Icon
            size={20}
            className="text-purple-400"
          />
        </div>
      )}

      <div>
        <h2 className="text-lg font-semibold text-white">
          {title}
        </h2>

        {description && (
          <p className="text-sm text-gray-500 mt-1">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   SELECT INPUT
========================================================= */

function SelectInput({
  label,
  description,
  value,
  onChange,
  options,
}) {
  return (
    <div>
      <label className="text-sm text-gray-300">
        {label}
      </label>

      {description && (
        <p className="text-xs text-gray-600 mt-1">
          {description}
        </p>
      )}

      <select
        value={value}
        onChange={(event) =>
          onChange(
            event.target.value
          )
        }
        className="w-full mt-2 rounded-xl bg-[#111116] border border-[#34313f] px-4 py-3 text-white outline-none focus:border-purple-500"
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function WebsiteBranding() {
  const navigate =
    useNavigate();

  const [branding, setBranding] =
    useState({
      ...DEFAULT_BRANDING,
    });

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [hasChanges, setHasChanges] =
    useState(false);

  /* =======================================================
     LOAD
  ======================================================= */

  useEffect(() => {
    loadBranding();
  }, []);

  const loadBranding =
    async () => {
      try {
        setLoading(true);

        const response =
          await getWebsiteData();

        console.log(
          "WEBSITE DATA:",
          response
        );

        /*
         * Support all common API response
         * structures.
         */

        let data = response;

        if (
          data?.data &&
          typeof data.data ===
            "object"
        ) {
          data = data.data;
        }

        const existingBranding =
          data?.branding ||
          data?.website?.branding ||
          {};

        const normalized =
          normalizeBranding(
            existingBranding
          );

        console.log(
          "NORMALIZED BRANDING:",
          normalized
        );

        setBranding(
          normalized
        );

        setHasChanges(
          false
        );
      } catch (error) {
        console.error(
          "LOAD BRANDING ERROR:",
          error
        );

        toast.error(
          error?.response?.data
            ?.message ||
            error?.message ||
            "Failed to load website branding"
        );
      } finally {
        setLoading(false);
      }
    };

  /* =======================================================
     UPDATE
  ======================================================= */

  const updateField = (
    field,
    value
  ) => {
    setBranding(
      (previous) => ({
        ...previous,
        [field]: value,
      })
    );

    setHasChanges(true);
  };

  /* =======================================================
     SAVE
  ======================================================= */

  const handleSave =
    async () => {
      if (
        saving ||
        !hasChanges
      ) {
        return;
      }

      try {
        setSaving(true);

        const payload =
          createBrandingPayload(
            branding
          );

        console.log(
          "BRANDING PAYLOAD:",
          payload
        );

        const response =
          await updateBranding(
            payload
          );

        console.log(
          "BRANDING SAVE RESPONSE:",
          response
        );

        toast.success(
          "Website branding saved successfully"
        );

        setHasChanges(
          false
        );

        /*
         * Reload from backend so the
         * dashboard reflects exactly what
         * was persisted.
         */

        await loadBranding();
      } catch (error) {
        console.error(
          "SAVE BRANDING ERROR:",
          error
        );

        toast.error(
          error?.response?.data
            ?.message ||
            error?.message ||
            "Failed to save website branding"
        );
      } finally {
        setSaving(false);
      }
    };

  /* =======================================================
     RESET
  ======================================================= */

  const handleReset =
    () => {
      setBranding({
        ...DEFAULT_BRANDING,
      });

      setHasChanges(
        true
      );

      toast.success(
        "Default branding loaded. Click Save Changes to apply."
      );
    };

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="flex items-center gap-3 text-gray-400">
          <Loader2
            size={22}
            className="animate-spin"
          />

          <span>
            Loading website branding...
          </span>
        </div>
      </div>
    );
  }

  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <div className="space-y-6 pb-24">
      {/* ===================================================
          HEADER
      =================================================== */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() =>
              navigate(
                "/institute/website"
              )
            }
            className="p-2 rounded-xl text-gray-400 hover:bg-[#2a2a35] hover:text-white transition"
          >
            <ArrowLeft
              size={22}
            />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <Palette
                size={23}
                className="text-purple-400"
              />

              <h1 className="text-2xl font-bold text-white">
                Website Branding
              </h1>
            </div>

            <p className="text-sm text-gray-400 mt-1">
              Customize the colors and fonts used throughout your public website.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            disabled={saving}
            className="px-4 py-2.5 rounded-xl border border-[#34313f] text-gray-300 hover:bg-[#24212f] transition disabled:opacity-50"
          >
            Reset Defaults
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={
              saving ||
              !hasChanges
            }
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>
                <Loader2
                  size={18}
                  className="animate-spin"
                />
                Saving...
              </>
            ) : (
              <>
                <Save
                  size={18}
                />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>

      {/* ===================================================
          GLOBAL COLORS
      =================================================== */}

      <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-6">
        <SectionHeader
          icon={Palette}
          title="Website Colors"
          description="Control the main colors used across every website page."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ColorInput
            label="Page Background"
            description="Main background of website pages."
            value={
              branding.pageBackgroundColor
            }
            onChange={(value) =>
              updateField(
                "pageBackgroundColor",
                value
              )
            }
          />

          <ColorInput
            label="Card Background"
            description="Background of cards and content blocks."
            value={
              branding.cardBackgroundColor
            }
            onChange={(value) =>
              updateField(
                "cardBackgroundColor",
                value
              )
            }
          />

          <ColorInput
            label="Heading Color"
            description="Main headings such as H1, H2 and H3."
            value={
              branding.headingColor
            }
            onChange={(value) =>
              updateField(
                "headingColor",
                value
              )
            }
          />

          <ColorInput
            label="Subheading Color"
            description="Section labels and subheadings."
            value={
              branding.subheadingColor
            }
            onChange={(value) =>
              updateField(
                "subheadingColor",
                value
              )
            }
          />

          <ColorInput
            label="Text Color"
            description="Normal paragraphs and website text."
            value={
              branding.textColor
            }
            onChange={(value) =>
              updateField(
                "textColor",
                value
              )
            }
          />

          <ColorInput
            label="Icon Color"
            description="Icons used throughout the website."
            value={
              branding.iconColor
            }
            onChange={(value) =>
              updateField(
                "iconColor",
                value
              )
            }
          />
        </div>
      </div>

      {/* ===================================================
          TYPOGRAPHY
      =================================================== */}

      <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-6">
        <SectionHeader
          icon={Type}
          title="Typography"
          description="Choose fonts and typography for headings, subheadings and normal text."
        />

        {/* HEADING */}

        <div className="border border-[#34313f] rounded-xl p-5">
          <h3 className="text-white font-semibold">
            Heading
          </h3>

          <p className="text-xs text-gray-500 mt-1 mb-5">
            Applies to headings across all public pages.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <SelectInput
              label="Font"
              value={
                branding.fontHeading
              }
              onChange={(value) =>
                updateField(
                  "fontHeading",
                  value
                )
              }
              options={FONT_OPTIONS.map(
                (font) => ({
                  value: font,
                  label: font,
                })
              )}
            />

            <SelectInput
              label="Weight"
              value={String(
                branding.headingWeight
              )}
              onChange={(value) =>
                updateField(
                  "headingWeight",
                  Number(value)
                )
              }
              options={FONT_WEIGHT_OPTIONS.map(
                (item) => ({
                  value: String(
                    item.value
                  ),
                  label: item.label,
                })
              )}
            />

            <SelectInput
              label="Line Height"
              value={String(
                branding.headingLineHeight
              )}
              onChange={(value) =>
                updateField(
                  "headingLineHeight",
                  Number(value)
                )
              }
              options={LINE_HEIGHT_OPTIONS.map(
                (item) => ({
                  value: String(
                    item.value
                  ),
                  label: item.label,
                })
              )}
            />

            <div>
              <label className="text-sm text-gray-300">
                Letter Spacing
              </label>

              <input
                type="text"
                value={
                  branding.headingLetterSpacing
                }
                onChange={(event) =>
                  updateField(
                    "headingLetterSpacing",
                    event.target.value
                  )
                }
                placeholder="-0.02em"
                className="w-full mt-2 rounded-xl bg-[#111116] border border-[#34313f] px-4 py-3 text-white outline-none focus:border-purple-500"
              />
            </div>
          </div>
        </div>

        {/* SUBHEADING */}

        <div className="border border-[#34313f] rounded-xl p-5 mt-5">
          <h3 className="text-white font-semibold">
            Subheading
          </h3>

          <p className="text-xs text-gray-500 mt-1 mb-5">
            Applies to section subheadings and eyebrow text.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <SelectInput
              label="Font"
              value={
                branding.fontSubheading
              }
              onChange={(value) =>
                updateField(
                  "fontSubheading",
                  value
                )
              }
              options={FONT_OPTIONS.map(
                (font) => ({
                  value: font,
                  label: font,
                })
              )}
            />

            <SelectInput
              label="Weight"
              value={String(
                branding.subheadingWeight
              )}
              onChange={(value) =>
                updateField(
                  "subheadingWeight",
                  Number(value)
                )
              }
              options={FONT_WEIGHT_OPTIONS.map(
                (item) => ({
                  value: String(
                    item.value
                  ),
                  label: item.label,
                })
              )}
            />

            <SelectInput
              label="Line Height"
              value={String(
                branding.subheadingLineHeight
              )}
              onChange={(value) =>
                updateField(
                  "subheadingLineHeight",
                  Number(value)
                )
              }
              options={LINE_HEIGHT_OPTIONS.map(
                (item) => ({
                  value: String(
                    item.value
                  ),
                  label: item.label,
                })
              )}
            />
          </div>
        </div>

        {/* BODY */}

        <div className="border border-[#34313f] rounded-xl p-5 mt-5">
          <h3 className="text-white font-semibold">
            Body Text
          </h3>

          <p className="text-xs text-gray-500 mt-1 mb-5">
            Applies to descriptions, paragraphs and normal text.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <SelectInput
              label="Font"
              value={
                branding.fontBody
              }
              onChange={(value) =>
                updateField(
                  "fontBody",
                  value
                )
              }
              options={FONT_OPTIONS.map(
                (font) => ({
                  value: font,
                  label: font,
                })
              )}
            />

            <SelectInput
              label="Weight"
              value={String(
                branding.bodyWeight
              )}
              onChange={(value) =>
                updateField(
                  "bodyWeight",
                  Number(value)
                )
              }
              options={FONT_WEIGHT_OPTIONS.map(
                (item) => ({
                  value: String(
                    item.value
                  ),
                  label: item.label,
                })
              )}
            />

            <SelectInput
              label="Line Height"
              value={String(
                branding.bodyLineHeight
              )}
              onChange={(value) =>
                updateField(
                  "bodyLineHeight",
                  Number(value)
                )
              }
              options={LINE_HEIGHT_OPTIONS.map(
                (item) => ({
                  value: String(
                    item.value
                  ),
                  label: item.label,
                })
              )}
            />

            <div>
              <label className="text-sm text-gray-300">
                Letter Spacing
              </label>

              <input
                type="text"
                value={
                  branding.bodyLetterSpacing
                }
                onChange={(event) =>
                  updateField(
                    "bodyLetterSpacing",
                    event.target.value
                  )
                }
                placeholder="0"
                className="w-full mt-2 rounded-xl bg-[#111116] border border-[#34313f] px-4 py-3 text-white outline-none focus:border-purple-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================
          BUTTON
      =================================================== */}

      <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-6">
        <SectionHeader
          icon={MousePointer2}
          title="Buttons"
          description="Control the appearance of buttons throughout the public website."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ColorInput
            label="Button Background"
            description="Background color of website buttons."
            value={
              branding.buttonColor
            }
            onChange={(value) =>
              updateField(
                "buttonColor",
                value
              )
            }
          />

          <ColorInput
            label="Button Text"
            description="Text color inside buttons."
            value={
              branding.buttonTextColor
            }
            onChange={(value) =>
              updateField(
                "buttonTextColor",
                value
              )
            }
          />

          <SelectInput
            label="Button Font"
            value={
              branding.buttonFont
            }
            onChange={(value) =>
              updateField(
                "buttonFont",
                value
              )
            }
            options={FONT_OPTIONS.map(
              (font) => ({
                value: font,
                label: font,
              })
            )}
          />

          <SelectInput
            label="Button Weight"
            value={String(
              branding.buttonFontWeight
            )}
            onChange={(value) =>
              updateField(
                "buttonFontWeight",
                Number(value)
              )
            }
            options={FONT_WEIGHT_OPTIONS.map(
              (item) => ({
                value: String(
                  item.value
                ),
                label: item.label,
              })
            )}
          />

          <SelectInput
            label="Button Shape"
            value={
              branding.buttonBorderRadius
            }
            onChange={(value) =>
              updateField(
                "buttonBorderRadius",
                value
              )
            }
            options={BUTTON_RADIUS_OPTIONS}
          />
        </div>

        <div className="mt-6 p-5 rounded-xl bg-[#111116] border border-[#34313f]">
          <p className="text-xs text-gray-500 mb-3">
            Button Preview
          </p>

          <button
            type="button"
            className="px-6 py-3"
            style={{
              backgroundColor:
                branding.buttonColor,
              color:
                branding.buttonTextColor,
              fontFamily: `'${branding.buttonFont}', sans-serif`,
              fontWeight:
                branding.buttonFontWeight,
              borderRadius:
                branding.buttonBorderRadius,
            }}
          >
            Explore Classes
          </button>
        </div>
      </div>

      {/* ===================================================
          NAVBAR
      =================================================== */}

      <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-6">
        <SectionHeader
          icon={Navigation}
          title="Navbar"
          description="Customize the navigation bar, navigation text, icons and navbar button."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ColorInput
            label="Navbar Background"
            description="Background color of the website navbar."
            value={
              branding.navbarBackgroundColor
            }
            onChange={(value) =>
              updateField(
                "navbarBackgroundColor",
                value
              )
            }
          />

          <ColorInput
            label="Navbar Text"
            description="Navigation menu text."
            value={
              branding.navbarTextColor
            }
            onChange={(value) =>
              updateField(
                "navbarTextColor",
                value
              )
            }
          />

          <ColorInput
            label="Navbar Icons"
            description="Icons used inside the navbar."
            value={
              branding.navbarIconColor
            }
            onChange={(value) =>
              updateField(
                "navbarIconColor",
                value
              )
            }
          />

          <ColorInput
            label="Navbar Button"
            description="Navbar call-to-action button."
            value={
              branding.navbarButtonColor
            }
            onChange={(value) =>
              updateField(
                "navbarButtonColor",
                value
              )
            }
          />

          <ColorInput
            label="Navbar Button Text"
            description="Text inside the navbar button."
            value={
              branding.navbarButtonTextColor
            }
            onChange={(value) =>
              updateField(
                "navbarButtonTextColor",
                value
              )
            }
          />

          <SelectInput
            label="Navbar Font"
            value={
              branding.navbarFont
            }
            onChange={(value) =>
              updateField(
                "navbarFont",
                value
              )
            }
            options={FONT_OPTIONS.map(
              (font) => ({
                value: font,
                label: font,
              })
            )}
          />

          <SelectInput
            label="Navbar Font Weight"
            value={String(
              branding.navbarFontWeight
            )}
            onChange={(value) =>
              updateField(
                "navbarFontWeight",
                Number(value)
              )
            }
            options={FONT_WEIGHT_OPTIONS.map(
              (item) => ({
                value: String(
                  item.value
                ),
                label: item.label,
              })
            )}
          />
        </div>

        {/* NAVBAR PREVIEW */}

        <div className="mt-6">
          <p className="text-xs text-gray-500 mb-3">
            Navbar Preview
          </p>

          <div
            className="rounded-xl px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            style={{
              backgroundColor:
                branding.navbarBackgroundColor,
              fontFamily: `'${branding.navbarFont}', sans-serif`,
              fontWeight:
                branding.navbarFontWeight,
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{
                  backgroundColor:
                    branding.navbarButtonColor,
                }}
              >
                <Palette
                  size={18}
                  style={{
                    color:
                      branding.navbarIconColor,
                  }}
                />
              </div>

              <span
                style={{
                  color:
                    branding.navbarTextColor,
                }}
              >
                Your Institute
              </span>
            </div>

            <div className="flex items-center gap-5 flex-wrap">
              {[
                "Home",
                "About",
                "Classes",
                "Sessions",
              ].map(
                (item) => (
                  <span
                    key={item}
                    className="text-sm"
                    style={{
                      color:
                        branding.navbarTextColor,
                    }}
                  >
                    {item}
                  </span>
                )
              )}

              <button
                type="button"
                className="px-4 py-2 rounded-lg text-sm font-semibold"
                style={{
                  backgroundColor:
                    branding.navbarButtonColor,
                  color:
                    branding.navbarButtonTextColor,
                }}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================
          FOOTER
      =================================================== */}

      <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-6">
        <SectionHeader
          icon={PanelBottom}
          title="Footer"
          description="Customize footer background, text, links, headings and icons."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ColorInput
            label="Footer Background"
            description="Main footer background."
            value={
              branding.footerBackgroundColor
            }
            onChange={(value) =>
              updateField(
                "footerBackgroundColor",
                value
              )
            }
          />

          <ColorInput
            label="Footer Heading"
            description="Institute name and footer headings."
            value={
              branding.footerHeadingColor
            }
            onChange={(value) =>
              updateField(
                "footerHeadingColor",
                value
              )
            }
          />

          <ColorInput
            label="Footer Text"
            description="Descriptions and normal footer text."
            value={
              branding.footerTextColor
            }
            onChange={(value) =>
              updateField(
                "footerTextColor",
                value
              )
            }
          />

          <ColorInput
            label="Footer Links"
            description="Quick links and navigation links."
            value={
              branding.footerLinkColor
            }
            onChange={(value) =>
              updateField(
                "footerLinkColor",
                value
              )
            }
          />

          <ColorInput
            label="Footer Icons"
            description="Social and other footer icons."
            value={
              branding.footerIconColor
            }
            onChange={(value) =>
              updateField(
                "footerIconColor",
                value
              )
            }
          />

          <SelectInput
            label="Footer Font"
            value={
              branding.footerFont
            }
            onChange={(value) =>
              updateField(
                "footerFont",
                value
              )
            }
            options={FONT_OPTIONS.map(
              (font) => ({
                value: font,
                label: font,
              })
            )}
          />

          <SelectInput
            label="Footer Font Weight"
            value={String(
              branding.footerFontWeight
            )}
            onChange={(value) =>
              updateField(
                "footerFontWeight",
                Number(value)
              )
            }
            options={FONT_WEIGHT_OPTIONS.map(
              (item) => ({
                value: String(
                  item.value
                ),
                label: item.label,
              })
            )}
          />

          <SelectInput
            label="Footer Heading Font"
            value={
              branding.footerHeadingFont
            }
            onChange={(value) =>
              updateField(
                "footerHeadingFont",
                value
              )
            }
            options={FONT_OPTIONS.map(
              (font) => ({
                value: font,
                label: font,
              })
            )}
          />

          <SelectInput
            label="Footer Heading Weight"
            value={String(
              branding.footerHeadingWeight
            )}
            onChange={(value) =>
              updateField(
                "footerHeadingWeight",
                Number(value)
              )
            }
            options={FONT_WEIGHT_OPTIONS.map(
              (item) => ({
                value: String(
                  item.value
                ),
                label: item.label,
              })
            )}
          />
        </div>

        {/* FOOTER PREVIEW */}

        <div className="mt-6">
          <p className="text-xs text-gray-500 mb-3">
            Footer Preview
          </p>

          <div
            className="rounded-xl p-6"
            style={{
              backgroundColor:
                branding.footerBackgroundColor,
              fontFamily: `'${branding.footerFont}', sans-serif`,
              fontWeight:
                branding.footerFontWeight,
            }}
          >
            <h3
              className="text-lg"
              style={{
                color:
                  branding.footerHeadingColor,
                fontFamily: `'${branding.footerHeadingFont}', sans-serif`,
                fontWeight:
                  branding.footerHeadingWeight,
              }}
            >
              Your Institute
            </h3>

            <p
              className="text-sm mt-2 max-w-lg"
              style={{
                color:
                  branding.footerTextColor,
              }}
            >
              Your institute description appears
              here from Website Footer settings.
            </p>

            <div className="flex flex-wrap gap-5 mt-5">
              {[
                "Home",
                "About",
                "Classes",
                "Sessions",
                "Trainers",
                "Testimonials",
              ].map(
                (item) => (
                  <span
                    key={item}
                    className="text-sm"
                    style={{
                      color:
                        branding.footerLinkColor,
                    }}
                  >
                    {item}
                  </span>
                )
              )}
            </div>

            <div className="flex gap-4 mt-5">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor:
                    `${branding.footerIconColor}20`,
                }}
              >
                <Check
                  size={16}
                  style={{
                    color:
                      branding.footerIconColor,
                  }}
                />
              </div>

              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor:
                    `${branding.footerIconColor}20`,
                }}
              >
                <Palette
                  size={16}
                  style={{
                    color:
                      branding.footerIconColor,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================
          COMPLETE LIVE PREVIEW
      =================================================== */}

      <div className="bg-[#151519] border border-[#2c2c35] rounded-2xl p-6">
        <SectionHeader
          icon={Eye}
          title="Website Preview"
          description="Preview how your global branding works together."
        />

        <div className="rounded-2xl overflow-hidden border border-[#34313f]">
          {/* NAVBAR */}

          <div
            className="px-6 py-4 flex items-center justify-between gap-4"
            style={{
              backgroundColor:
                branding.navbarBackgroundColor,
              fontFamily: `'${branding.navbarFont}', sans-serif`,
              fontWeight:
                branding.navbarFontWeight,
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{
                  backgroundColor:
                    branding.navbarButtonColor,
                }}
              >
                <Palette
                  size={18}
                  style={{
                    color:
                      branding.navbarIconColor,
                  }}
                />
              </div>

              <span
                className="font-semibold"
                style={{
                  color:
                    branding.navbarTextColor,
                }}
              >
                Your Institute
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-5">
              {[
                "Home",
                "About",
                "Classes",
                "Sessions",
              ].map(
                (item) => (
                  <span
                    key={item}
                    className="text-sm"
                    style={{
                      color:
                        branding.navbarTextColor,
                    }}
                  >
                    {item}
                  </span>
                )
              )}

              <button
                type="button"
                className="px-4 py-2 text-xs font-semibold"
                style={{
                  backgroundColor:
                    branding.navbarButtonColor,
                  color:
                    branding.navbarButtonTextColor,
                  borderRadius:
                    branding.buttonBorderRadius,
                }}
              >
                Book Now
              </button>
            </div>
          </div>

          {/* PAGE */}

          <div
            className="p-8 sm:p-12"
            style={{
              backgroundColor:
                branding.pageBackgroundColor,
            }}
          >
            <div className="max-w-2xl mx-auto text-center">
              <p
                className="text-xs uppercase tracking-widest"
                style={{
                  color:
                    branding.subheadingColor,
                  fontFamily: `'${branding.fontSubheading}', sans-serif`,
                  fontWeight:
                    branding.subheadingWeight,
                  lineHeight:
                    branding.subheadingLineHeight,
                }}
              >
                Popular Classes
              </p>

              <h2
                className="text-3xl sm:text-4xl mt-2"
                style={{
                  color:
                    branding.headingColor,
                  fontFamily: `'${branding.fontHeading}', sans-serif`,
                  fontWeight:
                    branding.headingWeight,
                  lineHeight:
                    branding.headingLineHeight,
                  letterSpacing:
                    branding.headingLetterSpacing,
                }}
              >
                Explore Our Classes
              </h2>

              <p
                className="text-sm mt-4"
                style={{
                  color:
                    branding.textColor,
                  fontFamily: `'${branding.fontBody}', sans-serif`,
                  fontWeight:
                    branding.bodyWeight,
                  lineHeight:
                    branding.bodyLineHeight,
                  letterSpacing:
                    branding.bodyLetterSpacing,
                }}
              >
                Discover classes designed to help
                you learn, create and grow.
              </p>

              <button
                type="button"
                className="mt-6 px-6 py-3 font-semibold"
                style={{
                  backgroundColor:
                    branding.buttonColor,
                  color:
                    branding.buttonTextColor,
                  fontFamily: `'${branding.buttonFont}', sans-serif`,
                  fontWeight:
                    branding.buttonFontWeight,
                  borderRadius:
                    branding.buttonBorderRadius,
                }}
              >
                View Classes
              </button>

              {/* CARD */}

              <div
                className="mt-8 text-left rounded-2xl p-6 border"
                style={{
                  backgroundColor:
                    branding.cardBackgroundColor,
                  borderColor:
                    `${branding.iconColor}35`,
                }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor:
                        `${branding.iconColor}18`,
                    }}
                  >
                    <Palette
                      size={20}
                      style={{
                        color:
                          branding.iconColor,
                      }}
                    />
                  </div>

                  <div>
                    <h3
                      className="text-lg"
                      style={{
                        color:
                          branding.headingColor,
                        fontFamily: `'${branding.fontHeading}', sans-serif`,
                        fontWeight:
                          branding.headingWeight,
                      }}
                    >
                      Featured Class
                    </h3>

                    <p
                      className="text-sm mt-1"
                      style={{
                        color:
                          branding.textColor,
                        fontFamily: `'${branding.fontBody}', sans-serif`,
                        fontWeight:
                          branding.bodyWeight,
                      }}
                    >
                      This card uses your selected
                      card background, heading, text
                      and icon colors.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FOOTER */}

          <div
            className="px-6 py-8"
            style={{
              backgroundColor:
                branding.footerBackgroundColor,
              fontFamily: `'${branding.footerFont}', sans-serif`,
              fontWeight:
                branding.footerFontWeight,
            }}
          >
            <h3
              className="text-lg"
              style={{
                color:
                  branding.footerHeadingColor,
                fontFamily: `'${branding.footerHeadingFont}', sans-serif`,
                fontWeight:
                  branding.footerHeadingWeight,
              }}
            >
              Your Institute
            </h3>

            <p
              className="text-sm mt-2 max-w-lg"
              style={{
                color:
                  branding.footerTextColor,
              }}
            >
              Your footer description will appear
              here from the Institute Footer settings.
            </p>

            <div className="flex flex-wrap gap-5 mt-5">
              {[
                "Home",
                "About",
                "Classes",
                "Sessions",
                "Trainers",
                "Testimonials",
              ].map(
                (item) => (
                  <span
                    key={item}
                    className="text-sm"
                    style={{
                      color:
                        branding.footerLinkColor,
                    }}
                  >
                    {item}
                  </span>
                )
              )}
            </div>

            <div className="flex gap-3 mt-5">
              <Check
                size={20}
                style={{
                  color:
                    branding.footerIconColor,
                }}
              />

              <Palette
                size={20}
                style={{
                  color:
                    branding.footerIconColor,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================
          UNSAVED CHANGES
      =================================================== */}

      {hasChanges && (
        <div className="sticky bottom-4 z-30">
          <div className="bg-[#1f1b2e] border border-purple-500/20 rounded-2xl p-4 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                  <span className="text-yellow-400 font-bold">
                    !
                  </span>
                </div>

                <div>
                  <p className="text-white text-sm font-medium">
                    Unsaved branding changes
                  </p>

                  <p className="text-gray-500 text-xs mt-1">
                    Save your changes to apply them to the website.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={
                  handleSave
                }
                disabled={saving}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <Loader2
                      size={17}
                      className="animate-spin"
                    />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save
                      size={17}
                    />
                    Save Branding
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}