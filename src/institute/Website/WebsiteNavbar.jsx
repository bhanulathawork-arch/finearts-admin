// import React, {
//   useEffect,
//   useState,
// } from "react";

// import {
//   Link,
//   useLocation,
//   useNavigate,
// } from "react-router-dom";

// const WebsiteNavbar = ({
//   website = {},
//   institute = {},
//   branding = {},
//   instituteName: propInstituteName,
//   logo: propLogo,
// }) => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [student, setStudent] = useState(null);
//   const [loggingOut, setLoggingOut] = useState(false);

//   // =========================================================
//   // STUDENT AUTH
//   // =========================================================
//   //
//   // IMPORTANT:
//   // Website preview uses ONLY studentToken.
//   //
//   // DO NOT use:
//   // - token
//   // - adminToken
//   // - instituteToken
//   // - Firebase signOut()
//   // - localStorage.clear()
//   //
//   // =========================================================

//   useEffect(() => {
//     const checkStudentSession = () => {
//       const studentToken =
//         localStorage.getItem("studentToken");

//       const studentUser =
//         localStorage.getItem("studentUser");

//       if (studentToken) {
//         let parsedUser = null;

//         if (studentUser) {
//           try {
//             parsedUser = JSON.parse(studentUser);
//           } catch (error) {
//             console.warn(
//               "Invalid studentUser in localStorage"
//             );
//           }
//         }

//         setStudent(
//           parsedUser || {
//             authenticated: true,
//           }
//         );
//       } else {
//         setStudent(null);
//       }
//     };

//     checkStudentSession();

//     window.addEventListener(
//       "storage",
//       checkStudentSession
//     );

//     return () => {
//       window.removeEventListener(
//         "storage",
//         checkStudentSession
//       );
//     };
//   }, []);

//   // =========================================================
//   // WEBSITE DATA
//   // =========================================================

//   const instituteName =
//     propInstituteName ||
//     institute?.name ||
//     institute?.institute_name ||
//     website?.website_name ||
//     website?.name ||
//     "Fine Arts";

//   const logo =
//     propLogo ||
//     institute?.logo ||
//     institute?.logo_url ||
//     website?.logo ||
//     website?.logo_url ||
//     branding?.logo ||
//     branding?.logo_url ||
//     null;

//   // =========================================================
//   // BRANDING COLORS
//   // =========================================================
//   //
//   // These values come from the Branding Module.
//   //
//   // navbarColor
//   // headingColor
//   // subheadingColor
//   // textColor
//   // iconColor
//   // buttonColor
//   // buttonTextColor
//   //
//   // =========================================================

//   const navbarColor =
//     branding?.navbarColor ||
//     branding?.navbar_color ||
//     "#1F2937";

//   const headingColor =
//     branding?.headingColor ||
//     branding?.heading_color ||
//     "#111827";

//   const subheadingColor =
//     branding?.subheadingColor ||
//     branding?.subheading_color ||
//     "#5B21B6";

//   const textColor =
//     branding?.textColor ||
//     branding?.text_color ||
//     "#111827";

//   const iconColor =
//     branding?.iconColor ||
//     branding?.icon_color ||
//     "#F59E0B";

//   const buttonColor =
//     branding?.buttonColor ||
//     branding?.button_color ||
//     "#7C3AED";

//   const buttonTextColor =
//     branding?.buttonTextColor ||
//     branding?.button_text_color ||
//     "#FFFFFF";

//   // Used only for logo gradients / secondary visual accents.
//   const secondaryColor =
//     subheadingColor;

//   // =========================================================
//   // ROUTES
//   // =========================================================

//   const previewBase =
//     "/institute/website/preview";

//   const homePath =
//     previewBase;

//   const aboutPath =
//     `${previewBase}/about`;

//   const classesPath =
//     `${previewBase}/classes`;

//   const trainersPath =
//     `${previewBase}/trainers`;

//   const sessionsPath =
//     `${previewBase}/sessions`;

//   const testimonialsPath =
//     `${previewBase}/testimonials`;

//   const loginPath =
//     `${previewBase}/login`;

//   const dashboardPath =
//     `${previewBase}/dashboard`;

//   // =========================================================
//   // ACTIVE ROUTE
//   // =========================================================

//   const isActive = (path) => {
//     if (path === homePath) {
//       return (
//         location.pathname === homePath
//       );
//     }

//     return location.pathname.startsWith(
//       path
//     );
//   };

//   // =========================================================
//   // STUDENT LOGOUT
//   // =========================================================
//   //
//   // ONLY student session is removed.
//   //
//   // We intentionally DO NOT:
//   //
//   // - remove token
//   // - remove adminToken
//   // - remove instituteToken
//   // - call Firebase signOut()
//   // - use localStorage.clear()
//   //
//   // =========================================================

//   const handleLogout = async () => {
//     if (loggingOut) {
//       return;
//     }

//     try {
//       setLoggingOut(true);

//       console.log(
//         "Student logout started"
//       );

//       // -----------------------------------------------------
//       // REMOVE ONLY STUDENT SESSION
//       // -----------------------------------------------------

//       localStorage.removeItem(
//         "studentToken"
//       );

//       localStorage.removeItem(
//         "studentUser"
//       );

//       localStorage.removeItem(
//         "studentRole"
//       );

//       // -----------------------------------------------------
//       // UPDATE NAVBAR STATE
//       // -----------------------------------------------------

//       setStudent(null);

//       // -----------------------------------------------------
//       // REDIRECT TO STUDENT LOGIN
//       // -----------------------------------------------------

//       navigate(
//         loginPath,
//         {
//           replace: true,
//         }
//       );

//     } catch (error) {
//       console.error(
//         "STUDENT LOGOUT ERROR:",
//         error
//       );

//     } finally {
//       setLoggingOut(false);
//     }
//   };

//   // =========================================================
//   // NAV LINK STYLE
//   // =========================================================

//   const navLinkStyle = (
//     active = false
//   ) => ({
//     textDecoration: "none",

//     color: active
//       ? buttonColor
//       : textColor,

//     fontWeight: active
//       ? "700"
//       : "500",

//     transition:
//       "all 0.2s ease",

//     whiteSpace: "nowrap",

//     cursor: "pointer",
//   });

//   // =========================================================
//   // NAVBAR
//   // =========================================================

//   return (
//     <header
//       style={{
//         position: "sticky",
//         top: 0,
//         zIndex: 1000,
//         width: "100%",

//         // ===================================================
//         // IMPORTANT:
//         // Navbar now comes from Branding Module.
//         // ===================================================

//         backgroundColor:
//           navbarColor,

//         borderBottom:
//           `1px solid ${iconColor}40`,

//         boxShadow:
//           "0 2px 10px rgba(0,0,0,0.08)",
//       }}
//     >
//       <div
//         style={{
//           maxWidth: "1280px",
//           margin: "0 auto",
//           padding:
//             "14px 24px",

//           display: "flex",

//           alignItems:
//             "center",

//           justifyContent:
//             "space-between",

//           gap: "30px",
//         }}
//       >

//         {/* =================================================
//             LOGO / INSTITUTE NAME
//         ================================================= */}

//         <Link
//           to={homePath}
//           style={{
//             textDecoration:
//               "none",

//             display: "flex",

//             alignItems:
//               "center",

//             gap: "12px",

//             minWidth: "180px",
//           }}
//         >

//           {logo ? (
//             <img
//               src={logo}
//               alt={instituteName}

//               style={{
//                 width: "46px",
//                 height: "46px",

//                 objectFit:
//                   "cover",

//                 borderRadius:
//                   "10px",

//                 border:
//                   `1px solid ${buttonTextColor}40`,
//               }}

//               onError={(event) => {
//                 event.currentTarget.style.display =
//                   "none";
//               }}
//             />
//           ) : (
//             <div
//               style={{
//                 width: "46px",
//                 height: "46px",

//                 borderRadius:
//                   "10px",

//                 display: "flex",

//                 alignItems:
//                   "center",

//                 justifyContent:
//                   "center",

//                 background:
//                   `linear-gradient(
//                     135deg,
//                     ${buttonColor},
//                     ${secondaryColor}
//                   )`,

//                 color:
//                   buttonTextColor,

//                 fontSize:
//                   "20px",

//                 fontWeight:
//                   "800",

//                 flexShrink: 0,
//               }}
//             >
//               {instituteName
//                 .charAt(0)
//                 .toUpperCase()}
//             </div>
//           )}

//           <span
//             style={{
//               fontSize:
//                 "21px",

//               fontWeight:
//                 "800",

//               // White when navbar is dark,
//               // while still controlled by branding.

//               color:
//                 buttonTextColor,

//               maxWidth:
//                 "180px",

//               overflow:
//                 "hidden",

//               textOverflow:
//                 "ellipsis",

//               whiteSpace:
//                 "nowrap",
//             }}
//           >
//             {instituteName}
//           </span>

//         </Link>

//         {/* =================================================
//             DESKTOP NAVIGATION
//         ================================================= */}

//         <nav
//           style={{
//             display:
//               "flex",

//             alignItems:
//               "center",

//             justifyContent:
//               "center",

//             gap:
//               "24px",

//             flex:
//               1,
//           }}
//         >

//           <Link
//             to={homePath}
//             style={navLinkStyle(
//               isActive(homePath)
//             )}
//           >
//             Home
//           </Link>

//           <Link
//             to={aboutPath}
//             style={navLinkStyle(
//               isActive(aboutPath)
//             )}
//           >
//             About
//           </Link>

//           <Link
//             to={classesPath}
//             style={navLinkStyle(
//               isActive(classesPath)
//             )}
//           >
//             Classes
//           </Link>

//           <Link
//             to={trainersPath}
//             style={navLinkStyle(
//               isActive(trainersPath)
//             )}
//           >
//             Trainers
//           </Link>

//           <Link
//             to={sessionsPath}
//             style={navLinkStyle(
//               isActive(sessionsPath)
//             )}
//           >
//             Sessions
//           </Link>

//           <Link
//             to={testimonialsPath}
//             style={navLinkStyle(
//               isActive(
//                 testimonialsPath
//               )
//             )}
//           >
//             Testimonials
//           </Link>

//         </nav>

//         {/* =================================================
//             STUDENT AUTH
//         ================================================= */}

//         <div
//           style={{
//             display:
//               "flex",

//             alignItems:
//               "center",

//             gap:
//               "12px",

//             minWidth:
//               "180px",

//             justifyContent:
//               "flex-end",
//           }}
//         >

//           {student ? (
//             <>
//               {/* STUDENT DASHBOARD */}

//               <Link
//                 to={dashboardPath}

//                 style={{
//                   textDecoration:
//                     "none",

//                   color:
//                     buttonTextColor,

//                   fontWeight:
//                     "600",

//                   padding:
//                     "9px 14px",

//                   borderRadius:
//                     "8px",

//                   background:
//                     `${buttonColor}CC`,

//                   border:
//                     `1px solid ${buttonTextColor}30`,
//                 }}
//               >
//                 Dashboard
//               </Link>

//               {/* STUDENT LOGOUT */}

//               <button
//                 type="button"

//                 onClick={
//                   handleLogout
//                 }

//                 disabled={
//                   loggingOut
//                 }

//                 style={{
//                   border:
//                     "none",

//                   borderRadius:
//                     "8px",

//                   padding:
//                     "10px 17px",

//                   background:
//                     loggingOut
//                       ? "#9CA3AF"
//                       : "#EF4444",

//                   color:
//                     "#FFFFFF",

//                   fontWeight:
//                     "600",

//                   cursor:
//                     loggingOut
//                       ? "not-allowed"
//                       : "pointer",

//                   opacity:
//                     loggingOut
//                       ? 0.8
//                       : 1,
//                 }}
//               >
//                 {loggingOut
//                   ? "Logging out..."
//                   : "Logout"}
//               </button>
//             </>
//           ) : (
//             <Link
//               to={loginPath}

//               style={{
//                 textDecoration:
//                   "none",

//                 borderRadius:
//                   "9px",

//                 padding:
//                   "10px 20px",

//                 background:
//                   buttonColor,

//                 color:
//                   buttonTextColor,

//                 fontWeight:
//                   "600",

//                 boxShadow:
//                   `0 4px 12px ${buttonColor}50`,
//               }}
//             >
//               Student Login
//             </Link>
//           )}

//         </div>

//       </div>

//       {/* =====================================================
//           MOBILE NAVIGATION
//       ===================================================== */}

//       <div
//         className="website-mobile-nav"
//         style={{
//           backgroundColor:
//             navbarColor,

//           borderTop:
//             `1px solid ${iconColor}30`,
//         }}
//       >

//         <Link
//           to={homePath}
//           style={navLinkStyle(
//             isActive(homePath)
//           )}
//         >
//           Home
//         </Link>

//         <Link
//           to={aboutPath}
//           style={navLinkStyle(
//             isActive(aboutPath)
//           )}
//         >
//           About
//         </Link>

//         <Link
//           to={classesPath}
//           style={navLinkStyle(
//             isActive(classesPath)
//           )}
//         >
//           Classes
//         </Link>

//         <Link
//           to={trainersPath}
//           style={navLinkStyle(
//             isActive(trainersPath)
//           )}
//         >
//           Trainers
//         </Link>

//         <Link
//           to={
//             student
//               ? dashboardPath
//               : loginPath
//           }

//           style={navLinkStyle(
//             student
//               ? isActive(
//                   dashboardPath
//                 )
//               : isActive(
//                   loginPath
//                 )
//           )}
//         >
//           {student
//             ? "Dashboard"
//             : "Login"}
//         </Link>

//       </div>

//       {/* =====================================================
//           RESPONSIVE STYLES
//       ===================================================== */}

//       <style>
//         {`

//           .website-mobile-nav {
//             display: none;

//             align-items: center;
//             justify-content: center;

//             gap: 18px;

//             overflow-x: auto;

//             padding:
//               10px 16px 14px;
//           }

//           .website-mobile-nav a {
//             color:
//               ${textColor};

//             font-size:
//               13px;
//           }

//           @media (max-width: 900px) {

//             header > div:first-child {
//               padding-left:
//                 16px !important;

//               padding-right:
//                 16px !important;
//             }

//             header nav {
//               display:
//                 none !important;
//             }

//             header > div:first-child {
//               flex-wrap:
//                 wrap;
//             }

//             .website-mobile-nav {
//               display:
//                 flex;
//             }

//             .website-mobile-nav a {
//               font-size:
//                 13px;
//             }
//           }

//           @media (max-width: 600px) {

//             header > div:first-child {
//               gap:
//                 12px !important;
//             }

//             header > div:first-child > a {
//               min-width:
//                 auto !important;
//             }

//             header > div:first-child > a span {
//               max-width:
//                 130px !important;

//               font-size:
//                 17px !important;
//             }

//             header > div:first-child > a div,
//             header > div:first-child > a img {
//               width:
//                 38px !important;

//               height:
//                 38px !important;
//             }

//             header > div:first-child > div {
//               min-width:
//                 auto !important;
//             }

//             header > div:first-child > div a {
//               padding:
//                 8px 10px !important;

//               font-size:
//                 13px !important;
//             }

//             header > div:first-child > div button {
//               padding:
//                 8px 10px !important;

//               font-size:
//                 13px !important;
//             }
//           }

//         `}
//       </style>

//     </header>
//   );
// };

// export default WebsiteNavbar;



// src/institute/Website/WebsiteNavbar.jsx

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

   STUDENT WEBSITE AUTH

   Supported student login:
     GOOGLE
     MOBILE OTP

   IMPORTANT:

   The same Firebase / accounts record may be:

     role = INSTITUTE

   AND ALSO have:

     student record
     registration_source = ONLINE
     learning_mode = ONLINE

   Therefore:

   DO NOT use the main account role to decide whether
   the website visitor is logged in as a student.

   Student website session is determined by:

     studentLoggedIn
     studentRole
     studentToken
     studentProfile

   Main institute role must NOT delete a valid student
   website session.
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

  /* =======================================================
     ROUTES
  ======================================================= */

  const previewBase =
    "/institute/website/preview";

  const homePath =
    previewBase;

  const aboutPath =
    `${previewBase}/about`;

  const classesPath =
    `${previewBase}/classes`;

  const trainersPath =
    `${previewBase}/trainers`;

  const sessionsPath =
    `${previewBase}/sessions`;

  const testimonialsPath =
    `${previewBase}/testimonials`;

  const loginPath =
    `${previewBase}/login`;

  const studentDashboardPath =
    `${previewBase}/dashboard`;

  /* =======================================================
     INSTITUTE ID
  ======================================================= */

  const getInstituteId =
    useCallback(() => {
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
          const numericValue =
            Number(value);

          if (
            Number.isFinite(
              numericValue
            )
          ) {
            return numericValue;
          }
        }
      }

      /* ---------------------------------------------------
         Stored institute object
      --------------------------------------------------- */

      try {
        const storedInstitute =
          localStorage.getItem(
            "institute"
          );

        if (storedInstitute) {
          const parsed =
            JSON.parse(
              storedInstitute
            );

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

     IMPORTANT:

     DO NOT check main account role here.

     Example:

       accounts.role = INSTITUTE
       studentLoggedIn = true
       studentRole = STUDENT

     This is VALID for the website.

     The backend has already created the online student
     against that account.

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

      const studentToken =
        localStorage.getItem(
          "studentToken"
        );

      const studentProfile =
        localStorage.getItem(
          "studentProfile"
        );

      /*
       * Primary condition:
       *
       * studentRole = STUDENT
       * AND
       * studentLoggedIn = true
       *
       * Do NOT reject this because the main account
       * role is INSTITUTE.
       */

      const active =
        studentRole === "STUDENT" &&
        isLogged;

      console.log(
        "=========================================="
      );

      console.log(
        "WEBSITE STUDENT SESSION CHECK"
      );

      console.log(
        "studentRole:",
        studentRole || "NOT FOUND"
      );

      console.log(
        "studentLoggedIn:",
        isLogged
      );

      console.log(
        "studentToken:",
        studentToken
          ? "YES"
          : "NO"
      );

      console.log(
        "studentProfile:",
        studentProfile
          ? "YES"
          : "NO"
      );

      console.log(
        "student session active:",
        active
      );

      console.log(
        "=========================================="
      );

      setStudentLoggedIn(
        active
      );

      if (!active) {
        setStudent(null);

        return false;
      }

      /*
       * Load cached profile immediately.
       */

      if (studentProfile) {
        try {
          const parsed =
            JSON.parse(
              studentProfile
            );

          if (parsed) {
            setStudent(
              parsed
            );
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

     Only student session is removed.

     IMPORTANT:

     We do NOT remove:
       role
       userRole
       accountRole
       institute
       token

     because those may belong to the institute account.
  ======================================================= */

  const clearStudentSession =
    useCallback(() => {
      console.log(
        "CLEARING WEBSITE STUDENT SESSION"
      );

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

     This is ONLY called when a student session exists.

     No main-account-role rejection.
  ======================================================= */

  const loadStudent =
    useCallback(
      async (
        firebaseUser = null
      ) => {
        const active =
          readStudentSession();

        if (!active) {
          setLoadingStudent(false);

          return;
        }

        try {
          setLoadingStudent(true);

          const auth =
            getAuth();

          const currentUser =
            firebaseUser ||
            auth.currentUser;

          /*
           * Firebase user may not be ready immediately.
           *
           * We keep the cached student session instead
           * of destroying it.
           */

          if (!currentUser) {
            console.warn(
              "Student session exists but Firebase user is not ready."
            );

            setLoadingStudent(false);

            return;
          }

          /* -------------------------------------------
             INSTITUTE
          ------------------------------------------- */

          const instituteId =
            getInstituteId();

          if (!instituteId) {
            console.warn(
              "Student institute ID missing."
            );

            /*
             * Do NOT logout the student here.
             *
             * The navbar can still use the cached
             * student session.
             */

            setLoadingStudent(false);

            return;
          }

          /* -------------------------------------------
             FRESH FIREBASE TOKEN
          ------------------------------------------- */

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

              /*
               * API interceptor may use token.
               */

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

          /*
           * Check session again before API request.
           */

          const stillActive =
            readStudentSession();

          if (!stillActive) {
            setLoadingStudent(false);

            return;
          }

          /* -------------------------------------------
             GET STUDENT PROFILE
          ------------------------------------------- */

          console.log(
            "=========================================="
          );

          console.log(
            "FETCHING WEBSITE STUDENT PROFILE"
          );

          console.log(
            "GET /students/me"
          );

          console.log(
            "Institute ID:",
            instituteId
          );

          console.log(
            "=========================================="
          );

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

          console.log(
            "STUDENT PROFILE RESPONSE:",
            response?.data
          );

          const profile =
            response?.data?.data ||
            response?.data?.student ||
            null;

          if (profile) {
            setStudent(
              profile
            );

            localStorage.setItem(
              "studentProfile",
              JSON.stringify(
                profile
              )
            );

            /*
             * Keep student session explicitly active.
             */

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
              String(
                instituteId
              )
            );

            setStudentLoggedIn(
              true
            );

            console.log(
              "=========================================="
            );

            console.log(
              "WEBSITE STUDENT PROFILE LOADED"
            );

            console.log(
              "Student session ACTIVE"
            );

            console.log(
              "=========================================="
            );
          }
        } catch (error) {
          console.error(
            "STUDENT PROFILE FETCH ERROR:",
            error?.response?.status,
            error?.response?.data ||
              error
          );

          /*
           * IMPORTANT:
           *
           * Do NOT automatically logout.
           *
           * If login succeeded and the cached session
           * exists, keep Dashboard visible.
           */

          const cachedSession =
            readStudentSession();

          if (cachedSession) {
            console.log(
              "Keeping cached website student session."
            );
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
    const auth =
      getAuth();

    /*
     * Read student session immediately.
     *
     * This happens BEFORE Firebase auth state listener.
     */

    const active =
      readStudentSession();

    if (!active) {
      setLoadingStudent(false);
    }

    const unsubscribe =
      onAuthStateChanged(
        auth,
        async (firebaseUser) => {
          console.log(
            "=========================================="
          );

          console.log(
            "WEBSITE FIREBASE AUTH STATE"
          );

          console.log(
            "Firebase UID:",
            firebaseUser
              ? firebaseUser.uid
              : null
          );

          console.log(
            "=========================================="
          );

          /*
           * IMPORTANT:
           *
           * Do NOT inspect accounts.role here.
           *
           * accounts.role = INSTITUTE does NOT mean
           * the website student session is invalid.
           */

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
           * If Firebase user is temporarily null,
           * keep the cached student session.
           */

          if (
            studentActive &&
            !firebaseUser
          ) {
            console.log(
              "Student session exists."
            );

            console.log(
              "Firebase user temporarily unavailable."
            );

            console.log(
              "Keeping student session."
            );

            setStudentLoggedIn(
              true
            );

            return;
          }

          /*
           * No student session.
           */

          setStudentLoggedIn(
            false
          );

          setStudent(null);

          setLoadingStudent(false);
        }
      );

    /* =====================================================
       CUSTOM STUDENT LOGIN EVENT
    ===================================================== */

    const handleStudentAuthChanged =
      () => {
        console.log(
          "=========================================="
        );

        console.log(
          "studentAuthChanged EVENT"
        );

        console.log(
          "=========================================="
        );

        const active =
          readStudentSession();

        if (active) {
          const currentUser =
            getAuth().currentUser;

          /*
           * Immediately show student state.
           */

          setStudentLoggedIn(
            true
          );

          if (currentUser) {
            loadStudent(
              currentUser
            );
          }
        } else {
          setStudentLoggedIn(
            false
          );

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
          console.log(
            "Student storage changed:",
            event.key
          );

          readStudentSession();
        }
      };

    window.addEventListener(
      "storage",
      handleStorage
    );

    /* =====================================================
       SAME-TAB CUSTOM EVENT

       storage event does not fire in the same tab.

       studentAuthChanged handles that case.
    ===================================================== */

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
      const roundedButtons =
        branding?.roundedButtons ??
        branding?.rounded_buttons ??
        true;

      return {
        navbarBackgroundColor:
          branding?.navbarBackgroundColor ||
          branding?.navbar_background_color ||
          branding?.navbarColor ||
          branding?.navbar_color ||
          "#7C3AED",

        navbarTextColor:
          branding?.navbarTextColor ||
          branding?.navbar_text_color ||
          branding?.textColor ||
          branding?.text_color ||
          "#FFFFFF",

        navbarButtonColor:
          branding?.navbarButtonColor ||
          branding?.navbar_button_color ||
          branding?.buttonColor ||
          branding?.button_color ||
          "#A842DF",

        navbarButtonTextColor:
          branding?.navbarButtonTextColor ||
          branding?.navbar_button_text_color ||
          branding?.buttonTextColor ||
          branding?.button_text_color ||
          "#FFFFFF",

        navbarBorderColor:
          branding?.navbarBorderColor ||
          branding?.navbar_border_color ||
          "#F59E0B",

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
          "8px",

        buttonRadius:
          branding?.buttonRadius ||
          branding?.button_radius ||
          (
            roundedButtons
              ? "999px"
              : "7px"
          ),

        buttonFontWeight:
          branding?.buttonFontWeight ||
          branding?.button_font_weight ||
          600,
      };
    }, [
      branding,
    ]);

  /* =======================================================
     ACTIVE ROUTE
  ======================================================= */

  const isActive =
    (path) => {
      if (
        path === homePath
      ) {
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
      if (
        loggingOut
      ) {
        return;
      }

      try {
        setLoggingOut(
          true
        );

        /*
         * Remove student session first.
         */

        clearStudentSession();

        /*
         * Firebase logout.
         *
         * This is the Firebase session used by the website
         * student.
         */

        try {
          await signOut(
            getAuth()
          );
        } catch (firebaseError) {
          console.warn(
            "Firebase student logout error:",
            firebaseError
          );
        }

        /*
         * Notify website.
         */

        window.dispatchEvent(
          new Event(
            "studentAuthChanged"
          )
        );

        /*
         * Go to student login.
         */

        navigate(
          loginPath,
          {
            replace: true,
          }
        );
      } finally {
        setLoggingOut(
          false
        );
      }
    };

  /* =======================================================
     BUTTON STYLE
  ======================================================= */

  const buttonStyle = {
    textDecoration:
      "none",

    display:
      "inline-flex",

    alignItems:
      "center",

    justifyContent:
      "center",

    padding:
      "7px 14px",

    minHeight:
      "34px",

    borderRadius:
      navbarBranding.buttonRadius,

    backgroundColor:
      navbarBranding.navbarButtonColor,

    color:
      navbarBranding.navbarButtonTextColor,

    fontFamily:
      `'${navbarBranding.navbarFont}', sans-serif`,

    fontSize:
      "13px",

    fontWeight:
      navbarBranding.buttonFontWeight,

    letterSpacing:
      navbarBranding.navbarLetterSpacing,

    lineHeight:
      "1",

    border:
      "none",

    cursor:
      "pointer",

    transition:
      "all 0.2s ease",

    whiteSpace:
      "nowrap",
  };

  /* =======================================================
     STUDENT AUTH UI

     THIS IS THE IMPORTANT PART.

     If:

       studentLoggedIn === true

     then show:

       Dashboard
       Logout

     regardless of:

       accounts.role = INSTITUTE
  ======================================================= */

  const renderStudentAuth =
    () => {
      if (
        studentLoggedIn
      ) {
        return (
          <>
            <Link
              to={
                studentDashboardPath
              }
              style={
                buttonStyle
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

                backgroundColor:
                  "#EF4444",

                color:
                  "#FFFFFF",

                opacity:
                  loggingOut
                    ? 0.6
                    : 1,

                cursor:
                  loggingOut
                    ? "not-allowed"
                    : "pointer",
              }}
            >
              {
                loggingOut
                  ? "Logging out..."
                  : "Logout"
              }
            </button>
          </>
        );
      }

      return (
        <Link
          to={
            loginPath
          }
          style={
            buttonStyle
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
    <header
      style={{
        position:
          "relative",

        zIndex:
          1000,

        width:
          "100%",

        backgroundColor:
          navbarBranding.navbarBackgroundColor,

        borderBottom:
          `1px solid ${navbarBranding.navbarBorderColor}40`,

        boxShadow:
          "0 2px 8px rgba(0,0,0,0.08)",

        fontFamily:
          `'${navbarBranding.navbarFont}', sans-serif`,
      }}
    >
      {/* ===================================================
          DESKTOP
      =================================================== */}

      <div
        className="
          website-navbar-container
        "
        style={{
          maxWidth:
            "1280px",

          margin:
            "0 auto",

          padding:
            "5px 20px",

          minHeight:
            "50px",

          display:
            "flex",

          alignItems:
            "center",

          justifyContent:
            "space-between",

          gap:
            "18px",

          boxSizing:
            "border-box",
        }}
      >
        {/* =================================================
            LOGO
        ================================================= */}

        <Link
          to={
            homePath
          }
          style={{
            textDecoration:
              "none",

            display:
              "flex",

            alignItems:
              "center",

            gap:
              "8px",

            minWidth:
              "170px",

            flexShrink:
              0,
          }}
        >
          {logo ? (
            <img
              src={
                logo
              }
              alt={
                finalInstituteName
              }
              style={{
                width:
                  "34px",

                height:
                  "34px",

                objectFit:
                  "cover",

                borderRadius:
                  navbarBranding.logoRadius,

                border:
                  `1px solid ${navbarBranding.navbarButtonTextColor}40`,
              }}
              onError={(
                event
              ) => {
                event.currentTarget.style.display =
                  "none";
              }}
            />
          ) : (
            <div
              style={{
                width:
                  "34px",

                height:
                  "34px",

                borderRadius:
                  navbarBranding.logoRadius,

                display:
                  "flex",

                alignItems:
                  "center",

                justifyContent:
                  "center",

                backgroundColor:
                  navbarBranding.navbarButtonColor,

                color:
                  navbarBranding.navbarButtonTextColor,

                fontSize:
                  "15px",

                fontWeight:
                  "800",
              }}
            >
              {
                finalInstituteName
                  .charAt(0)
                  .toUpperCase()
              }
            </div>
          )}

          <span
            style={{
              fontSize:
                "17px",

              fontWeight:
                "800",

              color:
                navbarBranding.navbarTextColor,

              maxWidth:
                "170px",

              overflow:
                "hidden",

              textOverflow:
                "ellipsis",

              whiteSpace:
                "nowrap",
            }}
          >
            {
              finalInstituteName
            }
          </span>
        </Link>

        {/* =================================================
            NAVIGATION
        ================================================= */}

        <nav
          className="
            website-desktop-navigation
          "
          style={{
            display:
              "flex",

            alignItems:
              "center",

            justifyContent:
              "center",

            gap:
              "18px",

            flex:
              1,
          }}
        >
          <NavbarLink
            to={
              homePath
            }
            active={
              isActive(
                homePath
              )
            }
            branding={
              navbarBranding
            }
          >
            Home
          </NavbarLink>

          <NavbarLink
            to={
              aboutPath
            }
            active={
              isActive(
                aboutPath
              )
            }
            branding={
              navbarBranding
            }
          >
            About
          </NavbarLink>

          <NavbarLink
            to={
              classesPath
            }
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
            to={
              trainersPath
            }
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
            to={
              sessionsPath
            }
            active={
              isActive(
                sessionsPath
              )
            }
            branding={
              navbarBranding
            }
          >
            Sessions
          </NavbarLink>

          <NavbarLink
            to={
              testimonialsPath
            }
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
            STUDENT AUTH
        ================================================= */}

        <div
          className="
            website-desktop-auth
          "
          style={{
            display:
              "flex",

            alignItems:
              "center",

            gap:
              "7px",

            minWidth:
              "170px",

            justifyContent:
              "flex-end",
          }}
        >
          {
            renderStudentAuth()
          }
        </div>
      </div>

      {/* ===================================================
          MOBILE
      =================================================== */}

      <div
        className="
          website-mobile-navigation
        "
      >
        <MobileNavbarLink
          to={
            homePath
          }
          active={
            isActive(
              homePath
            )
          }
          branding={
            navbarBranding
          }
        >
          Home
        </MobileNavbarLink>

        <MobileNavbarLink
          to={
            aboutPath
          }
          active={
            isActive(
              aboutPath
            )
          }
          branding={
            navbarBranding
          }
        >
          About
        </MobileNavbarLink>

        <MobileNavbarLink
          to={
            classesPath
          }
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
        </MobileNavbarLink>

        <MobileNavbarLink
          to={
            trainersPath
          }
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
        </MobileNavbarLink>

        <MobileNavbarLink
          to={
            studentLoggedIn
              ? studentDashboardPath
              : loginPath
          }
          active={
            studentLoggedIn
              ? isActive(
                  studentDashboardPath
                )
              : isActive(
                  loginPath
                )
          }
          branding={
            navbarBranding
          }
        >
          {
            studentLoggedIn
              ? "Dashboard"
              : "Login"
          }
        </MobileNavbarLink>
      </div>

      {/* ===================================================
          RESPONSIVE CSS
      =================================================== */}

      <style>
        {`

          .website-mobile-navigation {
            display: none;

            align-items: center;

            justify-content: center;

            gap: 14px;

            overflow-x: auto;

            padding: 5px 14px 6px;

            min-height: 32px;

            box-sizing: border-box;
          }

          .website-mobile-navigation::-webkit-scrollbar {
            display: none;
          }

          .website-mobile-navigation {
            scrollbar-width: none;
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
              min-width: auto !important;
            }

            .website-mobile-navigation {
              display: flex;
            }

            .website-navbar-container {
              padding: 5px 14px !important;
              min-height: 48px !important;
            }

          }

          @media (max-width: 600px) {

            .website-navbar-container {
              padding: 5px 10px !important;
              min-height: 46px !important;
            }

            .website-navbar-container > a {
              min-width: auto !important;
            }

            .website-navbar-container > a > span {
              max-width: 120px !important;
              font-size: 15px !important;
            }

            .website-desktop-auth {
              gap: 5px !important;
            }

            .website-desktop-auth a,
            .website-desktop-auth button {
              padding: 5px 8px !important;
              min-height: 30px !important;
              font-size: 10px !important;
            }

            .website-mobile-navigation {
              justify-content: flex-start;
              gap: 16px;
              padding-left: 12px;
              padding-right: 12px;
            }

          }

        `}
      </style>
    </header>
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
      to={
        to
      }
      style={{
        textDecoration:
          "none",

        color:
          active
            ? branding.navbarButtonColor
            : branding.navbarTextColor,

        fontFamily:
          `'${branding.navbarFont}', sans-serif`,

        fontSize:
          branding.navbarFontSize,

        fontWeight:
          active
            ? 700
            : branding.navbarFontWeight,

        letterSpacing:
          branding.navbarLetterSpacing,

        lineHeight:
          "1",

        whiteSpace:
          "nowrap",

        padding:
          "5px 0",
      }}
    >
      {
        children
      }
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
}) {
  return (
    <Link
      to={
        to
      }
      style={{
        textDecoration:
          "none",

        color:
          active
            ? branding.navbarButtonColor
            : branding.navbarTextColor,

        fontFamily:
          `'${branding.navbarFont}', sans-serif`,

        fontSize:
          "12px",

        fontWeight:
          active
            ? 700
            : branding.navbarFontWeight,

        letterSpacing:
          branding.navbarLetterSpacing,

        whiteSpace:
          "nowrap",

        padding:
          "4px 0",
      }}
    >
      {
        children
      }
    </Link>
  );
}

export default WebsiteNavbar;