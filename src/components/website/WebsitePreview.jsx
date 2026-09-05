// // src/components/website/WebsitePreview.jsx

// import {
//   ArrowRight,
//   BookOpen,
//   CalendarDays,
//   Image as ImageIcon,
//   Mail,
//   MapPin,
//   Phone,
//   UserRound,
//   Users,
// } from "lucide-react";


// /* =========================================================
//    DEFAULT BRANDING
// ========================================================= */

// const DEFAULT_BRANDING = {
//   primaryColor: "#0D9488",
//   secondaryColor: "#134E4A",
//   accentColor: "#F59E0B",
//   fontHeading: "Inter",
//   fontBody: "Inter",
//   logoUrl: null,
//   roundedButtons: true,
//   darkFooter: true,
// };


// /* =========================================================
//    COMPONENT
// ========================================================= */

// export default function WebsitePreview({
//   website,
// }) {
//   const data =
//     website || {};

//   const branding = {
//     ...DEFAULT_BRANDING,
//     ...(data.branding || {}),
//   };


//   const institute =
//     data.institute ||
//     data.instituteData ||
//     {};


//   const instituteName =
//     institute.name ||
//     institute.institute_name ||
//     data.institute_name ||
//     "Your Institute";


//   const sections =
//     Array.isArray(
//       data.sections
//     )
//       ? [...data.sections]
//           .sort(
//             (a, b) =>
//               Number(
//                 a.order ??
//                   a.section_order ??
//                   0
//               ) -
//               Number(
//                 b.order ??
//                   b.section_order ??
//                   0
//               )
//           )
//           .filter(
//             (section) =>
//               section.visible ===
//                 true ||
//               section.visible ===
//                 1 ||
//               section.is_enabled ===
//                 true ||
//               section.is_enabled ===
//                 1
//           )
//       : [];


//   const logoUrl =
//     branding.logoUrl ||
//     institute.logo_url ||
//     institute.logo ||
//     null;


//   const cssVariables = {
//     "--website-primary":
//       branding.primaryColor,

//     "--website-secondary":
//       branding.secondaryColor,

//     "--website-accent":
//       branding.accentColor,

//     "--website-heading-font":
//       branding.fontHeading,

//     "--website-body-font":
//       branding.fontBody,
//   };


//   return (
//     <div
//       className="overflow-hidden rounded-2xl bg-white text-gray-900 shadow-2xl"
//       style={cssVariables}
//     >

//       {/* =====================================================
//           NAVBAR
//       ===================================================== */}

//       <nav className="border-b border-gray-200 bg-white">

//         <div className="flex min-h-[72px] items-center justify-between px-6">

//           {/* LOGO */}

//           <div className="flex items-center gap-3">

//             {logoUrl ? (
//               <img
//                 src={logoUrl}
//                 alt={instituteName}
//                 className="h-10 w-10 object-contain"
//               />
//             ) : (
//               <div
//                 className="flex h-10 w-10 items-center justify-center font-bold text-white"
//                 style={{
//                   backgroundColor:
//                     branding.primaryColor,
//                   borderRadius:
//                     branding.roundedButtons
//                       ? "12px"
//                       : "4px",
//                 }}
//               >
//                 {instituteName
//                   .charAt(0)
//                   .toUpperCase()}
//               </div>
//             )}

//             <div>

//               <p
//                 className="text-sm font-bold"
//                 style={{
//                   fontFamily:
//                     branding.fontHeading,
//                 }}
//               >
//                 {instituteName}
//               </p>

//               <p className="text-[10px] text-gray-400">
//                 Institute
//               </p>

//             </div>

//           </div>


//           {/* NAV LINKS */}

//           <div className="hidden items-center gap-5 md:flex">

//             {sections
//               .filter(
//                 (section) =>
//                   getSectionType(
//                     section
//                   ) !==
//                   "studentLogin"
//               )
//               .slice(0, 5)
//               .map(
//                 (section) => {

//                   const type =
//                     getSectionType(
//                       section
//                     );

//                   return (
//                     <a
//                       key={
//                         section.id
//                       }
//                       href={`#${type}`}
//                       className="text-xs text-gray-500 transition hover:text-gray-900"
//                     >
//                       {getSectionLabel(
//                         section
//                       )}
//                     </a>
//                   );
//                 }
//               )}

//           </div>


//           <a
//             href="#contact"
//             className="hidden px-4 py-2 text-xs font-semibold text-white sm:block"
//             style={{
//               backgroundColor:
//                 branding.primaryColor,
//               borderRadius:
//                 branding.roundedButtons
//                   ? "999px"
//                   : "5px",
//             }}
//           >
//             Contact
//           </a>

//         </div>

//       </nav>


//       {/* =====================================================
//           SECTIONS
//       ===================================================== */}

//       {sections.map(
//         (section) => {

//           const type =
//             getSectionType(
//               section
//             );

//           const content =
//             section.content ||
//             {};

//           switch (type) {

//             case "hero":
//               return (
//                 <Hero
//                   key={
//                     section.id
//                   }
//                   content={
//                     content
//                   }
//                   branding={
//                     branding
//                   }
//                   instituteName={
//                     instituteName
//                   }
//                 />
//               );

//             case "about":
//               return (
//                 <About
//                   key={
//                     section.id
//                   }
//                   content={
//                     content
//                   }
//                   branding={
//                     branding
//                   }
//                 />
//               );

//             case "courses":
//               return (
//                 <Courses
//                   key={
//                     section.id
//                   }
//                   website={
//                     data
//                   }
//                   branding={
//                     branding
//                   }
//                 />
//               );

//             case "trainers":
//               return (
//                 <Trainers
//                   key={
//                     section.id
//                   }
//                   website={
//                     data
//                   }
//                   branding={
//                     branding
//                   }
//                 />
//               );

//             case "batches":
//               return (
//                 <Batches
//                   key={
//                     section.id
//                   }
//                   website={
//                     data
//                   }
//                   branding={
//                     branding
//                   }
//                 />
//               );

//             case "gallery":
//               return (
//                 <Gallery
//                   key={
//                     section.id
//                   }
//                   content={
//                     content
//                   }
//                   branding={
//                     branding
//                   }
//                 />
//               );

//             case "contact":
//               return (
//                 <Contact
//                   key={
//                     section.id
//                   }
//                   content={
//                     content
//                   }
//                   institute={
//                     institute
//                   }
//                   branding={
//                     branding
//                   }
//                 />
//               );

//             case "studentLogin":
//               return (
//                 <StudentLogin
//                   key={
//                     section.id
//                   }
//                   branding={
//                     branding
//                   }
//                 />
//               );

//             default:
//               return null;
//           }
//         }
//       )}


//       {/* =====================================================
//           FOOTER
//       ===================================================== */}

//       <footer
//         className="px-6 py-8"
//         style={{
//           backgroundColor:
//             branding.darkFooter
//               ? "#111827"
//               : "#f3f4f6",
//         }}
//       >

//         <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

//           <p
//             className={`text-xs ${
//               branding.darkFooter
//                 ? "text-gray-500"
//                 : "text-gray-400"
//             }`}
//           >
//             ©{" "}
//             {new Date().getFullYear()}{" "}
//             {instituteName}
//           </p>

//           <p
//             className={`text-xs ${
//               branding.darkFooter
//                 ? "text-gray-500"
//                 : "text-gray-400"
//             }`}
//           >
//             Powered by Institute SaaS
//           </p>

//         </div>

//       </footer>

//     </div>
//   );
// }


// /* =========================================================
//    HERO
// ========================================================= */

// function Hero({
//   content,
//   branding,
//   instituteName,
// }) {
//   return (
//     <section
//       id="hero"
//       className="px-6 py-16"
//       style={{
//         backgroundColor:
//           branding.secondaryColor,
//       }}
//     >

//       <div className="grid items-center gap-10 md:grid-cols-2">

//         <div>

//           <p
//             className="text-xs font-semibold uppercase tracking-[0.2em]"
//             style={{
//               color:
//                 branding.accentColor,
//             }}
//           >
//             {content.subtitle ||
//               "Learn • Grow • Succeed"}
//           </p>

//           <h1
//             className="mt-4 text-3xl font-bold leading-tight text-white md:text-5xl"
//             style={{
//               fontFamily:
//                 branding.fontHeading,
//             }}
//           >
//             {content.title ||
//               `Welcome to ${instituteName}`}
//           </h1>

//           <p className="mt-5 max-w-xl text-sm leading-7 text-white/60">
//             {content.description ||
//               "Professional education and training designed to help students build practical skills."}
//           </p>

//           <a
//             href={
//               content.buttonUrl ||
//               "#courses"
//             }
//             className="mt-7 inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white"
//             style={{
//               backgroundColor:
//                 branding.accentColor,
//               borderRadius:
//                 branding.roundedButtons
//                   ? "999px"
//                   : "5px",
//             }}
//           >
//             {content.buttonText ||
//               "Explore Courses"}

//             <ArrowRight
//               size={16}
//             />

//           </a>

//         </div>


//         <PreviewImage
//           src={
//             content.imageUrl
//           }
//           alt="Hero"
//         />

//       </div>

//     </section>
//   );
// }


// /* =========================================================
//    ABOUT
// ========================================================= */

// function About({
//   content,
//   branding,
// }) {
//   return (
//     <section
//       id="about"
//       className="px-6 py-16"
//     >

//       <div className="grid items-center gap-10 md:grid-cols-2">

//         <PreviewImage
//           src={
//             content.imageUrl
//           }
//           alt="About"
//         />

//         <div>

//           <SectionEyebrow
//             text="About Us"
//             branding={
//               branding
//             }
//           />

//           <h2
//             className="mt-2 text-2xl font-bold text-gray-900"
//             style={{
//               fontFamily:
//                 branding.fontHeading,
//             }}
//           >
//             {content.title ||
//               "About Our Institute"}
//           </h2>

//           <p className="mt-4 text-sm leading-7 text-gray-500">
//             {content.description ||
//               "Our institute provides professional education and practical training for students."}
//           </p>

//           {content.mission && (
//             <div className="mt-5">

//               <p className="text-sm font-semibold text-gray-900">
//                 Our Mission
//               </p>

//               <p className="mt-1 text-xs leading-6 text-gray-500">
//                 {content.mission}
//               </p>

//             </div>
//           )}

//         </div>

//       </div>

//     </section>
//   );
// }


// /* =========================================================
//    COURSES
// ========================================================= */

// function Courses({
//   website,
//   branding,
// }) {
//   const courses =
//     website.courses ||
//     website.categories ||
//     [];

//   return (
//     <section
//       id="courses"
//       className="bg-gray-50 px-6 py-16"
//     >

//       <SectionHeading
//         title="Our Courses"
//         description="Explore our available courses."
//         branding={
//           branding
//         }
//       />

//       <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

//         {courses.length > 0 ? (
//           courses.map(
//             (
//               course,
//               index
//             ) => (
//               <div
//                 key={
//                   course.id ||
//                   index
//                 }
//                 className="rounded-2xl border border-gray-200 bg-white p-5"
//               >

//                 <div
//                   className="flex h-10 w-10 items-center justify-center"
//                   style={{
//                     backgroundColor:
//                       `${branding.primaryColor}15`,
//                     color:
//                       branding.primaryColor,
//                     borderRadius:
//                       branding.roundedButtons
//                         ? "10px"
//                         : "4px",
//                   }}
//                 >

//                   <BookOpen
//                     size={19}
//                   />

//                 </div>

//                 <h3 className="mt-4 text-sm font-bold text-gray-900">
//                   {course.name ||
//                     course.title ||
//                     course.category_name ||
//                     "Course"}
//                 </h3>

//                 <p className="mt-2 text-xs leading-6 text-gray-500">
//                   {course.description ||
//                     "Professional training program."}
//                 </p>

//               </div>
//             )
//           )
//         ) : (
//           <EmptyState
//             text="Courses will appear here."
//             icon={BookOpen}
//           />
//         )}

//       </div>

//     </section>
//   );
// }


// /* =========================================================
//    TRAINERS
// ========================================================= */

// function Trainers({
//   website,
//   branding,
// }) {
//   const trainers =
//     website.trainers ||
//     [];

//   return (
//     <section
//       id="trainers"
//       className="px-6 py-16"
//     >

//       <SectionHeading
//         title="Our Trainers"
//         description="Meet our experienced trainers."
//         branding={
//           branding
//         }
//       />

//       <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

//         {trainers.length > 0 ? (
//           trainers.map(
//             (
//               trainer,
//               index
//             ) => {

//               const name =
//                 trainer.full_name ||
//                 trainer.name ||
//                 "Trainer";

//               const image =
//                 trainer.profile_image ||
//                 trainer.image_url ||
//                 trainer.photo ||
//                 null;

//               return (
//                 <div
//                   key={
//                     trainer.id ||
//                     index
//                   }
//                   className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
//                 >

//                   <div className="flex h-40 items-center justify-center bg-gray-100">

//                     {image ? (
//                       <img
//                         src={image}
//                         alt={name}
//                         className="h-full w-full object-cover"
//                       />
//                     ) : (
//                       <UserRound
//                         size={40}
//                         className="text-gray-300"
//                       />
//                     )}

//                   </div>

//                   <div className="p-4">

//                     <h3 className="text-sm font-bold text-gray-900">
//                       {name}
//                     </h3>

//                     <p className="mt-1 text-xs text-gray-500">
//                       {trainer.designation ||
//                         trainer.specialization ||
//                         "Professional Trainer"}
//                     </p>

//                   </div>

//                 </div>
//               );
//             }
//           )
//         ) : (
//           <EmptyState
//             text="Trainers will appear here."
//             icon={Users}
//           />
//         )}

//       </div>

//     </section>
//   );
// }


// /* =========================================================
//    BATCHES
// ========================================================= */

// function Batches({
//   website,
//   branding,
// }) {
//   const batches =
//     website.batches ||
//     [];

//   return (
//     <section
//       id="batches"
//       className="bg-gray-50 px-6 py-16"
//     >

//       <SectionHeading
//         title="Upcoming Batches"
//         description="View available batches and schedules."
//         branding={
//           branding
//         }
//       />

//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

//         {batches.length > 0 ? (
//           batches.map(
//             (
//               batch,
//               index
//             ) => (
//               <div
//                 key={
//                   batch.id ||
//                   index
//                 }
//                 className="rounded-2xl border border-gray-200 bg-white p-5"
//               >

//                 <CalendarDays
//                   size={21}
//                   style={{
//                     color:
//                       branding.primaryColor,
//                   }}
//                 />

//                 <h3 className="mt-4 text-sm font-bold text-gray-900">
//                   {batch.batch_name ||
//                     batch.name ||
//                     "Batch"}
//                 </h3>

//                 <p className="mt-2 text-xs text-gray-500">
//                   {batch.start_date ||
//                     "-"}
//                   {" - "}
//                   {batch.end_date ||
//                     "-"}
//                 </p>

//                 {batch.learning_mode && (
//                   <p className="mt-2 text-xs text-gray-500">
//                     Mode:{" "}
//                     {batch.learning_mode}
//                   </p>
//                 )}

//               </div>
//             )
//           )
//         ) : (
//           <EmptyState
//             text="Active batches will appear here."
//             icon={CalendarDays}
//           />
//         )}

//       </div>

//     </section>
//   );
// }


// /* =========================================================
//    GALLERY
// ========================================================= */

// function Gallery({
//   content,
//   branding,
// }) {
//   const images =
//     Array.isArray(
//       content.images
//     )
//       ? content.images
//       : [];

//   return (
//     <section
//       id="gallery"
//       className="px-6 py-16"
//     >

//       <SectionHeading
//         title={
//           content.title ||
//           "Gallery"
//         }
//         description={
//           content.description ||
//           "Explore our institute."
//         }
//         branding={
//           branding
//         }
//       />

//       {images.length > 0 ? (
//         <div className="grid grid-cols-2 gap-3 md:grid-cols-4">

//           {images.map(
//             (
//               image,
//               index
//             ) => {

//               const url =
//                 typeof image ===
//                 "string"
//                   ? image
//                   : image?.url;

//               return (
//                 <img
//                   key={index}
//                   src={url}
//                   alt={`Gallery ${index + 1}`}
//                   className="h-40 w-full rounded-xl object-cover"
//                 />
//               );
//             }
//           )}

//         </div>
//       ) : (
//         <EmptyState
//           text="Gallery images will appear here."
//           icon={ImageIcon}
//         />
//       )}

//     </section>
//   );
// }


// /* =========================================================
//    CONTACT
// ========================================================= */

// function Contact({
//   content,
//   institute,
//   branding,
// }) {
//   const phone =
//     content.phone ||
//     institute.phone ||
//     institute.phone_number ||
//     "";

//   const email =
//     content.email ||
//     institute.email ||
//     "";

//   const address =
//     content.address ||
//     institute.address ||
//     "";

//   return (
//     <section
//       id="contact"
//       className="bg-gray-50 px-6 py-16"
//     >

//       <SectionHeading
//         title={
//           content.title ||
//           "Contact Us"
//         }
//         description={
//           content.description ||
//           "Get in touch with our institute."
//         }
//         branding={
//           branding
//         }
//       />

//       <div className="grid gap-4 md:grid-cols-3">

//         <ContactCard
//           icon={Phone}
//           title="Phone"
//           value={
//             phone ||
//             "Phone number"
//           }
//           branding={
//             branding
//           }
//         />

//         <ContactCard
//           icon={Mail}
//           title="Email"
//           value={
//             email ||
//             "Email address"
//           }
//           branding={
//             branding
//           }
//         />

//         <ContactCard
//           icon={MapPin}
//           title="Address"
//           value={
//             address ||
//             "Institute address"
//           }
//           branding={
//             branding
//           }
//         />

//       </div>

//     </section>
//   );
// }


// /* =========================================================
//    STUDENT LOGIN
// ========================================================= */

// function StudentLogin({
//   branding,
// }) {
//   return (
//     <section
//       id="studentLogin"
//       className="px-6 py-16"
//       style={{
//         backgroundColor:
//           branding.secondaryColor,
//       }}
//     >

//       <div className="mx-auto max-w-md text-center">

//         <div
//           className="mx-auto flex h-12 w-12 items-center justify-center"
//           style={{
//             backgroundColor:
//               `${branding.accentColor}20`,
//             color:
//               branding.accentColor,
//             borderRadius:
//               branding.roundedButtons
//                 ? "12px"
//                 : "4px",
//           }}
//         >

//           <UserRound
//             size={22}
//           />

//         </div>

//         <h2 className="mt-4 text-2xl font-bold text-white">
//           Student Login
//         </h2>

//         <p className="mt-2 text-xs text-white/50">
//           Access your learning dashboard.
//         </p>

//         <button
//           type="button"
//           className="mt-6 w-full py-3 text-sm font-semibold text-white"
//           style={{
//             backgroundColor:
//               branding.primaryColor,
//             borderRadius:
//               branding.roundedButtons
//                 ? "999px"
//                 : "5px",
//           }}
//         >
//           Login

//         </button>

//       </div>

//     </section>
//   );
// }


// /* =========================================================
//    SECTION HEADING
// ========================================================= */

// function SectionHeading({
//   title,
//   description,
//   branding,
// }) {
//   return (
//     <div className="mx-auto mb-8 max-w-xl text-center">

//       <h2
//         className="text-2xl font-bold text-gray-900"
//         style={{
//           fontFamily:
//             branding.fontHeading,
//         }}
//       >
//         {title}
//       </h2>

//       <p className="mt-2 text-xs leading-6 text-gray-500">
//         {description}
//       </p>

//     </div>
//   );
// }


// /* =========================================================
//    SECTION EYEBROW
// ========================================================= */

// function SectionEyebrow({
//   text,
//   branding,
// }) {
//   return (
//     <p
//       className="text-xs font-bold uppercase tracking-widest"
//       style={{
//         color:
//           branding.primaryColor,
//       }}
//     >
//       {text}
//     </p>
//   );
// }


// /* =========================================================
//    CONTACT CARD
// ========================================================= */

// function ContactCard({
//   icon: Icon,
//   title,
//   value,
//   branding,
// }) {
//   return (
//     <div className="rounded-2xl border border-gray-200 bg-white p-5">

//       <div
//         className="flex h-10 w-10 items-center justify-center"
//         style={{
//           backgroundColor:
//             `${branding.primaryColor}15`,
//           color:
//             branding.primaryColor,
//           borderRadius:
//             branding.roundedButtons
//               ? "10px"
//               : "4px",
//         }}
//       >

//         <Icon size={18} />

//       </div>

//       <p className="mt-4 text-xs font-semibold text-gray-900">
//         {title}
//       </p>

//       <p className="mt-1 text-xs leading-5 text-gray-500">
//         {value}
//       </p>

//     </div>
//   );
// }


// /* =========================================================
//    PREVIEW IMAGE
// ========================================================= */

// function PreviewImage({
//   src,
//   alt,
// }) {
//   if (src) {
//     return (
//       <img
//         src={src}
//         alt={alt}
//         className="h-72 w-full rounded-2xl object-cover"
//       />
//     );
//   }

//   return (
//     <div className="flex h-72 items-center justify-center rounded-2xl bg-gray-100">

//       <ImageIcon
//         size={42}
//         className="text-gray-300"
//       />

//     </div>
//   );
// }


// /* =========================================================
//    EMPTY STATE
// ========================================================= */

// function EmptyState({
//   text,
//   icon: Icon,
// }) {
//   return (
//     <div className="rounded-2xl border border-dashed border-gray-200 py-10 text-center">

//       <Icon
//         size={35}
//         className="mx-auto text-gray-300"
//       />

//       <p className="mt-3 text-xs text-gray-400">
//         {text}
//       </p>

//     </div>
//   );
// }


// /* =========================================================
//    SECTION TYPE
// ========================================================= */

// function getSectionType(
//   section
// ) {
//   return (
//     section?.section_type ||
//     section?.type ||
//     section?.id
//   );
// }


// /* =========================================================
//    SECTION LABEL
// ========================================================= */

// function getSectionLabel(
//   section
// ) {
//   const type =
//     getSectionType(
//       section
//     );

//   const labels = {
//     hero: "Home",
//     about: "About",
//     courses: "Courses",
//     trainers: "Trainers",
//     batches: "Batches",
//     testimonials:
//       "Testimonials",
//     gallery: "Gallery",
//     contact: "Contact",
//     studentLogin:
//       "Student Login",
//   };

//   return (
//     labels[type] ||
//     "Section"
//   );
// }


// src/components/website/WebsitePreview.jsx

import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Image as ImageIcon,
  Mail,
  MapPin,
  Phone,
  UserRound,
  Users,
} from "lucide-react";


/* =========================================================
   DEFAULT BRANDING
========================================================= */

const DEFAULT_BRANDING = {
  primaryColor: "#0D9488",
  secondaryColor: "#134E4A",
  accentColor: "#F59E0B",
  navbarColor: "#FFFFFF",
  headingColor: "#111827",
  subheadingColor: "#374151",
  textColor: "#4B5563",
  iconColor: "#0D9488",
  buttonColor: "#0D9488",
  buttonTextColor: "#FFFFFF",
  fontHeading: "Inter",
  fontSubheading: "Inter",
  fontBody: "Inter",
  logoUrl: null,
  faviconUrl: null,
  customCSS: "",
  roundedButtons: true,
  darkFooter: true,
};


/* =========================================================
   COMPONENT
========================================================= */

export default function WebsitePreview({
  website,
}) {
  const data =
    website || {};

  const rawBranding = data.branding || {};

  const branding = {
    ...DEFAULT_BRANDING,
    ...rawBranding,
    primaryColor: rawBranding.primaryColor ?? rawBranding.primary_color ?? DEFAULT_BRANDING.primaryColor,
    secondaryColor: rawBranding.secondaryColor ?? rawBranding.secondary_color ?? DEFAULT_BRANDING.secondaryColor,
    accentColor: rawBranding.accentColor ?? rawBranding.accent_color ?? DEFAULT_BRANDING.accentColor,
    navbarColor: rawBranding.navbarColor ?? rawBranding.navbar_color ?? DEFAULT_BRANDING.navbarColor,
    headingColor: rawBranding.headingColor ?? rawBranding.heading_color ?? DEFAULT_BRANDING.headingColor,
    subheadingColor: rawBranding.subheadingColor ?? rawBranding.subheading_color ?? DEFAULT_BRANDING.subheadingColor,
    textColor: rawBranding.textColor ?? rawBranding.text_color ?? DEFAULT_BRANDING.textColor,
    iconColor: rawBranding.iconColor ?? rawBranding.icon_color ?? DEFAULT_BRANDING.iconColor,
    buttonColor: rawBranding.buttonColor ?? rawBranding.button_color ?? DEFAULT_BRANDING.buttonColor,
    buttonTextColor: rawBranding.buttonTextColor ?? rawBranding.button_text_color ?? DEFAULT_BRANDING.buttonTextColor,
    fontHeading: rawBranding.fontHeading ?? rawBranding.font_heading ?? DEFAULT_BRANDING.fontHeading,
    fontSubheading: rawBranding.fontSubheading ?? rawBranding.font_subheading ?? DEFAULT_BRANDING.fontSubheading,
    fontBody: rawBranding.fontBody ?? rawBranding.font_body ?? DEFAULT_BRANDING.fontBody,
    logoUrl: rawBranding.logoUrl ?? rawBranding.logo_url ?? DEFAULT_BRANDING.logoUrl,
    faviconUrl: rawBranding.faviconUrl ?? rawBranding.favicon_url ?? DEFAULT_BRANDING.faviconUrl,
    customCSS: rawBranding.customCSS ?? rawBranding.custom_css ?? DEFAULT_BRANDING.customCSS,
    roundedButtons: rawBranding.roundedButtons ?? rawBranding.rounded_buttons ?? DEFAULT_BRANDING.roundedButtons,
    darkFooter: rawBranding.darkFooter ?? rawBranding.dark_footer ?? DEFAULT_BRANDING.darkFooter,
  };


  const institute =
    data.institute ||
    data.instituteData ||
    {};


  const instituteName =
    institute.name ||
    institute.institute_name ||
    data.institute_name ||
    "Your Institute";


  const sections =
    Array.isArray(
      data.sections
    )
      ? [...data.sections]
          .sort(
            (a, b) =>
              Number(
                a.order ??
                  a.section_order ??
                  0
              ) -
              Number(
                b.order ??
                  b.section_order ??
                  0
              )
          )
          .filter(
            (section) =>
              section.visible ===
                true ||
              section.visible ===
                1 ||
              section.is_enabled ===
                true ||
              section.is_enabled ===
                1
          )
      : [];


  const logoUrl =
    branding.logoUrl ||
    institute.logo_url ||
    institute.logo ||
    null;


  const cssVariables = {
    "--website-primary": branding.primaryColor,
    "--website-secondary": branding.secondaryColor,
    "--website-accent": branding.accentColor,
    "--website-navbar": branding.navbarColor,
    "--website-heading": branding.headingColor,
    "--website-subheading": branding.subheadingColor,
    "--website-text": branding.textColor,
    "--website-icon": branding.iconColor,
    "--website-button": branding.buttonColor,
    "--website-button-text": branding.buttonTextColor,
    "--website-heading-font": branding.fontHeading,
    "--website-subheading-font": branding.fontSubheading,
    "--website-body-font": branding.fontBody,
  };


  return (
    <div
      className="overflow-hidden rounded-2xl bg-white text-gray-900 shadow-2xl"
      style={cssVariables}
    >

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <nav
        className="border-b border-gray-200"
        style={{
          backgroundColor: branding.navbarColor,
          color: branding.textColor,
        }}
      >

        <div className="flex min-h-[72px] items-center justify-between px-6">

          {/* LOGO */}

          <div className="flex items-center gap-3">

            {logoUrl ? (
              <img
                src={logoUrl}
                alt={instituteName}
                className="h-10 w-10 object-contain"
              />
            ) : (
              <div
                className="flex h-10 w-10 items-center justify-center font-bold text-white"
                style={{
                  backgroundColor:
                    branding.buttonColor,
                  color:
                    branding.buttonTextColor,
                  borderRadius:
                    branding.roundedButtons
                      ? "12px"
                      : "4px",
                }}
              >
                {instituteName
                  .charAt(0)
                  .toUpperCase()}
              </div>
            )}

            <div>

              <p
                className="text-sm font-bold"
                style={{
                  fontFamily: branding.fontHeading,
                  color: branding.headingColor,
                }}
              >
                {instituteName}
              </p>

              <p
                className="text-[10px]"
                style={{
                  color: branding.subheadingColor,
                  fontFamily: branding.fontSubheading,
                }}
              >
                Institute
              </p>

            </div>

          </div>


          {/* NAV LINKS */}

          <div className="hidden items-center gap-5 md:flex">

            {sections
              .filter(
                (section) =>
                  getSectionType(
                    section
                  ) !==
                  "studentLogin"
              )
              .slice(0, 5)
              .map(
                (section) => {

                  const type =
                    getSectionType(
                      section
                    );

                  return (
                    <a
                      key={
                        section.id
                      }
                      href={`#${type}`}
                      className="text-xs transition"
                      style={{
                        color: branding.textColor,
                        fontFamily: branding.fontBody,
                      }}
                    >
                      {getSectionLabel(
                        section
                      )}
                    </a>
                  );
                }
              )}

          </div>


          <a
            href="#contact"
            className="hidden px-4 py-2 text-xs font-semibold sm:block"
            style={{
              backgroundColor: branding.buttonColor,
              color: branding.buttonTextColor,
              borderRadius:
                branding.roundedButtons
                  ? "999px"
                  : "5px",
            }}
          >
            Contact
          </a>

        </div>

      </nav>


      {/* =====================================================
          SECTIONS
      ===================================================== */}

      {sections.map(
        (section) => {

          const type =
            getSectionType(
              section
            );

          const content =
            section.content ||
            {};

          switch (type) {

            case "hero":
              return (
                <Hero
                  key={
                    section.id
                  }
                  content={
                    content
                  }
                  branding={
                    branding
                  }
                  instituteName={
                    instituteName
                  }
                />
              );

            case "about":
              return (
                <About
                  key={
                    section.id
                  }
                  content={
                    content
                  }
                  branding={
                    branding
                  }
                />
              );

            case "courses":
              return (
                <Courses
                  key={
                    section.id
                  }
                  website={
                    data
                  }
                  branding={
                    branding
                  }
                />
              );

            case "trainers":
              return (
                <Trainers
                  key={
                    section.id
                  }
                  website={
                    data
                  }
                  branding={
                    branding
                  }
                />
              );

            case "batches":
              return (
                <Batches
                  key={
                    section.id
                  }
                  website={
                    data
                  }
                  branding={
                    branding
                  }
                />
              );

            case "gallery":
              return (
                <Gallery
                  key={
                    section.id
                  }
                  content={
                    content
                  }
                  branding={
                    branding
                  }
                />
              );

            case "contact":
              return (
                <Contact
                  key={
                    section.id
                  }
                  content={
                    content
                  }
                  institute={
                    institute
                  }
                  branding={
                    branding
                  }
                />
              );

            case "studentLogin":
              return (
                <StudentLogin
                  key={
                    section.id
                  }
                  branding={
                    branding
                  }
                />
              );

            default:
              return null;
          }
        }
      )}


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer
        className="px-6 py-8"
        style={{
          backgroundColor: branding.darkFooter ? "#111827" : "#f3f4f6",
          color: branding.textColor,
        }}
      >

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <p
            className="text-xs"
            style={{
              color: branding.darkFooter
                ? "rgba(255,255,255,0.65)"
                : branding.textColor,
              fontFamily: branding.fontBody,
            }}
          >
            ©{" "}
            {new Date().getFullYear()}{" "}
            {instituteName}
          </p>

          <p
            className="text-xs"
            style={{
              color: branding.darkFooter
                ? "rgba(255,255,255,0.65)"
                : branding.textColor,
              fontFamily: branding.fontBody,
            }}
          >
            Powered by Institute SaaS
          </p>

        </div>

      </footer>

      {branding.customCSS && (
        <style>{branding.customCSS}</style>
      )}

    </div>
  );
}


/* =========================================================
   HERO
========================================================= */

function Hero({
  content,
  branding,
  instituteName,
}) {
  return (
    <section
      id="hero"
      className="px-6 py-16"
      style={{
        backgroundColor:
          branding.secondaryColor,
      }}
    >

      <div className="grid items-center gap-10 md:grid-cols-2">

        <div>

          <p
            className="text-xs font-semibold uppercase tracking-[0.2em]"
            style={{
              color:
                branding.accentColor,
            }}
          >
            {content.subtitle ||
              "Learn • Grow • Succeed"}
          </p>

          <h1
            className="mt-4 text-3xl font-bold leading-tight md:text-5xl"
            style={{
              fontFamily: branding.fontHeading,
              color: branding.headingColor,
            }}
          >
            {content.title ||
              `Welcome to ${instituteName}`}
          </h1>

          <p
            className="mt-5 max-w-xl text-sm leading-7"
            style={{
              color: branding.textColor,
              fontFamily: branding.fontBody,
            }}
          >
            {content.description ||
              "Professional education and training designed to help students build practical skills."}
          </p>

          <a
            href={
              content.buttonUrl ||
              "#courses"
            }
            className="mt-7 inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold"
            style={{
              backgroundColor: branding.buttonColor,
              color: branding.buttonTextColor,
              borderRadius:
                branding.roundedButtons
                  ? "999px"
                  : "5px",
            }}
          >
            {content.buttonText ||
              "Explore Courses"}

            <ArrowRight
              size={16}
            />

          </a>

        </div>


        <PreviewImage
          src={
            content.imageUrl
          }
          alt="Hero"
        />

      </div>

    </section>
  );
}


/* =========================================================
   ABOUT
========================================================= */

function About({
  content,
  branding,
}) {
  return (
    <section
      id="about"
      className="px-6 py-16"
    >

      <div className="grid items-center gap-10 md:grid-cols-2">

        <PreviewImage
          src={
            content.imageUrl
          }
          alt="About"
        />

        <div>

          <SectionEyebrow
            text="About Us"
            branding={
              branding
            }
          />

          <h2
            className="mt-2 text-2xl font-bold"
            style={{
              fontFamily: branding.fontHeading,
              color: branding.headingColor,
            }}
          >
            {content.title ||
              "About Our Institute"}
          </h2>

          <p
            className="mt-4 text-sm leading-7"
            style={{
              color: branding.textColor,
              fontFamily: branding.fontBody,
            }}
          >
            {content.description ||
              "Our institute provides professional education and practical training for students."}
          </p>

          {content.mission && (
            <div className="mt-5">

              <p className="text-sm font-semibold text-gray-900">
                Our Mission
              </p>

              <p className="mt-1 text-xs leading-6 text-gray-500">
                {content.mission}
              </p>

            </div>
          )}

        </div>

      </div>

    </section>
  );
}


/* =========================================================
   COURSES
========================================================= */

function Courses({
  website,
  branding,
}) {
  const courses =
    website.courses ||
    website.categories ||
    [];

  return (
    <section
      id="courses"
      className="bg-gray-50 px-6 py-16"
    >

      <SectionHeading
        title="Our Courses"
        description="Explore our available courses."
        branding={
          branding
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

        {courses.length > 0 ? (
          courses.map(
            (
              course,
              index
            ) => (
              <div
                key={
                  course.id ||
                  index
                }
                className="rounded-2xl border border-gray-200 bg-white p-5"
              >

                <div
                  className="flex h-10 w-10 items-center justify-center"
                  style={{
                    backgroundColor:
                      `${branding.primaryColor}15`,
                    color:
                      branding.iconColor,
                    borderRadius:
                      branding.roundedButtons
                        ? "10px"
                        : "4px",
                  }}
                >

                  <BookOpen
                    size={19}
                  />

                </div>

                <h3
                  className="mt-4 text-sm font-bold"
                  style={{
                    color: branding.headingColor,
                    fontFamily: branding.fontHeading,
                  }}
                >
                  {course.name ||
                    course.title ||
                    course.category_name ||
                    "Course"}
                </h3>

                <p
        className="mt-2 text-xs leading-6"
        style={{
          color: branding.subheadingColor,
          fontFamily: branding.fontSubheading,
        }}
      >
                  {course.description ||
                    "Professional training program."}
                </p>

              </div>
            )
          )
        ) : (
          <EmptyState
            text="Courses will appear here."
            icon={BookOpen}
          />
        )}

      </div>

    </section>
  );
}


/* =========================================================
   TRAINERS
========================================================= */

function Trainers({
  website,
  branding,
}) {
  const trainers =
    website.trainers ||
    [];

  return (
    <section
      id="trainers"
      className="px-6 py-16"
    >

      <SectionHeading
        title="Our Trainers"
        description="Meet our experienced trainers."
        branding={
          branding
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        {trainers.length > 0 ? (
          trainers.map(
            (
              trainer,
              index
            ) => {

              const name =
                trainer.full_name ||
                trainer.name ||
                "Trainer";

              const image =
                trainer.profile_image ||
                trainer.image_url ||
                trainer.photo ||
                null;

              return (
                <div
                  key={
                    trainer.id ||
                    index
                  }
                  className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
                >

                  <div className="flex h-40 items-center justify-center bg-gray-100">

                    {image ? (
                      <img
                        src={image}
                        alt={name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <UserRound
                        size={40}
                        className="text-gray-300"
                      />
                    )}

                  </div>

                  <div className="p-4">

                    <h3
                      className="text-sm font-bold"
                      style={{
                        color: branding.headingColor,
                        fontFamily: branding.fontHeading,
                      }}
                    >
                      {name}
                    </h3>

                    <p
                      className="mt-1 text-xs"
                      style={{
                        color: branding.subheadingColor,
                        fontFamily: branding.fontBody,
                      }}
                    >
                      {trainer.designation ||
                        trainer.specialization ||
                        "Professional Trainer"}
                    </p>

                  </div>

                </div>
              );
            }
          )
        ) : (
          <EmptyState
            text="Trainers will appear here."
            icon={Users}
          />
        )}

      </div>

    </section>
  );
}


/* =========================================================
   BATCHES
========================================================= */

function Batches({
  website,
  branding,
}) {
  const batches =
    website.batches ||
    [];

  return (
    <section
      id="batches"
      className="bg-gray-50 px-6 py-16"
    >

      <SectionHeading
        title="Upcoming Batches"
        description="View available batches and schedules."
        branding={
          branding
        }
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

        {batches.length > 0 ? (
          batches.map(
            (
              batch,
              index
            ) => (
              <div
                key={
                  batch.id ||
                  index
                }
                className="rounded-2xl border border-gray-200 bg-white p-5"
              >

                <CalendarDays
                  size={21}
                  style={{
                    color:
                      branding.iconColor,
                  }}
                />

                <h3
                  className="mt-4 text-sm font-bold"
                  style={{
                    color: branding.headingColor,
                    fontFamily: branding.fontHeading,
                  }}
                >
                  {batch.batch_name ||
                    batch.name ||
                    "Batch"}
                </h3>

                <p
                  className="mt-2 text-xs"
                  style={{
                    color: branding.textColor,
                    fontFamily: branding.fontBody,
                  }}
                >
                  {batch.start_date ||
                    "-"}
                  {" - "}
                  {batch.end_date ||
                    "-"}
                </p>

                {batch.learning_mode && (
                  <p
                  className="mt-2 text-xs"
                  style={{
                    color: branding.textColor,
                    fontFamily: branding.fontBody,
                  }}
                >
                    Mode:{" "}
                    {batch.learning_mode}
                  </p>
                )}

              </div>
            )
          )
        ) : (
          <EmptyState
            text="Active batches will appear here."
            icon={CalendarDays}
          />
        )}

      </div>

    </section>
  );
}


/* =========================================================
   GALLERY
========================================================= */

function Gallery({
  content,
  branding,
}) {
  const images =
    Array.isArray(
      content.images
    )
      ? content.images
      : [];

  return (
    <section
      id="gallery"
      className="px-6 py-16"
    >

      <SectionHeading
        title={
          content.title ||
          "Gallery"
        }
        description={
          content.description ||
          "Explore our institute."
        }
        branding={
          branding
        }
      />

      {images.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">

          {images.map(
            (
              image,
              index
            ) => {

              const url =
                typeof image ===
                "string"
                  ? image
                  : image?.url;

              return (
                <img
                  key={index}
                  src={url}
                  alt={`Gallery ${index + 1}`}
                  className="h-40 w-full rounded-xl object-cover"
                />
              );
            }
          )}

        </div>
      ) : (
        <EmptyState
          text="Gallery images will appear here."
          icon={ImageIcon}
        />
      )}

    </section>
  );
}


/* =========================================================
   CONTACT
========================================================= */

function Contact({
  content,
  institute,
  branding,
}) {
  const phone =
    content.phone ||
    institute.phone ||
    institute.phone_number ||
    "";

  const email =
    content.email ||
    institute.email ||
    "";

  const address =
    content.address ||
    institute.address ||
    "";

  return (
    <section
      id="contact"
      className="bg-gray-50 px-6 py-16"
    >

      <SectionHeading
        title={
          content.title ||
          "Contact Us"
        }
        description={
          content.description ||
          "Get in touch with our institute."
        }
        branding={
          branding
        }
      />

      <div className="grid gap-4 md:grid-cols-3">

        <ContactCard
          icon={Phone}
          title="Phone"
          value={
            phone ||
            "Phone number"
          }
          branding={
            branding
          }
        />

        <ContactCard
          icon={Mail}
          title="Email"
          value={
            email ||
            "Email address"
          }
          branding={
            branding
          }
        />

        <ContactCard
          icon={MapPin}
          title="Address"
          value={
            address ||
            "Institute address"
          }
          branding={
            branding
          }
        />

      </div>

    </section>
  );
}


/* =========================================================
   STUDENT LOGIN
========================================================= */

function StudentLogin({
  branding,
}) {
  return (
    <section
      id="studentLogin"
      className="px-6 py-16"
      style={{
        backgroundColor:
          branding.secondaryColor,
      }}
    >

      <div className="mx-auto max-w-md text-center">

        <div
          className="mx-auto flex h-12 w-12 items-center justify-center"
          style={{
            backgroundColor:
              `${branding.accentColor}20`,
            color:
              branding.accentColor,
            borderRadius:
              branding.roundedButtons
                ? "12px"
                : "4px",
          }}
        >

          <UserRound
            size={22}
          />

        </div>

        <h2
          className="mt-4 text-2xl font-bold"
          style={{
            color: branding.headingColor,
            fontFamily: branding.fontHeading,
          }}
        >
          Student Login
        </h2>

        <p
          className="mt-2 text-xs"
          style={{
            color: branding.subheadingColor,
            fontFamily: branding.fontSubheading,
          }}
        >
          Access your learning dashboard.
        </p>

        <button
          type="button"
          className="mt-6 w-full py-3 text-sm font-semibold"
          style={{
            backgroundColor: branding.buttonColor,
            color: branding.buttonTextColor,
            borderRadius:
              branding.roundedButtons
                ? "999px"
                : "5px",
          }}
        >
          Login

        </button>

      </div>

    </section>
  );
}


/* =========================================================
   SECTION HEADING
========================================================= */

function SectionHeading({
  title,
  description,
  branding,
}) {
  return (
    <div className="mx-auto mb-8 max-w-xl text-center">

      <h2
        className="text-2xl font-bold"
        style={{
          fontFamily: branding.fontHeading,
          color: branding.headingColor,
        }}
      >
        {title}
      </h2>

      <p
        className="mt-2 text-xs leading-6"
        style={{
          color: branding.subheadingColor,
          fontFamily: branding.fontSubheading,
        }}
      >
        {description}
      </p>

    </div>
  );
}


/* =========================================================
   SECTION EYEBROW
========================================================= */

function SectionEyebrow({
  text,
  branding,
}) {
  return (
    <p
      className="text-xs font-bold uppercase tracking-widest"
      style={{
        color:
          branding.iconColor,
      }}
    >
      {text}
    </p>
  );
}


/* =========================================================
   CONTACT CARD
========================================================= */

function ContactCard({
  icon: Icon,
  title,
  value,
  branding,
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">

      <div
        className="flex h-10 w-10 items-center justify-center"
        style={{
          backgroundColor:
            `${branding.primaryColor}15`,
          color:
            branding.primaryColor,
          borderRadius:
            branding.roundedButtons
              ? "10px"
              : "4px",
        }}
      >

        <Icon size={18} />

      </div>

      <p
        className="mt-4 text-xs font-semibold"
        style={{
          color: branding.headingColor,
          fontFamily: branding.fontSubheading,
        }}
      >
        {title}
      </p>

      <p
        className="mt-1 text-xs leading-5"
        style={{
          color: branding.textColor,
          fontFamily: branding.fontBody,
        }}
      >
        {value}
      </p>

    </div>
  );
}


/* =========================================================
   PREVIEW IMAGE
========================================================= */

function PreviewImage({
  src,
  alt,
}) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className="h-72 w-full rounded-2xl object-cover"
      />
    );
  }

  return (
    <div className="flex h-72 items-center justify-center rounded-2xl bg-gray-100">

      <ImageIcon
        size={42}
        className="text-gray-300"
      />

    </div>
  );
}


/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyState({
  text,
  icon: Icon,
}) {
  return (
    <div className="rounded-2xl border border-dashed border-gray-200 py-10 text-center">

      <Icon
        size={35}
        className="mx-auto text-gray-300"
      />

      <p className="mt-3 text-xs text-gray-400">
        {text}
      </p>

    </div>
  );
}


/* =========================================================
   SECTION TYPE
========================================================= */

function getSectionType(
  section
) {
  return (
    section?.section_type ||
    section?.type ||
    section?.id
  );
}


/* =========================================================
   SECTION LABEL
========================================================= */

function getSectionLabel(
  section
) {
  const type =
    getSectionType(
      section
    );

  const labels = {
    hero: "Home",
    about: "About",
    courses: "Courses",
    trainers: "Trainers",
    batches: "Batches",
    testimonials:
      "Testimonials",
    gallery: "Gallery",
    contact: "Contact",
    studentLogin:
      "Student Login",
  };

  return (
    labels[type] ||
    "Section"
  );
}