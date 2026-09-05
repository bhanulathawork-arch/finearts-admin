// // import API from "./api";

// // export const getPaymentDashboard = async () => (await API.get("/payments/dashboard")).data.data;
// // export const getPaymentList = async (params) => (await API.get("/payments", { params })).data.data;
// // export const collectPaymentApi = async (data) => (await API.post("/payments/collect", data)).data;
// // export const getPendingPayments = async () => (await API.get("/payments/pending")).data.data;
// // export const getStudentHistory = async (id) => (await API.get(`/payments/student/${id}`)).data.data;
// // export const deletePayment = async (id) => (await API.delete(`/payments/${id}`)).data;



// const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// // ✅ STEP 1: Create order on backend
// export const createRazorpayOrder = async (amount, booking_id, class_id, token) => {
//   const res = await fetch(`${API_BASE}/payments/create-order`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify({ amount, booking_id, class_id }),
//   });

//   const data = await res.json();
//   if (!data.success) throw new Error(data.message);
//   return data;
// };

// // ✅ STEP 2: Verify payment on backend
// export const verifyRazorpayPayment = async (paymentData, token) => {
//   const res = await fetch(`${API_BASE}/payments/verify`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(paymentData),
//   });

//   const data = await res.json();
//   if (!data.success) throw new Error(data.message);
//   return data;
// };

// // ✅ STEP 3: Load Razorpay script dynamically
// export const loadRazorpayScript = () => {
//   return new Promise((resolve) => {
//     if (document.getElementById("razorpay-script")) {
//       resolve(true);
//       return;
//     }
//     const script = document.createElement("script");
//     script.id = "razorpay-script";
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.onload = () => resolve(true);
//     script.onerror = () => resolve(false);
//     document.body.appendChild(script);
//   });
// };


import API from "./api";

/* =========================================================
   PAYMENT DASHBOARD
========================================================= */

export const getPaymentDashboard = async () => {
  const res = await API.get("/payments/dashboard");
  return res.data.data;
};

export const getPaymentList = async (params) => {
  const res = await API.get("/payments", { params });
  return res.data.data;
};

export const collectPaymentApi = async (data) => {
  const res = await API.post("/payments/collect", data);
  return res.data;
};

export const getPendingPayments = async () => {
  const res = await API.get("/payments/pending");
  return res.data.data;
};

export const getStudentHistory = async (id) => {
  const res = await API.get(`/payments/student/${id}`);
  return res.data.data;
};

export const deletePayment = async (id) => {
  const res = await API.delete(`/payments/${id}`);
  return res.data;
};


/* =========================================================
   RAZORPAY
========================================================= */

/**
 * Create Razorpay order
 */
export const createRazorpayOrder = async (
  amount,
  booking_id,
  class_id,
  token
) => {
  const API_BASE =
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000/api";

  const res = await fetch(
    `${API_BASE}/payments/create-order`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        amount,
        booking_id,
        class_id,
      }),
    }
  );

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(
      data.message ||
        "Failed to create Razorpay order"
    );
  }

  return data;
};


/**
 * Verify Razorpay payment
 */
export const verifyRazorpayPayment = async (
  paymentData,
  token
) => {
  const API_BASE =
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000/api";

  const res = await fetch(
    `${API_BASE}/payments/verify`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify(paymentData),
    }
  );

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(
      data.message ||
        "Payment verification failed"
    );
  }

  return data;
};


/**
 * Load Razorpay checkout script
 */
export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (
      document.getElementById(
        "razorpay-script"
      )
    ) {
      resolve(true);
      return;
    }

    const script =
      document.createElement("script");

    script.id =
      "razorpay-script";

    script.src =
      "https://checkout.razorpay.com/v1/checkout.js";

    script.onload = () =>
      resolve(true);

    script.onerror = () =>
      resolve(false);

    document.body.appendChild(
      script
    );
  });
};