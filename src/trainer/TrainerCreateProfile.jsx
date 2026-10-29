


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import axios from "axios";

import {
  getCategories,
  getSubcategories,
} from "../services/trainerService";

export default function TrainerCreateProfile() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    experience_years: "",
    languages: "",
    certifications: "",
    selectedCategories: [],
    selectedSubcategories: [],
    profile_image: null,
    proof_document: null,
  });

  /*
   * Track fields manually edited by the trainer.
   */
  const [userEditedFields, setUserEditedFields] = useState({});

  /* =========================================================
     PHONE NUMBER NORMALIZER
     ========================================================= */

  const normalizePhoneNumber = (value) => {
    // Keep numbers only
    const digits = String(value || "").replace(/\D/g, "");

    // If Firebase gives +91XXXXXXXXXX,
    // keep only the final 10 digits.
    if (digits.length > 10) {
      return digits.slice(-10);
    }

    return digits;
  };

  /* =========================================================
     FETCH LOGGED-IN ACCOUNT DETAILS
     ========================================================= */

  useEffect(() => {
    let cancelled = false;

    const populateAccountDetails = (firebaseUser) => {
      if (!firebaseUser || cancelled) {
        return;
      }

      const firebaseEmail = firebaseUser.email || "";

      const firebasePhone = normalizePhoneNumber(
        firebaseUser.phoneNumber || ""
      );

      console.log("==========================================");
      console.log("TRAINER CREATE PROFILE - ACCOUNT DETAILS");
      console.log("Firebase UID:", firebaseUser.uid);
      console.log("Firebase Email:", firebaseEmail || null);
      console.log("Firebase Phone:", firebasePhone || null);
      console.log("==========================================");

      setForm((prev) => ({
        ...prev,

        email: userEditedFields.email
          ? prev.email
          : prev.email || firebaseEmail,

        phone_number: userEditedFields.phone_number
          ? prev.phone_number
          : prev.phone_number || firebasePhone,
      }));
    };

    // Firebase may already be ready
    if (auth.currentUser) {
      populateAccountDetails(auth.currentUser);
    }

    // Listen for Firebase auth state
    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser) => {
        populateAccountDetails(firebaseUser);
      }
    );

    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, [
    userEditedFields.email,
    userEditedFields.phone_number,
  ]);

  /* =========================================================
     LOAD CATEGORIES & SUBCATEGORIES
     ========================================================= */

  useEffect(() => {
    const loadDropdowns = async () => {
      try {
        const [categoryRes, subcategoryRes] =
          await Promise.all([
            getCategories(),
            getSubcategories(),
          ]);

        console.log("CATEGORY API =", categoryRes.data);
        console.log(
          "SUBCATEGORY API =",
          subcategoryRes.data
        );

        setCategories(categoryRes.data.data || []);
        setSubcategories(subcategoryRes.data.data || []);
      } catch (err) {
        console.error("Dropdown Error:", err);

        toast.error(
          "Failed to load categories and subcategories"
        );
      }
    };

    loadDropdowns();
  }, []);

  /* =========================================================
     HANDLE INPUT CHANGE
     ========================================================= */

  const handleChange = (e) => {
    const {
      name,
      value,
      files,
    } = e.target;

    /*
     * EMAIL
     */
    if (name === "email") {
      setUserEditedFields((prev) => ({
        ...prev,
        email: true,
      }));

      setForm((prev) => ({
        ...prev,
        email: value,
      }));

      return;
    }

    /*
     * PHONE NUMBER
     *
     * Only numbers are allowed.
     */
    if (name === "phone_number") {
      setUserEditedFields((prev) => ({
        ...prev,
        phone_number: true,
      }));

      const numericValue = normalizePhoneNumber(value);

      setForm((prev) => ({
        ...prev,
        phone_number: numericValue,
      }));

      return;
    }

    /*
     * FILE INPUTS
     */
    if (files) {
      setForm((prev) => ({
        ...prev,
        [name]: files[0],
      }));

      return;
    }

    /*
     * NORMAL INPUTS
     */
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =========================================================
     PHONE KEYBOARD RESTRICTION
     ========================================================= */

  const handlePhoneKeyDown = (e) => {
    const allowedKeys = [
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
      "Tab",
      "Home",
      "End",
    ];

    if (
      !/[0-9]/.test(e.key) &&
      !allowedKeys.includes(e.key)
    ) {
      e.preventDefault();
    }
  };

  /* =========================================================
     CATEGORY CHANGE
     ========================================================= */

  const handleCategoryChange = (e) => {
    const catId = Number(e.target.value);

    setForm((prev) => {
      const newSelectedCategories = e.target.checked
        ? [...prev.selectedCategories, catId]
        : prev.selectedCategories.filter(
            (id) => id !== catId
          );

      /*
       * Remove subcategories whose parent category
       * has been unchecked.
       */
      const newSelectedSubcategories =
        prev.selectedSubcategories.filter((subId) => {
          const sub = subcategories.find(
            (s) => s.id === subId
          );

          return (
            sub &&
            newSelectedCategories.includes(
              sub.category_id
            )
          );
        });

      return {
        ...prev,
        selectedCategories:
          newSelectedCategories,
        selectedSubcategories:
          newSelectedSubcategories,
      };
    });
  };

  /* =========================================================
     SUBCATEGORY CHANGE
     ========================================================= */

  const handleSubcategoryChange = (e) => {
    const subId = Number(e.target.value);

    setForm((prev) => ({
      ...prev,
      selectedSubcategories: e.target.checked
        ? [...prev.selectedSubcategories, subId]
        : prev.selectedSubcategories.filter(
            (id) => id !== subId
          ),
    }));
  };

  /* =========================================================
     FILTER SUBCATEGORIES
     ========================================================= */

  const filteredSubcategories =
    subcategories.filter((sub) =>
      form.selectedCategories.includes(
        sub.category_id
      )
    );

  /* =========================================================
     FORM SUBMIT
     ========================================================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    /* -----------------------------------------
       REQUIRED FIELD VALIDATION
    ----------------------------------------- */

    if (
      !form.full_name ||
      !form.email ||
      !form.phone_number
    ) {
      toast.error(
        "Please fill all required fields"
      );
      return;
    }

    /* -----------------------------------------
       PHONE VALIDATION
    ----------------------------------------- */

    if (!/^[0-9]{10}$/.test(form.phone_number)) {
      toast.error(
        "Please enter a valid 10-digit phone number"
      );
      return;
    }

    /* -----------------------------------------
       FIREBASE AUTH CHECK
    ----------------------------------------- */

    if (!auth.currentUser) {
      toast.error("Please login again");
      navigate("/trainer/login");
      return;
    }

    setLoading(true);

    try {
      /* -----------------------------------------
         GET FRESH FIREBASE TOKEN
      ----------------------------------------- */

      const firebaseToken =
        await auth.currentUser.getIdToken(true);

      console.log(
        "FRESH TOKEN =",
        firebaseToken
      );

      /* -----------------------------------------
         CREATE FORM DATA
      ----------------------------------------- */

      const fd = new FormData();

      Object.entries(form).forEach(
        ([key, value]) => {
          /*
           * Arrays are handled separately.
           */
          if (
            key === "selectedCategories" ||
            key === "selectedSubcategories"
          ) {
            return;
          }

          if (
            value !== null &&
            value !== undefined &&
            value !== ""
          ) {
            fd.append(key, value);
          }
        }
      );

      /* -----------------------------------------
         CREATE SPECIALIZATIONS
      ----------------------------------------- */

      const categoryPayload =
        form.selectedCategories.flatMap(
          (catId) => {
            const relatedSubs =
              form.selectedSubcategories.filter(
                (subId) => {
                  const sub = subcategories.find(
                    (s) => s.id === subId
                  );

                  return (
                    sub &&
                    sub.category_id === catId
                  );
                }
              );

            if (relatedSubs.length > 0) {
              return relatedSubs.map(
                (subId) => ({
                  category_id: catId,
                  subcategory_id: subId,
                })
              );
            }

            return [
              {
                category_id: catId,
                subcategory_id: null,
              },
            ];
          }
        );

      fd.append(
        "specializations",
        JSON.stringify(categoryPayload)
      );

      /* -----------------------------------------
         SEND PROFILE
      ----------------------------------------- */

      const res = await axios.post(
        // "https://finearts-backend.onrender.com/api/trainers/complete-profile",

        "http://localhost:5000/api/trainers/complete-profile",
        fd,
        {
          headers: {
            Authorization: `Bearer ${firebaseToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(
        "PROFILE RESPONSE =",
        res.data
      );

      toast.success(
        "Profile created successfully!"
      );

      navigate("/trainer/pending");
    } catch (err) {
      console.error(
        "PROFILE ERROR =",
        err
      );

      toast.error(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to create profile"
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     STYLES
     ========================================================= */

  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-purple-500 transition";

  const checkboxContainerClass =
    "w-full bg-[#0a0a0f] border border-white/10 rounded-xl p-3 max-h-48 overflow-y-auto focus-within:border-purple-500 transition";

  /* =========================================================
     UI
     ========================================================= */

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">

        {/* =========================================
            HEADER
        ========================================= */}

        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-purple-600/20 border border-purple-500/30 mb-4">
            <svg
              className="w-8 h-8 text-purple-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-white">
            Complete Your Profile
          </h1>

          <p className="text-white mt-2">
            Fill in your details to apply as a trainer
          </p>
        </div>

        {/* =========================================
            FORM
        ========================================= */}

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* =======================================
              BASIC INFO
          ======================================= */}

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">

            <h2 className="text-white font-semibold text-sm uppercase tracking-widest opacity-50">
              Basic Info
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* FULL NAME */}

              <div>
                <label className="text-white text-sm mb-1 block">
                  Full Name *
                </label>

                <input
                  name="full_name"
                  value={form.full_name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={inputClass}
                  required
                />
              </div>

              {/* EMAIL */}

              <div>
                <label className="text-white text-sm mb-1 block">
                  Email *
                </label>

                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@email.com"
                  autoComplete="email"
                  className={inputClass}
                  required
                />
              </div>

              {/* PHONE NUMBER */}

              <div>
                <label className="text-white text-sm mb-1 block">
                  Phone Number *
                </label>

                <input
                  name="phone_number"
                  type="tel"
                  value={form.phone_number}
                  onChange={handleChange}
                  onKeyDown={handlePhoneKeyDown}
                  placeholder="9999999999"
                  inputMode="numeric"
                  maxLength={10}
                  autoComplete="tel"
                  pattern="[0-9]{10}"
                  className={inputClass}
                  required
                />

                <p className="text-white text-xs mt-1">
                  Enter 10-digit mobile number
                </p>
              </div>

              {/* EXPERIENCE */}

              <div>
                <label className="text-white text-sm mb-1 block">
                  Experience (Years)
                </label>

                <input
                  name="experience_years"
                  type="number"
                  min="0"
                  value={form.experience_years}
                  onChange={handleChange}
                  placeholder="3"
                  className={inputClass}
                />
              </div>

              {/* LANGUAGES */}

              <div className="sm:col-span-2">
                <label className="text-white text-sm mb-1 block">
                  Languages
                </label>

                <input
                  name="languages"
                  value={form.languages}
                  onChange={handleChange}
                  placeholder="English, Hindi"
                  className={inputClass}
                />
              </div>

            </div>
          </div>

          {/* =======================================
              ABOUT YOU
          ======================================= */}

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">

            <h2 className="text-white font-semibold text-sm uppercase tracking-widest opacity-50">
              About You
            </h2>

            <div>
              <label className="text-white text-sm mb-1 block">
                Certifications
              </label>

              <textarea
                name="certifications"
                value={form.certifications}
                onChange={handleChange}
                rows={2}
                placeholder="ACE Certified, NASM CPT..."
                className={`${inputClass} resize-none`}
              />
            </div>

          </div>

          {/* =======================================
              EXPERTISE
          ======================================= */}

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">

            <h2 className="text-white font-semibold text-sm uppercase tracking-widest opacity-50">
              Expertise
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* CATEGORIES */}

              <div>
                <label className="text-white text-sm mb-1 block">
                  Categories
                </label>

                <div
                  className={
                    checkboxContainerClass
                  }
                >
                  {categories.length === 0 ? (
                    <p className="text-white text-sm p-2">
                      Loading...
                    </p>
                  ) : (
                    categories.map((c) => (
                      <label
                        key={c.id}
                        className="flex items-center gap-3 py-1.5 px-2 rounded-lg hover:bg-white/5 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          value={c.id}
                          onChange={
                            handleCategoryChange
                          }
                          checked={form.selectedCategories.includes(
                            c.id
                          )}
                          className="w-4 h-4 accent-purple-500"
                        />

                        <span className="text-white text-sm">
                          {c.name}
                        </span>
                      </label>
                    ))
                  )}
                </div>
              </div>

              {/* SUBCATEGORIES */}

              <div>
                <label className="text-white text-sm mb-1 block">
                  Subcategories
                </label>

                <div
                  className={
                    checkboxContainerClass
                  }
                >
                  {form.selectedCategories
                    .length === 0 ? (
                    <p className="text-white text-sm p-2">
                      Select a category first
                    </p>
                  ) : filteredSubcategories.length ===
                    0 ? (
                    <p className="text-white text-sm p-2">
                      No subcategories available
                    </p>
                  ) : (
                    filteredSubcategories.map(
                      (s) => (
                        <label
                          key={s.id}
                          className="flex items-center gap-3 py-1.5 px-2 rounded-lg hover:bg-white/5 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            value={s.id}
                            onChange={
                              handleSubcategoryChange
                            }
                            checked={form.selectedSubcategories.includes(
                              s.id
                            )}
                            className="w-4 h-4 accent-purple-500"
                          />

                          <span className="text-white text-sm">
                            {s.name}
                          </span>
                        </label>
                      )
                    )
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* =======================================
              UPLOADS
          ======================================= */}

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">

            <h2 className="text-white font-semibold text-sm uppercase tracking-widest opacity-50">
              Uploads
            </h2>

            {/* PROFILE IMAGE */}

            <div>
              <label className="text-white text-sm mb-1 block">
                Profile Image
              </label>

              <input
                type="file"
                name="profile_image"
                onChange={handleChange}
                accept="image/*"
                className="w-full text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-purple-600/20 file:text-purple-300 hover:file:bg-purple-600/30 file:cursor-pointer"
              />
            </div>

            {/* PROOF DOCUMENT */}

            <div>
              <label className="text-white text-sm mb-1 block">
                Proof Document (e.g., Certificate, ID)
              </label>

              <input
                type="file"
                name="proof_document"
                onChange={handleChange}
                accept=".pdf,.jpg,.jpeg,.png"
                className="w-full text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-purple-600/20 file:text-purple-300 hover:file:bg-purple-600/30 file:cursor-pointer"
              />
            </div>

          </div>

          {/* =======================================
              SUBMIT
          ======================================= */}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-2xl transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? "Submitting..."
              : "Submit for Approval →"}
          </button>

        </form>
      </div>
    </div>
  );
}