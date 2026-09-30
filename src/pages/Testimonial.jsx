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
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "../services/testimonialService";

/* =========================================================
   ADMIN TESTIMONIALS
========================================================= */

const Testimonials = () => {
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
    image: null,
    video: null,
  });

  /* =======================================================
     RESET FORM
  ======================================================= */

  const resetForm = () => {
    setForm({
      type: "text",
      student_name: "",
      role: "",
      testimonial_text: "",
      rating: 5,
      avatar: null,
      image: null,
      video: null,
    });
  };

  /* =======================================================
     FETCH TESTIMONIALS
  ======================================================= */

  const fetchTestimonials = async () => {
    try {
      setLoading(true);

      console.log(
        "================================="
      );

      console.log(
        "FETCHING ADMIN TESTIMONIALS"
      );

      console.log(
        "================================="
      );

      const data = await getTestimonials();

      console.log(
        "Admin Testimonials:",
        data
      );

      if (Array.isArray(data)) {
        setTestimonials(data);
      } else {
        setTestimonials([]);
      }
    } catch (error) {
      console.error(
        "GET ADMIN TESTIMONIALS ERROR:",
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

      setTestimonials([]);

      toast.error(
        error?.response?.data?.message ||
          "Failed to load testimonials"
      );
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
        String(item?.id || "")
          .toLowerCase()
          .includes(keyword) ||

        item?.student_name
          ?.toLowerCase()
          .includes(keyword) ||

        item?.role
          ?.toLowerCase()
          .includes(keyword) ||

        item?.course
          ?.toLowerCase()
          .includes(keyword) ||

        item?.testimonial_text
          ?.toLowerCase()
          .includes(keyword) ||

        String(item?.rating || "")
          .toLowerCase()
          .includes(keyword)
      );
    });
  }, [testimonials, search]);

  /* =======================================================
     IMAGE URL
  ======================================================= */

  const getFileUrl = (file) => {
    if (!file) {
      return "";
    }

    if (
      String(file).startsWith("http")
    ) {
      return file;
    }

    return `https://finearts-backend.onrender.com${file}`;
  };

  /* =======================================================
     OPEN CREATE MODAL
  ======================================================= */

  const openCreateModal = () => {
    setEditingId(null);

    resetForm();

    setShowModal(true);
  };

  /* =======================================================
     OPEN EDIT MODAL
  ======================================================= */

  const openEditModal = (item) => {
    const isVideo =
      !!item?.video_url;

    setEditingId(item.id);

    setForm({
      type: isVideo
        ? "video"
        : "text",

      student_name:
        item?.student_name || "",

      role:
        item?.role ||
        item?.course ||
        "",

      testimonial_text:
        item?.testimonial_text || "",

      rating:
        item?.rating || 5,

      avatar: null,

      image: null,

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

    resetForm();
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
        [name]:
          files[0] || null,
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

      /*
       * Video is only used for
       * video testimonials.
       */
      video:
        type === "video"
          ? previous.video
          : null,

      /*
       * Image is only used for
       * text testimonials.
       */
      image:
        type === "text"
          ? previous.image
          : null,
    }));
  };

  /* =======================================================
     SUBMIT
  ======================================================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    /* =====================================================
       VALIDATION
    ===================================================== */

    if (
      !form.student_name.trim()
    ) {
      toast.error(
        "Student name is required."
      );

      return;
    }

    if (
      !form.role.trim()
    ) {
      toast.error(
        "Course / Role is required."
      );

      return;
    }

    if (!form.rating) {
      toast.error(
        "Rating is required."
      );

      return;
    }

    /* =====================================================
       TEXT VALIDATION
    ===================================================== */

    if (
      form.type === "text" &&
      !form.testimonial_text.trim()
    ) {
      toast.error(
        "Testimonial text is required."
      );

      return;
    }

    /* =====================================================
       VIDEO VALIDATION
    ===================================================== */

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

      /* ===================================================
         BASIC FIELDS
      =================================================== */

      formData.append(
        "student_name",
        form.student_name.trim()
      );

      formData.append(
        "role",
        form.role.trim()
      );

      formData.append(
        "rating",
        String(form.rating)
      );

      formData.append(
        "testimonial_text",
        form.testimonial_text.trim()
      );

      formData.append(
        "type",
        form.type
      );

      /* ===================================================
         AVATAR
         
         Avatar is available for BOTH
         text and video testimonials.
      =================================================== */

      if (form.avatar) {
        formData.append(
          "avatar",
          form.avatar
        );
      }

      /* ===================================================
         IMAGE
         
         Image is ONLY for text testimonials.
      =================================================== */

      if (
        form.type === "text" &&
        form.image
      ) {
        formData.append(
          "image",
          form.image
        );
      }

      /* ===================================================
         VIDEO
         
         Video is ONLY for video testimonials.
      =================================================== */

      if (
        form.type === "video" &&
        form.video
      ) {
        formData.append(
          "video",
          form.video
        );
      }

      /* ===================================================
         DEBUG
      =================================================== */

      console.log(
        "TESTIMONIAL FORM DATA:"
      );

      for (const [
        key,
        value,
      ] of formData.entries()) {
        console.log(
          key,
          value
        );
      }

      /* ===================================================
         CREATE / UPDATE
      =================================================== */

      let response;

      if (editingId) {
        response =
          await updateTestimonial(
            editingId,
            formData
          );

        toast.success(
          "Testimonial updated successfully."
        );
      } else {
        response =
          await createTestimonial(
            formData
          );

        toast.success(
          "Testimonial created successfully."
        );
      }

      console.log(
        "TESTIMONIAL SAVE RESPONSE:",
        response
      );

      setShowModal(false);

      setEditingId(null);

      resetForm();

      await fetchTestimonials();
    } catch (error) {
      console.error(
        "SAVE ADMIN TESTIMONIAL ERROR:",
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

  const handleDelete = async (item) => {
    const confirmed =
      window.confirm(
        `Are you sure you want to delete the testimonial from ${
          item?.student_name ||
          "this student"
        }?`
      );

    if (!confirmed) {
      return;
    }

    try {
      await deleteTestimonial(
        item.id
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
          justifyContent:
            "space-between",
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
              WebkitBackgroundClip:
                "text",
              WebkitTextFillColor:
                "transparent",
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
            Manage student reviews
          </p>
        </div>

        <button
          type="button"
          onClick={
            openCreateModal
          }
          style={{
            border: "none",
            borderRadius: "14px",
            padding:
              "17px 28px",
            color: "#fff",
            fontSize: "18px",
            fontWeight: 700,
            cursor: "pointer",
            background:
              "linear-gradient(90deg,#a63cff,#ef3ba9)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Plus size={20} />

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
          border:
            "1px solid #29292f",
          borderRadius: "14px",
          padding:
            "16px 20px",
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
            setSearch(
              e.target.value
            )
          }
          style={{
            width: "100%",
            border: "none",
            outline: "none",
            background:
              "transparent",
            color: "#fff",
            fontSize: "17px",
          }}
        />

        {search && (
          <button
            type="button"
            onClick={() =>
              setSearch("")
            }
            style={{
              border: "none",
              background:
                "transparent",
              color: "#9ca3af",
              cursor: "pointer",
            }}
          >
            <X size={20} />
          </button>
        )}
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
        {filteredTestimonials.length !==
        1
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
          border:
            "1px solid #29292f",
          borderRadius: "18px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            overflowX:
              "auto",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse:
                "collapse",
              minWidth:
                "1250px",
            }}
          >
            <thead>
              <tr
                style={{
                  background:
                    "#222229",
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
                  Image
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
                    colSpan="10"
                    style={{
                      textAlign:
                        "center",
                      padding:
                        "70px",
                      color:
                        "#9ca3af",
                    }}
                  >
                    Loading testimonials...
                  </td>
                </tr>
              ) : filteredTestimonials.length ===
                0 ? (
                <tr>
                  <td
                    colSpan="10"
                    style={{
                      textAlign:
                        "center",
                      padding:
                        "80px",
                      color:
                        "#64748b",
                    }}
                  >
                    <Search
                      size={50}
                      style={{
                        marginBottom:
                          "15px",
                      }}
                    />

                    <div
                      style={{
                        fontSize:
                          "20px",
                      }}
                    >
                      {search
                        ? "No testimonials found"
                        : "No testimonials available"}
                    </div>
                  </td>
                </tr>
              ) : (
                filteredTestimonials.map(
                  (item) => {
                    const isVideo =
                      !!item?.video_url;

                    const avatarUrl =
                      getFileUrl(
                        item?.avatar
                      );

                    const imageUrl =
                      getFileUrl(
                        item?.image
                      );

                    return (
                      <tr
                        key={
                          item.id
                        }
                        style={{
                          borderTop:
                            "1px solid #29292f",
                        }}
                      >
                        {/* ID */}

                        <td
                          style={
                            tdStyle
                          }
                        >
                          {item.id}
                        </td>

                        {/* TYPE */}

                        <td
                          style={
                            tdStyle
                          }
                        >
                          <span
                            style={{
                              display:
                                "inline-flex",
                              alignItems:
                                "center",
                              gap: "6px",
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
                              fontWeight:
                                600,
                            }}
                          >
                            {isVideo ? (
                              <>
                                <Play
                                  size={
                                    14
                                  }
                                />
                                Video
                              </>
                            ) : (
                              <>
                                <MessageSquareQuote
                                  size={
                                    14
                                  }
                                />
                                Text
                              </>
                            )}
                          </span>
                        </td>

                        {/* AVATAR */}

                        <td
                          style={
                            tdStyle
                          }
                        >
                          {avatarUrl ? (
                            <img
                              src={
                                avatarUrl
                              }
                              alt="Avatar"
                              style={{
                                width:
                                  "50px",
                                height:
                                  "50px",
                                borderRadius:
                                  "50%",
                                objectFit:
                                  "cover",
                                border:
                                  "2px solid #3b3548",
                              }}
                            />
                          ) : (
                            <div
                              style={{
                                width:
                                  "50px",
                                height:
                                  "50px",
                                borderRadius:
                                  "50%",
                                display:
                                  "flex",
                                alignItems:
                                  "center",
                                justifyContent:
                                  "center",
                                background:
                                  "#282832",
                                color:
                                  "#c084fc",
                                fontWeight:
                                  700,
                              }}
                            >
                              {(
                                item.student_name ||
                                "S"
                              )
                                .charAt(
                                  0
                                )
                                .toUpperCase()}
                            </div>
                          )}
                        </td>

                        {/* IMAGE */}

                        <td
                          style={
                            tdStyle
                          }
                        >
                          {imageUrl ? (
                            <img
                              src={
                                imageUrl
                              }
                              alt="Testimonial"
                              style={{
                                width:
                                  "80px",
                                height:
                                  "55px",
                                borderRadius:
                                  "8px",
                                objectFit:
                                  "cover",
                                border:
                                  "1px solid #333",
                              }}
                            />
                          ) : (
                            <span
                              style={{
                                color:
                                  "#71717a",
                              }}
                            >
                              N/A
                            </span>
                          )}
                        </td>

                        {/* NAME */}

                        <td
                          style={
                            tdStyle
                          }
                        >
                          <div
                            style={{
                              fontWeight:
                                600,
                            }}
                          >
                            {item.student_name ||
                              "-"}
                          </div>
                        </td>

                        {/* COURSE */}

                        <td
                          style={
                            tdStyle
                          }
                        >
                          {item.role ||
                            item.course ||
                            item.class_name ||
                            "-"}
                        </td>

                        {/* RATING */}

                        <td
                          style={
                            tdStyle
                          }
                        >
                          <div
                            style={{
                              display:
                                "flex",
                              alignItems:
                                "center",
                              gap: "5px",
                            }}
                          >
                            <Star
                              size={
                                16
                              }
                              fill="#fbbf24"
                              color="#fbbf24"
                            />

                            <span>
                              {item.rating ||
                                0}
                            </span>
                          </div>
                        </td>

                        {/* TESTIMONIAL */}

                        <td
                          style={{
                            ...tdStyle,
                            maxWidth:
                              "300px",
                          }}
                        >
                          <div
                            style={{
                              overflow:
                                "hidden",
                              textOverflow:
                                "ellipsis",
                              whiteSpace:
                                "nowrap",
                            }}
                            title={
                              item.testimonial_text ||
                              ""
                            }
                          >
                            {item.testimonial_text ||
                              "-"}
                          </div>
                        </td>

                        {/* VIDEO */}

                        <td
                          style={
                            tdStyle
                          }
                        >
                          {item.video_url ? (
                            <video
                              controls
                              preload="metadata"
                              style={{
                                width:
                                  "130px",
                                height:
                                  "75px",
                                borderRadius:
                                  "10px",
                                objectFit:
                                  "cover",
                                background:
                                  "#000",
                              }}
                            >
                              <source
                                src={
                                  item.video_url
                                }
                              />
                              Your browser does not support video.
                            </video>
                          ) : (
                            <span
                              style={{
                                color:
                                  "#71717a",
                              }}
                            >
                              N/A
                            </span>
                          )}
                        </td>

                        {/* ACTIONS */}

                        <td
                          style={
                            tdStyle
                          }
                        >
                          <div
                            style={{
                              display:
                                "flex",
                              gap: "8px",
                            }}
                          >
                            <button
                              type="button"
                              onClick={() =>
                                openEditModal(
                                  item
                                )
                              }
                              style={
                                actionButtonStyle
                              }
                              title="Edit"
                            >
                              <Edit
                                size={
                                  17
                                }
                              />
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                handleDelete(
                                  item
                                )
                              }
                              style={{
                                ...actionButtonStyle,
                                color:
                                  "#f87171",
                              }}
                              title="Delete"
                            >
                              <Trash2
                                size={
                                  17
                                }
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
          CREATE / EDIT MODAL
      =================================================== */}

      {showModal && (
        <div
          style={{
            position:
              "fixed",
            inset: 0,
            zIndex: 9999,
            background:
              "rgba(0,0,0,0.75)",
            display:
              "flex",
            alignItems:
              "center",
            justifyContent:
              "center",
            padding:
              "20px",
          }}
        >
          <div
            style={{
              width:
                "100%",
              maxWidth:
                "680px",
              maxHeight:
                "90vh",
              overflowY:
                "auto",
              background:
                "#211d32",
              borderRadius:
                "18px",
              border:
                "1px solid #38314d",
            }}
          >
            {/* MODAL HEADER */}

            <div
              style={{
                padding:
                  "25px 30px",
                borderBottom:
                  "1px solid #38314d",
                display:
                  "flex",
                justifyContent:
                  "space-between",
                alignItems:
                  "center",
              }}
            >
              <div>
                <h2
                  style={{
                    margin: 0,
                    fontSize:
                      "28px",
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
                    color:
                      "#a1a1aa",
                  }}
                >
                  Create a text or video testimonial
                </p>
              </div>

              <button
                type="button"
                onClick={
                  closeModal
                }
                disabled={
                  submitting
                }
                style={{
                  border:
                    "none",
                  background:
                    "transparent",
                  color:
                    "#a1a1aa",
                  cursor:
                    submitting
                      ? "not-allowed"
                      : "pointer",
                }}
              >
                <X size={26} />
              </button>
            </div>

            {/* FORM */}

            <form
              onSubmit={
                handleSubmit
              }
              encType="multipart/form-data"
            >
              <div
                style={{
                  padding:
                    "30px",
                }}
              >
                {/* TYPE */}

                <label
                  style={
                    labelStyle
                  }
                >
                  Testimonial Type
                </label>

                <div
                  style={{
                    display:
                      "flex",
                    gap: "12px",
                    marginBottom:
                      "22px",
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
                        form.type ===
                        "text"
                          ? "linear-gradient(90deg,#a63cff,#ef3ba9)"
                          : "#2b2738",
                    }}
                  >
                    <MessageSquareQuote
                      size={
                        18
                      }
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
                        form.type ===
                        "video"
                          ? "linear-gradient(90deg,#a63cff,#ef3ba9)"
                          : "#2b2738",
                    }}
                  >
                    <Play
                      size={
                        18
                      }
                    />

                    Video Testimonial
                  </button>
                </div>

                {/* STUDENT NAME */}

                <label
                  style={
                    labelStyle
                  }
                >
                  Student Name *
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
                  style={
                    inputStyle
                  }
                  required
                />

                {/* COURSE */}

                <label
                  style={
                    labelStyle
                  }
                >
                  Course / Role *
                </label>

                <input
                  name="role"
                  value={
                    form.role
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Example: Music Student"
                  style={
                    inputStyle
                  }
                  required
                />

                {/* RATING */}

                <label
                  style={
                    labelStyle
                  }
                >
                  Rating *
                </label>

                <select
                  name="rating"
                  value={
                    form.rating
                  }
                  onChange={
                    handleChange
                  }
                  style={
                    inputStyle
                  }
                  required
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

                {/* TESTIMONIAL TEXT */}

                <label
                  style={
                    labelStyle
                  }
                >
                  Testimonial Text{" "}
                  {form.type ===
                  "text" ? (
                    <span>*</span>
                  ) : (
                    <span
                      style={{
                        color:
                          "#8b8b98",
                      }}
                    >
                      (Optional)
                    </span>
                  )}
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
                    resize:
                      "vertical",
                  }}
                  required={
                    form.type ===
                    "text"
                  }
                />

                {/* =================================================
                    AVATAR
                    AVAILABLE FOR BOTH TEXT + VIDEO
                ================================================= */}

                <label
                  style={
                    labelStyle
                  }
                >
                  Avatar{" "}
                  <span
                    style={{
                      color:
                        "#8b8b98",
                    }}
                  >
                    (For Text & Video)
                  </span>
                </label>

                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={
                    handleChange
                  }
                  style={
                    fileInputStyle
                  }
                />

                {/* AVATAR PREVIEW */}

                {form.avatar && (
                  <div
                    style={{
                      marginTop:
                        "12px",
                      marginBottom:
                        "15px",
                    }}
                  >
                    <p
                      style={{
                        color:
                          "#a1a1aa",
                        fontSize:
                          "13px",
                        marginBottom:
                          "8px",
                      }}
                    >
                      Avatar Preview
                    </p>

                    <img
                      src={URL.createObjectURL(
                        form.avatar
                      )}
                      alt="Avatar Preview"
                      style={{
                        width:
                          "90px",
                        height:
                          "90px",
                        objectFit:
                          "cover",
                        borderRadius:
                          "50%",
                        border:
                          "2px solid #a855f7",
                      }}
                    />
                  </div>
                )}

                {/* =================================================
                    IMAGE
                    ONLY TEXT TESTIMONIAL
                ================================================= */}

                {form.type ===
                  "text" && (
                  <>
                    <label
                      style={
                        labelStyle
                      }
                    >
                      Testimonial Image{" "}
                      <span
                        style={{
                          color:
                            "#8b8b98",
                        }}
                      >
                        (Optional)
                      </span>
                    </label>

                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={
                        handleChange
                      }
                      style={
                        fileInputStyle
                      }
                    />

                    {/* IMAGE PREVIEW */}

                    {form.image && (
                      <div
                        style={{
                          marginTop:
                            "12px",
                          marginBottom:
                            "15px",
                        }}
                      >
                        <p
                          style={{
                            color:
                              "#a1a1aa",
                            fontSize:
                              "13px",
                            marginBottom:
                              "8px",
                          }}
                        >
                          Testimonial Image Preview
                        </p>

                        <img
                          src={URL.createObjectURL(
                            form.image
                          )}
                          alt="Testimonial Preview"
                          style={{
                            width:
                              "180px",
                            height:
                              "110px",
                            objectFit:
                              "cover",
                            borderRadius:
                              "10px",
                            border:
                              "2px solid #a855f7",
                          }}
                        />
                      </div>
                    )}
                  </>
                )}

                {/* =================================================
                    VIDEO
                    ONLY VIDEO TESTIMONIAL
                ================================================= */}

                {form.type ===
                  "video" && (
                  <>
                    <label
                      style={
                        labelStyle
                      }
                    >
                      Testimonial Video{" "}
                      {!editingId && (
                        <span>
                          *
                        </span>
                      )}
                    </label>

                    <input
                      type="file"
                      name="video"
                      accept="video/mp4,video/webm,video/quicktime"
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

                    {form.video && (
                      <div
                        style={{
                          marginTop:
                            "12px",
                          marginBottom:
                            "15px",
                        }}
                      >
                        <p
                          style={{
                            color:
                              "#a1a1aa",
                            fontSize:
                              "13px",
                            marginBottom:
                              "8px",
                          }}
                        >
                          Video Preview
                        </p>

                        <video
                          controls
                          src={URL.createObjectURL(
                            form.video
                          )}
                          style={{
                            width:
                              "240px",
                            maxHeight:
                              "150px",
                            borderRadius:
                              "10px",
                            background:
                              "#000",
                          }}
                        />
                      </div>
                    )}

                    {editingId && (
                      <p
                        style={{
                          color:
                            "#8b8b98",
                          fontSize:
                            "13px",
                          marginTop:
                            "7px",
                        }}
                      >
                        Leave empty to keep
                        the existing video.
                      </p>
                    )}
                  </>
                )}
              </div>

              {/* =================================================
                  MODAL FOOTER
              ================================================= */}

              <div
                style={{
                  padding:
                    "20px 30px",
                  borderTop:
                    "1px solid #38314d",
                  display:
                    "flex",
                  justifyContent:
                    "flex-end",
                  gap: "12px",
                }}
              >
                <button
                  type="button"
                  onClick={
                    closeModal
                  }
                  disabled={
                    submitting
                  }
                  style={{
                    padding:
                      "13px 24px",
                    borderRadius:
                      "10px",
                    border:
                      "1px solid #4b455b",
                    background:
                      "transparent",
                    color:
                      "#fff",
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
                  disabled={
                    submitting
                  }
                  style={{
                    padding:
                      "13px 25px",
                    border:
                      "none",
                    borderRadius:
                      "10px",
                    background:
                      "linear-gradient(90deg,#a63cff,#ef3ba9)",
                    color:
                      "#fff",
                    fontSize:
                      "16px",
                    fontWeight:
                      700,
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
  color: "#fff",
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

export default Testimonials;