

import React, {

  useCallback,

  useEffect,

  useMemo,

  useState,

} from "react";



import {

  Link,

  useLocation,

  useNavigate,

} from "react-router-dom";



import {

  getAuth,

  onAuthStateChanged,

  signOut,

} from "firebase/auth";



import API from "../../services/api";



/* =========================================================

   WEBSITE NAVBAR

   BLACK + RADIANT BLUE THEME

========================================================= */



const WebsiteNavbar = ({

  website = {},

  institute = {},

  branding = {},

  instituteName: propInstituteName,

  logo: propLogo,

}) => {

  const navigate = useNavigate();

  const location = useLocation();



  /* =======================================================

     STATE

  ======================================================= */



  const [student, setStudent] = useState(null);

  const [studentLoggedIn, setStudentLoggedIn] =

    useState(false);

  const [loadingStudent, setLoadingStudent] =

    useState(false);

  const [loggingOut, setLoggingOut] =

    useState(false);

  const [mobileMenuOpen, setMobileMenuOpen] =

    useState(false);



  /* =======================================================

     ROUTES

  ======================================================= */



  const previewBase =

    "/institute/website/preview";



  const homePath = previewBase;



  const aboutPath =

    `${previewBase}/about`;



  const classesPath =

    `${previewBase}/classes`;



  const trainersPath =

    `${previewBase}/trainers`;



  const testimonialsPath =

    `${previewBase}/testimonials`;



  const loginPath =

    `${previewBase}/login`;



  const studentDashboardPath =

    `${previewBase}/dashboard`;



  /* =======================================================

     INSTITUTE ID

  ======================================================= */



  const getInstituteId = useCallback(() => {

    const candidates = [

      institute?.id,

      institute?.institute_id,

      institute?.instituteId,



      website?.institute_id,

      website?.instituteId,



      website?.institute?.id,

      website?.institute?.institute_id,



      localStorage.getItem(

        "studentInstituteId"

      ),

    ];



    for (const value of candidates) {

      if (

        value !== undefined &&

        value !== null &&

        String(value).trim() !== ""

      ) {

        const numericValue = Number(value);



        if (

          Number.isFinite(numericValue)

        ) {

          return numericValue;

        }

      }

    }



    /* -----------------------------------------------------

       STORED INSTITUTE OBJECT

    ----------------------------------------------------- */



    try {

      const storedInstitute =

        localStorage.getItem(

          "institute"

        );



      if (storedInstitute) {

        const parsed =

          JSON.parse(storedInstitute);



        const storedId =

          parsed?.id ??

          parsed?.institute_id ??

          parsed?.instituteId;



        if (

          storedId !== undefined &&

          storedId !== null &&

          String(storedId).trim() !== ""

        ) {

          const numericValue =

            Number(storedId);



          if (

            Number.isFinite(

              numericValue

            )

          ) {

            return numericValue;

          }

        }

      }

    } catch (error) {

      console.warn(

        "Could not read institute from localStorage:",

        error

      );

    }



    return null;

  }, [

    institute,

    website,

  ]);



  /* =======================================================

     READ STUDENT SESSION

  ======================================================= */



  const readStudentSession =

    useCallback(() => {

      const studentRole =

        String(

          localStorage.getItem(

            "studentRole"

          ) || ""

        )

          .trim()

          .toUpperCase();



      const loggedValue =

        String(

          localStorage.getItem(

            "studentLoggedIn"

          ) || ""

        )

          .trim()

          .toLowerCase();



      const isLogged =

        loggedValue === "true" ||

        loggedValue === "1";



      const studentProfile =

        localStorage.getItem(

          "studentProfile"

        );



      const active =

        studentRole === "STUDENT" &&

        isLogged;



      setStudentLoggedIn(active);



      if (!active) {

        setStudent(null);

        return false;

      }



      /* ---------------------------------------------------

         LOAD CACHED STUDENT PROFILE

      --------------------------------------------------- */



      if (studentProfile) {

        try {

          const parsed =

            JSON.parse(

              studentProfile

            );



          if (parsed) {

            setStudent(parsed);

          }

        } catch (error) {

          console.warn(

            "Invalid studentProfile:",

            error

          );



          localStorage.removeItem(

            "studentProfile"

          );

        }

      }



      return true;

    }, []);



  /* =======================================================

     CLEAR STUDENT SESSION

  ======================================================= */



  const clearStudentSession =

    useCallback(() => {

      localStorage.removeItem(

        "studentToken"

      );



      localStorage.removeItem(

        "studentUser"

      );



      localStorage.removeItem(

        "studentRole"

      );



      localStorage.removeItem(

        "studentLoggedIn"

      );



      localStorage.removeItem(

        "isStudentLoggedIn"

      );



      localStorage.removeItem(

        "studentProfile"

      );



      localStorage.removeItem(

        "studentInstituteId"

      );



      setStudent(null);

      setStudentLoggedIn(false);

    }, []);



  /* =======================================================

     LOAD STUDENT PROFILE

  ======================================================= */



  const loadStudent = useCallback(

    async (firebaseUser = null) => {

      const active =

        readStudentSession();



      if (!active) {

        setLoadingStudent(false);

        return;

      }



      try {

        setLoadingStudent(true);



        const auth = getAuth();



        const currentUser =

          firebaseUser ||

          auth.currentUser;



        /*

         * Firebase may not be ready immediately.

         * Keep cached student session.

         */



        if (!currentUser) {

          console.warn(

            "Student session exists but Firebase user is not ready."

          );



          setLoadingStudent(false);

          return;

        }



        /* -----------------------------------------------

           INSTITUTE

        ------------------------------------------------ */



        const instituteId =

          getInstituteId();



        if (!instituteId) {

          console.warn(

            "Student institute ID missing."

          );



          setLoadingStudent(false);

          return;

        }



        /* -----------------------------------------------

           FRESH FIREBASE TOKEN

        ------------------------------------------------ */



        try {

          const token =

            await currentUser.getIdToken(

              true

            );



          if (token) {

            localStorage.setItem(

              "studentToken",

              token

            );



            localStorage.setItem(

              "token",

              token

            );

          }

        } catch (tokenError) {

          console.warn(

            "Could not refresh Firebase token:",

            tokenError

          );

        }



        const stillActive =

          readStudentSession();



        if (!stillActive) {

          setLoadingStudent(false);

          return;

        }



        /* -----------------------------------------------

           GET STUDENT PROFILE

        ------------------------------------------------ */



        try {

          const response =

            await API.get(

              "/students/me",

              {

                params: {

                  institute_id:

                    instituteId,

                },

              }

            );



          const profile =

            response?.data?.data ||

            response?.data?.student ||

            null;



          if (profile) {

            setStudent(profile);



            localStorage.setItem(

              "studentProfile",

              JSON.stringify(profile)

            );



            localStorage.setItem(

              "studentRole",

              "STUDENT"

            );



            localStorage.setItem(

              "studentLoggedIn",

              "true"

            );



            localStorage.setItem(

              "studentInstituteId",

              String(instituteId)

            );



            setStudentLoggedIn(true);

          }

        } catch (error) {

          console.error(

            "STUDENT PROFILE FETCH ERROR:",

            error?.response?.status,

            error?.response?.data ||

              error

          );



          /*

           * Do not automatically logout.

           * Cached student session remains valid.

           */

        }

      } finally {

        setLoadingStudent(false);

      }

    },

    [

      getInstituteId,

      readStudentSession,

    ]

  );



  /* =======================================================

     AUTH STATE LISTENER

  ======================================================= */



  useEffect(() => {

    const auth = getAuth();



    const active =

      readStudentSession();



    if (!active) {

      setLoadingStudent(false);

    }



    const unsubscribe =

      onAuthStateChanged(

        auth,

        async (firebaseUser) => {

          const studentActive =

            readStudentSession();



          if (

            studentActive &&

            firebaseUser

          ) {

            await loadStudent(

              firebaseUser

            );



            return;

          }



          /*

           * If Firebase user temporarily becomes null,

           * keep cached website student session.

           */



          if (

            studentActive &&

            !firebaseUser

          ) {

            setStudentLoggedIn(true);

            return;

          }



          /*

           * No student session.

           */



          setStudentLoggedIn(false);

          setStudent(null);

          setLoadingStudent(false);

        }

      );



    /* =====================================================

       CUSTOM STUDENT LOGIN EVENT

    ===================================================== */



    const handleStudentAuthChanged =

      () => {

        const active =

          readStudentSession();



        if (active) {

          const currentUser =

            getAuth().currentUser;



          setStudentLoggedIn(true);



          if (currentUser) {

            loadStudent(

              currentUser

            );

          }

        } else {

          setStudentLoggedIn(false);

          setStudent(null);

        }

      };



    window.addEventListener(

      "studentAuthChanged",

      handleStudentAuthChanged

    );



    /* =====================================================

       STORAGE EVENT

    ===================================================== */



    const handleStorage =

      (event) => {

        if (

          event.key ===

            "studentLoggedIn" ||

          event.key ===

            "studentRole" ||

          event.key ===

            "studentProfile" ||

          event.key ===

            "studentToken" ||

          event.key ===

            "studentInstituteId"

        ) {

          readStudentSession();

        }

      };



    window.addEventListener(

      "storage",

      handleStorage

    );



    return () => {

      unsubscribe();



      window.removeEventListener(

        "studentAuthChanged",

        handleStudentAuthChanged

      );



      window.removeEventListener(

        "storage",

        handleStorage

      );

    };

  }, [

    loadStudent,

    readStudentSession,

  ]);



  /* =======================================================

     INSTITUTE NAME

  ======================================================= */



  const finalInstituteName =

    propInstituteName ||

    institute?.name ||

    institute?.institute_name ||

    website?.website_name ||

    website?.name ||

    "Fine Arts";



  /* =======================================================

     LOGO

  ======================================================= */



  const logo =

    propLogo ||

    institute?.logo ||

    institute?.logo_url ||

    website?.logo ||

    website?.logo_url ||

    branding?.logo ||

    branding?.logo_url ||

    null;



  /* =======================================================

     BRANDING

  ======================================================= */



  const navbarBranding =

    useMemo(() => {

      return {

        navbarBackgroundColor:

          "#000000",



        navbarTextColor:

          "#E2E8F0",



        navbarActiveColor:

          "#38D7FF",



        navbarButtonColor:

          "#008CFF",



        navbarButtonTextColor:

          "#FFFFFF",



        navbarBorderColor:

          "#008CFF",



        navbarGlowColor:

          "#38D7FF",



        navbarFont:

          branding?.navbarFont ||

          branding?.navbar_font ||

          branding?.fontBody ||

          branding?.font_body ||

          "Inter",



        navbarFontSize:

          branding?.navbarFontSize ||

          branding?.navbar_font_size ||

          "14px",



        navbarFontWeight:

          branding?.navbarFontWeight ||

          branding?.navbar_font_weight ||

          500,



        navbarLetterSpacing:

          branding?.navbarLetterSpacing ??

          branding?.navbar_letter_spacing ??

          "0px",



        logoRadius:

          branding?.logoRadius ||

          branding?.logo_radius ||

          "10px",



        buttonRadius:

          branding?.buttonRadius ||

          branding?.button_radius ||

          "8px",



        buttonFontWeight:

          branding?.buttonFontWeight ||

          branding?.button_font_weight ||

          700,

      };

    }, [branding]);



  /* =======================================================

     ACTIVE ROUTE

  ======================================================= */



  const isActive = (path) => {

    if (path === homePath) {

      return (

        location.pathname ===

        homePath

      );

    }



    return location.pathname.startsWith(

      path

    );

  };



  /* =======================================================

     STUDENT NAME

  ======================================================= */



  const studentName =

    student?.user?.full_name ||

    student?.user?.name ||

    student?.full_name ||

    student?.name ||

    student?.student?.full_name ||

    student?.student?.name ||

    "Student";



  void studentName;

  void loadingStudent;



  /* =======================================================

     STUDENT LOGOUT

  ======================================================= */



  const handleLogout =

    async () => {

      if (loggingOut) {

        return;

      }



      try {

        setLoggingOut(true);



        clearStudentSession();



        try {

          await signOut(getAuth());

        } catch (firebaseError) {

          console.warn(

            "Firebase student logout error:",

            firebaseError

          );

        }



        window.dispatchEvent(

          new Event(

            "studentAuthChanged"

          )

        );



        setMobileMenuOpen(false);



        navigate(

          loginPath,

          {

            replace: true,

          }

        );

      } finally {

        setLoggingOut(false);

      }

    };



  /* =======================================================

     BUTTON STYLE

  ======================================================= */



  const buttonStyle = {

    textDecoration: "none",



    display: "inline-flex",



    alignItems: "center",



    justifyContent: "center",



    padding: "8px 16px",



    minHeight: "36px",



    borderRadius:

      "8px",



    background:

      `linear-gradient(

        135deg,

        ${navbarBranding.navbarButtonColor},

        #0066FF

      )`,



    color:

      navbarBranding.navbarButtonTextColor,



    fontFamily:

      `'${navbarBranding.navbarFont}', sans-serif`,



    fontSize: "13px",



    fontWeight:

      navbarBranding.buttonFontWeight,



    letterSpacing:

      navbarBranding.navbarLetterSpacing,



    lineHeight: "1",



    border:

      "1px solid rgba(56,215,255,0.25)",



    cursor: "pointer",



    transition:

      "all 0.25s ease",



    whiteSpace: "nowrap",



    boxShadow:

      "0 0 18px rgba(0,140,255,0.22)",

  };



  /* =======================================================

     STUDENT AUTH UI

  ======================================================= */



  const renderStudentAuth =

    () => {

      if (studentLoggedIn) {

        return (

          <div className="flex items-center gap-2">



            <Link

              to={

                studentDashboardPath

              }

              style={

                buttonStyle

              }

              onClick={() =>

                setMobileMenuOpen(false)

              }

            >

              Dashboard

            </Link>



            <button

              type="button"

              onClick={

                handleLogout

              }

              disabled={

                loggingOut

              }

              style={{

                ...buttonStyle,



                background:

                  "linear-gradient(135deg,#111827,#02050A)",



                border:

                  "1px solid rgba(56,215,255,0.35)",



                color:

                  "#CBD5E1",



                opacity:

                  loggingOut

                    ? 0.6

                    : 1,



                cursor:

                  loggingOut

                    ? "not-allowed"

                    : "pointer",



                boxShadow:

                  "0 0 14px rgba(56,215,255,0.08)",

              }}

            >

              {

                loggingOut

                  ? "Logging out..."

                  : "Logout"

              }

            </button>



          </div>

        );

      }



      return (

        <Link

          to={loginPath}

          style={buttonStyle}

          onClick={() =>

            setMobileMenuOpen(false)

          }

        >

          Student Login

        </Link>

      );

    };



  /* =======================================================

     HEADER

  ======================================================= */



  return (

    <>

      <header

        className="website-navbar"

        style={{

          position: "relative",



          zIndex: 1000,



          width: "100%",



          background:

            "#000000",



          borderBottom:

            "1px solid rgba(0,140,255,0.28)",



          boxShadow:

            "0 4px 30px rgba(0,0,0,0.55), 0 1px 20px rgba(0,140,255,0.08)",



          fontFamily:

            `'${navbarBranding.navbarFont}', sans-serif`,

        }}

      >



        {/* =================================================

            TOP RADIANT BLUE LINE

        ================================================= */}



        <div

          style={{

            position: "absolute",



            top: 0,



            left: "50%",



            transform:

              "translateX(-50%)",



            width: "45%",



            height: "2px",



            background:

              "linear-gradient(90deg,transparent,#008CFF,#38D7FF,#008CFF,transparent)",



            boxShadow:

              "0 0 18px rgba(56,215,255,0.65)",

          }}

        />



        {/* =================================================

            DESKTOP / MAIN HEADER

        ================================================= */}



        <div

          className="website-navbar-container"

          style={{

            maxWidth: "1280px",



            margin: "0 auto",



            padding: "8px 20px",



            minHeight: "62px",



            display: "flex",



            alignItems: "center",



            justifyContent:

              "space-between",



            gap: "22px",



            boxSizing:

              "border-box",

          }}

        >



          {/* =================================================

              LOGO

          ================================================= */}



          <Link

            to={homePath}

            className="website-logo-link"

            style={{

              textDecoration: "none",



              display: "flex",



              alignItems: "center",



              gap: "10px",



              minWidth: "190px",



              flexShrink: 0,

            }}

          >



            {logo ? (

              <img

                src={logo}

                alt={

                  finalInstituteName

                }

                style={{

                  width: "40px",



                  height: "40px",



                  objectFit: "cover",



                  borderRadius:

                    navbarBranding.logoRadius,



                  border:

                    "1px solid rgba(56,215,255,0.45)",



                  boxShadow:

                    "0 0 18px rgba(0,140,255,0.28)",

                }}

                onError={(event) => {

                  event.currentTarget.style.display =

                    "none";

                }}

              />

            ) : (

              <div

                style={{

                  width: "40px",



                  height: "40px",



                  borderRadius:

                    navbarBranding.logoRadius,



                  display: "flex",



                  alignItems: "center",



                  justifyContent:

                    "center",



                  background:

                    "linear-gradient(135deg,#008CFF,#0055FF)",



                  color: "#FFFFFF",



                  fontSize: "16px",



                  fontWeight: "800",



                  border:

                    "1px solid rgba(56,215,255,0.5)",



                  boxShadow:

                    "0 0 22px rgba(0,140,255,0.35)",

                }}

              >

                {finalInstituteName

                  .charAt(0)

                  .toUpperCase()}

              </div>

            )}



            <span

              style={{

                fontSize: "17px",



                fontWeight: "800",



                color: "#F8FAFC",



                maxWidth: "175px",



                overflow: "hidden",



                textOverflow:

                  "ellipsis",



                whiteSpace: "nowrap",



                textShadow:

                  "0 0 15px rgba(56,215,255,0.15)",

              }}

            >

              {finalInstituteName}

            </span>



          </Link>



          {/* =================================================

              DESKTOP NAVIGATION



              Sessions REMOVED

          ================================================= */}



          <nav

            className="website-desktop-navigation"

            style={{

              display: "flex",



              alignItems: "center",



              justifyContent: "center",



              gap: "22px",



              flex: 1,

            }}

          >



            <NavbarLink

              to={homePath}

              active={

                isActive(homePath)

              }

              branding={

                navbarBranding

              }

            >

              Home

            </NavbarLink>



            <NavbarLink

              to={aboutPath}

              active={

                isActive(aboutPath)

              }

              branding={

                navbarBranding

              }

            >

              About

            </NavbarLink>



            <NavbarLink

              to={classesPath}

              active={

                isActive(

                  classesPath

                )

              }

              branding={

                navbarBranding

              }

            >

              Classes

            </NavbarLink>



            <NavbarLink

              to={trainersPath}

              active={

                isActive(

                  trainersPath

                )

              }

              branding={

                navbarBranding

              }

            >

              Trainers

            </NavbarLink>



            <NavbarLink

              to={testimonialsPath}

              active={

                isActive(

                  testimonialsPath

                )

              }

              branding={

                navbarBranding

              }

            >

              Testimonials

            </NavbarLink>



          </nav>



          {/* =================================================

              DESKTOP STUDENT AUTH

          ================================================= */}



          <div

            className="website-desktop-auth"

            style={{

              display: "flex",



              alignItems: "center",



              gap: "8px",



              minWidth: "190px",



              justifyContent:

                "flex-end",

            }}

          >

            {renderStudentAuth()}

          </div>



          {/* =================================================

              MOBILE MENU BUTTON

          ================================================= */}



          <button

            type="button"

            className="website-mobile-menu-button"

            onClick={() =>

              setMobileMenuOpen(

                (value) => !value

              )

            }

            aria-label={

              mobileMenuOpen

                ? "Close menu"

                : "Open menu"

            }

            style={{

              display: "none",



              width: "40px",



              height: "40px",



              alignItems: "center",



              justifyContent: "center",



              borderRadius: "8px",



              border:

                "1px solid rgba(0,140,255,0.35)",



              background:

                "rgba(0,140,255,0.08)",



              color: "#38D7FF",



              cursor: "pointer",



              fontSize: "20px",



              boxShadow:

                "0 0 15px rgba(0,140,255,0.12)",

            }}

          >

            {mobileMenuOpen

              ? "×"

              : "☰"}

          </button>



        </div>



        {/* =================================================

            MOBILE NAVIGATION



            Sessions REMOVED

        ================================================= */}



        <div

          className={`website-mobile-navigation ${

            mobileMenuOpen

              ? "is-open"

              : ""

          }`}

        >



          <MobileNavbarLink

            to={homePath}

            active={

              isActive(homePath)

            }

            branding={

              navbarBranding

            }

            onClick={() =>

              setMobileMenuOpen(

                false

              )

            }

          >

            Home

          </MobileNavbarLink>



          <MobileNavbarLink

            to={aboutPath}

            active={

              isActive(aboutPath)

            }

            branding={

              navbarBranding

            }

            onClick={() =>

              setMobileMenuOpen(

                false

              )

            }

          >

            About

          </MobileNavbarLink>



          <MobileNavbarLink

            to={classesPath}

            active={

              isActive(

                classesPath

              )

            }

            branding={

              navbarBranding

            }

            onClick={() =>

              setMobileMenuOpen(

                false

              )

            }

          >

            Classes

          </MobileNavbarLink>



          <MobileNavbarLink

            to={trainersPath}

            active={

              isActive(

                trainersPath

              )

            }

            branding={

              navbarBranding

            }

            onClick={() =>

              setMobileMenuOpen(

                false

              )

            }

          >

            Trainers

          </MobileNavbarLink>



          <MobileNavbarLink

            to={testimonialsPath}

            active={

              isActive(

                testimonialsPath

              )

            }

            branding={

              navbarBranding

            }

            onClick={() =>

              setMobileMenuOpen(

                false

              )

            }

          >

            Testimonials

          </MobileNavbarLink>



          {/* MOBILE AUTHENTICATION */}



          <div

            className="mobile-auth-container"

          >

            {studentLoggedIn ? (

              <>

                <Link

                  to={

                    studentDashboardPath

                  }

                  onClick={() =>

                    setMobileMenuOpen(

                      false

                    )

                  }

                  style={{

                    ...buttonStyle,

                    width: "100%",

                  }}

                >

                  Dashboard

                </Link>



                <button

                  type="button"

                  onClick={

                    handleLogout

                  }

                  disabled={

                    loggingOut

                  }

                  style={{

                    ...buttonStyle,



                    width: "100%",



                    background:

                      "linear-gradient(135deg,#111827,#02050A)",



                    color:

                      "#CBD5E1",



                    border:

                      "1px solid rgba(56,215,255,0.35)",

                  }}

                >

                  {

                    loggingOut

                      ? "Logging out..."

                      : "Logout"

                  }

                </button>

              </>

            ) : (

              <Link

                to={loginPath}

                onClick={() =>

                  setMobileMenuOpen(

                    false

                  )

                }

                style={{

                  ...buttonStyle,

                  width: "100%",

                }}

              >

                Student Login

              </Link>

            )}

          </div>



        </div>



        {/* =================================================

            RESPONSIVE CSS

        ================================================= */}



        <style>

          {`

            .website-navbar {

              backdrop-filter: blur(18px);

              -webkit-backdrop-filter: blur(18px);

            }



            .website-desktop-navigation {

              display: flex;

            }



            .website-mobile-navigation {

              display: none;

            }



            .website-mobile-menu-button {

              display: none;

            }



            .mobile-auth-container {

              display: none;

            }



            .website-navbar a {

              -webkit-tap-highlight-color: transparent;

            }



            @media (max-width: 1100px) {

              .website-desktop-navigation {

                gap: 14px !important;

              }



              .website-navbar-container {

                gap: 12px !important;

                padding-left: 14px !important;

                padding-right: 14px !important;

              }



              .website-desktop-auth {

                min-width: auto !important;

              }

            }



            @media (max-width: 900px) {

              .website-desktop-navigation {

                display: none !important;

              }



              .website-desktop-auth {

                display: none !important;

              }



              .website-mobile-menu-button {

                display: flex !important;

              }



              .website-navbar-container {

                min-height: 58px !important;

                padding: 8px 14px !important;

              }



              .website-mobile-navigation {

                display: flex;

                flex-direction: column;

                gap: 3px;

                max-height: 0;

                overflow: hidden;

                opacity: 0;

                padding: 0 18px;



                background: #000000;



                border-top:

                  1px solid

                  rgba(0,140,255,0.08);



                transition:

                  max-height

                  0.35s ease,

                  opacity

                  0.25s ease,

                  padding

                  0.3s ease;

              }



              .website-mobile-navigation.is-open {

                max-height: 600px;

                opacity: 1;

                padding: 14px 18px 18px;

              }



              .mobile-auth-container {

                display: flex;

                flex-direction: column;

                gap: 8px;

                padding-top: 12px;

                margin-top: 8px;



                border-top:

                  1px solid

                  rgba(0,140,255,0.15);

              }

            }



            @media (max-width: 600px) {

              .website-navbar-container {

                padding: 7px 10px !important;

                min-height: 54px !important;

              }



              .website-navbar-container > a {

                min-width: auto !important;

              }



              .website-navbar-container > a > span {

                max-width: 135px !important;

                font-size: 15px !important;

              }



              .website-navbar-container > a > img,

              .website-navbar-container > a > div {

                width: 36px !important;

                height: 36px !important;

              }



              .website-mobile-menu-button {

                width: 38px !important;

                height: 38px !important;

              }

            }

          `}

        </style>



      </header>

    </>

  );

};



/* =========================================================

   DESKTOP NAV LINK

========================================================= */



function NavbarLink({

  to,

  active,

  branding,

  children,

}) {

  return (

    <Link

      to={to}

      style={{

        position: "relative",



        textDecoration: "none",



        color: active

          ? branding.navbarActiveColor

          : branding.navbarTextColor,



        fontFamily:

          `'${branding.navbarFont}', sans-serif`,



        fontSize:

          branding.navbarFontSize,



        fontWeight: active

          ? 700

          : branding.navbarFontWeight,



        letterSpacing:

          branding.navbarLetterSpacing,



        lineHeight: "1",



        whiteSpace: "nowrap",



        padding: "12px 0",



        transition:

          "all 0.25s ease",



        textShadow: active

          ? "0 0 12px rgba(56,215,255,0.55)"

          : "none",

      }}

      onMouseEnter={(event) => {

        if (!active) {

          event.currentTarget.style.color =

            "#38D7FF";



          event.currentTarget.style.textShadow =

            "0 0 12px rgba(56,215,255,0.45)";

        }

      }}

      onMouseLeave={(event) => {

        if (!active) {

          event.currentTarget.style.color =

            branding.navbarTextColor;



          event.currentTarget.style.textShadow =

            "none";

        }

      }}

    >

      {children}



      {active && (

        <span

          style={{

            position: "absolute",



            left: "50%",



            bottom: "3px",



            transform:

              "translateX(-50%)",



            width: "24px",



            height: "2px",



            borderRadius: "8px",



            background:

              "linear-gradient(90deg,#008CFF,#38D7FF)",



            boxShadow:

              "0 0 10px rgba(56,215,255,0.8)",

          }}

        />

      )}

    </Link>

  );

}



/* =========================================================

   MOBILE NAV LINK

========================================================= */



function MobileNavbarLink({

  to,

  active,

  branding,

  children,

  onClick,

}) {

  return (

    <Link

      to={to}

      onClick={onClick}

      style={{

        textDecoration: "none",



        color: active

          ? "#38D7FF"

          : branding.navbarTextColor,



        fontFamily:

          `'${branding.navbarFont}', sans-serif`,



        fontSize: "14px",



        fontWeight: active

          ? 700

          : branding.navbarFontWeight,



        letterSpacing:

          branding.navbarLetterSpacing,



        whiteSpace: "nowrap",



        padding: "12px 8px",



        borderRadius: "8px",



        background: active

          ? "rgba(0,140,255,0.09)"

          : "transparent",



        border: active

          ? "1px solid rgba(0,140,255,0.16)"

          : "1px solid transparent",



        boxShadow: active

          ? "0 0 15px rgba(0,140,255,0.08)"

          : "none",



        transition:

          "all 0.2s ease",



        textShadow: active

          ? "0 0 10px rgba(56,215,255,0.5)"

          : "none",

      }}

    >

      {children}

    </Link>

  );

}



export default WebsiteNavbar;