
import React, { useEffect, useState } from "react";







import {



  FaUser,



  FaEnvelope,



  FaPhone,



  FaMapMarkerAlt,



  FaCalendarAlt,



  FaVenusMars,



  FaGlobeAsia,



  FaCity,



  FaMapPin,



  FaCamera,



  FaEdit,



  FaSave,



  FaTimes,



  FaCheckCircle,



} from "react-icons/fa";







import { useNavigate } from "react-router-dom";



import API from "../../services/api";







/* =========================================================



   INITIAL FORM



========================================================= */







const INITIAL_FORM = {



  name: "",



  email: "",



  phone: "",



  gender: "",



  dob: "",



  address: "",



  city: "",



  state: "",



  pincode: "",



  country: "India",



};







/* =========================================================



   HELPERS



========================================================= */







function getDisplayName(user) {



  return (



    user?.name ||



    user?.full_name ||



    user?.fullName ||



    user?.username ||



    ""



  );



}







function getEmail(user) {



  return user?.email || "";



}







function getPhone(user) {



  return user?.phone || user?.phone_number || "";



}







function getGender(user) {



  return user?.gender || "";



}







function getDob(user) {



  return (



    user?.date_of_birth ||



    user?.dob ||



    user?.dateOfBirth ||



    ""



  );



}







function getAddress(user) {



  return (



    user?.address ||



    user?.address_line ||



    user?.addressLine ||



    ""



  );



}







function getCity(user) {



  return user?.city || "";



}







function getState(user) {



  return user?.state || user?.state_name || "";



}







function getPincode(user) {



  return (



    user?.pincode ||



    user?.pin_code ||



    user?.postal_code ||



    user?.zip_code ||



    ""



  );



}







function getCountry(user) {



  return user?.country || "India";



}







function getProfileImage(user) {



  return (



    user?.profile_image ||



    user?.profileImage ||



    user?.photoURL ||



    user?.photo_url ||



    ""



  );



}







function getInitials(name = "") {



  const value = String(name).trim();







  if (!value) {



    return "U";



  }







  const parts = value.split(/\s+/);







  if (parts.length === 1) {



    return parts[0].slice(0, 2).toUpperCase();



  }







  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();



}







/* =========================================================



   NORMALIZE DATE







   Backend may return:



   2026-09-27T00:00:00.000Z







   Input[type=date] requires:



   2026-09-27



========================================================= */







function normalizeDate(value) {



  if (!value) return "";







  const stringValue = String(value);







  if (stringValue.includes("T")) {



    return stringValue.split("T")[0];



  }







  return stringValue.slice(0, 10);



}











/* =========================================================



   INPUT FIELD



========================================================= */







function ProfileField({



  label,



  icon: Icon,



  value,



  onChange,



  editing,



  type = "text",



  placeholder = "",



  inputMode,



  maxLength,



}) {



  return (



    <div>



      <label className="mb-2 block text-[12px] font-semibold tracking-wide text-white">



        {label}



      </label>







      <div className="relative">



        <Icon



          size={15}



          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-blue-400/80"



        />







        <input



          type={type}



          value={value || ""}



          onChange={onChange}



          disabled={!editing}



          placeholder={placeholder}



          inputMode={inputMode}



          maxLength={maxLength}



          autoComplete="off"



          className={`h-[48px] w-full rounded-xl border bg-black pl-11 pr-4 text-[14px] text-white outline-none transition ${



            editing



              ? "border-white/10 hover:border-blue-500/40 focus:border-blue-500"



              : "cursor-default border-white/[0.06] text-white"



          } placeholder:text-white disabled:opacity-100`}



        />



      </div>



    </div>



  );



}







/* =========================================================



   ADDRESS FIELD



========================================================= */







function AddressField({



  label,



  icon: Icon,



  value,



  onChange,



  editing,



  placeholder = "",



}) {



  return (



    <div>



      <label className="mb-2 block text-[12px] font-semibold tracking-wide text-white">



        {label}



      </label>







      <div className="relative">



        <Icon



          size={15}



          className="absolute left-4 top-4 text-blue-400/80"



        />







        <textarea



          value={value || ""}



          onChange={onChange}



          disabled={!editing}



          rows={3}



          placeholder={placeholder}



          className={`w-full resize-none rounded-xl border bg-black py-3 pl-11 pr-4 text-[14px] leading-6 text-white outline-none transition ${



            editing



              ? "border-white/10 hover:border-blue-500/40 focus:border-blue-500"



              : "cursor-default border-white/[0.06] text-white"



          } placeholder:text-white disabled:opacity-100`}



        />



      </div>



    </div>



  );



}







/* =========================================================



   SELECT FIELD



========================================================= */







function SelectField({



  label,



  icon: Icon,



  value,



  onChange,



  editing,



  options,



}) {



  return (



    <div>



      <label className="mb-2 block text-[12px] font-semibold tracking-wide text-white">



        {label}



      </label>







      <div className="relative">



        <Icon



          size={15}



          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-blue-400/80"



        />







        <select



          value={value || ""}



          onChange={onChange}



          disabled={!editing}



          className={`h-[48px] w-full appearance-none rounded-xl border bg-black pl-11 pr-4 text-[14px] outline-none transition ${



            editing



              ? "border-white/10 text-white hover:border-blue-500/40 focus:border-blue-500"



              : "cursor-default border-white/[0.06] text-white"



          }`}



        >



          <option value="">Select</option>







          {options.map((option) => (



            <option key={option} value={option}>



              {option}



            </option>



          ))}



        </select>



      </div>



    </div>



  );



}







/* =========================================================



   SUMMARY ROW



========================================================= */







function SummaryRow({ icon: Icon, label, value }) {



  return (



    <div className="flex items-start gap-3 rounded-xl bg-white/[0.025] px-4 py-3">



      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">



        <Icon size={13} />



      </div>







      <div className="min-w-0">



        <p className="text-[10px] font-semibold uppercase tracking-wider text-white">



          {label}



        </p>







        <p className="mt-1 truncate text-[13px] text-white">



          {value}



        </p>



      </div>



    </div>



  );



}







/* =========================================================



   PROFILE CARD



========================================================= */







function ProfileCard({



  user,



  preview,



  editing,



  onImageChange,



}) {



  const name = getDisplayName(user) || "User";



  const image = preview || getProfileImage(user);







  return (



    <section className="rounded-2xl border border-white/10 bg-black p-7 shadow-[0_20px_60px_rgba(0,0,0,.25)]">







      <div className="flex flex-col items-center text-center">







        {/* PROFILE IMAGE */}



        <div className="relative">



          <div className="h-[150px] w-[150px] overflow-hidden rounded-full border-2 border-blue-500/70 bg-[#061426] p-1 shadow-[0_0_35px_rgba(0,124,255,.16)]">



            {image ? (



              <img



                src={image}



                alt={name}



                className="h-full w-full rounded-full object-cover"



                onError={(event) => {



                  event.currentTarget.style.display = "none";



                }}



              />



            ) : (



              <div className="flex h-full w-full items-center justify-center rounded-full bg-[#061426] text-3xl font-bold text-blue-300">



                {getInitials(name)}



              </div>



            )}



          </div>







          {editing && (



            <label className="absolute bottom-1 right-1 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border-4 border-[#0D0F16] bg-gradient-to-r from-[#155CFF] to-[#087CFF] text-white shadow-lg">



              <FaCamera size={15} />







              <input



                type="file"



                accept="image/*"



                className="hidden"



                onChange={onImageChange}



              />



            </label>



          )}



        </div>







        <h2 className="mt-5 text-[24px] font-bold text-white">



          {name}



        </h2>







        <p className="mt-1 max-w-full truncate text-[13px] text-white">



          {getEmail(user) || "No email available"}



        </p>







        {user?.role && (



          <div className="mt-4 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-[11px] font-semibold uppercase text-blue-300">



            {user.role}



          </div>



        )}



      </div>







      <div className="mt-7 space-y-3 border-t border-white/10 pt-6">







        <SummaryRow



          icon={FaEnvelope}



          label="Email"



          value={getEmail(user) || "Not available"}



        />







        <SummaryRow



          icon={FaPhone}



          label="Phone"



          value={getPhone(user) || "Not available"}



        />







        <SummaryRow



          icon={FaMapMarkerAlt}



          label="Location"



          value={



            [getCity(user), getState(user)]



              .filter(Boolean)



              .join(", ") || "Not available"



          }



        />







        <SummaryRow



          icon={FaMapPin}



          label="Pincode"



          value={getPincode(user) || "Not available"}



        />



      </div>



    </section>



  );



}







/* =========================================================



   MAIN PROFILE PAGE



========================================================= */







export default function WebsiteProfile() {
  useEffect(() => {
    const previousHtmlBackground = document.documentElement.style.backgroundColor;
    const previousBodyBackground = document.body.style.backgroundColor;
    document.documentElement.style.backgroundColor = "#000000";
    document.body.style.backgroundColor = "#000000";
    return () => {
      document.documentElement.style.backgroundColor = previousHtmlBackground;
      document.body.style.backgroundColor = previousBodyBackground;
    };
  }, []);



  const navigate = useNavigate();







  const [user, setUser] = useState(null);







  const [form, setForm] = useState(INITIAL_FORM);







  const [loading, setLoading] = useState(true);







  const [editing, setEditing] = useState(false);







  const [saving, setSaving] = useState(false);







  const [profileImage, setProfileImage] = useState(null);







  const [preview, setPreview] = useState("");







  const [message, setMessage] = useState("");







  const [error, setError] = useState("");







  /* =======================================================



     LOAD PROFILE



  ======================================================= */







  useEffect(() => {



    let mounted = true;







    const loadProfile = async () => {



      try {



        setLoading(true);



        setError("");







        const response = await API.get("/users/profile");







        const data = response?.data;







        const profile =



          data?.user ||



          data?.profile ||



          data?.data?.user ||



          data?.data ||



          data;







        if (!mounted) return;







        if (!profile || typeof profile !== "object") {



          throw new Error("Profile data not found.");



        }







        setUser(profile);







        setForm({



          name: getDisplayName(profile),



          email: getEmail(profile),



          phone: getPhone(profile),



          gender: getGender(profile),



          dob: normalizeDate(getDob(profile)),



          address: getAddress(profile),



          city: getCity(profile),



          state: getState(profile),



          pincode: getPincode(profile),



          country: getCountry(profile),



        });



      } catch (err) {



        console.error("PROFILE LOAD ERROR:", err);







        if (mounted) {



          setError(



            err?.response?.data?.message ||



              err?.message ||



              "Unable to load profile."



          );



        }



      } finally {



        if (mounted) {



          setLoading(false);



        }



      }



    };







    loadProfile();







    return () => {



      mounted = false;



    };



  }, []);







  /* =======================================================



     FORM CHANGE







     IMPORTANT:



     PHONE -> NUMBERS ONLY



     PINCODE -> NUMBERS ONLY



  ======================================================= */







  const handleChange = (field) => (event) => {



    let value = event.target.value;







    /* PHONE NUMBER */



    if (field === "phone") {



      value = value.replace(/\D/g, "").slice(0, 10);



    }







    /* PINCODE */



    if (field === "pincode") {



      value = value.replace(/\D/g, "").slice(0, 6);



    }







    setForm((previous) => ({



      ...previous,



      [field]: value,



    }));



  };







  /* =======================================================



     IMAGE CHANGE



  ======================================================= */







  const handleImageChange = (event) => {



    const file = event.target.files?.[0];







    if (!file) return;







    if (!file.type.startsWith("image/")) {



      setError("Please select a valid image.");



      return;



    }







    setProfileImage(file);







    const objectUrl = URL.createObjectURL(file);







    setPreview(objectUrl);







    setEditing(true);







    setError("");



  };







  /* =======================================================



     EDIT



  ======================================================= */







  const handleEdit = () => {



    setEditing(true);



    setMessage("");



    setError("");



  };







  /* =======================================================



     CANCEL



  ======================================================= */







  const handleCancel = () => {



    if (!user) return;







    setForm({



      name: getDisplayName(user),



      email: getEmail(user),



      phone: getPhone(user),



      gender: getGender(user),



      dob: normalizeDate(getDob(user)),



      address: getAddress(user),



      city: getCity(user),



      state: getState(user),



      pincode: getPincode(user),



      country: getCountry(user),



    });







    setProfileImage(null);







    if (preview) {



      URL.revokeObjectURL(preview);



    }







    setPreview("");







    setEditing(false);







    setError("");







    setMessage("");



  };







  /* =======================================================



     SAVE PROFILE



  ======================================================= */







  const handleSave = async () => {



    try {



      setSaving(true);



      setMessage("");



      setError("");







      /* VALIDATE NAME */



      if (!form.name.trim()) {



        throw new Error("Full name is required.");



      }







      /* VALIDATE PHONE */



      if (



        form.phone &&



        !/^\d{10}$/.test(form.phone)



      ) {



        throw new Error(



          "Phone number must contain exactly 10 digits."



        );



      }







      /* VALIDATE PINCODE */



      if (



        form.pincode &&



        !/^\d{6}$/.test(form.pincode)



      ) {



        throw new Error(



          "Pincode must contain exactly 6 digits."



        );



      }







      /* ===================================================



         BACKEND FIELD NAMES







         These match userController.js:



         full_name



         email



         phone_number



         gender



         date_of_birth



         profile_image



         address



         city



         state



         country



         pincode



      =================================================== */







      const payload = {



        full_name: form.name.trim(),







        email: form.email.trim(),







        phone_number: form.phone.trim(),







        gender: form.gender || null,







        date_of_birth: form.dob || null,







        address: form.address.trim() || null,







        city: form.city.trim() || null,







        state: form.state.trim() || null,







        country: form.country.trim() || "India",







        pincode: form.pincode.trim() || null,







        /*



          Existing backend expects profile_image



          as a string.







          The selected local file is kept as preview



          only because the current /users/profile route



          does not use multer file upload.



        */



        profile_image:



          getProfileImage(user) || null,



      };







      console.log("PROFILE SAVE PAYLOAD:", payload);







      const response = await API.post(



        "/users/profile",



        payload



      );







      const data = response?.data;







      const updatedUser =



        data?.user ||



        data?.profile ||



        data?.data?.user ||



        data?.data ||



        {};







      const mergedUser = {



        ...(user || {}),



        ...updatedUser,







        name:



          updatedUser?.name ||



          updatedUser?.full_name ||



          payload.full_name,







        full_name:



          updatedUser?.full_name ||



          payload.full_name,







        email:



          updatedUser?.email ||



          payload.email,







        phone:



          updatedUser?.phone ||



          updatedUser?.phone_number ||



          payload.phone_number,







        phone_number:



          updatedUser?.phone_number ||



          payload.phone_number,







        gender:



          updatedUser?.gender ||



          payload.gender ||



          "",







        dob:



          updatedUser?.dob ||



          updatedUser?.date_of_birth ||



          payload.date_of_birth ||



          "",







        date_of_birth:



          updatedUser?.date_of_birth ||



          payload.date_of_birth ||



          "",







        address:



          updatedUser?.address ||



          payload.address ||



          "",







        city:



          updatedUser?.city ||



          payload.city ||



          "",







        state:



          updatedUser?.state ||



          payload.state ||



          "",







        country:



          updatedUser?.country ||



          payload.country,







        pincode:



          updatedUser?.pincode ||



          payload.pincode ||



          "",



      };







      setUser(mergedUser);







      setForm({



        name: getDisplayName(mergedUser),



        email: getEmail(mergedUser),



        phone: getPhone(mergedUser),



        gender: getGender(mergedUser),



        dob: normalizeDate(getDob(mergedUser)),



        address: getAddress(mergedUser),



        city: getCity(mergedUser),



        state: getState(mergedUser),



        pincode: getPincode(mergedUser),



        country: getCountry(mergedUser),



      });







      setProfileImage(null);







      if (preview) {



        URL.revokeObjectURL(preview);



      }







      setPreview("");







      setEditing(false);







      setMessage("Profile updated successfully.");







      window.setTimeout(() => {



        setMessage("");



      }, 3000);



    } catch (err) {



      console.error("PROFILE SAVE ERROR:", err);







      setError(



        err?.response?.data?.message ||



          err?.message ||



          "Unable to update profile."



      );



    } finally {



      setSaving(false);



    }



  };







  /* =======================================================



     LOADING



  ======================================================= */







  if (loading) {



    return (



      <div className="min-h-screen bg-black text-white">











        <main className="pt-0">



          <div className="mx-auto max-w-[1280px] px-6 py-10 lg:px-10">



            <div className="animate-pulse">







              <div className="h-10 w-56 rounded-lg bg-white/5" />







              <div className="mt-3 h-5 w-96 rounded bg-white/5" />







              <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[330px_minmax(0,1fr)]">







                <div className="h-[500px] rounded-2xl bg-white/5" />







                <div className="h-[650px] rounded-2xl bg-white/5" />







              </div>



            </div>



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















      <main className="pt-0">







        <div className="mx-auto max-w-[1280px] px-5 pt-2 pb-8 sm:px-7 lg:px-10">







          {/* PAGE HEADER */}



          <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">







            <div>







              <div className="mb-2 flex items-center gap-2 text-xs font-medium text-white">







                <button



                  type="button"



                  onClick={() => navigate("/")}



                  className="transition hover:text-blue-400"



                >



                  Home



                </button>







                <span>/</span>







                <span className="text-white">



                  Profile



                </span>







              </div>







              <h1 className="text-3xl font-bold tracking-tight sm:text-[38px]">



                My{" "}



                <span className="bg-gradient-to-r from-[#38BDF8] to-[#087CFF] bg-clip-text text-transparent">



                  Profile



                </span>



              </h1>







              <p className="mt-2 text-sm text-white sm:text-[15px]">



                Manage your personal information and contact details.



              </p>







            </div>







            {/* TOP BUTTONS */}



            {!editing ? (



              <button



                type="button"



                onClick={handleEdit}



                className="flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#155CFF] to-[#087CFF] px-6 text-sm font-bold text-white shadow-[0_10px_30px_rgba(0,124,255,.18)] transition hover:-translate-y-[1px]"



              >



                <FaEdit size={14} />



                Edit Profile



              </button>



            ) : (



              <div className="flex gap-3">







                <button



                  type="button"



                  onClick={handleCancel}



                  disabled={saving}



                  className="flex h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 text-sm font-semibold text-white/75 transition hover:bg-white/[0.08] disabled:opacity-40"



                >



                  <FaTimes size={13} />



                  Cancel



                </button>







                <button



                  type="button"



                  onClick={handleSave}



                  disabled={saving}



                  className="flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#155CFF] to-[#087CFF] px-6 text-sm font-bold text-white shadow-[0_10px_30px_rgba(0,124,255,.18)] transition hover:-translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-50"



                >



                  <FaSave size={14} />



                  {saving ? "Saving..." : "Save Changes"}



                </button>







              </div>



            )}







          </div>







          {/* SUCCESS */}



          {message && (



            <div className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.07] px-5 py-4 text-sm text-emerald-300">



              <FaCheckCircle />



              {message}



            </div>



          )}







          {/* ERROR */}



          {error && (



            <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/[0.07] px-5 py-4 text-sm text-red-300">



              <FaTimes />



              {error}



            </div>



          )}







          {/* MAIN GRID */}



          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[330px_minmax(0,1fr)]">







            {/* LEFT PROFILE CARD */}



            <ProfileCard



              user={



                preview



                  ? {



                      ...user,



                      profileImage: preview,



                    }



                  : user



              }



              preview={preview}



              editing={editing}



              onImageChange={handleImageChange}



            />







            {/* RIGHT DETAILS */}



            <section className="rounded-2xl border border-white/10 bg-black p-6 shadow-[0_20px_60px_rgba(0,0,0,.22)] sm:p-8">







              {/* PERSONAL INFORMATION */}



              <div className="flex items-center justify-between border-b border-white/10 pb-5">







                <div>



                  <h2 className="text-xl font-bold">



                    Personal Information



                  </h2>







                  <p className="mt-1 text-xs text-white">



                    Your personal and contact information



                  </p>



                </div>







                {!editing && (



                  <div className="rounded-lg bg-emerald-500/10 px-3 py-1.5 text-[11px] font-semibold text-emerald-300">



                    Profile



                  </div>



                )}







              </div>







              {/* PERSONAL FIELDS */}



              <div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-2">







                <ProfileField



                  label="Full Name"



                  icon={FaUser}



                  value={form.name}



                  onChange={handleChange("name")}



                  editing={editing}



                  placeholder="Enter your full name"



                />







                <ProfileField



                  label="Email Address"



                  icon={FaEnvelope}



                  value={form.email}



                  onChange={handleChange("email")}



                  editing={editing}



                  type="email"



                  placeholder="Enter your email"



                />







                {/* PHONE - NUMBERS ONLY */}



                <ProfileField



                  label="Phone Number"



                  icon={FaPhone}



                  value={form.phone}



                  onChange={handleChange("phone")}



                  editing={editing}



                  type="text"



                  inputMode="numeric"



                  maxLength={10}



                  placeholder="Enter 10 digit phone number"



                />







                <SelectField



                  label="Gender"



                  icon={FaVenusMars}



                  value={form.gender}



                  onChange={handleChange("gender")}



                  editing={editing}



                  options={[



                    "Male",



                    "Female",



                    "Other",



                  ]}



                />







                <ProfileField



                  label="Date of Birth"



                  icon={FaCalendarAlt}



                  value={form.dob}



                  onChange={handleChange("dob")}



                  editing={editing}



                  type="date"



                />







                <ProfileField



                  label="Country"



                  icon={FaGlobeAsia}



                  value={form.country}



                  onChange={handleChange("country")}



                  editing={editing}



                  placeholder="Enter country"



                />







              </div>







              {/* ADDRESS */}



              <div className="mt-9 border-t border-white/10 pt-7">







                <div className="mb-6">







                  <h2 className="text-xl font-bold">



                    Address Information



                  </h2>







                  <p className="mt-1 text-xs text-white/40">



                    Add your current address and location details.



                  </p>







                </div>







                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">







                  <div className="md:col-span-2">



                    <AddressField



                      label="Address"



                      icon={FaMapMarkerAlt}



                      value={form.address}



                      onChange={handleChange("address")}



                      editing={editing}



                      placeholder="Enter your complete address"



                    />



                  </div>







                  <ProfileField



                    label="City"



                    icon={FaCity}



                    value={form.city}



                    onChange={handleChange("city")}



                    editing={editing}



                    placeholder="Enter city"



                  />







                  <ProfileField



                    label="State"



                    icon={FaMapMarkerAlt}



                    value={form.state}



                    onChange={handleChange("state")}



                    editing={editing}



                    placeholder="Enter state"



                  />







                  {/* PINCODE - NUMBERS ONLY */}



                  <ProfileField



                    label="Pincode"



                    icon={FaMapPin}



                    value={form.pincode}



                    onChange={handleChange("pincode")}



                    editing={editing}



                    type="text"



                    inputMode="numeric"



                    maxLength={6}



                    placeholder="Enter 6 digit pincode"



                  />







                </div>



              </div>







              {/* BOTTOM SAVE */}



              {editing && (



                <div className="mt-8 flex flex-col-reverse gap-3 border-t border-white/10 pt-6 sm:flex-row sm:justify-end">







                  <button



                    type="button"



                    onClick={handleCancel}



                    disabled={saving}



                    className="h-11 rounded-xl border border-white/10 bg-white/[0.03] px-6 text-sm font-semibold text-white/70 transition hover:bg-white/[0.07] disabled:opacity-40"



                  >



                    Cancel



                  </button>







                  <button



                    type="button"



                    onClick={handleSave}



                    disabled={saving}



                    className="flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#155CFF] to-[#087CFF] px-7 text-sm font-bold text-white shadow-[0_10px_30px_rgba(0,124,255,.18)] transition hover:-translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-50"



                  >



                    <FaSave size={14} />



                    {saving ? "Saving..." : "Save Changes"}



                  </button>







                </div>



              )}







            </section>







          </div>







        </div>







      </main>







    </div>



  );



}