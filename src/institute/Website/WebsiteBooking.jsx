import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import {
  FaTimes,
  FaCheck,
  FaLock,
  FaGlobe,
  FaClock,
  FaCalendarAlt,
} from "react-icons/fa";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { createBooking } from "../../services/bookingService";
import {
  getClassSessionsForBooking,
} from "../../services/session.service";
import {
  createRazorpayOrder,
  verifyRazorpayPayment,
  loadRazorpayScript,
} from "../../services/paymentService";
import { useCurrencyWithRates } from "../../utils/currency";

const WebsiteBooking = ({
  isOpen,
  onClose,
  selectedClass: selectedClassProp,
  selectedTrainer: selectedTrainerProp,
}) => {
  const navigate = useNavigate();
  const context = useOutletContext() || {};

  /* =========================================================
     SELECTED CLASS / TRAINER
  ========================================================= */

  const selectedClass =
    selectedClassProp ??
    context.selectedClass ??
    context.bookingClass ??
    null;

  const selectedTrainer =
    selectedTrainerProp ??
    context.selectedTrainer ??
    null;

  const showBookingModal =
    typeof isOpen === "boolean"
      ? isOpen
      : Boolean(context.showBookingModal);

  const closeModal =
    onClose ||
    context.setShowBookingModal ||
    (() => {});

  const currentClass =
    selectedClass?.class ||
    selectedClass ||
    null;

  /* =========================================================
     BRANDING
  ========================================================= */

  const branding = context.branding || {};

  const primaryColor =
    branding.primaryColor ||
    branding.primary_color ||
    branding.buttonColor ||
    branding.button_color ||
    "#7C3AED";

  const secondaryColor =
    branding.secondaryColor ||
    branding.secondary_color ||
    branding.navbarColor ||
    branding.navbar_color ||
    "#111827";

  /* =========================================================
     CURRENCY
  ========================================================= */

  const cur = useCurrencyWithRates();

  const showConvertedPrice = cur.code !== "INR";

  /* =========================================================
     STATE
  ========================================================= */

  const [isProcessing, setIsProcessing] = useState(false);
  const [loadingBatches, setLoadingBatches] = useState(false);

  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState(null);

  const [bookingData, setBookingData] = useState(null);
  const [paymentData, setPaymentData] = useState(null);

  const [error, setError] = useState("");

  /* =========================================================
     RESET
  ========================================================= */

  const resetBookingState = () => {
    setBatches([]);
    setSelectedBatch(null);
    setBookingData(null);
    setPaymentData(null);
    setLoadingBatches(false);
    setIsProcessing(false);
    setError("");
  };

  const handleClose = () => {
    closeModal(false);

    setTimeout(() => {
      resetBookingState();
    }, 250);
  };

  /* =========================================================
     BODY SCROLL
  ========================================================= */

  useEffect(() => {
    if (showBookingModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showBookingModal]);

  /* =========================================================
     LOAD BATCHES
  ========================================================= */

  useEffect(() => {
    if (!showBookingModal || !currentClass?.id) {
      return;
    }

    let cancelled = false;

    const loadAvailableBatches = async () => {
      try {
        setLoadingBatches(true);
        setError("");
        setSelectedBatch(null);
        setBookingData(null);
        setPaymentData(null);

        const response = await getClassSessionsForBooking(
          currentClass.id
        );

        console.log(
          "WEBSITE BOOKING BATCH RESPONSE:",
          response
        );

        if (cancelled) return;

        /*
         * getClassSessionsForBooking() already returns
         * res.data.data according to session.service.js.
         *
         * Support both an array and wrapped responses so
         * the component remains safe if backend response changes.
         */

        let data = [];

        if (Array.isArray(response)) {
          data = response;
        } else if (Array.isArray(response?.batches)) {
          data = response.batches;
        } else if (Array.isArray(response?.data)) {
          data = response.data;
        } else if (Array.isArray(response?.data?.batches)) {
          data = response.data.batches;
        }

        setBatches(data);
      } catch (err) {
        if (cancelled) return;

        console.error(
          "LOAD WEBSITE BOOKING BATCHES ERROR:",
          err
        );

        setBatches([]);

        setError(
          err?.response?.data?.message ||
            err?.message ||
            "Unable to load class batches."
        );
      } finally {
        if (!cancelled) {
          setLoadingBatches(false);
        }
      }
    };

    loadAvailableBatches();

    return () => {
      cancelled = true;
    };
  }, [showBookingModal, currentClass?.id]);

  /* =========================================================
     SELECT BATCH
  ========================================================= */

  const handleSelectBatch = (batch) => {
    setSelectedBatch(batch);
    setError("");
  };

  /* =========================================================
     GET SESSION ID
  ========================================================= */

  const getBatchSessionId = (batch) => {
    return (
      batch?.session_id ??
      batch?.sessionId ??
      batch?.id ??
      null
    );
  };

  /* =========================================================
     BOOKING
  ========================================================= */

  const handleBooking = async () => {
    try {
      setError("");

      if (!currentClass?.id) {
        setError("Class not selected.");
        return;
      }

      if (!selectedBatch) {
        setError("Please select a batch.");
        return;
      }

      const sessionId = getBatchSessionId(selectedBatch);

      if (!sessionId) {
        setError(
          "Selected batch does not contain a valid session."
        );
        return;
      }

      setIsProcessing(true);

      /* =====================================================
         FIREBASE LOGIN
      ===================================================== */

      const auth = getAuth();

      let currentUser = auth.currentUser;

      if (!currentUser) {
        const provider = new GoogleAuthProvider();

        const result = await signInWithPopup(
          auth,
          provider
        );

        currentUser = result.user;
      }

      if (!currentUser) {
        throw new Error(
          "Unable to authenticate student."
        );
      }

      const token = await currentUser.getIdToken(true);

      if (!token) {
        throw new Error(
          "Firebase authentication token missing."
        );
      }

      /* =====================================================
         BOOKING PAYLOAD
      ===================================================== */

      const bookingPayload = {
        class_id: currentClass.id,
        session_id: sessionId,
        trainer_id:
          currentClass.trainer_id ??
          currentClass.trainerId ??
          selectedTrainer?.id ??
          selectedTrainer?._id ??
          null,
        institute_id:
          currentClass.institute_id ??
          currentClass.instituteId ??
          null,
        booking_type: "CLASS",
        start_date: null,
        end_date: null,
        amount: Number(currentClass.price || 0),
      };

      console.log(
        "=========================================="
      );

      console.log(
        "WEBSITE BOOKING PAYLOAD:",
        bookingPayload
      );

      console.log(
        "SELECTED BATCH:",
        selectedBatch
      );

      console.log(
        "=========================================="
      );

      /* =====================================================
         CREATE BOOKING
      ===================================================== */

      const bookingResponse = await createBooking(
        bookingPayload,
        token
      );

      console.log(
        "WEBSITE BOOKING RESPONSE:",
        bookingResponse
      );

      const booking =
        bookingResponse?.data?.data ||
        bookingResponse?.data ||
        bookingResponse?.booking ||
        bookingResponse;

      if (!booking?.id) {
        throw new Error(
          bookingResponse?.message ||
            bookingResponse?.data?.message ||
            "Booking could not be created."
        );
      }

      /* =====================================================
         LOAD RAZORPAY
      ===================================================== */

      const loaded = await loadRazorpayScript();

      if (!loaded) {
        throw new Error(
          "Unable to load Razorpay."
        );
      }

      if (!window.Razorpay) {
        throw new Error(
          "Razorpay SDK is not available."
        );
      }

      /* =====================================================
         CREATE RAZORPAY ORDER
      ===================================================== */

      const amount = Number(
        currentClass.price || 0
      );

      const order = await createRazorpayOrder(
        amount,
        booking.id,
        currentClass.id,
        token
      );

      console.log(
        "WEBSITE RAZORPAY ORDER:",
        order
      );

      const razorpayKey =
        order?.key_id ||
        order?.key ||
        order?.data?.key_id;

      const razorpayOrderId =
        order?.order_id ||
        order?.id ||
        order?.data?.order_id;

      const razorpayAmount =
        order?.amount ||
        order?.data?.amount ||
        amount * 100;

      const razorpayCurrency =
        order?.currency ||
        order?.data?.currency ||
        "INR";

      if (!razorpayKey) {
        throw new Error(
          "Razorpay key is missing."
        );
      }

      if (!razorpayOrderId) {
        throw new Error(
          "Razorpay order ID is missing."
        );
      }

      /* =====================================================
         RAZORPAY OPTIONS
      ===================================================== */

      const options = {
        key: razorpayKey,

        amount: razorpayAmount,

        currency: razorpayCurrency,

        name: "FineArts",

        description:
          currentClass.title ||
          "FineArts Class Booking",

        order_id: razorpayOrderId,

        prefill: {
          name:
            currentUser.displayName || "",

          email:
            currentUser.email || "",

          contact:
            currentUser.phoneNumber || "",
        },

        theme: {
          color: primaryColor,
        },

        handler: async (response) => {
          try {
            console.log(
              "RAZORPAY PAYMENT RESPONSE:",
              response
            );

            await verifyRazorpayPayment(
              {
                razorpay_order_id:
                  response.razorpay_order_id,

                razorpay_payment_id:
                  response.razorpay_payment_id,

                razorpay_signature:
                  response.razorpay_signature,

                booking_id: booking.id,
              },
              token
            );

            console.log(
              "PAYMENT VERIFIED SUCCESSFULLY"
            );

            setBookingData(booking);

            setPaymentData({
              payment_id:
                response.razorpay_payment_id,
              order_id:
                response.razorpay_order_id,
            });

            setError("");
          } catch (err) {
            console.error(
              "PAYMENT VERIFICATION ERROR:",
              err
            );

            setError(
              err?.response?.data?.message ||
                err?.message ||
                "Payment verification failed."
            );
          } finally {
            setIsProcessing(false);
          }
        },

        modal: {
          ondismiss: () => {
            setIsProcessing(false);
          },
        },
      };

      /* =====================================================
         OPEN RAZORPAY
      ===================================================== */

      const razorpay = new window.Razorpay(
        options
      );

      razorpay.on(
        "payment.failed",
        (response) => {
          console.error(
            "RAZORPAY PAYMENT FAILED:",
            response
          );

          setError(
            response?.error?.description ||
              "Payment failed."
          );

          setIsProcessing(false);
        }
      );

      razorpay.open();
    } catch (err) {
      console.error(
        "WEBSITE BOOKING ERROR:",
        err
      );

      console.error(
        "BOOKING ERROR RESPONSE:",
        err?.response?.data
      );

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Booking failed."
      );

      setIsProcessing(false);
    }
  };

  /* =========================================================
     SUCCESS SCREEN
  ========================================================= */

  if (
    showBookingModal &&
    bookingData &&
    paymentData
  ) {
    return (
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            handleClose();
          }
        }}
      >
        <div className="w-full max-w-md overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
          {/* SUCCESS ICON */}

          <div className="flex justify-center pb-3 pt-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500 shadow-lg">
              <FaCheck
                size={28}
                className="text-white"
              />
            </div>
          </div>

          {/* TITLE */}

          <div className="px-6 pb-5 text-center">
            <h2 className="text-xl font-bold text-green-600">
              Booking Successful!
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Your class has been booked successfully.
            </p>
          </div>

          {/* DETAILS */}

          <div className="space-y-3 px-6 pb-6">
            <div className="space-y-2.5 rounded-xl border border-green-500/20 bg-green-50 p-4">
              <InfoRow
                label="Booking ID"
                value={bookingData.id}
              />

              <InfoRow
                label="Payment ID"
                value={
                  paymentData.payment_id
                }
              />

              <InfoRow
                label="Class"
                value={currentClass?.title}
              />

              <InfoRow
                label="Batch"
                value={
                  selectedBatch?.session_title ||
                  selectedBatch?.title ||
                  `Batch ${getBatchSessionId(
                    selectedBatch
                  )}`
                }
              />

              <InfoRow
                label="Time"
                value={`${selectedBatch?.local_start_time || selectedBatch?.start_time || "-"} - ${
                  selectedBatch?.local_end_time ||
                  selectedBatch?.end_time ||
                  "-"
                }`}
              />

              <InfoRow
                label="Schedule"
                value={
                  selectedBatch?.days_label ||
                  selectedBatch?.available_days?.join(
                    " • "
                  ) ||
                  "-"
                }
              />
            </div>

            {/* AMOUNT */}

            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  Amount Paid
                </span>

                <span
                  className="text-lg font-bold"
                  style={{
                    color: primaryColor,
                  }}
                >
                  {cur.formatINR(
                    currentClass?.price || 0
                  )}
                </span>
              </div>

              {showConvertedPrice && (
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-[11px] text-gray-400">
                    Converted
                  </span>

                  <span className="text-[11px] text-gray-400">
                    {cur.format(
                      currentClass?.price || 0
                    )}
                  </span>
                </div>
              )}
            </div>

            <div className="rounded-xl border border-blue-500/20 bg-blue-50 p-3">
              <p className="text-center text-[11px] text-blue-600">
                📅 This booking applies to all scheduled
                days. You can join the class on any of the
                scheduled days.
              </p>
            </div>
          </div>

          {/* BUTTON */}

          <div className="px-6 pb-6">
            <button
              type="button"
              className="w-full rounded-xl px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              style={{
                backgroundColor: primaryColor,
              }}
              onClick={() => {
                handleClose();
                navigate("/sessions");
              }}
            >
              Go to My Sessions
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================
     CLOSED
  ========================================================= */

  if (!showBookingModal) {
    return null;
  }

  /* =========================================================
     MAIN MODAL
  ========================================================= */

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
        {/* HEADER */}

        <div
          className="flex items-center justify-between px-5 py-4"
          style={{
            backgroundColor: secondaryColor,
          }}
        >
          <div>
            <h2 className="text-lg font-bold text-white">
              Book Class
            </h2>

            <p className="mt-0.5 text-[10px] text-white/60">
              Select your preferred batch
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <FaTimes />
          </button>
        </div>

        {/* BODY */}

        <div className="max-h-[75vh] space-y-5 overflow-y-auto px-5 py-4">
          {/* ERROR */}

          {error && (
            <div className="rounded-xl border border-red-500/30 bg-red-50 px-4 py-3 text-center">
              <p className="text-sm font-medium text-red-600">
                {error}
              </p>
            </div>
          )}

          {/* CLASS */}

          <div>
            <p
              className="mb-1.5 text-[10px] font-medium uppercase tracking-widest"
              style={{
                color: primaryColor,
              }}
            >
              Class
            </p>

            <h3 className="text-base font-semibold leading-tight text-gray-900">
              {currentClass?.title ||
                "No class selected"}
            </h3>
          </div>

          {/* PRICE */}

          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                Price
              </span>

              <span
                className="text-xl font-bold"
                style={{
                  color: primaryColor,
                }}
              >
                {cur.format(
                  currentClass?.price || 0
                )}
              </span>
            </div>

            {showConvertedPrice && (
              <div className="mt-2 flex items-center gap-2 border-t border-gray-200 pt-2">
                <FaGlobe
                  className="text-[10px]"
                  style={{
                    color: primaryColor,
                  }}
                />

                <span className="text-[11px] text-gray-500">
                  Charged as{" "}
                  <span
                    className="font-semibold"
                    style={{
                      color: primaryColor,
                    }}
                  >
                    {cur.formatINR(
                      currentClass?.price || 0
                    )}
                  </span>
                </span>
              </div>
            )}
          </div>

          {/* SELECT BATCH */}

          <div>
            <p
              className="mb-2.5 text-[10px] font-medium uppercase tracking-widest"
              style={{
                color: primaryColor,
              }}
            >
              Select Batch
            </p>

            {/* LOADING */}

            {loadingBatches && (
              <div className="py-10 text-center">
                <div
                  className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-4"
                  style={{
                    borderColor: `${primaryColor}55`,
                    borderTopColor:
                      "transparent",
                  }}
                />

                <p className="text-xs text-gray-500">
                  Loading batches...
                </p>
              </div>
            )}

            {/* NO BATCHES */}

            {!loadingBatches &&
              batches.length === 0 && (
                <div className="rounded-xl border border-red-500/30 bg-red-50 p-6 text-center">
                  <FaCalendarAlt
                    className="mx-auto mb-3 text-red-400"
                    size={22}
                  />

                  <p className="text-sm font-medium text-red-600">
                    No batches available for
                    booking.
                  </p>
                </div>
              )}

            {/* BATCH LIST */}

            {!loadingBatches &&
              batches.length > 0 && (
                <div className="max-h-64 space-y-2 overflow-y-auto pr-1">
                  {batches.map((batch) => {
                    const sessionId =
                      getBatchSessionId(
                        batch
                      );

                    const isSelected =
                      selectedBatch &&
                      getBatchSessionId(
                        selectedBatch
                      ) === sessionId;

                    return (
                      <button
                        key={sessionId}
                        type="button"
                        onClick={() =>
                          handleSelectBatch(
                            batch
                          )
                        }
                        className="relative w-full rounded-xl border px-4 py-3.5 text-left transition-all"
                        style={{
                          borderColor:
                            isSelected
                              ? primaryColor
                              : "#E5E7EB",

                          backgroundColor:
                            isSelected
                              ? `${primaryColor}0D`
                              : "#FFFFFF",

                          boxShadow:
                            isSelected
                              ? `0 0 0 1px ${primaryColor}`
                              : "none",
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                            style={{
                              backgroundColor:
                                isSelected
                                  ? `${primaryColor}18`
                                  : "#F3F4F6",
                            }}
                          >
                            <FaClock
                              className="text-sm"
                              style={{
                                color:
                                  isSelected
                                    ? primaryColor
                                    : "#9CA3AF",
                              }}
                            />
                          </div>

                          <span className="text-sm font-semibold text-gray-900">
                            {batch.local_start_time ||
                              batch.start_time ||
                              "-"}{" "}
                            -{" "}
                            {batch.local_end_time ||
                              batch.end_time ||
                              "-"}
                          </span>
                        </div>

                        {(
                          batch.days_label ||
                          batch.available_days
                        ) && (
                          <div className="ml-12 mt-2 flex items-center gap-2">
                            <FaCalendarAlt className="text-[10px] text-gray-400" />

                            <span className="text-[12px] text-gray-500">
                              {batch.days_label ||
                                (Array.isArray(
                                  batch.available_days
                                )
                                  ? batch.available_days.join(
                                      " • "
                                    )
                                  : "-")}
                            </span>
                          </div>
                        )}

                        <div
                          className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full"
                          style={{
                            backgroundColor:
                              isSelected
                                ? primaryColor
                                : "transparent",

                            border:
                              isSelected
                                ? "none"
                                : "2px solid #E5E7EB",
                          }}
                        >
                          {isSelected && (
                            <FaCheck
                              size={8}
                              className="text-white"
                            />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
          </div>

          {/* SECURE */}

          <div className="flex items-center gap-2 px-1">
            <FaLock
              className="text-[10px]"
              style={{
                color: primaryColor,
              }}
            />

            <p className="text-[11px] text-gray-500">
              Secure payment via Razorpay
            </p>
          </div>
        </div>

        {/* FOOTER */}

        <div className="border-t border-gray-200 px-5 py-4">
          <button
            type="button"
            onClick={handleBooking}
            disabled={
              loadingBatches ||
              batches.length === 0 ||
              !selectedBatch ||
              isProcessing
            }
            className="flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-50"
            style={{
              backgroundColor: primaryColor,
            }}
          >
            <FaLock className="text-xs" />

            {isProcessing
              ? "Processing..."
              : selectedBatch
                ? `Pay ${cur.format(
                    currentClass?.price || 0
                  )}`
                : "Select a Batch"}
          </button>
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   INFO ROW
========================================================= */

const InfoRow = ({
  label,
  value,
}) => {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="shrink-0 pt-0.5 text-[10px] uppercase tracking-wider text-gray-500">
        {label}
      </span>

      <span className="text-right text-sm font-medium text-gray-900">
        {value || "-"}
      </span>
    </div>
  );
};

export default WebsiteBooking;