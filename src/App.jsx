
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

import { Toaster } from "react-hot-toast";
import { SidebarProvider } from "./context/SidebarContext";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

/* =========================================================
   ADMIN LAYOUT
========================================================= */
import Layout from "./components/layout/Layout";

/* =========================================================
   LOGIN PAGES
========================================================= */
import LoginMenu from "./pages/LoginMenu";
import Login from "./pages/Login";
import InstituteLogin from "./pages/InstituteLogin";
import TrainerLogin from "./pages/TrainerLogin";

/* =========================================================
   ADMIN PAGES
========================================================= */
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import Subcategories from "./pages/Subcategories";
import Classes from "./pages/Classes";
import Trainers from "./pages/Trainers";
import PendingTrainersAdmin from "./pages/PendingTrainersAdmin";
import RejectedTrainersAdmin from "./pages/RejectedTrainersAdmin";
import Institutes from "./pages/Institutes";
import PendingInstitutesAdmin from "./pages/PendingInstitutesAdmin";
import RejectedInstitutesAdmin from "./pages/RejectedInstitutesAdmin";
import Bookings from "./pages/Bookings";
import Students from "./pages/users";
import Testimonials from "./pages/Testimonial";
import Sessions from "./pages/Sessions";
import BannerManagement from "./pages/BannerManagement";
import AdminAssignments from "./pages/AdminAssignments";
import AdminAttendance from "./pages/AdminAttendance";
import AdminLMS from "./pages/AdminLMS";
import AdminRecordings  from "./pages/AdminRecordings";

import WebsiteTemplates from "./pages/websiteTemplates/WebsiteTemplates";
import CreateWebsiteTemplate from "./pages/websiteTemplates/CreateWebsiteTemplate";
import EditWebsiteTemplate from "./pages/websiteTemplates/EditWebsiteTemplate";

/* =========================================================
   INSTITUTE PAGES
========================================================= */
import InstituteCreateProfile from "./institute/InstituteCreateProfile";
import InstitutePending from "./institute/InstitutePending";
import InstituteLayout from "./institute/InstituteLayout";
import DashboardInstitute from "./institute/InstituteDashboard";
import TrainersInstitute from "./institute/InstituteTrainers";
import ClassesInstitute from "./institute/InstituteClasses";
import TestimonialsInstitute from "./institute/InstituteTestimonials";
import BookingsInstitute from "./institute/InstituteBookings";
import ProfileInstitute from "./institute/InstituteProfile";
import SessionInstitute from "./institute/InstituteSession";
import AboutInstitute from "./institute/InstituteAbout";
import BannersInstitute from "./institute/InstituteBanners";
import FooterInstitute from "./institute/InstituteFooter";
import AssignmentsInstitute from "./institute/InstituteAssignments";
import AttendanceInstitute from "./institute/InstituteAttendance";
import LMSInstitute from "./institute/InstituteLMS";
import RecordingsInstitute from "./institute/InstituteRecordings";

/* =========================================================
   INSTITUTE STUDENTS
========================================================= */
import StudentsList from "./institute/students/StudentsList";
import StudentRegistration from "./institute/students/StudentRegistration";
import StudentDetails from "./institute/students/StudentDetails";
import StudentEdit from "./institute/students/StudentEdit";

/* =========================================================
   INSTITUTE BATCHES
========================================================= */
import BatchList from "./institute/batches/BatchList";
import CreateBatch from "./institute/batches/CreateBatch";
import EditBatch from "./institute/batches/EditBatch";
import BatchDetails from "./institute/batches/BatchDetails";
import BatchStudentAssignment from "./institute/batches/BatchStudentAssignment";

/* =========================================================
   INSTITUTE PAYMENTS
========================================================= */
import PaymentDashboard from "./institute/payments/PaymentDashboard";
import PaymentList from "./institute/payments/PaymentList";
import CollectPayment from "./institute/payments/CollectPayment";
import PaymentHistory from "./institute/payments/PaymentHistory";

/* =========================================================
   INSTITUTE WEBSITE
========================================================= */
import WebsiteDashboard from "./institute/Website/WebsiteDashboard";
import WebsiteTemplate from "./institute/Website/WebsiteTemplate";
import WebsiteSections from "./institute/Website/WebsiteSections";
import WebsiteContent from "./institute/Website/WebsiteContent";
import WebsiteBranding from "./institute/Website/WebsiteBranding";
import WebsitePublish from "./institute/Website/WebsitePublish";

/* =========================================================
   WEBSITE PREVIEW
========================================================= */
import WebsiteNavbar from "./institute/Website/WebsiteNavbar";
import WebsiteHome from "./institute/Website/WebsiteHome";
import WebsiteAbout from "./institute/Website/WebsiteAbout";
import WebsiteClasses from "./institute/Website/WebsiteClasses";
import WebsiteClassesDetail from "./institute/Website/WebsiteClassDetail";
import WebsiteTrainers from "./institute/Website/WebsiteTrainers";
import WebsiteTrainerProfile from "./institute/Website/WebsiteTrainerProfile";
import WebsiteSessions from "./institute/Website/WebsiteSessions";
import WebsitePreviewDashboard from "./institute/Website/WebsitePreviewDashboard";
import WebsiteTestimonials from "./institute/Website/WebsiteTestimonials";
import WebsiteLogin from "./institute/Website/WebsiteLogin";
import WebsitePreview from "./institute/Website/WebsitePreview";
import WebsiteAssignments from "./institute/Website/WebisteAssignment";
import WebsiteAssignmentSubmit from "./institute/Website/WebsiteAssignmentSubmit";
import WebsiteAttendance from "./institute/Website/WebsiteAttendance";
import WebsiteMyBookings from "./institute/Website/WebsiteMyBookings";
import WebsiteLearningCourse from "./institute/Website/WebsiteLearningCourse";
import WebsiteMyLearning from "./institute/Website/WebsiteMyLearning";
import WebsitePaymentDetails from "./institute/Website/WebsitePaymentDetails";
import WebsiteProfile from "./institute/Website/WebsiteProfile";
import WebsiteRecordings from "./institute/Website/WebsiteRecordings";

/* =========================================================
   TRAINER
========================================================= */
import TrainerLayout from "./trainer/TrainerLayout";
import TrainerDashboard from "./trainer/TrainerDashboard";
import TrainerClasses from "./trainer/TrainerClasses";
import TrainerBookings from "./trainer/TrainerBookings";
import TrainerStudents from "./trainer/TrainerStudents";
import TrainerProfile from "./trainer/TrainerProfile";
import TrainerCreateProfile from "./trainer/TrainerCreateProfile";
import TrainerPending from "./trainer/TrainerPending";
import TrainerSession from "./trainer/TrainerSession";
import TrainerAttendance from "./trainer/TrainerAttendance";
import TrainerAssignments from "./trainer/TrainerAssignments";
import TrainerRecordings from "./trainer/TrainerRecordings";
import TrainerLMS from "./trainer/TrainerLMS";




const getStoredRole = () => {
  return String(localStorage.getItem("role") || "")
    .trim()
    .toUpperCase();
};


/* =========================================================
   ADMIN PROTECTED ROUTE
========================================================= */

function AdminProtectedRoute() {
  const adminToken = localStorage.getItem("adminToken");
  const role = getStoredRole();

  if (!adminToken || role !== "ADMIN") {
    return (
      <Navigate
        to="/admin-login"
        replace
      />
    );
  }

  return <Layout />;
}


/* =========================================================
   INSTITUTE PROTECTED ROUTE
========================================================= */

function InstituteProtectedRoute() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser) => {
        setUser(firebaseUser);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const role = getStoredRole();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-dark text-white">
        Loading...
      </div>
    );
  }

  if (!user || role !== "INSTITUTE") {
    return (
      <Navigate
        to="/institute-login"
        replace
      />
    );
  }

  return <Outlet />;
}


/* =========================================================
   TRAINER PROTECTED ROUTE
========================================================= */

function TrainerProtectedRoute() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser) => {
        setUser(firebaseUser);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const role = getStoredRole();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-dark text-white">
        Loading...
      </div>
    );
  }

  if (!user || role !== "TRAINER") {
    return (
      <Navigate
        to="/trainer-login"
        replace
      />
    );
  }

  return <Outlet />;
}


/* =========================================================
   WEBSITE STUDENT PROTECTED ROUTE
========================================================= */

function StudentProtectedRoute() {
  const [loading, setLoading] = useState(true);
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [studentSession, setStudentSession] = useState(false);


  /* =======================================================
     CHECK WEBSITE STUDENT SESSION
  ======================================================= */

  const checkStudentSession = () => {
    const studentRole = String(
      localStorage.getItem("studentRole") || ""
    )
      .trim()
      .toUpperCase();

    const studentLoggedIn =
      localStorage.getItem("studentLoggedIn") === "true";

    const studentToken =
      localStorage.getItem("studentToken");

    const studentUser =
      localStorage.getItem("studentUser");

    const studentInstituteId =
      localStorage.getItem("studentInstituteId");

    const validSession =
      studentRole === "STUDENT" &&
      studentLoggedIn &&
      !!studentUser &&
      !!studentInstituteId &&
      !!studentToken;

    setStudentSession(validSession);

    return validSession;
  };


  /* =======================================================
     FIREBASE AUTH STATE
  ======================================================= */

  useEffect(() => {
    const auth = getAuth();

    if (auth.currentUser) {
      setFirebaseUser(auth.currentUser);
    }

    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        setFirebaseUser(user);

        setTimeout(() => {
          checkStudentSession();
          setLoading(false);
        }, 0);
      }
    );

    return () => unsubscribe();
  }, []);


  /* =======================================================
     SAME TAB / STORAGE SESSION CHANGES
  ======================================================= */

  useEffect(() => {
    const refreshStudentSession = () => {
      checkStudentSession();
    };

    window.addEventListener(
      "websiteStudentLogin",
      refreshStudentSession
    );

    window.addEventListener(
      "studentAuthChanged",
      refreshStudentSession
    );

    window.addEventListener(
      "storage",
      refreshStudentSession
    );

    return () => {
      window.removeEventListener(
        "websiteStudentLogin",
        refreshStudentSession
      );

      window.removeEventListener(
        "studentAuthChanged",
        refreshStudentSession
      );

      window.removeEventListener(
        "storage",
        refreshStudentSession
      );
    };
  }, []);


  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-dark text-white">
        Loading student dashboard...
      </div>
    );
  }


  /* =======================================================
     STUDENT SESSION CHECK
  ======================================================= */

  if (!studentSession) {
    return (
      <Navigate
        to="/institute/website/preview/login"
        replace
      />
    );
  }


  /* =======================================================
     FIREBASE CHECK
  ======================================================= */

  if (!firebaseUser) {
    return (
      <Navigate
        to="/institute/website/preview/login"
        replace
      />
    );
  }


  return <Outlet />;
}


/* =========================================================
   PUBLIC WEBSITE PREVIEW LAYOUT
========================================================= */

function PublicWebsitePreviewLayout() {
  return (
    <WebsitePreview>
      <WebsiteNavbar />
      <Outlet />
    </WebsitePreview>
  );
}


/* =========================================================
   STUDENT LMS WEBSITE LAYOUT
=========================================================

   Student LMS intentionally does NOT render
   WebsiteNavbar.

========================================================= */

function StudentWebsitePreviewLayout() {
  return (
    <WebsitePreview>
      <Outlet />
    </WebsitePreview>
  );
}


/* =========================================================
   APP
========================================================= */

function App() {
  return (
    <Router>
      <SidebarProvider>

        <div className="min-h-screen bg-background-dark">

          <Routes>

            {/* =================================================
                ROOT
            ================================================= */}

            <Route
              path="/"
              element={<LoginMenu />}
            />


            {/* =================================================
                ADMIN LOGIN
            ================================================= */}

            <Route
              path="/admin-login"
              element={<Login />}
            />


            {/* =================================================
                INSTITUTE LOGIN
            ================================================= */}

            <Route
              path="/institute-login"
              element={<InstituteLogin />}
            />


            {/* =================================================
                TRAINER LOGIN
            ================================================= */}

            <Route
              path="/trainer-login"
              element={<TrainerLogin />}
            />


            {/* =================================================
                ADMIN ROUTES
            ================================================= */}

            <Route element={<AdminProtectedRoute />}>

              <Route
                path="/dashboard"
                element={<Dashboard />}
              />

              <Route
                path="/categories"
                element={<Categories />}
              />

              <Route
                path="/subcategories"
                element={<Subcategories />}
              />

              <Route
                path="/classes"
                element={<Classes />}
              />

              <Route
                path="/sessions"
                element={<Sessions />}
              />

              <Route
                path="/trainers"
                element={<Trainers />}
              />

              <Route
                path="/trainers/pending"
                element={<PendingTrainersAdmin />}
              />

              <Route
                path="/trainers/rejected"
                element={<RejectedTrainersAdmin />}
              />

              <Route
                path="/institutes"
                element={<Institutes />}
              />

              <Route
                path="/institutes/pending"
                element={<PendingInstitutesAdmin />}
              />

              <Route
                path="/institutes/rejected"
                element={<RejectedInstitutesAdmin />}
              />

              <Route
                path="/bookings"
                element={<Bookings />}
              />

              <Route
                path="/students"
                element={<Students />}
              />

              <Route
                path="/admin/attendance"
                element={<AdminAttendance />}
              />

              <Route
                path="/admin/assignments"
                element={<AdminAssignments />}
              />

              <Route
                path="/admin/lms"
                element={<AdminLMS />}
              />

              <Route
                path="/admin/recordings"
                element={<AdminRecordings />}
              />

              <Route
                path="/testimonials"
                element={<Testimonials />}
              />

              <Route
                path="/banners"
                element={<BannerManagement />}
              />

              <Route
                path="/admin/website-templates"
                element={<WebsiteTemplates />}
              />

              <Route
                path="/admin/website-templates/create"
                element={<CreateWebsiteTemplate />}
              />

              <Route
                path="/admin/website-templates/:id/edit"
                element={<EditWebsiteTemplate />}
              />

            </Route>


            {/* =================================================
                PUBLIC WEBSITE PREVIEW
            ================================================= */}

            <Route
              path="/institute/website/preview"
              element={<PublicWebsitePreviewLayout />}
            >

              <Route
                index
                element={<WebsiteHome />}
              />

              <Route
                path="about"
                element={<WebsiteAbout />}
              />

              <Route
                path="classes"
                element={<WebsiteClasses />}
              />

              <Route
                path="classes/:classId"
                element={<WebsiteClassesDetail />}
              />

              <Route
                path="trainers"
                element={<WebsiteTrainers />}
              />

              <Route
                path="trainers/:trainerId"
                element={<WebsiteTrainerProfile />}
              />

              <Route
                path="sessions"
                element={<WebsiteSessions />}
              />

              <Route
                path="testimonials"
                element={<WebsiteTestimonials />}
              />

              <Route
                path="login"
                element={<WebsiteLogin />}
              />

            </Route>


          

            <Route element={<StudentProtectedRoute />}>

              <Route
                element={<StudentWebsitePreviewLayout />}
              >

                <Route
                  path="/institute/website/preview/dashboard"
                  element={<WebsitePreviewDashboard />}
                />

                <Route
                  path="/institute/website/preview/lms/my-learning"
                  element={<WebsiteMyLearning />}
                />

                <Route
                  path="/institute/website/preview/lms/my-learning/:classId"
                  element={<WebsiteLearningCourse />}
                />

                <Route
                  path="/institute/website/preview/lms/live-sessions"
                  element={<WebsiteSessions />}
                />

                <Route
                  path="/institute/website/preview/lms/recordings"
                  element={<WebsiteRecordings />}
                />

                <Route
                  path="/institute/website/preview/lms/my-bookings"
                  element={<WebsiteMyBookings />}
                />

                <Route
                  path="/institute/website/preview/lms/assignments"
                  element={<WebsiteAssignments />}
                />

                <Route
                  path="/institute/website/preview/lms/assignments/submit"
                  element={<WebsiteAssignmentSubmit />}
                />

                <Route
                  path="/institute/website/preview/lms/attendance"
                  element={<WebsiteAttendance />}
                />

                <Route
                  path="/institute/website/preview/lms/payment-details"
                  element={<WebsitePaymentDetails />}
                />

                <Route
                  path="/institute/website/preview/lms/profile"
                  element={<WebsiteProfile />}
                />

              </Route>

            </Route>


            {/* =================================================
                INSTITUTE ROUTES
            ================================================= */}

            <Route element={<InstituteProtectedRoute />}>

              <Route
                path="/institute/create-profile"
                element={<InstituteCreateProfile />}
              />

              <Route
                path="/institute/pending"
                element={<InstitutePending />}
              />

              <Route
                path="/institute"
                element={<InstituteLayout />}
              >

                <Route
                  index
                  element={
                    <Navigate
                      to="dashboard"
                      replace
                    />
                  }
                />

                <Route
                  path="dashboard"
                  element={<DashboardInstitute />}
                />

                <Route
                  path="trainers"
                  element={<TrainersInstitute />}
                />

                <Route
                  path="classes"
                  element={<ClassesInstitute />}
                />

                <Route
                  path="sessions"
                  element={<SessionInstitute />}
                />

                <Route
                  path="bookings"
                  element={<BookingsInstitute />}
                />

                <Route
                  path="testimonials"
                  element={<TestimonialsInstitute />}
                />

                <Route
                  path="profile"
                  element={<ProfileInstitute />}
                />

                <Route
                  path="Banners"
                  element={<BannersInstitute />}
                />

                <Route
                  path="About"
                  element={<AboutInstitute />}
                />

                <Route
                  path="footer"
                  element={<FooterInstitute />}
                />

                <Route
                  path="assignments"
                  element={<AssignmentsInstitute />}
                />

                <Route
                  path="attendance"
                  element={<AttendanceInstitute />}
                />

                <Route
                  path="lms"
                  element={<LMSInstitute />}
                />

                <Route
                  path="lms/:classId"
                  element={<LMSInstitute />}
                />

                <Route
                  path="recordings"
                  element={<RecordingsInstitute />}
                />


                {/* STUDENTS */}

                <Route
                  path="students"
                  element={<StudentsList />}
                />

                <Route
                  path="students/register"
                  element={<StudentRegistration />}
                />

                <Route
                  path="students/:id"
                  element={<StudentDetails />}
                />

                <Route
                  path="students/:id/edit"
                  element={<StudentEdit />}
                />


                {/* BATCHES */}

                <Route
                  path="batches"
                  element={<BatchList />}
                />

                <Route
                  path="batches/create"
                  element={<CreateBatch />}
                />

                <Route
                  path="batches/:id"
                  element={<BatchDetails />}
                />

                <Route
                  path="batches/:id/edit"
                  element={<EditBatch />}
                />

                <Route
                  path="batches/assign"
                  element={<BatchStudentAssignment />}
                />


                {/* PAYMENTS */}

                <Route
                  path="payments"
                  element={<PaymentList />}
                />

                <Route
                  path="payments/dashboard"
                  element={<PaymentDashboard />}
                />

                <Route
                  path="payments/collect"
                  element={<CollectPayment />}
                />

                <Route
                  path="payments/history/:studentId"
                  element={<PaymentHistory />}
                />


                {/* WEBSITE */}

                <Route
                  path="website"
                  element={<WebsiteDashboard />}
                />

                <Route
                  path="website/template"
                  element={<WebsiteTemplate />}
                />

                <Route
                  path="website/sections"
                  element={<WebsiteSections />}
                />

                <Route
                  path="website/content"
                  element={<WebsiteContent />}
                />

                <Route
                  path="website/branding"
                  element={<WebsiteBranding />}
                />

                <Route
                  path="website/publish"
                  element={<WebsitePublish />}
                />

              </Route>

            </Route>


            {/* =================================================
                TRAINER ROUTES
            ================================================= */}

            <Route element={<TrainerProtectedRoute />}>

              <Route
                path="/trainer/create-profile"
                element={<TrainerCreateProfile />}
              />

              <Route
                path="/trainer/pending"
                element={<TrainerPending />}
              />

              <Route
                path="/trainer"
                element={<TrainerLayout />}
              >

                <Route
                  index
                  element={
                    <Navigate
                      to="dashboard"
                      replace
                    />
                  }
                />

                <Route
                  path="dashboard"
                  element={<TrainerDashboard />}
                />

                <Route
                  path="classes"
                  element={<TrainerClasses />}
                />

                <Route
                  path="lms"
                  element={<TrainerLMS />}
                />

                <Route
                  path="lms/:classId"
                  element={<TrainerLMS />}
                />

                <Route
                  path="bookings"
                  element={<TrainerBookings />}
                />

                <Route
                  path="students"
                  element={<TrainerStudents />}
                />

                <Route
                  path="profile"
                  element={<TrainerProfile />}
                />

                <Route
                  path="sessions"
                  element={<TrainerSession />}
                />

                <Route
                  path="attendance"
                  element={<TrainerAttendance />}
                />

                <Route
                  path="assignments"
                  element={<TrainerAssignments />}
                />

                <Route
                  path="recordings"
                  element={<TrainerRecordings />}
                />

              </Route>

            </Route>


            {/* =================================================
                FALLBACK
            ================================================= */}

            <Route
              path="*"
              element={
                <Navigate
                  to="/"
                  replace
                />
              }
            />

          </Routes>


          {/* =================================================
              TOASTER
          ================================================= */}

          <Toaster
            position="top-right"
          />

        </div>

      </SidebarProvider>
    </Router>
  );
}


export default App;