// // src/utils/currency.js

// import { useEffect, useState } from "react";
// import { getLocation } from "../services/api";

// const DEFAULT_CURRENCY = "INR";
// const CACHE_KEY = "finearts_exchange_rates";
// const CACHE_TIME = 24 * 60 * 60 * 1000; // 24 Hours

// /* ==========================================================
//    FALLBACK RATES
// ========================================================== */

// const fallbackRates = {
//   INR: 1,
//   USD: 0.012,
//   EUR: 0.011,
//   GBP: 0.009,
//   AED: 0.044,
//   SGD: 0.016,
//   AUD: 0.018,
//   CAD: 0.017,
//   JPY: 1.75,
//   CNY: 0.086,
//   MYR: 0.051,
//   THB: 0.39,
//   NZD: 0.020,
// };

// let exchangeRates = { ...fallbackRates };

// /* ==========================================================
//    LOAD EXCHANGE RATES
// ========================================================== */

// export const loadExchangeRates = async () => {
//   try {
//     const cached = localStorage.getItem(CACHE_KEY);

//     if (cached) {
//       const parsed = JSON.parse(cached);

//       if (
//         Date.now() - parsed.timestamp <
//         CACHE_TIME
//       ) {
//         exchangeRates = parsed.rates;
//         return exchangeRates;
//       }
//     }

//     const res = await fetch(
//       "https://open.er-api.com/v6/latest/INR"
//     );

//     const data = await res.json();

//     if (
//       data &&
//       data.result === "success" &&
//       data.rates
//     ) {
//       exchangeRates = data.rates;

//       localStorage.setItem(
//         CACHE_KEY,
//         JSON.stringify({
//           timestamp: Date.now(),
//           rates: data.rates,
//         })
//       );
//     }
//   } catch (err) {
//     console.warn(
//       "Using fallback exchange rates."
//     );
//   }

//   return exchangeRates;
// };

// /* ==========================================================
//    CONVERT PRICE
// ========================================================== */

// export const convertPrice = (
//   amount,
//   currency = DEFAULT_CURRENCY
// ) => {
//   const value = Number(amount || 0);

//   const rate =
//     exchangeRates[currency] ??
//     exchangeRates[DEFAULT_CURRENCY] ??
//     1;

//   return value * rate;
// };

// /* ==========================================================
//    FORMAT PRICE
// ========================================================== */

// export const formatCurrency = (
//   amount,
//   currency = DEFAULT_CURRENCY
// ) => {
//   try {
//     return new Intl.NumberFormat(undefined, {
//       style: "currency",
//       currency,
//       maximumFractionDigits: 2,
//     }).format(convertPrice(amount, currency));
//   } catch {
//     return `${currency} ${convertPrice(
//       amount,
//       currency
//     ).toFixed(2)}`;
//   }
// };

// /* ==========================================================
//    FORMAT INR
// ========================================================== */

// export const formatINR = (amount) => {
//   return new Intl.NumberFormat("en-IN", {
//     style: "currency",
//     currency: "INR",
//   }).format(Number(amount || 0));
// };

// /* ==========================================================
//    HOOK
// ========================================================== */

// export const useCurrencyWithRates = () => {
//   const [currency, setCurrency] =
//     useState(DEFAULT_CURRENCY);

//   const [country, setCountry] =
//     useState("IN");

//   const [loading, setLoading] =
//     useState(true);

//   useEffect(() => {
//     let mounted = true;

//     const init = async () => {
//       try {
//         await loadExchangeRates();

//         const location = await getLocation();

//         if (!mounted) return;

//         setCountry(location.country || "IN");

//         setCurrency(
//           location.currency || DEFAULT_CURRENCY
//         );
//       } catch (err) {
//         console.error(err);

//         if (!mounted) return;

//         setCountry("IN");
//         setCurrency(DEFAULT_CURRENCY);
//       } finally {
//         if (mounted) {
//           setLoading(false);
//         }
//       }
//     };

//     init();

//     return () => {
//       mounted = false;
//     };
//   }, []);

//   return {
//     loading,

//     country,

//     code: currency,

//     label: currency,

//     rates: exchangeRates,

//     format: (amount) =>
//       formatCurrency(amount, currency),

//     formatINR,

//     convert: (amount) =>
//       convertPrice(amount, currency),
//   };
// };



// src/utils/currency.js

import { useEffect, useState } from "react";

const DEFAULT_CURRENCY = "INR";

const CACHE_KEY =
  "finearts_exchange_rates";

const CACHE_TIME =
  24 * 60 * 60 * 1000; // 24 hours

/* ==========================================================
   FALLBACK RATES
   Base currency = INR
========================================================== */

const fallbackRates = {
  INR: 1,
  USD: 0.012,
  EUR: 0.011,
  GBP: 0.009,
  AED: 0.044,
  SGD: 0.016,
  AUD: 0.018,
  CAD: 0.017,
  JPY: 1.75,
  CNY: 0.086,
  MYR: 0.051,
  THB: 0.39,
  NZD: 0.020,
};

let exchangeRates = {
  ...fallbackRates,
};

/* ==========================================================
   LOAD EXCHANGE RATES
========================================================== */

export const loadExchangeRates = async () => {
  try {
    // ------------------------------------------------------
    // CHECK CACHE
    // ------------------------------------------------------

    const cached =
      localStorage.getItem(CACHE_KEY);

    if (cached) {
      try {
        const parsed = JSON.parse(cached);

        if (
          parsed?.timestamp &&
          parsed?.rates &&
          Date.now() - parsed.timestamp <
            CACHE_TIME
        ) {
          exchangeRates = {
            ...fallbackRates,
            ...parsed.rates,
          };

          return exchangeRates;
        }
      } catch (cacheError) {
        console.warn(
          "Invalid currency cache. Refreshing rates."
        );

        localStorage.removeItem(
          CACHE_KEY
        );
      }
    }

    // ------------------------------------------------------
    // FETCH LIVE RATES
    // ------------------------------------------------------

    const response = await fetch(
      "https://open.er-api.com/v6/latest/INR"
    );

    if (!response.ok) {
      throw new Error(
        `Exchange rate API failed: ${response.status}`
      );
    }

    const data =
      await response.json();

    if (
      data?.result === "success" &&
      data?.rates
    ) {
      exchangeRates = {
        ...fallbackRates,
        ...data.rates,
      };

      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          timestamp: Date.now(),
          rates: exchangeRates,
        })
      );
    } else {
      console.warn(
        "Exchange rate API returned invalid data. Using fallback rates."
      );
    }
  } catch (error) {
    console.warn(
      "Unable to load live exchange rates. Using fallback rates.",
      error
    );

    exchangeRates = {
      ...fallbackRates,
    };
  }

  return exchangeRates;
};

/* ==========================================================
   CONVERT PRICE
========================================================== */

export const convertPrice = (
  amount,
  currency = DEFAULT_CURRENCY
) => {
  const value = Number(amount || 0);

  const rate =
    exchangeRates[currency] ??
    fallbackRates[currency] ??
    1;

  return value * rate;
};

/* ==========================================================
   FORMAT PRICE
========================================================== */

export const formatCurrency = (
  amount,
  currency = DEFAULT_CURRENCY
) => {
  const value = convertPrice(
    amount,
    currency
  );

  try {
    return new Intl.NumberFormat(
      undefined,
      {
        style: "currency",
        currency,
        maximumFractionDigits: 2,
      }
    ).format(value);
  } catch {
    return `${currency} ${value.toFixed(2)}`;
  }
};

/* ==========================================================
   FORMAT INR
========================================================== */

export const formatINR = (
  amount
) => {
  return new Intl.NumberFormat(
    "en-IN",
    {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }
  ).format(Number(amount || 0));
};

/* ==========================================================
   GET USER COUNTRY
==========================================================

   We don't depend on api.js here.

   Browser language is used only as a lightweight hint.
   India remains the safe default.

========================================================== */

const getBrowserLocation = () => {
  try {
    const language =
      navigator.language ||
      navigator.userLanguage ||
      "en-IN";

    const parts =
      language.split("-");

    const country =
      parts[1]?.toUpperCase() ||
      "IN";

    const currencyMap = {
      IN: "INR",
      US: "USD",
      GB: "GBP",
      DE: "EUR",
      FR: "EUR",
      IT: "EUR",
      ES: "EUR",
      NL: "EUR",
      AE: "AED",
      SG: "SGD",
      AU: "AUD",
      CA: "CAD",
      JP: "JPY",
      CN: "CNY",
      MY: "MYR",
      TH: "THB",
      NZ: "NZD",
    };

    return {
      country,
      currency:
        currencyMap[country] ||
        DEFAULT_CURRENCY,
    };
  } catch {
    return {
      country: "IN",
      currency: DEFAULT_CURRENCY,
    };
  }
};

/* ==========================================================
   CURRENCY HOOK
========================================================== */

export const useCurrencyWithRates = () => {
  const [currency, setCurrency] =
    useState(DEFAULT_CURRENCY);

  const [country, setCountry] =
    useState("IN");

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    let mounted = true;

    const initializeCurrency =
      async () => {
        try {
          // -----------------------------------------------
          // Load exchange rates
          // -----------------------------------------------

          await loadExchangeRates();

          if (!mounted) {
            return;
          }

          // -----------------------------------------------
          // Detect browser location
          // -----------------------------------------------

          const location =
            getBrowserLocation();

          setCountry(
            location.country || "IN"
          );

          setCurrency(
            location.currency ||
              DEFAULT_CURRENCY
          );
        } catch (error) {
          console.error(
            "Currency initialization error:",
            error
          );

          if (!mounted) {
            return;
          }

          setCountry("IN");

          setCurrency(
            DEFAULT_CURRENCY
          );
        } finally {
          if (mounted) {
            setLoading(false);
          }
        }
      };

    initializeCurrency();

    return () => {
      mounted = false;
    };
  }, []);

  return {
    loading,

    country,

    code: currency,

    label: currency,

    rates: exchangeRates,

    format: (amount) =>
      formatCurrency(
        amount,
        currency
      ),

    formatINR,

    convert: (amount) =>
      convertPrice(
        amount,
        currency
      ),
  };
};

export default useCurrencyWithRates;