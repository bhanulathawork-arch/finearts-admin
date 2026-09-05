// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
//   Outlet,
// } from "react-router-dom";

// import { Toaster } from "react-hot-toast";
// import { SidebarProvider } from "./context/SidebarContext";
// import { useEffect, useState } from "react";
// // import { getAuth } from "firebase/auth";
// import { getAuth, onAuthStateChanged } from "firebase/auth";

// /* ADMIN LAYOUT */
// import Layout from "./components/layout/Layout";

// /* LOGIN PAGES */
// import LoginMenu from "./pages/LoginMenu";
// import Login from "./pages/Login";
// import InstituteLogin from "./pages/InstituteLogin";
// import TrainerLogin from "./pages/TrainerLogin";

// /* ADMIN PAGES */
// import Dashboard from "./pages/Dashboard";
// import Categories from "./pages/Categories";
// import Subcategories from "./pages/Subcategories";
// import Classes from "./pages/Classes";
// import Trainers from "./pages/Trainers";
// import PendingTrainersAdmin from "./pages/PendingTrainersAdmin";
// import RejectedTrainersAdmin from "./pages/RejectedTrainersAdmin";
// import Institutes from "./pages/Institutes";
// import PendingInstitutesAdmin from "./pages/PendingInstitutesAdmin";
// import RejectedInstitutesAdmin from "./pages/RejectedInstitutesAdmin";
// import Bookings from "./pages/Bookings";
// import Students from "./pages/users";
// import Testimonials from "./pages/Testimonial";
// import Sessions from "./pages/Sessions";
// import BannerManagement from "./pages/BannerManagement";
// import WebsiteTemplates
//   from "./pages/websiteTemplates/WebsiteTemplates";

// import CreateWebsiteTemplate
//   from "./pages/websiteTemplates/CreateWebsiteTemplate";

// import EditWebsiteTemplate
//   from "./pages/websiteTemplates/EditWebsiteTemplate";




// /* INSTITUTE PAGES */
// import InstituteCreateProfile from "./institute/InstituteCreateProfile";
// import InstitutePending from "./institute/InstitutePending";
// import InstituteLayout from "./institute/InstituteLayout";
// import DashboardInstitute from "./institute/InstituteDashboard";
// import TrainersInstitute from "./institute/InstituteTrainers";

// import ClassesInstitute from "./institute/InstituteClasses";
// import TestimonialsInstitute from "./institute/InstituteTestimonials";
// import BookingsInstitute from "./institute/InstituteBookings";
// import ProfileInstitute from "./institute/InstituteProfile";
// import SessionInstitute from "./institute/InstituteSession";
// import BannersInstitute from "./institute/InstituteBanners";
// import StudentsList from "./institute/students/StudentsList";
// import StudentRegistration from "./institute/students/StudentRegistration";
// import StudentDetails from "./institute/students/StudentDetails";
// import StudentEdit from "./institute/students/StudentEdit";
// import BatchList from "./institute/batches/BatchList";
// import CreateBatch from "./institute/batches/CreateBatch";
// import EditBatch from "./institute/batches/EditBatch";
// import BatchDetails from "./institute/batches/BatchDetails";
// import PaymentDashboard from "./institute/payments/PaymentDashboard";
// import PaymentList from "./institute/payments/PaymentList";
// import CollectPayment from "./institute/payments/CollectPayment";
// import PaymentHistory from "./institute/payments/PaymentHistory";
// // =========================================================
// // INSTITUTE WEBSITE SAAS
// // =========================================================
// // import WebsiteDashboard from "./institute/Website/WebsiteDashboard";
// // import WebsiteTemplate from "./institute/Website/WebsiteTemplate";
// // import WebsiteSections from "./institute/Website/WebsiteSections";
// // import WebsiteContent from "./institute/Website/WebsiteContent";
// // import WebsiteBranding from "./institute/Website/WebsiteBranding";
// // import WebsitePreview from "./institute/Website/WebsitePreview";
// // import WebsitePublish from "./institute/Website/WebsitePublish";
// // =========================================================
// // INSTITUTE WEBSITE SAAS
// // =========================================================
// import WebsiteDashboard from "./institute/Website/WebsiteDashboard";
// import WebsiteTemplate from "./institute/Website/WebsiteTemplate";
// import WebsiteSections from "./institute/Website/WebsiteSections";
// import WebsiteContent from "./institute/Website/WebsiteContent";
// import WebsiteBranding from "./institute/Website/WebsiteBranding";
// import WebsitePreview from "./institute/Website/WebsitePreview";
// import WebsitePublish from "./institute/Website/WebsitePublish";

// // Website Preview Pages
// import WebsiteHome from "./institute/Website/WebsiteHome";
// import WebsiteAbout from "./institute/Website/WebsiteAbout";
// import WebsiteClasses from "./institute/Website/WebsiteClasses";
// import WebsiteClassesDetail from "./institute/Website/WebsiteClassDetail";
// import WebsiteTrainers from "./institute/Website/WebsiteTrainers";
// import WebsiteTrainerProfile from "./institute/Website/WebsiteTrainerProfile";
// import WebsiteSessions from "./institute/Website/WebsiteSessions";
// import WebsitePreviewDashboard from "./institute/Website/WebsitePreviewDashboard";
// import WebsiteTestimonials from "./institute/Website/WebsiteTestimonials";
// import WebsiteLogin from "./institute/Website/WebsiteLogin";

// /* TRAINER PAGES */
// import TrainerLayout from "./trainer/TrainerLayout";
// import TrainerDashboard from "./trainer/TrainerDashboard";
// import TrainerClasses from "./trainer/TrainerClasses";
// import TrainerBookings from "./trainer/TrainerBookings";
// import TrainerStudents from "./trainer/TrainerStudents";
// import TrainerProfile from "./trainer/TrainerProfile";
// import TrainerCreateProfile from "./trainer/TrainerCreateProfile";
// import TrainerPending from "./trainer/TrainerPending";
// import TrainerSession from "./trainer/TrainerSession";



// /* ========================= GUARDS ========================= */

// // function AdminProtectedRoute() {
// //   const token = localStorage.getItem("token");
// //   const role = localStorage.getItem("role");
// //   if (!token || role !== "ADMIN") return <Navigate to="/admin-login" replace />;
// //   return <Layout />;
// // }

// function AdminProtectedRoute() {
//   const token =
//     localStorage.getItem("adminToken");

//   const role =
//     localStorage.getItem("role");

//   if (!token || role !== "ADMIN") {
//     return (
//       <Navigate
//         to="/admin-login"
//         replace
//       />
//     );
//   }

//   return <Layout />;
// }



// function InstituteProtectedRoute() {
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(getAuth(), (u) => {
//       setUser(u);
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   const role = localStorage.getItem("role");

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         Loading...
//       </div>
//     );
//   }

//   if (!user || role !== "INSTITUTE") {
//     return (
//       <Navigate
//         to="/institute-login"
//         replace
//       />
//     );
//   }

//   return <Outlet />;
// }

// // function TrainerProtectedRoute() {
// //   const token = localStorage.getItem("token");
// //   const role = localStorage.getItem("role");
// //   if (!token || role !== "TRAINER") return <Navigate to="/trainer-login" replace />;
// //   return <Outlet />;
// // }
// function TrainerProtectedRoute() {
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(getAuth(), (u) => {
//       setUser(u);
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   const role = localStorage.getItem("role");

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         Loading...
//       </div>
//     );
//   }

//   if (!user || role !== "TRAINER") {
//     return <Navigate to="/trainer-login" replace />;
//   }

//   return <Outlet />;
// }
// /* ========================= APP ========================= */

// function App() {
//   return (
//     <Router>
//       <SidebarProvider>
//         <div className="min-h-screen bg-background-dark">
//           <Routes>

//             {/* LOGIN */}
//             <Route path="/" element={<LoginMenu />} />
//             <Route path="/admin-login" element={<Login />} />
//             <Route path="/institute-login" element={<InstituteLogin />} />
//             <Route path="/trainer-login" element={<TrainerLogin />} />

        
//            {/* ADMIN */}
// <Route element={<AdminProtectedRoute />}>
//   <Route path="/dashboard" element={<Dashboard />} />
//   <Route path="/categories" element={<Categories />} />
//   <Route path="/subcategories" element={<Subcategories />} />
//   <Route path="/classes" element={<Classes />} />

// <Route path="/sessions" element={<Sessions />} />




// <Route path="/trainers" element={<Trainers />} />

// <Route
//   path="/trainers/pending"
//   element={<PendingTrainersAdmin />}
// />

// <Route
//   path="/trainers/rejected"
//   element={<RejectedTrainersAdmin />}
// />

//   <Route path="/institutes" element={<Institutes />} />
// <Route
//   path="/institutes/pending"
//   element={<PendingInstitutesAdmin />}
// />
// <Route
//   path="/institutes/rejected"
//   element={<RejectedInstitutesAdmin />}
// />
 
//   <Route path="/bookings" element={<Bookings />} />
//   <Route path="/students" element={<Students />} />
//   <Route path="/testimonials" element={<Testimonials />} />
//   <Route path="/banners" element={<BannerManagement />} />
//   <Route
//   path="/admin/website-templates"
//   element={<WebsiteTemplates />}
// />

// <Route
//   path="/admin/website-templates/create"
//   element={<CreateWebsiteTemplate />}
// />

// <Route
//   path="/admin/website-templates/:id/edit"
//   element={<EditWebsiteTemplate />}
// />
// </Route>



// <Route element={<InstituteProtectedRoute />}>
//   <Route path="/institute/create-profile" element={<InstituteCreateProfile />} />
//   <Route path="/institute/pending" element={<InstitutePending />} />

//   <Route path="/institute" element={<InstituteLayout />}>

//     <Route index element={<Navigate to="dashboard" replace />} />

//     <Route path="dashboard" element={<DashboardInstitute />} />
//     <Route path="classes" element={<ClassesInstitute />} />
//      <Route path="testimonials" element={<TestimonialsInstitute />} />
//     <Route path="trainers" element={<TrainersInstitute />} />
//     <Route path="bookings" element={<BookingsInstitute />} />
//     <Route path="profile" element={<ProfileInstitute />} />
//     <Route path="sessions" element={<SessionInstitute />} />
//  <Route path="Banners" element={<BannersInstitute />} />
//     {/* Student Routes */}
//     <Route path="students" element={<StudentsList />} />
//     <Route path="students/register" element={<StudentRegistration />} />
//     <Route path="students/:id" element={<StudentDetails />} />
//     <Route path="students/:id/edit" element={<StudentEdit />} />
 
//  <Route path="batches" element={<BatchList />} />
// <Route path="batches/create" element={<CreateBatch />} />
// <Route path="batches/:id" element={<BatchDetails />} />
// <Route path="batches/:id/edit" element={<EditBatch />} />
// <Route path="payments" element={<PaymentList />} />
// <Route path="payments/dashboard" element={<PaymentDashboard />} />
// <Route path="payments/collect" element={<CollectPayment />} />
// <Route path="payments/history/:studentId" element={<PaymentHistory />} />

// {/* ===================================================
//     WEBSITE SAAS
// =================================================== */}

// <Route path="website" element={<WebsiteDashboard />} />

// <Route
//   path="website/template"
//   element={<WebsiteTemplate />}
// />

// <Route
//   path="website/sections"
//   element={<WebsiteSections />}
// />

// <Route
//   path="website/content"
//   element={<WebsiteContent />}
// />

// <Route
//   path="website/branding"
//   element={<WebsiteBranding />}
// />

// <Route
//   path="website/publish"
//   element={<WebsitePublish />}
// />


// {/* =========================================================
//     WEBSITE PREVIEW
// ========================================================= */}

// <Route
//   path="website/preview"
//   element={<WebsitePreview />}
// >
//   <Route
//     index
//     element={<WebsiteHome />}
//   />

//   <Route
//     path="about"
//     element={<WebsiteAbout />}
//   />

//   <Route
//     path="classesdetail"
//     element={<WebsiteClasses />}
//   />
//    <Route
//     path="classes"
//     element={<WebsiteClassesDetail />}
//   />

//   <Route
//     path="trainers"
//     element={<WebsiteTrainers />}
//   />
//    <Route
//     path="trainerprofile"
//     element={<WebsiteTrainerProfile />}
//   />

//   <Route
//     path="sessions"
//     element={<WebsiteSessions />}
//   />
//  <Route
//     path="Dashboard"
//     element={<WebsitePreviewDashboard />}
//   />
//   <Route
//     path="testimonials"
//     element={<WebsiteTestimonials />}
//   />

//   <Route
//     path="login"
//     element={<WebsiteLogin />}
//   />
// </Route>
//   </Route>
// </Route>
//             {/* TRAINER — open routes (after login, before approval) */}
//             <Route element={<TrainerProtectedRoute />}>
//               {/* Profile creation — no sidebar needed */}
//               <Route path="/trainer/create-profile" element={<TrainerCreateProfile />} />
//               {/* Pending approval page — no sidebar needed */}
//               <Route path="/trainer/pending" element={<TrainerPending />} />

//               {/* Full trainer panel with sidebar */}
//               <Route path="/trainer" element={<TrainerLayout />}>
//                 <Route index element={<Navigate to="dashboard" replace />} />
//                 <Route path="dashboard" element={<TrainerDashboard />} />
//                 <Route path="classes" element={<TrainerClasses />} />
//                 <Route path="bookings" element={<TrainerBookings />} />
//                 <Route path="students" element={<TrainerStudents />} />
//                 <Route path="profile" element={<TrainerProfile />} />
//                   <Route path="sessions" element={<TrainerSession />} />
//               </Route>
//             </Route>

//             {/* FALLBACK */}
//             <Route path="*" element={<Navigate to="/" replace />} />

//           </Routes>
//           <Toaster position="top-right" />
//         </div>
//       </SidebarProvider>
//     </Router>
//   );
// }

// export default App;





// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
//   Outlet,
// } from "react-router-dom";

// import { Toaster } from "react-hot-toast";
// import { SidebarProvider } from "./context/SidebarContext";
// import { useEffect, useState } from "react";
// // import { getAuth } from "firebase/auth";
// import { getAuth, onAuthStateChanged } from "firebase/auth";

// /* ADMIN LAYOUT */
// import Layout from "./components/layout/Layout";

// /* LOGIN PAGES */
// import LoginMenu from "./pages/LoginMenu";
// import Login from "./pages/Login";
// import InstituteLogin from "./pages/InstituteLogin";
// import TrainerLogin from "./pages/TrainerLogin";

// /* ADMIN PAGES */
// import Dashboard from "./pages/Dashboard";
// import Categories from "./pages/Categories";
// import Subcategories from "./pages/Subcategories";
// import Classes from "./pages/Classes";
// import Trainers from "./pages/Trainers";
// import PendingTrainersAdmin from "./pages/PendingTrainersAdmin";
// import RejectedTrainersAdmin from "./pages/RejectedTrainersAdmin";
// import Institutes from "./pages/Institutes";
// import PendingInstitutesAdmin from "./pages/PendingInstitutesAdmin";
// import RejectedInstitutesAdmin from "./pages/RejectedInstitutesAdmin";
// import Bookings from "./pages/Bookings";
// import Students from "./pages/users";
// import Testimonials from "./pages/Testimonial";
// import Sessions from "./pages/Sessions";
// import BannerManagement from "./pages/BannerManagement";
// import WebsiteTemplates
//   from "./pages/websiteTemplates/WebsiteTemplates";

// import CreateWebsiteTemplate
//   from "./pages/websiteTemplates/CreateWebsiteTemplate";

// import EditWebsiteTemplate
//   from "./pages/websiteTemplates/EditWebsiteTemplate";




// /* INSTITUTE PAGES */
// import InstituteCreateProfile from "./institute/InstituteCreateProfile";
// import InstitutePending from "./institute/InstitutePending";
// import InstituteLayout from "./institute/InstituteLayout";
// import DashboardInstitute from "./institute/InstituteDashboard";
// import TrainersInstitute from "./institute/InstituteTrainers";

// import ClassesInstitute from "./institute/InstituteClasses";
// import TestimonialsInstitute from "./institute/InstituteTestimonials";
// import BookingsInstitute from "./institute/InstituteBookings";
// import ProfileInstitute from "./institute/InstituteProfile";
// import SessionInstitute from "./institute/InstituteSession";
// import AboutInstitute from "./institute/InstituteAbout";
// import BannersInstitute from "./institute/InstituteBanners";
// import FooterInstitute from "./institute/InstituteFooter";
// import StudentsList from "./institute/students/StudentsList";
// import StudentRegistration from "./institute/students/StudentRegistration";
// import StudentDetails from "./institute/students/StudentDetails";
// import StudentEdit from "./institute/students/StudentEdit";
// import BatchList from "./institute/batches/BatchList";
// import CreateBatch from "./institute/batches/CreateBatch";
// import EditBatch from "./institute/batches/EditBatch";
// import BatchDetails from "./institute/batches/BatchDetails";
// import BatchStudentAssignment from "./institute/batches/BatchStudentAssignment";
// import PaymentDashboard from "./institute/payments/PaymentDashboard";
// import PaymentList from "./institute/payments/PaymentList";
// import CollectPayment from "./institute/payments/CollectPayment";
// import PaymentHistory from "./institute/payments/PaymentHistory";
// // =========================================================
// // INSTITUTE WEBSITE SAAS
// // =========================================================
// // import WebsiteDashboard from "./institute/Website/WebsiteDashboard";
// // import WebsiteTemplate from "./institute/Website/WebsiteTemplate";
// // import WebsiteSections from "./institute/Website/WebsiteSections";
// // import WebsiteContent from "./institute/Website/WebsiteContent";
// // import WebsiteBranding from "./institute/Website/WebsiteBranding";
// // import WebsitePreview from "./institute/Website/WebsitePreview";
// // import WebsitePublish from "./institute/Website/WebsitePublish";
// // =========================================================
// // INSTITUTE WEBSITE SAAS
// // =========================================================
// import WebsiteDashboard from "./institute/Website/WebsiteDashboard";
// import WebsiteTemplate from "./institute/Website/WebsiteTemplate";
// import WebsiteSections from "./institute/Website/WebsiteSections";
// import WebsiteContent from "./institute/Website/WebsiteContent";
// import WebsiteBranding from "./institute/Website/WebsiteBranding";
// import WebsitePreview from "./institute/Website/WebsitePreview";
// import WebsitePublish from "./institute/Website/WebsitePublish";

// // Website Preview Pages
// import WebsiteNavbar from "./institute/Website/WebsiteNavbar";
// import WebsiteHome from "./institute/Website/WebsiteHome";
// import WebsiteAbout from "./institute/Website/WebsiteAbout";
// import WebsiteClasses from "./institute/Website/WebsiteClasses";
// import WebsiteClassesDetail from "./institute/Website/WebsiteClassDetail";
// import WebsiteTrainers from "./institute/Website/WebsiteTrainers";
// import WebsiteTrainerProfile from "./institute/Website/WebsiteTrainerProfile";
// import WebsiteSessions from "./institute/Website/WebsiteSessions";
// import WebsitePreviewDashboard from "./institute/Website/WebsitePreviewDashboard";
// import WebsiteTestimonials from "./institute/Website/WebsiteTestimonials";
// import WebsiteLogin from "./institute/Website/WebsiteLogin";

// /* TRAINER PAGES */
// import TrainerLayout from "./trainer/TrainerLayout";
// import TrainerDashboard from "./trainer/TrainerDashboard";
// import TrainerClasses from "./trainer/TrainerClasses";
// import TrainerBookings from "./trainer/TrainerBookings";
// import TrainerStudents from "./trainer/TrainerStudents";
// import TrainerProfile from "./trainer/TrainerProfile";
// import TrainerCreateProfile from "./trainer/TrainerCreateProfile";
// import TrainerPending from "./trainer/TrainerPending";
// import TrainerSession from "./trainer/TrainerSession";



// /* ========================= GUARDS ========================= */

// // function AdminProtectedRoute() {
// //   const token = localStorage.getItem("token");
// //   const role = localStorage.getItem("role");
// //   if (!token || role !== "ADMIN") return <Navigate to="/admin-login" replace />;
// //   return <Layout />;
// // }

// function AdminProtectedRoute() {
//   const token =
//     localStorage.getItem("adminToken");

//   const role =
//     localStorage.getItem("role");

//   if (!token || role !== "ADMIN") {
//     return (
//       <Navigate
//         to="/admin-login"
//         replace
//       />
//     );
//   }

//   return <Layout />;
// }



// function InstituteProtectedRoute() {
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(getAuth(), (u) => {
//       setUser(u);
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   const role = localStorage.getItem("role");

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         Loading...
//       </div>
//     );
//   }

//   if (!user || role !== "INSTITUTE") {
//     return (
//       <Navigate
//         to="/institute-login"
//         replace
//       />
//     );
//   }

//   return <Outlet />;
// }

// // function TrainerProtectedRoute() {
// //   const token = localStorage.getItem("token");
// //   const role = localStorage.getItem("role");
// //   if (!token || role !== "TRAINER") return <Navigate to="/trainer-login" replace />;
// //   return <Outlet />;
// // }
// function TrainerProtectedRoute() {
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(getAuth(), (u) => {
//       setUser(u);
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   const role = localStorage.getItem("role");

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         Loading...
//       </div>
//     );
//   }

//   if (!user || role !== "TRAINER") {
//     return <Navigate to="/trainer-login" replace />;
//   }

//   return <Outlet />;
// }
// /* ========================= APP ========================= */

// function App() {
//   return (
//     <Router>
//       <SidebarProvider>
//         <div className="min-h-screen bg-background-dark">
//           <Routes>

//             {/* LOGIN */}
//             <Route path="/" element={<LoginMenu />} />
//             <Route path="/admin-login" element={<Login />} />
//             <Route path="/institute-login" element={<InstituteLogin />} />
//             <Route path="/trainer-login" element={<TrainerLogin />} />

        
//            {/* ADMIN */}
// <Route element={<AdminProtectedRoute />}>
//   <Route path="/dashboard" element={<Dashboard />} />
//   <Route path="/categories" element={<Categories />} />
//   <Route path="/subcategories" element={<Subcategories />} />
//   <Route path="/classes" element={<Classes />} />

// <Route path="/sessions" element={<Sessions />} />




// <Route path="/trainers" element={<Trainers />} />

// <Route
//   path="/trainers/pending"
//   element={<PendingTrainersAdmin />}
// />

// <Route
//   path="/trainers/rejected"
//   element={<RejectedTrainersAdmin />}
// />

//   <Route path="/institutes" element={<Institutes />} />
// <Route
//   path="/institutes/pending"
//   element={<PendingInstitutesAdmin />}
// />
// <Route
//   path="/institutes/rejected"
//   element={<RejectedInstitutesAdmin />}
// />
 
//   <Route path="/bookings" element={<Bookings />} />
//   <Route path="/students" element={<Students />} />
//   <Route path="/testimonials" element={<Testimonials />} />
//   <Route path="/banners" element={<BannerManagement />} />
//   <Route
//   path="/admin/website-templates"
//   element={<WebsiteTemplates />}
// />

// <Route
//   path="/admin/website-templates/create"
//   element={<CreateWebsiteTemplate />}
// />

// <Route
//   path="/admin/website-templates/:id/edit"
//   element={<EditWebsiteTemplate />}
// />
// </Route>



// <Route element={<InstituteProtectedRoute />}>
//   <Route path="/institute/create-profile" element={<InstituteCreateProfile />} />
//   <Route path="/institute/pending" element={<InstitutePending />} />

//   <Route path="/institute" element={<InstituteLayout />}>

//     <Route index element={<Navigate to="dashboard" replace />} />

//     <Route path="dashboard" element={<DashboardInstitute />} />
//     <Route path="classes" element={<ClassesInstitute />} />
//      <Route path="testimonials" element={<TestimonialsInstitute />} />
//     <Route path="trainers" element={<TrainersInstitute />} />
//     <Route path="bookings" element={<BookingsInstitute />} />
//     <Route path="profile" element={<ProfileInstitute />} />
//     <Route path="sessions" element={<SessionInstitute />} />
//  <Route path="Banners" element={<BannersInstitute />} />
//  <Route path="About" element={<AboutInstitute />} />
//  <Route path="footer" element={<FooterInstitute />} />
//     {/* Student Routes */}
//     <Route path="students" element={<StudentsList />} />
//     <Route path="students/register" element={<StudentRegistration />} />
//     <Route path="students/:id" element={<StudentDetails />} />
//     <Route path="students/:id/edit" element={<StudentEdit />} />
 
//  <Route path="batches" element={<BatchList />} />
// <Route path="batches/create" element={<CreateBatch />} />
// <Route path="batches/:id" element={<BatchDetails />} />
// <Route path="batches/:id/edit" element={<EditBatch />} />
// <Route
//   path="/institute/batches/assign"
//   element={<BatchStudentAssignment />}
// />
// <Route path="payments" element={<PaymentList />} />
// <Route path="payments/dashboard" element={<PaymentDashboard />} />
// <Route path="payments/collect" element={<CollectPayment />} />
// <Route path="payments/history/:studentId" element={<PaymentHistory />} />

// {/* ===================================================
//     WEBSITE SAAS
// =================================================== */}

// <Route path="website" element={<WebsiteDashboard />} />

// {/* <Route
//   path="website/template"
//   element={<WebsiteTemplate />}
// /> */}

// <Route
//   path="website/sections"
//   element={<WebsiteSections />}
// />

// <Route
//   path="website/content"
//   element={<WebsiteContent />}
// />

// <Route
//   path="website/branding"
//   element={<WebsiteBranding />}
// />

// <Route
//   path="website/publish"
//   element={<WebsitePublish />}
// />


// {/* =========================================================
//     WEBSITE PREVIEW
// ========================================================= */}

// {/* =========================================================
//     WEBSITE PREVIEW
// ========================================================= */}

// <Route
//   path="website/preview"
//   element={<WebsitePreview />}
// >
//   {/* HOME */}
//   <Route
//     index
//     element={<WebsiteHome />}
//   />

//   {/* ABOUT */}
//   <Route
//     path="about"
//     element={<WebsiteAbout />}
//   />

//   {/* CLASSES */}
//   <Route
//     path="classes"
//     element={<WebsiteClasses />}
//   />

//   {/* CLASS DETAIL */}
//   <Route
//     path="classes/:classId"
//     element={<WebsiteClassesDetail />}
//   />

//   {/* TRAINERS */}
//   <Route
//     path="trainers"
//     element={<WebsiteTrainers />}
//   />

//   {/* TRAINER PROFILE */}
//   <Route
//     path="trainers/:trainerId"
//     element={<WebsiteTrainerProfile />}
//   />

//   {/* SESSIONS */}
//   <Route
//     path="sessions"
//     element={<WebsiteSessions />}
//   />

//   {/* DASHBOARD */}
//   <Route
//     path="dashboard"
//     element={<WebsitePreviewDashboard />}
//   />

//   {/* TESTIMONIALS */}
//   <Route
//     path="testimonials"
//     element={<WebsiteTestimonials />}
//   />

//   {/* LOGIN */}
//   <Route
//     path="login"
//     element={<WebsiteLogin />}
//   />
// </Route>
//   </Route>
// </Route>
//             {/* TRAINER — open routes (after login, before approval) */}
//             <Route element={<TrainerProtectedRoute />}>
//               {/* Profile creation — no sidebar needed */}
//               <Route path="/trainer/create-profile" element={<TrainerCreateProfile />} />
//               {/* Pending approval page — no sidebar needed */}
//               <Route path="/trainer/pending" element={<TrainerPending />} />

//               {/* Full trainer panel with sidebar */}
//               <Route path="/trainer" element={<TrainerLayout />}>
//                 <Route index element={<Navigate to="dashboard" replace />} />
//                 <Route path="dashboard" element={<TrainerDashboard />} />
//                 <Route path="classes" element={<TrainerClasses />} />
//                 <Route path="bookings" element={<TrainerBookings />} />
//                 <Route path="students" element={<TrainerStudents />} />
//                 <Route path="profile" element={<TrainerProfile />} />
//                   <Route path="sessions" element={<TrainerSession />} />
//               </Route>
//             </Route>

//             {/* FALLBACK */}
//             <Route path="*" element={<Navigate to="/" replace />} />

//           </Routes>
//           <Toaster position="top-right" />
//         </div>
//       </SidebarProvider>
//     </Router>
//   );
// }

// export default App;

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
import WebsitePreview from "./institute/Website/WebsitePreview";
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

/* =========================================================
   HELPERS
========================================================= */

const getStoredRole = () => {
  return (
    localStorage.getItem("role") || ""
  )
    .trim()
    .toUpperCase();
};


/* =========================================================
   ADMIN PROTECTED ROUTE
========================================================= */

function AdminProtectedRoute() {
  const adminToken =
    localStorage.getItem("adminToken");

  const role = getStoredRole();

  if (
    !adminToken ||
    role !== "ADMIN"
  ) {
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
  const [loading, setLoading] =
    useState(true);

  const [user, setUser] =
    useState(null);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe =
      onAuthStateChanged(
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

  if (
    !user ||
    role !== "INSTITUTE"
  ) {
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
  const [loading, setLoading] =
    useState(true);

  const [user, setUser] =
    useState(null);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe =
      onAuthStateChanged(
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

  if (
    !user ||
    role !== "TRAINER"
  ) {
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
=========================================================

   IMPORTANT:

   Website student authentication is separate from the
   main account role.

   Example:

       accounts.role = INSTITUTE
       students.id = 9
       students.registration_source = ONLINE

   Therefore this route MUST NOT check:

       localStorage.role === "STUDENT"

   It uses the student session created by WebsiteLogin:

       studentUser
       studentRole
       studentLoggedIn
       studentToken
       studentInstituteId

========================================================= */

function StudentProtectedRoute() {

  const [loading, setLoading] =
    useState(true);

  const [firebaseUser, setFirebaseUser] =
    useState(null);

  const [studentSession, setStudentSession] =
    useState(false);


  /* =======================================================
     CHECK STUDENT SESSION
  ======================================================= */

  const checkStudentSession = () => {

    const studentRole =
      String(
        localStorage.getItem(
          "studentRole"
        ) || ""
      )
        .trim()
        .toUpperCase();

    const studentLoggedIn =
      localStorage.getItem(
        "studentLoggedIn"
      ) === "true";

    const studentToken =
      localStorage.getItem(
        "studentToken"
      );

    const studentUser =
      localStorage.getItem(
        "studentUser"
      );

    const studentInstituteId =
      localStorage.getItem(
        "studentInstituteId"
      );

    /*
    ---------------------------------------------------------
    Student session is valid when the website login has
    successfully created the student session.
    ---------------------------------------------------------
    */

    const validSession =
      studentRole === "STUDENT" &&
      studentLoggedIn === true &&
      !!studentUser &&
      !!studentInstituteId &&
      !!studentToken;


    console.log(
      "=========================================="
    );

    console.log(
      "WEBSITE STUDENT ROUTE CHECK"
    );

    console.log(
      "studentRole:",
      studentRole
    );

    console.log(
      "studentLoggedIn:",
      studentLoggedIn
    );

    console.log(
      "studentUser:",
      !!studentUser
    );

    console.log(
      "studentToken:",
      !!studentToken
    );

    console.log(
      "studentInstituteId:",
      studentInstituteId
    );

    console.log(
      "Firebase User:",
      !!firebaseUser
    );

    console.log(
      "VALID STUDENT SESSION:",
      validSession
    );

    console.log(
      "=========================================="
    );


    setStudentSession(
      validSession
    );
  };


  /* =======================================================
     FIREBASE AUTH STATE
  ======================================================= */

  useEffect(() => {

    const auth = getAuth();

    /*
    ---------------------------------------------------------
    If Firebase already has a current user, use it
    immediately.
    ---------------------------------------------------------
    */

    if (auth.currentUser) {

      setFirebaseUser(
        auth.currentUser
      );

    }


    const unsubscribe =
      onAuthStateChanged(
        auth,
        (user) => {

          setFirebaseUser(user);

          /*
          ----------------------------------------------------
          Firebase has restored the session.
          Now check localStorage.
          ----------------------------------------------------
          */

          setTimeout(() => {

            checkStudentSession();

            setLoading(false);

          }, 0);

        }
      );


    return () => {
      unsubscribe();
    };

  }, []);


  /* =======================================================
     SAME-TAB LOGIN EVENT
  ======================================================= */

  useEffect(() => {

    const refreshStudentSession =
      () => {

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

  }, [firebaseUser]);


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
     IMPORTANT AUTH CHECK
  =======================================================

     We intentionally DO NOT check:

         localStorage.role

     because your online student can have:

         account role = INSTITUTE

  ======================================================= */

  if (!studentSession) {

    console.warn(
      "WEBSITE STUDENT SESSION NOT FOUND"
    );

    return (
      <Navigate
        to="/institute/website/preview/login"
        replace
      />
    );

  }


  /* =======================================================
     FIREBASE CHECK
  =======================================================

     Firebase should normally exist because Google / OTP
     login is performed through Firebase.

     But we don't check account role here.
  ======================================================= */

  if (!firebaseUser) {

    console.warn(
      "WEBSITE STUDENT FIREBASE USER NOT FOUND"
    );

    return (
      <Navigate
        to="/institute/website/preview/login"
        replace
      />
    );

  }


  /* =======================================================
     ACCESS GRANTED
  ======================================================= */

  console.log(
    "=========================================="
  );

  console.log(
    "WEBSITE STUDENT ACCESS GRANTED"
  );

  console.log(
    "Student ID:",
    localStorage.getItem(
      "studentId"
    ) ||
    localStorage.getItem(
      "websiteStudentId"
    )
  );

  console.log(
    "Institute ID:",
    localStorage.getItem(
      "studentInstituteId"
    )
  );

  console.log(
    "=========================================="
  );


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
              element={
                <LoginMenu />
              }
            />


            {/* =================================================
                ADMIN LOGIN
            ================================================= */}

            <Route
              path="/admin-login"
              element={
                <Login />
              }
            />


            {/* =================================================
                INSTITUTE LOGIN
            ================================================= */}

            <Route
              path="/institute-login"
              element={
                <InstituteLogin />
              }
            />


            {/* =================================================
                TRAINER LOGIN
            ================================================= */}

            <Route
              path="/trainer-login"
              element={
                <TrainerLogin />
              }
            />


            {/* =================================================
                ADMIN ROUTES
            ================================================= */}

            <Route
              element={
                <AdminProtectedRoute />
              }
            >

              <Route
                path="/dashboard"
                element={
                  <Dashboard />
                }
              />

              <Route
                path="/categories"
                element={
                  <Categories />
                }
              />

              <Route
                path="/subcategories"
                element={
                  <Subcategories />
                }
              />

              <Route
                path="/classes"
                element={
                  <Classes />
                }
              />

              <Route
                path="/sessions"
                element={
                  <Sessions />
                }
              />

              <Route
                path="/trainers"
                element={
                  <Trainers />
                }
              />

              <Route
                path="/trainers/pending"
                element={
                  <PendingTrainersAdmin />
                }
              />

              <Route
                path="/trainers/rejected"
                element={
                  <RejectedTrainersAdmin />
                }
              />

              <Route
                path="/institutes"
                element={
                  <Institutes />
                }
              />

              <Route
                path="/institutes/pending"
                element={
                  <PendingInstitutesAdmin />
                }
              />

              <Route
                path="/institutes/rejected"
                element={
                  <RejectedInstitutesAdmin />
                }
              />

              <Route
                path="/bookings"
                element={
                  <Bookings />
                }
              />

              <Route
                path="/students"
                element={
                  <Students />
                }
              />

              <Route
                path="/testimonials"
                element={
                  <Testimonials />
                }
              />

              <Route
                path="/banners"
                element={
                  <BannerManagement />
                }
              />

              <Route
                path="/admin/website-templates"
                element={
                  <WebsiteTemplates />
                }
              />

              <Route
                path="/admin/website-templates/create"
                element={
                  <CreateWebsiteTemplate />
                }
              />

              <Route
                path="/admin/website-templates/:id/edit"
                element={
                  <EditWebsiteTemplate />
                }
              />

            </Route>


            {/* =================================================
                PUBLIC WEBSITE PREVIEW
            ================================================= */}

            <Route
              path="/institute/website/preview"
              element={
                <PublicWebsitePreviewLayout />
              }
            >

              {/* HOME */}

              <Route
                index
                element={
                  <WebsiteHome />
                }
              />


              {/* ABOUT */}

              <Route
                path="about"
                element={
                  <WebsiteAbout />
                }
              />


              {/* CLASSES */}

              <Route
                path="classes"
                element={
                  <WebsiteClasses />
                }
              />


              {/* CLASS DETAIL */}

              <Route
                path="classes/:classId"
                element={
                  <WebsiteClassesDetail />
                }
              />


              {/* TRAINERS */}

              <Route
                path="trainers"
                element={
                  <WebsiteTrainers />
                }
              />


              {/* TRAINER PROFILE */}

              <Route
                path="trainers/:trainerId"
                element={
                  <WebsiteTrainerProfile />
                }
              />


              {/* SESSIONS */}

              <Route
                path="sessions"
                element={
                  <WebsiteSessions />
                }
              />


              {/* TESTIMONIALS */}

              <Route
                path="testimonials"
                element={
                  <WebsiteTestimonials />
                }
              />


              {/* =================================================
                  STUDENT LOGIN
              ================================================= */}

              <Route
                path="login"
                element={
                  <WebsiteLogin />
                }
              />


              {/* =================================================
                  STUDENT DASHBOARD
              ================================================= */}

              <Route
                element={
                  <StudentProtectedRoute />
                }
              >

                <Route
                  path="dashboard"
                  element={
                    <WebsitePreviewDashboard />
                  }
                />

              </Route>

            </Route>


            {/* =================================================
                INSTITUTE ROUTES
            ================================================= */}

            <Route
              element={
                <InstituteProtectedRoute />
              }
            >

              <Route
                path="/institute/create-profile"
                element={
                  <InstituteCreateProfile />
                }
              />

              <Route
                path="/institute/pending"
                element={
                  <InstitutePending />
                }
              />

              <Route
                path="/institute"
                element={
                  <InstituteLayout />
                }
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
                  element={
                    <DashboardInstitute />
                  }
                />

                <Route
                  path="trainers"
                  element={
                    <TrainersInstitute />
                  }
                />

                <Route
                  path="classes"
                  element={
                    <ClassesInstitute />
                  }
                />

                <Route
                  path="sessions"
                  element={
                    <SessionInstitute />
                  }
                />

                <Route
                  path="bookings"
                  element={
                    <BookingsInstitute />
                  }
                />

                <Route
                  path="testimonials"
                  element={
                    <TestimonialsInstitute />
                  }
                />

                <Route
                  path="profile"
                  element={
                    <ProfileInstitute />
                  }
                />

                <Route
                  path="Banners"
                  element={
                    <BannersInstitute />
                  }
                />

                <Route
                  path="About"
                  element={
                    <AboutInstitute />
                  }
                />

                <Route
                  path="footer"
                  element={
                    <FooterInstitute />
                  }
                />


                {/* =================================================
                    STUDENTS
                ================================================= */}

                <Route
                  path="students"
                  element={
                    <StudentsList />
                  }
                />

                <Route
                  path="students/register"
                  element={
                    <StudentRegistration />
                  }
                />

                <Route
                  path="students/:id"
                  element={
                    <StudentDetails />
                  }
                />

                <Route
                  path="students/:id/edit"
                  element={
                    <StudentEdit />
                  }
                />


                {/* =================================================
                    BATCHES
                ================================================= */}

                <Route
                  path="batches"
                  element={
                    <BatchList />
                  }
                />

                <Route
                  path="batches/create"
                  element={
                    <CreateBatch />
                  }
                />

                <Route
                  path="batches/:id"
                  element={
                    <BatchDetails />
                  }
                />

                <Route
                  path="batches/:id/edit"
                  element={
                    <EditBatch />
                  }
                />

                <Route
                  path="batches/assign"
                  element={
                    <BatchStudentAssignment />
                  }
                />


                {/* =================================================
                    PAYMENTS
                ================================================= */}

                <Route
                  path="payments"
                  element={
                    <PaymentList />
                  }
                />

                <Route
                  path="payments/dashboard"
                  element={
                    <PaymentDashboard />
                  }
                />

                <Route
                  path="payments/collect"
                  element={
                    <CollectPayment />
                  }
                />

                <Route
                  path="payments/history/:studentId"
                  element={
                    <PaymentHistory />
                  }
                />


                {/* =================================================
                    WEBSITE SAAS
                ================================================= */}

                <Route
                  path="website"
                  element={
                    <WebsiteDashboard />
                  }
                />

                <Route
                  path="website/template"
                  element={
                    <WebsiteTemplate />
                  }
                />

                <Route
                  path="website/sections"
                  element={
                    <WebsiteSections />
                  }
                />

                <Route
                  path="website/content"
                  element={
                    <WebsiteContent />
                  }
                />

                <Route
                  path="website/branding"
                  element={
                    <WebsiteBranding />
                  }
                />

                <Route
                  path="website/publish"
                  element={
                    <WebsitePublish />
                  }
                />

              </Route>

            </Route>


            {/* =================================================
                TRAINER ROUTES
            ================================================= */}

            <Route
              element={
                <TrainerProtectedRoute />
              }
            >

              <Route
                path="/trainer/create-profile"
                element={
                  <TrainerCreateProfile />
                }
              />

              <Route
                path="/trainer/pending"
                element={
                  <TrainerPending />
                }
              />

              <Route
                path="/trainer"
                element={
                  <TrainerLayout />
                }
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
                  element={
                    <TrainerDashboard />
                  }
                />

                <Route
                  path="classes"
                  element={
                    <TrainerClasses />
                  }
                />

                <Route
                  path="bookings"
                  element={
                    <TrainerBookings />
                  }
                />

                <Route
                  path="students"
                  element={
                    <TrainerStudents />
                  }
                />

                <Route
                  path="profile"
                  element={
                    <TrainerProfile />
                  }
                />

                <Route
                  path="sessions"
                  element={
                    <TrainerSession />
                  }
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


          <Toaster
            position="top-right"
          />

        </div>

      </SidebarProvider>

    </Router>
  );
}

export default App;