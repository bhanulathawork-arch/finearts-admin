
import React, {



  useEffect,



  useMemo,



  useState,



} from "react";





import { useNavigate } from "react-router-dom";





import {



  getAuth,



} from "firebase/auth";





import {



  FaHome,



  FaBuilding,



  FaGraduationCap,



  FaUser,



  FaVideo,



  FaPlayCircle,



  FaCheckCircle,



  FaCreditCard,



  FaSearch,



  FaList,



  FaClock,



  FaTimesCircle,



  FaEye,



  FaWallet,



  FaReceipt,



  FaSpinner,



  FaBell,



  FaChevronDown,



  FaTimes,



} from "react-icons/fa";





import API from "../../services/api";





/* =========================================================



   COLORS



\========================================================= */





const COLORS = {



  background: "#000000",





  card: "#000000",



  border: "rgba(255,255,255,.09)",





  purple: "#1687FF",



  pink: "#087CFF",





  green: "#35D6A0",



  yellow: "#F4B35E",



  red: "#EF5B6A",





  text: "#FFFFFF",



  muted: "#B7B3C3",



};





/* =========================================================



   NORMALIZE BOOKINGS



\=========================================================





   Handles all of these possible backend responses:





   1.



   [



     {...}



   ]





   2.



   {



     bookings: [...]



   }





   3.



   {



     data: {



       bookings: [...]



     }



   }





   4.



   {



     success: true,



     data: {



       bookings: [...]



     }



   }





   5.



   {



     data: [...]



   }



\========================================================= */





const getBookingsArray = (response) => {



  console.log("RAW BOOKINGS RESPONSE:", response);





  // Axios response



  const payload = response?.data ?? response;





  console.log("BOOKINGS PAYLOAD:", payload);





  // Direct array



  if (Array.isArray(payload)) {



    return payload;



  }





  // { bookings: [] }



  if (Array.isArray(payload?.bookings)) {



    return payload.bookings;



  }





  // { data: { bookings: [] } }



  if (Array.isArray(payload?.data?.bookings)) {



    return payload.data.bookings;



  }





  // { data: [] }



  if (Array.isArray(payload?.data)) {



    return payload.data;



  }





  // { rows: [] }



  if (Array.isArray(payload?.rows)) {



    return payload.rows;



  }





  // { result: { bookings: [] } }



  if (Array.isArray(payload?.result?.bookings)) {



    return payload.result.bookings;



  }





  // { result: [] }



  if (Array.isArray(payload?.result)) {



    return payload.result;



  }





  // { payload: { bookings: [] } }



  if (Array.isArray(payload?.payload?.bookings)) {



    return payload.payload.bookings;



  }





  console.warn(



    "No bookings array found in backend response."



  );





  return [];



};





/* =========================================================



   BOOKING ID



\========================================================= */





const getBookingId = (item) =>



  item?.id ??



  item?.booking_id ??



  item?.bookingId ??



  item?.booking?.id ??



  null;





/* =========================================================



   CLASS ID



\========================================================= */





const getClassId = (item) =>



  item?.class_id ??



  item?.classId ??



  item?.class?.id ??



  item?.class_details?.id ??



  item?.course_id ??



  item?.courseId ??



  item?.course?.id ??



  null;





/* =========================================================



   CLASS NAME



\========================================================= */





const getClassName = (item) =>



  item?.class_name ||



  item?.class_title ||



  item?.className ||



  item?.class?.name ||



  item?.class?.title ||



  item?.class_details?.name ||



  item?.class_details?.title ||



  item?.course?.title ||



  item?.course?.name ||



  item?.course_name ||



  "Class";





/* =========================================================



   CLASS IMAGE



\========================================================= */





const getClassImage = (item) =>



  item?.class_image ||



  item?.class_image_url ||



  item?.classImage ||



  item?.classImageUrl ||



  item?.image ||



  item?.image_url ||



  item?.imageUrl ||



  item?.class?.image ||



  item?.class?.image_url ||



  item?.class?.imageUrl ||



  item?.class_details?.image ||



  item?.class_details?.image_url ||



  item?.class_details?.imageUrl ||



  item?.course?.image ||



  item?.course?.image_url ||



  item?.course?.imageUrl ||



  null;





/* =========================================================



   TRAINER NAME



\========================================================= */





const getTrainerName = (item) =>



  item?.trainer_name ||



  item?.trainer_full_name ||



  item?.trainerName ||



  item?.trainer?.name ||



  item?.trainer?.full_name ||



  item?.trainer?.fullName ||



  item?.trainer_details?.name ||



  "Trainer";





/* =========================================================



   TRAINER IMAGE



\========================================================= */





const getTrainerImage = (item) =>



  item?.trainer_image ||



  item?.trainer_profile_image ||



  item?.trainerImage ||



  item?.trainerImageUrl ||



  item?.trainer?.image ||



  item?.trainer?.image_url ||



  item?.trainer?.imageUrl ||



  item?.trainer?.profile_image ||



  item?.trainer?.profileImage ||



  item?.trainer_details?.image ||



  null;





/* =========================================================



   AMOUNT



\========================================================= */





const getAmount = (item) => {



  const value =



    item?.payment?.amount ??



    item?.payment?.paid_amount ??



    item?.payment?.total_amount ??



    item?.amount ??



    item?.price ??



    item?.total_amount ??



    item?.payment_amount ??



    item?.booking_amount ??



    item?.paid_amount ??



    item?.course?.price ??



    0;





  const number = Number(value);





  return Number.isFinite(number)



    ? number



    : 0;



};





/* =========================================================



   PAYMENT STATUS



\========================================================= */





const getPaymentStatus = (item) => {



  const value =



    item?.payment?.status ??



    item?.payment_status ??



    item?.paymentStatus ??



    item?.payment?.payment_status ??



    item?.transaction_status ??



    item?.transactionStatus ??



    item?.status ??



    item?.booking_status ??



    item?.bookingStatus ??



    "";





  return String(value)



    .trim()



    .toUpperCase();



};





/* =========================================================



   PAYMENT METHOD



\========================================================= */





const getPaymentMethod = (item) =>



  item?.payment?.method ||



  item?.payment?.payment_method ||



  item?.payment?.paymentMethod ||



  item?.payment?.gateway ||



  item?.payment_method ||



  item?.paymentMethod ||



  item?.method ||



  item?.gateway ||



  "Not available";





/* =========================================================



   TRANSACTION ID



\========================================================= */





const getTransactionId = (item) =>



  item?.payment?.transaction_id ||



  item?.payment?.transactionId ||



  item?.payment?.razorpay_payment_id ||



  item?.payment?.razorpayPaymentId ||



  item?.transaction_id ||



  item?.transactionId ||



  item?.razorpay_payment_id ||



  item?.razorpayPaymentId ||



  item?.payment_id ||



  item?.paymentId ||



  null;





/* =========================================================



   PAYMENT DATE



\========================================================= */





const getPaymentDate = (item) =>



  item?.payment?.paid_at ||



  item?.payment?.paidAt ||



  item?.payment?.created_at ||



  item?.payment?.createdAt ||



  item?.paid_at ||



  item?.paidAt ||



  item?.payment_date ||



  item?.paymentDate ||



  item?.created_at ||



  item?.createdAt ||



  item?.booking_date ||



  item?.bookingDate ||



  item?.booked_on ||



  item?.bookedOn ||



  item?.course?.created_at ||



  null;





/* =========================================================



   BOOKING DATE



\========================================================= */





const getBookingDate = (item) =>



  item?.booked_on ||



  item?.bookedOn ||



  item?.booking_date ||



  item?.bookingDate ||



  item?.created_at ||



  item?.createdAt ||



  getPaymentDate(item);





/* =========================================================



   TIME



\========================================================= */





const getBookingTime = (item) =>



  item?.start_time ||



  item?.startTime ||



  item?.session_start_time ||



  item?.sessionStartTime ||



  item?.time ||



  item?.session?.start_time ||



  item?.session?.startTime ||



  null;





/* =========================================================



   FORMAT DATE



\========================================================= */





const formatDate = (value) => {



  if (!value) {



    return "Date not available";



  }





  const date = new Date(value);





  if (Number.isNaN(date.getTime())) {



    return String(value);



  }





  return date.toLocaleDateString(



    "en-IN",



    {



      day: "2-digit",



      month: "short",



      year: "numeric",



    }



  );



};





/* =========================================================



   FORMAT TIME



\========================================================= */





const formatTime = (value) => {



  if (!value) {



    return "";



  }





  // HH:mm:ss



  if (



    typeof value === "string" &&



    /^\d{2}:\d{2}/.test(value)



  ) {



    const parts = value.split(":");





    let hour = Number(parts[0]);



    const minute = parts[1];





    if (!Number.isFinite(hour)) {



      return value;



    }





    const suffix =



      hour >= 12 ? "PM" : "AM";





    hour = hour % 12 || 12;





    return `${hour}:${minute} ${suffix}`;



  }





  const date = new Date(value);





  if (Number.isNaN(date.getTime())) {



    return String(value);



  }





  return date.toLocaleTimeString(



    "en-IN",



    {



      hour: "numeric",



      minute: "2-digit",



      hour12: true,



    }



  );



};





/* =========================================================



   CURRENCY



\========================================================= */





const formatCurrency = (value) => {



  const number = Number(value || 0);





  return `₹${number.toLocaleString(



    "en-IN",



    {



      maximumFractionDigits: 2,



    }



  )}`;



};





/* =========================================================



   STATUS HELPERS



\========================================================= */





const isPaid = (item) => {



  const status = getPaymentStatus(item);





  return [



    "PAID",



    "SUCCESS",



    "SUCCESSFUL",



    "COMPLETED",



    "CONFIRMED",



  ].includes(status);



};





const isPending = (item) => {



  const status = getPaymentStatus(item);





  return [



    "PENDING",



    "PROCESSING",



    "INITIATED",



    "AWAITING",



  ].includes(status);



};





const isFailed = (item) => {



  const status = getPaymentStatus(item);





  return [



    "FAILED",



    "FAIL",



    "CANCELLED",



    "CANCELED",



    "REJECTED",



    "DECLINED",



  ].includes(status);



};



/* =========================================================

   ONLINE SUBSCRIPTION / RENEWAL HELPERS

========================================================= */



/* =========================================================

   ONLINE / LIVE SUBSCRIPTION HELPERS

   These helpers intentionally accept multiple backend field names.

========================================================= */



const normalizeMode = (value) =>

  String(value || "").trim().toUpperCase().replace(/[\s-]+/g, "_");



const getBookingMode = (item) =>

  normalizeMode(

    item?.booking_mode ??

      item?.bookingMode ??

      item?.booking_type ??

      item?.bookingType ??

      item?.class_mode ??

      item?.classMode ??

      item?.mode ??

      item?.class?.booking_mode ??

      item?.class?.bookingMode ??

      item?.class?.mode ??

      item?.class_details?.booking_mode ??

      item?.class_details?.bookingMode ??

      item?.class_details?.mode

  );



const getBillingType = (item) =>

  normalizeMode(

    item?.billing_type ??

      item?.billingType ??

      item?.subscription_type ??

      item?.subscriptionType ??

      item?.payment?.billing_type ??

      item?.payment?.billingType

  );



const getSubscriptionId = (item) =>

  item?.subscription_id ??

  item?.subscriptionId ??

  item?.razorpay_subscription_id ??

  item?.razorpaySubscriptionId ??

  item?.payment?.subscription_id ??

  item?.payment?.subscriptionId ??

  item?.payment?.razorpay_subscription_id ??

  item?.payment?.razorpaySubscriptionId ??

  null;



const getSubscriptionStatus = (item) =>

  normalizeMode(

    item?.subscription_status ??

      item?.subscriptionStatus ??

      item?.payment?.subscription_status ??

      item?.payment?.subscriptionStatus ??

      item?.subscription?.status

  );



const getSubscriptionEndDate = (item) =>

  item?.subscription_end_date ??

  item?.subscriptionEndDate ??

  item?.subscription_end ??

  item?.subscriptionEnd ??

  item?.payment?.subscription_end_date ??

  item?.payment?.subscriptionEndDate ??

  item?.subscription?.end_date ??

  item?.subscription?.endDate ??

  null;



const getSubscriptionStartDate = (item) =>

  item?.subscription_start_date ??

  item?.subscriptionStartDate ??

  item?.subscription_start ??

  item?.subscriptionStart ??

  item?.payment?.subscription_start_date ??

  item?.payment?.subscriptionStartDate ??

  item?.subscription?.start_date ??

  item?.subscription?.startDate ??

  null;



const hasSubscriptionData = (item) =>

  Boolean(

    getSubscriptionId(item) ||

      getSubscriptionStatus(item) ||

      getSubscriptionEndDate(item) ||

      getSubscriptionStartDate(item)

  );



const isExplicitOfflineBooking = (item) =>

  ["OFFLINE", "OFFLINE_CLASS", "IN_PERSON", "IN_PERSON_CLASS"].includes(

    getBookingMode(item)

  );



const isOnlineBooking = (item) => {

  if (isExplicitOfflineBooking(item)) return false;



  const mode = getBookingMode(item);



  if (

    [

      "ONLINE",

      "ONLINE_CLASS",

      "LIVE",

      "LIVE_CLASS",

      "VIRTUAL",

      "VIRTUAL_CLASS",

    ].includes(mode)

  ) {

    return true;

  }



  // A subscription is used by the live/online payment flow.

  return hasSubscriptionData(item);

};



const isSubscriptionEnded = (item) => {

  if (!isOnlineBooking(item)) return false;



  const billingType = getBillingType(item);

  if (

    billingType &&

    !["MONTHLY", "MONTH", "RECURRING", "SUBSCRIPTION"].includes(

      billingType

    )

  ) {

    return false;

  }



  const status = getSubscriptionStatus(item);



  if (

    [

      "HALTED",

      "CANCELLED",

      "CANCELED",

      "COMPLETED",

      "EXPIRED",

      "ENDED",

      "PAUSED",

    ].includes(status)

  ) {

    return true;

  }



  const endDate = getSubscriptionEndDate(item);

  if (!endDate) return false;



  const end = new Date(endDate);

  if (Number.isNaN(end.getTime())) return false;



  return end.getTime() <= Date.now();

};



const shouldShowRenewButton = (item) =>

  isOnlineBooking(item) && isSubscriptionEnded(item);



const loadRazorpayScript = () => new Promise((resolve) => {

  if (typeof window === "undefined") return resolve(false);

  if (window.Razorpay) return resolve(true);

  const existing = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');

  if (existing) {

    existing.addEventListener("load", () => resolve(true), { once: true });

    existing.addEventListener("error", () => resolve(false), { once: true });

    return;

  }

  const script = document.createElement("script");

  script.src = "https://checkout.razorpay.com/v1/checkout.js";

  script.async = true;

  script.onload = () => resolve(true);

  script.onerror = () => resolve(false);

  document.body.appendChild(script);

});





/* =========================================================



   SAFE IMAGE



\========================================================= */





function SafeImage({



  src,



  alt = "",



  className = "",



}) {



  const [failed, setFailed] =



    useState(false);





  useEffect(() => {



    setFailed(false);



  }, [src]);





  if (!src || failed) {



    return (



      <div



        className={`flex items-center justify-center bg-[#000000] ${className}`}



      >



        <FaGraduationCap



          size={25}



          className="text-blue-500/50"



        />



      </div>



    );



  }





  return (



    <img



      src={src}



      alt={alt}



      className={className}



      loading="lazy"



      onError={() => {



        console.error(



          "IMAGE FAILED:",



          src



        );





        setFailed(true);



      }}



    />



  );



}





/* =========================================================



   STAT CARD



\========================================================= */





function StatCard({



  icon,



  title,



  value,



  iconClass,



}) {



  return (



    <div



      className="rounded-2xl border p-5"



      style={{



        background:



          COLORS.card,



        borderColor:



          COLORS.border,



      }}



    >



      <div className="flex items-center gap-4">





        <div



          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${iconClass}`}



        >



          {icon}



        </div>





        <div>



          <p className="text-[13px] text-white">



            {title}



          </p>





          <p className="mt-1 text-[25px] font-bold text-white">



            {value}



          </p>



        </div>





      </div>



    </div>



  );



}





/* =========================================================



   STATUS BADGE



\========================================================= */





function StatusBadge({



  booking,



}) {



  if (isPaid(booking)) {



    return (



      <span className="inline-flex items-center gap-2 rounded-lg bg-emerald-500/15 px-4 py-2 text-sm font-semibold text-emerald-300">



        <FaCheckCircle />



        Paid



      </span>



    );



  }





  if (isPending(booking)) {



    return (



      <span className="inline-flex items-center gap-2 rounded-lg bg-yellow-500/15 px-4 py-2 text-sm font-semibold text-yellow-300">



        <FaClock />



        Pending



      </span>



    );



  }





  if (isFailed(booking)) {



    return (



      <span className="inline-flex items-center gap-2 rounded-lg bg-red-500/15 px-4 py-2 text-sm font-semibold text-red-300">



        <FaTimesCircle />



        Failed



      </span>



    );



  }





  return (



    <span className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-white">



      <FaClock />



      {getPaymentStatus(



        booking



      ) || "Pending"}



    </span>



  );



}





/* =========================================================



   PAYMENT DETAILS MODAL



\========================================================= */





function PaymentDetailsModal({



  booking,



  onClose,



}) {



  if (!booking) {



    return null;



  }





  const className =



    getClassName(booking);





  const classImage =



    getClassImage(booking);





  const trainerName =



    getTrainerName(booking);





  const trainerImage =



    getTrainerImage(booking);





  const transactionId =



    getTransactionId(booking);





  const classId =



    getClassId(booking);





  return (



    <div



       className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm"



      onMouseDown={(event) => {



        if (



          event.target ===



          event.currentTarget



        ) {



          onClose();



        }



      }}



    >



      <div className="relative max-h-[90vh] w-full max-w-[650px] overflow-y-auto rounded-2xl border border-blue-500/30 bg-[#000000] shadow-2xl">





        {/* HEADER */}



        <div className="sticky top-0 flex items-center justify-between border-b border-white/10 bg-[#000000] px-6 py-5">





          <div>



            <p className="text-xs text-blue-400">



              BOOKING DETAILS



            </p>





            <h2 className="mt-1 text-xl font-bold text-white">



              {className}



            </h2>



          </div>





          <button



            type="button"



            onClick={onClose}



            className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-white hover:bg-white/10 hover:text-white"



          >



            <FaTimes />



          </button>





        </div>





        <div className="p-6">





          {/* CLASS */}



          <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-[#000000] p-4">





            <SafeImage



              src={classImage}



              alt={className}



              className="h-20 w-24 rounded-lg object-cover"



            />





            <div className="min-w-0">





              <h3 className="truncate text-lg font-bold text-white">



                {className}



              </h3>





              {classId && (



                <p className="mt-1 text-xs text-white">



                  Class ID: {classId}



                </p>



              )}





            </div>



          </div>





          {/* DETAILS */}



          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">





            <div className="rounded-xl bg-[#000000] p-4">



              <p className="text-xs text-white">



                Amount



              </p>





              <p className="mt-1 text-lg font-bold text-white">



                {formatCurrency(



                  getAmount(booking)



                )}



              </p>



            </div>





            <div className="rounded-xl bg-[#000000] p-4">





              <p className="text-xs text-white">



                Payment Status



              </p>





              <div className="mt-2">



                <StatusBadge



                  booking={booking}



                />



              </div>





            </div>





            <div className="rounded-xl bg-[#000000] p-4">





              <p className="text-xs text-white">



                Booking Date



              </p>





              <p className="mt-1 font-semibold text-white">



                {formatDate(



                  getBookingDate(



                    booking



                  )



                )}



              </p>





            </div>





            <div className="rounded-xl bg-[#000000] p-4">





              <p className="text-xs text-white">



                Class Time



              </p>





              <p className="mt-1 font-semibold text-white">



                {formatTime(



                  getBookingTime(



                    booking



                  )



                ) || "—"}



              </p>





            </div>





            <div className="rounded-xl bg-[#000000] p-4">





              <p className="text-xs text-white">



                Payment Method



              </p>





              <p className="mt-1 font-semibold text-white">



                {getPaymentMethod(



                  booking



                )}



              </p>





            </div>





            <div className="rounded-xl bg-[#000000] p-4">





              <p className="text-xs text-white">



                Booking ID



              </p>





              <p className="mt-1 font-semibold text-white">



                #



                {getBookingId(



                  booking



                ) ?? "—"}



              </p>





            </div>





          </div>





          {/* TRAINER */}



          <div className="mt-5 rounded-xl border border-white/10 bg-[#000000] p-4">





            <p className="mb-3 text-xs text-white">



              Trainer



            </p>





            <div className="flex items-center gap-3">





              <SafeImage



                src={trainerImage}



                alt={trainerName}



                className="h-11 w-11 rounded-full object-cover"



              />





              <span className="font-semibold text-white">



                {trainerName}



              </span>





            </div>





          </div>





          {/* TRANSACTION */}



          {transactionId && (



            <div className="mt-5 rounded-xl bg-[#000000] p-4">





              <p className="text-xs text-white">



                Transaction ID



              </p>





              <p className="mt-1 break-all text-sm font-medium text-white">



                {transactionId}



              </p>





            </div>



          )}





        </div>



      </div>



    </div>



  );



}





/* =========================================================



   MAIN PAGE



\========================================================= */





export default function WebsitePaymentDetails() {
  useEffect(() => {
    const previous = {
      html: document.documentElement.style.backgroundColor,
      body: document.body.style.backgroundColor,
      color: document.body.style.color,
      margin: document.body.style.margin,
    };
    document.documentElement.style.backgroundColor = "#000000";
    document.body.style.backgroundColor = "#000000";
    document.body.style.color = "#FFFFFF";
    document.body.style.margin = "0";
    return () => {
      document.documentElement.style.backgroundColor = previous.html;
      document.body.style.backgroundColor = previous.body;
      document.body.style.color = previous.color;
      document.body.style.margin = previous.margin;
    };
  }, []);




  const navigate =



    useNavigate();





  const [bookings, setBookings] =



    useState([]);





  const [loading, setLoading] =



    useState(true);





  const [error, setError] =



    useState("");





  const [search, setSearch] =



    useState("");





  const [statusFilter, setStatusFilter] =



    useState("ALL");





  const [classFilter, setClassFilter] =



    useState("ALL");





  const [selectedBooking, setSelectedBooking] = useState(null);



  const [renewingBookingId, setRenewingBookingId] = useState(null);



  const [renewError, setRenewError] = useState("");





  /* =======================================================

     RENEW EXPIRED ONLINE / LIVE CLASS

  ======================================================= */



  const handleRenewLiveClass = async (booking) => {

    const bookingId = getBookingId(booking);

    const classId = getClassId(booking);



    if (!bookingId) return setRenewError("Booking ID is missing.");

    if (!classId) return setRenewError("Class ID is missing.");

    if (!isSubscriptionEnded(booking)) return setRenewError("This live class does not currently require renewal.");



    try {

      setRenewError("");

      setRenewingBookingId(bookingId);

      if (!(await loadRazorpayScript())) throw new Error("Unable to load Razorpay. Please try again.");



      const currentUser = getAuth().currentUser;

      if (!currentUser) throw new Error("Please sign in again before renewing this class.");

      const token = await currentUser.getIdToken();



      const response = await API.post("/payment/create-subscription", { booking_id: bookingId, class_id: classId }, { headers: { Authorization: `Bearer ${token}` } });

      const subscription = response?.data?.data || response?.data || response;



      if (!subscription?.subscription_id) throw new Error("Razorpay subscription ID was not returned.");

      if (!subscription?.key_id) throw new Error("Razorpay key was not returned.");

      if (typeof window === "undefined" || !window.Razorpay) throw new Error("Razorpay is not available. Please refresh and try again.");



      const razorpay = new window.Razorpay({

        key: subscription.key_id,

        subscription_id: subscription.subscription_id,

        name: "FineArts",

        description: `${getClassName(booking)} - Live Class Renewal`,

        prefill: { name: currentUser.displayName || "", email: currentUser.email || "", contact: currentUser.phoneNumber || "" },

        theme: { color: "#7C3AED" },

        handler: async (paymentResponse) => {

          try {

            const subscriptionId = paymentResponse?.razorpay_subscription_id || subscription.subscription_id;

            const paymentId = paymentResponse?.razorpay_payment_id;

            const signature = paymentResponse?.razorpay_signature;

            if (!subscriptionId || !paymentId || !signature) throw new Error("Razorpay returned incomplete payment details.");



            await API.post("/payment/verify-subscription", {

              booking_id: bookingId,

              razorpay_subscription_id: subscriptionId,

              razorpay_payment_id: paymentId,

              razorpay_signature: signature,

            }, { headers: { Authorization: `Bearer ${token}` } });



            const refreshed = await API.get("/bookings/my", { headers: { Authorization: `Bearer ${token}` } });

            setBookings(getBookingsArray(refreshed));

            setRenewError("");

            alert("Live class renewed successfully!");

          } catch (error) {

            console.error("RENEWAL VERIFICATION ERROR:", error);

            setRenewError(error?.response?.data?.message || error?.message || "Renewal verification failed.");

          } finally {

            setRenewingBookingId(null);

          }

        },

        modal: { ondismiss: () => setRenewingBookingId(null) },

      });



      razorpay.on("payment.failed", (paymentError) => {

        console.error("LIVE CLASS RENEWAL FAILED:", paymentError);

        setRenewError(paymentError?.error?.description || "Renewal payment failed. Please try again.");

        setRenewingBookingId(null);

      });

      razorpay.open();

    } catch (error) {

      console.error("LIVE CLASS RENEWAL ERROR:", error);

      setRenewError(error?.response?.data?.message || error?.message || "Unable to start renewal.");

      setRenewingBookingId(null);

    }

  };





  /* =======================================================



     FETCH USER BOOKINGS



  ======================================================= */





  useEffect(() => {



    let mounted = true;





    const fetchBookings = async () => {



      try {



        setLoading(true);



        setError("");





        console.log(



          "================================="



        );





        console.log(



          "PAYMENTS PAGE - FETCH BOOKINGS"



        );





        console.log(



          "GET /bookings/my"



        );





        /* ===================================================



           GET FIREBASE USER TOKEN





           API interceptor should already add it,



           but we explicitly send it too so this page



           is reliable.



        =================================================== */





        let config = {};





        try {



          const auth =



            getAuth();





          const currentUser =



            auth.currentUser;





          if (currentUser) {



            const token =



              await currentUser.getIdToken();





            config = {



              headers: {



                Authorization:



                  `Bearer ${token}`,



              },



            };





            console.log(



              "Firebase token: FOUND"



            );



          } else {



            console.warn(



              "Firebase currentUser not found. API interceptor will be used."



            );



          }



        } catch (tokenError) {



          console.warn(



            "Unable to get Firebase token:",



            tokenError



          );



        }





        /* ===================================================



           CORRECT BACKEND ROUTE



        =================================================== */





        const response =



          await API.get(



            "/bookings/my",



            config



          );





        console.log(



          "BOOKINGS API RESPONSE:",



          response



        );





        console.log(



          "BOOKINGS API DATA:",



          response?.data



        );





        /* ===================================================



           NORMALIZE RESPONSE



        =================================================== */





        const list =



          getBookingsArray(



            response



          );





        console.log(



          "FINAL BOOKINGS ARRAY:",



          list



        );





        console.log(



          "BOOKINGS COUNT:",



          list.length



        );





        if (mounted) {



          setBookings(



            Array.isArray(list)



              ? list



              : []



          );



        }





      } catch (err) {





        console.error(



          "PAYMENTS PAGE ERROR:",



          err



        );





        console.error(



          "PAYMENTS ERROR RESPONSE:",



          err?.response?.data



        );





        if (mounted) {



          setBookings([]);





          setError(



            err?.response?.data?.message ||



            err?.message ||



            "Unable to load bookings."



          );



        }





      } finally {





        if (mounted) {



          setLoading(false);



        }





      }



    };





    fetchBookings();





    return () => {



      mounted = false;



    };



  }, []);





  /* =======================================================



     CLASS FILTER OPTIONS



  ======================================================= */





  const classOptions =



    useMemo(() => {





      const names =



        bookings



          .map((booking) =>



            getClassName(



              booking



            )



          )



          .filter(



            (name) =>



              name &&



              name !== "Class"



          );





      return [



        ...new Set(names),



      ];





    }, [bookings]);





  /* =======================================================



     STATISTICS



  ======================================================= */





  const stats =



    useMemo(() => {





      const totalPaid =



        bookings



          .filter(isPaid)



          .reduce(



            (sum, booking) =>



              sum +



              getAmount(



                booking



              ),



            0



          );





      const pending =



        bookings.filter(



          isPending



        ).length;





      const completed =



        bookings.filter(



          isPaid



        ).length;





      return {



        totalPaid,



        pending,



        completed,



        totalBookings:



          bookings.length,



      };





    }, [bookings]);





  /* =======================================================



     FILTER BOOKINGS



  ======================================================= */





  const filteredBookings =



    useMemo(() => {





      const query =



        search



          .trim()



          .toLowerCase();





      return bookings.filter(



        (booking) => {





          const className =



            getClassName(



              booking



            )



              .toLowerCase();





          const trainerName =



            getTrainerName(



              booking



            )



              .toLowerCase();





          const transactionId =



            String(



              getTransactionId(



                booking



              ) || ""



            )



              .toLowerCase();





          const bookingId =



            String(



              getBookingId(



                booking



              ) || ""



            )



              .toLowerCase();





          const matchesSearch =



            !query ||



            className.includes(



              query



            ) ||



            trainerName.includes(



              query



            ) ||



            transactionId.includes(



              query



            ) ||



            bookingId.includes(



              query



            );





          let matchesStatus =



            true;





          if (



            statusFilter ===



            "SUCCESSFUL"



          ) {



            matchesStatus =



              isPaid(



                booking



              );



          }





          if (



            statusFilter ===



            "PENDING"



          ) {



            matchesStatus =



              isPending(



                booking



              );



          }





          if (



            statusFilter ===



            "FAILED"



          ) {



            matchesStatus =



              isFailed(



                booking



              );



          }





          const matchesClass =



            classFilter === "ALL" ||



            getClassName(



              booking



            ) === classFilter;





          return (



            matchesSearch &&



            matchesStatus &&



            matchesClass



          );



        }



      );





    }, [



      bookings,



      search,



      statusFilter,



      classFilter,



    ]);





  /* =======================================================



     LOADING



  ======================================================= */





  if (loading) {



    return (



      <div className="min-h-screen bg-black text-white">





   <main className="flex min-h-screen items-center justify-center pt-4">





          <div className="flex flex-col items-center">





            <FaSpinner



              className="animate-spin text-blue-500"



              size={35}



            />





            <p className="mt-4 text-sm text-white">



              Loading payment details...



            </p>





          </div>





        </main>



      </div>



    );



  }





  /* =======================================================



     PAGE



  ======================================================= */





  return (



    <div className="min-h-screen bg-black text-white">





<main className="px-4 pb-16 pt-4 sm:px-6 lg:px-8">



      {renewError && (

        <div className="mx-auto w-full max-w-[1500px] px-4 pt-4 lg:px-8">

          <div className="flex items-start gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 p-4">

            <FaTimesCircle className="mt-0.5 shrink-0 text-red-400" />

            <div className="min-w-0 flex-1">

              <p className="font-semibold text-red-300">Renewal failed</p>

              <p className="mt-1 text-sm text-red-200/80">{renewError}</p>

            </div>

            <button type="button" onClick={() => setRenewError("")} className="text-red-300 hover:text-white" aria-label="Close renewal error"><FaTimes /></button>

          </div>

        </div>

      )}





        <div className="mx-auto max-w-[1580px]">





          {/* =================================================



              TITLE



          ================================================= */}





          <div className="mb-8">





            <h1 className="text-4xl font-bold sm:text-5xl">





              <span className="text-white">



                Payments



              </span>





              <span className="bg-gradient-to-r from-[#1687FF] to-[#087CFF] bg-clip-text text-transparent">



                {" "}Details



              </span>





            </h1>





            <p className="mt-2 text-base text-white">



              Track your class payments and transactions.



            </p>





          </div>





          {/* =================================================



              ERROR



          ================================================= */}





          {error && (



            <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/5 p-5">





              <div className="flex items-start justify-between gap-4">





                <div>



                  <p className="font-semibold text-red-300">



                    Unable to load bookings



                  </p>





                  <p className="mt-1 text-sm text-white">



                    {error}



                  </p>



                </div>





                <button



                  type="button"



                  onClick={() =>



                    window.location.reload()



                  }



                  className="rounded-lg border border-blue-500/50 px-4 py-2 text-sm text-blue-300 hover:bg-blue-500/10"



                >



                  Retry



                </button>





              </div>





            </div>



          )}





          {/* =================================================



              STAT CARDS



          ================================================= */}





        <div className="grid grid-cols-4 gap-5">



  <StatCard



    icon={<FaWallet size={25} />}



    title="Total Paid"



    value={formatCurrency(stats.totalPaid)}



    iconClass="bg-purple-500/15 text-purple-400"



  />





  <StatCard



    icon={<FaClock size={25} />}



    title="Pending Payment"



    value={stats.pending}



    iconClass="bg-yellow-500/15 text-yellow-400"



  />





  <StatCard



    icon={<FaCheckCircle size={25} />}



    title="Completed Payments"



    value={stats.completed}



    iconClass="bg-purple-500/15 text-purple-400"



  />





  <StatCard



    icon={<FaReceipt size={25} />}



    title="Total Bookings"



    value={stats.totalBookings}



    iconClass="bg-pink-500/15 text-pink-400"



  />



</div>



          {/* =================================================



              STATUS TABS



          ================================================= */}





          <div className="mt-7 overflow-hidden rounded-2xl border border-white/10 bg-[#000000]">





            <div className="grid grid-cols-2 sm:grid-cols-4">





              {/* ALL */}



              <button



                type="button"



                onClick={() =>



                  setStatusFilter(



                    "ALL"



                  )



                }



                className={`flex h-[72px] items-center justify-center gap-3 border-b border-white/10 text-sm font-semibold transition sm:border-b-0 sm:border-r ${



                  statusFilter ===



                  "ALL"



                    ? "bg-gradient-to-r from-[#1687FF] to-[#087CFF] text-white"



                    : "text-white hover:bg-white/5"



                }`}



              >



                <FaList />



                All Transactions



              </button>





              {/* SUCCESSFUL */}



              <button



                type="button"



                onClick={() =>



                  setStatusFilter(



                    "SUCCESSFUL"



                  )



                }



                className={`flex h-[72px] items-center justify-center gap-3 border-b border-white/10 text-sm font-semibold transition sm:border-b-0 sm:border-r ${



                  statusFilter ===



                  "SUCCESSFUL"



                    ? "bg-white/5 text-white"



                    : "text-white hover:bg-white/5"



                }`}



              >



                <FaCheckCircle />



                Successful



              </button>





              {/* PENDING */}



              <button



                type="button"



                onClick={() =>



                  setStatusFilter(



                    "PENDING"



                  )



                }



                className={`flex h-[72px] items-center justify-center gap-3 border-b border-white/10 text-sm font-semibold transition sm:border-b-0 sm:border-r ${



                  statusFilter ===



                  "PENDING"



                    ? "bg-white/5 text-white"



                    : "text-white hover:bg-white/5"



                }`}



              >



                <FaClock />



                Pending



              </button>





              {/* FAILED */}



              <button



                type="button"



                onClick={() =>



                  setStatusFilter(



                    "FAILED"



                  )



                }



                className={`flex h-[72px] items-center justify-center gap-3 text-sm font-semibold transition ${



                  statusFilter ===



                  "FAILED"



                    ? "bg-white/5 text-white"



                    : "text-white hover:bg-white/5"



                }`}



              >



                <FaTimesCircle />



                Failed



              </button>





            </div>





          </div>





          {/* =================================================



              SEARCH + FILTERS



          ================================================= */}





          <div className="mt-5 flex flex-col gap-4 lg:flex-row">





            {/* SEARCH */}



            <div className="relative flex-1">





              <FaSearch



                className="absolute left-5 top-1/2 -translate-y-1/2 text-white"



                size={18}



              />





              <input



                type="text"



                value={search}



                onChange={(event) =>



                  setSearch(



                    event.target.value



                  )



                }



                placeholder="Search by class name, transaction ID or booking ID..."



                className="h-[62px] w-full rounded-2xl border border-blue-500 bg-[#000000] pl-14 pr-5 text-sm text-white outline-none placeholder:text-white focus:border-blue-400"



              />





              {search && (



                <button



                  type="button"



                  onClick={() =>



                    setSearch("")



                  }



                  className="absolute right-5 top-1/2 -translate-y-1/2 text-white hover:text-white"



                >



                  <FaTimes />



                </button>



              )}





            </div>





            {/* STATUS */}



            <div className="relative w-full lg:w-[185px]">





              <select



                value={



                  statusFilter



                }



                onChange={(event) =>



                  setStatusFilter(



                    event.target.value



                  )



                }



                className="h-[62px] w-full appearance-none rounded-2xl border border-white/10 bg-[#000000] px-5 pr-10 text-sm text-white outline-none focus:border-blue-500"



              >





                <option value="ALL">



                  All Status



                </option>





                <option value="SUCCESSFUL">



                  Successful



                </option>





                <option value="PENDING">



                  Pending



                </option>





                <option value="FAILED">



                  Failed



                </option>





              </select>





              <FaChevronDown



                className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-white"



                size={12}



              />





            </div>





            {/* CLASS */}



            <div className="relative w-full lg:w-[250px]">





              <select



                value={



                  classFilter



                }



                onChange={(event) =>



                  setClassFilter(



                    event.target.value



                  )



                }



                className="h-[62px] w-full appearance-none rounded-2xl border border-white/10 bg-[#000000] px-5 pr-10 text-sm text-white outline-none focus:border-blue-500"



              >





                <option value="ALL">



                  All Classes



                </option>





                {classOptions.map(



                  (className) => (



                    <option



                      key={className}



                      value={className}



                    >



                      {className}



                    </option>



                  )



                )}





              </select>





              <FaChevronDown



                className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-white"



                size={12}



              />





            </div>





          </div>





          {/* =================================================



              TRANSACTIONS TABLE



          ================================================= */}





          <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-[#000000]">





            {/* DESKTOP */}



            <div className="hidden overflow-x-auto lg:block">





              <table className="w-full min-w-[1050px]">





                <thead>





                  <tr className="border-b border-white/10 bg-[#000000]">





                    <th className="px-5 py-5 text-left text-xs font-semibold text-white">



                      #



                    </th>





                    <th className="px-5 py-5 text-left text-xs font-semibold text-white">



                      Class / Session



                    </th>





                    <th className="px-5 py-5 text-left text-xs font-semibold text-white">



                      Date



                    </th>





                    <th className="px-5 py-5 text-left text-xs font-semibold text-white">



                      Amount



                    </th>





                    <th className="px-5 py-5 text-left text-xs font-semibold text-white">



                      Payment Method



                    </th>





                    <th className="px-5 py-5 text-left text-xs font-semibold text-white">



                      Status



                    </th>





                    <th className="px-5 py-5 text-left text-xs font-semibold text-white">



                      Action



                    </th>





                  </tr>





                </thead>





                <tbody>





                  {filteredBookings.map(



                    (booking, index) => {





                      const className =



                        getClassName(



                          booking



                        );





                      const classImage =



                        getClassImage(



                          booking



                        );





                      const trainerName =



                        getTrainerName(



                          booking



                        );





                      return (



                        <tr



                          key={



                            getBookingId(



                              booking



                            ) ??



                            `${className}-${index}`



                          }



                          className="border-b border-white/[.07] transition hover:bg-white/[.025]"



                        >





                          {/* NUMBER */}



                          <td className="px-5 py-5 text-sm text-white">



                            {index + 1}



                          </td>





                          {/* CLASS */}



                          <td className="px-5 py-5">





                            <div className="flex items-center gap-4">





                              <SafeImage



                                src={



                                  classImage



                                }



                                alt={



                                  className



                                }



                                className="h-[58px] w-[78px] shrink-0 rounded-lg object-cover"



                              />





                              <div className="min-w-0">





                                <p className="max-w-[300px] truncate text-sm font-bold text-white">



                                  {className}



                                </p>





                                <p className="mt-1 text-xs text-white">



                                  Trainer:{" "}



                                  {



                                    trainerName



                                  }



                                </p>





                              </div>





                            </div>





                          </td>





                          {/* DATE */}



                          <td className="px-5 py-5">





                            <p className="text-sm text-white">



                              {formatDate(



                                getBookingDate(



                                  booking



                                )



                              )}



                            </p>





                            <p className="mt-1 text-xs text-white">



                              {formatTime(



                                getBookingTime(



                                  booking



                                )



                              )}



                            </p>





                          </td>





                          {/* AMOUNT */}



                          <td className="px-5 py-5">





                            <span className="text-sm font-bold text-white">



                              {formatCurrency(



                                getAmount(



                                  booking



                                )



                              )}



                            </span>





                          </td>





                          {/* PAYMENT METHOD */}



                          <td className="px-5 py-5">





                            <div className="flex items-center gap-3">





                              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5">



                                <FaCreditCard className="text-white" />



                              </div>





                              <span className="text-sm font-semibold text-white">



                                {getPaymentMethod(



                                  booking



                                )}



                              </span>





                            </div>





                          </td>





                          {/* STATUS */}



                          <td className="px-5 py-5">





                            <StatusBadge



                              booking={



                                booking



                              }



                            />





                          </td>





                          {/* ACTION */}



                          <td className="px-5 py-5">





                            <button



                              type="button"



                              onClick={() =>



                                setSelectedBooking(



                                  booking



                                )



                              }



                              className="flex h-11 items-center gap-2 rounded-xl border border-blue-500/70 px-5 text-sm font-semibold text-white transition hover:bg-blue-500/10"



                            >



                              <FaEye />



                              View



                            </button>



                            {shouldShowRenewButton(booking) && (

                              <button type="button" disabled={renewingBookingId === getBookingId(booking)} onClick={() => handleRenewLiveClass(booking)} className="mt-2 flex h-11 items-center gap-2 rounded-xl bg-gradient-to-r from-[#1687FF] to-[#087CFF] px-5 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60">

                                {renewingBookingId === getBookingId(booking) ? (

                                  <><FaSpinner className="animate-spin" /> Processing...</>

                                ) : (

                                  <><FaCreditCard /> Renew Live Class</>

                                )}

                              </button>

                            )}





                          </td>





                        </tr>



                      );



                    }



                  )}





                </tbody>





              </table>





            </div>





            {/* MOBILE */}



            <div className="block lg:hidden">





              {filteredBookings.map(



                (booking, index) => {





                  const className =



                    getClassName(



                      booking



                    );





                  const classImage =



                    getClassImage(



                      booking



                    );





                  const trainerName =



                    getTrainerName(



                      booking



                    );





                  return (



                    <div



                      key={



                        getBookingId(



                          booking



                        ) ??



                        `${className}-${index}`



                      }



                      className="border-b border-white/10 p-5 last:border-b-0"



                    >





                      <div className="flex gap-4">





                        <SafeImage



                          src={



                            classImage



                          }



                          alt={



                            className



                          }



                          className="h-20 w-24 shrink-0 rounded-xl object-cover"



                        />





                        <div className="min-w-0 flex-1">





                          <h3 className="font-bold text-white">



                            {className}



                          </h3>





                          <p className="mt-1 text-xs text-white">



                            Trainer:{" "}



                            {trainerName}



                          </p>





                          <div className="mt-3">





                            <StatusBadge



                              booking={



                                booking



                              }



                            />





                          </div>





                        </div>





                      </div>





                      <div className="mt-5 grid grid-cols-2 gap-3">





                        <div className="rounded-xl bg-[#000000] p-3">





                          <p className="text-[10px] text-white">



                            Booking Date



                          </p>





                          <p className="mt-1 text-xs font-semibold text-white">



                            {formatDate(



                              getBookingDate(



                                booking



                              )



                            )}



                          </p>





                        </div>





                        <div className="rounded-xl bg-[#000000] p-3">





                          <p className="text-[10px] text-white">



                            Amount



                          </p>





                          <p className="mt-1 text-xs font-bold text-white">



                            {formatCurrency(



                              getAmount(



                                booking



                              )



                            )}



                          </p>





                        </div>





                        <div className="rounded-xl bg-[#000000] p-3">





                          <p className="text-[10px] text-white">



                            Payment Method



                          </p>





                          <p className="mt-1 truncate text-xs font-semibold text-white">



                            {getPaymentMethod(



                              booking



                            )}



                          </p>





                        </div>





                        <div className="rounded-xl bg-[#000000] p-3">





                          <p className="text-[10px] text-white">



                            Booking ID



                          </p>





                          <p className="mt-1 text-xs font-semibold text-white">



                            #



                            {getBookingId(



                              booking



                            ) ?? "—"}



                          </p>





                        </div>





                      </div>





                      <button



                        type="button"



                        onClick={() =>



                          setSelectedBooking(



                            booking



                          )



                        }



                        className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-blue-500/70 text-sm font-semibold text-white hover:bg-blue-500/10"



                      >



                        <FaEye />



                        View Payment



                      </button>



                      {shouldShowRenewButton(booking) && (

                        <button type="button" disabled={renewingBookingId === getBookingId(booking)} onClick={() => handleRenewLiveClass(booking)} className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#1687FF] to-[#087CFF] text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60">

                          {renewingBookingId === getBookingId(booking) ? (

                            <><FaSpinner className="animate-spin" /> Processing...</>

                          ) : (

                            <><FaCreditCard /> Renew Live Class</>

                          )}

                        </button>

                      )}





                    </div>



                  );



                }



              )}





            </div>





            {/* EMPTY */}



            {filteredBookings.length === 0 && (



              <div className="px-6 py-20 text-center">





                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10">





                  <FaCreditCard



                    size={25}



                    className="text-blue-400"



                  />





                </div>





                <h3 className="mt-5 text-lg font-bold text-white">



                  No transactions found



                </h3>





                <p className="mt-2 text-sm text-white">



                  {bookings.length === 0



                    ? "No bookings were returned by the backend."



                    : "Try changing your search or filters."}



                </p>





              </div>



            )}





          </div>





        </div>





      </main>





      {/* =====================================================



          PAYMENT MODAL



      ===================================================== */}





      <PaymentDetailsModal



        booking={



          selectedBooking



        }



        onClose={() =>



          setSelectedBooking(



            null



          )



        }



      />





    </div>



  );



}