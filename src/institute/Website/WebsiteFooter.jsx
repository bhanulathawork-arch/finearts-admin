
import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import { Link } from "react-router-dom";

import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

import {
  getFooter,
} from "../../services/footer.service";


/* =========================================================
   DEFAULT BRANDING
========================================================= */

const DEFAULT_BRANDING = {

  /* -------------------------------------------------------
     FOOTER COLORS
  ------------------------------------------------------- */

  footerBackgroundColor:
    "#1F2937",

  footerHeadingColor:
    "#FFFFFF",

  footerTextColor:
    "#FAFAF9",

  footerIconColor:
    "#F59E0B",


  /* -------------------------------------------------------
     GENERAL COLORS
  ------------------------------------------------------- */

  iconColor:
    "#F59E0B",

  headingColor:
    "#111827",

  textColor:
    "#111827",


  /* -------------------------------------------------------
     FONTS
  ------------------------------------------------------- */

  footerFont:
    "Inter",

  footerHeadingFont:
    "Inter",

  footerTextFont:
    "Inter",


  /* -------------------------------------------------------
     TYPOGRAPHY
  ------------------------------------------------------- */

  footerHeadingWeight:
    700,

  footerTextWeight:
    400,

  footerHeadingLineHeight:
    1.3,

  footerTextLineHeight:
    1.6,

  footerLetterSpacing:
    "0px",


  /* -------------------------------------------------------
     BUTTON / ICON
  ------------------------------------------------------- */

  footerIconSize:
    16,

  footerIconBackground:
    "rgba(255,255,255,0.10)",

  footerIconBorder:
    "rgba(255,255,255,0.15)",

};


/* =========================================================
   NORMALIZE BRANDING
========================================================= */

const normalizeBranding = (
  branding = {}
) => {

  return {

    ...DEFAULT_BRANDING,

    ...branding,


    /* -----------------------------------------------------
       FOOTER BACKGROUND
    ----------------------------------------------------- */

    footerBackgroundColor:
      branding?.footerBackgroundColor ||
      branding?.footer_background_color ||
      DEFAULT_BRANDING.footerBackgroundColor,


    /* -----------------------------------------------------
       FOOTER HEADING
    ----------------------------------------------------- */

    footerHeadingColor:
      branding?.footerHeadingColor ||
      branding?.footer_heading_color ||
      DEFAULT_BRANDING.footerHeadingColor,


    /* -----------------------------------------------------
       FOOTER TEXT
    ----------------------------------------------------- */

    footerTextColor:
      branding?.footerTextColor ||
      branding?.footer_text_color ||
      DEFAULT_BRANDING.footerTextColor,


    /* -----------------------------------------------------
       FOOTER ICON
    ----------------------------------------------------- */

    footerIconColor:
      branding?.footerIconColor ||
      branding?.footer_icon_color ||
      branding?.iconColor ||
      branding?.icon_color ||
      DEFAULT_BRANDING.footerIconColor,


    /* -----------------------------------------------------
       FOOTER FONT
    ----------------------------------------------------- */

    footerFont:
      branding?.footerFont ||
      branding?.footer_font ||
      branding?.fontBody ||
      branding?.font_body ||
      DEFAULT_BRANDING.footerFont,


    footerHeadingFont:
      branding?.footerHeadingFont ||
      branding?.footer_heading_font ||
      branding?.fontHeading ||
      branding?.font_heading ||
      DEFAULT_BRANDING.footerHeadingFont,


    footerTextFont:
      branding?.footerTextFont ||
      branding?.footer_text_font ||
      branding?.fontBody ||
      branding?.font_body ||
      DEFAULT_BRANDING.footerTextFont,


    /* -----------------------------------------------------
       FOOTER TYPOGRAPHY
    ----------------------------------------------------- */

    footerHeadingWeight:
      branding?.footerHeadingWeight ||
      branding?.footer_heading_weight ||
      DEFAULT_BRANDING.footerHeadingWeight,


    footerTextWeight:
      branding?.footerTextWeight ||
      branding?.footer_text_weight ||
      DEFAULT_BRANDING.footerTextWeight,


    footerHeadingLineHeight:
      branding?.footerHeadingLineHeight ||
      branding?.footer_heading_line_height ||
      DEFAULT_BRANDING.footerHeadingLineHeight,


    footerTextLineHeight:
      branding?.footerTextLineHeight ||
      branding?.footer_text_line_height ||
      DEFAULT_BRANDING.footerTextLineHeight,


    footerLetterSpacing:
      branding?.footerLetterSpacing ??
      branding?.footer_letter_spacing ??
      DEFAULT_BRANDING.footerLetterSpacing,


    /* -----------------------------------------------------
       FOOTER ICON
    ----------------------------------------------------- */

    footerIconSize:
      branding?.footerIconSize ||
      branding?.footer_icon_size ||
      DEFAULT_BRANDING.footerIconSize,


    footerIconBackground:
      branding?.footerIconBackground ||
      branding?.footer_icon_background ||
      DEFAULT_BRANDING.footerIconBackground,


    footerIconBorder:
      branding?.footerIconBorder ||
      branding?.footer_icon_border ||
      DEFAULT_BRANDING.footerIconBorder,

  };
};


/* =========================================================
   WEBSITE FOOTER
========================================================= */

const WebsiteFooter = ({
  institute = {},
  instituteName = "",
  website = {},
  branding = {},
  footer = {},
}) => {


  /* =======================================================
     FOOTER STATE
  ======================================================= */

  const [
    footerData,
    setFooterData,
  ] = useState(
    footer || {}
  );


  const [
    footerLoading,
    setFooterLoading,
  ] = useState(false);


  /* =======================================================
     FETCH FOOTER
  ======================================================= */

  useEffect(() => {

    const hasFooterData =
      footer &&
      (
        footer.description ||
        footer.facebook_url ||
        footer.instagram_url ||
        footer.youtube_url ||
        footer.address ||
        footer.phone ||
        footer.email
      );


    if (
      hasFooterData
    ) {

      setFooterData(
        footer
      );

      return;
    }


    const loadFooter =
      async () => {

        try {

          setFooterLoading(
            true
          );


          const data =
            await getFooter();


          console.log(
            "WEBSITE FOOTER FETCH RESPONSE:",
            data
          );


          if (
            data
          ) {

            setFooterData(
              data
            );

          }

        } catch (
          error
        ) {

          console.error(
            "WEBSITE FOOTER FETCH ERROR:",
            error?.response?.data ||
              error
          );

        } finally {

          setFooterLoading(
            false
          );

        }

      };


    loadFooter();

  }, [
    footer,
  ]);


  /* =======================================================
     NORMALIZED BRANDING
  ======================================================= */

  const normalizedBranding =
    useMemo(
      () =>
        normalizeBranding(
          branding
        ),
      [
        branding,
      ]
    );


  /* =======================================================
     NORMALIZE FOOTER DATA
  ======================================================= */

  const normalizedFooter =
    useMemo(
      () => ({

        description:
          footerData?.description ||
          "",


        facebook_url:
          footerData?.facebook_url ||
          footerData?.facebook ||
          footerData?.facebookUrl ||
          "",


        instagram_url:
          footerData?.instagram_url ||
          footerData?.instagram ||
          footerData?.instagramUrl ||
          "",


        youtube_url:
          footerData?.youtube_url ||
          footerData?.youtube ||
          footerData?.youtubeUrl ||
          "",


        address:
          footerData?.address ||
          "",


        phone:
          footerData?.phone ||
          "",


        email:
          footerData?.email ||
          "",

      }),
      [
        footerData,
      ]
    );


  /* =======================================================
     LOGO
  ======================================================= */

  const logo =
    branding?.logo ||
    branding?.logoUrl ||
    branding?.logo_url ||
    institute?.logo ||
    institute?.logo_url ||
    institute?.logoUrl ||
    website?.logo ||
    website?.logo_url ||
    website?.logoUrl ||
    null;


  /* =======================================================
     INSTITUTE NAME
  ======================================================= */

  const displayName =
    instituteName ||
    institute?.name ||
    institute?.instituteName ||
    institute?.institute_name ||
    website?.name ||
    website?.website_name ||
    website?.instituteName ||
    website?.institute_name ||
    "Fine Arts Institute";


  /* =======================================================
     FOOTER CONTENT
  ======================================================= */

  const description =
    normalizedFooter.description ||
    "Learn, create and grow with our institute.";


  const address =
    normalizedFooter.address;


  const phone =
    normalizedFooter.phone;


  const email =
    normalizedFooter.email;


  const facebook =
    normalizedFooter.facebook_url;


  const instagram =
    normalizedFooter.instagram_url;


  const youtube =
    normalizedFooter.youtube_url;


  /* =======================================================
     FOOTER FONT STYLES
  ======================================================= */

  const footerFontFamily =
    `'${normalizedBranding.footerFont}', sans-serif`;


  const footerHeadingFontFamily =
    `'${normalizedBranding.footerHeadingFont}', sans-serif`;


  const footerTextFontFamily =
    `'${normalizedBranding.footerTextFont}', sans-serif`;


  /* =======================================================
     LOADING
  ======================================================= */

  if (
    footerLoading &&
    !footerData
  ) {

    return null;

  }


  /* =======================================================
     FOOTER
  ======================================================= */

  return (

    <footer
      style={{

        width:
          "100%",

        marginTop:
          "60px",

        backgroundColor:
          normalizedBranding.footerBackgroundColor,

        color:
          normalizedBranding.footerTextColor,

        boxSizing:
          "border-box",

        fontFamily:
          footerFontFamily,

      }}
    >

      {/* ===================================================
          MAIN FOOTER
      =================================================== */}

      <div
        className="website-footer-main"

        style={{

          maxWidth:
            "1200px",

          margin:
            "0 auto",

          padding:
            "60px 24px 45px",

          display:
            "grid",

          gridTemplateColumns:
            "2fr 1fr 1.5fr",

          gap:
            "40px",

          boxSizing:
            "border-box",

        }}
      >

        {/* =================================================
            BRAND
        ================================================= */}

        <div
          style={{
            minWidth:
              0,
          }}
        >

          <Link
            to="/institute/website/preview"

            style={{

              display:
                "inline-flex",

              alignItems:
                "center",

              gap:
                "12px",

              textDecoration:
                "none",

              color:
                normalizedBranding.footerHeadingColor,

              marginBottom:
                "18px",

            }}
          >

            {/* =============================================
                LOGO
            ============================================= */}

            {logo ? (

              <img
                src={
                  logo
                }

                alt={
                  displayName
                }

                style={{

                  width:
                    "48px",

                  height:
                    "48px",

                  objectFit:
                    "contain",

                  borderRadius:
                    "8px",

                  background:
                    "#FFFFFF",

                  display:
                    "block",

                }}
              />

            ) : (

              <div
                style={{

                  width:
                    "48px",

                  height:
                    "48px",

                  borderRadius:
                    "8px",

                  display:
                    "flex",

                  alignItems:
                    "center",

                  justifyContent:
                    "center",

                  backgroundColor:
                    normalizedBranding.footerIconColor,

                  color:
                    normalizedBranding.footerBackgroundColor,

                  fontSize:
                    "20px",

                  fontWeight:
                    "800",

                  fontFamily:
                    footerHeadingFontFamily,

                }}
              >

                {displayName
                  ?.charAt(0)
                  ?.toUpperCase()}

              </div>

            )}


            {/* =============================================
                INSTITUTE NAME
            ============================================= */}

            <span
              style={{

                fontSize:
                  "24px",

                fontWeight:
                  normalizedBranding.footerHeadingWeight,

                lineHeight:
                  normalizedBranding.footerHeadingLineHeight,

                color:
                  normalizedBranding.footerHeadingColor,

                fontFamily:
                  footerHeadingFontFamily,

                letterSpacing:
                  normalizedBranding.footerLetterSpacing,

              }}
            >
              {displayName}
            </span>

          </Link>


          {/* =================================================
              DESCRIPTION
          ================================================= */}

          <p
            style={{

              maxWidth:
                "430px",

              margin:
                "0",

              color:
                normalizedBranding.footerTextColor,

              opacity:
                0.9,

              lineHeight:
                normalizedBranding.footerTextLineHeight,

              fontSize:
                "15px",

              fontWeight:
                normalizedBranding.footerTextWeight,

              fontFamily:
                footerTextFontFamily,

              letterSpacing:
                normalizedBranding.footerLetterSpacing,

            }}
          >
            {description}
          </p>


          {/* =================================================
              SOCIAL MEDIA
          ================================================= */}

          <div
            style={{
              marginTop:
                "26px",
            }}
          >

            <FooterHeading>
              Follow Us
            </FooterHeading>


            <div
              style={{

                display:
                  "flex",

                alignItems:
                  "center",

                gap:
                  "10px",

              }}
            >

              <SocialLink
                href={
                  facebook
                }

                label="Facebook"

                configured={
                  Boolean(
                    facebook
                  )
                }

                branding={
                  normalizedBranding
                }
              >
                <FaFacebookF />
              </SocialLink>


              <SocialLink
                href={
                  instagram
                }

                label="Instagram"

                configured={
                  Boolean(
                    instagram
                  )
                }

                branding={
                  normalizedBranding
                }
              >
                <FaInstagram />
              </SocialLink>


              <SocialLink
                href={
                  youtube
                }

                label="YouTube"

                configured={
                  Boolean(
                    youtube
                  )
                }

                branding={
                  normalizedBranding
                }
              >
                <FaYoutube />
              </SocialLink>

            </div>


            {/* =================================================
                SOCIAL FALLBACK
            ================================================= */}

            {!facebook &&
              !instagram &&
              !youtube && (

                <p
                  style={{

                    margin:
                      "10px 0 0",

                    color:
                      normalizedBranding.footerTextColor,

                    opacity:
                      0.6,

                    fontSize:
                      "11px",

                    fontFamily:
                      footerTextFontFamily,

                  }}
                >
                  Social media links can be added
                  from the institute dashboard.
                </p>

              )}

          </div>

        </div>


        {/* =================================================
            QUICK LINKS
        ================================================= */}

        <div>

          <FooterHeading>
            Quick Links
          </FooterHeading>


          <div
            style={{

              display:
                "flex",

              flexDirection:
                "column",

              gap:
                "12px",

            }}
          >

            <FooterLink
              to="/institute/website/preview"
              label="Home"
              branding={
                normalizedBranding
              }
            />


            <FooterLink
              to="/institute/website/preview/about"
              label="About"
              branding={
                normalizedBranding
              }
            />


            <FooterLink
              to="/institute/website/preview/classes"
              label="Classes"
              branding={
                normalizedBranding
              }
            />


            <FooterLink
              to="/institute/website/preview/sessions"
              label="Sessions"
              branding={
                normalizedBranding
              }
            />


            <FooterLink
              to="/institute/website/preview/trainers"
              label="Trainers"
              branding={
                normalizedBranding
              }
            />


            <FooterLink
              to="/institute/website/preview/testimonials"
              label="Testimonials"
              branding={
                normalizedBranding
              }
            />

          </div>

        </div>


        {/* =================================================
            CONTACT US
        ================================================= */}

        <div>

          <FooterHeading>
            Contact Us
          </FooterHeading>


          <div
            style={{

              display:
                "flex",

              flexDirection:
                "column",

              gap:
                "14px",

              color:
                normalizedBranding.footerTextColor,

              fontSize:
                "14px",

              lineHeight:
                normalizedBranding.footerTextLineHeight,

              fontWeight:
                normalizedBranding.footerTextWeight,

              fontFamily:
                footerTextFontFamily,

            }}
          >

            {/* =============================================
                ADDRESS
            ============================================= */}

            {address && (

              <div>

                <ContactLabel>
                  Address
                </ContactLabel>


                <span>
                  {address}
                </span>

              </div>

            )}


            {/* =============================================
                PHONE
            ============================================= */}

            {phone && (

              <div>

                <ContactLabel>
                  Phone
                </ContactLabel>


                <a
                  href={`tel:${phone}`}

                  style={{

                    color:
                      normalizedBranding.footerTextColor,

                    textDecoration:
                      "none",

                    fontFamily:
                      footerTextFontFamily,

                  }}
                >
                  {phone}
                </a>

              </div>

            )}


            {/* =============================================
                EMAIL
            ============================================= */}

            {email && (

              <div>

                <ContactLabel>
                  Email
                </ContactLabel>


                <a
                  href={`mailto:${email}`}

                  style={{

                    color:
                      normalizedBranding.footerTextColor,

                    textDecoration:
                      "none",

                    wordBreak:
                      "break-word",

                    fontFamily:
                      footerTextFontFamily,

                  }}
                >
                  {email}
                </a>

              </div>

            )}


            {/* =============================================
                NO CONTACT DATA
            ============================================= */}

            {!address &&
              !phone &&
              !email && (

                <p
                  style={{

                    margin:
                      "0",

                    color:
                      normalizedBranding.footerTextColor,

                    opacity:
                      0.6,

                    fontSize:
                      "13px",

                    fontFamily:
                      footerTextFontFamily,

                  }}
                >
                  Contact information will be
                  available soon.
                </p>

              )}

          </div>

        </div>

      </div>


      {/* ===================================================
          BOTTOM FOOTER
      =================================================== */}

      <div
        style={{

          borderTop:
            `1px solid ${normalizedBranding.footerTextColor}30`,

          width:
            "100%",

        }}
      >

        <div
          className="website-footer-bottom"

          style={{

            maxWidth:
              "1200px",

            margin:
              "0 auto",

            padding:
              "20px 24px",

            display:
              "flex",

            alignItems:
              "center",

            justifyContent:
              "space-between",

            gap:
              "20px",

            flexWrap:
              "wrap",

            boxSizing:
              "border-box",

          }}
        >

          <p
            style={{

              margin:
                "0",

              color:
                normalizedBranding.footerTextColor,

              opacity:
                0.75,

              fontSize:
                "14px",

              fontFamily:
                footerTextFontFamily,

              fontWeight:
                normalizedBranding.footerTextWeight,

            }}
          >
            © {new Date().getFullYear()}{" "}
            {displayName}. All rights reserved.
          </p>


          <div
            style={{

              color:
                normalizedBranding.footerTextColor,

              opacity:
                0.6,

              fontSize:
                "13px",

              fontFamily:
                footerTextFontFamily,

            }}
          >
            Powered by Fine Arts
          </div>

        </div>

      </div>


      {/* ===================================================
          RESPONSIVE CSS
      =================================================== */}

      <style>
        {`

          .website-footer-main {
            grid-template-columns:
              2fr 1fr 1.5fr;
          }


          @media (max-width: 900px) {

            .website-footer-main {

              grid-template-columns:
                1fr 1fr !important;

            }

          }


          @media (max-width: 600px) {

            .website-footer-main {

              grid-template-columns:
                1fr !important;

              padding:
                45px 20px 35px !important;

              gap:
                35px !important;

            }


            .website-footer-bottom {

              padding:
                18px 20px !important;

              flex-direction:
                column !important;

              align-items:
                flex-start !important;

            }

          }

        `}
      </style>

    </footer>

  );
};


/* =========================================================
   FOOTER HEADING
========================================================= */

const FooterHeading = ({
  children,
}) => {

  return (

    <h3
      style={{

        margin:
          "0 0 18px",

        fontSize:
          "16px",

        fontWeight:
          "700",

        color:
          "inherit",

      }}
    >
      {children}
    </h3>

  );
};


/* =========================================================
   CONTACT LABEL
========================================================= */

const ContactLabel = ({
  children,
}) => {

  return (

    <strong
      style={{

        display:
          "block",

        color:
          "inherit",

        marginBottom:
          "3px",

        fontWeight:
          "700",

      }}
    >
      {children}
    </strong>

  );
};


/* =========================================================
   FOOTER LINK
========================================================= */

const FooterLink = ({
  to,
  label,
  branding,
}) => {

  const [
    hovered,
    setHovered,
  ] = useState(false);


  return (

    <Link
      to={
        to
      }

      onMouseEnter={() =>
        setHovered(
          true
        )
      }

      onMouseLeave={() =>
        setHovered(
          false
        )
      }

      style={{

        color:
          hovered
            ? branding.footerIconColor
            : branding.footerTextColor,

        opacity:
          hovered
            ? 1
            : 0.9,

        textDecoration:
          "none",

        fontSize:
          "14px",

        fontFamily:
          `'${branding.footerTextFont}', sans-serif`,

        fontWeight:
          branding.footerTextWeight,

        transition:
          "all 0.2s ease",

        transform:
          hovered
            ? "translateX(3px)"
            : "translateX(0)",

      }}
    >
      {label}
    </Link>

  );
};


/* =========================================================
   SOCIAL LINK
========================================================= */

const SocialLink = ({
  href,
  label,
  children,
  configured,
  branding,
}) => {

  const [
    hovered,
    setHovered,
  ] = useState(false);


  const iconColor =
    branding.footerIconColor;


  const footerTextColor =
    branding.footerTextColor;


  const footerBackgroundColor =
    branding.footerBackgroundColor;


  return (

    <a
      href={
        configured
          ? href
          : undefined
      }

      target={
        configured
          ? "_blank"
          : undefined
      }

      rel={
        configured
          ? "noopener noreferrer"
          : undefined
      }

      aria-label={
        label
      }

      title={
        configured
          ? label
          : `${label} link not configured`
      }

      onClick={(event) => {

        if (
          !configured
        ) {

          event.preventDefault();

        }

      }}

      onMouseEnter={() =>
        setHovered(
          true
        )
      }

      onMouseLeave={() =>
        setHovered(
          false
        )
      }

      style={{

        width:
          "40px",

        height:
          "40px",

        display:
          "flex",

        alignItems:
          "center",

        justifyContent:
          "center",

        borderRadius:
          "50%",


        backgroundColor:
          hovered &&
          configured
            ? iconColor
            : branding.footerIconBackground,


        color:
          hovered &&
          configured
            ? footerBackgroundColor
            : configured
              ? footerTextColor
              : `${footerTextColor}80`,


        textDecoration:
          "none",


        fontSize:
          `${branding.footerIconSize}px`,


        border:
          `1px solid ${branding.footerIconBorder}`,


        cursor:
          configured
            ? "pointer"
            : "default",


        transition:
          "all 0.25s ease",


        opacity:
          configured
            ? 1
            : 0.75,


        transform:
          hovered &&
          configured
            ? "translateY(-3px)"
            : "translateY(0)",

      }}
    >
      {children}
    </a>

  );
};


export default WebsiteFooter;