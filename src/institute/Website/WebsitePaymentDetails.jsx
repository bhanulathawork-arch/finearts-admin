import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  HiOutlineBell,
  HiOutlineBookOpen,
  HiOutlineCalendar,
  HiOutlineVideoCamera,
  HiOutlinePlay,
  HiOutlineUser,
  HiOutlineDocumentText,
  HiOutlineCreditCard,
  HiOutlineSearch,
  HiOutlineMenu,
  HiOutlineX,
  HiOutlineHome,
  HiOutlineDownload,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineExclamationCircle,
  HiOutlineChevronRight,
  HiOutlineFilter,
  HiOutlineRefresh,
} from "react-icons/hi";

import {
  FaRupeeSign,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import API from "../../services/api";

/* =========================================================
   BRANDING
========================================================= */

const DEFAULT_BRANDING = {
  pageBackgroundColor: "#020914",
  navbarColor: "#020B18",
  cardBackgroundColor: "#031120",
  headingColor: "#FFFFFF",
  textColor: "#FFFFFF",
  iconColor: "#1687FF",
  buttonColor: "#087CFF",
  buttonTextColor: "#FFFFFF",
  fontHeading: "Inter",
  fontBody: "Inter",
};

const getBrandingValue = (
  branding,
  camel,
  snake,
  fallback
) => {
  const value =
    branding?.[camel] ??
    branding?.[snake];

  return value !== undefined &&
    value !== null &&
    value !== ""
    ? value
    : fallback;
};

const normalizeBranding = (
  branding = {}
) => ({
  pageBackgroundColor:
    getBrandingValue(
      branding,
      "pageBackgroundColor",
      "page_background_color",
      DEFAULT_BRANDING.pageBackgroundColor
    ),

  navbarColor:
    getBrandingValue(
      branding,
      "navbarColor",
      "navbar_color",
      DEFAULT_BRANDING.navbarColor
    ),

  cardBackgroundColor:
    getBrandingValue(
      branding,
      "cardBackgroundColor",
      "card_background_color",
      DEFAULT_BRANDING.cardBackgroundColor
    ),

  headingColor:
    getBrandingValue(
      branding,
      "headingColor",
      "heading_color",
      DEFAULT_BRANDING.headingColor
    ),

  textColor:
    getBrandingValue(
      branding,
      "textColor",
      "text_color",
      DEFAULT_BRANDING.textColor
    ),

  iconColor:
    getBrandingValue(
      branding,
      "iconColor",
      "icon_color",
      DEFAULT_BRANDING.iconColor
    ),

  buttonColor:
    getBrandingValue(
      branding,
      "buttonColor",
      "button_color",
      DEFAULT_BRANDING.buttonColor
    ),

  buttonTextColor:
    getBrandingValue(
      branding,
      "buttonTextColor",
      "button_text_color",
      DEFAULT_BRANDING.buttonTextColor
    ),

  fontHeading:
    getBrandingValue(
      branding,
      "fontHeading",
      "font_heading",
      DEFAULT_BRANDING.fontHeading
    ),

  fontBody:
    getBrandingValue(
      branding,
      "fontBody",
      "font_body",
      DEFAULT_BRANDING.fontBody
    ),
});

/* =========================================================
   HELPERS
========================================================= */

const pick = (...values) => {
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

const getPaymentStatus = (
  payment
) => {
  return String(
    pick(
      payment?.status,
      payment?.payment_status,
      payment?.status_name,
      "PENDING"
    )
  ).toUpperCase();
};

const getPaymentAmount = (
  payment
) => {
  return Number(
    pick(
      payment?.amount,
      payment?.paid_amount,
      payment?.total_amount,
      0
    )
  );
};

const getTransactionId = (
  payment
) => {
  return pick(
    payment?.transaction_id,
    payment?.transactionId,
    payment?.payment_id,
    payment?.paymentId,
    payment?.razorpay_payment_id,
    payment?.reference_number,
    payment?.reference,
    null
  );
};

const getPaymentDate = (
  payment
) => {
  return pick(
    payment?.payment_date,
    payment?.paid_at,
    payment?.created_at,
    payment?.createdAt,
    null
  );
};

const getClassName = (
  booking
) => {
  return pick(
    booking?.class?.title,
    booking?.class_title,
    booking?.class_name,
    booking?.course_name,
    "Class"
  );
};

const getTrainerName = (
  booking
) => {
  return pick(
    booking?.trainer?.name,
    booking?.trainer_name,
    booking?.trainerName,
    "Trainer"
  );
};

const getBookingId = (
  booking
) => {
  return pick(
    booking?.id,
    booking?.booking_id,
    booking?.bookingId,
    null
  );
};

const getPaymentObject = (
  booking
) => {
  return (
    booking?.payment ||
    booking
  );
};

const formatCurrency = (
  amount
) => {
  return `₹${Number(
    amount || 0
  ).toLocaleString(
    "en-IN",
    {
      maximumFractionDigits: 2,
    }
  )}`;
};

const formatDate = (
  value
) => {
  if (!value) {
    return "--";
  }

  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
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

const formatDateTime = (
  value
) => {
  if (!value) {
    return "--";
  }

  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
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
   SIDEBAR
========================================================= */

function Sidebar({
  navigate,
  mobileOpen,
  setMobileOpen,
}) {
  const menu = [
    {
      label: "Dashboard",
      icon: <HiOutlineHome />,
      path:
        "/institute/website/preview",
    },

    {
      label: "My Learning",
      icon:
        <HiOutlineBookOpen />,
      path:
        "/institute/website/preview/lms/my-learning",
    },

    {
      label: "Live Sessions",
      icon:
        <HiOutlineVideoCamera />,
      path:
        "/institute/website/preview/lms/live-sessions",
    },

    {
      label: "Recordings",
      icon:
        <HiOutlinePlay />,
      path:
        "/institute/website/preview/lms/recordings",
    },

    {
      label: "My Bookings",
      icon:
        <HiOutlineCalendar />,
      path:
        "/institute/website/preview/lms/my-bookings",
    },

    {
      label: "Assignments",
      icon:
        <HiOutlineDocumentText />,
      path:
        "/institute/website/preview/lms/assignments",
    },

    {
      label: "Attendance",
      icon:
        <HiOutlineCalendar />,
      path:
        "/institute/website/preview/lms/attendance",
    },

    {
      label: "Payment Details",
      icon:
        <HiOutlineCreditCard />,
      path:
        "/institute/website/preview/lms/payment-details",
    },

    {
      label: "Profile",
      icon:
        <HiOutlineUser />,
      path:
        "/institute/website/preview/lms/profile",
    },
  ];

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 lg:hidden"
          onClick={() =>
            setMobileOpen(false)
          }
        />
      )}

      <aside
        className={`
          fixed left-0 top-0 z-50
          flex h-screen w-[270px]
          flex-col
          border-r border-white/[0.07]
          bg-[#020B18]
          transition-transform
          duration-300
          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >

        {/* LOGO */}

        <div className="flex h-[90px] items-center border-b border-white/[0.06] px-6">

          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center text-4xl text-blue-400">
              ♫
            </div>

            <div>

              <h1 className="text-[25px] font-bold leading-none">
                Fine
                <span className="text-blue-400">
                  Arts
                </span>
              </h1>

              <p className="mt-1 text-xs text-white/50">
                Student LMS
              </p>

            </div>

          </div>

          <button
            onClick={() =>
              setMobileOpen(
                false
              )
            }
            className="ml-auto text-white/60 lg:hidden"
          >
            <HiOutlineX
              size={22}
            />
          </button>

        </div>

        {/* MENU */}

        <nav className="flex-1 overflow-y-auto px-4 py-6">

          <div className="space-y-2">

            {menu.map(
              item => {

                const active =
                  item.label ===
                  "Payment Details";

                return (
                  <button
                    key={
                      item.label
                    }
                    onClick={() => {

                      setMobileOpen(
                        false
                      );

                      navigate(
                        item.path
                      );
                    }}
                    className={`
                      flex w-full
                      items-center gap-4
                      rounded-xl
                      px-4 py-3.5
                      text-left
                      transition-all
                      ${
                        active
                          ? "bg-gradient-to-r from-[#3825FF] via-[#155CFF] to-[#008CFF] text-white shadow-[0_0_28px_rgba(0,100,255,.45)]"
                          : "text-white/75 hover:bg-white/[0.04] hover:text-white"
                      }
                    `}
                  >

                    <span className="flex w-6 justify-center text-[22px]">
                      {
                        item.icon
                      }
                    </span>

                    <span className="text-[15px] font-medium">
                      {
                        item.label
                      }
                    </span>

                  </button>
                );
              }
            )}

          </div>

        </nav>

        {/* QUOTE */}

        <div className="relative overflow-hidden border-t border-white/[0.05] px-8 py-7">

          <div className="pointer-events-none absolute -bottom-10 right-[-35px] text-[130px] text-blue-600/10">
            ₹
          </div>

          <div className="relative font-serif text-xl italic leading-8 text-blue-300">
            <div>
              Invest
            </div>
            <div>
              In Your
            </div>
            <div>
              Learning
            </div>
          </div>

          <div className="relative mt-4 h-1 w-9 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />

        </div>

      </aside>
    </>
  );
}

/* =========================================================
   TOP HEADER
========================================================= */

function TopHeader({
  navigate,
  student,
  setMobileOpen,
}) {
  const name =
    pick(
      student?.name,
      student?.full_name,
      student?.username,
      student?.displayName,
      "Priya Sharma"
    );

  const image =
    pick(
      student?.profile_image,
      student?.profileImage,
      student?.photoURL,
      student?.avatar,
      ""
    );

  return (
    <header className="sticky top-0 z-30 h-[84px] border-b border-white/[0.07] bg-[#020914]/90 backdrop-blur-xl">

      <div className="flex h-full items-center gap-4 px-4 sm:px-6 lg:px-7">

        <button
          onClick={() =>
            setMobileOpen(
              true
            )
          }
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] lg:hidden"
        >
          <HiOutlineMenu
            size={22}
          />
        </button>

        {/* SEARCH */}

        <div className="relative w-full max-w-[515px]">

          <HiOutlineSearch
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70"
            size={23}
          />

          <input
            placeholder="Search classes, trainers or topics..."
            className="h-12 w-full rounded-xl border border-blue-500/20 bg-[#061426] pl-12 pr-4 text-sm text-white outline-none placeholder:text-white/50 focus:border-blue-500/50"
          />

        </div>

        <div className="ml-auto flex h-full items-center">

          {/* NOTIFICATIONS */}

          <button className="relative flex h-full w-[70px] items-center justify-center border-l border-white/[0.07]">

            <HiOutlineBell
              size={27}
            />

            <span className="absolute right-[15px] top-[15px] flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold">
              3
            </span>

          </button>

          {/* PROFILE */}

          <button
            onClick={() =>
              navigate(
                "/institute/website/preview/lms/profile"
              )
            }
            className="flex h-full items-center gap-3 border-l border-white/[0.07] px-5"
          >

            <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-white/10 bg-blue-500/10">

              {image ? (
                <img
                  src={
                    image
                  }
                  alt={
                    name
                  }
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <HiOutlineUser
                    size={23}
                    className="text-blue-400"
                  />
                </div>
              )}

            </div>

            <div className="hidden text-left md:block">

              <p className="text-[15px] font-semibold">
                {
                  name
                }
              </p>

              <p className="mt-1 text-xs text-white/55">
                Student
              </p>

            </div>

            <span className="ml-3 hidden text-xl text-white/80 md:block">
              ⌄
            </span>

          </button>

        </div>

      </div>
    </header>
  );
}

/* =========================================================
   PAYMENT STATUS
========================================================= */

function PaymentStatus({
  status,
}) {
  const normalized =
    String(
      status || ""
    ).toUpperCase();

  if (
    normalized ===
      "PAID" ||
    normalized ===
      "SUCCESS" ||
    normalized ===
      "COMPLETED"
  ) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-4 py-2 text-xs font-bold text-emerald-400">

        <HiOutlineCheckCircle
          size={15}
        />

        Paid

      </span>
    );
  }

  if (
    normalized ===
      "PENDING" ||
    normalized ===
      "PROCESSING"
  ) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 px-4 py-2 text-xs font-bold text-amber-400">

        <HiOutlineClock
          size={15}
        />

        Pending

      </span>
    );
  }

  if (
    normalized ===
      "FAILED" ||
    normalized ===
      "CANCELLED"
  ) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/15 px-4 py-2 text-xs font-bold text-rose-400">

        <HiOutlineExclamationCircle
          size={15}
        />

        {normalized ===
        "CANCELLED"
          ? "Cancelled"
          : "Failed"}

      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-white/70">
      {status ||
        "Unknown"}
    </span>
  );
}

/* =========================================================
   SUMMARY CARD
========================================================= */

function SummaryCard({
  icon,
  value,
  label,
  subtitle,
  type,
}) {
  const iconStyle = {
    paid:
      "bg-emerald-500 text-white",
    pending:
      "bg-amber-500 text-white",
    transactions:
      "bg-blue-500 text-white",
    total:
      "bg-purple-500 text-white",
  };

  return (
    <div className="flex min-h-[105px] items-center gap-4 rounded-xl border border-blue-500/15 bg-[#031120] px-5 py-4">

      <div
        className={`
          flex h-[58px]
          w-[58px]
          shrink-0
          items-center
          justify-center
          rounded-full
          ${
            iconStyle[
              type
            ] ||
            iconStyle.total
          }
        `}
      >
        {
          icon
        }
      </div>

      <div className="min-w-0">

        <p className="truncate text-2xl font-bold">
          {
            value
          }
        </p>

        <p className="text-sm font-medium text-white/90">
          {
            label
          }
        </p>

        {subtitle && (
          <p className="mt-0.5 text-xs text-white/50">
            {
              subtitle
            }
          </p>
        )}

      </div>

    </div>
  );
}

/* =========================================================
   PAYMENT ROW
========================================================= */

function PaymentRow({
  booking,
  onDownload,
}) {
  const payment =
    getPaymentObject(
      booking
    );

  const status =
    getPaymentStatus(
      payment
    );

  const amount =
    getPaymentAmount(
      payment
    );

  const transactionId =
    getTransactionId(
      payment
    );

  const date =
    getPaymentDate(
      payment
    );

  return (
    <div className="group grid grid-cols-1 gap-4 border-b border-white/[0.06] px-5 py-4 transition hover:bg-white/[0.025] md:grid-cols-[1.2fr_1fr_1fr_1fr_130px] md:items-center">

      {/* COURSE */}

      <div className="min-w-0">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600/30 to-purple-600/30 text-blue-400">

            <HiOutlineBookOpen
              size={22}
            />

          </div>

          <div className="min-w-0">

            <p className="truncate text-sm font-bold">
              {
                getClassName(
                  booking
                )
              }
            </p>

            <p className="mt-1 text-xs text-white/45">
              Booking #
              {
                getBookingId(
                  booking
                ) ||
                "--"
              }
            </p>

          </div>

        </div>

      </div>

      {/* TRANSACTION */}

      <div>

        <p className="text-[11px] uppercase tracking-wide text-white/40">
          Transaction ID
        </p>

        <p className="mt-1 truncate text-sm font-medium text-white/85">
          {
            transactionId ||
            "Not available"
          }
        </p>

      </div>

      {/* DATE */}

      <div>

        <p className="text-[11px] uppercase tracking-wide text-white/40">
          Payment Date
        </p>

        <p className="mt-1 text-sm font-medium text-white/85">
          {
            formatDate(
              date
            )
          }
        </p>

      </div>

      {/* AMOUNT */}

      <div>

        <p className="text-[11px] uppercase tracking-wide text-white/40">
          Amount
        </p>

        <p className="mt-1 text-base font-bold text-white">
          {
            formatCurrency(
              amount
            )
          }
        </p>

      </div>

      {/* STATUS */}

      <div className="flex items-center justify-between gap-3 md:justify-end">

        <PaymentStatus
          status={
            status
          }
        />

        {status ===
          "PAID" && (
          <button
            onClick={() =>
              onDownload(
                booking
              )
            }
            title="Download receipt"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-white/50 transition hover:bg-blue-500/10 hover:text-blue-400"
          >
            <HiOutlineDownload
              size={18}
            />
          </button>
        )}

      </div>

    </div>
  );
}

/* =========================================================
   MAIN
========================================================= */

export default function WebsitePaymentDetails() {

  const navigate =
    useNavigate();

  const [
    branding,
    setBranding,
  ] = useState(
    DEFAULT_BRANDING
  );

  const [
    student,
    setStudent,
  ] = useState(null);

  const [
    payments,
    setPayments,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  const [
    mobileOpen,
    setMobileOpen,
  ] = useState(false);

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    statusFilter,
    setStatusFilter,
  ] = useState("ALL");

  /* =======================================================
     STUDENT
  ======================================================= */

  useEffect(() => {

    try {

      const stored =
        localStorage.getItem(
          "studentUser"
        );

      if (stored) {
        setStudent(
          JSON.parse(
            stored
          )
        );
      }

    } catch {
      setStudent(null);
    }

  }, []);

  /* =======================================================
     BRANDING
  ======================================================= */

  useEffect(() => {

    try {

      const stored =
        localStorage.getItem(
          "websiteBranding"
        );

      if (stored) {

        setBranding(
          normalizeBranding(
            JSON.parse(
              stored
            )
          )
        );

      }

    } catch {
      setBranding(
        DEFAULT_BRANDING
      );
    }

  }, []);

  /* =======================================================
     FETCH PAYMENT DATA
  ======================================================= */

  const fetchPayments =
    async () => {

      try {

        setLoading(
          true
        );

        setError("");

        /*
         * IMPORTANT:
         *
         * Existing project has:
         *
         * GET /payments/student/:id
         *
         * from paymentService.js.
         *
         * We use the logged-in student's
         * account/student ID here.
         */

        const studentId =
          pick(
            student?.id,
            student?.account_id,
            student?.accountId,
            student?.user_id,
            student?.userId
          );

        let response;

        if (
          studentId
        ) {

          response =
            await API.get(
              `/payments/student/${studentId}`
            );

        } else {

          /*
           * Fallback for projects where
           * authentication middleware resolves
           * the logged-in student automatically.
           */

          response =
            await API.get(
              "/payments/student"
            );
        }

        const payload =
          response?.data;

        let data =
          null;

        if (
          Array.isArray(
            payload
          )
        ) {
          data =
            payload;
        } else if (
          Array.isArray(
            payload?.data
          )
        ) {
          data =
            payload.data;
        } else if (
          Array.isArray(
            payload?.data?.payments
          )
        ) {
          data =
            payload.data
              .payments;
        } else if (
          Array.isArray(
            payload?.payments
          )
        ) {
          data =
            payload.payments;
        } else if (
          Array.isArray(
            payload?.data?.records
          )
        ) {
          data =
            payload.data.records;
        } else if (
          Array.isArray(
            payload?.records
          )
        ) {
          data =
            payload.records;
        }

        /*
         * Normalize possible payment
         * response formats.
         */

        const normalized =
          (data || []).map(
            item => {

              /*
               * Some APIs return:
               *
               * {
               *   booking: {...},
               *   payment: {...}
               * }
               *
               * Others directly return
               * booking/payment fields.
               */

              if (
                item?.booking
              ) {

                return {
                  ...item.booking,

                  payment:
                    item.payment ||
                    item.booking.payment ||
                    {},
                };

              }

              return item;
            }
          );

        setPayments(
          normalized
        );

      } catch (err) {

        console.error(
          "WEBSITE PAYMENT DETAILS ERROR:",
          err
        );

        setError(
          err?.response
            ?.data?.message ||
          err?.response
            ?.data?.error ||
          "Unable to load payment details."
        );

        setPayments([]);

      } finally {

        setLoading(
          false
        );

      }
    };

  useEffect(() => {

    if (
      student !== null
    ) {
      fetchPayments();
    }

  }, [
    student,
  ]);

  /* =======================================================
     FILTER
  ======================================================= */

  const filteredPayments =
    useMemo(() => {

      const searchValue =
        search
          .trim()
          .toLowerCase();

      return payments.filter(
        booking => {

          const payment =
            getPaymentObject(
              booking
            );

          const status =
            getPaymentStatus(
              payment
            );

          if (
            statusFilter !==
              "ALL" &&
            status !==
              statusFilter
          ) {
            return false;
          }

          if (
            !searchValue
          ) {
            return true;
          }

          const searchable = [
            getClassName(
              booking
            ),
            getTrainerName(
              booking
            ),
            getTransactionId(
              payment
            ),
            getBookingId(
              booking
            ),
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();

          return searchable.includes(
            searchValue
          );
        }
      );

    }, [
      payments,
      search,
      statusFilter,
    ]);

  /* =======================================================
     SUMMARY
  ======================================================= */

  const summary =
    useMemo(() => {

      let paidAmount = 0;
      let pendingAmount = 0;

      let paidCount = 0;
      let pendingCount = 0;

      payments.forEach(
        booking => {

          const payment =
            getPaymentObject(
              booking
            );

          const status =
            getPaymentStatus(
              payment
            );

          const amount =
            getPaymentAmount(
              payment
            );

          if (
            status ===
              "PAID" ||
            status ===
              "SUCCESS" ||
            status ===
              "COMPLETED"
          ) {

            paidAmount +=
              amount;

            paidCount +=
              1;

          } else if (
            status ===
              "PENDING"
          ) {

            pendingAmount +=
              amount;

            pendingCount +=
              1;
          }

        }
      );

      return {
        paidAmount,
        pendingAmount,
        paidCount,
        pendingCount,
        transactions:
          payments.length,
      };

    }, [
      payments,
    ]);

  /* =======================================================
     DOWNLOAD RECEIPT
  ======================================================= */

  const handleDownload =
    booking => {

      const payment =
        getPaymentObject(
          booking
        );

      const receiptWindow =
        window.open(
          "",
          "_blank"
        );

      if (
        !receiptWindow
      ) {
        return;
      }

      const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>FineArts Payment Receipt</title>

            <style>

              body {
                font-family: Arial, sans-serif;
                padding: 40px;
                color: #111827;
              }

              .receipt {
                max-width: 700px;
                margin: auto;
                border: 1px solid #ddd;
                padding: 35px;
                border-radius: 12px;
              }

              .header {
                display: flex;
                justify-content: space-between;
                margin-bottom: 35px;
              }

              .logo {
                font-size: 26px;
                font-weight: 700;
              }

              .blue {
                color: #1687ff;
              }

              .title {
                font-size: 24px;
                font-weight: 700;
                margin-bottom: 25px;
              }

              .row {
                display: flex;
                justify-content: space-between;
                border-bottom: 1px solid #eee;
                padding: 13px 0;
              }

              .amount {
                font-size: 22px;
                font-weight: 700;
              }

              .paid {
                color: #059669;
                font-weight: 700;
              }

              .footer {
                margin-top: 30px;
                color: #6b7280;
                font-size: 12px;
              }

            </style>
          </head>

          <body>

            <div class="receipt">

              <div class="header">

                <div class="logo">
                  Fine<span class="blue">Arts</span>
                </div>

                <div>
                  Payment Receipt
                </div>

              </div>

              <div class="title">
                Payment Details
              </div>

              <div class="row">
                <span>Student</span>
                <strong>
                  ${student?.name || "Student"}
                </strong>
              </div>

              <div class="row">
                <span>Class</span>
                <strong>
                  ${getClassName(booking)}
                </strong>
              </div>

              <div class="row">
                <span>Booking ID</span>
                <strong>
                  ${getBookingId(booking) || "--"}
                </strong>
              </div>

              <div class="row">
                <span>Transaction ID</span>
                <strong>
                  ${getTransactionId(payment) || "--"}
                </strong>
              </div>

              <div class="row">
                <span>Payment Date</span>
                <strong>
                  ${formatDate(
                    getPaymentDate(payment)
                  )}
                </strong>
              </div>

              <div class="row">
                <span>Status</span>
                <strong class="paid">
                  ${getPaymentStatus(payment)}
                </strong>
              </div>

              <div class="row">
                <span>Amount Paid</span>
                <strong class="amount">
                  ${formatCurrency(
                    getPaymentAmount(payment)
                  )}
                </strong>
              </div>

              <div class="footer">
                This is a system-generated payment receipt.
              </div>

            </div>

            <script>
              window.onload = function() {
                window.print();
              };
            </script>

          </body>
        </html>
      `;

      receiptWindow.document.write(
        html
      );

      receiptWindow.document.close();
    };

  /* =======================================================
     DISPLAY NAME
  ======================================================= */

  const displayName =
    pick(
      student?.name,
      student?.full_name,
      student?.displayName,
      "Student"
    );

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div
      className="min-h-screen text-white"
      style={{
        backgroundColor:
          branding.pageBackgroundColor,

        fontFamily:
          `'${branding.fontBody}', sans-serif`,
      }}
    >

      {/* SIDEBAR */}

      <Sidebar
        navigate={
          navigate
        }
        mobileOpen={
          mobileOpen
        }
        setMobileOpen={
          setMobileOpen
        }
      />

      {/* MAIN */}

      <div className="lg:pl-[270px]">

        {/* HEADER */}

        <TopHeader
          navigate={
            navigate
          }
          student={
            student
          }
          setMobileOpen={
            setMobileOpen
          }
        />

        <main className="px-4 py-5 sm:px-6 lg:px-7">

          {/* =================================================
              PAGE HEADER
          ================================================= */}

          <section className="border-b border-white/[0.06] pb-5">

            <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">

              <div>

                <h1
                  className="text-4xl font-bold tracking-tight sm:text-[42px]"
                  style={{
                    fontFamily:
                      `'${branding.fontHeading}', sans-serif`,
                  }}
                >
                  Payment
                  <span className="text-blue-500">
                    Details
                  </span>
                </h1>

                <p className="mt-1 text-base text-white/90">
                  View your payments, transaction history
                  and course fee details.
                </p>

              </div>

              {/* PAYMENT BANNER */}

              <div className="relative flex min-h-[100px] w-full max-w-[465px] items-center overflow-hidden rounded-xl bg-gradient-to-r from-[#3825FF] via-[#2616F3] to-[#6D00F5] px-6">

                <div className="mr-5 flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white/10">

                  <HiOutlineCreditCard
                    size={45}
                    className="text-white"
                  />

                </div>

                <div className="relative z-10">

                  <h2 className="text-lg font-bold">
                    Payments Made Simple
                  </h2>

                  <p className="mt-1 max-w-[280px] text-xs leading-4 text-white/85">
                    Keep track of your course fees and
                    payment transactions.
                  </p>

                </div>

                <div className="absolute -bottom-8 -right-3 text-[120px] leading-none text-white/10">
                  ₹
                </div>

              </div>

            </div>

          </section>

          {/* =================================================
              SUMMARY
          ================================================= */}

          <section className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">

            <SummaryCard
              type="paid"
              value={formatCurrency(
                summary.paidAmount
              )}
              label="Total Paid"
              subtitle={`${summary.paidCount} successful payment(s)`}
              icon={
                <FaRupeeSign
                  size={25}
                />
              }
            />

            <SummaryCard
              type="pending"
              value={formatCurrency(
                summary.pendingAmount
              )}
              label="Pending Amount"
              subtitle={`${summary.pendingCount} pending payment(s)`}
              icon={
                <HiOutlineClock
                  size={28}
                />
              }
            />

            <SummaryCard
              type="transactions"
              value={
                summary.transactions
              }
              label="Transactions"
              subtitle="All payment records"
              icon={
                <HiOutlineCreditCard
                  size={28}
                />
              }
            />

            <SummaryCard
              type="total"
              value={
                summary.paidCount
              }
              label="Successful Payments"
              subtitle="Completed transactions"
              icon={
                <HiOutlineCheckCircle
                  size={28}
                />
              }
            />

          </section>

          {/* =================================================
              FILTERS
          ================================================= */}

          <section className="mt-4 rounded-xl border border-blue-500/15 bg-[#031120] p-4">

            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">

              {/* SEARCH */}

              <div className="relative flex-1">

                <HiOutlineSearch
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/55"
                  size={21}
                />

                <input
                  value={
                    search
                  }
                  onChange={event =>
                    setSearch(
                      event.target
                        .value
                    )
                  }
                  placeholder="Search class, booking or transaction ID..."
                  className="h-11 w-full rounded-lg border border-blue-500/20 bg-[#061426] pl-11 pr-4 text-sm text-white outline-none placeholder:text-white/40 focus:border-blue-500/50"
                />

              </div>

              {/* STATUS */}

              <div className="relative w-full lg:w-[220px]">

                <HiOutlineFilter
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/60"
                  size={18}
                />

                <select
                  value={
                    statusFilter
                  }
                  onChange={event =>
                    setStatusFilter(
                      event.target
                        .value
                    )
                  }
                  className="h-11 w-full appearance-none rounded-lg border border-blue-500/20 bg-[#061426] pl-10 pr-8 text-sm text-white outline-none"
                >

                  <option
                    value="ALL"
                    className="bg-[#061426]"
                  >
                    All Payments
                  </option>

                  <option
                    value="PAID"
                    className="bg-[#061426]"
                  >
                    Paid
                  </option>

                  <option
                    value="PENDING"
                    className="bg-[#061426]"
                  >
                    Pending
                  </option>

                  <option
                    value="FAILED"
                    className="bg-[#061426]"
                  >
                    Failed
                  </option>

                  <option
                    value="CANCELLED"
                    className="bg-[#061426]"
                  >
                    Cancelled
                  </option>

                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                  ⌄
                </span>

              </div>

              {/* REFRESH */}

              <button
                onClick={
                  fetchPayments
                }
                className="flex h-11 items-center justify-center gap-2 rounded-lg border border-blue-500/20 bg-[#061426] px-5 text-sm font-medium text-white/85 transition hover:border-blue-500/50 hover:text-white"
              >

                <HiOutlineRefresh
                  size={18}
                />

                Refresh

              </button>

            </div>

          </section>

          {/* =================================================
              PAYMENT HISTORY
          ================================================= */}

          <section className="mt-4 overflow-hidden rounded-xl border border-blue-500/20 bg-[#020D1A]">

            {/* HEADER */}

            <div className="flex flex-col gap-2 border-b border-white/[0.06] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <h2 className="text-lg font-bold">
                  Payment History
                </h2>

                <p className="mt-1 text-xs text-white/45">
                  {
                    filteredPayments.length
                  } payment record(s)
                </p>

              </div>

              <div className="text-sm text-white/60">

                Total Paid:
                <span className="ml-2 font-bold text-emerald-400">
                  {
                    formatCurrency(
                      summary.paidAmount
                    )
                  }
                </span>

              </div>

            </div>

            {/* TABLE HEADER */}

            <div className="hidden grid-cols-[1.2fr_1fr_1fr_1fr_130px] gap-4 border-b border-white/[0.06] bg-white/[0.015] px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-white/40 md:grid">

              <span>
                Course / Class
              </span>

              <span>
                Transaction
              </span>

              <span>
                Date
              </span>

              <span>
                Amount
              </span>

              <span>
                Status
              </span>

            </div>

            {/* ROWS */}

            {filteredPayments.length >
            0 ? (
              filteredPayments.map(
                (
                  booking,
                  index
                ) => (
                  <PaymentRow
                    key={
                      getBookingId(
                        booking
                      ) ||
                      index
                    }
                    booking={
                      booking
                    }
                    onDownload={
                      handleDownload
                    }
                  />
                )
              )
            ) : (
              <div className="px-6 py-16 text-center">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/10 text-blue-400">

                  <HiOutlineCreditCard
                    size={32}
                  />

                </div>

                <h3 className="mt-4 text-base font-semibold">
                  No payment records found
                </h3>

                <p className="mt-1 text-sm text-white/45">
                  Your payment transactions will appear here.
                </p>

              </div>
            )}

          </section>

          {/* =================================================
              PAYMENT INFORMATION
          ================================================= */}

          <section className="mt-4 grid gap-4 lg:grid-cols-2">

            {/* SECURITY */}

            <div className="rounded-xl border border-blue-500/20 bg-[#020D1A] p-5">

              <div className="flex gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">

                  <HiOutlineCheckCircle
                    size={28}
                  />

                </div>

                <div>

                  <h3 className="font-bold">
                    Payment Information
                  </h3>

                  <div className="mt-2 space-y-2 text-xs text-white/65">

                    <p>
                      All successful payments are recorded
                      against your enrolled class.
                    </p>

                    <p>
                      Keep your transaction ID for future
                      payment-related queries.
                    </p>

                    <p>
                      Contact your institute if a payment
                      status does not update.
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* SUPPORT */}

            <div className="rounded-xl border border-blue-500/20 bg-[#020D1A] p-5">

              <div className="flex gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">

                  <HiOutlineCreditCard
                    size={28}
                  />

                </div>

                <div>

                  <h3 className="font-bold">
                    Need Help?
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-white/65">
                    If you have questions about a payment,
                    refund, transaction or receipt, contact
                    your institute administration team.
                  </p>

                </div>

              </div>

            </div>

          </section>

          {/* =================================================
              ERROR
          ================================================= */}

          {!loading &&
            error && (
              <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/5 p-5 text-center">

                <p className="text-sm text-red-300">
                  {
                    error
                  }
                </p>

                <button
                  onClick={
                    fetchPayments
                  }
                  className="mt-4 rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold"
                >
                  Try Again
                </button>

              </div>
            )}

          {/* =================================================
              LOADING
          ================================================= */}

          {loading && (
            <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/40 backdrop-blur-[2px]">

              <div className="rounded-xl border border-blue-500/20 bg-[#061426] px-8 py-7 text-center shadow-2xl">

                <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-500/20 border-t-blue-500" />

                <p className="mt-4 text-sm text-white/65">
                  Loading payment details...
                </p>

              </div>

            </div>
          )}

        </main>

      </div>

    </div>
  );
}