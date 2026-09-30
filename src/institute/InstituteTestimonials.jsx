
import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  Plus,
  X,
  Edit,
  Trash2,
  Play,
  Star,
  MessageSquareQuote,
} from "lucide-react";
import toast from "react-hot-toast";

import {
  getInstituteTestimonials,
  createInstituteTestimonial,
  updateInstituteTestimonial,
  deleteInstituteTestimonial,
} from "../services/testimonialService";


/* =========================================================
   INSTITUTE TESTIMONIALS
========================================================= */

const InstituteTestimonials = () => {

  /* =======================================================
     STATE
  ======================================================= */

  const [testimonials, setTestimonials] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    type: "text",
    student_name: "",
    role: "",
    testimonial_text: "",
    rating: 5,
    avatar: null,
    video: null,
  });


  /* =======================================================
     FETCH TESTIMONIALS
  ======================================================= */

  const fetchTestimonials = async () => {
    try {

      setLoading(true);

      console.log(
        "===================================="
      );

      console.log(
        "FETCHING INSTITUTE TESTIMONIALS"
      );

      const data =
        await getInstituteTestimonials();

      console.log(
        "Testimonials received:",
        data
      );

      console.log(
        "Total testimonials:",
        Array.isArray(data)
          ? data.length
          : 0
      );

      if (Array.isArray(data)) {
        setTestimonials(data);
      } else {
        setTestimonials([]);
      }

    } catch (error) {

      console.error(
        "GET INSTITUTE TESTIMONIALS ERROR:",
        error
      );

      console.error(
        "Status:",
        error?.response?.status
      );

      console.error(
        "Backend response:",
        error?.response?.data
      );

      setTestimonials([]);

      /*
        Do not show authentication toast
        repeatedly if the API interceptor
        already handles authentication.
      */

      if (
        error?.response?.status !== 401 &&
        error?.response?.status !== 403
      ) {
        toast.error(
          error?.response?.data?.message ||
          "Failed to load testimonials"
        );
      }

    } finally {

      setLoading(false);
    }
  };


  /* =======================================================
     INITIAL LOAD
  ======================================================= */

  useEffect(() => {

    fetchTestimonials();

  }, []);


  /* =======================================================
     SEARCH
  ======================================================= */

  const filteredTestimonials = useMemo(() => {

    const keyword =
      search.trim().toLowerCase();

    if (!keyword) {
      return testimonials;
    }

    return testimonials.filter((item) => {

      return (
        item?.student_name
          ?.toLowerCase()
          .includes(keyword) ||

        item?.role
          ?.toLowerCase()
          .includes(keyword) ||

        item?.testimonial_text
          ?.toLowerCase()
          .includes(keyword)
      );

    });

  }, [testimonials, search]);


  /* =======================================================
     OPEN CREATE MODAL
  ======================================================= */

  const openCreateModal = () => {

    setEditingId(null);

    setForm({
      type: "text",
      student_name: "",
      role: "",
      testimonial_text: "",
      rating: 5,
      avatar: null,
      video: null,
    });

    setShowModal(true);
  };


  /* =======================================================
     OPEN EDIT MODAL
  ======================================================= */

  const openEditModal = (item) => {

    setEditingId(item.id);

    setForm({
      type:
        item.video_url
          ? "video"
          : "text",

      student_name:
        item.student_name || "",

      role:
        item.role || "",

      testimonial_text:
        item.testimonial_text || "",

      rating:
        item.rating || 5,

      avatar: null,

      video: null,
    });

    setShowModal(true);
  };


  /* =======================================================
     CLOSE MODAL
  ======================================================= */

  const closeModal = () => {

    if (submitting) {
      return;
    }

    setShowModal(false);

    setEditingId(null);

    setForm({
      type: "text",
      student_name: "",
      role: "",
      testimonial_text: "",
      rating: 5,
      avatar: null,
      video: null,
    });
  };


  /* =======================================================
     FORM CHANGE
  ======================================================= */

  const handleChange = (e) => {

    const {
      name,
      value,
      files,
    } = e.target;

    if (files) {

      setForm((previous) => ({
        ...previous,
        [name]: files[0] || null,
      }));

      return;
    }

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };


  /* =======================================================
     TYPE CHANGE
  ======================================================= */

  const handleTypeChange = (type) => {

    setForm((previous) => ({
      ...previous,
      type,
      video:
        type === "video"
          ? previous.video
          : null,
    }));
  };


  /* =======================================================
     SUBMIT
  ======================================================= */

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!form.student_name.trim()) {

      toast.error(
        "Student name is required."
      );

      return;
    }

    /*
      Text testimonial requires text.
    */

    if (
      form.type === "text" &&
      !form.testimonial_text.trim()
    ) {

      toast.error(
        "Testimonial text is required."
      );

      return;
    }

    /*
      Video testimonial requires video
      when creating a new testimonial.
    */

    if (
      form.type === "video" &&
      !editingId &&
      !form.video
    ) {

      toast.error(
        "Testimonial video is required."
      );

      return;
    }

    try {

      setSubmitting(true);

      const formData =
        new FormData();

      formData.append(
        "student_name",
        form.student_name
      );

      formData.append(
        "role",
        form.role
      );

      formData.append(
        "testimonial_text",
        form.testimonial_text
      );

      formData.append(
        "rating",
        String(form.rating)
      );

      /*
        IMPORTANT:
        Text testimonial does not need video.
        Video testimonial uses video_url
        generated by backend from uploaded file.
      */

      if (form.avatar) {

        formData.append(
          "avatar",
          form.avatar
        );
      }

      if (
        form.type === "video" &&
        form.video
      ) {

        formData.append(
          "video",
          form.video
        );
      }

      /*
        Send testimonial type as well.
        This is harmless even if backend
        currently does not store it.
      */

      formData.append(
        "type",
        form.type
      );


      let response;

      if (editingId) {

        response =
          await updateInstituteTestimonial(
            editingId,
            formData
          );

        toast.success(
          "Testimonial updated successfully."
        );

      } else {

        response =
          await createInstituteTestimonial(
            formData
          );

        toast.success(
          "Testimonial created successfully."
        );
      }

      console.log(
        "Save testimonial response:",
        response
      );

      closeModal();

      /*
        Fetch again from database.
        This guarantees UI shows the
        actual backend data.
      */

      await fetchTestimonials();

    } catch (error) {

      console.error(
        "SAVE TESTIMONIAL ERROR:",
        error
      );

      console.error(
        "Status:",
        error?.response?.status
      );

      console.error(
        "Backend:",
        error?.response?.data
      );

      toast.error(
        error?.response?.data?.message ||
        "Failed to save testimonial."
      );

    } finally {

      setSubmitting(false);
    }
  };


  /* =======================================================
     DELETE
  ======================================================= */

  const handleDelete = async (id) => {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this testimonial?"
      );

    if (!confirmed) {
      return;
    }

    try {

      await deleteInstituteTestimonial(
        id
      );

      toast.success(
        "Testimonial deleted successfully."
      );

      await fetchTestimonials();

    } catch (error) {

      console.error(
        "DELETE TESTIMONIAL ERROR:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
        "Failed to delete testimonial."
      );
    }
  };


  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div
      style={{
        padding: "40px 70px",
        minHeight: "100vh",
        background: "#09090b",
        color: "#fff",
      }}
    >

      {/* ===================================================
          HEADER
      =================================================== */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >

        <div>

          <h1
            style={{
              margin: 0,
              fontSize: "48px",
              fontWeight: 700,
              background:
                "linear-gradient(90deg,#b85cff,#ef3ba9)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Testimonials
          </h1>

          <p
            style={{
              marginTop: "8px",
              color: "#fff",
              fontSize: "18px",
            }}
          >
            Manage your student reviews
          </p>

        </div>


        <button
          onClick={openCreateModal}
          style={{
            border: "none",
            borderRadius: "14px",
            padding: "17px 28px",
            color: "#fff",
            fontSize: "18px",
            fontWeight: 700,
            cursor: "pointer",
            background:
              "linear-gradient(90deg,#a63cff,#ef3ba9)",
          }}
        >
          <Plus
            size={20}
            style={{
              verticalAlign: "middle",
              marginRight: "7px",
            }}
          />

          Add Testimonial
        </button>

      </div>


      {/* ===================================================
          SEARCH
      =================================================== */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          background: "#151519",
          border: "1px solid #29292f",
          borderRadius: "14px",
          padding: "16px 20px",
          marginBottom: "30px",
        }}
      >

        <Search
          size={24}
          color="#9ca3af"
        />

        <input
          type="text"
          placeholder="Search by name, course, or testimonial..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={{
            width: "100%",
            border: "none",
            outline: "none",
            background: "transparent",
            color: "#fff",
            fontSize: "17px",
          }}
        />

      </div>


      {/* ===================================================
          COUNT
      =================================================== */}

      <div
        style={{
          marginBottom: "20px",
          color: "#9ca3af",
          fontSize: "16px",
        }}
      >
        {filteredTestimonials.length}{" "}
        testimonial
        {filteredTestimonials.length !== 1
          ? "s"
          : ""}{" "}
        found
      </div>


      {/* ===================================================
          TABLE
      =================================================== */}

      <div
        style={{
          background: "#151519",
          border: "1px solid #29292f",
          borderRadius: "18px",
          overflow: "hidden",
        }}
      >

        <div
          style={{
            overflowX: "auto",
          }}
        >

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: "1050px",
            }}
          >

            <thead>

              <tr
                style={{
                  background: "#222229",
                }}
              >

                <th style={thStyle}>
                  ID
                </th>

                <th style={thStyle}>
                  Type
                </th>

                <th style={thStyle}>
                  Avatar
                </th>

                <th style={thStyle}>
                  Student Name
                </th>

                <th style={thStyle}>
                  Course
                </th>

                <th style={thStyle}>
                  Rating
                </th>

                <th style={thStyle}>
                  Testimonial
                </th>

                <th style={thStyle}>
                  Video
                </th>

                <th style={thStyle}>
                  Actions
                </th>

              </tr>

            </thead>


            <tbody>

              {loading ? (

                <tr>

                  <td
                    colSpan="9"
                    style={{
                      textAlign: "center",
                      padding: "70px",
                      color: "#9ca3af",
                    }}
                  >
                    Loading testimonials...
                  </td>

                </tr>

              ) : filteredTestimonials.length === 0 ? (

                <tr>

                  <td
                    colSpan="9"
                    style={{
                      textAlign: "center",
                      padding: "80px",
                      color: "#64748b",
                    }}
                  >

                    <Search
                      size={50}
                      style={{
                        marginBottom: "15px",
                      }}
                    />

                    <div
                      style={{
                        fontSize: "20px",
                      }}
                    >
                      No testimonials available
                    </div>

                  </td>

                </tr>

              ) : (

                filteredTestimonials.map(
                  (item) => {

                    const isVideo =
                      !!item.video_url;

                    return (
                      <tr
                        key={item.id}
                        style={{
                          borderTop:
                            "1px solid #29292f",
                        }}
                      >

                        <td style={tdStyle}>
                          {item.id}
                        </td>


                        <td style={tdStyle}>

                          <span
                            style={{
                              padding:
                                "7px 12px",
                              borderRadius:
                                "20px",
                              background:
                                isVideo
                                  ? "#3b1d54"
                                  : "#1e3a5f",
                              color:
                                isVideo
                                  ? "#d98aff"
                                  : "#7db5ff",
                              fontWeight: 600,
                            }}
                          >
                            {isVideo
                              ? "Video"
                              : "Text"}
                          </span>

                        </td>


                        <td style={tdStyle}>

                          {item.avatar ? (

                            <img
                              src={item.avatar}
                              alt={
                                item.student_name ||
                                "Student"
                              }
                              style={{
                                width: "48px",
                                height: "48px",
                                borderRadius:
                                  "50%",
                                objectFit:
                                  "cover",
                              }}
                            />

                          ) : (

                            <div
                              style={{
                                width: "48px",
                                height: "48px",
                                borderRadius:
                                  "50%",
                                display: "flex",
                                alignItems:
                                  "center",
                                justifyContent:
                                  "center",
                                background:
                                  "#282832",
                                color: "#c084fc",
                                fontWeight: 700,
                              }}
                            >
                              {(
                                item.student_name ||
                                "S"
                              )
                                .charAt(0)
                                .toUpperCase()}
                            </div>

                          )}

                        </td>


                        <td style={tdStyle}>

                          <div
                            style={{
                              fontWeight: 600,
                            }}
                          >
                            {item.student_name ||
                              "-"}
                          </div>

                          {item.role && (
                            <div
                              style={{
                                marginTop:
                                  "4px",
                                color:
                                  "#8b8b98",
                                fontSize:
                                  "13px",
                              }}
                            >
                              {item.role}
                            </div>
                          )}

                        </td>


                        <td style={tdStyle}>
                          {item.course ||
                            item.class_name ||
                            "-"}
                        </td>


                        <td style={tdStyle}>

                          <div
                            style={{
                              display: "flex",
                              alignItems:
                                "center",
                              gap: "4px",
                            }}
                          >

                            <Star
                              size={16}
                              fill="#fbbf24"
                              color="#fbbf24"
                            />

                            {item.rating ||
                              0}

                          </div>

                        </td>


                        <td
                          style={{
                            ...tdStyle,
                            maxWidth: "300px",
                          }}
                        >

                          <div
                            style={{
                              overflow: "hidden",
                              textOverflow:
                                "ellipsis",
                              whiteSpace:
                                "nowrap",
                            }}
                          >
                            {item.testimonial_text ||
                              "-"}
                          </div>

                        </td>


                        <td style={tdStyle}>

                          {item.video_url ? (

                            <a
                              href={
                                item.video_url
                              }
                              target="_blank"
                              rel="noreferrer"
                              style={{
                                display:
                                  "inline-flex",
                                alignItems:
                                  "center",
                                gap: "5px",
                                color:
                                  "#c084fc",
                                textDecoration:
                                  "none",
                              }}
                            >

                              <Play
                                size={17}
                              />

                              View

                            </a>

                          ) : (
                            "-"
                          )}

                        </td>


                        <td style={tdStyle}>

                          <div
                            style={{
                              display: "flex",
                              gap: "8px",
                            }}
                          >

                            <button
                              onClick={() =>
                                openEditModal(item)
                              }
                              style={
                                actionButtonStyle
                              }
                            >
                              <Edit
                                size={17}
                              />
                            </button>

                            <button
                              onClick={() =>
                                handleDelete(
                                  item.id
                                )
                              }
                              style={{
                                ...actionButtonStyle,
                                color: "#f87171",
                              }}
                            >
                              <Trash2
                                size={17}
                              />
                            </button>

                          </div>

                        </td>

                      </tr>
                    );
                  }
                )

              )}

            </tbody>

          </table>

        </div>

      </div>


      {/* ===================================================
          MODAL
      =================================================== */}

      {showModal && (

        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background:
              "rgba(0,0,0,0.75)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >

          <div
            style={{
              width: "100%",
              maxWidth: "680px",
              maxHeight: "90vh",
              overflowY: "auto",
              background: "#211d32",
              borderRadius: "18px",
              border:
                "1px solid #38314d",
            }}
          >

            {/* MODAL HEADER */}

            <div
              style={{
                padding: "25px 30px",
                borderBottom:
                  "1px solid #38314d",
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems: "center",
              }}
            >

              <div>

                <h2
                  style={{
                    margin: 0,
                    fontSize: "28px",
                  }}
                >
                  {editingId
                    ? "Edit Testimonial"
                    : "Add Testimonial"}
                </h2>

                <p
                  style={{
                    margin:
                      "6px 0 0",
                    color: "#a1a1aa",
                  }}
                >
                  Create a text or video testimonial
                </p>

              </div>

              <button
                onClick={closeModal}
                style={{
                  border: "none",
                  background:
                    "transparent",
                  color: "#a1a1aa",
                  cursor: "pointer",
                }}
              >
                <X size={26} />
              </button>

            </div>


            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >

              <div
                style={{
                  padding: "30px",
                }}
              >

                {/* TYPE */}

                <label
                  style={labelStyle}
                >
                  Testimonial Type
                </label>

                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    marginBottom: "22px",
                  }}
                >

                  <button
                    type="button"
                    onClick={() =>
                      handleTypeChange(
                        "text"
                      )
                    }
                    style={{
                      ...typeButtonStyle,
                      background:
                        form.type === "text"
                          ? "linear-gradient(90deg,#a63cff,#ef3ba9)"
                          : "#2b2738",
                      color: "#fff",
                    }}
                  >
                    <MessageSquareQuote
                      size={18}
                    />

                    Text Testimonial
                  </button>


                  <button
                    type="button"
                    onClick={() =>
                      handleTypeChange(
                        "video"
                      )
                    }
                    style={{
                      ...typeButtonStyle,
                      background:
                        form.type === "video"
                          ? "linear-gradient(90deg,#a63cff,#ef3ba9)"
                          : "#2b2738",
                      color: "#fff",
                    }}
                  >
                    <Play size={18} />

                    Video Testimonial
                  </button>

                </div>


                {/* STUDENT NAME */}

                <label
                  style={labelStyle}
                >
                  Student Name
                </label>

                <input
                  name="student_name"
                  value={
                    form.student_name
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Enter student name"
                  style={inputStyle}
                  required
                />


                {/* ROLE */}

                <label
                  style={labelStyle}
                >
                  Course / Role
                </label>

                <input
                  name="role"
                  value={form.role}
                  onChange={
                    handleChange
                  }
                  placeholder="Example: Music Student"
                  style={inputStyle}
                />


                {/* RATING */}

                <label
                  style={labelStyle}
                >
                  Rating
                </label>

                <select
                  name="rating"
                  value={form.rating}
                  onChange={
                    handleChange
                  }
                  style={inputStyle}
                >

                  <option value="5">
                    5 Stars
                  </option>

                  <option value="4">
                    4 Stars
                  </option>

                  <option value="3">
                    3 Stars
                  </option>

                  <option value="2">
                    2 Stars
                  </option>

                  <option value="1">
                    1 Star
                  </option>

                </select>


                {/* TEXT */}

                <label
                  style={labelStyle}
                >
                  Testimonial Text
                  {form.type === "text"
                    ? " *"
                    : " (Optional)"}
                </label>

                <textarea
                  name="testimonial_text"
                  value={
                    form.testimonial_text
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Write the student's testimonial..."
                  rows={5}
                  style={{
                    ...inputStyle,
                    resize: "vertical",
                  }}
                  required={
                    form.type === "text"
                  }
                />


                {/* AVATAR */}

                <label
                  style={labelStyle}
                >
                  Upload Avatar
                  {" "}
                  <span
                    style={{
                      color: "#8b8b98",
                    }}
                  >
                    (Optional)
                  </span>
                </label>

                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={
                    handleChange
                  }
                  style={fileInputStyle}
                />


                {/* VIDEO */}

                {form.type ===
                  "video" && (

                  <>
                    <label
                      style={labelStyle}
                    >
                      Upload Testimonial Video
                      {" "}
                      {!editingId && (
                        <span>
                          *
                        </span>
                      )}
                    </label>

                    <input
                      type="file"
                      name="video"
                      accept="video/*"
                      onChange={
                        handleChange
                      }
                      style={
                        fileInputStyle
                      }
                      required={
                        !editingId
                      }
                    />

                    {editingId && (
                      <p
                        style={{
                          color:
                            "#8b8b98",
                          fontSize:
                            "13px",
                          marginTop:
                            "6px",
                        }}
                      >
                        Leave empty to keep the
                        existing video.
                      </p>
                    )}

                  </>

                )}

              </div>


              {/* FOOTER */}

              <div
                style={{
                  padding:
                    "20px 30px",
                  borderTop:
                    "1px solid #38314d",
                  display: "flex",
                  justifyContent:
                    "flex-end",
                  gap: "12px",
                }}
              >

                <button
                  type="button"
                  onClick={closeModal}
                  disabled={submitting}
                  style={{
                    padding:
                      "13px 24px",
                    borderRadius:
                      "10px",
                    border:
                      "1px solid #4b455b",
                    background:
                      "transparent",
                    color: "#fff",
                    cursor:
                      submitting
                        ? "not-allowed"
                        : "pointer",
                  }}
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    padding:
                      "13px 25px",
                    border: "none",
                    borderRadius:
                      "10px",
                    background:
                      "linear-gradient(90deg,#a63cff,#ef3ba9)",
                    color: "#fff",
                    fontSize:
                      "16px",
                    fontWeight: 700,
                    cursor:
                      submitting
                        ? "not-allowed"
                        : "pointer",
                    opacity:
                      submitting
                        ? 0.7
                        : 1,
                  }}
                >
                  {submitting
                    ? "Saving..."
                    : editingId
                    ? "Update Testimonial"
                    : "Add Testimonial"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
};


/* =========================================================
   STYLES
========================================================= */

const thStyle = {
  padding: "20px",
  textAlign: "left",
  fontSize: "16px",
  fontWeight: 700,
  whiteSpace: "nowrap",
};

const tdStyle = {
  padding: "18px 20px",
  fontSize: "15px",
  color: "#e5e7eb",
  verticalAlign: "middle",
};

const labelStyle = {
  display: "block",
  marginBottom: "8px",
  marginTop: "18px",
  color: "#c4c4cc",
  fontSize: "15px",
  fontWeight: 600,
};

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "13px 15px",
  borderRadius: "10px",
  border: "1px solid #40394f",
  outline: "none",
  background: "#2b2738",
  color: "#fff",
  fontSize: "15px",
};

const fileInputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #40394f",
  background: "#2b2738",
  color: "#fff",
  cursor: "pointer",
};

const typeButtonStyle = {
  flex: 1,
  minHeight: "48px",
  border: "none",
  borderRadius: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  fontSize: "14px",
  fontWeight: 600,
  cursor: "pointer",
};

const actionButtonStyle = {
  width: "38px",
  height: "38px",
  borderRadius: "8px",
  border: "1px solid #3b3548",
  background: "#25222e",
  color: "#c084fc",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
};


export default InstituteTestimonials;