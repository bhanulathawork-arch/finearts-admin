
// import { useEffect, useMemo, useState } from "react";
// import { useOutletContext } from "react-router-dom";
// import {
//   Star,
//   Users,
//   BookOpen,
//   Heart,
//   Play,
//   ChevronLeft,
//   ChevronRight,
//   Quote,
// } from "lucide-react";

// import {
//   getInstituteTestimonials,
// } from "../../services/testimonialService";


// /* =========================================================
//    DEFAULT BRANDING
// ========================================================= */

// const DEFAULT_BRANDING = {
//   navbarColor: "#1F2937",
//   headingColor: "#111827",
//   subheadingColor: "#5B21B6",
//   textColor: "#111827",
//   iconColor: "#F59E0B",
//   buttonColor: "#7C3AED",
//   buttonTextColor: "#FFFFFF",

//   pageBackgroundColor: "#FAFAF9",
//   cardBackgroundColor: "#FFFFFF",

//   footerBackgroundColor: "#1F2937",
//   footerHeadingColor: "#FFFFFF",
//   footerTextColor: "#FAFAF9",

//   fontHeading: "Inter",
//   fontSubheading: "Inter",
//   fontBody: "Inter",

//   headingWeight: 700,
//   headingLineHeight: 1.15,
//   headingLetterSpacing: 0,

//   subheadingWeight: 600,
//   subheadingLineHeight: 1.4,

//   bodyWeight: 400,
//   bodyLineHeight: 1.6,
//   bodyLetterSpacing: 0,

//   roundedButtons: true,
// };


// /* =========================================================
//    BRANDING HELPERS
// ========================================================= */

// const getBrandingValue = (
//   branding,
//   camelKey,
//   snakeKey,
//   fallback
// ) => {
//   const value =
//     branding?.[camelKey] ??
//     branding?.[snakeKey];

//   return value !== undefined &&
//     value !== null &&
//     value !== ""
//     ? value
//     : fallback;
// };


// const normalizeBranding = (
//   branding = {}
// ) => ({
//   navbarColor: getBrandingValue(
//     branding,
//     "navbarColor",
//     "navbar_color",
//     DEFAULT_BRANDING.navbarColor
//   ),

//   headingColor: getBrandingValue(
//     branding,
//     "headingColor",
//     "heading_color",
//     DEFAULT_BRANDING.headingColor
//   ),

//   subheadingColor: getBrandingValue(
//     branding,
//     "subheadingColor",
//     "subheading_color",
//     DEFAULT_BRANDING.subheadingColor
//   ),

//   textColor: getBrandingValue(
//     branding,
//     "textColor",
//     "text_color",
//     DEFAULT_BRANDING.textColor
//   ),

//   iconColor: getBrandingValue(
//     branding,
//     "iconColor",
//     "icon_color",
//     DEFAULT_BRANDING.iconColor
//   ),

//   buttonColor: getBrandingValue(
//     branding,
//     "buttonColor",
//     "button_color",
//     DEFAULT_BRANDING.buttonColor
//   ),

//   buttonTextColor: getBrandingValue(
//     branding,
//     "buttonTextColor",
//     "button_text_color",
//     DEFAULT_BRANDING.buttonTextColor
//   ),

//   pageBackgroundColor: getBrandingValue(
//     branding,
//     "pageBackgroundColor",
//     "page_background_color",
//     DEFAULT_BRANDING.pageBackgroundColor
//   ),

//   cardBackgroundColor: getBrandingValue(
//     branding,
//     "cardBackgroundColor",
//     "card_background_color",
//     DEFAULT_BRANDING.cardBackgroundColor
//   ),

//   footerBackgroundColor:
//     getBrandingValue(
//       branding,
//       "footerBackgroundColor",
//       "footer_background_color",
//       DEFAULT_BRANDING.footerBackgroundColor
//     ),

//   footerHeadingColor:
//     getBrandingValue(
//       branding,
//       "footerHeadingColor",
//       "footer_heading_color",
//       DEFAULT_BRANDING.footerHeadingColor
//     ),

//   footerTextColor:
//     getBrandingValue(
//       branding,
//       "footerTextColor",
//       "footer_text_color",
//       DEFAULT_BRANDING.footerTextColor
//     ),

//   fontHeading: getBrandingValue(
//     branding,
//     "fontHeading",
//     "font_heading",
//     DEFAULT_BRANDING.fontHeading
//   ),

//   fontSubheading:
//     getBrandingValue(
//       branding,
//       "fontSubheading",
//       "font_subheading",
//       DEFAULT_BRANDING.fontSubheading
//     ),

//   fontBody: getBrandingValue(
//     branding,
//     "fontBody",
//     "font_body",
//     DEFAULT_BRANDING.fontBody
//   ),

//   headingWeight:
//     getBrandingValue(
//       branding,
//       "headingWeight",
//       "heading_weight",
//       DEFAULT_BRANDING.headingWeight
//     ),

//   headingLineHeight:
//     getBrandingValue(
//       branding,
//       "headingLineHeight",
//       "heading_line_height",
//       DEFAULT_BRANDING.headingLineHeight
//     ),

//   headingLetterSpacing:
//     getBrandingValue(
//       branding,
//       "headingLetterSpacing",
//       "heading_letter_spacing",
//       DEFAULT_BRANDING.headingLetterSpacing
//     ),

//   subheadingWeight:
//     getBrandingValue(
//       branding,
//       "subheadingWeight",
//       "subheading_weight",
//       DEFAULT_BRANDING.subheadingWeight
//     ),

//   subheadingLineHeight:
//     getBrandingValue(
//       branding,
//       "subheadingLineHeight",
//       "subheading_line_height",
//       DEFAULT_BRANDING.subheadingLineHeight
//     ),

//   bodyWeight:
//     getBrandingValue(
//       branding,
//       "bodyWeight",
//       "body_weight",
//       DEFAULT_BRANDING.bodyWeight
//     ),

//   bodyLineHeight:
//     getBrandingValue(
//       branding,
//       "bodyLineHeight",
//       "body_line_height",
//       DEFAULT_BRANDING.bodyLineHeight
//     ),

//   bodyLetterSpacing:
//     getBrandingValue(
//       branding,
//       "bodyLetterSpacing",
//       "body_letter_spacing",
//       DEFAULT_BRANDING.bodyLetterSpacing
//     ),

//   roundedButtons:
//     getBrandingValue(
//       branding,
//       "roundedButtons",
//       "rounded_buttons",
//       DEFAULT_BRANDING.roundedButtons
//     ),
// });


// const fontFamily = (font) =>
//   font
//     ? `'${font}', sans-serif`
//     : "Inter, sans-serif";


// const buttonRadius = (
//   branding
// ) =>
//   branding.roundedButtons
//     ? "9999px"
//     : "10px";


// const hexToRgba = (
//   color,
//   alpha
// ) => {
//   if (
//     typeof color !== "string"
//   ) {
//     return color;
//   }

//   const hex =
//     color.replace("#", "");

//   if (
//     !/^[0-9A-Fa-f]{6}$/.test(hex)
//   ) {
//     return color;
//   }

//   const r = parseInt(
//     hex.substring(0, 2),
//     16
//   );

//   const g = parseInt(
//     hex.substring(2, 4),
//     16
//   );

//   const b = parseInt(
//     hex.substring(4, 6),
//     16
//   );

//   return `rgba(${r}, ${g}, ${b}, ${alpha})`;
// };


// /* =========================================================
//    MAIN COMPONENT
// ========================================================= */

// export default function WebsiteTestimonials() {

//   const {
//     branding: outletBranding = {},
//     institute = {},
//     website = {},
//   } = useOutletContext() || {};


//   /* =======================================================
//      BRANDING
//   ======================================================= */

//   const branding = useMemo(
//     () =>
//       normalizeBranding(
//         outletBranding
//       ),
//     [outletBranding]
//   );


//   /* =======================================================
//      STATE
//   ======================================================= */

//   const [
//     testimonials,
//     setTestimonials,
//   ] = useState([]);

//   const [
//     loading,
//     setLoading,
//   ] = useState(true);

//   const [
//     error,
//     setError,
//   ] = useState("");

//   const [
//     videoStart,
//     setVideoStart,
//   ] = useState(0);


//   /* =======================================================
//      INSTITUTE NAME
//   ======================================================= */

//   const instituteName =
//     institute?.name ||
//     website?.institute?.name ||
//     website?.name ||
//     "EduVibe";


//   /* =======================================================
//      FETCH TESTIMONIALS
//   ======================================================= */

//   useEffect(() => {

//     let mounted = true;


//     const fetchTestimonials =
//       async () => {

//         try {

//           setLoading(true);
//           setError("");


//           const result =
//             await getInstituteTestimonials();


//           if (!mounted) {
//             return;
//           }


//           setTestimonials(
//             Array.isArray(result)
//               ? result
//               : []
//           );

//         } catch (err) {

//           console.error(
//             "Website Testimonials Fetch Error:",
//             err
//           );


//           if (!mounted) {
//             return;
//           }


//           setTestimonials([]);


//           setError(
//             err?.response?.data
//               ?.message ||
//               err?.message ||
//               "Failed to load testimonials."
//           );

//         } finally {

//           if (mounted) {
//             setLoading(false);
//           }

//         }
//       };


//     fetchTestimonials();


//     return () => {
//       mounted = false;
//     };

//   }, []);


//   /* =======================================================
//      HELPERS
//   ======================================================= */

//   const getStudentName = (
//     testimonial
//   ) =>
//     testimonial?.student_name ||
//     testimonial?.studentName ||
//     testimonial?.name ||
//     "Student";


//   const getStudentRole = (
//     testimonial
//   ) =>
//     testimonial?.role ||
//     testimonial?.student_role ||
//     testimonial?.designation ||
//     "Student";


//   const getTestimonialText = (
//     testimonial
//   ) =>
//     testimonial?.testimonial_text ||
//     testimonial?.testimonialText ||
//     testimonial?.review ||
//     testimonial?.comment ||
//     testimonial?.message ||
//     "";


//   const getAvatar = (
//     testimonial
//   ) =>
//     testimonial?.avatar ||
//     testimonial?.student_image ||
//     testimonial?.profile_image ||
//     testimonial?.profileImage ||
//     testimonial?.image ||
//     null;


//   const getVideoUrl = (
//     testimonial
//   ) =>
//     testimonial?.video_url ||
//     testimonial?.videoUrl ||
//     testimonial?.video ||
//     null;


//   const getVideoThumbnail = (
//     testimonial
//   ) =>
//     testimonial?.video_thumbnail ||
//     testimonial?.videoThumbnail ||
//     testimonial?.thumbnail ||
//     testimonial?.thumbnail_url ||
//     getAvatar(testimonial);


//   const getRating = (
//     testimonial
//   ) => {

//     const rating =
//       Number(
//         testimonial?.rating || 0
//       );


//     if (
//       Number.isNaN(rating)
//     ) {
//       return 0;
//     }


//     return Math.min(
//       5,
//       Math.max(
//         0,
//         rating
//       )
//     );
//   };


//   /* =======================================================
//      STATISTICS
//   ======================================================= */

//   const statistics = useMemo(
//     () => {

//       if (!testimonials.length) {

//         return {
//           averageRating: "0.0",
//           happyLearners: "0",
//           courses: "0",
//           recommend: "0%",
//         };

//       }


//       const validRatings =
//         testimonials
//           .map(
//             (item) =>
//               getRating(item)
//           )
//           .filter(
//             (rating) =>
//               rating > 0
//           );


//       const averageRating =
//         validRatings.length
//           ? validRatings.reduce(
//               (
//                 sum,
//                 rating
//               ) =>
//                 sum + rating,
//               0
//             ) /
//             validRatings.length
//           : 0;


//       const totalStudents =
//         testimonials.reduce(
//           (
//             total,
//             item
//           ) =>
//             total +
//             Number(
//               item?.student_count ||
//                 item?.students ||
//                 0
//             ),
//           0
//         );


//       const totalCourses =
//         testimonials.reduce(
//           (
//             total,
//             item
//           ) =>
//             total +
//             Number(
//               item?.course_count ||
//                 item?.courses ||
//                 0
//             ),
//           0
//         );


//       return {
//         averageRating:
//           averageRating.toFixed(1),

//         happyLearners:
//           totalStudents > 0
//             ? formatNumber(
//                 totalStudents
//               )
//             : formatNumber(
//                 testimonials.length *
//                   100
//               ),

//         courses:
//           totalCourses > 0
//             ? formatNumber(
//                 totalCourses
//               )
//             : "100+",

//         recommend: "95%",
//       };

//     },
//     [testimonials]
//   );


//   /* =======================================================
//      VIDEO TESTIMONIALS
//   ======================================================= */

//   const videoTestimonials =
//     useMemo(
//       () =>
//         testimonials.filter(
//           (testimonial) =>
//             getVideoUrl(
//               testimonial
//             )
//         ),
//       [testimonials]
//     );


//   const visibleVideos =
//     useMemo(() => {

//       if (
//         !videoTestimonials.length
//       ) {
//         return [];
//       }


//       const result = [];


//       for (
//         let i = 0;
//         i < 3 &&
//         i <
//           videoTestimonials.length;
//         i++
//       ) {

//         result.push(
//           videoTestimonials[
//             (videoStart + i) %
//               videoTestimonials.length
//           ]
//         );

//       }


//       return result;

//     }, [
//       videoTestimonials,
//       videoStart,
//     ]);


//   /* =======================================================
//      VIDEO SLIDER
//   ======================================================= */

//   const nextVideos = () => {

//     if (
//       videoTestimonials.length <=
//       3
//     ) {
//       return;
//     }


//     setVideoStart(
//       (current) =>
//         (current + 1) %
//         videoTestimonials.length
//     );

//   };


//   const previousVideos = () => {

//     if (
//       videoTestimonials.length <=
//       3
//     ) {
//       return;
//     }


//     setVideoStart(
//       (current) =>
//         current === 0
//           ? videoTestimonials.length -
//             1
//           : current - 1
//     );

//   };


//   /* =======================================================
//      SHARED STYLES
//   ======================================================= */

//   const headingStyle = {
//     color:
//       branding.headingColor,

//     fontFamily:
//       fontFamily(
//         branding.fontHeading
//       ),

//     fontWeight:
//       branding.headingWeight,

//     lineHeight:
//       branding.headingLineHeight,

//     letterSpacing:
//       branding.headingLetterSpacing,
//   };


//   const bodyStyle = {
//     color:
//       branding.textColor,

//     fontFamily:
//       fontFamily(
//         branding.fontBody
//       ),

//     fontWeight:
//       branding.bodyWeight,

//     lineHeight:
//       branding.bodyLineHeight,

//     letterSpacing:
//       branding.bodyLetterSpacing,
//   };


//   /* =======================================================
//      LOADING
//   ======================================================= */

//   if (loading) {

//     return (
//       <main
//         className="
//           min-h-screen
//           flex
//           items-center
//           justify-center
//         "
//         style={{
//           backgroundColor:
//             branding.pageBackgroundColor,

//           fontFamily:
//             fontFamily(
//               branding.fontBody
//             ),
//         }}
//       >

//         <div className="flex flex-col items-center">

//           <div
//             className="
//               h-10
//               w-10
//               animate-spin
//               rounded-full
//               border-4
//             "
//             style={{
//               borderColor:
//                 hexToRgba(
//                   branding.buttonColor,
//                   0.15
//                 ),

//               borderTopColor:
//                 branding.buttonColor,
//             }}
//           />

//           <p
//             className="mt-4 text-sm"
//             style={{
//               ...bodyStyle,
//               opacity: 0.6,
//             }}
//           >
//             Loading testimonials...
//           </p>

//         </div>

//       </main>
//     );
//   }


//   /* =======================================================
//      ERROR
//   ======================================================= */

//   if (error) {

//     return (
//       <main
//         className="
//           min-h-screen
//           flex
//           items-center
//           justify-center
//           px-5
//         "
//         style={{
//           backgroundColor:
//             branding.pageBackgroundColor,
//         }}
//       >

//         <div className="max-w-xl text-center">

//           <div
//             className="
//               mx-auto
//               flex
//               h-16
//               w-16
//               items-center
//               justify-center
//               rounded-full
//             "
//             style={{
//               backgroundColor:
//                 hexToRgba(
//                   branding.buttonColor,
//                   0.08
//                 ),

//               color:
//                 branding.buttonColor,
//             }}
//           >
//             <Heart size={28} />
//           </div>


//           <h1
//             className="
//               mt-5
//               text-3xl
//             "
//             style={headingStyle}
//           >
//             Student Testimonials
//           </h1>


//           <p
//             className="mt-3"
//             style={{
//               ...bodyStyle,
//               opacity: 0.6,
//             }}
//           >
//             Unable to load
//             testimonials right now.
//           </p>

//         </div>

//       </main>
//     );
//   }


//   /* =======================================================
//      EMPTY STATE
//   ======================================================= */

//   if (!testimonials.length) {

//     return (
//       <main
//         className="
//           min-h-screen
//         "
//         style={{
//           backgroundColor:
//             branding.pageBackgroundColor,

//           fontFamily:
//             fontFamily(
//               branding.fontBody
//             ),
//         }}
//       >

//         <section
//           className="
//             mx-auto
//             max-w-7xl
//             px-5
//             py-24
//             text-center
//           "
//         >

//           <div
//             className="
//               mx-auto
//               flex
//               h-20
//               w-20
//               items-center
//               justify-center
//               rounded-full
//             "
//             style={{
//               backgroundColor:
//                 hexToRgba(
//                   branding.buttonColor,
//                   0.08
//                 ),

//               color:
//                 branding.buttonColor,
//             }}
//           >
//             <Heart size={34} />
//           </div>


//           <h1
//             className="
//               mt-7
//               text-4xl
//               md:text-5xl
//             "
//             style={headingStyle}
//           >
//             Voices of Our
//             <br />

//             <span
//               style={{
//                 color:
//                   branding.subheadingColor,
//               }}
//             >
//               Amazing Learners
//             </span>
//           </h1>


//           <div
//             className="
//               mx-auto
//               mt-4
//               h-1
//               w-16
//               rounded-full
//             "
//             style={{
//               backgroundColor:
//                 branding.buttonColor,
//             }}
//           />


//           <p
//             className="
//               mx-auto
//               mt-4
//               max-w-xl
//             "
//             style={{
//               ...bodyStyle,
//               opacity: 0.6,
//             }}
//           >
//             Real stories from
//             learners who are
//             building better futures
//             with {instituteName}.
//           </p>


//           <p
//             className="mt-8 text-sm"
//             style={{
//               ...bodyStyle,
//               opacity: 0.4,
//             }}
//           >
//             No testimonials are
//             available yet.
//           </p>

//         </section>

//       </main>
//     );
//   }


//   /* =======================================================
//      MAIN PAGE
//   ======================================================= */

//   return (
//     <main
//       className="
//         min-h-screen
//         overflow-hidden
//       "
//       style={{
//         backgroundColor:
//           branding.pageBackgroundColor,

//         fontFamily:
//           fontFamily(
//             branding.fontBody
//           ),

//         color:
//           branding.textColor,
//       }}
//     >

//       {/* ===================================================
//           HERO
//       =================================================== */}

//       <section
//         className="
//           relative
//           overflow-hidden
//         "
//       >

//         {/* Background */}

//         <div
//           className="
//             absolute
//             -left-32
//             -top-24
//             h-72
//             w-72
//             rounded-full
//           "
//           style={{
//             background:
//               `radial-gradient(
//                 circle,
//                 ${hexToRgba(
//                   branding.buttonColor,
//                   0.12
//                 )},
//                 transparent 70%
//               )`,
//           }}
//         />


//         <div
//           className="
//             absolute
//             right-[-100px]
//             top-[-100px]
//             h-80
//             w-80
//             rounded-full
//           "
//           style={{
//             background:
//               `radial-gradient(
//                 circle,
//                 ${hexToRgba(
//                   branding.subheadingColor,
//                   0.10
//                 )},
//                 transparent 70%
//               )`,
//           }}
//         />


//         <div
//           className="
//             relative
//             mx-auto
//             max-w-7xl
//             px-5
//           "
//         >

//           <div
//             className="
//               grid
//               min-h-[440px]
//               grid-cols-1
//               items-center
//               gap-10
//               py-10
//               md:py-14
//               lg:grid-cols-2
//             "
//           >

//             {/* =================================================
//                 HERO LEFT
//             ================================================= */}

//             <div>

//               <span
//                 className="
//                   inline-flex
//                   px-4
//                   py-2
//                   text-[10px]
//                   uppercase
//                   tracking-[0.18em]
//                 "
//                 style={{
//                   backgroundColor:
//                     hexToRgba(
//                       branding.buttonColor,
//                       0.08
//                     ),

//                   color:
//                     branding.buttonColor,

//                   borderRadius:
//                     buttonRadius(
//                       branding
//                     ),

//                   fontFamily:
//                     fontFamily(
//                       branding.fontSubheading
//                     ),

//                   fontWeight:
//                     branding.subheadingWeight,
//                 }}
//               >
//                 Learner Testimonials
//               </span>


//               <h1
//                 className="
//                   mt-5
//                   text-4xl
//                   sm:text-5xl
//                   md:text-6xl
//                 "
//                 style={headingStyle}
//               >
//                 Voices of Our
//                 <br />

//                 <span
//                   style={{
//                     color:
//                       branding.subheadingColor,
//                   }}
//                 >
//                   Amazing Learners
//                 </span>
//               </h1>


//               <div
//                 className="
//                   mt-4
//                   h-1
//                   w-52
//                   rounded-full
//                 "
//                 style={{
//                   backgroundColor:
//                     branding.iconColor,
//                 }}
//               />


//               <p
//                 className="
//                   mt-5
//                   max-w-xl
//                   text-base
//                   md:text-lg
//                 "
//                 style={{
//                   ...bodyStyle,
//                   opacity: 0.68,
//                 }}
//               >
//                 Real stories from real
//                 learners who are
//                 building better futures
//                 with {instituteName}.
//               </p>


//               {/* =================================================
//                   STATS
//               ================================================= */}

//               <div
//                 className="
//                   mt-8
//                   grid
//                   grid-cols-2
//                   gap-y-6
//                   sm:grid-cols-4
//                   sm:gap-0
//                 "
//               >

//                 <HeroStat
//                   icon={
//                     <Star
//                       size={26}
//                       fill={
//                         branding.iconColor
//                       }
//                     />
//                   }
//                   value={
//                     `${statistics.averageRating}/5`
//                   }
//                   label="Average Rating"
//                   branding={
//                     branding
//                   }
//                 />


//                 <HeroStat
//                   icon={
//                     <Users
//                       size={26}
//                     />
//                   }
//                   value={
//                     `${statistics.happyLearners}+`
//                   }
//                   label="Happy Learners"
//                   branding={
//                     branding
//                   }
//                 />


//                 <HeroStat
//                   icon={
//                     <BookOpen
//                       size={26}
//                     />
//                   }
//                   value={
//                     statistics.courses
//                   }
//                   label="Courses"
//                   branding={
//                     branding
//                   }
//                 />


//                 <HeroStat
//                   icon={
//                     <Heart
//                       size={26}
//                     />
//                   }
//                   value={
//                     statistics.recommend
//                   }
//                   label="Recommend Us"
//                   branding={
//                     branding
//                   }
//                 />

//               </div>

//             </div>


//             {/* =================================================
//                 HERO COLLAGE
//             ================================================= */}

//             <TestimonialHeroCollage
//               testimonials={
//                 testimonials
//               }
//               branding={
//                 branding
//               }
//             />

//           </div>

//         </div>

//       </section>


//       {/* =====================================================
//           TESTIMONIALS
//       ===================================================== */}

//       <section
//         className="
//           relative
//           px-5
//           pb-8
//         "
//       >

//         <div
//           className="
//             mx-auto
//             max-w-7xl
//           "
//         >

//           <div
//             className="
//               mb-6
//               text-center
//             "
//           >

//             <h2
//               className="
//                 text-3xl
//                 md:text-4xl
//               "
//               style={headingStyle}
//             >
//               What Our Learners Say
//             </h2>


//             <div
//               className="
//                 mx-auto
//                 mt-2
//                 h-[3px]
//                 w-16
//                 rounded-full
//               "
//               style={{
//                 backgroundColor:
//                   branding.buttonColor,
//               }}
//             />

//           </div>


//           <div
//             className="
//               grid
//               grid-cols-1
//               gap-5
//               md:grid-cols-3
//             "
//           >

//             {testimonials
//               .slice(0, 3)
//               .map(
//                 (
//                   testimonial,
//                   index
//                 ) => (

//                   <TestimonialCard
//                     key={
//                       testimonial?.id ||
//                       `testimonial-${index}`
//                     }
//                     testimonial={
//                       testimonial
//                     }
//                     index={
//                       index
//                     }
//                     branding={
//                       branding
//                     }
//                   />

//                 )
//               )}

//           </div>

//         </div>

//       </section>


//       {/* =====================================================
//           VIDEO TESTIMONIALS
//       ===================================================== */}

//       {videoTestimonials.length >
//         0 && (

//         <section
//           className="
//             mt-8
//             px-5
//             pb-12
//             pt-8
//           "
//           style={{
//             backgroundColor:
//               hexToRgba(
//                 branding.buttonColor,
//                 0.035
//               ),
//           }}
//         >

//           <div
//             className="
//               mx-auto
//               max-w-7xl
//             "
//           >

//             <div className="text-center">

//               <h2
//                 className="
//                   text-2xl
//                   md:text-3xl
//                 "
//                 style={headingStyle}
//               >
//                 Video Testimonials
//               </h2>


//               <p
//                 className="mt-1 text-sm"
//                 style={{
//                   ...bodyStyle,
//                   opacity: 0.55,
//                 }}
//               >
//                 Watch and hear from
//                 our learners about
//                 their journeys.
//               </p>

//             </div>


//             <div
//               className="
//                 relative
//                 mt-5
//               "
//             >

//               {videoTestimonials.length >
//                 3 && (

//                 <SliderButton
//                   direction="left"
//                   onClick={
//                     previousVideos
//                   }
//                   branding={
//                     branding
//                   }
//                 />

//               )}


//               <div
//                 className="
//                   grid
//                   grid-cols-1
//                   gap-5
//                   md:grid-cols-3
//                   md:px-14
//                 "
//               >

//                 {visibleVideos.map(
//                   (
//                     testimonial,
//                     index
//                   ) => (

//                     <VideoTestimonialCard
//                       key={
//                         testimonial?.id ||
//                         `video-${index}`
//                       }
//                       testimonial={
//                         testimonial
//                       }
//                       branding={
//                         branding
//                       }
//                     />

//                   )
//                 )}

//               </div>


//               {videoTestimonials.length >
//                 3 && (

//                 <SliderButton
//                   direction="right"
//                   onClick={
//                     nextVideos
//                   }
//                   branding={
//                     branding
//                   }
//                 />

//               )}

//             </div>

//           </div>

//         </section>

//       )}

//     </main>
//   );
// }


// /* ===========================================================
//    HERO STAT
// =========================================================== */

// function HeroStat({
//   icon,
//   value,
//   label,
//   branding,
// }) {

//   return (
//     <div
//       className="
//         flex
//         items-start
//         gap-3
//         sm:border-r
//         sm:px-5
//         first:pl-0
//         last:border-r-0
//       "
//       style={{
//         borderColor:
//           hexToRgba(
//             branding.textColor,
//             0.12
//           ),
//       }}
//     >

//       <div
//         className="shrink-0"
//         style={{
//           color:
//             branding.iconColor,
//         }}
//       >
//         {icon}
//       </div>


//       <div>

//         <div
//           className="
//             text-xl
//             md:text-2xl
//           "
//           style={{
//             color:
//               branding.headingColor,

//             fontFamily:
//               fontFamily(
//                 branding.fontHeading
//               ),

//             fontWeight:
//               branding.headingWeight,
//           }}
//         >
//           {value}
//         </div>


//         <div
//           className="mt-1 text-xs"
//           style={{
//             color:
//               branding.textColor,

//             fontFamily:
//               fontFamily(
//                 branding.fontBody
//               ),

//             fontWeight:
//               branding.bodyWeight,

//             opacity: 0.55,
//           }}
//         >
//           {label}
//         </div>

//       </div>

//     </div>
//   );
// }


// /* ===========================================================
//    HERO COLLAGE
// =========================================================== */

// function TestimonialHeroCollage({
//   testimonials,
//   branding,
// }) {

//   const images =
//     testimonials
//       .map(
//         (item) => ({
//           image:
//             item?.avatar ||
//             item?.student_image ||
//             item?.profile_image ||
//             item?.profileImage ||
//             item?.image ||
//             null,

//           rating:
//             Number(
//               item?.rating || 5
//             ),
//         })
//       )
//       .filter(
//         (item) =>
//           item.image
//       )
//       .slice(0, 3);


//   if (!images.length) {

//     return (
//       <div
//         className="
//           relative
//           mx-auto
//           h-[390px]
//           w-full
//           max-w-[540px]
//         "
//       >

//         <div
//           className="
//             absolute
//             right-8
//             top-4
//             h-52
//             w-64
//             rounded-[28px]
//           "
//           style={{
//             backgroundColor:
//               hexToRgba(
//                 branding.buttonColor,
//                 0.08
//               ),
//           }}
//         />


//         <div
//           className="
//             absolute
//             left-4
//             top-28
//             h-52
//             w-64
//             rounded-[28px]
//           "
//           style={{
//             backgroundColor:
//               hexToRgba(
//                 branding.subheadingColor,
//                 0.08
//               ),
//           }}
//         />


//         <div
//           className="
//             absolute
//             right-0
//             top-48
//             h-48
//             w-60
//             rounded-[28px]
//           "
//           style={{
//             backgroundColor:
//               hexToRgba(
//                 branding.iconColor,
//                 0.08
//               ),
//           }}
//         />

//       </div>
//     );
//   }


//   return (
//     <div
//       className="
//         relative
//         mx-auto
//         h-[390px]
//         w-full
//         max-w-[540px]
//       "
//     >

//       <div
//         className="
//           absolute
//           left-1/2
//           top-1/2
//           h-64
//           w-64
//           -translate-x-1/2
//           -translate-y-1/2
//           rounded-full
//         "
//         style={{
//           backgroundColor:
//             hexToRgba(
//               branding.buttonColor,
//               0.05
//             ),
//         }}
//       />


//       {images[0] && (
//         <HeroImage
//           image={
//             images[0].image
//           }
//           rating={
//             images[0].rating
//           }
//           className="
//             absolute
//             left-4
//             top-24
//             h-52
//             w-64
//             md:left-8
//             md:w-72
//           "
//           background={
//             hexToRgba(
//               branding.buttonColor,
//               0.10
//             )
//           }
//           branding={
//             branding
//           }
//         />
//       )}


//       {images[1] && (
//         <HeroImage
//           image={
//             images[1].image
//           }
//           rating={
//             images[1].rating
//           }
//           className="
//             absolute
//             right-5
//             top-0
//             h-48
//             w-60
//             md:right-8
//             md:h-52
//             md:w-64
//           "
//           background={
//             hexToRgba(
//               branding.subheadingColor,
//               0.10
//             )
//           }
//           branding={
//             branding
//           }
//         />
//       )}


//       {images[2] && (
//         <HeroImage
//           image={
//             images[2].image
//           }
//           rating={
//             images[2].rating
//           }
//           className="
//             absolute
//             bottom-0
//             right-0
//             h-48
//             w-60
//             md:h-52
//             md:w-64
//           "
//           background={
//             hexToRgba(
//               branding.iconColor,
//               0.10
//             )
//           }
//           branding={
//             branding
//           }
//         />
//       )}


//       <span
//         className="
//           absolute
//           right-0
//           top-20
//           text-4xl
//         "
//         style={{
//           color:
//             branding.iconColor,
//         }}
//       >
//         △
//       </span>


//       <span
//         className="
//           absolute
//           left-1/2
//           top-10
//           text-3xl
//         "
//         style={{
//           color:
//             branding.buttonColor,
//         }}
//       >
//         ╱╲
//       </span>


//       <span
//         className="
//           absolute
//           bottom-2
//           left-1/2
//           text-4xl
//         "
//         style={{
//           color:
//             hexToRgba(
//               branding.subheadingColor,
//               0.5
//             ),
//         }}
//       >
//         ◡
//       </span>

//     </div>
//   );
// }


// /* ===========================================================
//    HERO IMAGE
// =========================================================== */

// function HeroImage({
//   image,
//   rating,
//   className,
//   background,
//   branding,
// }) {

//   return (
//     <div
//       className={`
//         overflow-visible
//         rounded-[28px]
//         p-0
//         ${className}
//       `}
//       style={{
//         backgroundColor:
//           background,
//       }}
//     >

//       <div
//         className="
//           h-full
//           w-full
//           overflow-hidden
//           rounded-[28px]
//         "
//       >

//         <img
//           src={image}
//           alt="Learner"
//           className="
//             h-full
//             w-full
//             object-cover
//           "
//           onError={(
//             event
//           ) => {
//             event.currentTarget.style.display =
//               "none";
//           }}
//         />

//       </div>


//       <div
//         className="
//           absolute
//           -bottom-3
//           right-[-12px]
//           flex
//           items-center
//           gap-1
//           px-4
//           py-2
//           shadow-lg
//         "
//         style={{
//           backgroundColor:
//             branding.cardBackgroundColor,

//           borderRadius:
//             buttonRadius(
//               branding
//             ),
//         }}
//       >

//         {[1, 2, 3, 4, 5].map(
//           (star) => (

//             <Star
//               key={star}
//               size={14}
//               fill={
//                 branding.iconColor
//               }
//               style={{
//                 color:
//                   branding.iconColor,
//               }}
//             />

//           )
//         )}

//       </div>

//     </div>
//   );
// }


// /* ===========================================================
//    TESTIMONIAL CARD
// =========================================================== */

// function TestimonialCard({
//   testimonial,
//   index,
//   branding,
// }) {

//   const name =
//     testimonial?.student_name ||
//     testimonial?.studentName ||
//     testimonial?.name ||
//     "Student";


//   const role =
//     testimonial?.role ||
//     testimonial?.student_role ||
//     testimonial?.designation ||
//     "Student";


//   const text =
//     testimonial?.testimonial_text ||
//     testimonial?.testimonialText ||
//     testimonial?.review ||
//     testimonial?.comment ||
//     testimonial?.message ||
//     "Amazing learning experience!";


//   const avatar =
//     testimonial?.avatar ||
//     testimonial?.student_image ||
//     testimonial?.profile_image ||
//     testimonial?.profileImage ||
//     testimonial?.image ||
//     null;


//   const rating =
//     Math.round(
//       Number(
//         testimonial?.rating || 5
//       )
//     );


//   const backgrounds = [
//     hexToRgba(
//       branding.buttonColor,
//       0.09
//     ),

//     hexToRgba(
//       branding.subheadingColor,
//       0.08
//     ),

//     hexToRgba(
//       branding.iconColor,
//       0.09
//     ),
//   ];


//   const background =
//     backgrounds[
//       index %
//         backgrounds.length
//     ];


//   return (
//     <article
//       className="
//         relative
//         min-h-[205px]
//         rounded-2xl
//         p-6
//         shadow-sm
//       "
//       style={{
//         backgroundColor:
//           background,

//         border:
//           `1px solid ${hexToRgba(
//             branding.textColor,
//             0.06
//           )}`,
//       }}
//     >

//       <Quote
//         size={34}
//         fill={
//           branding.buttonColor
//         }
//         style={{
//           color:
//             branding.buttonColor,
//         }}
//       />


//       <div
//         className="
//           absolute
//           right-5
//           top-6
//           flex
//           gap-0.5
//         "
//       >

//         {[1, 2, 3, 4, 5].map(
//           (star) => (

//             <Star
//               key={star}
//               size={15}
//               fill={
//                 star <= rating
//                   ? branding.iconColor
//                   : "none"
//               }
//               style={{
//                 color:
//                   branding.iconColor,
//               }}
//             />

//           )
//         )}

//       </div>


//       <p
//         className="
//           mt-2
//           min-h-[76px]
//           text-sm
//           italic
//           md:text-base
//         "
//         style={{
//           color:
//             branding.textColor,

//           fontFamily:
//             fontFamily(
//               branding.fontBody
//             ),

//           fontWeight:
//             branding.bodyWeight,

//           lineHeight:
//             branding.bodyLineHeight,

//           opacity: 0.82,
//         }}
//       >
//         “{text}”
//       </p>


//       <div
//         className="
//           mt-5
//           flex
//           items-center
//           gap-3
//         "
//       >

//         {avatar ? (

//           <img
//             src={avatar}
//             alt={name}
//             className="
//               h-12
//               w-12
//               rounded-full
//               object-cover
//             "
//             onError={(
//               event
//             ) => {
//               event.currentTarget.style.display =
//                 "none";
//             }}
//           />

//         ) : (

//           <div
//             className="
//               flex
//               h-12
//               w-12
//               items-center
//               justify-center
//               rounded-full
//               text-sm
//             "
//             style={{
//               backgroundColor:
//                 branding.buttonColor,

//               color:
//                 branding.buttonTextColor,

//               fontFamily:
//                 fontFamily(
//                   branding.fontHeading
//                 ),

//               fontWeight:
//                 branding.headingWeight,
//             }}
//           >
//             {name
//               .charAt(0)
//               .toUpperCase()}
//           </div>

//         )}


//         <div>

//           <h3
//             className="text-sm"
//             style={{
//               color:
//                 branding.headingColor,

//               fontFamily:
//                 fontFamily(
//                   branding.fontHeading
//                 ),

//               fontWeight:
//                 branding.subheadingWeight,
//             }}
//           >
//             {name}
//           </h3>


//           <p
//             className="text-xs"
//             style={{
//               color:
//                 branding.textColor,

//               fontFamily:
//                 fontFamily(
//                   branding.fontBody
//                 ),

//               opacity: 0.55,
//             }}
//           >
//             {role}
//           </p>

//         </div>

//       </div>

//     </article>
//   );
// }


// /* ===========================================================
//    VIDEO TESTIMONIAL CARD
// =========================================================== */

// function VideoTestimonialCard({
//   testimonial,
//   branding,
// }) {

//   const name =
//     testimonial?.student_name ||
//     testimonial?.studentName ||
//     testimonial?.name ||
//     "Student";


//   const role =
//     testimonial?.role ||
//     testimonial?.student_role ||
//     testimonial?.designation ||
//     "Student";


//   const video =
//     testimonial?.video_url ||
//     testimonial?.videoUrl ||
//     testimonial?.video ||
//     null;


//   const thumbnail =
//     testimonial?.video_thumbnail ||
//     testimonial?.videoThumbnail ||
//     testimonial?.thumbnail ||
//     testimonial?.thumbnail_url ||
//     testimonial?.avatar ||
//     testimonial?.student_image ||
//     testimonial?.profile_image ||
//     null;


//   const title =
//     testimonial?.video_title ||
//     testimonial?.videoTitle ||
//     testimonial?.title ||
//     `My Journey with ${name}`;


//   const duration =
//     testimonial?.video_duration ||
//     testimonial?.duration ||
//     "";


//   return (
//     <article
//       className="
//         overflow-hidden
//         shadow-sm
//         transition
//         hover:-translate-y-1
//         hover:shadow-lg
//       "
//       style={{
//         backgroundColor:
//           branding.cardBackgroundColor,

//         border:
//           `1px solid ${hexToRgba(
//             branding.textColor,
//             0.10
//           )}`,

//         borderRadius:
//           "16px",
//       }}
//     >

//       <div
//         className="
//           relative
//           aspect-video
//           overflow-hidden
//         "
//         style={{
//           backgroundColor:
//             branding.navbarColor,
//         }}
//       >

//         {video ? (

//           <video
//             src={video}
//             poster={
//               thumbnail ||
//               undefined
//             }
//             controls
//             preload="metadata"
//             className="
//               h-full
//               w-full
//               object-cover
//             "
//           />

//         ) : thumbnail ? (

//           <>
//             <img
//               src={thumbnail}
//               alt={title}
//               className="
//                 h-full
//                 w-full
//                 object-cover
//               "
//             />

//             <div
//               className="
//                 absolute
//                 inset-0
//                 flex
//                 items-center
//                 justify-center
//               "
//               style={{
//                 backgroundColor:
//                   "rgba(0,0,0,0.20)",
//               }}
//             >

//               <div
//                 className="
//                   flex
//                   h-14
//                   w-14
//                   items-center
//                   justify-center
//                   rounded-full
//                   border-2
//                   backdrop-blur-sm
//                 "
//                 style={{
//                   backgroundColor:
//                     hexToRgba(
//                       branding.buttonColor,
//                       0.75
//                     ),

//                   borderColor:
//                     branding.buttonTextColor,

//                   color:
//                     branding.buttonTextColor,
//                 }}
//               >
//                 <Play
//                   size={24}
//                   fill="currentColor"
//                 />
//               </div>

//             </div>

//           </>

//         ) : (

//           <div
//             className="
//               flex
//               h-full
//               items-center
//               justify-center
//             "
//             style={{
//               color:
//                 branding.buttonTextColor,
//             }}
//           >
//             <Play
//               size={46}
//               style={{
//                 opacity: 0.55,
//               }}
//             />
//           </div>

//         )}


//         {duration && (
//           <span
//             className="
//               absolute
//               bottom-2
//               right-2
//               px-2
//               py-1
//               text-[10px]
//             "
//             style={{
//               backgroundColor:
//                 "rgba(0,0,0,0.70)",

//               color:
//                 branding.buttonTextColor,

//               borderRadius:
//                 "5px",
//             }}
//           >
//             {duration}
//           </span>
//         )}

//       </div>


//       <div className="px-4 py-3">

//         <h3
//           className="text-sm"
//           style={{
//             color:
//               branding.headingColor,

//             fontFamily:
//               fontFamily(
//                 branding.fontHeading
//               ),

//             fontWeight:
//               branding.subheadingWeight,

//             lineHeight:
//               branding.headingLineHeight,
//           }}
//         >
//           {title}
//         </h3>


//         <div
//           className="
//             mt-1
//             flex
//             items-center
//             gap-2
//             text-xs
//           "
//         >

//           <span
//             style={{
//               color:
//                 branding.buttonColor,

//               fontFamily:
//                 fontFamily(
//                   branding.fontBody
//                 ),

//               fontWeight:
//                 branding.subheadingWeight,
//             }}
//           >
//             {name}
//           </span>


//           <span
//             style={{
//               color:
//                 branding.textColor,
//               opacity: 0.3,
//             }}
//           >
//             •
//           </span>


//           <span
//             style={{
//               color:
//                 branding.textColor,

//               opacity: 0.55,
//             }}
//           >
//             {role}
//           </span>

//         </div>

//       </div>

//     </article>
//   );
// }


// /* ===========================================================
//    SLIDER BUTTON
// =========================================================== */

// function SliderButton({
//   direction,
//   onClick,
//   branding,
// }) {

//   const isLeft =
//     direction === "left";


//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       aria-label={
//         isLeft
//           ? "Previous testimonials"
//           : "Next testimonials"
//       }
//       className="
//         absolute
//         top-1/2
//         z-10
//         hidden
//         h-11
//         w-11
//         -translate-y-1/2
//         items-center
//         justify-center
//         shadow-md
//         transition
//         hover:scale-105
//         md:flex
//       "
//       style={{
//         left:
//           isLeft
//             ? "-4px"
//             : undefined,

//         right:
//           !isLeft
//             ? "-4px"
//             : undefined,

//         backgroundColor:
//           branding.cardBackgroundColor,

//         color:
//           branding.buttonColor,

//         border:
//           `1px solid ${hexToRgba(
//             branding.buttonColor,
//             0.20
//           )}`,

//         borderRadius:
//           buttonRadius(
//             branding
//           ),
//       }}
//     >

//       {isLeft ? (
//         <ChevronLeft
//           size={20}
//         />
//       ) : (
//         <ChevronRight
//           size={20}
//         />
//       )}

//     </button>
//   );
// }


// /* ===========================================================
//    FORMAT NUMBER
// =========================================================== */

// function formatNumber(
//   value
// ) {

//   const number =
//     Number(value || 0);


//   if (
//     number >= 1000000
//   ) {

//     return `${(
//       number / 1000000
//     ).toFixed(1)}M`;

//   }


//   if (
//     number >= 1000
//   ) {

//     return `${(
//       number / 1000
//     ).toFixed(
//       number >= 10000
//         ? 0
//         : 1
//     )}K`;

//   }


//   return number.toString();
// }


// import { useEffect, useMemo, useState } from "react";
// import { useOutletContext } from "react-router-dom";
// import {
//   Star,
//   Play,
//   Quote,
// } from "lucide-react";

// import {
//   getInstituteTestimonials,
// } from "../../services/testimonialService";


// /* =========================================================
//    DEFAULT BRANDING
// ========================================================= */

// const DEFAULT_BRANDING = {
//   navbarColor: "#1F2937",
//   headingColor: "#111827",
//   subheadingColor: "#5B21B6",
//   textColor: "#111827",
//   iconColor: "#F59E0B",
//   buttonColor: "#7C3AED",
//   buttonTextColor: "#FFFFFF",

//   pageBackgroundColor: "#FAFAF9",
//   cardBackgroundColor: "#FFFFFF",

//   fontHeading: "Inter",
//   fontSubheading: "Inter",
//   fontBody: "Inter",

//   headingWeight: 700,
//   headingLineHeight: 1.15,
//   headingLetterSpacing: 0,

//   subheadingWeight: 600,
//   subheadingLineHeight: 1.4,

//   bodyWeight: 400,
//   bodyLineHeight: 1.6,
//   bodyLetterSpacing: 0,

//   roundedButtons: true,
// };


// /* =========================================================
//    BRANDING HELPERS
// ========================================================= */

// const getBrandingValue = (
//   branding,
//   camelKey,
//   snakeKey,
//   fallback
// ) => {
//   const value =
//     branding?.[camelKey] ??
//     branding?.[snakeKey];

//   return (
//     value !== undefined &&
//     value !== null &&
//     value !== ""
//   )
//     ? value
//     : fallback;
// };


// const normalizeBranding = (
//   branding = {}
// ) => ({
//   navbarColor: getBrandingValue(
//     branding,
//     "navbarColor",
//     "navbar_color",
//     DEFAULT_BRANDING.navbarColor
//   ),

//   headingColor: getBrandingValue(
//     branding,
//     "headingColor",
//     "heading_color",
//     DEFAULT_BRANDING.headingColor
//   ),

//   subheadingColor: getBrandingValue(
//     branding,
//     "subheadingColor",
//     "subheading_color",
//     DEFAULT_BRANDING.subheadingColor
//   ),

//   textColor: getBrandingValue(
//     branding,
//     "textColor",
//     "text_color",
//     DEFAULT_BRANDING.textColor
//   ),

//   iconColor: getBrandingValue(
//     branding,
//     "iconColor",
//     "icon_color",
//     DEFAULT_BRANDING.iconColor
//   ),

//   buttonColor: getBrandingValue(
//     branding,
//     "buttonColor",
//     "button_color",
//     DEFAULT_BRANDING.buttonColor
//   ),

//   buttonTextColor: getBrandingValue(
//     branding,
//     "buttonTextColor",
//     "button_text_color",
//     DEFAULT_BRANDING.buttonTextColor
//   ),

//   pageBackgroundColor: getBrandingValue(
//     branding,
//     "pageBackgroundColor",
//     "page_background_color",
//     DEFAULT_BRANDING.pageBackgroundColor
//   ),

//   cardBackgroundColor: getBrandingValue(
//     branding,
//     "cardBackgroundColor",
//     "card_background_color",
//     DEFAULT_BRANDING.cardBackgroundColor
//   ),

//   fontHeading: getBrandingValue(
//     branding,
//     "fontHeading",
//     "font_heading",
//     DEFAULT_BRANDING.fontHeading
//   ),

//   fontSubheading: getBrandingValue(
//     branding,
//     "fontSubheading",
//     "font_subheading",
//     DEFAULT_BRANDING.fontSubheading
//   ),

//   fontBody: getBrandingValue(
//     branding,
//     "fontBody",
//     "font_body",
//     DEFAULT_BRANDING.fontBody
//   ),

//   headingWeight: getBrandingValue(
//     branding,
//     "headingWeight",
//     "heading_weight",
//     DEFAULT_BRANDING.headingWeight
//   ),

//   headingLineHeight: getBrandingValue(
//     branding,
//     "headingLineHeight",
//     "heading_line_height",
//     DEFAULT_BRANDING.headingLineHeight
//   ),

//   headingLetterSpacing: getBrandingValue(
//     branding,
//     "headingLetterSpacing",
//     "heading_letter_spacing",
//     DEFAULT_BRANDING.headingLetterSpacing
//   ),

//   subheadingWeight: getBrandingValue(
//     branding,
//     "subheadingWeight",
//     "subheading_weight",
//     DEFAULT_BRANDING.subheadingWeight
//   ),

//   bodyWeight: getBrandingValue(
//     branding,
//     "bodyWeight",
//     "body_weight",
//     DEFAULT_BRANDING.bodyWeight
//   ),

//   bodyLineHeight: getBrandingValue(
//     branding,
//     "bodyLineHeight",
//     "body_line_height",
//     DEFAULT_BRANDING.bodyLineHeight
//   ),

//   bodyLetterSpacing: getBrandingValue(
//     branding,
//     "bodyLetterSpacing",
//     "body_letter_spacing",
//     DEFAULT_BRANDING.bodyLetterSpacing
//   ),

//   roundedButtons: getBrandingValue(
//     branding,
//     "roundedButtons",
//     "rounded_buttons",
//     DEFAULT_BRANDING.roundedButtons
//   ),
// });


// const fontFamily = (font) =>
//   font
//     ? `'${font}', sans-serif`
//     : "Inter, sans-serif";


// const buttonRadius = (branding) =>
//   branding.roundedButtons
//     ? "9999px"
//     : "10px";


// const hexToRgba = (
//   color,
//   alpha
// ) => {
//   if (
//     typeof color !== "string"
//   ) {
//     return color;
//   }

//   const hex =
//     color.replace("#", "");

//   if (
//     !/^[0-9A-Fa-f]{6}$/.test(hex)
//   ) {
//     return color;
//   }

//   const r = parseInt(
//     hex.substring(0, 2),
//     16
//   );

//   const g = parseInt(
//     hex.substring(2, 4),
//     16
//   );

//   const b = parseInt(
//     hex.substring(4, 6),
//     16
//   );

//   return `rgba(${r}, ${g}, ${b}, ${alpha})`;
// };


// /* =========================================================
//    MAIN COMPONENT
// ========================================================= */

// export default function WebsiteTestimonials() {

//   const {
//     branding: outletBranding = {},
//     institute = {},
//     website = {},
//     banners = [],
//     bannersLoading = false,
//   } = useOutletContext() || {};


//   const branding = useMemo(
//     () =>
//       normalizeBranding(
//         outletBranding
//       ),
//     [outletBranding]
//   );


//   /* =======================================================
//      STATE
//   ======================================================= */

//   const [
//     testimonials,
//     setTestimonials,
//   ] = useState([]);

//   const [
//     loadingTestimonials,
//     setLoadingTestimonials,
//   ] = useState(true);

//   const [
//     testimonialError,
//     setTestimonialError,
//   ] = useState("");

//   const [
//     activeFilter,
//     setActiveFilter,
//   ] = useState("all");


//   /* =======================================================
//      INSTITUTE NAME
//   ======================================================= */

//   const instituteName =
//     institute?.name ||
//     website?.institute?.name ||
//     website?.name ||
//     "Institute";


//   /* =======================================================
//      TESTIMONIAL BANNER
     
//      IMPORTANT:
//      Banner is already fetched by the parent
//      website layout and passed through Outlet context.
//   ======================================================= */

//   const testimonialBanner = useMemo(() => {

//     const list =
//       Array.isArray(banners)
//         ? banners
//         : [];

//     const banner =
//       list.find((item) => {

//         const type =
//           String(
//             item?.banner_type ||
//             item?.bannerType ||
//             ""
//           )
//             .trim()
//             .toUpperCase();

//         return (
//           type === "TESTIMONIAL" &&
//           isActiveBanner(item)
//         );
//       });

//     console.log(
//       "TESTIMONIAL BANNERS:",
//       list.filter((item) =>
//         String(
//           item?.banner_type ||
//           item?.bannerType ||
//           ""
//         )
//           .trim()
//           .toUpperCase() ===
//         "TESTIMONIAL"
//       )
//     );

//     console.log(
//       "SELECTED TESTIMONIAL BANNER:",
//       banner
//     );

//     return banner || null;

//   }, [banners]);


//   /* =======================================================
//      TESTIMONIAL BANNER IMAGE
//   ======================================================= */

//   const testimonialBannerImage =
//     testimonialBanner?.image_url ||
//     testimonialBanner?.image ||
//     testimonialBanner?.imageUrl ||
//     null;


//   /* =======================================================
//      FETCH TESTIMONIALS
//   ======================================================= */

//   useEffect(() => {

//     let mounted = true;


//     const loadTestimonials = async () => {

//       try {

//         setLoadingTestimonials(true);
//         setTestimonialError("");


//         const result =
//           await getInstituteTestimonials();


//         console.log(
//           "WEBSITE TESTIMONIALS RESPONSE:",
//           result
//         );


//         if (!mounted) {
//           return;
//         }


//         let testimonialList = [];


//         if (
//           Array.isArray(result)
//         ) {

//           testimonialList =
//             result;

//         } else if (
//           Array.isArray(
//             result?.data
//           )
//         ) {

//           testimonialList =
//             result.data;

//         } else if (
//           Array.isArray(
//             result?.testimonials
//           )
//         ) {

//           testimonialList =
//             result.testimonials;

//         }


//         setTestimonials(
//           testimonialList
//         );

//       } catch (error) {

//         console.error(
//           "Testimonials API Error:",
//           error
//         );


//         if (!mounted) {
//           return;
//         }


//         setTestimonials([]);


//         setTestimonialError(
//           error?.response?.data?.message ||
//           error?.message ||
//           "Failed to load testimonials."
//         );

//       } finally {

//         if (mounted) {
//           setLoadingTestimonials(false);
//         }

//       }

//     };


//     loadTestimonials();


//     return () => {
//       mounted = false;
//     };

//   }, []);


//   /* =======================================================
//      FILTER TESTIMONIALS
//   ======================================================= */

//   const textTestimonials =
//     useMemo(
//       () =>
//         testimonials.filter(
//           (testimonial) =>
//             !getVideoUrl(
//               testimonial
//             )
//         ),
//       [testimonials]
//     );


//   const videoTestimonials =
//     useMemo(
//       () =>
//         testimonials.filter(
//           (testimonial) =>
//             Boolean(
//               getVideoUrl(
//                 testimonial
//               )
//             )
//         ),
//       [testimonials]
//     );


//   /* =======================================================
//      SHARED STYLES
//   ======================================================= */

//   const headingStyle = {
//     color:
//       branding.headingColor,

//     fontFamily:
//       fontFamily(
//         branding.fontHeading
//       ),

//     fontWeight:
//       branding.headingWeight,

//     lineHeight:
//       branding.headingLineHeight,

//     letterSpacing:
//       branding.headingLetterSpacing,
//   };


//   const bodyStyle = {
//     color:
//       branding.textColor,

//     fontFamily:
//       fontFamily(
//         branding.fontBody
//       ),

//     fontWeight:
//       branding.bodyWeight,

//     lineHeight:
//       branding.bodyLineHeight,

//     letterSpacing:
//       branding.bodyLetterSpacing,
//   };


//   /* =======================================================
//      LOADING
//   ======================================================= */

//   if (
//     loadingTestimonials
//   ) {

//     return (
//       <main
//         className="
//           min-h-screen
//           flex
//           items-center
//           justify-center
//         "
//         style={{
//           backgroundColor:
//             branding.pageBackgroundColor,

//           fontFamily:
//             fontFamily(
//               branding.fontBody
//             ),
//         }}
//       >

//         <div className="text-center">

//           <div
//             className="
//               mx-auto
//               h-10
//               w-10
//               animate-spin
//               rounded-full
//               border-4
//             "
//             style={{
//               borderColor:
//                 hexToRgba(
//                   branding.buttonColor,
//                   0.15
//                 ),

//               borderTopColor:
//                 branding.buttonColor,
//             }}
//           />

//           <p
//             className="mt-4 text-sm"
//             style={{
//               ...bodyStyle,
//               opacity: 0.6,
//             }}
//           >
//             Loading testimonials...
//           </p>

//         </div>

//       </main>
//     );
//   }


//   /* =======================================================
//      TESTIMONIAL ERROR
//   ======================================================= */

//   if (
//     testimonialError
//   ) {

//     return (
//       <main
//         className="
//           min-h-screen
//           flex
//           items-center
//           justify-center
//           px-5
//         "
//         style={{
//           backgroundColor:
//             branding.pageBackgroundColor,
//         }}
//       >

//         <div className="max-w-lg text-center">

//           <div
//             className="
//               mx-auto
//               flex
//               h-16
//               w-16
//               items-center
//               justify-center
//               rounded-full
//             "
//             style={{
//               backgroundColor:
//                 hexToRgba(
//                   branding.buttonColor,
//                   0.08
//                 ),

//               color:
//                 branding.buttonColor,
//             }}
//           >

//             <Quote size={28} />

//           </div>


//           <h1
//             className="mt-5 text-3xl"
//             style={headingStyle}
//           >
//             Testimonials
//           </h1>


//           <p
//             className="mt-3"
//             style={{
//               ...bodyStyle,
//               opacity: 0.6,
//             }}
//           >
//             Unable to load
//             testimonials right now.
//           </p>


//           <p
//             className="
//               mt-2
//               text-xs
//             "
//             style={{
//               color:
//                 branding.textColor,
//               opacity: 0.45,
//             }}
//           >
//             {testimonialError}
//           </p>

//         </div>

//       </main>
//     );
//   }


//   /* =======================================================
//      MAIN PAGE
//   ======================================================= */

//   return (
//     <main
//       className="min-h-screen"
//       style={{
//         backgroundColor:
//           branding.pageBackgroundColor,

//         color:
//           branding.textColor,

//         fontFamily:
//           fontFamily(
//             branding.fontBody
//           ),
//       }}
//     >

//       {/* ===================================================
//           HERO BANNER
//       =================================================== */}

//       <section
//         className="
//           w-full
//           overflow-hidden
//         "
//       >

//         {bannersLoading ? (

//           <div
//             className="
//               flex
//               min-h-[240px]
//               items-center
//               justify-center
//               sm:min-h-[300px]
//               md:min-h-[360px]
//             "
//             style={{
//               backgroundColor:
//                 branding.cardBackgroundColor,
//             }}
//           >

//             <p
//               style={bodyStyle}
//             >
//               Loading banner...
//             </p>

//           </div>

//         ) : testimonialBannerImage ? (

//           <img
//             src={
//               testimonialBannerImage
//             }
//             alt={
//               testimonialBanner?.title ||
//               `${instituteName} Testimonials`
//             }
//             className="
//               block
//               h-[220px]
//               w-full
//               object-cover
//               sm:h-[300px]
//               md:h-[380px]
//               lg:h-[430px]
//             "
//             onError={(event) => {

//               console.error(
//                 "TESTIMONIAL BANNER IMAGE FAILED:",
//                 testimonialBannerImage
//               );

//               event.currentTarget.style.display =
//                 "none";

//             }}
//           />

//         ) : (

//           <div
//             className="
//               flex
//               min-h-[240px]
//               items-center
//               justify-center
//               px-5
//               text-center
//               sm:min-h-[300px]
//               md:min-h-[360px]
//             "
//             style={{
//               background:
//                 `linear-gradient(
//                   135deg,
//                   ${branding.buttonColor},
//                   ${branding.subheadingColor}
//                 )`,
//             }}
//           >

//             <div>

//               <p
//                 className="
//                   text-xs
//                   uppercase
//                   tracking-[0.2em]
//                 "
//                 style={{
//                   color:
//                     branding.buttonTextColor,

//                   opacity: 0.8,
//                 }}
//               >
//                 {instituteName}
//               </p>


//               <h1
//                 className="
//                   mt-3
//                   text-4xl
//                   font-bold
//                   sm:text-5xl
//                   md:text-6xl
//                 "
//                 style={{
//                   color:
//                     branding.buttonTextColor,

//                   fontFamily:
//                     fontFamily(
//                       branding.fontHeading
//                     ),
//                 }}
//               >
//                 Testimonials
//               </h1>

//             </div>

//           </div>

//         )}

//       </section>


//       {/* ===================================================
//           FILTER BUTTONS
//       =================================================== */}

//       <section
//         className="
//           px-5
//           py-8
//           sm:py-10
//         "
//       >

//         <div
//           className="
//             mx-auto
//             flex
//             max-w-7xl
//             flex-wrap
//             items-center
//             justify-center
//             gap-3
//           "
//         >

//           <FilterButton
//             label="All"
//             value="all"
//             activeFilter={activeFilter}
//             setActiveFilter={setActiveFilter}
//             branding={branding}
//           />

//           <FilterButton
//             label="Text"
//             value="text"
//             activeFilter={activeFilter}
//             setActiveFilter={setActiveFilter}
//             branding={branding}
//           />

//           <FilterButton
//             label="Video"
//             value="video"
//             activeFilter={activeFilter}
//             setActiveFilter={setActiveFilter}
//             branding={branding}
//           />

//         </div>

//       </section>


//       {/* ===================================================
//           TEXT TESTIMONIALS
//       =================================================== */}

//       {(activeFilter === "all" ||
//         activeFilter === "text") && (

//         <section
//           className="
//             px-5
//             pb-14
//           "
//         >

//           <div
//             className="
//               mx-auto
//               max-w-7xl
//             "
//           >

//             <SectionHeading
//               title="What Our Learners Say"
//               subtitle={`Real experiences from learners at ${instituteName}.`}
//               branding={branding}
//             />


//             {textTestimonials.length > 0 ? (

//               <div
//                 className="
//                   grid
//                   grid-cols-1
//                   gap-5
//                   sm:grid-cols-2
//                   lg:grid-cols-3
//                 "
//               >

//                 {textTestimonials.map(
//                   (
//                     testimonial,
//                     index
//                   ) => (

//                     <TestimonialCard
//                       key={
//                         testimonial?.id ||
//                         `text-${index}`
//                       }
//                       testimonial={
//                         testimonial
//                       }
//                       branding={
//                         branding
//                       }
//                       index={
//                         index
//                       }
//                     />

//                   )
//                 )}

//               </div>

//             ) : (

//               <EmptySection
//                 message="No text testimonials available yet."
//                 branding={branding}
//               />

//             )}

//           </div>

//         </section>

//       )}


//       {/* ===================================================
//           VIDEO TESTIMONIALS
//       =================================================== */}

//       {(activeFilter === "all" ||
//         activeFilter === "video") && (

//         <section
//           className="
//             px-5
//             pb-16
//             pt-4
//           "
//           style={{
//             backgroundColor:
//               hexToRgba(
//                 branding.buttonColor,
//                 0.035
//               ),
//           }}
//         >

//           <div
//             className="
//               mx-auto
//               max-w-7xl
//             "
//           >

//             <SectionHeading
//               title="Video Testimonials"
//               subtitle="Watch learners share their experiences."
//               branding={branding}
//             />


//             {videoTestimonials.length > 0 ? (

//               <div
//                 className="
//                   grid
//                   grid-cols-1
//                   gap-6
//                   sm:grid-cols-2
//                   lg:grid-cols-3
//                 "
//               >

//                 {videoTestimonials.map(
//                   (
//                     testimonial,
//                     index
//                   ) => (

//                     <VideoTestimonialCard
//                       key={
//                         testimonial?.id ||
//                         `video-${index}`
//                       }
//                       testimonial={
//                         testimonial
//                       }
//                       branding={
//                         branding
//                       }
//                     />

//                   )
//                 )}

//               </div>

//             ) : (

//               <EmptySection
//                 message="No video testimonials available yet."
//                 branding={branding}
//               />

//             )}

//           </div>

//         </section>

//       )}

//     </main>
//   );
// }


// /* =========================================================
//    FILTER BUTTON
// ========================================================= */

// function FilterButton({
//   label,
//   value,
//   activeFilter,
//   setActiveFilter,
//   branding,
// }) {

//   const active =
//     activeFilter === value;


//   return (
//     <button
//       type="button"
//       onClick={() =>
//         setActiveFilter(value)
//       }
//       className="
//         min-w-[100px]
//         px-6
//         py-3
//         text-sm
//         font-semibold
//         transition-all
//         duration-200
//         hover:-translate-y-0.5
//       "
//       style={{
//         backgroundColor:
//           active
//             ? branding.buttonColor
//             : branding.cardBackgroundColor,

//         color:
//           active
//             ? branding.buttonTextColor
//             : branding.textColor,

//         border:
//           `1px solid ${
//             active
//               ? branding.buttonColor
//               : hexToRgba(
//                   branding.textColor,
//                   0.14
//                 )
//           }`,

//         borderRadius:
//           buttonRadius(
//             branding
//           ),

//         fontFamily:
//           fontFamily(
//             branding.fontSubheading
//           ),

//         fontWeight:
//           branding.subheadingWeight,

//         boxShadow:
//           active
//             ? `0 8px 20px ${hexToRgba(
//                 branding.buttonColor,
//                 0.18
//               )}`
//             : "none",
//       }}
//     >
//       {label}
//     </button>
//   );
// }


// /* =========================================================
//    SECTION HEADING
// ========================================================= */

// function SectionHeading({
//   title,
//   subtitle,
//   branding,
// }) {

//   return (
//     <div
//       className="
//         mb-8
//         text-center
//       "
//     >

//       <h2
//         className="
//           text-3xl
//           md:text-4xl
//         "
//         style={{
//           color:
//             branding.headingColor,

//           fontFamily:
//             fontFamily(
//               branding.fontHeading
//             ),

//           fontWeight:
//             branding.headingWeight,

//           lineHeight:
//             branding.headingLineHeight,
//         }}
//       >
//         {title}
//       </h2>


//       <div
//         className="
//           mx-auto
//           mt-3
//           h-[3px]
//           w-14
//           rounded-full
//         "
//         style={{
//           backgroundColor:
//             branding.buttonColor,
//         }}
//       />


//       {subtitle && (
//         <p
//           className="
//             mx-auto
//             mt-3
//             max-w-xl
//             text-sm
//             md:text-base
//           "
//           style={{
//             color:
//               branding.textColor,

//             fontFamily:
//               fontFamily(
//                 branding.fontBody
//               ),

//             opacity: 0.6,
//           }}
//         >
//           {subtitle}
//         </p>
//       )}

//     </div>
//   );
// }


// /* =========================================================
//    TEXT TESTIMONIAL CARD
// ========================================================= */

// function TestimonialCard({
//   testimonial,
//   branding,
//   index,
// }) {

//   const name =
//     getStudentName(
//       testimonial
//     );


//   const role =
//     getStudentRole(
//       testimonial
//     );


//   const text =
//     getTestimonialText(
//       testimonial
//     ) ||
//     "Amazing learning experience!";


//   const avatar =
//     getAvatar(
//       testimonial
//     );


//   const rating =
//     getRating(
//       testimonial
//     );


//   const cardBackground =
//     index % 3 === 0
//       ? hexToRgba(
//           branding.buttonColor,
//           0.07
//         )
//       : index % 3 === 1
//         ? hexToRgba(
//             branding.subheadingColor,
//             0.07
//           )
//         : hexToRgba(
//             branding.iconColor,
//             0.08
//           );


//   return (
//     <article
//       className="
//         relative
//         flex
//         min-h-[250px]
//         flex-col
//         rounded-2xl
//         p-6
//         transition-all
//         duration-200
//         hover:-translate-y-1
//         hover:shadow-lg
//       "
//       style={{
//         backgroundColor:
//           cardBackground,

//         border:
//           `1px solid ${hexToRgba(
//             branding.textColor,
//             0.07
//           )}`,
//       }}
//     >

//       <div
//         className="
//           flex
//           items-start
//           justify-between
//         "
//       >

//         <Quote
//           size={34}
//           fill={
//             branding.buttonColor
//           }
//           style={{
//             color:
//               branding.buttonColor,
//             opacity: 0.9,
//           }}
//         />


//         <div className="flex gap-0.5">

//           {[1, 2, 3, 4, 5].map(
//             (star) => (

//               <Star
//                 key={star}
//                 size={15}
//                 fill={
//                   star <= rating
//                     ? branding.iconColor
//                     : "none"
//                 }
//                 style={{
//                   color:
//                     branding.iconColor,
//                 }}
//               />

//             )
//           )}

//         </div>

//       </div>


//       <p
//         className="
//           mt-5
//           flex-1
//           text-sm
//           italic
//           md:text-base
//         "
//         style={{
//           color:
//             branding.textColor,

//           fontFamily:
//             fontFamily(
//               branding.fontBody
//             ),

//           fontWeight:
//             branding.bodyWeight,

//           lineHeight:
//             branding.bodyLineHeight,

//           opacity: 0.82,
//         }}
//       >
//         “{text}”
//       </p>


//       <div
//         className="
//           mt-6
//           flex
//           items-center
//           gap-3
//         "
//       >

//         {avatar ? (

//           <img
//             src={avatar}
//             alt={name}
//             className="
//               h-12
//               w-12
//               rounded-full
//               object-cover
//             "
//           />

//         ) : (

//           <div
//             className="
//               flex
//               h-12
//               w-12
//               items-center
//               justify-center
//               rounded-full
//             "
//             style={{
//               backgroundColor:
//                 branding.buttonColor,

//               color:
//                 branding.buttonTextColor,

//               fontFamily:
//                 fontFamily(
//                   branding.fontHeading
//                 ),

//               fontWeight:
//                 branding.headingWeight,
//             }}
//           >
//             {name
//               .charAt(0)
//               .toUpperCase()}
//           </div>

//         )}


//         <div>

//           <h3
//             className="text-sm"
//             style={{
//               color:
//                 branding.headingColor,

//               fontFamily:
//                 fontFamily(
//                   branding.fontHeading
//                 ),

//               fontWeight:
//                 branding.subheadingWeight,
//             }}
//           >
//             {name}
//           </h3>


//           <p
//             className="text-xs"
//             style={{
//               color:
//                 branding.textColor,

//               fontFamily:
//                 fontFamily(
//                   branding.fontBody
//                 ),

//               opacity: 0.55,
//             }}
//           >
//             {role}
//           </p>

//         </div>

//       </div>

//     </article>
//   );
// }


// /* =========================================================
//    VIDEO TESTIMONIAL CARD
// ========================================================= */

// function VideoTestimonialCard({
//   testimonial,
//   branding,
// }) {

//   const name =
//     getStudentName(
//       testimonial
//     );


//   const role =
//     getStudentRole(
//       testimonial
//     );


//   const video =
//     getVideoUrl(
//       testimonial
//     );


//   const thumbnail =
//     getVideoThumbnail(
//       testimonial
//     );


//   const title =
//     testimonial?.video_title ||
//     testimonial?.videoTitle ||
//     testimonial?.title ||
//     `My Journey with ${name}`;


//   return (
//     <article
//       className="
//         overflow-hidden
//         rounded-2xl
//         shadow-sm
//         transition-all
//         duration-200
//         hover:-translate-y-1
//         hover:shadow-lg
//       "
//       style={{
//         backgroundColor:
//           branding.cardBackgroundColor,

//         border:
//           `1px solid ${hexToRgba(
//             branding.textColor,
//             0.09
//           )}`,
//       }}
//     >

//       <div
//         className="
//           relative
//           aspect-video
//           overflow-hidden
//         "
//         style={{
//           backgroundColor:
//             branding.navbarColor,
//         }}
//       >

//         {video ? (

//           <video
//             src={video}
//             poster={
//               thumbnail ||
//               undefined
//             }
//             controls
//             preload="metadata"
//             className="
//               h-full
//               w-full
//               object-cover
//             "
//           />

//         ) : (

//           <div
//             className="
//               flex
//               h-full
//               items-center
//               justify-center
//             "
//             style={{
//               color:
//                 branding.buttonTextColor,
//             }}
//           >

//             <Play
//               size={48}
//               fill="currentColor"
//               style={{
//                 opacity: 0.5,
//               }}
//             />

//           </div>

//         )}

//       </div>


//       <div className="px-5 py-4">

//         <h3
//           className="text-sm md:text-base"
//           style={{
//             color:
//               branding.headingColor,

//             fontFamily:
//               fontFamily(
//                 branding.fontHeading
//               ),

//             fontWeight:
//               branding.subheadingWeight,
//           }}
//         >
//           {title}
//         </h3>


//         <div
//           className="
//             mt-2
//             flex
//             flex-wrap
//             items-center
//             gap-2
//             text-xs
//           "
//         >

//           <span
//             style={{
//               color:
//                 branding.buttonColor,

//               fontWeight:
//                 branding.subheadingWeight,
//             }}
//           >
//             {name}
//           </span>


//           <span
//             style={{
//               opacity: 0.3,
//             }}
//           >
//             •
//           </span>


//           <span
//             style={{
//               opacity: 0.55,
//             }}
//           >
//             {role}
//           </span>

//         </div>

//       </div>

//     </article>
//   );
// }


// /* =========================================================
//    EMPTY SECTION
// ========================================================= */

// function EmptySection({
//   message,
//   branding,
// }) {

//   return (
//     <div
//       className="
//         rounded-2xl
//         px-5
//         py-12
//         text-center
//       "
//       style={{
//         backgroundColor:
//           branding.cardBackgroundColor,

//         border:
//           `1px solid ${hexToRgba(
//             branding.textColor,
//             0.07
//           )}`,
//       }}
//     >

//       <Quote
//         size={30}
//         className="mx-auto"
//         style={{
//           color:
//             branding.buttonColor,
//           opacity: 0.5,
//         }}
//       />


//       <p
//         className="mt-3 text-sm"
//         style={{
//           color:
//             branding.textColor,
//           opacity: 0.55,
//         }}
//       >
//         {message}
//       </p>

//     </div>
//   );
// }


// /* =========================================================
//    BANNER ACTIVE CHECK
// ========================================================= */

// function isActiveBanner(
//   banner
// ) {

//   const value =
//     banner?.is_active ??
//     banner?.isActive;


//   if (
//     value === undefined ||
//     value === null
//   ) {
//     return true;
//   }


//   return (
//     value === true ||
//     value === 1 ||
//     value === "1" ||
//     value === "true" ||
//     String(value).toUpperCase() ===
//       "ACTIVE"
//   );
// }


// /* =========================================================
//    TESTIMONIAL HELPERS
// ========================================================= */

// function getStudentName(
//   testimonial
// ) {

//   return (
//     testimonial?.student_name ||
//     testimonial?.studentName ||
//     testimonial?.name ||
//     "Student"
//   );
// }


// function getStudentRole(
//   testimonial
// ) {

//   return (
//     testimonial?.role ||
//     testimonial?.student_role ||
//     testimonial?.designation ||
//     "Student"
//   );
// }


// function getTestimonialText(
//   testimonial
// ) {

//   return (
//     testimonial?.testimonial_text ||
//     testimonial?.testimonialText ||
//     testimonial?.review ||
//     testimonial?.comment ||
//     testimonial?.message ||
//     ""
//   );
// }


// function getAvatar(
//   testimonial
// ) {

//   return (
//     testimonial?.avatar ||
//     testimonial?.student_image ||
//     testimonial?.profile_image ||
//     testimonial?.profileImage ||
//     testimonial?.image ||
//     null
//   );
// }


// function getVideoUrl(
//   testimonial
// ) {

//   return (
//     testimonial?.video_url ||
//     testimonial?.videoUrl ||
//     testimonial?.video ||
//     null
//   );
// }


// function getVideoThumbnail(
//   testimonial
// ) {

//   return (
//     testimonial?.video_thumbnail ||
//     testimonial?.videoThumbnail ||
//     testimonial?.thumbnail ||
//     testimonial?.thumbnail_url ||
//     getAvatar(testimonial)
//   );
// }


// function getRating(
//   testimonial
// ) {

//   const rating =
//     Number(
//       testimonial?.rating ?? 5
//     );


//   if (
//     Number.isNaN(rating)
//   ) {
//     return 5;
//   }


//   return Math.min(
//     5,
//     Math.max(
//       0,
//       Math.round(rating)
//     )
//   );
// }

// import { useEffect, useMemo, useState } from "react";
// import { useOutletContext } from "react-router-dom";
// import {
//   Star,
//   Play,
//   Quote,
// } from "lucide-react";

// import {
//   getInstituteTestimonials,
// } from "../../services/testimonialService";


// /* =========================================================
//    DEFAULT BRANDING
// ========================================================= */

// const DEFAULT_BRANDING = {
//   navbarColor: "#1F2937",

//   headingColor: "#111827",
//   subheadingColor: "#5B21B6",
//   textColor: "#111827",
//   iconColor: "#F59E0B",

//   buttonColor: "#7C3AED",
//   buttonTextColor: "#FFFFFF",

//   pageBackgroundColor: "#FAFAF9",
//   cardBackgroundColor: "#FFFFFF",

//   footerBackgroundColor: "#1F2937",
//   footerHeadingColor: "#FFFFFF",
//   footerTextColor: "#FAFAF9",

//   fontHeading: "Inter",
//   fontSubheading: "Inter",
//   fontBody: "Inter",

//   headingWeight: 700,
//   headingLineHeight: 1.15,
//   headingLetterSpacing: 0,

//   subheadingWeight: 600,
//   subheadingLineHeight: 1.4,

//   bodyWeight: 400,
//   bodyLineHeight: 1.6,
//   bodyLetterSpacing: 0,

//   roundedButtons: true,
// };


// /* =========================================================
//    DEFAULT CONTENT
// ========================================================= */

// const DEFAULT_CONTENT = {
//   testimonials: {
//     eyebrow: "TESTIMONIALS",

//     heading: "What Our Students Say",

//     subheading:
//       "Hear what our students have to say about their learning experience.",

//     textTestimonials: {
//       heading: "What Our Learners Say",

//       subheading:
//         "Real experiences from learners at our institute.",
//     },

//     videoTestimonials: {
//       heading: "Video Testimonials",

//       subheading:
//         "Watch our learners share their experiences.",
//     },

//     filters: {
//       all: "All",
//       text: "Text",
//       video: "Video",
//     },
//   },
// };


// /* =========================================================
//    DEFAULT SECTIONS
// ========================================================= */

// const DEFAULT_SECTIONS = {
//   testimonials: {
//     hero: true,
//     textTestimonials: true,
//     videoTestimonials: true,
//   },
// };


// /* =========================================================
//    GET VALUE
// ========================================================= */

// const getValue = (
//   ...values
// ) => {
//   for (const value of values) {
//     if (
//       value !== undefined &&
//       value !== null &&
//       value !== ""
//     ) {
//       return value;
//     }
//   }

//   return null;
// };


// /* =========================================================
//    BRANDING HELPERS
// ========================================================= */

// const getBrandingValue = (
//   branding,
//   camelKey,
//   snakeKey,
//   fallback
// ) => {
//   const value =
//     branding?.[camelKey] ??
//     branding?.[snakeKey];

//   return (
//     value !== undefined &&
//     value !== null &&
//     value !== ""
//   )
//     ? value
//     : fallback;
// };


// const normalizeBranding = (
//   branding = {}
// ) => ({
//   navbarColor: getBrandingValue(
//     branding,
//     "navbarColor",
//     "navbar_color",
//     DEFAULT_BRANDING.navbarColor
//   ),

//   headingColor: getBrandingValue(
//     branding,
//     "headingColor",
//     "heading_color",
//     DEFAULT_BRANDING.headingColor
//   ),

//   subheadingColor: getBrandingValue(
//     branding,
//     "subheadingColor",
//     "subheading_color",
//     DEFAULT_BRANDING.subheadingColor
//   ),

//   textColor: getBrandingValue(
//     branding,
//     "textColor",
//     "text_color",
//     DEFAULT_BRANDING.textColor
//   ),

//   iconColor: getBrandingValue(
//     branding,
//     "iconColor",
//     "icon_color",
//     DEFAULT_BRANDING.iconColor
//   ),

//   buttonColor: getBrandingValue(
//     branding,
//     "buttonColor",
//     "button_color",
//     DEFAULT_BRANDING.buttonColor
//   ),

//   buttonTextColor: getBrandingValue(
//     branding,
//     "buttonTextColor",
//     "button_text_color",
//     DEFAULT_BRANDING.buttonTextColor
//   ),

//   pageBackgroundColor: getBrandingValue(
//     branding,
//     "pageBackgroundColor",
//     "page_background_color",
//     DEFAULT_BRANDING.pageBackgroundColor
//   ),

//   cardBackgroundColor: getBrandingValue(
//     branding,
//     "cardBackgroundColor",
//     "card_background_color",
//     DEFAULT_BRANDING.cardBackgroundColor
//   ),

//   footerBackgroundColor: getBrandingValue(
//     branding,
//     "footerBackgroundColor",
//     "footer_background_color",
//     DEFAULT_BRANDING.footerBackgroundColor
//   ),

//   footerHeadingColor: getBrandingValue(
//     branding,
//     "footerHeadingColor",
//     "footer_heading_color",
//     DEFAULT_BRANDING.footerHeadingColor
//   ),

//   footerTextColor: getBrandingValue(
//     branding,
//     "footerTextColor",
//     "footer_text_color",
//     DEFAULT_BRANDING.footerTextColor
//   ),

//   fontHeading: getBrandingValue(
//     branding,
//     "fontHeading",
//     "font_heading",
//     DEFAULT_BRANDING.fontHeading
//   ),

//   fontSubheading: getBrandingValue(
//     branding,
//     "fontSubheading",
//     "font_subheading",
//     DEFAULT_BRANDING.fontSubheading
//   ),

//   fontBody: getBrandingValue(
//     branding,
//     "fontBody",
//     "font_body",
//     DEFAULT_BRANDING.fontBody
//   ),

//   headingWeight: getBrandingValue(
//     branding,
//     "headingWeight",
//     "heading_weight",
//     DEFAULT_BRANDING.headingWeight
//   ),

//   headingLineHeight: getBrandingValue(
//     branding,
//     "headingLineHeight",
//     "heading_line_height",
//     DEFAULT_BRANDING.headingLineHeight
//   ),

//   headingLetterSpacing: getBrandingValue(
//     branding,
//     "headingLetterSpacing",
//     "heading_letter_spacing",
//     DEFAULT_BRANDING.headingLetterSpacing
//   ),

//   subheadingWeight: getBrandingValue(
//     branding,
//     "subheadingWeight",
//     "subheading_weight",
//     DEFAULT_BRANDING.subheadingWeight
//   ),

//   subheadingLineHeight: getBrandingValue(
//     branding,
//     "subheadingLineHeight",
//     "subheading_line_height",
//     DEFAULT_BRANDING.subheadingLineHeight
//   ),

//   bodyWeight: getBrandingValue(
//     branding,
//     "bodyWeight",
//     "body_weight",
//     DEFAULT_BRANDING.bodyWeight
//   ),

//   bodyLineHeight: getBrandingValue(
//     branding,
//     "bodyLineHeight",
//     "body_line_height",
//     DEFAULT_BRANDING.bodyLineHeight
//   ),

//   bodyLetterSpacing: getBrandingValue(
//     branding,
//     "bodyLetterSpacing",
//     "body_letter_spacing",
//     DEFAULT_BRANDING.bodyLetterSpacing
//   ),

//   roundedButtons: getBrandingValue(
//     branding,
//     "roundedButtons",
//     "rounded_buttons",
//     DEFAULT_BRANDING.roundedButtons
//   ),
// });


// const fontFamily = (
//   font
// ) =>
//   font
//     ? `'${font}', sans-serif`
//     : "Inter, sans-serif";


// const buttonRadius = (
//   branding
// ) =>
//   branding.roundedButtons
//     ? "9999px"
//     : "10px";


// const hexToRgba = (
//   color,
//   alpha
// ) => {
//   if (
//     typeof color !==
//     "string"
//   ) {
//     return color;
//   }

//   const hex =
//     color.replace(
//       "#",
//       ""
//     );

//   if (
//     !/^[0-9A-Fa-f]{6}$/.test(
//       hex
//     )
//   ) {
//     return color;
//   }

//   const r = parseInt(
//     hex.substring(0, 2),
//     16
//   );

//   const g = parseInt(
//     hex.substring(2, 4),
//     16
//   );

//   const b = parseInt(
//     hex.substring(4, 6),
//     16
//   );

//   return `rgba(${r}, ${g}, ${b}, ${alpha})`;
// };


// /* =========================================================
//    CONTENT NORMALIZER
// ========================================================= */

// const normalizeContent = (
//   content = {}
// ) => {
//   const source =
//     content?.testimonials ||
//     content?.testimonial ||
//     content?.Testimonials ||
//     content ||
//     {};

//   return {
//     testimonials: {
//       eyebrow:
//         getValue(
//           source?.eyebrow,
//           source?.eyebrow_text,
//           source?.label,
//           DEFAULT_CONTENT.testimonials.eyebrow
//         ),

//       heading:
//         getValue(
//           source?.heading,
//           source?.title,
//           source?.page_heading,
//           DEFAULT_CONTENT.testimonials.heading
//         ),

//       subheading:
//         getValue(
//           source?.subheading,
//           source?.subtitle,
//           source?.page_subheading,
//           DEFAULT_CONTENT.testimonials.subheading
//         ),

//       textTestimonials: {
//         heading:
//           getValue(
//             source?.textTestimonials?.heading,
//             source?.text_testimonials?.heading,
//             source?.text_heading,
//             DEFAULT_CONTENT.testimonials.textTestimonials.heading
//           ),

//         subheading:
//           getValue(
//             source?.textTestimonials?.subheading,
//             source?.text_testimonials?.subheading,
//             source?.text_subheading,
//             DEFAULT_CONTENT.testimonials.textTestimonials.subheading
//           ),
//       },

//       videoTestimonials: {
//         heading:
//           getValue(
//             source?.videoTestimonials?.heading,
//             source?.video_testimonials?.heading,
//             source?.video_heading,
//             DEFAULT_CONTENT.testimonials.videoTestimonials.heading
//           ),

//         subheading:
//           getValue(
//             source?.videoTestimonials?.subheading,
//             source?.video_testimonials?.subheading,
//             source?.video_subheading,
//             DEFAULT_CONTENT.testimonials.videoTestimonials.subheading
//           ),
//       },

//       filters: {
//         all:
//           getValue(
//             source?.filters?.all,
//             source?.filter_all,
//             DEFAULT_CONTENT.testimonials.filters.all
//           ),

//         text:
//           getValue(
//             source?.filters?.text,
//             source?.filter_text,
//             DEFAULT_CONTENT.testimonials.filters.text
//           ),

//         video:
//           getValue(
//             source?.filters?.video,
//             source?.filter_video,
//             DEFAULT_CONTENT.testimonials.filters.video
//           ),
//       },
//     },
//   };
// };


// /* =========================================================
//    SECTION NORMALIZER
// ========================================================= */

// const normalizeSections = (
//   sections = {}
// ) => {
//   const source =
//     sections?.testimonials ||
//     sections?.testimonial ||
//     sections?.Testimonials ||
//     sections ||
//     {};

//   const getSection = (
//     key,
//     aliases = []
//   ) => {
//     const values = [
//       source?.[key],
//       ...aliases.map(
//         (alias) =>
//           source?.[alias]
//       ),
//     ];

//     for (
//       const value of values
//     ) {
//       if (
//         typeof value ===
//         "boolean"
//       ) {
//         return value;
//       }

//       if (
//         typeof value ===
//         "object" &&
//         value !== null
//       ) {
//         if (
//           typeof value.visible ===
//           "boolean"
//         ) {
//           return value.visible;
//         }

//         if (
//           typeof value.is_visible ===
//           "boolean"
//         ) {
//           return value.is_visible;
//         }
//       }
//     }

//     return true;
//   };

//   return {
//     hero: getSection(
//       "hero",
//       ["banner"]
//     ),

//     textTestimonials:
//       getSection(
//         "textTestimonials",
//         [
//           "text_testimonials",
//           "text",
//         ]
//       ),

//     videoTestimonials:
//       getSection(
//         "videoTestimonials",
//         [
//           "video_testimonials",
//           "video",
//         ]
//       ),
//   };
// };


// /* =========================================================
//    MAIN COMPONENT
// ========================================================= */

// export default function WebsiteTestimonials() {

//   const context =
//     useOutletContext() || {};

//   const {
//     branding:
//       outletBranding = {},

//     content:
//       outletContent = {},

//     sections:
//       outletSections = {},

//     website = {},

//     institute = {},

//     banners = [],

//     bannersLoading = false,
//   } = context;


//   /* =======================================================
//      BRANDING
//   ======================================================= */

//   const branding =
//     useMemo(
//       () =>
//         normalizeBranding(
//           outletBranding
//         ),
//       [outletBranding]
//     );


//   /* =======================================================
//      CONTENT
//   ======================================================= */

//   const content =
//     useMemo(
//       () =>
//         normalizeContent(
//           outletContent
//         ),
//       [outletContent]
//     );


//   /* =======================================================
//      SECTIONS
//   ======================================================= */

//   const sections =
//     useMemo(
//       () =>
//         normalizeSections(
//           outletSections
//         ),
//       [outletSections]
//     );


//   /* =======================================================
//      STATE
//   ======================================================= */

//   const [
//     testimonials,
//     setTestimonials,
//   ] = useState([]);


//   const [
//     loadingTestimonials,
//     setLoadingTestimonials,
//   ] = useState(true);


//   const [
//     testimonialError,
//     setTestimonialError,
//   ] = useState("");


//   const [
//     activeFilter,
//     setActiveFilter,
//   ] = useState("all");


//   /* =======================================================
//      INSTITUTE NAME
//   ======================================================= */

//   const instituteName =
//     institute?.name ||
//     website?.institute?.name ||
//     website?.name ||
//     "Institute";


//   /* =======================================================
//      TESTIMONIAL BANNER
//   ======================================================= */

//   const testimonialBanner =
//     useMemo(() => {

//       const list =
//         Array.isArray(
//           banners
//         )
//           ? banners
//           : [];

//       const banner =
//         list.find(
//           (item) => {

//             const type =
//               String(
//                 item?.banner_type ||
//                 item?.bannerType ||
//                 ""
//               )
//                 .trim()
//                 .toUpperCase();

//             return (
//               type ===
//                 "TESTIMONIAL" &&
//               isActiveBanner(
//                 item
//               )
//             );
//           }
//         );

//       return (
//         banner ||
//         null
//       );

//     }, [banners]);


//   /* =======================================================
//      BANNER IMAGE
//   ======================================================= */

//   const testimonialBannerImage =
//     testimonialBanner?.image_url ||
//     testimonialBanner?.image ||
//     testimonialBanner?.imageUrl ||
//     null;


//   /* =======================================================
//      FETCH TESTIMONIALS
//   ======================================================= */

//   useEffect(() => {

//     let mounted = true;


//     const loadTestimonials =
//       async () => {

//         try {

//           setLoadingTestimonials(
//             true
//           );

//           setTestimonialError("");


//           const result =
//             await getInstituteTestimonials();


//           if (!mounted) {
//             return;
//           }


//           let testimonialList =
//             [];


//           if (
//             Array.isArray(
//               result
//             )
//           ) {

//             testimonialList =
//               result;

//           } else if (
//             Array.isArray(
//               result?.data
//             )
//           ) {

//             testimonialList =
//               result.data;

//           } else if (
//             Array.isArray(
//               result?.testimonials
//             )
//           ) {

//             testimonialList =
//               result.testimonials;

//           } else if (
//             Array.isArray(
//               result?.data?.testimonials
//             )
//           ) {

//             testimonialList =
//               result.data.testimonials;

//           }


//           setTestimonials(
//             testimonialList
//           );

//         } catch (
//           error
//         ) {

//           console.error(
//             "Testimonials API Error:",
//             error
//           );


//           if (!mounted) {
//             return;
//           }


//           setTestimonials(
//             []
//           );


//           setTestimonialError(
//             error?.response
//               ?.data?.message ||
//               error?.message ||
//               "Failed to load testimonials."
//           );

//         } finally {

//           if (mounted) {
//             setLoadingTestimonials(
//               false
//             );
//           }

//         }
//       };


//     loadTestimonials();


//     return () => {
//       mounted = false;
//     };

//   }, []);


//   /* =======================================================
//      FILTER TESTIMONIALS
//   ======================================================= */

//   const textTestimonials =
//     useMemo(
//       () =>
//         testimonials.filter(
//           (
//             testimonial
//           ) =>
//             !getVideoUrl(
//               testimonial
//             )
//         ),
//       [testimonials]
//     );


//   const videoTestimonials =
//     useMemo(
//       () =>
//         testimonials.filter(
//           (
//             testimonial
//           ) =>
//             Boolean(
//               getVideoUrl(
//                 testimonial
//               )
//             )
//         ),
//       [testimonials]
//     );


//   /* =======================================================
//      FILTERED CONTENT
//   ======================================================= */

//   const showText =
//     sections.textTestimonials &&
//     (
//       activeFilter ===
//         "all" ||
//       activeFilter ===
//         "text"
//     );


//   const showVideo =
//     sections.videoTestimonials &&
//     (
//       activeFilter ===
//         "all" ||
//       activeFilter ===
//         "video"
//     );


//   /* =======================================================
//      SHARED STYLES
//   ======================================================= */

//   const headingStyle = {
//     color:
//       branding.headingColor,

//     fontFamily:
//       fontFamily(
//         branding.fontHeading
//       ),

//     fontWeight:
//       branding.headingWeight,

//     lineHeight:
//       branding.headingLineHeight,

//     letterSpacing:
//       branding.headingLetterSpacing,
//   };


//   const bodyStyle = {
//     color:
//       branding.textColor,

//     fontFamily:
//       fontFamily(
//         branding.fontBody
//       ),

//     fontWeight:
//       branding.bodyWeight,

//     lineHeight:
//       branding.bodyLineHeight,

//     letterSpacing:
//       branding.bodyLetterSpacing,
//   };


//   /* =======================================================
//      LOADING
//   ======================================================= */

//   if (
//     loadingTestimonials
//   ) {

//     return (
//       <main
//         className="
//           flex
//           min-h-screen
//           items-center
//           justify-center
//         "
//         style={{
//           backgroundColor:
//             branding.pageBackgroundColor,

//           fontFamily:
//             fontFamily(
//               branding.fontBody
//             ),
//         }}
//       >

//         <div
//           className="
//             text-center
//           "
//         >

//           <div
//             className="
//               mx-auto
//               h-10
//               w-10
//               animate-spin
//               rounded-full
//               border-4
//             "
//             style={{
//               borderColor:
//                 hexToRgba(
//                   branding.buttonColor,
//                   0.15
//                 ),

//               borderTopColor:
//                 branding.buttonColor,
//             }}
//           />


//           <p
//             className="
//               mt-4
//               text-sm
//             "
//             style={{
//               ...bodyStyle,
//               opacity: 0.6,
//             }}
//           >
//             Loading testimonials...
//           </p>

//         </div>

//       </main>
//     );
//   }


//   /* =======================================================
//      ERROR
//   ======================================================= */

//   if (
//     testimonialError
//   ) {

//     return (
//       <main
//         className="
//           flex
//           min-h-screen
//           items-center
//           justify-center
//           px-5
//         "
//         style={{
//           backgroundColor:
//             branding.pageBackgroundColor,
//         }}
//       >

//         <div
//           className="
//             max-w-lg
//             text-center
//           "
//         >

//           <div
//             className="
//               mx-auto
//               flex
//               h-16
//               w-16
//               items-center
//               justify-center
//               rounded-full
//             "
//             style={{
//               backgroundColor:
//                 hexToRgba(
//                   branding.buttonColor,
//                   0.08
//                 ),

//               color:
//                 branding.buttonColor,
//             }}
//           >
//             <Quote
//               size={28}
//             />
//           </div>


//           <h1
//             className="
//               mt-5
//               text-3xl
//             "
//             style={headingStyle}
//           >
//             {content.testimonials.heading}
//           </h1>


//           <p
//             className="
//               mt-3
//             "
//             style={{
//               ...bodyStyle,
//               opacity: 0.6,
//             }}
//           >
//             Unable to load
//             testimonials right now.
//           </p>


//           <p
//             className="
//               mt-2
//               text-xs
//             "
//             style={{
//               ...bodyStyle,
//               opacity: 0.45,
//             }}
//           >
//             {testimonialError}
//           </p>

//         </div>

//       </main>
//     );
//   }


//   /* =======================================================
//      MAIN PAGE
//   ======================================================= */

//   return (
//     <main
//       className="
//         min-h-screen
//       "
//       style={{
//         backgroundColor:
//           branding.pageBackgroundColor,

//         color:
//           branding.textColor,

//         fontFamily:
//           fontFamily(
//             branding.fontBody
//           ),
//       }}
//     >

//       {/* ===================================================
//           HERO
//       =================================================== */}

//       {sections.hero && (
//         <section
//           className="
//             w-full
//             overflow-hidden
//           "
//         >

//           {bannersLoading ? (

//             <div
//               className="
//                 flex
//                 min-h-[240px]
//                 items-center
//                 justify-center
//                 sm:min-h-[300px]
//                 md:min-h-[360px]
//               "
//               style={{
//                 backgroundColor:
//                   branding.cardBackgroundColor,
//               }}
//             >

//               <p
//                 style={bodyStyle}
//               >
//                 Loading banner...
//               </p>

//             </div>

//           ) : testimonialBannerImage ? (

//             <div
//               className="
//                 relative
//               "
//             >

//               <img
//                 src={
//                   testimonialBannerImage
//                 }
//                 alt={
//                   testimonialBanner?.title ||
//                   content.testimonials.heading
//                 }
//                 className="
//                   block
//                   h-[220px]
//                   w-full
//                   object-cover
//                   sm:h-[300px]
//                   md:h-[380px]
//                   lg:h-[430px]
//                 "
//                 onError={(
//                   event
//                 ) => {
//                   event.currentTarget.style.display =
//                     "none";
//                 }}
//               />


//               <div
//                 className="
//                   absolute
//                   inset-0
//                 "
//                 style={{
//                   background:
//                     `linear-gradient(
//                       to right,
//                       rgba(0,0,0,0.72),
//                       rgba(0,0,0,0.25),
//                       rgba(0,0,0,0.08)
//                     )`,
//                 }}
//               />


//               <div
//                 className="
//                   absolute
//                   inset-0
//                   flex
//                   items-center
//                 "
//               >

//                 <div
//                   className="
//                     mx-auto
//                     w-full
//                     max-w-7xl
//                     px-5
//                     sm:px-8
//                     lg:px-10
//                   "
//                 >

//                   {content.testimonials.eyebrow && (
//                     <p
//                       className="
//                         text-xs
//                         uppercase
//                         tracking-[0.2em]
//                       "
//                       style={{
//                         color:
//                           branding.buttonTextColor,

//                         fontFamily:
//                           fontFamily(
//                             branding.fontSubheading
//                           ),

//                         fontWeight:
//                           branding.subheadingWeight,
//                       }}
//                     >
//                       {
//                         content
//                           .testimonials
//                           .eyebrow
//                       }
//                     </p>
//                   )}


//                   <h1
//                     className="
//                       mt-2
//                       max-w-3xl
//                       text-4xl
//                       sm:text-5xl
//                       md:text-6xl
//                     "
//                     style={{
//                       color:
//                         branding.buttonTextColor,

//                       fontFamily:
//                         fontFamily(
//                           branding.fontHeading
//                         ),

//                       fontWeight:
//                         branding.headingWeight,

//                       lineHeight:
//                         branding.headingLineHeight,
//                     }}
//                   >
//                     {
//                       content
//                         .testimonials
//                         .heading
//                     }
//                   </h1>


//                   {content.testimonials.subheading && (
//                     <p
//                       className="
//                         mt-4
//                         max-w-2xl
//                         text-sm
//                         sm:text-base
//                       "
//                       style={{
//                         color:
//                           branding.buttonTextColor,

//                         fontFamily:
//                           fontFamily(
//                             branding.fontBody
//                           ),

//                         opacity: 0.9,

//                         lineHeight:
//                           branding.bodyLineHeight,
//                       }}
//                     >
//                       {
//                         content
//                           .testimonials
//                           .subheading
//                       }
//                     </p>
//                   )}

//                 </div>

//               </div>

//             </div>

//           ) : (

//             <div
//               className="
//                 relative
//                 flex
//                 min-h-[260px]
//                 items-center
//                 justify-center
//                 overflow-hidden
//                 px-5
//                 text-center
//                 sm:min-h-[320px]
//                 md:min-h-[380px]
//               "
//               style={{
//                 background:
//                   `linear-gradient(
//                     135deg,
//                     ${branding.buttonColor},
//                     ${branding.subheadingColor}
//                   )`,
//               }}
//             >

//               <div>

//                 {content.testimonials.eyebrow && (
//                   <p
//                     className="
//                       text-xs
//                       uppercase
//                       tracking-[0.2em]
//                     "
//                     style={{
//                       color:
//                         branding.buttonTextColor,

//                       fontFamily:
//                         fontFamily(
//                           branding.fontSubheading
//                         ),

//                       fontWeight:
//                         branding.subheadingWeight,

//                       opacity: 0.85,
//                     }}
//                   >
//                     {
//                       content
//                         .testimonials
//                         .eyebrow
//                     }
//                   </p>
//                 )}


//                 <h1
//                   className="
//                     mt-3
//                     text-4xl
//                     sm:text-5xl
//                     md:text-6xl
//                   "
//                   style={{
//                     color:
//                       branding.buttonTextColor,

//                     fontFamily:
//                       fontFamily(
//                         branding.fontHeading
//                       ),

//                     fontWeight:
//                       branding.headingWeight,

//                     lineHeight:
//                       branding.headingLineHeight,
//                   }}
//                 >
//                   {
//                     content
//                       .testimonials
//                       .heading
//                   }
//                 </h1>


//                 {content.testimonials.subheading && (
//                   <p
//                     className="
//                       mx-auto
//                       mt-4
//                       max-w-2xl
//                       text-sm
//                       sm:text-base
//                     "
//                     style={{
//                       color:
//                         branding.buttonTextColor,

//                       opacity: 0.9,

//                       fontFamily:
//                         fontFamily(
//                           branding.fontBody
//                         ),

//                       lineHeight:
//                         branding.bodyLineHeight,
//                     }}
//                   >
//                     {
//                       content
//                         .testimonials
//                         .subheading
//                     }
//                   </p>
//                 )}

//               </div>

//             </div>
//           )}

//         </section>
//       )}


//       {/* ===================================================
//           FILTERS
//       =================================================== */}

//       {(sections.textTestimonials ||
//         sections.videoTestimonials) && (

//         <section
//           className="
//             px-5
//             py-8
//             sm:py-10
//           "
//         >

//           <div
//             className="
//               mx-auto
//               flex
//               max-w-7xl
//               flex-wrap
//               items-center
//               justify-center
//               gap-3
//             "
//           >

//             <FilterButton
//               label={
//                 content
//                   .testimonials
//                   .filters
//                   .all
//               }
//               value="all"
//               activeFilter={
//                 activeFilter
//               }
//               setActiveFilter={
//                 setActiveFilter
//               }
//               branding={
//                 branding
//               }
//             />


//             {sections.textTestimonials && (
//               <FilterButton
//                 label={
//                   content
//                     .testimonials
//                     .filters
//                     .text
//                 }
//                 value="text"
//                 activeFilter={
//                   activeFilter
//                 }
//                 setActiveFilter={
//                   setActiveFilter
//                 }
//                 branding={
//                   branding
//                 }
//               />
//             )}


//             {sections.videoTestimonials && (
//               <FilterButton
//                 label={
//                   content
//                     .testimonials
//                     .filters
//                     .video
//                 }
//                 value="video"
//                 activeFilter={
//                   activeFilter
//                 }
//                 setActiveFilter={
//                   setActiveFilter
//                 }
//                 branding={
//                   branding
//                 }
//               />
//             )}

//           </div>

//         </section>
//       )}


//       {/* ===================================================
//           TEXT TESTIMONIALS
//       =================================================== */}

//       {showText && (
//         <section
//           className="
//             px-5
//             pb-14
//           "
//         >

//           <div
//             className="
//               mx-auto
//               max-w-7xl
//             "
//           >

//             <SectionHeading
//               title={
//                 content
//                   .testimonials
//                   .textTestimonials
//                   .heading
//               }
//               subtitle={
//                 content
//                   .testimonials
//                   .textTestimonials
//                   .subheading
//               }
//               branding={
//                 branding
//               }
//             />


//             {textTestimonials.length >
//             0 ? (

//               <div
//                 className="
//                   grid
//                   grid-cols-1
//                   gap-5
//                   sm:grid-cols-2
//                   lg:grid-cols-3
//                 "
//               >

//                 {textTestimonials.map(
//                   (
//                     testimonial,
//                     index
//                   ) => (

//                     <TestimonialCard
//                       key={
//                         testimonial?.id ||
//                         `text-${index}`
//                       }
//                       testimonial={
//                         testimonial
//                       }
//                       branding={
//                         branding
//                       }
//                       index={
//                         index
//                       }
//                     />

//                   )
//                 )}

//               </div>

//             ) : (

//               <EmptySection
//                 message="No text testimonials available yet."
//                 branding={
//                   branding
//                 }
//               />

//             )}

//           </div>

//         </section>
//       )}


//       {/* ===================================================
//           VIDEO TESTIMONIALS
//       =================================================== */}

//       {showVideo && (
//         <section
//           className="
//             px-5
//             pb-16
//             pt-4
//           "
//           style={{
//             backgroundColor:
//               hexToRgba(
//                 branding.buttonColor,
//                 0.035
//               ),
//           }}
//         >

//           <div
//             className="
//               mx-auto
//               max-w-7xl
//             "
//           >

//             <SectionHeading
//               title={
//                 content
//                   .testimonials
//                   .videoTestimonials
//                   .heading
//               }
//               subtitle={
//                 content
//                   .testimonials
//                   .videoTestimonials
//                   .subheading
//               }
//               branding={
//                 branding
//               }
//             />


//             {videoTestimonials.length >
//             0 ? (

//               <div
//                 className="
//                   grid
//                   grid-cols-1
//                   gap-6
//                   sm:grid-cols-2
//                   lg:grid-cols-3
//                 "
//               >

//                 {videoTestimonials.map(
//                   (
//                     testimonial,
//                     index
//                   ) => (

//                     <VideoTestimonialCard
//                       key={
//                         testimonial?.id ||
//                         `video-${index}`
//                       }
//                       testimonial={
//                         testimonial
//                       }
//                       branding={
//                         branding
//                       }
//                     />

//                   )
//                 )}

//               </div>

//             ) : (

//               <EmptySection
//                 message="No video testimonials available yet."
//                 branding={
//                   branding
//                 }
//               />

//             )}

//           </div>

//         </section>
//       )}


//     </main>
//   );
// }


// /* =========================================================
//    FILTER BUTTON
// ========================================================= */

// function FilterButton({
//   label,
//   value,
//   activeFilter,
//   setActiveFilter,
//   branding,
// }) {

//   const active =
//     activeFilter ===
//     value;


//   return (
//     <button
//       type="button"
//       onClick={() =>
//         setActiveFilter(
//           value
//         )
//       }
//       className="
//         min-w-[100px]
//         px-6
//         py-3
//         text-sm
//         transition-all
//         duration-200
//         hover:-translate-y-0.5
//       "
//       style={{
//         backgroundColor:
//           active
//             ? branding.buttonColor
//             : branding.cardBackgroundColor,

//         color:
//           active
//             ? branding.buttonTextColor
//             : branding.textColor,

//         border:
//           `1px solid ${
//             active
//               ? branding.buttonColor
//               : hexToRgba(
//                   branding.textColor,
//                   0.14
//                 )
//           }`,

//         borderRadius:
//           buttonRadius(
//             branding
//           ),

//         fontFamily:
//           fontFamily(
//             branding.fontSubheading
//           ),

//         fontWeight:
//           branding.subheadingWeight,

//         boxShadow:
//           active
//             ? `0 8px 20px ${hexToRgba(
//                 branding.buttonColor,
//                 0.18
//               )}`
//             : "none",
//       }}
//     >
//       {label}
//     </button>
//   );
// }


// /* =========================================================
//    SECTION HEADING
// ========================================================= */

// function SectionHeading({
//   title,
//   subtitle,
//   branding,
// }) {

//   return (
//     <div
//       className="
//         mb-8
//         text-center
//       "
//     >

//       <h2
//         className="
//           text-3xl
//           md:text-4xl
//         "
//         style={{
//           color:
//             branding.headingColor,

//           fontFamily:
//             fontFamily(
//               branding.fontHeading
//             ),

//           fontWeight:
//             branding.headingWeight,

//           lineHeight:
//             branding.headingLineHeight,

//           letterSpacing:
//             branding.headingLetterSpacing,
//         }}
//       >
//         {title}
//       </h2>


//       <div
//         className="
//           mx-auto
//           mt-3
//           h-[3px]
//           w-14
//           rounded-full
//         "
//         style={{
//           backgroundColor:
//             branding.buttonColor,
//         }}
//       />


//       {subtitle && (
//         <p
//           className="
//             mx-auto
//             mt-3
//             max-w-xl
//             text-sm
//             md:text-base
//           "
//           style={{
//             color:
//               branding.textColor,

//             fontFamily:
//               fontFamily(
//                 branding.fontBody
//               ),

//             fontWeight:
//               branding.bodyWeight,

//             lineHeight:
//               branding.bodyLineHeight,

//             opacity: 0.6,
//           }}
//         >
//           {subtitle}
//         </p>
//       )}

//     </div>
//   );
// }


// /* =========================================================
//    TEXT TESTIMONIAL CARD
// ========================================================= */

// function TestimonialCard({
//   testimonial,
//   branding,
//   index,
// }) {

//   const name =
//     getStudentName(
//       testimonial
//     );

//   const role =
//     getStudentRole(
//       testimonial
//     );

//   const text =
//     getTestimonialText(
//       testimonial
//     ) ||
//     "Amazing learning experience!";

//   const avatar =
//     getAvatar(
//       testimonial
//     );

//   const rating =
//     getRating(
//       testimonial
//     );


//   const cardBackground =
//     index % 3 === 0
//       ? hexToRgba(
//           branding.buttonColor,
//           0.07
//         )
//       : index % 3 === 1
//         ? hexToRgba(
//             branding.subheadingColor,
//             0.07
//           )
//         : hexToRgba(
//             branding.iconColor,
//             0.08
//           );


//   return (
//     <article
//       className="
//         relative
//         flex
//         min-h-[250px]
//         flex-col
//         rounded-2xl
//         p-6
//         transition-all
//         duration-200
//         hover:-translate-y-1
//         hover:shadow-lg
//       "
//       style={{
//         backgroundColor:
//           cardBackground,

//         border:
//           `1px solid ${hexToRgba(
//             branding.textColor,
//             0.07
//           )}`,
//       }}
//     >

//       <div
//         className="
//           flex
//           items-start
//           justify-between
//         "
//       >

//         <Quote
//           size={34}
//           fill={
//             branding.buttonColor
//           }
//           style={{
//             color:
//               branding.buttonColor,
//             opacity: 0.9,
//           }}
//         />


//         <div
//           className="
//             flex
//             gap-0.5
//           "
//         >

//           {[1, 2, 3, 4, 5].map(
//             (star) => (

//               <Star
//                 key={star}
//                 size={15}
//                 fill={
//                   star <= rating
//                     ? branding.iconColor
//                     : "none"
//                 }
//                 style={{
//                   color:
//                     branding.iconColor,
//                 }}
//               />

//             )
//           )}

//         </div>

//       </div>


//       <p
//         className="
//           mt-5
//           flex-1
//           text-sm
//           italic
//           md:text-base
//         "
//         style={{
//           color:
//             branding.textColor,

//           fontFamily:
//             fontFamily(
//               branding.fontBody
//             ),

//           fontWeight:
//             branding.bodyWeight,

//           lineHeight:
//             branding.bodyLineHeight,

//           letterSpacing:
//             branding.bodyLetterSpacing,

//           opacity: 0.82,
//         }}
//       >
//         “{text}”
//       </p>


//       <div
//         className="
//           mt-6
//           flex
//           items-center
//           gap-3
//         "
//       >

//         {avatar ? (

//           <img
//             src={avatar}
//             alt={name}
//             className="
//               h-12
//               w-12
//               rounded-full
//               object-cover
//             "
//           />

//         ) : (

//           <div
//             className="
//               flex
//               h-12
//               w-12
//               items-center
//               justify-center
//               rounded-full
//             "
//             style={{
//               backgroundColor:
//                 branding.buttonColor,

//               color:
//                 branding.buttonTextColor,

//               fontFamily:
//                 fontFamily(
//                   branding.fontHeading
//                 ),

//               fontWeight:
//                 branding.headingWeight,
//             }}
//           >
//             {name
//               .charAt(0)
//               .toUpperCase()}
//           </div>

//         )}


//         <div>

//           <h3
//             className="text-sm"
//             style={{
//               color:
//                 branding.headingColor,

//               fontFamily:
//                 fontFamily(
//                   branding.fontHeading
//                 ),

//               fontWeight:
//                 branding.subheadingWeight,
//             }}
//           >
//             {name}
//           </h3>


//           <p
//             className="text-xs"
//             style={{
//               color:
//                 branding.textColor,

//               fontFamily:
//                 fontFamily(
//                   branding.fontBody
//                 ),

//               opacity: 0.55,
//             }}
//           >
//             {role}
//           </p>

//         </div>

//       </div>

//     </article>
//   );
// }


// /* =========================================================
//    VIDEO TESTIMONIAL CARD
// ========================================================= */

// function VideoTestimonialCard({
//   testimonial,
//   branding,
// }) {

//   const name =
//     getStudentName(
//       testimonial
//     );

//   const role =
//     getStudentRole(
//       testimonial
//     );

//   const video =
//     getVideoUrl(
//       testimonial
//     );

//   const thumbnail =
//     getVideoThumbnail(
//       testimonial
//     );

//   const title =
//     testimonial?.video_title ||
//     testimonial?.videoTitle ||
//     testimonial?.title ||
//     `My Journey with ${name}`;


//   return (
//     <article
//       className="
//         overflow-hidden
//         rounded-2xl
//         shadow-sm
//         transition-all
//         duration-200
//         hover:-translate-y-1
//         hover:shadow-lg
//       "
//       style={{
//         backgroundColor:
//           branding.cardBackgroundColor,

//         border:
//           `1px solid ${hexToRgba(
//             branding.textColor,
//             0.09
//           )}`,
//       }}
//     >

//       <div
//         className="
//           relative
//           aspect-video
//           overflow-hidden
//         "
//         style={{
//           backgroundColor:
//             branding.navbarColor,
//         }}
//       >

//         {video ? (

//           <video
//             src={video}
//             poster={
//               thumbnail ||
//               undefined
//             }
//             controls
//             preload="metadata"
//             className="
//               h-full
//               w-full
//               object-cover
//             "
//           />

//         ) : (

//           <div
//             className="
//               flex
//               h-full
//               items-center
//               justify-center
//             "
//             style={{
//               color:
//                 branding.buttonTextColor,
//             }}
//           >

//             <Play
//               size={48}
//               fill="currentColor"
//               style={{
//                 opacity: 0.5,
//               }}
//             />

//           </div>

//         )}

//       </div>


//       <div
//         className="
//           px-5
//           py-4
//         "
//       >

//         <h3
//           className="
//             text-sm
//             md:text-base
//           "
//           style={{
//             color:
//               branding.headingColor,

//             fontFamily:
//               fontFamily(
//                 branding.fontHeading
//               ),

//             fontWeight:
//               branding.subheadingWeight,
//           }}
//         >
//           {title}
//         </h3>


//         <div
//           className="
//             mt-2
//             flex
//             flex-wrap
//             items-center
//             gap-2
//             text-xs
//           "
//         >

//           <span
//             style={{
//               color:
//                 branding.buttonColor,

//               fontWeight:
//                 branding.subheadingWeight,
//             }}
//           >
//             {name}
//           </span>


//           <span
//             style={{
//               opacity: 0.3,
//             }}
//           >
//             •
//           </span>


//           <span
//             style={{
//               opacity: 0.55,
//             }}
//           >
//             {role}
//           </span>

//         </div>

//       </div>

//     </article>
//   );
// }


// /* =========================================================
//    EMPTY SECTION
// ========================================================= */

// function EmptySection({
//   message,
//   branding,
// }) {

//   return (
//     <div
//       className="
//         rounded-2xl
//         px-5
//         py-12
//         text-center
//       "
//       style={{
//         backgroundColor:
//           branding.cardBackgroundColor,

//         border:
//           `1px solid ${hexToRgba(
//             branding.textColor,
//             0.07
//           )}`,
//       }}
//     >

//       <Quote
//         size={30}
//         className="mx-auto"
//         style={{
//           color:
//             branding.buttonColor,

//           opacity: 0.5,
//         }}
//       />


//       <p
//         className="
//           mt-3
//           text-sm
//         "
//         style={{
//           color:
//             branding.textColor,

//           fontFamily:
//             fontFamily(
//               branding.fontBody
//             ),

//           opacity: 0.55,
//         }}
//       >
//         {message}
//       </p>

//     </div>
//   );
// }


// /* =========================================================
//    ACTIVE BANNER
// ========================================================= */

// function isActiveBanner(
//   banner
// ) {

//   const value =
//     banner?.is_active ??
//     banner?.isActive;


//   if (
//     value === undefined ||
//     value === null
//   ) {
//     return true;
//   }


//   return (
//     value === true ||
//     value === 1 ||
//     value === "1" ||
//     value === "true" ||
//     String(value).toUpperCase() ===
//       "ACTIVE"
//   );
// }


// /* =========================================================
//    TESTIMONIAL HELPERS
// ========================================================= */

// function getStudentName(
//   testimonial
// ) {

//   return (
//     testimonial?.student_name ||
//     testimonial?.studentName ||
//     testimonial?.name ||
//     "Student"
//   );
// }


// function getStudentRole(
//   testimonial
// ) {

//   return (
//     testimonial?.role ||
//     testimonial?.student_role ||
//     testimonial?.designation ||
//     "Student"
//   );
// }


// function getTestimonialText(
//   testimonial
// ) {

//   return (
//     testimonial?.testimonial_text ||
//     testimonial?.testimonialText ||
//     testimonial?.review ||
//     testimonial?.comment ||
//     testimonial?.message ||
//     ""
//   );
// }


// function getAvatar(
//   testimonial
// ) {

//   return (
//     testimonial?.avatar ||
//     testimonial?.student_image ||
//     testimonial?.profile_image ||
//     testimonial?.profileImage ||
//     testimonial?.image ||
//     null
//   );
// }


// function getVideoUrl(
//   testimonial
// ) {

//   return (
//     testimonial?.video_url ||
//     testimonial?.videoUrl ||
//     testimonial?.video ||
//     null
//   );
// }


// function getVideoThumbnail(
//   testimonial
// ) {

//   return (
//     testimonial?.video_thumbnail ||
//     testimonial?.videoThumbnail ||
//     testimonial?.thumbnail ||
//     testimonial?.thumbnail_url ||
//     getAvatar(
//       testimonial
//     )
//   );
// }


// function getRating(
//   testimonial
// ) {

//   const rating =
//     Number(
//       testimonial?.rating ??
//         5
//     );


//   if (
//     Number.isNaN(
//       rating
//     )
//   ) {
//     return 5;
//   }


//   return Math.min(
//     5,
//     Math.max(
//       0,
//       Math.round(
//         rating
//       )
//     )
//   );
// }


import { useEffect, useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  Star,
  Play,
  Quote,
} from "lucide-react";

import {
  getInstituteTestimonials,
} from "../../services/testimonialService";


/* =========================================================
   DEFAULT BRANDING
========================================================= */

const DEFAULT_BRANDING = {
  navbarColor: "#1F2937",

  headingColor: "#111827",
  subheadingColor: "#5B21B6",
  textColor: "#111827",
  iconColor: "#F59E0B",

  buttonColor: "#7C3AED",
  buttonTextColor: "#FFFFFF",

  pageBackgroundColor: "#FAFAF9",
  cardBackgroundColor: "#FFFFFF",

  footerBackgroundColor: "#1F2937",
  footerHeadingColor: "#FFFFFF",
  footerTextColor: "#FAFAF9",

  fontHeading: "Inter",
  fontSubheading: "Inter",
  fontBody: "Inter",

  headingWeight: 700,
  headingLineHeight: 1.15,
  headingLetterSpacing: 0,

  subheadingWeight: 600,
  subheadingLineHeight: 1.4,

  bodyWeight: 400,
  bodyLineHeight: 1.6,
  bodyLetterSpacing: 0,

  roundedButtons: true,
};


/* =========================================================
   DEFAULT CONTENT
========================================================= */

const DEFAULT_CONTENT = {
  testimonials: {
    eyebrow: "TESTIMONIALS",

    heading: "What Our Students Say",

    subheading:
      "Hear what our students have to say about their learning experience.",

    textTestimonials: {
      heading: "What Our Learners Say",

      subheading:
        "Real experiences from learners at our institute.",
    },

    videoTestimonials: {
      heading: "Video Testimonials",

      subheading:
        "Watch our learners share their experiences.",
    },

    filters: {
      all: "All",
      text: "Image",
      video: "Video",
    },
  },
};


/* =========================================================
   DEFAULT SECTIONS
========================================================= */

const DEFAULT_SECTIONS = {
  testimonials: {
    hero: true,
    textTestimonials: true,
    videoTestimonials: true,
  },
};


/* =========================================================
   GET VALUE
========================================================= */

const getValue = (
  ...values
) => {
  for (const value of values) {
    if (
      value !== undefined &&
      value !== null &&
      value !== ""
    ) {
      return value;
    }
  }

  return null;
};


/* =========================================================
   BRANDING HELPERS
========================================================= */

const getBrandingValue = (
  branding,
  camelKey,
  snakeKey,
  fallback
) => {
  const value =
    branding?.[camelKey] ??
    branding?.[snakeKey];

  return (
    value !== undefined &&
    value !== null &&
    value !== ""
  )
    ? value
    : fallback;
};


const normalizeBranding = (
  branding = {}
) => ({
  navbarColor: getBrandingValue(
    branding,
    "navbarColor",
    "navbar_color",
    DEFAULT_BRANDING.navbarColor
  ),

  headingColor: getBrandingValue(
    branding,
    "headingColor",
    "heading_color",
    DEFAULT_BRANDING.headingColor
  ),

  subheadingColor: getBrandingValue(
    branding,
    "subheadingColor",
    "subheading_color",
    DEFAULT_BRANDING.subheadingColor
  ),

  textColor: getBrandingValue(
    branding,
    "textColor",
    "text_color",
    DEFAULT_BRANDING.textColor
  ),

  iconColor: getBrandingValue(
    branding,
    "iconColor",
    "icon_color",
    DEFAULT_BRANDING.iconColor
  ),

  buttonColor: getBrandingValue(
    branding,
    "buttonColor",
    "button_color",
    DEFAULT_BRANDING.buttonColor
  ),

  buttonTextColor: getBrandingValue(
    branding,
    "buttonTextColor",
    "button_text_color",
    DEFAULT_BRANDING.buttonTextColor
  ),

  pageBackgroundColor: getBrandingValue(
    branding,
    "pageBackgroundColor",
    "page_background_color",
    DEFAULT_BRANDING.pageBackgroundColor
  ),

  cardBackgroundColor: getBrandingValue(
    branding,
    "cardBackgroundColor",
    "card_background_color",
    DEFAULT_BRANDING.cardBackgroundColor
  ),

  footerBackgroundColor: getBrandingValue(
    branding,
    "footerBackgroundColor",
    "footer_background_color",
    DEFAULT_BRANDING.footerBackgroundColor
  ),

  footerHeadingColor: getBrandingValue(
    branding,
    "footerHeadingColor",
    "footer_heading_color",
    DEFAULT_BRANDING.footerHeadingColor
  ),

  footerTextColor: getBrandingValue(
    branding,
    "footerTextColor",
    "footer_text_color",
    DEFAULT_BRANDING.footerTextColor
  ),

  fontHeading: getBrandingValue(
    branding,
    "fontHeading",
    "font_heading",
    DEFAULT_BRANDING.fontHeading
  ),

  fontSubheading: getBrandingValue(
    branding,
    "fontSubheading",
    "font_subheading",
    DEFAULT_BRANDING.fontSubheading
  ),

  fontBody: getBrandingValue(
    branding,
    "fontBody",
    "font_body",
    DEFAULT_BRANDING.fontBody
  ),

  headingWeight: getBrandingValue(
    branding,
    "headingWeight",
    "heading_weight",
    DEFAULT_BRANDING.headingWeight
  ),

  headingLineHeight: getBrandingValue(
    branding,
    "headingLineHeight",
    "heading_line_height",
    DEFAULT_BRANDING.headingLineHeight
  ),

  headingLetterSpacing: getBrandingValue(
    branding,
    "headingLetterSpacing",
    "heading_letter_spacing",
    DEFAULT_BRANDING.headingLetterSpacing
  ),

  subheadingWeight: getBrandingValue(
    branding,
    "subheadingWeight",
    "subheading_weight",
    DEFAULT_BRANDING.subheadingWeight
  ),

  subheadingLineHeight: getBrandingValue(
    branding,
    "subheadingLineHeight",
    "subheading_line_height",
    DEFAULT_BRANDING.subheadingLineHeight
  ),

  bodyWeight: getBrandingValue(
    branding,
    "bodyWeight",
    "body_weight",
    DEFAULT_BRANDING.bodyWeight
  ),

  bodyLineHeight: getBrandingValue(
    branding,
    "bodyLineHeight",
    "body_line_height",
    DEFAULT_BRANDING.bodyLineHeight
  ),

  bodyLetterSpacing: getBrandingValue(
    branding,
    "bodyLetterSpacing",
    "body_letter_spacing",
    DEFAULT_BRANDING.bodyLetterSpacing
  ),

  roundedButtons: getBrandingValue(
    branding,
    "roundedButtons",
    "rounded_buttons",
    DEFAULT_BRANDING.roundedButtons
  ),
});


const fontFamily = (
  font
) =>
  font
    ? `'${font}', sans-serif`
    : "Inter, sans-serif";


const buttonRadius = (
  branding
) =>
  branding.roundedButtons
    ? "9999px"
    : "10px";


const hexToRgba = (
  color,
  alpha
) => {
  if (
    typeof color !==
    "string"
  ) {
    return color;
  }

  const hex =
    color.replace(
      "#",
      ""
    );

  if (
    !/^[0-9A-Fa-f]{6}$/.test(
      hex
    )
  ) {
    return color;
  }

  const r = parseInt(
    hex.substring(0, 2),
    16
  );

  const g = parseInt(
    hex.substring(2, 4),
    16
  );

  const b = parseInt(
    hex.substring(4, 6),
    16
  );

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};


/* =========================================================
   CONTENT NORMALIZER
========================================================= */

const normalizeContent = (
  content = {}
) => {
  const source =
    content?.testimonials ||
    content?.testimonial ||
    content?.Testimonials ||
    content ||
    {};

  return {
    testimonials: {
      eyebrow:
        getValue(
          source?.eyebrow,
          source?.eyebrow_text,
          source?.label,
          DEFAULT_CONTENT.testimonials.eyebrow
        ),

      heading:
        getValue(
          source?.heading,
          source?.title,
          source?.page_heading,
          DEFAULT_CONTENT.testimonials.heading
        ),

      subheading:
        getValue(
          source?.subheading,
          source?.subtitle,
          source?.page_subheading,
          DEFAULT_CONTENT.testimonials.subheading
        ),

      textTestimonials: {
        heading:
          getValue(
            source?.textTestimonials?.heading,
            source?.text_testimonials?.heading,
            source?.text_heading,
            DEFAULT_CONTENT.testimonials.textTestimonials.heading
          ),

        subheading:
          getValue(
            source?.textTestimonials?.subheading,
            source?.text_testimonials?.subheading,
            source?.text_subheading,
            DEFAULT_CONTENT.testimonials.textTestimonials.subheading
          ),
      },

      videoTestimonials: {
        heading:
          getValue(
            source?.videoTestimonials?.heading,
            source?.video_testimonials?.heading,
            source?.video_heading,
            DEFAULT_CONTENT.testimonials.videoTestimonials.heading
          ),

        subheading:
          getValue(
            source?.videoTestimonials?.subheading,
            source?.video_testimonials?.subheading,
            source?.video_subheading,
            DEFAULT_CONTENT.testimonials.videoTestimonials.subheading
          ),
      },

      filters: {
        all:
          getValue(
            source?.filters?.all,
            source?.filter_all,
            DEFAULT_CONTENT.testimonials.filters.all
          ),

        text:
          getValue(
            source?.filters?.text,
            source?.filters?.image,
            source?.filter_text,
            source?.filter_image,
            DEFAULT_CONTENT.testimonials.filters.text
          ),

        video:
          getValue(
            source?.filters?.video,
            source?.filter_video,
            DEFAULT_CONTENT.testimonials.filters.video
          ),
      },
    },
  };
};


/* =========================================================
   SECTION NORMALIZER
========================================================= */

const normalizeSections = (
  sections = {}
) => {
  const source =
    sections?.testimonials ||
    sections?.testimonial ||
    sections?.Testimonials ||
    sections ||
    {};

  const getSection = (
    key,
    aliases = []
  ) => {
    const values = [
      source?.[key],
      ...aliases.map(
        (alias) =>
          source?.[alias]
      ),
    ];

    for (
      const value of values
    ) {
      if (
        typeof value ===
        "boolean"
      ) {
        return value;
      }

      if (
        typeof value ===
        "object" &&
        value !== null
      ) {
        if (
          typeof value.visible ===
          "boolean"
        ) {
          return value.visible;
        }

        if (
          typeof value.is_visible ===
          "boolean"
        ) {
          return value.is_visible;
        }
      }
    }

    return true;
  };

  return {
    hero: getSection(
      "hero",
      ["banner"]
    ),

    textTestimonials:
      getSection(
        "textTestimonials",
        [
          "text_testimonials",
          "text",
        ]
      ),

    videoTestimonials:
      getSection(
        "videoTestimonials",
        [
          "video_testimonials",
          "video",
        ]
      ),
  };
};


/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function WebsiteTestimonials() {

  const context =
    useOutletContext() || {};

  const {
    branding:
      outletBranding = {},

    content:
      outletContent = {},

    sections:
      outletSections = {},

    website = {},

    institute = {},

    banners = [],

    bannersLoading = false,
  } = context;


  /* =======================================================
     BRANDING
  ======================================================= */

  const branding =
    useMemo(
      () =>
        normalizeBranding(
          outletBranding
        ),
      [outletBranding]
    );


  /* =======================================================
     CONTENT
  ======================================================= */

  const content =
    useMemo(
      () =>
        normalizeContent(
          outletContent
        ),
      [outletContent]
    );


  /* =======================================================
     SECTIONS
  ======================================================= */

  const sections =
    useMemo(
      () =>
        normalizeSections(
          outletSections
        ),
      [outletSections]
    );


  /* =======================================================
     STATE
  ======================================================= */

  const [
    testimonials,
    setTestimonials,
  ] = useState([]);


  const [
    loadingTestimonials,
    setLoadingTestimonials,
  ] = useState(true);


  const [
    testimonialError,
    setTestimonialError,
  ] = useState("");


  const [
    activeFilter,
    setActiveFilter,
  ] = useState("all");


  /* =======================================================
     INSTITUTE NAME
  ======================================================= */

  const instituteName =
    institute?.name ||
    website?.institute?.name ||
    website?.name ||
    "Institute";


  /* =======================================================
     TESTIMONIAL BANNER
  ======================================================= */

  const testimonialBanner =
    useMemo(() => {

      const list =
        Array.isArray(
          banners
        )
          ? banners
          : [];

      const banner =
        list.find(
          (item) => {

            const type =
              String(
                item?.banner_type ||
                item?.bannerType ||
                ""
              )
                .trim()
                .toUpperCase();

            return (
              type ===
                "TESTIMONIAL" &&
              isActiveBanner(
                item
              )
            );
          }
        );

      return (
        banner ||
        null
      );

    }, [banners]);


  /* =======================================================
     BANNER IMAGE
  ======================================================= */

  const testimonialBannerImage =
    testimonialBanner?.image_url ||
    testimonialBanner?.image ||
    testimonialBanner?.imageUrl ||
    null;


  /* =======================================================
     FETCH TESTIMONIALS
  ======================================================= */

  useEffect(() => {

    let mounted = true;


    const loadTestimonials =
      async () => {

        try {

          setLoadingTestimonials(
            true
          );

          setTestimonialError("");


          const result =
            await getInstituteTestimonials();


          if (!mounted) {
            return;
          }


          let testimonialList =
            [];


          if (
            Array.isArray(
              result
            )
          ) {

            testimonialList =
              result;

          } else if (
            Array.isArray(
              result?.data
            )
          ) {

            testimonialList =
              result.data;

          } else if (
            Array.isArray(
              result?.testimonials
            )
          ) {

            testimonialList =
              result.testimonials;

          } else if (
            Array.isArray(
              result?.data?.testimonials
            )
          ) {

            testimonialList =
              result.data.testimonials;

          }


          setTestimonials(
            testimonialList
          );

        } catch (
          error
        ) {

          console.error(
            "Testimonials API Error:",
            error
          );


          if (!mounted) {
            return;
          }


          setTestimonials(
            []
          );


          setTestimonialError(
            error?.response
              ?.data?.message ||
              error?.message ||
              "Failed to load testimonials."
          );

        } finally {

          if (mounted) {
            setLoadingTestimonials(
              false
            );
          }

        }
      };


    loadTestimonials();


    return () => {
      mounted = false;
    };

  }, []);


  /* =======================================================
     FILTER TESTIMONIALS
  ======================================================= */

  const textTestimonials =
    useMemo(
      () =>
        testimonials.filter(
          (
            testimonial
          ) =>
            !getVideoUrl(
              testimonial
            )
        ),
      [testimonials]
    );


  const videoTestimonials =
    useMemo(
      () =>
        testimonials.filter(
          (
            testimonial
          ) =>
            Boolean(
              getVideoUrl(
                testimonial
              )
            )
        ),
      [testimonials]
    );


  /* =======================================================
     FILTERED CONTENT

     IMPORTANT:
     "All" uses ONE combined list containing both text/image
     testimonials and video testimonials. This prevents the
     page from rendering two separate testimonial sections.
  ======================================================= */

  const filteredTestimonials = useMemo(() => {
    if (activeFilter === "image") {
      return sections.textTestimonials
        ? textTestimonials.map((testimonial) => ({
            ...testimonial,
            _testimonialType: "text",
          }))
        : [];
    }

    if (activeFilter === "video") {
      return sections.videoTestimonials
        ? videoTestimonials.map((testimonial) => ({
            ...testimonial,
            _testimonialType: "video",
          }))
        : [];
    }

    const combined = [];

    if (sections.textTestimonials) {
      combined.push(
        ...textTestimonials.map((testimonial) => ({
          ...testimonial,
          _testimonialType: "text",
        }))
      );
    }

    if (sections.videoTestimonials) {
      combined.push(
        ...videoTestimonials.map((testimonial) => ({
          ...testimonial,
          _testimonialType: "video",
        }))
      );
    }

    return combined;
  }, [
    activeFilter,
    sections.textTestimonials,
    sections.videoTestimonials,
    textTestimonials,
    videoTestimonials,
  ]);

  const hasVisibleTestimonials =
    filteredTestimonials.length > 0;

  const sectionTitle =
    activeFilter === "video"
      ? content.testimonials.videoTestimonials.heading
      : content.testimonials.textTestimonials.heading;

  const sectionSubtitle =
    activeFilter === "video"
      ? content.testimonials.videoTestimonials.subheading
      : content.testimonials.textTestimonials.subheading;


  /* =======================================================
     SHARED STYLES
  ======================================================= */

  const headingStyle = {
    color:
      branding.headingColor,

    fontFamily:
      fontFamily(
        branding.fontHeading
      ),

    fontWeight:
      branding.headingWeight,

    lineHeight:
      branding.headingLineHeight,

    letterSpacing:
      branding.headingLetterSpacing,
  };


  const bodyStyle = {
    color:
      branding.textColor,

    fontFamily:
      fontFamily(
        branding.fontBody
      ),

    fontWeight:
      branding.bodyWeight,

    lineHeight:
      branding.bodyLineHeight,

    letterSpacing:
      branding.bodyLetterSpacing,
  };


  /* =======================================================
     LOADING
  ======================================================= */

  if (
    loadingTestimonials
  ) {

    return (
      <main
        className="
          flex
          min-h-screen
          items-center
          justify-center
        "
        style={{
          backgroundColor:
            branding.pageBackgroundColor,

          fontFamily:
            fontFamily(
              branding.fontBody
            ),
        }}
      >

        <div
          className="
            text-center
          "
        >

          <div
            className="
              mx-auto
              h-10
              w-10
              animate-spin
              rounded-full
              border-4
            "
            style={{
              borderColor:
                hexToRgba(
                  branding.buttonColor,
                  0.15
                ),

              borderTopColor:
                branding.buttonColor,
            }}
          />


          <p
            className="
              mt-4
              text-sm
            "
            style={{
              ...bodyStyle,
              opacity: 0.6,
            }}
          >
            Loading testimonials...
          </p>

        </div>

      </main>
    );
  }


  /* =======================================================
     ERROR
  ======================================================= */

  if (
    testimonialError
  ) {

    return (
      <main
        className="
          flex
          min-h-screen
          items-center
          justify-center
          px-5
        "
        style={{
          backgroundColor:
            branding.pageBackgroundColor,
        }}
      >

        <div
          className="
            max-w-lg
            text-center
          "
        >

          <div
            className="
              mx-auto
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full
            "
            style={{
              backgroundColor:
                hexToRgba(
                  branding.buttonColor,
                  0.08
                ),

              color:
                branding.buttonColor,
            }}
          >
            <Quote
              size={28}
            />
          </div>


          <h1
            className="
              mt-5
              text-3xl
            "
            style={headingStyle}
          >
            {content.testimonials.heading}
          </h1>


          <p
            className="
              mt-3
            "
            style={{
              ...bodyStyle,
              opacity: 0.6,
            }}
          >
            Unable to load
            testimonials right now.
          </p>


          <p
            className="
              mt-2
              text-xs
            "
            style={{
              ...bodyStyle,
              opacity: 0.45,
            }}
          >
            {testimonialError}
          </p>

        </div>

      </main>
    );
  }


  /* =======================================================
     MAIN PAGE
  ======================================================= */

  return (
    <main
      className="
        min-h-screen
      "
      style={{
        backgroundColor:
          branding.pageBackgroundColor,

        color:
          branding.textColor,

        fontFamily:
          fontFamily(
            branding.fontBody
          ),
      }}
    >

      {/* ===================================================
          HERO
      =================================================== */}

      {sections.hero && (
        <section
          className="
            w-full
            overflow-hidden
          "
        >

          {bannersLoading ? (

            <div
              className="
                flex
                min-h-[240px]
                items-center
                justify-center
                sm:min-h-[300px]
                md:min-h-[360px]
              "
              style={{
                backgroundColor:
                  branding.cardBackgroundColor,
              }}
            >

              <p
                style={bodyStyle}
              >
                Loading banner...
              </p>

            </div>

          ) : testimonialBannerImage ? (

            <div
              className="
                relative
              "
            >

              <img
                src={
                  testimonialBannerImage
                }
                alt={
                  testimonialBanner?.title ||
                  content.testimonials.heading
                }
                className="
                  block
                  h-[430px]
                  w-full
                  object-cover
                "
                onError={(
                  event
                ) => {
                  event.currentTarget.style.display =
                    "none";
                }}
              />


              <div
                className="
                  absolute
                  inset-0
                "
                style={{
                  background:
                    `linear-gradient(
                      to right,
                      rgba(0,0,0,0.72),
                      rgba(0,0,0,0.25),
                      rgba(0,0,0,0.08)
                    )`,
                }}
              />


            </div>

          ) : (

            <div
              className="
                relative
                flex
                min-h-[260px]
                items-center
                justify-center
                overflow-hidden
                px-5
                text-center
                sm:min-h-[320px]
                md:min-h-[380px]
              "
              style={{
                background:
                  `linear-gradient(
                    135deg,
                    ${branding.buttonColor},
                    ${branding.subheadingColor}
                  )`,
              }}
            >

              <div>

                {content.testimonials.eyebrow && (
                  <p
                    className="
                      text-xs
                      uppercase
                      tracking-[0.2em]
                    "
                    style={{
                      color:
                        branding.buttonTextColor,

                      fontFamily:
                        fontFamily(
                          branding.fontSubheading
                        ),

                      fontWeight:
                        branding.subheadingWeight,

                      opacity: 0.85,
                    }}
                  >
                    {
                      content
                        .testimonials
                        .eyebrow
                    }
                  </p>
                )}


                <h1
                  className="
                    mt-3
                    text-4xl
                    sm:text-5xl
                    md:text-6xl
                  "
                  style={{
                    color:
                      branding.buttonTextColor,

                    fontFamily:
                      fontFamily(
                        branding.fontHeading
                      ),

                    fontWeight:
                      branding.headingWeight,

                    lineHeight:
                      branding.headingLineHeight,
                  }}
                >
                  {
                    content
                      .testimonials
                      .heading
                  }
                </h1>


                {content.testimonials.subheading && (
                  <p
                    className="
                      mx-auto
                      mt-4
                      max-w-2xl
                      text-sm
                      sm:text-base
                    "
                    style={{
                      color:
                        branding.buttonTextColor,

                      opacity: 0.9,

                      fontFamily:
                        fontFamily(
                          branding.fontBody
                        ),

                      lineHeight:
                        branding.bodyLineHeight,
                    }}
                  >
                    {
                      content
                        .testimonials
                        .subheading
                    }
                  </p>
                )}

              </div>

            </div>
          )}

        </section>
      )}


      {/* ===================================================
          FILTERS
      =================================================== */}

      {(sections.textTestimonials ||
        sections.videoTestimonials) && (

        <section
          className="
            px-5
            py-8
            sm:py-10
          "
        >

          <div
            className="
              mx-auto
              flex
              max-w-7xl
              flex-wrap
              items-center
              justify-center
              gap-3
            "
          >

            <FilterButton
              label={
                content
                  .testimonials
                  .filters
                  .all
              }
              value="all"
              activeFilter={
                activeFilter
              }
              setActiveFilter={
                setActiveFilter
              }
              branding={
                branding
              }
            />


            {sections.textTestimonials && (
              <FilterButton
                label={
                  content
                    .testimonials
                    .filters
                    .text
                }
                value="image"
                activeFilter={
                  activeFilter
                }
                setActiveFilter={
                  setActiveFilter
                }
                branding={
                  branding
                }
              />
            )}


            {sections.videoTestimonials && (
              <FilterButton
                label={
                  content
                    .testimonials
                    .filters
                    .video
                }
                value="video"
                activeFilter={
                  activeFilter
                }
                setActiveFilter={
                  setActiveFilter
                }
                branding={
                  branding
                }
              />
            )}

          </div>

        </section>
      )}


      {/* ===================================================
          TESTIMONIALS

          ONE section for every filter:
          - All   => text + video cards in one grid
          - Image => text/image cards only
          - Video => video cards only
      =================================================== */}

      {(sections.textTestimonials ||
        sections.videoTestimonials) && (
        <section
          className="
            px-5
            pb-16
            pt-4
          "
        >
          <div
            className="
              mx-auto
              max-w-7xl
            "
          >
            <SectionHeading
              title={sectionTitle}
              subtitle={sectionSubtitle}
              branding={branding}
            />

            {hasVisibleTestimonials ? (
              <div
                className="
                  grid
                  grid-cols-1
                  gap-6
                  sm:grid-cols-2
                  lg:grid-cols-3
                "
              >
                {filteredTestimonials.map(
                  (testimonial, index) =>
                    testimonial._testimonialType === "video" ? (
                      <VideoTestimonialCard
                        key={
                          testimonial?.id ||
                          testimonial?._id ||
                          `video-${index}`
                        }
                        testimonial={testimonial}
                        branding={branding}
                      />
                    ) : (
                      <TestimonialCard
                        key={
                          testimonial?.id ||
                          testimonial?._id ||
                          `text-${index}`
                        }
                        testimonial={testimonial}
                        branding={branding}
                        index={index}
                      />
                    )
                )}
              </div>
            ) : (
              <EmptySection
                message={
                  activeFilter === "video"
                    ? "No video testimonials available yet."
                    : activeFilter === "image"
                      ? "No image testimonials available yet."
                      : "No testimonials available yet."
                }
                branding={branding}
              />
            )}
          </div>
        </section>
      )}



    </main>
  );
}


/* =========================================================
   FILTER BUTTON
========================================================= */

function FilterButton({
  label,
  value,
  activeFilter,
  setActiveFilter,
  branding,
}) {

  const active =
    activeFilter ===
    value;


  return (
    <button
      type="button"
      onClick={() =>
        setActiveFilter(
          value
        )
      }
      className="
        min-w-[100px]
        px-6
        py-3
        text-sm
        transition-all
        duration-200
        hover:-translate-y-0.5
      "
      style={{
        backgroundColor:
          active
            ? branding.buttonColor
            : branding.cardBackgroundColor,

        color:
          active
            ? branding.buttonTextColor
            : branding.textColor,

        border:
          `1px solid ${
            active
              ? branding.buttonColor
              : hexToRgba(
                  branding.textColor,
                  0.14
                )
          }`,

        borderRadius:
          buttonRadius(
            branding
          ),

        fontFamily:
          fontFamily(
            branding.fontSubheading
          ),

        fontWeight:
          branding.subheadingWeight,

        boxShadow:
          active
            ? `0 8px 20px ${hexToRgba(
                branding.buttonColor,
                0.18
              )}`
            : "none",
      }}
    >
      {label}
    </button>
  );
}


/* =========================================================
   SECTION HEADING
========================================================= */

function SectionHeading({
  title,
  subtitle,
  branding,
}) {

  return (
    <div
      className="
        mb-8
        text-center
      "
    >

      <h2
        className="
          text-3xl
          md:text-4xl
        "
        style={{
          color:
            branding.headingColor,

          fontFamily:
            fontFamily(
              branding.fontHeading
            ),

          fontWeight:
            branding.headingWeight,

          lineHeight:
            branding.headingLineHeight,

          letterSpacing:
            branding.headingLetterSpacing,
        }}
      >
        {title}
      </h2>


      <div
        className="
          mx-auto
          mt-3
          h-[3px]
          w-14
          rounded-full
        "
        style={{
          backgroundColor:
            branding.buttonColor,
        }}
      />


      {subtitle && (
        <p
          className="
            mx-auto
            mt-3
            max-w-xl
            text-sm
            md:text-base
          "
          style={{
            color:
              branding.textColor,

            fontFamily:
              fontFamily(
                branding.fontBody
              ),

            fontWeight:
              branding.bodyWeight,

            lineHeight:
              branding.bodyLineHeight,

            opacity: 0.6,
          }}
        >
          {subtitle}
        </p>
      )}

    </div>
  );
}


/* =========================================================
   TEXT TESTIMONIAL CARD
========================================================= */

function TestimonialCard({
  testimonial,
  branding,
  index,
}) {

  const name =
    getStudentName(
      testimonial
    );

  const role =
    getStudentRole(
      testimonial
    );

  const text =
    getTestimonialText(
      testimonial
    ) ||
    "Amazing learning experience!";

  const avatar =
    getAvatar(
      testimonial
    );

  const rating =
    getRating(
      testimonial
    );


  const cardBackground =
    index % 3 === 0
      ? hexToRgba(
          branding.buttonColor,
          0.07
        )
      : index % 3 === 1
        ? hexToRgba(
            branding.subheadingColor,
            0.07
          )
        : hexToRgba(
            branding.iconColor,
            0.08
          );


  return (
    <article
      className="
        relative
        flex
        min-h-[250px]
        flex-col
        rounded-2xl
        p-6
        transition-all
        duration-200
        hover:-translate-y-1
        hover:shadow-lg
      "
      style={{
        backgroundColor:
          cardBackground,

        border:
          `1px solid ${hexToRgba(
            branding.textColor,
            0.07
          )}`,
      }}
    >

      <div
        className="
          flex
          items-start
          justify-between
        "
      >

        <Quote
          size={34}
          fill={
            branding.buttonColor
          }
          style={{
            color:
              branding.buttonColor,
            opacity: 0.9,
          }}
        />


        <div
          className="
            flex
            gap-0.5
          "
        >

          {[1, 2, 3, 4, 5].map(
            (star) => (

              <Star
                key={star}
                size={15}
                fill={
                  star <= rating
                    ? branding.iconColor
                    : "none"
                }
                style={{
                  color:
                    branding.iconColor,
                }}
              />

            )
          )}

        </div>

      </div>


      <p
        className="
          mt-5
          flex-1
          text-sm
          italic
          md:text-base
        "
        style={{
          color:
            branding.textColor,

          fontFamily:
            fontFamily(
              branding.fontBody
            ),

          fontWeight:
            branding.bodyWeight,

          lineHeight:
            branding.bodyLineHeight,

          letterSpacing:
            branding.bodyLetterSpacing,

          opacity: 0.82,
        }}
      >
        “{text}”
      </p>


      <div
        className="
          mt-6
          flex
          items-center
          gap-3
        "
      >

        {avatar ? (

          <img
            src={avatar}
            alt={name}
            className="
              h-12
              w-12
              rounded-full
              object-cover
            "
          />

        ) : (

          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
            "
            style={{
              backgroundColor:
                branding.buttonColor,

              color:
                branding.buttonTextColor,

              fontFamily:
                fontFamily(
                  branding.fontHeading
                ),

              fontWeight:
                branding.headingWeight,
            }}
          >
            {name
              .charAt(0)
              .toUpperCase()}
          </div>

        )}


        <div>

          <h3
            className="text-sm"
            style={{
              color:
                branding.headingColor,

              fontFamily:
                fontFamily(
                  branding.fontHeading
                ),

              fontWeight:
                branding.subheadingWeight,
            }}
          >
            {name}
          </h3>


          <p
            className="text-xs"
            style={{
              color:
                branding.textColor,

              fontFamily:
                fontFamily(
                  branding.fontBody
                ),

              opacity: 0.55,
            }}
          >
            {role}
          </p>

        </div>

      </div>

    </article>
  );
}


/* =========================================================
   VIDEO TESTIMONIAL CARD
========================================================= */

function VideoTestimonialCard({
  testimonial,
  branding,
}) {

  const name =
    getStudentName(
      testimonial
    );

  const role =
    getStudentRole(
      testimonial
    );

  const video =
    getVideoUrl(
      testimonial
    );

  const thumbnail =
    getVideoThumbnail(
      testimonial
    );

  const title =
    testimonial?.video_title ||
    testimonial?.videoTitle ||
    testimonial?.title ||
    `My Journey with ${name}`;


  return (
    <article
      className="
        overflow-hidden
        rounded-2xl
        shadow-sm
        transition-all
        duration-200
        hover:-translate-y-1
        hover:shadow-lg
      "
      style={{
        backgroundColor:
          branding.cardBackgroundColor,

        border:
          `1px solid ${hexToRgba(
            branding.textColor,
            0.09
          )}`,
      }}
    >

      <div
        className="
          relative
          aspect-video
          overflow-hidden
        "
        style={{
          backgroundColor:
            branding.navbarColor,
        }}
      >

        {video ? (

          <video
            src={video}
            poster={
              thumbnail ||
              undefined
            }
            controls
            preload="metadata"
            className="
              h-full
              w-full
              object-cover
            "
          />

        ) : (

          <div
            className="
              flex
              h-full
              items-center
              justify-center
            "
            style={{
              color:
                branding.buttonTextColor,
            }}
          >

            <Play
              size={48}
              fill="currentColor"
              style={{
                opacity: 0.5,
              }}
            />

          </div>

        )}

      </div>


      <div
        className="
          px-5
          py-4
        "
      >

        <h3
          className="
            text-sm
            md:text-base
          "
          style={{
            color:
              branding.headingColor,

            fontFamily:
              fontFamily(
                branding.fontHeading
              ),

            fontWeight:
              branding.subheadingWeight,
          }}
        >
          {title}
        </h3>


        <div
          className="
            mt-2
            flex
            flex-wrap
            items-center
            gap-2
            text-xs
          "
        >

          <span
            style={{
              color:
                branding.buttonColor,

              fontWeight:
                branding.subheadingWeight,
            }}
          >
            {name}
          </span>


          <span
            style={{
              opacity: 0.3,
            }}
          >
            •
          </span>


          <span
            style={{
              opacity: 0.55,
            }}
          >
            {role}
          </span>

        </div>

      </div>

    </article>
  );
}


/* =========================================================
   EMPTY SECTION
========================================================= */

function EmptySection({
  message,
  branding,
}) {

  return (
    <div
      className="
        rounded-2xl
        px-5
        py-12
        text-center
      "
      style={{
        backgroundColor:
          branding.cardBackgroundColor,

        border:
          `1px solid ${hexToRgba(
            branding.textColor,
            0.07
          )}`,
      }}
    >

      <Quote
        size={30}
        className="mx-auto"
        style={{
          color:
            branding.buttonColor,

          opacity: 0.5,
        }}
      />


      <p
        className="
          mt-3
          text-sm
        "
        style={{
          color:
            branding.textColor,

          fontFamily:
            fontFamily(
              branding.fontBody
            ),

          opacity: 0.55,
        }}
      >
        {message}
      </p>

    </div>
  );
}


/* =========================================================
   ACTIVE BANNER
========================================================= */

function isActiveBanner(
  banner
) {

  const value =
    banner?.is_active ??
    banner?.isActive;


  if (
    value === undefined ||
    value === null
  ) {
    return true;
  }


  return (
    value === true ||
    value === 1 ||
    value === "1" ||
    value === "true" ||
    String(value).toUpperCase() ===
      "ACTIVE"
  );
}


/* =========================================================
   TESTIMONIAL HELPERS
========================================================= */

function getStudentName(
  testimonial
) {

  return (
    testimonial?.student_name ||
    testimonial?.studentName ||
    testimonial?.name ||
    "Student"
  );
}


function getStudentRole(
  testimonial
) {

  return (
    testimonial?.role ||
    testimonial?.student_role ||
    testimonial?.designation ||
    "Student"
  );
}


function getTestimonialText(
  testimonial
) {

  return (
    testimonial?.testimonial_text ||
    testimonial?.testimonialText ||
    testimonial?.review ||
    testimonial?.comment ||
    testimonial?.message ||
    ""
  );
}


function getAvatar(
  testimonial
) {

  return (
    testimonial?.avatar ||
    testimonial?.student_image ||
    testimonial?.profile_image ||
    testimonial?.profileImage ||
    testimonial?.image ||
    null
  );
}


function getVideoUrl(
  testimonial
) {

  return (
    testimonial?.video_url ||
    testimonial?.videoUrl ||
    testimonial?.video ||
    null
  );
}


function getVideoThumbnail(
  testimonial
) {

  return (
    testimonial?.video_thumbnail ||
    testimonial?.videoThumbnail ||
    testimonial?.thumbnail ||
    testimonial?.thumbnail_url ||
    getAvatar(
      testimonial
    )
  );
}


function getRating(
  testimonial
) {

  const rating =
    Number(
      testimonial?.rating ??
        5
    );


  if (
    Number.isNaN(
      rating
    )
  ) {
    return 5;
  }


  return Math.min(
    5,
    Math.max(
      0,
      Math.round(
        rating
      )
    )
  );
}